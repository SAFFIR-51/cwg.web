# -*- coding: utf-8 -*-
"""카카오톡/SNS 공유 카드(assets/images/og-image.png) 생성 스크립트.

카피를 바꾸려면 아래 line1 / line2 / sub 만 수정하고 다시 실행하면 된다.
    python tools/make-og-image.py

카카오톡은 공유 카드를 캐시하므로, 교체 후
https://developers.kakao.com/tool/clear/og 에서 URL 캐시를 초기화해야 새 카드가 보인다.

필요 패키지: pillow, numpy
"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO = os.path.join(ROOT, "assets", "images", "logo_new.png")
OUT = os.path.join(ROOT, "assets", "images", "og-image.png")

# 1200x630 — 카카오톡이 크롭 없이 가로형 큰 카드로 띄우는 규격
W, H = 1200, 630
BG = (6, 9, 16)          # --bg-base
BLUE = (39, 102, 248)    # --main-color
BLUE_LT = (74, 130, 255) # --main-color3
VIOLET = (88, 45, 224)

F_BOLD = r"C:\Windows\Fonts\malgunbd.ttf"
F_REG = r"C:\Windows\Fonts\malgun.ttf"

line1 = "낙첨 로또로 시작해,"
line2 = "생활혜택을 찾아주는 AI 리워드 플랫폼"
sub = "FULIF · 풀리프    |    2026. 9. 7 오픈"

yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
acc = np.zeros((H, W, 3), dtype=np.float32)
acc[:] = BG


def glow(cx, cy, radius, color, strength):
    """전체 캔버스 기준 부드러운 원형 광원 — 경계 이음새가 생기지 않는다."""
    d = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2) / radius
    t = np.clip(1.0 - d, 0.0, 1.0)
    falloff = t * t * (3 - 2 * t)  # smoothstep
    a = (falloff * strength)[..., None]
    acc[:] = acc * (1 - a) + np.array(color, dtype=np.float32) * a


glow(210, 90, 760, BLUE, 0.42)
glow(1080, 610, 700, VIOLET, 0.38)
glow(620, 300, 520, (26, 48, 110), 0.30)

# 상하 비네트로 가장자리를 눌러 카드 안쪽에 시선이 모이게
vig = np.clip(1.0 - (np.abs(yy - H / 2) / (H / 2)) ** 3 * 0.55, 0, 1)[..., None]
acc[:] = acc * vig

canvas = Image.fromarray(np.clip(acc, 0, 255).astype(np.uint8), "RGB")
draw = ImageDraw.Draw(canvas)

# 하단 액센트 라인 (보라 → 블루 그라데이션)
for x in range(W):
    t = x / (W - 1)
    draw.line(
        [(x, H - 7), (x, H)],
        fill=tuple(int(VIOLET[i] + (BLUE_LT[i] - VIOLET[i]) * t) for i in range(3)),
    )


def fit_font(path, text, max_w, start, min_size=24):
    """max_w 안에 들어갈 때까지 폰트 크기를 줄인다 — 카피가 길어져도 잘리지 않게."""
    size = start
    while size > min_size:
        f = ImageFont.truetype(path, size)
        if draw.textlength(text, font=f) <= max_w:
            return f
        size -= 2
    return ImageFont.truetype(path, min_size)


SAFE_W = 1000  # 좌우 100px 여백

logo = Image.open(LOGO).convert("RGBA")
logo_w = 460
logo_h = round(logo.height * logo_w / logo.width)
logo = logo.resize((logo_w, logo_h), Image.LANCZOS)

f1 = fit_font(F_BOLD, line1, SAFE_W, 56)
f2 = fit_font(F_BOLD, line2, SAFE_W, 56)
fs = fit_font(F_REG, sub, SAFE_W, 28)

gap_logo, gap_line, gap_sub = 54, 14, 40
h1, h2, hs = f1.size + 12, f2.size + 12, fs.size + 8
total = logo_h + gap_logo + h1 + gap_line + h2 + gap_sub + hs
y = (H - total) // 2 - 10

canvas.paste(logo, ((W - logo_w) // 2, y), logo)
y += logo_h + gap_logo
draw.text((W / 2, y), line1, font=f1, fill=(255, 255, 255), anchor="ma")
y += h1 + gap_line
draw.text((W / 2, y), line2, font=f2, fill=(255, 255, 255), anchor="ma")
y += h2 + gap_sub
draw.text((W / 2, y), sub, font=fs, fill=(155, 175, 215), anchor="ma")

canvas.save(OUT, "PNG", optimize=True)
print("saved:", OUT, canvas.size, os.path.getsize(OUT), "bytes")
