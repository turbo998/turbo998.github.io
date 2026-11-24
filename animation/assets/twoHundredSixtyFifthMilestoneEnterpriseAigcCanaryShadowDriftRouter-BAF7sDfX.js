import"./modulepreload-polyfill-B5Qt9EMX.js";const p={"global-51x5-model-upgrade-shadow-canary":{id:"global-51x5-model-upgrade-shadow-canary",title:"51×5 Enterprise Matrix: Veo 3.0 → 3.1 & GPT-Image-1.5 → 1.6 Async 1% Shadow Canary",titleZh:"51×5 全域工作台矩阵：Veo 3.0→3.1 与 GPT-Image 跨版本升级 1% 异步影子流量与 120 黄金题库门禁",candidateUpgrade:"Veo 3.0 → 3.1 / Flux.1-dev v1.2",goldenSetPrompts:120,rollbackSlaMs:180},"fp16-to-fp8-quantization-drift-guard":{id:"fp16-to-fp8-quantization-drift-guard",title:"AKS Self-Hosted Wan 2.2 / Flux BF16 → FP8 E4M3 Quantized Kernel Parity Gate",titleZh:"AKS 自建 Wan 2.2 / Flux 从 BF16 切至 FP8 E4M3 量化算子（ΔE00 ≤ 1.2 & DINOv2 ≥ 0.97 门禁）",candidateUpgrade:"Wan 2.2 BF16 → FP8 SageAttention2",goldenSetPrompts:120,rollbackSlaMs:165},"lora-adapter-version-swap-circuit-breaker":{id:"lora-adapter-version-swap-circuit-breaker",title:"Multi-Tenant Brand LoRA v4 → v5 Hot-Swap with 180ms Drift Circuit Breaker",titleZh:"多租户品牌 LoRA v4→v5 热更新（触发强度漂移超标 180ms 熔断秒切回稳态版本）",candidateUpgrade:"Brand-LoRA v4.2 → v5.0 SafeTensors",goldenSetPrompts:120,rollbackSlaMs:150}};function v(a,e,l){const t=Math.max(.5,Math.min(5,Number((l*.1).toFixed(1))));return e==="async-1pct-shadow-golden120-auto-rollback-gateway"?{scenarioId:a,routerMode:e,silentDriftInterceptionPct:100,productionZeroDowntimeSlaPct:99.99,shadowEvalOverheadPct:t,rollbackLatencyMs:p[a].rollbackSlaMs,annualSavingsUsdM:3.68,verdict:"Act automatically"}:e==="sync-100pct-dual-run-double-gpu-bill"?{scenarioId:a,routerMode:e,silentDriftInterceptionPct:99.5,productionZeroDowntimeSlaPct:98.2,shadowEvalOverheadPct:100,rollbackLatencyMs:2400,annualSavingsUsdM:.18,verdict:"Confirm"}:{scenarioId:a,routerMode:e,silentDriftInterceptionPct:61.6,productionZeroDowntimeSlaPct:84.5,shadowEvalOverheadPct:0,rollbackLatencyMs:18e5,annualSavingsUsdM:.04,verdict:"Send to a human"}}const g=document.querySelector("#app");if(!g)throw new Error("Missing #app root");let c="global-51x5-model-upgrade-shadow-canary",r="async-1pct-shadow-golden120-auto-rollback-gateway",s=10;function S(a){const e=a.getContext("2d");if(!e)return;const l=a.width,t=a.height;e.clearRect(0,0,l,t);const u=p[c],o=v(c,r,h()),i=r==="blind-100pct-cutover-silent-brand-drift",f=e.createLinearGradient(0,0,l,t);f.addColorStop(0,"#060911"),f.addColorStop(1,"#1e1b4b"),e.fillStyle=f,e.fillRect(0,0,l,t),e.fillStyle="rgba(15, 23, 42, 0.92)",e.fillRect(16,14,l-32,46),e.strokeStyle=r==="async-1pct-shadow-golden120-auto-rollback-gateway"?"#fbbf24":"#ef4444",e.strokeRect(16,14,l-32,46),e.fillStyle="#fbbf24",e.font="bold 13px Inter, sans-serif",e.fillText(`🏆 265th Milestone (3+7+51×5 = 265 Studios · 530 Guides!) · ${u.candidateUpgrade} · Canary ${s}%`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Silent Drift Interception: ${o.silentDriftInterceptionPct}% | Upgrade SLA: ${o.productionZeroDowntimeSlaPct}% | Shadow Overhead: +${o.shadowEvalOverheadPct}% | Rollback: ${o.rollbackLatencyMs}ms`,28,51);const b=[{title:"1. 1% Async Shadow-Traffic Mirror & 120 Golden Set",detail:i?"⛔ 0% Pre-Cutover Validation (38.4% Silent Brand Drift!)":`✓ Non-Blocking ${o.shadowEvalOverheadPct}% Shadow Fork + ${u.goldenSetPrompts} Golden Prompts`,color:i?"#ef4444":"#10b981",x:36,y:84},{title:"2. 4-Metric VLM/Signal Regression Gate",detail:i?"⛔ Undetected Kelvin Shift & LoRA Over-Saturation":"✓ DINOv2 ≥ 0.97 | ArcFace ≥ 0.94 | OCR ≥ 99.5% | ΔE00 ≤ 1.2",color:i?"#ef4444":"#38bdf8",x:396,y:84},{title:`3. Progressive Canary Weight (${s}% Candidate)`,detail:i?"⛔ 100% Big-Bang Cutover Breaks Live E-Commerce Jobs":"✓ 1% → 10% → 50% → 100% Automated Promotion Gate",color:i?"#ef4444":"#a855f7",x:36,y:178},{title:"4. 180ms Circuit-Breaker Rollback & 51×5 Hub",detail:i?"⛔ 30-Minute Manual Incident Rollback Outage":`✓ ${o.rollbackLatencyMs}ms Instant Pointer Flip (+$${o.annualSavingsUsdM}M/yr Saved)`,color:i?"#ef4444":"#fbbf24",x:396,y:178}];for(const n of b)e.save(),e.fillStyle="rgba(15, 23, 42, 0.9)",e.strokeStyle=n.color,e.lineWidth=2.2,e.beginPath(),e.roundRect(n.x,n.y,328,76,10),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, sans-serif",e.fillText(n.title,n.x+14,n.y+28),e.fillStyle=n.color,e.font="bold 11px JetBrains Mono, monospace",e.fillText(n.detail,n.x+14,n.y+54),e.restore();e.save(),e.fillStyle="#090d16",e.strokeStyle="#fbbf24",e.lineWidth=1.8,e.beginPath(),e.roundRect(36,278,688,92,12),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 12px Inter, sans-serif",e.fillText(`🏆 Historic 265th Milestone (3 Core + 7 Frontier + 51×5 = 265 Studios & 530 Bilingual Guides!): ${u.title}`,54,308),e.fillStyle="#6ee7b7",e.font="11px JetBrains Mono, monospace",e.fillText(i?"⛔ Blind 100% Model Cutover: 38.4% Silent Prompt/Color Regression & 30-Minute Manual Rollback!":`✓ 100.0% Silent Drift Interception + 99.99% Upgrade SLA + ${o.rollbackLatencyMs}ms Auto-Rollback (+$${o.annualSavingsUsdM}M/yr)`,54,336),e.restore()}function h(){return s}function d(){const a=p[c],e=v(c,r,s);g.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">🏆 Historic 265th Workbench Milestone (51×5 Balanced Matrix · 530 Bilingual Guides!)</span>
        <h1>🏆 第 265 个工作台里程碑（51×5 大满贯）：企业级视觉与视频大模型版本升级 1% 异步影子流量对标与零停机自动回滚网关</h1>
        <p class="subtitle">全仓达成 265 个交互式工作台（3+7+51×5 五大业务域各满 51 个！）与 530 篇中英双语指南：1% 异步影子流量复制 + 120 黄金提示词四维回归门禁 + 180ms 漂移自动熔断回滚</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.silentDriftInterceptionPct}% Drift Caught</span>
        <span class="metric-pill">${e.rollbackLatencyMs}ms Rollback</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 模型版本升级与量化变更场景 (Model Upgrade / Quantization Scenario)</label>
        <select id="scenario-select">
          ${Object.values(p).map(t=>`<option value="${t.id}" ${t.id===c?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 模型升级灰度与回归验证网关策略 (Canary &amp; Shadow Evaluation Mode)</label>
        <select id="mode-select">
          <option value="async-1pct-shadow-golden120-auto-rollback-gateway" ${r==="async-1pct-shadow-golden120-auto-rollback-gateway"?"selected":""}>✅ 1% 异步影子流量 + 120 黄金题库四维门禁 + 180ms 自动熔断回滚 (推荐)</option>
          <option value="blind-100pct-cutover-silent-brand-drift" ${r==="blind-100pct-cutover-silent-brand-drift"?"selected":""}>⛔ 直接 100% 切流上线新模型版本 (38.4% 静默色温/LoRA 漂移导致线上事故)</option>
          <option value="sync-100pct-dual-run-double-gpu-bill" ${r==="sync-100pct-dual-run-double-gpu-bill"?"selected":""}>⚠️ 100% 全量同步双跑新旧模型 (+100% 双倍算力账单，尾延迟被慢模型拖垮)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="canary-slider">3. 灰度金丝雀放量比例 (Canary Traffic Weight: <strong>${s}%</strong>)</label>
        <input id="canary-slider" type="range" min="1" max="50" step="1" value="${s}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>51×5 模型升级异步影子对标、四维回归门禁与 180ms 熔断舞台 (265th Milestone Stage)</h2>
          <span class="tag">265 Studios · 530 Guides · ${a.goldenSetPrompts} Golden Set</span>
        </div>
        <canvas id="canary-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>第 265 项里程碑（51×5）金丝雀治理遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">模型升级静默视觉退化拦截率</span>
            <strong class="kpi-value">${e.silentDriftInterceptionPct}%</strong>
            <span class="kpi-note">DINOv2 / ArcFace / OCR / ΔE00 四锁齐备</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">生产管线零停机升级可用性 SLA</span>
            <strong class="kpi-value">${e.productionZeroDowntimeSlaPct}%</strong>
            <span class="kpi-note">异步旁路评测零阻塞主链路 P99 延迟</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">影子评测算力开销 / 熔断回滚耗时</span>
            <strong class="kpi-value">+${e.shadowEvalOverheadPct}% · ${e.rollbackLatencyMs}ms</strong>
            <span class="kpi-note">对比全量同步双跑节省 99% 评测算力</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">全仓规模 / 年化避免事故与双跑净省</span>
            <strong class="kpi-value">265 项 · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">3 核心 + 7 前沿 + 51×5 五大业务域均衡矩阵</span>
          </div>
        </div>
      </aside>
    </main>
  `;const l=document.querySelector("#canary-canvas");l&&S(l),document.querySelector("#scenario-select")?.addEventListener("change",t=>{c=t.target.value,d()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{r=t.target.value,d()}),document.querySelector("#canary-slider")?.addEventListener("input",t=>{s=Number(t.target.value),d()})}d();
