import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BrandLogo } from './Brand';
import Icon from './Icon';


// 모바일 메뉴(PDF 2026.09.24): 홈 · Full Life · FOUND AI · 멤버십 · 풀리 노트 · 다운로드
const MENU = [
  { label: '홈', href: '/', detail: '생활의 가치를, 한 번 더.' },
  { label: 'Full Life', href: '/full-life', detail: '풀리프로 채우는 하루' },
  { label: 'FOUND AI', href: '/found-ai', detail: '풀리가 찾아 드려요' },
  { label: '멤버십', href: '/membership', detail: 'FULIF+' },
  { label: '풀리 노트', href: '/notes', detail: '풀리가 적어둔 이야기' },
  { label: '다운로드', href: '/download', detail: 'Google Play · App Store' },
];
// 데스크톱 상단 메뉴: 홈 · 다운로드는 로고와 다운로드 버튼이 대신하고, 브랜드 파트너 문의를 둔다.
const TOP_NAV = [...MENU.slice(1, 5), { label: '브랜드 파트너', href: '/partners' }];

export default function Header() {
  const router = useRouter();
  const dialog = useRef(null);
  const trigger = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => { setOpen(false); }, [router.asPath]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) {
      dialog.current?.close();
      return;
    }
    const original = document.documentElement.style.overflow;
    dialog.current?.showModal();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = original;
      dialog.current?.close();
    };
  }, [open]);

  const close = () => { setOpen(false); trigger.current?.focus(); };

  return <>
    <header className={`fulif-header${scrolled || router.pathname !== '/' ? ' fulif-header-solid' : ''}${router.pathname !== '/' ? ' fulif-header-subpage' : ''}`}>
      <div className="fulif-header-inner">
        <Link className="fulif-logo" href="/" aria-label="FULIF 홈"><BrandLogo tone={scrolled || router.pathname !== '/' ? 'black' : 'white'} /></Link>
        <nav className="fulif-nav" aria-label="주요 메뉴">
          {TOP_NAV.map(item => <Link key={item.label} href={item.href} aria-current={router.pathname.startsWith(item.href) ? 'page' : undefined}>{item.label}</Link>)}
        </nav>
        <div className="fulif-header-actions">
          <Link href="/download" className="fulif-download-link">앱 다운로드 <Icon name="arrow_outward" size={14} /></Link>
          <button ref={trigger} className="fulif-menu-toggle" aria-label="전체 메뉴 열기" aria-haspopup="dialog" aria-expanded={open} aria-controls="fulif-menu" onClick={() => setOpen(true)}><span /><span /><span /></button>
        </div>
      </div>
    </header>
    <dialog id="fulif-menu" ref={dialog} className="fulif-menu" aria-labelledby="fulif-menu-title" onCancel={close} onClose={() => setOpen(false)}>
      <div className="fulif-menu-top"><Link href="/" onClick={close} className="fulif-logo" aria-label="FULIF 홈"><BrandLogo tone="black" /></Link><button className="fulif-menu-close" onClick={close} aria-label="전체 메뉴 닫기"><Icon name="close" size={28} /></button></div>
      <div className="fulif-menu-content"><p id="fulif-menu-title">생활의 가치를, 한 번 더.</p><nav aria-label="전체 메뉴">{MENU.map(item => <Link key={item.label} href={item.href} onClick={close}><span><strong>{item.label}</strong><small>{item.detail}</small></span></Link>)}</nav><Link className="fulif-menu-start" href="/download" onClick={close}>풀리프 시작하기 <Icon name="arrow_outward" size={22} /></Link></div>
    </dialog>
  </>;
}

