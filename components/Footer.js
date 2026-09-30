import Link from 'next/link';
import { BrandLogo } from './Brand';
import StoreBadges from './StoreBadges';
import { COMPANY, OPEN_DATE } from '../lib/site';

const GROUPS = [
  ['서비스', [['Full Life', '/full-life'], ['FOUND AI', '/found-ai'], ['FULIF+ 멤버십', '/membership'], ['앱 다운로드', '/download']]],
  ['이야기', [['풀리 노트', '/notes'], ['브랜드 파트너', '/partners']]],
  ['이용 안내', [['고객센터', '/support'], ['이용약관', '/terms'], ['개인정보처리방침', '/privacy'], ['계정 및 데이터 삭제', '/delete-account']]],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <BrandLogo />
            <p>쿠폰 · 티켓 · 번호로 시작하는 AI 리워드 플랫폼.<br />생활의 가치를, 한 번 더.</p>
          </div>
          {GROUPS.map(([title, links]) => (
            <div key={title} className="footer-group">
              <p>{title}</p>
              {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <div>
            <p>{COMPANY.name} · {COMPANY.ecommerce}</p>
            <p>{COMPANY.copyright} · {OPEN_DATE} 오픈 · 만 19세 이상 이용할 수 있어요.</p>
          </div>
          <nav className="footer-legal" aria-label="약관 및 고객센터">
            <Link href="/terms">이용약관</Link>
            <Link href="/privacy">개인정보처리방침</Link>
            <Link href="/support">고객센터</Link>
          </nav>
          <StoreBadges className="footer-badges" />
        </div>
      </div>
    </footer>
  );
}
