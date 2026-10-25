// 이용약관 판(版) — 2026-11-23 시행 개정 약관(10-24 최종본)과 그 전 약관(2026-10-19 개정).
//
// /terms 는 시행일 전에는 지금 약관 + 위쪽 개정 예고, 시행일부터는 개정 약관을 본문으로 보여 준다.
// 사이트가 정적 빌드라 「오늘이 시행일 지났나」는 브라우저에서 고른다(서버 렌더 기본값은 지금 약관).
// ※ 2026-11-23 이후 첫 배포 때 DEFAULT_CURRENT 를 'next' 로 바꾸면 첫 화면부터 개정 약관이 뜬다.
export const NEXT_EFFECTIVE_AT = Date.parse('2026-11-23T00:00:00+09:00');
export const DEFAULT_CURRENT = 'prev';

export const TERMS_PREV = {
  slug: '2026-10-19',
  file: 'terms-20261019',
  intro: '본 약관은 씨더블유지 주식회사(이하 "회사")가 제공하는 모바일 애플리케이션 및 관련 웹 서비스 "FULIF"(이하 "서비스")의 이용과 관련하여, 회사와 회원 간의 권리·의무 및 책임사항, 서비스 이용조건 및 절차 등 기본적인 사항을 규정함을 목적으로 합니다.',
  effective: '시행일 · 2026년 10월 19일 (개정) · 제정일 2026년 7월 31일',
};

export const TERMS_NEXT = {
  slug: '2026-11-23',
  file: 'terms-20261123',
  intro: '이 약관은 씨더블유지 주식회사(이하 「회사」)가 제공하는 풀리프(FULIF) 서비스의 이용과 관련하여 회사와 회원의 권리, 의무, 책임과 이용 조건 및 절차를 정합니다.',
  effective: '제정 2026년 7월 31일 · 시행 2026년 9월 7일 · 개정 2026년 10월 19일 · 개정 2026년 11월 23일 시행',
};

export function isNextInEffect(now = Date.now()) {
  return now >= NEXT_EFFECTIVE_AT;
}
