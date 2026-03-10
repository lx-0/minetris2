import type { FC } from 'react';
import { Difficulty } from '../types';
import { DIFFICULTY_CONFIGS } from '../utils/gameUtils';

interface DifficultySelectorProps {
  selected: Difficulty;
  onChange: (d: Difficulty) => void;
}

const DIFFICULTIES: Difficulty[] = ['easy', 'normal', 'hard'];

export const DifficultySelector: FC<DifficultySelectorProps> = ({ selected, onChange }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-sm font-bold mb-3 text-purple-400 uppercase tracking-wider">Difficulty</h2>
      <div className="flex gap-2">
        {DIFFICULTIES.map((d) => {
          const cfg = DIFFICULTY_CONFIGS[d];
          const isSelected = d === selected;
          return (
            <button
              key={d}
              onClick={() => onChange(d)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-colors ${
                isSelected
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <div>{cfg.label}</div>
              <div className="text-xs font-normal opacity-75">{cfg.mines} mines</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
