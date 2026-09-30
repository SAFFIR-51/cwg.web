import { useState } from 'react';
import Link from 'next/link';
import Seo from '../../components/Seo';
import Icon from '../../components/Icon';
import { Fine } from '../../components/ui';
import { Art, ArrowLink, NoteCover, ClosingCTA } from '../../components/SubpageDesign';
import { CATEGORIES, SERIES, NOTES } from '../../lib/notes';
import { BLOG_URL } from '../../lib/site';

export default function Notes() {
  const [cat,setCat]=useState('all');
  const [query,setQuery]=useState('');
  const first=NOTES.find(n=>n.category==='series');
  const library=NOTES.filter(n=>n.category!=='series');
  const keyword=query.trim().toLocaleLowerCase('ko-KR');
  const list=library.filter(n=>(cat==='all'||n.category===cat) && (!keyword || `${n.title} ${n.summary} ${n.categoryLabel}`.toLocaleLowerCase('ko-KR').includes(keyword)));
  return <div className="product-page journal-product">
    <Seo title="풀리 노트" description="쿠폰 챙기는 법부터 내 생활권 혜택, 풀리프를 알차게 쓰는 요령까지. 가볍게 읽고, 한 번 더 챙겨요." />
    <header className="journal-masthead"><div><p className="journal-wordmark">fuli notes<span>.</span></p><span className="journal-editor"><img src="/mascot/pulli-profile-v2.png" alt="" />풀리가 적어두는 이야기</span></div><h1>읽는 순간,<br />일상이 조금 달라지도록.</h1><p>쿠폰 한 장부터 내 생활권의 작은 혜택까지.<br />가볍게 읽고, 한 번 더 발견해요.</p></header>
    <section className="journal-feature">
      <div className="journal-feature-copy"><span>연재 · {SERIES.published}편 공개 / 전체 {SERIES.total}편</span><h2>{SERIES.title}<br />한 장의 새로운 이야기</h2><p>{SERIES.desc}</p><small>{first.date} · {first.minutes}분</small><ArrowLink href={'/notes/'+first.slug}>연재 처음부터 읽기</ArrowLink></div>
      <NoteCover note={first} />
    </section>
    <nav className="journal-shortcuts" aria-label="풀리 노트 빠른 읽기"><span>처음이라면<br /><b>이 노트부터</b></span>{[NOTES[1],NOTES[3],NOTES[5]].map((n,i)=><Link href={'/notes/'+n.slug} key={n.slug}><small>0{i+1} · {n.categoryLabel}</small><strong>{n.title}</strong><span>읽어보기 ↗</span></Link>)}</nav>
    <section className="journal-library" id="notes">
      <div className="journal-library-toolbar"><h2>새로 적은 노트</h2><div className="journal-search"><Icon name="search" size={19} /><input aria-label="노트 검색" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="궁금한 이야기를 찾아보세요" />{query && <button type="button" aria-label="검색어 지우기" onClick={()=>setQuery('')}><Icon name="close" size={17}/></button>}</div></div>
      <div className="journal-library-heading"><div className="journal-filters" role="group" aria-label="노트 카테고리">{CATEGORIES.map(c=><button type="button" key={c.key} aria-pressed={cat===c.key} onClick={()=>setCat(c.key)}>{c.label}<small>{library.filter(n=>c.key==='all'||n.category===c.key).length}</small></button>)}</div><span className="journal-result-count">{list.length}개의 이야기</span></div>
      <div aria-live="polite"><span className="sr-only">{CATEGORIES.find(c=>c.key===cat)?.label} 노트 {list.length}개</span>
        {list.length ? <div className="journal-grid">{list.map(n=><Link href={'/notes/'+n.slug} className="journal-article" key={n.slug}><NoteCover note={n} /><div><p className="sub-eyebrow">{n.categoryLabel}</p><h3>{n.title}</h3><p>{n.summary}</p><small>{n.date} · {n.minutes}분</small></div></Link>)}</div> : <div className="journal-empty">아직 이 이야기는 없어요. 다른 검색어나 카테고리로 찾아볼까요?<button type="button" onClick={()=>{setQuery('');setCat('all');}}>모든 노트 보기</button></div>}
      </div>
      <Fine>제목 · 요약은 형식을 보여드리는 예시예요.</Fine>
    </section>
    <section className="journal-about"><div className="journal-about-inner"><div className="journal-about-art"><Art name="notebook" /><img src="/mascot/pulli-profile-v2.png" alt="풀리" /></div><div><p className="sub-eyebrow">MEET YOUR EVERYDAY FRIEND</p><h2>평범한 오늘이 모여,<br />더 반짝이는 내일로.</h2><p>이 노트를 쓰는 친구, 풀리.<br />네잎클로버와 작은 새싹을 닮은 풀리프의 마스코트예요. 특별한 날만 기다리기보다 평범한 일상 속 작은 좋은 순간을 발견하고, 다음의 작은 가능성을 응원해요.</p>{BLOG_URL ? <a className="sub-arrow-link" href={BLOG_URL} target="_blank" rel="noopener noreferrer">네이버 블로그에서 보기 ↗</a> : <Fine className="mt-6">네이버 블로그는 준비 중이에요.</Fine>}</div></div></section>
    <ClosingCTA title={<>읽고 끝내기 아쉬운 혜택,<br />풀리프에서 직접 만나봐요.</>} art="notebook" />
  </div>;
}
