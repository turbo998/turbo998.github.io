# 视觉与动画技术选型与原理解析 FAQ：Archimedes-Bouguer 阿基米德-布格稳心横摇定律 vs 朴素固定浮心亏损（为什么 3D 航海船只若把浮心死绑在船体上会导致 2.0000× 扶正力矩亏损甚至莫名翻船？）

> **独立专题定位（Tonight Round 15 / Repo Round 207 · 第 217 个独立可交互 Demo：`demos/archimedes-metacenter-roll-stability-rig/`）**  
> 本指南严格对标 `ib-vs-ethernet-roce-selection-faq.md` 的**六段式架构师决策结构**，先用通俗大白话与第一性原理讲透 **Archimedes（约前 250 年，《论浮体》）与 Pierre Bouguer（1746，《船舶论》，提出稳心 Metacenter 与稳心半径 $\overline{BM} = I_{\text{wp}} / \nabla$）船体横摇稳定性与水线面惯性矩扶正力臂定律**，再给出 AI 视频生成模型、逐面元网格流体压强积分、朴素固定浮心点模型与代码驱动解析 Archimedes-Bouguer 稳心横摇引擎的定量选型边界。

![Archimedes-Bouguer 稳心横摇定律对比总结图](./evidence/archimedes-metacenter-roll-stability-rig-summary.svg)

---

## 一、📌 核心结论速览（Executive Summary）

1. **一句话结论**：
   - 在 **3D 帆船、航空母舰、双体船（Catamaran）、集装箱货轮、浮冰翻转与水箱浮物横摇（Roll Oscillation）物理动画** 中，当船体横倾角度 $\theta$ 时，入水侧新浸没的三角形水楔与出水侧露出的水楔形成一对强力偶，迫使**真实浮心 $B(\theta)$ 向低侧横向外移 $\Delta y_B = \overline{BM}\sin\theta$，其浮力作用线与船体中纵剖面的交点即为稳心 $M$（Metacenter），稳心半径严格等于水线面面积二次惯性矩 $I_{\text{wp}}$ 除以排水体积 $\nabla$**：
     $$\overline{BM} = \frac{I_{\text{wp}}}{\nabla} = \frac{B^2}{12\,d}, \qquad \overline{GM} = \overline{KB} + \overline{BM} - \overline{KG}, \qquad \tau_{\text{righting}}(\theta) = \rho g \nabla \cdot \overline{GM}\,\sin\theta$$
   - 若采用**朴素固定浮心点模型（Naive Fixed Buoyancy Center $B_0$，将浮力作用点死绑在船体局部网格坐标上而忽略水线面楔形转移项 $\Delta\overline{BM}$）**，在跨越水线面稳心增益参数 $u = \overline{GM}/\overline{GM}_0 - 1 \in [0.000, 1.000]$（即稳心高从 $\overline{GM}_0$ 提升至 $2.00\,\overline{GM}_0$）的 17 个检验站点上，朴素模型的真实/模型扶正力矩亏损比 $\frac{\tau_{\text{exact}}}{\tau_{\text{naive}}} = \frac{\overline{GM}(u)}{\overline{GM}_0} = 1 + u$ 在第 4 站（$u=0.25$）亏损 **$1.2500\times$**，在第 8 站（$u=0.50$）亏损 **$1.5000\times$**，在第 16 站（$u=1.00$，两倍稳心高）直接腰斩亏损至 **$2.0000\times$**（污染 **16 / 17** 个站点，甚至在重心 $G$ 高于静态浮心 $B_0$ 时直接引发错误翻船）！
   - 采用 **代码驱动的 Archimedes-Bouguer 闭式稳心横摇求解器**，在全部 17 个水线面稳心站点上恒定锁死扶正力矩比 **$\tau_{\text{exact}} / \tau_{\text{model}} = 1.0000\times$**（**0 / 17** 站亏损），与 64 条出入水楔形体积矩数值求积完全等价（最大求积误差 $< 10^{-12}$），且单核 Node CPU 执行 8,192 次 17 站全量求解比 64 条楔形求积快约 **$40\times$**。

2. **为什么以前做出来的 3D 船只在大浪中要么软绵绵侧翻、要么得把重心强行塞到海底才不翻？**
   - 许多游戏开发者写船只浮力脚本时，习惯在船底放一个固定的 `BuoyancySocket`（浮心点 $B_0$），然后在船身重心 $G$ 施加重力。
   - **致命悖论**：任何一艘真实的现代货轮、游轮或航空母舰，因为甲板上有高耸的建筑或集装箱，它的**重心 $G$ 都在吃水线附近甚至吃水线以上，远高于水下船体的几何中心（静态浮心 $B_0$）**！如果浮心 $B_0$ 固定不动，$G$ 在上、$B_0$ 在下，船哪怕倾斜 $0.1^\circ$ 就会立刻底朝天翻船！为此，不懂造船静力学的程序员不得不写一个极度丑陋的 Hack——把船的物理重心 `rigidbody.centerOfMass` 强行改到水下几米深的海底，结果导致船只在转弯和受风浪拍击时像挂了铅锤的钟摆一样怪异晃动！
   - **第一性原理破局（皮埃尔·布格 1746 年稳心定理）**：为什么现实中重心 $G$ 高于浮心 $B_0$ 的宽体船根本不会翻？因为船是有**宽度（船宽 $B$，Beam）**的！当船向右倾斜时，右舷大量船体压入水中（入水楔形），左舷大量船体露出水面（出水楔形），水下排水体积的几何中心（浮心 $B$）会迅速向右大幅横移！浮心横移的幅度由水线面二次惯性矩 $I_{\text{wp}} = \frac{1}{12} L B^3$ 决定（与船宽 $B$ 的**三次方**成正比！）。向上浮力的延长线交船体中轴线于**稳心 $M$（Metacenter）**，只要稳心 $M$ 高于重心 $G$（$\overline{GM} = \overline{KB} + I_{\text{wp}}/\nabla - \overline{KG} > 0$），船就会像不倒翁一样产生强劲的恢复力矩！

---

## 二、🎯 客户与架构师灵魂拷问 Q&A（Selection & Architecture Deep-Dive）

### Q1：做航海游戏、船舶数字孪生或海战大片时，什么时候选 AI 视频生成大模型（Sora / Veo / Wan / Runway），什么时候选逐三角形水下压强积分，什么时候必须用代码驱动的 Archimedes-Bouguer 稳心解析引擎？

- **选 AI 视频大模型（Sora / Veo / Runway）**：
  - 仅适用于**纯观赏性远景海面日落、不需要满足真实造船静力学稳心高 $\overline{GM}$ 与横摇固有周期 $T_{\text{roll}} = \frac{2\pi k_{xx}}{\sqrt{g\,\overline{GM}}}$ 的宣传片背景**。
  - 一旦用于船舶工程设计评审、航海模拟器、可交互帆船操控或数字孪生甲板吊装安全预警，AI 视频完全无法感知稳心半径 $\overline{BM} = I_{\text{wp}}/\nabla$ 与重心高度 $\overline{KG}$ 的临界平衡。
- **选逐三角形水下网格面元压强积分（Per-Triangle Hydrostatic Pressure Integration）**：
  - 适用于**船体发生破舱进水、极端大倾角甲板浸水（Deck Edge Immersion，$\theta > 35^\circ$）或复杂非对称浮体的离线高精度流体仿真**。
  - 在实时 60–120fps WebGL 多船海战或港口数字孪生中，对每艘船数千个水下网格面元做逐帧裁剪求积开销较大，而闭式 Archimedes-Bouguer 稳心算子仅需几行代数即可零误差锁定横摇扶正力矩。
- **必须选代码驱动的 Archimedes-Bouguer 稳心解析引擎（本 Demo 方案）**：
  - 当业务需要 **60–120fps 实时交互调节水线面稳心增益 $u = \overline{GM}/\overline{GM}_0 - 1$、验证稳心扶正力臂 $\overline{GZ}(\theta) = \overline{GM}\sin\theta$、对比固定浮心点模型的扶正力矩亏损** 时，闭式算子在全 17 站恒锁 `1.0000×` 且延迟低于 `0.2 ms`。

### Q2：为什么说“船长增加一倍，横摇稳心半径不变；但船宽 $B$ 增加一倍，横摇稳心半径 $\overline{BM}$ 会暴增 4 倍”？

- 对于长 $L$、宽 $B$、吃水深 $d$ 的箱形船体：
  - 水线面关于纵向中心轴的二次面积惯性矩为 $I_{\text{wp}} = \frac{1}{12} L B^3$；
  - 水下排水体积为 $\nabla = L B d$；
  - 因此横摇稳心半径为：
    $$\overline{BM} = \frac{I_{\text{wp}}}{\nabla} = \frac{\frac{1}{12} L B^3}{L B d} = \frac{B^2}{12\,d}$$
- 可以看到，船长 $L$ 在分子分母中完全约掉，而**船宽 $B$ 以平方项 $B^2$ 出现在分子上**！这也是为什么双体船（Catamaran）和宽体集装箱船拥有极高的初稳心高 $\overline{GM}$ 与强大的抗风浪横摇扶正力矩，而忽略 $I_{\text{wp}}/\nabla$ 的朴素固定浮心模型会彻底丢失这一核心几何稳定性。

---

## 三、🧭 直观可视化图解（Mermaid 选型决策树 + 管线对比 + 帧级时序图）

### 3.1 船体浮力与横摇稳定性技术选型决策树

```mermaid
flowchart TD
    A["需要生成船只浮力、风浪横摇恢复力矩与稳心扶正动画？"] --> B{"是否需要精确满足布格稳心定律 GM = KB + I_wp/∇ − KG 与实时交互？"}
    B -- "否：仅做非交互海景宣传背景" --> C["AI 视频生成大模型\n(Sora / Veo / Wan / Runway)"]
    B -- "是：航海模拟 / 船舶数字孪生 / 60fps 实时海战" --> D{"计算方式选择"}
    D -- "朴素固定浮心点 B₀ (ΔBM = 0)" --> E["❌ 严重失真：丢失水线面楔形力偶\n扶正力矩亏损高达 2.0000× (16/17 站违背)"]
    D -- "64 条出入水楔形体积矩求积" --> F["⚠️ 精度准确但 8,192 轮耗时 ~7 ms"]
    D -- "Archimedes-Bouguer 闭式稳心算子" --> G["✅ 物理精确 + 极速实时\n17 站恒锁 1.0000×，8,192 轮仅 ~0.18 ms"]
```

### 3.2 朴素固定浮心管线 vs Archimedes-Bouguer 稳心扶正管线对比

```mermaid
flowchart LR
    subgraph Naive["❌ 朴素固定浮心管线 (Fixed Buoyancy Center B₀)"]
        N1["给定水线面稳心增益 u"] --> N2["将浮心固定在船体局部点 B₀\n忽略 BM = I_wp / ∇ 楔形外移"]
        N2 --> N3["恢复力矩仅剩基准值 τ₀\n真实/模型亏损比 = 1 + u"]
        N3 --> N4["第 16 站 (GM = 2 GM₀)\n扶正力矩腰斩亏损至 2.0000×!"]
    end

    subgraph Bouguer["✅ Archimedes-Bouguer 稳心管线 (GM = KB + BM − KG)"]
        P1["给定水线面稳心增益 u"] --> P2["计算浮心横向外移 BM = I_wp / ∇\n稳心高 GM(u) = GM₀(1 + u)"]
        P2 --> P3["计算精确扶正力矩 τ = ρg∇ GM(u) sinθ\n匹配 64 条水线面楔形求积"]
        P3 --> P4["全 17 站扶正力矩比恒锁 1.0000×\n0/17 站亏损，误差 < 1e-12"]
    end
```

### 3.3 帧级渲染与几何审计时序图

```mermaid
sequenceDiagram
    participant User as 造船工程师 / 架构师
    participant UI as Workbench 控制器
    participant Solver as Archimedes-Bouguer 求解器 (model.ts)
    participant Quad as 64 条水线面楔形求积器
    participant SVG as 58-Solid 等轴测渲染器

    User->>UI: 切换预设或拖动站点滑块 (Station 0..16, u ∈ [0, 1])
    UI->>Solver: auditArchimedesMetacenterRig(presetId, stationIdx)
    Solver->>Quad: evaluateQuadratureWaterplaneWedgeTorque(u, 64)
    Quad-->>Solver: 返回 64 条出入水楔形体积矩求积比值 (误差 < 1e-12)
    Solver-->>UI: 返回 17 站 GM/GM₀、扶正力臂比与 1.0000× / 2.0000× 亏损审计
    UI->>SVG: buildArchimedesMetacenterRigSolids() 渲染 58 个等轴测几何体
```

---

## 四、📊 视觉技术选型决策矩阵（Architecture Decision Matrix）

| 评估维度 | AI 视频生成大模型 (Sora / Veo / Wan) | 朴素固定浮心点模型 ($\Delta\overline{BM} = 0$) | 64 条水线面出入水楔形求积 | **Archimedes-Bouguer 闭式稳心引擎（本 Demo）** |
| :--- | :--- | :--- | :--- | :--- |
| **物理定律遵循度** | ❌ 无显式造船静力学守恒 | ❌ 忽略水线面惯性矩 $I_{\text{wp}}/\nabla$ | ✅ 数值逼近水线面楔形力偶 | **✅ 严格解析守恒 $\overline{GM} = \overline{KB} + I_{\text{wp}}/\nabla - \overline{KG}$** |
| **第 4 站 ($u=0.25, \overline{GM}=1.25\overline{GM}_0$) 扶正比** | N/A | ❌ `1.2500×`（亏损 20%） | ✅ `1.0000×` | **✅ `1.0000×`（零亏损）** |
| **第 8 站 ($u=0.50, \overline{GM}=1.50\overline{GM}_0$) 扶正比** | N/A | ❌ `1.5000×`（亏损 33.3%） | ✅ `1.0000×` | **✅ `1.0000×`（零亏损）** |
| **第 16 站 ($u=1.00, \overline{GM}=2.00\overline{GM}_0$) 扶正比** | N/A | ❌ `2.0000×`（扶正力矩腰斩） | ✅ `1.0000×` | **✅ `1.0000×`（零亏损）** |
| **17 站扶正亏损违背站数** | N/A | ❌ `16 / 17` 站违背 | ✅ `0 / 17` 站违背 | **✅ `0 / 17` 站违背** |
| **8,192 轮 17 站 CPU 耗时** | 数十秒云端推理 | ~0.18 ms（但结果错误） | ~7.2 ms | **⚡ ~0.18 ms（快约 40×）** |

---

## 五、🧪 全新 Demo 与 7-Card 4:5 视觉报告（Workbench & Visual Evidence）

- **交互式 Demo 路径**：`demos/archimedes-metacenter-roll-stability-rig/`
- **英文 7-Card 报告**：`demos/archimedes-metacenter-roll-stability-rig/test-report-cards.html`
- **中文 7-Card 报告**：`demos/archimedes-metacenter-roll-stability-rig/test-report-cards.zh.html`
- **密封基准数据**：`demos/archimedes-metacenter-roll-stability-rig/report.json`

| 视觉证据类别 | 截图路径 | 关键验证结论 |
| :--- | :--- | :--- |
| **暗色主题 · Archimedes-Bouguer 稳心锁定** | `docs/evidence/archimedes-metacenter-roll-stability-rig/dark-archimedes_bouguer_metacentric_gm_lock.png` | 58 个等轴测实体完整渲染，`0 / 17` 亏损站，扶正力矩比恒锁 `1.0000×` |
| **暗色主题 · 朴素固定浮心亏损暴露** | `docs/evidence/archimedes-metacenter-roll-stability-rig/dark-naive_fixed_buoyancy_center_capsizing_deficit.png` | 红色报警柱揭示第 4/8/16 站 `1.2500× / 1.5000× / 2.0000×` 扶正亏损（`16 / 17` 违背） |
| **亮色主题 · Archimedes-Bouguer 稳心锁定** | `docs/evidence/archimedes-metacenter-roll-stability-rig/light-archimedes_bouguer_metacentric_gm_lock.png` | 亮色高对比度造船静力学计量视图验证 |
| **亮色主题 · 朴素固定浮心亏损暴露** | `docs/evidence/archimedes-metacenter-roll-stability-rig/light-naive_fixed_buoyancy_center_capsizing_deficit.png` | 亮色模式下 16 个亏损站点高亮告警 |
| **移动端 `390×844` 自适应视图** | `docs/evidence/archimedes-metacenter-roll-stability-rig/mobile.png` | `mobile_overflow = false`，零横向滚动条溢出 |

---

## 六、🛠️ 高质量视觉交付快速核验清单（Delivery Checklist）

- [x] **水线面惯性矩稳心半径核验**：船只横摇脚本是否计入了水线面二次面积矩带来的稳心半径 $\overline{BM} = I_{\text{wp}} / \nabla = \frac{B^2}{12\,d}$，而非将浮力死绑在固定点 $B_0$？
- [x] **初稳心高正定性检查**：在重心 $G$ 高于静态浮心 $B_0$（$\overline{KG} > \overline{KB}$）的正常宽体船上，是否验证了 $\overline{GM} = \overline{KB} + \overline{BM} - \overline{KG} > 0$，无需把物理重心错误地篡改到水下海底？
- [x] **64 条出入水楔形体积矩求积核验**：闭式稳心公式与 64 条水线面楔形 Simpson 求积的最大偏差是否严格小于 $10^{-12}$？
- [x] **58 构件等轴测几何与移动端零溢出**：Playwright 实测 `.iso-solid` 数量是否为 `58`，且 `390×844` 视口下无横向溢出？
