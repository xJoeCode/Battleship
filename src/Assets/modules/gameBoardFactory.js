import { checkHits, checkShipDestroyed } from "./checkHits";
import { generateScoreBoard } from "./scoreBoard";
import { tileBackgroundColor } from "./tileBackgroundColor";

const generateboard = (gameBoardSize, player1, player2, allShips) => {
    let totalHits = [];
    const player1gameTile = document.querySelector("#player1GameTile");
    const player2gameTile = document.querySelector("#player2GameTile");
    const gameContainer1 = document.querySelector(".gameContainer1");
    const gameContainer2 = document.querySelector(".gameContainer2");
    const playerturnHeader = document.querySelector("#playerTurn");

    if (gameBoardSize === 400) {
        gameContainer1.style.gridTemplateColumns = "repeat(20, 1fr)";
        gameContainer1.style.gridTemplateRows = "repeat(21, 1fr)";
        gameContainer2.style.gridTemplateColumns = "repeat(20, 1fr)";
        gameContainer2.style.gridTemplateRows = "repeat(21, 1fr)";
    }

    const playerTiles = [player1gameTile, player2gameTile];
    playerTiles.forEach((playerTile) => {
        for (let i = 0; i < gameBoardSize; i++) {
            const tile = playerTile.cloneNode();
            tile.setAttribute("data-key", i + 1);

            const attackShip = (e, player1, player2) => {
                const tile = e.target.getAttribute("data-id");
                console.log(tile);
                if (tile == "playerOne" && player1.turn == 1) {
                    e.target.classList.add("hit");
                    const hitNum = e.target.getAttribute("data-id") + e.target.getAttribute("data-key");
                    totalHits.push(hitNum);
                    checkHits(player1, player2, allShips, totalHits);
                    checkShipDestroyed(allShips);
                    if (generateScoreBoard(player1, player2, allShips)) {
                        return true;
                    } else {
                        player1.turn = 0;
                        player2.turn = 0;
                        return false;
                    }
                } else if (tile == "playerTwo" && player2.turn == 1) {
                    e.target.classList.add("hit");
                    const hitNum = e.target.getAttribute("data-id") + e.target.getAttribute("data-key");
                    totalHits.push(hitNum);
                    checkHits(player1, player2, allShips, totalHits);
                    checkShipDestroyed(allShips);
                    if (generateScoreBoard(player1, player2, allShips)) {
                        return true;
                    } else {
                        player1.turn = 0;
                        player2.turn = 0;
                        return false;
                    }
                }
            };

            tile.onclick = function (e) {
                if (player1.turn == 1) {
                    if (attackShip(e, player1, player2)) {
                        playerturnHeader.textContent = `${player2.name}'s Turn`;
                        player1.turn--;
                        player2.turn++;
                        tileBackgroundColor(player1, player2);
                    }
                } else if (player2.turn == 1) {
                    if (attackShip(e, player1, player2)) {
                        playerturnHeader.textContent = `${player1.name}'s Turn`;
                        player2.turn--;
                        player1.turn++;
                        tileBackgroundColor(player1, player2);
                    }
                }
            };

            if (playerTile.id == "player1GameTile") {
                gameContainer1.appendChild(tile);
            } else if (playerTile.id == "player2GameTile") {
                gameContainer2.appendChild(tile);
            }
        }
        player1gameTile.remove();
        player2gameTile.remove();
    });
};

export { generateboard };
