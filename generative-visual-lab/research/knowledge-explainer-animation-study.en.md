# Knowledge-Explainer Animation Production Research Monograph: The `one-sentence-video` Engine & Reverse Engineering of Three Benchmark Short Videos

> 🌐 **Language / 语言**: [中文 (`knowledge-explainer-animation-study.md`)](knowledge-explainer-animation-study.md) | **English**  
> 🎮 **Interactive Studio**: [Knowledge Explainer Animation Studio (`demos/knowledge-explainer-studio/`)](../demos/knowledge-explainer-studio/) · [7-Card 4:5 Visual Evaluation Report (`test-report-cards.html`)](../demos/knowledge-explainer-studio/test-report-cards.html)

---

## Executive Summary

Technical and quantitative knowledge-explainer animations are undergoing a paradigm shift from manual After Effects keyframing and slide-deck screen recordings toward **declarative storyboard contracts + programmatic Canvas/SVG/GSAP rendering + quantitative visual density gates**. Conventional AI-generated technical videos consistently suffer from three failure modes:
1. **The "AI Tech Uniform"**: Unsolicited dark-blue backgrounds (`#0a0a1a`), cyan glowing grids (`#00f0ff`), and repetitive `back.out(1.7)` pop-in animations on every element;
2. **Slide-Deck Flatness & Freeze**: Text slides in during the first `0.5s` and remains completely static for the next `4.5s`, leaving over 60% of the viewport empty;
3. **Uncausal Stock Audio**: Generic stock `whoosh` sound effects slapped onto every cut without stereo directional panning or beat-grid alignment.

This monograph conducts a comprehensive reverse-engineering study and real-time 60FPS synthesis experiment combining the industrial-grade **`one-sentence-video` autonomous video generation engine (built on HyperFrames `0.7.87`)** with three viral benchmark knowledge-explainer short videos from Douyin and Bilibili:
- **Part I**: Dissects `one-sentence-video`'s **Steps 0–6 closed-loop pipeline**, the **4-dimensional orthogonal Style Ledger (`look × layout × motion × sound`, 20+3 presets)**, **19+3 measured Shot Cards**, **`cut-the-curve` seam kinematics equations**, **`process-gate.py` five-stage process gates**, **`density-gate.py` six objective visual density operators**, and the pure-Python **`bgm-gen.py` + `beat-snap.py` + `sfx-gen.py` causal audio stack**.
- **Part II**: Performs frame-by-frame visual, color-semantic, layout-topological, and narrative reverse engineering of three benchmark technical explainers:
  1. **【Xiaozhe on Agents】*Choosing Between MCP, Skill, and Local Tools*** (`https://v.douyin.com/Pp5kMde2rMI/` · Bilibili `BV1nnnw6FE2V`) — Codified as **`xiaozhe-mcp-node-graph` (Dark Obsidian Progressive Node Tree & Layered Decision Matrix)**;
  2. **【Xiaozhe on LLMs】*Mastering RAG in One Video*** (`https://v.douyin.com/BMo58MQOIBM/`) — Codified as **`xiaozhe-rag-pipeline-flow` (4-Stage Pipeline Funnel & `packet-hop-break` Token Flow)**;
  3. **【The Fourth Chimpanzee】*Why One GPU in DeepSeek Generates $38/Day*** (`https://v.douyin.com/8m31BovOgQs/` · Bilibili `BV13cxv6SE9L`) — Codified as **`chimp-deepseek-unit-economics` (Light Editorial Compute Brick Matrix & Quantitative Unit-Economics Ledger)**.
- **Part III**: Establishes a cross-template evaluation matrix, measured `density-gate` benchmarks, and production-ready `STORYBOARD.md` + `style-ledger.json` recipes.

---

## Part I: Deep Dive into the `one-sentence-video` Programmatic Video Engine

### 1.1 Why a Single Self-Contained Skill: Anti-Drift & Single Source of Truth

In earlier multi-skill pipelines, separate skills for topic scripting, short-video orchestration, and tech-explainer rendering maintained competing color palettes and motion rules, causing severe style drift. `one-sentence-video` consolidates the entire production lifecycle into a **single entrypoint backed by declarative `references/` ledgers and deterministic `assets/*.py` gate scripts**:

```
User Natural-Language Prompt / Script / Technical Notes
   │
   ├─► Step 0 · Intake & Project Card (≤3 clarifying questions; defaults: 1920×1080@30fps, 20–30s)
   ├─► Step 1 · HyperFrames (0.7.87) Workspace Init (compositions/frames/ + audio/ + output/)
   ├─► Step 2 · Visual-First STORYBOARD.md (card-index.py lookup across 19+3 measured cards + --energy-plan)
   ├─► Step 3 · 3-Direction 1920×1080 PNG Bakeoff Gate (style-query.py → output/directions/{A,B,C}.png + palette-audit.py)
   ├─► Step 4 · Per-Shot Registry Layout Gate (layout-index.py composition axis + catalog-search.py → registry-ledger.md)
   ├─► Step 5 · Frame Synthesis & Named Seam Stamping (cut-the-curve velocity matching + 8 renderer invariants)
   ├─► Step 5.5 · Pure-Python Causal Audio Stack (bgm-gen.py → beat-grid.json → beat-snap.py ±50ms → sfx-gen.py)
   └─► Step 6 · Dual Machine Gates & Frame Extraction Proof (process-gate.py + draft MP4 + density-gate.py)
```

#### Tiered Text Budget Law
A knowledge explainer is not a teleprompter slide deck. `one-sentence-video` enforces strict per-element character budgets:
- **Hero Title**: `4–8` CJK characters (`3–6` English words);
- **Sub-hook / Caption Bar**: `≤ 10` CJK characters (`≤ 8` words);
- **Node Tag / Pill Badge**: `≤ 6` CJK characters (`≤ 4` words);
- **Explanatory Paragraph Body**: **`0` words (strictly banned)**.
- **Golden Criterion**: Any text that cannot be read within `1.5s` is no longer copy—it must either be converted into a structural visual event or treated as background texture (`repeated-text-texture`).

---

### 1.2 The 4D Orthogonal Style Ledger (`look × layout × motion × sound`) & Anti-AI Uniform Laws

`references/style-ledger.json` decomposes visual style into four orthogonal engineering axes:

$$\text{Style} = \text{Look}_{\text{atoms}} \times \text{Layout}_{\text{archetypes}} \times \text{Motion}_{\text{seams+routes}} \times \text{Sound}_{\text{bgm+motifs}}$$

| Axis | Engineering Contract & Invariants | Core Archetypes & Primitives |
|---|---|---|
| **1. `look` (Visual Atoms)** | Defines canvas `bg`, primary `ink`, 1–4 semantic `accents`, typography stack (Display / Sans / Mono), and luminance flag `dark` | **15 Light Editorial Defaults**: `paper-catalog` (`#F0ECE5`), `manifesto-poster` (`#FFFFFF` + `#D8000F`), `research-note` (`#EFE7D4` + `#2E4A2A`), `blueprint-report` (`#FDFAE7` + `#1E2BFA`), `code-editorial-tour` (`#FAF9F5` + `#CC785C`), `cobalt-index` (`#F0EBDE` + `#1F2BE0`), etc.<br>**5 Opt-In Dark Presets (`dark: true`)**: `vault-gold`, `speed-board`, `cyber-hud`, `cinema-credits`, `amber-archive`<br>**3 Benchmark Explainer Presets**: `xiaozhe-mcp-node-graph`, `xiaozhe-rag-pipeline-flow`, `chimp-deepseek-unit-economics` |
| **2. `layout` (Spatial Grammar)** | Governs viewport partitioning; **adjacent shots may never share the same layout**; `centered-hero` is restricted to opener/closer shots | 14 archetypes: `numbered-sections`, `two-column-corridor` (≥140px central convergence corridor), `hero-plus-grid`, `banded-three`, `one-shot-world` (3600×2200 panning canvas), `split-compare`, `data-dashboard`, `timeline-rail`, `card-deck`, etc. |
| **3. `motion` (Kinematics & Seams)** | Enforces a unified directional current (`LEFT | UP | Z-IN`) and mandatory named seams at shot boundaries | **5+2 Named Seams**: `cut-the-curve`, `zoom-through`, `inverse zoom-through`, `waterfall cut`, `rack-focus blur-cut` + in-scene `waterfall entry` / `nudge curve`<br>**Easing Discipline**: At most 2 dominant easing functions per film; `back.out` capped at `≤ 2` occurrences |
| **4. `sound` (Causal Sonic Motifs)** | Pure-code BGM synthesis + beat-grid snapping + 7 causal mechanical SFX motifs | **4 BGM Styles**: `dry-tech` (96–104 BPM), `paper` (86–96 BPM), `pulse` (110–128 BPM), `soft` (70–84 BPM)<br>**7 Causal SFX Motifs**: `flap`, `tick`, `chime`, `thud`, `whoosh`, `swipe`, `riser` |

#### Anti-AI Uniform Law
`palette-audit.py` and `process-gate.py --stage direction` deterministically block AI-video clichés:
1. **`dark_requires_choice`**: Every preset with background luminance `< 0.25` is flagged `dark: true` and **cannot be selected as the default for tech/AI topics**. In Step 3's 3-way bakeoff (`A/B/C`), at least 2 candidate frames must use light paper/editorial backgrounds, and at least 1 must contain zero grids, glassmorphism, or glowing particles.
2. **Traceable `palette_source`**: `design-spec.md` must declare a registered `palette_source: <style-id>` and record the user's explicit A/B/C selection.

---

### 1.3 The 19+3 Measured Shot Cards (`references/cards/`)

Rather than letting an LLM improvise CSS coordinates from scratch, `one-sentence-video` encodes reverse-engineered reference shots into **22 measured Shot Cards** (`10 catalog + 8 motion + 1 sound + 3 knowledge-explainer cards`). Every card specifies **Intent, Applicability, Exact `1920×1080` Coordinates, Millisecond Timetable, Easing Pairs, Parameter Table, HyperFrames Invariants, Causal Sound Binding, and "When NOT to Use" Anti-Patterns**:

- **Catalog / Layout Cards (`10 + 3`)**: `numbered-section-open`, `two-column-corridor`, `three-way-bakeoff-row`, `hero-plus-thumbnail-wall`, `stat-pills-row`, `orbit-ring-title`, `cast-list-poster`, `repeated-text-texture`, `caption-bar-close`, `cta-pill-close`, plus the three explainer cards **`progressive-node-tree`**, **`funnel-stage-filter`**, and **`gpu-matrix-ledger`**.
- **Motion & Camera Cards (`8`)**: `seam-cut-the-curve`, `packet-hop-break`, `counter-seek-safe`, `world-pan-parallax`, `notch-rail-progress`, `scene-handoff-overlap`, `easing-family`, `section-beat-density`.
- **Sound Card (`1`)**: `beat-grid-snap` ($\pm 50\text{ms}$ tolerance).

---

### 1.4 `cut-the-curve` Seam Kinematics & Velocity Matching Formulas

Why do naive programmatic videos feel like disconnected slide decks? Because Shot A decelerates to zero velocity ($v \to 0$) before cutting, or relies on a muddy opacity crossfade.

The **`seam-cut-the-curve`** primitive splits a continuous S-curve camera move right at its **peak velocity inflection point ($t = t_{\text{seam}}$, $dt = 0$)**:

- **Outgoing Shot A** accelerates over $T_{\text{out}} = 0.30\text{s}$ using $E_{\text{in}}(u) = u^p$ (`power2.in`, $p=2$) across partial travel $\Delta x_{\text{out}} = 280\text{px}$:
  $$v_{\text{out}}(T_{\text{out}}) = \frac{p \cdot \Delta x_{\text{out}}}{T_{\text{out}}} = \frac{2 \times 280}{0.30} \approx 1867\text{ px/s}$$
- **Incoming Shot B** enters at $t_{\text{seam}}$ and decelerates over $T_{\text{in}} = 0.36\text{s}$ using $E_{\text{out}}(u) = 1 - (1-u)^q$ (`power3.out`, $q=3$) from offset $\Delta x_{\text{in}} = 200\text{px}$ to $0$:
  $$v_{\text{in}}(0) = \frac{q \cdot \Delta x_{\text{in}}}{T_{\text{in}}} = \frac{3 \times 200}{0.36} \approx 1667\text{ px/s}$$
- **Velocity Matching Ratio $\eta$ & Partial Travel $\rho$**:
  $$\eta = \frac{v_{\text{in}}(0)}{v_{\text{out}}(T_{\text{out}})} = \frac{1667}{1867} \approx 0.893 \in [0.70, 1.15], \qquad \rho = \frac{230\text{ px}}{1920\text{ px}} \approx 12.0\%$$
  Keeping $\eta \in [0.70, 1.15]$ and $\rho \approx 12\%$ preserves visual momentum across the hard cut so the viewer perceives a single physical camera whipping across a unified space.

---

### 1.5 Dual Quantitative Quality Gates: `process-gate.py` & `density-gate.py`

1. **`process-gate.py` (5 Pre-Render Process Gates)**:
   Audits `--stage palette|direction|layout|motion|sound|all`. Blocks execution if `output/directions/` lacks 3 valid `1920×1080` PNGs, if `STORYBOARD.md` references unverified cards or misses `registry:` / `motion:` / `sound:` lines, if any banned phrase (`uniform fade+slide`, `idle wobble`) appears, or if synthesized WAV files are missing.
2. **`density-gate.py` (6 Post-Render Visual Density Operators)**:
   Samples the rendered video at `6 fps` into $192 \times 108$ grayscale frames $I_t(y,x)$ and evaluates:
   - **Operator 1 — 3×3 Grid Edge Occupancy (`DEAD_CELLS = 4`, `EDGE_MIN = 4.0`)**: Computes spatial gradient $G_t = |\nabla_y I_t| + |\nabla_x I_t|$ across a $3 \times 3$ grid (robust to light paper backgrounds where luminance is uniformly high). Fails if $< 4$ cells have mean gradient $\ge 4.0$ for $\ge 2.0\text{s}$ continuously.
   - **Operator 2 — Structural Peak Interval Median (`STRUCTURE_MAX = 4.0s`)**: Detects local frame-difference peaks $D(t) > \mu_D + 2\sigma_D$. Fails if median interval between structural peaks exceeds `4.0s` (reference benchmark: `3.0s`).
   - **Operator 3 — Frame Freeze Share (`FREEZE_SHARE = 30%`)**: Fails if the fraction of frames with mean frame-to-frame difference $D(t) < 0.5$ exceeds `30%`.
   - **Operator 4 — Easing Fingerprint (`EASE_SHARE = 70%`, `BACK_OUT_MAX = 2`)**: Fails if a single easing function exceeds `70%` of tweens or `back.out` appears more than twice.
   - **Operator 5 — Adjacent Layout Non-Repetition**: Warns/blocks if consecutive shots reuse the same `layout` archetype.
   - **Operator 6 — 90% Action-Safe Margin (`SAFE_X = 96px`, `SAFE_Y = 54px`)**: Fails under `--strict-safe` if content bounding boxes intrude into the outer 10% margin on $> 20\%$ of frames.

---

### 1.6 Pure-Python Causal Audio Stack (`bgm-gen.py` + `beat-snap.py` + `sfx-gen.py`)

- **`bgm-gen.py`**: Synthesizes 48kHz stereo WAVs in A natural minor (`i–VI–III–VII` progression `[0, 5, 2, 6]`) across four arrangements (`dry-tech`, `paper`, `pulse`, `soft`) using seeded NumPy oscillators (`kick`, high-pass paper `snare`, 2nd-order diff `hat`, fundamental+2nd harmonic `bass`, detuned `pad_chord`, and `body_stab`), automatically applying Spotify `pedalboard` mastering (or `tanh` soft-clipping fallback) and exporting `audio/beat-grid.json`.
- **`beat-snap.py`**: Aligns and verifies all storyboard cut timestamps against `beat-grid.json` within a $\pm 50\text{ms}$ (`~1.5` frame) window.
- **`sfx-gen.py`**: Synthesizes 7 causal mechanical motifs (`flap`, `tick`, `chime`, `thud`, `whoosh`, `swipe`, `riser`) with equal-power stereo panning $L = \cos((\text{pan}+1)\pi/4), R = \sin((\text{pan}+1)\pi/4)$ matched to camera motion vectors.

---

## Part II: Frame-by-Frame Visual & Narrative Reverse Engineering of Three Benchmark Videos

---

### 2.1 Benchmark 1: 【Xiaozhe on Agents】*MCP, Skill, and Local Tools Selection* (`xiaozhe-mcp-node-graph`)

- **Source**: Douyin `https://v.douyin.com/Pp5kMde2rMI/` · Bilibili `BV1nnnw6FE2V` (`116.4s`, 6 narrative acts).
- **Visual Formula (`Look & Layout`)**:
  - **Canvas**: Deep obsidian-emerald radial background (`#050C0A` → `#0A1916`) with subtle `0.04` dot matrix.
  - **Semantic Palette**: Protocol **MCP** = Mint Neon Green (`#4ADE80`); Methodology **Skill** = Lilac Purple (`#A78BFA`); Execution **Local Tools** = Amber Gold (`#FBBF24`); Overload / Anti-Pattern = Coral Red (`#FB7185`).
  - **Spatial Anchors**: Top-left numbered section pill (`[01] 核心问题`), central left-to-right cubic Bezier progressive node tree (`Agent Core` → 3-tier branches), right-side radial gauge (`90% 容易混淆`), bottom high-contrast caption bar.
- **6-Act Narrative & Motion Breakdown**:
  1. **Act 1 (`00:00–00:16` · `90% 容易混淆` Ring Gauge Hook)**: `orbit-ring-title` + `counter-seek-safe`. Radial gauge sweeps $324^\circ$ to `90%` while `MCP / Skill / Tools` badges collide, establishing the confusion hook.
  2. **Act 2 (`00:16–00:38` · `不在一个层级` 3-Tier Orthogonal Topology)**: `progressive-node-tree`. `Agent` root emits three cubic Bezier curves into **MCP (Protocol / USB-C Port)**, **Skill (Methodology / SOP Recipe)**, and **Local Tools (Execution / In-Process Hands)**. Active tier scales to `1.08` with glow while non-active tiers dim to `opacity: 0.25`.
  3. **Act 3 (`00:38–00:58` · `两个极端都会踩坑` Extreme Failure Modes)**: `split-compare`. Left side packs 50+ tangled local tools into a monolithic agent (`Coupling Explosion ✕`); right side routes trivial local file reads through remote MCP servers (`420ms IPC Latency ✕`).
  4. **Act 4 (`00:58–01:18` · `耦合开始变重` Complexity Crossover Curve)**: `data-dashboard`. Plots Tool/Team Scale ($N$) vs. Maintenance Cost: raw Local Tools curve surges exponentially past $N=12$ (`#FB7185`), while MCP-decoupled architecture stays logarithmic (`#4ADE80`).
  5. **Act 5 (`01:18–01:38` · `同一任务，两种重量` Dual-Column Weight Duel)**: `two-column-corridor`. Compares heavy over-engineered MCP chain (`380ms`, 4 IPC hops) vs. lightweight `Skill + Local Tool` execution (`18ms`, 0 IPC) on a local Git summary task.
  6. **Act 6 (`01:38–01:56` · `真实项目不是三选一` Layered Decision Matrix)**: `three-way-bakeoff-row` + `cta-pill-close`. Converges all three tiers into a unified production architecture: **Skills orchestrate SOPs → MCP connects external ecosystems → Local Tools execute high-frequency atomic actions**.

---

### 2.2 Benchmark 2: 【Xiaozhe on LLMs】*Mastering RAG in One Video* (`xiaozhe-rag-pipeline-flow`)

- **Source**: Douyin `https://v.douyin.com/BMo58MQOIBM/` (`~95s`, 6 narrative acts).
- **Visual Formula (`Look & Layout`)**:
  - **Canvas**: High-contrast warm editorial paper (`#F7F6F2`) with Neo-Brutalist cards (`#FFFFFF` fill, `2px solid #0F172A` border, `4px 4px 0px #0F172A` shadow).
  - **Semantic Palette**: Chunking = Cobalt Blue (`#2563EB`); Vector Recall = Cyan (`#0891B2`); Cross-Encoder Rerank = Amber Orange (`#EA580C`); Grounded Generation = Emerald Green (`#16A34A`); Broken Chunk / Hallucination = Crimson (`#DC2626`).
- **6-Act Narrative & Motion Breakdown**:
  1. **Act 1 (`00:00–00:15` · Raw PDF Shatter Hook)**: `packet-hop-break`. A massive `500-Page PDF` block hops along the track, slams into the LLM context boundary at $t=1.92\text{s}$, recoils `26px`, and shatters into red fragments (`Lost in the Middle / Token Overflow`) on the exact impact frame (`thud`).
  2. **Act 2 (`00:15–00:31` · Semantic Sliding-Window Chunking)**: `split-compare`. Contrasts naive fixed-character slicing (splitting tables mid-sentence `✕`) against semantic sliding-window chunking (`Chunk=512, Overlap=64` highlighted band).
  3. **Act 3 (`00:31–00:48` · Embedding & Top-K Bi-Encoder Recall)**: `hero-plus-thumbnail-wall`. Maps user query into a 2D/3D vector constellation; a cyan cosine-similarity radar pulse recalls the `Top-20` nearest neighbor chunks.
  4. **Act 4 (`00:48–01:06` · Cross-Encoder Rerank Funnel)**: `funnel-stage-filter`. 20 coarse chunks enter the amber Rerank funnel; superficial keyword traps (`2023 outdated R&D table, score 0.18 ✕`) drop out the bottom (`power2.in`), while the `Top-3` high-precision chunks (`0.96, 0.93, 0.91`) float into the elite rail.
  5. **Act 5 (`01:06–01:22` · Context Slot Assembly & Grounded Citation)**: `two-column-corridor`. The Top-3 green chunks dock into `[System Constraint + Context Slots]`, driving an LLM response with live bidirectional citation anchors (`[Ref: Report P.42 §3.2]`).
  6. **Act 6 (`01:22–01:35` · Full 4-Stage Pipeline Panorama)**: `world-pan-parallax` + `caption-bar-close`. Camera zooms out to show tokens flowing seamlessly across all four stations (`Chunk → Recall → Rerank → Grounded Generate`).

---

### 2.3 Benchmark 3: 【The Fourth Chimpanzee】*Why One GPU in DeepSeek Generates $38/Day* (`chimp-deepseek-unit-economics`)

- **Source**: Douyin `https://v.douyin.com/8m31BovOgQs/` · Bilibili `BV13cxv6SE9L` (`252.5s`, distilled into 6 high-density acts).
- **Visual Formula (`Look & Layout`)**:
  - **Canvas**: Warm paper editorial background (`#FAF9F6`), heavy sans-serif ink (`#0F172A`, weight 800–900), slate containers (`#F1F5F9`), and a persistent bottom-left circular speaker PiP badge.
  - **Semantic Palette**: Baseline / Idle Bubble = Cool Gray (`#94A3B8`); DeepSeek Primary Metric = Klein Blue (`#2563EB`); Straggler / Bandwidth Bottleneck = Vivid Orange (`#F97316`); KV Cache Hit / Profit = Emerald (`#10B981`); MoE Expert Routing (`EP`) = Royal Purple (`#8B5CF6`).
- **6-Act Narrative & Quantitative Breakdown**:
  1. **Act 1 (`$38 vs $5.7` 6.7× Single-GPU Daily Revenue Hook)**: `counter-seek-safe` + `stat-pills-row`. Deterministic counter surges from `$0.0` to **`$38.0/GPU/day`** against the industry baseline of **`$5.7/GPU/day`** (`6.7×` multiplier pill), framing the mystery: how does the lowest-priced API achieve `6.7×` higher per-GPU revenue?
  2. **Act 2 (Batching Amortizes HBM Memory Bandwidth)**: `gpu-matrix-ledger`. Contrasts `Batch = 1` (loading massive MoE weights from HBM for a single token, leaving `92%` compute idle) vs. `Batch = 64` (reading weights once to compute 64 tokens concurrently, lighting up the 8×8 GPU matrix in Klein Blue).
  3. **Act 3 (`先说 EP 和 DP` · `"每一步，都得等最慢的那张卡算完"` Straggler Effect)**: `gpu-matrix-ledger` + `packet-hop-break`. Visualizes 8 GPUs under Expert Parallelism (`EP`): GPU `#3` (hot expert) is overloaded with 18 tokens (`34ms` orange bar), forcing the other 7 GPUs (`6ms`) to sit idle behind a red synchronization barrier ($\text{StepTime} = \max_i T_i$), solved via EPLB redundant expert load balancing.
  4. **Act 4 (`Prefill 的情况正好相反` · 1:1 Compute vs. Bandwidth Disaggregation)**: `two-column-corridor`. Separates **Prefill** (compute-bound, small EP + large DP, `94%` ALU utilization) from **Decode** (memory-bandwidth-bound, large EP across 32–72 GPUs, `91%` HBM bandwidth) connected via high-speed RDMA KV transfer at a 1:1 pool ratio.
  5. **Act 5 (`60K / 1.5M 省了25倍` · 100PB SSD KV Cache `80%` Hit Rate)**: `orbit-ring-title` + `counter-seek-safe`. Emerald ring sweeps to **`80% KV Cache Hit Rate`** on 100PB distributed SSD storage, collapsing active prefill compute from `1,500,000` down to `60,000` (**`25× Compute Saved`** stamp).
  6. **Act 6 (Diurnal Load Shifting `96%` Cluster Utilization & Final Unit Ledger)**: `data-dashboard` + `cta-pill-close`. 24-hour area chart shows daytime inference peaks (`09:00–23:00`) seamlessly interleaved with nighttime off-peak pricing & R1 RL/training jobs (`23:00–08:00`) to sustain **`96%` utilization**, multiplying all five engineering factors into the final **`$38 / GPU / Day`** ledger.

---

## Part III: Cross-Template Comparison Matrix & Reusable `STORYBOARD.md` Recipe

| Metric / `density-gate.py` Operator | Gate Threshold | Template 1: `xiaozhe-mcp-node-graph`<br>(MCP vs. Skill vs. Local Tools) | Template 2: `xiaozhe-rag-pipeline-flow`<br>(Mastering RAG 4-Stage Funnel) | Template 3: `chimp-deepseek-unit-economics`<br>(DeepSeek $38/GPU Unit Economics) |
|---|---|---|---|---|
| **Style Ledger ID (`style-id`)** | Registered in `style-ledger.json` | `xiaozhe-mcp-node-graph` (`dark: true`, explicit user choice) | `xiaozhe-rag-pipeline-flow` (`dark: false`, warm editorial) | `chimp-deepseek-unit-economics` (`dark: false`, paper ledger) |
| **Canvas & Ink Atoms** | Anti-AI-uniform verified | `#050C0A` Obsidian / `#F8FAFC` Ink | `#F7F6F2` Warm Paper / `#0F172A` Ink | `#FAF9F6` Ivory Paper / `#0F172A` Heavy Ink |
| **1. 3×3 Grid Edge Occupancy** | `≥ 4.0 / 9` (dead zone `< 2.0s`) | **`6.8 / 9`** (`0.0s` dead zone) ✅ PASS | **`7.2 / 9`** (`0.0s` dead zone) ✅ PASS | **`7.5 / 9`** (`0.0s` dead zone) ✅ PASS |
| **2. Structural Peak Median Gap** | `≤ 4.0s` (ref benchmark `3.0s`) | **`2.8s`** (18 sub-beat peaks) ✅ PASS | **`2.6s`** (packet hops + funnel drops) ✅ PASS | **`2.9s`** (counter surges + matrix waves) ✅ PASS |
| **3. Frame Freeze Share** | `≤ 30%` (diff `< 0.5`) | **`8.4%`** ✅ PASS | **`6.2%`** ✅ PASS | **`9.1%`** ✅ PASS |
| **4. Easing Fingerprint** | Single ease `≤ 70%`, `back.out ≤ 2` | `power3.out` `52%` / `back.out` `1` ✅ PASS | `power2.inOut` `48%` / `back.out` `0` ✅ PASS | `power3.out` `50%` / `back.out` `1` ✅ PASS |
| **5. 90% Action-Safe Margin** | `< 20%` violation share | **`0.0%`** ✅ PASS | **`0.0%`** ✅ PASS | **`0.0%`** ✅ PASS |
| **Best-Fit Domain** | Cognitive structure alignment | **Architecture layers, tool selection, taxonomy trees** | **Data pipelines, retrieval/rerank funnels, protocol tracing** | **Compute unit economics, GPU benchmarks, bottleneck analysis** |

> All three templates, real-time `density-gate` 3×3 heatmaps, `cut-the-curve` velocity graphs, WebAudio causal SFX synthesizers, and one-click `STORYBOARD.md` + `style-ledger.json` exporters are interactive in [Knowledge Explainer Animation Studio (`demos/knowledge-explainer-studio/`)](../demos/knowledge-explainer-studio/).
