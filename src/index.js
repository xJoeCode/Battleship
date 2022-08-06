import "./style.css";
import explosionIcon from "./Assets/explosion.png";
import SinkIcon from "./Assets/sinking.png"

const ship = (length, orient) => {
    const getLength = () => length;
    let position = [];
    let hits = [];


    const shipPos = (() => {
        let initialPos = Math.floor(Math.random() * 100 + 1);

        if (orient === "landscape") {
            // to make sure all positions are placed correctly
            const checkPos = () => {
                for (let i = 0; i < length; i++) {
                    let testPos = initialPos + i;
                    if (testPos % 10 == 0) {
                        return true;
                    }
                }
            };
            if (checkPos()) {
                initialPos = initialPos - length;
            }
            for (let i = 0; i < length; i++) {
                position.push(initialPos + i);
            }
        } else if (orient === "portrait") {
            // to make sure all positions are in the gameboard
            const lastPos = initialPos + length * 10;
            if (lastPos > 100) {
                initialPos = initialPos - length * 10;
            }
            for (let i = 0; i < length; i++) {
                position.push(initialPos + i * 10);
            }
        }
    })();
    return { getLength, position, hits };
};

const albama = ship(3, "landscape");
const chicken = ship(4, "portrait");
let allShipPos = [];
allShipPos.push(...chicken.position);
allShipPos.push(...albama.position);
let allShips = [albama, chicken];
console.log(allShips);

let totalHits = [];

const generateboard = () => {
    const gameTile = document.querySelector("#gameTile");
    const gameContainer = document.querySelector(".gameContainer");
    for (let i = 0; i < 100; i++) {
        const tile = gameTile.cloneNode();
        tile.setAttribute("data-key", i + 1);
        tile.onclick = function (e) {
            tile.classList.add("hit");
            const hitNum = parseInt(e.target.getAttribute("data-key"));
            console.log(hitNum);
            totalHits.push(hitNum);
            checkHits();
            checkShipDestroyed()
        };
        gameContainer.appendChild(tile);
    }
    gameTile.remove();
};

const checkHits = () => {
    const addHItIcon = (hit) => {
        const hitTile = document.querySelector(`[data-key="${hit}"]`);
        if (!hitTile.hasChildNodes()) {
            const hitImage = document.createElement("img");
            hitImage.classList.add("hitImage");
            hitImage.src = explosionIcon;
            hitTile.appendChild(hitImage);
        }
    };
    console.log(totalHits);

    allShips.forEach(ship => {
        let hit = ship.position.filter((positionNum) => totalHits.includes(positionNum))
        ship.hits = [...hit]
        hit.forEach((hit) => {
            addHItIcon(hit);
        });
    })
    console.log(allShips)

  //  let hit = allShipPos.filter((position) => hits.includes(position));
  //  hit.forEach((hit) => {
  //      addHItIcon(hit);
  //  });
};

const checkShipDestroyed = () =>{
    allShips.forEach(ship => {
       //let checkForDestroyed = ship.position.every(pos => totalHits.includes(pos))
       let checkForDestroyed = ship.position.every(pos => ship.hits.includes(pos))
       if (checkForDestroyed){
        destroyShip(ship)
       }
       //console.log(checkForDestroyed)
       //console.log(ship.position)
       //console.log(ship.hits)
    })
}

const destroyShip = (ship) =>{
    ship.position.forEach( number => {
        const shipPos = document.querySelector(`[data-key="${number}"]`)
        shipPos.firstChild.src = SinkIcon
        console.log(shipPos)
    })
}

generateboard();
