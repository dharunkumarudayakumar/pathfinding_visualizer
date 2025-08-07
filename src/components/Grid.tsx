import React from 'react';
import Node from './Node';
import { GridProps } from '../types';

const Grid: React.FC<GridProps> = ({ grid, onNodeClick, isVisualizing }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="grid gap-0 border-2 border-gray-400 bg-gray-200 p-1">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-0">
            {row.map((node, colIndex) => (
              <Node
                key={`${rowIndex}-${colIndex}`}
                node={node}
                onNodeClick={onNodeClick}
                isVisualizing={isVisualizing}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid; 