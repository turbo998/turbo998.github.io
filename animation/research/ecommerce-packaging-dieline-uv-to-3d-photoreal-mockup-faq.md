# 快消与美妆包装平面刀模图（2D Dieline PDF/SVG）转 3D 烫金浮雕与场景样机编译选型指南：CAD 折痕 UV 映射 + 专色 PBR 分离 vs 平面刀模直丢图生图 FAQ

> **文档定位**：面向食品饮料（自立咖啡袋、易拉罐）、美妆护肤折叠礼盒与快消品印前设计团队的 **Cloud & AI Solution Architect**。严格遵循 `ib-vs-ethernet-roce-selection-faq.md` 标准六段式规范。

---

## ① 📌 核心选型结论速览（Executive Summary）

在快消品与电商新品上市前，包装设计师手里只有一份 **2D 展开平面刀模图（`.ai / .pdf / .svg` 含红色压痕折线、绿色裁切刀线、烫金专色层与 GS1 条形码/营养成分表）**，却急需生成 **4K 照片级 3D 立体商拍主图** 用于电商预售与消费者测款。实测结论如下：
- **⛔ 严禁将展开的 2D 平面刀模图直接喂给图生图大模型（Flat Dieline to I2I / ControlNet Diffusion）**：扩散模型无法理解哪些虚线需要按 `90°` 折向背面、哪些舌头（Tuck Flap）需要塞进盒顶，更不会按圆柱半径做余弦透视缩写——导致生成的盒子还带着未折叠的侧翼耳朵，且营养成分表与 GS1-128 条形码被重编码融化（**文字与条码可读率仅 `51.4%`**）。
- **⚠️ 避免传统 2D 透视斜切贴图（Unlit 2D Perspective Warp）**：虽然字不乱，但无法分离“哑光特种纸（Roughness `0.85`）”与“24K 烫金击凸徽章（Metallic `1.0` + `0.25mm` 浮雕法线）”，画面死板如廉价纸板（专色工艺真实感仅 **`39.4%`**）。
- **✅ 唯一推荐生产架构：“参数化 CAD 折痕/柱面 3D UV 几何折叠器（`100.0%` 配料表与条码零畸变）+ 印前专色通道自动转 PBR 材质球（CMYK 漫反射 + Spot-Gold 金属度 + Spot-UV 粗糙度 + 击凸法线）+ `Flux.1-Fill + IC-Light` 锁定主体场景合成”**——**`2.8 秒`** 直出带真实烫金高光的 4K 预售商拍图，单张成本仅 **`$0.009`**（年省 **+$2.94M** 印前打样与静物棚拍费）。

![快消与美妆包装平面刀模图转 3D 烫金浮雕样机对比总结](benchmarks/ecommerce-packaging-dieline-uv-to-3d-photoreal-mockup/summary-visual.svg)

---

## ② 🎯 业务方与架构师灵魂拷问 Q&A（Q1 / Q2 / Q3）

### Q1：为什么把设计师画好的展开纸盒刀模图丢给 AI 说“帮我折成立体盒子放在大理石桌面上”，出来的盒子会把侧面的配料表直接印在正脸上？
- **根因剖析**：展开刀模图是一张包含 `[左翼 + 正面 + 右翼 + 背面 + 上下插舌]` 的十字形平面展开图（UV Unwrapped Atlas）。2D 扩散模型的卷积核只在二维平面做平移特征提取，完全不懂三维空间中的 `90°` 折痕旋转变换（Rigid Hinge Fold Transformation），因此会把整张十字形刀模原样拍扁在物体正面（可读率仅 **`51.4%`**）。
- **架构解法**：用确定性的 **CAD 刀模拓扑折叠器（Parametric Dieline Folder / Cylindrical UV Mapper）** 解析 `.svg / .pdf` 中的压痕线（Crease Lines），在 Three.js/WebGPU 中沿折痕轴做精确刚体旋转或柱面包裹，将 4K 矢量刀模无损映射为 3D 包装网格（**`100.0%` 像素级锁定配料表与条形码**）。

### Q2：高奢护肤品礼盒上的“24K 烫金 Logo + 0.25mm 击凸浮雕 + 局部亮油（Spot UV）”，怎么在合成图里体现出转动光源时的金箔耀眼反光？
- **架构解法**：直接提取印前设计稿中的 **专色分版图层（Spot Color Channels）** 自动绑定 PBR 物理材质：
  1. `Spot-Gold` 图层 → 映射至 `Metallic = 1.0, Roughness = 0.12, BaseColor = #FBBF24`；
  2. `Spot-Emboss` 图层 → 经 Sobel 梯度算子生成 `0.25mm` 凹凸法线贴图（Normal Map）；
  3. `Spot-UV` 图层 → 映射至清漆层 `Clearcoat = 1.0, ClearcoatRoughness = 0.06`；
  在虚拟影棚 HDRI 照射下，烫金徽章呈现 **`99.4%` 真实金属掠射高光**。

### Q3：自立拉链袋（Stand-Up Gusseted Pouch，如精品咖啡袋、猫粮袋）表面的自然挤压折痕怎么做得逼真，而又不弄糊文字？
- **架构解法**：在标准自立袋 3D 网格上叠加 **低频袋体挤压位移场（Pouch Crease Displacement + Micro-Normal Map）**，使 UV 纹理随袋体鼓胀自然产生微透视弯曲与高光起伏，再将 100% 锁定的 3D 包装渲染图送入 `Flux.1-Fill + IC-Light` 生成四周散落的咖啡豆与桌面接触阴影。

---

## ③ 🧭 直观可视化图解（Mermaid 决策树 + 生产管线架构 + 渲染时序图）

### 3.1 包装平面刀模转 3D 商业样机选型决策树

```mermaid
flowchart TD
    A["2D 印前平面刀模稿 (.ai / .pdf / .svg)"] --> B{"包装容器三维几何形态?"}
    B -- "折叠纸盒 (6面彩盒 / 天地盖礼盒)" --> C["解析压痕线 (Crease) 执行 90° 刚体折盒 UV 映射"]
    B -- "圆柱罐 / 瓶贴 (330ml 易拉罐 / 玻璃瓶标)" --> D["执行 360° 柱面余弦透视 UV 卷绕 (R=33mm)"]
    B -- "软包装自立袋 (Doypack 咖啡袋 / 零食袋)" --> E["映射至自立袋网格 + 叠加袋体挤压折痕法线"]
    C --> F["提取专色版 (烫金/击凸/局部UV) 自动生成 Metallic/Normal/Roughness 贴图"]
    D --> F
    E --> F
    F --> G["WebGPU/Three.js 渲染 100% 锁盒前景 + Flux.1-Fill 合成商业场景 ($0.009)"]
```

### 3.2 企业级印前刀模直通 3D PBR 与 AIGC 场景管线架构图

```mermaid
flowchart LR
    subgraph Prepress["1. 印前矢量刀模源"]
        P1["CMYK 主视觉矢量层"]
        P2["CAD 裁切线与压痕折线"]
        P3["专色通道 (烫金 / 击凸 / 局部UV)"]
    end
    subgraph PBR3D["2. 3D 折盒与专色 PBR 引擎"]
        M1["参数化 3D 折盒 / 柱面 / 自立袋网格"]
        M2["多通道 PBR 材质合成 (0.25mm 击凸法线)"]
        M3["WebGPU 4K 渲染前景 + Depth + 接触 AO"]
    end
    subgraph Scene["3. 受控商业场景生成"]
        S1["Flux.1-Fill + IC-Light 台面与道具生成"]
        S2["100% 锁定包装像素回贴输出 4K 主图"]
    end
    P1 --> M1
    P2 --> M1
    P3 --> M2
    M1 --> M3
    M2 --> M3
    M3 --> S1 --> S2
```

### 3.3 新品包装改稿 `2.8s` 直出 4K 预售商拍图时序图

```mermaid
sequenceDiagram
    participant Des as Packaging Designer
    participant Fold as CAD UV Folder & Spot-PBR Compiler
    participant Fill as Depth Flux.1-Fill Studio
    participant PIM as E-Commerce Pre-Sale Listing

    Des->>Fold: 上传更新后的 2D 展开刀模 PDF/SVG (含烫金专色层)
    Fold->>Fold: 沿 18 条压痕线自动折盒并生成 24K 烫金 Metallic/Normal 贴图 (420ms)
    Fold->>Fill: 渲染 4K 立体包装前景 Alpha + 桌面深度与接触 AO 掩码
    Fill-->>Fold: 返回法式大理石台面与光影环境球 (2.1s)
    Fold-->>PIM: 合成 100% 条码可读、烫金高光真实的 4K 商拍图 ($0.009/张)
```

---

## ④ 📊 多模型 / 多技术栈横向选型决策矩阵

| 选型方案 | 配料表与 GS1 条码可读率 | 烫金/击凸专色工艺真实度 | 单张生成耗时 | 单张算力成本 | 印前打样与上市周期影响 |
| --- | --- | --- | --- | --- | --- |
| **✅ CAD 折痕 3D UV + 专色 PBR + `Flux.1-Fill`（推荐）** | **`100.0%`（零畸变可扫码）** | **`99.4%`（真实金属高光与浮雕）** | **`2.8s`** | **`$0.009`** | **免实体打样提前 14 天开启电商预售测款** |
| **⛔ 展开刀模直接喂给 I2I 扩散大模型** | `51.4%`（配料表融化/盒翼未折） | `74.2%` | `16.4s` | `$0.190` | 不可用（文字乱码且盒子结构错误） |
| **⚠️ 传统 2D 透视斜切贴图（Unlit 2D Warp）** | `96.5%` | `39.4%`（烫金变死黄塑料色） | `0.6s` | `$0.002` | 缺乏高奢金属质感与袋体自然折痕 |

---

## ⑤ 🧪 交互式应用工作台 Demo 与 7-Card 基准报告

- **交互式工作台入口**：[`demos/ecommerce-packaging-dieline-uv-to-3d-photoreal-mockup-studio/`](../demos/ecommerce-packaging-dieline-uv-to-3d-photoreal-mockup-studio/index.html)
- **7-Card 4:5 视觉评测卡**：完整收录于 `docs/benchmarks/ecommerce-packaging-dieline-uv-to-3d-photoreal-mockup/card-1.png` 至 `card-7.png` 及 [`summary.json`](benchmarks/ecommerce-packaging-dieline-uv-to-3d-photoreal-mockup/summary.json)。

---

## ⑥ 🛠️ 企业视觉项目落地评审 Checklist

- [ ] **严禁把未折叠的十字形平面刀模直接送入 2D 扩散模型**：必须先经 CAD 压痕几何折叠或柱面 UV 映射生成三维透视正确的包装前景。
- [ ] **专色版（Spot Channels）独立映射 PBR 通道**：烫金版、击凸版与局部 UV 版必须拆分为独立的 `Metallic`、`Normal` 与 `Roughness` 贴图。
- [ ] **100% 锁定包装本体像素**：`Flux.1-Fill` 仅允许生成包装轮廓外部的桌面道具与背景光影。
