const generateScoreBoard = (player1, player2, allShips) => {
    console.log(allShips);
    const player1Score = document.querySelector("#player1Score");
    const player2Score = document.querySelector("#player2Score");
    const playerTurnHeader = document.querySelector("#playerTurn");
    let remainingPlayer1Ships = allShips.filter((ship) => ship.player == "playerOne" && ship.position.length !== ship.hits.length);
    let remainingPlayer2Ships = allShips.filter((ship) => ship.player == "playerTwo" && ship.position.length !== ship.hits.length);
    let destroyedPlayer1Ships = allShips.filter((ship) => ship.player == "playerOne" && ship.position.length == ship.hits.length);
    let destroyedPlayer2Ships = allShips.filter((ship) => ship.player == "playerTwo" && ship.position.length == ship.hits.length);
    if (remainingPlayer1Ships.length == 0) {
        playerTurnHeader.textContent = `${player1.name} Wins`;
        player1Score.textContent = `${player1.name} score: ${destroyedPlayer1Ships.length}  remaining ships: ${remainingPlayer1Ships.length}`;
        return false;
    } else if (remainingPlayer2Ships.length == 0) {
        playerTurnHeader.textContent = `${player2.name} Wins`;
        player2Score.textContent = `${player2.name} score: ${destroyedPlayer2Ships.length} remaining ships: ${remainingPlayer2Ships.length}`;
        return false;
    }
    player1Score.textContent = `${player1.name} score: ${destroyedPlayer1Ships.length} ships left: ${remainingPlayer1Ships.length}`;
    player2Score.textContent = `${player2.name} score: ${destroyedPlayer2Ships.length} ships left: ${remainingPlayer2Ships.length}`;
    return true;
};

export { generateScoreBoard };
