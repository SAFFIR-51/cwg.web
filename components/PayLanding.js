import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Seo from './Seo';
import Icon from './Icon';
import useLandingReveal from './useLandingReveal';
import { AppStoreBadge, GooglePlayBadge } from './StoreBadges';
import { OPEN_DATE } from '../lib/site';
import { StoryIcon, StoryLink, MoreServices, FlowStory, PointsStory, PlaygroundStory, MembershipDetails, PulliStory, DonationStory, TrustStory, StartStory } from './PayLandingSections';

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
    <div className="pay-hero-content"><span className="pay-hero-eyebrow">FULIF · 풀리프</span><h1>생활의 가치를,<br />한 번 더.</h1><p>쿠폰 · 티켓 · 번호로 시작해, 생활 혜택을 찾아주는 AI 리워드 플랫폼</p><p className="pay-hero-body">받아두고 잊은 쿠폰도, 다녀온 날의 티켓도, 아쉽게 끝난 번호도.<br />끝난 줄 알았던 것들이 응모권으로, 포인트로, 내 생활 혜택으로 돌아와요.</p><div className="pay-store-links"><GooglePlayBadge /><AppStoreBadge /></div><small className="pay-hero-note">{OPEN_DATE} 오픈</small></div>
  </section>;
}

function Overview() {
  return <section id="one-more" className="pay-wide pay-wide-left pay-overview">
    <Link href="/full-life" className="pay-media pay-overview-media" aria-label="풀리프 서비스 자세히 보기"><span className="pay-media-word" aria-hidden="true">ONE MORE</span><div className="pay-overview-devices"><Device screen="one-more" alt="내 쿠폰과 티켓을 관리하는 ONE MORE 화면" className="pay-overview-back" /><Device screen="home" alt="풀리프의 서비스를 모아 보는 앱 홈 화면" className="pay-overview-front" /></div></Link>
    <div className="pay-section-copy pay-enter"><span className="pay-overview-icon" aria-hidden="true"><StoryIcon name="ticket" hero /></span><p className="pay-kicker">ONE MORE</p><h2>끝난 줄 알았던 것들에,<br /><em>ONE MORE</em></h2><p className="pay-description">쿠폰은 쓰면 끝, 티켓은 다녀오면 끝, 번호는 발표가 나면 끝.<br />풀리프에서는 그 끝이 한 번 더의 시작이에요.</p><ul className="pay-one-more-list">{[
      ['쿠폰', '만료 전에 챙기고, 다 쓰면 포인트로'],
      ['티켓', '다녀온 날의 기록이 응모 기회로'],
      ['번호', '아쉬운 번호가 경품 응모권으로'],
    ].map(([title, desc]) => <li key={title} className="pay-detail-tag"><strong>{title}</strong> · {desc}</li>)}</ul><Arrow href="/full-life" label="풀리프 서비스 알아보기" /></div>
  </section>;
}

function ServicePair() {
  return <>
  <div id="app" className="pay-content-width pay-chapter-heading pay-app-heading pay-enter"><h2>앱을 열면,<br /><em>네 가지가 기다려요</em></h2><p>풀리프 홈 화면 그대로예요. 하나씩 소개할게요.</p></div>
  <div id="rewards" className="pay-pair pay-content-width pay-primary-services">
    <section id="app-one-more" className="pay-pair-column pay-pair-lower">
      <div className="pay-pair-copy pay-enter"><p className="pay-kicker">ONE MORE</p><h2>내 쿠폰 · 내 티켓,<br /><em>한 번 더 쓰기</em></h2><p className="pay-description">받은 쿠폰을 사진이나 공유로 등록하면 보관함에 모이고, 만료 전에 알려드려요. 등록할 때마다 응모 기회가 한 칸씩 채워지고, 다섯 칸이 차면 응모권 1개. 다 쓴 쿠폰은 사용완료로 바꾸면 10P, 다녀온 티켓은 등록하면 바로 10P.</p><Arrow href="/full-life#one-more" label="쿠폰과 티켓 ONE MORE 알아보기" /></div>
      <Link href="/full-life#one-more" className="pay-media pay-coupon-media" aria-label="ONE MORE 서비스 자세히 보기"><Device screen="one-more" alt="쿠폰 등록과 만료 알림을 제공하는 풀리프 ONE MORE 화면" /><div className="pay-coupon-floats" aria-hidden="true"><span><Icon name="confirmation_number" size={33} /><b>내 쿠폰</b></span><span><Icon name="redeem" size={33} /><b>내 티켓</b></span><span><Icon name="favorite" size={33} /><b>쿠폰 기부</b></span></div></Link>
    </section>
    <section id="lotto-one-more" className="pay-pair-column">
      <div className="pay-pair-copy pay-enter"><p className="pay-kicker">낙첨 ONE MORE</p><h2>아쉬운 내 번호,<br />이번 주를 <em>한 번 더</em></h2><p className="pay-description">지난 회차 번호를 사진으로 등록하고, 브랜드 파트너의 짧은 영상을 한 편 보면 경품 응모권 1개. 등록한 번호는 1세트마다 10P도 쌓여요. 등록은 매주 토요일 21:00부터 화요일 20:00까지예요.</p><Arrow href="/full-life#lotto-one-more" label="낙첨 ONE MORE 알아보기" /></div>
      <Link href="/full-life#lotto-one-more" className="pay-media pay-lotto-media" aria-label="낙첨번호 등록과 경품 응모 알아보기"><Device screen="lotto-one-more" alt="지난 회차 번호를 등록하는 낙첨 ONE MORE 앱 화면" /><div className="pay-message pay-message-first" aria-hidden="true">지난 회차 번호를 등록했어요</div><div className="pay-message pay-message-second" aria-hidden="true">광고 한 편 보면 응모권 1개!</div><span className="pay-message-answer" aria-hidden="true">한 번 더 응모하기 <Icon name="arrow_forward" size={17} /></span></Link>
    </section>
  </div>
  </>;
}

function Membership() {
  return <section id="membership" className="pay-membership" aria-labelledby="pay-membership-title">
    <div className="pay-membership-display pay-content-width">
      <div className="pay-membership-words pay-enter">
        <span className="pay-membership-wordmark" aria-label="풀리프 플러스">fulif<span>+</span></span>
        <h2 id="pay-membership-title">풀리프를 더 알차게,<br />FULIF+</h2>
        <p className="pay-membership-price">첫 달은 무료로 써보고 결정하세요.</p>
        <p className="pay-membership-price"><strong>월간 5,000원</strong><span>첫 달 무료</span></p>
        <div className="pay-membership-actions"><Link href="/download" className="pay-membership-cta">1개월 무료로 시작하기<Icon name="arrow_forward" size={19} /></Link><Link href="/membership" className="pay-membership-cta">멤버십 보기<Icon name="arrow_forward" size={19} /></Link></div>
      </div>
      <div className="pay-membership-card">
        <div className="plus-pass">
          <div><b>fulif<span>+</span></b></div>
          <p>생활의 가치를,<br />한 번 더 넉넉하게.</p>
          <span>ONE MORE POSSIBILITY. FULLER EVERY DAY.</span>
          <i aria-hidden="true">+</i>
        </div>
      </div>
    </div>
    <MembershipDetails />
    <p className="pay-membership-note">무료 체험은 한 번만 받을 수 있어요. 체험이 끝나면 매월 5,000원이 자동으로 결제되고,<br />결제 3일 전에 미리 알려드려요. 체험 중에 해지하면 결제되지 않아요.</p>
  </section>;
}

function Found() {
  return <section id="found" className="pay-wide pay-wide-left pay-found"><Link href="/found-ai" className="pay-media pay-found-media" aria-label="FOUND AI 생활권 혜택 알아보기"><Image src="/images/bright/found-neighborhood-3d-v2.png" alt="블루와 화이트로 표현한 동네 상점과 주유소의 3D 이미지" quality={95} fill sizes="(max-width: 767px) 100vw, 50vw" /><div className="pay-found-wash" /><Device screen="found" alt="생활권의 편의점과 마트 혜택을 보여주는 FOUND AI 앱 화면" /><span className="pay-map-pin pay-pin-one" aria-hidden="true"><Icon name="storefront" size={24} /></span><span className="pay-map-pin pay-pin-two" aria-hidden="true"><Icon name="local_cafe" size={24} /></span><span className="pay-map-pin pay-pin-three" aria-hidden="true"><Icon name="local_gas_station" size={24} /></span></Link><div className="pay-section-copy pay-enter"><p className="pay-kicker">FOUND AI</p><h2>찾지 않아도,<br /><em>먼저 찾아와요</em></h2><p className="pay-description">내 생활권의 편의점 · 마트 · 주유소 혜택을 풀리가 찾아 정리해 드려요.</p><div className="pay-trust-list pay-found-promises">{[
    ['search_off', '찾지 않으셔도 돼요', '회원님이 검색하지 않아도 풀리프가 먼저 찾아 정리해 드려요.'],
    ['verified', '없는 혜택은 만들지 않아요', '확인된 것만 올려요. 확인한 날짜를 함께 적어드려요.'],
    ['location_off', '위치를 따라다니지 않아요', '한 번 정하신 지역만 사용하고, 실시간 위치는 보지 않아요.'],
  ].map(([icon, title, desc]) => <article key={icon}><Icon name={icon} size={22} /><div><h3>{title}</h3><p>{desc}</p></div></article>)}</div><p className="pay-fine">지금은 편의점 · 마트 · 주유소 혜택부터 찾아드려요. 찾는 곳은 차차 늘려갈게요.</p><StoryLink href="/found-ai">FOUND AI 자세히 보기</StoryLink></div></section>;
}

function Partners() {
  return <section id="partners" className="pay-wide pay-wide-right pay-partners"><div className="pay-section-copy pay-enter"><p className="pay-kicker">Ad Scale</p><h2>우리는 회원에게 광고를 보여드리는 것이 아니라,<br /><em>브랜드와 함께 혜택을 만듭니다.</em></h2><p className="pay-description">회원이 본 광고 한 편이, 그대로 회원의 응모권과 포인트가 됩니다. 브랜드와 회원이 같은 편에 서는 광고. 풀리프가 일하는 방식입니다.</p><dl className="pay-scale-stats">{[
    ['10', '', '광고 카테고리'], ['월 1', '회', '브랜드 분석'], ['8', '', '광고 노출 화면'], ['독점 1', '사', '카테고리당 광고주'],
  ].map(([value, unit, label]) => <div key={label}><dt>{label}</dt><dd>{value}{unit && <small>{unit}</small>}</dd></div>)}</dl><p className="pay-description"><strong>풀리프 회원에게, 브랜드를 전하세요</strong></p><StoryLink href="/partners">문의</StoryLink></div><Link href="/partners" className="pay-media pay-partner-media" aria-label="풀리프 브랜드 파트너십 알아보기"><Image src="/images/bright/partner-rewards-3d-v2.png" alt="파란 리본의 선물 상자와 쇼핑백, 쿠폰으로 표현한 브랜드 혜택" quality={95} fill sizes="(max-width: 767px) 100vw, 50vw" /><span className="pay-partner-caption">FULIF × YOUR BRAND</span></Link></section>;
}

export default function PayLanding() {
  const root = useRef(null);
  useLandingReveal(root);

  return <><Seo /><div ref={root} className="pay-landing"><Hero /><div className="pay-services"><div className="pay-page-grid" aria-hidden="true"><i /><i /><i /></div><Overview /><ServicePair /><MoreServices Device={Device} Arrow={Arrow} /><FlowStory /><Found /><PointsStory /><PlaygroundStory /><Membership /><div className="pay-after-plus"><PulliStory /><DonationStory /><TrustStory /><Partners /><StartStory /></div></div></div></>;
}
