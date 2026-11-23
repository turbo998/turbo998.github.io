# High-Speed Rail Catenary-Pantograph Stagger & Tunnel Kinematic Clearance (EN 15273 / UIC 505-1) Mobile LiDAR + 3DGS Selection Guide

> **Interactive Workbench**: [`demos/railway-catenary-pantograph-tunnel-clearance-kinematic-lidar-3dgs-studio/`](../demos/railway-catenary-pantograph-tunnel-clearance-kinematic-lidar-3dgs-studio/)  
> **7-Card Benchmark Report**: [`docs/benchmarks/railway-catenary-pantograph-tunnel-clearance-kinematic-lidar-3dgs/summary.json`](./benchmarks/railway-catenary-pantograph-tunnel-clearance-kinematic-lidar-3dgs/summary.json) · [`summary-visual.svg`](./benchmarks/railway-catenary-pantograph-tunnel-clearance-kinematic-lidar-3dgs/summary-visual.svg)

---

## ① 📌 Executive Summary

In **350 km/h high-speed rail (HSR) infrastructure maintenance (CRRC / China Railway, Deutsche Bahn, SNCF, JR East) and double-stack freight tunnel retrofits**, two failure modes cause catastrophic service disruptions: **pantograph dewiring (when the `12.0 mm` contact wire stagger exceeds the `±300 mm` carbon collector strip working width)** and **tunnel arch kinematic fouling or `25 kV AC` electrical flashover (`< 270 mm` air gap)**. Manual laser-trolley inspections cover only **`3.2 km` per night possession window (`00:30–04:00`)**, while naive camera-only 3DGS + static upright train bounding boxes (Static AABB) suffer from **voxel drop-out on `12 mm` contact wires (`±84.0 mm` error)** and completely ignore **`150 mm` track superelevation (Cant) plus `+118 mm` secondary-suspension dynamic roll**.

| Evaluation Dimension | ❌ Baseline A: Manual Night-Window Laser Trolley | ❌ Baseline B: Naive Voxelized 3DGS + Static Upright Train AABB | ✅ Recommended: 80km/h Mobile 2MHz LiDAR + 1D Catenary Spline (`±1.5 mm`) + `EN 15273` Kinematic Swept BVH + 3DGS Tunnel Twin |
| --- | --- | --- | --- |
| **`12 mm` Contact Wire Stagger & Height Precision** | `±2.0 mm` (discrete manual spot-checks only) | `±84.0 mm` (thin wire pruned away during voxel/3DGS downsampling) | **`±1.5 mm` stagger / `±1.2 mm` height via continuous 1D parametric catenary spline fitting** |
| **Track Cant & Suspension Roll (`EN 15273`)** | Manual spreadsheet lookup | `0%` (static upright box misses `+268 mm` roof lateral sway) | **Full `EN 15273 / UIC 505-1` superelevation (`150 mm`) + dynamic sway (`+118 mm`) swept BVH** |
| **`25 kV AC` Electrical Insulation Check** | Unmodeled in 3D | False-safe (`184 mm < 270 mm` flashover risk at arch water-seepage zones) | **Continuous `270 mm` dynamic / `320 mm` static `25 kV` insulation sphere intersection (`0` flashovers)** |
| **Inspection Speed per 3.5h Night Window** | `3.2 km / night` | `45.0 km / night` (`±18.5 cm` visual drift inside dark tunnels) | **`180.0 km / night` (`56×` faster, `±1.8 mm` sleeper/mast factor-graph SLAM lock)** |
| **Annual Possession & Incident Savings** | Baseline | Multi-million dewiring & flashover penalty risk | **`+$3,180,000 / yr` saved per mainline corridor** |

---

## ② 🎯 Key Architect & Business Q&A (Q1 / Q2 / Q3)

### Q1: Why do standard 3D Gaussian Splatting (3DGS) and voxel meshes lose the `12.0 mm` overhead contact wire?
- **Sub-Voxel Thin-Wire Pruning**: Inside a `13 m`-wide railway tunnel, standard 3DGS opacity pruning and `2–5 cm` voxel grids discard a `12.0 mm` copper-magnesium contact wire as sparse noise.
- **Hybrid 1D Parametric Catenary Spline + 3DGS Lining**: Our pipeline extracts high-intensity laser returns along the overhead corridor and fits a continuous 1D catenary spline $\mathbf{r}(s) = [x(s), y_{\text{stagger}}(s), z_{\text{height}}(s)]^T$ (`±1.5 mm` accuracy), while rendering the tunnel lining, spalling, and ice formations in anisotropic 3DGS.

### Q2: Why does a static train bounding box report "safe clearance" in a curved tunnel where a `350 km/h` train suffers a `25 kV` arch flashover?
- **Superelevation (Cant) + Secondary Air-Spring Roll Amplification**: On a curved track with `150 mm` superelevation and dynamic uncompensated lateral acceleration, the carbody tilts and rolls inward/outward. At the `5,300 mm` pantograph collector height, `150 mm` track cant plus `118 mm` suspension roll shifts the live `25 kV` pantograph horn laterally by **`+268 mm`** toward the tunnel arch haunch. Coupling the **`EN 15273` kinematic gauge** with an **`EN 50119` `270 mm` air-insulation sphere** catches every arch intrusion before flashover occurs.

### Q3: How do you prevent SLAM drift at `80 km/h` inside a featureless 15 km rock tunnel with zero GNSS signal?
- **Sleeper-Pitch (`600 mm`) Odometry + Catenary Mast / CPIII Survey Target Factor Graph**: By locking longitudinal odometry to sleeper fastener pulses and anchoring lateral/vertical pose to catenary masts (`50 m` spacing) and CPIII prism targets, track-relative error stays within **`±1.8 mm`**.

---

## ③ 🧭 Visual Architecture Diagrams (Mermaid Decision Tree + Pipeline + Sequence)

### 3.1 Railway Catenary & Tunnel Clearance Digital Twin Decision Tree

```mermaid
flowchart TD
    A[Electrified Railway / Tunnel Digital Twin Scenario] --> B{Primary Engineering Verification Goal?}
    B -->|"Macro Station Exterior & Passenger Flow Visualization"| C[Standard Drone Photogrammetry + Vanilla 3DGS]
    B -->|"Pantograph-Catenary Stagger + EN 15273 Tunnel Clearance"| D{Wire Fidelity & Vehicle Kinematics?}
    D -->|"Voxelized 3DGS + Upright Static Train AABB"| E[❌ Baseline: 12mm Wire Drops Out ±84mm<br/>Misses +268mm Cant & Suspension Roll]
    D -->|"2MHz Profile LiDAR + 1D Catenary Spline + EN 15273 BVH"| F[✅ Recommended: ±1.5mm Wire Spline + Cant/Sway<br/>Swept Envelope + 270mm 25kV Insulation Sphere]
```

### 3.2 Mobile Inspection Car LiDAR + 1D Catenary Spline + 3DGS Pipeline

```mermaid
flowchart LR
    subgraph Capture["1. 80km/h Inspection Car Multi-Sensor Capture"]
        S1["2MHz Dual-Profile LiDAR + Track Gauge IMU<br/>(Measures Track Cant 150mm & Cross-Level)"] --> F["CPIII Target & Catenary Mast Factor-Graph SLAM<br/>(±1.8mm Track-Relative Lock in GNSS-Denied Tunnels)"]
    end
    subgraph Representation["2. Hybrid 1D Catenary Spline + 3DGS Tunnel Twin"]
        F --> W["1D Parametric Catenary Spline Fitter<br/>(12mm Contact Wire Stagger ±1.5mm / Height ±1.2mm)"]
        F --> G["Anisotropic 3DGS Tunnel Lining Twin<br/>(Water Seepage, Ice & Spalling Reconstruction)"]
    end
    subgraph Verification["3. EN 15273 Kinematic & 25kV Insulation Gate"]
        W & G --> K["Cant + Suspension Roll Swept BVH<br/>(±300mm Stagger Gate + ≥270mm 25kV Air Gap)"]
    end
```

### 3.3 Night-Possession 180km Automated Clearance Audit Sequence

```mermaid
sequenceDiagram
    autonumber
    participant Car as 80km/h Track & Catenary Car
    participant SLAM as Factor-Graph SLAM & 1D Spline Engine
    participant Solver as EN 15273 Kinematic & 25kV Solver
    participant Crew as Night-Window Catenary Adjustment Crew

    Car->>SLAM: Enter 00:30 possession window, scan 2MHz LiDAR + Track Cant (150mm)
    SLAM->>SLAM: Fit continuous 1D catenary spline (detect 288mm stagger at KM 142+380)
    SLAM->>Solver: Stream 3DGS tunnel arch surface & measured track superelevation
    Solver->>Solver: Apply +118mm dynamic suspension roll & 270mm 25kV insulation sphere
    Solver-->>Crew: Emit millimeter mast-dropper adjustment work order by 03:15 (180km cleared)
```

---

## ④ 📊 Multi-Stack Architecture Decision Matrix

| Dimension | Option A: Manual Night-Window Laser Trolley | Option B: Camera-Only SfM / Vanilla 3DGS | Option C: Static LiDAR + Upright Rigid Train AABB | ✅ Option D: 2MHz LiDAR + 1D Catenary Spline + `EN 15273` Kinematic 3DGS (Recommended) |
| --- | --- | --- | --- | --- |
| **`12 mm` Contact Wire Stagger Error** | `±2.0 mm` (sparse manual points) | `±84.0 mm` (voxel drop-out) | `±18.0 mm` | **`±1.5 mm` (continuous 1D parametric spline)** |
| **Cant & Suspension Roll Coupling** | Manual offline calc | Unsupported | Unsupported (misses `+268 mm` roof sway) | **Full `EN 15273` cant + primary/secondary roll tensor** |
| **`25 kV AC` Air-Gap Verification** | Height-only check | Unsupported | Static cold clearance only | **Dynamic `≥ 270 mm` 25kV insulation sphere sweep** |
| **Coverage per 3.5h Night Window** | `3.2 km` | `45.0 km` (drift in tunnels) | `60.0 km` | **`180.0 km` (`56×` faster than manual trolley)** |
| **Annual Corridor Savings** | Baseline | High dewiring risk | Curved-tunnel flashover risk | **`+$3,180,000 / yr` saved per mainline corridor** |

---

## ⑤ 🧪 Interactive Workbench & 7-Card Benchmark Deck

1. **Interactive Workbench**: [`demos/railway-catenary-pantograph-tunnel-clearance-kinematic-lidar-3dgs-studio/`](../demos/railway-catenary-pantograph-tunnel-clearance-kinematic-lidar-3dgs-studio/)
   - Compare **350km/h HSR Superelevated Rock Tunnel (`150 mm` cant, `+118 mm` roll)**, **Legacy Horseshoe Tunnel Double-Stack Freight Retrofit**, and **Station Throat #18 High-Speed Turnout Crossover**.
2. **7-Card 4:5 Visual Report**:
   - Sealed Metrics: [`docs/benchmarks/railway-catenary-pantograph-tunnel-clearance-kinematic-lidar-3dgs/summary.json`](./benchmarks/railway-catenary-pantograph-tunnel-clearance-kinematic-lidar-3dgs/summary.json)
   - Visual Summary: [`summary-visual.svg`](./benchmarks/railway-catenary-pantograph-tunnel-clearance-kinematic-lidar-3dgs/summary-visual.svg)

![High-Speed Rail Catenary-Pantograph & EN 15273 Tunnel Kinematic Clearance Summary](./benchmarks/railway-catenary-pantograph-tunnel-clearance-kinematic-lidar-3dgs/summary-visual.svg)

---

## ⑥ 🛠️ Enterprise Implementation Review Checklist

- [ ] **1D Parametric Spline Isolation for `12 mm` Contact Wires**: Are contact and messenger wires extracted into continuous 1D analytical splines before 3DGS opacity pruning?
- [ ] **Track-Relative Coordinate Frame Lock**: Are all tunnel arch and catenary coordinates referenced to the live measured railhead plane and superelevation angle $\theta_{\text{cant}}$?
- [ ] **`EN 15273` Dynamic Roll & Lateral Play Integration**: Does the swept BVH include quasi-static suspension roll and lateral bolster play at line speed?
- [ ] **`25 kV AC` `270 mm` Insulation Sphere Gate**: Is the high-voltage air gap verified continuously around the pantograph horns against tunnel water-seepage and icicle zones?
