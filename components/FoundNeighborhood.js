import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import ScrollStory from './ScrollStory';

const PLACES = [
  {
    name: '편의점', icon: 'storefront', x: '20.5%', y: '28%',
    title: '늘 사던 커피도,\n행사할 때 챙겨요.',
    description: '출근길에 들르는 편의점. 커피부터 간단한 한 끼까지, 어떤 상품이 행사 중인지 모아봐요.',
    details: ['행사 상품과 혜택', '행사 기간', '정보를 확인한 날짜'],
  },
  {
    name: '마트', icon: 'shopping_cart', x: '50%', y: '21%',
    title: '장 보러 가기 전,\n오늘의 행사를 먼저.',
    description: '필요한 것을 사러 가는 날. 우리 동네 마트의 행사 소식을 한곳에서 살펴봐요.',
    details: ['마트별 행사 소식', '행사 기간', '정보를 확인한 날짜'],
  },
  {
    name: '주유소', icon: 'local_gas_station', x: '81%', y: '26%',
    title: '주유하기 전,\n가까운 곳끼리 비교해요.',
    description: '매번 가던 곳 말고, 다른 곳은 어떨까요? 정해둔 생활권 안의 주유 가격을 살펴봐요.',
    details: ['생활권 안의 주유소', '유종별 가격', '가격을 확인한 시각'],
  },
];

function NeighborhoodMap({ active }) {
  return <div className="found-map-canvas">
        <div className="found-map-caption"><span><Icon name="location_on" size={16} />내가 정한 생활권</span><small>예시 지도</small></div>
        <div className="found-map-art">
          <Image src="/images/editorial/found-town.png" alt="편의점, 마트, 주유소가 모인 동네를 표현한 3D 예시 지도" width={1536} height={1024} sizes="(max-width: 767px) 100vw, (max-width: 1100px) 60vw, 800px" quality={90} />
          <div>
            {PLACES.map((place, index) => <span
              key={place.name} className="found-map-pin"
              style={{ left: place.x, top: place.y }}
              data-active={active === index}
            ><Icon name={place.icon} size={18} /><span>{place.name}</span></span>)}
          </div>
        </div>
        <div className="found-map-guide"><Image src="/mascot/clover_search.png" alt="" width={58} height={58} sizes="58px" /><p>멀리 찾을 필요 없어요.<br /><strong>내가 정한 동네부터 살펴볼게요.</strong></p></div>
  </div>;
}

export default function FoundNeighborhood() {
  return <section id="neighborhood" className="found-neighborhood" aria-labelledby="neighborhood-heading">
    <div className="found-neighborhood-heading">
      <div><p className="edition-eyebrow">AROUND YOUR EVERYDAY</p><h2 id="neighborhood-heading">늘 가던 동네를,<br /><span>새롭게 발견해요.</span></h2></div>
      <p>편의점, 마트, 그리고 주유소.<br />동네 한 바퀴, 풀리가 찾은 혜택을 따라가 볼까요?</p>
    </div>
    <ScrollStory id="found-map" items={PLACES.map((place,index) => ({
      key:String(index), label:place.name,
      visual:<NeighborhoodMap active={index} />,
      content:<><div className="found-map-panel-top"><span><Icon name={place.icon} size={27} /></span></div><div className="found-map-copy"><h3>{place.title}</h3><p>{place.description}</p><ul>{place.details.map(detail=><li key={detail}><Icon name="check" size={16} />{detail}</li>)}</ul></div><Link href="/download" className="found-map-link">앱에서 내 생활권 정하기<Icon name="arrow_forward" size={18} /></Link></>,
    }))} />
    <div className="found-neighborhood-foot"><span><Icon name="location_off" size={17} />실시간 위치 추적 없이, 직접 정한 지역 한 곳만.</span><p>서비스 이해를 위한 예시 지도예요.<br />실제 매장 위치나 실시간 혜택을 표시하지 않아요.</p></div>
  </section>;
}
