// ============================================
// FULIF i18n — KOR / ENG toggle (static, no build)
// Persists choice in localStorage and applies on every page.
// ============================================
(function () {
  'use strict';

  var STORAGE_KEY = 'fulif_lang';
  function dict() { return window.FULIF_I18N_EN || {}; }
  var originals = new WeakMap(); // el -> original (KO) innerHTML
  var originalAttrs = new WeakMap(); // el -> { attr: originalValue }

  function getLang() {
    var v = null;
    try { v = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    return v === 'en' ? 'en' : 'ko';
  }
  function saveLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  // Re-create the .fill-mask overlay used by main.js for [data-fill]/.text-fill
  function refreshFill(el) {
    var old = el.querySelector('.fill-mask');
    if (old) old.remove();
    var mask = document.createElement('span');
    mask.className = 'fill-mask';
    mask.setAttribute('aria-hidden', 'true');
    mask.innerHTML = el.innerHTML;
    el.appendChild(mask);
    el.dataset.fillReady = '1';
  }
  function isFill(el) {
    return el.hasAttribute('data-fill') || el.classList.contains('text-fill');
  }

  function apply(lang) {
    // innerHTML swaps
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (!originals.has(el)) originals.set(el, el.innerHTML);
      var key = el.getAttribute('data-i18n');
      if (lang === 'en' && dict()[key] !== undefined) {
        el.innerHTML = dict()[key];
      } else {
        el.innerHTML = originals.get(el);
      }
      if (isFill(el)) refreshFill(el);
    }

    // attribute swaps: data-i18n-attr="attr:key;attr2:key2"
    var attrNodes = document.querySelectorAll('[data-i18n-attr]');
    for (var j = 0; j < attrNodes.length; j++) {
      var ael = attrNodes[j];
      var spec = ael.getAttribute('data-i18n-attr');
      var pairs = spec.split(';');
      if (!originalAttrs.has(ael)) originalAttrs.set(ael, {});
      var cache = originalAttrs.get(ael);
      for (var p = 0; p < pairs.length; p++) {
        var parts = pairs[p].split(':');
        if (parts.length < 2) continue;
        var attr = parts[0].trim();
        var akey = parts[1].trim();
        if (!(attr in cache)) cache[attr] = ael.getAttribute(attr);
        if (lang === 'en' && dict()[akey] !== undefined) {
          ael.setAttribute(attr, dict()[akey]);
        } else if (cache[attr] !== null) {
          ael.setAttribute(attr, cache[attr]);
        }
      }
    }

    document.documentElement.setAttribute('lang', lang);
    updateToggleState(lang);
    saveLang(lang);
  }

  function updateToggleState(lang) {
    var lists = document.querySelectorAll('.lang');
    for (var i = 0; i < lists.length; i++) {
      var items = lists[i].querySelectorAll('li');
      for (var k = 0; k < items.length; k++) {
        var a = items[k].querySelector('a');
        var isEn = a && /eng/i.test(a.textContent);
        var on = isEn ? lang === 'en' : lang === 'ko';
        items[k].classList.toggle('active', on);
      }
    }
  }

  function wire() {
    var links = document.querySelectorAll('.lang li a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (e) {
        e.preventDefault();
        var isEn = /eng/i.test(this.textContent);
        apply(isEn ? 'en' : 'ko');
      });
    }
    apply(getLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();
