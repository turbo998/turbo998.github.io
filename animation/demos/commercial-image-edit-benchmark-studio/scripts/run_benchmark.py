import asyncio
import base64
import hashlib
import io
import json
import subprocess
import time
from pathlib import Path
import httpx
from PIL import Image

WORKSPACE = Path(__file__).resolve().parent.parent
REF_DIR = WORKSPACE / "references"
OUT_DIR = WORKSPACE / "outputs"
RUNS_DIR = WORKSPACE / "runs"
OUT_DIR.mkdir(parents=True, exist_ok=True)
RUNS_DIR.mkdir(parents=True, exist_ok=True)

SUBSCRIPTION = "<your-azure-subscription>"
SERVICES_BASE = "https://<your-foundry-resource>.services.ai.azure.com"
OPENAI_BASE = "https://<your-foundry-resource>.openai.azure.com"

MODELS = [
    {
        "id": "mai-image-2-7",
        "editableId": "mai",
        "label": "MAI-Image-2.7",
        "provider": "Microsoft MAI",
        "deployment": "mai-image-27",
        "version": "2026-11-02",
        "family": "mai",
        "pricingModel": "flat_per_image",
        "flatPriceUsd": 0.035,
        "supportsTransparentEdit": True,
        "concurrency": 2,
    },
    {
        "id": "mai-image-2-7-flash",
        "editableId": "maiFlash",
        "label": "MAI-Image-2.7-Flash",
        "provider": "Microsoft MAI",
        "deployment": "mai-image-27-flash",
        "version": "2026-11-02",
        "family": "mai",
        "pricingModel": "flat_per_image",
        "flatPriceUsd": 0.010,
        "supportsTransparentEdit": True,
        "concurrency": 2,
    },
    {
        "id": "mai-image-2-6",
        "editableId": "mai26",
        "label": "MAI-Image-2.6",
        "provider": "Microsoft MAI (Prior Gen)",
        "deployment": "mai-image-26",
        "version": "2026-07-31",
        "family": "mai",
        "pricingModel": "flat_per_image",
        "flatPriceUsd": 0.035,
        "supportsTransparentEdit": True,
        "concurrency": 1,
    },
    {
        "id": "flux-2-pro",
        "editableId": "fluxPro",
        "label": "FLUX.2-pro",
        "provider": "Black Forest Labs",
        "deployment": "flux-2-pro",
        "version": "1",
        "family": "flux",
        "pricingModel": "per_megapixel",
        "flatPriceUsd": 0.04645728,
        "supportsTransparentEdit": False,
        "concurrency": 1,
    },
    {
        "id": "flux-2-flex",
        "editableId": "fluxFlex",
        "label": "FLUX.2-flex",
        "provider": "Black Forest Labs",
        "deployment": "flux-2-flex",
        "version": "1",
        "family": "flux",
        "pricingModel": "per_megapixel",
        "flatPriceUsd": 0.1048576,
        "supportsTransparentEdit": False,
        "concurrency": 1,
    },
    {
        "id": "gpt-image-2",
        "editableId": "gptImage",
        "label": "gpt-image-2",
        "provider": "OpenAI",
        "deployment": "gpt-image-2",
        "version": "2026-04-21",
        "family": "openai",
        "quality": "medium",
        "pricingModel": "token_variable",
        "supportsTransparentEdit": True,
        "concurrency": 1,
    },
    {
        "id": "gpt-image-2-5-sunburst",
        "editableId": "gptImageSunburst",
        "label": "gpt-image-2.5-sunburst",
        "provider": "OpenAI",
        "deployment": "gpt-image-25-sunburst",
        "version": "2026-09-08",
        "family": "openai",
        "quality": "high",
        "pricingModel": "token_variable",
        "supportsTransparentEdit": True,
        "concurrency": 1,
    },
    {
        "id": "gpt-image-2-5-flare",
        "editableId": "gptImageFlare",
        "label": "gpt-image-2.5-flare",
        "provider": "OpenAI",
        "deployment": "gpt-image-25-flare",
        "version": "2026-09-08",
        "family": "openai",
        "quality": "high",
        "pricingModel": "token_variable",
        "supportsTransparentEdit": True,
        "concurrency": 1,
    },
]

SCENARIOS = [
    {
        "index": 1,
        "id": "portrait-retouch",
        "vertical": "Portrait",
        "category_en": "Portrait · Retouch",
        "category_zh": "人像 · 精修",
        "title_en": "Natural portrait retouch",
        "title_zh": "自然人像精修",
        "prompt_en": "Retouch this portrait for a professional profile photo. Gently reduce temporary blemishes and even the skin tone while preserving the person's exact identity, facial structure, freckles, expression, hair, clothing, pose, and the entire background. Keep natural skin texture; do not make the face look airbrushed.",
        "prompt_zh": "为职业头像轻度修饰这张人像。淡化暂时性瑕疵并均匀肤色，同时保留人物的准确身份、面部结构、雀斑、表情、发型、服装、姿势和完整背景。保留自然皮肤纹理，不要过度磨皮。",
    },
    {
        "index": 2,
        "id": "id-photo",
        "vertical": "Portrait",
        "category_en": "Portrait · Identity",
        "category_zh": "人像 · 证件照",
        "title_en": "Compliant ID-photo background",
        "title_zh": "证件照背景规范化",
        "prompt_en": "Edit this into a clean formal ID-style portrait: replace only the background with an even pale blue-gray, center the head and shoulders, and keep the original person, facial features, hair, clothing, expression, and lighting natural and unchanged. Do not add text or accessories.",
        "prompt_zh": "将此图编辑为简洁正式的证件照：仅将背景替换为均匀的浅蓝灰色，并将头部和肩部居中。保持原人物、面部特征、发型、服装、表情和光线自然且不变。不要添加文字或配饰。",
    },
    {
        "index": 3,
        "id": "profile-color",
        "vertical": "Portrait",
        "category_en": "Portrait · Color",
        "category_zh": "人像 · 调色",
        "title_en": "Editorial portrait color grade",
        "title_zh": "人像编辑色彩风格",
        "prompt_en": "Apply a restrained warm editorial color grade with soft golden-hour highlights and balanced shadows. Preserve the subject's exact face, hair, clothing color and texture, pose, framing, and all background objects. Keep realistic skin color and avoid adding or removing anything.",
        "prompt_zh": "应用克制的暖调编辑色彩，加入柔和的黄金时刻高光与均衡阴影。保留人物的准确面容、发型、服装颜色与纹理、姿势、构图及所有背景物体。保持真实肤色，不要添加或移除任何内容。",
    },
    {
        "index": 4,
        "id": "product-background",
        "vertical": "Product",
        "category_en": "Product · E-commerce",
        "category_zh": "商品 · 电商",
        "title_en": "Clean e-commerce backdrop",
        "title_zh": "简洁电商背景",
        "prompt_en": "Change only the background to a seamless warm-white e-commerce studio backdrop with a subtle natural contact shadow. Preserve the bottle's exact shape, glass color, cap, label placement, all label text, highlights, and proportions. Do not invent, remove, or rewrite product details.",
        "prompt_zh": "仅将背景改为无缝暖白色电商影棚背景，并加入自然的轻微接触阴影。保留瓶子的准确形状、玻璃颜色、瓶盖、标签位置、全部标签文字、高光和比例。不要虚构、移除或改写产品细节。",
    },
    {
        "index": 5,
        "id": "packaging-label",
        "vertical": "Product",
        "category_en": "Product · Packaging",
        "category_zh": "商品 · 包装",
        "title_en": "Packaging label colorway",
        "title_zh": "包装标签配色调整",
        "prompt_en": "Change only the small accent band on the front label from blue to forest green. Preserve the package shape, label layout, exact text and lettering, barcode, shadows, camera angle, background, and every other color. Do not add any branding or extra elements.",
        "prompt_zh": "仅将正面标签上的小色带从蓝色改为森林绿。保留包装形状、标签布局、准确文本与字形、条码、阴影、拍摄角度、背景和其他所有颜色。不要添加品牌标识或额外元素。",
    },
    {
        "index": 6,
        "id": "product-seasonal",
        "vertical": "Product",
        "category_en": "Product · Campaign",
        "category_zh": "商品 · 营销",
        "title_en": "Seasonal product scene",
        "title_zh": "季节性商品场景",
        "prompt_en": "Replace the plain background with a tasteful autumn tabletop campaign scene: warm amber light, a few soft-focus dried leaves far behind the product, and a muted beige surface. Keep the product itself—including its silhouette, label, colors, and position—exactly unchanged, sharp, and unobstructed.",
        "prompt_zh": "将纯色背景替换为雅致的秋季桌面营销场景：温暖琥珀色光线、商品后方少量虚化干叶，以及柔和米色台面。商品本身的轮廓、标签、颜色和位置必须保持完全不变，清晰且不被遮挡。",
    },
    {
        "index": 7,
        "id": "web-banner",
        "vertical": "Digital",
        "category_en": "Digital · Banner",
        "category_zh": "数字内容 · 横幅",
        "title_en": "Website hero banner",
        "title_zh": "网站主视觉横幅",
        "prompt_en": "Update only the background of this website hero banner to a subtle midnight-blue-to-teal gradient with faint soft light. Preserve the exact headline text, typography, font size, alignment, button, layout, and all foreground elements. Keep every word legible and do not add new copy.",
        "prompt_zh": "仅将网站主视觉横幅的背景改为细腻的午夜蓝至青绿色渐变，并加入微弱柔光。保留准确的标题文字、字体、字号、对齐方式、按钮、布局和所有前景元素。确保每个词清晰可读，不要添加新文案。",
    },
    {
        "index": 8,
        "id": "app-screen",
        "vertical": "Digital",
        "category_en": "Digital · UI",
        "category_zh": "数字内容 · UI",
        "title_en": "Mobile app color-system update",
        "title_zh": "移动应用配色更新",
        "prompt_en": "Change the interface accent color from coral to deep violet, including the primary button and selected navigation icon. Preserve the exact screen layout, text, icons, spacing, component shapes, device frame, and all other colors. Do not alter any labels or create new UI elements.",
        "prompt_zh": "将界面强调色从珊瑚色改为深紫色，包括主按钮和选中的导航图标。保留准确的屏幕布局、文本、图标、间距、组件形状、设备边框和其他所有颜色。不要更改标签或创建新 UI 元素。",
    },
    {
        "index": 9,
        "id": "character-style",
        "vertical": "Digital",
        "category_en": "Digital · Illustration",
        "category_zh": "数字内容 · 插画",
        "title_en": "Illustration palette adaptation",
        "title_zh": "插画调色适配",
        "prompt_en": "Recolor the background and decorative shapes into a calm sage-green and cream palette. Preserve the illustrated character's exact silhouette, pose, facial expression, clothing, accessories, linework, and placement. Do not add, remove, or redesign the character.",
        "prompt_zh": "将背景和装饰图形重新配色为沉静的鼠尾草绿与奶油色。保留角色准确的轮廓、姿势、表情、服装、配饰、线条和位置。不要添加、移除或重新设计角色。",
    },
    {
        "index": 10,
        "id": "logo-cleanup",
        "vertical": "Digital",
        "category_en": "Digital · Brand asset",
        "category_zh": "数字内容 · 品牌素材",
        "title_en": "Logo cleanup and transparency",
        "title_zh": "标志修复与透明背景",
        "prompt_en": "Clean up the edges of this existing logo and remove visible compression speckles. Preserve the exact symbol geometry, wordmark spelling, letterforms, spacing, proportions, and original dark-green color. Keep the composition centered on a clean transparent-looking neutral background; do not redesign or retype it.",
        "prompt_zh": "清理现有标志的边缘并去除明显的压缩杂点。保留准确的图形几何、品牌文字拼写、字形、间距、比例和原始深绿色。让构图居中，背景简洁且呈中性透明感；不要重新设计或重排文字。",
    },
    {
        "index": 11,
        "id": "native-transparent-cutout",
        "vertical": "MAI Differentiator",
        "category_en": "MAI Native · Alpha Cutout",
        "category_zh": "MAI 原生原语 · 透明通道直出",
        "title_en": "Native RGBA transparent product cutout",
        "title_zh": "原生 RGBA 透明背景免抠图直出",
        "transparent_mode": True,
        "prompt_en": "Isolate only the wireless studio headphones cleanly from the wooden stand and cluttered desk onto a true transparent background. Preserve the exact matte-titanium headband, cognac leather ear cushions, proportions, lighting, and surface details centered in frame for direct layer compositing. Do not draw a checkerboard pattern or extra props.",
        "prompt_zh": "将无线监听耳机从木质支架与杂乱桌面中干净分离至真实透明背景上。保留哑光钛金属头梁、干邑色皮革耳罩的准确比例、光影与材质细节并居中构图，可直接用于图层合成。严禁绘制棋盘格伪透明纹理或添加多余物体。",
    },
    {
        "index": 12,
        "id": "multi-turn-brand-consistency",
        "vertical": "MAI Differentiator",
        "category_en": "MAI Native · Multi-Turn Consistency",
        "category_zh": "MAI 原生原语 · 多轮改稿一致性",
        "title_en": "Two-turn iterative campaign consistency",
        "title_zh": "两轮连续商业改稿与双层路由一致性",
        "prompt_en": "Place this matte-black ceramic coffee canister onto a sunlit walnut café counter with soft morning window light and an out-of-focus espresso cup far behind it. Preserve the canister's exact cylindrical shape, brushed brass lid, cream front label, and 'KUROGANE ROAST · SINGLE ESTATE KYOTO · 200G' lettering sharp and unchanged.",
        "prompt_zh": "将这只哑光黑陶瓷咖啡罐置于晨光洒落的胡桃木咖啡馆吧台上，远景带有一只虚化的浓缩咖啡杯。严格保留罐体圆柱比例、拉丝黄铜罐盖、米白正面标签以及 'KUROGANE ROAST · SINGLE ESTATE KYOTO · 200G' 全部印刷字样清晰不变。",
        "turn2_prompt_en": "Shift only the lighting of this café scene from bright morning sunlight to warm evening pendant-lamp ambiance with soft golden reflections on the walnut counter. Preserve the exact canister, brushed brass lid, 'KUROGANE ROAST · SINGLE ESTATE KYOTO · 200G' label text, camera angle, and background espresso cup without altering any lettering or geometry.",
    },
]

PERTURBATION_SCENES = ["portrait-retouch", "packaging-label", "web-banner", "app-screen"]
PERTURBATION_MODELS = ["mai-image-2-7", "mai-image-2-7-flash", "flux-2-pro", "gpt-image-2-5-sunburst"]


def get_token() -> str:
    return subprocess.check_output(
        [
            "az.cmd",
            "account",
            "get-access-token",
            "--subscription",
            SUBSCRIPTION,
            "--resource",
            "https://cognitiveservices.azure.com",
            "--query",
            "accessToken",
            "-o",
            "tsv",
        ],
        text=True,
    ).strip()


def compute_openai_cost(usage: dict) -> float:
    in_details = usage.get("input_tokens_details") or {}
    text_in = in_details.get("text_tokens", 0)
    img_in = in_details.get("image_tokens", 0)
    out_tokens = usage.get("output_tokens", 0)
    return round((text_in * 5.0 + img_in * 8.0 + out_tokens * 30.0) / 1_000_000.0, 6)


async def call_edit_api(
    client: httpx.AsyncClient,
    token: str,
    model: dict,
    input_png: bytes,
    prompt: str,
    transparent: bool = False,
) -> dict:
    headers = {"Authorization": f"Bearer {token}"}
    dep = model["deployment"]
    fam = model["family"]

    last_err = None
    transparent_used = bool(transparent and model.get("supportsTransparentEdit"))

    for attempt in range(18):
        t0 = time.perf_counter()
        try:
            if fam == "mai":
                data = {
                    "model": dep,
                    "prompt": prompt,
                    "width": "1024",
                    "height": "1024",
                }
                if transparent_used:
                    data["background"] = "transparent"
                resp = await client.post(
                    f"{SERVICES_BASE}/mai/v1/images/edits",
                    headers=headers,
                    data=data,
                    files=[("image", ("ref.png", input_png, "image/png"))],
                )
                # Fallback if prior-gen mai-image-26 rejects background=transparent
                if resp.status_code == 400 and transparent_used and dep == "mai-image-26":
                    transparent_used = False
                    continue
            elif fam == "flux":
                b64_in = base64.b64encode(input_png).decode("ascii")
                resp = await client.post(
                    f"{SERVICES_BASE}/providers/blackforestlabs/v1/{dep}?api-version=preview",
                    headers={**headers, "Content-Type": "application/json"},
                    json={
                        "model": dep,
                        "prompt": prompt,
                        "width": 1024,
                        "height": 1024,
                        "output_format": "png",
                        "input_image": b64_in,
                    },
                )
            elif fam == "openai":
                data = {
                    "prompt": prompt,
                    "size": "1024x1024",
                    "n": "1",
                    "output_format": "png",
                    "quality": model["quality"],
                }
                if transparent_used:
                    data["background"] = "transparent"
                resp = await client.post(
                    f"{OPENAI_BASE}/openai/deployments/{dep}/images/edits?api-version=2025-04-01-preview",
                    headers=headers,
                    data=data,
                    files=[("image", ("ref.png", input_png, "image/png"))],
                )
            else:
                raise ValueError(f"Unknown family: {fam}")

            latency_ms = round((time.perf_counter() - t0) * 1000)

            if resp.status_code in (429, 500, 502, 503, 504):
                retry_after = float(resp.headers.get("Retry-After", 15 + 5 * (attempt % 6)))
                retry_after = max(retry_after, 12.0)
                print(f"  [HTTP {resp.status_code}] {model['id']} retry in {retry_after}s", flush=True)
                await asyncio.sleep(min(retry_after, 45.0))
                continue

            resp.raise_for_status()
            body = resp.json()
            out_bytes = base64.b64decode(body["data"][0]["b64_json"])

            if fam == "openai":
                usage = body.get("usage") or {}
                cost_usd = compute_openai_cost(usage)
            elif fam == "mai":
                usage = body.get("usage") or {}
                cost_usd = model["flatPriceUsd"]
            else:
                usage = body.get("request_meta") or {}
                cost_usd = model["flatPriceUsd"]

            return {
                "png_bytes": out_bytes,
                "latency_ms": latency_ms,
                "usage": usage,
                "cost_usd": cost_usd,
                "transparent_requested": transparent_used,
            }
        except Exception as e:
            last_err = e
            wait_s = 3.0 * (attempt + 1)
            print(f"  [ERR attempt {attempt+1}/6] {model['id']}: {e} -> sleep {wait_s}s", flush=True)
            await asyncio.sleep(wait_s)

    raise RuntimeError(f"Exhausted retries for {model['id']}: {last_err}")


async def run_single_job(
    sem: asyncio.Semaphore,
    client: httpx.AsyncClient,
    token_holder: dict,
    run_key: str,
    suite: str,
    model: dict,
    scene_id: str,
    input_path: Path,
    out_rel_png: str,
    prompt: str,
    transparent: bool = False,
    locale: str = "en",
):
    meta_file = RUNS_DIR / f"{run_key}.json"
    out_file = WORKSPACE / out_rel_png
    if meta_file.exists() and out_file.exists():
        return json.loads(meta_file.read_text(encoding="utf-8"))

    out_file.parent.mkdir(parents=True, exist_ok=True)
    input_bytes = input_path.read_bytes()

    async with sem:
        res = await call_edit_api(
            client=client,
            token=token_holder["token"],
            model=model,
            input_png=input_bytes,
            prompt=prompt,
            transparent=transparent,
        )

    out_bytes = res["png_bytes"]
    out_file.write_bytes(out_bytes)

    # Also save optimized WebP (preserving RGBA alpha for transparent cutouts!)
    im = Image.open(io.BytesIO(out_bytes))
    webp_rel = out_rel_png[:-4] + ".webp"
    webp_file = WORKSPACE / webp_rel
    im.save(webp_file, format="WEBP", quality=88, method=4)

    has_alpha = "A" in im.getbands()
    sha = hashlib.sha256(out_bytes).hexdigest()

    record = {
        "runKey": run_key,
        "suite": suite,
        "locale": locale,
        "modelId": model["id"],
        "editableModelId": model["editableId"],
        "modelLabel": model["label"],
        "provider": model["provider"],
        "deployment": model["deployment"],
        "sceneId": scene_id,
        "latencyMs": res["latency_ms"],
        "costUsd": res["cost_usd"],
        "pricingModel": model["pricingModel"],
        "usage": res["usage"],
        "transparentRequested": res["transparent_requested"],
        "outputMode": im.mode,
        "hasAlpha": has_alpha,
        "width": im.width,
        "height": im.height,
        "pngPath": out_rel_png,
        "webpPath": webp_rel,
        "sha256": sha,
        "completedAtUtc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }
    meta_file.write_text(json.dumps(record, indent=2), encoding="utf-8")
    print(
        f"[DONE] {run_key:<54} {res['latency_ms']:>6} ms | ${res['cost_usd']:.4f} | {im.mode}",
        flush=True,
    )
    return record


async def main():
    token_holder = {"token": get_token()}
    semaphores = {m["id"]: asyncio.Semaphore(m["concurrency"]) for m in MODELS}
    models_by_id = {m["id"]: m for m in MODELS}
    scenes_by_id = {s["id"]: s for s in SCENARIOS}

    # Save frozen model & scenario definitions
    (WORKSPACE / "catalog.json").write_text(
        json.dumps({"models": MODELS, "scenarios": SCENARIOS}, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    limits = httpx.Limits(max_connections=24, max_keepalive_connections=8)
    async with httpx.AsyncClient(timeout=240.0, limits=limits) as client:
        # Phase A: Primary 8 models x 12 scenarios = 96 runs
        print("=== Phase A: Running Primary 8 x 12 Commercial Editing Matrix (96 runs) ===", flush=True)
        tasks_a = []
        for s in SCENARIOS:
            sid = s["id"]
            ref_path = REF_DIR / f"{sid}.png"
            for m in MODELS:
                mid = m["id"]
                rkey = f"primary__{sid}__{mid}"
                out_rel = f"outputs/primary/{sid}/{mid}.png"
                tasks_a.append(
                    run_single_job(
                        sem=semaphores[mid],
                        client=client,
                        token_holder=token_holder,
                        run_key=rkey,
                        suite="primary",
                        model=m,
                        scene_id=sid,
                        input_path=ref_path,
                        out_rel_png=out_rel,
                        prompt=s["prompt_en"],
                        transparent=bool(s.get("transparent_mode", False)),
                        locale="en",
                    )
                )
        results_a = await asyncio.gather(*tasks_a)

        # Refresh token before Phase B & C just in case
        token_holder["token"] = get_token()

        # Phase B: Turn-2 Multi-Turn Consistency (8 single-model Turn-2 runs + 1 Flash->2.7 Two-Tier Turn-2 run = 9 runs)
        print("\n=== Phase B: Running S12 Multi-Turn Turn-2 Consistency & Flash->2.7 Routing (9 runs) ===", flush=True)
        s12 = scenes_by_id["multi-turn-brand-consistency"]
        tasks_b = []
        for m in MODELS:
            mid = m["id"]
            t1_path = WORKSPACE / f"outputs/primary/multi-turn-brand-consistency/{mid}.png"
            tasks_b.append(
                run_single_job(
                    sem=semaphores[mid],
                    client=client,
                    token_holder=token_holder,
                    run_key=f"turn2__multi-turn-brand-consistency__{mid}",
                    suite="turn2",
                    model=m,
                    scene_id="multi-turn-brand-consistency",
                    input_path=t1_path,
                    out_rel_png=f"outputs/turn2/multi-turn-brand-consistency/{mid}.png",
                    prompt=s12["turn2_prompt_en"],
                    transparent=False,
                    locale="en",
                )
            )
        # Dedicated Two-Tier Hybrid Workflow: Turn 1 from MAI-Image-2.7-Flash ($0.010) -> Turn 2 finalized by MAI-Image-2.7 ($0.035)
        flash_t1_path = WORKSPACE / "outputs/primary/multi-turn-brand-consistency/mai-image-2-7-flash.png"
        m_mai27 = models_by_id["mai-image-2-7"]
        tasks_b.append(
            run_single_job(
                sem=semaphores["mai-image-2-7"],
                client=client,
                token_holder=token_holder,
                run_key="turn2__multi-turn-brand-consistency__mai-flash-to-2-7-hybrid",
                suite="turn2_hybrid",
                model=m_mai27,
                scene_id="multi-turn-brand-consistency",
                input_path=flash_t1_path,
                out_rel_png="outputs/turn2/multi-turn-brand-consistency/mai-flash-to-2-7-hybrid.png",
                prompt=s12["turn2_prompt_en"],
                transparent=False,
                locale="en",
            )
        )
        results_b = await asyncio.gather(*tasks_b)

        # Phase C: Bilingual Prompt Perturbation (ZH-CN vs EN across 4 key scenes x 4 flagship models = 16 runs)
        print("\n=== Phase C: Running ZH-CN Prompt Perturbation Suite (16 runs) ===", flush=True)
        tasks_c = []
        for sid in PERTURBATION_SCENES:
            s = scenes_by_id[sid]
            ref_path = REF_DIR / f"{sid}.png"
            for mid in PERTURBATION_MODELS:
                m = models_by_id[mid]
                tasks_c.append(
                    run_single_job(
                        sem=semaphores[mid],
                        client=client,
                        token_holder=token_holder,
                        run_key=f"perturb_zh__{sid}__{mid}",
                        suite="perturb_zh",
                        model=m,
                        scene_id=sid,
                        input_path=ref_path,
                        out_rel_png=f"outputs/perturb_zh/{sid}/{mid}.png",
                        prompt=s["prompt_zh"],
                        transparent=False,
                        locale="zh-CN",
                    )
                )
        results_c = await asyncio.gather(*tasks_c)

    all_runs = results_a + results_b + results_c
    total_cost = sum(r["costUsd"] for r in all_runs)
    (WORKSPACE / "raw_runs.json").write_text(json.dumps(all_runs, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nALL {len(all_runs)} RUNS COMPLETE! Total measured Foundry spend: ${total_cost:.4f}", flush=True)


if __name__ == "__main__":
    asyncio.run(main())
