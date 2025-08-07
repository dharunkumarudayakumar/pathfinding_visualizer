import { Node } from '../types';

// Helper function to get neighbors of a node
const getNeighbors = (node: Node, grid: Node[][]): Node[] => {
  const neighbors: Node[] = [];
  const { row, col } = node;
  const directions = [
    [-1, 0], // up
    [1, 0],  // down
    [0, -1], // left
    [0, 1]   // right
  ];

  for (const [dRow, dCol] of directions) {
    const newRow = row + dRow;
    const newCol = col + dCol;

    if (
      newRow >= 0 && 
      newRow < grid.length && 
      newCol >= 0 && 
      newCol < grid[0].length && 
      !grid[newRow][newCol].isWall
    ) {
      neighbors.push(grid[newRow][newCol]);
    }
  }

  return neighbors;
};

// Helper function to calculate Manhattan distance
const calculateManhattanDistance = (node: Node, endNode: Node): number => {
  return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
};

// Helper function to get the path from end to start
const getPath = (endNode: Node): Node[] => {
  const path: Node[] = [];
  let currentNode: Node | null = endNode;

  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return path;
};

// Depth First Search
export const dfs = (grid: Node[][], startNode: Node, endNode: Node): { visitedNodes: Node[], path: Node[] } => {
  const visitedNodes: Node[] = [];
  const stack: Node[] = [startNode];
  const visited = new Set<string>();

  // Reset all nodes
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      grid[row][col].isVisited = false;
      grid[row][col].isPath = false;
      grid[row][col].previousNode = null;
    }
  }

  while (stack.length > 0) {
    const currentNode = stack.pop()!;
    const key = `${currentNode.row}-${currentNode.col}`;

    if (visited.has(key)) continue;
    visited.add(key);

    currentNode.isVisited = true;
    visitedNodes.push(currentNode);

    if (currentNode === endNode) {
      const path = getPath(endNode);
      return { visitedNodes, path };
    }

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (!visited.has(`${neighbor.row}-${neighbor.col}`)) {
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
      }
    }
  }

  return { visitedNodes, path: [] };
};

// Breadth First Search
export const bfs = (grid: Node[][], startNode: Node, endNode: Node): { visitedNodes: Node[], path: Node[] } => {
  const visitedNodes: Node[] = [];
  const queue: Node[] = [startNode];
  const visited = new Set<string>();

  // Reset all nodes
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      grid[row][col].isVisited = false;
      grid[row][col].isPath = false;
      grid[row][col].previousNode = null;
    }
  }

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    const key = `${currentNode.row}-${currentNode.col}`;

    if (visited.has(key)) continue;
    visited.add(key);

    currentNode.isVisited = true;
    visitedNodes.push(currentNode);

    if (currentNode === endNode) {
      const path = getPath(endNode);
      return { visitedNodes, path };
    }

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (!visited.has(`${neighbor.row}-${neighbor.col}`)) {
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    }
  }

  return { visitedNodes, path: [] };
};

// A* Algorithm
export const astar = (grid: Node[][], startNode: Node, endNode: Node): { visitedNodes: Node[], path: Node[] } => {
  const visitedNodes: Node[] = [];
  const openSet: Node[] = [startNode];
  const closedSet = new Set<string>();

  // Reset all nodes
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      grid[row][col].isVisited = false;
      grid[row][col].isPath = false;
      grid[row][col].previousNode = null;
      grid[row][col].gScore = Infinity;
      grid[row][col].hScore = calculateManhattanDistance(grid[row][col], endNode);
      grid[row][col].fScore = Infinity;
    }
  }

  startNode.gScore = 0;
  startNode.fScore = startNode.hScore;

  while (openSet.length > 0) {
    // Find node with lowest fScore
    let currentNode = openSet[0];
    let currentIndex = 0;
    
    for (let i = 1; i < openSet.length; i++) {
      if (openSet[i].fScore < currentNode.fScore) {
        currentNode = openSet[i];
        currentIndex = i;
      }
    }

    if (currentNode === endNode) {
      const path = getPath(endNode);
      return { visitedNodes, path };
    }

    openSet.splice(currentIndex, 1);
    closedSet.add(`${currentNode.row}-${currentNode.col}`);

    currentNode.isVisited = true;
    visitedNodes.push(currentNode);

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      const key = `${neighbor.row}-${neighbor.col}`;
      
      if (closedSet.has(key)) continue;

      const tentativeGScore = currentNode.gScore + 1;

      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
      } else if (tentativeGScore >= neighbor.gScore) {
        continue;
      }

      neighbor.previousNode = currentNode;
      neighbor.gScore = tentativeGScore;
      neighbor.fScore = neighbor.gScore + neighbor.hScore;
    }
  }

  return { visitedNodes, path: [] };
}; 