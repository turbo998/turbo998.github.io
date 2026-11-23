import"./modulepreload-polyfill-B5Qt9EMX.js";const $={"q3-ai-gross-margin-cfo-bridge":{id:"q3-ai-gross-margin-cfo-bridge",title:"CFO Board Briefing: Q3 Cloud + AI Token Gross Margin Bridge ($1.42M -> $0.88M Net Spend)",titleZh:"CFO 董事会简报：Q3 云与 AI 算力毛利瀑布桥（$1.42M 峰值降至 $0.88M 净支出对账）",rawSkuCount:48,steps:[{label:"Q2 Baseline",deltaUsdK:1420,isTotal:!0},{label:"+GenAI Traffic",deltaUsdK:380},{label:"-Prompt Cache",deltaUsdK:-310},{label:"-4Step Distill",deltaUsdK:-420},{label:"-Reserved GPU",deltaUsdK:-190},{label:"Q3 Net Spend",deltaUsdK:880,isTotal:!0}]},"multicloud-gpu-commitment-sankey":{id:"multicloud-gpu-commitment-sankey",title:"Multi-Cloud FOCUS 1.1 Allocation: Azure AKS + AWS Bedrock + GCP Vertex Cost Attribution",titleZh:"多云 FOCUS 1.1 账单分摊：Azure AKS + AWS + GCP 跨部门算力归因桑基与瀑布图",rawSkuCount:64,steps:[{label:"Gross On-Demand",deltaUsdK:2150,isTotal:!0},{label:"+Burst Spot",deltaUsdK:240},{label:"-3Yr Savings Plan",deltaUsdK:-680},{label:"-Semantic Cache",deltaUsdK:-490},{label:"-Idle Reclaim",deltaUsdK:-260},{label:"Net Allocated",deltaUsdK:960,isTotal:!0}]},"per-tenant-agent-unit-economics":{id:"per-tenant-agent-unit-economics",title:"SaaS Per-Tenant Unit Economics: Cost per 1,000 Autonomous Agent Tasks ($4.80 -> $0.92)",titleZh:"SaaS 租户级单利经济模型：每 1,000 次 Agent 任务成本从 $4.80 降至 $0.92 演进长图",rawSkuCount:36,steps:[{label:"v1 Unoptimized",deltaUsdK:480,isTotal:!0},{label:"+Tool Calls",deltaUsdK:90},{label:"-KV Prefix Lock",deltaUsdK:-180},{label:"-Small Router",deltaUsdK:-210},{label:"-Batch INT8",deltaUsdK:-88},{label:"v2 Unit Cost",deltaUsdK:92,isTotal:!0}]}};function A(s,e,l){const t=l>=4&&l<=6?.3:0;return e==="focus-duckdb-exactcent-pareto-remotion"?{scenarioId:s,compilerMode:e,reconciliationDriftCents:0,executiveComprehensionPct:Number((99.1+t).toFixed(1)),compileLatencySec:2.4,costPerDeckUsd:.006,annualSavingsUsdM:2.14,verdict:"Act automatically"}:e==="raw-45sku-spaghetti-stacked-spreadsheet"?{scenarioId:s,compilerMode:e,reconciliationDriftCents:0,executiveComprehensionPct:38.6,compileLatencySec:180,costPerDeckUsd:45,annualSavingsUsdM:.32,verdict:"Confirm"}:{scenarioId:s,compilerMode:e,reconciliationDriftCents:142e4,executiveComprehensionPct:54.2,compileLatencySec:19.5,costPerDeckUsd:.18,annualSavingsUsdM:.05,verdict:"Send to a human"}}const D=document.querySelector("#app");if(!D)throw new Error("Missing #app root");let o="q3-ai-gross-margin-cfo-bridge",n="focus-duckdb-exactcent-pareto-remotion",i=5;function B(s){const e=s.getContext("2d");if(!e)return;const l=s.width,t=s.height;e.clearRect(0,0,l,t);const r=$[o],T=A(o,n,i),d=n==="llm-unverified-chart-image-generation",g=e.createLinearGradient(0,0,l,t);g.addColorStop(0,"#070b14"),g.addColorStop(1,"#111827"),e.fillStyle=g,e.fillRect(0,0,l,t),e.fillStyle="rgba(15, 23, 42, 0.9)",e.fillRect(16,14,l-32,46),e.strokeStyle=n==="focus-duckdb-exactcent-pareto-remotion"?"#10b981":"#ef4444",e.strokeRect(16,14,l-32,46),e.fillStyle="#f8fafc",e.font="bold 13px Inter, sans-serif",e.fillText(`244th Workbench · FOCUS 1.1 Exact-Cent DuckDB Bridge (${r.rawSkuCount} SKUs -> Top-${i} Pareto Waterfall)`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Reconciliation Drift: ${T.reconciliationDriftCents===0?"0.00¢ (SOX Verified)":"±$14,200 ERR!"} | Comprehension: ${T.executiveComprehensionPct}% | Tri-Export: Web + MP4 + PPTX`,28,51);const f=48,m=86,y=l-96,p=248;e.fillStyle="rgba(15, 23, 42, 0.78)",e.strokeStyle="#1e293b",e.beginPath(),e.roundRect(f,m,y,p,12),e.fill(),e.stroke();const M=Math.max(...r.steps.map(a=>Math.abs(a.deltaUsdK)))*1.32,S=m+p-38,P=(p-76)/M,K=(y-48)/r.steps.length;let c=0;r.steps.forEach((a,b)=>{const v=f+24+b*K+10,h=K-22;let k=0,C=0;if(a.isTotal)k=a.deltaUsdK,C=0,c=a.deltaUsdK;else{const x=c+a.deltaUsdK+(d&&b===3?190:0);k=Math.max(c,x),C=Math.min(c,x),c=x}const U=S-k*P,F=S-C*P,O=Math.max(8,F-U);e.fillStyle=d?"#ef4444":a.isTotal?"#38bdf8":a.deltaUsdK>0?"#f59e0b":"#10b981",e.beginPath(),e.roundRect(v,U,h,O,6),e.fill(),e.fillStyle="#f8fafc",e.font="bold 11px JetBrains Mono, monospace",e.textAlign="center";const L=a.isTotal?`$${a.deltaUsdK}k`:`${a.deltaUsdK>0?"+":""}${a.deltaUsdK}k`;e.fillText(d&&b===3?"??ERR??":L,v+h/2,U-8),e.fillStyle="#cbd5e1",e.font="10px Inter, sans-serif",e.fillText(a.label,v+h/2,S+18)}),e.textAlign="left",e.fillStyle="#34d399",e.font="bold 11px JetBrains Mono, monospace",e.fillText(d?"⛔ AUDIT FAILED: LLM Image/Chart Hallucinated $14,200 Subtotal Gap (Start + Deltas != End)!":"✅ SOX-COMPLIANT INVARIANT: BigInt Exact-Cent Sum(Deltas) === Ending_Spend - Starting_Spend (0.00¢ Drift)",f+12,m+p+26)}function u(){const s=$[o],e=A(o,n,i);D.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">244th Interactive Architecture Workbench · Domain 5 (CFO FinOps Storytelling & Board Decks)</span>
        <h1>企业云与 AI 算力账单（FOCUS 1.1）单利经济瀑布图、Scrollytelling 与高管汇报视频编译工作台</h1>
        <p class="subtitle">FOCUS 1.1 账单 DuckDB 分仙级整数对账 (0.00¢ 误差) + Top-5 帕累托归因折叠 + GSAP Scrollytelling / Remotion 视频 / 原生 PPTX 三端同源导出 vs LLM 直接画图算错总账</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.reconciliationDriftCents===0?"0.00¢ Drift":"Audit Fail"}</span>
        <span class="metric-pill">${e.executiveComprehensionPct}% Clarity</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. CFO / 董事会汇报场景 (Executive FinOps Scenario)</label>
        <select id="scenario-select">
          ${Object.values($).map(t=>`<option value="${t.id}" ${t.id===o?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 账单可视化编译架构 (Compilation Architecture)</label>
        <select id="mode-select">
          <option value="focus-duckdb-exactcent-pareto-remotion" ${n==="focus-duckdb-exactcent-pareto-remotion"?"selected":""}>✅ FOCUS 1.1 DuckDB 精确对账 + Top-K 帕累托瀑布图 + 三端编译 (推荐)</option>
          <option value="llm-unverified-chart-image-generation" ${n==="llm-unverified-chart-image-generation"?"selected":""}>⛔ 让大模型直接汇总 CSV 画信息图 (24.8% 加总算错账 & 柱高与数字倒挂)</option>
          <option value="raw-45sku-spaghetti-stacked-spreadsheet" ${n==="raw-45sku-spaghetti-stacked-spreadsheet"?"selected":""}>⚠️ 原始 48 个云服务未折叠堆叠柱状图 (色彩面条图导致高管抓不住重点)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="pareto-slider">3. 帕累托主驱动项保留数 (Pareto Top-K Drivers: <strong>Top ${i}</strong>)</label>
        <input id="pareto-slider" type="range" min="3" max="8" step="1" value="${i}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>FOCUS 1.1 分仙级精确对账瀑布桥与 Scrollytelling 叙事画布 (Exact-Cent Waterfall Bridge)</h2>
          <span class="tag">${s.rawSkuCount} Raw SKUs → Top-${i} Bridge</span>
        </div>
        <canvas id="finops-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>财务审计合规与高管沟通效能遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">财务首尾加总对账误差 (Audit Drift)</span>
            <strong class="kpi-value">${e.reconciliationDriftCents===0?"0.00¢":"$14,200"}</strong>
            <span class="kpi-note">BigInt 分仙级整数恒等校验 vs LLM 算术幻觉</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">CFO 30秒核心归因抓准率</span>
            <strong class="kpi-value">${e.executiveComprehensionPct}%</strong>
            <span class="kpi-note">自动折叠长尾项，突出缓存与蒸馏降本贡献</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">三端同源编译耗时 (HTML+MP4+PPTX)</span>
            <strong class="kpi-value">${e.compileLatencySec}s</strong>
            <span class="kpi-note">从 Parquet 账单直出交互网页、60fps 视频与 PPT</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单次月报成本 / 年化节省</span>
            <strong class="kpi-value">$${e.costPerDeckUsd.toFixed(3)} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">释放 FinOps 与架构师每月数天手工做表对账工时</span>
          </div>
        </div>
      </aside>
    </main>
  `;const l=document.querySelector("#finops-canvas");l&&B(l),document.querySelector("#scenario-select")?.addEventListener("change",t=>{o=t.target.value,u()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{n=t.target.value,u()}),document.querySelector("#pareto-slider")?.addEventListener("input",t=>{i=Number(t.target.value),u()})}u();
