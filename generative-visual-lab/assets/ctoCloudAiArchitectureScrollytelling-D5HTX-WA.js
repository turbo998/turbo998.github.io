import"./modulepreload-polyfill-B5Qt9EMX.js";const f={declarative_svg_canvas_hybrid_scrollytelling_lock:{id:"declarative_svg_canvas_hybrid_scrollytelling_lock",label:"Layered Isometric SVG + Canvas/Rive State Sandbox (f_node = f_0/(1+u), 60fps Frame Lock = 1.0000×)",labelZh:"分层等轴测 SVG 矢量拓扑 + Canvas/Rive 状态机沙盘（单节点帧预算 f_0/(1+u)，60fps 帧耗时比恒锁 1.0000×）",subtitle:"Combines crisp HiDPI Isometric SVG architecture nodes with viewport-culled Canvas 2D / WAAPI packet flows and Rive micro-states, locking 60fps frame budget & FCP ratio at 1.0000× across all 17 CTO scrollytelling stages.",subtitleZh:"将“高清晰度等轴测 SVG 矢量架构拓扑（支持无损缩放、无障碍 ARIA 与点击下钻）”与“视口裁剪 Canvas 2D 数据流粒子 + Rive 状态机指示灯”结合，在全 17 个 CTO 架构叙事滚动阶段恒定锁死 60fps 帧预算比 1.0000×。",useHybridScrollytellingSandbox:!0,defaultStationIndex:16,badge:"60FPS SANDBOX LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"60fps 架构沙盘锁死 · 1.0000×（0/17 站掉帧超支）",description:"Executive CTO architecture sandboxes and product launch scrollytelling pages achieve sub-second First Contentful Paint and 60fps mobile smoothness by separating declarative SVG topology from GPU-composited packet animations.",descriptionZh:"面向 CTO 汇报的云与 AI 动态架构沙盘及品牌发布会一镜到底长图（Scrollytelling），通过声明式 SVG 拓扑层与 GPU 合成层分离，兼得矢量级文字清晰度、小于 50KB 首屏包体积与移动端 60fps 满帧体验。"},naive_unculled_dom_recreation_frame_overrun:{id:"naive_unculled_dom_recreation_frame_overrun",label:"Naive Unculled Full-DOM Layout Thrashing / Uninstanced 3D (Overrun = 1 + u up to 2.0000×)",labelZh:"朴素未裁剪全量 DOM 重排 / 重型未实例化 3D 场景（每次滚动强制同步重排，帧预算超支达 2.0000×）",subtitle:"Re-queries getBoundingClientRect() and mutates unculled DOM/WebGL nodes on every scroll event across all 17 architecture stages, inflating frame time by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× (30fps jank) at St 16.",subtitleZh:"在滚动监听中对未裁剪的全量架构节点反复触发同步 DOM 布局读取（Layout Thrashing）或加载数十兆未实例化 3D 网格，使主线程帧耗时在第 4 站超支 1.2500×、第 8 站超支 1.5000×、第 16 站翻倍超支至 2.0000× 并导致移动端严重卡顿。",useHybridScrollytellingSandbox:!1,defaultStationIndex:16,badge:"FRAME BUDGET OVERRUN · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"主线程掉帧超支 · 最高 2.0000×（16/17 站违背）",description:"Building interactive cloud architecture diagrams with unculled DOM nodes or heavy uninstanced Three.js meshes causes layout thrashing and mobile WebGL context loss across 16/17 scrollytelling stages.",descriptionZh:"直接用成百上千个未裁剪的 HTML/DOM 盒子或重型 Three.js 场景堆砌云架构大屏，会在多阶段滚动叙事中引发主线程阻塞与移动端内存崩溃。"}},y=17,F=["Stage 0: API Gateway Ingress (Isometric SVG Vector Lock)","Stage 1: WAF & Zero-Trust Auth (SVG + CSS Transform)","Stage 2: Semantic Prompt Cache (SVG + Rive Hit Gauge)","Stage 3: Hybrid Vector + Graph RAG (SVG + WAAPI Flow)","Stage 4: Multi-Agent Planner (SVG + Canvas 2D Packets)","Stage 5: Tool-Use Sandbox Pool (Culled SVG Subtree)","Stage 6: Multi-Model Router Bus (SVG + Canvas Stream)","Stage 7: Token-Bucket Queue (Rive State Machine LED)","Stage 8: Primary Region GPU Cluster (Instanced Iso SVG)","Stage 9: Cross-Region Active-Active Failover Sandbox","Stage 10: KV-Cache Prefix Disaggregation Telemetry","Stage 11: Guardrails & PII Redaction Audit Pipeline","Stage 12: C2PA Provenance & Watermark Signing Node","Stage 13: FinOps Cost Attribution Live Readout HUD","Stage 14: OpenTelemetry Trace Waterfall Scrollytelling","Stage 15: Multi-Cloud Edge CDN Egress Topology","Stage 16: Full CTO Executive Cloud+AI Sandbox (1.0000×)"];function q(e){const t=1+Math.max(0,e),a=1/t;return{domLayoutAmplification:t,hybridNormalizedNodeBudget:a}}function z(e,o=64){const a=1/(1+Math.max(0,e)),l=Math.max(2,o%2===0?o:o+1),s=1/l;let i=2*a;for(let n=1;n<l;n++){const d=n*s,h=n%2===1?4:2;i+=h*(2*a*d)}return s/3*i}function Y(e,o){const t=Math.max(0,Math.min(y-1,e)),a=t/(y-1),l=q(a),s=z(a,64),i=1+a,n=o?1:i;return{index:t,topologyComplexityU:a,domLayoutAmplification:l.domLayoutAmplification,hybridNormalizedNodeBudget:l.hybridNormalizedNodeBudget,quadratureScrollBudget:s,frameBudgetOverrunRatio:n,naiveDomOverrunRatio:i,stackArchitectureStageLabel:F[t]??F[0],isFrameBudgetViolation:n>1.0001}}function v(e,o){const t=f[e],a=[];let l=0,s=0;for(let n=0;n<y;n++){const d=Y(n,t.useHybridScrollytellingSandbox);a.push(d),d.isFrameBudgetViolation&&l++;const h=Math.abs(d.hybridNormalizedNodeBudget-d.quadratureScrollBudget);h>s&&(s=h)}const i=o!==void 0?Math.max(0,Math.min(y-1,o)):t.defaultStationIndex;return{presetId:e,useHybridScrollytellingSandbox:t.useHybridScrollytellingSandbox,stationCount:y,selectedStation:a[i],stations:a,station4Ratio:a[4].frameBudgetOverrunRatio,station8Ratio:a[8].frameBudgetOverrunRatio,station12Ratio:a[12].frameBudgetOverrunRatio,station16Ratio:a[16].frameBudgetOverrunRatio,violatedCount:l,maxQuadratureError:s,verdict:l===0?"HYBRID_SCROLLYTELLING_60FPS_LOCKED":"NAIVE_UNCULLED_DOM_FRAME_OVERRUN"}}function W(e){const o=[];o.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"CTO Executive Cloud & AI Architecture Scrollytelling Stage Plinth"}),o.push({id:"scrollytelling-rail-front",kind:"scrollytelling_bus_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Viewport-Culled SVG + Canvas 60fps Telemetry Bus (T_active / T_hybrid = 1.0000×)"}),o.push({id:"scrollytelling-rail-back",kind:"scrollytelling_bus_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"17-Stage Cloud & AI Topology Spine (Gateway -> RAG -> Agents -> Multi-Region GPU)"});for(const t of e.stations){const a=(t.index-8)*30,l=22*t.domLayoutAmplification,s=44*t.hybridNormalizedNodeBudget,i=36*t.frameBudgetOverrunRatio;o.push({id:`topology-density-column-${t.index}`,kind:"topology_density_column",stationIndex:t.index,x:a,y:l*.5-8,z:-56,w:14,h:l,d:14,tone:"amber",label:`Stage ${t.index} Topology Density D(u) = ${t.domLayoutAmplification.toFixed(4)}× (${t.stackArchitectureStageLabel})`}),o.push({id:`hybrid-svg-canvas-node-${t.index}`,kind:"hybrid_svg_canvas_node",stationIndex:t.index,x:a,y:s*.5-8,z:0,w:14,h:s,d:14,tone:e.useHybridScrollytellingSandbox?"teal":"slate",label:`Stage ${t.index} Per-Node Budget f_hybrid = ${t.hybridNormalizedNodeBudget.toFixed(4)}×`}),o.push({id:`frame-budget-gauge-${t.index}`,kind:"frame_budget_gauge",stationIndex:t.index,x:a,y:i*.5-8,z:56,w:Math.min(24,12*t.frameBudgetOverrunRatio),h:i,d:12,tone:t.isFrameBudgetViolation?"crimson":"teal",label:`Stage ${t.index} Frame-Time Ratio = ${t.frameBudgetOverrunRatio.toFixed(4)}×`})}return o.push({id:"stack-gate-left",kind:"stack_selector_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Layer 1: Crisp HiDPI Isometric SVG Topology & Accessible DOM Labels"}),o.push({id:"stack-gate-right",kind:"stack_selector_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useHybridScrollytellingSandbox?"teal":"crimson",label:"Layer 2: Culled Canvas 2D Packet Stream & Rive State-Machine Readout"}),o.push({id:"culling-bar-top",kind:"viewport_culling_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Scrollytelling Frame-Budget Law: f_node(u) = f_0 / (1 + u) via Viewport Culling"}),o.push({id:"culling-bar-front",kind:"viewport_culling_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useHybridScrollytellingSandbox?"teal":"crimson",label:"60fps (16.67ms) Executive Keynote & Mobile Scrollytelling Lock Line (1.0000×)"}),o}const V=new URLSearchParams(window.location.search),R=V.get("preset"),Z=V.get("theme")==="light"?"light":"dark";let r=R&&R in f?R:"declarative_svg_canvas_hybrid_scrollytelling_lock",c=f[r].defaultStationIndex,S=Z;document.documentElement.setAttribute("data-theme",S);const K=document.querySelector("#app");K.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ENTERPRISE AI SOLUTION ARCHITECTURE · CTO CLOUD & AI ARCHITECTURE SCROLLYTELLING SANDBOX & WEB VISUALIZATION STACK</span>
        <h1>CTO Cloud & AI Architecture Scrollytelling Sandbox</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${S.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Web Visualization Stack Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="declarative_svg_canvas_hybrid_scrollytelling_lock"
      >
        Layered Isometric SVG + Culled Canvas/Rive Sandbox (60fps Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_unculled_dom_recreation_frame_overrun"
      >
        Naive Unculled Full-DOM Layout Thrashing (Frame Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Scrollytelling Frame Budget Readouts">
      <article class="kpi-card">
        <span class="kpi-label">TOPOLOGY DENSITY D(u) / PER-NODE BUDGET f_hybrid</span>
        <strong id="kpi-sandbox" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">60FPS FRAME-BUDGET RATIO (T_active / T_hybrid)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">SCROLL STAGES 4 / 8 / 16 FRAME RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">D(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">FRAME-TIME JANK & LAYOUT THRASH VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STAGE CTO CLOUD & AI TOPOLOGY SCROLLYTELLING SANDBOX</span>
          <span id="solid-count-readout">58 solids · 17 architecture stages</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric CTO Cloud and AI Architecture Scrollytelling Sandbox"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect CTO Scrollytelling Topology Stage (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Stage 16 (u = 1.000, f_hybrid = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STAGE SVG VS CANVAS VS RIVE VS THREE.JS FRAME LEDGER</span>
          <span>f_hybrid = f_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Stg</th>
                <th>u</th>
                <th>D(u) = 1+u</th>
                <th>f_hybrid</th>
                <th>Scroll Quad</th>
                <th>T / T_hybrid</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Q=document.querySelector("#preset-subtitle"),B=document.querySelector("#preset-badge"),j=document.querySelector("#kpi-sandbox"),X=document.querySelector("#kpi-quad"),N=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),G=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),ot=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),L=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),P=document.querySelector("#station-tbody"),D=document.querySelector("#theme-toggle");function b(e,o,t){const a=(e-t*.55)*.88,l=-o+(e*.18+t*.42)*.55;return[a,l]}function nt(e,o){return e==="teal"?o?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?o?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?o?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?o?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:o?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function lt(e,o,t,a,l,s,i,n,d,h,M){const u=a*.5,g=l*.5,p=s*.5,$=b(e+u,o-g,t-p),C=b(e+u,o-g,t+p),I=b(e-u,o-g,t+p),O=b(e-u,o+g,t-p),k=b(e+u,o+g,t-p),x=b(e+u,o+g,t+p),_=b(e-u,o+g,t+p),T=nt(i,d),A=n?1.8:.7,E=n?"#ffffff":T.stroke,U=`${O[0].toFixed(1)},${O[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`,w=`${I[0].toFixed(1)},${I[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`,H=`${C[0].toFixed(1)},${C[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${h}" data-solid-kind="${M}">
      <polygon points="${w}" fill="${T.left}" stroke="${E}" stroke-width="${A}" />
      <polygon points="${H}" fill="${T.right}" stroke="${E}" stroke-width="${A}" />
      <polygon points="${U}" fill="${T.top}" stroke="${E}" stroke-width="${A}" />
    </g>
  `}function m(e){const o=f[e.presetId],t=e.selectedStation,a=S==="dark";Q.textContent=o.subtitle,B.textContent=o.badge,B.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,j.textContent=`D(u) = ${t.domLayoutAmplification.toFixed(4)}× (f_hybrid = ${t.hybridNormalizedNodeBudget.toFixed(4)}×)`,X.textContent=`Scroll Quad = ${t.quadratureScrollBudget.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,N.textContent=`${t.frameBudgetOverrunRatio.toFixed(4)}×`,N.className=`kpi-value ${t.isFrameBudgetViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${t.topologyComplexityU.toFixed(4)} | ${t.stackArchitectureStageLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,G.textContent=`${e.violatedCount} / ${e.stationCount}`,G.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,L.value=String(t.index),at.textContent=`Stage ${t.index} (u = ${t.topologyComplexityU.toFixed(3)}, f_hybrid = ${t.hybridNormalizedNodeBudget.toFixed(3)}, Ratio = ${t.frameBudgetOverrunRatio.toFixed(4)}×)`;const l=W(e);ot.textContent=`${l.length} solids · ${e.stationCount} architecture stages`;const s=[...l].sort((i,n)=>i.z-n.z||i.y-n.y||i.x-n.x);it.innerHTML=s.map(i=>lt(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,a,i.id,i.kind)).join(""),P.innerHTML=e.stations.map(i=>{const n=i.index===t.index?"row-selected":"",d=i.isFrameBudgetViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.topologyComplexityU.toFixed(4)}</td>
          <td>${i.domLayoutAmplification.toFixed(4)}×</td>
          <td>${i.hybridNormalizedNodeBudget.toFixed(4)}×</td>
          <td>${i.quadratureScrollBudget.toFixed(4)}×</td>
          <td class="${d}">${i.frameBudgetOverrunRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const n=i.getAttribute("data-preset");i.classList.toggle("active",n===e.presetId)}),window.__CTO_ARCHITECTURE_SCROLLYTELLING_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-preset");o&&o in f&&(r=o,c=f[r].defaultStationIndex,m(v(r,c)))})});L.addEventListener("input",()=>{c=Number(L.value),m(v(r,c))});P.addEventListener("click",e=>{const o=e.target.closest("tr[data-station-row]");o&&(c=Number(o.getAttribute("data-station-row")),m(v(r,c)))});D.addEventListener("click",()=>{S=S==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",S),D.textContent=`Theme: ${S.toUpperCase()}`,m(v(r,c))});m(v(r,c));
