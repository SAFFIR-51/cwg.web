import Image from 'next/image';
import Link from 'next/link';
import Icon from '../Icon';
import { Section, SectionHead, Fine, Phone, Tag } from '../ui';
import { ScreenCard, SplitFeature, FeatureGrid, PricingCard, FactList, CtaBand, PhoneStack } from '../blocks';
import { OPEN_DATE } from '../../lib/site';

/* ---------- 1. 세 단계 ---------- */
const STEPS = [
  ['01', '모으고', '쿠폰 · 티켓 · 지난 회차 번호를 앱에 등록해요.'],
  ['02', '참여하고', '광고 한 편, 오늘의 한 표. 하루 몇 분이면 포인트와 응모권이 쌓여요.'],
  ['03', '발견해요', '내 생활권 혜택은 FOUND AI가 먼저 찾아드려요.'],
];
export function StepsStrip() {
  return (
    <section id="steps" className="steps-strip">
      <div className="container">
        <ol>{STEPS.map(([n, t, d]) => <li key={n} className="reveal"><span>{n}</span><h2>{t}</h2><p>{d}</p></li>)}</ol>
      </div>
    </section>
  );
}

/* ---------- 2. 앱을 열면 네 가지 ---------- */
const SERVICES = [
  { title: 'ONE MORE', desc: '받은 쿠폰과 다녀온 티켓을 보관함에 모아요. 등록 다섯 번이면 응모권 1개, 쿠폰 사용완료와 티켓 등록은 각 10P.', screen: '/screens/one-more.png', href: '/full-life#one-more', alt: '내 쿠폰 · 내 티켓 화면' },
  { title: '낙첨 ONE MORE', desc: '지난 회차 번호 1세트를 등록하면 10P. 브랜드 파트너의 짧은 영상을 한 편 보면 경품 응모권 1개. 등록은 토요일 21:00부터 화요일 20:00까지예요.', screen: '/screens/lotto-one-more.png', href: '/full-life#lotto-one-more', alt: '낙첨 ONE MORE 화면' },
  { title: '오늘의 한 표', desc: '하루 세 번, 정답 없는 질문에 가볍게 답하면 30P. 답하고 나면 다른 회원들의 선택도 볼 수 있어요.', screen: '/screens/today-vote.png', href: '/full-life#vote', alt: '오늘의 한 표 화면' },
  { title: '경품 추첨', desc: '낙첨 ONE MORE는 매주 화요일 20:30, ONE MORE는 매달 마지막 화요일 21:00에 추첨해요. 모든 응모권은 같은 확률이에요.', screen: '/screens/prize-draw.png', href: '/full-life#draw', alt: '경품 추첨 화면' },
];
export function AppBento() {
  return (
    <Section id="app">
      <SectionHead eyebrow="IN THE APP" title={'앱을 열면,\n네 가지가 기다려요'} lead="쿠폰 한 장, 지난 회차 번호 한 세트부터. 지금 가진 것으로 바로 시작할 수 있어요." />
      <div className="bento">{SERVICES.map(s => <ScreenCard key={s.title} {...s} />)}</div>
    </Section>
  );
}

/* ---------- 3. FOUND AI ---------- */
const PROMISES = [
  { icon: 'search_off', title: '찾지 않으셔도 돼요', desc: '회원님이 검색하지 않아도 풀리프가 먼저 찾아 정리해 드려요.' },
  { icon: 'verified', title: '없는 혜택은 만들지 않아요', desc: '확인된 것만 올려요. 확인한 날짜를 함께 적어드려요.' },
  { icon: 'location_off', title: '위치를 따라다니지 않아요', desc: '한 번 정하신 지역만 사용하고, 실시간 위치는 보지 않아요.' },
];
export function FoundSplit() {
  return (
    <SplitFeature id="found" tone="blue" eyebrow="FOUND AI" title={'내 생활권 혜택,\n풀리가 먼저 찾아요'} lead="한 번 정한 동네의 편의점 · 마트 · 주유소 혜택을 확인한 날짜와 함께 정리해 드려요." reverse
      visual={<Phone src="/screens/found.png" alt="FOUND AI 생활권 혜택 앱 화면" size="lg" />}>
      <FeatureGrid cols={1} items={PROMISES} className="feature-row" />
      <Link href="/found-ai" className="btn-secondary">FOUND AI 자세히 보기</Link>
    </SplitFeature>
  );
}

/* ---------- 4. 매일의 포인트 ---------- */
const POINTS = [
  { art: 'points', title: '가입하면 바로', value: '100', unit: 'P', desc: '처음 만난 오늘부터, 첫 번째 혜택.', href: '/download', highlight: true },
  { art: 'vote', title: '오늘의 한 표', value: '30', unit: 'P', desc: '하루 세 번, 내 생각을 고르면', href: '/full-life#vote' },
  { art: 'invite', title: '친구 초대', value: '각 100', unit: 'P', desc: '초대한 분도, 초대받은 분도', href: '/full-life#points' },
  { art: 'watch', title: '광고 보기', value: '1초에 1', unit: 'P', desc: '보는 시간만큼 차곡차곡', href: '/full-life#points' },
  { art: 'donate', title: '쿠폰 기부', value: '30', unit: 'P', desc: '따뜻한 마음을 나누면', href: '/full-life#points' },
];
export function PointsRow() {
  return (
    <Section id="points" tone="gray">
      <SectionHead eyebrow="EVERY DAY" title={'하루 몇 분이면\n포인트가 쌓여요'} />
      <FeatureGrid cols={4} items={POINTS} className="points-grid mt-10" />
      <Fine className="mt-5">광고 보기는 FULIF 하루 10회, FULIF+ 하루 20회예요.{'\n'}포인트는 현금으로 바꾸거나 사고팔 수 없고, 적립일로부터 2년 동안 유지돼요.</Fine>
    </Section>
  );
}

/* ---------- 5. 놀이터 ---------- */
const PLAY = [
  ['넘버 센스', null, '잠깐 본 번호를 기억해 찾아요. 성공한 단계만큼 포인트가 쌓이고, 실패해도 받은 포인트는 그대로예요.'],
  ['번호 만들기', null, '35개 필터로 고른 풀리프 제공 번호가 매 회차 도착해요. FULIF 2세트, FULIF+ 10세트.'],
  ['럭키 스코어', 'FULIF+', '등록한 번호의 아쉬움을 점수로 바꾸고, 점수에 따라 포인트를 드려요.'],
];
export function PlaySplit() {
  return (
    <SplitFeature id="play" eyebrow="PLAYGROUND" title={'잠깐의 여유도\n놀이터에서'} lead="기억하고, 고르고, 나만의 기록을 만들어요."
      visual={<PhoneStack layout="pair" screens={[{ src: '/screens/playground.png', alt: '풀리프 놀이터 화면' }, { src: '/screens/number-sense.png', alt: '넘버 센스 게임 화면' }]} />}>
      <ul className="play-list">
        {PLAY.map(([t, tag, d]) => <li key={t} className="reveal"><h3>{t}{tag && <Tag>{tag}</Tag>}</h3><p>{d}</p></li>)}
      </ul>
      <Link href="/full-life#playground" className="btn-link">놀이터 자세히 보기<Icon name="chevron_right" size={18} /></Link>
      <Fine>번호 기능은 번호를 고르는 재미를 위한 것으로, 당첨 확률을 높여주지 않아요.</Fine>
    </SplitFeature>
  );
}

/* ---------- 6. FULIF+ ---------- */
export function PlusOffer() {
  return (
    <Section id="plus" tone="gray">
      <div className="plus-offer">
        <div className="plus-offer-copy">
          <SectionHead eyebrow="FULIF+" title={'더 넉넉하게 쓰고 싶다면,\nFULIF+'} lead="첫 달은 무료로 써보고 결정하세요. 체험 중 해지하면 결제되지 않아요." />
          <PricingCard
            items={['한 회차 낙첨번호 20세트 (FULIF 5세트)', '매 회차 풀리프 제공 번호 10세트 (FULIF 2세트)', '하루 광고 보기 20회 (FULIF 10회)', '럭키 스코어 · 챔피언십 · FULIF+ 전용 이벤트']}
            cta={<Link href="/membership" className="btn-primary">멤버십 자세히 보기</Link>}
            small="무료 체험 1회 · 결제 3일 전 안내 · 체험 중 해지하면 결제되지 않아요."
          />
        </div>
        <div className="plus-offer-visual reveal"><Phone src="/screens/subscription.png" alt="FULIF+ 멤버십 안내 화면" /></div>
      </div>
      <Fine className="mt-6">FULIF든 FULIF+든, 응모권 1개의 가치는 같아요.</Fine>
    </Section>
  );
}

/* ---------- 7. 풀리 + 네 가지 약속 ---------- */
const TRUST = [
  ['모든 응모권은 같은 확률이에요', 'FULIF든 FULIF+든, 응모권 1개의 가치는 같아요.'],
  ['번호 기능은 재미를 위한 것이에요', '번호를 고르는 즐거움을 드릴 뿐, 당첨 확률을 높여주지 않아요.'],
  ['포인트는 현금이 아니에요', '활동으로만 쌓이고, 사고팔거나 현금으로 바꿀 수 없어요. 적립일로부터 2년 동안 유지돼요.'],
  ['필요한 것만 여쭤요', '상세 주소도, 실시간 위치도 묻지 않아요. 한 번 정한 생활권이면 충분해요.'],
];
export function PromiseBlock() {
  return (
    <Section id="promise">
      <div className="promise-block">
        <div className="pulli-card reveal">
          <Image src="/mascot/pulli-profile-v2.png" alt="네잎클로버와 새싹을 닮은 풀리프의 친구, 풀리" width={160} height={160} sizes="160px" />
          <p className="eyebrow">OUR LITTLE EVERYDAY FRIEND</p>
          <h2>네잎클로버를 닮은<br />친구, 풀리</h2>
          <p>FULL + LIFE. 평범한 하루 속 작은 좋은 순간을 풀리가 함께 발견해요.</p>
          <Link href="/notes" className="btn-link">풀리 노트 읽어보기<Icon name="chevron_right" size={18} /></Link>
        </div>
        <div className="trust-list">
          <SectionHead eyebrow="OUR PROMISE" title={'풀리프가 지키는\n네 가지'} />
          <dl>{TRUST.map(([t, d]) => <div key={t} className="reveal"><dt>{t}</dt><dd>{d}</dd></div>)}</dl>
        </div>
      </div>
    </Section>
  );
}

/* ---------- 8. 함께 ---------- */
export function TogetherCards() {
  const items = [
    { art: 'donate', tag: '쿠폰 기부', title: '쓰지 않을 쿠폰이, 누군가에게는 첫 선물이 돼요', desc: '보관함에서 기부하면 30P와 기부천사 배지를 드려요. 만료까지 1개월 이상 남은 금액권 · 문화상품권 등을 기부할 수 있어요.', href: '/full-life#points' },
    { art: 'invite', tag: '브랜드 파트너 · AD SCALE', title: '회원이 본 광고 한 편이 응모권과 포인트가 돼요', desc: '같은 카테고리에서는 한 브랜드와만 함께해요.', href: '/partners', extra: <FactList className="fact-list-inline" items={[{ value: '10', unit: '개', label: '광고 카테고리' }, { value: '8', unit: '개', label: '광고 노출 화면' }, { value: '1', unit: '사', label: '카테고리당 브랜드' }]} /> },
  ];
  return (
    <Section id="together" tone="gray">
      <SectionHead eyebrow="TOGETHER" title={'함께 만드는\n한 번 더'} />
      <FeatureGrid cols={2} size="lg" items={items} className="mt-10" />
    </Section>
  );
}

/* ---------- 9. 다운로드 ---------- */
export function DownloadBand() {
  return <CtaBand id="download" title={'오늘 끝난 것에,\n한 번 더.'} lead="쿠폰 · 티켓 · 번호로 시작하는 AI 리워드 플랫폼" note={`${OPEN_DATE} 오픈 · 만 19세 이상 이용할 수 있어요.`} screen="/screens/home.png" />;
}
