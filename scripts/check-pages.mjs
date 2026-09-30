// Read-only regression checks for the app-centric redesign.
// Run against a production server: SITE_CHECK_ORIGIN=http://127.0.0.1:3107 node scripts/check-pages.mjs
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';

const origin = process.env.SITE_CHECK_ORIGIN || 'http://127.0.0.1:3000';

// 페이지별로 반드시 존재해야 하는 섹션 id (다른 페이지에서 앵커로 참조하거나 SectionNav가 가리키는 것)
const REQUIRED = {
  '/': ['steps', 'app', 'found', 'points', 'play', 'plus', 'promise', 'together', 'download'],
  '/full-life': ['a-fuli-day', 'one-more', 'lotto-one-more', 'vote', 'draw', 'found', 'playground', 'points', 'compare'],
  '/found-ai': ['neighborhood', 'found-promises', 'how-it-works', 'places', 'found-questions'],
  '/membership': ['member-benefits', 'plans', 'trial', 'member-questions'],
  '/partners': ['ad-scale', 'partnership', 'inquiry'],
  '/download': [],
  '/support': [],
  '/notes': ['notes'],
};

// 제거한 토스형 패턴과 더 이상 쓰지 않는 사진이 다시 들어오지 않도록 막는다.
const FORBIDDEN_HTML = /data-scroll-story|chapter-rail|intro-scroll|story-statement|story-pill|life-scene|start-story|footer-scene-word|member-exclusive|partner-scale-stats|role="tab"|hero-neighborhood\.png|everyday-still-life\.png|found-neighborhood\.png|partner-counter\.png|member-pass\.png|partner-gift\.png|fulif-hero-cinema|cafe-life\.png|service-day\.png|partner-moment\.png|found-street\.png/;
// 토스 디자인 토큰과 이전 남색 배경이 CSS에 남아 있지 않은지 (소스 파일 기준)
const FORBIDDEN_CSS = /#3182f6|#191f28|#333d4b|#f2f4f6|#8b95a1|#172b4f|#152642|#101f37/i;
const EXPECTED_STYLES = ['blocks.css', 'globals.css', 'home.css', 'pages.css'];

const styles = (await readdir(new URL('../styles/', import.meta.url))).sort();
assert.deepEqual(styles, EXPECTED_STYLES, `styles/ must contain exactly ${EXPECTED_STYLES.join(', ')}`);
for (const file of styles) {
  const css = await readFile(new URL(`../styles/${file}`, import.meta.url), 'utf8');
  const hit = css.match(FORBIDDEN_CSS);
  assert.ok(!hit, `${file}: forbidden color token ${hit && hit[0]}`);
}

let sections = 0;
for (const [path, ids] of Object.entries(REQUIRED)) {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  const html = await response.text();
  const found = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = found.filter((id, i) => found.indexOf(id) !== i);
  assert.deepEqual(dupes, [], `${path}: duplicate ids ${dupes.join(', ')}`);
  for (const id of ids) {
    assert.ok(found.includes(id), `${path}: section #${id} missing from initial HTML`);
    sections++;
  }
  const forbidden = html.match(FORBIDDEN_HTML);
  assert.ok(!forbidden, `${path}: removed pattern still present: ${forbidden && forbidden[0]}`);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${path}: expected exactly one h1`);
}

const home = await (await fetch(new URL('/', origin))).text();
assert.ok(home.includes('/screens/home.png'), 'Home: app screen missing from hero');
const partners = await (await fetch(new URL('/partners', origin))).text();
assert.ok(partners.includes('<form'), 'Partners: inquiry form missing');

console.log(JSON.stringify({ pages: Object.keys(REQUIRED).length, sections, styles: styles.length, issues: [] }, null, 2));
