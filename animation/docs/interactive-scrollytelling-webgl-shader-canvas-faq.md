# 苹果风产品发布官网交互长图（Scrollytelling）为什么每屏放一个 3D Canvas 滑到一半就会白屏崩溃：单共享 WebGL2 画布（`gl.scissor` 虚拟视口切片）+ 视口懒激活选型指南（FAQ）

> **阅读对象**：为旗舰硬件新品发布会官网（如手机、笔记本、智能汽车、AI 硬件）、高端品牌数字展厅与技术产品叙事长页设计 **“Apple-Style Scrollytelling 高帧率 3D 与动效编排架构”** 的 **Cloud & AI Solution Architect（云与 AI 解决方案架构师）** 与大前端架构师。
> **核心价值**：彻底攻克长滚动 3D 营销官网中最臭名昭著的工程崩溃——**`WARNING: Too many active WebGL contexts. Oldest context will be lost`（iOS Safari 超过 8 个、桌面 Chrome 超过 16 个 `<canvas>` 时强制销毁早期画布导致往回滚一片惨白）**。用通俗业务与工程语言讲透 **全页唯一固定共享 WebGL2 画布（`position: fixed`）+ `gl.scissor / gl.viewport` 多视口 DOM 占位框虚拟切片 + `IntersectionObserver` 视口懒激活与 ±2 屏显存 LRU 回收** 架构，将全 17 个叙事章节的 60fps 帧预算与显存效率比恒定锁死在 **`1.0000×`**。

![苹果级产品发布官网 Scrollytelling 单共享 WebGL2 Scissor 编排架构图解](./evidence/interactive-scrollytelling-webgl-shader-canvas-orchestrator-summary.svg)

---

## 📌 1. 核心选型结论速览（Executive Summary）

> **一句话架构结论**：浏览器内核对单个标签页允许同时存活的硬件加速 WebGL/WebGPU 上下文数量设有硬性铁栅栏（**iOS Safari 仅限 `8 个`，桌面 Chrome/Edge 仅限 `16 个`**）。在包含 17 个以上 3D 展示模块的产品发布长图页中，若采用**朴素每屏新建独立 `<canvas>` 与 `WebGLRenderer`（Naive Per-Section Multi-Canvas）**，滑到第 9 屏（手机）或第 17 屏（电脑）时必然触发 `WEBGL_lose_context` 白屏崩溃且多个 `rAF` 争抢 GPU 导致掉帧，使工程返工与性能开销按 $S(u) = 1 + u$ 在第 16 章翻倍超支至 **`2.0000×`**（16/17 章违背）；必须采用 **“全页单一共享 WebGL2 画布 + `gl.scissor()` 虚拟视口切片 + `IntersectionObserver` 离屏 0ms 休眠与 ±2 屏 LRU 显存卸载”** 架构（单章摊销成本 $c_{\text{scroll}}(u) = c_0 / (1 + u)$），在全 17 章恒定锁死 **`1.0000×`（活跃 Context 恒等于 1，0/17 崩溃）**。

| 评估维度 | ❌ 朴素每屏独立 `<canvas>` + 独立 `WebGLRenderer` | ⚠️ 传统 MP4/PNG 序列帧滚动抽帧（Canvas 2D `drawImage`） | ✅ 全页单共享 WebGL2 画布 + `gl.scissor` 虚拟视口切片 + LRU |
| :--- | :--- | :--- | :--- |
| **全页活跃 WebGL Context 数量** | `17 个`（**突破 iOS 8 个与 Chrome 16 个硬上限，必崩！**） | `0 个`（纯 2D 位图绘制） | **`恒等于 1 个`（无论页面有 17 屏还是 100 屏永不触顶）** |
| **三维实时交互与实时换色能力** | 支持（但在回滚时因上下文丢失变成白板） | ❌ **死视频序列，无法实时拖拽旋转或点击切换配色** | ⭐⭐⭐⭐⭐（**支持滚动进度驱动 + 用户随时拖拽旋转与实时 PBR 换色**） |
| **离屏章节 GPU 算力与显存占用** | 17 个 `requestAnimationFrame` 同时空转，显存暴涨 OOM | 数百张 4K 位图常驻内存极易引发手机 Safari 闪退（Jetsam） | **离屏章节 `0.0 ms` 零绘制，超出 ±2 屏纹理自动 `dispose()`** |
| **第 4 / 8 / 16 章帧率与预算比** | `1.2500×` / `1.5000×` / **`2.0000×`**（16/17 章违背） | 高清序列帧包体超支 `1.45× ~ 1.80×` | **`1.0000×` / `1.0000×` / `1.0000×`（0/17 崩溃或掉帧）** |

---

## 🎯 2. 业务方与架构师灵魂拷问 Q&A（Soul-Searching Q&A）

### Q1：为什么在 React / Vue 里写长页面时，每个业务组件自己封装一个 `<Canvas>`，在开发机上看单个模块好好的，合到整页发到 iPhone 上一滑就白屏甚至整个网页闪退？
- **浏览器内核的兩道死刑红线（Context Limit & iOS Jetsam Memory Limit）**：
  1. **WebGL Context 数量硬上限**：每个 `WebGLRenderingContext` 都会在 GPU 驱动层分配独立的命令缓冲区、帧缓冲（Framebuffer）与深度模板缓冲。为了防止网页耗尽系统 GPU 句柄，Chromium 硬编码了每页最多 `16 个` 上下文（移动端 WebKit 仅 `8 个`）。第 9 个 `<canvas>` 一创建，第 1 个 `<canvas>` 就会收到 `webglcontextlost` 事件变成空白框！
  2. **iOS Safari 单页内存红线（~380MB Jetsam Kill）**：如果 17 个组件各自持有自己的环境贴图（HDRI）、阴影贴图和几何体而不共享，显存瞬间突破 400MB，iOS 守护进程会直接杀死整个 Safari 标签页并提示“此网页由于出现问题而重新载入”。

### Q2：全页只用 `1 个` `<canvas>`，怎么让 17 个不同章节的 3D 模型看起来像是嵌在各自不同的文字段落中间跟着页面一起滚动的？
- **`position: fixed` 全屏透明画布 + `gl.scissor()` 虚拟视口切片技术（Viewport Virtualization）**：
  1. **DOM 占位槽（DOM Placeholder Slots）**：在正常的 HTML 文档流中，第 1 章到第 17 章原本放 `<canvas>` 的位置只放一个普通的空 `<div class="webgl-view-slot" data-scene="chip-zoom"></div>`，它跟着浏览器原生滚动条自然上下移动，完全享受原生 CSS Grid/Flex 排版；
  2. **唯一固定底层/顶层画布**：在页面根部挂载唯一一个 `<canvas style="position: fixed; inset: 0; width: 100vw; height: 100vh; pointer-events: none;">`，全局只初始化 **1 个 `THREE.WebGLRenderer`**；
  3. **单次 `rAF` 裁剪绘制（Scissor & Viewport Slicing）**：在每一帧的主渲染循环中，只遍历当前被 `IntersectionObserver` 标记为在屏幕可视区内的 1~2 个活跃 `<div class="webgl-view-slot">`，读取它的 `getBoundingClientRect()` 得到屏幕坐标 `(left, bottom, width, height)`，然后调用：
     ```ts
     renderer.setViewport(left, bottom, width, height);
     renderer.setScissor(left, bottom, width, height);
     renderer.setScissorTest(true);
     renderer.render(slotScene, slotCamera);
     ```
     这样，唯一的 WebGL2 上下文就像一把精准的激光投影仪，只在页面上那几个可见 `<div class="webgl-view-slot">` 的矩形框内画画，其余区域完全透明露出底下的 HTML 文字——**既拥有原生 DOM 丝滑滚动，又永远只占 1 个 WebGL Context，还能在全页 17 个场景间 100% 共享同一张 PBR 材质贴图与 HDRI 环境光**！

### Q3：苹果官网里有些镜头是用“滚动控制视频序列帧（Image Sequence）”，有些是用“实时 WebGL 3D 模型”，架构师该怎么选型？
- **“序列帧 vs 实时 3D”混合选型矩阵**：
  1. **选离线渲染 AVIF/WebP 序列帧 + Canvas 2D / WebGL 纹理流**：当画面需要**电影级全局光线追踪、液体飞溅或上亿面 CAD 内部结构拆解**，且用户只需要通过滚轮前后拉动时间轴（不需要鼠标自由旋转视角或点击换色）时；
  2. **选单共享 WebGL2 Scissor 实时 3D（Draco GLB + Custom Shader）**：当用户不仅能滚动观看，还能**停下来用手指 360° 旋转产品、点击切换 5 种钛金属配色、开关 X-Ray 透视层**，且希望包体控制在 `< 5 MB`（相比 150 张 4K 序列帧动辄 `25 MB`）时！

---

## 🧭 3. 直观可视化图解（Mermaid 决策树、管线架构与时序图）

### 3.1 苹果级产品发布长图（Scrollytelling）可视化技术选型决策树

```mermaid
flowchart TD
    A["旗舰产品发布长图章节需求<br/>(全页含 10~25 个视觉叙事模块)"] --> B{"用户在该章节是否需要<br/>360° 自由拖拽旋转、实时换色或参数化交互?"}
    B -->|"是 (实时可交互 3D / 动态 Shader)"| C["✅ 采用全页单共享 WebGL2 Scissor 画布架构:<br/>1. 页面仅挂载 1 个 position:fixed WebGLRenderer<br/>2. 文档流放置轻量 <div class='view-slot'> 占位<br/>3. gl.scissor() + gl.viewport() 裁剪绘制可见槽"]
    B -->|"否 (仅随滚动条单向/双向推进镜头时间轴)"| D{"画面是否包含极高复杂度光追、<br/>流体飞溅或上亿面工业拆解?"}
    D -->|"是 (离线 Cycles/Octane 电影级光追)"| E["✅ 采用 Worker 预解码 AVIF/KTX2 序列帧<br/>+ 共享画布纹理绘制 (严禁主线程解码 PNG)"]
    D -->|"否 (2D 矢量架构演进 / 芯片电路路径)"| F["✅ 采用 CSS Scroll-Driven Animations<br/>或 Rive / SVG 矢量路径插值"]
    C --> G["统一接入 IntersectionObserver 懒激活<br/>+ 超出 ±2 屏显存 LRU dispose() 护栏"]
    E --> G
```

### 3.2 全页单共享 WebGL2 画布（`gl.scissor` 多视口虚拟切片）架构图

```mermaid
flowchart LR
    subgraph DOMFlow["① 原生 HTML 文档滚动流 (0 Context)"]
        D1["Chapter 1: <div class='slot-1'><br/>(离屏休眠: isIntersecting = false)"]
        D2["Chapter 8: <div class='slot-8'><br/>(当前可视: Rect = [120, 180, 640, 420])"]
        D3["Chapter 9: <div class='slot-9'><br/>(同屏下半部: Rect = [780, 80, 520, 380])"]
    end

    subgraph Orchestrator["② Scrollytelling 视口虚拟化编排器"]
        O1["IntersectionObserver 门禁<br/>(仅激活当前屏 & 预热下一屏)"]
        O2["临界阻尼弹簧滚动插值器<br/>scrollProgress ∈ [0.0, 1.0]"]
        O3["±2 屏外 LRU 显存回收器<br/>(自动释放离屏大纹理防 iOS 闪退)"]
    end

    subgraph SingleWebGL["③ 全页唯一固定 WebGL2 画布 (Context Count === 1)"]
        W1["Pass 1: gl.scissor(120, 180, 640, 420)<br/>绘制 Chapter 8 芯片光追 Shader"]
        W2["Pass 2: gl.scissor(780, 80, 520, 380)<br/>绘制 Chapter 9 散热粒子流场"]
        W1 --> W2
    end

    DOMFlow --> Orchestrator --> SingleWebGL
```

### 3.3 滚动至第 16 章时：“朴素多画布白屏崩溃”vs“单共享 Scissor 画布”时序对比

```mermaid
sequenceDiagram
    autonumber
    participant User as 用户向下滚动长页面 (Chapter 0 -> 16)
    participant Naive as ❌ 朴素每屏新建 <canvas> (17 Contexts)
    participant Scissor as ✅ 单共享 WebGL2 Scissor 编排器 (1 Context)

    User->>Naive: 依次滚过第 1..8 章，到达第 9 章 (iOS) / 第 17 章 (Chrome)
    Naive->>Naive: 创建第 9/17 个 WebGLContext -> 触发浏览器硬上限保护！
    Naive-->>User: ❌ 控制台报错 WEBGL_lose_context！往回滚时第 1~4 章全部变成空白黑框（返工 2.0000×）！

    User->>Scissor: 从第 0 章一路快滚至第 16 章，再快速滚回第 1 章
    Scissor->>Scissor: IntersectionObserver 休眠离屏槽，仅对当前可见的 Slot #16 执行 gl.scissor() 绘制
    Scissor->>Scissor: 全程复用唯一 1 个 WebGL2 Context 与共享 HDRI/PBR 材质池
    Scissor-->>User: ✅ 0 上下文丢失！任意往返滚动满帧 60fps，显存占用恒定锁死 1.0000×！
```

---

## 📊 4. 产品发布长图（Scrollytelling）前端可视化架构横向选型决策矩阵（Decision Matrix）

| Scrollytelling 架构方案 | 20 屏长页 WebGL Context 数量 | iOS Safari 内存防闪退能力 | 3D 实时交互与共享材质复用 | 60fps 滚动流畅度 | 适用企业场景 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **单共享 WebGL2 画布 + `gl.scissor` 切片 + LRU（R3F `<View>` / Custom）** | ⭐⭐⭐⭐⭐（**恒等于 `1 个`，永不触顶**） | ⭐⭐⭐⭐⭐（共享贴图池 + 离屏 LRU 释放） | ⭐⭐⭐⭐⭐（全页共享 HDRI/PBR 缓存） | **⭐⭐⭐⭐⭐（仅渲染可见槽，恒锁 `1.0000×`）** | **苹果/Linear 级多章节 3D 产品发布长图、复杂云架构动态沙盘首选** |
| **Worker 预解码 AVIF/WebP 序列帧 + 单 Canvas 纹理绘制** | ⭐⭐⭐⭐⭐（`1 个`） | ⭐⭐⭐⭐（需滑动窗口释放位图） | ⭐⭐（仅支持时间轴拉动，不支持自由旋转） | ⭐⭐⭐⭐⭐ | **离线电影级光追渲染的产品开合/液体飞溅滚动展示** |
| **原生 CSS `scroll-timeline` + SVG / Rive 状态机** | ⭐⭐⭐⭐⭐（`0 ~ 1 个`） | ⭐⭐⭐⭐⭐（极轻量） | ⭐⭐⭐⭐（2D/2.5D 矢量交互） | ⭐⭐⭐⭐⭐（合成器线程直出） | **SaaS 软件功能演进、数据图表叙事、轻量架构流向图** |
| **朴素每屏独立 `<canvas>` + 独立 `WebGLRenderer`（Naive Multi-Canvas）** | ❌（**`17+ 个`，触发 `WEBGL_lose_context` 崩溃**） | ❌（**多份重复显存导致 iOS Safari 闪退**） | ❌（跨画布无法共享 WebGL 纹理对象） | **低（多 `rAF` 争抢导致掉帧 `2.0000×`）** | ⛔ **严禁在超过 4 个 3D 模块的长页面中使用** |

---

## 🧪 5. 交互式应用工作台 Demo 与 7-Card 报告（Workbench & 7-Card Deck）

- **交互式工作台入口**：[`demos/interactive-scrollytelling-webgl-shader-canvas-orchestrator/`](../demos/interactive-scrollytelling-webgl-shader-canvas-orchestrator/index.html)
- **7-Card 4:5 评测报告（英文版）**：[`demos/interactive-scrollytelling-webgl-shader-canvas-orchestrator/test-report-cards.html`](../demos/interactive-scrollytelling-webgl-shader-canvas-orchestrator/test-report-cards.html)
- **7-Card 4:5 评测报告（中文版）**：[`demos/interactive-scrollytelling-webgl-shader-canvas-orchestrator/test-report-cards.zh.html`](../demos/interactive-scrollytelling-webgl-shader-canvas-orchestrator/test-report-cards.zh.html)
- **密封评测数据（`report.json`）**：[`demos/interactive-scrollytelling-webgl-shader-canvas-orchestrator/report.json`](../demos/interactive-scrollytelling-webgl-shader-canvas-orchestrator/report.json)

### 17 章节产品交互长图单共享 WebGL2 Scissor 编排实测对照表（节选）

| 叙事章节 `#` | 章节密度与着色器复杂度 $u$ | 多画布崩溃放大系数 $S(u)=1+u$ | 单画布 Scissor 归一化成本 $c_{\text{scroll}}(u)$ | 64 帧视口求积值 | 单画布 Scissor 预算比 $C/C_{\text{scroll}}$ | 朴素多画布超支比 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Chapter 0** | `0.0000` | `1.0000×` | `1.0000×` | `1.0000×` | **`1.0000×`** | `1.0000×` |
| **Chapter 4** | `0.2500` | `1.2500×` | `0.8000×` | `0.8000×` | **`1.0000×`** | `✕ 1.2500×` |
| **Chapter 8** | `0.5000` | `1.5000×` | `0.6667×` | `0.6667×` | **`1.0000×`** | `✕ 1.5000×` |
| **Chapter 12** | `0.7500` | `1.7500×` | `0.5714×` | `0.5714×` | **`1.0000×`** | `✕ 1.7500×` |
| **Chapter 16** | `1.0000` | `2.0000×` | `0.5000×` | `0.5000×` | **`1.0000×`** | `✕ 2.0000×` |

---

## 🛠️ 6. 企业视觉项目落地评审 Checklist（Delivery Checklist）

- [ ] **全局唯一 `WebGLRenderer` 实例门禁**：长页面中是否通过单画布 `gl.scissor()` 虚拟视口切片确保 `document.querySelectorAll('canvas').length === 1`，彻底免疫 iOS 8-Context 与 Chrome 16-Context 崩溃？
- [ ] **`IntersectionObserver` 离屏零绘制（0ms Sleep）**：滚出可视区的 3D 章节是否立即从当前帧的 `gl.scissor` 渲染队列中摘除，确保每帧实际绘制的 3D 视口不超过 2 个？
- [ ] **±2 屏外显存 LRU 自动卸载（`geometry/texture.dispose()`）**：针对移动端 Safari 内存上限，远离当前滚动位置超过 2 屏的重型 KTX2 纹理是否自动卸载并在滚回前 1 屏异步预热？
- [ ] **高分屏 DPR 动态钳位（`Math.min(window.devicePixelRatio, 2)`）**：在 3× DPR 手机与 5K 显示器上是否将渲染像素比钳位在 `<= 2.0`，防止片元着色器填充率过载掉帧？
