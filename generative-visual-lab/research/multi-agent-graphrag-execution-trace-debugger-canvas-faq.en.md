# Enterprise Multi-Agent Orchestration, GraphRAG 2-Hop Subgraph Lens & MCP Security Audit Visualizer Guide

> **Interactive Workbench**: [`demos/multi-agent-graphrag-execution-trace-debugger-canvas-studio/`](../demos/multi-agent-graphrag-execution-trace-debugger-canvas-studio/index.html) ｜ **7-Card Benchmark & Architecture Summary SVG**: [`docs/benchmarks/multi-agent-graphrag-execution-trace/summary-visual.svg`](./benchmarks/multi-agent-graphrag-execution-trace/summary-visual.svg)

---

## ① 📌 Executive Summary

When **Cloud & AI Solution Architects** demo **Multi-Agent Swarms (LangGraph / AutoGen / Semantic Kernel) and GraphRAG knowledge graphs (Microsoft GraphRAG / Neo4j)** to enterprise CTOs, risk officers, and business leads, two visualization anti-patterns routinely derail executive buy-in:
1. **The "Raw JSON Console Dump" Anti-Pattern**: Scrolling thousands of lines of nested tool-call JSON and prompt logs in a terminal—obscuring why the Planner fanned out to both GraphRAG and SQL, or how the Critic caught a hallucination;
2. **The "48,500-Node Force-Directed Hairball" Anti-Pattern**: Rendering an entire enterprise knowledge graph (`35,000–82,000` nodes) with `d3-force`—freezing the browser at **`11 fps`** and collapsing every label into an illegible black spiderweb (**`16.5%` legibility**).

**Production Reference Architecture (Dual-Pane Agentic & GraphRAG Executive Canvas: Left ELK Orthogonal Swimlane State Machine + Right 2-Hop Personalized PageRank [PPR] Ego-Centric Subgraph Lens + Loop Circuit Breaker & Bi-Directional Citation Grounding)**:
- **Left Pane (Control Flow & FinOps Guardrail)**: Subscribes to **OpenTelemetry `gen_ai.agent.*` and `gen_ai.tool.*` spans**, laying out `Planner → GraphRAG / MCP SQL → Hallucination Critic → HITL Gate` in deterministic **ELK orthogonal swimlanes** with a **3-retry / $0.12 token-cap circuit breaker** (slashing runaway retry-loop bills from `$4.85` to `$0.042`, **-99.1%**);
- **Right Pane (Evidence Subgraph Lens)**: Prunes `48,500+` global knowledge-graph entities via **2-Hop Personalized PageRank (PPR)** down to the **`14–18` highest-salience nodes and triples**, linking every executive claim to its exact `[Head] --(Relation)--> [Tail]` proof at **`60 fps` (`99.4%` legibility)**.

![Enterprise Multi-Agent & GraphRAG Execution Trace Visualizer Overview](./benchmarks/multi-agent-graphrag-execution-trace/summary-visual.svg)

---

## ② 🎯 Architect & AI Platform Lead Soul-Searching Q&A

### Q1: Why must we never render more than 25 knowledge-graph nodes on screen during a GraphRAG customer demo, even when the backend database holds 80,000 entities?
- **Visual Cognitive Load Limit ($\le 25$ Nodes) & 2-Hop Personalized PageRank (PPR) Pruning**:
  - Above ~25 labeled nodes and edges, edge crossings grow quadratically and text labels collide.
  - **2-Hop PPR Induced Subgraph Extraction**:
    1. Anchor on the query's seed entities $S$ (e.g., `ChemCorp-Osaka`, `Photoresist`);
    2. Compute 2-hop Personalized PageRank ($\alpha = 0.15$) in the graph store and extract the induced subgraph of the **Top-18 highest-scoring nodes**;
    3. Lay out those 18 nodes radially/orthogonally with explicit predicate labels (`[SKU-AutoMCU-X9] --(packaged_by)--> [OSAT-Penang-04]`), rendering in **`1.8 ms/frame (60 fps)`** with **99.4% executive legibility**.

### Q2: How do we prevent a Multi-Agent swarm from burning $5+ in an infinite SQL/MCP retry loop when a tool returns a syntax error or timeout?
- **Deterministic State-Machine Circuit Breakers (`Max 3 Retries` + Token Cap)**:
  - Unbounded conversational agent loops repeatedly apologize and re-invoke failing tools as context windows balloon.
  - Binding every tool swimlane to an explicit retry counter (`Retries: 0/3`) and per-run budget ceiling (`$0.12 Cap`) automatically trips the circuit breaker on the 3rd failure and routes execution to a deterministic fallback or `HITL_ESCALATE` node.

### Q3: How do we give M&A legal teams, FDA compliance auditors, and SecOps leads 100% confidence that the agent's summary contains zero hallucinated links?
- **Bi-Directional Triple Grounding & HITL Write Gates**:
  1. Hovering over any sentence in the generated brief highlights the exact supporting `[Entity A] --(Relation)--> [Entity B]` triple in the right-hand PPR lens and the raw SQL/document clause in the left-hand tool span;
  2. Any state-mutating MCP tool call (e.g., applying a production WAF rule or submitting an ERP order) pauses at an amber **Human-in-the-Loop (HITL) Approval Gate**.

---

## ③ 🧭 Visual Architecture Diagrams (Decision Tree + Dual-Pane Pipeline + Sequence)

### 3.1 Enterprise Multi-Agent & GraphRAG Visualization Selection Decision Tree

```mermaid
flowchart TD
    A["Enterprise Multi-Agent & GraphRAG Visualization Need"] --> B{"Target User: Low-Level Prompt Engineer or CTO / Business Auditor?"}
    B -->|"Engineer Prompt Debugging"| C["LangSmith / Arize Phoenix Raw Span Waterfall"]
    B -->|"CTO PoC / Risk Auditor / Production Cockpit"| D["Left Pane: ELK Swimlane DAG + Right Pane: 2-Hop PPR Subgraph Lens"]
    D --> E{"Backend Knowledge-Graph Scale?"}
    E -->|"10k to 10M+ Entities"| F["Never Render Full Graph! Run 2-Hop PPR to Extract Top-K (K<=24) Salient Nodes"]
    F --> G{"Includes State-Mutating MCP Tools or Expensive SQL?"}
    G -->|"Yes"| H["Enforce Max-3-Retry Circuit Breaker + Token Cap + HITL Approval Gate"]
    G -->|"No (Read-Only Analysis)"| I["Enable Hallucination Critic & Bi-Directional Triple Highlighting"]
    H --> J["60fps Dual-Pane Live Canvas + Self-Contained HTML/MP4 Replay Export"]
    I --> J
```

### 3.2 Five-Stage OTel GenAI Swimlane & 2-Hop PPR Subgraph Lens Architecture

```mermaid
flowchart LR
    subgraph S1["Stage 1 · OTel GenAI Telemetry"]
        A1["LangGraph / AutoGen / SK"] --> A2["Emit gen_ai.agent.* & gen_ai.tool.* Spans"]
    end
    subgraph S2["Stage 2 · Left ELK Swimlane DAG"]
        B1["Orthogonal Role Swimlanes"] --> B2["Token Gauge & 3-Retry Circuit Breaker"]
    end
    subgraph S3["Stage 3 · Right PPR Subgraph Lens"]
        C1["50k+ Global KG Entities"] --> C2["2-Hop PPR Extracts Top-18 Evidence Nodes"]
    end
    subgraph S4["Stage 4 · Critic & Triple Grounding"]
        D1["Verify Claim-to-Triple Match"] --> D2["Bi-Directional Claim <-> Triple <-> Doc Link"]
    end
    subgraph S5["Stage 5 · HITL Gate & Replay"]
        E1["HITL Approval for Write Tools"] --> E2["Export 60fps Executive Replay Bundle"]
    end
    S1 --> S2
    S1 --> S3
    S2 --> S4
    S3 --> S4
    S4 --> S5
```

### 3.3 End-to-End Tier-3 Wafer Supply-Chain Cascade Execution Sequence

```mermaid
sequenceDiagram
    autonumber
    participant Exec as CTO / Supply-Chain Risk Officer
    participant DAG as Left Pane: LangGraph Swimlane Engine
    participant PPR as Right Pane: GraphRAG 2-Hop PPR Lens
    participant SQL as MCP ERP Inventory Tool
    participant Critic as Grounding Critic & Verifier

    Exec->>DAG: Asks: Which automotive MCUs are impacted by the 14-day Osaka photoresist delay?
    DAG->>PPR: 1. Dispatches GraphRAG retriever seeded on [ChemCorp-Osaka] (320ms)
    PPR->>PPR: 2. Solves 2-Hop PPR across 48,500 entities -> extracts Top-18 causal nodes (480ms)
    DAG->>SQL: 3. Queries MCP SQL for current safety stock of [SKU-AutoMCU-X9] (290ms)
    PPR-->>Critic: Emits 3-hop wafer-to-OSAT-to-MCU triples & contract clause IDs
    SQL-->>Critic: Emits 6-day inventory buffer telemetry at Penang OSAT
    Critic->>Critic: 4. Verifies 100% claim grounding (Retries: 0/3, Spend: $0.042)
    Critic-->>Exec: 5. Lights up green swimlane path + 18-node causal subgraph (100% grounded)
```

---

## ④ 📊 Multi-Stack Agent & GraphRAG Visualization Selection Matrix

| Visualization / Observability Stack | CTO & Business Legibility | 50k-Node KG Browser FPS | Claim-to-Triple Provenance | Runaway Retry-Loop Protection | Architect Fit & Applicability Boundary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Proposed Dual-Pane ELK Swimlane DAG + 2-Hop PPR Top-18 Lens + Circuit Breaker** | **99.4% – 99.8% (Crystal-clear flow & proof)** | **60 fps (1.8ms/frame, $\le 25$ nodes)** | **100.0% (Bi-directional claim$\leftrightarrow$triple)** | **Hard Circuit Breaker ($0.042 vs $4.85)** | **Best fit for enterprise Multi-Agent + GraphRAG cockpits and executive PoCs** |
| **2. Developer Trace Waterfall (LangSmith / Arize Phoenix / Langfuse)** | 58.0% (Engineer-focused span list) | 60 fps (Tabular UI) | 85.0% (Requires inspecting raw JSON) | Alerting supported | Ideal for ML engineer debugging; lacks visual GraphRAG entity subgraph proof |
| **3. Flat Chat UI with Collapsible "Thinking" Accordion** | 42.0% (Hides parallel fan-out & critic loops) | 60 fps | 60.0% (Footnotes only; no topology) | None | Consumer chatbots; undersells enterprise multi-agent orchestration |
| **4. Unfiltered Full-Graph Force Layout (`d3-force` on $>5,000$ Nodes)** | **14.2% – 19.0% (Black hairball)** | **11 fps (Main-thread freeze)** | 20.0% (Unreadable labels) | None | **Never render $>50$ unfiltered KG nodes in a live UI** |
| **5. Raw Terminal JSON Log Stream (`stdout`)** | **< 10.0% (Unreadable for executives)** | 60 fps | 0% | None | **Strictly forbidden in executive or customer-facing demos** |

---

## ⑤ 🧪 Interactive Workbench Demo & 7-Card Benchmark Deck

Open [`demos/multi-agent-graphrag-execution-trace-debugger-canvas-studio/`](../demos/multi-agent-graphrag-execution-trace-debugger-canvas-studio/index.html) to explore:
- **4 Enterprise Agent Swarm & GraphRAG Presets**: Global Supply-Chain Tier-3 Wafer Cascade (`48.5k → 18` nodes), M&A Beneficial-Ownership Due Diligence (`82k → 15` nodes), Phase-III Clinical Trial FDA Compliance (`64k → 14` nodes), and SecOps Zero-Day Attack Path + HITL Gate (`35k → 16` nodes);
- **Interactive PPR Hop-Radius Slider (`1-Hop / 2-Hop / 3-Hop`) & Hairball Toggle**: Adjust the ego-centric subgraph lens radius and toggle **Naive 48,500-Node Hairball + JSON Log** to see why unscoped graphs fail;
- **Embedded 7-Card 4:5 Benchmark Report**: Covers Overview, Tier-3 Wafer Cascade Deep Dive, 4-Cohort Swarm Matrix, PPR + Circuit-Breaker Code Contract, Loop/Multi-Hop Robustness, 1.8ms Render Latency, and Architect Good-Fit / Not-For Recommendations.

---

## ⑥ 🛠️ Enterprise Multi-Agent & GraphRAG Visualization Review Checklist

- [ ] **Is the frontend knowledge-graph viewport hard-capped at $\le 25$ nodes via 2-Hop Personalized PageRank (PPR) or Steiner-Tree pruning?** Never dump thousands of raw Neo4j/GraphRAG nodes into `d3-force`.
- [ ] **Are agent and MCP tool spans rendered in deterministic ELK orthogonal swimlanes using OpenTelemetry `gen_ai.*` conventions?** Display per-step latency, token spend, and parallel fan-out/fan-in clearly.
- [ ] **Does every tool node enforce a hard retry ceiling (`Max 3 Retries`) and per-session token budget breaker?** Prevent SQL syntax or timeout errors from triggering runaway $5+ retry loops.
- [ ] **Are executive summary claims bi-directionally linked to both the right-pane PPR triples and left-pane source document clauses?** Guarantee 100% auditable provenance on hover/click.
- [ ] **Do state-mutating MCP tools pause at an explicit Human-in-the-Loop (HITL) approval gate before execution?** Enforce OWASP Agentic AI least-privilege and human sign-off controls.
