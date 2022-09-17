import { generateScoreBoard } from "./scoreBoard";
import explosionIcon from "../../Assets/explosion.png";
import sinkIcon from "../../Assets/sinking.png";

const clickRandomTile = (_player, gameBoardSize, hit) => {
    while (true) {
        let tileNum = (Math.floor(Math.random() * gameBoardSize) + 1).toString();
        let tile = _player+tileNum
        console.log(tile)
        if (!hit.find((element) => tile == element)) {
            console.log(hit)
            const tileElement = document.querySelector(`[data-id="${_player}"][data-key="${tileNum}"]`);
            console.log(tileElement)
            tileElement.click();
            break;
        }
    }
};

const computerHit = (_player, hit, gameBoardSize) => {
    const gameBoardLength = Math.sqrt(gameBoardSize)
    if (hit.length > 0) {
        let surroundingHits = [];
        hit.forEach((hit) => {
            const dataid = hit.substr(0, 9);
            const datakey = hit.substr(9, 12);
            const tile = document.querySelector(`[data-key="${datakey}"][data-id="${dataid}"]`);
            if (tile.className == "hit" && tile.hasChildNodes()) {
                if (tile.firstElementChild.src == explosionIcon) {
                    const rightTile = document.querySelector(`[data-key="${parseInt(datakey) + 1}"][data-id="${dataid}"]`);
                    const leftTile = document.querySelector(`[data-key="${parseInt(datakey) - 1}"][data-id="${dataid}"]`);
                    const topTile = document.querySelector(`[data-key="${parseInt(datakey) - gameBoardLength}"][data-id="${dataid}"]`);
                    const bottomTile = document.querySelector(`[data-key="${parseInt(datakey) + gameBoardLength}"][data-id="${dataid}"]`);
                    if (rightTile) {
                        if (!rightTile.classList.contains("hit")) {
                            console.log(rightTile)
                            rightTile.click();
                            surroundingHits.push("hit");
                        } else if (leftTile) {
                            if (!leftTile.classList.contains("hit")) {
                                console.log(leftTile)
                                leftTile.click();
                                surroundingHits.push("hit");
                            } else if (topTile) {
                                if (!topTile.classList.contains("hit")) {
                                    console.log(topTile)
                                    topTile.click();
                                    surroundingHits.push("hit");
                                } else if (bottomTile) {
                                    if (!bottomTile.classList.contains("hit")) {
                                        console.log(bottomTile)
                                        bottomTile.click();
                                        surroundingHits.push("hit");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        if (!surroundingHits.includes("hit")) {
            clickRandomTile(_player, gameBoardSize, hit);
        }
    } else {
        clickRandomTile(_player, gameBoardSize, hit);
    }
};

const checkHits = (player1, player2, allShips, totalHits) => {
    const addHItIcon = (hit) => {
        const dataid = hit.substr(0, 9);
        const datakey = hit.substr(9, 12);
        const hitTile = document.querySelector(`[data-key="${datakey}"][data-id="${dataid}"]`);
        if (!hitTile.hasChildNodes()) {
            const hitImage = document.createElement("img");
            hitImage.classList.add("hitImage");
            hitImage.src = explosionIcon;
            hitTile.appendChild(hitImage);
        }
    };

    allShips.forEach((ship) => {
        let hit = ship.position.filter((positionNum) => totalHits.includes(positionNum));
        ship.hits = [...hit];
        hit.forEach((hit) => {
            addHItIcon(hit);
        });
    });
    generateScoreBoard(player1, player2, allShips);
};

const checkShipDestroyed = (allShips) => {
    const destroyShip = (ship) => {
        ship.position.forEach((number) => {
            const dataid = number.substr(0, 9);
            const datakey = number.substr(9, 12);
            const shipPos = document.querySelector(`[data-key="${datakey}"][data-id="${dataid}"]`);
            shipPos.firstChild.src = sinkIcon;
        });
    };
    allShips.forEach((ship) => {
        let checkForDestroyed = ship.position.every((pos) => ship.hits.includes(pos));
        if (checkForDestroyed) {
            destroyShip(ship);
        }
    });
};

export { checkHits, computerHit, checkShipDestroyed };
