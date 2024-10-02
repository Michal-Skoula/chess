/**
 * Replicates the pawn's movement. Validates if selected square is a pawn.
 * @param row row
 * @param column column
 * @returns {{attacks: *[], moves: *[]}} Returns all valid moves as an array of row and column coordinates
 */
function pawnMoves(row,column) {

    const piece = getPiece(row,column);
    let moves = []
    let attacks = []

    if(piece.type === 'pawn') { // validation
        const color = piece.color;

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
            attacks.push([row+op,column-1])
            moves.push([row+op,column-1]);
        }
        if( !isEmpty(row+op,column+1) &&
            isInBounds(row+op, column+1) &&
            isOppositeColor(row+op, column+1, color))
        {
            attacks.push([row+op,column+1]);
            moves.push([row+op,column+1]);
        }

        // TODO: Create en passant logic
        // if there is pawn next to piece and has current move on the last turn, let capture
        else {}
    }

    else {
        throw 'Error: invalid piece type.'
    }
    return {
        moves: moves,
        attacks: attacks
    };
}

/**
 * Using a ray-cast like function to find all legal moves for a piece.
 * Used for rook, bishop, queen, knight (horsey) and king.
 * @param {number} row
 * @param {number} column
 * @param {number[][]} movement Array of directions to add on every loop through
 * Ex. [ [+1,0],[-1,0],[0,+1],[0,-1] ] would emulate the rook's movement.
 * This works like a 2D ray-cast essentially, checking all squares until collision.
 * @param {number} limit Limit of spaces to move. For example for the king or knight,
 * who's limit is `1`. Default is `-1` or no limit.
 * @param {boolean} canCapture Whether or not a capture considered a valid move.
 * This is used for getting pieces that can potentially be a discovered check threat.
 * @returns {{}}
 */
function raycastMoves(row,column, movement, limit = -1, canCapture = true) {

    const piece = getPiece(row,column);
    const color = piece.color;
    let moves = [];
    let attacks = [];
    let attacksPieces = []
    if(!isEmpty(row,column)) {

        // 1st for loop: iterate over all directions in movement array
        for(let direction = 0; direction < movement.length; direction++) {

        // Change coefficients for all directions
        let xCoefficient = movement[direction][0]; //x coordinate
        let yCoefficient = movement[direction][1]; //y coordinate

        let count = 1;
        let calcRow = row + xCoefficient;
        let calcColumn = column + yCoefficient;

        // 2nd loop: cast a ray and wait until collision
        // with another piece or the end of the chessboard
        while(count <= limit || limit === -1) {

            if(isInBounds(calcRow,calcColumn) &&
                isEmpty(calcRow,calcColumn) )
            {
                moves.push([calcRow,calcColumn]);
                calcRow += xCoefficient;
                calcColumn += yCoefficient;
                count++;
            }
            else if(canCapture &&
                isInBounds(calcRow,calcColumn) &&
                isOppositeColor(calcRow,calcColumn,color))
            {
                // Store result
                attacksPieces.push(getPiece(calcRow,calcColumn))
                attacks.push([calcRow, calcColumn]);
                moves.push([calcRow,calcColumn]);
                break;
            }
            else break;
        }
    }
    }
    else {
        throw 'Error: The selected square is empty.'
    }

    return {
        moves: moves,
        attackPieces: attacksPieces,
        attacks: attacks
    };
}
function kingMoves() {
    // Update global variable of king's position
    //
}


/**
 * Get all possible squares for a given piece, with validation logic.
 * @param row Row
 * @param column Column
 * @param typeOverride Mainly used for validation
 * @returns {[]} All valid moves for the given piece.
 */
function getMoves(row,column) {

    if(!isEmpty(row,column)) {
        let movesToCheck = [];

        const piece = getPiece(row, column);
        const color = piece.color;
        const pieceType = piece.type;
        const currentMoves = moves[pieceType];
        const limit = pieceType === 'king' || pieceType === 'knight' ? 1 : -1;

        let movesArr;
       if (pieceType !== 'pawn') {
           movesArr = raycastMoves(row, column, currentMoves, limit).moves;

           for(let i = 0; i < movesArr.length ; i++) {
               movesToCheck.push(movesArr[i]);
           }
       } else {
           movesArr = pawnMoves(row, column).moves;

           for(let i = 0; i < movesArr.length ; i++) {
               movesToCheck.push(movesArr[i]);
           }
       }
       return validateMoves(row, column, movesToCheck);
        // TODO: Everything else works, only getMoves() needs fixing.
    }
    else {
        throw "Error: The selected square is empty.";
    }
}



function validateMoves(row, column, moves = []) {

    let validMoves = []
    const currentSquarePiece = getPiece(row,column)
    const color = currentSquarePiece.color;

    for(let i = 0; i < moves.length; i++) {
        const moveRow = moves[i][0];
        const moveColumn = moves[i][1];
        const moveSquarePiece = chessBoard[moveRow][moveColumn];

        // Write the new board to be checked for checks
        chessBoard[row][column] = 0;
        chessBoard[moveRow][moveColumn] = currentSquarePiece;
        // Run the checks
        if(!isChecked(getKingPosition(color)[0], getKingPosition(color)[1])) {
            validMoves.push([moveRow, moveColumn]);
        }
        // Return the board to its original state
        chessBoard[moveRow][moveColumn] = moveSquarePiece;
        chessBoard[row][column] = currentSquarePiece;
    }
    return validMoves;

}



// TODO: Need to add castle-ing and en passant logic
// TODO: Add validation for discovered checks before claiming a move is valid

