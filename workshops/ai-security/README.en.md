# Enterprise AI & Agent Security Lab (`turbo998/ai-security-lab`)

> 🌐 **Language / 语言切换**: **[中文 (`README.md`)](README.md)** | **English (Current)**
> 🎮 **Interactive Simulators & Benchmark Deck**: **[Interactive AI Security Playground (`playground/index.en.html`)](playground/index.en.html)** · **[7-Card 4:5 Benchmark Deck (`playground/benchmark-cards.en.html`)](playground/benchmark-cards.en.html)**

An end-to-end **Enterprise AI & Agentic Security Engineering Workbench and Reference Architecture Repository** built from the perspective of a **Cloud & AI Solution Architect**. It combines a reproducible **Multi-Agent Red Team Workbench (`apps/api` + `apps/web`)**, a sub-millisecond **Zero-Trust Capability Broker**, an interactive **$6B-scale Treasury Kill-Chain Simulator**, and **138 bilingual (`en` / `zh-CN`) Enterprise AI Security Architecture & Cloud Product Selection Guides (Round 320 · 320-FAQ Milestone)**.

---

## Architectural Thesis

The most common failure mode in enterprise LLM and multi-agent deployments (`MCP`, `A2A`, `RAG`, `CUA`, `Text-to-SQL`) is **treating probabilistic prompt instructions or standalone text classifiers as authorization boundaries**. Published benchmarks demonstrate non-trivial bypass rates when indirect prompt injections are disguised inside legitimate business documents or multi-hop Confused Deputy workflows. By pairing semantic input/output guardrails with a deterministic server-side **Zero-Trust Capability Broker**—enforcing principal delegation chains, data taint quarantine, asset ownership, 5-tuple `Action-Hash` human approvals, and outbound Canary guards—exploit paths are blocked deterministically before side effects execute:

| Verification Dimension | Verified Result | Data Provenance & Measurement Scope |
|---|---|---|
| **Deterministic Red-vs-Blue Benchmark** | Baseline `75.0% ASR` $\rightarrow$ Hardened **`0.0% ASR` (`-75.0 pts`)** | `synthetic` (`668` enterprise scenarios: `665` adversarial fixtures + `3` benign baselines) |
| **Benign Completion / False-Positive Rate** | **`100.0%` Completion / `0.0%` False Blocks** | `synthetic` (`666 / 666` passing Pytest checks across `tests/` · `1,402` deterministic assertions) |
| **In-Memory Policy Gate (`Broker.evaluate`)** | **`P50 = 0.0248 ms` / `P95 = 0.0409 ms`** (`33,493 ops/s`) | `measured` (`n=200` raw samples sealed in `research/latency-samples-2026-11-08.json`) |
| **1-Step Gate + SQLite WAL Receipt Commit** | **`P50 = 7.21 ms` / `P95 = 8.19 ms`** | `measured` (`n=50` raw samples via `scripts/measure_broker_latencies.py`) |
| **$6B-Scale Treasury & Bridge Kill-Chain Sim** | Baseline `$1.42B` simulated drain $\rightarrow$ Hardened **`$0` loss (`14 ms` breaker)** | `synthetic` ([Binance-Scale Kill-Chain Deep Dive](research/incidents/binance-6b-incident-deep-dive.en.md) + `playground/index.en.html`) |

---

## Enterprise 6-Layer Zero-Trust Visual Blueprints

![Chief AI Solution Architect 6-Layer Zero-Trust Reference Blueprint](docs/screenshots/chief-architect-enterprise-ai-security-blueprint-faq-2026-11-18.en.svg)

![CISO Boardroom AI Governance, EU AI Act / ISO 42001 & ROI Blueprint](docs/screenshots/ciso-ai-governance-eu-ai-act-roi-faq-2026-11-18.en.svg)

---

## Repository Structure

| Path | Solution Architect Scope & Key Deliverables |
|---|---|
| [`apps/api/`](apps/api/) & [`apps/web/`](apps/web/) | **Multi-Agent Red Team Workbench**: FastAPI deterministic state machine, Zero-Trust `Capability Broker` (`apps/api/redteam/broker.py`), Canary exfiltration detector, and 6-page React + TypeScript forensic console. |
| [`playground/`](playground/) | **Zero-Dependency Self-Contained HTML5 Simulators** (`CSP: default-src 'none'`): [Interactive Security Playground (EN)](playground/index.en.html) / [中文](playground/index.html) (`$6B` 6-stage kill-chain replay, `654` enterprise red-vs-blue vectors, 4-layer defense matrix, ALE risk ROI calculator) and [7-Card 4:5 Benchmark Deck (EN)](playground/benchmark-cards.en.html) / [中文](playground/benchmark-cards.html). |
| [`research/offensive-defensive/`](research/offensive-defensive/) | **138 Bilingual Enterprise AI Security Architecture & Product Selection Guides (Round 320)** (Executive Summary, Architect Q&A, Mermaid blueprints, head-to-head cloud/OSS product comparison matrices, broker policy mappings, and production checklists). |
| [`research/trends/`](research/trends/) & [`research/incidents/`](research/incidents/) | [2026 Enterprise AI & Agentic Security Landscape (EN)](research/trends/2026-ai-security-landscape.en.md) / [中文](research/trends/2026-ai-security-landscape.md) and [$6B-Scale Treasury & Bridge Kill-Chain Deep Dive (EN)](research/incidents/binance-6b-incident-deep-dive.en.md) / [中文](research/incidents/binance-6b-incident-deep-dive.md). |
| [`research/daily/`](research/daily/) & [`research/evidence.json`](research/evidence.json) | Curated architecture research logs ([2026-11-18](research/daily/2026-11-18.md) · [2026-11-09](research/daily/2026-11-09.md) · [2026-11-08](research/daily/2026-11-08.md) · [2026-11-05](research/daily/2026-11-05.md) · [2026-11-04](research/daily/2026-11-04.md) · [2026-11-03](research/daily/2026-11-03.md) · [2026-11-02](research/daily/2026-11-02.md) · [2026-11-01](research/daily/2026-11-01.md)) and sealed benchmark evidence manifest. |
| [`tests/`](tests/) & [`scripts/`](scripts/) | `666` automated Pytest checks (`1,402` deterministic policy assertions, `tests/test_backend.py` + `tests/test_regressions.py`), latency micro-benchmark (`scripts/measure_broker_latencies.py`), and publication hygiene auditor (`scripts/audit-publication.py`). |

---

## Enterprise AI Security Architecture & Product Selection Catalog (138 Bilingual Guides · Round 320)

Every guide is authored from an **Enterprise Cloud & AI Solution Architect** perspective—comparing Azure, AWS, GCP, Databricks, Snowflake, and leading open-source security stacks with 100% English and Chinese parity:

### 1. Master Blueprints, CISO Governance & AI Red-Teaming CI/CD

| Architectural Focus & Product Comparison Scope | English Guide | 中文指南 |
|---|---|---|
| **Chief AI Architect 6-Layer Zero-Trust Reference Blueprint & Stack Matrix** | [English](research/offensive-defensive/chief-architect-enterprise-ai-security-6layer-reference-blueprint-faq.en.md) | [中文全文](research/offensive-defensive/chief-architect-enterprise-ai-security-6layer-reference-blueprint-faq.md) |
| **Boardroom AI Governance, EU AI Act / ISO 42001 / NIST AI RMF, AgBOM & ROI** | [English](research/offensive-defensive/ciso-ai-governance-eu-ai-act-iso42001-roi-selection-faq.en.md) | [中文全文](research/offensive-defensive/ciso-ai-governance-eu-ai-act-iso42001-roi-selection-faq.md) |
| **Enterprise AI Liability & Cyber Insurance (Munich Re aiSure / Lloyd's): WAL Receipts** | [English](research/offensive-defensive/enterprise-ai-cyber-insurance-underwriting-liability-selection-faq.en.md) | [中文全文](research/offensive-defensive/enterprise-ai-cyber-insurance-underwriting-liability-selection-faq.md) |
| **8 Enterprise Business Scenario Security Architecture Playbooks & ALE Models** | [English](research/offensive-defensive/business-scenario-playbook.en.md) | [中文全文](research/offensive-defensive/business-scenario-playbook.md) |
| **Agentic AI Pentesting Methodology, Threat Taxonomy & Guardrail Engineering** | [English](research/offensive-defensive/agentic-pentesting-and-guardrails.en.md) | [中文全文](research/offensive-defensive/agentic-pentesting-and-guardrails.md) |
| **AI Red-Teaming & CI/CD Gate: Azure PyRIT vs. Promptfoo vs. Garak vs. Inspect AI** | [English](research/offensive-defensive/pyrit-foundry-vs-promptfoo-garak-inspect-ai-redteam-cicd-faq.en.md) | [中文全文](research/offensive-defensive/pyrit-foundry-vs-promptfoo-garak-inspect-ai-redteam-cicd-faq.md) |
| **Defeating LLM-as-a-Judge Reward Hacking with Deterministic State-Receipt Verifiers** | [English](research/offensive-defensive/agent-evaluation-benchmark-gaming-and-reward-hacking-defense-faq.en.md) | [中文全文](research/offensive-defensive/agent-evaluation-benchmark-gaming-and-reward-hacking-defense-faq.md) |
| **Compromised Agent Kill-Switch: Microsoft Sentinel + Entra CAE + Epoch Fencing** | [English](research/offensive-defensive/ai-incident-response-killswitch-sentinel-epoch-fencing-faq.en.md) | [中文全文](research/offensive-defensive/ai-incident-response-killswitch-sentinel-epoch-fencing-faq.md) |

### 2. LLM Guardrails, AI Gateways, FinOps DoW & Model I/O Validation

| Architectural Focus & Product Comparison Scope | English Guide | 中文指南 |
|---|---|---|
| **LLM Guardrails: Azure Prompt Shields vs. Bedrock vs. NeMo vs. Lakera vs. Llama Guard** | [English](research/offensive-defensive/llm-guardrails-azure-bedrock-nemo-lakera-llamaguard-selection-faq.en.md) | [中文全文](research/offensive-defensive/llm-guardrails-azure-bedrock-nemo-lakera-llamaguard-selection-faq.md) |
| **Probabilistic Model Guardrails vs. Server-Side Zero-Trust Capability Broker** | [English](research/offensive-defensive/guardrails-vs-zero-trust-broker-selection-faq.en.md) | [中文全文](research/offensive-defensive/guardrails-vs-zero-trust-broker-selection-faq.md) |
| **Enterprise AI Gateways: Azure APIM GenAI Gateway vs. Kong AI vs. LiteLLM vs. Portkey** | [English](research/offensive-defensive/enterprise-ai-gateway-apim-kong-litellm-portkey-selection-faq.en.md) | [中文全文](research/offensive-defensive/enterprise-ai-gateway-apim-kong-litellm-portkey-selection-faq.md) |
| **AI Gateway Tenant Prompt-Cache HMAC Isolation & Anti-Downgrade Routing** | [English](research/offensive-defensive/ai-gateway-prompt-cache-isolation-and-fallback-selection-faq.en.md) | [中文全文](research/offensive-defensive/ai-gateway-prompt-cache-isolation-and-fallback-selection-faq.md) |
| **AI FinOps Anti-Denial-of-Wallet: PTU + Capped PayGo Spillover & Token Breakers** | [English](research/offensive-defensive/ai-finops-denial-of-wallet-ptu-paygo-token-breaker-faq.en.md) | [中文全文](research/offensive-defensive/ai-finops-denial-of-wallet-ptu-paygo-token-breaker-faq.md) |
| **Enterprise Cloud FinOps & RI Purchasing: Read-Only FOCUS + `CanNotDelete` DR Lock** | [English](research/offensive-defensive/cloud-finops-cost-optimization-ri-purchasing-agent-security-selection-faq.en.md) | [中文全文](research/offensive-defensive/cloud-finops-cost-optimization-ri-purchasing-agent-security-selection-faq.md) |
| **Multi-Agent Recursive Fan-Out Storms & State-Transition Loop Circuit Breakers** | [English](research/offensive-defensive/agent-denial-of-wallet-and-recursive-fanout-breaker-faq.en.md) | [中文全文](research/offensive-defensive/agent-denial-of-wallet-and-recursive-fanout-breaker-faq.md) |
| **Structured Outputs Security: Constrained Decoding + Pydantic v2 Duplicate-Key Guard** | [English](research/offensive-defensive/structured-outputs-json-schema-pydantic-security-selection-faq.en.md) | [中文全文](research/offensive-defensive/structured-outputs-json-schema-pydantic-security-selection-faq.md) |
| **Polymorphic `anyOf` Branch Hijack Defense & Pre-Inference Dynamic Schema Pruning** | [English](research/offensive-defensive/structured-output-json-schema-smuggling-and-ast-validation-faq.en.md) | [中文全文](research/offensive-defensive/structured-output-json-schema-smuggling-and-ast-validation-faq.md) |
| **Reasoning Model CoT Stripping & Pre-Inference Format-Preserving Tokenization** | [English](research/offensive-defensive/agent-reasoning-trace-cot-leakage-and-redaction-faq.en.md) | [中文全文](research/offensive-defensive/agent-reasoning-trace-cot-leakage-and-redaction-faq.md) |
| **Multi-Agent Frameworks: Microsoft Agent Framework (AutoGen+SK) vs. LangGraph vs. CrewAI** | [English](research/offensive-defensive/multi-agent-framework-autogen-sk-langgraph-crewai-security-selection-faq.en.md) | [中文全文](research/offensive-defensive/multi-agent-framework-autogen-sk-langgraph-crewai-security-selection-faq.md) |

### 3. Agent Identity (Entra Agent ID / NHI), A2A Delegation & MCP Governance

| Architectural Focus & Product Comparison Scope | English Guide | 中文指南 |
|---|---|---|
| **Agent Identity & Delegation: Microsoft Entra Agent ID + OBO vs. Managed Identity + HITL** | [English](research/offensive-defensive/entra-agent-id-obo-vs-managed-identity-hitl-selection-faq.en.md) | [中文全文](research/offensive-defensive/entra-agent-id-obo-vs-managed-identity-hitl-selection-faq.md) |
| **Cross-Agent A2A OBO Token Downscoping vs. Shared Credentials & Confused Deputy Defense** | [English](research/offensive-defensive/a2a-obo-token-downscoping-vs-shared-credentials-faq.en.md) | [中文全文](research/offensive-defensive/a2a-obo-token-downscoping-vs-shared-credentials-faq.md) |
| **Non-Human Identity (NHI): Entra Workload ID + DPoP/mTLS Binding + Zombie Retirement** | [English](research/offensive-defensive/agent-nhi-workload-id-dpop-mtls-zombie-governance-faq.en.md) | [中文全文](research/offensive-defensive/agent-nhi-workload-id-dpop-mtls-zombie-governance-faq.md) |
| **Defeating Stolen Bearer Replay with Sender-Constrained Tokens (DPoP / mTLS)** | [English](research/offensive-defensive/agent-nhi-identity-dpop-mtls-token-binding-selection-faq.en.md) | [中文全文](research/offensive-defensive/agent-nhi-identity-dpop-mtls-token-binding-selection-faq.md) |
| **MCP Gateway & Tool Sandboxes: Azure APIM Remote MCP Proxy & ACA / Kata / E2B** | [English](research/offensive-defensive/apim-mcp-gateway-vs-aca-dynamic-sessions-kata-e2b-sandbox-faq.en.md) | [中文全文](research/offensive-defensive/apim-mcp-gateway-vs-aca-dynamic-sessions-kata-e2b-sandbox-faq.md) |
| **MCP Tool Description Poisoning, Cross-Server Shadowing & Manifest Hash Pinning** | [English](research/offensive-defensive/mcp-tool-poisoning-and-pinning-selection-faq.en.md) | [中文全文](research/offensive-defensive/mcp-tool-poisoning-and-pinning-selection-faq.md) |
| **Shadow MCP Servers & Developer IDE Extension Supply-Chain Governance** | [English](research/offensive-defensive/shadow-mcp-ide-plugin-extension-governance-and-broker-faq.en.md) | [中文全文](research/offensive-defensive/shadow-mcp-ide-plugin-extension-governance-and-broker-faq.md) |
| **Shadow AI, Browser Extensions & OAuth Consent Governance (Defender CASB + Purview DLP)** | [English](research/offensive-defensive/shadow-ai-casb-browser-extension-oauth-consent-governance-faq.en.md) | [中文全文](research/offensive-defensive/shadow-ai-casb-browser-extension-oauth-consent-governance-faq.md) |
| **Cross-Org B2B Agent Federation: Entra Cross-Tenant Identity + Signed Agent Cards + Clean Rooms** | [English](research/offensive-defensive/b2b-cross-org-a2a-agent-federation-entra-cleanroom-selection-faq.en.md) | [中文全文](research/offensive-defensive/b2b-cross-org-a2a-agent-federation-entra-cleanroom-selection-faq.md) |
| **Cross-Organization Multi-Agent Boundary Isolation & Federated Capability Broker** | [English](research/offensive-defensive/cross-org-b2b-agent-cleanroom-and-federated-broker-faq.en.md) | [中文全文](research/offensive-defensive/cross-org-b2b-agent-cleanroom-and-federated-broker-faq.md) |
| **Multi-Tenant B2B SaaS AI (ISV): Pool / Bridge / Silo Isolation + JWT `tid` + BYOK** | [English](research/offensive-defensive/multi-tenant-b2b-saas-isv-agent-isolation-architecture-selection-faq.en.md) | [中文全文](research/offensive-defensive/multi-tenant-b2b-saas-isv-agent-isolation-architecture-selection-faq.md) |

### 4. Enterprise RAG Security, Purview DLP, Lakehouse Data Agents, Memory & Privacy

| Architectural Focus & Product Comparison Scope | English Guide | 中文指南 |
|---|---|---|
| **Enterprise DLP & RAG Trimming: Microsoft Purview Sensitivity Labels vs. AI Search Filters** | [English](research/offensive-defensive/purview-sensitivity-labels-vs-ai-search-security-trimming-rag-faq.en.md) | [中文全文](research/offensive-defensive/purview-sensitivity-labels-vs-ai-search-security-trimming-rag-faq.md) |
| **M365 Copilot & Enterprise Knowledge Oversharing Governance (SharePoint SAM + Purview)** | [English](research/offensive-defensive/sharepoint-copilot-oversharing-sam-purview-governance-selection-faq.en.md) | [中文全文](research/offensive-defensive/sharepoint-copilot-oversharing-sam-purview-governance-selection-faq.md) |
| **RAG / GraphRAG Indirect Prompt Injection Defense & Pre-Retrieval Vector ACL Filtering** | [English](research/offensive-defensive/rag-indirect-injection-and-vector-acl-selection-faq.en.md) | [中文全文](research/offensive-defensive/rag-indirect-injection-and-vector-acl-selection-faq.md) |
| **Enterprise GraphRAG & Knowledge Graphs (Neo4j / Fabric): High-Water-Mark ACL + Cypher AST** | [English](research/offensive-defensive/enterprise-graphrag-knowledge-graph-cypher-acl-security-selection-faq.en.md) | [中文全文](research/offensive-defensive/enterprise-graphrag-knowledge-graph-cypher-acl-security-selection-faq.md) |
| **Vector DB Security: Azure AI Search vs. pgvector Native RLS vs. Cosmos DiskANN vs. Milvus** | [English](research/offensive-defensive/vector-database-security-ai-search-pgvector-cosmos-milvus-selection-faq.en.md) | [中文全文](research/offensive-defensive/vector-database-security-ai-search-pgvector-cosmos-milvus-selection-faq.md) |
| **Lakehouse Data Agents: Microsoft Fabric vs. Databricks Unity Catalog vs. Snowflake Cortex** | [English](research/offensive-defensive/data-agent-fabric-databricks-unity-catalog-snowflake-cortex-security-faq.en.md) | [中文全文](research/offensive-defensive/data-agent-fabric-databricks-unity-catalog-snowflake-cortex-security-faq.md) |
| **Text-to-SQL / BI Agent Security: Database Native RLS + Read-Only SQL AST Gate** | [English](research/offensive-defensive/text-to-sql-bi-agent-rls-and-ast-gate-selection-faq.en.md) | [中文全文](research/offensive-defensive/text-to-sql-bi-agent-rls-and-ast-gate-selection-faq.md) |
| **Document Parsing & OCR Security: Azure Document Intelligence vs. Vision LLM + Pixel CDR** | [English](research/offensive-defensive/rag-document-parsing-cdr-document-intelligence-ocr-security-faq.en.md) | [中文全文](research/offensive-defensive/rag-document-parsing-cdr-document-intelligence-ocr-security-faq.md) |
| **Defeating PDF / Office CMap Hidden Injection via Pixel CDR & Parser Isolation** | [English](research/offensive-defensive/multimodal-document-ocr-pdf-polyglot-injection-and-parser-isolation-faq.en.md) | [中文全文](research/offensive-defensive/multimodal-document-ocr-pdf-polyglot-injection-and-parser-isolation-faq.md) |
| **Agent Long-Term Memory Security: Cosmos DB / Redis Enterprise vs. Mem0 / Zep / LangMem** | [English](research/offensive-defensive/agent-long-term-memory-cosmos-redis-mem0-zep-security-faq.en.md) | [中文全文](research/offensive-defensive/agent-long-term-memory-cosmos-redis-mem0-zep-security-faq.md) |
| **Defeating MemoryGraft Cross-Session Poisoning with Provenance Taint Quarantine** | [English](research/offensive-defensive/agent-memory-poisoning-and-isolation-selection-faq.en.md) | [中文全文](research/offensive-defensive/agent-memory-poisoning-and-isolation-selection-faq.md) |
| **GDPR Right-to-be-Forgotten (DSAR): Tombstone + Envelope Crypto-Shredding vs. Unlearning** | [English](research/offensive-defensive/ai-privacy-gdpr-dsar-crypto-shredding-unlearning-selection-faq.en.md) | [中文全文](research/offensive-defensive/ai-privacy-gdpr-dsar-crypto-shredding-unlearning-selection-faq.md) |
| **Preventing Spoofed DSAR Exfiltration & Per-Subject Cryptographic Key Shredding** | [English](research/offensive-defensive/agent-privacy-dsar-crypto-shredding-and-unlearning-faq.en.md) | [中文全文](research/offensive-defensive/agent-privacy-dsar-crypto-shredding-and-unlearning-faq.md) |
| **Enterprise Synthetic Data Flywheel Poisoning Defense & C2PA Cryptographic Provenance** | [English](research/offensive-defensive/synthetic-data-poisoning-c2pa-provenance-and-broker-faq.en.md) | [中文全文](research/offensive-defensive/synthetic-data-poisoning-c2pa-provenance-and-broker-faq.md) |

### 5. Sandboxes, Browser/Voice/Edge Agents, Confidential AI & Cloud DevSecOps

| Architectural Focus & Product Comparison Scope | English Guide | 中文指南 |
|---|---|---|
| **Code Execution Sandboxes: Standard Docker vs. gVisor vs. Firecracker / Kata MicroVM** | [English](research/offensive-defensive/agent-sandbox-docker-gvisor-microvm-selection-faq.en.md) | [中文全文](research/offensive-defensive/agent-sandbox-docker-gvisor-microvm-selection-faq.md) |
| **Browser & Computer-Use Sandboxes: Azure Virtual Desktop vs. Ephemeral Browser Containers** | [English](research/offensive-defensive/browser-computer-use-agent-avd-playwright-sandbox-selection-faq.en.md) | [中文全文](research/offensive-defensive/browser-computer-use-agent-avd-playwright-sandbox-selection-faq.md) |
| **Browser / CUA Visual Prompt Injection, DOM Cloaking & Cross-Origin State Isolation** | [English](research/offensive-defensive/cua-browser-agent-visual-injection-selection-faq.en.md) | [中文全文](research/offensive-defensive/cua-browser-agent-visual-injection-selection-faq.md) |
| **Edge AI PC & Hybrid SLM: Windows Copilot+ NPU / Foundry Local + Intune Screen DRM** | [English](research/offensive-defensive/edge-ai-pc-on-device-slm-intune-hybrid-broker-selection-faq.en.md) | [中文全文](research/offensive-defensive/edge-ai-pc-on-device-slm-intune-hybrid-broker-selection-faq.md) |
| **On-Device SLM Cross-Window Harvesting Defense & Cloud-Edge Capability Broker** | [English](research/offensive-defensive/edge-local-agent-npu-on-device-slm-security-and-hybrid-cloud-broker-faq.en.md) | [中文全文](research/offensive-defensive/edge-local-agent-npu-on-device-slm-security-and-hybrid-cloud-broker-faq.md) |
| **Automotive Cockpit (SDV) & Smart Manufacturing IoT: QM/ASIL Split + GPS Lock** | [English](research/offensive-defensive/automotive-cockpit-iot-manufacturing-agent-security-selection-faq.en.md) | [中文全文](research/offensive-defensive/automotive-cockpit-iot-manufacturing-agent-security-selection-faq.md) |
| **Aerospace & Defense (CMMC 2.0 / ITAR / EAR / PLM): CUI Enclave + Nationality ABAC** | [English](research/offensive-defensive/aerospace-defense-cmmc-itar-ear-export-control-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/aerospace-defense-cmmc-itar-ear-export-control-agent-security-faq.md) |
| **Smart Grid, Virtual Power Plant (VPP) & Energy Trading: NERC CIP Diode + Collar** | [English](research/offensive-defensive/smart-grid-virtual-power-plant-energy-trading-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/smart-grid-virtual-power-plant-energy-trading-agent-security-faq.md) |
| **Municipal Utility CIS (Oracle CC&B / SAP IS-U) & AMI Smart Meters: Disconnect Lock** | [English](research/offensive-defensive/municipal-utility-cis-ami-smart-meter-billing-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/municipal-utility-cis-ami-smart-meter-billing-agent-security-faq.md) |
| **Enterprise ESG (EU CSRD), Scope 1/2/3 Carbon & Verra VCU: Deterministic GHG Engine** | [English](research/offensive-defensive/enterprise-esg-csrd-carbon-accounting-credit-registry-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/enterprise-esg-csrd-carbon-accounting-credit-registry-agent-security-faq.md) |
| **Precision Agriculture (John Deere) & Grain Trading (CBOT / EWR): Hedge Air-Gap & VRA** | [English](research/offensive-defensive/agritech-precision-farming-grain-trading-warehouse-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/agritech-precision-farming-grain-trading-warehouse-agent-security-faq.md) |
| **Smart Building BMS, Data Center DCIM & PropTech: PACS Air-Gap + Thermal Clamp** | [English](research/offensive-defensive/smart-building-bms-datacenter-dcim-access-control-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/smart-building-bms-datacenter-dcim-access-control-agent-security-faq.md) |
| **Media OTT Streaming, Programmatic AdTech (OpenRTB) & DRM: Pre-Release Master Air-Gap** | [English](research/offensive-defensive/media-ott-streaming-programmatic-adtech-drm-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/media-ott-streaming-programmatic-adtech-drm-agent-security-faq.md) |
| **Sports League Integrity, Live Ticketing (Ticketmaster) & Venue: Hold Lock & SafeTix** | [English](research/offensive-defensive/sports-league-live-ticketing-venue-integrity-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/sports-league-live-ticketing-venue-integrity-agent-security-faq.md) |
| **Cruise Lines (Fidelio SPMS), Theme Parks & Wearable Payment: Ride PLC Diode & Folio Lock** | [English](research/offensive-defensive/cruise-line-theme-park-resort-wearable-solas-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/cruise-line-theme-park-resort-wearable-solas-agent-security-faq.md) |
| **Wholesale Telecom Interconnect (BGP/SIP) & GSMA BCE Roaming: CALEA Air-Gap [315-FAQ]** | [English](research/offensive-defensive/wholesale-telecom-interconnect-bgp-sip-roaming-bce-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/wholesale-telecom-interconnect-bgp-sip-roaming-bce-agent-security-faq.md) |
| **Music Publishing (DDEX/CWR), Unreleased Stems & Royalty: Stem Air-Gap [660-Scenario]** | [English](research/offensive-defensive/music-publishing-record-label-ddex-stem-royalty-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/music-publishing-record-label-ddex-stem-royalty-agent-security-faq.md) |
| **Corporate Tax (ONESOURCE), BEPS Pillar Two & R&D Credit: FIN 48 Air-Gap [1,390-Assertion]** | [English](research/offensive-defensive/corporate-tax-transfer-pricing-beps-pillar-two-rd-credit-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/corporate-tax-transfer-pricing-beps-pillar-two-rd-credit-agent-security-faq.md) |
| **Commercial Real Estate (REIT / Yardi), Lease & TIA: Rent-Roll Air-Gap [650-Vector]** | [English](research/offensive-defensive/commercial-real-estate-reit-yardi-lease-abstraction-tia-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/commercial-real-estate-reit-yardi-lease-abstraction-tia-agent-security-faq.md) |
| **Management Consulting, Client Chinese Wall & Expert Network (GLG): Ring-Fence Air-Gap** | [English](research/offensive-defensive/management-consulting-client-chinese-wall-expert-network-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/management-consulting-client-chinese-wall-expert-network-agent-security-faq.md) |
| **M&A Virtual Data Room (VDR), HSR Clean Team & Escrow: Bid Air-Gap [320-FAQ & 1,402-Assertion]** | [English](research/offensive-defensive/ma-virtual-data-room-vdr-clean-team-closing-escrow-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/ma-virtual-data-room-vdr-clean-team-closing-escrow-agent-security-faq.md) |
| **Call-Center Realtime Voice Agents: Anti-Deepfake, Acoustic Injection & PCI-DSS Compliance** | [English](research/offensive-defensive/call-center-voice-agent-realtime-api-deepfake-pci-dss-selection-faq.en.md) | [中文全文](research/offensive-defensive/call-center-voice-agent-realtime-api-deepfake-pci-dss-selection-faq.md) |
| **Realtime Voice Acoustic Injection Defense & Out-of-Band FIDO2 Transaction Signing** | [English](research/offensive-defensive/voice-realtime-agent-acoustic-injection-selection-faq.en.md) | [中文全文](research/offensive-defensive/voice-realtime-agent-acoustic-injection-selection-faq.md) |
| **Sovereign Key Custody (BYOK/HYOK HSM + Purview DKE) & Confidential H100 GPU TEE** | [English](research/offensive-defensive/sovereign-ai-byok-hsm-confidential-gpu-tee-selection-faq.en.md) | [中文全文](research/offensive-defensive/sovereign-ai-byok-hsm-confidential-gpu-tee-selection-faq.md) |
| **Confidential AI CPU+GPU Remote Attestation vs. Standard Cloud Inference** | [English](research/offensive-defensive/confidential-computing-tee-gpu-attestation-vs-standard-cloud-inference-faq.en.md) | [中文全文](research/offensive-defensive/confidential-computing-tee-gpu-attestation-vs-standard-cloud-inference-faq.md) |
| **Enterprise AI Key Custody Tiers (PMK / BYOK / HYOK) & Decryption-Oracle Defense** | [English](research/offensive-defensive/enterprise-ai-byok-hyok-hsm-key-custody-and-broker-faq.en.md) | [中文全文](research/offensive-defensive/enterprise-ai-byok-hyok-hsm-key-custody-and-broker-faq.md) |
| **Cross-Border AI Data Residency: Regional / Data Zone PTU Lock + Same-Zone Failover** | [English](research/offensive-defensive/cross-border-ai-data-residency-ptus-regional-routing-selection-faq.en.md) | [中文全文](research/offensive-defensive/cross-border-ai-data-residency-ptus-regional-routing-selection-faq.md) |
| **Public Sector, Sovereign GovCloud & Citizen Services (311 / 12345): Dual-Zone Air-Gap** | [English](research/offensive-defensive/public-sector-gov-cloud-citizen-service-agent-security-selection-faq.en.md) | [中文全文](research/offensive-defensive/public-sector-gov-cloud-citizen-service-agent-security-selection-faq.md) |
| **Zero-Trust AI Landing Zone: Hub-Spoke VNet + Private Endpoint + Firewall Egress ACL** | [English](research/offensive-defensive/azure-ai-landing-zone-hub-spoke-private-endpoint-firewall-egress-faq.en.md) | [中文全文](research/offensive-defensive/azure-ai-landing-zone-hub-spoke-private-endpoint-firewall-egress-faq.md) |
| **AI Posture & Audit Trail: Microsoft Defender (AI-SPM) + Sentinel + Purview Audit** | [English](research/offensive-defensive/defender-ai-spm-sentinel-purview-compliance-audit-architecture-faq.en.md) | [中文全文](research/offensive-defensive/defender-ai-spm-sentinel-purview-compliance-audit-architecture-faq.md) |
| **Enterprise Coding Agents: GitHub Copilot Enterprise + GHAS vs. Cursor / Continue** | [English](research/offensive-defensive/enterprise-coding-agent-copilot-cursor-security-governance-faq.en.md) | [中文全文](research/offensive-defensive/enterprise-coding-agent-copilot-cursor-security-governance-faq.md) |
| **Legacy Code Modernization (COBOL / PL-SQL / Java): OpenRewrite + Golden-Master Replay** | [English](research/offensive-defensive/legacy-code-migration-modernization-agent-security-selection-faq.en.md) | [中文全文](research/offensive-defensive/legacy-code-migration-modernization-agent-security-selection-faq.md) |
| **CI/CD Pipeline Agents: Two-Stage Read-Only Split & OIDC Pinning vs. PR Injection** | [English](research/offensive-defensive/cicd-devsecops-github-actions-agent-oidc-security-selection-faq.en.md) | [中文全文](research/offensive-defensive/cicd-devsecops-github-actions-agent-oidc-security-selection-faq.md) |
| **Autonomous PR Review & Autofix Agent Build Isolation & Ephemeral OIDC Scoping** | [English](research/offensive-defensive/cicd-devsecops-agent-pr-injection-and-oidc-isolation-faq.en.md) | [中文全文](research/offensive-defensive/cicd-devsecops-agent-pr-injection-and-oidc-isolation-faq.md) |
| **Cloud IaC (Terraform / Bicep) & SRE Agents: State Isolation + Policy Gate + Plan-Hash** | [English](research/offensive-defensive/cloud-iac-terraform-bicep-sre-agent-plan-hash-selection-faq.en.md) | [中文全文](research/offensive-defensive/cloud-iac-terraform-bicep-sre-agent-plan-hash-selection-faq.md) |
| **Defeating Crash-Log Injection, Terraform State Leaks & Unapproved Cloud Drift** | [English](research/offensive-defensive/autonomous-iac-terraform-state-leak-and-plan-hash-broker-faq.en.md) | [中文全文](research/offensive-defensive/autonomous-iac-terraform-state-leak-and-plan-hash-broker-faq.md) |
| **Kubernetes AIOps Agents: Read-Only Diagnostics + GitOps Split & Admission Gate** | [English](research/offensive-defensive/k8s-aiops-agent-operator-rbac-and-admission-gate-faq.en.md) | [中文全文](research/offensive-defensive/k8s-aiops-agent-operator-rbac-and-admission-gate-faq.md) |
| **Multi-Cloud Agent Disaster Recovery, Split-Brain Defense & Global Epoch Fencing** | [English](research/offensive-defensive/multi-cloud-agent-dr-split-brain-and-epoch-fencing-faq.en.md) | [中文全文](research/offensive-defensive/multi-cloud-agent-dr-split-brain-and-epoch-fencing-faq.md) |
| **Async Webhook HMAC Verification & Socket IP-Pinned Egress Anti-SSRF** | [English](research/offensive-defensive/agent-webhook-callback-forgery-and-egress-ssrf-faq.en.md) | [中文全文](research/offensive-defensive/agent-webhook-callback-forgery-and-egress-ssrf-faq.md) |
| **LLM Fine-Tuning & Supply Chain: Foundry vs. Bedrock vs. Mosaic AI + Safetensors** | [English](research/offensive-defensive/model-supply-chain-finetuning-foundry-bedrock-safetensors-faq.en.md) | [中文全文](research/offensive-defensive/model-supply-chain-finetuning-foundry-bedrock-safetensors-faq.md) |
| **LoRA / DPO Fine-Tuning Sleeper Backdoor Detection & Model Provenance Pinning** | [English](research/offensive-defensive/lora-dpo-finetuning-backdoor-and-model-provenance-faq.en.md) | [中文全文](research/offensive-defensive/lora-dpo-finetuning-backdoor-and-model-provenance-faq.md) |
| **Post-Quantum Cryptography (PQC Hybrid KEM) Migration & PKI Anti-Downgrade Broker** | [English](research/offensive-defensive/pqc-post-quantum-crypto-agility-and-hybrid-kem-broker-faq.en.md) | [中文全文](research/offensive-defensive/pqc-post-quantum-crypto-agility-and-hybrid-kem-broker-faq.md) |

### 6. Regulated Industry Blueprints: Financial Services, Healthcare, Retail, Workplace & ERP

| Architectural Focus & Product Comparison Scope | English Guide | 中文指南 |
|---|---|---|
| **Banking Credit Underwriting & Wealth Advisory: Neuro-Symbolic Split & SR 11-7** | [English](research/offensive-defensive/financial-credit-underwriting-wealth-agent-sr11-7-broker-faq.en.md) | [中文全文](research/offensive-defensive/financial-credit-underwriting-wealth-agent-sr11-7-broker-faq.md) |
| **Real-Estate Title & Escrow (Qualia/SoftPro) & Mortgage Closing: MERS & CertifID Lock** | [English](research/offensive-defensive/real-estate-title-escrow-mortgage-closing-wire-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/real-estate-title-escrow-mortgage-closing-wire-agent-security-faq.md) |
| **Private Banking, UHNW Family Office (Addepar) & Estate Trusts: Per-Family Silo** | [English](research/offensive-defensive/private-banking-family-office-trust-wealth-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/private-banking-family-office-trust-wealth-agent-security-faq.md) |
| **Fine-Art Auction Houses (Sotheby's/Christie's) & Luxury Provenance: Reserve Air-Gap** | [English](research/offensive-defensive/fine-art-luxury-auction-reserve-price-provenance-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/fine-art-luxury-auction-reserve-price-provenance-agent-security-faq.md) |
| **Specialty Healthcare (DSO / MSO), DEA EPCS & Prior-Auth: FIPS 140-2 Token Lock** | [English](research/offensive-defensive/specialty-healthcare-dso-pharmacy-epcs-prior-auth-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/specialty-healthcare-dso-pharmacy-epcs-prior-auth-agent-security-faq.md) |
| **M&A Virtual Data Room (VDR) & PE/IB Research: Chinese Wall + Per-Deal Ephemeral Silo** | [English](research/offensive-defensive/ma-virtual-data-room-investment-research-agent-security-selection-faq.en.md) | [中文全文](research/offensive-defensive/ma-virtual-data-room-investment-research-agent-security-selection-faq.md) |
| **Public Company Investor Relations (IR: Workiva/Diligent) & SEC Reg FD: MNPI Air-Gap** | [English](research/offensive-defensive/public-company-investor-relations-sec-reg-fd-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/public-company-investor-relations-sec-reg-fd-agent-security-faq.md) |
| **Sovereign Wealth & Pension Funds, Proxy Voting (ISS) & Sec Lending: Basket Air-Gap** | [English](research/offensive-defensive/sovereign-wealth-pension-fund-proxy-voting-sec-lending-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/sovereign-wealth-pension-fund-proxy-voting-sec-lending-agent-security-faq.md) |
| **Quant Trading & Institutional Risk Agents: Deterministic Pre-Trade Kill-Switch** | [English](research/offensive-defensive/financial-trading-underwriting-agent-killswitch-and-broker-faq.en.md) | [中文全文](research/offensive-defensive/financial-trading-underwriting-agent-killswitch-and-broker-faq.md) |
| **PayFac Merchant Acquiring (KYB), BNPL Credit & Chargeback (Visa CE 3.0): Reserve Lock** | [English](research/offensive-defensive/fintech-payfac-merchant-underwriting-bnpl-chargeback-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/fintech-payfac-merchant-underwriting-bnpl-chargeback-agent-security-faq.md) |
| **Commercial Aviation MRO (AMOS), FAA 8130-3 & Aircraft Leasing: OEM LLP Trace & CRS Lock** | [English](research/offensive-defensive/commercial-aviation-mro-airworthiness-aircraft-leasing-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/commercial-aviation-mro-airworthiness-aircraft-leasing-agent-security-faq.md) |
| **Cross-Border Clearing (SWIFT ISO 20022) Anti-Injection & Deterministic Sanctions Gate** | [English](research/offensive-defensive/cbdc-cross-border-iso20022-pacs008-and-liquidity-broker-faq.en.md) | [中文全文](research/offensive-defensive/cbdc-cross-border-iso20022-pacs008-and-liquidity-broker-faq.md) |
| **Capital Markets T+1 Atomic Delivery-vs-Payment (DvP) & Margin Liquidity Broker** | [English](research/offensive-defensive/securities-clearing-ccp-csd-dvp-settlement-and-margin-broker-faq.en.md) | [中文全文](research/offensive-defensive/securities-clearing-ccp-csd-dvp-settlement-and-margin-broker-faq.md) |
| **Institutional MPC Treasury Custody & EIP-712 Clear Signing vs. Blind-Signing Spoofs** | [English](research/offensive-defensive/mpc-institutional-custody-eip712-clear-signing-and-broker-faq.en.md) | [中文全文](research/offensive-defensive/mpc-institutional-custody-eip712-clear-signing-and-broker-faq.md) |
| **P&C Insurance Underwriting & Claims AI: Anti-Fraud Document Gate & Payee Lock** | [English](research/offensive-defensive/insurance-underwriting-claims-adjuster-and-subrogation-broker-faq.en.md) | [中文全文](research/offensive-defensive/insurance-underwriting-claims-adjuster-and-subrogation-broker-faq.md) |
| **Clinical EHR Agents: SMART on FHIR Scoping + HIPAA Safe Harbor De-ID + Draft Orders** | [English](research/offensive-defensive/healthcare-clinical-fhir-hipaa-deid-agent-security-selection-faq.en.md) | [中文全文](research/offensive-defensive/healthcare-clinical-fhir-hipaa-deid-agent-security-selection-faq.md) |
| **Healthcare Clinical Triage & Claims Referral-Injection Defense & Minimum-Necessary Gate** | [English](research/offensive-defensive/healthcare-clinical-ai-hipaa-fhir-deid-and-broker-faq.en.md) | [中文全文](research/offensive-defensive/healthcare-clinical-ai-hipaa-fhir-deid-and-broker-faq.md) |
| **Biopharma Clinical Trials (Veeva eTMF / EDC) & PV: IRT Blinding Air-Gap + Part 11** | [English](research/offensive-defensive/biopharma-clinical-trial-etmf-pharmacovigilance-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/biopharma-clinical-trial-etmf-pharmacovigilance-agent-security-faq.md) |
| **Customer-Facing E-Commerce & Support: JWT Session Pinning + Deterministic Refund Gate** | [English](research/offensive-defensive/ecommerce-support-agent-anti-jailbreak-refund-abuse-architecture-faq.en.md) | [中文全文](research/offensive-defensive/ecommerce-support-agent-anti-jailbreak-refund-abuse-architecture-faq.md) |
| **Customer Support Self-Learning KB Flywheel (Ticket-to-KB): Draft Quarantine + Taint Lock** | [English](research/offensive-defensive/customer-support-self-learning-kb-flywheel-poisoning-defense-faq.en.md) | [中文全文](research/offensive-defensive/customer-support-self-learning-kb-flywheel-poisoning-defense-faq.md) |
| **Banking & Telecom Support Anti-Account-Takeover (ATO) & Step-Up Approval Broker** | [English](research/offensive-defensive/customer-service-agent-ato-simswap-and-refund-broker-faq.en.md) | [中文全文](research/offensive-defensive/customer-service-agent-ato-simswap-and-refund-broker-faq.md) |
| **Telecom Carrier (OSS/BSS): CPNI/CDR Privacy Air-Gap + Biometric eSIM Swap Lock** | [English](research/offensive-defensive/telecom-oss-bss-simswap-cdr-privacy-agent-security-selection-faq.en.md) | [中文全文](research/offensive-defensive/telecom-oss-bss-simswap-cdr-privacy-agent-security-selection-faq.md) |
| **Retail Dynamic Pricing & Rebate Agents: Margin-Floor Breaker vs. Penny-Drop Exploits** | [English](research/offensive-defensive/retail-ecommerce-dynamic-pricing-penny-drop-and-rebate-broker-faq.en.md) | [中文全文](research/offensive-defensive/retail-ecommerce-dynamic-pricing-penny-drop-and-rebate-broker-faq.md) |
| **Airline PSS, Hospitality & Travel GDS (PNR / Loyalty): Session PNR + ATPCO Lock** | [English](research/offensive-defensive/airline-hospitality-gds-pnr-loyalty-miles-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/airline-hospitality-gds-pnr-loyalty-miles-agent-security-faq.md) |
| **RFP Bid Proposal & Outbound Marketing GenAI: Curated Golden Vault + DLP + C2PA** | [English](research/offensive-defensive/outbound-marketing-rfp-proposal-agent-dlp-c2pa-selection-faq.en.md) | [中文全文](research/offensive-defensive/outbound-marketing-rfp-proposal-agent-dlp-c2pa-selection-faq.md) |
| **Gaming AI NPCs, Live-Stream UGC Moderation & Anti-Cheat: Economy Air-Gap** | [English](research/offensive-defensive/gaming-npc-livestream-ugc-moderation-agent-security-selection-faq.en.md) | [中文全文](research/offensive-defensive/gaming-npc-livestream-ugc-moderation-agent-security-selection-faq.md) |
| **Agentic Commerce Protocols: Google AP2 / Stripe SPT / Visa & Mastercard Agent Pay** | [English](research/offensive-defensive/agentic-commerce-ap2-stripe-visa-payment-security-selection-faq.en.md) | [中文全文](research/offensive-defensive/agentic-commerce-ap2-stripe-visa-payment-security-selection-faq.md) |
| **Defeating Payment Mandate Drift & High-Frequency Salami-Slicing Drain** | [English](research/offensive-defensive/agentic-commerce-ap2-tap-payment-mandate-forgery-and-stepup-quorum-faq.en.md) | [中文全文](research/offensive-defensive/agentic-commerce-ap2-tap-payment-mandate-forgery-and-stepup-quorum-faq.md) |
| **Workplace Email / Calendar / CRM Agents: Connector DLP + Draft-Only Quarantine** | [English](research/offensive-defensive/workplace-agent-email-crm-indirect-injection-dlp-broker-faq.en.md) | [中文全文](research/offensive-defensive/workplace-agent-email-crm-indirect-injection-dlp-broker-faq.md) |
| **Enterprise Meeting AI (Teams / Zoom vs. Shadow Bots): Lobby Block + Per-Instance ACL** | [English](research/offensive-defensive/enterprise-meeting-notetaker-teams-zoom-shadow-bot-security-faq.en.md) | [中文全文](research/offensive-defensive/enterprise-meeting-notetaker-teams-zoom-shadow-bot-security-faq.md) |
| **Zero-Click Email & Calendar AI Worm Containment via Provenance Taint Isolation** | [English](research/offensive-defensive/email-calendar-zero-click-agent-worm-and-taint-broker-faq.en.md) | [中文全文](research/offensive-defensive/email-calendar-zero-click-agent-worm-and-taint-broker-faq.md) |
| **Executive Search (CEO Succession), FCRA Background Check & Global Mobility** | [English](research/offensive-defensive/executive-search-fcra-background-check-global-mobility-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/executive-search-fcra-background-check-global-mobility-agent-security-faq.md) |
| **Global Reinsurance Treaty (Lloyd's), Cat Modeling (RMS) & Cat Bonds: PML Air-Gap** | [English](research/offensive-defensive/reinsurance-treaty-catastrophe-modeling-cat-bond-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/reinsurance-treaty-catastrophe-modeling-cat-bond-agent-security-faq.md) |
| **Enterprise ITSM (ServiceNow / Jira) & IT Helpdesk: Verified ID Face Check + Entra PIM** | [English](research/offensive-defensive/itsm-servicenow-jira-helpdesk-agent-zero-trust-selection-faq.en.md) | [中文全文](research/offensive-defensive/itsm-servicenow-jira-helpdesk-agent-zero-trust-selection-faq.md) |
| **Enterprise ERP (SAP S/4HANA / Dynamics 365) P2P: Deterministic 3-Way Match & IBAN Lock** | [English](research/offensive-defensive/erp-sap-dynamics-procure-to-pay-three-way-match-selection-faq.en.md) | [中文全文](research/offensive-defensive/erp-sap-dynamics-procure-to-pay-three-way-match-selection-faq.md) |
| **Enterprise Patent Drafting, Prior-Art Search & Trade Secret IP: In-Tenant Mirror** | [English](research/offensive-defensive/enterprise-patent-drafting-prior-art-trade-secret-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/enterprise-patent-drafting-prior-art-trade-secret-agent-security-faq.md) |
| **Automotive Dealership (DMS: CDK/Tekion), Auto Finance & OEM Warranty: Price-Floor Lock** | [English](research/offensive-defensive/automotive-dealership-dms-auto-finance-warranty-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/automotive-dealership-dms-auto-finance-warranty-agent-security-faq.md) |
| **QSR Drive-Thru POS (Toast/Simphony), Cold-Chain Food Safety & Franchise: Menu Grammar** | [English](research/offensive-defensive/qsr-drive-thru-pos-cold-chain-food-safety-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/qsr-drive-thru-pos-cold-chain-food-safety-agent-security-faq.md) |
| **Construction EPC (Procore / Autodesk BIM) & AIA G702 Pay Apps: Estimate Air-Gap** | [English](research/offensive-defensive/construction-epc-procore-bim-subcontractor-payapp-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/construction-epc-procore-bim-subcontractor-payapp-agent-security-faq.md) |
| **Omnichannel Retail, Gift-Card Issuance & CPG Trade-Promo (TPM): WMS & EDI 852 Lock** | [English](research/offensive-defensive/omnichannel-retail-giftcard-cpg-trade-promotion-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/omnichannel-retail-giftcard-cpg-trade-promotion-agent-security-faq.md) |
| **External Audit Firm (PCAOB Workpapers / AS 2310) & Independence [300-FAQ Milestone]** | [English](research/offensive-defensive/external-audit-firm-pcaob-workpaper-independence-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/external-audit-firm-pcaob-workpaper-independence-agent-security-faq.md) |
| **Corporate Tax, Transfer Pricing (BEPS 2.0) & SOX 404 Audit: ASC 740 Air-Gap** | [English](research/offensive-defensive/corporate-tax-transfer-pricing-sox-audit-agent-security-selection-faq.en.md) | [中文全文](research/offensive-defensive/corporate-tax-transfer-pricing-sox-audit-agent-security-selection-faq.md) |
| **Global Supply-Chain EDI Injection Defense, RFx Confidentiality & 3-Way Match Gate** | [English](research/offensive-defensive/erp-supply-chain-edi-customs-and-three-way-match-broker-faq.en.md) | [中文全文](research/offensive-defensive/erp-supply-chain-edi-customs-and-three-way-match-broker-faq.md) |
| **Third-Party Logistics (3PL: Blue Yonder), Bonded FTZ & Freight Audit (EDI 210)** | [English](research/offensive-defensive/third-party-logistics-3pl-bonded-warehouse-freight-audit-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/third-party-logistics-3pl-bonded-warehouse-freight-audit-agent-security-faq.md) |
| **Class-I Freight Rail, Intermodal (EDI 404) & PTC Yard Dispatch: SIL-4 Diode [650-Scenario]** | [English](research/offensive-defensive/freight-rail-intermodal-ptc-waybill-yard-dispatch-agent-security-faq.en.md) | [中文全文](research/offensive-defensive/freight-rail-intermodal-ptc-waybill-yard-dispatch-agent-security-faq.md) |
| **Maritime Port TOS (Navis N4 / CargoWise) & Customs (DCSA eBL): Release Interlock** | [English](research/offensive-defensive/maritime-port-tos-cargo-customs-ebl-agent-security-selection-faq.en.md) | [中文全文](research/offensive-defensive/maritime-port-tos-cargo-customs-ebl-agent-security-selection-faq.md) |
| **LegalTech CLM & eDiscovery: Matter-Scoped Ethical Walls & Privilege Waiver Guard** | [English](research/offensive-defensive/legaltech-clm-ediscovery-privilege-ethical-wall-selection-faq.en.md) | [中文全文](research/offensive-defensive/legaltech-clm-ediscovery-privilege-ethical-wall-selection-faq.md) |
| **Counterparty Contract Redline Injection Defense & OpenXML Sanitization Broker** | [English](research/offensive-defensive/legal-ediscovery-privilege-waiver-and-redline-broker-faq.en.md) | [中文全文](research/offensive-defensive/legal-ediscovery-privilege-waiver-and-redline-broker-faq.md) |
| **HRTech ATS & Payroll (Workday / SuccessFactors): Resume Pixel CDR & k-Anonymity** | [English](research/offensive-defensive/hrtech-ats-recruiting-payroll-agent-security-selection-faq.en.md) | [中文全文](research/offensive-defensive/hrtech-ats-recruiting-payroll-agent-security-selection-faq.md) |
| **Recruiting & Payroll Agent Salary-Exfiltration Defense & OBO Row-Level Broker** | [English](research/offensive-defensive/hr-recruiting-payroll-agent-resume-injection-and-broker-faq.en.md) | [中文全文](research/offensive-defensive/hr-recruiting-payroll-agent-resume-injection-and-broker-faq.md) |
| **Higher Education, EdTech LMS & Research Grants: Pixel OCR + FERPA Row Isolation** | [English](research/offensive-defensive/higher-ed-edtech-lms-ferpa-grading-agent-security-selection-faq.en.md) | [中文全文](research/offensive-defensive/higher-ed-edtech-lms-ferpa-grading-agent-security-selection-faq.md) |
| **Autonomous SOC & SIEM/SOAR: Defeating Log-Injection Self-DoS & Blast-Radius Caps** | [English](research/offensive-defensive/autonomous-soc-siem-soar-log-injection-and-broker-faq.en.md) | [中文全文](research/offensive-defensive/autonomous-soc-siem-soar-log-injection-and-broker-faq.md) |
---

## Multi-Agent Red Team Workbench

Rather than asking only whether a standalone LLM refuses an adversarial prompt, this workbench tests **whether collaborating multi-principal agents uphold identity boundaries, confidential data boundaries, and financial authorization invariants under indirect prompt injection, MCP tool poisoning, manufactured consensus, and Confused Deputy proxy chains**.

| Scenario Pack | Principals & Protected Boundaries |
|---|---|
| **A. Enterprise Collaboration (`enterprise-*`)** | Calendar, admin, procurement, finance, knowledge, and external supplier agents holding isolated synthetic records—verifying `restricted-budget` confidentiality, Canary exfiltration blocking, and `update_trust` quorum gates. |
| **B. Multi-Principal Agent Network (`network-*`)** | Distinct-principal agents interacting across directory, DM, forum, simulated wallet, and marketplace tools—verifying manufactured-consensus resistance and multi-hop `Forum -> Coordinator -> Wallet` spend blocking. |
| **C. Treasury & 654-Vector Arena (`playground/`)** | Interactive `$6B`-scale multisig & bridge kill-chain replay plus `654` red-vs-blue policy switches spanning MCP, Entra OBO, RAG Vector ACL, Text-to-SQL RLS, CUA, Confidential GPU TEE, FSI, HIPAA, Retail, ERP P2P, and M&A VDR. |

### Quickstart (Local Windows Execution)

Prerequisites: **Node.js 22+, Python 3.12, and uv** (no Docker or cloud credentials required for Fixture mode or `playground/`).

```powershell
git clone https://github.com/turbo998/ai-security-lab.git
Set-Location ai-security-lab
.\scripts\bootstrap.ps1
.\scripts\start-demo.ps1
```

Open **http://127.0.0.1:8000** (or open `playground/index.en.html` directly in any browser for the zero-dependency simulator). Pass `-Port 8001` if port `8000` is in use.

### Execution Modes & Evidence Provenance

| Mode | Execution Source | Cost & Evidence Interpretation |
|---|---|---|
| **Fixture (Default)** | Deterministic synthetic decisions exercise the real backend state machine, policy broker, and simulated tools | Zero cloud API cost; proves server-side authorization invariants (`live_llm_refusal_rate: not_measured`) |
| **Live** | Configured Azure OpenAI deployments generate live multi-agent decisions | Requires explicit local `.env` and `.\scripts\start-demo.ps1 -LoadEnv`; missing config disables Live mode cleanly without silent fallback |
| **Replay** | Streams recorded audit receipts with original timestamps and provenance tags | Never re-executes tool side effects or inflates evaluation sample counts |

### Workbench Screenshots & Recorded Walkthrough

![Enterprise Collaboration: Sandbox Execution, Agent Topology & Tool Audit Receipts](docs/screenshots/03-enterprise-lab.png)

![Paired Baseline vs. Hardened Deterministic Policy Comparison](docs/screenshots/07-comparison.png)

- 🎬 **Recorded Walkthrough (3m 03s)**: [Watch or download `local-fixture-walkthrough.webm`](docs/videos/local-fixture-walkthrough.webm) · [Chapters & reproduction notes](docs/videos/README.md)
- 📚 **Engineering & Architecture Docs**: [Customer Demo Guide (ZH)](docs/demo-guide.zh-CN.md) · [Code Walkthrough](docs/code-walkthrough.md) · [Architecture & Trust Boundaries](docs/architecture.md) · [Azure Deployment Preparation](docs/azure-deployment.md) · [Local vs. Azure Capabilities](docs/azure-capabilities.md) · [API & Event Contract](docs/implementation-contract.md)

---

## Validation & Regression Suite

```powershell
# Run the full backend & deterministic policy regression suite (666 passed / 1,402 assertions)
.\.venv\Scripts\pytest.exe -q

# Reproduce local in-memory & SQLite WAL latency micro-benchmarks
.\.venv\Scripts\python.exe scripts/measure_broker_latencies.py

# Run pre-publication secret, asset & link hygiene checks
.\.venv\Scripts\python.exe scripts/audit-publication.py
```

> **Safety & Ethics Notice**: All red-team scenarios operate strictly on synthetic local records and simulated tools. No arbitrary shell execution, unauthorized external target scanning, real payment rails, customer PII, or cloud secrets are included. Inspired by [Microsoft Research: Red-Teaming a Network of Agents](https://www.microsoft.com/en-us/research/blog/red-teaming-a-network-of-agents-understanding-what-breaks-when-ai-agents-interact-at-scale/) and the OWASP Top 10 for Agentic Applications.
