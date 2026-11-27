// 연재 「풀리프가 만든 번호, 맞은 번호」 한 회 — 11-26 1회 PDF 의 웹 글 부분(내부 메모는 싣지 않는다).
import Link from 'next/link';
import Seo from '../../components/Seo';
import Icon from '../../components/Icon';
import RecordsQuickBar from '../../components/RecordsQuickBar';
import { RECORDS, recordByNo } from '../../lib/records';

export async function getStaticPaths() {
  return { paths: RECORDS.map((r) => ({ params: { no: String(r.no) } })), fallback: false };
}
export async function getStaticProps({ params }) {
  return { props: { no: params.no } };
}

const fmt = (n) => n.toLocaleString('ko-KR');

// 1,000칸 중 n칸 — 자리는 회차 번호로 고정한 난수(새로 고쳐도 같은 그림)
function Dots({ lit, seed }) {
  const cols = 40, rows = 25, gap = 10, r = 3.4;
  let s = seed * 9301 + 49297;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const on = new Set();
  while (on.size < lit) on.add(Math.floor(rand() * cols * rows));
  return <svg viewBox={`0 0 ${cols * gap} ${rows * gap}`} role="img" aria-label={`1,000세트 중 ${lit}세트가 겹침`}>
    {Array.from({ length: cols * rows }, (_, i) => <circle key={i} cx={(i % cols) * gap + gap / 2} cy={Math.floor(i / cols) * gap + gap / 2} r={on.has(i) ? r + .4 : r} fill={on.has(i) ? '#246bfe' : '#d5dce6'} />)}
  </svg>;
}

export default function Record({ no }) {
  const r = recordByNo(no);
  const f = r.focus;
  const max = Math.max(...f.breakdown.map((b) => b[2]));
  const maxRatio = Math.max(...r.countries.map((c) => c[5]));
  const idx = RECORDS.indexOf(r);
  const newer = RECORDS[idx - 1];
  const older = RECORDS[idx + 1];
  return <div className="ch-page rc-page">
    <Seo title={`풀리프가 만든 번호, 맞은 번호 ${r.no}회`} description={`${r.title.join(' ')} — ${r.meta}`} />
    <article className="rc-wrap">
      <div className="rc-top"><Link href="/records">풀리프가 만든 번호, 맞은 번호</Link><span>{r.no}회 · {r.date}</span></div>
      <span className="rc-label">연재 · {r.no}회</span>
      <h1>{r.title[0]}<br />{r.title[1]}</h1>
      <p className="rc-meta">{r.meta}</p>
      <p className="rc-byline">{r.byline}</p>

      <section className="rc-sec">
        <h2><span>01</span>이번 주 결과</h2>
        <p>{r.intro}<br /><b>회원님이 챔피언십에서 직접 만드신 번호와는 별개예요.</b></p>
        <div className="rc-stats">{r.stats.map((s) => <div key={s.label} className={`rc-stat${s.accent ? ' is-accent' : ''}`}><span>{s.label}</span><b>{s.value}{s.unit && <small>{s.unit}</small>}</b><p>{s.sub}</p></div>)}</div>
        <div className="rc-table"><table>
          <thead><tr><th>로또</th><th>어디</th><th>추첨</th><th>한 주</th><th className="is-num">만든 세트</th></tr></thead>
          <tbody>
            {r.games.map((g) => <tr key={g[0]}>{g.map((c, i) => <td key={i} className={i === 4 ? 'is-num' : ''}>{c}</td>)}</tr>)}
            <tr className="is-total">{r.gamesTotal.map((c, i) => <td key={i} className={i === 4 ? 'is-num' : ''}>{c}</td>)}</tr>
          </tbody>
        </table></div>
        {r.gamesNote.map((t) => <p key={t} className="rc-fine">{t}</p>)}
      </section>

      <section className="rc-sec">
        <h2><span>02</span>1,000세트 중 {f.perThousand}세트</h2>
        <p>{f.lead}</p>
        <div className="rc-dots-card">
          <Dots lit={f.perThousand} seed={r.no} />
          <div className="rc-dots-legend"><b>1,000세트 중 {f.perThousand}세트 — {f.name}</b><div><span><i className="is-on" />겹침</span><span><i />겹치지 않음</span></div></div>
        </div>
      </section>

      <section className="rc-sec">
        <h2><span>03</span>몇 개나 겹쳤을까요</h2>
        <p>{f.breakdownLead}</p>
        <div className="rc-bars">
          {f.breakdown.map(([k, rank, n]) => <div key={k} className="rc-bar"><span>{k}<small>({rank})</small></span><i><em className={n ? '' : 'is-zero'} style={{ width: `${(n / max) * 100}%` }} /></i><b>{fmt(n)}<small>세트</small></b></div>)}
          <div className="rc-bar is-rest"><span>겹치지 않음</span><i>나머지 세트 전부 — 위 막대와 눈금이 다릅니다</i><b>{fmt(f.rest)}<small>세트</small></b></div>
        </div>
        <p className="rc-fine">{f.name} · 그 주의 번호 {f.numbers.join(' ')} + 보너스 {f.bonus}<br />괄호 안 등수는 각 나라 복권의 공식 기준이며, 풀리프가 매긴 것이 아닙니다.</p>
      </section>

      <section className="rc-sec">
        <h2><span>04</span>나라별로 보면</h2>
        <p>{r.countriesLead}</p>
        <div className="rc-table"><table>
          <thead><tr><th>게임</th><th>회차</th><th>추첨일</th><th className="is-num">만든 세트</th><th className="is-num">겹친 세트</th><th className="is-num">비율</th><th>가장 많이 겹친 세트</th></tr></thead>
          <tbody>{r.countries.map((c) => <tr key={c[0] + c[1]}>
            <td>{c[0]}</td><td>{c[1]}</td><td>{c[2]}</td><td className="is-num">{fmt(c[3])}</td><td className="is-num">{fmt(c[4])}</td>
            <td className="is-num"><span className="rc-ratio"><i><em style={{ width: `${(c[5] / maxRatio) * 100}%` }} /></i>{c[5].toFixed(1)}%</span></td>
            <td>{c[6]}<span className="rc-rank">({c[7]})</span></td>
          </tr>)}</tbody>
        </table></div>
        <p className="rc-fine">{r.countriesNote}</p>
      </section>

      <section className="rc-sec">
        <h2><span>05</span>이번 주에 쓴 기준</h2>
        <p>풀리프에는 번호를 고르는 35가지 기준이 있어요. 그중 이번 주에 함께 쓴 기준을 적어 둡니다.</p>
        <div className="rc-criteria">{r.criteria.map(([t, d], i) => <div key={t}><span>{i + 1}</span><b>{t}</b><p>{d}</p></div>)}</div>
        <div className="rc-notice"><b>기준을 바꾸면 만들어지는 번호가 달라집니다.<br />각 조합이 뽑힐 확률은 달라지지 않습니다.</b><p>이 숫자는 풀리프가 만든 번호의 기록이며, 실제 구매나 당첨 실적이 아닙니다. 회원에게 나간 번호만을 센 것도 아니고, 챔피언십 참여 번호도 아닙니다.</p></div>
      </section>

      <div className="rc-fuli"><img src="/mascot/pulli-profile-v2.png" alt="풀리" /><p><span>풀리의 한마디</span>{r.fuli}</p></div>

      <nav className="rc-nav" aria-label="다른 회 보기">
        {older ? <Link href={`/records/${older.no}`}><Icon name="chevron_left" size={18} />{older.no}회</Link> : <Link href="/records">지난 회 전체 보기</Link>}
        {newer ? <Link href={`/records/${newer.no}`}>{newer.no}회<Icon name="chevron_right" size={18} /></Link> : <Link href="/championship" className="is-primary">챔피언십 알아보기<Icon name="arrow_forward" size={18} /></Link>}
      </nav>
    </article>
    <RecordsQuickBar current={r.no} />
  </div>;
}
