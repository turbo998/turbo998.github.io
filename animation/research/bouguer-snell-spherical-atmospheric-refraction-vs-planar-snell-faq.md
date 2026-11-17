# 行星日落红日压扁与大气边缘光线步进不再因平地球斯涅尔公式而发生 2 倍角动量漂移：Bouguer-Snell 布格-斯涅尔球面折射定律 vs 朴素平面折射选型与原理解析 FAQ

> **Language**: **中文 (Chinese)** | [English](bouguer-snell-spherical-atmospheric-refraction-vs-planar-snell-faq.en.md)

![Bouguer-Snell 布格-斯涅尔球面大气折射检验台可视化摘要](evidence/bouguer-snell-spherical-refraction-rig-summary.svg)

---

## 1. 📌 核心结论速览（Executive Summary）

> **一句话架构结论**：在开发 3D 行星大气边缘日落/日出折射（扁太阳与绿闪）、轨道大气掩星散射、海市蜃楼（Mirage）以及球形梯度折射率透镜（GRIN Sphere / 光子球）的 Raymarching 着色器时，**切勿把同心球壳大气当成平面平行板而直接套用平面斯涅尔公式 `n(z) sinθ = const`**。现代光度学与大气折射之父皮埃尔·布格（Pierre Bouguer, 1729）从球极坐标费马光程泛函的诺特旋转对称性严格证明：在任何以球心对称分布的折射率场 `n(r)` 中，光线沿途守恒的物理量是带有球心径向力臂 `r` 的**光学角动量（布格撞击参数 Bouguer Impact Parameter）：`p_Bouguer = n(r) · r · sinθ(r) = n₀ · r₀ · sinθ₀ = const`**！因此，当光线穿过同心球壳向外传播时，局部天顶角正弦必须按 **`sinθ_B(r) = (n₀ r₀ / (n(r) r)) sinθ₀`** 同步收缩。在跨越同心球壳光学力臂参数 `u = (n r)/(n₀ r₀) − 1 ∈ [0.000, 1.000]`（光学力臂从 `1.000 n₀r₀` 扩展至 `2.000 n₀r₀`）的 17 个检验站点上，朴素平面平行板斯涅尔模型因漏掉径向力臂比 `r / r₀`，使光学撞击参数比 `p / p_Bouguer = 1 + u` 在第 4 站（`u = 0.250`）漂移至 **`1.2500×`**、第 8 站（`u = 0.500`）漂移至 **`1.5000×`**、第 16 站（`u = 1.000`）直接翻倍漂移至 **`2.0000×`**（污染 `16/17` 个站点，并在地平线掠射角 `θ₀ = 90°` 处引发切线死锁与虚假全反射）！采用 **Bouguer-Snell `n(r) r sinθ = const` 球面折射定律**，即可在全部 17 个球壳站点将光学角动量比恒定锁死在 **`1.0000×`**（`0/17` 站漂移），且闭式求值比 64 层同心球壳程函光线弯曲数值求积快 **`38.82×`**（8192 次 17 站仅需 `0.162 ms` vs `6.289 ms`，积分误差 `< 1e-12`）。

| 评估维度 | Bouguer-Snell 球面折射定律（推荐） | 朴素平面平行板斯涅尔 `n sinθ = const`（反模式） | 64 层同心球壳程函求积（基准参考） |
| :--- | :--- | :--- | :--- |
| **光线全局守恒不变量** | **`p_B = n(r) · r · sinθ(r) = const`** | `n(z) · sinθ = const`（忽略行星球面曲率 `r`） | 64 层程函方程微分扭矩积分 |
| **局部天顶角正弦定律** | **`sinθ_B = sinθ₀ / (1 + u)`** | `sinθ = (n₀/n) sinθ₀`（地平线掠射直接卡死） | `sinθ = sinθ₀ / (1 + u)` |
| **第 4 站（`u=0.25, nr=1.25n₀r₀`）比值** | **`1.0000×`（`sinθ_B = 0.8000 sinθ₀`）** | `1.2500×`（光学角动量漂移 `+25.00%`） | `1.0000×` |
| **第 8 站（`u=0.50, nr=1.50n₀r₀`）比值** | **`1.0000×`（`sinθ_B = 0.6667 sinθ₀`）** | `1.5000×`（光学角动量漂移 `+50.00%`） | `1.0000×` |
| **第 16 站（`u=1.00, nr=2.00n₀r₀`）比值** | **`1.0000×`（`sinθ_B = 0.5000 sinθ₀`）** | **`2.0000×`（光学角动量翻倍漂移）** | `1.0000×` |
| **17 站角动量漂移违背站数** | **`0 / 17`（100% 满足费马-诺特旋转对称）** | **`16 / 17`（94.1% 站点不变量漂移）** | `0 / 17` |
| **8,192 次 17 站 CPU 耗时** | **`0.162 ms`（38.82× 加速）** | `0.150 ms`（但地平线日落光线严重失真） | `6.289 ms`（每站 64 层球壳求积） |

---

## 2. 🎯 客户与架构师灵魂拷问 Q&A（痛点直击与第一性原理）

### Q0：追踪每日业界最新视频与动画制作能力突破——为什么在平地球近似下，地平线（`θ₀ = 90°`）射出的太阳光线永远穿不出大气层？
假设观察者站在海平面（`r = r₀, n₀ ≈ 1.00029`）水平看向日落地平线（天顶角 `θ₀ = 90°, sinθ₀ = 1.0`）。如果着色器按平面平行板斯涅尔定律计算高空（`n(r) = 1.00000 < n₀`）的折射角：`sinθ(r) = (n₀ / n(r)) · sin(90°) = 1.00029 > 1.0`，反三角函数 `asin(1.00029)` 直接触发 `NaN`（全内反射）！也就是说，在平地球模型里，水平视线永远逃不出大气层、也永远看不到地平线外的太阳！而在真实的球形地球上，因为球面外层半径 `r > r₀` 增长得比折射率 `n(r)` 下降得快得多，由布格定律 `sinθ(r) = (n₀ r₀) / (n(r) r) < 1.0`，水平视线在向外穿出同心大气球壳时，与局部铅垂线的夹角自动变小，顺畅无阻地连向太空中的太阳，并将太阳虚像抬升 `34` 角分（约整个太阳视直径），同时把太阳下缘抬升得比上缘更多，形成壮丽的**日落扁太阳**！

### Q1：Pierre Bouguer（1729）是如何从费马原理推导出 `n(r) r sinθ = const` 的？
1. **球面分层连续折射证明**：考虑两个相邻同心球面（半径 `r₁` 与 `r₂`）。光线在 `r₁` 处出射角为 `θ₁`，打到外层 `r₂` 球面上的入射角为 `α`。在由球心 `O`、交点 `A(r₁)` 与交点 `B(r₂)` 构成的三角形 `△OAB` 中，由正弦定理立得几何恒等式：
   $$r_1 \sin\theta_1 = r_2 \sin\alpha$$
2. **结合界面斯涅尔折射定律**：在 `r₂` 球面处应用局部斯涅尔定律 `n₁ sinα = n₂ sinθ₂`，将 `sinα = (r₁ / r₂) sinθ₁` 代入，立即消去中间角 `α`：
   $$n_1 r_1 \sin\theta_1 = n_2 r_2 \sin\theta_2 \implies p_{\text{Bouguer}} = n(r)\,r\,\sin\theta(r) = \text{const}$$
3. **程函方程与诺特光学角动量**：在连续梯度折射率场 `∇n` 中，光线位置向量 `r_vec` 与光学动量向量 `n t_vec` 的叉乘对弧长 `s` 求导：
   $$\frac{d}{ds}(\mathbf{r} \times n\mathbf{t}) = \mathbf{t} \times n\mathbf{t} + \mathbf{r} \times \nabla n = \mathbf{0}$$
   因为 `∇n` 平行于径向向量 `r_vec`，叉乘恒为零！这证明了 `‖r × n t‖ = n(r) r sinθ` 是严格守恒的光学角动量。

### Q2：何时选 AI 视频大模型 vs 代码驱动的 Bouguer-Snell 球面折射着色器？
- **何时选 AI 视频大模型**：适合生成固定机位的海边晚霞写意延时摄影短片。
- **何时选代码驱动 Bouguer-Snell 着色器**：在全尺度行星大气引擎（地面到太空一镜到底）、太空望远镜掩星模拟、球形力场护盾与黑洞引力透镜 Raymarching 中，必须采用确定性 `n(r) r sinθ = const` 布格定律。

---

## 3. 🧭 直观可视化图解（Mermaid 选型决策树 + 管线对比 + 帧级时序图）

### 3.1 大气与梯度折射率（GRIN）光线追踪选型决策树

```mermaid
flowchart TD
    A[3D 大气折射 / 海市蜃楼 / 力场球透镜需求] --> B{介质等折射率面几何形态?}
    B -->|同心球壳行星大气 / 球对称透镜 n = n r| C[选用 Bouguer-Snell 球面定律 n r sin theta = const]
    B -->|局部小范围水平路面热空气层 r >> L| D[可用局部平面斯涅尔近似 n z sin theta = const]
    C --> E[掠射地平线 theta0 = 90 deg 随 r 增大自动脱离全反射]
    C --> F[精确复现 34 角分蒙气差抬升与日落扁太阳 锁死 1.0000x]
```

### 3.2 朴素平地球斯涅尔 vs Bouguer-Snell 球面折射管线对比

```mermaid
flowchart LR
    subgraph NaivePlanarSnell[反模式: 朴素平地球斯涅尔 n sin theta = const]
        N1[光线穿过 2 倍光学球壳 nr = 2 n0 r0] --> N2[漏掉径向力臂比 r / r0]
        N2 --> N3[光学角动量漂移 2.0000x]
        N3 --> N4[地平线掠射触发 sin theta > 1 假全反射死锁!]
    end

    subgraph BouguerSnellLaw[正道: Bouguer-Snell 球面折射定律]
        B1[光线穿过 2 倍光学球壳 nr = 2 n0 r0] --> B2[守恒光学角动量 p = n r sin theta]
        B2 --> B3[天顶角正弦精确收缩至 0.5000 sin theta0]
        B3 --> B4[不变量比恒锁 1.0000x 完美穿透大气并渲染扁红日!]
    end
```

### 3.3 帧级行星大气边缘（Limb）球面折射求值时序图

```mermaid
sequenceDiagram
    participant Cam as 行星相机射线 (r0, theta0)
    participant Bouguer as Bouguer-Snell 求值器
    participant Sky as 大气散射与太阳盘面着色器
    Cam->>Bouguer: 计算初始守恒撞击参数 p0 = n(r0) * r0 * sin(theta0)
    Bouguer->>Bouguer: 在高度层 r 处直接解出 sin_theta = p0 / (n(r) * r)
    Bouguer->>Sky: 积分球面折射偏折角并校正太阳上下缘视高度
    Sky-->>Cam: 渲染 1.0000x 物理自洽的地平线扁太阳与曙暮光弧
```

---

## 4. 📊 视觉技术选型决策矩阵（Decision Matrix）

| 大气与光学折射场景 | 推荐折射守恒律 | 两倍球壳力臂（`nr = 2 n₀r₀, u = 1.00`）表现 | 视觉与天文学精度 |
| :--- | :--- | :--- | :--- |
| **行星地平线日出/日落（扁太阳与大气抬升）** | **Bouguer-Snell `n(r) r sinθ = p₀`** | **`sinθ = 0.5000 sinθ₀`（`1.0000×` 守恒）** | 消除地平线 `NaN` 死锁，真实压扁日盘 |
| **近地轨道空间站观察大气边缘掩星（Limb）** | **Bouguer 撞击参数积分** | **精确计算切向穿透大气路径质量** | 还原空间站日落时分层的蓝金大气光弧 |
| **球对称麦克斯韦鱼眼 / 龙伯透镜（GRIN）** | **三维叉乘守恒 `r × n t = const`** | **闭式求值比 64 层球壳求积快 `38.82×`** | 光线在球内沿解析圆弧平滑弯曲 |
| **朴素平面斯涅尔公式（`n sinθ = const`）** | 仅适合仰角 `> 15°` 的平直薄层 | 光学角动量漂移 **`2.0000×`** | 地平线附近完全失效并产生假全反射黑带 |

---

## 5. 🧪 全新 Demo 与 7-Card 4:5 视觉报告（Bouguer-Snell Spherical Refraction Rig）

本轮新增第 **212** 个独立交互式 3D 计量台 **`demos/bouguer-snell-spherical-refraction-rig/`**（58 个等轴测几何实体、17 个同心球壳站点 `u ∈ [0.000, 1.000]`）：

- **交互式 Demo 入口**：`demos/bouguer-snell-spherical-refraction-rig/index.html`
- **密封基准数据**：`demos/bouguer-snell-spherical-refraction-rig/report.json`
- **7-Card 4:5 视觉报告（英文 / 中文）**：
  - `demos/bouguer-snell-spherical-refraction-rig/test-report-cards.html`
  - `demos/bouguer-snell-spherical-refraction-rig/test-report-cards.zh.html`
- **Playwright 实测多主题证据截图**：
  - `docs/evidence/bouguer-snell-spherical-refraction-rig/dark-bouguer_snell_spherical_invariant_lock.png`
  - `docs/evidence/bouguer-snell-spherical-refraction-rig/dark-naive_planar_slab_snell_horizon_drift.png`
  - `docs/evidence/bouguer-snell-spherical-refraction-rig/light-bouguer_snell_spherical_invariant_lock.png`
  - `docs/evidence/bouguer-snell-spherical-refraction-rig/light-naive_planar_slab_snell_horizon_drift.png`
  - `docs/evidence/bouguer-snell-spherical-refraction-rig/mobile.png`

```ts
// 闭式 Bouguer-Snell 球面大气折射定律：根据守恒撞击参数 p0 求解任意球壳高度 r 处的射线天顶角
export function evaluateBouguerSphericalZenith(
  observerN0: number,
  observerRadiusR0: number,
  observerSinTheta0: number,
  shellRefractiveIndexN: number,
  shellRadiusR: number
) {
  const bouguerImpactP = observerN0 * observerRadiusR0 * observerSinTheta0;
  const sinTheta = Math.min(1, bouguerImpactP / (shellRefractiveIndexN * shellRadiusR));
  const cosTheta = Math.sqrt(Math.max(0, 1 - sinTheta * sinTheta));
  return { bouguerImpactP, sinTheta, cosTheta };
}
```

---

## 6. 🛠️ 高质量视觉交付快速核验清单（Delivery Checklist）

- [x] **零地平线假全反射与角动量漂移**：确认球面大气光线遵循 `n(r) r sinθ = const`，在全部 17 个同心球壳站点锁死 `p / p_Bouguer = 1.0000×`（消除朴素平面斯涅尔在 `2 n₀r₀` 处的 `2.0000×` 漂移）。
- [x] **同心球壳程函方程求积自洽**：闭式布格正弦因子与 64 层同心球壳程函积分误差 `< 1e-12`，CPU 提速 `38.82×`。
- [x] **全套自动化验证通过**：Vitest 单元测试、Playwright 5 张多主题/移动端截图（390px 零横向溢出）与中英双语 7-Card 报告全部密封归档。
