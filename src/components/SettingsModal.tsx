import { useState } from 'react';
import { useGame } from '../context/GameContext';
import type { TestMode, WordCount } from '../types';
import './SettingsModal.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: Props) {
  const { state, updateConfig, resetTest, startNewTest } = useGame();
  const [customText, setCustomText] = useState(state.config.customText);
  const [customTime, setCustomTime] = useState(String(state.config.timeDuration));

  if (!isOpen) return null;

  const handleModeChange = (mode: TestMode) => {
    updateConfig({ mode });
  };

  const handleTimePreset = (duration: number) => {
    setCustomTime(String(duration));
    updateConfig({ timeDuration: duration });
  };

  const handleTimeInput = (val: string) => {
    setCustomTime(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0 && num <= 600) {
      updateConfig({ timeDuration: num });
    }
  };

  const handleWordCountChange = (count: WordCount) => {
    updateConfig({ wordCount: count });
  };

  const handleSoundToggle = () => {
    updateConfig({ soundEnabled: !state.config.soundEnabled });
  };

  const handleApply = () => {
    if (state.config.mode === 'custom') {
      updateConfig({ customText });
    }
    if (state.config.mode === 'time') {
      const num = parseInt(customTime, 10);
      if (!isNaN(num) && num > 0) {
        updateConfig({ timeDuration: Math.min(num, 600) });
      }
    }
    resetTest();
    setTimeout(startNewTest, 50);
    onClose();
  };

  const timePresets = [15, 30, 60, 120];
  const wordCounts: WordCount[] = [10, 25, 50, 100];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Typing Settings</h2>
          <button className="modal-close" onClick={onClose}>
            <span className="material-icons">close</span>
          </button>
        </div>

        <div className="settings-body">
          <div className="settings-section">
            <h3 className="section-title">Test Mode</h3>
            <div className="mode-buttons">
              {(['time', 'words', 'quote', 'custom'] as TestMode[]).map((mode) => (
                <button
                  key={mode}
                  className={`mode-btn ${state.config.mode === mode ? 'active' : ''}`}
                  onClick={() => handleModeChange(mode)}
                >
                  <span className="material-icons-outlined">
                    {mode === 'time' ? 'timer' : mode === 'words' ? 'text_fields' : mode === 'quote' ? 'format_quote' : 'edit'}
                  </span>
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {state.config.mode === 'time' && (
            <div className="settings-section">
              <h3 className="section-title">Duration (seconds)</h3>
              <div className="option-buttons">
                {timePresets.map((t) => (
                  <button
                    key={t}
                    className={`option-btn ${state.config.timeDuration === t ? 'active' : ''}`}
                    onClick={() => handleTimePreset(t)}
                  >
                    {t}s
                  </button>
                ))}
              </div>
              <div className="custom-time-row">
                <span className="custom-time-label">Custom:</span>
                <input
                  className="custom-time-input"
                  type="number"
                  min="1"
                  max="600"
                  value={customTime}
                  onChange={(e) => handleTimeInput(e.target.value)}
                />
                <span className="custom-time-unit">seconds</span>
              </div>
            </div>
          )}

          {state.config.mode === 'words' && (
            <div className="settings-section">
              <h3 className="section-title">Word Count</h3>
              <div className="option-buttons">
                {wordCounts.map((w) => (
                  <button
                    key={w}
                    className={`option-btn ${state.config.wordCount === w ? 'active' : ''}`}
                    onClick={() => handleWordCountChange(w)}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}

          {state.config.mode === 'custom' && (
            <div className="settings-section">
              <h3 className="section-title">Custom Text</h3>
              <textarea
                className="custom-text-input"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Enter your custom text here..."
                rows={4}
              />
            </div>
          )}

          <div className="settings-section">
            <h3 className="section-title">Sound</h3>
            <label className="toggle-label">
              <span>Keyboard sounds</span>
              <div
                className={`toggle-switch ${state.config.soundEnabled ? 'active' : ''}`}
                onClick={handleSoundToggle}
              >
                <div className="toggle-thumb" />
              </div>
            </label>
          </div>
        </div>

        <div className="settings-footer">
          <button className="action-btn cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="action-btn apply-btn" onClick={handleApply}>
            Apply & Start
          </button>
        </div>
      </div>
    </div>
  );
}
