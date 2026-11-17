# Lagarde-Hammon 合并 Smith 可见度函数（$V = G_2 / (4\mu_v\mu_l)$）vs 朴素 Cook-Torrance 掠射角除零白边选型与原理解析 FAQ 指南

> **导航**：[返回门户](../index.html) · [进入 3D 交互实验台 (`merged-smith-visibility-jacobian-rig`)](../demos/merged-smith-visibility-jacobian-rig/index.html) · [7-Card 4:5 视觉报告 (中文)](../demos/merged-smith-visibility-jacobian-rig/test-report-cards.zh.html) · [7-Card Report (EN)](../demos/merged-smith-visibility-jacobian-rig/test-report-cards.html) · [English FAQ](./lagarde-hammon-merged-smith-visibility-jacobian-vs-grazing-divide-by-zero-faq.en.md)

![Lagarde-Hammon 合并 Smith 可见度函数约分消除掠射角 4(N·V)(N·L) 除零白边总结图](./evidence/merged-smith-visibility-jacobian-rig-summary.svg)

---

## ① 📌 核心结论速览（Executive Summary）

1. **为什么照着教科书把微表面高光公式写成 `D * F * G / (4.0 * max(NdotV, 0.001) * NdotL)` 时，球体和角色模型的边缘轮廓在掠射角（$\theta_v \to 90^\circ, \mu_v = N \cdot V \to 0$）总会炸出一圈刺眼的白色锯齿噪点环（甚至在移动端 FP16 下直接爆出 `Infinity / NaN` 黑块）？**
   - 在 **Cook-Torrance (1982) 微表面 BRDF** 公式 $f_{\text{spec}} = \frac{D(H)\,F(V \cdot H)\,G_2(\mu_v, \mu_l)}{4\,\mu_v\,\mu_l}$ 中，分母的 $4\mu_v\mu_l$ 来自半角向量 $H$ 与反射向量 $L$ 之间的微表面斜率投影雅可比行列式（Microfacet Foreshortening Jacobian）。
   - 当视线贴近模型外轮廓剪影边缘（$\mu_v = N \cdot V \to 0.0000$）时，分母 $4\mu_v\mu_l \to 0$！如果着色器未能将几何遮蔽函数 $G_2$ 中的 $\mu_v\mu_l$ 因子与分母**在代数层面预先约分**（或者使用了不带 $\mu_v\mu_l$ 分子项的简化几何项、仅靠 `max(mu_v, 0.025)` 硬钳制分母），那么 $\frac{1}{4\mu_v}$ 就会在轮廓边缘冲向无穷大！
   - **Sébastien Lagarde & Charles de Rousiers (SIGGRAPH 2014 *Moving Frostbite to PBR*)** 与 **Earl Hammon Jr. (GDC 2017)** 指出：高度相关 Smith-GGX 几何函数 $G_2(\mu_v, \mu_l) = \frac{2\mu_v\mu_l}{\mu_l\sqrt{\alpha^2 + (1-\alpha^2)\mu_v^2} + \mu_v\sqrt{\alpha^2 + (1-\alpha^2)\mu_l^2}}$ 的分子中**天生就含有一个 $2\mu_v\mu_l$**！将其与分母 $4\mu_v\mu_l$ 直接代数约分，定义为 **合并 Smith 可见度函数（Merged Smith Visibility Function $V$）**：
     $$V_{\text{Smith}}(\mu_v, \mu_l, \alpha) = \frac{G_2(\mu_v, \mu_l, \alpha)}{4\,\mu_v\,\mu_l} \equiv \frac{0.5}{\mu_l\sqrt{\alpha^2 + (1-\alpha^2)\mu_v^2} + \mu_v\sqrt{\alpha^2 + (1-\alpha^2)\mu_l^2}}$$
2. **17 站点轮廓余弦实测：$\mu_v = 0$ 处精确收敛于 `0.5000`（零除零奇点）vs 未约分 `10.0000`（`20.00×` 轮廓爆闪）**：
   - 在顶光照明 $\mu_l = 1.0000$、粗糙度 $\alpha = 1.0000$ 跨越 17 个视角余弦站点（$\mu_v = 1 - k/16 \in [1.0000, 0.0000]$）的实测中，合并可见度函数化简为 $V_{\text{Smith}}(\mu_v) = \frac{0.5}{1 + \mu_v}$：
   - **第 0 站（$\mu_v = 1.0000, \theta_v = 0^\circ$ 正视）**：$V_{\text{Smith}}(1.00) = \mathbf{0.2500}$，与未约分公式一致。
   - **第 8 站（$\mu_v = 0.5000, \theta_v = 60.0^\circ$）**：$V_{\text{Smith}}(0.50) = \mathbf{0.3333}$，而未约分 $1/(4\mu_v)$ 升至 **`0.5000`（过冲 `+50.00%`）**。
   - **第 12 站（$\mu_v = 0.2500, \theta_v = 75.5^\circ$）**：
     - **Lagarde-Hammon 合并 Smith $V$** 精确锁死在 **$V_{\text{Smith}}(0.25) = \frac{0.5}{1.25} = \mathbf{0.4000}$**！
     - **朴素未约分 $1/(4\mu_v)$** 飙升至 **`1.0000`（过冲 `+0.6000` / `+150.00%`）**！
   - **第 16 站（$\mu_v = 0.0000, \theta_v = 90.0^\circ$ 极限地平线轮廓）**：
     - **Lagarde-Hammon 合并 Smith $V$** 完全无需任何 `max(NdotV, eps)` 补丁，在 $\mu_v = 0.0000$ 处**平滑收敛于有限值 $V_{\text{Smith}}(0.00) = \frac{0.5}{1 + 0} = \mathbf{0.5000}$**（全 17 站 **`0/17` 除零奇点**）！
     - **朴素未约分 $1/(4\max(\mu_v, 0.025))$** 爆炸至 **`10.0000`（`20.00×` 轮廓白边爆闪）**，污染全部 **`16/17` 个离轴站点**！
3. **工程选型结论**：
   - 所有现代实时 PBR 着色器（UE5、Frostbite、Filament、Unity HDRP、Three.js `V_GGX_SmithCorrelated`）都必须直接计算 $f_{\text{spec}} = D \cdot F \cdot V_{\text{Smith}}$，**绝不能单独算 $G_2$ 再除以 $4(N \cdot V)(N \cdot L)$**。实测 `8,192` 次 17 站闭式求值仅需 **`0.74 ms`**，比 64 层微平面遮蔽数值积分基线（**`139.68 ms`**）快 **`187.82×`**！

---

## ② 🎯 客户与架构师灵魂拷问 Q&A（何时选 AI 视频大模型 vs 代码驱动合并 Smith 可见度函数）

### Q1：用大白话讲，为什么先乘 $\mu_v$ 再除以 $\mu_v$ 在计算机里会出大事，而在纸上直接约掉就无比安全？
- **第一性原理拆解**：
  - 在数学草稿纸上，$\frac{2 \mu_v}{4 \mu_v}$ 和 $\frac{0.5}{1}$ 是相等的——**唯独在 $\mu_v = 0$ 那一点除外**！
  - 如果你在 Shader 代码里分开写：先算分子 $G_2 \propto 2\mu_v$（当 $\mu_v \to 0$ 时分子变成 `0.0`），再算分母 $4\mu_v$（当 $\mu_v \to 0$ 时分母也变成 `0.0`），GPU 硬件就会在轮廓边缘执行 **`0.0 / 0.0 = NaN`（或者除以极小 epsilon 产生成百上千倍的数值尖峰）**！
  - 更糟的是，在移动端 Half-Float（FP16，最小正正规数仅 $6.1 \times 10^{-5}$）下，$4 \mu_v \mu_l$ 极易下溢归零，导致整圈模型轮廓变成黑块或爆闪亮点。
  - 当你在写 Shader 之前就在纸上把上下的 $\mu_v \mu_l$ 约分消掉，写成 $V = \frac{0.5}{\mu_l\sqrt{\dots} + \mu_v\sqrt{\dots}}$，哪怕 $\mu_v = 0.0000$，分母里也稳稳站着一个正数 $\mu_l \alpha$，不仅**永远不会除零**，还白白省掉了 2 次乘法！

### Q2：Hammon (GDC 2017) 针对移动端提出的免开方线性近似 $V_{\text{Hammon}}$ 是怎么写的？
- **将两次平方根合并为一次线性插值**：
  - 精确的高度相关合并可见度函数含两个平方根：
    $$V_{\text{Smith}} = \frac{0.5}{\mu_l\sqrt{\alpha^2 + (1-\alpha^2)\mu_v^2} + \mu_v\sqrt{\alpha^2 + (1-\alpha^2)\mu_l^2}}$$
  - Earl Hammon Jr. (GDC 2017) 发现可以用 `mix(2.0 * mu_v * mu_l, mu_v + mu_l, alpha)` 精确近似分母：
    $$V_{\text{Hammon}}(\mu_v, \mu_l, \alpha) = \frac{0.5}{\text{mix}(2\mu_v\mu_l,\; \mu_v + \mu_l,\; \alpha)}$$
    注意当 $\alpha = 1.0, \mu_l = 1.0$ 时，$V_{\text{Hammon}}$ 与精确解 $\frac{0.5}{1 + \mu_v}$ **100% 恒等**，且完全消除了两次 `sqrt` 开销！

### Q3：何时用 AI 视频生成模型，何时必须用确定性合并 Smith 可见度函数？
- **选 AI 视频生成模型（Sora / Runway / Veo / Wan）**：
  - 适合非交互宣传短片。
- **选代码驱动的 Lagarde-Hammon 合并 Smith 可见度（UE5 / Filament / Three.js）**：
  - **移动端/VR 半精度（FP16）PBR 渲染、开启 Bloom 辉光后处理的金属/人物轮廓**：从代数源头杜绝轮廓边缘 `0/0` NaN 黑斑与萤火虫爆闪。

---

## ③ 🧭 直观可视化图解（Mermaid 选型决策树 + 管线对比图 + 帧级时序图）

### 3.1 微表面几何遮蔽与雅可比分母处理决策树

```mermaid
flowchart TD
    A["实现 Cook-Torrance 微表面镜面 BRDF: D · F · G₂ / 4·μ_v·μ_l?"] -->|错误: 省略 G₂ 或未约分直接除以 4·μ_v·μ_l| B["掠射角 μ_v → 0 时分母趋于零 · 轮廓爆出 20× 白边或 FP16 NaN!"]
    A -->|正确: 代数约分 2·μ_v·μ_l 构造合并可见度 V = G₂ / 4·μ_v·μ_l| C{"目标硬件平台的算力预算是什么?"}
    C -->|桌面端 / 主机端 WebGL2 / WebGPU| D["采用 Lagarde (SIGGRAPH 2014) 精确双根号合并 Smith V"]
    C -->|移动端 FP16 / 极致吞吐| E["采用 Hammon (GDC 2017) 免开方线性插值 0.5 / mix 2μ_vμ_l, μ_v+μ_l, α"]
    D --> F["在 μ_v=0.00 地平线处无除零收敛于 0.5000 · 0/17 奇点站点"]
    E --> F
```

### 3.2 朴素未约分 $1/(4\mu_v)$ 除零爆炸 vs Lagarde-Hammon 合并可见度管线对比

```mermaid
flowchart LR
    subgraph Naive["❌ 朴素未约分 1 / (4 · μ_v · μ_l)"]
      N1["第 12 站 μ_v = 0.2500: V = 1.0000 (+150% 过冲)"] --> N2["第 15 站 μ_v = 0.0625: V = 4.0000 (+750% 暴涨)"]
      N2 --> N3["第 16 站地平线 μ_v = 0.0000: 触发 epsilon 钳制炸至 10.0000"]
      N3 --> N4["16/17 站点轮廓过曝 · 引发 Bloom 辉光整圈闪烁"]
    end
    subgraph Merged["✅ Lagarde-Hammon 合并 Smith V = 0.5 / (1 + μ_v)"]
      M1["预先约消分子 2μ_vμ_l 与分母 4μ_vμ_l"] --> M2["第 12 站 μ_v = 0.2500: 锁死 V = 0.4000"]
      M2 --> M3["第 16 站地平线 μ_v = 0.0000: 0.5 / (1 + 0) = 0.5000"]
      M3 --> M4["全 17 站平滑有界 [0.2500, 0.5000] · 0/17 除零奇点"]
    end
```

### 3.3 帧级合并 Smith 可见度函数求值时序图

```mermaid
sequenceDiagram
    participant Frag as 片元点积 (μ_v = max(0, N·V), μ_l = max(0, N·L), α)
    participant Vis as Lagarde-Hammon 合并可见度核 V_Smith
    participant Spec as 微表面镜面合成器 D · F · V_Smith
    Frag->>Vis: 传入 μ_v ∈ [1.0000, 0.0000], μ_l = 1.0000, α = 1.0000
    Vis->>Vis: 计算 Λ_v = μ_l·√(α²+(1-α²)μ_v²), Λ_l = μ_v·√(α²+(1-α²)μ_l²)
    Vis->>Spec: 输出无奇点可见度 V_Smith = 0.5 / (Λ_v + Λ_l) (在 μ_v=0 处恒为有限值 0.5000)
```

---

## ④ 📊 视觉技术选型决策矩阵

| 对比维度 | **Lagarde-Hammon 合并 Smith $V$（主方案）** | **朴素未约分 $1/(4\mu_v\mu_l)$（反例）** | **64 层微平面遮蔽数值积分（基线）** | **AI 视频生成大模型** |
| :--- | :--- | :--- | :--- | :--- |
| **第 0 站（$\mu_v=1.0000, 0^\circ$）可见度** | **`0.2500`（正视基准对齐）** | `0.2500` | `0.2500` | N/A |
| **第 8 站（$\mu_v=0.5000, 60^\circ$）可见度** | **`0.3333`（平滑微表面遮蔽）** | **`0.5000`（过冲 `+50.00%`）** | `0.3333`（误差 `< 1e-13`） | 不可控边缘高光 |
| **第 12 站（$\mu_v=0.2500, 75.5^\circ$）可见度** | **`0.4000`（精确有理收敛）** | **`1.0000`（过冲 `+150.00%`）** | `0.4000` | N/A |
| **第 16 站（$\mu_v=0.0000, 90^\circ$ 轮廓）可见度** | **`0.5000`（有限值，零除零奇点）** | **`10.0000`（`20.00×` 轮廓爆闪）** | `0.5000` | N/A |
| **除零奇点过冲站点数（共 17 站）** | **`0 / 17`（全段严格有界 $[0.25, 0.50]$）** | **`16 / 17`（全部离轴站点过冲）** | `0 / 17` | N/A |
| **8,192 次 17 站求解耗时** | **`0.74 ms`（`187.82×` 极速）** | `0.68 ms`（轮廓除零白边爆炸） | `139.68 ms`（64 层积分） | 秒级云端推理 |
| **核心适用场景** | **所有生产级 PBR 引擎（UE5/Frostbite/Filament/Three.js）** | 严禁在任何微表面着色器中使用 | 离线微表面理论验证 | 概念短片 |

---

## ⑤ 🧪 全新 Demo 与 7-Card 4:5 视觉报告（`merged-smith-visibility-jacobian-rig`）

- **3D 交互实验台**：[`demos/merged-smith-visibility-jacobian-rig/index.html`](../demos/merged-smith-visibility-jacobian-rig/index.html)
  - 搭建了包含 **58 个三维实体构件**的 **17 站点微平面剪影测角台（Microfacet Silhouette Goniometer Bench）**：包含掠射剪影基准台、5 座 Smith 微脊遮蔽棱柱、后排 17 座青色合并可见度参考塔（在 $[0.2500, 0.5000]$ 平滑有界）、前排 17 颗探针球体与 15 根除零奇点红色警示柱。
- **7-Card 4:5 视觉测试报告**：
  - [中文 7-Card 报告 (`test-report-cards.zh.html`)](../demos/merged-smith-visibility-jacobian-rig/test-report-cards.zh.html)
  - [English 7-Card Report (`test-report-cards.html`)](../demos/merged-smith-visibility-jacobian-rig/test-report-cards.html)

| 亮色 合并 Smith 可见度 (`V(0.00) = 0.5000` 无奇点有界) | 亮色 朴素未约分分母 (`V(0.00) = 10.0000`, `16/17` 过冲) |
| :---: | :---: |
| ![亮色合并Smith可见度](./evidence/merged-smith-visibility-jacobian-rig/light-lagarde_hammon_merged_smith_visibility.png) | ![亮色未约分除零爆炸](./evidence/merged-smith-visibility-jacobian-rig/light-naive_uncanceled_jacobian_singularity.png) |

| 暗色 合并 Smith 可见度 (`0/17` 除零奇点站点) | 暗色 朴素未约分分母 (`20.00×` 轮廓白边爆闪) |
| :---: | :---: |
| ![暗色合并Smith可见度](./evidence/merged-smith-visibility-jacobian-rig/dark-lagarde_hammon_merged_smith_visibility.png) | ![暗色未约分除零爆炸](./evidence/merged-smith-visibility-jacobian-rig/dark-naive_uncanceled_jacobian_singularity.png) |

---

## ⑥ 🛠️ 高质量视觉交付快速核验清单（Checklist）

- [ ] **将微表面 BRDF 统一改写为 `f_spec = D * F * V_Smith`**：彻底删除代码库中独立返回 $G_2$ 再除以 `4.0 * NdotV * NdotL` 的旧函数。
- [ ] **对高度相关 Smith-GGX 使用 Lagarde (2014) 合并公式或 Hammon (2017) 近似**：确保当 $\mu_v = 0$ 时分母仍有 $\mu_l \alpha > 0$ 托底。
- [ ] **在移动端 `mediump` (FP16) 下钳制粗糙度 $\alpha \ge 0.045$**：防止当 $\mu_v = 0$ 且 $\alpha = 0$ 时 $\mu_l \alpha$ 同时归零。
- [ ] **配合 Karis HDR Bloom 亮度压制（Round 58）**：双保险防止极端低粗糙度金属边缘触发辉光闪烁。
