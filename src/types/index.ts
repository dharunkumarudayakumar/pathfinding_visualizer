export interface Node {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
  distance: number;
  fScore: number;
  gScore: number;
  hScore: number;
  previousNode: Node | null;
}

export type Algorithm = 'dfs' | 'bfs' | 'astar';

export interface GridProps {
  grid: Node[][];
  onNodeClick: (row: number, col: number) => void;
  isVisualizing: boolean;
}

export interface ControlsProps {
  onAlgorithmChange: (algorithm: Algorithm) => void;
  onStartVisualization: () => void;
  onClearGrid: () => void;
  onClearPath: () => void;
  selectedAlgorithm: Algorithm;
  isVisualizing: boolean;
} 