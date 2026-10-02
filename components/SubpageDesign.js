import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { Phone } from './ui';
import StoreBadges from './StoreBadges';

const NEW_ART = new Set(['neighborhood', 'plus', 'notebook']);

export function Art({ name, className = '', priority = false, sizes = '(max-width: 767px) 85vw, 560px' }) {
  const folder = NEW_ART.has(name) ? 'subpages' : 'benefits';
  return <Image src={`/images/${folder}/${name}-art.png`} alt="" width={1024} height={1024} sizes={sizes} quality={90} priority={priority} className={`sub-art ${className}`} />;
}

export function ArrowLink({ href, children, className = '' }) {
  return <Link href={href} className={`sub-arrow-link ${className}`}>{children}<span><Icon name="arrow_forward" size={19} /></span></Link>;
}

export function SubHero({ eyebrow, title, lead, children, visual, className = '' }) {
  return <section className={`sub-hero ${className}`}><div className="sub-hero-inner">
    <div className="sub-hero-copy"><p className="sub-eyebrow">{eyebrow}</p><h1>{title}</h1><p className="sub-hero-lead">{lead}</p>{children}</div>
    <div className="sub-hero-visual">{visual}</div>
  </div></section>;
}

export function PhoneScene({ src = '/screens/home.png', alt = '풀리프 앱 홈 화면', art = 'coupon', className = '', badge = '일상의 작은 가능성, 한 번 더' }) {
  return <div className={`sub-phone-scene ${className}`}>
    <div className="sub-phone-disc" /><span className="sub-scene-word" aria-hidden="true">full life.</span>
    <Phone src={src} alt={alt} />
    <Art name={art} className="sub-phone-object" />
    <span className="sub-scene-badge"><Icon name="check_circle" size={21} />{badge}</span>
  </div>;
}

export function FoundObject({ className = '' }) {
  return <div className={`sub-found-object ${className}`}><Art name="neighborhood" /><span className="sub-map-tag"><Icon name="location_on" size={19} />내 생활권의 발견</span><img src="/mascot/clover_search.png" alt="생활권 혜택을 찾는 풀리" className="sub-found-pulli" /></div>;
}

export function ClosingCTA({ title = <>오늘의 작은 가능성,<br />풀리프에서 만나보세요.</>, lead, children, art = 'ticket' }) {
  return <section className="sub-closing"><div className="sub-closing-inner"><div><p className="sub-eyebrow">LIFE, ONE MORE.</p><h2>{title}</h2>{lead && <p>{lead}</p>}{children || <StoreBadges className="sub-closing-stores" />}</div><Art name={art} /></div></section>;
}

export const NOTE_ART = {
  'series-01-where-do-losing-numbers-go': 'number',
  'coupon-three-habits': 'coupon',
  'why-gas-prices-differ': 'neighborhood',
  'today-vote-what-happens': 'vote',
  'coupon-to-a-child': 'donate',
  'how-to-register-losing-numbers': 'ticket',
};

export function NoteCover({ note, className = '' }) {
  const photo = { 'series-01-where-do-losing-numbers-go': 'note-number', 'coupon-three-habits': 'note-coffee', 'why-gas-prices-differ': 'found-town' }[note.slug];
  if (photo) return <div className={`journal-cover journal-cover-photo journal-cover-${note.category} ${className}`}><Image src={`/images/editorial/${photo}.png`} alt="" width={1536} height={1024} sizes="(max-width: 767px) 100vw, 800px" quality={90} /></div>;
  return <div className={`journal-cover journal-cover-${note.category} ${className}`}><span aria-hidden="true">{note.category === 'series' ? 'ONE MORE' : 'FULI NOTES'}</span><Art name={NOTE_ART[note.slug] || 'notebook'} sizes="(max-width: 767px) 80vw, 450px" /></div>;
}
