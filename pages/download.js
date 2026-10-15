import Seo from '../components/Seo';
import StoreBadges from '../components/StoreBadges';
import DownloadQr from '../components/DownloadQr';
import { Section, SectionHead, Fine } from '../components/ui';
import { OPEN_DATE } from '../lib/site';
import { Art } from '../components/SubpageDesign';
import { BrandWordmark } from '../components/Brand';
import { DownloadPhones } from '../components/PageScenes';

// 컴팩트 최종본 v3(2026-10-14) 다운로드 장. QR은 스토어 링크가 확정되면 이미지로 바꾼다(지금은 자리만).
export default function Download() {
  return <div className="product-page download-product">
    <Seo title="다운로드" description={`Google Play와 App Store에서 풀리프를 받을 수 있어요. ${OPEN_DATE} 오픈 · 만 19세 이상.`} />
    <header className="download-opening"><div className="download-opening-copy"><img className="download-meadow" src="/mascot/v3/fuli-meadow.jpg" alt="클로버 들판에서 손을 흔드는 풀리" width={900} height={600} /><span className="download-brand-icon"><BrandWordmark className="w-[73px] h-8" /></span><p className="sub-eyebrow">다운로드</p><h1>오늘부터,<br />생활의 가치를<br /><span>한 번 더</span></h1><p>Google Play와 App Store에서 풀리프를 받을 수 있어요.</p><StoreBadges className="download-main-stores" /><Fine>{OPEN_DATE} 오픈 · 만 19세 이상 이용할 수 있어요</Fine><DownloadQr /></div><DownloadPhones /><span className="download-back-word" aria-hidden="true">full life.</span></header>
    <Section>
      <SectionHead eyebrow="THREE SMALL STEPS" title={'설치 후,\n이렇게 시작해요'} />
      <div className="download-start-steps">
        {[
          ['points','가입하기','앱을 열고 1분이면 가입이 끝나요.'],
          ['neighborhood','생활권 정하기','시 · 구 · 동을 한 번 정하면 FOUND AI가 혜택을 찾아드려요.'],
          ['coupon','첫 등록','가지고 있는 쿠폰 한 장, 지난 회차 번호 한 세트부터 올려보세요.'],
        ].map(([art,title,desc],i)=><article className="download-step reveal" key={art}><Art name={art} sizes="(max-width: 767px) 75vw, 350px" /><span>0{i+1}</span><h3>{title}</h3><p>{desc}</p></article>)}
      </div>
    </Section>
  </div>;
}
