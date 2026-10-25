import Link from 'next/link';
import { useEffect, useState } from 'react';
import Seo from '../components/Seo';
import StoreBadges from '../components/StoreBadges';
import { Section, SectionHead, Steps, StatGrid, Rows, Note, Fine, Phone } from '../components/ui';
import { Art, ClosingCTA } from '../components/SubpageDesign';
import { ServiceOpening } from '../components/PageScenes';
import { WeekWithFulif, OneMoreCriteria, EntryCells, VoteCard, PlaygroundTiles } from '../components/FullLifeBlocks';

// 컴팩트 최종본 v3(2026-10-14): 칩을 누르면 해당 섹션으로
const CHIPS = [
  ['#one-more', 'ONE MORE'], ['#number-one-more', '낙첨 ONE MORE'], ['#vote', '오늘의 한 표'], ['#playground', '놀이터'], ['#points', '포인트'],
];

// 10-21 수정 목업: ONE MORE 는 큰 그림 대신 쿠폰 · 티켓 아이콘 카드, 오늘의 한 표는 질문 카드 하나.
// 낙첨 ONE MORE 앱 화면은 그대로 두되 작게(.fl-shot-small).
function Feature({ id, eyebrow, title, lead, steps, stats, fine, shot, note, children, art, after, criteria }) {
  return (
    <Section id={id} className={`feature-section feature-${id} scroll-mt-40`}>
      <div className={`grid gap-10 md:items-start ${id === 'one-more' ? 'fl-one-col' : 'md:grid-cols-2'}`}>
        <div>
          <SectionHead eyebrow={eyebrow} title={title} lead={lead} />
          {criteria && <div className="mt-6">{criteria}</div>}
          {children}
          {steps && <Steps className="mt-6" items={steps} />}
          {after}
          {stats && <StatGrid className="mt-6 [&>div]:!bg-panel" items={stats} />}
          {note && <Note className="mt-4" title={note.title}>{note.body}</Note>}
          {fine && <Fine className="mt-4">{fine}</Fine>}
        </div>
        {id === 'one-more' ? null : id === 'vote' ? <VoteCard /> : shot && (
          <div className="feature-stage fl-shot-small reveal">
            <small>{eyebrow}</small>
            <Art name={art} />
            <Phone src={shot} alt={`${eyebrow} 화면`} className="translate-y-4" />
          </div>
        )}
      </div>
    </Section>
  );
}

export default function FullLife() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(`#${entry.target.id}`); });
    }, { rootMargin: '-25% 0px -55% 0px' });
    CHIPS.forEach(([href]) => { const el = document.querySelector(href); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return (
    <div className="product-page service-product">
      <Seo title="Full Life" description="쿠폰부터 경품 추첨, 놀이터까지. 풀리프 앱에서 할 수 있는 모든 것을 한 번에 보여드려요." />

      {/* ① 첫 화면 */}
      <ServiceOpening />
      <nav className="service-nav" aria-label="Full Life 기능 바로가기"><div className="container">{CHIPS.map(([href, label]) => <a key={href} href={href} className={active === href ? 'active' : ''} aria-current={active === href ? 'location' : undefined}>{label}</a>)}</div></nav>

      {/* ② 풀리프의 일주일(10-21 신규 — 「어느 하루」 시간대 카드 5장 · 「건너뛰기」 링크를 대신한다) */}
      <Section tone="gray" id="a-week">
        <SectionHead eyebrow="A WEEK WITH FULIF" title={'매일 조금,\n목요일엔 추첨'} lead="출석과 한 표는 매일, 낙첨 번호는 토요일 밤부터, 경품 추첨은 목요일 저녁이에요." />
        <WeekWithFulif />
      </Section>

      {/* ③ ONE MORE · 쿠폰 기부 */}
      <Feature
        id="one-more" art="coupon" eyebrow="ONE MORE" title={'내 쿠폰 · 내 티켓,\n한 번 더 쓰기'}
        lead="카톡이나 문자로 받은 쿠폰, 다녀온 공연 · 영화 · 여행 티켓, 주유 영수증까지. 흩어진 것들을 보관함 한곳에 모아요."
        steps={[
          { desc: '쿠폰은 캡처나 공유 버튼으로, 티켓과 주유 영수증은 사진으로 등록해요. 무엇인지는 AI가 알아서 정리해요.' },
          { desc: '등록할 때마다 응모 기회가 한 칸씩, 다섯 칸이 차면 응모권 1개가 돼요.' },
          { desc: '만료 전에 알려드리고, 다 쓴 쿠폰은 사용완료로 바꾸면 포인트를 드려요.' },
        ]}
        after={<EntryCells />}
        criteria={<OneMoreCriteria />}
        stats={[
          { label: '경품 추첨', value: '매달 마지막\n목요일 20:30' }, { label: '티켓 · 주유 영수증', value: '이용한 날부터\n7일 안' },
          { label: '주유 영수증', value: '1장마다 1칸 · 한 주에 3장까지' }, { label: '쿠폰', value: '만료 전 알림' },
        ]}
        fine="주유 영수증은 날짜 · 주유소 · 유종 같은 정보만 읽고, 카드번호 · 결제 정보 · 차량번호는 저장하지 않아요."
        shot="/screens/one-more-v1026.png"
      />
      <Section id="donate" className="v3-donate-section">
        <div className="v3-donate fl-donate reveal">
          <img src="/mascot/v3/fuli-heart.jpg" alt="하트를 안은 풀리" width={270} height={245} loading="lazy" />
          <div><h3>쿠폰 한 장으로, 아이에게 기쁜 하루를</h3><p>쓰기 어려운 금액권은 응원이 필요한 우리 곁의 아이들에게 선물할 수 있어요. 고마운 마음을 담아 포인트와 기부천사 배지를 드려요.</p></div>
        </div>
      </Section>

      {/* ④ 낙첨 ONE MORE · 경품 추첨 */}
      <Feature
        id="number-one-more" art="number" eyebrow="낙첨 ONE MORE" title={'아쉬운 내 번호,\n이번 주를 한 번 더'}
        lead="지난 회차에 아쉽게 끝난 번호가, 브랜드 파트너의 경품 응모권으로 돌아와요."
        steps={[
          { desc: 'QR과 사진으로 낙첨 번호를 등록해요. 온라인 · 모바일로 구매한 번호는 직접 입력할 수 있어요.' },
          { desc: '번호 1세트마다 브랜드 파트너 5초를 보면 응모권 1개.' },
          { desc: '매주 목요일 20:30 경품 추첨. 당첨된 경품은 보관함에 넣어드려요.' },
        ]}
        stats={[
          { label: '등록 마감', value: '목요일 20:00' }, { label: '경품 추첨', value: '목요일 20:30' },
          { label: 'FULIF', value: '5세트까지' }, { label: 'FULIF+', value: '20세트까지' },
        ]}
        note={{ title: '모든 응모권은 같은 확률이에요', body: 'FULIF든 FULIF+든, 응모권 1개의 가치는 같아요. FULIF+는 한 회차에 더 많은 세트를 등록할 수 있어요.' }}
        shot="/screens/number-one-more.png"
      />

      {/* ⑤ 오늘의 한 표 */}
      <Feature
        id="vote" art="vote" eyebrow="오늘의 한 표" title={'정답은 없어요,\n오늘의 생각만 있을 뿐'}
        lead="요즘 내 삶의 BGM은? 같은 가벼운 질문이 하루 세 개씩 올라와요. 세 질문에 모두 답하면 포인트를 드려요."
        shot="/screens/today-vote.png"
      />

      {/* ⑥ 풀리프 놀이터 */}
      <Section id="playground" tone="gray" className="scroll-mt-20">
        <SectionHead eyebrow="풀리프 놀이터" title={'게임도 하고,\n번호도 만들고'} />
        <PlaygroundTiles />
        <Fine className="mt-5">번호 기능은 번호를 고르는 재미를 위한 것으로, 당첨 확률을 높여주지 않아요.<br />넘버 센스 파워는 매일 06:00 · 18:00에 채워져요.</Fine>
      </Section>

      {/* ⑦ 포인트 */}
      <Section id="points" className="scroll-mt-20">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div className="service-points-intro"><SectionHead eyebrow="포인트" title={'매일 조금씩,\n쌓이는 즐거움'} /><Art name="points" sizes="280px" /></div>
          <div>
            <div className="reveal rounded-2xl bg-panel px-6">
              {/* 10-21: 항목별 숫자는 앱 포인트 안내로 — 여기선 언제 쌓이는지만 */}
              <Rows items={[
                { label: '오늘의 광고 보기', value: 'FULIF 하루 5회 · FULIF+ 하루 10회' },
                { label: '출석체크', value: '매일 한 번 · 7일 다 채우면 토요일에 더' },
                { label: '오늘의 한 표', value: '세 질문에 모두 답하면' },
                { label: '티켓 등록 · 쿠폰 사용완료', value: '할 때마다' },
                { label: '쿠폰 기부', value: '기부할 때마다' },
                { label: '넘버 센스 · 브랜드 센스', value: '성공한 단계만큼' },
                { label: '친구 초대', value: '친구가 첫 낙첨 번호를 등록하면' },
              ]} />
            </div>
            <Fine className="mt-3">항목별 포인트는 앱의 포인트 안내에서 확인할 수 있어요. 포인트로 누릴 수 있는 혜택은 계속 늘려갈게요.</Fine>
            <Note className="mt-4" title="포인트는 이렇게 지켜져요">앱 안의 다양한 활동으로 쌓이고, 「교환 데이」에 브랜드 파트너 쿠폰으로 바꿀 수 있어요(1,500원 쿠폰 기준 4,500P, FULIF+ 3,600P). 열리는 날과 품목은 일주일 전에 알려 드리고, 선착순이에요. 응모권은 쿠폰 · 티켓 · 주유 영수증 등록과 낙첨 번호 등록에서 생기고, 포인트로는 응모권을 살 수 없어요. 사고팔거나 현금으로 바꿀 수는 없고, 적립일로부터 2년 동안 유지돼요.</Note>
          </div>
        </div>
      </Section>

      {/* ⑧ 마무리 */}
      {/* 10-21: 큰 티켓 그림 없이 스토어 버튼과 멤버십 버튼만 */}
      <ClosingCTA art={null} title={<>오늘 하루를,<br />한 번 더 채워볼까요?</>}>
        <StoreBadges className="sub-closing-stores" />
        <Link href="/membership" className="btn-secondary mt-4">FULIF · FULIF+ 비교는 멤버십에서</Link>
      </ClosingCTA>
    </div>
  );
}
