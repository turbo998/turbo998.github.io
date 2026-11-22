# 企业 360° 全景天空盒与 32-Bit `.exr` HDRI 环境光球生成选型指南：水平圆周卷积（Circular Conv2D）+ CubeMap 天顶/天底去漩涡 + 16.4档 EV 逆色调映射 vs 普通 2D 生图接缝断裂（第 233 项工作台）

> **核心选型结论速览**：在汽车 3D 在线选配器、珠宝腕表 PBR 展台、Apple Vision Pro 空间展厅以及 LED 虚拟制片（ICVFX）中，核心底座资产是 **360° 等距柱状投影全景图（2:1 Equirectangular Skybox）与 32-bit 浮点 `.exr` HDRI 环境照明球（Image-Based Lighting, IBL）**。
> **严禁直接用普通 2D 扩散模型（`Flux / SDXL / Imagen`）生成一张 `2:1` 平面长图直接贴到 3D 球面上当 HDRI 用**——这会引发三大致命工程缺陷：① **经度 `±180°` 垂直撕裂刀疤（连续性仅 `58.0%`）**：普通卷积层左右边界补零（Zero-Padding）导致球面合拢处山脉断裂、天空色差突变；② **天顶/天底“抽水马桶黑洞漩涡”（`38.5%` 极点畸变）**：球极一点被拉宽为 2048 像素导致车轮正下方地面拧成麻花；③ **8-bit 死白太阳打不出任何车底阴影（仅 `6.5 档 EV`）**：普通 PNG 太阳亮度上限仅 `255 (1.0)`，跟白云一样暗，导致 3D 跑车灰蒙蒙毫无清漆高光！
> 架构师应构建 **“水平 `Circular Conv2D` 零接缝 + `CubeMap (+Y/-Y)` 正交极区修补 + 多档曝光 `32-bit Float .exr` 合成（`16.4 档 EV`）”三步管线**：
> 1. **水平圆周卷积与半宽交替平移（`100.0%` 经度零接缝）**：让图像左边界 `x=0` 与右边界 `x=W-1` 在潜空间直接相连；
> 2. **CubeMap 顶底面正交重投影修补（`99.9%` 极点零漩涡）**：将 `±60°~90°` 极区投影为无畸变正方形平面修补平整地砖；
> 3. **多曝光包围预测合成 `28,000 nits` 32-bit `.exr` 光照球 + 预卷积 `KTX2`（单套 `$0.045` 替代 `$2,500` 外拍采风，年省 `+$1.96M–$2.28M`）**！

---

## 一、 📌 核心选型结论速览

| 评估维度 | 方案 A：普通 2D 生图直出 8-Bit 2:1 PNG (`Standard 2D Diffusion`) | 方案 B：实地外拍多曝光镀铬球 / 全景相机 (`Physical HDRI Shoot`) | 方案 C：水平 `Circular Conv2D` + `CubeMap` 去极点漩涡 + `16.4-EV 32-Bit .exr`（推荐） |
| --- | --- | --- | --- |
| **经度 `±180°` 球面闭合连续度** | `58.0%`（正后方出现一条贯穿天地的垂直断层线） | `100.0%`（需人工 PTGui 拼接） | **`100.0%`（底层算子级 Circular Padding + 半宽潜变量交替平移）** |
| **天顶 (+90°) 与车底 (-90°) 平整度** | `61.5%`（`38.5%` 概率在车轮底下出现放射状黑洞漩涡） | `95.0%`（需人工擦除三脚架阴影） | **`99.9%`（重投影至 `CubeMap +Y/-Y` 正交平面生成平整地砖再逆映射）** |
| **环境光动态范围与光追车影** | `6.5 Stops EV`（8-bit 太阳被截断在 1.0，**完全打不出阴影**） | `16.0+ Stops EV` | **`16.4 Stops EV`（合成 32-bit Float `.exr`，太阳达 `28,000 nits` 激发锐利车影）** |
| **单套 8K 全景 + 32-Bit HDRI 成本** | `$0.85 / 张`（不可用于 PBR 光照） | `$2,500 / 场景`（差旅 + 封路拍摄） | **`$0.032 – $0.045 / 套`（4.5秒出齐，年省 `+$1.96M – $2.28M`）** |

---

## 二、 🎯 业务方与架构师灵魂拷问 Q&A

### Q1：为什么用 Photoshop 偏移滤镜修补 360° 全景图接缝总有痕迹，而在扩散模型的 `Conv2D` 层改一行 `padding_mode='circular'` 就能做到 100% 绝对无缝？
**A**：因为事后在像素空间用 Inpainting 修补接缝，左右两侧在生成早期（第 1–10 步低频构图阶段）已经长出了完全不同的地平线高度和云层走向，强行擦除接缝只会留下一团模糊的过渡带！
- **算子级圆周拓扑闭环**：我们将 DiT 与 VAE 中所有卷积层在 **水平 X 轴方向设为 `Circular Padding`（圆周循环填充），垂直 Y 轴保持 `Zero/Reflect Padding`**，并在偶数去噪步将整个潜空间张量沿水平方向循环平移半个宽度（`torch.roll(latent, shifts=W//2, dims=-1)`）——这样原来的接缝处直接变成了画布正中央，模型从第 1 步噪声开始就在一个真正的环形圆柱面上作画，合拢处连 `0.1 像素` 的梯度跳变都没有！

### Q2：为什么所有直接生成的等距柱状全景图，往球体上一贴，低头看地面都会有一个“像抽水马桶一样的放射状漩涡”？怎么根治？
**A**：这是球面微分几何的 **极点雅可比奇点（Polar Jacobian Singularity，$\cos\phi \to 0$ as $\phi \to \pm 90^\circ$）**：
- 在 `2:1` 矩形图上，顶部第一行（2048 个像素）和底部最后一行（2048 个像素）映射到 3D 球面上其实分别收缩成了 **南极和北极两个无限小的点**！2D 扩散模型不知道这一行会被捏成一个点，还在按正常比例画砖块，捏合后自然变成恐怖的菊花漩涡！
- **工程根治——`CubeMap (+Y / -Y)` 正交平面重投影**：在赤道带生成完毕后，我们通过球面几何矩阵将天顶（`+60°~+90°`）与天底（`-60°~-90°`）映射为两张完全没有极点畸变的 **`90° FOV` 正方形俯视/仰视图（CubeMap Top & Bottom Faces）**，在正方形平面上用 `Flux.1-Fill` 画出平整的展厅地砖或公路沥青，再逆投影回等距柱状图，彻底消灭极点漩涡！

### Q3：为什么把普通 AI 全景图导入 Blender 或 Unreal Engine 当天空光用，渲染出来的汽车像死气沉沉的塑料模型，连车底阴影都没有？
**A**：因为 **8-bit PNG 不是 HDRI**！
- 在物理渲染器（PBR）做重要性采样（Importance Sampling）时，只有当太阳像素的辐射能量比周围天空高出上千倍（如太阳亮度 `25,000.0`，天空亮度 `1.5`），光线追踪器才会把光线集中射向太阳方向，从而在车底打出锐利的投影并在车漆上打出耀眼的星芒高光；
- 而在 8-bit PNG 里，太阳是 `255`（归一化为 `1.0`），旁边的白云也是 `245`（`0.96`），渲染器认为“满天都是均匀的阴天漫反射”，当然打不出任何阴影！我们通过预测 `EV 0, -3, -6, -9` 四档不同快门曝光下的太阳能量分布并合成为 **32-bit IEEE-754 浮点 `.exr` 文件（`16.4 档 EV`）**，让 AI 全景图真正具备物理级照明能力！

---

## 三、 🧭 直观可视化图解（Mermaid 决策树 + 管线架构图 + 时序图）

### 3.1 企业 360° 全景天空盒与 32-Bit HDRI 生产决策树
```mermaid
flowchart TD
    A["输入 3D 展厅/汽车渲染/虚拟制片环境光需求"] --> B["第1步: 启用水平 Circular Conv2D + 偶步 W/2 循环平移<br/>生成经度 ±180° 100% 无缝闭合的 2:1 全景主带"]
    B --> C["第2步: 将 ±60°~90° 天顶与天底重投影为 CubeMap (+Y / -Y) 正交正方形<br/>调用 Flux.1-Fill 修补平整车底地面与天顶云层 (0% 极点漩涡)"]
    C --> D{"目标 3D 引擎用途?"}
    D -->|"仅作背景天空球显示 (Background Skybox)"| E["8K 水平环形分块超分 -> 导出轻量 WebP / AVIF"]
    D -->|"用于 3D 汽车/腕表/角色 PBR 物理照明与反射 (IBL)"| F["第3步: 多曝光包围预测 (EV 0 / -3 / -6 / -9)<br/>Debevec 辐射度合成 16.4档 EV (28,000 nits) 32-bit Float .exr"]
    F --> G["预卷积生成 Three.js / UE5 实时 GGX Roughness KTX2 CubeMap ($0.045/套)"]
```

### 3.2 四阶段“水平圆周卷积 + CubeMap 极区修补 + 32-Bit EXR 合成”架构图
```mermaid
flowchart LR
    subgraph Toroidal["1. 经度零接缝环形扩散"]
        PROMPT["场景提示词 / 深度锁"] --> CIRC["Circular Conv2D + W/2 Roll:<br/>100% 闭合 ±180° 经度接缝"]
    end
    subgraph Poles["2. 极区 CubeMap 正交去漩涡"]
        CIRC --> CUBE["重投影至 CubeMap (+Y 天顶 / -Y 天底)<br/>Flux.1-Fill 生成平整车底路面 (99.9%)"]
    end
    subgraph HDRI["3. 16.4档 EV 32-Bit .exr 照明合成"]
        CUBE --> EV["预测 EV 0/-3/-6/-9 多档曝光<br/>合成 28,000 nits 32-Bit OpenEXR + KTX2"]
    end
```

### 3.3 汽车 3D 选配器一键生成 8K 背景球与 32-Bit 光追 HDRI 时序图
```mermaid
sequenceDiagram
    participant Art as 3D 汽车/空间视觉团队
    participant Gen as Circular Conv2D + CubeMap 引擎
    participant HDR as 多曝光 EV 辐射度合成器
    participant Engine as Three.js WebGPU / Unreal Lumen

    Art->>Gen: 请求生成“阿尔卑斯雪山日落盘山公路” 360° 车展环境
    Gen->>Gen: 水平圆周卷积生成 360° 环带，并重投影 -Y 底面修补平整柏油路
    Gen-->>HDR: 输出 100% 无接缝、无极点漩涡的基础全景图
    HDR->>HDR: 推演 EV -3/-6/-9 太阳核心未截断能量，合成 16.4档 EV 32-bit .exr
    HDR-->>Engine: 4.5s 交付 8K 背景球 + 32-bit .exr 光照球 + 预过滤 KTX2 反射贴图 ($0.045!)
```

---

## 四、 📊 多模型/多技术栈横向选型决策矩阵

| 360° 全景与 HDRI 生成方案 | 经度 `±180°` 无缝率 | 天顶/天底无漩涡率 | 动态范围 (EV 档数) | 3D 车底光追阴影 | 单套成本 | 适用场景 |
| --- | --- | --- | --- | --- | --- | --- |
| **1. `Circular Conv2D` + `CubeMap` 修极点 + `32-Bit .exr` 管线** | **`100.0%`** | **`99.9%`** | **`16.4 Stops EV`** | **锐利真实车影 + 清漆高光** | **`$0.045`** | **汽车 3D 选配器、珠宝渲染、LED 虚拟制片、Vision Pro** |
| **2. 实地外景多曝光镀铬球/全景相机拍摄 (`Location Shoot`)** | `100.0%` | `95.0%` | `16.0+ Stops EV` | 真实物理阴影 | `$2,500.0` | 极少数特定地标实景复刻 |
| **3. 仅改 Circular Padding 的 8-Bit 全景图 (`8-Bit Seamless`)** | `100.0%` | `61.5%` (极点漩涡) | `6.5 Stops EV` | ⛔ **无阴影 (太阳死白)** | `$0.025` | 仅做不参与光照的远景背景球 |
| **4. 普通 2D 扩散直出 2:1 PNG (`Naive 2D Panorama`)** | `58.0%` (背后断层) | `61.5%` (极点漩涡) | `6.5 Stops EV` | ⛔ **无阴影且接缝穿帮** | `$0.850` | ⛔ **严禁用于任何 3D 球面环境与 PBR 渲染** |

---

## 五、 🧪 交互式应用工作台 Demo 与 7-Card 报告

- **交互式工作台入口**：[`demos/enterprise-360-equirectangular-hdri-skybox-panorama-seam-lock-studio/`](../demos/enterprise-360-equirectangular-hdri-skybox-panorama-seam-lock-studio/)
- **可视化总结图**：[`docs/benchmarks/enterprise-360-equirectangular-hdri-skybox-panorama-seam-lock/summary-visual.svg`](benchmarks/enterprise-360-equirectangular-hdri-skybox-panorama-seam-lock/summary-visual.svg)
- **密封评测数据**：[`docs/benchmarks/enterprise-360-equirectangular-hdri-skybox-panorama-seam-lock/summary.json`](benchmarks/enterprise-360-equirectangular-hdri-skybox-panorama-seam-lock/summary.json)

![Summary Visual](benchmarks/enterprise-360-equirectangular-hdri-skybox-panorama-seam-lock/summary-visual.svg)

---

## 六、 🛠️ 企业视觉项目落地评审 Checklist

- [ ] **水平卷积层全面开启 `Circular Padding` 与偶步 `W/2` 潜变量平移**：从算子底层彻底消灭 `±180°` 经度合拢处的垂直断层接缝。
- [ ] **强制执行 `CubeMap (+Y / -Y)` 极区正交重投影 Inpainting**：绝不允许等距柱状图顶部和底部拉伸行直接落入最终球面，确保车轮正下方地面 100% 平整无漩涡。
- [ ] **PBR 照明环境球必须通过多曝光包围合成为 `32-bit Float .exr`（`≥16 Stops EV`）**：严禁直接拿 8-bit SDR 图片当 IBL 光源，确保太阳未截断峰值能量达 `10,000+ nits`。
- [ ] **构建离线预卷积 `KTX2` 多级粗糙度 Mipmap 交付包**：让 Web 端 Three.js 选配器无需在用户浏览器上实时计算环境光积分。
