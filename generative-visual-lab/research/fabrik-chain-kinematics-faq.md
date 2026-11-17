# 多关节机械臂与触手不拉长不乱抖：FABRIK 双向定长追逐逆运动学与线性雅可比选型 FAQ

> **文档定位**：面向 AI 解决方案架构师（AI Solution Architect）、角色与机器人动画工程师、WebGL2/Three.js 技术美术（TA）与具身智能仿真团队的**实战选型与第一性原理指南**。严格对标 `ib-vs-ethernet-roce-selection-faq.md` 的六段式结构，先用人话讲清“**为什么一阶线性雅可比/切向步会把骨骼像橡皮筋一样拉长（勾股切线膨胀），并在目标超界时陷入奇异抖动**”，再给出零矩阵求逆、零三角函数开销的 **Target-Clamped FABRIK（双向球面投影逆运动学）** 工程闭环。

![FABRIK 双向球面投影对比一阶线性步可视化总结](evidence/fabrik-chain-solver-summary.svg)

---

## ① 📌 核心结论速览（Executive Summary）

1. **一句话定性**：**圆周运动的瞬时切线永远垂直于半径，因此任何不在步进后把骨骼端点重新拉回定长球面的“一阶线性/切向位移”（$\mathbf{r}_{\text{new}} = \mathbf{r}_0 + \Delta\boldsymbol{\omega} \times \mathbf{r}_0$），都会按勾股定理将每节骨长膨胀为 $L_i\sqrt{1 + \Delta\theta_i^2} > L_i$**。对于 5 节及以上的机械臂、龙尾、触手或脊柱链，采用 **目标可达性半径钳制（Reachability Clamping）+ FABRIK 双向球面投影（Forward And Backward Reaching Inverse Kinematics）** 可以在不求逆任何雅可比矩阵、不调用任何反三角函数的前提下，将全部骨骼长度误差锁死在浮点机器精度（**`4.44e-16 u`**）。
2. **什么时候必须用 FABRIK 双向球面投影？**
   - 当你需要驱动 **3 节以上的多关节冗余骨骼链（机械臂、脊椎、尾巴、藤蔓、章鱼触手）** 实时追逐空间目标，或者在 **RigAnything**（`arXiv:2502.09615`, SIGGRAPH TOG 2025）/ **MagicArticulate**（CVPR 2025）自动生成的任意拓扑骨骼之上叠加无滑移末端锁定时，FABRIK 是兼顾**严格定长、无奇异点抖动、超高速迭代**的首选几何求解器。
3. **核心实测对比结论**：
   - 在本实验室新建的 5 连杆 3D 机械臂逆运动学检验台（[`demos/fabrik-chain-solver/`](../demos/fabrik-chain-solver/index.html)，共 `48` 个 3D 实体，总骨长上限 $R_{\max} = 5.50\text{ u}$）中，当从初始姿态追逐 $28^\circ$（距离 $4.80\text{ u}$）目标时：
     - **Target-Clamped FABRIK（`fabrik-clamped`）**：经过 8 次双向球面投影迭代，全部 5 节骨骼的最大长度误差仅为 **`4.4409e-16 u`**（总长严格保持 **`5.5000 u`**），根部锚点滑移为 **`0.000000 u`**；当目标超出 $5.50\text{ u}$ 可达半径时，自动沿径向射线拉直锁死，**`0` 奇异抖动**。
     - **未重投影一阶线性步（`linear-unprojected`）**：因切向分量与原骨骼正交，单节骨骼被拉长 **`0.5275 u`**，5 节链总长度从 `5.50 u` 剧烈膨胀至 **`8.0553 u`**（整体拉长 **`+46.46%`**）。
   - **CPU 批量求解性能**：直接三维向量归一化投影比逐关节球坐标反三角函数（`acos` / `atan2` / `sin` / `cos`）快 **`2.11 倍`**（`8,192` 次 5 连杆 8 轮迭代耗时 **`59.63 ms` vs `126.13 ms`**，且两者关节坐标在 `2.98e-15 u` 内完全等价）。

---

## ② 🎯 客户与架构师灵魂拷问 Q&A（First-Principles Q&A）

### Q1：什么是逆运动学（IK）？为什么以前用线性雅可比或简单插值做机械臂/尾巴摆动时，骨头会像橡皮筋一样变长变短，甚至在伸直时疯狂抽搐？

**先用大白话讲第一性原理**：
- **正运动学（FK）** 是“已知每个关节转了多少度，算指尖在哪里”；而 **逆运动学（IK）** 是反过来：“**已知指尖要去抓桌上的杯子 $\mathbf{t}$，反推肩膀、手肘、手腕每个关节该摆到什么位置**”。
- 为什么一阶线性步会把骨头拉长？
  想象一根长度为 $L$ 的骨头 $\mathbf{r}_0$。当它绕关节微小转动 $\Delta\theta$ 时，物理上的真实轨迹是一段**圆弧**；但一阶导数（雅可比矩阵 $\mathbf{J}$）只知道圆弧在起点的**切线方向** $\Delta\mathbf{r} = \Delta\theta (\hat{\mathbf{z}} \times \mathbf{r}_0)$。
  因为切线永远垂直于半径（$\Delta\mathbf{r} \perp \mathbf{r}_0$），如果你直接把切线位移加到骨骼末端而不把它重新拉回圆周上，根据勾股定理，新骨头的长度必然变成：
  $$\|\mathbf{r}_0 + \Delta\mathbf{r}\| = \sqrt{L^2 + (L\,\Delta\theta)^2} = L\sqrt{1 + (\Delta\theta)^2} > L$$
  哪怕转角只有 $\Delta\theta = 1\text{ rad}$（约 $57^\circ$），骨头也会瞬间被拉长 $\sqrt{2} - 1 \approx 41.4\%$！
- 为什么目标太远时传统雅可比求逆会疯狂抽搐？
  当目标距离 $\|\mathbf{t} - \mathbf{p}_0\| > R_{\max}$ 时，整条手臂完全伸直，所有关节的切线方向全部共线，雅可比矩阵 $\mathbf{J}$ 失去满秩（行列式趋近于 $0$，即**运动学奇异点 Kinematic Singularity**）。此时求逆 $\mathbf{J}^{-1}$ 会算出无穷大的角速度，导致机械臂在极限边界处剧烈正反乱抖！

---

### Q2：什么时候选 AI 自动骨骼绑定（RigAnything / MagicArticulate），什么时候选闭式双骨余弦定理 IK，什么时候选 FABRIK，什么时候选阻尼最小二乘雅可比（DLS / SQP）？

这四类技术在动画与机器人管线中各司其职、互不替代：

| 维度 | 1. 2-Bone 闭式余弦定理 IK (`Law of Cosines`) | 2. Target-Clamped FABRIK (`fabrik-clamped`) | 3. 阻尼雅可比 / 序列二次规划 (`DLS Jacobian` / `FABRIK+SQP`) | 4. 神经自回归自动绑定 (`RigAnything` / `MagicArticulate`) |
| :--- | :--- | :--- | :--- | :--- |
| **解决的核心问题** | 刚好 2 节骨头（大腿+小腿、上臂+前臂）的精确角度求解 | **任意 $N$ 节串联骨骼链**在三维空间中的超高速定长追逐 | 含严苛末端 6-DoF 姿态角与工业力矩/避障不等式约束的轨迹规划 | **从无绑定静态 3D 网格自动预测骨骼拓扑树与蒙皮权重** |
| **骨长守恒精度** | 精确守恒（`~1e-16 u`） | **每步严格球面投影守恒（实测 `4.44e-16 u`）** | 必须在每步迭代后通过正运动学（FK）重算矩阵来消除切线膨胀 | 仅生成初始静止骨骼（Rest Pose），运行时仍需 IK 求解器驱动 |
| **矩阵求逆与奇异点** | 无矩阵求逆，超界直接夹紧 $|\cos\theta| \le 1$ | **零矩阵求逆、零三角函数，超界沿径向拉直零抖动** | 需每步求解 $6\times 6$ 或 $N\times N$ 线性方程组 $(\mathbf{J}\mathbf{J}^\top + \lambda^2\mathbf{I})^{-1}$ | 离线/秒级 Transformer + Diffusion 推理 |
| **8,192 次求解耗时** | `~1.5 ms`（仅限 2 节骨头） | **`59.63 ms`（5 节骨头 × 8 轮迭代，共 40 万次投影）** | `280 ~ 950 ms`（含矩阵组装、Cholesky 分解与三角函数） | 单模型绑定耗时 `~1.5 s` GPU |

---

### Q3：FABRIK 双向球面投影管线底层是如何运作的？为什么它不需要算一个 `sin` / `cos` 就能保证所有骨头长度一分不差？

FABRIK（Aristidou & Lasenby, *Graphical Models* 2011）的天才之处在于：**它抛弃了关节旋转角 $\theta_i$，直接在三维笛卡尔点空间 $\mathbf{p}_0, \mathbf{p}_1, \dots, \mathbf{p}_N \in \mathbb{R}^3$ 中用“画球找交点”代替旋转矩阵**（对应 `demos/fabrik-chain-solver/model.ts`）：

1. **阶段 0：可达性半径门禁（Reachability Radial Clamp）**：
   计算根部 $\mathbf{p}_{\text{root}}$ 到目标 $\mathbf{t}$ 的距离 $d = \|\mathbf{t} - \mathbf{p}_{\text{root}}\|$。若 $d \ge R_{\max} = \sum_{i=0}^{N-1} L_i$，说明目标超界，直接将整条链沿单位射线 $\hat{\mathbf{u}} = (\mathbf{t} - \mathbf{p}_{\text{root}})/d$ 依次排开：
   $$\mathbf{p}_{i+1} = \mathbf{p}_i + L_i \hat{\mathbf{u}} \quad (i = 0 \dots N-1)$$
   一步到位，零奇异点震荡！
2. **阶段 1：逆向追逐（Backward Reaching: End-Effector $\to$ Root）**：
   当目标可达（$d < R_{\max}$）时，先把末端关节点强行按在目标点上：$\mathbf{p}_N' = \mathbf{t}$。
   然后从倒数第二节关节 $i = N-1$ 往回走到根部 $i = 0$，把每个旧关节点 $\mathbf{p}_i$ 沿着它与新子节点 $\mathbf{p}_{i+1}'$ 的连线，拉回到以 $\mathbf{p}_{i+1}'$ 为球心、半径为 $L_i$ 的球面上：
   $$\mathbf{p}_i' = \mathbf{p}_{i+1}' + L_i \frac{\mathbf{p}_i - \mathbf{p}_{i+1}'}{\|\mathbf{p}_i - \mathbf{p}_{i+1}'\|}$$
3. **阶段 2：正向归位（Forward Reaching: Root $\to$ End-Effector）**：
   逆向走完后，原本固定在基座上的根关节 $\mathbf{p}_0'$ 被拉偏了。于是我们把根关节重新钉死在世界底座上：$\mathbf{p}_0'' = \mathbf{p}_{\text{root}}$。
   接着从 $i = 0$ 往末端 $i = N-1$ 正向走一遍，把每个子节点拉回到以 $\mathbf{p}_i''$ 为球心、半径为 $L_i$ 的球面上：
   $$\mathbf{p}_{i+1}'' = \mathbf{p}_i'' + L_i \frac{\mathbf{p}_{i+1}' - \mathbf{p}_i''}{\|\mathbf{p}_{i+1}' - \mathbf{p}_i''\|}$$
   **数学铁律**：在任何一轮正向传递结束的瞬间，根部必然严丝合缝地钉在 $\mathbf{p}_{\text{root}}$（误差 `0`），且每一节骨头的欧氏长度 $\|\mathbf{p}_{i+1}'' - \mathbf{p}_i''\|$ 必然等于 $L_i$（实测误差 `4.44e-16 u`）！

---

## ③ 🧭 直观可视化图解（Mermaid 决策树、管线对比与帧级时序）

### 3.1 骨骼运动学与绑定架构师选型决策树（`flowchart TD`）

```mermaid
flowchart TD
    Start[需要对 3D 资产或机械结构执行骨骼运动控制] --> Q1{当前资产是否已有骨骼层级与蒙皮?}
    Q1 -->|没有: 只有静态 3D 网格 Mesh| AutoRig[先用 RigAnything 或 MagicArticulate 自动生成骨骼树与蒙皮权重]
    Q1 -->|已有骨骼树: 需要根据末端目标实时反解关节姿态| Q2{受控骨骼链包含几节自由连杆?}

    AutoRig --> Q2
    Q2 -->|恰好 2 节连杆: 如人体大腿+小腿 / 上臂+前臂| TwoBone[采用 2-Bone 余弦定理闭式解析 IK + 极向量 Pole Vector]
    Q2 -->|3 节及以上的串联链: 机械臂 / 脊椎 / 触手 / 尾巴| Q3{是否需要工业级 6-DoF 末端力矩与硬避障不等式?}

    Q3 -->|实时图形动画与交互仿真: 追求严格定长与高帧率| FabrikPath[采用 Target-Clamped FABRIK 双向三维向量球面投影]
    Q3 -->|工业机械臂高精度轨迹规划: 如 UR5 / KUKA| HybridSqp[采用 FABRIK 提供初值 + SQP 序列二次规划精修]
```

### 3.2 一阶切向线性步（勾股膨胀）vs FABRIK 双向球面投影管线对比（`flowchart LR`）

```mermaid
flowchart LR
    subgraph LinearPipeline[传统错误捷径: 未投影一阶切向步导致骨长勾股膨胀]
        direction TB
        A1[输入初始骨骼向量 r_0, 长度 L_i] --> A2[叠加正交切向增量: r_new = r_0 + dTheta * z x r_0]
        A2 --> A3[勾股定理膨胀: 新骨长变为 L_i * sqrt 1 + dTheta^2 > L_i]
        A3 --> A4[结果: 单骨被拉长 0.5275 u, 5 节总臂长从 5.50 u 暴涨至 8.06 u!]
    end

    subgraph FabrikPipeline[正确几何管线: Target-Clamped FABRIK 双向球面投影]
        direction TB
        B1[输入目标点 t 与可达半径上限 R_max = 5.50 u] --> B2[可达性门禁: 若超界则沿射线直接拉直, 否则执行双向迭代]
        B2 --> B3[逆向拉回 p_N..p_0 + 正向推回 p_0..p_N 至半径 L_i 球面]
        B3 --> B4[结果: 骨长误差锁死 4.44e-16 u, 根部滑移 0.000000 u, 提速 2.11x!]
    end
```

### 3.3 帧级 FABRIK 双向球面投影求解与矩阵核验时序图（`sequenceDiagram`）

```mermaid
sequenceDiagram
    participant User as 目标角度控制器 / 动画时钟
    participant Solver as FABRIK 求解器 (model.ts)
    participant Audit as 骨长与根部不变量审计器
    participant GL as Three.js WebGL2 3D 机械臂台

    User->>Solver: 传入目标方位角 angle = 28° 与半径 r = 4.80 u
    Solver->>Solver: 检查 ||t - p_0|| <= 5.50 u (可达性半径门禁)
    loop 8 轮双向球面投影迭代 (Zero Trig / Zero Matrix Inverse)
        Solver->>Solver: Backward Pass: p_5 = t*, 依次将 p_4..p_0 投影至半径 L_i 球面
        Solver->>Solver: Forward Pass: p_0 = root, 依次将 p_1..p_5 投影至半径 L_i 球面
    end
    Solver->>Audit: 校验 5 节骨长误差 (4.44e-16 u) 与根部锚点误差 (0 u)
    Audit-->>GL: 用四元数对齐 5 根 3D 机械臂连杆与 6 颗关节球体并渲染
```

---

## ④ 📊 视觉技术选型决策矩阵（Architect Decision Matrix）

| 评估维度 | Target-Clamped FABRIK (`fabrik-clamped` 向量投影) | 球坐标反三角重构 (`Spherical Trig` 基线) | 未投影一阶线性步 (`linear-unprojected`) | 阻尼最小二乘雅可比 (`DLS Jacobian`) |
| :--- | :--- | :--- | :--- | :--- |
| **$28^\circ$ 目标下 5 节链总长度** | **`5.5000 u`（理论值 `5.5000 u`）** | `5.5000 u` | `8.0553 u`（膨胀 **`+46.46%`**） | 需依赖 FK 重建才不膨胀 |
| **单节骨骼最大拉伸畸变** | **`4.4409e-16 u`（零拉伸）** | `6.6613e-16 u` | **`0.5275 u`（严重拉长变形）** | 步长过大时产生切线误差 |
| **目标超界（$d > R_{\max}$）稳定性** | **一步径向拉直，`0` 奇异点抖动** | 需额外分支保护 $\arccos$ 越界 | 随目标距离无限拉长如橡皮筋 | 在 $\det(\mathbf{J}\mathbf{J}^\top)\to 0$ 附近降速或震荡 |
| **每轮迭代超越函数调用数** | **`0` 次 `sin/cos/acos/atan2`** | 每关节 `4` 次三角/反三角调用 | `0` 次 | 需构建完整旋转矩阵与雅可比 |
| **8,192 次 5 连杆 8 轮求解耗时** | **`59.63 ms`（中位数）** | `126.13 ms`（慢 `2.11x`） | `3.20 ms`（虽快但几何彻底损坏） | `~420 ms`（含矩阵求逆） |
| **架构师首选适用场景** | **3+ 关节角色脊椎/触手/机械臂实时交互** | 仅用于教学对比，生产环境不推荐 | **严禁直接用于刚体骨骼顶点更新** | **含复杂多任务优先级的工业机器人** |

---

## ⑤ 🧪 全新能力展示 Demo 与 Benchmark 核心发现（含 7-Card 报告）

### 5.1 交互式 5 连杆 3D 机械臂逆运动学检验台（`demos/fabrik-chain-solver/`）

本轮构建了独立可交互的 3D WebGL2 机械臂实验台 **[`demos/fabrik-chain-solver/`](../demos/fabrik-chain-solver/index.html)**（共 **48 个 3D 实体部件**）：
- **24 根最大可达边界环柱（$R_{\max} = 5.50\text{ u}$）**：直观标出 5 节连杆（`1.40 + 1.25 + 1.10 + 0.95 + 0.80 u`）的物理工作空间包络线；
- **主机械臂（5 根连杆 + 6 颗球形关节）与后排灰色基准骨骼链**：在 `fabrik-clamped` 模式下，前景机械臂与基准链严格锁死在 `5.5000 u` 总长；切换到 `linear-unprojected` 模式后，立即可见由于一阶切向勾股膨胀，机械臂连杆被拉长 **`0.5275 u`**、总长暴涨至 **`8.0553 u`** 并直接捅穿 $5.50\text{ u}$ 的物理包络圈！
- **原子化参数防御与 JSON 契约导出**：对越界目标距离（如 `targetRadius = 12.0`）自动抛出 `RangeError` 并保留上一有效姿态，支持导出 `FABRIK_CHAIN_SPEC.json`。

| 亮色主题 — FABRIK 双向球面投影（`5.50 u` 严格定长） | 亮色主题 — 未投影一阶线性步（膨胀至 `8.06 u`） |
| :---: | :---: |
| ![亮色主题 FABRIK 定长求解](evidence/fabrik-chain-solver/light-fabrik-clamped.png) | ![亮色主题未投影线性拉伸](evidence/fabrik-chain-solver/light-linear-unprojected.png) |

| 暗色主题 — FABRIK 双向球面投影（`5.50 u` 严格定长） | 暗色主题 — 未投影一阶线性步（膨胀至 `8.06 u`） |
| :---: | :---: |
| ![暗色主题 FABRIK 定长求解](evidence/fabrik-chain-solver/dark-fabrik-clamped.png) | ![暗色主题未投影线性拉伸](evidence/fabrik-chain-solver/dark-linear-unprojected.png) |

### 5.2 7-Card 4:5 视觉评测报告与封存数据链接

- 📊 **英文版 7-Card 4:5 评测报告**：[`demos/fabrik-chain-solver/test-report-cards.html`](../demos/fabrik-chain-solver/test-report-cards.html)
- 📊 **中文版 7-Card 4:5 评测报告**：[`demos/fabrik-chain-solver/test-report-cards.zh.html`](../demos/fabrik-chain-solver/test-report-cards.zh.html)
- 📁 **封存评测数据源**：[`demos/fabrik-chain-solver/report.json`](../demos/fabrik-chain-solver/report.json)（`13 / 13` 项确定性检查全部通过，Playwright 零运行时错误）。

---

## ⑥ 🛠️ 附录：高质量视觉/动画交付快速核验清单（Architect Checklist）

在交付任何多关节角色绑定、机械臂交互或触手/尾巴程序化动画前，请逐项核对以下检查单：

- [ ] **可达半径预门禁（Reachability Gate）**：在进入迭代循环前，是否已先检查 $\|\mathbf{t} - \mathbf{p}_0\| \ge \sum L_i$？若目标不可达，必须直接沿径向单位向量排布骨骼并提前返回，切勿在不可达目标上空转迭代！
- [ ] **根部锚点最终锁死（Forward Pass Ends Last）**：每次迭代循环是否必须以 **Forward Pass（从根部 $\mathbf{p}_0 = \mathbf{p}_{\text{root}}$ 推向末端 $\mathbf{p}_N$）** 作为最后一步？绝不能在 Backward Pass 后直接输出，否则根关节会脱离身体基座！
- [ ] **重合点除零保护（Zero-Length Guard）**：在计算球面投影方向 $(\mathbf{p}_i - \mathbf{p}_{i+1}) / \|\mathbf{p}_i - \mathbf{p}_{i+1}\|$ 时，是否加入了 $\max(10^{-9}, d)$ 及默认轴回退，防止两关节意外重合时产生 `NaN` 传染整条骨骼链？
- [ ] **骨长守恒回归断言**：在单元测试中遍历 $[-60^\circ, +60^\circ]$ 扇区，断言每节骨骼长度 $|\|\mathbf{p}_{i+1} - \mathbf{p}_i\| - L_i| < 10^{-12}\text{ u}$ 是否恒成立？
- [ ] **三维旋转恢复无翻滚（Swing-Twist Quaternion）**：由 FABRIK 算出的新骨骼点坐标恢复骨骼局部旋转矩阵时，是否采用了最短弧四元数 `setFromUnitVectors(restDir, currentDir)`（而非欧拉角反三角函数），避免万向节死锁与轴向乱拧？

---

## 参考文献与延伸阅读（References）

1. **FABRIK (Graphical Models 2011)**: Andreas Aristidou and Joan Lasenby, *"FABRIK: A fast, iterative solver for the Inverse Kinematics problem"*, Graphical Models, 73(5):243–260, 2011.
2. **FABRIK + SQP (JIRS 2023)**: Zichun Xu et al., *"A Combined Inverse Kinematics Algorithm Using FABRIK with Optimization"*, [`arXiv:2209.02532`](https://arxiv.org/abs/2209.02532).
3. **RigAnything (SIGGRAPH TOG 2025)**: Isabella Liu et al., *"RigAnything: Template-Free Autoregressive Rigging for Diverse 3D Assets"*, [`arXiv:2502.09615`](https://arxiv.org/abs/2502.09615).
