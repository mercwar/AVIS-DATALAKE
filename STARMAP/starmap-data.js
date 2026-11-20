/* ============================================================================
 * STARMAP/starmap-data.js
 * Dynamic GitHub-driven headers, classification & helpers (zero hardcoded trees)
 * ========================================================================== */

export const OWNER = "mercwar";
export const ROOT_REPO = "AVIS-DATALAKE";

export const SECTOR_PALETTE = [
  { id: "HUB", label: "HUB CORE", color: "#ffd97d", hex: 0xffd97d, center: [0, 0, 0] },
  { id: "SECTOR_I", label: "SECTOR I", color: "#00f0ff", hex: 0x00f0ff, center: [-34, 10, -24] },
  { id: "SECTOR_II", label: "SECTOR II", color: "#b84dff", hex: 0xb84dff, center: [36, 12, -22] },
  { id: "SECTOR_III", label: "SECTOR III", color: "#ff9d00", hex: 0xff9d00, center: [32, -11, 30] },
  { id: "SECTOR_IV", label: "SECTOR IV", color: "#00ff9d", hex: 0x00ff9d, center: [-34, -10, 28] }
];

export const liveState = {
  owner: OWNER,
  rootRepo: ROOT_REPO,
  defaultBranch: "HEAD",
  rawTree: [],        // Populated live from GitHub API
  systems: [],        // Populated live from GitHub API (repos, folders, files)
  systemMap: new Map(),
  lanes: [],
  treeCache: new Map(),
  expandedNodes: new Set(),
  selectedId: "",
  sectorFilter: "ALL",
  searchQuery: "",
  currentPage: 1,
  pageSize: 14,
  showLabels: true,
  showLanes: true,
  autoOrbit: true
};

export const modalState = {
  activeSystemId: "",
  activeRepoName: ROOT_REPO,
  filePath: "",
  viewMode: "primary",
  rawText: ""
};

// Strictly classify GitHub entries:
// - Submodules / commit links (mode 160000 or type "commit") => "repo"
// - Tree entries => "folder"
// - Everything else => "file"
export function classifyKind(entry) {
  if (!entry) return "file";
  const modeStr = String(entry.mode || "");
  if (entry.kind === "repo" || entry.type === "commit" || modeStr.startsWith("160000")) {
    return "repo";
  }
  if (entry.kind === "folder" || entry.type === "tree") {
    return "folder";
  }
  return "file";
}

export function getExtension(filePath) {
  const clean = String(filePath || "").split("?")[0].split("#")[0];
  const dot = clean.lastIndexOf(".");
  return dot >= 0 ? clean.slice(dot + 1).toLowerCase() : "";
}

export function isHtmlPath(filePath) {
  const ext = getExtension(filePath);
  return ext === "html" || ext === "htm";
}

export function isMarkdownPath(filePath) {
  const ext = getExtension(filePath);
  return ext === "md" || ext === "markdown";
}

// Non-HTML and non-Markdown files (including .json) open in text/raw view
export function isTextViewFile(filePath) {
  return !isHtmlPath(filePath) && !isMarkdownPath(filePath);
}

export function setIndexQuery(repoName) {
  if (!repoName) return;
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("index", repoName);
    window.history.replaceState({ index: repoName }, "", url.toString());
  } catch (_) {}
}

export function readIndexQuery() {
  try {
    return new URLSearchParams(window.location.search).get("index") || "";
  } catch (_) {
    return "";
  }
}

export function computeOrbitalPosition(index, total, kind) {
  if (index === 0) return [0, 0, 0];
  const sec = SECTOR_PALETTE[(index % (SECTOR_PALETTE.length - 1)) + 1];
  const angle = index * 1.15;
  const radius = kind === "repo" ? 10 + (index % 4) * 4.5 : 6 + (index % 3) * 3.2;
  const yOff = ((index % 5) - 2) * 3.0;
  return [
    +(sec.center[0] + Math.cos(angle) * radius).toFixed(2),
    +(sec.center[1] + yOff).toFixed(2),
    +(sec.center[2] + Math.sin(angle) * radius).toFixed(2)
  ];
}

export function buildHierarchyFromGitTree(gitTreeItems) {
  const root = [];
  const dirMap = new Map();

  gitTreeItems.forEach((item) => {
    const parts = item.path.split("/");
    const entryName = parts[parts.length - 1];
    const parentPath = parts.slice(0, -1).join("/");
    const kind = classifyKind(item);

    const node = {
      id: item.path,
      name: entryName,
      kind,
      type: kind,
      mode: item.mode || (kind === "repo" ? "160000" : kind === "folder" ? "040000" : "100644"),
      path: item.path,
      repo: kind === "repo" ? entryName : ROOT_REPO,
      children: kind === "folder" ? [] : undefined
    };

    if (kind === "folder") {
      dirMap.set(item.path, node);
    }

    if (!parentPath) {
      root.push(node);
    } else if (dirMap.has(parentPath)) {
      dirMap.get(parentPath).children.push(node);
    } else {
      root.push(node);
    }
  });

  const rank = { repo: 0, folder: 1, file: 2 };
  const sortRecursive = (arr) => {
    arr.sort((a, b) => {
      const ka = classifyKind(a);
      const kb = classifyKind(b);
      if (ka !== kb) return (rank[ka] ?? 9) - (rank[kb] ?? 9);
      return a.name.localeCompare(b.name);
    });
    arr.forEach((n) => {
      if (n.children) sortRecursive(n.children);
    });
  };
  sortRecursive(root);
  return root;
}

export function simpleMarkdownToHtml(md) {
  let html = String(md || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");
  html = html.replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>");
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/^\s*[-*] (.*$)/gim, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/gims, "<ul>$1</ul>");
  html = html
    .split(/\n{2,}/)
    .map((block) => {
      if (block.trim().startsWith("<")) return block;
      return `<p>${block.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");

  return html;
}
