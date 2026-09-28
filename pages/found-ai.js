import Seo from '../components/Seo';
import Icon from '../components/Icon';
import { Section, SectionHead, Steps, Faq } from '../components/ui';
import { PhoneScene, ClosingCTA } from '../components/SubpageDesign';
import { DiscoveryHero, DiscoveryPlaces, SectionNav, PulliNote } from '../components/Edition';
import FoundNeighborhood from '../components/FoundNeighborhood';

export default function FoundAi() {
  return <div className="product-page found-product">
    <Seo title="FOUND AI" description="내 생활권의 편의점 · 마트 · 주유소 혜택을, 확인한 날짜와 함께 한곳에 정리해 드려요. 검색하지 않아도 괜찮아요." />
    <DiscoveryHero />
    <SectionNav label="FOUND AI 페이지 탐색" items={[["neighborhood","동네 둘러보기"],["found-promises","세 가지 약속"],["how-it-works","이용 방법"],["places","찾아주는 곳"],["found-questions","자주 묻는 질문"]]} />
    <FoundNeighborhood />
    <Section id="found-promises">
      <SectionHead eyebrow="FOUND AI" title={'FOUND AI는\n이렇게 일해요'} lead="편하게 쓰시도록, 세 가지는 꼭 지켜요." />
      <div className="found-promises">
        {[
          ['search_off', <>찾지 않으셔도<br />돼요</>, '회원님이 검색하지 않아도 풀리프가 먼저 찾아 정리해 드려요.'],
          ['verified', <>없는 혜택은<br />만들지 않아요</>, '확인된 것만 올려요. 모든 혜택에 확인한 날짜를 함께 적어드려요.'],
          ['location_off', <>위치를<br />따라다니지 않아요</>, '한 번 정하신 지역만 사용하고, 실시간 위치는 보지 않아요.'],
        ].map(([icon,title,desc])=><article className="reveal" key={icon}><span className="promise-icon"><Icon name={icon} size={28} /></span><h3>{title}</h3><p>{desc}</p></article>)}
      </div>
    </Section>
    <Section tone="gray" id="how-it-works">
      <div className="found-how">
        <PhoneScene src="/screens/found.png" alt="FOUND AI 생활권 혜택 앱 화면" art="coupon" badge="만료가 가까운 쿠폰부터 챙겨요" />
        <div><SectionHead eyebrow="JUST YOUR NEIGHBORHOOD" title={'생활권만 정하면,\n나머지는 풀리가'} /><Steps className="mt-7" items={[
          {title:'생활권 정하기',desc:'시 · 구 · 동을 한 번만 정해두면 돼요. 한 곳을 정해 쓰고, 언제든 다른 지역으로 바꿀 수 있어요.'},
          {title:'풀리가 찾아 정리',desc:'그 지역의 편의점 행사, 마트 행사, 주유 가격을 모아 카드로 보여드려요.'},
          {title:'지금 챙길 것부터',desc:'FOUND 맨 위에는 보관함에서 만료가 가까운 쿠폰을 먼저 보여드려요.'},
        ]} /></div>
      </div>
    </Section>
    <Section id="places">
      <SectionHead eyebrow="EVERYDAY PLACES" title={'지금은 편의점 · 마트 ·\n주유소부터'} lead="매일 들르는 곳부터 시작했어요. 찾는 곳은 차차 늘려갈게요." />
      <DiscoveryPlaces />
    </Section>
    <Section id="found-questions"><div className="sub-faq-grid"><div><SectionHead title={'궁금하실 것\n같아서'} /><PulliNote mood="search">알아두면 더 편한 이야기,<br />풀리가 모아뒀어요.</PulliNote></div><Faq items={[
      {q:'위치 권한을 켜야 하나요?',a:'아니요. 실시간 위치는 보지 않아요. 처음에 한 번 정하신 생활권만 써요.'},
      {q:'가격이 실제와 다르면요?',a:'모든 혜택에 확인한 날짜와 시각을 함께 적어드려요. 방문하시는 시점에는 달라질 수 있어요.'},
      {q:'생활권은 몇 곳까지 정할 수 있나요?',a:'한 곳을 정해 쓰고, 언제든 다른 지역으로 바꿀 수 있어요.'},
      {q:'따로 요금이 있나요?',a:'없어요. FOUND AI는 FULIF · FULIF+ 모든 회원이 이용해요.'},
    ]} /></div></Section>
    <ClosingCTA title={<>오늘 챙길 혜택,<br />풀리가 먼저 찾아둘게요.</>} art="neighborhood" />
  </div>;
}
