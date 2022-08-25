import { generateScoreBoard } from "./scoreBoard";
import { player } from "./playerFactory";
import { ship } from "./shipfactory";
import { generateboard } from "./gameBoardFactory";
import { checkHits } from "./checkHits";
import { checkShipDestroyed } from "./checkHits";
import { tileBackgroundColor } from "./tileBackgroundColor";
import explosionIcon from "../../Assets/explosion.png";
import SinkIcon from "../../Assets/sinking.png";
import { beforeEach, describe, expect, it, vi } from "vitest";
import path from "path";
import fs from "fs";
import { Window } from "happy-dom";

const htmlDocPath = path.join(process.cwd(), "./src/index.html");
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window();
const document = window.document;
document.write(htmlDocumentContent);
vi.stubGlobal("document", document);

beforeEach(() => {
    document.body.innerHTML = "";
    document.write(htmlDocumentContent);
});

describe("generateScoreBoard", () => {
    it("should display player scores", () => {
        let allShips = [];
        let testPlayer1 = new player("john");
        let testPlayer2 = new player("Marcus");
        const shipNumber = 5;

        const randomShipLength = (minLength, maxLength) => {
            return Math.floor(Math.random() * (maxLength - minLength + 1) + minLength);
        };

        for (let i = 0; i < shipNumber; i++) {
            let randomLength = randomShipLength(3, 5);
            const player1cruisers = ship(randomLength, "portrait", "playerOne", 100);
            const player2cruisers = ship(randomLength, "portrait", "playerTwo", 100);
            allShips.push(player1cruisers, player2cruisers);
        }

        generateScoreBoard(testPlayer1, testPlayer2, allShips);
        const player1Score = document.querySelector("#player1Score");
        const player2Score = document.querySelector("#player2Score");
        console.log(player1Score.textContent);

        expect(player1Score.textContent).toBe(`john score: 0 ships left: ${shipNumber}`);
        expect(player2Score.textContent).toBe(`Marcus score: 0 ships left: ${shipNumber}`);
    });
    it("Should display Player Wins if all its hits position values matches its position values ", () => {
        let allShips = [];
        let testPlayer1 = new player("john");
        let testPlayer2 = new player("Marcus");

        for (let i = 0; i < 3; i++) {
            let player1cruisers = ship(5, "portrait", "playerOne", 100);
            let player2cruisers = ship(5, "portrait", "playerTwo", 100);
            allShips.push(player1cruisers, player2cruisers);
        }
        let player1Ships = allShips.filter((ship) => ship.player == "playerOne");
        player1Ships.forEach((ship) => {
            ship.hits = [...ship.position];
        });
        generateScoreBoard(testPlayer1, testPlayer2, allShips);

        const playerTurnHeader = document.querySelector("#playerTurn");
        expect(playerTurnHeader.textContent).toBe(`${testPlayer1.name} Wins`);
    });
});

describe("generateboard", () => {
    it("Should generate correct number of game tiles based on value given", () => {
        let numberOfTiles = 100;

        generateboard(numberOfTiles);
        const gameTiles = document.querySelectorAll('[Data-id="playerOne"]');

        expect(gameTiles.length).toBe(numberOfTiles);
    });
    it("Should add a class of hit to positions that are clicked and if the player has the turn", () => {
        let allShips = [];
        let testPlayer1 = new player("john");
        let testPlayer2 = new player("Marcus");
        testPlayer1.turn++;

        generateboard(100, testPlayer1, testPlayer2, allShips);
        let player1gameTile = document.querySelector('[data-id="playerOne"],[data-key="1"]');
        let player2gameTile = document.querySelector('[data-id="playerTwo"],[data-key="1"]');
        player1gameTile.click();
        player2gameTile.click();

        expect(player1gameTile.className).toBe("hit");
        expect(player2gameTile.className).not.toBe("hit");
    });
});

describe("checkhits", () => {
    it("should add a hit icon if allships array position matches totalhits array position", () => {
        let allShips = [];
        let totalHits = [];
        let testPlayer1 = new player("john");
        let testPlayer2 = new player("Marcus");

        for (let i = 0; i < 3; i++) {
            let player1cruisers = ship(5, "portrait", "playerOne", 100);
            let player2cruisers = ship(5, "portrait", "playerTwo", 100);
            allShips.push(player1cruisers, player2cruisers);
        }
        generateboard(100, testPlayer1, testPlayer2, allShips);

        let player1Ships = allShips.filter((ship) => ship.player == "playerOne");
        player1Ships.forEach((ship) => {
            ship.hits = [...ship.position];
        });
        totalHits = [...player1Ships[0].hits];

        checkHits(testPlayer1, testPlayer2, player1Ships, totalHits);

        const hitdDataKey = totalHits[0].substr(9, 12);
        let player1HitTile = document.querySelector(`[data-key="${hitdDataKey}"][data-id="playerOne"]`);

        expect(player1HitTile.firstElementChild.tagName).toBe("IMG");
        expect(player1HitTile.firstElementChild.src).toBe(explosionIcon);
    });
});

describe("checkShipDestroyed", () => {
    it("should add a sick icon if ship hits array matches its position array", () => {
        let allShips = [];
        let totalHits = [];
        let testPlayer1 = new player("john");
        let testPlayer2 = new player("Marcus");

        for (let i = 0; i < 3; i++) {
            let player1cruisers = ship(5, "portrait", "playerOne", 100);
            let player2cruisers = ship(5, "portrait", "playerTwo", 100);
            allShips.push(player1cruisers, player2cruisers);
        }
        generateboard(100, testPlayer1, testPlayer2, allShips);
        let player1Ships = allShips.filter((ship) => ship.player == "playerOne");
        player1Ships.forEach((ship) => {
            ship.hits = [...ship.position];
        });

        totalHits = [...player1Ships[0].hits];
        checkHits(testPlayer1, testPlayer2, player1Ships, totalHits);
        checkShipDestroyed(player1Ships);
        const hitdDataKey = player1Ships[0].position[0].substr(9, 12);

        let player1HitTile = document.querySelector(`[data-key="${hitdDataKey}"][data-id="playerOne"]`);

        expect(player1HitTile.firstElementChild.src).toBe(SinkIcon);
    });
});

describe("tileBackgroundColor", () => {
    it("Should have a background color if player has a turn", () => {
        let testPlayer1 = new player("john");
        let testPlayer2 = new player("Marcus");
        testPlayer1.turn++;

        tileBackgroundColor(testPlayer1, testPlayer2);

        const player1Container = document.querySelector(".gameContainer1");
        const player2Container = document.querySelector(".gameContainer2");
        expect(player1Container.style.backgroundColor).toBe("#8C4236");
        expect(player2Container.style.backgroundColor).toBe("transparent");
    });
});
