// Read-only check: home follows the PDF 2026.09.24 (fulif_io_웹사이트 전체디자인(v.2).pdf) text and order.
// Exceptions by later user request: no annual plan, no "만 19세" notice on home.
// SITE_CHECK_ORIGIN=http://127.0.0.1:3107 node scripts/check-home-story.mjs
import assert from 'node:assert/strict';

const origin = process.env.SITE_CHECK_ORIGIN || 'http://127.0.0.1:3002';
const response = await fetch(origin);
assert.equal(response.status, 200, 'Home page must load');
const html = await response.text();
const text = html.replace(/<!-- -->/g, '').replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, '');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'No duplicate anchors');

// PDF ① ~ ⑬ in order
const order = ['intro', 'one-more', 'app', 'vote', 'draw', 'flow', 'found', 'points', 'play', 'membership', 'pulli', 'donate', 'promise', 'partners', 'start'];
for (const id of order) assert.ok(ids.includes(id), `Missing PDF section: ${id}`);
for (let i = 1; i < order.length; i++) {
  assert.ok(html.indexOf(`id="${order[i - 1]}"`) < html.indexOf(`id="${order[i]}"`), `Order: ${order[i - 1]} before ${order[i]}`);
}

const copy = [
  'FULIF · 풀리프', '쿠폰 · 티켓 · 번호로 시작해, 생활 혜택을 찾아주는 AI 리워드 플랫폼', '끝난 줄 알았던 것들이 응모권으로, 포인트로, 내 생활 혜택으로 돌아와요.', '2026.10.12 오픈',
  '끝난 줄 알았던 것들에,', '번호는 발표가 나면 끝.', '만료 전에 챙기고, 다 쓰면 포인트로', '다녀온 날의 기록이 응모 기회로', '아쉬운 번호가 경품 응모권으로',
  '앱을 열면,', '풀리프 홈 화면 그대로예요. 하나씩 소개할게요.', '다섯 칸이 차면 응모권 1개', '등록은 매주 토요일 21:00부터 화요일 20:00까지예요.', '오늘은', '가볍게 하나씩 고르면 30P.', '내 응모 현황,',
  '모으고, 참여하고,', '번호를 맞히는 앱이 아니라,', '끝난 것에서 다시 가치를 찾는 앱이에요.',
  '찾지 않아도,', '먼저 찾아와요', '찾지 않으셔도 돼요', '없는 혜택은 만들지 않아요', '위치를 따라다니지 않아요', '찾는 곳은 차차 늘려갈게요.', 'FOUND AI 자세히 보기',
  '매일 조금씩,', '출석체크', '친구초대', '가입하면 바로', '포인트는 이렇게 지켜져요', '적립일로부터 2년 동안 유지돼요.',
  '잠깐의 여유,', '게임도 하고, 번호도 만들고.', '나만의 번호를 직접 만드는 챔피언십.', '아쉬웠던 번호를 점수로 바꿔 보여드려요.', '당첨 확률을 높여주지 않아요', 'Full Life에서 자세히 보기',
  '풀리프를 더 알차게,', '첫 달은 무료로 써보고 결정하세요.', '1개월 무료로 시작하기', '멤버십 보기', '결제 3일 전에 미리 알려드려요.',
  '이름에도 친구에게도', '행운을 담았습니다', '네잎클로버', '새싹', 'Have a Fuli Day!',
  '함께하는 ONE MORE', '쓰지 않을 쿠폰이,', '「기부천사」 배지', '만료까지 1개월 이상 남은 것',
  '풀리프가 지키는', '활동으로만 쌓이고, 풀리프 안에서만 써요.', '상세 주소도',
  'Ad Scale', '브랜드와 함께 혜택을 만듭니다.', '광고 카테고리', '브랜드 분석', '광고 노출 화면', '카테고리당 광고주', '풀리프 회원에게, 브랜드를 전하세요',
  '오늘 끝난 것에,', '브랜드 파트너 문의', '이용약관', '개인정보처리방침', '고객센터',
];
for (const phrase of copy) assert.ok(text.includes(phrase.replace(/\s+/g, '')), `Missing PDF copy: ${phrase}`);

for (const removed of ['만 19세', '연간', '50,000원', '12개월을 10개월']) {
  assert.ok(!text.includes(removed), `Excluded by user request: ${removed}`);
}
const menu = html.match(/<dialog[\s\S]*?<\/dialog>/)?.[0] || '';
for (const label of ['홈', 'Full Life', 'FOUND AI', '멤버십', '풀리 노트', '다운로드']) assert.ok(menu.includes(`<strong>${label}</strong>`), `Mobile menu item: ${label}`);
assert.equal((html.match(/class="pay-benefit-card"/g) || []).length, 5, 'Five daily point items');

console.log(JSON.stringify({ sections: order.length, copyChecks: copy.length, issues: [] }, null, 2));
