import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import { PayHeader, PayFooter } from './PayLandingChrome';

export default function Layout({ children }) {
  const router = useRouter();

  // 스크롤 진입 애니메이션 (.reveal)
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return undefined;
    const els = Array.from(document.querySelectorAll('.reveal'));
    els.forEach((el) => el.classList.add('will-reveal'));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => { io.disconnect(); els.forEach((el) => el.classList.remove('will-reveal')); };
  }, [router.asPath]);

  return (
    <div className="site-shell flex min-h-screen flex-col" data-page={router.pathname === '/' ? 'home' : router.pathname.split('/')[1]}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:shadow">본문 바로가기</a>
      {router.pathname === '/' ? <PayHeader /> : <Header />}
      <main id="main" className="flex-1">{children}</main>
      {router.pathname === '/' ? <PayFooter /> : <Footer />}
    </div>
  );
}
