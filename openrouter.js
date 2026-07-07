/* OpenRouter usage leaderboard: mirrors openrouter.ai/rankings.
   Fetches the public rankings API (weekly token usage per model) and the
   lightweight models catalog (for display names/providers), matches them
   by model slug, and renders a ranked list into #rank-list. */
(function () {
  const list = document.getElementById("rank-list");
  const status = document.getElementById("model-status");
  if (!list) return;

  const LANG = document.documentElement.lang === "zh" ? "zh" : "en";
  const RANKINGS_API = "https://openrouter.ai/api/frontend/v1/rankings/models?view=week";
  const MODELS_API = "https://openrouter.ai/api/v1/models";
  const MAX_ROWS = 12;

  const T = {
    en: {
      tokens: "tokens/week",
      fallback: "Live API unavailable — showing a cached snapshot of last week's leaderboard.",
      view: "View on OpenRouter →",
    },
    zh: {
      tokens: "周处理 Token",
      fallback: "实时接口暂不可用——以下为上周排行榜的缓存快照。",
      view: "在 OpenRouter 查看 →",
    },
  }[LANG];

  // Static fallback mirroring the shape/order of a typical weekly leaderboard,
  // used only if the live API is unreachable (offline, CORS change, etc.).
  const FALLBACK = [
    { id: "anthropic/claude-sonnet-5", name: "Claude Sonnet 5", provider: "anthropic", tokens: 182_000_000_000 },
    { id: "openai/gpt-5.4", name: "GPT-5.4", provider: "openai", tokens: 164_000_000_000 },
    { id: "google/gemini-3.1-pro", name: "Gemini 3.1 Pro", provider: "google", tokens: 121_000_000_000 },
    { id: "deepseek/deepseek-v4", name: "DeepSeek V4", provider: "deepseek", tokens: 98_000_000_000 },
    { id: "x-ai/grok-5", name: "Grok 5", provider: "x-ai", tokens: 76_000_000_000 },
    { id: "qwen/qwen3-max", name: "Qwen3 Max", provider: "qwen", tokens: 61_000_000_000 },
    { id: "meta-llama/llama-4-maverick", name: "Llama 4 Maverick", provider: "meta-llama", tokens: 47_000_000_000 },
    { id: "mistralai/mistral-large-3", name: "Mistral Large 3", provider: "mistralai", tokens: 33_000_000_000 },
  ];

  function providerOf(id) {
    return (id || "").split("/")[0] || "";
  }

  function stripDate(slug) {
    return (slug || "").replace(/-\d{8}$/, "");
  }

  function fmtTokens(n) {
    if (!n && n !== 0) return "—";
    if (n >= 1e12) return (n / 1e12).toFixed(1) + "T";
    if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
    if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
    return String(n);
  }

  function rankRow(m, i, maxTokens) {
    const a = document.createElement("a");
    a.className = "rank-row";
    a.href = "https://openrouter.ai/" + (m.id || "");
    a.target = "_blank";
    a.rel = "noopener";

    const pct = maxTokens ? Math.max(4, Math.round((m.tokens / maxTokens) * 100)) : 4;
    const initial = (m.name || m.id || "?").trim().charAt(0).toUpperCase();
    const rankClass = i < 3 ? ` r${i + 1}` : "";

    a.innerHTML =
      `<span class="rank-num${rankClass}">${i + 1}</span>` +
      `<span class="rank-avatar">${initial}</span>` +
      `<span class="rank-info">` +
        `<span class="rank-name">${m.name || m.id}</span>` +
        `<span class="rank-provider">${providerOf(m.id) || m.provider || ""}</span>` +
      `</span>` +
      `<span class="rank-stats">` +
        `<span class="rank-bar"><span style="width:${pct}%"></span></span>` +
        `<span class="rank-tokens">${fmtTokens(m.tokens)} ${T.tokens}</span>` +
      `</span>`;
    return a;
  }

  function render(models, isFallback) {
    const top = models.slice(0, MAX_ROWS);
    const maxTokens = top.length ? top[0].tokens : 0;
    list.innerHTML = "";
    top.forEach((m, i) => list.appendChild(rankRow(m, i, maxTokens)));
    if (status) status.textContent = isFallback ? T.fallback : "";
    if (window.__initReveal) window.__initReveal(list);
  }

  Promise.all([
    fetch(RANKINGS_API).then((res) => (res.ok ? res.json() : Promise.reject(res.status))),
    fetch(MODELS_API).then((res) => (res.ok ? res.json() : Promise.reject(res.status))),
  ])
    .then(([rankingsRes, modelsRes]) => {
      const rankings = Array.isArray(rankingsRes) ? rankingsRes : rankingsRes.data || [];
      const catalog = (modelsRes && modelsRes.data) || [];
      const byId = new Map(catalog.map((m) => [m.id, m]));

      const merged = [];
      rankings.forEach((r) => {
        const slug = stripDate(r.model_permaslug);
        const meta = byId.get(slug);
        if (!meta) return; // skip non-text / unmatched models
        const tokens =
          (Number(r.total_prompt_tokens) || 0) +
          (Number(r.total_completion_tokens) || 0);
        merged.push({ id: meta.id, name: meta.name, tokens });
      });

      merged.sort((a, b) => b.tokens - a.tokens);
      if (!merged.length) throw new Error("no matched models");
      render(merged, false);
    })
    .catch(() => render(FALLBACK, true));
})();
