import React from 'react';
import { Bomb } from 'lucide-react';

interface CellProps {
  value: number;
  isActive: boolean;
  isMine: boolean;
  isRevealed: boolean;
}

export const Cell: React.FC<CellProps> = ({ value, isActive, isMine, isRevealed }) => {
  const getBgColor = () => {
    if (isActive) return 'bg-purple-500';
    if (value === 0) return 'bg-gray-800';
    if (isRevealed && isMine) return 'bg-red-500';
    return 'bg-purple-700';
  };

  const getContent = () => {
    if (isRevealed && isMine) return <Bomb className="w-4 h-4" />;
    if (value > 0 && !isActive) return value;
    return null;
  };

  return (
    <div
      className={`w-8 h-8 flex items-center justify-center text-sm font-bold ${getBgColor()} 
        ${value > 0 ? 'text-white' : ''} transition-colors duration-150`}
    >
      {getContent()}
    </div>
  );
};