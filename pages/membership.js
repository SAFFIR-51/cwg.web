import Seo from '../components/Seo';
import Link from 'next/link';
import Icon from '../components/Icon';
import { Section, SectionHead, Faq, Note, Fine, Phone, PulliNote, SectionNav } from '../components/ui';
import { PageHero, CompareBars, FeatureGrid, PricingCard, CtaBand } from '../components/blocks';

function StoreCta({ className = '' }) {
  return <Link href="/download" className={'btn-primary ' + className}>앱에서 첫 달 무료로 시작하기 <Icon name="arrow_forward" size={18} /></Link>;
}

export default function Membership() {
  return <div className="page page-membership">
    <Seo title="멤버십 FULIF+" description="월 5,000원으로 풀리프를 더 알차게. 첫 달은 무료로 써보고 결정하세요. 체험 중 해지하면 결제되지 않아요." />

    <PageHero
      tone="gradient"
      eyebrow="FULIF+ 멤버십"
      title={'일상을 더 좋아하는\n나를 위한 플러스.'}
      lead={'더 많이 등록하고, 더 다양하게 즐기는 멤버십.\n첫 한 달은 무료로 경험해 보세요.'}
      actions={<><Link href="/download" className="btn-primary btn-on-brand">첫 달 무료로 시작하기 <Icon name="arrow_forward" size={18} /></Link><a href="#plans" className="btn-link text-white">결제 안내 <Icon name="arrow_downward" size={16} /></a></>}
      note="무료 체험 1회 · 이후 월 5,000원 자동 결제 · 체험 중 해지하면 결제되지 않아요."
      visual={<Phone src="/screens/subscription.png" alt="FULIF+ 멤버십 안내 화면" size="lg" priority />}
    />

    <SectionNav label="멤버십 페이지 탐색" items={[["member-benefits", "멤버십 혜택"], ["plans", "이용 요금"], ["trial", "무료 체험"], ["member-questions", "궁금한 점"]]} />

    <Section id="member-benefits">
      <SectionHead eyebrow="MORE POSSIBILITIES" title={'내가 좋아하는 즐거움을,\n조금 더 넉넉하게'} lead="FULIF+는 이용 한도와 기능이 더 넉넉해요. 응모권 1개의 당첨 확률은 모든 회원이 같아요." />
      <CompareBars className="mt-10" rows={[
        { label: '한 회차 낙첨번호 등록', free: 5, plus: 20, unit: '세트' },
        { label: '매 회차 풀리프 제공 번호', free: 2, plus: 10, unit: '세트' },
        { label: '하루 광고 보기', free: 10, plus: 20, unit: '회' },
      ]} />
      <Fine className="mt-6">럭키 스코어 · 챔피언십 · FULIF+ 전용 이벤트도 함께 즐길 수 있어요.</Fine>
    </Section>

    <Section tone="gray">
      <SectionHead eyebrow="ONLY FULIF+" title={'조금 더 깊이 빠져드는\n나만의 즐거움.'} lead="럭키 스코어부터 챔피언십까지. FULIF+만의 새로운 재미도 열려요." />
      <FeatureGrid cols={2} size="lg" className="mt-10" items={[
        { art: 'score', tag: '럭키 스코어', title: '아쉬웠던 번호를 점수로 한 번 더', desc: '등록한 번호의 아쉬움을 점수로 바꾸고, 점수에 따라 포인트를 드려요.' },
        { art: 'plus', tag: '챔피언십 · 전용 이벤트', title: '기록을 쌓아가는 또 다른 재미', desc: '나만의 번호를 만들고, 회차 결과와 얼마나 가까웠는지로 점수를 쌓는 1년 시즌이에요.' },
      ]} />
      <Fine className="mt-5">번호 기능은 당첨 확률을 높여주지 않아요. 챔피언십 시상은 트로피 · 물품 · 포인트로 제공하며 현금은 지급하지 않아요.</Fine>
    </Section>

    <Section id="plans">
      <div className="plan-block">
        <SectionHead eyebrow="SIMPLE MEMBERSHIP" title={'고민은 가볍게.\n한 달씩, 5,000원.'} lead={'처음이라면 한 달 동안 충분히 써보세요.\n나에게 맞는지 직접 경험하고 결정할 수 있도록.'} />
        <PricingCard
          items={['모든 FULIF+ 혜택 이용', '결제 3일 전 미리 안내', '언제든 스토어에서 해지']}
          cta={<StoreCta />}
          small="무료 체험은 1회 제공돼요. 체험 중 해지하면 결제되지 않아요. 무료 체험 이후 매월 자동 결제돼요."
        />
      </div>
    </Section>

    <Section tone="gray">
      <div className="faq-grid"><SectionHead eyebrow="FULIF & FULIF+" title={'무엇이 달라지는지,\n한눈에 비교해요'} /><div><div className="compare-table"><table className="w-full text-[15px]"><caption className="sr-only">FULIF 무료 회원과 FULIF+ 멤버십 기능 비교</caption><thead><tr className="border-b border-hair"><th scope="col" className="text-left">기능</th><th scope="col">FULIF</th><th scope="col" className="text-blue">FULIF+</th></tr></thead><tbody>{[
        ['한 회차 낙첨번호 등록', '5세트', '20세트'], ['매 회차 풀리프 제공 번호', '2세트', '10세트'], ['하루 광고 보기', '10회', '20회'], ['럭키 스코어', '–', '이용 가능'], ['챔피언십 · 전용 이벤트', '–', '이용 가능'],
      ].map(([label, a, b]) => <tr key={label} className="border-b border-hair last:border-0"><th scope="row" className="text-left font-medium">{label}</th><td className="text-center text-sub">{a}</td><td className="text-center font-semibold text-blue">{b}</td></tr>)}</tbody></table></div><Note className="mt-5" title="FULIF로도 충분히 즐길 수 있어요">ONE MORE, 쿠폰 기부, 오늘의 한 표, FOUND AI, 넘버 센스는 모든 회원이 똑같이 써요. 응모권 1개의 확률도 FULIF와 FULIF+가 같아요.</Note></div></div>
    </Section>

    <Section id="trial">
      <SectionHead eyebrow="NO SURPRISES" title={'언제 무엇이 결제되는지,\n미리 다 알려드려요'} lead="월간 멤버십의 첫 달 무료 체험은 이렇게 진행돼요." />
      <ol className="trial-timeline">{[
        ['시작한 날', '오늘은 0원', 'FULIF+ 혜택을 바로 모두 써요.'],
        ['체험 끝나기 3일 전', '미리 알려드려요', '결제 날짜와 금액을 알림으로 보내드려요.'],
        ['체험 끝나는 날', '매월 5,000원 자동 결제', '그 전에 해지하면 결제되지 않아요.'],
      ].map(([when, title, desc]) => <li className="reveal" key={when}><span>{when}</span><h3>{title}</h3><p>{desc}</p></li>)}</ol>
      <Fine className="mt-6">결제 3일 전 안내는 꼭 필요한 안내라 알림 설정에서 끌 수 없어요.</Fine>
    </Section>

    <Section tone="gray"><div className="faq-grid"><SectionHead eyebrow="ALWAYS YOUR CHOICE" title={'해지는 언제든,\n쌓은 건 그대로'} lead="Google Play · App Store 구독 관리에서 언제든 해지할 수 있어요." /><div><ul className="check-list">{['이번 결제 기간이 끝날 때까지 FULIF+ 혜택', '지금까지 모은 포인트', '이번 시즌 챔피언십 점수'].map(t => <li key={t}><Icon name="check_circle" size={22} />{t}</li>)}</ul><Fine className="mt-6">풀리프 계정을 삭제해도 구독은 자동으로 해지되지 않아요. 요금이 계속 결제되지 않도록 먼저 구독을 해지해 주세요.</Fine></div></div></Section>

    <Section id="member-questions"><div className="faq-grid"><div><SectionHead title={'멤버십,\n이것이 궁금해요'} /><PulliNote>첫 달은 천천히 써보고,<br />나에게 맞는지 결정하세요.</PulliNote></div><Faq items={[
      { q: 'FULIF+ 무료 체험이 끝나면 어떻게 되나요?', a: '체험이 끝나는 날부터 매월 5,000원이 자동으로 결제돼요. 결제 3일 전에 알려드리고, 그 전에 해지하면 결제되지 않아요.' },
      { q: 'FULIF+면 경품 추첨에 더 유리한가요?', a: '아니요. 응모권 1개의 확률은 FULIF와 FULIF+가 같아요. FULIF+는 등록할 수 있는 번호가 많고, 쓸 수 있는 기능이 더 있을 뿐이에요.' },
      { q: '무료 체험을 다시 받을 수 있나요?', a: '무료 체험은 한 번만 받을 수 있어요. 이미 받으셨다면 첫 달부터 월 5,000원으로 시작해요.' },
      { q: '포인트로 구독할 수 있나요?', a: '아니요. 포인트는 결제 · 구독과 연결되지 않고, 풀리프 안의 혜택에만 써요.' },
    ]} /></div></Section>

    <CtaBand title={'한 달은 무료로,\n천천히 결정하세요.'} lead="구독과 결제는 앱에서만 진행돼요." screen="/screens/subscription.png"><StoreCta className="btn-on-brand mt-7" /></CtaBand>
  </div>;
}
