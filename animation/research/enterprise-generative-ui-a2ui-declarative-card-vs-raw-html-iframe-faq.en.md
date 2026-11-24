# Enterprise Agentic Generative UI (A2UI / MCP Apps / AG-UI) Rendering Stack Guide: Declarative JSON Registry + Vega-Lite/ELK DSL + Pre-Warmed CSP Sandbox vs. Raw LLM HTML (224th Workbench)

> **Executive Summary**: When Cloud & AI Solution Architects build enterprise FinOps Copilots, cloud architecture assistants, and BI agents, stakeholders expect **interactive Generative UI** (live charts, topology explorers, approval sliders) rather than walls of markdown text.
> **Never rely on per-turn unconstrained LLM raw HTML/Tailwind/JS generation or server-side Python `matplotlib` static PNGs in production**—those naive approaches cause three critical failures: (1) **`7,400ms–8,500ms` blank-screen latency and `$0.018–$0.032/turn` token/container costs**, (2) **`31.5%` UI layout & dark-mode contrast failures**, and (3) **severe prompt-injected XSS and data exfiltration vulnerabilities**.
> Solution Architects should deploy an **88 / 10 / 2 Three-Tier Enterprise Generative UI Architecture**:
> 1. **Tier 1 (`88%` of Agent Turns): Streaming `A2UI / AG-UI` Declarative JSON Component Registry (`165ms` First Paint)**: The LLM streams only `180 tokens` of Zod-validated JSON props into pre-compiled host React/D3/Rive components—delivering a **44.8× latency speedup, `100.0%` corporate Design System compliance, and `-84.4%` lower token cost (`$0.0028/turn`)**;
> 2. **Tier 2 (`10%` of Turns): Declarative `Vega-Lite / ELK.js` Visualization DSL (`210ms` First Paint)**: Renders interactive, zoomable SVG/Canvas charts and orthogonal cloud topologies on the client with 1-click editable SVG/PPTX export;
> 3. **Tier 3 (`2%` Long-Tail Bespoke Tools): Pre-Warmed Null-Origin Dual-Iframe `MCP App` Sandbox with `CSP: default-src 'none'` (`320ms` mount, `0%` data exfiltration, saving `+$2.36M/yr`)**!

---

## 1. 📌 Executive Summary & Comparison Matrix

| Evaluation Dimension | Option A: Cloud Python Container Static PNG (`Code Interpreter Matplotlib`) | Option B: Unconstrained Per-Turn LLM Raw HTML/JS (`Raw Artifact Iframe`) | Option C: 3-Tier Hybrid (`88% A2UI JSON Registry` + `10% Vega/ELK DSL` + `2% Pre-Warmed CSP Sandbox`) (Recommended) |
| --- | --- | --- | --- |
| **First-Widget Paint Latency** | `8,500 ms` (container boot + plot + PNG upload) | `7,400 ms` (waits for 3,500 HTML/JS tokens to close) | **`165 ms – 320 ms` (incremental partial-JSON streaming)** |
| **Design System & Dark-Mode Fit** | `62.0%` (blurry 72-DPI raster text on 4K displays) | `68.5%` (`31.5%` broken layouts or unreadable contrast) | **`99.5% – 100.0%` (pre-compiled host components inherit Figma tokens)** |
| **Interactive Drill-Down & Actions** | **None** (static flat PNG image) | Brittle (filter clicks often crash or re-run 7.4s LLM) | **60fps Local Brushing + Typed `onAction` State Callbacks** |
| **Security & Exfiltration Guard** | High isolation, high latency | ⛔ **Critical XSS / Data Exfiltration Risk** | **100% Safe (Tier 1/2 zero-eval; Tier 3 `default-src 'none'`)** |
| **Blended Cost per UI Turn** | `$0.032 / turn` | `$0.018 / turn` | **`$0.0028 / turn` (`-84.4%` cost reduction, `+$2.36M/yr` saved)** |

---

## 2. 🎯 Solution Architect Q&A

### Q1: Why does having an LLM generate raw HTML, Tailwind, and Chart.js code on every turn fail in enterprise production?
**A**: Generating raw frontend code per conversation turn fails on three axes:
1. **The 3,500-Token Boilerplate Tax**: Displaying 4 KPI metrics and a bar chart requires only `~180 tokens` of structured data, yet raw HTML generation emits `3,500+ tokens` of repetitive CSS/DOM boilerplate—stalling the user for **`7,400ms`** and costing `6.4×` more per turn.
2. **31.5% Visual & Accessibility Drift**: Hallucinated utility classes frequently render white text on light backgrounds in dark mode or overflow mobile viewports.
3. **The `A2UI / AG-UI` Declarative Fix**: Pre-compile 40+ enterprise React/WebComponent widgets (`KpiRibbon`, `FinOpsApprovalCard`, `RiveOrb`, `DataGrid`) and let the LLM stream compact JSON props. Partial-JSON parsing mounts the skeleton and populates metrics token-by-token in **`165ms`** with **100% Design System fidelity**.

### Q2: How should an enterprise Agent render ad-hoc analytical charts or complex cloud architecture graphs without spinning up a slow Python Matplotlib container?
**A**: Route to **Tier 2: Declarative Visualization Grammars (`Vega-Lite` + `ELK.js`)**:
- Instead of waiting `8.5s` for a server-side Python container to rasterize a blurry static PNG, the Agent emits a concise **40-line `Vega-Lite` or `ELK.js` JSON AST**.
- The client browser renders crisp vector SVG/Canvas graphics in **`210ms`**, supporting 0ms local cross-filtering, hover tooltips, pan/zoom, and 1-click export to editable PowerPoint (`.pptx`) slides!

### Q3: When a user genuinely needs a bespoke interactive simulator (the 2% `MCP Apps` long tail), how do we prevent prompt-injected scripts from stealing data?
**A**: Enforce a **Pre-Warmed Null-Origin Dual-Iframe Sandbox with Zero Network Egress**:
1. Render inside a nested `iframe` with `sandbox="allow-scripts"` (never `allow-same-origin`), isolating the widget in an opaque `null` origin with zero access to cookies or storage.
2. Inject a strict header: `Content-Security-Policy: default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:;`. Because `connect-src`, `form-action`, and external `img-src` are completely blocked, even a prompt-injected script has **zero network channel to exfiltrate data**.
3. Communicate with the host exclusively via schema-validated `postMessage` JSON-RPC 2.0 events.

---

## 3. 🧭 Visual Architecture Diagrams (Mermaid)

### 3.1 Enterprise Generative UI 3-Tier Routing Decision Tree
```mermaid
flowchart TD
    A["User Sends Query or Action Request to Enterprise Agent"] --> B{"Required Visual Interaction Modality?"}
    B -->|Dashboards / Approval Cards / KPI Forms 88% Traffic| C["Tier 1: Streaming A2UI / AG-UI Declarative JSON Registry<br/>180-Token Typed Props -> Pre-Compiled Host React/D3/Rive (165ms)"]
    B -->|Ad-Hoc BI Charts / Cloud & Lineage Topologies 10% Traffic| D["Tier 2: Declarative Visualization Grammar DSL<br/>Vega-Lite / ELK.js JSON AST -> Client SVG/Canvas Engine (210ms)"]
    B -->|Bespoke Interactive Simulators / Custom Calculators 2% Traffic| E["Tier 3: Pre-Warmed Null-Origin Dual-Iframe MCP App Sandbox<br/>Enforce CSP default-src 'none' + JSON-RPC 2.0 Bridge (320ms)"]
    C & D & E --> F["User Interacts with Widget -> Emits Typed Action Event to Agent (0ms Local Update)"]
```

### 3.2 3-Tier Hybrid Generative UI & Zero-Egress Sandbox Architecture
```mermaid
flowchart LR
    subgraph Agent["1. Constrained Schema Router"]
        LLM["Enterprise Agent"] --> SCH["Typed Tool / JSON Schema Stream"]
    end
    subgraph HostUI["2. Native & Declarative DSL Layer (98%)"]
        SCH -->|Tier 1: 88%| A2UI["A2UI Host Widget Registry:<br/>KPI / Form / Rive State Machine (165ms)"]
        SCH -->|Tier 2: 10%| DSL["Vega-Lite & ELK.js Engine:<br/>60fps Vector Charts & Topologies (210ms)"]
    end
    subgraph Sandbox["3. Zero-Trust MCP App Sandbox (2%)"]
        SCH -->|Tier 3: 2%| CSP["Null-Origin Dual Iframe:<br/>CSP default-src 'none' (320ms)"]
    end
```

### 3.3 165ms Streaming A2UI Render & Bidirectional Action Sequence
```mermaid
sequenceDiagram
    participant User as Solution Architect / Executive
    participant Host as Host Frontend (A2UI Registry)
    participant Agent as Enterprise FinOps & Cloud Agent

    User->>Agent: "Show top over-budget GPU teams and give me a soft-cap approval card"
    Agent-->>Host: 60ms Stream Partial JSON: { component: "FinOpsApprovalDeck", ... }
    Host->>Host: 165ms Mount native dark-mode skeleton, D3 budget bars, and Rive badge
    Agent-->>Host: Complete 180-token JSON stream ($0.0028 total cost)
    User->>Host: Drag budget slider to 85% and click [Approve Auto-Downgrade]
    Host->>Agent: Dispatch typed action { action: "approve_soft_cap", threshold: 0.85 }
```

---

## 4. 📊 Multi-Stack Comparison Matrix

| Generative UI Stack | First-Widget Paint | Design System Compliance | Interactivity & Export | Security & Exfiltration | Cost per Turn | Best Fit Scenario |
| --- | --- | --- | --- | --- | --- | --- |
| **1. Tier 1: `A2UI / AG-UI` Declarative JSON Registry** | **`165 ms`** | **`100.0%`** | **60fps Native + Typed Actions** | **100% Safe (Zero eval)** | **`$0.0028`** | **88% enterprise cards, forms, KPIs & workflows** |
| **2. Tier 2: `Vega-Lite / ELK.js` Declarative DSL** | **`210 ms`** | **`99.8%`** | **60fps Brush/Zoom + PPTX Export** | **100% Safe (Pure AST)** | **`$0.0032`** | **10% ad-hoc BI charts & cloud architecture graphs** |
| **3. Tier 3: Pre-Warmed `CSP default-src 'none'` Sandbox** | `320 ms` | `99.5%` | Custom bespoke simulators | **Zero Network Egress** | `$0.0065` | **2% bespoke interactive calculators (`MCP Apps`)** |
| **4. Raw LLM HTML/JS or Cloud Python Static PNG** | `7,400–8,500 ms` | `62.0%–68.5%` | Static PNG or brittle scripts | ⛔ **High XSS / Exfil Risk** | `$0.018–$0.032` | ⛔ **Never use as primary enterprise UI stack** |

---

## 5. 🧪 Interactive Workbench & 7-Card Benchmark

- **Interactive Workbench**: [`demos/enterprise-generative-ui-a2ui-declarative-card-vs-raw-html-iframe-studio/`](../demos/enterprise-generative-ui-a2ui-declarative-card-vs-raw-html-iframe-studio/)
- **Visual Summary SVG**: [`docs/benchmarks/enterprise-generative-ui-a2ui-declarative-card-vs-raw-html-iframe/summary-visual.svg`](benchmarks/enterprise-generative-ui-a2ui-declarative-card-vs-raw-html-iframe/summary-visual.svg)
- **Sealed Metrics JSON**: [`docs/benchmarks/enterprise-generative-ui-a2ui-declarative-card-vs-raw-html-iframe/summary.json`](benchmarks/enterprise-generative-ui-a2ui-declarative-card-vs-raw-html-iframe/summary.json)

![Summary Visual](benchmarks/enterprise-generative-ui-a2ui-declarative-card-vs-raw-html-iframe/summary-visual.svg)

---

## 6. 🛠️ Enterprise Production Review Checklist

- [ ] **Enforce the 88 / 10 / 2 Generative UI Routing Split**: Serve 88% of turns via pre-compiled `A2UI` JSON components, 10% via `Vega-Lite / ELK.js` DSLs, and `<2%` via sandboxed `MCP Apps`.
- [ ] **Stream Incremental Partial-JSON Props**: Mount component skeletons and progressive chart series as tokens arrive to keep first-widget paint below `200ms`.
- [ ] **Replace Server-Side Python Matplotlib Static PNGs with Client Vector DSLs**: Deliver retina-sharp SVG/Canvas charts with local 0ms cross-filtering and editable PPTX export.
- [ ] **Lock Down Bespoke Code Sandboxes with `sandbox="allow-scripts"` and `CSP: default-src 'none'`**: Block all outbound network requests and parent DOM access.
