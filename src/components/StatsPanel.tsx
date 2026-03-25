import { useState } from 'react';
import { useGame } from '../context/GameContext';
import './StatsPanel.css';

export default function StatsPanel() {
  const { state } = useGame();
  const [expanded, setExpanded] = useState(true);

  const getTimeDisplay = () => {
    if (state.config.mode === 'time') {
      const remaining = Math.max(0, state.config.timeDuration - Math.floor(state.elapsedTime));
      const mins = Math.floor(remaining / 60);
      const secs = remaining % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    const elapsed = Math.floor(state.elapsedTime);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const wordsTyped = Math.floor(state.correctChars / 5);
  const totalChars = state.correctChars + state.incorrectChars;

  return (
    <div className="stats-panel">
      <div className="stats-bar">
        <div className="stats-left">
          <button className="word-count-box" onClick={() => setExpanded(!expanded)}>
            <span className="word-count-text">{wordsTyped} words</span>
            <span className="material-icons word-count-arrow" style={{ fontSize: '16px' }}>
              {expanded ? 'arrow_drop_down' : 'arrow_drop_up'}
            </span>
          </button>

          {expanded && state.status !== 'idle' && (
            <div className="expanded-stats">
              <div className="stat-pill">
                <span className="stat-val wpm-val">{state.wpm}</span>
                <span className="stat-lbl">WPM</span>
              </div>
              <div className="stat-pill">
                <span className="stat-val">{state.accuracy}%</span>
                <span className="stat-lbl">ACC</span>
              </div>
              <div className="stat-pill">
                <span className="stat-val">{totalChars}</span>
                <span className="stat-lbl">CHARS</span>
              </div>
              <div className="stat-pill">
                <span className="stat-val">{getTimeDisplay()}</span>
                <span className="stat-lbl">TIME</span>
              </div>
            </div>
          )}
        </div>
        <div className="stats-right">
          <span className="material-icons-outlined" style={{ fontSize: '16px', color: '#5f6368', cursor: 'pointer' }}>chevron_right</span>
        </div>
      </div>
    </div>
  );
}
