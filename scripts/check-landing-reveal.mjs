import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = (await readFile(new URL('../components/useLandingReveal.js', import.meta.url), 'utf8'))
  .replace(/import \{ useEffect \} from 'react';/, '')
  .replace('export default function', 'function');

function run({ reduced = false, supported = true, hash = '' } = {}) {
  const listeners = new Map();
  const preferenceListeners = new Map();
  const focusListeners = new Map();
  const observers = [];
  let cleanup;
  function element(parent = null, bottom = 1000, grouped = false) {
    const classes = new Set();
    return {
      classes, parent, grouped,
      classList: { add: (...names) => names.forEach(n => classes.add(n)), remove: (...names) => names.forEach(n => classes.delete(n)) },
      closest() { return this.grouped ? this : this.parent?.closest() || null; },
      contains(target) { return target === this || Boolean(target?.parent && this.contains(target.parent)); },
      getBoundingClientRect() { return { bottom }; },
    };
  }
  const overview = element();
  const media = element(overview);
  const copy = element(overview);
  const card = element(null, 1800, true);
  const nestedCopy = element(card);
  const previous = element(null, -50);
  const nodes = [media, copy, card, nestedCopy, previous];
  const preference = {
    matches: reduced,
    addEventListener: (name, fn) => preferenceListeners.set(name, fn),
    removeEventListener: name => preferenceListeners.delete(name),
  };
  const container = {
    querySelectorAll: () => nodes,
    contains: () => true,
    addEventListener: (name, fn) => focusListeners.set(name, fn),
    removeEventListener: name => focusListeners.delete(name),
  };
  class Observer {
    constructor(callback, options) { this.callback = callback; this.options = options; this.targets = new Set(); observers.push(this); }
    observe(target) { this.targets.add(target); }
    unobserve(target) { this.targets.delete(target); }
    disconnect() { this.targets.clear(); }
  }
  const window = {
    innerHeight: 1000,
    IntersectionObserver: supported ? Observer : undefined,
    matchMedia: () => preference,
    location: { hash },
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: name => listeners.delete(name),
  };
  const document = { activeElement: null, getElementById: id => id === 'services' ? overview : null };
  vm.runInNewContext(source + '\nuseLandingReveal({ current: container });', {
    useEffect: fn => { cleanup = fn(); },
    container, window, document,
    IntersectionObserver: Observer, requestAnimationFrame: fn => { fn(); return 1; }, cancelAnimationFrame() {},
  });
  return { media, copy, card, nestedCopy, previous, observers, preference, preferenceListeners, focusListeners, listeners, cleanup, document };
}

const normal = run();
assert.equal(normal.observers[0].options.rootMargin, '-120px 0px -180px 0px');
assert.equal(normal.observers[0].options.threshold, 0);
assert.ok(normal.card.classes.has('pay-will-enter') && !normal.card.classes.has('pay-visible'));
assert.ok(!normal.nestedCopy.classes.has('pay-will-enter'), 'Nested copy must reveal with its card');
assert.ok(normal.observers[0].targets.has(normal.previous), 'Earlier content is observed for upward re-entry');
normal.observers[0].callback([{ target: normal.media, isIntersecting: true }]);
assert.ok(normal.media.classes.has('pay-visible'));
assert.ok(normal.observers[0].targets.has(normal.media), 'Keep observing after a reveal');
normal.observers[0].callback([{ target: normal.media, isIntersecting: false, boundingClientRect: { bottom: 100 }, rootBounds: { top: 120 } }]);
assert.ok(!normal.media.classes.has('pay-visible') && normal.media.classes.has('pay-above'), 'Fade out above the viewport');
normal.observers[0].callback([{ target: normal.media, isIntersecting: true }]);
assert.ok(normal.media.classes.has('pay-visible'), 'Reveal again when scrolling upward');
normal.observers[0].callback([{ target: normal.media, isIntersecting: false, boundingClientRect: { bottom: 1100 }, rootBounds: { top: 120 } }]);
assert.ok(!normal.media.classes.has('pay-visible') && !normal.media.classes.has('pay-above'), 'Fade out below the viewport');
normal.observers[0].callback([{ target: normal.media, isIntersecting: true }]);
assert.ok(normal.media.classes.has('pay-visible'), 'Reveal again when scrolling downward');
normal.document.activeElement = normal.nestedCopy;
normal.focusListeners.get('focusin')({ target: normal.nestedCopy });
assert.ok(normal.card.classes.has('pay-visible'), 'Keyboard focus reveals its whole card');
normal.observers[0].callback([{ target: normal.card, isIntersecting: false, boundingClientRect: { bottom: 1800 }, rootBounds: { top: 120 } }]);
assert.ok(normal.card.classes.has('pay-visible'), 'Never hide the focused control');
normal.document.activeElement = null;
normal.focusListeners.get('focusout')();
assert.ok(!normal.card.classes.has('pay-visible'), 'Resume scroll visibility after focus leaves');
normal.preference.matches = true;
normal.preferenceListeners.get('change')();
assert.ok(normal.copy.classes.has('pay-visible') && !normal.copy.classes.has('pay-will-enter'));
normal.cleanup();
assert.equal(normal.listeners.size + normal.focusListeners.size + normal.preferenceListeners.size, 0);
assert.equal(normal.media.classes.size, 0);
const anchored = run({ hash: '#services' });
assert.ok(anchored.media.classes.has('pay-visible') && anchored.copy.classes.has('pay-visible'));
assert.ok(!anchored.card.classes.has('pay-visible'), 'Deep links must not reveal unrelated later cards');
anchored.cleanup();
const reduced = run({ reduced: true });
assert.ok(reduced.card.classes.has('pay-visible') && !reduced.card.classes.has('pay-will-enter'));
reduced.cleanup();
const fallback = run({ supported: false });
assert.equal(fallback.card.classes.size, 0, 'Missing observers must leave content visible');
const motionStyles = await readFile(new URL('../styles/pay-landing-motion.css', import.meta.url), 'utf8');
assert.ok(!/min-height|padding|margin\s*:/.test(motionStyles.replace(/\/\*[\s\S]*?\*\//g, '')), 'Animation styles must not add spacing');
console.log('Landing reveal: both scroll directions, repeated reveals, unchanged spacing, grouping, deep links, focus, reduced motion, fallback, and cleanup passed.');
