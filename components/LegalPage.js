import Seo from './Seo';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LegalPage({ eyebrow, title, intro, effective, html, children }) {
  const { pathname } = useRouter();
  return (
    <div className="page legal-page">
      <Seo title={title} description={intro} />
      <section className="legal-hero">
        <div className="container max-w-3xl py-14 md:py-20">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h1 className="h-display">{title}</h1>
          {intro && <p className="lead mt-5">{intro}</p>}
          {effective && <p className="mt-4 text-[13px] font-semibold text-dim">{effective}</p>}
          <nav className="legal-navigation" aria-label="정책 및 계정 안내">{[['/terms','이용약관'],['/privacy','개인정보처리방침'],['/delete-account','계정 및 데이터 삭제']].map(([href,label])=><Link href={href} key={href} aria-current={pathname===href?'page':undefined}>{label}</Link>)}</nav>
        </div>
      </section>
      <section className="bg-white">
        <div className="container legal-content">
          {children}
          {html && <div className="legal" dangerouslySetInnerHTML={{ __html: html }} />}
        </div>
      </section>
    </div>
  );
}
