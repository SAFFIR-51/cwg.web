import { useState } from 'react';
import Link from 'next/link';
import Seo from '../../components/Seo';
import { NoteCover, ClosingCTA } from '../../components/SubpageDesign';
import { CATEGORIES, SERIES, NOTES, seriesStatus, kstToday } from '../../lib/notes';
import { BLOG_URL } from '../../lib/site';

const PREVIEW = 3;

// 공개 편 수 · 목차는 날짜에 맞춰 바뀌도록 한 시간마다 다시 만든다(ISR)
export async function getStaticProps() {
  return { props: { episodes: seriesStatus(kstToday()) }, revalidate: 3600 };
}

// 구성은 컴팩트 최종본 v3(2026-10-14) 풀리 노트 장 — 첫 화면 · 카테고리 · 연재 카드와 목차 · 새로 적은 노트 · 마무리
export default function Notes({ episodes }) {
  const [cat,setCat]=useState('all');
  const [expanded,setExpanded]=useState(false);
  const opened=episodes.filter(e=>e.open);
  const first=episodes[0];
  // 새로 적은 노트: 카테고리 글만(연재와 중복 게시하지 않음), 최신순
  const library=NOTES.filter(n=>n.category!=='series').slice().sort((a,b)=>b.date.localeCompare(a.date));
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
    </section>
    <section className="journal-series" id="series">
      <Link href={first.open ? '/notes/'+first.slug : '#series-toc'} className="journal-series-card">
        <img src="/mascot/v3/fuli-joy.jpg" alt="" />
        <div><span>연재 · {opened.length}편 공개 · 전체 {SERIES.total}편</span><h2>{SERIES.title}</h2><p>{SERIES.desc}</p></div>
      </Link>
      <ol className="journal-series-toc" id="series-toc">{episodes.map(e=><li key={e.n} className={e.open ? 'is-open' : ''}>{e.open
        ? <Link href={'/notes/'+e.slug}><b>{e.n}편</b><span>{e.title}</span></Link>
        : <div><b>{e.n}편</b><span>{e.title}</span><small>{e.openOn}</small></div>}</li>)}</ol>
      <p className="journal-series-note">공개 편 수는 발행에 맞춰 자동으로 바뀌어요. 오픈 후 새 편은 매주 월요일에 올라와요.</p>
    </section>
    <section className="journal-library" id="notes">
      <div className="journal-library-toolbar"><h2>새로 적은 노트</h2></div>
      <div aria-live="polite"><span className="sr-only">{CATEGORIES.find(c=>c.key===cat)?.label} 노트 {list.length}개</span>
        {list.length > 0 && <div className="journal-grid">{shown.map(n=><Link href={'/notes/'+n.slug} className="journal-article" key={n.slug}><NoteCover note={n} /><div><p className="sub-eyebrow">{n.categoryLabel}</p><h3>{n.title.replace(/\n/g,' ')}</h3>{n.summary && <p>{n.summary}</p>}<small>{n.date} · {n.minutes}분</small></div></Link>)}</div>}
        {list.length===0 && <div className="journal-empty text-center"><img src="/mascot/clover_hello.png" alt="" className="mx-auto h-20 w-20 object-contain" /><p className="mt-4 text-[17px] font-bold text-ink">풀리가 열심히 적고 있어요</p><p className="mt-1 text-[14px] text-muted">곧 첫 노트가 올라와요.</p></div>}
      </div>
      {!expanded && list.length > PREVIEW && <div className="mt-12 text-center"><button type="button" className="btn-secondary" onClick={()=>setExpanded(true)}>노트 더 보기</button></div>}
      <p className="journal-series-note mt-6 text-center">오픈 후 카테고리 글은 매주 목요일에 올라와요.</p>
    </section>
    <ClosingCTA title={<>다음 노트도,<br />풀리가 먼저 적어둘게요</>} mascot="/mascot/v3/fuli-meadow.jpg" mascotAlt="클로버 들판에서 손을 흔드는 풀리">
      <div className="mt-7 flex flex-wrap gap-3">{BLOG_URL ? <a className="btn-secondary" href={BLOG_URL} target="_blank" rel="noopener noreferrer">네이버 블로그에서 보기</a> : <span className="btn-secondary cursor-default opacity-60" aria-disabled="true">네이버 블로그 준비 중</span>}<Link className="btn-primary" href="/download">다운로드</Link></div>
      <p className="mt-6 text-[15px] font-semibold text-blue">Have a Fuli Day!</p>
    </ClosingCTA>
  </div>;
}
