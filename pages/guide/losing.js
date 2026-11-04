// 낙첨 번호 등록 이용 안내 — 영상 페이지(2026-11-04 전달받은 촬영본).
//
// 앱 낙첨 ONE MORE 화면의 「▶ 처음이세요? 영상으로 따라 해 보기」가 이 페이지를 앱 안 창으로
// 연다(?app=1 → 머리 · 메뉴 · 바닥글 없음, 닫기는 앱이 그린다). 번호 만들기 영상(/guide/numbers)과
// 같은 틀. 영상은 웹에만 둔다 — 바꿀 때 앱 업데이트가 필요 없다(같은 파일 이름으로 덮기).
import { useState } from 'react';
import { useRouter } from 'next/router';
import Seo from '../../components/Seo';

export const VIDEO_SRC = '/video/losing-guide.mp4';

export default function LosingGuide() {
  const router = useRouter();
  const [missing, setMissing] = useState(false);
  const app = router.query.app === '1';

  const onEnded = () => {
    // 앱 웹뷰의 JavaScript 채널 — 「영상 끝까지 본 비율」
    try { window.FulifVideo && window.FulifVideo.postMessage('ended'); } catch (_) {}
  };

  return (
    <div className={`numbers-guide ${app ? 'numbers-guide-app' : ''}`}>
      <Seo title="낙첨 번호 등록 이용 안내" description="낙첨 번호를 QR · 사진으로 등록하고 응모권을 받는 방법을 영상으로 따라 해 보세요." />
      {!app && <h1>낙첨 번호 등록, 따라 해 보세요</h1>}
      <div className="ng-video">
        {missing ? (
          <div className="ng-video-missing">영상을 준비하고 있어요</div>
        ) : (
          <video ref={(v) => { if (v) v.play().catch(() => {}); }} src={VIDEO_SRC} playsInline muted autoPlay controls
            preload="metadata" onEnded={onEnded} onError={() => setMissing(true)} />
        )}
      </div>
      {!app && (
        <ul className="ng-lines">
          <li><b>1</b> 낙첨 ONE MORE에서 「QR · 사진으로 등록하기」를 눌러요.</li>
          <li><b>2</b> 용지를 프레임 안에 맞추면 번호를 자동으로 읽어요.</li>
          <li><b>3</b> 세트마다 브랜드 파트너 5초를 보면 응모권 1장이 생겨요.</li>
        </ul>
      )}
    </div>
  );
}

LosingGuide.appBare = true;
