
/**
 * TODO: update outdated JSDoc
 * Casts a ray from the king as pawn, queen and knight. If it finds any attackers, returns them.
 * @returns {boolean} Determines if the king is checked or not.
 * @param row
 * @param column
 */
function isChecked(row,column) {
    let threats = [];
    // console.log(`isChecked threats: ${threats.length}`);

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

            if(threatType === 'pawn' && pawnMoves(threatRow, threatColumn).attacks !== []) {
                return true;
            }
            else if(raycastMoves(threatRow, threatColumn, moves[threatType], threatLimit).attacks !== []) {
                return true;
            }

        }
        return false;
    }
    else throw "Error: Not a valid piece."

}

/**
 *
 * @param kingColor
 * @returns {boolean}
 */
function isCheckmated(kingColor) {
    let row = getKingPosition(kingColor)[0];
    let column = getKingPosition(kingColor)[1];

    const validMoves = getMoves(row,column);
    const checks = checks(kingColor);

    // If there are no valid moves and king is checked, it's a checkmate
    return validMoves === [] && checks !== [];

}