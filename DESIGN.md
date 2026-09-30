# FULIF web · design and verification history

## Latest: app-screen-centric redesign, Toss-pattern removal — 2026-09-30

Request on file: `cwg 웹 수정 전달.md` (2026-09-29) — ① 토스와 비슷한 구성 없애기, 특히 홈 ② 디자인 전반 개선. Follow-up answers: judge the Toss resemblance ourselves, new direction is app-screen-centric, copy may change while service facts stay, all pages at once.

Removed (verified against toss.im side by side): rounded full-viewport lifestyle-photo hero with the three-part bottom headline, fixed left chapter tick rail, scroll-pinned crossfade intro, oversized centered typographic interludes, sticky-phone `ScrollStory` chapters (six instances), full-bleed life-photo sections and photographic closing, the giant 100P numeral panel, gray pill + dark arrow-circle buttons, navy footer with the oversized wordmark, Toss color tokens (`#3182F6 #191f28 #333d4b #f2f4f6 #8b95a1`) and navy scene sections (`#172b4f #152642`), Toss-Securities-style oversized stat rows, `ReadingProgress`.

New system: every section is carried by real app screens (`Phone` mockups). Tokens derive from the F symbol gradient (`#63D5FF → #0786F6 → #064CCE`) with ink `#182638`, white and soft-blue surfaces, clover green for small accents. Type is left-aligned: h1 40–62px, h2 30–42px, body 16–17px. Motion is the `.reveal` fade only. Ten stateless primitives in `components/blocks.js` (`PageHero`, `PhoneStack`, `ScreenCard`, `SplitFeature`, `FeatureGrid`, `PricingCard`, `CompareBars`, `StepTimeline`, `FactList`, `CtaBand`) compose the home (`components/home/*`) and every subpage. CSS went from ten global files to four (`globals`, `blocks`, `home`, `pages`). Deleted: `HomeStory`, `BenefitSections`, `ScrollStory`, `FoundNeighborhood`, `LocalDiscovery`, `visuals`, `PageScenes`, `Edition`, `SubpageDesign` and their stylesheets. `PulliNote`/`SectionNav` moved into `ui.js`; `Art`/`NoteCover` into `Art.js`; `VotePreview` into its own file.

Kept verbatim: open date, age 19+, point values (10P ticket/coupon, 30P vote, 100P signup and referral, 1P per ad second, 30P donation), registration window (Sat 21:00–Tue 20:00), draw times (Tue 20:30 / last Tue 21:00), equal-odds and no-cash-points rules, FULIF+ limits (20 vs 5 sets, 10 vs 2 provided sets, 20 vs 10 ads, 첫 달 0원 → 월 5,000원), AD SCALE 10/8/1/1, all cross-page anchors, the partner inquiry form and `/api/contact`.

Verification: `npm run build` 19 pages; `check-site.mjs` 17 pages, 562 internal links, 30 images, one h1 per page; new `check-pages.mjs` 31 required section ids across 8 pages, no removed pattern in HTML, no forbidden color token in `styles/`, exactly four stylesheets. Browser review at 1478px and in a 390px frame for home, Full Life, FOUND AI, membership, partners, download, notes. Old Toss-derived assets under `public/images` are unused but retained pending a separate deletion decision; `og-image.png` still needs a new light version.

## Earlier: restore the approved Toss-format visual direction — 2026-09-27

The user clarified that the previous Toss-format layouts and styling must be retained, and content must follow the provided PDF. The paper-pocket redesign below was rejected. Its component source is archived at `design/archive/HomeStory-paper-pocket.txt`; the six generated images and prompt record are retained but unused. `fulif-own.css` is no longer imported.

Restored the original full-frame lifestyle images and scroll crossfade, angled real-app device with four-item accordion, chapter rail, existing `RewardGallery`, `PointsScene` and `Playground` components, monthly membership pass, donation/partner cards and photographic closing. Existing `story.css`/`benefits.css` determine the visual format. `story-restoration.css` contains small scoped integration fixes only. Other detail-page designs remain intact. FOUND uses its prior blue centered heading and neighborhood illustration, with a real app screenshot replacing the objectionable floating location badge and synthetic hero offer card. Its three example cards and cautions remain explicitly labeled PDF examples.

Re-read all extracted text from the supplied 62-page PDF and visually inspected its homepage. Restored PDF-led home/FOUND copy and checked 10P registration/completion, five registrations per entry, 30P vote/donation, 100P signup/referral, one point per ad second, 5/20 registration limits, 2/10 provided-number limits, 10/20 daily ad limits, drawing times, privacy and equal-entry-odds principles. Monthly-only membership follows the user's explicit correction over the PDF's obsolete annual-plan section.

Restoration verification: production build passed with all 19 pages. Eight page routes and five key photo/app-screen assets returned HTTP 200; all 24 home/FOUND anchor links resolved. No rejected paper-pocket references or annual pricing appear in these pages. Verified hero crossfade, angled service device and manual accordion selection, playground category switching, and no home text/document overflow at 320px. Development output now uses `.next-dev`, separately from `.next` production output, to prevent mixed-chunk cache errors when switching build modes.

## Rejected exploration: FULIF paper-pocket identity — 2026-09-27

The user asked to move beyond the earlier Toss-derived homepage and remove the artificial-looking FOUND teaser. This revision supersedes the homepage and FOUND descriptions below; the other independently designed product pages are retained.

The visual idea is **an everyday paper pocket, and one more use for each ticket**. A split still-life opening, perforated membership ticket, receipt-like calculator and quieter editorial closing replace the viewport-filling bus photo, scroll-pinned phone scene, repeated floating cards and old 3D-led homepage. New assets have tactile paper, natural daylight, cobalt blue, white and a restrained clover-green accent. The existing brand symbol, mascot identity, service rules and monthly-only membership remain intact.

- Homepage: three selectable coupon/ticket/number stories with local resettable demos; five-registration stamp strip; shared neighborhood discovery tabs; five-activity points calculator; real nine-button memory mini game; monthly membership, donation and notes chapters; direct service and store paths.
- Calculator: defaults to the one-time 100P joining activity; all five choices total 200P and none total 0P. Mobile has a sticky live total. Values are activity examples, not an earnings guarantee or real credited points.
- Memory demo: five-second reveal, optional ten-second extension, manual readiness, three-choice limit, answer checking, success/failure and three rotating patterns. Timers clean up on phase changes/unmount. Revealed target numbers have accessible text labels; no actual points or prediction claims.
- FOUND: original neighborhood photo and flat category tabs replace the miniature map and floating location/offer badges. No fictional prices, coffee offers or stale sample dates. A real app screenshot, practical visiting checklist and paper-pocket close retain the actual service explanation.
- Keyboard: roving tab focus, arrow/Home/End controls, semantic tab panels and visible focus rings. Category orientation follows the responsive layout. Reduced-motion settings disable decorative animation. No upload, registration, geolocation request, ad playback, contact submission or real reward transaction is added.

Code: `components/HomeStory.js`, `components/LocalDiscovery.js`, `styles/fulif-own.css`, `pages/found-ai.js`. The six original assets are in `public/images/fulif-own/`, generated using the imagegen skill and built-in image generation. All final prompts, original output locations and project paths are in `design/FULIF_OWN_ART_PROMPTS.md`. Images are delivered with responsive Next/Image optimization; original PNGs and prior revisions are retained.

Browser checks completed: desktop and mobile openings, intermediate chapters and closing; coupon/ticket/number actions/reset, keyboard tabs, calculator 100→200→0 and mobile 130P, timer transition, three-selection cap, correct answer, new-pattern replay, incorrect answer, time extension, category navigation and mobile-menu routing. Web demos are clearly distinguished from actual app activity.

## Earlier: individual detail-page design — 2026-09-27

The user rejected the repeated shared-hero composition and confirmed there is no annual membership. This revision supersedes the product-page rollout below. The homepage design is retained; only its annual-plan claims are removed.

Actual detail pages inspected in the browser: [Toss Securities](https://toss.im/service/securities), [Toss Pay](https://toss.im/service/tosspay), [Toss business advertising](https://toss.im/business/advertising) and [Toss Feed](https://toss.im/tossfeed). References informed photographic lead-ins, asymmetric business storytelling, large product stages and editorial reading paths. No Toss copy, claims or brand assets are reused.

| Route | Independent visual narrative |
| --- | --- |
| `/full-life` | Split editorial heading above a panoramic original cafe photo; live HTML coupon notification, new coupon wallet composition, alternating registration scene and selectable vote demo |
| `/found-ai` | Centered neighborhood promise, original miniature town, working convenience-store/market/gas category preview, privacy-led explanation and real app walkthrough |
| `/membership` | Full-width blue membership campaign, original translucent pass, benefit quantities, exclusive-feature scenes and one monthly plan at 5,000 won |
| `/notes` | Magazine masthead, photographic/3D still-life series cover, three reading shortcuts, category-filtered library and updated article covers |
| `/partners` | Asymmetric campaign headline and human brand moment, illustrated brand-to-member journey, horizontal partnership commitments, preserved inquiry form |
| `/download` | Centered brand and store conversion area above a fan of three actual app screens, followed by illustrated onboarding rows |

Code: `components/PageScenes.js`, `styles/page-scenes.css`, six route files and the article-cover helper. Seven new original images are in `public/images/editorial/`; final prompts and method are recorded in `design/DISTINCT_PAGE_ART_PROMPTS.md`. The pass and gift preserve true PNG alpha; all images use Next/Image responsive optimization.

Annual-plan copy removed from homepage, service comparison, membership pricing/SEO/trial explanation and the annual subscription clauses of `content/legal/terms.html`. Monthly price, first-month trial, advance notice, renewal, cancellation and equal per-entry odds are retained. The source legal document has pre-existing Starter/PRO naming and limit discrepancies; these unrelated policies were not silently rewritten. The annual championship/event cadence is not an annual subscription and remains intact.

Browser QA: visually inspected all six desktop and 390px mobile openings, plus tablet membership/price panels. All six routes have one H1, no annual pricing copy, and no horizontal document overflow at 320px and 820px. Heading/body/button/table text checked for overflow at 320px. Tested neighborhood category selection, vote preview selection, note filtering and native contact required validation without transmitting an inquiry. Console had no current errors. Store transactions and SMTP delivery were not tested.

Build: `npm run build` passed and generated all 19 pages. The development server was stopped for the production build and then restarted at port 3000.

Post-restart smoke test: home, all six product routes, terms and a note detail returned HTTP 200 with no annual-plan price or subscription copy. All seven new PNG asset URLs returned HTTP 200. Temporary responsive viewport overrides were reset after verification.

## Earlier Toss-inspired direction — superseded for homepage and FOUND

The user rejected the first generic fintech draft. The homepage now follows the **actual current toss.im homepage** inspected at desktop 1440×960 and mobile 390×844, rather than an abstract fintech mood.

Reference-to-FULIF mapping:

| Toss element | FULIF implementation |
| --- | --- |
| 64px white header, centered navigation, gray download pill | Shared Header; 56px mobile header and full-height menu |
| Full-viewport rounded lifestyle film, three-part bottom headline | Original bus photograph, three-part FULIF headline, 16px gutter / 40px radius |
| Scroll-pinned close-up transfer scene | Crossfade to original phone close-up, gradual frame scaling |
| Fixed small chapter ticks | Nine in-page anchors with current-section state |
| Angled phone beside line accordion | Four FULIF screens, clickable accordion, scroll-driven switching on desktop |
| Oversized white typographic interlude | Original FULIF promise, 76px maximum type |
| Large blue-and-white product objects | Three rounded coupon / ticket / number cards with original generated 3D artwork |
| Full-bleed life scenes and product detail | Original café photograph and FOUND AI explanation |
| Closing atmosphere and oversized footer wordmark | Blurred photographic closing CTA and blue-gray footer |

Implementation: `components/HomeStory.js`, `components/BenefitSections.js`, `styles/story.css`, `styles/benefits.css`, and shared `Header.js` / `Footer.js`. `pages/index.js` exports the homepage component. Detailed service, membership and legal information remains available in the existing subpages.

All commercial terms and reward rules are derived from existing FULIF copy and the source PDF. No Toss product claims, logos, photography or video files are reused. The current hero is **original still photography with scroll motion**, not video footage.

Original production assets: `public/images/life-hero.png`, `public/images/reward-moment.png`, `public/images/cafe-life.png`. Built-in image generation; exact prompts recorded in `design/IMAGE_PROMPTS.md`.

### Benefits and playground refinement

The user requested original Toss-like icons and a further redesign of rewards, points and playground. Ten new transparent 3D illustrations are in `public/images/benefits/`: coupon, ticket, number, points, vote, invite, watch, donate, memory and score. Prompts and the image-generation method are documented in `design/BENEFIT_ART_PROMPTS.md`.

- Rewards: three spacious object-led cards, descriptive copy and small HTML reward badges; all original eligibility constraints retained.
- Points: a large 100P welcome panel with coins, followed by four activity-specific illustrated cards.
- Playground: one stable-size feature stage controlled by three accessible tabs, with original 3D art and keyboard arrow/Home/End navigation. This replaces the small memory demo and stacked link cards.
- Utility icons now use local inline SVG paths from `components/Icon.js`; the Material Symbols stylesheet dependency was removed, so icon names cannot leak into rendered text when a remote font fails.
- All artwork is decorative alongside equivalent live text. Next Image provides responsive/lazy-loaded production assets. Reduced-motion settings disable decorative transforms and transition animations.

Refinement verification: `npm run build` passed with all 19 pages. Homepage, Full Life, FOUND AI, membership, download and support returned HTTP 200; all ten new image URLs returned HTTP 200; homepage cross-page anchors resolved. All rendered utility SVG names across these routes have a local mapping. Browser checks covered 1440px desktop and 390px/320px mobile, card artwork, all three playground tabs, keyboard selection, mobile menu navigation and absence of horizontal text overflow at 320px. A stale pre-refactor dev page produced a hydration mismatch once; refreshing to the current server output resolved it, and no new error recurred after the build and restart.

Motion: passive scroll listeners scheduled with requestAnimationFrame; cleanup on unmount; reduced-motion mode disables phone pinning/automatic switching, smooth scrolling and decorative transforms. Mobile uses standard-flow content and manually selected service screens. All service panels have keyboard-operable buttons and expanded/controlled relationships.

Previous revision checks: production build generated all 19 pages successfully; ten primary routes returned HTTP 200; every homepage cross-page hash target resolved. Visually checked 1440px desktop, 390px mobile and 320px narrow mobile; no horizontal page overflow or overflowing heading/body text at 320px. Checked menu open/close, service selection and scroll-driven screen switching. Generated images loaded successfully. The dev indicator is hidden for the local design preview.

## Earlier product-page rollout — superseded

The homepage direction now extends to all six requested navigation destinations, plus the note article template. Shared composition and art helpers are in `components/SubpageDesign.js`; route-local styling is in `styles/subpages.css` under `.product-page`, leaving the homepage unchanged.

| Page | Revised composition |
| --- | --- |
| Full Life | Large app-screen hero, 3D-object time-of-day switcher, alternating real app screens, illustrated playground, points and comparison sections |
| FOUND AI | Original miniature-neighborhood hero with the existing mascot, three trust promises, real app-screen walkthrough, dated example cards and FAQs |
| Membership | Original blue plus sculpture, three quantitative benefit panels, monthly/annual plans, comparison, trial timeline, cancellation and FAQs |
| Notes | Editorial title, featured series, category filters, article-specific 3D covers, mascot introduction; article detail covers and reading typography |
| Partners | Original background retained per source design comment, new headline hierarchy, illustrated partnership cards, two-column contact section and grouped fields |
| Download | Real app-screen hero, original ticket object, existing store URLs and three illustrated onboarding steps |

Three additional original transparent images — neighborhood, plus and notebook — are saved in `public/images/subpages/`. Built-in image generation was used; prompts are recorded in `design/SUBPAGE_ART_PROMPTS.md`. The ten previously generated benefit illustrations are reused for visual consistency. Real app screenshots and mascot identity are preserved.

Content guardrails remain unchanged: opening date/minimum age, points, eligibility, membership pricing, auto-renewal/cancellation, equal per-entry odds and number-feature disclaimers. Editorial placeholder notices remain visible. Contact API integration, privacy notice and consent remain intact; native required/email validation now runs before the existing submit logic. No real contact submission was made. External store transactions and email delivery were not tested.

QA: all six main routes plus home and a note-detail route returned HTTP 200. All 48 referenced image asset requests succeeded; cross-page hash targets resolved. Visually inspected desktop 1440px and mobile 390px; all six pages had no horizontal page or text overflow at 320px and 820px. Checked the daily timeline, note category filtering, series-to-detail navigation, membership FAQ and contact required-field validation. Production build generates all 19 pages successfully.

## First draft archive (superseded homepage and product pages)

2026-09-27. Source of truth for service content: the existing website and `fulif_io_웹사이트 전체디자인(v.2).pdf` (62 pages, 2026-09-24).

## Direction

An airy Korean fintech website with confident typography, cobalt blue, white and quiet blue-gray surfaces. Product details remain legible and practical; promotional artwork is separate from actual app screenshots.

References reviewed: [Toss](https://toss.im/), [SOCAR services](https://www.socar.kr/service), [Kbank](https://www.kbanknow.com/web/web-home/home/main), [Revolut](https://www.revolut.com/). Used for visual research into headline scale, generous spacing, product imagery, content hierarchy and restrained navigation. No third-party brand images or copy were incorporated.

## System

- Primary blue `#246BFE`, ink `#182638`, page `#F7F9FC`, soft blue `#ECF3FF`.
- Pretendard for Korean; Inter for numerals and English.
- 1,280px container; 24px mobile / 40px desktop side padding.
- Responsive display type 39–78px, section type 32–50px, text 14–18px.
- 28–36px feature surfaces; 14px action buttons. Shadows are reserved for floating objects and device frames.
- Keyboard focus, reduced-motion support, semantic native FAQs, a keyboard-operable feature tab set, active section navigation and a fully hidden closed mobile menu.

## Page work

- Home: original blue 3D hero, three linked ONE MORE cards, interactive four-feature explorer, FOUND visualization, blue membership and partnership sections, expanded brand footer.
- Full Life: app-stage hero, sticky section navigation, interactive day timeline, alternating feature compositions, preserved reward rules and comparison table.
- FOUND AI: mascot and local-benefit visualization; promises, examples, dates and FAQ remain grounded in the source.
- Membership: responsive visual membership card, differentiated pricing, comparison and cancellation details. CTA leads to the download page so both store choices are available.
- Notes: editorial hero, category filtering, series treatment, illustrated article covers. Existing example-content notices remain.
- Partners: original background retained as requested by the PDF, new headline hierarchy and two-column inquiry layout; existing contact handler retained.
- Download: clear store choices and app hero. The nonfunctional QR placeholder is hidden until the store/QR destination is confirmed, matching the PDF's deferral.

## Content guardrails

Opening date `2026.10.12`; minimum age 19. Existing point values, membership prices, registration limits, draw times, the equal value of each entry, no cash conversion and the two-year points validity have been preserved. No user counts, reviews, financial performance claims or fictional partners were added. The timeline times are illustrative and retain the example disclaimer.

## Generated asset

- Method: built-in image generation (imagegen skill), not the API/CLI fallback.
- Production file: `public/images/one-more-sculpture.png`.
- Original output retained at `/Users/jiyong/.codex/generated_images/01a0e24f-297a-7591-953f-03aeb223361c/exec-0c416c71-eef3-49af-88e7-7d57b97484c1.png`.
- Existing mascot, 3D feature icons and app screenshots reused without altering their identity.

Final generation prompt:

> Use case: stylized-concept. Asset type: premium fintech website hero artwork for FULIF, a coupon, ticket and daily rewards platform. Primary request: an exquisitely art-directed 3D still life, a large sculptural cobalt blue ticket with smooth rounded corners and side notches, embossed percent symbol, floating in a balanced arrangement with a smaller frosted translucent ice-blue ticket behind it and two pearl-white reward coins, one embossed with a subtle plus. A polished blue glass loop arcs behind the tickets, evoking one more opportunity. Scene: seamless very pale icy blue studio background (#edf4ff), soft grounded shadows, no horizon. Style: premium Korean fintech campaign, sophisticated tactile product render, restrained playful minimalism, high-end Octane-like materials, soft ceramic and optical glass, not cartoon clip art. Composition: square image, centered entire sculpture with 15% breathing room around all edges, three-quarter perspective, lower right has space for a small website overlay, objects fill 75% of frame. Lighting: bright diffused daylight, soft realistic ambient occlusion, crisp elegant specular edges, airy positive mood. Palette: vivid cobalt #2563eb, ice blue, pearl white, hint of silver; no purple or warm colors. Constraints: no words, no UI, no phone, no logos, no watermarks, no extra objects, no border. This is a production website asset.

## Verification

Production build succeeds (19 generated pages). Browser checks cover desktop 1440px, mobile 390px and narrow mobile 320px, primary routes, home tab switching, day timeline switching, mobile menu navigation, note filtering, native FAQ expansion and inquiry required-field validation. No inquiry message was sent. SMTP delivery and external store availability were not changed or tested as transactions.
