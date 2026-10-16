import { useEffect, useState } from 'react';
import { PLAY_URL, APPSTORE_URL } from '../lib/site';
import { detectDevice } from '../lib/device';

/* 앱 다운로드 QR — public/qr/*.svg 는 lib/site.js 의 스토어 주소로 만든 것.
   주소가 바뀌면 QR 도 다시 만든다(segno, 오류 정정 M).
   데스크톱: 안드로이드 · 아이폰 두 장을 나란히.
   모바일: 기기에 맞는 한 장만(아이폰 → App Store, 안드로이드 → Google Play).
   기기를 모르면(서버 렌더 · 그 밖의 기기) 두 장 다 보인다. */
const QRS = {
  android: { href: PLAY_URL, src: '/qr/play.svg', device: 'Android', store: 'Google Play' },
  ios: { href: APPSTORE_URL, src: '/qr/appstore.svg', device: 'iPhone', store: 'App Store' },
};

export default function DownloadQr() {
  const [device, setDevice] = useState(null);
  useEffect(() => { setDevice(detectDevice()); }, []);
  const keys = device ? [device] : ['android', 'ios'];

  return (
    <div className={`download-qr ${device ? 'is-single' : ''}`}>
      <div className="download-qr-list">
        {keys.map((k) => {
          const q = QRS[k];
          return (
            <a key={k} className="download-qr-card" href={q.href} target="_blank" rel="noopener noreferrer" aria-label={`${q.store}에서 풀리프 받기 QR 코드`}>
              <img src={q.src} alt="" width={120} height={120} />
              <span><b>{q.device}</b>{q.store}</span>
            </a>
          );
        })}
      </div>
      <p>{device ? '누르거나 다른 휴대폰 카메라로 비추면 바로 설치 화면으로 가요.' : '휴대폰 카메라로 비추면 바로 설치 화면으로 가요.'}</p>
    </div>
  );
}
