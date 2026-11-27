// 연재 「풀리프가 만든 번호, 맞은 번호」 회차 바로가기 — 오른쪽 퀵바(11-27 요청).
// 넓은 화면(1320px 이상)은 오른쪽에 펼친 목록, 좁은 화면은 오른쪽 아래 「연재」 버튼을 누르면 목록이 열린다.
// 챔피언십 페이지와 연재 페이지에 둔다. 지금 보고 있는 회는 파랗게.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RECORDS } from '../lib/records';

const short = (d) => d.replace(/^\d{4}\.\s*/, '').replace(/\s*\(.*\)$/, '').replace(/\.\s*/g, '/').replace(/\/$/, '');

export default function RecordsQuickBar({ current }) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  // 첫 화면(표지)을 지나면 나타난다 — 표지 그림과 겹치지 않게
  useEffect(() => {
    const update = () => setShown(window.scrollY > 320 || current != null);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [current]);
  const list = <ol>{RECORDS.map((r) => <li key={r.no}><Link href={`/records/${r.no}`} aria-current={String(current) === String(r.no) ? 'page' : undefined} onClick={() => setOpen(false)}><b>{r.no}회</b><span>{short(r.date)}</span></Link></li>)}</ol>;
  return <aside className={`rq${shown ? ' is-shown' : ''}${open ? ' is-open' : ''}`} aria-label="연재 회차 바로가기">
    <div className="rq-panel">
      <p className="rq-label">연재</p>
      <p className="rq-title">풀리프가 만든 번호,<br />맞은 번호</p>
      {list}
      <Link href="/records" className="rq-all" onClick={() => setOpen(false)}>전체 보기</Link>
    </div>
    <button type="button" className="rq-fab" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7h10M9 12h10M9 17h7" /><circle cx="5" cy="7" r="1.2" /><circle cx="5" cy="12" r="1.2" /><circle cx="5" cy="17" r="1.2" /></svg>
      <span className="rq-fab-text"><b>연재</b><small>최신 {RECORDS[0].no}회</small></span>
      <svg className="rq-fab-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 15 6-6 6 6" /></svg>
    </button>
  </aside>;
}
