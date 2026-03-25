import { useGame } from '../context/GameContext';
import './ResultsModal.css';

export default function ResultsModal() {
  const { state, resetTest, startNewTest } = useGame();

  if (state.status !== 'finished' || !state.result) return null;

  const { result } = state;

  const handleRestart = () => {
    resetTest();
    setTimeout(startNewTest, 50);
  };

  return (
    <div className="modal-overlay" onClick={handleRestart}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Test Complete</h2>
          <button className="modal-close" onClick={handleRestart}>
            <span className="material-icons">close</span>
          </button>
        </div>

        <div className="results-grid">
          <div className="result-card primary">
            <span className="result-number">{result.wpm}</span>
            <span className="result-label">wpm</span>
          </div>
          <div className="result-card primary">
            <span className="result-number">{result.accuracy}%</span>
            <span className="result-label">accuracy</span>
          </div>

          <div className="result-card">
            <span className="result-number">{result.rawWpm}</span>
            <span className="result-label">raw wpm</span>
          </div>
          <div className="result-card">
            <span className="result-number">{result.consistency}%</span>
            <span className="result-label">consistency</span>
          </div>
          <div className="result-card">
            <span className="result-number">{result.time}s</span>
            <span className="result-label">time</span>
          </div>
          <div className="result-card">
            <span className="result-number">{result.totalChars}</span>
            <span className="result-label">characters</span>
          </div>
        </div>

        <div className="results-breakdown">
          <div className="breakdown-row">
            <span className="breakdown-label">Correct</span>
            <span className="breakdown-value correct">{result.correctChars}</span>
          </div>
          <div className="breakdown-row">
            <span className="breakdown-label">Incorrect</span>
            <span className="breakdown-value incorrect">{result.incorrectChars}</span>
          </div>
          <div className="breakdown-row">
            <span className="breakdown-label">Missed</span>
            <span className="breakdown-value missed">{result.missedChars}</span>
          </div>
          <div className="breakdown-row">
            <span className="breakdown-label">Extra</span>
            <span className="breakdown-value extra">{result.extraChars}</span>
          </div>
        </div>

        <div className="modal-actions">
          <button className="action-btn secondary" onClick={handleRestart}>
            <span className="material-icons">refresh</span>
            New Test
          </button>
        </div>
      </div>
    </div>
  );
}
