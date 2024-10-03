/**
 * Checks if selected square is inside the chessboard.
 * @param row row
 * @param column column
 * @returns {boolean} `true` if valid move, `false` if invalid move.
 */
function isInBounds(row,column) {
    return (column > -1 && column < 8) && (row > -1 && row < 8);
}

/**
 * @param row row
 * @param column column
 * @returns {boolean} `true` if empty, `false` if not empty.
 */
function isEmpty(row,column) {
    return chessBoard[row][column] === 0;
}
/**
 *
 * @param row
 * @param column
 * @param typeOverride
 * @param colorOverride
 * @returns {{}}
 */
function getPiece(row,column, typeOverride='', colorOverride='') {

    let piece = chessBoard[row][column];

    (typeOverride) ? piece.type = typeOverride : piece.type;
    (colorOverride) ? piece.color = colorOverride : piece.type;

    return piece;
}
/**
 * Checks if the selected square is opposite color of the current player's turn
 * @param row row
 * @param column column
 * @param yourColor current player's color
 * @returns {boolean} Returns the color piece of the selected square.
 */
function isOppositeColor(row,column,yourColor) {
    if(!isEmpty(row,column)) {
        return chessBoard[row][column].color !== yourColor ;
    }
}

/**
 * Gets the king's position based on the stored position
 * @param color King's color
 * @returns {number[]} King coords as [row,column]
 */
function getKingPosition(color) {
    let row, column;
    if(color === 'white') {
        row = whiteKing[0];
        column = whiteKing[1];
    } else {
        row = blackKing[0];
        column = blackKing[1];
    }
    return [row,column];
}

/**
 * Sets the king's new position in the global variables.
 * @param color Color of king to set
 * @param row New row
 * @param column New column
 */
function setKingPosition(color, row, column) {
    if(color === 'white') {
        whiteKing = [row, column];
    } else {
        blackKing = [row, column];
    }
}

/**
 * If the `round` global is odd, it's white's turn, otherwise black's turn
 * @param currentTurn gets the global turn variable
 * @returns {string} `'white'` or `'black'`
 */
function getTurn(currentTurn = round) {
    return currentTurn % 2 === 0 ? 'black' : 'white';
}
