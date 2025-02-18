import { useState, useCallback } from 'react';
import { GameState, BoardType, PieceType } from '../types';
import { PIECES, createEmptyBoard, generateMines } from '../utils/gameUtils';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [board, setBoard] = useState<BoardType>(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState<PieceType | null>(null);
  const [mines, setMines] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const isGameOver = gameState === 'over';

  const spawnPiece = useCallback(() => {
    const pieceType = PIECES[Math.floor(Math.random() * PIECES.length)];
    setCurrentPiece({
      shape: pieceType,
      x: 4,
      y: 0,
    });
  }, []);

  const checkCollision = useCallback(
    (piece: PieceType, board: BoardType) => {
      return piece.shape.some(([x, y]) => {
        const newX = piece.x + x;
        const newY = piece.y + y;
        return (
          newX < 0 ||
          newX >= 10 ||
          newY >= 20 ||
          (newY >= 0 && board[newY][newX] !== 0)
        );
      });
    },
    []
  );

  const movePiece = useCallback(
    (direction: 'left' | 'right' | 'down') => {
      if (!currentPiece || isGameOver) return;

      const newPiece = {
        ...currentPiece,
        x: currentPiece.x + (direction === 'left' ? -1 : direction === 'right' ? 1 : 0),
        y: currentPiece.y + (direction === 'down' ? 1 : 0),
      };

      if (!checkCollision(newPiece, board)) {
        setCurrentPiece(newPiece);
      } else if (direction === 'down') {
        // Lock piece
        const newBoard = [...board];
        currentPiece.shape.forEach(([x, y]) => {
          const boardY = currentPiece.y + y;
          const boardX = currentPiece.x + x;
          if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
            newBoard[boardY][boardX] = 1;
          }
        });

        // Check for mine collision
        const hasHitMine = currentPiece.shape.some(([x, y]) => {
          const pos = (currentPiece.y + y) * 10 + (currentPiece.x + x);
          return mines.includes(pos);
        });

        if (hasHitMine) {
          setGameState('over');
        } else {
          setBoard(newBoard);
          spawnPiece();
          setScore(prev => prev + 10);
        }
      }
    },
    [currentPiece, board, mines, isGameOver, checkCollision, spawnPiece]
  );

  const rotatePiece = useCallback(() => {
    if (!currentPiece || isGameOver) return;

    const rotated = currentPiece.shape.map(([x, y]) => [-y, x]);
    const newPiece = { ...currentPiece, shape: rotated };

    if (!checkCollision(newPiece, board)) {
      setCurrentPiece(newPiece);
    }
  }, [currentPiece, board, isGameOver, checkCollision]);

  const dropPiece = useCallback(() => {
    if (!currentPiece || isGameOver) return;

    let newY = currentPiece.y;
    while (!checkCollision({ ...currentPiece, y: newY + 1 }, board)) {
      newY++;
    }
    movePiece('down');
  }, [currentPiece, board, isGameOver, checkCollision, movePiece]);

  const startGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setMines(generateMines());
    setScore(0);
    setGameState('playing');
    spawnPiece();
  }, [spawnPiece]);

  const resetGame = useCallback(() => {
    setGameState('idle');
    setBoard(createEmptyBoard());
    setCurrentPiece(null);
    setScore(0);
  }, []);

  return {
    gameState,
    score,
    isGameOver,
    currentPiece,
    board,
    mines,
    movePiece,
    rotatePiece,
    dropPiece,
    startGame,
    resetGame,
  };
};