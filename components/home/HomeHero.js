import StoreBadges from '../StoreBadges';
import { PageHero, PhoneStack } from '../blocks';
import { OPEN_DATE } from '../../lib/site';

export default function HomeHero() {
  return (
    <PageHero
      className="home-hero"
      eyebrow="생활의 가치를, 한 번 더."
      title={'쿠폰 · 티켓 · 번호,\n끝난 것에 한 번 더.'}
      lead={'받아두고 잊은 쿠폰, 다녀온 날의 티켓, 아쉽게 끝난 번호.\n풀리프 앱에 등록하면 응모권과 포인트로 돌아와요.'}
      actions={<StoreBadges />}
      note={`${OPEN_DATE} 오픈 · 만 19세 이상 이용할 수 있어요.`}
      visual={<PhoneStack priority layout="pair" screens={[{ src: '/screens/home.png', alt: '풀리프 앱 홈 화면' }, { src: '/screens/found.png', alt: 'FOUND AI 생활권 혜택 화면' }]} />}
    />
  );
}
