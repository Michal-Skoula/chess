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

        // Move forward 1
        if( isEmpty(row+op, column) &&
            isInBounds(row+op, column))
        {
            moves.push([row+op,column]);
        }
        // Move forward 2
        if( isEmpty(row+op*2, column) &&
            isInBounds(row+op*2, column) &&
            piece.lastMoved === 0)
        {
            moves.push([row+op*2,column]);
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
        // En passant - if pawn x+-1 from current pawn && lastMoved === round -1 ? true : false
        if((row === 4 && color === 'white') || (row === 3 && color === 'black')){
            // left
            if(getPiece(row,column-1).type === 'pawn' &&
                getPiece(row,column-1).color !== color) {

                let pawn = getPiece(row,column-1);

                 if(pawn.lastMoved === round - 1 && pawn.movedFrom[0] === column - 2) {
                    moves.push([row,column-1]);
                    attacks.push([row,column-1]);
                }


            }
        }

        // TODO: Create en passant logic
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
                attacksPieces.push(getPiece(calcRow,calcColumn));
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

/**
 * Get all possible squares for a given piece, with validation logic.
 * @param row Row
 * @param column Column
 * @returns {[]} All valid moves for the given piece.
 */
function getMoves(row,column) {

    if(!isEmpty(row,column)) {
        let movesToCheck = [];

        const piece = getPiece(row, column);
        const pieceType = piece.type;
        const currentMoves = moves[pieceType];
        const limit = pieceType === 'king' || pieceType === 'knight' ? 1 : -1;

        let movesArr;
       if (pieceType === 'pawn') {
           movesArr = pawnMoves(row, column).moves;
           // console.log(movesArr)

           for(let i = 0; i < movesArr.length ; i++) {
               movesToCheck.push(movesArr[i]);
           }
       }
       else {
           movesArr = raycastMoves(row, column, currentMoves, limit).moves;

           for(let i = 0; i < movesArr.length ; i++) {
               movesToCheck.push(movesArr[i]);
           }
       }
       return validateMoves(row, column, movesToCheck);
    }
    else {
        throw "Error: The selected square is empty.";
    }
}


/**
 * Constructs a new chessboard and checks all moves in `moves[]` array, then returns back to original state.
 * @param row Row where the move originates
 * @param column Column where the move originates
 * @param moves 2D array `[[1,2],[3,4]] of moves to try
 * @returns {*[[]]} 2D Array of valid moves
 */
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
        let kingPosRow = getKingPosition(color)[0];
        let kingPosCol = getKingPosition(color)[1];
        if(currentSquarePiece.type === 'king') {
            kingPosRow = moveRow;
            kingPosCol = moveColumn;
        }
        if(!isChecked(kingPosRow, kingPosCol)) {
            validMoves.push([moveRow, moveColumn]);
        }
        // Return the board to its original state
        chessBoard[moveRow][moveColumn] = moveSquarePiece;
        chessBoard[row][column] = currentSquarePiece;
    }
    return validMoves;

}

/**
 * Runs a move as a from and to set of coordinates and checks who's turn it is. Also validates checkmates.
 * @param fromRow
 * @param fromColumn
 * @param toRow
 * @param toColumn
 * @param currentRound
 * @returns {status} Returns 1 if executed successfully.
 */
function move(fromRow, fromColumn, toRow, toColumn, currentRound = round) {
    if(!isEmpty(fromRow, fromColumn)) {
        const validMoves = getMoves(fromRow, fromColumn);
        const piece = getPiece(fromRow, fromColumn);
        const color = piece.color;

        if(color === getTurn() ) {
            for(let i = 0; i < validMoves.length ; i++) {
                let validMoveRow = validMoves[i][0];
                let validMoveColumn = validMoves[i][1];

                if(toRow === validMoveRow && toColumn === validMoveColumn) {
                    chessBoard[fromRow][fromColumn] = 0;
                    chessBoard[toRow][toColumn] = piece;

                    // Update king global position
                    if(piece.type === 'king') {
                        setKingPosition(color, toRow, toColumn);
                    }
                    round++; // Advances the round by one.
                    piece.movedFrom = [fromRow, fromColumn];
                    piece.lastMoved = currentRound;
                    renderChessBoard(chessBoard);

                    // Check for checkmates
                    const opponentColor = (color === 'white') ? 'black' : 'white';
                    if(isChecked(getKingPosition(opponentColor)[0],getKingPosition(opponentColor)[1])) {
                        if(isCheckmated(opponentColor)) {
                            console.log("CHECKMATE!!!");
                        }
                    }

                    return 1;
                }
            }
            throw "Error: Invalid move.";
        } else {
            throw `Error: It's ${getTurn()}'s turn.`
        }
    }
    else {
        throw "Error: the selected square is not a piece.";
    }
}




// TODO: Need to add castle-ing and en passant logic
// TODO: Add validation for discovered checks before claiming a move is valid

