import"./modulepreload-polyfill-B5Qt9EMX.js";const m={"a350-dual-aerobridge-night-rain":{id:"a350-dual-aerobridge-night-rain",titleZh:"A350-1000 暴雨夜航双廊桥自动靠接（L1/L2 碳纤维舱门 ±3.5mm 配准 · 48秒靠桥 · 起落架沉降随动）",titleEn:"A350-1000 Night-Rain Dual Aerobridge Auto-Docking (L1/L2 Door ±3.5mm Lock · 48s Dock · Strut Auto-Level)",aircraftType:"Airbus A350-1000 (Code E/F · 64.75m Wingspan · Carbon-CFRP Fuselage)",wingspanMeters:64.75,icaoRequiredWingtipClearanceM:7.5,actualWingtipClearanceM:8.15,naiveDoorDockingErrorMm:64,lidarDoorDockingErrorMm:3.5,naiveDockingTimeSec:185,autoDockingTimeSec:48,turnaroundMinutesSaved:6.4,annualTerminalAogSavingsUsd:96e5},"b777-wingtip-mars-stand-clearance":{id:"b777-wingtip-mars-stand-clearance",titleZh:"B777-300ER 组合机位 (MARS) 翼尖净空监护（64.80m 翼展 · ICAO Annex 14 7.5m 红线 · 邻机牵引防刮碰）",titleEn:"B777-300ER MARS Stand Wingtip Clearance Guard (64.80m Wingspan · ICAO 7.5m Envelope · Pushback Tug Lock)",aircraftType:"Boeing 777-300ER (64.80m Wingspan · GE90-115B 3.25m Nacelle)",wingspanMeters:64.8,icaoRequiredWingtipClearanceM:7.5,actualWingtipClearanceM:7.82,naiveDoorDockingErrorMm:58,lidarDoorDockingErrorMm:3.8,naiveDockingTimeSec:172,autoDockingTimeSec:45,turnaroundMinutesSaved:5.8,annualTerminalAogSavingsUsd:89e5},"b787-catering-nacelle-gse-shield":{id:"b787-catering-nacelle-gse-shield",titleZh:"B787-9 高位航食车与行李车 12车并发防撞围栏（发动机短舱 1.5m / 机身 300mm 液压自动急停联锁）",titleEn:"B787-9 High-Loader Catering & 12-GSE Nacelle/Fuselage Shield (300mm Auto-Brake Interlock · 0 Ramp Rash)",aircraftType:"Boeing 787-9 Dreamliner (60.12m Wingspan · GEnx Composite Nacelle)",wingspanMeters:60.12,icaoRequiredWingtipClearanceM:7.5,actualWingtipClearanceM:8.4,naiveDoorDockingErrorMm:52,lidarDoorDockingErrorMm:3.2,naiveDockingTimeSec:160,autoDockingTimeSec:42,turnaroundMinutesSaved:7.2,annualTerminalAogSavingsUsd:104e5}};function v(i,a){const e=m[i],o=a==="lidar-3dgs-icao-bvh-auto-dock",l=o?e.lidarDoorDockingErrorMm:e.naiveDoorDockingErrorMm,r=o?e.autoDockingTimeSec:e.naiveDockingTimeSec;return{scenario:e,mode:a,effectiveDoorErrorMm:l,effectiveDockingTimeSec:r,effectiveWingtipErrorM:o?.008:1.45,zeroCompositeSkinStrikePass:o&&l<=10,icaoClearancePass:o&&e.actualWingtipClearanceM>=e.icaoRequiredWingtipClearanceM,verdictBadge:o?`ICAO ANNEX 14 & PBB AUTO-DOCK LOCKED (±${l.toFixed(1)}mm Door · ${r}s Dock · 0 AOG)`:`COMPOSITE DOOR/NACELLE STRIKE RISK (±${e.naiveDoorDockingErrorMm.toFixed(0)}mm Rain Glare Drift · $1.2M AOG Hazard)`}}const b=document.querySelector("#app");let p="a350-dual-aerobridge-night-rain",u="lidar-3dgs-icao-bvh-auto-dock";function f(){const i=v(p,u),a=i.scenario,e=u==="lidar-3dgs-icao-bvh-auto-dock";b.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 389 · 178th Curated Workbench · Domain 4 (Airport Apron Turnaround, Aerobridge Auto-Docking & ICAO Wingtip LiDAR+3DGS Studio)</span>
        <h1>枢纽机场机坪宽体机廊桥自动靠接、ICAO 翼尖净空与 GSE 防刮碰 LiDAR+3DGS 工作台</h1>
        <p class="wb-subtitle">终结暴雨夜航机坪炫光导致 2D 摄像头深度失真（±1.45m）、人工操作双廊桥耗时 185秒且航食车/廊桥刮伤碳纤维蒙皮引发 $1.2M+ AOG 停场事故的痛点：通过三视角固态 LiDAR + 去雨雾 3DGS 实现 ±3.5mm L1/L2 舱门 48秒自动靠接与 ICAO 7.5m 翼尖/300mm 机身液压联锁，百机位航站楼年省 +$9.60M。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${i.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Airport Gate Scenario and Pipeline Controls">
      <div class="control-group">
        <span class="control-label">1. 选择宽体客机过站与机位保障工况 (Widebody Aircraft & Stand Scenario):</span>
        <div class="btn-row">
          ${Object.keys(m).map(o=>`
            <button type="button" class="scenario-btn ${p===o?"active":""}" data-scenario="${o}">
              ${m[o].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换机坪引导、廊桥靠接与防刮碰管线 (Apron VDGS & Aerobridge Mode):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="naive-2d-cctv-manual-aerobridge">
            ❌ 传统基线：2D 监控摄像头 + 人工盲操廊桥/航食车 (暴雨反光偏差 ±64mm 刮伤碳纤维舱门)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="lidar-3dgs-icao-bvh-auto-dock">
            ✅ 推荐架构：全天候 LiDAR+3DGS 舱门 6DoF 配准 (±3.5mm) + ICAO 7.5m 翼尖与 GSE 自动急停围栏
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Airport Turnaround & Safety KPIs">
      <div class="kpi-card">
        <span class="kpi-title">L1/L2 舱门廊桥靠接精度与耗时 (Aerobridge Dock)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-dock">±${i.effectiveDoorErrorMm.toFixed(1)} mm · ${i.effectiveDockingTimeSec} s</strong>
        <span class="kpi-sub">安全容差 ≤ ±15.0 mm · 对比人工靠桥 ${a.naiveDockingTimeSec} s</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">ICAO Annex 14 翼尖净空裕度 (Wingtip Clearance)</span>
        <strong class="kpi-value ${i.icaoClearancePass?"good":"bad"}" id="kpi-wingtip">${a.actualWingtipClearanceM.toFixed(2)} m (±${(i.effectiveWingtipErrorM*100).toFixed(1)}cm)</strong>
        <span class="kpi-sub">翼展 ${a.wingspanMeters.toFixed(2)}m · ICAO Code E/F 红线 ≥ ${a.icaoRequiredWingtipClearanceM.toFixed(1)} m</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">单航班过站时间压缩 (Turnaround Saved)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-turnaround">${e?`-${a.turnaroundMinutesSaved.toFixed(1)} min`:"+0.0 min"}</strong>
        <span class="kpi-sub">${e?"12辆 GSE 300mm 液压防撞联锁 · 0 次 AOG 刮碰":"频发航食车/行李车刮伤蒙皮停场检修"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">百机位航站楼年化止损增效 (Terminal ROI)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${(a.annualTerminalAogSavingsUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">${a.aircraftType.split(" (")[0]}</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>宽体机机坪俯视 3DGS + L1/L2 双廊桥 6DoF 自动靠接 + ICAO 7.5m 翼尖与 GSE 防撞围栏画布</h2>
          <span class="tag">${a.aircraftType}</span>
        </div>
        <canvas id="apron-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>ICAO Annex 14 与 A-SMGCS 机坪安全审计明细 (Apron & PBB Audit)</h2>
        <ul class="audit-list">
          <li><span>执飞宽体客机与翼展:</span> <strong>${a.aircraftType}</strong></li>
          <li><span>L1/L2 登机桥 6DoF 靠接误差:</span> <strong>±${a.naiveDoorDockingErrorMm.toFixed(0)} mm → ±${i.effectiveDoorErrorMm.toFixed(1)} mm</strong></li>
          <li><span>双廊桥靠接完成时间:</span> <strong>${a.naiveDockingTimeSec} 秒 → ${i.effectiveDockingTimeSec} 秒 (-74.1%)</strong></li>
          <li><span>起落架上下客沉降自动调平:</span> <strong>${e?"±180 mm 实时随动防压坏碳纤维舱门":"无三维高度随动 (易挂裂打开的舱门)"}</strong></li>
          <li><span>ICAO 翼尖净空监测精度:</span> <strong>${a.actualWingtipClearanceM.toFixed(2)} m 净空 (误差 ±${(i.effectiveWingtipErrorM*1e3).toFixed(0)} mm)</strong></li>
          <li><span>特种车辆 (GSE) 机身防撞围栏:</span> <strong>${e?"800mm 自动降速 / 300mm 液压急停锁死":"仅靠引导员手势 (夜间暴雨视线盲区)"}</strong></li>
          <li><span>百机位枢纽年省 AOG 与延误赔付:</span> <strong>+$${a.annualTerminalAogSavingsUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,D(),A(i)}function D(){document.querySelectorAll(".scenario-btn").forEach(i=>{i.addEventListener("click",()=>{p=i.dataset.scenario,f()})}),document.querySelectorAll(".mode-btn").forEach(i=>{i.addEventListener("click",()=>{u=i.dataset.mode,f()})})}function A(i){const a=document.querySelector("#apron-canvas");if(!a)return;const e=a.getContext("2d"),o=a.width,l=a.height,r=i.scenario,n=i.mode==="lidar-3dgs-icao-bvh-auto-dock";e.fillStyle="#070b14",e.fillRect(0,0,o,l),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. Top-Down Gate 3DGS: ICAO 7.5m Wingtip Envelope & Dual PBB Docking",22,26);const t=225;e.strokeStyle="#eab308",e.setLineDash([8,6]),e.lineWidth=2.5,e.beginPath(),e.moveTo(t,48),e.lineTo(t,354),e.stroke(),e.setLineDash([]),e.strokeStyle=n?"rgba(16, 185, 129, 0.7)":"rgba(239, 68, 68, 0.75)",e.fillStyle=n?"rgba(16, 185, 129, 0.08)":"rgba(239, 68, 68, 0.1)",e.lineWidth=2,e.beginPath(),e.roundRect(t-178,68,356,258,22),e.fill(),e.stroke(),e.fillStyle="#1e293b",e.strokeStyle="#38bdf8",e.lineWidth=2.2,e.beginPath(),e.moveTo(t,122),e.lineTo(t-154,212),e.lineTo(t-154,228),e.lineTo(t,178),e.lineTo(t+154,228),e.lineTo(t+154,212),e.closePath(),e.fill(),e.stroke(),e.fillStyle="#0f172a",e.beginPath(),e.roundRect(t-18,78,36,226,18),e.fill(),e.stroke(),[-64,64].forEach(c=>{e.strokeStyle=n?"#10b981":"#ef4444",e.lineWidth=1.8,e.beginPath(),e.arc(t+c,166,20,0,Math.PI*2),e.stroke()}),[108,142].forEach((c,S)=>{e.fillStyle=n?"rgba(16, 185, 129, 0.45)":"rgba(239, 68, 68, 0.45)",e.strokeStyle=n?"#34d399":"#f87171",e.lineWidth=2.2,e.beginPath(),e.roundRect(38,c,t-56,16,4),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 10px Inter, system-ui, sans-serif",e.fillText(`PBB L${S+1}`,46,c+12)}),e.fillStyle=n?"rgba(56, 189, 248, 0.35)":"rgba(239, 68, 68, 0.45)",e.strokeStyle=n?"#38bdf8":"#ef4444",e.beginPath(),e.roundRect(t+22,112,48,22,4),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.fillText("GSE Cat",t+26,127),e.fillStyle=n?"#34d399":"#f87171",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(n?`✓ Wingtip Margin ${r.actualWingtipClearanceM.toFixed(2)}m ≥ 7.50m ICAO · 300mm GSE Auto-Brake Active`:"✕ Night Rain Glare Blinds 2D CCTV (±1.45m Error) → Catering Truck Nacelle Strike!",22,376);const s=434;e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. L1/L2 Cabin Door 6DoF CAD Lock (±3.5mm) & Strut Auto-Leveling",s,26),e.fillStyle="rgba(15, 23, 42, 0.92)",e.strokeStyle="rgba(148, 163, 184, 0.28)",e.lineWidth=1.5,e.beginPath(),e.roundRect(s,42,364,304,10),e.fill(),e.stroke();const d=s+126,g=78;e.strokeStyle="#38bdf8",e.lineWidth=2.5,e.beginPath(),e.roundRect(d,g,112,186,18),e.stroke(),e.fillStyle="rgba(56, 189, 248, 0.22)",e.beginPath(),e.roundRect(d+36,g+32,40,52,12),e.fill(),e.stroke();const k=n?2:24;e.strokeStyle=n?"#10b981":"#ef4444",e.setLineDash([6,4]),e.lineWidth=2.5,e.beginPath(),e.roundRect(d-10+k,g-8+k*.6,132,202,20),e.stroke(),e.setLineDash([]),e.fillStyle=n?"#34d399":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(n?`✓ 6DoF Door Seam ICP Lock: ±${i.effectiveDoorErrorMm.toFixed(1)}mm (${r.autoDockingTimeSec}s Auto-Dock)`:`✕ ±${r.naiveDoorDockingErrorMm.toFixed(0)}mm Misalignment fouls open CFRP Door ($620k AOG)!`,s+18,298),e.fillStyle="#94a3b8",e.font="11px Inter, system-ui, sans-serif",e.fillText("• Oleo-Strut Fuel/Passenger Settlement (±180mm): Continuous 50Hz Auto-Level",s+18,324),e.fillStyle=n?"#34d399":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(n?`✓ Saves -${r.turnaroundMinutesSaved.toFixed(1)} min Turnaround/Flight · +$${(r.annualTerminalAogSavingsUsd/1e6).toFixed(2)}M/yr Terminal ROI`:`✕ Manual Joystick Docking Takes ${r.naiveDockingTimeSec}s & Causes 27k Global Ramp Strikes/yr`,s+2,376)}f();
