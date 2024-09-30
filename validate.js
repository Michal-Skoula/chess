/**
 * Checks if selected square is inside the chessboard.
 * @param row row
 * @param column column
 * @returns {boolean} `true` if valid move, `false` if invalid move.
 */
function isInBounds(row,column) {
    if(row < -1 && row > 8) {
        return false
    }
    if(column < -1 && column > 8) {
        return false
    }
    return true
}
/**
 * Checks if selected square is empty.
 * @param row row
 * @param column column
 * @returns {boolean} `true` if empty, `false` if not empty.
 */
function isEmpty(row,column) {
    return chessBoard[row][column] === 0;
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