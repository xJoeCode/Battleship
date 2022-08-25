import { tileBackgroundColor } from "./tileBackgroundColor";
import { generateboard } from "./gameBoardFactory";

const generatePlayerTurns = (player1, player2, startingPlayer, gameBoardSize, allShips) => {
    const playerturnHeader = document.querySelector("#playerTurn");
    const player1Header = document.querySelector("#player1Header");
    const player2Header = document.querySelector("#player2Header");

    player1Header.textContent = `${player1.name}'s board`;
    player2Header.textContent = `${player2.name}'s board`;

    if (startingPlayer == "player1") {
        player1.turn++;
        playerturnHeader.textContent = `${player1.name}'s Turn`;
        tileBackgroundColor(player1,player2)
    } else if (startingPlayer == "player2") {
        player2.turn++;
        playerturnHeader.textContent = `${player2.name}'s Turn`;
        tileBackgroundColor(player1,player2)
    }
    generateboard(gameBoardSize, player1, player2, allShips);
};

export {generatePlayerTurns}