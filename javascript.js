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
}
