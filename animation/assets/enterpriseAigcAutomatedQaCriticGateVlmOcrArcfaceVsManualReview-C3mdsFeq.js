import"./modulepreload-polyfill-B5Qt9EMX.js";const l={"ecommerce-hero-image-qa":{id:"ecommerce-hero-image-qa",titleZh:"电商模特与商品主图日产 100,000 张自动化质检与局部手部/瑕疵自愈（256px BBox Inpaint）",titleEn:"100k/Day E-Commerce Hero Image Automated QA & 256px Hand/Defect Self-Healing Gate",subtitleZh:"对比“纯人工抽检或整图调 GPT-4o 发现六指/错字就整张作废重跑（浪费 100% 算力、漏检率 8.5%）”与“三级漏斗探针（40ms OCR+手部21关键点+ΔE）+ Qwen2.5-VL 复核 + 256px 局部框自愈重绘（省 -79.4% 重试算力）”",subtitleEn:"Compares Manual Spot-Check / Full-Image Re-Gen on 6-Finger Defect vs. 3-Tier Funnel Probes (40ms OCR + MediaPipe 21-Keypoint Hand + ΔE) + Scoped 256px Flux.1-Fill Self-Healing (-79.4% retry compute)",dailyAssets:1e5,controlledStack:"Tier-1 Probes (OCR/Hand-21/ΔE/ArcFace 40ms) + Tier-2 Qwen2.5-VL + Tier-3 256px BBox Self-Heal ($0.0014)",naiveStack:"Human QA ($0.35/img) or Un-Filtered Full VLM Judge + Full-Image Discard & Re-Run ($0.038/img)",controlledDefectCatchRatePct:99.85,naiveDefectCatchRatePct:91.5,controlledQaCostPerAssetUsd:.0014,naiveQaCostPerAssetUsd:.038,controlledQaLatencySec:.38,naiveQaLatencySec:14.5,controlledRetryComputeSavedPct:79.4,controlledAnnualSavingsM:2.86,decisionSummaryZh:"全仓达成历史性第 210 座工作台（3+7+40×5 = 210，第三层企业架构沙盘整整 200 座，配齐 420 篇双语选型指南）！在日产 10 万张电商模特与商品图工厂中，约 22% 的原始生图会出现“模特手指多一根（6指）、商品角落多一个杂物、色差 ΔE > 3.0”。如果每张图都调昂贵的旗舰多模态大模型（VLM）且一旦发现手指瑕疵就把整张 4K 大图扔掉重画，不仅审片慢、还会白白浪费 100% 的已生成算力！架构师采用“三级漏斗质检 + 局部自愈门禁”：① 第一级用 40ms 的轻量确定性探针（MediaPipe 手部 21 骨骼点拓扑校验、PP-OCRv4 字符校验、CIEDE2000 ΔE 色差与 ArcFace 人脸余弦）以 $0.0002 成本秒级拦截 72% 的硬伤；② 仅当发现局部瑕疵（如手部 6 指）时，不重跑整张图，而是裁剪手部 256×256 局部包围盒调用 Depth/Mesh 引导的 Flux.1-Fill 在 0.6s 内精准修手，节省 79.4% 的重试 GPU 算力，年省 +$2.86M！",decisionSummaryEn:"Crowning our 210th Workbench Milestone (3+7+40×5 = 210 Studios & exactly 200 Layer-3 Enterprise Sandboxes)! In a 100k-image/day e-commerce factory, ~22% of raw renders exhibit localized defects (6-fingered hands, background artifacts, or ΔE color drift). Discarding the entire 4K image and re-running from scratch wastes 100% of prior GPU compute. Our 3-Tier Cascaded QA & Self-Healing Gate runs 40ms deterministic probes first (MediaPipe 21-keypoint hand topology, PP-OCRv4, CIEDE2000 ΔE, ArcFace), followed by Qwen2.5-VL semantic verification, and heals localized hand/edge defects via a 256×256 cropped Flux.1-Fill pass—saving 79.4% of retry compute and +$2.86M/yr.",stages:[{stage:"1. Tier-1 Fast Deterministic Probes (40ms)",controlledEngine:"MediaPipe Hand-21 + PP-OCRv4 + CIEDE2000 ΔE + ArcFace ($0.0002)",naiveBehavior:"Sends Every Raw 4K Image Directly to Flagship VLM API",metricImpact:"Catches 72% of Hard Defects in 40ms"},{stage:"2. Tier-2 Semantic VLM Critic (340ms)",controlledEngine:"Self-Hosted Qwen2.5-VL-7B / InternVL Structured JSON Rubric",naiveBehavior:'Unstructured Free-Text Prompt ("Does this look good?")',metricImpact:"99.85% vs 91.5% Defect Catch Rate"},{stage:"3. Tier-3 Scoped 256px BBox Self-Healing",controlledEngine:"Crop Defect BBox (e.g. 6-Finger Hand) -> 0.6s Depth-Guided Inpaint",naiveBehavior:"Discards Entire 4K Render and Re-Runs Full 28-Step Pipeline",metricImpact:"-79.4% Retry GPU Compute Saved"},{stage:"4. C2PA Audit Attestation Stamp",controlledEngine:"Writes QA Scorecard JSON into C2PA v2.1 Manifest Before CDN Push",naiveBehavior:"Manual Spreadsheet Spot-Checking 5% of Batch",metricImpact:"$0.0014 vs $0.038/Asset (+$2.86M/Yr)"}]},"marketing-video-temporal-qa":{id:"marketing-video-temporal-qa",titleZh:"营销短视频日产 20,000 条时序闪烁、肢体穿模与音画同步自动化门禁",titleEn:"20k/Day Marketing Video Temporal Flicker, Limb Morphing & Lip-Sync QA Gate",subtitleZh:"解决视频生成“第 3 秒人物突然多出一条胳膊、背景高频频闪、口型慢半拍”痛点：采用“光流跳跃度 (RAFT) + SyncNet 唇音误差 + 4关键帧拼图 VLM 物理逻辑审查”",subtitleEn:"Catches mid-clip extra limbs, background flicker, and lip-sync drift: RAFT Optical-Flow Jitter Probe + SyncNet Lip-Sync Score + 2×2 Keyframe Grid VLM Critic",dailyAssets:2e4,controlledStack:"RAFT Flow Jitter + SyncNet LSE-C + 2×2 Keyframe Grid Qwen2.5-VL + Segment Re-Inpaint ($0.0048/clip)",naiveStack:"Uploading Full 15s 1080p Video (450 Frames) to Multimodal Cloud API ($0.14/clip)",controlledDefectCatchRatePct:99.6,naiveDefectCatchRatePct:86.4,controlledQaCostPerAssetUsd:.0048,naiveQaCostPerAssetUsd:.14,controlledQaLatencySec:.85,naiveQaLatencySec:28,controlledRetryComputeSavedPct:74,controlledAnnualSavingsM:1.64,decisionSummaryZh:"审查一条 15 秒（450 帧）的 AI 视频，如果把全部 450 帧原画传给云端多模态大模型，单次 Token 账单就要 $0.14 且耗时 28 秒；而且大模型看单帧很难察觉帧间高频频闪（Flickering）或 60ms 的唇音不同步。我们通过 CPU/轻量卡先跑 `RAFT` 相邻帧光流加速度突变检测与 `SyncNet` 唇音距离（LSE-C），随后将首、中、运动峰值、尾 4 张关键帧拼成 **1 张 2×2 宫格图（Contact Sheet）** 喂给 `Qwen2.5-VL-7B`，审片成本从 $0.14 压至 $0.0048（降幅 -96.6%），并支持仅对损坏的 2 秒片段做 `Wan-VACE` 局部首尾帧插值修复！",decisionSummaryEn:"Sending 450 raw video frames to a cloud VLM costs $0.14/clip and still misses inter-frame flicker or 60ms lip-sync drift. Running lightweight `RAFT` optical-flow acceleration checks and `SyncNet` LSE-C first, then packing 4 peak-motion keyframes into a single **2×2 Contact Sheet Image** for `Qwen2.5-VL-7B` slashes video QA cost by 96.6% ($0.0048/clip) and triggers localized 2-second `Wan-VACE` segment repair.",stages:[{stage:"1. Temporal & Audio-Visual Probes",controlledEngine:"RAFT Optical-Flow Spike Detector + SyncNet LSE-C (<40ms Drift)",naiveBehavior:"VLM Blind to High-Frequency 60fps Luminance Flicker",metricImpact:"100% Flicker & Desync Interception"},{stage:"2. 2×2 Contact-Sheet VLM Critic",controlledEngine:"4 Peak-Motion Frames Stitched into 1 Grid Image -> Qwen2.5-VL",naiveBehavior:"Tokenizing All 450 Video Frames ($0.14/clip Token Bill)",metricImpact:"-96.6% VLM Token Cost (0.85s)"},{stage:"3. Sub-Clip Window Repair",controlledEngine:"Wan-VACE First-Last Frame Inpainting on Failed 2.0s Window Only",naiveBehavior:"Throws Away Entire 15s Video When Frame 110 Glitches",metricImpact:"-74.0% Video Retry GPU Saved"},{stage:"4. Broadcast Technical QC",controlledEngine:"Automated EBU R128 -14 LUFS + Black-Frame + Freeze-Frame Gate",naiveBehavior:"Publishes Silent or Frozen Tail Frames to TikTok/YouTube Ads",metricImpact:"99.6% Ad Platform Approval Rate"}]},"regulated-brand-compliance-qa":{id:"regulated-brand-compliance-qa",titleZh:"金融/医药/跨国消费品广告法合规与竞品商标零容忍防线（OCR 禁用词 + 商标检索 + 内容安全）",titleEn:"Regulated Finance / Pharma / CPG Ad-Law & Competitor Trademark Zero-Tolerance Gate",subtitleZh:"拦截背景里 AI 无意画出的竞品近似 Logo、医疗绝对化用语、未授权名人撞脸与版权艺术风格侵权：结合 YOLOv11 商标库 + Azure AI Content Safety + 版权向量指纹",subtitleEn:"Blocks hallucinated competitor logos, prohibited regulatory claims, celebrity lookalikes, and copyrighted IP via Logo-YOLO + Azure Content Safety + CLIP IP Guard",dailyAssets:45e3,controlledStack:"Logo-YOLOv11 + PP-OCR Ad-Law Lexicon + Celebrity ArcFace Blocklist + Azure Content Safety ($0.0019)",naiveStack:"Post-Publication Legal Takedowns & Manual Legal Review Queue (48-Hour Bottleneck)",controlledDefectCatchRatePct:99.92,naiveDefectCatchRatePct:84,controlledQaCostPerAssetUsd:.0019,naiveQaCostPerAssetUsd:.28,controlledQaLatencySec:.42,naiveQaLatencySec:120,controlledRetryComputeSavedPct:82.5,controlledAnnualSavingsM:1.95,decisionSummaryZh:"跨国药企、银行与快消巨头最担心的不是“画面不够美”，而是扩散模型在生成街头背景时，无意间在路牌上画出了竞争对手的近似商标、或者生成的虚拟模特与某位好莱坞明星撞脸（肖像权侵权诉讼）！我们在出图出口部署四重法务红线探针：① 全球 Top-10,000 注册商标 `YOLOv11` 检测器（发现背景路牌疑似竞品 Logo 立即触发 128px 局部高斯模糊或重绘）；② 名人/公众人物 `ArcFace` 负向黑名单库（余弦相似度 `>0.65` 自动触发换脸偏移）；③ `Azure AI Content Safety` 四级风险过滤；④ 广告法极限词 OCR 扫描，合规拦截率高达 99.92%！",decisionSummaryEn:"For banks, pharma, and global CPG brands, the #1 risk is an AI model accidentally rendering a competitor logo on a background billboard or generating a synthetic model whose face matches a real celebrity (right-of-publicity lawsuit). Combining a Top-10,000 Trademark Detector (auto-inpaints background logos), a Celebrity ArcFace Negative Blocklist (`cosine < 0.65` enforced), and `Azure AI Content Safety` achieves 99.92% legal compliance in 0.42s.",stages:[{stage:"1. Competitor & IP Logo Shield",controlledEngine:"Top-10,000 Trademark YOLOv11 + CLIP IP Style Distance Check",naiveBehavior:"AI Hallucinates Distorted Competitor Logos on Street Signs",metricImpact:"Zero Trademark Infringement Leaks"},{stage:"2. Celebrity Lookalike Blocklist",controlledEngine:"ArcFace Cosine Check Against Public-Figure Database (<0.65 Cap)",naiveBehavior:"Synthetic Model Resembles Real Celebrity -> Lawsuit Risk",metricImpact:"100% Right-of-Publicity Safety"},{stage:"3. Regulatory Copy & OCR Audit",controlledEngine:"PP-OCRv4 + Ad-Law Prohibited Claims & Required Disclaimer Check",naiveBehavior:"Missing Mandatory Legal Footnote Font Size (<12pt)",metricImpact:"99.92% vs 84.0% Compliance Rate"},{stage:"4. Surgical Background Scrubbing",controlledEngine:"Auto-Inpaints Flagged Background Signboard in 0.4s Without Re-Gen",naiveBehavior:"Rejects Whole Campaign Batch Back to Creative Agency",metricImpact:"$0.0019 vs $0.28 (+$1.95M/Yr)"}]}};function d(o,a="controlled"){const e=l[o],i=a==="controlled",t=Number((e.controlledDefectCatchRatePct-e.naiveDefectCatchRatePct).toFixed(2)),n=Number(((e.naiveQaCostPerAssetUsd-e.controlledQaCostPerAssetUsd)/e.naiveQaCostPerAssetUsd*100).toFixed(1));return{scenario:e,mode:a,activeDefectCatchRatePct:i?e.controlledDefectCatchRatePct:e.naiveDefectCatchRatePct,activeQaCostPerAssetUsd:i?e.controlledQaCostPerAssetUsd:e.naiveQaCostPerAssetUsd,activeQaLatencySec:i?e.controlledQaLatencySec:e.naiveQaLatencySec,catchRateGainPts:t,costReductionPct:n,retryComputeSavedPct:i?e.controlledRetryComputeSavedPct:0,annualSavingsM:e.controlledAnnualSavingsM}}let s="ecommerce-hero-image-qa",c="controlled";function r(){const o=document.querySelector("#app");if(!o)return;const a=d(s,c),e=a.scenario,i=c==="controlled";o.innerHTML=`
    <main class="workbench-shell" data-mode="${c}" data-scenario="${s}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">🏆 HISTORIC 210TH WORKBENCH MILESTONE (3+7+40×5 = 210)! · 200 LAYER-3 SANDBOXES · AIGC QA CRITIC GATE</span>
          <h1>企业级 AIGC 视觉与视频自动化审片门禁（QA Critic Gate）工作台：三级漏斗探针 + 局部自愈重绘 vs 整图作废重抽</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="QA Scenario">
            ${Object.keys(l).map(t=>`
              <button class="seg-btn ${s===t?"active":""}" data-scenario-btn="${t}">
                ${t==="ecommerce-hero-image-qa"?"1. 日产 10万张电商主图质检与手部 256px 自愈":t==="marketing-video-temporal-qa"?"2. 日产 2万条短视频频闪/唇音 + 2×2 宫格 VLM":"3. 金融/医药竞品商标与名人撞脸法务红线门禁"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Gate Mode">
            <button class="seg-btn ${i?"active":""}" data-mode-btn="controlled">
              ✅ 三级漏斗探针 + VLM + 局部自愈 ($${e.controlledQaCostPerAssetUsd}/件 · 拦截率 ${e.controlledDefectCatchRatePct}%)
            </button>
            <button class="seg-btn ${i?"":"active"}" data-mode-btn="naive">
              ⛔ 全量调旗舰 VLM / 发现瑕疵整图作废 ($${e.naiveQaCostPerAssetUsd}/件 · 拦截率 ${e.naiveDefectCatchRatePct}%)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">幻觉/六指/穿帮拦截率 (Defect Catch Rate)</span>
          <strong class="kpi-val ${i?"good":"warn"}">${a.activeDefectCatchRatePct}%</strong>
          <span class="kpi-note">净增 +${a.catchRateGainPts} pts · 确定性探针 + 结构化 VLM</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">单件审片成本与降幅 (QA Cost / Asset)</span>
          <strong class="kpi-val ${i?"good":"warn"}">$${a.activeQaCostPerAssetUsd.toFixed(4)}</strong>
          <span class="kpi-note">审片降本 -${a.costReductionPct}% · 年省 +$${a.annualSavingsM.toFixed(2)}M</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">局部自愈节省重抽算力 (Retry GPU Saved)</span>
          <strong class="kpi-val ${i?"good":"warn"}">${a.retryComputeSavedPct}%</strong>
          <span class="kpi-note">256px 局部修手/修路牌 vs 整张 4K 推倒重画</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">单件审片耗时与全仓里程碑 (QA Latency)</span>
          <strong class="kpi-val good">${a.activeQaLatencySec} s · 🏆 210th Studio!</strong>
          <span class="kpi-note">3+7+40×5 = 210 座工作台 (200 座企业沙盘)</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 三级漏斗质检与 256px 局部自愈架构（为什么发现六指/背景杂物绝不能把整张 4K 图作废重画？）</h2>
            <span class="badge">${i?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="3-Tier Cascaded QA and Self-Healing Funnel">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="198" height="125" rx="10" fill="#111c33" stroke="#10b981" stroke-width="1.5" />
              <text x="14" y="24" fill="#6ee7b7" font-size="11.5" font-weight="700">Tier 1: 40ms 确定性探针阵列</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">拦截 72% 硬伤 ($0.0002)</text>
              <text x="14" y="68" fill="#cbd5e1" font-size="10.5">• MediaPipe 手部 21点 (严查六指)</text>
              <text x="14" y="86" fill="#cbd5e1" font-size="10.5">• PP-OCRv4 字符 &amp; CIEDE2000 ΔE</text>
              <text x="14" y="104" fill="#34d399" font-size="10.5" font-weight="700">• 视频 RAFT 光流频闪 &amp; SyncNet</text>
            </g>

            <g transform="translate(241, 20)">
              <rect width="198" height="125" rx="10" fill="#111c33" stroke="#3b82f6" stroke-width="1.5" />
              <text x="14" y="24" fill="#93c5fd" font-size="11.5" font-weight="700">Tier 2: 2×2 宫格 VLM 复核</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">Qwen2.5-VL-7B ($0.0012)</text>
              <text x="14" y="68" fill="#cbd5e1" font-size="10.5">• 视频抽 4 帧拼成 1 张宫格图降本 96%</text>
              <text x="14" y="86" fill="#cbd5e1" font-size="10.5">• 审查物理穿模、多肢体与构图美学</text>
              <text x="14" y="104" fill="#60a5fa" font-size="10.5" font-weight="700">• 输出缺陷类别 + 精确 BBox 坐标</text>
            </g>

            <g transform="translate(462, 20)">
              <rect width="198" height="125" rx="10" fill="#064e3b" stroke="#34d399" stroke-width="1.5" />
              <text x="14" y="24" fill="#a7f3d0" font-size="11.5" font-weight="700">Tier 3: 256px 局部自愈重绘</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">省 -${e.controlledRetryComputeSavedPct}% 重抽算力</text>
              <text x="14" y="68" fill="#a7f3d0" font-size="10.5">• 仅裁剪缺陷 BBox (如手部/背景路牌)</text>
              <text x="14" y="86" fill="#a7f3d0" font-size="10.5">• 0.6s Depth/Mesh 引导局部 Inpaint</text>
              <text x="14" y="104" fill="#34d399" font-size="10.5" font-weight="700">• 保住其余 95% 完美 4K 画面不重算!</text>
            </g>

            <g transform="translate(20, 162)">
              <rect width="640" height="118" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="26" fill="#38bdf8" font-size="13" font-weight="700">🏆 全仓第 210 项工作台里程碑 (3 + 7 + 40×5 = 210 Studios · 200 座企业级沙盘整装齐备！)</text>
              <text x="18" y="52" fill="#e2e8f0" font-size="11.5">1. 为什么不能只靠 VLM 审片？VLM 数手指和测潘通色号 ΔE 的准确率不如 5ms 的专用几何/色度探针，且成本贵 50 倍</text>
              <text x="18" y="76" fill="#e2e8f0" font-size="11.5">2. 为什么不能整图重抽？一张 4K 海报只有右下角模特手部多一根手指，局部 256×256 修复仅需 0.04 算力单位 vs 整图 1.0</text>
              <text x="18" y="100" fill="#34d399" font-size="11.5" font-weight="700">3. 法务零容忍护栏：YOLOv11 竞品商标检测 + 名人 ArcFace 负向黑名单 (&lt;0.65) + C2PA v2.1 质检签名随片入库</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段自动化审片与局部自愈闭环拆解</h2>
            <span class="badge">🏆 210th Milestone</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 漏斗探针 + 局部自愈：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 粗放盲审/整图重抽：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,o.querySelectorAll("[data-scenario-btn]").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.scenarioBtn;n&&(s=n,r())})}),o.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.modeBtn;n&&(c=n,r())})})}r();
