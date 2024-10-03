
/**
 * Runs a raycast from the `[row,column] parameters (king's) as a queen and knight and stores enemy pieces hit.`
 * Then, for each piece hit, named `threats`, runs raycast of the piece's moves and if they hit the king back, it's in check.
 * Otherwise, continue checking for all threats.
 *
 * @returns {boolean} Determines if the king is checked or not.
 * @param row
 * @param column
 */
function isChecked(row = whiteKing[0],column = whiteKing[1]) {
    let threats = [];

    if(!isEmpty(row,column)) {
        // First raycast which checks for all potential threats and stores them for control
        let queenThreats = raycastMoves(row, column, moves.queen).attacks;
        let knightThreats = raycastMoves(row,column, moves.knight, 1).attacks;


        for(let i = 0; i < queenThreats.length ; i++) {
            threats.push(queenThreats[i]);
        }
        for(let i = 0; i < knightThreats.length ; i++) {
            threats.push(knightThreats[i]);
        }

        if(threats.length === 0) {
            return false;
        }
        // Validating all threats with another raycast back
        for(let i = 0; i < threats.length; i++) {
            const threatRow = threats[i][0];
            const threatColumn = threats[i][1];
            const threatType = getPiece(threatRow, threatColumn).type;
            const threatLimit = threatType === 'knight' ? 1 : -1;

            let potentialKingAttack;
            if(threatType === 'pawn') {
                potentialKingAttack = pawnMoves(threatRow, threatColumn).attacks;
            }
            else {
                // console.log('Moves: ' + moves[threatType])
                // console.log('Attacks: ' + raycastMoves(threatRow, threatColumn, moves[threatType], threatLimit).attacks)

                potentialKingAttack = raycastMoves(threatRow, threatColumn, moves[threatType], threatLimit).attacks

            }
            for(let j = 0; j < potentialKingAttack.length; j++) {
                let kingAttackRow = potentialKingAttack[j][0];
                let kingAttackCol = potentialKingAttack[j][1];

                if(kingAttackRow === row && kingAttackCol === column) {
                    return true;
                }
            }

        }
        return false;
    }
    else {
        console.log(row, column)
        console.log(chessBoard[row][column]);
        throw "Error: Not a valid piece."
    }

}

/**
 *
 * @param kingColor
 * @returns {boolean}
 */
function isCheckmated(kingColor) {

    for(let i= 0; i < chessBoard.length; i++) {
        for(let j = 0; j < chessBoard[0].length; j++) {
            const piece = getPiece(i,j);

            if(piece.color === kingColor) {
                if(getMoves(i,j).toString() !== [].toString()) {
                    return false;
                }
            }
        }
    }
    return true;

}