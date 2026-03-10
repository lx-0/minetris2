import { Trophy } from 'lucide-react';
import { HighScore } from '../types';

interface Props {
  scores: HighScore[];
  sessionRank: number | null;
}

export const HighScoresPanel = ({ scores, sessionRank }: Props) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-3 text-purple-400 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-400" />
        High Scores
      </h2>
      {scores.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No scores yet</p>
      ) : (
        <ol className="space-y-2">
          {scores.map((s, i) => (
            <li
              key={i}
              className={`text-sm flex justify-between items-center rounded px-2 py-1 ${
                i === sessionRank ? 'bg-purple-700/40 text-white font-bold' : 'text-gray-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-gray-500 w-4 text-right">{i + 1}.</span>
                <span>{s.points.toLocaleString()}</span>
              </span>
              <span className="text-xs text-gray-400">
                Lv{s.level + 1} · {s.lines}L · {s.date}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
