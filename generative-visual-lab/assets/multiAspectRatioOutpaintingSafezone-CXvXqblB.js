import"./modulepreload-polyfill-B5Qt9EMX.js";const C={saliency_safezone_outpainting_reflow_lock:{id:"saliency_safezone_outpainting_reflow_lock",label:"Saliency BBox Lock + Directional Outpainting + Platform UI Safe-Zone Reflow (c_aspect = c_0/(1+u), Lock = 1.0000×)",labelZh:"显著性主体安全框锁死 + 方向性智能扩图 (Outpainting) + 平台 UI 避让重排（单端成本 c_0/(1+u)，恒锁 1.0000×）",subtitle:"Preserves 100% of the hero SKU/talent bounding box while extending canvas margins via Flux Fill / Wan 2.2 Outpainting and reflowing price/subtitle HUDs outside TikTok/Reels/Xiaohongshu UI dead zones across all 17 omnichannel aspect tiers (245th Demo Milestone!).",subtitleZh:"通过 SAM-2 显著性检测 100% 保护商品与人物主体不被裁切，利用 Flux Fill / Wan 2.2 Outpainting 向顶部/底部或两侧自然延展背景环境，并根据抖音/TikTok/小红书/YouTube 按钮遮挡区自动重排字幕与价格角标，在全 17 个全渠道画幅档位恒锁 1.0000×（第 245 个独立能力里程碑 Demo！）。",useSaliencyOutpaintingReflow:!0,defaultStationIndex:16,badge:"OMNICHANNEL SAFE-ZONE LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"全渠道安全区与扩图锁死 · 1.0000×（0/17 站裁切遮挡）",description:"Enterprise omnichannel ad engines adapt a single master creative into 16:9, 9:16, 3:4, 4:5, and 1:1 deliverables with zero subject truncation and zero platform-button overlap.",descriptionZh:"企业全渠道广告引擎从单一母版自动衍生 16:9 横屏、9:16 竖屏、3:4 小红书与 1:1 方图，兼得主体零裁切、背景无缝延展与平台交互按钮 100% 避让。"},naive_center_crop_subject_truncation_overrun:{id:"naive_center_crop_subject_truncation_overrun",label:"Naive Center-Crop & Fixed Overlay Position (Subject Truncation & UI Occlusion Overrun = 1 + u up to 2.0000×)",labelZh:"朴素中心暴力裁剪与固定字幕坐标（商品主体被拦腰截断、字幕被点赞按钮遮挡，人工重做超支达 2.0000×）",subtitle:"Blindly center-crops 16:9 masters into 9:16 vertical cuts (discarding 68% of canvas area) and leaves price/subtitle overlays under TikTok/Reels UI buttons, inflating manual designer re-layout cost by 2.0000× at Tier 16.",subtitleZh:"将 16:9 横版母片直接按中心一刀切为 9:16 竖版（直接丢弃 68.4% 画面面积），导致商品包装边缘与模特肢体被截断，且固定坐标的促销字幕正好被抖音/TikTok 右侧点赞栏与底部文案区盖住，使第 16 档全渠道返工成本翻倍至 2.0000×。",useSaliencyOutpaintingReflow:!1,defaultStationIndex:16,badge:"SUBJECT CHOPPED & UI BLOCKED · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"主体截断与 UI 遮挡 · 最高 2.0000×（16/17 站违背）",description:"Using FFmpeg center-crop (`crop=ih*9/16:ih`) without saliency tracking, outpainting, or platform safe-zone reflow ruins commercial ad creatives across 16/17 aspect ratios.",descriptionZh:"在多渠道投放中直接使用 FFmpeg 中心硬裁剪而不做显著性主体重定位、智能扩图与平台安全区避让，会毁掉 16/17 个渠道的广告转化率。"}},S=17,w=["Profile 0 (16:9 Master 1920×1080): YouTube / Desktop Hero","Profile 1 (16:10 Widescreen): Tablet & Laptop Showcase","Profile 2 (4:3 Classic Landscape): Connected TV / OTT Ad","Profile 3 (1:1 Square 1080×1080): Instagram / Meta Carousel","Profile 4 (4:5 Portrait 1080×1350): Instagram / X Feed Card","Profile 5 (3:4 Editorial 1200×1600): Xiaohongshu / Pinterest","Profile 6 (2:3 Tall Poster): E-Commerce Category Banner","Profile 7 (9:16 Vertical 1080×1920): TikTok Safe-Zone Reflow","Profile 8 (9:16 Reels/Shorts): Right-Rail Icon Avoidance Lock","Profile 9 (9:16 WeChat Channels): Bottom CTA Drawer Clearance","Profile 10 (21:9 Ultrawide 2560×1080): Cinema Homepage Ribbon","Profile 11 (32:9 Super-Ultrawide): Retail Storefront LED Fascia","Profile 12 (1:2 Skyscraper): Programmatic Web Sidebar Ad","Profile 13 (9:20 Full-Bleed Mobile): Lock-Screen Splash Ad","Profile 14 (Dual-Split 9:16): Top SKU Hero + Bottom Live Host","Profile 15 (Interactive Story Poll): Safe-Zone Sticker Avoidance","Profile 16 (17-Channel Global Matrix): c_aspect = 0.5000 c_0"];function H(t){const e=1+Math.max(0,t),n=1/e;return{centerCropReworkAmplification:e,outpaintingAmortizedUnitCost:n}}function V(t,o=64){const n=1/(1+Math.max(0,t)),s=Math.max(2,o%2===0?o:o+1),l=1/s;let i=2*n;for(let a=1;a<s;a++){const r=a*l,h=a%2===1?4:2;i+=h*(2*n*r)}return l/3*i}function G(t,o){const e=Math.max(0,Math.min(S-1,t)),n=e/(S-1),s=H(n),l=V(n,64),i=1+n,a=o?1:i;return{index:e,aspectDivergenceU:n,centerCropReworkAmplification:s.centerCropReworkAmplification,outpaintingAmortizedUnitCost:s.outpaintingAmortizedUnitCost,quadratureSafezoneGridCost:l,safezoneComplianceRatio:a,naiveCenterCropOverrunRatio:i,channelAspectProfileLabel:w[e]??w[0],isSafezoneTruncationViolation:a>1.0001}}function k(t,o){const e=C[t],n=[];let s=0,l=0;for(let a=0;a<S;a++){const r=G(a,e.useSaliencyOutpaintingReflow);n.push(r),r.isSafezoneTruncationViolation&&s++;const h=Math.abs(r.outpaintingAmortizedUnitCost-r.quadratureSafezoneGridCost);h>l&&(l=h)}const i=o!==void 0?Math.max(0,Math.min(S-1,o)):e.defaultStationIndex;return{presetId:t,useSaliencyOutpaintingReflow:e.useSaliencyOutpaintingReflow,stationCount:S,selectedStation:n[i],stations:n,station4Ratio:n[4].safezoneComplianceRatio,station8Ratio:n[8].safezoneComplianceRatio,station12Ratio:n[12].safezoneComplianceRatio,station16Ratio:n[16].safezoneComplianceRatio,violatedCount:s,maxQuadratureError:l,verdict:s===0?"SALIENCY_SAFEZONE_OUTPAINTING_LOCKED":"NAIVE_CENTER_CROP_TRUNCATION_OVERRUN"}}function j(t){const o=[];o.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Omnichannel Multi-Aspect-Ratio Outpainting & Safe-Zone Compositor Plinth"}),o.push({id:"reflow-rail-front",kind:"omnichannel_reflow_bus_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Platform UI Dead-Zone Avoidance & Responsive Remotion HUD Reflow Bus (1.0000×)"}),o.push({id:"reflow-rail-back",kind:"omnichannel_reflow_bus_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"SAM-2 Saliency BBox Lock + Flux Fill / Wan 2.2 Directional Outpainting Bus"});for(const e of t.stations){const n=(e.index-8)*30,s=22*e.centerCropReworkAmplification,l=44*e.outpaintingAmortizedUnitCost,i=36*e.safezoneComplianceRatio;o.push({id:`aspect-divergence-column-${e.index}`,kind:"aspect_divergence_column",stationIndex:e.index,x:n,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Profile ${e.index} Amplification A(u) = ${e.centerCropReworkAmplification.toFixed(4)}× (${e.channelAspectProfileLabel})`}),o.push({id:`safezone-outpaint-node-${e.index}`,kind:"safezone_outpaint_node",stationIndex:e.index,x:n,y:l*.5-8,z:0,w:14,h:l,d:14,tone:t.useSaliencyOutpaintingReflow?"teal":"slate",label:`Profile ${e.index} Amortized Adaptation Cost c_aspect = ${e.outpaintingAmortizedUnitCost.toFixed(4)}×`}),o.push({id:`truncation-compliance-gauge-${e.index}`,kind:"truncation_compliance_gauge",stationIndex:e.index,x:n,y:i*.5-8,z:56,w:Math.min(24,12*e.safezoneComplianceRatio),h:i,d:12,tone:e.isSafezoneTruncationViolation?"crimson":"teal",label:`Profile ${e.index} Safe-Zone & Cost Ratio = ${e.safezoneComplianceRatio.toFixed(4)}×`})}return o.push({id:"bbox-gate-left",kind:"saliency_bbox_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"SAM-2 Saliency Subject Bounding-Box Lock (0% Hero Truncation) Gate"}),o.push({id:"bbox-gate-right",kind:"saliency_bbox_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:t.useSaliencyOutpaintingReflow?"teal":"crimson",label:"TikTok / Reels / Xiaohongshu UI Dead-Zone Collision Verifier Gate"}),o.push({id:"deadzone-bar-top",kind:"platform_ui_deadzone_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Omnichannel Adaptation Law: c_aspect(u) = c_0 / (1 + u) via Outpaint + UI Reflow"}),o.push({id:"deadzone-bar-front",kind:"platform_ui_deadzone_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:t.useSaliencyOutpaintingReflow?"teal":"crimson",label:"Zero Subject Crop & Zero Platform Button Overlap Lock Line (1.0000×)"}),o}const y=new URLSearchParams(window.location.search),R=y.get("preset"),W=y.get("theme")==="light"?"light":"dark";let c=R&&R in C?R:"saliency_safezone_outpainting_reflow_lock",d=C[c].defaultStationIndex,g=W;document.documentElement.setAttribute("data-theme",g);const Q=document.querySelector("#app");Q.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 235 MILESTONE · 245TH DEMO · OMNICHANNEL MULTI-ASPECT-RATIO OUTPAINTING & SAFE-ZONE COMPOSITOR</span>
        <h1>Omnichannel Multi-Aspect-Ratio Outpainting & Safe-Zone Compositor</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${g.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Omnichannel Adaptation Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="saliency_safezone_outpainting_reflow_lock"
      >
        Saliency BBox Lock + Directional Outpainting + UI Safe-Zone Reflow (Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_center_crop_subject_truncation_overrun"
      >
        Naive Center-Crop & Fixed Overlay (Truncation Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Omnichannel Safe-Zone Readouts">
      <article class="kpi-card">
        <span class="kpi-label">REWORK FACTOR A(u) / ADAPTATION UNIT COST c_aspect</span>
        <strong id="kpi-aspect" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">SAFE-ZONE & COST COMPLIANCE RATIO (C_active / C_aspect)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">CHANNEL PROFILES 4 / 8 / 16 COMPLIANCE RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">A(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">SUBJECT TRUNCATION & UI OVERLAP VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-CHANNEL SALIENCY SAFE-ZONE & DIRECTIONAL OUTPAINTING STAGE</span>
          <span id="solid-count-readout">58 solids · 17 channel profiles</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Omnichannel Multi-Aspect-Ratio Outpainting and Safe-Zone Compositor"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Ad Channel Aspect Ratio & Safe-Zone Profile (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Profile 16 (u = 1.000, c_aspect = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-CHANNEL OUTPAINT + UI REFLOW VS CENTER-CROP LEDGER</span>
          <span>c_aspect = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Prof</th>
                <th>u</th>
                <th>A(u) = 1+u</th>
                <th>c_aspect</th>
                <th>Grid Quad</th>
                <th>C / C_aspect</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const K=document.querySelector("#preset-subtitle"),L=document.querySelector("#preset-badge"),Y=document.querySelector("#kpi-aspect"),X=document.querySelector("#kpi-quad"),N=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),ee=document.querySelector("#kpi-stations-4816"),z=document.querySelector("#kpi-violated"),te=document.querySelector("#kpi-verdict"),oe=document.querySelector("#solid-count-readout"),ie=document.querySelector("#rig-svg"),$=document.querySelector("#station-slider"),ne=document.querySelector("#station-slider-label"),M=document.querySelector("#station-tbody"),U=document.querySelector("#theme-toggle");function b(t,o,e){const n=(t-e*.55)*.88,s=-o+(t*.18+e*.42)*.55;return[n,s]}function ae(t,o){return t==="teal"?o?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:t==="amber"?o?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:t==="crimson"?o?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:t==="violet"?o?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:o?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function se(t,o,e,n,s,l,i,a,r,h,Z){const p=n*.5,u=s*.5,f=l*.5,I=b(t+p,o-u,e-f),A=b(t+p,o-u,e+f),F=b(t-p,o-u,e+f),P=b(t-p,o+u,e-f),_=b(t+p,o+u,e-f),x=b(t+p,o+u,e+f),v=b(t-p,o+u,e+f),E=ae(i,r),O=a?1.8:.7,T=a?"#ffffff":E.stroke,q=`${P[0].toFixed(1)},${P[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)}`,D=`${F[0].toFixed(1)},${F[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)}`,B=`${A[0].toFixed(1)},${A[1].toFixed(1)} ${I[0].toFixed(1)},${I[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${h}" data-solid-kind="${Z}">
      <polygon points="${D}" fill="${E.left}" stroke="${T}" stroke-width="${O}" />
      <polygon points="${B}" fill="${E.right}" stroke="${T}" stroke-width="${O}" />
      <polygon points="${q}" fill="${E.top}" stroke="${T}" stroke-width="${O}" />
    </g>
  `}function m(t){const o=C[t.presetId],e=t.selectedStation,n=g==="dark";K.textContent=o.subtitle,L.textContent=o.badge,L.className=`status-badge ${t.violatedCount===0?"badge-pass":"badge-fail"}`,Y.textContent=`A(u) = ${e.centerCropReworkAmplification.toFixed(4)}× (c_aspect = ${e.outpaintingAmortizedUnitCost.toFixed(4)}×)`,X.textContent=`Grid Quad = ${e.quadratureSafezoneGridCost.toFixed(4)}× (Quad err ${t.maxQuadratureError.toExponential(2)})`,N.textContent=`${e.safezoneComplianceRatio.toFixed(4)}×`,N.className=`kpi-value ${e.isSafezoneTruncationViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${e.aspectDivergenceU.toFixed(4)} | ${e.channelAspectProfileLabel}`,ee.textContent=`${t.station4Ratio.toFixed(4)}× / ${t.station8Ratio.toFixed(4)}× / ${t.station16Ratio.toFixed(4)}×`,z.textContent=`${t.violatedCount} / ${t.stationCount}`,z.className=`kpi-value ${t.violatedCount>0?"text-danger":"text-ok"}`,te.textContent=t.verdict,$.value=String(e.index),ne.textContent=`Profile ${e.index} (u = ${e.aspectDivergenceU.toFixed(3)}, c_aspect = ${e.outpaintingAmortizedUnitCost.toFixed(3)}, Ratio = ${e.safezoneComplianceRatio.toFixed(4)}×)`;const s=j(t);oe.textContent=`${s.length} solids · ${t.stationCount} channel profiles`;const l=[...s].sort((i,a)=>i.z-a.z||i.y-a.y||i.x-a.x);ie.innerHTML=l.map(i=>se(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===e.index,n,i.id,i.kind)).join(""),M.innerHTML=t.stations.map(i=>{const a=i.index===e.index?"row-selected":"",r=i.isSafezoneTruncationViolation?"cell-fail":"cell-pass";return`
        <tr class="${a}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.aspectDivergenceU.toFixed(4)}</td>
          <td>${i.centerCropReworkAmplification.toFixed(4)}×</td>
          <td>${i.outpaintingAmortizedUnitCost.toFixed(4)}×</td>
          <td>${i.quadratureSafezoneGridCost.toFixed(4)}×</td>
          <td class="${r}">${i.safezoneComplianceRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const a=i.getAttribute("data-preset");i.classList.toggle("active",a===t.presetId)}),window.__MULTI_ASPECT_SAFEZONE_SUMMARY__=t}document.querySelectorAll(".preset-btn").forEach(t=>{t.addEventListener("click",()=>{const o=t.getAttribute("data-preset");o&&o in C&&(c=o,d=C[c].defaultStationIndex,m(k(c,d)))})});$.addEventListener("input",()=>{d=Number($.value),m(k(c,d))});M.addEventListener("click",t=>{const o=t.target.closest("tr[data-station-row]");o&&(d=Number(o.getAttribute("data-station-row")),m(k(c,d)))});U.addEventListener("click",()=>{g=g==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",g),U.textContent=`Theme: ${g.toUpperCase()}`,m(k(c,d))});m(k(c,d));
