import StoreCta from './StoreCta';

// 요금 카드 묶음 — 월간 · 연간 · 창립 회원 + 앱으로 가는 버튼.
// 멤버십 첫 화면(v3 ① 첫 화면 · 요금). 창립 회원 문구는 2026-10-16 대표님 시안,
// 2026-10-26 수정 — 13개월은 스토어 기준상 빼고 가격 · 기간은 일반 연간과 같게.
export const FOUNDER_TEXT = '이 기간에 연간(49,000원 · 12개월)으로 시작하면 창립 회원 배지를 영구로 드리고, 창립 회원 전용 이벤트가 함께해요. 창립 회원에게는 매년 11월 23일, 풀리프가 정식으로 문을 연 날을 기념해 감사의 선물이 도착해요.';

export default function MemberPlans({ id, className = '' }) {
  return <section className={`member-plans-v3 ${className}`} id={id}>
    <article className="member-price-card is-monthly"><div className="member-price-top"><span>월간</span><b className="member-badge">첫 달 무료</b></div><h3><b>4,900원</b> / 월</h3><p>1개월 무료 체험 뒤 매월 4,900원이 결제돼요. 무료 체험은 한 번만 받을 수 있어요.</p></article>
    <article className="member-price-card"><div className="member-price-top"><span>연간</span><b className="member-badge is-soft">2개월분 할인</b></div><h3><b>49,000원</b> / 년</h3><p>월간보다 1년에 9,800원 아껴요. 연간은 무료 체험 없이 바로 시작해요.</p></article>
    <aside className="member-founder"><img src="/mascot/v3/fuli-clover.jpg" alt="네잎클로버를 든 풀리" width={270} height={235} /><div><h3>창립 회원 · 2026.12.31까지</h3><p>{FOUNDER_TEXT}</p></div></aside>
    <div className="member-plans-cta"><StoreCta /></div>
  </section>;
}
