import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { AppStoreBadge, GooglePlayBadge } from './StoreBadges';
import { OPEN_DATE } from '../lib/site';

export function StoryIcon({ name, hero = false }) {
  return <Image className="fulif-story-icon" src={hero ? `/icons/hero/${name}-hd.png` : `/images/benefits/${name}-art.png`} alt="" width={160} height={160} sizes="80px" quality={90} />;
}

export function StoryLink({ href, children }) {
  return <Link className="fulif-text-link" href={href}>{children}<Icon name="arrow_forward" size={20} /></Link>;
}

export function FlowStory() {
  return <section id="flow" className="fulif-chapter fulif-content-width fulif-trust-story" aria-labelledby="fulif-flow-heading"><div className="fulif-chapter-heading fulif-enter"><h2 id="fulif-flow-heading">모으고, 참여하고,<br /><em>발견해요</em></h2></div><div><div className="fulif-trust-list fulif-flow-list">{[
    ['confirmation_number', '1 모으기', '쿠폰 · 티켓 · 주유 영수증은 사진이나 공유로, 낙첨 번호는 QR과 사진으로. 흩어진 것들이 보관함 한곳에 모여요.', '/full-life', 'Full Life에서 보기'],
    ['check_circle', '2 참여하기', '광고 한 편, 오늘의 한 표, 출석체크. 하루 몇 분이면 포인트와 응모권이 쌓여요. 모든 응모권은 같은 확률이에요.', '/full-life', 'Full Life에서 보기'],
    ['search', '3 발견하기', 'FOUND AI가 내 생활권의 주유소 · 편의점 · 문화 · 전시 · 영화관 혜택을 먼저 찾아 드려요.', '/found-ai', 'FOUND AI에서 보기'],
  ].map(([icon, title, desc, href, link]) => <article className="fulif-enter" key={icon}><Icon name={icon} size={23} /><div><h3>{title}</h3><p>{desc}</p><StoryLink href={href}>{link}</StoryLink></div></article>)}</div><p className="fulif-flow-quote fulif-enter">버리기 전에 한 번 더, 잊기 전에 한 번 더.<br />풀리프는 일상의 가치를 다시 찾아 드려요.</p></div></section>;
}

export function PulliStory() {
  return <section id="pulli" className="fulif-chapter fulif-content-width fulif-pulli-story"><div className="fulif-chapter-heading fulif-enter"><h2>이름에도 친구에게도<br /><em>행운을 담았습니다</em></h2><p>FULL + LIFE. 비어버린 순간을 다시 채워, 하루를 가득하게.<br />풀리는 네잎클로버와 작은 새싹을 닮은 풀리프의 친구예요.</p><div className="fulif-trust-list fulif-pulli-traits">{[
    ['auto_awesome', '네잎클로버', '일상 속 작은 좋은 순간을 발견하는 마음이에요.'],
    ['favorite', '새싹', '오늘의 작은 경험이 내일을 더 좋은 쪽으로 이끌어요.'],
  ].map(([icon, title, desc]) => <article key={title}><Icon name={icon} size={22} /><div><h3>{title}</h3><p>{desc}</p></div></article>)}</div></div><div className="fulif-pulli-art fulif-pulli-art-hello"><Image className="fulif-pulli-hello" src="/mascot/v3/fuli-hello-wordmark.jpg" alt="손을 흔드는 풀리프의 친구, 풀리" width={900} height={600} sizes="(max-width: 767px) 300px, 420px" /></div><p className="fulif-pulli-signoff">평범한 오늘이 모여, 더 반짝이는 내일이 됩니다.<span>Have a Fuli Day!</span></p></section>;
}

export function StartStory() {
  return <section id="start" className="fulif-start-story"><div className="fulif-content-width fulif-start-inner"><div className="fulif-enter"><h2>오늘 끝난 것에,<br /><em>한 번 더.</em></h2></div><div className="fulif-start-download fulif-enter"><div className="fulif-store-links"><GooglePlayBadge /><AppStoreBadge /></div><small>{OPEN_DATE} 오픈 · 만 19세 이상 이용할 수 있어요</small></div></div></section>;
}
