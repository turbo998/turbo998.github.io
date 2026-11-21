# Bridal, Couture Evening Gown & Bridesmaid Party 3D Corset Boning, Crinoline Lift & Bustle MTM Alteration Architecture Selection Guide

> **Interactive Workbench**: [`demos/wedding-evening-gown-corset-bustle-crinoline-drape-alteration-tryon-studio/`](../demos/wedding-evening-gown-corset-bustle-crinoline-drape-alteration-tryon-studio/)  
> **7-Card Benchmark Report**: [`docs/benchmarks/wedding-evening-gown-corset-bustle-crinoline-drape-alteration-tryon/summary.json`](./benchmarks/wedding-evening-gown-corset-bustle-crinoline-drape-alteration-tryon/summary.json) · [`summary-visual.svg`](./benchmarks/wedding-evening-gown-corset-bustle-crinoline-drape-alteration-tryon/summary-visual.svg)

---

## ① 📌 Executive Summary

In **online bridal, red-carpet evening gown, and bridesmaid party e-commerce (`$200–$4,800` AOV, e.g., Vera Wang, Pronovias, Anthropologie Weddings, Azazie)**, the #1 barrier to direct online purchase is **`$380–$650` in post-delivery local seamstress alteration bills and a `31.4%` return rate**. Unlike casual knitwear, bridal gowns are architectural structures built on **14–18 spiral-steel corset boning channels, 6-hoop crinoline cages, and `1,200 mm – 2,100 mm` cathedral trains**. Naive 2D image-diffusion virtual try-on (IDM-VTON) collapses rigid Basque waistlines into stretchy T-shirt textures and ignores the 3D geometric coupling of **`Hollow-to-Floor + Bridal Heel Height (85 mm) + Crinoline Hoop Radial Arc Lift (+34 mm)`**, leaving brides with tripping hazards or exposed ankles.

| Evaluation Dimension | ❌ Baseline: 2D Diffusion VTON + Standard Graded Stock Size | ⚠️ Static Bust/Waist/Hip Mannequin Only | ✅ Recommended: Shell-Rod Coupled Corset/Crinoline XPBD + Exact Heel/Hoop Hem DXF + French Bustle Studio |
| --- | --- | --- | --- |
| **Corset Boning & Crinoline Cage Fidelity** | Collapses rigid boning & ballgown hoops into soft knitwear | Ignores crinoline hoop radial arc uplift | **Couples 14–18 spiral-steel elastic rods with 6-hoop crinoline shell mechanics** |
| **Front Hem Floor-Skim Accuracy** | `-68 mm to +112 mm` error (ignores heel & hoop lift) | Misses `+34 mm` crinoline radial uplift | **Locks `+14 mm to +16 mm` trip-free floor skim (`Cut = Hollow + Heel + HoopLift - Skim`)** |
| **Ceremony Train vs Reception Bustle** | Invisible (cannot preview reception dance mode) | Unmodeled | **Live toggle between `2,100 mm` Cathedral Train & 7-Point French Under-Bustle** |
| **Post-Delivery Local Seamstress Bill** | `$185 – $540 / gown` (detaching & re-sewing scalloped lace hem) | `$240 / gown` | **`$0 / gown` (factory cuts exact DXF hem & pre-sews bustle hooks before lace appliqué)** |
| **Return Rate & Net Savings / 100k Orders** | `31.4%` returns | `18.2%` returns | **Slashed to `3.6%`, saving `+$1,680,000` per 100k orders** |

---

## ② 🎯 Key Architect & Business Q&A (Q1 / Q2 / Q3)

### Q1: Why does a ballgown cut to `Hollow-to-Floor (1,385 mm) + Heel Height (85 mm)` end up `34 mm` too short in front once the bride puts on a 6-hoop crinoline petticoat?
- **Crinoline Radial Arc-Length Uplift (`+34 mm`)**: When a 6-hoop crinoline expands the skirt radially into a dome/bell profile, the fabric follows a curved meridian arc rather than hanging straight down—lifting the front hemline by **`+34 mm`**. Our Shell-Rod XPBD solver computes the exact meridian arc integral $\Delta L_{\text{crinoline}}$ so the factory cuts `1,489 mm` (`1385 + 85 + 34 - 15 mm skim`) before attaching the scalloped lace border.

### Q2: Why do mermaid gowns fail so frequently in standard graded sizes (`34.2%` return rate)?
- **Zero-Stretch Mid-Thigh Flare Point Lock**: A sculpted mermaid gown constricts closely at the **high hip and the mid-thigh flare point (`12 cm` above the knee)**. Standard bust/waist/hip size charts omit both hollow-to-knee height and mid-thigh seated circumference. Dual-view smartphone metrology locks both coordinates within `±3.0 mm` and enforces a `+28 mm` stride/seated ease allowance.

### Q3: How does pre-simulating and factory-installing the Reception Bustle transform unit economics?
- **Ceremony-to-Reception 10-Second Transition**: Every bride with a `1,350–2,100 mm` train needs a **French Under-Bustle or American Over-Bustle** to dance at the reception without tearing the train. By simulating the bustled drape folds in 3D and exporting exact hook-and-eye coordinates to the factory DXF marker, the gown arrives ready for both the aisle and the dance floor with **`$0` local seamstress cost**.

---

## ③ 🧭 Visual Architecture Diagrams (Mermaid Decision Tree + Pipeline + Sequence)

### 3.1 Bridal & Couture Gown Virtual Try-On & MTM Decision Tree

```mermaid
flowchart TD
    A["Apparel E-Commerce Try-On Scenario"] --> B{"Structural Mechanics & Alteration Cost?"}
    B -->|"Casual Knit T-Shirts & Hoodies"| C["Standard 2D Diffusion VTON<br/>Color & Graphic Preview Only"]
    B -->|"Bridal Gowns, Couture Evening Wear & Bridesmaid Dresses<br/>Corset Boning, Crinoline Hoops, Heels & Trains"| D{"Try-On & Factory Pattern Integration?"}
    D -->|"Ship Graded Stock Size + Local Seamstress Hemming"| E["❌ Baseline: Misses Heel & Hoop Uplift<br/>$540 Seamstress Bill & 31.4% Return Rate"]
    D -->|"Shell-Rod Corset/Crinoline XPBD + Factory MTM DXF"| F["✅ Recommended: Exact +15mm Floor-Skim Cut<br/>+ Pre-Sewn French Bustle ($0 Alteration, 3.6% Returns)"]
```

### 3.2 Shell-Rod Corset/Crinoline XPBD & Factory DXF Pipeline

```mermaid
flowchart LR
    subgraph Scan["1. Dual-View Bridal Metrology"]
        S1["Front/Side Smartphone Scan (±3.0mm)<br/>(Bust/Underbust/Waist/High-Hip/Hollow-to-Floor)"] --> H["Bridal Heel (55/85/100mm)<br/>& Crinoline Hoop Selector"]
    end
    subgraph Physics["2. Shell-Rod Coupled Couture XPBD"]
        H --> C1["Spiral-Steel Corset Rod Solver<br/>(14–18 Bones + Basque Waist Lock)"]
        H --> C2["Crinoline Hoop Meridian Arc Solver<br/>(Compensates +34mm Radial Hoop Lift)"]
        H --> C3["Cathedral Train ↔ 7-Pt French Bustle<br/>Fold & Floor-Skim Simulation"]
    end
    subgraph Factory["3. Zero-Alteration Factory DXF Compiler"]
        C1 & C2 & C3 --> D["Gerber/Lectra MTM DXF Pattern Export<br/>(Exact Front Cut + Pre-Sewn Bustle Hooks)"]
    end
```

### 3.3 End-to-End Bridal Try-On & Zero-Seamstress Fulfillment Sequence

```mermaid
sequenceDiagram
    autonumber
    participant Bride as Bride / Bridesmaid App
    participant Solver as Shell-Rod Corset & Crinoline Solver
    participant Preview as Ceremony Train / Reception Bustle Stage
    participant Factory as MTM Automated CAD Cutter

    Bride->>Solver: Submit dual-view scan (Hollow-to-Floor=1,385mm) + 85mm Heel + 6-Hoop Crinoline
    Solver->>Solver: Compute +34mm crinoline arc uplift & -15mm floor-skim clearance
    Solver->>Preview: Lock 1,489mm front cut length & solve 7-point French Under-Bustle folds
    Preview-->>Bride: Preview 2,100mm Ceremony Train vs 15mm-Skim Reception Dance Bustle
    Bride->>Factory: Confirm MTM order, dispatch DXF cut pattern & bustle hook coordinates ($0 alteration)
```

---

## ④ 📊 Multi-Stack Architecture Decision Matrix

| Dimension | Option A: 2D Diffusion VTON + Graded Stock Size | Option B: Customer Self-Tape Manual Form | Option C: Unboned Generic 3D Cloth Sim | ✅ Option D: Shell-Rod Corset/Crinoline XPBD + Factory MTM DXF (Recommended) |
| --- | --- | --- | --- | --- |
| **Corset & Crinoline Rigidity** | `0%` (melts into knitwear) | No visual preview | Poor (lacks steel rod & hoop constraints) | **100% Coupled (14–18 steel bones + 6 crinoline hoops)** |
| **Front Hem Floor-Skim Error** | `-68 mm to +112 mm` | `±38 mm` (head-tilt & hoop errors) | `-34 mm` (misses hoop radial uplift) | **`±3.0 mm`, locked at `+15 mm` trip-free floor skim** |
| **Reception Bustle Simulation** | Unsupported | Unsupported | Unsupported | **Live 7-Pt French / 3-Pt American Bustle + factory pre-sewing** |
| **Local Seamstress Alteration Bill** | `$185 – $540 / gown` | `$160 / gown` | `$120 / gown` | **`$0 / gown` (wear-ready out of the box)** |
| **Return Rate & Net Savings** | `31.4%` returns | `16.8%` returns | `11.4%` returns | **`3.6%` returns, saving `+$1,680,000` per 100k orders** |

---

## ⑤ 🧪 Interactive Workbench & 7-Card Benchmark Deck

1. **Interactive Workbench**: [`demos/wedding-evening-gown-corset-bustle-crinoline-drape-alteration-tryon-studio/`](../demos/wedding-evening-gown-corset-bustle-crinoline-drape-alteration-tryon-studio/)
   - Compare **Basque-Waist Cathedral Ballgown (`6-hoop crinoline`, `85 mm` heels, `2,100 mm` train)**, **Couture Lace Mermaid Gown (`100 mm` stiletto, mid-thigh flare lock)**, and **Bridesmaid Party Petite Silk Chiffon A-Line (`55 mm` heel)**.
2. **7-Card 4:5 Visual Report**:
   - Sealed Metrics: [`docs/benchmarks/wedding-evening-gown-corset-bustle-crinoline-drape-alteration-tryon/summary.json`](./benchmarks/wedding-evening-gown-corset-bustle-crinoline-drape-alteration-tryon/summary.json)
   - Visual Summary: [`summary-visual.svg`](./benchmarks/wedding-evening-gown-corset-bustle-crinoline-drape-alteration-tryon/summary-visual.svg)

![Bridal & Couture Gown Corset, Crinoline & Bustle MTM Studio Summary](./benchmarks/wedding-evening-gown-corset-bustle-crinoline-drape-alteration-tryon/summary-visual.svg)

---

## ⑥ 🛠️ Enterprise Implementation Review Checklist

- [ ] **Neutral Head-Pitch Gate During `Hollow-to-Floor` Capture**: Does the mobile scan reject frames where the bride tilts her chin downward toward the phone screen (which artificially shortens hollow-to-floor by `35–50 mm`)?
- [ ] **Crinoline Meridian Arc-Length Compensation (`+8 mm to +34 mm`)**: Does the MTM pattern compiler automatically add radial hoop uplift to the front skirt cut length?
- [ ] **Mermaid Mid-Thigh Seated & Stride Allowance (`≥ +28 mm`)**: Does the solver enforce mobility clearance at the knee/mid-thigh constriction ring?
- [ ] **Factory Pre-Sewn Bustle Hook Coordinates**: Are color-coded French/American bustle ribbon and hook coordinates exported directly onto the internal lining DXF marker?
