import Seo from '../components/Seo';
import Icon from '../components/Icon';
import { Section, SectionHead, Steps, Faq } from '../components/ui';
import { PhoneScene, ClosingCTA } from '../components/SubpageDesign';
import { DiscoveryHero, SectionNav } from '../components/Edition';

// 컴팩트 최종본 v3(2026-10-14) — 예시 카드에는 실제 매장 · 브랜드 이름을 쓰지 않는다
const EXAMPLES = [
  ['주유소', '우리 동네 최저가 주유소', '휘발유 1리터 가격 · 오늘 06:00 기준'],
  ['편의점', '커피 2+1', '2026.10.31까지 · 10월 19일 확인'],
  ['영화관', '관람객 증정 이벤트', '상영 정보가 아니라, 영화관에서 열리는 이벤트 · 증정 소식이에요.'],
];

export default function FoundAi() {
  return <div className="product-page found-product">
    <Seo title="FOUND AI" description="내 생활권의 주유소 · 편의점 · 문화·전시 · 영화관 혜택을, 확인한 날짜와 함께 한곳에 정리해 드려요. FULIF · FULIF+ 모든 회원이 써요." />
    <DiscoveryHero />
    <SectionNav label="FOUND AI 페이지 탐색" items={[["found-promises","세 가지 약속"],["how-it-works","이렇게 찾아드려요"],["found-questions","자주 묻는 질문"]]} />
    <Section id="found-promises">
      <SectionHead eyebrow="FOUND AI" title={'FOUND AI는\n이렇게 일해요'} />
      <div className="found-promises">
        {[
          ['search_off', <>찾지 않으셔도 <br />돼요</>, '회원님이 검색하지 않아도 풀리프가 먼저 찾아 정리해 드려요.'],
          ['verified', <>없는 혜택은 <br />만들지 않아요</>, '확인된 것만 올려요. 모든 혜택에 확인한 날짜를 함께 적어드려요.'],
          ['location_off', <>위치를 <br />따라다니지 않아요</>, '한 번 정하신 지역만 사용하고, 실시간 위치는 보지 않아요.'],
        ].map(([icon,title,desc])=><article className="reveal" key={icon}><span className="promise-icon"><Icon name={icon} size={28} /></span><h3>{title}</h3><p>{desc}</p></article>)}
      </div>
    </Section>
    <Section tone="gray" id="how-it-works">
      <div className="found-how">
        <PhoneScene src="/screens/found.png" alt="FOUND AI 생활권 혜택 앱 화면" art="coupon" badge="만료가 가까운 쿠폰부터 챙겨요" />
        <div><SectionHead eyebrow="JUST YOUR NEIGHBORHOOD" title={'생활권만 정하면,\n나머지는 풀리가'} /><Steps className="mt-7" items={[
          {title:'생활권 정하기',desc:'시 · 구 · 동을 한 번만 정해두면 돼요. FULIF+ 회원은 집과 자주 가는 곳, 두 곳까지 정할 수 있어요.'},
          {title:'풀리가 찾아 정리',desc:'주유 가격, 편의점 행사, 문화·전시와 영화관 소식을 모아 카드로 보여드려요.'},
          {title:'지금 챙길 것부터',desc:'보관함에서 만료가 가까운 쿠폰을 맨 위에 먼저 보여드려요.'},
        ]} /></div>
      </div>
      <div className="found-examples">
        {EXAMPLES.map(([place,title,meta])=><article className="discovery-example reveal" key={place}><span>{place}</span><strong>{title}</strong><time>{meta}</time></article>)}
      </div>
      <p className="found-examples-note reveal">지금은 주유소, 편의점, 문화·전시, 영화관 혜택을 찾아 드리고 있어요. 찾는 곳은 점차 늘려, 더 다양한 혜택을 알려 드릴게요.</p>
    </Section>
    <Section id="found-questions"><div className="sub-faq-grid"><div><SectionHead title={'궁금하실 것\n같아서'} /></div><Faq items={[
      {q:'위치 권한을 켜야 하나요?',a:'아니요. 정하신 생활권만 써요. FULIF 회원은 한 곳, FULIF+ 회원은 두 곳까지 정할 수 있어요.'},
      {q:'가격이 실제와 다르면요?',a:'모든 혜택에 확인한 날짜와 시각을 적어드려요. 방문하시는 시점에는 달라질 수 있어요.'},
      {q:'따로 요금이 있나요?',a:'없어요. FOUND AI는 모든 회원이 이용해요.'},
    ]} /></div></Section>
    <ClosingCTA title={<>오늘 챙길 혜택,<br />풀리가 먼저 찾아둘게요</>} mascot="/mascot/v3/fuli-cheer.jpg" mascotAlt="두 손을 모은 풀리" />
  </div>;
}
