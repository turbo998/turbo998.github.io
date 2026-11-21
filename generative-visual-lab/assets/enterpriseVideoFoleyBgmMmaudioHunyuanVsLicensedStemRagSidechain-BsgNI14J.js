import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"social-ad-campaign":{id:"social-ad-campaign",titleZh:"抖音/TikTok/YouTube 信息流短视频批量配乐与动作拟音（月产 50,000 条 15秒素材）",titleEn:"TikTok / YouTube Short-Form Ad Foley & BGM Pipeline (50,000 × 15s Clips/Mo)",subtitleZh:"对比“原生单轨混死音频 / 未授权 AI 音乐直出（无法抽离改词、Content-ID 版权黄标率 28%、压盖口播）”与“四轨分stem架构：MMAudio 动作拟音 + 企服正版曲库 CLAP 检索 + Azure TTS + FFmpeg 侧链闪避 (-14 LUFS)”",subtitleEn:"Compares Baked Single-Track Native Audio / Un-Cleared AI Music (28% Content-ID flag risk, drowned voiceover) vs. 4-Stem Architecture: MMAudio Foley + Licensed CLAP Music RAG + Azure TTS + Sidechain Ducking (-14 LUFS)",monthlyVideos:5e4,controlledStack:"4-Stem: MMAudio V2A Foley + CLAP Licensed BGM RAG + Azure TTS + FFmpeg Sidechain ($0.012/clip)",naiveStack:"Baked Single-Track Native Video Audio / Un-Cleared AI Music API ($0.18/clip + Content-ID Takedowns)",controlledFoleySyncErrorMs:18.5,naiveFoleySyncErrorMs:142,controlledCopyrightSafePct:100,naiveCopyrightSafePct:72,controlledDialogueSnrDb:14.2,naiveDialogueSnrDb:-1.8,controlledCostPerClipUsd:.012,naiveCostPerClipUsd:.18,controlledAnnualSavingsM:.88,decisionSummaryZh:"企业广告投放最忌讳两件事：① AI 生成的背景音乐触发 YouTube Content-ID 或 TikTok 商用版权下架；② 环境音、音乐与口播混死在单条音轨里导致后期改一句台词就得重跑整条视频。采用“四轨 Stem 分离管线”：物理动作音效（倒水、脚步、按键）用开源 MMAudio / HunyuanVideo-Foley 帧级对齐生成（误差 18.5ms），背景配乐通过 CLAP 向量检索企业已买断正版曲库并按视频剪辑点自动对齐节拍，口播轨触发 -12dB 侧链闪避（Sidechain Ducking）与 EBU R128 -14 LUFS 响度标准化，100% 免版权纠纷且单条成本仅 $0.012。",decisionSummaryEn:"Enterprise ad campaigns fail when AI-generated music triggers YouTube/TikTok Content-ID copyright blocks or when baked single-track audio prevents editing a single voiceover word. Our 4-Stem Pipeline uses self-hosted MMAudio for frame-synced physical Foley (18.5ms offset), retrieves 100% cleared enterprise music stems via CLAP embeddings, and applies -12dB sidechain ducking under Azure Speech voiceovers normalized to -14 LUFS ($0.012/clip).",stems:[{stemName:"Stem 1: Dialogue / Voiceover",controlledEngine:"Azure AI Speech Neural HD (24kHz WAV Stem)",naiveBehavior:"Mixed into Ambient Noise (-1.8 dB Collision)",loudnessTarget:"-14.0 LUFS Anchor"},{stemName:"Stem 2: Frame-Synced Foley SFX",controlledEngine:"MMAudio / HunyuanVideo-Foley Optical-Flow Sync (18.5ms)",naiveBehavior:"Text-Prompted SFX Drifting by 142ms",loudnessTarget:"-20.0 LUFS Transient"},{stemName:"Stem 3: Brand-Safe BGM Track",controlledEngine:"CLAP Embedding RAG over Indemnified Enterprise Music Library",naiveBehavior:"Un-Indemnified Public Music Gen (28% Claim Risk)",loudnessTarget:"-24.0 LUFS (-12dB Ducking)"},{stemName:"Stem 4: Master Bus & Compliance",controlledEngine:"FFmpeg loudnorm (-14 LUFS / -1.0 dBTP) + Multitrack AAC",naiveBehavior:"Unnormalized Peak Clipping (+1.8 dBTP)",loudnessTarget:"EBU R128 / ITU-R BS.1770"}]},"brand-film-cinematic":{id:"brand-film-cinematic",titleZh:"品牌宣传片与汽车/高奢产品TVC多声道拟音合成（精准物理材质碰撞音效）",titleEn:"Luxury Brand TVC & Automotive Multi-Stem Foley Synthesis (Material-Aware SFX)",subtitleZh:"对比“纯文本提示词 AudioLDM2 盲猜音效（画面车门关闭但声音滞后 180ms）”与“视频光流峰值检测 + HunyuanVideo-Foley 材质条件生成 + 品牌 Sonic Logo 锁定”",subtitleEn:"Compares Text-Only AudioLDM2 Guesswork (180ms door-slam lag) vs. Optical-Flow Peak Trigger + HunyuanVideo-Foley Material-Conditioned SFX + Brand Sonic Logo Lock",monthlyVideos:8e3,controlledStack:"Optical-Flow Peak Trigger + HunyuanVideo-Foley + Brand Sonic Logo Stem ($0.024/clip)",naiveStack:"Text-Only Audio Diffusion without Visual Frame Conditioning ($0.35/clip)",controlledFoleySyncErrorMs:14.2,naiveFoleySyncErrorMs:184,controlledCopyrightSafePct:100,naiveCopyrightSafePct:81,controlledDialogueSnrDb:15.6,naiveDialogueSnrDb:1.5,controlledCostPerClipUsd:.024,naiveCostPerClipUsd:.35,controlledAnnualSavingsM:.31,decisionSummaryZh:"汽车与高奢TVC对“画面动作与声音瞬态的同步精度”极为敏感（人类听觉对 >45ms 的音画不同步即可明显察觉）。纯文本生音效模型只知道“生成关车门声”，却不知道车门在第 42 帧还是第 58 帧合拢。通过提取视频帧间光流加速度峰值作为强时间戳锚点，驱动 HunyuanVideo-Foley / MMAudio 仅在碰撞帧生成皮革/金属材质音效，并在片尾精确挂载品牌专属 Sonic Logo（声学商标），同步误差压至 14.2ms。",decisionSummaryEn:'Human perception detects audio-visual desync above 45ms. Text-only audio models know WHAT sound to make ("car door slam") but not WHICH frame the door latches. Conditioning HunyuanVideo-Foley/MMAudio on optical-flow deceleration peaks locks impact transients within 14.2ms while preserving the exact Brand Sonic Logo stem.',stems:[{stemName:"Stem 1: Visual Impact Detection",controlledEngine:"RAFT Optical-Flow Deceleration Peak Extractor",naiveBehavior:'Blind Text Prompt ("add footsteps and door sound")',loudnessTarget:"14.2ms vs 184.0ms Sync"},{stemName:"Stem 2: Material-Conditioned Foley",controlledEngine:"HunyuanVideo-Foley (Metal / Glass / Leather Tagging)",naiveBehavior:"Generic Low-Bitrate Foley Texture",loudnessTarget:"48kHz 24-bit Stereo WAV"},{stemName:"Stem 3: Brand Sonic Identity",controlledEngine:"Locked Lossless Brand Sonic Logo (Final 2.0s)",naiveBehavior:"AI Hallucinated Chime Overwriting Brand Jingle",loudnessTarget:"100% Brand Audio Guidelines"},{stemName:"Stem 4: Dolby / Stereo Deliverable",controlledEngine:"5.1 / Stereo Stem Package + C2PA Audio Manifest",naiveBehavior:"Single Flattened MP3 Stream",loudnessTarget:"-14 LUFS Web / -23 LUFS TV"}]},"global-training-elearning":{id:"global-training-elearning",titleZh:"跨国企业合规培训与产品教程视频自动配音混音（12语种旁白 + 柔和环境底噪）",titleEn:"Enterprise E-Learning & Product Tutorial Automated Audio Mastering (12-Locale Voice + Ducking)",subtitleZh:"培训视频以“人声清晰度（STI > 0.75）”为最高优先级：采用“Azure Speech 12语种口播 + 300Hz-3.4kHz 人声频段动态陷波（Dynamic EQ Notch）+ -18dB BGM 闪避”",subtitleEn:"Prioritizes speech intelligibility: Azure Speech 12-Locale TTS + 300Hz-3.4kHz Dynamic Spectral Notch on BGM + -18dB Sidechain Ducking",monthlyVideos:2e4,controlledStack:"Azure Speech 12-Locale + Spectral Notch EQ (300Hz-3.4kHz) + -18dB Sidechain ($0.009/clip)",naiveStack:"Fixed-Volume BGM Overlay without Dynamic EQ or Sidechain ($0.12/clip)",controlledFoleySyncErrorMs:12,naiveFoleySyncErrorMs:95,controlledCopyrightSafePct:100,naiveCopyrightSafePct:88,controlledDialogueSnrDb:18.4,naiveDialogueSnrDb:2.4,controlledCostPerClipUsd:.009,naiveCostPerClipUsd:.12,controlledAnnualSavingsM:.27,decisionSummaryZh:"企业培训与软件操作教程视频最常见的问题是“配乐里的吉他/钢琴中频（300Hz–3.4kHz）与讲师人声频段严重打架”，导致外语学员听不清关键术语。通过在 FFmpeg / WebAudio 管线中配置“人声频段动态陷波（Dynamic EQ Sidechain）+ 界面点击音效通过 DOM 事件时间戳精确触发（12.0ms）”，讲师人声信噪比提升至 +18.4 dB。",decisionSummaryEn:"Mid-range BGM instruments (300Hz–3.4kHz) mask instructor formants in multilingual training videos. Carving a dynamic spectral EQ notch triggered by the Azure Speech voiceover stem and firing UI click SFX from deterministic DOM timestamps achieves +18.4 dB dialogue SNR at $0.009/clip.",stems:[{stemName:"Stem 1: 12-Locale Instructor TTS",controlledEngine:"Azure AI Speech + Glossary Lexicon + Word Timestamps",naiveBehavior:"Unleveled Raw TTS Output",loudnessTarget:"+18.4 dB Dialogue SNR"},{stemName:"Stem 2: UI Click & Keystroke SFX",controlledEngine:"DOM Cursor Event Timestamp Trigger (12.0ms Exact)",naiveBehavior:"V2A Model Guessing Mouse Clicks (95ms Drift)",loudnessTarget:"Zero False UI Clicks"},{stemName:"Stem 3: Spectral-Carved Ambient Bed",controlledEngine:"Royalty-Free Corporate Stem + 300Hz-3.4kHz Dynamic Notch",naiveBehavior:"Static -6dB BGM Clashing with Formants",loudnessTarget:"100% Speech Intelligibility"},{stemName:"Stem 4: Multi-Audio Track MP4",controlledEngine:"HLS / MP4 Multi-Language Audio Tracks + WebVTT",naiveBehavior:"12 Separate Full Video Renders",loudnessTarget:"-91% Storage & CDN Bandwidth"}]}};function d(n,i="controlled"){const e=c[n],o=i==="controlled";return{scenario:e,mode:i,activeFoleySyncErrorMs:o?e.controlledFoleySyncErrorMs:e.naiveFoleySyncErrorMs,activeCopyrightSafePct:o?e.controlledCopyrightSafePct:e.naiveCopyrightSafePct,activeDialogueSnrDb:o?e.controlledDialogueSnrDb:e.naiveDialogueSnrDb,activeCostPerClipUsd:o?e.controlledCostPerClipUsd:e.naiveCostPerClipUsd,syncImprovementMs:Number((e.naiveFoleySyncErrorMs-e.controlledFoleySyncErrorMs).toFixed(1)),snrGainDb:Number((e.controlledDialogueSnrDb-e.naiveDialogueSnrDb).toFixed(1)),annualSavingsM:e.controlledAnnualSavingsM}}let l="social-ad-campaign",r="controlled";function s(){const n=document.querySelector("#app");if(!n)return;const i=d(l,r),e=i.scenario,o=r==="controlled";n.innerHTML=`
    <main class="workbench-shell" data-mode="${r}" data-scenario="${l}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">202ND WORKBENCH · DOMAIN 3 · ENTERPRISE VIDEO FOLEY & BGM SELECTION STUDIO</span>
          <h1>企业营销视频自动配乐与拟音合成选型工作台：MMAudio / Hunyuan-Foley vs 正版曲库 CLAP 检索 + 侧链闪避管线</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="Audio Scenario">
            ${Object.keys(c).map(t=>`
              <button class="seg-btn ${l===t?"active":""}" data-scenario-btn="${t}">
                ${t==="social-ad-campaign"?"1. 短视频批量配乐与拟音 (50k Clips/Mo)":t==="brand-film-cinematic"?"2. 品牌 TVC 物理碰撞拟音 + Sonic Logo":"3. 12语种培训教程频谱陷波混音 (E-Learning)"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Architecture Mode">
            <button class="seg-btn ${o?"active":""}" data-mode-btn="controlled">
              ✅ 四轨分 Stem：MMAudio + 正版 CLAP RAG + 侧链闪避 ($${e.controlledCostPerClipUsd}/条)
            </button>
            <button class="seg-btn ${o?"":"active"}" data-mode-btn="naive">
              ⛔ 单轨混死音频 / 未授权 AI 生曲 ($${e.naiveCostPerClipUsd}/条 · 版权与掩蔽风险)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">动作拟音同步误差 (Foley Onset Sync Error)</span>
          <strong class="kpi-val ${o?"good":"warn"}">${i.activeFoleySyncErrorMs} ms</strong>
          <span class="kpi-note">提升 -${i.syncImprovementMs} ms · 远低于人耳 45ms 察觉阈值</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">商用音乐版权合规率 (Content-ID Safe Rate)</span>
          <strong class="kpi-val ${o?"good":"warn"}">${i.activeCopyrightSafePct}%</strong>
          <span class="kpi-note">正版买断曲库 CLAP 检索 vs 未清洗音乐大模型</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">口播人声清晰度信噪比 (Dialogue SNR)</span>
          <strong class="kpi-val ${o?"good":"warn"}">${i.activeDialogueSnrDb>0?"+":""}${i.activeDialogueSnrDb} dB</strong>
          <span class="kpi-note">净增 +${i.snrGainDb} dB · -12dB 侧链闪避 + -14 LUFS</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">单条混音成本与年化节省 (Cost & Annual Savings)</span>
          <strong class="kpi-val good">$${i.activeCostPerClipUsd.toFixed(3)} · +$${i.annualSavingsM.toFixed(2)}M/yr</strong>
          <span class="kpi-note">支持多语种单视频多音轨复用 (HLS Audio Stems)</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 四轨分 Stem 混音矩阵（口播 + 帧级拟音 + 正版 BGM 侧链闪避 + -14 LUFS 母带）</h2>
            <span class="badge">${o?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="4-Stem Audio Mixing Timeline">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="640" height="58" rx="8" fill="#111c33" stroke="#10b981" stroke-width="1.5" />
              <text x="16" y="24" fill="#6ee7b7" font-size="12" font-weight="700">Track 1 · Dialogue / Voiceover Stem (Azure AI Speech 24kHz) — 主锚点轨 (-14.0 LUFS)</text>
              <rect x="16" y="34" width="180" height="14" rx="4" fill="#10b981" />
              <rect x="260" y="34" width="210" height="14" rx="4" fill="#10b981" />
              <text x="485" y="45" fill="#a7f3d0" font-size="11" font-weight="700">SNR: ${i.activeDialogueSnrDb>0?"+":""}${i.activeDialogueSnrDb} dB</text>
            </g>

            <g transform="translate(20, 88)">
              <rect width="640" height="58" rx="8" fill="#111c33" stroke="#3b82f6" stroke-width="1.5" />
              <text x="16" y="24" fill="#93c5fd" font-size="12" font-weight="700">Track 2 · Visual-Synchronized Foley SFX (MMAudio / HunyuanVideo-Foley) — 误差 ${i.activeFoleySyncErrorMs}ms</text>
              <circle cx="95" cy="41" r="7" fill="#38bdf8" />
              <circle cx="225" cy="41" r="7" fill="#38bdf8" />
              <circle cx="380" cy="41" r="7" fill="#38bdf8" />
              <circle cx="540" cy="41" r="7" fill="#38bdf8" />
              <text x="112" y="45" fill="#cbd5e1" font-size="11">Optical-Flow Impact Peaks Locked (&lt;25ms Broadcast Threshold)</text>
            </g>

            <g transform="translate(20, 156)">
              <rect width="640" height="62" rx="8" fill="#111c33" stroke="#a855f7" stroke-width="1.5" />
              <text x="16" y="24" fill="#d8b4fe" font-size="12" font-weight="700">Track 3 · Licensed BGM via CLAP RAG + Sidechain Ducking (-12dB when Voice Active)</text>
              <path d="M 16 36 L 16 48 L 196 48 L 210 32 L 246 32 L 260 48 L 470 48 L 485 32 L 620 32" stroke="#c084fc" stroke-width="3" fill="none" />
              <text x="16" y="56" fill="#e9d5ff" font-size="10">自动避让口播人声频段 (300Hz–3.4kHz Dynamic Notch) · 100% Content-ID 免黄标</text>
            </g>

            <g transform="translate(20, 228)">
              <rect width="640" height="52" rx="8" fill="#0f172a" stroke="#334155" />
              <text x="16" y="22" fill="#f8fafc" font-size="12" font-weight="700">Track 4 · Brand Sonic Logo + EBU R128 Loudness Limiter (-14.0 LUFS / -1.0 dBTP True Peak)</text>
              <text x="16" y="40" fill="#94a3b8" font-size="11">输出独立四轨 WAV + 多语种 HLS 音轨封装，后期改词或换 BGM 零 GPU 重绘成本</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四大音轨分 Stem 职责与单轨混死基线对比</h2>
            <span class="badge">100% Content-ID Safe</span>
          </div>
          <div class="stage-list">
            ${e.stems.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stemName}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 四轨分离管线：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 单轨直出基线：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.loudnessTarget}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,n.querySelectorAll("[data-scenario-btn]").forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.scenarioBtn;a&&(l=a,s())})}),n.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.modeBtn;a&&(r=a,s())})})}s();
