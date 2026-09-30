import Link from 'next/link';
import Icon, { IconCircle } from './Icon';
import StoreBadges from './StoreBadges';

/* ---------- 섹션 골격 ---------- */
export function Section({ children, className = '', tone = 'white', id }) {
  const bg = tone === 'gray' ? 'bg-page' : tone === 'blue' ? 'bg-blue-soft' : 'bg-white';
  return (
    <section id={id} className={`content-section ${bg} ${className}`}>
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, lead, center = false, className = '' }) {
  return (
    <div className={`section-heading reveal ${center ? 'text-center' : ''} ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="h-section whitespace-pre-line">{title}</h2>
      {lead && <p className={`lead mt-4 whitespace-pre-line ${center ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>{lead}</p>}
    </div>
  );
}

/* ---------- 카드 ---------- */
export function Card({ children, className = '', white = false }) {
  return <div className={`${white ? 'card-white' : 'card'} reveal ${className}`}>{children}</div>;
}

export function FeatureCard({ icon, img, title, desc, className = '' }) {
  return (
    <Card className={`feature-card ${className}`}>
      {img ? (
        <img src={img} alt="" className="mb-4 h-12 w-12 object-contain" />
      ) : (
        <IconCircle name={icon} className="mb-4" tone="white" />
      )}
      <h3 className="h-card">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-sub whitespace-pre-line">{desc}</p>
    </Card>
  );
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
  return <p className={`text-[13px] leading-relaxed text-dim whitespace-pre-line ${className}`}>{children}</p>;
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

/* ---------- 마무리 CTA ---------- */
export function CtaBand({ title, badges = true, children, tone = 'gray' }) {
  return (
    <Section tone={tone} className="cta-section">
      <div className="reveal text-center">
        <p className="eyebrow mb-5">LIFE, ONE MORE.</p>
        <h2 className="h-section whitespace-pre-line">{title}</h2>
        {badges && <StoreBadges center className="mt-8" />}
        {children}
      </div>
    </Section>
  );
}

/* ---------- 폰 목업 ---------- */
export function Phone({ src, alt = '', className = '' }) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-status" aria-hidden="true"><span>9:41</span><div className="phone-notch" /><span>▮▮ ▰</span></div>
      <div className="phone-screen">
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}

export function TextLink({ href, children, className = '' }) {
  return (
    <Link href={href} className={`inline-flex items-center gap-0.5 text-[15px] font-semibold text-blue hover:underline underline-offset-4 ${className}`}>
      {children}
      <Icon name="chevron_right" size={20} />
    </Link>
  );
}

export function Tag({ children, tone = 'blue' }) {
  const t = tone === 'blue' ? 'bg-blue-soft text-blue' : tone === 'green' ? 'bg-green-soft text-green' : 'bg-hair text-sub';
  return <span className={`inline-flex h-6 items-center rounded-md px-2 text-[12px] font-bold ${t}`}>{children}</span>;
}
