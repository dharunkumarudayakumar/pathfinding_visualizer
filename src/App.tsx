import React, { useState, useCallback } from 'react';
import Grid from './components/Grid';
import Controls from './components/Controls';
import { Node, Algorithm } from './types';
import { createGrid, getStartNode, getEndNode, clearGrid, clearPath } from './utils/gridUtils';
import { dfs, bfs, astar } from './utils/algorithms';
import './App.css';

const GRID_ROWS = 25;
const GRID_COLS = 50;

function App() {
  const [grid, setGrid] = useState<Node[][]>(() => createGrid(GRID_ROWS, GRID_COLS));
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>('bfs');
  const [isVisualizing, setIsVisualizing] = useState(false);

  const handleNodeClick = useCallback((row: number, col: number) => {
    if (isVisualizing) return;

    setGrid(prevGrid => {
      const newGrid = prevGrid.map(rowArray =>
        rowArray.map(node => ({ ...node }))
      );
      
      const clickedNode = newGrid[row][col];
      
      // Don't allow walls on start or end nodes
      if (clickedNode.isStart || clickedNode.isEnd) {
        return newGrid;
      }
      
      clickedNode.isWall = !clickedNode.isWall;
      return newGrid;
    });
  }, [isVisualizing]);

  const handleAlgorithmChange = useCallback((algorithm: Algorithm) => {
    setSelectedAlgorithm(algorithm);
  }, []);

  const visualizeAlgorithm = useCallback(async () => {
    setIsVisualizing(true);
    
    const startNode = getStartNode(grid);
    const endNode = getEndNode(grid);
    
    if (!startNode || !endNode) {
      setIsVisualizing(false);
      return;
    }

    // Clear previous visualization
    setGrid(prevGrid => clearPath(prevGrid));

    let result: { visitedNodes: Node[], path: Node[] };

    switch (selectedAlgorithm) {
      case 'dfs':
        result = dfs(grid, startNode, endNode);
        break;
      case 'bfs':
        result = bfs(grid, startNode, endNode);
        break;
      case 'astar':
        result = astar(grid, startNode, endNode);
        break;
      default:
        result = { visitedNodes: [], path: [] };
    }

    // Animate visited nodes
    for (let i = 0; i < result.visitedNodes.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 10));
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(rowArray =>
          rowArray.map(node => ({ ...node }))
        );
        const visitedNode = result.visitedNodes[i];
        newGrid[visitedNode.row][visitedNode.col].isVisited = true;
        return newGrid;
      });
    }

    // Animate path
    if (result.path.length > 0) {
      for (let i = 0; i < result.path.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setGrid(prevGrid => {
          const newGrid = prevGrid.map(rowArray =>
            rowArray.map(node => ({ ...node }))
          );
          const pathNode = result.path[i];
          newGrid[pathNode.row][pathNode.col].isPath = true;
          return newGrid;
        });
      }
    }

    setIsVisualizing(false);
  }, [grid, selectedAlgorithm]);

  const handleClearGrid = useCallback(() => {
    if (isVisualizing) return;
    setGrid(createGrid(GRID_ROWS, GRID_COLS));
  }, [isVisualizing]);

  const handleClearPath = useCallback(() => {
    if (isVisualizing) return;
    setGrid(prevGrid => clearPath(prevGrid));
  }, [isVisualizing]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <Controls
              onAlgorithmChange={handleAlgorithmChange}
              onStartVisualization={visualizeAlgorithm}
              onClearGrid={handleClearGrid}
              onClearPath={handleClearPath}
              selectedAlgorithm={selectedAlgorithm}
              isVisualizing={isVisualizing}
            />
          </div>
          <div className="lg:w-3/4">
            <Grid
              grid={grid}
              onNodeClick={handleNodeClick}
              isVisualizing={isVisualizing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 