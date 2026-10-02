import Seo from '../components/Seo';
import Link from 'next/link';
import Icon from '../components/Icon';
import { Section, SectionHead, Faq, Note, Fine } from '../components/ui';
import { ClosingCTA } from '../components/SubpageDesign';
import { MembershipOpening } from '../components/PageScenes';
import { SectionNav } from '../components/Edition';

function StoreCta({className=''}) {
  return <Link href="/download" className={'btn-primary '+className}>앱에서 1개월 무료로 시작하기 <Icon name="arrow_forward" size={18} /></Link>;
}

// 구성은 PDF 2026.09.24 멤버십 장을 따른다. 연간 요금은 사용자 지시로 제외(월간만 판매).
export default function Membership() {
  return <div className="product-page membership-product">
    <Seo title="멤버십 FULIF+" description="월 5,000원으로 풀리프를 더 알차게. 첫 달은 무료로 써보고 결정하세요. 체험 중 해지하면 결제되지 않아요." />
    <MembershipOpening />
    <SectionNav label="멤버십 페이지 탐색" items={[["plans","요금"],["member-benefits","FULIF+ 혜택"],["trial","첫 달 무료"],["cancel","해지"],["member-questions","궁금한 점"]]} />
    <section className="member-single-plan" id="plans"><div className="member-plan-intro"><p className="sub-eyebrow">SIMPLE MEMBERSHIP</p><h2>고민은 가볍게.<br />한 달씩, 5,000원.</h2></div><article className="member-price-card"><span>월간 · 첫 달 무료</span><h3><b>5,000</b>원 / 월</h3><p>1개월 무료 체험 뒤 매월 5,000원이 결제돼요.<br />무료 체험은 한 번만 받을 수 있어요.</p></article></section>
    <Section id="member-benefits">
      <div className="sub-faq-grid"><SectionHead eyebrow="FULIF & FULIF+" title={'FULIF+가 되면\n이렇게 달라져요'} /><div><div className="overflow-hidden rounded-3xl bg-panel"><table className="w-full text-[15px]"><caption className="sr-only">FULIF 무료 회원과 FULIF+ 멤버십 기능 비교</caption><thead><tr className="border-b border-hair"><th scope="col" className="px-5 text-left">기능</th><th scope="col" className="px-4">FULIF</th><th scope="col" className="px-4 text-blue">FULIF+</th></tr></thead><tbody>{[
        ['한 회차 낙첨번호 등록','5세트','20세트'],['매 회차 풀리프 제공 번호','2세트','10세트'],['하루 광고 보기','10회','20회'],['럭키 스코어','–','✓'],['챔피언십 · FULIF+ 전용 이벤트','–','✓'],
      ].map(([label,a,b])=><tr key={label} className="border-b border-hair last:border-0"><th scope="row" className="px-5 text-left font-medium">{label}</th><td className="px-4 text-center text-sub">{a}</td><td className="px-4 text-center font-semibold text-blue">{b}</td></tr>)}</tbody></table></div><Note className="mt-5" title="FULIF로도 충분히 즐길 수 있어요">ONE MORE, 쿠폰 기부, 오늘의 한 표, FOUND AI, 넘버 센스는 모든 회원이 똑같이 써요. 응모권 1개의 확률도 FULIF와 FULIF+가 같아요.</Note></div></div>
    </Section>
    <Section tone="gray" id="trial">
      <SectionHead eyebrow="NO SURPRISES" title={'첫 달 무료,\n이렇게 진행돼요'} lead="언제 무엇이 결제되는지, 미리 다 알려드려요." />
      <ol className="trial-timeline">{[
        ['시작한 날','오늘은 0원','FULIF+ 혜택을 바로 모두 써요.'],
        ['체험 끝나기 3일 전','미리 알려드려요','결제 날짜와 금액을 알림으로 보내드려요.'],
        ['체험 끝나는 날','매월 5,000원 자동 결제','그 전에 해지하면 결제되지 않아요.'],
      ].map(([when,title,desc])=><li className="reveal" key={when}><span>{when}</span><h3>{title}</h3><p>{desc}</p></li>)}</ol><Fine className="mt-8">결제 3일 전 안내는 꼭 필요한 안내라 알림 설정에서 끌 수 없어요.</Fine>
    </Section>
    <Section id="cancel"><div className="sub-faq-grid"><SectionHead eyebrow="ALWAYS YOUR CHOICE" title={'해지는 언제든,\n쌓은 건 그대로'} lead="Google Play · App Store 구독 관리에서 언제든 해지할 수 있어요. 해지해도 이것들은 남아요." /><div><ul className="cancel-list">{['이번 결제 기간이 끝날 때까지 FULIF+ 혜택','지금까지 모은 포인트','이번 시즌 챔피언십 점수'].map(t=><li key={t}><Icon name="check_circle" size={23} />{t}</li>)}</ul><Fine className="mt-6">풀리프 계정을 삭제해도 구독은 자동으로 해지되지 않아요. 요금이 계속 결제되지 않도록 먼저 구독을 해지해 주세요.</Fine></div></div></Section>
    <Section tone="gray" id="member-questions"><div className="sub-faq-grid"><div><SectionHead title={'멤버십,\n이것이 궁금해요'} /></div><Faq items={[
      {q:'FULIF+ 무료 체험이 끝나면 어떻게 되나요?',a:'체험이 끝나는 날부터 매월 5,000원이 자동으로 결제돼요. 결제 3일 전에 알려드리고, 그 전에 해지하면 결제되지 않아요.'},
      {q:'FULIF+면 경품 추첨에 더 유리한가요?',a:'아니요. 응모권 1개의 확률은 FULIF와 FULIF+가 같아요. FULIF+는 등록할 수 있는 번호가 많고, 쓸 수 있는 기능이 더 있을 뿐이에요.'},
      {q:'무료 체험을 다시 받을 수 있나요?',a:'무료 체험은 한 번만 받을 수 있어요. 이미 받으셨다면 첫 달부터 월 5,000원으로 시작해요.'},
      {q:'포인트로 구독할 수 있나요?',a:'아니요. 포인트는 결제 · 구독과 연결되지 않고, 풀리프 안의 혜택에만 써요.'},
    ]} /></div></Section>
    <ClosingCTA title={<>한 달은 무료로,<br />천천히 결정하세요</>} art="plus"><StoreCta className="mt-7" /></ClosingCTA>
  </div>;
}
