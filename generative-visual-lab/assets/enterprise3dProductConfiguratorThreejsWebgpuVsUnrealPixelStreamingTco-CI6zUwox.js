import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"automotive-public-launch":{id:"automotive-public-launch",titleZh:"新能源汽车上市官网百万级公网 3D 选配器（端侧 Three.js/WebGPU 烘焙光影 + 按需 4K AI 渲染快照）",titleEn:"Public Automotive Launch 3D Configurator (Client Three.js/WebGPU + Baked Lightmaps + On-Demand 4K AI Snapshot)",subtitleZh:"对比“公网全量上云端 Unreal Pixel Streaming（5万人同时选车需 2.5万张云端 GPU、排队 25分钟、年烧 $4.32M）”与“端侧 Three.js/WebGPU 零服务器 GPU 交互 ($0.0004/次) + 仅在生成分享海报时触发 1次云端 Flux/光追美照”",subtitleEn:"Compares Public Cloud GPU Unreal Pixel Streaming (25,000 cloud GPUs needed for 50k launch spike, $4.32M/yr bill) vs. Client Three.js/WebGPU + Cycles Baked Lightmaps ($0.0004 CDN) + On-Demand 4K Snapshot",monthlySessions:1e6,peakConcurrentUsers:5e4,controlledStack:"Client Three.js/WebGPU (Draco+KTX2 + Cycles Baked AO) + On-Demand 4K Snapshot ($0.0012/session)",naiveStack:"100% Cloud GPU Unreal Engine Pixel Streaming WebRTC ($0.36/session = $4.32M/Yr + Waiting Queues)",controlledCostPerSessionUsd:.0012,naiveCostPerSessionUsd:.36,controlledOrbitLatencyMs:8.2,naiveOrbitLatencyMs:118,controlledVisualRealismPct:98.8,naiveVisualRealismPct:99.5,controlledAnnualSavingsM:4.3,decisionSummaryZh:"为什么绝大多数量产车企（如保时捷、蔚来、小米汽车官网）在经历了早期的云渲染试水后，全都把公网 C 端 3D 选配器切回了客户端 `Three.js / WebGPU`？算一笔极其残酷的架构师账：新车发布会当晚有 **50,000 名观众同时打开官网选配车漆和轮毂**（平均停留 6 分钟）。如果用云端 Unreal Pixel Streaming（每张 L40S/A10G 云显卡最多跑 1–2 个高清实例），你瞬間需要 **25,000 张云端 GPU**——不仅云厂商根本调不出这么多卡（导致 95% 的潜在买家被挡在“您前面还有 4,800 人排队”的尴尬页面外），而且每年光云显卡账单就高达 **$432 万美元**！正确架构是：**99% 的实时旋转、开门、换车漆/轮毂采用客户端 `Three.js / WebGPU` + Blender Cycles 预烘焙地面阴影与车内 AO 贴图 + `KHR_materials_clearcoat` 双层清漆着色器（直接白嫖买家自己的 iPhone/PC 显卡，服务端成本仅 $0.0004 CDN 流量费，零排队、8.2ms 丝滑跟手）**；仅当买家选配完毕点击“生成我的 4K 雪山大片分享朋友圈”的那一刻，才按需触发 1 次 1.5 秒的云端无头渲染或 `Flux.1 + IC-Light` 外景合成（仅占 10% 转化用户，均摊成本仅 $0.0012/会话，年省 +$4.30M）！",decisionSummaryEn:'Deploying Cloud GPU Unreal Engine Pixel Streaming for a public automotive launch is a financial and availability catastrophe: serving `50,000` concurrent shoppers requires `~25,000` dedicated cloud GPUs (`$0.36/session` = `$4.32M/yr`) and forces 95% of buyers into a 25-minute waiting queue. Instead, run **99% of interactive 3D orbiting, door opening, and paint/wheel swapping locally on the shopper device via `Three.js / WebGPU`** (using `4.8 MB` `Draco + KTX2` assets, `KHR_materials_clearcoat`, and pre-baked Blender Cycles ground/interior AO maps at `$0.0004` CDN cost and `8.2ms` touch latency), and trigger a **1.5s Serverless Cloud Path-Tracer / `Flux.1 + IC-Light` 4K Snapshot** strictly when the user clicks *"Share My 4K Build"* (saving `+$4.30M/yr`, `-99.7%` TCO).',stages:[{stage:"1. Launch-Spike Traffic Absorption",controlledEngine:"Edge CDN Serves 4.8MB GLB+KTX2 to 50,000 Browsers (Zero Queue)",naiveBehavior:"Cloud GPU Pool Exhausted at 500 Users -> 25-Min Waiting Room",metricImpact:"100% Instant Access vs 95% Drop-Off"},{stage:"2. Photoreal Client Car-Paint PBR",controlledEngine:"KHR_materials_clearcoat + Flake Normal Map + Cycles Baked AO",naiveBehavior:"Streams 8Mbps WebRTC Video With Compression Macroblocking",metricImpact:"98.8% Visual Parity at 8.2ms Latency"},{stage:"3. Modular Variant Hot-Swap",controlledEngine:"glTF KHR_materials_variants + Lazy Wheel/Seat Sub-Mesh Load (40ms)",naiveBehavior:"Maintains Idle 16GB VRAM UE5 Process While User Reads Specs",metricImpact:"$0.0004 CDN vs $0.36 GPU/Session"},{stage:"4. On-Demand 4K Beauty Snapshot",controlledEngine:"1.5s Serverless Cloud Render / Flux.1+IC-Light on Final Share Click",naiveBehavior:"Runs Continuous 60fps Path-Tracing During Casual Browsing",metricImpact:"Saves +$4.30M/Yr (-99.7% TCO)"}]},"luxury-watch-jewelry-pbr":{id:"luxury-watch-jewelry-pbr",titleZh:"高奢腕表与钻石珠宝微距 3D 定制器（色散折射 Shader + 蓝宝石表镜抗锯齿 vs 云流化色度抽样模糊）",titleEn:"Luxury Watch & Diamond Jewelry Macro 3D Configurator (WebGPU Dispersion Shader vs. WebRTC YUV420 Blur)",subtitleZh:"解决云流化 WebRTC 的 YUV420 色度抽样把钻石火彩与表盘微雕小字压糊的痛点：采用端侧 WebGPU/WebGL2 原生 Retina 像素比渲染 + RGB 三通道不同折射率（IOR Dispersion）钻石火彩着色器",subtitleEn:"WebRTC YUV420 video compression blurs diamond fire and micro-engraved watch dials; Client WebGPU/Three.js renders native Retina DPR with RGB IOR Dispersion and Anisotropic Brushed Gold",monthlySessions:45e4,peakConcurrentUsers:12e3,controlledStack:"Client Three.js/WebGPU Native Retina DPR + RGB IOR Dispersion + Anisotropic Gold ($0.0005/session)",naiveStack:"Cloud Pixel Streaming (YUV420 Chroma Subsampling Blurs Micro-Dials & Costs $0.28/session)",controlledCostPerSessionUsd:5e-4,naiveCostPerSessionUsd:.28,controlledOrbitLatencyMs:6.5,naiveOrbitLatencyMs:105,controlledVisualRealismPct:99.6,naiveVisualRealismPct:82,controlledAnnualSavingsM:1.51,decisionSummaryZh:"在高奢机械腕表（陀飞轮机芯、拉丝玫瑰金表圈）与钻石戒指定制场景中，云端 Pixel Streaming 不仅贵，而且**画质反而不如客户端原生渲染**！因为 WebRTC 视频流为了控制带宽默认采用 `YUV 4:2:0` 色度半抽样与码率压缩，会把表盘上 `0.5mm` 的瑞士日内瓦印记微雕小字和钻石尖锐的彩虹色散火彩（Chromatic Dispersion）压成模糊色块（视觉锐度评分仅 82.0%）。而在客户端用 `Three.js` 结合 `KHR_materials_transmission`、`KHR_materials_iridescence`、`KHR_materials_anisotropy`（各向异性金属拉丝）直接以 iPhone 屏幕原生 `3x Retina DPR` 渲染，表盘小字刀锋般锐利（99.6%），单次会话成本仅 $0.0005！",decisionSummaryEn:"For luxury watches and diamond jewelry, Cloud Pixel Streaming actually looks *worse* than client-side rendering because WebRTC `YUV 4:2:0` chroma subsampling and bitrate throttling blur `0.5mm` dial engravings and diamond fire (`82.0%` sharpness). Rendering locally on the device at native `3× Retina DPR` with `KHR_materials_anisotropy` (brushed rose gold) and RGB IOR dispersion shaders delivers razor-sharp micro-typography (`99.6%`) at `$0.0005/session`.",stages:[{stage:"1. Native Retina DPR Rendering",controlledEngine:"Renders at Device Native 2x/3x Retina Resolution (Zero Video Compression)",naiveBehavior:"YUV 4:2:0 H.264 Stream Blurs Fine Swiss Dial Typography",metricImpact:"99.6% vs 82.0% Macro Sharpness"},{stage:"2. Diamond Fire & Sapphire Glass",controlledEngine:"3-Wavelength RGB IOR Dispersion + Back-Face Environment Cubemap",naiveBehavior:"Bitrate Spikes on Sparkling Gemstones Cause Blocky Artifacts",metricImpact:"True Gemological Fire & Brilliance"},{stage:"3. Anisotropic Brushed Metal",controlledEngine:"KHR_materials_anisotropy Tangent Map for Circular Brushed Bezel",naiveBehavior:"Flat Isotropic Specular Highlight",metricImpact:"6.5ms vs 105.0ms Touch Response"},{stage:"4. Bespoke Engraving Vector Preview",controlledEngine:"Dynamic Canvas Normal-Bump Map for Instant Custom Name Engraving",naiveBehavior:"Round-Trip Server Mesh Rebuild on Every Typed Character",metricImpact:"$0.0005 vs $0.28 (+$1.51M/Yr)"}]},"vip-showroom-dealer-kiosk":{id:"vip-showroom-dealer-kiosk",titleZh:"线下旗舰店 8K VIP 定制大屏与复杂全屋光追场景（何时才真正应该用 Unreal Pixel Streaming？）",titleEn:"Flagship Dealership 8K VIP Lounge & Full-Room Ray-Tracing (The True 5% Niche for Pixel Streaming)",subtitleZh:"明确界定云流化的合理边界：当终端是门店固定 iPad 控制 8K 大屏、并发受控 (<200路) 且场景包含 5,000 万面未烘焙动态全局光照时，采用“边缘机房 GPU Pixel Streaming + 空闲 60秒自动冻结释放”",subtitleEn:"Defines the true boundary for Pixel Streaming: low-concurrency (<200) dealership VIP lounges or 50M-poly unbaked architectural lighting, guarded by a 60s idle-freeze hibernation gate",monthlySessions:25e3,peakConcurrentUsers:180,controlledStack:"Client WebGPU for 95% Web Traffic + Idle-Hibernated Edge Pixel Streaming for 5% VIP Lounges ($0.045)",naiveStack:"Un-Gated 24/7 Pixel Streaming Leaving Zombie GPU Sessions Running After Tab Close ($0.95/session)",controlledCostPerSessionUsd:.045,naiveCostPerSessionUsd:.95,controlledOrbitLatencyMs:22,naiveOrbitLatencyMs:140,controlledVisualRealismPct:99.8,naiveVisualRealismPct:99.5,controlledAnnualSavingsM:.68,decisionSummaryZh:"作为客观严谨的解决方案架构师，我们并非全盘否定 Unreal Pixel Streaming，而是将其严格关进 **“低并发、高客单价 VIP 专享笼子（占流量 5%）”**：例如法拉利/游艇线下展厅 VIP 室（全国同时在线不超过 180 台门店 iPad），或者全屋定制家具需要实时打通 30 个动态点光源做未烘焙路径追踪。但即便是这 5% 的场景，也必须加上 **“60秒无操作自动截帧休眠（Idle Frame-Freeze Hibernation）”** 护栏——一旦销售顾问和客户停下来聊天超过 60 秒未滑动屏幕，前端无缝将最后一帧高清画面定格为静态图，立即挂起并释放后台 UE5 GPU 进程给其他门店复用；客户手指再次触碰屏幕瞬间在 `180ms` 内恢复流化，将 VIP 云流化成本砍掉 -95.3%！",decisionSummaryEn:"Reserve Unreal Engine Pixel Streaming strictly for the **top 5% low-concurrency, high-ticket scenarios** (e.g., `<200` concurrent flagship dealership VIP lounges or 50M-polygon unbaked architectural lighting). Even there, enforce an **Idle 60-Second Frame-Freeze Hibernation Gate**: when a user stops orbiting for 60s to talk with a salesperson, freeze the last high-res frame on the client canvas and release the GPU slot back to the pool—cutting VIP Pixel Streaming waste by 95.3% ($0.045 vs. $0.95/session).",stages:[{stage:"1. Traffic Tier Routing Gate",controlledEngine:"95% Public Web -> Client Three.js/WebGPU | 5% Authenticated VIP -> UE5 Stream",naiveBehavior:"Exposes Unauthenticated Pixel Streaming URL to Public Reddit/Social Traffic",metricImpact:"Zero Public DDoS GPU Bankruptcy"},{stage:"2. 60s Idle Frame-Freeze Hibernation",controlledEngine:"No Touch for 60s -> Freeze Last Frame as PNG & Release GPU Slot",naiveBehavior:"Holds Dedicated H100/L40S GPU for 45 Mins While Tab Is Minimized",metricImpact:"-95.3% Wasted Idle GPU Hours"},{stage:"3. Multi-Tenant Process Multiplexing",controlledEngine:"NVIDIA MPS / Vulkan Multi-Instance (4 Showroom Streams per L40S)",naiveBehavior:"1 Full VM & 1 Full 24GB GPU Locked per Single Browser Tab",metricImpact:"4x Higher GPU Density"},{stage:"4. Edge Region Proximity Routing",controlledEngine:"Routes Showroom iPad to Nearest Metro Edge Node (<22ms RTT)",naiveBehavior:"Cross-Continent WebRTC Stream (140ms Orbit Lag)",metricImpact:"22.0ms vs 140.0ms Input Latency"}]}};function d(n,t="controlled"){const e=c[n],i=t==="controlled",a=Number(((e.naiveCostPerSessionUsd-e.controlledCostPerSessionUsd)/e.naiveCostPerSessionUsd*100).toFixed(1)),s=Number((e.naiveOrbitLatencyMs/e.controlledOrbitLatencyMs).toFixed(1));return{scenario:e,mode:t,activeCostPerSessionUsd:i?e.controlledCostPerSessionUsd:e.naiveCostPerSessionUsd,activeOrbitLatencyMs:i?e.controlledOrbitLatencyMs:e.naiveOrbitLatencyMs,activeVisualRealismPct:i?e.controlledVisualRealismPct:e.naiveVisualRealismPct,costReductionPct:a,latencySpeedupFactor:s,annualSavingsM:e.controlledAnnualSavingsM}}let r="automotive-public-launch",o="controlled";function l(){const n=document.querySelector("#app");if(!n)return;const t=d(r,o),e=t.scenario,i=o==="controlled";n.innerHTML=`
    <main class="workbench-shell" data-mode="${o}" data-scenario="${r}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">219TH WORKBENCH · DOMAIN 5 · ENTERPRISE 3D PRODUCT CONFIGURATOR SELECTION STUDIO</span>
          <h1>汽车与高奢 3D 在线选配器架构选型工作台：端侧 Three.js / WebGPU + 烘焙光影 vs 云端 Unreal Pixel Streaming TCO</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="Configurator Scenario">
            ${Object.keys(c).map(a=>`
              <button class="seg-btn ${r===a?"active":""}" data-scenario-btn="${a}">
                ${a==="automotive-public-launch"?"1. 汽车上市公网 5万并发选配器 (Three.js + 按需 4K 快照)":a==="luxury-watch-jewelry-pbr"?"2. 高奢腕表/钻石微距定制 (原生 Retina + 色散 Shader)":"3. 线下门店 VIP 室 8K 流化边界 (60s 静默帧冻结休眠)"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Architecture Mode">
            <button class="seg-btn ${i?"active":""}" data-mode-btn="controlled">
              ✅ 端侧 Three.js/WebGPU + 按需快照 ($${e.controlledCostPerSessionUsd}/次 · 延迟 ${e.controlledOrbitLatencyMs}ms)
            </button>
            <button class="seg-btn ${i?"":"active"}" data-mode-btn="naive">
              ⛔ 全量公网 Unreal Pixel Streaming ($${e.naiveCostPerSessionUsd}/次 · 延迟 ${e.naiveOrbitLatencyMs}ms)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">单次用户选配会话成本 (Cost / Session)</span>
          <strong class="kpi-val ${i?"good":"warn"}">$${t.activeCostPerSessionUsd}</strong>
          <span class="kpi-note">成本直降 -${t.costReductionPct}% · 年省 +$${t.annualSavingsM.toFixed(2)}M</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">触控旋转跟手延迟 (Touch-to-Photon Latency)</span>
          <strong class="kpi-val ${i?"good":"warn"}">${t.activeOrbitLatencyMs} ms</strong>
          <span class="kpi-note">响应提速 ${t.latencySpeedupFactor}x · 本地 WebGL2/WebGPU 零网络往返</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">车漆/钻石画质还原度 (Visual Fidelity Score)</span>
          <strong class="kpi-val ${i?"good":"warn"}">${t.activeVisualRealismPct}%</strong>
          <span class="kpi-note">Cycles 预烘焙 AO + Clearcoat 清漆 + 原生 Retina DPR</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">峰值并发免排队容量 (Zero-Queue Concurrency)</span>
          <strong class="kpi-val good">${e.peakConcurrentUsers.toLocaleString()} Users</strong>
          <span class="kpi-note">CDN 静态分发 4.8MB GLB vs 云显卡耗尽排队 25分钟</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 为什么公网 C 端汽车选配器绝不能直接上 Unreal Pixel Streaming？端云混合选配架构图解</h2>
            <span class="badge">${i?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="Client Three.js WebGPU vs Cloud Unreal Pixel Streaming TCO">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="305" height="130" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
              <text x="16" y="24" fill="#6ee7b7" font-size="12" font-weight="700">✅ 端侧 Three.js/WebGPU + 按需 4K 快照 ($0.0012/次)</text>
              <text x="16" y="48" fill="#f8fafc" font-size="18" font-weight="800">50,000 并发 = $0 云端 GPU</text>
              <text x="16" y="72" fill="#a7f3d0" font-size="10.5">• 99% 旋转/换色/开门跑在买家手机/PC 本地显卡 (8.2ms)</text>
              <text x="16" y="92" fill="#a7f3d0" font-size="10.5">• Blender Cycles 预烘焙车底/内饰环境光遮蔽 (AO Map)</text>
              <text x="16" y="112" fill="#34d399" font-size="10.5" font-weight="700">• 仅当点击“保存我的 4K 海报”时触发 1.5s 云端渲染</text>
            </g>

            <g transform="translate(350, 20)">
              <rect width="310" height="130" rx="10" fill="#1f121c" stroke="#ef4444" stroke-width="1.5" />
              <text x="16" y="24" fill="#fca5a5" font-size="12" font-weight="700">⛔ 公网全量 Unreal Pixel Streaming ($0.36/次)</text>
              <text x="16" y="48" fill="#f8fafc" font-size="18" font-weight="800">50,000 并发 = 需 25,000 张云显卡!</text>
              <text x="16" y="72" fill="#fecaca" font-size="10.5">• 新车发布夜 95% 用户卡在“排队第 4,820 位”流失</text>
              <text x="16" y="92" fill="#fecaca" font-size="10.5">• WebRTC 118ms 拖拽延迟 + YUV420 压缩模糊微雕小字</text>
              <text x="16" y="112" fill="#f87171" font-size="10.5" font-weight="700">• 用户切后台看微信仍占着 24GB 显存烧掉 $4.32M/年</text>
            </g>

            <g transform="translate(20, 166)">
              <rect width="640" height="114" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="26" fill="#38bdf8" font-size="13" font-weight="700">如何用 4.8MB 端侧 Three.js 做媲美离线光追的 98.8% 汽车与腕表质感？(Baked-PBR Craft)</text>
              <text x="18" y="50" fill="#e2e8f0" font-size="11.5">1. 双层清漆与金属闪粉：开启 KHR_materials_clearcoat + 高频平铺金属微法线贴图 (Flake Normal Map) 还原车漆颗粒感</text>
              <text x="18" y="74" fill="#e2e8f0" font-size="11.5">2. 阴影与全局光预烘焙：在无头 Blender Cycles 中将车身底部接触阴影与真皮座椅缝隙 AO 烘焙为 2K KTX2 光照贴图</text>
              <text x="18" y="98" fill="#34d399" font-size="11.5" font-weight="700">3. 5% 门店 VIP 室云流化防漏血护栏：必须配置“60秒无触控自动截帧休眠”，定格静态画面并立即释放后台 UE5 显卡进程</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段端云协同 3D 选配器架构拆解</h2>
            <span class="badge">-99.7% Cloud GPU TCO</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(a=>`
              <div class="stage-row">
                <div class="stage-title">${a.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 端侧烘焙 + 按需快照：${a.controlledEngine}</div>
                  <div class="col-bad">⛔ 全量云流化 Pixel Streaming：${a.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${a.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,n.querySelectorAll("[data-scenario-btn]").forEach(a=>{a.addEventListener("click",()=>{const s=a.dataset.scenarioBtn;s&&(r=s,l())})}),n.querySelectorAll("[data-mode-btn]").forEach(a=>{a.addEventListener("click",()=>{const s=a.dataset.modeBtn;s&&(o=s,l())})})}l();
