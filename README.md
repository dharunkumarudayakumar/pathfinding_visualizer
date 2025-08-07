# Pathfinding Visualizer

A React-based interactive pathfinding algorithm visualizer that allows users to visualize different pathfinding algorithms on a 2D grid.

## Features

- **Interactive 2D Grid**: 25x50 grid where users can create walls by clicking on nodes
- **Multiple Algorithms**: Supports DFS (Depth-First Search), BFS (Breadth-First Search), and A* algorithms
- **Real-time Visualization**: Watch the algorithms explore the grid step by step with color-coded nodes
- **Responsive Design**: Built with Tailwind CSS for a modern, responsive interface
- **TypeScript**: Fully typed for better development experience

## Color Coding

- 🟢 **Green**: Start Node
- 🔴 **Red**: End Node
- 🔵 **Blue**: Visited Nodes (shows the search process)
- 🟡 **Yellow**: Path (optimal route found)
- ⚫ **Black**: Walls (obstacles)
- ⚪ **White**: Empty nodes

## Algorithms

### DFS (Depth-First Search)
- Uses a stack-based approach
- Explores as far as possible along each branch before backtracking
- May not find the shortest path

### BFS (Breadth-First Search)
- Uses a queue-based approach
- Explores all nodes at the current depth before moving to the next level
- Guarantees the shortest path (in terms of number of steps)

### A* (A-Star)
- Uses heuristic-based search with Manhattan distance
- Combines the cost to reach a node with an estimate of the cost to reach the goal
- Generally finds the shortest path efficiently

## Installation

1. **Clone the repository** (if applicable) or navigate to the project directory
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Dependencies

### Core Dependencies
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `react-scripts`: 5.0.1
- `typescript`: ^4.9.5

### Development Dependencies
- `tailwindcss`: ^3.3.6
- `postcss`: ^8.4.32
- `autoprefixer`: ^10.4.16

## Usage

1. **Select an Algorithm**: Choose between DFS, BFS, or A* from the control panel
2. **Create Walls**: Click on any white node to create a wall (black node)
3. **Start Visualization**: Click "Start Visualization" to see the algorithm in action
4. **Clear Options**: Use "Clear Path" to remove the current path or "Clear Grid" to reset everything

## Project Structure

```
src/
├── components/
│   ├── Controls.tsx      # Algorithm selection and control buttons
│   ├── Grid.tsx          # Main grid component
│   └── Node.tsx          # Individual node component
├── types/
│   └── index.ts          # TypeScript type definitions
├── utils/
│   ├── algorithms.ts     # Pathfinding algorithm implementations
│   └── gridUtils.ts      # Grid utility functions
├── App.tsx               # Main application component
├── App.css               # Additional styles
└── index.css             # Tailwind CSS imports
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm run eject`: Ejects from Create React App (not recommended)

## Browser Support

The app is built with modern React and should work in all modern browsers that support ES6+ features.

## Contributing

Feel free to contribute to this project by:
- Adding new pathfinding algorithms
- Improving the UI/UX
- Adding new features like different grid sizes
- Optimizing performance
- Adding unit tests

## License

This project is open source and available under the MIT License. 