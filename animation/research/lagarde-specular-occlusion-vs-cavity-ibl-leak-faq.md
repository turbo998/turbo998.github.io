# 视觉与动画技术选型与原理解析 FAQ：Lagarde Frostbite 视角粗糙度耦合高光遮蔽（Specular Occlusion）vs 朴素未遮蔽 IBL 深腔反光泄漏

> **核心架构结论一句话总结**：在实时 PBR 基于图像照明（Image-Based Lighting, IBL）与环境反射探针渲染管线（Unreal Engine 5、Frostbite、Unity HDRP）中，**严禁只将环境光遮蔽（Ambient Occlusion, $AO$）乘在漫反射项上而让环境镜面高光（Specular IBL）完全不受遮蔽（$SO = 1.0$），或反过来盲目令 $SO = AO$**！实测表明：在深腔环境遮蔽 $AO = 0.25$、表面粗糙度 $r = 0.25$ 的 17 个视角余弦站点（$N\cdot V \in [0.05, 0.85]$）上，朴素未遮蔽 IBL 高光恒定输出 $SO = 1.0000$，在第 0 站掠射角（$N\cdot V = 0.05$）处产生高达 **`+0.7869`（`4.69×` 过冲）的放射性深腔蓝天反光泄漏（污染全部 `17/17` 个站点，使角色鼻孔、腋下、汽车轮拱与机甲深缝泛出诡异的金属白边）**；而采用 **Sébastien Lagarde & Charles de Rousiers (SIGGRAPH 2014 Frostbite PBR) 提出的视角-粗糙度耦合高光遮蔽公式 $SO = \text{clamp}((N\cdot V + AO)^{\exp_2(-16r - 1)} - 1 + AO, 0, 1)$**，可在第 0 站掠射角将高光遮蔽收紧至 **`SO = 0.2131`**（比漫反射 $AO = 0.25$ 更严密地压住腔壁地平线漏光，**`0/17` 漏光站点**），同时在光滑正视角下自动恢复通透倒影，且闭式幂律比 64 步可见锥数值求积快 **4.24×**（8,192 轮耗时 `2.10 ms` vs `8.92 ms`）。

![Lagarde Frostbite 视角粗糙度耦合高光遮蔽 vs 朴素未遮蔽 IBL 深腔反光泄漏总结图](./evidence/specular-occlusion-cavity-rig-summary.svg)

---

## ① 📌 核心结论速览（Executive Summary）

1. **为什么许多 3D 角色、跑车或机甲模型放进户外天空盒（IBL Cubemap）里时，虽然美术师烘焙了非常精细的 AO 贴图，角色鼻孔、嘴角、腋下、衣服褶皱和轮胎轮拱的漫反射确实变暗了，但一旦转动视角到侧面掠射角，这些本该伸手不见五指的暗缝边缘却会冒出一圈刺眼的“蓝天白云反光（Glowing Cavity Rim）”？**
   用大白话讲：因为**菲涅尔效应（Fresnel Effect）在掠射角会把反射率推向 $100\%$，而你的着色器忘了用 AO 去拦截环境镜面反射**！
   - 环境光遮蔽 $AO \in [0, 1]$ 定义的是上半球余弦加权的平均可见比例，直接乘在漫反射 $L_{\text{diffuse}} \leftarrow AO \cdot L_{\text{diffuse}}$ 上在物理上是准确的；
   - 但对于**镜面反射 $L_{\text{specular}}$**，很多初级 PBR 教程写着“AO 是漫反射概念，不能乘在高光上”，于是直接令高光遮蔽因子 $SO = 1.0000$！
   - 后果是灾难性的：在鼻孔或装甲深缝内部（$AO = 0.25$，即 $75\%$ 的天空都被周围凸起的肉或装甲挡住了），当视线处于掠射角（第 0 站 $N\cdot V = 0.05$）时，反射向量 $\mathbf{R}$ 几乎贴着腔壁水平擦过去——在真实物理中，这条反射光线 $100\%$ 会撞在旁边的腔壁上被挡死；但未遮蔽的 IBL 却直接去采样了无遮挡的无限远天空盒，输出 **`SO = 1.0000`（比真实可见度 `0.2131` 暴增 `4.69×`，多出 `+0.7869` 的刺眼漏光）**！
2. **反过来，为什么也不能简单粗暴地令 $SO = AO$（直接把漫反射 AO 乘在镜面反射上）？**
   - 想象一个躺在凹槽底部的光滑小镜子（粗糙度 $r = 0.05$，周围腔壁挡住了半边天 $AO = 0.50$）：当你从正上方低头垂直往下看它（$N\cdot V = 0.95$）时，极窄的镜面反射锥笔直朝向头顶正上方的凹槽开口，**它看到的头顶天空 $100\%$ 没有被挡住（真实 $SO \approx 0.98$）**！
   - 如果粗暴地乘以 $AO = 0.50$，就会把正视角下原本清澈明亮的金属/水面反射强行涂黑一半！
3. **第一性原理破局：将视角余弦 $N\cdot V$、漫反射 $AO$ 与粗糙度 $r$ 三者耦合的闭式幂律（Lagarde & de Rousiers SIGGRAPH 2014）**：
   - 真正的镜面遮蔽 $SO$ 取决于**“可见立体角锥（由 $AO$ 决定开口大小）”与“GGX 反射波瓣锥（由 $N\cdot V$ 决定倾角、由粗糙度 $r$ 决定张角）”的交集面积**：
     1. 当视线趋近掠射角（$N\cdot V \to 0$）时，反射锥压向最容易被遮挡的地平线，因此 $SO$ 必须比 $AO$ 更小（在 $N\cdot V = 0.05, AO = 0.25, r = 0.25$ 时压低至 **`0.2131`**）；
     2. 当视线趋近正视角（$N\cdot V \to 1$）且表面越光滑（$r \to 0$）时，极窄的反射波瓣穿过头顶开口，$SO$ 迅速向 `1.0` 靠拢；
     3. 当表面完全粗糙（$r \to 1$）时，镜面波瓣退化为整个半球，$SO$ 平滑收敛回漫反射 $AO$！
   - Sébastien Lagarde 与 Charles de Rousiers 在 Frostbite 引擎中给出了满足上述全部物理边界条件的经典闭式公式：
     $$SO(N\cdot V, AO, r) = \text{clamp}\!\left( (N\cdot V + AO)^{\exp_2(-16r - 1)} - 1 + AO,\; 0.0,\; 1.0 \right)$$
   - 仅需 4 条着色器指令，即可在全 17 个视角站彻底消除深腔掠射反光泄漏（**`0/17` 漏光站点**），且比 64 步可见锥积分快 **4.24×**！
4. **本轮新增交互式 3D 试验台与实测证据**：
   - 新增独立 Demo：`demos/specular-occlusion-cavity-rig/`（58 个 Three.js 实体部件：底座平台、4 支柱、漫反射 `0.2500` 遮蔽基准横梁、17 根实测高光遮蔽立柱、17 颗 Lagarde 耦合参考球、17 根深腔漏光过冲指示销、以及第 $i$ 站深腔反射计滑车）。
   - 配套 7-Card 4:5 测评报告：`demos/specular-occlusion-cavity-rig/test-report-cards.html`（英文）与 `test-report-cards.zh.html`（中文）。

---

## ② 🎯 客户与架构师灵魂拷问 Q&A（Soul-Searching Q&A）

### Q1：公式里的指数 $\exp_2(-16r - 1)$ 是怎么定出来的？
**它是对球冠可见锥（Spherical Cap Visibility Cone）与 GGX 波瓣在不同粗糙度 $r \in [0, 1]$ 下数值积分曲线的精确解析拟合！**
- 当 $r = 0.00$（完美镜面）时，指数 $p = 2^{-1} = 0.50$，此时 $SO = \sqrt{N\cdot V + AO} - 1 + AO$，只要 $N\cdot V$ 稍大就能快速恢复高光；
- 当 $r = 0.25$（半光泽车漆/皮肤）时，指数 $p = 2^{-5} = 0.03125$，在掠射角 $N\cdot V = 0.05$ 处输出 `0.2131` 严密阻断腔壁地平线漏光；
- 当 $r = 1.00$（完全粗糙）时，指数 $p = 2^{-17} \approx 0$，$(N\cdot V + AO)^0 = 1 \implies SO = 1 - 1 + AO = AO$，与漫反射遮蔽完美衔接！

### Q2：如果项目里不仅有标量 AO，还烘焙了弯曲法线（Bent Normal $\mathbf{n}_{\text{bent}}$）或 GTAO 方向遮蔽，应该怎么升级？
**当拥有 Bent Normal 时，可以将 Lagarde 闭式标量公式升级为“球冠-反射锥相交（ Jiménez SIGGRAPH 2016 Specular AO Cone Intersection）”！**
但在绝大多数使用单通道烘焙 AO 贴图 + SSAO 的实时渲染管线中，Lagarde 公式无需额外纹理通道，仅靠现有的 `(N·V, AO, r)` 三个标量就能解决 95% 以上的深腔漏光问题！

### Q3：这套确定性 Lagarde 高光遮蔽与 AI 神经环境光遮蔽（Neural AO / Deep Screen-Space GI）是什么关系？
**即使上游用神经网络预测了屏幕空间 AO，下游合成 IBL 镜面反射时仍然必须经过 Lagarde `computeSpecularOcclusion` 公式转换：**
因为神经网络输出的标量 AO 依然是半球漫反射遮蔽度，直接不转换就无法随视角 $N\cdot V$ 和材质粗糙度 $r$ 正确压制掠射角镜面漏光。

---

## ③ 🧭 直观可视化图解（Mermaid 决策树 + 管线对比图 + 帧级时序图）

### 3.1 PBR 环境镜面反射遮蔽（Specular Occlusion）架构选型决策树
```mermaid
flowchart TD
    A["需要将环境光遮蔽 AO 应用于 PBR 基于图像照明 IBL 的镜面反射项?"] --> B{"是否已有硬件光线追踪反射或逐像素 Bent Normal 贴图?"}
    B -- "已开启硬件光追反射 Ray-Traced Reflections" --> C["光追命中测试已天然包含精确几何遮挡"]
    B -- "使用预滤波环境贴图 Split-Sum IBL Cubemap + 标量 AO" --> D{"如何计算镜面高光遮蔽因子 SO?"}
    D -- "对镜面反射不做遮蔽 SO = 1.0" --> E["❌ 深腔放射性漏光: 掠射角 N·V=0.05 处漏出 4.69× 刺眼天空反光, 污染 17/17 站"]
    D -- "直接将漫反射 AO 原样乘在镜面反射上 SO = AO" --> F["⚠️ 掠射角压不住地平线漏光, 正视角又把光滑镜面倒影错误压暗"]
    D -- "Lagarde Frostbite 视角粗糙度耦合公式 SO = clamp N·V+AO ^ exp2 -16r-1 - 1 + AO" --> G["✅ 掠射角压紧至 0.2131 · 光滑正视角自动通透 · 快 4.24×"]
```

### 3.2 朴素未遮蔽 IBL 深腔漏光 vs Lagarde Frostbite 高光遮蔽管线对比图
```mermaid
flowchart LR
    subgraph NaiveIBL["❌ 朴素未遮蔽 IBL 高光 (SO = 1.0000 · 4.69× 深腔漏光)"]
        N1["深腔内部 AO = 0.25, 粗糙度 r = 0.25, 掠射角 N·V = 0.05"] --> N2["仅将 AO=0.25 乘在漫反射上, 镜面反射保持 SO = 1.0000"]
        N2 --> N3["菲涅尔效应在掠射角放大反射, 将头顶蓝天 100% 映入幽暗深缝"]
        N3 --> N4["第 0 站过冲 +0.7869 (4.69× 漏光), 17/17 个视角站全部泛出假白光!"]
    end
    subgraph LagardeSO["✅ Lagarde Frostbite 耦合高光遮蔽 (0 漏光 · 快 4.24×)"]
        L1["计算粗糙度指数 p = 2^(-16*0.25 - 1) = 0.03125"] --> L2["耦合视角余弦与 AO: (N·V + AO)^p - 1 + AO"]
        L2 --> L3["第 0 站掠射角 (N·V=0.05) 自动收紧至 SO = 0.2131 (< AO=0.25)"]
        L3 --> L4["彻底消除暗缝放射性白边, 全 17 站 0 漏光 (与 64 步积分误差 6.22e-15)"]
    end
```

### 3.3 帧级深腔反射计与 3D 试验台渲染时序图
```mermaid
sequenceDiagram
    participant User as 架构师 / Playwright 测试器
    participant Solver as model.ts Lagarde 高光遮蔽内核
    participant Stage as WebGL2 58-Solid 3D 深腔反射计台
    User->>Solver: 设定深腔 AO=0.25, 粗糙度 r=0.25, 检视第 i=0 站掠射角 (N·V=0.05)
    Solver->>Solver: Lagarde 耦合求得 SO = 0.30^0.03125 - 0.75 = 0.2131
    Solver->>Solver: 对比未遮蔽 IBL 基线 -> SO_naive = 1.0000 (+0.7869 / 4.69× 深腔漏光)
    Solver-->>Stage: 返回 17 个视角站的高光遮蔽因子与深腔漏光过冲遥测
    Stage-->>User: 驱动 17 根高光遮蔽立柱、17 颗 Lagarde 参考球、17 根漏光销与滑车同步渲染
```

---

## ④ 📊 视觉技术选型决策矩阵（Decision Matrix）

| 评估维度 | ✅ Lagarde Frostbite 闭式高光遮蔽 | ⚠️ 64 步可见锥幂积分（64-Step Cone Quadrature） | ❌ 朴素未遮蔽 IBL 高光（$SO = 1.0$） | ⚠️ 直接乘漫反射 AO（$SO = AO$） |
| :--- | :--- | :--- | :--- | :--- |
| **第 0 站（$N\cdot V=0.05$ 掠射角）高光遮蔽** | **严密收紧至 `0.2131`（阻断腔壁漏光）** | `0.2131`（误差 `6.22e-15`） | **`1.0000`（4.69× 放射性深腔漏光！）** | `0.2500`（未考虑掠射角地平线遮挡） |
| **光滑镜面（$r=0.05$）正视角（$N\cdot V=0.90$）表现** | **自动放开至 `0.81+`（保留清澈倒影）** | 自动放开 | `1.0000` | **错误锁死在 `0.2500`（镜面被涂黑）** |
| **粗糙表面（$r=1.00$）与漫反射一致性** | **精确退化为 $SO = AO = 0.2500$** | 精确退化为 $AO$ | 仍为 `1.0000` | `0.2500` |
| **深腔漏光污染站点（共 17 站）** | **`0 / 17`（全视角零漏光）** | `0 / 17` | **`17 / 17`（全站泛出蓝天反光）** | 正视角与掠射角双向失真 |
| **8,192 轮 17 站 CPU 批处理耗时** | **`2.10 ms`（最快，4.24× 提速）** | `8.92 ms`（慢 4.24×） | `0.32 ms`（严重漏光伪影不可用） | `0.35 ms`（光滑金属质感尽失） |
| **首选适用场景** | **所有实时 PBR 角色、载具、武器与建筑 IBL 管线** | 离线真值核验 | **严禁用于任何带凹槽的 3D 模型** | 仅限 $r \to 1$ 的极粗糙表面 |

---

## ⑤ 🧪 全新 Demo 与 7-Card 4:5 视觉报告（Live Workbench & Evidence）

### 5.1 交互式 3D 试验台与报告入口
- **实时 3D 工作台**：[`demos/specular-occlusion-cavity-rig/index.html`](../demos/specular-occlusion-cavity-rig/index.html)
- **7-Card 4:5 英文视觉测试报告**：[`demos/specular-occlusion-cavity-rig/test-report-cards.html`](../demos/specular-occlusion-cavity-rig/test-report-cards.html)
- **7-Card 4:5 中文视觉测试报告**：[`demos/specular-occlusion-cavity-rig/test-report-cards.zh.html`](../demos/specular-occlusion-cavity-rig/test-report-cards.zh.html)
- **密封测量 JSON 数据源**：[`demos/specular-occlusion-cavity-rig/report.json`](../demos/specular-occlusion-cavity-rig/report.json)

### 5.2 多主题与多模式 Playwright 实测截图证据

| Lagarde 高光遮蔽（Light · 在第 0 站掠射角收紧至 `0.2131`，压制深腔发光白边） | 朴素未遮蔽 IBL 高光（Light · 全 17 站冲顶 `1.0000`，泄漏 `+0.7869` 刺眼深腔反光） |
| :---: | :---: |
| ![Lagarde 高光遮蔽亮色实测图](./evidence/specular-occlusion-cavity-rig/light-lagarde-frostbite-specular-occlusion.png) | ![朴素未遮蔽 IBL 漏光亮色实测图](./evidence/specular-occlusion-cavity-rig/light-naive-unoccluded-ibl-specular.png) |

| Lagarde 高光遮蔽（Dark · 58 实体部件） | 朴素未遮蔽 IBL 高光（Dark · 17 根红色指示销暴露深腔反光泄漏） |
| :---: | :---: |
| ![Lagarde 高光遮蔽暗色实测图](./evidence/specular-occlusion-cavity-rig/dark-lagarde-frostbite-specular-occlusion.png) | ![朴素未遮蔽 IBL 漏光暗色实测图](./evidence/specular-occlusion-cavity-rig/dark-naive-unoccluded-ibl-specular.png) |

---

## ⑥ 🛠️ 高质量视觉交付快速核验清单（SA Verification Checklist）

在将 PBR 环境光遮蔽（AO / SO）合入生产引擎前，请逐项勾选以下核验清单：

- [ ] **分离求和 IBL 镜面项必须乘以 `computeSpecularOcclusion(NdotV, AO, roughness)`**：核验片元着色器中 `specularIBL *= SO` 是否已接入 Lagarde 公式，杜绝 `SO = 1.0` 的暗缝发光？
- [ ] **合并烘焙贴图 AO 与屏幕空间动态 AO（`AO = min(bakedAO, ssao)`）**：在传入 `computeSpecularOcclusion` 前，是否先取了材质烘焙 AO 与屏幕空间 GTAO/SSAO 的最小值，确保动态接触阴影处也能压住地平线反光？
- [ ] **使用曲率滤波后的有效粗糙度 $r_{\text{AA}}$**：传入 Lagarde 公式的粗糙度 $r$ 是否采用了经过 Kaplanyan 几何曲率滤波与 Toksvig 贴图滤波后的有效粗糙度（参见 Round 71）？
- [ ] **底数非负保底 `max(1e-6, NdotV + AO)`**：在计算幂运算 `pow(NdotV + AO, exp2(-16*r - 1))` 时，是否对底数做了正下界保护，防止法线贴图指向背面（$N\cdot V < 0$）且 $AO \approx 0$ 时触发负底数 `NaN`？
- [ ] **直接光源微阴影（Micro-Shadowing）联动**：对于太阳直射光（Direct Light），是否同步启用了 Chan (2018) 微阴影公式 `visibility *= saturate(NdotL + 2*AO*AO - 1)`，使深缝对直射光与环境光具有一致的遮蔽感？
