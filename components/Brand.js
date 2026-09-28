import React, { useId } from 'react';

// 01_개발 앱과 동일한 F 심벌 + fulif 워드마크
export function BrandSymbol({ className = '' }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={className} viewBox="0 0 40 44" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-base`} x1="4" y1="1" x2="29" y2="41" gradientUnits="userSpaceOnUse">
          <stop stopColor="#63D5FF" /><stop offset=".45" stopColor="#0786F6" /><stop offset="1" stopColor="#064CCE" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="11" y1="12" x2="34" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BAEFFF" stopOpacity=".95" /><stop offset=".52" stopColor="#349FFF" stopOpacity=".9" /><stop offset="1" stopColor="#0563E0" />
        </linearGradient>
      </defs>
      <path d="M9 3.5H34L29.5 13.5H17.5L8 40.5H0L9 3.5Z" fill={`url(#${id}-base)`} />
      <path d="M15 18H35L30.5 28H12L15 18Z" fill={`url(#${id}-glass)`} />
      <path d="M9.5 4H33M15.5 18.5H34" stroke="white" strokeOpacity=".55" strokeWidth="1" />
      <path d="M12 28L17 29.8L20.4 28H12Z" fill="#0646A8" fillOpacity=".3" />
    </svg>
  );
}

export function BrandLogo({ className = '', symbol = 'w-[25px] h-[30px]', word = 'w-[73px] h-[32px]' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} role="img" aria-label="풀리프 FULIF">
      <BrandSymbol className={symbol} />
      <svg className={`${word} text-ink`} viewBox="0 0 124 54" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 44V19Q15 8 28 9M8 24H27" />
          <path d="M40 24V34Q40 44 50 44Q60 44 60 34V24" />
          <path d="M74 9V37Q74 44 79 44" />
          <path d="M91 25V44" />
          <path d="M107 44V19Q107 8 119 9M101 24H120" />
        </g>
        <circle cx="91" cy="11" r="4.5" fill="#0078FF" />
      </svg>
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
