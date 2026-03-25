import { useEffect, useRef, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import './DocumentArea.css';

export default function DocumentArea() {
  const { state, startNewTest, handleKeyPress, handleBackspace } = useGame();
  const containerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);

  // Auto-start test on mount if idle
  useEffect(() => {
    if (state.status === 'idle') {
      startNewTest();
    }
  }, []);

  // Focus the hidden input when clicking the document
  const focusInput = useCallback(() => {
    textAreaRef.current?.focus();
  }, []);

  // Auto-scroll to keep the active character visible
  useEffect(() => {
    if (activeCharRef.current && containerRef.current) {
      const charRect = activeCharRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      // If cursor is below visible area, scroll down
      if (charRect.bottom > containerRect.bottom - 100) {
        containerRef.current.scrollTop += charRect.bottom - containerRect.bottom + 150;
      }
    }
  }, [state.currentIndex]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Prevent default browser behavior for typing
    if (e.key === 'Tab') {
      e.preventDefault();
      return;
    }

    if (state.status === 'finished') return;

    if (e.key === 'Backspace') {
      e.preventDefault();
      handleBackspace();
      return;
    }

    // Only handle printable characters
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      handleKeyPress(e.key);
    }
  }, [state.status, handleKeyPress, handleBackspace]);

  const getTimeDisplay = () => {
    if (state.config.mode === 'time') {
      const remaining = Math.max(0, state.config.timeDuration - Math.floor(state.elapsedTime));
      return remaining;
    }
    return Math.floor(state.elapsedTime);
  };

  const renderText = () => {
    if (!state.chars.length) return null;

    // For time mode, show a window of text around current position
    const visibleChars = state.chars;

    return visibleChars.map((charState, idx) => {
      const isCurrent = idx === state.currentIndex;
      let className = 'char';

      switch (charState.status) {
        case 'correct':
          className += ' correct';
          break;
        case 'incorrect':
          className += ' incorrect';
          break;
        case 'pending':
          className += ' pending';
          break;
      }

      if (isCurrent) {
        className += ' current';
      }

      return (
        <span
          key={idx}
          className={className}
          ref={isCurrent ? activeCharRef : undefined}
        >
          {charState.char === ' ' ? '\u00A0' : charState.char}
          {isCurrent && <span className="cursor" />}
        </span>
      );
    });
  };

  return (
    <div className="document-wrapper" ref={containerRef} onClick={focusInput}>
      <div className="document-page">
        <textarea
          ref={textAreaRef}
          className="hidden-input"
          onKeyDown={handleKeyDown}
          autoFocus
          aria-label="Type here"
        />

        {state.status === 'idle' ? (
          <div className="start-prompt">
            <p className="start-text">Click here and start typing to begin the test...</p>
          </div>
        ) : (
          <>
            {state.status === 'running' && state.config.mode === 'time' && (
              <div className="time-indicator">{getTimeDisplay()}</div>
            )}
            <div className="typing-text">
              {renderText()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
