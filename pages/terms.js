import { useEffect, useState } from 'react';
import Link from 'next/link';
import LegalPage from '../components/LegalPage';
import { readLegal } from '../lib/legal';
import { DEFAULT_CURRENT, TERMS_NEXT, TERMS_PREV, isNextInEffect } from '../lib/terms';

export async function getStaticProps() {
  return { props: { prevHtml: readLegal(TERMS_PREV.file), nextHtml: readLegal(TERMS_NEXT.file) } };
}

// 개정 예고(시행 전) → 2026-11-23 00:00 KST 부터 개정 약관이 본문(사용자 결정: 개정 예고 + 자동 전환)
export default function Terms({ prevHtml, nextHtml }) {
  const [which, setWhich] = useState(DEFAULT_CURRENT);
  useEffect(() => { setWhich(isNextInEffect() ? 'next' : 'prev'); }, []);
  const t = which === 'next' ? TERMS_NEXT : TERMS_PREV;
  return (
    <LegalPage eyebrow="Terms" title="FULIF 서비스 이용약관" intro={t.intro} effective={t.effective}
      html={which === 'next' ? nextHtml : prevHtml}>
      {which === 'prev' ? (
        <div className="terms-notice" role="note">
          <p><strong>2026년 11월 23일부터 개정 약관이 시행돼요</strong></p>
          <p>광고 보기 · 응모권 · 포인트 · FULIF+ 구독 기준을 지금 서비스에 맞게 정리했어요.</p>
          <Link href="/terms/2026-11-23" className="accent">개정 약관 보기 ›</Link>
        </div>
      ) : (
        <p className="terms-prev-link"><Link href="/terms/2026-10-19" className="accent">이전 약관(2026년 10월 19일 개정) 보기 ›</Link></p>
      )}
    </LegalPage>
  );
}
