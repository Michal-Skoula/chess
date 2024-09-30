/**
 * Replicates the pawn movement. Validates if selected square is a pawn.
 * @param row row
 * @param column column
 * @returns {[]} Returns all valid moves as an array of row and column coordinates
 */
function pawnMoves(row,column) {

    let piece = chessBoard[row][column];
    let moves = []

    if(piece.type === 'pawn') { // validation
        let color = piece.color;
        let op // +1 or -1 based on color
        color === 'white' ? op = +1 : op = -1;

        // Move forward
        if( isEmpty(row+op, column) &&
            isInBounds(row+op, column))
        {
            moves.push([row+op,column]);
        }
        // Captures left and right, check if the piece is not your own
        if( !isEmpty(row+op,column-1) &&
            isInBounds(row+op, column-1) &&
            isOppositeColor(row+op, column-1, color))
        {
            moves.push([row+op,column-1]);
        }
        if( !isEmpty(row+op,column+1) &&
            isInBounds(row+op, column+1) &&
            isOppositeColor(row+op, column+1, color))
        {
            moves.push([row+op,column+1]);
        }

        // TODO: Create en passant logic
        // else if(enPassant) - if there is pawn next to piece and has current move on the last turn, let capture
        else {}
    }

    else {
        throw 'Error: invalid piece type.'
    }
    return moves;

}
