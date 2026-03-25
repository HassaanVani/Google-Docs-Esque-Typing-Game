export type TestMode = 'time' | 'words' | 'quote' | 'custom';

export type TimeDuration = 15 | 30 | 60 | 120;
export type WordCount = 10 | 25 | 50 | 100;

export type TestStatus = 'idle' | 'running' | 'finished';

export interface CharState {
  char: string;
  status: 'pending' | 'correct' | 'incorrect' | 'extra';
}

export interface TestConfig {
  mode: TestMode;
  timeDuration: TimeDuration;
  wordCount: WordCount;
  customText: string;
  soundEnabled: boolean;
}

export interface TestResult {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  extraChars: number;
  missedChars: number;
  totalChars: number;
  time: number;
  mode: TestMode;
  consistency: number;
}

export interface GameState {
  config: TestConfig;
  status: TestStatus;
  text: string;
  chars: CharState[];
  currentIndex: number;
  startTime: number | null;
  endTime: number | null;
  elapsedTime: number;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  extraChars: number;
  wpmHistory: number[];
  result: TestResult | null;
}

export type GameAction =
  | { type: 'SET_CONFIG'; payload: Partial<TestConfig> }
  | { type: 'START_TEST'; payload: { text: string } }
  | { type: 'TYPE_CHAR'; payload: { char: string } }
  | { type: 'BACKSPACE' }
  | { type: 'TICK' }
  | { type: 'FINISH_TEST' }
  | { type: 'RESET' };
