# 悬链与布料不无限拉长下垂：多子步 Gauss-Seidel 距离约束投影与单遍松弛选型 FAQ

> **文档定位**：面向 AI 解决方案架构师（AI Solution Architect）、实时物理动效（PBD/XPBD）工程师、WebGL2/Three.js 技术美术（TA）与数字孪生团队的**实战选型与第一性原理指南**。严格对标 `ib-vs-ethernet-roce-selection-faq.md` 的六段式结构，先用人话讲清“**为什么挂在两座桥塔之间的绳索、丝带或布料横幅，在单遍松弛（Single-Pass Jacobi）下会像融化的马苏里拉奶酪一样被重力拉长下垂**”，再给出零堆内存分配的 **对称多遍 Gauss-Seidel 原地（In-Place）距离约束投影 + 逐次超松弛（SOR）** 工程闭环。

![对称多遍 Gauss-Seidel 对比单遍 Jacobi 松弛可视化总结](evidence/catenary-constraint-rig-summary.svg)

---

## ① 📌 核心结论速览（Executive Summary）

1. **一句话定性**：**在由 $N$ 节连杆串联而成的绳索或布料网格中，单遍并行约束松弛（Single-Pass Jacobi）的“数值信息传播波速”只有每遍 1 节连杆**。当重力同时把中间所有节点往下拽时，两座桥塔固定锚点（逆质量 $w_0 = w_{12} = 0$）的拉力在单遍内根本来不及传到跨中节点，导致绳索像橡皮筋一样严重拉长下垂；只有采用 **原地立即更新（In-Place Update）的对称正逆向 Gauss-Seidel 迭代扫描**，才能让边界锚点的张力在同一帧内贯穿整条悬链。
2. **什么时候必须用多遍对称 Gauss-Seidel 距离约束投影（PBD / XPBD）？**
   - 凡是在实时动画、游戏或数字孪生中模拟**两端或单端固定的柔体次级结构**——包括跨江悬索桥主缆、舞台绶带/飘带、角色披风布料、软管电缆、吊车钢索——都必须摒弃单遍弹簧力或单遍 Jacobi 平均，改用 **子步（Substepping）或对称多遍 Gauss-Seidel 原地距离约束投影**（见 Macklin et al. `XPBD` 2016 / `Small Steps in Physics Simulation` 2019 及 Narain et al. `Towards Generalized Position-Based Dynamics`, `arXiv:2511.23131`, 2025）。
3. **核心实测对比结论**：
   - 在本实验室新建的 12 节双塔 3D 悬链约束检验台（[`demos/catenary-constraint-rig/`](../demos/catenary-constraint-rig/index.html)，共 `48` 个 3D 实体，两塔跨距 `8.00 u`，12 节静止总长 $12 \times 0.80 = 9.60\text{ u}$）中，在重力载荷 `2.6` 下：
     - **对称多遍 Gauss-Seidel 原地投影（`gauss-seidel-multi`）**：整条悬链总长度稳定锁死在 **`9.6089 u`**（相对误差仅 **`0.09%`**），在全部 `35` 个重力载荷梯度下单节最大拉伸误差仅 **`0.003602 u`**，且左右桥塔锚点滑移均为 **`0.000000 u`**。
     - **单遍并行 Jacobi 松弛基线（`single-pass-jacobi`）**：由于锚点张力只向内传播了 1 节，跨中连杆最大单节被拉长 **`0.1459 u`**（是 Gauss-Seidel 误差的 **40.5 倍**），整条悬链总长从 `9.60 u` 膨胀至 **`10.1220 u`**（净拉长 **`+0.5220 u`**，跨中明显下坠）。
   - **CPU 零分配原地投影性能**：基于 `Float64Array` 的原地 Gauss-Seidel 投影与逐遍创建 `{x,y,z}` 对象的基线保持 **`0` 浮点误差（完全逐位一致）**，且消除了垃圾回收（GC）抖动（`1,024` 次求解耗时 **`77.00 ms` vs `89.32 ms`**）。

---

## ② 🎯 客户与架构师灵魂拷问 Q&A（First-Principles Q&A）

### Q1：为什么用基于位置的动力学（PBD）做绳索或布料时，只跑 1~2 遍约束或者用并行 Jacobi 平均，绳子就会像橡皮筋一样被重力越拉越长？

**先用大白话讲第一性原理**：
想象 13 个人手拉手排成一排（共 12 段手臂，每段长 $0.80\text{ m}$），最左边的人（节点 $0$）和最右边的人（节点 $12$）死死抱住两座桥塔柱子（$w_0 = w_{12} = 0$）。
突然，重力把中间 11 个人同时往下拽了一大截：
- 如果采用**单遍并行 Jacobi 松弛**：每个人在调整自己位置时，只看左右邻居在“未调整前”的旧位置。因为中间第 5、6、7 号人的左右邻居全都一起掉下去了，他们互相一看：“咦，我们之间的水平距离差不多嘛，只需要微调一点点！”——**站在正中间的 6 号根本不知道最左边的 0 号和最右边的 12 号正死死拽着绳头**！结果一遍跑完，只有紧挨着桥塔的第 1 号和第 11 号被拉住了一半，中间整段绳子全掉在底下，总长度被硬生生拉长了半米多！
- 如果采用**原地立即更新的对称 Gauss-Seidel 扫描**：
  当我们从左往右（$i = 0 \to 11$）依次拉紧时，第 0 号（锁死在左塔）先把第 1 号硬生生拽回 $0.80\text{ m}$ 球面上；**紧接着算第 1 和第 2 号时，直接用第 1 号刚刚被拽上去的新位置**去拽第 2 号！然后再从右往左（$i = 11 \to 0$）立刻扫回来，消除左右不对称。配合逐次超松弛因子（SOR $\omega = 1.62$），锚点的张力就像高速列车一样在几毫秒内传遍整条 12 节悬链！

---

### Q2：什么时候选解析双曲余弦悬链线（$\cosh$），什么时候选多遍对称 Gauss-Seidel（PBD/XPBD），什么时候选广义非线性 PBD（Generalized PBD `arXiv:2511.23131`）或有限元（FEM）？

工程选型取决于你的悬链/布料是否需要**动态外力交互、碰撞响应与非线性材料本构**：

| 维度 | 1. 静态解析双曲余弦悬链线 (`y = a cosh(x/a)`) | 2. 对称多遍 Gauss-Seidel PBD/XPBD (`gauss-seidel-multi`) | 3. 广义非线性 PBD (`Generalized PBD`, `arXiv:2511.23131`) |
| :--- | :--- | :--- | :--- |
| **物理/数学本质** | 均匀重力下理想柔索的静态平衡超越方程解 | 按逆质量权重 $w_i/(w_i+w_{i+1})$ 依次将相邻节点原地投影回距离约束流形 $\|\mathbf{p}_{i+1}-\mathbf{p}_i\| = L_0$ | 将隐式时间积分按单个非线性内力项重构并直接做 Gauss-Seidel 迭代 |
| **非均匀载荷与碰撞** | **不支持**（一旦挂上集中配重、受风吹摆动或碰到障碍物即失效） | **天然支持**（任意节点可挂载不同质量、风力、胶囊体碰撞与动态移动锚点） | 支持数据驱动真实测量织物（Sperl et al.）与 Neo-Hookean 超弹性防翻转 |
| **对称性与定长精度** | 静态解析精确（需牛顿法解超越方程求参数 $a$） | 正逆双向扫描严格保证左右对称，单节误差 **`0.0036 u`（`< 0.45%`）** | 在高分辨率网格上显著快于传统全局 Newton-Raphson 线性方程组求解 |
| **最适用工程场景** | **纯静态建筑拱桥建模、电力架空线静态弧垂计算** | **实时 3D 吊索、飘带、旗帜、软管、角色配件次级物理动效** | **高保真虚拟试衣（Virtual Try-On）、软体机器人组织形变仿真** |

---

### Q3：核心约束投影管线底层是如何运作的？为什么正逆交替扫描（Symmetric Sweep）+ 原地更新（In-Place）不可或缺？

完整管线分为三步（对应 `demos/catenary-constraint-rig/model.ts`）：

1. **逆质量锚点编码（Inverse-Mass Pinning）**：
   不要在代码里写满 `if (i === 0) continue` 的分支判断，而是为每个节点赋予逆质量 $w_i = 1/m_i$：固定锚点设 $w_0 = w_N = 0$，自由节点设 $w_i = 1$。
2. **带超松弛（SOR）的原地距离投影公式**：
   对于第 $i$ 节连杆 $(\mathbf{p}_i, \mathbf{p}_{i+1})$，计算当前向量 $\mathbf{d} = \mathbf{p}_{i+1} - \mathbf{p}_i$ 与当前长度 $d = \|\mathbf{d}\|$。当 $w_i + w_{i+1} > 0$ 时，按逆质量比例分配修正量并**原地立即覆写** `Float64Array`：
   $$\Delta \mathbf{p} = \omega \frac{d - L_0}{d\,(w_i + w_{i+1})} \mathbf{d}, \qquad \mathbf{p}_i \leftarrow \mathbf{p}_i + w_i \Delta \mathbf{p}, \qquad \mathbf{p}_{i+1} \leftarrow \mathbf{p}_{i+1} - w_{i+1} \Delta \mathbf{p}$$
   因为 $w_0 = 0$，左塔锚点 $\mathbf{p}_0$ 加上 $0 \cdot \Delta\mathbf{p}$ 永远纹丝不动（实测误差 `0.000000 u`），而第 $1$ 号节点则承担 $100\%$ 的拉回修正！
3. **对称正逆双向扫描（Forward + Backward Symmetric Sweep）**：
   如果只从左往右（$0 \to N-1$）单向扫描，左塔的拉力总是先于右塔生效，会导致悬链向左偏斜。在每一遍（Sweep）中**先执行 $0 \to N-1$ 正向投影，紧接着执行 $N-1 \to 0$ 逆向投影**，即可保证左右完全对称！

---

## ③ 🧭 直观可视化图解（Mermaid 决策树、管线对比与帧级时序）

### 3.1 柔体绳索与布料仿真架构师选型决策树（`flowchart TD`）

```mermaid
flowchart TD
    Start[需要在 3D 场景中渲染悬挂绳索 / 丝带 / 布料横幅] --> Q1{场景是否包含动态风力 / 集中配重或碰撞交互?}
    Q1 -->|否: 纯静态均匀自重悬垂线| CoshPath[采用双曲余弦 y = a cosh x/a 牛顿法求根]
    Q1 -->|是: 需要实时响应载荷变化 / 移动锚点或碰撞| Q2{是否需要拟合真实纺织物非线性应力应变测量数据?}

    Q2 -->|标准不可伸长绳缆 / 飘带 / 游戏与数字孪生实时动效| GsPath[采用对称多遍 Gauss-Seidel 原地距离约束投影 PBD / XPBD]
    Q2 -->|高精虚拟试衣与非线性超弹性生物软组织| GenPbdPath[采用 Generalized PBD arXiv:2511.23131 隐式内力 Gauss-Seidel]

    GsPath --> Q3{运行在单线程 CPU 还是大规模网格 GPU?}
    Q3 -->|CPU / WebAssembly 链式或中小网格| InPlaceTyped[使用预分配 Float64Array 正逆双向原地扫描 + SOR 超松弛]
    Q3 -->|GPU 万级三角形布料网格| RedBlackGpu[使用图着色红黑分组 Graph-Colored Gauss-Seidel 并行核]
```

### 3.2 单遍并行 Jacobi 松弛（橡皮筋下垂）vs 对称多遍 Gauss-Seidel 投影管线对比（`flowchart LR`）

```mermaid
flowchart LR
    subgraph JacobiPipeline[错误基线: 单遍并行 Jacobi 松弛导致严重橡皮筋下垂]
        direction TB
        J1[重力拉拽内部节点 1..11 下沉] --> J2[单遍读取旧坐标缓冲并行求平均修正]
        J2 --> J3[数值波速仅 1 节/遍: 跨中节点完全感受不到双塔固定拉力]
        J3 --> J4[结果: 单节拉长 0.1459 u, 总长从 9.60 u 暴涨至 10.12 u!]
    end

    subgraph GsPipeline[正确管线: 对称多遍 Gauss-Seidel 原地距离约束投影]
        direction TB
        G1[锁死双塔锚点逆质量 w_0 = w_12 = 0] --> G2[正向 0..11 + 逆向 11..0 原地立即覆写 Float64Array]
        G2 --> G3[配合 SOR 超松弛因子将锚点张力瞬间传遍全部 12 节连杆]
        G3 --> G4[结果: 总长锁死 9.6089 u, 单节误差仅 0.0036 u, 双塔零滑移!]
    end
```

### 3.3 帧级悬链约束求解与跨中配重计核验时序图（`sequenceDiagram`）

```mermaid
sequenceDiagram
    participant UI as 载荷控制器 / 动画时钟
    participant Solver as 悬链约束求解器 (model.ts)
    participant Buf as 预分配 Float64Array(13)
    participant GL as Three.js WebGL2 3D 双塔悬链台

    UI->>Solver: 传入重力载荷 gravityLoad = 2.6 与模式 gauss-seidel-multi
    Solver->>Buf: 写入重力预测初值并设逆质量 w_0 = w_12 = 0, w_1..11 = 1
    loop 64 遍对称正逆向 Gauss-Seidel 扫描
        Solver->>Buf: Forward Sweep (i = 0..11): 原地投影 p_i, p_{i+1} 至距离 L_0 = 0.80 u
        Solver->>Buf: Backward Sweep (i = 11..0): 原地逆向投影消除左右不对称
    end
    Buf-->>Solver: 汇总 12 节实际总长 (9.6089 u) 与跨中节点高程 Y
    Solver->>GL: 更新 13 颗节点球、12 根连杆四元数与跨中配重计矩阵并渲染
```

---

## ④ 📊 视觉技术选型决策矩阵（Architect Decision Matrix）

| 评估维度 | 原地对称 Gauss-Seidel (`gauss-seidel-multi`) | 对象分配 Gauss-Seidel (`Object-Cloned` 基线) | 单遍并行 Jacobi (`single-pass-jacobi`) | 全局隐式 Newton-Raphson FEM |
| :--- | :--- | :--- | :--- | :--- |
| **载荷 `2.6` 下 12 节悬链总长** | **`9.6089 u`（静止总长 `9.6000 u`）** | `9.6089 u`（数值完全一致） | `10.1220 u`（额外拉长 **`+0.5220 u`**） | `9.6000 u` |
| **单节连杆最大拉伸误差** | **`0.003602 u`（`< 0.45%`）** | `0.003602 u` | **`0.1459 u`（误差放大 40.5 倍）** | `< 1e-6 u` |
| **双塔固定锚点滑移量** | **`0.000000 u`（逆质量 $w=0$ 锁死）** | `0.000000 u` | `0.000000 u` | 取决于罚函数或拉格朗日乘子 |
| **每遍迭代堆内存分配（GC）** | **`0` 个临时对象（纯 `Float64Array` 原地读写）** | 每遍分配 `24` 个 `{x,y,z}` 对象 | 需额外分配双缓冲累加数组 | 需分配稀疏海森矩阵 $\mathbf{H}$ |
| **1,024 次求解 CPU 中位耗时** | **`77.00 ms`** | `89.32 ms`（GC 与属性寻址开销） | `1.95 ms`（虽快但严重拉伸下垂） | `~650 ms`（稀疏矩阵分解） |
| **架构师工程推荐等级** | **实时绳缆、飘带、软管、旗帜首选方案** | 严禁在内层循环分配对象 | **严禁用于定长悬挂物仿真** | 仅用于离线工程结构力学分析 |

---

## ⑤ 🧪 全新能力展示 Demo 与 Benchmark 核心发现（含 7-Card 报告）

### 5.1 交互式 12 节双塔 3D 悬链约束检验台（`demos/catenary-constraint-rig/`）

本轮新增独立可交互 3D WebGL2 实验台 **[`demos/catenary-constraint-rig/`](../demos/catenary-constraint-rig/index.html)**（共 **48 个 3D 实体部件**）：
- **左右双塔锚定立柱（$x = \pm 4.0\text{ u}, y = 3.2\text{ u}$）与跨中配重计**：实时对 12 节悬链施加 `0.6 ~ 4.2` 可调重力载荷；
- **前景活动悬链（12 根圆柱连杆 + 13 颗节点球）与后排灰色基准悬链**：在 `gauss-seidel-multi` 模式下，前景悬链紧贴定长包络线（总长 `9.6089 u`）；切换到 `single-pass-jacobi` 模式时，前景悬链立刻因跨中张力缺失而变成品红色并向下剧烈坠落至 `10.1220 u`！
- **原子化参数校验与契约导出**：自动拦截越界遍数（如 `sweeps = 2`）并保留原有效状态，支持一键导出 `CATENARY_CONSTRAINT_SPEC.json`。

| 亮色主题 — 对称多遍 Gauss-Seidel（`9.61 u` 定长） | 亮色主题 — 单遍 Jacobi 松弛（拉长至 `10.12 u`） |
| :---: | :---: |
| ![亮色主题 Gauss-Seidel 悬链](evidence/catenary-constraint-rig/light-gauss-seidel-multi.png) | ![亮色主题单遍 Jacobi 下垂](evidence/catenary-constraint-rig/light-single-pass-jacobi.png) |

| 暗色主题 — 对称多遍 Gauss-Seidel（`9.61 u` 定长） | 暗色主题 — 单遍 Jacobi 松弛（拉长至 `10.12 u`） |
| :---: | :---: |
| ![暗色主题 Gauss-Seidel 悬链](evidence/catenary-constraint-rig/dark-gauss-seidel-multi.png) | ![暗色主题单遍 Jacobi 下垂](evidence/catenary-constraint-rig/dark-single-pass-jacobi.png) |

### 5.2 7-Card 4:5 视觉评测报告与封存数据链接

- 📊 **英文版 7-Card 4:5 评测报告**：[`demos/catenary-constraint-rig/test-report-cards.html`](../demos/catenary-constraint-rig/test-report-cards.html)
- 📊 **中文版 7-Card 4:5 评测报告**：[`demos/catenary-constraint-rig/test-report-cards.zh.html`](../demos/catenary-constraint-rig/test-report-cards.zh.html)
- 📁 **封存评测数据源**：[`demos/catenary-constraint-rig/report.json`](../demos/catenary-constraint-rig/report.json)（`13 / 13` 项确定性检查全部通过，Playwright 零控制台/页面错误）。

---

## ⑥ 🛠️ 附录：高质量视觉/动画交付快速核验清单（Architect Checklist）

在交付任何包含绳索、电缆、丝带、披风或软体悬挂结构的 3D 场景前，请逐项核验以下清单：

- [ ] **逆质量锚点编码（$w_{\text{pin}} = 0$）**：固定锚点是否通过设置逆质量 $w_i = 0$ 直接融入通用约束公式，确保锚点位移恒为 `0.000000 u`？
- [ ] **原地更新（In-Place Gauss-Seidel）**：第 $i$ 节约束算出的新坐标是否**立即写回当前位置数组**供第 $i+1$ 节约束读取（切勿像 Jacobi 那样写进新数组等整遍结束再拷贝）？
- [ ] **正逆双向对称扫描（Forward + Backward Sweep）**：在双端固定的悬链或对称布料上，每次迭代是否交替执行 `0 -> N-1` 与 `N-1 -> 0` 扫描以消除单向遍历引起的不对称偏斜？
- [ ] **内层循环零对象分配（Zero Heap Allocation）**：约束求解内层循环是否全部运行在预分配的 `Float32Array` / `Float64Array` 上，杜绝在 `sweeps × segments` 循环内执行 `new Vector3()`？
- [ ] **柔度与子步解耦（XPBD Compliance）**：若需要可调的物理弹性，是否已按 XPBD 引入时间步长归一化的柔度项 $\tilde{\alpha} = \alpha / \Delta t^2$，防止修改帧率或迭代次数时绳索软硬度突变？

---

## 参考文献与延伸阅读（References）

1. **Generalized PBD (2025)**: Rahul Narain et al., *"Towards Generalized Position-Based Dynamics"*, [`arXiv:2511.23131`](https://arxiv.org/abs/2511.23131).
2. **XPBD (MIG 2016)**: Miles Macklin, Matthias Müller, and Nuttapong Chentanez, *"XPBD: Position-Based Simulation of Compliant Constrained Dynamics"*, ACM MIG 2016.
3. **Substepped PBD (SCA 2019)**: Miles Macklin et al., *"Small Steps in Physics Simulation"*, ACM SIGGRAPH / Eurographics Symposium on Computer Animation 2019.
