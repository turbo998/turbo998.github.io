import"./modulepreload-polyfill-B5Qt9EMX.js";const F={flf2v_bidirectional_anchor_plucker_lock:{id:"flf2v_bidirectional_anchor_plucker_lock",label:"Bidirectional Start-End Keyframe Anchor (Wan 2.2 FLF2V / Kling 2.1) + 6D Plücker Camera Bridge (c_flf = c_0/(1+u), Seam = 0.00px, Lock = 1.0000×)",labelZh:"首尾双关键帧潜空间锚定（Wan 2.2 FLF2V / Kling 2.1）+ 6D Plücker 运镜桥接（单镜成本 c_0/(1+u)，0 像素接缝恒锁 1.0000×）",subtitle:"Clamps both latent frame z_0 = E(I_start) and z_T = E(I_end) as hard boundary conditions with 6D Plücker camera ray guidance, guaranteeing 0.00px match-cut continuity across all 17 transition stages.",subtitleZh:"将经过品牌确认的起始帧 I_start 与目标终点帧 I_end 同时编码为潜空间硬边界条件（z_0 与 z_T），配合 6D Plücker 相机射线轨迹引导与帧间光流桥接，实现多镜头“一镜到底”0 像素跳切并在全 17 阶段恒锁 1.0000×。",useBidirectionalFlf2vLock:!0,defaultStationIndex:16,badge:"FLF2V KEYFRAME BRIDGE LOCKED · 1.0000× (0/17 ENDPOINT DRIFT)",badgeZh:"首尾帧双锚定锁死 · 1.0000×（0/17 站终点漂移）",description:"Enterprise product-evolution keynotes, architectural room morphs, and continuous long-take commercials achieve deterministic start-to-end transitions without open-loop I2V lottery.",descriptionZh:"品牌发布会多代产品丝滑演进、地产毛坯到精装一镜到底、长镜头广告分镜无缝接力通过首尾帧双向锚定彻底告别单图开环盲抽。"},naive_open_loop_single_i2v_drift:{id:"naive_open_loop_single_i2v_drift",label:"Naive Single-Keyframe Open-Loop I2V Generation (Endpoint Miss & Jump-Cut Retake Overrun = 1 + u up to 2.0000×)",labelZh:"朴素仅给定首帧的单图开环 I2V 盲目演化（第 81 帧终点完全偏离目标图，多镜拼接跳切返工超支达 2.0000×）",subtitle:"Conditions video generation only on the starting image I_start and a text prompt, causing the final frame z_T to drift wildly from the required next-shot keyframe I_end and inflating retake cost by 2.0000× at Stage 16.",subtitleZh:"仅把首帧图片喂给普通图生视频（I2V）模型并靠文字提示词祈祷它停在目标构图上，导致第 81 帧的商品角度、光影与下一镜首帧严重脱节，剪辑师被迫靠生硬闪白遮丑或成百次废片重抽，第 16 阶段成本翻倍至 2.0000×。",useBidirectionalFlf2vLock:!1,defaultStationIndex:16,badge:"OPEN-LOOP ENDPOINT DRIFT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"开环终点漂移与跳切 · 最高 2.0000×（16/17 站违背）",description:"Open-loop initial-value diffusion has zero boundary constraint at t = T, making exact multi-shot match cuts or CAD-to-photo product morphs impossible without 2.0000× retake waste.",descriptionZh:"单初值开环扩散在 t=T 处没有任何边界约束，无法精确收敛到指定的设计师终点稿，在 16/17 个一镜到底阶段引发严重跳切与返工。"}},k=17,B=["Stage 0: Static Hold / Zero-Displacement Keyframe Pair (Baseline)","Stage 1: Approved Start & End Keyframe VAE Latent Pin (z_0, z_T)","Stage 2: Bidirectional Temporal Attention Decay Weighting w(t)","Stage 3: 6D Plücker Ray Camera Trajectory Interpolation","Stage 4: Product Gen-1 -> Gen-5 Industrial Design Morph","Stage 5: Raw Concrete Shell -> Luxury Furnished Room Reveal","Stage 6: Day-to-Night Architectural Time-Lapse Relight Bridge","Stage 7: Wireframe CAD Blueprint -> Photorealistic Car Materialize","Stage 8: Multi-Shot Daisy-Chain Anchor (Shot k End == Shot k+1 Start)","Stage 9: Optical-Flow Midpoint Structural Guidance Warping","Stage 10: High-Speed Whip-Pan & Match-Cut Momentum Continuity","Stage 11: Macro Ingredient Exploded View -> Sealed Bottle Reassembly","Stage 12: Seasonal 4-Scene Brand Ambassador Wardrobe Continuous Walk","Stage 13: Boundary Velocity Matching (dz/dt Smooth C1 Seam)","Stage 14: Endpoint Frame SSIM >= 0.9920 & LPIPS <= 0.008 Gate","Stage 15: 60-Second 12-Keyframe Uncut Brand Keynote Long-Take","Stage 16: Enterprise 100-Shot Storyboard Zero-Seam Assembly (0.50 c_0)"];function q(e){const t=1+Math.max(0,e),o=1/t;return{openLoopDriftAmplification:t,flf2vBridgeAmortizedUnitCost:o}}function G(e,i=64){const o=1/(1+Math.max(0,e)),s=Math.max(2,i%2===0?i:i+1),r=1/s;let n=2*o;for(let a=1;a<s;a++){const d=a*r,m=a%2===1?4:2;n+=m*(2*o*d)}return r/3*n}function W(e,i){const t=Math.max(0,Math.min(k-1,e)),o=t/(k-1),s=q(o),r=G(o,64),n=1+o,a=i?1:n;return{index:t,transitionSpanU:o,openLoopDriftAmplification:s.openLoopDriftAmplification,flf2vBridgeAmortizedUnitCost:s.flf2vBridgeAmortizedUnitCost,quadratureLatentBridgeCost:r,endpointContinuityBudgetRatio:a,naiveOpenLoopOverrunRatio:n,flf2vStageLabel:B[t]??B[0],isEndpointDriftViolation:a>1.0001}}function x(e,i){const t=F[e],o=[];let s=0,r=0;for(let a=0;a<k;a++){const d=W(a,t.useBidirectionalFlf2vLock);o.push(d),d.isEndpointDriftViolation&&s++;const m=Math.abs(d.flf2vBridgeAmortizedUnitCost-d.quadratureLatentBridgeCost);m>r&&(r=m)}const n=i!==void 0?Math.max(0,Math.min(k-1,i)):t.defaultStationIndex;return{presetId:e,useBidirectionalFlf2vLock:t.useBidirectionalFlf2vLock,stationCount:k,selectedStation:o[n],stations:o,station4Ratio:o[4].endpointContinuityBudgetRatio,station8Ratio:o[8].endpointContinuityBudgetRatio,station12Ratio:o[12].endpointContinuityBudgetRatio,station16Ratio:o[16].endpointContinuityBudgetRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"FLF2V_BIDIRECTIONAL_KEYFRAME_LOCKED":"NAIVE_OPEN_LOOP_I2V_ENDPOINT_DRIFT"}}function Y(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise First-Last-Frame (FLF2V) Keyframe Transition & Camera Bridge Plinth"}),i.push({id:"bridge-rail-front",kind:"plucker_camera_bridge_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Daisy-Chained Start-End Latent Anchor z_0 == z_T Match-Cut Bus (1.0000×)"}),i.push({id:"bridge-rail-back",kind:"plucker_camera_bridge_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Wan 2.2 FLF2V / Kling 2.1 Start-End + 6D Plücker Ray Trajectory Bus"});for(const t of e.stations){const o=(t.index-8)*30,s=22*t.openLoopDriftAmplification,r=44*t.flf2vBridgeAmortizedUnitCost,n=36*t.endpointContinuityBudgetRatio;i.push({id:`transition-span-demand-column-${t.index}`,kind:"transition_span_demand_column",stationIndex:t.index,x:o,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Stage ${t.index} Amplification F(u) = ${t.openLoopDriftAmplification.toFixed(4)}× (${t.flf2vStageLabel})`}),i.push({id:`flf2v-latent-anchor-node-${t.index}`,kind:"flf2v_latent_anchor_node",stationIndex:t.index,x:o,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useBidirectionalFlf2vLock?"teal":"slate",label:`Stage ${t.index} Amortized Bridge Cost c_flf = ${t.flf2vBridgeAmortizedUnitCost.toFixed(4)}×`}),i.push({id:`endpoint-continuity-gauge-${t.index}`,kind:"endpoint_continuity_gauge",stationIndex:t.index,x:o,y:n*.5-8,z:56,w:Math.min(24,12*t.endpointContinuityBudgetRatio),h:n,d:12,tone:t.isEndpointDriftViolation?"crimson":"teal",label:`Stage ${t.index} Endpoint Continuity & Budget Ratio = ${t.endpointContinuityBudgetRatio.toFixed(4)}×`})}return i.push({id:"keyframe-gate-left",kind:"start_end_keyframe_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Start Keyframe z_0 = E(I_start) & 6D Plücker Ray Injection Gate"}),i.push({id:"keyframe-gate-right",kind:"start_end_keyframe_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useBidirectionalFlf2vLock?"teal":"crimson",label:"End Keyframe z_T = E(I_end) Exact Boundary Lock & C1 Seam Egress Gate"}),i.push({id:"matchcut-bar-top",kind:"zero_seam_matchcut_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"FLF2V Bridge Law: c_flf(u) = c_0 / (1 + u) via Bidirectional Latent Clamping"}),i.push({id:"matchcut-bar-front",kind:"zero_seam_matchcut_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useBidirectionalFlf2vLock?"teal":"crimson",label:"0.00px Multi-Shot Daisy-Chain Match-Cut & Budget Lock Line (1.0000×)"}),i}const M=new URLSearchParams(window.location.search),y=M.get("preset"),Z=M.get("theme")==="light"?"light":"dark";let l=y&&y in F?y:"flf2v_bidirectional_anchor_plucker_lock",c=F[l].defaultStationIndex,h=Z;document.documentElement.setAttribute("data-theme",h);const H=document.querySelector("#app");H.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 241 · 251ST DEMO · ENTERPRISE FIRST-LAST-FRAME (FLF2V) KEYFRAME TRANSITION & CAMERA BRIDGE STUDIO</span>
        <h1>Enterprise First-Last-Frame (FLF2V) Keyframe Transition & Camera Bridge Studio</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${h.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="FLF2V Transition Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="flf2v_bidirectional_anchor_plucker_lock"
      >
        Bidirectional Start-End Keyframe Anchor (Wan 2.2 FLF2V / Kling 2.1) + Plücker Camera Bridge (Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_open_loop_single_i2v_drift"
      >
        Naive Single-Keyframe Open-Loop I2V Drift (Endpoint Miss &amp; Retake Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="FLF2V Keyframe Transition Readouts">
      <article class="kpi-card">
        <span class="kpi-label">DRIFT FACTOR F(u) / FLF2V BRIDGE COST c_flf</span>
        <strong id="kpi-flf" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">ENDPOINT CONTINUITY &amp; BUDGET RATIO (C_active / C_flf)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STAGES 4 / 8 / 16 BUDGET RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">F(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">ENDPOINT DRIFT &amp; JUMP-CUT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STAGE BIDIRECTIONAL FLF2V KEYFRAME ANCHOR &amp; CAMERA BRIDGE STAGE</span>
          <span id="solid-count-readout">58 solids · 17 transition stages</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Enterprise First-Last-Frame Keyframe Transition and Camera Bridge Studio"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect FLF2V Keyframe Transition &amp; Long-Take Stage (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Stage 16 (u = 1.000, c_flf = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STAGE BIDIRECTIONAL FLF2V VS OPEN-LOOP I2V DRIFT LEDGER</span>
          <span>c_flf = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>u</th>
                <th>F(u) = 1+u</th>
                <th>c_flf</th>
                <th>Bridge Quad</th>
                <th>C / C_flf</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Q=document.querySelector("#preset-subtitle"),D=document.querySelector("#preset-badge"),j=document.querySelector("#kpi-flf"),J=document.querySelector("#kpi-quad"),O=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),N=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),it=document.querySelector("#solid-count-readout"),nt=document.querySelector("#rig-svg"),T=document.querySelector("#station-slider"),ot=document.querySelector("#station-slider-label"),P=document.querySelector("#station-tbody"),V=document.querySelector("#theme-toggle");function g(e,i,t){const o=(e-t*.55)*.88,s=-i+(e*.18+t*.42)*.55;return[o,s]}function at(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function st(e,i,t,o,s,r,n,a,d,m,z){const u=o*.5,p=s*.5,f=r*.5,$=g(e+u,i-p,t-f),_=g(e+u,i-p,t+f),R=g(e-u,i-p,t+f),A=g(e-u,i+p,t-f),E=g(e+u,i+p,t-f),b=g(e+u,i+p,t+f),v=g(e-u,i+p,t+f),C=at(n,d),I=a?1.8:.7,L=a?"#ffffff":C.stroke,w=`${A[0].toFixed(1)},${A[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)}`,K=`${R[0].toFixed(1)},${R[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)}`,U=`${_[0].toFixed(1)},${_[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${m}" data-solid-kind="${z}">
      <polygon points="${K}" fill="${C.left}" stroke="${L}" stroke-width="${I}" />
      <polygon points="${U}" fill="${C.right}" stroke="${L}" stroke-width="${I}" />
      <polygon points="${w}" fill="${C.top}" stroke="${L}" stroke-width="${I}" />
    </g>
  `}function S(e){const i=F[e.presetId],t=e.selectedStation,o=h==="dark";Q.textContent=i.subtitle,D.textContent=i.badge,D.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,j.textContent=`F(u) = ${t.openLoopDriftAmplification.toFixed(4)}× (c_flf = ${t.flf2vBridgeAmortizedUnitCost.toFixed(4)}×)`,J.textContent=`Bridge Quad = ${t.quadratureLatentBridgeCost.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,O.textContent=`${t.endpointContinuityBudgetRatio.toFixed(4)}×`,O.className=`kpi-value ${t.isEndpointDriftViolation?"text-danger":"text-ok"}`,X.textContent=`u = ${t.transitionSpanU.toFixed(4)} | ${t.flf2vStageLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,N.textContent=`${e.violatedCount} / ${e.stationCount}`,N.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,T.value=String(t.index),ot.textContent=`Stage ${t.index} (u = ${t.transitionSpanU.toFixed(3)}, c_flf = ${t.flf2vBridgeAmortizedUnitCost.toFixed(3)}, Ratio = ${t.endpointContinuityBudgetRatio.toFixed(4)}×)`;const s=Y(e);it.textContent=`${s.length} solids · ${e.stationCount} transition stages`;const r=[...s].sort((n,a)=>n.z-a.z||n.y-a.y||n.x-a.x);nt.innerHTML=r.map(n=>st(n.x,n.y,n.z,n.w,n.h,n.d,n.tone,n.stationIndex===t.index,o,n.id,n.kind)).join(""),P.innerHTML=e.stations.map(n=>{const a=n.index===t.index?"row-selected":"",d=n.isEndpointDriftViolation?"cell-fail":"cell-pass";return`
        <tr class="${a}" data-station-row="${n.index}">
          <td>#${n.index}</td>
          <td>${n.transitionSpanU.toFixed(4)}</td>
          <td>${n.openLoopDriftAmplification.toFixed(4)}×</td>
          <td>${n.flf2vBridgeAmortizedUnitCost.toFixed(4)}×</td>
          <td>${n.quadratureLatentBridgeCost.toFixed(4)}×</td>
          <td class="${d}">${n.endpointContinuityBudgetRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(n=>{const a=n.getAttribute("data-preset");n.classList.toggle("active",a===e.presetId)}),window.__FLF2V_KEYFRAME_TRANSITION_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in F&&(l=i,c=F[l].defaultStationIndex,S(x(l,c)))})});T.addEventListener("input",()=>{c=Number(T.value),S(x(l,c))});P.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),S(x(l,c)))});V.addEventListener("click",()=>{h=h==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",h),V.textContent=`Theme: ${h.toUpperCase()}`,S(x(l,c))});S(x(l,c));
