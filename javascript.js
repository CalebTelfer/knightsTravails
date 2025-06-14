// Board constraints
/*
        as x,y
[0,7] --------- [7,7]



[0,0] --------- [7,0]

* negative values are out of bounds.
* x and y can not be greater than 7 or its out of bounds.
*/


/* Knight Moves 

8 possible moves

Right side moves
(1) x+2, y + 1;
(2) x+2,  y-1;
(3) x+1, y + 2;
(4) x+1, y - 2;

Left Side moves
(1) x-2, y + 1;
(2) x-2,  y-1;
(3) x-1, y + 2;
(4) x-1, y - 2;

*/

// Perhaps make every board square a node. make it connected to all possible knight moves from that location.

// Call a function with a graph coord, traverse that squares connections to find the shortest possible way to a requested coord.

class Vertex {
    constructor() {
        this.square = [];
        this.knightEdges = [];
    }
}





class Graph {
    constructor() {
        this.squares = new Map(); // key "x,y" value: vertex
    }

    populateGraph() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let square = new Vertex();
                square.square = [i,j];
                this.squares.set(`${i},${j}`, square); //aparrently [i,j] will be a new key every time due to reference. so needs to be a string
            }
        }
    }


    setKnightEdges() {
        this.squares.forEach (square => {
            let moves = this.possibleMoves(square);

            moves.forEach(move => {
                if (this.isInBounds(move)) {
                    const x = move[0];
                    const y = move[1];

                    const moveVertex = this.squares.get(`${x},${y}`);
                    square.knightEdges.push(moveVertex);
                }
            })

        })
    }

    isInBounds(arr) {
        const x = arr[0];
        const y = arr[1];

        if (x > 7 || x < 0 || y > 7 || y < 0) {
            return false;
        } else {
            return true;
        }
    }

    possibleMoves(startingPos) {
        let x = startingPos.square[0];
        let y = startingPos.square[1];

        let moves = [];

        moves.push([x+2, y+1]);
        moves.push([x+2, y-1]);
        moves.push([x+1, y+2]);
        moves.push([x+1, y-2]);

        moves.push([x-2, y+1]);
        moves.push([x-2, y-1]);
        moves.push([x-1, y+2]);
        moves.push([x-1, y-2]);

        return moves;
    }


    knightMoves(start, end) {

        const startX = start[0];
        const startY = start[1];
        const startNode = this.squares.get(`${startX},${startY}`);

        const endX = end[0];
        const endY = end[1];
        const endNode = this.squares.get(`${endX},${endY}`);

        let currentNode = startNode;
        let queue = [];
        let visitedNodes = [currentNode];
        let parentMap = new Map();
        let shortestPath = [];
    

        // must keep track of path until node is found, then return entirety of path finding.
        while (currentNode != endNode) {
            currentNode.knightEdges.forEach(node => {
                // each adjacent node added to queue to explore. if hasn't been visited

                if(!queue.includes(node) && !visitedNodes.includes(node)) {
                    queue.push(node);
                    visitedNodes.push(node);
                    parentMap.set(node, currentNode);
                }
            })

            if (queue.length != 0) {
                currentNode = queue[0];
                queue.splice(0, 1);
            }
            

            if(currentNode == endNode) {
                //loop until visited node start -> pos = endNode.
                let parent = currentNode;
                shortestPath.unshift(parent.square);

                while (parent != startNode) {
                    parent = parentMap.get(parent);
                    shortestPath.unshift(parent.square);
                }
            }
        }

        console.log("The shortest path is...")
        shortestPath.forEach(node => {
            console.log(node);
        })
    }
}



const chessBoard = new Graph();

chessBoard.populateGraph(); // 8x8 board.
chessBoard.setKnightEdges(); // all knight moves from each square stored an array called knightEdges
chessBoard.knightMoves([0,0], [7,7]);