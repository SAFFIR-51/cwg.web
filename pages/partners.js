import { useState } from 'react';
import Seo from '../components/Seo';
import Icon from '../components/Icon';
import { Section, SectionHead, Fine, SectionNav } from '../components/ui';
import { Art } from '../components/Art';
import { PageHero, FactList, FeatureGrid } from '../components/blocks';

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
const inputCls = 'w-full rounded-xl border border-line bg-white px-4 py-3.5 text-[15px] text-ink placeholder:text-faint focus:border-blue focus:outline-none focus:ring-4 focus:ring-blue-soft';

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
    <div className="page page-partners">
      <Seo title="브랜드 파트너 문의" description="화려한 약속보다, 지금 드릴 수 있는 것부터 말씀드립니다. 풀리프 회원에게 브랜드를 전하세요." />

      <PageHero
        eyebrow="FULIF FOR BRANDS"
        title={'혜택으로 만나,\n좋아하는 브랜드로.'}
        lead={'회원에게는 기다려지는 일상을.\n브랜드에게는 새롭게 만나는 고객을.'}
        actions={<a href="#inquiry" className="btn-primary">파트너십 이야기 나누기 <Icon name="arrow_forward" size={18} /></a>}
      />

      <SectionNav label="브랜드 파트너 페이지 탐색" items={[["ad-scale", "브랜드와 만나는 방식"], ["partnership", "세 가지 약속"], ["inquiry", "파트너십 문의"]]} />

      {/* AD SCALE */}
      <Section id="ad-scale">
        <SectionHead eyebrow="AD SCALE" title={'브랜드와 회원이\n같은 편에 서는 광고.'} lead="회원이 본 광고 한 편이, 그대로 응모권과 포인트가 됩니다." />
        <FactList className="mt-10" items={[
          { value: '10', unit: '개', label: '광고 카테고리' },
          { value: '8', unit: '개', label: '광고 노출 화면' },
          { value: '1', unit: '회', label: '매월 브랜드 분석' },
          { value: '1', unit: '사', label: '카테고리당 브랜드' },
        ]} />
        <p className="partner-scale-foot">단순한 노출을 넘어, 일상의 혜택으로 만나는 브랜드.<a href="#inquiry" className="btn-link">파트너십 문의<Icon name="chevron_right" size={18} /></a></p>
      </Section>

      {/* 회원의 하루 */}
      <Section tone="gray">
        <SectionHead eyebrow="THE WAY WE CONNECT" title={'브랜드의 좋은 제품이\n누군가의 반가운 하루로.'} lead={'화려한 약속보다, 지금 함께할 수 있는 것부터.\n풀리프의 일상 속에 브랜드를 자연스럽게 연결합니다.'} />
        <FeatureGrid cols={3} className="mt-10" items={[
          { art: 'watch', tag: '01 · 발견', title: '브랜드를 발견하고', desc: '짧은 영상으로 만나는 브랜드.' },
          { art: 'ticket', tag: '02 · 참여', title: '기대하며 참여하고', desc: '경품 응모권으로 이어지는 관심.' },
          { art: 'coupon', tag: '03 · 기억', title: '반가운 혜택으로 기억해요', desc: '브랜드 제품이 경품이 되는 경험.' },
        ]} />
      </Section>

      {/* 함께하는 방식 */}
      <Section id="partnership">
        <SectionHead eyebrow="Brand Partnership" title={'브랜드 파트너와\n함께하는 방식'} lead="화려한 약속보다, 지금 드릴 수 있는 것부터 말씀드립니다." />
        <div className="partner-values">
          {[
            ['01', '카테고리마다 한 브랜드', '같은 카테고리에서는 한 브랜드와만 함께합니다. 회원의 기억에 브랜드가 온전히 남도록.', 'invite'],
            ['02', '매달 한 번, 브랜드 리포트', '회원이 브랜드를 어떻게 만났는지 매달 정리해 전해드립니다. 개인을 알아볼 수 없는 통계로만 담습니다.', 'notebook'],
            ['03', '회원이 먼저 기다리는 브랜드', '브랜드의 제품이 경품 추첨의 경품으로 소개되어, 회원이 먼저 갖고 싶어 하는 이름이 됩니다.', 'ticket'],
          ].map(([n, t, d, art]) => (
            <article key={n} className="partner-value reveal"><span>{n}</span><Art name={art} sizes="64px" /><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
      </Section>

      {/* 문의 폼 */}
      <Section tone="gray" id="inquiry">
        <div className="partner-inquiry">
          <div><SectionHead eyebrow="LET’S BUILD TOGETHER" title={'함께할 이야기를\n들려주세요.'} lead="브랜드 파트너 문의 정보를 남겨주시면 담당자가 회신드립니다." /><Fine className="mt-6">Ad &amp; Sponsorship Inquiry{'\n'}광고 · 경품 협찬 · 브랜드 파트너십</Fine></div>
          <form onSubmit={submit} noValidate className="partner-form">
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
