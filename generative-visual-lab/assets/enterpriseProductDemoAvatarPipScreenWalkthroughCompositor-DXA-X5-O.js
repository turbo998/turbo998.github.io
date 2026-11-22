import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"dynamic-corner-eviction-zoom":{id:"dynamic-corner-eviction-zoom",titleZh:"数字人画中画（Avatar PiP）动态避让右下角按钮 + 4K DOM 焦点弹簧放大（第 227 项工作台）",titleEn:"Dynamic Safe-Corner Avatar PiP Eviction + 4K HiDPI DOM Spring Zoom (227th Studio)",subtitleZh:"对比“固定右下角数字人圆圈死死挡住软件【保存/提交】按钮（36.4% 关键帧遮挡）且全屏小字手机端看不清”与“Playwright DOM 坐标轨迹感知自动将数字人平滑移至对角净空区（100% 零遮挡）+ 2.4倍弹簧聚焦放大（99.6% 手机清晰度）”",subtitleEn:'Compares Static Bottom-Right Avatar Circle Blocking "Submit/Save" Buttons (36.4% UI occlusion) vs. DOM-Aware Dynamic Corner Eviction (100% unoccluded) + 2.4x 4K Spring Zoom (99.6% mobile legibility)',controlledStack:"Playwright 4K DOM Trace + Dynamic Safe-Corner Avatar PiP + Remotion 2.4x Spring Zoom ($0.14/Min)",naiveStack:"Static Bottom-Right Avatar Overlay on Unzoomed 1080p Screen Capture ($3.20/Min · 36.4% Blocked)",controlledUiUnoccludedPct:100,naiveUiUnoccludedPct:63.6,controlledMobileLegibilityPct:99.6,naiveMobileLegibilityPct:54,controlledCostPerMinUsd:.14,naiveCostPerMinUsd:3.2,controlledAnnualSavingsM:2.18,decisionSummaryZh:"企业制作 SaaS 新功能发布、员工 IT 培训或客户学院视频时，最受欢迎的版式是 **“软件实操录屏 + 右下角数字人讲师画中画（Avatar PiP）”**。但直接用普通录屏工具或数字人 SaaS 合成会出现两大硬伤：① **右下角按钮遮挡事故（36.4% 遮挡率）**：现代 Web 系统（如云控制台、CRM、ERP）的主操作按钮（`[提交]`、`[下一步]`、`[保存配置]`）几乎全部设计在屏幕右下角，而数字人气泡恰好死死钉在右下角把关键操作挡得严严实实！② **移动端小字失明（清晰度仅 54%）**：16:9 全屏软件界面在手机上看字高不足 `8px`，根本看不清点了哪个菜单。我们通过 **“Playwright 4K 矢量级录屏 + DOM 碰撞检测数字人动态避让（Dynamic Corner Eviction） + 2.4× 临界阻尼弹簧焦点放大”**：当鼠标或目标按钮进入右下象限时，数字人讲师提前 `400ms` 沿贝塞尔曲线优雅滑向左上或左下净空区（**100.0% 零按钮遮挡**），同时镜头平滑推进 `2.4 倍` 聚焦当前输入框，单分钟合成成本仅 **`$0.14`（年省 `+$2.18M`）**！",decisionSummaryEn:'In enterprise product demos and LMS software training, the standard **"Screen Walkthrough + Bottom-Right Presenter Avatar PiP"** layout fails on two counts: (1) **36.4% Primary Button Occlusion**—because modern web apps place `[Save]`, `[Deploy]`, and `[Next]` buttons in the bottom-right corner, a static bottom-right avatar bubble completely blocks the action being demonstrated; and (2) **54.0% Mobile Illegibility** on unzoomed 1080p desktop captures. Our **DOM-Aware Avatar PiP + 4K Spring-Zoom Compositor** reads Playwright’s exact DOM bounding-box timeline, glides the avatar bubble to an unoccluded corner `400ms` before cursor arrival (**100.0% zero UI occlusion**), and applies a `2.4×` critically damped spring zoom onto active UI controls (**99.6% mobile legibility at `$0.14/min`**).',stages:[{stage:"1. Playwright 4K HiDPI DOM Trace",controlledEngine:"Captures 3840x2160 60fps Video + JSON Log of Clicked DOM Rects",naiveBehavior:"Flat 1080p Screen Capture Without Element Coordinate Metadata",metricImpact:"99.6% vs 54.0% Mobile Clarity"},{stage:"2. Predictive Corner Eviction",controlledEngine:"Glides Avatar PiP Away 400ms Before Cursor Enters Bottom-Right",naiveBehavior:"Static Bottom-Right Avatar Blocks [Save / Submit] Buttons",metricImpact:"100.0% vs 63.6% Unoccluded UI"},{stage:"3. Critically Damped Spring Camera",controlledEngine:"2.4x Smooth Zoom onto Active Input / Dropdown (ζ=1.0 Zero Overshoot)",naiveBehavior:"Static Wide Desktop View Leaves 10px Font Unreadable on Phone",metricImpact:"+84% Viewer Step Completion"},{stage:"4. Split-Layout Side-Rail Mode",controlledEngine:"Switches to 82/18 Dedicated Side Rail When All 4 Corners Are Busy",naiveBehavior:"Avatar Floats Directly Over Dense Financial Data Tables",metricImpact:"$0.14 vs $3.20/Min (+$2.18M/Yr)"}]},"wordboundary-dom-highlight-gaze":{id:"wordboundary-dom-highlight-gaze",titleZh:"TTS 词级时间戳（WordBoundary）驱动数字人转头视线、手势指向与 DOM 聚光灯同频联动",titleEn:"TTS WordBoundary-Driven Avatar Gaze/Pointing Gesture & DOM Spotlight Synchronization",subtitleZh:"解决数字人讲师“两眼呆滞直视前方、嘴里说看左边图表但头都不转一下”的割裂感：根据台词触发词自动切换数字人 15° 侧视画面并点亮对应 DOM 高亮聚光灯",subtitleEn:'Eliminates robotic disconnect where the avatar stares straight ahead while saying "look at this chart": syncs TTS WordBoundary timestamps with avatar gaze/gesture clips and DOM spotlight rings',controlledStack:"Azure TTS WordBoundary + Avatar Gaze/Point State Clips + Remotion DOM Spotlight ($0.16/Min)",naiveStack:"Uncoupled Forward-Staring Talking Head Pasted Over Screen Recording ($3.50/Min)",controlledUiUnoccludedPct:99.8,naiveUiUnoccludedPct:66,controlledMobileLegibilityPct:99.5,naiveMobileLegibilityPct:58,controlledCostPerMinUsd:.16,naiveCostPerMinUsd:3.5,controlledAnnualSavingsM:1.82,decisionSummaryZh:'为什么很多企业用数字人做的产品演示视频看起来像“两个毫不相干的视频硬拼在一起”？因为数字人全程死死盯着正前方镜头，哪怕台词里正在说“请看左上角的异常告警曲线”，数字人既不转头看左上角，画面上也没有任何视觉引导！我们打通了 **“语音词级边界（TTS WordBoundary） × 数字人多姿态状态机 × Remotion DOM 聚光灯”三方同频总线**：当 TTS 读到 `"点击右上角【新建集群】"` 的毫秒瞬间（误差 `<8ms`），① 数字人状态机自动切入 **`Look_Inward_15Deg + Hand_Present`（向屏幕内侧转头 15° 并做出引导手势）**；② 屏幕背景自动压暗 `45%`（Backdrop Dimming），仅将被指向的 `DOM #create-cluster-btn` 按钮以 100% 亮度与脉冲发光框凸显出来，观众视线瞬间聚焦！',decisionSummaryEn:'Standard avatar screen-walkthroughs feel disconnected because the presenter stares blankly forward even while saying *"Notice the spike in the top-left latency chart."* Our **Tri-Modal Synchronization Bus** links **Azure TTS `WordBoundary` events (`<8ms` precision)** to both the **Remotion DOM Spotlight layer** (dimming the surrounding UI by `45%` and pulsing a highlight border around the target DOM node) and the **Avatar Pose State Machine** (triggering a `15°` inward screen gaze and open-palm presentation gesture toward the active quadrant).',stages:[{stage:"1. WordBoundary Trigger Compiler",controlledEngine:'Parses Script Tags (@focus("#btn-deploy")) into Exact ms Timestamps',naiveBehavior:"Manual Video Editor Keyframing Spotlight Masks by Hand",metricImpact:"<8ms Audio-to-UI Highlight Sync"},{stage:"2. Quadrant-Aware Avatar Gaze",controlledEngine:"Rotates Avatar Head/Eyes 15° Toward Active Screen Quadrant",naiveBehavior:"Avatar Stares Blankly Straight Ahead Throughout Entire Demo",metricImpact:"Natural Presenter-Screen Engagement"},{stage:"3. Non-Destructive DOM Spotlight",controlledEngine:"Dims Surrounding Screen 45% & Pulses SVG Ring Around Target Node",naiveBehavior:"Viewer Searches Cluttered 40-Button Toolbar for 6 Seconds",metricImpact:"99.5% vs 58.0% Visual Guidance"},{stage:"4. Keystroke & Toast Pacing",controlledEngine:"Pauses TTS Naturally While Waiting for UI Modal Animation to Settle",naiveBehavior:"Voiceover Races Ahead of Slow Screen Recording Transitions",metricImpact:"$0.16 vs $3.50/Min (+$1.82M/Yr)"}]},"multilingual-playwright-rerun":{id:"multilingual-playwright-rerun",titleZh:"软件发版 CI/CD 驱动 12语种产品教程全自动重录与数字人换口型（代码改一行、3分钟更新 12国视频）",titleEn:"CI/CD Automated 12-Locale Playwright UI Re-Capture + Isochronous Avatar Dubbing Pipeline",subtitleZh:"解决 SaaS 产品界面每次小改版就导致“存量 200条培训视频界面过时作废、人工重录需 3周”痛点：把教程写成声明式 Playwright 脚本，发版时自动切换 `?lang=ja/de/es` 重跑 4K 录屏并合成对应语种数字人",subtitleEn:"Solves obsolete product training videos after UI updates: stores tutorials as declarative Playwright scripts that auto-capture native 12-locale UIs on CI/CD release and composite localized avatars in 3.5 minutes",controlledStack:"CI/CD Playwright `?lang=` Native UI Capture + MuseTalk 256px Avatar + Remotion ($0.12/Min)",naiveStack:"Manual Screen Recording & Editing Across 12 Languages After Every UI Release ($4.50/Min)",controlledUiUnoccludedPct:100,naiveUiUnoccludedPct:68,controlledMobileLegibilityPct:99.8,naiveMobileLegibilityPct:60,controlledCostPerMinUsd:.12,naiveCostPerMinUsd:4.5,controlledAnnualSavingsM:2.64,decisionSummaryZh:"B2B 软件公司最大的隐形成本是 **“文档与培训视频腐烂（Tutorial Rot）”**：产品前端每周都在迭代改版，哪怕只是改了一个导航栏布局，过去半年录制的 200 条客户培训视频和 12 国语言教程就全部因为“视频里的界面跟最新线上版本长得不一样”而作废！架构师的终极解法是将 **“视频教程代码化（Video-as-Code via Playwright + Remotion）”**：每一条产品教程在 Git 仓库里都是一段声明式的 `tutorial.spec.ts` 脚本（内含点击步骤与台词锚点）。每当产品 CI/CD 发布新版本时，流水线自动拉起无头浏览器，依次传入 `?locale=zh-CN / en-US / ja-JP / de-DE` 真实渲染出 12 国原生软件界面并录制 4K 操作流，同时合成对应语种的 `MuseTalk` 数字人画中画——**3.5 分钟全自动吐出 12 国最新界面高清视频，永远零过时，年省 `+$2.64M`**！",decisionSummaryEn:'The hidden killer in B2B SaaS education is **"Tutorial Rot"**: every time frontend engineers update a navigation bar or modal dialog, hundreds of recorded training videos across 12 languages become obsolete overnight. By treating **Tutorials-as-Code (`Playwright + Remotion`)**, each product walkthrough is stored in Git as a declarative script. On every CI/CD release, headless Chromium automatically executes the workflow against `?locale=en/ja/de/fr/es`, records native localized 4K UI footage + DOM coordinates, and composites the localized `MuseTalk` avatar PiP—updating all 12 language videos in **3.5 minutes at `$0.12/min` (`+$2.64M/yr` saved)**.',stages:[{stage:"1. Tutorial-as-Code in Git CI/CD",controlledEngine:"Stores Walkthrough Steps & Voiceover Anchors as Versioned Spec",naiveBehavior:" Static MP4 Files Rot Immediately When Product UI Changes",metricImpact:"100% Always-Up-To-Date UI"},{stage:"2. Native `?locale=` UI Rendering",controlledEngine:"Playwright Captures True Localized Japanese/German Web App DOM",naiveBehavior:"English UI Screen Recording with Awkward Translated Subtitles",metricImpact:"99.8% Native Locale Immersion"},{stage:"3. Synthetic Bezier Cursor Motion",controlledEngine:"Replaces Jittery Human Mouse with Smooth Fitts-Law Bezier Path",naiveBehavior:"Human Presenter Wiggles Mouse or Misclicks During Recording",metricImpact:"Zero Retakes Needed"},{stage:"4. Parallel 12-Language Compilation",controlledEngine:"Renders 12 Localized Avatar + 4K Screen Masters in 3.5 Minutes",naiveBehavior:"3 Weeks of Manual Re-Recording by Regional Customer Success Teams",metricImpact:"$0.12 vs $4.50/Min (+$2.64M/Yr)"}]}};function d(n,a="controlled"){const e=c[n],i=a==="controlled",t=Number((e.controlledUiUnoccludedPct-e.naiveUiUnoccludedPct).toFixed(1)),o=Number(((e.naiveCostPerMinUsd-e.controlledCostPerMinUsd)/e.naiveCostPerMinUsd*100).toFixed(1));return{scenario:e,mode:a,activeUiUnoccludedPct:i?e.controlledUiUnoccludedPct:e.naiveUiUnoccludedPct,activeMobileLegibilityPct:i?e.controlledMobileLegibilityPct:e.naiveMobileLegibilityPct,activeCostPerMinUsd:i?e.controlledCostPerMinUsd:e.naiveCostPerMinUsd,unoccludedGainPts:t,costReductionPct:o,annualSavingsM:e.controlledAnnualSavingsM}}let r="dynamic-corner-eviction-zoom",l="controlled";function s(){const n=document.querySelector("#app");if(!n)return;const a=d(r,l),e=a.scenario,i=l==="controlled";n.innerHTML=`
    <main class="workbench-shell" data-mode="${l}" data-scenario="${r}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">227TH WORKBENCH · DOMAIN 3: VIDEO LOCALIZATION & TUTORIAL AUTOMATION · AVATAR PIP + 4K DOM WALKTHROUGH COMPOSITOR</span>
          <h1>企业产品演示“数字人讲师画中画 + 4K 软件实操录屏联动（Avatar PiP + DOM Walkthrough）”自动成片工作台</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="Avatar PiP Scenario">
            ${Object.keys(c).map(t=>`
              <button class="seg-btn ${r===t?"active":""}" data-scenario-btn="${t}">
                ${t==="dynamic-corner-eviction-zoom"?"1. 数字人气泡动态避让右下角按钮 + 2.4x 弹簧放大":t==="wordboundary-dom-highlight-gaze"?"2. TTS 词级触发数字人转头手势与 DOM 聚光灯":"3. CI/CD Playwright 12语种原生界面自动重录"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Avatar PiP Mode">
            <button class="seg-btn ${i?"active":""}" data-mode-btn="controlled">
              ✅ DOM 感知动态避让 + 4K 弹簧聚焦 + CI/CD 自动重录 (${e.controlledUiUnoccludedPct}% 零遮挡 · $${e.controlledCostPerMinUsd}/min)
            </button>
            <button class="seg-btn ${i?"":"active"}" data-mode-btn="naive">
              ⛔ 固定右下角数字人死挡按钮 + 1080p 全屏小字 (遮挡率 ${(100-e.naiveUiUnoccludedPct).toFixed(1)}% · $${e.naiveCostPerMinUsd}/min)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">软件核心按钮零遮挡率 (UI Unoccluded Rate)</span>
          <strong class="kpi-val ${i?"good":"warn"}">${a.activeUiUnoccludedPct}%</strong>
          <span class="kpi-note">净增 +${a.unoccludedGainPts} pts · 鼠标靠近右下角前 400ms 自动滑向对角</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">手机端表单与代码可读率 (Mobile Legibility)</span>
          <strong class="kpi-val ${i?"good":"warn"}">${a.activeMobileLegibilityPct}%</strong>
          <span class="kpi-note">Playwright 4K HiDPI 采集 + 2.4倍临界阻尼弹簧放大</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">每分钟多语种成片成本 (Cost per Minute)</span>
          <strong class="kpi-val ${i?"good":"warn"}">$${a.activeCostPerMinUsd}/min</strong>
          <span class="kpi-note">成本直降 -${a.costReductionPct}% · Video-as-Code 随发版自动重跑</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">年化客户培训与发版净省 (Annual Savings)</span>
          <strong class="kpi-val good">+$${a.annualSavingsM.toFixed(2)}M/yr · 227th Studio</strong>
          <span class="kpi-note">彻底终结 UI 改版后 200条存量培训视频腐烂作废</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. Video-as-Code：Playwright 4K DOM 轨迹采集 × 数字人动态避让与视线联动 × Remotion 合成架构</h2>
            <span class="badge">${i?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="Enterprise Product Demo Avatar PiP and 4K Screen Walkthrough Compositor">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="202" height="126" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
              <text x="14" y="24" fill="#6ee7b7" font-size="11.5" font-weight="700">1. 数字人气泡智能避让按钮</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">100% 零按钮遮挡</text>
              <text x="14" y="68" fill="#a7f3d0" font-size="10.5">• 实时读取点击 DOM 矩形坐标 (x,y,w,h)</text>
              <text x="14" y="88" fill="#a7f3d0" font-size="10.5">• 提前 400ms 沿贝塞尔曲线滑向对角净空区</text>
              <text x="14" y="108" fill="#34d399" font-size="10.5" font-weight="700">• 终结固定右下角头像挡死 [提交/保存] 按钮</text>
            </g>

            <g transform="translate(239, 20)">
              <rect width="202" height="126" rx="10" fill="#111c33" stroke="#3b82f6" stroke-width="1.5" />
              <text x="14" y="24" fill="#93c5fd" font-size="11.5" font-weight="700">2. 词级触发视线与 2.4x 聚焦</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">&lt;8ms 声画聚光同步</text>
              <text x="14" y="68" fill="#cbd5e1" font-size="10.5">• TTS WordBoundary 驱动 2.4x 弹簧推镜</text>
              <text x="14" y="88" fill="#cbd5e1" font-size="10.5">• 同步触发数字人向屏幕内侧 15° 转头手势</text>
              <text x="14" y="108" fill="#60a5fa" font-size="10.5" font-weight="700">• 背景压暗 45% 凸显当前操作输入框</text>
            </g>

            <g transform="translate(458, 20)">
              <rect width="202" height="126" rx="10" fill="#3b0764" stroke="#a855f7" stroke-width="1.5" />
              <text x="14" y="24" fill="#d8b4fe" font-size="11.5" font-weight="700">3. CI/CD 12语种自动重录管线</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">3.5m 更新 12国视频</text>
              <text x="14" y="68" fill="#e9d5ff" font-size="10.5">• 教程存为 Git 仓库 Playwright 自动化脚本</text>
              <text x="14" y="88" fill="#e9d5ff" font-size="10.5">• 发版自动切换 ?locale=ja/de 抓取原生界面</text>
              <text x="14" y="108" fill="#c084fc" font-size="10.5" font-weight="700">• 彻底根治软件 UI 改版导致旧视频全部作废</text>
            </g>

            <g transform="translate(20, 162)">
              <rect width="640" height="118" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="26" fill="#38bdf8" font-size="13" font-weight="700">企业产品演示与培训视频三大技术路线选型对比</text>
              <text x="18" y="52" fill="#e2e8f0" font-size="11.5">• 路线 A（推荐）：Playwright 4K DOM 自动录制 + 动态避让数字人 PiP + Remotion 弹簧镜头（$0.14/min，UI 改版 3.5m 自动更新）</text>
              <text x="18" y="76" fill="#e2e8f0" font-size="11.5">• 路线 B：人工 Loom 录屏 + 固定右下角 HeyGen 数字人贴片（36.4% 挡住右下角按钮，且每次软件改版需人工重录 12 国版本）</text>
              <text x="18" y="100" fill="#fca5a5" font-size="11.5" font-weight="700">• 路线 C（反模式）：直接让视频大模型 (Sora/Veo) 生成软件操作画面（UI 文字 100% 乱码幻觉，完全不可用于真实软件演示）</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段数字人画中画与 DOM 录屏联动拆解</h2>
            <span class="badge">227th Workbench</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ DOM 感知动态合成：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 固定死角静态叠图：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,n.querySelectorAll("[data-scenario-btn]").forEach(t=>{t.addEventListener("click",()=>{const o=t.dataset.scenarioBtn;o&&(r=o,s())})}),n.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const o=t.dataset.modeBtn;o&&(l=o,s())})})}s();
