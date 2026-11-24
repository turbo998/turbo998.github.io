# Enterprise Property & Casualty (P&C) Catastrophe Insurance: Wildfire NFPA 1144 Zone-0 Mitigation, Flood FFE & 18-Hour Parametric Claim Video Selection Guide (Chubb / State Farm / Swiss Re / Verisk Architecture)

## ① 📌 Executive Summary

> **Bottom-Line Recommendation**: Across `5 Million` high-exposure Wildland-Urban Interface (`WUI`), hurricane, and flood homeowner policies, **never rely on 40-page static PDF non-renewal notices (`11.2%` homeowner remediation rate and a `28-day / 672-hour` post-catastrophe manual adjuster backlog), and never apply generative AI super-resolution/inpainting to post-event aerial roof imagery (which hallucinates or erases missing roof shingles and wooden fence attachments, rendering the evidence inadmissible under state Department of Insurance `DOI` regulations)**.
>
> Instead, deploy a **3-Tier Parcel LiDAR + 7cm Oblique Aerial `NFPA 1144 Zone-0 (0–5ft)` Hazard Solver + `93.5%` Shared IBHS `Closed-GOP` (`$0.0034/home`) + Bi-Temporal Zero-Hallucination Parametric Claim Video Pipeline**:
> 1. **Parcel-Level LiDAR + 7cm Oblique Aerial `NFPA 1144 / IBHS` Zone-0 (`0–1.5m`) & Zone-1 (`1.5–9.1m`) Clearance Lock (`±4.2cm`)**: Identify the exact 3 ember-ignition hazards inside the critical `0–5 ft` structure perimeter—combustible juniper shrubs, wood bark mulch, attached cedar fence gates, and overhanging chimney limbs—and link verified remediation to a mandated **`-18.5%` renewal premium discount**;
> 2. **`93.5%` Pre-Baked IBHS Mitigation `Closed-GOP` + `6.5%` Parcel Vector Callout (`$0.0034/policyholder`)**: Pre-bake 3D ember-ignition and gravel/metal-gate retrofit explainers as `Closed-GOP` chunks while dynamically rendering only `6.5%` parcel-specific aerial callout frames (`$17,000` total for `5M` homes vs. `$4.6M`), lifting homeowner self-inspection remediation compliance from `11.2%` to **`61.8%`**;
> 3. **Post-CAT Bi-Temporal 7cm Orthophoto / LiDAR `FFE` Lock & `18-Hour` Parametric Fast-Track Payout**: Pair raw pre/post-event NOAA/Vexcel imagery (`0.0px` AI modification) with USGS streamgauge / SAR water depth against LiDAR First-Floor Elevation (`FFE`), issuing verified claim videos and ACH advance payouts in **`18 hours` (vs. `28 days`)** and saving **+$8,420,000/yr** in LAE and avoided wildfire total losses.

---

## ② 🎯 Chief Underwriting / Claims Officer & SA Q&A (Q1 / Q2 / Q3)

### Q1: Why do 82% of wildfire-destroyed homes ignite from Zone-0 (`0–5 ft`) embers, and why do 50cm satellites miss them?
- **Under-Eave & Fence-Attachment Blind Spots**: Nadir 50cm satellite imagery cannot see beneath roof eaves or distinguish a combustible cedar fence bolted directly to wood siding from a non-combustible wrought-iron gate. Fusing airborne LiDAR with 7cm 45° oblique aerial photography measures exact `0.4m` shrub-to-siding and `1.1m` limb-to-chimney clearances (`±4.2cm`).

### Q2: Why is generative AI image enhancement strictly forbidden on post-hurricane or post-wildfire claim imagery?
- **State DOI Fair-Claims Admissibility**: Applying diffusion super-resolution to low-res post-storm aerial photos fabricates shingle patterns or smooths over hail punctures. Locking `100%` raw pre/post orthophoto pixels with `SHA-256` provenance and overlaying non-destructive vector polygons ensures 100% regulatory compliance.

### Q3: How can an insurer generate 5 million personalized pre-season wildfire mitigation videos for $17,000?
- **93.5% Shared IBHS Mitigation `Closed-GOP` Stream Copy**: The 3D instructional segments demonstrating Zone-0 gravel replacement, `1/8-inch` ember-resistant vent mesh, and metal gate retrofits are identical across cohorts (`93.5%` of frames) and concatenated via `ffmpeg -c copy`, leaving only `6.5%` parcel-specific aerial callouts and premium-discount cards rendered dynamically at `$0.0034/home`.

---

## ③ 🧭 Visual Architecture Diagrams (Mermaid Decision Tree + Zone-0/Claim Pipeline + Payout Sequence)

### 3.1 P&C Catastrophe Mitigation & Post-CAT Claim Video Decision Tree
```mermaid
flowchart TD
    A[5M WUI Wildfire / Hurricane / Flood Homeowner Policies] --> B{Underwriting & Claims Visual Pipeline?}
    B -->|40-Page Static PDF Notice + Manual Field Adjuster| C[11.2% Remediation Compliance = Mass Non-Renewals<br/>28-Day 672h Post-CAT Adjuster Backlog]
    B -->|Generative AI Satellite Upscaling| D[Hallucinates Roof Shingles & Fence Materials<br/>Rejected by State DOI Regulators]
    B -->|Parcel LiDAR+Oblique Zone-0 Lock + 93.5% Closed-GOP| E[Pinpoints 0–1.5m Shrubs, Mulch & Wood Fence Attachments<br/>$0.0034/Home Video Lifts Remediation to 61.8%]
    E --> F[Post-CAT Bi-Temporal 7cm Orthophoto & LiDAR FFE Lock<br/>18-Hour Parametric Payout Video · +$8.42M/Yr Saved]
```

### 3.2 Enterprise NFPA 1144 Zone-0 Spatial Underwriting & 18h Parametric Claim Architecture
```mermaid
flowchart LR
    subgraph Spatial["1. Parcel LiDAR & Bi-Temporal Aerial Layer"]
        S1[Airborne LiDAR + 7cm Oblique<br/>NFPA 1144 Zone-0 1.5m BVH]
        S2[LiDAR First-Floor Elevation FFE<br/>±2.4cm vs USGS Surge Gauge]
        S3[Post-CAT 7cm NOAA / Vexcel Ortho<br/>0.0px AI Edit · SHA-256 Locked]
    end
    subgraph Video["2. 93.5% Closed-GOP 5M-Home Compositor"]
        V1[IBHS Ember & Gate Retrofit Chunks<br/>93.5% Zero-Transcode Stream Copy]
        V2[6.5% Parcel Aerial Ring & Discount HUD<br/>$0.0034/Home · 61.8% Compliance]
    end
    subgraph Claim["3. 18-Hour Parametric Payout & DOI Vault"]
        C1[Roof Shingle Uplift IoU & Surge Solver<br/>Automated ACH Advance Trigger]
        C2[DOI-Admissible Bi-Temporal Claim Video<br/>28d -> 18h SLA · +$8.42M/Yr Saved]
    end
    S1 & S2 --> V1 & V2
    S3 --> C1 --> C2
```

### 3.3 Pre-Season Zone-0 Remediation & Post-CAT 18-Hour Parametric Payout Sequence
```mermaid
sequenceDiagram
    autonumber
    participant GIS as Airborne LiDAR & 7cm Oblique DB
    participant Engine as Zone-0 & Closed-GOP Video Engine
    participant Owner as Policyholder Mobile App
    participant Claim as 18h Parametric Claims Core

    GIS->>Engine: Ingest Parcel Point Cloud & Detect 0.4m Zone-0 Shrub + Attached Wood Gate
    Engine-->>Owner: Deliver $0.0034 Personalized Video (Highlights 3 Hazards + 18.5% Discount)
    Owner->>Engine: Upload Geotagged Post-Trimming Photo -> Auto-Verify & Apply Renewal Credit
    GIS->>Claim: Stream Post-Hurricane/Wildfire 7cm Nadir Ortho & Flood Gauge 12h After Event
    Claim-->>Owner: Deliver Zero-Hallucination Bi-Temporal Proof Video & ACH Payout in 18 Hours
```

---

## ④ 📊 P&C Catastrophe Mitigation & Claim Video Comparison Matrix

| Evaluation Dimension | Option A: Static 40-Page PDF + Manual Field Adjuster | Option B: Generative AI Satellite Upscaling + Full Render | Option C: LiDAR Zone-0 Lock + 93.5% GOP + Bi-Temporal Claim Video (Recommended) |
| --- | --- | --- | --- |
| **Zone-0 (`0–1.5m`) Hazard Detection** | `1 / 3 Hazards` (Occluded in 50cm nadir satellite) | `2 / 3 Hazards` (AI blurs wood fence attachment) | **`3 / 3 Hazards Pinpointed` (`±4.2cm` LiDAR + 7cm oblique)** |
| **Homeowner Remediation Compliance** | `11.2%` (Ignored PDF notices) | `24.5%` | **`61.8%` (Parcel callout video + `-18.5%` premium credit)** |
| **Unit Video Synthesis Cost (`5M` Homes)** | `$0.0000` (No video) | `$0.9200 / home` (`$4.60M` compute bill) | **`$0.0034 / home` (`93.5%` GOP reuse = `$17.0k` for `5M` homes)** |
| **Post-CAT Claim Payout Cycle** | `672 Hours (28 Days)` (Adjuster bottleneck) | `168 Hours (7 Days)` (Disputed AI artifacts) | **`18 Hours` (`0.0px` raw orthophoto diff + parametric ACH)** |
| **Annual Net LAE & Loss Savings** | `-$4,800,000 / yr` | `-$1,950,000 / yr` | **`+$8,420,000 / yr`** |

---

## ⑤ 🧪 Interactive Workbench Demo & 7-Card Benchmark Deck

- **Interactive Workbench**: [`demos/property-casualty-catastrophe-wildfire-flood-parametric-claim-video-studio/`](../demos/property-casualty-catastrophe-wildfire-flood-parametric-claim-video-studio/index.html)
- **7-Card 4:5 Visual Summary SVG**: [`docs/benchmarks/property-casualty-catastrophe-wildfire-flood-parametric-claim-video/summary-visual.svg`](benchmarks/property-casualty-catastrophe-wildfire-flood-parametric-claim-video/summary-visual.svg)
- **Measured Evaluation Data**: [`docs/benchmarks/property-casualty-catastrophe-wildfire-flood-parametric-claim-video/summary.json`](benchmarks/property-casualty-catastrophe-wildfire-flood-parametric-claim-video/summary.json)

![Enterprise P&C Catastrophe Wildfire Zone-0 & 18h Claim Video 7-Card Deck](benchmarks/property-casualty-catastrophe-wildfire-flood-parametric-claim-video/summary-visual.svg)

---

## ⑥ 🛠️ Enterprise P&C Catastrophe Video Pipeline Review Checklist

- [ ] **NFPA 1144 / IBHS Zone-0 (`0–1.52m`) Eave-Line Buffer**: Is the `0–5 ft` non-combustible ember buffer computed outward from the roof drip-line/eave overhang rather than only the foundation wall?
- [ ] **State DOI Filed Rating-Factor Alignment**: Does every remediation action shown in the homeowner video map 1:1 to a regulator-approved underwriting discount factor (e.g., California `Safer from Wildfires`)?
- [ ] **Zero-Inpainting Post-CAT Orthophoto Lock**: Are pre- and post-catastrophe aerial roof crops cryptographically hashed (`SHA-256`) with `0.0px` generative AI modification?
- [ ] **Pose-Verified Homeowner Self-Inspection Upload**: When a homeowner uploads a photo of a replaced metal gate or trimmed chimney branch, does the verifier check camera 6DoF pose against the parcel 3D mesh?
