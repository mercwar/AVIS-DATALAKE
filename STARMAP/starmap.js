 /**
     * ============================================================================
     * MERCWAR / AVIS-DATALAKE — NEW EDEN 3D TOPOLOGY & RECURSIVE PROTOCOL ENGINE
     * ============================================================================
     * Complete 55-node constellation registry:
     *  - Central Hub (1 root + 3 core config blobs = 4 nodes)
     *  - Sector I: AVIS Core & Dataflow (12 gitlinks)
     *  - Sector II: Cyborg & Universe / 3D (12 gitlinks)
     *  - Sector III: Engines, LLM & Win32/CLI Tools (17 gitlinks)
     *  - Sector IV: Academies, Comics & Robo Rook Archive (10 gitlinks)
     */

    // Constellation Sector Definitions
    const SECTORS = {
      HUB: {
        id: 'HUB',
        name: 'Central Command Hub',
        shortName: 'CENTRAL HUB',
        color: '#ffd97d',
        hex: 0xffd97d,
        anchor: [0, 0, 0],
        secRating: '1.0 CORE'
      },
      AVIS_CORE: {
        id: 'AVIS_CORE',
        name: 'Sector I: AVIS Core & Dataflow',
        shortName: 'AVIS CORE',
        color: '#00f0ff',
        hex: 0x00f0ff,
        anchor: [0, 14, -48],
        secRating: '0.9 HIGH'
      },
      CYBORG_3D: {
        id: 'CYBORG_3D',
        name: 'Sector II: Cyborg & Universe / 3D',
        shortName: 'CYBORG / 3D',
        color: '#b84dff',
        hex: 0xb84dff,
        anchor: [52, 8, 12],
        secRating: '0.7 SEC'
      },
      ENGINES_CLI: {
        id: 'ENGINES_CLI',
        name: 'Sector III: Engines, LLM & Win32/CLI',
        shortName: 'ENGINES / CLI',
        color: '#ff9d00',
        hex: 0xff9d00,
        anchor: [-16, -12, 54],
        secRating: '0.4 LOW'
      },
      ACADEMIES_ROBO: {
        id: 'ACADEMIES_ROBO',
        name: 'Sector IV: Academies, Comics & Robo Rook',
        shortName: 'ACADEMIES / ROBO',
        color: '#00ff9d',
        hex: 0x00ff9d,
        anchor: [-52, 10, -14],
        secRating: '0.8 HIGH'
      }
    };

    // Helper to synthesize realistic recursive folder/file structures per repository type
    function buildRepoManifest(name, sectorId, gitMode) {
      if (name === 'AVIS-DATALAKE') {
        return [
          { type: 'file', name: '.gitmodules', mode: '100644', path: '.gitmodules', url: 'https://github.com/mercwar/AVIS-DATALAKE/blob/main/.gitmodules' },
          { type: 'file', name: '_config.yml', mode: '100644', path: '_config.yml', url: 'https://github.com/mercwar/AVIS-DATALAKE/blob/main/_config.yml' },
          { type: 'file', name: 'README.md', mode: '100644', path: 'README.md', url: 'https://github.com/mercwar/AVIS-DATALAKE/blob/main/README.md' },
          {
            type: 'folder', name: 'gitlinks (51 submodules)', path: 'gitlinks',
            children: [
              { type: 'file', name: 'AVIS @ 160000', mode: '160000', path: 'AVIS', url: 'https://github.com/mercwar/AVIS' },
              { type: 'file', name: 'Cyborg @ 160000', mode: '160000', path: 'Cyborg', url: 'https://github.com/mercwar/Cyborg' },
              { type: 'file', name: 'Fire-Gem @ 160000', mode: '160000', path: 'Fire-Gem', url: 'https://github.com/mercwar/Fire-Gem' },
              { type: 'file', name: 'Navigator @ 160000', mode: '160000', path: 'Navigator', url: 'https://github.com/mercwar/Navigator' }
            ]
          }
        ];
      }

      if (gitMode === '100644') {
        return [
          {
            type: 'file',
            name: name,
            mode: '100644',
            path: name,
            url: `https://github.com/mercwar/AVIS-DATALAKE/blob/main/${name}`
          }
        ];
      }

      const baseUrl = `https://github.com/mercwar/${name}`;
      const lower = name.toLowerCase();

      if (sectorId === 'AVIS_CORE') {
        return [
          {
            type: 'folder', name: 'src/', path: `${name}/src`,
            children: [
              { type: 'file', name: 'pipeline_core.py', mode: '100644', path: `${name}/src/pipeline_core.py`, url: `${baseUrl}` },
              { type: 'file', name: 'datalake_sync.ini', mode: '100644', path: `${name}/src/datalake_sync.ini`, url: `${baseUrl}` }
            ]
          },
          {
            type: 'folder', name: 'config/', path: `${name}/config`,
            children: [
              { type: 'file', name: 'schema.json', mode: '100644', path: `${name}/config/schema.json`, url: `${baseUrl}` }
            ]
          },
          { type: 'file', name: 'README.md', mode: '100644', path: `${name}/README.md`, url: `${baseUrl}#readme` }
        ];
      }

      if (sectorId === 'CYBORG_3D') {
        return [
          {
            type: 'folder', name: 'universe/', path: `${name}/universe`,
            children: [
              { type: 'file', name: 'starmap_renderer.js', mode: '100644', path: `${name}/universe/starmap_renderer.js`, url: `${baseUrl}` },
              { type: 'file', name: 'telemetry_shader.glsl', mode: '100644', path: `${name}/universe/telemetry_shader.glsl`, url: `${baseUrl}` }
            ]
          },
          {
            type: 'folder', name: 'assets/', path: `${name}/assets`,
            children: [
              { type: 'file', name: 'constellation_nodes.json', mode: '100644', path: `${name}/assets/constellation_nodes.json`, url: `${baseUrl}` }
            ]
          },
          { type: 'file', name: 'index.html', mode: '100644', path: `${name}/index.html`, url: `${baseUrl}` }
        ];
      }

      if (sectorId === 'ENGINES_CLI') {
        const isWin32 = lower.includes('msvc') || lower.includes('win32') || lower.includes('console') || lower.includes('fire') || lower === 'bin';
        return [
          {
            type: 'folder', name: isWin32 ? 'src/win32/' : 'engine/', path: `${name}/src`,
            children: [
              { type: 'file', name: isWin32 ? 'main.cpp' : 'runtime.cpp', mode: '100644', path: `${name}/src/main.cpp`, url: `${baseUrl}` },
              { type: 'file', name: 'ggml_bridge.h', mode: '100644', path: `${name}/src/ggml_bridge.h`, url: `${baseUrl}` }
            ]
          },
          {
            type: 'folder', name: 'scripts/', path: `${name}/scripts`,
            children: [
              { type: 'file', name: 'build_msvc.ps1', mode: '100644', path: `${name}/scripts/build_msvc.ps1`, url: `${baseUrl}` }
            ]
          },
          { type: 'file', name: 'README.md', mode: '100644', path: `${name}/README.md`, url: `${baseUrl}#readme` }
        ];
      }

      // Academies, Comics & Robo Rook Archive
      return [
        {
          type: 'folder', name: 'modules/', path: `${name}/modules`,
          children: [
            { type: 'file', name: 'curriculum_index.md', mode: '100644', path: `${name}/modules/curriculum_index.md`, url: `${baseUrl}` },
            { type: 'file', name: 'robo_rook_manifest.json', mode: '100644', path: `${name}/modules/robo_rook_manifest.json`, url: `${baseUrl}` }
          ]
        },
        {
          type: 'folder', name: 'archive/', path: `${name}/archive`,
          children: [
            { type: 'file', name: 'catalog.yml', mode: '100644', path: `${name}/archive/catalog.yml`, url: `${baseUrl}` }
          ]
        },
        { type: 'file', name: 'README.md', mode: '100644', path: `${name}/README.md`, url: `${baseUrl}#readme` }
      ];
    }

    // Complete 55-Node Star Catalog
    const RAW_SYSTEMS = [
      // 1. CENTRAL COMMAND HUB & CORE CONFIG SATELLITES
      {
        id: 'AVIS-DATALAKE',
        name: 'AVIS-DATALAKE',
        sector: 'HUB',
        mode: '040000 root',
        isHub: true,
        pos: [0, 0, 0],
        repoUrl: 'https://github.com/mercwar/AVIS-DATALAKE',
        treeUrl: 'https://github.com/mercwar/AVIS-DATALAKE',
        submodulePath: '/ (Root Datalake Aggregator)',
        desc: 'Central Command Hub aggregating all 51 linked submodules (mode 160000), .gitmodules registry, and _config.yml Jekyll exclusions.'
      },
      {
        id: '.gitmodules',
        name: '.gitmodules',
        sector: 'HUB',
        mode: '100644 blob',
        isConfigSatellite: true,
        pos: [6.5, 2.2, 4.2],
        repoUrl: 'https://github.com/mercwar/AVIS-DATALAKE/blob/main/.gitmodules',
        treeUrl: 'https://github.com/mercwar/AVIS-DATALAKE/blob/main/.gitmodules',
        submodulePath: '.gitmodules (Submodule Registry)',
        desc: 'Master Git submodule mapping file binding all 51 external mercwar repositories as mode 160000 gitlinks.'
      },
      {
        id: '_config.yml',
        name: '_config.yml',
        sector: 'HUB',
        mode: '100644 blob',
        isConfigSatellite: true,
        pos: [-6.8, -1.8, 4.5],
        repoUrl: 'https://github.com/mercwar/AVIS-DATALAKE/blob/main/_config.yml',
        treeUrl: 'https://github.com/mercwar/AVIS-DATALAKE/blob/main/_config.yml',
        submodulePath: '_config.yml (Pages & Exclusion Rules)',
        desc: 'Core GitHub Pages & Jekyll configuration defining build exclusions and datalake metadata indexing.'
      },
      {
        id: 'README.md',
        name: 'README.md',
        sector: 'HUB',
        mode: '100644 blob',
        isConfigSatellite: true,
        pos: [0.6, 4.5, -6.5],
        repoUrl: 'https://github.com/mercwar/AVIS-DATALAKE/blob/main/README.md',
        treeUrl: 'https://github.com/mercwar/AVIS-DATALAKE/blob/main/README.md',
        submodulePath: 'README.md (Command Documentation)',
        desc: 'Primary architectural index and documentation entry point for the AVIS-DATALAKE ecosystem.'
      },

      // 2. SECTOR I: AVIS CORE & DATAFLOW (12 Repos)
      ...[
        'AVIS',
        'AVIS-DATALAKE-ENGINE',
        'AVIS-DL',
        'AVIS-DROP',
        'AVIS-LOGIC-CORE',
        'AVIS-NEWS',
        'AVIS-SEARCH',
        'AVIS-TRAY-MENU',
        'AVIS-ALERT-FVS',
        'AVIS-AI-INI-DIR-MK-SCAN',
        'CRON',
        'NEXUS'
      ].map((repo, idx, arr) => {
        const angle = (idx / arr.length) * Math.PI * 2;
        const radius = 14 + (idx % 3) * 5.5;
        const ax = SECTORS.AVIS_CORE.anchor[0] + Math.cos(angle) * radius;
        const ay = SECTORS.AVIS_CORE.anchor[1] + Math.sin(angle * 2) * 6.5;
        const az = SECTORS.AVIS_CORE.anchor[2] + Math.sin(angle) * radius;
        return {
          id: repo,
          name: repo,
          sector: 'AVIS_CORE',
          mode: '160000 commit',
          isAnchorStar: idx === 0,
          pos: [ax, ay, az],
          repoUrl: `https://github.com/mercwar/${repo}`,
          treeUrl: `https://github.com/mercwar/AVIS-DATALAKE/tree/main/${repo}`,
          submodulePath: `/${repo} -> https://github.com/mercwar/${repo}.git`,
          desc: `AVIS Core & Dataflow gitlink submodule (${repo}) synchronized into AVIS-DATALAKE for automated ingestion, telemetry scanning, and pipeline orchestration.`
        };
      }),

      // 3. SECTOR II: CYBORG & UNIVERSE / 3D (12 Repos)
      ...[
        'Cyborg',
        'CYBORG-LIVE-GIT-BROWSER',
        'CYBORG-PROJECT-EXPLORER',
        'Constellation',
        'Nebula',
        'Quasar',
        'Stargate',
        'Station',
        'ECLIPSE',
        'Mercwar-AI',
        'AI',
        'mercwar'
      ].map((repo, idx, arr) => {
        const angle = (idx / arr.length) * Math.PI * 2 + 0.3;
        const radius = 14.5 + (idx % 3) * 5.8;
        const ax = SECTORS.CYBORG_3D.anchor[0] + Math.cos(angle) * radius;
        const ay = SECTORS.CYBORG_3D.anchor[1] + Math.cos(angle * 2) * 7.2;
        const az = SECTORS.CYBORG_3D.anchor[2] + Math.sin(angle) * radius;
        return {
          id: repo,
          name: repo,
          sector: 'CYBORG_3D',
          mode: '160000 commit',
          isAnchorStar: idx === 0,
          pos: [ax, ay, az],
          repoUrl: `https://github.com/mercwar/${repo}`,
          treeUrl: `https://github.com/mercwar/AVIS-DATALAKE/tree/main/${repo}`,
          submodulePath: `/${repo} -> https://github.com/mercwar/${repo}.git`,
          desc: `Cyborg & 3D Universe spatial visualization submodule (${repo}) powering live Git topology browsing, cosmic rendering, and AI agent interfaces.`
        };
      }),

      // 4. SECTOR III: ENGINES, LLM & WIN32/CLI TOOLS (17 Repos)
      ...[
        'Fire-Gem',
        'Fire-Star-Alpha',
        'JOE-TRON-LLMA',
        'GGML-LLAMA-MSVC-INSTALLER',
        'Dark-Com',
        'Dark-Com-2',
        'dc2url',
        'dc2php',
        'dc2sql',
        'CL2',
        'Sentinel',
        'CYHY-CMT',
        'CVBGOD-EMOJI',
        'CVBGODLY-CONSOLE',
        'Powershell',
        'bin',
        'JMC-ANDROID-APP-DEMO'
      ].map((repo, idx, arr) => {
        const angle = (idx / arr.length) * Math.PI * 2 + 0.5;
        const radius = 15.5 + (idx % 4) * 5.2;
        const ax = SECTORS.ENGINES_CLI.anchor[0] + Math.cos(angle) * radius;
        const ay = SECTORS.ENGINES_CLI.anchor[1] + Math.sin(angle * 3) * 7.5;
        const az = SECTORS.ENGINES_CLI.anchor[2] + Math.sin(angle) * radius;
        return {
          id: repo,
          name: repo,
          sector: 'ENGINES_CLI',
          mode: '160000 commit',
          isAnchorStar: idx === 0,
          pos: [ax, ay, az],
          repoUrl: `https://github.com/mercwar/${repo}`,
          treeUrl: `https://github.com/mercwar/AVIS-DATALAKE/tree/main/${repo}`,
          submodulePath: `/${repo} -> https://github.com/mercwar/${repo}.git`,
          desc: `Engine, Local LLM & Win32/CLI toolchain submodule (${repo}) providing native MSVC builds, GGML inference, Dark-Com utilities, and console automation.`
        };
      }),

      // 5. SECTOR IV: ACADEMIES, COMICS & ROBO ROOK ARCHIVE (10 Repos)
      ...[
        'Navigator',
        'Navigator-AI-Academy',
        'Navigator-GitHub-Academy',
        'Navigator-MSVC-Academy',
        'NAVIGATOR-LLM-ACADEMY',
        'Comics',
        'Robo-Knight-Demos',
        'Robo-Knight-Gallery',
        'Robo-Knight-Player',
        'robo-knight-inventory'
      ].map((repo, idx, arr) => {
        const angle = (idx / arr.length) * Math.PI * 2 + 0.15;
        const radius = 13.5 + (idx % 3) * 5.4;
        const ax = SECTORS.ACADEMIES_ROBO.anchor[0] + Math.cos(angle) * radius;
        const ay = SECTORS.ACADEMIES_ROBO.anchor[1] + Math.sin(angle * 2) * 6.8;
        const az = SECTORS.ACADEMIES_ROBO.anchor[2] + Math.sin(angle) * radius;
        return {
          id: repo,
          name: repo,
          sector: 'ACADEMIES_ROBO',
          mode: '160000 commit',
          isAnchorStar: idx === 0,
          pos: [ax, ay, az],
          repoUrl: `https://github.com/mercwar/${repo}`,
          treeUrl: `https://github.com/mercwar/AVIS-DATALAKE/tree/main/${repo}`,
          submodulePath: `/${repo} -> https://github.com/mercwar/${repo}.git`,
          desc: `Navigator Academy & Robo Rook Archive submodule (${repo}) housing structured developer curriculum, interactive media galleries, and inventory systems.`
        };
      })
    ];

    // Enrich nodes with recursive manifests and neighbor adjacency
    const SYSTEMS = RAW_SYSTEMS.map(sys => ({
      ...sys,
      manifest: buildRepoManifest(sys.name, sys.sector, sys.mode.includes('100644') ? '100644' : '160000'),
      neighbors: []
    }));

    const SYSTEM_MAP = new Map(SYSTEMS.map(s => [s.id, s]));

    // Build Filament Jump-Lane Network (Hub-to-Anchors, Intra-Constellation Rings, Cross-Sector Bridges)
    const JUMP_LANES = [];
    function addLane(idA, idB, type = 'intra') {
      if (idA === idB) return;
      const key = [idA, idB].sort().join('::');
      if (JUMP_LANES.some(l => l.key === key)) return;
      const a = SYSTEM_MAP.get(idA);
      const b = SYSTEM_MAP.get(idB);
      if (!a || !b) return;
      JUMP_LANES.push({ key, from: idA, to: idB, type });
      a.neighbors.push(idB);
      b.neighbors.push(idA);
    }

    // 1. Central Hub to Config Satellites & Sector Anchors
    addLane('AVIS-DATALAKE', '.gitmodules', 'hub');
    addLane('AVIS-DATALAKE', '_config.yml', 'hub');
    addLane('AVIS-DATALAKE', 'README.md', 'hub');
    addLane('.gitmodules', '_config.yml', 'hub');

    addLane('AVIS-DATALAKE', 'AVIS', 'trunk');
    addLane('AVIS-DATALAKE', 'AVIS-DATALAKE-ENGINE', 'trunk');
    addLane('AVIS-DATALAKE', 'Cyborg', 'trunk');
    addLane('AVIS-DATALAKE', 'CYBORG-LIVE-GIT-BROWSER', 'trunk');
    addLane('AVIS-DATALAKE', 'Fire-Gem', 'trunk');
    addLane('AVIS-DATALAKE', 'JOE-TRON-LLMA', 'trunk');
    addLane('AVIS-DATALAKE', 'Navigator', 'trunk');

    // 2. Intra-constellation ring & spoke topology
    ['AVIS_CORE', 'CYBORG_3D', 'ENGINES_CLI', 'ACADEMIES_ROBO'].forEach(secId => {
      const members = SYSTEMS.filter(s => s.sector === secId);
      for (let i = 0; i < members.length; i++) {
        const curr = members[i];
        const next = members[(i + 1) % members.length];
        addLane(curr.id, next.id, 'intra');
        if (i > 0 && i % 2 === 0) {
          addLane(members[0].id, curr.id, 'intra');
        }
      }
    });

    // 3. Cross-Constellation Tactical Bridges
    addLane('AVIS-SEARCH', 'CYBORG-PROJECT-EXPLORER', 'bridge');
    addLane('NEXUS', 'Stargate', 'bridge');
    addLane('AVIS-AI-INI-DIR-MK-SCAN', 'Mercwar-AI', 'bridge');
    addLane('AI', 'JOE-TRON-LLMA', 'bridge');
    addLane('GGML-LLAMA-MSVC-INSTALLER', 'Navigator-MSVC-Academy', 'bridge');
    addLane('Navigator-AI-Academy', 'AI', 'bridge');
    addLane('Navigator-GitHub-Academy', 'CYBORG-LIVE-GIT-BROWSER', 'bridge');
    addLane('Robo-Knight-Player', 'Fire-Star-Alpha', 'bridge');

    /**
     * ============================================================================
     * APPLICATION STATE
     * ============================================================================
     */
    const state = {
      selectedSystemId: 'AVIS-DATALAKE',
      hoveredSystemId: null,
      activeSectorFilter: 'ALL',
      searchQuery: '',
      expandedTreeIds: new Set(['AVIS-DATALAKE']),
      currentPage: 1,
      pageSize: 14,
      showLabels: true,
      showLanes: true,
      showRings: true,
      autoOrbit: true
    };

    /**
     * ============================================================================
     * THREE.JS 3D NEW EDEN STAR MAP ENGINE
     * ============================================================================
     */
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x03050a);
    scene.fog = new THREE.FogExp2(0x03050a, 0.0028);

    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      1200
    );
    camera.position.set(0, 68, 128);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 8;
    controls.maxDistance = 320;
    controls.autoRotate = state.autoOrbit;
    controls.autoRotateSpeed = 0.42;

    // Camera smooth fly-to interpolation state
    const cameraAnim = {
      active: false,
      targetPos: new THREE.Vector3(0, 68, 128),
      targetLookAt: new THREE.Vector3(0, 0, 0)
    };

    // Procedural Radial Glow Texture for Stars & Nebulae
    function createGlowTexture(innerColor, midColor, outerColor) {
      const size = 128;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, innerColor);
      grad.addColorStop(0.28, midColor);
      grad.addColorStop(0.65, outerColor);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      const tex = new THREE.CanvasTexture(canvas);
      return tex;
    }

    const starGlowTex = createGlowTexture(
      'rgba(255,255,255,1)',
      'rgba(255,255,255,0.65)',
      'rgba(255,255,255,0.12)'
    );

    // 1. Deep Space Starfield Background
    const bgStarsGeo = new THREE.BufferGeometry();
    const bgStarCount = 2600;
    const bgPositions = new Float32Array(bgStarCount * 3);
    const bgColors = new Float32Array(bgStarCount * 3);
    const palette = [
      new THREE.Color(0x93c5fd),
      new THREE.Color(0xe2e8f0),
      new THREE.Color(0xfde68a),
      new THREE.Color(0xc4b5fd),
      new THREE.Color(0x67e8f9)
    ];

    for (let i = 0; i < bgStarCount; i++) {
      const r = 180 + Math.random() * 480;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      bgPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      bgPositions[i * 3 + 1] = r * Math.cos(phi);
      bgPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      const c = palette[Math.floor(Math.random() * palette.length)];
      const brightness = 0.45 + Math.random() * 0.55;
      bgColors[i * 3] = c.r * brightness;
      bgColors[i * 3 + 1] = c.g * brightness;
      bgColors[i * 3 + 2] = c.b * brightness;
    }
    bgStarsGeo.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));
    bgStarsGeo.setAttribute('color', new THREE.BufferAttribute(bgColors, 3));
    const bgStarsMat = new THREE.PointsMaterial({
      size: 1.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });
    const bgStarfield = new THREE.Points(bgStarsGeo, bgStarsMat);
    scene.add(bgStarfield);

    // 2. Volumetric Nebula Glow Clouds per Constellation Sector
    const nebulaGroup = new THREE.Group();
    scene.add(nebulaGroup);

    Object.values(SECTORS).forEach(sec => {
      const nebMat = new THREE.SpriteMaterial({
        map: starGlowTex,
        color: sec.hex,
        transparent: true,
        opacity: sec.id === 'HUB' ? 0.24 : 0.16,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const sprite = new THREE.Sprite(nebMat);
      sprite.position.set(...sec.anchor);
      const scale = sec.id === 'HUB' ? 52 : 68;
      sprite.scale.set(scale, scale, 1);
      nebulaGroup.add(sprite);
    });

    // 3. Tactical Galactic Coordinate Grids & Orbital Rings
    const gridsGroup = new THREE.Group();
    scene.add(gridsGroup);

    // Polar rings around Central Hub
    [12, 32, 55, 82].forEach((radius, idx) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.12, radius + 0.12, 128);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0xffd97d : 0x00f0ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: idx === 0 ? 0.35 : 0.12,
        depthWrite: false
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      gridsGroup.add(ring);
    });

    // Crosshair galactic axes
    const axisMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.12
    });
    const axisPoints = [
      new THREE.Vector3(-90, 0, 0), new THREE.Vector3(90, 0, 0),
      new THREE.Vector3(0, 0, -90), new THREE.Vector3(0, 0, 90)
    ];
    const axisGeo = new THREE.BufferGeometry().setFromPoints(axisPoints);
    gridsGroup.add(new THREE.LineSegments(axisGeo, axisMat));

    // Constellation boundary rings around each outer sector anchor
    Object.values(SECTORS).forEach(sec => {
      if (sec.id === 'HUB') return;
      const bGeo = new THREE.RingGeometry(21.8, 22.1, 72);
      const bMat = new THREE.MeshBasicMaterial({
        color: sec.hex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.22,
        depthWrite: false
      });
      const bRing = new THREE.Mesh(bGeo, bMat);
      bRing.position.set(...sec.anchor);
      bRing.rotation.x = Math.PI / 2;
      gridsGroup.add(bRing);
    });

    // 4. Star Nodes & Central Hub Rotating Gyroscope Rings
    const starMeshes = [];
    const starNodeObjects = new Map();
    const hubGyroRings = [];

    const starSphereGeo = new THREE.SphereGeometry(1, 20, 20);

    SYSTEMS.forEach(sys => {
      const sectorObj = SECTORS[sys.sector];
      const group = new THREE.Group();
      group.position.set(...sys.pos);

      let radius = 0.95;
      if (sys.isHub) radius = 2.6;
      else if (sys.isConfigSatellite) radius = 0.72;
      else if (sys.isAnchorStar) radius = 1.45;

      const coreMat = new THREE.MeshBasicMaterial({
        color: sys.isHub ? 0xfff5d6 : sectorObj.hex
      });
      const mesh = new THREE.Mesh(starSphereGeo, coreMat);
      mesh.scale.setScalar(radius);
      mesh.userData = { systemId: sys.id };
      group.add(mesh);
      starMeshes.push(mesh);

      // Corona Glow Sprite
      const glowMat = new THREE.SpriteMaterial({
        map: starGlowTex,
        color: sectorObj.hex,
        transparent: true,
        opacity: sys.isHub ? 0.95 : 0.78,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const glowSprite = new THREE.Sprite(glowMat);
      const glowScale = sys.isHub ? 16 : (sys.isAnchorStar ? 7.5 : 4.8);
      glowSprite.scale.set(glowScale, glowScale, 1);
      group.add(glowSprite);

      // Central Hub Orbital Gyroscope Rings
      if (sys.isHub) {
        [4.2, 5.4, 6.8].forEach((r, i) => {
          const gGeo = new THREE.RingGeometry(r - 0.08, r + 0.08, 64);
          const gMat = new THREE.MeshBasicMaterial({
            color: i === 1 ? 0x00f0ff : 0xffd97d,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.55
          });
          const gRing = new THREE.Mesh(gGeo, gMat);
          gRing.rotation.x = Math.PI / 3 * (i + 1);
          gRing.rotation.y = Math.PI / 4 * i;
          group.add(gRing);
          hubGyroRings.push(gRing);
        });
      }

      scene.add(group);
      starNodeObjects.set(sys.id, { group, mesh, glowSprite, baseScale: radius });
    });

    // Selection Reticle Ring in 3D Space
    const reticleGroup = new THREE.Group();
    const retGeo1 = new THREE.RingGeometry(2.1, 2.35, 48);
    const retMat1 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    });
    const retMesh1 = new THREE.Mesh(retGeo1, retMat1);
    reticleGroup.add(retMesh1);

    const retGeo2 = new THREE.RingGeometry(2.8, 2.92, 4);
    const retMat2 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75
    });
    const retMesh2 = new THREE.Mesh(retGeo2, retMat2);
    reticleGroup.add(retMesh2);
    scene.add(reticleGroup);

    // 5. Filament Jump-Lanes & Animated Telemetry Packets
    const lanesGroup = new THREE.Group();
    scene.add(lanesGroup);

    const laneObjects = [];
    const packetParticles = [];
    const packetGeo = new THREE.SphereGeometry(0.24, 8, 8);

    JUMP_LANES.forEach((lane, idx) => {
      const sysA = SYSTEM_MAP.get(lane.from);
      const sysB = SYSTEM_MAP.get(lane.to);
      const posA = new THREE.Vector3(...sysA.pos);
      const posB = new THREE.Vector3(...sysB.pos);

      const secColor = SECTORS[sysB.sector].hex;
      const lineColor = lane.type === 'bridge' ? 0xf43f5e : (lane.type === 'trunk' ? 0xffd97d : secColor);

      const geo = new THREE.BufferGeometry().setFromPoints([posA, posB]);
      const mat = new THREE.LineBasicMaterial({
        color: lineColor,
        transparent: true,
        opacity: lane.type === 'trunk' ? 0.45 : (lane.type === 'bridge' ? 0.28 : 0.34),
        blending: THREE.AdditiveBlending
      });
      const line = new THREE.Line(geo, mat);
      lanesGroup.add(line);

      laneObjects.push({ lane, line, mat, baseOpacity: mat.opacity, sysA, sysB });

      // Add animated data packet pulse on trunk & every 2nd lane
      if (lane.type === 'trunk' || idx % 2 === 0) {
        const pMat = new THREE.MeshBasicMaterial({
          color: lineColor,
          transparent: true,
          opacity: 0.9
        });
        const pMesh = new THREE.Mesh(packetGeo, pMat);
        lanesGroup.add(pMesh);
        packetParticles.push({
          mesh: pMesh,
          start: posA,
          end: posB,
          progress: Math.random(),
          speed: 0.18 + Math.random() * 0.22,
          sysA,
          sysB
        });
      }
    });

    // 6. Projected HTML Labels Layer
    const labelsLayer = document.getElementById('labels-layer');
    const labelElements = new Map();

    SYSTEMS.forEach(sys => {
      const el = document.createElement('div');
      el.className = 'star-label' + (sys.isHub ? ' is-hub' : '');
      el.textContent = sys.name;
      el.style.color = sys.isHub ? '#ffd97d' : SECTORS[sys.sector].color;
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        selectSystem(sys.id, true);
      });
      labelsLayer.appendChild(el);
      labelElements.set(sys.id, el);
    });

    /**
     * ============================================================================
     * RAYCASTING (HOVER & CLICK-TO-WARP SELECTION)
     * ============================================================================
     */
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const tooltip = document.getElementById('hover-tooltip');
    let pointerDownPos = { x: 0, y: 0 };

    renderer.domElement.addEventListener('pointerdown', (e) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
      // Cancel auto-fly if user manually grabs camera
      cameraAnim.active = false;
    });

    renderer.domElement.addEventListener('pointermove', (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(starMeshes, false);

      if (intersects.length > 0) {
        const hitId = intersects[0].object.userData.systemId;
        state.hoveredSystemId = hitId;
        renderer.domElement.style.cursor = 'pointer';

        const sys = SYSTEM_MAP.get(hitId);
        const sec = SECTORS[sys.sector];
        document.getElementById('tt-name').textContent = sys.name;
        document.getElementById('tt-sec').textContent = sec.secRating;
        document.getElementById('tt-sector').textContent = sec.shortName;
        document.getElementById('tt-mode').textContent = sys.mode;
        document.getElementById('tt-links').textContent = `${sys.neighbors.length} filaments`;

        tooltip.style.opacity = '1';
        const tx = Math.min(window.innerWidth - 300, e.clientX + 16);
        const ty = Math.min(window.innerHeight - 140, e.clientY + 16);
        tooltip.style.left = `${tx}px`;
        tooltip.style.top = `${ty}px`;
      } else {
        state.hoveredSystemId = null;
        renderer.domElement.style.cursor = 'grab';
        tooltip.style.opacity = '0';
      }
    });

    renderer.domElement.addEventListener('pointerup', (e) => {
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (dist < 5 && state.hoveredSystemId) {
        selectSystem(state.hoveredSystemId, true);
      }
    });

    /**
     * ============================================================================
     * SYSTEM SELECTION, CAMERA WARP & SECTOR ISOLATION
     * ============================================================================
     */
    function selectSystem(systemId, flyCamera = true) {
      const sys = SYSTEM_MAP.get(systemId);
      if (!sys) return;

      state.selectedSystemId = systemId;
      const sec = SECTORS[sys.sector];

      // Update Label Highlights
      labelElements.forEach((el, id) => {
        el.classList.toggle('is-selected', id === systemId);
      });

      // Position 3D Reticle
      reticleGroup.position.set(...sys.pos);
      const rScale = sys.isHub ? 2.2 : (sys.isAnchorStar ? 1.25 : 0.9);
      reticleGroup.scale.setScalar(rScale);

      // Smooth Camera Fly-To Transition
      if (flyCamera) {
        const target = new THREE.Vector3(...sys.pos);
        const offset = sys.isHub
          ? new THREE.Vector3(0, 62, 118)
          : new THREE.Vector3(12, 10, 22);
        cameraAnim.targetLookAt.copy(target);
        cameraAnim.targetPos.copy(target).add(offset);
        cameraAnim.active = true;
      }

      // Update Right Telemetry HUD
      document.getElementById('sel-sector-dot').style.backgroundColor = sec.color;
      document.getElementById('sel-sector-dot').style.boxShadow = `0 0 8px ${sec.color}`;
      document.getElementById('sel-sec-status').textContent = sec.secRating;
      document.getElementById('sel-title').textContent = sys.name;
      document.getElementById('sel-desc').textContent = sys.desc;
      document.getElementById('sel-sector-name').textContent = sec.shortName;
      document.getElementById('sel-sector-name').style.color = sec.color;
      document.getElementById('sel-git-mode').textContent = sys.mode;
      document.getElementById('sel-submodule-path').textContent = sys.submodulePath;
      document.getElementById('sel-coords').textContent =
        `${sys.pos[0].toFixed(1)}, ${sys.pos[1].toFixed(1)}, ${sys.pos[2].toFixed(1)} AU`;

      document.getElementById('link-primary-repo').href = sys.repoUrl;
      document.getElementById('link-datalake-tree').href = sys.treeUrl;

      // Render Node Internal Recursive Manifest
      const manifestEl = document.getElementById('sel-manifest-list');
      manifestEl.innerHTML = '';
      function renderManifestItems(items, depth = 0) {
        items.forEach(item => {
          const row = document.createElement('div');
          row.className = 'flex items-center justify-between gap-2 py-0.5 px-1 rounded hover:bg-slate-900';
          row.style.paddingLeft = `${depth * 12 + 4}px`;
          const icon = item.type === 'folder' ? '📁' : '📄';
          row.innerHTML = `
            <span class="truncate text-slate-200">${icon} ${item.name}</span>
            <span class="text-[9px] text-slate-500 shrink-0">${item.mode || 'tree'}</span>
          `;
          if (item.url) {
            row.style.cursor = 'pointer';
            row.addEventListener('click', () => window.open(item.url, '_blank', 'noopener'));
          }
          manifestEl.appendChild(row);
          if (item.children) renderManifestItems(item.children, depth + 1);
        });
      }
      renderManifestItems(sys.manifest);

      // Render Connected Jump-Lane Neighbors
      const neighborsEl = document.getElementById('sel-neighbors-list');
      neighborsEl.innerHTML = '';
      sys.neighbors.forEach(nId => {
        const nSys = SYSTEM_MAP.get(nId);
        if (!nSys) return;
        const btn = document.createElement('button');
        btn.className = 'px-2 py-1 rounded bg-slate-900 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-400 font-mono-tech text-[10px] text-slate-200 transition';
        btn.textContent = nSys.name;
        btn.addEventListener('click', () => selectSystem(nId, true));
        neighborsEl.appendChild(btn);
      });

      renderRecursiveTree();
    }

    function applySectorVisualFilter() {
      const filter = state.activeSectorFilter;
      SYSTEMS.forEach(sys => {
        const nodeObj = starNodeObjects.get(sys.id);
        const labelEl = labelElements.get(sys.id);
        const matches = filter === 'ALL' || sys.sector === filter || sys.isHub;

        nodeObj.mesh.material.transparent = true;
        nodeObj.mesh.material.opacity = matches ? 1.0 : 0.16;
        nodeObj.glowSprite.material.opacity = matches
          ? (sys.isHub ? 0.95 : 0.78)
          : 0.08;

        if (labelEl) {
          labelEl.style.opacity = matches ? '1' : '0.15';
        }
      });

      laneObjects.forEach(lo => {
        const matches =
          filter === 'ALL' ||
          lo.sysA.sector === filter ||
          lo.sysB.sector === filter;
        lo.mat.opacity = matches ? lo.baseOpacity : 0.04;
      });
    }

    /**
     * ============================================================================
     * RECURSIVE REPOSITORY / FOLDER / FILE PAGINATED EXPLORER
     * ============================================================================
     * Flattens the hierarchical tree of repositories -> folders -> files dynamically
     * based on expanded nodes and paginates the flattened recursive rows cleanly.
     */
    function buildFlattenedRecursiveRows() {
      const rows = [];
      const query = state.searchQuery.trim().toLowerCase();

      SYSTEMS.forEach(sys => {
        // Filter by sector
        if (state.activeSectorFilter !== 'ALL' && sys.sector !== state.activeSectorFilter) {
          return;
        }

        // Check if system or any nested descendant matches search query
        const sysMatches = sys.name.toLowerCase().includes(query) ||
                           SECTORS[sys.sector].shortName.toLowerCase().includes(query);

        let descendantMatches = false;
        function checkDesc(items) {
          for (const it of items) {
            if (it.name.toLowerCase().includes(query)) descendantMatches = true;
            if (it.children) checkDesc(it.children);
          }
        }
        if (query) checkDesc(sys.manifest);

        if (query && !sysMatches && !descendantMatches) return;

        const sysNodeKey = `repo::${sys.id}`;
        const isSysExpanded = state.expandedTreeIds.has(sysNodeKey) || (query.length > 0 && descendantMatches);

        rows.push({
          rowKey: sysNodeKey,
          kind: 'repo',
          depth: 0,
          systemId: sys.id,
          name: sys.name,
          mode: sys.mode,
          sector: sys.sector,
          expandable: true,
          expanded: isSysExpanded,
          url: sys.repoUrl
        });

        if (isSysExpanded) {
          function traverseManifest(items, depth, parentPrefix) {
            items.forEach((item, idx) => {
              const itemKey = `${parentPrefix}/${item.name}_${idx}`;
              const itemMatches = !query || item.name.toLowerCase().includes(query) || sysMatches;
              const hasChildren = Array.isArray(item.children) && item.children.length > 0;
              const isExpanded = state.expandedTreeIds.has(itemKey) || (query.length > 0 && hasChildren);

              if (itemMatches || hasChildren) {
                rows.push({
                  rowKey: itemKey,
                  kind: item.type, // 'folder' or 'file'
                  depth,
                  systemId: sys.id,
                  name: item.name,
                  mode: item.mode || '040000 tree',
                  sector: sys.sector,
                  expandable: hasChildren,
                  expanded: isExpanded,
                  url: item.url || sys.treeUrl
                });
              }

              if (hasChildren && isExpanded) {
                traverseManifest(item.children, depth + 1, itemKey);
              }
            });
          }
          traverseManifest(sys.manifest, 1, sysNodeKey);
        }
      });

      return rows;
    }

    function renderRecursiveTree() {
      const allRows = buildFlattenedRecursiveRows();
      const totalItems = allRows.length;
      const totalPages = Math.max(1, Math.ceil(totalItems / state.pageSize));

      if (state.currentPage > totalPages) state.currentPage = totalPages;
      if (state.currentPage < 1) state.currentPage = 1;

      const startIdx = (state.currentPage - 1) * state.pageSize;
      const endIdx = Math.min(totalItems, startIdx + state.pageSize);
      const pageRows = allRows.slice(startIdx, endIdx);

      // Update Badges & Pagination Controls
      document.getElementById('tree-total-badge').textContent = `${totalItems} ITEMS`;
      document.getElementById('expanded-count-label').textContent = `${state.expandedTreeIds.size} OPEN`;
      document.getElementById('page-indicator').textContent = `PAGE ${state.currentPage} OF ${totalPages}`;
      document.getElementById('page-range-label').textContent =
        totalItems === 0 ? 'NO MATCHING NODES' : `ITEMS ${startIdx + 1}–${endIdx} OF ${totalItems}`;

      document.getElementById('page-prev').disabled = state.currentPage <= 1;
      document.getElementById('page-next').disabled = state.currentPage >= totalPages;

      const listEl = document.getElementById('recursive-tree-list');
      listEl.innerHTML = '';

      if (pageRows.length === 0) {
        listEl.innerHTML = `
          <div class="p-6 text-center text-slate-400 text-xs">
            No repositories or recursive paths match your filter.
          </div>
        `;
        return;
      }

      pageRows.forEach(row => {
        const sec = SECTORS[row.sector];
        const isSelected = row.systemId === state.selectedSystemId && row.kind === 'repo';

        const el = document.createElement('div');
        el.className =
          'flex items-center justify-between gap-1.5 px-2 py-1.5 rounded-lg border transition cursor-pointer ' +
          (isSelected
            ? 'bg-cyan-500/20 border-cyan-400/70 text-white'
            : 'bg-slate-950/60 hover:bg-slate-900/90 border-transparent hover:border-slate-700/80 text-slate-200');
        el.style.paddingLeft = `${row.depth * 14 + 8}px`;

        // Left side: Expand caret + Icon + Name
        const leftWrap = document.createElement('div');
        leftWrap.className = 'flex items-center gap-1.5 min-w-0 flex-1';

        if (row.expandable) {
          const caret = document.createElement('button');
          caret.className = 'w-4 h-4 flex items-center justify-center rounded hover:bg-slate-700/80 text-[10px] text-cyan-300 shrink-0';
          caret.textContent = row.expanded ? '▾' : '▸';
          caret.title = row.expanded ? 'Collapse Recursive Node' : 'Expand Recursive Node';
          caret.addEventListener('click', (e) => {
            e.stopPropagation();
            if (state.expandedTreeIds.has(row.rowKey)) {
              state.expandedTreeIds.delete(row.rowKey);
            } else {
              state.expandedTreeIds.add(row.rowKey);
            }
            renderRecursiveTree();
          });
          leftWrap.appendChild(caret);
        } else {
          const spacer = document.createElement('span');
          spacer.className = 'w-4 shrink-0 text-center text-slate-600 text-[10px]';
          spacer.textContent = '└';
          leftWrap.appendChild(spacer);
        }

        const dot = document.createElement('span');
        if (row.kind === 'repo') {
          dot.className = 'w-2 h-2 rounded-full shrink-0';
          dot.style.backgroundColor = sec.color;
          dot.style.boxShadow = `0 0 6px ${sec.color}`;
        } else {
          dot.className = 'text-[11px] shrink-0';
          dot.textContent = row.kind === 'folder' ? '📁' : '📄';
        }
        leftWrap.appendChild(dot);

        const nameSpan = document.createElement('span');
        nameSpan.className = 'truncate ' + (row.kind === 'repo' ? 'font-semibold text-slate-100' : 'text-slate-300 text-[11px]');
        nameSpan.textContent = row.name;
        leftWrap.appendChild(nameSpan);

        // Right side: Mode badge + External link icon
        const rightWrap = document.createElement('div');
        rightWrap.className = 'flex items-center gap-1 shrink-0';

        const modeTag = document.createElement('span');
        modeTag.className = 'text-[9px] px-1 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800';
        modeTag.textContent = row.mode.split(' ')[0];
        rightWrap.appendChild(modeTag);

        const extLink = document.createElement('a');
        extLink.href = row.url;
        extLink.target = '_blank';
        extLink.rel = 'noopener noreferrer';
        extLink.className = 'text-[11px] text-cyan-400 hover:text-white px-1';
        extLink.textContent = '↗';
        extLink.title = `Open ${row.name} on GitHub`;
        extLink.addEventListener('click', (e) => e.stopPropagation());
        rightWrap.appendChild(extLink);

        el.appendChild(leftWrap);
        el.appendChild(rightWrap);

        // Clicking row selects & flies to star system (and toggles folder if folder)
        el.addEventListener('click', () => {
          selectSystem(row.systemId, true);
          if (row.expandable) {
            if (state.expandedTreeIds.has(row.rowKey)) {
              state.expandedTreeIds.delete(row.rowKey);
            } else {
              state.expandedTreeIds.add(row.rowKey);
            }
            renderRecursiveTree();
          }
        });

        listEl.appendChild(el);
      });
    }

    /**
     * ============================================================================
     * UI CONTROLS & KEYBOARD BINDINGS
     * ============================================================================
     */
    // Sector Filter Pills
    document.querySelectorAll('.sector-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.sector-pill').forEach(b => {
          b.classList.remove('active', 'bg-cyan-500/25', 'border-cyan-400/60', 'text-white');
          b.classList.add('border-transparent');
        });
        btn.classList.add('active', 'bg-cyan-500/25', 'border-cyan-400/60', 'text-white');
        btn.classList.remove('border-transparent');

        state.activeSectorFilter = btn.dataset.sector;
        state.currentPage = 1;
        applySectorVisualFilter();
        renderRecursiveTree();

        // Fly to sector anchor if specific sector chosen
        if (state.activeSectorFilter !== 'ALL') {
          const anchor = SECTORS[state.activeSectorFilter].anchor;
          cameraAnim.targetLookAt.set(...anchor);
          cameraAnim.targetPos.set(anchor[0] + 18, anchor[1] + 24, anchor[2] + 42);
          cameraAnim.active = true;
        }
      });
    });

    // Top Toggle Chips
    document.getElementById('btn-toggle-labels').addEventListener('click', (e) => {
      state.showLabels = !state.showLabels;
      labelsLayer.style.display = state.showLabels ? 'block' : 'none';
      e.target.textContent = `LABELS: ${state.showLabels ? 'ON' : 'OFF'}`;
      e.target.classList.toggle('opacity-50', !state.showLabels);
    });

    document.getElementById('btn-toggle-lanes').addEventListener('click', (e) => {
      state.showLanes = !state.showLanes;
      lanesGroup.visible = state.showLanes;
      e.target.textContent = `LANES: ${state.showLanes ? 'ON' : 'OFF'}`;
      e.target.classList.toggle('opacity-50', !state.showLanes);
    });

    document.getElementById('btn-toggle-rings').addEventListener('click', (e) => {
      state.showRings = !state.showRings;
      gridsGroup.visible = state.showRings;
      e.target.textContent = `GRIDS: ${state.showRings ? 'ON' : 'OFF'}`;
      e.target.classList.toggle('opacity-50', !state.showRings);
    });

    document.getElementById('btn-toggle-orbit').addEventListener('click', (e) => {
      state.autoOrbit = !state.autoOrbit;
      controls.autoRotate = state.autoOrbit;
      e.target.textContent = `ORBIT: ${state.autoOrbit ? 'ON' : 'OFF'}`;
      e.target.classList.toggle('opacity-50', !state.autoOrbit);
    });

    function resetCameraOverview() {
      cameraAnim.targetLookAt.set(0, 0, 0);
      cameraAnim.targetPos.set(0, 68, 128);
      cameraAnim.active = true;
    }
    document.getElementById('btn-reset-view').addEventListener('click', resetCameraOverview);

    // Recursive Tree Search & Expand/Collapse All
    const searchInput = document.getElementById('tree-search');
    const clearSearchBtn = document.getElementById('clear-search');

    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      state.currentPage = 1;
      clearSearchBtn.classList.toggle('hidden', !state.searchQuery);
      renderRecursiveTree();
    });

    clearSearchBtn.addEventListener('click', () => {
      state.searchQuery = '';
      searchInput.value = '';
      clearSearchBtn.classList.add('hidden');
      state.currentPage = 1;
      renderRecursiveTree();
    });

    document.getElementById('btn-expand-all').addEventListener('click', () => {
      SYSTEMS.forEach(sys => {
        const repoKey = `repo::${sys.id}`;
        state.expandedTreeIds.add(repoKey);
        sys.manifest.forEach((item, idx) => {
          if (item.children) {
            state.expandedTreeIds.add(`${repoKey}/${item.name}_${idx}`);
          }
        });
      });
      renderRecursiveTree();
    });

    document.getElementById('btn-collapse-all').addEventListener('click', () => {
      state.expandedTreeIds.clear();
      state.currentPage = 1;
      renderRecursiveTree();
    });

    // Pagination Controls
    document.getElementById('page-prev').addEventListener('click', () => {
      if (state.currentPage > 1) {
        state.currentPage--;
        renderRecursiveTree();
      }
    });

    document.getElementById('page-next').addEventListener('click', () => {
      state.currentPage++;
      renderRecursiveTree();
    });

    document.querySelectorAll('.page-size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.page-size-btn').forEach(b => {
          b.classList.remove('active', 'bg-cyan-500/20', 'border-cyan-400', 'text-cyan-200');
          b.classList.add('bg-slate-900', 'border-slate-700', 'text-slate-300');
        });
        btn.classList.add('active', 'bg-cyan-500/20', 'border-cyan-400', 'text-cyan-200');
        btn.classList.remove('bg-slate-900', 'border-slate-700', 'text-slate-300');

        state.pageSize = parseInt(btn.dataset.pagesize, 10);
        state.currentPage = 1;
        renderRecursiveTree();
      });
    });

    // Locate Selected Node in Paginated Tree
    document.getElementById('btn-focus-in-tree').addEventListener('click', () => {
      state.activeSectorFilter = 'ALL';
      state.searchQuery = '';
      searchInput.value = '';
      clearSearchBtn.classList.add('hidden');
      applySectorVisualFilter();

      const repoKey = `repo::${state.selectedSystemId}`;
      state.expandedTreeIds.add(repoKey);
      const rows = buildFlattenedRecursiveRows();
      const idx = rows.findIndex(r => r.rowKey === repoKey);
      if (idx !== -1) {
        state.currentPage = Math.floor(idx / state.pageSize) + 1;
      }
      renderRecursiveTree();
    });

    // Copy Primary URL using execCommand fallback
    document.getElementById('btn-copy-url').addEventListener('click', () => {
      const sys = SYSTEM_MAP.get(state.selectedSystemId);
      if (!sys) return;
      const tempInput = document.createElement('input');
      tempInput.value = sys.repoUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      const toast = document.getElementById('toast-banner');
      toast.firstElementChild.textContent = `COPIED: ${sys.repoUrl}`;
      toast.style.opacity = '1';
      setTimeout(() => { toast.style.opacity = '0'; }, 2200);
    });

    // Mobile Responsive Drawer Toggles
    const leftDrawer = document.getElementById('left-drawer');
    const rightDrawer = document.getElementById('right-drawer');
    let leftOpen = true;
    let rightOpen = true;

    function syncResponsiveDrawers() {
      if (window.innerWidth < 1024) {
        leftDrawer.style.transform = leftOpen ? 'translateX(0)' : 'translateX(-115%)';
        rightDrawer.style.transform = rightOpen ? 'translateX(0)' : 'translateX(115%)';
      } else {
        leftDrawer.style.transform = 'translateX(0)';
        rightDrawer.style.transform = 'translateX(0)';
      }
    }

    if (window.innerWidth < 1024) {
      leftOpen = false;
      rightOpen = false;
      syncResponsiveDrawers();
    }

    document.getElementById('toggle-left-drawer').addEventListener('click', () => {
      leftOpen = !leftOpen;
      if (leftOpen && window.innerWidth < 768) rightOpen = false;
      syncResponsiveDrawers();
    });

    document.getElementById('toggle-right-drawer').addEventListener('click', () => {
      rightOpen = !rightOpen;
      if (rightOpen && window.innerWidth < 768) leftOpen = false;
      syncResponsiveDrawers();
    });

    // Keyboard Shortcuts ([ / ] for pagination, Esc for overview)
    window.addEventListener('keydown', (e) => {
      if (document.activeElement === searchInput) return;
      if (e.key === 'Escape') {
        resetCameraOverview();
      } else if (e.key === '[' || e.key === 'ArrowLeft') {
        if (state.currentPage > 1) {
          state.currentPage--;
          renderRecursiveTree();
        }
      } else if (e.key === ']' || e.key === 'ArrowRight') {
        state.currentPage++;
        renderRecursiveTree();
      }
    });

    // Window Resize Handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      syncResponsiveDrawers();
    });

    /**
     * ============================================================================
     * MAIN ANIMATION LOOP & 3D-TO-2D LABEL PROJECTION
     * ============================================================================
     */
    const clock = new THREE.Clock();
    const tempVec = new THREE.Vector3();

    function updateProjectedLabels() {
      if (!state.showLabels) return;
      const widthHalf = window.innerWidth / 2;
      const heightHalf = window.innerHeight / 2;

      SYSTEMS.forEach(sys => {
        const el = labelElements.get(sys.id);
        if (!el) return;

        tempVec.set(...sys.pos);
        const dist = camera.position.distanceTo(tempVec);
        tempVec.project(camera);

        // Hide if behind camera or far beyond viewport bounds
        if (tempVec.z > 1 || tempVec.x < -1.15 || tempVec.x > 1.15 || tempVec.y < -1.15 || tempVec.y > 1.15) {
          el.style.display = 'none';
          return;
        }

        // Declutter distant non-selected stars when zoomed far out
        const isPriority = sys.isHub || sys.isAnchorStar || sys.id === state.selectedSystemId || sys.id === state.hoveredSystemId;
        if (!isPriority && dist > 155) {
          el.style.display = 'none';
          return;
        }

        el.style.display = 'block';
        const x = (tempVec.x * widthHalf) + widthHalf;
        const y = -(tempVec.y * heightHalf) + heightHalf;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
      });
    }

    function animate() {
      requestAnimationFrame(animate);

      const dt = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Rotate Hub Gyroscope Rings
      hubGyroRings.forEach((ring, idx) => {
        ring.rotation.z += dt * (0.35 + idx * 0.15) * (idx % 2 === 0 ? 1 : -1);
        ring.rotation.x += dt * 0.12;
      });

      // Animate Selection Reticle
      retMesh1.rotation.z -= dt * 0.9;
      retMesh2.rotation.z += dt * 1.4;
      reticleGroup.lookAt(camera.position);

      // Pulse Star Coronas & Hover Scale
      SYSTEMS.forEach(sys => {
        const obj = starNodeObjects.get(sys.id);
        const isHovered = sys.id === state.hoveredSystemId;
        const isSelected = sys.id === state.selectedSystemId;
        const pulse = 1 + Math.sin(elapsed * 2.5 + sys.pos[0]) * 0.06;
        const mult = isHovered ? 1.45 : (isSelected ? 1.28 : 1.0);
        obj.mesh.scale.setScalar(obj.baseScale * pulse * mult);
      });

      // Animate Filament Jump-Lane Telemetry Packets
      if (state.showLanes) {
        packetParticles.forEach(p => {
          p.progress += dt * p.speed;
          if (p.progress > 1) p.progress -= 1;
          p.mesh.position.lerpVectors(p.start, p.end, p.progress);
          const visible =
            state.activeSectorFilter === 'ALL' ||
            p.sysA.sector === state.activeSectorFilter ||
            p.sysB.sector === state.activeSectorFilter;
          p.mesh.visible = visible;
        });
      }

      // Smooth Camera Warp Transition
      if (cameraAnim.active) {
        camera.position.lerp(cameraAnim.targetPos, 0.065);
        controls.target.lerp(cameraAnim.targetLookAt, 0.085);
        if (
          camera.position.distanceTo(cameraAnim.targetPos) < 0.25 &&
          controls.target.distanceTo(cameraAnim.targetLookAt) < 0.15
        ) {
          cameraAnim.active = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
      updateProjectedLabels();
    }

    // Initialize Application on Window Load
    window.onload = function () {
      selectSystem('AVIS-DATALAKE', false);
      renderRecursiveTree();
      animate();
    };
