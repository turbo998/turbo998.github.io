import"./modulepreload-polyfill-B5Qt9EMX.js";const m={"spillway-flip-bucket-cavitation":{id:"spillway-flip-bucket-cavitation",titleZh:"溢洪道反弧段高速空蚀坑定检（42m/s 泄洪流速 · 初生空化数 σ=0.18 < 0.25 · 48mm 剥落坑水下环氧修补）",titleEn:"Spillway Flip-Bucket Cavitation Pit Audit (42m/s Flow · σ=0.18 < 0.25 Limit · 48mm Spall Underwater Grout)",damStructureZone:"Spillway Chute Flip-Bucket Monolith #4 (18m Submergence · 42 m/s Peak Jet)",waterDepthMeters:18,flowVelocityPeakMps:42,waterTurbidityNtu:24,thomaCavitationSigma:.18,incipientSigmaLimit:.25,naivePitDepthErrorMm:185,fusedPitDepthErrorMm:1.4,detectedMaxSpallDepthMm:48,dewateringDaysSaved:28,annualHydroStationSavingsUsd:648e4},"stilling-basin-slab-scour":{id:"stilling-basin-slab-scour",titleZh:"消力池 2.5m 厚护坦底板止水铜片淘空（28 NTU 浑水 1.2MHz 声呐 + 532nm 绿光激光 · 免筑围堰省 28天）",titleEn:"Stilling Basin 2.5m Apron Slab Scour & Copper Waterstop Joint Audit (28 NTU Turbidity · 0 Dewatering Days)",damStructureZone:"Stilling Basin Apron Slab Joint J-12 (32m Depth · 28 NTU Turbid Plume)",waterDepthMeters:32,flowVelocityPeakMps:36.5,waterTurbidityNtu:28,thomaCavitationSigma:.21,incipientSigmaLimit:.25,naivePitDepthErrorMm:210,fusedPitDepthErrorMm:1.6,detectedMaxSpallDepthMm:62,dewateringDaysSaved:28,annualHydroStationSavingsUsd:712e4},"deep-intake-trashrack-80m":{id:"deep-intake-trashrack-80m",titleZh:"水下 80米电站进水口拦污栅金属疲劳与淤积（DVL+声学信标因子图 ±1.2mm 栅条变形检测防叶片打碎）",titleEn:"80m Deep Turbine Intake Trash-Rack Bar Fatigue & Debris Twin (±1.2mm Bar Deflection Lock)",damStructureZone:"800MW Francis Turbine Intake Trash-Rack Bay #2 (80m Depth · Zero Sunlight)",waterDepthMeters:80,flowVelocityPeakMps:14.8,waterTurbidityNtu:19,thomaCavitationSigma:.22,incipientSigmaLimit:.25,naivePitDepthErrorMm:165,fusedPitDepthErrorMm:1.2,detectedMaxSpallDepthMm:34,dewateringDaysSaved:21,annualHydroStationSavingsUsd:584e4}};function h(a,t){const e=m[a],i=t==="sonar-532nm-laser-snell-seathru-3dgs",o=i?e.fusedPitDepthErrorMm:e.naivePitDepthErrorMm,n=i?0:e.dewateringDaysSaved;return{scenario:e,mode:t,effectiveDepthErrorMm:o,effectiveDewateringDays:n,cavitationRiskMitigatedPass:i&&o<=2,zeroCofferdamDrainPass:i&&n===0,verdictBadge:i?`SNELL 3DGS & 532NM LASER LOCKED (±${o.toFixed(1)}mm Spall Lock · 0 Dewatering Days · +$${(e.annualHydroStationSavingsUsd/1e6).toFixed(2)}M)`:`TURBID BACKSCATTER & REFRACTIVE DRIFT (±${e.naivePitDepthErrorMm.toFixed(0)}mm Error · Requires ${e.dewateringDaysSaved}d Cofferdam Drain!)`}}const b=document.querySelector("#app");let u="spillway-flip-bucket-cavitation",S="sonar-532nm-laser-snell-seathru-3dgs";function f(){const a=h(u,S),t=a.scenario,e=S==="sonar-532nm-laser-snell-seathru-3dgs";b.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 394 · 183rd Curated Workbench · Domain 4 (Hydroelectric Dam Spillway Cavitation, Stilling Basin & ROV Sonar+532nm Laser 3DGS Studio)</span>
        <h1>特大型水电站溢洪道空蚀坑、消力池底板与水下 80m 拦污栅 ROV 声光融合 3DGS 工作台</h1>
        <p class="wb-subtitle">终结水下 28 NTU 浑水散射与平面防水罩折射畸变（n=1.334）导致普通水下视觉 3DGS 误差高达 ±185mm、或被迫耗资 $4.5M 筑围堰抽干消力池停工 28 天的痛点：融合 1.2MHz 多波束声呐、532nm 绿光激光线扫与斯涅尔折射光线追踪 Sea-Thru 3DGS，实现 ±1.4mm 空蚀坑计量并联动水下吸附机器人原位修补（单站年省 +$6.48M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${a.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Hydro Dam Scenario and Pipeline Controls">
      <div class="control-group">
        <span class="control-label">1. 选择大坝水下消能与引水关键部位 (Dam Underwater Structural Zone):</span>
        <div class="btn-row">
          ${Object.keys(m).map(i=>`
            <button type="button" class="scenario-btn ${u===i?"active":""}" data-scenario="${i}">
              ${m[i].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换水下空间重建与空蚀定检管线 (Underwater Spatial Twin Mode):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="naive-flatport-rgb-dewatering">
            ❌ 传统基线：未校正折射 RGB 相机 (浑水散射误差 ±185mm) 或筑围堰抽干消力池 (耗时 28天)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="sonar-532nm-laser-snell-seathru-3dgs">
            ✅ 推荐架构：1.2MHz 声呐 + 532nm 蓝绿激光 + Snell 折射校正 Sea-Thru 3DGS (±1.4mm 免抽水)
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Hydroelectric Dam Underwater Twin KPIs">
      <div class="kpi-card">
        <span class="kpi-title">混凝土空蚀坑深度计量精度 (Spall Depth Precision)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-error">±${a.effectiveDepthErrorMm.toFixed(1)} mm</strong>
        <span class="kpi-sub">检出最大空蚀剥落深度 ${t.detectedMaxSpallDepthMm.toFixed(1)} mm · 浑浊度 ${t.waterTurbidityNtu} NTU</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">托马空化数与初生空化门禁 (Thoma Cavitation σ)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-sigma">σ = ${t.thomaCavitationSigma.toFixed(2)} (&lt; ${t.incipientSigmaLimit.toFixed(2)})</strong>
        <span class="kpi-sub">泄洪峰值流速 ${t.flowVelocityPeakMps.toFixed(1)} m/s · ${e?"已派吸附 ROV 水下聚脲修补":"未修补将在下汛期掀翻底板!"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">消力池围堰抽干停工天数 (Dewatering Days)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-days">${a.effectiveDewateringDays} Days (-${e?t.dewateringDaysSaved:0}d)</strong>
        <span class="kpi-sub">水深 ${t.waterDepthMeters}m 带水原位巡检与负压灌浆修补</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">单座特大水电站年化净省 (Station Annual ROI)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${(t.annualHydroStationSavingsUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">${t.damStructureZone.split(" (")[0]}</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>水下 ROV 1.2MHz 声呐 + 532nm 绿光激光扫描 + 溢洪道/消力池空蚀坑 (σ=0.18) 3DGS 画布</h2>
          <span class="tag">${t.damStructureZone}</span>
        </div>
        <canvas id="dam-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>水下光学斯涅尔折射与空蚀流体力学审计 (Snell & Cavitation Audit)</h2>
        <ul class="audit-list">
          <li><span>巡检水工建筑物部位:</span> <strong>${t.damStructureZone}</strong></li>
          <li><span>水深、浑浊度与泄洪流速:</span> <strong>水深 ${t.waterDepthMeters}m · 浊度 ${t.waterTurbidityNtu} NTU · 峰值流速 ${t.flowVelocityPeakMps} m/s</strong></li>
          <li><span>防水罩水下折射率修正:</span> <strong>${e?"n_water=1.334 斯涅尔逐光线反向追踪 + 532nm 绿光":"无折射模型 (径向枕形畸变误差 ±185mm)"}</strong></li>
          <li><span>空蚀坑深度与坡率测量:</span> <strong>检出 ${t.detectedMaxSpallDepthMm.toFixed(1)} mm 空蚀坑 (精度 ±${a.effectiveDepthErrorMm.toFixed(1)} mm)</strong></li>
          <li><span>初生空化数安全校核:</span> <strong>实测 σ=${t.thomaCavitationSigma.toFixed(2)} &lt; σ_i=${t.incipientSigmaLimit.toFixed(2)} (触发水下研磨修补)</strong></li>
          <li><span>围堰抽水工期节省:</span> <strong>节省 ${t.dewateringDaysSaved} 天排空期 (立省 $4.5M 围堰抽水费)</strong></li>
          <li><span>水电站年化运维与发电收益:</span> <strong>+$${t.annualHydroStationSavingsUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,v(),D(a)}function v(){document.querySelectorAll(".scenario-btn").forEach(a=>{a.addEventListener("click",()=>{u=a.dataset.scenario,f()})}),document.querySelectorAll(".mode-btn").forEach(a=>{a.addEventListener("click",()=>{S=a.dataset.mode,f()})})}function D(a){const t=document.querySelector("#dam-canvas");if(!t)return;const e=t.getContext("2d"),i=t.width,o=t.height,n=a.scenario,s=a.mode==="sonar-532nm-laser-snell-seathru-3dgs";e.fillStyle="#06101e",e.fillRect(0,0,i,o),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. Underwater ROV 1.2MHz MBES + 532nm Green Laser Cavitation Scan",22,26),e.fillStyle="#1e293b",e.strokeStyle="#64748b",e.lineWidth=3,e.beginPath(),e.moveTo(22,74),e.quadraticCurveTo(132,272,240,272),e.lineTo(398,272),e.lineTo(398,348),e.lineTo(22,348),e.closePath(),e.fill(),e.stroke(),e.fillStyle="#06101e",e.strokeStyle="#ef4444",e.lineWidth=2.5,e.beginPath(),e.arc(268,272,24,0,Math.PI,!1),e.fill(),e.stroke(),e.strokeStyle="#f59e0b",e.lineWidth=2,e.beginPath(),e.moveTo(246,284),e.lineTo(290,284),e.stroke();const d=240,c=132;if(e.fillStyle="#f59e0b",e.strokeStyle="#fef08a",e.lineWidth=2,e.beginPath(),e.roundRect(d-28,c-16,56,32,8),e.fill(),e.stroke(),e.fillStyle="#0f172a",e.font="bold 10px Inter, system-ui, sans-serif",e.fillText("ROV-3DGS",d-22,c+4),s){const r=e.createLinearGradient(d,c+16,268,294);r.addColorStop(0,"rgba(16, 185, 129, 0.55)"),r.addColorStop(1,"rgba(16, 185, 129, 0.15)"),e.fillStyle=r,e.beginPath(),e.moveTo(d,c+16),e.lineTo(224,272),e.lineTo(314,272),e.closePath(),e.fill(),e.strokeStyle="#10b981",e.lineWidth=2,e.beginPath(),e.moveTo(d,c+16),e.lineTo(268,294),e.stroke()}else e.fillStyle="rgba(148, 163, 184, 0.36)",e.beginPath(),e.ellipse(258,218,92,48,0,0,Math.PI*2),e.fill(),e.fillStyle="#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText("✕ 28 NTU Backscatter + Flat-Port Refraction (±185mm Drift)",48,222);e.fillStyle=s?"#34d399":"#f87171",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(s?`✓ 532nm Green Laser + Snell 3DGS: Pit Depth ${n.detectedMaxSpallDepthMm}mm (±${a.effectiveDepthErrorMm}mm Lock)`:`✕ Blind in Turbid Water → Forces $4.5M / ${n.dewateringDaysSaved}-Day Cofferdam Dewatering!`,22,376);const l=428;e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. Cavitation Pit 3D Bathymetry & Thoma Number (σ) Grout Prescription",l,26),e.fillStyle="rgba(15, 23, 42, 0.92)",e.strokeStyle="rgba(148, 163, 184, 0.28)",e.lineWidth=1.5,e.beginPath(),e.roundRect(l,42,370,304,10),e.fill(),e.stroke();const g=l+185,y=148;[76,56,36,18].forEach((r,p)=>{e.fillStyle=s?`rgba(${p>1?"239, 68, 68":"56, 189, 248"}, ${.18+p*.12})`:"rgba(148, 163, 184, 0.15)",e.strokeStyle=s?p>1?"#ef4444":"#38bdf8":"#64748b",e.lineWidth=1.8,e.beginPath(),e.ellipse(g,y,r*1.35,r*.85,.15,0,Math.PI*2),e.fill(),e.stroke()}),e.fillStyle="#f8fafc",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(s?`Max Spall Depth: -${n.detectedMaxSpallDepthMm.toFixed(1)} mm (Rebar Exposed)`:"Unresolved Blurry Blob",g-92,y+4),e.fillStyle="#162033",e.beginPath(),e.roundRect(l+18,228,334,102,8),e.fill(),e.fillStyle="#38bdf8",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(`Thoma Cavitation Index: σ = ${n.thomaCavitationSigma.toFixed(2)} (Limit σ_i = ${n.incipientSigmaLimit.toFixed(2)})`,l+30,252),e.fillStyle="#cbd5e1",e.font="11.5px Inter, system-ui, sans-serif",e.fillText("• Epoxy/Polyurea Underwater Grout Volume: 0.42 m³",l+30,278),e.fillStyle=s?"#34d399":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(s?"✓ Suction-Cup Grouting ROV Dispatched (0 Dewatering Days)":"✕ Unrepaired Pit Risks Slab Uplift Failure at 42 m/s Flood!",l+30,306),e.fillStyle=s?"#34d399":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(s?`✓ Saves ${n.dewateringDaysSaved} Cofferdam Drain Days · +$${(n.annualHydroStationSavingsUsd/1e6).toFixed(2)}M/yr Hydro ROI`:"✕ Draining Stilling Basin Costs $4.5M & Wastes 28 Peak Hydro Days",l+2,376)}f();
