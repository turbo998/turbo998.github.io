/* ===================================================================
   Builder Theme Switcher & Interactive Command Center Controller
   Supports 3 live-switchable Builder visual styles:
     1. precision — Linear / Vercel Precision Grid (Default)
     2. terminal  — Geek Dark Builder Console
     3. blueprint — Editorial Research Blueprint
   =================================================================== */
(function () {
  var VALID = ["precision", "terminal", "blueprint"];
  var KEY = "builder_style";

  function resolveInitialStyle() {
    try {
      var params = new URLSearchParams(window.location.search);
      var q = (params.get("style") || "").toLowerCase();
      if (VALID.indexOf(q) !== -1) {
        try { localStorage.setItem(KEY, q); } catch (e) {}
        return q;
      }
      var saved = (localStorage.getItem(KEY) || "").toLowerCase();
      if (VALID.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    return "precision";
  }

  var currentStyle = resolveInitialStyle();
  document.documentElement.dataset.builderStyle = currentStyle;

  function setBuilderStyle(style) {
    if (VALID.indexOf(style) === -1) return;
    currentStyle = style;
    document.documentElement.dataset.builderStyle = style;
    try { localStorage.setItem(KEY, style); } catch (e) {}
    updateSwitcherUI(style);
    try {
      window.dispatchEvent(new CustomEvent("builderstylechange", { detail: { style: style } }));
    } catch (e) {}
  }

  window.__setBuilderStyle = setBuilderStyle;
  window.__getBuilderStyle = function () { return currentStyle; };

  function isZh() {
    var lang = (document.documentElement.lang || "").toLowerCase();
    return lang.indexOf("zh") === 0;
  }

  function isSubdir() {
    return /\/articles\//.test(window.location.pathname.replace(/\\/g, "/"));
  }

  function updateSwitcherUI(style) {
    var btns = document.querySelectorAll("[data-set-builder-style]");
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      var target = b.getAttribute("data-set-builder-style");
      if (target === style) {
        b.classList.add("active");
        b.setAttribute("aria-pressed", "true");
      } else {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      }
    }
  }

  function mountStyleBar() {
    if (document.getElementById("builder-style-bar")) {
      updateSwitcherUI(currentStyle);
      return;
    }
    var params = new URLSearchParams(window.location.search);
    if (params.get("embed") === "1") return;

    var zh = isZh();
    var prefix = isSubdir() ? "../" : "";
    var previewHref = prefix + (zh ? "zh-style-preview.html" : "style-preview.html");

    var bar = document.createElement("div");
    bar.id = "builder-style-bar";
    bar.className = "builder-style-bar";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", zh ? "页面视觉风格切换器" : "Builder Visual Style Switcher");

    bar.innerHTML =
      '<div class="bsb-inner">' +
        '<span class="bsb-label">⚡ ' + (zh ? "Builder 风格:" : "Style:") + '</span>' +
        '<div class="bsb-group" role="group">' +
          '<button type="button" class="bsb-btn" data-set-builder-style="precision">' +
            '<span class="bsb-dot dot-precision"></span>' +
            (zh ? "1. 清爽工程网格 (Precision)" : "1. Precision Grid") +
          '</button>' +
          '<button type="button" class="bsb-btn" data-set-builder-style="terminal">' +
            '<span class="bsb-dot dot-terminal"></span>' +
            (zh ? "2. 极客暗黑终端 (Terminal)" : "2. Terminal Dark") +
          '</button>' +
          '<button type="button" class="bsb-btn" data-set-builder-style="blueprint">' +
            '<span class="bsb-dot dot-blueprint"></span>' +
            (zh ? "3. 研究手稿蓝图 (Blueprint)" : "3. Blueprint") +
          '</button>' +
        '</div>' +
        '<a class="bsb-compare" href="' + previewHref + '">' +
          (zh ? "三风格同屏对比 ↗" : "Compare All 3 ↗") +
        '</a>' +
      '</div>';

    var nav = document.querySelector(".nav");
    if (nav && nav.parentNode) {
      nav.parentNode.insertBefore(bar, nav.nextSibling);
    } else {
      document.body.insertBefore(bar, document.body.firstChild);
    }

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-set-builder-style]");
      if (!btn) return;
      e.preventDefault();
      setBuilderStyle(btn.getAttribute("data-set-builder-style"));
    });

    updateSwitcherUI(currentStyle);
  }

  function initPillarFilters() {
    var filterBar = document.getElementById("pillar-filter-bar");
    if (!filterBar) return;

    var buttons = filterBar.querySelectorAll("[data-filter-pillar]");
    var blocks = document.querySelectorAll(".pillar-section[data-pillar]");
    var searchInput = document.getElementById("asset-search-input");
    var activePillar = "all";

    function applyFilter() {
      var query = searchInput ? (searchInput.value || "").trim().toLowerCase() : "";
      blocks.forEach(function (block) {
        var pillar = block.getAttribute("data-pillar");
        var pillarMatch = activePillar === "all" || pillar === activePillar;
        if (!pillarMatch) {
          block.style.display = "none";
          return;
        }
        var cards = block.querySelectorAll(".asset-card");
        var visibleCount = 0;
        cards.forEach(function (card) {
          var text = (card.textContent || "").toLowerCase();
          var match = !query || text.indexOf(query) !== -1;
          card.style.display = match ? "" : "none";
          if (match) visibleCount++;
        });
        block.style.display = visibleCount > 0 ? "" : "none";
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        activePillar = btn.getAttribute("data-filter-pillar") || "all";
        buttons.forEach(function (b) {
          b.classList.toggle("active", b === btn);
        });
        applyFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", applyFilter);
    }
  }

  function onReady() {
    mountStyleBar();
    initPillarFilters();
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-set-builder-style]");
      if (!btn || btn.closest("#builder-style-bar")) return;
      e.preventDefault();
      setBuilderStyle(btn.getAttribute("data-set-builder-style"));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})();
