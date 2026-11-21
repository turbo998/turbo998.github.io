import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"cloud-reference-arch":{id:"cloud-reference-arch",titleZh:"云与 AI 系统参考架构图（Azure / AWS 32节点多可用区 VPC 拓扑图）",titleEn:"Cloud & AI Reference Architecture Diagram (32-Node Multi-AZ Azure / AWS Topology)",subtitleZh:"对比“GPT-Image-1 / Flux.1 像素生图直出（图标捏造、连线指鹿为马、死图无法改字）”与“LLM 结构化拓扑 JSON AST + ELK.js 分层正交布线 + 官方 SVG 图标库 + Draw.io/SVG 双导出”",subtitleEn:"Compares Pixel Diffusion Diagram Prompting (hallucinated icons, spaghetti arrows, uneditable PNG) vs. LLM JSON AST + ELK.js Orthogonal Routing + Official Azure/AWS SVG Icons + Draw.io XML",nodesCount:32,edgesCount:44,controlledStack:"LLM Topology AST + ELK.js Orthogonal Router + Official Azure/AWS SVG Icons + Draw.io XML ($0.004)",naiveStack:'Pixel Diffusion Image Gen ("Azure AI Architecture Diagram") ($0.12 + 0% Editability)',controlledTopologyAccuracyPct:100,naiveTopologyAccuracyPct:34,controlledNodeEditabilityPct:100,naiveNodeEditabilityPct:0,controlledEdgeCrossings:0,naiveEdgeCrossings:19,controlledCostPerDeckUsd:.004,naiveCostPerDeckUsd:.48,controlledRevisionSeconds:.15,naiveRevisionSeconds:45,decisionSummaryZh:'为什么绝对不能用像素扩散生图模型（Midjourney / Flux.1 / GPT-Image-1）直接画技术架构图？因为技术架构图的本质是“有向图（Directed Graph）”，一条箭头连错子网就是严重的生产安全事故！像素生图模型生成的“炫酷等距图”远看像模像样，近看全是拼写错误的假图标（如 "Azrue KeyVualt"）、悬空断开的箭头，且输出的是一张扁平 PNG 死图，客户架构师想挪动一个框或改个端口号都做不到。唯一正确的工程路径是：用 LLM 将业务需求或 Bicep/Terraform 代码编译为严格校验的 JSON 拓扑 AST，交由 ELK.js 计算零穿模正交折线（Orthogonal Routing），挂载官方 100% 正版 SVG 图标库，并同时导出可交互 SVG 与原生可编辑 `.drawio` / `.excalidraw` 文件。',decisionSummaryEn:'Never use pixel diffusion models (Flux.1 / Midjourney / GPT-Image-1) to draw technical architecture diagrams. Architecture diagrams are mathematical directed graphs where one misrouted arrow represents a security vulnerability. Pixel diffusion produces uneditable flat PNGs filled with hallucinated icons ("Azrue Kubrenetes") and broken arrows (34% topology accuracy, 0% editability). Instead, compile Bicep/Terraform or requirements into a typed JSON AST via LLM, solve zero-overlap orthogonal routing with ELK.js, bind official Azure/AWS SVG icons, and emit editable `.drawio` XML + SVG ($0.004/diagram).',stages:[{stage:"1. Topology AST Extraction",controlledEngine:"LLM -> Zod-Validated Graph JSON (Subnets, Nodes, Ports)",naiveBehavior:"Text Prompt Sent Directly to Pixel Diffusion UNet/DiT",metricImpact:"100% vs 34.0% Connection Accuracy"},{stage:"2. Deterministic Graph Layout",controlledEngine:"ELK.js Layered Orthogonal Router (Port Constraints)",naiveBehavior:"Hallucinated Overlapping Spaghetti Arrows (19 Crossings)",metricImpact:"0 Edge-Node Overlaps"},{stage:"3. Official Icon & Badge Binding",controlledEngine:"Official Azure / AWS / CNCF Vector SVG Icon Registry",naiveBehavior:"Garbled AI-Invented Logos & Misspelled Labels",metricImpact:"100% Brand & Terminology Compliance"},{stage:"4. Multi-Format Editable Export",controlledEngine:"Interactive SVG + Native .drawio XML + .excalidraw JSON",naiveBehavior:"Flat 4MB Raster PNG (0% Node Editability)",metricImpact:"0.15s Single-Node Edit vs 45s Re-Gen"}]},"executive-pptx-deck":{id:"executive-pptx-deck",titleZh:"CTO 董事会汇报 PPTX 幻灯片自动生成管线（原生可编辑 Shape vs 整页贴死图片）",titleEn:"CTO Board Deck PPTX Compiler Pipeline (Native Editable PptxGenJS Shapes vs. Full-Slide PNG)",subtitleZh:"对比“AI 将整页 PPT 生成为一张不可编辑背景图（售前顾问无法改客户名、字号模糊）”与“PptxGenJS 原生可编辑文本框 + 矢量 KPI 卡片 + AI 局部无字配图插槽”",subtitleEn:"Compares Full-Slide Raster Image Generation (uneditable text, blurry projection) vs. PptxGenJS Native Editable Shapes/Tables + Scoped AI Illustration Slots",nodesCount:18,edgesCount:22,controlledStack:"JSON Slide Spec + ELK Layout + PptxGenJS Native Shapes/Tables + Scoped Clean-Plate AI ($0.015/slide)",naiveStack:"Full-Slide Pixel Image Generation Pasted onto Blank Slide ($0.24/slide · Uneditable)",controlledTopologyAccuracyPct:100,naiveTopologyAccuracyPct:48,controlledNodeEditabilityPct:100,naiveNodeEditabilityPct:0,controlledEdgeCrossings:0,naiveEdgeCrossings:8,controlledCostPerDeckUsd:.015,naiveCostPerDeckUsd:.24,controlledRevisionSeconds:.1,naiveRevisionSeconds:38,decisionSummaryZh:"许多初级“AI 生成 PPT”工具把整页幻灯片直接当成一张图片让生图模型画出来，贴在空白页上——结果售前架构师在见客户前 5 分钟想把页面上的“某银行”改成“招商银行”，或者把延迟数据从 50ms 改成 35ms，发现整页是一张死图，根本点不中文字！企业级高管汇报编译器必须通过 `PptxGenJS` / OOXML 将标题、KPI 数字卡片、架构框图与对比表格生成为 **100% 原生 PowerPoint 可编辑形状（Native Shapes & TextBoxes）**，仅在右侧视觉装饰插槽调用 `Flux.1` 生成局部无字配图。",decisionSummaryEn:'Naive "AI Slide Generators" render the entire slide as a single raster PNG—making it impossible for a Solution Architect to edit a customer name or update a KPI number 5 minutes before a board meeting. An enterprise deck compiler must emit 100% native PowerPoint shapes, tables, and editable text boxes via `PptxGenJS` (using `ELK.js` for non-overlapping box coordinates), invoking `Flux.1` strictly inside isolated decorative image slots.',stages:[{stage:"1. Slide Grid & Box Solver",controlledEngine:"16:9 Golden Grid + ELK.js Coordinate Solver (Zero Overlap)",naiveBehavior:"Freeform Pixel Diffusion Layout with Text Overflow",metricImpact:"0px Text Clipping or Box Collision"},{stage:"2. Native OOXML Shape Emission",controlledEngine:"PptxGenJS Editable TextBoxes, KPI Cards & Native Tables",naiveBehavior:"Rasterized Pixels Masquerading as a Slide",metricImpact:"100% vs 0% PowerPoint Editability"},{stage:"3. Scoped Visual Asset Slot",controlledEngine:"Clean-Plate Flux.1 / SVG Isometric Asset in Dedicated Slot",naiveBehavior:"AI Bleeds Background Noise Under Body Text",metricImpact:"WCAG AAA Contrast Ratio (>7.5:1)"},{stage:"4. Master Theme & Font Lock",controlledEngine:"Corporate .potx Master Slide + Segoe UI / Inter Font Binding",naiveBehavior:"Random Hallucinated Fonts Across Every Slide",metricImpact:"$0.015 vs $0.24 per Slide"}]},"live-traffic-topology":{id:"live-traffic-topology",titleZh:"面向客户演示的交互式动态架构沙盘（React Flow / SVG 令牌流向与故障注入动画）",titleEn:"Interactive Live Architecture Sandbox (React Flow / SVG Token Flow & Failover Simulation)",subtitleZh:"对比“录屏死视频 MP4（无法响应客户现场提问切流量）”与“ELK.js + SVG/React Flow 实时数据流粒子动画（支持现场点击模拟 Region 故障切流与 TCO 重算）”",subtitleEn:"Compares Pre-Recorded MP4 Video (cannot respond to live customer Q&A) vs. ELK.js + SVG/React Flow Interactive Token Stream with Live Region Failover Toggle",nodesCount:28,edgesCount:36,controlledStack:"ELK.js + SVG / React Flow Interactive Sandbox + CSS stroke-dashoffset Token Stream ($0.002)",naiveStack:"Pre-Rendered Static Video / Manual After Effects Animation ($450 Manual Motion Cost)",controlledTopologyAccuracyPct:100,naiveTopologyAccuracyPct:62,controlledNodeEditabilityPct:100,naiveNodeEditabilityPct:0,controlledEdgeCrossings:0,naiveEdgeCrossings:11,controlledCostPerDeckUsd:.002,naiveCostPerDeckUsd:1.85,controlledRevisionSeconds:.05,naiveRevisionSeconds:120,decisionSummaryZh:"在向 CTO 演示“多区域高可用灾备”或“多模型智能路由网关”时，静态架构图太枯燥，而预先录好的 MP4 视频又无法交互——当 CTO 现场发问“如果美东 Region 挂了，流量怎么走？”时，使用 `ELK.js + SVG / React Flow` 构建的交互式动态架构沙盘允许架构师当场点击切断主节点，画面上的 SVG `stroke-dashoffset` 脉冲粒子流在 `50ms` 内实时重路由至灾备集群并同步刷新延迟与 TCO 面板，彻底征服技术决策者！",decisionSummaryEn:'When presenting multi-region failover or AI gateway routing to a CTO, static diagrams feel lifeless while pre-rendered MP4 videos cannot answer live "what-if" questions. An interactive `ELK.js + SVG / React Flow` sandbox lets the architect click to kill a primary region live on stage—rerouting animated SVG `stroke-dashoffset` request particles to the failover cluster in `50ms` while updating live latency and TCO counters.',stages:[{stage:"1. Declarative Topology State",controlledEngine:"JSON State Machine (Node Health, QPS, Latency, Cost)",naiveBehavior:"Hardcoded Keyframes in Video Timeline",metricImpact:'Live Interactive "What-If" Q&A'},{stage:"2. Animated Request Particles",controlledEngine:"GPU-Composited SVG stroke-dashoffset & Path Motion (60fps)",naiveBehavior:"Heavy Video File or Static Arrows",metricImpact:"45 KB Bundle vs 25 MB Video"},{stage:"3. Live Chaos / Failover Toggle",controlledEngine:"Click-to-Fail Region -> Automatic Route Recalculation (50ms)",naiveBehavior:"Cannot Respond to Live Customer Edge Cases",metricImpact:"100% Interactive Executive PoC"},{stage:"4. One-Click Snapshot Export",controlledEngine:"Exports Current State to Vector PDF / SVG / PPTX Slide",naiveBehavior:"Blurry Video Screenshot Grab",metricImpact:"Vector Print & Deck Ready"}]}};function d(a,o="controlled"){const e=c[a],i=o==="controlled";return{scenario:e,mode:o,activeTopologyAccuracyPct:i?e.controlledTopologyAccuracyPct:e.naiveTopologyAccuracyPct,activeNodeEditabilityPct:i?e.controlledNodeEditabilityPct:e.naiveNodeEditabilityPct,activeEdgeCrossings:i?e.controlledEdgeCrossings:e.naiveEdgeCrossings,activeCostPerDeckUsd:i?e.controlledCostPerDeckUsd:e.naiveCostPerDeckUsd,activeRevisionSeconds:i?e.controlledRevisionSeconds:e.naiveRevisionSeconds,accuracyGainPts:Number((e.controlledTopologyAccuracyPct-e.naiveTopologyAccuracyPct).toFixed(1)),speedupFactor:Number((e.naiveRevisionSeconds/e.controlledRevisionSeconds).toFixed(0))}}let n="cloud-reference-arch",r="controlled";function l(){const a=document.querySelector("#app");if(!a)return;const o=d(n,r),e=o.scenario,i=r==="controlled";a.innerHTML=`
    <main class="workbench-shell" data-mode="${r}" data-scenario="${n}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">204TH WORKBENCH · DOMAIN 5 · CTO ARCHITECTURE DIAGRAM & DECK COMPILER SELECTION STUDIO</span>
          <h1>面向 CTO 汇报的云与 AI 架构图生成选型工作台：LLM AST + ELK.js 正交布线 + PPTX/SVG 编译器 vs 像素生图直出</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="Diagram Scenario">
            ${Object.keys(c).map(t=>`
              <button class="seg-btn ${n===t?"active":""}" data-scenario-btn="${t}">
                ${t==="cloud-reference-arch"?"1. 云与 AI 参考架构图 (32-Node ELK + Draw.io)":t==="executive-pptx-deck"?"2. CTO 汇报 PPTX 编译器 (PptxGenJS 原生 Shape)":"3. 交互式动态架构沙盘 (React Flow / SVG 故障演练)"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Architecture Mode">
            <button class="seg-btn ${i?"active":""}" data-mode-btn="controlled">
              ✅ 结构化 AST + ELK.js + 官方图标 SVG/PPTX ($${e.controlledCostPerDeckUsd})
            </button>
            <button class="seg-btn ${i?"":"active"}" data-mode-btn="naive">
              ⛔ 像素扩散直出架构图 (${e.naiveNodeEditabilityPct}% 可编辑 · ${e.naiveEdgeCrossings} 处连线穿模)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">拓扑连接与术语准确率 (Topology Accuracy)</span>
          <strong class="kpi-val ${i?"good":"warn"}">${o.activeTopologyAccuracyPct}%</strong>
          <span class="kpi-note">净增 +${o.accuracyGainPts} pts · 官方 Azure/AWS 图标零错字</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">PowerPoint / Draw.io 节点可编辑率 (Editability)</span>
          <strong class="kpi-val ${i?"good":"warn"}">${o.activeNodeEditabilityPct}%</strong>
          <span class="kpi-note">原生 PptxGenJS Shape & .drawio XML vs 扁平 PNG 死图</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">连线穿模与交叉数 (Edge-Node Crossings)</span>
          <strong class="kpi-val ${i?"good":"warn"}">${o.activeEdgeCrossings} 处</strong>
          <span class="kpi-note">ELK.js 分层正交路由 (${e.nodesCount} 节点 / ${e.edgesCount} 连线)</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">改字/调拓扑响应耗时 (Revision Speed)</span>
          <strong class="kpi-val good">${o.activeRevisionSeconds}s (${o.speedupFactor}x Faster)</strong>
          <span class="kpi-note">单张成本 $${o.activeCostPerDeckUsd} · 支持现场交互灾备切流</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 四阶段确定性架构图与高管 PPTX 编译器管线（AST → ELK.js → 官方 SVG → PPTX/Draw.io）</h2>
            <span class="badge">${i?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="CTO Architecture Diagram Compiler Pipeline">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="295" height="122" rx="10" fill="#111c33" stroke="#10b981" stroke-width="1.5" />
              <text x="16" y="26" fill="#6ee7b7" font-size="12" font-weight="700">✅ 方案 C (推荐): LLM AST + ELK.js + SVG/PPTX</text>
              <rect x="16" y="40" width="76" height="36" rx="6" fill="#065f46" stroke="#34d399" />
              <text x="54" y="62" fill="#f8fafc" font-size="10" text-anchor="middle" font-weight="700">Front Door</text>
              <line x1="92" y1="58" x2="122" y2="58" stroke="#34d399" stroke-width="2" />
              <rect x="122" y="40" width="76" height="36" rx="6" fill="#1e3a8a" stroke="#60a5fa" />
              <text x="160" y="62" fill="#f8fafc" font-size="10" text-anchor="middle" font-weight="700">AKS GPU</text>
              <line x1="198" y1="58" x2="220" y2="58" stroke="#34d399" stroke-width="2" />
              <rect x="220" y="40" width="60" height="36" rx="6" fill="#581c87" stroke="#c084fc" />
              <text x="250" y="62" fill="#f8fafc" font-size="10" text-anchor="middle" font-weight="700">C2PA HSM</text>
              <text x="16" y="102" fill="#a7f3d0" font-size="11">0 穿模正交折线 · 100% 原生 PPTX/Draw.io 可拖拽节点</text>
            </g>

            <g transform="translate(360, 20)">
              <rect width="300" height="122" rx="10" fill="#1f121c" stroke="#ef4444" stroke-width="1.5" />
              <text x="16" y="26" fill="#fca5a5" font-size="12" font-weight="700">⛔ 方案 A (严禁): 像素生图直出架构图 (PNG 死图)</text>
              <rect x="20" y="42" width="84" height="36" rx="6" fill="#3f1d2e" stroke="#f87171" />
              <text x="62" y="64" fill="#fecaca" font-size="10" text-anchor="middle">"Azrue K8s??"</text>
              <path d="M 80 45 Q 150 95 210 38" stroke="#f87171" stroke-width="2" fill="none" />
              <rect x="165" y="44" width="90" height="36" rx="6" fill="#3f1d2e" stroke="#f87171" />
              <text x="210" y="64" fill="#fecaca" font-size="10" text-anchor="middle">"KeyVualt DB"</text>
              <text x="16" y="102" fill="#fca5a5" font-size="11">假图标拼写乱码 · 连线悬空穿模 · 0% 节点可编辑性</text>
            </g>

            <g transform="translate(20, 158)">
              <rect width="640" height="122" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="26" fill="#38bdf8" font-size="13" font-weight="700">架构师黄金选型法则：把“拓扑计算与文字图标”交给编译器，把“局部装饰视觉”交给生图模型</text>
              <text x="18" y="52" fill="#e2e8f0" font-size="12">1. 架构图与数据流图 (100% 代码编译): Bicep/Terraform/Prompt → LLM JSON AST → ELK.js → SVG / .drawio / React Flow</text>
              <text x="18" y="76" fill="#e2e8f0" font-size="12">2. 高管汇报 PPTX (混合编译): PptxGenJS 生成原生可编辑标题/表格/KPI卡片 + 右侧独立插槽调用 Flux.1 生成无字留白配图</text>
              <text x="18" y="100" fill="#34d399" font-size="12" font-weight="700">3. 客户现场动态演示: React Flow / SVG stroke-dashoffset 实时粒子流沙盘，支持当场点击演练 Region 灾备切换 (50ms 响应)</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段架构图与 PPTX 编译流水线拆解</h2>
            <span class="badge">100% Native Editable</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 编译器管线：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 像素生图直出：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,a.querySelectorAll("[data-scenario-btn]").forEach(t=>{t.addEventListener("click",()=>{const s=t.dataset.scenarioBtn;s&&(n=s,l())})}),a.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const s=t.dataset.modeBtn;s&&(r=s,l())})})}l();
