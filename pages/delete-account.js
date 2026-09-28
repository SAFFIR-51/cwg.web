import LegalPage from '../components/LegalPage';
import { readLegal } from '../lib/legal';
export async function getStaticProps() { return { props: { html: readLegal('delete-account') } }; }
export default function DeleteAccount({ html }) {
  return (
    <LegalPage eyebrow="Support · Account Deletion" title="계정 및 데이터 삭제 안내"
      intro="앱 FULIF(개발자: 씨더블유지 주식회사 / CWG Inc.) 사용자는 본인의 계정과 관련 데이터의 삭제를 요청할 수 있습니다. 아래 두 가지 방법 중 하나를 이용해 주세요."
      effective="최종 업데이트 · 2026년 6월 29일" html={html} />
  );
}
