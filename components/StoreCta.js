import { useEffect, useState } from 'react';
import Icon from './Icon';
import { PLAY_URL, APPSTORE_URL } from '../lib/site';

// 구독 결제는 앱에서 — 버튼은 앱 스토어로(iPhone · iPad 는 App Store, 그 밖에는 Google Play)
export function useStoreUrl() {
  const [url, setUrl] = useState(PLAY_URL);
  useEffect(() => {
    const ua = navigator.userAgent || '';
    const ios = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
    if (ios) setUrl(APPSTORE_URL);
  }, []);
  return url;
}

export default function StoreCta({ className = '' }) {
  const href = useStoreUrl();
  return <a href={href} target="_blank" rel="noopener noreferrer" className={'btn-primary '+className}>앱에서 1개월 무료로 시작하기 <Icon name="arrow_forward" size={18} /></a>;
}

