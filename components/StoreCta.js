import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import { PLAY_URL, APPSTORE_URL } from '../lib/site';
import { detectDevice } from '../lib/device';

// 구독 결제는 앱에서 — 휴대폰이면 그 기기의 스토어로 바로,
// PC(또는 기기를 모를 때)는 두 스토어를 고를 수 있는 다운로드 페이지로.
// 예전엔 PC 도 Google Play 로 보내서, PC 로 보는 아이폰 사용자가 길을 잃었다(QA-14).
export function useStoreTarget() {
  const [target, setTarget] = useState({ href: '/download', external: false });
  useEffect(() => {
    const d = detectDevice();
    if (d === 'android') setTarget({ href: PLAY_URL, external: true });
    else if (d === 'ios') setTarget({ href: APPSTORE_URL, external: true });
  }, []);
  return target;
}

// 무료 체험 조건 — 「첫 달 무료」 버튼 바로 아래에 늘 같이 둔다(QA-15).
export const TRIAL_TERMS = '월간 첫 구독 1회만 1개월 무료 · 이후 월 4,900원 자동 갱신 · 연간은 체험 없이 바로 결제';

export default function StoreCta({ className = '', terms = true }) {
  const { href, external } = useStoreTarget();
  const label = <>앱에서 1개월 무료로 시작하기 <Icon name="arrow_forward" size={18} /></>;
  const button = external
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={'btn-primary '+className}>{label}</a>
    : <Link href={href} className={'btn-primary '+className}>{label}</Link>;
  if (!terms) return button;
  return <>{button}<p className="store-cta-terms">{TRIAL_TERMS}</p></>;
}
