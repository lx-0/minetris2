export type GameState = 'idle' | 'playing' | 'paused' | 'over';
export type BoardType = number[][];
export type PieceType = {
  shape: number[][];
  x: number;
  y: number;
};

export type Difficulty = 'easy' | 'normal' | 'hard';

export type DifficultyConfig = {
  label: string;
  mines: number;
  scoreMultiplier: number;
};

export type HighScore = {
  points: number;
  lines: number;
  level: number;
  date: string;
};
