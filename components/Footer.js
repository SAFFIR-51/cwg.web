import Link from 'next/link';
import { COMPANY } from '../lib/site';

const GROUPS = [
  ['풀리프 서비스', [['Full Life', '/full-life'], ['FOUND AI', '/found-ai'], ['FULIF+', '/membership'], ['앱 다운로드', '/download']]],
  ['풀리프 이야기', [['풀리 노트', '/notes'], ['브랜드 파트너', '/partners'], ['생활의 가치를, 한 번 더', '/']]],
  ['서비스 이용 안내', [['고객센터', '/support'], ['이용약관', '/terms'], ['개인정보처리방침', '/privacy']]],
];

export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-scene-top"><p className="footer-scene-title">생활의 가치를,<br />한 번 더. 풀리프 하나로.</p><nav className="footer-scene-links" aria-label="푸터 메뉴">{GROUPS.map(([title, links])=><div key={title}><h2>{title}</h2>{links.map(([label, href])=><Link key={href} href={href}>{label}</Link>)}</div>)}</nav></div>
    <div className="footer-scene-info"><p>{COMPANY.name}</p><p>{COMPANY.ecommerce}</p><nav className="footer-scene-legal" aria-label="약관 및 고객센터"><Link href="/terms">이용약관</Link><Link href="/privacy">개인정보처리방침</Link><Link href="/support">고객센터</Link></nav></div>
    <p className="footer-scene-word" aria-hidden="true">Have a Fuli Day.</p><p className="footer-scene-copyright">{COMPANY.copyright}</p>
  </footer>;
}
