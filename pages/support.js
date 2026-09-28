import Link from 'next/link';
import Seo from '../components/Seo';
import Icon, { IconCircle } from '../components/Icon';
import { Section, SectionHead, Faq } from '../components/ui';
import { PulliNote } from '../components/Edition';

export default function Support() {
  return (
    <div className="product-page support-product">
      <Seo title="고객센터" description="풀리프 이용 중 궁금한 점은 앱 안의 고객센터에서 가장 빠르게 답을 찾을 수 있어요." />
      <header className="support-hero">
          <p className="eyebrow mb-3">고객센터</p>
          <h1>궁금한 순간에도,<br />풀리와 함께.</h1>
          <p className="lead mt-5 max-w-xl">풀리프 이용 중 궁금한 점은 앱 안의 고객센터에서 가장 빠르게 답을 찾을 수 있어요.</p>
          <img src="/mascot/clover_search.png" alt="궁금한 것을 찾는 풀리" />
      </header>
      <Section tone="gray">
        <div className="support-links">
          {[
            ['help', '앱 안의 고객센터', '마이 → 고객센터에서 자주 묻는 질문을 검색하고, 1:1 문의를 남길 수 있어요.', '/download'],
            ['workspace_premium', '멤버십 · 결제', '무료 체험, 결제, 해지에 대한 안내는 멤버십 페이지에 정리해 두었어요.', '/membership'],
            ['person_remove', '계정 및 데이터 삭제', '앱에서 직접 삭제하거나, 안내 페이지의 방법으로 요청할 수 있어요.', '/delete-account'],
          ].map(([icon, t, d, href]) => {
            return <Link key={t} href={href} className="reveal"><IconCircle name={icon} tone="blue" size={48} /><h2>{t}</h2><p>{d}</p><span className="support-arrow">{href==='/download'?'앱 다운로드 안내':'안내 자세히 보기'}<Icon name="arrow_forward" size={17}/></span></Link>;
          })}
        </div>
        <p className="mt-8 text-[14px] text-sub">광고 · 스폰서십 관련 문의는 <Link href="/partners" className="font-semibold text-blue">브랜드 파트너 문의</Link>를 이용해 주세요.</p>
      </Section>
      <Section><div className="sub-faq-grid"><div><SectionHead eyebrow="QUICK ANSWERS" title={'자주 궁금한 것부터\n확인해 보세요.'}/><PulliNote>궁금한 점이 더 있나요?<br />앱의 마이 → 고객센터에서 만나요.</PulliNote></div><Faq items={[
        {q:'풀리프는 누구나 이용할 수 있나요?',a:'만 19세 이상부터 이용할 수 있어요. 무료 FULIF 회원도 쿠폰·티켓, 오늘의 한 표, FOUND AI를 이용할 수 있어요.'},
        {q:'앱을 지우면 멤버십도 해지되나요?',a:'앱 삭제나 회원 탈퇴로는 스토어 구독이 자동 해지되지 않아요. 결제한 Google Play 또는 App Store의 구독 관리에서 직접 해지해 주세요.'},
        {q:'포인트를 현금으로 바꿀 수 있나요?',a:'포인트는 현금으로 바꾸거나 다른 사람에게 양도·거래할 수 없어요. 유효기간은 적립일부터 2년이에요.'},
        {q:'FOUND AI가 계속 제 위치를 추적하나요?',a:'아니요. 직접 정한 시·구·동 생활권을 바탕으로 혜택을 찾아요. 실시간 위치 좌표를 수집하거나 추적하지 않아요.'},
      ]}/></div></Section>
    </div>
  );
}
