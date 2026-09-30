import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Seo from '../../components/Seo';
import Icon from '../../components/Icon';
import { Fine } from '../../components/ui';
import { Art, NoteCover } from '../../components/Art';
import { CtaBand } from '../../components/blocks';
import { CATEGORIES, SERIES, NOTES } from '../../lib/notes';
import { BLOG_URL } from '../../lib/site';

export default function Notes() {
  const [cat, setCat] = useState('all');
  const [query, setQuery] = useState('');
  const first = NOTES.find(n => n.category === 'series');
  const library = NOTES.filter(n => n.category !== 'series');
  const keyword = query.trim().toLocaleLowerCase('ko-KR');
  const list = library.filter(n => (cat === 'all' || n.category === cat) && (!keyword || `${n.title} ${n.summary} ${n.categoryLabel}`.toLocaleLowerCase('ko-KR').includes(keyword)));
  return <div className="page page-journal">
    <Seo title="풀리 노트" description="쿠폰 챙기는 법부터 내 생활권 혜택, 풀리프를 알차게 쓰는 요령까지. 가볍게 읽고, 한 번 더 챙겨요." />

    <header className="journal-masthead">
      <div className="container">
        <div className="journal-masthead-top"><p className="journal-wordmark">fuli notes<span>.</span></p><span className="journal-editor"><Image src="/mascot/pulli-profile-v2.png" alt="" width={28} height={28} />풀리가 적어두는 이야기</span></div>
        <h1 className="h-display">읽는 순간,<br />일상이 조금 달라지도록.</h1>
        <p className="lead">쿠폰 한 장부터 내 생활권의 작은 혜택까지.<br />가볍게 읽고, 한 번 더 발견해요.</p>
      </div>
    </header>

    <section className="journal-feature-section">
      <div className="container">
        <Link href={'/notes/' + first.slug} className="journal-feature reveal">
          <div className="journal-feature-copy"><span className="eyebrow">연재 · {SERIES.published}편 공개 / 전체 {SERIES.total}편</span><h2>{SERIES.title}<br />한 장의 새로운 이야기</h2><p>{SERIES.desc}</p><small>{first.date} · {first.minutes}분</small><span className="btn-link">연재 처음부터 읽기<Icon name="chevron_right" size={18} /></span></div>
          <NoteCover note={first} />
        </Link>
        <nav className="journal-shortcuts" aria-label="풀리 노트 빠른 읽기"><span>처음이라면<br /><b>이 노트부터</b></span>{[NOTES[1], NOTES[3], NOTES[5]].map((n, i) => <Link href={'/notes/' + n.slug} key={n.slug}><small>0{i + 1} · {n.categoryLabel}</small><strong>{n.title}</strong><span>읽어보기 ↗</span></Link>)}</nav>
      </div>
    </section>

    <section className="content-section bg-page" id="notes">
      <div className="container">
        <div className="journal-toolbar"><h2 className="h-section">새로 적은 노트</h2><div className="journal-search"><Icon name="search" size={19} /><input aria-label="노트 검색" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="궁금한 이야기를 찾아보세요" />{query && <button type="button" aria-label="검색어 지우기" onClick={() => setQuery('')}><Icon name="close" size={17} /></button>}</div></div>
        <div className="journal-filters-row"><div className="journal-filters" role="group" aria-label="노트 카테고리">{CATEGORIES.map(c => <button type="button" key={c.key} className="chip" aria-pressed={cat === c.key} onClick={() => setCat(c.key)}>{c.label}<small>{library.filter(n => c.key === 'all' || n.category === c.key).length}</small></button>)}</div><span className="fine">{list.length}개의 이야기</span></div>
        <div aria-live="polite"><span className="sr-only">{CATEGORIES.find(c => c.key === cat)?.label} 노트 {list.length}개</span>
          {list.length ? <div className="journal-grid">{list.map(n => <Link href={'/notes/' + n.slug} className="journal-article reveal" key={n.slug}><NoteCover note={n} /><div><p className="eyebrow">{n.categoryLabel}</p><h3>{n.title}</h3><p>{n.summary}</p><small>{n.date} · {n.minutes}분</small></div></Link>)}</div> : <div className="journal-empty">아직 이 이야기는 없어요. 다른 검색어나 카테고리로 찾아볼까요?<button type="button" className="btn-secondary btn-sm" onClick={() => { setQuery(''); setCat('all'); }}>모든 노트 보기</button></div>}
        </div>
        <Fine className="mt-6">제목 · 요약은 형식을 보여드리는 예시예요.</Fine>
      </div>
    </section>

    <section className="content-section">
      <div className="container">
        <div className="journal-about reveal"><div className="journal-about-art"><Art name="notebook" sizes="160px" /><Image src="/mascot/pulli-profile-v2.png" alt="풀리" width={120} height={120} sizes="120px" /></div><div><p className="eyebrow">MEET YOUR EVERYDAY FRIEND</p><h2 className="h-section">평범한 오늘이 모여,<br />더 반짝이는 내일로.</h2><p className="lead">이 노트를 쓰는 친구, 풀리. 네잎클로버와 작은 새싹을 닮은 풀리프의 마스코트예요. 특별한 날만 기다리기보다 평범한 일상 속 작은 좋은 순간을 발견하고, 다음의 작은 가능성을 응원해요.</p>{BLOG_URL ? <a className="btn-link mt-5" href={BLOG_URL} target="_blank" rel="noopener noreferrer">네이버 블로그에서 보기 ↗</a> : <Fine className="mt-5">네이버 블로그는 준비 중이에요.</Fine>}</div></div>
      </div>
    </section>

    <CtaBand title={'읽고 끝내기 아쉬운 혜택,\n풀리프에서 직접 만나봐요.'} lead="생활의 가치를, 한 번 더." screen="/screens/home.png" />
  </div>;
}
