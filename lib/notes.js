// 풀리 노트 — 제목 · 요약은 디자인 시안의 형식 예시. 실제 원고가 오면 이 파일만 교체.
export const CATEGORIES = [
  { key: 'all', label: '전체' },
  { key: 'life', label: '생활 발견', desc: '내 생활권의 알뜰 정보', img: '/mascot/clover_search.png' },
  { key: 'onemore', label: 'ONE MORE 꿀팁', desc: '쿠폰 · 티켓 한 번 더', img: '/mascot/clover_hello.png' },
  { key: 'howto', label: '풀리프 사용법', desc: '처음 오신 분께', img: '/mascot/pulli-profile-v2.png' },
  { key: 'news', label: '함께하는 소식', desc: '기부 · 이벤트 · 새 소식', img: '/mascot/clover_wave.png' },
];

export const SERIES = {
  title: '낙첨의 재발견',
  desc: '버려지던 한 장에 숨어 있던 이야기를, 풀리가 열 번에 나눠 들려드려요.',
  total: 10,
  published: 1,
};

export const NOTES = [
  {
    slug: 'series-01-where-do-losing-numbers-go',
    category: 'series',
    categoryLabel: '연재 · 낙첨의 재발견 1편',
    episode: 1,
    title: '안 맞은 번호는 어디로 갈까',
    summary: '버려지던 한 장에 숨어 있던 이야기, 그 첫 번째.',
    date: '2026.10.12',
    minutes: 3,
    // TODO: 1편 확정 원고를 받으면 body 교체
    body: [
      '매주 토요일 저녁, 번호가 발표되면 수많은 종이 한 장이 조용히 버려집니다. 맞지 않은 번호, 그래서 끝난 줄 알았던 번호예요.',
      '풀리프는 그 한 장을 다시 봤어요. 아쉬움으로 끝나는 대신, 경품 응모권과 포인트로 돌아오는 방법을요.',
      '이 연재에서는 열 번에 걸쳐, 버려지던 한 장에 숨어 있던 이야기를 풀리가 하나씩 들려드릴게요.',
    ],
  },
  { slug: 'coupon-three-habits', category: 'onemore', categoryLabel: 'ONE MORE 꿀팁', title: '카톡으로 받은 쿠폰, 만료 전에 챙기는 세 가지 습관', summary: '받는 순간 한 번, 쓰기 전에 한 번. 두 번만 챙겨도 달라져요.', date: '2026.10.12', minutes: 3, body: [] },
  { slug: 'why-gas-prices-differ', category: 'life', categoryLabel: '생활 발견', title: '같은 동네인데, 주유소마다 가격이 다른 이유', summary: '가까운 곳이 늘 싼 건 아니에요. 가격이 갈리는 이유를 풀어봤어요.', date: '2026.10.12', minutes: 4, body: [] },
  { slug: 'today-vote-what-happens', category: 'howto', categoryLabel: '풀리프 사용법', title: '오늘의 한 표, 정답 없는 질문에 답하면 생기는 일', summary: '세 번 고른 답이 회원님께 더 맞는 혜택을 찾는 데 도움이 돼요.', date: '2026.10.12', minutes: 2, body: [] },
  { slug: 'coupon-to-a-child', category: 'news', categoryLabel: '함께하는 소식', title: '쓰지 않는 쿠폰 한 장이 아이에게 닿기까지', summary: '보관함의 「기부」 버튼 뒤에서 일어나는 일을 보여드려요.', date: '2026.10.12', minutes: 3, body: [] },
  { slug: 'how-to-register-losing-numbers', category: 'howto', categoryLabel: '풀리프 사용법', title: '낙첨번호는 어떻게 등록하나요?', summary: '용지의 QR이나 사진으로. 온라인 구매 번호는 직접 입력해요.', date: '2026.10.12', minutes: 2, body: [] },
];

export const getNote = (slug) => NOTES.find((n) => n.slug === slug);
