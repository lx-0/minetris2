export const PIECES = [
  // I piece
  [[0, 0], [0, 1], [0, 2], [0, 3]],
  // O piece
  [[0, 0], [1, 0], [0, 1], [1, 1]],
  // T piece
  [[0, 0], [-1, 0], [1, 0], [0, 1]],
  // L piece
  [[0, 0], [0, 1], [0, 2], [1, 2]],
  // J piece
  [[0, 0], [0, 1], [0, 2], [-1, 2]],
  // S piece
  [[0, 0], [1, 0], [0, 1], [-1, 1]],
  // Z piece
  [[0, 0], [-1, 0], [0, 1], [1, 1]],
];

export const createEmptyBoard = () => {
  return Array(20).fill(null).map(() => Array(10).fill(0));
};

export const generateMines = () => {
  const mines: number[] = [];
  const totalCells = 200; // 20 x 10 board
  const mineCount = 20; // Adjust difficulty by changing this number

  while (mines.length < mineCount) {
    const position = Math.floor(Math.random() * totalCells);
    if (!mines.includes(position)) {
      mines.push(position);
    }
  }

  return mines;
};