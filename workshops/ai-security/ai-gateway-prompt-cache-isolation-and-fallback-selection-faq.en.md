# AI Security Architecture Selection & First-Principles Defense FAQ: Enterprise AI Gateway & Model Router Prompt Cache Cross-Tenant Side-Channels, Log Poisoning & Fallback Downgrade Jailbreaks vs. Tenant-Keyed HMAC Cache Isolation + Policy-Invariant Gateways

> **Audience & Purpose**: Written for **AI Solution Architects**, **CISOs**, and **Cloud Infrastructure Architects**, strictly modeled on the clear, first-principles decision-guide style of `ib-vs-ethernet-roce-selection-faq.md`.
> **Key Takeaway**: Understand in 3 minutes why enabling global Prompt Caching to save tokens and configuring automatic `HTTP 429` model fallback (`Primary Tier-1 -> Fallback Small Model`) quietly open two catastrophic backdoors in enterprise AI Gateways; master the architecture selection, quantitative metrics, and production checklist for **Tenant-Keyed HMAC KV-Cache Isolation + Safety-Tier Pinned Routing + Deterministic Capability Brokers** in 10 minutes.
> **中文版本 (Chinese Version)**: [`ai-gateway-prompt-cache-isolation-and-fallback-selection-faq.md`](ai-gateway-prompt-cache-isolation-and-fallback-selection-faq.md)

---

## 🖼️ Executive Visual Summary Card

![AI Solution Architect · 2026-11-08 Round 10 Enterprise AI Gateway Prompt Cache Cross-Tenant Side-Channels & Fallback Downgrade Jailbreaks vs. Tenant-Keyed HMAC Cache Isolation & Policy-Invariant Gateway Summary](../../docs/screenshots/ai-gateway-cache-fallback-faq-2026-11-08.en.svg)

---

## ① 📌 Executive Summary

1. **Golden Rule for AI Gateway Selection (Global Prefix Cache & Blind Failover vs. Tenant-Keyed HMAC KV-Cache & Policy-Invariant Broker)**:
   - **Public Static System Prompts + Single-Tenant Non-Sensitive Q&A (No tenant-private few-shot data, no tool execution, identical safety tiers across primary/fallback models)** ➔ **Option A: Standard Global Prefix Caching + Basic HTTP 429/503 Failover** is sufficient (reduces Time-To-First-Token `TTFT` and token spend; public benchmarks report 50%–80% TTFT reduction on long static prefixes `[anonymized_reported, independently_reproduced=false]`).
   - **Multi-Tenant Enterprise SaaS, RAG Gateways with Tenant-Private Context, or Multi-Model Routers Attached to Production Tools (MCP / Database / Payments)** ➔ **Must choose Option C: Tenant-Keyed HMAC KV-Cache Namespace Isolation + Fail-Closed Safety-Tier Pinning + Server-Side Deterministic Capability Broker**. **Never** share KV-Cache blocks or vector Semantic Caches across tenants without cryptographic tenant binding, and **never** silently downgrade tool-enabled agent sessions to a weaker fallback model upon `HTTP 429` rate limits without stripping write/payment privileges.
2. **Core Risk Essence (First Principles)**:
   - Enterprise AI Gateways (e.g., LiteLLM, Portkey, Kong AI Gateway, and vLLM/SGLang inference clusters) face three structural failure modes:
     - **Failure Mode 1: Cross-Tenant KV-Cache Timing Side-Channels & Semantic Cache Poisoning**: Inference engines (such as vLLM Automatic Prefix Caching and SGLang RadixAttention) reuse GPU KV tensors when token prefixes match. If multiple tenants share a global unkeyed prefix pool, an attacker can send candidate prefixes and measure **Time-To-First-Token (`TTFT`)**—a cache hit returns in milliseconds while a miss takes tens or hundreds of milliseconds—reconstructing another tenant's cached M&A brief or system prompt token-by-token (`Prompt Peek`). Worse, global vector Semantic Caches can return Tenant A's cached confidential response directly to Tenant B on a near-duplicate query.
     - **Failure Mode 2: Quota-Exhaustion Fallback Downgrade Jailbreaks**: To maximize uptime SLA, teams configure `Primary: Frontier Tier-1 Model` $\rightarrow$ `Fallback: Self-Hosted Small Open-Weights Model`. An attacker deliberately floods the gateway to trigger `HTTP 429 Too Many Requests` on the primary model, forcing the router to fail over to the weakly aligned fallback model, which immediately succumbs to indirect prompt injection and emits unauthorized tool calls.
     - **Failure Mode 3: Gateway Observability & Audit Log Poisoning**: Attackers embed second-order prompt injections inside failed or rate-limited gateway requests. When an internal high-privilege SecOps / AIOps Agent ingests gateway telemetry logs for automated root-cause analysis, the payload activates and hijacks the SecOps Agent into mutating `trust-registry` or exfiltrating secrets.
3. **Quantified Impact & Performance Baseline (Strict Provenance Separation)**:
   - **`synthetic` (Offline Synthetic Fixture Evaluation, `independently_reproduced=true`)**: Across our **48 deterministic red-vs-blue scenarios (162 passing Pytest assertions)**, the unprotected baseline suffers a **79.17% Attack Success Rate (ASR)** (100% breach on AI Gateway cross-tenant cache/fallback downgrade and log poisoning scenarios). Enforcing **Tenant Ownership Isolation (`record-owner`) + Degraded/Log Taint Write Blocking (`untrusted-write`) + Restricted Exfiltration Blocking (`restricted-data-boundary`) + Requester Payment Verification (`original-requester-payment`)** drives fixture ASR to **0.0%** with **100.0% benign task completion (0% false positives)**. *(Scope note: reflects deterministic server-side enforcement on our 48-scenario synthetic fixture; `live_llm_refusal_rate: not_measured`.)*
   - **`measured` (Local Micro-Benchmark & SQLite WAL Gateway Timing, `independently_reproduced=true`)**: Measured via `scripts/measure_broker_latencies.py` (`research/latency-samples-2026-11-08.json`, `Windows 11 ARM64 / Python 3.12.10`): pure in-memory `digest() + Broker.evaluate()` (`n=200` full raw array, `run_id="tier1-n200-429d84e952d449bb"`) runs in **P50 = `0.0248 ms`** (P95 = `0.0409 ms`), and 1-step execution with SQLite WAL cryptographic receipt commit (`n=50` full raw array) runs in **P50 = `7.21 ms`** (P95 = `8.19 ms`).

---

## ② 🎯 Customer & Architect Soul-Searching Q&A (FAQ-Driven)

### Q1: Why does enabling global Prompt Caching or Semantic Caching on an AI Gateway / vLLM cluster create a cross-tenant data leak?
- **One-Sentence Answer**: **Without a cryptographic `HMAC(tenant_key, tenant_id || principal_id)` bound into every cache block key, a global KV-Cache acts as a millisecond timing oracle that lets attackers guess other tenants' cached prompts, while a global Semantic Cache directly serves Tenant A's confidential answers to Tenant B.**
- **Real-World Attack Story (Plain-Language First Principles)**:
  - A financial SaaS platform serves 50 enterprise tenants on a shared vLLM cluster with global Automatic Prefix Caching enabled.
  - **Step 1 (Cache Warm-Up)**: Tenant A's executive agent analyzes an M&A term sheet (`System Prompt + "Acquisition Target: StarTech, Max Bid: $4.2B..."`), caching the KV blocks in GPU HBM.
  - **Step 2 (TTFT Timing Side-Channel / Prompt Peek)**: Attacker Tenant B sends probe requests starting with `System Prompt + "Acquisition Target: StarTech"`. When the prefix matches Tenant A's cached KV block, GPU prefill is skipped and `TTFT` drops from `180 ms` to `14 ms`. Using this `166 ms` timing delta, Tenant B's script binary-searches the next token step by step.
  - **Step 3 (Semantic Cache Cross-Tenant Bleed)**: Because the gateway also uses a global vector Semantic Cache (cosine similarity $> 0.92$), Tenant B asks a semantically equivalent question about the acquisition budget and receives Tenant A's cached `restricted-budget` summary directly from the cache layer.
- **Architect's Fix (Tenant-Keyed HMAC Prefix Hashing + Strict `record-owner` Cache Partitioning)**:
  1. **Cryptographic Namespace Prefix Keying**: Compute every KV-Cache block hash as `HMAC_SHA256(tenant_secret, tenant_id || principal_role || token_chunk)`. Identical text from Tenant B hashes to a completely disjoint key, eliminating cross-tenant cache hits and TTFT timing leaks.
  2. **Ban Cross-Tenant Semantic Caching**: Never store `restricted` records or tool outputs in a shared Semantic Cache; enforce strict caller ownership (`record-owner`) on every cache lookup.

---

### Q2: Automatic model failover (`Primary -> Fallback`) upon `HTTP 429` is standard high-availability design. How do attackers weaponize it into a "Fallback Downgrade Jailbreak"?
- **One-Sentence Answer**: **Prompt-injection resilience varies drastically across models; if an attacker can flood your primary frontier model into `HTTP 429` and force your gateway to silently route tool-enabled traffic to a weakly aligned fallback model, your prompt-level safety vanishes instantly.**
- **Real-World Attack Story**:
  - An enterprise configures its AI Gateway with `Primary: Tier-1 Frontier Model` and `Fallback: Self-Hosted 8B Open-Weights Model` for uninterrupted procurement processing.
  - **The Exploit**: A malicious supplier sends a burst of noisy requests to exhaust the primary model's TPM/RPM quota (`HTTP 429`), then immediately submits a poisoned invoice. The gateway fails over to the 8B fallback model. While the primary model would have rejected the hidden override inside the invoice, the fallback model is instantly hijacked into calling `write_record("business-result")` and `request_payment($920)` to the supplier.
- **Architect's Fix (Fail-Closed Safety-Tier Pinning + Model-Agnostic Capability Broker)**:
  1. **Safety-Tier Pinning & Read-Only Degradation**: Tag every route with a verified safety tier. If a `Tier-1` route fails over to a `Tier-3` model, the gateway must **automatically strip write/payment tool schemas** and stamp the degraded session with `taint="untrusted"`.
  2. **Model-Agnostic Capability Broker**: Regardless of which upstream model generated the tool call, the server-side Capability Broker deterministically enforces `untrusted-write`, `original-requester-payment`, and `restricted-data-boundary`.

---

### Q3: What is "AI Gateway Observability Log Poisoning" and how does it compromise internal SecOps / AIOps Agents?
- **One-Sentence Answer**: **When raw, untrusted attacker prompts from failed or rate-limited requests are written into gateway telemetry logs and later summarized by an internal high-privilege SecOps Agent, the attacker's payload executes a second-order hijack on the operations plane.**
- **Attack Chain vs. Zero-Trust Interception**:
  - **Unprotected Breach**: Attacker sends a poisoned request $\rightarrow$ Gateway logs raw payload $\rightarrow$ Nightly SecOps Agent reads gateway logs to triage anomalies $\rightarrow$ Second-order payload hijacks SecOps Agent $\rightarrow$ SecOps Agent calls `update_trust("trust-registry")` or modifies production status.
  - **Zero-Trust Interception**: Gateway telemetry tags all request log fields with `source_trust="untrusted"` $\rightarrow$ SecOps Agent session inherits `untrusted` taint upon reading logs $\rightarrow$ Capability Broker deterministically blocks `update_trust` and `write_record` in **`0.0248 ms` in-memory P50** (`rule="untrusted-write"`).

---

## ③ 🧭 Visual Architecture Diagrams (Mermaid Decision Tree + Attack vs. Defense + Sequence Diagram)

### Figure 1: Enterprise AI Gateway Cache Isolation & Fallback Routing Decision Tree (`flowchart TD`)

```mermaid
flowchart TD
    Start(["🌐 Deploying Enterprise AI Gateway / Model Router<br/>(vLLM / SGLang / LiteLLM / Managed Gateway)"]) --> Q1{"1. Do multiple tenants or departments<br/>share the cluster / cache pool?"}

    Q1 -- "No (Single-Tenant Public Static Q&A)" --> PlanA["🟢 Option A: Global Prefix Cache + Basic Retry<br/>• Cache only static public System Prompts<br/>• No confidential context or write tools"]
    Q1 -- "Yes (Multi-Tenant SaaS / Shared Enterprise Gateway)" --> Q2{"2. Can routed sessions invoke write,<br/>export, or payment MCP tools?"}

    Q2 -- "No (Read-Only Analytics with Private Context)" --> PlanB["🟡 Option B: Tenant-Keyed HMAC KV-Cache Isolation<br/>• Cache Key = HMAC(tenant_key, tenant_id || role || tokens)<br/>• Disable cross-tenant Semantic Cache to stop TTFT side-channels"]
    Q2 -- "Yes (Production Agents with Write / Payment Tools)" --> PlanC["🛡️ Option C: HMAC Cache Isolation + Safety-Tier Pinning + Capability Broker<br/>• G1: Tenant-keyed HMAC KV-Cache + record-owner cache verification<br/>• G2: Auto-strip write tools & stamp taint='untrusted' on low-tier fallback<br/>• G3: Stamp gateway telemetry logs as untrusted to protect SecOps agents<br/>• G4: Model-agnostic Capability Broker blocks untrusted-write / payment / exfil"]

    style Start fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc
    style PlanA fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#ecfdf5
    style PlanB fill:#78350f,stroke:#f59e0b,stroke-width:2px,color:#fffbeb
    style PlanC fill:#1e1b4b,stroke:#818cf8,stroke-width:2.5px,color:#eef2ff
```

---

### Figure 2: Unprotected Shared Cache & Blind Fallback Breach vs. Zero-Trust Policy-Invariant Gateway (`flowchart LR`)

```mermaid
flowchart LR
    subgraph Vulnerable["❌ Unprotected Baseline: Global Shared Cache + Blind 429 Fallback (100% Breached in Fixture)"]
        direction LR
        V1["Attacker Probes Prefix &<br/>Floods Primary Model into 429"] --> V2["Global Cache Leaks Tenant A Hit &<br/>Router Fails Over to Weak 8B Model"]
        V2 --> V3["Weak Fallback Model Hijacked &<br/>Downstream Trusts Gateway Output"]
        V3 --> V4["💥 Cross-Tenant Secret Leaked +<br/>Trust Registry Tampered & $920 Wire"]
    end

    subgraph Hardened["✅ Zero-Trust Architecture: Tenant HMAC Cache + Degraded Taint Lock + Capability Broker (0% Breached)"]
        direction LR
        H1["Attacker Probes Prefix &<br/>Triggers 429 Fallback / Log Poison"] --> H2["🔒 Gate 1: Tenant HMAC Cache Key<br/>Physical Isolation (record-owner)"]
        H2 --> H3["🔒 Gate 2: Safety-Tier Pinning<br/>Fallback Session Stamped 'untrusted'"]
        H3 --> H4["🔒 Gate 3: Deterministic Broker<br/>Blocks untrusted-write / payment / exfil<br/>(0.0248ms In-Memory P50)"]
    end

    style Vulnerable fill:#450a0a,stroke:#ef4444,stroke-width:2px,color:#fef2f2
    style Hardened fill:#022c22,stroke:#10b981,stroke-width:2px,color:#ecfdf5
```

---

### Figure 3: End-to-End Red-vs-Blue Sequence Diagram (`sequenceDiagram`)

```mermaid
sequenceDiagram
    autonumber
    actor Attacker as 🔴 Attacker (External Tenant / Supplier)
    participant GW as 🌐 Enterprise AI Gateway / Router
    participant Cache as ⚡ KV-Cache / Semantic Cache Pool
    participant FallbackLLM as 🤖 Tier-3 Fallback Model
    participant Broker as 🛡️ Deterministic Capability Broker (PEP)

    Note over Attacker,Broker: Phase 1: Cross-Tenant Cache Probe & Semantic Cache Bleed Prevention
    Attacker->>GW: 1. Send near-duplicate query targeting Tenant A (Finance) restricted-budget cache
    GW->>Cache: 2. Compute HMAC(key_B, tenant_B || tokens)
    Cache-->>GW: 3. Cache Miss (Zero cross-tenant prefix sharing or TTFT side-channel)
    GW->>Broker: 4. Attempt direct cross-principal read_record("restricted-budget")
    Broker-->>Attacker: 5. BLOCKED (rule="record-owner", 0.0248ms P50)

    Note over Attacker,Broker: Phase 2: HTTP 429 Fallback Downgrade Jailbreak + Log Poisoning Interception
    Attacker->>GW: 6. Flood primary quota (HTTP 429) & inject poisoned ticket into Fallback route
    GW->>FallbackLLM: 7. Route to Tier-3 fallback model with forced session taint="untrusted"
    FallbackLLM-->>GW: 8. Hijacked fallback emits update_trust("trust-registry") & request_payment($920)
    GW->>Broker: 9. Forward tool calls to model-agnostic Capability Broker
    Broker->>Broker: 10. Verify session taint="untrusted" & requester="supplier" != "finance"
    Broker-->>GW: 11. BLOCKED (rule="untrusted-write" & "original-requester-payment")
```

---

## ④ 📊 Architect Decision Matrix

| Dimension | Option A: Global Shared Prefix/Semantic Cache + Blind 429 Failover | Option B: Plain Prefix Tagging + Gateway Regex/Classifier Guardrail | Option C: Tenant HMAC Cache Isolation + Safety-Tier Pinning + Capability Broker (Recommended) |
| :--- | :--- | :--- | :--- |
| **Target Risk Tier & Scenarios** | 🟢 **L1 Low Risk**: Public static docs Q&A, zero tenant secrets, zero tools | 🟡 **L2 Low-Med Risk**: Internal read-only assistant without write/payment tools | 🔴 **L3/L4 High Risk (Recommended)**: Multi-tenant SaaS AI Gateways, enterprise model routers with MCP tool execution |
| **Interception Layer** | HTTP API key check only (shared internal cache and fallback models exposed) | String prefix + input classifier (bypassed via fallback downgrade & log poisoning) | **4-Layer Defense**: Cryptographic HMAC cache keys + `record-owner` isolation + degraded `untrusted` taint lock + Capability Broker |
| **Added Latency Overhead** | Cache hit `5–20 ms` `[anonymized_reported]` | Classifier adds `35–120 ms` `[anonymized_reported]` | **In-memory `digest + Broker.evaluate` P50 `0.0248 ms` (P95 `0.0409 ms`)**; 1-step SQLite WAL receipt P50 **`7.21 ms`** `[measured]` |
| **Bypass Resistance** | ❌ **Very Low** (Vulnerable to TTFT binary search & 429 fallback jailbreaks) | ⚠️ **Low-Medium** (Weak fallback models succumb to business-framed injection) | ✅ **100% Deterministic (across 48 synthetic fixture scenarios)**: Blocks unauthorized writes, leaks, and payouts even if fallback LLM is 100% jailbroken |
| **False Positive Impact** | None | Classifier false refusals on long technical logs | **0.0% False Positives** (Full intra-tenant prefix cache speedup preserved; graceful read-only degradation on 429) |
| **Engineering & Ops Cost** | Low | Medium | **Low–Medium** (~60 LOC HMAC prefix wrapper + route safety-tier tags + shared Capability Broker) |

---

## ⑤ 🧪 Reproducible Benchmark & Key Findings

We added two parametrized (`baseline` vs. `hardened`) enterprise AI Gateway regression tests (`BRK-29` / `GW-CACHE-FALLBACK-33` and `BRK-30` / `GW-LOG-POISON-34`) to `tests/test_regressions.py`, expanding our deterministic benchmark suite to **48 scenarios (45 adversarial + 3 benign baselines, 162/162 passing Pytest assertions)**:

| Metric (with Explicit Provenance Scope) | Unprotected Baseline (`baseline`) | Zero-Trust Hardened (`hardened`) | Provenance & Reproducibility Path |
| :--- | :--- | :--- | :--- |
| **Scenario `BRK-29`: HTTP 429 Fallback Downgrade Jailbreak & Cross-Tenant Cache Exfil (`GW-CACHE-FALLBACK-33`)** | **100% Breached (`CONFIRMED_VIOLATION`)** (Hijacked fallback leaks cached budget and initiates `$920` supplier payout) | **0.0% Breached (`BLOCKED`)** (`record-owner` blocks cross-principal read + `restricted-data-boundary` blocks exfil + `original-requester-payment` blocks wire) | `synthetic` (`tests/test_regressions.py::test_ai_gateway_fallback_downgrade_and_cross_tenant_cache_leak_blocked`) |
| **Scenario `BRK-30`: Gateway Observability Log Second-Order Poisoning of SecOps Agent (`GW-LOG-POISON-34`)** | **100% Breached (`CONFIRMED_VIOLATION`)** (SecOps Agent ingests poisoned gateway log and mutates `trust-registry` & business record) | **0.0% Breached (`BLOCKED`)** (Telemetry stream inherits `untrusted` taint; `untrusted-write` blocks registry and record mutation) | `synthetic` (`tests/test_regressions.py::test_ai_gateway_observability_log_poisoning_secops_hijack_blocked`) |
| **Overall 48-Scenario Synthetic Fixture ASR** | **79.17% (`38 / 48` breached)** | **0.00% (`0 / 48` breached)** | `synthetic` (`independently_reproduced=true`, `live_llm_refusal_rate: not_measured`) |
| **Benign Multi-Model Routing Completion / False Positive Rate** | **100.0% / 0.0%** | **100.0% / 0.0%** | `synthetic` (3 benign baseline workflows 100% passed) |
| **In-Memory Broker Gate Latency (`digest + Broker.evaluate`, `n=200` full raw array)** | `0.0094 ms` (P50) / `0.0176 ms` (P95) | **`0.0248 ms` (P50) / `0.0409 ms` (P95)** | `measured` (`research/latency-samples-2026-11-08.json`, `run_id="tier1-n200-429d84e952d449bb"`) |
| **1-Step SQLite WAL Receipt Commit Latency (`n=50` full raw array)** | `7.12 ms` (P50) / `8.41 ms` (P95) | **`7.21 ms` (P50) / `8.19 ms` (P95)** | `measured` (`scripts/measure_broker_latencies.py`) |

---

## ⑥ 🛠️ Appendix: Production Architect Security Checklist

Verify these 6 controls before signing off on any multi-tenant AI Gateway, vLLM/SGLang inference cluster, or multi-model router:

- [ ] **1. Are all KV-Cache prefix hashes cryptographically salted with a tenant-bound HMAC?** (Never share raw `Hash(tokens)` prefix blocks across tenants; inject `HMAC_SHA256(tenant_secret, tenant_id || principal_id || role)` into every cache block key to eliminate TTFT timing side-channels.)
- [ ] **2. Is cross-tenant vector Semantic Caching strictly disabled for confidential and tool-enabled workflows?** (Never cache `restricted` records or tool execution outputs in a shared semantic cache; enforce `record-owner` verification on all cached artifacts.)
- [ ] **3. Does automatic model failover (`Auto-Fallback`) enforce Fail-Closed Safety-Tier Pinning?** (When `HTTP 429 / 503` triggers failover to a lower-tier fallback model, automatically strip write/payment tool schemas or stamp the degraded session with `taint="untrusted"`.)
- [ ] **4. Are all outbound tool calls gated by a model-agnostic deterministic Capability Broker?** (Never rely on upstream model alignment alone; enforce `untrusted-write`, `original-requester-payment`, and `restricted-data-boundary` at the execution boundary.)
- [ ] **5. Are gateway observability and audit logs stamped `untrusted` before ingestion by internal SecOps / AIOps Agents?** (Prevent second-order prompt injections stored in gateway request logs from hijacking diagnostic agents into mutating `trust-registry` or production configs.)
- [ ] **6. Is per-principal / per-tenant rate-limit isolation enforced upstream of the primary model pool?** (Prevent a single malicious supplier or tenant from deliberately exhausting global primary TPM/RPM quotas to force other sessions into fallback routes.)
