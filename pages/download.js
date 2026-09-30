import Seo from '../components/Seo';
import StoreBadges from '../components/StoreBadges';
import Icon from '../components/Icon';
import { Section, SectionHead, Fine } from '../components/ui';
import { OPEN_DATE } from '../lib/site';
import { Art } from '../components/SubpageDesign';
import { BrandSymbol } from '../components/Brand';
import { DownloadPhones } from '../components/PageScenes';
import { PulliNote } from '../components/Edition';

export default function Download() {
  return <div className="product-page download-product">
    <Seo title="다운로드" description="Google Play와 App Store에서 풀리프를 받을 수 있어요. 2026.10.12 오픈 · 만 19세 이상." />
    <header className="download-opening"><div className="download-opening-copy"><span className="download-brand-icon"><BrandSymbol /></span><p className="sub-eyebrow">HAVE A FULI DAY</p><h1>오늘부터,<br />생활의 가치를<br /><span>한 번 더.</span></h1><p>쿠폰 한 장에서 시작하는 새로운 일상.<br />풀리프에서 만나보세요.</p><StoreBadges className="download-main-stores" /><Fine>{OPEN_DATE} 오픈 · 만 19세 이상</Fine></div><DownloadPhones /><span className="download-back-word" aria-hidden="true">full life.</span></header>
    <Section>
      <SectionHead eyebrow="THREE SMALL STEPS" title={'처음 시작도,\n이렇게 간단하게'} lead="쿠폰 한 장, 내 생활권 하나. 지금 가진 것에서 시작해요." />
      <div className="download-start-steps">
        {[
          ['points','가입하기','가입만 해도 100P. 풀리프와 첫 번째 혜택을 만나보세요.'],
          ['neighborhood','생활권 정하기','시 · 구 · 동을 한 번 정하면 FOUND AI가 내 생활권 혜택을 찾아드려요.'],
          ['coupon','첫 등록하기','가지고 있는 쿠폰 한 장, 지난 회차 번호 한 세트부터 올려보세요.'],
        ].map(([art,title,desc],i)=><article className="download-step reveal" key={art}><Art name={art} sizes="(max-width: 767px) 75vw, 350px" /><span>0{i+1}</span><h3>{title}</h3><p>{desc}</p></article>)}
      </div>
      <aside className="download-notice"><Icon name="check_circle" size={25} /><div><h3>알림을 켜 두시면 좋아요</h3><p>쿠폰 만료, 경품 추첨 결과, 풀리프 제공 번호 도착을 놓치지 않게 알려드려요.</p></div></aside>
      <PulliNote>처음 만난 오늘부터 100P.<br />반가워요. 이제 풀리와 함께해요.</PulliNote>
    </Section>
  </div>;
}
