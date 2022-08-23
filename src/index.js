import "./cssReset.css";
import "./style.css";
import explosionIcon from "./Assets/explosion.png";
import SinkIcon from "./Assets/sinking.png";
import VanillaTilt from "vanilla-tilt";
import {player} from './Assets/modules/playerFactory'
import {ship} from './Assets/modules/shipfactory'




let allPlayer1Pos = [];
let allPlayer2Pos = [];




//const albama = ship(8, "landscape", "playerOne");
//const chicken = ship(6, "portrait", "playerTwo");

let allShips = [];
//console.log(allShips);

let totalHits = [];

const getAllInputs = (() => {
    const pagetilt = (backElement) =>{
        VanillaTilt.init(backElement),{
            max:30,
            speed:100,

        }
    }

    const playerfield = document.querySelector("#text");
    const formContainer = document.querySelector(".formContainer");
    const form = document.querySelector("#form")
    const shipformContainer = document.querySelector(".shipFormContainer");
    const formHeader = document.querySelector("#formHeader");
    const logo = document.querySelector(".logo")
    pagetilt(form)
    playerfield.onkeypress = function getplayer1name(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            //playerfield.setCustomValidity("Please enter a valid name")
            //playerfield.reportValidity()
            if (playerfield.checkValidity()) {
                playerfield.setCustomValidity("");
                let player1 = new player(`${playerfield.value}`);
                getPlayer2Name(player1);
                playerfield.value = "";
            } else {
                e.preventDefault();
                playerfield.setCustomValidity("Please enter a valid name");
                playerfield.reportValidity();
            }
        }
    };
    const getPlayer2Name = (player1) => {
        //console.log(playerfield.value);
        formHeader.textContent = "Welcome Player 2, Enter your name:";
        playerfield.onkeypress = function (a) {
            if (a.keyCode == 13) {
                a.preventDefault();
                playerfield.reportValidity();
                if (playerfield.checkValidity()) {
                    let player2 = new player(`${playerfield.value}`);
                    playerfield.value = "";
                    getStartingPlayer(player1, player2);
                }
            }
        };
    };
    const getStartingPlayer = (player1, player2) => {
        formHeader.textContent = "Enter Starting Player";
        playerfield.placeholder = "player1 or player2";
        playerfield.value = "player1";
        playerfield.onkeypress = function (i) {
            if (i.keyCode == 13 && (playerfield.value.toLowerCase() == "player1" || playerfield.value.toLowerCase() == "player2")) {
                i.preventDefault();
                let startingPlayer = playerfield.value;
                playerfield.value = "";
                getBoardSizeValues(player1, player2, startingPlayer);
            } else if (i.keyCode == 13) {
                i.preventDefault();
                playerfield.setCustomValidity("Enter player1 or player2");
                playerfield.reportValidity();
            }
        };
    };

    const getBoardSizeValues = (player1, player2, startingPlayer) => {
        formHeader.textContent = "Enter the size of the Game Board:";
        playerfield.value = "small";
        playerfield.placeholder = "medium or small";
        playerfield.onkeypress = function (b) {
            if (b.keyCode == 13 && (playerfield.value.toLowerCase() == "medium" || playerfield.value.toLowerCase() == "small")) {
                b.preventDefault();
                console.log("getting ship values");
                playerfield.setCustomValidity("");
                let gameBoardSize = document.querySelector("#text").value;
                getShipValues(player1, player2, startingPlayer, gameBoardSize);
            } else if (b.keyCode == 13) {
                playerfield.setCustomValidity("Enter medium or small for board size");
                playerfield.reportValidity();
            }
        };
    };

    const getShipValues = (player1, player2, startingPlayer, gameBoardSize) => {
        let portraitInput = document.querySelector("#portraitNum");
        const portraitNumText = document.querySelector("#portraitLabelNum");
        const landscapeNumText = document.querySelector("#landscapeLabelNum");
        const minLabelNum = document.querySelector("#minLabelNum");
        const maxLabelNum = document.querySelector("#maxLabelNum");
        let landscapeInput = document.querySelector("#landscapeNum");
        let minLength = document.querySelector("#minLength");
        let maxLength = document.querySelector("#maxLength");
        //let minLengthValue = parseInt(document.querySelector("#minLength").value)
        //let maxLengthValue = parseInt(document.querySelector("#maxLength").value)
        let form = document.querySelector("#shipForm");

        pagetilt(form)

        if (gameBoardSize === "small") {
            gameBoardSize = 100;
        } else if (gameBoardSize === "medium") {
            gameBoardSize = 400;
        }

        formContainer.classList.add("moved");
        shipformContainer.classList.add("moved");
        if (gameBoardSize === 100) {
            portraitInput.max = "5";
            landscapeInput.max = "5";
            minLength.max = "5";
            maxLength.max = "5";
            portraitNumText.textContent = "(1-5)";
            landscapeNumText.textContent = "(1-5)";
            minLabelNum.textContent = "(1-5)";
            maxLabelNum.textContent = "(1-5)";
        }
        const playbutton = document.querySelector("#playButton");
        playbutton.onclick = function (b) {
            //console.log(parseInt(minLength.value),maxLengthValue);
            maxLength.setCustomValidity("");
            form.reportValidity();
            if (parseInt(maxLength.value) < parseInt(minLength.value)) {
                maxLength.setCustomValidity("Maximum length must be more than minimum length");
                maxLength.reportValidity();
            } else if (parseInt(maxLength.value) > parseInt(minLength.value) && form.checkValidity()) {
                maxLength.setCustomValidity("");
                generateShips(player1, player2, startingPlayer, gameBoardSize);
            }
        };
    };
})();

const generateShips = (player1, player2, startingPlayer, gameBoardSize) => {
    //const shipformContainer = document.querySelector(".shipFormContainer");
    const cruisersNum = document.querySelector("#portraitNum").value;
    const destroyersNum = document.querySelector("#landscapeNum").value;
    let maxLength = parseInt(document.querySelector("#maxLength").value);
    let minLength = parseInt(document.querySelector("#minLength").value);

    document.querySelector(".header").style.display = "flex";
    document.querySelector(".gameContainer1").style.display = "grid";
    document.querySelector(".gameContainer2").style.display = "grid";
    document.querySelector(".shipFormContainer").classList.add("slideDown");

    const randomShipLength = (minLength, maxLength) => {
        return Math.floor(Math.random() * (maxLength - minLength + 1) + minLength);
    };

    const generateCruisers = (minLength, maxLength) => {
        for (let i = 0; i < cruisersNum; i++) {
            let randomLength = randomShipLength(minLength, maxLength);
            const player1cruisers = ship(randomLength, "portrait", "playerOne", gameBoardSize);
            const player2cruisers = ship(randomLength, "portrait", "playerTwo", gameBoardSize);
            allShips.push(player1cruisers, player2cruisers);
        }
    };
    const generateDestroyers = (minLength, maxLength) => {
        for (let i = 0; i < destroyersNum; i++) {
            let randomLength = randomShipLength(minLength, maxLength);
            const player1Destroyers = ship(randomLength, "landscape", "playerOne", gameBoardSize);
            const player2Destroyers = ship(randomLength, "landscape", "playerTwo", gameBoardSize);
            allShips.push(player1Destroyers, player2Destroyers);
        }
    };

    generateCruisers(minLength, maxLength);
    generateDestroyers(minLength, maxLength);
    generateScoreBoard(player1, player2);
    generatePlayerTurns(player1, player2, startingPlayer, gameBoardSize);
    console.log("all player 1 postions" + allPlayer1Pos);
    console.log("all player 2 postions" + allPlayer2Pos);
};

const generateScoreBoard = (player1, player2) => {
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

const generatePlayerTurns = (player1, player2, startingPlayer, gameBoardSize) => {
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
    generateboard(gameBoardSize, player1, player2);
};
const generateboard = (gameBoardSize, player1, player2) => {
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
            //tile.setAttribute("data-id", player1)

            const attackShip = (e, player1, player2) => {
                const tile = e.target.getAttribute("data-id");
                console.log(tile);
                if (tile == "playerOne" && player1.turn == 1) {
                    e.target.classList.add("hit");
                    const hitNum = e.target.getAttribute("data-id") + e.target.getAttribute("data-key");
                    //console.log(hitNum);
                    totalHits.push(hitNum);
                    checkHits(player1, player2);
                    //generateScoreBoard(player1,player2);
                    checkShipDestroyed();
                    if (generateScoreBoard(player1, player2)) {
                        return true;
                    } else {
                        player1.turn = 0;
                        player2.turn = 0;
                        return false;
                    }
                } else if (tile == "playerTwo" && player2.turn == 1) {
                    e.target.classList.add("hit");
                    const hitNum = e.target.getAttribute("data-id") + e.target.getAttribute("data-key");
                    //console.log(hitNum);
                    totalHits.push(hitNum);
                    checkHits(player1, player2);
                    checkShipDestroyed();
                    if (generateScoreBoard(player1, player2)) {
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
                    //playerturnHeader.textContent = `${player1.name}'s Turn`
                    if (attackShip(e, player1, player2)) {
                        playerturnHeader.textContent = `${player2.name}'s Turn`;
                        player1.turn--;
                        player2.turn++;
                        tileBackgroundColor(player1,player2)
                    }
                } else if (player2.turn == 1) {
                    //playerturnHeader.textContent = `${player2.name}'s Turn`
                    if (attackShip(e, player1, player2)) {
                        playerturnHeader.textContent = `${player1.name}'s Turn`;
                        player2.turn--;
                        player1.turn++;
                        tileBackgroundColor(player1,player2)
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

const tileBackgroundColor = (player1, player2) =>{
    const player1Container = document.querySelector(".gameContainer1")
    const player2Container = document.querySelector(".gameContainer2")
    if (player1.turn == 1){
        player1Container.style.backgroundColor = "#8C4236"
    } else if (player1.turn  == 0) {
        player1Container.style.backgroundColor = "transparent"
    }
    if (player2.turn == 1){
        player2Container.style.backgroundColor = "#8C4236"
    } else if (player2.turn == 0) {
        player2Container.style.backgroundColor = "transparent"
    }   
}

const checkHits = (player1, player2) => {
    const addHItIcon = (hit) => {
        const dataid = hit.substr(0, 9);
        const datakey = hit.substr(9, 12);
        //console.log(datakey);
        const hitTile = document.querySelector(`[data-key="${datakey}"][data-id="${dataid}"]`);
        if (!hitTile.hasChildNodes()) {
            const hitImage = document.createElement("img");
            hitImage.classList.add("hitImage");
            hitImage.src = explosionIcon;
            hitTile.appendChild(hitImage);
        }
    };
    console.log(totalHits);

    allShips.forEach((ship) => {
        let hit = ship.position.filter((positionNum) => totalHits.includes(positionNum));
        ship.hits = [...hit];
        hit.forEach((hit) => {
            addHItIcon(hit);
        });
    });
    generateScoreBoard(player1, player2);
    console.log(allShips);

    //  let hit = allShipPos.filter((position) => hits.includes(position));
    //  hit.forEach((hit) => {
    //      addHItIcon(hit);
    //  });
};

const checkShipDestroyed = () => {
    allShips.forEach((ship) => {
        let checkForDestroyed = ship.position.every((pos) => ship.hits.includes(pos));
        if (checkForDestroyed) {
            destroyShip(ship);
        }
        //console.log(checkForDestroyed)
        //console.log(ship.position)
        //console.log(ship.hits)
    });
};

const destroyShip = (ship) => {
    ship.position.forEach((number) => {
        const dataid = number.substr(0, 9);
        const datakey = number.substr(9, 12);
        const shipPos = document.querySelector(`[data-key="${datakey}"][data-id="${dataid}"]`);
        shipPos.firstChild.src = SinkIcon;
        //console.log(shipPos);
    });
    //generateScoreBoard()
};
