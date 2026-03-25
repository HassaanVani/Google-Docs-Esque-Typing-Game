import { createContext, useContext, useReducer, useCallback, useRef, useEffect, type ReactNode } from 'react';
import type { GameState, GameAction, TestConfig, CharState } from '../types';
import { generateWords, generateTimedWords } from '../data/words';
import { getRandomQuote } from '../data/quotes';

const defaultConfig: TestConfig = {
  mode: 'time',
  timeDuration: 30,
  wordCount: 25,
  customText: '',
  soundEnabled: false,
};

const initialState: GameState = {
  config: defaultConfig,
  status: 'idle',
  text: '',
  chars: [],
  currentIndex: 0,
  startTime: null,
  endTime: null,
  elapsedTime: 0,
  wpm: 0,
  rawWpm: 0,
  accuracy: 100,
  correctChars: 0,
  incorrectChars: 0,
  extraChars: 0,
  wpmHistory: [],
  result: null,
};

function calculateWpm(correctChars: number, elapsedSeconds: number): number {
  if (elapsedSeconds === 0) return 0;
  return Math.round((correctChars / 5) / (elapsedSeconds / 60));
}

function calculateRawWpm(totalChars: number, elapsedSeconds: number): number {
  if (elapsedSeconds === 0) return 0;
  return Math.round((totalChars / 5) / (elapsedSeconds / 60));
}

function calculateConsistency(wpmHistory: number[]): number {
  if (wpmHistory.length < 2) return 100;
  const mean = wpmHistory.reduce((a, b) => a + b, 0) / wpmHistory.length;
  const variance = wpmHistory.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / wpmHistory.length;
  const stdDev = Math.sqrt(variance);
  const cv = mean > 0 ? (stdDev / mean) * 100 : 0;
  return Math.max(0, Math.round(100 - cv));
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_CONFIG':
      return { ...state, config: { ...state.config, ...action.payload } };

    case 'START_TEST': {
      const chars: CharState[] = action.payload.text.split('').map(char => ({
        char,
        status: 'pending' as const,
      }));
      return {
        ...state,
        status: 'running',
        text: action.payload.text,
        chars,
        currentIndex: 0,
        startTime: Date.now(),
        endTime: null,
        elapsedTime: 0,
        wpm: 0,
        rawWpm: 0,
        accuracy: 100,
        correctChars: 0,
        incorrectChars: 0,
        extraChars: 0,
        wpmHistory: [],
        result: null,
      };
    }

    case 'TYPE_CHAR': {
      if (state.status !== 'running' || state.currentIndex >= state.chars.length) return state;

      const newChars = [...state.chars];
      const expected = newChars[state.currentIndex].char;
      const typed = action.payload.char;
      const isCorrect = expected === typed;

      newChars[state.currentIndex] = {
        ...newChars[state.currentIndex],
        status: isCorrect ? 'correct' : 'incorrect',
      };

      const newIndex = state.currentIndex + 1;
      const correctChars = state.correctChars + (isCorrect ? 1 : 0);
      const incorrectChars = state.incorrectChars + (isCorrect ? 0 : 1);
      const totalTyped = correctChars + incorrectChars;
      const elapsedSeconds = state.elapsedTime;
      const wpm = calculateWpm(correctChars, elapsedSeconds);
      const rawWpm = calculateRawWpm(totalTyped, elapsedSeconds);
      const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;

      // Check if test is complete (words/quote/custom mode)
      const isComplete = newIndex >= newChars.length;

      if (isComplete) {
        const finalElapsed = state.elapsedTime || ((Date.now() - (state.startTime || Date.now())) / 1000);
        const finalWpm = calculateWpm(correctChars, finalElapsed);
        const finalRawWpm = calculateRawWpm(totalTyped, finalElapsed);
        const missedChars = newChars.filter(c => c.status === 'pending').length;

        return {
          ...state,
          chars: newChars,
          currentIndex: newIndex,
          correctChars,
          incorrectChars,
          wpm: finalWpm,
          rawWpm: finalRawWpm,
          accuracy,
          status: 'finished',
          endTime: Date.now(),
          elapsedTime: finalElapsed,
          result: {
            wpm: finalWpm,
            rawWpm: finalRawWpm,
            accuracy,
            correctChars,
            incorrectChars,
            extraChars: state.extraChars,
            missedChars,
            totalChars: newChars.length,
            time: Math.round(finalElapsed),
            mode: state.config.mode,
            consistency: calculateConsistency([...state.wpmHistory, finalWpm]),
          },
        };
      }

      return {
        ...state,
        chars: newChars,
        currentIndex: newIndex,
        correctChars,
        incorrectChars,
        wpm,
        rawWpm,
        accuracy,
      };
    }

    case 'BACKSPACE': {
      if (state.status !== 'running' || state.currentIndex <= 0) return state;

      const newChars = [...state.chars];
      const prevIndex = state.currentIndex - 1;
      const wasCorrect = newChars[prevIndex].status === 'correct';

      newChars[prevIndex] = {
        ...newChars[prevIndex],
        status: 'pending',
      };

      const correctChars = state.correctChars - (wasCorrect ? 1 : 0);
      const incorrectChars = state.incorrectChars - (wasCorrect ? 0 : 1);
      const totalTyped = correctChars + incorrectChars;
      const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;

      return {
        ...state,
        chars: newChars,
        currentIndex: prevIndex,
        correctChars,
        incorrectChars,
        accuracy,
      };
    }

    case 'TICK': {
      if (state.status !== 'running' || !state.startTime) return state;

      const elapsedTime = (Date.now() - state.startTime) / 1000;
      const wpm = calculateWpm(state.correctChars, elapsedTime);
      const rawWpm = calculateRawWpm(state.correctChars + state.incorrectChars, elapsedTime);

      // Record WPM every second
      const newHistory = [...state.wpmHistory];
      if (Math.floor(elapsedTime) > newHistory.length && wpm > 0) {
        newHistory.push(wpm);
      }

      // Check time limit for time mode
      if (state.config.mode === 'time' && elapsedTime >= state.config.timeDuration) {
        const totalTyped = state.correctChars + state.incorrectChars;
        const accuracy = totalTyped > 0 ? Math.round((state.correctChars / totalTyped) * 100) : 100;
        const missedChars = state.chars.filter(c => c.status === 'pending').length;

        return {
          ...state,
          status: 'finished',
          endTime: Date.now(),
          elapsedTime: state.config.timeDuration,
          wpm,
          rawWpm,
          wpmHistory: newHistory,
          result: {
            wpm,
            rawWpm,
            accuracy,
            correctChars: state.correctChars,
            incorrectChars: state.incorrectChars,
            extraChars: state.extraChars,
            missedChars,
            totalChars: state.chars.length,
            time: state.config.timeDuration,
            mode: state.config.mode,
            consistency: calculateConsistency(newHistory),
          },
        };
      }

      return {
        ...state,
        elapsedTime,
        wpm,
        rawWpm,
        wpmHistory: newHistory,
      };
    }

    case 'FINISH_TEST': {
      if (state.status !== 'running') return state;
      const elapsedTime = state.startTime ? (Date.now() - state.startTime) / 1000 : 0;
      const totalTyped = state.correctChars + state.incorrectChars;
      const accuracy = totalTyped > 0 ? Math.round((state.correctChars / totalTyped) * 100) : 100;
      const wpm = calculateWpm(state.correctChars, elapsedTime);
      const rawWpm = calculateRawWpm(totalTyped, elapsedTime);
      const missedChars = state.chars.filter(c => c.status === 'pending').length;

      return {
        ...state,
        status: 'finished',
        endTime: Date.now(),
        elapsedTime,
        wpm,
        rawWpm,
        result: {
          wpm, rawWpm, accuracy,
          correctChars: state.correctChars,
          incorrectChars: state.incorrectChars,
          extraChars: state.extraChars,
          missedChars,
          totalChars: state.chars.length,
          time: Math.round(elapsedTime),
          mode: state.config.mode,
          consistency: calculateConsistency(state.wpmHistory),
        },
      };
    }

    case 'RESET':
      return { ...initialState, config: state.config };

    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  startNewTest: () => void;
  handleKeyPress: (char: string) => void;
  handleBackspace: () => void;
  resetTest: () => void;
  updateConfig: (config: Partial<TestConfig>) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const timerRef = useRef<number | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  // Preload click sound
  useEffect(() => {
    clickSoundRef.current = new Audio('data:audio/wav;base64,UklGRl4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToAAABkAGQAZABkADIAMgAyADIAAAAAAAAAAAAAAAAA0v/S/9L/0v+k/6T/pP+k/9L/0v/S/9L/AAAAAAAAAAA=');
    clickSoundRef.current.volume = 0.3;
  }, []);

  const playClickSound = useCallback(() => {
    if (state.config.soundEnabled && clickSoundRef.current) {
      const sound = clickSoundRef.current.cloneNode() as HTMLAudioElement;
      sound.volume = 0.3;
      sound.play().catch(() => {});
    }
  }, [state.config.soundEnabled]);

  const getTestText = useCallback(() => {
    switch (state.config.mode) {
      case 'time':
        return generateTimedWords();
      case 'words':
        return generateWords(state.config.wordCount);
      case 'quote':
        return getRandomQuote().text;
      case 'custom':
        return state.config.customText || generateWords(25);
      default:
        return generateWords(25);
    }
  }, [state.config]);

  const startNewTest = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    const text = getTestText();
    dispatch({ type: 'START_TEST', payload: { text } });
  }, [getTestText]);

  // Timer effect
  useEffect(() => {
    if (state.status === 'running') {
      timerRef.current = window.setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.status]);

  const handleKeyPress = useCallback((char: string) => {
    playClickSound();
    dispatch({ type: 'TYPE_CHAR', payload: { char } });
  }, [playClickSound]);

  const handleBackspace = useCallback(() => {
    dispatch({ type: 'BACKSPACE' });
  }, []);

  const resetTest = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    dispatch({ type: 'RESET' });
  }, []);

  const updateConfig = useCallback((config: Partial<TestConfig>) => {
    dispatch({ type: 'SET_CONFIG', payload: config });
  }, []);

  return (
    <GameContext.Provider value={{
      state,
      dispatch,
      startNewTest,
      handleKeyPress,
      handleBackspace,
      resetTest,
      updateConfig,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
