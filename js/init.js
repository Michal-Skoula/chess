let captures = []
let whiteKing = [0,4];
let blackKing = [7,4];
let chessBoard = [
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
];
// TODO: Future plans - make a function that adds to this list of moves automatically, see ipad notes
const moves = {
    'rook': [[+1,0], [-1,0], [0,+1], [0,-1]],
    'knight': [[+2,+1], [+2,-1], [-2,+1], [-2,-1], [+1,+2], [+1,-2], [-1,+2], [-1,-2]],
    'bishop': [[+1,+1], [+1,-1], [-1,+1], [-1,-1]],
    'king': [[+1,0], [-1,0], [0,+1], [0,-1], [+1,+1], [+1,-1], [-1,+1], [-1,-1]],
    'queen': [[+1,0], [-1,0], [0,+1], [0,-1], [+1,+1], [+1,-1], [-1,+1], [-1,-1]],
}

let round = 1; // Increments when a player finishes their turn. odd = white, even = black

/**
 * Builds the chessboard based on the `board` variable.
 */
function setupBoard(board) {

    let id = 1;
    for(let row = 0; row < 8; row++) { // rows

        for(let column = 0; column < 8; column++) { // columns

            let piece = board[row][column];
            let color = row < 4 ? 'white' : 'black'; // top = white, bottom = black
            let type = '';
            let points = 0

            piece = piece.toLowerCase();

            switch(piece) {
                case 'r':
                    type = 'rook';
                    points = 5
                    break;
                case 'n':
                    type = 'knight';
                    points = 3
                    break;
                case 'b':
                    type = 'bishop';
                    points = 3
                    break;
                case 'q':
                    type = 'queen';
                    points = 10
                    break;
                case 'k':
                    type = 'king';
                    points = 0
                    break;
                case 'p':
                    type = 'pawn';
                    points = 1
                    break;
                default:
                    type = 0
            }
            if(type === 0) { // 0 = empty square
                chessBoard[row][column] = 0;
            }
            else {
                chessBoard[row][column] = {
                    id: id,
                    type: type,
                    color: color,
                    lastMoved: 0,
                    movedFrom: [row,column],
                    points: points,
                    square: [
                        row,
                        column
                    ]
                }
            }
            id++;
        }

    }
}
setupBoard([
  //  0   1   2   3   4   5   6   7
    ['r','n','b','q','k','b','n','r'], // 0
    ['p','p','p','p','p','p','p','p'], // 1
    ['x','x','x','x','x','x','x','x'], // 2
    ['x','x','x','x','x','x','x','x'], // 3
    ['x','x','x','x','x','x','x','x'], // 4
    ['x','x','x','x','x','x','x','x'], // 5
    ['p','p','p','p','p','p','p','p'], // 6
    ['r','n','b','q','k','b','n','r'], // 7
]);
