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
    <div className="nh-home-phone"><Phone src="/screens/home-v1026.png" alt="풀리프 앱 홈 화면" /></div>
    <img className="nh-home-fuli" src="/mascot/pulli-profile-v2.png" alt="" />
    {badge && <span className="nh-home-badge">{badge}</span>}
  </div>;
}

function OpenDate() {
  return <div className="note-hero note-hero-open">
    <div><small>TEST OPEN</small><strong>10월 말</strong><b>문을 엽니다</b><span>그랜드 오픈 11.23 월요일</span></div>
    <img src="/mascot/v3/fuli-joy.jpg" alt="" />
  </div>;
}

// ONE MORE 꿀팁 1편 — 겹쳐 둔 쿠폰 세 장
function CouponStack() {
  return <div className="note-hero note-hero-cards" aria-hidden="true">
    {[['카페', '라떼 1잔', 'D-3', '#f59f00'], ['편의점 금액권', '10,000원', null, '#1b64da'], ['베이커리', '케이크 교환권', null, '#2f9e44']].map(([k, t, d, c], i) =>
      <div key={t} className={`nh-card nh-card-${i}`} style={{ '--c': c }}><small>{k}</small><b>{t}</b>{d && <em>{d}</em>}</div>)}
    <img className="nh-fuli" src="/mascot/v3/fuli-cheer.jpg" alt="" />
  </div>;
}

// ONE MORE 꿀팁 2편 — 공연 티켓 · 기차 승차권 · 주유 영수증
function TicketStack() {
  return <div className="note-hero note-hero-cards is-tickets" aria-hidden="true">
    <div className="nh-pass nh-pass-0"><small>CONCERT</small><b>가을 콘서트</b><time>2026.10.10</time></div>
    <div className="nh-pass nh-pass-1"><small>기차 승차권</small><b>서울 → 부산</b><time>2026.10.11 · 7호차</time></div>
    <div className="nh-receipt nh-receipt-2"><b>주유 영수증</b><span className="nh-line" /><span className="nh-line short" /><small>휘발유 · 2026.10.13</small></div>
    <img className="nh-fuli" src="/mascot/v3/fuli-cheer.jpg" alt="" />
  </div>;
}

// 연재 2편 — 아침에서 저녁까지 하루의 호
function DayArc() {
  return <div className="note-hero note-hero-day" aria-hidden="true">
    <span className="nh-sun" /><span className="nh-moon" />
    <img src="/mascot/v3/fuli-joy.jpg" alt="" />
    <svg viewBox="0 0 400 80" preserveAspectRatio="none"><path d="M10 40 Q200 -10 390 40" fill="none" stroke="#1b64da" strokeWidth="2" strokeDasharray="4 6" /></svg>
    <ol>{['아침', '점심', '퇴근길', '저녁'].map((t) => <li key={t}><i />{t}</li>)}</ol>
  </div>;
}

// 생활 발견 1편 — 같은 동네, 다른 가격(막대 그림, 예시)
function PriceBars() {
  return <div className="note-hero note-hero-bars" aria-hidden="true">
    <p>같은 동네, 다른 가격 (그림은 예시)</p>
    <div className="nh-bars">{[['큰길가', '목 좋은 자리', 92], ['일반 주유', '직원이 주유', 70], ['셀프 주유', '내가 직접', 52]].map(([t, d, h]) =>
      <div key={t}><span style={{ height: `${h}%` }} /><b>{t}</b><small>{d}</small></div>)}</div>
    <img className="nh-fuli" src="/mascot/v3/fuli-cheer.jpg" alt="" />
  </div>;
}

// 사용법 글 표지 — 테스트 오픈 표지와 같은 남색 판에 글자만 바꾼다
function Banner({ hero }) {
  return <div className="note-hero note-hero-open is-text">
    <div><small>{hero.kicker}</small><strong>{lines(hero.headline)}</strong><span>{hero.sub}</span></div>
    <img src={hero.img || '/mascot/v3/fuli-joy.jpg'} alt="" />
  </div>;
}

// 생활 발견 2편(10-21) — 청록 10월 달력(수요일 칸) + 영화표 + 풀리
function CalendarTicket() {
  const days = Array.from({ length: 35 }, (_, i) => i - 3); // 2026-10-01 은 목요일(일 시작 기준 4칸째)
  return <div className="note-hero note-hero-calticket" aria-hidden="true">
    <div className="nh-cal"><b>2026. 10</b>
      <ol>{['일', '월', '화', '수', '목', '금', '토'].map((d) => <li key={d} className="is-head">{d}</li>)}
        {days.map((d, i) => { const on = d >= 1 && d <= 31; return <li key={i} className={`${on && i % 7 === 3 ? 'is-wed' : ''} ${d === 28 ? 'is-circle' : ''}`}>{on ? d : ''}</li>; })}</ol>
    </div>
    <div className="nh-cinema"><small>CINEMA</small><b>수요일 저녁 7시</b><span>2026.10.28 · 5관</span></div>
    <img className="nh-fuli" src="/mascot/v3/fuli-joy.jpg" alt="" />
  </div>;
}

// 연재 4편(10-21) — 선물 쿠폰 + 메모지 + 하트 풀리
function GiftCoupon() {
  return <div className="note-hero note-hero-gift" aria-hidden="true">
    <div className="nh-gift"><small>선물이 도착했어요</small><b>따뜻한 라떼 1잔</b><span>D-3 · 아직 안 썼어요</span></div>
    <div className="nh-memo"><b>생일 축하해!</b><span>커피 한잔하고 힘내 ♥</span></div>
    <img className="nh-fuli" src="/mascot/v3/fuli-heart.jpg" alt="" />
  </div>;
}

const HEROES = { stillLife: StillLife, couponStack: CouponStack, ticketStack: TicketStack, dayArc: DayArc, priceBars: PriceBars, openDate: OpenDate, calendarTicket: CalendarTicket, giftCoupon: GiftCoupon };

export function NoteHero({ hero }) {
  const H = HEROES[hero.type];
  const body = hero.type === 'homeScreen' ? <HomeScreen badge={hero.badge} /> : hero.type === 'banner' ? <Banner hero={hero} /> : H ? <H /> : <OpenDate />;
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
      <div className="note-homemap-shot"><img src="/screens/home-v1026.png" alt="번호를 붙인 풀리프 앱 홈 화면" loading="lazy" />{HOME_MARKS.map(([x, y], i) => <span key={i} style={{ left: `${x}%`, top: `${y}%` }} aria-hidden="true">{i + 1}</span>)}</div>
      <ol>{b.items.map(([title, desc], i) => <li key={title}><span>{i + 1}</span><div><b>{title}</b><small>{desc}</small></div></li>)}</ol>
    </div></figure>;
}

function StepList({ b }) {
  return <ol className="note-steps" start={b.start || 1}>{b.items.map(([title, desc], i) => <li key={title}><span>{(b.start || 1) + i}</span><div><b>{title}</b><p>{desc}</p></div></li>)}</ol>;
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

// 쿠폰이 지나가는 길 — 아이콘 칸이 › 로 이어지고, 마지막 칸만 파랑
function Flow({ b }) {
  return <figure className="note-fig"><figcaption className="note-fig-title">{b.title}</figcaption>
    <ol className="note-flow">{b.items.map(([icon, label], i) => <li key={label} className={i === b.items.length - 1 ? 'is-last' : ''}><i aria-hidden="true">{icon}</i>{lines(label)}</li>)}</ol>
    {b.caption && <p className="note-fig-caption">{b.caption}</p>}</figure>;
}

// 금액권 잔액 예시 — 사용 막대 + 기준 표 + 출처
function Balance({ b }) {
  return <figure className="note-fig note-fig-table">
    <div className="note-balance"><small>{b.kicker}</small><b>{b.title}</b>
      <div className="note-balance-bar"><span style={{ width: `${b.percent}%` }} /></div>
      <p><span>{b.used}</span><span>{b.left}</span></p></div>
    <table className="note-rules"><tbody>{b.rows.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody></table>
    {b.caption && <p className="note-fig-caption">{b.caption}</p>}</figure>;
}

// 두 갈래 카드(다 썼다면 · 쓰기 어렵다면 / 읽는 것 · 저장하지 않는 것)
function Pair({ b }) {
  return <><div className="note-pair">{b.items.map((it, i) => <div key={it.title} className={`is-${it.tone || (i ? 'warm' : 'cool')}`}>
    {it.icon && <i aria-hidden="true">{it.icon}</i>}<b>{it.title}</b>
    {it.body && <p>{it.body}</p>}
    {it.list && <ul>{it.list.map((x) => <li key={x}>{x}</li>)}</ul>}
  </div>)}</div>{b.caption && <p className="note-pair-caption">{b.caption}</p>}</>;
}

// 아이콘 격자(올릴 수 있는 티켓) + 넓은 한 칸
function IconGrid({ b }) {
  return <figure className="note-fig"><figcaption className="note-fig-title">{b.title}</figcaption>
    <ul className="note-icongrid">{b.items.map(([icon, label]) => <li key={label}><i aria-hidden="true">{icon}</i>{label}</li>)}</ul>
    {b.wide && <p className="note-icongrid-wide"><i aria-hidden="true">{b.wide[0]}</i>{b.wide[1]}</p>}
    {b.caption && <p className="note-fig-caption"><Rich text={b.caption} /></p>}</figure>;
}

// 이용한 날부터 7일 — 날짜 칸 + 규칙 두 줄 + 다섯 칸
function SevenDays({ b }) {
  return <figure className="note-fig"><figcaption className="note-fig-title">{b.title}</figcaption>
    <ol className="note-days">{b.days.map((d, i) => <li key={d} className={i === 0 ? 'is-first' : i === b.days.length - 1 ? 'is-out' : ''}>{lines(d)}</li>)}</ol>
    <table className="note-rules"><tbody>{b.rows.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody></table>
    <div className="note-slots">{b.slots.map(([emoji, label], i) => <span key={i} className="note-slot is-soft"><i aria-hidden="true">{emoji}</i>{label}</span>)}<span className="note-slot-arrow" aria-hidden="true">→</span><span className="note-slot-result">{lines(b.result)}</span></div>
    {b.caption && <p className="note-fig-caption">{b.caption}</p>}</figure>;
}

// 오늘의 한 표 예시 — 앱 화면 + 따옴표 문장.
// 폰 테두리는 작게 줄이면 섬 · 모서리가 뭉개진다(10-16) — 화면 위쪽만 카드로 잘라 보인다
function VoteSample({ b }) {
  return <figure className="note-fig"><figcaption className="note-fig-title">{b.title}</figcaption>
    <div className="note-vote"><div className="note-vote-shot"><img src="/screens/today-vote.png" alt="오늘의 한 표 앱 화면 — 요즘 내 삶의 BGM을 고른다면?" width={780} height={1688} loading="lazy" /></div><p>{lines(b.body)}</p></div></figure>;
}

// 알림 예시 — 아이콘 + 시각 · 출처 + 문장
function Alerts({ b }) {
  return <figure className="note-fig"><figcaption className="note-fig-title">{b.title}</figcaption>
    <ul className="note-alerts">{b.items.map(([icon, meta, text]) => <li key={meta}><i aria-hidden="true">{icon}</i><div><small>{meta}</small><b>{text}</b></div></li>)}</ul></figure>;
}

// 이유 네 가지 — 아이콘 · 제목 · 설명 2×2
function Reasons({ b }) {
  return <div className="note-reasons">{b.items.map(([icon, title, desc]) => <div key={title}><i aria-hidden="true">{icon}</i><b>{title}</b><p>{desc}</p></div>)}</div>;
}

// FOUND AI 카드 예시
function FoundCard({ b }) {
  return <figure className="note-fig"><figcaption className="note-fig-title">{b.title}</figcaption>
    <div className="note-foundcard"><small>{b.tag}</small><b>{b.name}</b><span>{b.meta}</span></div>
    {b.caption && <p className="note-fig-caption">{b.caption}</p>}</figure>;
}

// 한 번 더 떠올리면 오래 남아요 — 개념도(실제 수치 아님)
function Curve({ b }) {
  return <figure className="note-fig"><figcaption className="note-fig-title">{b.title}</figcaption>
    <svg className="note-curve" viewBox="0 0 400 170" role="img" aria-label="그냥 두면 기억이 빠르게 흐려지고, 다시 볼 때마다 높아져 천천히 내려가는 개념도">
      <line x1="30" y1="150" x2="390" y2="150" stroke="#c9d3e0" /><line x1="30" y1="10" x2="30" y2="150" stroke="#c9d3e0" />
      <path d="M30 20 C70 90 110 120 390 138" fill="none" stroke="#a7b3c4" strokeWidth="2" strokeDasharray="5 5" />
      <path d="M30 20 C55 60 80 72 110 78 L110 26 C150 60 180 66 220 70 L220 24 C280 44 330 50 390 54" fill="none" stroke="#1b64da" strokeWidth="3" />
      <text x="110" y="18" textAnchor="middle" fill="#1b64da" fontSize="12">다시 보기</text><text x="220" y="16" textAnchor="middle" fill="#1b64da" fontSize="12">다시 보기</text>
      <text x="386" y="46" textAnchor="end" fill="#1b64da" fontSize="12" fontWeight="700">한 번 더 떠올리면</text><text x="386" y="130" textAnchor="end" fill="#8b95a1" fontSize="12">그냥 두면</text>
      <text x="36" y="166" fill="#8b95a1" fontSize="11">기억</text><text x="388" y="166" textAnchor="end" fill="#8b95a1" fontSize="11">시간</text>
    </svg>
    {b.caption && <p className="note-fig-caption">{b.caption}</p>}</figure>;
}

// 아이콘 + 제목 + 한 줄(쿠폰에 담긴 마음 · 찾기 · 즐기기 · 남기기)
function IconRows({ b }) {
  return <ul className="note-iconrows">{b.items.map(([icon, title, desc]) => <li key={title}><i aria-hidden="true">{icon}</i><div><b>{title}</b><p>{desc}</p></div></li>)}</ul>;
}

// 달력(수요일 칸) + 가격 타일 + 날짜 칩 — 생활 발견 2편
function Calendar({ b }) {
  const lead = b.firstDow || 0;
  const cells = Array.from({ length: Math.ceil((lead + b.days) / 7) * 7 }, (_, i) => i - lead + 1);
  return <figure className="note-fig note-calendar"><figcaption className="note-fig-title">{b.title}</figcaption>
    <ol className="note-cal">{['일', '월', '화', '수', '목', '금', '토'].map((d) => <li key={d} className="is-head">{d}</li>)}
      {cells.map((d, i) => {
        const on = d >= 1 && d <= b.days;
        const cls = !on ? 'is-empty' : (b.filled || []).includes(d) ? 'is-filled' : d === b.today ? 'is-today' : (b.light || []).includes(d) ? 'is-light' : '';
        return <li key={i} className={cls}>{on ? d : ''}</li>;
      })}</ol>
    {b.tiles && <div className="note-pricetiles">{b.tiles.map(([k, v], i) => <div key={k} className={i ? 'is-warm' : ''}><small>{k}</small><b>{v}</b></div>)}</div>}
    {b.tilesCaption && <p className="note-fig-caption">{b.tilesCaption}</p>}
    {b.chips && <><p className="note-chips-title">{b.chipsTitle}</p><ul className="note-chips">{b.chips.map((c, i) => <li key={c} className={i === 0 ? 'is-on' : ''}>{c}</li>)}</ul></>}
    {b.chipsCaption && <p className="note-fig-caption">{b.chipsCaption}</p>}</figure>;
}

// 여섯 장 중 한 장 — 쿠폰 칸 + 가로 막대 비교 — 연재 4편
function BarCompare({ b }) {
  return <figure className="note-fig note-barcmp"><figcaption className="note-fig-title">{b.title}</figcaption>
    <div className="note-coupons" aria-hidden="true">{Array.from({ length: b.coupons }, (_, i) => <span key={i} className={i === b.coupons - 1 ? 'is-gone' : ''} />)}</div>
    <dl>{b.bars.map(([k, v, pct], i) => <div key={k} className={i ? 'is-gone' : ''}><dt>{k}</dt><dd><span style={{ width: `${pct}%` }} /><b>{v}</b></dd></div>)}</dl>
    {b.caption && <p className="note-fig-caption">{b.caption}</p>}</figure>;
}

// 결말 세 칸(쓰기 · 나누기 · 모아 두기) — 연재 4편
function Endings({ b }) {
  return <div className="note-endings">{b.items.map(([icon, title, desc, tone]) => <div key={title} className={`is-${tone}`}><i aria-hidden="true">{icon}</i><b>{title}</b><p>{desc}</p></div>)}</div>;
}

// 출처 · 일반 기준 같은 작은 회색 안내
function Fine({ b }) { return <p className="note-fine">{b.text}</p>; }

const FIGS = { iconRows: IconRows, calendar: Calendar, barCompare: BarCompare, endings: Endings, curve: Curve, fine: Fine, flow: Flow, balance: Balance, pair: Pair, iconGrid: IconGrid, sevenDays: SevenDays, voteSample: VoteSample, alerts: Alerts, reasons: Reasons, foundCard: FoundCard, week: Week, compare: Compare, slots: Slots, homeMap: HomeMap, steps: StepList, table: Table, timeline: Timeline, cards: Cards, donate: Donate, founder: Founder };

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
    {data.foot && <p>{data.footIcon !== false && <Icon name="refresh" size={15} />}{data.foot}</p>}
  </section>;
}

export function FuliSays({ text }) {
  return <aside className="note-fulisays"><img src="/mascot/v3/fuli-hands.jpg" alt="풀리" /><div><small>풀리의 한마디</small><p>{lines(text)}</p></div></aside>;
}

// 함께 보면 좋아요 — 연재 편은 공개됐을 때만 링크, 글이 없는 항목은 링크 없이 둔다
export function Related({ items }) {
  return <section className="note-related"><h2>함께 보면 좋아요</h2><ul>{items.map((it) => {
    const inner = <><small>{it.label}</small><b>{it.title}{it.status && <em>{it.status}</em>}</b></>;
    return <li key={it.label + it.title}>{it.href ? <Link href={it.href}>{inner}</Link> : <div className="is-pending">{inner}</div>}</li>;
  })}</ul></section>;
}
