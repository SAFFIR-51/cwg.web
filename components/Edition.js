import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { Phone } from './ui';
import { ArrowLink, Art } from './SubpageDesign';
import ScrollStory from './ScrollStory';

export function PulliNote({ children, mood = 'hello', className = '' }) {
  const src = mood === 'search' ? '/mascot/clover_search.png' : '/mascot/pulli-profile-v2.png';
  return <aside className={`pulli-note ${className}`}><Image src={src} alt="풀리" width={88} height={88} sizes="88px" /><div><span>풀리의 한마디</span><p>{children}</p></div></aside>;
}

export function SectionNav({ label, items }) {
  const [active, setActive] = useState(items[0][0]);
  const key = items.map(item => item[0]).join('|');
  useEffect(() => {
    const ids = key.split('|');
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * .4) current = id;
      }
      setActive(current);
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request); update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', request); window.removeEventListener('resize', request); };
  }, [key]);
  return <nav className="edition-section-nav" aria-label={label}><div>{items.map(([id, title]) => <a href={`#${id}`} key={id} aria-current={active === id ? 'location' : undefined}>{title}</a>)}</div></nav>;
}

export function BrandIntroduction() {
  return <section id="brand" className="brand-introduction" aria-labelledby="brand-intro-heading">
    <div className="brand-intro-top"><div className="reveal"><p className="edition-eyebrow">FULL LIFE, ONE MORE</p><h2 id="brand-intro-heading">끝이 아니라,<br /><span>다음의 시작.</span></h2><p className="edition-lead">쿠폰은 쓰면 끝, 티켓은 다녀오면 끝.<br />풀리프에서는 그 끝이<br />한 번 더의 시작이에요.</p></div><div className="brand-loop-art reveal"><Image src="/images/edition/one-more-sculpture.png" alt="티켓이 새로운 시작으로 이어지는 파란 고리 조형물" width={1536} height={1024} sizes="(max-width: 767px) 100vw, 650px" quality={90} /></div></div>
    <div className="brand-three-steps">{[
      ['01', '모으고', '쿠폰과 티켓, 아쉬웠던 번호.\n흩어진 기록을 한곳에 모아요.', '/full-life#one-more'],
      ['02', '참여하고', '광고 한 편, 오늘의 한 표.\n하루 몇 분이면 포인트와 응모권이 쌓여요.', '/full-life#vote'],
      ['03', '발견해요', '내 생활권의 새로운 혜택.\nFOUND AI가 먼저 찾아드려요.', '/found-ai'],
    ].map(([n,t,d,href]) => <Link href={href} key={n} className="reveal"><span>{n}</span><h3>{t}<Icon name="arrow_forward" size={22} /></h3><p>{d}</p></Link>)}</div>
  </section>;
}

export function PulliStory() {
  return <section id="pulli" className="pulli-brand-story"><div className="pulli-brand-inner"><div className="reveal"><p className="edition-eyebrow">OUR LITTLE EVERYDAY FRIEND</p><h2>이름에도, 친구에게도<br />행운을 담았어요.</h2><p>FULL + LIFE. 비어버린 순간을 다시 채워, 하루를 가득하게.<br />네잎클로버와 작은 새싹을 닮은 풀리가<br />일상 속 작은 좋은 순간을 함께 발견해요.</p><ArrowLink href="/notes">풀리가 적어둔 이야기</ArrowLink></div><div className="pulli-brand-visual reveal"><span aria-hidden="true">FULL<br /><i>+</i> LIFE</span><Image src="/mascot/pulli-profile-v2.png" alt="네잎클로버와 새싹을 닮은 풀리프의 친구, 풀리" width={230} height={230} sizes="(max-width: 767px) 150px, 230px" /></div></div><p className="pulli-brand-bottom">평범한 오늘이 모여, 더 반짝이는 내일이 됩니다.<span>Have a Fuli Day!</span></p></section>;
}

export function ServiceOverview() {
  return <div className="service-overview"><p>이미 가진 일상에서<br /><b>시작되는 새로운 가치</b></p>{[['10','P','티켓 한 장 등록하면'],['1','개','쿠폰 · 티켓 다섯 번 등록하면 응모권'],['30','P','오늘의 한 표, 세 가지 모두 답하면']].map(([value,unit,desc])=><div key={value}><strong>{value}<small>{unit}</small></strong><span>{desc}</span></div>)}</div>;
}

export function DiscoveryHero() {
  return <header className="discovery-hero"><div className="discovery-hero-copy"><p className="edition-eyebrow">FOUND AI</p><h1>내 생활권의 혜택,<br /><span>풀리가 찾아요.</span></h1><p className="edition-lead">매일 들르는 편의점, 마트, 주유소.<br />일상에 필요한 것을 한곳에 정리해 드려요.<br />검색하지 않아도 괜찮아요.</p><ArrowLink href="#how-it-works">어떻게 찾아주나요?</ArrowLink><PulliNote mood="search">정해둔 동네만 살펴봐요.<br />실시간 위치를 따라다니지 않아요.</PulliNote></div><div className="discovery-hero-visual"><div className="discovery-street"><Image src="/images/bright/found-neighborhood.png" alt="밝은 햇살 아래 파란 차양과 과일 상자가 놓인 동네 가게" fill priority sizes="(max-width: 767px) 100vw, 750px" quality={90} /></div><div className="discovery-device"><Phone src="/screens/found.png" alt="FOUND AI 생활권 혜택 앱 화면" /></div><span className="discovery-photo-caption">가까운 곳에서 발견하는 새로운 일상</span></div><p className="discovery-hero-foot">FOUND AI는 FULIF · FULIF+ 모든 회원이 이용할 수 있어요.</p></header>;
}

const PLACES = [
  {name:'편의점', image:'/images/editorial/note-coffee.png', alt:'일상 속 한 잔의 커피', title:<>늘 들르는 곳에도,<br />챙길 것이 있으니까.</>, description:'자주 가는 편의점의 행사도 놓치지 않게. 풀리가 찾아둔 정보를 가볍게 확인해 보세요.', example:'커피 2+1', date:'2026.09.30까지 · 9월 22일 확인', note:'매장 사정에 따라 일찍 끝나거나 물량이 없을 수 있어요.'},
  {name:'마트', image:'/images/edition/found-market.png', alt:'동네 마트에 진열된 신선한 과일', title:<>오늘 장보기에도,<br />반가운 발견 하나.</>, description:'우리 동네 마트의 행사 정보를 한곳에. 필요한 것을 사러 가기 전에 한 번 살펴보세요.', example:'제철 과일 한 팩 더', date:'2026.09.19 ~ 09.20 · 9월 18일 확인', note:'주말 한정 행사 예시예요. 매장별 물량이 다를 수 있어요.'},
  {name:'주유소', image:'/images/edition/found-fuel.png', alt:'파란 주유 노즐이 놓인 동네 주유소', title:<>가까운 주유소를,<br />한 번 더 살펴봐요.</>, description:'내가 정해둔 생활권의 주유 가격을 모아 보여드려요. 확인한 시각도 함께 알려드려요.', example:'우리 동네 최저가 주유소', date:'휘발유 1리터 가격 · 오늘 06:00 기준', note:'주유 가격은 수시로 바뀌어요. 방문 시점에는 달라질 수 있어요.'},
];

export function DiscoveryPlaces() {
  return <><ScrollStory id="found-places" items={PLACES.map((item,index) => ({
    key:String(index), label:item.name,
    visual:<div className="discovery-place-photo"><Image src={item.image} alt="" fill sizes="(max-width: 899px) 100vw, 650px" quality={90} /></div>,
    content:<><h3>{item.title}</h3><p>{item.description}</p><div className="discovery-example"><span>화면 예시</span><strong>{item.example}</strong><time>{item.date}</time><p>{item.note}</p></div></>,
  }))} /><p className="edition-fine">위 정보는 서비스 이해를 위한 예시이며, 실제 제공 중인 행사가 아니에요. 방문 시점에 가격과 혜택이 달라질 수 있어요.</p></>;
}

export function MembershipBenefits() {
  return <><ScrollStory id="member-capacity" items={[
    ['number','한 회차 낙첨번호 등록',5,20,'세트','아쉬웠던 번호를,\n더 넉넉하게 모아요.'],
    ['ticket','매 회차 풀리프 제공 번호',2,10,'세트','번호를 고르는 재미도,\n조금 더 다양하게.'],
    ['watch','하루 광고 보기',10,20,'회','짧은 여유를,\n차곡차곡 포인트로.'],
  ].map(([art,title,free,paid,unit,heading]) => ({
    key:art, label:title,
    visual:<div className="scroll-member-art"><Art name={art} sizes="400px" /><strong>{paid}<small>{unit}</small></strong><span>FULIF+ · {title}</span></div>,
    content:<><h3>{heading}</h3><div className="scroll-member-comparison">{[['FULIF',free],['FULIF+',paid]].map(([plan,value],index)=><div key={plan} className={index ? 'is-plus' : ''}><span>{plan}{index ? ' · 월 5,000원' : ' · 무료'}</span><strong>{value}<small>{unit}</small></strong><div className="scroll-member-track" aria-hidden="true"><i style={{width:`${value/paid*100}%`}} /></div></div>)}</div></>,
  }))} /><p className="edition-fine">FULIF+는 이용 한도와 기능이 더 넉넉해요. 응모권 1개의 당첨 확률은 모든 회원이 같아요.</p></>;
}

export function PartnerScale() {
  return <section className="partner-scale" id="ad-scale"><div className="partner-scale-heading"><p className="edition-eyebrow">AD SCALE</p><h2>브랜드와 회원이<br /><span>같은 편에 서는 광고.</span></h2><p>회원이 본 광고 한 편이,<br />그대로 응모권과 포인트가 됩니다.</p></div><div className="partner-scale-stats">{[['10','개','광고 카테고리'],['8','개','광고 노출 화면'],['1','회','매월 브랜드 분석'],['1','사','카테고리당 브랜드']].map(([v,u,t])=><div key={t}><strong>{v}<small>{u}</small></strong><span>{t}</span></div>)}</div><p className="partner-scale-foot">단순한 노출을 넘어, 일상의 혜택으로 만나는 브랜드.<a href="#inquiry">파트너십 문의<Icon name="arrow_forward" size={18}/></a></p></section>;
}

export function ReadingProgress() {
  const ref=useRef(null);
  useEffect(()=>{
    let frame=0;
    const update=()=>{
      frame=0;
      const article=document.querySelector('.journal-detail article');
      if(!article||!ref.current) return;
      const rect=article.getBoundingClientRect();
      const headerHeight=document.querySelector('.site-header')?.getBoundingClientRect().height || 0;
      const progress=Math.min(1,Math.max(0,(headerHeight-rect.top)/Math.max(1,rect.height-window.innerHeight+headerHeight)));
      ref.current.style.transform=`scaleX(${progress})`;
    };
    const request=()=>{if(!frame)frame=requestAnimationFrame(update);};
    window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request);update();
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',request);window.removeEventListener('resize',request);};
  },[]);
  return <div className="reading-progress" aria-hidden="true"><i ref={ref}/></div>;
}
