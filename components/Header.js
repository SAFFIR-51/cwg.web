import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BrandLogo } from './Brand';
import Icon from './Icon';
import { NAV } from '../lib/site';

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [router.asPath]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.documentElement.style.overflow = ''; };
  }, [open]);

  const isActive = (href) => (href === '/' ? router.pathname === '/' : router.pathname.startsWith(href));

  return (
    <header className={`site-header sticky top-0 z-50 ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <Link href="/" className="shrink-0" aria-label="FULIF 홈">
          <BrandLogo />
        </Link>

        <nav className="header-main-nav" aria-label="주요 메뉴">
          {[{ href: '/full-life', label: 'Full Life' }, { href: '/found-ai', label: 'FOUND AI' }, { href: '/membership', label: '멤버십' }, { href: '/notes', label: '풀리 노트' }, { href: '/partners', label: '브랜드 파트너' }].map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? 'page' : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/download" className="header-download">앱 다운로드</Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-hair lg:hidden"
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={26} />
          </button>
        </div>
      </div>

      {/* 모바일 전체 메뉴 (디자인 p.17) */}
      <div
        id="mobile-menu"
        className={`mobile-menu fixed inset-x-0 bottom-0 top-[72px] md:top-[84px] z-40 overflow-y-auto bg-white lg:hidden ${open ? '' : 'hidden'}`}
        aria-hidden={!open}
      >
        <nav className="container pt-2" aria-label="모바일 메뉴">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center justify-between border-b border-hair py-5 text-[22px] font-bold tracking-tightest ${isActive(n.href) ? 'text-blue' : 'text-ink'}`}
            >
              {n.label}
              <Icon name="chevron_right" className="text-faint" size={22} />
            </Link>
          ))}
          <Link href="/partners" className="btn-primary mt-6 w-full">브랜드 파트너 문의</Link>
        </nav>
      </div>
    </header>
  );
}
