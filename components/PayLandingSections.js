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
    <section id="vote" className="pay-pair-column"><div className="pay-pair-copy pay-enter"><p className="pay-kicker">오늘의 한 표</p><h2>오늘은<br /><em>어떤 생각이신가요?</em></h2><p className="pay-description">하루 세 번, 정답은 없어요. 가볍게 하나씩 고르면 30P.</p><Arrow href="/full-life#vote" label="오늘의 한 표 알아보기" /></div><Link href="/full-life#vote" className="pay-media pay-vote-media" aria-label="오늘의 한 표 앱 화면 자세히 보기"><Device screen="today-vote" alt="세 가지 질문에 참여하는 오늘의 한 표 앱 화면" /><span className="pay-result-pill">세 가지 모두 답하면 <b>30P</b></span></Link></section>
    <section id="draw" className="pay-pair-column pay-pair-lower"><div className="pay-pair-copy pay-enter"><p className="pay-kicker">경품 추첨</p><h2>내 응모 현황,<br /><em>한눈에 보기</em></h2><p className="pay-description">낙첨 ONE MORE는 매주 화요일 20:30, ONE MORE는 매달 마지막 화요일 21:00에 경품 추첨을 해요. 모든 응모권은 같은 확률이고, 당첨된 경품은 보관함에 바로 넣어드려요.</p><Arrow href="/full-life#draw" label="경품 추첨 일정과 방식 알아보기" /></div><Link href="/full-life#draw" className="pay-media pay-draw-media" aria-label="경품 추첨 앱 화면 자세히 보기"><Device screen="prize-draw" alt="경품과 추첨 일정을 확인하는 풀리프 앱 화면" /><span className="pay-result-pill"><Icon name="verified" size={20} /> 응모권 1개, 모두에게 같은 확률</span></Link></section>
  </div>;
}

export function FlowStory() {
  return <section id="flow" className="pay-chapter pay-content-width pay-trust-story" aria-labelledby="pay-flow-heading"><div className="pay-chapter-heading pay-enter"><h2 id="pay-flow-heading">모으고, 참여하고,<br /><em>발견해요</em></h2><p>번호를 맞히는 앱이 아니라,<br />끝난 것에서 다시 가치를 찾는 앱이에요.</p></div><div className="pay-trust-list">{[
    ['confirmation_number', '1 등록', '쿠폰과 티켓은 사진이나 공유로, 번호는 사진으로. 흩어진 것들이 한곳에 모여요.'],
    ['check_circle', '2 참여', '광고 한 편, 오늘의 한 표, 출석체크. 하루 몇 분이면 포인트와 응모권이 쌓여요.'],
    ['search', '3 발견', '쌓인 기록을 바탕으로 FOUND AI가 내 생활권 혜택을 먼저 찾아 드려요.'],
  ].map(([icon, title, desc]) => <article className="pay-enter" key={icon}><Icon name={icon} size={23} /><div><h3>{title}</h3><p>{desc}</p></div></article>)}</div></section>;
}

export function PointsStory() {
  return <section id="points" className="pay-chapter pay-content-width"><div className="pay-chapter-heading pay-enter"><h2>매일 조금씩,<br /><em>쌓이는 즐거움</em></h2></div><PointBenefitCarousel /><div className="pay-join-banner"><div className="pay-enter"><span>가입 보너스</span><h3>가입하면 바로 <strong>100P</strong></h3></div><Image src="/images/benefits/points-art.png" alt="쌓이는 포인트를 표현한 파란 동전" width={1024} height={1024} sizes="(max-width: 767px) 260px, 320px" quality={90} /></div><p className="pay-detail-tag pay-points-guard"><strong>포인트는 이렇게 지켜져요</strong><br />활동으로만 쌓이고, 사고팔 수 없어요. 현금으로 바꿀 수 없고, 풀리프 안의 혜택에 써요. 적립일로부터 2년 동안 유지돼요.</p></section>;
}

export function PlaygroundStory() {
  return <section id="play" className="pay-chapter pay-content-width"><div className="pay-chapter-heading pay-enter"><h2>잠깐의 여유,<br /><em>풀리프 놀이터</em></h2><p>게임도 하고, 번호도 만들고.</p></div><div className="pay-play-grid">{[
    ['memory', '넘버 센스', '잠깐 본 번호를 기억해 찾아내는 기억력 게임. 실패해도 이미 받은 포인트는 그대로예요.', ''],
    ['number', '번호 만들기', '35개 필터로 정성껏 선별한 풀리프 제공 번호, 그리고 나만의 번호를 직접 만드는 챔피언십.', ''],
    ['score', '럭키 스코어', '아쉬웠던 번호를 점수로 바꿔 보여드려요.', 'FULIF+'],
].map(([art, title, desc, note]) => <article className="pay-play-item pay-enter" key={art}><div className={`pay-play-art pay-play-${art}`}><Image src={`/images/benefits/${art}-art.png`} alt="" width={1024} height={1024} sizes="(max-width: 767px) 280px, (max-width: 1199px) 330px, 420px" quality={90} /></div><div className="pay-play-copy"><h3>{title}</h3><p>{desc}</p><div className="pay-play-actions">{note ? <span className="pay-detail-tag">{note}</span> : <span aria-hidden="true" />}<Link className="pay-play-more" href="/full-life#playground" aria-label={`${title} 자세히 보기`}><Icon name="arrow_forward" size={18} /></Link></div></div></article>)}</div><p className="pay-fine">번호 기능은 번호를 고르는 재미를 위한 것으로, 당첨 확률을 높여주지 않아요.</p><StoryLink href="/full-life#playground">Full Life에서 자세히 보기</StoryLink></section>;
}

export function MembershipDetails() {
  return <div id="plus" className="pay-content-width pay-plus-details"><div className="pay-plus-grid">{[
    ['한 회차 낙첨번호 등록', '20', '세트까지'], ['매 회차 풀리프 제공 번호', '10', '세트'], ['하루 광고 보기', '20', '회까지'], ['더 다양한 즐거움', '럭키 스코어 이용 · 챔피언십 참여 · FULIF+ 전용 이벤트', ''],
  ].map(([label, value, unit]) => <div key={label}><span>{label}</span><strong className={unit ? 'pay-plus-number' : 'pay-plus-exclusive'}>{value}{unit && <small>{unit}</small>}</strong></div>)}</div></div>;
}

export function PulliStory() {
  return <section id="pulli" className="pay-chapter pay-content-width pay-pulli-story"><div className="pay-chapter-heading pay-enter"><h2>이름에도 친구에게도<br /><em>행운을 담았습니다</em></h2><p>FULL + LIFE. 비어버린 순간을 다시 채워, 하루를 가득하게.<br />풀리는 네잎클로버와 작은 새싹을 닮은 풀리프의 친구예요.</p><div className="pay-trust-list pay-pulli-traits">{[
    ['auto_awesome', '네잎클로버', '행운의 상징에 한 가지를 더. 일상 속 작은 좋은 순간을 발견하는 마음이에요.'],
    ['favorite', '새싹', '새로운 가능성과 성장. 오늘의 작은 경험이 내일을 더 좋은 쪽으로 이끌어요.'],
  ].map(([icon, title, desc]) => <article key={title}><Icon name={icon} size={22} /><div><h3>{title}</h3><p>{desc}</p></div></article>)}</div></div><div className="pay-pulli-art"><span aria-hidden="true">FULL<br /><i>+</i> LIFE</span><Image src="/mascot/pulli-profile-v2.png" alt="네잎클로버와 새싹을 닮은 풀리프의 친구, 풀리" width={230} height={230} sizes="(max-width: 767px) 180px, (max-width: 1199px) 230px, 260px" /></div><p className="pay-pulli-signoff">평범한 오늘이 모여, 더 반짝이는 내일이 됩니다.<span>Have a Fuli Day!</span></p></section>;
}

export function DonationStory() {
  return <section id="donate" className="pay-chapter pay-content-width"><div className="pay-chapter-heading pay-enter"><p className="pay-kicker">함께하는 ONE MORE</p><h2>쓰지 않을 쿠폰이,<br />누군가에게는 <em>첫 선물이 돼요</em></h2><p>보관함에서 「기부」를 누르면, 아이들이 직접 가서 골라 쓸 수 있는 금액권이 모여 필요한 아이에게 전해져요.</p></div><div className="pay-join-banner"><div className="pay-enter"><span>기부 리워드</span><h3>기부하면 30P와<br />「기부천사」 배지를 드려요.</h3><p>매달, 어느 지역 아이 몇 명에게 쿠폰의 기쁨이 닿았는지 알려드릴게요.</p></div><Image src="/images/benefits/donate-art.png" alt="기부함 위의 파란 하트" width={1024} height={1024} sizes="(max-width: 767px) 260px, 320px" quality={90} /></div><p className="pay-fine">기부할 수 있는 쿠폰 — 편의점 · 제과점 · 생활용품점 · 패스트푸드 · 아이스크림 가게 금액권, 문화상품권 등 (만료까지 1개월 이상 남은 것)</p></section>;
}

export function TrustStory() {
  return <section id="promise" className="pay-chapter pay-content-width pay-trust-story" aria-labelledby="pay-trust-heading"><div className="pay-chapter-heading pay-enter"><h2 id="pay-trust-heading">풀리프가 지키는<br /><em>네 가지</em></h2></div><div className="pay-trust-list">{[
    ['verified', '모든 응모권은 같은 확률이에요', 'FULIF든 FULIF+든, 응모권 1개의 가치는 같아요.'],
    ['auto_awesome', '번호 기능은 재미를 위한 것이에요', '번호를 고르는 즐거움을 드릴 뿐, 당첨 확률을 높여주지 않아요.'],
    ['redeem', '포인트는 현금이 아니에요', '활동으로만 쌓이고, 풀리프 안에서만 써요.'],
    ['location_off', '필요한 것만 여쭤요', '상세 주소도, 실시간 위치도 묻지 않아요. 한 번 정한 생활권이면 충분해요.'],
  ].map(([icon, title, desc]) => <article className="pay-enter" key={icon}><Icon name={icon} size={23} /><div><h3>{title}</h3><p>{desc}</p></div></article>)}</div></section>;
}

export function StartStory() {
  return <section id="start" className="pay-start-story"><div className="pay-content-width pay-start-inner"><div className="pay-enter"><h2>오늘 끝난 것에,<br /><em>한 번 더.</em></h2></div><div className="pay-start-download pay-enter"><div className="pay-store-links"><GooglePlayBadge /><AppStoreBadge /></div><small>{OPEN_DATE} 오픈</small></div></div></section>;
}
