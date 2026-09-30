import Image from 'next/image';

const SUBPAGE_ART = new Set(['neighborhood', 'plus', 'notebook']);

/* 3D 오브제 PNG(투명 배경). 소형 아이콘 용도로만 사용한다. */
export function Art({ name, className = '', priority = false, sizes = '120px' }) {
  const folder = SUBPAGE_ART.has(name) ? 'subpages' : 'benefits';
  return <Image src={`/images/${folder}/${name}-art.png`} alt="" width={1024} height={1024} sizes={sizes} quality={90} priority={priority} className={`art ${className}`} />;
}

export const NOTE_ART = {
  'series-01-where-do-losing-numbers-go': 'number',
  'coupon-three-habits': 'coupon',
  'why-gas-prices-differ': 'neighborhood',
  'today-vote-what-happens': 'vote',
  'coupon-to-a-child': 'donate',
  'how-to-register-losing-numbers': 'ticket',
};

const NOTE_PHOTO = { 'series-01-where-do-losing-numbers-go': 'note-number', 'coupon-three-habits': 'note-coffee', 'why-gas-prices-differ': 'found-town' };

export function NoteCover({ note, className = '' }) {
  const photo = NOTE_PHOTO[note.slug];
  if (photo) return <div className={`journal-cover journal-cover-photo ${className}`}><Image src={`/images/editorial/${photo}.png`} alt="" width={1536} height={1024} sizes="(max-width: 767px) 100vw, 800px" quality={90} /></div>;
  return <div className={`journal-cover journal-cover-${note.category} ${className}`}><Art name={NOTE_ART[note.slug] || 'notebook'} sizes="(max-width: 767px) 40vw, 220px" /></div>;
}
