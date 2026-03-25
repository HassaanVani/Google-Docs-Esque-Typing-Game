import { useGame } from '../context/GameContext';
import './StatsPanel.css';

export default function StatsPanel() {
  const { state } = useGame();

  const wordsTyped = Math.floor(state.correctChars / 5);

  return (
    <div className="stats-panel">
      <div className="stats-bar">
        <div className="stats-left">
          <button className="word-count-box">
            <span className="word-count-text">{wordsTyped} words</span>
            <span className="material-icons word-count-arrow" style={{ fontSize: '16px' }}>
              arrow_drop_down
            </span>
          </button>
        </div>
        <div className="stats-right">
          <span className="material-icons-outlined" style={{ fontSize: '16px', color: '#5f6368', cursor: 'pointer' }}>chevron_right</span>
        </div>
      </div>
    </div>
  );
}
