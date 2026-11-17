# 视觉与动画技术选型与原理解析 FAQ：Wien-Planck 维恩-普朗克黑体位移定律 vs 朴素固定色相发光漂移（为什么 3D 铁匠锻造与恒星发光若只将固定橙色乘以亮度系数会导致 2.0000× 峰值波长漂移？Round 220 · 第 230 个独立 Demo 历史里程碑）

> **独立专题定位（Tonight Round 28 / Repo Round 220 Historic Milestone · 第 230 个独立可交互 Demo：`demos/wien-blackbody-displacement-rig/`）**  
> 本指南严格对标 `ib-vs-ethernet-roce-selection-faq.md` 的**六段式架构师决策结构**，先用通俗大白话与第一性原理讲透 **Wilhelm Wien（1893，1911 年诺贝尔物理学奖）与 Max Planck（1900）黑体辐射量子能谱极值与维恩位移定律（$\lambda_{\text{peak}} T = b_{\text{Wien}} = 2897.77\;\mu\text{m}\cdot\text{K}$）**，再给出 AI 视频生成模型、全波段高光谱 CIE 1931 色度三刺激值积分、朴素固定色相自发光倍增模型与代码驱动解析 Wien-Planck 黑体位移引擎的定量选型边界。

![Wien-Planck 黑体位移定律对比总结图](./evidence/wien-blackbody-displacement-rig-summary.svg)

---

## 一、📌 核心结论速览（Executive Summary）

1. **一句话结论**：
   - 在 **3D 铁匠打铁锻造（Blacksmith Iron Forging）、火山熔岩冷却结壳、白炽灯钨丝升温、火箭发动机喷管尾焰与天体物理恒星光谱色温（Planckian Locus）着色器** 中，绝对温度为 $T$ 的黑体辐射光谱辐射亮度 $B_\lambda(T) = \frac{2hc^2}{\lambda^5}\frac{1}{e^{hc/(\lambda k_B T)} - 1}$ 并非维持固定色相放大，而是其**辐射峰值波长 $\lambda_{\text{peak}}(T)$ 严格与绝对温度 $T$ 成反比（维恩位移定律）**：
     $$\frac{\partial B_\lambda(T)}{\partial \lambda} = 0 \implies \frac{h c}{\lambda_{\text{peak}} k_B T} = 4.96511423 \implies \lambda_{\text{peak}}(T) = \frac{b_{\text{Wien}}}{T} = \frac{\lambda_{\text{peak},0}}{T / T_0} = \frac{\lambda_{\text{peak},0}}{1 + u}$$
   - 若采用**朴素固定色相自发光倍增模型（Naive Fixed-Hue Emissive Multiplier，将固定橙红色相 RGB 乘以标量强度 `emissive = baseOrange * intensity` 而保持峰值波长恒为 $\lambda = \lambda_0$）**，在跨越无量纲色温扩展参数 $u = T/T_0 - 1 \in [0.000, 1.000]$（即绝对温度从 $T_0$ 升至 $2.00\,T_0$，例如从 $3000\text{ K}$ 暖黄钨丝升至 $6000\text{ K}$ 太阳表面色温）的 17 个检验站点上，朴素模型的峰值波长漂移比 $\frac{\lambda_{\text{naive}}}{\lambda_{\text{Wien}}(u)} = \frac{T(u)}{T_0} = 1 + u$ 在第 4 站（$u=0.25, T=1.25 T_0$）漂移 **$1.2500\times$**，在第 8 站（$u=0.50, T=1.50 T_0$）漂移 **$1.5000\times$**，在第 16 站（$u=1.00, T=2.00 T_0$，真实峰值波长已向短波蓝移减半至 $0.5000\,\lambda_0$）直接发生 **$2.0000\times$ 八度倍频波长漂移**（污染 **16 / 17** 个站点）！
   - 采用 **代码驱动的 Wien-Planck 闭式黑体位移求解器**，在全部 17 个色温站点上恒定锁死峰值波长比 **$\lambda_{\text{active}} / \lambda_{\text{Wien}} = 1.0000\times$**（**0 / 17** 站漂移），与 64 波段普朗克绝热腔模缩放求积完全等价（最大求积误差 $< 10^{-12}$），且单核 Node CPU 执行 8,192 次 17 站全量求解比 64 波段求积快约 **$40\times$**。

2. **为什么游戏里的“烧红铁剑”和“火山岩浆”调高发光强度后只是一团死板的刺眼橘黄色，而真实打铁炉里的铁水却是耀眼的炽白色？**
   - 许多渲染管线处理自发光（Emission）时，把颜色色相（Hue）和亮度（Luminance）拆成了两个互不相干的参数：美术师先挑一个橘红色，再把 `Emissive Intensity` 拉到 `10.0`。
   - **第一性原理破局（维恩 1893 绝热膨胀定理 & 普朗克 1900 量子分布）**：根据普朗克公式，在低温（$1000\text{ K}$）时，热能 $k_B T$ 很小，由于玻尔兹曼指数截断 $e^{-hc/(\lambda k_B T)}$，只有长波红光光子能够被激发出来（峰值在红外 $2898\text{ nm}$）；当温度升高一倍（如从 $3000\text{ K}$ 升到 $6000\text{ K}$）时，高能短波蓝绿光子的激发概率呈指数级暴增，把整个光谱曲线的最高峰按 $\lambda_{\text{peak}} = \frac{2897.77\;\mu\text{m}\cdot\text{K}}{T}$ 向短波方向推近了一半（从 $966\text{ nm}$ 推到可见光正中央的 $483\text{ nm}$ 蓝青光），红、绿、蓝三原色同时达到极高辐射，合成为耀眼的**日光炽白色**！若温度继续升至 $12000\text{ K}$（如参宿七蓝超巨星或电焊弧光），峰值进一步推向紫外，可见光区呈现冷峻的**蓝白色**！

---

## 二、🎯 客户与架构师灵魂拷问 Q&A（Selection & Architecture Deep-Dive）

### Q1：做影视级火山爆发、钢铁冶金数字孪生或太空恒星渲染时，什么时候选 AI 视频生成大模型（Sora / Veo / Wan / Runway），什么时候选 81 波段 CIE 光谱积分，什么时候必须用代码驱动的 Wien-Planck 黑体引擎？

- **选 AI 视频生成大模型（Sora / Veo / Runway）**：
  - 仅适用于**纯视觉包装的打铁火花背景镜头、不需要与真实红外测温仪读数 $T\text{ (K)}$ 定量绑定的宣传片**。
- **选 380–780nm 81 波段普朗克光谱与 CIE 1931 $\bar{x}(\lambda),\bar{y}(\lambda),\bar{z}(\lambda)$ 数值积分**：
  - 适用于**离线色彩科学标定与标准光源色温表生成**。
- **必须选代码驱动的 Wien-Planck 闭式黑体位移引擎（本 Demo 方案）**：
  - 当业务需要 **60–120fps 实时根据物理温度场 $T(\mathbf{x}, t)$ 动态计算峰值波长 $\lambda_{\text{peak}} = b_{\text{Wien}}/T$ 与普朗克轨迹（Planckian Locus）色度坐标** 时，闭式算子在全 17 站恒锁 `1.0000×` 且延迟低于 `0.2 ms`。

### Q2：为什么维恩常数 $b_{\text{Wien}} = \frac{hc}{4.965114\,k_B}$ 中的无量纲根是 $4.965114$ 而不是 $5$？

- 对 $B_\lambda(T) \propto \lambda^{-5}(e^x - 1)^{-1}$（其中 $x = \frac{hc}{\lambda k_B T}$）求导令其为 $0$，得到超越方程：
  $$(5 - x)e^x = 5 \implies x = 5 + W_0(-5 e^{-5}) \approx 4.965114231744276$$
  其中 $W_0$ 是朗伯 W 函数（Lambert W Function）主分支！

---

## 三、🧭 直观可视化图解（Mermaid 选型决策树 + 管线对比 + 帧级时序图）

### 3.1 黑体热辐射与色温位移技术选型决策树

```mermaid
flowchart TD
    A["需要生成打铁锻造、火山岩浆、灯丝升温或恒星色温发光动画？"] --> B{"是否需要精确满足维恩-普朗克黑体位移定律 λ_peak = b_Wien/T 与实时交互？"}
    B -- "否：仅做非交互火花氛围视频" --> C["AI 视频生成大模型\n(Sora / Veo / Wan / Runway)"]
    B -- "是：冶金数字孪生 / 天体物理渲染 / 60fps PBR 自发光" --> D{"计算方式选择"}
    D -- "朴素固定色相乘以亮度 (λ = λ₀)" --> E["❌ 严重失真：高温下仍停留在死板橙色\n两倍色温处波长漂移 2.0000× (16/17 站违背)"]
    D -- "64 波段普朗克绝热腔模缩放求积" --> F["⚠️ 精度准确但 8,192 轮耗时 ~6.4 ms"]
    D -- "Wien-Planck 闭式位移算子" --> G["✅ 物理精确 + 极速实时\n17 站恒锁 1.0000×，8,192 轮仅 ~0.16 ms"]
```

### 3.2 朴素固定色相管线 vs Wien-Planck 黑体位移管线对比

```mermaid
flowchart LR
    subgraph Naive["❌ 朴素固定色相自发光管线 (λ = λ₀)"]
        N1["给定色温扩展 u = T/T₀ − 1"] --> N2["仅放大 RGB 标量亮度\n峰值波长死锁在 λ₀"]
        N2 --> N3["波长漂移比 = T/T₀ = 1 + u"]
        N3 --> N4["第 16 站 (T = 2 T₀)\n发生 2.0000× 八度倍频波长漂移!"]
    end

    subgraph Wien["✅ Wien-Planck 黑体位移管线 (λ_peak = b_Wien / T)"]
        P1["给定色温扩展 u = T/T₀ − 1"] --> P2["计算绝对温度比 T/T₀ = 1 + u"]
        P2 --> P3["计算维恩峰值波长 λ_peak = λ₀ / (1 + u)\n匹配 64 波段普朗克缩放求积"]
        P3 --> P4["全 17 站峰值波长比恒锁 1.0000×\n0/17 站漂移，误差 < 1e-12"]
    end
```

### 3.3 帧级渲染与几何审计时序图

```mermaid
sequenceDiagram
    participant User as 渲染架构师 / 冶金工程师
    participant UI as Workbench 控制器
    participant Solver as Wien-Planck 求解器 (model.ts)
    participant Quad as 64 波段普朗克求积器
    participant SVG as 58-Solid 等轴测渲染器

    User->>UI: 切换预设或拖动站点滑块 (Station 0..16, u = T/T₀ − 1 ∈ [0, 1])
    UI->>Solver: auditWienBlackbodyRig(presetId, stationIdx)
    Solver->>Quad: evaluateQuadraturePlanckWienScaling(u, 64)
    Quad-->>Solver: 返回 64 波段普朗克绝热腔模缩放求积比 (误差 < 1e-12)
    Solver-->>UI: 返回 17 站 T/T₀、维恩峰值波长比与 1.0000× / 2.0000× 漂移审计
    UI->>SVG: buildWienBlackbodyRigSolids() 渲染 58 个等轴测几何体
```

---

## 四、📊 视觉技术选型决策矩阵（Architecture Decision Matrix）

| 评估维度 | AI 视频生成大模型 (Sora / Veo / Wan) | 朴素固定色相发光 ($\lambda = \lambda_0$) | 64 波段普朗克缩放求积 | **Wien-Planck 闭式黑体引擎（本 Demo）** |
| :--- | :--- | :--- | :--- | :--- |
| **物理定律遵循度** | ❌ 无黑体光谱守恒 | ❌ 忽略 $b_{\text{Wien}}/T$ 峰值位移 | ✅ 数值积分绝热腔模缩放 | **✅ 严格解析守恒 $\lambda_{\text{peak}} = b_{\text{Wien}}/T$** |
| **第 4 站 ($u=0.25, T=1.25T_0$) 波长比** | N/A | ❌ `1.2500×`（漂移 25%） | ✅ `1.0000×` | **✅ `1.0000×`（零漂移）** |
| **第 8 站 ($u=0.50, T=1.50T_0$) 波长比** | N/A | ❌ `1.5000×`（漂移 50%） | ✅ `1.0000×` | **✅ `1.0000×`（零漂移）** |
| **第 16 站 ($u=1.00, T=2.00T_0$) 波长比** | N/A | ❌ `2.0000×`（八度倍频漂移） | ✅ `1.0000×` | **✅ `1.0000×`（零漂移）** |
| **17 站波长漂移违背站数** | N/A | ❌ `16 / 17` 站违背 | ✅ `0 / 17` 站违背 | **✅ `0 / 17` 站违背** |
| **8,192 轮 17 站 CPU 耗时** | 数十秒云端推理 | ~0.16 ms（结果错误） | ~6.4 ms | **⚡ ~0.16 ms（快约 40×）** |

---

## 五、🧪 全新 Demo 与 7-Card 4:5 视觉报告（Workbench & Visual Evidence）

- **交互式 Demo 路径**：`demos/wien-blackbody-displacement-rig/`
- **英文 7-Card 报告**：`demos/wien-blackbody-displacement-rig/test-report-cards.html`
- **中文 7-Card 报告**：`demos/wien-blackbody-displacement-rig/test-report-cards.zh.html`
- **密封基准数据**：`demos/wien-blackbody-displacement-rig/report.json`

| 视觉证据类别 | 截图路径 | 关键验证结论 |
| :--- | :--- | :--- |
| **暗色主题 · Wien-Planck 位移锁定** | `docs/evidence/wien-blackbody-displacement-rig/dark-wien_planck_blackbody_displacement_lock.png` | 58 个等轴测实体完整渲染，`0 / 17` 漂移站，峰值波长比恒锁 `1.0000×` |
| **暗色主题 · 朴素固定色相漂移暴露** | `docs/evidence/wien-blackbody-displacement-rig/dark-naive_fixed_hue_emissive_multiplier_drift.png` | 红色报警柱揭示第 4/8/16 站 `1.2500× / 1.5000× / 2.0000×` 波长漂移（`16 / 17` 违背） |
| **亮色主题 · Wien-Planck 位移锁定** | `docs/evidence/wien-blackbody-displacement-rig/light-wien_planck_blackbody_displacement_lock.png` | 亮色高对比度热辐射计量视图验证 |
| **亮色主题 · 朴素固定色相漂移暴露** | `docs/evidence/wien-blackbody-displacement-rig/light-naive_fixed_hue_emissive_multiplier_drift.png` | 亮色模式下 16 个漂移站点高亮告警 |
| **移动端 `390×844` 自适应视图** | `docs/evidence/wien-blackbody-displacement-rig/mobile.png` | `mobile_overflow = false`，零横向滚动条溢出 |

---

## 六、🛠️ 高质量视觉交付快速核验清单（Delivery Checklist）

- [x] **维恩反比温度位移核验**：高温自发光（Blackbody Emission）着色器是否按 $\lambda_{\text{peak}}(T) = \frac{2897.77\;\mu\text{m}\cdot\text{K}}{T}$ 随温度升高向短波移动色温，而非仅将固定橙色乘以标量亮度？
- [x] **两倍色温半波长检查**：当绝对温度翻倍（$T = 2.00\,T_0, u = 1.000$）时，黑体辐射峰值波长是否精确减半至 $0.5000\,\lambda_0$？
- [x] **64 波段普朗克缩放求积核验**：闭式维恩位移公式与 64 波段 Simpson 缩放求积的最大偏差是否严格小于 $10^{-12}$？
- [x] **58 构件等轴测几何与移动端零溢出**：Playwright 实测 `.iso-solid` 数量是否为 `58`，且 `390×844` 视口下无横向溢出？
