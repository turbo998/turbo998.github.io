/* ==========================================================================
   Microsoft Ignite 2026 — Enterprise Agentic AI Journey
   Shared Controller: Theme · Bilingual (zh-CN/en) · Presenter Stage · Tabs
   ========================================================================== */
(function () {
  "use strict";

  const STORAGE_THEME = "ignite26_theme";
  const STORAGE_LANG = "ignite26_lang";
  const STORAGE_MODE = "ignite26_mode";
  const STORAGE_CUE = "ignite26_cue";

  const params = new URLSearchParams(window.location.search);

  function getInitialTheme() {
    const q = params.get("theme");
    if (q === "light" || q === "dark") return q;
    const saved = localStorage.getItem(STORAGE_THEME);
    if (saved === "light" || saved === "dark") return saved;
    return "dark";
  }

  function getInitialLang() {
    const q = params.get("lang");
    if (q === "en" || q === "zh-CN") return q;
    if (/\/ignite-2026\//i.test(window.location.pathname)) {
      return /\.en\.html$/i.test(window.location.pathname) ? "en" : "zh-CN";
    }
    if (/\.en\.html$/i.test(window.location.pathname)) return "en";
    const saved = localStorage.getItem(STORAGE_LANG);
    if (saved === "en" || saved === "zh-CN") return saved;
    return document.documentElement.lang === "en" ? "en" : "zh-CN";
  }

  function getInitialMode() {
    const q = params.get("mode");
    if (q === "present" || q === "read") return q;
    const saved = localStorage.getItem(STORAGE_MODE);
    if (saved === "present" || saved === "read") return saved;
    return "read";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_THEME, theme);
    document.querySelectorAll("[data-action='toggle-theme']").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(theme === "light"));
      const label = btn.querySelector(".theme-label");
      if (label) {
        const lang = document.documentElement.lang;
        label.textContent = theme === "dark"
          ? (lang === "en" ? "Light" : "浅色")
          : (lang === "en" ? "Dark" : "深色");
      }
    });
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_LANG, lang);
    const titleEl = document.documentElement;
    const zhTitle = document.body?.dataset?.titleZh;
    const enTitle = document.body?.dataset?.titleEn;
    if (lang === "en" && enTitle) document.title = enTitle;
    if (lang === "zh-CN" && zhTitle) document.title = zhTitle;

    document.querySelectorAll("[data-action='toggle-lang']").forEach((btn) => {
      btn.textContent = lang === "zh-CN" ? "EN / 中文" : "中文 / EN";
      btn.setAttribute("aria-label", lang === "zh-CN" ? "Switch to English" : "切换为中文");
    });

    // Refresh mode/theme labels on language switch
    applyTheme(titleEl.getAttribute("data-theme") || "dark");
    applyMode(titleEl.getAttribute("data-mode") || "read");

    window.dispatchEvent(new CustomEvent("ignite:langchange", { detail: { lang } }));
  }

  function applyMode(mode) {
    document.documentElement.setAttribute("data-mode", mode);
    localStorage.setItem(STORAGE_MODE, mode);
    const lang = document.documentElement.lang || "zh-CN";
    document.querySelectorAll("[data-action='toggle-mode']").forEach((btn) => {
      const isPresent = mode === "present";
      btn.setAttribute("aria-pressed", String(isPresent));
      btn.classList.toggle("active", isPresent);
      btn.textContent = isPresent
        ? (lang === "en" ? "🎤 Stage Mode (On)" : "🎤 宣讲投屏 (已开)")
        : (lang === "en" ? "📖 Reading / 🎤 Stage" : "📖 精读 / 🎤 投屏");
    });
    updateSlideCounter();
  }

  function toggleSpeakerCues(forceState) {
    const cues = document.querySelectorAll(".speaker-cue");
    if (!cues.length) return;
    const currentlyShown = cues[0].classList.contains("force-open");
    const next = typeof forceState === "boolean" ? forceState : !currentlyShown;
    cues.forEach((c) => c.classList.toggle("force-open", next));
    localStorage.setItem(STORAGE_CUE, next ? "1" : "0");
    document.querySelectorAll("[data-action='toggle-cues']").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(next));
      btn.classList.toggle("active", next);
    });
  }

  // Generic Accessible Tab Groups ([data-tabs])
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach((group) => {
      const buttons = Array.from(group.querySelectorAll("[data-tab-target]"));
      const scopeId = group.getAttribute("data-tabs");
      const container = (scopeId && document.getElementById(scopeId)) || group.parentElement;
      if (!container) return;

      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const targetId = btn.getAttribute("data-tab-target");
          buttons.forEach((b) => {
            const active = b === btn;
            b.classList.toggle("active", active);
            b.setAttribute("aria-selected", String(active));
          });
          container.querySelectorAll(":scope > .tab-panel, [data-tab-panel]").forEach((panel) => {
            if (panel.closest("[data-tabs-scope]") && panel.closest("[data-tabs-scope]") !== container) return;
            panel.hidden = panel.id !== targetId;
          });
        });
      });
    });
  }

  // Presenter Slide Navigation across .stage-section blocks
  let activeSlideIndex = 0;

  function getSlides() {
    return Array.from(document.querySelectorAll(".hero-panel, .stage-section"));
  }

  function updateSlideCounter() {
    const slides = getSlides();
    const counter = document.getElementById("presenter-counter");
    if (counter && slides.length) {
      counter.textContent = `${activeSlideIndex + 1} / ${slides.length}`;
    }
  }

  function goToSlide(index) {
    const slides = getSlides();
    if (!slides.length) return;
    activeSlideIndex = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach((s, idx) => s.classList.toggle("active-slide", idx === activeSlideIndex));
    slides[activeSlideIndex].scrollIntoView({ behavior: "smooth", block: "start" });
    updateSlideCounter();
  }

  function buildPresenterDock() {
    if (document.querySelector(".presenter-dock")) return;
    const dock = document.createElement("div");
    dock.className = "presenter-dock";
    dock.setAttribute("role", "toolbar");
    dock.setAttribute("aria-label", "Presenter Navigation");
    dock.innerHTML = `
      <button type="button" id="dock-prev" title="Previous Section (←)">◀</button>
      <span id="presenter-counter" class="mono">1 / 1</span>
      <button type="button" id="dock-next" title="Next Section (→)">▶</button>
      <button type="button" id="dock-exit" title="Exit Stage Mode (Esc)">✕</button>
    `;
    document.body.appendChild(dock);

    dock.querySelector("#dock-prev").addEventListener("click", () => goToSlide(activeSlideIndex - 1));
    dock.querySelector("#dock-next").addEventListener("click", () => goToSlide(activeSlideIndex + 1));
    dock.querySelector("#dock-exit").addEventListener("click", () => applyMode("read"));
    updateSlideCounter();
  }

  function initKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      const tag = (e.target && e.target.tagName) || "";
      if (["INPUT", "SELECT", "TEXTAREA"].includes(tag)) return;

      const isPresent = document.documentElement.getAttribute("data-mode") === "present";
      if (isPresent && (e.key === "ArrowRight" || e.key === "PageDown" || e.key.toLowerCase() === "j")) {
        e.preventDefault();
        goToSlide(activeSlideIndex + 1);
      } else if (isPresent && (e.key === "ArrowLeft" || e.key === "PageUp" || e.key.toLowerCase() === "k")) {
        e.preventDefault();
        goToSlide(activeSlideIndex - 1);
      } else if (isPresent && e.key === "Escape") {
        applyMode("read");
      } else if (e.key.toLowerCase() === "p" && e.altKey) {
        e.preventDefault();
        applyMode(isPresent ? "read" : "present");
      } else if (e.key.toLowerCase() === "l" && e.altKey) {
        e.preventDefault();
        const nextLang = document.documentElement.lang === "zh-CN" ? "en" : "zh-CN";
        applyLang(nextLang);
      }
    });
  }

  // Official Microsoft & Draw.io Azure2 Service SVG Icon Registry (zero custom/hand-drawn icons)
  const OFFICIAL_ICON_FILES = {
    microsoft: "assets/icons/microsoft.svg",
    azure: "assets/icons/azure.svg",
    copilot: "assets/icons/copilot.svg",
    "copilot-studio": "assets/icons/copilot-studio.svg",
    d365: "assets/icons/d365.svg",
    agent365: "assets/icons/agent365.svg",
    foundry: "assets/icons/foundry.svg",
    "foundry-agent": "assets/icons/foundry-agent.svg",
    "foundry-iq": "assets/icons/foundry-iq.svg",
    "foundry-models": "assets/icons/foundry-models.svg",
    webiq: "assets/icons/webiq.svg",
    "ai-search": "assets/icons/ai-search.svg",
    "ai-gateway": "assets/icons/ai-gateway.svg",
    fabric: "assets/icons/fabric.svg",
    onelake: "assets/icons/onelake.svg",
    eventhouse: "assets/icons/eventhouse.svg",
    horizondb: "assets/icons/horizondb.svg",
    powerbi: "assets/icons/powerbi.svg",
    entra: "assets/icons/entra.svg",
    purview: "assets/icons/purview.svg",
    defender: "assets/icons/defender.svg",
    guardrails: "assets/icons/guardrails.svg",
    apim: "assets/icons/apim.svg",
    frontdoor: "assets/icons/frontdoor.svg",
    functions: "assets/icons/functions.svg",
    aks: "assets/icons/aks.svg",
    aca: "assets/icons/aca.svg",
    cosmos: "assets/icons/cosmos.svg",
    monitor: "assets/icons/monitor.svg",
    silicon: "assets/icons/silicon.svg",
    gpu: "assets/icons/gpu.svg",
    network: "assets/icons/network.svg",
    teams: "assets/icons/teams.svg",
    github: "assets/icons/github.svg"
  };

  const QUICK_SEARCH_INDEX = [
    { href: "index.html#one-page-overview", zh: "00 全景架构蓝图 · One-Page 生态架构总览", en: "00 Executive Blueprint · One-Page Ecosystem Architecture", kw: "overview blueprint architecture ecosystem ignite 2026 总览 全景 架构图" },
    { href: "01-copilot-entry.html#stage01-architecture", zh: "01 智能体协同入口 · Copilot · Work IQ · Agent 365", en: "01 Unified Agent Entry · Copilot · Work IQ · Agent 365", kw: "m365 copilot work iq agent 365 copilot studio teams 入口 协同" },
    { href: "02-web-iq-context.html#stage02-architecture", zh: "02 实时世界感知 · WebIQ · Foundry IQ · AI Search", en: "02 Live World Context · WebIQ · Foundry IQ · AI Search", kw: "webiq bing grounding foundry iq azure ai search rag citation 网页 接地 检索" },
    { href: "03-fabric-ontology.html#stage03-architecture", zh: "03 企业数据本体 · Fabric IQ · OneLake · HorizonDB", en: "03 Enterprise Data Ontology · Fabric IQ · OneLake · HorizonDB", kw: "fabric iq ontology onelake eventhouse horizondb postgresql diamond databricks 本体 湖仓" },
    { href: "04-foundry-engineering.html#stage04-architecture", zh: "04 智能体编排工程 · Foundry Agent · MAF · MCP", en: "04 Agent Runtime Engineering · Foundry Agent · MAF · MCP", kw: "microsoft foundry agent service maf durable mcp a2a aca aks cosmos 编排 多智能体" },
    { href: "05-ai-infra-optimization.html#stage05-architecture", zh: "05 推理算力优化 · PD 分离 · KV Cache · Maia 300 · RoCEv2", en: "05 Inference Infra Optimization · PD · KV Cache · Maia 300 · RoCEv2", kw: "ttft tpot pd disaggregation kv cache maia 300 deepseek kimi fireworks baseten vram nvlink infiniband roce 算力 显存" },
    { href: "06-agent-governance.html#stage06-architecture", zh: "06 智能体安全治理 · Entra Agent ID · Purview · Defender", en: "06 Enterprise Agent Governance · Entra Agent ID · Purview · Defender", kw: "entra agent id obo purview dlp defender prompt shields ai gateway zero trust 安全 治理 零信任" }
  ];

  function resolveStageHref(baseHref, lang) {
    const isEnFile = /\.en\.html$/i.test(window.location.pathname);
    if (!isEnFile) return baseHref;
    const parts = baseHref.split("#");
    const page = parts[0].replace(/\.html$/i, ".en.html");
    return parts[1] ? `${page}#${parts[1]}` : page;
  }

  function initHeaderEnhancements() {
    const controls = document.querySelector(".site-header .header-controls");
    if (!controls || controls.dataset.igniteEnhanced === "1") return;
    controls.dataset.igniteEnhanced = "1";

    const inPublishedSite = /\/ignite-2026\//i.test(window.location.pathname) || !!controls.querySelector(".hub-return-link");
    let hubLink = controls.querySelector(".hub-return-link");
    if (inPublishedSite) {
      if (!hubLink) {
        hubLink = document.createElement("a");
        hubLink.className = "ctrl-btn hub-return-link";
        controls.insertBefore(hubLink, controls.firstChild);
      }
      const updateHubHref = () => {
        const en = document.documentElement.lang === "en";
        hubLink.href = en ? "../index.html" : "../zh.html";
        hubLink.textContent = en ? "← Main Site" : "← 个人主页";
      };
      updateHubHref();
      window.addEventListener("ignite:langchange", updateHubHref);
    }

    let wrap = controls.querySelector(".header-search-wrap");
    let input = wrap && wrap.querySelector(".header-search-input");
    let results = wrap && wrap.querySelector(".header-search-results");
    const createdWrap = !wrap;
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = "header-search-wrap";
    }
    if (!input) {
      input = document.createElement("input");
      input.type = "search";
      input.className = "header-search-input";
      wrap.appendChild(input);
    }
    if (!results) {
      results = document.createElement("div");
      results.className = "header-search-results";
      results.hidden = true;
      wrap.appendChild(results);
    }

    function syncPlaceholder() {
      const en = document.documentElement.lang === "en";
      input.placeholder = en ? "Search stages / services…" : "搜索章节 / 微软服务…";
      input.setAttribute("aria-label", en ? "Search Ignite 2026 stages and services" : "搜索 Ignite 2026 章节与服务");
    }
    syncPlaceholder();
    window.addEventListener("ignite:langchange", syncPlaceholder);

    function renderMatches(q) {
      const query = q.trim().toLowerCase();
      const en = document.documentElement.lang === "en";
      const items = query
        ? QUICK_SEARCH_INDEX.filter((it) =>
            it.kw.includes(query) || it.zh.toLowerCase().includes(query) || it.en.toLowerCase().includes(query)
          )
        : QUICK_SEARCH_INDEX;
      if (!items.length) {
        results.innerHTML = `<div class="header-search-item"><span>${en ? "No matching stage found" : "未找到匹配章节"}</span></div>`;
      } else {
        results.innerHTML = items.slice(0, 7).map((it) =>
          `<a class="header-search-item" href="${resolveStageHref(it.href, en ? "en" : "zh-CN")}"><strong>${en ? it.en : it.zh}</strong></a>`
        ).join("");
      }
      results.hidden = false;
    }

    input.addEventListener("focus", () => renderMatches(input.value));
    input.addEventListener("input", () => renderMatches(input.value));
    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) results.hidden = true;
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        results.hidden = true;
        input.blur();
      } else if (e.key === "Enter") {
        const first = results.querySelector("a.header-search-item");
        if (first) window.location.href = first.getAttribute("href");
      }
    });

    if (createdWrap) {
      controls.insertBefore(wrap, hubLink ? hubLink.nextSibling : controls.firstChild);
    }
  }

  function initArchBoards() {
    document.querySelectorAll("[data-ms-icon]").forEach((el) => {
      const key = el.getAttribute("data-ms-icon");
      const src = OFFICIAL_ICON_FILES[key];
      if (src) {
        el.innerHTML = `<img src="${src}" width="20" height="20" alt="" loading="eager" decoding="async" draggable="false">`;
      }
    });

    document.querySelectorAll("[data-action='zoom-arch']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const board = btn.closest(".ms-arch-board");
        if (!board) return;
        const zoomed = board.classList.toggle("is-zoomed");
        btn.setAttribute("aria-pressed", String(zoomed));
      });
    });
  }

  // Apply initial state immediately on DOMContentLoaded
  function boot() {
    initHeaderEnhancements();
    initArchBoards();
    applyTheme(getInitialTheme());
    applyLang(getInitialLang());
    buildPresenterDock();
    applyMode(getInitialMode());
    if (localStorage.getItem(STORAGE_CUE) === "1") {
      toggleSpeakerCues(true);
    }

    document.querySelectorAll("[data-action='toggle-theme']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cur = document.documentElement.getAttribute("data-theme") || "dark";
        applyTheme(cur === "dark" ? "light" : "dark");
      });
    });

    document.querySelectorAll("[data-action='toggle-lang']").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (/\/ignite-2026\//i.test(window.location.pathname)) {
          e.preventDefault();
          const p = window.location.pathname;
          const base = /\/$/.test(p) ? p + "index.html" : p;
          const nextPath = /\.en\.html$/i.test(base)
            ? base.replace(/\.en\.html$/i, ".html")
            : base.replace(/\.html$/i, ".en.html");
          window.location.href = nextPath + window.location.hash;
          return;
        }
        e.preventDefault();
        const cur = document.documentElement.lang === "en" ? "zh-CN" : "en";
        applyLang(cur);
      });
    });

    document.querySelectorAll("[data-action='toggle-mode']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cur = document.documentElement.getAttribute("data-mode") || "read";
        applyMode(cur === "present" ? "read" : "present");
      });
    });

    document.querySelectorAll("[data-action='toggle-cues']").forEach((btn) => {
      btn.addEventListener("click", () => toggleSpeakerCues());
    });

    initTabs();
    initKeyboardShortcuts();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
