import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"steady-hybrid-enterprise":{id:"steady-hybrid-enterprise",titleZh:"常态化企业视觉中台（月消耗 18,000 H100 GPU 小时 · 34GB Flux.1/Wan2.1 容器）",titleEn:"Steady Enterprise Visual Hub (18,000 H100 GPU-Hrs/Mo · 34GB Flux.1/Wan 2.1 Weights)",subtitleZh:"对比“纯 Serverless API 高溢价或传统 K8s HPA 标准拉镜像（34GB 冷启动 265秒、闲置率 66%）”与“AKS KEDA 队列深度伸缩 + Dragonfly P2P 块流式加载 + NVMe mmap（冷启动 6.8秒、利用率 88.5%）”",subtitleEn:"Compares Pure Serverless API / Naive K8s HPA Standard Image Pull (265s cold start, 34% utilization) vs. AKS KEDA Queue Scaler + Dragonfly P2P + NVMe mmap (6.8s cold start, 88.5% utilization)",monthlyGpuHours:18e3,modelWeightSizeGb:34,controlledStack:"30% Reserved Base + 60% KEDA Spot + Dragonfly P2P + NVMe mmap + 10% Serverless Burst ($1.42/hr)",naiveStack:"Un-Optimized On-Demand K8s HPA (34% Util) or Pure Serverless GPU Markup ($4.50/hr Effective)",controlledColdStartSec:6.8,naiveColdStartSec:265,controlledGpuUtilizationPct:88.5,naiveGpuUtilizationPct:34,controlledHourlyEffectiveRateUsd:1.42,naiveHourlyEffectiveRateUsd:4.5,controlledAnnualTcoM:1.01,naiveAnnualTcoM:3.19,annualSavingsM:2.18,decisionSummaryZh:"全仓达成第 205 项工作台里程碑（3+7+39×5 = 205）！为什么很多企业把 ComfyUI / Wan 2.1 搬上 Kubernetes 后反而比用 SaaS 还贵？因为 34GB 的视频/图像模型用普通 Docker Pull 拉取需要 265 秒（4.4分钟），为了怕冷启动超时，运维被迫 24 小时常驻大批昂贵的按需 H100 节点，夜间闲置率高达 66%！通过“KEDA 监听 Redis/ServiceBus 队列深度预判扩容 + Dragonfly P2P / Nydus 按需流式挂载镜像 + 宿主机本地 NVMe RAID0 缓存 safetensors 并用 `mmap(MAP_SHARED)` 零拷贝灌入显存”，34GB 模型冷启动从 265 秒骤降至 6.8 秒（快 39 倍），集群 GPU 有效利用率达 88.5%，年省 +$2.18M（-68.4% TCO）。",decisionSummaryEn:"Crowning our 205th Workbench Milestone (3+7+39×5 = 205)! Standard Kubernetes HPA fails on 34GB AIGC containers because sequential OCI image pulls take 265 seconds (4.4 min), forcing ops teams to over-provision idle 24/7 H100 nodes (34% utilization). Combining KEDA queue-depth scaling, Dragonfly P2P / Nydus chunk streaming, and local NVMe RAID0 safetensors `mmap` slashes 34GB cold start to 6.8s (39x faster), lifts GPU utilization to 88.5%, and saves +$2.18M/yr (-68.4% TCO).",stages:[{stage:"1. Queue-Depth Predictive Scaling",controlledEngine:"KEDA ScaledObject on ServiceBus/Redis Queue Lag (<3s Trigger)",naiveBehavior:"K8s HPA on GPU/CPU % (Reacts Only After Queue Explodes)",metricImpact:"Zero HTTP 504 Queue Timeouts"},{stage:"2. P2P Container & Weight Distribution",controlledEngine:"Dragonfly P2P + Nydus RAFS Lazy Chunk Streaming",naiveBehavior:"Sequential HTTPS Pull of 34GB Tarball from Registry",metricImpact:"6.8s vs 265.0s Cold Start (39x Faster)"},{stage:"3. Zero-Copy VRAM Weight Loading",controlledEngine:"HostPath NVMe RAID0 + safetensors mmap + GDS Direct-to-VRAM",naiveBehavior:"Python pickle torch.load() Double-Copying CPU RAM",metricImpact:"Zero CPU OOM & 3.1s VRAM Warmup"},{stage:"4. 3-Tier Compute Arbitrage",controlledEngine:"30% 1-Yr Reserved + 60% KEDA Spot + 10% Modal/Fal Overflow",naiveBehavior:"100% On-Demand GPU Nodes Sitting Idle Overnight",metricImpact:"$1.42/hr vs $4.50/hr (-68.4% TCO)"}]},"spiky-promo-burst":{id:"spiky-promo-burst",titleZh:"大促脉冲洪峰与中小团队起步期（月消耗 <250 GPU 小时 · 15倍瞬时峰值）",titleEn:"Spiky Promo Traffic & Early-Stage Team (<250 GPU-Hrs/Mo · 15x Instant Burst)",subtitleZh:"当月总推理时长低于 250 GPU 小时或遭遇 15 倍突发脉冲时：Serverless GPU (Modal / Fal) 按秒计费 + 10秒内弹性迸发 200 卡，TCO 反而比自建常驻 K8s 低 -58.2%",subtitleEn:"When monthly volume is <250 GPU-hrs or spikes 15x instantaneously: Serverless GPU (Modal/Fal) per-second billing beats dedicated K8s base nodes by -58.2%",monthlyGpuHours:220,modelWeightSizeGb:24,controlledStack:"Serverless GPU First (Modal / Fal Container Snapshot + Per-Second Billing) ($0.88/hr Blended)",naiveStack:"Dedicated 24/7 Minimum 4-Node AKS GPU Cluster Mostly Idle ($2.10/hr Blended)",controlledColdStartSec:3.4,naiveColdStartSec:180,controlledGpuUtilizationPct:96.2,naiveGpuUtilizationPct:14.5,controlledHourlyEffectiveRateUsd:.88,naiveHourlyEffectiveRateUsd:2.1,controlledAnnualTcoM:.14,naiveAnnualTcoM:.34,annualSavingsM:.2,decisionSummaryZh:"架构师切忌教条主义“盲目自建 K8s”：当团队月推理量低于 250 GPU 小时（约合 4.5 万张图或 4,200 条视频以下），或者面临白天偶尔跑几百张、大促前夜突然并发 15 倍的极端脉冲流量时，自建 K8s 集群光是维持控制面与最小常驻温池就会产生高达 85.5% 的空转浪费。此时优先选用支持 GPU 内存快照（Memory Snapshot）的 Serverless GPU（Modal / Fal），冷启动仅 3.4 秒且空闲归零（Scale-to-Zero），年省 $200k。",decisionSummaryEn:"Avoid premature Kubernetes optimization: below the 250 GPU-hr/mo breakeven (~45k images or 4,200 videos/mo) or under 15x spiky burst traffic, maintaining warm K8s nodes wastes 85.5% of idle GPU hours. Route directly to Serverless GPU platforms with CUDA memory snapshotting (Modal / Fal) for 3.4s cold starts and true scale-to-zero billing.",stages:[{stage:"1. Volume Breakeven Gate",controlledEngine:"<250 GPU-Hrs/Mo Detected -> Route to Serverless GPU (Scale-to-0)",naiveBehavior:"Spins Up 24/7 Dedicated GPU NodePool for 15% Load",metricImpact:"96.2% vs 14.5% Paid GPU Efficiency"},{stage:"2. CUDA Memory Snapshotting",controlledEngine:"Modal / Fal GPU State Snapshot Restored in 3.4s",naiveBehavior:"Cold Container Boot Re-Compiling TorchInductor Graphs",metricImpact:"3.4s vs 180.0s First-Token/Frame"},{stage:"3. Dynamic LoRA Hot-Swap",controlledEngine:"Shared Base Flux.1 Snapshot + R2/Blob LoRA Delta Fetch (0.4s)",naiveBehavior:"Separate 24GB Container Image Built per Brand LoRA",metricImpact:"-94% Registry Storage & Instant Swap"},{stage:"4. Seamless Graduation Path",controlledEngine:"OpenAI-Compatible Gateway Ready to Shift to AKS at >250 Hrs",naiveBehavior:"Hardcoded Vendor SDK Lock-In inside Frontend App",metricImpact:"Zero-Code Migration at Scale Inflection"}]},"overnight-video-batch":{id:"overnight-video-batch",titleZh:"夜间万条视频离线渲染批处理（Wan 2.1 / HunyuanVideo + Spot 抢占式检查点容错）",titleEn:"Overnight 10k-Clip Video Batch Factory (Wan 2.1 / HunyuanVideo + Spot Step-Checkpointing)",subtitleZh:"对比“Spot 节点被回收时整条 50步视频推倒重算（浪费 28% 算力）”与“Azure Spot 30秒驱逐预警钩子 + DiT 去噪步级 Latent 快照断点续跑（零进度丢失，单价打 3.2 折）”",subtitleEn:"Compares Spot Preemption Restarting 50-Step Video from Step 0 (28% wasted compute) vs. 30s Spot Eviction Hook + DiT Step-Latent Checkpoint Resume (3.2x cheaper Spot GPUs)",monthlyGpuHours:32e3,modelWeightSizeGb:28,controlledStack:"90% AKS Spot GPUs + 30s Metadata Eviction Hook + DiT Step-Latent Redis Checkpoint ($0.92/hr)",naiveStack:"On-Demand GPUs ($3.20/hr) or Un-Checkpointed Spot Losing Full 50-Step Progress",controlledColdStartSec:4.2,naiveColdStartSec:210,controlledGpuUtilizationPct:93.4,naiveGpuUtilizationPct:68,controlledHourlyEffectiveRateUsd:.92,naiveHourlyEffectiveRateUsd:3.2,controlledAnnualTcoM:.88,naiveAnnualTcoM:3.07,annualSavingsM:2.19,decisionSummaryZh:"生成一条 1080p 5秒的 Wan 2.1 / HunyuanVideo 视频需要 50 步 DiT 扩散迭代（耗时约 45–90 秒）。如果直接跑在廉价但随时可能被云厂商回收的 Spot 抢占式 GPU 上，一旦跑到第 45 步节点被驱逐，前 80 秒算力就全部作废！我们在 Worker 中监听 Azure Scheduled Events / AWS Spot Interruption 30秒停机信号，每 10 步将仅 `18 MB` 的压缩潜空间张量（Latent Tensor + 步数索引 + RNG Seed）异步写入 Redis/Blob；节点被抢占时，新 Spot 节点在 `4.2秒` 内从第 40 步无缝续跑，安心享受 3.2 折 Spot 算力红利，年省 +$2.19M！",decisionSummaryEn:"A 50-step Wan 2.1 / HunyuanVideo generation takes 45–90s. On raw Spot GPUs, a preemption at step 45 wastes 90% of the compute. By polling the cloud 30-second Spot eviction metadata webhook and checkpointing the compact `18 MB` DiT latent tensor (`step_idx + latent + rng_state`) to Redis every 10 steps, another Spot worker resumes from step 40 in `4.2s`—unlocking 68% cheaper Spot GPUs with zero lost work (+$2.19M/yr saved).",stages:[{stage:"1. Spot Price & Capacity Arbitrage",controlledEngine:"Karpenter / AKS Multi-Pool Spot (H100 / A100 / L40S Fallback)",naiveBehavior:"Single-SKU On-Demand Pool Blocked by Regional Quota",metricImpact:"$0.92/hr vs $3.20/hr GPU Cost"},{stage:"2. Periodic DiT Latent Checkpointing",controlledEngine:"Every 10 Denoising Steps -> Save 18MB Latent + RNG to Redis",naiveBehavior:"Stateless Monolithic 90s Loop (All-or-Nothing)",metricImpact:"Max 8s Work Lost on Hard Kill"},{stage:"3. 30-Second Eviction Graceful Drain",controlledEngine:"IMDS Scheduled-Events Listener -> Immediate Step Flush",naiveBehavior:"SIGKILL Aborts Job and Returns 500 Error to Caller",metricImpact:"100% Job Completion Guarantee"},{stage:"4. Fast Cross-Node Resume",controlledEngine:"Warm Standby Worker Pulls 18MB Latent & Finishes Steps 41-50",naiveBehavior:"Restarts Full 50-Step Generation from Step 0 (210s Delay)",metricImpact:"4.2s Resume · Saves +$2.19M/Yr"}]}};function d(n,a="controlled"){const e=c[n],o=a==="controlled",t=Number((e.naiveColdStartSec/e.controlledColdStartSec).toFixed(1)),i=Number(((e.naiveAnnualTcoM-e.controlledAnnualTcoM)/e.naiveAnnualTcoM*100).toFixed(1));return{scenario:e,mode:a,activeColdStartSec:o?e.controlledColdStartSec:e.naiveColdStartSec,activeGpuUtilizationPct:o?e.controlledGpuUtilizationPct:e.naiveGpuUtilizationPct,activeHourlyEffectiveRateUsd:o?e.controlledHourlyEffectiveRateUsd:e.naiveHourlyEffectiveRateUsd,activeAnnualTcoM:o?e.controlledAnnualTcoM:e.naiveAnnualTcoM,coldStartSpeedupFactor:t,tcoReductionPct:i,annualSavingsM:e.annualSavingsM}}let s="steady-hybrid-enterprise",l="controlled";function r(){const n=document.querySelector("#app");if(!n)return;const a=d(s,l),e=a.scenario,o=l==="controlled";n.innerHTML=`
    <main class="workbench-shell" data-mode="${l}" data-pattern="${s}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">🏆 205TH WORKBENCH MILESTONE (3+7+39×5 = 205)! · DOMAIN 1 · AIGC GPU QUEUE & AUTOSCALING STUDIO</span>
          <h1>企业级 AIGC 视觉推理集群弹性伸缩选型工作台：Serverless GPU vs AKS KEDA + Dragonfly P2P + Spot 断点续跑</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="Workload Pattern">
            ${Object.keys(c).map(t=>`
              <button class="seg-btn ${s===t?"active":""}" data-pattern-btn="${t}">
                ${t==="steady-hybrid-enterprise"?"1. 常态企业中台 (18k GPU-Hrs · KEDA+P2P)":t==="spiky-promo-burst"?"2. 低频/15倍突发脉冲 (<250 Hrs · Serverless 优先)":"3. 夜间万条视频批处理 (Spot + 10步 Latent 断点续跑)"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Fabric Mode">
            <button class="seg-btn ${o?"active":""}" data-mode-btn="controlled">
              ✅ 智能弹性架构 ($${e.controlledHourlyEffectiveRateUsd}/GPU-hr · 冷启动 ${e.controlledColdStartSec}s)
            </button>
            <button class="seg-btn ${o?"":"active"}" data-mode-btn="naive">
              ⛔ 传统 HPA 拉镜像 / 纯按需基线 ($${e.naiveHourlyEffectiveRateUsd}/GPU-hr · 冷启动 ${e.naiveColdStartSec}s)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">${e.modelWeightSizeGb}GB 模型容器冷启动耗时 (Cold Start)</span>
          <strong class="kpi-val ${o?"good":"warn"}">${a.activeColdStartSec} s</strong>
          <span class="kpi-note">提速 ${a.coldStartSpeedupFactor}x · Dragonfly P2P + NVMe mmap</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">集群付费 GPU 有效利用率 (Effective GPU Util)</span>
          <strong class="kpi-val ${o?"good":"warn"}">${a.activeGpuUtilizationPct}%</strong>
          <span class="kpi-note">KEDA 队列深度伸缩 + Scale-to-Zero 消除夜间空转</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">等效单卡小时成本 (Effective GPU-Hr Rate)</span>
          <strong class="kpi-val ${o?"good":"warn"}">$${a.activeHourlyEffectiveRateUsd.toFixed(2)} / hr</strong>
          <span class="kpi-note">30% 预留温池 + 60% Spot 检查点 + 10% Serverless</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">年度算力总账单与净节省 (Annual GPU TCO)</span>
          <strong class="kpi-val good">$${a.activeAnnualTcoM.toFixed(2)}M (-${a.tcoReductionPct}% · +$${a.annualSavingsM.toFixed(2)}M/yr)</strong>
          <span class="kpi-note">🏆 全仓第 205 项工作台里程碑 (3+7+39×5 = 205)</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 34GB 视觉大模型冷启动拆解（265s 传统拉取 vs 6.8s Dragonfly P2P + NVMe mmap）与 Spot 断点续跑</h2>
            <span class="badge">${o?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="AIGC GPU Cold Start and Spot Checkpointing">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="640" height="114" rx="10" fill="#111c33" stroke="#10b981" stroke-width="1.5" />
              <text x="16" y="24" fill="#6ee7b7" font-size="12" font-weight="700">34GB 容器 + Safetensors 权重冷启动耗时对比 (Wan 2.1 14B / Flux.1 + ControlNet)</text>
              <text x="16" y="52" fill="#fca5a5" font-size="11" font-weight="700">⛔ 传统 Docker Pull + torch.load():</text>
              <rect x="230" y="40" width="380" height="16" rx="4" fill="#ef4444" />
              <text x="615" y="52" fill="#fca5a5" font-size="11" font-weight="700">265s</text>

              <text x="16" y="84" fill="#6ee7b7" font-size="11" font-weight="700">✅ Dragonfly P2P + NVMe mmap + GDS:</text>
              <rect x="230" y="72" width="22" height="16" rx="4" fill="#10b981" />
              <text x="262" y="84" fill="#34d399" font-size="12" font-weight="800">${e.controlledColdStartSec}s (39x Faster!)</text>
              <text x="16" y="104" fill="#94a3b8" font-size="10">核心秘诀：不打包 28GB 权重进 OCI 镜像层，改由宿主机本地 NVMe RAID0 挂载并通过 mmap(MAP_SHARED) + GPUDirect 直通显存</text>
            </g>

            <g transform="translate(20, 150)">
              <rect width="640" height="130" rx="10" fill="#0f172a" stroke="#3b82f6" stroke-width="1.5" />
              <text x="16" y="26" fill="#93c5fd" font-size="12" font-weight="700">DiT 视频生成 Spot 抢占式节点 10步 Latent 检查点续跑架构 (Zero Preemption Waste)</text>
              <rect x="16" y="42" width="135" height="44" rx="6" fill="#1e293b" stroke="#60a5fa" />
              <text x="83" y="62" fill="#f8fafc" font-size="11" text-anchor="middle" font-weight="700">Steps 1 → 40</text>
              <text x="83" y="78" fill="#34d399" font-size="9" text-anchor="middle">Saved 18MB Latent to Redis</text>

              <rect x="172" y="42" width="145" height="44" rx="6" fill="#3f1d2e" stroke="#f87171" />
              <text x="244" y="62" fill="#fca5a5" font-size="11" text-anchor="middle" font-weight="700">⚡ Step 44 Spot Evict</text>
              <text x="244" y="78" fill="#fecaca" font-size="9" text-anchor="middle">30s IMDS Webhook Caught</text>

              <rect x="338" y="42" width="150" height="44" rx="6" fill="#065f46" stroke="#34d399" />
              <text x="413" y="62" fill="#f8fafc" font-size="11" text-anchor="middle" font-weight="700">New Spot Resumes @40</text>
              <text x="413" y="78" fill="#a7f3d0" font-size="9" text-anchor="middle">4.2s Reload · Steps 41→50</text>

              <rect x="506" y="42" width="118" height="44" rx="6" fill="#1e3a8a" stroke="#38bdf8" />
              <text x="565" y="62" fill="#f8fafc" font-size="11" text-anchor="middle" font-weight="700">1080p MP4 Out</text>
              <text x="565" y="78" fill="#93c5fd" font-size="9" text-anchor="middle">68% Spot Discount</text>

              <text x="16" y="112" fill="#cbd5e1" font-size="11">架构师分界线：月推理 &lt; 250 GPU小时选 Serverless GPU (Modal/Fal)；&gt; 250 GPU小时选 AKS KEDA + Spot 检查点池</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段 AIGC 算力底座冷启动加速与混部套利拆解</h2>
            <span class="badge">🏆 205th Milestone</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 推荐弹性底座：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 传统粗放基线：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,n.querySelectorAll("[data-pattern-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.patternBtn;i&&(s=i,r())})}),n.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.modeBtn;i&&(l=i,r())})})}r();
