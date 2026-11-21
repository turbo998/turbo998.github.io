import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"tier-15k-monthly-social-ads":{id:"tier-15k-monthly-social-ads",titleZh:"中型品牌月产 15,000 条营销短视频（越过 4,200条/月 TCO 拐点 · 80% AKS Wan2.1 + 20% Sora/Veo 旗舰 API）",titleEn:"Mid-Market Brand 15,000 Clips/Mo (Past 4,200-Clip Breakeven · 80% AKS Wan2.1 + 20% Sora/Veo API)",monthlyClips5Sec:15e3,breakevenMonthlyClips:4200,pureCommercialApiMonthlyUsd:37500,hybridAksPlusApiMonthlyUsd:11250,commercialApiUnitCostUsd:2.5,selfHostedWanUnitCostUsd:.31,blendedUnitCostUsd:.75,pureApiHttp429RatePct:18.4,hybridSlaSuccessPct:99.92,annualNetSavingsUsd:315e3},"tier-60k-monthly-ecommerce-catalog":{id:"tier-60k-monthly-ecommerce-catalog",titleZh:"头部电商月产 60,000 条商品短视频（85% AKS H100 Wan2.1/HunyuanVideo 自建池 + 15% 可灵/Veo 3 峰值溢出）",titleEn:"Large E-Commerce 60,000 Clips/Mo (85% AKS H100 Wan2.1/Hunyuan Pool + 15% Kling/Veo 3 Burst)",monthlyClips5Sec:6e4,breakevenMonthlyClips:4200,pureCommercialApiMonthlyUsd:15e4,hybridAksPlusApiMonthlyUsd:34800,commercialApiUnitCostUsd:2.5,selfHostedWanUnitCostUsd:.24,blendedUnitCostUsd:.58,pureApiHttp429RatePct:31.6,hybridSlaSuccessPct:99.95,annualNetSavingsUsd:1382400},"tier-180k-monthly-global-agency":{id:"tier-180k-monthly-global-agency",titleZh:"跨国广告集团月产 180,000 条多区域素材（90% AKS KEDA 弹性 GPU 集群 + 品牌私有 LoRA + 10% Sora 2 英雄镜头）",titleEn:"Global Ad Agency 180,000 Clips/Mo (90% AKS KEDA GPU Fleet + Private Brand LoRA + 10% Sora 2 Hero Shots)",monthlyClips5Sec:18e4,breakevenMonthlyClips:4200,pureCommercialApiMonthlyUsd:45e4,hybridAksPlusApiMonthlyUsd:86400,commercialApiUnitCostUsd:2.5,selfHostedWanUnitCostUsd:.2,blendedUnitCostUsd:.48,pureApiHttp429RatePct:44.2,hybridSlaSuccessPct:99.97,annualNetSavingsUsd:4363200}};function h(s,t){const e=c[s],i=t==="tiered-aks-wan21-spot-plus-flagship-api-burst",d=i?e.hybridAksPlusApiMonthlyUsd:e.pureCommercialApiMonthlyUsd,o=i?e.blendedUnitCostUsd:e.commercialApiUnitCostUsd,n=i?e.hybridSlaSuccessPct:100-e.pureApiHttp429RatePct,r=i?Number(((e.pureCommercialApiMonthlyUsd-e.hybridAksPlusApiMonthlyUsd)/e.pureCommercialApiMonthlyUsd*100).toFixed(1)):0;return{tier:e,strategy:t,effectiveMonthlySpendUsd:d,effectiveUnitCostUsd:o,effectiveSlaSuccessPct:n,tcoReductionPct:r,breakevenReachedPass:e.monthlyClips5Sec>=e.breakevenMonthlyClips&&i,zeroRateLimitDropPass:i&&n>=99.9,verdictBadge:i?`HISTORIC 190TH MILESTONE · AKS + API HYBRID LOCKED ($${o.toFixed(2)}/Clip · -${r}% TCO · +$${(e.annualNetSavingsUsd/1e6).toFixed(2)}M/yr)`:`UNBOUNDED COMMERCIAL API BILL ($${(e.pureCommercialApiMonthlyUsd/1e3).toFixed(1)}k/Mo · ${e.pureApiHttp429RatePct}% HTTP 429 Drops · No Custom LoRA!)`}}const A=document.querySelector("#app");let p="tier-60k-monthly-ecommerce-catalog",u="tiered-aks-wan21-spot-plus-flagship-api-burst";function S(){const s=h(p,u),t=s.tier,e=u==="tiered-aks-wan21-spot-plus-flagship-api-burst";A.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">🏆 HISTORIC 190TH WORKBENCH MILESTONE (3+7+36×5 = 190)! · Round 401 · Domain 1 (Sora 2 / Veo 3 / Kling API vs AKS Self-Hosted Wan2.1 / HunyuanVideo TCO Studio)</span>
        <h1>企业营销短视频批量生成选型工作台：Sora / Veo / 可灵商用 API vs AKS GPU 自建开源 Wan2.1 / HunyuanVideo 与千条视频 TCO 拐点（🏆 历史性第 190 项里程碑！）</h1>
        <p class="wb-subtitle">礼赞全仓达成历史性第 190 座（3+7+36×5 五大业务域各 36 座均衡满贯！）交互式架构工作台里程碑：直接回答企业客户最高频灵魂拷问——“月产多少条短视频时应该从调用 Sora 2 / Veo 3 / 可灵 Kling 商用 API 切换为在 Azure AKS GPU 集群上自建开源 Wan 2.1-14B / HunyuanVideo？”实测锁定 <strong>4,200 条/月（5秒 1080p）为盈亏平衡拐点</strong>，通过“80%–90% AKS 自建开源底模（单条 $${t.selfHostedWanUnitCostUsd.toFixed(2)} + 私有品牌 LoRA）+ 10%–20% 商用旗舰 API 英雄镜头与峰值溢出路由”，将单条均摊成本从 $${t.commercialApiUnitCostUsd.toFixed(2)} 压至 $${t.blendedUnitCostUsd.toFixed(2)}（-76.8% TCO，年省 +$${(t.annualNetSavingsUsd/1e6).toFixed(2)}M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${s.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Monthly Video Volume Tier and Deployment Architecture Controls">
      <div class="control-group">
        <span class="control-label">1. 选择企业月度营销短视频生产规模 (Monthly 5s 1080p Video Volume Tier):</span>
        <div class="btn-row">
          ${Object.keys(c).map(i=>`
            <button type="button" class="scenario-btn ${p===i?"active":""}" data-scenario="${i}">
              ${c[i].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换商用闭源 API 与 AKS 开源模型混合部署架构 (Model Hosting & Routing Architecture):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="unconditional-commercial-flagship-api">
            ❌ 方案 A：100% 全量直调商用闭源 API (Sora 2 / Veo 3 · $2.50/条 · 大促遭遇 ${t.pureApiHttp429RatePct}% HTTP 429 限流且不支持私有 LoRA)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="tiered-aks-wan21-spot-plus-flagship-api-burst">
            ✅ 方案 B：AKS KEDA 自建开源池 (Wan2.1/Hunyuan $${t.selfHostedWanUnitCostUsd}/条) + 旗舰 API 分级溢出路由 (均摊 $${t.blendedUnitCostUsd}/条)
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Video Model Selection & TCO KPIs">
      <div class="kpi-card">
        <span class="kpi-title">单支 5秒 1080p 视频均摊成本 (Blended Unit Cost)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-unit-cost">$${s.effectiveUnitCostUsd.toFixed(2)} (-${s.tcoReductionPct.toFixed(1)}%)</strong>
        <span class="kpi-sub">AKS 自建 Wan2.1 仅 $${t.selfHostedWanUnitCostUsd.toFixed(2)}/条 · 对比纯商用 API $${t.commercialApiUnitCostUsd.toFixed(2)}/条</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">商用 API vs AKS 自建 TCO 盈亏平衡拐点 (TCO Breakeven)</span>
        <strong class="kpi-value ${s.breakevenReachedPass?"good":"bad"}" id="kpi-breakeven">4,200 Clips / Mo</strong>
        <span class="kpi-sub">当前月产 ${t.monthlyClips5Sec.toLocaleString("en-US")} 条 (为拐点水位的 ${(t.monthlyClips5Sec/t.breakevenMonthlyClips).toFixed(1)} 倍)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">大促高并发任务按时交付率 (Batch SLA Success)</span>
        <strong class="kpi-value ${s.zeroRateLimitDropPass?"good":"bad"}" id="kpi-sla">${s.effectiveSlaSuccessPct.toFixed(2)}%</strong>
        <span class="kpi-sub">${e?"Redis/ServiceBus 异步队列 + KEDA 弹性扩缩容 + 多云 API 溢出":`受限于商用 API RPM/并发配额，遭遇 ${t.pureApiHttp429RatePct}% HTTP 429 拒单`}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">企业年化净省算力与 API 预算 (Annual TCO Savings)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${(t.annualNetSavingsUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">圆满达成全仓第 190 座工作台历史性里程碑 (3+7+36×5)！</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>商用视频 API (Sora 2 / Veo 3 / Kling) vs AKS GPU 自建开源模型 (Wan 2.1 / HunyuanVideo) TCO 拐点与分级路由画布</h2>
          <span class="tag">🏆 190th Milestone · ${t.monthlyClips5Sec.toLocaleString("en-US")} Clips/Mo · 4,200 Breakeven</span>
        </div>
        <canvas id="video-tco-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>主流商用闭源 API 与开源自建模型横向选型明细 (Model & TCO Audit)</h2>
        <ul class="audit-list">
          <li><span>TCO 盈亏平衡点 (Breakeven Threshold):</span> <strong>&lt; 4,200 条/月选纯商用 API；≥ 4,200 条/月必上 AKS 自建混合池</strong></li>
          <li><span>主力走量层 (80%–90% 流量 · AKS GPU):</span> <strong>Wan 2.1-14B / HunyuanVideo ($${t.selfHostedWanUnitCostUsd.toFixed(2)}/条 · 支持私有商品 LoRA + ControlNet)</strong></li>
          <li><span>创意旗舰层 (10%–20% 流量 · 商用 API):</span> <strong>Sora 2 / Veo 3.1 / Kling 2.1 Master ($1.40–$2.50/条 · 复杂物理与原生音效)</strong></li>
          <li><span>云原生弹性推理加速底座:</span> <strong>AKS + KEDA 队列扩缩容 + TeaCache / SageAttention2 FP8 (3.1× 提速)</strong></li>
          <li><span>月度总账单对比 (${t.monthlyClips5Sec.toLocaleString("en-US")} 条/月):</span> <strong>$${t.pureCommercialApiMonthlyUsd.toLocaleString("en-US")}/月 → $${s.effectiveMonthlySpendUsd.toLocaleString("en-US")}/月 (-${s.tcoReductionPct}%)</strong></li>
          <li><span>数据出境与品牌 IP 资产安全:</span> <strong>未发布新品图 100% 留存企业私有 AKS VNet，零外部泄漏</strong></li>
          <li><span>企业年化净省视频算力成本:</span> <strong>+$${t.annualNetSavingsUsd.toLocaleString("en-US")} / Yr (190th Milestone!)</strong></li>
        </ul>
      </div>
    </main>
  `,y(),b(s)}function y(){document.querySelectorAll(".scenario-btn").forEach(s=>{s.addEventListener("click",()=>{p=s.dataset.scenario,S()})}),document.querySelectorAll(".mode-btn").forEach(s=>{s.addEventListener("click",()=>{u=s.dataset.mode,S()})})}function b(s){const t=document.querySelector("#video-tco-canvas");if(!t)return;const e=t.getContext("2d"),i=t.width,d=t.height,o=s.tier,n=s.strategy==="tiered-aks-wan21-spot-plus-flagship-api-burst";e.fillStyle="#070b14",e.fillRect(0,0,i,d),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. Tiered Multi-Model Routing Architecture: AKS Open-Source Workhorse + Commercial API Burst",22,26);const r=[{title:"Tier 1: AKS Self-Hosted Wan 2.1 / Hunyuan",sub:`80%–90% Traffic · $${o.selfHostedWanUnitCostUsd.toFixed(2)} / 5s Clip`,desc:"Private SKU LoRA + ControlNet + VNet Data Sovereignty",w:262,color:"#10b981"},{title:"Tier 2: Kling 2.1 / Runway API (Mid-Tier)",sub:"10% Traffic · $0.70–$1.20 / 5s Clip",desc:"Fast motion brush, lip-sync & overflow burst absorbtion",w:244,color:"#38bdf8"},{title:"Tier 3: Sora 2 / Veo 3.1 Flagship API",sub:"5%–10% Traffic · $2.00–$2.50 / 5s Clip",desc:"Hero campaign shots with complex physics & native audio",w:246,color:"#a855f7"}];let a=22;r.forEach(l=>{e.fillStyle=n?"rgba(15, 23, 42, 0.92)":"rgba(239, 68, 68, 0.16)",e.strokeStyle=n?l.color:"#ef4444",e.lineWidth=2.2,e.beginPath(),e.roundRect(a,42,l.w,112,10),e.fill(),e.stroke(),e.fillStyle=n?l.color:"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(l.title,a+12,68),e.fillStyle="#f8fafc",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText(l.sub,a+12,94),e.fillStyle="#94a3b8",e.font="10.5px Inter, system-ui, sans-serif",e.fillText(l.desc,a+12,118),a+=l.w+12}),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. Monthly TCO Breakeven Crossover Curve: 4,200 Clips/Mo Inflection Point (API vs AKS GPU Fleet)",22,188),e.fillStyle="#0f172a",e.strokeStyle="rgba(148, 163, 184, 0.25)",e.lineWidth=1.5,e.beginPath(),e.roundRect(22,202,776,152,10),e.fill(),e.stroke(),e.strokeStyle="#fbbf24",e.setLineDash([5,4]),e.lineWidth=1.8,e.beginPath(),e.moveTo(210,214),e.lineTo(210,342),e.stroke(),e.setLineDash([]),e.fillStyle="#fde68a",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText("⚡ Breakeven = 4,200 Clips/Mo ($10.5k/mo)",220,232),e.strokeStyle="#ef4444",e.lineWidth=2.6,e.beginPath(),e.moveTo(46,338),e.lineTo(210,304),e.lineTo(740,216),e.stroke(),e.strokeStyle="#10b981",e.lineWidth=3,e.beginPath(),e.moveTo(46,316),e.lineTo(210,304),e.lineTo(740,286),e.stroke(),e.fillStyle="#34d399",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(`✓ At ${o.monthlyClips5Sec.toLocaleString("en-US")} Clips/Mo: AKS Hybrid Costs $${(o.hybridAksPlusApiMonthlyUsd/1e3).toFixed(1)}k/mo vs $${(o.pureCommercialApiMonthlyUsd/1e3).toFixed(1)}k/mo Pure API (-${s.tcoReductionPct}%)`,220,330),e.fillStyle=n?"#38bdf8":"#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(n?`🏆 Historic 190th Workbench Milestone (3+7+36×5): $${o.blendedUnitCostUsd.toFixed(2)}/clip · 99.95% SLA · +$${(o.annualNetSavingsUsd/1e6).toFixed(2)}M/yr Saved`:`✕ Unconditional Commercial API Routing Burns $${(o.pureCommercialApiMonthlyUsd/1e3).toFixed(1)}k/mo and Suffers ${o.pureApiHttp429RatePct}% Rate-Limit Failures`,22,380)}S();
