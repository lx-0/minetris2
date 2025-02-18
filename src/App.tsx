import React, { useState, useEffect, useCallback } from 'react';
import { GameBoard } from './components/GameBoard';
import { GameControls } from './components/GameControls';
import { useGameState } from './hooks/useGameState';
import { Bomb, Skull, Trophy } from 'lucide-react';

function App() {
  const {
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
    resetGame
  } = useGameState();

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (isGameOver) return;
    
    switch (event.key) {
      case 'ArrowLeft':
        movePiece('left');
        break;
      case 'ArrowRight':
        movePiece('right');
        break;
      case 'ArrowDown':
        movePiece('down');
        break;
      case 'ArrowUp':
        rotatePiece();
        break;
      case ' ':
        dropPiece();
        break;
    }
  }, [isGameOver, movePiece, rotatePiece, dropPiece]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-purple-400">MineTris</h1>
          <p className="text-gray-400">Where Minesweeper meets Tetris</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <GameBoard
              board={board}
              currentPiece={currentPiece}
              mines={mines}
              gameState={gameState}
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">Stats</h2>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Trophy className="text-yellow-400" />
                  <span>Score: {score}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bomb className="text-red-400" />
                  <span>Mines: {mines.length}</span>
                </div>
                {isGameOver && (
                  <div className="flex items-center gap-2 text-red-400">
                    <Skull />
                    <span>Game Over!</span>
                  </div>
                )}
              </div>
            </div>

            <GameControls
              onStart={startGame}
              onReset={resetGame}
              isGameOver={isGameOver}
              gameState={gameState}
            />

            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-purple-400">How to Play</h2>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>← → : Move piece</li>
                <li>↑ : Rotate piece</li>
                <li>↓ : Move down</li>
                <li>Space : Drop piece</li>
                <li>Clear lines to reveal mine numbers</li>
                <li>Avoid landing on mines!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;