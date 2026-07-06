(function () {
  const grid = document.getElementById("model-grid");
  const status = document.getElementById("model-status");
  if (!grid) return;

  const LANG = document.documentElement.lang === "zh" ? "zh" : "en";
  const API = "https://openrouter.ai/api/v1/models";
  const MAX_CARDS = 8;

  // No free/keyless "popularity" ranking exists on OpenRouter, so we proxy
  // "popular" with one flagship (highest prompt price) model per well-known
  // provider, in a fixed priority order.
  const PROVIDER_ORDER = [
    "openai", "anthropic", "google", "x-ai", "deepseek",
    "meta-llama", "mistralai", "qwen", "cohere", "perplexity",
  ];

  const T = {
    en: {
      context: "Context",
      prompt: "Prompt",
      completion: "Completion",
      perM: "/1M tok",
      free: "Free",
      fallback: "Live API unavailable — showing a static snapshot of well-known flagship models.",
      view: "View on OpenRouter →",
    },
    zh: {
      context: "上下文",
      prompt: "输入",
      completion: "输出",
      perM: "/百万Token",
      free: "免费",
      fallback: "实时接口暂不可用——以下为知名旗舰模型的静态快照。",
      view: "在 OpenRouter 查看 →",
    },
  }[LANG];

  const FALLBACK = [
    {
      id: "openai/gpt-4o",
      name: "GPT-4o",
      provider: "openai",
      description: "OpenAI's flagship multimodal model — fast, strong reasoning, native vision and audio.",
      context_length: 128000,
      pricing: { prompt: "0.0000025", completion: "0.00001" },
    },
    {
      id: "anthropic/claude-3.5-sonnet",
      name: "Claude 3.5 Sonnet",
      provider: "anthropic",
      description: "Anthropic's balanced flagship — top-tier coding, reasoning and long-context comprehension.",
      context_length: 200000,
      pricing: { prompt: "0.000003", completion: "0.000015" },
    },
    {
      id: "google/gemini-pro-1.5",
      name: "Gemini 1.5 Pro",
      provider: "google",
      description: "Google's long-context multimodal model with strong retrieval across huge documents.",
      context_length: 2000000,
      pricing: { prompt: "0.00000125", completion: "0.000005" },
    },
    {
      id: "x-ai/grok-2",
      name: "Grok 2",
      provider: "x-ai",
      description: "xAI's general-purpose model with real-time knowledge and strong reasoning.",
      context_length: 131072,
      pricing: { prompt: "0.000002", completion: "0.00001" },
    },
    {
      id: "deepseek/deepseek-chat",
      name: "DeepSeek V3",
      provider: "deepseek",
      description: "Open-weight MoE model with strong coding and math performance at low cost.",
      context_length: 64000,
      pricing: { prompt: "0.00000014", completion: "0.00000028" },
    },
    {
      id: "meta-llama/llama-3.1-405b-instruct",
      name: "Llama 3.1 405B Instruct",
      provider: "meta-llama",
      description: "Meta's largest open-weight model — strong general reasoning and instruction following.",
      context_length: 131072,
      pricing: { prompt: "0.0000027", completion: "0.0000027" },
    },
    {
      id: "mistralai/mistral-large",
      name: "Mistral Large",
      provider: "mistralai",
      description: "Mistral's flagship model — strong multilingual reasoning and function calling.",
      context_length: 128000,
      pricing: { prompt: "0.000002", completion: "0.000006" },
    },
    {
      id: "qwen/qwen-2.5-72b-instruct",
      name: "Qwen 2.5 72B Instruct",
      provider: "qwen",
      description: "Alibaba's open-weight flagship — strong multilingual and coding performance.",
      context_length: 131072,
      pricing: { prompt: "0.00000035", completion: "0.0000004" },
    },
  ];

  function providerOf(model) {
    return (model.id || "").split("/")[0] || "";
  }

  function fmtContext(n) {
    if (!n) return "—";
    if (n >= 1000000) return (n / 1000000).toFixed(n % 1000000 ? 1 : 0) + "M";
    if (n >= 1000) return Math.round(n / 1000) + "K";
    return String(n);
  }

  function fmtPrice(v) {
    const n = Number(v);
    if (!n) return T.free;
    return "$" + (n * 1000000).toFixed(2) + T.perM;
  }

  function pickPopular(models) {
    const byProvider = new Map();
    models.forEach((m) => {
      const p = providerOf(m);
      if (!PROVIDER_ORDER.includes(p)) return;
      const price = Number(m.pricing && m.pricing.prompt) || 0;
      const cur = byProvider.get(p);
      if (!cur || price > cur.__price) {
        m.__price = price;
        byProvider.set(p, m);
      }
    });
    return PROVIDER_ORDER
      .map((p) => byProvider.get(p))
      .filter(Boolean)
      .slice(0, MAX_CARDS);
  }

  function modelCard(m) {
    const a = document.createElement("a");
    a.className = "model-card";
    a.href = "https://openrouter.ai/" + (m.id || "");
    a.target = "_blank";
    a.rel = "noopener";

    const badge = document.createElement("div");
    badge.className = "model-provider";
    badge.textContent = providerOf(m) || "model";

    const name = document.createElement("div");
    name.className = "model-name";
    name.textContent = m.name || m.id;

    const desc = document.createElement("p");
    desc.className = "model-desc";
    desc.textContent = m.description
      ? (m.description.length > 140 ? m.description.slice(0, 137) + "…" : m.description)
      : "";

    const meta = document.createElement("div");
    meta.className = "model-meta";
    const price = m.pricing || {};
    meta.innerHTML =
      `<span>${T.context}: ${fmtContext(m.context_length)}</span>` +
      `<span>${T.prompt}: ${fmtPrice(price.prompt)}</span>` +
      `<span>${T.completion}: ${fmtPrice(price.completion)}</span>`;

    a.append(badge, name, desc, meta);
    return a;
  }

  function render(models, isFallback) {
    grid.innerHTML = "";
    pickPopular(models).forEach((m) => grid.appendChild(modelCard(m)));
    if (status) status.textContent = isFallback ? T.fallback : "";
    if (window.__initReveal) window.__initReveal(grid);
  }

  fetch(API)
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((data) => render(data && data.data ? data.data : [], false))
    .catch(() => render(FALLBACK, true));
})();
