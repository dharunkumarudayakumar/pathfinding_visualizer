import React from 'react';
import { ControlsProps, Algorithm } from '../types';

const Controls: React.FC<ControlsProps> = ({
  onAlgorithmChange,
  onStartVisualization,
  onClearGrid,
  onClearPath,
  selectedAlgorithm,
  isVisualizing,
}) => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800">Pathfinding Visualizer</h2>
      
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700">Select Algorithm:</label>
        <div className="flex space-x-2">
          {(['dfs', 'bfs', 'astar'] as Algorithm[]).map((algorithm) => (
            <button
              key={algorithm}
              onClick={() => onAlgorithmChange(algorithm)}
              disabled={isVisualizing}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedAlgorithm === algorithm
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              } ${isVisualizing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {algorithm.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={onStartVisualization}
          disabled={isVisualizing}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            isVisualizing
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isVisualizing ? 'Visualizing...' : 'Start Visualization'}
        </button>
        
        <button
          onClick={onClearPath}
          disabled={isVisualizing}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            isVisualizing
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-yellow-600 text-white hover:bg-yellow-700'
          }`}
        >
          Clear Path
        </button>
        
        <button
          onClick={onClearGrid}
          disabled={isVisualizing}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            isVisualizing
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          Clear Grid
        </button>
      </div>

      <div className="text-sm text-gray-600 text-center max-w-md">
        <p><strong>Instructions:</strong></p>
        <p>• Click on nodes to create walls</p>
        <p>• Green = Start Node, Red = End Node</p>
        <p>• Blue = Visited Nodes, Yellow = Path</p>
        <p>• Select an algorithm and click "Start Visualization"</p>
      </div>
    </div>
  );
};

export default Controls; 