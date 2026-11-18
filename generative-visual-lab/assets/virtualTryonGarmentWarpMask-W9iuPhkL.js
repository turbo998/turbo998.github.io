import"./modulepreload-polyfill-B5Qt9EMX.js";const T={densepose_vton_garment_identity_lock:{id:"densepose_vton_garment_identity_lock",label:"DensePose UV Garment Warp (IDM-VTON / CatVTON) + Face/Hand Pixel Lock (c_vton = c_0/(1+u), Fidelity = 1.0000×)",labelZh:"DensePose 人体 UV 服装经纬形变 (IDM-VTON / CatVTON) + 面部/手部原图锁死（成本与保真比恒锁 1.0000×）",subtitle:"Warps flat-lay garment textures onto 3D DensePose body UV coordinates via dual-UNet attention while freezing model face, hands, and background pixels, locking garment fidelity & budget ratio at 1.0000× across all 17 fashion pose tiers.",subtitleZh:"通过平铺服装图（Flat-Lay Garment）双分支特征注入与 DensePose 三维人体表面 UV 坐标对齐，在真实还原衣服褶皱垂坠感的同时 100% 保持格纹/条纹/胸口刺绣 Logo 不变形，并硬锁死模特面部与手部原图，在全 17 个姿态档位恒锁 1.0000×。",useDensePoseVtonPipeline:!0,defaultStationIndex:16,badge:"GARMENT WEAVE & POSE LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"服装纹理与姿态锁死 · 1.0000×（0/17 站乱码变形）",description:"Enterprise fashion e-commerce pipelines separate rigid/packaged SKU relighting from deformable apparel virtual try-on by conditioning IDM-VTON / CatVTON on DensePose UV body maps, agnostic garment masks, and pixel-locked face/hand regions.",descriptionZh:"服装时尚电商与标品换背景不同，布料需随模特肢体动作发生非线性褶皱形变；企业管线通过 DensePose UV 映射 + 无关服装掩码（Agnostic Mask）+ 面部手部像素回贴，实现万款春装零实拍上身。"},naive_generic_t2i_apparel_hallucination:{id:"naive_generic_t2i_apparel_hallucination",label:"Naive Generic Text-to-Image / Loose Inpainting Apparel Redraw (Weave/Logo Drift Overrun = 1 + u up to 2.0000×)",labelZh:"朴素通用文生图/无 UV 约束局部重绘（条纹格纹错乱、胸标变形、手指畸变导致返工超支达 2.0000×）",subtitle:"Describes the garment in text or uses unwarped inpainting without DensePose UV spatial correspondence, scrambling plaid/stripe counts, mutating collar cuts, and inflating retake GPU spend by 2.0000× at Tier 16.",subtitleZh:"仅用文字描述服装款式或使用无 DensePose UV 空间对齐的普通局部重绘，导致苏格兰格纹条数错乱、领口剪裁变形、模特手部遮挡处长出多余手指，使第 16 档跨姿态批量上身返工成本翻倍至 2.0000×。",useDensePoseVtonPipeline:!1,defaultStationIndex:16,badge:"WEAVE DRIFT & HAND ARTIFACTS · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"织物纹理错乱与返工 · 最高 2.0000×（16/17 站违背）",description:'Prompting generic diffusion models to "put this shirt on the model" without explicit flat-lay spatial attention and DensePose UV warping fails commercial fashion QA across 16/17 pose tiers.',descriptionZh:"没有平铺服装图的空间交叉注意力绑定与 DensePose 人体网格引导，通用扩散模型根本无法还原特定 SKU 的纽扣数量、刺绣花纹与针织肌理。"}},v=17,A=["Tier 0: Front Studio Standing (Flat-Lay Garment Encoder Lock)","Tier 1: SCHP Human Parsing + Agnostic Torso Mask Generation","Tier 2: DensePose 24-Part Body Surface UV Coordinate Map","Tier 3: Scottish Tartan Plaid Weave Continuity Preservation","Tier 4: Embroidered Chest Logo & Typography Spatial Lock","Tier 5: Crossed-Arms Hand Occlusion Alpha Foreground Restore","Tier 6: Walking Stride Dynamic Hemline & Pleat Drape Simulation","Tier 7: Sheer Chiffon / Lace Semi-Transparent Skin Blend","Tier 8: Heavy Winter Down-Jacket Volume Expansion Mask","Tier 9: Multi-Layer Outfit (Inner Tee + Unbuttoned Blazer)","Tier 10: High-Waist Denim Seam & Pocket Rivet Alignment","Tier 11: Diverse Body-Mass-Index (XS to 3XL) UV Elastic Warp","Tier 12: Hair Strand Foreground Matting Over Collar Line","Tier 13: Wan 2.2 / Kling 2.1 Runway Catwalk Video VTON","Tier 14: Colorway Matrix (1 Garment Structure × 12 Dye LUTs)","Tier 15: LPIPS / SSIM Fabric Texture QA Gate (≥ 0.94 Pass)","Tier 16: Full 5,000-SKU Seasonal Lookbook Factory (0.50 c_0)"];function q(e){const t=1+Math.max(0,e),n=1/t;return{naiveT2iRetakeAmplification:t,vtonAmortizedUnitCost:n}}function z(e,i=64){const n=1/(1+Math.max(0,e)),s=Math.max(2,i%2===0?i:i+1),r=1/s;let o=2*n;for(let a=1;a<s;a++){const d=a*r,m=a%2===1?4:2;o+=m*(2*n*d)}return r/3*o}function B(e,i){const t=Math.max(0,Math.min(v-1,e)),n=t/(v-1),s=q(n),r=z(n,64),o=1+n,a=i?1:o;return{index:t,posePatternComplexityU:n,naiveT2iRetakeAmplification:s.naiveT2iRetakeAmplification,vtonAmortizedUnitCost:s.vtonAmortizedUnitCost,quadratureUvWarpCost:r,garmentFidelityCostRatio:a,naiveT2iOverrunRatio:o,vtonPipelineStageLabel:A[t]??A[0],isGarmentDistortionViolation:a>1.0001}}function k(e,i){const t=T[e],n=[];let s=0,r=0;for(let a=0;a<v;a++){const d=B(a,t.useDensePoseVtonPipeline);n.push(d),d.isGarmentDistortionViolation&&s++;const m=Math.abs(d.vtonAmortizedUnitCost-d.quadratureUvWarpCost);m>r&&(r=m)}const o=i!==void 0?Math.max(0,Math.min(v-1,i)):t.defaultStationIndex;return{presetId:e,useDensePoseVtonPipeline:t.useDensePoseVtonPipeline,stationCount:v,selectedStation:n[o],stations:n,station4Ratio:n[4].garmentFidelityCostRatio,station8Ratio:n[8].garmentFidelityCostRatio,station12Ratio:n[12].garmentFidelityCostRatio,station16Ratio:n[16].garmentFidelityCostRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"DENSEPOSE_VTON_GARMENT_LOCKED":"NAIVE_T2I_APPAREL_DISTORTION_OVERRUN"}}function Q(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise Fashion Virtual Try-On (DensePose UV + IDM-VTON/CatVTON) Plinth"}),i.push({id:"vton-rail-front",kind:"densepose_uv_warp_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Model Face/Hand/Hair Foreground Pixel Restore & Weave Lock Bus (1.0000×)"}),i.push({id:"vton-rail-back",kind:"densepose_uv_warp_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"DensePose 24-Part Body UV Map + Flat-Lay Garment Attention Bus"});for(const t of e.stations){const n=(t.index-8)*30,s=22*t.naiveT2iRetakeAmplification,r=44*t.vtonAmortizedUnitCost,o=36*t.garmentFidelityCostRatio;i.push({id:`pose-complexity-column-${t.index}`,kind:"pose_complexity_column",stationIndex:t.index,x:n,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Tier ${t.index} Pose Factor W(u) = ${t.naiveT2iRetakeAmplification.toFixed(4)}× (${t.vtonPipelineStageLabel})`}),i.push({id:`vton-garment-lock-node-${t.index}`,kind:"vton_garment_lock_node",stationIndex:t.index,x:n,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useDensePoseVtonPipeline?"teal":"slate",label:`Tier ${t.index} Amortized VTON Cost c_vton = ${t.vtonAmortizedUnitCost.toFixed(4)}×`}),i.push({id:`garment-fidelity-gauge-${t.index}`,kind:"garment_fidelity_gauge",stationIndex:t.index,x:n,y:o*.5-8,z:56,w:Math.min(24,12*t.garmentFidelityCostRatio),h:o,d:12,tone:t.isGarmentDistortionViolation?"crimson":"teal",label:`Tier ${t.index} Garment Fidelity & Cost Ratio = ${t.garmentFidelityCostRatio.toFixed(4)}×`})}return i.push({id:"flatlay-gate-left",kind:"flatlay_ingest_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Flat-Lay Garment High-Res Encoder & SCHP Agnostic Mask Gate"}),i.push({id:"flatlay-gate-right",kind:"flatlay_ingest_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useDensePoseVtonPipeline?"teal":"crimson",label:"Face/Hand/Hair Alpha Restore & Catwalk Video I2V Delivery Gate"}),i.push({id:"identity-bar-top",kind:"identity_hand_mask_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Virtual Try-On Law: c_vton(u) = c_0 / (1 + u) via DensePose UV + Dual-UNet Lock"}),i.push({id:"identity-bar-front",kind:"identity_hand_mask_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useDensePoseVtonPipeline?"teal":"crimson",label:"Zero Tartan/Logo Warp & 100% Model Face/Hand Preservation Lock Line (1.0000×)"}),i}const N=new URLSearchParams(window.location.search),P=N.get("preset"),Y=N.get("theme")==="light"?"light":"dark";let l=P&&P in T?P:"densepose_vton_garment_identity_lock",c=T[l].defaultStationIndex,b=Y;document.documentElement.setAttribute("data-theme",b);const Z=document.querySelector("#app");Z.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ENTERPRISE AI SOLUTION ARCHITECTURE · 243RD DEMO · ENTERPRISE FASHION VIRTUAL TRY-ON: DENSEPOSE GARMENT WARP & IDENTITY LOCK STUDIO</span>
        <h1>Enterprise Fashion Virtual Try-On: DensePose Garment Warp & Identity Lock Studio</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${b.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Virtual Try-On Pipeline Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="densepose_vton_garment_identity_lock"
      >
        DensePose UV Garment Warp (IDM-VTON / CatVTON) + Face/Hand Lock (Ratio = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_generic_t2i_apparel_hallucination"
      >
        Naive Generic T2I / Unwarped Inpainting (Weave Drift Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Virtual Try-On Readouts">
      <article class="kpi-card">
        <span class="kpi-label">POSE FACTOR W(u) / VTON UNIT COST c_vton</span>
        <strong id="kpi-vton" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">GARMENT FIDELITY & COST RATIO (C_active / C_vton)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">POSE TIERS 4 / 8 / 16 FIDELITY RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">W(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">WEAVE DRIFT & HAND OCCLUSION VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-TIER DENSEPOSE UV GARMENT WARP & FACE/HAND LOCK STAGE</span>
          <span id="solid-count-readout">58 solids · 17 pose tiers</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Enterprise Fashion Virtual Try-On DensePose Garment Warp Studio"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Fashion Pose & Fabric Complexity Tier (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Tier 16 (u = 1.000, c_vton = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-TIER DENSEPOSE VTON VS GENERIC T2I APPAREL LEDGER</span>
          <span>c_vton = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>u</th>
                <th>W(u) = 1+u</th>
                <th>c_vton</th>
                <th>UV Quad</th>
                <th>C / C_vton</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const K=document.querySelector("#preset-subtitle"),O=document.querySelector("#preset-badge"),j=document.querySelector("#kpi-vton"),X=document.querySelector("#kpi-quad"),D=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),U=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),it=document.querySelector("#solid-count-readout"),ot=document.querySelector("#rig-svg"),R=document.querySelector("#station-slider"),nt=document.querySelector("#station-slider-label"),M=document.querySelector("#station-tbody"),L=document.querySelector("#theme-toggle");function x(e,i,t){const n=(e-t*.55)*.88,s=-i+(e*.18+t*.42)*.55;return[n,s]}function at(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function st(e,i,t,n,s,r,o,a,d,m,G){const p=n*.5,u=s*.5,g=r*.5,$=x(e+p,i-u,t-g),E=x(e+p,i-u,t+g),I=x(e-p,i-u,t+g),V=x(e-p,i+u,t-g),C=x(e+p,i+u,t-g),h=x(e+p,i+u,t+g),S=x(e-p,i+u,t+g),y=at(o,d),_=a?1.8:.7,F=a?"#ffffff":y.stroke,w=`${V[0].toFixed(1)},${V[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${h[0].toFixed(1)},${h[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)}`,W=`${I[0].toFixed(1)},${I[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)} ${h[0].toFixed(1)},${h[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)}`,H=`${E[0].toFixed(1)},${E[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${h[0].toFixed(1)},${h[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${m}" data-solid-kind="${G}">
      <polygon points="${W}" fill="${y.left}" stroke="${F}" stroke-width="${_}" />
      <polygon points="${H}" fill="${y.right}" stroke="${F}" stroke-width="${_}" />
      <polygon points="${w}" fill="${y.top}" stroke="${F}" stroke-width="${_}" />
    </g>
  `}function f(e){const i=T[e.presetId],t=e.selectedStation,n=b==="dark";K.textContent=i.subtitle,O.textContent=i.badge,O.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,j.textContent=`W(u) = ${t.naiveT2iRetakeAmplification.toFixed(4)}× (c_vton = ${t.vtonAmortizedUnitCost.toFixed(4)}×)`,X.textContent=`UV Quad = ${t.quadratureUvWarpCost.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,D.textContent=`${t.garmentFidelityCostRatio.toFixed(4)}×`,D.className=`kpi-value ${t.isGarmentDistortionViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${t.posePatternComplexityU.toFixed(4)} | ${t.vtonPipelineStageLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,U.textContent=`${e.violatedCount} / ${e.stationCount}`,U.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,R.value=String(t.index),nt.textContent=`Tier ${t.index} (u = ${t.posePatternComplexityU.toFixed(3)}, c_vton = ${t.vtonAmortizedUnitCost.toFixed(3)}, Ratio = ${t.garmentFidelityCostRatio.toFixed(4)}×)`;const s=Q(e);it.textContent=`${s.length} solids · ${e.stationCount} pose tiers`;const r=[...s].sort((o,a)=>o.z-a.z||o.y-a.y||o.x-a.x);ot.innerHTML=r.map(o=>st(o.x,o.y,o.z,o.w,o.h,o.d,o.tone,o.stationIndex===t.index,n,o.id,o.kind)).join(""),M.innerHTML=e.stations.map(o=>{const a=o.index===t.index?"row-selected":"",d=o.isGarmentDistortionViolation?"cell-fail":"cell-pass";return`
        <tr class="${a}" data-station-row="${o.index}">
          <td>#${o.index}</td>
          <td>${o.posePatternComplexityU.toFixed(4)}</td>
          <td>${o.naiveT2iRetakeAmplification.toFixed(4)}×</td>
          <td>${o.vtonAmortizedUnitCost.toFixed(4)}×</td>
          <td>${o.quadratureUvWarpCost.toFixed(4)}×</td>
          <td class="${d}">${o.garmentFidelityCostRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(o=>{const a=o.getAttribute("data-preset");o.classList.toggle("active",a===e.presetId)}),window.__VIRTUAL_TRYON_GARMENT_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in T&&(l=i,c=T[l].defaultStationIndex,f(k(l,c)))})});R.addEventListener("input",()=>{c=Number(R.value),f(k(l,c))});M.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),f(k(l,c)))});L.addEventListener("click",()=>{b=b==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",b),L.textContent=`Theme: ${b.toUpperCase()}`,f(k(l,c))});f(k(l,c));
