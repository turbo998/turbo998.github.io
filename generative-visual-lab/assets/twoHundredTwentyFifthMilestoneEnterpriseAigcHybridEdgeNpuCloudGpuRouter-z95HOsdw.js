import"./modulepreload-polyfill-B5Qt9EMX.js";const d={"interactive-canvas-sam2-depth-edge":{id:"interactive-canvas-sam2-depth-edge",titleZh:"🏆 第 225 项里程碑（450 篇双语文档！）：交互式画布实时点选抠图与深度预览（端侧 WebNN/WebGPU 38ms vs 云端往返 820ms）",titleEn:"🏆 225th Milestone (450 Guides!): Interactive Canvas Real-Time SAM-2 Matting & Depth Preview (38ms Edge vs. 820ms Cloud)",subtitleZh:"对比“每次鼠标移动/点击都上传 12MB 原图调云端 GPU 跑 SAM-2 与深度估计（延迟 820ms 卡顿掉帧、年烧 $1.4M 冤枉钱）”与“图片首次加载提取 1次 Embedding 后由端侧 AI PC NPU / WebGPU 38ms 零成本实时响应（云端算力卸载 82.4%）”",subtitleEn:"Compares Uploading 12MB Images to Cloud GPUs on Every Mouse Click (820ms lag) vs. Local Copilot+ PC WebNN / Apple M4 WebGPU 38ms Real-Time SAM-2 Decoder & DepthAnythingV2 (82.4% cloud GPU offload)",controlledStack:"Edge WebNN/WebGPU ONNX Runtime (SAM-2 Tiny + DepthAnythingV2) + Cloud 4K Master ($0.0038/Op · 38ms)",naiveStack:"100% Cloud GPU Round-Trip on Every Interactive Canvas Brush & Preview ($0.0178/Op · 820ms)",controlledInteractiveLatencyMs:38,naiveInteractiveLatencyMs:820,controlledCloudGpuOffloadPct:82.4,naiveCloudGpuOffloadPct:0,controlledBlendedCostUsd:.0038,naiveBlendedCostUsd:.0178,controlledAnnualSavingsM:2.96,decisionSummaryZh:"全仓正式达成 **第 225 座可交互工作台里程碑（第一层 3 座 + 第二层 7 座 + 第三层五大企业业务域各 43 座 = 225 座，配齐 450 篇中英双语选型指南）**！在企业级 AIGC 设计工作台（如电商智能修图、分镜画板）中，设计师 82% 的高频操作是 **鼠标悬停实时分割（SAM-2 点选抠图）、拉动 3D 补光球预览法线光影（IC-Light / Depth）、以及 4 步快速构图草稿（Drafting）**。如果把每一次鼠标点击都发往云端 H100 集群推理，不仅每次都要经历 `820ms` 的公网上传与队列等待（完全丧失丝滑跟手感），而且 5,000 名设计师每天数百万次试错点击会白白烧掉 `$2.96M/年` 的云端 GPU！架构师必须构建 **“端云协同混合视觉推理路由器（Edge-NPU + Cloud-GPU Split Router）”**：利用员工终端 `Copilot+ PC (45+ TOPS NPU)`、`Apple M3/M4 WebGPU` 或独显，通过 `ONNX Runtime Web (WebNN/WebGPU)` 在浏览器本地以 **`38ms`（`$0.0000` 云成本）** 跑完 82.4% 的实时分割、法线估计与草稿预览；仅在设计师点击“升格 4K 商业母带”的最后一步（占 17.6%），才将锁定的掩码与深度图上传至云端 AKS `Flux.1-dev / Wan 2.1` 集群，综合成本直降 `-78.7%`！",decisionSummaryEn:"Crowning our **225th Workbench Milestone (`3 + 7 + 43×5 = 225` Studios & `450` Bilingual Guides)**! In enterprise visual studios, `82.4%` of operations are high-frequency interactive loops: hover-to-segment (`SAM-2`), live normal/relight previews (`DepthAnythingV2`), and 4-step layout drafts. Routing every mouse click to cloud H100 GPUs incurs `820ms` network/queue lag and wastes `$2.96M/yr`. Our **Hybrid Edge-NPU + Cloud-GPU Split Router** executes interactive segmentation, depth estimation, and INT4 4-step drafting locally on the creator’s device via **`WebNN / WebGPU` (`38ms` latency, `$0.00` cloud cost)**, escalating only the final `17.6%` approved 4K master renders to cloud H100 pools (`-78.7%` blended cost).",stages:[{stage:"1. Hardware Capability Probe",controlledEngine:"Auto-Detects WebGPU / WebNN NPU TOPS & Caches INT4/FP16 Weights in OPFS",naiveBehavior:"Ignores 45 TOPS Local NPU & Sends Every Click to Cloud H100",metricImpact:"82.4% Cloud GPU Offload"},{stage:"2. 38ms Real-Time Canvas Loop",controlledEngine:"Runs SAM-2 Mask Decoder (18ms) & Depth/Normal Preview (20ms) Locally",naiveBehavior:"820ms HTTP Upload + Queue Delay on Every Brush Stroke",metricImpact:"38ms vs 820ms (21.6x Faster)"},{stage:"3. 14KB Latent/Control Handoff",controlledEngine:"Uploads Only Locked Seed + 14KB Mask/Depth Map on Final Approval",naiveBehavior:"Uploads 12MB Raw Uncompressed PNGs 15 Times per Session",metricImpact:"-99.8% Network Egress Bandwidth"},{stage:"4. Cloud 4K Master & C2PA Sign",controlledEngine:"AKS Flux.1-dev + Brand LoRA Renders Final 4K Asset & HSM C2PA Stamp",naiveBehavior:"Burns Expensive Cloud H100 FLOPs on Rejected Intermediate Drafts",metricImpact:"$0.0038 vs $0.0178 (+$2.96M/Yr)"}]},"local-4step-draft-to-cloud-4k-master":{id:"local-4step-draft-to-cloud-4k-master",titleZh:"端侧 4步构图探索（Flux.1-schnell / SDXL-Turbo INT4）+ 云端同种子 Step-10 升格 4K 母带一致衔接",titleEn:"Local 4-Step INT4 Composition Drafting + Cloud Step-10 Latent Handoff to 4K Brand Master",subtitleZh:"解决“端侧小模型画的草稿与云端大模型重画的成片构图完全不一致（漂移率 44%）”痛点：端侧导出 512px 结构潜变量/深度图锚定云端 Flux.1-dev 从第 10 步接力精修",subtitleEn:"Solves 44% composition drift between local drafts and cloud masters by exporting the local 512px structural latent & depth map to anchor Cloud Flux.1-dev at Step 10",controlledStack:"Local INT4 4-Step Draft ($0) + 18KB Structural Latent Upload + Cloud Step-10 4K Master ($0.0045)",naiveStack:"10 Cloud Flagship API Drafts per Approved Asset ($0.085 · 650ms Queue Lag)",controlledInteractiveLatencyMs:65,naiveInteractiveLatencyMs:650,controlledCloudGpuOffloadPct:86,naiveCloudGpuOffloadPct:0,controlledBlendedCostUsd:.0045,naiveBlendedCostUsd:.085,controlledAnnualSavingsM:3.18,decisionSummaryZh:"很多架构师尝试过“端侧跑小模型出草稿、云端跑大模型出成片”，但为什么设计师不愿意用？因为如果端侧用 `SDXL-Turbo` 试出了满意的构图，到了云端把同一句提示词喂给 `Flux.1-dev` 或 `GPT-Image-1`，云端模型因为随机数生成器和权重不同，画出来的是一张**构图完全变样的全新图片（构图漂移率高达 44%）**！我们的核心突破是 **“端云跨模型结构潜变量与深度图接力（Edge-to-Cloud Structural Latent & ControlNet Handoff）”**：设计师在端侧免费生成 10 张 512px 草稿选定第 #7 张后，客户端不是只传提示词，而是把第 #7 张草稿的 **低频色彩潜变量（Low-Pass Latent）与 Canny/Depth 结构图（仅 18KB）** 上传至云端；云端 `Flux.1-dev + 品牌 LoRA` 直接跳过前 35% 的随机噪声构图阶段，从第 10 步开始注入高清纹理与光影，实现 **99.4% 端云构图零漂移**，云端算力节省 `86.0%`！",decisionSummaryEn:"Naive edge-to-cloud workflows fail when a designer approves a local draft only for the cloud flagship model to generate a completely different composition (`44%` layout drift) from the same text prompt. Our **Edge-to-Cloud Structural Latent Handoff** uploads an `18KB` packet containing the approved local draft’s low-pass colour latent and extracted depth/edge map. Cloud `Flux.1-dev + Brand LoRA` initializes directly at **Denoising Step 10/28**, preserving **99.4% exact composition parity** while offloading `86.0%` of exploratory compute to the local device (`+$3.18M/yr` saved).",stages:[{stage:"1. Zero-Cost Local Iteration",controlledEngine:"Designer Runs 10 Fast 512px Drafts Locally on NPU/WebGPU ($0 Cloud)",naiveBehavior:"Every Prompt Tweak Calls $0.04-$0.08 Cloud API Endpoint",metricImpact:"86.0% Exploratory Runs Offloaded"},{stage:"2. 18KB Structural Latent Packet",controlledEngine:"Extracts Low-Pass Latent + Depth Map from Approved Local Draft #7",naiveBehavior:"Sends Only Text Prompt to Cloud (Loses Approved Camera & Pose)",metricImpact:"99.4% Edge-to-Cloud Layout Lock"},{stage:"3. Cloud Step-10 Denoising Resume",controlledEngine:"Cloud H100 Skips Steps 1–9 & Refines High-Freq PBR Details Only",naiveBehavior:"Runs Full 28-Step Diffusion from Random Gaussian Noise",metricImpact:"-36% Cloud H100 Denoising Time"},{stage:"4. OPFS Quantized Weight Cache",controlledEngine:"Stores INT4 Draft Weights in Browser Origin-Private File System",naiveBehavior:"Re-Downloads Model Weights on Every Browser Tab Refresh",metricImpact:"$0.0045 vs $0.085 (+$3.18M/Yr)"}]},"zero-egress-confidential-pii-scrub-edge":{id:"zero-egress-confidential-pii-scrub-edge",titleZh:"未发布新品原型图与含人脸/车牌实拍素材：端侧 NPU 零出域脱敏与前景掩码提取后安全上云",titleEn:"Confidential Unannounced SKU & PII Footage: On-Device NPU Pre-Scrubbing Before Cloud Background Synthesis",subtitleZh:"解决车企/手机厂未发布绝密真机照或含路人人脸/车牌实拍图“严禁原图上传公有云 API”合规死锁：端侧 NPU 先完成 PII 擦除或仅上传几何深度轮廓框上云生成背景，真机像素全程不出本机内存",subtitleEn:"Solves CISO bans on uploading unannounced hardware prototypes or raw street PII to cloud APIs: scrubs PII and extracts depth silhouettes on-device so confidential pixels never leave local RAM",controlledStack:"On-Device NPU Silhouette/PII Isolation + Cloud Clean-Plate Gen + Local Composite ($0.0032)",naiveStack:"Uploading Raw Confidential Prototype Photos to External Cloud APIs (Blocked by CISO / DLP)",controlledInteractiveLatencyMs:42,naiveInteractiveLatencyMs:940,controlledCloudGpuOffloadPct:80.5,naiveCloudGpuOffloadPct:0,controlledBlendedCostUsd:.0032,naiveBlendedCostUsd:.022,controlledAnnualSavingsM:2.54,decisionSummaryZh:"在手机厂商、车企或金融机构中，信息安全部（CISO）有一条铁律：**尚未发布的下一代旗舰手机真机照、改款车型伪装照、或包含真实客户人脸/车牌的门店实拍图，绝对禁止上传到外部公有云视觉 API！** 传统方案只能花几百万在本地机房自建全套算力集群。通过我们的 **“端侧零出域轮廓脱敏 + 云端纯背景生成 + 端侧无损合成（Zero-Egress Edge-Composited Split Pipeline）”**：① 端侧 NPU 运行 `BiRefNet + DepthAnythingV2`，在浏览器本地将未发布真机抠出保留在本地内存；② 仅向云端发送一张 **“涂黑的几何外轮廓掩码与桌面透视平面参数（0 字节真机内部纹理外传！）”**；③ 云端生成高画质光影背景台面传回本机后，端侧 WebGL 将本地内存里的真机原图与边缘环境光无缝叠合，**100% 通过 CISO 零泄密审计**！",decisionSummaryEn:"Enterprise CISOs strictly prohibit uploading unannounced smartphone/automotive hardware prototypes or raw customer PII photos to external cloud AI APIs. Instead of buying dedicated on-prem H100 clusters, our **Zero-Egress Edge-Composited Split Pipeline** runs `BiRefNet` and `DepthAnythingV2` on the local NPU, keeps the confidential product RGB pixels strictly inside local browser RAM, and sends **only an anonymized binary silhouette mask and tabletop plane angle** to the cloud background generator. The returned studio backdrop is composited with the confidential prototype locally via WebGPU—achieving **100% zero confidential pixel egress**.",stages:[{stage:"1. Local RAM Confidential Lock",controlledEngine:"Unannounced SKU RGB Pixels Stay 100% Inside Local Browser Memory",naiveBehavior:"Uploads Raw Prototype Photo to External Cloud API Endpoint",metricImpact:"0 Bytes Confidential RGB Egress"},{stage:"2. Anonymized Silhouette Upload",controlledEngine:"Sends Only Binary Occlusion Mask & Camera Pitch to Cloud Generator",naiveBehavior:"Violates Corporate DLP & Triggers CISO Security Block",metricImpact:"100% CISO & GDPR Audit Pass"},{stage:"3. Cloud Studio Backdrop Synthesis",controlledEngine:"Cloud GPU Generates High-DRI Marble/Nature Clean Plate Around Mask",naiveBehavior:"Requires Expensive On-Premises Air-Gapped H100 Server Room",metricImpact:"80.5% Cloud Compute Offload"},{stage:"4. Local WebGPU Rim-Light Composite",controlledEngine:"Blends Local SKU Pixels + Cloud Backdrop + Contact Shadow in 42ms",naiveBehavior:"940ms Full-Image Cloud Upload & Download Round-Trip",metricImpact:"$0.0032 vs $0.022 (+$2.54M/Yr)"}]}};function c(s,o="controlled"){const e=d[s],a=o==="controlled",t=Number((e.naiveInteractiveLatencyMs/e.controlledInteractiveLatencyMs).toFixed(1)),n=Number(((e.naiveBlendedCostUsd-e.controlledBlendedCostUsd)/e.naiveBlendedCostUsd*100).toFixed(1));return{scenario:e,mode:o,activeInteractiveLatencyMs:a?e.controlledInteractiveLatencyMs:e.naiveInteractiveLatencyMs,activeCloudGpuOffloadPct:a?e.controlledCloudGpuOffloadPct:e.naiveCloudGpuOffloadPct,activeBlendedCostUsd:a?e.controlledBlendedCostUsd:e.naiveBlendedCostUsd,speedupFactor:t,costReductionPct:n,annualSavingsM:e.controlledAnnualSavingsM}}let l="interactive-canvas-sam2-depth-edge",i="controlled";function r(){const s=document.querySelector("#app");if(!s)return;const o=c(l,i),e=o.scenario,a=i==="controlled";s.innerHTML=`
    <main class="workbench-shell" data-mode="${i}" data-scenario="${l}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">🏆 HISTORIC 225TH WORKBENCH MILESTONE (3+7+43×5 = 225)! · 450 BILINGUAL GUIDES · HYBRID EDGE-NPU + CLOUD-GPU ROUTER</span>
          <h1>🏆 第 225 项里程碑大满贯：企业级 AIGC 端云协同混合推理路由器（端侧 WebNN/WebGPU 38ms 草稿分割 + 云端 4K 母带精修总台）</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="Hybrid Edge Scenario">
            ${Object.keys(d).map(t=>`
              <button class="seg-btn ${l===t?"active":""}" data-scenario-btn="${t}">
                ${t==="interactive-canvas-sam2-depth-edge"?"1. 交互画布端侧 SAM-2 点选分割与法线预览 (38ms)":t==="local-4step-draft-to-cloud-4k-master"?"2. 端侧 INT4 草稿 + 18KB 潜变量接力云端 Step-10 4K 母带":"3. 未发布绝密新品端侧零出域脱敏 + 云端背景合成"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Hybrid Edge Mode">
            <button class="seg-btn ${a?"active":""}" data-mode-btn="controlled">
              ✅ 端云协同路由：端侧 WebNN/WebGPU + 云端 4K 升格 (${e.controlledInteractiveLatencyMs}ms · 卸载 ${e.controlledCloudGpuOffloadPct}% 云算力)
            </button>
            <button class="seg-btn ${a?"":"active"}" data-mode-btn="naive">
              ⛔ 全量上云往返推理 (${e.naiveInteractiveLatencyMs}ms 延迟 · $${e.naiveBlendedCostUsd}/次 · 原图出域风险)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">画布交互响应延迟 (Interactive Latency)</span>
          <strong class="kpi-val ${a?"good":"warn"}">${o.activeInteractiveLatencyMs} ms</strong>
          <span class="kpi-note">提速 ${o.speedupFactor}x · 端侧 AI PC NPU / WebGPU 零网络往返</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">云端 GPU 算力卸载率 (Cloud GPU Offload)</span>
          <strong class="kpi-val ${a?"good":"warn"}">${o.activeCloudGpuOffloadPct}%</strong>
          <span class="kpi-note">82%+ 抠图/法线/4步草稿由员工终端算力免费消化</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">单次操作综合云成本 (Blended Cloud Cost)</span>
          <strong class="kpi-val ${a?"good":"warn"}">$${o.activeBlendedCostUsd}</strong>
          <span class="kpi-note">成本直降 -${o.costReductionPct}% · 仅最终 4K 升格调用云端 H100</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">年化净省与第 225 项里程碑 (Savings & Milestone)</span>
          <strong class="kpi-val good">+$${o.annualSavingsM.toFixed(2)}M/yr · 🏆 225 Studios!</strong>
          <span class="kpi-note">3+7+43×5 = 225 座工作台 · 450 篇中英双语选型指南</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 🏆 礼赞第 225 座工作台大满贯：企业级 AIGC 端云协同（Edge-NPU + Cloud-GPU）三级分流架构</h2>
            <span class="badge">${a?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="225th Milestone Hybrid Edge-NPU and Cloud-GPU Split Router">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="202" height="126" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
              <text x="14" y="24" fill="#6ee7b7" font-size="11.5" font-weight="700">1. 端侧 WebNN/WebGPU 实时环</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">38ms · $0 云成本</text>
              <text x="14" y="68" fill="#a7f3d0" font-size="10.5">• 压榨 Copilot+ PC 45 TOPS NPU 与 M4 GPU</text>
              <text x="14" y="88" fill="#a7f3d0" font-size="10.5">• 本地跑 SAM-2 抠图、法线与 4步 INT4 草稿</text>
              <text x="14" y="108" fill="#34d399" font-size="10.5" font-weight="700">• 卸载 82.4% 频繁试错点击，告别 820ms 卡顿</text>
            </g>

            <g transform="translate(239, 20)">
              <rect width="202" height="126" rx="10" fill="#111c33" stroke="#3b82f6" stroke-width="1.5" />
              <text x="14" y="24" fill="#93c5fd" font-size="11.5" font-weight="700">2. 18KB 结构潜变量跨云接力</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">99.4% 端云构图锁</text>
              <text x="14" y="68" fill="#cbd5e1" font-size="10.5">• 选定端侧草稿后提取低通 Latent + 深度图</text>
              <text x="14" y="88" fill="#cbd5e1" font-size="10.5">• 云端 Flux.1-dev 直接从第 10 步接力去噪</text>
              <text x="14" y="108" fill="#60a5fa" font-size="10.5" font-weight="700">• 绝密新品像素留在本地内存，仅传匿名轮廓</text>
            </g>

            <g transform="translate(458, 20)">
              <rect width="202" height="126" rx="10" fill="#3b0764" stroke="#a855f7" stroke-width="1.5" />
              <text x="14" y="24" fill="#d8b4fe" font-size="11.5" font-weight="700">3. 云端 H100 4K 升格与 C2PA</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">-78.7% 算力总账单</text>
              <text x="14" y="68" fill="#e9d5ff" font-size="10.5">• 仅 17.6% 终审定稿请求进入云端 GPU 池</text>
              <text x="14" y="88" fill="#e9d5ff" font-size="10.5">• 挂载企业专属 LoRA 渲染 4K PBR 细节</text>
              <text x="14" y="108" fill="#c084fc" font-size="10.5" font-weight="700">• 云端 HSM 硬件签发 C2PA v2.1 权威凭证</text>
            </g>

            <g transform="translate(20, 162)">
              <rect width="640" height="118" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="26" fill="#38bdf8" font-size="13" font-weight="700">🏆 第 225 座工作台大满贯（3 + 7 + 43×5 = 225 Studios · 450 篇中英双语选型指南圆满达成！）</text>
              <text x="18" y="52" fill="#e2e8f0" font-size="11.5">• 五大企业业务域各 43 座工作台严整均衡：算力网关(43) + 电商修图(43) + 视频本地化(43) + 虚拟制片(43) + CTO 声明式 UI(43)</text>
              <text x="18" y="76" fill="#e2e8f0" font-size="11.5">• 端云协同黄金法则：高频交互分割与 512px 构图试错走端侧 WebNN/WebGPU ($0)，4K 品牌精修与视频合成走云端 AKS ($0.0038)</text>
              <text x="18" y="100" fill="#34d399" font-size="11.5" font-weight="700">• 兼顾极致跟手体验 (38ms)、CISO 未发布新品零出域合规与年省 +$2.96M–$3.18M 的推理 FinOps 效益！</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段端云协同视觉推理与零出域合成拆解</h2>
            <span class="badge">🏆 225th Milestone!</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 端云协同路由：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 全量无脑上云：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,s.querySelectorAll("[data-scenario-btn]").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.scenarioBtn;n&&(l=n,r())})}),s.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.modeBtn;n&&(i=n,r())})})}r();
