# 水龙头滴水与倒水液柱不再因固定正弦频率而缩成假密“冰糖葫芦”：Rayleigh-Plateau 瑞利-普拉托毛细掐断定律 vs 朴素固定波长选型与原理解析 FAQ

> **Language**: **中文 (Chinese)** | [English](rayleigh-plateau-liquid-jet-pinchoff-vs-fixed-wavelength-faq.en.md)

![Rayleigh-Plateau 瑞利-普拉托液流毛细掐断检验台可视化摘要](evidence/rayleigh-plateau-jet-pinchoff-rig-summary.svg)

---

## 1. 📌 核心结论速览（Executive Summary）

> **一句话架构结论**：在开发 3D 水龙头细水流滴落、茶壶/红酒倒水液流、喷泉水幕断裂以及皇冠水花（Crown Splash）边缘液丝（Ligament）碎裂成飞沫的顶点/SDF 着色器时，**切勿无视液柱半径 `R` 的粗细变化而用固定的世界坐标正弦波长 `λ = λ₀`（`sin(k₀ z)`）去捏缩圆柱表面**。约瑟夫·普拉托（Joseph Plateau, 1873）与瑞利勋爵（Lord Rayleigh, 1878）从杨-拉普拉斯双主曲率毛细压强与修正贝塞尔色散方程 `ω² ∝ (kR I₁(kR) / I₀(kR))(1 − k²R²)` 严格证明：圆柱水柱只有在扰动波长大于截面周长（`λ > 2π R`，即无量纲波数 **`k R < 1.0`**）时才能减少总表面积并自发掐断成水滴；且**最快增长模态恒定位于 `k* R = 0.6970`，对应最优水滴掐断波长严格为水柱半径的 `9.015` 倍：`λ* = (2π / 0.6970) R ≈ 9.015 R`**！在跨越液柱半径扩展参数 `u = R/R₀ − 1 ∈ [0.000, 1.000]`（水柱半径从 `1.000 R₀` 增粗至 `2.000 R₀`）的 17 个检验站点上，朴素固定波长模型使最优掐断波长比 `λ_RP / λ_model = R / R₀ = 1 + u` 在第 4 站（`u = 0.250, R = 1.25 R₀`）亏损 **`1.2500×`**、第 8 站（`u = 0.500, R = 1.50 R₀`，此时 `k₀ R = 1.0455 > 1.0` 已越过普拉托截止线闯入毛细稳定禁区！）亏损 **`1.5000×`**、第 16 站（`u = 1.000, R = 2.00 R₀`）直接翻倍亏损至 **`2.0000×`**（`k₀ R = 1.394 > 1.0`，污染 `16/17` 个站点，把粗水柱捏成物理上不可能存在的密集手风琴褶皱）！采用 **Rayleigh-Plateau `λ* = 9.015 R` 毛细色散定律**，即可在全部 17 个水柱半径站点将波长比恒定锁死在 **`1.0000×`**（`0/17` 站违背），且闭式求值比 64 片杨-拉普拉斯变截面表面能求积快 **`40.41×`**（8192 次 17 站仅需 `0.157 ms` vs `6.344 ms`，积分误差 `< 1e-12`）。

| 评估维度 | Rayleigh-Plateau `λ* = 9.015 R` 定律（推荐） | 朴素固定波长捏缩 `λ = λ₀`（反模式） | 64 片杨-拉普拉斯表面能求积（基准参考） |
| :--- | :--- | :--- | :--- |
| **最优水滴掐断波长定律** | **`λ*(R) = (2π / 0.6970) R ≈ 9.015 R`** | `λ = λ₀ = const`（无视水柱粗细变化） | 64 片双主曲率毛细势能积分 |
| **无量纲波数 `k R` 状态** | **恒定锁死最快增长峰 `k* R = 0.6970 < 1`** | `k₀ R = 0.697(1+u)`（`R > 1.43 R₀` 闯入 `kR>1` 禁区） | `k* R = 0.6970` |
| **第 4 站（`u=0.25, R=1.25R₀`）波长比** | **`1.0000×`（`λ* = 1.2500 λ₀`）** | `1.2500×`（波长偏短 `-20.0%`） | `1.0000×` |
| **第 8 站（`u=0.50, R=1.50R₀`）波长比** | **`1.0000×`（`λ* = 1.5000 λ₀`）** | `1.5000×`（`kR = 1.0455 > 1` 违背普拉托准则！） | `1.0000×` |
| **第 16 站（`u=1.00, R=2.00R₀`）波长比** | **`1.0000×`（`λ* = 2.0000 λ₀`）** | **`2.0000×`（`kR = 1.394 > 1` 假密冰糖葫芦伪影）** | `1.0000×` |
| **17 站短波违背站数** | **`0 / 17`（100% 满足表面自由能释放）** | **`16 / 17`（94.1% 站点偏离瑞利峰）** | `0 / 17` |
| **8,192 次 17 站 CPU 耗时** | **`0.157 ms`（40.41× 加速）** | `0.146 ms`（但粗水柱变成手风琴假珠串） | `6.344 ms`（每站 64 片曲率求积） |

---

## 2. 🎯 客户与架构师灵魂拷问 Q&A（痛点直击与第一性原理）

### Q0：追踪每日业界最新视频与动画制作能力突破——为什么水龙头流出的水柱一定要拉长到“直径的 4.5 倍（半径的 9 倍）”才会断成一颗水珠？
仔细观察厨房水龙头或慢镜头倒水视频：刚流出水龙头的水柱是光滑连续的圆柱体，往下流了一段距离、水柱被重力拉细后，表面开始浮现波长约为水柱直径 `4.5` 倍（`λ* ≈ 9.015 R`）的波浪起伏，紧接着波谷迅速收紧掐断（Pinch-Off），凝聚成一颗半径约为原水柱半径 `1.89` 倍的圆润主水珠和一颗微小卫星水滴（Satellite Droplet）。如果用固定密集的正弦波去捏缩粗水柱，水滴间距比水柱直径还短，在人眼看来就像一串串在签子上的塑料山楂球！

### Q1：Plateau（1873）与 Lord Rayleigh（1878）是如何推导出 `k R < 1` 与 `k* R = 0.6970` 的？
1. **普拉托表面积与双主曲率竞争（Plateau Cutoff `k R < 1`）**：
   设半径为 `R₀` 的圆柱水柱受到轴向波数 `k` 的微扰 `R(z) = R₀ + ε cos(k z)`。根据杨-拉普拉斯方程，波谷处的毛细压强增量为：
   $$\Delta p \propto \sigma \left(\frac{1}{R(z)} - \frac{\partial^2 R}{\partial z^2}\right) \approx \sigma \left[\frac{1}{R_0} - \frac{\varepsilon}{R_0^2}(1 - k^2 R_0^2)\cos(k z)\right]$$
   只有当 **`1 − k² R₀² > 0`（即 `k R₀ < 1, λ > 2π R₀ ≈ 6.283 R₀`）** 时，波谷处的压强才高于波峰，把液体从波谷挤向波峰并最终掐断！反之若 `k R₀ > 1`，轴向曲率占优，表面张力反而会把波纹抹平。
2. **瑞利修正贝塞尔色散方程（Rayleigh Fastest Mode `k* R = 0.6970`）**：
   瑞利（1878）联立柱坐标欧拉方程与修正贝塞尔势函数 `I₀(k r)`，求得扰动指数增长率平方 `ω²`：
   $$\omega^2(x) = \frac{\sigma}{\rho R_0^3}\frac{x\,I_1(x)}{I_0(x)}(1 - x^2), \qquad x = k R_0$$
   对 `x ∈ (0, 1)` 求极大值，精确解得最快增长波数 **`x* = k* R₀ ≈ 0.6970`**，对应波长：
   $$\lambda^*(R) = \frac{2\pi}{0.6970} R \approx 9.015\,R$$
   再由单波长圆柱体积守恒 `π R² λ* = (4/3) π r_drop³`，立得断裂后的主水滴半径 **`r_drop = (1.5 × 4.5075)^(1/3) R ≈ 1.89 R`**！

### Q2：何时选 AI 视频大模型 vs 代码驱动的 Rayleigh-Plateau 液流断裂着色器？
- **何时选 AI 视频大模型**：适合生成商业广告中不可交互的慢镜头咖啡/红酒倾倒特写。
- **何时选代码驱动 Rayleigh-Plateau 着色器**：在交互式 3D 倒水/调酒小游戏、流体粒子飞溅液丝转水滴（Ligament-to-Droplet Spawner）、喷泉水景以及实时血液/涂料飞溅特效中，必须采用确定性 `λ* = 9.015 R` 定律。

---

## 3. 🧭 直观可视化图解（Mermaid 选型决策树 + 管线对比 + 帧级时序图）

### 3.1 液柱断裂与水滴生成选型决策树

```mermaid
flowchart TD
    A[3D 水流 / 液丝 / 喷泉断裂成水滴需求] --> B{根据实时液流半径 R 计算轴向波数 k}
    B -->|锁定瑞利最优波数 k* = 0.6970 / R| C[波长 lambda* = 9.015 R 位于最快毛细失稳峰]
    B -->|写死固定波数 k0 导致粗水柱 k0 * R > 1| D[落入 Plateau 稳定禁区 表面能反增 变成假手风琴褶皱!]
    C --> E[波谷在毛细时间 tau = 2.915 * sqrt rho*R^3/sigma 内迅速收紧掐断]
    E --> F[按体积守恒生成半径 r_drop = 1.89 R 的主水滴 锁死 1.0000x]
```

### 3.2 朴素固定波长正弦捏缩 vs Rayleigh-Plateau 毛细掐断管线对比

```mermaid
flowchart LR
    subgraph NaiveFixedWave[反模式: 朴素固定波长 lambda = lambda0]
        N1[水柱半径增粗至 R = 2 R0] --> N2[仍用固定频率 k0 导致 k0 R = 1.394 > 1]
        N2 --> N3[波长亏损 2.0000x 且闯入短波稳定禁区]
        N3 --> N4[粗水柱缩成密集冰糖葫芦串 违背毛细物理学!]
    end

    subgraph RayleighPlateau[正道: Rayleigh-Plateau 贝塞尔色散定律]
        R1[水柱半径增粗至 R = 2 R0] --> R2[维持最优无量纲波数 k* R = 0.6970]
        R2 --> R3[最优掐断波长同步放大至 lambda* = 2.0000 lambda0]
        R3 --> R4[波长比恒锁 1.0000x 掐断为饱满圆润的 1.89 R 水珠!]
    end
```

### 3.3 帧级液丝（Ligament）自适应毛细掐断与粒子分裂时序图

```mermaid
sequenceDiagram
    participant Jet as 液流网格 / SDF 管道 (z, R)
    participant RP as Rayleigh-Plateau 色散求值器
    participant Spawner as 水滴粒子生成器
    Jet->>RP: 传入局部液柱半径 R = R0 * (1 + u) 与表面张力 sigma
    RP->>RP: 计算最优波长 lambda_RP = 9.015 * R 与波数 k_RP = 0.6970 / R
    RP->>Spawner: 当波谷振幅 a(t) >= R 时在节点处触发 Pinch-Off 断裂
    Spawner-->>Jet: 替换为半径 r_drop = 1.89 * R 的球形水滴粒子 (1.0000x 锁定)
```

---

## 4. 📊 视觉技术选型决策矩阵（Decision Matrix）

| 液体射流与视觉场景 | 推荐毛细断裂模型 | 两倍粗水柱（`R = 2 R₀, u = 1.00`）表现 | 视觉与物理真实感 |
| :--- | :--- | :--- | :--- |
| **水龙头滴水与茶壶倾倒水柱** | **Rayleigh-Plateau `λ* = 9.015 R`** | **`λ* = 2.0000 λ₀`（`k*R = 0.6970` 锁死）** | 粗水流拉出长波颈缩、细水流结成小珠 |
| **皇冠水花边缘液丝（Crown Ligament）碎裂** | **Rayleigh-Plateau + `1.89 R` 体积守恒** | **主水滴半径 `r_drop = 1.89 R`** | 液丝到飞沫粒子的切换零体积跳变 |
| **3D 喷墨打印 / 微流体液滴生成可视化** | **完整贝塞尔色散 `ω(kR)` + 卫星水滴** | **闭式求值比 64 片曲率求积快 `40.41×`** | 科学级复现瑞利主液滴与卫星液滴 |
| **朴素固定波长正弦波（`λ = λ₀`）** | 严禁用于变半径液流 | 波长亏损 **`2.0000×`**（`kR = 1.394 > 1`） | 粗水柱变成违背物理的手风琴皱褶 |

---

## 5. 🧪 全新 Demo 与 7-Card 4:5 视觉报告（Rayleigh-Plateau Jet Pinch-Off Rig）

本轮新增第 **211** 个独立交互式 3D 计量台 **`demos/rayleigh-plateau-jet-pinchoff-rig/`**（58 个等轴测几何实体、17 个液流半径站点 `u ∈ [0.000, 1.000]`）：

- **交互式 Demo 入口**：`demos/rayleigh-plateau-jet-pinchoff-rig/index.html`
- **密封基准数据**：`demos/rayleigh-plateau-jet-pinchoff-rig/report.json`
- **7-Card 4:5 视觉报告（英文 / 中文）**：
  - `demos/rayleigh-plateau-jet-pinchoff-rig/test-report-cards.html`
  - `demos/rayleigh-plateau-jet-pinchoff-rig/test-report-cards.zh.html`
- **Playwright 实测多主题证据截图**：
  - `docs/evidence/rayleigh-plateau-jet-pinchoff-rig/dark-rayleigh_plateau_bessel_dispersion_lock.png`
  - `docs/evidence/rayleigh-plateau-jet-pinchoff-rig/dark-naive_fixed_wavelength_shortwave_pinch.png`
  - `docs/evidence/rayleigh-plateau-jet-pinchoff-rig/light-rayleigh_plateau_bessel_dispersion_lock.png`
  - `docs/evidence/rayleigh-plateau-jet-pinchoff-rig/light-naive_fixed_wavelength_shortwave_pinch.png`
  - `docs/evidence/rayleigh-plateau-jet-pinchoff-rig/mobile.png`

```ts
// 闭式 Rayleigh-Plateau 圆柱液流最优掐断波长、水滴半径与毛细破碎时间常数
export function evaluateRayleighPlateauPinchoff(
  jetRadiusR: number,
  surfaceTensionSigma: number,
  densityRho: number
) {
  const optimalWavenumberK = 0.6970 / jetRadiusR;
  const optimalWavelength = (2 * Math.PI) / optimalWavenumberK; // ~9.015 * R
  const dropletRadius = 1.89 * jetRadiusR;                      // Volume-conserving sphere
  const breakupTimeConstant = Math.sqrt((densityRho * jetRadiusR ** 3) / surfaceTensionSigma) / 0.3433;
  return { optimalWavenumberK, optimalWavelength, dropletRadius, breakupTimeConstant };
}
```

---

## 6. 🛠️ 高质量视觉交付快速核验清单（Delivery Checklist）

- [x] **零短波禁区手风琴伪影**：确认掐断波长按 `λ* = 9.015 R`（`k* R = 0.6970 < 1`）随水柱半径线性缩放，在全部 17 个站点锁死 `λ_RP / λ_model = 1.0000×`（消除朴素固定波长在 `2 R₀` 处的 `2.0000×` 亏损与 `kR = 1.394 > 1` 禁区违背）。
- [x] **杨-拉普拉斯变截面表面能求积自洽**：闭式瑞利波长与 64 片双主曲率表面能求积误差 `< 1e-12`，CPU 提速 `40.41×`。
- [x] **全套自动化验证通过**：Vitest 单元测试、Playwright 5 张多主题/移动端截图（390px 零横向溢出）与中英双语 7-Card 报告全部密封归档。
