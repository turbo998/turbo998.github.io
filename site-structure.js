(function () {
  "use strict";
  const studio = document.querySelector(".site-structure-studio");
  const tracks = ["infra", "commerce", "voice", "benchmarks", "animation", "game", "security"];
  const names = {
    infra: ["AI Infra", "AI 基础设施"],
    commerce: ["Agentic Commerce", "智能体商务"],
    voice: ["Voice", "语音"],
    benchmarks: ["Benchmarks & Harness", "测评与 Harness"],
    animation: ["Animation", "动画"],
    game: ["Gaming", "游戏"],
    security: ["AI Security", "AI 安全"]
  };
  const stages = [
    ["System Architecture", "整体架构解读"],
    ["Technical Comparison & Benchmarks", "技术对比测评"],
    ["Interactive Demos", "Demo 展示"],
    ["Docs & Repositories", "详细分支资料"]
  ];
  const resources = {
    infra: [["Azure Infra Lab", "https://github.com/turbo998/Azure-Infra-Lab"], ["AI Infra Research", "https://github.com/turbo998/ai-infra-research"]],
    commerce: [["Commerce Architecture / 商务架构", "./workshops/agentic-commerce/index.html"], ["Research Archive / 研究档案", "https://github.com/turbo998/ai-research-public"]],
    voice: [["Voice Architecture / 语音架构", "./voice/index.html"], ["Voice Case Study / 语音案例", "./voice/case-study.html"]],
    benchmarks: [["Benchmark Harness", "https://github.com/turbo998/benchmark-harness-engineering"], ["Reports / 评测资料", "./benchmarks.html"]],
    animation: [["Animation Research / 动画研究", "./animation/research/knowledge-explainer-animation-study.html"], ["HVE Engineering / HVE 工程", "./game/research/hve-animation-and-game-engineering.html"]],
    game: [["Game Engineering / 游戏工程", "./game/research/hve-animation-and-game-engineering.html"], ["Partner Playbook / 伙伴演示手册", "./game/research/partner-demo-playbook.html"]],
    security: [["AI Security / AI 安全", "./ai-security.html"], ["AI Landing Zone / AI 着陆区", "./security-ai-landing-zone.html"], ["AI Security Lab", "https://github.com/turbo998/ai-security-lab"]]
  };
  let language = document.documentElement.lang.startsWith("zh") ? "zh-CN" : "en";
  let activeTrack = "infra";
  const modules = new Map();
  const selected = new Map();
  const text = pair => pair[language === "en" ? 0 : 1];
  const home = () => language === "en" ? "index.html" : "zh.html";
  const el = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value) node.textContent = value;
    return node;
  };
  function localizedUrl(value) {
    const url = new URL(value, location.href);
    if (url.origin !== location.origin && url.hostname !== "turbo998.github.io") return url.href;
    if (url.pathname.includes("/workshops/ai-security/")) {
      url.pathname = url.pathname.replace(/\/(index|benchmark-cards)(\.en)?\.html$/, (_, file) =>
        "/" + file + (language === "en" ? ".en" : "") + ".html");
    }
    const rootFiles = ["benchmarks", "ai-security", "security-ai-landing-zone", "github-radar"];
    const file = url.pathname.split("/").pop().replace(/^zh-/, "").replace(/\.html$/, "");
    if (rootFiles.includes(file)) {
      url.pathname = url.pathname.replace(/[^/]+$/, (language === "en" ? "" : "zh-") + file + ".html");
    }
    url.searchParams.set("lang", language);
    return url.href;
  }
  function translate() {
    document.querySelectorAll("[data-site-en]").forEach(node => {
      node.textContent = node.dataset[language === "en" ? "siteEn" : "siteZh"];
    });
    if (!studio) return;
    document.title = text(["Frontier AI Studio · Seven Engineering Tracks", "Frontier AI Studio · 七大工程主线"]);
    const dict = window.StudioData.I18N[language];
    Object.entries(dict).forEach(([id, value]) => {
      const node = document.getElementById(id);
      if (node) node.textContent = value;
    });
    document.querySelectorAll("[data-source-id]").forEach(node => {
      const source = document.getElementById(node.dataset.sourceId);
      if (source) node.textContent = source.textContent;
    });
    tracks.forEach((track, i) => {
      document.getElementById("tab-" + track).textContent = String(i + 1).padStart(2, "0") + " · " + text(names[track]);
      const eyebrow = document.querySelector("#panel-" + track + " [id$='-eyebrow']");
      if (eyebrow) eyebrow.textContent = String(i + 1).padStart(2, "0") + " · " + text(names[track]);
    });
    document.getElementById("ui-brand-sub").textContent = text([
      "Architecture → Benchmarks → Demos → Docs · Seven engineering tracks",
      "架构解读 → 技术测评 → Demo 展示 → 分支资料 · 七大工程主线"
    ]);
    document.getElementById("btn-home").href = home();
    document.getElementById("btn-home").textContent = text(["← Command Center", "← 返回指挥中心"]);
    document.querySelectorAll(".lang-switch-group [data-lang]").forEach(button => {
      const active = button.dataset.lang === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll("[data-resource-url]").forEach(link => {
      link.href = localizedUrl(link.dataset.resourceUrl);
    });
  }
  function stageSection(track, number) {
    const section = el("section", "studio-stage");
    section.id = track + "-stage-" + number;
    const head = el("header", "stage-section-header");
    head.append(el("span", "stage-number", "STAGE " + String(number).padStart(2, "0")));
    const title = el("h2");
    title.dataset.siteEn = stages[number - 1][0];
    title.dataset.siteZh = stages[number - 1][1];
    head.append(title);
    section.append(head);
    return section;
  }
  function mountStudio() {
    const additionalLabels = {
      "b-link-col": ["Benchmark report directory ↗", "独立 Benchmark 报告专栏 ↗"],
      "b-link-s4": ["Supplement 4 · 17-model evaluation cards ↗", "增补4 · 17模型评测卡 ↗"],
      "b-f0-t": ["Microsoft Agent Framework (MAF v1.0) vs. 6 Frameworks", "Microsoft Agent Framework (MAF v1.0) 与六大主流框架"]
    };
    Object.entries(additionalLabels).forEach(([id, pair]) => {
      const node = document.getElementById(id);
      node.dataset.siteEn = pair[0];
      node.dataset.siteZh = pair[1];
    });
    const linkLabels = {
      "交互工作台 ↗": ["Interactive workbench ↗", "交互工作台 ↗"],
      "7-Card 报告 ↗": ["7-Card report ↗", "7-Card 报告 ↗"],
      "深度专著 (ZH/EN) ↗": ["Detailed monograph (ZH/EN) ↗", "深度专著 (ZH/EN) ↗"]
    };
    document.querySelectorAll(".track-panel a").forEach(link => {
      const pair = linkLabels[link.textContent.trim()];
      if (pair) {
        link.dataset.siteEn = pair[0];
        link.dataset.siteZh = pair[1];
      }
    });
    const trackNav = document.querySelector(".track-nav");
    trackNav.removeAttribute("role");
    trackNav.querySelectorAll("a").forEach(link => link.remove());
    tracks.forEach(track => trackNav.append(document.getElementById("tab-" + track)));
    const sub = el("div", "studio-subdirectory");
    sub.append(el("nav", "learning-flow-rail"), el("nav", "studio-module-jumps"));
    document.querySelector(".topbar").append(sub);
    const resize = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty("--site-header-height", Math.ceil(entry.target.getBoundingClientRect().height) + "px");
    });
    resize.observe(document.querySelector(".topbar"));
    tracks.forEach(track => {
      const panel = document.getElementById("panel-" + track);
      const overview = panel.querySelector(".overview-card");
      const shell = panel.querySelector(".stage-shell");
      const list = Array.from(panel.querySelectorAll(".scene-pill")).map(button => {
        const match = button.getAttribute("onclick").match(/loadTrackScene\('[^']+',\s*'([^']+)'/);
        return { id: button.id, button, url: match[1], report: /cards\.html|benchmark-cards/.test(match[1]) };
      });
      modules.set(track, list);
      selected.set(track, (list.find(item => !item.report) || list[0]).id);
      const parts = [1, 2, 3, 4].map(n => stageSection(track, n));
      parts[0].append(overview);
      const features = overview.querySelector(".feature-grid-3");
      if (features) parts[3].append(features);
      const comparison = el("div", "workbench-grid");
      list.filter(item => item.report).forEach(item => {
        const button = el("button", "scene-pill");
        button.dataset.sourceId = item.id;
        button.type = "button";
        button.onclick = () => navigate(track + "/module/" + item.id);
        comparison.append(button);
      });
      const note = el("p");
      note.dataset.siteEn = list.some(item => item.report)
        ? "Read the existing report for methodology, provenance and limitations before trying the demo. No scores are recalculated here."
        : "Use the HVE verification gates above and the engineering documentation below. No standalone benchmark deck is published for this track.";
      note.dataset.siteZh = list.some(item => item.report)
        ? "先阅读现有报告的方法、数据来源与局限，再运行演示；此页不重新计算分数。"
        : "参考上方 HVE 验证门禁及下方工程资料；此主线尚未发布独立基准卡组。";
      parts[1].append(note, comparison);
      parts[2].append(shell);
      const links = el("div", "studio-resource-links");
      resources[track].forEach(([label, url]) => {
        const link = el("a", "", label);
        const labels = label.split(" / ");
        link.dataset.siteEn = labels[0];
        link.dataset.siteZh = labels[1] || labels[0];
        link.dataset.resourceUrl = url;
        links.append(link);
      });
      overview.querySelectorAll("a").forEach(source => {
        source.dataset.resourceUrl = source.getAttribute("href");
        const link = source.cloneNode(true);
        link.removeAttribute("id");
        if (source.id) link.dataset.sourceId = source.id;
        link.dataset.resourceUrl = source.getAttribute("href");
        links.append(link);
      });
      parts[3].append(links);
      panel.replaceChildren(...parts);
      const frame = panel.querySelector("iframe");
      frame.title = names[track][0] + " interactive workbench";
      frame.src = "about:blank";
    });
    const directory = document.querySelector("#studio-directory");
    if (directory) {
      document.querySelector(".container").prepend(directory);
    }
  }
  function updateBreadcrumb(module) {
    const list = document.querySelector(".site-breadcrumb-bar ol");
    list.replaceChildren();
    const labels = [
      [text(["Home (Command Center)", "主页（指挥中心）"]), home()],
      ["Frontier AI Studio", "#directory"],
      [text(names[activeTrack]), "#" + activeTrack]
    ];
    if (module) labels.push([module.button.textContent, null]);
    labels.forEach(([label, href], i) => {
      const item = el("li");
      if (href && i < labels.length - 1) {
        const link = el("a", "", label);
        link.href = href === "#directory" ? "#studio-directory" : href;
        item.append(link);
      } else {
        item.textContent = label;
        item.setAttribute("aria-current", "page");
      }
      list.append(item);
    });
    document.querySelectorAll(".site-breadcrumb-bar [data-home-link]").forEach(link => link.href = home());
  }
  function replaceFrame(frame, url) {
    if (frame.src === url) return;
    // A new browsing context keeps scene navigation out of the portal's Back history.
    const replacement = frame.cloneNode(false);
    replacement.src = url;
    frame.replaceWith(replacement);
  }
  function renderRoute() {
    const bits = location.hash.slice(1).split("/");
    const qTrack = new URLSearchParams(location.search).get("track");
    activeTrack = tracks.includes(bits[0]) ? bits[0] : (tracks.includes(qTrack) ? qTrack : "infra");
    const list = modules.get(activeTrack);
    const requested = bits[1] === "module" ? list.find(item => item.id === bits[2]) : null;
    if (requested) selected.set(activeTrack, requested.id);
    const module = list.find(item => item.id === selected.get(activeTrack));
    tracks.forEach(track => {
      const active = track === activeTrack;
      document.getElementById("tab-" + track).classList.toggle("active", active);
      document.getElementById("tab-" + track).setAttribute("aria-pressed", String(active));
      document.getElementById("panel-" + track).classList.toggle("active", active);
      document.getElementById("panel-" + track).hidden = !active;
      const frame = document.getElementById("iframe-" + track);
      if (!active && frame.getAttribute("src") !== "about:blank") replaceFrame(frame, "about:blank");
    });
    const frame = document.getElementById("iframe-" + activeTrack);
    const url = localizedUrl(module.url);
    replaceFrame(frame, url);
    list.forEach(item => {
      item.button.classList.toggle("active", item === module);
      item.button.setAttribute("aria-pressed", String(item === module));
    });
    document.getElementById(activeTrack + "-url-indicator").textContent = module.url;
    const rail = document.querySelector(".studio-subdirectory .learning-flow-rail");
    rail.replaceChildren(...stages.map((stage, i) => {
      const link = el("a", "", String(i + 1).padStart(2, "0") + " · " + text(stage));
      link.href = "#" + activeTrack + "/stage-" + (i + 1);
      return link;
    }));
    rail.setAttribute("aria-label", text(["Learning stages", "学习阶段"]));
    const jumps = document.querySelector(".studio-module-jumps");
    jumps.setAttribute("aria-label", text(["Submodules and scenes", "二级模块与场景"]));
    jumps.replaceChildren(...list.map(item => {
      const button = el("button", "", item.button.textContent);
      button.type = "button";
      button.setAttribute("aria-pressed", String(item === module));
      button.onclick = () => navigate(activeTrack + "/module/" + item.id);
      return button;
    }));
    updateBreadcrumb(module);
    const stageNumber = /^stage-[1-4]$/.test(bits[1] || "") ? Number(bits[1].slice(-1))
      : requested ? 3 : tracks.includes(bits[0]) ? 1 : null;
    if (stageNumber) document.getElementById(activeTrack + "-stage-" + stageNumber).scrollIntoView();
    if (location.hash === "#studio-directory") document.getElementById("studio-directory").scrollIntoView();
  }
  function navigate(route) {
    if (location.hash === "#" + route) renderRoute();
    else location.hash = route;
  }
  if (studio) {
    mountStudio();
    window.selectTrack = track => navigate(track);
    window.loadTrackScene = (track, url, button) => navigate(track + "/module/" + button.id);
    window.openCurrentStage = () => {
      const module = modules.get(activeTrack).find(item => item.id === selected.get(activeTrack));
      window.open(localizedUrl(module.url), "_blank", "noopener");
    };
    window.setLang = lang => {
      language = lang === "en" ? "en" : "zh-CN";
      document.documentElement.lang = language;
      const url = new URL(location.href);
      url.searchParams.set("lang", language);
      history.replaceState(null, "", url);
      translate();
      renderRoute();
    };
    window.addEventListener("hashchange", renderRoute);
    window.addEventListener("popstate", () => {
      language = new URLSearchParams(location.search).get("lang") === "en" ? "en" : "zh-CN";
      document.documentElement.lang = language;
      translate();
      renderRoute();
    });
    window.setLang(new URLSearchParams(location.search).get("lang") || "zh-CN");
  } else {
    document.querySelectorAll(".lang-switch-group a").forEach(link => {
      const url = new URL(link.getAttribute("href"), location.href);
      url.search = location.search;
      url.searchParams.set("lang", link.hreflang);
      url.hash = location.hash;
      link.href = url.href;
    });
    window.addEventListener("hashchange", () => {
      document.querySelectorAll(".lang-switch-group a").forEach(link => {
        const url = new URL(link.href);
        url.hash = location.hash;
        link.href = url.href;
      });
    });
  }
})();
