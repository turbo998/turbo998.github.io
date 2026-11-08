# AI Security Lab (`turbo998/ai-security-lab`)

**Unified AI Security Research, Major Incident Postmortems, Agentic Red-vs-Blue Workbench & Interactive Visual Playground**  
*(Consolidated and expanded from `turbo998/agentic-red-team-lab`)*

[中文版 (`README.md`)](README.md) · [⭐ FAQ 1: Guardrails vs. Zero-Trust Broker (`guardrails-vs-zero-trust-broker-selection-faq.en.md`)](research/offensive-defensive/guardrails-vs-zero-trust-broker-selection-faq.en.md) · [⭐ FAQ 2: MCP Tool Poisoning & Pinning (`mcp-tool-poisoning-and-pinning-selection-faq.en.md`)](research/offensive-defensive/mcp-tool-poisoning-and-pinning-selection-faq.en.md) · [⭐ FAQ 3: A2A OBO Token Downscoping vs. Shared Keys (`a2a-obo-token-downscoping-vs-shared-credentials-faq.en.md`)](research/offensive-defensive/a2a-obo-token-downscoping-vs-shared-credentials-faq.en.md) · [⭐ FAQ 4: Coding Agent Sandboxing Docker vs. gVisor vs. MicroVM (`agent-sandbox-docker-gvisor-microvm-selection-faq.en.md`)](research/offensive-defensive/agent-sandbox-docker-gvisor-microvm-selection-faq.en.md) · [⭐ FAQ 5: Enterprise RAG/GraphRAG Vector Pre-Filter ACL (`rag-indirect-injection-and-vector-acl-selection-faq.en.md`)](research/offensive-defensive/rag-indirect-injection-and-vector-acl-selection-faq.en.md) · [⭐ FAQ 6: CUA Browser Visual Injection & Cross-Origin Guard (`cua-browser-agent-visual-injection-selection-faq.en.md`)](research/offensive-defensive/cua-browser-agent-visual-injection-selection-faq.en.md) · [⭐ FAQ 7: Agent Memory Poisoning MemoryGraft & Provenance Quarantine (`agent-memory-poisoning-and-isolation-selection-faq.en.md`)](research/offensive-defensive/agent-memory-poisoning-and-isolation-selection-faq.en.md) · [⭐ FAQ 8: Voice/Realtime Acoustic Injection & Out-of-Band FIDO2 (`voice-realtime-agent-acoustic-injection-selection-faq.en.md`)](research/offensive-defensive/voice-realtime-agent-acoustic-injection-selection-faq.en.md) · [⭐ FAQ 9: Text-to-SQL / BI Agent Native RLS & AST Gate (`text-to-sql-bi-agent-rls-and-ast-gate-selection-faq.en.md`)](research/offensive-defensive/text-to-sql-bi-agent-rls-and-ast-gate-selection-faq.en.md) · [⭐ FAQ 10: AI Gateway Prompt Cache Isolation & Anti-Downgrade Gate (`ai-gateway-prompt-cache-isolation-and-fallback-selection-faq.en.md`)](research/offensive-defensive/ai-gateway-prompt-cache-isolation-and-fallback-selection-faq.en.md) · [⭐ FAQ 11: LoRA/DPO Sleeper Backdoors & Model Provenance (`lora-dpo-finetuning-backdoor-and-model-provenance-faq.en.md`)](research/offensive-defensive/lora-dpo-finetuning-backdoor-and-model-provenance-faq.en.md) · [Interactive Playground (`playground/index.en.html`)](playground/index.en.html) · [7-Card 4:5 Benchmark Deck (`playground/benchmark-cards.en.html`)](playground/benchmark-cards.en.html) · [Business Scenario Playbook (`research/offensive-defensive/business-scenario-playbook.en.md`)](research/offensive-defensive/business-scenario-playbook.en.md) · [Live GitHub Pages (`turbo998.github.io/workshops/ai-security/`)](https://turbo998.github.io/workshops/ai-security/)

---

## Executive Visual Summary Card (2026-11-08)

![AI Solution Architect · 2026-11-08 Model-Level Guardrails vs. Zero-Trust Capability Broker Selection & First-Principles Defense Summary](docs/screenshots/executive-summary-2026-11-08.en.svg)

![AI Solution Architect · 2026-11-08 Round 2 MCP Tool Poisoning, Dynamic Rug-Pulls & Manifest Pinning vs. Runtime Sandbox Summary](docs/screenshots/mcp-tool-poisoning-pinning-faq-2026-11-08.en.svg)

![AI Solution Architect · 2026-11-08 Round 3 Cross-Agent A2A Identity Spoofing & OBO Token Downscoping vs. Shared Credentials Summary](docs/screenshots/a2a-obo-token-downscoping-faq-2026-11-08.en.svg)

![AI Solution Architect · 2026-11-08 Round 4 Coding Agent Sandbox Isolation: Docker vs. gVisor vs. Firecracker MicroVM vs. Hardware TEE Summary](docs/screenshots/agent-sandbox-isolation-faq-2026-11-08.en.svg)

![AI Solution Architect · 2026-11-08 Round 5 Enterprise RAG / GraphRAG Indirect Prompt Injection & Vector Pre-Filter Security Trimming Summary](docs/screenshots/rag-vector-acl-isolation-faq-2026-11-08.en.svg)

![AI Solution Architect · 2026-11-08 Round 6 Computer-Use / Browser-Use Agent (CUA) Visual Prompt Injection, DOM Cloaking & Cross-Origin Action Confirmation Summary](docs/screenshots/cua-browser-visual-injection-faq-2026-11-08.en.svg)

![AI Solution Architect · 2026-11-08 Round 7 Agent Long-Term Memory Poisoning (MemoryGraft) & Cross-Session Provenance Quarantine Summary](docs/screenshots/agent-memory-poisoning-faq-2026-11-08.en.svg)

![AI Solution Architect · 2026-11-08 Round 8 Multimodal Voice & Realtime Agent Acoustic Injection & Out-of-Band FIDO2 Summary](docs/screenshots/voice-realtime-acoustic-injection-faq-2026-11-08.en.svg)

![AI Solution Architect · 2026-11-08 Round 9 Text-to-SQL & Enterprise BI Agent Native RLS & Read-Only AST Compiler Summary](docs/screenshots/text-to-sql-rls-ast-faq-2026-11-08.en.svg)

![AI Solution Architect · 2026-11-08 Round 10 Enterprise AI Gateway Prompt Cache Isolation, Log Poisoning & Fallback Anti-Downgrade Summary](docs/screenshots/ai-gateway-cache-fallback-faq-2026-11-08.en.svg)

![AI Solution Architect · 2026-11-08 Round 11 Fine-Tuning, Distillation & DPO Sleeper Backdoors vs. Safetensors + Activation Canary Probes + Runtime Zero-Trust Broker Summary](docs/screenshots/lora-dpo-backdoor-provenance-faq-2026-11-08.en.svg)

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
| **1. Architecture Selection FAQ & Major Incident Deep Dives** | [`research/offensive-defensive/`](research/offensive-defensive/) · [`research/incidents/`](research/incidents/) | ⭐ **Round 1 FAQ**: [Model-Level Content Guardrails vs. Deterministic Zero-Trust Capability Broker Selection FAQ (EN)](research/offensive-defensive/guardrails-vs-zero-trust-broker-selection-faq.en.md) / [中文](research/offensive-defensive/guardrails-vs-zero-trust-broker-selection-faq.md); ⭐ **Round 2 FAQ**: [MCP Server Tool Poisoning, Dynamic Rug-Pulls & Manifest Pinning vs. Runtime Sandbox Selection FAQ (EN)](research/offensive-defensive/mcp-tool-poisoning-and-pinning-selection-faq.en.md) / [中文](research/offensive-defensive/mcp-tool-poisoning-and-pinning-selection-faq.md); ⭐ **Round 3 FAQ**: [Cross-Agent A2A Identity Spoofing & OBO Token Downscoping vs. Shared Static Credentials Selection FAQ (EN)](research/offensive-defensive/a2a-obo-token-downscoping-vs-shared-credentials-faq.en.md) / [中文](research/offensive-defensive/a2a-obo-token-downscoping-vs-shared-credentials-faq.md); ⭐ **Round 4 FAQ**: [Coding Agent Sandbox Isolation: Docker vs. gVisor vs. Firecracker MicroVM vs. Hardware TEE Selection FAQ (EN)](research/offensive-defensive/agent-sandbox-docker-gvisor-microvm-selection-faq.en.md) / [中文](research/offensive-defensive/agent-sandbox-docker-gvisor-microvm-selection-faq.md); ⭐ **Round 5 FAQ**: [Enterprise RAG / GraphRAG Indirect Prompt Injection & Cross-Tenant Vector ACL Pre-Filter Security Trimming Selection FAQ (EN)](research/offensive-defensive/rag-indirect-injection-and-vector-acl-selection-faq.en.md) / [中文](research/offensive-defensive/rag-indirect-injection-and-vector-acl-selection-faq.md); ⭐ **Round 6 FAQ**: [Computer-Use / Browser-Use Agent (CUA) Visual Prompt Injection, DOM Cloaking & Cross-Origin Action Confirmation Selection FAQ (EN)](research/offensive-defensive/cua-browser-agent-visual-injection-selection-faq.en.md) / [中文](research/offensive-defensive/cua-browser-agent-visual-injection-selection-faq.md); ⭐ **Round 7 FAQ**: [Agent Long-Term Memory Poisoning (MemoryGraft) & Cross-Session State Quarantine Selection FAQ (EN)](research/offensive-defensive/agent-memory-poisoning-and-isolation-selection-faq.en.md) / [中文](research/offensive-defensive/agent-memory-poisoning-and-isolation-selection-faq.md); ⭐ **Round 8 FAQ**: [Multimodal Voice & Realtime Audio-Video Agent Acoustic Prompt Injection & Deepfake Spoofing vs. Out-of-Band FIDO2 Selection FAQ (EN)](research/offensive-defensive/voice-realtime-agent-acoustic-injection-selection-faq.en.md) / [中文](research/offensive-defensive/voice-realtime-agent-acoustic-injection-selection-faq.md); ⭐ **Round 9 FAQ**: [Text-to-SQL & Enterprise BI Analytics Agent Prompt-Level Filtering & Second-Order Cell Injection vs. Native DB RLS & Read-Only AST Compiler Selection FAQ (EN)](research/offensive-defensive/text-to-sql-bi-agent-rls-and-ast-gate-selection-faq.en.md) / [中文](research/offensive-defensive/text-to-sql-bi-agent-rls-and-ast-gate-selection-faq.md); ⭐ **Round 10 FAQ**: [Enterprise AI Gateway Prompt Cache Cross-Tenant Side-Channels, Log Poisoning & Fallback Downgrade Jailbreaks vs. Tenant HMAC Cache Isolation + Policy-Invariant Gateway Selection FAQ (EN)](research/offensive-defensive/ai-gateway-prompt-cache-isolation-and-fallback-selection-faq.en.md) / [中文](research/offensive-defensive/ai-gateway-prompt-cache-isolation-and-fallback-selection-faq.md); ⭐ **Round 11 FAQ**: [Fine-Tuning, Distillation & DPO Sleeper Backdoors & Pickle RCE vs. Safetensors + Activation Canary Probes + Runtime Zero-Trust Capability Broker Selection FAQ (EN)](research/offensive-defensive/lora-dpo-finetuning-backdoor-and-model-provenance-faq.en.md) / [中文](research/offensive-defensive/lora-dpo-finetuning-backdoor-and-model-provenance-faq.md) (all modeled strictly on `ib-vs-ethernet-roce-selection-faq.md`), plus [Binance $6B-Scale Security Incident Deep Dive (EN)](research/incidents/binance-6b-incident-deep-dive.en.md) / [中文](research/incidents/binance-6b-incident-deep-dive.md). |
| **2. Interactive Demo & Workbench Development** | [`playground/`](playground/) · [`apps/web/`](apps/web/) | Self-contained, zero-external-dependency, CSP-locked 4-tab HTML5 simulator ([EN](playground/index.en.html) / [中文](playground/index.html)) covering the Binance $6B Kill-Chain Simulator, **36-Vector AI Pentest Arena** (including Shadow Agent Confused Deputy, 5-Tuple HITL Epoch Guard, MCP Cross-Server Tool Shadowing, Dynamic Rug-Pull Pinning, A2A OBO Scope Intersection, Agent Card JWS Pinning, Coding Agent `.git/hooks` Workspace Escape Guard, `169.254.169.254` Cloud IMDS SSRF Block, Enterprise RAG Vector Pre-Filter Trimming, GraphRAG Community Summary High-Water-Mark Taint Gate, Browser CUA DOM Zero-Font Cloaking Guard, CUA Visual Popup Spoofing Block, Agent Episodic MemoryGraft Cross-Session Hijack Block, Cross-Principal Shared Memory Pool Secret Leak Quarantine, Support Voicemail 2.5x Acoustic Injection Block, Deepfake Real-Time Voice Spoofing Out-of-Band FIDO2 Gate, Text-to-SQL Prompt WHERE Bypass Block, Second-Order DB Table-Cell Injection Block, AI Gateway HTTP 429 Fallback Downgrade & Cache Isolation Block, Gateway Telemetry Log Poisoning Block, LoRA/DPO Sleeper Trigger Activation Block, and Poisoned Distillation Adapter Cross-Owner Exfil Block), 4-Layer Readiness Matrix, and 8-Scenario Business ROI Calculator. |
| **3. Reproducible Benchmark & 7-Card Evaluation** | [`tests/`](tests/) · [`research/evidence.json`](research/evidence.json) | **50 deterministic red-vs-blue synthetic fixture scenarios** (47 adversarial + 3 benign baselines, **166/166 passing Pytest assertions**) cutting fixture exploit ASR from **75.0% to 0.0%** (backed by `scripts/measure_broker_latencies.py` & sealed full raw sample arrays `research/latency-samples-2026-11-08.json`: `measured` local in-memory `digest+Broker.evaluate` `n=200` full raw array P50=`0.0248ms`, 1-step w/ SQLite WAL receipt commit `n=50` P50=`7.21ms` on `Windows 11 ARM64 / Python 3.12.10`), rendered as a **7-Card 4:5 Portrait Benchmark Deck** ([EN](playground/benchmark-cards.en.html) / [中文](playground/benchmark-cards.html)). |
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
