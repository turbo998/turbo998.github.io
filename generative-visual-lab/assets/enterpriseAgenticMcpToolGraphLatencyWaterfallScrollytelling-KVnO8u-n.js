import"./modulepreload-polyfill-B5Qt9EMX.js";const g={"foundry-multi-agent-mcp-parallel-fanout":{id:"foundry-multi-agent-mcp-parallel-fanout",title:"Microsoft Foundry Orchestrator + 6 Parallel MCP Tool Servers (Fabric / Search / CRM)",titleZh:"Microsoft Foundry 编排器 + 6 路并发 MCP 工具服务（Fabric SQL / AI Search / CRM 关键路径高亮）",agentCount:7,mcpToolCalls:24,criticalPathSec:2.8},"self-healing-tool-retry-loop-unrolling":{id:"self-healing-tool-retry-loop-unrolling",title:"Agentic SQL/API Tool Retry & Fallback Time-Unrolled Swimlane (Zero Cyclic Hairball)",titleZh:"智能体 MCP 工具超时重试与降级回退时间展开泳道（消除力导向图环路乱麻）",agentCount:5,mcpToolCalls:18,criticalPathSec:3.4},"token-prefix-cache-miss-finops-audit":{id:"token-prefix-cache-miss-finops-audit",title:"Subagent Prompt Prefix-Cache Hit/Miss & Context Bloat Cost Waterfall",titleZh:"子智能体上下文膨胀与 Prefix-Cache 命中/穿透 Token 成本瀑布流审计",agentCount:9,mcpToolCalls:32,criticalPathSec:4.1}};function f(a,e,l){const t=Number(((l-1)*1.1).toFixed(1));return e==="otel-swimlane-dag-critical-path-gantt-scrollytelling"?{scenarioId:a,pipelineMode:e,criticalPathAttributionAccuracyPct:100,mttrReviewSpeedupPct:Number((59.2+t).toFixed(1)),tokenWasteReductionPct:64.2,compileTimeSec:1.3,annualSavingsUsdM:2.72,verdict:"Act automatically"}:e==="raw-json-trace-log-static-ppt"?{scenarioId:a,pipelineMode:e,criticalPathAttributionAccuracyPct:74.5,mttrReviewSpeedupPct:11,tokenWasteReductionPct:14,compileTimeSec:360,annualSavingsUsdM:.22,verdict:"Confirm"}:{scenarioId:a,pipelineMode:e,criticalPathAttributionAccuracyPct:50.8,mttrReviewSpeedupPct:8.4,tokenWasteReductionPct:6.5,compileTimeSec:12.4,annualSavingsUsdM:.05,verdict:"Send to a human"}}const h=document.querySelector("#app");if(!h)throw new Error("Missing #app root");let r="foundry-multi-agent-mcp-parallel-fanout",n="otel-swimlane-dag-critical-path-gantt-scrollytelling",p=3;function S(a){const e=a.getContext("2d");if(!e)return;const l=a.width,t=a.height;e.clearRect(0,0,l,t);const s=g[r],o=f(r,n,p),c=n==="naive-force-directed-spaghetti-graph",u=e.createLinearGradient(0,0,l,t);u.addColorStop(0,"#070b14"),u.addColorStop(1,"#1e1b4b"),e.fillStyle=u,e.fillRect(0,0,l,t),e.fillStyle="rgba(15, 23, 42, 0.92)",e.fillRect(16,14,l-32,46),e.strokeStyle=n==="otel-swimlane-dag-critical-path-gantt-scrollytelling"?"#10b981":"#ef4444",e.strokeRect(16,14,l-32,46),e.fillStyle="#38bdf8",e.font="bold 13px Inter, sans-serif",e.fillText(`264th Workbench (51st in Domain 5) · ${s.agentCount} Agents · ${s.mcpToolCalls} MCP Calls · Critical Path ${s.criticalPathSec}s`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Critical-Path Attribution: ${o.criticalPathAttributionAccuracyPct}% | Review Speedup: +${o.mttrReviewSpeedupPct}% | Token Waste Cut: -${o.tokenWasteReductionPct}%`,28,51);const m=[{title:"1. Time-Unrolled Agent Swimlane DAG (ELK.js)",detail:c?"⛔ Cyclic Retry Hairball (44.6% Edge Crossing Chaos)":`✓ ${s.agentCount}-Lane Left-to-Right DAG (0 Cyclic Hairballs)`,color:c?"#ef4444":"#10b981",x:36,y:84},{title:"2. Critical-Path Latency Gantt Waterfall",detail:c?"⛔ Hidden Straggler Span (49.2% Bottleneck Missed)":`✓ 100.0% Straggler Span Lock (${s.criticalPathSec}s P99 Path)`,color:c?"#ef4444":"#38bdf8",x:396,y:84},{title:"3. Prefix-Cache Hit vs. Context-Bloat Waterfall",detail:c?"⛔ Unattributed Subagent Prompt Token Explosion":`✓ Cached (#10B981) vs Uncached (#F59E0B) (-${o.tokenWasteReductionPct}% Cost)`,color:c?"#ef4444":"#a855f7",x:36,y:178},{title:"4. 60fps CTO Scrollytelling & Remotion Replay",detail:c?"⛔ Static Screenshot or 12,000-Line JSON Dump":`✓ Compiled in ${o.compileTimeSec}s (+$${o.annualSavingsUsdM}M/yr Saved)`,color:c?"#ef4444":"#f59e0b",x:396,y:178}];for(const i of m)e.save(),e.fillStyle="rgba(15, 23, 42, 0.9)",e.strokeStyle=i.color,e.lineWidth=2.2,e.beginPath(),e.roundRect(i.x,i.y,328,76,10),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, sans-serif",e.fillText(i.title,i.x+14,i.y+28),e.fillStyle=i.color,e.font="bold 11px JetBrains Mono, monospace",e.fillText(i.detail,i.x+14,i.y+54),e.restore();e.save(),e.fillStyle="#090d16",e.strokeStyle="#334155",e.beginPath(),e.roundRect(36,278,688,92,12),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 12px Inter, sans-serif",e.fillText(`Active OpenTelemetry gen_ai.* Trace Story: ${s.title} (Depth Level L${p})`,54,308),e.fillStyle="#6ee7b7",e.font="11px JetBrains Mono, monospace",e.fillText(c?"⛔ Force-Directed Node Graph: Tool Retries Collapse into Cyclic Spaghetti & Mask Latency Stragglers!":`✓ Time-Unrolled Swimlane DAG + Critical-Path Gantt + Token Prefix-Cache Waterfall (${o.compileTimeSec}s Compile)`,54,336),e.restore()}function d(){const a=g[r],e=f(r,n,p);h.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">264th Workbench (51st in Domain 5) · Agentic MCP Tool DAG, Latency Gantt &amp; Token Waterfall</span>
        <h1>企业多智能体 MCP 工具调用拓扑、关键路径延迟瀑布流与 Token 成本归因动态叙事沙盘</h1>
        <p class="subtitle">OpenTelemetry gen_ai.* 追踪解析 + 时间展开泳道 DAG（消除重试死循环乱麻）+ 关键路径 Gantt 高亮 + Prefix-Cache 成本瀑布流 vs 力导向乱麻图</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.criticalPathAttributionAccuracyPct}% Bottleneck Lock</span>
        <span class="metric-pill">-${e.tokenWasteReductionPct}% Token Waste</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 多智能体与 MCP 编排架构场景 (Multi-Agent MCP Scenario)</label>
        <select id="scenario-select">
          ${Object.values(g).map(t=>`<option value="${t.id}" ${t.id===r?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 架构可观测与高管叙事可视化管线 (Trace Visualization Stack)</label>
        <select id="mode-select">
          <option value="otel-swimlane-dag-critical-path-gantt-scrollytelling" ${n==="otel-swimlane-dag-critical-path-gantt-scrollytelling"?"selected":""}>✅ 时间展开泳道 DAG + 关键路径 Gantt 瀑布流 + Token 缓存归因双视图联动 (推荐)</option>
          <option value="naive-force-directed-spaghetti-graph" ${n==="naive-force-directed-spaghetti-graph"?"selected":""}>⛔ D3 力导向弹性球图 (工具重试形成自环毛线团，完全掩盖串行慢查询瓶颈)</option>
          <option value="raw-json-trace-log-static-ppt" ${n==="raw-json-trace-log-static-ppt"?"selected":""}>⚠️ 原始 JSON 日志截图 + 静态架构框图 (无法定位哪个子 Agent 破坏了 Prefix-Cache)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="depth-slider">3. 追踪展开粒度层级 (Trace Drill-Down Depth: <strong>Level ${p}</strong>)</label>
        <input id="depth-slider" type="range" min="1" max="3" step="1" value="${p}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>时间展开泳道 DAG、关键路径 Gantt 与 Token 缓存瀑布联动舞台 (Agentic MCP Stage)</h2>
          <span class="tag">${a.agentCount} Agents · ${a.mcpToolCalls} MCP Spans</span>
        </div>
        <canvas id="mcp-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>CTO 架构评审与多智能体 FinOps 遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">关键路径慢节点与缓存失效定位准确率</span>
            <strong class="kpi-value">${e.criticalPathAttributionAccuracyPct}%</strong>
            <span class="kpi-note">自动标红阻塞尾延迟的串行 MCP 工具调用</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">架构评审与故障复盘效率提升</span>
            <strong class="kpi-value">+${e.mttrReviewSpeedupPct}%</strong>
            <span class="kpi-note">拓扑泳道与时间轴瀑布 60fps 双向联动</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">子智能体冗余 Token 账单削减率</span>
            <strong class="kpi-value">-${e.tokenWasteReductionPct}%</strong>
            <span class="kpi-note">精准识别动态时间戳注入导致的 Prefix-Cache 失效</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">编译耗时 / 年化算力与排障净省</span>
            <strong class="kpi-value">${e.compileTimeSec.toFixed(1)}s · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">一键导出交互沙盘、Remotion 复盘视频与 PPTX</span>
          </div>
        </div>
      </aside>
    </main>
  `;const l=document.querySelector("#mcp-canvas");l&&S(l),document.querySelector("#scenario-select")?.addEventListener("change",t=>{r=t.target.value,d()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{n=t.target.value,d()}),document.querySelector("#depth-slider")?.addEventListener("input",t=>{p=Number(t.target.value),d()})}d();
