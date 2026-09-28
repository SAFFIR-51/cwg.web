import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import ScrollStory from './ScrollStory';

const ART = '/images/benefits/';

function ObjectArt({ name, className = '', sizes = '(max-width: 767px) 85vw, 400px' }) {
  return <Image src={`${ART}${name}-art.png`} alt="" width={1024} height={1024} quality={90} sizes={sizes} className={`benefit-object ${className}`} />;
}

function RoundArrow() {
  return <span className="benefit-arrow"><Icon name="arrow_forward" size={22} /></span>;
}

const REWARDS = [
  {
    name: 'coupon', label: '내 쿠폰 · 내 티켓', title: <>잊고 있던 쿠폰도<br />놓치지 않도록</>,
    desc: <>만료 전에 한 번 챙기고,<br />다 쓴 쿠폰은 포인트로 한 번 더.</>,
    tag: '만료 2일 전 알림', metric: '사용완료하면 10P', href: '/full-life#one-more',
  },
  {
    name: 'ticket', label: 'ONE MORE', title: <>다녀온 날의 기록이<br />한 번 더의 기회로</>,
    desc: <>티켓을 등록하면 바로 10P.<br />쿠폰·티켓 5번 등록하면 응모권 1개.</>,
    tag: '5번 등록하면', metric: '응모권 1개', href: '/full-life#one-more',
  },
  {
    name: 'number', label: '낙첨 ONE MORE', title: <>아쉬웠던 내 번호의<br />새로운 시작</>,
    desc: <>지난 회차 번호를 등록하고 광고 한 편.<br />이번 주의 경품 응모권으로 돌아와요.</>,
    tag: '번호 1세트마다', metric: '10P + 응모권 1개', href: '/full-life#lotto-one-more',
  },
];

export function RewardGallery() {
  return <section className="benefit-chapter" id="rewards">
    <div className="story-statement reveal"><h2>끝난 줄 알았던 것들이<br /><span>새로운 시작이 되도록</span></h2></div>
    <div className="benefit-collection">
      {REWARDS.map(item => <Link href={item.href} key={item.name} className={`benefit-card benefit-${item.name} reveal`}>
        <div className="benefit-card-heading"><span>{item.label}</span><h3>{item.title}</h3></div>
        <div className="benefit-art-stage"><ObjectArt name={item.name} /><div className="benefit-floating-note"><span>{item.tag}</span><b>{item.metric}</b></div></div>
        <div className="benefit-card-bottom"><p>{item.desc}</p><RoundArrow /></div>
      </Link>)}
    </div>
    <p className="story-fine benefit-disclaimer">낙첨번호 등록: 토요일 21:00 ~ 화요일 20:00 · 무료 5세트 / FULIF+ 20세트<br />낙첨 ONE MORE 응모권은 번호 등록 후 광고 시청 시 지급돼요. 모든 응모권은 동일한 확률이에요.</p>
  </section>;
}

const DAILY_REWARDS = [
  { name: 'vote', label: '오늘의 한 표', desc: '하루 세 번, 내 생각을 고르면', reward: '30', unit: 'P', href: '/full-life#vote' },
  { name: 'invite', label: '친구 초대', desc: '초대한 분도, 초대받은 분도', reward: '100', unit: 'P', href: '/full-life#points' },
  { name: 'watch', label: '광고 보기', desc: '보는 시간만큼 차곡차곡', reward: '1초에 1', unit: 'P', href: '/full-life#points' },
  { name: 'donate', label: '쿠폰 기부', desc: '따뜻한 마음을 나누면', reward: '30', unit: 'P', href: '/full-life#points' },
];

export function PointsScene() {
  return <section className="daily-chapter" id="points">
    <div className="benefit-section-heading reveal"><p>EVERY DAY, A LITTLE MORE</p><h2>평범한 하루도<br /><span>쌓이면 특별해지니까</span></h2></div>
    <div className="daily-join reveal">
      <div className="daily-join-copy"><span className="daily-welcome">처음 만난 오늘부터</span><h3>가입하면 바로<br /><strong>100<span>P</span></strong></h3><p>작은 시작에, 기분 좋은 보너스.<br />풀리프와 첫 번째 혜택을 만나보세요.</p><Link href="/download" className="daily-join-link">풀리프 시작하기 <Icon name="arrow_forward" size={20} /></Link></div>
      <div className="daily-join-visual"><div className="daily-coin-orbit" /><ObjectArt name="points" sizes="(max-width: 767px) 85vw, 560px" /><span className="daily-receipt"><Icon name="check_circle" size={23} /> 가입 보너스 <b>+100P</b></span></div>
    </div>
    <div className="daily-reward-grid">
      {DAILY_REWARDS.map(item => <Link key={item.name} href={item.href} className={`daily-reward-card daily-${item.name} reveal`}>
        <ObjectArt name={item.name} sizes="160px" /><div><h3>{item.label}</h3><p>{item.desc}</p><strong>{item.reward}<span>{item.unit}</span></strong></div><Icon name="chevron_right" size={19} className="daily-card-chevron" />
      </Link>)}
    </div>
    <p className="story-fine benefit-disclaimer">광고 보기: 무료 하루 10회 / FULIF+ 하루 20회<br />포인트는 현금으로 바꾸거나 사고팔 수 없으며, 적립일로부터 2년 동안 유지돼요.</p>
  </section>;
}

const PLAY_ITEMS = [
  { key: 'memory', name: '넘버 센스', eyebrow: '기억하는 재미', title: <>잠깐의 기억이<br />작은 성취가 되는 순간</>, desc: <>잠깐 본 번호를 기억해 찾아보세요.<br />성공한 단계만큼 포인트가 쌓여요.<br />실패해도 이미 받은 포인트는 그대로예요.</>, detail: '기억력 게임', badge: '받은 포인트는 그대로', action: '넘버 센스 만나보기' },
  { key: 'number', name: '번호 만들기', eyebrow: '고르는 재미', title: <>나만의 기준으로<br />정성껏 고르는 번호</>, desc: <>35개 필터로 고른 풀리프 제공 번호부터<br />내 손으로 직접 만드는 나만의 번호까지.<br />고르는 과정에도 즐거움을 더했어요.</>, detail: '35개 번호 필터', badge: '무료 2세트 · FULIF+ 10세트', action: '번호 만들기 알아보기' },
  { key: 'score', name: '럭키 스코어', eyebrow: '기록하는 재미 · FULIF+', title: <>아쉬웠던 번호도<br />쌓고 싶은 기록으로</>, desc: <>내 번호를 점수로 다시 만나보세요.<br />럭키 스코어로 확인하고,<br />기록이 쌓이는 또 다른 재미를 발견해요.</>, detail: 'FULIF+ 전용', badge: '내 번호를 점수로, 한 번 더', action: '럭키 스코어 알아보기' },
];

export function Playground() {
  return <section className="play-chapter" id="play">
    <div className="benefit-section-heading reveal"><p>FULIF PLAYGROUND</p><h2>잠깐의 여유마저<br /><span>즐거움이 되도록</span></h2><div>기억하고, 고르고, 나만의 기록을 만들어요.<br />풀리프 놀이터에서 보내는 가벼운 몇 분.</div></div>
    <ScrollStory id="home-play" className="play-scroll-copy" items={PLAY_ITEMS.map(item => ({
      key:item.key, label:item.name,
      visual:<div className="play-scroll-art"><ObjectArt name={item.key} sizes="(max-width: 899px) 90vw, 580px" /><span className="play-art-note"><Icon name={item.key === 'score' ? 'auto_awesome' : 'check_circle'} size={18} />{item.badge}</span></div>,
      content:<><h3>{item.title}</h3><p>{item.desc}</p><Link href="/full-life#playground" className="play-showcase-link">{item.action}<RoundArrow /></Link></>,
    }))} />
    <p className="story-fine benefit-disclaimer">번호 기능은 번호를 고르는 재미를 위한 것이며, 당첨 확률을 높여주지 않아요.</p>
  </section>;
}
