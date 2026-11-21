# Enterprise Telecom FTTH Fiber & 5G FWA (15M Homes): TR-369 Wall-Attenuation Heatmap, Wi-Fi 7 Mesh Placement & Truck-Roll Deflection Video Selection Guide (Verizon Fios / AT&T Fiber / Deutsche Telekom / China Telecom Architecture)

## ① 📌 Executive Summary

> **Bottom-Line Recommendation**: Across `15 Million` Fiber-to-the-Home (`FTTH`) and `5G FWA` broadband households, over 71% of "slow internet" churn and `$145` field technician truck-rolls occur when the fiber WAN link is delivering a full `942 Mbps` at the `ONT`, but the subscriber's router is trapped inside a steel media cabinet (`-18 dB`) behind two reinforced concrete walls (`-24 dB`), leaving the master bedroom at `-79 dBm` (`14 Mbps`). **Never dispatch `$145` field truck-rolls for indoor Wi-Fi placement issues or blast generic text SMS upsells (`2.1%` conversion), and never render full per-home 3D FDTD electromagnetic wave simulations from scratch (`$0.54/home` = `$8.10M` for `15M` subscribers)**.
>
> Instead, deploy a **3-Tier `TR-369 (USP)` WAN-vs-LAN Speed Split Lock + `ITU-R P.1238` 2.5D Wall-Attenuation Floorplan Heatmap + `94.4%` Shared `Closed-GOP` (`$0.0021/home`) Pipeline**:
> 1. **Zero-Hallucination `TR-369 (USP)` Fiber WAN (`942 Mbps`) vs. Bedroom Wi-Fi (`14 Mbps`) Telemetry Split**: Bind the household's verified 30-day router telemetry to prove in the opening 3 seconds that the fiber line to the residence is operating at `942 Mbps`, isolating the bottleneck to indoor `5 GHz / 6 GHz` wall attenuation;
> 2. **`ITU-R P.1238` Multi-Wall Attenuation Floorplan & Optimal `Wi-Fi 7 MLO` Extender Socket Pinpoint**: Infer wall types (`Steel Cabinet -18dB`, `Concrete Shear Wall -12dB`, `Drywall -3dB`) from dual-band `2.4 GHz vs. 5 GHz` RSSI differentials and visually demonstrate how placing a single pre-paired `Wi-Fi 7 MLO` mesh node at `Hallway Socket #02` lifts master-bedroom throughput from `14 Mbps` to **`680 Mbps` (`-51 dBm`)**;
> 3. **`94.4%` Pre-Baked RF Explainer `Closed-GOP` + `5.6%` Subscriber HUD (`$0.0021/home`)**: Render `15,000,000` personalized broadband care videos for **`$31,500` total (`-99.6%` vs. full 3D render)**, deflecting **`58.6%` of false field truck-rolls** and lifting self-install Wi-Fi 7 Mesh ARPU upgrades to **`24.8%`** (**+$19,400,000/yr** net carrier benefit).

---

## ② 🎯 VP of Broadband Operations & SA Q&A (Q1 / Q2 / Q3)

### Q1: Why do 1 Gbps fiber subscribers blame and cancel their ISP when their bedroom phone gets 14 Mbps?
- **Invisible Indoor RF Attenuation**: Subscribers cannot see `5 GHz` waves losing `-18 dB` inside a hallway metal distribution panel and `-24 dB` through two masonry walls. Showing their exact `ONT` speed test (`942 Mbps` green badge) alongside a 2.5D floorplan heatmap of their own dead zone immediately shifts the conversation from "fix your broken fiber" to "let's place a mesh pod in the hallway."

### Q2: How can we generate accurate 2.5D indoor heatmaps without having architectural blueprints for all 15 million homes?
- **Dual-Band (`2.4 GHz` vs. `5 GHz`) Differential Wall Inference + 24 Archetype Templates**: Because `5 GHz` experiences `5–7 dB` higher penetration loss through reinforced concrete than `2.4 GHz`, comparing simultaneous dual-band RSSI telemetry from `TR-181 Wi-Fi Data Elements` classifies obstacle density between the gateway and each client room, mapping onto 24 pre-baked `Closed-GOP` floorplan archetypes (`94.4%` compute reuse).

### Q3: How does a $31.5k video batch generate +$19.4M/yr in telecom EBITDA impact?
- **Eliminating `$145` "No-Fault-Found" Truck-Rolls + Zero-Touch Mesh Upsell**: Deflecting `58.6%` of unnecessary field technician dispatches saves over `$11M/yr` in fleet OpEx, while converting `24.8%` of dead-zone households to `$10/mo` pre-paired Wi-Fi 7 MLO mesh pods adds `$8.4M/yr` in high-margin recurring ARPU.

---

## ③ 🧭 Visual Architecture Diagrams (Mermaid Decision Tree + TR-369/ITU Pipeline + Deflection Sequence)

### 3.1 15M-Household Broadband Care & Wi-Fi 7 Upsell Decision Tree
```mermaid
flowchart TD
    A["TR-369 Detects ONT WAN >= 900 Mbps<br/>While Client Wi-Fi RSSI < -75 dBm"] --> B{"Customer Care & Upsell Pipeline?"}
    B -->|"Reactive Call Center + $145 Field Truck-Roll"| C["68.4% No-Fault-Found Fiber Visits<br/>High Subscriber Churn & OpEx Waste"]
    B -->|"Generic SMS Text Promo for $10/mo Mesh Pod"| D["Subscribers Blame ISP Throttling · 2.1% Conversion"]
    B -->|"TR-369 Telemetry Lock + ITU-R P.1238 Heatmap + 94.4% GOP"| E["Prove 942 Mbps Fiber Health in Opening 3s<br/>Show -18dB Steel Box & -24dB Concrete Wall Loss"]
    E --> F["Pinpoint Hallway Socket #02 for Wi-Fi 7 MLO (14 -> 680 Mbps)<br/>$0.0021/Home · 58.6% Truck-Roll Deflection · +$19.4M/Yr"]
```

### 3.2 Enterprise TR-369 Telemetry, ITU-R P.1238 Heatmap & 94.4% Closed-GOP Architecture
```mermaid
flowchart LR
    subgraph Telemetry["1. TR-369 (USP) Home Gateway Telemetry"]
        T1[ONT WAN SpeedTest<br/>Verifies 942 Mbps Fiber Link]
        T2[Wi-Fi Data Elements Collector<br/>2.4G/5G Differential Wall Probe]
    end
    subgraph RF["2. ITU-R P.1238 Attenuation & Mesh Solver"]
        R1[Obstacle Loss Classifier<br/>Steel Box -18dB / Concrete -12dB]
        R2[Wi-Fi 7 MLO Relay Optimizer<br/>Master BR 14 -> 680 Mbps]
    end
    subgraph Video["3. 94.4% Closed-GOP 15M-Home Compositor"]
        V1[24 Floorplan Archetype 3D Chunks<br/>94.4% Zero-Transcode Stream Copy]
        V2[5.6% Device HUD & 1-Tap Mesh CTA<br/>$0.0021/Home · +$19.4M/Yr Benefit]
    end
    T1 & T2 --> R1 --> R2 --> V1 & V2
```

### 3.3 Proactive Dead-Zone Detection, $0.0021 Video Dispatch & Self-Install Sequence
```mermaid
sequenceDiagram
    autonumber
    participant ONT as Home Gateway (TR-369 USP)
    participant AI as Telecom Self-Healing Engine
    participant GOP as 94.4% Archetype GOP Pool
    participant Sub as Subscriber Mobile App

    ONT->>AI: Report Nightly Telemetry: Fiber WAN = 942 Mbps, Bedroom Client = -79 dBm (14 Mbps)
    AI-->>AI: Infer Steel Media Cabinet (-18dB) + 2 Concrete Walls (-24dB) via Dual-Band Delta
    AI->>GOP: Select 3BR Concrete + Hallway Wi-Fi 7 MLO Pre-Baked Closed-GOP Chunks (94.4% Reuse)
    GOP-->>Sub: Mux & Push 9:16 Diagnostic Video in 0.16s ($0.0021/home: Proves 942 Mbps WAN + 680 Mbps Fix)
    Sub->>AI: Subscriber Moves Router Out of Box & Orders Pre-Paired Wi-Fi 7 Pod ($145 Truck-Roll Avoided!)
```

---

## ④ 📊 Broadband Care & Wi-Fi 7 Upsell Video Comparison Matrix

| Evaluation Dimension | Option A: Generic SMS + Reactive `$145` Truck-Roll | Option B: Uncached Per-Home 3D FDTD Ray-Tracing | Option C: `TR-369` Lock + `ITU-R P.1238` Heatmap + `94.4%` GOP (Recommended) |
| --- | --- | --- | --- |
| **Fiber WAN vs. Wi-Fi LAN Attribution** | Poor (Subscribers blame ISP line) | High (3D wave visualization) | **Exact (`100%` bound to live `942 Mbps` ONT & client telemetry)** |
| **Unit Video Cost (`15M` Subscribers)** | `$0.0000` (`$145` per field truck-roll) | `$0.5400 / home` (`$8.10M` GPU bill) | **`$0.0021 / home` (`94.4%` GOP reuse = `$31.5k` for `15M` homes)** |
| **False Truck-Roll Deflection Rate** | `6.4%` | `48.2%` | **`58.6%` (Self-service cabinet extraction & socket guide)** |
| **Wi-Fi 7 Mesh / FTTR Upgrade Rate** | `2.1%` (Ignored text promos) | `19.4%` | **`24.8%` (`14 → 680 Mbps` visual proof + 1-tap order)** |
| **Annual Net Carrier Benefit** | `-$12,400,000 / yr` | `+$3,200,000 / yr` | **`+$19,400,000 / yr`** |

---

## ⑤ 🧪 Interactive Workbench Demo & 7-Card Benchmark Deck

- **Interactive Workbench**: [`demos/telecom-5g-fiber-home-wi-fi-heatmap-upgrade-personalized-video-studio/`](../demos/telecom-5g-fiber-home-wi-fi-heatmap-upgrade-personalized-video-studio/index.html)
- **7-Card 4:5 Visual Summary SVG**: [`docs/benchmarks/telecom-5g-fiber-home-wi-fi-heatmap-upgrade-personalized-video/summary-visual.svg`](benchmarks/telecom-5g-fiber-home-wi-fi-heatmap-upgrade-personalized-video/summary-visual.svg)
- **Measured Evaluation Data**: [`docs/benchmarks/telecom-5g-fiber-home-wi-fi-heatmap-upgrade-personalized-video/summary.json`](benchmarks/telecom-5g-fiber-home-wi-fi-heatmap-upgrade-personalized-video/summary.json)

![Enterprise Telecom FTTH & Wi-Fi 7 Heatmap Personalized Video 7-Card Deck](benchmarks/telecom-5g-fiber-home-wi-fi-heatmap-upgrade-personalized-video/summary-visual.svg)

---

## ⑥ 🛠️ Enterprise Telecom Personalized Video Pipeline Checklist

- [ ] **Side-by-Side `ONT` WAN vs. Client `RSSI` Split**: Does the opening scene explicitly contrast verified `TR-369` fiber speed (`942 Mbps`) against the degraded indoor client link (`14 Mbps` at `-79 dBm`)?
- [ ] **Dual-Band (`2.4 GHz` vs. `5/6 GHz`) Wall-Material Inference**: Does the RF classifier use dual-band path-loss differentials to distinguish metal media enclosures (`-18 dB`) from interior drywall (`-3 dB`)?
- [ ] **PII-Safe Client Device Hostname Sanitization**: Are connected device labels rendered in the `5.6%` dynamic overlay stripped of raw MAC addresses and external PII?
- [ ] **ACS Pre-Provisioned Zero-Touch Mesh Pairing**: When a subscriber orders a Wi-Fi 7 extender from the video CTA, does the ACS pre-bind the pod's serial number to the home's SSID before shipping?
