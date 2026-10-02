import { useState } from 'react';
import Link from 'next/link';
import Seo from '../../components/Seo';
import { Art, ArrowLink, NoteCover, ClosingCTA } from '../../components/SubpageDesign';
import { CATEGORIES, SERIES, NOTES } from '../../lib/notes';
import { BLOG_URL } from '../../lib/site';

const PREVIEW = 4;

// 구성은 PDF 2026.09.24 풀리 노트 장을 따른다.
export default function Notes() {
  const [cat,setCat]=useState('all');
  const [expanded,setExpanded]=useState(false);
  const first=NOTES.find(n=>n.category==='series');
  const library=NOTES.filter(n=>n.category!=='series');
  const list=library.filter(n=>cat==='all'||n.category===cat);
  const shown=expanded ? list : list.slice(0, PREVIEW);
  const choose=key=>{ setCat(key); setExpanded(false); };
  const filters=<nav className="journal-filters mt-8" aria-label="노트 카테고리">{CATEGORIES.map(c=><button type="button" key={c.key} aria-pressed={cat===c.key} onClick={()=>choose(c.key)}>{c.label}</button>)}</nav>;
  return <div className="product-page journal-product">
    <Seo title="풀리 노트" description="쿠폰 챙기는 법부터 내 생활권 혜택, 풀리프를 알차게 쓰는 요령까지. 가볍게 읽고, 한 번 더 챙겨요." />
    <header className="journal-masthead"><div><p className="journal-wordmark">풀리 노트<span>.</span></p><span className="journal-editor"><img src="/mascot/pulli-profile-v2.png" alt="" />풀리가 적어둔 이야기</span></div><h1>풀리가 먼저<br />알아보고,<br />적어뒀어요</h1><p>쿠폰 챙기는 법부터 내 생활권 혜택, 풀리프를 알차게 쓰는 요령까지.<br />가볍게 읽고, 한 번 더 챙겨요.</p>{filters}</header>
    <section className="journal-library" id="categories">
      <div className="journal-library-toolbar"><div><h2>무엇이 궁금하세요?</h2><p className="mt-3 text-[15px] text-muted">주제마다 풀리가 다른 얼굴로 기다리고 있어요.</p></div></div>
      <div className="note-categories grid grid-cols-2 gap-3 md:grid-cols-4">{CATEGORIES.filter(c=>c.key!=='all').map(c=><a key={c.key} href="#notes" onClick={()=>choose(c.key)} aria-pressed={cat===c.key} className={`flex flex-col items-center text-center ${cat===c.key ? 'bg-blue-soft' : 'bg-white'}`}><img src={c.img} alt="" className="object-contain" /><strong className="mt-3 text-[16px]">{c.label}</strong><span className="mt-1 text-[13px] text-muted">{c.desc}</span></a>)}</div>
      {cat!=='all' && list.length===0 && <div className="journal-empty text-center"><img src="/mascot/clover_hello.png" alt="" className="mx-auto h-20 w-20 object-contain" /><p className="mt-4 text-[17px] font-bold text-ink">풀리가 열심히 적고 있어요</p><p className="mt-1 text-[14px] text-muted">곧 첫 노트가 올라와요.</p></div>}
    </section>
    <section className="journal-feature">
      <div className="journal-feature-copy"><span>연재 · {SERIES.published}편 공개 · 전체 {SERIES.total}편</span><h2>{SERIES.title}</h2><p>{SERIES.desc}</p><small>{first.episode}편 · {first.title} · {first.date} · {first.minutes}분</small><ArrowLink href={'/notes/'+first.slug}>연재 처음부터 읽기</ArrowLink></div>
      <NoteCover note={first} />
    </section>
    <section className="journal-library" id="notes">
      <div className="journal-library-toolbar"><h2>새로 적은 노트</h2></div>
      <div aria-live="polite"><span className="sr-only">{CATEGORIES.find(c=>c.key===cat)?.label} 노트 {list.length}개</span>
        {list.length > 0 && <div className="journal-grid">{shown.map(n=><Link href={'/notes/'+n.slug} className="journal-article" key={n.slug}><NoteCover note={n} /><div><p className="sub-eyebrow">{n.categoryLabel}</p><h3>{n.title}</h3><p>{n.summary}</p><small>{n.date} · {n.minutes}분</small></div></Link>)}</div>}
        {list.length===0 && <div className="journal-empty text-center"><p className="text-[17px] font-bold text-ink">풀리가 열심히 적고 있어요</p><p className="mt-1 text-[14px] text-muted">곧 첫 노트가 올라와요.</p></div>}
      </div>
      {!expanded && list.length > PREVIEW && <div className="mt-12 text-center"><button type="button" className="btn-secondary" onClick={()=>setExpanded(true)}>노트 더 보기</button></div>}
    </section>
    <section className="px-6 py-24 text-center"><p className="mx-auto max-w-3xl text-[28px] font-bold leading-snug tracking-tightest text-ink md:text-[36px]">평범한 오늘이 모여,<br />더 반짝이는 내일이 됩니다.</p><p className="mt-5 text-[15px] font-semibold text-blue">— 풀리</p></section>
    <section className="journal-about"><div className="journal-about-inner"><div className="journal-about-art"><Art name="notebook" /><img src="/mascot/pulli-profile-v2.png" alt="풀리" /></div><div><p className="sub-eyebrow">MEET YOUR EVERYDAY FRIEND</p><h2>이 노트를 쓰는<br />친구, 풀리</h2><p>풀리는 네잎클로버와 작은 새싹을 닮은 풀리프의 마스코트예요. 특별한 날만 기다리기보다 평범한 일상 속 작은 좋은 순간을 발견하고, 오늘을 조금 더 즐겁게 만들어가요. 언제나 곁에서 함께하고, 다음의 작은 가능성을 응원하는 친구예요.</p></div></div></section>
    <ClosingCTA title={<>다음 노트도,<br />풀리가 먼저 적어둘게요</>} art="notebook">
      <div className="mt-7 flex flex-wrap gap-3">{BLOG_URL ? <a className="btn-secondary" href={BLOG_URL} target="_blank" rel="noopener noreferrer">네이버 블로그에서 보기</a> : <span className="btn-secondary cursor-default opacity-60" aria-disabled="true">네이버 블로그 준비 중</span>}<Link className="btn-primary" href="/download">다운로드</Link></div>
      <p className="mt-6 text-[15px] font-semibold text-blue">Have a Fuli Day!</p>
    </ClosingCTA>
  </div>;
}
