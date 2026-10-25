import Link from 'next/link';
import LegalPage from '../../components/LegalPage';
import { readLegal } from '../../lib/legal';
import { TERMS_PREV } from '../../lib/terms';

// 고정 주소 — 판이 바뀌어도 이 주소는 이 약관 그대로다
export async function getStaticProps() { return { props: { html: readLegal(TERMS_PREV.file) } }; }
export default function TermsVersion({ html }) {
  return (
    <LegalPage eyebrow="Terms" title="FULIF 서비스 이용약관 (2026년 10월 19일 개정)" intro={TERMS_PREV.intro} effective={TERMS_PREV.effective} html={html}>
      <p className="terms-prev-link"><Link href="/terms" className="accent">지금 약관 보기 ›</Link></p>
    </LegalPage>
  );
}
