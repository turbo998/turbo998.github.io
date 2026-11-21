import"./modulepreload-polyfill-B5Qt9EMX.js";const d={"deep-freeze-42m-double-deep-rack":{id:"deep-freeze-42m-double-deep-rack",titleZh:"-28°C 42米双深位立体冷库（钢架冷缩 -21.4mm · EN 15620 立柱垂直度 ±0.8mm 锁定 · 0天升温停库）",titleEn:"-28°C 42m Double-Deep High-Bay AS/RS (-21.4mm Thermal Contraction · ±0.8mm EN 15620 Plumb Lock)",chamberTempCelsius:-28,rackHeightMeters:42,thermalShrinkageMm:-21.4,en15620PlumbLimitMm:120,naiveRgbFogErrorMm:92.4,hybridLidarSplineErrorMm:.8,palletOverhangClearanceMm:75,thawDowntimeDaysSaved:14,annualAvoidedCollapseSpoilageUsd:564e4},"biopharma-minus40c-shuttle-aisle":{id:"biopharma-minus40c-shuttle-aisle",titleZh:"-40°C 生物医药超低温多穿库（四向穿梭车导轨微霜打滑 LWIR 预警 + 货叉伸展挠度动态补偿）",titleEn:"-40°C Biopharma 4-Way Shuttle Freezer (LWIR Rail Hoarfrost Slip Alert + Telescopic Fork Deflection Comp)",chamberTempCelsius:-40,rackHeightMeters:34,thermalShrinkageMm:-26.8,en15620PlumbLimitMm:95,naiveRgbFogErrorMm:108,hybridLidarSplineErrorMm:.65,palletOverhangClearanceMm:60,thawDowntimeDaysSaved:18,annualAvoidedCollapseSpoilageUsd:692e4},"high-speed-dock-airlock-frost-shield":{id:"high-speed-dock-airlock-frost-shield",titleZh:"冷穿堂月台互锁气闸门与蒸发器融霜区（LWIR 冷桥漏冷断层 + 光电反射板结冰自动除霜联动）",titleEn:"Cold-Dock Airlock & Evaporator Defrost Zone (LWIR Thermal-Bridge Tomography + Retroreflector De-Icing)",chamberTempCelsius:-25,rackHeightMeters:38,thermalShrinkageMm:-19.2,en15620PlumbLimitMm:110,naiveRgbFogErrorMm:84.5,hybridLidarSplineErrorMm:.75,palletOverhangClearanceMm:70,thawDowntimeDaysSaved:12,annualAvoidedCollapseSpoilageUsd:485e4}};function S(i,a){const e=d[i],r=a==="crane-solid-lidar-lwir-en15620-spline-3dgs",o=r?e.hybridLidarSplineErrorMm:e.naiveRgbFogErrorMm,l=r?.12:24.6,t=r?0:e.thawDowntimeDaysSaved;return{preset:e,pipeline:a,effectivePlumbErrorMm:o,effectiveShuttleSlipRiskPct:l,effectiveThawDays:t,en15620TolerancePass:o<=1.5,zeroThawOutagePass:t===0,verdictBadge:r?`EN 15620 RACK & FROST SHIELD LOCKED (±${o.toFixed(2)}mm Plumb · 0 Thaw Days · +$${(e.annualAvoidedCollapseSpoilageUsd/1e6).toFixed(2)}M/yr)`:`FOG 3DGS DRIFT (±${o.toFixed(1)}mm) & ${e.thawDowntimeDaysSaved}-DAY THAW OUTAGE ($680k Loss!)`}}const v=document.querySelector("#app");let c="deep-freeze-42m-double-deep-rack",m="crane-solid-lidar-lwir-en15620-spline-3dgs";function p(){const i=S(c,m),a=i.preset,e=m==="crane-solid-lidar-lwir-en15620-spline-3dgs";v.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 399 · 188th Interactive Workbench · Domain 4 (Lineage / Americold / Daifuku / Dematic Automated Cold-Chain AS/RS 3DGS Studio)</span>
        <h1>-28°C 超低温自动化立体冷库 (AS/RS 42m)：EN 15620 货架冷缩挠度、导轨结霜与 LWIR+LiDAR 3DGS 工作台</h1>
        <p class="wb-subtitle">解决 -28°C~-40°C 万托级高架立体冷库中，42米钢货架从常温降温产生 ${a.thermalShrinkageMm}mm 热冷缩与叉齿撞击倾斜（超出 EN 15620 / FEM 9.831 公差引发堆垛机撞架塌库，单次损失 >$18M）、普通 RGB 相机在冷雾结霜下 3DGS 漂移 ±${a.naiveRgbFogErrorMm}mm、或被迫停库升温 ${a.thawDowntimeDaysSaved} 天人工登高检测的痛点：通过随堆垛机（Stacker Crane）运行的耐寒固态 LiDAR + LWIR 热红外结冰检测 + 1D 立柱/横梁 FEM 挠度样条与 3DGS 联合孪生（±${a.hybridLidarSplineErrorMm}mm 精度），实现 0 停机动态货位坐标补偿（年省 +$${(a.annualAvoidedCollapseSpoilageUsd/1e6).toFixed(2)}M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${i.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Cold-Chain AS/RS Preset and 3DGS Inspection Controls">
      <div class="control-group">
        <span class="control-label">1. 选择超低温立体冷库与多穿库巡检场景 (Cold-Chain AS/RS Facility Preset):</span>
        <div class="btn-row">
          ${Object.keys(d).map(r=>`
            <button type="button" class="scenario-btn ${c===r?"active":""}" data-scenario="${r}">
              ${d[r].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换超低温货架挠度与结霜巡检数字孪生管线 (Sub-Zero Rack & Frost Twin Pipeline):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="naive-rgb-fog-3dgs-or-manual-thaw-audit">
            ❌ 传统基线：冷雾 RGB 3DGS (漂移 ±${a.naiveRgbFogErrorMm}mm 漏检托盘超限) 或停库升温 ${a.thawDowntimeDaysSaved}天人工复测 ($680k 损耗)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="crane-solid-lidar-lwir-en15620-spline-3dgs">
            ✅ 推荐架构：堆垛机耐寒 LiDAR + LWIR 结霜热成像 + EN 15620 立柱 1D 样条 3DGS (±${a.hybridLidarSplineErrorMm}mm · 0停库)
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Cold-Chain AS/RS 3DGS KPIs">
      <div class="kpi-card">
        <span class="kpi-title">42m 货架立柱与牛腿定位精度 (EN 15620 Plumb Error)</span>
        <strong class="kpi-value ${i.en15620TolerancePass?"good":"bad"}" id="kpi-plumb">±${i.effectivePlumbErrorMm.toFixed(2)} mm</strong>
        <span class="kpi-sub">${a.chamberTempCelsius}°C 冷缩 ${a.thermalShrinkageMm}mm 自动补偿 · 对比 RGB 雾化 ±${a.naiveRgbFogErrorMm}mm</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">导轨微霜打滑与激光测距盲区率 (Rail Frost Slip Risk)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-frost">${i.effectiveShuttleSlipRiskPct.toFixed(2)}%</strong>
        <span class="kpi-sub">LWIR 8–14μm 识别 0.3mm 导轨与反射板冰膜并联动局部电伴热</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">年度升温除冰停库检修天数 (Annual Thaw Downtime)</span>
        <strong class="kpi-value ${i.zeroThawOutagePass?"good":"bad"}" id="kpi-thaw">${i.effectiveThawDays} Days (Saved ${a.thawDowntimeDaysSaved}d)</strong>
        <span class="kpi-sub">堆垛机日常出入库顺带完成全库 65,000 货位毫米级扫描</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">单库年化规避撞架塌库与漏冷损失 (Annual Hub Savings)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${(a.annualAvoidedCollapseSpoilageUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">拦截 ≥${a.palletOverhangClearanceMm}mm 托盘悬挑超限与地坪冻胀沉降</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>${a.chamberTempCelsius}°C 高架冷库立柱冷缩 1D 样条 (EN 15620)、托盘探出包络 BVH 与 LWIR 结霜热断层画布</h2>
          <span class="tag">${a.rackHeightMeters}m High-Bay · ${a.chamberTempCelsius}°C · ΔL=${a.thermalShrinkageMm}mm</span>
        </div>
        <canvas id="coldchain-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>EN 15620 / FEM 9.831 货架挠度与结霜安全审计 (AS/RS Structural & Frost Audit)</h2>
        <ul class="audit-list">
          <li><span>冷库工况温度与货架高度:</span> <strong>${a.chamberTempCelsius} °C 超低温 · ${a.rackHeightMeters} 米双深位窄巷道</strong></li>
          <li><span>钢结构冷缩量与 PLC 坐标动态补偿:</span> <strong>竖向收缩 ${a.thermalShrinkageMm} mm (α=1.2×10⁻⁵/K 实时写回 WCS)</strong></li>
          <li><span>EN 15620 立柱垂直度与横梁 L/300 挠度:</span> <strong>实测精度 ±${i.effectivePlumbErrorMm.toFixed(2)} mm (红线阈值 Cx ≤ ${a.en15620PlumbLimitMm}mm)</strong></li>
          <li><span>双深位伸缩货叉 (Telescopic Fork) 净空:</span> <strong>≥ ${a.palletOverhangClearanceMm.toFixed(0)} mm 托盘探出与破损木托盘 BVH 拦截</strong></li>
          <li><span>LWIR 热红外导轨冰膜与冷桥监测:</span> <strong>提前 21 天预警导轨结霜 (打滑风险降至 ${i.effectiveShuttleSlipRiskPct}%)</strong></li>
          <li><span>免升温停库巡检节省工期:</span> <strong>0 天停机 (规避 ${a.thawDowntimeDaysSaved} 天停库倒货与复冻电费)</strong></li>
          <li><span>区域冷链中心年化综合止损:</span> <strong>+$${a.annualAvoidedCollapseSpoilageUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,f(),k(i)}function f(){document.querySelectorAll(".scenario-btn").forEach(i=>{i.addEventListener("click",()=>{c=i.dataset.scenario,p()})}),document.querySelectorAll(".mode-btn").forEach(i=>{i.addEventListener("click",()=>{m=i.dataset.mode,p()})})}function k(i){const a=document.querySelector("#coldchain-canvas");if(!a)return;const e=a.getContext("2d"),r=a.width,o=a.height,l=i.preset,t=i.pipeline==="crane-solid-lidar-lwir-en15620-spline-3dgs";e.fillStyle="#070b14",e.fillRect(0,0,r,o),e.fillStyle="#0f172a",e.strokeStyle="rgba(56, 189, 248, 0.35)",e.lineWidth=1.5,e.beginPath(),e.roundRect(20,20,412,360,12),e.fill(),e.stroke(),e.fillStyle="#e2e8f0",e.font="bold 12.5px Inter, system-ui, sans-serif",e.fillText(`1. ${l.rackHeightMeters}m High-Bay Upright Spline (${l.chamberTempCelsius}°C, ΔL=${l.thermalShrinkageMm}mm)`,36,46);const g=[82,134,186,238,290];e.strokeStyle=t?"#38bdf8":"#ef4444",e.lineWidth=3,e.beginPath(),e.moveTo(92,64),e.quadraticCurveTo(t?96:116,186,92,330),e.stroke(),e.beginPath(),e.moveTo(356,64),e.quadraticCurveTo(t?352:334,186,356,330),e.stroke(),e.strokeStyle="#10b981",e.lineWidth=2.4,e.beginPath(),e.moveTo(224,62),e.lineTo(224,332),e.stroke(),g.forEach((s,b)=>{e.strokeStyle="rgba(148, 163, 184, 0.45)",e.lineWidth=2,e.beginPath(),e.moveTo(92,s+28),e.lineTo(188,s+28),e.moveTo(260,s+28),e.lineTo(356,s+28),e.stroke();const h=b===2;e.fillStyle=h?t?"rgba(245, 158, 11, 0.32)":"rgba(239, 68, 68, 0.45)":"rgba(56, 189, 248, 0.22)",e.strokeStyle=h?t?"#f59e0b":"#ef4444":"#38bdf8",e.lineWidth=1.6,e.fillRect(104,s,76,26),e.strokeRect(104,s,76,26),e.fillRect(268,s,76,26),e.strokeRect(268,s,76,26)}),e.fillStyle=t?"#34d399":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(t?`✓ EN 15620 Plumb Locked (±${i.effectivePlumbErrorMm}mm) + PLC Z-Shrinkage Auto-Offset`:`✕ Ice-Fog Blinds RGB 3DGS (±${l.naiveRgbFogErrorMm}mm) · Fork Strikes Upright!`,36,362),e.fillStyle="#e2e8f0",e.font="bold 12.5px Inter, system-ui, sans-serif",e.fillText("2. Opportunistic Crane LiDAR + LWIR Frost Shield Architecture",452,46);const u=[{title:"Layer 1: Opportunistic Stacker-Crane Solid-State LiDAR",sub:"Scans 65,000 pallet bays during normal putaway (0 thaw downtime days)",color:"#38bdf8"},{title:"Layer 2: 1D Upright/Beam FEM Spline & Thermal Shrinkage Comp",sub:`Updates WCS fork Z-targets for ${l.thermalShrinkageMm}mm @ ${l.chamberTempCelsius}°C (±${i.effectivePlumbErrorMm}mm)`,color:"#10b981"},{title:"Layer 3: LWIR (8–14μm) Guide-Rail Hoarfrost & Floor Heave Map",sub:"Detects 0.3mm rail glaze & triggers localized pulse heating before slip",color:"#f59e0b"},{title:"Layer 4: Double-Deep Pallet Overhang & Broken-Skid BVH Gate",sub:`Enforces ≥${l.palletOverhangClearanceMm}mm telescopic fork clearance (+$${(l.annualAvoidedCollapseSpoilageUsd/1e6).toFixed(2)}M/yr saved)`,color:"#a855f7"}];let n=64;u.forEach(s=>{e.fillStyle=t?"rgba(15, 23, 42, 0.92)":"rgba(239, 68, 68, 0.15)",e.strokeStyle=t?s.color:"#ef4444",e.lineWidth=2,e.beginPath(),e.roundRect(452,n,348,70,10),e.fill(),e.stroke(),e.fillStyle=t?s.color:"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(s.title,466,n+28),e.fillStyle="#cbd5e1",e.font="11px Inter, system-ui, sans-serif",e.fillText(s.sub,466,n+50),n+=80})}p();
