// ============================================
// FULIF ad-partner inquiry form -> POST /api/contact (SMTP email)
// ============================================
(function () {
  'use strict';

  var MSG = {
    sending: { ko: '전송 중…', en: 'Sending…' },
    ok: { ko: '문의가 접수되었습니다. 곧 연락드리겠습니다.', en: 'Your inquiry has been received. We\'ll be in touch soon.' },
    fail: { ko: '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', en: 'Sending failed. Please try again in a moment.' },
    missing: { ko: '필수 항목과 동의를 확인해 주세요.', en: 'Please complete the required fields and consent.' }
  };

  function lang() {
    try { return localStorage.getItem('fulif_lang') === 'en' ? 'en' : 'ko'; } catch (e) { return 'ko'; }
  }
  function t(key) { return MSG[key][lang()]; }

  function init() {
    var form = document.querySelector('.partners-form');
    if (!form) return;
    // Drop the placeholder inline handler (alert) in favour of real submit.
    form.setAttribute('onsubmit', 'return false;');

    var btn = form.querySelector('button[type="submit"]');
    var btnLabel = btn ? btn.querySelector('span') : null;

    var status = document.createElement('p');
    status.className = 'form-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.style.display = 'none';
    form.appendChild(status);

    function setStatus(kind, key) {
      status.textContent = t(key);
      status.dataset.kind = kind; // 'ok' | 'fail' | 'info'
      status.style.display = '';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var data = {
        company: (form.company && form.company.value || '').trim(),
        name: (form.name && form.name.value || '').trim(),
        email: (form.email && form.email.value || '').trim(),
        phone: (form.phone && form.phone.value || '').trim(),
        message: (form.message && form.message.value || '').trim(),
        agree: !!(form.agree && form.agree.checked)
      };

      if (!data.company || !data.name || !data.email || !data.agree) {
        setStatus('fail', 'missing');
        return;
      }

      // Capture the current (language-correct) label so we can restore it after.
      var prevLabel = btnLabel ? btnLabel.innerHTML : '';
      if (btn) btn.disabled = true;
      if (btnLabel) btnLabel.textContent = t('sending');
      setStatus('info', 'sending');

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json().catch(function () { return { ok: res.ok }; }); })
        .then(function (out) {
          if (out && out.ok) {
            setStatus('ok', 'ok');
            form.reset();
          } else {
            setStatus('fail', 'fail');
          }
        })
        .catch(function () { setStatus('fail', 'fail'); })
        .then(function () {
          if (btn) btn.disabled = false;
          if (btnLabel) btnLabel.innerHTML = prevLabel;
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
