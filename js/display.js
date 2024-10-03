function renderChessBoard(board = chessBoard) {
    let pieces = {
        black: {
            pawn: '♙',
            queen: '♕',
            rook: '♖',
            knight: '♘',
            bishop: '♗',
            king: '♔',
        },
        white: {
            pawn: '♟',
            queen: '♛',
            rook: '♜',
            knight: '♞',
            bishop: '♝',
            king: '♚',
        },
    }
    console.log(`${getTurn()}'s turn (${round})`);
    for( let i = 0 ; i < board.length ; i++ ) {
        (i === 0) ? console.log('   0 1 2 3 4 5 6 7') : '';
        let row = `${i} |`;

        for(let j = 0; j < board[i].length; j++ ) {
            if(!isEmpty(i,j)) {
                const piece = getPiece(i,j);
                row += `${pieces[piece.color][piece.type]}|`;
            }
            else {
                row += ' |';
            }
            (j === board.length - 1) ? console.log(row) : '';
        }
    }

}
renderChessBoard();
