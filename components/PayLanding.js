import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Seo from './Seo';
import Icon from './Icon';
import { BrandSymbol } from './Brand';
import useLandingReveal from './useLandingReveal';
import { AppStoreBadge, GooglePlayBadge } from './StoreBadges';
import { StoryIcon, MoreServices, PointsStory, PlaygroundStory, MembershipDetails, PulliStory, TrustStory, StartStory } from './PayLandingSections';

function Arrow({ href, label, className = '' }) {
  return <Link href={href} className={`pay-arrow ${className}`} aria-label={label}><Icon name="arrow_forward" size={23} /></Link>;
}

function Device({ screen, alt, className = '', priority = false }) {
  return <div className={`pay-device ${className}`}><div className="pay-device-bar" aria-hidden="true"><span>9:41</span><span className="pay-device-island" /><span className="pay-device-status">▮▮▮ <i /></span></div><div className="pay-device-screen"><Image src={`/screens/${screen}.png`} alt={alt} width={780} height={1688} sizes="(max-width: 767px) 240px, (max-width: 1199px) 310px, 330px" priority={priority} /></div></div>;
}

function Hero() {
  return <section id="intro" className="pay-hero" aria-label="풀리프 소개">
    <div className="pay-hero-aura" aria-hidden="true" />
    <div className="pay-hero-outline" aria-hidden="true" />
    <div className="pay-hero-grid" aria-hidden="true"><i /><i /><i /></div>
    <div className="pay-hero-content"><h1>생활의 가치를,<br />한 번 더.</h1><p>쿠폰부터 티켓까지, 일상이 혜택이 되는 풀리프</p><div className="pay-store-links"><AppStoreBadge /><GooglePlayBadge /></div></div>
  </section>;
}

function Overview() {
  return <section id="services" className="pay-wide pay-wide-left pay-overview">
    <Link href="/full-life" className="pay-media pay-overview-media" aria-label="풀리프 서비스 자세히 보기"><span className="pay-media-word" aria-hidden="true">ONE MORE</span><div className="pay-overview-devices"><Device screen="one-more" alt="내 쿠폰과 티켓을 관리하는 ONE MORE 화면" className="pay-overview-back" /><Device screen="home" alt="풀리프의 서비스를 모아 보는 앱 홈 화면" className="pay-overview-front" /></div></Link>
    <div className="pay-section-copy pay-enter"><span className="pay-overview-icon" aria-hidden="true"><StoryIcon name="ticket" hero /></span><h2>일상의 모든 혜택<br /><em>한 번 더</em> 모아요</h2><p className="pay-description">쿠폰·티켓·번호부터 매일의 작은 참여까지.<br />이미 가진 일상에서 새로운 가치를 발견해요.</p><Arrow href="/full-life" label="풀리프 서비스 알아보기" /></div>
  </section>;
}

function ServicePair() {
  return <div id="rewards" className="pay-pair pay-content-width pay-primary-services">
    <section id="one-more" className="pay-pair-column pay-pair-lower">
      <div className="pay-pair-copy pay-enter"><h2>다 쓴 쿠폰도, 지난 티켓도<br /><em>새로운 혜택</em>이 되도록</h2><Arrow href="/full-life#one-more" label="쿠폰과 티켓 ONE MORE 알아보기" /></div>
      <Link href="/full-life#one-more" className="pay-media pay-coupon-media" aria-label="ONE MORE 서비스 자세히 보기"><Device screen="one-more" alt="쿠폰 등록과 만료 알림을 제공하는 풀리프 ONE MORE 화면" /><div className="pay-coupon-floats" aria-hidden="true"><span><Icon name="confirmation_number" size={33} /><b>내 쿠폰</b></span><span><Icon name="redeem" size={33} /><b>내 티켓</b></span><span><Icon name="favorite" size={33} /><b>쿠폰 기부</b></span></div></Link>
    </section>
    <section id="lotto-one-more" className="pay-pair-column">
      <div className="pay-pair-copy pay-enter"><h2>아쉬웠던 내 번호<br />이번 주를 <em>한 번 더</em></h2><Arrow href="/full-life#lotto-one-more" label="낙첨 ONE MORE 알아보기" /></div>
      <Link href="/full-life#lotto-one-more" className="pay-media pay-lotto-media" aria-label="낙첨번호 등록과 경품 응모 알아보기"><Device screen="lotto-one-more" alt="지난 회차 번호를 등록하는 낙첨 ONE MORE 앱 화면" /><div className="pay-message pay-message-first" aria-hidden="true">지난 회차 번호를 등록했어요</div><div className="pay-message pay-message-second" aria-hidden="true">광고 한 편 보면 응모권 1개!</div><span className="pay-message-answer" aria-hidden="true">한 번 더 응모하기 <Icon name="arrow_forward" size={17} /></span></Link>
    </section>
  </div>;
}

function Membership() {
  return <section id="membership" className="pay-membership" aria-labelledby="pay-membership-title">
    <div className="pay-membership-display pay-content-width">
      <div className="pay-membership-words pay-enter">
        <span className="pay-membership-wordmark" aria-label="풀리프 플러스">fulif<span>+</span></span>
        <h2 id="pay-membership-title">첫 달은 가볍게<br />혜택은 더 넉넉하게</h2>
        <p className="pay-membership-price"><strong>첫 달 무료</strong><span>이후 월 5,000원</span></p>
        <Link href="/membership" className="pay-membership-cta">FULIF+ 알아보기<Icon name="arrow_forward" size={19} /></Link>
      </div>
      <div className="pay-membership-card">
        <div className="plus-pass">
          <div><BrandSymbol className="w-10 h-11" /><b>fulif<span>+</span></b></div>
          <p>생활의 가치를,<br />한 번 더 넉넉하게.</p>
          <span>ONE MORE POSSIBILITY. FULLER EVERY DAY.</span>
          <i aria-hidden="true">+</i>
        </div>
      </div>
    </div>
    <MembershipDetails />
    <p className="pay-membership-note">무료 체험 1회 · 이후 매월 5,000원 자동 결제 · 결제 3일 전 안내<br />체험 중 해지하면 결제되지 않아요.</p>
  </section>;
}

function Found() {
  return <section id="found" className="pay-wide pay-wide-left pay-found"><Link href="/found-ai" className="pay-media pay-found-media" aria-label="FOUND AI 생활권 혜택 알아보기"><Image src="/images/bright/found-neighborhood-3d-v2.png" alt="블루와 화이트로 표현한 동네 상점과 주유소의 3D 이미지" quality={95} fill sizes="(max-width: 767px) 100vw, 50vw" /><div className="pay-found-wash" /><Device screen="found" alt="생활권의 편의점과 마트 혜택을 보여주는 FOUND AI 앱 화면" /><span className="pay-map-pin pay-pin-one" aria-hidden="true"><Icon name="storefront" size={24} /></span><span className="pay-map-pin pay-pin-two" aria-hidden="true"><Icon name="local_cafe" size={24} /></span><span className="pay-map-pin pay-pin-three" aria-hidden="true"><Icon name="local_gas_station" size={24} /></span></Link><div className="pay-section-copy pay-enter"><h2>가까운 생활 혜택도<br /><em>놓칠 수 없죠!</em></h2><p className="pay-description">내 생활권의 편의점·마트·주유소 혜택.<br />찾지 않아도, 풀리가 먼저 찾아와요.</p><Arrow href="/found-ai" label="FOUND AI 자세히 보기" /></div></section>;
}

function Partners() {
  return <section id="partners" className="pay-wide pay-wide-right pay-partners"><div className="pay-section-copy pay-enter"><h2>함께 만든 혜택을<br />모두가 누리는 <em>특별한 경험</em></h2><p className="pay-description">AD SCALE로 브랜드와 함께 혜택을 만듭니다.<br />회원이 본 광고 한 편이 응모권과 포인트가 됩니다.<br />브랜드와 회원이 함께 만드는 일상의 혜택입니다.</p><Arrow href="/partners" label="브랜드 파트너 문의하기" /></div><Link href="/partners" className="pay-media pay-partner-media" aria-label="풀리프 브랜드 파트너십 알아보기"><Image src="/images/bright/partner-rewards-3d-v2.png" alt="파란 리본의 선물 상자와 쇼핑백, 쿠폰으로 표현한 브랜드 혜택" quality={95} fill sizes="(max-width: 767px) 100vw, 50vw" /><span className="pay-partner-caption">FULIF × YOUR BRAND</span></Link></section>;
}

export default function PayLanding() {
  const root = useRef(null);
  useLandingReveal(root);

  return <><Seo /><div ref={root} className="pay-landing"><Hero /><div className="pay-services"><div className="pay-page-grid" aria-hidden="true"><i /><i /><i /></div><Overview /><ServicePair /><MoreServices Device={Device} Arrow={Arrow} /><PointsStory /><PlaygroundStory /><Membership /><div className="pay-after-plus"><Found /><Partners /><TrustStory /><PulliStory /><StartStory /></div></div></div></>;
}
