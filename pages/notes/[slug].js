import Link from 'next/link';
import Seo from '../../components/Seo';
import { NOTES, getNote, seriesStatus, kstToday, NUMBER_NOTICE } from '../../lib/notes';
import { ReadingProgress } from '../../components/Edition';
import { NoteCover } from '../../components/SubpageDesign';
import { NoteHero, NoteBlock, FuliNotes, FuliSays, Related } from '../../components/NoteBlocks';
import NoteComments from '../../components/NoteComments';

export async function getStaticPaths() {
  return { paths: NOTES.map((n) => ({ params: { slug: n.slug } })), fallback: false };
}

// 함께 보면 좋아요: 연재 편은 공개일이 지나야 링크(ISR 로 한 시간마다 다시 계산)
function resolveRelated(note, today) {
  const episodes = seriesStatus(today);
  const items = note.related || NOTES.filter((n) => n.slug !== note.slug && n.category !== 'series' && n.body?.length !== 0).slice(0, 2).map((n) => ({ label: n.categoryLabel, slug: n.slug }));
  return items.map((it) => {
    if (it.episode) {
      const ep = episodes.find((e) => e.n === it.episode);
      return { label: it.label, title: ep.title, href: ep.open ? `/notes/${ep.slug}` : null, status: ep.open ? null : ep.openOnDot };
    }
    if (it.slug) {
      const n = getNote(it.slug);
      return { label: it.label, title: n.title.replace(/\n/g, ' '), href: `/notes/${n.slug}`, status: null };
    }
    return { label: it.label, title: it.title, href: null, status: null };
  });
}

export async function getStaticProps({ params }) {
  const note = getNote(params.slug);
  const related = resolveRelated(note, kstToday());
  return { props: { note, related }, revalidate: 3600 };
}

const CATEGORY_TONE = { series: 'is-series', howto: 'is-howto', news: 'is-news', onemore: 'is-onemore', life: 'is-life' };

export default function NoteDetail({ note, related }) {
  const plainTitle = note.title.replace(/\n/g, ' ');
  return (
    <div className={`product-page journal-detail note-v3 ${note.theme ? `note-theme-${note.theme}` : ''}`}>
      <Seo title={plainTitle} description={note.subtitle || note.summary || plainTitle} />
      <ReadingProgress />
      <article>
        <div className="note-inner">
          <p className="note-crumb"><Link href="/notes">풀리 노트</Link> › {note.crumb || note.categoryLabel}</p>
          {/* ① 라벨 */}
          <p className={`note-label ${CATEGORY_TONE[note.category] || ''}`}>{note.categoryLabel}</p>
          {/* ② 제목 · 부제 */}
          <h1>{note.title}</h1>
          {note.subtitle && <p className="note-subtitle">{note.subtitle}</p>}
          {/* ③ 풀리 · 날짜 · 읽는 시간 */}
          <div className="note-byline"><img src="/mascot/clover_hello.png" alt="" /><span>풀리 · {note.date} · {note.minutes}분</span></div>
          {/* ④ 대표 그림 */}
          {note.hero ? <NoteHero hero={note.hero} /> : <NoteCover note={note} className="note-cover-legacy" />}
          {/* ⑤ 본문 */}
          <div className="note-body">
            {note.sections ? note.sections.map((s, i) => <section key={s.title}><h2><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</h2>{s.blocks.map((b, j) => <NoteBlock key={j} b={b} />)}</section>)
              : note.body.length > 0 ? note.body.map((p, i) => <p key={i}>{p}</p>) : (
                <div className="note-pending"><img src="/mascot/clover_hello.png" alt="" /><p>풀리가 열심히 적고 있어요</p><small>곧 본문이 올라와요.</small></div>
              )}
            {note.numberStory && <p className="note-number-notice">{NUMBER_NOTICE}</p>}
          </div>
          {/* ⑥ ~ ⑧ */}
          {note.fuliNotes && <FuliNotes data={note.fuliNotes} />}
          {note.fuliSays && <FuliSays text={note.fuliSays} />}
          {note.comment && <NoteComments key={note.slug} slug={note.slug} prompt={note.comment} />}
          {/* ⑨ 함께 보면 좋아요 */}
          {related.length > 0 && <Related items={related} />}
          {/* 출처(참고) — 글 맨 끝(10-21 추가 글 2편) */}
          {note.sources && <p className="note-sources">{note.sources}</p>}
          <p className="note-signoff">Have a Fuli Day!</p>
        </div>
      </article>
    </div>
  );
}
