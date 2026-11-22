import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"semantic-dam-broll-hybrid-fill":{id:"semantic-dam-broll-hybrid-fill",titleZh:"高管访谈 A-Roll 语义对位 B-Roll 空镜自动覆轨：88.5% 企业 DAM 实拍库检索 + 11.5% AI 补缺（第 232 项工作台）",titleEn:"A-Roll Utterance to B-Roll Auto-Overlay: 88.5% SigLIP-2 Enterprise DAM Retrieval + 11.5% AI Gap-Fill (232nd Studio)",subtitleZh:"对比“全部空镜靠 Sora/Veo 文生视频（单支烧 $45 且把公司真实工厂画成假园区）”与“WhisperX 语义分句 + 优先检索企业 DAM 历史实拍分镜库（88.5% 命中，$0.0002）+ 仅对 11.5% 抽象概念用 Wan 2.1 补缺（$0.08/支）”",subtitleEn:"Compares Generating 100% of B-Roll via Sora/Veo ($45/video & fake office buildings) vs. WhisperX Semantic Cueing + 88.5% SigLIP-2 Real DAM Shot Retrieval + 11.5% Wan 2.1 Metaphor Gap-Fill ($0.08/video)",controlledStack:"WhisperX Cueing + 88.5% SigLIP-2 DAM B-Roll Search + 11.5% Wan 2.1 Fill ($0.08/Video)",naiveStack:"100% Pure AI Video B-Roll Generation or 8.5h Manual Footage Scrubbing ($45–$380/Video)",controlledSemanticMatchPct:99.4,naiveSemanticMatchPct:64,controlledEditorTimeReductionPct:94.2,naiveEditorTimeReductionPct:12,controlledCostPerVideoUsd:.08,naiveCostPerVideoUsd:45,controlledAnnualSavingsM:2.44,decisionSummaryZh:"企业公关部、产品市场部每周都要拍摄大量高管访谈、客户证言与技术解读视频（Talking-Head A-Roll）。如果整支视频 10 分钟只有一个人坐在椅子上干讲，观众 30 秒就会划走；而让剪辑师去几十 TB 的企业历史素材库里人工翻找匹配的空镜（B-Roll）来覆盖跳切点，平均每支视频要耗费 **`8.5 小时`**！如果走另一个极端——全部用 `Sora 2 / Veo 3` 生成空镜，不仅每支视频要烧掉 `$45` 算力费，而且当高管说到“我们苏州智能工厂的产线”时，AI 画出来的是一个根本不存在的假工厂（合规与真实性一票否决）！我们构建 **“先搜后生（Search-Before-Generate）语义 B-Roll 覆轨引擎”**：用 `WhisperX` 提取发言中的实体与动作词，优先在企业 `SigLIP-2` 分镜向量库中毫秒级命中 **88.5% 的真实总部大楼、产线与产品实拍镜头（`$0.0002`）**；仅当台词涉及抽象比喻（如“数字神经网络席卷全球”，占 11.5%）且库存相似度 `<0.78` 时，才自动调用 `AKS Wan 2.1` 生成概念空镜，单支视频成本仅 **`$0.08`（年省 `+$2.44M`）**！",decisionSummaryEn:"In corporate video production, turning a 10-minute talking-head interview (A-Roll) into an engaging broadcast piece requires overlaying 40+ B-Roll clips—a task that takes human editors **`8.5 hours`** of manual archive scrubbing. Conversely, generating 100% of B-Roll with `Sora 2 / Veo 3` costs `$45/video` and hallucinates fake factory buildings when the executive mentions real company facilities. Our **Search-Before-Generate B-Roll Compiler** uses `WhisperX` to extract entity/action cues, matches **`88.5%` of slots to real company footage in the `SigLIP-2` DAM shot index (`$0.0002`)**, and invokes `Wan 2.1` only for the remaining `11.5%` abstract conceptual metaphors—achieving **99.4% semantic relevance at `$0.08/video` (`+$2.44M/yr` saved)**.",stages:[{stage:"1. WhisperX Filler & Jump-Cut Detect",controlledEngine:'Strips "um/uh" & Dead Air (>450ms); Flags Jump-Cut Timestamps',naiveBehavior:"Leaves Awkward Pauses or Jarring Uncovered Jump Cuts",metricImpact:"100% Smooth Speech Flow"},{stage:"2. 88.5% Real DAM Shot Retrieval",controlledEngine:"Queries SigLIP-2 Enterprise DAM Index for True Factory/Product Clips",naiveBehavior:"Hallucinates Fake Company Buildings via Expensive T2V API",metricImpact:"99.4% vs 64.0% Brand Truth"},{stage:"3. 11.5% Abstract AI Metaphor Fill",controlledEngine:"Triggers AKS Wan 2.1 Only When DAM Cosine Similarity < 0.78",naiveBehavior:"Generates 100% of B-Roll from Scratch at $0.50/Second",metricImpact:"-99.8% AI Video Spend"},{stage:"4. Shot-Duration Speed-Ramp Fit",controlledEngine:"Applies Optical-Flow 0.85x–1.15x Speed Ramp to Match Utterance Slot",naiveBehavior:"Hard-Cuts B-Roll Mid-Action or Loops Short Clips Awkwardly",metricImpact:"$0.08 vs $45.00 (+$2.44M/Yr)"}]},"librosa-beat-snap-jcut-pacing":{id:"librosa-beat-snap-jcut-pacing",titleZh:"音乐鼓点节拍吸附（Librosa Beat-Snap ±12ms）与电影级 J-Cut / L-Cut 音画错位剪辑算法",titleEn:"Librosa Musical Beat-Snap (±12ms) & Cinematic J-Cut / L-Cut Audio-Visual Overlap Compiler",subtitleZh:"解决 AI 自动剪辑视频“画面生硬按句号一刀切、与背景音乐鼓点完全脱节像机器人拼盘”痛点：采用 Librosa 瞬态节拍检测自动吸附切点，并施加 -180ms J-Cut 声音先行过渡",subtitleEn:"Eliminates robotic sentence-boundary cuts by snapping B-Roll transitions to Librosa musical downbeats (±12ms) and applying -180ms J-Cut / +220ms L-Cut audio overlaps",controlledStack:"Librosa Downbeat Grid (±12ms) + -180ms J-Cut / +220ms L-Cut + -14 LUFS Ducking ($0.05/Video)",naiveStack:"Hard 0ms Simultaneous Audio+Video Cuts Ignoring BGM Rhythm ($12/Video · Robotic Pacing)",controlledSemanticMatchPct:99.2,naiveSemanticMatchPct:68.5,controlledEditorTimeReductionPct:92.8,naiveEditorTimeReductionPct:18,controlledCostPerVideoUsd:.05,naiveCostPerVideoUsd:12,controlledAnnualSavingsM:1.86,decisionSummaryZh:"为什么一眼就能看出一条视频是“初级 AI 剪辑工具”拼出来的，还是“资深剪辑师”剪出来的？核心差距在于两个专业手法：① **J-Cut 与 L-Cut（声画错位切）**：业余工具永远把声音和画面在同一毫秒硬切（0ms Butt-Cut），听起来一顿一顿极其生硬；而专业剪辑师会让下一句的声音提前 `180ms` 响起（J-Cut），或者让画面先切到 B-Roll 空镜而上一句尾音延续 `220ms`（L-Cut）！② **鼓点卡点（Beat-Snapping）**：我们通过 **`Librosa` 提取背景音乐的瞬态鼓点网格（Onset & Downbeat Grid）**，在不切碎人声词组的前提下，将 B-Roll 空镜的入点/出点自动在 `±150ms` 弹性窗口内磁吸对齐到最近的音乐重拍上（误差 `±12ms`），并配合侧链闪避（人声起时 BGM 自动压低 `-12dB`），成片律动感直接达到百万粉影视飓风级水准！",decisionSummaryEn:"Amateur AI video editors make simultaneous `0ms` audio-and-video butt-cuts at every period and ignore background music rhythm—creating a choppy, robotic cadence. Our **Cinematic Pacing Compiler** extracts the **musical onset and downbeat grid via `Librosa`**, snaps B-Roll visual cuts to the nearest musical beat within a `±150ms` elastic window (`±12ms` precision), and staggers audio transitions using **`-180ms` J-Cuts (audio leads video)** and **`+220ms` L-Cuts (video leads audio)**—delivering broadcast-grade editorial flow automatically.",stages:[{stage:"1. Librosa Downbeat & Onset Grid",controlledEngine:"Extracts Exact BPM & Transient Drum Beats Across BGM Track",naiveBehavior:"Cuts B-Roll at Arbitrary Timestamps Completely Off-Beat",metricImpact:"±12ms Beat-Sync Precision"},{stage:"2. Elastic ±150ms Cut-Point Snap",controlledEngine:"Shifts B-Roll In/Out Points to Nearest Musical Beat Without Clipping Speech",naiveBehavior:"Rigidly Cuts on ASR Punctuation Marks Only",metricImpact:"99.2% vs 68.5% Rhythm Score"},{stage:"3. Automated J-Cut & L-Cut Stagger",controlledEngine:"Leads Next Speaker Audio by -180ms (J-Cut) & Trails B-Roll by +220ms",naiveBehavior:"Simultaneous 0ms Butt-Cuts Create Jarring Robotic Stutter",metricImpact:"Cinema-Grade Editorial Flow"},{stage:"4. Look-Ahead Sidechain Ducking",controlledEngine:"Smoothly Ducks BGM by -12dB 80ms Before Voice Onset (-14 LUFS)",naiveBehavior:"BGM Drowns Out Speaker or Abruptly Steps Volume Up/Down",metricImpact:"$0.05 vs $12.00 (+$1.86M/Yr)"}]},"native-fcpxml-otio-nle-handoff":{id:"native-fcpxml-otio-nle-handoff",titleZh:"拒绝黑盒压死 MP4：一键导出 Premiere / DaVinci / Final Cut 原生多轨工程文件（FCPXML / OpenTimelineIO）",titleEn:"Zero MP4 Lock-In: Native Multi-Track NLE Project Export (`FCPXML / OpenTimelineIO / AAF`)",subtitleZh:"解决传统 AI 剪辑工具“只吐出一个压死的 MP4 视频，剪辑师想换掉第3个空镜或微调调色就得全部推倒重剪”痛点：直接生成 6轨道无损 OpenTimelineIO / FCPXML 工程，拖进 Premiere 10秒精修定稿",subtitleEn:"Solves the #1 reason pro video teams reject AI editors (flattened un-editable MP4 outputs): emits a 6-track OpenTimelineIO / FCPXML project file that opens natively in Premiere Pro & DaVinci Resolve",controlledStack:"6-Track OpenTimelineIO (.otio) / FCPXML 1.11 / AAF Export + 3-Choice B-Roll Stack ($0.04/Timeline)",naiveStack:"Black-Box SaaS Exporting Only a Flattened Burned-In MP4 ($25/Video · 100% Re-Edit Lock-In)",controlledSemanticMatchPct:100,naiveSemanticMatchPct:55,controlledEditorTimeReductionPct:95.6,naiveEditorTimeReductionPct:0,controlledCostPerVideoUsd:.04,naiveCostPerVideoUsd:25,controlledAnnualSavingsM:2.92,decisionSummaryZh:"为什么很多企业给影视后期团队买了昂贵的 AI 自动剪辑 SaaS，最后剪辑师们却根本不用？因为那些 SaaS **只吐出一个把字幕、音乐、空镜全部烧死在一起的单轨 MP4 文件**！一旦总监审片时说一句“把第 42 秒那个空镜往后挪半秒、换个备选镜头”，剪辑师面对压死的 MP4 束手无策，只能在 Premiere 里从零开始重新剪一遍（节省时间瞬间归零）！我们的核心理念是 **“AI 做 95% 粗剪编译，交付 100% 可编辑的原生多轨时间轴（AI Rough-Cut to Native NLE Timeline）”**：系统在 `14 秒` 内直接生成符合皮克斯/好莱坞工业标准的 **`OpenTimelineIO (.otio)` 与 `FCPXML 1.11`** 文件，在 Premiere Pro 或 DaVinci Resolve 打开后直接呈現 **6 条清晰分轨（V1 主讲人 A-Roll、V2 首选 B-Roll、V3/V4 隐藏的 Top-2/Top-3 备选 B-Roll、V5 矢量字幕轨、A1/A2 分离人声与包络线音乐轨）**——剪辑师想换镜头只需按一下键盘 `Enable`，精修耗时从 `8.5 小时` 暴降至 **`20 分钟`（提效 `-95.6%`，年省 `+$2.92M`）**！",decisionSummaryEn:"Professional enterprise video teams reject consumer AI video editors because they output a **flattened, burned-in MP4**—meaning if a director asks to swap one B-Roll clip at `00:42` or tweak color grading, the editor must rebuild the entire timeline from scratch in Premiere Pro (`0%` net time saved). Our **Native NLE Timeline Compiler** outputs standards-based **`OpenTimelineIO (.otio)` and `FCPXML 1.11`** project files containing **6 editable tracks**: `V1 (A-Roll)`, `V2 (Primary B-Roll)`, `V3/V4 (Muted Rank #2/#3 Alternative B-Roll Candidates stacked directly above!)`, `V5 (Editable Subtitle Graphics)`, and `A1/A2 (Keyframed Dialogue & BGM Stems)`—cutting human finishing time from `8.5 hours` to **`20 minutes` (`-95.6%` labor reduction, saving `+$2.92M/yr`)**.",stages:[{stage:"1. 6-Track OpenTimelineIO & FCPXML",controlledEngine:"Emits Native Multi-Track Timeline for Premiere, DaVinci & Final Cut",naiveBehavior:"Outputs Flattened Burned-In MP4 That Cannot Be Edited",metricImpact:"100% Non-Destructive Editability"},{stage:"2. Stacked Top-3 B-Roll Alternatives",controlledEngine:"Places Muted Rank #2 & #3 B-Roll Clips on Tracks V3/V4 for 1-Click Swap",naiveBehavior:"Editor Must Search DAM Again If Director Dislikes 1 Clip",metricImpact:"1-Second Alternative Shot Swap"},{stage:"3. Preserved Handle Frames (±2s)",controlledEngine:"Includes ±48 Frame Trim Handles on Every Clip for Slip/Slide Edits",naiveBehavior:"Hard-Trimmed Clips Have Zero Extra Frames for Dissolves",metricImpact:"95.6% Faster Editor Finishing"},{stage:"4. Editable Keyframed Audio Envelopes",controlledEngine:"Writes Native Volume Ducking Keyframes on Track A2 (Adjustable)",naiveBehavior:"Permanently Bakes Music Over Voice Into Single Stereo Track",metricImpact:"$0.04 vs $25.00 (+$2.92M/Yr)"}]}};function d(n,i="controlled"){const e=c[n],a=i==="controlled",t=Number((e.controlledSemanticMatchPct-e.naiveSemanticMatchPct).toFixed(1)),o=Number(((e.naiveCostPerVideoUsd-e.controlledCostPerVideoUsd)/e.naiveCostPerVideoUsd*100).toFixed(1));return{scenario:e,mode:i,activeSemanticMatchPct:a?e.controlledSemanticMatchPct:e.naiveSemanticMatchPct,activeEditorTimeReductionPct:a?e.controlledEditorTimeReductionPct:e.naiveEditorTimeReductionPct,activeCostPerVideoUsd:a?e.controlledCostPerVideoUsd:e.naiveCostPerVideoUsd,matchGainPts:t,costReductionPct:o,annualSavingsM:e.controlledAnnualSavingsM}}let s="semantic-dam-broll-hybrid-fill",l="controlled";function r(){const n=document.querySelector("#app");if(!n)return;const i=d(s,l),e=i.scenario,a=l==="controlled";n.innerHTML=`
    <main class="workbench-shell" data-mode="${l}" data-scenario="${s}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">232ND WORKBENCH · DOMAIN 3: VIDEO POST-PRODUCTION & NLE COMPILER · B-ROLL BEAT-SNAP + FCPXML / OTIO ROUGH-CUT</span>
          <h1>企业长视频自动配 B-Roll 空镜、鼓点卡点与 Premiere/DaVinci 多轨时间轴（FCPXML / OTIO）粗剪编译工作台</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="EDL Compiler Scenario">
            ${Object.keys(c).map(t=>`
              <button class="seg-btn ${s===t?"active":""}" data-scenario-btn="${t}">
                ${t==="semantic-dam-broll-hybrid-fill"?"1. 88.5% 企业 DAM 真实空镜检索 + 11.5% AI 补缺":t==="librosa-beat-snap-jcut-pacing"?"2. Librosa 音乐鼓点吸附 (±12ms) + J-Cut/L-Cut":"3. 导出 6轨可编辑 FCPXML / OpenTimelineIO 工程"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="EDL Compiler Mode">
            <button class="seg-btn ${a?"active":""}" data-mode-btn="controlled">
              ✅ DAM 先搜后生 + 鼓点 J-Cut + 6轨 FCPXML/OTIO 导出 (提效 -${e.controlledEditorTimeReductionPct}% · $${e.controlledCostPerVideoUsd}/支)
            </button>
            <button class="seg-btn ${a?"":"active"}" data-mode-btn="naive">
              ⛔ 全量 AI 生成假空镜 / 黑盒导出压死不可改 MP4 (匹配度 ${e.naiveSemanticMatchPct}% · $${e.naiveCostPerVideoUsd}/支)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">空镜语义与品牌真实度 (B-Roll Semantic Truth)</span>
          <strong class="kpi-val ${a?"good":"warn"}">${i.activeSemanticMatchPct}%</strong>
          <span class="kpi-note">净增 +${i.matchGainPts} pts · 88.5% 复用企业真实工厂/产品实拍库</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">后期剪辑工时削减率 (Editor Time Saved)</span>
          <strong class="kpi-val ${a?"good":"warn"}">-${i.activeEditorTimeReductionPct}%</strong>
          <span class="kpi-note">8.5小时手工翻素材粗剪 -> 14秒生成 Premiere 6轨工程</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">单支 10分钟长视频粗剪成本 (Cost per Video)</span>
          <strong class="kpi-val ${a?"good":"warn"}">$${i.activeCostPerVideoUsd}</strong>
          <span class="kpi-note">成本直降 -${i.costReductionPct}% · 告别全量调 Sora/Veo 烧 $45</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">年化影视后期制作净省 (Annual Post Savings)</span>
          <strong class="kpi-val good">+$${i.annualSavingsM.toFixed(2)}M/yr · 232nd Studio</strong>
          <span class="kpi-note">原生兼容 Premiere Pro / DaVinci Resolve / Final Cut</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. WhisperX 气口裁剪 × SigLIP-2 先搜后生 B-Roll × Librosa 鼓点 J-Cut × 6轨 FCPXML/OTIO 编译器</h2>
            <span class="badge">${a?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="Enterprise Video B-Roll Beat-Sync and FCPXML OTIO Timeline Compiler">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="202" height="126" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
              <text x="14" y="24" fill="#6ee7b7" font-size="11.5" font-weight="700">1. 先搜后生 (88.5% DAM 实拍)</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">$0.08 vs $45/支</text>
              <text x="14" y="68" fill="#a7f3d0" font-size="10.5">• 优先检索 SigLIP-2 企业真实工厂/产品库</text>
              <text x="14" y="88" fill="#a7f3d0" font-size="10.5">• 仅 11.5% 抽象概念空镜触发 Wan 2.1 生成</text>
              <text x="14" y="108" fill="#34d399" font-size="10.5" font-weight="700">• 杜绝 AI 把公司真实总部大楼画成假建筑</text>
            </g>

            <g transform="translate(239, 20)">
              <rect width="202" height="126" rx="10" fill="#111c33" stroke="#3b82f6" stroke-width="1.5" />
              <text x="14" y="24" fill="#93c5fd" font-size="11.5" font-weight="700">2. 鼓点磁吸与 J-Cut/L-Cut</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">±12ms 节拍卡点</text>
              <text x="14" y="68" fill="#cbd5e1" font-size="10.5">• Librosa 提取 BGM 重拍网格自动磁吸切点</text>
              <text x="14" y="88" fill="#cbd5e1" font-size="10.5">• -180ms J-Cut 声音先行消除跳切突兀感</text>
              <text x="14" y="108" fill="#60a5fa" font-size="10.5" font-weight="700">• 自动写入 -12dB 侧链闪避音量包络关键帧</text>
            </g>

            <g transform="translate(458, 20)">
              <rect width="202" height="126" rx="10" fill="#3b0764" stroke="#a855f7" stroke-width="1.5" />
              <text x="14" y="24" fill="#d8b4fe" font-size="11.5" font-weight="700">3. 6轨 FCPXML / OTIO 原生工程</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">100% 后期无损精修</text>
              <text x="14" y="68" fill="#e9d5ff" font-size="10.5">• 彻底告别不可修改的黑盒压死单轨 MP4</text>
              <text x="14" y="88" fill="#e9d5ff" font-size="10.5">• V3/V4 轨道预置 Top-2/3 备选镜头一键替换</text>
              <text x="14" y="108" fill="#c084fc" font-size="10.5" font-weight="700">• 剪辑师定稿耗时从 8.5小时缩至 20分钟</text>
            </g>

            <g transform="translate(20, 162)">
              <rect width="640" height="118" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="26" fill="#38bdf8" font-size="13" font-weight="700">企业长视频 AI 辅助后期剪辑三大架构模式选型对比</text>
              <text x="18" y="52" fill="#e2e8f0" font-size="11.5">• 模式 A（推荐）：WhisperX 去水词 + SigLIP-2 DAM 先搜后生 + Librosa 鼓点 J-Cut + 导出 6轨 FCPXML/OTIO 工程（$0.04-$0.08/支）</text>
              <text x="18" y="76" fill="#e2e8f0" font-size="11.5">• 模式 B：消费级黑盒剪辑 SaaS（只导出一个烧死字幕与 BGM 的 MP4，一旦总监要求替换 1 个空镜就得全部推倒重来）</text>
              <text x="18" y="100" fill="#fca5a5" font-size="11.5" font-weight="700">• 模式 C（反模式）：不查企业历史实拍库，全量调用 Sora 2 / Veo 3 生成所有空镜（每支烧 $45 且伪造假工厂/假高管）</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段智能粗剪与多轨时间轴导出拆解</h2>
            <span class="badge">232nd Workbench</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 开放时间轴编译管线：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 黑盒 MP4 / 人工粗剪：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,n.querySelectorAll("[data-scenario-btn]").forEach(t=>{t.addEventListener("click",()=>{const o=t.dataset.scenarioBtn;o&&(s=o,r())})}),n.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const o=t.dataset.modeBtn;o&&(l=o,r())})})}r();
