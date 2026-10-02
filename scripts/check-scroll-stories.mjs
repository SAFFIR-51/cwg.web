// Read-only SSR regression checks; browser scroll/viewport QA is documented separately.
import assert from 'node:assert/strict';

const origin = process.env.SITE_CHECK_ORIGIN || 'http://127.0.0.1:3000';
// 홈은 PayLanding(스크롤 스토리 없음), FOUND AI 지도와 멤버십 한도 스토리는 PDF 구성에 따라 제거됨.
const cases = [
  ['/full-life', [['fulif-day', ['0', '1', '2', '3', '4']]]],
  ['/found-ai', [['found-places', ['0', '1', '2']]]],
];
let stories = 0;
let chapters = 0;
for (const [path, groups] of cases) {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 200, `${path}: response`);
  const html = await response.text();
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${path}: duplicate DOM IDs`);
  for (const [id, keys] of groups) {
    assert.ok(html.includes(`data-scroll-story="${id}"`), `${path}: missing story ${id}`);
    for (const key of keys) {
      assert.ok(ids.includes(`${id}-${key}`), `${path}: chapter ${key} missing from initial HTML`);
      assert.ok(ids.includes(`${id}-${key}-label`), `${path}: chapter ${key} accessible label missing`);
      chapters++;
    }
    stories++;
  }
  assert.ok(!html.includes('role="tab"'), `${path}: presentation still gated by tabs`);
  assert.ok(!/fulif-hero-cinema|cafe-life\.png|service-day\.png|partner-moment\.png|found-street\.png/.test(html), `${path}: old people photography still referenced`);
  assert.ok(html.includes('<noscript>'), `${path}: static fallback missing`);
}
const partner = await (await fetch(new URL('/partners', origin))).text();
assert.ok(partner.includes('partner-counter.png'), 'Partners: new image missing');
assert.ok(!partner.includes('partner-moment.png'), 'Partners: old image still referenced');
console.log(JSON.stringify({ pages: cases.length + 1, stories, chapters, issues: [] }, null, 2));
