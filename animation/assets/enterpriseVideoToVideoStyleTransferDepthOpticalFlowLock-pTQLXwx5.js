import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"live-action-to-anime-ink-tvc":{id:"live-action-to-anime-ink-tvc",titleZh:"手机实拍视频转国潮水墨/2.5D 动漫广告片：Wan-VACE Depth+Lineart 双锁 + 光流笔触锚定（第 228 项工作台）",titleEn:"Live-Action to 2.5D Anime / Watercolor Ink TVC: Wan-VACE Depth+Lineart Lock + Optical-Flow Brushstroke Pinning (228th Studio)",subtitleZh:"对比“逐帧跑图像 ControlNet（笔触与阴影 24Hz 剧烈闪烁，稳定度仅 62%）”与“81帧 3D 视频 DiT (Wan-VACE) + RAFT 光流潜空间笔触传播（99.3% 时序丝滑 · $0.054/条）”",subtitleEn:"Compares Frame-by-Frame Image ControlNet (24Hz brushstroke boiling, 62.0% stability) vs. 81-Frame Wan-VACE 3D Video DiT + RAFT Optical-Flow Latent Brush Pinning (99.3% coherence · $0.054/clip)",controlledStack:"Wan-VACE 81f 3D DiT + Depth/AnyLine Dual Lock + RAFT Flow Latent Smooth ($0.054/Clip)",naiveStack:"Per-Frame SDXL/Flux ControlNet or Unconstrained High-Denoise V2V ($1.60/Clip · 38% Flicker)",controlledTemporalCoherencePct:99.3,naiveTemporalCoherencePct:62,controlledPropMutationPct:0,naivePropMutationPct:36.8,controlledCostPerClipUsd:.054,naiveCostPerClipUsd:1.6,controlledAnnualSavingsM:1.88,decisionSummaryZh:"品牌市场部和动画工作室非常喜欢“用手机实拍一段真人演员动作，再用 AI 转绘成国潮水墨风、新海诚动漫风或粘土定格动画风（Video-to-Video Stylization）”——比传统纯手绘二维动画节省 90% 工期！但如果用早期的逐帧 `SDXL/Flux ControlNet` 或短窗口 `AnimateDiff` 转绘，衣服上的水墨笔触和赛璐璐阴影每一帧都在独立乱跳（**24Hz 笔触沸腾闪烁，时序稳定度仅 62.0%**）；而如果调高商业 V2V 模型（`Runway V2V / Sora Remix`）的重绘幅度（Denoise > 0.65），虽然不闪了，但演员的脸型和动作节奏全变了！架构师必须采用 **“81帧 3D 因果视频 DiT (`Wan 2.1-VACE`) + Depth/AnyLine 双结构锁 + RAFT 光流高频残差粘附”**：用 16-bit 深度图与柔性线稿锁住 100% 动作卡点，并将首帧生成的水墨/宣纸高频肌理沿光流场跨帧粘附在物体表面（Surface-Pinned Texture Advection），达成 **99.3% 电影级时序连贯**，单条 5 秒成片仅需 **`$0.054`（年省 `+$1.88M`）**！",decisionSummaryEn:"Converting smartphone live-action reference videos into 2.5D Anime, Watercolor Ink, or Claymation TVCs cuts traditional 2D cel-animation schedules by 90%. However, frame-by-frame image ControlNets suffer from severe **24Hz brushstroke boiling (`62.0%` temporal coherence)**, while high-denoise unconstrained V2V APIs warp actor choreography and facial identity. Our **81-Frame `Wan 2.1-VACE` + `Depth/AnyLine` Dual Lock + `RAFT` Optical-Flow Texture Advection Pipeline** pins stylized brushstrokes and cel-shading boundaries directly onto moving 3D surfaces—achieving **99.3% temporal coherence at `$0.054/clip` (`+$1.88M/yr` saved)**.",stages:[{stage:"1. Depth + AnyLine Dual Structural Lock",controlledEngine:"16-Bit DepthAnythingV2 + AnyLine Soft Contour Preserves Motion Timing",naiveBehavior:"Hard Canny Edges Lock In Smartphone Compression Noise",metricImpact:"100% Choreography Fidelity"},{stage:"2. 81-Frame 3D Spatiotemporal DiT",controlledEngine:"Wan 2.1-VACE Jointly Attends Across 81 Frames in 3D Latent Space",naiveBehavior:"Per-Frame 2D Diffusion Re-Rolls Shadow Boundaries Every Frame",metricImpact:"99.3% vs 62.0% Temporal Coherence"},{stage:"3. Optical-Flow Brushstroke Advection",controlledEngine:"Warps High-Frequency Paper/Ink Grain Along RAFT Flow Vectors",naiveBehavior:"Static Screen-Space Grain Looks Like a Dirty Camera Lens",metricImpact:'Zero "Shower-Door" Texture Slip'},{stage:"4. Style LoRA + IP-Adapter Weight Schedule",controlledEngine:"Applies Strong Style Guidance on Steps 1–12 & Locks Structure 13–25",naiveBehavior:"Constant High Style Guidance Melts Actor Facial Features",metricImpact:"$0.054 vs $1.60/Clip (+$1.88M/Yr)"}]},"clay-blockout-to-photoreal-cg":{id:"clay-blockout-to-photoreal-cg",titleZh:"Blender / Unreal 无贴图白模动画（Gray-Clay Blockout）一键转照片级次世代 CG 宣传片",titleEn:"Untextured Blender/UE5 Gray-Clay Animation to Photorealistic Next-Gen CG Trailer",subtitleZh:"解决 3D 团队耗时 3周为每个资产手工展 UV、画 Substance 贴图与打灯光痛点：直接从 Blender EEVEE 秒级导出无贴图白模法线/深度通道，驱动 Wan-VACE 生成电影级真实材质与天气光影",subtitleEn:"Eliminates 3 weeks of manual UV unwrapping and Substance texturing for previs trailers: exports 60fps Blender EEVEE clay Normal/Depth passes to drive Wan-VACE photoreal CG synthesis",controlledStack:"Blender EEVEE Clay Normal/Depth Pass + Wan-VACE Material Synthesis ($0.065/Clip · 18s)",naiveStack:"Manual UV Unwrapping + Substance Painter Texturing + Cycles Path Tracing ($450/Shot · 3 Days)",controlledTemporalCoherencePct:99.6,naiveTemporalCoherencePct:68,controlledPropMutationPct:0,naivePropMutationPct:28.5,controlledCostPerClipUsd:.065,naiveCostPerClipUsd:1.85,controlledAnnualSavingsM:2.42,decisionSummaryZh:"在游戏过场动画、建筑漫游和工业宣传片制作中，3D 动画师花 2 小时就能在 Blender 或 Unreal 里摆好简单的 **“无贴图白模几何体与摄影机运镜（Gray-Clay Previs）”**，但接下来要把它变成照片级成片，传统流程需要花 **2–3 周手工展 UV、画材质贴图和离线光追渲染**！通过 **“3D 引擎确定性 G-Buffer（Depth + World Normal + Object ID）直通 `Wan-VACE` 视频重材质管线”**：因为白模导出的是 100% 零噪声的数学精确深度与法线贴图（而非单目估算出来的模糊深度），视频大模型在赋予防锈金属、雨夜霓虹积水与体积雾时拥有极其稳固的几何锚点，**时序稳定度高达 `99.6%`**，18 秒即可把一段粗糙白模变成好莱坞级 CG 预告片！",decisionSummaryEn:"In game trailers and architectural visualization, blocking out untextured gray-clay geometry and camera paths in Blender/UE5 takes 2 hours, whereas manual UV unwrapping, Substance texturing, and path-traced rendering take 3 weeks. By exporting **exact engine-native Depth, World-Normal, and Object-ID buffers (`0.0` estimation noise)** from Blender EEVEE at 60fps and feeding them into **`Wan 2.1-VACE` conditioned on material reference swatches**, we synthesize photorealistic weathered metal, wet asphalt reflections, and volumetric lighting in **`18s` with `99.6%` temporal stability (`$0.065/clip`, saving `+$2.42M/yr`)**.",stages:[{stage:"1. Engine-Exact G-Buffer Export",controlledEngine:"Exports True 32-Bit EXR Depth, Normal & Cryptomatte IDs from EEVEE",naiveBehavior:"Renders Clay RGB Video Then Runs Noisy Monocular Depth Estimator",metricImpact:"99.6% vs 68.0% Edge Lock"},{stage:"2. Cryptomatte Per-Object Material Bind",controlledEngine:'Assigns "Brushed Titanium" to ID #1 & "Wet Cobblestone" to ID #2',naiveBehavior:"Global Prompt Bleeds Rust Texture onto Glass Windows",metricImpact:"0.0% Cross-Object Material Bleed"},{stage:"3. Analytical Camera Motion Vector Warp",controlledEngine:"Feeds True 3D Engine Motion Vectors to Temporal Attention Layer",naiveBehavior:"Optical Flow Fails on Fast Whip-Pans & Motion Blur",metricImpact:"Zero Whip-Pan Ghosting"},{stage:"4. Rapid Director Lighting Iteration",controlledEngine:"Swaps HDRI Prompt (Noon -> Cyberpunk Rain -> Golden Hour) in 18s",naiveBehavior:"Re-Baking Global Illumination in Cycles Takes 6 Hours per Shot",metricImpact:"$0.065 vs $1.85 (+$2.42M/Yr)"}]},"branded-prop-logo-shield-v2v":{id:"branded-prop-logo-shield-v2v",titleZh:"商业广告 V2V 转绘中的“真品商品与品牌 Logo 刚性保护罩（SAM-2 Prop Shield + 1D LUT 调色融合）”",titleEn:'Commercial V2V Stylization with "SAM-2 Branded SKU Shield + 1D LUT Style Harmonization"',subtitleZh:"解决把真人手拿饮料罐/手机的实拍视频转成动漫/油画风时“演员手里的真实商品包装与品牌 Logo 也被画歪融化（36.8% 商品损毁）”痛点：用 SAM-2 抠出商品仅做色彩曲线风格匹配，100% 锁死真实商品商标",subtitleEn:"Solves 36.8% melted product packaging and garbled brand logos during V2V stylization: shields the held SKU via SAM-2 and applies a deterministic 1D LUT + rim-light toon shader so the logo stays 100% intact",controlledStack:"SAM-2 SKU Shield (100% Logo Lock) + Stylized Environment V2V + 1D Toon LUT ($0.048/Clip)",naiveStack:"Full-Frame V2V Stylization Over Actor & Held Product ($1.45/Clip · 36.8% Logo Melted)",controlledTemporalCoherencePct:99.5,naiveTemporalCoherencePct:64.5,controlledPropMutationPct:0,naivePropMutationPct:36.8,controlledCostPerClipUsd:.048,naiveCostPerClipUsd:1.45,controlledAnnualSavingsM:2.12,decisionSummaryZh:"为什么快消品（可口可乐、瑞幸、美妆、手机）客户看中了 AI 动漫/水彩转绘视频的创意，最后法务部却不让上线？因为如果对整幅画面做无差别的 V2V 风格化转绘，演员手里拿的饮料罐、口红管和上面的品牌商标也会被扩散模型重绘成 **扭曲变形的假 Logo（36.8% 商品包装损毁率）**！我们的核心法宝是 **“SAM-2 商品刚性保护罩 + 确定性风格化滤镜桥接（SKU Alpha Shield + Deterministic Toon/Ink LUT）”**：① `SAM-2` 实时追踪演员手中的真实商品掩码 $M_{	ext{SKU}}(t)$；② 背景与演员走 `Wan-VACE` 变成绚丽的国潮动漫风；③ 手中的真实商品 **绝不经过扩散去噪（100% 像素级保留真实商标文字）**，而是单独经过一层确定性的 **1D 色阶量化与 Sobel 矢量描边滤镜（Deterministic Cel-Shading LUT）** 后无损贴回画面——既让商品完美融入动漫世界，又实现 **0.0% 商标变形**！",decisionSummaryEn:"In FMCG and electronics commercials, running full-frame V2V stylization melts the advertised beverage can or smartphone held by the actor—corrupting brand logos on **`36.8%` of clips** and failing legal compliance. Our **SAM-2 SKU Shield + Deterministic Toon-LUT Bridge** tracks the held product mask $M_{	ext{SKU}}(t)$ across frames, excludes the SKU from diffusion resampling (**100% bit-exact logo geometry**), and applies a **deterministic 1D posterization LUT + Sobel vector ink outline** to the real product so it blends seamlessly into the stylized anime/watercolor world (`0.0%` prop mutation at `$0.048/clip`).",stages:[{stage:"1. SAM-2 Held-Prop Mask Tracking",controlledEngine:"Tracks Beverage Can / Bottle / Phone Mask M_SKU(t) Across Occlusions",naiveBehavior:"Full-Frame V2V Resamples Product Packaging & Melts Brand Logo",metricImpact:"0.0% vs 36.8% SKU Mutation"},{stage:"2. Masked Background/Actor V2V",controlledEngine:"Stylizes Actor & World Around M_SKU(t) via Wan-VACE Depth Lock",naiveBehavior:"Manual Frame-by-Frame Rotoscoping in After Effects (12 Hours)",metricImpact:"99.5% Temporal Coherence"},{stage:"3. Deterministic Toon/Ink LUT Bridge",controlledEngine:"Applies 1D Color Quantization & Vector Contour to Real SKU Pixels",naiveBehavior:"Pasting Raw Un-Graded Photo Over Anime Looks Jarring & Fake",metricImpact:"100% Style Harmony + Exact Logo"},{stage:"4. Finger-Over-Product Occlusion Layer",controlledEngine:"Preserves Stylized Actor Fingers Wrapping Over Real Product Bottle",naiveBehavior:"Product Sticker Floats on Top of Actor Fingers (Depth Inversion)",metricImpact:"$0.048 vs $1.45/Clip (+$2.12M/Yr)"}]}};function d(i,o="controlled"){const e=c[i],a=o==="controlled",t=Number((e.controlledTemporalCoherencePct-e.naiveTemporalCoherencePct).toFixed(1)),n=Number(((e.naiveCostPerClipUsd-e.controlledCostPerClipUsd)/e.naiveCostPerClipUsd*100).toFixed(1));return{scenario:e,mode:o,activeTemporalCoherencePct:a?e.controlledTemporalCoherencePct:e.naiveTemporalCoherencePct,activePropMutationPct:a?e.controlledPropMutationPct:e.naivePropMutationPct,activeCostPerClipUsd:a?e.controlledCostPerClipUsd:e.naiveCostPerClipUsd,coherenceGainPts:t,costReductionPct:n,annualSavingsM:e.controlledAnnualSavingsM}}let r="live-action-to-anime-ink-tvc",l="controlled";function s(){const i=document.querySelector("#app");if(!i)return;const o=d(r,l),e=o.scenario,a=l==="controlled";i.innerHTML=`
    <main class="workbench-shell" data-mode="${l}" data-scenario="${r}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">228TH WORKBENCH · DOMAIN 4: FILM/GAME PREVIS & V2V STYLIZATION · WAN-VACE DEPTH+LINEART LOCK + PROP SHIELD</span>
          <h1>影视广告与游戏视频风格化重绘（Video-to-Video Stylization）选型工作台（实拍/白模转动漫水墨与 CG）</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="V2V Style Scenario">
            ${Object.keys(c).map(t=>`
              <button class="seg-btn ${r===t?"active":""}" data-scenario-btn="${t}">
                ${t==="live-action-to-anime-ink-tvc"?"1. 手机实拍转国潮水墨/2.5D 动漫 (99.3% 零笔触闪烁)":t==="clay-blockout-to-photoreal-cg"?"2. Blender/UE5 白模直通 G-Buffer 转照片级 CG":"3. 商业广告手持真品 SAM-2 刚性护盾 (100% 锁 Logo)"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="V2V Style Mode">
            <button class="seg-btn ${a?"active":""}" data-mode-btn="controlled">
              ✅ Wan-VACE 81帧双锁 + 光流笔触粘附 + 商品护盾 (${e.controlledTemporalCoherencePct}% 稳定 · $${e.controlledCostPerClipUsd}/条)
            </button>
            <button class="seg-btn ${a?"":"active"}" data-mode-btn="naive">
              ⛔ 逐帧 ControlNet 闪烁 / 全画面重绘毁商标 (稳定度 ${e.naiveTemporalCoherencePct}% · 商标损毁 ${e.naivePropMutationPct}%)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">跨帧笔触与光影连贯度 (Temporal Coherence)</span>
          <strong class="kpi-val ${a?"good":"warn"}">${o.activeTemporalCoherencePct}%</strong>
          <span class="kpi-note">净增 +${o.coherenceGainPts} pts · 81帧 3D DiT + 光流表面肌理粘附</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">手持商品与 Logo 变形损毁率 (SKU Mutation)</span>
          <strong class="kpi-val ${a?"good":"warn"}">${o.activePropMutationPct}%</strong>
          <span class="kpi-note">SAM-2 刚性护盾绕过扩散重采样 + 1D 赛璐璐调色 LUT</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">单条 5秒风格化成片成本 (Cost per 5s Clip)</span>
          <strong class="kpi-val ${a?"good":"warn"}">$${o.activeCostPerClipUsd}</strong>
          <span class="kpi-note">成本直降 -${o.costReductionPct}% · 替代 3周手工 UV 贴图与逐帧手绘</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">年化广告与游戏预演净省 (Annual Savings)</span>
          <strong class="kpi-val good">+$${o.annualSavingsM.toFixed(2)}M/yr · 228th Studio</strong>
          <span class="kpi-note">实拍动作 / 3D 白模 18秒一键转电影级风格化大片</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 81帧 Wan-VACE (Depth + AnyLine) 双结构锁 × 光流肌理粘附 × SAM-2 商品护盾架构</h2>
            <span class="badge">${a?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="Enterprise Video-to-Video Stylization and Prop Shield Studio">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="202" height="126" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
              <text x="14" y="24" fill="#6ee7b7" font-size="11.5" font-weight="700">1. 81帧 3D DiT + 光流粘附</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">99.3% 零笔触闪烁</text>
              <text x="14" y="68" fill="#a7f3d0" font-size="10.5">• 淘汰逐帧 2D ControlNet (24Hz 沸腾)</text>
              <text x="14" y="88" fill="#a7f3d0" font-size="10.5">• Depth + AnyLine 锁死实拍动作节奏</text>
              <text x="14" y="108" fill="#34d399" font-size="10.5" font-weight="700">• 水墨宣纸肌理沿 RAFT 光流钉在物体表面</text>
            </g>

            <g transform="translate(239, 20)">
              <rect width="202" height="126" rx="10" fill="#111c33" stroke="#3b82f6" stroke-width="1.5" />
              <text x="14" y="24" fill="#93c5fd" font-size="11.5" font-weight="700">2. 3D 引擎原生 G-Buffer 直通</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">18s 白模转次世代 CG</text>
              <text x="14" y="68" fill="#cbd5e1" font-size="10.5">• Blender EEVEE 直出 32-bit 精确法线/深度</text>
              <text x="14" y="88" fill="#cbd5e1" font-size="10.5">• Cryptomatte 物体 ID 分区绑定金属/石材</text>
              <text x="14" y="108" fill="#60a5fa" font-size="10.5" font-weight="700">• 免除 3 周手工展 UV 与离线光追烘焙</text>
            </g>

            <g transform="translate(458, 20)">
              <rect width="202" height="126" rx="10" fill="#3b0764" stroke="#a855f7" stroke-width="1.5" />
              <text x="14" y="24" fill="#d8b4fe" font-size="11.5" font-weight="700">3. SAM-2 手持商品刚性护盾</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">0.0% 商标文字变形</text>
              <text x="14" y="68" fill="#e9d5ff" font-size="10.5">• 实时隔离演员手中的真实饮料罐/手机</text>
              <text x="14" y="88" fill="#e9d5ff" font-size="10.5">• 商品区跳过扩散去噪，仅施加深浅卡通 LUT</text>
              <text x="14" y="108" fill="#c084fc" font-size="10.5" font-weight="700">• 保留手指遮挡关系且 100% 通过法务审核</text>
            </g>

            <g transform="translate(20, 162)">
              <rect width="640" height="118" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="26" fill="#38bdf8" font-size="13" font-weight="700">视频转视频风格化（Video-to-Video Stylization）三大技术方案横向选型对比</text>
              <text x="18" y="52" fill="#e2e8f0" font-size="11.5">• 方案 A（推荐）：Wan 2.1-VACE (Depth+Lineart) + 光流潜空间粘附 + SAM-2 商品护盾（$0.054/条，99.3% 稳定，100% 锁商标）</text>
              <text x="18" y="76" fill="#e2e8f0" font-size="11.5">• 方案 B：无掩码商用 V2V API（Runway Gen-3 V2V / Sora Remix，$1.60/条，会把演员手里的真实商品包装与 Logo 融化改写）</text>
              <text x="18" y="100" fill="#fca5a5" font-size="11.5" font-weight="700">• 方案 C（反模式）：逐帧独立跑图像 ControlNet（24Hz 笔触与阴影剧烈闪烁，完全无法用于电视与院线商业广告）</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段视频风格化重绘与商品护盾拆解</h2>
            <span class="badge">228th Workbench</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 3D 视频双锁 + 商品护盾：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 逐帧重绘 / 无掩码 V2V：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,i.querySelectorAll("[data-scenario-btn]").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.scenarioBtn;n&&(r=n,s())})}),i.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.modeBtn;n&&(l=n,s())})})}s();
