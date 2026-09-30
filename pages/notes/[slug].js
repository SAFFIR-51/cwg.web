import Link from 'next/link';
import Seo from '../../components/Seo';
import Icon from '../../components/Icon';
import { Section, Fine, Tag } from '../../components/ui';
import { NOTES, getNote } from '../../lib/notes';
import { NoteCover } from '../../components/SubpageDesign';
import { PulliNote, ReadingProgress } from '../../components/Edition';

export async function getStaticPaths() {
  return { paths: NOTES.map((n) => ({ params: { slug: n.slug } })), fallback: false };
}
export async function getStaticProps({ params }) {
  const note = getNote(params.slug);
  const related = NOTES.filter((n) => n.slug !== note.slug).slice(0, 2);
  return { props: { note, related } };
}

export default function NoteDetail({ note, related }) {
  const isSeries = note.category === 'series';
  return (
    <div className="product-page journal-detail">
      <Seo title={note.title} description={note.summary} />
      <ReadingProgress />
      <article className="bg-white">
        <div className="journal-detail-inner">
          <Link href="/notes" className="inline-flex items-center gap-1 text-[14px] font-semibold text-muted hover:text-ink"><Icon name="chevron_left" size={20} />풀리 노트</Link>
          <p className="eyebrow mt-6">{note.categoryLabel}</p>
          <h1>{note.title}</h1>
          <div className="journal-author">
            <img src="/mascot/pulli-profile-v2.png" alt="" className="h-9 w-9 rounded-full bg-panel object-contain" />
            <span>풀리 · {note.date} · {note.minutes}분</span>
          </div>

          <NoteCover note={note} />
          <p className="journal-sample-note">풀리 노트의 형식을 보여드리는 미리보기예요. 정식 원고와 발행 일정은 공개 시 확정됩니다.</p>
          <div className="journal-body">
            {note.body.length > 0 ? note.body.map((p, i) => <p key={i}>{p}</p>) : (
              <div className="rounded-2xl bg-panel p-10 text-center">
                <img src="/mascot/clover_hello.png" alt="" className="mx-auto h-20 w-20 object-contain" />
                <p className="mt-4 text-[17px] font-bold">풀리가 열심히 적고 있어요</p>
                <p className="mt-1 text-[14px] text-muted">곧 본문이 올라와요.</p>
              </div>
            )}
          </div>

          {isSeries && (
            <PulliNote className="mt-10">끝난 줄 알았던 한 장에도,<br />아직 이야기가 남아 있어요.</PulliNote>
          )}
          <Fine className="mt-8">번호 기능은 번호를 고르는 재미를 위한 것으로, 당첨 확률을 높여주지 않아요.</Fine>
        </div>
      </article>

      <Section tone="gray">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-[20px] font-bold">이 노트와 함께 보면 좋아요</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {isSeries && (
              <div className="rounded-2xl bg-white p-6 opacity-70">
                <Tag tone="gray">2편</Tag>
                <p className="mt-3 text-[17px] font-bold">다음 이야기를 준비하고 있어요</p>
                <p className="mt-1 text-[13px] text-muted">공개 예정</p>
              </div>
            )}
            {related.slice(0, isSeries ? 1 : 2).map((r) => (
              <Link key={r.slug} href={`/notes/${r.slug}`} className="rounded-2xl bg-white p-6 transition-shadow hover:shadow-[0_8px_30px_rgba(25,31,40,0.08)]">
                <Tag>{r.categoryLabel}</Tag>
                <p className="mt-3 text-[17px] font-bold leading-snug">{r.title}</p>
                <p className="mt-1 text-[13px] text-muted">{r.date} · {r.minutes}분</p>
              </Link>
            ))}
          </div>
          <p className="mt-10 text-center text-[15px] font-semibold text-blue">Have a Fuli Day!</p>
        </div>
      </Section>
    </div>
  );
}
