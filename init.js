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
function setupBoard() {
    let board = [
        ['r','n','b','q','k','b','n','r'],
        ['p','p','p','p','p','p','p','p'],
        ['x','x','x','x','x','x','x','x'],
        ['x','x','x','x','x','x','x','x'],
        ['x','x','x','x','x','x','x','x'],
        ['x','x','x','x','x','x','x','x'],
        ['p','p','p','p','p','p','p','p'],
        ['r','n','b','q','k','b','n','r'],
    ];
    let id = 1;
    for(let row = 0; row < 8; row++) { // rows

        for(let column = 0; column < 8; column++) { // columns

            let piece = board[row][column];
            let color = row < 4 ? 'white' : 'black'; // top = white, bottom = black
            let type = '';

            switch(piece) {
                case 'r':
                    type = 'rook';
                    break;
                case 'n':
                    type = 'knight';
                    break;
                case 'b':
                    type = 'bishop';
                    break;
                case 'q':
                    type = 'queen';
                    break;
                case 'k':
                    type = 'king';
                    break;
                case 'p':
                    type = 'pawn';
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
setupBoard();
console.log(chessBoard)
