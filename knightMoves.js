// Possible knight move offsets
const moveOffsets = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];

// keeps track of best path to end position 
let bestMove = { moves: Infinity }

// Helper function that checks if a position is on an 8x8 board
function onBoard(position) {
    const [row, col] = position;

    return (row >= 0 && row < 8 && col >= 0 && col < 8)
}

export default function knightMoves(start, end, queue = [], visited = new Set(), moves = 0, path = [start]) {

    // construct object for current move
    let move = {
        position: start,
        moves: moves,
        path: path,
    }

    // mark move as visited
    visited.add(move.position)

    // If the position is reached, check if it is the shortest path and update accordingly
    if (start === end) {
        if (move.moves < bestMove.moves) bestMove = move;
    }

    // check each possible move and add to queue if on board and not visited
    for (const offset of moveOffsets) {
        const newX = start[0] + offset[0];
        const newY = start[1] + offset[1];

        // add move to queue if on board and not visited
        if (onBoard([newX, newY]) && !visited.has([newX, newY])) {

            // creates new move with a position, moves to reach it, and its path
            const newMove = {
                position: [newX, newY],
                moves: move.moves + 1,
                path: [...move.path, [newX, newY]]
            }

            // add move to queue
            queue.push(newMove)
        }
    }

    // get next move while queue is not empty
    while (queue.length !== 0) {
        const nextMove = queue.shift();

        // recursively call knightMoves function on next move in queue
        knightMoves(nextMove.position, end, queue, visited, nextMove.moves, nextMove.path)
    }

    // prints ending outcome
    console.log(`You made it in ${bestMove.moves} moves! Here's your path:`)
    for (const position of bestMove.path) console.log(position)
}