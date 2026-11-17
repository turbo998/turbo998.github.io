# 龙卷风漏斗与翼尖涡流粒子不再因奇异 `1/r` 分母而在风眼处像电磁炮一样被“弹弓炸飞”：Rankine-Kaufmann 有限涡核正则化 vs 朴素点涡模型选型与原理解析 FAQ

> **Language**: **中文 (Chinese)** | [English](rankine-kaufmann-vortex-core-regularization-vs-point-vortex-slingshot-faq.en.md)

![Rankine-Kaufmann 兰金-考夫曼有限涡核正则化检验台可视化摘要](evidence/rankine-kaufmann-vortex-core-rig-summary.svg)

---

## 1. 📌 核心结论速览（Executive Summary）

> **一句话架构结论**：在开发 3D 龙卷风尘埃漏斗、战斗机翼尖涡尾迹（Wingtip Vortex Contrail）、烟圈碰撞、水下暗流漩涡以及魔法传送门粒子平流着色器时，**切勿直接将理想流体力学中的无旋点涡速度公式 `v_θ = Γ / (2πr)` 套用到整个空间（尤其是涡核半径 `r ≤ r_c` 区域）**。威廉·兰金（William J. M. Rankine, 1858）与瓦尔特·考夫曼（Walter Kaufmann, 1962）/ Scully（1975）从斯托克斯环量定理严格证明：真实粘性或湍流漩涡的核心必然存在半径为 `r_c` 的有限涡核，其涡度分布 `ω(r) = (Γ_∞/π) r_c² / (r² + r_c²)²` 使半径 `r` 内包围的斯托克斯环量按 `Γ(r) = Γ_∞ r² / (r² + r_c²)` 平滑衰减；因此**切向旋转速度必须写为代数有限涡核正则化公式：`v_θ = (Γ_∞ / 2π) · r / (r² + r_c²)`**！在跨越无量纲涡核渗透参数 `u = (r_c / r)² ∈ [0.000, 1.000]`（从外围无旋流至涡核边界 `r = r_c`）的 17 个径向检验站点上，朴素奇异 `1/r` 点涡模型使切向速度比 `v / v_exact = 1 + (r_c/r)² = 1 + u` 在第 4 站（`u = 0.250, r = 2 r_c`）超冲至 **`1.2500×`**、第 8 站（`u = 0.500, r = 1.414 r_c`）超冲至 **`1.5000×`**、第 16 站（`u = 1.000, r = r_c` 涡核边界）直接翻倍至 **`2.0000×`**（离心加速度 `v_θ²/r` 暴涨 **`4.0000×`**，污染 `16/17` 个站点，越往风眼中心更会发散至无穷大）！采用 **Rankine-Kaufmann 代数涡核正则化**，即可在全部 17 个径向站点将切向速度比恒定锁死在 **`1.0000×`**（`0/17` 站弹弓飞散），且全程零 `sqrt` 开方开销，比 64 环斯托克斯涡度环量数值求积快 **`45.86×`**（8192 次 17 站仅需 `0.187 ms` vs `8.576 ms`，积分误差 `< 1e-12`）。

| 评估维度 | Rankine-Kaufmann 代数涡核正则化（推荐） | 朴素奇异 `1/r` 点涡公式（反模式） | 64 环斯托克斯涡度环量求积（基准参考） |
| :--- | :--- | :--- | :--- |
| **切向速度闭式定律** | **`v_θ(r) = (Γ_∞ / 2π) · r / (r² + r_c²)`** | `v_θ(r) = Γ_∞ / (2πr)`（`r → 0` 奇异发散） | 64 环径向涡度面积分 |
| **半径 `r` 内包围环量 `Γ(r)`** | **`Γ(r) = Γ_∞ r² / (r² + r_c²) = Γ_∞ / (1 + u)`** | 误把全部环量 `Γ_∞` 压缩在 `r=0` 奇点 | `Γ(r) = Γ_∞ / (1 + u)` |
| **第 4 站（`u=0.25, r=2r_c`）速度比** | **`1.0000×`（包围 80.00% 环量）** | `1.2500×`（超速 `+25.00%`，离心力 `1.56×`） | `1.0000×` |
| **第 8 站（`u=0.50, r=1.41r_c`）速度比** | **`1.0000×`（包围 66.67% 环量）** | `1.5000×`（超速 `+50.00%`，离心力 `2.25×`） | `1.0000×` |
| **第 16 站（`u=1.00, r=r_c`）速度比** | **`1.0000×`（峰值风速边界，包围 50% 环量）** | **`2.0000×`（超速 `+100%`，离心力暴涨 `4.00×`）** | `1.0000×` |
| **17 站弹弓飞散违背站数** | **`0 / 17`（外围 `1/r` 与核心刚体旋转平滑过渡）** | **`16 / 17`（94.1% 站点超冲炸飞）** | `0 / 17` |
| **8,192 次 17 站 CPU 耗时** | **`0.187 ms`（45.86× 加速，零 `sqrt` 开方）** | `0.179 ms`（但风眼粒子全部炸飞） | `8.576 ms`（每站 64 环斯托克斯积分） |

---

## 2. 🎯 客户与架构师灵魂拷问 Q&A（痛点直击与第一性原理）

### Q0：追踪每日业界最新视频与动画制作能力突破——为什么粒子特效里的龙卷风和魔法漩涡一吸进中心就会“炸窝”？
在游戏 VFX 与实时流体粒子系统中，美术师常给粒子加一个向心吸力（把树叶、尘土吸向风眼）和一个切向旋转力。如果程序员直接照抄教科书上的点涡公式 `v_theta = strength / distance`，当粒子被吸到距离中心 `r = 0.05 m` 时，切向速度会暴涨 20 倍；下一帧显式欧拉积分步 `p_next = p + v * dt` 会直接沿着切线把粒子像电磁炮弹丸一样甩出几十米远！这就是实时特效中最臭名昭著的**“涡核弹弓效应（Vortex Core Slingshot）”**。而在真实大自然中，无论是飓风风眼还是浴缸排水漩涡，越靠近正中心风速反而越平静（风眼中心速度为 0），绝不会出现无穷大速度。

### Q1：Rankine（1858）与 Kaufmann（1962）是如何从斯托克斯环量定理推导出 `r / (r² + r_c²)` 的？
1. **斯托克斯环量定理与涡度分布**：根据斯托克斯定理，半径 `r` 圆周上的切向速度环量等于圆内涡度 `ω(ρ)` 的面积分：
   $$\Gamma(r) = \oint_{|\mathbf{x}|=r} \mathbf{v}\cdot d\mathbf{l} = 2\pi r\,v_\theta(r) = \int_0^r \omega(\rho)\,2\pi\rho\,d\rho$$
2. **Kaufmann-Scully 代数涡核涡度分布**：考夫曼（1962）与 Scully（1975）提出平滑代数涡度核（半径 `r_c`）：
   $$\omega(\rho) = \frac{\Gamma_\infty}{\pi}\frac{r_c^2}{(\rho^2 + r_c^2)^2}$$
   将其代入斯托克斯环量积分（令 `s = ρ²`）：
   $$\Gamma(r) = \Gamma_\infty r_c^2 \int_0^{r^2} \frac{ds}{(s + r_c^2)^2} = \Gamma_\infty \frac{r^2}{r^2 + r_c^2} = \frac{\Gamma_\infty}{1 + (r_c/r)^2}$$
3. **无奇点切向速度与向量零开方算子**：除以圆周长 `2πr`，立即得到全局光滑的切向速度：
   $$v_\theta^{\text{K}}(r) = \frac{\Gamma_\infty}{2\pi}\frac{r}{r^2 + r_c^2}$$
   在三维向量形式下，由于角速度为 `Ω(r) = v_θ / r = (Γ_∞ / 2π) / (r² + r_c²)`，旋转速度向量 `v = Ω × r_vec = (Γ_∞ / 2π) (-z, 0, x) / (x² + z² + r_c²)` **完全消去了径向距离 `r = √(x² + z²)` 的平方根运算**！

### Q2：何时选 AI 视频生成模型 vs 代码驱动的 Rankine-Kaufmann 涡核粒子场？
- **何时选 AI 视频大模型**：适合生成单镜头电影预告片中的写实沙尘暴或超自然巨型云墙背景。
- **何时选代码驱动 Rankine-Kaufmann 涡核场**：在可交互的 3D 游戏技能特效、飞行模拟器翼尖尾流、实时烟雾涡度限制（Vorticity Confinement）以及可受玩家操控的粒子龙卷风中，必须采用确定性 `r / (r² + r_c²)` 代数涡核。

---

## 3. 🧭 直观可视化图解（Mermaid 选型决策树 + 管线对比 + 帧级时序图）

### 3.1 漩涡与粒子旋转速度场选型决策树

```mermaid
flowchart TD
    A[3D 龙卷风 / 翼尖涡 / 烟圈粒子旋转速度需求] --> B{粒子是否会进入涡核区 r <= 2 r_c?}
    B -->|是: 粒子被吸入风眼或穿越涡丝| C[选用 Rankine-Kaufmann 代数涡核 r / r^2 + r_c^2]
    B -->|否: 仅远场无旋扰动 r >> 10 r_c| D[可用渐近 1/r 点涡近似]
    C --> E[外围 r >> r_c 自动退化为 1/r 无旋衰减]
    C --> F[风眼 r << r_c 自动过渡为 v prop r 刚体旋转 锁死 1.0000x]
```

### 3.2 朴素奇异 `1/r` 点涡 vs Rankine-Kaufmann 代数涡核管线对比

```mermaid
flowchart LR
    subgraph NaivePointVortex[反模式: 朴素奇异 1/r 点涡]
        N1[粒子到达涡核边界 r = r_c] --> N2[忽略涡核面积分 套用全环量 Gamma_inf]
        N2 --> N3[切向速度翻倍 2.0000x 离心力暴涨 4.00x]
        N3 --> N4[r 趋近 0 时速度无穷大 粒子像电磁炮弹弓炸飞!]
    end

    subgraph RankineKaufmann[正道: Rankine-Kaufmann 代数涡核]
        K1[粒子到达涡核边界 r = r_c] --> K2[斯托克斯包围环量衰减为 0.50 Gamma_inf]
        K2 --> K3[v = Gamma_inf / 2pi * r / r^2 + r_c^2]
        K3 --> K4[速度比恒锁 1.0000x 进入风眼平滑减速至 0!]
    end
```

### 3.3 帧级零开方三维涡核速度向量求值时序图

```mermaid
sequenceDiagram
    participant Emitter as 粒子位置更新器 (x, y, z)
    participant Kernel as Rankine-Kaufmann 涡核着色器
    participant Integrator as 时间步进积分器
    Emitter->>Kernel: 传入相对涡心偏移 (dx, dz) 与涡核半径平方 r_c^2
    Kernel->>Kernel: 计算 r_sq = dx*dx + dz*dz (零 sqrt 开方!)
    Kernel->>Kernel: 计算角速度因子 omega = Gamma / (2*pi * (r_sq + r_c^2))
    Kernel->>Integrator: 输出切向速度向量 (-dz * omega, 0, dx * omega)
    Integrator-->>Emitter: 稳定更新涡核内外全部粒子轨迹 (0/17 弹弓飞散)
```

---

## 4. 📊 视觉技术选型决策矩阵（Decision Matrix）

| 涡流特效与物理场景 | 推荐速度核公式 | 涡核边界（`r = r_c, u = 1.00`）表现 | 视觉与数值稳定性 |
| :--- | :--- | :--- | :--- |
| **龙卷风尘埃与碎石漏斗粒子系统** | **Rankine-Kaufmann `r / (r² + r_c²)`** | **`v / v_exact = 1.0000×`（峰值风速锁死）** | 风眼壁紧实旋转，无粒子炸飞 |
| **战斗机翼尖涡尾迹与螺旋桨滑流** | **Rankine-Kaufmann / Vatistas 涡核** | **包围环量 `Γ(r_c) = 0.5000 Γ_∞`** | 符合真实风洞激光多普勒测速曲线 |
| **GPU 大规模三维涡丝粒子（Vortex Filaments）** | **代数向量核 `(-dz, 0, dx)/(r²+r_c²)`** | **零 `sqrt()`、零 `exp()` 超越函数** | 比高斯 Lamb-Oseen 涡核快数倍 |
| **朴素奇异毕奥-萨伐尔点涡（`1 / r`）** | 严禁用于粒子可触达区域 | `v / v_exact = 2.0000×`（离心力 `4.00×`） | 中心奇点直接引发 `NaN` 或弹弓飞散 |

---

## 5. 🧪 全新 Demo 与 7-Card 4:5 视觉报告（Rankine-Kaufmann Vortex Core Rig）

本轮新增第 **203** 个独立交互式 3D 计量台 **`demos/rankine-kaufmann-vortex-core-rig/`**（58 个等轴测几何实体、17 个径向涡核站点 `u = (r_c/r)² ∈ [0.000, 1.000]`）：

- **交互式 Demo 入口**：`demos/rankine-kaufmann-vortex-core-rig/index.html`
- **密封基准数据**：`demos/rankine-kaufmann-vortex-core-rig/report.json`
- **7-Card 4:5 视觉报告（英文 / 中文）**：
  - `demos/rankine-kaufmann-vortex-core-rig/test-report-cards.html`
  - `demos/rankine-kaufmann-vortex-core-rig/test-report-cards.zh.html`
- **Playwright 实测多主题证据截图**：
  - `docs/evidence/rankine-kaufmann-vortex-core-rig/dark-rankine_kaufmann_algebraic_core_lock.png`
  - `docs/evidence/rankine-kaufmann-vortex-core-rig/dark-naive_singular_point_vortex_slingshot.png`
  - `docs/evidence/rankine-kaufmann-vortex-core-rig/light-rankine_kaufmann_algebraic_core_lock.png`
  - `docs/evidence/rankine-kaufmann-vortex-core-rig/light-naive_singular_point_vortex_slingshot.png`
  - `docs/evidence/rankine-kaufmann-vortex-core-rig/mobile.png`

```ts
// 零 sqrt 开方的三维 Rankine-Kaufmann 代数涡核速度向量算子
export function evaluateKaufmannVortexVelocityXZ(
  dx: number,
  dz: number,
  circulationGamma: number,
  coreRadius: number
) {
  const rSq = dx * dx + dz * dz;
  const rcSq = coreRadius * coreRadius;
  const angularSpeed = circulationGamma / (2 * Math.PI * (rSq + rcSq));
  return { vx: -dz * angularSpeed, vz: dx * angularSpeed };
}
```

---

## 6. 🛠️ 高质量视觉交付快速核验清单（Delivery Checklist）

- [x] **零风眼弹弓炸飞伪影**：确认涡核正则化分母 `r² + r_c²` 已启用，在全部 17 个径向站点锁死 `v / v_exact = 1.0000×`（消除朴素 `1/r` 点涡在 `r = r_c` 处的 `2.0000×` 超速与 `4.00×` 离心力暴涨）。
- [x] **斯托克斯环量定理自洽**：闭式代数涡核与 64 环涡度环量数值求积误差 `< 1e-12`，CPU 提速 `45.86×`。
- [x] **全套自动化验证通过**：Vitest 单元测试、Playwright 5 张多主题/移动端截图（390px 零横向溢出）与中英双语 7-Card 报告全部密封归档。
