import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Icon from './Icon';

const CATEGORIES = [
  {name:'편의점',title:<>자주 사는 것부터,<br />이번 행사에 있나 볼까요?</>,desc:'커피, 간식, 간단한 한 끼. 내 생활권 편의점의 행사 상품을 모아봐요.',detail:'행사 기간과 확인한 날짜를 함께 안내해요.'},
  {name:'마트',title:<>오늘 장보기는,<br />행사부터 보고 가요.</>,desc:'장을 보러 가기 전에 알아두면 좋은 소식. 우리 동네 마트 행사를 한곳에서 확인해요.',detail:'매장별 행사 기간과 물량은 다를 수 있어요.'},
  {name:'주유소',title:<>주유하기 전,<br />가까운 곳끼리 비교해요.</>,desc:'매번 들르던 곳 말고 다른 곳은 어떨까요? 내 생활권 주유 가격을 살펴봐요.',detail:'가격을 확인한 시각을 표시해요. 방문 시점에는 달라질 수 있어요.'},
];

export function LocalDiscovery({priority=false}) {
  const [selected,setSelected]=useState(0);
  const [compact,setCompact]=useState(false);
  const refs=useRef([]);
  useEffect(()=>{
    const query=window.matchMedia('(max-width: 767px)');
    const update=()=>setCompact(query.matches);
    update(); query.addEventListener('change',update);
    return ()=>query.removeEventListener('change',update);
  },[]);
  const item=CATEGORIES[selected];
  const Heading=priority ? 'h2' : 'h3';
  const prefix=priority ? 'found-local' : 'home-local';
  const onKey=(event,index)=>{
    const step=['ArrowDown','ArrowRight'].includes(event.key) ? 1 : ['ArrowUp','ArrowLeft'].includes(event.key) ? -1 : 0;
    if(!step && !['Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next=event.key==='Home' ? 0 : event.key==='End' ? 2 : (index+step+3)%3;
    setSelected(next); refs.current[next]?.focus();
  };
  return <div className="local-discovery">
    <figure className="local-discovery-photo"><Image src="/images/fulif-own/neighborhood-walk.png" alt="파란 차양 아래 가게와 자전거가 있는 조용한 동네 골목" width={1536} height={1024} priority={priority} quality={90} sizes="(max-width: 767px) 100vw, 750px" /><figcaption><span>늘 가던 길에도 새로운 발견</span><span>FOUND AI</span></figcaption></figure>
    <div className="local-discovery-content"><div className="local-category-tabs" role="tablist" aria-label="생활권 혜택 종류" aria-orientation={compact ? 'horizontal' : 'vertical'}>{CATEGORIES.map((category,i)=><button type="button" key={category.name} role="tab" id={prefix+'-tab-'+i} aria-controls={prefix+'-panel'} aria-selected={selected===i} tabIndex={selected===i ? 0 : -1} ref={el=>{refs.current[i]=el;}} onClick={()=>setSelected(i)} onKeyDown={e=>onKey(e,i)}><span>0{i+1}</span><strong>{category.name}</strong><Icon name={selected===i ? "arrow_forward" : "arrow_outward"} size={20} /></button>)}</div><div className="local-category-panel" id={prefix+'-panel'} role="tabpanel" aria-labelledby={prefix+'-tab-'+selected} tabIndex={0}><Heading>{item.title}</Heading><p>{item.desc}</p><small>{item.detail}</small></div></div>
  </div>;
}
