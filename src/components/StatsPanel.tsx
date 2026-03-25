import { useGame } from '../context/GameContext';
import './StatsPanel.css';

export default function StatsPanel() {
  const { state } = useGame();

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
          <div className="stat-group word-count-display">
            <span className="stat-label">Words</span>
            <span className="stat-value">{wordsTyped}</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-group">
            <span className="stat-label">Characters</span>
            <span className="stat-value">{totalChars}</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-group">
            <span className="stat-label">WPM</span>
            <span className="stat-value wpm-value">{state.wpm}</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-group">
            <span className="stat-label">Accuracy</span>
            <span className="stat-value">{state.accuracy}%</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-group">
            <span className="stat-label">Time</span>
            <span className="stat-value">{getTimeDisplay()}</span>
          </div>
        </div>
        <div className="stats-right">
          <span className="mode-badge">
            {state.config.mode === 'time' && `${state.config.timeDuration}s`}
            {state.config.mode === 'words' && `${state.config.wordCount} words`}
            {state.config.mode === 'quote' && 'quote'}
            {state.config.mode === 'custom' && 'custom'}
          </span>
        </div>
      </div>
    </div>
  );
}
