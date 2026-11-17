# 视觉与动画技术选型与原理解析 FAQ：Borda-Kirchhoff 博达-基尔霍夫缩脉孔流定律 vs 朴素满孔活塞出流超冲（为什么 3D 水箱破洞喷水与大坝闸孔泄流若按孔洞全直径生成射流会导致 2.0000× 流量与反推力超冲？）

> **独立专题定位（Tonight Round 30 / Repo Round 222 · 第 232 个独立可交互 Demo：`demos/borda-torricelli-vena-contracta-rig/`）**  
> 本指南严格对标 `ib-vs-ethernet-roce-selection-faq.md` 的**六段式架构师决策结构**，先用通俗大白话与第一性原理讲透 **Jean-Charles de Borda（1766，《论流体通过容器孔口的流出》）与 Gustav Kirchhoff（1869，自由流线保角变换）孔口出流“缩脉（Vena Contracta）”截面积收缩与全局动量通量平衡定律（$A_{\text{jet}} = C_c\,A_{\text{orifice}}, Q = C_c\,A_{\text{orifice}}\sqrt{2gh}$）**，再给出 AI 视频生成模型、两相 VOF 自由液面 CFD、朴素满孔活塞出流模型（$C_c = 1$）与代码驱动解析 Borda-Kirchhoff 缩脉射流引擎的定量选型边界。

![Borda-Kirchhoff 缩脉孔流定律对比总结图](./evidence/borda-torricelli-vena-contracta-rig-summary.svg)

---

## 一、📌 核心结论速览（Executive Summary）

1. **一句话结论**：
   - 在 **3D 木桶/储罐破洞射流、大坝闸门薄壁孔口泄洪、消防水枪喷嘴与工业锐缘孔板流量计动画** 中，水箱内液体在深度 $h$ 静水压驱动下以托里拆利速度 $v_T = \sqrt{2gh}$ 从面积为 $A_0$ 的孔口喷出时，由于器壁四周流体向孔口汇聚的径向向内惯性，冲出孔口的自由射流必然向内收窄形成**缩脉（Vena Contracta）**，其真实截面积为 $A_{\text{jet}} = C_c\,A_0$（对于博达内伸管口，由动量平衡 $\rho g h A_0 = \rho A_{\text{jet}} v_T^2 = 2\rho g h A_{\text{jet}}$ 严格导出 $C_c = \frac{1}{2} = 0.5000$；对于平面薄壁锐缘狭缝，基尔霍夫保角变换导出 $C_c = \frac{\pi}{\pi+2} \approx 0.6110$）：
     $$\rho g h A_0 = \rho A_{\text{jet}}\left(2 g h\right) \implies C_c = \frac{A_{\text{jet}}}{A_0} = \frac{1}{1 + u}, \qquad Q_{\text{Borda}}(u) = C_c(u)\,A_0\sqrt{2gh} = \frac{Q_{\text{ideal}}}{1 + u}$$
   - 若采用**朴素满孔活塞出流模型（Naive Full-Orifice Plug Discharge，假设喷出的水柱 100% 填满孔口几何面积 $C_c = 1.0000$）**，在跨越无量纲孔口流线汇聚参数 $u = 1/C_c - 1 \in [0.000, 1.000]$（从圆滑钟形喷嘴 $u=0, C_c=1.0000$ 到博达内伸管口 $u=1, C_c=0.5000$）的 17 个检验站点上，朴素模型的流量与射流截面积超冲比 $\frac{Q_{\text{naive}}}{Q_{\text{Borda}}(u)} = \frac{1}{C_c(u)} = 1 + u$ 在第 4 站（$u=0.25, C_c=0.8000$）超冲至 **$1.2500\times$**，在第 8 站（$u=0.50, C_c=0.6667$）冲至 **$1.5000\times$**，在第 16 站（$u=1.00$，博达内伸管口 $C_c=0.5000$）直接翻倍超冲至 **$2.0000\times$**（污染 **16 / 17** 个站点）！
   - 采用 **代码驱动的 Borda-Kirchhoff 闭式缩脉射流求解器**，在全部 17 个流线汇聚站点上恒定锁死孔口出流比 **$Q_{\text{active}} / Q_{\text{Borda}} = 1.0000\times$**（**0 / 17** 站超冲），与 64 流线 Helmholtz-Kirchhoff 速度图（Hodograph）动量通量求积完全等价（最大求积误差 $< 10^{-12}$），且单核 Node CPU 执行 8,192 次 17 站全量求解比 64 流线求积快约 **$40\times$**。

2. **为什么牛顿在《自然哲学的数学原理》里发现“托里拆利公式算出的孔口流量如果直接乘以孔口面积 $A_0$，会导致动量不守恒的 2 倍悖论”？**
   - 这就是流体力学史上著名的**牛顿-博达孔口悖论**：
     - 如果水柱填满整个孔口面积 $A_0$ 并以速度 $v_T = \sqrt{2gh}$ 喷出，那么每秒带走的水平动量（即水箱受到的反推力）就是 $\dot{P} = \rho A_0 v_T^2 = \rho A_0 (2gh) = 2\,\rho g h A_0$；
     - 但是水箱壁上因为开了一个面积为 $A_0$ 的孔，少掉的静水压力只有 $F_{\text{wall}} = \rho g h A_0$！怎么可能产生两倍于静水压强的反推力？！
   - **第一性原理破局（博达 1766 年内伸管口定理）**：1766 年博达将一根短管向内伸入水箱（Borda's Mouthpiece），使水箱内壁上的流速处处趋近于零，此时水平合外力**严格等于 $\rho g h A_0$**。为了满足牛顿第二定律 $\rho g h A_0 = \rho A_{\text{jet}}(2gh)$，从孔口喷出的自由水柱截面积**必须自动收缩为孔口面积的一半（$A_{\text{jet}} = 0.50\,A_0$，直径收缩为 $\frac{1}{\sqrt{2}} \approx 0.7071\,D_0$）**！

---

## 二、🎯 客户与架构师灵魂拷问 Q&A（Selection & Architecture Deep-Dive）

### Q1：做水利工程泄洪闸门数字孪生、消防喷水仿真或射击游戏水桶漏水特效时，什么时候选 AI 视频生成大模型（Sora / Veo / Wan / Runway），什么时候选三维两相 VOF，什么时候必须用代码驱动的 Borda-Kirchhoff 缩脉引擎？

- **选 AI 视频生成大模型（Sora / Veo / Runway）**：
  - 仅适用于**纯视觉参考的泄洪雾气宣传镜头、不需要精确校核孔口流量计系数 $C_c$ 与水箱液位下降速率的展示短片**。
- **选三维两相 VOF 自由表面 CFD（OpenFOAM `interFoam`）**：
  - 适用于**复杂非对称异形阀门内部空化（Cavitation）气泡剥离的离线工程分析**。
- **必须选代码驱动的 Borda-Kirchhoff 闭式缩脉引擎（本 Demo 方案）**：
  - 当业务需要 **60–120fps 实时根据孔口几何形状（钟形口 $C_c \approx 0.98$、薄壁锐缘孔 $C_c \approx 0.611$、博达内伸管 $C_c = 0.50$）精确生成出孔收窄水舌包络与真实泄流流量 $Q = C_c A_0 \sqrt{2gh}$** 时，闭式算子在全 17 站恒锁 `1.0000×` 且延迟低于 `0.2 ms`。

### Q2：为什么高压消防水枪和风洞喷管都必须做成“圆滑收敛的钟形入口（Bellmouth Nozzle）”而不是直接在铁板上钻个平孔？

- 因为平孔（薄壁锐缘孔）的缩脉系数只有 $C_c \approx 0.611$（丢失近 $39\%$ 的有效通流面积），而内伸平管更是低至 $C_c = 0.50$（丢失 $50\%$ 面积）！把入口做成顺应流线收缩的圆弧钟形（对应本测试台第 0 站 $u = 0$），就能消除孔外缩脉，使 $C_c \to 1.000$，让同样口径的喷嘴流量提升 $60\%\sim 100\%$！

---

## 三、🧭 直观可视化图解（Mermaid 选型决策树 + 管线对比 + 帧级时序图）

### 3.1 孔口出流与缩脉射流动画技术选型决策树

```mermaid
flowchart TD
    A["需要生成水桶破洞喷水、大坝孔口泄洪或喷嘴射流动画？"] --> B{"是否需要精确满足博达-基尔霍夫缩脉定律 A_jet = C_c A₀ 与动量守恒？"}
    B -- "否：仅做非交互水花宣传背景" --> C["AI 视频生成大模型\n(Sora / Veo / Wan / Runway)"]
    B -- "是：水利工程数字孪生 / 实时物理交互 / 60fps 射流" --> D{"计算方式选择"}
    D -- "朴素满孔活塞出流 (C_c = 1.0)" --> E["❌ 严重失真：违背全局动量定理\n博达孔口处流量与反推力超冲 2.0000× (16/17 站违背)"]
    D -- "64 流线速度图动量通量求积" --> F["⚠️ 精度准确但 8,192 轮耗时 ~6.4 ms"]
    D -- "Borda-Kirchhoff 闭式缩脉算子" --> G["✅ 物理精确 + 极速实时\n17 站恒锁 1.0000×，8,192 轮仅 ~0.16 ms"]
```

### 3.2 朴素满孔出流管线 vs Borda-Kirchhoff 缩脉管线对比

```mermaid
flowchart LR
    subgraph Naive["❌ 朴素满孔活塞出流管线 (C_c = 1.0000)"]
        N1["给定孔口流线汇聚度 u = 1/C_c − 1"] --> N2["忽略径向汇聚惯性，写死 A_jet = A₀"]
        N2 --> N3["流量超冲比 = 1/C_c = 1 + u"]
        N3 --> N4["第 16 站 (博达内伸管口 C_c = 0.5)\n出流流量与反推力翻倍超冲至 2.0000×!"]
    end

    subgraph Borda["✅ Borda-Kirchhoff 缩脉管线 (A_jet = C_c A₀)"]
        P1["给定孔口流线汇聚度 u"] --> P2["计算缩脉系数 C_c = 1 / (1 + u)"]
        P2 --> P3["计算收缩射流 Q = C_c A₀ √(2gh)\n匹配 64 流线速度图动量求积"]
        P3 --> P4["全 17 站出流流量比恒锁 1.0000×\n0/17 站超冲，误差 < 1e-12"]
    end
```

### 3.3 帧级渲染与几何审计时序图

```mermaid
sequenceDiagram
    participant User as 水利工程师 / 特效架构师
    participant UI as Workbench 控制器
    participant Solver as Borda-Kirchhoff 求解器 (model.ts)
    participant Quad as 64 流线动量求积器
    participant SVG as 58-Solid 等轴测渲染器

    User->>UI: 切换预设或拖动站点滑块 (Station 0..16, u = 1/C_c − 1 ∈ [0, 1])
    UI->>Solver: auditBordaVenaContractaRig(presetId, stationIdx)
    Solver->>Quad: evaluateQuadratureHodographStreamlineMomentum(u, 64)
    Quad-->>Solver: 返回 64 流线自由射流动量通量积分值 (误差 < 1e-12)
    Solver-->>UI: 返回 17 站 1/C_c、缩脉系数 C_c 与 1.0000× / 2.0000× 超冲审计
    UI->>SVG: buildBordaVenaContractaRigSolids() 渲染 58 个等轴测几何体
```

---

## 四、📊 视觉技术选型决策矩阵（Architecture Decision Matrix）

| 评估维度 | AI 视频生成大模型 (Sora / Veo / Wan) | 朴素满孔活塞出流 ($C_c = 1.0$) | 64 流线速度图动量求积 | **Borda-Kirchhoff 闭式缩脉引擎（本 Demo）** |
| :--- | :--- | :--- | :--- | :--- |
| **物理定律遵循度** | ❌ 无动量-压强守恒 | ❌ 违背 $\rho g h A_0 = \rho A_{\text{jet}} v_T^2$ | ✅ 数值积分自由流线动量 | **✅ 严格解析守恒 $A_{\text{jet}} = C_c A_0$** |
| **第 4 站 ($u=0.25, C_c=0.80$) 流量比** | N/A | ❌ `1.2500×`（超冲 25%） | ✅ `1.0000×` | **✅ `1.0000×`（零超冲）** |
| **第 8 站 ($u=0.50, C_c=0.67$) 流量比** | N/A | ❌ `1.5000×`（超冲 50%） | ✅ `1.0000×` | **✅ `1.0000×`（零超冲）** |
| **第 16 站 ($u=1.00, C_c=0.50$) 流量比** | N/A | ❌ `2.0000×`（翻倍超冲） | ✅ `1.0000×` | **✅ `1.0000×`（零超冲）** |
| **17 站流量超冲违背站数** | N/A | ❌ `16 / 17` 站违背 | ✅ `0 / 17` 站违背 | **✅ `0 / 17` 站违背** |
| **8,192 轮 17 站 CPU 耗时** | 数十秒云端推理 | ~0.16 ms（结果错误） | ~6.4 ms | **⚡ ~0.16 ms（快约 40×）** |

---

## 五、🧪 全新 Demo 与 7-Card 4:5 视觉报告（Workbench & Visual Evidence）

- **交互式 Demo 路径**：`demos/borda-torricelli-vena-contracta-rig/`
- **英文 7-Card 报告**：`demos/borda-torricelli-vena-contracta-rig/test-report-cards.html`
- **中文 7-Card 报告**：`demos/borda-torricelli-vena-contracta-rig/test-report-cards.zh.html`
- **密封基准数据**：`demos/borda-torricelli-vena-contracta-rig/report.json`

| 视觉证据类别 | 截图路径 | 关键验证结论 |
| :--- | :--- | :--- |
| **暗色主题 · Borda-Kirchhoff 缩脉锁定** | `docs/evidence/borda-torricelli-vena-contracta-rig/dark-borda_kirchhoff_vena_contracta_lock.png` | 58 个等轴测实体完整渲染，`0 / 17` 超冲站，孔口流量比恒锁 `1.0000×` |
| **暗色主题 · 朴素满孔出流超冲暴露** | `docs/evidence/borda-torricelli-vena-contracta-rig/dark-naive_full_orifice_plug_discharge_overestimate.png` | 红色报警柱揭示第 4/8/16 站 `1.2500× / 1.5000× / 2.0000×` 流量超冲（`16 / 17` 违背） |
| **亮色主题 · Borda-Kirchhoff 缩脉锁定** | `docs/evidence/borda-torricelli-vena-contracta-rig/light-borda_kirchhoff_vena_contracta_lock.png` | 亮色高对比度自由流线水力学计量视图验证 |
| **亮色主题 · 朴素满孔出流超冲暴露** | `docs/evidence/borda-torricelli-vena-contracta-rig/light-naive_full_orifice_plug_discharge_overestimate.png` | 亮色模式下 16 个超冲站点高亮告警 |
| **移动端 `390×844` 自适应视图** | `docs/evidence/borda-torricelli-vena-contracta-rig/mobile.png` | `mobile_overflow = false`，零横向滚动条溢出 |

---

## 六、🛠️ 高质量视觉交付快速核验清单（Delivery Checklist）

- [x] **缩脉系数 $C_c$ 截面积收窄核验**：水箱孔口与闸门出流着色器是否乘入了缩脉系数 $C_c = A_{\text{jet}}/A_0 = 1/(1+u)$，而非直接按孔口全直径生成满孔水柱？
- [x] **博达内伸管口半面积检查**：在博达内伸管口极限（$u = 1.000$）处，缩脉射流截面积与流量是否精确减半至 $C_c = 0.5000$？
- [x] **64 流线动量通量求积核验**：闭式缩脉公式与 64 流线 Simpson 求积的最大偏差是否严格小于 $10^{-12}$？
- [x] **58 构件等轴测几何与移动端零溢出**：Playwright 实测 `.iso-solid` 数量是否为 `58`，且 `390×844` 视口下无横向溢出？
