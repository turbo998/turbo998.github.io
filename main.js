/* GitHub repo showcase: live fetch from the GitHub API merged with curated
   flagship metadata, category filter pills, and bilingual descriptions. */

(function () {
  const USER = "turbo998";
  const LANG = (document.documentElement.lang || "").toLowerCase().startsWith("zh") ? "zh" : "en";

  const FEATURED = [
    "Azure-Infra-Lab",
    "ai-infra-research",
    "ai-infra-lab",
    "benchmark-harness-engineering",
    "ai-research-public",
    "fde-engineering-playbook",
    "FDE-on-GitHub-Copilot-Practice-Book",
    "Agent-Harness-Engineering-on-Azure-and-GitHub-Copilot",
    "Copilot-HVE-Engineering-Workshop",
    "agent-framework-research",
    "agent-governance-economics-research",
    "agentic-red-team-lab",
    "voice-agent-lab",
    "contact-center-on-gpt-realtime",
    "gpt-realtime-2-vision-companion",
    "agentic-commerce-lab",
    "Agentic-Commerce-on-Azure",
    "ai-gaming-lab",
    "scrap-swarm",
    "azure-sa-skills",
    "hermes-on-azure",
    "hermes-foundry-memory-plugin",
    "hermes-azure-files-plugin",
    "copilot-usage-portal",
    "copilot-multi-agent-dashboard",
    "fabric-mirroring-directlake-agent-demo",
    "azure-usage-realtime-analytics",
    "azure-openai-faq",
  ];

  const CATEGORY_MAP = {
    "Azure-Infra-Lab": "infra",
    "ai-infra-research": "infra",
    "ai-infra-lab": "infra",
    "azure-usage-realtime-analytics": "infra",
    "azure-openai-faq": "infra",
    "benchmark-harness-engineering": "harness",
    "ai-research-public": "harness",
    "fde-engineering-playbook": "harness",
    "FDE-on-GitHub-Copilot-Practice-Book": "harness",
    "Agent-Harness-Engineering-on-Azure-and-GitHub-Copilot": "harness",
    "Copilot-HVE-Engineering-Workshop": "harness",
    "agent-framework-research": "harness",
    "agent-governance-economics-research": "harness",
    "agentic-red-team-lab": "harness",
    "vibe-coding-notes": "harness",
    "voice-agent-lab": "multimodal",
    "contact-center-on-gpt-realtime": "multimodal",
    "gpt-realtime-2-vision-companion": "multimodal",
    "agentic-commerce-lab": "multimodal",
    "Agentic-Commerce-on-Azure": "multimodal",
    "ai-gaming-lab": "gaming",
    "scrap-swarm": "gaming",
    "world-cup-sweepstake": "gaming",
    "azure-sa-skills": "ecosystem",
    "hermes-on-azure": "ecosystem",
    "hermes-foundry-memory-plugin": "ecosystem",
    "hermes-azure-files-plugin": "ecosystem",
    "copilot-usage-portal": "ecosystem",
    "copilot-multi-agent-dashboard": "ecosystem",
    "fabric-mirroring-directlake-agent-demo": "ecosystem",
    "microsoft-fabric-learning-plan": "ecosystem",
    "brightdata-webiq-demos": "ecosystem",
    "qupeiyin-ghcp-demo": "ecosystem",
  };

  const CAT_LABELS = {
    en: {
      all: "All Repos",
      infra: "01 · AI Infra & Sandboxes",
      harness: "02 · Agent Harness & Evals",
      multimodal: "03 · Voice, Vision & Commerce",
      gaming: "04 · Procedural Gaming",
      ecosystem: "05 · Skills, Hermes & Data",
    },
    zh: {
      all: "全部仓库",
      infra: "01 · AI 算力与沙箱基建",
      harness: "02 · Agent Harness 与评测",
      multimodal: "03 · 实时语音/视觉与商业",
      gaming: "04 · 程序化游戏与视觉",
      ecosystem: "05 · 技能生态与数据工程",
    },
  };

  const ZH_DESC = {
    "Azure-Infra-Lab": "Azure 基础设施工程化与 AI Agent Infra 实战实验室：收录《AKSClaw × E2B 10万沙箱 H5 仿真套件》《Azure VM 现代化与 FinOps 伙伴工作坊》及 41 套 Bicep/K8s 蓝图。",
    "ai-infra-research": "AI 算力基础设施每日深度研究（中英双语）：覆盖 GPU/ASIC 微架构、HBM4/CXL 内存墙、NVLink/RoCEv2/UEC 无损互连与云厂商算力集群。",
    "ai-infra-lab": "AI 基础设施架构、六大运行时光谱评测、E2B Firecracker / AKSClaw Kata 密度模型与跨区域 3.67s 热备容灾蓝图库。",
    "azure-usage-realtime-analytics": "Azure 实时用量分析与 FinOps 账单对账架构：结合流式事件处理、成本分摊归因与异常消费实时熔断告警。",
    "benchmark-harness-engineering": "7-Card 4:5 模型评测报告标准与可复现评测引擎：内置 HTML/SVG 卡片生成器、选项翻转鲁棒性检验与 Decision-1 路由基准。",
    "ai-research-public": "公开深度技术研究总库：收录《FAF vs AGENT-FORGE vs HVE-Core 三方竞技场》《SKY-001 19模型编码智能体基准》《E2B Nomad 心跳控制面审计》等。",
    "fde-engineering-playbook": "25 章企业级前置部署工程（Forward Deployed Engineering）完整作战手册：痛点发现矩阵、价值×可行性漏斗与生产 SLA 验收。",
    "FDE-on-GitHub-Copilot-Practice-Book": "《微软生态下的前置部署工程实践》9 章在线专著——Outcome = Harness × Customer，FDE 方法论与 Copilot 工程融合。",
    "Agent-Harness-Engineering-on-Azure-and-GitHub-Copilot": "基于 Azure + GitHub Copilot 构建生产级 AI 智能体系统的 120 分钟工作坊：Rule→Soul→Role→Tool 四层模型与 10 个智能体。",
    "Copilot-HVE-Engineering-Workshop": "GitHub Copilot 高速工程（HVE）实战营：ASP→AKS 容器化、需求拆解、MCP Server 接入与自动化回归测试闭环。",
    "agent-framework-research": "主流 Coding Agent 与多智能体框架源码级横向对标：深度拆解 pi、oh-my-pi、Claude Code、Codex CLI、OpenClaw、Hermes 与 WorkBuddy。",
    "agent-governance-economics-research": "企业级智能体治理与单位经济学研究：围绕「单次采纳任务成本 (Cost per Accepted Task)」建立模型路由与预算熔断框架。",
    "agentic-red-team-lab": "多智能体红蓝对抗与越狱防御实验室：针对间接提示词注入、MCP 工具越权调用与沙箱逃逸构建自动化攻防验证。",
    "voice-agent-lab": "生产级实时语音智能体三层参考栈：集成 Retell 语音编排、Azure AI Foundry 与 GPT Realtime 亚秒级打断与工单执行。",
    "contact-center-on-gpt-realtime": "全球多语言智能呼叫中心参考设计，串联三个 Microsoft Foundry 实时模型，实现 24×7 接待与实时坐席辅助。",
    "gpt-realtime-2-vision-companion": "面向视障与工业巡检场景的实时语音 + 视觉 AI 伴侣，基于 Azure OpenAI 实时视频帧理解。",
    "agentic-commerce-lab": "智能体商业（Agentic Commerce）实验场：AI 导购、跨平台比价议价、库存锁单与可验证支付授权闭环。",
    "Agentic-Commerce-on-Azure": "基于 Azure 的企业级零售与跨境电商智能体全栈架构：多模态目录理解、RFQ 询报价审批与全球售后客服。",
    "ai-gaming-lab": "AI 游戏与程序化骨骼动画实验室：实时 3D/2D 逆运动学关节拆解舞台及《湾岸 Midnight》《Scrap Swarm》双可玩游戏。",
    "scrap-swarm": "《废土斗机祭 · Scrap Swarm》：纯 Canvas 2D 多关节机甲动作生存游戏，含番剧切入演出、黑白冲击帧与自动 Bot 验证。",
    "azure-sa-skills": "云解决方案架构师（SA）日常工程与架构设计 Skill 技能库，赋能 GitHub Copilot CLI 与 Hermes 自动化绘图与配额核查。",
    "hermes-on-azure": "Hermes Agent 在 Azure 上的企业级部署工作坊：GitHub Copilot 模型路由、持久化记忆与全天候网关。",
    "hermes-foundry-memory-plugin": "Hermes Agent 的 Azure AI Foundry 跨会话向量记忆插件。",
    "hermes-azure-files-plugin": "Hermes Agent 的 Azure Blob Storage + BlobFuse2 / Azure Files 高性能云挂载插件。",
    "copilot-usage-portal": "Azure 上的多租户 GitHub Copilot Token 用量治理与 ROI 审计看板。",
    "copilot-multi-agent-dashboard": "聚合 GitHub Copilot CLI、Hermes Agent 与 OpenClaw 会话轨迹的统一 Web 可观测性控制台。",
    "fabric-mirroring-directlake-agent-demo": "Microsoft Fabric 端到端数据智能体：零拷贝 Mirroring + DirectLake + 本体建模 + MCP 自然语言问数。",
    "microsoft-fabric-learning-plan": "Microsoft Fabric 8 周深度学习计划，含动手实验与竞品分析。",
    "azure-openai-faq": "OpenAI → Azure OpenAI / Foundry 生产迁移与排障实战手册，附可运行诊断代码。",
    "brightdata-webiq-demos": "四个可运行 Demo，对比 Bright Data 实时网络数据抓取与 Microsoft Web IQ 方案。",
    "qupeiyin-ghcp-demo": "GitHub Copilot 60 分钟客户现场演示：自动标签、课堂看板与多智能体协同。",
    "vibe-coding-notes": "Vibe Coding 与智能体辅助快速原型开发工程笔记。",
    "world-cup-sweepstake": "世界杯竞猜管理互动 Web 应用。",
  };

  const FALLBACK = [
    { name: "Azure-Infra-Lab", description: "Azure Infrastructure & AI Agent Infra Playbook Lab: AKSClaw × E2B 100K-Sandbox H5 Simulator, 7-Card Benchmark Deck & Azure VM Modernization Workshop.", language: "HTML", stargazers_count: 1, html_url: "https://github.com/turbo998/Azure-Infra-Lab", homepage: "https://turbo998.github.io/Azure-Infra-Lab/workshops/azure-agent-infra/index.html", updated_at: "2026-10-25" },
    { name: "ai-infra-research", description: "Bilingual daily deep research on AI compute infrastructure: GPU/ASIC microarchitectures, HBM4/CXL memory, NVLink/UEC interconnects, and hyperscaler clusters.", language: "Markdown", stargazers_count: 1, html_url: "https://github.com/turbo998/ai-infra-research", updated_at: "2026-10-25" },
    { name: "benchmark-harness-engineering", description: "7-Card 4:5 Visual Benchmark Report Standard & reproducible evaluation harness for routing/decision models and coding agents.", language: "Python", stargazers_count: 1, html_url: "https://github.com/turbo998/benchmark-harness-engineering", updated_at: "2026-10-24" },
    { name: "ai-research-public", description: "Public AI engineering monographs: 3-Way Pelican Bicycle Arena (FAF vs AGENT-FORGE vs HVE-Core), SKY-001 19-Model Benchmark, and E2B Nomad Heartbeat Audit.", language: "HTML", stargazers_count: 1, html_url: "https://github.com/turbo998/ai-research-public", homepage: "https://turbo998.github.io/workshops/faf-vs-agent-forge/index.html", updated_at: "2026-10-24" },
    { name: "fde-engineering-playbook", description: "25-chapter Forward Deployed Engineering (FDE) playbook for enterprise AI agent delivery, discovery matrices, and production SLAs.", language: "Markdown", stargazers_count: 1, html_url: "https://github.com/turbo998/fde-engineering-playbook", updated_at: "2026-10-22" },
    { name: "ai-infra-lab", description: "AI Infrastructure architecture playbooks, E2B Firecracker & AKSClaw Kata benchmarks, and multi-region 3.67s warm DR blueprints on Azure.", language: "Python", stargazers_count: 0, html_url: "https://github.com/turbo998/ai-infra-lab", updated_at: "2026-10-20" },
    { name: "ai-gaming-lab", description: "AI Gaming & Procedural Animation Lab: Real-time 3D/2D procedural articulation stage & playable demos (Wanan Midnight & Scrap Swarm).", language: "TypeScript", stargazers_count: 0, html_url: "https://github.com/turbo998/ai-gaming-lab", homepage: "https://turbo998.github.io/ai-gaming-lab/", updated_at: "2026-10-18" },
    { name: "scrap-swarm", description: "Scrap Swarm (废土斗机祭): Procedural 2D Mecha Articulation, Anime Cut-in & Impact Frames, 3-Act Story & Deterministic Combat.", language: "TypeScript", stargazers_count: 0, html_url: "https://github.com/turbo998/scrap-swarm", homepage: "https://turbo998.github.io/scrap-swarm/", updated_at: "2026-10-16" },
    { name: "Agent-Harness-Engineering-on-Azure-and-GitHub-Copilot", description: "120-min hands-on workshop for building production AI agent systems with Azure + GitHub Copilot: 4-layer model, 10 agents, enterprise CI/CD.", language: "Shell", stargazers_count: 1, html_url: "https://github.com/turbo998/Agent-Harness-Engineering-on-Azure-and-GitHub-Copilot", updated_at: "2026-09-15" },
    { name: "FDE-on-GitHub-Copilot-Practice-Book", description: "Forward-Deployed Engineering practice in the Microsoft ecosystem (Outcome = Harness × Customer) — 9-chapter online book.", language: "SCSS", stargazers_count: 0, html_url: "https://github.com/turbo998/FDE-on-GitHub-Copilot-Practice-Book", homepage: "https://turbo998.github.io/FDE-on-GitHub-Copilot-Practice-Book/", updated_at: "2026-09-10" },
    { name: "Copilot-HVE-Engineering-Workshop", description: "GitHub Copilot Hyper-Velocity Engineering (HVE) workshop: legacy containerization, MCP integration, and automated test suites.", language: "TypeScript", stargazers_count: 0, html_url: "https://github.com/turbo998/Copilot-HVE-Engineering-Workshop", updated_at: "2026-09-05" },
    { name: "agent-framework-research", description: "Source-code architectural benchmark of coding agents: pi, oh-my-pi, Claude Code, Codex CLI, OpenClaw, Hermes, and WorkBuddy.", language: "Python", stargazers_count: 1, html_url: "https://turbo998.github.io/workshops/benchmarks/sky-001-cards.html", updated_at: "2026-10-12" },
    { name: "agent-governance-economics-research", description: "Enterprise agent governance & unit economics framework centered on Cost per Accepted Task and cascade routing.", language: "Python", stargazers_count: 1, html_url: "https://turbo998.github.io/workshops/benchmarks/decision-1-cards.html", updated_at: "2026-10-11" },
    { name: "agentic-red-team-lab", description: "Multi-agent red-team security architecture testing prompt injection, MCP tool privilege boundaries, and sandbox isolation.", language: "Python", stargazers_count: 1, html_url: "https://turbo998.github.io/workshops/agentic-commerce/live-demo.html", updated_at: "2026-10-10" },
    { name: "voice-agent-lab", description: "3-layer production voice agent stack integrating Retell orchestration, Azure AI Foundry, and GPT Realtime.", language: "TypeScript", stargazers_count: 1, html_url: "https://github.com/turbo998/voice-agent-lab", homepage: "https://turbo998.github.io/voice/index.html", updated_at: "2026-10-08" },
    { name: "contact-center-on-gpt-realtime", description: "Global multilingual contact center reference design connecting three Microsoft Foundry realtime models.", language: "Python", stargazers_count: 0, html_url: "https://github.com/turbo998/contact-center-on-gpt-realtime", updated_at: "2026-08-26" },
    { name: "gpt-realtime-2-vision-companion", description: "Real-time voice + vision AI companion for blind & low-vision users, powered by Azure OpenAI.", language: "Python", stargazers_count: 0, html_url: "https://github.com/turbo998/gpt-realtime-2-vision-companion", updated_at: "2026-08-25" },
    { name: "agentic-commerce-lab", description: "Agentic Commerce lab exploring Microsoft Web IQ catalog grounding, ACP/UCP checkout, and x402/AP2 verifiable settlement.", language: "TypeScript", stargazers_count: 1, html_url: "https://github.com/turbo998/agentic-commerce-lab", homepage: "https://turbo998.github.io/workshops/agentic-commerce/live-demo.html", updated_at: "2026-10-25" },
    { name: "Agentic-Commerce-on-Azure", description: "Enterprise retail & cross-border commerce agent blueprint on Azure with Web IQ grounding and AP2 circuit breakers.", language: "Python", stargazers_count: 1, html_url: "https://turbo998.github.io/workshops/agentic-commerce/benchmark-cards.html", updated_at: "2026-10-25" },
    { name: "azure-sa-skills", description: "Azure Solution Architect daily engineering skill library for GitHub Copilot CLI and Hermes Agent.", language: "Python", stargazers_count: 1, html_url: "https://github.com/turbo998/azure-sa-skills", updated_at: "2026-10-02" },
    { name: "hermes-on-azure", description: "Hermes Agent enterprise deployment workshop on Azure with GitHub Copilot provider.", language: "Bicep", stargazers_count: 0, html_url: "https://github.com/turbo998/hermes-on-azure", updated_at: "2026-08-15" },
    { name: "hermes-foundry-memory-plugin", description: "Azure AI Foundry cross-session vector memory provider plugin for Hermes Agent.", language: "Python", stargazers_count: 0, html_url: "https://github.com/turbo998/hermes-foundry-memory-plugin", updated_at: "2026-08-16" },
    { name: "hermes-azure-files-plugin", description: "Azure Blob Storage + BlobFuse2/Azure Files mount plugin for Hermes Agent.", language: "Python", stargazers_count: 0, html_url: "https://github.com/turbo998/hermes-azure-files-plugin", updated_at: "2026-08-16" },
    { name: "copilot-usage-portal", description: "Multi-tenant GitHub Copilot token usage & ROI governance dashboard on Azure.", language: "Python", stargazers_count: 0, html_url: "https://github.com/turbo998/copilot-usage-portal", updated_at: "2026-08-04" },
    { name: "copilot-multi-agent-dashboard", description: "Unified web observability console aggregating GitHub Copilot CLI, Hermes Agent, and OpenClaw session traces.", language: "TypeScript", stargazers_count: 0, html_url: "https://github.com/turbo998/copilot-multi-agent-dashboard", updated_at: "2026-08-14" },
    { name: "azure-usage-realtime-analytics", description: "Real-time Azure consumption analytics & FinOps billing reconciliation pipeline.", language: "Python", stargazers_count: 1, html_url: "https://turbo998.github.io/Azure-Infra-Lab/workshops/azure-vm-modernization/calculator.html", updated_at: "2026-09-20" },
    { name: "fabric-mirroring-directlake-agent-demo", description: "End-to-end Microsoft Fabric scenario: Mirroring + DirectLake + Data Agent with ontology + MCP.", language: "Python", stargazers_count: 0, html_url: "https://github.com/turbo998/fabric-mirroring-directlake-agent-demo", updated_at: "2026-07-25" },
    { name: "microsoft-fabric-learning-plan", description: "Microsoft Fabric 8-week deep learning plan with hands-on labs and competitive analysis.", language: "Markdown", stargazers_count: 0, html_url: "https://github.com/turbo998/microsoft-fabric-learning-plan", updated_at: "2026-07-25" },
    { name: "azure-openai-faq", description: "OpenAI to Azure OpenAI / Foundry migration & debugging FAQ with runnable diagnostics.", language: "Python", stargazers_count: 0, html_url: "https://github.com/turbo998/azure-openai-faq", updated_at: "2026-07-25" },
    { name: "brightdata-webiq-demos", description: "Four runnable demos comparing Bright Data web tooling with Microsoft Web IQ solutions.", language: "Python", stargazers_count: 0, html_url: "https://github.com/turbo998/brightdata-webiq-demos", updated_at: "2026-06-28" },
    { name: "qupeiyin-ghcp-demo", description: "GitHub Copilot 60-min customer demo: auto-tagging, classroom dashboard, multi-agent.", language: "Python", stargazers_count: 0, html_url: "https://github.com/turbo998/qupeiyin-ghcp-demo", updated_at: "2026-06-12" },
    { name: "vibe-coding-notes", description: "Technical notes on vibe coding frameworks and rapid agentic prototyping.", language: "Markdown", stargazers_count: 0, html_url: "https://github.com/turbo998/vibe-coding-notes", updated_at: "2026-06-03" },
  ];

  const LANG_COLORS = {
    Python: "#3572A5", Shell: "#89e051", JavaScript: "#f1e05a", TypeScript: "#3178c6",
    SCSS: "#c6538c", Bicep: "#519aba", HTML: "#e34c26", CSS: "#563d7c", Markdown: "#083fa1",
  };

  const T = {
    en: {
      updated: "Updated",
      featured: "Flagship",
      docs: "Architecture / Docs",
      fallbackNote: "Showing curated snapshot + live GitHub metadata — visit github.com/turbo998 for the full profile.",
    },
    zh: {
      updated: "更新于",
      featured: "核心旗舰",
      docs: "架构 / 手稿",
      fallbackNote: "当前展示精选研究快照与实时 GitHub 元数据——访问 github.com/turbo998 查看完整主页。",
    },
  };

  function fmtDate(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return "";
    const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0");
    return LANG === "zh" ? `${y}.${m}` : `${y}-${m}`;
  }

  function mergeWithCurated(liveRepos) {
    const map = {};
    FALLBACK.forEach((item) => { map[item.name] = Object.assign({}, item); });
    (liveRepos || []).forEach((r) => {
      if (r.fork) return;
      map[r.name] = Object.assign({}, map[r.name] || {}, r, {
        description: r.description || (map[r.name] && map[r.name].description) || "",
        language: r.language || (map[r.name] && map[r.name].language) || null,
        homepage: r.homepage || (map[r.name] && map[r.name].homepage) || "",
      });
    });
    return Object.keys(map).map((k) => map[k]);
  }

  function repoCard(r) {
    const a = document.createElement("a");
    const cat = CATEGORY_MAP[r.name] || "ecosystem";
    a.className = "repo-card";
    a.setAttribute("data-repo-cat", cat);
    a.href = r.html_url;
    a.target = "_blank";
    a.rel = "noopener";

    const isFeatured = FEATURED.includes(r.name);
    const desc = LANG === "zh" ? (ZH_DESC[r.name] || r.description || "") : (r.description || "");
    const color = LANG_COLORS[r.language] || "#64748B";
    const catLabel = (CAT_LABELS[LANG] && CAT_LABELS[LANG][cat]) || cat;

    a.innerHTML = `
      <div class="repo-card-top">
        ${isFeatured ? `<span class="repo-badge">${T[LANG].featured}</span>` : `<span class="repo-badge cat">${catLabel}</span>`}
        ${isFeatured ? `<span class="repo-badge cat">${catLabel}</span>` : ""}
      </div>
      <span class="repo-name">${r.name}</span>
      <p class="repo-desc"></p>
      <span class="repo-meta">
        ${r.language ? `<span><span class="lang-dot" style="background:${color}"></span>${r.language}</span>` : `<span>${T[LANG].docs}</span>`}
        ${r.stargazers_count ? `<span>★ ${r.stargazers_count}</span>` : ""}
        <span>${T[LANG].updated} ${fmtDate(r.updated_at)}</span>
      </span>`;
    a.querySelector(".repo-desc").textContent = desc;
    return a;
  }

  function mountCategoryFilter(grid) {
    if (document.getElementById("repo-filter-bar")) return;
    const bar = document.createElement("div");
    bar.id = "repo-filter-bar";
    bar.className = "filter-bar";
    const tabs = document.createElement("div");
    tabs.className = "filter-tabs";

    ["all", "infra", "harness", "multimodal", "gaming", "ecosystem"].forEach((cat, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-btn" + (idx === 0 ? " active" : "");
      btn.textContent = CAT_LABELS[LANG][cat];
      btn.addEventListener("click", () => {
        tabs.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        grid.querySelectorAll(".repo-card").forEach((card) => {
          const match = cat === "all" || card.getAttribute("data-repo-cat") === cat;
          card.style.display = match ? "" : "none";
        });
      });
      tabs.appendChild(btn);
    });

    bar.appendChild(tabs);
    grid.parentNode.insertBefore(bar, grid);
  }

  function render(repos, isFallback) {
    const grid = document.getElementById("repo-grid");
    const status = document.getElementById("repo-status");
    if (!grid) return;

    mountCategoryFilter(grid);

    const merged = mergeWithCurated(repos);
    const sorted = merged.sort((a, b) => {
      const fa = FEATURED.indexOf(a.name), fb = FEATURED.indexOf(b.name);
      if (fa !== -1 || fb !== -1) {
        if (fa === -1) return 1;
        if (fb === -1) return -1;
        return fa - fb;
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

    grid.innerHTML = "";
    sorted.forEach((r) => grid.appendChild(repoCard(r)));
    if (status) status.textContent = isFallback ? T[LANG].fallbackNote : "";
  }

  const initReveal = window.__initReveal || function () {};

  fetch(`https://api.github.com/users/${USER}/repos?sort=updated&per_page=100`)
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((data) => render(data, false))
    .catch(() => render(FALLBACK, true))
    .finally(() => initReveal(document.getElementById("repo-grid")));
})();
