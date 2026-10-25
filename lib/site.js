export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fulif.io';
export const PLAY_URL = process.env.NEXT_PUBLIC_PLAY_URL || 'https://play.google.com/store/apps/details?id=com.cwg.fulif&hl=ko';
export const APPSTORE_URL = process.env.NEXT_PUBLIC_APPSTORE_URL || 'https://apps.apple.com/kr/app/fulif/id6762817073';
export const BLOG_URL = process.env.NEXT_PUBLIC_BLOG_URL || '';
// 테스트 오픈은 날짜를 밝히지 않고 「10월 말」(10-21 · 10-23 수정안). 그랜드 오픈 11월 23일(월)은 그대로.
export const OPEN_LABEL = '10월 말 테스트 오픈';

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
