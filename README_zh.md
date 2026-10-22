# Frontier AI Studio — Global Solution Accelerators & Playbook
# 全球前沿 AI 工程参考底座与合作伙伴落地指南 (Voice · Animation · Game · Decision Model)

This package contains the self-contained HTML5 interactive demos, executive slide decks, 7-Card (4:5) benchmark reports, and speaker playbooks across **four core AI engineering tracks**.

本套件打包了四大核心 AI 技术资产（**实时语音智能体 Voice**、**程序造景与动画 Animation**、**可验证 3D/2D 游戏工程 Game**、**毫秒级决策与路由模型评测 Decision Model**）的完整离线 H5 交互页面、高管演示幻灯片、7-Card 评测报告及现场讲解词。

---

## 🚀 1. How to Launch (快速启动指南)

### Option A: One-Click Local Server (Recommended — Required for WebGL 3D & ES Modules)
Because browser security (`CORS`) restricts loading 3D `.glb` assets, NASA MOLA `.bin` elevation data, and ES modules via `file://`, please start the included lightweight local server:

- **Windows**: Double-click **`start-demo-windows.bat`** (automatically starts `http://127.0.0.1:8788/` and opens your browser).
- **macOS / Linux**: Run **`sh start-demo-mac-linux.sh`** or **`node server.mjs`** in terminal, then open **`http://127.0.0.1:8788/`**.
- **Python fallback (if Node.js is not installed)**: Run `python -m http.server 8788` in the unzipped folder and open `http://127.0.0.1:8788/`.

### Option B: Direct Online GitHub Pages Access (No Local Setup Needed)
If you prefer to browse directly from the cloud or share links with customers:
- **Voice Agent Presales Portal**: <https://turbo998.github.io/voice-agent-lab/>
- **Voice Agent 12-Slide Executive Deck**: <https://turbo998.github.io/voice-agent-lab/deck.html>
- **Voice Agent 7-Card Benchmark Report**: <https://turbo998.github.io/voice-agent-lab/benchmark-cards.html>
- **AI Gaming & Procedural Animation Portal**: <https://turbo998.github.io/ai-gaming-lab/>
  - *Wanan Midnight 3D Racing*: <https://turbo998.github.io/ai-gaming-lab/demos/wanan-midnight/>
  - *Scrap Swarm 2D Mecha Arena*: <https://turbo998.github.io/ai-gaming-lab/demos/scrap-swarm/>
- **Live Azure Voice Companion (`gpt-live-1`)**: <https://gpt-live-demo-0922-qc.azurewebsites.net/>

---

## 📦 2. Overview of the Four AI Engineering Assets (四大核心资产与 GitHub 仓库)

| Track | GitHub Repository | Local Path in Package | Key Capabilities & Highlights |
| :--- | :--- | :--- | :--- |
| **00 · Unified Command Center** | Integrated Hub | `/index.html` | Split-screen live demo workbench + 3-min speaker script + 8-slide executive briefing deck + interactive Decision Model simulator + 15-min countdown timer. |
| **01 · Enterprise Voice Agent** | [`turbo998/voice-agent-lab`](https://github.com/turbo998/voice-agent-lab)<br>[`turbo998/gpt-live-1-demo`](https://github.com/turbo998/gpt-live-1-demo) | `/voice/index.html`<br>`/voice/deck.html`<br>`/voice/benchmark-cards.html` | **20 high-ROI industry scenarios**, **4 reference architectures** (`gpt-live-1` 620ms S2S, Constellation cascaded + `DragonHDFlash` 4.34 MOS, Retell+Foundry Co-Sell, local Speech Docker container), **90 live POC trap probes**, `turnEpoch` 165ms barge-in, deterministic `K05` safety lock, and FinOps TCO calculator (65%–78% savings vs. Sierra/Retell). |
| **02 · Procedural Animation & Blender MCP** | [`turbo998/generative-visual-lab`](https://github.com/turbo998/generative-visual-lab) | `/animation/index.html`<br>`/animation/demos/feitian/`<br>`/animation/demos/astra-planet/`<br>`/animation/demos/rocket-launch/` | **Gemini 4 + Blender 4.5 LTS MCP** offline Cycles baking + 60fps WebGL2/Canvas runtime (zero runtime model API):<br>• **Feitian (Dunhuang)**: Cycles-baked Mogao grotto relief + 2x cached parametric figures & ribbons.<br>• **Astra Mars**: Real NASA MOLA elevation (`384 cells/deg`) + Cycles micro-normal map + wireframe/gray verification & GLB export.<br>• **Rocket Launch**: Blender MCP generated `188 KB` GLB kit batched into `27 draw calls`. |
| **03 · Verifiable 3D/2D Game Engineering** | [`turbo998/ai-gaming-lab`](https://github.com/turbo998/ai-gaming-lab)<br>[`turbo998/wanan-midnight`](https://github.com/turbo998/wanan-midnight)<br>[`turbo998/scrap-swarm`](https://github.com/turbo998/scrap-swarm) | `/game/index.html`<br>`/game/demos/wanan-midnight/`<br>`/game/demos/scrap-swarm/`<br>`/game/demos/scrap-swarm/design/` | Goes beyond one-shot visual animations into full interactive game engineering:<br>• **Wanan Midnight**: 44 parametric JDM car models (`<300 KB gzip`), pop-up headlights, pitch/roll physics, exhaust backfire, 6-chapter Shanghai story.<br>• **Scrap Swarm**: 6-layer articulated 2D mecha rig, shell ejection, anime cut-in & black-and-white impact frames.<br>• **Zero external audio files**: Web Audio procedural engine synthesizer + **60Hz deterministic CI harness**. |
| **04 · Decision Model & Benchmark Harness** | [`turbo998/benchmark-harness-engineering`](https://github.com/turbo998/benchmark-harness-engineering) | `/decision/strands-cards.html`<br>`/decision/decision1-cards.html`<br>`/decision/harness-report/index.html` | **System One fast routing & confidence gating**:<br>• **Strands Decider 2B**: `0 output tokens` at `<answer>`, single forward pass answers 3 decisions (`choice`/`noul`/`score`) in ~`170 ms`, `6/6` option-order reversal stability, `0.51x` batch latency speedup.<br>• **Microsoft-Decision-1 (480 decisions)**: `94.2%` route match at **`$8.6 / 1M decisions`** (`94%` cheaper and `62%` faster P50 than `gpt-4.1-mini` at `$141.8 / 1M`), with `0.60` threshold catching all 7 in-sample misses.<br>• **7-Card (4:5) Visual Benchmark Standard**: Sealed `report.json` data with zero fabricated coordinates. |

---

## 🎯 3. Step-by-Step Walkthrough Guide (各模块使用与演示指南)

### Step 1: Start from the Unified Command Center (`http://127.0.0.1:8788/`)
1. **Top Mode Switcher**:
   - **🎯 实时演示工作台 (Workbench)**: Left panel embeds the live interactive H5 demo; right panel displays the 3-minute click-by-click script, verified metrics, and partner Q&A.
   - **📽️ 合作伙伴讲解 PPT (8 Slides)**: Full 16:9 executive deck summarizing all 4 tracks, architectural synergy, and the 2-week partner POC playbook (use `←` / `→` arrow keys to navigate).
   - **📊 7-Card 决策/语音评测报告**: Side-by-side viewer for the 7-Card (4:5) benchmark decks (`Strands Decider 2B`, `Microsoft-Decision-1`, and `Voice Agent`).
   - **⚡ 预热状态与直达矩阵**: Full directory table with one-click deep links.

### Step 2: Exploring Track 01 — Voice Agent (`/voice/index.html`)
- Switch between **Simplified Chinese / Traditional Chinese / English** in the top-right corner.
- Use the **Architecture Decision Wizard** to generate a tailored Azure BOM based on latency, data sovereignty, and PSTN requirements.
- In the **Live Audio Sandbox**, click **⚡ Simulate Barge-In** (`165ms` cut-off) and **🛡️ Test Adversarial Safety Jailbreak** (triggers deterministic `K05` electrical hazard lock).
- Adjust the **FinOps TCO Calculator** slider to compare monthly costs against Sierra AI (`$1.50/resolution`) and Retell AI.

### Step 3: Exploring Track 02 — Procedural Animation (`/animation/index.html`)
- **Feitian (`/animation/demos/feitian/index.html`)**: Click **"细看人物 (Inspect Figure)"** to examine 2x cached facial features and jewelry over the Blender Cycles-baked Mogao grotto relief.
- **Astra Mars (`/animation/demos/astra-planet/index.html`)**: Click landmark presets (**Valles Marineris / Olympus Mons**), toggle **Gray / Wireframe** to verify raw NASA MOLA geometry, and test **Export GLB**.
- **Rocket Launch (`/animation/demos/rocket-launch/index.html`)**: Trigger launch and toggle **Fixed / Follow Camera** to inspect the `188 KB` Blender MCP `.glb` kit and Mach-stem plume.

### Step 4: Exploring Track 03 — AI Game Engineering (`/game/index.html`)
- On the portal stage, switch across **Tab 1 (3D Car Parametric Surface & Pop-up Headlights)**, **Tab 2 (2D Mecha Rig & Anime Impact Frame)**, and **Tab 3 (Web Audio Synthesizer)**.
- Launch **Wanan Midnight** (`W/A/S/D` to drive on Lupu Bridge) or **Scrap Swarm** (`W/A/S/D` to move, `Mouse` to fire rivet gun, `Space` to dash, `Q` for anime cut-in awakening).

### Step 5: Exploring Track 04 — Decision Models (`/decision/strands-cards.html` & `/decision/decision1-cards.html`)
- In the Command Center, select **`04 · DECISION MODEL`** to use the **Interactive Confidence Gating Workbench**: drag the `Auto (>=0.90)` and `Confirm (>=0.50)` sliders and toggle **Reversed Option Order** to see how low-confidence or ungrounded tool calls are intercepted before execution.
- Open both **7-Card (4:5) Benchmark Decks** to review the `<answer>` hidden-state scoring protocol, robustness checks, and batch latency curves.
