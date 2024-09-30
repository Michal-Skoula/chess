let captures = []
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
    ['r','n','b','q','k','b','n','r'],
    ['p','p','p','p','p','p','p','p'],
    ['x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x'],
    ['p','p','p','p','p','p','p','p'],
    ['r','n','b','q','k','b','n','r'],
]);
console.log(chessBoard);
