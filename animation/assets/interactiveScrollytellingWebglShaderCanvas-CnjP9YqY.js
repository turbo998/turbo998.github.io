import"./modulepreload-polyfill-B5Qt9EMX.js";const x={shared_scissor_webgl_canvas_lock:{id:"shared_scissor_webgl_canvas_lock",label:"Single Fixed WebGL2 Canvas + gl.scissor DOM Slot Virtualization + IntersectionObserver LRU (c_scroll = c_0/(1+u), Lock = 1.0000×)",labelZh:"全页单一共享 WebGL2 画布 + gl.scissor 多视口虚拟切片 + IntersectionObserver 视口懒激活（单屏成本 c_0/(1+u)，恒锁 1.0000×）",subtitle:"Mounts exactly 1 shared WebGL2 context across all 17 scroll chapters, slices viewports via gl.scissor() into DOM placeholder rects, and sleeps offscreen scenes for 0 context-loss crashes at 60fps.",subtitleZh:"全页仅创建唯一 1 个固定全屏 WebGL2 上下文（Context Count == 1），通过 gl.scissor/viewport 将 17 个章节的 3D 镜头精准裁剪映射至各自 DOM 占位框，配合视口外 0ms 休眠彻底杜绝浏览器 8/16 上下文上限崩溃，全 17 章恒锁 1.0000×。",useSharedScissorWebglCanvas:!0,defaultStationIndex:16,badge:"1 SHARED WEBGL2 CONTEXT LOCKED · 1.0000× (0/17 CONTEXT LOSS)",badgeZh:"单共享 WebGL2 锁死 · 1.0000×（0/17 站上下文丢失或掉帧）",description:"Apple/Linear/Stripe-grade product launch scrollytelling pages render 17+ interactive 3D chapters on a single WebGL2 context without hitting iOS/Chrome hardware context limits.",descriptionZh:"苹果级旗舰产品发布长图官网通过“单共享 WebGL2 画布 + gl.scissor 虚拟视口切片”突破移动端 8 个 / 桌面端 16 个 WebGL Context 的死刑上限。"},naive_multi_canvas_context_exhaustion:{id:"naive_multi_canvas_context_exhaustion",label:"Naive Per-Section <canvas> & Independent WebGLRenderer Loop (Context-Loss Crash & Jank Overrun = 1 + u up to 2.0000×)",labelZh:"朴素每屏新建独立 <canvas> 与 WebGLRenderer（突破 8/16 上下文上限导致前半页白屏崩溃且主线程掉帧超支达 2.0000×）",subtitle:"Instantiates a separate <canvas> and requestAnimationFrame loop for every scroll section, exhausting iOS Safari (8) and Chrome (16) WebGL context limits and inflating GPU/rework cost by 2.0000× at Chapter 16.",subtitleZh:"在长页面的每个 3D 展示模块各自 new 一个 <canvas> 和 WebGLRenderer，滑到第 9 屏（iOS）或第 17 屏（Chrome）时直接触发浏览器“Too many active WebGL contexts”强制销毁前面画布导致回滚白屏，第 16 章返工与性能开销翻倍至 2.0000×。",useSharedScissorWebglCanvas:!1,defaultStationIndex:16,badge:"WEBGL CONTEXT LOSS & JANK · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"上下文耗尽白屏与掉帧 · 最高 2.0000×（16/17 站违背）",description:"Spawning 17 separate WebGL contexts on one page guarantees WEBGL_lose_context eviction on mobile and desktop browsers, doubling engineering rework across 16/17 chapters.",descriptionZh:"在同一页面实例化 17 个独立 WebGL 上下文必然触发移动端与桌面端浏览器的上下文强制回收，在 16/17 个章节引发回滚白屏与卡顿。"}},v=17,I=["Chapter 0: Above-the-Fold Hero 3D Product Stage (Baseline)","Chapter 1: Single Fixed Canvas Overlay + DOM Slot Rect Tracker","Chapter 2: gl.enable(SCISSOR_TEST) Multi-Viewport Sub-Rect Slice","Chapter 3: IntersectionObserver 1-Viewport Pre-Warm & Sleep Gate","Chapter 4: Critically Damped Spring Scroll-Progress Interpolator","Chapter 5: Exploded CAD Chassis 120-Keyframe Scroll Scrubbing","Chapter 6: Silicon Die Ray-Marched Shader Callout Zoom","Chapter 7: Thermal Airflow Anisotropic Particle Streamline Pass","Chapter 8: iOS Safari 8-Context Ceiling Bypass (Context Count == 1)","Chapter 9: OffscreenCanvas Worker Thread KTX2/AVIF Pre-Decode","Chapter 10: Sticky Pin-Spacer Zero-Reflow CSS Transform Sync","Chapter 11: Dynamic Color-Finish SKU Swatch Material Cross-Fade","Chapter 12: Acoustic Wavefront cutaway SVG + WebGL2 Hybrid HUD","Chapter 13: LRU GPU Texture & Geometry Disposal Beyond ±2 Screens","Chapter 14: High-DPI DevicePixelRatio Adaptive Resolution Clamp","Chapter 15: prefers-reduced-motion Static Key-Pose Fallback","Chapter 16: Chrome 16-Context Limit Bypass: 17-Chapter Launch Page (0.50 c_0)"];function q(e){const t=1+Math.max(0,e),a=1/t;return{multiCanvasThrashAmplification:t,sharedScissorAmortizedUnitCost:a}}function H(e,o=64){const a=1/(1+Math.max(0,e)),n=Math.max(2,o%2===0?o:o+1),r=1/n;let s=2*a;for(let i=1;i<n;i++){const l=i*r,g=i%2===1?4:2;s+=g*(2*a*l)}return r/3*s}function z(e,o){const t=Math.max(0,Math.min(v-1,e)),a=t/(v-1),n=q(a),r=H(a,64),s=1+a,i=o?1:s;return{index:t,scrollChapterDensityU:a,multiCanvasThrashAmplification:n.multiCanvasThrashAmplification,sharedScissorAmortizedUnitCost:n.sharedScissorAmortizedUnitCost,quadratureScissorViewportCost:r,scrollFrameBudgetRatio:i,naiveMultiCanvasOverrunRatio:s,scrollytellingChapterLabel:I[t]??I[0],isContextLossViolation:i>1.0001}}function m(e,o){const t=x[e],a=[];let n=0,r=0;for(let i=0;i<v;i++){const l=z(i,t.useSharedScissorWebglCanvas);a.push(l),l.isContextLossViolation&&n++;const g=Math.abs(l.sharedScissorAmortizedUnitCost-l.quadratureScissorViewportCost);g>r&&(r=g)}const s=o!==void 0?Math.max(0,Math.min(v-1,o)):t.defaultStationIndex;return{presetId:e,useSharedScissorWebglCanvas:t.useSharedScissorWebglCanvas,stationCount:v,selectedStation:a[s],stations:a,station4Ratio:a[4].scrollFrameBudgetRatio,station8Ratio:a[8].scrollFrameBudgetRatio,station12Ratio:a[12].scrollFrameBudgetRatio,station16Ratio:a[16].scrollFrameBudgetRatio,violatedCount:n,maxQuadratureError:r,verdict:n===0?"SHARED_SCISSOR_WEBGL_CONTEXT_LOCKED":"NAIVE_MULTI_CANVAS_CONTEXT_CRASH_OVERRUN"}}function Z(e){const o=[];o.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Apple-Style Product Scrollytelling: Single Shared WebGL2 Scissor Orchestrator Plinth"}),o.push({id:"scissor-rail-front",kind:"shared_scissor_viewport_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"1 Shared WebGL2 Context + gl.scissor() Multi-Viewport Virtualization Bus (1.0000×)"}),o.push({id:"scissor-rail-back",kind:"shared_scissor_viewport_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"IntersectionObserver 1-Screen Pre-Warm + Offscreen LRU Sleep Bus"});for(const t of e.stations){const a=(t.index-8)*30,n=22*t.multiCanvasThrashAmplification,r=44*t.sharedScissorAmortizedUnitCost,s=36*t.scrollFrameBudgetRatio;o.push({id:`chapter-density-demand-column-${t.index}`,kind:"chapter_density_demand_column",stationIndex:t.index,x:a,y:n*.5-8,z:-56,w:14,h:n,d:14,tone:"amber",label:`Chapter ${t.index} Amplification S(u) = ${t.multiCanvasThrashAmplification.toFixed(4)}× (${t.scrollytellingChapterLabel})`}),o.push({id:`intersection-lru-slot-node-${t.index}`,kind:"intersection_lru_slot_node",stationIndex:t.index,x:a,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useSharedScissorWebglCanvas?"teal":"slate",label:`Chapter ${t.index} Amortized Scissor Cost c_scroll = ${t.sharedScissorAmortizedUnitCost.toFixed(4)}×`}),o.push({id:`scroll-frame-budget-gauge-${t.index}`,kind:"scroll_frame_budget_gauge",stationIndex:t.index,x:a,y:s*.5-8,z:56,w:Math.min(24,12*t.scrollFrameBudgetRatio),h:s,d:12,tone:t.isContextLossViolation?"crimson":"teal",label:`Chapter ${t.index} 60fps Frame & VRAM Budget Ratio = ${t.scrollFrameBudgetRatio.toFixed(4)}×`})}return o.push({id:"context-gate-left",kind:"single_webgl_context_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"DOM Slot getBoundingClientRect() -> gl.scissor() Projection Gate"}),o.push({id:"context-gate-right",kind:"single_webgl_context_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useSharedScissorWebglCanvas?"teal":"crimson",label:"Zero WEBGL_lose_context & 60fps Scroll Egress Gate"}),o.push({id:"loss-bar-top",kind:"zero_context_loss_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Scrollytelling Law: c_scroll(u) = c_0 / (1 + u) via 1 Shared WebGL2 Scissor Canvas"}),o.push({id:"loss-bar-front",kind:"zero_context_loss_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useSharedScissorWebglCanvas?"teal":"crimson",label:"iOS 8-Context & Chrome 16-Context Crash Immunity Lock Line (1.0000×)"}),o}const B=new URLSearchParams(window.location.search),A=B.get("preset"),K=B.get("theme")==="light"?"light":"dark";let c=A&&A in x?A:"shared_scissor_webgl_canvas_lock",d=x[c].defaultStationIndex,b=K;document.documentElement.setAttribute("data-theme",b);const X=document.querySelector("#app");X.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 246 · 256TH DEMO · APPLE-STYLE PRODUCT SCROLLYTELLING: SINGLE SHARED WEBGL2 SCISSOR CANVAS ORCHESTRATOR</span>
        <h1>Apple-Style Product Scrollytelling: Single Shared WebGL2 Scissor Canvas Orchestrator</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${b.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Scrollytelling WebGL Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="shared_scissor_webgl_canvas_lock"
      >
        Single Fixed WebGL2 Canvas + gl.scissor DOM Slot Virtualization + LRU (Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_multi_canvas_context_exhaustion"
      >
        Naive Per-Section &lt;canvas&gt; &amp; Multi-Renderer Loop (16-Context Crash &amp; Jank = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Scrollytelling WebGL Readouts">
      <article class="kpi-card">
        <span class="kpi-label">THRASH FACTOR S(u) / SCISSOR COST c_scroll</span>
        <strong id="kpi-scroll" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">60FPS FRAME &amp; VRAM BUDGET RATIO (C_active / C_scroll)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">CHAPTERS 4 / 8 / 16 BUDGET RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">S(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">WEBGL CONTEXT-LOSS &amp; JANK VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-CHAPTER SHARED WEBGL2 SCISSOR CANVAS &amp; VIEWPORT VIRTUALIZATION STAGE</span>
          <span id="solid-count-readout">58 solids · 17 scroll chapters</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Apple-Style Product Scrollytelling Single Shared WebGL2 Scissor Canvas Orchestrator"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Product Scrollytelling 3D Chapter &amp; Viewport Slot (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Chapter 16 (u = 1.000, c_scroll = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-CHAPTER SHARED SCISSOR CANVAS VS NAIVE MULTI-CANVAS LEDGER</span>
          <span>c_scroll = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Chap</th>
                <th>u</th>
                <th>S(u) = 1+u</th>
                <th>c_scroll</th>
                <th>Scissor Quad</th>
                <th>C / C_scroll</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Y=document.querySelector("#preset-subtitle"),W=document.querySelector("#preset-badge"),Q=document.querySelector("#kpi-scroll"),j=document.querySelector("#kpi-quad"),w=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),G=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),ot=document.querySelector("#solid-count-readout"),st=document.querySelector("#rig-svg"),T=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),D=document.querySelector("#station-tbody"),P=document.querySelector("#theme-toggle");function S(e,o,t){const a=(e-t*.55)*.88,n=-o+(e*.18+t*.42)*.55;return[a,n]}function it(e,o){return e==="teal"?o?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?o?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?o?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?o?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:o?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function nt(e,o,t,a,n,r,s,i,l,g,V){const p=a*.5,u=n*.5,h=r*.5,F=S(e+p,o-u,t-h),L=S(e+p,o-u,t+h),O=S(e-p,o-u,t+h),y=S(e-p,o+u,t-h),_=S(e+p,o+u,t-h),C=S(e+p,o+u,t+h),k=S(e-p,o+u,t+h),E=it(s,l),R=i?1.8:.7,$=i?"#ffffff":E.stroke,U=`${y[0].toFixed(1)},${y[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)}`,N=`${O[0].toFixed(1)},${O[1].toFixed(1)} ${L[0].toFixed(1)},${L[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)}`,M=`${L[0].toFixed(1)},${L[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${g}" data-solid-kind="${V}">
      <polygon points="${N}" fill="${E.left}" stroke="${$}" stroke-width="${R}" />
      <polygon points="${M}" fill="${E.right}" stroke="${$}" stroke-width="${R}" />
      <polygon points="${U}" fill="${E.top}" stroke="${$}" stroke-width="${R}" />
    </g>
  `}function f(e){const o=x[e.presetId],t=e.selectedStation,a=b==="dark";Y.textContent=o.subtitle,W.textContent=o.badge,W.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Q.textContent=`S(u) = ${t.multiCanvasThrashAmplification.toFixed(4)}× (c_scroll = ${t.sharedScissorAmortizedUnitCost.toFixed(4)}×)`,j.textContent=`Scissor Quad = ${t.quadratureScissorViewportCost.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,w.textContent=`${t.scrollFrameBudgetRatio.toFixed(4)}×`,w.className=`kpi-value ${t.isContextLossViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${t.scrollChapterDensityU.toFixed(4)} | ${t.scrollytellingChapterLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,G.textContent=`${e.violatedCount} / ${e.stationCount}`,G.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,T.value=String(t.index),at.textContent=`Chapter ${t.index} (u = ${t.scrollChapterDensityU.toFixed(3)}, c_scroll = ${t.sharedScissorAmortizedUnitCost.toFixed(3)}, Ratio = ${t.scrollFrameBudgetRatio.toFixed(4)}×)`;const n=Z(e);ot.textContent=`${n.length} solids · ${e.stationCount} scroll chapters`;const r=[...n].sort((s,i)=>s.z-i.z||s.y-i.y||s.x-i.x);st.innerHTML=r.map(s=>nt(s.x,s.y,s.z,s.w,s.h,s.d,s.tone,s.stationIndex===t.index,a,s.id,s.kind)).join(""),D.innerHTML=e.stations.map(s=>{const i=s.index===t.index?"row-selected":"",l=s.isContextLossViolation?"cell-fail":"cell-pass";return`
        <tr class="${i}" data-station-row="${s.index}">
          <td>#${s.index}</td>
          <td>${s.scrollChapterDensityU.toFixed(4)}</td>
          <td>${s.multiCanvasThrashAmplification.toFixed(4)}×</td>
          <td>${s.sharedScissorAmortizedUnitCost.toFixed(4)}×</td>
          <td>${s.quadratureScissorViewportCost.toFixed(4)}×</td>
          <td class="${l}">${s.scrollFrameBudgetRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(s=>{const i=s.getAttribute("data-preset");s.classList.toggle("active",i===e.presetId)}),window.__SCROLLYTELLING_WEBGL_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-preset");o&&o in x&&(c=o,d=x[c].defaultStationIndex,f(m(c,d)))})});T.addEventListener("input",()=>{d=Number(T.value),f(m(c,d))});D.addEventListener("click",e=>{const o=e.target.closest("tr[data-station-row]");o&&(d=Number(o.getAttribute("data-station-row")),f(m(c,d)))});P.addEventListener("click",()=>{b=b==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",b),P.textContent=`Theme: ${b.toUpperCase()}`,f(m(c,d))});f(m(c,d));
