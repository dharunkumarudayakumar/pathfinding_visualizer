import React from 'react';
import { Node as NodeType } from '../types';

interface NodeProps {
  node: NodeType;
  onNodeClick: (row: number, col: number) => void;
  isVisualizing: boolean;
}

const Node: React.FC<NodeProps> = ({ node, onNodeClick, isVisualizing }) => {
  const getNodeClassName = () => {
    if (node.isStart) {
      return 'bg-green-500 border-2 border-green-700';
    }
    if (node.isEnd) {
      return 'bg-red-500 border-2 border-red-700';
    }
    if (node.isPath) {
      return 'bg-yellow-400 border-2 border-yellow-600';
    }
    if (node.isVisited) {
      return 'bg-blue-400 border-2 border-blue-600';
    }
    if (node.isWall) {
      return 'bg-gray-800 border-2 border-gray-900';
    }
    return 'bg-white border border-gray-300 hover:bg-gray-100';
  };

  return (
    <div
      className={`w-6 h-6 ${getNodeClassName()} transition-all duration-200 ease-in-out cursor-pointer`}
      onClick={() => !isVisualizing && onNodeClick(node.row, node.col)}
      title={`Row: ${node.row}, Col: ${node.col}`}
    />
  );
};

export default Node; 