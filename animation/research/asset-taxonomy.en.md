# Generative Visual Lab · SA Architecture & Technical Asset Taxonomy

> 🌐 **Language / 语言**: [中文 (`asset-taxonomy.md`)](asset-taxonomy.md) | **English**

Written from a **Cloud & AI Solution Architect (SA)** perspective, this taxonomy catalogs all **185 interactive visual demonstrations, Blender 4.5 LTS MCP asset pipelines, scientific datasets, bilingual architecture decision guides, and automated verification gates** in `turbo998/generative-visual-lab`. All legacy classical-mechanics and sensor-parameter formula benches have been removed so every asset serves generative visual engineering, controllable multimodal media, 3D/4D world models, or enterprise AIGC production architecture.

---

## 1. Top-Level Asset Categories

| Category | Repository Paths | Scope & Architectural Role | License / Provenance |
| --- | --- | --- | --- |
| **1. Real-Time Procedural & Scientific Scenery** | `demos/feitian/` · `demos/astra-planet/` · `demos/rocket-launch/` | **3 Core WebGL / Canvas 2D Apps**: Hybrid real-time procedural rendering, Blender Cycles offline baking, and NASA MOLA measured altimetry | MIT Original Code + NASA PDS Public Domain Data |
| **2. Frontier Multimodal, 4D Video & 3D World Model Studios** | `demos/*-director/` · `demos/*-studio/` · `demos/pelican-bicycle-arena/` | **7 Frontier Studios**: AI engineering harness benchmark, programmatic explainer compiler, 4DGS camera control, native AV foley, continuum 3DGS world models, neural relighting, and playable episodic world memory | MIT Original Studios |
| **3. Enterprise AIGC Production Pipelines & FinOps Workbenches** | `demos/*-workbench/` · `demos/*-studio/` · `demos/*-pipeline/` | **175 Enterprise Architecture Sandboxes**: Infinite Causal Video DiT Tri-Zone KV Cache & 1.65s Streaming Studio (185th Milestone: 3+7+35×5!), Video DiT 3D Sliding Tile Sparse Attention (STA) Router (Historic 180th Milestone!), and Video DiT Tri-Phase CFG-Interval Studio (175th Milestone!) | MIT Original Code + 7-Card Visual Decks |
| **4. Headless Blender 4.5 LTS MCP Pipeline & Binary Assets** | `scripts/blender/` · `demos/*/assets/` · `demos/astra-planet/public/data/` | Headless JSON-RPC daemon, deterministic modeling/baking scripts, `.glb` hard-surface kits, seamless micro-normal maps, and Mars altimetry binaries | MIT Original Scripts & Bakes |
| **5. Bilingual Deep-Dive Studies & SA Selection FAQs** | `docs/*.md` · `docs/*.en.md` (compiled to `dist/research/*.html`) | **9 Deep-Dive Architecture Studies + 175 Enterprise AIGC Decision FAQs** (370+ paired Chinese & English documents) | MIT Original Bilingual Docs |
| **6. Visual Infographics & Automated Quality Gates** | `docs/evidence/` · `docs/benchmarks/` · `tests/` | Architecture summary SVGs, Cycles reference renders, Vitest unit suites, and Playwright multi-viewport E2E frame/payload gates | Measured & Verified Artifacts |

---

## 2. Complete Inventory of the 70 Demos & Bilingual Architecture Guides

### Layer 1: Real-Time Procedural Scenery, Blender MCP Baking & Scientific Visualization (3 Demos)

| Demo Path | Focus | Reference Architecture & Stack | Bilingual Guides |
| --- | --- | --- | --- |
| `demos/feitian/` | **Winds Among the Murals · Dunhuang Feitian** | 2× supersampled Canvas 2D fine-line rendering + Blender Cycles orthogonal grotto relief bake + PBD silk ribbons + WebAudio pentatonic synthesis | [Feitian Study](feitian-reference-study.en.md) · [Stack Comparison](technique-comparison.en.md) |
| `demos/astra-planet/` | **Astra · Mars Measured Topography & Paleoclimate Lab** | Custom Three.js displacement globe + NASA MOLA `1440×720 / 4096×2048` altimetry + Cycles micro-normal bake + standalone metric `.glb` export | [Blender MCP Pipeline](blender-mcp-pipeline.en.md) · [Provenance](publication-and-provenance.en.md) |
| `demos/rocket-launch/` | **Launch · Circular Porthole White Rocket Complex** | Three.js + Blender 4.5 MCP `rocket-kit.glb` per-material static batching (28 draw calls) + Planck blackbody Mach-diamond plume shader + bounded smoke pool | [Rocket Methodology](rocket-method.en.md) · [Validation Log](validation.en.md) |

### Layer 2: Frontier Multimodal, 4D Camera & 3D World Model Studios (7 Studios)

| Demo Path | Architectural Proposition (SA Perspective) | Reference Models & Engines | Bilingual Deep-Dive Study |
| --- | --- | --- | --- |
| `demos/pelican-bicycle-arena/` | **3-Way AI Engineering Harness Benchmark & 5-Engine Visual Arena** | FAF vs. AGENT-FORGE vs. HVE-Core · SVG / Canvas / Three.js / WebGL Shader / Blender Cycles | [Pelican Benchmark Study](pelican-bicycle-study.en.md) · [中文](pelican-bicycle-study.md) |
| `demos/knowledge-explainer-studio/` | **Programmatic Knowledge-Explainer Video Compiler & 3×3 Density Gate** | HyperFrames HTML5 timeline · 4-axis style ledger · Cut-the-Curve named transitions · Python SFX sync | [Opus Animation Landscape](opus-animation-landscape.en.md) · [中文](opus-animation-landscape.md) |
| `demos/camera-4d-director/` | **Controllable 4D Gaussian Video & 6D Plücker Camera Ray Director** | NVIDIA GEN3C 3D cache · Diff4Splat · MotionStream · CameraCtrl Plücker ray conditioning | [Controllable 4D Video Study](controllable-4d-video-camera-study.en.md) · [中文](controllable-4d-video-camera-study.md) |
| `demos/audiovisual-foley-studio/` | **Native Dual-Stream Audio-Visual Diffusion & FramePack O(1) Foley** | LTX-2 Dual-Stream AV-DiT · Veo 3.1 · Hunyuan-Foley · FramePack constant-VRAM horizon compression | [Audio-Visual & FramePack Study](audiovisual-foley-framepack-study.en.md) · [中文](audiovisual-foley-framepack-study.md) |
| `demos/physgaussian-world-studio/` | **Constitutive Continuum 3DGS (MPM) & Physics-Grounded World Models** | PhysGaussian WS² · OmniPhysGS 12-expert · NVIDIA Cosmos-Transfer1 · Wan2.1-VACE | [PhysGaussian World Study](physgaussian-world-mpm-study.en.md) · [中文](physgaussian-world-mpm-study.md) |
| `demos/neural-relight-director/` | **Inverse/Forward G-Buffer Video Relighting & Identity-Locked Interpolation** | NVIDIA DiffusionRenderer · Light-A-Video CLA · Phantom × Identity-GRPO × Wan2.1-FLF2V | [Neural Relighting Study](neural-relighting-causal-video-study.en.md) · [中文](neural-relighting-causal-video-study.md) |
| `demos/worldmem-action-director/` | **Action-Conditioned Playable World Models & Stateful 3D Episodic Memory** | WorldMem FOV-Pose+Δt retrieval · Google DeepMind Genie 3/4 · Causal Diffusion Forcing | [Playable World Memory Study](worldmem-action-world-study.en.md) · [中文](worldmem-action-world-study.md) |

### Layer 3: Enterprise AIGC Production Pipelines, FinOps & Governance Workbenches (31 Workbenches)

#### Domain A: AIGC Platform Governance, Multi-Model Routing & Inference FinOps (5)
1. `demos/multi-model-aigc-routing-finops-workbench/` — **Tiered Multi-Model Router (Sora 2 / Veo 3 / Kling 2.1 / Wan 2.2 / Flux) & Async Token-Bucket FinOps Queue** · [EN FAQ](multi-model-aigc-routing-finops-vs-single-flagship-faq.en.md) | [中文](multi-model-aigc-routing-finops-vs-single-flagship-faq.md)
2. `demos/serverless-comfyui-warm-pool-vram-scheduler-workbench/` — **Self-Hosted Serverless ComfyUI DAG Checkpoint Affinity Warm Pool & Zero-Copy mmap Scheduler** · [EN FAQ](serverless-comfyui-warm-pool-vram-scheduler-faq.en.md) | [中文](serverless-comfyui-warm-pool-vram-scheduler-faq.md)
3. `demos/brand-guardrail-prompt-compiler-c2pa-gateway/` — **Prompt AST Compiler, Brand VI Palette Lock (CIE ΔE00 ≤ 1.5) & C2PA v2.1 Provenance Gateway** · [EN FAQ](brand-guardrail-prompt-compiler-c2pa-gateway-faq.en.md) | [中文](brand-guardrail-prompt-compiler-c2pa-gateway-faq.md)
4. `demos/multimodal-rag-enterprise-dam-visual-asset-search-workbench/` — **Shot-Level Multimodal DAM HNSW Retrieval & Search-Before-Generate FinOps Gate** · [EN FAQ](multimodal-rag-enterprise-dam-visual-asset-search-faq.en.md) | [中文](multimodal-rag-enterprise-dam-visual-asset-search-faq.md)
5. `demos/agentic-storyboard-vlm-qa-self-healing-pipeline/` — **Multimodal VLM Critic Agent & SAM-2 Localized ROI Self-Healing Inpainting** · [EN FAQ](agentic-storyboard-vlm-qa-self-healing-faq.en.md) | [中文](agentic-storyboard-vlm-qa-self-healing-faq.md)

#### Domain B: Retail & E-Commerce Visual Automation, Virtual Try-On & Hyper-Personalization (8)
6. `demos/hybrid-remotion-aigc-storyboard-studio/` — **Cached AI Generative B-Roll + Remotion Deterministic Price/Copy Vector Compositor** · [EN FAQ](hybrid-remotion-aigc-video-compositor-vs-pure-ai-faq.en.md) | [中文](hybrid-remotion-aigc-video-compositor-vs-pure-ai-faq.md)
7. `demos/ecommerce-pbr-relighting-inpainting-studio/` — **Eroded BiRefNet Alpha Pixel Lock + IC-Light PBR Relighting for 10k-SKU Catalogs** · [EN FAQ](ecommerce-pbr-relighting-inpainting-vs-img2img-faq.en.md) | [中文](ecommerce-pbr-relighting-inpainting-vs-img2img-faq.md)
8. `demos/virtual-tryon-garment-warp-mask-studio/` — **DensePose 24-Part Body UV + IDM-VTON/CatVTON Garment-Preserving Virtual Try-On** · [EN FAQ](virtual-tryon-garment-warp-mask-vs-t2i-faq.en.md) | [中文](virtual-tryon-garment-warp-mask-vs-t2i-faq.md)
9. `demos/live-commerce-realtime-stream-diffusion-workbench/` — **24×7 Live-Commerce StreamDiffusion Diagonal Batching + TensorRT 30fps Pipeline** · [EN FAQ](live-commerce-realtime-stream-diffusion-faq.en.md) | [中文](live-commerce-realtime-stream-diffusion-faq.md)
10. `demos/ecommerce-3d-packaging-uv-dieline-unwrap-pbr-studio/` — **2D CAD Dieline (FEFCO/ECMA) UV Artwork Generation + Spot Foil/Emboss PBR Box Folding** · [EN FAQ](ecommerce-3d-packaging-uv-dieline-unwrap-pbr-faq.en.md) | [中文](ecommerce-3d-packaging-uv-dieline-unwrap-pbr-faq.md)
11. `demos/multilingual-poster-typography-glyph-inpainting-studio/` — **FreeType/Glyph-ByT5 3D Diegetic Glyph Masks + HarfBuzz Multilingual Vector Typography** · [EN FAQ](multilingual-poster-typography-glyph-inpainting-faq.en.md) | [中文](multilingual-poster-typography-glyph-inpainting-faq.md)
12. `demos/brand-lora-training-dataset-dedup-caption-hygiene-workbench/` — **Brand IP & SKU LoRA Dataset Hygiene: DINOv2 Dedup, Trigger Disentanglement & Masked Loss** · [EN FAQ](brand-lora-training-dataset-dedup-caption-hygiene-faq.en.md) | [中文](brand-lora-training-dataset-dedup-caption-hygiene-faq.md)
13. `demos/personalized-crm-million-user-video-synthesis-engine/` — **10M-User Personalized CRM Video: 95% Closed-GOP Byte-Mux + 5% Dynamic NVENC Slots** · [EN FAQ](personalized-crm-million-user-video-synthesis-faq.en.md) | [中文](personalized-crm-million-user-video-synthesis-faq.md)

#### Domain C: Controllable Video Post-Production, Auto-Directing & Avatar Localization (7)
14. `demos/enterprise-avatar-localization-c2pa-pipeline-studio/` — **17-Language Avatar Training Video: Viseme Facial ROI + Vector Slide Track + C2PA Signing** · [EN FAQ](enterprise-avatar-localization-c2pa-pipeline-faq.en.md) | [中文](enterprise-avatar-localization-c2pa-pipeline-faq.md)
15. `demos/short-drama-multimodal-audio-foley-sync-workbench/` — **Short-Drama & Ad Mastering: Optical-Flow Contact V2A Foley + Sidechain Ducking + EBU R128** · [EN FAQ](short-drama-multimodal-audio-foley-sync-faq.en.md) | [中文](short-drama-multimodal-audio-foley-sync-faq.md)
16. `demos/multi-camera-ai-talkshow-podcast-auto-director-switcher/` — **Multi-Camera Roundtable Auto-Director: TalkNet Lip-VAD + 1.8s Hysteresis Hold + FCPXML** · [EN FAQ](multi-camera-ai-talkshow-podcast-auto-director-faq.en.md) | [中文](multi-camera-ai-talkshow-podcast-auto-director-faq.md)
17. `demos/video-inpainting-prop-replacement-object-removal-studio/` — **Commercial Object Removal & SKU Prop Swap: SAM-2 + ProPainter Flow + Wan-VACE Latent Tube** · [EN FAQ](video-inpainting-prop-replacement-object-removal-faq.en.md) | [中文](video-inpainting-prop-replacement-object-removal-faq.md)
18. `demos/first-last-frame-transition-keyframe-interpolator-studio/` — **Uncut Long-Take Morphs: Bidirectional First-Last-Frame (FLF2V) + 6D Plücker Camera Bridge** · [EN FAQ](first-last-frame-transition-keyframe-interpolator-faq.en.md) | [中文](first-last-frame-transition-keyframe-interpolator-faq.md)
19. `demos/multi-aspect-ratio-outpainting-safezone-compositor/` — **Omnichannel Aspect-Ratio Adaptation: SAM-2 Safe-Zone Lock + Outpainting + UI Dead-Zone Reflow** · [EN FAQ](multi-aspect-ratio-outpainting-safezone-faq.en.md) | [中文](multi-aspect-ratio-outpainting-safezone-faq.md)
20. `demos/ai-video-upscaling-temporal-tile-consistency-studio/` — **4K 60fps Video Mastering: Bidirectional Optical-Flow SR + 25% Hann Overlapped Tiling** · [EN FAQ](ai-video-upscaling-temporal-tile-consistency-faq.en.md) | [中文](ai-video-upscaling-temporal-tile-consistency-faq.md)

#### Domain D: Film/Game Pre-Viz, LED Virtual Production & Spatial 3D Pipelines (6)
21. `demos/game-film-character-consistency-lora-previs-workbench/` — **Multi-Shot Film/Game Pre-Viz: 3D Mannequin Depth/OpenPose Blocking + 4-View Character LoRA** · [EN FAQ](game-film-character-consistency-lora-previs-faq.en.md) | [中文](game-film-character-consistency-lora-previs-faq.md)
22. `demos/virtual-production-led-stage-icvfx-frustum-sync-studio/` — **Curved LED-Volume ICVFX: 6DoF Tracked Off-Axis 3DGS + Outer AIGC HDRI Dome + Genlock** · [EN FAQ](virtual-production-led-stage-icvfx-frustum-sync-faq.en.md) | [中文](virtual-production-led-stage-icvfx-frustum-sync-faq.md)
23. `demos/cad-bim-sketch-to-photoreal-architectural-controlnet-studio/` — **Architectural & Retail CAD/BIM Visualization: M-LSD + Normal + Depth Tri-ControlNet + Swatch Lock** · [EN FAQ](cad-bim-sketch-to-photoreal-architectural-controlnet-faq.en.md) | [中文](cad-bim-sketch-to-photoreal-architectural-controlnet-faq.md)
24. `demos/game-vfx-sprite-sheet-seamless-texture-pbr-generator/` — **Game Material & VFX Pipeline: Circular-Conv2D Seamless 5-Map PBR + Cyclic 8×8 Flipbooks** · [EN FAQ](game-vfx-sprite-sheet-seamless-texture-pbr-faq.en.md) | [中文](game-vfx-sprite-sheet-seamless-texture-pbr-faq.md)
25. `demos/interactive-3d-product-configurator-gaussian-webgpu-studio/` — **Web 3D Product Configurator: SPZ-Quantized 3DGS Showroom + Draco/KTX2 PBR Shared Z-Depth** · [EN FAQ](interactive-3d-product-configurator-3dgs-vs-pbr-faq.en.md) | [中文](interactive-3d-product-configurator-3dgs-vs-pbr-faq.md)
26. `demos/spatial-computing-apple-vision-pro-mv-hevc-3dgs-pipeline/` — **Apple Vision Pro Spatial Video: Temporal Depth + Comfort Disparity Clamp + LDI MV-HEVC** · [EN FAQ](spatial-computing-apple-vision-pro-mv-hevc-3dgs-faq.en.md) | [中文](spatial-computing-apple-vision-pro-mv-hevc-3dgs-faq.md)

#### Domain E: CTO Architecture Sandboxes, Executive Decks & Programmable Web Motion (5)
27. `demos/cto-cloud-ai-architecture-scrollytelling-sandbox/` — **CTO Cloud & AI Dynamic Architecture Sandbox: Layered Isometric SVG + Viewport-Culled Canvas** · [EN FAQ](cto-cloud-ai-architecture-scrollytelling-stack-faq.en.md) | [中文](cto-cloud-ai-architecture-scrollytelling-stack-faq.md)
28. `demos/executive-keynote-deck-infographic-svg-chart-compiler/` — **Executive Architecture Deck Compiler: LLM JSON AST + ELK.js Orthogonal Routing + Native PPTX/SVG** · [EN FAQ](executive-keynote-deck-infographic-svg-chart-faq.en.md) | [中文](executive-keynote-deck-infographic-svg-chart-faq.md)
29. `demos/enterprise-annual-report-motion-canvas-studio/` — **Enterprise Earnings Programmable Video: Audited SQL/JSON AST + Motion Canvas / Remotion Charts** · [EN FAQ](enterprise-annual-report-motion-canvas-vs-diffusion-faq.en.md) | [中文](enterprise-annual-report-motion-canvas-vs-diffusion-faq.md)
30. `demos/interactive-scrollytelling-webgl-shader-canvas-orchestrator/` — **3D Product Launch Scrollytelling: Single Shared WebGL2 `gl.scissor` Canvas + Viewport LRU** · [EN FAQ](interactive-scrollytelling-webgl-shader-canvas-faq.en.md) | [中文](interactive-scrollytelling-webgl-shader-canvas-faq.md)
31. `demos/interactive-rive-lottie-state-machine-ui-workbench/` — **Interactive AI Mascot & HMI Motion: Rive 48KB Vector Bone State Machine vs. Lottie vs. WebM Alpha** · [EN FAQ](interactive-rive-lottie-state-machine-faq.en.md) | [中文](interactive-rive-lottie-state-machine-faq.md)

---

## 3. Binary 3D Models, Baked Textures & Scientific Data Integrity Manifest

These core binary assets are enforced byte-for-byte by `tests/blender-assets.test.ts` and `demos/astra-planet/tests/`:

| Asset Path | Format & Dimensions | Exact Byte Size | Architectural Purpose & Provenance |
| --- | --- | --- | --- |
| `demos/rocket-launch/assets/rocket-kit.glb` | glTF 2.0 Binary (`GLB`) | `4,741,920 B` | White four-color launch vehicle, separating umbilical swing arm, and launch pad/trench complex generated via headless Blender 4.5 LTS MCP |
| `demos/feitian/assets/grotto-relief-bake.png` | PNG RGBA (`640×360`) | `470,439 B` | Orthogonal Cycles relief bake of the four Mogao niches, Sumeru lotus pedestals, and coffered caisson ceiling |
| `demos/astra-planet/public/data/mars-micro-normal.png` | PNG RGBA (`256×256` Seamless) | `192,613 B` | Seamless Martian micro-surface tangent-space normal (RGB) and cavity occlusion (Alpha) texture baked in Blender Cycles |
| `demos/astra-planet/public/data/mola-meg016-base-v1.bin` | Int16LE Binary (`1440×720`) | `2,073,600 B` | NASA MGS MOLA measured global laser altimetry base package |
| `demos/astra-planet/public/data/mola-meg064-hd-v1.bin` | Int16LE Binary (`4096×2048`) | `16,777,216 B` | NASA MGS MOLA high-definition laser altimetry package (loaded on demand) |
