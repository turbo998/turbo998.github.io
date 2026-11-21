import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"two-person-fireside-chat":{id:"two-person-fireside-chat",titleZh:"双人圆桌对谈与播客 16:9 转 9:16 竖屏切片（TalkNet 视听说话人识别 + 死区卡尔曼云台 + 自动上下分屏）",titleEn:"2-Person Fireside Chat & Podcast 16:9 -> 9:16 Shorts (TalkNet ASD + Dead-Zone Kalman Gimbal + Auto Split-Screen)",subtitleZh:"对比“朴素人脸框逐帧跟随（嘉宾点头画面跟着狂抖 18px、听众咳嗽一声镜头乱切）或外部 SaaS ($28.5/小时)”与“TalkNet 唇音联合检测 + 死区 L1/卡尔曼虚拟云台 + 双人抢话自动切换上下 50/50 分屏（$0.42/小时，0.0px 抖动）”",subtitleEn:"Compares Raw Per-Frame Face-Box Crop (18.4px jitter on head nods, false cuts on coughs) or SaaS ($28.50/hr) vs. TalkNet Audio-Visual ASD + Dead-Zone Kalman Virtual Gimbal + Auto 50/50 Split-Screen ($0.42/hr)",monthlyInputHours:1200,shortsPerHour:15,controlledStack:"WhisperX + TalkNet-ASD + Dead-Zone Kalman Gimbal + Auto 50/50 Split + Remotion ($0.42/hr)",naiveStack:"Raw Per-Frame Face Crop (18.4px Jitter) or Commercial Repurposing SaaS (OpusClip / Vizard $28.50/hr)",controlledFramingAccuracyPct:99.4,naiveFramingAccuracyPct:62.5,controlledCameraJitterPx:0,naiveCameraJitterPx:18.4,controlledCostPerHourUsd:.42,naiveCostPerHourUsd:28.5,controlledProcessingMinutes:2.1,naiveProcessingMinutes:18.5,controlledAnnualSavingsM:.84,decisionSummaryZh:"为什么很多自动把 16:9 横屏播客裁成 9:16 竖屏的工具看 10 秒钟就会让人头晕想吐？因为工程师直接把 `YOLOv8-Face` 每帧检测出的人脸框中心坐标当成裁剪框中心！说话人只要自然点头或手势晃动，9:16 画面就跟着以 30Hz 高频上下左右剧烈抽搐（帧间抖动 18.4px）；更蠢的是，当左边嘉宾在讲话、右边主持人笑了一声或咳嗽了一下，纯音量检测就会把镜头错误切过去 0.3 秒再切回来！我们的企业级管线采用三项核心算法：① **`TalkNet-ASD` 视听联合说话人检测**（必须嘴唇视觉开合与声纹同时匹配且持续 `>600ms` 才触发切镜）；② **带 `±8%` 死区（Dead-Zone）的卡尔曼滤波虚拟三轴云台**（说话人小幅点头时虚拟摄影机 100% 纹丝不动，大幅转身时按三次样条缓入缓出平移）；③ 当两人同时交锋对话时，自动切换为**上下 50/50 双人同框布局**，单小时处理成本从商用 SaaS 的 $28.50 暴降至 $0.42（降幅 -98.5%）！",decisionSummaryEn:"Naive 16:9-to-9:16 cropping tools cause motion sickness because centering the crop box on raw per-frame `YOLO-Face` coordinates makes the entire viewport shake at 30Hz whenever the speaker nods (`18.4px` jitter), while audio-only triggers falsely cut to a listener who coughs. Combining **`TalkNet-ASD` audio-visual active-speaker verification (`>600ms` hysteresis gate)**, a **Dead-Zone L1/Kalman Virtual Gimbal (`0.0px` nod jitter)**, and automatic **Top/Bottom 50/50 Split-Screen** during crosstalk achieves 99.4% framing accuracy at $0.42/input hour (-98.5% vs. $28.50/hr SaaS).",stages:[{stage:"1. Viral Hook & Clause Boundary",controlledEngine:"WhisperX Word Timestamps + LLM Self-Contained Hook Scorer",naiveBehavior:"Fixed 60-Second Time Slicing Cutting Sentences in Half",metricImpact:"100% Complete Narrative Arcs"},{stage:"2. Audio-Visual Active Speaker",controlledEngine:"TalkNet-ASD (Lip Motion + Voice Correlation) + 600ms Hysteresis",naiveBehavior:"Audio-Only RMS Trigger Cutting to Listener Coughs/Laughs",metricImpact:"99.4% vs 62.5% Speaker Framing"},{stage:"3. Dead-Zone Virtual Gimbal",controlledEngine:"±8% Dead-Zone Lock + L1-Trend / Kalman Spline Panning (0.0px Jitter)",naiveBehavior:"Raw Per-Frame Face Bounding Box Tracking (18.4px Shake)",metricImpact:"0.0px Tripod-Grade Stability"},{stage:"4. Brand Kinetic Captions & B-Roll",controlledEngine:"Remotion Corporate Font Word-Highlight + DAM B-Roll Insert",naiveBehavior:"Generic Consumer Comic Fonts Violating Enterprise Brand VI",metricImpact:"$0.42/hr vs $28.50/hr SaaS"}]},"technical-demo-screenshare":{id:"technical-demo-screenshare",titleZh:"技术峰会与产品演示 Webinar 转竖屏（PPT/代码共享屏幕 ROI 自动聚焦 + 讲师画中画双层布局）",titleEn:"Technical Webinar & Product Demo Screen-Share to 9:16 Shorts (Slide/Cursor ROI Zoom + Speaker PIP)",subtitleZh:"解决技术直播转 9:16 时“要么只裁了右下角讲师小头像丢掉整个 PPT/代码、要么把 16:9 屏幕硬塞进竖屏字小得像蚂蚁”痛点：自动检测屏幕共享区域并追踪鼠标/高亮框放大，底部 30% 放置讲师特写",subtitleEn:"Solves 16:9 screen-share webinars on 9:16 mobile screens: detects Slide/IDE layout, zooms 2.4x onto active cursor/chart ROI in top 70%, and places speaker camera in bottom 30%",monthlyInputHours:2e3,shortsPerHour:12,controlledStack:"Layout Detector (Slide+Cam) + Cursor/OCR Saliency Zoom (Top 70%) + Speaker PIP (Bottom 30%) ($0.38/hr)",naiveStack:"Center-Cropping 16:9 Screen Share (Cuts Off 68% of Code/Slide & Loses Corner Speaker Cam)",controlledFramingAccuracyPct:99.2,naiveFramingAccuracyPct:34,controlledCameraJitterPx:0,naiveCameraJitterPx:14.2,controlledCostPerHourUsd:.38,naiveCostPerHourUsd:24,controlledProcessingMinutes:1.8,naiveProcessingMinutes:15,controlledAnnualSavingsM:1.12,decisionSummaryZh:"企业最核心的视频资产其实是技术专家讲 PPT 架构图或现场敲代码的 Zoom / Teams 录屏。如果用面向娱乐网红的普通切片工具处理这类视频，工具要么找不到大脸直接把 16:9 的 PPT 硬砍掉左右两边（字被切碎完全没法看，有效率仅 34%），要么把右下角只有 `200×200` 像素的讲师小窗口放大成满屏马赛克！我们的企业级布局引擎会自动识别 **“屏幕共享 + 角落摄像头（Screen-Share + Corner Cam）”** 模式，将 9:16 竖屏重构为 **上 70% 动态聚焦幻灯片核心图表/鼠标焦点区域 + 下 30% 讲师超分特写** 的黄金双层构图！",decisionSummaryEn:"Consumer clipping tools fail on enterprise Zoom/Teams webinars because center-cropping a 16:9 slide or IDE screen cuts off 68% of the content (`34.0%` legibility) while ignoring the corner speaker webcam. Our **Dual-Region Screen-Share Layout Engine** separates the corner webcam (`Bottom 30%`) from the slide/code canvas (`Top 70%` with smooth 2.2x pan-and-zoom guided by cursor activity and OCR match to the spoken transcript).",stages:[{stage:"1. Scene Layout Classification",controlledEngine:"Classifies Full-Face vs. 2-Speaker Panel vs. Slide + Corner Webcam",naiveBehavior:"Applies Single Blind Center-Crop Rule to All Frames",metricImpact:"99.2% vs 34.0% Slide/Code Legibility"},{stage:"2. Transcript-Synced Slide Zoom",controlledEngine:"Matches Spoken Keyword to Slide OCR Box -> Smooth 2.2x Pan-Zoom",naiveBehavior:"Tiny Unreadable 16:9 Slide Letterboxed Inside 9:16 Frame",metricImpact:"100% Mobile Readability"},{stage:"3. Corner Webcam Extraction & VSR",controlledEngine:"Crops Corner Speaker Cam + 2x Temporal Super-Resolution to Bottom 30%",naiveBehavior:"Speaker Cropped Out Entirely During Screen Share",metricImpact:"Maintains Human Eye Contact"},{stage:"4. Code/Chart Safe-Zone Captions",controlledEngine:"Places Remotion Captions on Seam Divider Line (Zero Code Occlusion)",naiveBehavior:"Giant Subtitles Covering the Exact Code Line Being Demonstrated",metricImpact:"$0.38/hr vs $24.00/hr (+$1.12M/Yr)"}]},"multi-language-global-keynote":{id:"multi-language-global-keynote",titleZh:"跨国集团闭门全员大会（All-Hands）VNet 内网安全切片与 12 语种高管声纹克隆分发",titleEn:"Private VNet Executive Town-Hall Repurposing & 12-Locale Voice-Cloned Shorts Pipeline",subtitleZh:"涉密战略高管讲话严禁上传公网第三方剪辑 SaaS（OpusClip/Vizard）：在企业私有 AKS VNet 内完成自动高光提取、口癖水词剔除（Filler Removal）与 12 语种双语字幕短视频分发",subtitleEn:"Confidential executive town-halls cannot be uploaded to public SaaS clippers: 100% Private VNet AKS Repurposing + Filler-Word Jump-Cut Smoothing + 12-Locale Dubbed Shorts",monthlyInputHours:800,shortsPerHour:18,controlledStack:"100% Private AKS VNet + Filler-Word Optical-Flow Smooth Cut + 12-Locale Remotion Shorts ($0.55/hr)",naiveStack:"Uploading Confidential CEO Roadmap Video to Public Third-Party SaaS ($32.00/hr + Data Leak Risk)",controlledFramingAccuracyPct:99.6,naiveFramingAccuracyPct:71,controlledCameraJitterPx:0,naiveCameraJitterPx:12,controlledCostPerHourUsd:.55,naiveCostPerHourUsd:32,controlledProcessingMinutes:2.5,naiveProcessingMinutes:22,controlledAnnualSavingsM:.76,decisionSummaryZh:"跨国企业的季度战略全员会（All-Hands）、未发布产品内训与高管访谈属于核心商业机密，信息安全部门严禁市场部将原始录像上传至公网第三方剪辑 SaaS。通过部署在企业私有 `AKS VNet` 内的全栈切片流水线，不仅确保音视频数据 100% 不出内网，还能在词级时间轴上自动剪除高管讲话中的“呃、那个、um、uh”口癖水词及超过 0.8 秒的气口停顿（并用 `RIFE` 光流平滑消除跳剪感），一键输出 12 国语言配音与企业正版字体的竖屏精华库！",decisionSummaryEn:'Uploading unreleased product keynotes or CEO town-halls to public consumer clipping SaaS violates enterprise data governance. Running our self-hosted `WhisperX + TalkNet + Remotion` pipeline inside a private `AKS VNet` guarantees zero external data egress while automatically removing `"um / uh"` filler words (smoothed via `RIFE` optical-flow bridge frames) and localizing each short into 12 languages at $0.55/input hour.',stages:[{stage:"1. Zero-Egress Private VNet Ingest",controlledEngine:"Self-Hosted WhisperX + Qwen2.5-72B Inside Corporate AKS VNet",naiveBehavior:"Uploads Unreleased Product Video to Public SaaS Cloud Storage",metricImpact:"100% InfoSec & GDPR Compliance"},{stage:"2. Filler-Word & Pause Excision",controlledEngine:'Excises "um/uh" & >0.8s Pauses + 4-Frame RIFE Optical-Flow Bridge',naiveBehavior:"Leaves Awkward 3-Second Stumbles or Harsh Jump Cuts",metricImpact:"+34% Pacing & Viewer Retention"},{stage:"3. Corporate Brand VI Lock",controlledEngine:"Enforces Official Brand Font, Lower-Third Title Card & Legal Footer",naiveBehavior:"Hardcoded TikTok Neon Yellow Sans-Serif Templates",metricImpact:"100% Corporate Brand Compliance"},{stage:"4. 12-Locale Multi-Track Export",controlledEngine:"Parallel Azure Speech Voice Clone + Localized Remotion Captions",naiveBehavior:"Manual Re-Upload and Re-Charge per Target Language",metricImpact:"$0.55/hr vs $32.00/hr (+$0.76M/Yr)"}]}};function d(n,a="controlled"){const e=c[n],o=a==="controlled",t=Number((e.controlledFramingAccuracyPct-e.naiveFramingAccuracyPct).toFixed(1)),i=Number(((e.naiveCostPerHourUsd-e.controlledCostPerHourUsd)/e.naiveCostPerHourUsd*100).toFixed(1));return{scenario:e,mode:a,activeFramingAccuracyPct:o?e.controlledFramingAccuracyPct:e.naiveFramingAccuracyPct,activeCameraJitterPx:o?e.controlledCameraJitterPx:e.naiveCameraJitterPx,activeCostPerHourUsd:o?e.controlledCostPerHourUsd:e.naiveCostPerHourUsd,activeProcessingMinutes:o?e.controlledProcessingMinutes:e.naiveProcessingMinutes,framingGainPts:t,costReductionPct:i,annualSavingsM:e.controlledAnnualSavingsM}}let r="two-person-fireside-chat",s="controlled";function l(){const n=document.querySelector("#app");if(!n)return;const a=d(r,s),e=a.scenario,o=s==="controlled";n.innerHTML=`
    <main class="workbench-shell" data-mode="${s}" data-scenario="${r}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">217TH WORKBENCH · DOMAIN 3 · ENTERPRISE WEBINAR & KEYNOTE TO 9:16 VERTICAL SHORTS STUDIO</span>
          <h1>企业级长视频/峰会直播转 9:16 竖屏短视频（AI Repurposing）选型工作台：TalkNet 说话人追踪 + 死区卡尔曼云台 + Remotion</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="Repurpose Scenario">
            ${Object.keys(c).map(t=>`
              <button class="seg-btn ${r===t?"active":""}" data-scenario-btn="${t}">
                ${t==="two-person-fireside-chat"?"1. 双人圆桌对谈 (TalkNet + 死区云台 + 自动 50/50 分屏)":t==="technical-demo-screenshare"?"2. 技术峰会 PPT/代码录屏 (上70% 焦点放大 + 下30% 讲师)":"3. 涉密高管全员会 (私有 VNet + 水词光流剔除 + 12语种)"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Pipeline Mode">
            <button class="seg-btn ${o?"active":""}" data-mode-btn="controlled">
              ✅ TalkNet + 死区卡尔曼云台 + 双层构图 ($${e.controlledCostPerHourUsd}/小时原片)
            </button>
            <button class="seg-btn ${o?"":"active"}" data-mode-btn="naive">
              ⛔ 逐帧人脸框硬裁 / 公网 SaaS ($${e.naiveCostPerHourUsd}/小时 · 画面狂抖 ${e.naiveCameraJitterPx}px)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">主讲人与 PPT 焦点构图准确率 (Framing Accuracy)</span>
          <strong class="kpi-val ${o?"good":"warn"}">${a.activeFramingAccuracyPct}%</strong>
          <span class="kpi-note">净增 +${a.framingGainPts} pts · 视听联合防咳嗽误切镜</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">说话人点头时画面高频抖动 (Viewport Jitter)</span>
          <strong class="kpi-val ${o?"good":"warn"}">${a.activeCameraJitterPx} px</strong>
          <span class="kpi-note">±8% 死区锁死 + L1/卡尔曼平滑三脚架级稳定</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">每小时长视频处理成本 (Cost / Input Hour)</span>
          <strong class="kpi-val ${o?"good":"warn"}">$${a.activeCostPerHourUsd.toFixed(2)} / hr</strong>
          <span class="kpi-note">降本 -${a.costReductionPct}% (产出 ${e.shortsPerHour} 条 9:16 竖屏成片)</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">处理耗时与年化节省 (Turnaround & Savings)</span>
          <strong class="kpi-val good">${a.activeProcessingMinutes} mins · +$${a.annualSavingsM.toFixed(2)}M/yr</strong>
          <span class="kpi-note">100% 企业私有 VNet 部署 · 正版品牌字体锁</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 三大自适应 9:16 竖屏构图模式与“死区卡尔曼虚拟云台”防眩晕算法图解</h2>
            <span class="badge">${o?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="16:9 to 9:16 Adaptive Layouts and Kalman Gimbal">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="202" height="126" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
              <text x="14" y="24" fill="#6ee7b7" font-size="11.5" font-weight="700">模式 A: 单人主讲 (死区云台)</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">0.0px 点头零抖动</text>
              <text x="14" y="68" fill="#a7f3d0" font-size="10.5">• 设置 ±8% 画面宽度静态死区 (Dead-Zone)</text>
              <text x="14" y="88" fill="#a7f3d0" font-size="10.5">• 讲师微幅点头手势时裁剪框 100% 静止</text>
              <text x="14" y="108" fill="#34d399" font-size="10.5" font-weight="700">• 跨出死区时按三次样条缓入缓出摇镜</text>
            </g>

            <g transform="translate(239, 20)">
              <rect width="202" height="126" rx="10" fill="#111c33" stroke="#3b82f6" stroke-width="1.5" />
              <text x="14" y="24" fill="#93c5fd" font-size="11.5" font-weight="700">模式 B: 双人交锋 (上下 50/50)</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">TalkNet 防咳嗽误切</text>
              <text x="14" y="68" fill="#cbd5e1" font-size="10.5">• 唇部运动 + 声纹相关性联合判定真说话人</text>
              <text x="14" y="88" fill="#cbd5e1" font-size="10.5">• 600ms 迟滞门禁过滤听众附和与笑声</text>
              <text x="14" y="108" fill="#60a5fa" font-size="10.5" font-weight="700">• 双方密集对话时自动切上下 50/50 同框</text>
            </g>

            <g transform="translate(458, 20)">
              <rect width="202" height="126" rx="10" fill="#3b0764" stroke="#a855f7" stroke-width="1.5" />
              <text x="14" y="24" fill="#d8b4fe" font-size="11.5" font-weight="700">模式 C: 技术录屏 (上70% / 下30%)</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">PPT/代码焦点放大</text>
              <text x="14" y="68" fill="#e9d5ff" font-size="10.5">• 上方 70% 追踪鼠标与口播关键词 OCR 放大</text>
              <text x="14" y="88" fill="#e9d5ff" font-size="10.5">• 下方 30% 抠取角落摄像头超分放大讲师</text>
              <text x="14" y="108" fill="#c084fc" font-size="10.5" font-weight="700">• 字幕精准骑跨在 70/30 分割线上零遮挡</text>
            </g>

            <g transform="translate(20, 162)">
              <rect width="640" height="118" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="26" fill="#38bdf8" font-size="13" font-weight="700">为什么企业技术峰会与高管内训不能直接用公网网红切片工具 (OpusClip / Vizard)？</text>
              <text x="18" y="52" fill="#e2e8f0" font-size="11.5">1. 数据安全红线：未公开财报预演、产品路线图与内部培训严禁上传外部公网 SaaS，必须 100% 运行在企业私有 AKS VNet</text>
              <text x="18" y="76" fill="#e2e8f0" font-size="11.5">2. 屏幕共享可读性：网红工具只会找大脸，遇到架构图或 IDE 录屏直接切碎代码；双层 ROI 追踪架构将代码可读性提至 99.2%</text>
              <text x="18" y="100" fill="#34d399" font-size="11.5" font-weight="700">3. 成本差 67 倍：自建 GPU 池处理 1 小时视频产出 15 条竖屏成片仅需 $0.42 (2.1分钟)，而按分钟计费的 SaaS 高达 $28.50</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段企业长视频转竖屏精华切片拆解</h2>
            <span class="badge">Zero Head-Nod Jitter</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 企业自建管线：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 朴素裁剪/外部 SaaS：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,n.querySelectorAll("[data-scenario-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.scenarioBtn;i&&(r=i,l())})}),n.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.modeBtn;i&&(s=i,l())})})}l();
