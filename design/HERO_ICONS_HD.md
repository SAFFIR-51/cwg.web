# 메인 히어로 고해상도 아이콘

## 변경 사유

기존 `public/icons/{coupon,gift,ticket3d,lotto}.png`는 모두 192×192px입니다. 데스크톱 히어로에서 최대 약 358 CSS px로 표시되고 고밀도 디스플레이에서는 더 많은 픽셀이 필요하므로 원본을 확대하면 흐려집니다.

기존 소형 아이콘은 보존하고, 메인 히어로에서만 `public/icons/hero/`의 1254×1254px 투명 PNG 4종을 사용합니다. CSS 배경·배치·애니메이션과 제어 버튼이 없는 구성은 유지합니다. Next Image 품질은 95로 설정하고 `next.config.js`의 허용 품질에도 95를 추가했습니다. 표시 크기에 맞는 반응형 이미지를 제공합니다.

## 생성 방식

- 내장 이미지 생성 도구, imagegen 스킬의 편집 흐름 사용. CLI/API 별도 호출 없음.
- 기존 아이콘을 편집 대상으로 지정해 색상·사물·구도를 유지하며 고해상도로 재제작.
- 단순 리사이즈가 아닌 재생성이므로 세부 입체 형태는 원본과 조금 다를 수 있음.
- 생성 파일의 알파 채널과 실제 투명도 및 브라우저 렌더링을 확인.

## 파일과 최종 프롬프트

공통 프롬프트:

> Use case: precise-object-edit. Input image is the EDIT TARGET. Re-render this exact FULIF 3D UI icon at high resolution, 1536x1536 if possible, minimum 1024x1024, with truly transparent alpha background. Preserve its design, object count, silhouette, camera angle, blue and white palette, soft rounded dimensional materials and composition. Recover perfectly crisp modeled edges, smooth surfaces, clear details; NOT merely a blurry upscale. Object centered at about 78% of canvas with safe padding. No backdrop, no floor, no vignette, no text additions, no watermark, no extra decorations. Output one isolated production web icon.

각 프롬프트는 공통 프롬프트에 아래 문장을 추가한 것입니다.

| 출력 파일 | 입력 파일 | 추가 프롬프트 |
|---|---|---|
| `public/icons/hero/coupon-hd.png` | `public/icons/coupon.png` | A blue and white notched coupon with a white percent symbol. |
| `public/icons/hero/gift-hd.png` | `public/icons/gift.png` | A white rounded gift box with vivid blue wrapping ribbon and a crisp blue bow. |
| `public/icons/hero/ticket-hd.png` | `public/icons/ticket3d.png` | A white ticket with blue outline and blue star, together with its small blue-white gift and small star as in the target. |
| `public/icons/hero/lotto-hd.png` | `public/icons/lotto.png` | A blue-white rounded lottery/calendar icon with grid buttons and a small ball marked 7. |
