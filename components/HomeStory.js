import { useEffect, useRef, useState } from 'react';
import Image, { getImageProps } from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Seo from './Seo';
import Icon from './Icon';
import StoreBadges from './StoreBadges';
import { BrandSymbol } from './Brand';
import { Phone } from './ui';
import { RewardGallery, PointsScene, Playground } from './BenefitSections';
import { OPEN_DATE } from '../lib/site';
import { BrandIntroduction, PulliStory } from './Edition';
import ScrollStory from './ScrollStory';

const CHAPTERS = [['intro','풀리프'],['brand','한 번 더의 의미'],['one-more','앱의 네 가지'],['rewards','ONE MORE'],['found','FOUND AI'],['points','매일의 포인트'],['play','놀이터'],['plus','FULIF+'],['pulli','풀리 이야기'],['together','함께하는 풀리프'],['start','시작하기']];
const clamp = n => Math.min(1, Math.max(0, n));

// Art-directed crops: the browser fetches the source for its viewport only.
const heroProps = { alt: '밝은 햇살 아래 파란 차양의 편의점과 주유소가 있는 동네 풍경', fill: true, sizes: '100vw', quality: 90, loading: 'eager', fetchPriority: 'high', className: 'intro-photo' };
const { props: desktopHero } = getImageProps({ ...heroProps, src: '/images/bright/hero-neighborhood.png' });
const { props: mobileHero } = getImageProps({ ...heroProps, src: '/images/bright/hero-neighborhood-mobile.png' });

function StoryLink({ href, children }) {
  return <Link href={href} className="story-pill">{children}<span className="story-pill-arrow"><Icon name="arrow_forward" size={16} /></span></Link>;
}

function ChapterRail() {
  const [active,setActive]=useState('intro');
  useEffect(()=>{
    let frame=0;
    const update=()=>{
      frame=0;
      let id='intro';
      for(const [key] of CHAPTERS) {
        const element=document.getElementById(key);
        if(element && element.getBoundingClientRect().top<=window.innerHeight*.45) id=key;
      }
      setActive(id);
    };
    const request=()=>{if(!frame) frame=requestAnimationFrame(update);};
    window.addEventListener('scroll',request,{passive:true}); window.addEventListener('resize',request); update();
    return ()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',request);window.removeEventListener('resize',request);};
  },[]);
  return <nav className={'chapter-rail'+(['intro','found','start'].includes(active) ? ' on-scene' : '')} aria-label="홈 섹션 탐색">{CHAPTERS.map(([id,label])=><a key={id} href={'#'+id} aria-label={label} aria-current={active===id ? 'location' : undefined}><i aria-hidden="true" /><span>{label}</span></a>)}</nav>;
}

function IntroScene() {
  const ref=useRef(null);
  useEffect(()=>{
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0;
    const update=()=>{
      frame=0;
      if(!ref.current) return;
      const rect=ref.current.getBoundingClientRect();
      const progress=reduced.matches ? 0 : clamp(-rect.top/Math.max(1,rect.height-window.innerHeight));
      ref.current.style.setProperty('--scene-progress',String(progress));
      ref.current.style.setProperty('--scene-scale',String(1+progress*.06));
      ref.current.style.setProperty('--intro-opacity',String(1-clamp(progress/.28)));
      ref.current.style.setProperty('--detail-opacity',String(clamp((progress-.08)/.5)));
    };
    const request=()=>{if(!frame) frame=requestAnimationFrame(update);};
    window.addEventListener('scroll',request,{passive:true}); window.addEventListener('resize',request); reduced.addEventListener('change',request); update();
    return ()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',request);window.removeEventListener('resize',request);reduced.removeEventListener('change',request);};
  },[]);
  return <section id="intro" className="intro-scroll" ref={ref}><div className="intro-sticky"><div className="intro-frame">
    <Head>
      <link rel="preload" as="image" imageSrcSet={mobileHero.srcSet} imageSizes={mobileHero.sizes} media="(max-width: 767px)" fetchPriority="high" />
      <link rel="preload" as="image" imageSrcSet={desktopHero.srcSet} imageSizes={desktopHero.sizes} media="(min-width: 768px)" fetchPriority="high" />
    </Head>
    <picture><source media="(max-width: 767px)" srcSet={mobileHero.srcSet} sizes={mobileHero.sizes} /><img {...desktopHero} /></picture>
    <Image src="/images/bright/everyday-still-life.png" alt="햇살이 비치는 테이블 위의 커피, 관람 티켓과 파란 장바구니" fill sizes="100vw" quality={90} className="intro-detail-photo" />
    <div className="intro-shade" /><div className="intro-brand-caption"><span>FULL LIFE, ONE MORE.</span><Link href="/full-life">풀리프 알아보기 <Icon name="arrow_forward" size={17}/></Link></div><h1 className="intro-headline"><span>생활의 가치를,</span><span>한 번 더.</span><span>풀리프.</span></h1>
    <div className="intro-detail-copy"><h2>끝난 줄 알았던 것들에,<br />ONE MORE</h2><p>받아두고 잊은 쿠폰도, 다녀온 날의 티켓도,<br />아쉽게 끝난 번호도.<br />응모권으로, 포인트로, 내 생활 혜택으로 돌아와요.</p></div>
  </div></div></section>;
}

const SERVICES = [
  {title:'ONE MORE',desc:'받은 쿠폰을 사진이나 공유로 등록하면 보관함에 모이고, 만료 전에 알려드려요. 등록 다섯 번이면 응모권 1개. 다 쓴 쿠폰은 사용완료하면 10P, 다녀온 티켓은 등록하면 바로 10P.',screen:'one-more',label:'내 쿠폰 · 내 티켓',value:'한 번 더 쓰기',href:'/full-life#one-more'},
  {title:'낙첨 ONE MORE',desc:'지난 회차 번호를 등록하면 1세트마다 10P. 브랜드 파트너의 짧은 영상을 한 편 보면 경품 응모권 1개를 받아요. 등록은 토요일 21:00부터 화요일 20:00까지예요.',screen:'lotto-one-more',label:'지난 회차 번호 1세트',value:'등록하면 10P',href:'/full-life#lotto-one-more'},
  {title:'오늘의 한 표',desc:'하루 세 번, 정답은 없어요. 가볍게 하나씩 고르면 30P. 답하고 나면 다른 회원들은 어떻게 골랐는지도 볼 수 있어요.',screen:'today-vote',label:'오늘의 질문 세 가지',value:'모두 고르면 30P',href:'/full-life#vote'},
  {title:'경품 추첨',desc:'낙첨 ONE MORE는 매주 화요일 20:30, ONE MORE는 매달 마지막 화요일 21:00에 추첨해요. 모든 응모권은 같은 확률이고, 당첨된 경품은 보관함에 넣어드려요.',screen:'prize-draw',label:'모든 회원에게',value:'같은 응모권 확률',href:'/full-life#draw'},
];

function ServiceScene() {
  return <section id="one-more" className="service-scroll-section"><div className="service-scroll-heading"><h2>앱을 열면,<br />네 가지가 기다려요</h2></div>
    <ScrollStory id="home-services" items={SERVICES.map(service => ({
      key:service.screen, label:service.title,
      visual:<div className="scroll-phone-visual"><Phone src={'/screens/'+service.screen+'.png'} alt="" /><div className="scroll-phone-badge"><Icon name="check_circle" size={24} /><div><span>{service.label}</span><strong>{service.value}</strong></div></div></div>,
      content:<><h3>{service.title}</h3><p>{service.desc}</p><StoryLink href={service.href}>자세히 보기</StoryLink></>,
    }))} />
  </section>;
}

function FoundScene() {
  return <section id="found"><div className="life-scene"><Image src="/images/bright/found-neighborhood.png" alt="파란 차양과 신선한 과일이 있는 햇살 가득한 동네 가게" fill sizes="100vw" quality={90} /><div className="life-scene-shade" /><div className="life-scene-copy"><p>FOUND AI</p><h2>찾지 않아도,<br />먼저 찾아와요</h2><span>내 생활권의 편의점 · 마트 · 주유소 혜택을<br />풀리가 찾아 정리해 드려요.</span></div></div>
    <div className="found-story-detail"><div className="found-story-phone"><Phone src="/screens/found.png" alt="생활권 혜택을 보여주는 FOUND AI 앱 화면" /></div><div><h2 className="story-heading">내 생활권 혜택,<br />풀리가 먼저 찾아요</h2><div className="story-found-promises"><div><h3>찾지 않으셔도 돼요</h3><p>회원님이 검색하지 않아도 풀리프가 먼저 찾아 정리해 드려요.</p></div><div><h3>없는 혜택은 만들지 않아요</h3><p>확인된 것만 올려요. 확인한 날짜를 함께 적어드려요.</p></div><div><h3>위치를 따라다니지 않아요</h3><p>한 번 정하신 지역만 사용하고, 실시간 위치는 보지 않아요.</p></div></div><StoryLink href="/found-ai">FOUND AI 자세히 보기</StoryLink></div></div>
  </section>;
}

function MembershipScene() {
  return <section id="plus" className="plus-story"><div className="plus-story-head reveal"><p>FULIF+</p><h2>풀리프를 더 알차게,<br />FULIF+</h2><span>첫 달은 무료로 써보고 결정하세요.</span></div><div className="plus-presentation"><div className="plus-pass"><div><BrandSymbol className="w-10 h-11" /><b>fulif<span>+</span></b></div><p>생활의 가치를,<br />한 번 더 넉넉하게.</p><span>ONE MORE POSSIBILITY. FULLER EVERY DAY.</span><i aria-hidden="true">+</i></div><div className="plus-offer"><span>첫 달 무료 · 월간 멤버십</span><h3>5,000<small>원 / 월</small></h3><p>한 회차 낙첨번호 20세트 · 제공 번호 10세트<br />하루 광고 보기 20회 · 럭키 스코어<br />챔피언십 · FULIF+ 전용 이벤트</p><StoryLink href="/membership">멤버십 자세히 보기</StoryLink><small>무료 체험 1회 · 이후 매월 5,000원 자동 결제<br />결제 3일 전 안내 · 체험 중 해지하면 결제되지 않아요.</small></div></div><p className="story-fine">FULIF든 FULIF+든, 응모권 1개의 가치는 같아요.</p></section>;
}

function TogetherScene() {
  return <section id="together" className="together-story"><div className="together-intro"><h2 className="story-heading reveal">생활의 가치를,<br /><span>함께 나누는 풀리프</span></h2><div className="together-blocks"><article className="donation-story reveal"><div><p>함께하는 ONE MORE</p><h3>쓰지 않을 쿠폰이,<br />누군가에게는<br />첫 선물이 돼요</h3><span>보관함에서 기부하면<br />30P와 기부천사 배지를 드려요.</span><small>편의점 · 제과점 · 생활용품점 등의 금액권, 문화상품권 등<br />만료까지 1개월 이상 남은 쿠폰을 기부할 수 있어요.<br />매달 전달 지역과 아이 수를 알려드려요.</small></div><Image src="/images/benefits/donate-art.png" alt="" width={1024} height={1024} sizes="210px" /></article><article className="partner-story reveal"><p>AD SCALE · 브랜드 파트너</p><h3>브랜드와 함께<br />혜택을 만듭니다.</h3><span>회원이 본 광고 한 편이<br />응모권과 포인트가 됩니다.</span><div className="partner-numbers"><span><b>10</b>광고 카테고리</span><span><b>8</b>광고 노출 화면</span><span><b>1사</b>카테고리당 브랜드</span></div><StoryLink href="/partners">브랜드 파트너 문의</StoryLink></article></div></div><div className="story-trust"><h2>풀리프가 지키는<br />네 가지</h2><div>{[
    ['모든 응모권은 같은 확률이에요','FULIF든 FULIF+든, 응모권 1개의 가치는 같아요.'],
    ['번호 기능은 재미를 위한 것이에요','번호를 고르는 즐거움을 드릴 뿐, 당첨 확률을 높여주지 않아요.'],
    ['포인트는 현금이 아니에요','활동으로만 쌓이고, 사고팔거나 현금으로 바꿀 수 없어요. 적립일로부터 2년 동안 유지돼요.'],
    ['필요한 것만 여쭤요','상세 주소도, 실시간 위치도 묻지 않아요. 한 번 정한 생활권이면 충분해요.'],
  ].map(([title,desc])=><div key={title}><h3>{title}</h3><p>{desc}</p></div>)}</div></div></section>;
}

function StartScene() {
  return <section id="start" className="start-story"><Image src="/images/bright/everyday-still-life.png" alt="" fill sizes="100vw" /><div className="start-overlay" /><div className="start-copy"><BrandSymbol className="w-12 h-14 mx-auto" /><h2>오늘 끝난 것에,<br />한 번 더.</h2><p>쿠폰 · 티켓 · 번호로 시작하는 AI 리워드 플랫폼</p><StoreBadges center /><small>{OPEN_DATE} 오픈 · 만 19세 이상 이용할 수 있어요.</small></div></section>;
}

export default function HomeStory() {
  return <><Seo /><div className="fulif-story"><ChapterRail /><IntroScene /><BrandIntroduction /><ServiceScene /><RewardGallery /><FoundScene /><PointsScene /><Playground /><MembershipScene /><PulliStory /><TogetherScene /><StartScene /></div></>;
}
