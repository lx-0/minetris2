import { useState, useCallback } from 'react';
import { HighScore } from '../types';

const STORAGE_KEY = 'minetris_highscores';
const MAX_SCORES = 5;

const loadScores = (): HighScore[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HighScore[];
  } catch {
    return [];
  }
};

const saveScores = (scores: HighScore[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
};

export const useHighScores = () => {
  const [highScores, setHighScores] = useState<HighScore[]>(loadScores);
  // Index of the current session's score in the high scores list, or null
  const [sessionRank, setSessionRank] = useState<number | null>(null);

  const addScore = useCallback((points: number, lines: number, level: number) => {
    const newEntry: HighScore = {
      points,
      lines,
      level,
      date: new Date().toLocaleDateString(),
    };

    setHighScores((prev) => {
      const updated = [...prev, newEntry]
        .sort((a, b) => b.points - a.points)
        .slice(0, MAX_SCORES);

      const rank = updated.findIndex((s) => s === newEntry);
      setSessionRank(rank >= 0 ? rank : null);
      saveScores(updated);
      return updated;
    });
  }, []);

  const clearSessionRank = useCallback(() => setSessionRank(null), []);

  return { highScores, sessionRank, addScore, clearSessionRank };
};
