/**
 * Replicates the pawn's movement. Validates if selected square is a pawn.
 * @param row row
 * @param column column
 * @returns {[]} Returns all valid moves as an array of row and column coordinates
 */
function pawnMoves(row,column) {

    const piece = getPiece(row,column);
    let moves = []

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
            moves.push([row+op,column-1]);
        }
        if( !isEmpty(row+op,column+1) &&
            isInBounds(row+op, column+1) &&
            isOppositeColor(row+op, column+1, color))
        {
            moves.push([row+op,column+1]);
        }

        // TODO: Create en passant logic
        // if there is pawn next to piece and has current move on the last turn, let capture
        else {}
    }

    else {
        throw 'Error: invalid piece type.'
    }
    return moves;
}

/**
 * Using a ray-cast like function to find all legal moves for a piece.
 * Used for rook, bishop, queen, knight (horsey) and king.
 * @param {number} row
 * @param {number} column
 * @param {number[][]} movement Array of directions to add on every loop through
 * Ex. [ [+1,0],[-1,0],[0,+1],[0,-1] ] would emulate the rook's movement.
 * This works like a 2D ray-cast essentially.
 * @param {number} limit Limit of spaces to move. For example for the king or knight,
 * who's limit is `1`. Default is `-1` or no limit.
 * @param {boolean} canCapture Whether or not a capture considered a valid move.
 * This is used for getting pieces that can potentially be a discovered check threat.
 */
function raycastMoves(row,column, movement, limit = -1, canCapture = true) {

    const piece = getPiece(row,column);
    let moves = []

    if(!isEmpty(row,column)) {
        const color = piece.color;

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

    return moves;
}

/**
 * Get all possible squares for a given piece, with validation logic.
 * @param row Row
 * @param column Column
 * @returns {*[]} All valid moves for the given piece.
 */
function getMoves(row,column) {
    if(!isEmpty(row,column)) {
        if(getPiece(row,column).type !== 'pawn') {
            const moves = {
                'rook': [[+1,0], [-1,0], [0,+1], [0,-1]],
                'knight': [[+2,+1], [+2,-1], [-2,+1], [-2,-1], [+1,+2], [-1,+2], [+1,-2], [-1,+2]],
                'bishop': [[+1,+1], [+1,-1], [-1,+1], [-1,-1]],
                'king': [[+1,0], [-1,0], [0,+1], [0,-1], [+1,+1], [+1,-1], [-1,+1], [-1,-1]],
                'queen': [[+1,0], [-1,0], [0,+1], [0,-1], [+1,+1], [+1,-1], [-1,+1], [-1,-1]],
            }
            const piece = getPiece(row,column);
            const pieceType = piece.type;
            const currentMoves = moves[pieceType];
            const limit = pieceType === 'rook' || pieceType === 'knight' ? 1 : -1;

            return raycastMoves(row, column, currentMoves, limit);
        }
        else {
            return pawnMoves(row,column);
        }

    }
    else {
        throw "Error: The selected square is empty."
    }
}
// TODO: Need to add castle-ing and en passant logic