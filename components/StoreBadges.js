import { PLAY_URL, APPSTORE_URL } from '../lib/site';

/* Google · Apple 공식 배지 이미지(public/badges/)를 그대로 쓴다.
   Google Play: play.google.com 배지 생성기 원본(en, 바깥 투명 여백만 잘라냄)
   App Store: developer.apple.com 공식 SVG(Download on the App Store, black) */
function Badge({ href, label, src, width }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="store-badge inline-flex h-[48px] shrink-0 transition-opacity hover:opacity-85">
      <img src={src} alt={label} width={width} height={48} className="h-full w-auto" />
    </a>
  );
}

export function GooglePlayBadge() {
  return <Badge href={PLAY_URL} label="Google Play에서 받기" src="/badges/google-play-badge.png" width={161} />;
}

export function AppStoreBadge() {
  return <Badge href={APPSTORE_URL} label="App Store에서 받기" src="/badges/app-store-badge.svg" width={144} />;
}

export default function StoreBadges({ className = '', center = false }) {
  return (
    <div className={`flex flex-wrap gap-3 ${center ? 'justify-center' : ''} ${className}`}>
      <GooglePlayBadge />
      <AppStoreBadge />
    </div>
  );
}
