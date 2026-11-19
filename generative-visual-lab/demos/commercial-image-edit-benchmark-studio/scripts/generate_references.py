import base64
import hashlib
import io
import json
import math
import os
import random
import subprocess
import time
from pathlib import Path
import httpx
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

WORKSPACE = Path(__file__).resolve().parent.parent
REF_DIR = WORKSPACE / "references"
MASK_DIR = WORKSPACE / "masks"
GT_DIR = WORKSPACE / "ground_truth"
REF_DIR.mkdir(parents=True, exist_ok=True)
MASK_DIR.mkdir(parents=True, exist_ok=True)
GT_DIR.mkdir(parents=True, exist_ok=True)

SUBSCRIPTION = "<your-azure-subscription>"
SERVICES_BASE = "https://<your-foundry-resource>.services.ai.azure.com"
FONTS_DIR = Path(r"C:\Windows\Fonts")


def load_font(candidates: list[str], size: int) -> ImageFont.FreeTypeFont:
    for name in candidates:
        p = FONTS_DIR / name
        if p.exists():
            return ImageFont.truetype(str(p), size=size)
    return ImageFont.load_default()


FONT_SANS_BOLD = lambda sz: load_font(["segoeuib.ttf", "arialbd.ttf", "calibrib.ttf"], sz)
FONT_SANS_SEMI = lambda sz: load_font(["seguisb.ttf", "segoeuib.ttf", "arialbd.ttf"], sz)
FONT_SANS_REG = lambda sz: load_font(["segoeui.ttf", "arial.ttf", "calibri.ttf"], sz)
FONT_SERIF_BOLD = lambda sz: load_font(["georgiab.ttf", "timesbd.ttf", "cambriab.ttf"], sz)
FONT_SERIF_REG = lambda sz: load_font(["georgia.ttf", "times.ttf", "cambria.ttf"], sz)
FONT_MONO = lambda sz: load_font(["consolab.ttf", "consola.ttf", "courbd.ttf"], sz)


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


def t2i_flux_pro(client: httpx.Client, token: str, prompt: str, seed: int = 42) -> Image.Image:
    """Use FLUX.2-pro text-to-image to synthesize clean photorealistic studio base plates with retry."""
    last_err = None
    for attempt in range(5):
        try:
            r = client.post(
                f"{SERVICES_BASE}/providers/blackforestlabs/v1/flux-2-pro?api-version=preview",
                headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json", "Connection": "close"},
                json={
                    "model": "flux-2-pro",
                    "prompt": prompt,
                    "width": 1024,
                    "height": 1024,
                    "seed": seed,
                    "output_format": "png",
                },
            )
            if r.status_code in (429, 500, 502, 503, 504):
                time.sleep(3 * (attempt + 1))
                continue
            r.raise_for_status()
            b64 = r.json()["data"][0]["b64_json"]
            return Image.open(io.BytesIO(base64.b64decode(b64))).convert("RGB")
        except Exception as e:
            last_err = e
            print(f"  [retry {attempt+1}/5] transient error: {e}")
            time.sleep(2.5 * (attempt + 1))
    raise RuntimeError(f"Failed after 5 attempts: {last_err}")


def save_mask(scene_id: str, mask_arr: np.ndarray):
    """Save binary mask where 255 = non-edited region that MUST stay preserved."""
    Image.fromarray(mask_arr.astype(np.uint8), mode="L").save(MASK_DIR / f"{scene_id}.png")


def build_s01_portrait_retouch(client: httpx.Client, token: str):
    img = t2i_flux_pro(
        client,
        token,
        "Close-up editorial corporate headshot photograph of a 31-year-old woman with natural light freckles across nose bridge and cheeks, realistic skin pores, warm hazel eyes, dark auburn wavy hair pulled back, wearing an olive-taupe tailored linen blazer over a cream silk top, soft studio key light, muted warm slate-olive studio backdrop, 85mm lens, sharp focus, unretouched natural skin.",
        seed=101,
    )
    # Add 4 subtle controlled temporary redness blemishes on forehead/chin so retouch has exact targets
    overlay = img.copy()
    draw = ImageDraw.Draw(overlay, "RGBA")
    spots = [(485, 250, 9), (548, 272, 7), (442, 578, 8), (535, 612, 8)]
    for cx, cy, rad in spots:
        draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(196, 82, 78, 125))
        draw.ellipse([cx - rad // 2, cy - rad // 2, cx + rad // 2, cy + rad // 2], fill=(214, 96, 88, 155))
    blurred = overlay.filter(ImageFilter.GaussianBlur(radius=2.2))
    # Blend only around spots
    spot_mask = Image.new("L", (1024, 1024), 0)
    mdraw = ImageDraw.Draw(spot_mask)
    for cx, cy, rad in spots:
        mdraw.ellipse([cx - rad * 2, cy - rad * 2, cx + rad * 2, cy + rad * 2], fill=255)
    spot_mask = spot_mask.filter(ImageFilter.GaussianBlur(radius=3.0))
    final = Image.composite(blurred, img, spot_mask)
    final.save(REF_DIR / "portrait-retouch.png")

    # Non-edit mask: outer background + lower clothing + hair silhouette (everything except face skin zone)
    m = np.ones((1024, 1024), dtype=np.uint8) * 255
    yy, xx = np.ogrid[:1024, :1024]
    face_ellipse = ((xx - 512) / 175.0) ** 2 + ((yy - 430) / 230.0) ** 2 <= 1.0
    m[face_ellipse] = 0
    save_mask("portrait-retouch", m)


def build_s02_id_photo(client: httpx.Client, token: str):
    img = t2i_flux_pro(
        client,
        token,
        "Medium-close candid office portrait photograph of a 36-year-old East Asian male architect looking directly at the camera with a calm neutral expression, neat short black hair, wearing a dark navy blazer and crisp white dress shirt, standing inside a sunlit modern studio office with warm wooden bookshelves, indoor plants, and framed sketches softly visible behind him, natural daylight, 50mm lens.",
        seed=202,
    )
    img.save(REF_DIR / "id-photo.png")
    # Non-edit mask: central head & shoulders subject region (since centering may shift slightly, focus core torso/head)
    m = np.zeros((1024, 1024), dtype=np.uint8)
    yy, xx = np.ogrid[:1024, :1024]
    subj = (((xx - 512) / 180.0) ** 2 + ((yy - 430) / 210.0) ** 2 <= 1.0) | (
        (np.abs(xx - 512) < 250) & (yy >= 600) & (yy <= 980)
    )
    m[subj] = 255
    save_mask("id-photo", m)


def build_s03_profile_color(client: httpx.Client, token: str):
    img = t2i_flux_pro(
        client,
        token,
        "Cool-toned overcast daylight editorial portrait of a 42-year-old European creative director with silver-flecked beard and glasses, wearing a charcoal merino turtleneck sweater, seated at an oak studio desk with a ceramic mug and minimalist concrete wall behind him, cool neutral bluish-gray daylight color balance, crisp architectural photography.",
        seed=303,
    )
    img.save(REF_DIR / "profile-color.png")
    # For global color grading, structure/luminance-gradient preservation applies across the full frame
    m = np.ones((1024, 1024), dtype=np.uint8) * 255
    save_mask("profile-color", m)


def build_s04_product_background(client: httpx.Client, token: str):
    img = t2i_flux_pro(
        client,
        token,
        "Commercial product photograph of a centered vertical amber-glass skincare dropper serum bottle with a matte black glass pipette cap, sitting on a dark textured slate stone countertop with moody café wood andlinen props softly visible in the background. Clean cream rectangular front label on the bottle reading 'VERDANT LABS' in bold serif and 'BOTANICAL SERUM 30 ML' below. Crisp studio lighting on glass, centered composition.",
        seed=404,
    )
    # Reinforce crisp typography on a clean label band if needed? Let's inspect or overlay a razor-sharp label band!
    img.save(REF_DIR / "product-background.png")
    m = np.zeros((1024, 1024), dtype=np.uint8)
    m[210:850, 390:635] = 255
    save_mask("product-background", m)


def build_s05_packaging_label():
    """Deterministic studio pouch/box + razor-sharp typography, barcode, and royal-blue accent band."""
    img = Image.new("RGB", (1024, 1024), (229, 225, 216))
    draw = ImageDraw.Draw(img)
    # Subtle studio horizon & soft floor gradient
    for y in range(680, 1024):
        t = (y - 680) / 344.0
        val = int(222 - 18 * t)
        draw.line([(0, y), (1024, y)], fill=(val, val - 3, val - 9))

    # Contact shadow under box
    shadow = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.ellipse([265, 835, 760, 905], fill=(35, 32, 28, 95))
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=18))
    img = Image.alpha_composite(img.convert("RGBA"), shadow).convert("RGB")
    draw = ImageDraw.Draw(img)

    # 3D minimalist matte kraft-cream coffee box (front face + subtle right side face)
    front_box = [290, 165, 690, 865]
    side_poly = [(690, 165), (748, 195), (748, 840), (690, 865)]
    top_poly = [(290, 165), (352, 140), (748, 195), (690, 165)]
    draw.polygon(side_poly, fill=(210, 203, 190), outline=(188, 180, 166))
    draw.polygon(top_poly, fill=(244, 240, 232), outline=(202, 195, 182))
    draw.rounded_rectangle(front_box, radius=8, fill=(242, 238, 229), outline=(196, 189, 176), width=3)

    # Front white paper label applied on box
    lbl = [332, 245, 648, 790]
    draw.rounded_rectangle(lbl, radius=4, fill=(252, 251, 248), outline=(216, 211, 202), width=2)

    # THE SMALL ROYAL-BLUE ACCENT BAND ON THE FRONT LABEL (target to become forest green!)
    accent_band = [332, 438, 648, 492]
    draw.rectangle(accent_band, fill=(29, 86, 198))
    draw.text((490, 465), "SINGLE ORIGIN · WASHED", font=FONT_SANS_BOLD(19), fill=(255, 255, 255), anchor="mm")

    # Crisp Brand Typography
    draw.text((490, 305), "ATELIER NORD", font=FONT_SERIF_BOLD(34), fill=(26, 33, 29), anchor="mm")
    draw.text((490, 352), "SPECIALTY COFFEE ROASTERS", font=FONT_MONO(14), fill=(95, 102, 96), anchor="mm")
    draw.line([(375, 388), (605, 388)], fill=(210, 206, 198), width=2)
    draw.text((490, 412), "LOT NO. 048 · HIGHLAND HARVEST", font=FONT_MONO(13), fill=(88, 94, 90), anchor="mm")

    # Lower copy + Tasting notes + Crisp EAN Barcode
    draw.text((490, 545), "ETHIOPIA YIRGACHEFFE", font=FONT_SERIF_BOLD(23), fill=(26, 33, 29), anchor="mm")
    draw.text((490, 585), "BERGAMOT · JASMINE · WHITE PEACH", font=FONT_SANS_REG(15), fill=(78, 84, 80), anchor="mm")
    draw.text((490, 628), "NET WT. 250G / 8.8 OZ · WHOLE BEAN", font=FONT_MONO(13), fill=(96, 101, 97), anchor="mm")

    # Deterministic Barcode
    bx0, by0, bh = 398, 672, 68
    rng = random.Random(20261119)
    x = bx0
    while x < 582:
        w = rng.choice([2, 3, 5])
        if x + w <= 582:
            draw.rectangle([x, by0, x + w - 1, by0 + bh], fill=(24, 28, 26))
        x += w + rng.choice([2, 3, 4])
    draw.text((490, 756), "7 350098 412067", font=FONT_MONO(14), fill=(35, 39, 37), anchor="mm")

    img.save(REF_DIR / "packaging-label.png")

    # Non-edit mask: ENTIRE image EXCEPT the small accent band (with a 10pxfeather buffer)!
    m = np.ones((1024, 1024), dtype=np.uint8) * 255
    m[428:502, 324:656] = 0
    save_mask("packaging-label", m)


def build_s06_product_seasonal(client: httpx.Client, token: str):
    img = t2i_flux_pro(
        client,
        token,
        "Minimalist studio packshot photograph of a faceted emerald-tinted glass perfume flacon centered upright on a plain flat cool light-gray seamless studio background, brushed champagne-gold cylindrical cap, crisp ivory front label reading 'SOLSTICE' in elegant serif capitals and 'EAU DE PARFUM 50 ML' underneath, clean studio reflections, no props, centered.",
        seed=606,
    )
    img.save(REF_DIR / "product-seasonal.png")
    m = np.zeros((1024, 1024), dtype=np.uint8)
    m[240:830, 375:650] = 255
    save_mask("product-seasonal", m)


def build_s07_web_banner():
    """Crisp SaaS hero banner on flat warm-ivory background; background changes to midnight-blue-to-teal gradient."""
    img = Image.new("RGB", (1024, 1024), (243, 239, 230))
    draw = ImageDraw.Draw(img)

    # Subtle decorative grid hairlines in background
    for gx in range(64, 1024, 128):
        draw.line([(gx, 0), (gx, 1024)], fill=(233, 228, 218), width=1)
    for gy in range(64, 1024, 128):
        draw.line([(0, gy), (1024, gy)], fill=(233, 228, 218), width=1)

    # Top Eyebrow Pill (dark slate card so text stays crisp on any background)
    draw.rounded_rectangle([84, 168, 368, 210], radius=21, fill=(23, 33, 43), outline=(56, 78, 96), width=2)
    draw.text((226, 189), "FOUNDRY WORKFLOW ENGINE", font=FONT_MONO(14), fill=(134, 239, 218), anchor="mm")

    # Left Hero Card / Content Panel? Wait: in a website hero banner, headline text sits directly on the hero background
    # OR in crisp high-contrast typography + CTA button + right-side floating UI card!
    # Let's make headline white-outlined or dark ink? Wait: if background changes from light sand to DARK midnight-blue-to-teal,
    # dark #1A242D text on midnight-blue would become low-contrast UNLESS the text sits inside a clean translucent/light hero card OR the headline is gold/ivory on medium slate!
    # Let's check Editable's bannerSvg(): in Editable, the hero banner starts on a medium slate-gray background with crisp white/light headline text!
    # YES!! Look how smart checking that is: if the initial banner background is flat muted slate-gray (#46505A) with CRISP WHITE headline text,
    # then changing ONLY the background to a midnight-blue-to-teal gradient keeps the exact white text 100% high-contrast AND pixel-identical!!
    img = Image.new("RGB", (1024, 1024), (74, 83, 94))
    draw = ImageDraw.Draw(img)
    # Top Nav bar strip
    draw.text((88, 96), "NORTHSTAR CLOUD", font=FONT_MONO(18), fill=(236, 242, 248), anchor="lm")
    draw.text((936, 96), "DOCS    PRICING    SIGN IN", font=FONT_SANS_SEMI(15), fill=(214, 223, 232), anchor="rm")
    draw.line([(88, 132), (936, 132)], fill=(102, 113, 126), width=2)

    # Eyebrow badge
    draw.rounded_rectangle([88, 232, 356, 274], radius=21, fill=(52, 61, 72), outline=(138, 152, 168), width=2)
    draw.text((222, 253), "ENTERPRISE AI CONTROL PLANE", font=FONT_MONO(13), fill=(224, 236, 245), anchor="mm")

    # Exact Hero Headline & Subcopy
    draw.text((88, 345), "Governed Multimodal", font=FONT_SANS_BOLD(54), fill=(255, 255, 255), anchor="lm")
    draw.text((88, 415), "Pipelines at Scale", font=FONT_SANS_BOLD(54), fill=(255, 255, 255), anchor="lm")
    draw.text(
        (88, 492),
        "Deterministic routing, sealed latency telemetry,",
        font=FONT_SANS_REG(22),
        fill=(222, 230, 238),
        anchor="lm",
    )
    draw.text(
        (88, 526),
        "and predictable unit cost for production teams.",
        font=FONT_SANS_REG(22),
        fill=(222, 230, 238),
        anchor="lm",
    )

    # Primary & Secondary CTA Buttons
    draw.rounded_rectangle([88, 592, 318, 656], radius=12, fill=(248, 250, 252))
    draw.text((203, 624), "Start Free Trial ->", font=FONT_SANS_BOLD(19), fill=(17, 28, 38), anchor="mm")
    draw.rounded_rectangle([340, 592, 548, 656], radius=12, fill=(62, 72, 84), outline=(188, 198, 210), width=2)
    draw.text((444, 624), "Read Benchmark", font=FONT_SANS_SEMI(19), fill=(244, 247, 250), anchor="mm")

    # Foreground Floating Telemetry Card at bottom-right
    card = [576, 680, 936, 908]
    draw.rounded_rectangle(card, radius=16, fill=(248, 250, 252), outline=(210, 218, 226), width=3)
    draw.text((608, 724), "LIVE SLA TELEMETRY", font=FONT_MONO(14), fill=(71, 85, 105), anchor="lm")
    draw.text((608, 774), "99.94% Availability", font=FONT_SANS_BOLD(26), fill=(15, 23, 42), anchor="lm")
    draw.rectangle([608, 816, 896, 834], fill=(226, 232, 240))
    draw.rectangle([608, 816, 862, 834], fill=(20, 148, 132))
    draw.text((608, 868), "P50 Latency: 18.4s  |  $0.035 / op", font=FONT_MONO(14), fill=(51, 65, 85), anchor="lm")

    img.save(REF_DIR / "web-banner.png")

    # Non-edit mask: CTA buttons + Foreground Telemetry Card (opaque foreground elements that must remain pixel-locked)
    m = np.zeros((1024, 1024), dtype=np.uint8)
    m[592:656, 88:318] = 255
    m[680:908, 576:936] = 255
    save_mask("web-banner", m)


def build_s08_app_screen():
    """Crisp mobile app screen inside dark device frame with CORAL (#E85D4A) accents -> shift to DEEP VIOLET."""
    img = Image.new("RGB", (1024, 1024), (233, 236, 241))
    draw = ImageDraw.Draw(img)

    # Device outer bezel
    draw.rounded_rectangle([262, 68, 762, 956], radius=54, fill=(24, 28, 36), outline=(64, 72, 86), width=4)
    # Screen area
    draw.rounded_rectangle([284, 92, 740, 932], radius=40, fill=(249, 250, 252))
    # Dynamic island notch
    draw.rounded_rectangle([452, 108, 572, 132], radius=12, fill=(24, 28, 36))

    CORAL = (232, 93, 74)
    CORAL_SOFT = (253, 233, 229)

    # Header
    draw.text((320, 178), "Treasury Overview", font=FONT_SANS_BOLD(25), fill=(18, 24, 34), anchor="lm")
    draw.rounded_rectangle([618, 158, 706, 196], radius=19, fill=CORAL_SOFT)
    draw.text((662, 177), "LIVE", font=FONT_MONO(14), fill=CORAL, anchor="mm")

    # Balance Card
    draw.rounded_rectangle([314, 222, 710, 396], radius=20, fill=(255, 255, 255), outline=(225, 230, 238), width=2)
    draw.text((342, 258), "AVAILABLE LIQUIDITY", font=FONT_MONO(13), fill=(100, 112, 128), anchor="lm")
    draw.text((342, 308), "$148,920.00", font=FONT_SANS_BOLD(38), fill=(15, 23, 42), anchor="lm")
    # Coral trend pill
    draw.rounded_rectangle([342, 344, 482, 376], radius=16, fill=CORAL)
    draw.text((412, 360), "+12.4% THIS WK", font=FONT_MONO(12), fill=(255, 255, 255), anchor="mm")

    # Activity List Card
    draw.rounded_rectangle([314, 420, 710, 686], radius=20, fill=(255, 255, 255), outline=(225, 230, 238), width=2)
    draw.text((342, 456), "RECENT SETTLEMENTS", font=FONT_MONO(13), fill=(100, 112, 128), anchor="lm")
    rows = [
        ("Cloud Compute Reserve", "-$4,200.00", "Settled"),
        ("Enterprise API Rebate", "+$9,500.00", "Cleared"),
        ("Vendor Escrow Batch", "-$1,840.00", "Pending"),
    ]
    for idx, (title, amt, st) in enumerate(rows):
        ry = 510 + idx * 62
        draw.line([(342, ry - 26), (682, ry - 26)], fill=(238, 241, 246), width=2)
        draw.text((342, ry - 4), title, font=FONT_SANS_SEMI(16), fill=(24, 32, 44), anchor="lm")
        draw.text((342, ry + 18), st, font=FONT_SANS_REG(13), fill=(116, 126, 140), anchor="lm")
        draw.text((682, ry + 6), amt, font=FONT_MONO(15), fill=(24, 32, 44), anchor="rm")

    # CORAL Primary CTA Button (must turn Deep Violet!)
    draw.rounded_rectangle([314, 718, 710, 792], radius=18, fill=CORAL)
    draw.text((512, 755), "Approve Batch Transfer", font=FONT_SANS_BOLD(20), fill=(255, 255, 255), anchor="mm")

    # Bottom Navigation Bar with CORAL selected icon
    draw.line([(286, 832), (738, 832)], fill=(226, 231, 239), width=2)
    tabs = [("Home", False), ("Transfers", True), ("Reports", False), ("Settings", False)]
    for i, (label, active) in enumerate(tabs):
        tx = 348 + i * 109
        col = CORAL if active else (132, 142, 156)
        if active:
            draw.rounded_rectangle([tx - 24, 848, tx + 24, 882], radius=12, fill=CORAL)
            draw.ellipse([tx - 7, 858, tx + 7, 872], fill=(255, 255, 255))
        else:
            draw.rounded_rectangle([tx - 14, 852, tx + 14, 878], radius=6, outline=col, width=3)
        draw.text((tx, 902), label, font=FONT_SANS_SEMI(13), fill=col, anchor="mm")

    img.save(REF_DIR / "app-screen.png")

    # Non-edit mask: outer background, bezel, balance numbers, and activity list rows
    m = np.ones((1024, 1024), dtype=np.uint8) * 255
    m[154:200, 612:712] = 0
    m[340:382, 338:488] = 0
    m[712:798, 308:716] = 0
    m[842:918, 420:495] = 0
    save_mask("app-screen", m)


def build_s09_character_style(client: httpx.Client, token: str):
    img = t2i_flux_pro(
        client,
        token,
        "Clean flat editorial vector-style commercial character illustration with crisp dark ink linework: a friendly young botanical courier wearing a denim cap, olive canvas apron, and striped shirt, holding a small terracotta pot with a leafy plant in both hands, standing centered against a warm terracotta-orange and peach background with simple geometric sun-arch and circle shapes behind them. Flat editorial illustration, crisp clean outlines, no text.",
        seed=909,
    )
    img.save(REF_DIR / "character-style.png")
    # Non-edit mask: central character figure
    m = np.zeros((1024, 1024), dtype=np.uint8)
    m[210:880, 355:665] = 255
    save_mask("character-style", m)


def build_s10_logo_cleanup():
    """Create a clean ground-truth dark-green 'MORROW' geometric brand mark + degraded noisy JPEG input."""
    clean = Image.new("RGB", (1024, 1024), (246, 245, 241))
    draw = ImageDraw.Draw(clean)
    DARK_GREEN = (24, 78, 60)

    # Geometric double-arch / leaf monogram centered at (512, 395)
    draw.rounded_rectangle([402, 275, 622, 495], radius=44, outline=DARK_GREEN, width=18)
    draw.polygon([(448, 445), (512, 318), (576, 445), (540, 445), (512, 386), (484, 445)], fill=DARK_GREEN)
    draw.ellipse([496, 452, 528, 484], fill=DARK_GREEN)

    # Exact tracked wordmark "MORROW" + subline
    draw.text((512, 590), "M O R R O W", font=FONT_SANS_BOLD(66), fill=DARK_GREEN, anchor="mm")
    draw.text((512, 662), "ARCHITECTURAL BOTANICALS", font=FONT_MONO(18), fill=DARK_GREEN, anchor="mm")
    clean.save(GT_DIR / "logo-cleanup-clean.png")

    # Degrade with heavy JPEG blockiness + visible compression speckles around mark & background
    arr = np.array(clean, dtype=np.int16)
    rng = np.random.default_rng(202611)
    # Add mosquito speckles especially near edges and scattered background noise
    speckle_mask = rng.random((256, 256)) < 0.085
    speckle_vals = rng.integers(-68, 52, size=(256, 256, 3))
    speckle_up = np.repeat(np.repeat(speckle_mask[:, :, None] * speckle_vals, 4, axis=0), 4, axis=1)
    arr = np.clip(arr + speckle_up, 0, 255).astype(np.uint8)
    noisy = Image.fromarray(arr, mode="RGB")
    jbuf = io.BytesIO()
    noisy.save(jbuf, format="JPEG", quality=12, subsampling=2)
    jbuf.seek(0)
    degraded = Image.open(jbuf).convert("RGB")
    degraded.save(REF_DIR / "logo-cleanup.png")

    # Non-edit mask: symbol & wordmark stroke core (compared against clean GT!)
    gt_arr = np.array(clean)
    is_ink = (gt_arr[:, :, 1] < 120).astype(np.uint8) * 255
    save_mask("logo-cleanup", is_ink)


def build_s11_native_transparent_cutout(client: httpx.Client, token: str):
    img = t2i_flux_pro(
        client,
        token,
        "Commercial product photograph of sleek matte warm-titanium over-ear wireless studio headphones with cognac-tan leather ear cushions resting upright on a wooden stand on a cluttered creative desk with notebooks, a coffee cup, and blurred warm lamps in the background, sharp focus on headphones, centered composition.",
        seed=1111,
    )
    img.save(REF_DIR / "native-transparent-cutout.png")
    # Mask marks outer border pixels (80px frame) where true RGBA alpha MUST be 0!
    m = np.zeros((1024, 1024), dtype=np.uint8)
    m[:90, :] = 255
    m[-90:, :] = 255
    m[:, :90] = 255
    m[:, -90:] = 255
    save_mask("native-transparent-cutout", m)


def build_s12_multi_turn_consistency(client: httpx.Client, token: str):
    img = t2i_flux_pro(
        client,
        token,
        "Studio hero packshot photograph of a cylindrical matte-black ceramic coffee canister with a brushed brass lid centered on a plain neutral light-stone seamless studio backdrop, featuring a crisp cream minimalist front label reading 'KUROGANE ROAST' in bold geometric capitals and 'SINGLE ESTATE KYOTO · 200G' underneath, sharp studio lighting.",
        seed=1212,
    )
    img.save(REF_DIR / "multi-turn-brand-consistency.png")
    m = np.zeros((1024, 1024), dtype=np.uint8)
    m[250:830, 350:675] = 255
    save_mask("multi-turn-brand-consistency", m)


def main():
    token = get_token()
    with httpx.Client(timeout=180.0) as client:
        steps = [
            ("portrait-retouch", lambda: build_s01_portrait_retouch(client, token)),
            ("id-photo", lambda: build_s02_id_photo(client, token)),
            ("profile-color", lambda: build_s03_profile_color(client, token)),
            ("product-background", lambda: build_s04_product_background(client, token)),
            ("packaging-label", build_s05_packaging_label),
            ("product-seasonal", lambda: build_s06_product_seasonal(client, token)),
            ("web-banner", build_s07_web_banner),
            ("app-screen", build_s08_app_screen),
            ("character-style", lambda: build_s09_character_style(client, token)),
            ("logo-cleanup", build_s10_logo_cleanup),
            ("native-transparent-cutout", lambda: build_s11_native_transparent_cutout(client, token)),
            ("multi-turn-brand-consistency", lambda: build_s12_multi_turn_consistency(client, token)),
        ]
        manifest = {
            "benchmark": "MAI-Image-2.7 Commercial Image Editing Benchmark (ServImage / Editable Extended)",
            "generated_at_utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "resolution": "1024x1024",
            "reference_count": len(steps),
            "references": [],
        }
        for sid, fn in steps:
            p = REF_DIR / f"{sid}.png"
            t0 = time.perf_counter()
            fn()
            dt = round(time.perf_counter() - t0, 2)
            raw = p.read_bytes()
            sha = hashlib.sha256(raw).hexdigest()
            im = Image.open(p)
            print(f"[OK] {sid}: {im.size} {im.mode} ({len(raw)//1024} KB, {dt}s) sha256={sha[:16]}...")
            manifest["references"].append(
                {
                    "scene_id": sid,
                    "file": f"references/{sid}.png",
                    "width": im.width,
                    "height": im.height,
                    "bytes": len(raw),
                    "sha256": sha,
                }
            )
        (WORKSPACE / "freeze_manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
        print("Wrote freeze_manifest.json with", len(manifest["references"]), "frozen references.")


if __name__ == "__main__":
    main()
