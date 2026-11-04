// 번호 만들기 이용 안내 — 영상 페이지(2026-10-21 풀리 노트 수정안 5 · 번호 만들기 수정안 3쪽).
//
// 앱의 「▶ 처음이세요? 영상으로 따라 해 보기」가 이 페이지를 앱 안 창으로 연다(?app=1 → 머리 ·
// 메뉴 · 바닥글 없음, 「닫고 이어서 하기」는 앱이 그린다). ?start=2 · 3 이면 그 방법 장면부터.
// 상단 메뉴에는 넣지 않는다 — Full Life 놀이터 링크와 앱에서만 들어온다.
// 영상은 웹에만 둔다(바꿀 때 앱 업데이트가 필요 없다). 시각은 촬영 대본과 같아야 한다.
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Seo from '../../components/Seo';

// 11-04 — 방법마다 영상이 따로다(전달받은 촬영본 3편). 예전 한 편(0:05 / 0:20 / 0:38 장면)은 뺐다.
// `at` 은 예전 앱이 보내는 장면 시각(window.fulifSeek(5 · 20 · 38))을 방법으로 바꾸는 데만 쓴다.
export const VIDEO_SRC = '/video/numbers-guide-1.mp4';
const SCENES = [
  { n: 1, at: 5, src: '/video/numbers-guide-1.mp4', len: 35, label: '스타일 고르기', line: '스타일만 고르면 35개 필터가 알아서 맞춰져요.' },
  { n: 2, at: 20, src: '/video/numbers-guide-2.mp4', len: 41, label: '필터 직접 조절', line: '핵심 필터 3개만 직접 맞춰요.' },
  { n: 3, at: 38, src: '/video/numbers-guide-3.mp4', len: 84, label: '전문가 모드', line: '35개 필터 중 원하는 것만 골라 맞춰요.' },
];
const clock = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export default function NumbersGuide() {
  const router = useRouter();
  const video = useRef(null);
  const [scene, setScene] = useState(1);
  const [missing, setMissing] = useState(false);
  const app = router.query.app === '1';
  const cur = SCENES.find((x) => x.n === scene) || SCENES[0];

  // 방법을 바꾸면 그 방법 영상을 처음부터 튼다(영상 주소가 바뀌면 브라우저가 새로 불러온다)
  const go = (n) => {
    setMissing(false);
    setScene(n);
    setTimeout(() => {
      const v = video.current;
      if (!v) return;
      try { v.currentTime = 0; } catch (_) {}
      v.play().catch(() => {});
    }, 0);
  };

  useEffect(() => {
    if (!router.isReady) return;
    const start = Number(router.query.start) || 1;
    setScene((SCENES.find((x) => x.n === start) || SCENES[0]).n);
    // 앱 시트의 방법 바로가기 — 새 앱은 방법 번호, 예전 앱은 장면 시각(5 · 20 · 38)을 보낸다
    window.fulifScene = (n) => go(Number(n) || 1);
    window.fulifSeek = (sec) => {
      const hit = [...SCENES].reverse().find((x) => sec >= x.at) || SCENES[0];
      go(hit.n);
    };
    return () => { delete window.fulifSeek; delete window.fulifScene; };
  }, [router.isReady, router.query.start]);

  const onEnded = () => {
    // 앱 웹뷰의 JavaScript 채널 — 「영상 끝까지 본 비율」
    try { window.FulifVideo && window.FulifVideo.postMessage('ended'); } catch (_) {}
  };

  return (
    <div className={`numbers-guide ${app ? 'numbers-guide-app' : ''}`}>
      <Seo title="번호 만들기 이용 안내" description="번호 만드는 방법 세 가지를 영상으로 따라 해 보세요." />
      {!app && <h1>번호 만드는 방법, 따라 해 보세요</h1>}
      <div className="ng-video">
        {missing ? (
          <div className="ng-video-missing">영상을 준비하고 있어요</div>
        ) : (
          <video key={cur.src} ref={video} src={cur.src} playsInline muted autoPlay controls preload="metadata"
            onEnded={onEnded} onError={() => setMissing(true)} />
        )}
      </div>
      <div className="ng-scenes" role="group" aria-label="방법 바로가기">
        {SCENES.map((s) => (
          <button key={s.n} type="button" className={scene === s.n ? 'on' : ''} onClick={() => go(s.n)}>
            <b>방법 {s.n}</b><span>{s.label} · {clock(s.len)}</span>
          </button>
        ))}
      </div>
      {!app && (
        <ul className="ng-lines">
          {SCENES.map((s) => <li key={s.n}><b>방법 {s.n}</b> {s.line}</li>)}
        </ul>
      )}
    </div>
  );
}

NumbersGuide.appBare = true;
