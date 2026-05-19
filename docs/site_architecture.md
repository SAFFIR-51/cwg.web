# CWG ReturnValue — Landing Site Architecture

> 다크 글래스모피즘 디자인 시스템 위에 CWG ReturnValue 콘텐츠를 얹은 B2B 광고/스폰서십 전환 사이트.
>
> 1차 KPI: **파트너 신청 폼 제출** (광고 파트너 / 스폰서십 파트너)

---

## 1. 사이트 맵 (5 페이지)

```
index.html        ← 홈 (B2B 가치 제안 + 앱 가치)
service.html      ← 서비스 (앱 기능·등급·가치환원 구조 상세)
patents.html      ← 특허 (4대 핵심 기술 / 신뢰성)
download.html     ← 다운로드 (앱 설치 / 기능 소개 / FAQ)
partners.html     ← 파트너 문의 ★ 1차 전환 페이지 (4 광고 슬롯 + 폼)
```

모든 페이지에서 헤더 우측 **[파트너 문의 →]** CTA로 `partners.html`에 도달 가능.

---

## 2. 공통 헤더

```
[CWG 로고]    홈   서비스   특허   다운로드     [KOR/ENG]   [파트너 문의 →]
                                                          ↑
                                              항상 시각적 무게중심
                                              (블루 fill pill)
```

- 4개 네비 메뉴 + 언어 토글 + **파트너 문의 CTA 버튼** (항상 노출)
- 스크롤 시 헤더 BG: 투명 → 다크 + backdrop blur
- 현재 페이지의 nav 항목은 `.is-active` 클래스로 강조

---

## 3. 페이지별 구조 & 전환 동선

### 3.1 `index.html` — 홈

| # | 섹션 | 목적 |
|---|---|---|
| Hero | "당신의 광고를, 고관여 로또 사용자에게" + 듀얼 CTA (파트너 신청 / 앱 다운로드) | B2B 1차 CTA를 즉시 노출 |
| About | 가치환원 구조 한 줄 설명 (좌→우 흰색 채움) | 회사가 무엇을 하는지 빠르게 |
| 4 Patents 다이어그램 | 4 노드 자동 회전 + 우측 텍스트 페어링 (특허 기반 차별성) | 신뢰성 |
| Ad/Sponsor Formats | 3 카드: 보상형 / 배너·네이티브 / 챔피언십 스폰서십 | B2B 가치제안 |
| Why CWG | 카운트업 4종 (4개국 / 4종 로또 / 4건 특허 / 4x 적립) | 수치로 증명 |
| Audience Value | "왜 로또 사용자에게?" 4가지 (가치제안 리스트) | B2B 추가 설득 |
| Supported Lotteries | 양방향 무한 롤링 (국가/로또 로고) | 글로벌 도달 |
| Quick Access | 서비스 / 특허 / 다운로드 3 카드 | 보조 페이지 진입 |

**전환 동선**: Hero → 파트너 신청 (즉시) / 4 Patents → 특허 페이지 / Quick Access → 각 페이지

---

### 3.2 `service.html` — 서비스

| # | 섹션 | 콘텐츠 |
|---|---|---|
| Sub Visual | "Service" 빅 타이틀 + 브레드크럼 | — |
| Intro | CWG 워드마크 + 가치환원 한 줄 | — |
| 등급 비교 (4컬럼) | FREE / STANDARD / PRO / **B2B PARTNER** 카드 | B2B Partner 카드를 4번째 컬럼으로 노출 → 자연스러운 흐름 |
| Patent-Backed Intro | "출원된 특허 4종 기반" head | 신뢰성 |
| Core Features (3) | Scan & Reward / CWG Pick / Championship | 핵심 기능 |
| SCROLL DOWN Marquee | "B2B · For Advertisers & Sponsors" | 분위기 전환 |
| Why CWG (Before/After) | 일반 로또 앱 vs CWG ReturnValue 비교 | 차별성 |
| Unified Lottery Platform | 4개국 로또 통합 (중앙 모니터 + 미니 4종 부유) | 글로벌 |
| Data Loop | 가치 순환 구조 시각화 + 3 sub-feature | 알고리즘 신뢰 |
| Pick Generation | 매주 자동 생성 + 챔피언십 20필터 + 3 sub-feature | 기능 디테일 |
| Global Scalability | Phase 01/02/03 로드맵 | 미래성 |
| Supported Lotteries (4) | 동행 6/45 / ロト6 / EuroMillions / Eurojackpot | 현재 지원 |
| CTA | "고관여 로또 사용자에게 광고를" + 파트너 문의 버튼 | 1차 전환 |

---

### 3.3 `patents.html` — 특허

| # | 섹션 | 콘텐츠 |
|---|---|---|
| Hero | "4대 핵심 특허 기술" | — |
| Counts | 출원 4건 / 4개국 / 100% 자체개발 | 수치 신뢰 |
| 4 Patent Cards (2×2) | 01 데이터 획득 / 02 위변조 검증 / 03 가치환원 가중치 / 04 글로벌 정책 엔진 | 각 카드: 큰 번호 + 영문 라벨 + 본문 + 체크 불릿 3개 |
| Trust Note | 왜 특허 기반이 중요한가 (차별성/신뢰성/확장성 3 카드) | 설득 마무리 |
| CTA | "기술 기반 신뢰할 수 있는 파트너" + 파트너 문의 | 전환 |

> 보안: 청구항 원문·도면 번호·세부 알고리즘은 비공개. 명칭과 한 줄 설명만 노출.

---

### 3.4 `download.html` — 다운로드

| # | 섹션 | 콘텐츠 |
|---|---|---|
| Hero | 좌: 앱 카피 + 스토어 배지 + QR / 우: 폰 목업 | 다운로드 유도 |
| 3 Core Features | 01 스캔 / 02 픽생성 / 03 챔피언십 | 기능 빠른 이해 |
| Numbers | 4개국 / 4 로또 / 4 특허 / 3 등급 | 신뢰 |
| FAQ (5 질문) | 무료? / 지원 국가? / 포인트 사용? / iOS 출시? / 광고주 문의? | 진입장벽 제거 |
| B2B CTA | "광고주이신가요?" + 파트너 문의 | 다운로드 페이지 방문자 중 광고주 흡수 |

---

### 3.5 `partners.html` — ★ 핵심 전환 페이지

| # | 섹션 | 콘텐츠 |
|---|---|---|
| Hero | "고관여 사용자에게 브랜드를" 빅 타이틀 + 배경 글로우 | — |
| 4 Slot Cards | 01 보상형 / 02 배너 / 03 네이티브 / **04 스폰서십** (피처) | 각 카드 하단 "이 슬롯으로 문의 →" 버튼 → 폼으로 스크롤 + 체크박스 자동 체크 |
| Inquiry Form | 회사명 / 담당자 / 이메일 / 연락처 / 관심 광고 유형(5개 체크박스) / 캠페인 규모 / 문의 내용 / 개인정보 동의 | 좌측 70% |
| Form Aside | 처리 프로세스 5단계 / 직접 연락 / B2B 데이터 라이선스 | 우측 30% |

**JS 인터랙션**: 슬롯 카드의 "이 슬롯으로 문의" 버튼 클릭 → 폼 영역으로 smooth scroll + 해당 관심 유형 체크박스 자동 prefill.

---

## 4. 디자인 시스템 (변경 없음)

홈의 PINTEL 클론 작업에서 만든 디자인 토큰을 그대로 사용합니다.

```css
--main-color:   #2766F8   /* 메인 블루 */
--main-color2:  #1751D9   /* 진한 블루 */
--main-color3:  #4A82FF   /* 밝은 액센트 블루 */
--bg-base:      #060910   /* 다크 베이스 */
--glass-bg:     rgba(255,255,255,0.04)
--font-en:      'Jost'     /* 영문/숫자 */
--font-kr:      'SUIT'     /* 한글 본문 */
```

| 요소 | 스타일 |
|---|---|
| 카드 | radius 2~3rem, glass bg + backdrop blur + 1px border |
| 메인 CTA | pill 형태, 블루 fill, hover 시 lighter blue + lift |
| 섹션 라벨 (영문) | Jost 1.8rem, 메인 블루3, weight 600 |
| 섹션 타이틀 (한글) | 4~5rem, weight 700, letter-spacing -0.04em |
| 본문 | 1.4~1.55rem, opacity 0.65~0.7 |

---

## 5. 인터랙션 시스템

`js/main.js` 하나로 모든 페이지 동작.

| 트리거 | 효과 | 적용 위치 |
|---|---|---|
| `data-scroll` | fade-up 진입 | 모든 섹션 head |
| `data-fill` | 회색→흰색 좌→우 채움 | 주요 타이틀 |
| `data-stagger-group` + `data-stagger` | 카드 stagger reveal (0.12s 간격) | 모든 카드 리스트 |
| `data-count` | 0 → 타깃값 카운트업 | KPI / 특허 수 |
| `.hero-slide` | 자동 슬라이드 6.5s | 홈 Hero |
| `.ai-nodes .node` | 시계방향 자동 회전 3.5s | 홈 4 Patents 다이어그램 |
| `.cube-scene` | 스크롤 파라랙스 + 회전 | 홈 AI/Prevax 배경 |
| `.cursor-glow` | 마우스 lerp 따라옴 | 전 페이지 |
| `.btn-pill` 등 | magnetic hover | 모든 버튼 |
| `.faq-item` | 클릭 시 아코디언 열림 | 다운로드 페이지 |
| 슬롯 카드 CTA | 폼으로 scroll + 체크박스 prefill | 파트너 페이지 |

**중요**: 홈 전용 요소 (`.hero-slide`, `.ai-nodes`, `#rollTop` 등)는 다른 페이지에서 JS 가드로 안전하게 스킵 처리됨.

---

## 6. 파일 구조

```
14. cwg_landing_page/
├── index.html              ← 홈
├── service.html            ← 서비스
├── patents.html            ← 특허
├── download.html           ← 다운로드
├── partners.html           ← 파트너 문의 (전환)
├── site_architecture.md    ← 이 문서
├── css/
│   ├── style.css           ← 공유 디자인 시스템 + 홈 스타일
│   ├── service.css         ← 서비스 페이지 전용
│   ├── patents.css         ← 특허 페이지 전용
│   ├── download.css        ← 다운로드 페이지 전용
│   └── partners.css        ← 파트너 페이지 전용
├── js/
│   └── main.js             ← 공유 인터랙션
└── assets/
    ├── images/             ← 공통 (로고, 메인 비주얼)
    ├── partners/           ← 파트너 로고 30개 (홈 롤링)
    └── prevax/             ← 서비스 페이지 전용 이미지
```

---

## 7. 전환 동선 분석 (3가지 경로)

```
[A] 즉시 전환 (가장 빠른 경로)
    어디서든 헤더 [파트너 문의 →] 클릭
    → partners.html → 슬롯 카드 선택 → 폼 prefill → 제출

[B] 정보 탐색 후 전환
    홈 Hero → 광고 슬롯 섹션 → "파트너 신청" 인라인 CTA
    → partners.html → 폼 → 제출

[C] 신뢰도 확인 후 전환
    홈 → 특허 페이지 (4건 카드 검토)
    → patents.html 하단 CTA "기술 기반 파트너 → 문의"
    → partners.html → 폼 → 제출

[보조] 광고주가 다운로드 페이지에 잘못 들어온 경우
    download.html 하단 "광고주이신가요?" → partners.html
```

---

## 8. 콘텐츠 운영 가이드

### 8.1 자주 바꿀 영역 (콘텐츠 매니저 친화)

| 위치 | 어디 |
|---|---|
| 홈 Hero 카피 | `index.html` `.hero-title` / `.hero-sub` |
| 홈 KPI 숫자 | `index.html` `[data-count="N"]` |
| 특허 카드 본문 | `patents.html` `.patent-desc` / `.patent-points` |
| 가격 변경 (등급) | `service.html` `.vc-badge` (₩5,000 / ₩8,000) |
| FAQ 추가/수정 | `download.html` `.faq-item` 블록 추가 |
| 파트너 폼 필드 | `partners.html` `.partners-form` |

### 8.2 추후 추가 권장

- [ ] 폼 제출 백엔드 연동 (Formspree, Resend, Supabase, 자체 API 중 택)
- [ ] GA4 / Plausible 이벤트 트래킹 (`partner_cta_click`, `partner_form_submit` 등)
- [ ] 영어/일본어 i18n (현재 한국어 단일)
- [ ] 실제 앱 스크린샷·로고로 placeholder 이미지 교체
- [ ] iOS 사전등록 별도 폼
- [ ] 카카오톡 채널/오픈채팅 등 직접 채널 연결

---

## 9. KPI 측정 권장 이벤트

| 이벤트명 | 트리거 |
|---|---|
| `partner_cta_click` | 헤더 CTA / 슬롯 카드 CTA / Hero CTA 등 어떤 위치든 클릭 시 (위치 라벨 필수) |
| `partner_form_start` | 폼 첫 입력 발생 |
| `partner_form_submit` | 폼 제출 성공 |
| `slot_card_click` | 4개 슬롯 카드 중 어느 하나 (어떤 슬롯인지 라벨) |
| `download_android` | Android 스토어 배지 클릭 |
| `download_ios_preregister` | iOS 사전등록 클릭 |
| `patent_card_view` | 특허 카드 50% 노출 |
| `faq_open` | FAQ 항목 펼침 (질문 라벨) |
| `lang_switch` | 언어 전환 |

→ 측정 도구: Plausible (개인정보 부담 적음) 또는 GA4.

---

## 10. 빌드 / 호스팅

현재는 정적 HTML/CSS/JS — 별도 빌드 도구 없이 **그대로 호스팅 가능**.

| 옵션 | 비고 |
|---|---|
| Vercel | `vercel deploy` 한 번으로 즉시 배포 |
| Netlify | 폴더 드래그&드롭 가능 |
| GitHub Pages | 무료, 커스텀 도메인 가능 |
| Cloudflare Pages | CDN 빠름 |

**현재 외부 의존**:
- Google Fonts (Jost)
- jsdelivr CDN (SUIT 한글 폰트)
- 자체 호스팅 폰트로 교체 시 로드 속도 더 빨라짐.
