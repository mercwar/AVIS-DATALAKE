    // =========================================================================
    // 1. GALACTIC CONSTELLATION TOPOLOGY DATA (55 NODES: 1 HUB + 3 BLOBS + 51 REPOS)
    // =========================================================================
    const SECTORS = {
      HUB: {
        id: 'HUB',
        name: 'CENTRAL COMMAND HUB',
        color: '#ffd97d',
        hex: 0xffd97d,
        center: [0, 0, 0]
      },
      AVIS_CORE: {
        id: 'AVIS_CORE',
        name: 'SECTOR I // AVIS CORE & DATAFLOW',
        color: '#00f0ff',
        hex: 0x00f0ff,
        center: [-34, 10, -24]
      },
      CYBORG_3D: {
        id: 'CYBORG_3D',
        name: 'SECTOR II // CYBORG & UNIVERSE / 3D',
        color: '#b84dff',
        hex: 0xb84dff,
        center: [36, 12, -22]
      },
      ENGINES_LLM: {
        id: 'ENGINES_LLM',
        name: 'SECTOR III // ENGINES, LLM & WIN32/CLI',
        color: '#ff9d00',
        hex: 0xff9d00,
        center: [32, -11, 30]
      },
      ACADEMIES_ROBO: {
        id: 'ACADEMIES_ROBO',
        name: 'SECTOR IV // ACADEMIES, COMICS & ROBO ROOK',
        color: '#00ff9d',
        hex: 0x00ff9d,
        center: [-34, -10, 28]
      }
    };

    const RAW_SYSTEMS = [
      // Central Hub & Core Datalake Files (4 nodes)
      { id: 'AVIS-DATALAKE', name: 'AVIS-DATALAKE', sector: 'HUB', mode: '040000 hub', path: '/', isHub: true, desc: 'Central command hub aggregating 51 linked 160000 gitlink submodules, .gitmodules registry, and _config.yml exclusions.' },
      { id: '.gitmodules', name: '.gitmodules', sector: 'HUB', mode: '100644 blob', path: '/.gitmodules', isBlob: true, desc: 'Master submodule index mapping all 51 external mercwar repositories into the AVIS-DATALAKE tree.' },
      { id: '_config.yml', name: '_config.yml', sector: 'HUB', mode: '100644 blob', path: '/_config.yml', isBlob: true, desc: 'Jekyll / GitHub Pages configuration and exclusion directives for the datalake index.' },
      { id: 'README.md', name: 'README.md', sector: 'HUB', mode: '100644 blob', path: '/README.md', isBlob: true, desc: 'Root architectural manifest and documentation overview for mercwar/AVIS-DATALAKE.' },

      // Sector I: AVIS Core & Dataflow (12 nodes)
      { id: 'AVIS', name: 'AVIS', sector: 'AVIS_CORE', mode: '160000 commit', path: '/AVIS', desc: 'Primary Autonomous Virtual Intelligence System runtime and orchestration core.' },
      { id: 'AVIS-DATALAKE-ENGINE', name: 'AVIS-DATALAKE-ENGINE', sector: 'AVIS_CORE', mode: '160000 commit', path: '/AVIS-DATALAKE-ENGINE', desc: 'High-throughput indexing and ingestion engine powering the AVIS datalake.' },
      { id: 'AVIS-DL', name: 'AVIS-DL', sector: 'AVIS_CORE', mode: '160000 commit', path: '/AVIS-DL', desc: 'Streamlined datalake synchronization and artifact retrieval subsystem.' },
      { id: 'AVIS-DROP', name: 'AVIS-DROP', sector: 'AVIS_CORE', mode: '160000 commit', path: '/AVIS-DROP', desc: 'Rapid payload drop-zone and automated ingestion pipeline.' },
      { id: 'AVIS-LOGIC-CORE', name: 'AVIS-LOGIC-CORE', sector: 'AVIS_CORE', mode: '160000 commit', path: '/AVIS-LOGIC-CORE', desc: 'Symbolic reasoning, rule evaluation, and decision-tree kernel for AVIS.' },
      { id: 'AVIS-NEWS', name: 'AVIS-NEWS', sector: 'AVIS_CORE', mode: '160000 commit', path: '/AVIS-NEWS', desc: 'Real-time telemetry feed and news aggregation stream.' },
      { id: 'AVIS-SEARCH', name: 'AVIS-SEARCH', sector: 'AVIS_CORE', mode: '160000 commit', path: '/AVIS-SEARCH', desc: 'Semantic and lexical query engine across indexed datalake repositories.' },
      { id: 'AVIS-TRAY-MENU', name: 'AVIS-TRAY-MENU', sector: 'AVIS_CORE', mode: '160000 commit', path: '/AVIS-TRAY-MENU', desc: 'Desktop system-tray command launcher and quick-status interface.' },
      { id: 'AVIS-ALERT-FVS', name: 'AVIS-ALERT-FVS', sector: 'AVIS_CORE', mode: '160000 commit', path: '/AVIS-ALERT-FVS', desc: 'File verification system and anomaly alert monitor.' },
      { id: 'AVIS-AI-INI-DIR-MK-SCAN', name: 'AVIS-AI-INI-DIR-MK-SCAN', sector: 'AVIS_CORE', mode: '160000 commit', path: '/AVIS-AI-INI-DIR-MK-SCAN', desc: 'Automated directory initialization, scanning, and manifest generation utility.' },
      { id: 'CRON', name: 'CRON', sector: 'AVIS_CORE', mode: '160000 commit', path: '/CRON', desc: 'Scheduled task execution daemon and periodic pipeline triggers.' },
      { id: 'NEXUS', name: 'NEXUS', sector: 'AVIS_CORE', mode: '160000 commit', path: '/NEXUS', desc: 'Inter-module message bus and routing hub linking AVIS services.' },

      // Sector II: Cyborg & Universe / 3D (12 nodes)
      { id: 'Cyborg', name: 'Cyborg', sector: 'CYBORG_3D', mode: '160000 commit', path: '/Cyborg', desc: 'Cybernetic interface framework and autonomous agent shell.' },
      { id: 'CYBORG-LIVE-GIT-BROWSER', name: 'CYBORG-LIVE-GIT-BROWSER', sector: 'CYBORG_3D', mode: '160000 commit', path: '/CYBORG-LIVE-GIT-BROWSER', desc: 'Live interactive Git repository graph and tree explorer.' },
      { id: 'CYBORG-PROJECT-EXPLORER', name: 'CYBORG-PROJECT-EXPLORER', sector: 'CYBORG_3D', mode: '160000 commit', path: '/CYBORG-PROJECT-EXPLORER', desc: 'Multi-project spatial workspace and asset navigator.' },
      { id: 'Constellation', name: 'Constellation', sector: 'CYBORG_3D', mode: '160000 commit', path: '/Constellation', desc: '3D celestial node clustering and star-map topology renderer.' },
      { id: 'Nebula', name: 'Nebula', sector: 'CYBORG_3D', mode: '160000 commit', path: '/Nebula', desc: 'Volumetric particle field and cosmic shader experiment.' },
      { id: 'Quasar', name: 'Quasar', sector: 'CYBORG_3D', mode: '160000 commit', path: '/Quasar', desc: 'High-energy beacon visualization and real-time data pulse renderer.' },
      { id: 'Stargate', name: 'Stargate', sector: 'CYBORG_3D', mode: '160000 commit', path: '/Stargate', desc: 'Portal routing gateway between distributed web/3D environments.' },
      { id: 'Station', name: 'Station', sector: 'CYBORG_3D', mode: '160000 commit', path: '/Station', desc: 'Orbital command deck UI and modular docking bay framework.' },
      { id: 'ECLIPSE', name: 'ECLIPSE', sector: 'CYBORG_3D', mode: '160000 commit', path: '/ECLIPSE', desc: 'Dark-space rendering environment and shader pipeline.' },
      { id: 'Mercwar-AI', name: 'Mercwar-AI', sector: 'CYBORG_3D', mode: '160000 commit', path: '/Mercwar-AI', desc: 'Core persona intelligence and neural model integration layer.' },
      { id: 'AI', name: 'AI', sector: 'CYBORG_3D', mode: '160000 commit', path: '/AI', desc: 'Foundational AI experiments, prompts, and inference scripts.' },
      { id: 'mercwar', name: 'mercwar', sector: 'CYBORG_3D', mode: '160000 commit', path: '/mercwar', desc: 'Profile flagship repository and overarching ecosystem index.' },

      // Sector III: Engines, LLM & Win32/CLI Tools (17 nodes)
      { id: 'Fire-Gem', name: 'Fire-Gem', sector: 'ENGINES_LLM', mode: '160000 commit', path: '/Fire-Gem', desc: 'Lightweight graphics/game engine and particle core.' },
      { id: 'Fire-Star-Alpha', name: 'Fire-Star-Alpha', sector: 'ENGINES_LLM', mode: '160000 commit', path: '/Fire-Star-Alpha', desc: 'Alpha-stage 3D simulation engine and physics sandbox.' },
      { id: 'JOE-TRON-LLMA', name: 'JOE-TRON-LLMA', sector: 'ENGINES_LLM', mode: '160000 commit', path: '/JOE-TRON-LLMA', desc: 'Local Large Language Model assistant harness and runner.' },
      { id: 'GGML-LLAMA-MSVC-INSTALLER', name: 'GGML-LLAMA-MSVC-INSTALLER', sector: 'ENGINES_LLM', mode: '160000 commit', path: '/GGML-LLAMA-MSVC-INSTALLER', desc: 'Automated MSVC build toolchain installer for GGML / llama.cpp on Windows.' },
      { id: 'Dark-Com', name: 'Dark-Com', sector: 'ENGINES_LLM', mode: '160000 commit', path: '/Dark-Com', desc: 'Low-level serial/socket communications utility and terminal.' },
      { id: 'Dark-Com-2', name: 'Dark-Com-2', sector: 'ENGINES_LLM', mode: '160000 commit', path: '/Dark-Com-2', desc: 'Second-generation modular communications and telemetry bridge.' },
      { id: 'dc2url', name: 'dc2url', sector: 'ENGINES_LLM', mode: '160000 commit', path: '/dc2url', desc: 'Dark-Com URL routing and endpoint dispatcher.' },
      { id: 'dc2php', name: 'dc2php', sector: 'ENGINES_LLM', mode: '160000 commit', path: '/dc2php', desc: 'Dark-Com PHP server-side relay and webhook handler.' },
      { id: 'dc2sql', name: 'dc2sql', sector: 'ENGINES_LLM', mode: '160000 commit', path: '/dc2sql', desc: 'Dark-Com SQL persistence adapter and query logger.' },
      { id: 'CL2', name: 'CL2', sector: 'ENGINES_LLM', mode: '160000 commit', path: '/CL2', desc: 'Command-line v2 automation wrapper and Win32 build helper.' },
      { id: 'Sentinel', name: 'Sentinel', sector: 'ENGINES_LLM', mode: '160000 commit', path: '/Sentinel', desc: 'System watchdog, process guard, and integrity monitor.' },
      { id: 'CYHY-CMT', name: 'CYHY-CMT', sector: 'ENGINES_LLM', mode: '160000 commit', path: '/CYHY-CMT', desc: 'Cyber hygiene configuration management and audit toolkit.' },
      { id: 'CVBGOD-EMOJI', name: 'CVBGOD-EMOJI', sector: 'ENGINES_LLM', mode: '160000 commit', path: '/CVBGOD-EMOJI', desc: 'Symbolic glyph and status-badge generator for CLI & web UIs.' },
      { id: 'CVBGODLY-CONSOLE', name: 'CVBGODLY-CONSOLE', sector: 'ENGINES_LLM', mode: '160000 commit', path: '/CVBGODLY-CONSOLE', desc: 'Enhanced Win32 / ANSI tactical console host and command shell.' },
      { id: 'Powershell', name: 'Powershell', sector: 'ENGINES_LLM', mode: '160000 commit', path: '/Powershell', desc: 'PowerShell automation modules, Git helpers, and system scripts.' },
      { id: 'bin', name: 'bin', sector: 'ENGINES_LLM', mode: '160000 commit', path: '/bin', desc: 'Compiled CLI binaries, batch launchers, and executable utilities.' },
      { id: 'JMC-ANDROID-APP-DEMO', name: 'JMC-ANDROID-APP-DEMO', sector: 'ENGINES_LLM', mode: '160000 commit', path: '/JMC-ANDROID-APP-DEMO', desc: 'Mobile Android companion application prototype and UI demo.' },

      // Sector IV: Academies, Comics & Robo Rook Archive (10 nodes)
      { id: 'Navigator', name: 'Navigator', sector: 'ACADEMIES_ROBO', mode: '160000 commit', path: '/Navigator', desc: 'Interactive learning path and curriculum navigator hub.' },
      { id: 'Navigator-AI-Academy', name: 'Navigator-AI-Academy', sector: 'ACADEMIES_ROBO', mode: '160000 commit', path: '/Navigator-AI-Academy', desc: 'Structured modules on neural networks, LLM prompting, and autonomous agents.' },
      { id: 'Navigator-GitHub-Academy', name: 'Navigator-GitHub-Academy', sector: 'ACADEMIES_ROBO', mode: '160000 commit', path: '/Navigator-GitHub-Academy', desc: 'Training labs for Git submodules, Actions CI/CD, and repo architecture.' },
      { id: 'Navigator-MSVC-Academy', name: 'Navigator-MSVC-Academy', sector: 'ACADEMIES_ROBO', mode: '160000 commit', path: '/Navigator-MSVC-Academy', desc: 'C/C++ native Windows compilation, CMake, and MSVC toolchain mastery.' },
      { id: 'NAVIGATOR-LLM-ACADEMY', name: 'NAVIGATOR-LLM-ACADEMY', sector: 'ACADEMIES_ROBO', mode: '160000 commit', path: '/NAVIGATOR-LLM-ACADEMY', desc: 'Hands-on quantization, GGML inference, and local model deployment guides.' },
      { id: 'Comics', name: 'Comics', sector: 'ACADEMIES_ROBO', mode: '160000 commit', path: '/Comics', desc: 'Visual storytelling archive, sequential art panels, and lore.' },
      { id: 'Robo-Knight-Demos', name: 'Robo-Knight-Demos', sector: 'ACADEMIES_ROBO', mode: '160000 commit', path: '/Robo-Knight-Demos', desc: 'Interactive Robo Knight / Robo Rook playable prototypes and mechanics.' },
      { id: 'Robo-Knight-Gallery', name: 'Robo-Knight-Gallery', sector: 'ACADEMIES_ROBO', mode: '160000 commit', path: '/Robo-Knight-Gallery', desc: 'Concept art, mecha renders, and sprite showcase gallery.' },
      { id: 'Robo-Knight-Player', name: 'Robo-Knight-Player', sector: 'ACADEMIES_ROBO', mode: '160000 commit', path: '/Robo-Knight-Player', desc: 'Media and animation sequence player for Robo Knight assets.' },
      { id: 'robo-knight-inventory', name: 'robo-knight-inventory', sector: 'ACADEMIES_ROBO', mode: '160000 commit', path: '/robo-knight-inventory', desc: 'Equipment loadout, parts manifest, and inventory database.' }
    ];

    // Assign deterministic 3D orbital coordinates around each sector center
    const SYSTEM_MAP = new Map();
    const sectorCounters = { HUB: 0, AVIS_CORE: 0, CYBORG_3D: 0, ENGINES_LLM: 0, ACADEMIES_ROBO: 0 };

    RAW_SYSTEMS.forEach((sys) => {
      const sec = SECTORS[sys.sector];
      const idx = sectorCounters[sys.sector]++;
      if (sys.isHub) {
        sys.pos = [0, 0, 0];
      } else if (sys.isBlob) {
        const angle = (idx / 3) * Math.PI * 2;
        sys.pos = [Math.cos(angle) * 7.5, 3.2, Math.sin(angle) * 7.5];
      } else {
        const angle = idx * 1.18 + (sys.sector.length * 0.4);
        const radius = 8 + (idx % 4) * 4.2;
        const yOff = ((idx % 5) - 2) * 3.1;
        sys.pos = [
          +(sec.center[0] + Math.cos(angle) * radius).toFixed(2),
          +(sec.center[1] + yOff).toFixed(2),
          +(sec.center[2] + Math.sin(angle) * radius).toFixed(2)
        ];
      }
      sys.neighbors = new Set();
      SYSTEM_MAP.set(sys.id, sys);
    });

    // Build Filament Jump-Lanes (Hub -> Sector Anchors + Intra-Sector + Cross-Sector Bridges)
    const JUMP_LANES = [];
    function addLane(aId, bId, isCross = false) {
      if (!SYSTEM_MAP.has(aId) || !SYSTEM_MAP.has(bId) || aId === bId) return;
      const key = [aId, bId].sort().join('::');
      if (JUMP_LANES.some((l) => l.key === key)) return;
      JUMP_LANES.push({ key, a: aId, b: bId, isCross });
      SYSTEM_MAP.get(aId).neighbors.add(bId);
      SYSTEM_MAP.get(bId).neighbors.add(aId);
    }

    // Hub connections to blobs & sector command anchors
    ['.gitmodules', '_config.yml', 'README.md', 'AVIS', 'AVIS-DATALAKE-ENGINE', 'Cyborg', 'Constellation', 'Fire-Gem', 'JOE-TRON-LLMA', 'Navigator', 'Robo-Knight-Demos'].forEach((target) => {
      addLane('AVIS-DATALAKE', target, true);
    });

    // Intra-sector rings & spokes
    Object.keys(SECTORS).forEach((secKey) => {
      if (secKey === 'HUB') return;
      const members = RAW_SYSTEMS.filter((s) => s.sector === secKey);
      for (let i = 0; i < members.length; i++) {
        addLane(members[i].id, members[(i + 1) % members.length].id, false);
        if (i + 3 < members.length) {
          addLane(members[i].id, members[i + 3].id, false);
        }
      }
    });

    // Cross-sector strategic bridges
    addLane('NEXUS', 'Stargate', true);
    addLane('AVIS-LOGIC-CORE', 'Mercwar-AI', true);
    addLane('AVIS-SEARCH', 'CYBORG-LIVE-GIT-BROWSER', true);
    addLane('JOE-TRON-LLMA', 'NAVIGATOR-LLM-ACADEMY', true);
    addLane('GGML-LLAMA-MSVC-INSTALLER', 'Navigator-MSVC-Academy', true);
    addLane('Fire-Star-Alpha', 'Robo-Knight-Demos', true);
    addLane('Station', 'Sentinel', true);

    // =========================================================================
    // 2. RECURSIVE REPOSITORY TREE & PAGINATION ENGINE
    // =========================================================================
    const treeCache = new Map(); // repoName -> nested folder/file children array
    const expandedNodes = new Set(['AVIS-DATALAKE', 'AVIS', 'Cyborg', 'Fire-Gem', 'Navigator']);

    function buildDefaultChildren(sys) {
      if (sys.isBlob) return [];
      const repoName = sys.name;
      if (sys.isHub) {
        return [
          { id: `${repoName}::.gitmodules`, name: '.gitmodules', type: 'file', repo: repoName, path: '.gitmodules', linkSystemId: '.gitmodules' },
          { id: `${repoName}::_config.yml`, name: '_config.yml', type: 'file', repo: repoName, path: '_config.yml', linkSystemId: '_config.yml' },
          { id: `${repoName}::README.md`, name: 'README.md', type: 'file', repo: repoName, path: 'README.md', isReadme: true },
          { id: `${repoName}::index.html`, name: 'index.html', type: 'file', repo: repoName, path: 'index.html', isIndex: true }
        ];
      }
      return [
        { id: `${repoName}::index.html`, name: 'index.html', type: 'file', repo: repoName, path: 'index.html', isIndex: true },
        { id: `${repoName}::README.md`, name: 'README.md', type: 'file', repo: repoName, path: 'README.md', isReadme: true },
        {
          id: `${repoName}::src`,
          name: 'src',
          type: 'folder',
          repo: repoName,
          path: 'src',
          children: [
            { id: `${repoName}::src/core.js`, name: 'core.js', type: 'file', repo: repoName, path: 'src/core.js' },
            { id: `${repoName}::src/manifest.json`, name: 'manifest.json', type: 'file', repo: repoName, path: 'src/manifest.json' }
          ]
        }
      ];
    }

    RAW_SYSTEMS.forEach((sys) => {
      treeCache.set(sys.id, buildDefaultChildren(sys));
    });

    // Convert flat GitHub recursive tree array into nested folder/file hierarchy
    function buildHierarchyFromGitTree(repoName, gitTreeItems) {
      const root = [];
      const dirMap = new Map();

      gitTreeItems.slice(0, 160).forEach((item) => {
        const parts = item.path.split('/');
        const fileName = parts[parts.length - 1];
        const parentPath = parts.slice(0, -1).join('/');
        const nodeObj = {
          id: `${repoName}::${item.path}`,
          name: fileName,
          type: item.type === 'tree' ? 'folder' : 'file',
          repo: repoName,
          path: item.path,
          isIndex: fileName.toLowerCase() === 'index.html',
          isReadme: fileName.toLowerCase() === 'readme.md',
          children: item.type === 'tree' ? [] : undefined
        };

        if (item.type === 'tree') {
          dirMap.set(item.path, nodeObj);
        }

        if (!parentPath) {
          root.push(nodeObj);
        } else if (dirMap.has(parentPath)) {
          dirMap.get(parentPath).children.push(nodeObj);
        } else {
          root.push(nodeObj);
        }
      });

      // Sort folders first, then files alphabetically
      const sortNodes = (arr) => {
        arr.sort((a, b) => {
          if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
          return a.name.localeCompare(b.name);
        });
        arr.forEach((n) => {
          if (n.children) sortNodes(n.children);
        });
      };
      sortNodes(root);
      return root;
    }

    async function fetchLiveRepoTree(systemId) {
      const sys = SYSTEM_MAP.get(systemId) || SYSTEM_MAP.get('AVIS-DATALAKE');
      const repoName = sys.isBlob ? 'AVIS-DATALAKE' : sys.name;
      const statusBadge = document.getElementById('tree-sync-status');
      statusBadge.textContent = 'SYNCING...';
      statusBadge.className = 'font-mono-tech text-[9.5px] px-1.5 py-0.5 bg-amber-500/20 text-amber-200 border border-amber-400/50';

      try {
        const resp = await fetch(`https://api.github.com/repos/mercwar/${encodeURIComponent(repoName)}/git/trees/HEAD?recursive=1`);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        if (Array.isArray(data.tree) && data.tree.length > 0) {
          const nested = buildHierarchyFromGitTree(repoName, data.tree);
          treeCache.set(sys.isBlob ? 'AVIS-DATALAKE' : sys.id, nested);
          expandedNodes.add(sys.isBlob ? 'AVIS-DATALAKE' : sys.id);
          statusBadge.textContent = `LIVE (${data.tree.length})`;
          statusBadge.className = 'font-mono-tech text-[9.5px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-200 border border-emerald-400/50';
          renderTree();
          return;
        }
        throw new Error('Empty tree');
      } catch (err) {
        statusBadge.textContent = 'LOCAL CACHE';
        statusBadge.className = 'font-mono-tech text-[9.5px] px-1.5 py-0.5 bg-cyan-500/15 text-cyan-300 border border-cyan-400/40';
        renderTree();
      }
    }

    const uiState = {
      selectedId: 'AVIS-DATALAKE',
      sectorFilter: 'ALL',
      searchQuery: '',
      currentPage: 1,
      pageSize: 14,
      showLabels: true,
      showLanes: true,
      autoOrbit: true
    };

    function getFlattenedTreeRows() {
      const q = uiState.searchQuery.trim().toLowerCase();
      const rows = [];

      function walkChildren(children, depth, systemId) {
        if (!children) return;
        for (const child of children) {
          const matchesQuery = !q || child.name.toLowerCase().includes(q) || child.path.toLowerCase().includes(q);
          const hasMatchingDescendant = child.children && child.children.some((c) =>
            c.name.toLowerCase().includes(q) || (c.children && c.children.length > 0)
          );

          if (matchesQuery || hasMatchingDescendant) {
            rows.push({
              rowId: child.id,
              systemId,
              name: child.name,
              type: child.type,
              depth,
              repo: child.repo,
              path: child.path,
              isIndex: child.isIndex,
              isReadme: child.isReadme,
              hasChildren: Array.isArray(child.children) && child.children.length > 0
            });
            if (child.type === 'folder' && (expandedNodes.has(child.id) || q.length > 0)) {
              walkChildren(child.children, depth + 1, systemId);
            }
          }
        }
      }

      for (const sys of RAW_SYSTEMS) {
        if (uiState.sectorFilter !== 'ALL' && sys.sector !== uiState.sectorFilter) continue;
        const children = treeCache.get(sys.id) || [];
        const sysMatches = !q || sys.name.toLowerCase().includes(q) || sys.desc.toLowerCase().includes(q);
        const childMatches = q && JSON.stringify(children).toLowerCase().includes(q);

        if (sysMatches || childMatches) {
          rows.push({
            rowId: sys.id,
            systemId: sys.id,
            name: sys.name,
            type: sys.isHub ? 'hub' : sys.isBlob ? 'blob' : 'repo',
            depth: 0,
            sectorColor: SECTORS[sys.sector].color,
            mode: sys.mode,
            hasChildren: children.length > 0
          });

          if (children.length > 0 && (expandedNodes.has(sys.id) || q.length > 0)) {
            walkChildren(children, 1, sys.id);
          }
        }
      }
      return rows;
    }

    function renderTree() {
      const container = document.getElementById('tree-list-container');
      const allRows = getFlattenedTreeRows();
      const totalPages = Math.max(1, Math.ceil(allRows.length / uiState.pageSize));
      if (uiState.currentPage > totalPages) uiState.currentPage = totalPages;

      const startIdx = (uiState.currentPage - 1) * uiState.pageSize;
      const pageRows = allRows.slice(startIdx, startIdx + uiState.pageSize);

      document.getElementById('page-indicator').textContent = `PAGE ${uiState.currentPage} / ${totalPages}`;
      document.getElementById('item-count-indicator').textContent = `${allRows.length} RECURSIVE NODES`;
      document.getElementById('btn-prev-page').disabled = uiState.currentPage <= 1;
      document.getElementById('btn-next-page').disabled = uiState.currentPage >= totalPages;

      container.innerHTML = '';
      if (pageRows.length === 0) {
        container.innerHTML = `<div class="p-4 text-center text-slate-400 border border-dashed border-slate-700">NO MATCHING REPOS OR FILES</div>`;
        return;
      }

      pageRows.forEach((row) => {
        const isSelected = row.systemId === uiState.selectedId && row.depth === 0;
        const isExpanded = expandedNodes.has(row.rowId);

        const div = document.createElement('div');
        div.style.paddingLeft = `${8 + row.depth * 14}px`;
        div.className = `pr-2 py-1.5 flex items-center justify-between gap-1.5 cursor-pointer border transition-colors ${
          isSelected
            ? 'bg-cyan-500/20 border-cyan-400/70 text-white'
            : 'bg-slate-900/55 border-transparent hover:border-cyan-500/35 hover:bg-slate-900/90 text-slate-300'
        }`;

        const leftPart = document.createElement('div');
        leftPart.className = 'flex items-center gap-1.5 min-w-0';

        // Caret for expandable nodes
        if (row.hasChildren) {
          const caret = document.createElement('span');
          caret.textContent = isExpanded ? '▾' : '▸';
          caret.className = 'text-cyan-400 w-3 text-center shrink-0';
          caret.onclick = (e) => {
            e.stopPropagation();
            if (expandedNodes.has(row.rowId)) expandedNodes.delete(row.rowId);
            else expandedNodes.add(row.rowId);
            renderTree();
          };
          leftPart.appendChild(caret);
        } else {
          const spacer = document.createElement('span');
          spacer.textContent = row.depth > 0 ? '└' : '•';
          spacer.className = 'text-slate-600 w-3 text-center shrink-0';
          leftPart.appendChild(spacer);
        }

        // Icon badge
        const icon = document.createElement('span');
        if (row.type === 'hub') {
          icon.textContent = '★';
          icon.style.color = '#ffd97d';
        } else if (row.type === 'repo') {
          icon.textContent = '◈';
          icon.style.color = row.sectorColor;
        } else if (row.type === 'folder') {
          icon.textContent = '📁';
          icon.className = 'text-[10px]';
        } else if (row.isIndex) {
          icon.textContent = '🌐';
          icon.className = 'text-[10px]';
        } else if (row.isReadme) {
          icon.textContent = '📘';
          icon.className = 'text-[10px]';
        } else {
          icon.textContent = '📄';
          icon.className = 'text-[10px]';
        }
        leftPart.appendChild(icon);

        const label = document.createElement('span');
        label.textContent = row.name;
        label.className = `truncate ${row.depth === 0 ? 'font-semibold text-slate-100' : 'text-slate-300'}`;
        leftPart.appendChild(label);

        div.appendChild(leftPart);

        // Right tag
        const rightTag = document.createElement('span');
        if (row.depth === 0) {
          rightTag.textContent = row.type === 'blob' ? 'BLOB' : '160000';
          rightTag.className = 'text-[9px] px-1 py-0.2 bg-slate-950/90 text-slate-400 border border-slate-700 shrink-0';
        } else if (row.isIndex || row.isReadme) {
          rightTag.textContent = 'VIEW';
          rightTag.className = 'text-[9px] px-1 py-0.2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shrink-0';
        }
        div.appendChild(rightTag);

        div.onclick = () => {
          selectSystem(row.systemId, true);
          if (row.hasChildren) {
            if (expandedNodes.has(row.rowId)) expandedNodes.delete(row.rowId);
            else expandedNodes.add(row.rowId);
            renderTree();
          }
          if (row.isIndex) {
            openFileViewerModal(row.systemId, 'index.html');
          } else if (row.isReadme) {
            openFileViewerModal(row.systemId, 'README.md');
          }
        };

        container.appendChild(div);
      });
    }

    // =========================================================================
    // 3. POP-UP MODAL VIEWER FOR INDEX.HTML & README.MD
    // =========================================================================
    const modalState = {
      activeSystemId: 'AVIS-DATALAKE',
      activeRepoName: 'AVIS-DATALAKE',
      fileType: 'index.html',
      viewMode: 'preview',
      rawText: ''
    };
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
