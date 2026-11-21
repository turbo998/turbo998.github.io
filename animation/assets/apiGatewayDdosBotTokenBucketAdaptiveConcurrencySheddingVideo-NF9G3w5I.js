import"./modulepreload-polyfill-B5Qt9EMX.js";const p={"downstream-slow-db-cascade":{id:"downstream-slow-db-cascade",titleZh:"非核心推荐库慢查询级联雪崩（RTT 15ms→1,500ms · Little定律并发暴涨 100倍占满线程 vs 舱壁+Gradient2）",titleEn:"Downstream Slow-Query Cascade (RTT 15ms→1,500ms · Little’s Law 100x Concurrency Explosion vs Gradient2)",surgeProfile:"Tier-2 Recommendation DB Degrades 15ms → 1,500ms at 50k RPS (Total 180k RPS)",incomingTotalRps:18e4,tier0CheckoutRps:24e3,noLoadBaselineRttMs:14,naiveCongestedRttMs:4850,gradient2ControlledRttMs:16.4,naiveTier0SuccessRatePct:11.4,gradient2Tier0SuccessRatePct:99.99,naiveInFlightConcurrency:75e3,gradient2InFlightCap:1420,annualOutageAndOrderSavedUsd:548e4},"retry-storm-4x-amplification":{id:"retry-storm-4x-amplification",titleZh:"客户端同步重试风暴 4.0× 流量放大（无抖动同步重试打死恢复中节点 vs 10% 重试预算令牌 + Full Jitter）",titleEn:"Synchronized Client Retry Storm 4.0× Amplification (Unjittered Retries vs 10% Retry Budget + Full Jitter)",surgeProfile:"Transient 800ms BGP Blip Triggers 4.0× Synchronized SDK Retries (320,000 RPS Peak)",incomingTotalRps:32e4,tier0CheckoutRps:38e3,noLoadBaselineRttMs:12,naiveCongestedRttMs:6200,gradient2ControlledRttMs:15.2,naiveTier0SuccessRatePct:8.2,gradient2Tier0SuccessRatePct:99.98,naiveInFlightConcurrency:96e3,gradient2InFlightCap:1680,annualOutageAndOrderSavedUsd:612e4},"llm-scraper-flash-sale-flood":{id:"llm-scraper-flash-sale-flood",titleZh:"黑五秒杀 + 22万 RPS 恶意爬虫混合洪峰（一刀切 429 误杀 68% 付款单 vs Tier-3 爬虫优先卸载保 99.99% 结账）",titleEn:"Black-Friday Flash Sale + 220k RPS Bot Scraper Flood (Blind 429 Drops 68% Checkouts vs Tier-0 Priority Lock)",surgeProfile:"280,000 RPS Surge (220k Bot Scrapers + 35k Browse + 25k Tier-0 Checkout)",incomingTotalRps:28e4,tier0CheckoutRps:25e3,noLoadBaselineRttMs:13.5,naiveCongestedRttMs:3400,gradient2ControlledRttMs:14.2,naiveTier0SuccessRatePct:31.8,gradient2Tier0SuccessRatePct:99.99,naiveInFlightConcurrency:68e3,gradient2InFlightCap:1540,annualOutageAndOrderSavedUsd:724e4}};function m(t,i){const e=p[t],a=i==="gradient2-adaptive-concurrency-tiered-qos",c=a?e.gradient2Tier0SuccessRatePct:e.naiveTier0SuccessRatePct,s=a?e.gradient2ControlledRttMs:e.naiveCongestedRttMs,n=a?e.gradient2InFlightCap:e.naiveInFlightConcurrency,v=Number((e.noLoadBaselineRttMs/s).toFixed(2));return{scenario:e,mode:i,effectiveTier0SuccessPct:c,effectiveP99LatencyMs:s,effectiveInFlightConcurrency:n,rttGradientRatio:v,tier0ZeroStarvationPass:a&&c>=99.9&&s<=25,verdictBadge:a?`GRADIENT2 & TIER-0 QOS LOCKED (${c.toFixed(2)}% Checkout Success · ${s.toFixed(1)}ms p99)`:`THREAD STARVATION & CHECKOUT DROP (${e.naiveTier0SuccessRatePct.toFixed(1)}% Checkout Success · ${e.naiveInFlightConcurrency.toLocaleString("en-US")} Queued)`}}const R=document.querySelector("#app");let g="downstream-slow-db-cascade",S="gradient2-adaptive-concurrency-tiered-qos";function f(){const t=m(g,S),i=t.scenario,e=S==="gradient2-adaptive-concurrency-tiered-qos";R.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 390 · 179th Curated Workbench · Domain 5 (API Gateway Little's Law Adaptive Concurrency, Tiered Load Shedding & Retry-Storm Video Studio)</span>
        <h1>高并发 API 网关 Little 定律自适应并发限流 (Gradient2) 与四级 QoS 保结账工作台</h1>
        <p class="wb-subtitle">终结静态 RPS 限流在下游慢查询（RTT 15ms→1,500ms）时因利特尔法则（L = λ × W）并发连接暴涨 100倍占满全站线程、且一刀切 429 误杀 68%+ 核心付款单的痛点：结合 Envoy Gradient2 RTT 梯度自适应并发窗、四级 QoS 优先级卸载与 10% 重试预算锁，保障 Tier-0 支付结账 99.99% 成功率与 14.2ms P99（年规避损失 +$5.48M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${t.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Gateway Surge Scenario and Pipeline Controls">
      <div class="control-group">
        <span class="control-label">1. 选择 API 网关突发洪峰与级联故障场景 (Gateway Surge & Fault Scenario):</span>
        <div class="btn-row">
          ${Object.keys(p).map(a=>`
            <button type="button" class="scenario-btn ${g===a?"active":""}" data-scenario="${a}">
              ${p[a].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换网关流控与过载卸载架构 (Concurrency & Load-Shedding Mode):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="naive-static-rps-unprioritized">
            ❌ 传统基线：静态 RPS 限流 + 无优先级一刀切 429 (慢依赖耗尽线程池 + 误杀 VIP 付款单)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="gradient2-adaptive-concurrency-tiered-qos">
            ✅ 推荐架构：Gradient2 RTT 梯度自适应并发窗 + 四级 QoS 优先保结账 + 10% 重试预算锁
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core API Gateway Resilience KPIs">
      <div class="kpi-card">
        <span class="kpi-title">Tier-0 核心支付结账成功率 (Checkout SLA)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-checkout">${t.effectiveTier0SuccessPct.toFixed(2)}%</strong>
        <span class="kpi-sub">核心结账流量 ${i.tier0CheckoutRps.toLocaleString("en-US")} RPS · 对比基线 ${i.naiveTier0SuccessRatePct.toFixed(1)}%</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">网关在途并发请求数 (Little's Law L = λ×W)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-inflight">${t.effectiveInFlightConcurrency.toLocaleString("en-US")} in-flight</strong>
        <span class="kpi-sub">${e?"Gradient2 自动收缩并发窗防队列积压":`对比积压 ${i.naiveInFlightConcurrency.toLocaleString("en-US")} 打爆 Worker 线程池`}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">端到端响应延迟与 RTT 梯度比 (RTT & Gradient)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-latency">${t.effectiveP99LatencyMs.toFixed(1)} ms (G=${t.rttGradientRatio.toFixed(2)})</strong>
        <span class="kpi-sub">无负载基线 RTT ${i.noLoadBaselineRttMs.toFixed(1)} ms · 健康梯度 G ≥ 0.75</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">年化规避雪崩与误杀订单损失 (Annual ROI)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${(i.annualOutageAndOrderSavedUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">总入口洪峰 ${i.incomingTotalRps.toLocaleString("en-US")} RPS</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>四级 QoS 水位分级卸载 (Tier-0..3 Load Shedding) 与 Little 定律自适应并发控制画布</h2>
          <span class="tag">${i.surgeProfile}</span>
        </div>
        <canvas id="gateway-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>Envoy Gradient2 控制器与四级 QoS 审计明细 (Adaptive Concurrency Audit)</h2>
        <ul class="audit-list">
          <li><span>当前网关洪峰与故障画像:</span> <strong>${i.surgeProfile}</strong></li>
          <li><span>无负载最小 RTT (RTT_noload):</span> <strong>${i.noLoadBaselineRttMs.toFixed(1)} ms</strong></li>
          <li><span>实测队列 RTT 与梯度 G:</span> <strong>${t.effectiveP99LatencyMs.toFixed(1)} ms (Gradient = ${t.rttGradientRatio.toFixed(2)})</strong></li>
          <li><span>在途并发请求数 (In-Flight L):</span> <strong>${i.naiveInFlightConcurrency.toLocaleString("en-US")} → ${t.effectiveInFlightConcurrency.toLocaleString("en-US")}</strong></li>
          <li><span>四级 QoS 卸载策略:</span> <strong>${e?"100% 拦截 Tier-3 爬虫/慢报表, 100% 放行 Tier-0 支付结账":"无优先级随机丢包 (误杀 68%+ 真实付款订单)"}</strong></li>
          <li><span>客户端 SDK 重试风暴抑制:</span> <strong>${e?"Retry Budget ≤ 10% + Full Exponential Jitter":"无抖动同步重试 3次 (4.0× 流量自残放大)"}</strong></li>
          <li><span>年化挽回 GMV 与 SLA 赔付:</span> <strong>+$${i.annualOutageAndOrderSavedUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,k(),b(t)}function k(){document.querySelectorAll(".scenario-btn").forEach(t=>{t.addEventListener("click",()=>{g=t.dataset.scenario,f()})}),document.querySelectorAll(".mode-btn").forEach(t=>{t.addEventListener("click",()=>{S=t.dataset.mode,f()})})}function b(t){const i=document.querySelector("#gateway-canvas");if(!i)return;const e=i.getContext("2d"),a=i.width,c=i.height,s=t.scenario,n=t.mode==="gradient2-adaptive-concurrency-tiered-qos";e.fillStyle="#070b14",e.fillRect(0,0,a,c),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. Four-Tier QoS Priority Load Shedding & Bulkhead Thread Isolation",22,26),[{name:"Tier-0: Payment Checkout & Auth Token (Critical)",admit:n?"100.0% Admitted (Reserved Bulkhead)":`${s.naiveTier0SuccessRatePct}% Admitted (Starved!)`,color:n?"#10b981":"#ef4444"},{name:"Tier-1: Cart Mutation & Order Status Read",admit:n?"99.4% Admitted (High Priority)":"14.2% Admitted (Queue Timeout)",color:n?"#38bdf8":"#ef4444"},{name:"Tier-2: Heavy AI Recommendations & Related Items",admit:n?"Graceful Static Fallback (Shed Slow DB)":"Holds 75,000 Worker Threads!",color:n?"#f59e0b":"#ef4444"},{name:"Tier-3: Anonymous Bot Scrapers & Batch Exports",admit:n?"Shed 100% at Edge (HTTP 429 / TARPIT)":"Consumes 78% of Gateway CPU!",color:n?"#a855f7":"#ef4444"}].forEach((o,u)=>{const l=44+u*78;e.fillStyle="#0f172a",e.strokeStyle=o.color,e.lineWidth=2,e.beginPath(),e.roundRect(22,l,382,66,8),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(o.name,36,l+26),e.fillStyle=n?"#6ee7b7":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(`→ ${o.admit}`,36,l+48)}),e.fillStyle=n?"#34d399":"#f87171",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(n?"✓ Priority Shedding Drops Bots First → 99.99% Tier-0 Checkout Success":`✕ Unprioritized Pool Starvation Drops ${100-Math.round(s.naiveTier0SuccessRatePct)}% of Paying Customers!`,22,376);const r=426;e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. Little's Law (L = λ × W) Hockey-Stick Queue vs Gradient2 Cap",r,26),e.fillStyle="#0f172a",e.strokeStyle="rgba(148, 163, 184, 0.28)",e.lineWidth=1.5,e.beginPath(),e.roundRect(r,44,372,298,10),e.fill(),e.stroke(),e.strokeStyle="#ef4444",e.lineWidth=2.6,e.beginPath();for(let o=0;o<=310;o+=10){const u=r+30+o,l=o/310,y=278-(l>.52?Math.pow((l-.52)/.48,2.8)*185:l*12);o===0?e.moveTo(u,y):e.lineTo(u,y)}e.stroke();const d=r+30+310*.52;e.strokeStyle="#10b981",e.setLineDash([6,4]),e.lineWidth=2,e.beginPath(),e.moveTo(d,64),e.lineTo(d,286),e.stroke(),e.setLineDash([]);const T=n?d-8:r+324,h=n?270:94;e.fillStyle=n?"#34d399":"#ef4444",e.beginPath(),e.arc(T,h,7,0,Math.PI*2),e.fill(),e.fillStyle="#34d399",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText(`Gradient2 Knee Cap (L=${s.gradient2InFlightCap})`,d-82,82),e.fillStyle="#fca5a5",e.fillText(`Unbounded Queue (L=${s.naiveInFlightConcurrency.toLocaleString("en-US")})`,r+188,122),e.fillStyle="#94a3b8",e.font="11px Inter, system-ui, sans-serif",e.fillText("Formula: Limit_{t+1} = Limit_t × (RTT_noload / RTT_actual) + √Limit_t",r+18,322),e.fillStyle=n?"#34d399":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(n?`✓ Keeps Gateway Left of Queueing Knee (${t.effectiveP99LatencyMs.toFixed(1)}ms p99 · +$${(s.annualOutageAndOrderSavedUsd/1e6).toFixed(2)}M/yr)`:`✕ Static RPS Limit Blind to Latency W → ${s.naiveCongestedRttMs}ms Queue Collapse!`,r+2,376)}f();
