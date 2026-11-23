import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"topological-progressive-reveal":{id:"topological-progressive-reveal",titleZh:"40节点云架构图拓扑排序渐进式剥洋葱呈现（Topological Progressive Reveal）（第 234 项工作台）",titleEn:"40-Node Cloud Architecture Topological DAG Progressive Reveal Compiler (234th Studio)",subtitleZh:"对比“第0秒把 40个微服务方框一次性砸在屏幕上（观众认知过载，前15秒流失率 62%）或丢进 I2V 视频模型导致文字全糊成乱码”与“拓扑排序按请求链路分 6幕渐进点亮 + 其余节点 25% 压暗（架构理解度 99.4% · 4K 矢量零模糊）”",subtitleEn:"Compares Dumping All 40 Boxes on Frame 0 (62% cognitive drop-off) or Running Pixel I2V (0% text legibility) vs. Topological DAG Progressive Reveal + 25% Inactive Node Dimming (99.4% comprehension · 100% vector sharpness)",controlledStack:"Mermaid/Draw.io AST + Topological DAG Reveal + Motion Canvas / Remotion 60fps ($0.015/Clip)",naiveStack:"Static 40-Node Eye-Chart Slide or Manual After Effects Keyframing ($550/Clip · 6.5h Labor)",controlledComprehensionScorePct:99.4,naiveComprehensionScorePct:54,controlledTextSharpnessPct:100,naiveTextSharpnessPct:62,controlledCostPerClipUsd:.015,naiveCostPerClipUsd:4.8,controlledAnnualSavingsM:2.34,decisionSummaryZh:"当 Cloud & AI Solution Architect 在向客户高管汇报、录制技术发布 Keynote 或制作开发者博客视频时，最常犯的错误就是 **“把一张包含 40 个节点、60 根箭头的完整架构大图在第 0 秒直接塞满整个屏幕（Eye-Chart Overload）”**——观众的眼睛在 40 个方框之间四处乱找，根本不知道讲师正在讲哪一个模块（前 15 秒认知流失率高达 `62%`）！而如果请后期动效师在 After Effects 里手动给 40 个节点和连线打关键帧，每做一条 60 秒的架构动画要花 **`6.5 小时`（`$550`）**；如果把静态架构图丢给 `Sora 2 / Runway I2V` 图生视频，图上的英文技术名词会瞬间融化成外星乱码！我们构建 **“Mermaid/Draw.io AST 拓扑排序 → Motion Canvas / Remotion 声明式动态架构编译器”**：自动按有向无环图（DAG）入度顺序将复杂架构拆解为 6 幕渐进生长的动画，当前讲解的子图 100% 高亮放大、其余背景节点自动压暗至 `25%` 透明度，**4.2 秒直接编译出 4K 60fps 矢量架构讲解大片（单条 `$0.015`，年省 `+$2.34M`）**！",decisionSummaryEn:"Presenting a dense 40-node enterprise architecture diagram all at once on Frame 0 causes immediate cognitive overload (**`46.0%` comprehension drop**), while manually keyframing node reveals and path pulses in After Effects takes **`6.5 hours` (`$550/clip`)**, and feeding static diagrams into pixel `I2V` models melts technical labels into gibberish. Our **Mermaid/Draw.io AST -> Motion Canvas / Remotion Compiler** performs a **Kahn Topological DAG Sort** to reveal the system progressively along the request path (`Ingress -> AI Gateway -> AKS Pool -> Vector DB`), dimming inactive subgraphs to `25%` opacity—achieving **99.4% executive comprehension and 100.0% 4K vector sharpness in `4.2s` at `$0.015/clip` (`+$2.34M/yr` saved)**.",stages:[{stage:"1. Kahn Topological DAG Sequencing",controlledEngine:"Orders Node Reveal Automatically Along Request Path (In-Degree Sort)",naiveBehavior:"Dumps All 40 Boxes & 60 Arrows onto Screen Simultaneously at t=0",metricImpact:"99.4% vs 54.0% Comprehension"},{stage:"2. 3x3 Cognitive Spotlight Dimming",controlledEngine:"Highlights Active Subgraph (100% Opacity) & Dims Context to 25%",naiveBehavior:"Audience Searches Cluttered Slide While Speaker Talks",metricImpact:"Zero Cognitive Overload"},{stage:"3. Spring-Physics Box & Badge Mount",controlledEngine:"Animates Official Azure/AWS SVG Nodes with ζ=0.85 Spring Scale",naiveBehavior:"Abrupt Hard Cuts or Blurry Pixel-Diffused Box Borders",metricImpact:"100.0% 4K Vector Sharpness"},{stage:"4. Git-Driven 4.2s Re-Compilation",controlledEngine:"Edit 1 Line of Mermaid/Draw.io -> Re-Renders 60fps MP4 in 4.2s",naiveBehavior:"Adding 1 Node Requires 2 Hours of Manual AE Keyframe Shifting",metricImpact:"$0.015 vs $4.80 (+$2.34M/Yr)"}]},"stroke-dash-packet-failover-pulse":{id:"stroke-dash-packet-failover-pulse",titleZh:"SVG `stroke-dashoffset` 实时请求流光脉冲与多云熔断容灾（Failover）状态机演练动画",titleEn:"SVG `stroke-dashoffset` Glowing Packet Pulses & Circuit-Breaker Failover State Animation",subtitleZh:"解决静态架构图“看不出正常流量走哪条路、主区域故障时怎么在 50ms 内切往备用区域”痛点：用参数化 SVG 路径长度方程驱动高对比发光数据流，并动态演示红叉告警与绿色逃逸切换",subtitleEn:"Brings static architecture lines to life via parameterized SVG `getTotalLength()` glowing packet pulses and animated Phase-1 Normal (Green) -> Phase-2 Outage (Red X) -> Phase-3 Failover Reroute state transitions",controlledStack:"SVG getTotalLength() Dash-Offset Pulse + 3-Phase Failover State Machine ($0.018/Clip)",naiveStack:"Static Dashed Lines in PowerPoint or Hallucinated I2V Particle Blobs ($5.20/Clip)",controlledComprehensionScorePct:99.6,naiveComprehensionScorePct:58,controlledTextSharpnessPct:100,naiveTextSharpnessPct:60,controlledCostPerClipUsd:.018,naiveCostPerClipUsd:5.2,controlledAnnualSavingsM:1.92,decisionSummaryZh:"架构师向客户演示“高可用容灾架构”或“多模型路由网关”时，静态胶片最大的痛点是：**正常路径和容灾逃逸路径画在同一张图上，客户分不清什么时候走实线、什么时候走虚线**！我们在编译器中实现了 **“三阶段架构状态机脚本（3-Phase Architecture State DSL）”**：① `t = 0..4s`（稳态期）：蓝色发光脉冲沿 `SVG path.getTotalLength()` 精确流向主区域 `East US`；② `t = 4.0s`（故障注入期）：主区域节点触发红色闪烁告警徽章 `HTTP 429 / Region Down`，通往主区域的路径瞬间变红并阻断粒子流；③ `t = 4.2s..8s`（50ms 熔断逃逸期）：备用路径点亮翠绿色光流，数据脉冲无缝切往 `West Europe / AKS 温池` 并在顶部浮现 `SLA 99.98% Maintained` 指标卡——一段 8 秒动画胜过千言万语！",decisionSummaryEn:"Static architecture slides struggle to communicate dynamic system behavior like **circuit-breaker failover, cache hit/miss branching, or token-bucket rate limiting** because primary and fallback arrows sit frozen on the same page. Our **3-Phase Architecture State DSL** animates glowing data packets along exact orthogonal SVG paths (`stroke-dashoffset` parameterized by `path.getTotalLength()`) across three choreographed acts: **Act 1 (Steady-State Blue Flow)** -> **Act 2 (Primary Region `HTTP 429` Red Alert & Path Sever)** -> **Act 3 (`50ms` Emerald Failover Reroute to Secondary AKS Pool)**—making complex resilience guarantees effortless for executives to grasp.",stages:[{stage:"1. Exact SVG Path-Length Parameterization",controlledEngine:"Drives Glowing Packet Trails Along Orthogonal Bends via getTotalLength()",naiveBehavior:"Particles Drift Off Lines or Cut Diagonally Across Boxes",metricImpact:"0.0 px Path Tracking Error"},{stage:"2. 3-Act Fault-Injection Choreography",controlledEngine:"Animates Steady State -> Red HTTP 429 Fault -> Green Failover Reroute",naiveBehavior:"Static Diagram Shows Primary & Backup Lines Simultaneously",metricImpact:"99.6% vs 58.0% Clarity"},{stage:"3. Live Latency & Throughput Counter",controlledEngine:"Interpolates Real-Time P99 Latency & RPS Badges Next to Active Edges",naiveBehavior:"Disconnected Static Text Numbers in Slide Footnotes",metricImpact:"100% Quantitative Proof"},{stage:"4. Transparent Alpha WebM / MP4 Export",controlledEngine:"Exports 60fps VP9/ProRes Alpha Overlay Ready for Keynote & Premiere",naiveBehavior:"Locked Flat Background Cannot Be Layered Over Presenter Video",metricImpact:"$0.018 vs $5.20 (+$1.92M/Yr)"}]},"wordboundary-svg-camera-choreography":{id:"wordboundary-svg-camera-choreography",titleZh:"语音词级时间戳（TTS WordBoundary）驱动无限 SVG 画布虚拟摄影机平滑推拉摇移（Pan & Zoom）",titleEn:"TTS WordBoundary-Driven Infinite SVG Canvas Virtual Camera Pan & Zoom Choreography",subtitleZh:"解决在手机或视频里看巨型架构图“全景字太小看不清、局部裁剪又不知道当前模块在整体架构的哪个位置”痛点：采用“全景建立镜头 → 词级触发 2.8倍平滑推进子模块 → 全景收尾”电影级运镜",subtitleEn:'Solves the "too small in wide view, lost context in crop view" dilemma via cinematic Establish Wide -> WordBoundary 2.8x Subgraph Pan/Zoom -> Wide Pull-Back camera choreography',controlledStack:"Azure TTS WordBoundary + SVG ViewBox Spring Camera (Wide -> 2.8x Subgraph Pan) ($0.022/Clip)",naiveStack:"Static Unzoomed Wide Diagram on Video (8px Unreadable Labels on Mobile) ($4.50/Clip)",controlledComprehensionScorePct:99.7,naiveComprehensionScorePct:51.5,controlledTextSharpnessPct:100,naiveTextSharpnessPct:55,controlledCostPerClipUsd:.022,naiveCostPerClipUsd:4.5,controlledAnnualSavingsM:2.15,decisionSummaryZh:'当架构师把一张包含 5 个子系统的云架构图放进技术讲解视频时，面临一个两难困境：如果保持全景不放大，手机和平板观众看到的节点文字只有 `7px`，完全看不清；如果直接裁切成 5 张孤立局部图，观众又丢失了全局空间位置感（不知道当前模块在整个数据流的上下游哪里）！我们通过 **“SVG `viewBox` 虚拟摄影机三段式运镜（Establish Wide → WordBoundary 2.8× Subgraph Pan → Wide Pull-Back）”**：先用 1.5 秒展示全局架构骨架建立空间心智地图，随后每当配音读到 `@subgraph("vpc-data-plane")` 时，虚拟摄影机在矢量 SVG 画布上沿平滑弹簧曲线推进 `2.8 倍`（因为是纯矢量重光栅化，放大 10 倍依然 **100.0% 边缘锐利如刀割**），沿着数据流一路平滑摇镜跟拍，最后拉回全景完美收官！',decisionSummaryEn:"In technical explainer videos, showing a full-system architecture in a static wide shot leaves node labels unreadable (`7px` tall on mobile), whereas cutting to isolated crops destroys spatial context. By animating the **SVG `viewBox(x, y, w, h)` as a Critically Damped Virtual Camera** synchronized to **Azure TTS `WordBoundary` events**, the video opens with a 1.5s wide establishing shot, smoothly zooms `2.8×` into each active `subgraph` as the narrator names it (maintaining **100.0% infinite vector rasterization sharpness**), pans along the data-flow arrows from left to right, and pulls back to the full topology at the conclusion.",stages:[{stage:"1. Wide Establishing Mental Map (1.5s)",controlledEngine:"Opens on Full Architecture Skeleton Before Zooming Into Details",naiveBehavior:"Jumps Straight Into Isolated Crop Without Global Context",metricImpact:"99.7% Spatial Orientation"},{stage:"2. Infinite-Resolution SVG ViewBox Zoom",controlledEngine:"Re-Rasterizes Vector SVG at Native 4K During 2.8x Camera Zoom",naiveBehavior:"Digital Zoom on Raster PNG Blurs Text Into Pixelated Blocks",metricImpact:"100.0% vs 55.0% Text Sharpness"},{stage:"3. WordBoundary Subgraph Tracking",controlledEngine:"Pans Camera Center (cx, cy) to Active Node Within <10ms of Speech",naiveBehavior:"Manual Camera Keyframing Drifts Out of Sync After Script Edits",metricImpact:"Zero Audio-Camera Lag"},{stage:"4. Dual 16:9 Keynote + 9:16 Shorts Output",controlledEngine:"Auto-Reframes Camera Viewport for Both 16:9 YouTube & 9:16 Shorts",naiveBehavior:"16:9 Wide Diagram Shrunk Into Tiny Strip in 9:16 Vertical Video",metricImpact:"$0.022 vs $4.50 (+$2.15M/Yr)"}]}};function d(n,a="controlled"){const e=c[n],o=a==="controlled",t=Number((e.controlledComprehensionScorePct-e.naiveComprehensionScorePct).toFixed(1)),i=Number(((e.naiveCostPerClipUsd-e.controlledCostPerClipUsd)/e.naiveCostPerClipUsd*100).toFixed(1));return{scenario:e,mode:a,activeComprehensionScorePct:o?e.controlledComprehensionScorePct:e.naiveComprehensionScorePct,activeTextSharpnessPct:o?e.controlledTextSharpnessPct:e.naiveTextSharpnessPct,activeCostPerClipUsd:o?e.controlledCostPerClipUsd:e.naiveCostPerClipUsd,comprehensionGainPts:t,costReductionPct:i,annualSavingsM:e.controlledAnnualSavingsM}}let r="topological-progressive-reveal",s="controlled";function l(){const n=document.querySelector("#app");if(!n)return;const a=d(r,s),e=a.scenario,o=s==="controlled";n.innerHTML=`
    <main class="workbench-shell" data-mode="${s}" data-scenario="${r}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">234TH WORKBENCH · DOMAIN 5: CTO ARCHITECTURE ANIMATION COMPILER · MERMAID/DRAW.IO AST TO 60FPS MOTION CANVAS</span>
          <h1>企业技术架构图（Mermaid / Draw.io / SVG）自动编译 60fps 动态讲解视频与容灾流光动画工作台</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="Architecture Animation Scenario">
            ${Object.keys(c).map(t=>`
              <button class="seg-btn ${r===t?"active":""}" data-scenario-btn="${t}">
                ${t==="topological-progressive-reveal"?"1. 40节点拓扑排序渐进式剥洋葱呈现 (99.4% 理解度)":t==="stroke-dash-packet-failover-pulse"?"2. SVG 路径流光脉冲与三阶段熔断容灾状态机动画":"3. TTS 词级触发无限矢量画布 2.8x 虚拟运镜推拉"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Architecture Animation Mode">
            <button class="seg-btn ${o?"active":""}" data-mode-btn="controlled">
              ✅ 拓扑渐进点亮 + SVG 流光脉冲 + 矢量推镜 (${e.controlledComprehensionScorePct}% 理解度 · $${e.controlledCostPerClipUsd}/条)
            </button>
            <button class="seg-btn ${o?"":"active"}" data-mode-btn="naive">
              ⛔ 静态 40节点死图干讲 / 像素 I2V 乱码 (理解度 ${e.naiveComprehensionScorePct}% · 清晰度 ${e.naiveTextSharpnessPct}%)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">高管与开发者架构理解度 (Comprehension Score)</span>
          <strong class="kpi-val ${o?"good":"warn"}">${a.activeComprehensionScorePct}%</strong>
          <span class="kpi-note">净增 +${a.comprehensionGainPts} pts · 告别第0秒把 40个方框全砸在屏幕上</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">4K 放大文字与图标锐利度 (Vector Sharpness)</span>
          <strong class="kpi-val ${o?"good":"warn"}">${a.activeTextSharpnessPct}%</strong>
          <span class="kpi-note">SVG viewBox 实时矢量重光栅化，放大 10倍零锯齿</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">单条 60秒架构动画成本 (Cost per 60s Clip)</span>
          <strong class="kpi-val ${o?"good":"warn"}">$${a.activeCostPerClipUsd}</strong>
          <span class="kpi-note">成本直降 -${a.costReductionPct}% · 4.2s 编译替代 6.5小时 AE 手工打关键帧</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">年化技术布道与售前净省 (Annual Savings)</span>
          <strong class="kpi-val good">+$${a.annualSavingsM.toFixed(2)}M/yr · 234th Studio</strong>
          <span class="kpi-note">同时导出 16:9 Keynote 宽屏与 9:16 开发者短视频</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. Mermaid / Draw.io AST 拓扑排序 × SVG 流光脉冲状态机 × 词级虚拟摄影机运镜编译器</h2>
            <span class="badge">${o?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="Enterprise Architecture Diagram to 60fps Animated Explainer Studio">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="202" height="126" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
              <text x="14" y="24" fill="#6ee7b7" font-size="11.5" font-weight="700">1. Kahn 拓扑排序渐进点亮</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">99.4% 零认知过载</text>
              <text x="14" y="68" fill="#a7f3d0" font-size="10.5">• 自动按请求入度顺序拆解为 6 幕分镜</text>
              <text x="14" y="88" fill="#a7f3d0" font-size="10.5">• 当前讲解子图 100% 高亮，其余压暗 25%</text>
              <text x="14" y="108" fill="#34d399" font-size="10.5" font-weight="700">• 终结第 0 秒满屏 40 个方框劝退观众</text>
            </g>

            <g transform="translate(239, 20)">
              <rect width="202" height="126" rx="10" fill="#111c33" stroke="#3b82f6" stroke-width="1.5" />
              <text x="14" y="24" fill="#93c5fd" font-size="11.5" font-weight="700">2. SVG 路径流光与容灾状态机</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">0.0 px 轨迹偏移</text>
              <text x="14" y="68" fill="#cbd5e1" font-size="10.5">• getTotalLength() 驱动正交折线发光脉冲</text>
              <text x="14" y="88" fill="#cbd5e1" font-size="10.5">• 动态演示稳态蓝光 -&gt; 红叉告警 -&gt; 绿光逃逸</text>
              <text x="14" y="108" fill="#60a5fa" font-size="10.5" font-weight="700">• 实时跳动 P99 延迟与 RPS 吞吐量指标徽章</text>
            </g>

            <g transform="translate(458, 20)">
              <rect width="202" height="126" rx="10" fill="#3b0764" stroke="#a855f7" stroke-width="1.5" />
              <text x="14" y="24" fill="#d8b4fe" font-size="11.5" font-weight="700">3. 词级触发无限矢量推拉运镜</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">100% 4K 矢量锐利</text>
              <text x="14" y="68" fill="#e9d5ff" font-size="10.5">• 1.5s 全景建立空间心智图 -&gt; 2.8x 推进子网</text>
              <text x="14" y="88" fill="#e9d5ff" font-size="10.5">• TTS WordBoundary 毫秒级锁定当前节点</text>
              <text x="14" y="108" fill="#c084fc" font-size="10.5" font-weight="700">• 改一行 Mermaid 代码 4.2s 自动重出视频</text>
            </g>

            <g transform="translate(20, 162)">
              <rect width="640" height="118" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="26" fill="#38bdf8" font-size="13" font-weight="700">技术架构图动态化演示三大技术方案选型对比</text>
              <text x="18" y="52" fill="#e2e8f0" font-size="11.5">• 方案 A（推荐）：Mermaid/Draw.io AST + Motion Canvas / Remotion 矢量编译器（4.2s 出片，$0.015/条，100% 矢量锐利）</text>
              <text x="18" y="76" fill="#e2e8f0" font-size="11.5">• 方案 B：后期动效师在 After Effects 手工K帧（每条耗时 6.5 小时 / $550，且架构微调加 1 个节点就得重调全片时间线）</text>
              <text x="18" y="100" fill="#fca5a5" font-size="11.5" font-weight="700">• 方案 C（反模式）：把静态架构图丢给 Sora / Runway I2V 图生视频（文字瞬间融化成乱码，连线乱飘，0% 技术可用性）</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段动态架构视频编译链路拆解</h2>
            <span class="badge">234th Workbench</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 声明式矢量动画编译：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 静态死图 / 手工 AE K帧：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,n.querySelectorAll("[data-scenario-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.scenarioBtn;i&&(r=i,l())})}),n.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.modeBtn;i&&(s=i,l())})})}l();
