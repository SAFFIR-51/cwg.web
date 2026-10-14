// 풀리 노트 — 글 데이터.
// 글 상세는 모든 글이 같은 순서(컴팩트 최종본 v3 · 2026-10-14):
//   ① 라벨 → ② 제목 · 부제 → ③ 풀리 · 날짜 · 읽는 시간 → ④ 대표 그림 → ⑤ 본문 소제목 3개(표 · 그림 포함)
//   → ⑥ FULI NOTES → ⑦ 풀리의 한마디 → ⑧ 댓글 한 줄 → ⑨ 함께 보면 좋아요
// 본문 문단의 **굵게** 는 강조(밑줄 형광)로 그린다. 번호 이야기 글(numberStory)은 본문 끝에 안내문을 붙인다.

export const CATEGORIES = [
  { key: 'all', label: '전체' },
  { key: 'life', label: '생활 발견', desc: '내 생활권의 알뜰 정보', img: '/mascot/clover_search.png' },
  { key: 'onemore', label: 'ONE MORE 꿀팁', desc: '쿠폰 · 티켓 한 번 더', img: '/mascot/clover_hello.png' },
  { key: 'howto', label: '풀리프 사용법', desc: '처음 오신 분께', img: '/mascot/pulli-profile-v2.png' },
  { key: 'news', label: '함께하는 소식', desc: '기부 · 이벤트 · 새 소식', img: '/mascot/clover_wave.png' },
];

// 연재 「한 번 더, 발견하는 일상」 — 공개 편 수는 date(KST)와 글(slug) 유무로 자동 계산한다.
// 2편은 1편 원고의 「10.15 공개」, 4~10편은 v3 목차 날짜. 3편 날짜는 v3 에 없어 오픈일(10.19 월)로 둔다.
// 7편 「안 맞은 번호는 어디로 갈까」는 예전 1편 — 주소(slug)를 그대로 유지한다.
export const SERIES = {
  title: '한 번 더, 발견하는 일상',
  desc: '평범한 하루에도 미처 보지 못한 혜택이 있어요. 풀리와 함께 하나씩 찾아보세요.',
  total: 10,
  episodes: [
    { n: 1, title: '우리는 왜 ‘한 번 더’를 이야기할까요?', date: '2026-10-14', slug: 'why-we-talk-about-one-more' },
    { n: 2, title: '풀리프와 함께하는 하루, 무엇이 달라질까요?', date: '2026-10-15' },
    { n: 3, title: '버리기 전에, 잊어버리기 전에', date: '2026-10-19' },
    { n: 4, title: '쓰지 못한 쿠폰에도 이야기가 있어요', date: '2026-10-26' },
    { n: 5, title: '즐거웠던 하루를 그냥 보내지 마세요', date: '2026-11-02' },
    { n: 6, title: '행운은 당첨 번호에만 있을까요?', date: '2026-11-09' },
    { n: 7, title: '안 맞은 번호는 어디로 갈까', date: '2026-11-16', slug: 'series-01-where-do-losing-numbers-go' },
    { n: 8, title: '작은 참여가 새로운 기회가 되는 순간', date: '2026-11-23' },
    { n: 9, title: '나의 일상이 누군가에게도 좋은 일이 된다면', date: '2026-11-30' },
    { n: 10, title: '생활의 가치를 한 번 더, 이제 시작입니다', date: '2026-12-07' },
  ],
};

export const NUMBER_NOTICE = '번호 기능은 고르는 재미를 위한 것으로, 당첨 확률을 높여주지 않아요.';

// 한국 시각 기준 오늘(YYYY-MM-DD)
export function kstToday(now = new Date()) {
  return new Date(now.getTime() + 9 * 3600 * 1000).toISOString().slice(0, 10);
}

// 편마다 { ...episode, open, openOn } — open 은 글이 있고 공개일이 지났을 때만 true
export function seriesStatus(today = kstToday()) {
  return SERIES.episodes.map((ep) => ({
    ...ep,
    open: Boolean(ep.slug) && ep.date <= today,
    openOn: `${ep.date.slice(5, 7)}/${ep.date.slice(8, 10)} 공개`,
    openOnDot: `${ep.date.slice(5, 7)}.${ep.date.slice(8, 10)} 공개`,
  }));
}

export const NOTES = [
  {
    slug: 'why-we-talk-about-one-more',
    category: 'series',
    episode: 1,
    categoryLabel: '연재 · 한 번 더, 발견하는 일상 · 1편',
    crumb: '연재 · 한 번 더, 발견하는 일상',
    title: '우리는 왜\n‘한 번 더’를 이야기할까요?',
    subtitle: '끝난 줄 알았던 것들에 대한 작은 이야기',
    summary: '끝난 줄 알았던 것들에 대한 작은 이야기',
    date: '2026.10.14',
    minutes: 4,
    hero: { type: 'stillLife', caption: '지난 한 주, 회원님 곁을 스쳐 간 것들' },
    sections: [
      {
        title: '끝났다고 생각한 순간',
        blocks: [
          '월요일에 받은 커피 쿠폰은 금요일쯤이면 메시지 사이에 묻혀요. 주말에 본 영화 티켓은 사진첩 어딘가에 남고, 주유를 마치고 받은 영수증은 주머니 속에서 구겨지죠.',
          '하나하나는 사소해서, 우리는 그것이 **‘끝났다’**고 생각해요. 그런데 정말 끝난 걸까요?',
          {
            type: 'week', title: '어느 평범한 일주일',
            days: [['월', '커피 쿠폰\n받음'], ['수', '주유\n영수증'], ['토', '영화\n한 편'], ['다음 주 월', '쿠폰\n만료', true]],
            caption: '받았지만 쓰지 못한 쿠폰, 다녀왔지만 남지 않은 기록. 우리 일주일에는 이런 ‘작은 끝’이 생각보다 많아요.',
          },
        ],
      },
      {
        title: '한 번 더는, 더 많이가 아니라 더 잘',
        blocks: [
          '풀리프가 말하는 ‘한 번 더’는 더 사고, 더 바쁘게 살자는 말이 아니에요. **이미 내 곁에 있던 것을 한 번 더 살펴보자**는 제안이에요.',
          '그래서 풀리프는 새로운 것을 권하기보다, 이미 가진 것부터 챙겨요.',
          {
            type: 'compare', title: '보통의 끝, 그리고 풀리프의 한 번 더', head: ['보통은', '풀리프에서는'],
            rows: [
              ['쿠폰', '만료되면 끝', '만료 전에 알려드리고, 다 쓰면 포인트'],
              ['티켓', '사진첩에 남으면 끝', '등록하면 응모 기회 한 칸'],
              ['주유 영수증', '구겨지면 끝', '등록하면 응모 기회 한 칸'],
              ['오늘의 생각', '지나가면 끝', '오늘의 한 표로 남기고 포인트'],
            ],
          },
        ],
      },
      {
        title: '작은 발견이 모이면',
        blocks: [
          '쿠폰 한 장은 작은 절약이고, 티켓 한 장은 좋은 기억이에요. 이런 순간이 **다섯 번 모이면 경품 응모권 1개**가 돼요.',
          {
            type: 'slots', title: '다섯 칸이 모이면',
            slots: [['🎟️', '쿠폰'], ['🎬', '티켓'], ['⛽', '주유'], ['🎟️', '쿠폰'], ['🚆', '티켓']],
            result: '응모권\n1개',
          },
          '그리고 쌓인 기록은 FOUND AI가 내 생활권의 혜택을 찾는 단서가 돼요. 평범한 하루가 조금씩 다르게 보이기 시작하는 거죠.',
        ],
      },
    ],
    fuliNotes: {
      title: '한 번 더가 일어나는 순서',
      steps: [['발견', '그냥 지나칠 뻔한 순간'], ['기록', '쿠폰 · 티켓 · 영수증을 한곳에'], ['한 번 더', '응모 기회 · 포인트 · 생활 혜택']],
      foot: '그리고 다시, 평범한 오늘로',
    },
    fuliSays: '평범한 오늘이 모여,\n더 반짝이는 내일이 돼요.',
    comment: { q: '지난주, 회원님 곁을 스쳐 간 ‘작은 가치’는\n무엇이었나요?', sub: '댓글로 들려주세요. 다음 노트의 이야기가 돼요.' },
    related: [
      { label: '연재 2편 · 다음 편', episode: 2 },
      { label: '풀리프 사용법', slug: 'getting-started-with-fulif' },
    ],
  },
  {
    slug: 'getting-started-with-fulif',
    category: 'howto',
    categoryLabel: '풀리프 사용법',
    crumb: '풀리프 사용법',
    title: '처음 만나는 풀리프,\n가입부터',
    subtitle: '첫날, 이것만 해두면 충분해요',
    summary: '첫날, 이것만 해두면 충분해요',
    date: '2026.10.14',
    minutes: 4,
    hero: { type: 'homeScreen', badge: '가입은 1분!', caption: '풀리프 홈 화면' },
    sections: [
      {
        title: '가입은 1분, 홈부터 천천히',
        blocks: [
          'Google Play나 App Store에서 ‘풀리프’를 받아 화면 안내대로 가입하세요. 풀리프는 **만 19세 이상** 회원이 이용할 수 있어요.',
          '가입을 마치면 홈 화면이 열려요. 처음부터 모든 메뉴를 알 필요는 없어요. 홈은 딱 다섯 가지로 이루어져 있거든요.',
          {
            type: 'homeMap', title: '홈 화면 한눈에',
            items: [
              ['ONE MORE', '내 쿠폰 · 내 티켓 · 주유 영수증'],
              ['낙첨 ONE MORE', '아쉬운 번호를 응모권으로'],
              ['오늘의 한 표', '하루 세 번, 정답 없는 질문'],
              ['경품 추첨', '내 응모 현황 한눈에'],
              ['FOUND AI', '내 생활권 혜택'],
            ],
          },
        ],
      },
      {
        title: '첫날 해볼 세 가지',
        blocks: [
          '세 가지만 해두면, 내일부터 풀리프가 알아서 챙기기 시작해요.',
          {
            type: 'steps',
            items: [
              ['생활권 정하기', 'FOUND에서 시 · 구 · 동을 한 번만 정하면, 주유소 · 편의점 · 문화·전시 · 영화관 혜택을 찾아 드려요.'],
              ['쿠폰 한 장 등록하기', '카톡으로 받은 쿠폰을 캡처하거나 공유 버튼으로 올려 보세요. 만료 전에 먼저 알려 드려요.'],
              ['오늘의 한 표 답하기', '정답 없는 질문 세 개에 가볍게 답하면 포인트가 쌓여요.'],
            ],
          },
        ],
      },
      {
        title: '무엇을, 언제 등록하나요',
        blocks: [
          '등록하는 때가 항목마다 조금씩 달라요. 이 표 하나만 기억해 두세요.',
          {
            type: 'table', head: ['무엇을', '언제', '그러면'],
            // 낙첨 번호 등록 시작은 원고(토요일 21:00)가 아니라 실제 일정인 토요일 20:50 (마감 목 20:00 · 추첨 목 20:30)
            rows: [
              { what: '쿠폰', when: '쓰기 전에', then: '응모 1칸, 다 쓰면 포인트' },
              { what: '티켓', whatSub: '영화 · 공연 · 전시 · 기차 · 버스 등', when: '이용한 날부터 7일 안', then: '응모 1칸 + 포인트' },
              { what: '주유 영수증', when: '주유한 날부터 7일 안', whenSub: '한 주 3장까지', then: '응모 1칸' },
              { what: '낙첨 번호', when: '토요일 20:50 ~\n목요일 20:00', then: '광고를 보면\n응모권 1개' },
            ],
            caption: '쿠폰 · 티켓 · 주유 영수증은 다섯 칸이 모이면 응모권 1개가 돼요.',
          },
        ],
      },
    ],
    fuliNotes: {
      title: '첫날의 순서',
      steps: [['가입', '1분이면 끝'], ['생활권', 'FOUND에서 한 번'], ['첫 등록', '쿠폰 한 장부터'], ['확인', '보관함에서']],
    },
    fuliSays: '처음부터 전부 할 필요 없어요.\n오늘은 하나만 해봐요.',
    comment: { q: '회원님이 가장 먼저 해보고 싶은 건 무엇인가요?', sub: '댓글로 들려주세요. 다음 사용법 노트에 담을게요.' },
    related: [
      { label: '연재 1편', slug: 'why-we-talk-about-one-more' },
      { label: '풀리프 사용법 · 다음 글', title: '내 쿠폰 등록하기' },
    ],
  },
  {
    slug: 'fulif-opens-october-19',
    category: 'news',
    categoryLabel: '함께하는 소식',
    crumb: '함께하는 소식',
    title: '10월 19일,\n풀리프가 문을 엽니다',
    subtitle: '먼저 와 주신 분들과 함께 다듬어 가는 첫 한 달',
    summary: '먼저 와 주신 분들과 함께 다듬어 가는 첫 한 달',
    date: '2026.10.14',
    minutes: 3,
    hero: { type: 'openDate', caption: '두 번 다 월요일이에요' },
    sections: [
      {
        title: '왜 ‘테스트 오픈’일까요',
        blocks: [
          '10월 19일 월요일, 풀리프가 문을 열어요. 다만 정식 오픈은 **11월 23일 월요일**이고, 그 전 한 달은 테스트 오픈이에요.',
          '등록이 한 번에 되는지, 알림이 제때 오는지, 어디서 손이 멈추는지. 실제로 많은 분이 써 봐야 알 수 있는 것들을 먼저 와 주신 분들과 함께 확인하고 싶어서예요.',
          {
            type: 'timeline', title: '풀리프의 첫 두 달',
            items: [
              ['10.19 월', '테스트 오픈', '모든 기능을 열고, 함께 써 보며 다듬어요.', true],
              ['매주 목요일 20:30', '낙첨 ONE MORE 경품 추첨', '등록은 목요일 20:00까지예요.'],
              ['매달 마지막 화요일 20:30', 'ONE MORE 경품 추첨', '쿠폰 · 티켓 · 주유 영수증으로 모은 응모권이 들어가요.'],
              ['11.23 월', '그랜드 오픈', '브랜드 파트너들과 본격적으로 함께해요.', true],
            ],
          },
        ],
      },
      {
        title: '첫날부터 쓸 수 있는 것',
        blocks: [
          '10월 19일부터 바로 이용할 수 있어요.',
          {
            type: 'cards',
            items: [
              ['ONE MORE', '쿠폰 · 티켓 · 주유 영수증을 한곳에'],
              ['낙첨 ONE MORE', '아쉬운 번호를 경품 응모권으로'],
              ['오늘의 한 표', '하루 세 번, 정답 없는 질문'],
              ['FOUND AI', '내 생활권 혜택을 먼저'],
            ],
          },
          { type: 'donate', title: '쿠폰 기부도 첫날부터', body: '쿠폰 한 장으로, 응원이 필요한 우리 곁의 아이에게 기쁜 하루를 선물할 수 있어요.' },
        ],
      },
      {
        title: '먼저 와 주신 분께',
        blocks: [
          { type: 'founder', kicker: '창립 회원 · 2026.12.31까지', title: '연간 FULIF+ 49,000원에 13개월', body: '이 기간에 연간으로 시작하면 한 달을 더 드리고, 창립 회원 배지를 영구로 달아 드려요.' },
          '쓰시면서 불편한 점이나 바라는 기능이 보이면 꼭 들려주세요. **가장 많이 들린 목소리부터** 그랜드 오픈 전에 고쳐 갈게요. 먼저 와 주신 분들이 풀리프를 함께 만드는 셈이에요.',
        ],
      },
    ],
    fuliNotes: {
      title: '함께 만드는 한 달',
      steps: [['10.19', '테스트 오픈'], ['한 달', '함께 쓰고, 의견 듣고 다듬기'], ['11.23', '그랜드 오픈']],
    },
    fuliSays: '먼저 와 주셔서 고마워요.\n우리, 같이 만들어 가요.',
    comment: { q: '10월 19일, 가장 먼저 해보고 싶은 것은 무엇인가요?', sub: '댓글로 들려주세요. 첫 주 소식에 담을게요.' },
    related: [
      { label: '풀리프 사용법', slug: 'getting-started-with-fulif' },
      { label: '연재 1편', slug: 'why-we-talk-about-one-more' },
    ],
  },
  // v3 「새로 적은 노트」 목록의 세 번째 글 — 원고가 아직 없어 본문은 준비 중으로 둔다
  { slug: 'gifticon-balance', category: 'onemore', categoryLabel: 'ONE MORE 꿀팁', title: '기프티콘 잔액, 어디까지', summary: '', date: '2026.10.14', minutes: 3, body: [] },
  // 예전 연재 1편 → 연재 7편(2026-10-14 개발 코멘트). 주소는 그대로 둔다.
  {
    slug: 'series-01-where-do-losing-numbers-go',
    category: 'series',
    categoryLabel: '연재 · 한 번 더, 발견하는 일상 · 7편',
    crumb: '연재 · 한 번 더, 발견하는 일상',
    episode: 7,
    numberStory: true,
    title: '안 맞은 번호는 어디로 갈까',
    summary: '버려지던 한 장에 숨어 있던 이야기.',
    date: '2026.11.16',
    minutes: 3,
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
