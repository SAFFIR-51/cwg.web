import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BrandLogo } from './Brand';
import Icon from './Icon';
import { COMPANY } from '../lib/site';

const MENU = [
  { label: '풀리프', href: '/full-life', detail: '생활의 가치를, 한 번 더' },
  { label: '서비스', href: '/full-life#one-more', detail: '쿠폰부터 경품까지' },
  { label: 'FOUND AI', href: '/found-ai', detail: '내 생활권의 새로운 발견' },
  { label: '멤버십', href: '/membership', detail: '더 넉넉하게, FULIF+' },
  { label: '풀리 노트', href: '/notes', detail: '풀리가 전하는 일상의 이야기' },
  { label: '브랜드 파트너', href: '/partners', detail: '함께 만드는 더 좋은 혜택' },
];

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
          {MENU.map(item => <Link key={item.label} href={item.href}>{item.label}</Link>)}
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
    <div className="pay-footer-top"><p>{COMPANY.copyright}</p><details className="pay-related"><summary>풀리프 더 알아보기 <Icon name="add" size={16} /></summary><nav aria-label="관련 페이지"><Link href="/notes">풀리 노트</Link><Link href="/partners">브랜드 파트너</Link><Link href="/download">앱 다운로드</Link><Link href="/support">고객센터</Link></nav></details></div>
    <nav className="pay-legal" aria-label="이용 안내"><Link href="/terms">이용약관</Link><Link href="/privacy"><strong>개인정보처리방침</strong></Link><Link href="/delete-account">계정 및 데이터 삭제</Link><Link href="/support">고객센터</Link><Link href="/partners">광고 및 제휴 문의</Link></nav>
    <p className="pay-company">{COMPANY.name}<span />{COMPANY.ecommerce}</p>
  </footer>;
}
