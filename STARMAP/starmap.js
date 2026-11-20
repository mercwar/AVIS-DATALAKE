<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AVIS-DATALAKE // Robotic Cybernetic 3D Star Map</title>

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Google Fonts: Orbitron, Rajdhani & JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Orbitron:wght@600;700;800;900&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet" />

  <!-- Three.js r128 & OrbitControls -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>

  <style>
    :root {
      --bg-void: #03050a;
      --panel-bg: rgba(6, 12, 22, 0.9);
      --cyan-accent: #00f0ff;
      --violet-accent: #b84dff;
      --amber-accent: #ff9d00;
      --emerald-accent: #00ff9d;
      --gold-accent: #ffd97d;
    }

    * {
      box-sizing: border-box;
      user-select: none;
    }

    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: var(--bg-void);
      color: #e2e8f0;
      font-family: 'Rajdhani', sans-serif;
    }

    .font-orbitron {
      font-family: 'Orbitron', sans-serif;
    }

    .font-mono-tech {
      font-family: 'JetBrains Mono', monospace;
    }

    /* Fullscreen 3D Canvas */
    #canvas-container {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    canvas {
      display: block;
      width: 100%;
      height: 100%;
      outline: none;
    }

    /* Hex-Grid & Tactical Scanline Overlay */
    .tactical-overlay {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 2;
      background:
        radial-gradient(circle at center, transparent 52%, rgba(2, 4, 9, 0.84) 100%),
        repeating-linear-gradient(
          0deg,
          rgba(0, 240, 255, 0.015) 0px,
          rgba(0, 240, 255, 0.015) 1px,
          transparent 1px,
          transparent 3px
        );
    }

    /* =====================================================================
       DISTINCT SPECIALIZED ROBOTIC CSS WINDOW ARCHITECTURES
       ===================================================================== */

    /* 1. Top Command Bridge Bar (.mech-win-command): Dual-chamfered trapezoid HUD bar with cyan top laser edge & hazard rail */
    .mech-win-command {
      position: relative;
      background:
        linear-gradient(90deg, rgba(255, 217, 125, 0.14) 0%, rgba(7, 15, 28, 0.94) 22%, rgba(6, 12, 23, 0.92) 78%, rgba(0, 240, 255, 0.14) 100%);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-top: 2px solid rgba(0, 240, 255, 0.72);
      border-bottom: 1px solid rgba(255, 217, 125, 0.45);
      clip-path: polygon(
        16px 0,
        calc(100% - 16px) 0,
        100% 10px,
        100% calc(100% - 10px),
        calc(100% - 16px) 100%,
        16px 100%,
        0 calc(100% - 10px),
        0 10px
      );
      box-shadow:
        0 8px 28px rgba(0, 0, 0, 0.82),
        inset 0 1px 0 rgba(255, 255, 255, 0.14),
        0 0 18px rgba(0, 240, 255, 0.14);
    }
    .mech-win-command::before {
      content: '';
      position: absolute;
      left: 22px;
      right: 22px;
      bottom: 0;
      height: 2px;
      background: repeating-linear-gradient(
        90deg,
        rgba(255, 217, 125, 0.75) 0px,
        rgba(255, 217, 125, 0.75) 14px,
        transparent 14px,
        transparent 20px,
        rgba(0, 240, 255, 0.65) 20px,
        rgba(0, 240, 255, 0.65) 30px,
        transparent 30px,
        transparent 36px
      );
      pointer-events: none;
    }

    /* 2. Left Recursive Protocol Drawer (.mech-win-tree): Vertical beveled left-docked window with notched top-right & matrix grid */
    .mech-win-tree {
      position: relative;
      background:
        repeating-linear-gradient(
          0deg,
          rgba(0, 240, 255, 0.025) 0px,
          rgba(0, 240, 255, 0.025) 1px,
          transparent 1px,
          transparent 22px
        ),
        repeating-linear-gradient(
          90deg,
          rgba(0, 240, 255, 0.02) 0px,
          rgba(0, 240, 255, 0.02) 1px,
          transparent 1px,
          transparent 22px
        ),
        linear-gradient(180deg, rgba(6, 14, 26, 0.94) 0%, rgba(4, 9, 18, 0.96) 100%);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-left: 3px solid #00f0ff;
      border-right: 1px solid rgba(0, 240, 255, 0.3);
      clip-path: polygon(
        0 18px,
        18px 0,
        calc(100% - 18px) 0,
        100% 18px,
        100% calc(100% - 24px),
        calc(100% - 24px) 100%,
        0 100%
      );
      box-shadow:
        10px 12px 36px rgba(0, 0, 0, 0.85),
        inset 4px 0 16px rgba(0, 240, 255, 0.14);
    }
    .mech-win-tree::after {
      content: '';
      position: absolute;
      left: 0;
      top: 56px;
      bottom: 64px;
      width: 5px;
      background: repeating-linear-gradient(
        180deg,
        rgba(0, 240, 255, 0.72) 0px,
        rgba(0, 240, 255, 0.72) 8px,
        transparent 8px,
        transparent 16px
      );
      pointer-events: none;
    }

    /* 3. Right System Telemetry HUD (.mech-win-telemetry): Stepped angular mecha visor panel with amber/gold accent rails */
    .mech-win-telemetry {
      position: relative;
      background:
        linear-gradient(160deg, rgba(255, 157, 0, 0.09) 0%, rgba(7, 12, 22, 0.94) 38%, rgba(4, 10, 20, 0.96) 100%);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-right: 3px solid #ff9d00;
      border-left: 1px solid rgba(255, 217, 125, 0.34);
      clip-path: polygon(
        16px 0,
        100% 0,
        100% calc(100% - 18px),
        calc(100% - 18px) 100%,
        18px 100%,
        0 calc(100% - 18px),
        0 16px
      );
      box-shadow:
        -10px 12px 36px rgba(0, 0, 0, 0.85),
        inset -4px 0 18px rgba(255, 157, 0, 0.16);
    }
    .mech-win-telemetry::before {
      content: '';
      position: absolute;
      right: 0;
      top: 48px;
      height: 150px;
      width: 6px;
      background: repeating-linear-gradient(
        180deg,
        rgba(255, 157, 0, 0.88) 0px,
        rgba(255, 157, 0, 0.88) 3px,
        transparent 3px,
        transparent 10px
      );
      pointer-events: none;
    }

    /* 4. Bottom Camera & Constellation Tactical Dock (.mech-win-dock): Low-profile octagonal flight-deck console */
    .mech-win-dock {
      position: relative;
      background:
        linear-gradient(90deg, rgba(0, 240, 255, 0.1), rgba(6, 12, 22, 0.95) 50%, rgba(255, 157, 0, 0.1));
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-top: 1px solid rgba(0, 240, 255, 0.45);
      border-bottom: 2px solid #00f0ff;
      clip-path: polygon(
        18px 0,
        calc(100% - 18px) 0,
        100% 10px,
        100% calc(100% - 6px),
        calc(100% - 12px) 100%,
        12px 100%,
        0 calc(100% - 6px),
        0 10px
      );
      box-shadow:
        0 -4px 24px rgba(0, 0, 0, 0.84),
        0 0 16px rgba(0, 240, 255, 0.16);
    }

    /* 5. Hover Target Scanner Tooltip (.mech-win-tooltip): Compact target-lock box with sharp L-brackets */
    .mech-win-tooltip {
      position: fixed;
      z-index: 50;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.12s ease;
      min-width: 230px;
      max-width: 295px;
      background: rgba(4, 10, 20, 0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(0, 240, 255, 0.48);
      border-radius: 2px;
      box-shadow:
        0 10px 28px rgba(0, 0, 0, 0.9),
        0 0 16px rgba(0, 240, 255, 0.24);
    }
    .mech-win-tooltip::before,
    .mech-win-tooltip::after {
      content: '';
      position: absolute;
      width: 11px;
      height: 11px;
      pointer-events: none;
    }
    .mech-win-tooltip::before {
      top: -2px;
      left: -2px;
      border-top: 2px solid #00f0ff;
      border-left: 2px solid #00f0ff;
    }
    .mech-win-tooltip::after {
      bottom: -2px;
      right: -2px;
      border-bottom: 2px solid #ffd97d;
      border-right: 2px solid #ffd97d;
    }

    /* 6a. Pop-Up File Viewer Modal — index.html (.mech-win-modal-index): Cyan/emerald cyber-viewport frame */
    .mech-win-modal-index {
      position: relative;
      background:
        linear-gradient(180deg, rgba(0, 240, 255, 0.1) 0%, rgba(5, 13, 24, 0.98) 18%, rgba(4, 9, 17, 0.99) 100%);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border: 1px solid rgba(0, 240, 255, 0.65);
      border-top: 3px solid #00ff9d;
      clip-path: polygon(
        22px 0,
        calc(100% - 22px) 0,
        100% 22px,
        100% calc(100% - 22px),
        calc(100% - 22px) 100%,
        22px 100%,
        0 calc(100% - 22px),
        0 22px
      );
      box-shadow:
        0 24px 64px rgba(0, 0, 0, 0.94),
        0 0 34px rgba(0, 240, 255, 0.25),
        inset 0 0 28px rgba(0, 255, 157, 0.08);
    }

    /* 6b. Pop-Up File Viewer Modal — README.md (.mech-win-modal-readme): Violet/gold holo-codex frame */
    .mech-win-modal-readme {
      position: relative;
      background:
        linear-gradient(180deg, rgba(184, 77, 255, 0.12) 0%, rgba(12, 10, 24, 0.98) 20%, rgba(7, 8, 17, 0.99) 100%);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border: 1px solid rgba(255, 217, 125, 0.62);
      border-top: 3px solid #b84dff;
      clip-path: polygon(
        0 18px,
        18px 0,
        calc(100% - 18px) 0,
        100% 18px,
        100% calc(100% - 18px),
        calc(100% - 18px) 100%,
        18px 100%,
        0 calc(100% - 18px)
      );
      box-shadow:
        0 24px 64px rgba(0, 0, 0, 0.94),
        0 0 34px rgba(184, 77, 255, 0.25),
        inset 0 0 28px rgba(255, 217, 125, 0.08);
    }

    .mech-subpanel {
      background: rgba(8, 16, 30, 0.78);
      border: 1px solid rgba(56, 189, 248, 0.22);
      clip-path: polygon(
        8px 0,
        calc(100% - 8px) 0,
        100% 8px,
        100% calc(100% - 8px),
        calc(100% - 8px) 100%,
        8px 100%,
        0 calc(100% - 8px),
        0 8px
      );
    }

    .mech-btn {
      clip-path: polygon(
        6px 0,
        calc(100% - 6px) 0,
        100% 6px,
        100% calc(100% - 6px),
        calc(100% - 6px) 100%,
        6px 100%,
        0 calc(100% - 6px),
        0 6px
      );
      transition: all 0.16s ease;
    }

    .hazard-bar {
      height: 4px;
      background: repeating-linear-gradient(
        -45deg,
        rgba(0, 240, 255, 0.45),
        rgba(0, 240, 255, 0.45) 6px,
        rgba(6, 12, 22, 0.9) 6px,
        rgba(6, 12, 22, 0.9) 12px
      );
    }

    .hazard-bar-amber {
      height: 4px;
      background: repeating-linear-gradient(
        -45deg,
        rgba(255, 157, 0, 0.55),
        rgba(255, 157, 0, 0.55) 6px,
        rgba(6, 12, 22, 0.9) 6px,
        rgba(6, 12, 22, 0.9) 12px
      );
    }

    @keyframes radar-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .radar-core {
      animation: radar-spin 7s linear infinite;
    }

    @keyframes pulse-glow {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.84); }
    }
    .live-dot {
      animation: pulse-glow 2s infinite ease-in-out;
    }

    /* Custom Scrollbars */
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(5, 10, 20, 0.7);
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(0, 240, 255, 0.35);
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 240, 255, 0.7);
    }

    /* Floating 3D HTML Labels Layer */
    #labels-layer {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 3;
      overflow: hidden;
    }

    .star-label {
      position: absolute;
      transform: translate(-50%, -145%);
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.04em;
      padding: 1px 6px;
      background: rgba(3, 8, 18, 0.78);
      border: 1px solid rgba(0, 240, 255, 0.22);
      clip-path: polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px);
      white-space: nowrap;
      transition: opacity 0.18s ease, transform 0.14s ease, border-color 0.18s ease;
      pointer-events: auto;
      cursor: pointer;
    }
    .star-label:hover {
      z-index: 20;
      border-color: #00f0ff;
      background: rgba(8, 22, 42, 0.96);
      transform: translate(-50%, -152%) scale(1.06);
    }
    .star-label.is-hub {
      font-family: 'Orbitron', sans-serif;
      font-size: 10.5px;
      font-weight: 700;
      color: #ffd97d;
      border-color: rgba(255, 217, 125, 0.7);
      box-shadow: 0 0 14px rgba(255, 217, 125, 0.32);
    }
    .star-label.is-selected {
      z-index: 25;
      border-color: #ffffff;
      box-shadow: 0 0 16px rgba(0, 240, 255, 0.75);
      background: rgba(12, 28, 52, 0.98);
    }

    .selectable-text {
      user-select: text;
    }

    /* Rendered Markdown Styles inside README Modal */
    .md-render h1 { font-family: 'Orbitron', sans-serif; font-size: 1.45rem; font-weight: 800; color: #ffd97d; border-bottom: 1px solid rgba(255, 217, 125, 0.3); padding-bottom: 0.4rem; margin: 0.75rem 0; }
    .md-render h2 { font-family: 'Orbitron', sans-serif; font-size: 1.15rem; font-weight: 700; color: #00f0ff; margin: 1rem 0 0.5rem; }
    .md-render h3 { font-size: 1rem; font-weight: 700; color: #b84dff; margin: 0.85rem 0 0.4rem; }
    .md-render p { font-size: 0.95rem; line-height: 1.6; color: #cbd5e1; margin: 0.5rem 0; }
    .md-render ul { list-style-type: square; padding-left: 1.4rem; margin: 0.5rem 0; color: #cbd5e1; }
    .md-render li { margin: 0.25rem 0; }
    .md-render code { font-family: 'JetBrains Mono', monospace; font-size: 0.82rem; background: rgba(0, 240, 255, 0.1); color: #67e8f9; padding: 0.1rem 0.35rem; border: 1px solid rgba(0, 240, 255, 0.25); }
    .md-render pre { background: rgba(2, 6, 14, 0.92); border: 1px solid rgba(184, 77, 255, 0.35); padding: 0.85rem; overflow-x: auto; margin: 0.75rem 0; }
    .md-render pre code { background: transparent; border: none; padding: 0; color: #e2e8f0; }
    .md-render a { color: #00ff9d; text-decoration: underline; }
    .md-render blockquote { border-left: 3px solid #ff9d00; padding-left: 0.85rem; color: #94a3b8; font-style: italic; margin: 0.6rem 0; }
  </style>
</head>
<body>

  <!-- 3D WebGL Star Map Container -->
  <div id="canvas-container"></div>

  <!-- Tactical Scanline & Vignette Layer -->
  <div class="tactical-overlay"></div>

  <!-- Floating 3D Star Nameplate Layer -->
  <div id="labels-layer"></div>

  <!-- 5. HOVER TARGET SCANNER TOOLTIP (.mech-win-tooltip) -->
  <div id="hover-tooltip" class="mech-win-tooltip p-3 text-xs">
    <div class="flex items-center justify-between gap-2 border-b border-cyan-500/30 pb-1.5 mb-1.5">
      <span id="tt-name" class="font-orbitron font-bold text-white text-[11px] tracking-wider">NODE</span>
      <span id="tt-mode" class="font-mono-tech text-[9.5px] px-1.5 py-0.5 bg-cyan-500/15 text-cyan-300 border border-cyan-400/40">160000</span>
    </div>
    <div id="tt-sector" class="font-mono-tech text-[10px] uppercase tracking-wider text-amber-300 mb-1">SECTOR</div>
    <div id="tt-desc" class="text-slate-300 text-[11px] leading-snug mb-1.5">Description</div>
    <div class="flex items-center justify-between font-mono-tech text-[9.5px] text-slate-400 pt-1 border-t border-slate-800">
      <span id="tt-coords">X:0 Y:0 Z:0</span>
      <span class="text-cyan-400">[CLICK TO WARP]</span>
    </div>
  </div>

  <!-- 1. TOP COMMAND BRIDGE BAR (.mech-win-command) -->
  <header class="fixed top-2.5 left-2.5 right-2.5 z-30 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
    <!-- Brand & Telemetry Core -->
    <div class="mech-win-command px-4 py-2 flex items-center gap-3 pointer-events-auto">
      <div class="relative w-8 h-8 flex items-center justify-center shrink-0">
        <svg class="w-8 h-8 text-cyan-400 radar-core" viewBox="0 0 36 36" fill="none">
          <polygon points="18,2 32,10 32,26 18,34 4,26 4,10" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 2" />
          <circle cx="18" cy="18" r="7" stroke="#ffd97d" stroke-width="1.5" />
          <line x1="18" y1="2" x2="18" y2="11" stroke="#00f0ff" stroke-width="1.5" />
        </svg>
        <span class="w-2 h-2 rounded-full bg-amber-400 live-dot absolute"></span>
      </div>
      <div>
        <div class="flex items-center gap-2">
          <h1 class="font-orbitron font-extrabold text-xs sm:text-sm tracking-widest text-white">
            AVIS-DATALAKE <span class="text-cyan-400">//</span> NEW EDEN
          </h1>
          <span class="font-mono-tech text-[10px] px-1.5 py-0.5 bg-amber-500/20 text-amber-200 border border-amber-400/50">
            55 NODES
          </span>
        </div>
        <p class="font-mono-tech text-[10px] text-slate-400 tracking-wider">
          MERCWAR GALACTIC GITLINK TOPOLOGY • PROTOCOL v4.2
        </p>
      </div>
    </div>

    <!-- Constellation Sector Quick-Filter Pills -->
    <div id="sector-filters" class="mech-win-command px-3 py-1.5 flex flex-wrap items-center gap-1 pointer-events-auto overflow-x-auto max-w-full">
      <button data-sector="ALL" class="sector-pill mech-btn active px-2.5 py-1 font-mono-tech text-[10.5px] font-semibold bg-cyan-500/25 text-white border border-cyan-400/70">
        ALL SECTORS
      </button>
      <button data-sector="HUB" class="sector-pill mech-btn px-2.5 py-1 font-mono-tech text-[10.5px] text-amber-200 bg-slate-900/80 border border-amber-400/35 hover:border-amber-300">
        HUB CORE
      </button>
      <button data-sector="AVIS_CORE" class="sector-pill mech-btn px-2.5 py-1 font-mono-tech text-[10.5px] text-cyan-300 bg-slate-900/80 border border-cyan-400/35 hover:border-cyan-300">
        I. AVIS CORE
      </button>
      <button data-sector="CYBORG_3D" class="sector-pill mech-btn px-2.5 py-1 font-mono-tech text-[10.5px] text-purple-300 bg-slate-900/80 border border-purple-400/35 hover:border-purple-300">
        II. CYBORG / 3D
      </button>
      <button data-sector="ENGINES_LLM" class="sector-pill mech-btn px-2.5 py-1 font-mono-tech text-[10.5px] text-orange-300 bg-slate-900/80 border border-orange-400/35 hover:border-orange-300">
        III. ENGINES & LLM
      </button>
      <button data-sector="ACADEMIES_ROBO" class="sector-pill mech-btn px-2.5 py-1 font-mono-tech text-[10.5px] text-emerald-300 bg-slate-900/80 border border-emerald-400/35 hover:border-emerald-300">
        IV. ACADEMIES & ROBO
      </button>
    </div>

    <!-- Live GitHub Sync & Drawer Toggles -->
    <div class="mech-win-command px-3 py-1.5 flex items-center gap-1.5 pointer-events-auto">
      <button id="btn-sync-live" class="mech-btn px-2.5 py-1 font-mono-tech text-[10.5px] font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/50 hover:bg-emerald-500/30 flex items-center gap-1.5" title="Fetch Live Recursive Git Tree from GitHub API for Active Repo">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot"></span>
        <span>⚡ LIVE GIT TREE</span>
      </button>
      <button id="btn-toggle-left" class="mech-btn px-2 py-1 font-mono-tech text-[10.5px] bg-slate-900/90 text-cyan-300 border border-cyan-400/40 hover:bg-slate-800" title="Toggle Recursive Explorer">
        TREE
      </button>
      <button id="btn-toggle-right" class="mech-btn px-2 py-1 font-mono-tech text-[10.5px] bg-slate-900/90 text-amber-300 border border-amber-400/40 hover:bg-slate-800" title="Toggle Telemetry HUD">
        HUD
      </button>
    </div>
  </header>

  <!-- 2. LEFT RECURSIVE PROTOCOL & PAGINATED EXPLORER DRAWER (.mech-win-tree) -->
  <aside id="left-drawer" class="mech-win-tree fixed top-20 bottom-12 left-2.5 w-[356px] max-w-[92vw] z-20 flex flex-col transition-transform duration-300 translate-x-0">
    <div class="hazard-bar shrink-0"></div>

    <!-- Drawer Header -->
    <div class="px-4 pt-3 pb-2 border-b border-cyan-500/25 shrink-0">
      <div class="flex items-center justify-between gap-2 mb-2">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 bg-cyan-400 rotate-45"></span>
          <h2 class="font-orbitron font-bold text-xs tracking-wider text-cyan-200">
            RECURSIVE GIT PROTOCOL
          </h2>
        </div>
        <span id="tree-sync-status" class="font-mono-tech text-[9.5px] px-1.5 py-0.5 bg-cyan-500/15 text-cyan-300 border border-cyan-400/40">
          MANIFEST READY
        </span>
      </div>

      <!-- Search & Sector Dropdown -->
      <div class="grid grid-cols-12 gap-1.5 mb-2">
        <input
          id="tree-search"
          type="text"
          placeholder="Filter repos, folders, files..."
          class="col-span-7 bg-slate-950/90 border border-cyan-500/35 px-2.5 py-1.5 font-mono-tech text-[11px] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
        />
        <select
          id="tree-sector-select"
          class="col-span-5 bg-slate-950/90 border border-cyan-500/35 px-1.5 py-1.5 font-mono-tech text-[10.5px] text-cyan-200 focus:outline-none focus:border-cyan-400"
        >
          <option value="ALL">ALL SECTORS</option>
          <option value="HUB">HUB CORE</option>
          <option value="AVIS_CORE">I. AVIS CORE</option>
          <option value="CYBORG_3D">II. CYBORG / 3D</option>
          <option value="ENGINES_LLM">III. ENGINES & LLM</option>
          <option value="ACADEMIES_ROBO">IV. ACADEMIES</option>
        </select>
      </div>

      <!-- Expand / Collapse & Page Size Controls -->
      <div class="flex items-center justify-between gap-1 font-mono-tech text-[10px]">
        <div class="flex items-center gap-1">
          <button id="btn-expand-all" class="mech-btn px-2 py-0.5 bg-cyan-500/15 text-cyan-200 border border-cyan-400/35 hover:bg-cyan-500/25">
            + EXPAND
          </button>
          <button id="btn-collapse-all" class="mech-btn px-2 py-0.5 bg-slate-900 text-slate-300 border border-slate-700 hover:border-cyan-400/40">
            - COLLAPSE
          </button>
        </div>
        <div class="flex items-center gap-1 text-slate-400">
          <span>ROWS:</span>
          <select id="page-size-select" class="bg-slate-950 border border-cyan-500/35 px-1 py-0.5 text-cyan-200 focus:outline-none">
            <option value="10">10</option>
            <option value="14" selected>14</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Recursive Tree Viewport -->
    <div id="tree-list-container" class="flex-1 overflow-y-auto px-3 py-2 space-y-1 font-mono-tech text-[11px]">
      <!-- Populated dynamically via JS -->
    </div>

    <!-- Pagination Footer -->
    <div class="px-3 py-2 border-t border-cyan-500/25 bg-slate-950/80 flex items-center justify-between font-mono-tech text-[10.5px] shrink-0">
      <button id="btn-prev-page" class="mech-btn px-2.5 py-1 bg-slate-900 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/20 disabled:opacity-35 disabled:pointer-events-none">
        ◀ PREV
      </button>
      <div class="text-center">
        <div id="page-indicator" class="text-white font-semibold">PAGE 1 / 1</div>
        <div id="item-count-indicator" class="text-[9.5px] text-slate-400">0 VISIBLE ITEMS</div>
      </div>
      <button id="btn-next-page" class="mech-btn px-2.5 py-1 bg-slate-900 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/20 disabled:opacity-35 disabled:pointer-events-none">
        NEXT ▶
      </button>
    </div>
  </aside>

  <!-- 3. RIGHT SYSTEM TELEMETRY & DIRECT UPLINKS HUD (.mech-win-telemetry) -->
  <aside id="right-drawer" class="mech-win-telemetry fixed top-20 bottom-12 right-2.5 w-[356px] max-w-[92vw] z-20 flex flex-col transition-transform duration-300 translate-x-0">
    <div class="hazard-bar-amber shrink-0"></div>

    <!-- Telemetry Header -->
    <div class="px-4 pt-3 pb-2.5 border-b border-amber-500/25 shrink-0">
      <div class="flex items-center justify-between gap-2">
        <span class="font-mono-tech text-[10px] tracking-widest text-amber-400 uppercase">
          SYSTEM TELEMETRY LOCK
        </span>
        <span id="hud-mode-badge" class="font-mono-tech text-[10px] px-2 py-0.5 bg-amber-500/15 text-amber-200 border border-amber-400/45">
          160000 commit
        </span>
      </div>
      <h2 id="hud-title" class="font-orbitron font-extrabold text-base text-white tracking-wide mt-1 truncate selectable-text">
        AVIS-DATALAKE
      </h2>
      <div id="hud-sector" class="font-mono-tech text-[10.5px] text-cyan-300 mt-0.5">
        CENTRAL COMMAND HUB // ROOT
      </div>
    </div>

    <!-- Scrollable Telemetry Body -->
    <div class="flex-1 overflow-y-auto px-4 py-3 space-y-3">
      <!-- Tactical Description -->
      <div class="mech-subpanel p-3">
        <div class="font-mono-tech text-[9.5px] text-slate-400 uppercase tracking-wider mb-1">
          SUBMODULE / NODE SPECIFICATION
        </div>
        <p id="hud-desc" class="text-xs text-slate-200 leading-relaxed">
          Central command hub aggregating 51 linked 160000 gitlink repositories, .gitmodules registry, and _config.yml exclusions.
        </p>
      </div>

      <!-- Direct GitHub Uplinks: 3-Button Row (OPEN REPO, INDEX.HTML, README.MD) -->
      <div class="mech-subpanel p-3">
        <div class="flex items-center justify-between mb-2">
          <span class="font-mono-tech text-[9.5px] text-amber-300 uppercase tracking-wider">
            DIRECT GITHUB UPLINKS
          </span>
          <span class="font-mono-tech text-[9px] text-slate-400">POP-UP ENABLED</span>
        </div>
        <div class="grid grid-cols-3 gap-1.5">
          <a
            id="hud-link-repo"
            href="https://github.com/mercwar/AVIS-DATALAKE"
            target="_blank"
            rel="noopener noreferrer"
            class="mech-btn py-2 px-1.5 text-center font-mono-tech text-[10px] font-bold bg-amber-500/20 text-amber-200 border border-amber-400/60 hover:bg-amber-500/35 flex flex-col items-center justify-center gap-0.5"
          >
            <span>↗ OPEN</span>
            <span>REPO</span>
          </a>
          <button
            id="hud-btn-index"
            type="button"
            class="mech-btn py-2 px-1.5 text-center font-mono-tech text-[10px] font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/60 hover:bg-emerald-500/35 flex flex-col items-center justify-center gap-0.5"
          >
            <span>◈ INDEX</span>
            <span>.HTML</span>
          </button>
          <button
            id="hud-btn-readme"
            type="button"
            class="mech-btn py-2 px-1.5 text-center font-mono-tech text-[10px] font-bold bg-purple-500/20 text-purple-200 border border-purple-400/60 hover:bg-purple-500/35 flex flex-col items-center justify-center gap-0.5"
          >
            <span>▤ README</span>
            <span>.MD</span>
          </button>
        </div>
      </div>

      <!-- Git Metadata Grid -->
      <div class="mech-subpanel p-3 font-mono-tech text-[10.5px] space-y-1.5">
        <div class="flex justify-between gap-2 border-b border-slate-800 pb-1">
          <span class="text-slate-400">.GITMODULES PATH</span>
          <span id="hud-path" class="text-cyan-300 selectable-text truncate">/</span>
        </div>
        <div class="flex justify-between gap-2 border-b border-slate-800 pb-1">
          <span class="text-slate-400">SECTOR COORDS</span>
          <span id="hud-coords" class="text-amber-200">X: 0.0 | Y: 0.0 | Z: 0.0</span>
        </div>
        <div class="flex justify-between gap-2">
          <span class="text-slate-400">BRANCH / HEAD</span>
          <span class="text-emerald-300">origin/HEAD (main)</span>
        </div>
      </div>

      <!-- Connected Jump-Lane Neighbors -->
      <div class="mech-subpanel p-3">
        <div class="flex items-center justify-between mb-2">
          <span class="font-mono-tech text-[9.5px] text-cyan-300 uppercase tracking-wider">
            FILAMENT JUMP-LANE NEIGHBORS
          </span>
          <span id="hud-neighbor-count" class="font-mono-tech text-[10px] text-slate-400">0 LINKS</span>
        </div>
        <div id="hud-neighbors" class="flex flex-wrap gap-1.5">
          <!-- Populated dynamically -->
        </div>
      </div>
    </div>
  </aside>

  <!-- 4. BOTTOM CAMERA & CONSTELLATION TACTICAL DOCK (.mech-win-dock) -->
  <nav id="bottom-dock" aria-label="Camera and Constellation Tactical Dock" class="mech-win-dock fixed bottom-2 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 flex flex-wrap items-center justify-center gap-2 max-w-[96vw] pointer-events-auto font-mono-tech text-[10px]">
    <button id="btn-reset-cam" class="mech-btn px-2.5 py-1 bg-cyan-500/20 text-cyan-200 border border-cyan-400/50 hover:bg-cyan-500/30 font-semibold">
      ⌖ RESET CAM
    </button>
    <button id="btn-toggle-labels" class="mech-btn px-2.5 py-1 bg-slate-900/90 text-cyan-300 border border-cyan-400/40 hover:bg-slate-800">
      LABELS: ON
    </button>
    <button id="btn-toggle-lanes" class="mech-btn px-2.5 py-1 bg-slate-900/90 text-amber-300 border border-amber-400/40 hover:bg-slate-800">
      JUMP-LANES: ON
    </button>
    <button id="btn-toggle-orbit" class="mech-btn px-2.5 py-1 bg-slate-900/90 text-purple-300 border border-purple-400/40 hover:bg-slate-800">
      AUTO-ORBIT: ON
    </button>
    <span class="text-slate-600 hidden md:inline">|</span>
    <span class="text-slate-400 hidden md:inline">[ / ]: PAGE • ESC: OVERVIEW</span>
  </nav>

  <!-- 6. POP-UP VIEWER MODAL FOR INDEX.HTML (.mech-win-modal-index) & README.MD (.mech-win-modal-readme) -->
  <div id="file-viewer-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm">
    <div id="file-viewer-card" class="mech-win-modal-index w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden">
      <!-- Modal Top Tactical Header -->
      <div class="px-5 py-3 border-b border-slate-700/80 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div class="flex items-center gap-2.5 min-w-0">
          <span id="modal-file-badge" class="font-mono-tech text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-200 border border-emerald-400/50">
            WEB TARGET // INDEX.HTML
          </span>
          <h3 id="modal-title" class="font-orbitron font-bold text-xs sm:text-sm text-white truncate">
            mercwar / AVIS-DATALAKE / index.html
          </h3>
        </div>

        <!-- Mode Switchers & Close Controls -->
        <div class="flex items-center gap-1.5 font-mono-tech text-[10.5px]">
          <button id="modal-tab-primary" class="mech-btn px-2.5 py-1 bg-cyan-500/25 text-white border border-cyan-400/60 font-semibold">
            LIVE RENDER
          </button>
          <button id="modal-tab-raw" class="mech-btn px-2.5 py-1 bg-slate-900 text-slate-300 border border-slate-700 hover:border-cyan-400/50">
            RAW SOURCE
          </button>
          <a
            id="modal-github-link"
            href="https://github.com/mercwar/AVIS-DATALAKE"
            target="_blank"
            rel="noopener noreferrer"
            class="mech-btn px-2.5 py-1 bg-amber-500/20 text-amber-200 border border-amber-400/50 hover:bg-amber-500/35"
          >
            ↗ GITHUB
          </a>
          <button id="modal-close-btn" class="mech-btn px-2.5 py-1 bg-rose-500/25 text-rose-200 border border-rose-400/60 hover:bg-rose-500/40 font-bold">
            ✕ ESC
          </button>
        </div>
      </div>

      <!-- Modal Status Strip -->
      <div class="px-5 py-1.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between font-mono-tech text-[10px] text-slate-400 shrink-0">
        <span id="modal-source-url" class="truncate selectable-text">https://raw.githubusercontent.com/mercwar/AVIS-DATALAKE/HEAD/index.html</span>
        <span id="modal-fetch-status" class="text-cyan-300 shrink-0 ml-2">READY</span>
      </div>

      <!-- Modal Content Viewport -->
      <div class="flex-1 relative overflow-hidden bg-slate-950">
        <!-- Sandboxed Live HTML Preview Iframe -->
        <iframe
          id="modal-iframe"
          sandbox="allow-scripts allow-same-origin"
          class="w-full h-full border-0 bg-white hidden"
          title="Live index.html Preview"
        ></iframe>

        <!-- Rendered Markdown Document Container -->
        <div id="modal-markdown-view" class="w-full h-full overflow-y-auto p-6 md-render hidden selectable-text"></div>

        <!-- Raw Source Code Viewer -->
        <pre id="modal-raw-view" class="w-full h-full overflow-auto p-5 font-mono-tech text-xs text-cyan-100 leading-relaxed hidden selectable-text"></pre>
      </div>
    </div>
  </div>

  <script>
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

    function simpleMarkdownToHtml(md) {
      let html = md
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Code blocks
      html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
      // Inline code
      html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
      // Headings
      html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
      html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
      html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
      // Blockquotes
      html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
      // Links
      html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      // Bold & Italic
      html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
      // Lists
      html = html.replace(/^\s*[-*] (.*$)/gim, '<li>$1</li>');
      html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');
      // Paragraphs
      html = html.split(/\n{2,}/).map((block) => {
        if (block.trim().startsWith('<')) return block;
        return `<p>${block.replace(/\n/g, '<br/>')}</p>`;
      }).join('\n');

      return html;
    }

    function renderModalContent() {
      const iframe = document.getElementById('modal-iframe');
      const mdView = document.getElementById('modal-markdown-view');
      const rawView = document.getElementById('modal-raw-view');
      const tabPrimary = document.getElementById('modal-tab-primary');
      const tabRaw = document.getElementById('modal-tab-raw');

      iframe.classList.add('hidden');
      mdView.classList.add('hidden');
      rawView.classList.add('hidden');

      if (modalState.viewMode === 'raw') {
        tabRaw.className = 'mech-btn px-2.5 py-1 bg-cyan-500/25 text-white border border-cyan-400/60 font-semibold';
        tabPrimary.className = 'mech-btn px-2.5 py-1 bg-slate-900 text-slate-300 border border-slate-700 hover:border-cyan-400/50';
        rawView.textContent = modalState.rawText;
        rawView.classList.remove('hidden');
      } else {
        tabPrimary.className = 'mech-btn px-2.5 py-1 bg-cyan-500/25 text-white border border-cyan-400/60 font-semibold';
        tabRaw.className = 'mech-btn px-2.5 py-1 bg-slate-900 text-slate-300 border border-slate-700 hover:border-cyan-400/50';
        if (modalState.fileType === 'index.html') {
          const baseTag = `<base href="https://raw.githubusercontent.com/mercwar/${encodeURIComponent(modalState.activeRepoName)}/HEAD/" />`;
          const injectedHtml = modalState.rawText.includes('<head>')
            ? modalState.rawText.replace('<head>', `<head>${baseTag}`)
            : `${baseTag}${modalState.rawText}`;
          iframe.srcdoc = injectedHtml;
          iframe.classList.remove('hidden');
        } else {
          mdView.innerHTML = simpleMarkdownToHtml(modalState.rawText);
          mdView.classList.remove('hidden');
        }
      }
    }

    async function openFileViewerModal(systemId, fileType) {
      const sys = SYSTEM_MAP.get(systemId) || SYSTEM_MAP.get('AVIS-DATALAKE');
      const repoName = sys.isBlob ? 'AVIS-DATALAKE' : sys.name;
      const targetFile = fileType === 'index.html' ? 'index.html' : 'README.md';
      const isIndex = targetFile === 'index.html';

      modalState.activeSystemId = sys.id;
      modalState.activeRepoName = repoName;
      modalState.fileType = targetFile;
      modalState.viewMode = 'primary';

      const modal = document.getElementById('file-viewer-modal');
      const modalCard = document.getElementById('file-viewer-card');
      modalCard.classList.remove('mech-win-modal-index', 'mech-win-modal-readme');
      modalCard.classList.add(isIndex ? 'mech-win-modal-index' : 'mech-win-modal-readme');

      document.getElementById('modal-file-badge').textContent = isIndex
        ? 'WEB TARGET // INDEX.HTML'
        : 'HOLO-CODEX // README.MD';
      document.getElementById('modal-file-badge').className = isIndex
        ? 'font-mono-tech text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-200 border border-emerald-400/50'
        : 'font-mono-tech text-[10px] px-2 py-0.5 bg-purple-500/20 text-purple-200 border border-purple-400/50';

      document.getElementById('modal-title').textContent = `mercwar / ${repoName} / ${targetFile}`;
      document.getElementById('modal-tab-primary').textContent = isIndex ? 'LIVE RENDER' : 'RENDERED DOC';
      document.getElementById('modal-github-link').href = `https://github.com/mercwar/${encodeURIComponent(repoName)}/blob/HEAD/${targetFile}`;

      const statusEl = document.getElementById('modal-fetch-status');
      statusEl.textContent = 'FETCHING STREAM...';
      statusEl.className = 'text-amber-300 shrink-0 ml-2';

      modal.classList.remove('hidden');
      modal.classList.add('flex');

      const branches = ['HEAD', 'main', 'master'];
      let fetched = false;

      for (const br of branches) {
        const rawUrl = `https://raw.githubusercontent.com/mercwar/${encodeURIComponent(repoName)}/${br}/${targetFile}`;
        document.getElementById('modal-source-url').textContent = rawUrl;
        try {
          const res = await fetch(rawUrl);
          if (res.ok) {
            modalState.rawText = await res.text();
            statusEl.textContent = `200 OK (${br})`;
            statusEl.className = 'text-emerald-300 shrink-0 ml-2';
            fetched = true;
            break;
          }
        } catch (e) {
          // Try next branch
        }
      }

      if (!fetched) {
        statusEl.textContent = 'FALLBACK PREVIEW';
        statusEl.className = 'text-cyan-300 shrink-0 ml-2';
        modalState.rawText = isIndex
          ? `<!DOCTYPE html><html><head><style>body{background:#040812;color:#00f0ff;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center}div{border:1px solid #00f0ff;padding:24px;max-width:520px}</style></head><body><div><h2>${repoName} // index.html</h2><p style="color:#cbd5e1">${sys.desc}</p><p style="color:#ffd97d">No standalone index.html detected at HEAD or offline sandbox active. Use ↗ GITHUB above to inspect repository root.</p></div></body></html>`
          : `# ${repoName}\n\n> **Sector:** ${SECTORS[sys.sector].name}  \n> **Git Mode:** \`${sys.mode}\`  \n> **Path:** \`${sys.path}\`\n\n## Overview\n${sys.desc}\n\n## Direct Uplinks\n- Repository: [https://github.com/mercwar/${repoName}](https://github.com/mercwar/${repoName})\n- Parent Hub: [https://github.com/mercwar/AVIS-DATALAKE](https://github.com/mercwar/AVIS-DATALAKE)`;
      }

      renderModalContent();
    }

    function closeFileViewerModal() {
      const modal = document.getElementById('file-viewer-modal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.getElementById('modal-iframe').srcdoc = '';
    }

    // =========================================================================
    // 4. THREE.JS 3D NEW EDEN STAR MAP SCENE
    // =========================================================================
    let scene, camera, renderer, controls, raycaster, mouse;
    const starMeshes = new Map();
    const labelElements = new Map();
    let laneLinesGroup, starfieldPoints, hubGroup, gimbalRing1, gimbalRing2, selectionReticle;
    let hoveredSystemId = null;

    const cameraTween = {
      active: false,
      startPos: new THREE.Vector3(),
      endPos: new THREE.Vector3(),
      startTarget: new THREE.Vector3(),
      endTarget: new THREE.Vector3(),
      progress: 0
    };

    function initThreeScene() {
      const container = document.getElementById('canvas-container');
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x03050a, 0.0042);

      camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 48, 92);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x03050a, 1);
      container.appendChild(renderer.domElement);

      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.minDistance = 10;
      controls.maxDistance = 240;
      controls.autoRotate = uiState.autoOrbit;
      controls.autoRotateSpeed = 0.45;

      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2(-99, -99);

      // Ambient & Point Lights
      scene.add(new THREE.AmbientLight(0x334155, 1.4));
      const hubLight = new THREE.PointLight(0xffd97d, 2.8, 160);
      hubLight.position.set(0, 0, 0);
      scene.add(hubLight);

      // Starfield Background Particles
      const starGeo = new THREE.BufferGeometry();
      const starCount = 2200;
      const starPositions = new Float32Array(starCount * 3);
      const starColors = new Float32Array(starCount * 3);
      const palette = [new THREE.Color(0x00f0ff), new THREE.Color(0xb84dff), new THREE.Color(0xffd97d), new THREE.Color(0x94a3b8)];

      for (let i = 0; i < starCount; i++) {
        const r = 110 + Math.random() * 240;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        starPositions[i * 3 + 1] = r * Math.cos(phi);
        starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

        const c = palette[i % palette.length];
        starColors[i * 3] = c.r;
        starColors[i * 3 + 1] = c.g;
        starColors[i * 3 + 2] = c.b;
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
      const starMat = new THREE.PointsMaterial({ size: 0.95, vertexColors: true, transparent: true, opacity: 0.78 });
      starfieldPoints = new THREE.Points(starGeo, starMat);
      scene.add(starfieldPoints);

      // Subtle Galactic Grid Plane
      const gridHelper = new THREE.PolarGridHelper(95, 16, 8, 64, 0x0f2942, 0x09192b);
      gridHelper.position.y = -18;
      scene.add(gridHelper);

      // Build Central Reactor Hub (AVIS-DATALAKE)
      hubGroup = new THREE.Group();
      const coreGeo = new THREE.IcosahedronGeometry(3.2, 1);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xffd97d,
        emissive: 0xff9d00,
        emissiveIntensity: 0.85,
        roughness: 0.2,
        metalness: 0.8
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.userData = { systemId: 'AVIS-DATALAKE' };
      hubGroup.add(coreMesh);
      starMeshes.set('AVIS-DATALAKE', coreMesh);

      const cageGeo = new THREE.IcosahedronGeometry(4.3, 0);
      const cageMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.45 });
      hubGroup.add(new THREE.Mesh(cageGeo, cageMat));

      const ringGeo1 = new THREE.TorusGeometry(6.2, 0.12, 8, 64);
      const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xffd97d, transparent: true, opacity: 0.7 });
      gimbalRing1 = new THREE.Mesh(ringGeo1, ringMat1);
      hubGroup.add(gimbalRing1);

      const ringGeo2 = new THREE.TorusGeometry(7.4, 0.09, 8, 64);
      const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.55 });
      gimbalRing2 = new THREE.Mesh(ringGeo2, ringMat2);
      gimbalRing2.rotation.x = Math.PI / 3;
      hubGroup.add(gimbalRing2);

      // Vertical Plasma Beacon Beam
      const beamGeo = new THREE.CylinderGeometry(0.14, 0.14, 52, 12);
      const beamMat = new THREE.MeshBasicMaterial({ color: 0xffd97d, transparent: true, opacity: 0.22 });
      hubGroup.add(new THREE.Mesh(beamGeo, beamMat));

      scene.add(hubGroup);

      // Build Satellite Star Nodes & Labels
      const labelsLayer = document.getElementById('labels-layer');

      RAW_SYSTEMS.forEach((sys) => {
        if (!sys.isHub) {
          const sec = SECTORS[sys.sector];
          const geo = sys.isBlob
            ? new THREE.BoxGeometry(1.15, 1.15, 1.15)
            : new THREE.OctahedronGeometry(1.35, 0);
          const mat = new THREE.MeshStandardMaterial({
            color: sec.hex,
            emissive: sec.hex,
            emissiveIntensity: 0.65,
            roughness: 0.25,
            metalness: 0.75
          });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.set(sys.pos[0], sys.pos[1], sys.pos[2]);
          mesh.userData = { systemId: sys.id };
          scene.add(mesh);
          starMeshes.set(sys.id, mesh);
        }

        // Create HTML Floating Label
        const lbl = document.createElement('div');
        lbl.textContent = sys.name;
        lbl.className = `star-label ${sys.isHub ? 'is-hub' : ''}`;
        lbl.style.color = sys.isHub ? '#ffd97d' : SECTORS[sys.sector].color;
        lbl.onclick = (e) => {
          e.stopPropagation();
          selectSystem(sys.id, true);
        };
        labelsLayer.appendChild(lbl);
        labelElements.set(sys.id, lbl);
      });

      // Build Filament Jump-Lanes
      laneLinesGroup = new THREE.Group();
      JUMP_LANES.forEach((lane) => {
        const sysA = SYSTEM_MAP.get(lane.a);
        const sysB = SYSTEM_MAP.get(lane.b);
        const points = [
          new THREE.Vector3(...sysA.pos),
          new THREE.Vector3(...sysB.pos)
        ];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({
          color: lane.isCross ? 0xffd97d : SECTORS[sysA.sector].hex,
          transparent: true,
          opacity: lane.isCross ? 0.34 : 0.24
        });
        const line = new THREE.Line(geo, mat);
        line.userData = { a: lane.a, b: lane.b, isCross: lane.isCross };
        laneLinesGroup.add(line);
      });
      scene.add(laneLinesGroup);

      // Hexagonal Selection Targeting Reticle
      const retGeo = new THREE.RingGeometry(2.3, 2.75, 6);
      const retMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.9 });
      selectionReticle = new THREE.Mesh(retGeo, retMat);
      scene.add(selectionReticle);

      // Events
      window.addEventListener('resize', onWindowResize);
      renderer.domElement.addEventListener('pointermove', onPointerMove);
      renderer.domElement.addEventListener('click', onCanvasClick);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onPointerMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes = Array.from(starMeshes.values());
      const intersects = raycaster.intersectObjects(meshes, false);
      const tooltip = document.getElementById('hover-tooltip');

      if (intersects.length > 0) {
        const sysId = intersects[0].object.userData.systemId;
        hoveredSystemId = sysId;
        document.body.style.cursor = 'pointer';
        const sys = SYSTEM_MAP.get(sysId);

        document.getElementById('tt-name').textContent = sys.name;
        document.getElementById('tt-mode').textContent = sys.mode;
        document.getElementById('tt-sector').textContent = SECTORS[sys.sector].name;
        document.getElementById('tt-sector').style.color = SECTORS[sys.sector].color;
        document.getElementById('tt-desc').textContent = sys.desc;
        document.getElementById('tt-coords').textContent = `X:${sys.pos[0]} Y:${sys.pos[1]} Z:${sys.pos[2]}`;

        const tx = Math.min(window.innerWidth - 310, event.clientX + 16);
        const ty = Math.min(window.innerHeight - 150, event.clientY + 16);
        tooltip.style.left = `${tx}px`;
        tooltip.style.top = `${ty}px`;
        tooltip.style.opacity = '1';
      } else {
        hoveredSystemId = null;
        document.body.style.cursor = 'default';
        tooltip.style.opacity = '0';
      }
    }

    function onCanvasClick() {
      if (hoveredSystemId) {
        selectSystem(hoveredSystemId, true);
      }
    }

    function selectSystem(systemId, flyCamera = true) {
      const sys = SYSTEM_MAP.get(systemId);
      if (!sys) return;
      uiState.selectedId = systemId;

      // Update Right HUD Telemetry
      const sec = SECTORS[sys.sector];
      const repoName = sys.isBlob ? 'AVIS-DATALAKE' : sys.name;

      document.getElementById('hud-title').textContent = sys.name;
      document.getElementById('hud-mode-badge').textContent = sys.mode;
      document.getElementById('hud-sector').textContent = sec.name;
      document.getElementById('hud-sector').style.color = sec.color;
      document.getElementById('hud-desc').textContent = sys.desc;
      document.getElementById('hud-path').textContent = sys.path;
      document.getElementById('hud-coords').textContent = `X:${sys.pos[0]} | Y:${sys.pos[1]} | Z:${sys.pos[2]}`;

      // Update Direct Uplink Buttons
      document.getElementById('hud-link-repo').href = `https://github.com/mercwar/${encodeURIComponent(repoName)}`;
      document.getElementById('hud-btn-index').onclick = () => openFileViewerModal(sys.id, 'index.html');
      document.getElementById('hud-btn-readme').onclick = () => openFileViewerModal(sys.id, 'README.md');

      // Populate Jump-Lane Neighbors
      const neighborsEl = document.getElementById('hud-neighbors');
      neighborsEl.innerHTML = '';
      const neighborIds = Array.from(sys.neighbors);
      document.getElementById('hud-neighbor-count').textContent = `${neighborIds.length} LINKS`;

      neighborIds.forEach((nId) => {
        const nSys = SYSTEM_MAP.get(nId);
        if (!nSys) return;
        const btn = document.createElement('button');
        btn.textContent = nSys.name;
        btn.className = 'mech-btn px-2 py-0.5 font-mono-tech text-[10px] bg-slate-900/90 text-cyan-200 border border-cyan-500/35 hover:border-cyan-300 hover:bg-cyan-500/20';
        btn.onclick = () => selectSystem(nSys.id, true);
        neighborsEl.appendChild(btn);
      });

      // Highlight Jump-Lanes connected to selected node
      laneLinesGroup.children.forEach((line) => {
        const isConnected = line.userData.a === systemId || line.userData.b === systemId;
        line.material.opacity = isConnected ? 0.85 : line.userData.isCross ? 0.25 : 0.16;
      });

      // Update Label Selection Classes
      labelElements.forEach((el, id) => {
        if (id === systemId) el.classList.add('is-selected');
        else el.classList.remove('is-selected');
      });

      // Move Selection Reticle & Fly Camera
      selectionReticle.position.set(sys.pos[0], sys.pos[1], sys.pos[2]);
      const scale = sys.isHub ? 2.2 : 1.1;
      selectionReticle.scale.set(scale, scale, scale);

      if (flyCamera) {
        const targetVec = new THREE.Vector3(sys.pos[0], sys.pos[1], sys.pos[2]);
        const offset = sys.isHub ? new THREE.Vector3(0, 46, 88) : new THREE.Vector3(14, 10, 22);
        cameraTween.startPos.copy(camera.position);
        cameraTween.endPos.copy(targetVec).add(offset);
        cameraTween.startTarget.copy(controls.target);
        cameraTween.endTarget.copy(targetVec);
        cameraTween.progress = 0;
        cameraTween.active = true;
      }

      renderTree();
    }

    function applySectorFilter(sectorKey) {
      uiState.sectorFilter = sectorKey;
      uiState.currentPage = 1;

      // Sync top pill buttons & left dropdown
      document.querySelectorAll('.sector-pill').forEach((btn) => {
        if (btn.dataset.sector === sectorKey) {
          btn.classList.add('bg-cyan-500/30', 'text-white', 'border-cyan-400');
        } else {
          btn.classList.remove('bg-cyan-500/30', 'text-white', 'border-cyan-400');
        }
      });
      document.getElementById('tree-sector-select').value = sectorKey;

      // Dim non-matching 3D nodes
      starMeshes.forEach((mesh, id) => {
        const sys = SYSTEM_MAP.get(id);
        const visible = sectorKey === 'ALL' || sys.sector === sectorKey || sys.isHub;
        mesh.material.opacity = visible ? 1.0 : 0.22;
        mesh.material.transparent = !visible;
      });

      renderTree();
    }

    function updateProjectedLabels() {
      const tempV = new THREE.Vector3();
      starMeshes.forEach((mesh, id) => {
        const lbl = labelElements.get(id);
        const sys = SYSTEM_MAP.get(id);
        if (!lbl || !sys) return;

        const sectorAllowed = uiState.sectorFilter === 'ALL' || sys.sector === uiState.sectorFilter || sys.isHub;
        if (!uiState.showLabels || !sectorAllowed) {
          lbl.style.display = 'none';
          return;
        }

        mesh.getWorldPosition(tempV);
        tempV.project(camera);

        // Hide if behind camera
        if (tempV.z > 1) {
          lbl.style.display = 'none';
          return;
        }

        const x = (tempV.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-(tempV.y * 0.5) + 0.5) * window.innerHeight;
        lbl.style.display = 'block';
        lbl.style.left = `${x}px`;
        lbl.style.top = `${y}px`;
      });
    }

    function animate() {
      requestAnimationFrame(animate);

      const t = performance.now() * 0.001;
      if (hubGroup) {
        hubGroup.children[0].rotation.y = t * 0.55;
        hubGroup.children[1].rotation.y = -t * 0.35;
        gimbalRing1.rotation.z = t * 0.6;
        gimbalRing1.rotation.x = Math.sin(t * 0.4) * 0.5;
        gimbalRing2.rotation.y = -t * 0.7;
      }

      if (selectionReticle) {
        selectionReticle.lookAt(camera.position);
        selectionReticle.rotation.z = t * 1.2;
      }

      // Rotate satellite octahedrons gently
      starMeshes.forEach((mesh, id) => {
        if (id !== 'AVIS-DATALAKE') {
          mesh.rotation.y = t * 0.8;
        }
      });

      if (cameraTween.active) {
        cameraTween.progress += 0.045;
        const ease = 1 - Math.pow(1 - Math.min(1, cameraTween.progress), 3);
        camera.position.lerpVectors(cameraTween.startPos, cameraTween.endPos, ease);
        controls.target.lerpVectors(cameraTween.startTarget, cameraTween.endTarget, ease);
        if (cameraTween.progress >= 1) {
          cameraTween.active = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
      updateProjectedLabels();
    }

    // =========================================================================
    // 5. EVENT BINDINGS & INITIALIZATION
    // =========================================================================
    window.addEventListener('DOMContentLoaded', () => {
      initThreeScene();
      selectSystem('AVIS-DATALAKE', false);
      renderTree();
      animate();

      // Top Sector Filter Pills
      document.querySelectorAll('.sector-pill').forEach((btn) => {
        btn.addEventListener('click', () => applySectorFilter(btn.dataset.sector));
      });

      // Left Drawer Controls
      document.getElementById('tree-search').addEventListener('input', (e) => {
        uiState.searchQuery = e.target.value;
        uiState.currentPage = 1;
        renderTree();
      });

      document.getElementById('tree-sector-select').addEventListener('change', (e) => {
        applySectorFilter(e.target.value);
      });

      document.getElementById('page-size-select').addEventListener('change', (e) => {
        uiState.pageSize = parseInt(e.target.value, 10) || 14;
        uiState.currentPage = 1;
        renderTree();
      });

      document.getElementById('btn-prev-page').addEventListener('click', () => {
        if (uiState.currentPage > 1) {
          uiState.currentPage--;
          renderTree();
        }
      });

      document.getElementById('btn-next-page').addEventListener('click', () => {
        uiState.currentPage++;
        renderTree();
      });

      document.getElementById('btn-expand-all').addEventListener('click', () => {
        RAW_SYSTEMS.forEach((s) => expandedNodes.add(s.id));
        renderTree();
      });

      document.getElementById('btn-collapse-all').addEventListener('click', () => {
        expandedNodes.clear();
        uiState.currentPage = 1;
        renderTree();
      });

      // Live GitHub Tree Sync Button
      document.getElementById('btn-sync-live').addEventListener('click', () => {
        fetchLiveRepoTree(uiState.selectedId);
      });

      // Drawer Visibility Toggles
      const leftDrawer = document.getElementById('left-drawer');
      const rightDrawer = document.getElementById('right-drawer');
      document.getElementById('btn-toggle-left').addEventListener('click', () => {
        leftDrawer.classList.toggle('-translate-x-[120%]');
      });
      document.getElementById('btn-toggle-right').addEventListener('click', () => {
        rightDrawer.classList.toggle('translate-x-[120%]');
      });

      // Bottom Tactical Dock Controls
      document.getElementById('btn-reset-cam').addEventListener('click', () => {
        selectSystem('AVIS-DATALAKE', true);
      });

      document.getElementById('btn-toggle-labels').addEventListener('click', (e) => {
        uiState.showLabels = !uiState.showLabels;
        e.target.textContent = `LABELS: ${uiState.showLabels ? 'ON' : 'OFF'}`;
      });

      document.getElementById('btn-toggle-lanes').addEventListener('click', (e) => {
        uiState.showLanes = !uiState.showLanes;
        laneLinesGroup.visible = uiState.showLanes;
        e.target.textContent = `JUMP-LANES: ${uiState.showLanes ? 'ON' : 'OFF'}`;
      });

      document.getElementById('btn-toggle-orbit').addEventListener('click', (e) => {
        uiState.autoOrbit = !uiState.autoOrbit;
        controls.autoRotate = uiState.autoOrbit;
        e.target.textContent = `AUTO-ORBIT: ${uiState.autoOrbit ? 'ON' : 'OFF'}`;
      });

      // Modal Pop-Up Event Listeners
      document.getElementById('modal-tab-primary').addEventListener('click', () => {
        modalState.viewMode = 'primary';
        renderModalContent();
      });
      document.getElementById('modal-tab-raw').addEventListener('click', () => {
        modalState.viewMode = 'raw';
        renderModalContent();
      });
      document.getElementById('modal-close-btn').addEventListener('click', closeFileViewerModal);
      document.getElementById('file-viewer-modal').addEventListener('click', (e) => {
        if (e.target.id === 'file-viewer-modal') closeFileViewerModal();
      });

      // Keyboard Shortcuts ([ / ] Pagination & ESC Overview/Close)
      window.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
        if (e.key === '[') {
          if (uiState.currentPage > 1) {
            uiState.currentPage--;
            renderTree();
          }
        } else if (e.key === ']') {
          uiState.currentPage++;
          renderTree();
        } else if (e.key === 'Escape') {
          const modal = document.getElementById('file-viewer-modal');
          if (!modal.classList.contains('hidden')) {
            closeFileViewerModal();
          } else {
            applySectorFilter('ALL');
            selectSystem('AVIS-DATALAKE', true);
          }
        }
      });
    });
  </script>
</body>
</html>
