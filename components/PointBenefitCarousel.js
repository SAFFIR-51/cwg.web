import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';

const BENEFITS = [
  { art: 'vote', title: '오늘의 한 표', description: '세 가지 질문에 모두 답하면', reward: '30P', href: '/full-life#vote' },
  { art: 'invite', title: '친구 초대', description: '초대한 분도, 초대받은 분도', reward: '100P', href: '/full-life#points' },
  { art: 'watch', title: '광고 보기', description: '보는 시간만큼 차곡차곡', reward: '1초에 1P', href: '/full-life#points' },
  { art: 'donate', title: '쿠폰 기부', description: '따뜻한 마음을 나누면', reward: '30P', href: '/full-life#points' },
];

function getMetrics(track) {
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  const step = track.firstElementChild.getBoundingClientRect().width + gap;
  const visible = Math.max(1, Math.round(track.clientWidth / step));
  const start = Math.min(BENEFITS.length - visible, Math.max(0, Math.round(track.scrollLeft / step)));
  return { step, visible, start };
}

export default function PointBenefitCarousel() {
  const trackRef = useRef(null);
  const [view, setView] = useState({ start: 0, visible: 4 });

  useEffect(() => {
    const track = trackRef.current;
    let frame = 0;
    const sync = () => {
      frame = 0;
      const { start, visible } = getMetrics(track);
      setView(previous => previous.start === start && previous.visible === visible ? previous : { start, visible });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(sync); };
    track.addEventListener('scroll', schedule, { passive: true });
    const observer = window.ResizeObserver ? new ResizeObserver(schedule) : null;
    observer?.observe(track);
    window.addEventListener('resize', schedule);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer?.disconnect();
    };
  }, []);

  const move = direction => {
    const track = trackRef.current;
    const { start, step, visible } = getMetrics(track);
    const next = Math.max(0, Math.min(BENEFITS.length - visible, start + direction * visible));
    track.scrollTo({ left: next * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  const onKeyDown = event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  };

  return <div className="pay-benefit-carousel" role="region" aria-label="매일의 포인트 혜택" aria-roledescription={view.visible < BENEFITS.length ? '캐러셀' : undefined}>
    <div className="pay-benefit-track" id="pay-benefit-track" ref={trackRef} tabIndex={view.visible < BENEFITS.length ? 0 : -1} aria-label={view.visible < BENEFITS.length ? '포인트 혜택 카드, 좌우 방향키로 이동' : '포인트 혜택 카드'} onKeyDown={onKeyDown}>
      {BENEFITS.map(({ art, title, description, reward, href }, index) => <Link className="pay-benefit-card" key={art} href={href} aria-label={`${title}, ${description} ${reward}, ${index + 1} / ${BENEFITS.length}`}>
        <div className="pay-benefit-copy"><h3>{title}</h3><p>{description}</p><strong>{reward}</strong></div>
        <span className="pay-benefit-link-arrow" aria-hidden="true"><Icon name="arrow_forward" size={20} /></span>
        <Image className="pay-benefit-art" src={`/images/benefits/${art}-art.png`} alt="" width={1024} height={1024} sizes="(max-width: 767px) 164px, (max-width: 1199px) 144px, 164px" quality={90} />
      </Link>)}
    </div>
    <div className="pay-benefit-controls">
      <button type="button" onClick={() => move(-1)} disabled={view.start === 0} aria-label="이전 포인트 혜택" aria-controls="pay-benefit-track"><Icon name="chevron_left" size={22} /></button>
      <span className="pay-benefit-progress" aria-live="polite" aria-atomic="true"><span className="sr-only">총 {BENEFITS.length}개 중 </span>{view.start + 1}{view.visible > 1 ? `–${Math.min(BENEFITS.length, view.start + view.visible)}` : ''}<span aria-hidden="true"> / {BENEFITS.length}</span><span className="sr-only">번째 혜택</span></span>
      <button type="button" onClick={() => move(1)} disabled={view.start >= BENEFITS.length - view.visible} aria-label="다음 포인트 혜택" aria-controls="pay-benefit-track"><Icon name="chevron_right" size={22} /></button>
    </div>
  </div>;
}
