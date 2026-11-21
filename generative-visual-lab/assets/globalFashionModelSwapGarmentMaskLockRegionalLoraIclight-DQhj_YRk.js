import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"eight-region-apparel-rollout":{id:"eight-region-apparel-rollout",titleZh:"1次国内棚拍 → 8大海外市场多族裔/多肤色模特同步上新（Monk Skin Tone 1–10 全身皮肤一致性锁）",titleEn:"1 Studio Shoot -> 8 Global Markets Demographic Model Localization (Monk Skin Tone MST 1–10 Full-Body Lock)",subtitleZh:"对比“朴素换脸插件 InsightFace（脸换成白人/黑人但脖子、手臂与小腿还是原亚洲模特肤色，穿帮率 100%）或全图重绘（改乱衣服纽扣面料）”与“18类人体解析 100% 锁死服装像素 + 全身裸露皮肤联合掩码 + 区域模特 LoRA（$0.036/套）”",subtitleEn:"Compares Face-Only Swap (mismatched face vs. neck/arms/legs skin tone) or Full Img2Img (corrupts garment buttons/stitching) vs. 18-Class HumanParsing 100% Garment Lock + Joint Face/Neck/Limb Skin Mask + MST LoRA ($0.036/8-region set)",monthlySkus:15e3,targetRegionsCount:8,controlledStack:"18-Class HumanParsing (100% Garment Lock) + Joint Face/Neck/Hand/Leg Mask + Flux.1-Fill MST LoRA ($0.036/set)",naiveStack:"Face-Only Swap (Two-Tone Limb Mismatch) or Commercial Fashion Model SaaS ($0.48/set · $450 Studio)",controlledGarmentSsimPct:100,naiveGarmentSsimPct:78.5,controlledSkinToneUniformityPct:99.6,naiveSkinToneUniformityPct:44,controlledCostPerSkuSetUsd:.036,naiveCostPerSkuSetUsd:.48,controlledAnnualSavingsM:1.98,decisionSummaryZh:"跨境服装电商（SHEIN / 独立站 / Amazon Fashion）最痛的视觉难题是：同一件连衣裙在广州棚拍了 1 套亚洲模特图，发往欧美、中东、拉美、非裔市场时，如果只用 `InsightFace / Roop` 换脸，**模特的脸变成了深肤色非裔或金发白人，但露出来的脖子、锁骨、手臂和小腿却还是原本的白皙亚洲肤色（俗称“拼接怪”，全身肤色一致性仅 44.0%）**；如果为了改手臂肤色去做全图重绘，衣服上的提花刺绣和纽扣数量又被 AI 改得面目全非（货不对板退货）！正确架构是通过 **`SCHP / SegFormer` 18 类人体语义解析**：将【上衣+裤裙+鞋包】100% 像素级硬锁（`SSIM = 1.000`），同时将【脸+颈部+左/右臂+手掌+腿部+头发】合并为统一的全身生理重绘掩码，输入绑定了 `Monk Skin Tone (MST 1-10)` 肤色色卡的 `Flux.1-Fill + 区域签约模特 LoRA`，实现全身肤色色差 $Delta E < 0.8$（99.6% 一致性），8 国全套主图成本仅 $0.036！",decisionSummaryEn:"Face-only swap tools (`InsightFace`) fail in fashion e-commerce because swapping an East Asian studio model face to a Black, Latina, or Nordic face leaves the exposed neck, collarbones, arms, hands, and legs in the original skin tone (`44.0%` uniformity). Using 18-class `HumanParsing` to **hard-lock 100% of the garment pixels (`SSIM = 1.000`)** while jointly masking `{face + neck + arms + hands + legs + hair}` into a single `Flux.1-Fill + Regional Model LoRA` pass conditioned on `Monk Skin Tone (MST 1–10)` palettes achieves 99.6% full-body skin uniformity at $0.036 per 8-region set.",stages:[{stage:"1. 18-Class Human Semantic Parse",controlledEngine:"SegFormer-B5 + VitMatte: Hard-Lock Garment; Union All Exposed Skin",naiveBehavior:"Face-Box Mask Only (Leaves Neck, Hands & Legs Unchanged)",metricImpact:"99.6% vs 44.0% Full-Body Skin Match"},{stage:"2. Hand & Pose Skeleton Lock",controlledEngine:"DWPose + DepthAnything-V2 Locks Finger Joints & Collar Occlusion",naiveBehavior:"Unconstrained Limb Inpainting Creating 6-Fingered Hands",metricImpact:"100% Original Hand Pose Retained"},{stage:"3. MST-Calibrated Regional LoRA",controlledEngine:"Flux.1-Fill + Licensed Regional Model LoRAs (MST 1–10 LAB Lock)",naiveBehavior:'Prompt-Only ("change model to European") Mutates Dress Lace',metricImpact:"100.0% vs 78.5% Garment SSIM"},{stage:"4. Collar/Cuff Subsurface Bounce",controlledEngine:"2px領口/袖口 Color-Bounce & Ambient Shadow Blend onto New Skin",naiveBehavior:"Harsh Cutout Seam Between Locked Shirt Collar and New Neck",metricImpact:"$0.036 vs $0.48 per 8-Region Set"}]},"sheer-lace-hollow-garment":{id:"sheer-lace-hollow-garment",titleZh:"蕾丝镂空、薄纱透肉与细吊带服饰模特换肤色（双层本征拆分：锁死纱线纹理 + 替换底层透出肤色）",titleEn:"Sheer Chiffon, Lace Cutout & Strap Apparel Model Swap (Intrinsic Yarn-vs-Skin Layer Decomposition)",subtitleZh:"攻克服装换模特最高难度边界：当衣服包含半透明黑丝/白纱或镂空蕾丝时，不能把蕾丝当成死铁板（否则蕾丝孔洞里透出的还是旧模特的白皮肤）！采用“VitMatte 纱线透明度拆分 + 底层新肤色垫底 + 顶层蕾丝纹路无损回盖”",subtitleEn:"Solves sheer lace & chiffon cutouts where the old model skin shows through the fabric holes: VitMatte Yarn Opacity Split + New MST Skin Underlay + Lossless Lace Weave Composite",monthlySkus:6e3,targetRegionsCount:8,controlledStack:"VitMatte Sub-Millimeter Lace Opacity Split + MST Skin Underlay + Yarn Re-Composite ($0.048/set)",naiveStack:"Binary Garment Mask (Old Pale Skin Trapped Inside Lace Holes on Dark-Skinned Model)",controlledGarmentSsimPct:99.8,naiveGarmentSsimPct:64,controlledSkinToneUniformityPct:99.4,naiveSkinToneUniformityPct:38,controlledCostPerSkuSetUsd:.048,naiveCostPerSkuSetUsd:.75,controlledAnnualSavingsM:1.15,decisionSummaryZh:"普通“锁衣服掩码”方案一旦遇到**蕾丝镂空连衣裙、欧根纱半透袖子、网眼针织衫**就会彻底翻车：因为如果用二值掩码把整条袖子锁死，当模特换成深肤色（MST 8–10）非裔模特时，黑色的手臂伸进半透明白纱袖子里，袖子里面透出来的竟然还是原模特的白皮肤！我们通过 **“纱线与底肤本征双层剥离（Yarn-Skin Intrinsic Split）”**：在袖口/蕾丝区域根据原模特的肤色基线解算出每一根蕾丝纱线的精确不透明度 $alpha_{	ext{yarn}} in [0, 1]$ 与纯纱线颜色，先在底层生成连续的新模特深色手臂皮肤，再按 $alpha_{	ext{yarn}}$ 将原始 4K 蕾丝花纹丝毫不差地叠回新皮肤之上，完美还原深色肌肤透过白纱的自然物理视效！",decisionSummaryEn:"Binary garment masks fail on sheer lace, chiffon sleeves, and mesh knitwear: when swapping a pale studio model to a deep-toned (MST 8–10) model, the pale skin trapped behind the lace holes clashes terribly with the new dark hands and neck (`38.0%` uniformity). Unmixing the sheer garment zone into a **Continuous Yarn Opacity Layer ($alpha_{	ext{yarn}}$)** and an **Underlying Skin Layer** allows `Flux.1-Fill` to render continuous new skin underneath before compositing the exact original lace threads back on top (`99.8%` lace SSIM, `99.4%` skin continuity).",stages:[{stage:"1. Sheer / Cutout Zone Detection",controlledEngine:"Detects Semi-Transparent Chiffon/Lace via Local Color-Variance Probe",naiveBehavior:"Treats Sheer Lace Sleeve as 100% Opaque Solid Block",metricImpact:"Zero Trapped Old Skin in Lace Holes"},{stage:"2. Yarn-vs-Skin Color Unmixing",controlledEngine:"Solves C_obs = α_yarn * C_yarn + (1 - α_yarn) * C_old_skin",naiveBehavior:"Either Destroys Lace Pattern or Keeps Wrong Underlying Skin",metricImpact:"99.8% vs 64.0% Lace Pattern Fidelity"},{stage:"3. Continuous Anatomy Inpainting",controlledEngine:"Generates Continuous New-MST Arm/Shoulder Skin Beneath Sheer Zone",naiveBehavior:"Abrupt Skin-Tone Jump at Chiffon Sleeve Boundary",metricImpact:"99.4% Seamless Skin Continuity"},{stage:"4. Lossless Yarn Re-Composite",controlledEngine:"Composites Original 4K Lace Threads Over New Skin + Specular Rim",naiveBehavior:"Blurry Hallucinated Lace Pattern",metricImpact:"$0.048 vs $0.75 per 8-Region Set"}]},"modest-styling-cultural-adaptation":{id:"modest-styling-cultural-adaptation",titleZh:"中东/东南亚多文化场景合规适配（商业街景本地化 + 签约虚拟模特肖像权合规库）",titleEn:"Middle East / SEA Cultural Scene Localization & Licensed Virtual Model Governance",subtitleZh:"在锁定主力商品服装 100% 不变的前提下，同步将背景街景从上海外滩切换为迪拜摩天楼/巴黎奥斯曼街区，并强制绑定具备全球商用买断授权的虚拟模特 LoRA",subtitleEn:"Simultaneously adapts background architecture (Shanghai -> Dubai / Paris / São Paulo) + licensed synthetic model IDs while locking 100% of the hero outfit",monthlySkus:1e4,targetRegionsCount:8,controlledStack:"100% Outfit Lock + Regional Model LoRA + L1 Cached Regional Street Clean-Plate ($0.042/set)",naiveStack:"Flying Physical Crew & Models to Paris/Dubai ($3,600/SKU) or Unlicensed Face Scraping",controlledGarmentSsimPct:100,naiveGarmentSsimPct:81,controlledSkinToneUniformityPct:99.7,naiveSkinToneUniformityPct:52,controlledCostPerSkuSetUsd:.042,naiveCostPerSkuSetUsd:.62,controlledAnnualSavingsM:1.65,decisionSummaryZh:"出海品牌不仅需要适配当地模特面孔与肤色，还需要匹配当地消费者熟悉的城市街景与文化审美（如巴黎街角咖啡馆、迪拜现代拱廊、圣保罗阳光海岸），同时严防使用未授权网红照片训练换脸导致的肖像权跨国诉讼。通过将 **“签约买断制区域虚拟模特 LoRA 库 + L1 预缓存的 8 国地标级空镜底板 + 100% 服装像素锁定”** 组合编排，单款服装仅需 $0.042 即可在 3.2 秒内生成 8 国合规本土化大片，点击转化率（CTR）较单一模特图平均提升 +46.8%！",decisionSummaryEn:"Global apparel localization requires matching both regional model demographics and culturally familiar street backdrops (Parisian Haussmann cafés, Dubai modern arcades, São Paulo beaches) with 100% right-of-publicity indemnity. Pairing **Indemnified Regional Synthetic Model LoRAs** with **L1-Cached Regional Street Clean Plates** and a **100% Garment Pixel Lock** produces 8 localized campaign sets in 3.2s at $0.042/set (+46.8% regional CTR lift).",stages:[{stage:"1. Licensed Model ID Registry",controlledEngine:"100% Indemnified Synthetic Regional Model LoRAs (Zero Real-Person Scraping)",naiveBehavior:"Scraping Instagram Influencer Faces (Severe GDPR/BIPA Lawsuit Risk)",metricImpact:"100% Global Right-of-Publicity Safety"},{stage:"2. Regional L1 Backdrop Pairing",controlledEngine:"Matches Outfit Season to Pre-Cached Paris/Dubai/Tokyo Street Plates",naiveBehavior:"East Asian Street Signs Left Behind European Model",metricImpact:"+46.8% Regional Ad Click-Through"},{stage:"3. Ambient Sunlight Color Match",controlledEngine:"Adjusts Skin Warmth & Ground Shadow Angle to Regional Street Plate",naiveBehavior:"Cold Studio Skin Tone Pasted into Warm Desert Sunlight",metricImpact:"99.7% Photometric Realism"},{stage:"4. Automated Marketplace Sizing",controlledEngine:"Emits Amazon 1:1, TikTok 9:16, and Shopify 3:4 Crops Simultaneously",naiveBehavior:"Manual Cropping Cutting Off Model Head or Shoes",metricImpact:"$0.042 vs $0.62/Set (+$1.65M/Yr)"}]}};function S(o,a="controlled"){const e=c[o],n=a==="controlled",t=Number((e.controlledGarmentSsimPct-e.naiveGarmentSsimPct).toFixed(1)),i=Number((e.controlledSkinToneUniformityPct-e.naiveSkinToneUniformityPct).toFixed(1)),d=Number(((e.naiveCostPerSkuSetUsd-e.controlledCostPerSkuSetUsd)/e.naiveCostPerSkuSetUsd*100).toFixed(1));return{scenario:e,mode:a,activeGarmentSsimPct:n?e.controlledGarmentSsimPct:e.naiveGarmentSsimPct,activeSkinToneUniformityPct:n?e.controlledSkinToneUniformityPct:e.naiveSkinToneUniformityPct,activeCostPerSkuSetUsd:n?e.controlledCostPerSkuSetUsd:e.naiveCostPerSkuSetUsd,garmentFidelityGainPts:t,skinUniformityGainPts:i,costReductionPct:d,annualSavingsM:e.controlledAnnualSavingsM}}let s="eight-region-apparel-rollout",l="controlled";function r(){const o=document.querySelector("#app");if(!o)return;const a=S(s,l),e=a.scenario,n=l==="controlled";o.innerHTML=`
    <main class="workbench-shell" data-mode="${l}" data-scenario="${s}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">216TH WORKBENCH · DOMAIN 2 · GLOBAL FASHION MODEL LOCALIZATION & DEMOGRAPHIC SWAP STUDIO</span>
          <h1>跨境时尚电商全球多肤色/多族裔模特本地化工作台：100% 服装掩码锁死 + 全身裸露皮肤联合重绘 + 蕾丝本征拆分</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="Fashion Swap Scenario">
            ${Object.keys(c).map(t=>`
              <button class="seg-btn ${s===t?"active":""}" data-scenario-btn="${t}">
                ${t==="eight-region-apparel-rollout"?"1. 1次棚拍 → 8国多肤色全身模特同步上新 (MST 1–10)":t==="sheer-lace-hollow-garment"?"2. 蕾丝镂空/薄纱透肉双层本征拆分 (纱线锁死+底肤替换)":"3. 中东/欧美街景文化适配 + 买断制模特肖像合规库"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Swap Mode">
            <button class="seg-btn ${n?"active":""}" data-mode-btn="controlled">
              ✅ 服装 100% 锁死 + 全身皮肤联合掩码 + 蕾丝拆分 ($${e.controlledCostPerSkuSetUsd}/8国套图)
            </button>
            <button class="seg-btn ${n?"":"active"}" data-mode-btn="naive">
              ⛔ 朴素单换脸插件 / 全图重绘 ($${e.naiveCostPerSkuSetUsd}/套 · 脖子手臂双截色穿帮)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">服装面料与版型像素锁定率 (Garment SSIM Lock)</span>
          <strong class="kpi-val ${n?"good":"warn"}">${a.activeGarmentSsimPct}%</strong>
          <span class="kpi-note">净增 +${a.garmentFidelityGainPts} pts · 纽扣/走线/刺绣 0 篡改</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">脸-颈-手-腿全身肤色一致性 (Full-Body Skin Match)</span>
          <strong class="kpi-val ${n?"good":"warn"}">${a.activeSkinToneUniformityPct}%</strong>
          <span class="kpi-note">净增 +${a.skinUniformityGainPts} pts · 消除“换脸不换手”双截色</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">8大海外市场全套生成成本 (Cost / 8-Region Set)</span>
          <strong class="kpi-val ${n?"good":"warn"}">$${a.activeCostPerSkuSetUsd.toFixed(3)}</strong>
          <span class="kpi-note">降本 -${a.costReductionPct}% · 对比 8国实拍 $3,600/款</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">年化节省与区域点击率提升 (Savings & CTR Lift)</span>
          <strong class="kpi-val good">+$${a.annualSavingsM.toFixed(2)}M/yr · +46.8% CTR</strong>
          <span class="kpi-note">覆盖 Monk Skin Tone (MST 1–10) 全谱系色卡</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 为什么服装出海绝对不能只用“换脸插件 (InsightFace)”？18类人体解析与蕾丝透肤双层拆分图解</h2>
            <span class="badge">${n?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="Global Fashion Model Swap Garment Lock and Skin Mask">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="305" height="132" rx="10" fill="#111c33" stroke="#10b981" stroke-width="1.5" />
              <text x="16" y="24" fill="#6ee7b7" font-size="12" font-weight="700">✅ 全身裸露皮肤联合掩码 + 蕾丝本征拆分 (99.6% 一致)</text>
              <circle cx="95" cy="54" r="16" fill="#8d5524" stroke="#34d399" stroke-width="1.5" />
              <rect x="87" y="70" width="16" height="10" fill="#8d5524" />
              <rect x="70" y="80" width="50" height="36" rx="4" fill="#065f46" stroke="#34d399" stroke-width="2" />
              <text x="95" y="102" fill="#f8fafc" font-size="9" text-anchor="middle" font-weight="700">100% Locked</text>
              <rect x="54" y="82" width="14" height="32" rx="4" fill="#8d5524" stroke="#34d399" />
              <rect x="122" y="82" width="14" height="32" rx="4" fill="#8d5524" stroke="#34d399" />
              <text x="155" y="56" fill="#e2e8f0" font-size="10.5">• 脸+颈+双臂+手+腿共享同一 MST 肤色潜变量</text>
              <text x="155" y="78" fill="#e2e8f0" font-size="10.5">• 蕾丝孔洞底层透出匹配新肤色 (无残留白底)</text>
              <text x="155" y="100" fill="#34d399" font-size="10.5" font-weight="700">• 服装本体像素 100% 原图贴回 (零退货争议)</text>
            </g>

            <g transform="translate(350, 20)">
              <rect width="310" height="132" rx="10" fill="#1f121c" stroke="#ef4444" stroke-width="1.5" />
              <text x="16" y="24" fill="#fca5a5" font-size="12" font-weight="700">⛔ 朴素单换脸插件 / 二值掩码 (双截色穿帮 · 44% 一致)</text>
              <circle cx="95" cy="54" r="16" fill="#8d5524" stroke="#f87171" stroke-width="1.5" />
              <rect x="87" y="70" width="16" height="10" fill="#ffdbac" />
              <rect x="70" y="80" width="50" height="36" rx="4" fill="#3f1d2e" stroke="#f87171" />
              <rect x="54" y="82" width="14" height="32" rx="4" fill="#ffdbac" stroke="#f87171" />
              <rect x="122" y="82" width="14" height="32" rx="4" fill="#ffdbac" stroke="#f87171" />
              <text x="155" y="56" fill="#fecaca" font-size="10.5">• 脸换成了深肤色，脖子和手臂还是原白皙肤色!</text>
              <text x="155" y="78" fill="#fecaca" font-size="10.5">• 蕾丝袖口孔洞里卡着上一位模特的浅色皮肤</text>
              <text x="155" y="100" fill="#f87171" font-size="10.5" font-weight="700">• 若全图重绘则把衣服纽扣与刺绣全部改错</text>
            </g>

            <g transform="translate(20, 166)">
              <rect width="640" height="114" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="26" fill="#38bdf8" font-size="13" font-weight="700">跨境时尚电商多国模特本地化三大工程护栏 (Apparel Localization Guardrails)</text>
              <text x="18" y="50" fill="#e2e8f0" font-size="11.5">1. 全身皮肤联合掩码：HumanParsing 提取 {Face ∪ Neck ∪ LeftArm ∪ RightArm ∪ Hands ∪ Legs}，统一绑定同一 MST 1–10 肤色向量</text>
              <text x="18" y="74" fill="#e2e8f0" font-size="11.5">2. 半透蕾丝/薄纱本征解混：求解 C_obs = α_yarn·C_yarn + (1 - α_yarn)·C_old_skin，先换底肤再无损叠回 4K 原始纱线</text>
              <text x="18" y="98" fill="#34d399" font-size="11.5" font-weight="700">3. 领口/袖口 2px 次表面漫反射融合：将服装主色以 8% 柔光渗透至新模特颈部与手腕交界处，彻底消除抠图硬边</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段全球多肤色服装模特本地化流水线拆解</h2>
            <span class="badge">Monk Skin Tone 1–10</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 全身联合重绘 + 锁衣：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 单换脸/全图重绘：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,o.querySelectorAll("[data-scenario-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.scenarioBtn;i&&(s=i,r())})}),o.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.modeBtn;i&&(l=i,r())})})}r();
