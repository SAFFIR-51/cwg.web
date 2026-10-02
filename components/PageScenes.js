import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { BrandWordmark } from './Brand';
import { Phone } from './ui';
import { Art } from './SubpageDesign';

export function EditorialImage({ name, alt = '', className = '', priority = false, sizes = '(max-width: 767px) 100vw, 1200px' }) {
  const square = name === 'member-pass' || name === 'partner-gift';
  return <Image src={`/images/editorial/${name}.png`} alt={alt} width={square ? 1254 : 1536} height={square ? 1254 : 1024} sizes={sizes} priority={priority} quality={90} className={`editorial-image ${className}`} />;
}

export function ServiceOpening() {
  return <header className="service-opening">
    <div className="service-opening-heading"><div><p className="sub-eyebrow">Full Life</p><h1>Full Life,<br />풀리프로 채우는<br />하루</h1></div><div><p>쿠폰부터 경품 추첨, 놀이터까지.<br />앱에서 할 수 있는 모든 것을 한 번에 보여드려요.</p></div></div>
    <div className="service-life-photo"><Image src="/images/bright/everyday-still-life.png" alt="밝은 창가에 놓인 커피, 티켓과 파란 장바구니" fill priority sizes="(max-width: 767px) 100vw, 1440px" quality={90} /><div className="life-notification"><span><Art name="coupon" sizes="75px" /></span><div><small>FULIF · 내 쿠폰</small><strong>잊기 전에, 커피 한 잔 어때요?</strong><p>카페 쿠폰이 이틀 뒤 만료돼요.</p></div><time>D−2</time></div><span className="photo-caption">YOUR EVERYDAY, ONE MORE.</span></div>
  </header>;
}

export function CouponWallet() {
  return <div className="coupon-wallet-scene" aria-label="쿠폰과 티켓을 모으면 등록 다섯 번마다 응모권 한 개">
    <div className="wallet-title"><span>내 쿠폰 · 내 티켓</span><Icon name="add" size={24} /></div>
    <div className="wallet-item"><Art name="coupon" sizes="170px" /><div><small>쿠폰</small><h3>아직 남아 있는<br />커피 한 잔의 여유</h3><span className="wallet-expiry">만료 이틀 전, 먼저 알려드려요</span></div></div>
    <div className="wallet-item wallet-ticket"><Art name="ticket" sizes="170px" /><div><small>티켓</small><h3>다녀온 날의 기억도<br />차곡차곡</h3><b>등록하면 10P</b></div></div>
    <div className="wallet-progress"><div>{[1,2,3,4].map(n=><span key={n}><Icon name="check" size={18} /></span>)}<span className="wallet-last"><Icon name="confirmation_number" size={20} /></span></div><p>등록 <b>5번</b>이면, 응모권 <b>1개</b></p></div>
  </div>;
}

export function VotePreview() {
  const [choice,setChoice]=useState('');
  return <div className="vote-preview"><Art name="vote" sizes="230px" /><small>오늘의 한 표 · 웹 체험 예시</small><h3>잠깐의 여유가 생긴다면?</h3><div>{['커피 한 잔의 여유','좋아하는 음악 한 곡'].map((t,i)=><button key={t} type="button" aria-pressed={choice===t} onClick={()=>setChoice(t)}><Icon name={i ? 'music_note' : 'local_cafe'} size={23} />{t}<span>{choice===t ? <Icon name="check_circle" size={23} /> : <Icon name="chevron_right" size={21} />}</span></button>)}</div><p aria-live="polite">{choice ? '골랐어요! 실제 참여와 포인트 적립은 앱에서 진행돼요.' : '정답은 없어요. 지금 내 마음을 골라보세요.'}</p><b>하루 세 번 고르면 <em>30P</em></b></div>;
}

export function NeighborhoodExplorer() {
  return <div className="neighborhood-explorer neighborhood-clean"><div className="neighborhood-image"><EditorialImage name="found-town" alt="편의점, 마트, 주유소가 모인 생활권을 표현한 일러스트" priority /></div><div className="found-hero-phone"><Phone src="/screens/found.png" alt="FOUND AI의 실제 생활권 혜택 앱 화면" /></div></div>;
}

export function MembershipOpening() {
  return <header className="membership-opening"><div className="membership-orbit" aria-hidden="true" /><div className="membership-opening-copy"><span className="member-wordmark">fulif<span>+</span></span><p className="sub-eyebrow">멤버십</p><h1>풀리프를<br />더 알차게,<br />FULIF+</h1><p>첫 달은 무료로 써보고 결정하세요. 마음에 들지 않으면<br />체험 중에 해지하면 돼요. 결제는 되지 않아요.</p><Link href="/download" className="btn-primary">앱에서 1개월 무료로 시작하기 <Icon name="arrow_forward" size={19} /></Link><small>구독은 앱에서 시작하고, Google Play · App Store 구독 관리에서 해지할 수 있어요.</small></div><div className="membership-pass-art"><EditorialImage name="member-pass" priority sizes="(max-width: 767px) 100vw, 650px" /><span className="member-pass-label">ONE MORE POSSIBILITY.</span></div><div className="membership-opening-bottom"><span>월간 멤버십</span><strong>첫 달 <b>0</b>원 <i>이후 월 5,000원</i></strong><a href="#plans">결제 안내 <Icon name="arrow_downward" size={17} /></a></div></header>;
}

export function PartnerOpening() {
  return <header className="partner-opening"><div className="partner-opening-top"><p className="sub-eyebrow"><Link href="/" aria-label="홈"><Icon name="home" size={14} /></Link> › 브랜드 파트너 문의 · B2B · Partner Program</p><div><h1>Partners</h1><p>Ad &amp; Sponsorship Inquiry</p></div></div><div className="partner-photo"><Image src="/images/bright/partner-counter.png" alt="밝은 카페 카운터에 놓인 파란 커피 컵과 작은 선물" fill priority sizes="100vw" quality={90} /></div></header>;
}

export function PartnerJourney() {
  return <section className="partner-journey"><div className="partner-journey-intro"><p className="sub-eyebrow">THE WAY WE CONNECT</p><h2>브랜드의 좋은 제품이<br />누군가의 반가운 하루로.</h2><p>화려한 약속보다, 지금 함께할 수 있는 것부터.<br />풀리프의 일상 속에 브랜드를 자연스럽게 연결합니다.</p></div><div className="partner-journey-stage"><div className="journey-brand"><BrandWordmark className="w-[73px] h-8" /><small>FULIF × YOUR BRAND</small><h3>우리 브랜드의<br />새로운 접점</h3><EditorialImage name="partner-gift" sizes="380px" /></div><div className="journey-arrow" aria-hidden="true"><Icon name="arrow_forward" size={28} /></div><div className="journey-experience"><span>회원의 하루</span><div><Art name="watch" sizes="85px" /><p>브랜드를 발견하고<small>짧은 영상으로 만나는 브랜드</small></p></div><div><Art name="ticket" sizes="85px" /><p>기대하며 참여하고<small>경품 응모권으로 이어지는 관심</small></p></div><div><Art name="coupon" sizes="85px" /><p>반가운 혜택으로 기억해요<small>브랜드 제품이 경품이 되는 경험</small></p></div></div></div></section>;
}

export function DownloadPhones() {
  return <div className="download-phone-gallery"><span className="download-orbit orbit-one" /><span className="download-orbit orbit-two" /><div className="download-phone-side"><Phone src="/screens/one-more.png" alt="쿠폰과 티켓을 모으는 ONE MORE 화면" /></div><div className="download-phone-main"><Phone src="/screens/home.png" alt="풀리프 앱 홈 화면" /></div><div className="download-phone-side"><Phone src="/screens/found.png" alt="내 생활권 혜택을 확인하는 FOUND AI 화면" /></div><span className="download-floating download-floating-points"><Art name="points" sizes="180px" /><b>반가워요, 100P</b></span><span className="download-floating download-floating-ticket"><Art name="ticket" sizes="175px" /></span></div>;
}
