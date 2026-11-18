# 动势图鉴：创作与重录

[English](./gpt-62-motion-recreations.en.md) · [个人站展页](https://turbo998.github.io/animation/demos/gpt-62-motion/)

三个可环视或跟随镜头的立体场景，加上一段像素街景。每个作品的实时画面、封面和短片都来自同一套场景代码。没有原生文生视频，也没有把原视频嵌入展页。

## 两个模型，两次创作

- 灵感来自 [APPSO《深度实测 GPT-6.2：强是真强，难用也是真难用》](https://mp.weixin.qq.com/s/8rmD4qqEQ-_loyETNIYzxA)。APPSO 原案例用 GPT-6.2 Astra；本文只借鉴玩法，不搬运原媒体、构图、贴图或源代码。
- 本次实际创作使用 GitHub Copilot 中的 **GPT-6.2 Sol（`gpt-6.2-sol`）**。孔雀及展页由主会话实现；纸雕书、鹈鹕、像素街景的初稿由同一模型的三个子代理分别编写。首轮工作产物是可运行、可改动的场景源码，不是图片或视频生成结果。
- 人工选定四个案例，将交付范围改为「原创互动网页＋同源短片」，并批准归档方案。实现方根据实际渲染继续调整构图、镜头、操作与导出。没有记录可证明有人工直接改写源码，也不宣称一次提示就得到成片。

## 四个创作提示

| 作品 | 本次使用的创作提示（中文整理） | 场景代码 |
|---|---|---|
| 翠羽之弧 | 在墨绿展台上立一只蓝颈孔雀。让带有描画眼斑、羽轴曲面和细金色羽枝的三层尾羽绕根部收展；从正面掠到斜侧，保留自由环视与开度控制。 | [孔雀](../demos/gpt-62-motion/src/scenes/peacock.ts) |
| 纸上有路 | 在看得见装帧的打开书本上做手切纸雕。提灯旅人沿墨线从树林越过蓝溪和原创红桥，到达陶红小村；山、桥与屋面各绕页铰升降，镜头跟着人走，也能倒放复原每一折。 | [立体书](../demos/gpt-62-motion/src/scenes/atlas.ts) |
| 盐风骑手 | 让一只长橙喙、有明确喉囊和层叠翅羽的白鹈鹕沿晴朗潟湖骑车。自行车要能辨认管架、辐条和对向踏板；足锁踏板、轮随路程转，镜头从侧面滑向斜前，同时允许环视。 | [鹈鹕](../demos/gpt-62-motion/src/scenes/pelican.ts) |
| 灯雨之町 | 用清晰像素画原创日式幻想雨巷：瓦顶、琥珀灯笼、店棚、雨湿石板和碎裂的灯光倒影。远山、店铺、近景采用不同速度，让八秒后的视差与雨滴接回起始相位。 | [像素雨城](../demos/gpt-62-motion/src/scenes/pixel-city.ts) |

## 浏览、重录与归档

默认先显示封面，不取视频或渲染引擎。打开实时体验后，可用键盘、按钮或触控操作；启用减少动态效果时，实时画面和视频等待操作后才播放。WebGL 不可用时仍可播放短片；无 JavaScript 时，展页上可直接打开静音 MP4。像素 GIF 只有下载入口，不自动播放。

```sh
npm ci
npm --prefix demos/astra-planet ci
npm run build
```

按 HTTP 静态服务发布 `dist/demos/gpt-62-motion/` 全目录。中英文分别从 `index.html`、`index.en.html` 进入；可附 `#peacock`、`#atlas`、`#pelican`、`#pixel-city`，也可用 `?scoutTheme=light` 或 `?scoutTheme=dark` 指定外观。`manifest.json` 给出入口首载 JS/CSS 的 gzip 大小和除清单自身外的文件 SHA-256。该目录随附项目与 Three.js 许可。

正常构建使用已提交的媒体，不调用录制工具。重录时，先安装 Chrome，并确保带 `libx264` 的 `ffmpeg`、`ffprobe` 在 PATH：

```sh
npm run render:gpt-62-motion
# 可指定单个或多个案例，例如：
npm run render:gpt-62-motion -- peacock
```

Playwright 按固定时间取下 24 帧/秒的场景像素，FFmpeg 编为 1280×720 的 H.264 短片（无音轨，每段不超过 4 MiB）。像素短片再以两遍调色板法生成 GIF（不超过 2 MiB）。相同时间点的动画状态可重录；不同浏览器、GPU 或编码器版本不保证逐字节相同。首屏不打包 Three.js；它只在打开任一 3D 作品后请求。
