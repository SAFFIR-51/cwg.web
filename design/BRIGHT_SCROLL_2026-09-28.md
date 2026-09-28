# 밝은 일상 이미지 · 스크롤형 구성

2026-09-28 · imagegen 스킬 / 내장 image_gen 사용. 생성된 원본은 보존하고 프로젝트에 복사했습니다.

## 반영

- 인물 없는 편의점·주유소 히어로(데스크톱/모바일 별도), 밝은 커피·티켓 정물, 동네 가게, 브랜드 카운터.
- 기존 페이지 내용과 수치 유지. 얼굴이 있는 기존 이미지의 코드 참조만 교체하고 이전 원본은 보존.
- 홈 서비스·놀이터, 하루 흐름, FOUND AI 지도·장소, 멤버십을 자연 스크롤형으로 전환. 휠/터치 이벤트 가로채기 없음.
- 작은 화면·낮은 화면·동작 줄이기·JS 미실행 환경에서는 모든 설명과 이미지가 순차적으로 표시됩니다.

## 최종 프롬프트와 저장 경로

검증: `npm run build` 성공. `scripts/check-site.mjs`: 17개 페이지, 내부 링크 582개, 이미지 34개 오류 없음. `scripts/check-scroll-stories.mjs`: 6개 스크롤 섹션·21개 장면이 최초 HTML에 존재하고, 설명 탭과 이전 인물 사진 참조가 없음을 검증. 실제 브라우저에서 6개 섹션 정·역방향 스크롤, PageDown 전환, 390px 모바일, 주요 7개 페이지의 320px 가로 넘침/이미지 오류, 높이 600px의 연속형 대체 레이아웃 확인. 문의 제출·결제·위치 권한 요청 없음. 이 변경은 아직 커밋·배포하지 않음.

### hero-neighborhood

저장: `/Users/jiyong/Desktop/02_Saffir/CWG/05_웹사이트/cwg.web/public/images/bright/hero-neighborhood.png`

```text
Use case: photorealistic-natural. Asset type: original premium editorial photography for FULIF, a Korean everyday rewards website. Bright, airy, optimistic daylight; refined cobalt blue, white, pale sky blue with restrained green. Physically believable real materials and natural imperfect texture, clean architectural photography, not an illustration, not a plastic 3D miniature, not an AI-looking fantasy. Absolutely NO people, faces, hands, silhouettes, people reflected in glass, models on posters, or human images on products. No legible text, no lettering, logos, brand marks, watermarks, fake app UI or collages. Primary request: a welcoming small Korean neighborhood convenience shop beside a compact modern local petrol station. A distinctive clean cobalt-blue edged canopy and two white-and-blue fuel pumps on the right, a bright glass-fronted convenience shop with blue awning slightly behind. White low-rise buildings and fresh green trees. Wide landscape 3:2 composition for a full-screen website hero, eye level 28mm architectural photograph. Keep the upper left 45% calm and very bright pale sky and white building wall, with few details, for dark headline overlay. Buildings, shop and fuel pumps clustered on the right and in the lower half. Sunlit pale concrete foreground, luminous midday sunlight, gentle short shadows, generous uncluttered space. Recognizably a real convenience store and gas station, not luxury resort, no car or people.
```

### hero-neighborhood-mobile

저장: `/Users/jiyong/Desktop/02_Saffir/CWG/05_웹사이트/cwg.web/public/images/bright/hero-neighborhood-mobile.png`

```text
Use case: photorealistic-natural. Asset type: original premium editorial photography for FULIF, a Korean everyday rewards website. Bright, airy, optimistic daylight; refined cobalt blue, white, pale sky blue with restrained green. Physically believable real materials and natural imperfect texture, clean architectural photography, not an illustration, not a plastic 3D miniature, not an AI-looking fantasy. Absolutely NO people, faces, hands, silhouettes, people reflected in glass, models on posters, or human images on products. No legible text, no lettering, logos, brand marks, watermarks, fake app UI or collages. Primary request: portrait 2:3 image for mobile website hero. A welcoming Korean neighborhood convenience shop with cobalt-blue awning next to a compact white-and-blue petrol station canopy and one fuel pump. Real eye-level architecture photograph. Bottom 55% shows the shop, one fuel pump on the right and a short sunlit forecourt, green tree at edge. Top 45% very calm pale blue sky and simple bright white building wall for dark headline overlay, no fine visual clutter. Optimistic high-key daylight, realistic modest neighborhood scale, no people, no vehicles.
```

### everyday-still-life

저장: `/Users/jiyong/Desktop/02_Saffir/CWG/05_웹사이트/cwg.web/public/images/bright/everyday-still-life.png`

```text
Use case: photorealistic-natural. Asset type: original premium editorial photography for FULIF, a Korean everyday rewards website. Bright, airy, optimistic daylight; refined cobalt blue, white, pale sky blue with restrained green. Physically believable real materials and natural imperfect texture, clean architectural photography, not an illustration, not a plastic 3D miniature, not an AI-looking fantasy. Absolutely NO people, faces, hands, silhouettes, people reflected in glass, models on posters, or human images on products. No legible text, no lettering, logos, brand marks, watermarks, fake app UI or collages. Primary request: wide landscape 3:2 editorial still life of ordinary daily rewards: a simple takeaway iced coffee on a blue coaster, two blank white perforated cinema tickets, a face-down white smartphone and a neatly folded plain cobalt blue reusable shopping bag, on a luminous off-white cafe counter by a window. Objects grouped in the right half with abundant empty warm white surface in the left 50% for dark headline. A softly blurred hint of blue convenience-store awning through the window in upper right. Bright natural morning sunlight, delicate soft window shadows, real coffee condensation, textured paper, inviting uncluttered composition. No printed numbers, barcode, coupon UI or bank cards.
```

### found-neighborhood

저장: `/Users/jiyong/Desktop/02_Saffir/CWG/05_웹사이트/cwg.web/public/images/bright/found-neighborhood.png`

```text
Use case: photorealistic-natural. Asset type: original premium editorial photography for FULIF, a Korean everyday rewards website. Bright, airy, optimistic daylight; refined cobalt blue, white, pale sky blue with restrained green. Physically believable real materials and natural imperfect texture, clean architectural photography, not an illustration, not a plastic 3D miniature, not an AI-looking fantasy. Absolutely NO people, faces, hands, silhouettes, people reflected in glass, models on posters, or human images on products. No legible text, no lettering, logos, brand marks, watermarks, fake app UI or collages. Primary request: wide landscape 3:2 view of a lovely everyday Korean neighborhood corner on a clear bright morning. A small white tiled convenience store with vivid cobalt-blue awning, adjacent grocery display with oranges and fresh produce in blue crates, white low-rise facade, a couple of potted green plants and a pale blue bicycle leaning at the far right. No people anywhere. Storefronts in the right two thirds, left third is pale sunlit wall and calm sidewalk with negative space for dark headline overlay. Human-scale and recognizably local not resort, high-key airy architectural editorial photography with natural glass reflections, clear sky and soft shadows. No shop text.
```

### partner-counter

저장: `/Users/jiyong/Desktop/02_Saffir/CWG/05_웹사이트/cwg.web/public/images/bright/partner-counter.png`

```text
Use case: photorealistic-natural. Asset type: original premium editorial photography for FULIF, a Korean everyday rewards website. Bright, airy, optimistic daylight; refined cobalt blue, white, pale sky blue with restrained green. Physically believable real materials and natural imperfect texture, clean architectural photography, not an illustration, not a plastic 3D miniature, not an AI-looking fantasy. Absolutely NO people, faces, hands, silhouettes, people reflected in glass, models on posters, or human images on products. No legible text, no lettering, logos, brand marks, watermarks, fake app UI or collages. Primary request: a bright modern neighborhood cafe counter with a neat collection of unbranded white takeaway coffee cups with cobalt-blue sleeves, a white bakery bag and a small kraft gift box with a blue ribbon at the right. Behind them an out-of-focus clean white tiled counter, bright window and a blue shelf. Wide landscape 3:2 hero photo for a brand-partner website. Left 50% mostly clean softly lit cream white wall and counter for dark website headline, products grouped at right. Luminous natural daylight, calm premium lifestyle editorial, generous negative space and beautiful subtle paper textures, no people, no faces or hands, no signage or printed text.
```
