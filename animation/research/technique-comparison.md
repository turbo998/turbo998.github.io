# 实时程序造景：技术选择与边界

## Canvas 2D：画面由笔触与图层组成

适合壁画、参数插画、揭色、灯光遮罩和小型约束物理。几何只是平面坐标，
没有真实三维体积。关键优化是静态缓存、有限粒子与像素负载控制。
SVG 适合静态矢量与语义标注；大规模逐帧物理更新会产生 DOM 成本。
预录视频降低运行成本，却不能证明实时交互、物理或可导出几何。

## Astra：科学测量改变实际顶点

NASA MOLA 的 signed Int16 米制高程驱动球面顶点位移；
基础与高清派生包来自同一官方源，是重采样不是新测量。
细分网格不增加测量精度；微材质、海洋、云和大气属于艺术或实时近似。
灰模、线框、GLB 与独立重载视图让几何可被检查，而非只展示一张贴图球。
GLB 保留实际地形与静态海面，不包含网页动态体积云/大气/波浪着色。

参考天体站 https://hydrosphere.awsisfun.com/ 与作者说明
https://hydrosphere.awsisfun.com/about/ 说明了高程、海平面、云和大气。
旧研究已核对公开数据与前端资源，但不能由域名推断完整 AWS 架构。
本项目数据直接来自 NASA，不复制该站代码、纹理或角色。

## Three.js：适合三维火箭与真实空间镜头

有体积的火箭、发射塔、地面与跟随镜头需要真正几何与投影。
批量粒子减少绘制调用，但烟雾仍受排序、透明过度绘制和填充率影响。
关闭深度写入不是万能解决方案：需要按视线排序或接受披露的实时近似。
发射动画可用确定性的时间状态机，没有必要引入完整航天仿真或服务器。

来源：[InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)、
[Material](https://threejs.org/docs/pages/Material.html)、
[透明排序说明](https://threejs.org/manual/en/transparency.html)。

## 可检查的能力，不做空泛模型宣传

实时帧、源码、测量校验和、状态测试与模型导出提供具体证据。
AI 辅助编程的历史署名不等于运行时生成，也不是模型间公平基准。
这个仓库没有推理服务、秘钥或模型请求；所有演示从已提交程序运行。

## 部署

Vite 相对资源 URL 与静态目录组装支持 GitHub Pages 子路径。
Worker、科学数据与纹理都须在实际线上 URL 核对；
构建成功不保证部署成功，push 成功也不保证交互可用。
依据 [GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)：
先验证构建、上传 artifact，再使用 Pages/OIDC 最小权限发布。
