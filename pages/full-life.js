import Link from 'next/link';
import { useEffect, useState } from 'react';
import Seo from '../components/Seo';
import Icon from '../components/Icon';
import { Section, SectionHead, Steps, StatGrid, Rows, Note, Fine, Phone } from '../components/ui';
import { DayTimeline } from '../components/visuals';
import { Art, FoundObject, ClosingCTA } from '../components/SubpageDesign';
import { ServiceOpening, CouponWallet, VotePreview } from '../components/PageScenes';

const CHIPS = [
  ['#one-more', 'ONE MORE'], ['#lotto-one-more', '낙첨 ONE MORE'], ['#vote', '오늘의 한 표'], ['#draw', '경품 추첨'],
  ['#found', 'FOUND AI'], ['#playground', '놀이터'], ['#points', '포인트'], ['#compare', 'FULIF · FULIF+'],
];

const DAY = [
  ['아침', '출석체크, 그리고 오늘의 한 표', '눈 뜨고 한 번 누르면 차곡차곡. 오늘의 질문에 가볍게 답해요.', 'wb_sunny'],
  ['점심', '만료 이틀 전, 카페 쿠폰 알림', '잊고 있던 쿠폰을 풀리프가 먼저 알려드려요. 보관함에서 바로 꺼내 써요.', 'notifications'],
  ['퇴근길', '내 생활권 혜택 한 번 보기', 'FOUND AI가 찾아둔 편의점 · 마트 · 주유소 혜택을 확인해요.', 'storefront'],
  ['저녁', '다녀온 영화 티켓 등록', '관람한 티켓을 올리면 바로 10P. 오늘의 기록이 응모 기회가 돼요.', 'confirmation_number'],
  ['화요일 20:30', '경품 추첨', '이번 주 모은 응모권으로 경품 추첨에 참여해요.', 'redeem'],
];

function Feature({ id, eyebrow, title, lead, steps, stats, fine, shot, note, children, art }) {
  return (
    <Section id={id} className={`feature-section feature-${id} scroll-mt-40`}>
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          <SectionHead eyebrow={eyebrow} title={title} lead={lead} />
          {steps && <Steps className="mt-6" items={steps} />}
          {children}
          {stats && <StatGrid className="mt-6 [&>div]:!bg-panel" items={stats} />}
          {note && <Note className="mt-4">{note}</Note>}
          {fine && <Fine className="mt-4">{fine}</Fine>}
        </div>
        {id === 'one-more' ? <CouponWallet /> : id === 'vote' ? <VotePreview /> : shot && (
          <div className="feature-stage reveal">
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

      {/* ② 풀리프의 하루 */}
      <Section tone="gray" id="a-fuli-day">
        <SectionHead eyebrow="A DAY WITH FULIF" title={'풀리프와 함께하는\n어느 하루'} lead="특별한 날이 아니어도 괜찮아요. 평범한 하루 곳곳에 한 번 더가 숨어 있어요." />
        <DayTimeline items={DAY} />
        <Fine className="mt-5">하루 흐름은 이해를 돕기 위한 예시예요.</Fine>
      </Section>

      {/* ③ ONE MORE */}
      <Feature
        id="one-more" art="coupon" eyebrow="ONE MORE" title={'내 쿠폰 · 내 티켓,\n한 번 더 쓰기'}
        lead="카톡이나 문자로 받은 쿠폰, 다녀온 공연 · 영화 · 여행 티켓. 흩어진 것들을 보관함 한곳에 모아요."
        steps={[
          { desc: '쿠폰 화면을 캡처해 올리거나, 공유 버튼에서 풀리프를 고르면 등록돼요. 쿠폰인지 티켓인지는 AI가 알아서 구분해요.' },
          { desc: '등록할 때마다 응모 기회가 한 칸씩 채워지고, 다섯 칸이 차면 응모권 1개가 돼요.' },
          { desc: '만료 이틀 전에 알려드려요. 다 쓴 쿠폰은 사용완료로 바꾸면 10P.' },
        ]}
        stats={[
          { label: '쿠폰 사용완료', value: '10P' }, { label: '티켓 등록', value: '10P' },
          { label: '등록 5번', value: '응모권 1개' }, { label: '경품 추첨', value: '매달 마지막 화요일 21:00' },
        ]}
        fine="번호 직접 입력과 종이 쿠폰은 받지 않아요."
        shot="/screens/one-more.png"
      />

      {/* ④ 낙첨 ONE MORE */}
      <Feature
        id="lotto-one-more" art="number" eyebrow="낙첨 ONE MORE" title={'아쉬운 내 번호,\n이번 주를 한 번 더'}
        lead="지난 회차에 아쉽게 끝난 번호가, 브랜드 파트너의 경품 응모권으로 돌아와요."
        steps={[
          { desc: '용지의 QR이나 사진으로 번호를 등록해요. 온라인 · 모바일로 구매한 번호는 직접 입력할 수 있어요.' },
          { desc: '번호 1세트마다 브랜드 파트너의 짧은 영상을 한 편 보면 응모권 1개.' },
          { desc: '매주 화요일 20:30 경품 추첨. 당첨된 경품은 보관함에 넣어드려요.' },
        ]}
        stats={[
          { label: '등록 기간', value: '토 21:00 ~ 화 20:00' }, { label: '등록 1세트', value: '10P' },
          { label: 'FULIF', value: '5세트까지' }, { label: 'FULIF+', value: '20세트까지' },
        ]}
        fine="직접 입력한 번호로 당첨되면, 모든 회원에게 공정하도록 실제 구매한 번호인지 한 번 확인해요."
        shot="/screens/lotto-one-more.png"
      />

      {/* ⑤ 오늘의 한 표 */}
      <Feature
        id="vote" art="vote" eyebrow="오늘의 한 표" title={'정답은 없어요,\n오늘의 생각만 있을 뿐'}
        lead="요즘 내 삶의 BGM은? 같은 가벼운 질문이 하루 세 개씩 올라와요. 세 가지 모두 고르면 30P."
        stats={[{ label: '하루 질문', value: '3개' }, { label: '모두 답하면', value: '30P' }]}
        fine="답하고 나면 다른 회원들은 어떻게 골랐는지도 볼 수 있어요."
        shot="/screens/today-vote.png"
      />

      {/* ⑥ 경품 추첨 */}
      <Section id="draw" tone="gray" className="scroll-mt-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <SectionHead eyebrow="경품 추첨" title={'모든 응모권은\n같은 확률이에요'} lead="FULIF든 FULIF+든, 응모권 1개의 가치는 같아요. 경품은 브랜드 파트너가 함께 준비해요." />
          <div className="reveal rounded-2xl bg-white px-6">
            <Rows items={[
              { label: '낙첨 ONE MORE', value: '매주 화요일 20:30' },
              { label: 'ONE MORE', value: '매달 마지막 화요일 21:00' },
              { label: '당첨되면', value: '보관함에 바로 넣어드려요' },
            ]} />
          </div>
        </div>
      </Section>

      {/* ⑦ FOUND AI */}
      <Section id="found" className="scroll-mt-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <SectionHead eyebrow="FOUND AI" title={'내 생활권 혜택,\n풀리가 먼저 찾아요'} lead="한 번 정한 생활권의 편의점 · 마트 · 주유소 혜택을, 확인한 날짜와 함께 정리해 드려요. 실시간 위치는 보지 않아요." />
            <Link href="/found-ai" className="btn-secondary mt-8">FOUND AI 자세히 보기</Link>
          </div>
          <div className="reveal"><FoundObject /></div>
        </div>
      </Section>

      {/* ⑧ 풀리프 놀이터 */}
      <Section id="playground" tone="gray" className="scroll-mt-20">
        <SectionHead eyebrow="풀리프 놀이터" title={'게임도 하고,\n번호도 만들고'} />
        <div className="service-games">
          {[
            ['memory', '넘버 센스', '모든 회원', 'gray', '잠깐 본 번호를 기억했다가 1~45 숫자판에서 찾아내는 기억력 게임. 성공한 단계의 포인트는 바로 쌓이고, 실패해도 사라지지 않아요.'],
            ['number', '번호 만들기', '모든 회원', 'gray', '35개 필터로 정성껏 선별한 풀리프 제공 번호가 매 회차 도착해요. FULIF 2세트, FULIF+ 10세트.'],
            ['plus', '챔피언십', 'FULIF+', 'blue', '세 가지 방법 중 편한 방법으로 나만의 번호를 만들고, 회차 결과와 얼마나 가까웠는지로 점수를 쌓는 1년 시즌이에요. 시상은 트로피 · 물품 · 포인트로 드리며, 현금은 지급하지 않아요.'],
            ['score', '럭키 스코어', 'FULIF+', 'blue', '등록한 번호의 아쉬움을 점수로 바꾸고, 점수에 따라 포인트를 드려요.'],
          ].map(([img, t, tag, , d]) => (
            <article key={t} className="service-game reveal"><Art name={img} sizes="(max-width: 767px) 70vw, 250px" /><span>{tag}</span><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
        <Fine className="mt-5">번호 기능은 번호를 고르는 재미를 위한 것으로, 당첨 확률을 높여주지 않아요.</Fine>
      </Section>

      {/* ⑨ 포인트 */}
      <Section id="points" className="scroll-mt-20">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div className="service-points-intro"><SectionHead eyebrow="포인트" title={'쌓는 법부터\n쓰는 법까지'} /><Art name="points" sizes="280px" /></div>
          <div>
            <h3 className="text-[17px] font-bold">이렇게 모아요</h3>
            <div className="reveal mt-2 rounded-2xl bg-panel px-6">
              <Rows items={[
                { label: '신규 가입', value: '100P' }, { label: '친구 초대 (초대한 분 · 초대받은 분)', value: '각 100P' },
                { label: '낙첨번호 등록', value: '1세트당 10P' }, { label: '광고 보기', value: '1초당 1P' },
                { label: '티켓 등록 · 쿠폰 사용완료', value: '각 10P' }, { label: '쿠폰 기부', value: '30P' },
                { label: '오늘의 한 표', value: '30P' }, { label: '럭키 스코어', value: '점수에 따라' },
                { label: '넘버 센스', value: '성공한 단계만큼' }, { label: '경품 당첨', value: '경품별로' },
              ]} />
            </div>
            <h3 className="mt-8 text-[17px] font-bold">이렇게 써요</h3>
            <div className="reveal mt-2 rounded-2xl bg-panel px-6">
              <Rows items={[{ label: '넘버 센스 이어하기', value: '30P' }]} />
            </div>
            <Fine className="mt-3">포인트로 누릴 수 있는 혜택은 계속 늘려갈게요.</Fine>
            <Note className="mt-4" title="포인트는 이렇게 지켜져요">활동으로만 쌓이고, 사고팔 수 없어요. 현금으로 바꿀 수 없고, 적립일로부터 2년 동안 유지돼요.</Note>
          </div>
        </div>
      </Section>

      {/* ⑩ FULIF · FULIF+ 비교 */}
      <Section id="compare" tone="gray" className="scroll-mt-20">
        <SectionHead eyebrow="FULIF · FULIF+" title={'무료로도 충분히,\n더 알차게는 FULIF+'} />
        <div className="compare-panel reveal mt-10 overflow-hidden bg-white">
          <table className="w-full text-[15px]">
            <thead>
              <tr className="border-b border-hair">
                <th className="px-5 py-4 text-left font-semibold text-muted">기능</th>
                <th className="whitespace-nowrap px-4 py-4 text-center"><p className="font-bold">FULIF</p><p className="text-[12px] font-medium text-dim">무료</p></th>
                <th className="whitespace-nowrap px-4 py-4 text-center text-blue"><p className="font-bold">FULIF+</p><p className="text-[12px] font-medium">월 5,000원</p></th>
              </tr>
            </thead>
            <tbody>
              {[
                ['ONE MORE · 쿠폰 기부', '✓', '✓'], ['낙첨번호 등록', '5세트', '20세트'], ['풀리프 제공 번호', '2세트', '10세트'],
                ['하루 광고 보기', '10회', '20회'], ['오늘의 한 표 · FOUND AI', '✓', '✓'], ['넘버 센스', '✓', '✓'],
                ['럭키 스코어', '–', '✓'], ['챔피언십 · 전용 이벤트', '–', '✓'], ['응모권 1개의 확률', '같아요', '같아요'],
              ].map(([f, a, b]) => (
                <tr key={f} className="border-b border-hair last:border-b-0">
                  <td className="px-5 py-3.5 pr-2 font-medium">{f}</td>
                  <td className="px-4 py-3.5 text-center text-sub">{a === '✓' ? <Icon name="check" className="text-ink" size={20} /> : a}</td>
                  <td className="px-4 py-3.5 text-center font-semibold text-blue">{b === '✓' ? <Icon name="check" size={20} /> : b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Fine className="mt-4">첫 달 무료 · 월 5,000원. 무료 체험은 한 번만 받을 수 있고, 결제 3일 전에 미리 알려드려요.</Fine>
        <Link href="/membership" className="btn-secondary mt-6 !bg-white">멤버십 자세히 보기</Link>
      </Section>

      {/* ⑪ 마무리 */}
      <ClosingCTA title={<>오늘 하루를,<br />한 번 더 채워볼까요?</>} />
    </div>
  );
}
