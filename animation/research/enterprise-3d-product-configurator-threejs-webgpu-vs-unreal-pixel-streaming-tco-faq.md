# 汽车与高奢 3D 在线选配器（3D Product Configurator）架构选型指南：客户端 Three.js / WebGPU + 离线烘焙光影贴图 vs 云端 Unreal Pixel Streaming (WebRTC) TCO 对比（第 219 项工作台）

> **核心选型结论速览**：在新能源汽车上市官网（50,000 人同时在线选配车漆/轮毂/内饰）、高奢机械腕表/钻戒微距定制与全屋定制家居场景中，架构师最容易踩的“百万美元破产巨坑”就是**把面向公网 C 端消费者的 3D 选配器做成全量云端 GPU 渲染推流（`Unreal Engine 5 Pixel Streaming / NVIDIA Omniverse WebRTC`）**——因为每 1–2 名在线看车的网页访客就要独占 1 张云端 GPU，当发布会当晚涌入 `50,000` 并发访客时，瞬间需要 **`25,000 张` 云端显卡**（不仅导致 95% 的高意向买家被拦在“排队 25 分钟”门外流失，每年云显卡账单更高达 **`$4.32M`**，且 WebRTC `118ms` 延迟与 `YUV 4:2:0` 色度压缩还会把腕表微雕小字压糊）。
> 架构师应当实施 **“端侧 Three.js/WebGPU 烘焙光影主力交互（99% 流量）+ 按需 1.5s 云端 4K 大片快照 + 5% VIP 门店 60秒静默帧冻结休眠”** 三层架构：
> 1. **公网 C 端选配（100% 走端侧 `Three.js / R3F / WebGPU`）**：将模型压缩为 `4.8 MB` `Draco + KTX2` 静态包放上全球 CDN（支持 `1,000,000+` 并发零排队），利用买家手机/电脑自带的 GPU 配合 **Blender Cycles 预烘焙车底/座椅接触阴影（AO Map）+ `KHR_materials_clearcoat` 双层金属闪粉清漆**，实现 `98.8%` 视觉还原度、**`8.2 ms` 极致跟手延迟与 `$0.0004` CDN 成本**；
> 2. **按需云端 4K 大片快照（On-Demand Beauty Snapshot）**：仅当买家选好配置、点击“生成我的 4K 雪山/外滩定制壁纸分享朋友圈”那一刻，才异步触发 1 次 `1.5 秒` 的云端无头光追或 `Flux.1 + IC-Light` 实景合成（均摊总成本仅 **`$0.0012/会话`，年省 `+$4.30M`，降幅 `-99.7%`**）；
> 3. **高奢腕表/珠宝微距定制（100% 端侧原生 Retina DPR + RGB 色散折射 Shader）**：彻底规避 WebRTC 视频压缩对钻石火彩与 `0.5mm` 表盘印记的涂抹（锐度从 `82.0%` 提升至 **`99.6%`**）！

---

## 一、 📌 核心选型结论速览

| 评估维度 | 方案 A：公网全量云端 `Unreal Pixel Streaming` (`WebRTC GPU Stream`) | 方案 B：未烘焙纯实时简陋 WebGL (`Unbaked Basic Three.js`) | 方案 C：端侧 `Three.js/WebGPU` + Cycles 烘焙 AO + `Clearcoat` + 按需 4K 云快照（推荐） |
| --- | --- | --- | --- |
| **单次 6分钟选配会话成本** | **`$0.28 – $0.36 / 次`**（独占云端 GPU 计时） | `$0.0004`（仅 CDN 流量） | **`$0.0005 – $0.0012 / 次`（降本 `-99.7%`，年省 `+$4.30M`）** |
| **50,000 并发发布会抗洪峰能力** | **崩溃/排队 25分钟**（需 2.5万张云端 GPU） | **零排队**（CDN 无限水平扩展） | **100% 零排队秒开（CDN 分发 `4.8 MB` 静态资产）** |
| **触控拖拽旋转跟手延迟** | `105 – 140 ms`（网络往返 + 视频编解码迟滞） | **`6.5 – 8.2 ms`** | **`6.5 – 8.2 ms`（本地 60/120fps 零网络延迟，快 `14.4×`）** |
| **车漆清漆 / 钻石微雕视觉还原度** | `99.5%`（车漆极佳，但 **YUV420 压糊腕表微雕至 `82%`**） | `68.0%`（缺乏接触阴影，像塑料玩具） | **`98.8% – 99.6%`（预烘焙光影 + 原生 3x Retina + 按需 4K 光追）** |
| **最佳适用场景边界** | 仅限 `<200 路` 线下 VIP 展厅大屏（需配 60s 休眠） | 低端工业零件预览 | **汽车上市官网、高奢腕表珠宝、电商 3D 定制绝对主力** |

---

## 二、 🎯 业务方与架构师灵魂拷问 Q&A

### Q1：为什么很多主机厂和 3D 外包公司一开始极力推荐 Unreal Engine Pixel Streaming，上线公网活动当天却酿成重大事故？
**A**：因为外包公司演示 Demo 时只有 **1 个人** 在内网连着 1 台 RTX 4090 工作站看画面，当然画质惊艳！但他们故意隐瞒了**“状态化云显卡与公网 C 端流量完全不兼容”**的数学死穴：
1. **并发容量死穴**：传统网页服务器 1 台机器可以服务 50,000 个 HTTP 连接；但 `Unreal Pixel Streaming` 是重度 3D 图形进程，1 张 `$1.50/小时` 的云端 L40S 显卡最多只能同时跑 `2–4 个` 1080p 实例。当新车发布会微博热搜带来 `50,000` 人同时在线选车时，没有任何一家云厂商能在 5 分钟内给你调拨出 `15,000 张` GPU！结果 95% 的客户点进官网只能看到“正在排队”，直接关掉网页去买竞品了。
2. **僵尸会话烧钱死穴**：用户打开网页转了两下车子，然后切去回微信或最小化了浏览器，后台的云端 GPU 依然在以 60fps 满负荷空转烧钱！

### Q2：用客户端 `Three.js / WebGPU` 在手机和普通轻薄本浏览器里跑 3D 选配器，怎么去掉“廉价塑料玩具感”、做出媲美离线光追的 98.8% 豪车与名表质感？
**A**：普通 Three.js 项目看着像塑料，是因为没有做 **“离线烘焙与物理车漆/色散着色器（Baked Lightmaps + Advanced glTF PBR）”**：
1. **车底与内饰阴影 100% 离线烘焙（Blender Cycles Lightmap Baking）**：汽车静止在展厅地面上的底盘软阴影、轮拱暗部、以及真皮座椅缝线处的环境光遮蔽（AO），根本不需要在买家手机上实时光追！在资产上线前用无头 `Blender Cycles` 跑 5,000 采样离线光线追踪，烘焙成一张仅 `600 KB` 的 `KTX2` 光照贴图叠加在模型上，手机 GPU 零开销即可获得电影级深邃体积阴影；
2. **双层金属清漆与微闪粉（`KHR_materials_clearcoat` + Flake Normal）**：底层用各向异性金属色 + 高频平铺的微米级金属闪粉法线贴图（Metallic Flakes），外层包裹折射率 `IOR = 1.5` 的透明清漆层，完美还原保时捷/法拉利阳光下的珠光颗粒感；
3. **高奢钻石三波长色散（RGB IOR Dispersion）**：针对钻戒与蓝宝石表镜，在片元着色器中对红、绿、蓝三通道分别取折射率 `IOR = [2.40, 2.42, 2.45]` 采样环境贴图，并保持手机原生 `3x Retina DPR` 分辨率，钻石火彩与瑞士表盘微雕比经过 WebRTC 视频压缩的云流化清晰数倍！

### Q3：如果客户在线下 4S 店 VIP 定制室或超大型房地产沙盘上确实需要用 Unreal Pixel Streaming，架构师必须加哪三道保命护栏？
**A**：
1. **公私网流量隔离（5% VIP Gating）**：公网匿名访客 100% 路由至端侧 `Three.js`；只有门店登录态 iPad 或已付定金 VIP 客户才允许申请云流化实例；
2. **60 秒无触控静默帧冻结休眠（Idle Frame-Freeze Hibernation）**：前端监听 `pointermove / touchstart`；一旦客户与销售人员停下来交谈超过 `60 秒` 未转动视角，前端立即执行 `canvas.drawImage(videoElement)` 将当前最后一帧高清画面定格在网页上，同时断开并释放后台云端 GPU 给其他用户复用！当手指再次触碰屏幕时，通过预热池在 `180ms` 内无感恢复视频流，直接砍掉 **`95.3%`** 的空闲显卡浪费！

---

## 三、 🧭 直观可视化图解（Mermaid 决策树 + 端云混合管线 + 时序图）

### 3.1 企业 3D 产品选配器架构选型决策树
```mermaid
flowchart TD
    A[企业建设 3D 产品在线选配器 / 定制台] --> B{目标受众场景与峰值并发规模?}
    B -->|公网 C 端消费者官网 / 小程序<br/>汽车上市 / 运动鞋服 / 模块化家具 1k - 100k+ 并发| C[采用端侧 Three.js / WebGPU + Cycles 预烘焙 AO/Lightmap<br/>+ KHR_materials_clearcoat 零云端 GPU 实时交互 $0.0004/次]
    C --> D[在用户点击“保存/分享我的定制海报”瞬间:<br/>按需触发 1.5s 云端无头光追或 Flux.1+IC-Light 4K 快照]
    B -->|高奢机械腕表 / 钻石珠宝微距定制<br/>需极致文字锐度与钻石色散火彩| E[采用端侧 Three.js 原生 3x Retina DPR 渲染<br/>+ RGB 三波长色散 Shader + 各向异性金属拉丝]
    B -->|线下旗舰店 VIP 贵宾室大屏 / 未烘焙千万面建筑光追<br/>受控内网 < 200 路并发| F[采用边缘节点 Unreal Pixel Streaming WebRTC<br/>+ 强制开启 60秒无操作静态帧冻结休眠机制]
```

### 3.2 四阶段“Cycles 离线烘焙 + 端侧 WebGPU 交互 + 按需 4K 快照”管线架构图
```mermaid
flowchart LR
    subgraph AssetPrep[1. 离线高模減面与光影烘焙]
        CAD[工业 CAD / Alias 数模] --> BLEND[Headless Blender Cycles:<br/>烘焙 2K 车底/内饰 AO 光照贴图]
        BLEND --> KTX[gltfpack Draco + KTX2 压缩:<br/>输出 4.8MB 基础包 + 按需轮毂分包]
    end
    subgraph Client[2. 端侧零成本 60fps 实时选配]
        KTX --> CDN[全球 Edge CDN 分发<br/>支撑百万并发零排队]
        CDN --> THREE[买家手机/PC Three.js / WebGPU:<br/>Clearcoat 闪粉车漆 + 8.2ms 丝滑旋转]
    end
    subgraph Snapshot[3. 按需 4K 社交分享大片生成]
        THREE -->|仅 10% 用户点击分享时触发| SNAP[传入当前相机角度 + 选配 JSON<br/>1.5s 云端光追 / Flux.1+IC-Light 4K 海报]
    end
```

### 3.3 端侧零排队选配 + 按需 4K 快照 vs VIP 60秒静默休眠时序图
```mermaid
sequenceDiagram
    participant User as 选配消费者 (手机 / PC 浏览器)
    participant CDN as Edge CDN (4.8MB GLB+KTX2)
    participant LocalGPU as 客户端本地 WebGPU / Three.js
    participant CloudSnap as 按需 4K 快照 Serverless 池
    User->>CDN: 打开新车上市 3D 选配页 (50,000 人同时在线)
    CDN-->>LocalGPU: 0.8s 下载 4.8MB 压缩车模与 Cycles 烘焙阴影贴图
    User->>LocalGPU: 连续 5 分钟自由旋转、开关车门、切换 8 种车漆与 4 款轮毂
    LocalGPU-->>User: 8.2ms 零延迟满帧渲染 (此过程服务端 GPU 消耗 = $0.00!)
    User->>CloudSnap: 点击“生成我的 4K 雪山专属提车海报”
    CloudSnap-->>User: 依据当前配置 JSON 与机位在 1.5s 内返回 4K 电影级实景合成大图 ($0.008)
```

---

## 四、 📊 多模型/多技术栈横向选型决策矩阵

| 3D 选配器技术方案 | 单次会话成本 | 50,000 并发可用性 | 触控跟手延迟 | 微距文字/钻石锐度 | 年化总成本 (1M 会话/月) | 适用场景边界 |
| --- | --- | --- | --- | --- | --- | --- |
| **1. 端侧 `Three.js/WebGPU` + 烘焙 AO + 按需 4K 快照** | **`$0.0012`** | **100% 零排队秒开** | **`8.2 ms`** | **`99.6%` (Retina 原生)** | **`$14,400 / 年`** | **汽车官网、高奢腕表珠宝、家居公网选配绝对主力** |
| **2. 纯端侧 `Three.js/WebGPU`（不含云端快照）** | **`$0.0004`** | **100% 零排队秒开** | **`6.5 ms`** | **`99.6%`** | **`$4,800 / 年`** | 运动鞋服定制、3C 数码配色预览 |
| **3. 边缘 `UE5 Pixel Streaming` + `60s 静默帧冻结休眠`** | `$0.0450` | 限 `<500` 并发 | `22.0 ms` | `92.0%` | `$540,000 / 年` | **线下门店 8K VIP 定制大屏、千万面未烘焙建筑漫游** |
| **4. 全量公网无休眠 `Unreal Pixel Streaming`** | `$0.3600` | **崩溃 / 排队 25分钟** | `118.0 ms` | `82.0%` (YUV420 模糊) | **`$4,320,000 / 年`** | **严禁直接暴露给公网 C 端突发流量** |

---

## 五、 🧪 交互式应用工作台 Demo 与 7-Card 报告

- **交互式工作台入口**：[`demos/enterprise-3d-product-configurator-threejs-webgpu-vs-unreal-pixel-streaming-tco-studio/`](../demos/enterprise-3d-product-configurator-threejs-webgpu-vs-unreal-pixel-streaming-tco-studio/)
- **可视化总结图**：[`docs/benchmarks/enterprise-3d-product-configurator-threejs-webgpu-vs-unreal-pixel-streaming-tco/summary-visual.svg`](benchmarks/enterprise-3d-product-configurator-threejs-webgpu-vs-unreal-pixel-streaming-tco/summary-visual.svg)
- **密封评测数据**：[`docs/benchmarks/enterprise-3d-product-configurator-threejs-webgpu-vs-unreal-pixel-streaming-tco/summary.json`](benchmarks/enterprise-3d-product-configurator-threejs-webgpu-vs-unreal-pixel-streaming-tco/summary.json)

![Summary Visual](benchmarks/enterprise-3d-product-configurator-threejs-webgpu-vs-unreal-pixel-streaming-tco/summary-visual.svg)

---

## 六、 🛠️ 企业视觉项目落地评审 Checklist

- [ ] **公网 C 端流量 100% 走客户端 WebGPU / Three.js**：严禁为公网匿名消费者分配独占云端 GPU 渲染流；使用 `Draco + KTX2` 将主车模控制在 `<5 MB`，轮毂与内饰包按需懒加载。
- [ ] **离线烘焙 AO 与 `KHR_materials_clearcoat` 车漆管线**：在 CI/CD 中通过无头 Blender Cycles 烘焙软接触阴影与座椅缝隙 AO，并启用双层清漆、各向异性金属拉丝与微闪粉法线贴图。
- [ ] **按需触发云端 4K 分享美照（On-Demand Snapshot Only）**：将重度云端路径追踪或 `Flux.1 + IC-Light` 外景生成严格后置到用户点击“下载/分享配置海报”按钮的那一刻。
- [ ] **VIP 云流化强制配置 60秒静默帧冻结释放（Idle Frame-Freeze Gate）**：对线下展厅必须使用的 Pixel Streaming 实例，强制开启 60 秒无触控自动截帧定格并立即回收后台 GPU 槽位。
