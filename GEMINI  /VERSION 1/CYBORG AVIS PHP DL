<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="dark" />
  <title>DROPPIPE — PHP Intake App → Datalake</title>

  <!-- Distinct typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&family=IBM+Plex+Mono:wght@300;400;500;600&display=swap" rel="stylesheet">

  <style>
    :root{
      --bg0:#07060c;
      --bg1:#0b0a12;
      --ink:#efeef7;
      --muted:#b6b2d0;
      --faint:#8c88aa;

      --acid:#b7ff2a;      /* dominant accent */
      --hot:#ff2fd6;       /* sharp accent */
      --ice:#38d3ff;       /* utility accent */
      --ember:#ff7a2f;

      --line: rgba(255,255,255,.12);
      --glass: rgba(255,255,255,.06);
      --glass2: rgba(255,255,255,.08);

      --shadow: 0 28px 70px rgba(0,0,0,.55);
      --shadow2: 0 12px 28px rgba(0,0,0,.45);

      --r-xl: 26px;
      --r-lg: 18px;
      --r-md: 14px;
      --r-sm: 12px;

      --mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      --display: "Fraunces", ui-serif, Georgia, serif;

      --container: min(1180px, calc(100vw - 40px));
    }

    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0;
      color:var(--ink);
      background:
        radial-gradient(1100px 700px at 20% -10%, rgba(183,255,42,.22), transparent 60%),
        radial-gradient(900px 650px at 110% 10%, rgba(255,47,214,.20), transparent 55%),
        radial-gradient(900px 700px at 70% 115%, rgba(56,211,255,.16), transparent 55%),
        linear-gradient(180deg, var(--bg0), var(--bg1));
      font-family: var(--mono);
      letter-spacing: .2px;
      overflow-x:hidden;
    }

    /* subtle grain */
    body:before{
      content:"";
      position:fixed; inset:0;
      pointer-events:none;
      background-image:
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.22'/%3E%3C/svg%3E");
      mix-blend-mode: overlay;
      opacity:.25;
    }

    a{color:inherit}
    .sr-only{
      position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;
    }

    /* Top bar */
    header{
      position:sticky; top:0; z-index:40;
      backdrop-filter: blur(14px);
      background: linear-gradient(180deg, rgba(9,8,16,.78), rgba(9,8,16,.44));
      border-bottom:1px solid var(--line);
    }
    .topbar{
      width:var(--container);
      margin:0 auto;
      padding:14px 0;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:16px;
    }
    .brand{
      display:flex; align-items:baseline; gap:10px;
      user-select:none;
    }
    .brand .mark{
      width:12px; height:12px; border-radius:3px;
      background:
        conic-gradient(from 220deg, var(--acid), var(--hot), var(--ice), var(--acid));
      box-shadow: 0 0 0 1px rgba(255,255,255,.18), 0 0 22px rgba(183,255,42,.25);
      transform: translateY(-1px);
    }
    .brand b{
      font-family: var(--display);
      font-variation-settings: "opsz" 96;
      letter-spacing:.2px;
      font-weight:800;
      font-size: clamp(18px, 1.6vw, 22px);
    }
    .brand small{
      color: var(--muted);
      font-size: 12px;
      letter-spacing:.18em;
      text-transform: uppercase;
    }
    .navpill{
      display:flex; gap:10px; align-items:center;
      color: var(--muted);
      font-size:12px;
    }
    .navpill code{
      font-family: var(--mono);
      padding: 7px 10px;
      border-radius: 999px;
      border:1px solid var(--line);
      background: rgba(255,255,255,.04);
    }

    /* Hero */
    main{width:var(--container); margin:0 auto; padding: 28px 0 56px;}
    .hero{
      display:grid;
      grid-template-columns: 1.15fr .85fr;
      gap: 22px;
      align-items: stretch;
      margin-top: 12px;
    }
    @media (max-width: 980px){
      .hero{grid-template-columns:1fr; }
    }

    .panel{
      border: 1px solid var(--line);
      border-radius: var(--r-xl);
      background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.03));
      box-shadow: var(--shadow);
      position:relative;
      overflow:hidden;
    }
    .panel:after{
      content:"";
      position:absolute; inset:-1px;
      background:
        radial-gradient(520px 300px at 18% 20%, rgba(183,255,42,.16), transparent 55%),
        radial-gradient(520px 320px at 86% 10%, rgba(255,47,214,.14), transparent 52%),
        radial-gradient(520px 360px at 50% 110%, rgba(56,211,255,.10), transparent 55%);
      pointer-events:none;
      filter:saturate(1.1);
    }

    .panel > .inner{
      position:relative;
      padding: 22px;
    }
    .kicker{
      display:flex; gap:10px; align-items:center;
      color: var(--muted);
      font-size: 12px;
      letter-spacing: .16em;
      text-transform: uppercase;
    }
    .kicker .dot{
      width:8px;height:8px;border-radius:99px;
      background: var(--acid);
      box-shadow: 0 0 0 1px rgba(255,255,255,.12), 0 0 18px rgba(183,255,42,.35);
    }

    h1{
      margin: 10px 0 10px;
      font-family: var(--display);
      font-weight: 900;
      line-height: 1.02;
      font-size: clamp(36px, 4.2vw, 64px);
      letter-spacing: -.02em;
    }
    .sub{
      margin:0;
      color: var(--muted);
      font-size: clamp(14px, 1.25vw, 16px);
      line-height: 1.65;
      max-width: 62ch;
    }

    .calloutRow{
      display:flex; flex-wrap:wrap; gap:10px;
      margin-top: 16px;
    }
    .chip{
      display:inline-flex; align-items:center; gap:10px;
      padding: 10px 12px;
      border-radius: 999px;
      border:1px solid var(--line);
      background: rgba(0,0,0,.18);
      color: var(--muted);
      font-size: 12px;
      box-shadow: 0 0 0 1px rgba(255,255,255,.02) inset;
    }
    .chip b{color: var(--ink); font-weight:600}
    .chip .tag{
      font-family: var(--mono);
      color: rgba(0,0,0,.85);
      background: linear-gradient(90deg, var(--acid), rgba(183,255,42,.65));
      padding: 2px 8px;
      border-radius: 999px;
      font-weight: 700;
      letter-spacing: .06em;
      text-transform: uppercase;
      font-size: 10px;
    }

    /* Right side: "Console" */
    .console{
      border-radius: var(--r-xl);
      border: 1px solid var(--line);
      background:
        linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.22));
      box-shadow: var(--shadow2);
      overflow:hidden;
      position:relative;
    }
    .console .bar{
      display:flex; align-items:center; justify-content:space-between;
      padding: 12px 14px;
      border-bottom: 1px solid var(--line);
      background: rgba(255,255,255,.03);
    }
    .lights{display:flex; gap:7px}
    .lights i{
      width:10px; height:10px; border-radius:999px; display:inline-block;
      box-shadow: 0 0 0 1px rgba(255,255,255,.10);
    }
    .lights i:nth-child(1){background: #ff5d5d}
    .lights i:nth-child(2){background: #ffcc4d}
    .lights i:nth-child(3){background: #53ff8d}
    .console .title{
      font-size:12px; color: var(--muted);
      letter-spacing:.12em; text-transform:uppercase;
    }

    pre{
      margin:0;
      padding: 14px;
      white-space:pre-wrap;
      word-break: break-word;
      font-size: 12px;
      line-height: 1.55;
      color: rgba(239,238,247,.92);
      background:
        radial-gradient(500px 260px at 20% 10%, rgba(56,211,255,.10), transparent 60%),
        radial-gradient(480px 240px at 90% 10%, rgba(255,47,214,.10), transparent 55%),
        rgba(0,0,0,.25);
    }
    .hint{
      padding: 12px 14px;
      border-top: 1px solid var(--line);
      display:flex; gap:10px; align-items:flex-start;
      color: var(--muted);
      font-size: 12px;
      line-height:1.55;
      background: rgba(255,255,255,.03);
    }
    .hint svg{flex:0 0 auto; opacity:.9}
    .hint b{color: var(--ink); font-weight:600}

    /* App grid */
    .grid{
      margin-top: 22px;
      display:grid;
      grid-template-columns: 1.05fr .95fr;
      gap: 18px;
      align-items:start;
    }
    @media (max-width: 980px){
      .grid{grid-template-columns:1fr;}
    }

    .card{
      border:1px solid var(--line);
      border-radius: var(--r-xl);
      background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.025));
      box-shadow: var(--shadow2);
      overflow:hidden;
      position:relative;
    }
    .card > .inner{padding: 18px;}
    .card h2{
      margin: 0 0 10px;
      font-family: var(--display);
      font-size: 26px;
      letter-spacing: -.01em;
      font-weight: 850;
    }
    .card p{margin:0 0 14px; color: var(--muted); line-height:1.65; font-size: 13px;}

    form{
      display:grid;
      gap: 12px;
      margin-top: 8px;
    }
    .row{
      display:grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    @media (max-width: 640px){
      .row{grid-template-columns:1fr;}
    }
    label{
      display:grid;
      gap: 6px;
      color: rgba(239,238,247,.92);
      font-size: 12px;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    input, textarea, select{
      width:100%;
      border-radius: 14px;
      border:1px solid rgba(255,255,255,.14);
      background: rgba(0,0,0,.22);
      color: var(--ink);
      padding: 12px 12px;
      outline: none;
      font-family: var(--mono);
      font-size: 13px;
      transition: transform .15s ease, border-color .15s ease, box-shadow .15s ease, background .15s ease;
      box-shadow: 0 0 0 1px rgba(255,255,255,.03) inset;
    }
    textarea{min-height: 112px; resize: vertical}
    input:focus, textarea:focus, select:focus{
      border-color: rgba(183,255,42,.55);
      box-shadow: 0 0 0 4px rgba(183,255,42,.12);
      background: rgba(0,0,0,.30);
    }

    .actions{
      display:flex;
      flex-wrap:wrap;
      gap: 10px;
      align-items:center;
      margin-top: 2px;
    }
    .btn{
      appearance:none;
      border:1px solid rgba(255,255,255,.14);
      border-radius: 999px;
      padding: 12px 14px;
      background: rgba(255,255,255,.06);
      color: var(--ink);
      font-family: var(--mono);
      font-size: 13px;
      letter-spacing: .04em;
      cursor:pointer;
      transition: transform .12s ease, box-shadow .12s ease, background .12s ease, border-color .12s ease;
      user-select:none;
    }
    .btn:hover{transform: translateY(-1px); border-color: rgba(255,255,255,.26); box-shadow: 0 10px 22px rgba(0,0,0,.35)}
    .btn:active{transform: translateY(1px) scale(.99)}
    .btn.primary{
      border-color: rgba(183,255,42,.55);
      background: linear-gradient(90deg, rgba(183,255,42,.95), rgba(56,211,255,.35));
      color: rgba(0,0,0,.86);
      font-weight: 700;
      box-shadow: 0 18px 40px rgba(183,255,42,.12);
    }
    .btn.ghost{
      background: rgba(0,0,0,.20);
    }
    .btn.danger{
      border-color: rgba(255,47,214,.35);
      background: linear-gradient(90deg, rgba(255,47,214,.20), rgba(255,122,47,.10));
    }

    .meta{
      display:grid;
      gap: 10px;
      margin-top: 12px;
      padding-top: 14px;
      border-top: 1px dashed rgba(255,255,255,.16);
      color: var(--muted);
      font-size: 12px;
      line-height:1.7;
    }
    .meta code{
      font-family: var(--mono);
      background: rgba(255,255,255,.05);
      border:1px solid rgba(255,255,255,.10);
      padding: 2px 7px;
      border-radius: 999px;
      color: rgba(239,238,247,.92);
    }

    /* Status badges */
    .status{
      display:flex; gap:10px; flex-wrap:wrap; align-items:center;
      margin-top: 10px;
    }
    .badge{
      display:inline-flex; gap:8px; align-items:center;
      padding: 8px 10px;
      border-radius: 999px;
      border:1px solid var(--line);
      background: rgba(0,0,0,.18);
      font-size: 12px;
      color: var(--muted);
    }
    .badge .led{
      width:8px;height:8px;border-radius:999px;
      background: rgba(255,255,255,.25);
      box-shadow: 0 0 0 1px rgba(255,255,255,.12);
    }
    .badge.good .led{background: var(--acid); box-shadow: 0 0 18px rgba(183,255,42,.35), 0 0 0 1px rgba(255,255,255,.10)}
    .badge.warn .led{background: #ffcc4d; box-shadow: 0 0 18px rgba(255,204,77,.25), 0 0 0 1px rgba(255,255,255,.10)}
    .badge.bad .led{background: #ff5d5d; box-shadow: 0 0 18px rgba(255,93,93,.22), 0 0 0 1px rgba(255,255,255,.10)}

    /* Feed list */
    .feed{
      display:grid;
      gap: 12px;
      margin-top: 10px;
    }
    .item{
      border:1px solid rgba(255,255,255,.14);
      border-radius: 18px;
      background: rgba(0,0,0,.20);
      padding: 12px;
      position:relative;
      overflow:hidden;
      transition: transform .15s ease, border-color .15s ease, background .15s ease;
    }
    .item:hover{
      transform: translateY(-1px);
      border-color: rgba(183,255,42,.25);
      background: rgba(0,0,0,.26);
    }
    .item .top{
      display:flex; justify-content:space-between; gap:10px; align-items:flex-start;
    }
    .item .name{
      font-weight: 600; color: rgba(239,238,247,.95);
      font-size: 13px;
    }
    .item .time{
      color: var(--faint);
      font-size: 11px;
      white-space:nowrap;
    }
    .item .body{
      margin-top: 8px;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.6;
    }
    .item .pillrow{display:flex; gap:8px; flex-wrap:wrap; margin-top:10px}
    .pill{
      font-size: 11px;
      color: rgba(239,238,247,.9);
      border:1px solid rgba(255,255,255,.12);
      background: rgba(255,255,255,.04);
      padding: 3px 8px;
      border-radius: 999px;
    }
    .pill.acid{
      border-color: rgba(183,255,42,.35);
      background: rgba(183,255,42,.08);
    }
    .pill.hot{
      border-color: rgba(255,47,214,.35);
      background: rgba(255,47,214,.08);
    }
    .pill.ice{
      border-color: rgba(56,211,255,.35);
      background: rgba(56,211,255,.08);
    }

    /* Reveal animation */
    .reveal{opacity:0; transform: translateY(10px); filter: blur(1px);}
    .reveal.in{
      opacity:1; transform:none; filter:none;
      transition: opacity .7s cubic-bezier(.2,.8,.2,1), transform .7s cubic-bezier(.2,.8,.2,1), filter .7s cubic-bezier(.2,.8,.2,1);
    }

    footer{
      width:var(--container);
      margin: 0 auto 28px;
      padding-top: 18px;
      border-top: 1px solid var(--line);
      color: var(--muted);
      display:flex;
      flex-wrap:wrap;
      justify-content:space-between;
      gap:10px;
      font-size: 12px;
    }
    footer .links{display:flex; gap:12px; flex-wrap:wrap}
    footer a{
      text-decoration:none;
      border-bottom:1px solid rgba(255,255,255,.18);
    }
    footer a:hover{border-bottom-color: var(--acid)}
  </style>
</head>

<body>
  <header>
    <div class="topbar">
      <div class="brand">
        <span class="mark" aria-hidden="true"></span>
        <div>
          <b>DROPPIPE</b>
          <div><small>PHP intake → datalake + user callbacks</small></div>
        </div>
      </div>
      <div class="navpill" aria-label="Endpoints">
        <code>POST /api/intake.php</code>
        <code>POST /api/callback.php</code>
      </div>
    </div>
  </header>

  <main>
    <section class="hero">
      <article class="panel reveal">
        <div class="inner">
          <div class="kicker"><span class="dot"></span><span>Operational intake surface</span></div>
          <h1>Collect signals. Ship to the lake. Call your users back.</h1>
          <p class="sub">
            A compact PHP application that accepts user submissions, enriches them with metadata,
            and forwards them to your datalake intake endpoint. It also exposes a callback endpoint
            so your datalake (or processors) can notify users asynchronously.
          </p>

          <div class="calloutRow" role="list" aria-label="Highlights">
            <div class="chip" role="listitem"><span class="tag">NO DB</span> writes JSONL to disk (swap for S3/queue)</div>
            <div class="chip" role="listitem"><span class="tag">HMAC</span> signed payloads to datalake</div>
            <div class="chip" role="listitem"><span class="tag">CALLBACK</span> per-user webhook URL support</div>
            <div class="chip" role="listitem"><span class="tag">A11Y</span> semantic + contrast-safe UI</div>
          </div>
        </div>
      </article>

      <aside class="console reveal" aria-label="Quickstart snippet">
        <div class="bar">
          <div class="lights" aria-hidden="true"><i></i><i></i><i></i></div>
          <div class="title">deploy notes</div>
        </div>
        <pre><code># folder layout
/public/index.html
/api/intake.php
/api/callback.php
/storage/events.jsonl
/storage/callbacks.jsonl

# set env vars (apache/nginx/php-fpm)
DATALAKE_INGEST_URL=https://datalake.example.com/ingest
DATALAKE_HMAC_SECRET=replace_me
APP_SHARED_TOKEN=replace_me_too

# try it
curl -X POST https://yourapp.example.com/api/intake.php \
  -H "Content-Type: application/json" \
  -d '{"user_id":"u_123","event":"feedback","message":"ship it","callback_url":"https://user.example.com/webhook"}'</code></pre>
        <div class="hint">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15h-2v-2h2Zm0-4h-2V7h2Z" fill="currentColor" opacity=".9"/>
          </svg>
          <div>
            <b>Security model:</b> intake requires <code>APP_SHARED_TOKEN</code>. Datalake forwarding is signed with HMAC.
            Callback endpoint verifies HMAC from the datalake (same secret).
          </div>
        </div>
      </aside>
    </section>

    <section class="grid" aria-label="Application">
      <section class="card reveal" aria-label="Submission UI">
        <div class="inner">
          <h2>Submission Surface</h2>
          <p>
            This front-end posts JSON to <code>/api/intake.php</code>. In production, you’ll likely call this from your product
            backend — but this UI is useful for QA, demos, and internal ops.
          </p>

          <form id="intakeForm">
            <div class="row">
              <label>
                User ID
                <input name="user_id" required placeholder="u_123" autocomplete="off"/>
              </label>
              <label>
                Event Type
                <select name="event" required>
                  <option value="feedback">feedback</option>
                  <option value="bug_report">bug_report</option>
                  <option value="signup_intent">signup_intent</option>
                  <option value="support_ticket">support_ticket</option>
                </select>
              </label>
            </div>

            <label>
              Message
              <textarea name="message" required placeholder="Tell us what happened…"></textarea>
            </label>

            <div class="row">
              <label>
                Callback URL (optional)
                <input name="callback_url" placeholder="https://user.example.com/webhook" inputmode="url" autocomplete="off"/>
              </label>
              <label>
                Shared Token (demo)
                <input name="token" placeholder="APP_SHARED_TOKEN" autocomplete="off"/>
              </label>
            </div>

            <div class="actions">
              <button class="btn primary" type="submit">Submit → Datalake</button>
              <button class="btn ghost" type="button" id="fillDemo">Fill demo</button>
              <button class="btn danger" type="button" id="clearLog">Clear local UI log</button>
            </div>

            <div class="status" aria-live="polite" aria-atomic="true">
              <div class="badge warn" id="uiStatus"><span class="led"></span><span>Ready. Not connected.</span></div>
              <div class="badge" id="latency"><span class="led"></span><span>Latency: —</span></div>
            </div>

            <div class="meta">
              <div>Frontend will POST JSON with these fields:</div>
              <div>
                <code>user_id</code> <code>event</code> <code>message</code> <code>callback_url</code> <code>token</code>
              </div>
              <div>
                Server enriches payload with: <code>request_id</code> <code>received_at</code> <code>ip_hash</code> <code>ua</code>
              </div>
            </div>
          </form>
        </div>
      </section>

      <aside class="card reveal" aria-label="Local activity feed">
        <div class="inner">
          <h2>Activity Feed</h2>
          <p>
            UI-only log of submissions and callback tests. Your PHP endpoints will also append JSONL to <code>/storage</code>.
          </p>

          <div class="actions" style="margin-top:0">
            <button class="btn ghost" type="button" id="testCallback">Simulate callback → /api/callback.php</button>
            <button class="btn ghost" type="button" id="copyPayload">Copy last payload</button>
          </div>

          <div class="feed" id="feed" aria-label="Events feed"></div>
        </div>
      </aside>
    </section>
  </main>

  <footer>
    <div>© <span id="year"></span> DROPPIPE — PHP intake starter for datalake pipelines.</div>
    <div class="links">
      <a href="#php-intake" id="openIntake">intake.php</a>
      <a href="#php-callback" id="openCallback">callback.php</a>
      <a href="#ops" id="openOps">ops notes</a>
    </div>
  </footer>

  <script>
    // Staggered reveal on scroll
    const io = new IntersectionObserver((entries)=>{
      for(const e of entries){
        if(e.isIntersecting){
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    }, {threshold: .12});

    document.querySelectorAll('.reveal').forEach((el, idx)=>{
      el.style.transitionDelay = (idx * 80) + 'ms';
      io.observe(el);
    });

    // UI helpers
    const $ = (s)=>document.querySelector(s);
    const feed = $('#feed');
    const uiStatus = $('#uiStatus');
    const latencyBadge = $('#latency');
    const form = $('#intakeForm');

    let lastPayload = null;

    function nowTime(){
      const d = new Date();
      return d.toLocaleString(undefined, {year:'numeric', month:'short', day:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit'});
    }

    function addItem({title, body, pills=[]}){
      const el = document.createElement('div');
      el.className = 'item';
      el.innerHTML = `
        <div class="top">
          <div class="name">${title}</div>
          <div class="time">${nowTime()}</div>
        </div>
        <div class="body">${body}</div>
        <div class="pillrow">
          ${pills.map(p=>`<span class="pill ${p.variant||''}">${p.label}</span>`).join('')}
        </div>
      `;
      feed.prepend(el);
    }

    function setStatus(kind, text){
      uiStatus.className = 'badge ' + kind;
      uiStatus.innerHTML = `<span class="led"></span><span>${text}</span>`;
    }
    function setLatency(ms){
      latencyBadge.className = 'badge ' + (ms < 350 ? 'good' : ms < 900 ? 'warn' : 'bad');
      latencyBadge.innerHTML = `<span class="led"></span><span>Latency: ${ms}ms</span>`;
    }

    $('#fillDemo').addEventListener('click', ()=>{
      form.user_id.value = 'u_' + Math.floor(Math.random()*900+100);
      form.event.value = ['feedback','bug_report','signup_intent','support_ticket'][Math.floor(Math.random()*4)];
      form.message.value = [
        'Search results feel off for long queries.',
        'Checkout fails on step 2 with a blank screen.',
        'I love the new layout — add export please.',
        'Login is slow on mobile networks.'
      ][Math.floor(Math.random()*4)];
      form.callback_url.value = 'https://user.example.com/webhook';
      form.token.value = 'APP_SHARED_TOKEN';
      addItem({
        title: 'Draft filled',
        body: 'Demo values inserted into the form.',
        pills: [{label:'ui', variant:'ice'}]
      });
      setStatus('warn','Draft ready. Submit when ready.');
    });

    $('#clearLog').addEventListener('click', ()=>{
      feed.innerHTML = '';
      lastPayload = null;
      setStatus('warn','UI log cleared.');
      latencyBadge.className = 'badge';
      latencyBadge.innerHTML = `<span class="led"></span><span>Latency: —</span>`;
    });

    form.addEventListener('submit', async (e)=>{
      e.preventDefault();

      const payload = {
        user_id: form.user_id.value.trim(),
        event: form.event.value,
        message: form.message.value.trim(),
        callback_url: form.callback_url.value.trim() || null,
        token: form.token.value.trim()
      };
      lastPayload = payload;

      const t0 = performance.now();
      setStatus('warn','Sending…');

      try{
        const res = await fetch('/api/intake.php', {
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(payload)
        });
        const t1 = performance.now();
        setLatency(Math.max(1, Math.round(t1 - t0)));

        const data = await res.json().catch(()=>({ok:false, error:'Invalid JSON response'}));
        if(!res.ok || !data.ok){
          addItem({
            title: 'Intake failed',
            body: `<b>Server said:</b> ${escapeHtml(data.error || ('HTTP ' + res.status))}`,
            pills: [{label:'intake', variant:'hot'},{label:'error', variant:''}]
          });
          setStatus('bad','Failed. Check token / server logs.');
          return;
        }

        addItem({
          title: 'Submitted to datalake',
          body: `<b>request_id:</b> ${escapeHtml(data.request_id)}<br/><b>datalake:</b> ${escapeHtml(data.datalake_status)}`,
          pills: [
            {label:'intake', variant:'acid'},
            {label:'forwarded', variant:'ice'}
          ]
        });
        setStatus('good','Accepted. Forwarded to datalake.');
      }catch(err){
        const t1 = performance.now();
        setLatency(Math.max(1, Math.round(t1 - t0)));
        addItem({
          title: 'Network error',
          body: escapeHtml(String(err)),
          pills: [{label:'fetch', variant:'hot'}]
        });
        setStatus('bad','Network error. Is /api/intake.php deployed?');
      }
    });

    $('#testCallback').addEventListener('click', async ()=>{
      const simulated = {
        user_id: (lastPayload && lastPayload.user_id) ? lastPayload.user_id : 'u_123',
        request_id: 'req_sim_' + Math.random().toString(16).slice(2),
        status: 'processed',
        detail: 'Simulated callback from datalake processor.',
        // For real calls, callback.php expects HMAC signature header.
        // This UI test hits callback.php in "dev mode" if APP_SHARED_TOKEN is provided as query param.
      };

      const url = '/api/callback.php?dev_token=' + encodeURIComponent(form.token.value.trim() || '');
      const t0 = performance.now();
      setStatus('warn','Simulating callback…');

      try{
        const res = await fetch(url, {
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(simulated)
        });
        const t1 = performance.now();
        setLatency(Math.max(1, Math.round(t1 - t0)));

        const data = await res.json().catch(()=>({ok:false, error:'Invalid JSON response'}));
        if(!res.ok || !data.ok){
          addItem({
            title: 'Callback rejected',
            body: `<b>Server said:</b> ${escapeHtml(data.error || ('HTTP ' + res.status))}`,
            pills: [{label:'callback', variant:'hot'},{label:'error', variant:''}]
          });
          setStatus('bad','Callback rejected. Configure HMAC / dev token.');
          return;
        }

        addItem({
          title: 'Callback accepted',
          body: `<b>user_id:</b> ${escapeHtml(simulated.user_id)}<br/><b>status:</b> ${escapeHtml(simulated.status)}`,
          pills: [{label:'callback', variant:'ice'},{label:'ok', variant:'acid'}]
        });
        setStatus('good','Callback stored.');
      }catch(err){
        addItem({
          title: 'Callback network error',
          body: escapeHtml(String(err)),
          pills: [{label:'callback', variant:'hot'}]
        });
        setStatus('bad','Callback network error. Is /api/callback.php deployed?');
      }
    });

    $('#copyPayload').addEventListener('click', async ()=>{
      if(!lastPayload){
        addItem({title:'Nothing to copy', body:'Submit an intake event first.', pills:[{label:'ui', variant:'ice'}]});
        return;
      }
      const text = JSON.stringify(lastPayload, null, 2);
      try{
        await navigator.clipboard.writeText(text);
        addItem({title:'Copied', body:'Last payload copied to clipboard.', pills:[{label:'clipboard', variant:'acid'}]});
      }catch{
        addItem({title:'Copy failed', body:'Clipboard permission denied.', pills:[{label:'clipboard', variant:'hot'}]});
      }
    });

    // Footer links open modal-like overlays (lightweight)
    function overlay(title, content){
      const wrap = document.createElement('div');
      wrap.setAttribute('role','dialog');
      wrap.setAttribute('aria-modal','true');
      wrap.style.cssText = `
        position: fixed; inset: 0; z-index: 60;
        display:grid; place-items:center;
        background: rgba(0,0,0,.62);
        padding: 22px;
      `;
      const card = document.createElement('div');
      card.className = 'card';
      card.style.maxWidth = '980px';
      card.style.width = 'min(980px, calc(100vw - 28px))';
      card.innerHTML = `
        <div class="inner">
          <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px">
            <div>
              <div class="kicker"><span class="dot"></span><span>${title}</span></div>
              <div style="height:8px"></div>
            </div>
            <button class="btn ghost" type="button" aria-label="Close overlay">Close</button>
          </div>
          <div style="margin-top:6px; color: var(--muted); font-size: 13px; line-height: 1.75;">
            ${content}
          </div>
        </div>
      `;
      wrap.appendChild(card);
      document.body.appendChild(wrap);

      const close = ()=>wrap.remove();
      card.querySelector('button').addEventListener('click', close);
      wrap.addEventListener('click', (e)=>{ if(e.target === wrap) close(); });
      window.addEventListener('keydown', function esc(ev){
        if(ev.key === 'Escape'){ close(); window.removeEventListener('keydown', esc); }
      });
    }

    function escapeHtml(str){
      return String(str).replace(/[&<>"']/g, (m)=>({
        '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
      }[m]));
    }

    $('#openIntake').addEventListener('click', (e)=>{
      e.preventDefault();
      overlay('api/intake.php (production-ready starter)', `
        <p>Drop this file at <code>/api/intake.php</code>. It:</p>
        <ul>
          <li>Validates JSON input</li>
          <li>Verifies <code>APP_SHARED_TOKEN</code></li>
          <li>Enriches event metadata</li>
          <li>Appends a JSONL record to <code>/storage/events.jsonl</code></li>
          <li>Forwards the payload to your datalake ingest URL with HMAC signature</li>
        </ul>
        <p><b>File:</b></p>
<pre><code>${escapeHtml(`<?php
declare(strict_types=1);

/**
 * DROPPIPE - Intake Endpoint
 * POST /api/intake.php
 *
 * Env:
 *  - DATALAKE_INGEST_URL (required)
 *  - DATALAKE_HMAC_SECRET (required)
 *  - APP_SHARED_TOKEN (required)
 *
 * Storage:
 *  - ../storage/events.jsonl
 *
 * Notes:
 *  - Uses JSONL append for durability (swap for S3, Kafka, PubSub, etc.)
 *  - HMAC signature: X-DL-Signature = hex(hmac_sha256(body, secret))
 */

header('Content-Type: application/json; charset=utf-8');

function envOrFail(string $key): string {
  $v = getenv($key);
  if ($v === false || trim($v) === '') {
    http_response_code(500);
    echo json_encode(['ok'=>false,'error'=>"Missing env: $key"]);
    exit;
  }
  return $v;
}

function readJsonBody(): array {
  $raw = file_get_contents('php://input');
  if ($raw === false) $raw = '';
  $data = json_decode($raw, true);
  if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok'=>false,'error'=>'Invalid JSON body']);
    exit;
  }
  return [$raw, $data];
}

function safeMkdir(string $dir): void {
  if (!is_dir($dir)) {
    @mkdir($dir, 0775, true);
  }
}

function ipHash(?string $ip): string {
  if (!$ip) return 'na';
  // Avoid storing raw IPs; still provides dedupe-ish signal
  return hash('sha256', $ip);
}

function requestId(): string {
  return 'req_' . bin2hex(random_bytes(16));
}

function jsonlAppend(string $path, array $record): void {
  $line = json_encode($record, JSON_UNESCAPED_SLASHES) . PHP_EOL;
  $fp = fopen($path, 'ab');
  if (!$fp) throw new RuntimeException('Unable to open storage file');
  try {
    if (!flock($fp, LOCK_EX)) throw new RuntimeException('Unable to lock storage file');
    fwrite($fp, $line);
    fflush($fp);
    flock($fp, LOCK_UN);
  } finally {
    fclose($fp);
  }
}

function httpPostJson(string $url, string $jsonBody, array $headers): array {
  $ch = curl_init($url);
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_POSTFIELDS => $jsonBody,
    CURLOPT_TIMEOUT => 8,
    CURLOPT_CONNECTTIMEOUT => 3,
  ]);
  $respBody = curl_exec($ch);
  $err = curl_error($ch);
  $code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  return [$code, $respBody, $err];
}

// --- main ---
[$raw, $in] = readJsonBody();

$token = (string)($in['token'] ?? '');
$appToken = envOrFail('APP_SHARED_TOKEN');
if (!hash_equals($appToken, $token)) {
  http_response_code(401);
  echo json_encode(['ok'=>false,'error'=>'Unauthorized']);
  exit;
}

$userId = trim((string)($in['user_id'] ?? ''));
$event  = trim((string)($in['event'] ?? ''));
$msg    = trim((string)($in['message'] ?? ''));
$cbUrl  = trim((string)($in['callback_url'] ?? ''));

if ($userId === '' || $event === '' || $msg === '') {
  http_response_code(422);
  echo json_encode(['ok'=>false,'error'=>'Missing required fields: user_id, event, message']);
  exit;
}

$reqId = requestId();
$receivedAt = (new DateTimeImmutable('now', new DateTimeZone('UTC')))->format(DateTimeInterface::ATOM);

$record = [
  'request_id'   => $reqId,
  'received_at'  => $receivedAt,
  'user_id'      => $userId,
  'event'        => $event,
  'message'      => $msg,
  'callback_url' => ($cbUrl !== '' ? $cbUrl : null),
  'meta' => [
    'ua'      => substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 300),
    'ip_hash' => ipHash($_SERVER['REMOTE_ADDR'] ?? null),
    'origin'  => (string)($_SERVER['HTTP_ORIGIN'] ?? ''),
    'host'    => (string)($_SERVER['HTTP_HOST'] ?? ''),
  ],
];

$storageDir = dirname(__DIR__) . '/storage';
safeMkdir($storageDir);

try {
  jsonlAppend($storageDir . '/events.jsonl', $record);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['ok'=>false,'error'=>'Failed to write local event log']);
  exit;
}

// Forward to datalake
$dlUrl = envOrFail('DATALAKE_INGEST_URL');
$secret = envOrFail('DATALAKE_HMAC_SECRET');

// Forward only what the lake needs (keep it consistent)
$forward = [
  'request_id'  => $record['request_id'],
  'received_at' => $record['received_at'],
  'user_id'     => $record['user_id'],
  'event'       => $record['event'],
  'message'     => $record['message'],
  'callback_url'=> $record['callback_url'],
  'meta'        => $record['meta'],
];

$body = json_encode($forward, JSON_UNESCAPED_SLASHES);
$sig  = hash_hmac('sha256', $body, $secret);

[$code, $respBody, $err] = httpPostJson($dlUrl, $body, [
  'Content-Type: application/json',
  'X-DL-Signature: ' . $sig,
  'X-Request-Id: ' . $reqId,
]);

// We accept locally even if datalake is temporarily down (at-least-once strategy)
$datalakeStatus = ($code >= 200 && $code < 300) ? 'ok' : ('failed_http_' . $code);
if ($err) $datalakeStatus .= '_curl';

echo json_encode([
  'ok' => true,
  'request_id' => $reqId,
  'datalake_status' => $datalakeStatus
]);`))}</code></pre>
      `);
    });

    $('#openCallback').addEventListener('click', (e)=>{
      e.preventDefault();
      overlay('api/callback.php (datalake → your app)', `
        <p>Drop this file at <code>/api/callback.php</code>. It:</p>
        <ul>
          <li>Verifies HMAC signature (<code>X-DL-Signature</code>)</li>
          <li>Appends callback payloads to <code>/storage/callbacks.jsonl</code></li>
          <li>Optionally triggers user webhooks (if you store them / map users)</li>
        </ul>
        <p><b>File:</b></p>
<pre><code>${escapeHtml(`<?php
declare(strict_types=1);

/**
 * DROPPIPE - Callback Endpoint
 * POST /api/callback.php
 *
 * Datalake calls this endpoint to notify your app that an event was processed.
 * Verifies HMAC signature: X-DL-Signature = hex(hmac_sha256(rawBody, secret)).
 *
 * Dev mode:
 *  - If ?dev_token=APP_SHARED_TOKEN matches env APP_SHARED_TOKEN,
 *    signature verification is bypassed for local testing only.
 */

header('Content-Type: application/json; charset=utf-8');

function envOrFail(string $key): string {
  $v = getenv($key);
  if ($v === false || trim($v) === '') {
    http_response_code(500);
    echo json_encode(['ok'=>false,'error'=>"Missing env: $key"]);
    exit;
  }
  return $v;
}

function safeMkdir(string $dir): void {
  if (!is_dir($dir)) {
    @mkdir($dir, 0775, true);
  }
}

function jsonlAppend(string $path, array $record): void {
  $line = json_encode($record, JSON_UNESCAPED_SLASHES) . PHP_EOL;
  $fp = fopen($path, 'ab');
  if (!$fp) throw new RuntimeException('Unable to open storage file');
  try {
    if (!flock($fp, LOCK_EX)) throw new RuntimeException('Unable to lock storage file');
    fwrite($fp, $line);
    fflush($fp);
    flock($fp, LOCK_UN);
  } finally {
    fclose($fp);
  }
}

$raw = file_get_contents('php://input');
if ($raw === false) $raw = '';

$devToken = (string)($_GET['dev_token'] ?? '');
$appToken = getenv('APP_SHARED_TOKEN') ?: '';

$devBypass = ($devToken !== '' && $appToken !== '' && hash_equals($appToken, $devToken));

if (!$devBypass) {
  $secret = envOrFail('DATALAKE_HMAC_SECRET');
  $sig = (string)($_SERVER['HTTP_X_DL_SIGNATURE'] ?? '');
  $calc = hash_hmac('sha256', $raw, $secret);

  if ($sig === '' || !hash_equals($calc, $sig)) {
    http_response_code(401);
    echo json_encode(['ok'=>false,'error'=>'Invalid signature']);
    exit;
  }
}

$data = json_decode($raw, true);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok'=>false,'error'=>'Invalid JSON']);
  exit;
}

// Minimal validation
$userId = trim((string)($data['user_id'] ?? ''));
$reqId  = trim((string)($data['request_id'] ?? ''));
$status = trim((string)($data['status'] ?? ''));

if ($userId === '' || $reqId === '' || $status === '') {
  http_response_code(422);
  echo json_encode(['ok'=>false,'error'=>'Missing required fields: user_id, request_id, status']);
  exit;
}

$record = [
  'received_at' => (new DateTimeImmutable('now', new DateTimeZone('UTC')))->format(DateTimeInterface::ATOM),
  'callback' => $data,
  'meta' => [
    'ip' => (string)($_SERVER['REMOTE_ADDR'] ?? ''),
    'ua' => substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 300),
  ],
];

$storageDir = dirname(__DIR__) . '/storage';
safeMkdir($storageDir);

try {
  jsonlAppend($storageDir . '/callbacks.jsonl', $record);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['ok'=>false,'error'=>'Failed to write callback log']);
  exit;
}

/**
 * Optional: call your user's webhook here.
 * - You can map user_id → webhook URL stored in your user DB
 * - Or store callback_url in the original event and look it up by request_id
 *
 * Keep it async in production (queue), and retry with backoff.
 */

echo json_encode(['ok'=>true]);`))}</code></pre>
      `);
    });

    $('#openOps').addEventListener('click', (e)=>{
      e.preventDefault();
      overlay('Ops notes (practical)', `
        <ul>
          <li><b>At-least-once delivery:</b> intake writes JSONL locally even if the datalake is down. A cron job can re-play failed forwards.</li>
          <li><b>Protect tokens:</b> do not ship <code>APP_SHARED_TOKEN</code> to browsers in production. Use server-to-server calls.</li>
          <li><b>Rotate HMAC:</b> version your signature header (e.g. <code>X-DL-Signature-V1</code>) to support rotation.</li>
          <li><b>PII:</b> this starter hashes IPs; extend masking on other fields as needed.</li>
          <li><b>Rate limiting:</b> add per-IP/per-user throttling (nginx, redis, or a WAF) if exposed publicly.</li>
        </ul>
      `);
    });

    document.getElementById('year').textContent = new Date().getFullYear();
    // Initial seed feed
    addItem({
      title: 'Bootstrap',
      body: 'UI loaded. Deploy /api/intake.php and /api/callback.php to make it live.',
      pills: [{label:'ui', variant:'ice'},{label:'starter', variant:'acid'}]
    });
  </script>
</body>
</html>
