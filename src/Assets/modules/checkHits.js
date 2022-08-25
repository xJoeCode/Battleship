import { generateScoreBoard } from "./scoreBoard";
import explosionIcon from "../../Assets/explosion.png";
import sinkIcon from "../../Assets/sinking.png";

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
    //console.log(totalHits);

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
        //console.log(checkForDestroyed)
        //console.log(ship.position)
        //console.log(ship.hits)
    });

    

};

export{checkHits, checkShipDestroyed}