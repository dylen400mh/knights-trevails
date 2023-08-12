# Knight Moves

## Overview

This project implements a function that finds the shortest path for a knight on a chessboard to move from one square to another, while outputting all the squares the knight will stop on along the way.
Given a starting square `[x1, y1]` and an ending square `[x2, y2]`, the `knightMoves` function calculates the shortest path that the knight can take to move from the starting square to the ending square.

## How to Run

1. Clone or download this repository.
2. Open your terminal and navigate to the project directory.
3. In your JavaScript code, import the `knightMoves` function from the appropriate file.
5. Use the `knightMoves` function by passing the starting and ending squares as arguments, like so:

```javascript
const knightMoves = require('./knightMoves'); // Replace with your actual file path

console.log(knightMoves([0,0], [1,2])); // Output: [[0,0],[1,2]]

## Notes
This project uses Breadth-First Search (BFS) to find the shortest path.
The implementation ensures that all knight moves stay within the bounds of the chessboard.
