# FULIF editorial edition · 2026-09-28

## 방향

사용자가 선호한 토스 계열의 넓은 여백, 큰 Pretendard 타이포그래피, 전체 화면 사진, 제품 중심의 설명 흐름을 유지하면서 전체 페이지의 구성을 다르게 정리했다. 거절된 종이 포켓 시안으로 되돌리지 않았다. 레퍼런스의 사진·일러스트·로고는 사용하지 않았다.

참고 페이지를 브라우저로 실제 확인했다.

- https://toss.im/impact — 큰 서사형 제목과 밝은 색면, 이미지와 메시지 사이의 여백.
- https://corp.tossinvest.com/ko — 어두운 히어로에서 제품 설명으로 전환하는 흐름, 서로 다른 성격의 큰 콘텐츠 패널.
- https://tossplace.com/ — 실제 이용 장면을 크게 보여주는 첫 화면과 간결한 카테고리 탐색.
- https://toss.im/ — 전체 화면 생활 이미지, 크고 명확한 메시지, 제품 화면과 설명의 균형.

내용 기준은 프로젝트의 2026-09-24판 `fulif_io_웹사이트 전체디자인(v.2).pdf` 62쪽 및 기존 웹 문구. PDF 스킬로 텍스트와 핵심 화면을 확인했고, imagegen 스킬로 새 비트맵 4종을 생성했다. 기존 풀리 캐릭터는 원본을 그대로 재사용했다.

## 페이지별 변경

| 페이지 | 구성 및 기능 |
|---|---|
| 홈 | 기존 영화관 → 티켓 히어로 전환 유지. ‘끝이 아니라, 다음의 시작’ 브랜드 섹션, 모으고/참여하고/발견해요 3단 연결, 티켓 오브제, FULL + LIFE와 풀리 소개 추가. 11개 섹션 내비게이션. 앱 화면과 본문 비율·여백 정리. |
| 서비스 | 큰 생활 사진, 10P/1개/30P 요약, 실제 앱 화면 중심 설명, 짙은 네이비 추첨 섹션, 가독성이 높은 단계·수치 표현. |
| FOUND AI | 동네 사진과 실제 앱 화면의 비대칭 히어로. 작은 풀리 안내. 편의점/마트/주유소 탭 및 키보드 좌우/Home/End 이동. 예시 행사임을 명시. 섹션 탐색 추가. |
| 멤버십 | 블루 패스 히어로 유지·확장. FULIF/FULIF+ 전환형 한도 비교. 네이비 전용 혜택, 월간 가격, 무료 체험 타임라인 구분. |
| 풀리 노트 | 한국어 대형 매거진 헤드라인, 작은 캐릭터 에디터, 연재 표지, 검색·카테고리별 개수·빈 결과 초기화. 상세 페이지 읽기 진행선과 원고 미확정 안내. 미구현 댓글 요청 문구 제거. |
| 브랜드 파트너 | 매장 사진 전체 히어로, AD SCALE 10개/8개/월 1회/카테고리 1사 수치, 기존 브랜드 연결 흐름, 설명과 문의 폼을 나눈 두 열 구성. |
| 다운로드 | 메시지와 실제 앱 갤러리를 나란히 배치. 모바일에서 메인 폰을 중심으로 재배치. 시작 단계 3개와 작은 풀리 환영 안내. |
| 고객센터 | 검색하는 풀리, 3개 안내 링크, 기존 서비스 조건 기반 FAQ. |
| 약관·개인정보·계정삭제 | 읽기 중심 헤더·본문 폭·글자 크기, 정책 사이 이동 링크. 법적 본문은 이번 작업에서 변경하지 않음. |
| 공통 | Pretendard Variable 로컬 제공 유지. 헤더·버튼·네이비 푸터·반응형 타이포그래피 정리. |

## 유지한 서비스 조건

- 연간 멤버십은 사용자의 후속 요청에 따라 제외한 상태 유지.
- 월 5,000원, 첫 달 무료 1회, 이후 자동 결제, 3일 전 안내, 스토어 해지.
- 낙첨 등록 무료 5 / 유료 20세트, 제공 번호 2 / 10세트, 하루 광고 10 / 20회.
- 응모권 1개의 당첨 확률은 회원 유형에 관계없이 같음.
- 쿠폰 사용 완료 10P, 티켓 등록 10P, 5회 등록에 응모권 1개.
- 오늘의 한 표 3개 모두 답하면 30P, 가입 100P, 초대한 분/초대받은 분 각각 100P.
- 포인트 현금화·양도·거래 불가, 유효기간 2년.
- 쿠폰 기부 잔여 유효기간 1개월 이상, 기부 30P.
- FOUND AI는 직접 설정한 생활권 1곳 기준, 실시간 위치 추적 없음.
- FOUND AI의 행사·주유 정보는 화면 예시로 명확히 표시. 실제 진행 중인 행사로 주장하지 않음.
- 오픈일 2026.10.12, 만 19세 이상.
- 파트너 폼은 기존 전송 로직 유지. 실제 제출 및 외부 메일 발송은 하지 않음.

## 검증

- `npm run build`: 통과, 19개 정적 출력 생성.
- `node scripts/check-site.mjs`: 17개 공개 페이지 HTTP 200, 내부 링크/앵커 576개 및 이미지 32개 검사, 오류 없음.
- 12개 대표 경로 × 320 / 390 / 820 / 1440px = 48회 레이아웃 검사: 문서 가로 넘침 없음, 각 페이지 h1 1개, 로드 실패 이미지 없음.
- 320px에서 주요 8개 페이지 본문·버튼·입력 필드의 좌우 잘림 추가 검사: 없음.
- 데스크톱 및 모바일 실제 화면 확인. 모바일 다운로드의 중심 폰이 옆으로 잘리던 CSS를 수정하고 재확인.
- 노트 ‘쿠폰’ 검색 2개, 없는 검색어의 빈 결과, 전체 복원, 사용법 분류 2개 확인.
- FOUND AI 마트/주유소 탭 및 키보드 ArrowRight로 선택·포커스·본문 동기화 확인.
- 무료 한도 5/2/10 ↔ FULIF+ 한도 20/10/20 전환 확인.
- 모바일 메뉴 열기/Escape 닫기, 섹션 탐색과 현재 위치 표시, 기사 읽기 진행선 확인.
- 파트너 문의 버튼의 폼 앵커 이동 및 필수 필드 검증 상태 확인. 전송하지 않음.
- 브라우저 콘솔 오류 없음.
- 감소된 모션 설정에서는 새 이미지/숫자 애니메이션 및 수치 바 전환 해제.

## 파일과 보존

- 핵심 새 구성: `components/Edition.js`
- 전체 디자인 확장: `styles/edition.css`
- 변경 전 코드 보존: `design/archive/pre-edition-2026-09-27.tar.gz`
- 기존 히어로 및 기존 디자인 자산은 삭제하지 않음.
- 로컬 개발 서버에 반영. 프로덕션 배포·커밋·PR 생성은 하지 않음.

## 공개 전 확인할 기존 항목

1. 기존 약관의 Starter/PRO 명칭·일부 무료 한도는 PDF 기반 현재 서비스 설명과 다르므로 운영 정책 확정 후 별도 정합성 검토가 필요하다. 디자인 수정으로 약관을 임의 변경하지 않았다.
2. 풀리 노트의 정식 원고·발행일, 네이버 블로그 주소는 미확정. 미리보기 표시 유지.
3. 스토어 링크의 출시 시점 상태와 공식 배지 원본·QR은 최종 확인 필요.
4. 기존 OG 공유 이미지는 변경하지 않았다.
5. 파트너 문의 메일은 SMTP 설정 및 실제 운영 테스트 필요. 이번에는 개인정보 입력/외부 발송 없이 검증했다.

## 생성한 이미지와 최종 프롬프트

새 원본은 아래 경로에 복사했다. 생성 도구의 원본도 유지하며, 화면에서는 Next.js 이미지 최적화를 사용한다.

### one-more-sculpture

출력: `/Users/jiyong/Desktop/02_Saffir/CWG/05_웹사이트/cwg.web/public/images/edition/one-more-sculpture.png`

```text
Use case: stylized-concept
Asset type: premium brand campaign artwork for FULIF, a blue and white Korean everyday rewards platform, to illustrate the concept of a used ticket beginning a second journey.
Primary request: one original, beautifully designed sculptural continuous ribbon formed from two broad ticket-like segments gently curving around into a single open loop, NOT an infinity sign or a logo. The ribbon is translucent electric-cobalt frosted glass with clean polished bevelled edges, very subtle tiny perforation details at the ticket ends. A quiet white porcelain round plinth, no additional objects.
Style: museum-quality contemporary product sculpture photography, physically realistic glass and light, sophisticated and restrained, no toy rendering.
Composition: landscape 3:2, sculpture centred, fully visible with generous white margin, occupies 65 percent of width. Soft white seamless background and floor, delicate soft blue caustic shadows. The bottom and outer edges fade naturally into pure white.
Lighting: luminous large softboxes, crisp crafted detail, matte and clear contrasting surfaces, rich blue and white only.
No text, no numbers, no logo, no watermark, no money, no coins, no bank cards, no sparkles, no icons, no floating UI.
```

### found-street

출력: `/Users/jiyong/Desktop/02_Saffir/CWG/05_웹사이트/cwg.web/public/images/edition/found-street.png`

```text
Use case: photorealistic-natural
Asset type: panoramic editorial website photograph for FOUND AI, a service for discovering benefits in one's selected Korean neighborhood.
Primary request: A beautiful ordinary Korean neighborhood on a sunny late afternoon, an intimate pedestrian-friendly side street with low-rise modern white and pale stone buildings, a small convenience shop with a restrained cobalt blue awning and illuminated windows, a cafe next door, subtle green street trees and two small distant adults walking. Real and lived-in, not an idealised miniature.
Composition: wide landscape 16:9, eye-level architectural photography, street perspective leading from lower left towards centre right, shopfronts well framed. A calm blue sky strip and natural warm sunlight. No cars dominating, no huge tall city towers.
Style: premium documentary travel editorial photography, 35mm lens, natural shadow detail, realistic surfaces, sophisticated blue-white colour grading with warm touches. Not over-saturated.
Constraints: no legible signage or lettering, no brands, no watermark, no fake app overlays, no location pins, no collage, no cartoon or 3D render.
```

### found-market

출력: `/Users/jiyong/Desktop/02_Saffir/CWG/05_웹사이트/cwg.web/public/images/edition/found-market.png`

```text
Use case: photorealistic-natural
Asset type: editorial photograph for a Korean local-benefits website, grocery market category.
Primary request: close editorial photograph of fresh oranges, apples and small punnets of strawberries arranged beautifully in clean blue and white produce crates at a neighborhood grocery market, a person's natural hand choosing a single orange on the right. Real texture and small natural imperfections.
Composition: landscape 3:2, cropped intimate scene, fruit fills the middle lower portion, shallow depth of field with softly blurred grocery shelves in the background. Refined natural retail moment rather than an advertisement.
Lighting: clean warm morning window light, true vivid yet restrained fruit colours, blue crate accents.
No prices, no sale signs, no branding, no legible text, no watermark, no smartphone, no artificial floating objects.
```

### found-fuel

출력: `/Users/jiyong/Desktop/02_Saffir/CWG/05_웹사이트/cwg.web/public/images/edition/found-fuel.png`

```text
Use case: photorealistic-natural
Asset type: editorial photograph for a Korean local-benefits website, nearby gas station category.
Primary request: an elegant close editorial photograph of an unbranded modern petrol pump at a clean neighborhood service station, crisp cobalt-blue fuel nozzle resting correctly in its grey metallic cradle. Background softly shows a white car and the edge of a pale blue canopy, no person.
Composition: landscape 3:2, nozzle and pump on right-middle of frame, clean lines, shallow depth of field, close enough to feel tactile, contextual rather than product catalog. No visible display numbers or price board.
Style: photorealistic high-end documentary commercial photography, natural afternoon light, realistic industrial surfaces, blue-white-silver palette.
Constraints: no logos or brands, no text, no fake offers, no watermark, no bank cards, no floating UI.
```
