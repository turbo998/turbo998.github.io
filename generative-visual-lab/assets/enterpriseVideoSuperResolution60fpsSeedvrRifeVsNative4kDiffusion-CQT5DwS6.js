import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"retail-led-flagship-4k60":{id:"retail-led-flagship-4k60",titleZh:"线下旗舰店 LED 巨幕与电视广告 4K 60fps 母带管线（720p24 生成 → RIFE 插帧 → SeedVR 时序超分）",titleEn:"Retail Flagship LED Wall & Broadcast TVC 4K 60fps Mastering (720p24 -> RIFE -> SeedVR)",subtitleZh:"对比“强行在扩散模型里原生直出 4K60（3D 全注意力算力暴增 1,600 倍导致显存 OOM 或单条耗时 42分钟）”与“720p24 黄金感受野生成 + RIFE v4.22 光流插帧 + SeedVR/VEnhancer 时序窗口超分（40.2秒出片，$0.058/条）”",subtitleEn:"Compares Native 4K60 Video Diffusion (1,600x quadratic attention explosion, OOM or 42-min render) vs. 720p24 Base DiT + RIFE v4.22 60fps + SeedVR Temporal 4K VSR (40.2s total, $0.058/clip)",monthlyVideos:25e3,controlledStack:"720p24 Wan 2.1 Base + RIFE v4.22 TensorRT 60fps + SeedVR Temporal 4K VSR ($0.058/clip)",naiveStack:"Tiled Native 4K Diffusion or Commercial Cloud 4K Video Upscaler SaaS ($1.12/clip · 420s Latency)",controlledTemporalStabilityPct:99.2,naiveTemporalStabilityPct:68.5,controlledRenderLatencySec:40.2,naiveRenderLatencySec:420,controlledCostPerClipUsd:.058,naiveCostPerClipUsd:1.12,controlledVramPeakGb:22.4,naiveVramPeakGb:79.8,controlledAnnualSavingsM:.96,decisionSummaryZh:"为什么绝对不能让 3D 全注意力视频大模型（Wan 2.1 / HunyuanVideo）直接生成 4K 60fps 视频？因为从 720p 24fps 升到 4K 60fps，时空 Token 数量暴增 $9 	imes 2.5 = 22.5$ 倍，而自注意力复杂度 $O(N^2)$ 会恐怖地膨胀 **506 倍**！不仅单张 80GB H100 直接显存溢出（OOM），而且脱离了模型预训练的 720p 感受野后，画面会出现“双头人物、多条腿”的致命畸变。业界黄金标准是 **“时空解耦三级火箭”**：① 先在模型最甜点的 `720p 24fps` 分辨率下生成语义与运镜完美的母片（32s）；② 用 `RIFE v4.22 TensorRT` 在 `1.4s` 内完成场景切点感知的光流插帧至 `60fps`；③ 用 `SeedVR / VEnhancer` 滑动窗口时序超分在 `6.8s` 内还原无闪烁 4K 纹理，总耗时仅 40.2 秒（快 10.4 倍），单条成本从 $1.12 降至 $0.058！",decisionSummaryEn:"Increasing resolution from 720p24 to 4K60 multiplies spatiotemporal tokens by 22.5x and quadratic 3D self-attention $O(N^2)$ compute by **506x**—causing 80GB H100 OOMs and breaking the model spatial receptive field (multi-limb artifacts). Decoupling generation into (1) `720p24` base DiT synthesis (`32s`), (2) `RIFE v4.22 TensorRT` cut-aware `60fps` optical-flow interpolation (`1.4s`), and (3) `SeedVR / VEnhancer` temporal `4K` super-resolution (`6.8s`) delivers 99.2% temporal stability in 40.2s at $0.058/clip (-94.8% cost).",stages:[{stage:"1. Optimal-Receptive-Field Base Gen",controlledEngine:"Wan 2.1 / HunyuanVideo at Native 720p 24fps Sweet Spot (22GB VRAM)",naiveBehavior:"Forced 4K Latent Diffusion -> 80GB OOM & Multi-Head Artifacts",metricImpact:"100% Global Anatomy & Motion Coherence"},{stage:"2. Cut-Aware 60fps Interpolation",controlledEngine:"PySceneDetect Cut Gate + RIFE v4.22 TensorRT (1.4s for 300 Frames)",naiveBehavior:"Blind Optical-Flow Across Hard Cuts (Ghosting Morph Frames)",metricImpact:"Zero Scene-Cut Ghosting at 60fps"},{stage:"3. Temporal 4K Super-Resolution",controlledEngine:"SeedVR / VEnhancer 8-Frame Sliding-Window Bi-Directional VSR",naiveBehavior:"Single-Frame Real-ESRGAN (Severe 60Hz Texture Boiling)",metricImpact:"99.2% vs 68.5% Temporal Stability"},{stage:"4. High-Bitrate ProRes / HEVC Master",controlledEngine:"NVENC 10-bit HEVC / ProRes 422 HQ + Film Grain Injection",naiveBehavior:"Over-Smoothed 8-bit Banding on Retail LED Walls",metricImpact:"$0.058 vs $1.12/Clip (+$0.96M/Yr)"}]},"fashion-fabric-close-up":{id:"fashion-fabric-close-up",titleZh:"高定服饰面料与美妆肌肤 4K 微距超分（消除逐帧 Real-ESRGAN 的“60Hz 蚂蚁噪点沸腾”）",titleEn:"Haute Couture Fabric & Skin Macro 4K VSR (Eliminating Single-Frame Real-ESRGAN Boiling)",subtitleZh:"对比“把图片超分模型 Real-ESRGAN 逐帧套在视频上（羊毛纹路与毛孔每秒闪烁 60 次像蚂蚁爬）”与“双向光流对齐时序 VSR (BasicVSR++ / SeedVR) + 商品原图 4K 局部高频纹理锁”",subtitleEn:"Compares Single-Frame Real-ESRGAN (60Hz fabric/skin texture boiling) vs. Bi-Directional Optical-Flow VSR (SeedVR / BasicVSR++) + Original 4K SKU Texture Guidance",monthlyVideos:4e4,controlledStack:"Bi-Directional Flow VSR (SeedVR) + Reference SKU 4K Texture Injection ($0.045/clip)",naiveStack:"Frame-by-Frame Independent 2D Real-ESRGAN / SwinIR Upscaling ($0.025/clip + 54% Reject Rate)",controlledTemporalStabilityPct:99.5,naiveTemporalStabilityPct:58,controlledRenderLatencySec:28.5,naiveRenderLatencySec:95,controlledCostPerClipUsd:.045,naiveCostPerClipUsd:.65,controlledVramPeakGb:18.5,naiveVramPeakGb:42,controlledAnnualSavingsM:.88,decisionSummaryZh:"许多初级工程师在给 AI 视频做 4K 放大时，直接写个循环把视频拆成 300 张 PNG、逐张调用图片超分模型 `Real-ESRGAN` 再拼回 MP4——结果在 4K 显示器上一播放，衣服的针织纹理、人物头发丝和草地背景就像“沸腾的开水或密密麻麻爬动的蚂蚁”一样剧烈闪烁！因为单帧图片超分模型在第 $t$ 帧和第 $t+1$ 帧脑补出的高频噪点位置完全独立不相关。必须采用基于**双向光流特征传播（Bi-Directional Optical-Flow Propagation）的专用视频超分模型（`SeedVR` / `VEnhancer` / `BasicVSR++`）**，跨帧共享同一个高频纹理潜变量，时序稳定度从 58.0% 跃升至 99.5%！",decisionSummaryEn:"Running a 2D image upscaler (`Real-ESRGAN`) frame-by-frame on a video causes severe **60Hz texture boiling** because high-frequency details (fabric weave, hair strands, skin pores) are hallucinated independently on every frame. Using a **Bi-Directional Optical-Flow Video Super-Resolution (`SeedVR` / `VEnhancer`)** model propagates a consistent high-frequency latent across the temporal trajectory, lifting temporal stability from 58.0% to 99.5%.",stages:[{stage:"1. Bi-Directional Flow Alignment",controlledEngine:"RAFT Warps Neighboring Frames [t-4..t+4] into Shared Feature Grid",naiveBehavior:"Each Frame Upscaled in Isolation (Zero Temporal Memory)",metricImpact:"99.5% vs 58.0% Temporal Stability"},{stage:"2. Reference 4K SKU Texture Guide",controlledEngine:"Cross-Attention to Merchant 4K Studio Photo for Exact Weave/Logo",naiveBehavior:"Hallucinates Fake Fabric Weave Unrelated to Real Garment",metricImpact:"100% True Garment Micro-Texture"},{stage:"3. Skin & Specular Frequency Split",controlledEngine:"Preserves Natural Subsurface Skin Pores Without Over-Sharpening Halo",naiveBehavior:"GAN Ringing Artifacts & Plastic Over-Sharpened Edges",metricImpact:"Broadcast-Grade Natural Skin Tone"},{stage:"4. Overlapping Tile TensorRT Engine",controlledEngine:"512x512 Cosine-Feathered Tile Blending in FP16 TensorRT",naiveBehavior:"Visible Grid Seam Lines Across 4K Frame",metricImpact:"0.0px Tile Seam · $0.045/Clip"}]},"multi-cut-social-commercial":{id:"multi-cut-social-commercial",titleZh:"多镜头快剪营销混剪成片 60fps 插帧与超分（硬切转场防鬼影门控 + 矢量字幕后置）",titleEn:"Multi-Cut Fast-Paced Ad Compilation 60fps & 4K Pipeline (Scene-Cut Ghost Guard + Post-VSR Vector HUD)",subtitleZh:"针对包含 8–12 个快切镜头的广告成片“直接跑光流插帧会在转场处产生半人半车的恶心融化帧、且超分把字幕边缘糊成重影”：坚持“先分镜拆条超分插帧，最后叠加 4K 矢量字幕”",subtitleEn:"Prevents optical-flow morph monsters across hard scene cuts and blurry upscaled text: Split by Scene Cut -> VSR + RIFE per Shot -> Composite 4K Vector Text Last",monthlyVideos:35e3,controlledStack:"PySceneDetect Shot Split -> Per-Shot RIFE + SeedVR -> Post-Upscale 4K Remotion Vector Overlay ($0.052)",naiveStack:"Running RIFE + Upscaler on Final Flattened MP4 with Baked Subtitles ($0.85/clip)",controlledTemporalStabilityPct:99.6,naiveTemporalStabilityPct:61.2,controlledRenderLatencySec:34,naiveRenderLatencySec:310,controlledCostPerClipUsd:.052,naiveCostPerClipUsd:.85,controlledVramPeakGb:20,naiveVramPeakGb:64,controlledAnnualSavingsM:1.02,decisionSummaryZh:"在多镜头广告后期管线中有两条铁律：① **绝对禁止跨越镜头硬切点（Hard Cut）做光流插帧或时序超分**——如果第 48 帧是特写人脸、第 49 帧切到全景汽车，直接跑 RIFE 会在中间插出一帧“人脸和汽车融化在一起”的恐怖鬼影帧！必须先用 `PySceneDetect` 按切点拆成独立单镜头（Shot）分别插帧超分，再无损合流；② **绝对禁止对已经压好字幕和 Logo 的成片做 AI 超分**——AI 超分会把锐利的文字边缘涂抹出油画果冻感，必须在 4K60 画面超分完成后，在最顶层直接渲染原生 4K 矢量字幕与角标！",decisionSummaryEn:"Two golden rules for multi-shot ad mastering: (1) **Never run optical-flow interpolation (`RIFE`) or temporal VSR across hard scene cuts**—interpolating between Frame 48 (a human face) and Frame 49 (a sports car) synthesizes a grotesque half-face/half-car morph frame; always split shots via `PySceneDetect` first. (2) **Never upscale baked-in subtitles**—render `Remotion / SVG` typography natively at 4K *after* video super-resolution.",stages:[{stage:"1. Automated Shot Boundary Split",controlledEngine:"PySceneDetect / TransNetV2 Splits Compilation into Atomic Shots",naiveBehavior:"Runs Optical Flow Blindly Across 12 Hard Cuts",metricImpact:"Zero Cross-Cut Morph Monsters"},{stage:"2. Parallel Per-Shot RIFE + VSR",controlledEngine:"Dispatches 12 Shots in Parallel Across Multi-GPU TensorRT Workers",naiveBehavior:"Sequential Single-Stream Processing (310s Bottleneck)",metricImpact:"34.0s vs 310.0s Wall-Clock Time"},{stage:"3. Post-VSR Native 4K Vector Layer",controlledEngine:"Composites Native 3840x2160 Remotion Subtitles & Brand Logo Last",naiveBehavior:"Upscales 720p Baked Subtitles (Wobbly Jelly Text Edges)",metricImpact:"100% Razor-Sharp 4K Typography"},{stage:"4. Multi-Bitrate ABR Ladder",controlledEngine:"Simultaneous 4K60 Master + 1080p60 TikTok + 720p Preview",naiveBehavior:"Separate Redundant Upscale Runs per Social Platform",metricImpact:"$0.052 vs $0.85/Clip (+$1.02M/Yr)"}]}};function d(n,a="controlled"){const e=c[n],i=a==="controlled";return{scenario:e,mode:a,activeTemporalStabilityPct:i?e.controlledTemporalStabilityPct:e.naiveTemporalStabilityPct,activeRenderLatencySec:i?e.controlledRenderLatencySec:e.naiveRenderLatencySec,activeCostPerClipUsd:i?e.controlledCostPerClipUsd:e.naiveCostPerClipUsd,activeVramPeakGb:i?e.controlledVramPeakGb:e.naiveVramPeakGb,stabilityGainPts:Number((e.controlledTemporalStabilityPct-e.naiveTemporalStabilityPct).toFixed(1)),speedupFactor:Number((e.naiveRenderLatencySec/e.controlledRenderLatencySec).toFixed(1)),annualSavingsM:e.controlledAnnualSavingsM}}let o="retail-led-flagship-4k60",s="controlled";function r(){const n=document.querySelector("#app");if(!n)return;const a=d(o,s),e=a.scenario,i=s==="controlled";n.innerHTML=`
    <main class="workbench-shell" data-mode="${s}" data-scenario="${o}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">211TH WORKBENCH · DOMAIN 2 · ENTERPRISE 4K 60FPS VIDEO SUPER-RESOLUTION & INTERPOLATION STUDIO</span>
          <h1>企业级 4K 60fps 商业视频超分与插帧选型工作台：720p24 生成 + RIFE 光流插帧 + SeedVR 时序超分 vs 原生 4K 扩散 / Real-ESRGAN</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="Upscale Scenario">
            ${Object.keys(c).map(t=>`
              <button class="seg-btn ${o===t?"active":""}" data-scenario-btn="${t}">
                ${t==="retail-led-flagship-4k60"?"1. 旗舰店 LED 巨幕 4K60 母带 (720p24→RIFE→SeedVR)":t==="fashion-fabric-close-up"?"2. 高定面料/肌肤微距 (消除 Real-ESRGAN 60Hz 沸腾)":"3. 多镜头快剪广告 (PySceneDetect 切点防鬼影 + 后置 4K 字幕)"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Pipeline Mode">
            <button class="seg-btn ${i?"active":""}" data-mode-btn="controlled">
              ✅ 720p24 甜点生成 + 切点 RIFE + SeedVR 时序超分 ($${e.controlledCostPerClipUsd}/条)
            </button>
            <button class="seg-btn ${i?"":"active"}" data-mode-btn="naive">
              ⛔ 原生 4K 扩散直出 / 逐帧 Real-ESRGAN ($${e.naiveCostPerClipUsd}/条 · 闪烁或 OOM)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">跨帧纹理稳定度 (Temporal Texture Stability)</span>
          <strong class="kpi-val ${i?"good":"warn"}">${a.activeTemporalStabilityPct}%</strong>
          <span class="kpi-note">净增 +${a.stabilityGainPts} pts · 根治 60Hz 织物/毛孔蚂蚁噪点沸腾</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">4K 60fps 端到端出片耗时 (4K60 Turnaround)</span>
          <strong class="kpi-val ${i?"good":"warn"}">${a.activeRenderLatencySec} s</strong>
          <span class="kpi-note">提速 ${a.speedupFactor}x · 规避 O(N²) 506倍注意力爆炸</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">峰值显存占用 (Peak GPU VRAM)</span>
          <strong class="kpi-val ${i?"good":"warn"}">${a.activeVramPeakGb} GB</strong>
          <span class="kpi-note">单张 24GB L40S/A10G 即可跑通 vs 80GB H100 OOM</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">单条 4K60 成本与年省 (Unit Cost & Savings)</span>
          <strong class="kpi-val good">$${a.activeCostPerClipUsd.toFixed(3)} · +$${a.annualSavingsM.toFixed(2)}M/yr</strong>
          <span class="kpi-note">4K 矢量字幕与品牌角标后置合成 100% 锐利</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 为什么视频 DiT 绝不能直接生成 4K60？三级时空解耦流水线（720p24 → 切点 RIFE → SeedVR 时序超分）</h2>
            <span class="badge">${i?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="4K60 Video Super-Resolution and Frame Interpolation Pipeline">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="198" height="122" rx="10" fill="#111c33" stroke="#10b981" stroke-width="1.5" />
              <text x="14" y="24" fill="#6ee7b7" font-size="11.5" font-weight="700">Stage 1: 720p24 甜点生成 (32s)</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">Wan 2.1 / HunyuanVideo</text>
              <text x="14" y="68" fill="#cbd5e1" font-size="10.5">• 严格匹配预训练感受野 (无双头畸变)</text>
              <text x="14" y="86" fill="#cbd5e1" font-size="10.5">• 仅需 22.4 GB 显存，注意力开销 1x</text>
              <text x="14" y="104" fill="#34d399" font-size="10.5" font-weight="700">• PySceneDetect 切分独立单镜头</text>
            </g>

            <g transform="translate(241, 20)">
              <rect width="198" height="122" rx="10" fill="#111c33" stroke="#3b82f6" stroke-width="1.5" />
              <text x="14" y="24" fill="#93c5fd" font-size="11.5" font-weight="700">Stage 2: 切点隔离插帧 (1.4s)</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">RIFE v4.22 TensorRT</text>
              <text x="14" y="68" fill="#cbd5e1" font-size="10.5">• 24fps → 60fps 双向光流运动估计</text>
              <text x="14" y="86" fill="#cbd5e1" font-size="10.5">• 硬切转场帧自动跳过插帧 (零鬼影)</text>
              <text x="14" y="104" fill="#60a5fa" font-size="10.5" font-weight="700">• 300 帧仅耗时 1.4 秒 ($0.002)</text>
            </g>

            <g transform="translate(462, 20)">
              <rect width="198" height="122" rx="10" fill="#3b0764" stroke="#a855f7" stroke-width="1.5" />
              <text x="14" y="24" fill="#d8b4fe" font-size="11.5" font-weight="700">Stage 3: 时序超分 + 4K 压字 (6.8s)</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">SeedVR / VEnhancer 4K</text>
              <text x="14" y="68" fill="#e9d5ff" font-size="10.5">• 8帧滑动窗口双向光流传播高频细节</text>
              <text x="14" y="86" fill="#e9d5ff" font-size="10.5">• 彻底消除 Real-ESRGAN 单帧闪烁</text>
              <text x="14" y="104" fill="#c084fc" font-size="10.5" font-weight="700">• 超分后叠加原生 4K Remotion 字幕</text>
            </g>

            <g transform="translate(20, 160)">
              <rect width="640" height="120" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="26" fill="#38bdf8" font-size="13" font-weight="700">4K 60fps 商业成片后期三大避坑铁律 (4K60 Production Guardrails)</text>
              <text x="18" y="52" fill="#fca5a5" font-size="11.5">⛔ 忌用单帧图片超分 (Real-ESRGAN): 相邻帧独立脑补高频噪点，导致织物/草地/毛孔在 60Hz 下像沸水一样闪烁</text>
              <text x="18" y="76" fill="#fca5a5" font-size="11.5">⛔ 忌跨转场硬切插帧: 未经 PySceneDetect 拆条直接跑 RIFE，会在镜头切换处合成“半张人脸半辆汽车”的融化帧</text>
              <text x="18" y="100" fill="#34d399" font-size="11.5" font-weight="700">✅ 字幕与角标后置合成: 永远先对无字干净画面 (Clean Plate) 做 4K 超分，最后一步再叠加 3840×2160 矢量文字层</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段 4K 60fps 时空解耦母带流水线拆解</h2>
            <span class="badge">Zero 60Hz Boiling</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 时序超分管线：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 粗放直出/单帧基线：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,n.querySelectorAll("[data-scenario-btn]").forEach(t=>{t.addEventListener("click",()=>{const l=t.dataset.scenarioBtn;l&&(o=l,r())})}),n.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const l=t.dataset.modeBtn;l&&(s=l,r())})})}r();
