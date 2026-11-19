# Generative Visual Lab 技术资产分类索引 (SA Architecture & Asset Taxonomy)

> 🌐 **Language / 语言**: **中文** | [English (`asset-taxonomy.en.md`)](asset-taxonomy.en.md)

本索引以 **云与 AI 解决方案架构师（Cloud & AI Solution Architect）** 视角，对 `turbo998/generative-visual-lab` 中的 **89 项交互式视觉演示、Blender 4.5 LTS MCP 建模管线、科学数据集、中英双语架构选型指南与自动化验证资产** 进行全景归档。仓库严格聚焦生成式视觉、多模态音画、3D/4D 世界模型与企业级 AIGC 生产架构，不含任何非 AI 范畴的经典物理或机械传感器参数实验台。

---

## 一、 顶层资产分类总览

| 资产维度 | 仓库路径 | 收录规模与核心职责 | 许可证 / 数据溯源 |
| --- | --- | --- | --- |
| **1. 实时程序造景与科学可视化** | `demos/feitian/` · `demos/astra-planet/` · `demos/rocket-launch/` | **3 项核心应用**：Canvas 2D / Three.js 实时渲染、Blender Cycles 离线烘焙与 NASA MOLA 实测地形融合 | MIT 原创代码 + NASA PDS 公共领域数据 |
| **2. 前沿多模态、4D 运镜与 3D 世界模型导演台** | `demos/*-director/` · `demos/*-studio/` · `demos/pelican-bicycle-arena/` | **7 套前沿工作室**：AI 工程套件评测、可编程知识动画、4DGS 相机控制、双流音画拟音、物理世界模型、神经重打光与可玩世界记忆 | MIT 原创架构工作台 |
| **3. 企业级 AIGC 生产管线与 FinOps 工作台** | `demos/*-workbench/` · `demos/*-studio/` · `demos/*-pipeline/` | **79 套企业架构沙盘**：覆盖 Round 300 企业视觉四柱参考架构总纲（第 89 项里程碑！）、5G-A 3D 电磁射线追踪专网孪生、财富管理 SEC/FINRA 持仓视频、车险记录仪 3D 轨迹重建与 AIGC 假伤鉴伪（第 85 项里程碑！）、航空维保视频转 6DoF AR（第 80 项里程碑！）与 MAI-2.7 商业修图实测 | MIT 原创代码 + 7-Card 视觉评测卡 |
| **4. Blender 4.5 LTS MCP 无头管线与二进制资产** | `scripts/blender/` · `demos/*/assets/` · `demos/astra-planet/public/data/` | 无头 JSON-RPC 守护进程、确定性建模烘焙脚本、`.glb` 硬表面套件、微表面法线贴图与火星测高数据包 | MIT 原创脚本与烘焙产物 |
| **5. 双语深度研究与架构师选型 FAQ** | `docs/*.md` · `docs/*.en.md`（编译至 `dist/research/*.html`） | **9 组深度专题报告 + 79 组企业 AIGC 选型 FAQ**（中英双语共 176+ 篇文档） | MIT 原创双语技术文档 |
| **6. 视觉总结图集与自动化测试门禁** | `docs/evidence/` · `docs/benchmarks/` · `tests/` | 架构信息图 SVG、Blender Cycles 光追渲染图、Vitest 单元测试与 Playwright 多视口 E2E 视觉预算门禁 | 实测与架构验证产物 |

---

## 二、 70 项交互演示与对应架构文档全集

### 第一层：实时程序造景、Blender MCP 烘焙与科学可视化（3 项）

| 演示路径 | 场景定位 | 核心架构与技术栈 | 配套深度文档 |
| --- | --- | --- | --- |
| `demos/feitian/` | **风起壁间 · 敦煌飞天壁画叙事** | Canvas 2D 二倍离屏工笔绘制 + Blender Cycles 四龛藻井正交浮雕烘焙 + PBD 丝绸约束求解 + WebAudio 五声音阶合成 | [飞天参考拆解](feitian-reference-study.md) · [技法对比](technique-comparison.md) |
| `demos/astra-planet/` | **Astra · 火星实测地形与古气候实验室** | Three.js 自定义球面位移网格 + NASA MOLA `1440×720 / 4096×2048` 实测高程 + Cycles 微法线烘焙 + 米制 `.glb` 导出 | [Blender MCP 管线](blender-mcp-pipeline.md) · [发布与溯源](publication-and-provenance.md) |
| `demos/rocket-launch/` | **Launch · 圆形舷窗白色火箭发射场** | Three.js + Blender 4.5 MCP `rocket-kit.glb` 按材质静态合批（28 Draw Calls）+ 双层黑体马赫环尾焰 Shader + 有界烟雾池 | [火箭建模方法论](rocket-method.md) · [验证记录](validation.md) |

### 第二层：前沿多模态、4D 视频运镜与 3D 世界模型工作室（7 项）

| 演示路径 | 核心架构命题（SA 视角） | 代表模型与技术对标 | 配套双语研究报告 |
| --- | --- | --- | --- |
| `demos/pelican-bicycle-arena/` | **三大 AI 工程套件同题对决与五种视觉渲染引擎评测场** | FAF vs AGENT-FORGE vs HVE-Core · SVG / Canvas / Three.js / WebGL Shader / Blender Cycles | [鹈鹕骑行评测报告](pelican-bicycle-study.md) · [English](pelican-bicycle-study.en.md) |
| `demos/knowledge-explainer-studio/` | **可编程知识解释视频编译器与 3×3 视觉密度门禁** | HyperFrames HTML5 时间轴 · 四维风格账本 · Cut-the-Curve 具名转场 · Python SFX 音画对齐 | [Opus 动画与视觉谱系](opus-animation-landscape.md) · [English](opus-animation-landscape.en.md) |
| `demos/camera-4d-director/` | **可控 4D 高斯视频与 6D Plücker 相机光线导演台** | NVIDIA GEN3C 三维缓存 · Diff4Splat · MotionStream 实时流 · CameraCtrl 相机轨迹注入 | [可控 4D 视频与运镜研究](controllable-4d-video-camera-study.md) · [English](controllable-4d-video-camera-study.en.md) |
| `demos/audiovisual-foley-studio/` | **原生双流音画联合扩散与 FramePack O(1) 长时序拟音台** | LTX-2 双流 AV-DiT · Veo 3.1 · Hunyuan-Foley 物理接触拟音 · FramePack 恒定显存上下文压缩 | [原生音画与拟音架构研究](audiovisual-foley-framepack-study.md) · [English](audiovisual-foley-framepack-study.en.md) |
| `demos/physgaussian-world-studio/` | **本构连续介质 3DGS（MPM）与物理底座世界模型工作台** | PhysGaussian WS² · OmniPhysGS 12 专家本构 · NVIDIA Cosmos-Transfer1 多模态控频 · Wan2.1-VACE | [物理 3DGS 与世界模型研究](physgaussian-world-mpm-study.md) · [English](physgaussian-world-mpm-study.en.md) |
| `demos/neural-relight-director/` | **神经逆向/正向 G-Buffer 视频重打光与多主体身份锁定导演台** | NVIDIA DiffusionRenderer · Light-A-Video 跨帧光一致注意力 · Phantom × Identity-GRPO × Wan2.1-FLF2V | [神经视频重打光与身份锁定研究](neural-relighting-causal-video-study.md) · [English](neural-relighting-causal-video-study.en.md) |
| `demos/worldmem-action-director/` | **动作条件可玩世界模型与 3D 空间情景记忆导演台** | WorldMem FOV-Pose+Δt 记忆检索 · Google DeepMind Genie 3/4 · Causal Diffusion Forcing 自回归流 | [可玩世界模型与空间记忆研究](worldmem-action-world-study.md) · [English](worldmem-action-world-study.en.md) |

### 第三层：企业级 AIGC 视觉生产管线、推理 FinOps 与合规治理工作台（31 项）

#### 领域 A：AIGC 中台治理、多模型路由与 GPU 推理 FinOps（5 项）
1. `demos/multi-model-aigc-routing-finops-workbench/` — **多模型分级路由与令牌桶异步队列**（Sora 2 / Veo 3 / Kling 2.1 / Wan 2.2 / Flux 分流治理）· [中文 FAQ](multi-model-aigc-routing-finops-vs-single-flagship-faq.md) | [EN](multi-model-aigc-routing-finops-vs-single-flagship-faq.en.md)
2. `demos/serverless-comfyui-warm-pool-vram-scheduler-workbench/` — **自建 Serverless ComfyUI 集群 DAG 底模亲和温池与零拷贝 mmap 调度** · [中文 FAQ](serverless-comfyui-warm-pool-vram-scheduler-faq.md) | [EN](serverless-comfyui-warm-pool-vram-scheduler-faq.en.md)
3. `demos/brand-guardrail-prompt-compiler-c2pa-gateway/` — **企业级提示词 AST 编译器、品牌 VI 色板锁死（ΔE00 ≤ 1.5）与 C2PA v2.1 合规网关** · [中文 FAQ](brand-guardrail-prompt-compiler-c2pa-gateway-faq.md) | [EN](brand-guardrail-prompt-compiler-c2pa-gateway-faq.en.md)
4. `demos/multimodal-rag-enterprise-dam-visual-asset-search-workbench/` — **分镜级多模态 DAM 向量检索与“先搜后生（Search-Before-Generate）”FinOps 网关** · [中文 FAQ](multimodal-rag-enterprise-dam-visual-asset-search-faq.md) | [EN](multimodal-rag-enterprise-dam-visual-asset-search-faq.en.md)
5. `demos/agentic-storyboard-vlm-qa-self-healing-pipeline/` — **多模态 VLM 自动审片判别器与 SAM-2 局部缺陷掩码自愈管线** · [中文 FAQ](agentic-storyboard-vlm-qa-self-healing-faq.md) | [EN](agentic-storyboard-vlm-qa-self-healing-faq.en.md)

#### 领域 B：零售与电商视觉自动化、虚拟试衣与千人千面营销（8 项）
6. `demos/hybrid-remotion-aigc-storyboard-studio/` — **AI 视频镜头缓存 + Remotion 确定性价格/字幕代码合成混合管线** · [中文 FAQ](hybrid-remotion-aigc-video-compositor-vs-pure-ai-faq.md) | [EN](hybrid-remotion-aigc-video-compositor-vs-pure-ai-faq.en.md)
7. `demos/ecommerce-pbr-relighting-inpainting-studio/` — **BiRefNet 内缩 Alpha 像素锁死 + IC-Light 电商万款 SKU 影棚重打光** · [中文 FAQ](ecommerce-pbr-relighting-inpainting-vs-img2img-faq.md) | [EN](ecommerce-pbr-relighting-inpainting-vs-img2img-faq.en.md)
8. `demos/virtual-tryon-garment-warp-mask-studio/` — **DensePose 24 分区人体 UV + IDM-VTON/CatVTON 服装经纬保真虚拟试衣** · [中文 FAQ](virtual-tryon-garment-warp-mask-vs-t2i-faq.md) | [EN](virtual-tryon-garment-warp-mask-vs-t2i-faq.en.md)
9. `demos/live-commerce-realtime-stream-diffusion-workbench/` — **24×7 智能直播间 StreamDiffusion 对角线批处理 + TensorRT 30fps 实时管线** · [中文 FAQ](live-commerce-realtime-stream-diffusion-faq.md) | [EN](live-commerce-realtime-stream-diffusion-faq.en.md)
10. `demos/ecommerce-3d-packaging-uv-dieline-unwrap-pbr-studio/` — **2D CAD 刀版图（FEFCO/ECMA）平面 UV 生成 + 专色烫金/击凸 PBR 自动折盒** · [中文 FAQ](ecommerce-3d-packaging-uv-dieline-unwrap-pbr-faq.md) | [EN](ecommerce-3d-packaging-uv-dieline-unwrap-pbr-faq.en.md)
11. `demos/multilingual-poster-typography-glyph-inpainting-studio/` — **FreeType/Glyph-ByT5 3D 场景字形掩码 + HarfBuzz 多语种矢量海报排版** · [中文 FAQ](multilingual-poster-typography-glyph-inpainting-faq.md) | [EN](multilingual-poster-typography-glyph-inpainting-faq.en.md)
12. `demos/brand-lora-training-dataset-dedup-caption-hygiene-workbench/` — **品牌 IP 与商品 LoRA 训练数据 DINOv2 去重、触发词解耦与前景掩码损失** · [中文 FAQ](brand-lora-training-dataset-dedup-caption-hygiene-faq.md) | [EN](brand-lora-training-dataset-dedup-caption-hygiene-faq.en.md)
13. `demos/personalized-crm-million-user-video-synthesis-engine/` — **千万会员千人千面视频：95% Closed-GOP 预烘焙字节流拼接 + 5% NVENC 变量槽** · [中文 FAQ](personalized-crm-million-user-video-synthesis-faq.md) | [EN](personalized-crm-million-user-video-synthesis-faq.en.md)

#### 领域 C：可控视频后期、多机位智能导播与全球化数字人（7 项）
14. `demos/enterprise-avatar-localization-c2pa-pipeline-studio/` — **17 语种培训数字人：音素-视素面部 ROI 局部合成 + 矢量课件分轨 + C2PA 溯源** · [中文 FAQ](enterprise-avatar-localization-c2pa-pipeline-faq.md) | [EN](enterprise-avatar-localization-c2pa-pipeline-faq.en.md)
15. `demos/short-drama-multimodal-audio-foley-sync-workbench/` — **短剧与广告后期：光流接触 V2A 拟音 + 对白侧链自动闪避 + EBU R128 母带** · [中文 FAQ](short-drama-multimodal-audio-foley-sync-faq.md) | [EN](short-drama-multimodal-audio-foley-sync-faq.en.md)
16. `demos/multi-camera-ai-talkshow-podcast-auto-director-switcher/` — **多机位高管圆桌与播客自动导播：TalkNet 音视唇动门禁 + 1.8s 迟滞防抖 + FCPXML** · [中文 FAQ](multi-camera-ai-talkshow-podcast-auto-director-faq.md) | [EN](multi-camera-ai-talkshow-podcast-auto-director-faq.en.md)
17. `demos/video-inpainting-prop-replacement-object-removal-studio/` — **商业成片穿帮擦除与道具焕新：SAM-2 追踪 + ProPainter 光流传播 + Wan-VACE 时空管** · [中文 FAQ](video-inpainting-prop-replacement-object-removal-faq.md) | [EN](video-inpainting-prop-replacement-object-removal-faq.en.md)
18. `demos/first-last-frame-transition-keyframe-interpolator-studio/` — **品牌一镜到底长镜头：首尾双关键帧锚定（FLF2V）+ 6D Plücker 运镜桥接** · [中文 FAQ](first-last-frame-transition-keyframe-interpolator-faq.md) | [EN](first-last-frame-transition-keyframe-interpolator-faq.en.md)
19. `demos/multi-aspect-ratio-outpainting-safezone-compositor/` — **全渠道广告多画幅适配：SAM-2 显著性安全框 + 方向性扩图 + 平台 UI 死区重排** · [中文 FAQ](multi-aspect-ratio-outpainting-safezone-faq.md) | [EN](multi-aspect-ratio-outpainting-safezone-faq.en.md)
20. `demos/ai-video-upscaling-temporal-tile-consistency-studio/` — **4K 60fps 发布会巨幕超分：双向光流时序对齐 + 25% 汉宁窗重叠分块 + 10-bit 母带** · [中文 FAQ](ai-video-upscaling-temporal-tile-consistency-faq.md) | [EN](ai-video-upscaling-temporal-tile-consistency-faq.en.md)

#### 领域 D：影视游戏预演、LED 虚拟制片与空间计算 3D 管线（6 项）
21. `demos/game-film-character-consistency-lora-previs-workbench/` — **影视与游戏连续分镜：3D 白模相机预演（Depth/OpenPose）+ 四视图角色 LoRA 锁定** · [中文 FAQ](game-film-character-consistency-lora-previs-faq.md) | [EN](game-film-character-consistency-lora-previs-faq.en.md)
22. `demos/virtual-production-led-stage-icvfx-frustum-sync-studio/` — **弧形 LED 虚拟制片（ICVFX）：6DoF 追踪离轴内视锥 3DGS + 外视锥 AIGC HDRI + Genlock** · [中文 FAQ](virtual-production-led-stage-icvfx-frustum-sync-faq.md) | [EN](virtual-production-led-stage-icvfx-frustum-sync-faq.en.md)
23. `demos/cad-bim-sketch-to-photoreal-architectural-controlnet-studio/` — **建筑与连锁商业空间：CAD/BIM M-LSD 直线 + 法线/深度三锁 + 工程建材色卡绑定** · [中文 FAQ](cad-bim-sketch-to-photoreal-architectural-controlnet-faq.md) | [EN](cad-bim-sketch-to-photoreal-architectural-controlnet-faq.en.md)
24. `demos/game-vfx-sprite-sheet-seamless-texture-pbr-generator/` — **游戏材质与特效管线：环形卷积无缝五通道 PBR 分解 + 8×8 闭环序列帧图集** · [中文 FAQ](game-vfx-sprite-sheet-seamless-texture-pbr-faq.md) | [EN](game-vfx-sprite-sheet-seamless-texture-pbr-faq.en.md)
25. `demos/interactive-3d-product-configurator-gaussian-webgpu-studio/` — **在线 3D 展厅选配器：SPZ 量化压缩 3DGS 实景 + Draco/KTX2 PBR 共享深度合成** · [中文 FAQ](interactive-3d-product-configurator-3dgs-vs-pbr-faq.md) | [EN](interactive-3d-product-configurator-3dgs-vs-pbr-faq.en.md)
26. `demos/spatial-computing-apple-vision-pro-mv-hevc-3dgs-pipeline/` — **Apple Vision Pro 空间视频：时序深度 + 双目舒适视差钳位 + LDI 补洞与 MV-HEVC 封装** · [中文 FAQ](spatial-computing-apple-vision-pro-mv-hevc-3dgs-faq.md) | [EN](spatial-computing-apple-vision-pro-mv-hevc-3dgs-faq.en.md)

#### 领域 E：CTO 技术沙盘、高管汇报编译与高性能 Web 交互动效（5 项）
27. `demos/cto-cloud-ai-architecture-scrollytelling-sandbox/` — **CTO 云与 AI 动态架构沙盘：分层等轴测 SVG 矢量拓扑 + 视口裁剪 Canvas 数据流** · [中文 FAQ](cto-cloud-ai-architecture-scrollytelling-stack-faq.md) | [EN](cto-cloud-ai-architecture-scrollytelling-stack-faq.en.md)
28. `demos/executive-keynote-deck-infographic-svg-chart-compiler/` — **高管架构 Deck 编译器：LLM 拓扑 AST + ELK.js 正交布线 + 原生可编辑 PPTX/SVG/Draw.io** · [中文 FAQ](executive-keynote-deck-infographic-svg-chart-faq.md) | [EN](executive-keynote-deck-infographic-svg-chart-faq.en.md)
29. `demos/enterprise-annual-report-motion-canvas-studio/` — **财报与数据故事可编程视频：审计级 SQL/JSON AST + Motion Canvas / Remotion 零幻觉图表** · [中文 FAQ](enterprise-annual-report-motion-canvas-vs-diffusion-faq.md) | [EN](enterprise-annual-report-motion-canvas-vs-diffusion-faq.en.md)
30. `demos/interactive-scrollytelling-webgl-shader-canvas-orchestrator/` — **3D 产品发布长图官网：单共享 WebGL2 `gl.scissor` 虚拟视口切片 + 显存 LRU 回收** · [中文 FAQ](interactive-scrollytelling-webgl-shader-canvas-faq.md) | [EN](interactive-scrollytelling-webgl-shader-canvas-faq.en.md)
31. `demos/interactive-rive-lottie-state-machine-ui-workbench/` — **AI 助手与车载 HMI 交互动效：Rive 48KB 矢量骨骼状态机 vs Lottie vs WebM 透明视频** · [中文 FAQ](interactive-rive-lottie-state-machine-faq.md) | [EN](interactive-rive-lottie-state-machine-faq.en.md)

---

## 三、 三维模型、烘焙贴图与科学数据包校验清单

以下核心二进制资产受 `tests/blender-assets.test.ts` 与 `demos/astra-planet/tests/` 字节级完整性门禁保护：

| 资产路径 | 格式与规格 | 精确字节数 | 架构用途与来源 |
| --- | --- | --- | --- |
| `demos/rocket-launch/assets/rocket-kit.glb` | glTF 2.0 Binary (`GLB`) | `4,741,920 B` | Blender 4.5 LTS MCP 参数化生成的白色四色运载火箭、分离脐带臂与发射台/导流槽硬表面套件 |
| `demos/feitian/assets/grotto-relief-bake.png` | PNG RGBA (`640×360`) | `470,439 B` | Blender Cycles 正交烘焙的莫高窟四龛藻井、火焰龛楣与仰莲须弥座浮雕光影底图 |
| `demos/astra-planet/public/data/mars-micro-normal.png` | PNG RGBA (`256×256` 无缝) | `192,613 B` | Blender Cycles 烘焙的火星无缝微表面切线法线（RGB）与凹腔遮蔽（Alpha）贴图 |
| `demos/astra-planet/public/data/mola-meg016-base-v1.bin` | Int16LE Binary (`1440×720`) | `2,073,600 B` | NASA MGS MOLA 全球实测激光测高基础高程包（首屏默认加载） |
| `demos/astra-planet/public/data/mola-meg064-hd-v1.bin` | Int16LE Binary (`4096×2048`) | `16,777,216 B` | NASA MGS MOLA 高清激光测高高程包（精细观测按需加载） |
