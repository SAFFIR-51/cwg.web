# FULIF · 풀리프 웹사이트 (fulif.io)

Next.js(Pages Router) + Tailwind CSS로 만든 공식 웹사이트. 내용은 2026-09-24 최종본(`fulif_io_웹사이트 전체디자인(v.2).pdf`)과 기존 서비스 안내를 기준으로 합니다. 디자인은 사용자가 선호한 이전 **토스형 전체 화면 히어로 · 스크롤 전환 · 대형 휴대폰 · 3D 혜택 카드**를 유지합니다. 종이 포켓 중심 재설계는 사용자가 거절하여 실제 화면에서 제외했습니다. 혜택 수치·한도·기간은 PDF와 대조했으며, 연간 멤버십만 사용자의 후속 지시에 따라 제외합니다. 설계 이력은 `DESIGN.md`에 있습니다.

## 실행

서비스 · FOUND AI · 멤버십 · 풀리 노트 · 브랜드 파트너 · 다운로드는 각각 생활 사진, 동네 사진과 실제 앱 화면, 블루 멤버십 패스, 검색형 매거진, 매장 캠페인, 앱 갤러리로 다르게 구성했습니다. 본문의 예시 정보와 유의사항은 PDF 내용을 유지합니다. 최신 전체 페이지 확장은 `components/Edition.js`와 `styles/edition.css`이며, 기존 `story.css`, `benefits.css`, `subpages.css`, `page-scenes.css`, `story-restoration.css` 위에 적용됩니다. `styles/fulif-own.css`와 종이 포켓 이미지 6종은 미사용 시안입니다.

```bash
npm install
cp .env.example .env.local   # SMTP 등 채우기
npm run dev                  # http://localhost:3000
npm run build && npm start   # 프로덕션
```

## 페이지

| 경로 | 디자인 장 | 비고 |
|---|---|---|
| `/` | 01 홈 | 전체 화면 생활 이미지 · 스크롤 연동 휴대폰 · 혜택 카드 · 놀이터 탭 |
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
components/       Header · Footer · Brand(로고) · StoreBadges · ui.js(섹션·카드·단계·FAQ 등)
lib/site.js       스토어 URL · 메뉴 · 회사 정보 · 오픈일
lib/notes.js      풀리 노트 글 목록
content/legal/    약관 · 개인정보처리방침 · 계정삭제 본문
public/brand      F 심벌 · 워드마크 (앱과 동일)
public/mascot     풀리 마스코트
public/icons      앱 3D 기능 아이콘
public/images/benefits  메인 혜택·포인트·놀이터용 오리지널 3D 일러스트 10종
public/images/subpages  FOUND AI · 멤버십 · 노트용 오리지널 3D 일러스트 3종
public/images/editorial  각 상세 페이지용 생활 사진 · 동네 지도 · 패스 · 선물 · 매거진 표지 7종
public/images/edition  티켓 오브제 · 동네 · 마트 · 주유소 새 비주얼 4종
public/images/fulif-own  미사용 종이 포켓 시안 이미지 6종 (기록용 보관)
public/screens    앱 화면 캡처 (01_개발 앱을 390×844 @2x 로 캡처) — 폰 목업에 사용
legacy/           2026-09 이전 정적 사이트 원본 (참고용, 배포되지 않음)
```

## 환경 변수 (`.env.example` 참고)

- `MAIL_*` — 파트너 문의 메일 발송(Gmail 앱 비밀번호 등). 없으면 폼 제출 시 502.
- `NEXT_PUBLIC_PLAY_URL`, `NEXT_PUBLIC_APPSTORE_URL` — 스토어 배지 링크
- `NEXT_PUBLIC_BLOG_URL` — 풀리 노트 하단 네이버 블로그 버튼(비어 있으면 비활성 표시)

## 디자인 규칙 요약

- 메인: 큰 생활 사진, 화이트·옅은 블루, 넓은 여백과 큰 타이포, 주요 카드 r28~36
- 파랑 `#3182F6` 중심의 활성 상태·혜택 숫자·3D 비주얼. 다른 상세 페이지는 기존 블루 팔레트 유지
- 글꼴 Pretendard Variable로 한글·영문·숫자·폼 통일, 작은 UI 아이콘은 외부 폰트가 필요 없는 로컬 SVG
- 메인 제목 39~78px, 섹션 제목 32~50px, 본문 14~18px

## 히어로 이미지 · 타이포그래피 (2026-09-27)

승인된 전체 화면 구성과 스크롤 전환은 유지하고, 홈 첫 두 이미지만 풀리프의 관람 티켓 이야기로 교체했습니다. `fulif-hero-cinema-v2.png`, `fulif-hero-ticket-v2.png`와 모바일 전용 `fulif-hero-cinema-mobile-v2.png`를 사용합니다. 영문·숫자·폼까지 Pretendard Variable로 통일했으며 폰트는 `public/fonts/pretendard/`에서 로컬 제공됩니다. 생성 프롬프트·파일 경로·전체 점검 결과는 `design/HERO_REFRESH_2026-09-27.md`에 있습니다.

## 전체 페이지 에디토리얼 업그레이드 (2026-09-28)

Toss Impact · Toss Securities · Toss Place · Toss 홈의 구성을 실제 확인하고, 페이지별로 사진·제품·타이포그래피의 비중을 다르게 구성했습니다. 홈 브랜드 소개와 풀리 이야기, FOUND AI 장소 탭, 멤버십 한도 전환, 풀리 노트 검색·읽기 진행선, AD SCALE 소개, 도움말·정책 화면을 포함합니다. 생성 프롬프트와 검증 기록은 `design/EDITORIAL_EDITION_2026-09-28.md`에 있습니다. 변경 전 코드는 `design/archive/pre-edition-2026-09-27.tar.gz`에 보존했습니다.

빌드 후 개발 서버가 켜진 상태에서 `node scripts/check-site.mjs`로 공개 페이지·내부 앵커·이미지를 읽기 전용으로 점검할 수 있습니다.

## 남은 확인 항목 (디자인 코멘트)

1. 스토어 배지: 현재 SVG 로 공식 배지 모양을 그렸음. Google · Apple 공식 배지 이미지를 받으면 `components/StoreBadges.js` 에서 교체.
2. 다운로드 페이지 QR: 스토어 링크 확정 후 추가. 미완성 자리표시 박스는 노출하지 않음.
3. 풀리 노트 연재 1편 본문 · 네이버 블로그 주소.
4. OG 이미지(`public/images/og-image.png`)는 구 사이트(다크) 것 그대로 — 새 톤으로 교체 권장.
5. 기존 약관의 Starter/PRO 명칭 및 일부 무료 한도는 현재 서비스 안내와 달라 별도 정책 확정이 필요합니다. 이번에는 요청받은 연간 구독 관련 내용만 제거했습니다.
