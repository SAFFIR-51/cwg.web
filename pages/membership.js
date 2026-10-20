import Seo from '../components/Seo';
import Icon from '../components/Icon';
import { Section, SectionHead, Faq, Fine } from '../components/ui';
import { ClosingCTA } from '../components/SubpageDesign';
import { MembershipOpening } from '../components/PageScenes';
import { SectionNav } from '../components/Edition';
import StoreCta from '../components/StoreCta';
import MemberPlans from '../components/MemberPlans';

const BENEFITS = [
  ['ONE MORE · 기부 · 오늘의 한 표', '✓', '✓'],
  ['FOUND AI · 넘버 센스', '✓', '✓'],
  ['한 회차 낙첨 번호 등록', '5세트', '20세트'],
  ['매 회차 풀리프 제공 번호', '2세트', '10세트'],
  ['럭키 스코어 이용', '–', '✓'],
  ['FOUND 생활권 저장', '1곳', '2곳', '집 · 자주 가는 곳, 두 곳의 새 혜택을 함께 찾아 드려요'],
  ['하루 광고 보기 (낙첨 번호 등록 때 보는 광고는 이 횟수에 들어가지 않습니다)', '5회', '10회'],
  ['교환 데이 브랜드 파트너 쿠폰', '4,500P', '3,600P', '1,500원 쿠폰 기준 · 열리는 날과 품목은 일주일 전에 알려 드려요'],
  ['구독 회원 전용 월간 리포트', '–', '✓', '응모 · 당첨 현황, 럭키 스코어 흐름, 넘버 센스 기록, 포인트 · 기부 내역, 그리고 나의 ONE MORE 지수까지'],
  ['챔피언십 참여 · 시즌 · 연간 시상', '–', '✓'],
  ['FULIF+ 전용 경품 이벤트 참여', '–', '✓'],
  ['응모권 1개의 확률', '같아요', '같아요'],
];

// 체크 · 줄표는 그림이라 화면낭독기가 읽지 못한다 — 숨긴 글자로 「제공」 · 「미제공」을 함께 둔다(QA-17)
const mark = (v) => v === '✓' ? <><Icon name="check" size={20} /><span className="sr-only">제공</span></>
  : v === '–' ? <><span aria-hidden="true">–</span><span className="sr-only">미제공</span></> : v;

// 구성은 컴팩트 최종본 v3(2026-10-14) 멤버십 장 — 요금 · 혜택 · 첫 달 무료 · 해지 · 마무리
export default function Membership() {
  return <div className="product-page membership-product">
    <Seo title="멤버십 FULIF+" description="월 4,900원 · 연 49,000원으로 풀리프를 더 알차게. 첫 달은 무료로 써보고 결정하세요. 창립 회원은 2026.12.31까지." />
    <MembershipOpening />
    <SectionNav label="멤버십 페이지 탐색" items={[["plans","요금"],["member-benefits","FULIF+ 혜택"],["trial","첫 달 무료"],["cancel","해지 · 궁금한 점"]]} />
    <MemberPlans id="plans" className="member-single-plan" />
    <Section id="member-benefits">
      <SectionHead title={'FULIF+가 되면\n이렇게 달라져요'} />
      <div className="member-compare mt-10 overflow-hidden rounded-3xl bg-panel"><table className="w-full text-[15px]"><caption className="sr-only">FULIF 무료 회원과 FULIF+ 멤버십 기능 비교</caption><thead><tr className="border-b border-hair"><th scope="col" className="px-5 py-4 text-left font-semibold text-muted"><span className="sr-only">기능</span></th><th scope="col" className="whitespace-nowrap px-3 py-4 text-center"><p className="font-bold">FULIF</p><p className="text-[13px] font-medium text-dim">무료</p></th><th scope="col" className="is-plus whitespace-nowrap px-3 py-4 text-center text-blue"><p className="font-bold">FULIF+</p></th></tr></thead><tbody>{BENEFITS.map(([label,a,b,sub],i)=><tr key={label} className={`border-b border-hair last:border-0 ${i % 2 === 0 ? 'is-highlight' : ''}`}><th scope="row" className="px-5 py-3.5 text-left font-medium">{label}{sub && <small>{sub}</small>}</th><td className="px-3 py-3.5 text-center text-sub">{mark(a)}</td><td className="is-plus px-3 py-3.5 text-center font-semibold text-blue">{mark(b)}</td></tr>)}</tbody></table></div>
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
      {q:'FULIF+면 경품 추첨에 더 유리한가요?',a:'응모권 1개의 확률은 등급과 관계없이 같아요. 다만 한 회차에 등록할 수 있는 낙첨 번호가 FULIF는 5세트, FULIF+는 20세트라서, FULIF+는 응모권을 더 많이 가질 수 있어요. 응모권이 많을수록 기회도 그만큼 늘어요.'},
      {q:'무료 체험을 다시 받을 수 있나요?',a:'한 번만 받을 수 있어요. 이미 받으셨다면 첫 달부터 월 4,900원으로 시작해요.'},
      {q:'포인트로 구독할 수 있나요?',a:'아니요. 포인트는 결제 · 구독과 연결되지 않아요.'},
    ]} /></div></Section>
    <ClosingCTA title={<>한 달은 무료로,<br />천천히 결정하세요</>} mascot="/mascot/v3/fuli-joy.jpg" mascotAlt="활짝 웃는 풀리"><StoreCta className="mt-7" /></ClosingCTA>
  </div>;
}
