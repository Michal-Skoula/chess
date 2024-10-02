function renderChessBoard(chessBoard) {
    let pieces = {
        white: {
            pawn: '♙',
            queen: '♕',
            rook: '♖',
            knight: '♘',
            bishop: '♗',
            king: '♔',
            empty: '.'
        },
        black: {
            pawn: '♟',
            queen: '♛',
            rook: '♜',
            knight: '♞',
            bishop: '♝',
            king: '♚',
            empty: '.'
        },
        empty: '.'
    }

    for( let i = 0 ; i < chessBoard.length ; i++ ) {
        let row = '|';

        for(let j = 0; j < chessBoard[i].length; j++ ) {
            if(!isEmpty(i,j)) {
                const piece = getPiece(i,j);
                row += `${pieces[piece.color][piece.type]}|`;
            }
            else {
                row += '.|';
            }
            (j === chessBoard.length - 1) ? console.log(row) : '';
        }
    }
}
renderChessBoard(chessBoard);
