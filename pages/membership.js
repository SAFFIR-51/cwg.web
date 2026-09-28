import Seo from '../components/Seo';
import Link from 'next/link';
import Icon from '../components/Icon';
import { Section, SectionHead, Faq, Note, Fine } from '../components/ui';
import { Art, ClosingCTA } from '../components/SubpageDesign';
import { MembershipOpening } from '../components/PageScenes';
import { MembershipBenefits, SectionNav, PulliNote } from '../components/Edition';

function StoreCta({className=''}) {
  return <Link href="/download" className={'btn-primary '+className}>앱에서 첫 달 무료로 시작하기 <Icon name="arrow_forward" size={18} /></Link>;
}

export default function Membership() {
  return <div className="product-page membership-product">
    <Seo title="멤버십 FULIF+" description="월 5,000원으로 풀리프를 더 알차게. 첫 달은 무료로 써보고 결정하세요. 체험 중 해지하면 결제되지 않아요." />
    <MembershipOpening />
    <SectionNav label="멤버십 페이지 탐색" items={[["member-benefits","멤버십 혜택"],["plans","이용 요금"],["trial","무료 체험"],["member-questions","궁금한 점"]]} />
    <Section id="member-benefits">
      <SectionHead eyebrow="MORE POSSIBILITIES" title={'내가 좋아하는 즐거움을,\n조금 더 넉넉하게'} />
      <MembershipBenefits />
      <Fine className="mt-6">럭키 스코어 · 챔피언십 · FULIF+ 전용 이벤트도 함께 즐길 수 있어요.</Fine>
    </Section>
    <section className="member-exclusive"><div><p className="sub-eyebrow">ONLY FULIF+</p><h2>조금 더 깊이 빠져드는<br />나만의 즐거움.</h2><p>럭키 스코어부터 챔피언십까지.<br />FULIF+만의 새로운 재미도 열려요.</p></div><div className="member-exclusive-items"><article><Art name="score" sizes="250px" /><span>럭키 스코어</span><h3>아쉬웠던 번호를<br />점수로 한 번 더</h3></article><article><Art name="plus" sizes="250px" /><span>챔피언십 · 전용 이벤트</span><h3>기록을 쌓아가는<br />또 다른 재미</h3></article></div><Fine>번호 기능은 당첨 확률을 높여주지 않아요. 챔피언십 시상은 트로피 · 물품 · 포인트로 제공하며 현금은 지급하지 않아요.</Fine></section>
    <section className="member-single-plan" id="plans"><div className="member-plan-intro"><p className="sub-eyebrow">SIMPLE MEMBERSHIP</p><h2>고민은 가볍게.<br />한 달씩, 5,000원.</h2><p>처음이라면 한 달 동안 충분히 써보세요.<br />나에게 맞는지 직접 경험하고 결정할 수 있도록.</p><Fine>무료 체험은 1회 제공돼요.<br />체험 중 해지하면 결제되지 않아요.</Fine></div><article className="member-price-card"><span>FULIF+ 월간 멤버십</span><h3>첫 달 <b>0</b>원</h3><p>그다음부터 <strong>월 5,000원</strong></p><ul><li><Icon name="check" size={19} />모든 FULIF+ 혜택 이용</li><li><Icon name="check" size={19} />결제 3일 전 미리 안내</li><li><Icon name="check" size={19} />언제든 스토어에서 해지</li></ul><StoreCta /><small>무료 체험 이후 매월 자동 결제돼요.</small></article></section>
    <Section>
      <div className="sub-faq-grid"><SectionHead eyebrow="FULIF & FULIF+" title={'무엇이 달라지는지,\n한눈에 비교해요'} /><div><div className="overflow-hidden rounded-3xl bg-panel"><table className="w-full text-[15px]"><caption className="sr-only">FULIF 무료 회원과 FULIF+ 멤버십 기능 비교</caption><thead><tr className="border-b border-hair"><th scope="col" className="px-5 text-left">기능</th><th scope="col" className="px-4">FULIF</th><th scope="col" className="px-4 text-blue">FULIF+</th></tr></thead><tbody>{[
        ['한 회차 낙첨번호 등록','5세트','20세트'],['매 회차 풀리프 제공 번호','2세트','10세트'],['하루 광고 보기','10회','20회'],['럭키 스코어','–','이용 가능'],['챔피언십 · 전용 이벤트','–','이용 가능'],
      ].map(([label,a,b])=><tr key={label} className="border-b border-hair last:border-0"><th scope="row" className="px-5 text-left font-medium">{label}</th><td className="px-4 text-center text-sub">{a}</td><td className="px-4 text-center font-semibold text-blue">{b}</td></tr>)}</tbody></table></div><Note className="mt-5" title="FULIF로도 충분히 즐길 수 있어요">ONE MORE, 쿠폰 기부, 오늘의 한 표, FOUND AI, 넘버 센스는 모든 회원이 똑같이 써요. 응모권 1개의 확률도 FULIF와 FULIF+가 같아요.</Note></div></div>
    </Section>
    <Section tone="gray" id="trial">
      <SectionHead eyebrow="NO SURPRISES" title={'언제 무엇이 결제되는지,\n미리 다 알려드려요'} lead="월간 멤버십의 첫 달 무료 체험은 이렇게 진행돼요." />
      <ol className="trial-timeline">{[
        ['시작한 날','오늘은 0원','FULIF+ 혜택을 바로 모두 써요.'],
        ['체험 끝나기 3일 전','미리 알려드려요','결제 날짜와 금액을 알림으로 보내드려요.'],
        ['체험 끝나는 날','매월 5,000원 자동 결제','그 전에 해지하면 결제되지 않아요.'],
      ].map(([when,title,desc])=><li className="reveal" key={when}><span>{when}</span><h3>{title}</h3><p>{desc}</p></li>)}</ol><Fine className="mt-8">결제 3일 전 안내는 꼭 필요한 안내라 알림 설정에서 끌 수 없어요.</Fine>
    </Section>
    <Section><div className="sub-faq-grid"><SectionHead eyebrow="ALWAYS YOUR CHOICE" title={'해지는 언제든,\n쌓은 건 그대로'} lead="Google Play · App Store 구독 관리에서 언제든 해지할 수 있어요." /><div><ul className="cancel-list">{['이번 결제 기간이 끝날 때까지 FULIF+ 혜택','지금까지 모은 포인트','이번 시즌 챔피언십 점수'].map(t=><li key={t}><Icon name="check_circle" size={23} />{t}</li>)}</ul><Fine className="mt-6">풀리프 계정을 삭제해도 구독은 자동으로 해지되지 않아요. 요금이 계속 결제되지 않도록 먼저 구독을 해지해 주세요.</Fine></div></div></Section>
    <Section tone="gray" id="member-questions"><div className="sub-faq-grid"><div><SectionHead title={'멤버십,\n이것이 궁금해요'} /><PulliNote>첫 달은 천천히 써보고,<br />나에게 맞는지 결정하세요.</PulliNote></div><Faq items={[
      {q:'FULIF+ 무료 체험이 끝나면 어떻게 되나요?',a:'체험이 끝나는 날부터 매월 5,000원이 자동으로 결제돼요. 결제 3일 전에 알려드리고, 그 전에 해지하면 결제되지 않아요.'},
      {q:'FULIF+면 경품 추첨에 더 유리한가요?',a:'아니요. 응모권 1개의 확률은 FULIF와 FULIF+가 같아요. FULIF+는 등록할 수 있는 번호가 많고, 쓸 수 있는 기능이 더 있을 뿐이에요.'},
      {q:'무료 체험을 다시 받을 수 있나요?',a:'무료 체험은 한 번만 받을 수 있어요. 이미 받으셨다면 첫 달부터 월 5,000원으로 시작해요.'},
      {q:'포인트로 구독할 수 있나요?',a:'아니요. 포인트는 결제 · 구독과 연결되지 않고, 풀리프 안의 혜택에만 써요.'},
    ]} /></div></Section>
    <ClosingCTA title={<>한 달은 무료로,<br />천천히 결정하세요.</>} lead="구독과 결제는 앱에서만 진행돼요." art="plus"><StoreCta className="mt-7" /></ClosingCTA>
  </div>;
}
