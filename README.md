# FULIF · 풀리프 웹사이트 (fulif.io)

Next.js(Pages Router) + Tailwind CSS로 만든 공식 웹사이트. 내용은 2026-09-24 최종본(`fulif_io_웹사이트 전체디자인(v.2).pdf`)과 기존 서비스 안내를 기준으로 합니다. 디자인은 2026-09-30 요청(`cwg 웹 수정 전달.md`)에 따라 **토스형 구성을 모두 걷어내고 실제 앱 화면(폰 목업)이 중심인 제품 사이트**로 재구성했습니다. 혜택 수치·한도·기간은 PDF와 대조했으며, 연간 멤버십만 사용자의 후속 지시에 따라 제외합니다. 설계 이력은 `DESIGN.md`에 있습니다.

## 실행

모든 페이지가 같은 프리미티브(`components/blocks.js`)로 조립됩니다. 첫 화면은 `PageHero`(유일한 h1) + 폰 목업, 본문은 `SplitFeature`·`FeatureGrid`·`ScreenCard` 등, 마무리는 `CtaBand`입니다. 본문의 예시 정보와 유의사항은 PDF 내용을 유지합니다. 스타일은 `styles/globals.css`(토큰·기본 요소·헤더·푸터·리걸), `blocks.css`(공용 블록), `home.css`(홈 레이아웃), `pages.css`(서브 페이지) 4개뿐입니다.

```bash
npm install
cp .env.example .env.local   # SMTP 등 채우기
npm run dev                  # http://localhost:3000
npm run build && npm start   # 프로덕션
PORT=3107 npm start          # 다른 프로젝트가 3000번을 쓸 때
SITE_CHECK_ORIGIN=http://127.0.0.1:3107 npm run check   # 링크·앵커·이미지·섹션·금지 패턴 점검 (프로덕션 서버 필요)
```

## Vercel 배포

GitHub의 `main` 브랜치에 푸시하면 기존 Vercel 프로젝트에서 자동 배포합니다. 저장소 루트의 `vercel.json`이 프레임워크를 `nextjs`, 설치를 `npm ci`, 빌드를 `npm run build`, 빌드 결과를 `.next`로 명시합니다. 기존 정적 HTML 프로젝트의 `Other`/`public` 설정이 남아 있어도 이 배포 설정을 우선 사용합니다.

Vercel Root Directory는 이 저장소의 루트로 유지해야 합니다. `public`은 이미지·폰트용 폴더이며 사이트 전체 배포 결과가 아닙니다. Next.js의 페이지·이미지 최적화·`/api/contact`를 함께 배포해야 합니다. SMTP 환경변수는 기존 Vercel 프로젝트에서 별도 관리하며 저장소에는 포함하지 않습니다.

배포 성공 표시만으로 완료를 판단하지 말고 실제 도메인의 `/`, `/full-life`, `/found-ai`, `/membership`, `/notes`, `/partners`, `/download` 응답과 화면을 확인합니다. 구 `*.html` 주소의 리다이렉트도 확인합니다.

## 페이지

| 경로 | 디자인 장 | 비고 |
|---|---|---|
| `/` | 01 홈 | 폰 목업 히어로 · 세 단계 · 앱 화면 벤토 4장 · FOUND · 포인트 · 놀이터 · FULIF+ · 풀리와 약속 · 함께 · 다운로드 밴드 |
| `/full-life` | 02 Full Life | 상단 칩 → 섹션 앵커 |
| `/found-ai` | 03 FOUND AI | |
| `/membership` | 04 멤버십 | 구독 버튼은 스토어로 연결(결제는 앱에서만) |
| `/notes`, `/notes/[slug]` | 05 풀리 노트 | 글 데이터는 `lib/notes.js` (제목·요약은 예시) |
| `/partners` | 06 Partners | 문의 폼 → `POST /api/contact` (SMTP) |
| `/download` | 07 다운로드 | QR은 스토어 링크 확정 후 이미지 교체 |
| `/terms` `/privacy` `/delete-account` | — | 본문 HTML은 `content/legal/*.html` (연간 구독 관련 조항만 요청에 따라 삭제, 다른 원문 유지) |
| `/support` | — | 푸터 고객센터 링크 |

구 정적 사이트 주소(`*.html`)는 `next.config.js` 에서 새 경로로 301 리다이렉트합니다.

## 구조

```
pages/            라우트 (+ pages/api/contact.js 메일 발송)
components/       Header · Footer · Brand(로고) · StoreBadges · ui.js(섹션·카드·단계·FAQ·Phone·PulliNote·SectionNav)
components/blocks.js  공용 블록: PageHero · PhoneStack · ScreenCard · SplitFeature · FeatureGrid · PricingCard · CompareBars · StepTimeline · FactList · CtaBand
components/home/  홈 조립(HomePage · HomeHero · sections)
components/Art.js 3D 아이콘 · 풀리 노트 표지 / VotePreview.js 오늘의 한 표 웹 데모
styles/           globals · blocks · home · pages (4개, pages/_app.js 순서)
scripts/          check-site.mjs(링크·앵커·이미지·h1) · check-pages.mjs(섹션 id·금지 패턴·CSS 토큰)
lib/site.js       스토어 URL · 메뉴 · 회사 정보 · 오픈일
lib/notes.js      풀리 노트 글 목록
content/legal/    약관 · 개인정보처리방침 · 계정삭제 본문
public/brand      F 심벌 · 워드마크 (앱과 동일)
public/mascot     풀리 마스코트
public/icons      앱 3D 기능 아이콘
public/images/benefits  메인 혜택·포인트·놀이터용 오리지널 3D 일러스트 10종
public/images/subpages  FOUND AI · 멤버십 · 노트용 오리지널 3D 일러스트 3종
public/images/editorial  found-town(지도) · note-coffee · note-number 사용, 나머지는 미사용
public/images/edition  found-market · found-fuel 사용, 나머지는 미사용
public/images/bright · fulif-own · 루트 images/*.png  미사용(리디자인 이전 사진, 기록용 보관)
public/screens    앱 화면 캡처 (01_개발 앱을 390×844 @2x 로 캡처) — 폰 목업에 사용
legacy/           2026-09 이전 정적 사이트 원본 (참고용, 배포되지 않음)
```

## 환경 변수 (`.env.example` 참고)

- `MAIL_*` — 파트너 문의 메일 발송(Gmail 앱 비밀번호 등). 없으면 폼 제출 시 502.
- `NEXT_PUBLIC_PLAY_URL`, `NEXT_PUBLIC_APPSTORE_URL` — 스토어 배지 링크
- `NEXT_PUBLIC_BLOG_URL` — 풀리 노트 하단 네이버 블로그 버튼(비어 있으면 비활성 표시)

## 디자인 규칙 요약

- 시각 중심은 실제 앱 화면(폰 목업). 생활 사진 리드·스크롤 고정 연출·챕터 레일 없음. 사진은 FOUND 장소 카드 썸네일과 노트 표지에만
- 색: F 심벌의 하늘→코발트(`#63D5FF → #0786F6 → #064CCE`) 그라데이션, 잉크 `#182638`, 흰색·연블루 서피스(`#F3F7FD`, `#EAF4FF`), 풀리 초록 `#5DBE3F`은 소형 강조. 토큰은 `styles/globals.css :root`와 `tailwind.config.js`에 동일하게 정의
- 글꼴 Pretendard Variable, 좌정렬. 페이지 제목 40~62px, 섹션 제목 30~42px, 본문 16~17px. 3D 아이콘은 56~96px 소형만
- 버튼은 파란 solid(`.btn-primary`) / 아웃라인(`.btn-secondary`) / 텍스트 링크(`.btn-link`). 라운드 14/20/28px

## 히어로 이미지 · 타이포그래피 (2026-09-27)

승인된 전체 화면 구성과 스크롤 전환은 유지하고, 홈 첫 두 이미지만 풀리프의 관람 티켓 이야기로 교체했습니다. `fulif-hero-cinema-v2.png`, `fulif-hero-ticket-v2.png`와 모바일 전용 `fulif-hero-cinema-mobile-v2.png`를 사용합니다. 영문·숫자·폼까지 Pretendard Variable로 통일했으며 폰트는 `public/fonts/pretendard/`에서 로컬 제공됩니다. 생성 프롬프트·파일 경로·전체 점검 결과는 `design/HERO_REFRESH_2026-09-27.md`에 있습니다.

## 전체 페이지 에디토리얼 업그레이드 (2026-09-28)

Toss Impact · Toss Securities · Toss Place · Toss 홈의 구성을 실제 확인하고, 페이지별로 사진·제품·타이포그래피의 비중을 다르게 구성했습니다. 홈 브랜드 소개와 풀리 이야기, FOUND AI 장소 탭, 멤버십 한도 전환, 풀리 노트 검색·읽기 진행선, AD SCALE 소개, 도움말·정책 화면을 포함합니다. 생성 프롬프트와 검증 기록은 `design/EDITORIAL_EDITION_2026-09-28.md`에 있습니다. 변경 전 코드는 `design/archive/pre-edition-2026-09-27.tar.gz`에 보존했습니다.

## 인물 없는 이미지로 교체 (2026-09-28)

사람(얼굴·몸·손·행인)이 나오던 이미지 11장을 같은 파일명·같은 규격의 인물 없는 이미지로 교체했습니다. 현재 홈 히어로는 `bright/hero-neighborhood.png`(모바일 `bright/hero-neighborhood-mobile.png`)이며, 위 2026-09-27 항목의 `fulif-hero-cinema-*` 파일은 더 이상 페이지에서 불러오지 않습니다. 대상 목록과 생성 프롬프트는 `design/NO_PEOPLE_IMAGE_PROMPTS.md`에 있습니다.

빌드 후 개발 서버가 켜진 상태에서 `node scripts/check-site.mjs`로 공개 페이지·내부 앵커·이미지를 읽기 전용으로 점검할 수 있습니다.

## 앱 화면 중심 리디자인 (2026-09-30)

`cwg 웹 수정 전달.md`의 요청(토스와 비슷한 구성 없애기 · 디자인 전반 개선)에 따라 홈과 서브 페이지 전체를 다시 구성했습니다. 제거한 것: 둥근 전체화면 사진 히어로와 3분할 헤드라인, 왼쪽 챕터 눈금 레일, 스크롤 고정 크로스페이드, 초대형 타이포 인터루드, 고정 휴대폰 챕터(`ScrollStory`) 6곳, 전면 사진 섹션, 100P 대형 숫자 패널, 회색 pill 버튼, 남색 푸터와 대형 워드마크, 토스 색 토큰. `scripts/check-pages.mjs`가 이 패턴들이 다시 들어오지 않도록 검사합니다. 서비스 사실관계(포인트 수치, 한도, 추첨 시각, 동일 확률, 19세, 오픈일)는 그대로입니다.

## 남은 확인 항목 (디자인 코멘트)

1. 스토어 배지: 현재 SVG 로 공식 배지 모양을 그렸음. Google · Apple 공식 배지 이미지를 받으면 `components/StoreBadges.js` 에서 교체.
2. 다운로드 페이지 QR: 스토어 링크 확정 후 추가. 미완성 자리표시 박스는 노출하지 않음.
3. 풀리 노트 연재 1편 본문 · 네이버 블로그 주소.
4. OG 이미지는 `public/images/og-image-v2.png`(새 톤, 1200×630)로 교체 완료. 카카오 등 캐시에 남은 옛 썸네일은 파일명이 바뀌어 새로 읽힌다.
6. 미사용 이미지 정리: `public/images/bright/*`, `editorial/{member-pass,partner-gift,partner-moment,service-day}.png`, `edition/{one-more-sculpture,found-street}.png`, 루트 `images/{cafe-life,life-hero,reward-moment,partners-hero,one-more-sculpture,fulif-hero-*}.png`, `fulif-own/*`. 삭제 여부는 별도 확인 후 진행.
5. 기존 약관의 Starter/PRO 명칭 및 일부 무료 한도는 현재 서비스 안내와 달라 별도 정책 확정이 필요합니다. 이번에는 요청받은 연간 구독 관련 내용만 제거했습니다.
