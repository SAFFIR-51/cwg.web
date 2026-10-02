import { useEffect } from 'react';

// Repeat reveals from either edge of the viewport, without changing layout or scrolling.
export default function useLandingReveal(root) {
  useEffect(() => {
    const container = root.current;
    if (!container || !window.IntersectionObserver) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const grouped = '.pay-pair-column, .pay-join-banner';
    const elements = [...container.querySelectorAll(
      `${grouped}, .pay-wide > .pay-media, .pay-membership-card, .pay-pulli-art, .pay-enter`
    )].filter(element => {
      const group = element.closest(grouped);
      return !group || group === element;
    });
    const intersections = new Map();
    let observer;
    let resizeFrame = 0;
    let blurFrame = 0;

    const reveal = element => {
      element.classList.add('pay-visible');
    };
    const hide = (element, above) => {
      if (element.contains(document.activeElement)) return;
      if (above) element.classList.add('pay-above');
      else element.classList.remove('pay-above');
      element.classList.remove('pay-visible');
    };
    const revealAnchor = () => {
      let id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      if (!id) return;
      const anchor = document.getElementById(id);
      if (!anchor || !container.contains(anchor)) return;
      elements.forEach(element => {
        if (anchor.contains(element) || element.contains(anchor)) reveal(element);
      });
    };
    const observe = () => {
      observer?.disconnect();
      if (preference.matches) {
        elements.forEach(element => {
          element.classList.remove('pay-will-enter');
          reveal(element);
        });
        return;
      }
      // Pixel margins stay proportional to viewport height on ultrawide screens.
      const topInset = Math.max(84, Math.round(window.innerHeight * .12));
      const bottomInset = Math.round(window.innerHeight * .18);
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          intersections.set(entry.target, entry.isIntersecting);
          if (entry.isIntersecting) reveal(entry.target);
          else hide(entry.target, entry.boundingClientRect.bottom <= (entry.rootBounds?.top ?? topInset));
        });
      }, { rootMargin: `-${topInset}px 0px -${bottomInset}px 0px`, threshold: 0 });
      elements.forEach(element => {
        element.classList.add('pay-will-enter');
        observer.observe(element);
      });
      revealAnchor();
    };
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(observe);
    };
    const onFocus = event => {
      elements.forEach(element => {
        if (element.contains(event.target)) reveal(element);
      });
    };
    const onBlur = () => {
      cancelAnimationFrame(blurFrame);
      blurFrame = requestAnimationFrame(() => {
        if (preference.matches) return;
        elements.forEach(element => {
          if (intersections.get(element) === false) {
            hide(element, element.getBoundingClientRect().bottom <= Math.max(84, window.innerHeight * .12));
          }
        });
      });
    };

    observe();
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('hashchange', revealAnchor);
    preference.addEventListener('change', observe);
    container.addEventListener('focusin', onFocus);
    container.addEventListener('focusout', onBlur);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(resizeFrame);
      cancelAnimationFrame(blurFrame);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('hashchange', revealAnchor);
      preference.removeEventListener('change', observe);
      container.removeEventListener('focusin', onFocus);
      container.removeEventListener('focusout', onBlur);
      elements.forEach(element => element.classList.remove('pay-will-enter', 'pay-visible', 'pay-above'));
    };
  }, [root]);
}
