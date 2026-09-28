# 인물 없는 이미지 교체 · AI 생성 프롬프트

작성 2026-09-28 · `public/` 아래 이미지 59장(images 44, screens 9, mascot 6)을 전부 눈으로 확인해 사람(얼굴·몸·손·행인)이 나오는 이미지를 골랐고, 같은 날 11장 모두 교체했습니다.

## 1. 교체 결과

| # | 파일명 | 최종 경로 | 규격(px) | 이전 사람 요소 | 새 이미지 | 사이트 노출 |
|---|---|---|---|---|---|---|
| 1 | `found-market.png` | `public/images/edition/` | 1536×1024 | 과일을 집는 손·소매 | 오렌지·사과·딸기 진열대 | 노출 중 (FOUND AI · 마트) |
| 2 | `fulif-hero-cinema-v2.png` | `public/images/` | 1672×941 | 영화관 커플 + 관객 | 빈 상영관, 팝콘과 티켓 | 코드 참조 없음 |
| 3 | `fulif-hero-cinema-mobile-v2.png` | `public/images/` | 941×1672 | 영화관 커플 + 관객 | 빈 상영관 세로 구도 | 코드 참조 없음 |
| 4 | `cafe-life.png` | `public/images/` | 1672×941 | 카페 커플 | 음료 두 잔이 놓인 빈 테이블 | 코드 참조 없음 |
| 5 | `life-hero.png` | `public/images/` | 1672×941 | 버스 안 여성 + 승객 | 에코백이 놓인 빈 창가 좌석 | 코드 참조 없음 |
| 6 | `reward-moment.png` | `public/images/` | 1672×941 | 휴대폰을 든 두 손 | 거치대에 세운 휴대폰 | 코드 참조 없음 |
| 7 | `partner-moment.png` | `public/images/editorial/` | 1536×1024 | 바리스타와 손님 | 포장 봉투가 놓인 빈 카운터 | 코드 참조 없음 |
| 8 | `service-day.png` | `public/images/editorial/` | 1536×1024 | 카페 안 여성 + 직원 | 빈 카페 창가 자리 | 코드 참조 없음 |
| 9 | `found-street.png` | `public/images/edition/` | 1672×941 | 멀리 걷는 행인 2명 | 행인 없는 동네 거리 | 코드 참조 없음 |
| 10 | `invite-art.png` | `public/images/benefits/` | 1254×1254 투명 | 사람 모양 3D 흉상 | 초대장 봉투 2개 | 노출 중 (혜택 · 친구 초대) |
| 11 | `donate-art.png` | `public/images/benefits/` | 1254×1254 투명 | 3D 손 모양 오브제 | 기부함 위의 하트 | 노출 중 (혜택 · 기부) |

- 원본 생성 파일은 `design/incoming/`에 같은 파일명으로 있습니다.
- `donate-art.png`는 생성본이 프레임을 거의 꽉 채워, 다른 혜택 아이콘과 크기가 맞도록 오브제를 긴 변 964px로 줄여 가운데 배치했습니다. 나머지 10장은 생성본 그대로입니다.
- 현재 히어로(`bright/hero-neighborhood*.png`)와 `bright/`, `fulif-own/`, `editorial/`의 나머지, `benefits/`·`subpages/` 3D 아트, 앱 스크린, 마스코트에는 사람이 없어 대상이 아닙니다.
- `legacy/` 폴더는 배포되지 않아 제외했습니다.

## 2. 다시 생성할 때의 규칙

1. 아래 **파일명 그대로** PNG(sRGB)로 저장합니다.
2. `design/incoming/` 폴더 **안에** 파일만 넣습니다. `design` 폴더 자체를 덮어쓰면 이 문서를 포함한 기존 문서가 지워집니다.
3. 해상도는 표의 규격 이상, 비율만 맞으면 됩니다.

| 비율 | 최종 규격 | 생성 시 권장 크기 |
|---|---|---|
| 3:2 가로 | 1536×1024 | 1536×1024 |
| 16:9 가로 | 1672×941 | 1672×941 또는 1920×1080 |
| 9:16 세로 | 941×1672 | 941×1672 또는 1080×1920 |
| 1:1 (투명 배경) | 1254×1254 | 1254×1254 또는 1024×1024 |

## 3. 공통 프롬프트

### 3-1. 실사 사진용 공통 블록 (1~9번)

각 이미지 프롬프트는 이 블록을 이미 포함하고 있습니다.

```text
Use case: photorealistic-natural. Asset type: original premium editorial photography for FULIF, a Korean everyday rewards website. Refined cobalt blue, white and pale sky blue with restrained green. Physically believable real materials and natural imperfect texture, not an illustration, not a plastic 3D miniature, not an AI-looking fantasy. Absolutely NO people, faces, hands, arms, silhouettes, human shadows, people reflected in glass, mannequins, models on posters, or human images on products or screens. No legible text, no lettering, logos, brand marks, watermarks, fake app UI or collages.
```

### 3-2. 네거티브 프롬프트 (도구가 지원할 때)

```text
people, person, human, man, woman, child, face, hands, fingers, arms, legs, silhouette, crowd, pedestrian, passerby, reflection of a person, human shadow, mannequin, portrait, poster with a person, text, letters, numbers, logo, watermark, signage, UI, barcode, low quality, distorted, extra objects
```

### 3-3. 생성 후 확인

- 유리창·거울·휴대폰 화면·금속 표면에 사람이 비치지 않는지
- 포스터·상품 포장·간판에 사람 그림이나 읽히는 글자가 없는지
- 멀리 있는 작은 행인, 차 안 운전자, 바닥의 사람 그림자가 없는지
- 파란색이 코발트 블루(`#3182f6` 계열)에 가깝고 전체가 밝은 톤인지 (영화관 장면 제외)

## 4. 이미지별 프롬프트

### 1. found-market.png

화면에서는 데스크톱 약 650×535, 모바일 가로 전체×315로 잘려 표시됩니다. 주요 과일은 중앙 70% 안에 둡니다.

```text
Use case: photorealistic-natural. Asset type: original premium editorial photography for FULIF, a Korean everyday rewards website. Refined cobalt blue, white and pale sky blue with restrained green. Physically believable real materials and natural imperfect texture, not an illustration, not a plastic 3D miniature, not an AI-looking fantasy. Absolutely NO people, faces, hands, arms, silhouettes, human shadows, people reflected in glass, mannequins, models on posters, or human images on products or screens. No legible text, no lettering, logos, brand marks, watermarks, fake app UI or collages. Primary request: wide landscape 3:2 close view of a fresh fruit display in a bright small Korean neighborhood grocery market. A generous pile of vivid oranges in a cobalt-blue plastic crate at the center, red apples in a blue crate to the left, clear punnets of strawberries in the front. Softly blurred bright shop interior with shelves and a sunlit window behind. No hand reaching for the fruit, nobody in the aisle. Main fruit kept within the central 70% of the frame so the image survives cropping. Eye-level 50mm photograph, shallow depth of field, luminous morning daylight, clean and appetizing, no price tags or labels.
```

### 2. fulif-hero-cinema-v2.png

```text
Use case: photorealistic-natural. Asset type: original premium editorial photography for FULIF, a Korean everyday rewards website. Refined cobalt blue, white and pale sky blue with restrained green. Physically believable real materials and natural imperfect texture, not an illustration, not a plastic 3D miniature, not an AI-looking fantasy. Absolutely NO people, faces, hands, arms, silhouettes, human shadows, people reflected in glass, mannequins, models on posters, or human images on products or screens. No legible text, no lettering, logos, brand marks, watermarks, fake app UI or collages. Primary request: wide cinematic 16:9 view of a completely empty modern cinema auditorium just after a screening. Rows of deep cobalt-blue velvet seats, warm small amber step lights along the aisle stairs on the right. In the middle row, one paper cup of popcorn resting in a cup holder and two blank pale paper tickets left on a seat cushion. Every seat is empty, nobody on the stairs, nobody in the background. Out-of-focus blue seat backs fill the lower foreground, leaving a calm dark area in the upper left for a white headline overlay. Moody but inviting low light, soft blue ambient glow, realistic velvet texture, 35mm lens.
```

### 3. fulif-hero-cinema-mobile-v2.png

```text
Use case: photorealistic-natural. Asset type: original premium editorial photography for FULIF, a Korean everyday rewards website. Refined cobalt blue, white and pale sky blue with restrained green. Physically believable real materials and natural imperfect texture, not an illustration, not a plastic 3D miniature, not an AI-looking fantasy. Absolutely NO people, faces, hands, arms, silhouettes, human shadows, people reflected in glass, mannequins, models on posters, or human images on products or screens. No legible text, no lettering, logos, brand marks, watermarks, fake app UI or collages. Primary request: tall portrait 9:16 image for a mobile website hero. A completely empty modern cinema auditorium with rows of deep cobalt-blue velvet seats and warm amber step lights along the aisle stairs on the right. In the middle of the frame, one paper cup of popcorn in a cup holder and two blank pale paper tickets left on a seat cushion. Every seat is empty, nobody on the stairs. Top 35% is calm dark blue ceiling and back wall with a few soft spotlights for a white headline overlay, bottom 30% is out-of-focus blue seat backs. Moody but inviting low light, realistic velvet texture.
```

### 4. cafe-life.png

```text
Use case: photorealistic-natural. Asset type: original premium editorial photography for FULIF, a Korean everyday rewards website. Refined cobalt blue, white and pale sky blue with restrained green. Physically believable real materials and natural imperfect texture, not an illustration, not a plastic 3D miniature, not an AI-looking fantasy. Absolutely NO people, faces, hands, arms, silhouettes, human shadows, people reflected in glass, mannequins, models on posters, or human images on products or screens. No legible text, no lettering, logos, brand marks, watermarks, fake app UI or collages. Primary request: wide 16:9 view of a long wooden table in a bright Korean cafe beside large open windows with green trees outside. On the table, two iced americano glasses with straws placed across from each other, a face-down white smartphone and a small glass vase of white wildflowers at the left edge. Two empty chairs slightly pulled out, as if friends have just stepped away. Nobody in the cafe, nobody outside the window. Bright airy daylight, soft leaf shadows on the table, shallow depth of field, calm warm mood with cobalt-blue accents in a coaster and a folded napkin.
```

### 5. life-hero.png

```text
Use case: photorealistic-natural. Asset type: original premium editorial photography for FULIF, a Korean everyday rewards website. Refined cobalt blue, white and pale sky blue with restrained green. Physically believable real materials and natural imperfect texture, not an illustration, not a plastic 3D miniature, not an AI-looking fantasy. Absolutely NO people, faces, hands, arms, silhouettes, human shadows, people reflected in glass, mannequins, models on posters, or human images on products or screens. No legible text, no lettering, logos, brand marks, watermarks, fake app UI or collages. Primary request: wide 16:9 interior of an empty Seoul city bus on a bright morning. A window seat with cobalt-blue upholstery on the right, a plain cream canvas tote bag resting on the seat, blue handrails and poles receding into the softly blurred background. Through the large window on the left, a sunlit tree-lined city street with softly blurred buildings. Every seat is empty, no driver visible, no pedestrians outside, no people in passing cars. Warm morning sunlight streaming across the seats, gentle lens glow, calm optimistic commute mood, 35mm lens. No route maps, advertisements or signage.
```

### 6. reward-moment.png

```text
Use case: photorealistic-natural. Asset type: original premium editorial photography for FULIF, a Korean everyday rewards website. Refined cobalt blue, white and pale sky blue with restrained green. Physically believable real materials and natural imperfect texture, not an illustration, not a plastic 3D miniature, not an AI-looking fantasy. Absolutely NO people, faces, hands, arms, silhouettes, human shadows, people reflected in glass, mannequins, models on posters, or human images on products or screens. No legible text, no lettering, logos, brand marks, watermarks, fake app UI or collages. Primary request: wide 16:9 close view of a modern smartphone standing upright on a small wooden stand on a round cafe table by a large window. The phone screen is plain clean white with only one simple cobalt-blue circle containing a white check mark in the center, nothing else on the screen. Beside it a white cup of latte on a saucer and a small vase of white flowers, softly blurred. Phone placed right of center, the left 45% is a softly blurred bright window with a pale city view for headline overlay. Nobody holding the phone, no hands, no reflections of a person on the screen. Soft natural daylight, shallow depth of field.
```

### 7. partner-moment.png

현재 파트너 페이지에서 쓰는 `bright/partner-counter.png`와 겹치지 않도록 카운터를 측면에서 본 구도입니다.

```text
Use case: photorealistic-natural. Asset type: original premium editorial photography for FULIF, a Korean everyday rewards website. Refined cobalt blue, white and pale sky blue with restrained green. Physically believable real materials and natural imperfect texture, not an illustration, not a plastic 3D miniature, not an AI-looking fantasy. Absolutely NO people, faces, hands, arms, silhouettes, human shadows, people reflected in glass, mannequins, models on posters, or human images on products or screens. No legible text, no lettering, logos, brand marks, watermarks, fake app UI or collages. Primary request: wide landscape 3:2 side-angle view along a bright neighborhood cafe pickup counter. A plain kraft paper takeaway bag with a folded top standing ready on the white stone counter in the center, a glass dome with scones at the lower left, a cobalt-blue espresso machine and a coffee grinder softly blurred behind. White tiled wall with wooden shelves of cups at the left, a large sunlit window on the right. No barista behind the counter, no customer, the order is simply waiting to be picked up. Blank tablet stand turned away from camera. Luminous natural daylight, warm welcoming mood, shallow depth of field.
```

### 8. service-day.png

```text
Use case: photorealistic-natural. Asset type: original premium editorial photography for FULIF, a Korean everyday rewards website. Refined cobalt blue, white and pale sky blue with restrained green. Physically believable real materials and natural imperfect texture, not an illustration, not a plastic 3D miniature, not an AI-looking fantasy. Absolutely NO people, faces, hands, arms, silhouettes, human shadows, people reflected in glass, mannequins, models on posters, or human images on products or screens. No legible text, no lettering, logos, brand marks, watermarks, fake app UI or collages. Primary request: wide landscape 3:2 interior of a bright minimalist Korean cafe with floor-to-ceiling windows and green street trees outside on the left. In the right half, a light oak table with a takeaway iced americano, a face-down smartphone and a cream canvas tote bag with a pale blue shirt folded over the back of the chair. A small vase of white wildflowers on a table in the lower left. Potted olive tree near the window. The cafe is empty, no customers, no staff behind the counter, nobody on the street outside. High-key airy daylight, soft shadows, calm uncluttered composition, 35mm lens. No framed pictures showing people.
```

### 9. found-street.png

```text
Use case: photorealistic-natural. Asset type: original premium editorial photography for FULIF, a Korean everyday rewards website. Refined cobalt blue, white and pale sky blue with restrained green. Physically believable real materials and natural imperfect texture, not an illustration, not a plastic 3D miniature, not an AI-looking fantasy. Absolutely NO people, faces, hands, arms, silhouettes, human shadows, people reflected in glass, mannequins, models on posters, or human images on products or screens. No legible text, no lettering, logos, brand marks, watermarks, fake app UI or collages. Primary request: wide 16:9 view down a quiet Seoul neighborhood street in warm late-afternoon light. On the left, a small convenience store with a vivid cobalt-blue awning and bright glass front, potted plants and a small wooden bench outside. Beyond it a cafe terrace with empty chairs, low-rise stone and white buildings, tall green street trees. The street and sidewalks are completely empty all the way to the far end, no pedestrians in the distance, no cyclists, no cars with drivers. Clear blue sky at upper right, long soft shadows, eye-level 28mm architectural photograph, human-scale and recognizably local. No shop signs with text.
```

### 10. invite-art.png

투명 배경을 지원하지 않는 도구라면 순백(`#ffffff`) 단색 배경으로 뽑은 뒤 배경을 제거합니다.

```text
Use case: stylized-concept. Asset type: original premium 3D object illustration for a Korean blue-and-white fintech rewards website (FULIF). Style: exquisitely polished soft 3D product render, like a high-end Korean financial app campaign; tactile matte pearl-white polymer and vivid cornflower/cobalt blue #3182f6, a little frosted ice-blue glass and brushed silver. Realistic rounded bevels, beautiful studio highlights, soft ambient occlusion, no plasticky toy cheapness, no outlines. Three-quarter view, centered compact still-life, all objects fully visible with generous 15% transparent margin. Square image. Truly transparent alpha background, no background plane or colored backdrop, no opaque white rectangle, subtle contact shadow only. No words, no UI, no logos, no watermark, no extra objects beyond described subject. Subject: Two rounded invitation envelopes leaning together, one cobalt blue in front and one pearl white behind, the front envelope slightly open with a frosted ice-blue card peeking out. A small thick blue plus symbol floating above between them. No people, no person icons, no busts, no hands, no faces.
```

### 11. donate-art.png

```text
Use case: stylized-concept. Asset type: original premium 3D object illustration for a Korean blue-and-white fintech rewards website (FULIF). Style: exquisitely polished soft 3D product render, like a high-end Korean financial app campaign; tactile matte pearl-white polymer and vivid cornflower/cobalt blue #3182f6, a little frosted ice-blue glass and brushed silver. Realistic rounded bevels, beautiful studio highlights, soft ambient occlusion, no plasticky toy cheapness, no outlines. Three-quarter view, centered compact still-life, all objects fully visible with generous 15% transparent margin. Square image. Truly transparent alpha background, no background plane or colored backdrop, no opaque white rectangle, subtle contact shadow only. No words, no UI, no logos, no watermark, no extra objects beyond described subject. Subject: A single soft sculptural cobalt-blue heart floating just above the slot of a small rounded pearl-white donation box, as if about to drop in. One small frosted ice-blue sparkle near the upper right. A quiet, warm giving gesture. No hands, no people, no faces, no other objects.
```
