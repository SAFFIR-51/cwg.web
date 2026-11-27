// 챔피언십 — 11-26 「풀리프 웹사이트 챔피언십 페이지」 목업 · 설명안.
//
// 순서는 설명안 반영 사항 2 그대로: 표지 → 01 ~ 08 → FULI NOTES 요약 → 풀리의 한마디 →
// 「앱에서 챔피언십 시작하기」 → 연재 「풀리프가 만든 번호, 맞은 번호」(라벨은 「연재」만).
// 03 의 35칸 칩과 04 의 채점 그림이 이 페이지의 핵심 그림이다(반영 사항 3) — 목업 그대로.
// 점수표는 앱 안내와 한 글자도 다르지 않게. 「현금은 지급하지 않아요」는 맨 뒤 08 에만.
import Link from 'next/link';
import Seo from '../components/Seo';
import Icon from '../components/Icon';
import { SectionNav } from '../components/Edition';
import { useStoreTarget } from '../components/StoreCta';
import { RECORDS, RECORD_SCHEDULE } from '../lib/records';
import RecordsQuickBar from '../components/RecordsQuickBar';

const BALL = { 7: 'o', 15: 'b', 19: 'b', 32: 'p', 34: 'p', 43: 'g' };
const SAMPLE = [7, 15, 19, 32, 34, 43];
// 목업 03 — 이번에 함께 작동한 기준 18칸
const LIT = new Set([2, 3, 4, 5, 6, 10, 13, 15, 16, 17, 18, 20, 21, 26, 29, 30, 31, 35]);
const pad = (n) => String(n).padStart(2, '0');

function Balls({ nums = SAMPLE, size = 'md' }) {
  return <div className={`ch-balls is-${size}`}>{nums.map((n) => <span key={n} className={`ch-ball is-${BALL[n] || 'b'}`}>{pad(n)}</span>)}</div>;
}

function Head({ no, title, lead }) {
  return <div className="ch-head reveal"><span className="ch-no">{pad(no)}</span><div><h2>{title}</h2>{lead && <p>{lead}</p>}</div></div>;
}

function StartButton({ className = '' }) {
  const { href, external } = useStoreTarget();
  const label = <>앱에서 챔피언십 시작하기 <Icon name="arrow_outward" size={20} /></>;
  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={`ch-start ${className}`}>{label}</a>
    : <Link href={href} className={`ch-start ${className}`}>{label}</Link>;
}

export default function Championship() {
  return <div className="ch-page">
    <Seo title="챔피언십" description="FULIF+ 회원이 참여하는 나만의 번호 만들기 대결. 내가 만든 번호가 그 주의 1등 번호와 얼마나 가까웠는지 점수로 쌓여, 연말 시즌 챔피언을 가려요." />

    {/* 표지 */}
    <header className="ch-hero">
      <div className="ch-hero-glow" aria-hidden="true" />
      <div className="ch-hero-inner">
        <div className="ch-hero-copy">
          <span className="ch-badge">FULIF+ 전용 · 시즌 단위</span>
          <h1>챔피언십</h1>
          <p>FULIF+ 회원이 참여하는<br />나만의 번호 만들기 대결</p>
          <Balls size="lg" />
          <div className="ch-hero-facts">
            <span><b>매주</b> 최대 10세트</span>
            <span><b>일치 + 근접</b> 두 가지 점수</span>
            <span><b>연말</b> 시즌 챔피언</span>
          </div>
        </div>
        <div className="ch-hero-art">
          <span className="ch-hero-ring" aria-hidden="true" />
          <img src="/mascot/championship/fuli-cheer.png" alt="주먹을 쥐고 응원하는 풀리" />
          <span className="ch-hero-bubble">가까이 간 번호도<br /><b>점수로 남아요!</b></span>
        </div>
      </div>
    </header>

    <SectionNav label="챔피언십 페이지 탐색" items={[['what', '챔피언십이란'], ['join', '참여 방법'], ['make', '번호 만들기'], ['score', '점수'], ['honor', '명예 챔피언'], ['prize', '시상'], ['season', '참여 조건'], ['records', '연재']]} />

    <div className="ch-body">
      {/* 01 */}
      <section id="what" className="ch-sec">
        <Head no={1} title="챔피언십이 뭔가요" />
        <div className="ch-text reveal">
          <p>내가 직접 만든 번호가 그 회차 1등 번호와 얼마나 가까웠는지 <b>점수를 받는 게임</b>이에요. 점수는 연말 시즌 챔피언을 향해 자동으로 쌓여요.<br />챔피언십과 함께 FULIF+ 전용 이벤트도 열려요.</p>
          <p className="ch-strong-line"><b>번호를 사지 않아도 참여할 수 있어요.</b> 복권을 한 번도 사 본 적이 없어도 똑같이 즐기실 수 있어요.</p>
        </div>
        <div className="ch-trio">
          {[
            ['blue', 'shopping_bag_off', '구매 불필요', '번호를 사지 않아도\n참여할 수 있어요'],
            ['navy', 'redeem', '이런 걸 드려요', '브랜드 파트너 물품\n포인트 · 챔피언 배지'],
            ['navy', 'workspace_premium', 'FULIF+ 회원', '구독 중이면\n누구나 바로'],
          ].map(([tone, icon, t, d]) => <div key={t} className={`ch-trio-card reveal is-${tone}`}><p className="ch-trio-top"><Icon name={icon} size={18} />{t}</p><p className="ch-trio-desc">{d}</p></div>)}
        </div>
      </section>

      {/* 02 */}
      <section id="join" className="ch-sec">
        <Head no={2} title="이렇게 참여해요" />
        <ul className="ch-checks reveal">
          <li><Icon name="check" size={20} /><span><b>번호를 사지 않아도 참여할 수 있어요.</b> 만든 번호는 풀리프 기록실에 저장돼요</span></li>
          <li><Icon name="check" size={20} /><span><span className="ch-path">놀이터 <i>›</i> 번호 만들기 <i>›</i> 챔피언십 번호 만들기</span>에서 세 가지 방법 중 편한 방법으로 나만의 번호를 만들어요 <em className="ch-pill">매주 최대 10세트</em></span></li>
          <li><Icon name="check" size={20} /><span>한 번에 다 만들어도 되고, 며칠에 걸쳐 채워도 돼요</span></li>
          <li><Icon name="check" size={20} /><span><b>그 주 추첨이 끝나면, 내 번호를 1등 번호와 비교해 자동으로 점수를 드려요</b></span></li>
        </ul>
      </section>

      {/* 03 */}
      <section id="make" className="ch-sec">
        <Head no={3} title="번호는 이렇게 만들어요" lead={<>풀리프에는 번호를 고르는 <b>35가지 기준</b>이 있어요. 전부 알 필요는 없어요. 마음에 드는 스타일 하나만 고르면 나머지는 맞춰 드려요.</>} />
        <div className="ch-chips reveal" role="img" aria-label="35가지 기준 가운데 이번에 함께 작동한 18가지가 파랗게 켜진 칸">
          {Array.from({ length: 35 }, (_, i) => i + 1).map((n) => <span key={n} className={LIT.has(n) ? 'is-on' : ''} style={{ '--d': `${(n % 7) * 40 + Math.floor((n - 1) / 7) * 60}ms` }}>{n}</span>)}
        </div>
        <p className="ch-caption reveal"><b className="text-blue">파란 칸</b>이 이번에 함께 작동한 기준이에요. 고른 스타일에 따라 켜지는 기준이 매번 달라져요. <span className="ch-count">35개 중 <b>18개</b> 작동</span></p>

        <div className="ch-trio ch-methods">
          {[
            ['blue', '방법 1', '스타일 고르기', '「○○ 스타일로 번호 만들기」를\n누르면 번호가 만들어져요'],
            ['navy', '방법 2', '필터 직접 조절', '핵심 필터 세 개만\n직접 맞춰요'],
            ['navy', '방법 3', '전문가 모드', '35개 기준 중\n원하는 것만 골라 맞춰요'],
          ].map(([tone, k, t, d]) => <div key={k} className={`ch-trio-card reveal is-${tone}`}><p className="ch-trio-top">{k} · {t}</p><p className="ch-trio-desc">{d}</p></div>)}
        </div>

        <div className="ch-made reveal">
          <p>한 세트가 이렇게 완성돼요</p>
          <Balls size="lg" />
        </div>
        <p className="ch-caption reveal">만든 번호는 <b>풀리프 기록실</b>에 자동으로 저장돼요.</p>

        <div className="ch-videos">
          {[[1, '스타일 고르기', 35], [2, '필터 직접 조절', 41], [3, '전문가 모드', 84]].map(([n, t, len]) => <figure key={n} className="ch-video reveal">
            <div className="ch-video-frame"><video src={`/video/numbers-guide-${n}.mp4#t=0.5`} controls playsInline preload="metadata" aria-label={`영상 방법 ${n} ${t}`} /></div>
            <figcaption><span>영상 · 방법 {n}</span><b>{t}</b><small>{len}초</small></figcaption>
          </figure>)}
        </div>

        <a href="#records" className="ch-down reveal">풀리프가 같은 기준으로 만드는 번호가 매주 어떤 결과를 냈는지는 <b>아래에서</b> 보실 수 있어요 <Icon name="arrow_downward" size={18} /></a>
      </section>

      {/* 04 */}
      <section id="score" className="ch-sec">
        <Head no={4} title="점수는 두 가지로 쌓여요" lead="매주 최대 10세트까지 만들 수 있어요. 그 주 추첨이 끝나면 10세트를 모두 1등 번호와 비교해요." />
        <p className="ch-sub reveal"><span className="ch-sub-no">①</span><b>일치 점수</b> — 1등 번호와 3개 이상 일치한 세트마다 점수를 드려요.</p>
        <div className="ch-points reveal">
          {[['2등', '3,000'], ['3등', '1,000'], ['4등', '500'], ['5등', '300']].map(([r, p]) => <div key={r}><span>{r}</span><b>{p}<small>점</small></b></div>)}
        </div>
        <p className="ch-sub reveal"><span className="ch-sub-no">②</span><b>근접 점수</b> — 일치 점수를 받지 못한 세트 중 1등 번호에 가장 가까운 1세트를 골라 <b>50~100점</b>을 드려요.</p>
        <p className="ch-sub-note reveal">10세트가 모두 일치하지 않아도 점수는 반드시 남아요. 아깝게 비껴간 번호일수록 더 높은 점수를 받아요.</p>

        <div className="ch-grade reveal" role="img" aria-label="채점 예시. 그 주의 번호 14 18 19 29 40 45. 내 1번 세트 07 18 23 29 38 45는 3개 일치로 일치 점수. 내 2번 세트 12 17 22 30 39 44는 17 30 39 44가 한 칸 차이로 근접 점수.">
          <div className="ch-grade-row is-draw"><span className="ch-grade-label">그 주의 번호</span><div className="ch-gballs">{[14, 18, 19, 29, 40, 45].map((n) => <i key={n} className="is-win">{n}</i>)}</div><span className="ch-grade-tag" /></div>
          <hr />
          <div className="ch-grade-row"><span className="ch-grade-label">내 1번 세트</span><div className="ch-gballs">{[[7, ''], [18, 'hit'], [23, ''], [29, 'hit'], [38, ''], [45, 'hit']].map(([n, s]) => <i key={n} className={`is-${s || 'off'}`}>{pad(n)}</i>)}</div><span className="ch-grade-tag"><b>3개 일치</b><small>일치 점수</small></span></div>
          <div className="ch-grade-row"><span className="ch-grade-label">내 2번 세트</span><div className="ch-gballs">{[[12, ''], [17, 'near'], [22, ''], [30, 'near'], [39, 'near'], [44, 'near']].map(([n, s]) => <i key={n} className={`is-${s || 'off'}`}>{n}</i>)}</div><span className="ch-grade-tag"><b>한 칸 차이</b><small>근접 점수</small></span></div>
          <hr />
          <div className="ch-formula"><span>일치 점수</span><i>+</i><span>근접 점수</span><i>=</i><span className="is-total">그 주 점수</span></div>
        </div>
        <p className="ch-caption reveal">점선 동그라미는 일치하지는 않았지만 <b>한 칸 차이</b>로 비껴간 번호예요.</p>
        <div className="ch-example reveal"><b>예)</b> 10세트 중 1세트가 4등(500점), 1세트가 5등(300점), 나머지 8세트 중 가장 가까운 1세트가 85점이면 <span>→ 그 주 점수 <b>885점</b></span>
          <div className="ch-sum" aria-hidden="true"><span style={{ flex: 500 }}>500</span><span style={{ flex: 300 }}>300</span><span style={{ flex: 85 }}>85</span></div>
        </div>
      </section>

      {/* 05 */}
      <section id="honor" className="ch-sec">
        <Head no={5} title="1등이 나오면 — 명예 챔피언" lead={<>1등 번호와 <b>모두 일치</b>하면 명예 챔피언으로 따로 시상해 드려요. 점수는 그 주 다른 회원의 최고 점수와 같은 점수를 드려요.</>} />
        <div className="ch-table reveal"><table>
          <thead><tr><th scope="col">경우</th><th scope="col">점수</th></tr></thead>
          <tbody>
            <tr><th scope="row">1등(6개 일치)이 나오면</th><td><b>명예 챔피언</b>으로 따로 시상해 드려요</td></tr>
            <tr><th scope="row">그 회원의 그 주 점수</th><td>1등 회원을 뺀 <b>다른 회원들의 그 주 점수 중 가장 높은 점수</b></td></tr>
            <tr><th scope="row">1등 회원이 다른 세트로도 맞췄을 때</th><td>「그 주 최고 점수」와 「1등 세트를 뺀 본인 점수」 중 높은 쪽</td></tr>
            <tr><th scope="row">1등이 여러 명이면</th><td>모두 같은 「그 주 최고 점수」</td></tr>
          </tbody>
        </table></div>
        <div className="ch-why reveal"><p>왜 이렇게 하나요?</p><span>한 번의 1등으로 시즌 순위가 정해지지 않도록, 다른 회원도 끝까지 도전할 수 있게 하기 위해서예요. 명예 챔피언이 된 뒤에도 쌓아 온 누적 점수는 그대로 남아 <b>연말 시즌 챔피언에 계속 도전</b>할 수 있어요.</span></div>
      </section>

      {/* 06 — 시상 안내. 이모지 · 색 띠 카드 대신 상마다 그림을 따로 그린다(11-27) */}
      <section id="prize" className="ch-sec">
        <Head no={6} title="무엇을 받나요" lead={<>시상은 <b>한 해에 한 번</b> 드리는 것과 <b>시즌 중 수시로</b> 드리는 것으로 나뉘어요.</>} />

        <p className="ch-group reveal"><span>한 해에 한 번</span><i>ONCE A SEASON</i></p>
        <div className="pz-champ reveal">
          <div className="pz-champ-rays" aria-hidden="true" />
          <div className="pz-champ-copy">
            <span className="pz-tag is-gold">한 해에 한 번</span>
            <p className="pz-champ-eyebrow">SEASON CHAMPION</p>
            <h3><em>2027</em> 시즌 챔피언</h3>
            <p className="pz-champ-desc">시즌 누적 점수 1위</p>
            <p className="pz-champ-trophy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v4a5 5 0 0 1-10 0V4Zm0 1H4v2a3 3 0 0 0 3 3m10-5h3v2a3 3 0 0 1-3 3M12 13v4m-4 3h8l-1-3H9l-1 3Z" /></svg><span>트로피는 시즌 챔피언<br />한 분께만 드려요</span></p>
          </div>
          <div className="pz-champ-stage" aria-hidden="true">
            <i className="pz-confetti" /><i className="pz-confetti" /><i className="pz-confetti" /><i className="pz-confetti" /><i className="pz-confetti" />
            <img src="/mascot/championship/fuli-jump.png" alt="" />
            <div className="pz-podium"><span>1</span></div>
          </div>
        </div>

        <div className="pz-pair">
          <div className="pz-card reveal">
            <div className="pz-board" aria-hidden="true">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => <div key={n} className={n <= 3 ? `is-m${n}` : ''}><b>{n}</b><i style={{ width: `${100 - (n - 1) * 7}%` }} /></div>)}
            </div>
            <div className="pz-card-text"><span className="pz-tag">한 해에 한 번</span><h3>시즌 TOP 10</h3><p>시즌 챔피언을 포함한<br />TOP 10에 순위별 시상</p></div>
          </div>
          <div className="pz-card reveal">
            <div className="pz-ticket" aria-hidden="true">
              <div><small>SEASON DRAW</small><b>시즌 경품 추첨</b><span>FULIF+ ONLY</span></div>
              <em>2027</em>
            </div>
            <div className="pz-card-text"><span className="pz-tag">한 해에 한 번</span><h3>시즌 경품 추첨</h3><p>FULIF+ 회원 전용</p></div>
          </div>
        </div>

        <p className="ch-group reveal"><span>시즌 중 수시</span><i>ANYTIME IN SEASON</i></p>
        <div className="pz-pair is-wide">
          <div className="pz-card is-honor reveal">
            <div className="pz-medal" aria-hidden="true">
              <svg viewBox="0 0 120 150"><path className="pz-ribbon-l" d="M38 70 22 140l22-12 12 20 10-62Z" /><path className="pz-ribbon-r" d="M82 70l16 70-22-12-12 20-10-62Z" /><polygon className="pz-medal-edge" points={Array.from({ length: 32 }, (_, i) => { const r = i % 2 ? 46 : 52; const t = (i / 32) * Math.PI * 2; return `${60 + r * Math.sin(t)},${58 - r * Math.cos(t)}`; }).join(' ')} /><circle className="pz-medal-face" cx="60" cy="58" r="38" /><path className="pz-medal-crown" d="M42 64l-4-20 11 9 11-14 11 14 11-9-4 20Z" /><rect className="pz-medal-crown" x="42" y="67" width="36" height="5" rx="2" /></svg>
            </div>
            <div className="pz-card-text"><span className="pz-tag is-purple">시즌 중 수시</span><h3>명예 챔피언</h3><p>1등 번호와 일치한<br />회원이 나오면</p></div>
          </div>
          <div className="pz-card is-event reveal">
            <div className="pz-leagues" aria-hidden="true">
              {[['상위', 92], ['중위', 66], ['하위', 44]].map(([t, h]) => <div key={t}><span className="pz-gift"><svg viewBox="0 0 24 24"><path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-4 0-5-4-2.5-4S12 7 12 7Zm0 0c4 0 5-4 2.5-4S12 7 12 7Z" /></svg></span><i style={{ height: h }}><b>{t}</b><small>리그</small></i></div>)}
              <span className="pz-jump"><svg viewBox="0 0 24 24"><path d="M4 18 10 12l4 4 6-8M15 8h5v5" /></svg>순위 급상승</span>
            </div>
            <div className="pz-card-text"><span className="pz-tag is-blue">시즌 중 수시</span><h3>시즌 특별 이벤트</h3><p>상위권만의 잔치가 아니에요. 누적 점수 구간별 리그(상위 · 중위 · 하위)로 나눠 시즌별 이벤트 추첨을 통해 시상하고, 순위 급상승처럼 다양한 주제의 시상도 있어요.</p></div>
          </div>
        </div>
        <p className="pz-closing reveal"><img src="/mascot/championship/fuli-cheer.png" alt="" /><span><b>상위권이 아니어도</b> 상을 받을 기회가 있어요.</span></p>
      </section>

      {/* 07 · 08 */}
      <section id="season" className="ch-sec">
        <Head no={7} title="참여 조건과 시즌" />
        <ul className="ch-dots reveal">
          <li>챔피언십은 <b>FULIF+ 회원만</b> 참여할 수 있어요</li>
          <li>첫 시즌은 <b>2026년 11월 30일부터 2027년 12월 31일까지</b>예요. 그다음부터는 매년 1월 1일부터 12월 31일까지예요</li>
          <li>첫 시즌은 <b>총 38회 이상 참여한 회원</b>만 시상 대상이 될 수 있어요. 한 주에 1세트 이상 만들면 1회 참여로 인정돼요</li>
          <li>구독을 쉬어도 쌓여 온 점수는 그대로 남아요. 다만 쉬는 동안의 회차는 번호를 만들 수 없어 점수가 쌓이지 않아요</li>
          <li>시즌이 끝나면 점수는 0점에서 다시 시작해요</li>
          <li>부정한 방법으로 얻은 점수는 인정되지 않으며, 시상이 취소될 수 있어요</li>
        </ul>
        <div className="ch-season reveal" aria-hidden="true">
          <div className="ch-season-bar"><span className="is-first">첫 시즌 · 13개월</span><span>2028 시즌 · 12개월</span></div>
          <div className="ch-season-ticks"><span>2026.11.30</span><span>2027.12.31</span><span>2028.12.31</span></div>
        </div>
      </section>

      <section className="ch-sec">
        <Head no={8} title="알아두세요" />
        <ul className="ch-dots reveal">
          <li>챔피언십은 <b>번호 구매와 무관한 번호 일치 게임</b>이에요. 챔피언십에서 나만의 번호를 만들면 풀리프 기록실에 그대로 기록돼 점수를 쌓아가는 구조예요</li>
          <li>시상은 트로피 · 물품 · 포인트로 드리며, <b>현금은 지급하지 않아요</b></li>
          <li>번호를 고르는 재미를 위한 기능이며, <b>추첨 결과에는 영향을 주지 않아요</b></li>
        </ul>
      </section>

      {/* FULI NOTES 요약 */}
      <section className="ch-summary reveal">
        <p className="ch-summary-eyebrow">F U L I &nbsp;N O T E S</p>
        <h2>챔피언십, 한 장으로</h2>
        <div className="ch-summary-flow">
          <div><b>내가 만든 번호</b><span>번호를 사지 않아도</span></div>
          <Icon name="arrow_forward" size={22} />
          <div><b>그 주 점수</b><span>일치 점수 + 근접 점수</span></div>
          <Icon name="arrow_forward" size={22} />
          <div><b>시즌의 기록</b><span>순위와 시상</span></div>
        </div>
        <p className="ch-summary-foot">한 주도 빈손이 아니에요. 아깝게 비껴간 번호에도 점수가 남아요.</p>
      </section>

      <div className="ch-fuli reveal"><img src="/mascot/pulli-profile-v2.png" alt="풀리" /><p><span>풀리</span>맞히는 날만 좋은 날은 아니에요. 가까이 갔던 날도, 기록으로 남으니까요.</p></div>

      <StartButton className="reveal" />

      {/* 연재 — 챔피언십 소속이 아니다(라벨에 「챔피언십」을 넣지 않는다) */}
      <section id="records" className="ch-series reveal">
        <div className="ch-series-head">
          <span className="ch-series-label">연재</span>
          <h2>풀리프가 만든 번호, 맞은 번호</h2>
        </div>
        <p>풀리프가 매주 만드는 번호 전체의 기록이에요. 좋은 주든 아니든 그대로 올려 둡니다.<br />회원님이 <b>챔피언십에서 직접 만드신 번호와는 별개</b>예요.</p>
        <span className="ch-series-when"><Icon name="schedule" size={16} />{RECORD_SCHEDULE}</span>
      </section>
      <ul className="ch-series-list">
        {RECORDS.slice(0, 5).map((r) => <li key={r.no} className="reveal"><Link href={`/records/${r.no}`}><b>{r.no}회</b><span className="is-date">{r.date}</span><span className="is-period">{r.period}</span><Icon name="arrow_forward" size={20} /></Link></li>)}
      </ul>
      <Link href="/records" className="ch-series-all">지난 회 전체 보기</Link>
    </div>
    <RecordsQuickBar />
  </div>;
}
