// 연재 「풀리프가 만든 번호, 맞은 번호」 지난 회 전체(챔피언십 페이지 맨 아래 「지난 회 전체 보기」)
import Link from 'next/link';
import Seo from '../../components/Seo';
import Icon from '../../components/Icon';
import { RECORDS, RECORD_SCHEDULE } from '../../lib/records';

export default function Records() {
  return <div className="ch-page rc-page">
    <Seo title="풀리프가 만든 번호, 맞은 번호" description="풀리프가 매주 만드는 번호 전체의 기록이에요. 좋은 주든 아니든 그대로 올려 둡니다." />
    <div className="rc-wrap">
      <div className="rc-top"><Link href="/championship">챔피언십</Link><span>{RECORD_SCHEDULE}</span></div>
      <span className="rc-label">연재</span>
      <h1>풀리프가 만든 번호, 맞은 번호</h1>
      <p className="rc-meta">풀리프가 매주 만드는 번호 전체의 기록이에요. 좋은 주든 아니든 그대로 올려 둡니다.<br />회원님이 챔피언십에서 직접 만드신 번호와는 별개예요.</p>
      <ul className="ch-series-list rc-list">
        {RECORDS.map((r) => <li key={r.no}><Link href={`/records/${r.no}`}><b>{r.no}회</b><span className="is-date">{r.date}</span><span className="is-period">{r.period}</span><Icon name="arrow_forward" size={20} /></Link></li>)}
      </ul>
    </div>
  </div>;
}
