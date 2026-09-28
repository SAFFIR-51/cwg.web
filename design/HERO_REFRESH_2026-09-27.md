# FULIF hero refresh · 2026-09-27

## Scope

Keep the approved full-frame hero, scroll transition, large device accordion, benefit artwork, and all page layouts. Replace the two Toss-like homepage photographs with an original cinema / ticket narrative. Copy and service values stay based on the supplied website PDF, with the user's later instruction to omit annual membership taking precedence.

## Delivered assets

Created with the built-in imagegen tool (imagegen skill), not CLI. All three selected outputs are copied into the project. Original earlier hero files remain available but are no longer referenced by active homepage code.

- Desktop first scene: `/Users/jiyong/Desktop/02_Saffir/CWG/05_웹사이트/cwg.web/public/images/fulif-hero-cinema-v2.png`
- Mobile art-directed first scene: `/Users/jiyong/Desktop/02_Saffir/CWG/05_웹사이트/cwg.web/public/images/fulif-hero-cinema-mobile-v2.png`
- Second scene: `/Users/jiyong/Desktop/02_Saffir/CWG/05_웹사이트/cwg.web/public/images/fulif-hero-ticket-v2.png`

The first two scenes use the existing image crossfade, scale, typography and rounded frame. The closing scene uses the new cinema photograph too. Responsive `picture` sources and media-qualified preloads select the appropriate first-scene asset without downloading both crops.

## Typography

All active HTML text, English/numerical display text, controls and store labels use the same `--font-sans` stack beginning with Pretendard Variable. Removed Inter stylesheet, inline font overrides and CSS shorthands using Inter. Archived unused designs are unchanged.

Pretendard v1.3.9 is served locally at `public/fonts/pretendard/PretendardVariable.woff2`, with its unchanged SIL Open Font License at `public/fonts/pretendard/LICENSE.txt`. Font weight range 45–920, swap rendering, preload; no Google Fonts or external font CDN request required.

Official source: https://github.com/orioncactus/pretendard/tree/v1.3.9

## Verification

- Production build: `npm run build` passed, all 19 generated pages completed; `git diff --check` passed.
- Browser: all 11 top-level pages at 390px; each has one H1, Pretendard applied, no broken loaded images or missing local anchors.
- Main 7 pages at 320, 390, 820 and 1440px: no horizontal document overflow or detected text-width clipping.
- Direct route checks: 17 public pages, including six note detail pages, returned HTTP 200.
- Crawled 547 internal link instances, including cross-page anchors: zero broken targets.
- 30 distinct server-rendered image paths: all returned HTTP 200. New mobile hero separately verified in browser.
- Desktop and mobile hero images visually inspected, including the second scene; original frame and scroll interaction remain intact.
- Mobile menu opens and closes with Escape; navigation labels now match desktop.
- Home accordion, playground mouse and arrow-key selection, service day selector / vote demo, notes category filtering and membership FAQ verified.
- Partner form required input validity inspected without submitting any data or sending email.
- No new browser console errors during the review.

## Content / launch items requiring owner confirmation

- Existing legal terms still use Starter / PRO and state a free losing-number registration limit of two sets, while the current PDF / marketing pages use FULIF / FULIF+ and five sets. The legal source also mentions a 200P number-generation cost. Not rewritten silently; policy confirmation required.
- Note titles / summaries are labelled as examples; final editorial copy and the blog URL remain pending.
- Store links retain the existing configured addresses. App availability, QR destinations and actual partner-email delivery were not externally verified.
- Existing social-share OG artwork is still the older asset; untouched in this two-hero refresh.

## Final prompts

### Desktop cinema hero

```text
Use case: photorealistic-natural
Asset type: full-bleed website campaign hero for FULIF, a Korean everyday coupon and ticket rewards service.
Primary request: An original cinematic lifestyle photograph about the small happiness of going to a movie together. A candid moment of two Korean adult friends in their late twenties, one woman and one man, sitting next to each other in a tasteful modern cinema, smiling naturally at one another just after the movie. No one looks at the camera. No phones.
Scene/backdrop: intimate rows of deep cobalt-blue upholstered cinema seats, softly lit blue auditorium. The people sit at the center of the frame, heads in the upper-middle third, photographed from a few rows ahead, upper bodies clearly visible, relaxed natural poses. One plain unbranded popcorn cup sits in a cupholder, not held in hands.
Style/medium: photorealistic high-end editorial campaign photography, realistic skin and fabric texture, subtle 35mm film grain, beautiful natural soft expressions, no plastic AI faces.
Composition/framing: wide landscape 16:9. Wide environmental portrait, people occupying about the middle 45 percent of the image. Keep the entire bottom quarter calm and darker with softly out-of-focus navy blue seat backs, because large white HTML headline will be overlaid there. The center vertical crop must also work as a mobile hero. Do not place critical details at the extreme edges.
Lighting/mood: luminous soft cool screen light on faces with delicate warm aisle-light accents, blue hour atmosphere, warm ordinary happiness, rich deep blues but not gloomy or neon. Faces properly exposed.
Constraints: image only, no typography, no letters, no watermarks, no logos, no visible film screen content. No bus, no bank cards, no checkmarks, no smartphone, no floating coins, no collage or split screen.
```

### Ticket detail

```text
Use case: photorealistic-natural
Asset type: the second full-screen photographic scene on FULIF's website, a Korean everyday ticket and coupon rewards service.
Primary request: Cinematic detail photograph of a memory that still has another use: two simple used pale-blue cinema ticket stubs resting on a deep cobalt-blue cinema seat after a film, with a single plain paper popcorn cup softly blurred farther behind on the right.
Scene/backdrop: real cinema upholstery, refined navy blue auditorium, soft blue screen glow and a few distant warm aisle-light bokeh points. Tickets are gently overlapping at a natural slight diagonal on the seat cushion. They have tiny understated thin printed rules and a small barcode pattern only, no readable text and no prominent graphic.
Style/medium: photorealistic high-end editorial campaign photography, tactile paper fibres, very subtle crease, realistic velvet texture, delicate film grain, 50mm lens, shallow depth of field. A believable quiet everyday moment, not a studio product render.
Composition/framing: wide landscape 16:9, medium-close environmental detail, ticket pair on the RIGHT half around x=73%, y=40%, clearly identifiable, with enough surrounding seat for context. Keep the LEFT 50% dark navy and softly defocused for large white HTML copy. Keep the LOWER quarter darker and unobtrusive for a mobile text overlay. A portrait crop focused around x=70% must preserve tickets near the upper half.
Lighting/mood: soft directional blue-white screen light catching the paper, dark blue ambient shadows, subtle warm bokeh, calm and quietly optimistic. Visually coherent with a blue-seat cinema lifestyle hero.
Constraints: image only, no typography overlay, no legible words or numbers, no branding, no watermark. No people or hands, no phone, no checkmarks, no money, no floating shapes, no envelope, no paper pocket, no split screen.
```

### Mobile art-direction variant

Edit target: generated desktop cinema image.

```text
Use case: identity-preserve
Asset type: responsive mobile portrait version of an existing FULIF website hero.
Input image: the original blue cinema lifestyle hero is the edit target.
Primary request: Recompose this exact cinema photograph into a vertical 9:16 portrait website background. Keep these same two Korean adult friends, their faces, clothing, relaxed smiles and eye contact, and the same realistic blue cinema environment and lighting. Preserve the story and photographic quality.
Composition: move the camera viewpoint slightly farther back and compose the friends close together as a compact pair, with both entire heads and shoulders safely inside the central 75% of the image width, faces around 30% from top. Their bodies are in the upper and middle part of the portrait. Extend the soft out-of-focus navy cinema seat backs through the bottom 30% as a natural darker quiet foreground for large white HTML text. No visible screen content. No changes to the subjects' identity.
Constraints: photorealistic, no text, no branding, no watermark, no phones, no checkmarks, no floating UI, no split screen, no letterboxing. Portrait 9:16.
```
