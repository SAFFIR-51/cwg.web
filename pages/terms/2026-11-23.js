import Link from 'next/link';
import LegalPage from '../../components/LegalPage';
import { readLegal } from '../../lib/legal';
import { TERMS_NEXT } from '../../lib/terms';

// 고정 주소 — 판이 바뀌어도 이 주소는 이 약관 그대로다
export async function getStaticProps() { return { props: { html: readLegal(TERMS_NEXT.file) } }; }
export default function TermsVersion({ html }) {
  return (
    <LegalPage eyebrow="Terms" title="FULIF 서비스 이용약관 (2026년 11월 23일 시행)" intro={TERMS_NEXT.intro} effective={TERMS_NEXT.effective} html={html}>
      <p className="terms-prev-link"><Link href="/terms" className="accent">지금 약관 보기 ›</Link></p>
    </LegalPage>
  );
}
