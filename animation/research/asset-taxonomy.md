# Generative Visual Lab 技术资产分类目录与架构索引 (Asset Taxonomy)

本目录对私有仓库 `turbo998/generative-visual-lab` 中的全部技术资产进行标准化分类归档。所有交互演示、Blender 4.5 LTS MCP 生成脚本、Cycles 烘焙资产、科学数据集、研究文档与自动化验证证据均按以下六大类别组织，并在每次夜间自动化迭代（00:00–07:00）后保持同步更新。

---

## 一、 顶层目录分类总览

| 资产分类 | 仓库路径 | 核心职责与收录范围 | 许可证 / 来源性质 |
| --- | --- | --- | --- |
| **1. 实时交互演示 (`Demos`)** | `demos/feitian/`<br>`demos/astra-planet/`<br>`demos/rocket-launch/` | 三个核心实时 WebGL / Canvas 2D 交互动画应用（含独立物理、着色器与状态机） | MIT 原创代码 |
| **2. Blender MCP 建模与烘焙管线 (`Blender Pipeline`)** | `scripts/blender/` | 无头 Blender 4.5 LTS MCP 守护进程、JSON-RPC 客户端及三个 Demo 的确定性资产生成脚本 | MIT 原创脚本 |
| **3. 3D 模型、烘焙贴图与科学数据 (`3D & Data Assets`)** | `demos/*/assets/`<br>`demos/astra-planet/public/data/` | Blender 导出的 `.glb` 硬表面套件、Cycles 光追烘焙贴图、NASA MOLA 火星激光测高二进制高程包 | MIT 原创烘焙 + NASA PDS 公共领域数据 |
| **4. 深度技术研究与架构蓝图 (`Research & Docs`)** | `docs/*.md`<br>（构建输出至 `dist/research/*.html`） | Opus 5.5 热门动画全景调研、飞天参考拆解、Blender MCP 架构、火箭方法论、验证与合规记录 | MIT 原创文档 |
| **5. 共享设计系统与构建验收工具 (`Theme & Tooling`)** | `assets/`<br>`scripts/` | Clawpilot 双主题视觉系统、多应用组装编译器、同视角截图采集器与线上验收脚本 | MIT 原创工具 |
| **6. 离线光追图集与自动化测试证据 (`Evidence & Tests`)** | `docs/evidence/`<br>`tests/`<br>`demos/astra-planet/tests/` | Blender Cycles 离线光追图、MCP 调用归档 JSON、帧率预算基准、55+ 项 Vitest 单元与 Playwright E2E 测试 | 实测生成产物 |

---

## 二、 分类资产详细清单

### 1. 实时交互演示资产 (`demos/`)

#### 1.1 `demos/feitian/` —— 风起壁间 · 敦煌飞天壁画叙事
- `demos/feitian/index.html`：响应式石窟画框、四尊飞天近景展板（青羽、丹霞、鎏金、碧落）与控制栏。
- `demos/feitian/main.ts`：完整状态机与渲染管线，包含：
  - **石窟基底与丁达尔天光 (`buildWall`)**：风化砂岩肌理 + Blender Cycles 四龛藻井浮雕合成 + 窟顶斜射丁达尔体积光束（Tyndall Light Shafts）与悬浮金箔微尘。
  - **工笔人物与泥金妆造 (`drawBody` / `renderPortrait`)**：二倍超采样缓存、面部柔光腮红晕染、花钿、四种独立眼型与泥金领缘背光。
  - **丝绸物理与散花 (`motion.ts` + `ribbon`)**：Verlet / PBD 距离与曲率约束双飘带、连续二次曲线轮廓与单次裁切高光填充、带金色花蕊的双层复瓣飞花（`setTransform` 矩阵合批）。
  - **程序化五声音阶音频**：WebAudio API 实时合成宫商角徵羽古琴/洞箫泛音与揭壁钟磬声。
- `demos/feitian/motion.ts` & `demos/feitian/frame-budget.ts`：纯函数轨迹/约束求解器与纳秒级 p95 帧时间预算评估器。

#### 1.2 `demos/astra-planet/` —— Astra · 火星实测地形与气候造景实验室
- `demos/astra-planet/src/render/PlanetScene.ts`：Three.js 自定义球面地形网格与多模式着色器（`realistic` / `gray` / `wireframe`）：
  - **科学高程几何**：由 NASA MOLA `1440×720` 基础包与 `4096×2048` 精细高清包驱动真实顶点位移（588,288 三角面）。
  - **Blender 微表面与光学大气层**：`uMicroNormalMap` 切线空间微地貌法线与凹腔调制、高层大气瑞利/气溶胶晨昏线光学散射（Optical Limb Glow）与极高海拔霜晶微高光。
- `demos/astra-planet/src/terrain/`：高程统计 Worker、地貌书签（奥林帕斯山、水手峡谷、希腊盆地）与 `.glb` 独立场景导出器。

#### 1.3 `demos/rocket-launch/` —— Launch · 圆形舷窗白色火箭发射场
- `demos/rocket-launch/main.ts`：Three.js 外部发射场场景，包含：
  - **Blender MCP 硬表面套件加载与静态合批**：加载 `rocket-kit.glb`（`RocketVehicle`、`UmbilicalArm`、`LaunchPadStatic`），按材质合并静态构件以压降 Draw Calls。
  - **多阶段光学与流体特效**：双层程序化尾焰 Shader（马赫环 + 外层湍流羽流）、有界深度排序烟雾粒子池、**圆形舷窗光学宽银幕眩光（Optical Anamorphic Lens Glow）**、以及**离台地面声学激波环与跨音速水汽凝结锥（Transonic Vapor Cone）**。
- `demos/rocket-launch/flight.ts` & `demos/rocket-launch/landscape.ts`：单调升空运动学状态机、1024×512 天球大气云层烘焙与多级海岸山脉地形采样。

---

### 2. Blender 4.5 LTS MCP 建模与烘焙脚本 (`scripts/blender/`)

| 脚本路径 | 输入 / 参数 | 产出资产 | 说明 |
| --- | --- | --- | --- |
| `scripts/blender/mcp-headless-daemon.py` | 监听 `127.0.0.1:9876` | TCP Socket Server (Protocol v13) | 在 `blender.exe --background` 中启动 `blender-mcp` 服务端 |
| `scripts/blender/mcp-client.mjs` | MCP Stdio JSON-RPC 2.0 | 封装 `get_scene_info` / `execute_blender_code` | Node.js 标准 MCP 客户端，管理守护进程生命周期与日志归档 |
| `scripts/blender/build-rocket-assets.mjs` | 参数化箭体/发射塔尺寸与微软四色材质 | `demos/rocket-launch/assets/rocket-kit.glb`<br>`docs/evidence/blender-rocket-cycles-render.png` | 生成相切弧鼻锥、钛合金栅格翼、五机拉瓦尔喷管、脐带机械臂与导流槽底座 |
| `scripts/blender/build-astra-assets.mjs` | `mola-meg016-base-v1.bin` + Cycles 节点 | `demos/astra-planet/public/data/mars-micro-normal.png`<br>`docs/evidence/blender-astra-cycles-render.png` | 烘焙 256×256 无缝玄武岩断崖/沙垄/微陨石坑法线凹腔图并渲染轨道展示图 |
| `scripts/blender/build-feitian-assets.mjs` | 16:9 石窟四龛坐标与藻井几何参数 | `demos/feitian/assets/grotto-relief-bake.png`<br>`docs/evidence/blender-feitian-cycles-render.png` | 构建莫高窟四座佛龛、莲瓣龛楣与藻井垂幔，Cycles 正交烘焙浮雕光影底图 |

---

### 3. 三维模型、烘焙贴图与科学数据包 (`demos/*/assets/` & `public/data/`)

| 资产文件 | 格式与规格 | 字节大小 | 用途与溯源 |
| --- | --- | --- | --- |
| `demos/rocket-launch/assets/rocket-kit.glb` | glTF 2.0 Binary (`GLB`) | 188,268 B | 白色四色火箭、可分离脐带臂與发射台静态构件（Blender 4.5 MCP 生成） |
| `demos/feitian/assets/grotto-relief-bake.png` | PNG RGBA (`640×360`) | 430,243 B | 莫高窟四龛莲座与藻井正交 Cycles 光追浮雕烘焙底图 |
| `demos/astra-planet/public/data/mars-micro-normal.png` | PNG RGBA (`256×256` Seamless) | 165,301 B | 火星微表面切线法线（RGB）与凹腔遮蔽（Alpha）贴图（Cycles 烘焙） |
| `demos/astra-planet/public/data/mola-meg016-base-v1.bin` | Int16LE Binary (`1440×720`) | 2,073,600 B | NASA MGS MOLA MEGDR 实测火星全球地形基础包 |
| `demos/astra-planet/public/data/mola-meg064-hd-v1.bin` | Int16LE Binary (`4096×2048`) | 16,777,216 B | NASA MGS MOLA 精细高清地形包（按需加载） |

---

### 4. 研究文档与工程蓝图 (`docs/*.md` → `/research/*.html`)

1. `docs/opus-animation-landscape.md`（`/research/opus-animation-landscape.html`）：**Claude Opus 5.5 热门动画与交互视觉全景调研**（317 精选案例分类、四大标杆算法拆解、Prompt 蓝图与本仓映射）。
2. `docs/blender-mcp-pipeline.md`（`/research/blender-mcp-pipeline.html`）：**Gemini 4 Argon + Blender 4.5 LTS MCP 混合渲染管线架构**（含三张内嵌 Cycles 离线光追渲染图）。
3. `docs/feitian-reference-study.md`（`/research/feitian-reference-study.html`）：**敦煌飞天动画参考拆解与原创壁画实现方案**。
4. `docs/technique-comparison.md`（`/research/technique-comparison.html`）：**Canvas 2D / Three.js / WebGPU / Blender 离线烘焙技术路线对比**。
5. `docs/rocket-method.md`（`/research/rocket-method.html`）：**外部视角圆形舷窗白色火箭发射场建模与流体粒子方法论**。
6. `docs/asset-taxonomy.md`（`/research/asset-taxonomy.html`）：**全仓技术资产分类目录与架构索引**（本文档）。
7. `docs/publication-and-provenance.md` & `docs/validation.md`：**数据溯源、版权合规声明与各阶段实测验收记录**。

---

### 5. 自动化测试与验证证据库 (`tests/` & `docs/evidence/`)

- **根项目单元测试 (`tests/*.test.ts`)**：涵盖 `blender-assets.test.ts`（GLB/PNG/MCP 字节级校验）、`motion.test.ts`、`flight.test.ts`、`landscape.test.ts`、`frame-budget.test.ts`。
- **根项目浏览器 E2E 测试 (`tests/e2e/*.spec.ts`)**：涵盖 `gallery.spec.ts`（1440/900/390 三尺寸无溢出校验）、`visual.spec.ts`（飞天完整飞行、人物近景、音频授权、帧率预算与研究文档校验）、`rocket.spec.ts`（全阶段升空、双镜头、上下文恢复与帧率预算）。
- **Astra 独立测试套件 (`demos/astra-planet/tests/`)**：13 项 Vitest 单元测试 + 14 项 Playwright E2E 测试（验证 MOLA 数据完整性、地貌相机定位、响应式球缘、GLB 导出重载与微法线加载）。
