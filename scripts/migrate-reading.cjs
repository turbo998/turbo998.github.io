/* Rebuild only the R6 reading ownership set from the sealed inventory baseline. */
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const crypto = require('node:crypto');
const puppeteer = require('puppeteer');
const { marked } = require('marked');
const root = path.resolve(__dirname, '..');
const inventory = require('../docs/redesign/route-inventory.json');
const excluded = ['index.html', 'zh.html', 'frontier-ai-studio.html'];
const pages = inventory.content.filter(p => ['portal', 'topic', 'article'].includes(p.role) && !excluded.includes(p.path));
const sourceOverrides = {
  'workshops/azure-agent-infra/index.html':'8c84971c7e952a5fb6f254ee8fcfef5678d9941d',
  ...Object.fromEntries(['voice/index.html','voice/app.js','voice/03-daily-breakthrough-2026-11-01.svg','workshops/agentic-commerce/index.html'].map(p=>[p,'04ec523a4f7ba4843de2983b91052e23e7c1ffa6'])),
  ...Object.fromEntries(['benchmarks.html','zh-benchmarks.html','projects.html','zh-projects.html','writing.html','zh-writing.html','ai-security.html','zh-ai-security.html','workshops/ai-security/index.html','workshops/ai-security/index.en.html'].map(p=>[p,'3bdac3d4db9a0cec264ee42b59bbef8a7f87364b']))
};
const baseline = p => cp.execFileSync('git', ['show', `${sourceOverrides[p] || inventory.baseline}:${p}`], { cwd: root, maxBuffer: 20 * 1024 * 1024 });
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const relative = (from, to) => path.posix.relative(path.posix.dirname(from), to) || path.posix.basename(to);
const exceptions = {
  'game/index.html': 'Live procedural animation stage, WebGL/canvas inspection and audio controls.',
  'workshops/agentic-commerce/index.html': 'Interactive commerce scenario workbench, stepper and FinOps calculator; not the English report counterpart.',
  'workshops/agentic-commerce/index.en.html': 'Existing sealed seven-card benchmark report; preserve CSP, original card coordinates and dedicated design. Not a translation of the commerce workbench.',
  'workshops/ai-security/index.html': 'Interactive attack/defense playground, kill-chain state and editable checklist.',
  'workshops/ai-security/index.en.html': 'English interactive attack/defense playground; preserve internal state controls.',
  'workshops/faf-vs-agent-forge/demo-agent-forge-pelican.html': 'Canvas animation with audio and live inverse-kinematics controls.',
  'workshops/faf-vs-agent-forge/demo-faf-pelican.html': 'Canvas animation with live simulation controls.',
  'workshops/faf-vs-agent-forge/demo-hve-pelican.html': 'Canvas animation with live simulation controls.'
};
const hydrate = new Set(['voice/index.html', 'voice/case-study.html', 'workshops/azure-agent-infra/index.html']);
const runtime = new Set(['animation/index.html', 'generative-visual-lab/index.html', 'game/index.html', 'voice/index.html', 'voice/case-study.html', 'workshops/azure-agent-infra/index.html', 'workshops/deepinfer-v41-economics/index.html', 'bilibili-explainers/index.html', 'workshops/agentic-commerce/index.html', ...Object.keys(exceptions).filter(x => /pelican/.test(x))]);
const translations = {
'animation/research/hve-animation-landscape.html': String.raw`# Claude HVE Harness animation and interactive-visual survey: techniques, mathematical primitives and repository mapping

This document systematically analyzes code-only animation, Three.js/WebGPU interactive scenes, optics/physics laboratories and Blender MCP hybrid scenes from the **2026 Claude HVE Harness visual and motion collection**: **317 curated cases among 1,034 real works** in awesome-claude-Frontier-5.5, plus **24 deeply reviewed projects** in magiccreator-ai/awesome-claude-Frontier-5-5-demos. It maps the extracted techniques to this lab's three core demonstrations: **Feitian · Wind Between the Murals**, **Astra · Scientific Mars Scenography**, and **Launch · White Rocket Launchpad**.

## 1. Categories and popularity among 317 curated community cases

The public collection's domain classification and community likes concentrate popular Frontier animation and interaction work into seven categories. These are the original survey's reported counts, not new measurements.

| Category | Representative works and reported popularity | Rendering stack and techniques | Repository direction |
| --- | --- | --- | --- |
| 1. Interactive Viz & Simulations | Interactive Camera-Focus Lens Lab (❤ 16.2k); Tokyo Last-Train Map (❤ 4.3k); Electromagnetic Field Visualizer (❤ 2.8k); Interactive 3D Datacenter Thermal (❤ 2.1k) | Physical/optical equations—thin lens, circle of confusion (CoC), vector-field streamline integration—drive interaction, linked parameters and high-contrast instrument panels. | Rocket Launch: optical halos and point-source bokeh at the round porthole. Astra: planetary-limb Rayleigh scattering and polar microcrystal highlights. |
| 2. Motion Graphics & Launch Films | Code-only UI Motion Design (❤ 12.1k); coordinated launch film across 12 computers (❤ 4.6k); 900-frame rendering pipeline explainer (❤ 2.6k); 16 three-step motion tutorials; Tesseract 1600+ layer motion | A pure time function F(t) drives each frame; second-order spring-damped easing; seamless dolly/pan/roll camera movement. | Rocket Launch: standby → ignition → liftoff → transonic shock → high-altitude climb. Feitian: eased four-act state machine. |
| 3. Three.js & Cultural Scenes | HVE Harness Dunhuang Feitian (Canvas 2D mineral mural); Sakura River Valley Boat Scene; Three.js Peach Blossom Spring; Japanese garden koi pond; real-time coast and 3D water; code-only seasonal pixel island | Layered offscreen Canvas mineral textures, Verlet/PBD ribbons, Tyndall light beams, gold-leaf dust and water caustics. | Feitian: oblique cave-skylight beams, floating gold dust, rotating/falling double lotus petals with stamens, and gilded makeup. |
| 4. Blender & Engine Modeling | Five-model 3D-printed load-bearing bridge (❤ 8.4k); Shinkansen with 5,112 objects including 430 seats; reconstruction of 1906 San Francisco Market Street; Summer Palace Tower of Buddhist Incense and harbor-town walkthrough (Blender + Three.js) | Parametric bpy/bmesh scripts; Cycles normal/AO/relief baking or modular .glb export; frontend material batching. | All three demos integrate Blender 4.5.10 LTS + blender-mcp: GLB hard-surface kits and Cycles baking. |
| 5. Space & Planetary Worlds | Seamless No Man's Sky-style Galaxy (❤ 4.0k); Explorable Imaginary Solar System; A Cosmic Journey | Spherical height-field LOD and recomputed normals, Fresnel limb glow, procedural starfields and terminator transitions. | Astra Planet Lab: measured NASA MOLA terrain, Blender microterrain normals, terminator atmospheric scattering and high-altitude frost crystals. |
| 6. Music, MVs & Demoscene | CUDA-kernel optimization music video (❤ 2.4k); 280KB single-HTML self-showcase demoscene; Hop Hop, Nope Nope pure-function Canvas 2D MV; thirteen code-only synthesized music films (Passacaglia) | No external audio; WebAudio oscillators/harmonics, biquad filters and convolution reverb synchronized precisely to visuals. | Feitian: pentatonic Gong-mode guqin/dongxiao harmonic synthesis and reveal bells/chimes. Rocket Launch: low-frequency ignition rumble and aerodynamic noise. |
| 7. Web & Holographic UI | Holographic Trading Card (❤ 1.9k); interactive dynamically recalculated slides (❤ 2.3k) | View-dependent thin-film interference/metallic gradients, pointer parallax and high-contrast theme adaptation. | Feitian: view-dependent gilded backlight and brocade-collar glow on four figures. GVL Portal: Clawpilot dual-theme adaptation. |

## 2. Core algorithms in four representative high-popularity works

### 2.1 Camera-Focus Lens Lab (❤ 16.2k): thin-lens optics and circle of confusion

The most popular example avoids a generic CSS blur filter. Interactive geometric-optics equations drive individual rays and depth-of-field discs.

1. **Gaussian thin-lens equation:**

   $$\frac{1}{f} = \frac{1}{d_o} + \frac{1}{d_i}$$

   Here f is focal length, d_o object distance and d_i image distance.

2. **Circle-of-confusion diameter:** for aperture diameter D = f / N, where N is the f-number, an object at d with the focus plane at d_f produces this sensor CoC:

   $$\text{CoC}(d) = \left| \frac{d - d_f}{d} \right| \cdot \frac{f^2}{N \cdot (d_f - f)}$$

3. **Anamorphic streak and aperture ring:** strong point sources such as a rocket nozzle's incandescent core or a cave lamp flame create horizontally stretched anamorphic flare and polygonal aperture-diffraction starbursts at a circular viewport or lens edge.

**Repository mapping:** in demos/rocket-launch/, add thrust-envelope-responsive porthole optical halos and horizontal anamorphic flare bands around the incandescent nozzle during ignition and ascent (Optical Porthole Lens Flare & Shockwave Condensation Ring). In demos/astra-planet/ realistic mode, strengthen atmospheric tangent scattering at the Fresnel optical limb and microcrystal highlights on high-altitude ridges.

### 2.2 Motion-design template (❤ 12.1k) and 900-frame pipeline (❤ 2.6k): timeline orchestration and spring camera motion

Popular code-only motion replaces rigid linear interpolation (lerp) with **critically damped second-order springs** and **asymmetric piecewise easing**.

1. **Narrative phase envelope:** divide scenes into Anticipation → Impulse → Cruise → Settle. Each state independently adjusts camera dolly speed and FOV/orthographic zoom.
2. **Secondary motion:** at the primary action—Feitian leaving the wall, rocket liftoff at **T ∈ [2.6s, 4.5s]**, or transonic travel at **T ∈ [5.2s, 7.0s]**—trigger environmental responses such as ground acoustic Mach shock rings or a Prandtl–Glauert vapor cone.

**Repository mapping:** add liftoff ground acoustic rings and transonic condensation rings in demos/rocket-launch/. Preallocate all static geometry; pure time envelopes control opacity and scale, with zero dynamic allocation and no additional material-shader compilation.

### 2.3 Dunhuang Feitian and Sakura Valley / Peach Blossom Spring: mineral aesthetics and Tyndall volume light

The key is **restrained saturation, rich material layers and atmospheric spatial depth**.

1. **Three spatial layers: background niche → atmospheric beams → moving foreground figures and petals.**
   - Background: weathered sandstone, cracked plaster, and four-niche ceiling relief baked orthographically in Blender Cycles (grotto-relief-bake.png).
   - Air: oblique Tyndall shafts from high cave windows and slowly floating gold-leaf dust motes.
   - Foreground: paired Verlet-constrained ribbons, finely painted figures at **2× supersampling**, and double petals with golden stamen threads.
2. **Zero per-frame gradient allocation:** composite all Tyndall beams and cave vignettes once in the static buildWall() cache. Foreground petals and gold dust use prerendered offscreen tiles and batched matrix drawing via ctx.setTransform().

**Repository mapping:** in demos/feitian/ buildWall(), layer warm-gold Tyndall beams from the ceiling into four niches and add gold-powder atmosphere. Upgrade petal tiles to double lotus petals with gold-thread stamens, improving mural depth and High Tang gilded richness without extra per-frame draw overhead.

### 2.4 Shinkansen with 5,112 objects and the Tower of Buddhist Incense: Blender MCP modeling and baking

Blender + HVE Harness reference cases show that handwritten Three.js BoxGeometry/CylinderGeometry often looks like toy blocks. **Blender Python (bpy/bmesh) + Cycles baking** enables industrial and sculptural detail.

1. **High-to-low-poly baking:** create microscale craters, basalt cliffs and lotus-relief details in Blender. Bake tangent-space normal/cavity maps (mars-micro-normal.png) or orthographic lighting maps (grotto-relief-bake.png).
2. **Per-material static batching:** after loading exported .glb assets in Three.js, merge static meshes sharing a PBR material into one BufferGeometry, reducing hundreds of parts to **< 30 draw calls**.

## 3. Prompt and engineering blueprint for high-quality animation demos

The community's popular open prompt templates and this repository's practice suggest the following blueprint.

### Role and aesthetic direction

You are a scenography engineer with industrial-design, classical-art-history and real-time-graphics expertise. Reject cheap highly saturated neon gradients and toy-like geometry. Use a restrained palette with historical or scientific provenance.

### Five implementation layers

1. **Static foundations and offline baking:** Blender MCP (bpy/bmesh + Cycles) generates precise hard-surface .glb assets, microsurface normals and relief lighting maps.
2. **Physics and mathematics:** deterministic F(t), Verlet/PBD distance constraints, thin-lens optics or real NASA MOLA elevation data drive geometry.
3. **Primary forms and detail:** multilevel bevels, welds/rivets, softly shaded fine-line facial features, gilded outlines, and Microsoft four-color or Dunhuang mineral-color accents.
4. **Atmosphere and secondary effects:** Tyndall beams, transonic vapor cones, Rayleigh limb scattering and bounded particle pools with zero GC jitter.
5. **Interaction and accessibility contract:** keyboard/pointer controls, camera switching, a prefers-reduced-motion static mode, adaptive resolution fallback and a window.visualLab automated telemetry interface.

## 4. Sources and compliance

- [Awesome Claude HVE Harness curated video and visualization collection](https://github.com/xianyu110/awesome-claude-Frontier-5.5)
- [MagicCreator Claude HVE Harness Demos Directory](https://github.com/magiccreator-ai/awesome-claude-Frontier-5-5-demos)
- [Feitian reference inspiration](https://ds470b74heox1.cloudfront.net/Frontier55-feitian/index.html)
- **Compliance boundary:** this document and repository summarize graphics principles, mathematical equations and engineering architecture from public examples. All code, shaders, Blender generation scripts and baked textures are this repository's original MIT implementation; no third-party closed-source scripts or unauthorized media assets are copied.
`,
'game/research/hve-animation-and-game-engineering.html': String.raw`# Beyond HVE Harness animation: HVE Agent procedural 3D/2D animation and verifiable game engineering

## 1. Why move from a single visual animation to verifiable real-time game engineering?

When demonstrating frontier models' coding and visual-creation capabilities to technology partners and enterprise architects, SVG/Canvas animations made with HVE Harness are often used as a reference. A single animation usually addresses tweening on a fixed timeline. Real interaction, complex machinery, long-running physics and branching stories expose four engineering gaps:

- **Geometry and topology:** assemblies of boxes and spheres lack parametric surface control points, open wheel-arch cutouts and movable mechanical joints such as pop-up-headlight four-bar linkages or hydraulic recoil rails.
- **Physics–animation coupling:** animation frames are disconnected from force states. Cars do not dive under braking, roll in corners or backfire on downshifts; mechs lack recoil displacement and momentum afterimages.
- **Narrative and acoustic asset dependency:** without external MP3 effects or pre-rendered character art, code-only projects often become silent sandboxes with no story or character arc.
- **Verifiability:** visual inspection replaces 60Hz deterministic stepping probes, allocation guards and automated completion regressions.

Through two flagship works without external assets—**Wanan Midnight · East of Midnight** (3D WebGL2) and **Scrap Swarm** (2D Phaser 3)—AI Gaming & Procedural Animation Lab demonstrates HVE Agent's advance across these four dimensions.

## 2. Four-layer capability matrix

| Architecture layer | Single visual animation baseline | HVE Agent verifiable game and procedural animation engineering | Code and verification anchors |
| --- | --- | --- | --- |
| L1 Parametric geometry and skeletons | Static boxes/spheres and uniform mesh reuse | 8 vehicle families, 44 generations of independent parametric spline surfaces and open wheel arches; 5 articulated mech skeleton trees | wanan-midnight/src/render/profiles.ts; scrap-swarm/src/game/hangar.ts |
| L2 Physics coupling and anime direction | Fixed-keyframe linear interpolation without forced response | 60Hz pitch/roll suspension, movable pop-up headlights, twin blue-violet backfire, 680°C glowing rotors; hydraulic shell ejection, gold/cyan afterimages, anime cut-ins and monochrome impact frames | wanan-midnight/src/render/cars.ts; scrap-swarm/src/scenes/GameScene.ts |
| L3 Narrative state machines and procedural acoustics | No narrative or static captions; silence or linked audio | 6 Shanghai chapters of East of Midnight with Echo Workshop tapes; 3 wasteland acts revealing Iron-Crown rescue logs; real-time Web Audio multi-oscillator synthesis | wanan-midnight/src/story/catalog.ts; scrap-swarm/src/game/story.ts |
| L4 Deterministic verification harness | Manual visual inspection and frame-rate drift | __wananTest / __gameTest / __labStage probes; deterministic convergence at 30/60/120Hz; 0 dynamic mesh builds during races; autonomous completion bots | tests/simulation.test.ts; tests/e2e/game.spec.ts |

## 3. Three engineering paradigms

### 3.1 Parameter-driven anatomical mechanical rigging

Wanan Midnight does not reduce 44 classic JDM cars to recolored boxes. Each generation has explicit parameters for length, width, wheelbase, nose angle, roof curvature, spoiler height and pop-up/fixed headlight type.

- **Open arches and independent suspension:** side skins have real front/rear wheel-arch openings. Wheels, five-spoke rims, ventilated rotors and calipers are independently attached to suspension nodes.
- **Pop-up headlight hinges:** RX-7 (sa22c/fc3s/fd3s), NSX (na1), Supra (a60/a70), Fairlady Z (z31) and Silvia (s12) have independent rotating cover pivots. They open and close in the workshop and on night highways, with synchronized light cones and wet-asphalt reflections.

### 3.2 Real-time synthesis of speed, forces and anime impact

Strong animation depends on force and rhythmic contrast, not just accurate shape.

- **Continuous physical micro-poses:** longitudinal acceleration/deceleration drives pitch/dive; lateral acceleration drives body roll and front-wheel steering. Mech velocity drives torso lean and track-wheel angular speed.
- **Transient bursts and impact frames:** when R-17 “Forge Fist” activates Overdrive or breaks Iron-Crown Hector's chest restraint, Scrap Swarm triggers a **120ms** diagonal-speed-line anime cut-in and high-contrast monochrome radial impact frames, conveying the force of mech animation.

### 3.3 Deterministic simulation and automated verification

Both games and the lab portal share a harness contract so animation and gameplay changes can be checked automatically.

- **Fixed 60Hz step:** physics and state machines advance at <code>dt = 1/60s</code>; rendering only interpolates. Race outcomes and trajectories remain **100% identical at 30Hz, 60Hz and 120Hz**.
- **Zero runtime mesh allocation:** all race-car and Shanghai skyline batches are built during warm-up; <code>modelsBuiltDuringRace === 0</code> during a race.
- **Autonomous completion controllers:** CI can complete all **6** Shanghai chapters and Scrap Swarm's **3** enemy waves plus the boss's three armor phases without manual play.
`,
'game/research/partner-demo-playbook.html': String.raw`# Partner demo playbook: a 3-minute executive tour and a 10-minute technical deep dive

## 1. Goal and core message

This guide is for solution architects (CSA/FDE) and technology partners demonstrating HVE Agent to game studios, interactive-media customers or R&D executives.

> If HVE Harness excels at creating one striking visual animation, HVE Agent shows how to engineer that visual and animation capability into a complete interactive 3D/2D game system—with a story, no dependency on external commercial assets, and automated verification using deterministic 60Hz simulation.

## 2. Option A: 3-minute executive tour

### Minute 1: the portal's live procedural-animation stage

1. Open the AI Gaming Lab portal and point to the **Interactive Procedural Animation Benchmark Stage**. All three engine capabilities are visible without leaving the page.
2. In **Tab 1 (Wanan 3D Engine)**, switch between RX-7 FD3S and Skyline GT-R BNR34. Enable each feature in turn:
   - Pop-up headlights: parametric hinge rotation and headlight cones.
   - Acceleration/braking pitch and cornering roll: body posture coupled to physical forces.
   - Twin blue-violet shift backfire and glowing rotors: transient particles and thermal emission.
   - Wireframe topology and wheel-arch inspection: real open wheel geometry, not textured boxes.
3. Switch to **Tab 2 (Scrap Swarm 2D Engine)**. Enable anime cut-ins and monochrome impact frames. Show R-17's rivet-cannon recoil and shell ejection, dash afterimages and Hector's armor fracture.
4. Switch to **Tab 3 (Echo & Comms)** and advance the narrative state-machine node. Show the Web Audio synthesis spectrum and twin-reel tape machine, with no external audio files.

### Minute 2: Wanan Midnight · East of Midnight

1. Choose **Play Wanan Midnight →**.
2. Select **Start story**, entering Shanghai Chapter 1, “Last-Service Lights.” Show the Echo Workshop's retro cassette dialogue UI and vehicle selection bench.
3. Start the Lupu Bridge night race. Hold **W** to accelerate, **A/D** to steer and **S** to brake hard into corners. Point out twin blue-violet exhaust backfire, glowing rotors and the Shanghai Bund/Lupu Bridge skyline.

### Minute 3: Scrap Swarm and the hangar

1. Return to the portal and choose **Play Scrap Swarm →**.
2. Press **Space** for core-dash afterimages and **Q** for the Overdrive anime cut-in. Show the articulated mechs' high-speed combat and radio-story pop-ups.
3. Open **Character & Mech Design Collection (Hangar) →**. Switch the five mechs among **cruise / attack / Overdrive / armor-break**, four live skeletal-animation states.

## 3. Option B: 10-minute architect deep dive

| Time | Topic | Demonstration |
| --- | --- | --- |
| 0:00–2:30 | Parametric surfaces versus static asset pipelines | Use wanan-midnight-technical-assets.html to explain how one TypeScript catalog—8 families, 44 generations—drives open arches, roof crowns and pop-up headlights while keeping the package below 300 KB gzip. |
| 2:30–5:00 | Articulated state machines and impact-frame direction | Use scrap-swarm-technical-assets.html to dissect R-17's 6 skeleton layers, parabolic shell physics, diagonal-speed-line cut-ins and monochrome impact compositing. |
| 5:00–7:30 | Asset-free Web Audio and multi-act narrative | Demonstrate five JDM engine harmonic synthesizers (rotary, twin-turbo inline-six, V6, boxer, inline-four), tunnel dual-delay reverb, and the 6-chapter East of Midnight / 3-act Scrap Swarm narrative state machines. |
| 7:30–10:00 | 60Hz deterministic harness and CI gates | In the browser console, demonstrate window.__labStage.getState(). Explain 30/60/120Hz fixed-step consistency, the modelsBuiltDuringRace === 0 guard and built-in autonomous completion bots running end-to-end regressions in GitHub Actions. |
`,
'game/research/scrap-swarm-technical-assets.html': String.raw`# Scrap Swarm technical assets: articulated mech state machines, anime impact direction and a deterministic 60Hz arena harness

## 1. Project overview and core advances

- Repository: [turbo998/scrap-swarm](https://github.com/turbo998/scrap-swarm)
- Live: [Play Scrap Swarm](../demos/scrap-swarm/) · [Character & Mech Design Collection (Hangar)](../demos/scrap-swarm/design/)
- Stack: TypeScript + Phaser 3 + Web Audio API + 60Hz Deterministic Arena Simulation + Vitest + Playwright.

Scrap Swarm builds a 2D arena action game with the dramatic impact of mech anime using mathematical geometry and hierarchical joint state machines alone: no external sprite sheets, Spine/DragonBones skeleton plugins or audio files.

## 2. Five procedural mech skeletons and anime direction

Code: <code>src/game/hangar.ts</code> and <code>src/scenes/GameScene.ts</code>.

### 2.1 R-17 “Forge Fist” — Greenbrook Highway Maintainer

Originally an autonomous highway-maintenance machine from Greenbrook, R-17 is modified by mechanic Maureen to represent the town in the Iron-Crown arena. Its skeleton has **6** layers of procedural geometry:

1. **Twin-load-wheel differential tracked chassis:** track teeth roll with velocity; steering creates a differential chassis tilt.
2. **Breathing suspension torso and steam valve:** low-frequency hydraulic breathing at rest; a forward streamlined lean during dashes.
3. **Three-stage right-arm hydraulic rivet cannon:** each shot retracts the recoil piston, flashes a muzzle arc and ejects rotating brass shells on parabolic trajectories.
4. **Rotating left-arm magnetic shield coil:** continuous rotation with expanding electromagnetic rings during blocks and magnetic shock attacks.
5. **Shoulder Overdrive radiator fins:** shoulder armor opens during core awakening, emitting gold/cyan plasma energy.
6. **Core-dash afterimages:** pressing **Space** creates layered translucent gold/cyan silhouettes along the path, with brief invulnerability and magnetic shock damage while crossing enemy groups.

### 2.2 Four enemy machine types, including champion Iron-Crown Hector

- **Scuttler:** alternating six-legged insect gait, an offset front cutting saw and sparks.
- **Brute:** heavy compressed four-wheel chassis, extending hydraulic ground-pound arms, charged amber warning rings, and black smoke/cracks at half health.
- **Zapper:** three-rotor anti-gravity ring, high-voltage Tesla arc sphere and sniper-laser lock line.
- **Iron-Crown Hector:** four-track mobile-fortress chassis, huge rotating saws on both arms and an Iron-Crown restraint on its chest. Armor fractures progressively in **P2/P3**; the final broken restraint exposes a disaster-era industrial rescue core.

### 2.3 Anime cut-ins and monochrome impact frames

- **Cut-in banner:** triggering Overdrive (**Q**), completing the repair-shed defense event or changing boss phase sends a diagonal-speed-line banner and pilot/mech nameplate across the screen.
- **Impact frames:** heavy critical hits and Hector's chest-lock break trigger high-contrast monochrome radial flashes, with **2–4 frames** of transient inversion to emphasize force.

## 3. Arena events and the three-act radio narrative

Code: <code>src/game/story.ts</code>.

### 3.1 Mobile Repair Shed Defense

Midway through **wave 2**, Greenbrook's mobile repair shed enters the arena center. Defend it from Brutes and Scuttlers for the time limit. Success grants arena-wide armor nano-repair and a core-overload buff, and unlocks a key story clue.

### 3.2 Three-act radio reversal

1. **Greenbrook enters the arena:** commentator Rex whips up the crowd while Maureen guides R-17 over an encrypted channel to test the modified rivet cannon and core dash.
2. **The truth behind welded service hatches:** recovered Scuttler wreckage and repair-shed scans reveal that the supposedly berserk enemy machines have had their service hatches and distress beacons deliberately welded shut by the Iron-Crown alliance.
3. **Hector's rescue logs decoded:** while facing the champion, R-17 receives intermittent Morse code leaking from Hector's underlying system. Hector was a heavy disaster-rescue machine, fitted with forced-combat restraints for arena revenue. R-17 precisely breaks the chest lock with Forge Fist instead of destroying the core, freeing Hector and broadcasting an open-source calibration protocol across the wasteland.

## 4. Deterministic 60Hz arena and automated verification

Code: <code>src/game/simulation.ts</code> and <code>src/dev/api.ts</code>.

- **Pure simulation kernel:** kinematics, collision detection, spawn waves, dash cooldowns, repair-shed timers and boss-phase state machines live in a DOM-independent Simulation module driven by a fixed-seed PRNG.
- **Test/demo probe, <code>window.__gameTest</code>:** supports autonomous combat via <code>setBot(true)</code>, core dash via <code>triggerDash()</code>, wave jumps and real-time telemetry, allowing Playwright E2E to reproduce complete runs **100% reliably** in a headless browser.
`,
'game/research/wanan-midnight-technical-assets.html': String.raw`# Wanan Midnight technical assets: 44 parametric cars, pop-up headlights, dynamic body animation and six Shanghai story chapters

## 1. Overview and architecture boundaries

- Repository: [turbo998/ai-gaming-lab](https://github.com/turbo998/ai-gaming-lab)
- Live: [Play Wanan Midnight · East of Midnight](../demos/wanan-midnight/)
- Stack: TypeScript + Three.js (WebGL2) + Web Audio API + Vitest + Playwright.

Wanan Midnight · East of Midnight is a code-only 3D late-night elevated-road racing game: **8 families and 44 generations** of JDM cars, a hand-authored **6-kilometer** route through Shanghai's elevated highway, cross-river bridge, underwater tunnel, outer-harbor S-bends and east-bank lighthouse, three named AI opponents, and the six-chapter original story **East of Midnight**.

## 2. Parametric surfaces and mechanics for 8 families / 44 generations

Code: <code>src/vehicles/catalog.ts</code> and <code>src/render/</code>.

### 2.1 Frozen vehicle catalog and real-world proportions

All **44** vehicle IDs bind independent geometry profiles, collision envelopes, drivetrain layouts (**FR / F-AWD / MR / M-AWD**), five synthesized engine timbres and local-record keys.

| Family | Generations | IDs and reference proportions |
| --- | --- | --- |
| GT-R | 6 | kpgc10, kpgc110, bnr32, bcnr33, bnr34 (official M-Spec Nür reference: 4600×1780×1360mm; wheelbase 2665mm), r35 |
| Fairlady Z | 7 | s30, s130, z31, z32, z33, z34, rz34 |
| Supra | 5 | a40, a60, a70, a80, a90 |
| RX-7 | 3 | sa22c, fc3s, fd3s |
| NSX | 2 | na1, nc1 |
| Silvia | 7 | csp311, s10, s110, s12, s13, s14, s15 |
| Lancer Evolution | 10 | evo1–evo10 |
| Impreza WRX STI | 4 | gc8, gdb, grb, vab |

### 2.2 Open wheel arches and real-time mechanics

- **Open arches and separate surfaces, <code>src/render/profiles.ts</code>:** replace closed six-sided boxes with high-density hoods, roof crowns, fastback/notchback rear bodies, open side wheel-arch cutouts and independent transparent cabin glass.
- **Pop-up headlight actuation:** fd3s, fc3s, sa22c, na1, a60, a70, z31 and s12 have independent rotating hinge nodes, operable on the workshop bench and on the track.
- **60Hz suspension posture:** longitudinal acceleration differences drive acceleration pitch and braking dive. Lateral curvature and steering input drive body roll and front-wheel angles in real time.
- **Twin blue-violet backfire and glowing rotors:** high-RPM throttle lifts/downshifts create gradient flame-cone particles at both exhaust outlets. Hard braking makes all four ventilated rotors glow orange-red according to braking power; after brake release they cool according to the thermal-decay time constant.

## 3. Six Shanghai chapters and the Echo Workshop sound archive

Code: <code>src/story/</code>.

The Echo Workshop is about to move away from the Huangpu waterfront. Recording editor and apprentice **Chen Yu** tries to preserve its memory in six elevated-road night recordings, growing through six nights of encounters with three rivals.

| Chapter | Title | Narrative conflict and recording theme | Optional challenge |
| --- | --- | --- | --- |
| 1 | Last-Service Lights | As the first moving box is sealed, Chen Yu proposes recording six night-highway master tapes. | Finish in the top 3 |
| 2 | Between the Bridge Joints | Precision mechanic Shen Yan (BNR34): not every kind of value can be reduced to one fastest-lap number. | Collisions ≤ 3 |
| 3 | Don't Film the Finish | Photographer Tang Cheng (FD3S) refuses to turn the workshop's living people into a nostalgic postcard backdrop. | Finish ahead of Tang Cheng |
| 4 | The Echo Does Not Answer | Proprietor Lin Lan admits that faster records cannot reverse a lease or urban renewal: memory belongs to people, not walls. | Finish in the top 2 |
| 5 | Leave the Road Open | Former endurance racer Xu Zhiheng (NA1) admits that apparent distance conceals fear of competing wholeheartedly again. | Collisions ≤ 2 |
| 6 | East of Midnight | The finale's ensemble turns winning and losing into shared memory; the new workshop's lights already shine east of midnight. | Finish 1st |

**Three permanent honor tiers:** after Chapter **6**, historical best results earn **Front-Runner** (ever finished the finale **1st**), **Fellow Traveler** (completed at least **3** chapter challenges), or **Arrival**. Replays never deduct or overwrite the highest honor already earned.

## 4. Verification and performance baseline

Code/evidence: <code>tests/</code> and <code>artifacts/</code>.

- **Unit tests and determinism:** **78+ Vitest tests** cover all **44** cars' geometry bounds, no-traffic/same-controller lap balance (**deviation ≤ 5%**), high-speed swept collisions and full-run consistency at **30/60/120Hz**.
- **Browser E2E and zero mesh allocation:** Playwright covers real keyboard input, workshop mechanical switches, all **6** chapters' dialogue and completion, pause/focus-loss protection, and the <code>modelsBuiltDuringRace === 0</code> guard.
`
};
const runtimeEditions = ['animation/index.html','generative-visual-lab/index.html','bilibili-explainers/index.html','voice/index.html','voice/case-study.html','workshops/azure-agent-infra/index.html','workshops/deepinfer-v41-economics/index.html'];
const englishTerms = {
  '5. Cycle #377 工作台':'5. Cycle #377 workbench',
  '🧪 打开 Cycle #377 可复现实验工作台':'🧪 Open the reproducible Cycle #377 workbench',
'Stage 466 · 522 精选 + 23 风格':'Stage 466 · 522 selections + 23 styles',
'× 放大)':'× amplification)',
'27.8s · 667帧':'27.8s · 667 frames','31.0s · 745帧':'31.0s · 745 frames','31.6s · 758帧':'31.6s · 758 frames','31.8s · 765帧':'31.8s · 765 frames','33.5s · 805帧':'33.5s · 805 frames','32.6s · 784帧':'32.6s · 784 frames',
'5大仓库收官总览 · 6部卡通短片':'Final overview of 5 repositories · 6 cartoon shorts',
'EP01 · 扔掉500MB贴图包！小画师用纯数学画敦煌飞天与火星':'EP01 · Discard the 500MB texture pack: paint Dunhuang Feitian and Mars with mathematics',
'Stage 196 · 0外部CDN · 55/55单测':'Stage 196 · 0 external CDNs · 55/55 unit tests',
'Shot A：小画师Clawd背着500MB贴图木箱累得冒汗，一脚把木箱踢进垃圾桶，抽出闪光SDF数学画笔！':'Shot A: Clawd sweats under a wooden crate of 500MB textures, kicks it into the bin and draws a glowing SDF mathematical paintbrush!',
'Shot B：敦煌石窟舞台，小画师挥动画笔，红绿双面金边飘带在60帧（16.7ms）丝滑舞动！':'Shot B: On a Dunhuang cave stage, the painter waves a brush; red-and-green, gold-edged ribbons dance smoothly at 60 frames (16.7ms)!',
'Shot C：飞向星空，激光笔在火星圆球上精准雕刻奥林帕斯山与水手号大峡谷真实MOLA高程！':'Shot C: Into the stars: a laser pen carves the real MOLA elevations of Olympus Mons and Valles Marineris into a Martian sphere!',
'Shot D：按下火箭发射钮，白色小火箭喷出璀璨马赫环冲上云霄，196关通关！':'Shot D: Press launch: a small white rocket emits brilliant Mach diamonds and soars into the sky. Stage 196 cleared!',
'EP02 · 给语音AI装上顺风耳与防弹盾！100关大满贯':'EP02 · Give voice AI super-hearing and a protective shield: a 100-stage grand slam',
'Stage 100 百关大满贯 · 203道防线':'Stage 100 grand slam · 203 defense checks',
'Shot A：呆滞铁皮机器人慢吞吞吐出STT纸条，Clawd急得直冒汗，一把推开旧机器！':'Shot A: A sluggish tin robot slowly spits out STT slips. An impatient, sweating Clawd pushes the old machine aside!',
'Shot B：黄小人与青小人戴上原生全双工耳机，彩色气泡双向秒级打断、对答如流！':'Shot B: Yellow and cyan figures wear native full-duplex headsets. Colored bubbles interrupt bidirectionally within seconds and exchange fluent answers!',
'Shot C：黑客发射红色尖刺欺骗声波，小卫士举起双层青色护盾（203道防线）把坏声波统统弹飞！':'Shot C: A hacker fires deceptive red spiked sound waves. A guard raises a double cyan shield (203 defense checks), deflecting them all!',
'Shot D：面对化工厂反应釜报警，小人零延迟一把拉下红色安全闸门，欢呼拿下Stage 100百关里程碑！':'Shot D: A chemical reactor alarm sounds. The figure pulls the red safety gate without delay and celebrates the Stage 100 milestone!',
'EP03 · 算力高铁与月饼冷库：万亿大模型提速秘籍':'EP03 · Compute express trains and Mooncake cold storage: accelerating trillion-parameter models',
'Phase 70 里程碑 · Rubin MegaMoE + Mooncake':'Phase 70 milestone · Rubin MegaMoE + Mooncake',
'Shot A：红色老火车头被成堆KV木箱堵在独木桥上直冒黑烟，调度员Clawd急得跳脚！':'Shot A: Piles of KV crates block an old red locomotive on a narrow bridge. Black smoke rises as dispatcher Clawd jumps in frustration!',
'Shot B：拉下Rubin MegaMoE道岔，金光闪闪的256通道算力高架桥点亮，蓝色动车组飞驰而过！':'Shot B: Pull the Rubin MegaMoE switch: a golden 256-lane compute viaduct lights up and blue express trains race across!',
'Shot C：小厨师把算好的KV记忆做成发光黄金月饼（Mooncake），从算力火车头精准抛进远端冷库！':'Shot C: A little chef shapes computed KV memories into glowing golden mooncakes (Mooncake), tossing them precisely from the compute locomotive into remote cold storage!',
'Shot D：太阳升起，全栈70座灯塔点亮，算力列车高速平稳飞驰，Phase 70大功告成！':'Shot D: The sun rises, all 70 full-stack lighthouses light up, and compute trains run fast and smoothly. Phase 70 complete!',
'EP04 · AI管家逛街买单，怎样做到一分钱都不算错？':'EP04 · An AI assistant goes shopping: how can every cent be accounted for correctly?',
'Stages 226–227 · 868/868 单测全绿':'Stages 226–227 · 868/868 unit tests passing',
'Shot A：买家与卖家小人隔着木桌互相拉扯大金币争吵不休，头顶冒出怒气云！':'Shot A: Buyer and seller tug a giant gold coin across a wooden table, arguing under angry clouds!',
'Shot B：警长Clawd端来黄金纳什博弈天平，魔法棒一点，左右秤盘稳稳对齐双赢平衡！':'Shot B: Sheriff Clawd brings a golden Nash-game balance. One tap of a magic wand aligns both pans at a win-win equilibrium!',
'Shot C：带电火花伪造账单袭来，警长转动99.9999999%金库手轮，三把安全铜锁咔嚓锁死！':'Shot C: A forged bill crackles with electricity. The sheriff turns the 99.9999999% vault wheel and three brass security locks click shut!',
'Shot D：金库旁868颗金色星星闪耀，三个小人开心庆祝智能体商务实验室通关！':'Shot D: 868 golden stars shine beside the vault. Three figures celebrate completing the agentic-commerce laboratory!',
'EP05 · 1650度矿热高炉旁的AI守门人：0.2毫秒生死线':'EP05 · AI guardian beside a 1650-degree submerged-arc furnace: the 0.2-millisecond safety line',
'Cycle #179 · 185章 · 180套蓝图 · 188/188单测':'Cycle #179 · 185 chapters · 180 blueprints · 188/188 unit tests',
'Shot A：1650℃密闭矿热高炉剧烈震动、炉顶火星四溅，工程师Clawd惊出一身冷汗！':'Shot A: A sealed 1650℃ submerged-arc furnace shakes violently and sparks fly from its top. Engineer Clawd breaks into a cold sweat!',
'Shot B：戴上10kHz激光透视镜，发射青色TDLAS激光束配合PINN-MPC物理大脑看穿炉内暗流！':'Shot B: Put on 10kHz laser goggles. Cyan TDLAS beams and a PINN-MPC physics brain reveal hidden flows inside the furnace!',
'Shot C：千钧一发之际，0.2毫秒拉下SIL-3安全闸门，高压氮气冰蓝护盾瞬间抚平高炉！':'Shot C: At the critical moment, the SIL-3 safety gate closes in 0.2 milliseconds. An icy-blue, high-pressure nitrogen shield instantly calms the furnace!',
'Shot D：185章工业圣经与180套云边蓝图全部落地，小人小队与高炉在晨光中欢呼庆祝！':'Shot D: All 185 industrial chapters and 180 cloud-edge blueprints are delivered. The team and furnace celebrate in the morning light!',
'图1 · 四层全景架构':'Figure 1 · Four-layer architecture','图2 · 六大运行时矩阵':'Figure 2 · Six-runtime matrix','图3 · 双阶段选型决策树':'Figure 3 · Two-stage selection tree','图4 · AKSClaw 多租户 K8s':'Figure 4 · AKSClaw multi-tenant K8s','图5 · E2B on VMSS 生产架构':'Figure 5 · E2B on VMSS production architecture','图6 · Firecracker 内部机理 & v7 实测':'Figure 6 · Firecracker internals & v7 measurements','图7 · 多智能体流 & HorizonDB':'Figure 7 · Multi-agent flow & HorizonDB','图8 · Playbook 六大场景与五步法':'Figure 8 · Six scenarios and five-step playbook',
'Layer 2 · Run (Azure 六级可组合计算与沙箱运行时光谱)':'Layer 2 · Run (Azure six-tier composable compute and sandbox runtime spectrum)',
'绝不一刀切：从平台全托管 Foundry Hosted Agents，到 Hyper-V 隔离的 ACA Dynamic Sessions (~210ms)，再到支持显式 pause/resume 快照的 ACA Sandboxes (Preview)。':'No one-size-fits-all choice: from fully managed Foundry Hosted Agents to Hyper-V-isolated ACA Dynamic Sessions (~210ms) and ACA Sandboxes (Preview) with explicit pause/resume snapshots.',
'多租户平台级控制：AKS 原生集成 Kata Containers Pod VM (kata-mshv-vm-isolation)，为每个 Agent Pod 提供独立 Guest Kernel。':'Multi-tenant platform control: AKS natively integrates Kata Containers Pod VMs (kata-mshv-vm-isolation), providing an independent guest kernel for each agent pod.',
'极致规模与速度：在 Standard_D96as_v7 (5th Gen AMD EPYC Turin + Azure Boost) 上部署 E2B BYOC / VMSS 集群（实测 Base 108ms / CI 132ms），配合 Nomad 双层心跳防抖 (lost_after=50s + heartbeat_grace=50s) 与 ClickUp 68 工具黄金模板 + 10x–20x 上下文卸载。':'Scale and speed: deploy E2B BYOC / VMSS on Standard_D96as_v7 (5th Gen AMD EPYC Turin + Azure Boost), measured at Base 108ms / CI 132ms, with two-layer Nomad heartbeat protection (lost_after=50s + heartbeat_grace=50s), ClickUp golden templates with 68 tools and 10x–20x context offloading.',
'Layer 3 · Ground (模型、知识检索与三层状态记忆底座)':'Layer 3 · Ground (models, knowledge retrieval and three-layer state/memory foundation)',
'Azure HorizonDB (Preview)：在单一 PostgreSQL 引擎内融合 ACID 事务、JSONB 半结构化消息树与 DiskANN 向量检索，存算分离并支持最高 15 个只读副本。':'Azure HorizonDB (Preview): combines ACID transactions, JSONB semi-structured message trees and DiskANN vector retrieval in one PostgreSQL engine, with separated storage/compute and up to 15 read replicas.',
'OpenAI PostgreSQL 生产启示：通过 PgBouncer 将连接建立耗时从 45ms 降至 5ms，结合 Cache Lease Lock 防缓存击穿，单主+50只读副本支撑 8 亿用户 100万+ QPS。':'OpenAI PostgreSQL production lesson: PgBouncer reduces connection setup from 45ms to 5ms; cache lease locks prevent stampedes. One primary plus 50 read replicas supports 800 million users and 1 million+ QPS.',
'德国商业银行 (Commerzbank) 标杆：基于 Foundry + ACA + AKS + Cosmos DB 打造虚拟助手 Ava，支撑每月 30,000+ 会话，~75% 客户咨询全自动闭环。':'Commerzbank reference: its Ava virtual assistant uses Foundry + ACA + AKS + Cosmos DB, supporting 30,000+ monthly conversations and fully automating ~75% of customer inquiries.',
'State Golden Rule: 业务检查点与长期记忆写回 HorizonDB/Cosmos DB；进程内存与文件系统现场交由 Sandbox Snapshot (UFFD + NBD) 冻结。':'State Golden Rule: persist business checkpoints and long-term memory in HorizonDB/Cosmos DB; freeze process memory and filesystem state with Sandbox Snapshot (UFFD + NBD).',
'Layer 4 · Control & Govern (零信任身份、统一 AI 网关与舰队治理)':'Layer 4 · Control & Govern (zero-trust identity, unified AI gateway and fleet governance)',
'Microsoft Entra Agent ID：每个 Agent 绑定 Blueprint 与人类责任人 (Owner/Sponsor)；严禁 Agent 直接继承用户登录 Token，按单次动作签发短时最小权限凭证。':'Microsoft Entra Agent ID: bind every agent to a blueprint and human Owner/Sponsor; never directly inherit a user sign-in token. Issue short-lived, least-privilege credentials for each action.',
'Unified AI Gateway：Agent 容器内零 LLM API Key；支持 Prefix-Cache 会话亲和路由、OTel GenAI 零侵入遥测，以及 User/Team/Agent 三级配额与预算硬熔断。':'Unified AI Gateway: no LLM API keys inside agent containers; supports prefix-cache session-affinity routing, non-invasive OTel GenAI telemetry and hard quota/budget cutoffs at User/Team/Agent levels.',
'AKSClaw 五道不可绕过硬边界：NetworkPolicy 封禁 169.254.169.254 (IMDS)、严格出向白名单、凭据代理注入、平台强制身份绑定、旁路全量审计。':'Five non-bypassable AKSClaw boundaries: NetworkPolicy blocks 169.254.169.254 (IMDS), strict egress allowlists, credential-proxy injection, platform-enforced identity binding and complete out-of-band auditing.',
'APIM 隔离 100,000+ 并发动态沙箱子域名':'APIM isolates 100,000+ concurrent dynamic sandbox subdomains',
'图 2 · Azure 六大 Agent Runtime 责任边界、隔离机制与恢复延迟矩阵':'Figure 2 · Responsibility boundaries, isolation and resume latency of six Azure agent runtimes',
'图 3 · AI Agent Infra on Azure 双阶段架构选型决策树与数据底座配对图':'Figure 3 · Two-stage architecture selection tree and data-foundation pairing for AI Agent Infra on Azure',
'图 4 · AKSClaw 多租户 Kubernetes Agent 平台参考架构 (6 大核心支柱与 5 道平台硬边界)':'Figure 4 · AKSClaw multi-tenant Kubernetes agent platform (6 pillars and 5 hard platform boundaries)',
'图 5 · E2B on Azure VMSS 生产级参考架构图 (Manus × E2B 10万+ 并发云端沙箱底座)':'Figure 5 · E2B on Azure VMSS production architecture (Manus × E2B foundation for 100,000+ concurrent cloud sandboxes)',
'图 6 · Firecracker MicroVM 沙箱内部机理 (UFFD + NBD) 与 Azure v6/v7 实测启动延迟对比':'Figure 6 · Firecracker MicroVM sandbox internals (UFFD + NBD) and measured Azure v6/v7 startup latency',
'图 7 · 多智能体协同工作流 (MAF × Copilot SDK × Durable) 与状态持久化选型矩阵':'Figure 7 · Multi-agent workflow (MAF × Copilot SDK × Durable) and state-persistence selection matrix',
'图 8 · Azure Agent Infra Playbook 六大高优场景、四维资质筛查与五步落地工作流':'Figure 8 · Azure Agent Infra Playbook: six priority scenarios, four-dimensional qualification and five-step delivery',
'P2 · High Potential (通过 Discovery 补齐底座信号)':'P2 · High Potential (complete foundation signals through Discovery)',
'Nurture · 基础培育阶段':'Nurture · Foundation development phase',
'四维底座覆盖数：':'Technical foundation coverage: ', '潜客门禁通过：':'Prospect gates passed: ',
'✅ 已命中':'✅ Met', '⚪ 未命中':'⚪ Not met','✅ 已达标 (计入强模型信号)':'✅ Met (counts as a strong model signal)',
'ℹ️ 未达 $10K/月 (不影响真实 ACR 金额，仍可由非模型路径晋级 P1)':'ℹ️ Below $10K/month (does not change actual ACR; the non-model path can still qualify for P1)',
'进入 Step 02 Discovery：围绕客户现有底座探讨长周期任务状态恢复、不可信代码沙箱隔离与统一 AI 网关治理需求。':'Proceed to Step 02 Discovery: discuss long-running task recovery, isolation for untrusted code and unified AI gateway governance against the existing customer foundation.',
'🌙 谷电价 Off-Peak (1× · $38 基线)':'🌙 Off-Peak (1× · $38 baseline)','☀️ 高峰价 Peak (2× · $76 上限)':'☀️ Peak (2× · $76 ceiling)','↺ 恢复官方基线':'↺ Reset to the official baseline','× 放大':'× amplification','谷电价 (1.0×)':'Off-peak (1.0×)','高峰正价 (2.0×)':'Peak (2.0×)',' · 成本 $':' · Cost $',
'🎨 Clawd 水彩手绘卡通知识短片剧场':'🎨 Clawd Watercolor Cartoon Explainer Theater',
'Opus 5.5 Painted-Animation · 16:9 横屏纯享':'Opus 5.5 Painted-Animation · 16:9 landscape viewing',
'告别 PPT 录屏与竖屏模板 · 全程 p5.brush 水彩晕染 + 8Hz 手绘抖动墨线 + 角色表演分镜 + 欢快木琴配音':'Beyond slide recordings and portrait templates: p5.brush watercolor washes, 8Hz hand-drawn ink jitter, character-driven storyboards and cheerful xylophone narration',
'6 部横屏卡通短片':'6 landscape cartoon shorts',
'Kubelka-Munk 水彩颜料混合':'Kubelka–Munk watercolor pigment mixing',
'EP00 · 凌晨零点的AI小人国：五路通宵大闯关（总览篇）':'EP00 · Midnight in AI Miniature Land: Five Overnight Adventures (Overview)',
'⏱️ 27.8s · 667帧':'⏱️ 27.8s · 667 frames',
'🏆 5大仓库收官总览 · 6部卡通短片':'🏆 Final overview of 5 repositories · 6 cartoon shorts',
'🎬 手绘分镜脚本（4-Shot Cartoon Storyboard）':'🎬 Hand-drawn screenplay (4-Shot Cartoon Storyboard)',
'Shot A：午夜00:00挂钟敲响，原本戴睡帽打呼噜的橘色小方块Clawd换上魔法帽，召唤出五颜六色的AI小分队！':'Shot A: At 00:00, the clock strikes midnight. Clawd, the snoring orange block in a nightcap, dons a wizard hat and summons a colorful AI team!',
'Shot B：分屏奇观——左屏黄小人拿激光刻刀雕刻MOLA火星大峡谷（Stage 196），右屏青小人举双层光盾弹飞超声波暗箭（Stage 100）！':'Shot B: Split screen: a yellow figure laser-carves MOLA Martian canyons (Stage 196); a cyan figure deflects ultrasonic arrows with a double light shield (Stage 100)!',
'Shot C：三联工坊——紫小人调度256条算力高铁、绿小人锁死9个9安全金库、粉小人用0.2ms氮气护盾驯服1650℃高炉！':'Shot C: Three workshops: a purple figure dispatches 256 compute trains, a green figure locks a nine-nines vault, and a pink figure tames a 1650℃ furnace with a 0.2ms nitrogen shield!',
'Shot D：清晨08:00太阳升起，六个小人在绿茵山坡排排站戴上皇冠欢呼跳跃，通宵科研大满贯！':'Shot D: At 08:00 sunrise, six crowned figures cheer and jump on a grassy hill: an overnight research grand slam!',
'🖼️ 8 帧水彩手绘分镜预览表（Contact Sheet）':'🖼️ 8-frame watercolor storyboard contact sheet',
'📺 选择剧集（6 部 16:9 卡通动画短片）':'📺 Select an episode (6 cartoon shorts in 16:9)',
'打开 http://localhost:3000 即可麦克风对话':'Open http://localhost:3000 for microphone conversation',
'RTF 0.057 · 100% 标记率':'RTF 0.057 · 100% attribution rate',
'单声道混合录音：必须显式开启 diarization.enabled=True':'Mixed mono recording: explicitly enable diarization.enabled=True',
'联络中心双声道录音 (左=客服 ch0 / 右=客户 ch1)：物理音轨分离最快最准':'Stereo contact-center recording (left=agent ch0 / right=customer ch1): physical channel separation is fastest and most accurate',
'实测 224.8s 真实通话仅耗时 12.9s (RTF=0.057)，28/28 句 100% 准确归属':'Measured: a 224.8s real call took 12.9s (RTF=0.057), with 28/28 utterances attributed correctly (100%)',
'STAGE 01 · 接入与打断':'STAGE 01 · Connection and interruption',
'STAGE 02 · 零幻觉查单':'STAGE 02 · Hallucination-free order lookup',
'STAGE 03 · 人机无缝转接':'STAGE 03 · Seamless human handoff',
'STAGE 04 · 录音秒级质检':'STAGE 04 · Recording quality checks in seconds',
'客服双通道核心模式：turnEpoch 防止用户打断后旧工具结果串话':'Core dual-channel service pattern: turnEpoch prevents stale tool results after an interruption',
'客户开口打断：递增 turnEpoch 并取消当前语音输出':'Customer interruption: increment turnEpoch and cancel current speech output',
'模型请求查询订单或核算退费金额':'The model requests an order lookup or refund calculation',
'若客户已打断并开启新一轮对话，丢弃旧结果':'Discard stale results if the customer interrupted and began a new turn',
'从全托管 Foundry 到自建 MicroVM 连续光谱':'A continuous spectrum from fully managed Foundry to self-hosted MicroVMs',
'D96as_v7 (AMD Turin) E2B Base / CI 启动实测':'Measured E2B Base / CI startup on D96as_v7 (AMD Turin)',
'APIM 按动态 Host 独立限流并发沙箱会话':'APIM independently rate-limits concurrent sandbox sessions by dynamic Host',
'AKSClaw 平台强制安全硬边界 (零容器密钥)':'AKSClaw platform-enforced security boundaries (zero container secrets)',
'Foundry Toolboxes 企业连接器 + Entra Agent ID':'Foundry Toolboxes enterprise connectors + Entra Agent ID',
'一、四层全栈参考架构交互解构（点击任一层级查看深度机制与防坑指南）':'1. Interactive four-layer reference architecture (select a layer for mechanisms and pitfalls)',
'计算与状态解耦、沙箱硬件虚拟化隔离、平台级零信任身份是生产级 Agent 的三大基石。':'Decoupled compute/state, hardware-virtualized sandbox isolation and platform-level zero-trust identity are the three foundations of production agents.',
'Layer 1 · Build (Agent Harness 编排与执行循环层)':'Layer 1 · Build (Agent Harness orchestration and execution loop)',
'Layer 2 · Run (Azure 6-Tier Agent Runtime 计算与沙箱层)':'Layer 2 · Run (Azure 6-Tier Agent Runtime compute and sandbox layer)',
'Microsoft Agent Framework (MAF)：统一跨单智能体与多智能体工作流的编排标准，运行在 ACA/AKS/Functions 上时自动继承可观测性、Entra Agent ID 与安全合规策略。':'Microsoft Agent Framework (MAF): a unified orchestration standard for single- and multi-agent workflows. Running on ACA/AKS/Functions inherits observability, Entra Agent ID and security/compliance policies.',
'GitHub Copilot SDK：将经过生产验证的 Coding Agent 推理循环（规划、文件编辑、Shell 执行、MCP 调用）直接作为可编程内核嵌入企业自建管线。':'GitHub Copilot SDK: embed a production-tested coding-agent reasoning loop—planning, file editing, shell execution and MCP calls—as a programmable kernel in enterprise pipelines.',
'BYO 开源框架自由混部：通过 AKSClaw 通用容器契约，同一集群可同时运行 OpenClaw、Hermes、LangGraph、CrewAI 等异构 Agent 实例。':'Bring your own open-source framework: the AKSClaw generic container contract allows OpenClaw, Hermes, LangGraph, CrewAI and other agent instances to coexist in one cluster.',
'MAF + GitHub Copilot SDK 协同回路':'MAF + GitHub Copilot SDK collaboration loop',
'二、高清矢量架构图与工作流图谱（8 张自包含 SVG 图集）':'2. High-resolution architecture and workflow diagrams (8 self-contained SVGs)',
'点击下方标签切换查看四层全景图、六大运行时矩阵、双阶段决策树、AKSClaw、E2B on VMSS、Firecracker UFFD/NBD 内部机理、多智能体工作流与五步落地法。':'Use the tabs for the four-layer overview, six-runtime matrix, two-stage decision tree, AKSClaw, E2B on VMSS, Firecracker UFFD/NBD internals, multi-agent workflow and five-step adoption method.',
'图 1 · Azure AI Agent Infra 四层全栈参考架构全景图 (Build · Run · Ground · Govern)':'Figure 1 · Azure AI Agent Infra four-layer reference architecture (Build · Run · Ground · Govern)',
'三、Azure 六大 Agent Runtime 深度选型对比表':'3. Detailed comparison of six Azure agent runtimes',
'评估维度':'Evaluation dimension','隔离边界':'Isolation boundary','托管服务级边界':'Managed-service boundary','Hyper-V 硬件虚拟化':'Hyper-V hardware virtualization','隔离容器 + 端口/网络策略':'Isolated containers + port/network policies','Kata Pod VM 独立内核':'Kata Pod VM independent kernel','不可信代码执行':'Untrusted code execution','不支持 (仅受控工具)':'Not supported (controlled tools only)','不支持 (控制流编排)':'Not supported (control-flow orchestration)','原生支持 (Python/容器)':'Native support (Python/containers)','原生支持 (完整 OCI + Shell)':'Native support (full OCI + Shell)','原生支持 (Pod VM CLI/脚本)':'Native support (Pod VM CLI/scripts)','原生支持 (完整 OS + GUI 桌面)':'Native support (full OS + GUI desktop)','状态与快照机制':'State and snapshots','托管线程 / Cosmos DB':'Managed threads / Cosmos DB','Durable 检查点自动重放':'Automatic Durable checkpoint replay','空闲回收即清零 (需外置 DB)':'Reset on idle recycling (external DB required)','内存/磁盘快照 + 持久卷':'Memory/disk snapshots + persistent volumes','共享只读技能 PV + 独占状态 PV':'Shared read-only skill PV + private state PV','UFFD 内存按需缺页 + NBD 差分块':'UFFD on-demand memory paging + NBD differential blocks','实测/典型恢复延迟':'Measured / typical resume latency','~95 ms 热唤醒':'~95 ms warm wake-up','(预热池分配)':'(warm-pool allocation)','(快照恢复)':'(snapshot restore)','典型黄金场景':'Typical best-fit scenario','To-B 标准企业 API 助手':'Standard enterprise API assistant','采购/财务跨天人工审批流':'Multi-day procurement/finance human approvals','短平快代码解释器/文件解析':'Short-lived code interpretation / file parsing','Coding Agent / 浏览器工作台':'Coding agent / browser workbench','多租户研发/SRE 舰队平台':'Multi-tenant engineering/SRE fleet platform','10万+ 并发云端虚拟电脑 (Manus)':'100,000+ concurrent cloud virtual computers (Manus)',
'四、Playbook 四维技术底座与商机成熟度交互自测器（脱敏方法论）':'4. Four-dimension technical foundation and opportunity-readiness self-assessment (anonymized methodology)',
'勾选客户当前在 5 个月窗口内已持续活跃（≥3个月且含最近连续 2 个月）的技术信号，实时判定 Strong ACR (P1) / Potential (P2) 梯队及推荐五步推进动作：':'Select technology signals active in a 5-month window (≥3 months including the latest 2 consecutive months) to classify Strong ACR (P1) / Potential (P2) and recommend the five-step next action:',
'已持续使用 AKS 或 Azure Container Apps (ACA)':'Sustained AKS or Azure Container Apps (ACA) usage','使用 App Service / Functions / Batch / Azure VM':'Uses App Service / Functions / Batch / Azure VM','已持续使用 PostgreSQL (HorizonDB) / Cosmos DB / Redis':'Sustained PostgreSQL (HorizonDB) / Cosmos DB / Redis usage','已持续使用 AI Search / Foundry Tools / APIM':'Sustained AI Search / Foundry Tools / APIM usage','最近连续 3 个月每月 Foundry Models 消费 ≥ $10,000':'Foundry Models spend ≥ $10,000/month for the latest 3 consecutive months','已部署 Azure Monitor / Key Vault / Defender':'Azure Monitor / Key Vault / Defender deployed','非模型相关基础设施近 5 个月前后端均值增长率 ≥ +20%':'Non-model infrastructure average growth between the beginning and end of the latest 5 months ≥ +20%',
'P1 · Strong ACR (立即推进目标架构与 Workshop)':'P1 · Strong ACR (proceed immediately to target architecture and workshop)','四维底座覆盖数：4 / 4 · 潜客门禁通过：5 / 5':'Technical foundation coverage: 4 / 4 · Prospect gates passed: 5 / 5',': ✅ 已命中':': ✅ Met',': ℹ️ 未达 $10K/月 (不影响真实 ACR 金额，仍可由非模型路径晋级 P1)':': ℹ️ Below $10K/month (does not change actual ACR; the non-model path can still qualify for P1)','推荐下一步现场动作 (5-Step Playbook)':'Recommended field action (5-Step Playbook)',
'直接进入 Step 03 Define & Step 04 Validate：组织半日/一日 Hands-on Workshop + 目标架构白板推演 (ACA Sandbox / AKSClaw / HorizonDB)。':'Proceed to Step 03 Define & Step 04 Validate: run a half-day/full-day hands-on workshop and target-architecture whiteboard session (ACA Sandbox / AKSClaw / HorizonDB).',
'五、E2B 深度研究：四阶段演进范式、BYOC 架构与 E2B on Azure 六大生产最佳实践':'5. E2B research: four evolution stages, BYOC architecture and six production practices on Azure',
'整合 E2B 四份一手核心资料：Nomad 心跳韧性混沌工程 (Robin Su, 2026)、ClickUp Brain² 企业级敏感数据沙箱实践、E2B BYOC (Azure/AWS/GCP) 架构规范，以及《Sandboxes are dead》迈向智能体驱动的动态私有云。':'Combines four primary E2B sources: Nomad heartbeat resilience chaos engineering (Robin Su, 2026), ClickUp Brain² sensitive enterprise-data sandbox practice, E2B BYOC (Azure/AWS/GCP) architecture, and Sandboxes are dead on agent-driven dynamic private clouds.',
'E2B 生产轨迹分类学 (Wave 1 → Wave 4 动态私有云)':'E2B production-trajectory taxonomy (Wave 1 → Wave 4 dynamic private cloud)','0 误杀 / 100% Ready':'0 false terminations / 100% Ready','Nomad lost_after=50s + heartbeat_grace=50s 消除 35% 误替换':'Nomad lost_after=50s + heartbeat_grace=50s eliminates 35% false replacements','ClickUp Brain² 上下文卸载 (Context Offloading) 等效扩容':'ClickUp Brain² context offloading for equivalent capacity expansion','黄金模板预烘焙工具链 + 9 a.m. 每分钟数千沙箱脉冲':'Prebaked golden-template toolchains + thousands of sandboxes per minute at 9 a.m.','Azure BYOC Terraform 交付 + ILB / Private Link 私网闭环':'Azure BYOC Terraform delivery + ILB / Private Link private networking','演进阶段 / 部署模式':'Evolution stage / deployment mode','核心定位与控制面归属':'Purpose and control-plane ownership','关键架构组件与边界':'Key architecture components and boundaries','生产实测指标与典型场景':'Measured production metrics and typical scenarios','Wave 1 → Wave 4 演进':'Wave 1 → Wave 4 evolution',
'从 2024 短代码片段 (Wave 1)、2025 全栈应用容器/K8s (Wave 2)、2026 运行整台电脑 (Wave 3) 迈向':'From short code snippets in 2024 (Wave 1), full-stack app containers/K8s in 2025 (Wave 2), and whole-computer execution in 2026 (Wave 3), toward ',
'专用持久存储 · 出向防火墙 · 跨沙箱内网 · 可观测性 · CPU/RAM 在线热扩缩 · 无头浏览器 · 凭据保险箱':'Dedicated persistent storage · egress firewall · cross-sandbox private networking · observability · live CPU/RAM scaling · headless browser · credential vault',
'基于':'Based on ','20 亿+ 次运行与数百亿条轨迹':'2 billion+ runs and tens of billions of trajectories',
'，在任务启动前预测所需工具、时长、CPU/RAM 与网络白名单并实时组装私有云':', predict tools, duration, CPU/RAM and network allowlists before task start and assemble a private cloud in real time',
'部署在':'Deployed in ','客户自有 Azure Subscription (VNet)':'the customer-owned Azure Subscription (VNet)','、AWS 或 GCP；E2B Cloud 仅接收 TLS 匿名 CPU/内存指标':', AWS or GCP; E2B Cloud receives only anonymized CPU/memory metrics over TLS','模板、内存快照、运行日志与沙箱流量 100% 不出客户 Azure VNet':'Templates, memory snapshots, execution logs and sandbox traffic remain 100% inside the customer Azure VNet','；满足金融与医疗 SOC 2 / HIPAA 强合规':'; meeting strict financial/healthcare SOC 2 / HIPAA compliance','运行于 E2B 官方 GCP 账户；':'Runs in the official E2B GCP account; ','为':'is ','单 Linux 宿主机开源包':'an open-source package for one Linux host','Cloud 提供零运维多租户 SaaS；Embed 适配单台 KVM 裸机、云 VM 或 K8s Node':'Cloud provides operations-free multi-tenant SaaS; Embed targets a single KVM bare-metal machine, cloud VM or K8s node','按合规等级平滑切换：原型期用 E2B Cloud，单机实验用 Embed，大规模生产上':'Switch by compliance level: E2B Cloud for prototypes, Embed for single-host experiments, and large-scale production on ',
'零凭据 Terraform 交付与 ILB 私网互联':'Credential-free Terraform delivery and private ILB networking','规划':'Plan ','独立 Azure Subscription':'a dedicated Azure Subscription','，本地执行 E2B Terraform 模块（需订阅':', run E2B Terraform modules locally (requires subscription ','全程零密钥交换':'zero secret exchange throughout','）。提前申请目标区域':'). Request the target-region ','(108ms/132ms) vCPU 配额；通过':'(108ms/132ms) vCPU quota in advance; use ','（或 VNet Peering）与 APIM 动态 Host 网关私网直连。':'(or VNet Peering) for a direct private connection to the APIM dynamic-Host gateway.',
'消除 yamux 静默断连引发的 35% 误杀风暴':'Eliminate the 35% false-termination storm caused by silent yamux disconnects','非 Leader Nomad Server 静默宕机时，':'When a non-leader Nomad server silently fails, ','需':'requires ','探知断连，慢于默认':'to detect disconnection, slower than the default ','心跳超时，导致':'heartbeat timeout, causing ','健康节点被误杀、剩余节点负载激增':'healthy nodes to be falsely terminated and surviving nodes to overload','。必须双层加固：(1) Job Group 配置':'. Harden both layers: (1) configure the Job Group with ','0 替换、10/10 沙箱与 23/23 NDJSON 流完好':'0 replacements, 10/10 sandboxes and 23/23 NDJSON streams intact','）；(2) Server 配置':'); (2) configure the server with ','20/20 节点 100% ready':'20/20 nodes 100% ready',
'10x–20x 上下文卸载与 9 a.m. 潮汐预热':'10x–20x context offloading and scheduled 9 a.m. warming','借鉴 ClickUp（服务 85% 财富 500 强，SOC 2 & HIPAA）：将大表格与录像直接上传沙箱由代码解析，仅回传结果实现':'Following ClickUp (serving 85% of the Fortune 500, SOC 2 & HIPAA): upload large spreadsheets and recordings directly to sandboxes, parse them in code, and return results only, achieving ','10x–20x 等效上下文扩容':'10x–20x equivalent context expansion','；预烘焙含':'; prebake golden templates with ','68 个工具':'68 tools','的黄金模板 + 6 大职能模板；结合':' plus 6 functional templates; combine ','定时预热池 + 60% CPU 扩容 + 15–30 分钟 Pause/Resume (`UFFD+NBD`) + HorizonDB 检查点':'scheduled warm pools + scale-out at 60% CPU + 15–30 minute Pause/Resume (UFFD+NBD) + HorizonDB checkpoints','应对早 9 点每分钟数千沙箱洪峰。':'to absorb the 9 a.m. peak of thousands of sandboxes per minute.',
'96.0% (25.0× 放大)':'96.0% (25.0× amplification)','谷电价 (1.0×) · 成本 $7.50/hr':'Off-peak (1.0×) · Cost $7.50/hr','硬件毛利率: 80.3%':'Hardware gross margin: 80.3%','★ 线上主力甜点 conc=60 (14.5K tok/s/GPU @ 230 tok/s)':'★ Online sweet spot conc=60 (14.5K tok/s/GPU @ 230 tok/s)','★ 离线吞吐极限 conc=256 (25.6K tok/s/GPU)':'★ Offline throughput limit conc=256 (25.6K tok/s/GPU)','X: 单卡输出吞吐 (Output Tokens/s/GPU) · Y: 单用户生成速度 (Tokens/s/User)':'X: Output tokens/s/GPU · Y: Generation tokens/s/user','并发档位 (EP64/DP64) · 灰=固定验证5个Token | 蓝=DSpark动态截断验证 | 绿字=验证Token节省率':'Concurrency (EP64/DP64) · Gray=fixed 5-token verification | Blue=DSpark dynamic truncation | Green=verification-token savings','+1.6% · 省 27.0% 验证':'+1.6% · 27.0% verification saved','+3.6% · 省 21.2% 验证':'+3.6% · 21.2% verification saved','14,466 vs 13,730 (+5.4% · 省 28.4%)':'14,466 vs 13,730 (+5.4% · 28.4% saved)','+6.7% · 省 35.2%':'+6.7% · 35.2% saved','Decoder 后缀重算从 51,200 降至 2,800 Layer-Tokens (':'Decoder suffix recomputation falls from 51,200 to 2,800 layer-tokens (','，总 Prefill 算力省 ~50%)':', saving ~50% total prefill compute)',
'1. 流量入口与协议层 (MIT 开源)':'1. Traffic entry and protocol layer (MIT open source)','• 64KB 分段并行 BPE 分词':'• Parallel BPE tokenization in 64KB chunks','• 增量 KMP 流式解析 Reasoning/Tool':'• Incremental KMP streaming Reasoning/Tool parsing','Entrypoint 全局路由层':'Entrypoint global routing layer','• 分区内存目录定位 SWA 宿主机器':'• Partitioned memory directory locates SWA hosts','• 平均输入 77K · 全局 TTFT 400ms':'• Average input 77K · Global TTFT 400ms','Vision Encoder LB (VE 池)':'Vision Encoder LB (VE pool)','• 单实例 1 卡 · 按最少 Patch 数路由':'• 1 GPU/instance · Route to lowest patch count','2. Prefill 引擎池 (PE · 8卡节点)':'2. Prefill engine pool (PE · 8-GPU nodes)','小并行 EP2–8 / DP2–8 (8B 激活)':'Small parallelism EP2–8 / DP2–8 (8B active)','• DEP2 仅 5.9% DP 等待损失 (64.4K/s)':'• DEP2: only 5.9% DP waiting loss (64.4K/s)','• 60K 冷算 × 96% 命中 = 150万 tok/s/卡':'• 60K uncached × 96% hit = 1.5M tok/s/GPU','Prefill LB (闭源 · 4档长度分桶)':'Prefill LB (closed source · 4 length buckets)','• 二次方程配额 cost(q,c)<=quota (32K上限)':'• Quadratic quota cost(q,c)<=quota (32K limit)','• DP 内 all-reduce MIN 对齐 + 140-tok 重放':'• DP all-reduce MIN alignment + 140-token replay','主机内存 SWA StateBlock':'Host-memory SWA StateBlock','• 1.415 MB/seq (20L×134×528B) · >98%命中':'• 1.415 MB/seq (20L×134×528B) · >98% hit','3. Decode 超节点池 (64–128卡)':'3. Decode supernode pool (64–128 GPUs)','Wide-EP64–128 / DP64–128 (16B激活)':'Wide-EP64–128 / DP64–128 (16B active)','• 每卡仅驻留 7 个专家 (含1冗余)':'• Only 7 resident experts/GPU (including 1 redundant)','• 线上 14.5K tok/s/卡 @ 230 tok/s/user':'• Online 14.5K tok/s/GPU @ 230 tok/s/user','Decode LB & EPLB (闭源核心)':'Decode LB & EPLB (closed-source core)','• DualPath 二维均衡 (请求数 × KV 总长)':'• DualPath 2D balancing (request count × total KV length)','• NVLink symm_mem 在线重排 (moe_lb=1.09)':'• Online NVLink symm_mem reshuffling (moe_lb=1.09)','• DSpark 动态验证 (-30% 验证, +6% 吞吐)':'• DSpark dynamic verification (-30% verification, +6% throughput)','弹性护栏 (0.8 配额锁 + 1min 排空)':'Elasticity guard (0.8 quota lock + 1min drain)','• 利用率 >0.8 禁止缩容 (强制 20%+ 冗余)':'• No scale-in at utilization >0.8 (mandatory 20%+ redundancy)','4. 100 PiB 3FS 存储池':'4. 100 PiB 3FS storage pool','• HBM 省 75% / SSD 省 87.5%':'• HBM savings 75% / SSD savings 87.5%','• 每张在线 GPU 配 14.4 TB':'• 14.4 TB per online GPU','• 10+2 纠删码 (查 11 返 10)':'• 10+2 erasure coding (query 11, return 10)','• 聚合读峰值: 10 TiB/s':'• Peak aggregate reads: 10 TiB/s','• 聚合写峰值: 850 GiB/s':'• Peak aggregate writes: 850 GiB/s','• Agent 留存 3 天':'• Agent retention: 3 days','• Chatbot 留存 7 天':'• Chatbot retention: 7 days','• GDR RDMA 零 SM 换入':'• GDR RDMA swap-in with zero SM usage','任意节点可命中全局任意前缀!':'Any node can hit any global prefix!',
'部署方案 / 硬件':'Deployment / hardware','总吞吐 (tok/s/卡)':'Total throughput (tok/s/GPU)','谷电时薪 ($/hr)':'Off-peak revenue ($/hr)','高峰时薪 ($/hr)':'Peak revenue ($/hr)','硬件毛利率':'Hardware gross margin','1. 单机 vLLM (8× H200)':'1. Single-node vLLM (8× H200)','无 PD 分离 / 无 Wide-EP':'No PD separation / no Wide-EP','-583.5% 巨亏':'-583.5% major loss','2. 单机 vLLM (8× B300)':'2. Single-node vLLM (8× B300)','+42.9% (仅39%产能)':'+42.9% (only 39% capacity)','128+ SM100/昇腾950 (1P:1D)':'128+ SM100/Ascend 950 (1P:1D)','76.9% (7.9× 提速)':'76.9% (7.9× speedup)','缓存命中率':'Cache hit rate','Prefill 等效总吞吐':'Effective total prefill throughput','用户综合输入单价':'Blended user input price','Prefill 时薪':'Prefill hourly revenue','1P:1D 综合时薪':'Blended 1P:1D hourly revenue','96.0% (官方基线)':'96.0% (official baseline)','0.0% (无缓存)':'0.0% (no cache)','¥1.0000 / 1M (暴涨16.9×)':'¥1.0000 / 1M (16.9× increase)','$30.23 / hr (需求归零)':'$30.23 / hr (demand falls to zero)',
'01 · 96% 缓存命中与流量护城河':'01 · The 96% cache-hit rate and traffic advantage','单卡每小时处理 54 亿输入 Token 的前提是':'Processing 5.4 billion input tokens/GPU/hour depends on ','96% 的 Token 根本不需要 GPU 算':'96% of tokens requiring no GPU compute','，而是直接从 100 PiB 3FS 硬盘读取并白赚':'; they are read directly from the 100 PiB 3FS disks, generating ',
'。没有日均百T级的连续 Agent/Chatbot 流量，缓存命中率与夜间利用率会双双崩塌。':'. Without sustained daily Agent/Chatbot traffic in the hundreds of trillions of tokens, both cache-hit rate and overnight utilization collapse.',
'02 · 128 卡起步超节点与 100 PiB 3FS':'02 · Supernodes starting at 128 GPUs and 100 PiB 3FS','DeepInfer 仅支持':'DeepInfer supports only ','与':'and ','华为昇腾 950':'Huawei Ascend 950','，且最小高效单元为':'; the smallest efficient unit is ','64张 Prefill 卡 + 64张 Decode 超节点卡 = 128 张卡':'64 prefill GPUs + 64 decode supernode GPUs = 128 GPUs','，外加每卡':', plus per GPU ','NVMe 存储与':'NVMe storage and ','RDMA 网络，中小团队无法跨过硬件门槛。':'RDMA networking: hardware requirements beyond small/medium teams.',
'03 · 闭源四级负载均衡与 20%+ 冗余成本':'03 · Four closed-source balancing layers and 20%+ redundancy cost','开源仅含离线引擎（F1 发动机），而':'Only the offline engine (the F1 engine) is open source; ',
'与四大负载均衡器（Prefill LB、Decode LB、EPLB、Autoscaler）并未开源；且线上要求':'and the four load balancers (Prefill LB, Decode LB, EPLB, Autoscaler) are closed source. Production requires ',
'配额利用率 >0.8 严禁缩容（至少 20% 冗余热备卡）':'no scale-in at quota utilization >0.8 (at least 20% redundant warm GPUs)','并承担 SLA 宕机赔付。':'and liability for SLA outage compensation.'
};
// Ordered unique Chinese text labels from the sealed SVG baseline. Only text nodes change.
const infraSvgLabels = {
'01-azure-agent-infra-4layer-panorama': `
Figure 1 · Azure AI Agent Infra: Four-Layer Reference (Build · Run · Ground · Govern)
Harness orchestration × Six runtimes (Managed → Serverless → Session/Sandbox → AKS → VM) × Memory/state × Zero trust
Agent planning, reasoning, tools, multi-agent teamwork and human review
MAF · Cross-runtime agent teams
Built-in telemetry/security/governance
Production coding & action engine
Multi-model routing · Tools/Shell/MCP
Directed state graph & checkpoints
Native HorizonDB / Durable integration
BYO open/paid agent frameworks
AKSClaw skills & sandbox hosting
Open protocols (A2A & MCP)
Cross-framework state/tool standards
Left→right: less managed; more infra/kernel/network/storage control
Managed Agent service
• Managed endpoints/state/ID
• 1,400+ MCP tools
• No container/cluster ops
To-B default choice
Serverless durable flows
• Event-driven Scale-to-0
• Long human-approval waits
• Replay & idempotent retries
Procure/finance/tickets
Hyper-V warm sessions
• Hardware VM isolation
• Python/custom containers
• Idle reclamation (~210ms)
Short untrusted code runs
Stateful coding (Preview)
• Memory/disk snapshots
• OCI images + persistent vols
Coding/browser automation
Multi-tenant K8s agents
• Kata Pod VM kernel isolation
• KEDA scaling + shared skills
• 5 enforced platform barriers
Enterprise tenants/SRE
Firecracker MicroVM fleet
• UFFD + NBD 100,000+ parallel
AI-native virtual PCs
Reasoning, tool context, short/long-term memory, checkpoints and audit trails
• PTU reserved throughput + pay-go overflow
• Model routing and Fine-Tuning
Enterprise search + 1,400+ MCP connectors
• Hybrid vectors + reranking + ACL trimming
• Plug-and-play Logic Apps connectors
AI-native PostgreSQL state & memory
• ACID + JSONB + DiskANN in one database
• Split storage/compute · 15 readers · Checkpoints
OpenAI's 800,000,000-user PG pattern
Global session state + snapshot storage
• ms active-active R/W (Commerzbank 30,000+/mo)
• Azure Blob / Files / Lustre snapshot volumes
Enforce IDs, key custody, quota cutoffs and audits—not Agent trust
Microsoft Entra Agent ID (first-class identity)
Agent Blueprint + Owner/Sponsor accountability
• No user login tokens; issue short-lived per-action credentials
• Audit both the initiating User and executing Agent identities
Keys stay in gateway · Affinity routing · Token cutoff
• No in-container LLM keys; Prefix-Cache affinity cuts latency/cost
• User/team/Agent RPM·TPM·budget caps + MCP allowlist
Platform security posture & data-loss prevention
• Block IMDS 169.254.169.254 against credential theft
• OTel GenAI tracing + Purview sensitive-data governance
`,
'02-runtime-spectrum-6tier-matrix': `
Figure 2 · Six Azure Agent Runtimes: Ownership, Isolation and Recovery Latency
Control spectrum and quantitative comparison: managed Foundry Hosted Agents to self-hosted E2B Firecracker MicroVM
Dimension / runtime
Management / role
Fully managed Agent
Serverless durable flows
Warm isolated pool
Stateful coding space
Multi-tenant K8s
Dense MicroVM fleet
Security boundary
Platform service
Hyper-V hardware VM
Containers + net policy
Kata Pod VM kernel
Untrusted code / Shell
No (controlled tools)
No (orchestration)
Native (short scripts)
Native (persistent space)
Native (Pod VM)
Native (full OS/GUI)
Persistence / cross-task restore
Managed session threads
Durable checkpoint replay
Idle disposal (external DB)
Memory/disk snapshot + PV
Dedicated PV + HorizonDB
UFFD lazy + NBD delta
Explicit Pause / Resume
Platform-managed
External event wait/wake
No (timeout reclamation)
Programmatic pause/resume
Yes (KEDA + snapshots)
Yes (<150ms restore)
Measured/typical start & restore
~95 ms warm wake
~210 ms warm-pool allocation
~320 ms snapshot restore
Customer infrastructure ops
★☆☆☆☆☆ (very low)
★★☆☆☆☆ (low)
★★★☆☆☆ (mid-low)
★★★★★☆ (high)
★★★★★★ (very high: self-host)
Best-fit scenarios
To-B enterprise assistants
Long approvals/transactions
Code interpreter/file parsing
Coding Agent/browser
Multi-tenant SaaS/SRE fleet
100,000+ AI virtual PCs
Architect's Playbook Core Rule:
Foundry + PaaS/VM coexist: enterprise knowledge on Foundry; dense code sandboxes on ACA/AKS/VMSS.
Red line: if security/kernel needs rule out managed Foundry and the customer lacks developers, do not force Foundry; first engage CSU or a partner to enable delivery.
`,
'03-scenario-decision-tree-and-routing': `
Figure 3 · AI Agent Infra on Azure: Two-Stage Architecture Routing and State Pairing
Stage A: business/delivery gate (Playbook Slide 7) × Stage B: runtime/state routing (Pitch Slides 7–12)
STAGE A · BUSINESS & DELIVERY CAPABILITY GATE (FIELD DECISION TREE)
Q1: Target customers: To-B or To-C?
Sets scale elasticity, margin sensitivity and tenant isolation
Direct to Modernization PaaS
Extreme elasticity + cost per Token/sandbox
To-B internal/B2B
Q2: Need control beyond managed services?
(Custom OS kernel/private networks/untrusted sandboxes/extreme cost)
No (controlled tools)
1,400+ MCP connectors + Agent ID
Note: still tune app prompts/tools
Yes (infra control)
Q3: Dedicated development/platform team?
Can deliver containers/K8s/VMs and orchestration
No (no dev team)
⛔ Delivery hold gate
Engage CSU or an AI partner to co-build
Never force infra-control workloads onto Foundry
Yes (team ready)
✅ Enter Stage B technical selection
Map workload traits to 6 runtimes
Opportunity qualification (4 Foundations) and $10K model-signal gate:
• Continuity: non-model families active ≥3 months in a 5-month window, including the latest consecutive 2 months
• Model gate: Foundry Models ≥$10,000/month for the latest 3 months is a strong signal; below it, a strong non-model path remains valid
STAGE B · WORKLOAD → RUNTIME + STATE PAIRING
Path 1 · Long approvals / cross-system transactions / external wake events
Procure/finance/tickets: hrs–days approval; power/restart: determ. replay, idemp. retry
Path 2 · Short untrusted code / data analysis / file parsing
LLM Python/Shell per task; ms warm-pool allocation (~210ms); dispose after use
Runtime: ACA Apps (orchestration) + ACA Dynamic Sessions (warm Hyper-V)
State: external HorizonDB/Cosmos DB; session disposal wipes local files
Path 3 · Stateful Coding Agent / browser automation / cross-task workspace
Custom OCI images, PVs, selected ports; explicit per-user pause/resume
State: Sandbox memory/disk snapshots + Persistent Volume + HorizonDB
Path 4 · Enterprise multi-tenant Agents / dev & SRE (AKSClaw)
Persistent per-engineer/tenant; BYO Copilot/Hermes/OpenClaw; 5 hard security barriers
State: shared RO skills PV + private state PV + HorizonDB (ACID+Vector)
Path 5 · 100,000+ concurrent cloud PCs / sub-150ms restore (Manus × E2B)
AI-native: full Linux/GUI per task; ~108ms–132ms wake; million-session limits
Gateway: AppGW WAF v2 (dual) + APIM (dynamic Host Header limits)
State: UFFD paging restore + NBD deltas + PG primary/replica + Blob
`,
'04-aksclaw-multi-tenant-k8s-architecture': `
Figure 4 · AKSClaw Multi-Tenant Kubernetes Agent Platform: 6 Pillars and 5 Hard Barriers
AKS + Kata Containers Pod VM + Entra Agent ID + Unified AI Gateway: enterprise infrastructure independent of Agent compliance
1. INTERACTIVE CHANNELS (HUMAN–AGENT ENTRY)
• Follow-the-Sun handoffs: Redmond → Europe → Asia-Pacific share the same instance context
2. EVENT-DRIVEN TRIAGE GATEWAY (AUTOMATED DIAGNOSIS)
IcM P1/P2 alerts · GitHub Issue/PR · Anomalies · Scheduled checks
• Wake in seconds: logs/recent changes → root-cause summary → fix only after human approval
Persistent instance per engineer/business role; mixed BYO Agent Harnesses and KEDA elastic scaling
OpenClaw instance
• Private Guest Kernel
• Dedicated Memory.md
• MCP tool Sidecar
Hermes instance
• Self-learning incident notes
• Controlled kubectl / az
• Repository patch generation
• Sandbox unit-test validation
• Cross-region read-only access
• Idle sleep / wake in seconds
Shared Team Skill Marketplace volume
ReadWriteMany (RO mounts) · Git PR release review
• 1 author writes AKS/Bicep/IcM skills → available to the whole team
• Risk-tiered skills + semantic discovery + version rollback
Private instance-state volume + Azure HorizonDB
• Shared skills; histories, temp files and preferences physically isolated
• Workspace and short/long-term memory survive Pod restart/node moves
Prompt injection or --yolo still cannot cross boundaries
① Block node metadata (IMDS Block)
NetworkPolicy: block 169.254.169.254; no host ID theft
② Outbound allowlist (Egress Control)
Only AI Gateway/approved internals; block exfiltration
③ Credential proxy (Zero Raw Key in Pod)
No long-lived env keys; least-privilege short-lived tokens per action
④ Unforgeable identity (Entra Agent ID)
Platform Workload Identity; never inherit full user rights
⑤ Mandatory end-to-end audit
Gateway/ID proxy audits all inference/tools; Agent-proof
5. UNIFIED AI GATEWAY & FLEET LIFECYCLE GOVERNANCE
Prefix-Cache affinity routing
Precise multi-turn long-context cache hits
• Same Session → same backend
• Lower TTFT and cost
Three-level quota/budget cutoffs
• Live RPM / TPM / day/month budgets
• Gateway blocks loops/overspend
OTel GenAI observability
Full telemetry without code changes
• Every inference/tool call/latency
• Cross-model 429/5xx Failover
Fleet lifecycle governance
Remove zombie Agents/orphan credentials
• Required Owner/purpose/expiry
• Revoke on staff exit/role change
`,
'05-e2b-on-azure-vmss-reference-architecture': `
Figure 5 · E2B on Azure VMSS: Production Reference (Manus × E2B 100,000+ Sandboxes)
AppGW WAF v2 dual frontend × APIM per-dynamic-Host limits × Nomad/Consul scheduling × Azure VMSS Flexible (D96as_v7)
• HTTPS control-plane API
• WSS terminal/desktop streams
Dual frontend IPs (Public + Private)
• Public IP (443): wildcard TLS offload + OWASP WAF
• Private IP (8080): receive/forward APIM callbacks
• Avoid APIM direct-to-VMSS backend pool limits
Per-session limits by dynamic Host Header
• 100,000+ active sandbox sessions counted independently
• Native bidirectional WebSocket passthrough
• Ports 3001/3002 dynamic routing
• Port 50001 session create/delete
• Consul discovery & health checks
5th Gen AMD EPYC Turin (4.5GHz) + Azure Boost · 96 vCPU / 384 GiB RAM · Dense KVM + Firecracker sandboxes
• Orchestrator Daemon (gRPC sandbox lifecycle)
• HugePages pool (~326 GiB reserved for MicroVMs)
• Hundreds of parallel Firecracker MicroVMs (108ms start)
• Template Manager (custom OCI → rootfs.ext4)
• Vector Agent collects sandbox logs/metrics
VMSS asymmetric Scale Rules
▲ Scale-Out: automatic when CPU > 60%
• Reserve 40% CPU for burst MicroVM creation
▼ Scale-In: never use CPU alone
• HugePages distort normal host-memory metrics
• Require HugePages metrics + snapshot migration/draining
• Up to 1,000 hosts per VMSS Flexible scale set
100,000-sandbox sizing (agent_infra_sizer.py verified):
512 MiB/Sandbox × 85% HugePages × 60% fill = 384 steady sandboxes/node → 261 D96as_v7 nodes for 100,000 concurrent sandboxes
• 3~5-node strongly consistent Raft scheduler
• Schedule MicroVMs on bare metal/VMs, not K8s
• Primary writes + Read Replicas for read scale
• PgBouncer pooling + Cache Lease Lock avoids stampedes
OpenAI pattern (50 read replicas · 1,000,000+ QPS)
• Azure Blob / Files / Lustre store memfile+rootfs
ARCHITECTURAL CAUTION · Three open-source E2B production gaps and Azure hardening (Deep Dive Slide 34)
1. Single-process control state: E2B API maps nodes/sandboxes in RAM; no horizontal scaling; restart loses state → externalize to PostgreSQL/Redis.
2. Orphan sandboxes: Client Node restart lacks automatic GC/self-healing rescheduling → add Nomad health probes + VMSS automatic instance repair.
3. Gateway bottleneck: no distributed rate limits for millions of dynamic subdomains or WAF → front with dual-frontend AppGW WAF v2 + APIM rate-limit-by-key.
`,
'06-e2b-microvm-internals-and-vm-benchmark': `
Figure 6 · Firecracker MicroVM Internals (UFFD + NBD) and Azure v6/v7 Measured Startup
Left: KVM + virtio-net/blk + UFFD page-fault streaming + envd/noVNC · Right: East US 2 / Central US latency and Azure Boost gains
Guest MicroVM (Kernel + Rootfs + Desktop/Code Stack)
envd daemon (:49982)
Connect RPC · Shell/files/metrics
Code-Interpreter V1 stateful kernel
Computer-Use GUI stack (E2B Desktop Sandbox)
1. Network isolation: virtio-net + private NetNS (ns-N)
• Host iptables SNAT/DNAT maps external session traffic to its sandbox ns-N
• Default L2/L3 sandbox isolation; host firewall controls outbound traffic
• Orchestrator checks envd at 169.254.0.21:49982 every 200ms
2. Key to 108ms restore: UFFD demand paging + NBD block deltas
• UFFD (userfaultfd) lazy memory restore:
Firecracker resumes vCPUs without first reading the full multi-GB memory image locally;
on Guest page fault, the host UFFD Handler fetches the needed 4KB/2MB page from remote object storage.
• NBD (Network Block Device) + Dirty Bitmap incremental storage:
Sandboxes share a cached read-only rootfs.ext4; writes go to local deltas, with dirty blocks tracked in a Bitmap;
Pause uploads only Dirty Pages and Dirty Blocks, reducing snapshot size and pause time.
12× ~ 20× faster than traditional container cold starts (1.6s~2.2s)
Regions: East US 2 & Central US · Lower is Faster
A. Base Sandbox startup (ms)
108ms★ -54.8%/v6 AMD
B. Code-Interpreter V1 (with Jupyter kernel) startup (ms)
132ms★ -17.0%/Intel
C. Azure Dasv7 / Easv7 (5th Gen EPYC + Azure Boost) hardware gains
• Up to 160 vCPU / 1,280 GiB DDR5 (Easv7), 4.5GHz all-core; no SMT contention
• Up to +35% price/perf · Remote IOPS +20% · Storage throughput +50% · Network +75%
Measured workloads: Java +25% | Memory cache +65% | Crypto +80% | Web +130%
Why does v7 matter for MicroVM sandboxes?
UFFD/NBD restore needs fast single-core IPC, L3 locality and Azure Boost net/storage offload,
halving D96as_v7 restore latency versus prior Genoa (239ms → 108ms).
`,
'07-multi-agent-workflow-and-state-checkpoint': `
Figure 7 · Multi-Agent Workflows (MAF × Copilot SDK × Durable) and Persistent State
Top: automated incident diagnosis and code repair (Pitch Slide 13) · Bottom: Azure HorizonDB vs Cosmos DB vs Sandbox Snapshot
Production alert / ticket
• Inject TraceID + tenant context
LangGraph diagnosis Agent
• Runs on AKS / ACA Apps
• Query Kusto logs + recent PRs
• Write HorizonDB Checkpoint
Find root-cause file and line
• ACA Sandbox / Kata VM
• Checkout code + write patch
• Pass pytest inside sandbox
Snapshot workspace state
Foundry compliance Agent
• Check security/change policy
• Entra Agent ID signed trail
• Generate risk assessment card
Durable human-approval gate
• Teams/Slack approval card
• Wait with zero compute cost
• On approval: merge PR/canary
70%+ lower MTTR
Why decouple compute and state (Pitch Slide 10)?
Multi-step reasoning, tool retries and cross-day approvals: never store state in restartable/scale-in containers.
MAF state machines + Durable Functions orchestration + HorizonDB/Cosmos DB checkpoints resume from the last step after any compute-node failure.
STATE, MEMORY & CHECKPOINT PERSISTENCE MATRIX (THREE MECHANISMS)
AI-native PostgreSQL state/vector engine
• One engine, three data types:
- ACID relational tables (orders/quotas/audits/ACLs)
- JSONB (Thread message trees / Tool outputs)
- DiskANN vectors (short/long-term hybrid recall)
• Split storage/compute + up to 15 read replicas, ms scaling
• Native LangGraph / MAF Checkpoint interfaces
• No sync lag across separate relational/document/vector DBs
⚠ Preview: verify Region for critical production, or use Azure Database for PostgreSQL Flexible Server as fallback.
Global multi-active NoSQL sessions/events
• Single-digit ms R/W; 99.999% multi-region HA SLA
• Schemaless JSON for concurrent chats/event sourcing
• Vector search + Change Feed → Azure Functions
• Foundry Agent Service: BYO Cosmos DB threads
• Reference: Commerzbank virtual assistant Ava
- 30,000+ service chats/month; ~75% fully automated
- Live shared context across specialist sub-Agents
Fits: global To-C / massive concurrent session state
Freeze process memory + filesystem state
• Databases store variables, not:
- Open browser DOM, login sessions and Cookies
- Pandas/PyTorch variables in Jupyter/Python memory
- Build artifacts, Git worktrees, temporary dependencies
• Three complementary layers:
1. ACA Sandboxes: memory/disk snapshots + Persistent Volume
2. AKSClaw: shared RO skills PV + private RW state PV
3. E2B on VMSS: UFFD memory + NBD block deltas (108ms)
Pair: DB business checkpoints + environment snapshots
`,
'08-field-playbook-5step-execution-flow': `
Figure 8 · Azure Agent Infra Playbook: Six Scenarios, Four Foundations, Five Steps
From Agent_Infra_Playbook.pptx and Selection Logic: anonymized methodology only, no sensitive customer data
01 Customer service Agents
• Retail assistance/bank support
• Large traffic peaks/troughs
• Low latency + policy guardrails
02 Enterprise Agent platform
• Shared multi-team/dept platform
• Unified gateway/quotas/skills
• Strong tenant isolation
03 AI-native products
• Agent is the core product
• 100,000+ code/desktop sandboxes
• Compute unit cost sets margins
04 Agent factory
• Scale out standard templates
• Reuse 1,400+ connectors
• Unified eval/release pipelines
05 Multi-agent workflows
• Procurement/finance/dev ops
• Cross-system state/rollback
• Long human-approval waits
06 Regulated-industry Agents
• Finance/health/public compliance
• Private VNet boundary
• Per-action ID/tamper-proof audit
4 Technical Foundations · 14 service families
Strong path A (Specific Anchor): ACA/AKS/PG/Cosmos/Redis/Search/APIM/Foundry anchor service
Strong path B (Multi-Foundation): General-only services across ≥3 foundations, including Runtime + Data/AI
5 Potential Gates · ≥3 trigger architect deep dive
Gate 1: Avg monthly Relevant ACR ≥ cohort median ($17,053.78 methodology baseline)
Gate 2: Production Runtime signal + Data or AI signal
Gate 3: Active across ≥3 technical foundations (Multi-Foundation Readiness)
Gate 4: Sustained Specific Anchor service-family consumption
Gate 5: Non-model growth ≥ +20% (early vs recent averages in a 5-month window)
Signal ≠ Amount: $10K/month gates model signals; never deduct from actual ACR
Data-driven screening
• Evaluate four foundation signals
• Identify P1 / P2 priority tiers
• Find business/technical sponsors
Scenario and pain-point discovery
• Distinguish To-B / To-C needs
• Sandbox/compliance/state gaps
• Check customer dev capability
Target architecture & path
• Decision tree → Runtime
• Pair HorizonDB/Cosmos/snapshots
• Design Entra Agent ID boundary
04 Validate (critical action)
1/2-day workshop + architecture whiteboard
• Build PoC; validate core path
• Model concurrency/failure/security
• Target diagram signed by both parties
Production & scale-out
• Milestones and delivery owners
• Integrate AI Gateway and OTel
• Replicate scenario → enterprise fleet
`
};
function generateInfraSvgDerivatives() {
  return Object.entries(infraSvgLabels).map(([name, text]) => {
    const source = `workshops/azure-agent-infra/assets/${name}.svg`;
    const target = source.replace(/\.svg$/, '.en.svg');
    const original = baseline(source).toString('utf8');
    if (!baseline(source).equals(fs.readFileSync(path.join(root, source)))) throw new Error(`Original SVG changed: ${source}`);
    const labels = [...new Set([...original.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map(m => m[1]).filter(s => /[\u4e00-\u9fff]/.test(s)))];
    const english = text.trim().split('\n');
    if (labels.length !== english.length) throw new Error(`${source}: ${labels.length} source labels vs ${english.length} translations`);
    const translated = new Map(labels.map((label, i) => [label, english[i]]));
    const output = original.replace(/(<text\b[^>]*>)([^<]*)(<\/text>)/g, (all, open, label, close) => translated.has(label) ? open + esc(translated.get(label)) + close : all);
    fs.writeFileSync(path.join(root, target), output);
    const sha = s => crypto.createHash('sha256').update(s).digest('hex');
    return {path:target,source,baseline:inventory.baseline,sourceSha256:sha(original),outputSha256:sha(output),translatedLabels:labels.length,language:'en',scope:'Label-only English derivative; original bytes, non-text markup, geometry and numerical claims preserved.'};
  });
}
async function main() {
  const browser = await puppeteer.launch({ headless: 'shell', pipe: true });
  try {
    const parser = await browser.newPage();
    const translatedAssets = generateInfraSvgDerivatives();
    const sources = new Map(pages.map(p => [p.path, baseline(p.path).toString('utf8')]));
    // The archived workbench has two unescaped empty-string examples that prevent all JS parsing.
    sources.set('workshops/agentic-commerce/index.html', sources.get('workshops/agentic-commerce/index.html').replaceAll('null / "" / []', 'null / \\"\\" / []').replaceAll('null/""/[]', 'null/\\"\\"/[]'));
    async function renderedBaseline(file, lang) {
      const live=await browser.newPage();
      await live.setRequestInterception(true);
      live.on('request',request=>{
        const u=new URL(request.url());
        if(u.origin!=='http://reading-baseline.local'||!/\.(html|js|css|json|svg)$/.test(u.pathname))return request.abort();
        const target=decodeURIComponent(u.pathname.slice(1));
        try{request.respond({status:200,contentType:({html:'text/html',js:'text/javascript',css:'text/css',json:'application/json',svg:'image/svg+xml'})[target.split('.').pop()],body:baseline(target)});}catch{request.abort();}
      });
      await live.goto(`http://reading-baseline.local/${file}?lang=${lang}`,{waitUntil:'domcontentloaded',timeout:30000});
      await live.evaluate(lang=>{
        if(typeof setAnimLang==='function')setAnimLang(lang);
        if(typeof toggleLang==='function'&&lang==='en')toggleLang();
        if(typeof setLang==='function')setLang(lang==='en'?'en':'zh');
        document.querySelector(`.lang-btn[data-lang="${lang}"]`)?.click();
      },lang);
      const html=await live.content();await live.close();return html;
    }
    for(const sourcePath of [...Object.keys(translations),...runtimeEditions]) {
      const original=pages.find(p=>p.path===sourcePath), target=sourcePath.replace(/\.html$/,'.en.html');
      const isRuntime=runtimeEditions.includes(sourcePath);
      let source=isRuntime?await renderedBaseline(sourcePath,'en'):sources.get(sourcePath);
      if(sourcePath==='workshops/azure-agent-infra/index.html')for(const asset of translatedAssets)source=source.split(path.posix.basename(asset.source)).join(path.posix.basename(asset.path));
      const translated=await parser.evaluate(({source,markdown,terms,isRuntime})=>{
        const d=new DOMParser().parseFromString(source,'text/html');
        if(!isRuntime){d.querySelector('main').innerHTML=markdown;d.querySelectorAll('footer').forEach(n=>n.textContent='AI Gaming & Procedural Animation Lab · Technical asset whitepaper');}
        const pairs=Object.entries(terms).sort((a,b)=>b[0].length-a[0].length);
        const translate=text=>{for(const [from,to] of pairs){if(from.length<=4){if(text.trim()===from)text=text.replace(from,to);}else text=text.split(from).join(to);}return text;};
        const walker=d.createTreeWalker(d.body,NodeFilter.SHOW_TEXT);
        while(walker.nextNode()){const n=walker.currentNode;if(!n.parentElement.closest('script,style'))n.textContent=translate(n.textContent);}
        d.querySelectorAll('script:not([src])').forEach(s=>{for(const [from,to] of pairs)if(from.length>4)s.textContent=s.textContent.split(from).join(to);});
        d.querySelectorAll('[title],[aria-label]').forEach(n=>{for(const name of ['title','aria-label'])if(n.hasAttribute(name))n.setAttribute(name,translate(n.getAttribute(name)));});
        d.querySelectorAll('.lang-btn').forEach(n=>n.hidden=true);
        d.querySelectorAll('nav a').forEach(a=>{if(/返回|实验室/.test(a.textContent))a.textContent='← Back to the lab';else if(/湾岸/.test(a.textContent))a.textContent='Wanan Midnight →';});
        d.documentElement.lang='en';d.title=d.querySelector('h1[data-lang="en"],h1:not([data-lang])')?.textContent||d.title;
        if(isRuntime){const dictionary=d.createElement('script');dictionary.type='application/json';dictionary.id='reading-translations';dictionary.textContent=JSON.stringify(terms).replace(/</g,'\\u003c');d.body.append(dictionary);}
        return '<!doctype html>\n'+d.documentElement.outerHTML;
      },{source,markdown:translations[sourcePath]?marked.parse(translations[sourcePath],{gfm:true}):null,terms:englishTerms,isRuntime});
      sources.set(target,translated);
      original.bilingualAssociations=[...original.bilingualAssociations,{path:target}];
      pages.push({...original,path:target,contentId:`${original.contentId}-reading-en`,language:{declared:'en',evidence:{filenameDeclarationConflict:false}},bilingualAssociations:[{path:sourcePath}],translation:{sourcePath,method:isRuntime?'existing-runtime-dictionary-and-authored-supplement':'authored-complete-prose-translation',sourceBaseline:sourceOverrides[sourcePath]||inventory.baseline}});
    }
    const facts = new Map();
    for (const p of pages) {
      const f = await parser.evaluate(source => {
        const d = new DOMParser().parseFromString(source, 'text/html');
        const pre = d.querySelector('main > pre');
        const copy = d.body.cloneNode(true); copy.querySelectorAll('script,style,nav').forEach(n => n.remove());
        return { text: copy.textContent, markdown: pre?.textContent, title: d.title };
      }, sources.get(p.path));
      const conflict = p.language.evidence.filenameDeclarationConflict;
      // These archives provide English descriptions with Chinese proper-name glosses, not untranslated paragraphs.
      const mixedArchive = false;
      const lang = conflict ? 'en' : p.language.declared?.startsWith('zh') ? 'zh-CN' : 'en';
      facts.set(p.path, { ...f, lang, conflict, mixedArchive });
    }
    const records = [];
    for (const p of pages) {
      const fact = facts.get(p.path);
      const zh = fact.lang === 'zh-CN';
      const t = (en, cn) => zh ? cn : en;
      const counterpart = p.bilingualAssociations.find(a => facts.has(a.path) && facts.get(a.path).lang !== fact.lang && facts.get(a.path).text !== fact.text && !p.path.startsWith('workshops/agentic-commerce/'))?.path || null;
      let snapshot = {};
      if (hydrate.has(p.path)) {
        const live = await browser.newPage();
        await live.setRequestInterception(true);
        live.on('request', request => {
          const u = new URL(request.url());
          if (u.origin !== 'http://reading-baseline.local') return request.abort();
          const file = decodeURIComponent(u.pathname.slice(1));
          if (!/\.(html|js|css|json|svg)$/.test(file)) return request.abort();
          try { request.respond({ status: 200, contentType: ({ html: 'text/html', js: 'text/javascript', css: 'text/css', json: 'application/json', svg: 'image/svg+xml' })[file.split('.').pop()], body: baseline(file) }); } catch { request.abort(); }
        });
        await live.goto(`http://reading-baseline.local/${p.path}?lang=zh-CN`, { waitUntil: 'networkidle0', timeout: 30000 });
        snapshot = await live.evaluate(() => Object.fromEntries([...document.querySelectorAll('[id]')].filter(n => n.children.length && !n.closest('svg')).map(n => [n.id, n.innerHTML])));
        await live.close();
      }
      const themeCSS = fs.readFileSync(path.join(root, 'assets', 'reading-shell.css'), 'utf8');
      const reportCsp = p.path === 'workshops/agentic-commerce/index.en.html';
      const inlineCsp = /Content-Security-Policy/.test(sources.get(p.path));
      const themeJS = fs.readFileSync(path.join(root, 'assets', 'reading-shell.js'), 'utf8');
      const mediaLanguageLimitations = p.path === 'bilibili-explainers/index.en.html'
          ? [...sources.get(p.path).matchAll(/["']([^"']+\.(?:mp4|webm|png|jpg))["']/g)].map(m=>m[1]).filter((v,i,a)=>a.indexOf(v)===i).map(resource=>({resource,language:'zh-CN',reason:'Original recorded animation/contact sheet; all six titles, storyboards, milestones and controls have English prose translations. Original audio/image content is not redubbed or repainted.'}))
          : [];
      let notice = fact.mixedArchive
        ? 'English introduction with original Chinese archive entries retained. Full English translation of the archive is unavailable. / 英文导言及中文原始归档；归档尚无完整英译。'
        : counterpart
          ? t('Source text preserved. A distinct Chinese edition is available; editions may differ.', '保留原文。可打开独立英文版本；不同版本的内容可能不同。')
          : runtime.has(p.path)
            ? t('Source language: English / 中文. Original in-page language controls are retained; full translation coverage is not verified.', '原文语言：中文 / English。保留原有页内语言控件；尚未验证全文翻译覆盖。')
            : t('Source language: English. A verified full Chinese translation is not available.', '原文语言：中文。尚无经核实的完整英文译本。');
      if (p.translation) notice = 'English translation of the preserved source, with original numerical claims retained; not independently re-measured.';
      if (mediaLanguageLimitations.length) notice += ' Original recorded narration and contact-sheet images are retained in their source language; all six written storyboards are translated.';
      const href = target => esc(relative(p.path, target));
      const track = /azure-agent-infra/.test(p.path)?'infra':/agentic-commerce/.test(p.path)?'commerce':/ai-security/.test(p.path)?'security':/voice\//.test(p.path)?'voice':/^(animation|generative-visual-lab|bilibili-explainers)\//.test(p.path)?'animation':/^game\//.test(p.path)?'game':/workshops\//.test(p.path)?'benchmarks':null;
      const contextLink=track?`<a class="reading-context" href="${href(`studio/${zh?'zh-':''}${track}.html`)}">← Studio / ${track}</a>`:'';
      const langLink = counterpart ? `<a data-reading-language href="${href(counterpart)}" hreflang="${zh ? 'en' : 'zh-CN'}" lang="${zh ? 'en' : 'zh-CN'}">${zh ? 'EN' : '中文'}</a>` : `<a href="#reading-language-note" aria-label="${t('Translation availability', '翻译情况')}">EN / 中</a>`;
      const shell = `<a class="reading-skip" href="#reading-main">${t('Skip to content', '跳至正文')}</a><header class="reading-header"><a class="reading-brand" href="${href(zh ? 'zh.html' : 'index.html')}"><span class="reading-mark">q<span>.</span></span><span>Qi Chen<small>@turbo998 · ${t('Engineering notes', '工程手记')}</small></span></a><div class="reading-controls">${langLink}<a data-reading-theme="light" href="?theme=light" aria-label="${t('Light theme', '浅色主题')}">☀</a><a data-reading-theme="dark" href="?theme=dark" aria-label="${t('Dark theme', '深色主题')}">◐</a><details><summary aria-label="${t('Navigation', '导航')}">☰</summary><nav><a href="${href(zh ? 'zh.html' : 'index.html')}">${t('Home', '首页')}</a><a href="${href(zh ? 'studio/zh-index.html' : 'studio/index.html')}">Studio</a>${/^(?:zh-)?(?:ai-security|benchmarks|security-ai-landing-zone|writing)\.html$/.test(p.path) ? `<a href="${href(zh ? 'zh-github-radar.html' : 'github-radar.html')}">${t('GitHub AI Radar', 'GitHub AI 雷达')}</a>` : ''}<a href="${href(zh ? 'zh-writing.html' : 'writing.html')}">${t('Writing', '文章')}</a><a href="${href(zh ? 'zh-about.html' : 'about.html')}">${t('About', '关于')}</a></nav></details></div></header>`;
      const generatedMarkdown = fact.markdown ? marked.parse(fact.markdown, { gfm: true }) : null;
      const result = await parser.evaluate(({ source, shell, notice, lang, exception, snapshot, css, js, inlineCSS, inlineJS, reportCsp, generatedMarkdown, originalMarkdown, contextLink, runtimePage }) => {
        const d = new DOMParser().parseFromString(source, 'text/html');
        const removed = [];
        const remove = n => { removed.push({ tag: n.tagName, text: n.textContent.trim().slice(0,180), source: n.getAttribute('src') || n.getAttribute('href') }); n.remove(); };
        d.querySelectorAll('script').forEach(n => {
          if (/site-structure|theme-switcher|reveal\.js/.test(n.src) || (!n.src && n.textContent.length < 1500 && /scoutTheme|prefers-color-scheme/.test(n.textContent))) remove(n);
        });
        d.querySelectorAll('.nav,.site-breadcrumb-bar,.style-link-pill,.lang-switch-group,.style-switcher').forEach(remove);
        d.querySelectorAll('link[rel="alternate"]').forEach(remove);
        d.querySelectorAll('#theme-toggle-btn,[onclick="toggleTheme()"],.theme-toggle,.theme-btn').forEach(n => { n.hidden = true; n.setAttribute('aria-hidden', 'true'); });
        Object.entries(snapshot).forEach(([id, html]) => { const n = d.getElementById(id); if (n && !n.textContent.trim() && !n.querySelector('svg,canvas,video')) n.innerHTML = html; });
        d.querySelectorAll('script:not([src])').forEach(n => { n.textContent = n.textContent.replace(/(getElementById\(['"](?:security-deck-iframe|deck-iframe)['"]\))\.src\s*=/g, '$1.href ='); });
        if (!exception) {
          d.querySelectorAll('style,link[rel="stylesheet"],link[rel="preconnect"]').forEach(remove);
          d.querySelectorAll('[style]').forEach(n => { if (!n.closest('svg') && !n.closest('canvas')) n.removeAttribute('style'); });
          d.querySelectorAll('.topbar,.topline').forEach(n => n.classList.add('reading-resource-nav'));
        }
        const iframeLinks = [];
        d.querySelectorAll('iframe').forEach(n => {
          const a = d.createElement('a'); const src = n.getAttribute('src');
          if (!src) return;
          a.href = src; a.className = 'reading-demo-link'; a.textContent = `${n.title || 'Standalone interactive resource'} ↗`;
          if (n.id) a.id = n.id;
          iframeLinks.push({ src, title: n.title }); n.replaceWith(a);
        });
        if (generatedMarkdown) {
          const pre = d.querySelector('main > pre');
          const article = d.createElement('article'); article.className = 'reading-markdown'; article.innerHTML = generatedMarkdown;
          article.querySelectorAll('script,iframe,style').forEach(n => n.remove());
          const details = d.createElement('details'); details.className = 'reading-source'; details.innerHTML = '<summary>Original source text / 原始文档文本</summary>';
          const raw = d.createElement('pre'); raw.textContent = originalMarkdown; details.append(raw);
          pre.replaceWith(article, details);
          const title = article.querySelector('h1')?.textContent; if (title) d.title = `${title} — Qi Chen`;
        }
        d.documentElement.lang = lang; d.documentElement.dataset.theme = 'dark';
        if(runtimePage){d.documentElement.dataset.readingRuntime='true';d.querySelectorAll('.lang-btn,#langToggle,#btn-en,#btn-zh').forEach(n=>{n.hidden=true;n.setAttribute('aria-hidden','true');});}
        d.documentElement.dataset.readingShell = exception ? 'exception' : 'document';
        d.body.removeAttribute('style');
        if (!exception) d.body.className = 'reading-page';
        const oldMains = [...d.querySelectorAll('main')]; oldMains.forEach(n => { const div = d.createElement('div'); [...n.attributes].forEach(a => div.setAttribute(a.name,a.value)); div.innerHTML=n.innerHTML; n.replaceWith(div); });
        const main = d.createElement('main'); main.id = 'reading-main'; main.tabIndex = -1; main.className = exception ? 'reading-exception' : 'reading-document';
        while (d.body.firstChild) main.append(d.body.firstChild);
        if(contextLink)main.insertAdjacentHTML('afterbegin',contextLink);
        const note = d.createElement('aside'); note.id='reading-language-note'; note.className='reading-language-note'; note.textContent=notice;
        d.body.innerHTML = shell; d.body.append(note, main);
        const meta = d.createElement('meta'); meta.name='reading-migration'; meta.content='R6'; d.head.append(meta);
        if (reportCsp) main.classList.add('reading-fixed-report');
        if (inlineCSS) { const s=d.createElement('style'); s.textContent=inlineCSS; d.head.append(s); if (inlineJS) { const script=d.createElement('script'); script.textContent=inlineJS; d.head.append(script); } }
        else { const link=d.createElement('link'); link.rel='stylesheet'; link.href=css; d.head.append(link); const script=d.createElement('script'); script.src=js; d.head.append(script); }
        return { html: '<!doctype html>\n'+d.documentElement.outerHTML+'\n', removed, iframeLinks, staticText: main.textContent.length };
      }, { source: sources.get(p.path), shell, notice, lang: fact.lang, exception: exceptions[p.path] || null, snapshot, css: relative(p.path,'assets/reading-shell.css'), js: relative(p.path,'assets/reading-shell.js'), inlineCSS: inlineCsp ? themeCSS : null, inlineJS: inlineCsp && !reportCsp ? themeJS : null, reportCsp, generatedMarkdown, originalMarkdown: fact.markdown, contextLink, runtimePage:runtimeEditions.includes(p.translation?.sourcePath||p.path) });
      fs.writeFileSync(path.join(root,p.path),result.html);
      records.push({ path:p.path, translation:p.translation||null, contentId:p.contentId, role:p.role, disposition:exceptions[p.path] ? 'dedicated-design-exception' : 'native-editorial-reading', exception:exceptions[p.path]||null, baseline:inventory.baseline, baselineSha256:p.sha256, sourceBaseline:sourceOverrides[p.translation?.sourcePath||p.path]||inventory.baseline, sourceSha256:crypto.createHash('sha256').update(baseline(p.translation?.sourcePath||p.path)).digest('hex'), language:{ originalDeclaration:p.language.declared, resolved:fact.lang, filenameConflict:fact.conflict, evidence:fact.conflict ? 'Reviewed source heading and introductory prose, not filename. Distinct from Chinese source.' : 'Inventory declaration and source body.', counterpart, mixedArchive:fact.mixedArchive, runtimeControls:runtime.has(p.path), controlledProseTranslationVerified:!!counterpart&&!fact.mixedArchive, fullTranslationVerified:!!counterpart&&!fact.mixedArchive&&!mediaLanguageLimitations.length, mediaLanguageLimitations, sourceEditionDiscrepancies:p.path.includes('deepinfer-v41-economics')?['Original Chinese edition reports approximately 19×128 = 2,432 GPUs; original English edition reports approximately 2,371. Both archived statements are retained, not silently reconciled.']:[], notice }, markdownRendered:!!fact.markdown, originalMarkdownRetained:!!fact.markdown, staticHydration:hydrate.has(p.path), removedShell:result.removed, replacedIframes:result.iframeLinks, retainedMedia: /<video\b/.test(result.html) ? 'Original video element: actual recorded media, not a website frame.' : null, staticTextCharacters:result.staticText, cspException:reportCsp ? 'Original no-script CSP preserved; shell CSS inlined; theme links remain native but script persistence unavailable.' : null });
    }
    // Resolve imported Markdown references only where a real shipped HTML counterpart exists.
    for (const record of records) {
      const file = path.join(root, record.path);
      const result = await parser.evaluate(({ source, current, available }) => {
        const d = new DOMParser().parseFromString(source,'text/html'), changes=[];
        d.querySelectorAll('a[href]').forEach(a => {
          const href=a.getAttribute('href'); if (!href || /^(#|https?:|mailto:|tel:|data:|javascript:)/i.test(href)) return;
          const u=new URL(href, `https://local/${current}`); const target=decodeURIComponent(u.pathname.slice(1));
          if (/\.md$/.test(target)) {
            const html=target.replace(/\.md$/,'.html');
            if (available.includes(html)) { a.setAttribute('href',href.replace(/\.md(?=#|\?|$)/,'.html')); changes.push({from:href,to:a.getAttribute('href')}); }
            else { a.removeAttribute('href'); a.dataset.unshippedSource=href; a.title=`Source repository reference (not shipped locally): ${href}`; changes.push({from:href,to:null,reason:'Imported repository document is not shipped. Original path retained in title and source text.'}); }
          }
        });
        return {html:'<!doctype html>\n'+d.documentElement.outerHTML+'\n',changes};
      },{source:fs.readFileSync(file,'utf8'),current:record.path,available:inventory.content.map(p=>p.path)});
      fs.writeFileSync(file,result.html); record.referenceResolutions=result.changes; record.outputSha256=crypto.createHash('sha256').update(result.html).digest('hex');
    }
    const manifest={schemaVersion:1,baseline:inventory.baseline,scope:'R6 reading pages, genuine translated counterparts and eight label-only English SVG derivatives; source scientific claims preserved, not re-measured.',coverage:{owned:pages.filter(p=>!p.translation).length,newTranslations:pages.filter(p=>p.translation).length,migrated:records.length,exceptions:records.filter(r=>r.exception).length,filenameConflicts:records.filter(r=>r.language.filenameConflict).length,translatedAssets:translatedAssets.length},translatedAssets,records};
    fs.writeFileSync(path.join(root,'docs/redesign/reading-migration.json'),JSON.stringify(manifest,null,2)+'\n');
    console.log(JSON.stringify(manifest.coverage));
  } finally { await browser.close(); }
}
main().catch(e=>{console.error(e);process.exitCode=1;});
