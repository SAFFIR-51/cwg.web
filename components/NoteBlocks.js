import Link from 'next/link';
import Icon from './Icon';
import { Phone } from './ui';

// 풀리 노트 글 상세 부품 — 그림은 기존 사이트 자산(앱 화면 · 풀리)과 HTML/CSS 로만 그린다.

// 「**굵게**」 → 강조
export function Rich({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part, i) => part.startsWith('**')
    ? <strong key={i} className="note-em">{part.slice(2, -2)}</strong>
    : <span key={i}>{part}</span>);
}

/* ---------- ④ 대표 그림 ---------- */
function StillLife() {
  return <div className="note-hero note-hero-still" aria-hidden="true">
    <div className="nh-phone"><div className="nh-coupon"><i /><div><small>카페 쿠폰</small><b>아메리카노 1잔</b><em>D-2</em></div></div><span className="nh-line" /><span className="nh-line short" /><span className="nh-btn">보관함에 담기</span></div>
    <div className="nh-ticket"><div><small>CINEMA</small><b>토요일 저녁 영화</b><time>2026.10.11 · 19:20</time></div><span>G-7</span></div>
    <div className="nh-receipt"><b>주유 영수증</b><span className="nh-line" /><span className="nh-line" /><span className="nh-line short" /><small>휘발유 · 2026.10.08</small></div>
    <img className="nh-fuli" src="/mascot/v3/fuli-cheer.jpg" alt="" />
  </div>;
}

function HomeScreen({ badge }) {
  return <div className="note-hero note-hero-home">
    <div className="nh-home-phone"><Phone src="/screens/home.png" alt="풀리프 앱 홈 화면" /></div>
    <img className="nh-home-fuli" src="/mascot/pulli-profile-v2.png" alt="" />
    {badge && <span className="nh-home-badge">{badge}</span>}
  </div>;
}

function OpenDate() {
  return <div className="note-hero note-hero-open">
    <div><small>TEST OPEN</small><strong>10.19</strong><b>월요일, 문을 엽니다</b><span>그랜드 오픈 11.23 월요일</span></div>
    <img src="/mascot/v3/fuli-joy.jpg" alt="" />
  </div>;
}

export function NoteHero({ hero }) {
  const body = hero.type === 'stillLife' ? <StillLife /> : hero.type === 'homeScreen' ? <HomeScreen badge={hero.badge} /> : <OpenDate />;
  return <figure className="note-hero-figure">{body}{hero.caption && <figcaption>{hero.caption}</figcaption>}</figure>;
}

/* ---------- ⑤ 본문 그림 · 표 ---------- */
const lines = (t) => t.split('\n').map((l, i, a) => <span key={i}>{l}{i < a.length - 1 && <br />}</span>);

function Week({ b }) {
  return <figure className="note-fig"><figcaption className="note-fig-title">{b.title}</figcaption>
    <div className="note-week">{b.days.map(([day, what, alert]) => <div key={day} className={alert ? 'is-alert' : ''}><small>{day}</small><b>{lines(what)}</b></div>)}</div>
    <p className="note-fig-caption">{b.caption}</p></figure>;
}

function Compare({ b }) {
  return <figure className="note-fig"><figcaption className="note-fig-title">{b.title}</figcaption>
    <table className="note-compare"><thead><tr><th scope="col"><span className="sr-only">항목</span></th><th scope="col">{b.head[0]}</th><th scope="col" className="is-fulif">{b.head[1]}</th></tr></thead>
      <tbody>{b.rows.map(([what, usual, fulif]) => <tr key={what}><th scope="row">{what}</th><td>{usual}</td><td className="is-fulif">{fulif}</td></tr>)}</tbody></table></figure>;
}

function Slots({ b }) {
  return <figure className="note-fig"><figcaption className="note-fig-title">{b.title}</figcaption>
    <div className="note-slots">{b.slots.map(([emoji, label], i) => <span key={i} className="note-slot"><i aria-hidden="true">{emoji}</i>{label}</span>)}<span className="note-slot-arrow" aria-hidden="true">→</span><span className="note-slot-result">{lines(b.result)}</span></div></figure>;
}

// 홈 화면 위 번호 자리(앱 홈 캡처 기준 위치, %)
const HOME_MARKS = [[6, 24.5], [52.5, 24.5], [6, 46.5], [52.5, 46.5], [6, 70]];

function HomeMap({ b }) {
  return <figure className="note-fig"><figcaption className="note-fig-title">{b.title}</figcaption>
    <div className="note-homemap">
      <div className="note-homemap-shot"><img src="/screens/home.png" alt="번호를 붙인 풀리프 앱 홈 화면" loading="lazy" />{HOME_MARKS.map(([x, y], i) => <span key={i} style={{ left: `${x}%`, top: `${y}%` }} aria-hidden="true">{i + 1}</span>)}</div>
      <ol>{b.items.map(([title, desc], i) => <li key={title}><span>{i + 1}</span><div><b>{title}</b><small>{desc}</small></div></li>)}</ol>
    </div></figure>;
}

function StepList({ b }) {
  return <ol className="note-steps">{b.items.map(([title, desc], i) => <li key={title}><span>{i + 1}</span><div><b>{title}</b><p>{desc}</p></div></li>)}</ol>;
}

function Table({ b }) {
  return <figure className="note-fig note-fig-table">
    <table className="note-table"><thead><tr>{b.head.map((h) => <th scope="col" key={h}>{h}</th>)}</tr></thead>
      <tbody>{b.rows.map((r) => <tr key={r.what}><th scope="row">{r.what}{r.whatSub && <small>{r.whatSub}</small>}</th><td>{lines(r.when)}{r.whenSub && <small>{r.whenSub}</small>}</td><td>{lines(r.then)}</td></tr>)}</tbody></table>
    {b.caption && <p className="note-fig-caption">{b.caption}</p>}</figure>;
}

function Timeline({ b }) {
  return <figure className="note-fig"><figcaption className="note-fig-title">{b.title}</figcaption>
    <ol className="note-timeline">{b.items.map(([when, title, desc, filled]) => <li key={title} className={filled ? 'is-filled' : ''}><small>{when}</small><b>{title}</b><p>{desc}</p></li>)}</ol></figure>;
}

function Cards({ b }) {
  return <div className="note-cards">{b.items.map(([title, desc]) => <div key={title}><b>{title}</b><p>{desc}</p></div>)}</div>;
}

function Donate({ b }) {
  return <aside className="note-donate"><img src="/mascot/v3/fuli-heart.jpg" alt="" /><div><small>{b.title}</small><p>{b.body}</p></div></aside>;
}

function Founder({ b }) {
  return <aside className="note-founder"><img src="/mascot/v3/fuli-clover.jpg" alt="" /><div><small>{b.kicker}</small><b>{b.title}</b><p>{b.body}</p></div></aside>;
}

const FIGS = { week: Week, compare: Compare, slots: Slots, homeMap: HomeMap, steps: StepList, table: Table, timeline: Timeline, cards: Cards, donate: Donate, founder: Founder };

export function NoteBlock({ b }) {
  if (typeof b === 'string') return <p><Rich text={b} /></p>;
  const C = FIGS[b.type];
  return C ? <C b={b} /> : null;
}

/* ---------- ⑥ ~ ⑨ ---------- */
export function FuliNotes({ data }) {
  return <section className="note-fulinotes" aria-label="FULI NOTES">
    <small>FULI NOTES</small><h2>{data.title}</h2>
    <ol style={{ '--n': data.steps.length }}>{data.steps.map(([t, d], i) => <li key={t} className={i === data.steps.length - 1 ? 'is-last' : ''}><b>{t}</b><span>{d}</span></li>)}</ol>
    {data.foot && <p><Icon name="refresh" size={15} />{data.foot}</p>}
  </section>;
}

export function FuliSays({ text }) {
  return <aside className="note-fulisays"><img src="/mascot/v3/fuli-hands.jpg" alt="풀리" /><div><small>풀리의 한마디</small><p>{lines(text)}</p></div></aside>;
}

export function CommentLine({ data }) {
  return <aside className="note-comment"><small>댓글 한 줄</small><p>{lines(data.q)}</p><span>{data.sub}</span></aside>;
}

// 함께 보면 좋아요 — 연재 편은 공개됐을 때만 링크, 글이 없는 항목은 링크 없이 둔다
export function Related({ items }) {
  return <section className="note-related"><h2>함께 보면 좋아요</h2><ul>{items.map((it) => {
    const inner = <><small>{it.label}</small><b>{it.title}{it.status && <em>{it.status}</em>}</b></>;
    return <li key={it.label + it.title}>{it.href ? <Link href={it.href}>{inner}</Link> : <div className="is-pending">{inner}</div>}</li>;
  })}</ul></section>;
}
