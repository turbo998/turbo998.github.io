import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"red-sea-cape-good-hope-sea-air":{id:"red-sea-cape-good-hope-sea-air",titleZh:"红海/苏伊士停航绕行好望角（+14天延误 · 迪拜杰贝阿里海空联运 Sea-Air 抢救断料产线 · 4.5万货主）",titleEn:"Red Sea / Suez Reroute via Cape of Good Hope (+14d Delay · Dubai Jebel Ali Sea-Air Expedite · 45k Shippers)",affectedShippersCount:45e3,delayedDelayDays:14,factoryLineStopLossPerHrUsd:125e3,closedGopReusePct:93.8,unitVideoCostUsd:.0026,naiveTriageLatencyHours:6.4,hybridAlertToApprovalMin:2.2,naiveApprovalRatePct:14.6,hybridApprovalRatePct:68.4,annualAvoidedDowntimeDemurrageUsd:84e5},"panama-drought-uswc-rail-landbridge":{id:"panama-drought-uswc-rail-landbridge",titleZh:"巴拿马运河枯水限航（美东航线 +11天 · 洛杉矶/长滩港快船 + BNSF 内陆铁海联运分流）",titleEn:"Panama Canal Draft Restriction (+11d USEC Delay · LA/LB Express Vessel + BNSF Rail Landbridge)",affectedShippersCount:32e3,delayedDelayDays:11,factoryLineStopLossPerHrUsd:98e3,closedGopReusePct:94.2,unitVideoCostUsd:.0024,naiveTriageLatencyHours:5.8,hybridAlertToApprovalMin:1.9,naiveApprovalRatePct:16.2,hybridApprovalRatePct:71.2,annualAvoidedDowntimeDemurrageUsd:715e4},"section-301-tariff-ftz-bonded-split":{id:"section-301-tariff-ftz-bonded-split",titleZh:"突发 HS 编码关税上调与罢工拥堵（对外贸易区 FTZ 保税拆柜缓税 + 墨西哥近岸安全库存调拨）",titleEn:"Sudden HS-Code Tariff Spike & Port Strike (FTZ Bonded Deconsolidation + Nearshore Safety-Stock Swap)",affectedShippersCount:28e3,delayedDelayDays:9,factoryLineStopLossPerHrUsd:11e4,closedGopReusePct:93.4,unitVideoCostUsd:.0028,naiveTriageLatencyHours:7.2,hybridAlertToApprovalMin:2.4,naiveApprovalRatePct:12.8,hybridApprovalRatePct:66.8,annualAvoidedDowntimeDemurrageUsd:924e4}};function S(t,i){const e=c[t],o=i==="ais-bom-runout-ast-93pct-closed-gop-mux",r=o?e.unitVideoCostUsd:1.65,a=o?e.hybridApprovalRatePct:e.naiveApprovalRatePct,s=o?e.hybridAlertToApprovalMin:e.naiveTriageLatencyHours*60,l=o?100:40.8;return{preset:e,arch:i,effectiveUnitCostUsd:r,effectiveApprovalRatePct:a,effectiveTriageMinutes:s,bolHsCodeAccuracyPct:l,subFiveMinSlaPass:s<=5,zeroHallucinationPass:l===100,verdictBadge:o?`AIS + BOM RUN-OUT VIDEO LOCKED ($${r.toFixed(4)}/Shipper · ${s.toFixed(1)}m Triage · ${a.toFixed(1)}% 1-Tap Approve)`:"6.4H CSV TRIAGE DELAY & 59.2% T2V HALLUCINATION ($1.65/Clip · Missed Air-Charter Slot!)"}}const v=document.querySelector("#app");let p="red-sea-cape-good-hope-sea-air",u="ais-bom-runout-ast-93pct-closed-gop-mux";function f(){const t=S(p,u),i=t.preset,e=u==="ais-bom-runout-ast-93pct-closed-gop-mux";v.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 398 · 187th Interactive Workbench · Domain 3 (Maersk / Flexport / Project44 / SAP IBP Executive Rerouting Video Studio)</span>
        <h1>全球供应链海事中断与关税重路由：4.5万货主 AIS 断料日推演与 93.8% Closed-GOP 保供决策视频工作台</h1>
        <p class="wb-subtitle">解决红海停航、巴拿马运河限航与突发关税调整时，传统控制塔推送数千行提单 CSV/PDF 导致采购 VP 耗费 6.4 小时人工对齐 ERP 安全库存（错失包机/快船舱位，产线停工损失 $125k/hr）、而纯文生视频将集装箱号与 HS 税率画成 59.2% 幻觉乱码的痛点：通过 AIS 卫星船位 × ERP BOM 断料日（Run-Out Date）确定性推演 + 93.8% 航线走廊 Closed-GOP 复用 + 一键锁舱视频（$${t.effectiveUnitCostUsd.toFixed(4)}/支），2.2 分钟完成高管批复（年省 +$${(i.annualAvoidedDowntimeDemurrageUsd/1e6).toFixed(2)}M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${t.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Supply Chain Disruption Preset and Video Synthesis Controls">
      <div class="control-group">
        <span class="control-label">1. 选择全球海事中断与关税危机场景 (Global Maritime & Tariff Disruption Scenario):</span>
        <div class="btn-row">
          ${Object.keys(c).map(o=>`
            <button type="button" class="scenario-btn ${p===o?"active":""}" data-scenario="${o}">
              ${c[o].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换千万级供应链预警与高管改道视频合成架构 (Executive Rerouting Video Architecture):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="naive-static-csv-or-unconstrained-t2v">
            ❌ 传统基线：千行 CSV 表格邮件 (6.4h 人工排障) 或纯像素 T2V 视频 ($1.65/支 · 提单号/关税 59.2% 幻觉)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="ais-bom-runout-ast-93pct-closed-gop-mux">
            ✅ 推荐架构：AIS×BOM 断料日矢量沙盘 + ${i.closedGopReusePct}% 航线 Closed-GOP 拼接 ($${i.unitVideoCostUsd}/支 · 2.2m 一键锁舱)
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Supply Chain Video KPIs">
      <div class="kpi-card">
        <span class="kpi-title">单货主个性化保供视频成本 (Unit Video Cost)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-cost">$${t.effectiveUnitCostUsd.toFixed(4)} / shipper</strong>
        <span class="kpi-sub">${i.affectedShippersCount.toLocaleString("en-US")} 家受影响货主 · ${i.closedGopReusePct}% Closed-GOP 字节流复用</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">预警至高管锁舱决策耗时 (Alert-to-Approval Latency)</span>
        <strong class="kpi-value ${t.subFiveMinSlaPass?"good":"bad"}" id="kpi-triage">${t.effectiveTriageMinutes.toFixed(1)} min</strong>
        <span class="kpi-sub">对比传统 CSV 跨部门对表 ${(i.naiveTriageLatencyHours*60).toFixed(0)} 分钟 (6.4 小时)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">紧急改道方案一键批复率 (1-Tap Reroute Approval)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-approval">${t.effectiveApprovalRatePct.toFixed(1)}%</strong>
        <span class="kpi-sub">直观对比绕行停线损失 ($${(i.factoryLineStopLossPerHrUsd/1e3).toFixed(0)}k/hr) vs 海空联运加急费</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">提单/HS关税零幻觉与年化止损 (Fidelity & Avoided Loss)</span>
        <strong class="kpi-value ${t.zeroHallucinationPass?"good":"bad"}" id="kpi-roi">${t.bolHsCodeAccuracyPct.toFixed(1)}% · +$${(i.annualAvoidedDowntimeDemurrageUsd/1e6).toFixed(2)}M/yr</strong>
        <span class="kpi-sub">规避产线断料停工、滞箱滞港费与高额紧急空运溢价</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>AIS 航线重路由大圆轨迹、ERP 安全库存断料倒计时 (Run-Out Cliff) 与 93.8% Closed-GOP 视频合成画布</h2>
          <span class="tag">${i.affectedShippersCount.toLocaleString("en-US")} Shippers · +${i.delayedDelayDays}d Delay</span>
        </div>
        <canvas id="supply-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>AIS 船位、BOM 断料倒计时与保供视频审计明细 (Supply-Chain Video Audit)</h2>
        <ul class="audit-list">
          <li><span>突发海事中断与船期延误:</span> <strong>+${i.delayedDelayDays} 天延误 · 波及 ${i.affectedShippersCount.toLocaleString("en-US")} 家企业货主</strong></li>
          <li><span>产线断料停工小时损失敞口:</span> <strong>$${i.factoryLineStopLossPerHrUsd.toLocaleString("en-US")} / 小时 (Safety Stock 耗尽红线)</strong></li>
          <li><span>海运走廊预烘焙 Closed-GOP 复用率:</span> <strong>${i.closedGopReusePct.toFixed(1)}% 共享航线底片 + ${(100-i.closedGopReusePct).toFixed(1)}% 动态 BOM 槽位</strong></li>
          <li><span>单支高管决策视频合成成本:</span> <strong>$${t.effectiveUnitCostUsd.toFixed(4)} / 支 (0.18s NVENC 极速拼接)</strong></li>
          <li><span>提单号 (B/L)、箱号与 HS 税率准确率:</span> <strong>${t.bolHsCodeAccuracyPct.toFixed(1)}% (ERP/AIS 强类型矢量绑定)</strong></li>
          <li><span>高管预警响应与一键锁舱率:</span> <strong>${t.effectiveTriageMinutes.toFixed(1)} 分钟响应 · ${t.effectiveApprovalRatePct.toFixed(1)}% 锁舱批复</strong></li>
          <li><span>年化规避停产与滞港费净收益:</span> <strong>+$${i.annualAvoidedDowntimeDemurrageUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,y(),b(t)}function y(){document.querySelectorAll(".scenario-btn").forEach(t=>{t.addEventListener("click",()=>{p=t.dataset.scenario,f()})}),document.querySelectorAll(".mode-btn").forEach(t=>{t.addEventListener("click",()=>{u=t.dataset.mode,f()})})}function b(t){const i=document.querySelector("#supply-canvas");if(!i)return;const e=i.getContext("2d"),o=i.width,r=i.height,a=t.preset,s=t.arch==="ais-bom-runout-ast-93pct-closed-gop-mux";e.fillStyle="#070b14",e.fillRect(0,0,o,r),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText(`1. AIS Maritime Rerouting & Factory BOM Inventory Run-Out Cliff (+${a.delayedDelayDays}d Delay Impact)`,22,26),e.fillStyle="#0f172a",e.strokeStyle="rgba(56, 189, 248, 0.35)",e.lineWidth=1.5,e.beginPath(),e.roundRect(22,38,380,156,10),e.fill(),e.stroke(),e.strokeStyle="#ef4444",e.setLineDash([5,4]),e.lineWidth=2.2,e.beginPath(),e.moveTo(46,92),e.quadraticCurveTo(190,62,376,86),e.stroke(),e.setLineDash([]),e.fillStyle="#f87171",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText("✕ Blocked Canal / Strike (+14d Queue) · 4.2d Factory Blackout",54,72),e.strokeStyle="#f59e0b",e.lineWidth=2,e.beginPath(),e.moveTo(46,92),e.quadraticCurveTo(195,178,376,86),e.stroke(),e.strokeStyle="#10b981",e.lineWidth=2.8,e.beginPath(),e.moveTo(46,92),e.quadraticCurveTo(188,122,376,86),e.stroke(),e.fillStyle="#34d399",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(s?"✓ Recommended: Sea-Air / Express Split (0h Line Stop · Net Save $1.12M)":"✕ Unconstrained T2V Garbles B/L #MAEU948210 & HS Tariff Codes!",42,176),e.fillStyle="#0f172a",e.strokeStyle="rgba(148, 163, 184, 0.25)",e.beginPath(),e.roundRect(418,38,380,156,10),e.fill(),e.stroke(),e.fillStyle="#e2e8f0",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText("ERP Safety-Stock Depletion vs Vessel ETA (Day 0 → Day 24)",434,62),e.strokeStyle="rgba(239, 68, 68, 0.6)",e.beginPath(),e.moveTo(436,164),e.lineTo(780,164),e.stroke(),e.strokeStyle=s?"#10b981":"#ef4444",e.lineWidth=2.6,e.beginPath(),e.moveTo(436,84),e.lineTo(596,158),s?(e.lineTo(596,102),e.lineTo(772,138)):(e.lineTo(688,164),e.lineTo(688,108),e.lineTo(772,138)),e.stroke(),e.fillStyle=s?"#6ee7b7":"#fca5a5",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText(s?"✓ 2 Critical Containers Expedited via Sea-Air ($38k Cost Saves $1.25M Shutdown)":`✕ 100-Hour Factory Line Shutdown (-$${(a.factoryLineStopLossPerHrUsd/1e3).toFixed(0)}k/hr) While Parsing CSVs!`,434,182),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText(`2. 45,000-Shipper Personalized Video Pipeline: ${a.closedGopReusePct}% Shared Corridor Closed-GOP + ${(100-a.closedGopReusePct).toFixed(1)}% Dynamic BOM Slot`,22,224);const l=[{title:"GOP 1: Maritime Alert (38%)",sub:"Pre-Baked Corridor Satellite 3D Scene ($0.00)",w:248,color:"#38bdf8"},{title:"Dynamic Slot: Shipper BOM & Run-Out (6.2%)",sub:"Exact B/L Containers + Shutdown ROI Card (NVENC 0.18s)",w:274,color:"#f59e0b"},{title:"GOP 2: 1-Tap Booking Lock (55.8%)",sub:"Shared Carrier Allocation & Customs SOP ($0.00)",w:230,color:"#10b981"}];let d=22;l.forEach(n=>{e.fillStyle=s?"rgba(15, 23, 42, 0.92)":"rgba(239, 68, 68, 0.16)",e.strokeStyle=s?n.color:"#ef4444",e.lineWidth=2.2,e.beginPath(),e.roundRect(d,240,n.w,108,10),e.fill(),e.stroke(),e.fillStyle=s?n.color:"#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(n.title,d+14,272),e.fillStyle="#f8fafc",e.font="11px Inter, system-ui, sans-serif",e.fillText(n.sub,d+14,302),d+=n.w+12}),e.fillStyle=s?"#34d399":"#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(s?`✓ 45,000 Shipper Videos Rendered in 112 Seconds at $${a.unitVideoCostUsd}/clip (${a.hybridApprovalRatePct}% 1-Tap Reroute Approval)`:"✕ Pure Pixel Diffusion Costs $74,250 ($1.65×45k) and Hallucinates Container Numbers & Customs Duties",22,378)}f();
