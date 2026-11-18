# 动势图鉴 / Motion Studies

从[动画赛道 · 交互演示](../../../studio/zh-animation.html#demos)进入[中文展页](index.html)，体验三个实时 3D 场景和一座 2D 像素城市。四段无声短片来自与互动体验相同的场景；像素城市另附循环 GIF。

此目录从 [Generative Visual Lab](https://github.com/turbo998/generative-visual-lab/tree/main/demos/gpt-62-motion) 的独立构建同步。`manifest.json` 记录包装前的源制品哈希与首载体积。更新时先校验源制品，再从站点根目录运行 `node scripts\build-remediation.cjs` 重建双语入口、归档和搜索。站点生成器会给两份 HTML 加站点导航；其余构建文件不应变化。

从站点根目录运行 `node server.mjs` 可本地预览并拖动视频进度；不要用 `file://` 直接打开 HTML。

## English

Open the [English exhibit](index.en.html) from [Animation Studio · Interactive Demos](../../../studio/animation.html#demos) to explore three real-time 3D scenes and one 2D pixel city. The four silent films are captures of the same scenes used in the live experience. The pixel city also includes a looping GIF.

This directory is imported from a standalone [Generative Visual Lab build](https://github.com/turbo998/generative-visual-lab/tree/main/demos/gpt-62-motion). `manifest.json` records upstream hashes and entry sizes before the site wraps the HTML. Verify the source bundle before replacing it, then run `node scripts\build-remediation.cjs` from the site root to rebuild both tracks, archive, and search. Site generation may wrap the two HTML entry points; it must not change the other build assets.

Run `node server.mjs` from the site root to preview the exhibit with video seeking. Do not open the HTML over `file://`.
