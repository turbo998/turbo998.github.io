import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"bank-lobby-kiosk":{id:"bank-lobby-kiosk",titleZh:"银行网点与展厅 4K 迎宾交互大屏数字人（Photoreal 2D 真人形象 · <385ms 端到端响应）",titleEn:"Bank Lobby & Showroom 4K Kiosk Avatar (Photoreal 2D Spokesperson · 385ms Glass-to-Glass)",subtitleZh:"对比“回合制等整段 LLM 生成完再合成 MP4（冷场卡顿 5,900ms）”与“120ms 语义垫词预播 + 首逗点 4词流式 TTS + TensorRT 256px 嘴部重绘 + WebRTC UDP 推流（385ms 首帧开口）”",subtitleEn:"Compares Turn-Based Full-Paragraph LLM->TTS->MP4 Wait (5,900ms silence) vs. 120ms Semantic Filler + First-Clause Streaming TTS + TensorRT 256px Mouth Inpaint + WebRTC UDP (385ms TTFF)",concurrentSessions:500,controlledStack:"Silero VAD + 120ms Filler + First-Clause Azure TTS + TensorRT MuseTalk 256px + WebRTC ($0.018/min)",naiveStack:"Turn-Based Full LLM + Full TTS + Full-Frame Video API over HTTP HLS ($0.45/min · 5,900ms Silence)",controlledTtffMs:385,naiveTtffMs:5900,controlledBargeInMs:65,naiveBargeInMs:1450,controlledCostPerMinUsd:.018,naiveCostPerMinUsd:.45,controlledSessionsPerGpu:12,naiveSessionsPerGpu:1,controlledAnnualSavingsM:2.34,decisionSummaryZh:"为什么很多展厅和银行花重金部署的交互数字人，客户问完一句话后数字人要傻站着发呆 5.9 秒才开口？因为把离线视频管线搬到了实时对话上：等 ASR 完整结束（800ms）→ 等大模型把 150 字 RAG 答案全部吐完（1,800ms）→ 整段转语音（900ms）→ 整段渲染 MP4（2,400ms）！实时对话数字人必须采用 **“流式流水线 + 投机首逗点切块 + 语义垫词遮蔽”** 架构：① 用户刚停顿 120ms，当后台 RAG 还在检索时，前端立即无缝切入预缓存的 1.2 秒自然点头过渡动作与垫词（“好的，正在为您核对最新利率……”），使体感等待降为 120ms；② LLM 只要吐出前 4–6 个字遇到第一个逗号，立刻通过 WebSocket 送入 Azure Speech 流式合成音频帧；③ GPU 仅对数字人嘴部 `256×256` 区域跑 FP16 TensorRT `MuseTalk`（2.4ms/帧，单卡 L40S 可并发 12 路会话）并通过 WebRTC 推送，真正首帧回答延迟压至 **385ms**！",decisionSummaryEn:"Interactive kiosks fail when engineered as turn-based batch pipelines: waiting for full ASR (800ms) + full 150-token RAG LLM output (1,800ms) + full TTS (900ms) + full MP4 video render (2,400ms) creates an unbearable **5,900ms awkward silence**. Our Streaming WebRTC Pipeline triggers a pre-cached empathetic nod/filler at `120ms` while RAG executes, streams the first 4-word clause into WebSocket TTS, inpaints only the `256×256` mouth ROI via FP16 TensorRT `MuseTalk` (`12 concurrent sessions/GPU`), and streams over WebRTC UDP—slashing true answer TTFF to **385ms** at $0.018/min.",stages:[{stage:"1. Turn-Detection & Empathy Mask",controlledEngine:"Silero VAD + 120ms Semantic Nod/Filler While RAG Retrieves",naiveBehavior:"Dead Frozen Stare for 2.6 Seconds During ASR + RAG",metricImpact:"120ms Perceived Response Start"},{stage:"2. First-Clause Speculative TTS",controlledEngine:"Streams First 4–6 Tokens at First Comma -> WebSocket PCM TTS",naiveBehavior:"Waits for Entire 150-Token LLM Paragraph Before Starting TTS",metricImpact:"385ms vs 5,900ms Answer TTFF"},{stage:"3. 256px Mouth-ROI TensorRT",controlledEngine:"Pre-Cached 1080p Idle Loop + 256x256 FP16 MuseTalk (12 Sessions/GPU)",naiveBehavior:"Full-Frame 1080p Diffusion Synthesis (1 Session/GPU)",metricImpact:"12x Higher GPU Concurrency"},{stage:"4. WebRTC UDP & Instant Barge-In",controlledEngine:"WebRTC DataChannel Clear-Buffer Signal on VAD (<65ms Stop)",naiveBehavior:"HTTP Chunked HLS Buffer Continues Talking for 1.45s After Interrupt",metricImpact:"65ms Barge-In · $0.018/Min"}]},"mobile-app-concierge":{id:"mobile-app-concierge",titleZh:"手机银行与电商 App 万级并发数字人导购（服务端下发音频+ARKit Viseme 权重 vs 云端推流视频）",titleEn:"10k-Concurrent Mobile App Avatar Concierge (Client-Side 52 ARKit Blendshapes + Viseme Stream vs. Server Video)",subtitleZh:"面对手机端 10,000 人同时在线咨询：严禁在云端用 GPU 渲染 10,000 路 WebRTC 视频流！改由服务端仅下发 `TTS 音频流 + 24Kbps Viseme 口型骨骼权重`，由手机端本地 Three.js/Rive 渲染（云端 GPU 成本降 97%）",subtitleEn:"For 10,000 concurrent mobile sessions: never stream 10,000 server-rendered WebRTC video feeds! Stream TTS Audio + 24 Kbps ARKit Viseme Weights to render locally on client GPU (-97% cloud cost)",concurrentSessions:1e4,controlledStack:"Server Audio + Azure Speech Viseme IDs (24 Kbps) -> Client Three.js/Rive 52-Blendshape Avatar ($0.0018/min)",naiveStack:"10,000 Cloud GPU WebRTC Video Encoding Streams ($0.32/min = $192,000/hr Peak Cloud Bill)",controlledTtffMs:260,naiveTtffMs:3200,controlledBargeInMs:35,naiveBargeInMs:850,controlledCostPerMinUsd:.0018,naiveCostPerMinUsd:.32,controlledSessionsPerGpu:400,naiveSessionsPerGpu:8,controlledAnnualSavingsM:4.12,decisionSummaryZh:"当手机银行或电商 App 需要支撑 **10,000 名用户同时在线**与数字人客服对话时，如果还在云端用 GPU 为每个人实时渲染 1080p 视频流并走 WebRTC 推送，你需要 **1,250 张云端 GPU** 和高达 **40 Gbps** 的视频带宽！最顶尖的端云协同架构是 **“云端只发声音与口型指令（Visemes），手机端本地渲染画面”**：`Azure AI Speech` 在合成语音的同时原生免费吐出 22 个国际音标口型流（Viseme ID + 52 维 ARKit 面部混合形状权重，带宽仅 `24 Kbps`），用户手机利用自身闲置的 GPU 通过 `Three.js GLB / Rive` 在本地以 `60fps` 驱动数字人表情与口型——云端零视频渲染 GPU 开销，单分钟成本从 $0.32 暴降至 **$0.0018（降幅 -99.4%）**，且弱网电梯里依然丝滑不糊！",decisionSummaryEn:"Streaming 10,000 server-rendered WebRTC video feeds to mobile apps requires ~1,250 cloud GPUs and 40 Gbps of video egress. Instead, stream only **Opus Audio + Azure Speech 52-Blendshape ARKit Viseme Weights (`24 Kbps` total)** and render the avatar locally on the user phone GPU via `Three.js / Rive`—eliminating 100% of server video-rendering GPUs and cutting cost from $0.32/min to **$0.0018/min (-99.4%)** with 260ms TTFF.",stages:[{stage:"1. Cloud-to-Edge Compute Split",controlledEngine:"Server Sends Audio + 52 ARKit Float Weights (24 Kbps WebSocket)",naiveBehavior:"Server Encodes 10,000× 4Mbps H.264 WebRTC Video Streams",metricImpact:"-99.4% Bandwidth & Zero Video GPU"},{stage:"2. Zero-Cost Viseme Extraction",controlledEngine:"Azure AI Speech Native VisemeReceived Event + Audio2Face-3D Lite",naiveBehavior:"Heavy Pixel-Space Video Diffusion per Mobile Session",metricImpact:"400+ Sessions per Node ($0.0018/min)"},{stage:"3. Client 60fps Morph-Target Rig",controlledEngine:"Mobile WebGL2 / Rive Evaluates 52 Facial Blendshapes Locally",naiveBehavior:"WebRTC Video Packet Loss Causes Blocky Macroblocking in Elevators",metricImpact:"Razor-Sharp Native Resolution on Phone"},{stage:"4. Local Instant Interruption",controlledEngine:"Client VAD Immediately Lerps Mouth Blendshapes to 0.0 (35ms)",naiveBehavior:"Round-Trip Network Wait to Stop Cloud Video Stream (850ms)",metricImpact:"35ms Instant Local Barge-In"}]},"regulated-telehealth-advisor":{id:"regulated-telehealth-advisor",titleZh:"医疗健康与财富投顾双屏合规数字人（Azure Speech Avatar + 确定性知识卡片协同推送）",titleEn:"Regulated Telehealth & Wealth Advisor Co-Browsing Avatar (Azure Speech Avatar + Deterministic UI Cards)",subtitleZh:"对比“纯靠数字人口头背诵复杂药理/费率条款（客户记不住且易产生幻觉合规风险）”与“Azure AI Speech WebRTC Avatar 口播摘要 + DataChannel 同步推送已审计结构化处方/费率卡片”",subtitleEn:"Compares Verbal-Only Avatar Reciting Complex Dosages/APR Terms vs. Azure Speech WebRTC Avatar Summary + Synchronized DataChannel Audited UI Cards",concurrentSessions:1200,controlledStack:"Azure AI Speech WebRTC Avatar + Word-Timestamp DataChannel UI Card Sync ($0.035/min)",naiveStack:"Un-Audited Freeform Avatar Reciting Tables Verbally ($0.60/min + Compliance Liability)",controlledTtffMs:410,naiveTtffMs:4800,controlledBargeInMs:75,naiveBargeInMs:1200,controlledCostPerMinUsd:.035,naiveCostPerMinUsd:.6,controlledSessionsPerGpu:16,naiveSessionsPerGpu:2,controlledAnnualSavingsM:1.88,decisionSummaryZh:"在医疗问诊与理财投顾场景中，让数字人花 40 秒干巴巴地口头背诵一串药品剂量表或理财产品风险免责条款，不仅客户听完就忘，而且一旦 TTS 多读或漏读一个小数点就是重大合规事故！最佳实践是 **“口播负责亲和力引导 + WebRTC DataChannel 词级时间戳同步弹出确定性交互卡片（Co-Browsing）”**：数字人只用 8 秒钟亲切总结核心结论，并在念到“具体阶梯费率如下”这四个字的精确毫秒（通过 `WordBoundary` 事件触发），屏幕右侧自动弹出经法务锁死的结构化 HTML/React 费率表与确认按钮。",decisionSummaryEn:"Having a digital human verbally recite a 10-row dosage table or financial APR disclosure for 45 seconds is slow and legally risky. Instead, keep the avatar spoken response concise (`<10s`) and bind `Azure AI Speech` `WordBoundary` timestamps over the **WebRTC DataChannel** to pop up 100% audited, interactive HTML/React disclosure cards on screen at the exact millisecond the avatar mentions them.",stages:[{stage:"1. Guardrailed RAG + Card Split",controlledEngine:"LLM Emits Spoken 2-Sentence Summary + Audited Card ID Payload",naiveBehavior:"Avatar Reads Out Raw Markdown Tables for 60 Seconds",metricImpact:"100% Regulatory Disclosure Accuracy"},{stage:"2. Word-Boundary Co-Browsing Sync",controlledEngine:"WebRTC DataChannel Fires UI Card Pop-Up on Exact Word Timestamp",naiveBehavior:"Disconnected Chat Text Box Below Video Player",metricImpact:"410ms TTFF + Synchronized Visual UI"},{stage:"3. Enterprise Privacy & Watermark",controlledEngine:"Azure VNet Private Endpoint + C2PA Live Stream Watermark",naiveBehavior:"Public SaaS Avatar Endpoint Logging PII/PHI Audio",metricImpact:"HIPAA / SOC2 Compliant Pipeline"},{stage:"4. Idle-to-Active Bandwidth Saving",controlledEngine:"Switches to Local Loop During User Reading; Streams Only When Speaking",naiveBehavior:"Streams 1080p60 WebRTC Video Continuously While User Reads Form",metricImpact:"-72% Active Avatar Minute Billing"}]}};function d(n,s="controlled"){const e=c[n],a=s==="controlled",t=Number((e.naiveTtffMs/e.controlledTtffMs).toFixed(1)),i=Number(((e.naiveCostPerMinUsd-e.controlledCostPerMinUsd)/e.naiveCostPerMinUsd*100).toFixed(1));return{scenario:e,mode:s,activeTtffMs:a?e.controlledTtffMs:e.naiveTtffMs,activeBargeInMs:a?e.controlledBargeInMs:e.naiveBargeInMs,activeCostPerMinUsd:a?e.controlledCostPerMinUsd:e.naiveCostPerMinUsd,activeSessionsPerGpu:a?e.controlledSessionsPerGpu:e.naiveSessionsPerGpu,latencySpeedupFactor:t,costReductionPct:i,annualSavingsM:e.controlledAnnualSavingsM}}let o="bank-lobby-kiosk",r="controlled";function l(){const n=document.querySelector("#app");if(!n)return;const s=d(o,r),e=s.scenario,a=r==="controlled";n.innerHTML=`
    <main class="workbench-shell" data-mode="${r}" data-scenario="${o}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">212TH WORKBENCH · DOMAIN 3 · REAL-TIME INTERACTIVE WEBRTC AVATAR (<420MS) SELECTION STUDIO</span>
          <h1>企业级实时交互数字人客服与迎宾大屏（&lt;420ms 延迟）选型工作台：首逗点流式 TTS + WebRTC / 客户端 Viseme vs 回合制生成</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="Avatar Scenario">
            ${Object.keys(c).map(t=>`
              <button class="seg-btn ${o===t?"active":""}" data-scenario-btn="${t}">
                ${t==="bank-lobby-kiosk"?"1. 银行/展厅 4K 真人大屏 (385ms WebRTC + 256px 嘴部)":t==="mobile-app-concierge"?"2. 手机 App 万级并发导购 (24Kbps Viseme 端侧渲染)":"3. 医疗/理财合规投顾 (Azure Avatar + DataChannel 卡片同步)"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Latency Mode">
            <button class="seg-btn ${a?"active":""}" data-mode-btn="controlled">
              ✅ 流式首逗点 TTS + 垫词遮蔽 + WebRTC/Viseme (${e.controlledTtffMs}ms 开口 · $${e.controlledCostPerMinUsd}/min)
            </button>
            <button class="seg-btn ${a?"":"active"}" data-mode-btn="naive">
              ⛔ 回合制整段串行生成 (${e.naiveTtffMs}ms 冷场发呆 · $${e.naiveCostPerMinUsd}/min)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">端到端首帧开口延迟 (Glass-to-Glass TTFF)</span>
          <strong class="kpi-val ${a?"good":"warn"}">${s.activeTtffMs} ms</strong>
          <span class="kpi-note">提速 ${s.latencySpeedupFactor}x · 120ms 垫词遮蔽 + 首逗点 4词流式</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">用户插话打断响应延迟 (VAD Barge-In Stop)</span>
          <strong class="kpi-val ${a?"good":"warn"}">${s.activeBargeInMs} ms</strong>
          <span class="kpi-note">WebRTC DataChannel 清空缓冲 vs HLS 延迟 1.45s</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">单卡并发路数与分钟成本 (Concurrency & Cost)</span>
          <strong class="kpi-val ${a?"good":"warn"}">${s.activeSessionsPerGpu} 路/GPU · $${s.activeCostPerMinUsd}/min</strong>
          <span class="kpi-note">成本直降 -${s.costReductionPct}% · 年省 +$${s.annualSavingsM.toFixed(2)}M</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">峰值并发会话规模 (Peak Concurrent Users)</span>
          <strong class="kpi-val good">${e.concurrentSessions.toLocaleString()} Sessions</strong>
          <span class="kpi-note">手机端万级并发推荐下发 24Kbps ARKit Viseme</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 如何把交互数字人从 5,900ms 呆滞冷场压到 385ms 真人对答体验？瀑布流对比图解</h2>
            <span class="badge">${a?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="Interactive Avatar Latency Waterfall Comparison">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="640" height="112" rx="10" fill="#111c33" stroke="#10b981" stroke-width="1.5" />
              <text x="16" y="24" fill="#6ee7b7" font-size="12" font-weight="700">延迟拆解对比：传统回合制串行等待 (5,900ms) vs 流式首逗点切片 + WebRTC 管线 (${e.controlledTtffMs}ms)</text>

              <text x="16" y="52" fill="#fca5a5" font-size="11" font-weight="700">⛔ 回合制串行:</text>
              <rect x="115" y="38" width="75" height="18" fill="#ef4444" />
              <text x="152" y="51" fill="#fff" font-size="9" text-anchor="middle">ASR 800ms</text>
              <rect x="192" y="38" width="145" height="18" fill="#dc2626" />
              <text x="264" y="51" fill="#fff" font-size="9" text-anchor="middle">Full LLM 1,800ms</text>
              <rect x="339" y="38" width="80" height="18" fill="#b91c1c" />
              <text x="379" y="51" fill="#fff" font-size="9" text-anchor="middle">TTS 900ms</text>
              <rect x="421" y="38" width="160" height="18" fill="#991b1b" />
              <text x="501" y="51" fill="#fff" font-size="9" text-anchor="middle">MP4 Video 2,400ms</text>
              <text x="588" y="51" fill="#fca5a5" font-size="11" font-weight="700">5.9s</text>

              <text x="16" y="84" fill="#6ee7b7" font-size="11" font-weight="700">✅ 流式并行:</text>
              <rect x="115" y="70" width="28" height="18" fill="#059669" />
              <text x="129" y="83" fill="#fff" font-size="8" text-anchor="middle">VAD</text>
              <rect x="145" y="70" width="42" height="18" fill="#10b981" />
              <text x="166" y="83" fill="#022c22" font-size="8" text-anchor="middle" font-weight="700">4词 140ms</text>
              <rect x="189" y="70" width="38" height="18" fill="#34d399" />
              <text x="208" y="83" fill="#022c22" font-size="8" text-anchor="middle" font-weight="700">TTS 95ms</text>
              <rect x="229" y="70" width="32" height="18" fill="#6ee7b7" />
              <text x="245" y="83" fill="#022c22" font-size="8" text-anchor="middle" font-weight="700">ROI 70ms</text>
              <text x="272" y="84" fill="#34d399" font-size="12" font-weight="800">${e.controlledTtffMs}ms 首帧开口 (+ 120ms 垫词瞬时点头!)</text>
              <text x="16" y="103" fill="#94a3b8" font-size="10">核心秘诀：不等 LLM 生成完整段话！只要流式吐出前 4 个词遇到逗号，立刻合成首句语音并仅重绘 256×256 嘴部区域</text>
            </g>

            <g transform="translate(20, 148)">
              <rect width="640" height="132" rx="10" fill="#0f172a" stroke="#3b82f6" stroke-width="1.5" />
              <text x="18" y="26" fill="#93c5fd" font-size="13" font-weight="700">大屏 WebRTC 云端推流 vs 手机 App 端侧 Viseme 骨骼驱动选型分界线</text>
              <text x="18" y="52" fill="#e2e8f0" font-size="11.5">• 线下门店 4K 迎宾大屏 / 高拟真真人主播 (&lt;500 路并发): 选云端 TensorRT MuseTalk 256px + WebRTC UDP 推流 ($0.018/min)</text>
              <text x="18" y="76" fill="#34d399" font-size="11.5" font-weight="700">• 手机银行 / 电商 App (10,000+ 路并发): 严禁云端推视频! 服务端仅推 Opus 音频 + 24Kbps 52维 ARKit Viseme 权重，手机本地渲染 ($0.0018/min)</text>
              <text x="18" y="100" fill="#e2e8f0" font-size="11.5">• 医疗 / 金融合规双屏投顾: 数字人只念 8 秒摘要，通过 WebRTC DataChannel 词时间戳同步弹出法务锁定 HTML 卡片</text>
              <text x="18" y="120" fill="#38bdf8" font-size="10.5">静默期计费优化：当用户正在说话或阅读表单时，自动切回本地缓存的闭嘴呼吸循环视频，仅在数字人开口时消耗云端 GPU</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段实时交互数字人低延迟架构拆解</h2>
            <span class="badge">&lt;420ms Conversational SLA</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 实时流式管线：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 回合制串行基线：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,n.querySelectorAll("[data-scenario-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.scenarioBtn;i&&(o=i,l())})}),n.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.modeBtn;i&&(r=i,l())})})}l();
