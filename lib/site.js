export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fulif.io';
export const PLAY_URL = process.env.NEXT_PUBLIC_PLAY_URL || 'https://play.google.com/store/apps/details?id=com.cwg.fulif&hl=ko';
export const APPSTORE_URL = process.env.NEXT_PUBLIC_APPSTORE_URL || 'https://apps.apple.com/kr/app/fulif/id6762817073';
export const BLOG_URL = process.env.NEXT_PUBLIC_BLOG_URL || '';
// 11-19 오픈일 변경 — 테스트 오픈 ~ 11/29, 오픈 11월 30일(월). 11/30 부터는 이 줄을 빼고
// 「만 19세 이상 이용할 수 있어요」만 남긴다(요청 문서 1번).
export const OPEN_LABEL = '11월 29일까지 테스트 오픈';

export const NAV = [
  { href: '/', label: '홈' },
  { href: '/full-life', label: 'Full Life' },
  { href: '/found-ai', label: 'FOUND AI' },
  { href: '/membership', label: '멤버십' },
  { href: '/notes', label: '풀리 노트' },
  { href: '/download', label: '다운로드' },
];

export const COMPANY = {
  name: 'CWG Inc. (씨더블유지 주식회사)',
  ecommerce: '통신판매업신고 제2026-서울강남-02697호',
  copyright: '© 2026 CWG Inc. All rights reserved.',
};
