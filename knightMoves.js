// Helper function that checks if a position is on an 8x8 board
function onBoard(position) {
    const [row, col] = position;

    return (row >= 0 && row < 8 && col >= 0 && col < 8)
}

export default function knightMoves(start, end) {
    // Possible knight move offsets
    const moveOffsets = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];

    let queue = [];
    let visited = new Set();
    let bestMove = { moves: Infinity };

    // add starting position to queue
    queue.push({
        position: start,
        moves: 0,
        path: [start],
    })

    // check moves while queue is not empty
    while (queue.length !== 0) {

        // dequeue next move and deconstruct it
        const move = queue.shift();
        const { position, moves, path } = move;

        // continue to next move in queue if the current move is invalid
        if (!onBoard(position) || visited.has(position.join())) continue;

        // If the position is reached, check if it is the shortest path and update accordingly
        if (position[0] === end[0] && position[1] === end[1]) {
            if (moves < bestMove.moves) {
                bestMove.moves = moves;
                bestMove.path = path;
            }

            continue;
        }

        // check each possible move and add to queue if on board and not visited
        for (const offset of moveOffsets) {
            const newX = position[0] + offset[0];
            const newY = position[1] + offset[1];

            // add move to queue if on board and not visited
            if (onBoard([newX, newY]) && !visited.has([newX, newY].join())) {
                // creates new move with a position, moves to reach it, and its path, then adds to queue
                queue.push({
                    position: [newX, newY],
                    moves: moves + 1,
                    path: [...path, [newX, newY]]
                })
            }
        }

        // mark move as visited after processing
        visited.add(move.position.join())
    }

    // prints ending outcome
    console.log(`You made it in ${bestMove.moves} moves! Here's your path:`);
    for (const position of bestMove.path) console.log(position);
}


// RECURSIVE APPROACH (decided against this due to having scope issues with the bestMove object)

// // Possible knight move offsets
// const moveOffsets = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];

// export default function knightMoves(start, end, queue = [], visited = new Set(), moves = 0, path = [start], bestMove = { moves: Infinity }) {
//     // Base case: Move is not on board or already visited
//     if (!onBoard(start) || visited.has(start.join())) return;

//     // construct object for current move
//     let move = {
//         position: start,
//         moves: moves,
//         path: path,
//     }

//     // If the position is reached, check if it is the shortest path and update accordingly
//     if (start[0] === end[0] && start[1] === end[1]) {
//         if (move.moves < bestMove.moves) bestMove = move;
//         console.log(bestMove)
//         return;
//     }

//     // check each possible move and add to queue if on board and not visited
//     for (const offset of moveOffsets) {
//         const newX = start[0] + offset[0];
//         const newY = start[1] + offset[1];

//         // add move to queue if on board and not visited
//         if (onBoard([newX, newY]) && !visited.has([newX, newY].join())) {

//             // creates new move with a position, moves to reach it, and its path
//             const newMove = {
//                 position: [newX, newY],
//                 moves: move.moves + 1,
//                 path: [...move.path, [newX, newY]]
//             }

//             // add move to queue
//             queue.push(newMove)
//         }
//     }

//     // mark move as visited after processing
//     visited.add(move.position.join())

//     // get next move while queue is not empty
//     while (queue.length !== 0) {
//         const nextMove = queue.shift();

//         // recursively call knightMoves function on next move in queue
//         knightMoves(nextMove.position, end, queue, visited, nextMove.moves, nextMove.path, bestMove)
//     }

//     console.log(bestMove)
//     // prints ending outcome
//     if (start[0] === bestMove.position[0] && start[1] === bestMove.position[1]) {
//         console.log(`You made it in ${bestMove.moves} moves! Here's your path:`);
//         for (const position of bestMove.path) console.log(position);

//     }
// }