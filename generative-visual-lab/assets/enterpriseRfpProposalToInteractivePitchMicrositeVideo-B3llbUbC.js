import"./modulepreload-polyfill-B5Qt9EMX.js";const y={"global-bank-core-ai-modernization-rfp":{id:"global-bank-core-ai-modernization-rfp",title:"$18M Global Tier-1 Bank AI & Cloud Modernization RFP (142 Mandatory SLA/Security Clauses)",titleZh:"$18M 跨国银行核心云与 AI 平台招标（142 条强制 SLA、RTO<=15m 与数据驻留条款）",dealSizeUsdM:18,requirementCount:142,keyRequirements:[{reqId:"RFP-SEC-01",clause:"Sovereign HSM BYOK",committedSla:"FIPS 140-3 L3",mappedService:"Azure Managed HSM"},{reqId:"RFP-REL-04",clause:"Multi-Region Active-Active",committedSla:"99.99% / RTO 15m",mappedService:"AKS + Front Door"},{reqId:"RFP-AI-09",clause:"Provisioned Throughput Latency",committedSla:"P99 <= 420ms",mappedService:"Foundry PTU Gateway"}]},"retail-omnichannel-data-lakehouse-rfp":{id:"retail-omnichannel-data-lakehouse-rfp",title:"$9.5M Omnichannel Retail Lakehouse & Real-Time Personalization RFP (96 Clauses)",titleZh:"$9.5M 全域零售实时湖仓一体与推荐引擎投标（96 条吞吐量与 TCO 承诺条款）",dealSizeUsdM:9.5,requirementCount:96,keyRequirements:[{reqId:"RFP-DAT-02",clause:"Zero-Copy Open Parquet",committedSla:"100% Delta/Iceberg",mappedService:"OneLake + Fabric IQ"},{reqId:"RFP-PERF-07",clause:"Streaming Feature Freshness",committedSla:"<= 2.0s E2E",mappedService:"Eventstream + KQL"},{reqId:"RFP-FIN-11",clause:"3-Year TCO Ceiling",committedSla:"<= $1.85M/Yr",mappedService:"Reserved Capacity F64"}]},"sovereign-healthcare-rag-platform-rfp":{id:"sovereign-healthcare-rag-platform-rfp",title:"$12M Sovereign Healthcare Clinical Multimodal AI RFP (HIPAA / Zero-PHI-Egress)",titleZh:"$12M 医疗健康主权多模态临床 AI 招标（HIPAA 零患者隐私出域与可解释溯源）",dealSizeUsdM:12,requirementCount:118,keyRequirements:[{reqId:"RFP-PHI-01",clause:"Zero PHI Egress Boundary",committedSla:"100% VNet Private",mappedService:"Private Link + TEE"},{reqId:"RFP-AUD-05",clause:"Citation Grounding Audit",committedSla:">= 99.5% Verifiable",mappedService:"AI Search + Provenance"},{reqId:"RFP-MED-08",clause:"DICOM De-Identification",committedSla:"100% Safe-Harbor",mappedService:"Health Data Services"}]}};function b(a,e,l){const t=l>=2?.2:0;return e==="structured-rfp-ast-elk-microsite-remotion"?{scenarioId:a,compilerMode:e,slaPricingParityPct:100,officialVendorIconFidelityPct:100,shortlistLiftPct:Number((52.4+t).toFixed(1)),compileLatencySec:3.6,costPerProposalUsd:.012,annualSavingsUsdM:2.62,verdict:"Act automatically"}:e==="static-80page-word-pdf-attachment-only"?{scenarioId:a,compilerMode:e,slaPricingParityPct:99,officialVendorIconFidelityPct:100,shortlistLiftPct:0,compileLatencySec:18e3,costPerProposalUsd:650,annualSavingsUsdM:.15,verdict:"Confirm"}:{scenarioId:a,compilerMode:e,slaPricingParityPct:80.4,officialVendorIconFidelityPct:54,shortlistLiftPct:-14.5,compileLatencySec:28.4,costPerProposalUsd:.35,annualSavingsUsdM:.08,verdict:"Send to a human"}}const k=document.querySelector("#app");if(!k)throw new Error("Missing #app root");let f="global-bank-core-ai-modernization-rfp",o="structured-rfp-ast-elk-microsite-remotion",d=3;function F(a){const e=a.getContext("2d");if(!e)return;const l=a.width,t=a.height;e.clearRect(0,0,l,t);const u=y[f],p=b(f,o,d),s=o==="freeform-llm-summary-pixel-slide-gen",P=e.createLinearGradient(0,0,l,t);P.addColorStop(0,"#070b14"),P.addColorStop(1,"#111827"),e.fillStyle=P,e.fillRect(0,0,l,t),e.fillStyle="rgba(15, 23, 42, 0.9)",e.fillRect(16,14,l-32,46),e.strokeStyle=o==="structured-rfp-ast-elk-microsite-remotion"?"#10b981":"#ef4444",e.strokeRect(16,14,l-32,46),e.fillStyle="#f8fafc",e.font="bold 13px Inter, sans-serif",e.fillText(`249th Workbench · Structured RFP Compliance AST (${u.requirementCount} Clauses) -> Microsite + 90s Pitch Video`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`SLA/Pricing Parity: ${p.slaPricingParityPct}% | Official Vendor Icons: ${p.officialVendorIconFidelityPct}% | Shortlist Lift: +${p.shortlistLiftPct}%`,28,51);const m=24,i=78;e.save(),e.fillStyle="rgba(15, 23, 42, 0.88)",e.strokeStyle="#38bdf8",e.lineWidth=2,e.beginPath(),e.roundRect(m,i,336,290,12),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.font="bold 12px Inter, sans-serif",e.fillText("1. Immutable RFP Compliance Matrix AST",m+16,i+26),u.keyRequirements.forEach((n,g)=>{const c=i+46+g*74;e.fillStyle="#090d16",e.strokeStyle="#1e293b",e.beginPath(),e.roundRect(m+14,c,308,62,8),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 11px JetBrains Mono, monospace",e.fillText(`${n.reqId} -> ${n.mappedService}`,m+24,c+22),e.fillStyle="#cbd5e1",e.font="11px Inter, sans-serif",e.fillText(`${n.clause} | SLA: ${n.committedSla}`,m+24,c+44)}),e.restore();const r=380,v=356;e.save(),e.fillStyle="rgba(15, 23, 42, 0.88)",e.strokeStyle=s?"#ef4444":"#10b981",e.lineWidth=2,e.beginPath(),e.roundRect(r,i,v,290,12),e.fill(),e.stroke(),e.fillStyle=s?"#f87171":"#34d399",e.font="bold 12px Inter, sans-serif",e.fillText(s?"⛔ Freeform LLM Slide: 19.6% SLA Drift & Fake Vendor Logos!":`✅ Customer Microsite + 90s Pitch Video (${d}× Scale Sandbox)`,r+16,i+26),u.keyRequirements.forEach((n,g)=>{const c=r+22+g*108,h=i+62;e.fillStyle=s?"#2b1219":"#1e293b",e.strokeStyle=s?"#ef4444":"#38bdf8",e.lineWidth=2,e.beginPath(),e.roundRect(c,h,96,86,8),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 10px Inter, sans-serif",e.fillText(s?"??FakeLogo??":n.mappedService,c+8,h+28),e.fillStyle=s?"#fca5a5":"#6ee7b7",e.font="bold 10px JetBrains Mono, monospace",e.fillText(s?"SLA Mismatch!":n.committedSla,c+8,h+56)}),e.fillStyle="#090d16",e.fillRect(r+18,i+172,v-36,98),e.strokeStyle="#334155",e.strokeRect(r+18,i+172,v-36,98),e.fillStyle="#f8fafc",e.font="bold 11px Inter, sans-serif",e.fillText(`Deal Size: $${u.dealSizeUsdM.toFixed(1)}M | Interactive Scale: ${d}00k Active Users`,r+30,i+198),e.fillStyle="#34d399",e.font="11px JetBrains Mono, monospace",e.fillText("100% Locked to RFP Compliance Matrix (Zero Legal SLA Contradiction)",r+30,i+224),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Compiled in ${p.compileLatencySec}s ($${p.costPerProposalUsd.toFixed(3)}) · Saves +$${p.annualSavingsUsdM.toFixed(2)}M/yr`,r+30,i+248),e.restore()}function S(){const a=y[f],e=b(f,o,d);k.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">249th Interactive Architecture Workbench · Domain 5 (Enterprise RFP Proposal to Pitch Microsite)</span>
        <h1>企业千万美元级投标方案书（RFP Word/Markdown）转交互式架构沙盘与 90秒高管讲标视频工作台</h1>
        <p class="subtitle">RFP 合规矩阵 AST 硬绑定 (100% SLA/报价零篡改) + 官方云厂商图标 ELK 拓扑 + 客户可调并发 TCO 沙盘微站 + 90s Remotion 讲标视频 vs 80页死文档或自由生成串改 SLA</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.slaPricingParityPct}% SLA Lock</span>
        <span class="metric-pill">+${e.shortlistLiftPct}% Shortlist Lift</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 重大行业招投标场景 (Enterprise RFP Deal)</label>
        <select id="scenario-select">
          ${Object.values(y).map(t=>`<option value="${t.id}" ${t.id===f?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 投标交付物编译管线 (Proposal Compilation Pipeline)</label>
        <select id="mode-select">
          <option value="structured-rfp-ast-elk-microsite-remotion" ${o==="structured-rfp-ast-elk-microsite-remotion"?"selected":""}>✅ 结构化 RFP 条款 AST + 官方图标交互微站 + 90s 讲标视频 (推荐)</option>
          <option value="freeform-llm-summary-pixel-slide-gen" ${o==="freeform-llm-summary-pixel-slide-gen"?"selected":""}>⛔ 让 LLM 自由缩写 80 页标书并走像素生图 (19.6% 篡改 SLA 承诺引法律风险)</option>
          <option value="static-80page-word-pdf-attachment-only" ${o==="static-80page-word-pdf-attachment-only"?"selected":""}>⚠️ 仅提交传统 80 页纯文字 Word/PDF 标书 (评委 3 分钟跳读难以拉开差距)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="scale-slider">3. 客户微站压测并发档位 (Customer Traffic Tier: <strong>${d}00k Users</strong>)</label>
        <input id="scale-slider" type="range" min="1" max="5" step="1" value="${d}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>RFP 条款点对点应答矩阵 AST → 交互式客户架构微站与 90s 讲标视频 (RFP-to-Microsite Stage)</h2>
          <span class="tag">$${a.dealSizeUsdM.toFixed(1)}M Deal · ${a.requirementCount} Clauses</span>
        </div>
        <canvas id="rfp-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>招投标合规度与赢单转化遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">SLA 与商务报价跟标书一致率</span>
            <strong class="kpi-value">${e.slaPricingParityPct}%</strong>
            <span class="kpi-note">微站与视频直读同一份合规表 AST (零口误)</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">官方云服务图标与架构合规度</span>
            <strong class="kpi-value">${e.officialVendorIconFidelityPct}%</strong>
            <span class="kpi-note">100% 绑定官方 SVG 图标库，杜绝像素伪造</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">评标委员会短名单入围率提升</span>
            <strong class="kpi-value">+${e.shortlistLiftPct}%</strong>
            <span class="kpi-note">90秒动态讲标视频 + 可交互 TCO 算力沙盘</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单标编译成本 / 售前工时年省</span>
            <strong class="kpi-value">$${e.costPerProposalUsd.toFixed(3)} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">3.6秒从标书 Markdown 编译微站、视频与 PPTX</span>
          </div>
        </div>
      </aside>
    </main>
  `;const l=document.querySelector("#rfp-canvas");l&&F(l),document.querySelector("#scenario-select")?.addEventListener("change",t=>{f=t.target.value,S()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{o=t.target.value,S()}),document.querySelector("#scale-slider")?.addEventListener("input",t=>{d=Number(t.target.value),S()})}S();
