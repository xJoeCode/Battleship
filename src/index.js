import "./cssReset.css";
import "./style.css";
import explosionIcon from "./Assets/explosion.png";
import SinkIcon from "./Assets/sinking.png";
import VanillaTilt from "vanilla-tilt";
import {player} from './Assets/modules/playerFactory'
import {ship} from './Assets/modules/shipfactory'
import { generateScoreBoard } from "./Assets/modules/scoreBoard";
import { generatePlayerTurns } from "./Assets/modules/playerTurns";
import { tileBackgroundColor } from "./Assets/modules/tileBackgroundColor";






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
            if (parseInt(maxLength.value) <= parseInt(minLength.value)) {
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
    let allShips = []
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
    generateScoreBoard(player1, player2, allShips);
    generatePlayerTurns(player1, player2, startingPlayer, gameBoardSize, allShips);
};










