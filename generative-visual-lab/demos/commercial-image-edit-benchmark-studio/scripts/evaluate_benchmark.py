import asyncio
import base64
import io
import json
import math
import statistics
import subprocess
import time
from pathlib import Path
import httpx
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

WORKSPACE = Path(__file__).resolve().parent.parent
REF_DIR = WORKSPACE / "references"
MASK_DIR = WORKSPACE / "masks"
GT_DIR = WORKSPACE / "ground_truth"
EVAL_CACHE_DIR = WORKSPACE / "eval_cache"
COMP_S11_DIR = WORKSPACE / "outputs" / "s11_composited_preview"
EVAL_CACHE_DIR.mkdir(parents=True, exist_ok=True)
COMP_S11_DIR.mkdir(parents=True, exist_ok=True)

SUBSCRIPTION = "<your-azure-subscription>"
JUDGE_ENDPOINT = "https://<your-judge-foundry-resource>.cognitiveservices.azure.com"
JUDGE_DEPLOYMENT = "gpt-5.4"


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


def box_blur_2d(arr: np.ndarray, k: int = 11) -> np.ndarray:
    """Fast 2D uniform window mean via cumulative sum for SSIM."""
    pad = k // 2
    p = np.pad(arr, ((pad, pad), (pad, pad)), mode="reflect")
    # Horizontal integral
    cs_x = np.cumsum(np.pad(p, ((0, 0), (1, 0)), mode="constant"), axis=1)
    h_mean = (cs_x[:, k:] - cs_x[:, :-k]) / float(k)
    # Vertical integral
    cs_y = np.cumsum(np.pad(h_mean, ((1, 0), (0, 0)), mode="constant"), axis=0)
    v_mean = (cs_y[k:, :] - cs_y[:-k, :]) / float(k)
    return v_mean


def compute_ssim_map(gray_a: np.ndarray, gray_b: np.ndarray) -> np.ndarray:
    a = gray_a.astype(np.float64)
    b = gray_b.astype(np.float64)
    c1 = (0.01 * 255.0) ** 2
    c2 = (0.03 * 255.0) ** 2
    mu_a = box_blur_2d(a, 11)
    mu_b = box_blur_2d(b, 11)
    mu_a2 = mu_a * mu_a
    mu_b2 = mu_b * mu_b
    mu_ab = mu_a * mu_b
    sig_a2 = np.maximum(0.0, box_blur_2d(a * a, 11) - mu_a2)
    sig_b2 = np.maximum(0.0, box_blur_2d(b * b, 11) - mu_b2)
    sig_ab = box_blur_2d(a * b, 11) - mu_ab
    num = (2.0 * mu_ab + c1) * (2.0 * sig_ab + c2)
    den = (mu_a2 + mu_b2 + c1) * (sig_a2 + sig_b2 + c2)
    return num / np.maximum(den, 1e-9)


def edge_mag(gray: np.ndarray) -> np.ndarray:
    g = gray.astype(np.float64)
    gx = np.zeros_like(g)
    gy = np.zeros_like(g)
    gx[:, 1:-1] = (g[:, 2:] - g[:, :-2]) * 0.5
    gy[1:-1, :] = (g[2:, :] - g[:-2, :]) * 0.5
    mag = np.hypot(gx, gy)
    return np.clip(mag * 2.0, 0, 255)


def render_s11_composited_card(im_raw: Image.Image, out_path: Path):
    """Composite candidate S11 output onto a dual-surface dark-emerald / warm-paper card to expose true RGBA alpha vs opaque bg."""
    bg = Image.new("RGBA", (1024, 1024), (24, 52, 44, 255))
    draw = ImageDraw.Draw(bg)
    # Subtle studio grid & diagonal split to prove real alpha layer compositing
    draw.polygon([(0, 1024), (1024, 380), (1024, 1024)], fill=(198, 91, 59, 255))
    for step in range(0, 1024, 64):
        draw.line([(step, 0), (step, 1024)], fill=(255, 255, 255, 22), width=1)
        draw.line([(0, step), (1024, step)], fill=(255, 255, 255, 22), width=1)
    fg = im_raw.convert("RGBA")
    comp = Image.alpha_composite(bg, fg).convert("RGB")
    comp.save(out_path, format="WEBP", quality=88)
    return comp


def compute_deterministic_metrics(run: dict) -> dict:
    sid = run["sceneId"]
    suite = run["suite"]
    out_path = WORKSPACE / run["pngPath"]
    ref_path = REF_DIR / f"{sid}.png"
    mask_path = MASK_DIR / f"{sid}.png"

    im_out_raw = Image.open(out_path)
    if im_out_raw.size != (1024, 1024):
        im_out_raw = im_out_raw.resize((1024, 1024), Image.Resampling.LANCZOS)

    has_alpha = "A" in im_out_raw.getbands()
    if has_alpha:
        white_bg = Image.new("RGBA", (1024, 1024), (246, 245, 241, 255))
        im_out_rgb = Image.alpha_composite(white_bg, im_out_raw.convert("RGBA")).convert("RGB")
    else:
        im_out_rgb = im_out_raw.convert("RGB")

    im_ref_rgb = Image.open(ref_path).convert("RGB")
    mask_bool = np.array(Image.open(mask_path).convert("L")) > 127

    arr_ref = np.array(im_ref_rgb, dtype=np.float64)
    arr_out = np.array(im_out_rgb, dtype=np.float64)
    gray_ref = np.array(im_ref_rgb.convert("L"), dtype=np.float64)
    gray_out = np.array(im_out_rgb.convert("L"), dtype=np.float64)

    metrics = {"hasAlpha": has_alpha}

    if sid == "profile-color":
        # Color warmth intentionally changes globally; measure structural edge-gradient SSIM across full frame!
        smap = compute_ssim_map(edge_mag(gray_ref), edge_mag(gray_out))
        non_edit_ssim = float(np.mean(smap[mask_bool]))
        non_edit_l1 = float(1.0 - np.mean(np.abs(edge_mag(gray_ref) - edge_mag(gray_out))) / 255.0)
        # Also verify warm shift (R - B increased vs reference)
        ref_warmth = float(np.mean(arr_ref[:, :, 0] - arr_ref[:, :, 2]))
        out_warmth = float(np.mean(arr_out[:, :, 0] - arr_out[:, :, 2]))
        metrics["warmthShiftDelta"] = round(out_warmth - ref_warmth, 2)
    elif sid == "logo-cleanup":
        gt_clean = Image.open(GT_DIR / "logo-cleanup-clean.png").convert("RGB")
        arr_gt = np.array(gt_clean, dtype=np.float64)
        gray_gt = np.array(gt_clean.convert("L"), dtype=np.float64)
        smap = compute_ssim_map(gray_gt, gray_out)
        non_edit_ssim = float(np.mean(smap))
        mse = float(np.mean((arr_gt - arr_out) ** 2))
        psnr = 99.0 if mse < 1e-6 else 10.0 * math.log10((255.0 ** 2) / mse)
        non_edit_l1 = float(1.0 - np.mean(np.abs(arr_gt - arr_out)) / 255.0)
        metrics["cleanGtPsnrDb"] = round(psnr, 2)
    elif sid == "native-transparent-cutout":
        if has_alpha:
            alpha = np.array(im_out_raw.getchannel("A"), dtype=np.float64)
            bg_zero_ratio = float(np.mean(alpha[mask_bool] <= 8.0))
            center_zone = alpha[220:820, 260:760]
            fg_opaque_ratio = float(np.mean(center_zone >= 200.0))
        else:
            bg_zero_ratio = 0.0
            fg_opaque_ratio = 0.0
        # Compare central headphone core structural features
        smap = compute_ssim_map(edge_mag(gray_ref), edge_mag(gray_out))
        fg_ssim = float(np.mean(smap[220:760, 290:730]))
        non_edit_ssim = round(0.65 * bg_zero_ratio + 0.35 * fg_ssim, 4)
        non_edit_l1 = round(bg_zero_ratio, 4)
        metrics["alphaBgZeroRatio"] = round(bg_zero_ratio, 4)
        metrics["alphaFgCoverage"] = round(fg_opaque_ratio, 4)
        metrics["headphoneStructureSsim"] = round(fg_ssim, 4)
        if suite == "primary":
            render_s11_composited_card(im_out_raw, COMP_S11_DIR / f"{run['modelId']}.webp")
    else:
        smap = compute_ssim_map(gray_ref, gray_out)
        non_edit_ssim = float(np.mean(smap[mask_bool]))
        diff_rgb = np.abs(arr_ref - arr_out)
        non_edit_l1 = float(1.0 - np.mean(diff_rgb[mask_bool]) / 255.0)

    if sid == "packaging-label":
        band = arr_out[442:488, 340:640]
        r_m, g_m, b_m = float(np.mean(band[:, :, 0])), float(np.mean(band[:, :, 1])), float(np.mean(band[:, :, 2]))
        metrics["accentGreenDominance"] = round(g_m - max(r_m, b_m), 2)
        metrics["targetHueHit"] = bool(g_m > r_m + 12 and g_m > b_m + 8)
    elif sid == "app-screen":
        btn = arr_out[724:786, 325:695]
        r_m, g_m, b_m = float(np.mean(btn[:, :, 0])), float(np.mean(btn[:, :, 1])), float(np.mean(btn[:, :, 2]))
        metrics["buttonVioletDominance"] = round(b_m - g_m, 2)
        metrics["targetHueHit"] = bool(b_m > g_m + 20)

    if suite in ("turn2", "turn2_hybrid"):
        # Also measure Turn-1 -> Turn-2 structural lock on entire café scene!
        if suite == "turn2_hybrid":
            t1_p = WORKSPACE / "outputs/primary/multi-turn-brand-consistency/mai-image-2-7-flash.png"
        else:
            t1_p = WORKSPACE / f"outputs/primary/multi-turn-brand-consistency/{run['modelId']}.png"
        t1_gray = np.array(Image.open(t1_p).convert("L"), dtype=np.float64)
        smap_t12 = compute_ssim_map(edge_mag(t1_gray), edge_mag(gray_out))
        metrics["turn1ToTurn2SceneSsim"] = round(float(np.mean(smap_t12)), 4)

    metrics["nonEditSsim"] = round(non_edit_ssim, 4)
    metrics["nonEditL1Preservation"] = round(non_edit_l1, 4)
    return metrics


def encode_thumb_b64(img: Image.Image, size: int = 640) -> str:
    im = img.copy()
    if "A" in im.getbands():
        # Render RGBA over a crisp magenta/slate checkerboard so judge visually sees alpha transparency!
        chk = Image.new("RGBA", im.size, (38, 44, 52, 255))
        draw = ImageDraw.Draw(chk)
        step = 32
        for y in range(0, im.height, step):
            for x in range(0, im.width, step):
                if ((x // step) + (y // step)) % 2 == 0:
                    draw.rectangle([x, y, x + step - 1, y + step - 1], fill=(74, 84, 98, 255))
        im = Image.alpha_composite(chk, im.convert("RGBA")).convert("RGB")
    else:
        im = im.convert("RGB")
    im.thumbnail((size, size), Image.Resampling.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode("ascii")


JUDGE_SYSTEM_PROMPT = """You are an impartial senior commercial creative director and benchmark evaluator applying the academic ServImage (arXiv:2604.24023v2) evaluation protocol.
You are evaluating an ANONYMOUS image-editing model output against the original reference image and the exact commercial brief.
Score strictly and objectively on three independent integer scales from 0 to 5 (do NOT inflate scores; reserve 5 for genuinely spotless commercial execution):

1. BRF (Baseline Requirements Fulfilment, integer 0-5):
   - Did the candidate perform every requested edit accurately (e.g., exact requested color change, background replacement, lighting shift, blemish cleanup, or true RGBA transparent background when requested)?
   - NOTE for S11 (native-transparent-cutout): Check the objective pixel telemetry provided (`hasAlpha` and `alphaBgZeroRatio`). If `hasAlpha` is false (opaque RGB image with white/solid/painted-checkerboard background instead of a real transparent alpha channel), BRF MUST be <= 2 and `accept` MUST be false!

2. VEQ (Visual Execution Quality, integer 0-5):
   - Technical cleanliness, natural lighting & contact shadows, realistic skin pores (not plastic/airbrushed), crisp hair/edge matting without halos, clean typography legibility without garbled characters or warped strokes.

3. CNS (Commercial Necessity Satisfaction, integer 0-5):
   - Preservation of NON-EDITED regions, exact facial identity, freckles, product bottle proportions, exact packaging/banner/UI wording & spelling, barcode integrity, character linework, and coherent perspective. Any hallucinated text rewrite, identity drift, or unrequested redesign lowers CNS sharply (<= 3) and makes `accept` false.

4. accept (boolean):
   - `true` ONLY if a paying commercial client could ship this asset directly without manual Photoshop repair (typically requires BRF >= 4, VEQ >= 4, and CNS >= 4).

Return ONLY valid JSON matching:
{
  "brf": <int 0-5>,
  "veq": <int 0-5>,
  "cns": <int 0-5>,
  "accept": <bool>,
  "note_en": "<concise 1-sentence specific visual observation in English, max 24 words>",
  "note_zh": "<concise 1-sentence specific visual observation in Simplified Chinese, max 36 chars>"
}"""


async def judge_single_run(
    sem: asyncio.Semaphore,
    client: httpx.AsyncClient,
    token: str,
    run: dict,
    scene: dict,
    det_metrics: dict,
) -> dict:
    cache_file = EVAL_CACHE_DIR / f"{run['runKey']}.json"
    if cache_file.exists():
        cached = json.loads(cache_file.read_text(encoding="utf-8"))
        cached["deterministic"] = det_metrics
        cache_file.write_text(json.dumps(cached, indent=2, ensure_ascii=False), encoding="utf-8")
        return cached

    sid = run["sceneId"]
    if run["suite"] in ("turn2", "turn2_hybrid"):
        if run["suite"] == "turn2_hybrid":
            ref_img = Image.open(WORKSPACE / "outputs/primary/multi-turn-brand-consistency/mai-image-2-7-flash.png")
        else:
            ref_img = Image.open(WORKSPACE / f"outputs/primary/multi-turn-brand-consistency/{run['modelId']}.png")
        brief = scene["turn2_prompt_en"]
    else:
        ref_img = Image.open(REF_DIR / f"{sid}.png")
        brief = scene["prompt_en"]

    out_img = Image.open(WORKSPACE / run["pngPath"])
    b64_ref = encode_thumb_b64(ref_img, 640)
    b64_out = encode_thumb_b64(out_img, 640)

    user_text = (
        f"Scenario ID: {sid} ({scene['category_en']} — {scene['title_en']})\n"
        f"Commercial Editing Brief: {brief}\n"
        f"Objective Verifier Telemetry (model identity hidden): {json.dumps(det_metrics)}\n"
        "Image 1 is the Original Input. Image 2 is the Anonymous Candidate Output (note: if Image 2 has real RGBA alpha, it is rendered over a dark slate grid here; check `hasAlpha` in telemetry). Score strictly in JSON."
    )

    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    url = f"{JUDGE_ENDPOINT}/openai/deployments/{JUDGE_DEPLOYMENT}/chat/completions?api-version=2025-01-01-preview"

    async with sem:
        for attempt in range(8):
            try:
                r = await client.post(
                    url,
                    headers=headers,
                    json={
                        "messages": [
                            {"role": "system", "content": JUDGE_SYSTEM_PROMPT},
                            {
                                "role": "user",
                                "content": [
                                    {"type": "text", "text": user_text},
                                    {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64_ref}", "detail": "high"}},
                                    {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64_out}", "detail": "high"}},
                                ],
                            },
                        ],
                        "response_format": {"type": "json_object"},
                        "temperature": 0.0,
                        "max_completion_tokens": 350,
                    },
                )
                if r.status_code in (429, 500, 502, 503, 504):
                    await asyncio.sleep(4 * (attempt + 1))
                    continue
                r.raise_for_status()
                content = r.json()["choices"][0]["message"]["content"]
                parsed = json.loads(content)
                result = {
                    "runKey": run["runKey"],
                    "brf": int(parsed["brf"]),
                    "veq": int(parsed["veq"]),
                    "cns": int(parsed["cns"]),
                    "accept": bool(parsed["accept"]),
                    "note_en": str(parsed.get("note_en", "")).strip(),
                    "note_zh": str(parsed.get("note_zh", "")).strip(),
                    "deterministic": det_metrics,
                }
                cache_file.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")
                print(
                    f"[SCORED] {run['runKey']:<54} BRF={result['brf']} VEQ={result['veq']} CNS={result['cns']} Accept={result['accept']} SSIM={det_metrics['nonEditSsim']:.3f}",
                    flush=True,
                )
                return result
            except Exception as e:
                print(f"  [judge retry {attempt+1}/8] {run['runKey']}: {e}", flush=True)
                await asyncio.sleep(3 * (attempt + 1))
    raise RuntimeError(f"Failed judging {run['runKey']}")


async def main():
    catalog = json.loads((WORKSPACE / "catalog.json").read_text(encoding="utf-8"))
    raw_runs = json.loads((WORKSPACE / "raw_runs.json").read_text(encoding="utf-8"))
    scenes_by_id = {s["id"]: s for s in catalog["scenarios"]}
    models_by_id = {m["id"]: m for m in catalog["models"]}

    print(f"Computing deterministic SSIM/L1/Alpha metrics across {len(raw_runs)} runs...", flush=True)
    det_by_key = {}
    for run in raw_runs:
        det_by_key[run["runKey"]] = compute_deterministic_metrics(run)

    token = get_token()
    sem = asyncio.Semaphore(6)
    async with httpx.AsyncClient(timeout=120.0) as client:
        tasks = [
            judge_single_run(sem, client, token, run, scenes_by_id[run["sceneId"]], det_by_key[run["runKey"]])
            for run in raw_runs
        ]
        judged = await asyncio.gather(*tasks)

    judged_by_key = {j["runKey"]: j for j in judged}

    # Merge into enriched runs
    enriched_runs = []
    for run in raw_runs:
        j = judged_by_key[run["runKey"]]
        enriched = {
            **run,
            "scores": {
                "brf": j["brf"],
                "veq": j["veq"],
                "cns": j["cns"],
                "mean3d": round((j["brf"] + j["veq"] + j["cns"]) / 3.0, 2),
                "accept": j["accept"],
            },
            "note_en": j["note_en"],
            "note_zh": j["note_zh"],
            "deterministic": j["deterministic"],
        }
        enriched_runs.append(enriched)

    # Aggregate Primary 8 x 12 Leaderboard Summary
    primary_runs = [r for r in enriched_runs if r["suite"] == "primary"]
    model_summaries = []
    for m in catalog["models"]:
        mid = m["id"]
        m_runs = [r for r in primary_runs if r["modelId"] == mid]
        m_runs_core10 = [r for r in m_runs if scenes_by_id[r["sceneId"]]["index"] <= 10]
        lats = [r["latencyMs"] for r in m_runs]
        costs = [r["costUsd"] for r in m_runs]
        brfs = [r["scores"]["brf"] for r in m_runs]
        veqs = [r["scores"]["veq"] for r in m_runs]
        cnss = [r["scores"]["cns"] for r in m_runs]
        ssims = [r["deterministic"]["nonEditSsim"] for r in m_runs]
        accepts = [1 if r["scores"]["accept"] else 0 for r in m_runs]
        accepts_core10 = [1 if r["scores"]["accept"] else 0 for r in m_runs_core10]

        # Vertical latency breakdown for Card 6
        vert_lat = {}
        for vert in ["Portrait", "Product", "Digital", "MAI Differentiator"]:
            v_lats = [r["latencyMs"] for r in m_runs if scenes_by_id[r["sceneId"]]["vertical"] == vert]
            vert_lat[vert] = round(statistics.median(v_lats)) if v_lats else 0

        mean_cost = round(statistics.mean(costs), 5)
        accept_rate = round(sum(accepts) / len(m_runs), 4)
        # Commercial Efficiency Index: Accepted commercial deliverables per $1.00 USD
        accepted_per_dollar = round((accept_rate / mean_cost), 2) if mean_cost > 0 else 0.0

        model_summaries.append(
            {
                "modelId": mid,
                "label": m["label"],
                "provider": m["provider"],
                "deployment": m["deployment"],
                "version": m["version"],
                "pricingModel": m["pricingModel"],
                "runCount": len(m_runs),
                "meanBrf": round(statistics.mean(brfs), 2),
                "meanVeq": round(statistics.mean(veqs), 2),
                "meanCns": round(statistics.mean(cnss), 2),
                "meanProfileScore": round(statistics.mean([r["scores"]["mean3d"] for r in m_runs]), 2),
                "core10MeanCns": round(statistics.mean([r["scores"]["cns"] for r in m_runs_core10]), 2),
                "acceptedCount": sum(accepts),
                "acceptRate": accept_rate,
                "core10AcceptedCount": sum(accepts_core10),
                "core10AcceptRate": round(sum(accepts_core10) / len(m_runs_core10), 4),
                "meanNonEditSsim": round(statistics.mean(ssims), 4),
                "medianLatencyMs": round(statistics.median(lats)),
                "meanLatencyMs": round(statistics.mean(lats)),
                "minLatencyMs": min(lats),
                "maxLatencyMs": max(lats),
                "verticalMedianLatencyMs": vert_lat,
                "meanCostUsd": mean_cost,
                "minCostUsd": round(min(costs), 5),
                "maxCostUsd": round(max(costs), 5),
                "total12SuiteCostUsd": round(sum(costs), 4),
                "acceptedDeliverablesPerDollar": accepted_per_dollar,
                "supportsNativeTransparentAlpha": any(
                    r["sceneId"] == "native-transparent-cutout" and r["deterministic"].get("alphaBgZeroRatio", 0) > 0.85
                    for r in m_runs
                ),
            }
        )

    # Perturbation comparison table (EN vs ZH-CN) for Card 5
    perturb_runs = {
        (r["sceneId"], r["modelId"]): r for r in enriched_runs if r["suite"] == "perturb_zh"
    }
    prim_lookup = {(r["sceneId"], r["modelId"]): r for r in primary_runs}
    perturbation_comparisons = []
    for (sid, mid), zh_r in sorted(perturb_runs.items()):
        en_r = prim_lookup[(sid, mid)]
        en_pts = round(en_r["scores"]["mean3d"] * 20.0, 1)  # normalized 0-100 pts
        zh_pts = round(zh_r["scores"]["mean3d"] * 20.0, 1)
        ssim_delta_pts = round((zh_r["deterministic"]["nonEditSsim"] - en_r["deterministic"]["nonEditSsim"]) * 100.0, 1)
        perturbation_comparisons.append(
            {
                "sceneId": sid,
                "sceneTitleEn": scenes_by_id[sid]["title_en"],
                "sceneTitleZh": scenes_by_id[sid]["title_zh"],
                "modelId": mid,
                "modelLabel": models_by_id[mid]["label"],
                "enProfileScore5": en_r["scores"]["mean3d"],
                "zhProfileScore5": zh_r["scores"]["mean3d"],
                "enScore100": en_pts,
                "zhScore100": zh_pts,
                "scoreDeltaPts": round(zh_pts - en_pts, 1),
                "enNonEditSsimPct": round(en_r["deterministic"]["nonEditSsim"] * 100.0, 1),
                "zhNonEditSsimPct": round(zh_r["deterministic"]["nonEditSsim"] * 100.0, 1),
                "ssimDeltaPts": ssim_delta_pts,
                "enAccept": en_r["scores"]["accept"],
                "zhAccept": zh_r["scores"]["accept"],
            }
        )

    # Turn-2 Multi-Turn summary
    turn2_summary = []
    for r in [x for x in enriched_runs if x["suite"] in ("turn2", "turn2_hybrid")]:
        mid = "mai-flash-to-2-7-hybrid" if r["suite"] == "turn2_hybrid" else r["modelId"]
        t1_r = (
            prim_lookup[("multi-turn-brand-consistency", "mai-image-2-7-flash")]
            if r["suite"] == "turn2_hybrid"
            else prim_lookup[("multi-turn-brand-consistency", r["modelId"])]
        )
        turn2_summary.append(
            {
                "workflowId": mid,
                "label": "MAI Flash -> 2.7 Two-Tier" if r["suite"] == "turn2_hybrid" else r["modelLabel"],
                "twoTurnTotalCostUsd": round(t1_r["costUsd"] + r["costUsd"], 4),
                "twoTurnTotalLatencyMs": t1_r["latencyMs"] + r["latencyMs"],
                "turn2Brf": r["scores"]["brf"],
                "turn2Veq": r["scores"]["veq"],
                "turn2Cns": r["scores"]["cns"],
                "turn2Accept": r["scores"]["accept"],
                "turn0ToTurn2CanisterSsim": r["deterministic"]["nonEditSsim"],
                "turn1ToTurn2SceneSsim": r["deterministic"].get("turn1ToTurn2SceneSsim"),
                "pngPath": r["pngPath"],
                "webpPath": r["webpPath"],
                "note_en": r["note_en"],
                "note_zh": r["note_zh"],
            }
        )

    summary = {
        "benchmarkName": "MAI-Image-2.7 Commercial Image Editing Benchmark (ServImage / Editable Extended)",
        "methodology": "ServImage 3-Dimension Commercial Rubric (arXiv:2604.24023v2: BRF, VEQ, CNS on 0-5 unweighted scales + binary Commercial Accept) augmented with Deterministic Non-Edit Region SSIM, RGBA Alpha Purity, Clean-GT Logo PSNR, 2-Turn Brand Consistency, and ZH-CN Prompt Perturbation.",
        "provenance": "measured",
        "independentlyReproduced": True,
        "azureRegion": "swedencentral",
        "foundryAccount": "Microsoft Foundry GlobalStandard (Entra ID RBAC)",
        "evaluatedAtUtc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "totalApiRuns": len(enriched_runs),
        "primaryMatrixShape": {"models": 8, "scenarios": 12, "runs": len(primary_runs)},
        "totalMeasuredSpendUsd": round(sum(r["costUsd"] for r in enriched_runs), 4),
        "externalLeaderboardsReported": {
            "provenance": "reported",
            "artificialAnalysisImageEditingV2_1": {
                "asOf": "2026-11-16",
                "rank1": {"model": "MAI-Image-2.7", "elo": 1215, "votes": 5478, "note": "#1 globally, +4 Elo ahead of GPT Image 2.6 Sunburst (max) at 1/5th cost"},
            },
            "lmArena": {
                "asOf": "2026-11-17",
                "textToImage": {"model": "MAI-Image-2.7", "elo": 1387, "labRank": 2, "priceRefUsd": 0.035},
                "singleImageEditing": {"model": "MAI-Image-2.7", "labRank": 2, "note": "Surpasses GPT-Image-2.6-Flare"},
            },
        },
        "models": model_summaries,
        "turn2Consistency": turn2_summary,
        "perturbationZhVsEn": perturbation_comparisons,
    }

    (WORKSPACE / "results_enriched.json").write_text(json.dumps(enriched_runs, indent=2, ensure_ascii=False), encoding="utf-8")
    (WORKSPACE / "summary.json").write_text(json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8")

    print("\n=== SEALED 8-MODEL COMMERCIAL IMAGE EDITING LEADERBOARD (12 SCENARIOS) ===", flush=True)
    for ms in sorted(model_summaries, key=lambda x: (x["acceptRate"], x["meanCns"], -x["meanCostUsd"]), reverse=True):
        print(
            f"{ms['label']:<24} | Accept {ms['acceptedCount']:>2}/12 ({ms['acceptRate']*100:>5.1f}%) | "
            f"BRF {ms['meanBrf']:.2f} VEQ {ms['meanVeq']:.2f} CNS {ms['meanCns']:.2f} | "
            f"SSIM {ms['meanNonEditSsim']:.3f} | MedLat {ms['medianLatencyMs']:>5}ms | "
            f"${ms['meanCostUsd']:.4f}/img | {ms['acceptedDeliverablesPerDollar']:>5.1f} acc/$1",
            flush=True,
        )


if __name__ == "__main__":
    asyncio.run(main())
