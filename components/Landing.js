import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Seo from './Seo';
import Icon from './Icon';
import useLandingReveal from './useLandingReveal';
import { AppStoreBadge, GooglePlayBadge } from './StoreBadges';
import { OPEN_DATE } from '../lib/site';
import { StoryIcon, StoryLink, FlowStory, PulliStory, StartStory } from './LandingSections';

function Arrow({ href, label, className = '' }) {
  return <Link href={href} className={`fulif-arrow ${className}`} aria-label={label}><Icon name="arrow_forward" size={23} /></Link>;
}

function Device({ screen, alt, className = '', priority = false }) {
  return <div className={`fulif-device ${className}`}><div className="fulif-device-bar" aria-hidden="true"><span>9:41</span><span className="fulif-device-island" /><span className="fulif-device-status">▮▮▮ <i /></span></div><div className="fulif-device-screen"><Image src={`/screens/${screen}.png`} alt={alt} width={780} height={1688} sizes="(max-width: 767px) 240px, (max-width: 1199px) 310px, 330px" priority={priority} /></div></div>;
}

function Hero() {
  return <section id="intro" className="fulif-hero" aria-label="풀리프 소개">
    <div className="fulif-hero-aura" aria-hidden="true" />
    <div className="fulif-hero-content"><span className="fulif-hero-eyebrow">FULIF · 풀리프</span><h1>생활의 가치를<br /><span className="fulif-slogan-accent">한 번 더</span></h1><p>쿠폰 · 티켓 · 주유 영수증 · 낙첨 번호까지,<br />일상의 기록을 생활 혜택으로 바꿔주는 AI 리워드 플랫폼</p><p className="fulif-hero-body">그냥 지나칠 뻔한 것들을 한곳에 모아 두세요.<br />응모권으로, 포인트로, 내 생활권의 혜택으로 다시 돌아와요.</p><div className="fulif-store-links"><GooglePlayBadge /><AppStoreBadge /></div><small className="fulif-hero-note">{OPEN_DATE} 오픈 · 만 19세 이상 이용할 수 있어요</small></div>
  </section>;
}

function Overview() {
  return <section id="one-more" className="fulif-wide fulif-wide-left fulif-overview">
    <Link href="/full-life" className="fulif-media fulif-overview-media" aria-label="풀리프 서비스 자세히 보기"><span className="fulif-media-word" aria-hidden="true">ONE MORE</span><div className="fulif-overview-devices"><Device screen="one-more" alt="내 쿠폰과 티켓을 관리하는 ONE MORE 화면" className="fulif-overview-back" /><Device screen="home" alt="풀리프의 서비스를 모아 보는 앱 홈 화면" className="fulif-overview-front" /></div></Link>
    <div className="fulif-section-copy fulif-enter"><span className="fulif-overview-icon" aria-hidden="true"><StoryIcon name="ticket" hero /></span><p className="fulif-kicker">ONE MORE</p><h2>끝난 줄 알았던 것들에,<br /><em>ONE MORE</em></h2><p className="fulif-description">쿠폰은 쓰면 끝, 티켓과 주유 영수증은 다녀오면 끝, 낙첨 번호는 발표가 나면 끝.<br />풀리프에서는 그 끝이 한 번 더의 시작이에요.</p><ul className="fulif-one-more-list">{[
      ['쿠폰', '만료 전에 챙기고, 등록하면 응모 기회, 다 쓰면 포인트로'],
      ['티켓', '다녀온 날의 기록이 응모 기회로'],
      ['주유 영수증', '주유한 날의 영수증도 응모 기회로'],
      ['낙첨 번호', '아쉬운 번호가 경품 응모권으로'],
    ].map(([title, desc]) => <li key={title} className="fulif-detail-tag"><strong>{title}</strong> · {desc}</li>)}</ul><Arrow href="/full-life" label="풀리프 서비스 알아보기" /></div>
  </section>;
}

function Partners() {
  return <section id="partners" className="fulif-wide fulif-wide-right fulif-partners"><div className="fulif-section-copy fulif-enter"><p className="fulif-kicker">Ad Scale</p><h2>우리는 회원에게 광고를 보여드리는 것이 아니라,<br /><em>브랜드와 함께 혜택을 만듭니다.</em></h2><p className="fulif-description">회원이 만난 광고 카드와 광고 영상 하나하나가, 그대로 회원의 응모권과 포인트가 됩니다. 브랜드와 회원이 같은 편에 서는 광고. 풀리프가 일하는 방식입니다.</p><dl className="fulif-scale-stats">{[
    ['10', '', '광고 카테고리'], ['월 1', '회', '브랜드 분석'], ['8', '', '광고 노출 화면'], ['독점 1', '사', '카테고리당 광고주'],
  ].map(([value, unit, label]) => <div key={label}><dt>{label}</dt><dd>{value}{unit && <small>{unit}</small>}</dd></div>)}</dl><p className="fulif-description"><strong>풀리프 회원에게, 브랜드를 전하세요</strong></p><StoryLink href="/partners">문의</StoryLink></div><Link href="/partners" className="fulif-media fulif-partner-media" aria-label="풀리프 브랜드 파트너십 알아보기"><Image src="/images/bright/partner-rewards-3d-v2.png" alt="파란 리본의 선물 상자와 쇼핑백, 쿠폰으로 표현한 브랜드 혜택" quality={95} fill sizes="(max-width: 767px) 100vw, 50vw" /><span className="fulif-partner-caption">FULIF × YOUR BRAND</span></Link></section>;
}

export default function Landing() {
  const root = useRef(null);
  useLandingReveal(root);

  return <><Seo /><div ref={root} className="fulif-landing"><Hero /><div className="fulif-services"><div className="fulif-page-grid" aria-hidden="true"><i /><i /><i /></div><Overview /><FlowStory /><div className="fulif-after-plus"><PulliStory /><Partners /><StartStory /></div></div></div></>;
}
