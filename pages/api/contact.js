import nodemailer from 'nodemailer';

/** POST /api/contact — 브랜드 파트너 문의 → SMTP 메일 발송 (legacy/api/contact.py 와 동일 동작) */
export default async function handler(req, res) {
  if (req.method === 'GET') return res.status(200).json({ ok: true, endpoint: 'contact', method: 'POST' });
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });

  const data = req.body || {};
  const company = String(data.company || '').trim();
  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const phone = String(data.phone || '').trim();
  const message = String(data.message || '').trim();
  if (!company || !name || !email || !data.agree) return res.status(400).json({ ok: false, error: 'missing_fields' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ ok: false, error: 'invalid_email' });

  const env = (k, d = '') => process.env[k] ?? d;
  const username = env('MAIL_USERNAME');
  const password = env('MAIL_PASSWORD').replace(/\s/g, '');
  const recipients = env('MAIL_TO', username).split(',').map((s) => s.trim()).filter(Boolean);
  if (!username || !password || recipients.length === 0) {
    console.error('[contact] MAIL_* env not configured');
    return res.status(502).json({ ok: false, error: 'send_failed' });
  }

  const transporter = nodemailer.createTransport({
    host: env('MAIL_HOST', 'smtp.gmail.com'),
    port: Number(env('MAIL_PORT', '587')),
    secure: false,
    requireTLS: env('MAIL_SMTP_STARTTLS_ENABLE', 'true') === 'true',
    auth: env('MAIL_SMTP_AUTH', 'true') === 'true' ? { user: username, pass: password } : undefined,
  });

  const subject = `[FULIF 브랜드 파트너 문의] ${company} · ${name}`;
  const text = [
    'FULIF 브랜드 파트너 문의가 접수되었습니다.',
    '───────────────────────────────',
    `회사명   : ${company}`,
    `담당자명 : ${name}`,
    `이메일   : ${email}`,
    `연락처   : ${phone || '-'}`,
    '───────────────────────────────',
    '문의 내용:',
    message || '(내용 없음)',
    '───────────────────────────────',
    '이 메일은 fulif.io/partners 문의 폼에서 자동 발송되었습니다.',
  ].join('\n');

  try {
    await transporter.sendMail({
      from: { name: env('MAIL_FROM_NAME', 'FULIF Inquiry'), address: username },
      to: recipients.join(', '),
      replyTo: email,
      subject,
      text,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contact] send failed:', err);
    return res.status(502).json({ ok: false, error: 'send_failed' });
  }
}
