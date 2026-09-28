import LegalPage from '../components/LegalPage';
import { readLegal } from '../lib/legal';
export async function getStaticProps() { return { props: { html: readLegal('privacy') } }; }
export default function Privacy({ html }) {
  return (
    <LegalPage eyebrow="Privacy" title="FULIF 개인정보처리방침"
      intro='씨더블유지 주식회사(이하 "회사")는 「개인정보 보호법」 및 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 준수하며, 이용자의 개인정보를 보호하기 위하여 다음과 같이 개인정보처리방침을 수립·공개합니다.'
      effective="시행일 · 2026년 7월 27일" html={html} />
  );
}
