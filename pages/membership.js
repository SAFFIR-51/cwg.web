import Seo from '../components/Seo';
import Icon from '../components/Icon';
import { Section, SectionHead, Faq, Fine } from '../components/ui';
import { ClosingCTA } from '../components/SubpageDesign';
import { MembershipOpening } from '../components/PageScenes';
import { SectionNav } from '../components/Edition';
import StoreCta from '../components/StoreCta';

const BENEFITS = [
  ['ONE MORE · 기부 · 오늘의 한 표', '✓', '✓'],
  ['FOUND AI · 넘버 센스', '✓', '✓'],
  ['한 회차 낙첨 번호 등록', '5세트', '20세트'],
  ['매 회차 풀리프 제공 번호', '2세트', '10세트'],
  ['럭키 스코어 이용', '–', '✓'],
  ['FOUND 생활권 저장', '1곳', '2곳', '집 · 자주 가는 곳, 두 곳의 새 혜택을 함께 찾아 드려요', true],
  ['하루 광고 보기', '10회', '20회'],
  ['구독 회원 전용 월간 리포트', '–', '✓', '응모 · 당첨 현황, 럭키 스코어 흐름, 넘버 센스 기록, 포인트 · 기부 내역, 그리고 나의 ONE MORE 지수까지'],
  ['챔피언십 참여 · 시즌 · 연간 시상', '–', '✓'],
  ['FULIF+ 전용 경품 이벤트 참여', '–', '✓'],
  ['응모권 1개의 확률', '같아요', '같아요'],
];

const mark = (v) => v === '✓' ? <Icon name="check" size={20} /> : v;

// 구성은 컴팩트 최종본 v3(2026-10-14) 멤버십 장 — 요금 · 혜택 · 첫 달 무료 · 해지 · 마무리
export default function Membership() {
  return <div className="product-page membership-product">
    <Seo title="멤버십 FULIF+" description="월 4,900원 · 연 49,000원으로 풀리프를 더 알차게. 첫 달은 무료로 써보고 결정하세요. 창립 회원은 2026.12.31까지." />
    <MembershipOpening />
    <SectionNav label="멤버십 페이지 탐색" items={[["plans","요금"],["member-benefits","FULIF+ 혜택"],["trial","첫 달 무료"],["cancel","해지 · 궁금한 점"]]} />
    <section className="member-single-plan member-plans-v3" id="plans">
      <article className="member-price-card is-monthly"><div className="member-price-top"><span>월간</span><b className="member-badge">첫 달 무료</b></div><h3><b>4,900원</b> / 월</h3><p>1개월 무료 체험 뒤 매월 4,900원이 결제돼요. 무료 체험은 한 번만 받을 수 있어요.</p></article>
      <article className="member-price-card"><div className="member-price-top"><span>연간</span><b className="member-badge is-soft">2개월분 할인</b></div><h3><b>49,000원</b> / 년</h3><p>월간보다 1년에 9,800원 아껴요. 연간은 무료 체험 없이 바로 시작해요.</p></article>
      <aside className="member-founder"><img src="/mascot/v3/fuli-clover.jpg" alt="네잎클로버를 든 풀리" width={270} height={235} /><div><h3>창립 회원 · 2026.12.31까지</h3><p>이 기간에 연간으로 시작하면 49,000원에 13개월, 그리고 창립 회원 배지를 영구로 드려요.</p></div></aside>
      <div className="member-plans-cta"><StoreCta /></div>
    </section>
    <Section id="member-benefits">
      <SectionHead title={'FULIF+가 되면\n이렇게 달라져요'} />
      <div className="member-compare mt-10 overflow-hidden rounded-3xl bg-panel"><table className="w-full text-[15px]"><caption className="sr-only">FULIF 무료 회원과 FULIF+ 멤버십 기능 비교</caption><thead><tr className="border-b border-hair"><th scope="col" className="px-5 py-4 text-left font-semibold text-muted"><span className="sr-only">기능</span></th><th scope="col" className="whitespace-nowrap px-3 py-4 text-center"><p className="font-bold">FULIF</p><p className="text-[12px] font-medium text-dim">무료</p></th><th scope="col" className="is-plus whitespace-nowrap px-3 py-4 text-center text-blue"><p className="font-bold">FULIF+</p></th></tr></thead><tbody>{BENEFITS.map(([label,a,b,sub,hi])=><tr key={label} className={`border-b border-hair last:border-0 ${hi ? 'is-highlight' : ''}`}><th scope="row" className="px-5 py-3.5 text-left font-medium">{label}{sub && <small>{sub}</small>}</th><td className="px-3 py-3.5 text-center text-sub">{mark(a)}</td><td className="is-plus px-3 py-3.5 text-center font-semibold text-blue">{mark(b)}</td></tr>)}</tbody></table></div>
      <Fine className="mt-4">FULIF+ 혜택은 계속 늘어나요.</Fine>
    </Section>
    <Section tone="gray" id="trial">
      <SectionHead title={'첫 달 무료,\n이렇게 진행돼요'} lead="언제 무엇이 결제되는지, 미리 다 알려드려요." />
      <ol className="trial-timeline">{[
        ['시작한 날','오늘은 0원','FULIF+ 혜택을 바로 모두 써요.'],
        ['체험 끝나기 3일 전','미리 알려드려요','결제 날짜와 금액을 알림으로 보내드려요. 이때 연간으로 바꿀 수도 있어요.'],
        ['체험 끝나는 날','매월 4,900원 자동 결제','그 전에 해지하면 결제되지 않아요.'],
      ].map(([when,title,desc])=><li className="reveal" key={when}><span>{when}</span><h3>{title}</h3><p>{desc}</p></li>)}</ol>
    </Section>
    <Section id="cancel"><div className="sub-faq-grid"><div><SectionHead title={'해지는 언제든,\n쌓은 건 그대로'} lead="Google Play · App Store 구독 관리에서 언제든 해지할 수 있어요. 이번 결제 기간이 끝날 때까지 혜택은 그대로이고, 모은 포인트와 이번 시즌 챔피언십 점수도 남아요." /><Fine className="mt-5">풀리프 계정을 삭제해도 구독은 자동으로 해지되지 않아요. 먼저 구독을 해지해 주세요.</Fine></div><Faq items={[
      {q:'FULIF+면 경품 추첨에 더 유리한가요?',a:'아니요. 응모권 1개의 확률은 같아요. 등록할 수 있는 번호와 쓸 수 있는 기능이 더 있을 뿐이에요.'},
      {q:'무료 체험을 다시 받을 수 있나요?',a:'한 번만 받을 수 있어요. 이미 받으셨다면 첫 달부터 월 4,900원으로 시작해요.'},
      {q:'포인트로 구독할 수 있나요?',a:'아니요. 포인트는 결제 · 구독과 연결되지 않아요.'},
    ]} /></div></Section>
    <ClosingCTA title={<>한 달은 무료로,<br />천천히 결정하세요</>} mascot="/mascot/v3/fuli-joy.jpg" mascotAlt="활짝 웃는 풀리"><StoreCta className="mt-7" /></ClosingCTA>
  </div>;
}
