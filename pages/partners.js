import { useState } from 'react';
import Seo from '../components/Seo';
import Icon from '../components/Icon';
import { Section, SectionHead } from '../components/ui';
import { Art } from '../components/SubpageDesign';
import { PartnerOpening } from '../components/PageScenes';

const MSG = {
  sending: '전송 중…',
  ok: '문의가 접수되었습니다. 곧 연락드리겠습니다.',
  fail: '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.',
  missing: '필수 항목과 동의를 확인해 주세요.',
};

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[14px] font-bold text-ink">{label}{required && <span className="ml-0.5 text-blue">*</span>}</span>
      {children}
    </label>
  );
}
const inputCls = 'w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-[15px] text-ink placeholder:text-faint focus:border-blue focus:outline-none focus:ring-4 focus:ring-blue-soft';

export default function Partners() {
  const [form, setForm] = useState({ company: '', name: '', email: '', phone: '', message: '', agree: false });
  const [status, setStatus] = useState(null); // {kind, text}
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  async function submit(e) {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    if (!form.company.trim() || !form.name.trim() || !form.email.trim() || !form.agree) { setStatus({ kind: 'fail', text: MSG.missing }); return; }
    setBusy(true); setStatus({ kind: 'info', text: MSG.sending });
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const out = await res.json().catch(() => ({ ok: res.ok }));
      if (out && out.ok) { setStatus({ kind: 'ok', text: MSG.ok }); setForm({ company: '', name: '', email: '', phone: '', message: '', agree: false }); }
      else setStatus({ kind: 'fail', text: MSG.fail });
    } catch { setStatus({ kind: 'fail', text: MSG.fail }); }
    finally { setBusy(false); }
  }

  return (
    <div className="product-page partner-product">
      <Seo title="브랜드 파트너 문의" description="화려한 약속보다, 지금 드릴 수 있는 것부터 말씀드립니다. 풀리프 회원에게 브랜드를 전하세요." />

      {/* ① 첫 화면 */}
      <PartnerOpening />

      {/* ② 브랜드 파트너와 함께하는 방식 */}
      <Section id="partnership" className="partner-promises-section">
        <SectionHead eyebrow="Brand Partnership" title={'브랜드 파트너와\n함께하는 방식'} lead="화려한 약속보다, 지금 드릴 수 있는 것부터 말씀드립니다." />
        <div className="partner-value-grid">
          {[
            ['01', '카테고리마다 한 브랜드', '같은 카테고리에서는 한 브랜드와만 함께합니다. 회원의 기억에 브랜드가 온전히 남도록.', 'invite'],
            ['02', '매달 한 번, 브랜드 리포트', '회원이 브랜드를 어떻게 만났는지 매달 정리해 전해드립니다. 개인을 알아볼 수 없는 통계로만 담습니다.', 'notebook'],
            ['03', '회원이 먼저 기다리는 브랜드', '브랜드의 제품이 경품 추첨의 경품으로 소개되어, 회원이 먼저 갖고 싶어 하는 이름이 됩니다.', 'ticket'],
          ].map(([n, t, d, art]) => (
            <article key={n} className="partner-value reveal"><span>{n}</span><Art name={art} sizes="160px" /><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
      </Section>

      {/* ③ 브랜드 파트너 문의 폼 */}
      <Section tone="gray" id="inquiry" className="partner-inquiry">
        <div className="mx-auto max-w-2xl">
          <div><SectionHead eyebrow="LET’S BUILD TOGETHER" title="브랜드 파트너 문의" lead="아래 정보를 남겨주시면 담당자가 회신드립니다." /></div>
          <form onSubmit={submit} noValidate className="mt-10 space-y-5 rounded-3xl bg-white p-6 md:p-10">
            <div className="partner-form-fields">
            <Field label="회사명" required><input className={inputCls} name="company" value={form.company} onChange={set('company')} placeholder="회사명을 입력해주세요" required autoComplete="organization" /></Field>
            <Field label="담당자명" required><input className={inputCls} name="name" value={form.name} onChange={set('name')} placeholder="이름" required autoComplete="name" /></Field>
            <Field label="이메일" required><input className={inputCls} type="email" name="email" value={form.email} onChange={set('email')} placeholder="email@company.com" required autoComplete="email" /></Field>
            <Field label="연락처"><input className={inputCls} type="tel" name="phone" value={form.phone} onChange={set('phone')} placeholder="010-0000-0000" autoComplete="tel" /></Field>
            <Field label="문의 내용"><textarea className={`${inputCls} min-h-[140px] resize-y`} name="message" value={form.message} onChange={set('message')} placeholder="문의 사항을 자유롭게 작성해주세요" /></Field>
            </div>

            <div className="rounded-2xl bg-panel p-5 text-[14px] leading-relaxed">
              <p className="font-bold text-ink">개인정보 수집 · 이용 안내</p>
              <p className="mt-2 text-sub"><span className="font-semibold text-blue">수집 항목</span> · 회사명, 담당자명, 이메일, 연락처, 문의 내용</p>
              <p className="text-sub"><span className="font-semibold text-blue">수집 목적</span> · 브랜드 파트너 문의 응대 및 상담</p>
              <p className="text-sub"><span className="font-semibold text-blue">보유 기간</span> · 문의 응대 완료 후 1년</p>
            </div>
            <label className="flex cursor-pointer items-center gap-3 text-[15px] font-medium">
              <input type="checkbox" checked={form.agree} onChange={set('agree')} className="h-5 w-5 rounded border-line accent-blue" required />
              개인정보 수집 · 이용에 동의합니다 (필수)
            </label>

            <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">{busy ? MSG.sending : '문의 보내기'}</button>
            {status && (
              <p role="status" aria-live="polite" className={`rounded-2xl px-4 py-3 text-center text-[14px] font-semibold ${status.kind === 'ok' ? 'bg-green-soft text-green' : status.kind === 'fail' ? 'bg-red-soft text-red' : 'bg-panel text-sub'}`}>{status.text}</p>
            )}
          </form>
        </div>
      </Section>
    </div>
  );
}
