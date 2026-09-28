// Local SVGs: navigation must not depend on a remote icon font or expose ligature names.
const GLYPHS = {
  arrow_forward: <path d="M4 12h15m-6-6 6 6-6 6" />,
  arrow_downward: <path d="M12 4v16m-6-6 6 6 6-6" />,
  music_note: <><path d="M10 17V5l10-2v12M10 8l10-2" /><ellipse cx="7" cy="18" rx="3" ry="2.5" /><ellipse cx="17" cy="16" rx="3" ry="2.5" /></>,
  arrow_outward: <path d="M6 18 18 6M6 6h12v12" />,
  south: <path d="M12 4v16m-6-6 6 6 6-6" />,
  chevron_right: <path d="m9 5 7 7-7 7" />,
  chevron_left: <path d="m15 5-7 7 7 7" />,
  expand_more: <path d="m5 9 7 7 7-7" />,
  check: <path d="m5 12 4 4L19 6" />,
  check_circle: <><circle cx="12" cy="12" r="9" /><path d="m7.5 12 3 3 6-6" /></>,
  add: <path d="M12 5v14M5 12h14" />,
  remove: <path d="M5 12h14" />,
  refresh: <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M5.3 7a8 8 0 0 1 13-2L20 7M4 17l1.7 2a8 8 0 0 0 13-2" /></>,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  local_cafe: <><path d="M4 4h12v10a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V4Zm12 1h2a3 3 0 0 1 0 6h-2M3 22h15" /></>,
  confirmation_number: <path d="M3 5h18v5a2 2 0 0 0 0 4v5H3v-5a2 2 0 0 0 0-4V5Zm12 0v3m0 3v2m0 3v3" />,
  visibility: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  visibility_off: <><path d="M3 3 21 21M10 5a12 12 0 0 1 2 0c6.5 0 10 7 10 7a22 22 0 0 1-3 4M6 6a20 20 0 0 0-4 6s3.5 7 10 7a12 12 0 0 0 5-1M10 10a3 3 0 0 0 4 4" /></>,
  auto_awesome: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM20 2v4m-2-2h4" /></>,
  location_on: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  location_off: <><path d="m3 3 18 18M8 4a7 7 0 0 1 11 6c0 2-1 4-2 5M5 8c-1 6 7 13 7 13l2-2" /></>,
  local_gas_station: <><path d="M4 21V4h10v17M3 21h12M5 9h8M14 12h2a2 2 0 0 1 2 2v3a2 2 0 0 0 4 0V9l-4-4M19 6v4h3" /></>,
  storefront: <><path d="M4 10v11h16V10M3 4h18l1 6a3 3 0 0 1-5 2 3 3 0 0 1-5 0 3 3 0 0 1-5 0 3 3 0 0 1-5-2l1-6ZM9 21v-6h6v6M7 4l-1 6m6-6v6m5-6 1 6" /></>,
  shopping_cart: <><path d="M2 3h3l3 13h11l3-9H6" /><circle cx="9" cy="21" r="1" /><circle cx="18" cy="21" r="1" /></>,
  search_off: <><circle cx="10" cy="10" r="7" /><path d="m15 15 6 6M7 7l6 6m-6 0 6-6" /></>,
  search: <><circle cx="10.5" cy="10.5" r="7" /><path d="m16 16 5 5" /></>,
  verified: <><path d="m12 2 3 2 4 1 1 4 2 3-2 3-1 4-4 1-3 2-3-2-4-1-1-4-2-3 2-3 1-4 4-1 3-2Z" /><path d="m7 12 3 3 7-7" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 5M12 17h.01" /></>,
  workspace_premium: <><circle cx="12" cy="9" r="6" /><path d="m8 14-2 8 6-3 6 3-2-8m-7-5 2 2 4-4" /></>,
  person_remove: <><circle cx="9" cy="7" r="4" /><path d="M2 21v-2a7 7 0 0 1 14 0v2m1-11h6" /></>,
  home: <><path d="m3 10 9-8 9 8M5 9v12h14V9M9 21v-8h6v8" /></>,
  redeem: <><rect x="3" y="8" width="18" height="5" rx="1" /><path d="M5 13v8h14v-8M12 8v13m0-13C3 8 5 1 8 3c2 1 4 5 4 5Zm0 0s2-4 4-5c3-2 5 5-4 5Z" /></>,
  chat: <path d="M20 3H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3l5 3v-3h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM7 8h10M7 13h6" />,
  favorite: <path d="M20 5a5 5 0 0 0-8 1 5 5 0 0 0-8-1c-4 4 0 9 8 15 8-6 12-11 8-15Z" />,
  play_arrow: <path d="m8 4 12 8-12 8V4Z" />,
  group: <><circle cx="9" cy="7" r="4" /><path d="M2 21v-2a7 7 0 0 1 14 0v2M17 3a4 4 0 0 1 0 8m2 3a6 6 0 0 1 3 5v2" /></>,
};

export default function Icon({ name, className = '', size = 24 }) {
  return (
    <svg className={`msym icon-svg ${className}`} data-icon={name} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size, flexShrink: 0, verticalAlign: 'middle' }} aria-hidden="true" focusable="false">
      {GLYPHS[name] || GLYPHS.auto_awesome}
    </svg>
  );
}

export function IconCircle({ name, className = '', size = 40, icon = 22, tone = 'gray' }) {
  const tones = { gray: 'bg-hair text-ink', blue: 'bg-blue-soft text-blue', white: 'bg-white text-ink', green: 'bg-green-soft text-green' };
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full ${tones[tone]} ${className}`} style={{ width: size, height: size }}>
      <Icon name={name} size={icon} />
    </span>
  );
}
