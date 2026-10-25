// Full Life 수정 목업(2026-10-21) — 새 블록들.
// 「어느 하루」 5장 → 「풀리프의 일주일」 한 띠, 큰 3D 그림 카드 → 작은 아이콘 + 글 목록,
// 놀이터 3장 → 2×2 타일. 숫자 포인트는 앱 포인트 안내로 넘긴다.
import Link from 'next/link';
import { Art } from './SubpageDesign';

// 낙첨 번호 등록은 토요일 20:50 에 열린다(이용약관 제11조 · 서버 prize_schedule).
// 목업의 「21:00」은 옛 원고라 20:50 으로 쓴다.
const WEEK = [
  ['일', '출석'], ['월', '출석'], ['화', '출석'], ['수', '출석'],
  ['목', '20:30\n추첨', 'draw'], ['금', '출석'], ['토', '20:50\n등록 열림', 'open'],
];

const WEEK_ROWS = [
  ['매일', '출석 · 오늘의 한 표 · 놀이터', '쿠폰은 받은 날, 티켓은 다녀온 날 바로 등록해요.'],
  ['토요일', '일주일 출석을 채우는 날', '20:50, 낙첨 번호 등록이 열려요.'],
  ['목요일', '20:00 등록 마감 · 20:30 경품 추첨', '이번 주 낙첨 ONE MORE 응모권으로 추첨해요.'],
  ['매달 마지막\n목요일', 'ONE MORE 경품 추첨 · 20:30', '쿠폰 · 티켓 · 주유 영수증으로 모은 응모권이 들어가요.'],
];

export function WeekWithFulif() {
  return (
    <div className="fl-week reveal">
      <ol className="fl-week-strip" aria-label="풀리프의 일주일">
        {WEEK.map(([d, t, kind]) => (
          <li key={d} className={kind ? `fl-day fl-day-${kind}` : 'fl-day'}>
            <b>{d}</b><span>{t}</span>
          </li>
        ))}
      </ol>
      <dl className="fl-week-rows">
        {WEEK_ROWS.map(([when, what, sub]) => (
          <div key={when}>
            <dt>{when}</dt>
            <dd><strong>{what}</strong><span>{sub}</span></dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// ONE MORE — 내 쿠폰 · 내 티켓 작은 아이콘 카드(등록 기준은 앱 10-21 수정안과 같은 말)
export function OneMoreCriteria() {
  return (
    <div className="fl-criteria">
      <article className="fl-crit reveal">
        <Art name="coupon" sizes="88px" />
        <div>
          <small>내 쿠폰</small>
          <h3>아직 안 쓴 모바일 교환권 · 금액권</h3>
          <p>교환권: 커피 · 케이크 · 치킨 · 편의점 상품</p>
          <p>금액권: 1만 원권 · 3만 원권처럼 금액만큼 쓰는 것</p>
          <p className="fl-no">할인 쿠폰 · 종이 상품권은 등록할 수 없어요</p>
        </div>
      </article>
      <article className="fl-crit reveal">
        <Art name="ticket" sizes="88px" />
        <div>
          <small>내 티켓</small>
          <h3>다녀온 날의 티켓 · 주유 영수증</h3>
          <p>영화 · 공연 · 전시 · 스포츠 · 테마파크</p>
          <p>기차 · 버스 · 항공 · 주유 영수증</p>
        </div>
      </article>
    </div>
  );
}

export function EntryCells() {
  return (
    <div className="fl-cells reveal" aria-label="등록 다섯 번이면 응모권 한 개">
      {[1, 2, 3, 4].map((n) => <span key={n} aria-hidden="true">✓</span>)}
      <span className="fl-cells-last" aria-hidden="true">🎟</span>
      <p>등록 <b>5번</b>이면, 응모권 <b>1개</b></p>
    </div>
  );
}

// 오늘의 한 표 — 큰 3D 그림 없이 질문 미리보기 카드 하나
export function VoteCard() {
  return (
    <div className="fl-vote reveal">
      <div className="fl-vote-head">
        <Art name="vote" sizes="64px" />
        <div><small>질문 1개 미리보기</small><h3>잠깐의 여유가 생긴다면?</h3></div>
      </div>
      <ul>
        {['☕ 커피 한 잔의 여유', '🚶 동네 한 바퀴 산책', '🎧 좋아하는 노래 한 곡'].map((t) => (
          <li key={t}><span>{t}</span><i aria-hidden="true">›</i></li>
        ))}
      </ul>
      <p className="fl-vote-fine">보기는 예시예요.</p>
    </div>
  );
}

// 놀이터 2×2 — 넘버 센스 · 브랜드 센스(NEW) · 번호 만들기(영상 링크) · 챔피언십 · 럭키 스코어(FULIF+)
export function PlaygroundTiles() {
  return (
    <div className="fl-play">
      <article className="fl-tile reveal">
        <Art name="memory" sizes="72px" />
        <h3>넘버 센스</h3>
        <p>잠깐 본 번호를 기억해 찾아요. 성공한 단계만큼 바로 쌓이고, 실패해도 사라지지 않아요.</p>
      </article>
      <article className="fl-tile reveal">
        <span className="fl-badge fl-badge-new">NEW</span>
        <span className="fl-cardgrid" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i} className={[1, 3, 5, 7].includes(i) ? 'on' : ''} />)}</span>
        <h3>브랜드 센스</h3>
        <p>어제 만난 브랜드부터 떠올리고, 단계마다 3라운드. 틀려도 3번까지 다시 할 수 있어요.</p>
      </article>
      <article className="fl-tile reveal">
        <Art name="number" sizes="72px" />
        <h3>번호 만들기</h3>
        <p>자체 개발한 35개 필터로 정성껏 선별한 번호가 매 회차 도착해요. FULIF 2세트 · FULIF+ 10세트.</p>
        <Link href="/guide/numbers" className="fl-video-link">▶ 영상으로 따라 해 보기</Link>
      </article>
      <article className="fl-tile reveal">
        <span className="fl-badge fl-badge-plus">FULIF+</span>
        <Art name="score" sizes="72px" />
        <h3>챔피언십 · 럭키 스코어</h3>
        <p>직접 만든 번호로 챔피언십에 도전하고, 아쉬웠던 번호는 점수로. 현금은 지급하지 않아요.</p>
      </article>
    </div>
  );
}
