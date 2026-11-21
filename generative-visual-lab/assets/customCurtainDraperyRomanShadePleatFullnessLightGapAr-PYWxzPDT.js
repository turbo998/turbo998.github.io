import"./modulepreload-polyfill-B5Qt9EMX.js";const v={"bedroom-dual-track-pelmet":{id:"bedroom-dual-track-pelmet",titleZh:"主卧双轨暗装窗帘盒（布帘+幻影纱 · 2.3倍韩褶波深 210mm · 15mm 扫地机净空 + 0.6 Lux 睡眠全黑）",titleEn:"Master Bedroom Dual-Track Pelmet (Blackout + Sheer · 2.3x Memory Pleat · 15mm Float · 0.6 Lux Dark)",windowSpec:"3,400mm Width × 2,720mm Height · 220mm Ceiling Pelmet Box",ceilingToFloorMm:2720,trackAndRingDropMm:38,targetFloorFloatMm:15,pelmetBoxDepthMm:220,requiredDualWaveDepthMm:205,naiveLightLeakLux:485,sealedLightLeakLux:.6,recommendedCutSpec:"2.3x Pinch Pleat · Cut Height 2,667mm · 90mm Magnetic Return Wrap",naiveRemakeRatePct:27.6,arRemakeRatePct:2.7,annualSavingsPer100kOrdersUsd:192e4},"out-of-square-inside-roman":{id:"out-of-square-inside-roman",titleZh:"内嵌式歪斜老窗框蜂巢帘/罗马帘（上中下宽差 14mm · 取 min(W)-6mm 防卡死 + L型消光侧槽 0.8 Lux）",titleEn:"Out-of-Square Inside-Mount Honeycomb/Roman Shade (14mm Frame Skew · min(W)-6mm + L-Channel Light Block)",windowSpec:"Top 1,496mm / Mid 1,488mm / Bot 1,482mm Skewed Frame × 1,850mm Height",ceilingToFloorMm:1850,trackAndRingDropMm:12,targetFloorFloatMm:4,pelmetBoxDepthMm:95,requiredDualWaveDepthMm:68,naiveLightLeakLux:620,sealedLightLeakLux:.8,recommendedCutSpec:"Headrail Width 1,476mm (min-6mm) + 28mm L-Shape Side Light-Block Channels",naiveRemakeRatePct:31.2,arRemakeRatePct:2.9,annualSavingsPer100kOrdersUsd:218e4},"double-height-motorized-sheer":{id:"double-height-motorized-sheer",titleZh:"别墅 5.6米挑高客厅电动蛇形帘（Ripple-Fold S波 · 28.4kg 自重匹配 2.5N·m 静音双电机与 18mm 悬空）",titleEn:"5.6m Double-Height Living Room Motorized Ripple-Fold Drapery (28.4kg Load · 2.5N·m Somfy Motor Lock)",windowSpec:"5,200mm Width × 5,600mm Height · 420gsm Velvet + Linen Sheer",ceilingToFloorMm:5600,trackAndRingDropMm:46,targetFloorFloatMm:18,pelmetBoxDepthMm:260,requiredDualWaveDepthMm:235,naiveLightLeakLux:390,sealedLightLeakLux:.9,recommendedCutSpec:"2.5x S-Wave Ripple-Fold · Cut Height 5,536mm · Tandem 2.5 N·m Motorized Track",naiveRemakeRatePct:26.4,arRemakeRatePct:2.5,annualSavingsPer100kOrdersUsd:234e4}};function f(a,t){const e=v[a],s=t==="lidar-3pt-catenary-pleat-light-seal-ar",g=e.ceilingToFloorMm-e.trackAndRingDropMm-e.targetFloorFloatMm,n=s?e.targetFloorFloatMm:-23,i=s?e.sealedLightLeakLux:e.naiveLightLeakLux,r=s?e.arRemakeRatePct:e.naiveRemakeRatePct,l=i<=1,c=n>=4&&n<=22;return{scenario:e,mode:t,exactCutPanelHeightMm:g,effectiveFloorClearanceMm:n,effectiveLightLeakLux:i,effectiveRemakeRatePct:r,blackoutSleepPass:l,robotVacuumClearancePass:c,verdictBadge:s?`3-POINT LIDAR & 0.6 LUX SEAL LOCKED (Cut ${g}mm · +${n}mm Float · ${i.toFixed(1)} Lux)`:`LIGHT-GAP HALO & FLOOR DRAG (${e.naiveLightLeakLux.toFixed(0)} Lux Leak · -23mm Floor Drag · ${e.naiveRemakeRatePct}% Remake)`}}const S=document.querySelector("#app");let L="bedroom-dual-track-pelmet",x="lidar-3pt-catenary-pleat-light-seal-ar";function b(){const a=f(L,x),t=a.scenario,e=x==="lidar-3pt-catenary-pleat-light-seal-ar";S.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 392 · 181st Curated Workbench · Domain 2 (Custom Drapery, Roman Shade, Catenary Pleat Fullness & Light-Gap AR Studio)</span>
        <h1>全屋定制窗帘、法式韩褶/蛇形帘波深与窗框消光缝 3D 光度学 AR 工作台</h1>
        <p class="wb-subtitle">终结消费者单点卷尺自量忽略老房窗框 14mm 歪斜导致内嵌罗马帘卡死、漏算轨道滑轮坠降（-38mm）导致底摆拖地卷入扫地机、以及四周漏光光晕高达 485 Lux 的痛点：结合三点宽/高 LiDAR 测量、2.3倍韩褶波谷深度（205mm 窗帘盒防摩擦）与 L型侧槽/回弯消光仿真，将重做率从 27.6% 压至 2.7%（每 10万单省 +$1.92M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${a.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Window Scenario and Pipeline Controls">
      <div class="control-group">
        <span class="control-label">1. 选择窗户建筑形态与软装帘型 (Window Architecture & Drapery Preset):</span>
        <div class="btn-row">
          ${Object.keys(v).map(s=>`
            <button type="button" class="scenario-btn ${L===s?"active":""}" data-scenario="${s}">
              ${v[s].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换窗帘量尺、波深与遮光仿真管线 (Metrology & Light-Seal Mode):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="naive-single-tape-15x-flat">
            ❌ 传统基线：单点卷尺自量 + 1.5倍省布平拉 + 忽略轨道坠降 (四周 485 Lux 刺眼漏光 + 拖地积灰)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="lidar-3pt-catenary-pleat-light-seal-ar">
            ✅ 推荐架构：三点斜度扣减 + 2.3x 记忆定型波深校核 + 侧槽/回弯 ≤0.8 Lux 全黑睡眠引擎
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Custom Drapery & Photometric KPIs">
      <div class="kpi-card">
        <span class="kpi-title">成品帘体精准定高裁切值 (Exact Cut Height)</span>
        <strong class="kpi-value good" id="kpi-cut">${a.exactCutPanelHeightMm.toLocaleString("en-US")} mm</strong>
        <span class="kpi-sub">净高 ${t.ceilingToFloorMm}mm - 轨道滑轮 ${t.trackAndRingDropMm}mm - 悬空 ${t.targetFloorFloatMm}mm</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">清晨正午室内残余漏光照度 (Residual Light Leak)</span>
        <strong class="kpi-value ${a.blackoutSleepPass?"good":"bad"}" id="kpi-lux">${a.effectiveLightLeakLux.toFixed(1)} Lux</strong>
        <span class="kpi-sub">深睡级标准 ≤ 1.0 Lux · 对比未封边 ${t.naiveLightLeakLux.toFixed(0)} Lux 光晕</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">底摆离地净空与双轨盒深 (Float & Pelmet Box)</span>
        <strong class="kpi-value ${a.robotVacuumClearancePass?"good":"bad"}" id="kpi-float">${a.effectiveFloorClearanceMm>=0?"+":""}${a.effectiveFloorClearanceMm} mm · ${t.pelmetBoxDepthMm}mm 盒</strong>
        <span class="kpi-sub">${e?`双轨波深 ${t.requiredDualWaveDepthMm}mm ≤ ${t.pelmetBoxDepthMm}mm 零干涉`:"底摆拖地 23mm 被扫地机器人卷入卡死"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">定制重做率与每 10万单净省 (ROI)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">${a.effectiveRemakeRatePct.toFixed(1)}% · +$${(t.annualSavingsPer100kOrdersUsd/1e6).toFixed(2)}M</strong>
        <span class="kpi-sub">对比传统自量 ${t.naiveRemakeRatePct.toFixed(1)}% 报废重做率</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>窗洞三点斜度与漏光光晕 (Lux) 对比 + 顶视双轨窗帘盒 (Pelmet) 2.3x 悬链波浪包络画布</h2>
          <span class="tag">${t.windowSpec}</span>
        </div>
        <canvas id="curtain-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>全屋软装光度学与工厂定寸裁床明细 (Photometric & Cut-Spec Audit)</h2>
        <ul class="audit-list">
          <li><span>实测窗洞建筑规格:</span> <strong>${t.windowSpec}</strong></li>
          <li><span>轨道与滑轮吊环坠降扣减:</span> <strong>-${t.trackAndRingDropMm} mm (顶轨 + 静音滑轮吊环)</strong></li>
          <li><span>成品定高与扫地机净空:</span> <strong>定高 ${a.exactCutPanelHeightMm} mm (离地 +${t.targetFloorFloatMm} mm 防卷入)</strong></li>
          <li><span>窗帘盒深度 vs 双轨波浪宽:</span> <strong>盒深 ${t.pelmetBoxDepthMm} mm ≥ 双轨波深 ${t.requiredDualWaveDepthMm} mm (零摩擦)</strong></li>
          <li><span>遮光封边与回弯处方:</span> <strong>${t.recommendedCutSpec}</strong></li>
          <li><span>卧室残余漏光照度:</span> <strong>${t.naiveLightLeakLux.toFixed(0)} Lux → ${a.effectiveLightLeakLux.toFixed(1)} Lux (-99.8%)</strong></li>
          <li><span>每 10万单节省重做报废成本:</span> <strong>+$${t.annualSavingsPer100kOrdersUsd.toLocaleString("en-US")} / 100k Orders</strong></li>
        </ul>
      </div>
    </main>
  `,R(),M(a)}function R(){document.querySelectorAll(".scenario-btn").forEach(a=>{a.addEventListener("click",()=>{L=a.dataset.scenario,b()})}),document.querySelectorAll(".mode-btn").forEach(a=>{a.addEventListener("click",()=>{x=a.dataset.mode,b()})})}function M(a){const t=document.querySelector("#curtain-canvas");if(!t)return;const e=t.getContext("2d"),s=t.width,g=t.height,n=a.scenario,i=a.mode==="lidar-3pt-catenary-pleat-light-seal-ar";e.fillStyle="#070b14",e.fillRect(0,0,s,g),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. Front Elevation: Light-Gap Halo (0.6 Lux vs 485 Lux) & +15mm Floor Float",22,26);const r=44,l=48,c=336,d=278;e.strokeStyle="#64748b",e.lineWidth=2.5,e.beginPath(),e.moveTo(24,l+d),e.lineTo(402,l+d),e.stroke(),i||(e.strokeStyle="rgba(250, 204, 21, 0.92)",e.lineWidth=10,e.strokeRect(r+6,l+8,c-12,d-4));const h=i?l+d-n.targetFloorFloatMm:l+d+14;e.fillStyle=i?"#1e293b":"rgba(30, 41, 59, 0.88)",e.strokeStyle=i?"#38bdf8":"#ef4444",e.lineWidth=2,e.beginPath(),e.roundRect(r,l,c,h-l,4),e.fill(),e.stroke();for(let o=r+24;o<r+c-16;o+=28)e.strokeStyle=i?"rgba(56, 189, 248, 0.35)":"rgba(148, 163, 184, 0.2)",e.lineWidth=2,e.beginPath(),e.moveTo(o,l+6),e.lineTo(o,h-4),e.stroke();e.strokeStyle=i?"#10b981":"#facc15",e.lineWidth=3,e.beginPath(),e.moveTo(r+c/2,l),e.lineTo(r+c/2,h),e.stroke(),e.fillStyle=i?"#34d399":"#f87171",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(i?`✓ 0.6 Lux Blackout Seal + Exact ${a.exactCutPanelHeightMm}mm Cut (+${n.targetFloorFloatMm}mm Float)`:`✕ ${n.naiveLightLeakLux.toFixed(0)} Lux Side/Top Halo + Uncompensated -${n.trackAndRingDropMm}mm Drop Drags Floor!`,22,374);const m=426;e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. Top-Down Ceiling Pelmet Box & 2.3× Catenary S-Wave Envelope",m,26),e.fillStyle="rgba(15, 23, 42, 0.92)",e.strokeStyle="rgba(148, 163, 184, 0.28)",e.lineWidth=1.5,e.beginPath(),e.roundRect(m,44,372,298,10),e.fill(),e.stroke(),e.strokeStyle="#94a3b8",e.lineWidth=3,e.strokeRect(m+22,68,328,174),e.strokeStyle="#38bdf8",e.lineWidth=2.6,e.beginPath();for(let o=0;o<=296;o+=4){const p=m+38+o,k=i?24:8,u=108+Math.sin(o/296*Math.PI*7)*k;o===0?e.moveTo(p,u):e.lineTo(p,u)}e.stroke(),e.strokeStyle=i?"#10b981":"#ef4444",e.lineWidth=3,e.beginPath();for(let o=0;o<=296;o+=4){const p=m+38+o,k=i?34:10,u=186+Math.sin(o/296*Math.PI*7)*k;o===0?e.moveTo(p,u):e.lineTo(p,u)}e.stroke(),e.fillStyle="#cbd5e1",e.font="11.5px Inter, system-ui, sans-serif",e.fillText(`Pelmet Depth: ${n.pelmetBoxDepthMm}mm (Required Wave Span: ${n.requiredDualWaveDepthMm}mm)`,m+24,272),e.fillText(`Spec: ${n.recommendedCutSpec.slice(0,52)}`,m+24,298),e.fillStyle=i?"#34d399":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(i?`✓ Zero Wave Rubbing + 90mm Return Wrap: Remake cut 27.6% → ${a.effectiveRemakeRatePct.toFixed(1)}%`:"✕ 1.5x Flat Sheet + Unwrapped Track Ends Leak Morning Sunlight",m+2,374)}b();
