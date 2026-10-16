import { useEffect, useState } from 'react';

// 풀리 노트 댓글 — 로그인 없이 닉네임만 적고 바로 보인다(2026-10-17).
// 저장 · 검사(링크 · 욕설 · 도배) · 신고는 풀리프 서버가 한다(api.fulif.io /note-comments).
// 예전엔 「댓글로 들려주세요」라고 묻기만 하고 남길 곳이 없었다(QA-10).
const API = (process.env.NEXT_PUBLIC_FULIF_API_URL || 'https://api.fulif.io') + '/api/v1/note-comments';

const lines = (t) => t.split('\n').map((l, i, a) => <span key={i}>{l}{i < a.length - 1 && <br />}</span>);
const when = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
};
const reasonOf = async (res) => {
  try { const j = await res.json(); return j?.error?.reason || null; } catch { return null; }
};

export default function NoteComments({ slug, prompt }) {
  const [items, setItems] = useState(null); // null = 불러오는 중
  const [loadError, setLoadError] = useState(false);
  const [nickname, setNickname] = useState('');
  const [body, setBody] = useState('');
  const [trap, setTrap] = useState(''); // 사람 눈에는 안 보이는 칸 — 채워져 있으면 봇
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(null); // { tone: 'ok' | 'error', text }
  const [reported, setReported] = useState({});

  useEffect(() => {
    let alive = true;
    fetch(`${API}/${slug}`).then((r) => r.ok ? r.json() : Promise.reject())
      .then((j) => { if (alive) setItems(j.items || []); })
      .catch(() => { if (alive) { setItems([]); setLoadError(true); } });
    return () => { alive = false; };
  }, [slug]);

  const submit = async (e) => {
    e.preventDefault();
    if (sending) return;
    if (trap) { setBody(''); return; }
    const nick = nickname.trim(); const text = body.trim();
    if (!nick) return setMessage({ tone: 'error', text: '닉네임을 적어 주세요.' });
    if (text.length < 2) return setMessage({ tone: 'error', text: '댓글을 두 글자 이상 적어 주세요.' });
    setSending(true); setMessage(null);
    try {
      const res = await fetch(`${API}/${slug}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: nick, body: text }),
      });
      if (res.ok) {
        const c = await res.json();
        setItems((prev) => [c, ...(prev || [])]);
        setBody('');
        setMessage({ tone: 'ok', text: '댓글을 남겼어요. 고마워요!' });
      } else if (res.status === 429) {
        setMessage({ tone: 'error', text: (await reasonOf(res)) || '조금 뒤에 다시 남겨 주세요.' });
      } else {
        setMessage({ tone: 'error', text: (await reasonOf(res)) || '댓글을 남기지 못했어요. 다시 시도해 주세요.' });
      }
    } catch {
      setMessage({ tone: 'error', text: '연결이 불안정해요. 잠시 뒤 다시 시도해 주세요.' });
    } finally {
      setSending(false);
    }
  };

  const report = async (id) => {
    if (reported[id]) return;
    setReported((r) => ({ ...r, [id]: true }));
    try { await fetch(`${API}/item/${id}/report`, { method: 'POST' }); } catch { /* 다시 누를 수 있게 두지 않는다 — 한 번이면 충분하다 */ }
  };

  const count = items ? items.length : 0;
  return (
    <section className="note-comments" aria-labelledby="note-comments-title">
      <div className="note-comment">
        <small id="note-comments-title">댓글 한 줄{items && count > 0 ? ` · ${count}` : ''}</small>
        <p>{lines(prompt.q)}</p>
        <span>{prompt.sub}</span>
      </div>
      <form className="note-comment-form" onSubmit={submit} noValidate>
        <label className="sr-only" htmlFor={`nc-nick-${slug}`}>닉네임</label>
        <input id={`nc-nick-${slug}`} className="note-comment-nick" value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={20} placeholder="닉네임" autoComplete="nickname" />
        <label className="sr-only" htmlFor={`nc-body-${slug}`}>댓글</label>
        <textarea id={`nc-body-${slug}`} value={body} onChange={(e) => setBody(e.target.value)} maxLength={500} rows={3} placeholder="한 줄이면 충분해요" />
        <input className="note-comment-trap" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} name="website" />
        <div className="note-comment-actions">
          <span className="note-comment-rule">로그인 없이 남기고 바로 보여요. 링크 · 연락처 · 욕설은 남길 수 없고, 신고가 쌓이면 숨겨져요.</span>
          <span className="note-comment-len">{body.length}/500</span>
          <button type="submit" className="btn-primary" disabled={sending}>{sending ? '남기는 중…' : '댓글 남기기'}</button>
        </div>
        <p className={`note-comment-msg ${message?.tone === 'error' ? 'is-error' : ''}`} role="status" aria-live="polite">{message?.text || ''}</p>
      </form>
      {items === null ? <p className="note-comment-empty">댓글을 불러오는 중이에요…</p>
        : loadError ? <p className="note-comment-empty">댓글을 불러오지 못했어요. 잠시 뒤 다시 열어 주세요.</p>
        : count === 0 ? <p className="note-comment-empty">아직 댓글이 없어요. 첫 한 줄을 남겨 주세요.</p>
        : <ol className="note-comment-list">{items.map((c) => <li key={c.id}>
            <div><b>{c.nickname}</b><time dateTime={c.created_at}>{when(c.created_at)}</time>
              <button type="button" onClick={() => report(c.id)} disabled={!!reported[c.id]} aria-label={`${c.nickname} 님의 댓글 신고`}>{reported[c.id] ? '신고했어요' : '신고'}</button></div>
            <p>{lines(c.body)}</p>
          </li>)}</ol>}
    </section>
  );
}
