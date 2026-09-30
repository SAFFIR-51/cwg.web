import Seo from '../components/Seo';
import StoreBadges from '../components/StoreBadges';
import Icon from '../components/Icon';
import { Section, SectionHead, PulliNote } from '../components/ui';
import { PageHero, PhoneStack, FeatureGrid } from '../components/blocks';
import { OPEN_DATE } from '../lib/site';

export default function Download() {
  return <div className="page page-download">
    <Seo title="다운로드" description="Google Play와 App Store에서 풀리프를 받을 수 있어요. 2026.10.12 오픈 · 만 19세 이상." />

    <PageHero
      eyebrow="HAVE A FULI DAY"
      title={'오늘부터,\n생활의 가치를 한 번 더.'}
      lead={'쿠폰 한 장에서 시작하는 새로운 일상.\n풀리프에서 만나보세요.'}
      actions={<StoreBadges />}
      note={`${OPEN_DATE} 오픈 · 만 19세 이상 이용할 수 있어요.`}
      visual={<PhoneStack priority layout="fan" screens={[{ src: '/screens/one-more.png', alt: '쿠폰과 티켓을 모으는 ONE MORE 화면' }, { src: '/screens/home.png', alt: '풀리프 앱 홈 화면' }, { src: '/screens/found.png', alt: '내 생활권 혜택을 확인하는 FOUND AI 화면' }]} />}
    />

    <Section>
      <SectionHead eyebrow="THREE SMALL STEPS" title={'처음 시작도,\n이렇게 간단하게'} lead="쿠폰 한 장, 내 생활권 하나. 지금 가진 것에서 시작해요." />
      <FeatureGrid cols={3} size="lg" className="mt-10" items={[
        { art: 'points', tag: '01', title: '가입하기', desc: '가입만 해도 100P. 풀리프와 첫 번째 혜택을 만나보세요.' },
        { art: 'neighborhood', tag: '02', title: '생활권 정하기', desc: '시 · 구 · 동을 한 번 정하면 FOUND AI가 내 생활권 혜택을 찾아드려요.' },
        { art: 'coupon', tag: '03', title: '첫 등록하기', desc: '가지고 있는 쿠폰 한 장, 지난 회차 번호 한 세트부터 올려보세요.' },
      ]} />
      <aside className="notice-card reveal"><Icon name="check_circle" size={24} /><div><h3>알림을 켜 두시면 좋아요</h3><p>쿠폰 만료, 경품 추첨 결과, 풀리프 제공 번호 도착을 놓치지 않게 알려드려요.</p></div></aside>
      <PulliNote>처음 만난 오늘부터 100P.<br />반가워요. 이제 풀리와 함께해요.</PulliNote>
    </Section>
  </div>;
}
