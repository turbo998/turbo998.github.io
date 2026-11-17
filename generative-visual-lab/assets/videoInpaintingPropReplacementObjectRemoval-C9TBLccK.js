import"./modulepreload-polyfill-B5Qt9EMX.js";const x={sam2_optical_flow_tube_inpaint_lock:{id:"sam2_optical_flow_tube_inpaint_lock",label:"SAM-2 Memory Mask + Bidirectional Flow Completion (ProPainter) + Wan-VACE Latent Tube (c_tube = c_0/(1+u), Lock = 1.0000×)",labelZh:"SAM-2 跨帧记忆掩码 + ProPainter 双向光流像素传播 + Wan-VACE 时空管商品替换（单镜成本 c_0/(1+u)，无痕与预算比恒锁 1.0000×）",subtitle:"Tracks occluded props/passersby via SAM-2 memory bank, warps known background pixels from distant frames via bidirectional flow completion, and synthesizes new 2026 SKU props inside a 3D spatiotemporal latent tube.",subtitleZh:"通过 SAM-2 跨帧记忆库精准追踪被手部遮挡的旧款商品或违规路人，优先用 ProPainter 双向光流将前后帧真实背景像素传播回填（85% 像素零脑补），再用 Wan-VACE 时空管替换新款商品并保留手指前景遮挡，全 17 阶段恒锁 1.0000×。",useSam2FlowTubeInpaint:!0,defaultStationIndex:16,badge:"SAM-2 + FLOW TUBE LOCKED · 1.0000× (0/17 JELLY SHIMMER)",badgeZh:"光流传播与时空管锁死 · 1.0000×（0/17 站水波纹果冻闪烁）",description:"Enterprise commercial post-production removes photobombers/wires and swaps legacy SKU props for 2026 models with zero water-ripple shimmer or studio reshoot.",descriptionZh:"企业广告成片局部路人/威亚擦除与旧款包装换新款 SKU 通过“双向光流真实背景回填 + 时空管一致性重绘”彻底根除水波纹幽灵闪烁。"},naive_per_frame_2d_inpaint_jelly_shimmer:{id:"naive_per_frame_2d_inpaint_jelly_shimmer",label:"Naive Frame-by-Frame 2D LaMa / SD Inpainting (Water-Ripple Jelly Shimmer & Reshoot Overrun = 1 + u up to 2.0000×)",labelZh:"朴素单帧独立 2D 擦除重绘（抹除处像水波纹/果冻透明人一样剧烈蠕动闪烁、手握商品穿模，重拍返工超支达 2.0000×）",subtitle:'Runs 2D image inpainting independently on each video frame without optical-flow propagation or temporal latent tubes, causing boiling "Predator cloak" jelly shimmer and 2.0000× reshoot overrun at Stage 16.',subtitleZh:"把视频拆成单帧图片逐张跑 2D 静态擦除（LaMa / SD Inpaint），由于每一帧都在盲目脑补不同的背景砖缝且忽视前后帧已露出的真实背景，播放时被抹除区域像“透明铁血战士水波纹”一样剧烈果冻蠕动，第 16 阶段返工成本翻倍至 2.0000×。",useSam2FlowTubeInpaint:!1,defaultStationIndex:16,badge:"WATER-RIPPLE JELLY SHIMMER · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"水波纹果冻闪烁与穿模 · 最高 2.0000×（16/17 站违背）",description:"Independent 2D frame inpainting hallucinates conflicting background textures on every frame instead of borrowing real background pixels revealed as the object moves, doubling post-production cost across 16/17 stages.",descriptionZh:"单帧独立 2D 修复不懂借用物体移开后在第 t+15 帧露出的真实背景像素，导致每帧脑补纹理互相打架，在 16/17 个阶段引发果冻闪烁废片。"}},f=17,M=["Stage 0: Static Tripod Clean Plate Difference Erase (Baseline)","Stage 1: SAM-2 Memory-Bank Promptable Video Object Mask Track","Stage 2: 10px Morphological Mask Dilation + Cast-Shadow Inclusion","Stage 3: RAFT Bidirectional Optical-Flow Field Estimation","Stage 4: Flow-Field Completion Across Masked Hole Region","Stage 5: ProPainter Recurrent Pixel Propagation (85% True Pixels)","Stage 6: Disoccluded Keyframe Feature Warping Transformer","Stage 7: DiffuEraser / Wan-VACE 3D Spatiotemporal Latent Tube Fill","Stage 8: Legacy Beverage Bottle -> 2026 New SKU Prop Replacement","Stage 9: Hand-Grip Foreground Finger Occlusion Matting Restore","Stage 10: 6DoF Object Pose Tracker (FoundationPose) Trajectory Lock","Stage 11: Contact Shadow & Tabletop Specular Reflection Re-Bake","Stage 12: Camera Sensor Grain & Lens Motion-Blur Matching Pass","Stage 13: Competitor Billboard / License Plate Compliance Blur/Swap","Stage 14: 92% Non-Masked Frame Bit-Exact Pixel Freeze (SSIM=1.000)","Stage 15: Temporal Warp Error (E_warp <= 0.0012) QA Gate","Stage 16: 200-Shot Archive TVC 2026 SKU Refresh Pipeline (0.50 c_0)"];function z(e){const t=1+Math.max(0,e),a=1/t;return{jellyShimmerAmplification:t,flowTubeAmortizedUnitCost:a}}function W(e,o=64){const a=1/(1+Math.max(0,e)),s=Math.max(2,o%2===0?o:o+1),l=1/s;let i=2*a;for(let n=1;n<s;n++){const r=n*l,h=n%2===1?4:2;i+=h*(2*a*r)}return l/3*i}function H(e,o){const t=Math.max(0,Math.min(f-1,e)),a=t/(f-1),s=z(a),l=W(a,64),i=1+a,n=o?1:i;return{index:t,propOcclusionComplexityU:a,jellyShimmerAmplification:s.jellyShimmerAmplification,flowTubeAmortizedUnitCost:s.flowTubeAmortizedUnitCost,quadratureFlowTubeCost:l,temporalTubeBudgetRatio:n,naivePerFrameShimmerOverrunRatio:i,inpaintStageLabel:M[t]??M[0],isShimmerViolation:n>1.0001}}function _(e,o){const t=x[e],a=[];let s=0,l=0;for(let n=0;n<f;n++){const r=H(n,t.useSam2FlowTubeInpaint);a.push(r),r.isShimmerViolation&&s++;const h=Math.abs(r.flowTubeAmortizedUnitCost-r.quadratureFlowTubeCost);h>l&&(l=h)}const i=o!==void 0?Math.max(0,Math.min(f-1,o)):t.defaultStationIndex;return{presetId:e,useSam2FlowTubeInpaint:t.useSam2FlowTubeInpaint,stationCount:f,selectedStation:a[i],stations:a,station4Ratio:a[4].temporalTubeBudgetRatio,station8Ratio:a[8].temporalTubeBudgetRatio,station12Ratio:a[12].temporalTubeBudgetRatio,station16Ratio:a[16].temporalTubeBudgetRatio,violatedCount:s,maxQuadratureError:l,verdict:s===0?"SAM2_FLOW_TUBE_INPAINT_LOCKED":"NAIVE_PER_FRAME_JELLY_SHIMMER_OVERRUN"}}function G(e){const o=[];o.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise Video Object Removal & Dynamic Brand Prop Replacement Plinth"}),o.push({id:"mask-rail-front",kind:"sam2_temporal_mask_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"ProPainter Bidirectional Flow Propagation + Wan-VACE Latent Tube Bus (1.0000×)"}),o.push({id:"mask-rail-back",kind:"sam2_temporal_mask_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"SAM-2 Cross-Frame Memory Mask + Hand-Grip Occlusion Restore Bus"});for(const t of e.stations){const a=(t.index-8)*30,s=22*t.jellyShimmerAmplification,l=44*t.flowTubeAmortizedUnitCost,i=36*t.temporalTubeBudgetRatio;o.push({id:`occlusion-motion-demand-column-${t.index}`,kind:"occlusion_motion_demand_column",stationIndex:t.index,x:a,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Stage ${t.index} Amplification I(u) = ${t.jellyShimmerAmplification.toFixed(4)}× (${t.inpaintStageLabel})`}),o.push({id:`flow-propainter-vace-node-${t.index}`,kind:"flow_propainter_vace_node",stationIndex:t.index,x:a,y:l*.5-8,z:0,w:14,h:l,d:14,tone:e.useSam2FlowTubeInpaint?"teal":"slate",label:`Stage ${t.index} Amortized Tube Cost c_tube = ${t.flowTubeAmortizedUnitCost.toFixed(4)}×`}),o.push({id:`temporal-coherence-budget-gauge-${t.index}`,kind:"temporal_coherence_budget_gauge",stationIndex:t.index,x:a,y:i*.5-8,z:56,w:Math.min(24,12*t.temporalTubeBudgetRatio),h:i,d:12,tone:t.isShimmerViolation?"crimson":"teal",label:`Stage ${t.index} Temporal Coherence & Budget Ratio = ${t.temporalTubeBudgetRatio.toFixed(4)}×`})}return o.push({id:"flow-gate-left",kind:"bidirectional_flow_completion_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"SAM-2 Video Mask & Bidirectional Optical-Flow Completion Gate"}),o.push({id:"flow-gate-right",kind:"bidirectional_flow_completion_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useSam2FlowTubeInpaint?"teal":"crimson",label:"Zero Jelly Shimmer & 2026 SKU Prop Swap Egress Gate"}),o.push({id:"shimmer-bar-top",kind:"zero_jelly_shimmer_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Video Inpaint Law: c_tube(u) = c_0 / (1 + u) via Flow Propagation + Latent Tube"}),o.push({id:"shimmer-bar-front",kind:"zero_jelly_shimmer_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useSam2FlowTubeInpaint?"teal":"crimson",label:"E_warp <= 0.0012 Zero Water-Ripple Shimmer & 92% Frozen Pixel Lock Line (1.0000×)"}),o}const V=new URLSearchParams(window.location.search),C=V.get("preset"),K=V.get("theme")==="light"?"light":"dark";let d=C&&C in x?C:"sam2_optical_flow_tube_inpaint_lock",c=x[d].defaultStationIndex,g=K;document.documentElement.setAttribute("data-theme",g);const Z=document.querySelector("#app");Z.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 249 · 259TH DEMO · ENTERPRISE VIDEO OBJECT REMOVAL &amp; DYNAMIC BRAND PROP REPLACEMENT STUDIO</span>
        <h1>Enterprise Video Object Removal &amp; Dynamic Brand Prop Replacement Studio</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${g.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Video Inpainting &amp; Prop Replacement Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="sam2_optical_flow_tube_inpaint_lock"
      >
        SAM-2 Memory Mask + Bidirectional Flow (ProPainter) + Wan-VACE Tube (Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_per_frame_2d_inpaint_jelly_shimmer"
      >
        Naive Per-Frame 2D LaMa/SD Inpainting (Water-Ripple Jelly Shimmer = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Video Inpainting Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SHIMMER FACTOR I(u) / TUBE COST c_tube</span>
        <strong id="kpi-tube" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">TEMPORAL COHERENCE &amp; BUDGET RATIO (C_active / C_tube)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STAGES 4 / 8 / 16 BUDGET RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">I(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">JELLY SHIMMER &amp; OCCLUSION VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STAGE SAM-2 MEMORY MASK, FLOW PROPAGATION &amp; WAN-VACE LATENT TUBE STAGE</span>
          <span id="solid-count-readout">58 solids · 17 inpainting stages</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Enterprise Video Object Removal and Dynamic Brand Prop Replacement Studio"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Video Object Removal &amp; Prop Replacement Stage (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Stage 16 (u = 1.000, c_tube = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STAGE OPTICAL-FLOW LATENT TUBE VS NAIVE PER-FRAME 2D INPAINT LEDGER</span>
          <span>c_tube = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>u</th>
                <th>I(u) = 1+u</th>
                <th>c_tube</th>
                <th>Tube Quad</th>
                <th>C / C_tube</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const J=document.querySelector("#preset-subtitle"),L=document.querySelector("#preset-badge"),Q=document.querySelector("#kpi-tube"),Y=document.querySelector("#kpi-quad"),y=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),O=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),ot=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),$=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),N=document.querySelector("#station-tbody"),B=document.querySelector("#theme-toggle");function b(e,o,t){const a=(e-t*.55)*.88,s=-o+(e*.18+t*.42)*.55;return[a,s]}function nt(e,o){return e==="teal"?o?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?o?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?o?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?o?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:o?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function st(e,o,t,a,s,l,i,n,r,h,U){const p=a*.5,u=s*.5,m=l*.5,v=b(e+p,o-u,t-m),E=b(e+p,o-u,t+m),w=b(e-p,o-u,t+m),P=b(e-p,o+u,t-m),T=b(e+p,o+u,t-m),S=b(e+p,o+u,t+m),F=b(e-p,o+u,t+m),R=nt(i,r),A=n?1.8:.7,I=n?"#ffffff":R.stroke,D=`${P[0].toFixed(1)},${P[1].toFixed(1)} ${T[0].toFixed(1)},${T[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)}`,q=`${w[0].toFixed(1)},${w[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)}`,j=`${E[0].toFixed(1)},${E[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)} ${T[0].toFixed(1)},${T[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${h}" data-solid-kind="${U}">
      <polygon points="${q}" fill="${R.left}" stroke="${I}" stroke-width="${A}" />
      <polygon points="${j}" fill="${R.right}" stroke="${I}" stroke-width="${A}" />
      <polygon points="${D}" fill="${R.top}" stroke="${I}" stroke-width="${A}" />
    </g>
  `}function k(e){const o=x[e.presetId],t=e.selectedStation,a=g==="dark";J.textContent=o.subtitle,L.textContent=o.badge,L.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Q.textContent=`I(u) = ${t.jellyShimmerAmplification.toFixed(4)}× (c_tube = ${t.flowTubeAmortizedUnitCost.toFixed(4)}×)`,Y.textContent=`Tube Quad = ${t.quadratureFlowTubeCost.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,y.textContent=`${t.temporalTubeBudgetRatio.toFixed(4)}×`,y.className=`kpi-value ${t.isShimmerViolation?"text-danger":"text-ok"}`,X.textContent=`u = ${t.propOcclusionComplexityU.toFixed(4)} | ${t.inpaintStageLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,O.textContent=`${e.violatedCount} / ${e.stationCount}`,O.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,$.value=String(t.index),at.textContent=`Stage ${t.index} (u = ${t.propOcclusionComplexityU.toFixed(3)}, c_tube = ${t.flowTubeAmortizedUnitCost.toFixed(3)}, Ratio = ${t.temporalTubeBudgetRatio.toFixed(4)}×)`;const s=G(e);ot.textContent=`${s.length} solids · ${e.stationCount} inpainting stages`;const l=[...s].sort((i,n)=>i.z-n.z||i.y-n.y||i.x-n.x);it.innerHTML=l.map(i=>st(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,a,i.id,i.kind)).join(""),N.innerHTML=e.stations.map(i=>{const n=i.index===t.index?"row-selected":"",r=i.isShimmerViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.propOcclusionComplexityU.toFixed(4)}</td>
          <td>${i.jellyShimmerAmplification.toFixed(4)}×</td>
          <td>${i.flowTubeAmortizedUnitCost.toFixed(4)}×</td>
          <td>${i.quadratureFlowTubeCost.toFixed(4)}×</td>
          <td class="${r}">${i.temporalTubeBudgetRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const n=i.getAttribute("data-preset");i.classList.toggle("active",n===e.presetId)}),window.__VIDEO_INPAINT_PROP_REPLACE_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-preset");o&&o in x&&(d=o,c=x[d].defaultStationIndex,k(_(d,c)))})});$.addEventListener("input",()=>{c=Number($.value),k(_(d,c))});N.addEventListener("click",e=>{const o=e.target.closest("tr[data-station-row]");o&&(c=Number(o.getAttribute("data-station-row")),k(_(d,c)))});B.addEventListener("click",()=>{g=g==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",g),B.textContent=`Theme: ${g.toUpperCase()}`,k(_(d,c))});k(_(d,c));
