import Image from 'next/image';
import Link from 'next/link';
import Seo from '../components/Seo';
import Icon from '../components/Icon';
import { Section, SectionHead, Steps, Faq, Fine, Phone, PulliNote, SectionNav } from '../components/ui';
import { PageHero, SplitFeature, FeatureGrid, CtaBand } from '../components/blocks';

const PINS = [
  { key: 'store', icon: 'storefront', label: '편의점', x: 20, y: 34, title: '늘 사던 커피도, 행사할 때 챙겨요', desc: '출근길에 들르는 편의점. 커피부터 간단한 한 끼까지, 어떤 상품이 행사 중인지 모아봐요.', checks: ['행사 상품과 혜택', '행사 기간', '정보를 확인한 날짜'] },
  { key: 'mart', icon: 'shopping_cart', label: '마트', x: 50, y: 22, title: '장보기 전에, 이번 주 행사부터', desc: '우리 동네 마트의 행사 정보를 한곳에. 필요한 것을 사러 가기 전에 한 번 살펴보세요.', checks: ['이번 주 행사 품목', '행사 기간', '정보를 확인한 날짜'] },
  { key: 'gas', icon: 'local_gas_station', label: '주유소', x: 80, y: 32, title: '주유하기 전, 가까운 곳끼리 비교해요', desc: '내가 정해둔 생활권의 주유 가격을 모아 보여드려요. 확인한 시각도 함께 알려드려요.', checks: ['생활권 안의 주유소', '유종별 가격', '가격을 확인한 시각'] },
];

const PLACES = [
  { name: '편의점', image: '/images/editorial/note-coffee.png', alt: '일상 속 한 잔의 커피', title: '늘 들르는 곳에도, 챙길 것이 있으니까.', description: '자주 가는 편의점의 행사도 놓치지 않게. 풀리가 찾아둔 정보를 가볍게 확인해 보세요.', example: '커피 2+1', date: '2026.09.30까지 · 9월 22일 확인', note: '매장 사정에 따라 일찍 끝나거나 물량이 없을 수 있어요.' },
  { name: '마트', image: '/images/edition/found-market.png', alt: '동네 마트에 진열된 신선한 과일', title: '오늘 장보기에도, 반가운 발견 하나.', description: '우리 동네 마트의 행사 정보를 한곳에. 필요한 것을 사러 가기 전에 한 번 살펴보세요.', example: '제철 과일 한 팩 더', date: '2026.09.19 ~ 09.20 · 9월 18일 확인', note: '주말 한정 행사 예시예요. 매장별 물량이 다를 수 있어요.' },
  { name: '주유소', image: '/images/edition/found-fuel.png', alt: '파란 주유 노즐이 놓인 동네 주유소', title: '가까운 주유소를, 한 번 더 살펴봐요.', description: '내가 정해둔 생활권의 주유 가격을 모아 보여드려요. 확인한 시각도 함께 알려드려요.', example: '우리 동네 최저가 주유소', date: '휘발유 1리터 가격 · 오늘 06:00 기준', note: '주유 가격은 수시로 바뀌어요. 방문 시점에는 달라질 수 있어요.' },
];

export default function FoundAi() {
  return <div className="page page-found">
    <Seo title="FOUND AI" description="내 생활권의 편의점 · 마트 · 주유소 혜택을, 확인한 날짜와 함께 한곳에 정리해 드려요. 검색하지 않아도 괜찮아요." />

    <PageHero
      eyebrow="FOUND AI"
      title={'내 생활권의 혜택,\n풀리가 찾아요.'}
      lead={'매일 들르는 편의점, 마트, 주유소.\n일상에 필요한 것을 한곳에 정리해 드려요. 검색하지 않아도 괜찮아요.'}
      actions={<><a href="#how-it-works" className="btn-primary">어떻게 찾아주나요?</a><Link href="/download" className="btn-secondary">앱 다운로드</Link></>}
      note="FOUND AI는 FULIF · FULIF+ 모든 회원이 이용할 수 있어요."
      visual={<Phone src="/screens/found.png" alt="FOUND AI 생활권 혜택 앱 화면" size="lg" priority />}
    >
      <PulliNote mood="search">정해둔 동네만 살펴봐요.<br />실시간 위치를 따라다니지 않아요.</PulliNote>
    </PageHero>

    <SectionNav label="FOUND AI 페이지 탐색" items={[["neighborhood", "동네 둘러보기"], ["found-promises", "세 가지 약속"], ["how-it-works", "이용 방법"], ["places", "찾아주는 곳"], ["found-questions", "자주 묻는 질문"]]} />

    {/* 동네 둘러보기 */}
    <Section id="neighborhood" tone="gray">
      <SectionHead eyebrow="MY NEIGHBORHOOD" title={'늘 가던 동네를,\n새롭게 발견해요.'} lead="편의점, 마트, 그리고 주유소. 동네 한 바퀴, 풀리가 찾은 혜택을 따라가 볼까요?" />
      <div className="found-map-block">
        <div className="found-map reveal" aria-label="예시 지도: 편의점, 마트, 주유소 위치">
          <span className="found-map-tag"><Icon name="location_on" size={17} />내가 정한 생활권 <small>예시 지도</small></span>
          <Image src="/images/editorial/found-town.png" alt="편의점, 마트, 주유소가 모인 동네를 표현한 3D 예시 지도" width={1536} height={1024} sizes="(max-width: 767px) 100vw, 640px" quality={90} />
          {PINS.map(p => <span key={p.key} className="found-pin" style={{ left: `${p.x}%`, top: `${p.y}%` }}><Icon name={p.icon} size={16} />{p.label}</span>)}
        </div>
        <div className="found-pin-cards">
          {PINS.map(p => (
            <article key={p.key} className="found-pin-card reveal">
              <span className="feature-item-icon"><Icon name={p.icon} size={22} /></span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <ul>{p.checks.map(c => <li key={c}><Icon name="check" size={16} />{c}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
      <Fine className="mt-5">지도는 서비스 이해를 돕기 위한 예시예요.</Fine>
    </Section>

    {/* 세 가지 약속 */}
    <Section id="found-promises">
      <SectionHead eyebrow="FOUND AI" title={'FOUND AI는\n이렇게 일해요'} lead="편하게 쓰시도록, 세 가지는 꼭 지켜요." />
      <FeatureGrid cols={3} className="mt-10" items={[
        { icon: 'search_off', title: '찾지 않으셔도 돼요', desc: '회원님이 검색하지 않아도 풀리프가 먼저 찾아 정리해 드려요.' },
        { icon: 'verified', title: '없는 혜택은 만들지 않아요', desc: '확인된 것만 올려요. 모든 혜택에 확인한 날짜를 함께 적어드려요.' },
        { icon: 'location_off', title: '위치를 따라다니지 않아요', desc: '한 번 정하신 지역만 사용하고, 실시간 위치는 보지 않아요.' },
      ]} />
    </Section>

    {/* 이용 방법 */}
    <SplitFeature id="how-it-works" tone="blue" eyebrow="JUST YOUR NEIGHBORHOOD" title={'생활권만 정하면,\n나머지는 풀리가'} reverse
      visual={<Phone src="/screens/found.png" alt="FOUND AI 생활권 혜택 앱 화면" size="lg" />}>
      <Steps items={[
        { title: '생활권 정하기', desc: '시 · 구 · 동을 한 번만 정해두면 돼요. 한 곳을 정해 쓰고, 언제든 다른 지역으로 바꿀 수 있어요.' },
        { title: '풀리가 찾아 정리', desc: '그 지역의 편의점 행사, 마트 행사, 주유 가격을 모아 카드로 보여드려요.' },
        { title: '지금 챙길 것부터', desc: 'FOUND 맨 위에는 보관함에서 만료가 가까운 쿠폰을 먼저 보여드려요.' },
      ]} />
    </SplitFeature>

    {/* 찾아주는 곳 */}
    <Section id="places">
      <SectionHead eyebrow="EVERYDAY PLACES" title={'지금은 편의점 · 마트 ·\n주유소부터'} lead="매일 들르는 곳부터 시작했어요. 찾는 곳은 차차 늘려갈게요." />
      <div className="place-cards">
        {PLACES.map(p => (
          <article key={p.name} className="place-card reveal">
            <div className="place-card-photo"><Image src={p.image} alt={p.alt} width={1536} height={1024} sizes="(max-width: 767px) 100vw, 380px" quality={90} /></div>
            <div className="place-card-body">
              <span className="eyebrow">{p.name}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="place-example"><span>화면 예시</span><strong>{p.example}</strong><time>{p.date}</time><p>{p.note}</p></div>
            </div>
          </article>
        ))}
      </div>
      <Fine className="mt-5">위 정보는 서비스 이해를 위한 예시이며, 실제 제공 중인 행사가 아니에요. 방문 시점에 가격과 혜택이 달라질 수 있어요.</Fine>
    </Section>

    <Section id="found-questions" tone="gray"><div className="faq-grid"><div><SectionHead title={'궁금하실 것\n같아서'} /><PulliNote mood="search">알아두면 더 편한 이야기,<br />풀리가 모아뒀어요.</PulliNote></div><Faq items={[
      { q: '위치 권한을 켜야 하나요?', a: '아니요. 실시간 위치는 보지 않아요. 처음에 한 번 정하신 생활권만 써요.' },
      { q: '가격이 실제와 다르면요?', a: '모든 혜택에 확인한 날짜와 시각을 함께 적어드려요. 방문하시는 시점에는 달라질 수 있어요.' },
      { q: '생활권은 몇 곳까지 정할 수 있나요?', a: '한 곳을 정해 쓰고, 언제든 다른 지역으로 바꿀 수 있어요.' },
      { q: '따로 요금이 있나요?', a: '없어요. FOUND AI는 FULIF · FULIF+ 모든 회원이 이용해요.' },
    ]} /></div></Section>

    <CtaBand title={'오늘 챙길 혜택,\n풀리가 먼저 찾아둘게요.'} lead="생활의 가치를, 한 번 더." screen="/screens/found.png" />
  </div>;
}
