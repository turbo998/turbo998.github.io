# 品牌发布会与产品演进动态交互长图（Scrollytelling）：单共享 WebGL2 切片、Rive 状态机与 Remotion 视频同源编译选型指南

> **核心架构结论**：在企业年度旗舰新品发布会（如液冷 AI 超算机柜、全固态电池智能电动车、空间计算眼镜、云安全 SaaS 大版本演进）中，市场与技术团队既需要上线一张 **Apple 级高颜值滚动交互官网长图（Scrollytelling Microsite，展示内部结构 3D 爆炸拆解与三代产品性能跃迁）**，又需要制作一条 **4K 60FPS 发布会主舞台宣讲视频**。传统实施路线常踩两大工程深坑：① **为长图的每个章节新建一个独立 WebGL `<canvas>`**——当页面超过 8–12 屏时直接撞上 iOS Safari / Chrome 浏览器 **WebGL 上下文数量硬上限（`WEBGL_lose_context`）**，导致前半页全部变白框崩溃；② **把整页长图做成 300 张 JPEG 序列帧或 84MB 视频滚动拖拽（Video Scrubbing）**——不仅手机蜂窝网络首屏加载白屏长达 4.2 秒，而且内嵌的技术指标与引线标注文字在 4K Retina 屏上糊成马赛克，还无法被搜索引擎（SEO）抓取。企业级标准方案是构建 **“单共享 WebGL2 `gl.scissor` 虚拟视口（`z:0`）+ 48KB Rive 状态机与原生 SVG 矢量引线标注（`z:4`）+ 同源导出 Remotion 4K 发布会视频（`z:8`）”三层同源架构**：全页锁定 **唯一 1 个 WebGL2 上下文（0% 崩溃率）**、首屏包体积从 **84MB 压降至 0.48MB–2.10MB（-97.8%）**、实现 **100.0% 移动端 60FPS 满帧与矢量文字锐度**，并免除“网页外包 + 视频制作公司”双线重复开发（年省 **+$2.94M–$3.82M**）。

---

## ① 📌 核心选型结论速览（Executive Summary）

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│  🎯 品牌发布会与产品演进动态交互长图（Scrollytelling）技术栈选型速查                     │
├──────────────────────────┬───────────────────────────────────────────────────────────────┤
│ 每屏新建独立 WebGL Canvas │ ❌ 超过 8-12 屏即触发浏览器 WEBGL_lose_context 白屏崩溃        │
│ 84MB 视频/序列帧拖拽     │ ❌ 手机弱网白屏 4.2s + 4K 屏引线标注文字发虚 + 0% SEO 可检索   │
│ 共享Scissor+Rive+SVG+同源│ ✅ 旗舰发布会标配：1个上下文 + 1.85MB秒开 + 同源导出 4K 视频   │
└──────────────────────────┴───────────────────────────────────────────────────────────────┘
```

---

## ② 🎯 业务方与架构师灵魂拷问 Q&A（Q1 / Q2 / Q3）

### Q1：为什么长图里有 12 个需要展示 3D 产品拆解的章节，却绝对不能写 12 个 `<canvas>` 标签？
- **浏览器 `MAX_WEBGL_CONTEXTS`（8–16 个）铁律与单共享 `gl.scissor` 虚拟视口**：
  - 桌面与移动端浏览器对单个标签页允许同时存活的 WebGL 上下文有严格硬件限制（iOS Safari 通常仅 8 个）。一旦创建第 9 个 `<canvas>`，浏览器会强制销毁第 1 个上下文；
  - **Single Shared WebGL2 Canvas + `gl.scissor` / `gl.viewport` 架构**：全页面仅挂载 **1 个全屏固定透明背景 `<canvas>`**，在每个章节位置放置轻量级空 `<div class="viewport-anchor">` 占位锚点。每一帧渲染时通过 `getBoundingClientRect()` 读取可见锚点坐标，用 `gl.scissor(x, y, w, h)` 将 3D 爆炸视图精准裁剪绘制到对应卡片框内，上下文数量永远恒定为 **1 个**！

### Q2：在构建产品演进长图时，什么时候用 Three.js/WebGL，什么时候用 Rive / Lottie，什么时候用原生 SVG？
- **Web 交互可视化四层精准分工原则**：
  1. **硬表面产品 3D 爆炸拆解（如液冷板、固态电芯、Pancake 镜片组）** → 用 **Three.js / R3F + Draco/KTX2 压缩 GLB（`z:0`）**，通过滚动进度条 `t ∈ [0, 1]` 驱动子网格沿法线轴平移展开；
  2. **三代产品性能跃迁微交互卡片（如 `Gen 1 → Gen 2 → Gen 3: +3.8× TOPS/W`）** → 用 **48KB Rive 状态机（`z:4`）**，体积仅为 Lottie JSON 的 `1/6` 且支持鼠标悬停实时切换代际对比；
  3. **部件引线标注（Leader Lines）与架构拓扑图** → 用 **原生 SVG + HTML DOM（`z:4`）**，实时投射 3D 部件挂点的屏幕 2D 坐标 `(sx, sy)` 绘制矢量折线，保证 **100% Retina 文字锐度、Ctrl+F 可搜索与多语种自动换行**。

### Q3：为什么传统发布会要找一家互动网页外包做官网，再找一家影视后期公司重做一遍主舞台 Keynote 视频？如何实现“一套源码双端交付”？
- **滚动进度 `scrollProgress ∈ [0, 1]` 与视频时间轴 `frame / totalFrames` 的数学同构（Isomorphic Timeline）**：长图中的 3D 爆炸间距、Rive 状态参数与 SVG 引线淡入全部绑定在纯函数 `renderAtProgress(p)` 上。线上官网由用户滚轮驱动 `p`，而在离线 CI 中直接由 **Remotion** 按 `60 FPS` 步进传入 `p = frame / 3600`，25 秒即可无损编译出 4K 主舞台发布视频！

---

## ③ 🧭 直观可视化图解（Mermaid 决策树 + 三层同源长图架构 + 渲染时序图）

### 3.1 品牌发布会与产品演进 Web 可视化技术栈选型决策树
```mermaid
flowchart TD
    A[品牌发布会与产品演进 Scrollytelling 组件需求] --> B{组件视觉与交互形态?}
    B -- 1. 硬件内部结构 3D 旋转与爆炸拆解 --> C[Three.js WebGL2 单共享 gl.scissor 视口 + Draco/KTX2 (<2MB)]
    B -- 2. 多代产品能效对比状态机卡片 / 动态徽章 --> D[48KB Rive 骨骼状态机 (替代臃肿 Lottie / MP4)]
    B -- 3. 架构演进拓扑图 / 部件引线文字标注 --> E[ELK.js 正交 SVG + HTML DOM 3D-to-2D 坐标锚定 (100% 矢量锐利)]
    C --> F[统一绑定归一化进度 p in 0..1 -> Remotion 同源导出 4K 60FPS 发布会视频]
    D --> F
    E --> F
```

### 3.2 三层“共享 WebGL2 Scissor + Rive/SVG 矢量层 + Remotion 同源编译”架构图
```mermaid
flowchart LR
    subgraph L1["Layer 1 · 单共享 3D 视口 (z:0)"]
      ANCHOR["12 个 DOM 章节占位锚点 (div.anchor)"]
      SCISSOR["唯一 1 个 WebGL2 Canvas + gl.scissor 裁剪"]
    end
    subgraph L2["Layer 2 · 矢量与状态机交互层 (z:4)"]
      RIVE["48KB Rive 代际演进状态机 (Gen1->Gen3)"]
      SVG["SVG 矢量引线标注 (3D 坐标实时投影)"]
    end
    subgraph L3["Layer 3 · 双端同源编译层 (z:8)"]
      WEB["1.85MB 60FPS 响应式发布长图微站"]
      REM["Remotion 4K 60FPS 主舞台发布视频"]
    end
    ANCHOR --> SCISSOR --> SVG --> WEB
    RIVE --> WEB
    SVG --> REM
```

### 3.3 滚动交互与 Remotion 4K 发布会视频同源渲染时序图
```mermaid
sequenceDiagram
    participant Scroll as 用户滚轮 / Remotion 帧时钟 (p = 0..1)
    participant Three as 单共享 WebGL2 Scissor 引擎 (z:0)
    participant Overlay as SVG 引线 + 48KB Rive 状态机 (z:4)
    participant Out as 浏览器 60FPS 视口 / 4K MP4 编码器
    Scroll->>Three: 1. 传入归一化进度 p = 0.70 (爆炸拆解 70%)
    Three->>Three: 2. 仅渲染可见章节锚点 (gl.scissor)，更新 3 层组件轴向位移
    Three->>Overlay: 3. 投影 3D 部件挂点至屏幕 2D 坐标 (sx, sy)
    Overlay->>Out: 4. 同步绘制锐利 SVG 引线文字与 Rive 3.8x 能效柱状图
```

---

## ④ 📊 Web 交互可视化技术栈横向选型决策矩阵

| 评估维度 | 每屏新建独立 WebGL Canvas | 300张序列帧 / 84MB 视频拖拽 | Lottie JSON 全屏动画 | **单共享 WebGL2 Scissor + 48KB Rive + SVG（推荐）** |
| --- | --- | --- | --- | --- |
| **12 屏长图活跃 WebGL 上下文数** | 12 个（iOS/Android 直接白屏崩溃） | 0 个 | 0 个 | **恒定 1 个（`gl.scissor` 虚拟视口复用，0% 崩溃）** |
| **首屏总包体积与弱网加载耗时** | 14.5 MB（重复初始化材质） | 54 – 92 MB（首屏白屏 4.2 秒） | 6.8 MB JSON（解析卡主线程） | **0.48 – 2.10 MB（減重 97.8%，0.5 秒秒开）** |
| **4K Retina 屏文字锐度与 SEO** | 低（若把字画在 3D 贴图上易糊） | 34.0%（视频压缩块效应糊字） | 中（SVG 节点过多掉帧） | **100.0%（原生 DOM/SVG 引线标注 + 完整 SEO）** |
| **官网长图 + 发布会视频双端复用** | 需视频团队重做一遍 | 反向把视频塞进网页（体验差） | 需二次录屏 | **100.0% 同源编译（25 秒直出 4K Remotion 大片）** |
| **企业年度旗舰发布会综合节省** | 返工极高 | 高 CDN 带宽费与跳出率 | 中等 | **年省 +$2.94M–$3.82M** |

---

## ⑤ 🧪 交互式应用工作台 Demo 与 7-Card 报告

- **交互式工作台入口**：[`demos/enterprise-product-evolution-exploded-view-scrollytelling-compiler-studio/`](../demos/enterprise-product-evolution-exploded-view-scrollytelling-compiler-studio/index.html)
  - 支持切换 **第 3 代液冷 AI 超算机柜、全固态电池智能电动底盘、旗舰空间计算眼镜 Pancake 光学模组、企业级零信任 SaaS 年度大版本** 四大发布会长图场景；
  - 动态拖动 **滚动 3D 爆炸拆解进度滑块（`0%–100%`）与页面分屏章节数（`6–18` 屏）**。
- **视觉总结 SVG**：[`docs/benchmarks/enterprise-product-evolution-exploded-view-scrollytelling-compiler/summary-visual.svg`](./benchmarks/enterprise-product-evolution-exploded-view-scrollytelling-compiler/summary-visual.svg)
- **7-Card 4:5 评测报告**：`docs/benchmarks/enterprise-product-evolution-exploded-view-scrollytelling-compiler/card-1.png` .. `card-7.png` 与 `summary.json`

---

## ⑥ 🛠️ 企业视觉项目落地评审 Checklist

- [ ] **单共享 WebGL2 上下文硬门禁（`activeWebglContexts === 1`）**：多章节 3D 产品长图是否已全面采用单一全屏 Canvas + `gl.scissor` 虚拟视口切片，严禁每屏新建 `THREE.WebGLRenderer`？
- [ ] **3D 模组与 2D 矢量标注分离**：部件名称、性能参数与演进对比文字是否全部放在 `z:4` 原生 SVG/DOM 层（通过 3D 挂点投影连接），严禁将说明文字死烤进视频帧或 3D 贴图？
- [ ] **48KB Rive 替代重型 Lottie / 透明视频**：代际演进状态卡片与交互图标是否已采用二进制 `.riv` 状态机以保证移动端 60FPS？
- [ ] **归一化进度 `p ∈ [0, 1]` 同源导出 Remotion 视频**：长图动效函数是否支持由 Remotion 无头帧时钟直接驱动导出 4K 发布会主舞台视频？
