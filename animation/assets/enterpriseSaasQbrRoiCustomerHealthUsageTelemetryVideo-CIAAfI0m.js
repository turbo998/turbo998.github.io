import"./modulepreload-polyfill-B5Qt9EMX.js";const p={"at-risk-underutilized":{id:"at-risk-underutilized",titleZh:"续约高危：席位激活率偏低客户（42% 席位利用率 · 距离续约 60 天 · 自动植入 3步激活处方）",titleEn:"At-Risk Renewal: Low Seat Adoption (42% Seat Utilization · 60 Days to Renewal · 3-Step Adoption Playbook)",tenantName:"Apex Global Logistics Inc. (Mid-Market Tier)",contractArrUsd:84e3,licensedSeats:250,activeSeats:105,hoursSavedQuarterly:3420,quantifiedRoiMultiple:3.8,recommendedPlaybookAction:"Enable SSO Auto-Provisioning + Slack Workflow Bot (+94 Seats in 14 Days)",closedGopReusePct:93.8,naiveCostPerVideoUsd:2.4,hybridCostPerVideoUsd:.0038,naiveNrrPct:88.4,hybridNrrPct:106.2,annualArrSavedAndExpandedUsd:146e5},"quota-burst-expansion":{id:"quota-burst-expansion",titleZh:"增购黄金期：API 与席位超额 118% 高增长客户（一键阶梯升档锁价省 22% 弹性超额费）",titleEn:"Expansion Ready: 118% Quota Burst Customer (1-Click Tier Upgrade Saves 22% Overage Fees)",tenantName:"NovaFin Payments Corp. (Growth Enterprise)",contractArrUsd:165e3,licensedSeats:400,activeSeats:472,hoursSavedQuarterly:12840,quantifiedRoiMultiple:7.4,recommendedPlaybookAction:"1-Click Commit Upgrade to Enterprise Plus (Saves $18.4k Overage + Unlocks Dedicated VPC)",closedGopReusePct:94.2,naiveCostPerVideoUsd:2.4,hybridCostPerVideoUsd:.0035,naiveNrrPct:108.5,hybridNrrPct:128.4,annualArrSavedAndExpandedUsd:192e5},"enterprise-exec-renewal":{id:"enterprise-exec-renewal",titleZh:"旗舰续约：CIO 年度价值审计简报（99.994% 实测 SLA · 41,200 小时自动化节省 · 8.6x 净 ROI）",titleEn:"Flagship CIO Executive Renewal Brief (99.994% Measured SLA · 41,200 Hours Saved · 8.6x Net ROI)",tenantName:"Meridian Healthcare Systems (Fortune 500)",contractArrUsd:64e4,licensedSeats:2e3,activeSeats:1890,hoursSavedQuarterly:41200,quantifiedRoiMultiple:8.6,recommendedPlaybookAction:"Multi-Year 36-Month ELA Lock with AI Copilot Add-On (+32% ACV Expansion)",closedGopReusePct:92.6,naiveCostPerVideoUsd:62,hybridCostPerVideoUsd:.0042,naiveNrrPct:104.2,hybridNrrPct:116.8,annualArrSavedAndExpandedUsd:146e5}};function h(a,t){const e=p[a],s=t==="gainsight-closed-gop-vector-qbr",c=Number((e.activeSeats/e.licensedSeats*100).toFixed(1));return{segment:e,mode:t,seatUtilizationPct:c,effectiveDataAccuracyPct:s?100:61.4,effectiveCostPerVideoUsd:s?e.hybridCostPerVideoUsd:e.naiveCostPerVideoUsd,effectiveAccountCoveragePct:s?100:3.2,effectiveNrrPct:s?e.hybridNrrPct:e.naiveNrrPct,zeroHallucinationAuditPass:s,verdictBadge:s?`ZERO-HALLUCINATION QBR LOCKED ($${e.hybridCostPerVideoUsd.toFixed(4)}/acct · ${e.hybridNrrPct.toFixed(1)}% NRR)`:`KPI CHART HALLUCINATION & 96.8% UNCOVERED LONG-TAIL ($${e.naiveCostPerVideoUsd.toFixed(2)}/acct)`}}const m=document.querySelector("#app");let f="at-risk-underutilized",v="gainsight-closed-gop-vector-qbr";function S(){const a=h(f,v),t=a.segment,e=v==="gainsight-closed-gop-vector-qbr";m.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 378 · 167th Curated Workbench · Domain 3 (Enterprise B2B SaaS QBR, Customer Health & NRR Expansion Video Studio)</span>
        <h1>企业 B2B SaaS 客户成功季度业务回顾 (QBR) 与续约增购 (NRR) 规模化个性化视频工作台</h1>
        <p class="wb-subtitle">直连 Snowflake / Gainsight 客户健康度与遥测数仓（零幻觉 SVG/Canvas 矢量渲染 MAU 席位激活率、自动化节省工时与净 ROI 倍数），结合 93.8% AI CSM 演播室 Closed-GOP 母版复用，以 $0.0038/企业成本实现 50万客户 100% 触达，推动 NRR 跃升至 116.8%（年增收挽损 +$14.6M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${a.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Customer Segment and Pipeline Controls">
      <div class="control-group">
        <span class="control-label">1. 选择客户健康度与生命周期分层 (Gainsight Customer Health Segment):</span>
        <div class="btn-row">
          ${Object.keys(p).map(s=>`
            <button type="button" class="scenario-btn ${f===s?"active":""}" data-scenario="${s}">
              ${p[s].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换 QBR 视频生产管线 (QBR Video Synthesis Pipeline):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="manual-csm-loom-or-ai-diffusion">
            ❌ 传统基线：手工 Loom 录屏 ($62) 或纯 AI 视频大模型 ($2.40 · KPI 数字乱码幻觉)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="gainsight-closed-gop-vector-qbr">
            ✅ 推荐架构：Snowflake 零幻觉矢量图表 + 93.8% Closed-GOP 演播室拼接 ($0.0038/客户)
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core SaaS QBR & NRR KPIs">
      <div class="kpi-card">
        <span class="kpi-title">单企业 60秒 QBR 视频成本 (Unit Cost)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-cost">$${a.effectiveCostPerVideoUsd.toFixed(4)}</strong>
        <span class="kpi-sub">${t.closedGopReusePct.toFixed(1)}% Closed-GOP 复用 · 全量覆盖 ${a.effectiveAccountCoveragePct.toFixed(1)}% 客户</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">席位激活率与量化 ROI 精度 (Data Accuracy)</span>
        <strong class="kpi-value ${a.zeroHallucinationAuditPass?"good":"bad"}" id="kpi-accuracy">${a.effectiveDataAccuracyPct.toFixed(1)}%</strong>
        <span class="kpi-sub">实测 ${t.activeSeats}/${t.licensedSeats} 席 (${a.seatUtilizationPct}%) · ${t.quantifiedRoiMultiple.toFixed(1)}x 净 ROI</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">季度自动化节省工时 (Hours Saved)</span>
        <strong class="kpi-value good" id="kpi-hours">${t.hoursSavedQuarterly.toLocaleString("en-US")} hrs</strong>
        <span class="kpi-sub">折算生产力价值 > $${Math.round(t.hoursSavedQuarterly*85/1e3)}k / 季度</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">净金额留存率与年化 ARR 增益 (NRR Impact)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-nrr">${a.effectiveNrrPct.toFixed(1)}% · +$${(t.annualArrSavedAndExpandedUsd/1e6).toFixed(2)}M</strong>
        <span class="kpi-sub">对比未触达基线 ${t.naiveNrrPct.toFixed(1)}% NRR</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>Gainsight / Snowflake 遥测驱动 QBR 矢量画布与 Closed-GOP 拼接时间轴</h2>
          <span class="tag">${t.tenantName} · ARR $${t.contractArrUsd.toLocaleString("en-US")}</span>
        </div>
        <canvas id="qbr-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>客户成功遥测与嵌入式 CTA 审计明细 (CSM Telemetry & Playbook Audit)</h2>
        <ul class="audit-list">
          <li><span>目标企业租户与 ARR:</span> <strong>${t.tenantName} ($${t.contractArrUsd.toLocaleString("en-US")})</strong></li>
          <li><span>授权席位与活跃 MAU:</span> <strong>${t.activeSeats} / ${t.licensedSeats} 席 (${a.seatUtilizationPct}% 利用率)</strong></li>
          <li><span>本季自动化节省工时:</span> <strong>${t.hoursSavedQuarterly.toLocaleString("en-US")} 小时 (${t.quantifiedRoiMultiple.toFixed(1)}x 净 ROI)</strong></li>
          <li><span>内嵌一键交互式处方 CTA:</span> <strong>${t.recommendedPlaybookAction}</strong></li>
          <li><span>Closed-GOP 免重编码比例:</span> <strong>${e?`${t.closedGopReusePct.toFixed(1)}% 复用`:"0.0% (全帧重算或人工录制)"}</strong></li>
          <li><span>50万企业客户全量制作总成本:</span> <strong>${e?`$${Math.round(5e5*t.hybridCostPerVideoUsd).toLocaleString("en-US")}`:`$${Math.round(5e5*t.naiveCostPerVideoUsd).toLocaleString("en-US")}`}</strong></li>
          <li><span>年化挽回流失与增购 ARR:</span> <strong>+$${t.annualArrSavedAndExpandedUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,P(),R(a)}function P(){document.querySelectorAll(".scenario-btn").forEach(a=>{a.addEventListener("click",()=>{f=a.dataset.scenario,S()})}),document.querySelectorAll(".mode-btn").forEach(a=>{a.addEventListener("click",()=>{v=a.dataset.mode,S()})})}function R(a){const t=document.querySelector("#qbr-canvas");if(!t)return;const e=t.getContext("2d"),s=t.width,c=t.height,o=a.segment,i=a.mode==="gainsight-closed-gop-vector-qbr";e.fillStyle="#080c16",e.fillRect(0,0,s,c),e.fillStyle="#0f172a",e.strokeStyle=i?"rgba(56, 189, 248, 0.45)":"rgba(239, 68, 68, 0.5)",e.lineWidth=2,e.beginPath(),e.roundRect(22,18,776,244,12),e.fill(),e.stroke(),e.fillStyle="#1e293b",e.strokeStyle=i?"#10b981":"#f59e0b",e.lineWidth=2,e.beginPath(),e.roundRect(38,36,210,208,10),e.fill(),e.stroke(),e.fillStyle=i?"#38bdf8":"#f87171",e.beginPath(),e.arc(143,106,30,0,Math.PI*2),e.fill(),e.beginPath(),e.roundRect(95,146,96,58,22),e.fill(),e.fillStyle="#e2e8f0",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText(i?"AI CSM Host (Closed-GOP)":"Unstable Diffusion Avatar",54,226);const r=270;e.fillStyle="#f8fafc",e.font="bold 15px Inter, system-ui, sans-serif",e.fillText(i?`Q3 Executive Value Brief · ${o.tenantName}`:`Q3 Brief · ${o.tenantName.slice(0,10)}?? [OCR GARBLED TEXT]`,r,48),[{label:"Seat Utilization",val:i?`${o.activeSeats}/${o.licensedSeats} (${a.seatUtilizationPct}%)`:"999/12%?? [Hallucinated]",color:i?"#38bdf8":"#ef4444"},{label:"Automation Hours Saved",val:i?`${o.hoursSavedQuarterly.toLocaleString("en-US")} hrs`:"4,??0 hrs [Corrupted]",color:i?"#10b981":"#ef4444"},{label:"Quantified Net ROI",val:i?`${o.quantifiedRoiMultiple.toFixed(1)}x ARR Payback`:"??.x ROI",color:i?"#a855f7":"#ef4444"}].forEach((n,d)=>{const l=r+d*172;e.fillStyle="#162033",e.strokeStyle=n.color,e.lineWidth=1.5,e.beginPath(),e.roundRect(l,64,162,64,8),e.fill(),e.stroke(),e.fillStyle="#94a3b8",e.font="11px Inter, system-ui, sans-serif",e.fillText(n.label,l+10,84),e.fillStyle="#f8fafc",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText(n.val,l+10,110)}),e.fillStyle="#162033",e.beginPath(),e.roundRect(r,140,504,104,8),e.fill(),e.fillStyle=i?"#34d399":"#f87171",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(i?`✓ Recommended 1-Click Action: ${o.recommendedPlaybookAction}`:"✕ Diffusion Video Error: Distorted KPI axes & non-clickable flat MP4 pixels",r+14,166),["Q1","Q2","Q3 (Actual)","Q4 (Projected)"].forEach((n,d)=>{const l=r+22+d*120,y=86,b=18+d*10;e.fillStyle=d===3?"#38bdf8":"#10b981",e.fillRect(l,222-b,y,b),e.fillStyle="#cbd5e1",e.font="11px Inter, system-ui, sans-serif",e.fillText(n,l+8,236)}),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. 60-Second QBR Video Closed-GOP Segment Splice Timeline ($0.0038 / Enterprise Account)",24,290);const g=[{name:"GOP 1: Personalized Logo & Greeting (Dynamic 3.1%)",w:120,dynamic:!0},{name:"GOP 2–5: Industry Executive Benchmark & Feature Highlights (93.8% Shared Closed-GOP)",w:480,dynamic:!1},{name:"GOP 6: Live Vector ROI & 1-Click CTA (3.1%)",w:176,dynamic:!0}];let u=22;g.forEach(n=>{e.fillStyle=i?n.dynamic?"rgba(56, 189, 248, 0.28)":"rgba(16, 185, 129, 0.24)":"rgba(239, 68, 68, 0.25)",e.strokeStyle=i?n.dynamic?"#38bdf8":"#10b981":"#ef4444",e.lineWidth=2,e.beginPath(),e.roundRect(u,304,n.w,56,8),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText(n.name.slice(0,Math.floor(n.w/6.5)),u+10,336),u+=n.w+8}),e.fillStyle=i?"#34d399":"#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(i?"✓ Stream-Copy 93.8% Shared Closed-GOPs + Remotion SVG Vector KPI Overlay: $0.0038/video · 100% of 500k Accounts Covered":"✕ Full-Frame Diffusion / Manual Loom: $2.40–$62.00/video · 96.8% of SMB/Mid-Market Accounts Left Uncovered",24,384)}S();
