import"./modulepreload-polyfill-B5Qt9EMX.js";const f={"global-52x5-poison-pill-oom-quarantine":{id:"global-52x5-poison-pill-oom-quarantine",title:"52×5 Enterprise Matrix: 8K Unclamped Mask / Corrupt Codec Poison-Pill Quarantine",titleZh:"52×5 全域工作台矩阵：8K 显存炸弹与损坏编码“毒丸消息”2次速断隔离（防止连环击穿 16 台 GPU 节点）",failurePattern:"CUDA OOM / Segfault on Unclamped 8192×8192 Latent",remediationAction:"Pre-Queue Clamp + MaxDeliveryCount=2 Poison Quarantine",batchJobsK:270},"multistage-dag-idempotent-step-replay":{id:"multistage-dag-idempotent-step-replay",title:"5-Stage DAG (T2I → Relight → I2V → Dub → C2PA) Stage-Idempotent DLQ Replay",titleZh:"五阶视觉流水线死信重放：基于 job_id:stage_id 幂等账本仅重跑失败的第 4 阶段（0% 重复扣费）",failurePattern:"Step-4 Dubbing Timeout After Paid Step-3 Video API",remediationAction:"Skip Completed Stages 1–3 via SHA-256 Artifact Ledger",batchJobsK:180},"auto-tile-fp8-downshift-dlq-recovery":{id:"auto-tile-fp8-downshift-dlq-recovery",title:"VRAM OOM Dead-Letter Auto-Remediation via 512px Latent Tiling & FP8 Offload",titleZh:"死信队列 VRAM 溢出自动降级自愈：改写参数开启 512px 潜空间分块与 FP8 卸载重投成功",failurePattern:"80GB H100 VRAM Spike on 121-Frame 4K Video Batch",remediationAction:"Auto-Rewrite Payload to Causal 3D VAE Tiling + FP8",batchJobsK:150}};function g(a,e,i){const t=Number(((3-Math.min(3,i))*.2).toFixed(1));return e==="poison-quarantine-3class-remediation-idempotent-replay"?{scenarioId:a,routerMode:e,dominoCrashPreventionPct:100,autoDlqSelfHealingPct:Number((98.6+t).toFixed(1)),duplicateApiBillingPct:0,annualSavingsUsdM:3.94,verdict:"Act automatically"}:e==="manual-dlq-purge-from-step0-double-billing"?{scenarioId:a,routerMode:e,dominoCrashPreventionPct:92,autoDlqSelfHealingPct:45,duplicateApiBillingPct:34.6,annualSavingsUsdM:.24,verdict:"Confirm"}:{scenarioId:a,routerMode:e,dominoCrashPreventionPct:58.2,autoDlqSelfHealingPct:18.4,duplicateApiBillingPct:48.5,annualSavingsUsdM:.05,verdict:"Send to a human"}}const m=document.querySelector("#app");if(!m)throw new Error("Missing #app root");let d="global-52x5-poison-pill-oom-quarantine",o="poison-quarantine-3class-remediation-idempotent-replay",s=2;function v(a){const e=a.getContext("2d");if(!e)return;const i=a.width,t=a.height;e.clearRect(0,0,i,t);const c=f[d],r=g(d,o,s),n=o==="unbounded-retry-loop-worker-domino-crash",u=e.createLinearGradient(0,0,i,t);u.addColorStop(0,"#060911"),u.addColorStop(1,"#1e1b4b"),e.fillStyle=u,e.fillRect(0,0,i,t),e.fillStyle="rgba(15, 23, 42, 0.92)",e.fillRect(16,14,i-32,46),e.strokeStyle=o==="poison-quarantine-3class-remediation-idempotent-replay"?"#fbbf24":"#ef4444",e.strokeRect(16,14,i-32,46),e.fillStyle="#fbbf24",e.font="bold 13px Inter, sans-serif",e.fillText(`🏆 270th Milestone (3+7+52×5 = 270 Studios · 540 Guides!) · MaxDelivery=${s} · ${c.batchJobsK}K Jobs`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Domino-Crash Shield: ${r.dominoCrashPreventionPct}% | Auto DLQ Self-Heal: ${r.autoDlqSelfHealingPct}% | Duplicate API Re-Bill: ${r.duplicateApiBillingPct}%`,28,51);const b=[{title:`1. Poison-Pill Fast Quarantine (MaxDelivery = ${s})`,detail:n?"⛔ 1 Poison Job Crashes All 16 GPU Workers in Retry Loop!":`✓ 100.0% Worker Pool Shield (${c.failurePattern})`,color:n?"#ef4444":"#10b981",x:36,y:84},{title:"2. 3-Class DLQ Self-Healing Mutator",detail:n?"⛔ Unclassified Dead Letters Pile Up Until Disk Full":`✓ ${c.remediationAction} (${r.autoDlqSelfHealingPct}% Healed)`,color:n?"#ef4444":"#38bdf8",x:396,y:84},{title:"3. Stage-Idempotent DAG Replay Ledger",detail:n?"⛔ Re-Runs Paid Step 1-3 Video APIs (+48.5% Double Bill)":"✓ Resumes at Failed Stage k via job_id:stage_id (0.0% Re-Bill)",color:n?"#ef4444":"#a855f7",x:36,y:178},{title:"4. 270-Workbench (52×5) Production Queue FinOps",detail:n?"⛔ 41.8% Cluster Starvation During Nightly Batch Peaks":`✓ 540 Bilingual Guides Milestone (+$${r.annualSavingsUsdM}M/yr Saved)`,color:n?"#ef4444":"#fbbf24",x:396,y:178}];for(const l of b)e.save(),e.fillStyle="rgba(15, 23, 42, 0.9)",e.strokeStyle=l.color,e.lineWidth=2.2,e.beginPath(),e.roundRect(l.x,l.y,328,76,10),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, sans-serif",e.fillText(l.title,l.x+14,l.y+28),e.fillStyle=l.color,e.font="bold 11px JetBrains Mono, monospace",e.fillText(l.detail,l.x+14,l.y+54),e.restore();e.save(),e.fillStyle="#090d16",e.strokeStyle="#fbbf24",e.lineWidth=1.8,e.beginPath(),e.roundRect(36,278,688,92,12),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 12px Inter, sans-serif",e.fillText(`🏆 Historic 270th Milestone (3 Core + 7 Frontier + 52×5 = 270 Studios & 540 Bilingual Guides!): ${c.title}`,54,308),e.fillStyle="#6ee7b7",e.font="11px JetBrains Mono, monospace",e.fillText(n?"⛔ Unbounded Queue Retries: Malformed 8K Mask Triggers Domino CUDA OOM Across Entire Cluster!":`✓ Poison-Pill Quarantine + Auto-Tile/FP8 DLQ Mutator + Stage-Idempotent Replay (0.0% Duplicate Bill · +$${r.annualSavingsUsdM}M/yr)`,54,336),e.restore()}function p(){const a=f[d],e=g(d,o,s);m.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">🏆 Historic 270th Workbench Milestone (52×5 Balanced Matrix · 540 Bilingual Guides!)</span>
        <h1>🏆 第 270 个工作台里程碑（52×5 大满贯）：企业级 AIGC 异步队列死信治理（DLQ）、毒丸防崩与幂等重放总控台</h1>
        <p class="subtitle">全仓达成 270 个交互式工作台（3+7+52×5 五大业务域各满 52 个！）与 540 篇中英双语指南：毒丸消息 2 次速断隔离（100% 防多米诺雪崩）+ OOM 自动开启分块 VAE 自愈 + 阶段级幂等重放（0% 重复扣费）</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.dominoCrashPreventionPct}% Domino Shield</span>
        <span class="metric-pill">${e.duplicateApiBillingPct}% Re-Bill</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 异步批量队列故障与死信场景 (Async Queue &amp; DLQ Scenario)</label>
        <select id="scenario-select">
          ${Object.values(f).map(t=>`<option value="${t.id}" ${t.id===d?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 死信分诊、自愈降级与幂等重放架构 (DLQ Triage &amp; Replay Mode)</label>
        <select id="mode-select">
          <option value="poison-quarantine-3class-remediation-idempotent-replay" ${o==="poison-quarantine-3class-remediation-idempotent-replay"?"selected":""}>✅ 毒丸速断隔离 + OOM 自动分块降级自愈 + 阶段级幂等账本重放 (推荐)</option>
          <option value="unbounded-retry-loop-worker-domino-crash" ${o==="unbounded-retry-loop-worker-domino-crash"?"selected":""}>⛔ 默认无限重试未 ACK 消息 (1 条畸形 8K 请求连环打崩全部 16 台 GPU 节点)</option>
          <option value="manual-dlq-purge-from-step0-double-billing" ${o==="manual-dlq-purge-from-step0-double-billing"?"selected":""}>⚠️ 人工从第 0 步整单重推死信队列 (重复调用已成功的付费视频 API，多花 +34.6%)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="delivery-slider">3. 毒丸消息最大投递熔断阈值 (Max Delivery Count Before Quarantine: <strong>${s}</strong>)</label>
        <input id="delivery-slider" type="range" min="1" max="5" step="1" value="${s}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>52×5 毒丸速断隔离、三分类死信自愈与阶段幂等重放舞台 (270th Milestone Stage)</h2>
          <span class="tag">270 Studios · 540 Guides · ${a.batchJobsK}K Jobs</span>
        </div>
        <canvas id="dlq-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>第 270 项里程碑（52×5）队列可靠性遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">毒丸消息连环击穿 GPU 集群拦截率</span>
            <strong class="kpi-value">${e.dominoCrashPreventionPct}%</strong>
            <span class="kpi-note">预检张量边界 + 进程级崩溃计数速断</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">死信队列（DLQ）无人值守自动修复率</span>
            <strong class="kpi-value">${e.autoDlqSelfHealingPct}%</strong>
            <span class="kpi-note">VRAM OOM 自动改写开启 512px Tiled VAE</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">多阶段流水线重放重复扣费率</span>
            <strong class="kpi-value">${e.duplicateApiBillingPct}%</strong>
            <span class="kpi-note">直接复用前序已成功阶段 SHA-256 产物</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">全仓规模 / 年化避免雪崩与重跑净省</span>
            <strong class="kpi-value">270 项 · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">3 核心 + 7 前沿 + 52×5 五大业务域共 540 篇双语文档</span>
          </div>
        </div>
      </aside>
    </main>
  `;const i=document.querySelector("#dlq-canvas");i&&v(i),document.querySelector("#scenario-select")?.addEventListener("change",t=>{d=t.target.value,p()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{o=t.target.value,p()}),document.querySelector("#delivery-slider")?.addEventListener("input",t=>{s=Number(t.target.value),p()})}p();
