import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

// Native document scrolling: copy is always present, never gated behind a tab.
// Small screens, short windows, reduced motion and no-JS all get the complete story.
const STICKY_MEDIA = '(min-width: 900px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)';

export default function ScrollStory({ id, items, className = '' }) {
  const root = useRef(null);
  const chapters = useRef([]);
  const [active, setActive] = useState(0);
  // CSS handles viewport/motion eligibility before hydration, avoiding anchor jumps.
  const [enhanced, setEnhanced] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(STICKY_MEDIA);
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!media.matches || !root.current) return;
      const top = parseFloat(getComputedStyle(root.current).getPropertyValue('--story-top')) || 104;
      const readingLine = top + (window.innerHeight - top) / 2;
      let closest = 0;
      let distance = Infinity;
      chapters.current.forEach((chapter, index) => {
        if (!chapter) return;
        const rect = chapter.getBoundingClientRect();
        const nextDistance = Math.abs(rect.top + rect.height / 2 - readingLine);
        if (nextDistance < distance) { distance = nextDistance; closest = index; }
      });
      setActive(closest);
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    const syncMedia = () => { setEnhanced(media.matches); request(); };
    const resize = new ResizeObserver(request);
    resize.observe(root.current);
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    window.addEventListener('pageshow', request);
    media.addEventListener('change', syncMedia);
    syncMedia();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      window.removeEventListener('pageshow', request);
      media.removeEventListener('change', syncMedia);
    };
  }, [items.length]);

  return <div ref={root} className={`scroll-story ${className}`} data-scroll-story={id} data-enhanced={enhanced} data-active-step={active}>
    <noscript><style>{'.scroll-story[data-enhanced=true]{display:block}.scroll-story[data-enhanced=true] .scroll-story-stage{display:none}.scroll-story[data-enhanced=true] .scroll-story-mobile-visual{display:block;height:480px}.scroll-story[data-enhanced=true] .scroll-story-step{display:block;min-height:0}'}</style></noscript>
    <div className="scroll-story-stage" aria-hidden="true" inert>
      <div className="scroll-story-visuals">{items.map((item, index) => <div key={item.key} className="scroll-story-layer" data-active={index === active}>{item.visual}</div>)}</div>
      <div className="scroll-story-progress"><span>{items[active].label}</span><div>{items.map((item, index) => <i key={item.key} data-past={index <= active} />)}</div><small>0{active + 1} / 0{items.length}</small></div>
      <p className="scroll-story-hint"><Icon name="arrow_downward" size={14} />스크롤하며 둘러보세요</p>
    </div>
    <div className="scroll-story-chapters">{items.map((item, index) => <article key={item.key} id={`${id}-${item.key}`} ref={el => { chapters.current[index] = el; }} className="scroll-story-step" aria-labelledby={`${id}-${item.key}-label`} data-active={index === active}>
      <div className="scroll-story-copy"><p className="scroll-story-step-label" id={`${id}-${item.key}-label`}><span>0{index + 1}</span>{item.label}</p>{item.content}</div>
      <div className="scroll-story-mobile-visual" aria-hidden="true" inert>{item.visual}</div>
    </article>)}</div>
  </div>;
}
