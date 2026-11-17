import"./modulepreload-polyfill-B5Qt9EMX.js";const D={cad_dieline_uv_pbr_fold_lock:{id:"cad_dieline_uv_pbr_fold_lock",label:"2D CAD Dieline UV-First + Spot Foil/Emboss PBR Mask + Automated 3D Hinge Fold (c_pack = c_0/(1+u), Lock = 1.0000×)",labelZh:"2D CAD 刀版图 UV 展开生成 + 专色烫金/击凸 PBR 双生掩码 + 自动折盒 3D 渲染（单款成本 c_0/(1+u)，印前与渲染比恒锁 1.0000×）",subtitle:"Generates 300-DPI artwork directly on parametric 2D FEFCO/ECMA CAD dielines with 3mm bleed, compiles vector foil/emboss paths into both CMYK+Spot prepress plates and 3D PBR Metallic/Normal maps, and folds the 3D box automatically.",subtitleZh:"直接在带 3mm 出血线与折痕拓扑的 2D 参数化 CAD 刀版图（FEFCO/ECMA）上生成 300-DPI 平面图案，将烫金/局部 UV/击凸矢量路径同步编译为印刷厂专色版与 3D 引擎 Metallic/Normal 贴图，并自动折盒渲染电商主图，全 17 阶段恒锁 1.0000×。",useCadDielineUvPbr:!0,defaultStationIndex:16,badge:"CAD DIELINE + 3D PBR LOCKED · 1.0000× (0/17 UNPRINTABLE)",badgeZh:"刀版印前与 3D 折盒双锁 · 1.0000×（0/17 站无法印刷返工）",description:"FMCG, cosmetics, and luxury gift-box pipelines output both 300-DPI print-ready PDF dielines and interactive 3D e-commerce hero renders from one unified UV source of truth.",descriptionZh:"快消、美妆与高定礼盒管线从同一份 2D 刀版 UV 真相源同时产出可下厂印刷的 300-DPI 专色 PDF 刀版稿与可 360° 旋转的 3D 电商主图。"},naive_perspective_t2i_unprintable_box:{id:"naive_perspective_t2i_unprintable_box",label:"Naive Perspective T2I 3D Box Photo Generation (Unprintable Raster & Illustrator Rebuild Overrun = 1 + u up to 2.0000×)",labelZh:"朴素文生图直接画透视 3D 包装盒效果图（好看但无法展开成 2D 刀版印刷、条形码乱码，印前重画超支达 2.0000×）",subtitle:"Generates a perspective 2D raster image of a 3D box that cannot be unfolded into a flat 300-DPI CMYK dieline, forcing structural designers to redraw the entire package in Illustrator and inflating cost by 2.0000× at Stage 16.",subtitleZh:"用普通文生图直接生成一张带透视变形和固定反光的 3D 包装盒图片——既没有背面/侧面展开图与 3mm 出血线，也无法分离烫金专色版，结构包装师被迫在 Illustrator 中从零重画整套平面刀版，第 16 阶段成本翻倍至 2.0000×。",useCadDielineUvPbr:!1,defaultStationIndex:16,badge:"UNPRINTABLE RASTER & REBUILD · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"无法展开印刷与重画超支 · 最高 2.0000×（16/17 站违背）",description:"A perspective T2I image of a box is merely a concept sketch—it lacks flat UV unwrap, 3mm bleed, spot-foil plates, and scannable GS1 barcodes, doubling production cost across 16/17 stages.",descriptionZh:"透视角度的文生图包装盒只是无法下厂的概念草图，缺失平面 UV 展开、出血线、烫金专色版与可扫码条形码，在 16/17 个阶段导致推倒重画。"}},m=17,U=["Stage 0: Flat Single-Face Bottle Label Sticker (Baseline)","Stage 1: Parametric FEFCO/ECMA 2D CAD Dieline (Cut/Crease/Glue)","Stage 2: 3mm Outer Bleed & 3mm Inner Safety Margin Mask Lock","Stage 3: 300-DPI Flat UV Island AIGC Pattern & Illustration Gen","Stage 4: Cross-Crease Seam Continuity Across Adjacent Box Faces","Stage 5: Spot-Gold / Silver Hot-Foil Vector Plate -> PBR Metallic=1.0","Stage 6: Blind Emboss / Deboss Vector Height -> PBR Normal Map","Stage 7: Spot UV Varnish Clearcoat Mask (Roughness = 0.04 Gloss)","Stage 8: Kraft / Textured Art-Paper Micro-Fiber Normal Overlay","Stage 9: GS1 EAN-13 / QR Vector Barcode 100% Scanner-Pass Gate","Stage 10: FDA / GB Regulatory Nutrition & Ingredient Vector Table","Stage 11: ICC Fogra39 CMYK Total Ink Coverage <= 300% Prepress Gate","Stage 12: Automated Hinge-Bone 3D Box Folding (0° Flat -> 90° Box)","Stage 13: Paperboard Wall Thickness (1.5mm E-Flute) Bevel Extrusion","Stage 14: Studio Softbox HDRI Rotation for Foil Specular Glint","Stage 15: E-Commerce Hero Turntable Video & Interactive GLB Export","Stage 16: 500-SKU Omnichannel 3D Hero + Print PDF Factory (0.50 c_0)"];function H(t){const e=1+Math.max(0,t),o=1/e;return{prepressRedrawAmplification:e,dielinePbrAmortizedUnitCost:o}}function z(t,i=64){const o=1/(1+Math.max(0,t)),s=Math.max(2,i%2===0?i:i+1),r=1/s;let a=2*o;for(let n=1;n<s;n++){const l=n*r,x=n%2===1?4:2;a+=x*(2*o*l)}return r/3*a}function K(t,i){const e=Math.max(0,Math.min(m-1,t)),o=e/(m-1),s=H(o),r=z(o,64),a=1+o,n=i?1:a;return{index:e,packagingCraftU:o,prepressRedrawAmplification:s.prepressRedrawAmplification,dielinePbrAmortizedUnitCost:s.dielinePbrAmortizedUnitCost,quadratureDielinePanelCost:r,prepressPrintabilityBudgetRatio:n,naiveUnprintableOverrunRatio:a,packagingStageLabel:U[e]??U[0],isPrepressViolation:n>1.0001}}function f(t,i){const e=D[t],o=[];let s=0,r=0;for(let n=0;n<m;n++){const l=K(n,e.useCadDielineUvPbr);o.push(l),l.isPrepressViolation&&s++;const x=Math.abs(l.dielinePbrAmortizedUnitCost-l.quadratureDielinePanelCost);x>r&&(r=x)}const a=i!==void 0?Math.max(0,Math.min(m-1,i)):e.defaultStationIndex;return{presetId:t,useCadDielineUvPbr:e.useCadDielineUvPbr,stationCount:m,selectedStation:o[a],stations:o,station4Ratio:o[4].prepressPrintabilityBudgetRatio,station8Ratio:o[8].prepressPrintabilityBudgetRatio,station12Ratio:o[12].prepressPrintabilityBudgetRatio,station16Ratio:o[16].prepressPrintabilityBudgetRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"CAD_DIELINE_UV_PBR_PREPRESS_LOCKED":"NAIVE_T2I_UNPRINTABLE_BOX_OVERRUN"}}function Q(t){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise 3D Packaging CAD Dieline Unwrap, Foil/Emboss PBR & Prepress Plinth"}),i.push({id:"dieline-rail-front",kind:"cad_dieline_uv_crease_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"300-DPI CMYK + Spot-Foil CAD Dieline -> 3D Hinge Box Fold Bus (1.0000×)"}),i.push({id:"dieline-rail-back",kind:"cad_dieline_uv_crease_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"FEFCO/ECMA Structural SVG Crease/Bleed + Foil/Emboss PBR Mask Bus"});for(const e of t.stations){const o=(e.index-8)*30,s=22*e.prepressRedrawAmplification,r=44*e.dielinePbrAmortizedUnitCost,a=36*e.prepressPrintabilityBudgetRatio;i.push({id:`spot-craft-demand-column-${e.index}`,kind:"spot_craft_demand_column",stationIndex:e.index,x:o,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Stage ${e.index} Amplification D(u) = ${e.prepressRedrawAmplification.toFixed(4)}× (${e.packagingStageLabel})`}),i.push({id:`foil-emboss-pbr-fold-node-${e.index}`,kind:"foil_emboss_pbr_fold_node",stationIndex:e.index,x:o,y:r*.5-8,z:0,w:14,h:r,d:14,tone:t.useCadDielineUvPbr?"teal":"slate",label:`Stage ${e.index} Amortized Packaging Cost c_pack = ${e.dielinePbrAmortizedUnitCost.toFixed(4)}×`}),i.push({id:`prepress-budget-gauge-${e.index}`,kind:"prepress_budget_gauge",stationIndex:e.index,x:o,y:a*.5-8,z:56,w:Math.min(24,12*e.prepressPrintabilityBudgetRatio),h:a,d:12,tone:e.isPrepressViolation?"crimson":"teal",label:`Stage ${e.index} Prepress & 3D Render Budget Ratio = ${e.prepressPrintabilityBudgetRatio.toFixed(4)}×`})}return i.push({id:"barcode-gate-left",kind:"cmyk_spot_barcode_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Parametric 2D CAD Dieline & 3mm Bleed UV Unwrap Ingress Gate"}),i.push({id:"barcode-gate-right",kind:"cmyk_spot_barcode_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:t.useCadDielineUvPbr?"teal":"crimson",label:"GS1 Vector Barcode + CMYK/Spot PDF & 3D GLB Egress Gate"}),i.push({id:"prepress-bar-top",kind:"zero_redraw_prepress_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Packaging Law: c_pack(u) = c_0 / (1 + u) via 2D Dieline UV -> 3D Hinge Fold"}),i.push({id:"prepress-bar-front",kind:"zero_redraw_prepress_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:t.useCadDielineUvPbr?"teal":"crimson",label:"100% Offset-Print Ready PDF + 3D Foil/Emboss Hero Render Lock Line (1.0000×)"}),i}const G=new URLSearchParams(window.location.search),I=G.get("preset"),Z=G.get("theme")==="light"?"light":"dark";let d=I&&I in D?I:"cad_dieline_uv_pbr_fold_lock",c=D[d].defaultStationIndex,k=Z;document.documentElement.setAttribute("data-theme",k);const Y=document.querySelector("#app");Y.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 247 · 257TH DEMO · ENTERPRISE 3D PACKAGING CAD DIELINE UNWRAP, FOIL/EMBOSS PBR &amp; PREPRESS STUDIO</span>
        <h1>Enterprise 3D Packaging CAD Dieline Unwrap, Foil/Emboss PBR &amp; Prepress Studio</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${k.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="3D Packaging &amp; Prepress Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="cad_dieline_uv_pbr_fold_lock"
      >
        2D CAD Dieline UV-First + Spot Foil/Emboss PBR + Automated 3D Hinge Fold (Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_perspective_t2i_unprintable_box"
      >
        Naive Perspective T2I 3D Box Photo (Unprintable Raster &amp; Rebuild Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="3D Packaging &amp; Prepress Readouts">
      <article class="kpi-card">
        <span class="kpi-label">REBUILD FACTOR D(u) / DIELINE PBR COST c_pack</span>
        <strong id="kpi-pack" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">PREPRESS &amp; 3D RENDER BUDGET RATIO (C_active / C_pack)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STAGES 4 / 8 / 16 BUDGET RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">D(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">UNPRINTABLE DIELINE &amp; BARCODE VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STAGE 2D CAD DIELINE UV, SPOT FOIL/EMBOSS PBR &amp; 3D HINGE FOLD STAGE</span>
          <span id="solid-count-readout">58 solids · 17 packaging stages</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Enterprise 3D Packaging CAD Dieline Unwrap, Foil/Emboss PBR and Prepress Studio"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Packaging CAD Dieline, Spot Craft &amp; 3D Fold Stage (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Stage 16 (u = 1.000, c_pack = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STAGE CAD DIELINE UV PBR VS NAIVE UNPRINTABLE T2I BOX LEDGER</span>
          <span>c_pack = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>u</th>
                <th>D(u) = 1+u</th>
                <th>c_pack</th>
                <th>Panel Quad</th>
                <th>C / C_pack</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const j=document.querySelector("#preset-subtitle"),L=document.querySelector("#preset-badge"),W=document.querySelector("#kpi-pack"),X=document.querySelector("#kpi-quad"),N=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),ee=document.querySelector("#kpi-stations-4816"),y=document.querySelector("#kpi-violated"),te=document.querySelector("#kpi-verdict"),ie=document.querySelector("#solid-count-readout"),ae=document.querySelector("#rig-svg"),v=document.querySelector("#station-slider"),oe=document.querySelector("#station-slider-label"),w=document.querySelector("#station-tbody"),T=document.querySelector("#theme-toggle");function g(t,i,e){const o=(t-e*.55)*.88,s=-i+(t*.18+e*.42)*.55;return[o,s]}function ne(t,i){return t==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:t==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:t==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:t==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function se(t,i,e,o,s,r,a,n,l,x,M){const p=o*.5,u=s*.5,b=r*.5,A=g(t+p,i-u,e-b),S=g(t+p,i-u,e+b),$=g(t-p,i-u,e+b),B=g(t-p,i+u,e-b),C=g(t+p,i+u,e-b),P=g(t+p,i+u,e+b),E=g(t-p,i+u,e+b),_=ne(a,l),R=n?1.8:.7,F=n?"#ffffff":_.stroke,O=`${B[0].toFixed(1)},${B[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${P[0].toFixed(1)},${P[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)}`,V=`${$[0].toFixed(1)},${$[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${P[0].toFixed(1)},${P[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)}`,q=`${S[0].toFixed(1)},${S[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${P[0].toFixed(1)},${P[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${x}" data-solid-kind="${M}">
      <polygon points="${V}" fill="${_.left}" stroke="${F}" stroke-width="${R}" />
      <polygon points="${q}" fill="${_.right}" stroke="${F}" stroke-width="${R}" />
      <polygon points="${O}" fill="${_.top}" stroke="${F}" stroke-width="${R}" />
    </g>
  `}function h(t){const i=D[t.presetId],e=t.selectedStation,o=k==="dark";j.textContent=i.subtitle,L.textContent=i.badge,L.className=`status-badge ${t.violatedCount===0?"badge-pass":"badge-fail"}`,W.textContent=`D(u) = ${e.prepressRedrawAmplification.toFixed(4)}× (c_pack = ${e.dielinePbrAmortizedUnitCost.toFixed(4)}×)`,X.textContent=`Panel Quad = ${e.quadratureDielinePanelCost.toFixed(4)}× (Quad err ${t.maxQuadratureError.toExponential(2)})`,N.textContent=`${e.prepressPrintabilityBudgetRatio.toFixed(4)}×`,N.className=`kpi-value ${e.isPrepressViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${e.packagingCraftU.toFixed(4)} | ${e.packagingStageLabel}`,ee.textContent=`${t.station4Ratio.toFixed(4)}× / ${t.station8Ratio.toFixed(4)}× / ${t.station16Ratio.toFixed(4)}×`,y.textContent=`${t.violatedCount} / ${t.stationCount}`,y.className=`kpi-value ${t.violatedCount>0?"text-danger":"text-ok"}`,te.textContent=t.verdict,v.value=String(e.index),oe.textContent=`Stage ${e.index} (u = ${e.packagingCraftU.toFixed(3)}, c_pack = ${e.dielinePbrAmortizedUnitCost.toFixed(3)}, Ratio = ${e.prepressPrintabilityBudgetRatio.toFixed(4)}×)`;const s=Q(t);ie.textContent=`${s.length} solids · ${t.stationCount} packaging stages`;const r=[...s].sort((a,n)=>a.z-n.z||a.y-n.y||a.x-n.x);ae.innerHTML=r.map(a=>se(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===e.index,o,a.id,a.kind)).join(""),w.innerHTML=t.stations.map(a=>{const n=a.index===e.index?"row-selected":"",l=a.isPrepressViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.packagingCraftU.toFixed(4)}</td>
          <td>${a.prepressRedrawAmplification.toFixed(4)}×</td>
          <td>${a.dielinePbrAmortizedUnitCost.toFixed(4)}×</td>
          <td>${a.quadratureDielinePanelCost.toFixed(4)}×</td>
          <td class="${l}">${a.prepressPrintabilityBudgetRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const n=a.getAttribute("data-preset");a.classList.toggle("active",n===t.presetId)}),window.__PACKAGING_DIELINE_PBR_SUMMARY__=t}document.querySelectorAll(".preset-btn").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-preset");i&&i in D&&(d=i,c=D[d].defaultStationIndex,h(f(d,c)))})});v.addEventListener("input",()=>{c=Number(v.value),h(f(d,c))});w.addEventListener("click",t=>{const i=t.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),h(f(d,c)))});T.addEventListener("click",()=>{k=k==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",k),T.textContent=`Theme: ${k.toUpperCase()}`,h(f(d,c))});h(f(d,c));
