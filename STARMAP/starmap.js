/* ============================================================================
 * STARMAP/starmap.js
 * Imports headers from ./starmap-data.js and reads live repo data from GitHub
 * ========================================================================== */

import {
  OWNER,
  ROOT_REPO,
  SECTOR_PALETTE,
  liveState,
  modalState,
  classifyKind,
  getExtension,
  isHtmlPath,
  isMarkdownPath,
  isTextViewFile,
  setIndexQuery,
  readIndexQuery,
  computeOrbitalPosition,
  buildHierarchyFromGitTree,
  simpleMarkdownToHtml
} from "./starmap-data.js?v=25";

// =========================================================================
// 1. LIVE GITHUB REPOSITORY & TREE LOADER
// =========================================================================
async function loadGitHubRepositoryData() {
  const statusBadge = document.getElementById("tree-sync-status");
  if (statusBadge) {
    statusBadge.textContent = "FETCHING GITHUB...";
    statusBadge.className = "font-mono-tech text-[9.5px] px-1.5 py-0.5 bg-amber-500/20 text-amber-200 border border-amber-400/50";
  }

  try {
    const repoResp = await fetch(`https://api.github.com/repos/${OWNER}/${ROOT_REPO}`);
    if (repoResp.ok) {
      const repoJson = await repoResp.json();
      if (repoJson.default_branch) {
        liveState.defaultBranch = repoJson.default_branch;
      }
    }

    const treeResp = await fetch(
      `https://api.github.com/repos/${OWNER}/${ROOT_REPO}/git/trees/${encodeURIComponent(liveState.defaultBranch)}?recursive=1`
    );
    if (!treeResp.ok) throw new Error(`HTTP ${treeResp.status}`);
    const treeJson = await treeResp.json();
    const items = Array.isArray(treeJson.tree) ? treeJson.tree : [];

    liveState.rawTree = items;
    rebuildSystemsFromTree(items);

    const nested = buildHierarchyFromGitTree(items);
    liveState.treeCache.set(ROOT_REPO, nested);
    liveState.expandedNodes.add(ROOT_REPO);

    if (statusBadge) {
      statusBadge.textContent = `LIVE (${items.length})`;
      statusBadge.className = "font-mono-tech text-[9.5px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-200 border border-emerald-400/50";
    }

    rebuildThreeNodes();
    const targetId = liveState.selectedId || (liveState.systems[0] && liveState.systems[0].id);
    if (targetId) selectSystem(targetId, false);
    renderTree();
  } catch (err) {
    if (statusBadge) {
      statusBadge.textContent = `GITHUB ERR: ${err.message}`;
      statusBadge.className = "font-mono-tech text-[9.5px] px-1.5 py-0.5 bg-rose-500/20 text-rose-200 border border-rose-400/50";
    }
    renderTree();
  }
}

function rebuildSystemsFromTree(items) {
  liveState.systems = [];
  liveState.systemMap.clear();
  liveState.lanes = [];

  const hubNode = {
    id: ROOT_REPO,
    name: ROOT_REPO,
    kind: "repo",
    type: "repo",
    mode: "040000 hub",
    path: "/",
    repo: ROOT_REPO,
    sector: SECTOR_PALETTE[0],
    pos: [0, 0, 0],
    neighbors: new Set()
  };
  liveState.systems.push(hubNode);
  liveState.systemMap.set(hubNode.id, hubNode);

  items.forEach((entry, idx) => {
    const kind = classifyKind(entry);
    const parts = entry.path.split("/");
    const name = parts[parts.length - 1];
    const sec = SECTOR_PALETTE[((idx + 1) % (SECTOR_PALETTE.length - 1)) + 1];

    const sys = {
      id: entry.path,
      name,
      kind,
      type: kind,
      mode: entry.mode || kind,
      path: entry.path,
      repo: kind === "repo" ? name : ROOT_REPO,
      sector: sec,
      pos: computeOrbitalPosition(idx + 1, items.length, kind),
      neighbors: new Set()
    };

    liveState.systems.push(sys);
    liveState.systemMap.set(sys.id, sys);

    // Connect hub to top-level repos/folders/files
    if (!entry.path.includes("/") && liveState.lanes.length < 40) {
      liveState.lanes.push({ a: hubNode.id, b: sys.id });
      hubNode.neighbors.add(sys.id);
      sys.neighbors.add(hubNode.id);
    }
  });
}

function startMiniCron(intervalMs = 60000) {
  const initialQueryRepo = readIndexQuery();
  if (initialQueryRepo) {
    setIndexQuery(initialQueryRepo);
  }
  return window.setInterval(() => {
    const activeRepo = readIndexQuery() || liveState.selectedId || ROOT_REPO;
    setIndexQuery(activeRepo);
    loadGitHubRepositoryData();
  }, intervalMs);
}

// =========================================================================
// 2. RECURSIVE TREE & PAGINATION ENGINE (REPO / FOLDER / FILE)
// =========================================================================
function getFlattenedTreeRows() {
  const q = liveState.searchQuery.trim().toLowerCase();
  const rows = [];

  function walk(nodes, depth) {
    if (!Array.isArray(nodes)) return;
    for (const n of nodes) {
      const kind = classifyKind(n);
      const matchesSector =
        liveState.sectorFilter === "ALL" ||
        (n.sector && n.sector.id === liveState.sectorFilter) ||
        depth > 0;
      const matchesQuery =
        !q ||
        n.name.toLowerCase().includes(q) ||
        (n.path || "").toLowerCase().includes(q) ||
        kind.includes(q);
      const hasMatchingChild =
        Array.isArray(n.children) &&
        n.children.some((c) => c.name.toLowerCase().includes(q) || (c.path || "").toLowerCase().includes(q));

      if (matchesSector && (matchesQuery || hasMatchingChild)) {
        const hasChildren = Array.isArray(n.children) && n.children.length > 0;
        rows.push({
          rowId: n.id,
          name: n.name,
          kind,
          type: kind,
          depth,
          path: n.path,
          repo: kind === "repo" ? n.name : ROOT_REPO,
          color: n.sector ? n.sector.color : "#7ce8ff",
          hasChildren
        });
        if (hasChildren && (liveState.expandedNodes.has(n.id) || q.length > 0)) {
          walk(n.children, depth + 1);
        }
      }
    }
  }

  walk(liveState.systems, 0);
  return rows;
}

function renderTree() {
  const container = document.getElementById("tree-list-container");
  if (!container) return;

  const allRows = getFlattenedTreeRows();
  const totalPages = Math.max(1, Math.ceil(allRows.length / liveState.pageSize));
  if (liveState.currentPage > totalPages) liveState.currentPage = totalPages;

  const startIdx = (liveState.currentPage - 1) * liveState.pageSize;
  const pageRows = allRows.slice(startIdx, startIdx + liveState.pageSize);

  document.getElementById("page-indicator").textContent = `PAGE ${liveState.currentPage} / ${totalPages}`;
  document.getElementById("item-count-indicator").textContent = `${allRows.length} GITHUB NODES`;
  document.getElementById("btn-prev-page").disabled = liveState.currentPage <= 1;
  document.getElementById("btn-next-page").disabled = liveState.currentPage >= totalPages;

  container.innerHTML = "";
  if (pageRows.length === 0) {
    container.innerHTML = `<div class="p-4 text-center text-slate-400 border border-dashed border-slate-700">NO ITEMS LOADED FROM GITHUB</div>`;
    return;
  }

  pageRows.forEach((row) => {
    const isSelected = row.rowId === liveState.selectedId;
    const isExpanded = liveState.expandedNodes.has(row.rowId);

    const div = document.createElement("div");
    div.style.paddingLeft = `${8 + row.depth * 14}px`;
    div.className = `pr-2 py-1.5 flex items-center justify-between gap-1.5 cursor-pointer border transition-colors ${
      isSelected
        ? "bg-cyan-500/20 border-cyan-400/70 text-white"
        : "bg-slate-900/55 border-transparent hover:border-cyan-500/35 hover:bg-slate-900/90 text-slate-300"
    }`;

    const leftPart = document.createElement("div");
    leftPart.className = "flex items-center gap-1.5 min-w-0";

    if (row.hasChildren) {
      const caret = document.createElement("span");
      caret.textContent = isExpanded ? "▾" : "▸";
      caret.className = "text-cyan-400 w-3 text-center shrink-0";
      caret.onclick = (e) => {
        e.stopPropagation();
        if (liveState.expandedNodes.has(row.rowId)) liveState.expandedNodes.delete(row.rowId);
        else liveState.expandedNodes.add(row.rowId);
        renderTree();
      };
      leftPart.appendChild(caret);
    } else {
      const spacer = document.createElement("span");
      spacer.textContent = row.depth > 0 ? "└" : "•";
      spacer.className = "text-slate-600 w-3 text-center shrink-0";
      leftPart.appendChild(spacer);
    }

    const icon = document.createElement("span");
    if (row.kind === "repo") {
      icon.textContent = "◈";
      icon.style.color = row.color || "#ffd97d";
    } else if (row.kind === "folder") {
      icon.textContent = "📁";
      icon.className = "text-[10px]";
    } else {
      icon.textContent = "📄";
      icon.className = "text-[10px]";
    }
    leftPart.appendChild(icon);

    const label = document.createElement("span");
    label.textContent = row.name;
    label.className = `truncate ${row.depth === 0 ? "font-semibold text-slate-100" : "text-slate-300"}`;
    leftPart.appendChild(label);
    div.appendChild(leftPart);

    const badge = document.createElement("span");
    if (row.kind === "repo") {
      badge.textContent = "REPO";
      badge.className = "text-[9px] px-1 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-400/40 shrink-0";
    } else if (row.kind === "folder") {
      badge.textContent = "DIR";
      badge.className = "text-[9px] px-1 py-0.2 bg-cyan-500/15 text-cyan-300 border border-cyan-400/35 shrink-0";
    } else {
      badge.textContent = isTextViewFile(row.path) ? "TEXT" : "VIEW";
      badge.className = "text-[9px] px-1 py-0.2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shrink-0";
    }
    div.appendChild(badge);

    div.onclick = () => {
      if (row.kind === "repo") {
        setIndexQuery(row.name);
        if (liveState.systemMap.has(row.rowId)) {
          selectSystem(row.rowId, true);
        }
        if (row.hasChildren) {
          if (liveState.expandedNodes.has(row.rowId)) liveState.expandedNodes.delete(row.rowId);
          else liveState.expandedNodes.add(row.rowId);
          renderTree();
        }
      } else if (row.kind === "folder") {
        if (liveState.expandedNodes.has(row.rowId)) liveState.expandedNodes.delete(row.rowId);
        else liveState.expandedNodes.add(row.rowId);
        renderTree();
      } else {
        openFileViewerModal(row.path);
      }
    };

    container.appendChild(div);
  });
}

// =========================================================================
// 3. POP-UP VIEWER (HTML/MD + TEXT/RAW VIEW FOR .JSON & OTHER FILES)
// =========================================================================
function renderModalContent() {
  const iframe = document.getElementById("modal-iframe");
  const mdView = document.getElementById("modal-markdown-view");
  const rawView = document.getElementById("modal-raw-view");
  const tabPrimary = document.getElementById("modal-tab-primary");
  const tabRaw = document.getElementById("modal-tab-raw");

  iframe.classList.add("hidden");
  mdView.classList.add("hidden");
  rawView.classList.add("hidden");

  const forceText = isTextViewFile(modalState.filePath);
  const showRaw = modalState.viewMode === "raw" || forceText;

  if (showRaw) {
    tabRaw.className = "mech-btn px-2.5 py-1 bg-cyan-500/25 text-white border border-cyan-400/60 font-semibold";
    tabPrimary.className = "mech-btn px-2.5 py-1 bg-slate-900 text-slate-300 border border-slate-700 hover:border-cyan-400/50";
    if (getExtension(modalState.filePath) === "json") {
      try {
        rawView.textContent = JSON.stringify(JSON.parse(modalState.rawText), null, 2);
      } catch (_) {
        rawView.textContent = modalState.rawText;
      }
    } else {
      rawView.textContent = modalState.rawText;
    }
    rawView.classList.remove("hidden");
  } else {
    tabPrimary.className = "mech-btn px-2.5 py-1 bg-cyan-500/25 text-white border border-cyan-400/60 font-semibold";
    tabRaw.className = "mech-btn px-2.5 py-1 bg-slate-900 text-slate-300 border border-slate-700 hover:border-cyan-400/50";
    if (isHtmlPath(modalState.filePath)) {
      const baseTag = `<base href="https://raw.githubusercontent.com/${OWNER}/${ROOT_REPO}/${liveState.defaultBranch}/" />`;
      const injectedHtml = modalState.rawText.includes("<head>")
        ? modalState.rawText.replace("<head>", `<head>${baseTag}`)
        : `${baseTag}${modalState.rawText}`;
      iframe.srcdoc = injectedHtml;
      iframe.classList.remove("hidden");
    } else {
      mdView.innerHTML = simpleMarkdownToHtml(modalState.rawText);
      mdView.classList.remove("hidden");
    }
  }
}

async function openFileViewerModal(targetPath) {
  const cleanPath = String(targetPath || "").replace(/^\/+/, "");
  if (!cleanPath) return;

  const selectedSys = liveState.systemMap.get(liveState.selectedId);
  const queryRepo = selectedSys && selectedSys.kind === "repo" ? selectedSys.name : ROOT_REPO;
  setIndexQuery(queryRepo);

  const isHtml = isHtmlPath(cleanPath);
  const isText = isTextViewFile(cleanPath);

  modalState.filePath = cleanPath;
  modalState.activeRepoName = ROOT_REPO;
  modalState.viewMode = isText ? "raw" : "primary";

  const modal = document.getElementById("file-viewer-modal");
  const modalCard = document.getElementById("file-viewer-card");
  modalCard.classList.remove("mech-win-modal-index", "mech-win-modal-readme");
  modalCard.classList.add(isHtml ? "mech-win-modal-index" : "mech-win-modal-readme");

  document.getElementById("modal-file-badge").textContent = isHtml
    ? "HTML TARGET"
    : isText
    ? "TEXT VIEW"
    : "MARKDOWN DOC";
  document.getElementById("modal-title").textContent = `${OWNER}/${ROOT_REPO}/${cleanPath}`;
  document.getElementById("modal-tab-primary").textContent = isHtml ? "LIVE RENDER" : "RENDERED DOC";
  document.getElementById("modal-github-link").href = `https://github.com/${OWNER}/${ROOT_REPO}/blob/${liveState.defaultBranch}/${cleanPath}`;

  const rawUrl = `https://raw.githubusercontent.com/${OWNER}/${ROOT_REPO}/${liveState.defaultBranch}/${cleanPath}`;
  document.getElementById("modal-source-url").textContent = rawUrl;

  const statusEl = document.getElementById("modal-fetch-status");
  statusEl.textContent = "FETCHING STREAM...";
  statusEl.className = "text-amber-300 shrink-0 ml-2";

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  try {
    const res = await fetch(rawUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    modalState.rawText = await res.text();
    statusEl.textContent = "200 OK";
    statusEl.className = "text-emerald-300 shrink-0 ml-2";
  } catch (err) {
    modalState.viewMode = "raw";
    modalState.rawText = `${rawUrl}\n${err.message}`;
    statusEl.textContent = "TEXT FALLBACK";
    statusEl.className = "text-cyan-300 shrink-0 ml-2";
  }

  renderModalContent();
}

function closeFileViewerModal() {
  const modal = document.getElementById("file-viewer-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.getElementById("modal-iframe").srcdoc = "";
}

// =========================================================================
// 4. THREE.JS 3D SCENE & HUD
// =========================================================================
let scene, camera, renderer, controls, raycaster, mouse;
let nodesGroup, lanesGroup, selectionReticle, hoveredId = null;
const starMeshes = new Map();
const labelElements = new Map();

const cameraTween = {
  active: false,
  startPos: new THREE.Vector3(),
  endPos: new THREE.Vector3(),
  startTarget: new THREE.Vector3(),
  endTarget: new THREE.Vector3(),
  progress: 0
};

function initThreeScene() {
  const container = document.getElementById("canvas-container");
  scene = new THREE.Scene();
  scene.fog = null;

  camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 48, 92);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.autoRotate = liveState.autoOrbit;
  controls.autoRotateSpeed = 0.45;

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2(-99, -99);

  scene.add(new THREE.AmbientLight(0x334155, 1.4));
  const hubLight = new THREE.PointLight(0xffd97d, 2.8, 160);
  scene.add(hubLight);

  nodesGroup = new THREE.Group();
  lanesGroup = new THREE.Group();
  scene.add(nodesGroup);
  scene.add(lanesGroup);

  selectionReticle = new THREE.Mesh(
    new THREE.RingGeometry(2.3, 2.75, 6),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.9 })
  );
  scene.add(selectionReticle);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  renderer.domElement.addEventListener("pointermove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(Array.from(starMeshes.values()), false);
    const tooltip = document.getElementById("hover-tooltip");

    if (hits.length > 0) {
      const id = hits[0].object.userData.systemId;
      hoveredId = id;
      document.body.style.cursor = "pointer";
      const sys = liveState.systemMap.get(id);
      if (sys && tooltip) {
        document.getElementById("tt-name").textContent = sys.name;
        document.getElementById("tt-mode").textContent = `${sys.mode} • ${sys.kind.toUpperCase()}`;
        document.getElementById("tt-sector").textContent = sys.sector.label;
        document.getElementById("tt-sector").style.color = sys.sector.color;
        document.getElementById("tt-desc").textContent = sys.path;
        document.getElementById("tt-coords").textContent = `X:${sys.pos[0]} Y:${sys.pos[1]} Z:${sys.pos[2]}`;
        tooltip.style.left = `${Math.min(window.innerWidth - 310, event.clientX + 16)}px`;
        tooltip.style.top = `${Math.min(window.innerHeight - 150, event.clientY + 16)}px`;
        tooltip.style.opacity = "1";
      }
    } else {
      hoveredId = null;
      document.body.style.cursor = "default";
      if (tooltip) tooltip.style.opacity = "0";
    }
  });

  renderer.domElement.addEventListener("click", () => {
    if (hoveredId) selectSystem(hoveredId, true);
  });
}

function rebuildThreeNodes() {
  if (!nodesGroup || !lanesGroup) return;
  while (nodesGroup.children.length) nodesGroup.remove(nodesGroup.children[0]);
  while (lanesGroup.children.length) lanesGroup.remove(lanesGroup.children[0]);
  starMeshes.clear();

  const labelsLayer = document.getElementById("labels-layer");
  if (labelsLayer) labelsLayer.innerHTML = "";
  labelElements.clear();

  liveState.systems.forEach((sys, idx) => {
    const isRoot = idx === 0;
    const geo = isRoot
      ? new THREE.IcosahedronGeometry(3.0, 1)
      : sys.kind === "repo"
      ? new THREE.OctahedronGeometry(1.3, 0)
      : sys.kind === "folder"
      ? new THREE.BoxGeometry(1.1, 1.1, 1.1)
      : new THREE.SphereGeometry(0.75, 10, 10);

    const mat = new THREE.MeshStandardMaterial({
      color: sys.sector.hex,
      emissive: sys.sector.hex,
      emissiveIntensity: isRoot ? 0.8 : 0.55,
      roughness: 0.25,
      metalness: 0.75
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...sys.pos);
    mesh.userData = { systemId: sys.id };
    nodesGroup.add(mesh);
    starMeshes.set(sys.id, mesh);

    if (labelsLayer && idx < 45) {
      const lbl = document.createElement("div");
      lbl.textContent = sys.name;
      lbl.className = `star-label ${isRoot ? "is-hub" : ""}`;
      lbl.style.color = sys.sector.color;
      lbl.onclick = (e) => {
        e.stopPropagation();
        selectSystem(sys.id, true);
      };
      labelsLayer.appendChild(lbl);
      labelElements.set(sys.id, lbl);
    }
  });

  liveState.lanes.forEach((lane) => {
    const a = liveState.systemMap.get(lane.a);
    const b = liveState.systemMap.get(lane.b);
    if (!a || !b) return;
    const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...a.pos), new THREE.Vector3(...b.pos)]);
    const mat = new THREE.LineBasicMaterial({ color: 0x7ce8ff, transparent: true, opacity: 0.22 });
    lanesGroup.add(new THREE.Line(geo, mat));
  });
}

function selectSystem(systemId, flyCamera = true) {
  const sys = liveState.systemMap.get(systemId);
  if (!sys) return;
  liveState.selectedId = systemId;

  const repoForQuery = sys.kind === "repo" ? sys.name : ROOT_REPO;
  setIndexQuery(repoForQuery);

  document.getElementById("hud-title").textContent = sys.name;
  document.getElementById("hud-mode-badge").textContent = `${sys.mode} • ${sys.kind.toUpperCase()}`;
  document.getElementById("hud-sector").textContent = sys.sector.label;
  document.getElementById("hud-sector").style.color = sys.sector.color;
  document.getElementById("hud-desc").textContent = sys.path;
  document.getElementById("hud-path").textContent = sys.path;
  document.getElementById("hud-coords").textContent = `X:${sys.pos[0]} | Y:${sys.pos[1]} | Z:${sys.pos[2]}`;

  const targetRepoUrl = `https://github.com/${OWNER}/${encodeURIComponent(repoForQuery)}`;
  document.getElementById("hud-link-repo").href = targetRepoUrl;

  document.getElementById("hud-btn-index").onclick = () => {
    const htmlMatch = liveState.rawTree.find((t) => classifyKind(t) === "file" && isHtmlPath(t.path));
    openFileViewerModal(htmlMatch ? htmlMatch.path : sys.path);
  };

  document.getElementById("hud-btn-readme").onclick = () => {
    const mdMatch = liveState.rawTree.find((t) => classifyKind(t) === "file" && isMarkdownPath(t.path));
    openFileViewerModal(mdMatch ? mdMatch.path : sys.path);
  };

  const neighborsEl = document.getElementById("hud-neighbors");
  neighborsEl.innerHTML = "";
  const neighborIds = Array.from(sys.neighbors);
  document.getElementById("hud-neighbor-count").textContent = `${neighborIds.length} LINKS`;
  neighborIds.forEach((nId) => {
    const nSys = liveState.systemMap.get(nId);
    if (!nSys) return;
    const btn = document.createElement("button");
    btn.textContent = nSys.name;
    btn.className = "mech-btn px-2 py-0.5 font-mono-tech text-[10px] bg-slate-900/90 text-cyan-200 border border-cyan-500/35 hover:border-cyan-300";
    btn.onclick = () => selectSystem(nSys.id, true);
    neighborsEl.appendChild(btn);
  });

  labelElements.forEach((el, id) => el.classList.toggle("is-selected", id === systemId));

  if (selectionReticle) {
    selectionReticle.position.set(...sys.pos);
  }

  if (flyCamera && camera && controls) {
    const targetVec = new THREE.Vector3(...sys.pos);
    cameraTween.startPos.copy(camera.position);
    cameraTween.endPos.copy(targetVec).add(new THREE.Vector3(14, 10, 22));
    cameraTween.startTarget.copy(controls.target);
    cameraTween.endTarget.copy(targetVec);
    cameraTween.progress = 0;
    cameraTween.active = true;
  }

  renderTree();
}

function applySectorFilter(sectorKey) {
  liveState.sectorFilter = sectorKey;
  liveState.currentPage = 1;
  document.querySelectorAll(".sector-pill").forEach((btn) => {
    btn.classList.toggle("bg-cyan-500/30", btn.dataset.sector === sectorKey);
  });
  const sel = document.getElementById("tree-sector-select");
  if (sel) sel.value = sectorKey;
  renderTree();
}

function updateProjectedLabels() {
  const tempV = new THREE.Vector3();
  labelElements.forEach((lbl, id) => {
    const mesh = starMeshes.get(id);
    if (!mesh) return;
    if (!liveState.showLabels) {
      lbl.style.display = "none";
      return;
    }
    mesh.getWorldPosition(tempV);
    tempV.project(camera);
    if (tempV.z > 1) {
      lbl.style.display = "none";
      return;
    }
    lbl.style.display = "block";
    lbl.style.left = `${(tempV.x * 0.5 + 0.5) * window.innerWidth}px`;
    lbl.style.top = `${(-(tempV.y * 0.5) + 0.5) * window.innerHeight}px`;
  });
}

function animate() {
  requestAnimationFrame(animate);
  const t = performance.now() * 0.001;

  if (selectionReticle && camera) {
    selectionReticle.lookAt(camera.position);
    selectionReticle.rotation.z = t * 1.2;
  }

  if (cameraTween.active && camera && controls) {
    cameraTween.progress += 0.045;
    const ease = 1 - Math.pow(1 - Math.min(1, cameraTween.progress), 3);
    camera.position.lerpVectors(cameraTween.startPos, cameraTween.endPos, ease);
    controls.target.lerpVectors(cameraTween.startTarget, cameraTween.endTarget, ease);
    if (cameraTween.progress >= 1) cameraTween.active = false;
  }

  if (controls) controls.update();
  if (renderer && scene && camera) renderer.render(scene, camera);
  updateProjectedLabels();
}

window.addEventListener("DOMContentLoaded", () => {
  initThreeScene();
  loadGitHubRepositoryData();
  startMiniCron();
  animate();

  document.querySelectorAll(".sector-pill").forEach((btn) => {
    btn.addEventListener("click", () => applySectorFilter(btn.dataset.sector));
  });

  document.getElementById("tree-search").addEventListener("input", (e) => {
    liveState.searchQuery = e.target.value;
    liveState.currentPage = 1;
    renderTree();
  });

  document.getElementById("tree-sector-select").addEventListener("change", (e) => applySectorFilter(e.target.value));

  document.getElementById("page-size-select").addEventListener("change", (e) => {
    liveState.pageSize = parseInt(e.target.value, 10) || 14;
    liveState.currentPage = 1;
    renderTree();
  });

  document.getElementById("btn-prev-page").addEventListener("click", () => {
    if (liveState.currentPage > 1) {
      liveState.currentPage--;
      renderTree();
    }
  });

  document.getElementById("btn-next-page").addEventListener("click", () => {
    liveState.currentPage++;
    renderTree();
  });

  document.getElementById("btn-expand-all").addEventListener("click", () => {
    liveState.systems.forEach((s) => liveState.expandedNodes.add(s.id));
    renderTree();
  });

  document.getElementById("btn-collapse-all").addEventListener("click", () => {
    liveState.expandedNodes.clear();
    liveState.currentPage = 1;
    renderTree();
  });

  document.getElementById("btn-sync-live").addEventListener("click", () => loadGitHubRepositoryData());

  const leftDrawer = document.getElementById("left-drawer");
  const rightDrawer = document.getElementById("right-drawer");
  document.getElementById("btn-toggle-left").addEventListener("click", () => leftDrawer.classList.toggle("-translate-x-[120%]"));
  document.getElementById("btn-toggle-right").addEventListener("click", () => rightDrawer.classList.toggle("translate-x-[120%]"));

  document.getElementById("btn-reset-cam").addEventListener("click", () => selectSystem(ROOT_REPO, true));

  document.getElementById("btn-toggle-labels").addEventListener("click", (e) => {
    liveState.showLabels = !liveState.showLabels;
    e.target.textContent = `LABELS: ${liveState.showLabels ? "ON" : "OFF"}`;
  });

  document.getElementById("btn-toggle-lanes").addEventListener("click", (e) => {
    liveState.showLanes = !liveState.showLanes;
    if (lanesGroup) lanesGroup.visible = liveState.showLanes;
    e.target.textContent = `JUMP-LANES: ${liveState.showLanes ? "ON" : "OFF"}`;
  });

  document.getElementById("btn-toggle-orbit").addEventListener("click", (e) => {
    liveState.autoOrbit = !liveState.autoOrbit;
    if (controls) controls.autoRotate = liveState.autoOrbit;
    e.target.textContent = `AUTO-ORBIT: ${liveState.autoOrbit ? "ON" : "OFF"}`;
  });

  document.getElementById("modal-tab-primary").addEventListener("click", () => {
    modalState.viewMode = "primary";
    renderModalContent();
  });

  document.getElementById("modal-tab-raw").addEventListener("click", () => {
    modalState.viewMode = "raw";
    renderModalContent();
  });

  document.getElementById("modal-close-btn").addEventListener("click", closeFileViewerModal);
  document.getElementById("file-viewer-modal").addEventListener("click", (e) => {
    if (e.target.id === "file-viewer-modal") closeFileViewerModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;
    if (e.key === "[" && liveState.currentPage > 1) {
      liveState.currentPage--;
      renderTree();
    } else if (e.key === "]") {
      liveState.currentPage++;
      renderTree();
    } else if (e.key === "Escape") {
      const modal = document.getElementById("file-viewer-modal");
      if (!modal.classList.contains("hidden")) {
        closeFileViewerModal();
      } else {
        applySectorFilter("ALL");
        selectSystem(ROOT_REPO, true);
      }
    }
  });
});
