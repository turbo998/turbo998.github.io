import"./modulepreload-polyfill-B5Qt9EMX.js";const u={"fabric-onelake-directlake-rag-freshness-sla":{id:"fabric-onelake-directlake-rag-freshness-sla",title:"Microsoft Fabric OneLake Bronze-Silver-Gold to DirectLake BI & AI Foundry Vector Index",titleZh:"Microsoft Fabric OneLake 铜/银/金三层湖仓至 DirectLake 报表与 Foundry 向量索引端到端新鲜度水位线",freshnessSlaMin:5,medallionTables:142,downstreamConsumers:"DirectLake Semantic Model + AI Search Vector RAG"},"upstream-cdc-schema-evolution-quarantine":{id:"upstream-cdc-schema-evolution-quarantine",title:"Bronze-to-Silver Breaking Schema Evolution Quarantine & Zero-Downtime Backfill",titleZh:"上游 CDC 字段类型破坏性变更（STRING→STRUCT）在 Silver 层自动分流死信隔离与零停机回填",freshnessSlaMin:10,medallionTables:186,downstreamConsumers:"Gold Executive P&L Star Schema + SQL Agent"},"cross-domain-data-mesh-contract-sla-audit":{id:"cross-domain-data-mesh-contract-sla-audit",title:"Multi-Domain Data Mesh Data-Product Contract & Watermark Lag Attribution",titleZh:"跨域数据网格（Data Mesh）数据产品契约（ODCS v3）与跨层延迟归因瀑布流",freshnessSlaMin:15,medallionTables:224,downstreamConsumers:"6 Enterprise Domain Data Products + FinOps Ledger"}};function S(i,e,t){const a=Number(((15-Math.min(15,t))*.25).toFixed(1));return e==="openlineage-delta-ast-watermark-contract-scrollytelling"?{scenarioId:i,pipelineMode:e,slaSchemaDriftVisibilityPct:100,downstreamOutageReductionPct:82.4,cdoReviewSpeedupPct:Number((56.6+a).toFixed(1)),compileTimeSec:1.4,annualSavingsUsdM:2.68,verdict:"Act automatically"}:e==="static-powerpoint-medallion-boxes"?{scenarioId:i,pipelineMode:e,slaSchemaDriftVisibilityPct:51.2,downstreamOutageReductionPct:12,cdoReviewSpeedupPct:6.5,compileTimeSec:480,annualSavingsUsdM:.16,verdict:"Confirm"}:{scenarioId:i,pipelineMode:e,slaSchemaDriftVisibilityPct:58.6,downstreamOutageReductionPct:18.5,cdoReviewSpeedupPct:-12,compileTimeSec:15.8,annualSavingsUsdM:.03,verdict:"Send to a human"}}const g=document.querySelector("#app");if(!g)throw new Error("Missing #app root");let c="fabric-onelake-directlake-rag-freshness-sla",o="openlineage-delta-ast-watermark-contract-scrollytelling",s=5;function v(i){const e=i.getContext("2d");if(!e)return;const t=i.width,a=i.height;e.clearRect(0,0,t,a);const m=u[c],r=S(c,o,s),n=o==="unverified-llm-medallion-diagram-redraw",p=e.createLinearGradient(0,0,t,a);p.addColorStop(0,"#070b14"),p.addColorStop(1,"#1e1b4b"),e.fillStyle=p,e.fillRect(0,0,t,a),e.fillStyle="rgba(15, 23, 42, 0.92)",e.fillRect(16,14,t-32,46),e.strokeStyle=o==="openlineage-delta-ast-watermark-contract-scrollytelling"?"#10b981":"#ef4444",e.strokeRect(16,14,t-32,46),e.fillStyle="#38bdf8",e.font="bold 13px Inter, sans-serif",e.fillText(`274th Workbench (53rd in Domain 5) · ${m.medallionTables} Delta/Iceberg Tables · SLA ≤ ${s}m`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`SLA & Schema-Drift Lock: ${r.slaSchemaDriftVisibilityPct}% | Downstream Outage Cut: -${r.downstreamOutageReductionPct}% | CDO Speedup: +${r.cdoReviewSpeedupPct}%`,28,51);const f=[{title:"1. Bronze Ingest & CDC Event-Time Watermark",detail:n?"⛔ Hallucinated Table Names & Missing CDC Lag!":`✓ OpenLineage + _delta_log Commit Timestamp (≤${s}m)`,color:n?"#ef4444":"#f59e0b",x:36,y:84},{title:"2. Silver Schema-Contract Gate & Quarantine",detail:n?"⛔ Breaking Type Change Corrupts Gold Star Schema":`✓ ODCS v3 Schema Guard (-${r.downstreamOutageReductionPct}% Gold Outages)`,color:n?"#ef4444":"#38bdf8",x:396,y:84},{title:"3. Gold Semantic Layer & AI Foundry RAG Sync",detail:n?"⛔ Silent 18-Hour Stale Vector Index & BI Drift":`✓ ${m.downstreamConsumers} (100% Parity)`,color:n?"#ef4444":"#10b981",x:36,y:178},{title:"4. 60fps CDO Scrollytelling & Remotion Export",detail:n?"⛔ -12.0% Slower Review Due to Broken Lineage Edges":`✓ Compiled in ${r.compileTimeSec}s (+$${r.annualSavingsUsdM}M/yr Saved)`,color:n?"#ef4444":"#a855f7",x:396,y:178}];for(const l of f)e.save(),e.fillStyle="rgba(15, 23, 42, 0.9)",e.strokeStyle=l.color,e.lineWidth=2.2,e.beginPath(),e.roundRect(l.x,l.y,328,76,10),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, sans-serif",e.fillText(l.title,l.x+14,l.y+28),e.fillStyle=l.color,e.font="bold 11px JetBrains Mono, monospace",e.fillText(l.detail,l.x+14,l.y+54),e.restore();e.save(),e.fillStyle="#090d16",e.strokeStyle="#334155",e.beginPath(),e.roundRect(36,278,688,92,12),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 12px Inter, sans-serif",e.fillText(`Active Medallion & AI Freshness Story: ${m.title} (SLA Budget ≤ ${s} min)`,54,308),e.fillStyle="#6ee7b7",e.font="11px JetBrains Mono, monospace",e.fillText(n?"⛔ Freeform LLM Medallion Diagram: Invents Fake Table Joins & Misses Stalled Silver Compaction!":`✓ OpenLineage + _delta_log Watermark Propagation + ODCS v3 Schema Quarantine (${r.compileTimeSec}s Compile)`,54,336),e.restore()}function d(){const i=u[c],e=S(c,o,s);g.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">274th Workbench (53rd in Domain 5) · Lakehouse Medallion SLA Watermark &amp; Schema Quarantine</span>
        <h1>企业数据湖仓（Fabric OneLake / Databricks Medallion）新鲜度水位线、Schema 漂移熔断与动态叙事沙盘</h1>
        <p class="subtitle">OpenLineage + _delta_log 事务日志解析 + 铜/银/金/AI 四层事件时间水位线（100% 暴露滞后瓶颈）+ ODCS v3 破坏性字段隔离 vs 静态三层方框图</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.slaSchemaDriftVisibilityPct}% SLA Visibility</span>
        <span class="metric-pill">-${e.downstreamOutageReductionPct}% Outages</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 企业数据湖仓与 AI 知识底座场景 (Lakehouse Medallion Scenario)</label>
        <select id="scenario-select">
          ${Object.values(u).map(a=>`<option value="${a.id}" ${a.id===c?"selected":""}>${a.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 湖仓血缘、水位线与契约可视化管线 (Medallion Visualization Stack)</label>
        <select id="mode-select">
          <option value="openlineage-delta-ast-watermark-contract-scrollytelling" ${o==="openlineage-delta-ast-watermark-contract-scrollytelling"?"selected":""}>✅ OpenLineage + _delta_log 水位线 + ODCS 契约熔断动态沙盘 (推荐)</option>
          <option value="unverified-llm-medallion-diagram-redraw" ${o==="unverified-llm-medallion-diagram-redraw"?"selected":""}>⛔ 让 LLM 凭空画湖仓架构图 (41.4% 漏画死信隔离表并编造不存在的 Gold 视图)</option>
          <option value="static-powerpoint-medallion-boxes" ${o==="static-powerpoint-medallion-boxes"?"selected":""}>⚠️ 传统静态三层 PPT 概念图 (48.8% 无法解释为何高管看板与 RAG 向量库滞后 18 小时)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="sla-slider">3. 端到端数据新鲜度 SLA 预算 (End-to-End Freshness SLA: <strong>≤ ${s} min</strong>)</label>
        <input id="sla-slider" type="range" min="3" max="15" step="2" value="${s}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>Bronze→Silver→Gold→AI 四层水位线与 Schema 死信隔离舞台 (Medallion Stage)</h2>
          <span class="tag">${i.medallionTables} Tables · SLA ≤ ${s}m</span>
        </div>
        <canvas id="medallion-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>CDO 数据治理与 AI 知识鲜度遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">跨层水位线滞后与 Schema 漂移定位率</span>
            <strong class="kpi-value">${e.slaSchemaDriftVisibilityPct}%</strong>
            <span class="kpi-note">直接绑定 _delta_log 与 Iceberg 快照时间戳</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">下游高管报表与 AI RAG 脏数据事故削减</span>
            <strong class="kpi-value">-${e.downstreamOutageReductionPct}%</strong>
            <span class="kpi-note">Silver 层契约门禁自动分流异常列至隔离表</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">CDO / 数据架构委员会评审效率提升</span>
            <strong class="kpi-value">${e.cdoReviewSpeedupPct>=0?"+":""}${e.cdoReviewSpeedupPct}%</strong>
            <span class="kpi-note">点击 Gold 指标一键回溯上游 CDC 延迟根因</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">编译耗时 / 年化数据停摆规避净省</span>
            <strong class="kpi-value">${e.compileTimeSec.toFixed(1)}s · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">同步导出 60fps 交互沙盘、Remotion 视频与 PPTX</span>
          </div>
        </div>
      </aside>
    </main>
  `;const t=document.querySelector("#medallion-canvas");t&&v(t),document.querySelector("#scenario-select")?.addEventListener("change",a=>{c=a.target.value,d()}),document.querySelector("#mode-select")?.addEventListener("change",a=>{o=a.target.value,d()}),document.querySelector("#sla-slider")?.addEventListener("input",a=>{s=Number(a.target.value),d()})}d();
