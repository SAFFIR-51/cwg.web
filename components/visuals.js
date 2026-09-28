import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from './Icon';
import { Phone } from './ui';

export function PageHero({ eyebrow, title, lead, children, visual, className = '' }) {
  return <section className={`page-hero ${className}`}>
    <div className="container hero-grid">
      <div className="hero-copy">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 className="h-display">{title}</h1>
        <p className="lead mt-7 max-w-xl">{lead}</p>
        {children}
      </div>
      <div className="hero-visual">{visual}</div>
    </div>
  </section>;
}

export function RewardArt() {
  return <div className="reward-art">
    <Image className="reward-sculpture" src="/images/one-more-sculpture.png" alt="쿠폰과 포인트를 표현한 블루 티켓 오브제" width={1254} height={1254} sizes="(max-width: 767px) 100vw, 680px" priority quality={90} />
    <div className="floating-reward reward-top"><span className="reward-icon"><Icon name="check" size={20} /></span><div><span>다 쓴 쿠폰도, 한 번 더</span><strong>사용완료하면 <b>10P</b></strong></div></div>
    <div className="floating-reward reward-bottom"><img src="/icons/gift.png" alt="" /><div><span>새로운 기회가 쌓이는 곳</span><strong>등록 5번 → 응모권 1개</strong></div></div>
    <span className="art-caption">A LITTLE MORE IN EVERY DAY.</span>
  </div>;
}

export function AppStage({ src = '/screens/home.png', label = '풀리프 앱 홈 화면', compact = false }) {
  return <div className={`app-stage ${compact ? 'compact' : ''}`}>
    <div className="stage-orbit" aria-hidden="true" />
    <span className="stage-word" aria-hidden="true">full life.</span>
    <Phone src={src} alt={label} />
    <div className="stage-note stage-note-one"><img src="/icons/coupon.png" alt="" /><div><small>내 쿠폰 · 내 티켓</small><strong>한 번 더 쓰기</strong></div></div>
    <div className="stage-note stage-note-two"><img src="/icons/gift.png" alt="" /><div><small>일상에서 발견하는</small><strong>새로운 기회</strong></div></div>
  </div>;
}

export function FoundVisual() {
  return <div className="found-visual">
    <div className="found-orbit orbit-one" /><div className="found-orbit orbit-two" /><div className="found-orbit orbit-three" />
    <div className="found-location"><Icon name="location_on" size={17} /> 내 생활권의 새로운 발견</div>
    <img src="/mascot/clover_search.png" alt="생활권 혜택을 찾는 풀리" className="found-mascot" />
    <div className="found-pin pin-one"><Icon name="storefront" size={26} /><span>편의점</span></div>
    <div className="found-pin pin-two"><Icon name="local_gas_station" size={26} /><span>주유소</span></div>
    <div className="found-pin pin-three"><Icon name="shopping_cart" size={26} /><span>마트</span></div>
    <div className="found-proof"><span className="status-dot" /> 확인한 혜택만, 날짜와 함께</div>
  </div>;
}

export function MembershipVisual() {
  return <div className="membership-visual" aria-label="FULIF+ 멤버십, 첫 달 무료">
    <div className="member-orbit" />
    <div className="member-card member-card-back" aria-hidden="true" />
    <div className="member-card"><div className="member-card-top"><b>fulif<span>+</span></b><Icon name="arrow_outward" size={30} /></div><p>하루를 채우는<br />조금 더 많은 가능성.</p><div className="member-card-bottom"><span>FULL LIFE MEMBERSHIP</span><Icon name="auto_awesome" size={24} /></div></div>
    <div className="member-trial"><span>첫 달은</span><strong>0<span>원</span></strong><small>월간 멤버십 첫 이용 시</small></div>
  </div>;
}

export function FeatureExplorer({ items }) {
  const [active, setActive] = useState(0);
  const item = items[active];
  const icons = ['coupon', 'lotto', 'vote-3d', 'gift'];
  function onKey(e, i) {
    let next;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % items.length;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i + items.length - 1) % items.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = items.length - 1;
    if (next !== undefined) { e.preventDefault(); setActive(next); document.getElementById(`feature-tab-${next}`)?.focus(); }
  }
  return <div className="feature-explorer">
    <div className="feature-tabs" role="tablist" aria-label="풀리프의 네 가지 기능" aria-orientation="vertical">
      {items.map((f, i) => <button key={f.title} id={`feature-tab-${i}`} type="button" role="tab" aria-selected={active === i} aria-controls="feature-panel" tabIndex={active === i ? 0 : -1} onKeyDown={(e) => onKey(e, i)} onClick={() => setActive(i)} className={`feature-tab ${active === i ? 'active' : ''}`}>
        <span className="feature-tab-number">0{i + 1}</span><img src={`/icons/${icons[i]}.png`} alt="" /><span><strong>{f.title}</strong><small>{f.sub}</small></span><Icon name="arrow_forward" size={22} />
      </button>)}
    </div>
    <div id="feature-panel" role="tabpanel" aria-labelledby={`feature-tab-${active}`} tabIndex={0} className="feature-panel">
      <div className="feature-panel-copy" key={item.title}><p className="eyebrow">{item.title}</p><h3>{item.sub}</h3><p>{item.desc}</p>{item.fine && <small>{item.fine}</small>}<Link href={['/full-life#one-more', '/full-life#lotto-one-more', '/full-life#vote', '/full-life#draw'][active]} className="explore-link">자세히 알아보기 <Icon name="arrow_outward" size={18} /></Link></div>
      <Phone src={item.shot} alt={`${item.title} 앱 화면`} />
    </div>
  </div>;
}

export function DayTimeline({ items }) {
  const [active, setActive] = useState(0);
  const times = ['08:00', '12:00', '18:00', '20:00', '20:30'];
  const images = ['benefits/vote-art', 'benefits/coupon-art', 'subpages/neighborhood-art', 'benefits/ticket-art', 'benefits/score-art'];
  return <div className="day-experience">
    <div className="day-switcher" aria-label="하루의 순간 선택">{items.map(([time], i) => <button type="button" key={time} onClick={() => setActive(i)} aria-pressed={active === i} className={active === i ? 'active' : ''}><span className="day-step-dot" /><span>{time}</span></button>)}</div>
    <div className="day-detail" aria-live="polite"><div><span className="day-time">{times[active]}</span><p className="eyebrow">{items[active][0]}</p><h3>{items[active][1]}</h3><p className="lead">{items[active][2]}</p></div><Image src={`/images/${images[active]}.png`} width={320} height={320} sizes="(max-width: 767px) 210px, 290px" alt="" /></div>
  </div>;
}
