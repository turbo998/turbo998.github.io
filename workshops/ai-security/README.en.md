# AI Security Lab (`turbo998/ai-security-lab`)

**Unified AI Security Research, Major Incident Postmortems, Agentic Red-vs-Blue Workbench & Interactive Visual Playground**  
*(Consolidated and expanded from `turbo998/agentic-red-team-lab`)*

[中文版 (`README.md`)](README.md) · [⭐ Guardrails vs. Zero-Trust Broker FAQ (`guardrails-vs-zero-trust-broker-selection-faq.en.md`)](research/offensive-defensive/guardrails-vs-zero-trust-broker-selection-faq.en.md) · [Interactive Playground (`playground/index.en.html`)](playground/index.en.html) · [7-Card 4:5 Benchmark Deck (`playground/benchmark-cards.en.html`)](playground/benchmark-cards.en.html) · [Business Scenario Playbook (`research/offensive-defensive/business-scenario-playbook.en.md`)](research/offensive-defensive/business-scenario-playbook.en.md) · [Live GitHub Pages (`turbo998.github.io/workshops/ai-security/`)](https://turbo998.github.io/workshops/ai-security/)

---

## Executive Visual Summary Card (2026-11-08)

![AI Solution Architect · 2026-11-08 Model-Level Guardrails vs. Zero-Trust Capability Broker Selection & First-Principles Defense Summary](docs/screenshots/executive-summary-2026-11-08.en.svg)

<details>
<summary>View Historical Executive Visual Summaries (2026-11-05, 2026-11-04, 2026-11-03, 2026-11-02 &amp; 2026-11-01)</summary>

![AI Solution Architect · 2026-11-05 OWASP AgBOM Pinning & RIFT-Bench Evolutionary Red-Teaming Summary](docs/screenshots/executive-summary-2026-11-05.en.svg)

![AI Solution Architect · 2026-11-04 MCPSHIELD Slopsquatting Gate & Multi-Agent Collusion Zero-Trust Summary](docs/screenshots/executive-summary-2026-11-04.en.svg)

![AI Solution Architect · 2026-11-03 DeepMind CaMeL & Cross-Tenant MCP Zero-Trust Summary](docs/screenshots/executive-summary-2026-11-03.en.svg)

![AI Solution Architect · 2026-11-02 ATTESTMCP & VPI-Bench Zero-Trust Executive Summary](docs/screenshots/executive-summary-2026-11-02.en.svg)

![AI Solution Architect · Zero-Trust & Agentic Security Executive Summary (2026-11-01)](docs/screenshots/executive-summary-2026-11-01.en.svg)

</details>

---

## Overview & Five Core AI Solution Architect Pillars

**AI Security Lab (`turbo998/ai-security-lab`)** unifies our local-first, evidence-driven **Multi-Agent Red Team Workbench (`apps/`, `packages/`)** with five structured AI Solution Architect research and engineering pillars:

| Pillar | Directory / Entry | Scope & Key Deliverables |
|---|---|---|
| **0. Daily Hottest Domain Breakthrough Tracking** | [`research/daily/`](research/daily/) · [`research/trends/`](research/trends/) | [2026-11-08 Bilingual Daily Report](research/daily/2026-11-08.md) · [2026-11-05 Report](research/daily/2026-11-05.md) · [2026-11-04 Report](research/daily/2026-11-04.md) · [2026-11-03 Report](research/daily/2026-11-03.md) · [2026-11-02 Report](research/daily/2026-11-02.md) · [2026-11-01 Report](research/daily/2026-11-01.md) & [2026 AI Security Landscape (EN)](research/trends/2026-ai-security-landscape.en.md) / [中文](research/trends/2026-ai-security-landscape.md): Plain-language first-principles analysis of **Shadow Agent Shared API Key Confused Deputy exploits**, **5-Tuple Action-Hash HITL Epoch Replay defenses**, **OWASP 2026 Agent Control Standard (`ACS`) & `AgBOM`**, **CSA/CISA 2026 MCP Encrypted Context Injection (`CVE-2025-6514`)**, **`RIFT-Bench` (`EMNLP 2026`)**, **`MCPSHIELD` (`arXiv:2604.05969`)**, and **Google DeepMind CaMeL (`arXiv:2503.18813`)**. |
| **1. Architecture Selection FAQ & Major Incident Deep Dives** | [`research/offensive-defensive/`](research/offensive-defensive/) · [`research/incidents/`](research/incidents/) | ⭐ [Model-Level Content Guardrails vs. Deterministic Zero-Trust Capability Broker Selection FAQ (EN)](research/offensive-defensive/guardrails-vs-zero-trust-broker-selection-faq.en.md) / [中文](research/offensive-defensive/guardrails-vs-zero-trust-broker-selection-faq.md) (modeled strictly on `ib-vs-ethernet-roce-selection-faq.md`: Executive Summary, 4 Q&As, 3 Mermaid diagrams, 6-dimension Architect Decision Matrix, 30-scenario benchmark, and 6-item Go-Live Checklist) & [Binance $6B-Scale Security Incident Deep Dive (EN)](research/incidents/binance-6b-incident-deep-dive.en.md) / [中文](research/incidents/binance-6b-incident-deep-dive.md). |
| **2. Interactive Demo & Workbench Development** | [`playground/`](playground/) · [`apps/web/`](apps/web/) | Self-contained, zero-external-dependency, CSP-locked 4-tab HTML5 simulator ([EN](playground/index.en.html) / [中文](playground/index.html)) covering the Binance $6B Kill-Chain Simulator, **16-Vector AI Pentest Arena** (including Shadow Agent Shared-Key Confused Deputy & 5-Tuple HITL Epoch Guard), 4-Layer Readiness Matrix, and 8-Scenario Business ROI Calculator. |
| **3. Reproducible Benchmark & 7-Card Evaluation** | [`tests/`](tests/) · [`research/evidence.json`](research/evidence.json) | **30 deterministic red-vs-blue scenarios** (27 adversarial + 3 benign baselines, **125/125 passing Pytest assertions**) cutting exploit ASR from **75.0% to 0.0%**, rendered as a **7-Card 4:5 Portrait Benchmark Deck** ([EN](playground/benchmark-cards.en.html) / [中文](playground/benchmark-cards.html)). |
| **4. Business Scenario & Solution Playbook** | [`research/offensive-defensive/`](research/offensive-defensive/) | [AI Solution Architect Business Scenario Playbook (EN)](research/offensive-defensive/business-scenario-playbook.en.md) / [中文](research/offensive-defensive/business-scenario-playbook.md) & [Agentic Pentesting & Guardrails (EN)](research/offensive-defensive/agentic-pentesting-and-guardrails.en.md) / [中文](research/offensive-defensive/agentic-pentesting-and-guardrails.md): 5-Gate selection decision tree, compliance crosswalk, ALE/ROI quantization (up to 213.6x, 190.8x, 178.5x, 164.2x & 153.4x ROI), and Good Fit vs. Not For boundaries across 8 industry verticals. |

---

## Repository Structure

```text
ai-security-lab/
├── research/                              # Structured research pillars & sealed benchmark evidence
│   ├── incidents/                         # Bilingual deep dive on the Binance $6B-scale security incident
│   ├── trends/                            # 2026 AI Security Landscape (OWASP Agentic / MITRE ATLAS / NIST)
│   ├── offensive-defensive/               # AI-driven pentesting, MCP/A2A exploits & deterministic guardrails
│   ├── daily/                             # Bilingual daily research logs (2026-11-01.md)
│   ├── evidence.json                      # Sealed evaluation metrics backing the 7-card report & playground
│   ├── sources.json                       # Verified standards, on-chain forensics & academic citations
│   ├── queue.json                         # Research backlog & deliverable mapping
│   └── progress.json                      # Milestone & bilingual coverage tracker
├── playground/                            # Self-contained, CSP-compliant interactive HTML5 deliverables
│   ├── index.html / index.en.html         # 3-Tab Interactive Playground (Binance $6B Simulator / Pentest / Matrix)
│   └── benchmark-cards.html / .en.html    # 7-Card 4:5 Portrait Benchmark Deck (zero fabricated coordinates)
├── apps/web/                              # React + Vite Multi-Agent Red Team Workbench UI
├── packages/server/                       # FastAPI + SQLite + Deterministic Policy Engine & Receipt Verifier
├── docs/                                  # Architecture, walkthroughs, Azure guides, screenshots & videos
├── scripts/                               # Windows bootstrap, demo launcher & validation scripts
└── tests/                                 # Pytest backend/regression suite & Playwright E2E tests
```

---

## Multi-Agent Red Team Workbench

A local-first, evidence-driven multi-agent safety demonstration. Two scenario
packs cover enterprise collaboration and a research-style agent network, complemented by interactive treasury and MCP security simulations in `playground/`.
Both include propagation, amplification, manufactured consensus and proxy chains.

## Run locally

Install Node.js 22+, Python 3.12 and uv, then run:

```powershell
git clone https://github.com/turbo998/ai-security-lab.git
Set-Location ai-security-lab
.\scripts\bootstrap.ps1
.\scripts\start-demo.ps1
```

Open `http://127.0.0.1:8000`. Docker and Azure credentials are not required for
Fixture mode. Initial dependency installation needs internet access. Runtime
data is local to the user rather than stored in the source repository.

The Python lockfile currently uses the [Tsinghua PyPI mirror](https://pypi.tuna.tsinghua.edu.cn/simple)
with locked artifact hashes. Official artifact downloads failed TLS negotiation
in the development environment; certificate validation was not disabled.
Allow this mirror under your organization's policy, or regenerate and validate
the lockfile against an approved index rather than rewriting its download URLs.

## Be explicit about evidence

- **Fixture:** synthetic decisions exercise the real local state machine,
  authorization policies and simulated tools. This is not an LLM benchmark.
- **Live:** requires separately configured Azure model access and approval.
  Missing configuration disables the mode; errors never silently become fixtures.
- **Replay:** displays recorded events with their original mode and provenance.
  It never invokes tools or creates a new attack-success sample.

The six-page workbench connects scenario configuration, workflow execution,
agent interaction graphs, tool receipts, source code, comparisons and reports.
Only synthetic assets are used. No arbitrary code execution, public target
scanning, real payments or customer-system connectors are provided.

Azure infrastructure is **preparation**, not proof of a deployed cloud service.
Local demo identities are not Entra identities. Never expose the local mode
directly to the public internet. See the [Azure guide](docs/azure-deployment.md).

See the [Chinese customer demo guide](docs/demo-guide.zh-CN.md) and
[code walkthrough](docs/code-walkthrough.md). Private repository and Release
links require explicit GitHub access; they are not public demo URLs.

## Recorded walkthrough

[Watch or download the 3:03.56 recording](docs/videos/local-fixture-walkthrough.webm)
with [chapters, Chinese captions and reproduction instructions](docs/videos/README.md).
The silent, continuous browser recording shows actual approvals, pause/step,
policy source, paired defenses and report replay. It is **local Fixture only**,
not evidence of an Azure deployment or live model evaluation. Azure deployment
remains blocked on target confirmation and appropriate access/persistence.

Research inspiration: [Microsoft Research, red-teaming a network of agents](https://www.microsoft.com/en-us/research/blog/red-teaming-a-network-of-agents-understanding-what-breaks-when-ai-agents-interact-at-scale/).
Original slides and private research material are not redistributed.
