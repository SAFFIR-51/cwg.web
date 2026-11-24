import { useEffect, useRef } from 'react';
import { AppStoreBadge, GooglePlayBadge } from './StoreBadges';
import { OPEN_LABEL } from '../lib/site';

/* 첫 화면 — 「채워지는 하루」 움직이는 카드(11-23 요청).
   가운데 원에 물이 8초 동안 차올라 그대로 머물고, 물결은 계속 잔잔하게 흐른다.
   전부 HTML · CSS(styles/home-hero.css) — 영상 · 그림 파일 없이 transform · opacity 만 움직인다.
   움직이는 카드는 장식이라 통째로 aria-hidden, 읽히는 글은 오른쪽(휴대폰은 아래) 글 묶음의 h1 · p 다. */

const TICKET_KINDS = [
  ['영화', <><rect x="3" y="5" width="14" height="10" rx="2" /><path d="M6 5v10M14 5v10" /></>],
  ['기차', <><rect x="5" y="3" width="10" height="11" rx="3" /><path d="M5 9h10M7 17l-2 2M13 17l2 2" /><circle cx="8" cy="12" r=".6" /><circle cx="12" cy="12" r=".6" /></>],
  ['항공권', <path d="M2 11l16-6-5 11-3-4-8-1z" />],
  ['스포츠', <><circle cx="10" cy="10" r="7" /><path d="M3 10h14M10 3c3 3 3 11 0 14M10 3c-3 3-3 11 0 14" /></>],
  ['공연', <><path d="M8 15V4l8-2v11" /><circle cx="6" cy="15" r="2" /><circle cx="14" cy="13" r="2" /></>],
];

// 교환권 바코드 — 굵기만 다른 막대(x, 폭)
const BARS = [[0, 1.2], [2, 1.6], [5.2, .8], [6.8, 2], [9.6, 1.2], [12.4, .8], [14.8, .8], [16.4, .8], [18.4, 1.6], [20.8, .8], [22.4, 2], [25.6, .8], [28, .8], [29.6, 2], [32.4, 2], [36, 1.6], [38.4, .8], [40, 2], [42.8, 1.2], [45.2, .8]];

function OrbText({ className }) {
  return <div className={`fh-orb-text ${className}`}><b>한 번 더</b><span>일상이 모여 채워지는 하루</span></div>;
}

function Stage() {
  return <div className="fh-stage-wrap" aria-hidden="true">
    <div className="fh-stage">
      <div className="fh-orb-shell">
        <div className="fh-orb-halo" />
        <div className="fh-orb-ring" />
        <div className="fh-orb">
          <OrbText className="is-dry" />
          <div className="fh-water">
            <div className="fh-wave fh-wave-back" />
            <div className="fh-wave fh-wave-front">
              {/* 물 안쪽의 흰 글씨 — 물결과 반대로 움직여 제자리에 머문다. 물결 모양 그대로 잘려서
                  물 위는 파란 글씨, 잠긴 부분은 흰 글씨로 보인다. */}
              <div className="fh-ink-x"><div className="fh-ink-y"><OrbText className="is-wet" /></div></div>
            </div>
            <div className="fh-bubbles"><i /><i /><i /><i /><i /></div>
          </div>
          <div className="fh-sheen" />
          <div className="fh-gloss" />
        </div>
      </div>

      <div className="fh-pop fh-pos-coupon"><div className="fh-float" style={{ '--r': '-9deg', '--d': '0s' }}>
        <div className="fh-card fh-coupon">
          <div className="fh-coupon-head">
            <svg viewBox="0 0 24 24" fill="none" stroke="#0163FA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="10" rx="1.5" /><path d="M3 7h18v3H3zM12 7v13M12 7c-1.5-3-5-3-5-1s3 1 5 1c2 0 5 1 5-1s-3.5-2-5 1" /></svg>
          </div>
          <div className="fh-coupon-body">
            <strong>교환권</strong>
            <svg className="fh-barcode" viewBox="0 0 46 16" preserveAspectRatio="none">{BARS.map(([x, w]) => <rect key={x} x={x} y="0" width={w} height="16" />)}</svg>
            <small>2026 1122 0301</small>
            <em>~ 2027.11.21</em>
          </div>
        </div>
      </div></div>

      <div className="fh-pop fh-pos-ticket"><div className="fh-float" style={{ '--r': '9deg', '--d': '-.6s' }}>
        <div className="fh-card fh-ticket">
          <div className="fh-ticket-main">
            <span className="fh-ticket-eyebrow">TICKET</span>
            <strong>티켓</strong>
            <div className="fh-ticket-kinds">{TICKET_KINDS.map(([label, icon], i) => <span key={label} style={{ '--i': i }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>{label}
            </span>)}</div>
          </div>
          <div className="fh-ticket-stub"><i /><i /><i /></div>
        </div>
      </div></div>

      <div className="fh-pop fh-pos-receipt"><div className="fh-float" style={{ '--r': '7deg', '--d': '-1.1s' }}>
        <div className="fh-card fh-receipt">
          <strong>주유 영수증</strong>
          <i style={{ width: '70%' }} /><i style={{ width: '42%' }} /><i style={{ width: '64%' }} /><i style={{ width: '52%' }} />
          <div className="fh-receipt-sum"><span>합계</span><b /></div>
        </div>
      </div></div>

      <div className="fh-pop fh-pos-numbers"><div className="fh-float" style={{ '--r': '-8deg', '--d': '-1.6s' }}>
        <div className="fh-card fh-numbers">
          <strong>낙첨번호</strong>
          <div><span className="is-yellow">7</span><span className="is-green">18</span><span className="is-blue">33</span></div>
        </div>
      </div></div>

      <span className="fh-dot" style={{ '--x': 104, '--y': 108, '--s': 7, '--c': '#FF8A3D', '--d': '0s' }} />
      <span className="fh-dot" style={{ '--x': 118, '--y': 120, '--s': 5, '--c': '#FF8A3D', '--d': '-.3s' }} />
      <span className="fh-dot" style={{ '--x': 258, '--y': 96, '--s': 6, '--c': '#01102F', '--d': '-.2s' }} />
      <span className="fh-dot" style={{ '--x': 96, '--y': 214, '--s': 7, '--c': '#8FA3CC', '--d': '-.4s' }} />
      <span className="fh-dot" style={{ '--x': 286, '--y': 180, '--s': 6, '--c': '#2DBE6C', '--d': '-.7s' }} />
      <span className="fh-spark" style={{ '--x': 300, '--y': 128, '--d': '-.9s' }}>+</span>

      <div className="fh-chips">
        <span className="fh-chip is-points" style={{ '--d': '0s' }}>+120 P</span>
        <span className="fh-chip is-entry" style={{ '--d': '-.4s' }}>응모권 1장</span>
        <span className="fh-chip is-life" style={{ '--d': '-.8s' }}>생활 혜택</span>
      </div>
    </div>
  </div>;
}

export default function HomeHero() {
  const root = useRef(null);

  // 화면 밖으로 나가면 움직임을 멈춘다(배터리). 물 차오름도 같이 멈췄다가 돌아오면 이어서 찬다.
  useEffect(() => {
    const el = root.current;
    if (!el || !window.IntersectionObserver) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.removeAttribute('data-paused');
      else el.setAttribute('data-paused', '');
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <section id="intro" ref={root} className="fh" aria-label="풀리프 소개">
    <div className="fh-inner">
      <Stage />
      <div className="fh-copy">
        <span className="fh-eyebrow">FULIF · 풀리프</span>
        <h1>생활의 가치를<br /><span className="fh-accent">한 번 더</span></h1>
        <p>쿠폰 · 티켓 · 주유 영수증 · 낙첨 번호까지, <br />일상의 기록을 생활 혜택으로 바꿔주는 AI 리워드 플랫폼</p>
        <p>그냥 지나칠 뻔한 것들을 한곳에 모아 두세요. <br />응모권으로, 포인트로, 내 생활권의 혜택으로 다시 돌아와요.</p>
        <div className="fulif-store-links fh-stores"><GooglePlayBadge /><AppStoreBadge /></div>
        <small className="fh-note">{OPEN_LABEL} · 만 19세 이상 이용할 수 있어요</small>
      </div>
    </div>
  </section>;
}
