# Validation & Quality Gates Log

> 🌐 **Language / 语言**: [中文 (`validation.md`)](validation.md) | **English**

This document records the automated build checks, Blender 4.5 LTS MCP asset audits, browser end-to-end (Playwright E2E) visual gates, and live GitHub Pages deployment verification standards for `turbo998/generative-visual-lab`. All non-AI classical-mechanics and sensor-parameter formula benches have been purged; validation covers the **41 retained Generative Visual, Multimodal, 3D World Model, and Enterprise AIGC Pipeline demonstrations** alongside their bilingual architecture guides.

---

## 1. Core Verification Commands & Hard Budgets

Every architectural or documentation update landing on `main` must pass both the root and standalone Astra verification suites with zero errors:

```powershell
npm run check
npm --prefix demos\astra-planet run check
```

| Verification Suite | Coverage & Core Assertions | Performance / Payload Gate | Status |
| --- | --- | --- | --- |
| **Root TypeScript & Vitest Unit Suite** | `tsc --noEmit` + Vitest (`blender-assets.test.ts`, `motion.test.ts`, `flight.test.ts`, `landscape.test.ts`, `frame-budget.test.ts`, plus 31 Enterprise AIGC pipeline suites) | Exact byte-length, PNG header, and Blender MCP JSON transcript parity | **100% PASS** |
| **Root Production Build & Assembler** | Vite multi-page bundle + `scripts/assemble.mjs` (41 demos + research guides) + `scripts/render-faqs.mjs` (62 bilingual SA decision FAQs) | Zero broken links, zero missing static assets, self-contained offline CSP on all 7-Card benchmark decks | **100% PASS** |
| **Root Playwright E2E Suite** | Portal `1440px / 900px / 390px` zero horizontal overflow (`gallery.spec.ts`), Feitian flight/portraits/audio/reduced-motion (`visual.spec.ts`), Rocket launch phases/cameras/recovery (`rocket.spec.ts`) | **Feitian flight `p95 <= 33.3ms` (local) / `50.0ms` (CI software GL)**<br>**Rocket ascent `p95 <= 50.0ms` (local) / `66.7ms` (CI software GL)** | **100% PASS (`Feitian p95 ≈ 16.8ms`, `Rocket p95 ≈ 33.4ms`)** |
| **Astra TypeScript, Unit & E2E Suite** | `tsc --noEmit` + 13 Vitest unit tests + 14 Playwright E2E checks (NASA MOLA elevation parity, 4 inspection modes, landmarks, metric GLB reload, SHA-256 tamper rejection) | **Initial offline payload (`?noHd=1`) `< 6.0 MiB`**; strict separation of measured altimetry from artistic shading | **100% PASS (`~2.63 MiB < 6.0 MiB`)** |

---

## 2. Verification Highlights by Architectural Layer

### 2.1 Real-Time Procedural Scenery & Scientific Visualization (`feitian` & `astra-planet`)
- **Dunhuang Feitian (`demos/feitian/`)**: Verifies full flight trajectory and deterministic return-to-niche, pause consistency, bounded petal/ribbon pools, `prefers-reduced-motion` in-place reveal, `390px` mobile layout, keyboard navigation, opt-in WebAudio synthesis, and PNG capture. Layer-composited shadows and 2× offscreen figure caching hold steady-state 120-frame tail `p95` around `16.8ms` at `1440×1000`.
- **Astra Mars Lab (`demos/astra-planet/`)**: Verifies zero sample mismatch across NASA MOLA `1440×720` base and `4096×2048` HD packages, non-degenerate spherical meshes and seam-continuous normals, standalone metric `.glb` export/reload parity, WebGL context-loss recovery, and 100% offline execution with external network requests blocked (`evidence/online-stage-one.json`).

### 2.2 Blender 4.5 LTS MCP Hard-Surface Kit & Launch Complex (`rocket-launch`)
- **White Rocket Complex (`demos/rocket-launch/`)**: Verifies idle standby (no autoplay), 4-second pad ignition hold, umbilical swing-arm separation and liftoff, dual camera tracking, replay determinism, and circular porthole safe-frame projection bounds.
- **Per-Material Batching & Adaptive DPR**: Static pad geometry batching cuts draw calls from `142` down to `28–32`, with adaptive DPR (`0.65 / 0.4`) preserving geometry and interactivity on software-rendered CI runners (`evidence/online-stage-two.json`).

### 2.3 Multimodal Studios, 3D World Models & Enterprise AIGC Workbenches (38 Studios)
- **7 Frontier Multimodal & World Model Studios**: Covers `pelican-bicycle-arena`, `knowledge-explainer-studio`, `camera-4d-director`, `audiovisual-foley-studio`, `physgaussian-world-studio`, `neural-relight-director`, and `worldmem-action-director`.
- **31 Enterprise AIGC Production & FinOps Workbenches**: Each workbench ships with interactive architecture trade-off controls, sealed `report.json` telemetry, self-contained bilingual 7-Card `4:5` visual benchmark decks (`test-report-cards.html` / `.zh.html`), and bilingual SA selection FAQs.
- **Provenance & Hygiene**: Public artifacts are scanned for zero private filesystem paths, session IDs, or credentials, and explicitly label `measured`, `synthetic`, and `not_measured` boundaries.
