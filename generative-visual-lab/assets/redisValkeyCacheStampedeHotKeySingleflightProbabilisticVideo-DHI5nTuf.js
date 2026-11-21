import"./modulepreload-polyfill-B5Qt9EMX.js";const S={"ttl-expiry-thundering-herd":{id:"ttl-expiry-thundering-herd",titleZh:"8.5万 QPS 热点商品库存 Key 到期击穿（180ms SQL 重算 · 15,300 并发打死 DB vs XFetch+Singleflight 仅 1 次查询）",titleEn:"85k QPS Hot-Key TTL Expiry Stampede (180ms SQL · 15,300 Concurrent DB Hits vs XFetch + Singleflight = 1 Hit)",workloadProfile:"Flash-Sale SKU Metadata Key (85,000 QPS · 180ms DB Aggregation · 60s TTL)",incomingKeyQps:85e3,dbRecomputeDurationMs:180,naiveDbPenetrationQueriesPerSec:15300,protectedDbPenetrationQueriesPerSec:1,naiveHotShardCpuPct:98.4,protectedHotShardCpuPct:22.4,naiveP99LatencyMs:2450,protectedP99LatencyMs:.85,annualOutageAndInfraSavingsUsd:346e4},"single-shard-420k-hotkey":{id:"single-shard-420k-hotkey",titleZh:"42万 QPS 突发头条热搜单分片打爆（CRC16 哈希落单核 100% CPU vs HeavyKeeper + RESP3 本地 L1 缓存）",titleEn:"420k QPS Breaking-News Single-Shard Hot-Key (100% Single-Core Saturation vs HeavyKeeper + RESP3 L1 Cache)",workloadProfile:"Breaking-News Feed Banner Key (420,000 QPS on Shard #14 of 64-Shard Cluster)",incomingKeyQps:42e4,dbRecomputeDurationMs:95,naiveDbPenetrationQueriesPerSec:39900,protectedDbPenetrationQueriesPerSec:1,naiveHotShardCpuPct:100,protectedHotShardCpuPct:24.6,naiveP99LatencyMs:680,protectedP99LatencyMs:.42,annualOutageAndInfraSavingsUsd:418e4},"mass-ttl-avalanche-restart":{id:"mass-ttl-avalanche-restart",titleZh:"大促整点预热 50万 Key 同步过期雪崩（固定 3600s TTL 整点集体失效 vs 指数抖动 TTL + 软过期租约）",titleEn:"500k Pre-Warmed Keys Synchronized TTL Avalanche (Fixed 3600s Expiry vs Jittered TTL + Soft-TTL Lease)",workloadProfile:"500,000 Pre-Warmed Catalog Keys Expiring Simultaneously at 00:00 Midnight (310,000 QPS)",incomingKeyQps:31e4,dbRecomputeDurationMs:120,naiveDbPenetrationQueriesPerSec:37200,protectedDbPenetrationQueriesPerSec:12,naiveHotShardCpuPct:96.8,protectedHotShardCpuPct:28.2,naiveP99LatencyMs:1890,protectedP99LatencyMs:.92,annualOutageAndInfraSavingsUsd:382e4}};function v(t,a){const e=S[t],s=a==="xfetch-singleflight-resp3-nearcache",c=s?e.protectedDbPenetrationQueriesPerSec:e.naiveDbPenetrationQueriesPerSec,r=s?e.protectedHotShardCpuPct:e.naiveHotShardCpuPct,i=s?e.protectedP99LatencyMs:e.naiveP99LatencyMs,P=s?Number(((e.naiveDbPenetrationQueriesPerSec-e.protectedDbPenetrationQueriesPerSec)/e.naiveDbPenetrationQueriesPerSec*100).toFixed(3)):0;return{scenario:e,mode:a,effectiveDbQueriesPerSec:c,effectiveHotShardCpuPct:r,effectiveP99LatencyMs:i,dbStampedeReductionPct:P,zeroStampedePass:s&&c<=15&&r<=35,verdictBadge:s?`XFETCH + SINGLEFLIGHT + L1 LOCKED (${c} DB Query/s · ${r.toFixed(1)}% Shard CPU · ${i.toFixed(2)}ms p99)`:`CACHE STAMPEDE & HOT-SHARD MELTDOWN (${e.naiveDbPenetrationQueriesPerSec.toLocaleString("en-US")} DB Queries/s · ${e.naiveHotShardCpuPct.toFixed(1)}% CPU)`}}const y=document.querySelector("#app");let u="ttl-expiry-thundering-herd",h="xfetch-singleflight-resp3-nearcache";function f(){const t=v(u,h),a=t.scenario,e=h==="xfetch-singleflight-resp3-nearcache";y.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 395 · 184th Curated Workbench · Domain 5 (Redis/Valkey Cache Stampede, Hot-Key HeavyKeeper & XFetch Singleflight Video Studio)</span>
        <h1>分布式缓存 (Redis/Valkey) 防击穿雪崩：XFetch 概率早刷、Singleflight 与 L1 热点广播工作台</h1>
        <p class="wb-subtitle">终结 8.5万 QPS 热点 Key 在 TTL 过期瞬间引发 15,300 并发请求同时穿透打死底层数据库（Thundering Herd）、以及 42万 QPS 超级热点 Key 将单核 Redis 分片打满至 100% CPU 的痛点：结合 VLDB XFetch 概率早期异步重算、Singleflight 租约合并与 HeavyKeeper + RESP3 客户端 L1 缓存，将 DB 穿透压至 1 次/秒、P99 锁死 0.85ms（年省 +$3.46M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${t.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Cache Scenario and Protection Controls">
      <div class="control-group">
        <span class="control-label">1. 选择分布式缓存高压故障场景 (Cache Stampede & Hot-Key Scenario):</span>
        <div class="btn-row">
          ${Object.keys(S).map(s=>`
            <button type="button" class="scenario-btn ${u===s?"active":""}" data-scenario="${s}">
              ${S[s].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换缓存架构与并发合并策略 (Cache Architecture & Coalescing Mode):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="naive-hard-ttl-cache-aside">
            ❌ 传统基线：硬过期 Cache-Aside (TTL 归零瞬间万级请求穿透 DB + 单分片 100% CPU 饱和)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="xfetch-singleflight-resp3-nearcache">
            ✅ 推荐架构：XFetch 概率早期异步刷新 + Singleflight 协程合并 + HeavyKeeper RESP3 本地 L1
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Distributed Cache Resilience KPIs">
      <div class="kpi-card">
        <span class="kpi-title">TTL 过期窗口穿透 DB 并发查询数 (DB Stampede)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-db">${t.effectiveDbQueriesPerSec.toLocaleString("en-US")} query/s</strong>
        <span class="kpi-sub">消减 -${t.dbStampedeReductionPct.toFixed(3)}% · 对比基线 ${a.naiveDbPenetrationQueriesPerSec.toLocaleString("en-US")} 次/秒穿透</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">最热 Redis 主分片单核 CPU 负载 (Hot-Shard CPU)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-cpu">${t.effectiveHotShardCpuPct.toFixed(1)}%</strong>
        <span class="kpi-sub">${e?"HeavyKeeper 识别 + RESP3 L1 内存直读分流 94%":"CRC16 路由集中至单分片引发队列阻塞"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">缓存读取端到端 P99 延迟 (Read P99 Latency)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-latency">${t.effectiveP99LatencyMs.toFixed(2)} ms</strong>
        <span class="kpi-sub">入口总流量 ${a.incomingKeyQps.toLocaleString("en-US")} QPS · DB 重算耗时 ${a.dbRecomputeDurationMs} ms</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">年化规避雪崩停机与扩容净省 (Annual ROI)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${(a.annualOutageAndInfraSavingsUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">${a.workloadProfile.split(" (")[0]}</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>XFetch 概率早期重算 + Singleflight 请求合并漏斗 vs 64分片集群热点负载分布画布</h2>
          <span class="tag">${a.workloadProfile}</span>
        </div>
        <canvas id="cache-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>XFetch 算法、Singleflight 租约与 RESP3 审计明细 (Cache Architecture Audit)</h2>
        <ul class="audit-list">
          <li><span>热点业务画像与流量:</span> <strong>${a.workloadProfile}</strong></li>
          <li><span>底层 DB 聚合重算耗时 (Δ):</span> <strong>${a.dbRecomputeDurationMs} ms</strong></li>
          <li><span>TTL 到期瞬间 DB 穿透并发:</span> <strong>${a.naiveDbPenetrationQueriesPerSec.toLocaleString("en-US")} QPS → ${t.effectiveDbQueriesPerSec} QPS (-${t.dbStampedeReductionPct.toFixed(3)}%)</strong></li>
          <li><span>概率早期重算公式 (XFetch):</span> <strong><code>now - Δ · β · ln(rand()) ≥ expiry</code></strong></li>
          <li><span>热点 Key 探测与二级分流:</span> <strong>${e?"HeavyKeeper Top-K (10ms) + RESP3 BCAST 本地 L1 + 16路子分片":"无热点隔离 (Shard #14 100% CPU 锁死)"}</strong></li>
          <li><span>读取 P99 尾延迟优化:</span> <strong>${a.naiveP99LatencyMs.toFixed(1)} ms → ${t.effectiveP99LatencyMs.toFixed(2)} ms</strong></li>
          <li><span>年化规避大促宕机与 DB 扩容费:</span> <strong>+$${a.annualOutageAndInfraSavingsUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,b(),m(t)}function b(){document.querySelectorAll(".scenario-btn").forEach(t=>{t.addEventListener("click",()=>{u=t.dataset.scenario,f()})}),document.querySelectorAll(".mode-btn").forEach(t=>{t.addEventListener("click",()=>{h=t.dataset.mode,f()})})}function m(t){const a=document.querySelector("#cache-canvas");if(!a)return;const e=a.getContext("2d"),s=a.width,c=a.height,r=t.scenario,i=t.mode==="xfetch-singleflight-resp3-nearcache";e.fillStyle="#070b14",e.fillRect(0,0,s,c),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. TTL Expiry Window (180ms): Thundering Herd vs XFetch + Singleflight",22,26),[{label:`Incoming App Traffic: ${r.incomingKeyQps.toLocaleString("en-US")} QPS`,sub:i?"94% Served in 0.04ms by RESP3 Client L1 Near-Cache":"100% Hits Redis Shard #14 Over Network",color:"#38bdf8",y:48},{label:i?"XFetch Soft-TTL + Singleflight Lease Coalescer":"Hard TTL = 0.00s Cache Miss Cliff!",sub:i?"1 Background Worker Recomputes Ahead of Expiry; Others Read Stale-While-Revalidate":`${r.naiveDbPenetrationQueriesPerSec.toLocaleString("en-US")} Concurrent Workers Miss Simultaneously!`,color:i?"#10b981":"#ef4444",y:152},{label:i?`Primary Database Load: ${t.effectiveDbQueriesPerSec} Query/sec (8% CPU)`:`Primary Database Meltdown: ${r.naiveDbPenetrationQueriesPerSec.toLocaleString("en-US")} Queries/sec (100% CPU!)`,sub:i?"Zero Connection Pool Contention · 0.85ms p99":"Connection Pool Exhausted · 2,450ms Timeout Avalanche",color:i?"#34d399":"#ef4444",y:256}].forEach(n=>{e.fillStyle="#0f172a",e.strokeStyle=n.color,e.lineWidth=2,e.beginPath(),e.roundRect(22,n.y,382,82,10),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(n.label,36,n.y+30),e.fillStyle="#94a3b8",e.font="11px Inter, system-ui, sans-serif",e.fillText(n.sub,36,n.y+56)}),e.fillStyle=i?"#34d399":"#f87171",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(i?`✓ Eliminates -${t.dbStampedeReductionPct.toFixed(3)}% of Redundant DB Recomputations`:`✕ ${r.naiveDbPenetrationQueriesPerSec.toLocaleString("en-US")} Duplicate 180ms SQL Queries Crash Primary DB!`,22,376);const o=426;e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. Redis/Valkey Cluster Shard CPU Balance & HeavyKeeper L1 Shield",o,26),e.fillStyle="#0f172a",e.strokeStyle="rgba(148, 163, 184, 0.28)",e.lineWidth=1.5,e.beginPath(),e.roundRect(o,48,372,290,10),e.fill(),e.stroke(),e.fillStyle="#cbd5e1",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText("Single-Thread CPU Utilization Across Shards #11–#18",o+18,76);for(let n=0;n<8;n++){const l=o+24+n*42,d=n===3,g=i?20+n%3*2.3:d?r.naiveHotShardCpuPct:9.5,p=g/100*165;e.fillStyle=!i&&d?"#ef4444":"#10b981",e.fillRect(l,268-p,28,p),e.fillStyle="#94a3b8",e.font="10.5px Inter, system-ui, sans-serif",e.fillText(`S1${n+1}`,l+3,286),d&&(e.fillStyle=i?"#34d399":"#fca5a5",e.font="bold 10.5px Inter, system-ui, sans-serif",e.fillText(`${g.toFixed(0)}%`,l,262-p))}e.fillStyle="#94a3b8",e.font="11px Inter, system-ui, sans-serif",e.fillText("• HeavyKeeper Sketch + RESP3 CLIENT TRACKING BCAST Invalidation",o+18,318),e.fillStyle=i?"#34d399":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(i?`✓ Hot Shard #14 CPU Cut 100% → ${t.effectiveHotShardCpuPct.toFixed(1)}% · Saves +$${(r.annualOutageAndInfraSavingsUsd/1e6).toFixed(2)}M/yr`:`✕ Single Hot Key Pinpoints Shard #14 at ${r.naiveHotShardCpuPct.toFixed(1)}% CPU (${r.naiveP99LatencyMs}ms p99)!`,o+2,376)}f();
