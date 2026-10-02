// Read-only regression check for retained content and requested removals.
// SITE_CHECK_ORIGIN=http://127.0.0.1:3002 node scripts/check-home-story.mjs
import assert from 'node:assert/strict';

const origin = process.env.SITE_CHECK_ORIGIN || 'http://127.0.0.1:3002';
const response = await fetch(origin);
assert.equal(response.status, 200, 'Home page must load');
const html = await response.text();
const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'No duplicate anchors');
const chapters = ['intro', 'one-more', 'lotto-one-more', 'vote', 'draw', 'rewards', 'found', 'points', 'play', 'plus', 'pulli', 'start'];
for (const id of chapters) assert.ok(ids.includes(id), `Missing original chapter: ${id}`);

const facts = [
  '세 가지 질문', '30P',
  '편의점·마트·주유소',
  '가입하면 바로', '100P', '초대한 분도, 초대받은 분도', '1초에 1P',
  '무료 하루 10회 / FULIF+ 하루 20회', '적립일로부터 2년',
  '넘버 센스', '실패해도 이미 받은 포인트는 그대로', '35개 필터',
  '직접 만드는 나만의 번호', '무료 2세트 · FULIF+ 10세트', '럭키 스코어',
  '기록이 쌓이는', '당첨 확률을 높여주지 않아요',
  '첫 달 무료', '월 5,000원', '20세트', '10세트', '20회', '챔피언십',
  'FULIF+ 전용 이벤트', '무료 체험 1회', '자동 결제', '결제 3일 전 안내',
  '체험 중 해지하면 결제되지 않아요', '응모권 1개의 가치는 같아요',
  'FULL + LIFE', '네잎클로버와 작은 새싹', '풀리가 적어둔 이야기', 'Have a Fuli Day!',
  'AD SCALE', '브랜드와 회원이 함께 만드는 일상의 혜택입니다.',
  '활동으로만 쌓이고', '사고팔거나 현금으로 바꿀 수 없어요', '상세 주소도',
  '2026.10.12', '만 19세 이상',
];
for (const fact of facts) assert.ok(text.replace(/\s+/g, '').includes(fact.replace(/\s+/g, '')), `Missing original fact: ${fact}`);

const hero = html.match(/<section id="intro"[\s\S]*?<\/section>/)?.[0];
const membership = html.match(/<section id="membership"[\s\S]*?<\/section>/)?.[0] || '';
assert.ok(membership.includes('class="plus-pass"') && membership.includes('ONE MORE POSSIBILITY. FULLER EVERY DAY.'), 'Membership reuses the original branded horizontal card');
assert.ok(!membership.includes('member-pass.png'), 'Unrequested glass card artwork stays removed');
assert.ok(!/pay-device|pay-plus-symbol|pay-membership-orbit/.test(membership), 'Membership has no duplicate phone or decorative plus');
assert.equal((membership.match(/class="pay-membership-cta"/g) || []).length, 1, 'Membership has one clear CTA');
assert.equal((membership.match(/class="pay-plus-number"/g) || []).length, 3, 'Membership preserves three numeric benefits');
assert.ok(hero, 'Approved hero exists');
assert.ok(!/FULL LIFE, ONE MORE|SCROLL|pay-hero-icons/.test(hero), 'Removed hero content stays removed');
assert.ok(html.includes('pay-story-icon'), 'Service icons exist below the hero');
for (const id of ['one-more', 'lotto-one-more', 'vote', 'draw']) {
  const section = html.match(new RegExp(`<section id="${id}"[\\s\\S]*?<\\/section>`))?.[0];
  assert.ok(section && !section.includes('pay-story-icon'), `No heading icon in ${id}`);
  assert.ok(!section.includes('pay-description'), `No description paragraph in ${id}`);
  assert.ok(section.includes('<h2>') && section.includes('pay-media') && section.includes('pay-arrow'), `Keep heading, image, and link in ${id}`);
}
assert.ok(!html.includes('pay-kicker'), 'Small heading subtitles stay removed');
const playground = html.match(/<section id="play"[\s\S]*?<\/section>/)?.[0] || '';
assert.equal((playground.match(/class="pay-play-actions"/g) || []).length, 3, 'Each playground chip has an adjacent action');
assert.equal((playground.match(/class="pay-play-more"/g) || []).length, 3, 'All playground cards have a round arrow link');
for (const title of ['넘버 센스', '번호 만들기', '럭키 스코어']) {
  assert.ok(playground.includes(`aria-label="${title} 자세히 보기"`), `Accessible playground link: ${title}`);
}
assert.ok(!playground.includes('pay-text-link'), 'Playground text links are replaced by arrow buttons');
assert.ok(html.includes('class="pay-after-plus"'), 'Lower landing redesign stays scoped below membership');
assert.ok(!html.includes('pay-promise-row'), 'Removed FOUND AI explanation cards stay removed');
assert.ok(!html.includes('pay-partner-stats'), 'Removed partner metrics stay removed');
for (const id of ['found', 'partners']) {
  const section = html.match(new RegExp(`<section id="${id}"[\\s\\S]*?<\\/section>`))?.[0] || '';
  assert.ok(!/pay-service-icon|pay-story-icon/.test(section), `No heading icon in ${id}`);
  assert.ok(section.includes('<h2>') && section.includes('pay-media') && section.includes('pay-arrow'), `Keep heading, image, and link in ${id}`);
}
assert.ok(!ids.includes('together') && !html.includes('pay-donation-story'), 'Removed donation introduction stays removed');
for (const removed of ['검색하지 않아도 먼저 찾아 정리해 드려요', '없는 혜택은 만들지 않아요', '위치를 따라다니지 않아요']) {
  assert.ok(!text.includes(removed), `Removed FOUND AI text stays removed: ${removed}`);
}
const trust = html.match(/<section[^>]*aria-labelledby="pay-trust-heading"[\s\S]*?<\/section>/)?.[0] || '';
assert.equal((trust.match(/<article/g) || []).length, 4, 'All four trust statements remain');
assert.ok(html.includes('pay-start-download'), 'Download section retains its store links and notice');
assert.ok(!ids.includes('brand') && !html.includes('pay-brand-step'), 'Removed brand section and cards stay removed');
assert.ok(!html.includes('pay-reward-summary'), 'Rewards are integrated, not repeated as another chapter');
assert.ok(!html.includes('pay-service-rewards'), 'Removed service reward details stay removed');
assert.ok(!text.includes('사진이나 공유로 등록하면 보관함에 쏙'), 'Removed description stays removed');
assert.equal((html.match(/class="pay-benefit-card"/g) || []).length, 4, 'All four point benefit cards remain available');
assert.ok(html.includes('이전 포인트 혜택') && html.includes('다음 포인트 혜택'), 'Benefit carousel has labeled controls');
const flow = ['points', 'play', 'membership', 'found', 'partners', 'pulli', 'start'];
for (let index = 1; index < flow.length; index++) {
  assert.ok(html.indexOf(`id="${flow[index - 1]}"`) < html.indexOf(`id="${flow[index]}"`), `Story order: ${flow[index - 1]} before ${flow[index]}`);
}
console.log(JSON.stringify({ chapters: chapters.length, contentChecks: facts.length, uniqueAnchors: true, approvedHeroPreserved: true, issues: [] }, null, 2));
