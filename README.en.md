# Qi Chen (@turbo998) — AI Systems Builder, Frontier AI Studio & Technical Assets (English Edition)

> 🌐 **Language / 语言版本切换**: **[🇬🇧 English Homepage (README.en.md)](README.en.md)** | **[🇨🇳 中文主页 (README.zh-CN.md)](README.zh-CN.md)** | **[📘 Azure Agent Infra Playbook (English)](workshops/azure-agent-infra/README.en.md)** | **[📘 Azure Agent Infra Playbook (中文)](workshops/azure-agent-infra/README.md)**

Bilingual technical command center ([https://turbo998.github.io/](https://turbo998.github.io/)), **7-Track Frontier AI Studio** ([https://turbo998.github.io/frontier-ai-studio.html](https://turbo998.github.io/frontier-ai-studio.html)), **Sealed 7-Card 4:5 Benchmark Decks**, and interactive cloud architecture simulators maintained by **Qi Chen (@turbo998)**:

![Frontier AI Studio & Command Center Architecture](assets/command-center-architecture.svg)

## 📌 Executive Summary — 7-Track Frontier AI Studio

The site follows **Architecture → Comparisons → Demos → Detailed resources**.
The top-right `EN / 中文` switch preserves query parameters and section links.
Studio navigation is ordered **AI Infra, Agentic Commerce, Voice, Benchmarks &
Harness, Animation, Gaming, AI Security**, with a second-level scene directory
and four learning-stage jumps in every track. Share a scene with
`frontier-ai-studio.html?lang=en#infra/module/i-pill-2`; share a learning stage
with `#infra/stage-4`. Breadcrumbs lead back to the command center, while the
security landing zone also links back to its parent security column.

The production [Studio directory](studio/index.html) now links to seven independent
bilingual topic pages. The home page is a curated personal introduction, not the
complete archive. The [archive](studio/archive.html) preserves every baseline resource.
Dark Aurora styles (deep navy, localized blue-violet/cyan accents, explicit light option) live in `assets/editorial/`; reading and dedicated surfaces
have separate, scoped navigation. No portal embeds a complete HTML application.
Legacy `frontier-ai-studio.html` track, stage and module URLs remain compatibility entries.

Run `node scripts\build-site.cjs` to rebuild the production portal from the approved
static templates and frozen route inventory. Serve with `python -m http.server 8797`;
with Puppeteer available, run `node tests\site-structure.cjs` and
`node tests\production-routes.cjs`. Set `SITE_ARTIFACT_DIR` outside the repository
for screenshots and JSON evidence. These portal tests do not claim demo acceptance:
real dedicated smoke and all-page link/layout checks are separate.
See [migration, language policy, validation and release instructions](docs/redesign/production-migration.md).

| Track | Engineering Domain | Live Interactive Workbench | Sealed 7-Card 4:5 Benchmark Deck & Key Metrics |
| :--- | :--- | :--- | :--- |
| **Track 01** | **🏗️ Azure Agent Infra (Cycle #376 · 100K Sandboxes)** | [Playbook Atlas](https://turbo998.github.io/workshops/azure-agent-infra/index.html) · [AKSClaw×E2B Simulator](https://turbo998.github.io/workshops/azure-agent-infra/demo.html) · [100K Sizer & DR](https://turbo998.github.io/workshops/azure-agent-infra/selector.html) | [Agent Infra 7-Card Deck](https://turbo998.github.io/workshops/azure-agent-infra/cards.html) (384 Chapters · 377 IaC Blueprints · `108ms` P50 resume) |
| **Track 02** | **🛒 Agentic Commerce × Web IQ (Payment Rails & Grounding Selection FAQ)** | [Web IQ Live Grounding & Checkout Sandbox](https://turbo998.github.io/workshops/agentic-commerce/live-demo.en.html) · [Visual Summary SVG](https://turbo998.github.io/workshops/agentic-commerce/03-agentic-commerce-2026-11-08-visual-summary.svg) | [Agentic Commerce 7-Card Deck](https://turbo998.github.io/workshops/agentic-commerce/benchmark-cards.en.html) (`18/18` checkout · `12/12` injection block · 4,386 tests) |
| **Track 03** | **🎙️ Enterprise Voice Agent Lab (Stage 361)** | [Dual-Mode Voice Sandbox](https://turbo998.github.io/voice/index.html) · [48-Slide Deck](https://turbo998.github.io/voice/deck.html) · [Daily Breakthrough SVG](https://turbo998.github.io/voice/05-daily-breakthrough-2026-11-08.svg) | [Voice Agent 7-Card Deck](https://turbo998.github.io/voice/benchmark-cards.html) (Stage 361 · P715/P716 · 364 dims · 725 guardrails) |
| **Track 04** | **📊 7-Card Benchmarks & AI Infra (Phase 183)** | [Benchmark Reports Column](https://turbo998.github.io/benchmarks.html) · [Microsoft Discovery & CLIO Industry Harness Workbench](https://turbo998.github.io/workshops/scientific-and-industry-harness-engineering/index.html) · [FAF vs AGENT-FORGE vs HVE-Core Arena](https://turbo998.github.io/workshops/faf-vs-agent-forge/index.html) | [CLIO & Calibrated Deference 7-Card](https://turbo998.github.io/workshops/benchmarks/clio-industry-harness-cards.en.html) · [Supp 8 MI300X Large MoE BF16/MXFP4](https://turbo998.github.io/workshops/benchmarks/mi300x-large-moe-bf16-mxfp4-cards.en.html) · [Supp 7 AIPC Kev SFT & Q8_0 GGUF](https://turbo998.github.io/workshops/benchmarks/aipc-kev-sft-q8-gguf-cards.en.html) · [Phase 183 AI Infra 7-Card](https://turbo998.github.io/workshops/benchmarks/ai-infra-phase183-benchmark-cards.html) · [Supp 6 Gemini 4 Carbon](https://turbo998.github.io/workshops/benchmarks/gemini-4-carbon-cards.html) · [Supp 5 19-Model+SKY-001](https://turbo998.github.io/workshops/benchmarks/sky-001-cards.html) · [Supp 4 Sonnet 5.5+Sol](https://turbo998.github.io/workshops/benchmarks/coding-17-sonnet55-sol-cards.html) · [Decision-1 Routing](https://turbo998.github.io/workshops/benchmarks/decision-1-cards.html) · Phase 183 (`3,809` sources · `560` suites · `186` 7-Card decks) |
| **Track 05** | **🎨 Coding Animation (Stage 466 · 4 Live Demos)** | [Dunhuang Feitian · Astra Mars · SpaceX Launch · 🚲 Pelican Bicycle Arena](https://turbo998.github.io/animation/index.html) · [Pelican 3-Way Arena](https://turbo998.github.io/animation/demos/pelican-bicycle-arena/index.html) | Stage 466 (`522` curated works · `55/55` E2E green · Pelican Bicycle `HVE-Core 93.4` vs `AF 91.8` vs `FAF 90.5` + [7-Card Report](https://turbo998.github.io/animation/demos/pelican-bicycle-arena/test-report-cards.html)) |
| **Track 06** | **🎮 HVE Rapid Game Prototyping** | [Wanan 1999 Midnight Diner & Scrap Swarm](https://turbo998.github.io/game/index.html) | 60 FPS Spatial-Hash Roguelite + WebAudio Synthesizer Single-File Closures |
| **Track 07** | **🛡️ AI Security, Security AI Landing Zone & Multi-Agent Red Team** | [AI Security Visual Report Center](https://turbo998.github.io/ai-security.html) · [Sub-Column: Security AI Landing Zone](https://turbo998.github.io/security-ai-landing-zone.html) · [Binance $6B Kill-Chain Simulator](https://turbo998.github.io/workshops/ai-security/index.en.html) | [Landing Zone 7-Card](https://turbo998.github.io/workshops/ai-security/landing-zone-cards.html) · [DEFEND & SMB Toolkit 7-Card](https://turbo998.github.io/workshops/ai-security/defend-cards.html) · [6-Track Panorama 7-Card](https://turbo998.github.io/workshops/ai-security/cards.html) · [AI Security Lab 7-Card](https://turbo998.github.io/workshops/ai-security/benchmark-cards.en.html) |
| **Track 08** | **📡 Proactive Durable News & GitHub AI Trending Radar (Every Night 23:00 CST)** | [English Interactive Radar Desk](https://turbo998.github.io/github-radar.html) · [中文雷达面板](https://turbo998.github.io/zh-github-radar.html) · [Deep Research Report (EN/ZH)](workshops/github-trending-radar/README.en.md) · [2026-11-05 Daily Digest](workshops/github-trending-radar/daily/2026-11-05.en.md) | [GitHub AI Radar 7-Card Deck (EN)](https://turbo998.github.io/workshops/github-trending-radar/cards.en.html) · [中文 7-Card 报告](https://turbo998.github.io/workshops/github-trending-radar/cards.html) · [Visual Summary SVG](workshops/github-trending-radar/summary-2026-11-05.svg) (Pi-Durable × Jev HFS 6-Gate Pipeline · Top 15 AI Repos P0–P3 Verdicts) |

## Featured Playbooks & Repositories

- **[Coding Animation Column & Pelican Riding a Bicycle Showcase (Stage 466)](https://turbo998.github.io/animation/index.html)** · **[🚲 Pelican Riding a Bicycle 3-Way Arena](https://turbo998.github.io/animation/demos/pelican-bicycle-arena/index.html)** · **[HVE-Core Pelican 93.4](https://turbo998.github.io/animation/demos/pelican-bicycle-arena/demo-hve-pelican.html)** · **[Pelican 7-Card Report](https://turbo998.github.io/animation/demos/pelican-bicycle-arena/test-report-cards.html)** (`522` curated works, `4` live browser animations, Blender 4.5 LTS MCP normal/relief/GLB assets, `55/55` checks passing).
- **[AI Agent Infrastructure on Azure Playbook (English Edition)](workshops/azure-agent-infra/README.en.md)** · **[中文完整版](workshops/azure-agent-infra/README.md)** (`384` chapters, `377` production IaC blueprints, `376` deterministic simulators, `385/385` unit tests, 8 verified SVG diagrams, [English 7-Card Benchmark Report](workshops/azure-agent-infra/test-report.en.md), and [4-Page Bilingual H5 Suite](https://turbo998.github.io/workshops/azure-agent-infra/index.html)).
- **[Unified Builder Profile, Career Timeline & Certifications](https://turbo998.github.io/about.html)** · **[关于我（整合页）](https://turbo998.github.io/zh-about.html)**.
- **[Writing, Technical Reports & Benchmark Decks](https://turbo998.github.io/writing.html)** · **[分享与著作](https://turbo998.github.io/zh-writing.html)**.
