import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useGame } from '../context/GameContext';
import './DocumentArea.css';

export default function DocumentArea() {
  const { state, startNewTest, handleKeyPress, handleBackspace, resetTest } = useGame();
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

      if (charRect.bottom > containerRect.bottom - 100) {
        containerRef.current.scrollTop += charRect.bottom - containerRect.bottom + 150;
      }
    }
  }, [state.currentIndex]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Tab = quick reset
    if (e.key === 'Tab') {
      e.preventDefault();
      resetTest();
      setTimeout(startNewTest, 50);
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
  }, [state.status, handleKeyPress, handleBackspace, resetTest, startNewTest]);

  const getTimeDisplay = () => {
    if (state.config.mode === 'time') {
      return Math.max(0, state.config.timeDuration - Math.floor(state.elapsedTime));
    }
    return Math.floor(state.elapsedTime);
  };

  // Group characters into words so the browser wraps at word boundaries
  const wordElements = useMemo(() => {
    if (!state.chars.length) return null;

    const words: { startIdx: number; chars: typeof state.chars }[] = [];
    let currentWord: typeof state.chars = [];
    let wordStart = 0;

    state.chars.forEach((charState, idx) => {
      if (charState.char === ' ') {
        if (currentWord.length > 0) {
          words.push({ startIdx: wordStart, chars: currentWord });
          currentWord = [];
        }
        // Push space as its own "word"
        words.push({ startIdx: idx, chars: [charState] });
        wordStart = idx + 1;
      } else {
        if (currentWord.length === 0) wordStart = idx;
        currentWord.push(charState);
      }
    });
    if (currentWord.length > 0) {
      words.push({ startIdx: wordStart, chars: currentWord });
    }

    let globalIdx = 0;
    return words.map((word, wIdx) => {
      const isSpace = word.chars.length === 1 && word.chars[0].char === ' ';

      const charSpans = word.chars.map((charState) => {
        const idx = globalIdx++;
        const isCurrent = idx === state.currentIndex;
        let className = 'char';

        switch (charState.status) {
          case 'correct': className += ' correct'; break;
          case 'incorrect': className += ' incorrect'; break;
          case 'pending': className += ' pending'; break;
        }
        if (isCurrent) className += ' current';

        return (
          <span
            key={idx}
            className={className}
            ref={isCurrent ? activeCharRef : undefined}
          >
            {isSpace ? ' ' : charState.char}
            {isCurrent && <span className="cursor" />}
          </span>
        );
      });

      if (isSpace) {
        return <span key={`s-${wIdx}`} className="word-space">{charSpans}</span>;
      }
      return <span key={`w-${wIdx}`} className="word">{charSpans}</span>;
    });
  }, [state.chars, state.currentIndex]);

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
              {wordElements}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
