import React from 'react';
import { Cell } from './Cell';
import { GameState, BoardType, PieceType } from '../types';

interface GameBoardProps {
  board: BoardType;
  currentPiece: PieceType | null;
  mines: number[];
  gameState: GameState;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  currentPiece,
  mines,
  gameState
}) => {
  return (
    <div className="grid grid-cols-10 gap-px bg-gray-700 p-px">
      {board.map((row, y) =>
        row.map((cell, x) => (
          <Cell
            key={`${x}-${y}`}
            value={cell}
            isActive={currentPiece?.shape.some(
              ([pieceX, pieceY]) =>
                x === currentPiece.x + pieceX && y === currentPiece.y + pieceY
            )}
            isMine={mines.includes(y * 10 + x)}
            isRevealed={gameState === 'over'}
          />
        ))
      )}
    </div>
  );
};