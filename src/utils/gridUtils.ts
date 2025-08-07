import { Node } from '../types';

export const createNode = (row: number, col: number): Node => ({
  row,
  col,
  isStart: false,
  isEnd: false,
  isWall: false,
  isVisited: false,
  isPath: false,
  distance: Infinity,
  fScore: Infinity,
  gScore: Infinity,
  hScore: 0,
  previousNode: null,
});

export const createGrid = (rows: number, cols: number): Node[][] => {
  const grid: Node[][] = [];
  
  for (let row = 0; row < rows; row++) {
    const currentRow: Node[] = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }

  // Set start and end nodes
  const startRow = Math.floor(rows / 2);
  const startCol = Math.floor(cols / 4);
  const endRow = Math.floor(rows / 2);
  const endCol = Math.floor((3 * cols) / 4);

  grid[startRow][startCol].isStart = true;
  grid[endRow][endCol].isEnd = true;

  return grid;
};

export const getStartNode = (grid: Node[][]): Node | null => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col].isStart) {
        return grid[row][col];
      }
    }
  }
  return null;
};

export const getEndNode = (grid: Node[][]): Node | null => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col].isEnd) {
        return grid[row][col];
      }
    }
  }
  return null;
};

export const clearGrid = (grid: Node[][]): Node[][] => {
  const newGrid = grid.map(row =>
    row.map(node => ({
      ...node,
      isVisited: false,
      isPath: false,
      distance: Infinity,
      fScore: Infinity,
      gScore: Infinity,
      hScore: 0,
      previousNode: null,
    }))
  );
  return newGrid;
};

export const clearPath = (grid: Node[][]): Node[][] => {
  const newGrid = grid.map(row =>
    row.map(node => ({
      ...node,
      isVisited: false,
      isPath: false,
      distance: Infinity,
      fScore: Infinity,
      gScore: Infinity,
      hScore: 0,
      previousNode: null,
    }))
  );
  return newGrid;
}; 