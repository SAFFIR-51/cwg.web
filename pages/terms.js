import LegalPage from '../components/LegalPage';
import { readLegal } from '../lib/legal';
export async function getStaticProps() { return { props: { html: readLegal('terms') } }; }
export default function Terms({ html }) {
  return (
    <LegalPage eyebrow="Terms" title="FULIF 서비스 이용약관"
      intro='본 약관은 씨더블유지 주식회사(이하 "회사")가 제공하는 모바일 애플리케이션 및 관련 웹 서비스 "FULIF"(이하 "서비스")의 이용과 관련하여, 회사와 회원 간의 권리·의무 및 책임사항, 서비스 이용조건 및 절차 등 기본적인 사항을 규정함을 목적으로 합니다.'
      effective="시행일 · 2026년 9월 7일 (제정일 2026년 7월 31일)" html={html} />
  );
}
