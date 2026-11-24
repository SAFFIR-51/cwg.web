export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fulif.io';
export const PLAY_URL = process.env.NEXT_PUBLIC_PLAY_URL || 'https://play.google.com/store/apps/details?id=com.cwg.fulif&hl=ko';
export const APPSTORE_URL = process.env.NEXT_PUBLIC_APPSTORE_URL || 'https://apps.apple.com/kr/app/fulif/id6762817073';
export const BLOG_URL = process.env.NEXT_PUBLIC_BLOG_URL || '';
// 11-23 첫 화면 요청 — 오픈 안내는 「11월 30일 오픈 · 만 19세 이상 이용할 수 있어요」 한 줄로 통일.
// (예전: 「11월 29일까지 테스트 오픈」) 쓰는 곳 — 첫 화면 · 홈 맨 아래 시작 띠 · 다운로드 페이지.
export const OPEN_LABEL = '11월 30일 오픈';

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
