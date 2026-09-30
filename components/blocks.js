import Link from 'next/link';
import Icon from './Icon';
import StoreBadges from './StoreBadges';
import { Art } from './Art';
import { Phone } from './ui';

/* ---------- 페이지 첫 화면: 유일한 h1 ---------- */
export function PageHero({ eyebrow, title, lead, actions, note, visual, tone = 'soft', align = 'split', className = '', children }) {
  return (
    <header className={`page-hero page-hero-${tone} page-hero-${visual ? align : 'center'} ${className}`}>
      <div className="container">
        <div className="page-hero-inner">
          <div className="page-hero-copy reveal">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="h-display whitespace-pre-line">{title}</h1>
            {lead && <p className="lead whitespace-pre-line">{lead}</p>}
            {actions && <div className="page-hero-actions">{actions}</div>}
            {note && <p className="fine page-hero-note">{note}</p>}
            {children}
          </div>
          {visual && <div className="page-hero-visual reveal">{visual}</div>}
        </div>
      </div>
    </header>
  );
}

/* ---------- 폰 여러 대 ---------- */
export function PhoneStack({ screens, layout = 'pair', priority = false, className = '' }) {
  const sizes = layout === 'fan' ? ['sm', 'md', 'sm'] : layout === 'pair' ? ['lg', 'sm'] : ['lg'];
  return (
    <div className={`phone-stack phone-stack-${layout} ${className}`}>
      {screens.map((s, i) => <Phone key={s.src} src={s.src} alt={s.alt || ''} size={sizes[i] || 'md'} priority={priority && i === 0} className={`phone-stack-item phone-stack-item-${i + 1}`} />)}
    </div>
  );
}

/* ---------- 앱 화면이 하단에 걸리는 벤토 카드 ---------- */
export function ScreenCard({ title, desc, href, screen, alt = '', linkLabel = '자세히 보기', className = '' }) {
  return (
    <Link href={href} className={`screen-card reveal ${className}`}>
      <div className="screen-card-copy">
        <h3>{title}</h3>
        <p>{desc}</p>
        <span className="btn-link">{linkLabel}<Icon name="chevron_right" size={18} /></span>
      </div>
      <Phone src={screen} alt={alt} size="sm" className="screen-card-phone" />
    </Link>
  );
}

/* ---------- 폰 · 카피 좌우 분할 ---------- */
export function SplitFeature({ id, eyebrow, title, lead, children, visual, reverse = false, tone = 'white', className = '' }) {
  const bg = tone === 'gray' ? 'bg-page' : tone === 'blue' ? 'split-feature-panel' : 'bg-white';
  return (
    <section id={id} className={`content-section split-feature ${bg} ${reverse ? 'is-reverse' : ''} ${className}`}>
      <div className="container">
        <div className="split-feature-inner">
          <div className="split-feature-copy">
            <div className="section-heading reveal">
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              <h2 className="h-section whitespace-pre-line">{title}</h2>
              {lead && <p className="lead whitespace-pre-line">{lead}</p>}
            </div>
            {children}
          </div>
          <div className="split-feature-visual reveal">{visual}</div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 소형 아이콘 카드 그리드 ---------- */
const COLS = { 1: 'feature-grid-1', 2: 'feature-grid-2', 3: 'feature-grid-3', 4: 'feature-grid-4' };
export function FeatureGrid({ items, cols = 3, size = 'md', className = '' }) {
  return (
    <div className={`feature-grid ${COLS[cols] || COLS[3]} feature-grid-${size} ${className}`}>
      {items.map((it, i) => {
        const Tag = it.href ? Link : 'div';
        const props = it.href ? { href: it.href } : {};
        return (
          <Tag key={i} {...props} className={`feature-item reveal ${it.highlight ? 'is-highlight' : ''} ${it.className || ''}`}>
            {it.art && <Art name={it.art} sizes="96px" className="feature-item-art" />}
            {it.icon && <span className="feature-item-icon"><Icon name={it.icon} size={24} /></span>}
            {it.tag && <span className="feature-item-tag">{it.tag}</span>}
            <h3>{it.title}</h3>
            {it.desc && <p>{it.desc}</p>}
            {it.value && <strong className="feature-item-value">{it.value}{it.unit && <small>{it.unit}</small>}</strong>}
            {it.extra}
            {it.href && <span className="feature-item-more"><Icon name="chevron_right" size={18} /></span>}
          </Tag>
        );
      })}
    </div>
  );
}

/* ---------- 멤버십 카드 ---------- */
export function PricingCard({ name = 'FULIF+ 월간 멤버십', trial = '첫 달 0원', price = '월 5,000원', items = [], cta, small, className = '' }) {
  return (
    <article className={`pricing-card reveal ${className}`}>
      <span className="pricing-card-name">{name}</span>
      <h3>{trial}</h3>
      <p className="pricing-card-price">그다음부터 <strong>{price}</strong></p>
      <ul>{items.map(t => <li key={t}><Icon name="check" size={18} />{t}</li>)}</ul>
      {cta}
      {small && <small>{small}</small>}
    </article>
  );
}

/* ---------- FULIF vs FULIF+ 정적 비교 막대 ---------- */
export function CompareBars({ rows, className = '' }) {
  return (
    <div className={`compare-bars ${className}`}>
      {rows.map(r => (
        <div key={r.label} className="compare-row reveal">
          <h3>{r.label}</h3>
          <div className="compare-tracks">
            {[['FULIF · 무료', r.free], ['FULIF+ · 월 5,000원', r.plus]].map(([plan, v], i) => (
              <div key={plan} className={i ? 'is-plus' : ''}>
                <span>{plan}</span>
                <strong>{v}<small>{r.unit}</small></strong>
                <i aria-hidden="true"><b style={{ width: `${(v / r.plus) * 100}%` }} /></i>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- 하루 흐름 타임라인 ---------- */
export function StepTimeline({ items, className = '' }) {
  return (
    <ol className={`step-timeline ${className}`}>
      {items.map((it, i) => (
        <li key={i} className="reveal">
          <span className="step-timeline-time">{it.time}</span>
          {it.art && <Art name={it.art} sizes="72px" />}
          <h3>{it.title}</h3>
          <p>{it.desc}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------- 사실 수치 나열 (절제된 크기) ---------- */
export function FactList({ items, className = '' }) {
  return (
    <dl className={`fact-list ${className}`}>
      {items.map(it => <div key={it.label}><dt>{it.label}</dt><dd>{it.value}<small>{it.unit}</small></dd></div>)}
    </dl>
  );
}

/* ---------- 마무리 다운로드 밴드 ---------- */
export function CtaBand({ title, lead, note, children, screen, id }) {
  return (
    <section className="content-section cta-band-section" id={id}>
      <div className="container">
        <div className="cta-band reveal">
          <div className="cta-band-copy">
            <h2 className="whitespace-pre-line">{title}</h2>
            {lead && <p>{lead}</p>}
            {children || <StoreBadges className="cta-band-stores" />}
            {note && <small>{note}</small>}
          </div>
          {screen && <div className="cta-band-visual"><Phone src={screen} alt="" size="sm" /></div>}
        </div>
      </div>
    </section>
  );
}
