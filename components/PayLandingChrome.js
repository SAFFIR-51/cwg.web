import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BrandLogo } from './Brand';
import Icon from './Icon';
import { COMPANY } from '../lib/site';

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

export function PayHeader() {
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
    <header className={`pay-header${scrolled ? ' pay-header-solid' : ''}`}>
      <div className="pay-header-inner">
        <Link className="pay-logo" href="/" aria-label="FULIF 홈"><BrandLogo /></Link>
        <nav className="pay-nav" aria-label="주요 메뉴">
          {TOP_NAV.map(item => <Link key={item.label} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="pay-header-actions">
          <Link href="/download" className="pay-download-link">앱 다운로드 <Icon name="arrow_outward" size={14} /></Link>
          <button ref={trigger} className="pay-menu-toggle" aria-label="전체 메뉴 열기" aria-haspopup="dialog" aria-expanded={open} aria-controls="pay-menu" onClick={() => setOpen(true)}><span /><span /><span /></button>
        </div>
      </div>
    </header>
    <dialog id="pay-menu" ref={dialog} className="pay-menu" aria-labelledby="pay-menu-title" onCancel={close} onClose={() => setOpen(false)}>
      <div className="pay-menu-top"><Link href="/" onClick={close} className="pay-logo" aria-label="FULIF 홈"><BrandLogo /></Link><button className="pay-menu-close" onClick={close} aria-label="전체 메뉴 닫기"><Icon name="close" size={28} /></button></div>
      <div className="pay-menu-content"><p id="pay-menu-title">생활의 가치를, 한 번 더.</p><nav aria-label="전체 메뉴">{MENU.map((item, index) => <Link key={item.label} href={item.href} onClick={close}><span className="pay-menu-number">0{index + 1}</span><span><strong>{item.label}</strong><small>{item.detail}</small></span><Icon name="arrow_forward" size={25} /></Link>)}</nav><Link className="pay-menu-start" href="/download" onClick={close}>풀리프 시작하기 <Icon name="arrow_outward" size={22} /></Link></div>
    </dialog>
  </>;
}

export function PayFooter() {
  return <footer className="pay-footer">
    <div className="pay-footer-top"><nav className="pay-legal" aria-label="풀리프 메뉴">{MENU.map(item => <Link key={item.label} href={item.href}>{item.label}</Link>)}</nav><Link href="/partners" className="pay-download-link">브랜드 파트너 문의 <Icon name="arrow_outward" size={14} /></Link></div>
    <nav className="pay-legal" aria-label="이용 안내"><Link href="/terms">이용약관</Link><Link href="/privacy"><strong>개인정보처리방침</strong></Link><Link href="/support">고객센터</Link></nav>
    <p className="pay-company">{COMPANY.name}<span />{COMPANY.ecommerce}</p>
    <p className="pay-company">{COMPANY.copyright}</p>
  </footer>;
}
