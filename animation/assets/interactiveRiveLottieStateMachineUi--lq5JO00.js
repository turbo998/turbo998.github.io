import"./modulepreload-polyfill-B5Qt9EMX.js";const x={rive_state_machine_vector_blend_lock:{id:"rive_state_machine_vector_blend_lock",label:"Rive 48KB Vector Bone State Machine + 2D Blend Tree + Live Input Binding (b_rive = b_0/(1+u), Efficiency = 1.0000×)",labelZh:"Rive 48KB 矢量骨骼状态机 + 2D 混合树（Blend Tree）+ 实时数据绑定（单态成本 b_0/(1+u)，流畅与体积比恒锁 1.0000×）",subtitle:"Compiles all 17 interactive states, 2D pointer-tracking IK, and audio-amplitude lip-sync into a single 48 KB .riv binary with C++/WASM 60fps cross-fade blending and 0ms interruption jump-cuts.",subtitleZh:"将全部 17 种交互状态（待机、思考、说话、打断、视线跟随鼠标、音量驱动口型）编译进单一 48KB `.riv` 二进制资产，由 WASM/WebGL2 渲染器执行任意帧无跳切平滑插值（Blend Tree），全 17 档流畅度与体积比恒锁 1.0000×。",useRiveStateMachineBlend:!0,defaultStationIndex:16,badge:"RIVE STATE MACHINE LOCKED · 1.0000× (0/17 JUMP-CUTS)",badgeZh:"Rive 状态机锁死 · 1.0000×（0/17 站跳帧或包体膨胀）",description:"Enterprise AI Copilot mascots, automotive HMI gauges, and interactive product pages achieve 60fps interruptible motion in <50 KB via Rive state machines.",descriptionZh:"企业 AI 助手形象、智能座舱 HMI 仪表与高交互品牌官网通过 Rive 矢量骨骼状态机实现 <50KB 极小体积下的 60fps 任意打断平滑过渡。"},naive_prerendered_video_lottie_bloat:{id:"naive_prerendered_video_lottie_bloat",label:"Naive Multi-Clip WebM Alpha Videos / Unbound Raster Lottie JSONs (Payload & Jump-Cut Overrun = 1 + u up to 2.0000×)",labelZh:"朴素多段 WebM 透明视频拼接 / 巨型位图 Lottie 序列（打断硬切跳帧且包体膨胀超支达 2.0000×）",subtitle:"Loads 14.8 MB of separate pre-rendered video clips or unoptimized AE Lottie JSONs per state, causing jarring jump-cut snaps on user interruptions and inflating bandwidth/rework by 2.0000× at Tier 16.",subtitleZh:"为每个状态分别加载独立的透明 WebM/MP4 视频（累计 14.8MB）或带位图遮罩的巨型 AE Lottie JSON，不仅在用户中途打断或鼠标移动时发生生硬跳帧（Jump-Cut），更使第 16 档首屏负载与返工成本翻倍至 2.0000×。",useRiveStateMachineBlend:!1,defaultStationIndex:16,badge:"CLIP BLOAT & JUMP-CUTS · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"多视频膨胀与硬切跳帧 · 最高 2.0000×（16/17 站违背）",description:"Pre-rendered timeline clips cannot interpolate continuous 2D cursor gaze or mid-frame interruptions, doubling bundle overhead across 16/17 interactive tiers.",descriptionZh:"预渲染线性时间轴视频无法响应连续二维鼠标视线跟随与任意帧中途打断，在 16/17 个高交互档位引发严重跳帧与包体超标。"}},S=17,L=["Tier 0: Static Hero Icon / Single Linear Loop (Baseline)","Tier 1: Hover Enter / Exit Interruptible Cross-Fade (120ms)","Tier 2: AI Copilot Idle -> Listening -> Thinking State Graph","Tier 3: Real-Time Audio RMS Amplitude Mouth Blend (0..1)","Tier 4: 2D Cursor Eye-Gaze & Head-Tilt IK Blend Space","Tier 5: Mid-Sentence User Interruption Smooth Pose Recovery","Tier 6: Runtime Dark/Light Theme Color Slot Dynamic Binding","Tier 7: Scroll-Progress Scrollytelling Timeline Scrubbing","Tier 8: Skeletal Mesh Deformation on Vector Cloth & Hair","Tier 9: Multi-Language Dynamic Text Run Inside Vector Rig","Tier 10: Drag-and-Drop Spring Physics Constraint Solver","Tier 11: Automotive HMI Speedometer & ADAS Alert Blend Tree","Tier 12: Gamified Onboarding 5-Step Achievement State Machine","Tier 13: Low-End Mobile 60fps Offscreen Canvas Worker Render","Tier 14: 48KB .riv Binary vs 14.8MB Multi-WebM CDN Budget","Tier 15: Deterministic State-Event Telemetry Hook Emission","Tier 16: Full 17-State Interactive AI Mascot & HMI Suite (0.50 b_0)"];function W(e){const t=1+Math.max(0,e),n=1/t;return{multiClipPayloadAmplification:t,riveStateAmortizedUnitCost:n}}function z(e,i=64){const n=1/(1+Math.max(0,e)),s=Math.max(2,i%2===0?i:i+1),r=1/s;let o=2*n;for(let a=1;a<s;a++){const d=a*r,f=a%2===1?4:2;o+=f*(2*n*d)}return r/3*o}function K(e,i){const t=Math.max(0,Math.min(S-1,e)),n=t/(S-1),s=W(n),r=z(n,64),o=1+n,a=i?1:o;return{index:t,interactionComplexityU:n,multiClipPayloadAmplification:s.multiClipPayloadAmplification,riveStateAmortizedUnitCost:s.riveStateAmortizedUnitCost,quadratureBlendTreeCost:r,motionPayloadEfficiencyRatio:a,naiveMultiClipOverrunRatio:o,uiMotionTierLabel:L[t]??L[0],isMotionBloatViolation:a>1.0001}}function g(e,i){const t=x[e],n=[];let s=0,r=0;for(let a=0;a<S;a++){const d=K(a,t.useRiveStateMachineBlend);n.push(d),d.isMotionBloatViolation&&s++;const f=Math.abs(d.riveStateAmortizedUnitCost-d.quadratureBlendTreeCost);f>r&&(r=f)}const o=i!==void 0?Math.max(0,Math.min(S-1,i)):t.defaultStationIndex;return{presetId:e,useRiveStateMachineBlend:t.useRiveStateMachineBlend,stationCount:S,selectedStation:n[o],stations:n,station4Ratio:n[4].motionPayloadEfficiencyRatio,station8Ratio:n[8].motionPayloadEfficiencyRatio,station12Ratio:n[12].motionPayloadEfficiencyRatio,station16Ratio:n[16].motionPayloadEfficiencyRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"RIVE_STATE_MACHINE_BLEND_LOCKED":"NAIVE_PRERENDERED_CLIP_BLOAT_OVERRUN"}}function J(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise Interactive UI Motion Stack: Rive State Machine vs Lottie vs WebM Plinth"}),i.push({id:"blend-rail-front",kind:"vector_bone_blend_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Rive 48KB .riv Vector Bone & 2D Blend-Tree Cross-Fade Bus (1.0000×)"}),i.push({id:"blend-rail-back",kind:"vector_bone_blend_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Live Pointer IK (pointerX/Y) + Audio RMS Input Binding Bus"});for(const t of e.stations){const n=(t.index-8)*30,s=22*t.multiClipPayloadAmplification,r=44*t.riveStateAmortizedUnitCost,o=36*t.motionPayloadEfficiencyRatio;i.push({id:`state-branch-demand-column-${t.index}`,kind:"state_branch_demand_column",stationIndex:t.index,x:n,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Tier ${t.index} Amplification S(u) = ${t.multiClipPayloadAmplification.toFixed(4)}× (${t.uiMotionTierLabel})`}),i.push({id:`rive-wasm-runtime-node-${t.index}`,kind:"rive_wasm_runtime_node",stationIndex:t.index,x:n,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useRiveStateMachineBlend?"teal":"slate",label:`Tier ${t.index} Amortized State Cost b_rive = ${t.riveStateAmortizedUnitCost.toFixed(4)}×`}),i.push({id:`motion-efficiency-gauge-${t.index}`,kind:"motion_efficiency_gauge",stationIndex:t.index,x:n,y:o*.5-8,z:56,w:Math.min(24,12*t.motionPayloadEfficiencyRatio),h:o,d:12,tone:t.isMotionBloatViolation?"crimson":"teal",label:`Tier ${t.index} Motion Smoothness & Payload Ratio = ${t.motionPayloadEfficiencyRatio.toFixed(4)}×`})}return i.push({id:"pointer-gate-left",kind:"pointer_ik_input_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"2D Pointer IK & Audio RMS State-Machine Input Binding Gate"}),i.push({id:"pointer-gate-right",kind:"pointer_ik_input_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useRiveStateMachineBlend?"teal":"crimson",label:"60fps WASM/WebGL2 Interruptible Cross-Fade Egress Gate"}),i.push({id:"smooth-bar-top",kind:"sixty_fps_smooth_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"State-Machine Law: b_rive(u) = b_0 / (1 + u) via 48KB .riv Vector Bone Blend vs Multi-WebM"}),i.push({id:"smooth-bar-front",kind:"sixty_fps_smooth_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useRiveStateMachineBlend?"teal":"crimson",label:"0ms Interruption Jump-Cut & 60fps Interactive UI Motion Lock Line (1.0000×)"}),i}const N=new URLSearchParams(window.location.search),R=N.get("preset"),G=N.get("theme")==="light"?"light":"dark";let l=R&&R in x?R:"rive_state_machine_vector_blend_lock",c=x[l].defaultStationIndex,h=G;document.documentElement.setAttribute("data-theme",h);const Z=document.querySelector("#app");Z.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ENTERPRISE AI SOLUTION ARCHITECTURE · ENTERPRISE INTERACTIVE UI MOTION STACK: RIVE STATE MACHINE VS LOTTIE VS WEBM ALPHA</span>
        <h1>Enterprise Interactive UI Motion Stack: Rive State Machine vs Lottie vs WebM Alpha Workbench</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${h.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Interactive UI Motion Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="rive_state_machine_vector_blend_lock"
      >
        Rive 48KB Vector Bone State Machine + 2D Blend Tree (Efficiency Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_prerendered_video_lottie_bloat"
      >
        Naive Multi-Clip WebM Alpha / Unbound Lottie JSON (Payload & Jump-Cut Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Interactive UI Motion Readouts">
      <article class="kpi-card">
        <span class="kpi-label">PAYLOAD FACTOR S(u) / RIVE STATE COST b_rive</span>
        <strong id="kpi-rive" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">MOTION SMOOTHNESS & PAYLOAD RATIO (B_active / B_rive)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">TIERS 4 / 8 / 16 EFFICIENCY RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">S(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">JUMP-CUT & PAYLOAD BLOAT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-TIER RIVE VECTOR STATE MACHINE & 2D BLEND-TREE STAGE</span>
          <span id="solid-count-readout">58 solids · 17 UI tiers</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Enterprise Interactive UI Motion Rive vs Lottie vs WebM Alpha Workbench"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Interactive UI Motion & State-Machine Tier (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Tier 16 (u = 1.000, b_rive = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-TIER RIVE STATE MACHINE VS MULTI-CLIP WEBM/LOTTIE LEDGER</span>
          <span>b_rive = b_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>u</th>
                <th>S(u) = 1+u</th>
                <th>b_rive</th>
                <th>Blend Quad</th>
                <th>B / B_rive</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Q=document.querySelector("#preset-subtitle"),P=document.querySelector("#preset-badge"),Y=document.querySelector("#kpi-rive"),j=document.querySelector("#kpi-quad"),F=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),O=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),it=document.querySelector("#solid-count-readout"),ot=document.querySelector("#rig-svg"),A=document.querySelector("#station-slider"),nt=document.querySelector("#station-slider-label"),V=document.querySelector("#station-tbody"),U=document.querySelector("#theme-toggle");function v(e,i,t){const n=(e-t*.55)*.88,s=-i+(e*.18+t*.42)*.55;return[n,s]}function at(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function st(e,i,t,n,s,r,o,a,d,f,w){const u=n*.5,p=s*.5,b=r*.5,$=v(e+u,i-p,t-b),E=v(e+u,i-p,t+b),y=v(e-u,i-p,t+b),B=v(e-u,i+p,t-b),I=v(e+u,i+p,t-b),m=v(e+u,i+p,t+b),M=v(e-u,i+p,t+b),k=at(o,d),_=a?1.8:.7,C=a?"#ffffff":k.stroke,D=`${B[0].toFixed(1)},${B[1].toFixed(1)} ${I[0].toFixed(1)},${I[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)} ${M[0].toFixed(1)},${M[1].toFixed(1)}`,q=`${y[0].toFixed(1)},${y[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)} ${M[0].toFixed(1)},${M[1].toFixed(1)}`,H=`${E[0].toFixed(1)},${E[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${I[0].toFixed(1)},${I[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${f}" data-solid-kind="${w}">
      <polygon points="${q}" fill="${k.left}" stroke="${C}" stroke-width="${_}" />
      <polygon points="${H}" fill="${k.right}" stroke="${C}" stroke-width="${_}" />
      <polygon points="${D}" fill="${k.top}" stroke="${C}" stroke-width="${_}" />
    </g>
  `}function T(e){const i=x[e.presetId],t=e.selectedStation,n=h==="dark";Q.textContent=i.subtitle,P.textContent=i.badge,P.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Y.textContent=`S(u) = ${t.multiClipPayloadAmplification.toFixed(4)}× (b_rive = ${t.riveStateAmortizedUnitCost.toFixed(4)}×)`,j.textContent=`Blend Quad = ${t.quadratureBlendTreeCost.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,F.textContent=`${t.motionPayloadEfficiencyRatio.toFixed(4)}×`,F.className=`kpi-value ${t.isMotionBloatViolation?"text-danger":"text-ok"}`,X.textContent=`u = ${t.interactionComplexityU.toFixed(4)} | ${t.uiMotionTierLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,O.textContent=`${e.violatedCount} / ${e.stationCount}`,O.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,A.value=String(t.index),nt.textContent=`Tier ${t.index} (u = ${t.interactionComplexityU.toFixed(3)}, b_rive = ${t.riveStateAmortizedUnitCost.toFixed(3)}, Ratio = ${t.motionPayloadEfficiencyRatio.toFixed(4)}×)`;const s=J(e);it.textContent=`${s.length} solids · ${e.stationCount} UI tiers`;const r=[...s].sort((o,a)=>o.z-a.z||o.y-a.y||o.x-a.x);ot.innerHTML=r.map(o=>st(o.x,o.y,o.z,o.w,o.h,o.d,o.tone,o.stationIndex===t.index,n,o.id,o.kind)).join(""),V.innerHTML=e.stations.map(o=>{const a=o.index===t.index?"row-selected":"",d=o.isMotionBloatViolation?"cell-fail":"cell-pass";return`
        <tr class="${a}" data-station-row="${o.index}">
          <td>#${o.index}</td>
          <td>${o.interactionComplexityU.toFixed(4)}</td>
          <td>${o.multiClipPayloadAmplification.toFixed(4)}×</td>
          <td>${o.riveStateAmortizedUnitCost.toFixed(4)}×</td>
          <td>${o.quadratureBlendTreeCost.toFixed(4)}×</td>
          <td class="${d}">${o.motionPayloadEfficiencyRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(o=>{const a=o.getAttribute("data-preset");o.classList.toggle("active",a===e.presetId)}),window.__RIVE_LOTTIE_MOTION_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in x&&(l=i,c=x[l].defaultStationIndex,T(g(l,c)))})});A.addEventListener("input",()=>{c=Number(A.value),T(g(l,c))});V.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),T(g(l,c)))});U.addEventListener("click",()=>{h=h==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",h),U.textContent=`Theme: ${h.toUpperCase()}`,T(g(l,c))});T(g(l,c));
