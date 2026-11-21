import"./modulepreload-polyfill-B5Qt9EMX.js";const u={"haul-road-berm-rut-audit":{id:"haul-road-berm-rut-audit",titleZh:"400吨矿卡临崖运输坡道挡墙（59/80R63 巨胎直径 4.02m · MSHA 挡墙要求 ≥2.01m · 雨后缺口自愈）",titleEn:"400t Haul-Road Safety Berm & Rut Audit (4.02m Tire Diameter · MSHA Berm ≥2.01m · Auto-Grader Dispatch)",haulTruckFleet:"36× Cat 797F / Komatsu 980E (400-Ton Payload · 59/80R63 Tires)",tireOuterDiameterM:4.02,mshaRequiredBermHeightM:2.01,naiveDetectedBermMinM:1.42,remediatedBermHeightM:2.24,benchSlopeCreepMmPerHr:1.2,oversizeBoulderThresholdMm:1200,naiveFalseDustBrakingEventsPerDay:28,ahsFleetAvailabilityGainPct:14.2,annualMineSiteSavingsUsd:785e4},"bench-slope-gbinsar-creep":{id:"bench-slope-gbinsar-creep",titleZh:"深凹露天矿 65° 台阶高边坡蠕变预警（GB-InSAR ±0.2mm/h 相位干涉 + 3DGS 楔形体滑坡封道联动）",titleEn:"65° Highwall Bench Slope Creep Early Warning (GB-InSAR ±0.2mm/h Phase + 3DGS Wedge Reroute)",haulTruckFleet:"28× Autonomous 360-Ton Electric-Drive Haul Trucks",tireOuterDiameterM:3.84,mshaRequiredBermHeightM:1.92,naiveDetectedBermMinM:1.55,remediatedBermHeightM:2.15,benchSlopeCreepMmPerHr:6.8,oversizeBoulderThresholdMm:1200,naiveFalseDustBrakingEventsPerDay:22,ahsFleetAvailabilityGainPct:15.6,annualMineSiteSavingsUsd:942e4},"muckpile-boulder-crusher-gate":{id:"muckpile-boulder-crusher-gate",titleZh:"爆破矿堆 Kuz-Ram 块度筛分与 >1,200mm 超限孤石拦截（电铲装车前 3DGS 分割防旋回破碎机卡斗）",titleEn:"Post-Blast Muckpile Kuz-Ram Fragmentation & >1,200mm Oversize Boulder Crusher Gate",haulTruckFleet:"P&H 4100XPC Rope Shovel + 24× Autonomous Haul Trucks",tireOuterDiameterM:4.02,mshaRequiredBermHeightM:2.01,naiveDetectedBermMinM:1.48,remediatedBermHeightM:2.18,benchSlopeCreepMmPerHr:1.8,oversizeBoulderThresholdMm:1200,naiveFalseDustBrakingEventsPerDay:31,ahsFleetAvailabilityGainPct:13.8,annualMineSiteSavingsUsd:694e4}};function g(i,t){const e=u[i],r=t==="ahs-crowdsourced-lidar-gbinsar-3dgs",m=r?e.remediatedBermHeightM:e.naiveDetectedBermMinM,n=r?0:e.naiveFalseDustBrakingEventsPerDay,s=r?.2:45,d=m>=e.mshaRequiredBermHeightM;return{scenario:e,mode:t,effectiveBermHeightM:m,effectiveFalseBrakingEventsPerDay:n,effectiveSlopeCreepPrecisionMm:s,mshaBermCompliancePass:d,zeroCrusherJamPass:r,verdictBadge:r?`MSHA BERM & GB-INSAR LOCKED (Berm ${m.toFixed(2)}m ≥ ${e.mshaRequiredBermHeightM.toFixed(2)}m · ±0.2mm/h Slope · 0 Dust Stops)`:`BERM BREACH & DUST AEB STALLS (Berm ${e.naiveDetectedBermMinM.toFixed(2)}m < ${e.mshaRequiredBermHeightM.toFixed(2)}m · ${e.naiveFalseDustBrakingEventsPerDay} False Stops/d)`}}const v=document.querySelector("#app");let p="haul-road-berm-rut-audit",h="ahs-crowdsourced-lidar-gbinsar-3dgs";function S(){const i=g(p,h),t=i.scenario,e=h==="ahs-crowdsourced-lidar-gbinsar-3dgs";v.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 384 · 173rd Curated Workbench · Domain 4 (Autonomous Open-Pit Mining Haul-Road Berm, GB-InSAR Slope & Boulder 3DGS Studio)</span>
        <h1>露天矿无人驾驶矿卡 (AHS) 边坡雷达干涉、爆破块度与 MSHA 挡墙 LiDAR+3DGS 工作台</h1>
        <p class="wb-subtitle">融合 400吨无人矿卡车载双 LiDAR + 77GHz 毫米波穿尘众包 3DGS（消除每日 28 次矿尘伪影误刹停）、GB-InSAR 地基干涉雷达 ±0.2mm/h 边坡滑坡预警、MSHA 安全挡墙（≥2.01m 半轮高）自动派平地机修补与 >1,200mm 超限孤石拦截，单矿年化增效 +$7.85M。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${i.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Mining Scenario and Pipeline Controls">
      <div class="control-group">
        <span class="control-label">1. 选择露天矿无人运输与采剥工况 (Open-Pit AHS Operational Scenario):</span>
        <div class="btn-row">
          ${Object.keys(u).map(r=>`
            <button type="button" class="scenario-btn ${p===r?"active":""}" data-scenario="${r}">
              ${u[r].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换矿山空间数字孪生管线 (Mine Spatial Digital Twin Pipeline):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="daily-drone-sfm-dust-floaters">
            ❌ 传统基线：日间单次无人机 SfM (24h 盲窗 + 矿尘伪影触发 AEB 误刹停 + 漏检挡墙坍塌)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="ahs-crowdsourced-lidar-gbinsar-3dgs">
            ✅ 推荐架构：矿卡众包穿尘 LiDAR/毫米波 + GB-InSAR ±0.2mm/h 边坡相干 + MSHA 挡墙自愈 3DGS
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Autonomous Mining Spatial KPIs">
      <div class="kpi-card">
        <span class="kpi-title">临崖安全挡墙实测最小高度 (MSHA Safety Berm)</span>
        <strong class="kpi-value ${i.mshaBermCompliancePass?"good":"bad"}" id="kpi-berm">${i.effectiveBermHeightM.toFixed(2)} m</strong>
        <span class="kpi-sub">MSHA 红线 ≥ ${t.mshaRequiredBermHeightM.toFixed(2)} m (0.5×${t.tireOuterDiameterM.toFixed(2)}m 巨胎外径)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">台阶边坡蠕变监测分辨率 (Slope Creep Precision)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-creep">±${i.effectiveSlopeCreepPrecisionMm.toFixed(1)} mm/h</strong>
        <span class="kpi-sub">当前边坡蠕变速率 ${t.benchSlopeCreepMmPerHr.toFixed(1)} mm/h · GB-InSAR 实时相干</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">矿尘伪影误刹停与破碎机卡斗 (Dust Stops & Jams)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-stops">${i.effectiveFalseBrakingEventsPerDay} 次/日 · ${e?"0 卡斗":"频发卡斗"}</strong>
        <span class="kpi-sub">77GHz 雷达穿尘剔除 Floaters + &gt;${t.oversizeBoulderThresholdMm}mm 孤石拦截</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">AHS 有效运力提升与年化净省 (Mine Annual ROI)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+${e?t.ahsFleetAvailabilityGainPct.toFixed(1):"0.0"}% · +$${(t.annualMineSiteSavingsUsd/1e6).toFixed(2)}M</strong>
        <span class="kpi-sub">${t.haulTruckFleet.split(" (")[0]}</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>露天矿台阶边坡 GB-InSAR 相位热力 + 400吨矿卡 MSHA 挡墙 (≥2.01m) + 爆破块度 3DGS 画布</h2>
          <span class="tag">${t.haulTruckFleet}</span>
        </div>
        <canvas id="mine-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>矿山边坡、挡墙与破碎机块度审计明细 (MSHA & Geotechnical Audit)</h2>
        <ul class="audit-list">
          <li><span>主力无人驾驶矿卡编队:</span> <strong>${t.haulTruckFleet}</strong></li>
          <li><span>59/80R63 巨胎直径与挡墙要求:</span> <strong>胎径 ${t.tireOuterDiameterM.toFixed(2)} m → MSHA 挡墙 ≥ ${t.mshaRequiredBermHeightM.toFixed(2)} m</strong></li>
          <li><span>坡道临崖挡墙状态:</span> <strong>${e?`${t.remediatedBermHeightM.toFixed(2)} m (自动派无人平地机修补闭环)`:`${t.naiveDetectedBermMinM.toFixed(2)} m (雨水冲刷缺口未检出!)`}</strong></li>
          <li><span>高边坡蠕变干涉雷达精度:</span> <strong>${e?"±0.2 mm/h (GB-InSAR 映射至 3DGS)":"±45.0 mm (单次无人机 SfM 盲窗)"}</strong></li>
          <li><span>扬尘尾气 3DGS 伪影误刹停:</span> <strong>${t.naiveFalseDustBrakingEventsPerDay} 次/日 → ${i.effectiveFalseBrakingEventsPerDay} 次/日</strong></li>
          <li><span>爆破孤石 (&gt;${t.oversizeBoulderThresholdMm}mm) 预筛分:</span> <strong>${e?"100% 装车前标定碎石锤预处理":"漏检进旋回破碎机停机 6.5h"}</strong></li>
          <li><span>单座露天矿年化增产降本:</span> <strong>+$${t.annualMineSiteSavingsUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,b(),M(i)}function b(){document.querySelectorAll(".scenario-btn").forEach(i=>{i.addEventListener("click",()=>{p=i.dataset.scenario,S()})}),document.querySelectorAll(".mode-btn").forEach(i=>{i.addEventListener("click",()=>{h=i.dataset.mode,S()})})}function M(i){const t=document.querySelector("#mine-canvas");if(!t)return;const e=t.getContext("2d"),r=t.width,m=t.height,n=i.scenario,s=i.mode==="ahs-crowdsourced-lidar-gbinsar-3dgs";e.fillStyle="#070b14",e.fillRect(0,0,r,m),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. Highwall GB-InSAR Creep + 400t Haul Truck + MSHA Safety Berm (≥2.01m)",22,26),e.fillStyle="#1e293b",e.strokeStyle=n.benchSlopeCreepMmPerHr>4?"#f59e0b":"#38bdf8",e.lineWidth=3,e.beginPath(),e.moveTo(22,52),e.lineTo(106,52),e.lineTo(164,286),e.lineTo(392,286),e.lineTo(420,356),e.lineTo(22,356),e.closePath(),e.fill(),e.stroke();const d=e.createRadialGradient(132,168,6,132,168,52);n.benchSlopeCreepMmPerHr>4?(d.addColorStop(0,"rgba(245, 158, 11, 0.85)"),d.addColorStop(1,"rgba(245, 158, 11, 0.0)")):(d.addColorStop(0,"rgba(16, 185, 129, 0.65)"),d.addColorStop(1,"rgba(16, 185, 129, 0.0)")),e.fillStyle=d,e.beginPath(),e.arc(132,168,52,0,Math.PI*2),e.fill(),e.fillStyle="#f8fafc",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText(`GB-InSAR: ${n.benchSlopeCreepMmPerHr.toFixed(1)}mm/h`,36,166);const c=216,o=286;e.fillStyle="#0f172a",e.strokeStyle="#38bdf8",e.lineWidth=3,e.beginPath(),e.arc(c+24,o-28,28,0,Math.PI*2),e.fill(),e.stroke(),e.beginPath(),e.arc(c+96,o-28,28,0,Math.PI*2),e.fill(),e.stroke(),e.fillStyle="rgba(245, 158, 11, 0.32)",e.strokeStyle="#f59e0b",e.lineWidth=2.2,e.beginPath(),e.roundRect(c+4,o-94,114,42,6),e.fill(),e.stroke(),e.fillStyle="#fef08a",e.font="bold 10.5px Inter, system-ui, sans-serif",e.fillText("Cat 797F (400t AHS)",c+10,o-68);const f=s?34:18;e.fillStyle=s?"rgba(16, 185, 129, 0.38)":"rgba(239, 68, 68, 0.42)",e.strokeStyle=s?"#10b981":"#ef4444",e.lineWidth=2.5,e.beginPath(),e.moveTo(342,o),e.lineTo(366,o-f),e.lineTo(392,o),e.closePath(),e.fill(),e.stroke(),e.strokeStyle="rgba(52, 211, 153, 0.75)",e.setLineDash([5,4]),e.lineWidth=1.5,e.beginPath(),e.moveTo(c+24,o-28),e.lineTo(404,o-28),e.stroke(),e.setLineDash([]),e.fillStyle=s?"#34d399":"#f87171",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(s?`✓ Berm ${i.effectiveBermHeightM.toFixed(2)}m ≥ 2.01m Axle Center · 0 Dust False Stops`:`✕ Berm Eroded to ${n.naiveDetectedBermMinM.toFixed(2)}m (< 2.01m MSHA Min) + ${n.naiveFalseDustBrakingEventsPerDay} Dust Stops/d!`,22,380);const a=434;e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. Post-Blast Muckpile Kuz-Ram 3DGS & >1,200mm Crusher Gate",a,26),e.fillStyle="rgba(15, 23, 42, 0.92)",e.strokeStyle="rgba(148, 163, 184, 0.28)",e.lineWidth=1.5,e.beginPath(),e.roundRect(a,42,364,304,10),e.fill(),e.stroke(),[{x:a+65,y:120,r:16,oversize:!1},{x:a+115,y:112,r:34,oversize:!0,d:"1,480mm"},{x:a+185,y:126,r:18,oversize:!1},{x:a+252,y:116,r:38,oversize:!0,d:"1,620mm"},{x:a+318,y:128,r:15,oversize:!1},{x:a+88,y:184,r:20,oversize:!1},{x:a+162,y:188,r:22,oversize:!1},{x:a+228,y:186,r:19,oversize:!1},{x:a+296,y:184,r:21,oversize:!1}].forEach(l=>{e.fillStyle=l.oversize?s?"rgba(168, 85, 247, 0.36)":"rgba(239, 68, 68, 0.42)":"rgba(56, 189, 248, 0.22)",e.strokeStyle=l.oversize?s?"#a855f7":"#ef4444":"#38bdf8",e.lineWidth=l.oversize?2.4:1.4,e.beginPath(),e.arc(l.x,l.y,l.r,0,Math.PI*2),e.fill(),e.stroke(),l.oversize&&(e.fillStyle="#f8fafc",e.font="bold 10.5px Inter, system-ui, sans-serif",e.fillText(l.d,l.x-22,l.y+4))}),e.fillStyle="#162033",e.beginPath(),e.roundRect(a+18,228,328,102,8),e.fill(),e.fillStyle="#e2e8f0",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText("Kuz-Ram Fragmentation Telemetry (P80 = 410 mm)",a+30,252),e.fillStyle="#94a3b8",e.font="11.5px Inter, system-ui, sans-serif",e.fillText("• Oversize Boulders (>1,200mm): 2 tagged in Shovel Face",a+30,278),e.fillStyle=s?"#34d399":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(s?"✓ Dispatched Hydraulic Rockbreaker before Shovel Load (0 Jams)":"✕ Unfiltered Boulders Loaded → 6.5h Primary Gyratory Crusher Jam!",a+30,306),e.fillStyle=s?"#34d399":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(s?`✓ +${n.ahsFleetAvailabilityGainPct.toFixed(1)}% AHS Fleet Availability · Saves +$${(n.annualMineSiteSavingsUsd/1e6).toFixed(2)}M/yr`:"✕ Dust Floaters & Unchecked Berm Erosion Risk Catastrophic Rollover",a+2,380)}S();
