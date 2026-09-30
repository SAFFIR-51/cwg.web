import { useState } from 'react';
import Icon from './Icon';

/* 오늘의 한 표 웹 체험 예시. 실제 참여와 적립은 앱에서만 진행된다. */
export default function VotePreview() {
  const [choice, setChoice] = useState('');
  return <div className="vote-demo reveal">
    <small>오늘의 한 표 · 웹 체험 예시</small>
    <h3>잠깐의 여유가 생긴다면?</h3>
    <div className="vote-demo-options">
      {['커피 한 잔의 여유', '좋아하는 음악 한 곡'].map((t, i) => (
        <button key={t} type="button" aria-pressed={choice === t} onClick={() => setChoice(t)}>
          <Icon name={i ? 'music_note' : 'local_cafe'} size={22} />{t}
          <span>{choice === t ? <Icon name="check_circle" size={22} /> : <Icon name="chevron_right" size={20} />}</span>
        </button>
      ))}
    </div>
    <p aria-live="polite">{choice ? '골랐어요! 실제 참여와 포인트 적립은 앱에서 진행돼요.' : '정답은 없어요. 지금 내 마음을 골라보세요.'}</p>
    <b>하루 세 번 고르면 <em>30P</em></b>
  </div>;
}
