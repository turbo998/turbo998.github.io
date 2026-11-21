import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"wealth-annual-wrap":{id:"wealth-annual-wrap",titleZh:"财富管理/银行 100 万高净值客户年度账单数字人总结视频（45秒/条）",titleEn:"Wealth Management 1M-User Annual Portfolio Wrap Video (45s Personalized Clip)",subtitleZh:"对比“逐人调用 HeyGen/Tavus 渲染完整 45秒数字人视频（单次活动账单 $1.20M、耗时 14天）”与“Top-5,000 常见姓氏前 2.5秒改口型缓存 + 共享母版 + Remotion 投资收益图表 GOP 无损流拼接（$0.0024/人，全量仅 $2,400）”",subtitleEn:"Compares Full 45s Per-User Avatar API ($1.20M campaign bill) vs. Top-5,000 First-Name 2.5s MuseTalk Cache + Pre-Encoded Base GOP + Remotion Chart Splice ($0.0024/user, $2,400 total)",recipientCount:1e6,videoDurationSec:45,nameCacheHitRatePct:94.2,controlledStack:"2.5s Name-Bucket MuseTalk Cache (94.2% Hit) + Shared GOP Base + Remotion Chart Splice ($0.0024/user)",naiveStack:"Full 45s Per-User Commercial Avatar API (HeyGen / Tavus / Synthesia) ($1.20/user = $1.20M/Campaign)",controlledCostPerUserUsd:.0024,naiveCostPerUserUsd:1.2,controlledTotalCampaignCostUsd:2400,naiveTotalCampaignCostUsd:12e5,controlledRenderLatencySec:.38,naiveRenderLatencySec:52,controlledAnnualSavingsM:4.79,decisionSummaryZh:"给 100 万名银行客户每人发一条 45 秒的“数字人行长喊出客户名字 + 展示个人年度收益曲线”视频，如果老老实实调 100 万次数字人 API 重新渲染整条 45 秒视频，仅一次营销活动就要烧掉 $120 万美元！架构师拆解视频结构就会发现：真正因人而异的口型只有开头 `0.0–2.5秒` 的一句称呼（“您好，陈先生/王女士”），且中国前 500 个姓氏或欧美 Top-5,000 常见英文名即可覆盖 94.2% 的客户；中间 `2.5–45秒` 的数字人动作只需要在转切全屏 `Remotion` 动态收益图表时播报动态数字 TTS。通过“预渲染 5,000 个 2.5秒姓氏称呼分片 + 固定 2.5秒 GOP 关键帧对齐 + FFmpeg `-c:v copy` 零重编码极速拼接”，单人成本从 $1.20 暴降至 $0.0024（降幅 -99.8%），100 万条视频总成本仅 $2,400！",decisionSummaryEn:'Rendering 1,000,000 full 45-second personalized avatar videos via commercial APIs costs $1.20M per campaign. Yet only the first 2.5 seconds ("Hi David,") require personalized lip-sync—and the Top 5,000 first names/surnames cover 94.2% of all users! By pre-caching 5,000 2.5-second MuseTalk greeting chunks, locking frame-60 neutral head rest-poses, and splicing personalized Remotion portfolio charts on exact H.264 GOP boundaries (`ffmpeg -c:v copy`), unit cost drops by 99.8% to $0.0024/user ($2,400 total for 1M users).',stages:[{stage:"1. Greeting Prefix Cache (0.0–2.5s)",controlledEngine:"Top-5,000 Name-Bucket MuseTalk Cache (94.2% Zero-GPU Hit)",naiveBehavior:"Re-Runs Neural Lip-Sync 1,000,000 Times for Duplicate Names",metricImpact:"-94.2% Lip-Sync GPU Compute"},{stage:"2. Rest-Pose Keyframe Anchor (t=2.5s)",controlledEngine:"Locked Neutral Rest-Pose + Closed-Mouth Breath Frame #60",naiveBehavior:"Unaligned Head Pose Causing Jump Cut at Splice Point",metricImpact:"0.0px Seam Jump at t=2.50s"},{stage:"3. Data B-Roll Cutaway (10s–32s)",controlledEngine:"Remotion Personalized SVG Chart + Azure TTS Voiceover",naiveBehavior:"Attempts to Render Data Charts Inside Avatar Video Model",metricImpact:"100% Exact Portfolio Numbers"},{stage:"4. Zero-Transcode GOP Concat",controlledEngine:"FFmpeg concat demuxer (-c:v copy) on Identical SPS/PPS GOPs",naiveBehavior:"Full 45s 1080p x264 Re-Encode per Recipient (52.0s)",metricImpact:"0.38s Assembly · $0.0024/User"}]},"saas-vip-onboarding":{id:"saas-vip-onboarding",titleZh:"B2B SaaS 企业客户注册实时欢迎视频（公司官网截图贴片 + 行业痛点分支路由）",titleEn:"B2B SaaS Real-Time VIP Signup Video (Live Website Screenshot PIP + Industry Branching)",subtitleZh:"用户注册后 3 秒内收到“创始人念出你名字、背景屏幕展示你公司真实官网并滚动演示产品”的定制视频：采用“预缓存姓氏分片 + 透明 Alpha 数字人画中画 + Playwright 客户官网截图合成”",subtitleEn:"Delivers a founder welcome video within 3s of signup featuring the prospect website on screen: Cached Greeting + WebM Alpha Avatar PIP + Live Playwright Website Scroll",recipientCount:25e4,videoDurationSec:35,nameCacheHitRatePct:91.5,controlledStack:"Cached 2.5s Greeting + 8 Industry Branches + Alpha Avatar PIP over Live Website ($0.0045/user)",naiveStack:"Synchronous Tavus / HeyGen API Call Blocking Onboarding Email by 90 Seconds ($0.85/user)",controlledCostPerUserUsd:.0045,naiveCostPerUserUsd:.85,controlledTotalCampaignCostUsd:1125,naiveTotalCampaignCostUsd:212500,controlledRenderLatencySec:1.45,naiveRenderLatencySec:88,controlledAnnualSavingsM:1.26,decisionSummaryZh:"B2B SaaS 增长黑客最喜欢在潜在客户填写注册表单后立刻发送一条“创始人录制、屏幕里正打开客户公司官网”的欢迎视频。若同步调用外部 API，不仅单条高达 $0.85，还要排队等待 88 秒（此时客户早已关掉网页）。通过将数字人抠成预编码透明通道 WebM 画中画（PIP），底层叠加 Playwright 抓取的客户官网滚动画面，仅需 1.45 秒即可实时合成完毕，单条成本仅 $0.0045。",decisionSummaryEn:"Waiting 88 seconds for a synchronous avatar API misses the high-intent signup window. Compositing a pre-encoded Alpha-channel founder PIP + cached 2.5s name greeting over a live Playwright capture of the prospect website delivers a personalized onboarding video in 1.45 seconds at $0.0045/lead.",stages:[{stage:"1. Prospect Domain Capture",controlledEngine:"Headless Chromium Captures Prospect Homepage Viewport (0.6s)",naiveBehavior:"Static Generic Slide Background",metricImpact:"3.4x Higher Email Click-Through"},{stage:"2. Name + Industry Branch Select",controlledEngine:"Cached First-Name Clip + 1 of 8 Pre-Encoded Industry Pain-Point Clips",naiveBehavior:"Full 35s Custom Avatar Generation per Lead",metricImpact:"91.5% Instant Cache Hit"},{stage:"3. Alpha PIP Compositing",controlledEngine:"Pre-Keyed Circular Avatar Overlay on Prospect Website Scroll",naiveBehavior:"Full-Frame GPU Diffusion Re-Synthesis",metricImpact:"1.45s vs 88.0s Turnaround"},{stage:"4. Animated GIF Thumbnail + HLS",controlledEngine:"Auto-Generates 3s Animated Email GIF Preview with Prospect Logo",naiveBehavior:"Generic Static Play Button Thumbnail",metricImpact:"$0.0045 vs $0.85 per Lead"}]},"gaming-season-recap":{id:"gaming-season-recap",titleZh:"大型游戏赛季末 500 万玩家个人高光战报视频（游戏角色语音 + 战绩 KDA 动态包装）",titleEn:"5M-Player Gaming Season Recap Video (Hero Voice TTS + Remotion KDA Highlight Reel)",subtitleZh:"面对 500 万玩家同时点击生成赛季总结视频的瞬时洪峰：采用“客户端 WebCodecs 浏览器本地合成 80% + 服务端 GOP 分片拼接 20%”零服务器爆仓架构",subtitleEn:"Handles 5,000,000 players generating season recaps simultaneously: Client-Side WebCodecs Browser Rendering (80%) + Server GOP Splice Fallback (20%)",recipientCount:5e6,videoDurationSec:30,nameCacheHitRatePct:96.8,controlledStack:"Client-Side WebCodecs Canvas Synthesis + Pre-Baked Hero Clips + Server GOP Fallback ($0.0008/user)",naiveStack:"Server-Side Full Cloud Rendering for 5,000,000 Players ($0.65/user = $3.25M Cloud Bill)",controlledCostPerUserUsd:8e-4,naiveCostPerUserUsd:.65,controlledTotalCampaignCostUsd:4e3,naiveTotalCampaignCostUsd:325e4,controlledRenderLatencySec:.25,naiveRenderLatencySec:65,controlledAnnualSavingsM:6.49,decisionSummaryZh:"当 500 万游戏玩家或音乐 App 用户在年末同一天点开“我的年度视频战报”时，任何完全依赖云端 GPU 实时渲染每条视频的架构都会瞬间爆仓且烧掉数百万美元！最优雅的架构师解法是 **“母版分片 CDN 预分发 + 客户端浏览器 WebCodecs 本地合成”**：将游戏英雄的 24 段高清固定过场 CG 放在 CDN 上（命中率 99.9%），玩家手机/PC 浏览器读取个人 JSON 战绩数据，在本地 Canvas + `WebCodecs VideoEncoder` 中将战绩数字叠加到视频帧上并直接导出可分享 MP4——把 80% 的算力免费卸载给玩家终端设备，单人服务端成本压至 $0.0008！",decisionSummaryEn:"When 5,000,000 players request their Season Recap video on launch day, server-side GPU rendering melts down ($3.25M cost). Distributing 24 pre-rendered hero CG segments via CDN and compositing each player KDA stats locally on their device using `Canvas 2D + WebCodecs VideoEncoder` offloads 80% of compute to client devices at $0.0008/user ($4,000 total vs. $3.25M).",stages:[{stage:"1. Archetype CG CDN Pre-Stage",controlledEngine:"24 Hero Archetype 1080p Segments Cached on Edge CDN (99.9% Hit)",naiveBehavior:"5,000,000 Redundant Server Video Renders",metricImpact:"Zero Origin GPU Bottleneck"},{stage:"2. Client-Side WebCodecs Render",controlledEngine:"Browser Canvas + WebCodecs Hardware Encoder Composites KDA JSON",naiveBehavior:"Uploads JSON to Cloud Queue (45-Minute Queue Wait)",metricImpact:"0.25s Instant Playback"},{stage:"3. Hero Voice Tag Synthesis",controlledEngine:'Quantized Edge TTS + Pre-Cached Rank Callouts ("Diamond Tier!")',naiveBehavior:"Full-Script Cloud TTS Synthesis per Player",metricImpact:"96.8% Audio Segment Cache Hit"},{stage:"4. Server GOP Splice Fallback",controlledEngine:"FFmpeg -c:v copy GOP Stitcher for Legacy WebViews (20% Traffic)",naiveBehavior:"100% Traffic Routed to Cloud GPU Encoders",metricImpact:"$4,000 vs $3.25M Total Campaign"}]}};function d(s,a="controlled"){const e=c[s],n=a==="controlled",t=Number(((e.naiveCostPerUserUsd-e.controlledCostPerUserUsd)/e.naiveCostPerUserUsd*100).toFixed(2)),i=Number((e.naiveRenderLatencySec/e.controlledRenderLatencySec).toFixed(0));return{scenario:e,mode:a,activeCostPerUserUsd:n?e.controlledCostPerUserUsd:e.naiveCostPerUserUsd,activeTotalCampaignCostUsd:n?e.controlledTotalCampaignCostUsd:e.naiveTotalCampaignCostUsd,activeRenderLatencySec:n?e.controlledRenderLatencySec:e.naiveRenderLatencySec,costReductionPct:t,speedupFactor:i,annualSavingsM:e.controlledAnnualSavingsM}}let o="wealth-annual-wrap",r="controlled";function l(){const s=document.querySelector("#app");if(!s)return;const a=d(o,r),e=a.scenario,n=r==="controlled";s.innerHTML=`
    <main class="workbench-shell" data-mode="${r}" data-campaign="${o}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">207TH WORKBENCH · DOMAIN 3 · MILLION-SCALE PERSONALIZED CRM VIDEO SELECTION STUDIO</span>
          <h1>百万级客户千人千面个性化营销视频选型工作台：全片逐人生成 vs 首句 2.5秒改口型缓存 + Remotion GOP 无损流拼接</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="CRM Campaign">
            ${Object.keys(c).map(t=>`
              <button class="seg-btn ${o===t?"active":""}" data-campaign-btn="${t}">
                ${t==="wealth-annual-wrap"?"1. 财富管理 100万客户年度账单 (GOP 拼接 $2,400)":t==="saas-vip-onboarding"?"2. B2B SaaS 注册实时欢迎视频 (官网截图 + Alpha PIP)":"3. 500万玩家赛季战报 (WebCodecs 客户端卸载 $0.0008/人)"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Pipeline Mode">
            <button class="seg-btn ${n?"active":""}" data-mode-btn="controlled">
              ✅ 前缀口型缓存 + 共享母版 + GOP 零重编码拼接 ($${e.controlledCostPerUserUsd}/人)
            </button>
            <button class="seg-btn ${n?"":"active"}" data-mode-btn="naive">
              ⛔ 全片逐人调用数字人 API ($${e.naiveCostPerUserUsd}/人 · 总账单 $${(e.naiveTotalCampaignCostUsd/1e6).toFixed(2)}M)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">单名用户视频生成成本 (Unit Cost / User)</span>
          <strong class="kpi-val ${n?"good":"warn"}">$${a.activeCostPerUserUsd}</strong>
          <span class="kpi-note">成本骤降 -${a.costReductionPct}% · 常见姓氏/名字缓存命中 ${e.nameCacheHitRatePct}%</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">${(e.recipientCount/1e6).toFixed(2)}M 用户单次活动总账单 (Total Campaign Bill)</span>
          <strong class="kpi-val ${n?"good":"warn"}">$${a.activeTotalCampaignCostUsd.toLocaleString()}</strong>
          <span class="kpi-note">对比全片重绘 $${e.naiveTotalCampaignCostUsd.toLocaleString()} · 年省 +$${a.annualSavingsM.toFixed(2)}M</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">单条合成延迟 (Per-User Assembly Latency)</span>
          <strong class="kpi-val ${n?"good":"warn"}">${a.activeRenderLatencySec} s</strong>
          <span class="kpi-note">提速 ${a.speedupFactor}x · FFmpeg -c:v copy / WebCodecs</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">接缝跳帧与数字准确率 (Seam Jump & Data Accuracy)</span>
          <strong class="kpi-val good">0.0 px · 100% Exact</strong>
          <span class="kpi-note">第 60 帧闭嘴中立姿态锚点 + Remotion 矢量收益图表</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 45秒千人千面视频的“分段缓存 + 关键帧 GOP 零重编码流拼接”时序拆解</h2>
            <span class="badge">${n?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="Prefix Cached GOP Spliced Personalized Video Timeline">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 22)">
              <text x="0" y="16" fill="#93c5fd" font-size="12" font-weight="700">为什么 45 秒视频只用重算前 2.5 秒？——三段式 GOP 边界对齐拼接架构 (Identical SPS/PPS Stream Copy)</text>
              <rect x="0" y="30" width="145" height="90" rx="8" fill="#065f46" stroke="#34d399" stroke-width="1.5" />
              <text x="12" y="52" fill="#6ee7b7" font-size="11" font-weight="700">Chunk A (0.0s–2.5s)</text>
              <text x="12" y="72" fill="#f8fafc" font-size="12" font-weight="800">"您好，陈先生！"</text>
              <text x="12" y="92" fill="#a7f3d0" font-size="10">Top-5,000 姓氏 MuseTalk</text>
              <text x="12" y="108" fill="#34d399" font-size="10" font-weight="700">缓存命中率 ${e.nameCacheHitRatePct}% ($0)</text>

              <rect x="160" y="30" width="160" height="90" rx="8" fill="#1e3a8a" stroke="#60a5fa" stroke-width="1.5" />
              <text x="172" y="52" fill="#93c5fd" font-size="11" font-weight="700">Chunk B (2.5s–12.5s)</text>
              <text x="172" y="72" fill="#f8fafc" font-size="12" font-weight="800">数字人行长串场母版</text>
              <text x="172" y="92" fill="#cbd5e1" font-size="10">第 60 帧闭嘴微笑锚点对齐</text>
              <text x="172" y="108" fill="#60a5fa" font-size="10" font-weight="700">100万用户共享预编码 ($0)</text>

              <rect x="335" y="30" width="175" height="90" rx="8" fill="#581c87" stroke="#c084fc" stroke-width="1.5" />
              <text x="347" y="52" fill="#d8b4fe" font-size="11" font-weight="700">Chunk C (12.5s–35.0s)</text>
              <text x="347" y="72" fill="#f8fafc" font-size="12" font-weight="800">Remotion 个人收益曲线</text>
              <text x="347" y="92" fill="#e9d5ff" font-size="10">全屏切镜数据卡片 + 专属 TTS</text>
              <text x="347" y="108" fill="#c084fc" font-size="10" font-weight="700">无需渲染数字人面部 GPU</text>

              <rect x="525" y="30" width="115" height="90" rx="8" fill="#111c33" stroke="#38bdf8" stroke-width="1.5" />
              <text x="537" y="52" fill="#38bdf8" font-size="11" font-weight="700">Chunk D (35–45s)</text>
              <text x="537" y="72" fill="#f8fafc" font-size="12" font-weight="800">片尾专属权益</text>
              <text x="537" y="92" fill="#cbd5e1" font-size="10">FFmpeg -c:v copy</text>
              <text x="537" y="108" fill="#34d399" font-size="10" font-weight="700">0.38s 秒级封包</text>
            </g>

            <g transform="translate(20, 162)">
              <rect width="640" height="118" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="26" fill="#e2e8f0" font-size="13" font-weight="700">100 万用户营销活动总成本数量级对比 (TCO Magnitude Comparison)</text>
              <text x="18" y="54" fill="#fca5a5" font-size="12" font-weight="700">⛔ 全片逐人调用数字人 SaaS API: $1,200,000 ($1.20/人 × 1M) — 绝大部分 ROI 模型直接亏损破产</text>
              <text x="18" y="80" fill="#34d399" font-size="12" font-weight="700">✅ 前缀姓氏缓存 + Remotion 数据切镜 + GOP 无损拼接: $2,400 ($0.0024/人 × 1M) — 成本直降 -99.8%！</text>
              <text x="18" y="104" fill="#94a3b8" font-size="11">无缝拼接关键技术：所有预制分片统一使用固定帧率 (30fps)、相同 H.264 High Profile SPS/PPS 参数，并在切点强制插入 IDR 关键帧</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段百万级千人千面视频流拼接流水线拆解</h2>
            <span class="badge">-99.8% Campaign TCO</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 前缀缓存 + GOP 拼接：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 全片逐人重绘：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,s.querySelectorAll("[data-campaign-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.campaignBtn;i&&(o=i,l())})}),s.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.modeBtn;i&&(r=i,l())})})}l();
