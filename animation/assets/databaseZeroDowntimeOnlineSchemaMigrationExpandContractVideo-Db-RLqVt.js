import"./modulepreload-polyfill-B5Qt9EMX.js";const d={"alter-column-type-240m":{id:"alter-column-type-240m",titleZh:"2.4亿行核心订单表字段类型升级（INT32→BIGINT 全表重写锁表 vs 影子列双写 + pgroll 视图平滑切换）",titleEn:"240M-Row Orders Table Column Type Widening (INT4→INT8 Full Table Rewrite vs Shadow Column + Dual Version Views)",tableNameAndRows:"core_payments.orders (240,000,000 Rows · 186 GB · 48,000 QPS)",liveTrafficQps:48e3,dangerousRawDdl:"ALTER TABLE orders ALTER COLUMN order_id TYPE BIGINT;",safeExpandContractPlan:"lock_timeout=150ms + Add order_id_v2 BIGINT + Dual-Write Trigger + 2,000-Row Throttled Backfill + View Swap",naiveMdlQueueBlockedQueries:192e3,naiveReplicationLagSec:420,safeReplicationLagMs:38,naiveOutageDurationMin:24,annualIncidentRiskAvoidedUsd:364e4},"add-not-null-foreign-key":{id:"add-not-null-foreign-key",titleZh:"1.8亿行账单表新增非空与外键约束（ACCESS EXCLUSIVE 排他锁排队雪崩 vs NOT VALID + VALIDATE 弱锁收口）",titleEn:"180M-Row Ledger Table NOT NULL & Foreign Key Addition (ACCESS EXCLUSIVE Lock Pile-Up vs NOT VALID + VALIDATE)",tableNameAndRows:"core_ledger.settlements (180,000,000 Rows · 142 GB · 36,000 QPS)",liveTrafficQps:36e3,dangerousRawDdl:"ALTER TABLE settlements ADD CONSTRAINT fk_acct FOREIGN KEY (acct_id) REFERENCES accounts(id);",safeExpandContractPlan:"ADD CONSTRAINT ... NOT VALID (150ms Lock Guard) + VALIDATE CONSTRAINT (SHARE UPDATE EXCLUSIVE Non-Blocking)",naiveMdlQueueBlockedQueries:144e3,naiveReplicationLagSec:185,safeReplicationLagMs:29,naiveOutageDurationMin:18,annualIncidentRiskAvoidedUsd:292e4},"create-composite-index-hot":{id:"create-composite-index-hot",titleZh:"高频鉴权会话表新建联合索引（裸 CREATE INDEX 阻塞全表写入 vs CONCURRENTLY + 慢查询 Blocker 预清理）",titleEn:"High-QPS Auth Session Composite Index (Blocking CREATE INDEX vs CONCURRENTLY + Long-Tx Blocker Pre-Eviction)",tableNameAndRows:"auth_gateway.sessions (95,000,000 Rows · 68 GB · 62,000 QPS)",liveTrafficQps:62e3,dangerousRawDdl:"CREATE INDEX idx_sess_tenant_exp ON sessions (tenant_id, expires_at);",safeExpandContractPlan:"Evict >2s Idle-in-Tx Blockers + CREATE INDEX CONCURRENTLY + IOPS-Throttled Parallel Workers",naiveMdlQueueBlockedQueries:248e3,naiveReplicationLagSec:260,safeReplicationLagMs:42,naiveOutageDurationMin:15,annualIncidentRiskAvoidedUsd:318e4}};function S(t,a){const e=d[t],s=a==="pgroll-expand-backfill-contract-guard",r=s?0:e.naiveMdlQueueBlockedQueries,l=s?3.8:3e4,i=s?e.safeReplicationLagMs:e.naiveReplicationLagSec*1e3;return{scenario:e,mode:a,effectiveBlockedQueriesCount:r,effectiveP99WriteLatencyMs:l,effectiveReplicationLagMs:i,dualVersionPodCoexistencePass:s,zeroDowntimeSlaPass:s&&r===0&&i<=100,verdictBadge:s?`ZERO-DOWNTIME EXPAND-CONTRACT LOCKED (0 Blocked QPS · 3.8ms p99 · ${e.safeReplicationLagMs}ms Replica Lag)`:`MDL LOCK QUEUE AVALANCHE (${e.naiveMdlQueueBlockedQueries.toLocaleString("en-US")} Blocked Queries · ${e.naiveOutageDurationMin}m Outage!)`}}const v=document.querySelector("#app");let u="alter-column-type-240m",f="pgroll-expand-backfill-contract-guard";function p(){const t=S(u,f),a=t.scenario,e=f==="pgroll-expand-backfill-contract-guard";v.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 385 · 174th Curated Workbench · Domain 5 (240M-Row Zero-Downtime Database Schema Migration & MDL Lock Guard Studio)</span>
        <h1>核心交易库 2.4亿行零停机在线 Schema 演进 (Expand-Contract) 与防锁表雪崩工作台</h1>
        <p class="wb-subtitle">终结研发直接提交裸 ALTER TABLE 遭遇 4.2秒慢查询阻塞引发 ACCESS EXCLUSIVE 元数据锁排队雪崩（3.5秒打爆万级连接池，停机 24 分钟损失 $1.45M）的痛点：通过 AST 门禁强制注入 lock_timeout=150ms、pgroll 双版本视图（v1/v2 Pod 零报错共存）与主从延迟感知限流回填（<45ms），年化规避事故损失 +$3.64M。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${t.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Migration Scenario and Pipeline Controls">
      <div class="control-group">
        <span class="control-label">1. 选择高并发大表 DDL 演进场景 (High-QPS Schema Evolution Scenario):</span>
        <div class="btn-row">
          ${Object.keys(d).map(s=>`
            <button type="button" class="scenario-btn ${u===s?"active":""}" data-scenario="${s}">
              ${d[s].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换数据库 Schema 变更执行管线 (Schema Migration Execution Mode):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="naive-blocking-alter-table">
            ❌ 传统基线：CI/CD 直接跑裸 ALTER TABLE (ACCESS EXCLUSIVE 锁队列打爆连接池 + 全表重写)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="pgroll-expand-backfill-contract-guard">
            ✅ 推荐架构：150ms 锁超时护栏 + Expand-Backfill-Contract 三阶段 + v1/v2 双视图零停机管线
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Database Schema Migration KPIs">
      <div class="kpi-card">
        <span class="kpi-title">元数据锁队列阻塞请求数 (MDL Blocked Queries)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-blocked">${t.effectiveBlockedQueriesCount.toLocaleString("en-US")} QPS</strong>
        <span class="kpi-sub">在线交易流量 ${a.liveTrafficQps.toLocaleString("en-US")} QPS · ${e?"lock_timeout=150ms 零阻塞":"排他锁大坝引发全站 503"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">变更期间写入 P99 延迟 (Write P99 Latency)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-latency">${e?`${t.effectiveP99WriteLatencyMs.toFixed(1)} ms`:"30,000 ms (Timeout)"}</strong>
        <span class="kpi-sub">${e?"v1 与 v2 Pod 通过版本视图同时无感读写":"HikariCP/PgBouncer 连接池 3.5秒耗尽"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">只读从库复制延迟峰值 (Replica Lag Peak)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-lag">${e?`${t.effectiveReplicationLagMs} ms`:`${a.naiveReplicationLagSec} s (Stale!)`}</strong>
        <span class="kpi-sub">${e?"2,000行/批动态限流回填严控 WAL 速率":"单事务全表重写阻塞从库回放线程"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">年化规避生产停机损失 (Annual Risk Avoided)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${(a.annualIncidentRiskAvoidedUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">彻底消除单次 ${a.naiveOutageDurationMin} 分钟 Sev-1 停机事故</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>PostgreSQL / MySQL 元数据锁队列 (MDL Queue) 与 Expand-Backfill-Contract 双视图架构画布</h2>
          <span class="tag">${a.tableNameAndRows}</span>
        </div>
        <canvas id="db-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>DDL 静态 AST 审计与三阶段迁移工单明细 (DDL AST & Backfill Audit)</h2>
        <ul class="audit-list">
          <li><span>目标生产核心表规模:</span> <strong>${a.tableNameAndRows}</strong></li>
          <li><span>高危裸 DDL 拦截语句:</span> <strong><code>${a.dangerousRawDdl}</code></strong></li>
          <li><span>推荐零停机演进方案:</span> <strong>${a.safeExpandContractPlan}</strong></li>
          <li><span>锁获取超时保护门禁:</span> <strong>${e?"SET lock_timeout = '150ms' (指数退避重试)":"无 lock_timeout (无限期挂起堵死后续请求)"}</strong></li>
          <li><span>滚动发布多版本兼容性:</span> <strong>${e?"schema_v1 与 schema_v2 视图并存 (支持秒级回滚)":"新旧代码字段冲突导致 500 报错"}</strong></li>
          <li><span>从库 WAL 复制延迟控制:</span> <strong>${a.naiveReplicationLagSec}s → ${a.safeReplicationLagMs}ms</strong></li>
          <li><span>年化规避 Sev-1 数据库停机损失:</span> <strong>+$${a.annualIncidentRiskAvoidedUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,E(),k(t)}function E(){document.querySelectorAll(".scenario-btn").forEach(t=>{t.addEventListener("click",()=>{u=t.dataset.scenario,p()})}),document.querySelectorAll(".mode-btn").forEach(t=>{t.addEventListener("click",()=>{f=t.dataset.mode,p()})})}function k(t){const a=document.querySelector("#db-canvas");if(!a)return;const e=a.getContext("2d"),s=a.width,r=a.height,l=t.scenario,i=t.mode==="pgroll-expand-backfill-contract-guard";e.fillStyle="#070b14",e.fillRect(0,0,s,r),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText(i?"1. Safe Expand-Backfill-Contract Pipeline: Zero Lock Queueing & Dual Schema Views (v1 / v2)":"1. Naive ALTER TABLE Avalanche: 4.2s Slow SELECT + Waiting ACCESS EXCLUSIVE Blocks 48,000 QPS!",22,26),e.fillStyle="#0f172a",e.strokeStyle=i?"rgba(16, 185, 129, 0.45)":"rgba(239, 68, 68, 0.55)",e.lineWidth=2,e.beginPath(),e.roundRect(22,40,776,156,10),e.fill(),e.stroke(),i?([{title:"v1 App Pods (Canary 80%)",sub:"Reads/Writes View v1_orders (INT4)",x:38,color:"#38bdf8"},{title:"v2 App Pods (Canary 20%)",sub:"Reads/Writes View v2_orders (INT8)",x:288,color:"#10b981"},{title:"Physical Table + Dual-Write Trigger",sub:"col_v1 + col_v2 (2k-row throttled backfill)",x:538,color:"#a855f7"}].forEach(o=>{e.fillStyle="#162033",e.strokeStyle=o.color,e.lineWidth=2,e.beginPath(),e.roundRect(o.x,60,236,90,8),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(o.title,o.x+12,90),e.fillStyle="#94a3b8",e.font="11px Inter, system-ui, sans-serif",e.fillText(o.sub,o.x+12,118)}),e.fillStyle="#34d399",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText("✓ lock_timeout='150ms' Retry Loop + Dual Schema Views: 0 Blocked Queries · Instant Zero-Data-Loss Rollback",38,180)):(e.fillStyle="rgba(245, 158, 11, 0.25)",e.strokeStyle="#f59e0b",e.beginPath(),e.roundRect(38,64,196,86,8),e.fill(),e.stroke(),e.fillStyle="#fef08a",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText("1. Slow BI Report SELECT",50,92),e.fillStyle="#cbd5e1",e.font="11px Inter, system-ui, sans-serif",e.fillText("Holds ACCESS SHARE (4.2s)",50,114),e.fillStyle="rgba(239, 68, 68, 0.35)",e.strokeStyle="#ef4444",e.lineWidth=2.5,e.beginPath(),e.roundRect(256,56,224,102,8),e.fill(),e.stroke(),e.fillStyle="#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText("2. WAITING ALTER TABLE (DAM)",268,86),e.fillStyle="#f8fafc",e.font="11px Inter, system-ui, sans-serif",e.fillText("Requests ACCESS EXCLUSIVE",268,110),e.fillText("No lock_timeout → Blocks Queue!",268,132),e.fillStyle="rgba(239, 68, 68, 0.22)",e.strokeStyle="#f87171",e.beginPath(),e.roundRect(502,64,278,86,8),e.fill(),e.stroke(),e.fillStyle="#f87171",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(`3. ${l.naiveMdlQueueBlockedQueries.toLocaleString("en-US")} Blocked OLTP Queries!`,514,92),e.fillStyle="#cbd5e1",e.font="11px Inter, system-ui, sans-serif",e.fillText("Connection pool exhausted in 3.5s → HTTP 503",514,118),e.fillStyle="#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(`✕ Even a fast metadata DDL causes a ${l.naiveOutageDurationMin}-minute Sev-1 outage when queued behind an active transaction!`,38,180)),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. Three-Phase Expand → Adaptive Backfill (Replica Lag < 45ms) → Contract State Machine",22,224);const g=[{name:"Phase 1: EXPAND (150ms Lock Guard)",desc:"Add nullable shadow column + Dual-Write Trigger + v2 View",w:244,color:"#38bdf8"},{name:"Phase 2: ADAPTIVE BACKFILL",desc:`Batch 2,000 rows · Pause if Replica Lag > 50ms (Actual ${l.safeReplicationLagMs}ms)`,w:268,color:"#10b981"},{name:"Phase 3: CONTRACT & VALIDATE",desc:"ADD CONSTRAINT NOT VALID + VALIDATE & Drop v1 View",w:244,color:"#a855f7"}];let c=22;g.forEach(n=>{e.fillStyle=i?"rgba(15, 23, 42, 0.92)":"rgba(239, 68, 68, 0.15)",e.strokeStyle=i?n.color:"#ef4444",e.lineWidth=2,e.beginPath(),e.roundRect(c,240,n.w,108,10),e.fill(),e.stroke(),e.fillStyle=i?n.color:"#f87171",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(n.name,c+14,272),e.fillStyle="#cbd5e1",e.font="11px Inter, system-ui, sans-serif",e.fillText(n.desc.slice(0,38),c+14,300),e.fillText(n.desc.slice(38),c+14,320),c+=n.w+10}),e.fillStyle=i?"#34d399":"#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(i?`✓ CI/CD AST Gate blocks unsafe raw DDL & compiles 12s CTO CAB review video (+$${(l.annualIncidentRiskAvoidedUsd/1e6).toFixed(2)}M/yr risk avoided)`:`✕ Full-table rewrite spikes replica lag to ${l.naiveReplicationLagSec}s and drops ${l.naiveMdlQueueBlockedQueries.toLocaleString("en-US")} live customer requests`,22,380)}p();
