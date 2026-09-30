import { useEffect, useState } from 'react';
import Image from 'next/image';
import Icon from './Icon';

/* ---------- 섹션 골격 ---------- */
export function Section({ children, className = '', tone = 'white', id }) {
  const bg = tone === 'gray' ? 'bg-page' : tone === 'blue' ? 'bg-blue-panel' : 'bg-white';
  return (
    <section id={id} className={`content-section ${bg} ${className}`}>
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, lead, center = false, as: Tag = 'h2', className = '' }) {
  return (
    <div className={`section-heading reveal ${center ? 'text-center' : ''} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className={`${Tag === 'h1' ? 'h-display' : 'h-section'} whitespace-pre-line`}>{title}</Tag>
      {lead && <p className={`lead whitespace-pre-line ${center ? 'mx-auto' : ''}`}>{lead}</p>}
    </div>
  );
}

/* ---------- 카드 ---------- */
export function Card({ children, className = '', white = false }) {
  return <div className={`${white ? 'card-white' : 'card'} reveal ${className}`}>{children}</div>;
}

/* ---------- 번호 단계 ---------- */
export function Steps({ items, className = '' }) {
  return (
    <ol className={`steps-list divide-y divide-hair ${className}`}>
      {items.map((it, i) => (
        <li key={i} className="reveal flex gap-4 py-5">
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue text-[13px] font-bold text-white">{i + 1}</span>
          <div>
            {it.title && <h3 className="text-[17px] font-bold">{it.title}</h3>}
            <p className={`text-[15px] leading-relaxed text-sub ${it.title ? 'mt-1' : ''}`}>{it.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------- 수치 타일 ---------- */
export function StatGrid({ items, cols = 2, className = '' }) {
  const c = cols === 4 ? 'grid-cols-2 md:grid-cols-4' : cols === 3 ? 'grid-cols-3' : 'grid-cols-2';
  return (
    <div className={`stat-grid grid gap-3 ${c} ${className}`}>
      {items.map((it, i) => (
        <div key={i} className="reveal rounded-2xl bg-white p-5">
          <p className="text-[13px] text-muted">{it.label}</p>
          <p className="mt-1 text-[22px] font-bold tracking-tightest text-ink whitespace-pre-line">{it.value}</p>
          {it.sub && <p className="mt-0.5 text-[13px] text-dim">{it.sub}</p>}
        </div>
      ))}
    </div>
  );
}

/* ---------- 행 목록 ---------- */
export function Rows({ items, className = '' }) {
  return (
    <div className={className}>
      {items.map((it, i) => (
        <div key={i} className="row">
          <span className="text-[15px] font-medium text-ink">{it.label}</span>
          <span className="text-right text-[15px] font-semibold text-sub whitespace-pre-line">{it.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- 안내 노트 ---------- */
export function Note({ title, children, tone = 'blue', className = '' }) {
  const t = tone === 'blue' ? 'bg-blue-soft' : 'bg-panel';
  return (
    <div className={`reveal rounded-2xl ${t} p-5 ${className}`}>
      {title && <p className="text-[15px] font-bold text-ink">{title}</p>}
      <p className={`text-[14px] leading-relaxed text-sub whitespace-pre-line ${title ? 'mt-1.5' : ''}`}>{children}</p>
    </div>
  );
}

export function Fine({ children, className = '' }) {
  return <p className={`fine whitespace-pre-line ${className}`}>{children}</p>;
}

/* ---------- FAQ ---------- */
export function Faq({ items, className = '' }) {
  return (
    <div className={`faq-list divide-y divide-hair border-t border-hair ${className}`}>
      {items.map((it, i) => (
        <details key={i} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16px] font-bold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
            {it.q}
            <Icon name="expand_more" className="shrink-0 text-faint transition-transform group-open:rotate-180" size={24} />
          </summary>
          <p className="pb-5 text-[15px] leading-relaxed text-sub">{it.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ---------- 폰 목업 ---------- */
export function Phone({ src, alt = '', className = '', size = 'md', priority = false }) {
  const sizeClass = size === 'sm' ? 'phone-sm' : size === 'lg' ? 'phone-lg' : '';
  return (
    <div className={`phone ${sizeClass} ${className}`}>
      <div className="phone-status" aria-hidden="true"><span>9:41</span><div className="phone-notch" /><span>▮▮ ▰</span></div>
      <div className="phone-screen">
        <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" />
      </div>
    </div>
  );
}

export function Tag({ children, tone = 'blue' }) {
  const t = tone === 'blue' ? 'bg-blue-soft text-blue' : tone === 'green' ? 'bg-green-soft text-green' : 'bg-hair text-sub';
  return <span className={`inline-flex h-6 items-center rounded-md px-2 text-[12px] font-bold ${t}`}>{children}</span>;
}

/* ---------- 풀리의 한마디 ---------- */
export function PulliNote({ children, mood = 'hello', className = '' }) {
  const src = mood === 'search' ? '/mascot/clover_search.png' : '/mascot/pulli-profile-v2.png';
  return <aside className={`pulli-note ${className}`}><Image src={src} alt="풀리" width={72} height={72} sizes="72px" /><div><span>풀리의 한마디</span><p>{children}</p></div></aside>;
}

/* ---------- 페이지 내 섹션 탐색 (스크롤 위치 추적) ---------- */
export function SectionNav({ label, items }) {
  const [active, setActive] = useState(items[0][0]);
  const key = items.map(item => item[0]).join('|');
  useEffect(() => {
    const ids = key.split('|');
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * .4) current = id;
      }
      setActive(current);
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request); update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', request); window.removeEventListener('resize', request); };
  }, [key]);
  return <nav className="section-nav" aria-label={label}><div className="container">{items.map(([id, title]) => <a href={`#${id}`} key={id} aria-current={active === id ? 'location' : undefined}>{title}</a>)}</div></nav>;
}
