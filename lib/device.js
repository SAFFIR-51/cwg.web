// 휴대폰 종류 — 'android' | 'ios' | null(PC · 서버 렌더 · 그 밖의 기기).
// 아이패드는 데스크톱 사파리처럼 보고하므로 터치 지점 수로 가른다.
export function detectDevice() {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua)) return 'android';
  if (/iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return 'ios';
  return null;
}
