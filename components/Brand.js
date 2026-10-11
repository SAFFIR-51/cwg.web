import React from 'react';

export function BrandWordmark({ className = '', color = 'currentColor', tone = 'black', compact = false }) {
  const light = tone === 'white' || color === '#fff' || color === '#ffffff' || color === 'white';
  const size = compact ? 'small' : 'big';
  const viewBox = compact ? '0 0 1024 1024' : '0 0 2152 811';
  return (
    <svg className={className} viewBox={viewBox} fill="none" aria-hidden="true">
      <image href={`/brand/logo-${size}-${light ? 'white' : 'black'}.svg?v=uppercase-20261011`} width={compact ? 1024 : 2152} height={compact ? 1024 : 811} />
    </svg>
  );
}

export function BrandLogo({ className = '', word = 'w-[73px] h-[32px]', tone = 'black' }) {
  return (
    <span className={`inline-flex items-center ${className}`} role="img" aria-label="풀리프 FULIF">
      <BrandWordmark className={word} tone={tone} />
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
