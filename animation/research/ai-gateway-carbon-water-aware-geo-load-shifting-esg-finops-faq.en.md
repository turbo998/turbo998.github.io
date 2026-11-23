# Enterprise Carbon-, Water- (WUE) & Spot-Aware Geo-Load-Shifting AI Gateway Selection Guide (WattTime / Electricity Maps + Zero-Egress Dispatch · 150th Milestone!)

## ① 📌 Executive Summary

> **Bottom-Line Recommendation**: When operating `2,048× H100/B200` clusters for batch e-commerce video generation, multimodal visual RAG indexing, and LoRA fine-tuning, **never pin deferrable batch compute to coal/gas-peaker regions with evaporative cooling towers (e.g., `us-east-1` evening peak at `468 gCO2eq/kWh` and `WUE 1.85 L/kWh`, emitting `14,820 tCO2e/yr` and evaporating `42.6 Million Liters/yr` of water), and never blindly shift latency-sensitive traffic or raw multi-terabyte datasets across oceans (which spikes chat `p99 TTFT` to `428ms` and racks up `$482k/yr` in cross-region egress fees)**.
>
> Instead, deploy a **3-Tier SLA-Decoupled Carbon (MOER) + Water (WUE) + Zero-Egress Manifest Router**:
> 1. **Strict SLA Tiering (Sync Edge Pinning vs. Async Follow-the-Hydro/Sun)**: Pin `100%` of latency-critical interactive requests (`SLA < 200ms`) to local edge regions (`138ms p99`), while exposing the `68%–84%` deferrable batch video/embedding workload (`SLA ≥ 4h`) to spatiotemporal load shifting;
> 2. **5-Minute Marginal Carbon (MOER) + Water Usage Effectiveness (WUE) + Spot Joint Optimization**: Ingest real-time 5-minute WattTime / Electricity Maps marginal emissions alongside datacenter wet-bulb adiabatic WUE telemetry—avoiding drought-stressed desert solar regions (`WUE 2.14 L/kWh`) in favor of free-air cooled Nordic hydro (`eu-north-1`: `18 gCO2eq/kWh`, `WUE 0.08 L/kWh`, `$1.64/h` Spot) and Québec hydro (`ca-central-1`: `24 gCO2eq/kWh`, `WUE 0.12 L/kWh`);
> 3. **18 KB Zero-Egress Scene-Manifest Dispatch**: Pre-stage read-only base models and brand 3D/LoRA weights in each green region, dispatching only `18 KB` JSON scene manifests across regions and streaming finished H.265 MP4s directly to the global CDN edge (`-96.4%` egress fees, **-71.8%** Scope 2 carbon, **-78.4%** water consumption, and **+$2,480,000/yr** net savings).

---

## ② 🎯 Architect & ESG Officer Q&A (Q1 / Q2 / Q3)

### Q1: Why do CSRD and SEC Scope 2 audits require 5-minute Marginal Operating Emissions Rate (`MOER`) telemetry instead of annual average renewable matching?
- **Annual RECs hide evening fossil peaker plants**: During `17:00–21:00` evening ramps in PJM (`us-east-1`) or Germany (`eu-central-1`), solar output drops to zero and every incremental megawatt of AI GPU load is served 100% by marginal coal or open-cycle gas turbines (`412–468 gCO2eq/kWh`).
- **Physical decarbonization via spatiotemporal shifting**: Shifting nocturnal and evening video rendering batches to 24/7 Nordic/Québec hydro surplus (`18–24 gCO2eq/kWh`) or midday curtailed wind/solar intervals cuts physical emissions per rendered video from `12.4 gCO2` to `3.5 gCO2` (**-71.8%**).

### Q2: Why does "Carbon-Only" routing into desert solar regions trigger severe datacenter water-footprint (`WUE`) violations?
- **High ambient temperatures drive evaporative cooling spikes**: Midday solar surpluses in arid regions often coincide with `38°C–43°C` ambient temperatures where open-loop cooling towers evaporate `1.85–2.14 Liters` of potable water per `kWh` (`WUE`) inside high-stress watersheds.
- **Joint Carbon + Water Scoring**: Weighting both `MOER(r,t)` and wet-bulb `WUE(r,t)` steers batch jobs to cool-climate free-air adiabatic hydro regions (`eu-north-1` at `0.08 L/kWh` and `ca-central-1` at `0.12 L/kWh`), saving **33.4 Megaliters/yr (-78.4%)**.

### Q3: How do we shift workloads across continents without blowing $480k/yr on cross-region egress fees or breaking interactive latency?
- **SLA Isolation + 18 KB Declarative Manifest Dispatch**: Real-time traffic (`SLA < 200ms`) never leaves the local region. For async video batches, instead of copying `4.8 TB` of raw textures across oceans at `$0.02/GB` (`$482k/yr`), the gateway dispatches an `18 KB` JSON prompt/camera manifest to pre-warmed regional read-only caches and pushes finished MP4s directly to the edge CDN (`$17.2k/yr` egress, **-96.4%**).

---

## ③ 🧭 Visual Architecture Diagrams (Mermaid Decision Tree + Green Gateway Topology + Sequence Flow)

### 3.1 Spatiotemporal Carbon, Water & Spot Routing Decision Tree
```mermaid
flowchart TD
    A[Incoming AI Inference / Video Batch Request] --> B{Latency SLA Tier?}
    B -->|"Interactive SLA < 200ms<br/>Live Chat / Copilot Completion"| C[Pin to Nearest Local Edge Region<br/>p99 TTFT = 138ms · Zero Cross-Ocean RTT]
    B -->|"Deferrable Batch SLA >= 4h<br/>Bulk Video Render / Visual RAG / LoRA"| D[Query 5-Min WattTime MOER + Datacenter WUE + Spot Price]
    D --> E{Regional Carbon & Water Gate}
    E -->|"Fossil Peaker MOER > 350 gCO2<br/>or Drought High-WUE > 1.5 L/kWh"| F[Throttle / Queue for Curtailed Hydro-Solar Window]
    E -->|"Free-Air Cooled Hydro Region<br/>eu-north-1 18g / ca-central-1 24g"| G[Dispatch 18KB JSON Scene Manifest to Pre-Staged Pool<br/>Stream Output to CDN · -71.8% CO2 · -78.4% Water]
```

### 3.2 Enterprise Carbon- & Water-Aware Multi-Region AI Gateway Architecture
```mermaid
flowchart LR
    subgraph Telemetry["1. Real-Time 5-Min Grid & Cooling Telemetry"]
        T1[WattTime / Electricity Maps<br/>5-Min Marginal MOER API]
        T2[Wet-Bulb & Chiller Telemetry<br/>Real-Time WUE L/kWh Curve]
        T3[Multi-Cloud GPU Spot Oracle<br/>Preemption & Negative-LMP Feed]
    end
    subgraph Router["2. SLA-Tiered Carbon + Water + Spot Router"]
        R1[SLA Classifier<br/>Sync <200ms vs Async >=4h]
        R2[Multi-Objective Solver<br/>MOER + WUE + Spot + Egress]
        R3[18KB Scene-Manifest Compiler<br/>Zero Raw-Dataset Egress]
    end
    subgraph GreenFleet["3. Global Low-Carbon Low-WUE GPU Pools"]
        G1[eu-north-1 Lulea Hydro<br/>18 gCO2 · 0.08 L/kWh · $1.64/h]
        G2[ca-central-1 Quebec Hydro<br/>24 gCO2 · 0.12 L/kWh · $1.72/h]
        G3[us-west-2 Columbia Hydro<br/>68 gCO2 · 0.24 L/kWh · $1.82/h]
    end
    T1 & T2 & T3 --> R2
    R1 --> R2 --> R3 --> G1 & G2 & G3
```

### 3.3 Zero-Egress Batch Video Dispatch & GHG Protocol Dual-Ledger Sequence
```mermaid
sequenceDiagram
    autonumber
    participant App as Video Campaign Orchestrator
    participant GW as Carbon-Water AI Gateway
    participant Grid as WattTime + WUE Telemetry
    participant Hydro as eu-north-1 Hydro GPU Pool
    participant Audit as CSRD / GHG Audit Ledger

    App->>GW: Submit 50,000 E-Commerce Video Renders (SLA = 8h)
    GW->>Grid: Fetch 5-min MOER (gCO2/kWh), WUE (L/kWh) & Spot across 8 regions
    Grid-->>GW: us-east-1=468g/1.85L ($3.42) vs eu-north-1=18g/0.08L ($1.64)
    GW->>Hydro: Dispatch 18KB JSON Scene Manifest (hits pre-staged 3D/LoRA cache)
    Hydro-->>App: Render H.265 MP4s & push directly to Global CDN ($0.0003 egress/video)
    GW->>Audit: Append 5-min granular Location-Based & Market-Based Scope 2 + WUE proof
```

---

## ④ 📊 Multi-Region Green AI Routing Comparison Matrix

| Evaluation Dimension | Option A: Single-Region Pinned (`us-east-1` / `eu-central-1` Peak) | Option B: Naive Carbon-Only Cross-Ocean Shift | Option C: SLA-Tiered MOER + WUE + 18KB Manifest Router (Recommended) |
| --- | --- | --- | --- |
| **Annual Scope 2 Emissions (`2,048× H100`)** | `14,820 tCO2e / yr` (Gas/Coal peaker load) | `6,140 tCO2e / yr` (`-58.6%`) | **`4,180 tCO2e / yr` (`-71.8%` physical reduction)** |
| **Annual Evaporative Water (`WUE`)** | `42.6 ML / yr` (`1.85 L/kWh` cooling towers) | `28.4 ML / yr` (hits arid solar `2.14 L/kWh`) | **`9.2 ML / yr` (`-78.4%`, free-air Nordic/Québec hydro)** |
| **Interactive Chat `p99 TTFT`** | `142 ms` (Local region) | `428 ms` (**SLA Breach!** `+285ms` ocean RTT) | **`138 ms` (Sync traffic 100% pinned to local edge)** |
| **Cross-Region Egress Cost** | `$12.0k / yr` | `$482.0k / yr` (**Severe!** Raw 4.8TB dataset copies) | **`$17.2k / yr` (`18 KB` JSON manifest dispatch, `-96.4%`)** |
| **Annual Net GPU + Carbon Savings** | `-$840k / yr` (On-Demand + carbon liability) | `+$310k / yr` (Spot savings eaten by egress) | **`+$2,480,000 / yr` (Hydro Spot arbitrage + zero egress)** |

---

## ⑤ 🧪 Interactive Workbench Demo & 7-Card Benchmark Deck

- **Interactive Workbench**: [`demos/ai-gateway-carbon-water-aware-geo-load-shifting-esg-finops-studio/`](../demos/ai-gateway-carbon-water-aware-geo-load-shifting-esg-finops-studio/index.html)
- **7-Card 4:5 Visual Summary SVG**: [`docs/benchmarks/ai-gateway-carbon-water-aware-geo-load-shifting-esg-finops/summary-visual.svg`](benchmarks/ai-gateway-carbon-water-aware-geo-load-shifting-esg-finops/summary-visual.svg)
- **Measured Evaluation Data**: [`docs/benchmarks/ai-gateway-carbon-water-aware-geo-load-shifting-esg-finops/summary.json`](benchmarks/ai-gateway-carbon-water-aware-geo-load-shifting-esg-finops/summary.json)

![Enterprise Carbon- & Water-Aware AI Gateway Router 7-Card Deck](benchmarks/ai-gateway-carbon-water-aware-geo-load-shifting-esg-finops/summary-visual.svg)

---

## ⑥ 🛠️ Enterprise Green AI Gateway Review Checklist

- [ ] **Sync vs. Async Traffic Isolation**: Are `SLA < 200ms` interactive endpoints strictly pinned to local edge regions while only `SLA ≥ 4h` batch queues participate in cross-region shifting?
- [ ] **5-Minute Marginal Carbon (`MOER`) Feed**: Is the router consuming real-time 5-minute marginal emissions (`WattTime` / `Electricity Maps`) rather than static annual grid averages?
- [ ] **Wet-Bulb `WUE` & Watershed Guardrail**: Does the routing objective penalize high evaporative water consumption (`WUE > 1.0 L/kWh`) in drought-stressed basins?
- [ ] **Zero-Egress Manifest Dispatch**: Are base checkpoints and LoRA adapters pre-replicated to green regions so cross-region dispatch payloads stay `≤ 32 KB`?
- [ ] **CSRD / GHG Protocol Dual Ledger**: Does every completed batch job emit a tamper-evident 5-minute timestamped `Location-Based` and `Market-Based` carbon + water certificate?
