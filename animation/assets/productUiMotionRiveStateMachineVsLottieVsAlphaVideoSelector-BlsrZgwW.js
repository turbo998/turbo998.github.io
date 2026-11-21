import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"ai-copilot-state-orb":{id:"ai-copilot-state-orb",titleZh:"AI Copilot 语音助手多状态交互形象（Idle ↔ Listening ↔ Thinking ↔ Speaking 实时音量驱动）",titleEn:"AI Copilot Interactive Multi-State Avatar / Orb (Idle ↔ Listening ↔ Thinking ↔ Audio-Reactive Speaking)",subtitleZh:"对比“4段透明通道视频拼接（4.8MB VP9 + 5.2MB HEVC 双格式兼容地狱、打断时硬切跳帧 185ms）”与“Rive (.riv) 24KB 二进制状态机 + 实时麦克风 RMS 骨骼权重混合（0.4ms 零跳帧插值、120fps）”",subtitleEn:"Compares 4 Transparent Alpha Video Clips (4,800 KB WebM/HEVC dual-codec hell, 185ms jump cut on voice interruption) vs. 24 KB Rive (.riv) State Machine + Live Mic RMS Bone Blend (0.4ms blend, 120fps)",monthlyActiveUsersM:15,controlledStack:"Rive (.riv) 24 KB Binary State Machine + WebAudio RMS Input Binding (120fps GPU Vector)",naiveStack:"4× Transparent Video Clips (VP9 .webm + HEVC .mov = 4,800 KB) or 1.6 MB Lottie SVG DOM",controlledPayloadKb:24,naivePayloadKb:4800,controlledStateTransitionMs:.4,naiveStateTransitionMs:185,controlledMobileFps:120,naiveMobileFps:32,controlledRamFootprintMb:4.2,naiveRamFootprintMb:145,controlledAnnualCdnSavingsUsd:42e4,decisionSummaryZh:"为什么现代 AI 语音助手（如 Copilot / ChatGPT Voice 灵动球与虚拟形象）绝对不能用透明视频（WebM/MOV）或传统 Lottie JSON 来做？① 透明视频没有状态机！当用户说话中途突然打断 AI 时，从 `Speaking.webm` 第 37 帧切到 `Listening.webm` 第 0 帧会出现极其生硬的画面瞬移跳帧（185ms 解码延迟），且为了同时兼容 Chrome（仅支持 VP9 Alpha）与 iOS Safari（仅支持 HEVC Alpha `.mov`）必须维护两套高达 4.8MB 的视频；② 传统 Lottie JSON 超过 500 个网格顶点在 SVG DOM 下会严重阻塞主线程。选用 **`Rive (.riv)` 二进制状态机 + Skia/Rive GPU 矢量光栅化器**，包体仅 `24 KB`（缩减 -99.5%），直接将麦克风音量 RMS 绑定到骨骼形变输入变量，任何时刻打断都能在 `0.4ms` 内自动完成姿态平滑插值（Blend Tree），满帧 120fps！",decisionSummaryEn:"Never build an interactive AI Copilot voice orb or character out of pre-rendered transparent videos (`WebM / HEVC .mov`) or heavy Lottie DOM SVGs. Pre-rendered video clips cannot smoothly blend mid-frame when a user interrupts the AI (`185ms` jump cut) and require maintaining two incompatible alpha video codecs (`VP9` for Chrome + `HEVC` for Safari = `4,800 KB`). A **`24 KB` Rive (`.riv`) State Machine** binds live WebAudio microphone RMS directly to vector mesh bones, blending seamlessly between `Listening`, `Thinking`, and `Speaking` in `0.4ms` at `120 fps` (`-99.5%` payload).",stages:[{stage:"1. Asset Format & Binary Size",controlledEngine:"Rive (.riv) Compact Binary Vector + Mesh (24 KB)",naiveBehavior:"Dual-Codec VP9 WebM + HEVC MOV Alpha Videos (4,800 KB)",metricImpact:"-99.5% Network Payload (200x Smaller)"},{stage:"2. Interrupt & State Blending",controlledEngine:"Declarative State Machine + 1D/2D Blend Trees (0.4ms)",naiveBehavior:"Hard <video src> Swap Causing 185ms Decode Jump Cut",metricImpact:"Zero Frame Jump on Voice Barge-In"},{stage:"3. Live Data / Audio Reactivity",controlledEngine:"Direct JS Number Input Binding (micRms, cursorX, cursorY)",naiveBehavior:"Pre-Baked Keyframes Unresponsive to Real Voice Volume",metricImpact:"100% Real-Time Cursor & Voice Tracking"},{stage:"4. Renderer & Memory Footprint",controlledEngine:"Rive C++/WASM GPU Vector Renderer (4.2 MB RAM · 120fps)",naiveBehavior:"Decoded RGBA Video Frame Buffers (145 MB RAM · 32fps)",metricImpact:"-97.1% Memory · Saves $420k/yr CDN"}]},"onboarding-vector-icons":{id:"onboarding-vector-icons",titleZh:"产品功能引导与纯展示型扁平矢量图标动效（DotLottie / WAAPI 轻量选型边界）",titleEn:"Non-Interactive Onboarding & Micro-Icon Animations (DotLottie .lottie + CSS/WAAPI)",subtitleZh:"当动效仅需“单向播放或简单循环、无复杂骨骼网格形变与多输入混合”时：采用压缩版 `DotLottie (.lottie ZIP, 14KB)` + Canvas Worker 渲染，比未压缩 Lottie JSON 缩小 88%",subtitleEn:"For linear playback or simple loop icons without multi-input blend trees: compressed DotLottie (.lottie, 14 KB) on OffscreenCanvas beats raw 120 KB Lottie JSON by -88%",monthlyActiveUsersM:25,controlledStack:"DotLottie (.lottie Compressed Binary, 14 KB) + OffscreenCanvas Worker + CSS WAAPI",naiveStack:"Uncompressed Raw Lottie .json (125 KB) Rendered via Main-Thread SVG DOM Nodes",controlledPayloadKb:14,naivePayloadKb:125,controlledStateTransitionMs:.8,naiveStateTransitionMs:42,controlledMobileFps:60,naiveMobileFps:38,controlledRamFootprintMb:2.8,naiveRamFootprintMb:38,controlledAnnualCdnSavingsUsd:185e3,decisionSummaryZh:'对于设计师已经在 After Effects 中沉淀了上百个纯播放型/简单 Hover 触发的扁平图标动效（如“支付成功打勾”、“空状态插画”），无需全部推倒用 Rive 重画：只需在 CI/CD 管线中将冗长的明文 `.json`（125 KB）自动打包为二进制压缩的 **`.lottie (DotLottie, 14 KB)`**，并将渲染后端从 `renderer: "svg"`（创建上千个 DOM 节点阻塞主线程）切换为运行在 Web Worker 中的 `OffscreenCanvas`，主线程阻塞从 42ms 降至 0.8ms！',decisionSummaryEn:"When teams already have hundreds of linear After Effects animations (checkmark success, empty-state illustrations) that do not require complex state-machine blending, keep the AE workflow but compile raw `.json` (`125 KB`) into compressed **`.lottie` (`14 KB`)** and render on a Web Worker `OffscreenCanvas` instead of main-thread SVG DOM (`0.8ms` vs. `42.0ms` main-thread block).",stages:[{stage:"1. Serialization & Compression",controlledEngine:"DotLottie (.lottie ZIP Archive · 14 KB)",naiveBehavior:"Raw Pretty-Printed Lottie .json (125 KB Text Parse)",metricImpact:"-88.8% Payload & Instant Parse"},{stage:"2. Main-Thread Isolation",controlledEngine:"@lottiefiles/dotlottie-web on Worker OffscreenCanvas",naiveBehavior:"lottie-web SVG Renderer Mutating 600 DOM Nodes at 60Hz",metricImpact:"0.8ms vs 42.0ms Main-Thread Cost"},{stage:"3. Simple Micro-Interactions",controlledEngine:"CSS / Web Animations API (WAAPI) Compositor Layer (<2 KB)",naiveBehavior:"Loading 60KB Lottie Library Just for a Spinner/Pulse",metricImpact:"Zero JS Runtime for Simple Transitions"},{stage:"4. Dynamic Theme Token Binding",controlledEngine:"Lottie Slot Color Override Bound to CSS Dark/Light Variables",naiveBehavior:"Exporting Separate Dark.json and Light.json Files",metricImpact:"60fps Mobile · Saves $185k/yr"}]},"photoreal-3d-reward-badge":{id:"photoreal-3d-reward-badge",titleZh:"写实 3D 流光勋章、流体粒子爆炸与全息玻璃动效（何时必须用双编码 Alpha 透明视频？）",titleEn:"Photorealistic 3D Glass Badges, Fluid Particles & Ray-Traced Reveals (Dual-Codec Alpha Video)",subtitleZh:"当动效包含光线追踪折射、千万级烟雾流体粒子或 AIGC 视频特效（矢量无法表达）时：采用“AV1/VP9 WebM Alpha + HEVC Alpha .mov 双源自动降级 + Canvas 色度/亮度拆半合成”",subtitleEn:"When ray-traced glass refraction or fluid particles cannot be expressed as 2D vectors: Dual-Source VP9 WebM Alpha + HEVC Alpha .mov with Stacked Luma+Alpha Canvas Fallback",monthlyActiveUsersM:10,controlledStack:"Stacked RGB+Alpha Half-Frame MP4 + WebGL Shader Composite (680 KB · Universal 100% Browser Support)",naiveStack:"PNG Image Sequence (18.5 MB) or Single-Codec WebM Alpha (Broken Black Box on iOS Safari)",controlledPayloadKb:680,naivePayloadKb:18500,controlledStateTransitionMs:4.5,naiveStateTransitionMs:320,controlledMobileFps:60,naiveMobileFps:18,controlledRamFootprintMb:16.5,naiveRamFootprintMb:280,controlledAnnualCdnSavingsUsd:54e4,decisionSummaryZh:"当业务需要展示 Blender Cycles 光线追踪的钻石折射勋章、或者由 AIGC 视频模型生成的金色粒子消散特效时，Rive 和 Lottie 的 2D 矢量画笔是画不出来的。此时若用 PNG 序列帧体积高达 18.5MB；若只放一个透明 WebM 视频，在 iPhone Safari 上会显示为丑陋的黑底方框！跨端最稳健的架构师方案是：**将上半帧存 RGB 彩色画面、下半帧存黑白 Alpha 蒙版压进单个标准 H.264/AV1 MP4（仅 680 KB），在前端用 10 行 WebGL 片元着色器实时将上下半帧合成为透明画面**——1份文件 100% 通吃 iOS、Android、微信 WebView 与桌面全浏览器，体积较 PNG 序列缩减 -96.3%！",decisionSummaryEn:"Ray-traced glass refraction and AIGC particle explosions cannot be represented as 2D vectors. Yet PNG sequences weigh `18.5 MB`, and single-codec WebM Alpha renders with a black background on iOS Safari. Packing **Top-Half RGB + Bottom-Half Grayscale Alpha into a single standard H.264/AV1 MP4 (`680 KB`)** and compositing via a 10-line WebGL fragment shader achieves `100%` universal browser/WebView compatibility at `-96.3%` smaller size!",stages:[{stage:"1. Visual Complexity Boundary",controlledEngine:"Ray-Traced Refraction / AIGC Fluid Particles -> Raster Video",naiveBehavior:"Forcing AE Vectorization -> 15,000 Paths Crashing Browser",metricImpact:"Photorealistic Cycles / AIGC Quality"},{stage:"2. Universal Alpha Encoding",controlledEngine:"Top-Bottom Stacked RGB+Alpha Standard MP4 (680 KB)",naiveBehavior:"18.5 MB PNG Sequence or Safari-Incompatible WebM Alpha",metricImpact:"-96.3% Payload & 100% iOS/Android Support"},{stage:"3. WebGL / Canvas Alpha Shader",controlledEngine:"10-Line Fragment Shader: vec4(rgbSample.rgb, alphaSample.r)",naiveBehavior:"CPU getImageData() Pixel Loop Dropping to 18fps",metricImpact:"60fps Hardware-Decoded Alpha Video"},{stage:"4. Lifecycle Memory Release",controlledEngine:"IntersectionObserver Unloads Video Decoder When Off-Screen",naiveBehavior:"Leaks 280 MB Decoded PNG/Frames in SPA Memory",metricImpact:"16.5 MB vs 280.0 MB RAM"}]}};function d(o,i="controlled"){const e=c[o],a=i==="controlled",t=Number(((e.naivePayloadKb-e.controlledPayloadKb)/e.naivePayloadKb*100).toFixed(1));return{scenario:e,mode:i,activePayloadKb:a?e.controlledPayloadKb:e.naivePayloadKb,activeStateTransitionMs:a?e.controlledStateTransitionMs:e.naiveStateTransitionMs,activeMobileFps:a?e.controlledMobileFps:e.naiveMobileFps,activeRamFootprintMb:a?e.controlledRamFootprintMb:e.naiveRamFootprintMb,payloadReductionPct:t,annualCdnSavingsUsd:e.controlledAnnualCdnSavingsUsd}}let s="ai-copilot-state-orb",r="controlled";function l(){const o=document.querySelector("#app");if(!o)return;const i=d(s,r),e=i.scenario,a=r==="controlled";o.innerHTML=`
    <main class="workbench-shell" data-mode="${r}" data-scenario="${s}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">209TH WORKBENCH · DOMAIN 5 · PRODUCT UI MOTION & AI COPILOT ORB SELECTION STUDIO</span>
          <h1>企业产品 UI 交互动效与 AI 助手形象选型工作台：Rive 状态机 (.riv) vs DotLottie vs 透明通道视频 (Alpha Video)</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="UI Motion Scenario">
            ${Object.keys(c).map(t=>`
              <button class="seg-btn ${s===t?"active":""}" data-scenario-btn="${t}">
                ${t==="ai-copilot-state-orb"?"1. AI Copilot 语音交互灵动球 (Rive 24KB 状态机)":t==="onboarding-vector-icons"?"2. 功能引导扁平矢量图标 (DotLottie 14KB + Worker)":"3. 写实 3D 光追勋章与粒子 (RGB+Alpha 上下分屏 MP4)"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Pipeline Mode">
            <button class="seg-btn ${a?"active":""}" data-mode-btn="controlled">
              ✅ 场景精准选型架构 (${e.controlledPayloadKb} KB · ${e.controlledMobileFps} fps)
            </button>
            <button class="seg-btn ${a?"":"active"}" data-mode-btn="naive">
              ⛔ 错配基线 (${e.naivePayloadKb} KB · 状态切帧延迟 ${e.naiveStateTransitionMs}ms)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">动效资产网络传输包体 (Asset Payload)</span>
          <strong class="kpi-val ${a?"good":"warn"}">${i.activePayloadKb} KB</strong>
          <span class="kpi-note">包体缩减 -${i.payloadReductionPct}% · 年省 CDN $${(i.annualCdnSavingsUsd/1e3).toFixed(0)}k</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">打断/状态切换插值延迟 (State Transition Latency)</span>
          <strong class="kpi-val ${a?"good":"warn"}">${i.activeStateTransitionMs} ms</strong>
          <span class="kpi-note">Rive 骨骼权重实时混合 vs 视频硬切跳帧</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">移动端运行帧率 (Mobile Frame Rate)</span>
          <strong class="kpi-val ${a?"good":"warn"}">${i.activeMobileFps} fps</strong>
          <span class="kpi-note">WASM/WebGL2 GPU 光栅化 vs 主线程 SVG DOM 重排</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">运行时解码内存占用 (Runtime RAM Footprint)</span>
          <strong class="kpi-val good">${i.activeRamFootprintMb} MB</strong>
          <span class="kpi-note">对比基线 ${e.naiveRamFootprintMb} MB · 杜绝低端机 WebView 闪退</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. Rive (.riv) vs DotLottie (.lottie) vs 透明视频 (RGB+Alpha MP4) 黄金选型边界图解</h2>
            <span class="badge">${a?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="Rive vs Lottie vs Alpha Video Selection Matrix">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="202" height="126" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
              <text x="14" y="24" fill="#6ee7b7" font-size="11.5" font-weight="700">1. Rive 状态机 (.riv · 24 KB)</text>
              <text x="14" y="48" fill="#f8fafc" font-size="17" font-weight="800">AI Copilot 交互形象首选</text>
              <text x="14" y="70" fill="#a7f3d0" font-size="10.5">• 实时绑定 micRms / 鼠标坐标 / 状态变量</text>
              <text x="14" y="90" fill="#a7f3d0" font-size="10.5">• 任意帧打断 0.4ms 自动骨骼插值</text>
              <text x="14" y="110" fill="#34d399" font-size="10.5" font-weight="700">• 120fps C++/WASM GPU 矢量渲染</text>
            </g>

            <g transform="translate(239, 20)">
              <rect width="202" height="126" rx="10" fill="#111c33" stroke="#3b82f6" stroke-width="1.5" />
              <text x="14" y="24" fill="#93c5fd" font-size="11.5" font-weight="700">2. DotLottie (.lottie · 14 KB)</text>
              <text x="14" y="48" fill="#f8fafc" font-size="17" font-weight="800">AE 线性图标动效首选</text>
              <text x="14" y="70" fill="#cbd5e1" font-size="10.5">• 复用既有 After Effects 设计师资产</text>
              <text x="14" y="90" fill="#cbd5e1" font-size="10.5">• ZIP 二进制压缩比明文 JSON 小 88%</text>
              <text x="14" y="110" fill="#60a5fa" font-size="10.5" font-weight="700">• OffscreenCanvas Worker 零主线程卡顿</text>
            </g>

            <g transform="translate(458, 20)">
              <rect width="202" height="126" rx="10" fill="#3b0764" stroke="#a855f7" stroke-width="1.5" />
              <text x="14" y="24" fill="#d8b4fe" font-size="11.5" font-weight="700">3. 上下分屏 RGB+Alpha MP4</text>
              <text x="14" y="48" fill="#f8fafc" font-size="17" font-weight="800">写实 3D 光追/粒子首选</text>
              <text x="14" y="70" fill="#e9d5ff" font-size="10.5">• 承载矢量无法表达的光追玻璃/流体粒子</text>
              <text x="14" y="90" fill="#e9d5ff" font-size="10.5">• 单文件 MP4 + WebGL 着色器合成透明</text>
              <text x="14" y="110" fill="#c084fc" font-size="10.5" font-weight="700">• 根治 WebM 在 iOS Safari 黑底不兼容</text>
            </g>

            <g transform="translate(20, 162)">
              <rect width="640" height="118" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="26" fill="#38bdf8" font-size="13" font-weight="700">前端与移动端视觉动效选型黄金铁律 (UI Motion Decision Rules)</text>
              <text x="18" y="52" fill="#e2e8f0" font-size="11.5">• 需要根据用户输入/音量/光标实时变形混合 → 100% 选 Rive (.riv)，严禁切多段视频</text>
              <text x="18" y="76" fill="#e2e8f0" font-size="11.5">• 简单按钮反馈/加载动画 → 选 CSS / WAAPI (&lt;2KB)；AE 导出的线性扁平插画 → 选 DotLottie (.lottie) + Canvas Worker</text>
              <text x="18" y="100" fill="#34d399" font-size="11.5" font-weight="700">• 3D 写实奖牌/AIGC 粒子特效 → 选 Top-Bottom Stacked RGB+Alpha MP4 + WebGL Shader (680KB 通吃全平台，告别 18MB PNG 序列)</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段 UI 动效工程化选型与渲染优化拆解</h2>
            <span class="badge">120fps GPU Vector</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 推荐选型架构：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 常见错配反模式：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,o.querySelectorAll("[data-scenario-btn]").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.scenarioBtn;n&&(s=n,l())})}),o.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.modeBtn;n&&(r=n,l())})})}l();
