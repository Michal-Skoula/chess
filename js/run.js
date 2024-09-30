/**
 * Stores the captured piece in the global captures array.
 * @param row
 * @param column
 */
function storeCapturedPiece(row,column) {
    let capturedPiece = getPiece(row,column);
    captures.push(capturedPiece);
}

/**
 * Taking data from the global captures array, returns scores for
 * both players, displays captured pieces and shows who's in the lead.
 * @returns {{whiteScore: number, leader: string, blackCapturedPieces: *[], scoreDiff: number, whiteCapturedPieces: *[], blackScore: *[]}}
 */
function getScores() {
    let whiteScore = 0;
    let blackScore = 0;
    let whiteCapturedPieces = [];
    let blackCapturedPieces = [];

    for(let i = 0; i < captures.length; i++) {
        let capture = captures[i];

        if(capture.id <= 16) {
            whiteScore += capture.points;
            whiteCapturedPieces.push(capture.type);
        } else {
            blackScore += capture.points;
            blackCapturedPieces.push(capture.type);
        }
    }
    let leader = '';

    if(whiteScore === blackScore) {
        leader = 'tie';
    } else if(whiteScore > blackScore) {
        leader = 'white';
    } else {
        leader = 'black';
    }
    return {
        whiteScore: whiteScore,
        whiteCapturedPieces: whiteCapturedPieces,
        blackScore: blackCapturedPieces,
        blackCapturedPieces: blackCapturedPieces,
        leader: leader,
        scoreDiff: Math.abs(whiteScore - blackScore)
    }
}