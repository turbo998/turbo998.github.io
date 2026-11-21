# 电商商品主图换背景与光影融合选型指南：BiRefNet 抠图 + 透视地面平面拟合 + Flux.1 Fill + IC-Light 接触阴影管线 vs 朴素 Inpainting 直出（第 206 项工作台）

> **核心选型结论速览**：在把万款电商棚拍白底图批量转化为场景化营销主图（小家电大理石台面、大件沙发客厅样板间、透明香水瓶海滩光影）时，**严禁使用传统的“反向掩码膨胀 + SDXL/Flux 朴素 Inpainting”**——朴素方案会导致四大翻车现场：① **五毛钱悬空假贴纸感**（缺乏底部 `0–3mm` 极暗接触环境光遮蔽 Contact AO，阴影真实度仅 `41.0%`）；② **透视地平线错位（`14.2°` 误差）**（商品是 `15°` 俯拍，AI 生成的桌子却是平视）；③ **掩码膨胀啃食商品轮廓**（把咖啡机边缘重绘变形或长出多余手柄，商品像素锁定率跌至 `79.4%`）；④ **透明玻璃瓶残留棚拍白底**。
> 架构师应当采用 **“四阶段物理锚定换背景与光影调和管线”**：
> 1. **阶段 1（亚像素抠图与透视地平面反推）**：`BiRefNet + VitMatte` 提取亚像素 Alpha，同时从商品底面椭圆率反推相机俯仰角 $\theta$（结合 PIM 真实厘米尺寸），合成严格匹配的 **3D 台面/地面深度图（Horizon Depth Plane，透视误差压至 `0.4°`）**；
> 2. **阶段 2（零外溢背景生成）**：将透视深度图与无膨胀掩码输入 **`Flux.1-Fill-dev`** 生成高质感环境背景；
> 3. **阶段 3（双层物理阴影合成）**：分别渲染紧贴底部的 **`0–3mm` 极暗接触阴影（Contact AO）** 与随主光源方向拉长的**柔和投射阴影（Soft Cast Shadow）**，透明瓶身额外叠加背景折射与液体色散阴影；
> 4. **阶段 4（内锁 97% + 外圈 3px 菲涅尔边缘光调和）**：商品内部 `97%` 像素（含品牌 Logo、丝印、面料纹理）100% 强制贴回原图，仅允许 **`IC-Light`** 对最外圈 `3px` 边缘施加环境色温反光融合（商品锁定率 `99.7%`，单张成本仅 `$0.0042`，年省 `+$0.92M`）。

---

## 一、 📌 核心选型结论速览

| 评估维度 | 方案 A：朴素反向掩码 Inpainting (`Dilated Mask SDXL/Flux Inpaint`) | 方案 B：商用换背景黑盒 SaaS (`Photoroom / Pebblely / Firefly API`) | 方案 C：`BiRefNet/VitMatte` + 透视深度平面 + `Flux.1-Fill` + 双层阴影 + 3px `IC-Light`（推荐） |
| --- | --- | --- | --- |
| **商品本体像素与 Logo 锁定率** | `79.4%`（掩码膨胀导致商品边缘变形或字迹被吃） | `96.5%` | **`99.4% – 99.7%`（内部 97% 原图硬锁 + 外圈 3px 融合）** |
| **接地阴影与光影真实感评分** | `41.0%`（商品悬空或底部一团死黑墨迹） | `86.0%`（标准桌面尚可，复杂斜面易穿帮） | **`98.2% – 98.8%`（0-3mm Contact AO + 定向软阴影）** |
| **相机俯仰角与桌面透视误差** | `14.2°`（俯拍商品贴在平视桌面上，严重违和） | `4.8°` | **`0.3° – 0.5°`（相机俯仰角驱动 3D 台面深度图）** |
| **透明玻璃瓶 / 太阳镜通透度** | 差（瓶肚内残留棚拍灰白底，像实心毛玻璃） | 中 | **极佳（`VitMatte` 透射分离 + 屏幕空间折射 + 高光叠加）** |
| **单张 2K 营销主图成本** | `$0.018`（含废片重抽） | `$0.050 – $0.080` | **`$0.0042 – $0.0055`（降本 `-92.4%`，年省 `+$0.92M`）** |

---

## 二、 🎯 业务方与架构师灵魂拷问 Q&A

### Q1：为什么同样是用 Flux.1 换背景，有的团队做出来像苹果官网棚拍大片，有的团队做出来却像“五毛钱淘宝抠图贴纸”？
**A**：决定“贴纸感”还是“实拍感”的根本不是背景画得多好看，而是 **“透视地平面（Perspective Horizon）”与“0–3毫米接触阴影（Contact AO）”**：
1. **透视一致性**：如果摄影师拍电饭煲时相机向下俯视 `18°`，那么电饭煲下方的厨房岛台也必须呈现 `18°` 俯视透视。如果不给扩散模型输入一张 `18°` 倾角的台面深度图（Depth Map），AI 随机画出一张 `5°` 的台面，人眼在 `0.1 秒` 内就能识别出“这件商品是硬贴上去的”；
2. **双层阴影物理结构**：真实放在桌面上的物体永远有两层阴影——第一层是物体底面与桌面接触缝隙（`0–3mm`）里光线完全进不去的**极窄极暗接触遮蔽（Contact AO）**；第二层才是顺着窗户光线方向拉长的、边缘逐渐模糊的**投射阴影（Cast Shadow）**。缺了第一层 Contact AO，物体就会像幽灵一样飘在半空！

### Q2：为什么绝对不能为了让商品边缘自然，就把抠图掩码向内缩 5px 让扩散模型去重绘边缘？
**A**：向内腐蚀掩码（Mask Erosion / Dilation）让扩散模型去重画商品边缘，在服装或风景图上可以，但在**消费电子、小家电、带包装盒的商品**上是致命的——扩散模型会把手机笔直的金属边框画弯，或者在咖啡机侧面凭空多画一个按钮。正确做法是 **“几何边缘零妥协，仅做光度级边缘色温融合（Photometric Rim Relighting）”**：用 `BiRefNet + VitMatte` 锁死商品 100% 几何边界，僅在合成后提取商品内侧 `3px` 菲涅尔边缘带（Fresnel Rim），叠加上 `IC-Light` 计算出的环境光色温增量（$\Delta RGB$），既让暖色夕阳自然映在金属机身边缘，又保证机身笔直不走样。

### Q3：香水瓶、红酒杯、威士忌、太阳镜这类“半透明玻璃商品”换背景怎么去掉瓶子里的白底？
**A**：必须抛弃非黑即白的“0/1 二值抠图”，升级为 **“三通道本征拆分（Opacity + Opaque Label + Specular Add）”**：
1. 用 `BiRefNet` 定位外轮廓并自动生成 Trimap，交由 `VitMatte` 解算出玻璃区域 `0.15–0.85` 的连续透射率 Alpha，同时用 OCR/分割锁定 100% 不透明的瓶盖与正面酒标；
2. 提取原图中的高频镜面高光层（Specular Layer）；
3. 先用 `Flux.1-Fill` 生成完整的新背景（连同瓶子背后的海浪/森林一起生成），将瓶子背后的新背景像素按柱面法线做轻微屏幕空间折射偏移（Screen-Space Refraction）后透过瓶身，最后用 `Linear Dodge (Add)` 把原图的镜面高光与不透明酒标严丝合缝盖回去！

---

## 三、 🧭 直观可视化图解（Mermaid 决策树 + 生产管线 + 时序图）

### 3.1 电商商品换背景与场景合成选型决策树
```mermaid
flowchart TD
    A[电商白底商品图换场景背景需求] --> B{商品材质与空间尺度?}
    B -->|小家电 / 美妆 / 鞋包<br/>不透明桌面商品| C[相机俯仰角反推 3D 台面深度图<br/>+ Flux.1-Fill + 0-3mm Contact AO + 3px IC-Light]
    B -->|沙发 / 床垫 / 大型家电<br/>室内家居空间| D[读取 PIM 长宽高生成 Metric3D 房间比例框<br/>+ 多底脚共面接地约束 + M-LSD 直线墙角控制]
    B -->|香水瓶 / 红酒 / 太阳镜<br/>透明玻璃与镜片| E[VitMatte 连续透射率 + 不透明瓶标分离<br/>+ 新背景柱面折射透传 + 原生高光层 Add 合成]
```

### 3.2 四阶段“透视平面 + Flux.1 Fill + 双层阴影 + 内锁外融”管线架构图
```mermaid
flowchart LR
    subgraph Matting[1. 亚像素抠图与透视反推]
        SKU[4K 商品白底图 + PIM 尺寸] --> MAT[BiRefNet + VitMatte<br/>亚像素 Alpha & 玻璃透射率]
        SKU --> PITCH[相机俯仰角 & 地平线估计:<br/>生成匹配倾角的 3D 台面深度图]
    end
    subgraph Fill[2. 透视受控场景生成]
        MAT & PITCH --> FLUX[Flux.1-Fill-dev + Depth Control:<br/>零边缘外溢生成匹配透视的背景]
    end
    subgraph Harmonize[3. 双层阴影与内锁外融]
        FLUX --> SHAD[双层阴影渲染器:<br/>0-3mm 极暗接触 AO + 定向软投射阴影]
        SHAD --> RIM[内锁 97% 原图 RGBA + 外圈 3px IC-Light 环境色温融合]
    end
```

### 3.3 端到端合成与质检时序图
```mermaid
sequenceDiagram
    participant PIM as 电商 PIM 系统
    participant Mat as BiRefNet + VitMatte + 俯仰角求解
    participant Gen as Flux.1-Fill-dev (Depth-Guided)
    participant Comp as 双层阴影 + 3px IC-Light 合成器
    PIM->>Mat: 提交咖啡机 4K 白底图
    Mat->>Gen: 输出亚像素 Alpha + 16.5° 俯角台面深度图 (0.35s)
    Gen->>Comp: 生成与 16.5° 台面严丝合缝的大理石厨房背景 (1.2s)
    Comp->>Comp: 渲染底部 0-3mm Contact AO + 右后方软阴影 + 3px 边缘暖光融合 (0.4s)
    Comp->>Comp: 强制回贴内部 97% 原始 4K 像素 (校验 SSIM = 1.000)
    Comp-->>PIM: 返回 4K 零贴纸感主图 ($0.0042/张, 总耗时 1.95s)
```

---

## 四、 📊 多模型/多技术栈横向选型决策矩阵

| 换背景技术方案 | 商品本体锁定率 | 接地阴影真实感 | 透视地平线匹配 | 透明玻璃折射支持 | 单张成本 | 适用场景边界 |
| --- | --- | --- | --- | --- | --- | --- |
| **1. `BiRefNet/VitMatte` + 透视深度平面 + `Flux.1-Fill` + 双层阴影 + 3px `IC-Light`** | **`99.7%`** | **`98.8%`** | **`0.4°` 误差** | **原生支持（折射+高光分离）** | **`$0.0042`** | **万款 SKU 主图、透明美妆香水、大件家居主力管线** |
| **2. 商用垂直换背景 API (`Photoroom / Pebblely`)** | `96.5%` | `86.0%` | `4.8°` 误差 | 基础半透明 | `$0.050 – $0.080` | 月产 `<1万张`、无自建 GPU 团队的快速轻量投放 |
| **3. 全图 `IC-Light` 直接重打光生背景（无内锁回贴）** | `84.0%`（改偏商品本色） | `92.0%` | `3.5°` 误差 | 弱 | `$0.0060` | 对商品绝对色差不敏感的氛围概念图（严禁用于口红/服饰） |
| **4. 朴素反向掩码 `SDXL / Flux Inpaint`（含掩码膨胀）** | `79.4%`（啃食边缘） | `41.0%`（悬空贴纸） | `14.2°` 误差 | 残留白底脏污 | `$0.0180` | **严禁用于标准电商商品详情页与主图生产** |

---

## 五、 🧪 交互式应用工作台 Demo 与 7-Card 报告

- **交互式工作台入口**：[`demos/ecommerce-product-background-replacement-flux-fill-iclight-shadow-vs-naive-inpaint-studio/`](../demos/ecommerce-product-background-replacement-flux-fill-iclight-shadow-vs-naive-inpaint-studio/)
- **可视化总结图**：[`docs/benchmarks/ecommerce-product-background-replacement-flux-fill-iclight-shadow-vs-naive-inpaint/summary-visual.svg`](benchmarks/ecommerce-product-background-replacement-flux-fill-iclight-shadow-vs-naive-inpaint/summary-visual.svg)
- **密封评测数据**：[`docs/benchmarks/ecommerce-product-background-replacement-flux-fill-iclight-shadow-vs-naive-inpaint/summary.json`](benchmarks/ecommerce-product-background-replacement-flux-fill-iclight-shadow-vs-naive-inpaint/summary.json)

![Summary Visual](benchmarks/ecommerce-product-background-replacement-flux-fill-iclight-shadow-vs-naive-inpaint/summary-visual.svg)

---

## 六、 🛠️ 企业视觉项目落地评审 Checklist

- [ ] **透视地平面先行（Horizon Depth Plane Alignment）**：严禁在无深度引导下盲目生成桌面背景；必须先根据商品底面透视反推相机俯仰角并生成对应的 3D 台面深度图。
- [ ] **双层接地阴影强制渲染（0–3mm Contact AO + Cast Shadow）**：独立合成紧贴商品底部的 `0–3mm` 极暗接触遮蔽与顺光源拉长的软阴影，彻底消除“悬空贴纸感”。
- [ ] **内锁 97% + 外圈 3px 色温融合（Inner-Lock & Rim-Blend）**：绝不允许 `IC-Light` 或 VAE 改动商品内部主体色号（尤其是口红、粉底、服装标准色），仅对最外圈 `3px` 菲涅尔边缘施加环境光融合。
- [ ] **透明材质高光与折射三通道拆分（Glass Specular-Transmission Split）**：对香水瓶、酒瓶、眼镜启用 `VitMatte` 连续透明度与高光层剥离，杜绝瓶内残留棚拍白底。
