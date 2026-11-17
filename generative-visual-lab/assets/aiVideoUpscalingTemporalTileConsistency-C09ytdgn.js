import"./modulepreload-polyfill-B5Qt9EMX.js";const k={temporal_optical_flow_tile_upscale_lock:{id:"temporal_optical_flow_tile_upscale_lock",label:"Bidirectional Optical-Flow Temporal SR + Hann Overlapped-Tile Blend + 10-Bit Master (c_4k = c_0/(1+u), Lock = 1.0000×)",labelZh:"双向光流时序对齐超分 + 汉宁窗重叠分块融合 + 10-bit 防断层母带（单条成本 c_0/(1+u)，稳定与预算比恒锁 1.0000×）",subtitle:"Couples bidirectional optical-flow feature warping across 8-frame sliding windows with 25% Raised-Cosine (Hann) overlapped tile blending and 10-bit ProRes/HEVC output, locking temporal stability & 4K mastering ratio at 1.0000× across all 17 stages.",subtitleZh:"将“双向光流跨帧特征对齐（消除毛孔/发丝/织物帧间高频闪烁）”与“25% 重叠率二维升余弦（Hann Window）分块潜空间无缝融合（消除 4K 九宫格拼缝）”及“10-bit 色深抖动输出”结合，在全 17 个 4K 60fps 母带档位恒定锁死稳定与成本比 1.0000×。",useTemporalOpticalFlowUpscale:!0,defaultStationIndex:16,badge:"4K TEMPORAL & SEAM-FREE LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"4K 时序防抖与零拼缝锁死 · 1.0000×（0/17 站闪烁）",description:"Enterprise keynote LED walls and broadcast TVCs upscale native 720p/1080p AI video clips to 4K 60fps without inter-frame boiling or tile grid seams using optical-flow temporal conditioning and Hann-windowed latent tiling.",descriptionZh:"企业发布会巨幕 LED 与电视广告母带将原生 720p/1080p AI 视频超分至 4K 60fps 时，通过光流时序卷曲与汉宁窗重叠分块，彻底根除单帧超分带来的“蚂蚁爬高频闪烁”与分块网格印。"},naive_per_frame_independent_upscale_flicker:{id:"naive_per_frame_independent_upscale_flicker",label:"Naive Per-Frame Independent 2D Upscaling & Hard Tile Borders (Boiling & Seam Overrun = 1 + u up to 2.0000×)",labelZh:"朴素单帧独立 2D 超分与无重叠硬分块（高频细节闪烁沸腾、天空九宫格拼缝明显，返工超支达 2.0000×）",subtitle:"Runs single-image 2D super-resolution independently on each video frame with non-overlapping tiles and 8-bit quantization, causing severe texture boiling, visible grid seams, and 2.0000× mastering rework overrun at Stage 16.",subtitleZh:"把视频拆成单张图片逐帧独立跑 2D 图像超分且使用无重叠硬分块与 8-bit 导出，导致人物皮肤与背景树叶在帧与帧之间剧烈闪烁、天空渐变出现九宫格拼缝与色彩断层，使第 16 档 4K 大屏母带返工成本翻倍至 2.0000×。",useTemporalOpticalFlowUpscale:!1,defaultStationIndex:16,badge:"TEMPORAL BOILING & TILE SEAMS · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"帧间闪烁与拼缝超支 · 最高 2.0000×（16/17 站违背）",description:"Applying memoryless 2D image super-resolution frame-by-frame to AI video outputs destroys temporal coherence and fails broadcast QC across 16/17 detail tiers.",descriptionZh:"对 AI 视频逐帧套用无时间记忆的 2D 静态图片超分算法，会在高密度纹理区产生刺眼的时序噪点沸腾，无法通过广电与品牌大屏质检。"}},f=17,O=["Stage 0: Native 720p/1080p AI Video Ingest (Color Space Lock)","Stage 1: RAFT / GMFlow Bidirectional Optical-Flow Estimation","Stage 2: Occlusion-Aware Forward/Backward Flow Masking","Stage 3: 8-Frame Sliding-Window Recurrent Feature Propagation","Stage 4: 25% Overlapped Latent Tile Grid Partitioning","Stage 5: 2D Raised-Cosine (Hann) Window Seam-Free Blending","Stage 6: Cross-Tile Global Color & Exposure Mean/Std Lock","Stage 7: High-Frequency Skin Pore & Fabric Weave Temporal Clamp","Stage 8: RIFE / Flow-Guided 24fps-to-60fps Motion Interpolation","Stage 9: Scene-Cut Boundary Detector (Reset Flow Across Cuts)","Stage 10: Vector Text & Logo Overlay Bypass (Post-SR Composite)","Stage 11: 10-Bit TPDF Blue-Noise Sky Gradient De-Banding","Stage 12: Rec.709 / Rec.2020 PQ HDR Gamut Mapping Lock","Stage 13: Temporal LPIPS (tLP ≤ 0.008) Flicker Audit Gate","Stage 14: VMAF 4K Broadcast Quality Score Gate (≥ 93.5 Pass)","Stage 15: ProRes 422 HQ / 10-Bit HEVC Hardware Encoding","Stage 16: Full 4K 60fps Keynote LED Wall Master (0.50 c_0)"];function G(e){const t=1+Math.max(0,e),o=1/t;return{perFrameFlickerAmplification:t,temporalUpscaleUnitCost:o}}function H(e,i=64){const o=1/(1+Math.max(0,e)),l=Math.max(2,i%2===0?i:i+1),s=1/l;let a=2*o;for(let n=1;n<l;n++){const r=n*s,S=n%2===1?4:2;a+=S*(2*o*r)}return s/3*a}function Q(e,i){const t=Math.max(0,Math.min(f-1,e)),o=t/(f-1),l=G(o),s=H(o,64),a=1+o,n=i?1:a;return{index:t,upscaleTextureDensityU:o,perFrameFlickerAmplification:l.perFrameFlickerAmplification,temporalUpscaleUnitCost:l.temporalUpscaleUnitCost,quadratureOpticalFlowTileCost:s,temporalStabilityBudgetRatio:n,naivePerFrameFlickerRatio:a,upscaleMasteringStageLabel:O[t]??O[0],isTemporalFlickerViolation:n>1.0001}}function F(e,i){const t=k[e],o=[];let l=0,s=0;for(let n=0;n<f;n++){const r=Q(n,t.useTemporalOpticalFlowUpscale);o.push(r),r.isTemporalFlickerViolation&&l++;const S=Math.abs(r.temporalUpscaleUnitCost-r.quadratureOpticalFlowTileCost);S>s&&(s=S)}const a=i!==void 0?Math.max(0,Math.min(f-1,i)):t.defaultStationIndex;return{presetId:e,useTemporalOpticalFlowUpscale:t.useTemporalOpticalFlowUpscale,stationCount:f,selectedStation:o[a],stations:o,station4Ratio:o[4].temporalStabilityBudgetRatio,station8Ratio:o[8].temporalStabilityBudgetRatio,station12Ratio:o[12].temporalStabilityBudgetRatio,station16Ratio:o[16].temporalStabilityBudgetRatio,violatedCount:l,maxQuadratureError:s,verdict:l===0?"TEMPORAL_4K_TILE_UPSCALE_LOCKED":"NAIVE_PER_FRAME_FLICKER_SEAM_OVERRUN"}}function W(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise 4K 60fps AI Video Upscaling & Temporal Tile Consistency Plinth"}),i.push({id:"upscale-rail-front",kind:"optical_flow_warp_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"2D Hann-Window Overlapped Tile Blend & 10-Bit De-Banding Bus (1.0000×)"}),i.push({id:"upscale-rail-back",kind:"optical_flow_warp_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Bidirectional Optical-Flow 8-Frame Recurrent Feature Propagation Bus"});for(const t of e.stations){const o=(t.index-8)*30,l=22*t.perFrameFlickerAmplification,s=44*t.temporalUpscaleUnitCost,a=36*t.temporalStabilityBudgetRatio;i.push({id:`texture-density-column-${t.index}`,kind:"texture_density_column",stationIndex:t.index,x:o,y:l*.5-8,z:-56,w:14,h:l,d:14,tone:"amber",label:`Stage ${t.index} Amplification U(u) = ${t.perFrameFlickerAmplification.toFixed(4)}× (${t.upscaleMasteringStageLabel})`}),i.push({id:`hann-tile-feather-node-${t.index}`,kind:"hann_tile_feather_node",stationIndex:t.index,x:o,y:s*.5-8,z:0,w:14,h:s,d:14,tone:e.useTemporalOpticalFlowUpscale?"teal":"slate",label:`Stage ${t.index} Amortized 4K Cost c_4k = ${t.temporalUpscaleUnitCost.toFixed(4)}×`}),i.push({id:`temporal-stability-gauge-${t.index}`,kind:"temporal_stability_gauge",stationIndex:t.index,x:o,y:a*.5-8,z:56,w:Math.min(24,12*t.temporalStabilityBudgetRatio),h:a,d:12,tone:t.isTemporalFlickerViolation?"crimson":"teal",label:`Stage ${t.index} Temporal Stability & Cost Ratio = ${t.temporalStabilityBudgetRatio.toFixed(4)}×`})}return i.push({id:"master-gate-left",kind:"prores_10bit_master_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Bidirectional Optical-Flow Warping & Scene-Cut Boundary Reset Gate"}),i.push({id:"master-gate-right",kind:"prores_10bit_master_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useTemporalOpticalFlowUpscale?"teal":"crimson",label:"4K 60fps 10-Bit ProRes/HEVC Encoder & VMAF/tLP Broadcast QC Gate"}),i.push({id:"vmaf-bar-top",kind:"vmaf_tlp_lock_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"4K Mastering Law: c_4k(u) = c_0 / (1 + u) via Flow-Warped Hann Tiling"}),i.push({id:"vmaf-bar-front",kind:"vmaf_tlp_lock_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useTemporalOpticalFlowUpscale?"teal":"crimson",label:"Zero Inter-Frame Boiling & Zero Tile Grid Seam Lock Line (1.0000×)"}),i}const B=new URLSearchParams(window.location.search),I=B.get("preset"),Z=B.get("theme")==="light"?"light":"dark";let d=I&&I in k?I:"temporal_optical_flow_tile_upscale_lock",c=k[d].defaultStationIndex,m=Z;document.documentElement.setAttribute("data-theme",m);const z=document.querySelector("#app");z.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 236 · 246TH DEMO · ENTERPRISE 4K AI VIDEO UPSCALING & TEMPORAL TILE CONSISTENCY STUDIO</span>
        <h1>Enterprise 4K AI Video Upscaling & Temporal Tile Consistency Studio</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${m.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="4K Video Upscaling Pipeline Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="temporal_optical_flow_tile_upscale_lock"
      >
        Bidirectional Optical-Flow Temporal SR + Hann Tile Blend (4K Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_per_frame_independent_upscale_flicker"
      >
        Naive Per-Frame Independent 2D Upscaling (Flicker & Seam Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="4K Video Mastering Readouts">
      <article class="kpi-card">
        <span class="kpi-label">FLICKER FACTOR U(u) / 4K MASTER UNIT COST c_4k</span>
        <strong id="kpi-upscale" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">TEMPORAL STABILITY & COST RATIO (C_active / C_temporal)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">MASTERING STAGES 4 / 8 / 16 STABILITY RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">U(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">INTER-FRAME BOILING & TILE SEAM VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STAGE 4K OPTICAL-FLOW TEMPORAL SR & HANN TILE BLEND STAGE</span>
          <span id="solid-count-readout">58 solids · 17 mastering stages</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Enterprise 4K AI Video Upscaling and Temporal Tile Consistency Studio"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect 4K Video Mastering & Tile Stage (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Stage 16 (u = 1.000, c_4k = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STAGE TEMPORAL FLOW SR VS PER-FRAME 2D UPSCALE LEDGER</span>
          <span>c_4k = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Stg</th>
                <th>u</th>
                <th>U(u) = 1+u</th>
                <th>c_4k</th>
                <th>Flow Quad</th>
                <th>C / C_temporal</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Y=document.querySelector("#preset-subtitle"),U=document.querySelector("#preset-badge"),j=document.querySelector("#kpi-upscale"),X=document.querySelector("#kpi-quad"),y=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),P=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),it=document.querySelector("#solid-count-readout"),at=document.querySelector("#rig-svg"),R=document.querySelector("#station-slider"),ot=document.querySelector("#station-slider-label"),V=document.querySelector("#station-tbody"),M=document.querySelector("#theme-toggle");function b(e,i,t){const o=(e-t*.55)*.88,l=-i+(e*.18+t*.42)*.55;return[o,l]}function nt(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function lt(e,i,t,o,l,s,a,n,r,S,D){const p=o*.5,u=l*.5,g=s*.5,A=b(e+p,i-u,t-g),T=b(e+p,i-u,t+g),w=b(e-p,i-u,t+g),L=b(e-p,i+u,t-g),_=b(e+p,i+u,t-g),x=b(e+p,i+u,t+g),E=b(e-p,i+u,t+g),C=nt(a,r),v=n?1.8:.7,$=n?"#ffffff":C.stroke,N=`${L[0].toFixed(1)},${L[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)}`,K=`${w[0].toFixed(1)},${w[1].toFixed(1)} ${T[0].toFixed(1)},${T[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)}`,q=`${T[0].toFixed(1)},${T[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${S}" data-solid-kind="${D}">
      <polygon points="${K}" fill="${C.left}" stroke="${$}" stroke-width="${v}" />
      <polygon points="${q}" fill="${C.right}" stroke="${$}" stroke-width="${v}" />
      <polygon points="${N}" fill="${C.top}" stroke="${$}" stroke-width="${v}" />
    </g>
  `}function h(e){const i=k[e.presetId],t=e.selectedStation,o=m==="dark";Y.textContent=i.subtitle,U.textContent=i.badge,U.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,j.textContent=`U(u) = ${t.perFrameFlickerAmplification.toFixed(4)}× (c_4k = ${t.temporalUpscaleUnitCost.toFixed(4)}×)`,X.textContent=`Flow Quad = ${t.quadratureOpticalFlowTileCost.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,y.textContent=`${t.temporalStabilityBudgetRatio.toFixed(4)}×`,y.className=`kpi-value ${t.isTemporalFlickerViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${t.upscaleTextureDensityU.toFixed(4)} | ${t.upscaleMasteringStageLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,P.textContent=`${e.violatedCount} / ${e.stationCount}`,P.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,R.value=String(t.index),ot.textContent=`Stage ${t.index} (u = ${t.upscaleTextureDensityU.toFixed(3)}, c_4k = ${t.temporalUpscaleUnitCost.toFixed(3)}, Ratio = ${t.temporalStabilityBudgetRatio.toFixed(4)}×)`;const l=W(e);it.textContent=`${l.length} solids · ${e.stationCount} mastering stages`;const s=[...l].sort((a,n)=>a.z-n.z||a.y-n.y||a.x-n.x);at.innerHTML=s.map(a=>lt(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===t.index,o,a.id,a.kind)).join(""),V.innerHTML=e.stations.map(a=>{const n=a.index===t.index?"row-selected":"",r=a.isTemporalFlickerViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.upscaleTextureDensityU.toFixed(4)}</td>
          <td>${a.perFrameFlickerAmplification.toFixed(4)}×</td>
          <td>${a.temporalUpscaleUnitCost.toFixed(4)}×</td>
          <td>${a.quadratureOpticalFlowTileCost.toFixed(4)}×</td>
          <td class="${r}">${a.temporalStabilityBudgetRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const n=a.getAttribute("data-preset");a.classList.toggle("active",n===e.presetId)}),window.__VIDEO_UPSCALING_TEMPORAL_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in k&&(d=i,c=k[d].defaultStationIndex,h(F(d,c)))})});R.addEventListener("input",()=>{c=Number(R.value),h(F(d,c))});V.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),h(F(d,c)))});M.addEventListener("click",()=>{m=m==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",m),M.textContent=`Theme: ${m.toUpperCase()}`,h(F(d,c))});h(F(d,c));
