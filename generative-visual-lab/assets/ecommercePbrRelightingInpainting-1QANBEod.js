import"./modulepreload-polyfill-B5Qt9EMX.js";const x={alpha_mask_iclight_pbr_relighting_lock:{id:"alpha_mask_iclight_pbr_relighting_lock",label:"Alpha-Matte SKU Pixel Lock + IC-Light PBR Relighting & Contact Shadow (c_sku = c_0/(1+u), Fidelity = 1.0000×)",labelZh:"商品 Alpha 掩码像素级锁死 + IC-Light PBR 环境重打光与接触阴影（单张成本 c_0/(1+u)，保真度与成本比恒锁 1.0000×）",subtitle:"Freezes 100% of interior SKU packaging typography and silhouette via high-precision Alpha Matte while harmonizing specular rim-light and contact shadows with IC-Light + Depth ControlNet, locking fidelity & budget ratio at 1.0000× across all 17 e-commerce scene tiers.",subtitleZh:"通过高精度商品分割掩码（BiRefNet / SAM-2 Alpha Matte）100% 冻结商品内部包装文字与工业设计轮廓，仅对背景执行 Depth Inpainting 并通过 IC-Light 拟合环境高光反射与底部接触阴影（Contact Shadow），在全 17 个电商场景光影站点恒定锁死保真度与成本比 1.0000×。",useAlphaMaskIcLightPipeline:!0,defaultStationIndex:16,badge:"SKU PIXEL & PBR LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"商品零变形与光影锁死 · 1.0000×（0/17 站穿帮）",description:"Enterprise e-commerce background replacement pipelines preserve exact product labels and barcodes via pixel-locked alpha compositing while synthesizing physically consistent rim reflections and ground shadows.",descriptionZh:"企业电商大促批量换背景管线绝不允许大模型重绘商品本体像素，而是采用“本体像素硬锁死 + 背景 Depth 生成 + IC-Light 法线边缘打光与阴影投射”，实现零假货投诉与零贴图悬浮感。"},naive_unmasked_img2img_sku_distortion_overrun:{id:"naive_unmasked_img2img_sku_distortion_overrun",label:"Naive Unmasked Global Img2Img Denoising (SKU Label Distortion & Retake Overrun = 1 + u up to 2.0000×)",labelZh:"朴素无掩码全局图生图重绘（商品本体连同背景一起加噪去噪，包装字形畸变与返工超支达 2.0000×）",subtitle:"Applies global Img2Img denoising across the product and background simultaneously, melting brand logos, warping bottle geometry, and inflating retake GPU spend by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"对商品与背景同时施加全局图生图去噪（Global Img2Img Denoising），导致护肤品瓶身 Logo 融化、数码产品按键错位，迫使美工高频返工重跑，使第 16 档强光影场景成本翻倍超支至 2.0000×。",useAlphaMaskIcLightPipeline:!1,defaultStationIndex:16,badge:"SKU DISTORTION & RETAKES · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"商品变形与返工超支 · 最高 2.0000×（16/17 站违背）",description:"Running unmasked Img2Img or loose inpainting on commercial product photography corrupts fine packaging text and industrial edges across 16/17 lighting environments.",descriptionZh:"在电商换背景中直接使用无掩码图生图或宽边缘重绘，会破坏商品工业设计倒角与丝印文字，引发消费者“货不对板”客诉。"}},C=17,P=["Tier 0: Studio White Cyclorama (BiRefNet Alpha Matte Lock)","Tier 1: Soft Window Daylight (Depth Podium + Contact AO)","Tier 2: Marble Vanity Counter (Specular Floor Reflection)","Tier 3: Botanical Forest Stream (Water Caustics Rim-Light)","Tier 4: Golden Hour Beach (Warm Sunset IC-Light Harmonize)","Tier 5: Cyberpunk Neon Desk (Dual Cyan/Magenta Rim Lock)","Tier 6: Luxury Velvet Jewellery Box (Micro-Shadow Crease)","Tier 7: Frosted Glass Perfume Stage (Refractive Backlight)","Tier 8: Brushed Aluminum Kitchen (Anisotropic Env Reflection)","Tier 9: Snow Peak Outdoor Gear (High-Key Albedo Bounce)","Tier 10: Espresso Cafe Wood Table (Warm Tungsten Falloff)","Tier 11: Rainy Car Hood Automotive (Wet Puddle Planar Mirror)","Tier 12: Minimalist Concrete Arch (Hard Sun Cast Shadow)","Tier 13: Holiday Red-Gold Campaign (Festive Bokeh Rim Lock)","Tier 14: Underwater Bubble Cosmetics (Volumetric God-Rays)","Tier 15: Dynamic Video Turntable (Wan 2.2 I2V Background)","Tier 16: Global 10k-SKU Batch Relight (c_sku = 0.5000 c_0)"];function q(e){const t=1+Math.max(0,e),a=1/t;return{unmaskedRetakeAmplification:t,iclightAmortizedUnitCost:a}}function z(e,i=64){const a=1/(1+Math.max(0,e)),s=Math.max(2,i%2===0?i:i+1),l=1/s;let o=2*a;for(let n=1;n<s;n++){const r=n*l,m=n%2===1?4:2;o+=m*(2*a*r)}return l/3*o}function V(e,i){const t=Math.max(0,Math.min(C-1,e)),a=t/(C-1),s=q(a),l=z(a,64),o=1+a,n=i?1:o;return{index:t,sceneRelightIntensityU:a,unmaskedRetakeAmplification:s.unmaskedRetakeAmplification,iclightAmortizedUnitCost:s.iclightAmortizedUnitCost,quadratureHemisphereLightCost:l,skuFidelityCostRatio:n,naiveImg2ImgOverrunRatio:o,skuRelightStageLabel:P[t]??P[0],isSkuDistortionViolation:n>1.0001}}function I(e,i){const t=x[e],a=[];let s=0,l=0;for(let n=0;n<C;n++){const r=V(n,t.useAlphaMaskIcLightPipeline);a.push(r),r.isSkuDistortionViolation&&s++;const m=Math.abs(r.iclightAmortizedUnitCost-r.quadratureHemisphereLightCost);m>l&&(l=m)}const o=i!==void 0?Math.max(0,Math.min(C-1,i)):t.defaultStationIndex;return{presetId:e,useAlphaMaskIcLightPipeline:t.useAlphaMaskIcLightPipeline,stationCount:C,selectedStation:a[o],stations:a,station4Ratio:a[4].skuFidelityCostRatio,station8Ratio:a[8].skuFidelityCostRatio,station12Ratio:a[12].skuFidelityCostRatio,station16Ratio:a[16].skuFidelityCostRatio,violatedCount:s,maxQuadratureError:l,verdict:s===0?"ALPHA_MASK_ICLIGHT_SKU_LOCKED":"NAIVE_IMG2IMG_SKU_DISTORTION_OVERRUN"}}function W(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"E-Commerce SKU Alpha-Lock & IC-Light PBR Relighting Stage Plinth"}),i.push({id:"relight-rail-front",kind:"pbr_relighting_bus_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"100% Interior SKU Pixel Freeze + Contact Shadow AO Bus (1.0000×)"}),i.push({id:"relight-rail-back",kind:"pbr_relighting_bus_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Flux/Wan Depth Inpainting + IC-Light Environment HDRI Rim-Light Bus"});for(const t of e.stations){const a=(t.index-8)*30,s=22*t.unmaskedRetakeAmplification,l=44*t.iclightAmortizedUnitCost,o=36*t.skuFidelityCostRatio;i.push({id:`scene-contrast-column-${t.index}`,kind:"scene_contrast_column",stationIndex:t.index,x:a,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Tier ${t.index} Illumination Factor S(u) = ${t.unmaskedRetakeAmplification.toFixed(4)}× (${t.skuRelightStageLabel})`}),i.push({id:`iclight-alpha-lock-node-${t.index}`,kind:"iclight_alpha_lock_node",stationIndex:t.index,x:a,y:l*.5-8,z:0,w:14,h:l,d:14,tone:e.useAlphaMaskIcLightPipeline?"teal":"slate",label:`Tier ${t.index} Amortized Relight Cost c_sku = ${t.iclightAmortizedUnitCost.toFixed(4)}×`}),i.push({id:`sku-fidelity-gauge-${t.index}`,kind:"sku_fidelity_gauge",stationIndex:t.index,x:a,y:o*.5-8,z:56,w:Math.min(24,12*t.skuFidelityCostRatio),h:o,d:12,tone:t.isSkuDistortionViolation?"crimson":"teal",label:`Tier ${t.index} SKU Fidelity & Cost Ratio = ${t.skuFidelityCostRatio.toFixed(4)}×`})}return i.push({id:"matting-gate-left",kind:"matting_guardrail_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"BiRefNet Sub-Pixel Alpha Matte & Normal/Depth Podium Conditioning Gate"}),i.push({id:"matting-gate-right",kind:"matting_guardrail_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useAlphaMaskIcLightPipeline?"teal":"crimson",label:"IC-Light Specular Rim Harmonizer & OCR/SSIM Pixel Integrity Gate"}),i.push({id:"shadow-ao-bar-top",kind:"contact_shadow_ao_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Relighting Amortization Law: c_sku(u) = c_0 / (1 + u) via Cached Cutout + IC-Light"}),i.push({id:"shadow-ao-bar-front",kind:"contact_shadow_ao_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useAlphaMaskIcLightPipeline?"teal":"crimson",label:"Zero Packaging Logo Distortion & Grounded Contact Shadow Lock Line (1.0000×)"}),i}const G=new URLSearchParams(window.location.search),T=G.get("preset"),Z=G.get("theme")==="light"?"light":"dark";let d=T&&T in x?T:"alpha_mask_iclight_pbr_relighting_lock",c=x[d].defaultStationIndex,k=Z;document.documentElement.setAttribute("data-theme",k);const Q=document.querySelector("#app");Q.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 228 · 238TH DEMO · E-COMMERCE SKU BACKGROUND REPLACEMENT & IC-LIGHT PBR RELIGHTING PIPELINE</span>
        <h1>E-Commerce SKU Background Replacement & IC-Light PBR Relighting Studio</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${k.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="E-Commerce Relighting Pipeline Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="alpha_mask_iclight_pbr_relighting_lock"
      >
        Alpha-Matte SKU Pixel Lock + IC-Light PBR Relighting (Fidelity Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_unmasked_img2img_sku_distortion_overrun"
      >
        Naive Unmasked Global Img2Img Denoising (Distortion Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="E-Commerce Relighting Readouts">
      <article class="kpi-card">
        <span class="kpi-label">CONTRAST FACTOR S(u) / RELIGHT UNIT COST c_sku</span>
        <strong id="kpi-relight" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">SKU FIDELITY & COST RATIO (C_active / C_relight)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">SCENE TIERS 4 / 8 / 16 FIDELITY RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">S(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">LOGO DISTORTION & RETAKE VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-TIER E-COMMERCE ALPHA-LOCK + IC-LIGHT PBR RELIGHTING STAGE</span>
          <span id="solid-count-readout">58 solids · 17 scene tiers</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric E-Commerce SKU Background Replacement and IC-Light PBR Relighting Studio"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect E-Commerce Scene Illumination Tier (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Tier 16 (u = 1.000, c_sku = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-TIER ALPHA-LOCK + IC-LIGHT VS GLOBAL IMG2IMG LEDGER</span>
          <span>c_sku = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>u</th>
                <th>S(u) = 1+u</th>
                <th>c_sku</th>
                <th>Hemi Quad</th>
                <th>C / C_relight</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Y=document.querySelector("#preset-subtitle"),M=document.querySelector("#preset-badge"),j=document.querySelector("#kpi-relight"),X=document.querySelector("#kpi-quad"),O=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),U=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),it=document.querySelector("#solid-count-readout"),ot=document.querySelector("#rig-svg"),v=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),H=document.querySelector("#station-tbody"),w=document.querySelector("#theme-toggle");function h(e,i,t){const a=(e-t*.55)*.88,s=-i+(e*.18+t*.42)*.55;return[a,s]}function nt(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function st(e,i,t,a,s,l,o,n,r,m,B){const u=a*.5,g=s*.5,p=l*.5,A=h(e+u,i-g,t-p),S=h(e+u,i-g,t+p),F=h(e-u,i-g,t+p),y=h(e-u,i+g,t-p),f=h(e+u,i+g,t-p),b=h(e+u,i+g,t+p),_=h(e-u,i+g,t+p),E=nt(o,r),L=n?1.8:.7,$=n?"#ffffff":E.stroke,N=`${y[0].toFixed(1)},${y[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`,D=`${F[0].toFixed(1)},${F[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`,K=`${S[0].toFixed(1)},${S[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${m}" data-solid-kind="${B}">
      <polygon points="${D}" fill="${E.left}" stroke="${$}" stroke-width="${L}" />
      <polygon points="${K}" fill="${E.right}" stroke="${$}" stroke-width="${L}" />
      <polygon points="${N}" fill="${E.top}" stroke="${$}" stroke-width="${L}" />
    </g>
  `}function R(e){const i=x[e.presetId],t=e.selectedStation,a=k==="dark";Y.textContent=i.subtitle,M.textContent=i.badge,M.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,j.textContent=`S(u) = ${t.unmaskedRetakeAmplification.toFixed(4)}× (c_sku = ${t.iclightAmortizedUnitCost.toFixed(4)}×)`,X.textContent=`Hemi Quad = ${t.quadratureHemisphereLightCost.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,O.textContent=`${t.skuFidelityCostRatio.toFixed(4)}×`,O.className=`kpi-value ${t.isSkuDistortionViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${t.sceneRelightIntensityU.toFixed(4)} | ${t.skuRelightStageLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,U.textContent=`${e.violatedCount} / ${e.stationCount}`,U.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,v.value=String(t.index),at.textContent=`Tier ${t.index} (u = ${t.sceneRelightIntensityU.toFixed(3)}, c_sku = ${t.iclightAmortizedUnitCost.toFixed(3)}, Ratio = ${t.skuFidelityCostRatio.toFixed(4)}×)`;const s=W(e);it.textContent=`${s.length} solids · ${e.stationCount} scene tiers`;const l=[...s].sort((o,n)=>o.z-n.z||o.y-n.y||o.x-n.x);ot.innerHTML=l.map(o=>st(o.x,o.y,o.z,o.w,o.h,o.d,o.tone,o.stationIndex===t.index,a,o.id,o.kind)).join(""),H.innerHTML=e.stations.map(o=>{const n=o.index===t.index?"row-selected":"",r=o.isSkuDistortionViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${o.index}">
          <td>#${o.index}</td>
          <td>${o.sceneRelightIntensityU.toFixed(4)}</td>
          <td>${o.unmaskedRetakeAmplification.toFixed(4)}×</td>
          <td>${o.iclightAmortizedUnitCost.toFixed(4)}×</td>
          <td>${o.quadratureHemisphereLightCost.toFixed(4)}×</td>
          <td class="${r}">${o.skuFidelityCostRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(o=>{const n=o.getAttribute("data-preset");o.classList.toggle("active",n===e.presetId)}),window.__ECOMMERCE_PBR_RELIGHTING_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in x&&(d=i,c=x[d].defaultStationIndex,R(I(d,c)))})});v.addEventListener("input",()=>{c=Number(v.value),R(I(d,c))});H.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),R(I(d,c)))});w.addEventListener("click",()=>{k=k==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",k),w.textContent=`Theme: ${k.toUpperCase()}`,R(I(d,c))});R(I(d,c));
