import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import PointBenefitCarousel from './PointBenefitCarousel';
import { AppStoreBadge, GooglePlayBadge } from './StoreBadges';
import { OPEN_DATE } from '../lib/site';

export function StoryIcon({ name, hero = false }) {
  return <Image className="pay-story-icon" src={hero ? `/icons/hero/${name}-hd.png` : `/images/benefits/${name}-art.png`} alt="" width={160} height={160} sizes="80px" quality={90} />;
}

export function StoryLink({ href, children }) {
  return <Link className="pay-text-link" href={href}>{children}<Icon name="arrow_forward" size={20} /></Link>;
}

export function MoreServices({ Device, Arrow }) {
  return <div className="pay-pair pay-content-width pay-extra-services">
    <section id="vote" className="pay-pair-column"><div className="pay-pair-copy pay-enter"><h2>정답은 없어요.<br /><em>내 생각이면 충분해요</em></h2><Arrow href="/full-life#vote" label="오늘의 한 표 알아보기" /></div><Link href="/full-life#vote" className="pay-media pay-vote-media" aria-label="오늘의 한 표 앱 화면 자세히 보기"><Device screen="today-vote" alt="세 가지 질문에 참여하는 오늘의 한 표 앱 화면" /><span className="pay-result-pill">세 가지 모두 답하면 <b>30P</b></span></Link></section>
    <section id="draw" className="pay-pair-column pay-pair-lower"><div className="pay-pair-copy pay-enter"><h2>기다리는 설렘도<br /><em>함께 나눌 수 있게</em></h2><Arrow href="/full-life#draw" label="경품 추첨 일정과 방식 알아보기" /></div><Link href="/full-life#draw" className="pay-media pay-draw-media" aria-label="경품 추첨 앱 화면 자세히 보기"><Device screen="prize-draw" alt="경품과 추첨 일정을 확인하는 풀리프 앱 화면" /><span className="pay-result-pill"><Icon name="verified" size={20} /> 응모권 1개, 모두에게 같은 확률</span></Link></section>
  </div>;
}

export function PointsStory() {
  return <section id="points" className="pay-chapter pay-content-width"><div className="pay-chapter-heading pay-enter"><h2>평범한 하루도,<br /><em>쌓이면 특별해지니까</em></h2></div><div className="pay-join-banner"><div className="pay-enter"><h3>가입하면 바로 <strong>100P</strong></h3><p>작은 시작에, 기분 좋은 보너스.<br />풀리프와 첫 번째 혜택을 만나보세요.</p><StoryLink href="/download">풀리프 시작하기</StoryLink></div><Image src="/images/benefits/points-art.png" alt="쌓이는 포인트를 표현한 파란 동전" width={1024} height={1024} sizes="(max-width: 767px) 260px, 320px" quality={90} /></div><PointBenefitCarousel /><p className="pay-fine">광고 보기: 무료 하루 10회 / FULIF+ 하루 20회<br />포인트는 현금으로 바꾸거나 사고팔 수 없으며, 적립일로부터 2년 동안 유지돼요.</p></section>;
}

export function PlaygroundStory() {
  return <section id="play" className="pay-chapter pay-content-width"><div className="pay-chapter-heading pay-enter"><h2>잠깐의 여유마저<br /><em>즐거움이 되도록</em></h2></div><div className="pay-play-grid">{[
    ['memory', '기억하는 재미', '넘버 센스', '잠깐 본 번호를 기억해 찾아보세요. 성공한 단계만큼 포인트가 쌓여요. 실패해도 이미 받은 포인트는 그대로예요.', '기억력 게임 · 받은 포인트는 그대로'],
    ['number', '고르는 재미', '번호 만들기', '35개 필터로 고른 풀리프 제공 번호부터 내 손으로 직접 만드는 나만의 번호까지. 고르는 과정에도 즐거움을 더했어요.', '무료 2세트 · FULIF+ 10세트'],
    ['score', '기록하는 재미', '럭키 스코어', '내 번호를 점수로 다시 만나보세요. 럭키 스코어로 확인하고, 기록이 쌓이는 또 다른 재미를 발견해요.', 'FULIF+ 전용'],
].map(([art, , title, desc, note]) => <article className="pay-play-item pay-enter" key={art}><div className={`pay-play-art pay-play-${art}`}><Image src={`/images/benefits/${art}-art.png`} alt="" width={1024} height={1024} sizes="(max-width: 767px) 280px, (max-width: 1199px) 330px, 420px" quality={90} /></div><div className="pay-play-copy"><h3>{title}</h3><p>{desc}</p><div className="pay-play-actions"><span className="pay-detail-tag">{note}</span><Link className="pay-play-more" href="/full-life#playground" aria-label={`${title} 자세히 보기`}><Icon name="arrow_forward" size={18} /></Link></div></div></article>)}</div><p className="pay-fine">번호 기능은 번호를 고르는 재미를 위한 것이며, 당첨 확률을 높여주지 않아요.</p></section>;
}

export function MembershipDetails() {
  return <div id="plus" className="pay-content-width pay-plus-details"><div className="pay-plus-grid">{[
    ['한 회차 낙첨번호', '20', '세트'], ['풀리프 제공 번호', '10', '세트'], ['하루 광고 보기', '20', '회'], ['더 다양한 즐거움', '럭키 스코어 · 챔피언십', ''],
  ].map(([label, value, unit]) => <div key={label}><span>{label}</span><strong className={unit ? 'pay-plus-number' : 'pay-plus-exclusive'}>{value}{unit && <small>{unit}</small>}</strong></div>)}</div><p>FULIF+ 전용 이벤트도 함께해요.<br />FULIF든 FULIF+든, 응모권 1개의 가치는 같아요.</p></div>;
}

export function PulliStory() {
  return <section id="pulli" className="pay-chapter pay-content-width pay-pulli-story"><div className="pay-chapter-heading pay-enter"><h2>이름에도, 친구에게도<br /><em>행운을 담았어요.</em></h2><p>FULL + LIFE. 비어버린 순간을 다시 채워, 하루를 가득하게.<br />네잎클로버와 작은 새싹을 닮은 풀리가<br />일상 속 작은 좋은 순간을 함께 발견해요.</p><StoryLink href="/notes">풀리가 적어둔 이야기</StoryLink></div><div className="pay-pulli-art"><span aria-hidden="true">FULL<br /><i>+</i> LIFE</span><Image src="/mascot/pulli-profile-v2.png" alt="네잎클로버와 새싹을 닮은 풀리프의 친구, 풀리" width={230} height={230} sizes="(max-width: 767px) 180px, (max-width: 1199px) 230px, 260px" /></div><p className="pay-pulli-signoff">평범한 오늘이 모여, 더 반짝이는 내일이 됩니다.<span>Have a Fuli Day!</span></p></section>;
}

export function TrustStory() {
  return <section className="pay-chapter pay-content-width pay-trust-story" aria-labelledby="pay-trust-heading"><div className="pay-chapter-heading pay-enter"><h2 id="pay-trust-heading">풀리프가 지키는<br /><em>네 가지 약속</em></h2></div><div className="pay-trust-list">{[
    ['verified', '모든 응모권은 같은 확률이에요', 'FULIF든 FULIF+든, 응모권 1개의 가치는 같아요.'],
    ['auto_awesome', '번호 기능은 재미를 위한 것이에요', '번호를 고르는 즐거움을 드릴 뿐, 당첨 확률을 높여주지 않아요.'],
    ['redeem', '포인트는 현금이 아니에요', '활동으로만 쌓이고, 사고팔거나 현금으로 바꿀 수 없어요. 적립일로부터 2년 동안 유지돼요.'],
    ['location_off', '필요한 것만 여쭤요', '상세 주소도, 실시간 위치도 묻지 않아요. 한 번 정한 생활권이면 충분해요.'],
  ].map(([icon, title, desc]) => <article className="pay-enter" key={icon}><Icon name={icon} size={23} /><div><h3>{title}</h3><p>{desc}</p></div></article>)}</div></section>;
}

export function StartStory() {
  return <section id="start" className="pay-start-story"><div className="pay-content-width pay-start-inner"><div className="pay-enter"><h2>오늘 끝난 것에,<br /><em>한 번 더.</em></h2><p>쿠폰 · 티켓 · 번호로 시작하는 AI 리워드 플랫폼</p></div><div className="pay-start-download pay-enter"><div className="pay-store-links"><AppStoreBadge /><GooglePlayBadge /></div><small>{OPEN_DATE} 오픈</small></div></div></section>;
}
