import { PLAY_URL, APPSTORE_URL } from '../lib/site';

/* 공식 배지 형태(검정 바탕 · 흰 테두리)를 SVG로 그림.
   Google · Apple 공식 배지 이미지 파일을 받으면 public/badges/ 에 넣고 img 로 교체 가능. */
function Badge({ href, label, top, bottom, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-[48px] items-center gap-2.5 rounded-[9px] border border-[#A6A6A6] bg-[#111] pl-3 pr-4 text-white transition-opacity hover:opacity-85"
    >
      {children}
      <span className="flex flex-col leading-none">
        <span className="text-[9px] font-medium uppercase tracking-wide opacity-90">{top}</span>
        <span className="text-[17px] font-semibold tracking-[-0.02em]">{bottom}</span>
      </span>
    </a>
  );
}

export function GooglePlayBadge() {
  return (
    <Badge href={PLAY_URL} label="Google Play에서 받기" top="Get it on" bottom="Google Play">
      <svg width="26" height="28" viewBox="0 0 26 28" aria-hidden="true">
        <path d="M1.2 1.1c-.4.4-.6 1-.6 1.8v22.2c0 .8.2 1.4.6 1.8l.1.1L14 14.6v-.3L1.3 1z" fill="#00D7FE" />
        <path d="M18.2 18.8 14 14.6v-.3l4.2-4.2.1.1 5 2.9c1.4.8 1.4 2.2 0 3l-5 2.9-.1-.2z" fill="#FFCE00" />
        <path d="M18.3 18.7 14 14.4 1.2 27.2c.5.5 1.2.6 2.1.1l15-8.6" fill="#FF3A44" />
        <path d="M18.3 10.2 3.3 1.6C2.4 1.1 1.7 1.2 1.2 1.7L14 14.4l4.3-4.2z" fill="#00F076" />
      </svg>
    </Badge>
  );
}

export function AppStoreBadge() {
  return (
    <Badge href={APPSTORE_URL} label="App Store에서 받기" top="Download on the" bottom="App Store">
      <svg width="24" height="28" viewBox="0 0 24 28" aria-hidden="true" fill="#fff">
        <path d="M19.6 14.9c0-3 2.5-4.5 2.6-4.6-1.4-2.1-3.6-2.4-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1-1 0-2.4-1.1-4-1-2 0-3.9 1.2-5 3-2.1 3.7-.5 9.2 1.5 12.2 1 1.5 2.2 3.1 3.8 3.1 1.5-.1 2.1-1 3.9-1s2.3 1 3.9 1c1.6 0 2.7-1.5 3.7-3 1.2-1.7 1.6-3.3 1.7-3.4-.1 0-3.1-1.2-3.1-4.9zM16.6 5.9c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.7.8-3.5 1.8-.8.9-1.5 2.3-1.3 3.7 1.4.1 2.7-.7 3.6-1.7z" />
      </svg>
    </Badge>
  );
}

export default function StoreBadges({ className = '', center = false }) {
  return (
    <div className={`flex flex-wrap gap-3 ${center ? 'justify-center' : ''} ${className}`}>
      <GooglePlayBadge />
      <AppStoreBadge />
    </div>
  );
}
