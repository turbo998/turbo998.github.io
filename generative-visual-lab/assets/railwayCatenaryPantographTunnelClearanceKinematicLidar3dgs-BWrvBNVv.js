import"./modulepreload-polyfill-B5Qt9EMX.js";const u={"hsr-350kmh-cant-tunnel":{id:"hsr-350kmh-cant-tunnel",titleZh:"350km/h 高铁曲线超高石质隧道（超高 150mm · 二系悬挂侧滚 +118mm · 25kV 带电绝缘校核）",titleEn:"350km/h HSR Superelevated Rock Tunnel (150mm Cant · +118mm Dynamic Sway · 25kV AC Insulation Check)",lineSpeedKmh:350,trackCantMm:150,suspensionDynamicRollMm:118,catenaryStaggerActualMm:288,catenaryStaggerLimitMm:300,contactWireHeightMm:5300,naiveStaticClearanceMm:342,kinematicActualClearanceMm:318,electrical25kvInsulationMinMm:270,kmInspectedPerNightWindow:180,annualPossessionAndIncidentSavingsUsd:318e4},"double-stack-freight-arch":{id:"double-stack-freight-arch",titleZh:"既有马蹄形隧道双层集装箱改造（拱腰侵限检测 · 曲线内侧侧滚 +96mm · 接触网压低段 5,080mm）",titleEn:"Legacy Horseshoe Tunnel Double-Stack Freight Retrofit (+96mm Inner-Curve Roll · 5,080mm Low Catenary)",lineSpeedKmh:120,trackCantMm:115,suspensionDynamicRollMm:96,catenaryStaggerActualMm:245,catenaryStaggerLimitMm:300,contactWireHeightMm:5080,naiveStaticClearanceMm:210,kinematicActualClearanceMm:294,electrical25kvInsulationMinMm:270,kmInspectedPerNightWindow:160,annualPossessionAndIncidentSavingsUsd:274e4},"station-turnout-crossover":{id:"station-turnout-crossover",titleZh:"枢纽站咽喉区 18号高速道岔线岔交叉（受电弓羊角过渡区 · 拉出值 292mm 防刮弓闭环）",titleEn:"Station Throat #18 High-Speed Turnout Crossover (Pantograph Horn Transition · 292mm Stagger Guard)",lineSpeedKmh:160,trackCantMm:60,suspensionDynamicRollMm:64,catenaryStaggerActualMm:292,catenaryStaggerLimitMm:300,contactWireHeightMm:5450,naiveStaticClearanceMm:380,kinematicActualClearanceMm:346,electrical25kvInsulationMinMm:270,kmInspectedPerNightWindow:145,annualPossessionAndIncidentSavingsUsd:248e4}};function f(n,t){const e=u[n],l=t==="en15273-kinematic-catenary-spline-3dgs",p=l?1.5:84,r=l,s=l?e.kinematicActualClearanceMm:e.naiveStaticClearanceMm-e.trackCantMm-e.suspensionDynamicRollMm,c=l?e.kinematicActualClearanceMm:184,m=l&&p<=2.5&&c>=e.electrical25kvInsulationMinMm;return{scenario:e,mode:t,effectiveWireTrackingErrorMm:p,effectiveStaggerDetected:r,effectiveTunnelRoofMarginMm:s,effectiveElectricalClearanceMm:c,en15273SafetyPass:m,verdictBadge:l?`EN 15273 KINEMATIC & 25kV LOCKED (±1.5mm Wire Spline · ${c}mm ≥ 270mm Air Gap)`:`DEWIRING & 25kV FLASHOVER RISK (±84mm Wire Drop-Out · Ignores +${e.trackCantMm+e.suspensionDynamicRollMm}mm Cant/Sway)`}}const b=document.querySelector("#app");let S="hsr-350kmh-cant-tunnel",M="en15273-kinematic-catenary-spline-3dgs";function y(){const n=f(S,M),t=n.scenario,e=M==="en15273-kinematic-catenary-spline-3dgs";b.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 379 · 168th Curated Workbench · Domain 4 (High-Speed Rail Catenary-Pantograph & EN 15273 Tunnel Kinematic Clearance 3DGS Studio)</span>
        <h1>高铁受电弓—接触网拉出值/导高与隧道超限净空 (EN 15273) 移动 LiDAR + 3DGS 工作台</h1>
        <p class="wb-subtitle">结合 80km/h 轨检车 2MHz 断面激光与轨枕/支柱因子图 SLAM（±1.8mm）、12mm 铜镁接触线 1D 悬链线解析样条（拉出值精度 ±1.5mm）与 EN 15273 曲线超高（Cant 150mm）+ 二系悬挂侧滚（+118mm）动态包络线及 25kV 带电绝缘球（≥270mm）校核，单晚天窗巡检 180km（年省 +$3.18M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${n.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Corridor Scenario and Pipeline Controls">
      <div class="control-group">
        <span class="control-label">1. 选择铁路限界与接触网工况 (Railway Corridor & Catenary Preset):</span>
        <div class="btn-row">
          ${Object.keys(u).map(l=>`
            <button type="button" class="scenario-btn ${S===l?"active":""}" data-scenario="${l}">
              ${u[l].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换隧道限界与接触网重建管线 (Clearance & Catenary Pipeline):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="naive-static-aabb-sfm-3dgs">
            ❌ 传统基线：纯视觉 3DGS 体素化 + 静态车体 AABB (12mm 接触线断线 + 漏算超高侧滚闪络)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="en15273-kinematic-catenary-spline-3dgs">
            ✅ 推荐架构：1D 接触网参数样条 (±1.5mm) + EN 15273 超高侧滚扫掠 BVH + 3DGS 衬砌孪生
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Railway Kinematic & Catenary KPIs">
      <div class="kpi-card">
        <span class="kpi-title">12mm 接触线拉出值/导高追踪误差 (Wire Error)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-wire">±${n.effectiveWireTrackingErrorMm.toFixed(1)} mm</strong>
        <span class="kpi-sub">实测拉出值 ${t.catenaryStaggerActualMm}mm (红线 ±${t.catenaryStaggerLimitMm}mm) · 导高 ${t.contactWireHeightMm}mm</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">曲线超高 + 二系悬挂侧滚偏移 (Cant + Sway)</span>
        <strong class="kpi-value good" id="kpi-sway">+${t.trackCantMm+t.suspensionDynamicRollMm} mm</strong>
        <span class="kpi-sub">超高 ${t.trackCantMm}mm + 动态侧滚 ${t.suspensionDynamicRollMm}mm (${t.lineSpeedKmh} km/h)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">25kV AC 隧道拱顶带电绝缘间隙 (25kV Air Gap)</span>
        <strong class="kpi-value ${n.effectiveElectricalClearanceMm>=t.electrical25kvInsulationMinMm?"good":"bad"}" id="kpi-insulation">${n.effectiveElectricalClearanceMm} mm</strong>
        <span class="kpi-sub">防电弧闪络安全红线 ≥ ${t.electrical25kvInsulationMinMm} mm (EN 50119)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">单晚天窗巡检里程与年化净省 (Night Window ROI)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">${e?t.kmInspectedPerNightWindow:3.2} km · +$${(t.annualPossessionAndIncidentSavingsUsd/1e6).toFixed(2)}M</strong>
        <span class="kpi-sub">对比人工手推激光尺 3.2 km/晚 (56x 效率跃升)</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>隧道断面 3DGS + EN 15273 曲线超高动态侧滚包络线 + 受电弓Z字拉出值俯视图</h2>
          <span class="tag">${t.lineSpeedKmh} km/h · Cant ${t.trackCantMm}mm · Wire Height ${t.contactWireHeightMm}mm</span>
        </div>
        <canvas id="rail-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>接触网几何与 EN 15273 动态限界审计明细 (Catenary & Kinematic Audit)</h2>
        <ul class="audit-list">
          <li><span>运行速度与外轨超高 (Cant):</span> <strong>${t.lineSpeedKmh} km/h · 超高 ${t.trackCantMm} mm</strong></li>
          <li><span>二系空气弹簧车顶动态侧滚:</span> <strong>+${t.suspensionDynamicRollMm} mm (合计偏移 +${t.trackCantMm+t.suspensionDynamicRollMm} mm)</strong></li>
          <li><span>接触线拉出值 (Stagger):</span> <strong>${t.catenaryStaggerActualMm} mm / 滑板有效工作半宽 ±${t.catenaryStaggerLimitMm} mm</strong></li>
          <li><span>接触线拟合精度:</span> <strong>${e?"±1.5 mm (1D Catenary Spline)":"±84.0 mm (Voxel Drop-Out 断线)"}</strong></li>
          <li><span>25kV 受电弓—衬砌最小放电间隙:</span> <strong>${n.effectiveElectricalClearanceMm} mm (要求 ≥ ${t.electrical25kvInsulationMinMm} mm)</strong></li>
          <li><span>00:30–04:00 天窗巡检速度:</span> <strong>${e?`${t.kmInspectedPerNightWindow} km/晚 (80km/h 轨检车)`:"3.2 km/晚 (人工手推车)"}</strong></li>
          <li><span>单条干线年省封锁与排障成本:</span> <strong>+$${t.annualPossessionAndIncidentSavingsUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,C(),$(n)}function C(){document.querySelectorAll(".scenario-btn").forEach(n=>{n.addEventListener("click",()=>{S=n.dataset.scenario,y()})}),document.querySelectorAll(".mode-btn").forEach(n=>{n.addEventListener("click",()=>{M=n.dataset.mode,y()})})}function $(n){const t=document.querySelector("#rail-canvas");if(!t)return;const e=t.getContext("2d"),l=t.width,p=t.height,r=n.scenario,s=n.mode==="en15273-kinematic-catenary-spline-3dgs";e.fillStyle="#070b14",e.fillRect(0,0,l,p),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. Tunnel 3DGS Cross-Section + EN 15273 Cant/Sway Kinematic Gauge",22,26);const c=210,m=240;e.strokeStyle="#64748b",e.lineWidth=5,e.beginPath(),e.arc(c,m-30,152,Math.PI*.88,Math.PI*.12,!1),e.stroke();for(let g=Math.PI*.9;g<=Math.PI*2.1;g+=.08){const k=c+Math.cos(g)*150,h=m-30+Math.sin(g)*150;e.fillStyle=s?"rgba(56, 189, 248, 0.55)":"rgba(248, 113, 113, 0.45)",e.beginPath(),e.arc(k,h,3,0,Math.PI*2),e.fill()}const v=-((r.trackCantMm+r.suspensionDynamicRollMm)/1435)*.85;e.strokeStyle="#94a3b8",e.lineWidth=3,e.beginPath(),e.moveTo(c-110,m+102),e.lineTo(c+110,m+102),e.stroke(),e.strokeStyle="rgba(148, 163, 184, 0.45)",e.setLineDash([5,4]),e.lineWidth=1.5,e.strokeRect(c-64,m-78,128,172),e.setLineDash([]),e.save(),e.translate(c,m+94),e.rotate(v),e.fillStyle=s?"rgba(16, 185, 129, 0.2)":"rgba(239, 68, 68, 0.25)",e.strokeStyle=s?"#10b981":"#ef4444",e.lineWidth=2.4,e.beginPath(),e.roundRect(-66,-174,132,172,12),e.fill(),e.stroke(),e.strokeStyle="#f59e0b",e.lineWidth=2.2,e.beginPath(),e.moveTo(0,-174),e.lineTo(-34,-196),e.lineTo(0,-218),e.lineTo(34,-196),e.closePath(),e.stroke(),e.strokeStyle="#38bdf8",e.lineWidth=3.2,e.beginPath(),e.moveTo(-48,-218),e.lineTo(48,-218),e.stroke(),e.strokeStyle=s?"rgba(52, 211, 153, 0.8)":"rgba(239, 68, 68, 0.9)",e.setLineDash([3,3]),e.lineWidth=2,e.beginPath(),e.arc(-44,-218,22,0,Math.PI*2),e.stroke(),e.setLineDash([]),e.restore(),e.fillStyle=s?"#34d399":"#f87171",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(s?`✓ Kinematic Cant+Sway (+${r.trackCantMm+r.suspensionDynamicRollMm}mm) & 25kV Gap (${n.effectiveElectricalClearanceMm}mm ≥ 270mm)`:`✕ Static AABB Misses +${r.trackCantMm+r.suspensionDynamicRollMm}mm Roof Roll → 25kV Arch Flashover (184mm < 270mm)!`,18,376);const a=432;e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. 12mm Contact Wire Zig-Zag Stagger (±300mm) & Pantograph Horn Lock",a,26),e.fillStyle="rgba(15, 23, 42, 0.92)",e.strokeStyle="rgba(148, 163, 184, 0.28)",e.lineWidth=1.5,e.beginPath(),e.roundRect(a,42,366,304,10),e.fill(),e.stroke();const i=194;e.strokeStyle="rgba(148, 163, 184, 0.35)",e.setLineDash([6,4]),e.beginPath(),e.moveTo(a+20,i),e.lineTo(a+346,i),e.stroke(),e.setLineDash([]);const o=76;e.fillStyle="rgba(16, 185, 129, 0.1)",e.fillRect(a+20,i-o,326,o*2),e.strokeStyle="rgba(16, 185, 129, 0.45)",e.lineWidth=1.5,e.beginPath(),e.moveTo(a+20,i-o),e.lineTo(a+346,i-o),e.moveTo(a+20,i+o),e.lineTo(a+346,i+o),e.stroke();const d=r.catenaryStaggerActualMm/r.catenaryStaggerLimitMm*o;e.strokeStyle=s?"#38bdf8":"#ef4444",e.lineWidth=3,s||e.setLineDash([8,14]),e.beginPath(),e.moveTo(a+24,i-d),e.lineTo(a+130,i+d),e.lineTo(a+238,i-d),e.lineTo(a+342,i+d*.85),e.stroke(),e.setLineDash([]),[a+24,a+130,a+238,a+342].forEach((g,k)=>{const h=k%2===0?i-d:i+d*(k===3?.85:1);e.fillStyle=s?"#34d399":"#f87171",e.beginPath(),e.arc(g,h,5,0,Math.PI*2),e.fill()}),e.fillStyle="#cbd5e1",e.font="11.5px Inter, system-ui, sans-serif",e.fillText("+300mm Left Carbon Horn Limit",a+26,i-o-8),e.fillText("-300mm Right Carbon Horn Limit",a+26,i+o+18),e.fillStyle=s?"#34d399":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(s?`✓ 1D Parametric Catenary Spline: Stagger ${r.catenaryStaggerActualMm}mm (±1.5mm Lock · 180km/night)`:"✕ Voxel Downsampling Drops 12mm Wire (±84mm Error · High-Speed Dewiring Risk!)",a+2,376)}y();
