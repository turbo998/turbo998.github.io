# 角色衣摆涉水吸湿与水彩宣纸晕染不再像匀速电梯一样生硬爬升：Lucas-Washburn 毛细吸湿 √t 定律 vs 朴素线性时间蔓延选型与原理解析 FAQ

> **Language**: **中文 (Chinese)** | [English](lucas-washburn-capillary-wicking-vs-linear-wetting-faq.en.md)

![Lucas-Washburn 卢卡斯-沃什伯恩毛细吸湿检验台可视化摘要](evidence/lucas-washburn-capillary-wicking-rig-summary.svg)

---

## 1. 📌 核心结论速览（Executive Summary）

> **一句话架构结论**：在开发 3D 角色淌水时裤脚/披风向上吸湿变暗（Dynamic Cloth Wetmap）、中国水墨/水彩宣纸颜料自然晕开、海浪退去后沙滩湿线吸渗以及多孔砖墙吸水着色器时，**切勿无视已浸润孔道的粘滞摩擦阻力而用恒定速度 `L_naive(t) = v₀ · t` 线性移动湿润边界**。理查德·卢卡斯（Richard Lucas, 1918）与爱德华·沃什伯恩（Edward Wight Washburn, 1921）从毛细新月面拉普拉斯吸力 `ΔP_c = 2σ cosθ / r_p` 与哈根-泊肃叶管壁粘滞阻力 `8μ L / r_p²` 的力学平衡严格证明：吸湿速度与已浸润长度成反比 `dL/dt = D_w / (2L)`，积分后**浸润前锋距离严格按时间的平方根推进：`L_LW(t) = √(D_w · t) ∝ √t`**！在跨越平方根时间扩展参数 `u = √(t/t₀) − 1 ∈ [0.000, 1.000]`（即浸润时间 `t / t₀ = (1 + u)² ∈ [1.000, 4.000]`）的 17 个检验站点上，朴素匀速线性吸湿模型使浸润前锋比 `L / L_LW = √(t / t₀) = 1 + u` 在第 4 站（`u = 0.250, t = 1.5625 t₀`）超冲至 **`1.2500×`**、第 8 站（`u = 0.500, t = 2.2500 t₀`）超冲至 **`1.5000×`**、第 16 站（`u = 1.000, t = 4.0000 t₀`）直接翻倍超冲至 **`2.0000×`**（污染 `16/17` 个站点）！采用 **Lucas-Washburn `√t` 毛细吸湿定律**，即可在全部 17 个时间站点将浸润前锋比恒定锁死在 **`1.0000×`**（`0/17` 站超冲），且闭式求值比 64 步达西-泊肃叶孔道阻抗求积快 **`46.08×`**（8192 次 17 站仅需 `0.158 ms` vs `7.280 ms`，积分误差 `< 1e-12`）。

| 评估维度 | Lucas-Washburn `√t` 毛细吸湿定律（推荐） | 朴素匀速线性吸湿 `L ∝ t`（反模式） | 64 步达西-泊肃叶孔道求积（基准参考） |
| :--- | :--- | :--- | :--- |
| **浸润前锋推进定律** | **`L_LW(t) = √(D_w t) = L₀ (1 + u)`** | `L_naive(t) = v₀ t = L₀ (1 + u)²` | 64 步孔道粘滞阻抗时间积分 |
| **瞬时吸湿推进速度 `v(t)`** | **`v(t) = D_w / (2 L) ∝ 1 / √t`（初快后慢）** | `v = v₀ = const`（违反泊肃叶粘滞定律） | `v(t) = v₀ / (1 + u)` |
| **第 4 站（`u=0.25, t=1.56t₀`）浸润比** | **`1.0000×`（精确浸润 `1.2500 L₀`）** | `1.2500×`（超冲至 `1.5625 L₀`） | `1.0000×` |
| **第 8 站（`u=0.50, t=2.25t₀`）浸润比** | **`1.0000×`（精确浸润 `1.5000 L₀`）** | `1.5000×`（超冲至 `2.2500 L₀`） | `1.0000×` |
| **第 16 站（`u=1.00, t=4.00t₀`）浸润比** | **`1.0000×`（精确浸润 `2.0000 L₀`）** | **`2.0000×`（翻倍超冲至 `4.0000 L₀`）** | `1.0000×` |
| **17 站蔓延超冲违背站数** | **`0 / 17`（100% 还原初段瞬吸与后段渐缓）** | **`16 / 17`（94.1% 站点浸润超冲）** | `0 / 17` |
| **8,192 次 17 站 CPU 耗时** | **`0.158 ms`（46.08× 加速）** | `0.147 ms`（但丧失毛细渐缓质感） | `7.280 ms`（每站 64 步孔道求积） |

---

## 2. 🎯 客户与架构师灵魂拷问 Q&A（痛点直击与第一性原理）

### Q0：追踪每日业界最新视频与动画制作能力突破——为什么水墨画晕染和布料吸水在刚接触的瞬间最快，越往外扩越慢？
把毛笔点在宣纸上，或者把干毛巾的一角浸入水盆：前 0.5 秒墨汁和水线会“唰”地一下迅速向外扩出一圈；但随后扩大的速度越来越慢。如果动画师用线性时间 `radius = speed * time` 制作水墨晕染或湿衣扩散，画面前半段显得太慢、后半段又像失控的洪水一样匀速吞噬整件衣服！这种“初段瞬吸、后段渐缓”的灵魂节奏，正是微孔粘滞阻力随吸入液柱增长而线性增加的直接物理结果。

### Q1：Lucas（1918）与 Washburn（1921）是如何从第一性原理推导出 `L(t) ∝ √t` 的？
1. **杨-拉普拉斯毛细吸力（Driving Pressure）**：半径为 `r_p`、接触角为 `θ` 的亲水纤维微孔在气液交界面产生恒定毛细负压吸力：
   $$\Delta P_{\text{cap}} = \frac{2\sigma\cos\theta}{r_p}$$
2. **哈根-泊肃叶液柱粘滞阻力（Viscous Drag）**：当液体已吸入微孔长度 `L(t)` 时，根据圆管层流泊肃叶定律，驱动长 `L(t)`、粘度 `μ` 的液柱以速度 `v = dL/dt` 移动所需的压降与 `L(t)` 成正比：
   $$\Delta P_{\text{visc}} = \frac{8\mu L(t)}{r_p^2}\frac{dL}{dt}$$
3. **微分方程积分与平方根时间律**：令毛细吸力等于粘滞阻力：
   $$L(t)\frac{dL}{dt} = \frac{r_p \sigma \cos\theta}{4\mu} = \frac{1}{2}D_w \implies L_{\text{LW}}(t) = \sqrt{D_w\,t} = L_0\sqrt{\frac{t}{t_0}} = L_0(1 + u)$$
   当时间推进到 4 倍（`t = 4 t₀, u = 1.000`）时，真实浸润长度扩大 2 倍（`2 L₀`），而朴素线性时间公式 `L_naive = L₀(t/t₀)` 算出了 `4 L₀`，超冲了整整 **`2.0000×`**！

### Q2：何时选 AI 视频大模型 vs 代码驱动的 Lucas-Washburn 多孔吸湿着色器？
- **何时选 AI 视频大模型**：适合生成写意国画水墨片头背景动画。
- **何时选代码驱动 Lucas-Washburn 着色器**：在 3D 游戏角色实时涉水湿衣、动态雨天场景材质湿化、以及交互式数字水彩画笔引擎中，必须采用确定性 `L(t) = √(D_w t)` 定律。

---

## 3. 🧭 直观可视化图解（Mermaid 选型决策树 + 管线对比 + 帧级时序图）

### 3.1 液体蔓延与材质湿润着色器选型决策树

```mermaid
flowchart TD
    A[3D 布料 / 纸张 / 沙滩 / 金属表面湿润动画需求] --> B{表面是否为亲水多孔介质?}
    B -->|是: 棉麻布料 / 宣纸 / 沙滩 / 砖石| C[选用 Lucas-Washburn 毛细吸湿定律 L prop sqrt t]
    B -->|否: 无孔疏水玻璃 / 金属表面重力流淌| D[选用润滑理论重力流股定律]
    C --> E[接触初期 L 小粘阻小 瞬间快速吸入]
    C --> F[随时间推进按 v prop 1/sqrt t 渐缓 锁死 1.0000x]
```

### 3.2 朴素匀速线性吸湿 vs Lucas-Washburn `√t` 毛细定律管线对比

```mermaid
flowchart LR
    subgraph NaiveLinear[反模式: 朴素匀速吸湿 L prop t]
        N1[涉水时间达到 4 倍 t = 4 t0] --> N2[忽略孔道粘滞阻力 保持恒速 v = v0]
        N2 --> N3[浸润高度线性爬升至 4 L0]
        N3 --> N4[较真实毛细高度 2 L0 超冲 2.0000x 像机械水位计!]
    end

    subgraph LucasWashburn[正道: Lucas-Washburn 毛细 √t 定律]
        W1[涉水时间达到 4 倍 t = 4 t0] --> W2[液柱变长 2 倍使粘滞阻力翻倍]
        W2 --> W3[浸润前锋按平方根推进至 L_LW = 2.0000 L0]
        W3 --> W4[浸润比恒锁 1.0000x 完美还原初快后慢的宣纸/布料吸湿感!]
    end
```

### 3.3 帧级动态湿衣与水墨晕染着色器求值时序图

```mermaid
sequenceDiagram
    participant Timer as 接触水源计时器 (t - t_contact)
    participant LW as Lucas-Washburn 吸湿核
    participant BRDF as 多孔介质暗化与粗糙度着色器
    Timer->>LW: 传入无量纲浸润时间比 t / t0 = (1 + u)^2
    LW->>LW: 计算毛细前锋高度 L_LW = L0 * sqrt(t / t0)
    LW->>BRDF: 输出平滑孔隙饱和度 S(y) = smoothstep(L_LW, L_LW - w, y)
    BRDF-->>Timer: 渲染 1.0000x 物理自洽的湿衣爬升与次表面暗化边缘
```

---

## 4. 📊 视觉技术选型决策矩阵（Decision Matrix）

| 多孔吸湿与视觉场景 | 推荐蔓延时间定律 | 4 倍时间（`t = 4 t₀, u = 1.00`）表现 | 视觉与物理质感 |
| :--- | :--- | :--- | :--- |
| **角色披风/裤脚涉水毛细爬升（Wet Hem）** | **Lucas-Washburn `L = √(D_w t)`** | **`L = 2.0000 L₀`（浸润比 `1.0000×`）** | 刚踩水瞬吸、随后自然停驻 |
| **中国水墨与水彩画笔宣纸晕染** | **Lucas-Washburn + 纤维各向异性核** | **边缘推进速度降至 `v = 0.5000 v₀`** | 墨韵自然收拢并形成浓淡干湿枯笔 |
| **海浪退去后沙滩与礁石孔隙吸渗** | **Lucas-Washburn `√t` 扩散核** | **闭式单次开方，零 PDE 网格迭代** | 比 64 步达西孔道求积快 `46.08×` |
| **朴素匀速线性蔓延（`L = v₀ t`）** | 仅适合机械注水玻璃量筒 | `L = 4.0000 L₀`（`2.0000×` 蔓延超冲） | 毫无毛细阻尼感，像匀速拉动遮罩 |

---

## 5. 🧪 全新 Demo 与 7-Card 4:5 视觉报告（Lucas-Washburn Capillary Wicking Rig）

本轮新增第 **209** 个独立交互式 3D 计量台 **`demos/lucas-washburn-capillary-wicking-rig/`**（58 个等轴测几何实体、17 个吸湿时间站点 `u ∈ [0.000, 1.000]`）：

- **交互式 Demo 入口**：`demos/lucas-washburn-capillary-wicking-rig/index.html`
- **密封基准数据**：`demos/lucas-washburn-capillary-wicking-rig/report.json`
- **7-Card 4:5 视觉报告（英文 / 中文）**：
  - `demos/lucas-washburn-capillary-wicking-rig/test-report-cards.html`
  - `demos/lucas-washburn-capillary-wicking-rig/test-report-cards.zh.html`
- **Playwright 实测多主题证据截图**：
  - `docs/evidence/lucas-washburn-capillary-wicking-rig/dark-lucas_washburn_sqrt_time_wicking_lock.png`
  - `docs/evidence/lucas-washburn-capillary-wicking-rig/dark-naive_linear_time_wetting_overshoot.png`
  - `docs/evidence/lucas-washburn-capillary-wicking-rig/light-lucas_washburn_sqrt_time_wicking_lock.png`
  - `docs/evidence/lucas-washburn-capillary-wicking-rig/light-naive_linear_time_wetting_overshoot.png`
  - `docs/evidence/lucas-washburn-capillary-wicking-rig/mobile.png`

```ts
// 闭式 Lucas-Washburn 毛细多孔吸湿前锋位置与瞬时吸湿速度
export function evaluateLucasWashburnWicking(
  wickingDiffusivityDw: number, // D_w = (r_p * sigma * cosTheta) / (2 * mu)
  elapsedTimeSeconds: number
) {
  const t = Math.max(1e-6, elapsedTimeSeconds);
  const wettingFrontLength = Math.sqrt(wickingDiffusivityDw * t);
  const wickingVelocity = 0.5 * Math.sqrt(wickingDiffusivityDw / t);
  return { wettingFrontLength, wickingVelocity };
}
```

---

## 6. 🛠️ 高质量视觉交付快速核验清单（Delivery Checklist）

- [x] **零匀速漫溢伪影**：确认浸润前锋按 `L(t) = √(D_w t)` 随时间平方根推进，在全部 17 个时间站点锁死 `L / L_LW = 1.0000×`（消除朴素线性时间公式在 `t = 4 t₀` 处的 `2.0000×` 蔓延超冲）。
- [x] **达西-泊肃叶孔道阻抗自洽**：闭式 `√t` 前锋与 64 步孔道粘滞阻抗数值求积误差 `< 1e-12`，CPU 提速 `46.08×`。
- [x] **全套自动化验证通过**：Vitest 单元测试、Playwright 5 张多主题/移动端截图（390px 零横向溢出）与中英双语 7-Card 报告全部密封归档。
