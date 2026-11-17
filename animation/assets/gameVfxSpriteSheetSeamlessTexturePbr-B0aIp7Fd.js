import"./modulepreload-polyfill-B5Qt9EMX.js";const x={circular_pbr_delight_loop_atlas_lock:{id:"circular_pbr_delight_loop_atlas_lock",label:"Toroidal Circular-Conv2D + De-Lighted 5-Map PBR + Cyclic 8×8 VFX Sprite Atlas (c_pbr = c_0/(1+u), Seam = 0.00px, Lock = 1.0000×)",labelZh:"环形卷积（Circular Conv2D）四方连续 + 去高光 5 通道 PBR 分解 + 8×8 闭环序列帧特效图集（单资产成本 c_0/(1+u)，恒锁 1.0000×）",subtitle:"Enforces toroidal circular padding in UNet/VAE, decomposes intrinsic flat-lit Albedo/Normal/Roughness/Metallic/Height maps, and packs 64-frame cyclic premultiplied-alpha VFX flipbooks across all 17 stages.",subtitleZh:"在 UNet 与 VAE 全层启用环形拓扑卷积（Circular Padding）实现四方连续零接缝，剥离方向光输出纯净 BaseColor/Normal/ORM/Height 五通道贴图，并以首尾闭环潜空间生成 8×8 预乘 Alpha 特效序列帧，全 17 阶段恒锁 1.0000×。",useCircularPbrAndLoopAtlas:!0,defaultStationIndex:16,badge:"TOROIDAL PBR & CYCLIC VFX LOCKED · 1.0000× (0/17 SEAMS)",badgeZh:"无缝 PBR 与闭环序列帧锁死 · 1.0000×（0/17 站十字缝或死黑影）",description:"UE5 and Unity art pipelines eliminate UV tiling seams, baked wrong-way shadows, and VFX flipbook jump-cuts via toroidal convolution and intrinsic PBR decomposition.",descriptionZh:"UE5 与 Unity 工业化美术管线通过“环形卷积无缝平铺 + 本征去光照 PBR 五图分解 + 闭环预乘 Alpha 序列帧”彻底消灭平铺十字纹与死黑阴影。"},naive_t2i_baked_shadow_tile_seam:{id:"naive_t2i_baked_shadow_tile_seam",label:"Naive Zero-Padded T2I Texture & Open-Loop Video Sprite Extraction (UV Seam & Baked-Shadow Overrun = 1 + u up to 2.0000×)",labelZh:"朴素文生图直出贴图与开环视频抽帧图集（平铺现十字接缝、颜色图混入死黑阴影、特效首尾跳帧黑边，返工超支达 2.0000×）",subtitle:"Generates textures with standard zero-padded convolutions and bakes directional sunlight/shadows into RGB pixels, causing visible 10×10 UV grid seams, wrong-way lighting in 3D engines, and 2.0000× TA rework at Stage 16.",subtitleZh:"直接拿普通文生图（Zero-Padding）输出贴图并塞进 UE5/Unity 漫反射通道，不仅在 10×10 地面平铺时出现刺眼的十字接缝与重复亮斑，更因侧光死黑阴影被焊死在贴图里导致引擎转光穿帮，第 16 阶段技美返工翻倍至 2.0000×。",useCircularPbrAndLoopAtlas:!1,defaultStationIndex:16,badge:"UV SEAMS & BAKED SHADOWS · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"十字接缝与烘焙死影 · 最高 2.0000×（16/17 站违背）",description:"Zero-padded conv layers break toroidal boundary continuity while baked shadows violate PBR energy conservation, doubling technical-artist cleanup cost across 16/17 stages.",descriptionZh:"零填充卷积破坏了环面边界连续性，而混入高光阴影的贴图违背了 PBR 能量守恒，在 16/17 个游戏资产阶段引发翻倍返工。"}},A=17,I=["Stage 0: Single Non-Tiling Decal Sticker (Baseline)","Stage 1: Toroidal Circular Padding in UNet & VAE Conv2D Layers","Stage 2: High-Pass Low-Frequency Luminance Equalization (Anti-Blotch)","Stage 3: Intrinsic De-Lighting -> Pure Diffuse Albedo BaseColor","Stage 4: Tangent-Space Normal Map (OpenGL +Y / DirectX -Y Flip)","Stage 5: Roughness / Metallic / Ambient Occlusion ORM Channel Pack","Stage 6: 16-Bit Height Displacement & POM Secant Relief Map","Stage 7: Stochastic Wang-Tile / Hex-Grid Macro-Repetition Breaker","Stage 8: Cyclic Latent Ring (z_64 == z_0) 8×8 VFX Flipbook Loop","Stage 9: Optical-Flow Sub-Frame Motion Vector Texture (MV Map)","Stage 10: Emissive Fire/Smoke Black-Background Un-Matting","Stage 11: Premultiplied-Alpha Edge Color Decontamination (0 Halo)","Stage 12: Sprite-Sheet Bounding-Box Trim & Polygon Tight Packing","Stage 13: KTX2 BasisU / ASTC / BC7 GPU Block Compression","Stage 14: Mipmap Specular Roughness Variance Preservation (Toksvig)","Stage 15: UE5 Substrate / Unity URP Lit Automated Shader Verification","Stage 16: 1,000-Asset AAA Biome Material & VFX Library (0.50 c_0)"];function z(e){const t=1+Math.max(0,e),o=1/t;return{seamShadowReworkAmplification:t,seamlessPbrAmortizedUnitCost:o}}function X(e,a=64){const o=1/(1+Math.max(0,e)),s=Math.max(2,a%2===0?a:a+1),l=1/s;let i=2*o;for(let n=1;n<s;n++){const d=n*l,m=n%2===1?4:2;i+=m*(2*o*d)}return l/3*i}function H(e,a){const t=Math.max(0,Math.min(A-1,e)),o=t/(A-1),s=z(o),l=X(o,64),i=1+o,n=a?1:i;return{index:t,materialVfxComplexityU:o,seamShadowReworkAmplification:s.seamShadowReworkAmplification,seamlessPbrAmortizedUnitCost:s.seamlessPbrAmortizedUnitCost,quadratureToroidalAtlasCost:l,engineReadyBudgetRatio:n,naiveT2iSeamOverrunRatio:i,gameAssetStageLabel:I[t]??I[0],isSeamOrShadowViolation:n>1.0001}}function k(e,a){const t=x[e],o=[];let s=0,l=0;for(let n=0;n<A;n++){const d=H(n,t.useCircularPbrAndLoopAtlas);o.push(d),d.isSeamOrShadowViolation&&s++;const m=Math.abs(d.seamlessPbrAmortizedUnitCost-d.quadratureToroidalAtlasCost);m>l&&(l=m)}const i=a!==void 0?Math.max(0,Math.min(A-1,a)):t.defaultStationIndex;return{presetId:e,useCircularPbrAndLoopAtlas:t.useCircularPbrAndLoopAtlas,stationCount:A,selectedStation:o[i],stations:o,station4Ratio:o[4].engineReadyBudgetRatio,station8Ratio:o[8].engineReadyBudgetRatio,station12Ratio:o[12].engineReadyBudgetRatio,station16Ratio:o[16].engineReadyBudgetRatio,violatedCount:s,maxQuadratureError:l,verdict:s===0?"CIRCULAR_PBR_VFX_ATLAS_LOCKED":"NAIVE_T2I_SEAM_BAKED_SHADOW_OVERRUN"}}function Z(e){const a=[];a.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Game & Virtual Production Seamless PBR Material & Looping VFX Atlas Plinth"}),a.push({id:"toroidal-rail-front",kind:"toroidal_circular_conv_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Toroidal Circular-Conv2D Seamless UV + 5-Channel ORM/Normal PBR Bus (1.0000×)"}),a.push({id:"toroidal-rail-back",kind:"toroidal_circular_conv_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Cyclic 8×8 VFX Flipbook Loop (z_64 == z_0) + Premultiplied Alpha Bus"});for(const t of e.stations){const o=(t.index-8)*30,s=22*t.seamShadowReworkAmplification,l=44*t.seamlessPbrAmortizedUnitCost,i=36*t.engineReadyBudgetRatio;a.push({id:`tiling-vfx-demand-column-${t.index}`,kind:"tiling_vfx_demand_column",stationIndex:t.index,x:o,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Stage ${t.index} Amplification M(u) = ${t.seamShadowReworkAmplification.toFixed(4)}× (${t.gameAssetStageLabel})`}),a.push({id:`delighted-pbr-5map-node-${t.index}`,kind:"delighted_pbr_5map_node",stationIndex:t.index,x:o,y:l*.5-8,z:0,w:14,h:l,d:14,tone:e.useCircularPbrAndLoopAtlas?"teal":"slate",label:`Stage ${t.index} Amortized PBR/VFX Cost c_pbr = ${t.seamlessPbrAmortizedUnitCost.toFixed(4)}×`}),a.push({id:`engine-ready-budget-gauge-${t.index}`,kind:"engine_ready_budget_gauge",stationIndex:t.index,x:o,y:i*.5-8,z:56,w:Math.min(24,12*t.engineReadyBudgetRatio),h:i,d:12,tone:t.isSeamOrShadowViolation?"crimson":"teal",label:`Stage ${t.index} Seamless Quality & Budget Ratio = ${t.engineReadyBudgetRatio.toFixed(4)}×`})}return a.push({id:"atlas-gate-left",kind:"cyclic_spritesheet_alpha_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Toroidal Circular Padding & Intrinsic De-Lighting Ingress Gate"}),a.push({id:"atlas-gate-right",kind:"cyclic_spritesheet_alpha_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useCircularPbrAndLoopAtlas?"teal":"crimson",label:"BC7/ASTC 5-Map PBR & 8×8 Cyclic VFX Flipbook Egress Gate"}),a.push({id:"pbr-bar-top",kind:"zero_seam_pbr_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Seamless Asset Law: c_pbr(u) = c_0 / (1 + u) via Toroidal Conv2D + De-Lighted PBR"}),a.push({id:"pbr-bar-front",kind:"zero_seam_pbr_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useCircularPbrAndLoopAtlas?"teal":"crimson",label:"0.00px UV Tile Seam & Zero Baked-Shadow Tech-Art Lock Line (1.0000×)"}),a}const O=new URLSearchParams(window.location.search),$=O.get("preset"),Q=O.get("theme")==="light"?"light":"dark";let r=$&&$ in x?$:"circular_pbr_delight_loop_atlas_lock",c=x[r].defaultStationIndex,h=Q;document.documentElement.setAttribute("data-theme",h);const Y=document.querySelector("#app");Y.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 244 · 254TH DEMO · GAME &amp; VIRTUAL PRODUCTION SEAMLESS PBR TEXTURE &amp; LOOPING VFX SPRITE-SHEET PIPELINE</span>
        <h1>Game &amp; Virtual Production Seamless PBR Texture &amp; Looping VFX Sprite-Sheet Pipeline</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${h.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Game PBR &amp; VFX Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="circular_pbr_delight_loop_atlas_lock"
      >
        Toroidal Circular-Conv2D + De-Lighted 5-Map PBR + Cyclic 8×8 VFX Atlas (Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_t2i_baked_shadow_tile_seam"
      >
        Naive Zero-Padded T2I Texture &amp; Open-Loop Sprite Sheet (Seam &amp; Shadow Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Game PBR &amp; VFX Readouts">
      <article class="kpi-card">
        <span class="kpi-label">REWORK FACTOR M(u) / SEAMLESS PBR COST c_pbr</span>
        <strong id="kpi-pbr" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">ENGINE-READY QUALITY &amp; BUDGET RATIO (C_active / C_pbr)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STAGES 4 / 8 / 16 BUDGET RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">M(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">UV SEAM &amp; BAKED-SHADOW VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STAGE TOROIDAL PBR DECOMPOSITION &amp; 8×8 CYCLIC VFX ATLAS STAGE</span>
          <span id="solid-count-readout">58 solids · 17 asset stages</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Game and Virtual Production Seamless PBR Texture and Looping VFX Sprite-Sheet Pipeline"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Game PBR Material &amp; VFX Flipbook Stage (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Stage 16 (u = 1.000, c_pbr = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STAGE TOROIDAL 5-MAP PBR VS NAIVE T2I SEAM/SHADOW LEDGER</span>
          <span>c_pbr = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>u</th>
                <th>M(u) = 1+u</th>
                <th>c_pbr</th>
                <th>Atlas Quad</th>
                <th>C / C_pbr</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const K=document.querySelector("#preset-subtitle"),y=document.querySelector("#preset-badge"),W=document.querySelector("#kpi-pbr"),j=document.querySelector("#kpi-quad"),w=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),V=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),at=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),F=document.querySelector("#station-slider"),ot=document.querySelector("#station-slider-label"),U=document.querySelector("#station-tbody"),M=document.querySelector("#theme-toggle");function b(e,a,t){const o=(e-t*.55)*.88,s=-a+(e*.18+t*.42)*.55;return[o,s]}function nt(e,a){return e==="teal"?a?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?a?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?a?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?a?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:a?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function st(e,a,t,o,s,l,i,n,d,m,D){const p=o*.5,u=s*.5,g=l*.5,T=b(e+p,a-u,t-g),R=b(e+p,a-u,t+g),L=b(e-p,a-u,t+g),B=b(e-p,a+u,t-g),P=b(e+p,a+u,t-g),S=b(e+p,a+u,t+g),f=b(e-p,a+u,t+g),C=nt(i,d),E=n?1.8:.7,v=n?"#ffffff":C.stroke,G=`${B[0].toFixed(1)},${B[1].toFixed(1)} ${P[0].toFixed(1)},${P[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)}`,N=`${L[0].toFixed(1)},${L[1].toFixed(1)} ${R[0].toFixed(1)},${R[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)}`,q=`${R[0].toFixed(1)},${R[1].toFixed(1)} ${T[0].toFixed(1)},${T[1].toFixed(1)} ${P[0].toFixed(1)},${P[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${m}" data-solid-kind="${D}">
      <polygon points="${N}" fill="${C.left}" stroke="${v}" stroke-width="${E}" />
      <polygon points="${q}" fill="${C.right}" stroke="${v}" stroke-width="${E}" />
      <polygon points="${G}" fill="${C.top}" stroke="${v}" stroke-width="${E}" />
    </g>
  `}function _(e){const a=x[e.presetId],t=e.selectedStation,o=h==="dark";K.textContent=a.subtitle,y.textContent=a.badge,y.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,W.textContent=`M(u) = ${t.seamShadowReworkAmplification.toFixed(4)}× (c_pbr = ${t.seamlessPbrAmortizedUnitCost.toFixed(4)}×)`,j.textContent=`Atlas Quad = ${t.quadratureToroidalAtlasCost.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,w.textContent=`${t.engineReadyBudgetRatio.toFixed(4)}×`,w.className=`kpi-value ${t.isSeamOrShadowViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${t.materialVfxComplexityU.toFixed(4)} | ${t.gameAssetStageLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,V.textContent=`${e.violatedCount} / ${e.stationCount}`,V.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,F.value=String(t.index),ot.textContent=`Stage ${t.index} (u = ${t.materialVfxComplexityU.toFixed(3)}, c_pbr = ${t.seamlessPbrAmortizedUnitCost.toFixed(3)}, Ratio = ${t.engineReadyBudgetRatio.toFixed(4)}×)`;const s=Z(e);at.textContent=`${s.length} solids · ${e.stationCount} asset stages`;const l=[...s].sort((i,n)=>i.z-n.z||i.y-n.y||i.x-n.x);it.innerHTML=l.map(i=>st(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,o,i.id,i.kind)).join(""),U.innerHTML=e.stations.map(i=>{const n=i.index===t.index?"row-selected":"",d=i.isSeamOrShadowViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.materialVfxComplexityU.toFixed(4)}</td>
          <td>${i.seamShadowReworkAmplification.toFixed(4)}×</td>
          <td>${i.seamlessPbrAmortizedUnitCost.toFixed(4)}×</td>
          <td>${i.quadratureToroidalAtlasCost.toFixed(4)}×</td>
          <td class="${d}">${i.engineReadyBudgetRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const n=i.getAttribute("data-preset");i.classList.toggle("active",n===e.presetId)}),window.__GAME_PBR_SPRITE_PIPELINE_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const a=e.getAttribute("data-preset");a&&a in x&&(r=a,c=x[r].defaultStationIndex,_(k(r,c)))})});F.addEventListener("input",()=>{c=Number(F.value),_(k(r,c))});U.addEventListener("click",e=>{const a=e.target.closest("tr[data-station-row]");a&&(c=Number(a.getAttribute("data-station-row")),_(k(r,c)))});M.addEventListener("click",()=>{h=h==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",h),M.textContent=`Theme: ${h.toUpperCase()}`,_(k(r,c))});_(k(r,c));
