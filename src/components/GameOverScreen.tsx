import { Trophy, Layers, TrendingUp, Bomb, Star, RotateCcw, Settings } from 'lucide-react';
import { Difficulty } from '../types';

interface GameOverScreenProps {
  score: number;
  lines: number;
  level: number;
  gameOverReason: 'mine' | 'board_full' | null;
  isNewBest: boolean;
  onPlayAgain: () => void;
  onChangeDifficulty: () => void;
  difficulty: Difficulty;
}

export function GameOverScreen({
  score,
  lines,
  level,
  gameOverReason,
  isNewBest,
  onPlayAgain,
  onChangeDifficulty,
}: GameOverScreenProps) {
  const reasonMessage =
    gameOverReason === 'mine'
      ? 'You hit a mine!'
      : gameOverReason === 'board_full'
      ? 'Board is full!'
      : 'Game over!';

  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-lg backdrop-blur-sm bg-gray-900/80 animate-fade-in z-10">
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-6 w-64 shadow-2xl flex flex-col gap-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-400 tracking-widest mb-1">GAME OVER</h2>
          <p className="text-gray-400 text-sm">{reasonMessage}</p>
        </div>

        {isNewBest && (
          <div className="flex items-center justify-center gap-2 bg-yellow-900/50 border border-yellow-600 rounded-lg py-2 px-3">
            <Star className="text-yellow-400 w-4 h-4 shrink-0 fill-yellow-400" />
            <span className="text-yellow-300 font-bold text-sm">New Personal Best!</span>
          </div>
        )}

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-gray-300">
              <Trophy className="text-yellow-400 w-4 h-4 shrink-0" />
              <span>Score</span>
            </div>
            <span className="font-bold text-white">{score.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-gray-300">
              <Layers className="text-blue-400 w-4 h-4 shrink-0" />
              <span>Lines</span>
            </div>
            <span className="font-bold text-white">{lines}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-gray-300">
              <TrendingUp className="text-green-400 w-4 h-4 shrink-0" />
              <span>Level</span>
            </div>
            <span className="font-bold text-white">{level + 1}</span>
          </div>
          {gameOverReason === 'mine' && (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-gray-300">
                <Bomb className="text-red-400 w-4 h-4 shrink-0" />
                <span>Cause</span>
              </div>
              <span className="font-bold text-red-400">Mine hit</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <button
            onClick={onPlayAgain}
            className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </button>
          <button
            onClick={onChangeDifficulty}
            className="flex items-center justify-center gap-2 w-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            Change Difficulty
          </button>
        </div>
      </div>
    </div>
  );
}
