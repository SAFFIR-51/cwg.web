import React, { useId } from 'react';

// 워드마크만 쓴다 — F 심벌은 포뮬러원 F 와 닮아 분쟁 소지가 있다는 의견으로
// 2026-10 에 걷었다(앱도 같은 결정). 경로는 앱 FUBrandLogo 와 같다.
export function BrandWordmark({ className = '', color = 'currentColor' }) {
  return (
    <svg className={className} viewBox="0 0 124 54" fill="none" aria-hidden="true">
      <g stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 44V19Q15 8 28 9M8 24H27" />
        <path d="M40 24V34Q40 44 50 44Q60 44 60 34V24" />
        <path d="M74 9V37Q74 44 79 44" />
        <path d="M91 25V44" />
        <path d="M107 44V19Q107 8 119 9M101 24H120" />
      </g>
      <circle cx="91" cy="11" r="4.5" fill="#0078FF" />
    </svg>
  );
}

export function BrandLogo({ className = '', word = 'w-[73px] h-[32px]' }) {
  return (
    <span className={`inline-flex items-center ${className}`} role="img" aria-label="풀리프 FULIF">
      <BrandWordmark className={`${word} text-ink`} />
    </span>
  );
}

export function CloverSymbol({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 12c-1.2-3.6-4.8-4.8-6.6-3-1.8 1.8-.6 5.4 3 6.6M12 12c3.6-1.2 4.8-4.8 3-6.6-1.8-1.8-5.4-.6-6.6 3M12 12c1.2 3.6 4.8 4.8 6.6 3 1.8-1.8.6-5.4-3-6.6M12 12c-3.6 1.2-4.8 4.8-3 6.6 1.8 1.8 5.4.6 6.6-3M12 12l1 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
