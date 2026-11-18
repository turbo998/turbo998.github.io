import"./modulepreload-polyfill-B5Qt9EMX.js";const b={spatial_mvhevc_comfort_disparity_lock:{id:"spatial_mvhevc_comfort_disparity_lock",label:"Video-Depth-Anything + Comfort Disparity Clamp [-1.8%, +2.2%] + DIBR Inpaint + MV-HEVC/USDZ (c_spatial = c_0/(1+u), Lock = 1.0000×)",labelZh:"时序一致深度估计 + 双目舒适视差钳位 [-1.8%, +2.2%] + 遮挡补全 + MV-HEVC/USDZ 管线（单条成本 c_0/(1+u)，舒适与预算比恒锁 1.0000×）",subtitle:"Extracts temporally coherent metric depth, clamps binocular parallax within the visionOS comfort zone [-1.8%, +2.2%], inpaints disoccluded background strips, and packages MV-HEVC + RealityKit USDZ across all 17 stages.",subtitleZh:"通过 Video-Depth-Anything/DepthCrafter 提取跨帧零呼吸的时序深度，将双目视差严格钳位在 Apple visionOS 生理舒适区 [-1.8%, +2.2%] 内，对前景侧方遮挡空洞执行局部 Inpainting 并封装 MV-HEVC 与 USDZ，全 17 阶段恒锁 1.0000×。",useComfortZoneDisparityLock:!0,defaultStationIndex:16,badge:"MV-HEVC COMFORT ZONE LOCKED · 1.0000× (0/17 VAC SICKNESS)",badgeZh:"空间视差舒适区锁死 · 1.0000×（0/17 站眩晕或拉丝）",description:"Enterprise Apple Vision Pro & Meta Quest 3 product launches achieve zero vergence-accommodation nausea and zero silhouette stretching via comfort-clamped LDI + MV-HEVC.",descriptionZh:"企业 Apple Vision Pro 与 Quest 3 沉浸式展厅通过“时序深度锁定 + 视差舒适区钳位 + 遮挡边缘 Inpainting”彻底消除头显眩晕与人物边缘橡皮泥拉丝。"},naive_unclamped_disparity_vergence_sickness:{id:"naive_unclamped_disparity_vergence_sickness",label:"Naive Per-Frame Depth Warp & Unclamped Parallax Shift (Vergence Sickness & Edge-Tear Overrun = 1 + u up to 2.0000×)",labelZh:"朴素单帧深度硬平移转 3D（无视差上限导致双目斗鸡眼生理眩晕、前景边缘橡皮泥拉丝，返工超支达 2.0000×）",subtitle:"Applies frame-by-frame monocular depth and raw horizontal pixel shifting without comfort-zone clamping or disocclusion inpainting, causing severe HMD eye strain, rubber-sheet edge tears, and 2.0000× rework at Stage 16.",subtitleZh:"对每帧独立跑单目深度并直接按原始深度做左右眼像素平移，既不限制近景负视差上限也不修补被遮挡背景，导致头显佩戴者瞬间产生“斗鸡眼”辐辏调节冲突眩晕、人物轮廓拖出橡皮泥拉丝条纹，第 16 阶段返工成本翻倍至 2.0000×。",useComfortZoneDisparityLock:!1,defaultStationIndex:16,badge:"VERGENCE SICKNESS & EDGE TEARS · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"视差眩晕与边缘拉丝 · 最高 2.0000×（16/17 站违背）",description:"Unclamped negative parallax (>3% FOV) and un-inpainted disocclusion gaps make naive 2D-to-3D video unwatchable in Apple Vision Pro, doubling mastering cost across 16/17 stages.",descriptionZh:"超过 3% 视场角的未钳位负视差与未修补的遮挡裂口会使视频在 Vision Pro 中引发强烈眩晕，在 16/17 个阶段导致成片报废返工。"}},x=17,F=["Stage 0: Distant Horizon / Zero-Parallax Monoscopic Plane (Baseline)","Stage 1: Video-Depth-Anything 120-Frame Temporal Metric Depth Lock","Stage 2: Interpupillary Baseline (IPD = 63mm) Stereo Rig Calibration","Stage 3: Comfort-Zone Disparity Clamp [-1.8% Neg, +2.2% Pos FOV]","Stage 4: Cut-Boundary 12-Frame Depth Cushioning Ramp (Anti-Snap)","Stage 5: Foreground Silhouette Disocclusion Mask Extraction","Stage 6: Layered Depth Image (LDI) Background Strip Inpainting","Stage 7: Dynamic Floating Stereo Window (Zero Frame-Edge Violation)","Stage 8: Specular Highlight & Glass Reflection Stereo Consistency","Stage 9: 3D Subtitle Depth-Plane Placement (5cm In Front of Subject)","Stage 10: Apple MV-HEVC Left/Right View Inter-Layer Prediction","Stage 11: visionOS Spatial Metadata Atoms (vexu / hfov / cdat)","Stage 12: RealityKit USDZ PBR Material & IBL Environment Dome Sync","Stage 13: Meta Quest 3 WebXR Multiview 90fps Foveated Render Pass","Stage 14: Spatial Audio Ambisonics / Object-Tracked Bed Alignment","Stage 15: Vergence-Accommodation Comfort Audit (0% Frame Exceedance)","Stage 16: Global VIP Vision Pro + Quest 3 Flagship Showroom (0.50 c_0)"];function q(e){const t=1+Math.max(0,e),o=1/t;return{vergenceSicknessAmplification:t,spatialMasterAmortizedUnitCost:o}}function z(e,i=64){const o=1/(1+Math.max(0,e)),s=Math.max(2,i%2===0?i:i+1),r=1/s;let a=2*o;for(let n=1;n<s;n++){const l=n*r,h=n%2===1?4:2;a+=h*(2*o*l)}return r/3*a}function G(e,i){const t=Math.max(0,Math.min(x-1,e)),o=t/(x-1),s=q(o),r=z(o,64),a=1+o,n=i?1:a;return{index:t,parallaxComplexityU:o,vergenceSicknessAmplification:s.vergenceSicknessAmplification,spatialMasterAmortizedUnitCost:s.spatialMasterAmortizedUnitCost,quadratureLayeredDepthCost:r,stereoComfortBudgetRatio:n,naiveUnclampedOverrunRatio:a,spatialStageLabel:F[t]??F[0],isVergenceViolation:n>1.0001}}function f(e,i){const t=b[e],o=[];let s=0,r=0;for(let n=0;n<x;n++){const l=G(n,t.useComfortZoneDisparityLock);o.push(l),l.isVergenceViolation&&s++;const h=Math.abs(l.spatialMasterAmortizedUnitCost-l.quadratureLayeredDepthCost);h>r&&(r=h)}const a=i!==void 0?Math.max(0,Math.min(x-1,i)):t.defaultStationIndex;return{presetId:e,useComfortZoneDisparityLock:t.useComfortZoneDisparityLock,stationCount:x,selectedStation:o[a],stations:o,station4Ratio:o[4].stereoComfortBudgetRatio,station8Ratio:o[8].stereoComfortBudgetRatio,station12Ratio:o[12].stereoComfortBudgetRatio,station16Ratio:o[16].stereoComfortBudgetRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"SPATIAL_MVHEVC_COMFORT_DISPARITY_LOCKED":"NAIVE_UNCLAMPED_VERGENCE_SICKNESS_OVERRUN"}}function Q(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise Spatial Computing (Apple Vision Pro / Quest 3) MV-HEVC & USDZ Plinth"}),i.push({id:"disparity-rail-front",kind:"mvhevc_binocular_disparity_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Comfort-Zone Binocular Parallax Clamp [-1.8%, +2.2%] + MV-HEVC Bus (1.0000×)"}),i.push({id:"disparity-rail-back",kind:"mvhevc_binocular_disparity_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Video-Depth-Anything 120-Frame Temporal Depth + RealityKit USDZ Bus"});for(const t of e.stations){const o=(t.index-8)*30,s=22*t.vergenceSicknessAmplification,r=44*t.spatialMasterAmortizedUnitCost,a=36*t.stereoComfortBudgetRatio;i.push({id:`parallax-demand-column-${t.index}`,kind:"parallax_demand_column",stationIndex:t.index,x:o,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Stage ${t.index} Amplification V(u) = ${t.vergenceSicknessAmplification.toFixed(4)}× (${t.spatialStageLabel})`}),i.push({id:`dibr-occlusion-inpaint-node-${t.index}`,kind:"dibr_occlusion_inpaint_node",stationIndex:t.index,x:o,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useComfortZoneDisparityLock?"teal":"slate",label:`Stage ${t.index} Amortized Spatial Cost c_spatial = ${t.spatialMasterAmortizedUnitCost.toFixed(4)}×`}),i.push({id:`stereo-comfort-budget-gauge-${t.index}`,kind:"stereo_comfort_budget_gauge",stationIndex:t.index,x:o,y:a*.5-8,z:56,w:Math.min(24,12*t.stereoComfortBudgetRatio),h:a,d:12,tone:t.isVergenceViolation?"crimson":"teal",label:`Stage ${t.index} Comfort & Mastering Budget Ratio = ${t.stereoComfortBudgetRatio.toFixed(4)}×`})}return i.push({id:"window-gate-left",kind:"floating_stereo_window_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Temporal Metric Depth & Disocclusion Inpainting Ingress Gate"}),i.push({id:"window-gate-right",kind:"floating_stereo_window_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useComfortZoneDisparityLock?"teal":"crimson",label:"Floating Stereo Window & Apple MV-HEVC / USDZ Egress Gate"}),i.push({id:"vac-bar-top",kind:"zero_vac_sickness_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Spatial Comfort Law: c_spatial(u) = c_0 / (1 + u) via [-1.8%, +2.2%] Disparity Clamp"}),i.push({id:"vac-bar-front",kind:"zero_vac_sickness_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useComfortZoneDisparityLock?"teal":"crimson",label:"0% Vergence-Accommodation Sickness & Zero Edge-Tear Lock Line (1.0000×)"}),i}const O=new URLSearchParams(window.location.search),$=O.get("preset"),K=O.get("theme")==="light"?"light":"dark";let d=$&&$ in b?$:"spatial_mvhevc_comfort_disparity_lock",c=b[d].defaultStationIndex,S=K;document.documentElement.setAttribute("data-theme",S);const W=document.querySelector("#app");W.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ENTERPRISE AI SOLUTION ARCHITECTURE · 252ND DEMO · ENTERPRISE SPATIAL COMPUTING (VISION PRO / QUEST 3) MV-HEVC &amp; USDZ PIPELINE</span>
        <h1>Enterprise Spatial Computing (Vision Pro / Quest 3) MV-HEVC &amp; USDZ Showroom Pipeline</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${S.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Spatial Computing Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="spatial_mvhevc_comfort_disparity_lock"
      >
        Temporal Depth + Comfort Disparity Clamp [-1.8%, +2.2%] + DIBR Inpaint + MV-HEVC/USDZ (Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_unclamped_disparity_vergence_sickness"
      >
        Naive Unclamped 2D-to-3D Shift (Vergence Sickness &amp; Edge-Tear Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Spatial Computing Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SICKNESS FACTOR V(u) / SPATIAL COST c_spatial</span>
        <strong id="kpi-spatial" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">COMFORT &amp; MASTERING BUDGET RATIO (C_active / C_spatial)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STAGES 4 / 8 / 16 BUDGET RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">V(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">VERGENCE SICKNESS &amp; EDGE-TEAR VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STAGE VISION PRO MV-HEVC COMFORT DISPARITY &amp; USDZ SHOWROOM STAGE</span>
          <span id="solid-count-readout">58 solids · 17 spatial stages</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Enterprise Spatial Computing Apple Vision Pro MV-HEVC and USDZ Pipeline"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Spatial Computing MV-HEVC &amp; USDZ Stage (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Stage 16 (u = 1.000, c_spatial = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STAGE MV-HEVC COMFORT CLAMP VS NAIVE UNCLAMPED 3D LEDGER</span>
          <span>c_spatial = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>u</th>
                <th>V(u) = 1+u</th>
                <th>c_spatial</th>
                <th>LDI Quad</th>
                <th>C / C_spatial</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const j=document.querySelector("#preset-subtitle"),T=document.querySelector("#preset-badge"),Y=document.querySelector("#kpi-spatial"),X=document.querySelector("#kpi-quad"),L=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),P=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),it=document.querySelector("#solid-count-readout"),at=document.querySelector("#rig-svg"),D=document.querySelector("#station-slider"),ot=document.querySelector("#station-slider-label"),w=document.querySelector("#station-tbody"),U=document.querySelector("#theme-toggle");function m(e,i,t){const o=(e-t*.55)*.88,s=-i+(e*.18+t*.42)*.55;return[o,s]}function nt(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function st(e,i,t,o,s,r,a,n,l,h,N){const p=o*.5,u=s*.5,g=r*.5,M=m(e+p,i-u,t-g),E=m(e+p,i-u,t+g),y=m(e-p,i-u,t+g),R=m(e-p,i+u,t-g),v=m(e+p,i+u,t-g),C=m(e+p,i+u,t+g),_=m(e-p,i+u,t+g),V=nt(a,l),A=n?1.8:.7,I=n?"#ffffff":V.stroke,H=`${R[0].toFixed(1)},${R[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`,Z=`${y[0].toFixed(1)},${y[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`,B=`${E[0].toFixed(1)},${E[1].toFixed(1)} ${M[0].toFixed(1)},${M[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${h}" data-solid-kind="${N}">
      <polygon points="${Z}" fill="${V.left}" stroke="${I}" stroke-width="${A}" />
      <polygon points="${B}" fill="${V.right}" stroke="${I}" stroke-width="${A}" />
      <polygon points="${H}" fill="${V.top}" stroke="${I}" stroke-width="${A}" />
    </g>
  `}function k(e){const i=b[e.presetId],t=e.selectedStation,o=S==="dark";j.textContent=i.subtitle,T.textContent=i.badge,T.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Y.textContent=`V(u) = ${t.vergenceSicknessAmplification.toFixed(4)}× (c_spatial = ${t.spatialMasterAmortizedUnitCost.toFixed(4)}×)`,X.textContent=`LDI Quad = ${t.quadratureLayeredDepthCost.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,L.textContent=`${t.stereoComfortBudgetRatio.toFixed(4)}×`,L.className=`kpi-value ${t.isVergenceViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${t.parallaxComplexityU.toFixed(4)} | ${t.spatialStageLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,P.textContent=`${e.violatedCount} / ${e.stationCount}`,P.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,D.value=String(t.index),ot.textContent=`Stage ${t.index} (u = ${t.parallaxComplexityU.toFixed(3)}, c_spatial = ${t.spatialMasterAmortizedUnitCost.toFixed(3)}, Ratio = ${t.stereoComfortBudgetRatio.toFixed(4)}×)`;const s=Q(e);it.textContent=`${s.length} solids · ${e.stationCount} spatial stages`;const r=[...s].sort((a,n)=>a.z-n.z||a.y-n.y||a.x-n.x);at.innerHTML=r.map(a=>st(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===t.index,o,a.id,a.kind)).join(""),w.innerHTML=e.stations.map(a=>{const n=a.index===t.index?"row-selected":"",l=a.isVergenceViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.parallaxComplexityU.toFixed(4)}</td>
          <td>${a.vergenceSicknessAmplification.toFixed(4)}×</td>
          <td>${a.spatialMasterAmortizedUnitCost.toFixed(4)}×</td>
          <td>${a.quadratureLayeredDepthCost.toFixed(4)}×</td>
          <td class="${l}">${a.stereoComfortBudgetRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const n=a.getAttribute("data-preset");a.classList.toggle("active",n===e.presetId)}),window.__SPATIAL_COMPUTING_MVHEVC_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in b&&(d=i,c=b[d].defaultStationIndex,k(f(d,c)))})});D.addEventListener("input",()=>{c=Number(D.value),k(f(d,c))});w.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),k(f(d,c)))});U.addEventListener("click",()=>{S=S==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",S),U.textContent=`Theme: ${S.toUpperCase()}`,k(f(d,c))});k(f(d,c));
