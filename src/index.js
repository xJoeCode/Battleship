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

//let john = new player("john")
//let Tim = new player("Tim")

//console.log(john)
let allPortraitPos = [];
let allLandscapePos = [];

const ship = (length, orient, player) => {
    const getLength = () => length;
    const getPlayer = () => player;
    let position = [];
    let hits = [];

    const shipPos = (player) => {
        let initialPos = Math.floor(Math.random() * 100 + 1);
        console.log(initialPos, length, player)

        if (orient === "landscape") {
            // to make sure all positions are placed correctly

            const checkPosAlreadyUsed = (Pos) =>{
                for (let i = 0; i < length; i++){
                    let tempPos = Pos + i
                    if(allLandscapePos.includes(tempPos)){
                        return true
                    } 
                }
               // console.log(tempArray)
               // console.log(allLandscapePos)
               // if(allLandscapePos.some(num => tempArray.includes(num))){
               //     return true
                //}
            }

            const pushToArrayLandscape = (initialPos) =>{
                if (!checkPosAlreadyUsed(initialPos)){
                    console.log('pushing to array')
                    for (let i = 0; i < length; i++) {
                        let finalPos = initialPos + i
                        position.push(player + (finalPos));
                        allLandscapePos.push(finalPos)
                        }  
                }else {
                    console.log("landscape Pos failed" + initialPos)
                    shipPos(player)
                }                     
            }
            const checkPosLandscape = (initialPos) => {
                for (let i = 0; i < length; i++) {
                    let testPos = initialPos + i;
                    if (testPos % 10 == 0) {
                        console.log(testPos)
                            initialPos = initialPos + (i + 1)
                            console.log("checking pos 1")
                            pushToArrayLandscape(initialPos)
                            return true
                        } 
                    }
                };
            if (!checkPosLandscape(initialPos) ){
                console.log('checking pos 2')
                pushToArrayLandscape(initialPos)
            }
        } else if (orient === "portrait") {
            // to make sure all positions are in the gameboard

            const checkPosPortrait = (initialPos) =>{ 
                for (let i = 0; i < length; i++){
                    let tempPos = initialPos + (i * 10)
                    if (tempPos > 100){
                        initialPos = initialPos - ((length - i) * 10)
                        pushtoArrayPortrait(initialPos)
                        console.log(initialPos +'checking pos 3')
                        return true
                    }
                }
            }

            const pushtoArrayPortrait = (initialPos) =>{
                for (let i = 0; i < length; i++) {
                    position.push(player + (initialPos + i * 10));
                    allPortraitPos.push(initialPos + i * 10)
                }
            }
            
            if (!checkPosPortrait(initialPos)){
                console.log('checking pos 4')
                pushtoArrayPortrait(initialPos)
            }
        }
    };
    shipPos(player);
    return { getLength, position, hits, player };
};

const albama = ship(8, "landscape", "playerOne");
const chicken = ship(6, "portrait", "playerTwo");
//let allShipPos = [];
//allShipPos.push(...chicken.position);
//allShipPos.push(...albama.position);
let allShips = [albama, chicken];
console.log(allShips);

let totalHits = [];

const generateboard = () => {
    const player1gameTile = document.querySelector("#player1GameTile");
    const player2gameTile = document.querySelector("#player2GameTile");
    const gameContainer1 = document.querySelector(".gameContainer1");
    const gameContainer2 = document.querySelector(".gameContainer2");
    const playerTiles = [player1gameTile, player2gameTile];
    playerTiles.forEach((playerTile) => {
        for (let i = 0; i < 100; i++) {
            const tile = playerTile.cloneNode();
            tile.setAttribute("data-key", i + 1);
            tile.onclick = function (e) {
                tile.classList.add("hit");
                const hitNum = e.target.getAttribute("data-id") + e.target.getAttribute("data-key");
                console.log(hitNum);
                totalHits.push(hitNum);
                checkHits();
                checkShipDestroyed();
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
    //})
    //const tile = gameTile.cloneNode();
    //tile.setAttribute("data-key", i + 1);
    //tile.onclick = function (e) {
    //    tile.classList.add("hit");
    //   const hitNum = parseInt(e.target.getAttribute("data-key"));
    //    console.log(hitNum);
    //    totalHits.push(hitNum);
    //    checkHits();
    //    checkShipDestroyed();
    // };
    // gameContainer.appendChild(tile);

    //gameTile.remove();
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
        console.log(ship);
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

generateboard();

const nameInput = (() => {
    const playerfield = document.querySelector("#text");
    const formContainer = document.querySelector(".formContainer");
    const shipformContainer = document.querySelector(".shipFormContainer");
    playerfield.onkeypress = function getplayersname(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            getplayer1Name(e);
            //playerfield.removeEventListener("keypress", getplayersname())
        }
    };
    const getplayer1Name = (e) => {
        console.log(playerfield.value);
        let player1 = new player(`${playerfield.value}`);
        playerfield.value = "";
        const formHeader = document.querySelector("#formHeader");
        formHeader.textContent = "Welcome Player 2, Enter your name:";
        playerfield.onkeypress = function (a) {
            getplayer2name(a, player1);
        };
    };
    const getplayer2name = (a, player1) => {
        if (a.keyCode == 13) {
            a.preventDefault();
            let player2 = new player(`${playerfield.value}`);
            playerfield.value = "";
            formContainer.classList.add("moved");
            shipformContainer.classList.add("moved");
            const playbutton = document.querySelector("#playButton");
            playbutton.onclick = function (b) {
                generateShips(b, player1, player2);
            };
            //formHeader.textContent = "Enter the number of ships for each player:"
            //playerfield.onkeypress = function(b){generateShips(b, player1, player2)}
        }
    };

    const generateShips = (b, player1, player2) => {
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
                const player1cruisers = ship(randomLength, "portrait", "playerOne");
                const player2cruisers = ship(randomLength, "portrait", "playerTwo");
                allShips.push(player1cruisers, player2cruisers);
            }
        };
        const generateDestroyers = (minLength, maxLength) => {
            for (let i = 0; i < destroyersNum; i++) {
                let randomLength = randomShipLength(minLength, maxLength);
                const player1Destroyers = ship(randomLength, "landscape", "playerOne");
                const player2Destroyers = ship(randomLength, "landscape", "playerTwo");
                allShips.push(player1Destroyers, player2Destroyers);
            }
        };

        generateCruisers(minLength, maxLength);
        generateDestroyers(minLength, maxLength);
        console.log(allLandscapePos);
        console.log(allPortraitPos);

    };
})();
