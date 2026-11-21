import"./modulepreload-polyfill-B5Qt9EMX.js";const r={"cleanplate-scene-reuse":{id:"cleanplate-scene-reuse",titleZh:"跨部门商品空镜底板语义复用池（SigLIP 向量检索 >0.94 + Depth/HDRI 分层底板秒级复用）",titleEn:"Cross-Team Clean-Plate Scene Semantic Cache (SigLIP >0.94 + Layered Depth/HDRI Plate Reuse)",subtitleZh:"对比“500名运营每天重复生成上万张几乎一样的‘清晨阳光大理石桌面’（0% 缓存命中）”与“SigLIP-SO400M 语义向量缓存命中已审批 4K 无商品空镜底板 + 仅跑 0.4s 接触阴影与 IC-Light 合成（省 -78% GPU 算力）”",subtitleEn:'Compares 500 Marketers Re-Generating "Morning Sunlight Marble Countertop" 10,000 Times vs. SigLIP Vector Cache Returning Approved 4K Clean Plate + Depth/HDRI in 18ms (-78% GPU compute)',monthlyRequestsK:2e3,controlledStack:"L1 SigLIP-SO400M Clean-Plate Vector Cache (>0.94 Cosine) + 0.4s Shadow/IC-Light Composite ($0.0012)",naiveStack:"Stateless Full-Pipeline Flux.1 Generation on Every Similar Background Request ($0.018/req)",controlledGpuComputeSavedPct:56.4,naiveGpuComputeSavedPct:0,controlledP50LatencySec:.45,naiveP50LatencySec:12.4,controlledVisualQualityLpipsPct:99.7,naiveVisualQualityLpipsPct:98.5,controlledBlendedCostUsd:.0012,naiveBlendedCostUsd:.018,controlledAnnualSavingsM:2.64,decisionSummaryZh:'全仓达成第 215 座工作台里程碑（3+7+41×5 = 215，配齐 430 篇中英双语选型指南）！在大型零售集团内部，家电部、美妆部和食品部的 500 名运营每天都在输入高度同质化的背景提示词（如 `"luxury white marble countertop with warm morning window light"`）。无状态管线每次都老老实实从头跑 28 步 Flux.1 去噪，导致 38% 的 GPU 算力浪费在画一模一样的桌子上！通过将 **“商品前景合成”与“无商品空镜底板（Clean Plate）”彻底解耦**，并用 `SigLIP-SO400M + Qdrant` 索引每一张已通过 QA 门禁的 4K 空镜底板（连同预先算好的 3D 台面深度图与光照球谐参数一起缓存），当新请求语义余弦 `>0.94` 且相机俯仰角匹配 `±2°` 时，`18ms` 直接命中空镜缓存，仅需 `0.4s` 合成新商品的接触阴影与边缘光，全集团 GPU 消耗立减 -56.4%，年省 +$2.64M！',decisionSummaryEn:'Crowning our 215th Workbench Milestone (3+7+41×5 = 215 Studios & 430 Bilingual Guides)! Across 500 retail marketers, ~38% of background prompts request near-identical scenes ("white marble countertop with morning window light"). By decoupling **SKU Foreground Compositing** from **Reusable 4K Clean Plates** (cached alongside their pre-computed 3D Tabletop Depth Maps and HDRI probes in `Qdrant` indexed by `SigLIP-SO400M`), requests matching `cosine > 0.94` and camera pitch `±2°` skip base diffusion entirely—completing in `0.45s` (`27x` faster) and saving 56.4% of cluster GPU compute (+$2.64M/yr).',stages:[{stage:"1. Prompt Canonicalization & Parse",controlledEngine:"Split Prompt into [SKU Foreground] + [Scene Clean-Plate Spec + Pitch]",naiveBehavior:"Hashes Raw Unnormalized Prompt String (0.2% Exact Hit Rate)",metricImpact:"38.4% Semantic Cache Hit Rate"},{stage:"2. SigLIP + Pitch Vector Lookup",controlledEngine:"Qdrant HNSW Search (SigLIP > 0.94 & Camera Pitch Δθ <= 2.0°)",naiveBehavior:"No Vector Index -> Re-Runs 28-Step Diffusion Every Time",metricImpact:"18ms Lookup vs 12.0s Base Diffusion"},{stage:"3. Pre-Baked Depth & HDRI Bundle",controlledEngine:"Cache Stores 4K RGB Plate + 16-bit Depth Map + Light Probe",naiveBehavior:"Re-Runs DepthAnything & Light Estimation on Every SKU",metricImpact:"0.45s Total SKU Placement Turnaround"},{stage:"4. Multi-SKU Diversity Jitter",controlledEngine:"Randomizes Horizontal Crop Window & Depth-of-Field Bokeh Radius",naiveBehavior:"Identical Background Crop Across Competitor Listings",metricImpact:"99.7% Quality · Saves +$2.64M/Yr"}]},"iterative-prompt-step-cache":{id:"iterative-prompt-step-cache",titleZh:"设计师交互式微调提示词的“第 10/28 步潜空间前缀缓存”（保留构图骨架，仅重跑后半段细节）",titleEn:"Interactive Prompt-Tweak Step-10 Latent Prefix Cache (Lock Coarse Composition, Re-Run Fine Steps Only)",subtitleZh:"解决设计师微调一句提示词（如将“皮沙发”改为“丝绒沙发”）必须从 Step 0 重跑且整张图构图全变痛点：复用前 10 步低频构图 Latent 快照，从 Step 11 注入新文本特征（省 -38% 耗时且构图 100% 锁定）",subtitleEn:'When a designer tweaks a material/lighting adjective ("change leather sofa to velvet"): reuses the cached Step-10 coarse-layout latent and runs only Steps 11–28 (-38% latency & 100% layout lock)',monthlyRequestsK:850,controlledStack:"Session Step-10 Latent Prefix Cache (12MB FP16) + Prompt-to-Prompt Cross-Attention Edit ($0.0085)",naiveStack:"Restarting From Step 0 Random Noise on Every Minor Prompt Tweak ($0.016 · Mutates Composition)",controlledGpuComputeSavedPct:42.5,naiveGpuComputeSavedPct:0,controlledP50LatencySec:4.8,naiveP50LatencySec:11.2,controlledVisualQualityLpipsPct:99.4,naiveVisualQualityLpipsPct:71,controlledBlendedCostUsd:.0085,naiveBlendedCostUsd:.016,controlledAnnualSavingsM:1.12,decisionSummaryZh:'设计师在工作台里调图时最崩溃的体验是：第一版生成的房间构图和光影角度非常完美，他只想把提示词里的 `"brown leather armchair"` 改成 `"emerald velvet armchair"`，结果点击重新生成后，不仅要再等 11.2 秒，而且哪怕锁了同一个随机种子（Seed），因为交叉注意力矩阵变了，整个房间的窗户和茶几位置也跟着面目全非！扩散模型的物理规律是：**前 35% 的去噪步（Steps 1→10）决定全局空间构图与低频轮廓，后 65% 的步数（Steps 11→28）才决定材质纹理与高频光影**。我们在 Redis/NVMe 缓存当前会话的 `Step-10` 潜空间张量（仅 12MB），当用户微调材质/色彩形容词时，直接跳过前 10 步从第 11 步加载缓存续跑——既省下 42.5% 算力（4.8s 出图），又 100% 锁死原图完美构图！',decisionSummaryEn:'In diffusion models, the **first 35% of denoising steps (Steps 1→10) establish global spatial layout and object silhouettes**, while **Steps 11→28 refine material textures and lighting**. Caching the `12 MB` Step-10 latent tensor in Redis allows interactive prompt edits (e.g., changing `"leather"` to `"emerald velvet"`) to resume directly at Step 11—saving 42.5% of GPU compute (4.8s vs. 11.2s) while locking 99.4% of the approved scene composition!',stages:[{stage:"1. AST Prompt Diff Classifier",controlledEngine:"Detects Attribute/Material Edit vs. Structural Subject Change",naiveBehavior:"Treats Every 1-Word Edit as a Brand-New Job from Step 0",metricImpact:"Identifies 64% Prefix-Cacheable Edits"},{stage:"2. Step-10 Coarse Latent Snapshot",controlledEngine:"Caches 12MB FP16 Latent at t=Step 10 in Local NVMe/Redis",naiveBehavior:"Discards All Intermediate Denoising States",metricImpact:"Skips 35.7% of Heavy DiT Steps"},{stage:"3. Cross-Attention Map Locking",controlledEngine:"Preserves Self-Attention Layout While Swapping Token Value Vectors",naiveBehavior:"Same Seed Still Drifts Global Layout When Prompt Length Changes",metricImpact:"99.4% vs 71.0% Composition Lock"},{stage:"4. Sub-5s Interactive Turnaround",controlledEngine:"Resumes Steps 11->28 in 4.8s on Warm Worker",naiveBehavior:"11.2s Full Wait + Frustrated Designer Re-Rolls",metricImpact:"$0.0085 vs $0.016 (+$1.12M/Yr)"}]},"video-dit-teacache-acceleration":{id:"video-dit-teacache-acceleration",titleZh:"视频大模型内部跨步注意力缓存（TeaCache / First-Block Cache：无损跳过 48% 冗余 DiT 计算）",titleEn:"Intra-Generation Video DiT Timestep Caching (TeaCache / First-Block Residual Reuse · 1.92x Speedup)",subtitleZh:"在单条 Wan 2.1 / HunyuanVideo 50步去噪内部：相邻时间步 t 与 t-1 的 Transformer 残差变化极小，采用 TeaCache 动态多项式阈值复用中间层激活，单条视频从 68秒压至 35.4秒",subtitleEn:"Inside a single 50-step Wan 2.1 / HunyuanVideo run: reuses DiT transformer block residuals across slowly varying adjacent timesteps via TeaCache (68.0s -> 35.4s, 99.3% quality)",monthlyRequestsK:150,controlledStack:"Wan 2.1 / HunyuanVideo + TeaCache Timestep Residual Reuse + FP8 SageAttention ($0.072/clip)",naiveStack:"Un-Cached Full 50-Step × 40-Layer DiT Forward Pass on Every Timestep ($0.145/clip · 68.0s)",controlledGpuComputeSavedPct:48.2,naiveGpuComputeSavedPct:0,controlledP50LatencySec:35.4,naiveP50LatencySec:68,controlledVisualQualityLpipsPct:99.3,naiveVisualQualityLpipsPct:100,controlledBlendedCostUsd:.072,naiveBlendedCostUsd:.145,controlledAnnualSavingsM:1.58,decisionSummaryZh:"即使面对一条全新的视频提示词（外部语义缓存未命中），在 `Wan 2.1` 或 `HunyuanVideo` 的 50 步去噪循环内部，第 15 步到第 42 步之间的相邻时间步特征变化极其平缓，40 层 3D Transformer 块在相邻步算出的残差几乎一模一样！通过部署无需重新训练的 **`TeaCache (Timestep Embedding Aware Cache)` + `First-Block Cache`**：只计算第 1 层 Transformer 块的L1相对残差差值 $Delta_t$，只要累积变化未超过阈值 $	au = 0.12$，直接复用上一步的第 2～40 层输出并跳过全部 3D 注意力矩阵乘法——单条视频生成耗时从 68.0 秒直降至 **35.4 秒（提速 1.92 倍，省 -48.2% 算力）**，而画质 VBench/LPIPS 保持率高达 99.3%！",decisionSummaryEn:"Even on a cold cache miss, adjacent denoising timesteps ($t$ and $t-1$) between Steps 12 and 42 in `Wan 2.1 / HunyuanVideo` produce nearly identical 3D Transformer block residuals. Deploying training-free **`TeaCache` / `First-Block Residual Caching`** monitors the L1 relative delta of Block 1 and skips Blocks 2–40 whenever the accumulated change stays below $	au = 0.12$—cutting 50-step video latency from `68.0s` to **`35.4s` (`1.92×` speedup, `-48.2%` FLOPs)** with `99.3%` visual fidelity!",stages:[{stage:"1. First-Block Residual Probe",controlledEngine:"Evaluates DiT Block #1 Relative L1 Delta (<2% Overhead)",naiveBehavior:"Blindly Executes All 40 3D-Attention Blocks on All 50 Steps",metricImpact:"Detects Redundant Mid-Denoising Steps"},{stage:"2. Dynamic TeaCache Step Skip",controlledEngine:"Skips 24 of 50 Full Forward Passes by Reusing Cached Residuals",naiveBehavior:"2,000 Full 3D Attention Evaluations per Video",metricImpact:"-48.2% FLOPs & 1.92x Speedup"},{stage:"3. Boundary Step Protection",controlledEngine:"Forces Full Compute on Steps 1–8 (Structure) & 45–50 (Sharpness)",naiveBehavior:"Uniform Step Skipping Blurring Final Frame Edges",metricImpact:"99.3% Visual Quality Retention"},{stage:"4. SageAttention2 INT8/FP8 Fusion",controlledEngine:"Combines TeaCache with Quantized SageAttention2 Kernels",naiveBehavior:"Standard FP16 FlashAttention-2 Without Step Reuse",metricImpact:"35.4s vs 68.0s ($0.072/Clip)"}]}};function d(s,i="controlled"){const e=r[s],a=i==="controlled",t=Number((e.naiveP50LatencySec/e.controlledP50LatencySec).toFixed(1)),n=Number(((e.naiveBlendedCostUsd-e.controlledBlendedCostUsd)/e.naiveBlendedCostUsd*100).toFixed(1));return{scenario:e,mode:i,activeGpuComputeSavedPct:a?e.controlledGpuComputeSavedPct:e.naiveGpuComputeSavedPct,activeP50LatencySec:a?e.controlledP50LatencySec:e.naiveP50LatencySec,activeVisualQualityLpipsPct:a?e.controlledVisualQualityLpipsPct:e.naiveVisualQualityLpipsPct,activeBlendedCostUsd:a?e.controlledBlendedCostUsd:e.naiveBlendedCostUsd,speedupFactor:t,costReductionPct:n,annualSavingsM:e.controlledAnnualSavingsM}}let o="cleanplate-scene-reuse",l="controlled";function c(){const s=document.querySelector("#app");if(!s)return;const i=d(o,l),e=i.scenario,a=l==="controlled";s.innerHTML=`
    <main class="workbench-shell" data-mode="${l}" data-scenario="${o}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">🏆 215TH WORKBENCH MILESTONE (3+7+41×5 = 215)! · DOMAIN 1 · AIGC SEMANTIC CACHE & STEP-LATENT REUSE STUDIO</span>
          <h1>企业级 AIGC 视觉中台语义缓存与步级潜空间复用工作台：L1 空镜向量缓存 + L2 第10步前缀复用 + L3 TeaCache</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="Cache Scenario">
            ${Object.keys(r).map(t=>`
              <button class="seg-btn ${o===t?"active":""}" data-scenario-btn="${t}">
                ${t==="cleanplate-scene-reuse"?"1. L1 跨部门 4K 空镜底板语义复用 (SigLIP >0.94)":t==="iterative-prompt-step-cache"?"2. L2 设计师改词 Step-10 潜空间前缀复用 (锁构图)":"3. L3 视频 DiT 内部跨步残差缓存 (TeaCache 1.92x)"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Cache Mode">
            <button class="seg-btn ${a?"active":""}" data-mode-btn="controlled">
              ✅ 三级缓存开启 (省 -${e.controlledGpuComputeSavedPct}% GPU · P50 延迟 ${e.controlledP50LatencySec}s)
            </button>
            <button class="seg-btn ${a?"":"active"}" data-mode-btn="naive">
              ⛔ 无状态每次从 Step 0 全量重算 (P50 延迟 ${e.naiveP50LatencySec}s · $${e.naiveBlendedCostUsd})
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">集群 GPU 算力直接削减率 (GPU FLOPs Saved)</span>
          <strong class="kpi-val ${a?"good":"warn"}">-${i.activeGpuComputeSavedPct}%</strong>
          <span class="kpi-note">L1 空镜复用 + L2 步级前缀 + L3 TeaCache 协同</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">设计师 P50 交互响应延迟 (P50 Turnaround)</span>
          <strong class="kpi-val ${a?"good":"warn"}">${i.activeP50LatencySec} s</strong>
          <span class="kpi-note">提速 ${i.speedupFactor}x · 改形容词 100% 锁死原图完美构图</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">画质与构图保持率 (Visual Quality / Layout Lock)</span>
          <strong class="kpi-val ${a?"good":"warn"}">${i.activeVisualQualityLpipsPct}%</strong>
          <span class="kpi-note">首尾关键步强制全算，中间平缓步智能复用</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">单次综合成本与年省 (Blended Cost & Savings)</span>
          <strong class="kpi-val good">$${i.activeBlendedCostUsd} · +$${i.annualSavingsM.toFixed(2)}M/yr</strong>
          <span class="kpi-note">🏆 全仓第 215 座工作台里程碑 (3+7+41×5 = 215)</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 视觉生成中台的三级缓存金字塔（L1 空镜向量缓存 → L2 第10步构图快照 → L3 TeaCache 跨步残差）</h2>
            <span class="badge">${a?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="3-Tier Visual AIGC Semantic and Latent Cache Pyramid">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="202" height="126" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
              <text x="14" y="24" fill="#6ee7b7" font-size="11.5" font-weight="700">L1: 跨团队空镜底板缓存</text>
              <text x="14" y="48" fill="#f8fafc" font-size="17" font-weight="800">SigLIP &gt; 0.94 (0.45s)</text>
              <text x="14" y="70" fill="#a7f3d0" font-size="10.5">• 剥离商品与背景，缓存 4K Clean Plate</text>
              <text x="14" y="90" fill="#a7f3d0" font-size="10.5">• 附带预计算的 3D 台面深度图与 HDRI</text>
              <text x="14" y="110" fill="#34d399" font-size="10.5" font-weight="700">• 拦截 38% 同质化桌面/展台背景请求</text>
            </g>

            <g transform="translate(239, 20)">
              <rect width="202" height="126" rx="10" fill="#111c33" stroke="#3b82f6" stroke-width="1.5" />
              <text x="14" y="24" fill="#93c5fd" font-size="11.5" font-weight="700">L2: 会话级 Step-10 构图缓存</text>
              <text x="14" y="48" fill="#f8fafc" font-size="17" font-weight="800">跳过前 35% 步数 (4.8s)</text>
              <text x="14" y="70" fill="#cbd5e1" font-size="10.5">• 缓存第 10/28 步 12MB 粗粒度 Latent</text>
              <text x="14" y="90" fill="#cbd5e1" font-size="10.5">• 设计师改材质/色调时直接从 Step 11 续跑</text>
              <text x="14" y="110" fill="#60a5fa" font-size="10.5" font-weight="700">• 100% 锁死原图房间布局与人物姿态</text>
            </g>

            <g transform="translate(458, 20)">
              <rect width="202" height="126" rx="10" fill="#3b0764" stroke="#a855f7" stroke-width="1.5" />
              <text x="14" y="24" fill="#d8b4fe" font-size="11.5" font-weight="700">L3: 步间注意力缓存 TeaCache</text>
              <text x="14" y="48" fill="#f8fafc" font-size="17" font-weight="800">省 48.2% 视频 FLOPs</text>
              <text x="14" y="70" fill="#e9d5ff" font-size="10.5">• 监测 DiT 第 1 层残差变化率 Δt &lt; 0.12</text>
              <text x="14" y="90" fill="#e9d5ff" font-size="10.5">• 动态跳过中间平缓步的第 2–40 层计算</text>
              <text x="14" y="110" fill="#c084fc" font-size="10.5" font-weight="700">• Wan 2.1 / HunyuanVideo 提速 1.92x</text>
            </g>

            <g transform="translate(20, 162)">
              <rect width="640" height="118" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="26" fill="#38bdf8" font-size="13" font-weight="700">🏆 全仓第 215 项工作台里程碑 (3+7+41×5 = 215 Studios)：为什么文本 LLM 的语义缓存不能直接照搬到视觉中台？</text>
              <text x="18" y="52" fill="#e2e8f0" font-size="11.5">1. 直接返回同一张成图会导致多商家撞图违规：L1 只缓存“无商品空镜底板 + Depth”，通过随机水平裁剪框与虚化光圈实现千商千面</text>
              <text x="18" y="76" fill="#e2e8f0" font-size="11.5">2. 锁 Seed 改词依然会破坏构图：只有缓存第 10 步的低频潜空间张量 (L2 Step-Latent Cache)，才能在改材质形容词时真正锁死构图</text>
              <text x="18" y="100" fill="#34d399" font-size="11.5" font-weight="700">3. L1 + L2 + L3 三级协同：将 200万张/月图与 15万条/月视频集群综合算力账单直接砍半 (-56.4%)，年省 +$2.64M</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段视觉语义缓存与潜空间复用流水线拆解</h2>
            <span class="badge">🏆 215th Milestone</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 三级视觉缓存管线：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 无状态从零重算：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,s.querySelectorAll("[data-scenario-btn]").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.scenarioBtn;n&&(o=n,c())})}),s.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.modeBtn;n&&(l=n,c())})})}c();
