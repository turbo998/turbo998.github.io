/* GitHub repo showcase: live fetch from the GitHub API with a curated
   static fallback (used when rate-limited or offline). */

(function () {
  const USER = "turbo998";
  const LANG = document.documentElement.lang && document.documentElement.lang.startsWith("zh") ? "zh" : "en";

  const FEATURED = [
    "Agent-Harness-Engineering-on-Azure-and-GitHub-Copilot",
    "FDE-on-GitHub-Copilot-Practice-Book",
    "gpt-realtime-2-vision-companion",
    "copilot-usage-portal",
    "hermes-on-azure",
    "azure-openai-faq",
  ];

  /* Curated Chinese descriptions shown on the zh page (the GitHub API
     only returns the original description). */
  const ZH_DESC = {
    "Agent-Harness-Engineering-on-Azure-and-GitHub-Copilot": "基于 Azure + GitHub Copilot 构建 AI 智能体系统的实战工作坊：四层模型、10 个智能体与企业级部署。",
    "brightdata-webiq-demos": "四个可运行 Demo，对比 Bright Data 网络数据工具与 Microsoft Web IQ 方案。",
    "world-cup-sweepstake": "世界杯竞猜管理应用。",
    "qupeiyin-ghcp-demo": "GitHub Copilot 60 分钟客户演示：自动标签、课堂看板、多智能体三个现场 Demo。",
    "FDE-on-GitHub-Copilot-Practice-Book": "《微软生态下的前置部署工程实践》——FDE 方法论与 Copilot Harness 工程的融合实践手册。",
    "vibe-coding-notes": "Vibe Coding 框架与工具的技术笔记，面向 Demo 快速开发。",
    "copilot-usage-portal": "Azure 上的多客户 GitHub Copilot Token 用量看板。",
    "contact-center-on-gpt-realtime": "全球呼叫中心 Demo 的规格与设计，串联三个 Microsoft Foundry 实时模型。",
    "gpt-realtime-2-vision-companion": "面向视障人群的实时语音 + 视觉 AI 伴侣，基于 Azure OpenAI。",
    "azure-openai-faq": "OpenAI → Azure OpenAI 迁移调试 FAQ，附可运行代码示例。",
    "fabric-mirroring-directlake-agent-demo": "Microsoft Fabric 端到端场景：Mirroring + DirectLake + Data Agent，结合本体与 MCP。",
    "microsoft-fabric-learning-plan": "Microsoft Fabric 8 周深度学习计划，含动手实验与竞品分析。",
    "azure-sa-skills": "Azure 解决方案架构师日常工作技能集。",
    "hermes-on-azure": "Hermes Agent 工作坊仓库（Azure 部署）。",
    "hermes-foundry-memory-plugin": "Hermes Agent 的 Azure AI Foundry 记忆插件。",
    "hermes-azure-files-plugin": "Hermes Agent 的 Azure Blob Storage + BlobFuse2/Azure Files 插件。",
    "copilot-multi-agent-dashboard": "聚合 GitHub Copilot CLI、Hermes Agent 与 OpenClaw 会话历史的统一 Web 看板。",
  };

  /* Fallback snapshot (2026-07) in case the GitHub API is unreachable. */
  const FALLBACK = [
    { name: "Agent-Harness-Engineering-on-Azure-and-GitHub-Copilot", description: "A hands-on workshop for building AI agent systems with Azure + GitHub Copilot: 4-layer model, 10 agents, enterprise deployment.", language: "Shell", stargazers_count: 1, html_url: "https://github.com/turbo998/Agent-Harness-Engineering-on-Azure-and-GitHub-Copilot", updated_at: "2026-07-01" },
    { name: "FDE-on-GitHub-Copilot-Practice-Book", description: "微软生态下的前置部署工程实践 — FDE methodology integrated with Copilot Harness engineering.", language: "SCSS", stargazers_count: 0, html_url: "https://github.com/turbo998/FDE-on-GitHub-Copilot-Practice-Book", homepage: "https://turbo998.github.io/FDE-on-GitHub-Copilot-Practice-Book/", updated_at: "2026-06-03" },
    { name: "gpt-realtime-2-vision-companion", description: "Real-time voice + vision AI companion for blind & low-vision users, powered by Azure OpenAI.", language: "Python", stargazers_count: 0, html_url: "https://github.com/turbo998/gpt-realtime-2-vision-companion", updated_at: "2026-05-25" },
    { name: "copilot-usage-portal", description: "Multi-client GitHub Copilot token usage dashboard on Azure.", language: "Python", stargazers_count: 0, html_url: "https://github.com/turbo998/copilot-usage-portal", updated_at: "2026-06-04" },
    { name: "hermes-on-azure", description: "Hermes Agent workshop repository.", language: "Bicep", stargazers_count: 0, html_url: "https://github.com/turbo998/hermes-on-azure", updated_at: "2026-04-15" },
    { name: "azure-openai-faq", description: "OpenAI → Azure OpenAI 迁移调试 FAQ with runnable code examples.", language: null, stargazers_count: 0, html_url: "https://github.com/turbo998/azure-openai-faq", updated_at: "2026-05-25" },
    { name: "brightdata-webiq-demos", description: "Four runnable demos comparing Bright Data web tooling with Microsoft Web IQ solutions.", language: "Python", stargazers_count: 0, html_url: "https://github.com/turbo998/brightdata-webiq-demos", updated_at: "2026-06-28" },
    { name: "qupeiyin-ghcp-demo", description: "GitHub Copilot 60-min customer demo: auto-tagging, classroom dashboard, multi-agent.", language: "Python", stargazers_count: 0, html_url: "https://github.com/turbo998/qupeiyin-ghcp-demo", updated_at: "2026-06-12" },
    { name: "contact-center-on-gpt-realtime", description: "Spec & design for a global contact center demo connecting three Microsoft Foundry realtime models.", language: "Python", stargazers_count: 0, html_url: "https://github.com/turbo998/contact-center-on-gpt-realtime", updated_at: "2026-05-26" },
    { name: "fabric-mirroring-directlake-agent-demo", description: "End-to-end Microsoft Fabric scenario: Mirroring + DirectLake + Data Agent with ontology + MCP.", language: null, stargazers_count: 0, html_url: "https://github.com/turbo998/fabric-mirroring-directlake-agent-demo", updated_at: "2026-05-25" },
    { name: "microsoft-fabric-learning-plan", description: "Microsoft Fabric 8-week deep learning plan with hands-on labs and competitive analysis.", language: null, stargazers_count: 0, html_url: "https://github.com/turbo998/microsoft-fabric-learning-plan", updated_at: "2026-05-25" },
    { name: "azure-sa-skills", description: "Azure Solution Architect daily work-related skills collection.", language: "Python", stargazers_count: 1, html_url: "https://github.com/turbo998/azure-sa-skills", updated_at: "2026-05-18" },
    { name: "hermes-foundry-memory-plugin", description: "Azure AI Foundry memory provider plugin for Hermes Agent.", language: "Python", stargazers_count: 0, html_url: "https://github.com/turbo998/hermes-foundry-memory-plugin", updated_at: "2026-05-16" },
    { name: "hermes-azure-files-plugin", description: "Azure Blob Storage + BlobFuse2/Azure Files plugin for Hermes Agent.", language: "Python", stargazers_count: 0, html_url: "https://github.com/turbo998/hermes-azure-files-plugin", updated_at: "2026-05-16" },
    { name: "copilot-multi-agent-dashboard", description: "Unified web dashboard aggregating GitHub Copilot CLI, Hermes Agent, and OpenClaw session histories.", language: null, stargazers_count: 0, html_url: "https://github.com/turbo998/copilot-multi-agent-dashboard", updated_at: "2026-05-14" },
    { name: "vibe-coding-notes", description: "Technical notes on vibe coding frameworks and tools for demo development.", language: null, stargazers_count: 0, html_url: "https://github.com/turbo998/vibe-coding-notes", updated_at: "2026-06-03" },
    { name: "world-cup-sweepstake", description: "Project for sweepstake management.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/turbo998/world-cup-sweepstake", updated_at: "2026-06-14" },
  ];

  const LANG_COLORS = {
    Python: "#3572A5", Shell: "#89e051", JavaScript: "#f1e05a", TypeScript: "#3178c6",
    SCSS: "#c6538c", Bicep: "#519aba", HTML: "#e34c26", CSS: "#563d7c", "Jupyter Notebook": "#DA5B0B",
  };

  const T = {
    en: { updated: "Updated", featured: "Featured", docs: "Docs / Notes", live: "Live fallback note",
          fallbackNote: "Showing a cached snapshot — visit github.com/turbo998 for the live list." },
    zh: { updated: "更新于", featured: "精选", docs: "文档 / 笔记",
          fallbackNote: "当前展示的是缓存快照——最新列表请访问 github.com/turbo998。" },
  };

  function fmtDate(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return "";
    const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0");
    return LANG === "zh" ? `${y} 年 ${d.getMonth() + 1} 月` : `${y}-${m}`;
  }

  function repoCard(r) {
    const a = document.createElement("a");
    a.className = "repo-card";
    a.href = r.html_url;
    a.target = "_blank";
    a.rel = "noopener";

    const isFeatured = FEATURED.includes(r.name);
    const desc = LANG === "zh" ? (ZH_DESC[r.name] || r.description || "") : (r.description || "");
    const color = LANG_COLORS[r.language] || "#8b949e";

    a.innerHTML = `
      ${isFeatured ? `<span class="repo-badge">${T[LANG].featured}</span>` : ""}
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

  function render(repos, isFallback) {
    const grid = document.getElementById("repo-grid");
    const status = document.getElementById("repo-status");
    if (!grid) return;

    const sorted = repos
      .filter((r) => !r.fork)
      .sort((a, b) => {
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

  /* Scroll-reveal for the repo grid is provided by the shared reveal.js,
     loaded before this script on every page. */
  const initReveal = window.__initReveal || function () {};

  fetch(`https://api.github.com/users/${USER}/repos?sort=updated&per_page=100`)
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((data) => render(data, false))
    .catch(() => render(FALLBACK, true))
    .finally(() => initReveal(document.getElementById("repo-grid")));
})();
