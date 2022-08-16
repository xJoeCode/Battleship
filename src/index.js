import "./cssReset.css";
import "./style.css";
import explosionIcon from "./Assets/explosion.png";
import SinkIcon from "./Assets/sinking.png";

class player {
    constructor(name) {
        this.name = name;
    }
    turn = 0;
}


let allPortraitPos = [];
let allLandscapePos = [];

const ship = (length, orient, player , gameBoardSize) => {
    const getLength = () => length;
    const getPlayer = () => player;
    let position = [];
    let hits = [];

    const shipPos = (player) => {
        let initialPos = Math.floor(Math.random() * gameBoardSize + 1);
        let gameBoardLength = Math.sqrt(gameBoardSize)
        console.log(initialPos, length, player);

        if (orient === "landscape") {
            // to make sure all positions are placed correctly

            const checkNoDuplicateLandscapePos = (Pos) => {
                for (let i = 0; i < length; i++) {
                    let tempPos = Pos + i;
                    if (allLandscapePos.includes(tempPos)) {
                        return true;
                    }
                }
            };

            const pushToArrayLandscape = (initialPos) => {
                if (!checkNoDuplicateLandscapePos(initialPos)) {
                    console.log("pushing to array");
                    for (let i = 0; i < length; i++) {
                        let finalPos = initialPos + i;
                        position.push(player + finalPos);
                        allLandscapePos.push(finalPos);
                    }
                } else {
                    console.log("landscape Pos already used" + initialPos);
                    shipPos(player);
                }
            };

            const checkPosLandscape = (initialPos) => {
                for (let i = 0; i < length; i++) {
                    let testPos = initialPos + i;
                    if (testPos % gameBoardLength == 0) {
                        console.log(testPos);
                        initialPos = initialPos + (i + 1);
                        console.log("checking pos 1");
                        pushToArrayLandscape(initialPos);
                        return true;
                    }
                }
            };
            if (!checkPosLandscape(initialPos)) {
                console.log("checking pos 2");
                pushToArrayLandscape(initialPos);
            }
        } else if (orient === "portrait") {

            const checkNoDuplicatePotraitPos = (Pos) => {
                for (let i = 0; i < length; i++) {
                    let tempPos = initialPos + i * gameBoardLength;
                    if (allPortraitPos.includes(tempPos)) {
                        return true;
                    }
                }
            };

            const checkPosPortrait = (initialPos) => {
                for (let i = 0; i < length; i++) {
                    let tempPos = initialPos + i * gameBoardLength;
                    if (tempPos > gameBoardSize) {
                        initialPos = initialPos - (length - i) * gameBoardLength;
                        pushtoArrayPortrait(initialPos);
                        console.log(initialPos + "checking pos 3");
                        return true;
                    }
                }
            };

            const pushtoArrayPortrait = (initialPos) => {
                if (!checkNoDuplicatePotraitPos(initialPos)) {
                    for (let i = 0; i < length; i++) {
                        position.push(player + (initialPos + i * gameBoardLength));
                        allPortraitPos.push(initialPos + i * gameBoardLength);
                    }
                } else {
                    console.log("Portrait Pos already used " + initialPos);
                    shipPos(player);
                }
            };

            if (!checkPosPortrait(initialPos)) {
                console.log("checking pos 4");
                pushtoArrayPortrait(initialPos);
            }
        }
    };
    shipPos(player);
    return { getLength, position, hits, player };
};

//const albama = ship(8, "landscape", "playerOne");
//const chicken = ship(6, "portrait", "playerTwo");

let allShips = [];
//console.log(allShips);

let totalHits = [];

const generateboard = (gameBoardSize,player1,player2) => {
    const player1gameTile = document.querySelector("#player1GameTile");
    const player2gameTile = document.querySelector("#player2GameTile");
    const gameContainer1 = document.querySelector(".gameContainer1");
    const gameContainer2 = document.querySelector(".gameContainer2");
    const playerturnHeader = document.querySelector("#playerTurn")

    if (gameBoardSize === 400) {
        gameContainer1.style.gridTemplateColumns = "repeat(20, 1fr)"
        gameContainer1.style.gridTemplateRows = "repeat(20, 1fr)"
        gameContainer2.style.gridTemplateColumns = "repeat(20, 1fr)"
        gameContainer2.style.gridTemplateRows = "repeat(20, 1fr)"
    } 

    const playerTiles = [player1gameTile, player2gameTile];
    playerTiles.forEach((playerTile) => {
        for (let i = 0; i < gameBoardSize; i++) {
            const tile = playerTile.cloneNode();
            tile.setAttribute("data-key", i + 1);
            //tile.setAttribute("data-id", player1)

            const attackShip = (e,player1,player2) =>{
                const tile = e.target.getAttribute("data-id")
                console.log(tile)
                if (tile == "playerOne" && player1.turn == 1){
                    e.target.classList.add("hit");
                    const hitNum = e.target.getAttribute("data-id") + e.target.getAttribute("data-key");
                    console.log(hitNum);
                    totalHits.push(hitNum);
                    checkHits();
                    checkShipDestroyed();
                    return true
                } else if(tile == "playerTwo" && player2.turn == 1){
                    e.target.classList.add("hit");
                    const hitNum = e.target.getAttribute("data-id") + e.target.getAttribute("data-key");
                    console.log(hitNum);
                    totalHits.push(hitNum);
                    checkHits();
                    checkShipDestroyed();
                    return true
                }

            } 

            console.log(player1)

            tile.onclick = function (e){
            if (player1.turn == 1){
                //playerturnHeader.textContent = `${player1.name}'s Turn`
                if(attackShip(e,player1, player2)){
                    playerturnHeader.textContent = `${player2.name}'s Turn`
                    player1.turn--
                    player2.turn++
                }
                
                
            } else if(player2.turn == 1){
                //playerturnHeader.textContent = `${player2.name}'s Turn`
                if(attackShip(e,player1, player2)){
                    playerturnHeader.textContent = `${player1.name}'s Turn`
                    player2.turn--
                    player1.turn++
                    }
                } 
            }

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

const checkHits = () => {
    const addHItIcon = (hit) => {
        const dataid = hit.substr(0, 9);
        const datakey = hit.substr(9, 12);
        console.log(datakey);
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
        console.log(shipPos);
    });
};

const generateShips = ( player1, player2, startingPlayer, gameBoardSize) => {
    const shipformContainer = document.querySelector(".shipFormContainer");
    shipformContainer.classList.add("slideDown");
    const cruisersNum = document.querySelector("#portraitNum").value;
    const destroyersNum = document.querySelector("#landscapeNum").value;
    let maxLength = parseInt(document.querySelector("#maxLength").value);
    let minLength = parseInt(document.querySelector("#minLength").value);

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
    generatePlayerTurns(player1, player2, startingPlayer, gameBoardSize);
    console.log(allLandscapePos);
    console.log(allPortraitPos);
};

const generatePlayerTurns = (player1, player2, startingPlayer, gameBoardSize) => {
    const playerturnHeader = document.querySelector("#playerTurn")
    if (startingPlayer == "player1"){
        player1.turn++
        playerturnHeader.textContent = `${player1.name}'s Turn`
    } else if (startingPlayer == "player2"){
        player2.turn++
        playerturnHeader.textContent = `${player2.name}'s Turn`
    }
    generateboard(gameBoardSize,player1,player2)
}

const getAllInputs = (() => {
    const playerfield = document.querySelector("#text");
    const formContainer = document.querySelector(".formContainer");
    const shipformContainer = document.querySelector(".shipFormContainer");
    const formHeader = document.querySelector("#formHeader");
    playerfield.onkeypress = function getplayer1name(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            //playerfield.setCustomValidity("Please enter a valid name")
            //playerfield.reportValidity()
            if (playerfield.checkValidity()){
                playerfield.setCustomValidity("")
                let player1 = new player(`${playerfield.value}`)
                getPlayer2Name(player1);
                playerfield.value = ""; 
            } else{
                e.preventDefault();
                playerfield.setCustomValidity("Please enter a valid name")
                playerfield.reportValidity()
            }

        }
    };
    const getPlayer2Name = (player1) => {
        //console.log(playerfield.value);
        formHeader.textContent = "Welcome Player 2, Enter your name:";
        playerfield.onkeypress = function (a) {
            if(a.keyCode ==13){
                a.preventDefault()
                playerfield.reportValidity()
                if (playerfield.checkValidity()){
                    let player2 = new player(`${playerfield.value}`);
                    getStartingPlayer(player1, player2);
                    playerfield.value = "";
                }
            }
        };
    };
    const getStartingPlayer = (player1, player2) =>{
        formHeader.textContent = "Enter Starting Player";
        playerfield.placeholder = "player1 or player2"
        //playerfield.value = "player1"
        playerfield.onkeypress = function (i){
            if (i.keyCode == 13 && (playerfield.value.toLowerCase() == "player1"|| playerfield.value.toLowerCase() == "player2")){
                i.preventDefault()
                let startingPlayer = playerfield.value
                getBoardSizeValues( player1, player2, startingPlayer)
                playerfield.value = "";
            } else if(i.keyCode == 13){
                i.preventDefault()
                playerfield.setCustomValidity("Enter player1 or player2")
                playerfield.reportValidity()
            }
        }
    }

    const getBoardSizeValues = (player1, player2, startingPlayer) => {
            
            formHeader.textContent = "Enter the size of the Game Board:";
            playerfield.placeholder = "medium or small";
            playerfield.onkeypress = function (b) {

            if (b.keyCode == 13 && (playerfield.value.toLowerCase() == 'medium' || playerfield.value.toLowerCase() == "small")){
                b.preventDefault()
                console.log("getting ship values")
                playerfield.setCustomValidity("")
                let gameBoardSize = document.querySelector("#text").value;
                getShipValues(player1, player2, startingPlayer, gameBoardSize);
            } else if (b.keyCode == 13) {
                playerfield.setCustomValidity("Enter medium or small for board size")
                playerfield.reportValidity()
            }

            }
            
            
        };
        
    
    const getShipValues = (player1, player2, startingPlayer, gameBoardSize) => {
            let portraitInput = document.querySelector("#portraitNum")
            let landscapeInput = document.querySelector("#landscapeNum")
            let minLength = document.querySelector("#minLength")
            let maxLength = document.querySelector("#maxLength")
            let form = document.querySelector("#shipForm")

            if (gameBoardSize === "small"){
                gameBoardSize = 100
            } else if(gameBoardSize === "medium"){
                gameBoardSize = 400
            }

            formContainer.classList.add("moved");
            shipformContainer.classList.add("moved");
            if (gameBoardSize === 100) {
                portraitInput.max = "5";
                landscapeInput.max = "5";
                minLength.max = "5";
                maxLength.max = "9";
            }
            const playbutton = document.querySelector("#playButton");
            playbutton.onclick = function (b) {
                console.log(form)
                form.reportValidity()
                if(form.checkValidity()){
                    generateShips( player1, player2, startingPlayer, gameBoardSize);
                }
            };
        }
        
})();
