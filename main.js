/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Assets/modules/checkHits.js":
/*!*****************************************!*\
  !*** ./src/Assets/modules/checkHits.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkHits": () => (/* binding */ checkHits),
/* harmony export */   "checkShipDestroyed": () => (/* binding */ checkShipDestroyed)
/* harmony export */ });
/* harmony import */ var _scoreBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scoreBoard */ "./src/Assets/modules/scoreBoard.js");
/* harmony import */ var _Assets_explosion_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Assets/explosion.png */ "./src/Assets/explosion.png");
/* harmony import */ var _Assets_sinking_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Assets/sinking.png */ "./src/Assets/sinking.png");




const checkHits = (player1, player2, allShips, totalHits) => {
  const addHItIcon = hit => {
    const dataid = hit.substr(0, 9);
    const datakey = hit.substr(9, 12);
    const hitTile = document.querySelector("[data-key=\"".concat(datakey, "\"][data-id=\"").concat(dataid, "\"]"));

    if (!hitTile.hasChildNodes()) {
      const hitImage = document.createElement("img");
      hitImage.classList.add("hitImage");
      hitImage.src = _Assets_explosion_png__WEBPACK_IMPORTED_MODULE_1__;
      hitTile.appendChild(hitImage);
    }
  };

  allShips.forEach(ship => {
    let hit = ship.position.filter(positionNum => totalHits.includes(positionNum));
    ship.hits = [...hit];
    hit.forEach(hit => {
      addHItIcon(hit);
    });
  });
  (0,_scoreBoard__WEBPACK_IMPORTED_MODULE_0__.generateScoreBoard)(player1, player2, allShips);
};

const checkShipDestroyed = allShips => {
  const destroyShip = ship => {
    ship.position.forEach(number => {
      const dataid = number.substr(0, 9);
      const datakey = number.substr(9, 12);
      const shipPos = document.querySelector("[data-key=\"".concat(datakey, "\"][data-id=\"").concat(dataid, "\"]"));
      shipPos.firstChild.src = _Assets_sinking_png__WEBPACK_IMPORTED_MODULE_2__;
    });
  };

  allShips.forEach(ship => {
    let checkForDestroyed = ship.position.every(pos => ship.hits.includes(pos));

    if (checkForDestroyed) {
      destroyShip(ship);
    }
  });
};



/***/ }),

/***/ "./src/Assets/modules/gameBoardFactory.js":
/*!************************************************!*\
  !*** ./src/Assets/modules/gameBoardFactory.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateboard": () => (/* binding */ generateboard)
/* harmony export */ });
/* harmony import */ var _checkHits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkHits */ "./src/Assets/modules/checkHits.js");
/* harmony import */ var _playerFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playerFactory */ "./src/Assets/modules/playerFactory.js");
/* harmony import */ var _scoreBoard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scoreBoard */ "./src/Assets/modules/scoreBoard.js");
/* harmony import */ var _tileBackgroundColor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tileBackgroundColor */ "./src/Assets/modules/tileBackgroundColor.js");





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

  const computerMove = (player1, player2) => {
    if (player1.turn == 1 && player1.name === "COMPUTER") {
      let tile = selectRandomTile(player1, 'playerOne');
      tile.click();
    } else if (player2.turn == 1 && player2.name === "COMPUTER") {
      let tile = selectRandomTile(player2, 'playerTwo');
      tile.click();
    }
  };

  const selectRandomTile = (player, whichPlayer) => {
    while (true) {
      let tileNum = (Math.floor(Math.random() * gameBoardSize) + 1).toString();
      console.log(tileNum);

      if (!totalHits.find(element => tileNum == element)) {
        //const tile = whichPlayer.concat('',tileNum)
        const tileElement = document.querySelector("[data-id=\"".concat(whichPlayer, "\"][data-key=\"").concat(tileNum, "\"]"));
        console.log(tileElement);
        console.log(whichPlayer);
        return tileElement;
      }
    }
  };

  const playerTiles = [player1gameTile, player2gameTile];
  playerTiles.forEach(playerTile => {
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
          (0,_checkHits__WEBPACK_IMPORTED_MODULE_0__.checkHits)(player1, player2, allShips, totalHits);
          (0,_checkHits__WEBPACK_IMPORTED_MODULE_0__.checkShipDestroyed)(allShips);

          if ((0,_scoreBoard__WEBPACK_IMPORTED_MODULE_2__.generateScoreBoard)(player1, player2, allShips)) {
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
          (0,_checkHits__WEBPACK_IMPORTED_MODULE_0__.checkHits)(player1, player2, allShips, totalHits);
          (0,_checkHits__WEBPACK_IMPORTED_MODULE_0__.checkShipDestroyed)(allShips);

          if ((0,_scoreBoard__WEBPACK_IMPORTED_MODULE_2__.generateScoreBoard)(player1, player2, allShips)) {
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
            playerturnHeader.textContent = "".concat(player2.name, "'s Turn");
            player1.turn--;
            player2.turn++;
            (0,_tileBackgroundColor__WEBPACK_IMPORTED_MODULE_3__.tileBackgroundColor)(player1, player2);
            computerMove(player1, player2);
          }
        } else if (player2.turn == 1) {
          if (attackShip(e, player1, player2)) {
            playerturnHeader.textContent = "".concat(player1.name, "'s Turn");
            player2.turn--;
            player1.turn++;
            (0,_tileBackgroundColor__WEBPACK_IMPORTED_MODULE_3__.tileBackgroundColor)(player1, player2);
            computerMove(player1, player2);
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
  computerMove(player1, player2);
};



/***/ }),

/***/ "./src/Assets/modules/playerFactory.js":
/*!*********************************************!*\
  !*** ./src/Assets/modules/playerFactory.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "player": () => (/* binding */ player)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class player {
  constructor(name) {
    _defineProperty(this, "turn", 0);

    this.name = name;
  }

}

/***/ }),

/***/ "./src/Assets/modules/playerTurns.js":
/*!*******************************************!*\
  !*** ./src/Assets/modules/playerTurns.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generatePlayerTurns": () => (/* binding */ generatePlayerTurns)
/* harmony export */ });
/* harmony import */ var _tileBackgroundColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tileBackgroundColor */ "./src/Assets/modules/tileBackgroundColor.js");
/* harmony import */ var _gameBoardFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoardFactory */ "./src/Assets/modules/gameBoardFactory.js");



const generatePlayerTurns = (player1, player2, startingPlayer, gameBoardSize, allShips) => {
  const playerturnHeader = document.querySelector("#playerTurn");
  const player1Header = document.querySelector("#player1Header");
  const player2Header = document.querySelector("#player2Header");
  player1Header.textContent = "".concat(player1.name, "'s board");
  player2Header.textContent = "".concat(player2.name, "'s board");

  if (startingPlayer == "player1") {
    player1.turn++;
    playerturnHeader.textContent = "".concat(player1.name, "'s Turn");
    (0,_tileBackgroundColor__WEBPACK_IMPORTED_MODULE_0__.tileBackgroundColor)(player1, player2);
  } else if (startingPlayer == "player2") {
    player2.turn++;
    playerturnHeader.textContent = "".concat(player2.name, "'s Turn");
    (0,_tileBackgroundColor__WEBPACK_IMPORTED_MODULE_0__.tileBackgroundColor)(player1, player2);
  }

  (0,_gameBoardFactory__WEBPACK_IMPORTED_MODULE_1__.generateboard)(gameBoardSize, player1, player2, allShips);
};



/***/ }),

/***/ "./src/Assets/modules/scoreBoard.js":
/*!******************************************!*\
  !*** ./src/Assets/modules/scoreBoard.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateScoreBoard": () => (/* binding */ generateScoreBoard)
/* harmony export */ });
const generateScoreBoard = (player1, player2, allShips) => {
  console.log(allShips);
  const player1Score = document.querySelector("#player1Score");
  const player2Score = document.querySelector("#player2Score");
  const playerTurnHeader = document.querySelector("#playerTurn");
  let remainingPlayer1Ships = allShips.filter(ship => ship.player == "playerOne" && ship.position.length !== ship.hits.length);
  let remainingPlayer2Ships = allShips.filter(ship => ship.player == "playerTwo" && ship.position.length !== ship.hits.length);
  let destroyedPlayer1Ships = allShips.filter(ship => ship.player == "playerOne" && ship.position.length == ship.hits.length);
  let destroyedPlayer2Ships = allShips.filter(ship => ship.player == "playerTwo" && ship.position.length == ship.hits.length);

  if (remainingPlayer1Ships.length == 0) {
    playerTurnHeader.textContent = "".concat(player1.name, " Wins");
    player1Score.textContent = "".concat(player1.name, " score: ").concat(destroyedPlayer1Ships.length, "  remaining ships: ").concat(remainingPlayer1Ships.length);
    return false;
  } else if (remainingPlayer2Ships.length == 0) {
    playerTurnHeader.textContent = "".concat(player2.name, " Wins");
    player2Score.textContent = "".concat(player2.name, " score: ").concat(destroyedPlayer2Ships.length, " remaining ships: ").concat(remainingPlayer2Ships.length);
    return false;
  }

  player1Score.textContent = "".concat(player1.name, " score: ").concat(destroyedPlayer1Ships.length, " ships left: ").concat(remainingPlayer1Ships.length);
  player2Score.textContent = "".concat(player2.name, " score: ").concat(destroyedPlayer2Ships.length, " ships left: ").concat(remainingPlayer2Ships.length);
  return true;
};



/***/ }),

/***/ "./src/Assets/modules/shipfactory.js":
/*!*******************************************!*\
  !*** ./src/Assets/modules/shipfactory.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ship": () => (/* binding */ ship)
/* harmony export */ });
let allPlayer1Pos = [];
let allPlayer2Pos = [];

const ship = (length, orient, player, gameBoardSize) => {
  const getLength = () => length;

  let position = [];
  let hits = [];

  const shipPos = player => {
    let initialPos = Math.floor(Math.random() * gameBoardSize + 1);
    let gameBoardLength = Math.sqrt(gameBoardSize);

    if (orient === "landscape") {
      // to make sure all positions are placed correctly
      const checkNoDuplicateLandscapePos = Pos => {
        for (let i = 0; i < length; i++) {
          let tempPos = Pos + i;

          if (player == "playerOne" && allPlayer1Pos.includes(tempPos)) {
            return true;
          } else if (player == "playerTwo" && allPlayer2Pos.includes(tempPos)) {
            return true;
          }
        }
      };

      const pushToArrayLandscape = initialPos => {
        if (!checkNoDuplicateLandscapePos(initialPos)) {
          for (let i = 0; i < length; i++) {
            let finalPos = initialPos + i;
            position.push(player + finalPos);

            if (player == "playerOne") {
              allPlayer1Pos.push(finalPos);
            } else if (player == "playerTwo") {
              allPlayer2Pos.push(finalPos);
            }
          }
        } else {
          console.log("landscape Pos already used" + initialPos);
          shipPos(player);
        }
      };

      const checkPosLandscape = initialPos => {
        for (let i = 0; i < length; i++) {
          let testPos = initialPos + i;

          if (testPos % gameBoardLength == 0) {
            initialPos = initialPos + (i + 1);
            pushToArrayLandscape(initialPos);
            return true;
          }
        }
      };

      if (!checkPosLandscape(initialPos)) {
        pushToArrayLandscape(initialPos);
      }
    } else if (orient === "portrait") {
      const checkNoDuplicatePotraitPos = Pos => {
        for (let i = 0; i < length; i++) {
          let tempPos = initialPos + i * gameBoardLength;

          if (player == "playerOne" && allPlayer1Pos.includes(tempPos)) {
            return true;
          } else if (player == "playerTwo" && allPlayer2Pos.includes(tempPos)) {
            return true;
          }
        }
      };

      const checkPosPortrait = initialPos => {
        for (let i = 0; i < length; i++) {
          let tempPos = initialPos + i * gameBoardLength;

          if (tempPos > gameBoardSize) {
            initialPos = initialPos - (length - i) * gameBoardLength;
            pushtoArrayPortrait(initialPos);
            return true;
          }
        }
      };

      const pushtoArrayPortrait = initialPos => {
        if (!checkNoDuplicatePotraitPos(initialPos)) {
          for (let i = 0; i < length; i++) {
            position.push(player + (initialPos + i * gameBoardLength));

            if (player == "playerOne") {
              allPlayer1Pos.push(initialPos + i * gameBoardLength);
            } else if (player == "playerTwo") {
              allPlayer2Pos.push(initialPos + i * gameBoardLength);
            }
          }
        } else {
          console.log("Portrait Pos already used " + initialPos);
          shipPos(player);
        }
      };

      if (!checkPosPortrait(initialPos)) {
        pushtoArrayPortrait(initialPos);
      }
    }
  };

  shipPos(player);
  return {
    getLength,
    position,
    hits,
    player
  };
};



/***/ }),

/***/ "./src/Assets/modules/tileBackgroundColor.js":
/*!***************************************************!*\
  !*** ./src/Assets/modules/tileBackgroundColor.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tileBackgroundColor": () => (/* binding */ tileBackgroundColor)
/* harmony export */ });
const tileBackgroundColor = (player1, player2) => {
  const player1Container = document.querySelector(".gameContainer1");
  const player2Container = document.querySelector(".gameContainer2");

  if (player1.turn == 1) {
    player1Container.style.backgroundColor = "#8C4236";
  } else if (player1.turn == 0) {
    player1Container.style.backgroundColor = "transparent";
  }

  if (player2.turn == 1) {
    player2Container.style.backgroundColor = "#8C4236";
  } else if (player2.turn == 0) {
    player2Container.style.backgroundColor = "transparent";
  }
};



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/cssReset.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/cssReset.css ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}", "",{"version":3,"sources":["webpack://./src/cssReset.css"],"names":[],"mappings":"AAAA;;;CAGC;;AAED;;;;;;;;;;;;;CAaC,SAAS;CACT,UAAU;CACV,SAAS;CACT,eAAe;CACf,aAAa;CACb,wBAAwB;AACzB;AACA,gDAAgD;AAChD;;CAEC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,gBAAgB;AACjB;AACA;CACC,YAAY;AACb;AACA;;CAEC,WAAW;CACX,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,iBAAiB;AAClB","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root{\n    --main-font: 'Source Serif Pro', serif;\n    --secondary-font: 'East Sea Dokdo';\n}\n\n#player1GameTile, #player2GameTile{\n    background-color: #8C6636;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    border: 1px solid black;\n    cursor: pointer;\n    display: grid;\n    place-content: center;\n    box-sizing: border-box;\n}\n#player1GameTile:hover, #player2GameTile:hover{\n    background-color: #8C4236;\n}\n\n\n#player1GameTile.hit, #player2GameTile.hit{\n    background-color: #5B2820;\n}\n\n\n\n.gameContainer1, .gameContainer2{\n    margin: 1rem;\n    width: 42rem;\n    height: 42rem;\n    place-items: center;\n    display: none;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(11, 1fr);\n\n}\n.logo{\n    font-size:  6rem;\n    font-family: var(--secondary-font);\n    margin-bottom: 50px;\n    padding: 20px;\n    transform: translateZ(60px);\n    \n}\n\n#player1Header, #player2Header{\n    grid-column: 1/-1;\n    font-size: 2rem;\n    height: auto;\n    font-family: var(--main-font);\n    \n}\n\n.hitImage{\n    width: 90%;\n    height: 90%;\n    background-size: 80%;\n    background-repeat: no-repeat;\n    background-position: center;\n}\n\n.formContainer{\n    position: fixed;\n    background-color: #8C4236;\n    z-index: 3;\n    width: 100%;\n    height: 100vh;\n    top: 0;\n    left: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transition: transform 1s ease-in-out;\n}\n\n.shipFormContainer{\n    position: fixed;\n    background-color: #8C7936;\n    z-index: 2;\n    width: 100%;\n    height: 100vh;\n    top: 0;\n    left: 0;\n    opacity: 0;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    transform: translateY( 100vh) rotate(180deg);\n    transition: transform 1s ease-in-out;\n}\n\n.shipFormContainer.moved{\n    transform: translateY( 0vh) rotate(0deg);\n    opacity: 1;\n}\n.shipFormContainer.moved.slideDown{\n    transform: translateY(-100vh) rotate(180deg);\n    opacity: 1;\n}\n\n.formContainer.moved{\n    transform: translateY( 100vh) rotate(180deg);\n}\n\n#form, #shipForm{\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    padding:30px;\n    border-radius: 30px;\n    transform-style: preserve-3d;\n    transform: perspective(1000px);\n}\n\n#playerTurn{\n    font-family: var(--main-font);\n    font-size: 3.5rem;\n    margin-top: 20px;\n    border-bottom: 1px solid black;\n    \n    \n}\n\n#player1Score, #player2Score{\n    font-family: var(--main-font);\n    font-size: 1.5rem;\n    margin: 15px;\n}\n\n.header{\n    grid-column: 1/ -1;\n    text-align: center;\n    background-color: #28683B;\n    border-radius: 2rem;\n    box-shadow: 1px 1px 10px rgb(53, 53, 53);\n    display: none;\n    flex-direction: column;\n    align-items: center;\n    padding: 10px;\n    margin: 30px;\n    width: 50%;\n}\n\ninput[type=\"text\"], input[type=\"number\"]{\n    width: 70%;\n    height: 3rem;\n    background-color:  transparent;\n    border: none;\n    border-bottom: 1px solid black;\n    margin-bottom: 20px;\n    text-align: center;\n    font-family: var(--main-font);\n    font-size: 2rem;\n}\n\ninput[type=\"text\"]:focus,  input[type=\"number\"]:focus{\n    outline: none;\n}\n\nh1{\n    margin-bottom: 20px;\n    font-family: var(--main-font);\n    font-size: 2rem;\n}\n\nbutton{\n    width: 200px;\n    height: 50px;\n    background-color: #28683B;\n    box-shadow: 2px 2px 2px rgb(53, 53, 53);\n    cursor: pointer;\n    border: none;\n}\n\nlabel{\n    font-family: var(--main-font);\n    font-size: 1.4rem;\n}\n\nimg{\n    width: 30px;\n}\n\nbody{\n    background-color: #264559;\n    display: grid;\n    grid-template-rows: 1fr 5fr;\n    grid-template-columns: 1fr 1fr;\n    place-items: center;\n    height: 100vh;\n    width: 100%;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,sCAAsC;IACtC,kCAAkC;AACtC;;AAEA;IACI,yBAAyB;IACzB,WAAW;IACX,YAAY;IACZ,SAAS;IACT,uBAAuB;IACvB,eAAe;IACf,aAAa;IACb,qBAAqB;IACrB,sBAAsB;AAC1B;AACA;IACI,yBAAyB;AAC7B;;;AAGA;IACI,yBAAyB;AAC7B;;;;AAIA;IACI,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,aAAa;IACb,sCAAsC;IACtC,mCAAmC;;AAEvC;AACA;IACI,gBAAgB;IAChB,kCAAkC;IAClC,mBAAmB;IACnB,aAAa;IACb,2BAA2B;;AAE/B;;AAEA;IACI,iBAAiB;IACjB,eAAe;IACf,YAAY;IACZ,6BAA6B;;AAEjC;;AAEA;IACI,UAAU;IACV,WAAW;IACX,oBAAoB;IACpB,4BAA4B;IAC5B,2BAA2B;AAC/B;;AAEA;IACI,eAAe;IACf,yBAAyB;IACzB,UAAU;IACV,WAAW;IACX,aAAa;IACb,MAAM;IACN,OAAO;IACP,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,oCAAoC;AACxC;;AAEA;IACI,eAAe;IACf,yBAAyB;IACzB,UAAU;IACV,WAAW;IACX,aAAa;IACb,MAAM;IACN,OAAO;IACP,UAAU;IACV,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,4CAA4C;IAC5C,oCAAoC;AACxC;;AAEA;IACI,wCAAwC;IACxC,UAAU;AACd;AACA;IACI,4CAA4C;IAC5C,UAAU;AACd;;AAEA;IACI,4CAA4C;AAChD;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,YAAY;IACZ,mBAAmB;IACnB,4BAA4B;IAC5B,8BAA8B;AAClC;;AAEA;IACI,6BAA6B;IAC7B,iBAAiB;IACjB,gBAAgB;IAChB,8BAA8B;;;AAGlC;;AAEA;IACI,6BAA6B;IAC7B,iBAAiB;IACjB,YAAY;AAChB;;AAEA;IACI,kBAAkB;IAClB,kBAAkB;IAClB,yBAAyB;IACzB,mBAAmB;IACnB,wCAAwC;IACxC,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,aAAa;IACb,YAAY;IACZ,UAAU;AACd;;AAEA;IACI,UAAU;IACV,YAAY;IACZ,8BAA8B;IAC9B,YAAY;IACZ,8BAA8B;IAC9B,mBAAmB;IACnB,kBAAkB;IAClB,6BAA6B;IAC7B,eAAe;AACnB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,mBAAmB;IACnB,6BAA6B;IAC7B,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,yBAAyB;IACzB,uCAAuC;IACvC,eAAe;IACf,YAAY;AAChB;;AAEA;IACI,6BAA6B;IAC7B,iBAAiB;AACrB;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,yBAAyB;IACzB,aAAa;IACb,2BAA2B;IAC3B,8BAA8B;IAC9B,mBAAmB;IACnB,aAAa;IACb,WAAW;AACf","sourcesContent":[":root{\n    --main-font: 'Source Serif Pro', serif;\n    --secondary-font: 'East Sea Dokdo';\n}\n\n#player1GameTile, #player2GameTile{\n    background-color: #8C6636;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    border: 1px solid black;\n    cursor: pointer;\n    display: grid;\n    place-content: center;\n    box-sizing: border-box;\n}\n#player1GameTile:hover, #player2GameTile:hover{\n    background-color: #8C4236;\n}\n\n\n#player1GameTile.hit, #player2GameTile.hit{\n    background-color: #5B2820;\n}\n\n\n\n.gameContainer1, .gameContainer2{\n    margin: 1rem;\n    width: 42rem;\n    height: 42rem;\n    place-items: center;\n    display: none;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(11, 1fr);\n\n}\n.logo{\n    font-size:  6rem;\n    font-family: var(--secondary-font);\n    margin-bottom: 50px;\n    padding: 20px;\n    transform: translateZ(60px);\n    \n}\n\n#player1Header, #player2Header{\n    grid-column: 1/-1;\n    font-size: 2rem;\n    height: auto;\n    font-family: var(--main-font);\n    \n}\n\n.hitImage{\n    width: 90%;\n    height: 90%;\n    background-size: 80%;\n    background-repeat: no-repeat;\n    background-position: center;\n}\n\n.formContainer{\n    position: fixed;\n    background-color: #8C4236;\n    z-index: 3;\n    width: 100%;\n    height: 100vh;\n    top: 0;\n    left: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transition: transform 1s ease-in-out;\n}\n\n.shipFormContainer{\n    position: fixed;\n    background-color: #8C7936;\n    z-index: 2;\n    width: 100%;\n    height: 100vh;\n    top: 0;\n    left: 0;\n    opacity: 0;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    transform: translateY( 100vh) rotate(180deg);\n    transition: transform 1s ease-in-out;\n}\n\n.shipFormContainer.moved{\n    transform: translateY( 0vh) rotate(0deg);\n    opacity: 1;\n}\n.shipFormContainer.moved.slideDown{\n    transform: translateY(-100vh) rotate(180deg);\n    opacity: 1;\n}\n\n.formContainer.moved{\n    transform: translateY( 100vh) rotate(180deg);\n}\n\n#form, #shipForm{\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    padding:30px;\n    border-radius: 30px;\n    transform-style: preserve-3d;\n    transform: perspective(1000px);\n}\n\n#playerTurn{\n    font-family: var(--main-font);\n    font-size: 3.5rem;\n    margin-top: 20px;\n    border-bottom: 1px solid black;\n    \n    \n}\n\n#player1Score, #player2Score{\n    font-family: var(--main-font);\n    font-size: 1.5rem;\n    margin: 15px;\n}\n\n.header{\n    grid-column: 1/ -1;\n    text-align: center;\n    background-color: #28683B;\n    border-radius: 2rem;\n    box-shadow: 1px 1px 10px rgb(53, 53, 53);\n    display: none;\n    flex-direction: column;\n    align-items: center;\n    padding: 10px;\n    margin: 30px;\n    width: 50%;\n}\n\ninput[type=\"text\"], input[type=\"number\"]{\n    width: 70%;\n    height: 3rem;\n    background-color:  transparent;\n    border: none;\n    border-bottom: 1px solid black;\n    margin-bottom: 20px;\n    text-align: center;\n    font-family: var(--main-font);\n    font-size: 2rem;\n}\n\ninput[type=\"text\"]:focus,  input[type=\"number\"]:focus{\n    outline: none;\n}\n\nh1{\n    margin-bottom: 20px;\n    font-family: var(--main-font);\n    font-size: 2rem;\n}\n\nbutton{\n    width: 200px;\n    height: 50px;\n    background-color: #28683B;\n    box-shadow: 2px 2px 2px rgb(53, 53, 53);\n    cursor: pointer;\n    border: none;\n}\n\nlabel{\n    font-family: var(--main-font);\n    font-size: 1.4rem;\n}\n\nimg{\n    width: 30px;\n}\n\nbody{\n    background-color: #264559;\n    display: grid;\n    grid-template-rows: 1fr 5fr;\n    grid-template-columns: 1fr 1fr;\n    place-items: center;\n    height: 100vh;\n    width: 100%;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/cssReset.css":
/*!**************************!*\
  !*** ./src/cssReset.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_cssReset_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./cssReset.css */ "./node_modules/css-loader/dist/cjs.js!./src/cssReset.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_cssReset_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_cssReset_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_cssReset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_cssReset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/vanilla-tilt/lib/vanilla-tilt.js":
/*!*******************************************************!*\
  !*** ./node_modules/vanilla-tilt/lib/vanilla-tilt.js ***!
  \*******************************************************/
/***/ ((module) => {



var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/**
 * Created by Sergiu Șandor (micku7zu) on 1/27/2017.
 * Original idea: https://github.com/gijsroge/tilt.js
 * MIT License.
 * Version 1.7.2
 */

var VanillaTilt = function () {
  function VanillaTilt(element) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, VanillaTilt);

    if (!(element instanceof Node)) {
      throw "Can't initialize VanillaTilt because " + element + " is not a Node.";
    }

    this.width = null;
    this.height = null;
    this.clientWidth = null;
    this.clientHeight = null;
    this.left = null;
    this.top = null;

    // for Gyroscope sampling
    this.gammazero = null;
    this.betazero = null;
    this.lastgammazero = null;
    this.lastbetazero = null;

    this.transitionTimeout = null;
    this.updateCall = null;
    this.event = null;

    this.updateBind = this.update.bind(this);
    this.resetBind = this.reset.bind(this);

    this.element = element;
    this.settings = this.extendSettings(settings);

    this.reverse = this.settings.reverse ? -1 : 1;
    this.glare = VanillaTilt.isSettingTrue(this.settings.glare);
    this.glarePrerender = VanillaTilt.isSettingTrue(this.settings["glare-prerender"]);
    this.fullPageListening = VanillaTilt.isSettingTrue(this.settings["full-page-listening"]);
    this.gyroscope = VanillaTilt.isSettingTrue(this.settings.gyroscope);
    this.gyroscopeSamples = this.settings.gyroscopeSamples;

    this.elementListener = this.getElementListener();

    if (this.glare) {
      this.prepareGlare();
    }

    if (this.fullPageListening) {
      this.updateClientSize();
    }

    this.addEventListeners();
    this.reset();
    this.updateInitialPosition();
  }

  VanillaTilt.isSettingTrue = function isSettingTrue(setting) {
    return setting === "" || setting === true || setting === 1;
  };

  /**
   * Method returns element what will be listen mouse events
   * @return {Node}
   */


  VanillaTilt.prototype.getElementListener = function getElementListener() {
    if (this.fullPageListening) {
      return window.document;
    }

    if (typeof this.settings["mouse-event-element"] === "string") {
      var mouseEventElement = document.querySelector(this.settings["mouse-event-element"]);

      if (mouseEventElement) {
        return mouseEventElement;
      }
    }

    if (this.settings["mouse-event-element"] instanceof Node) {
      return this.settings["mouse-event-element"];
    }

    return this.element;
  };

  /**
   * Method set listen methods for this.elementListener
   * @return {Node}
   */


  VanillaTilt.prototype.addEventListeners = function addEventListeners() {
    this.onMouseEnterBind = this.onMouseEnter.bind(this);
    this.onMouseMoveBind = this.onMouseMove.bind(this);
    this.onMouseLeaveBind = this.onMouseLeave.bind(this);
    this.onWindowResizeBind = this.onWindowResize.bind(this);
    this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this);

    this.elementListener.addEventListener("mouseenter", this.onMouseEnterBind);
    this.elementListener.addEventListener("mouseleave", this.onMouseLeaveBind);
    this.elementListener.addEventListener("mousemove", this.onMouseMoveBind);

    if (this.glare || this.fullPageListening) {
      window.addEventListener("resize", this.onWindowResizeBind);
    }

    if (this.gyroscope) {
      window.addEventListener("deviceorientation", this.onDeviceOrientationBind);
    }
  };

  /**
   * Method remove event listeners from current this.elementListener
   */


  VanillaTilt.prototype.removeEventListeners = function removeEventListeners() {
    this.elementListener.removeEventListener("mouseenter", this.onMouseEnterBind);
    this.elementListener.removeEventListener("mouseleave", this.onMouseLeaveBind);
    this.elementListener.removeEventListener("mousemove", this.onMouseMoveBind);

    if (this.gyroscope) {
      window.removeEventListener("deviceorientation", this.onDeviceOrientationBind);
    }

    if (this.glare || this.fullPageListening) {
      window.removeEventListener("resize", this.onWindowResizeBind);
    }
  };

  VanillaTilt.prototype.destroy = function destroy() {
    clearTimeout(this.transitionTimeout);
    if (this.updateCall !== null) {
      cancelAnimationFrame(this.updateCall);
    }

    this.reset();

    this.removeEventListeners();
    this.element.vanillaTilt = null;
    delete this.element.vanillaTilt;

    this.element = null;
  };

  VanillaTilt.prototype.onDeviceOrientation = function onDeviceOrientation(event) {
    if (event.gamma === null || event.beta === null) {
      return;
    }

    this.updateElementPosition();

    if (this.gyroscopeSamples > 0) {
      this.lastgammazero = this.gammazero;
      this.lastbetazero = this.betazero;

      if (this.gammazero === null) {
        this.gammazero = event.gamma;
        this.betazero = event.beta;
      } else {
        this.gammazero = (event.gamma + this.lastgammazero) / 2;
        this.betazero = (event.beta + this.lastbetazero) / 2;
      }

      this.gyroscopeSamples -= 1;
    }

    var totalAngleX = this.settings.gyroscopeMaxAngleX - this.settings.gyroscopeMinAngleX;
    var totalAngleY = this.settings.gyroscopeMaxAngleY - this.settings.gyroscopeMinAngleY;

    var degreesPerPixelX = totalAngleX / this.width;
    var degreesPerPixelY = totalAngleY / this.height;

    var angleX = event.gamma - (this.settings.gyroscopeMinAngleX + this.gammazero);
    var angleY = event.beta - (this.settings.gyroscopeMinAngleY + this.betazero);

    var posX = angleX / degreesPerPixelX;
    var posY = angleY / degreesPerPixelY;

    if (this.updateCall !== null) {
      cancelAnimationFrame(this.updateCall);
    }

    this.event = {
      clientX: posX + this.left,
      clientY: posY + this.top
    };

    this.updateCall = requestAnimationFrame(this.updateBind);
  };

  VanillaTilt.prototype.onMouseEnter = function onMouseEnter() {
    this.updateElementPosition();
    this.element.style.willChange = "transform";
    this.setTransition();
  };

  VanillaTilt.prototype.onMouseMove = function onMouseMove(event) {
    if (this.updateCall !== null) {
      cancelAnimationFrame(this.updateCall);
    }

    this.event = event;
    this.updateCall = requestAnimationFrame(this.updateBind);
  };

  VanillaTilt.prototype.onMouseLeave = function onMouseLeave() {
    this.setTransition();

    if (this.settings.reset) {
      requestAnimationFrame(this.resetBind);
    }
  };

  VanillaTilt.prototype.reset = function reset() {
    this.event = {
      clientX: this.left + this.width / 2,
      clientY: this.top + this.height / 2
    };

    if (this.element && this.element.style) {
      this.element.style.transform = "perspective(" + this.settings.perspective + "px) " + "rotateX(0deg) " + "rotateY(0deg) " + "scale3d(1, 1, 1)";
    }

    this.resetGlare();
  };

  VanillaTilt.prototype.resetGlare = function resetGlare() {
    if (this.glare) {
      this.glareElement.style.transform = "rotate(180deg) translate(-50%, -50%)";
      this.glareElement.style.opacity = "0";
    }
  };

  VanillaTilt.prototype.updateInitialPosition = function updateInitialPosition() {
    if (this.settings.startX === 0 && this.settings.startY === 0) {
      return;
    }

    this.onMouseEnter();

    if (this.fullPageListening) {
      this.event = {
        clientX: (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.clientWidth,
        clientY: (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.clientHeight
      };
    } else {
      this.event = {
        clientX: this.left + (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.width,
        clientY: this.top + (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.height
      };
    }

    var backupScale = this.settings.scale;
    this.settings.scale = 1;
    this.update();
    this.settings.scale = backupScale;
    this.resetGlare();
  };

  VanillaTilt.prototype.getValues = function getValues() {
    var x = void 0,
        y = void 0;

    if (this.fullPageListening) {
      x = this.event.clientX / this.clientWidth;
      y = this.event.clientY / this.clientHeight;
    } else {
      x = (this.event.clientX - this.left) / this.width;
      y = (this.event.clientY - this.top) / this.height;
    }

    x = Math.min(Math.max(x, 0), 1);
    y = Math.min(Math.max(y, 0), 1);

    var tiltX = (this.reverse * (this.settings.max - x * this.settings.max * 2)).toFixed(2);
    var tiltY = (this.reverse * (y * this.settings.max * 2 - this.settings.max)).toFixed(2);
    var angle = Math.atan2(this.event.clientX - (this.left + this.width / 2), -(this.event.clientY - (this.top + this.height / 2))) * (180 / Math.PI);

    return {
      tiltX: tiltX,
      tiltY: tiltY,
      percentageX: x * 100,
      percentageY: y * 100,
      angle: angle
    };
  };

  VanillaTilt.prototype.updateElementPosition = function updateElementPosition() {
    var rect = this.element.getBoundingClientRect();

    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    this.left = rect.left;
    this.top = rect.top;
  };

  VanillaTilt.prototype.update = function update() {
    var values = this.getValues();

    this.element.style.transform = "perspective(" + this.settings.perspective + "px) " + "rotateX(" + (this.settings.axis === "x" ? 0 : values.tiltY) + "deg) " + "rotateY(" + (this.settings.axis === "y" ? 0 : values.tiltX) + "deg) " + "scale3d(" + this.settings.scale + ", " + this.settings.scale + ", " + this.settings.scale + ")";

    if (this.glare) {
      this.glareElement.style.transform = "rotate(" + values.angle + "deg) translate(-50%, -50%)";
      this.glareElement.style.opacity = "" + values.percentageY * this.settings["max-glare"] / 100;
    }

    this.element.dispatchEvent(new CustomEvent("tiltChange", {
      "detail": values
    }));

    this.updateCall = null;
  };

  /**
   * Appends the glare element (if glarePrerender equals false)
   * and sets the default style
   */


  VanillaTilt.prototype.prepareGlare = function prepareGlare() {
    // If option pre-render is enabled we assume all html/css is present for an optimal glare effect.
    if (!this.glarePrerender) {
      // Create glare element
      var jsTiltGlare = document.createElement("div");
      jsTiltGlare.classList.add("js-tilt-glare");

      var jsTiltGlareInner = document.createElement("div");
      jsTiltGlareInner.classList.add("js-tilt-glare-inner");

      jsTiltGlare.appendChild(jsTiltGlareInner);
      this.element.appendChild(jsTiltGlare);
    }

    this.glareElementWrapper = this.element.querySelector(".js-tilt-glare");
    this.glareElement = this.element.querySelector(".js-tilt-glare-inner");

    if (this.glarePrerender) {
      return;
    }

    Object.assign(this.glareElementWrapper.style, {
      "position": "absolute",
      "top": "0",
      "left": "0",
      "width": "100%",
      "height": "100%",
      "overflow": "hidden",
      "pointer-events": "none"
    });

    Object.assign(this.glareElement.style, {
      "position": "absolute",
      "top": "50%",
      "left": "50%",
      "pointer-events": "none",
      "background-image": "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
      "transform": "rotate(180deg) translate(-50%, -50%)",
      "transform-origin": "0% 0%",
      "opacity": "0"
    });

    this.updateGlareSize();
  };

  VanillaTilt.prototype.updateGlareSize = function updateGlareSize() {
    if (this.glare) {
      var glareSize = (this.element.offsetWidth > this.element.offsetHeight ? this.element.offsetWidth : this.element.offsetHeight) * 2;

      Object.assign(this.glareElement.style, {
        "width": glareSize + "px",
        "height": glareSize + "px"
      });
    }
  };

  VanillaTilt.prototype.updateClientSize = function updateClientSize() {
    this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  };

  VanillaTilt.prototype.onWindowResize = function onWindowResize() {
    this.updateGlareSize();
    this.updateClientSize();
  };

  VanillaTilt.prototype.setTransition = function setTransition() {
    var _this = this;

    clearTimeout(this.transitionTimeout);
    this.element.style.transition = this.settings.speed + "ms " + this.settings.easing;
    if (this.glare) this.glareElement.style.transition = "opacity " + this.settings.speed + "ms " + this.settings.easing;

    this.transitionTimeout = setTimeout(function () {
      _this.element.style.transition = "";
      if (_this.glare) {
        _this.glareElement.style.transition = "";
      }
    }, this.settings.speed);
  };

  /**
   * Method return patched settings of instance
   * @param {boolean} settings.reverse - reverse the tilt direction
   * @param {number} settings.max - max tilt rotation (degrees)
   * @param {startX} settings.startX - the starting tilt on the X axis, in degrees. Default: 0
   * @param {startY} settings.startY - the starting tilt on the Y axis, in degrees. Default: 0
   * @param {number} settings.perspective - Transform perspective, the lower the more extreme the tilt gets
   * @param {string} settings.easing - Easing on enter/exit
   * @param {number} settings.scale - 2 = 200%, 1.5 = 150%, etc..
   * @param {number} settings.speed - Speed of the enter/exit transition
   * @param {boolean} settings.transition - Set a transition on enter/exit
   * @param {string|null} settings.axis - What axis should be disabled. Can be X or Y
   * @param {boolean} settings.glare - What axis should be disabled. Can be X or Y
   * @param {number} settings.max-glare - the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
   * @param {boolean} settings.glare-prerender - false = VanillaTilt creates the glare elements for you, otherwise
   * @param {boolean} settings.full-page-listening - If true, parallax effect will listen to mouse move events on the whole document, not only the selected element
   * @param {string|object} settings.mouse-event-element - String selector or link to HTML-element what will be listen mouse events
   * @param {boolean} settings.reset - false = If the tilt effect has to be reset on exit
   * @param {gyroscope} settings.gyroscope - Enable tilting by deviceorientation events
   * @param {gyroscopeSensitivity} settings.gyroscopeSensitivity - Between 0 and 1 - The angle at which max tilt position is reached. 1 = 90deg, 0.5 = 45deg, etc..
   * @param {gyroscopeSamples} settings.gyroscopeSamples - How many gyroscope moves to decide the starting position.
   */


  VanillaTilt.prototype.extendSettings = function extendSettings(settings) {
    var defaultSettings = {
      reverse: false,
      max: 15,
      startX: 0,
      startY: 0,
      perspective: 1000,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      scale: 1,
      speed: 300,
      transition: true,
      axis: null,
      glare: false,
      "max-glare": 1,
      "glare-prerender": false,
      "full-page-listening": false,
      "mouse-event-element": null,
      reset: true,
      gyroscope: true,
      gyroscopeMinAngleX: -45,
      gyroscopeMaxAngleX: 45,
      gyroscopeMinAngleY: -45,
      gyroscopeMaxAngleY: 45,
      gyroscopeSamples: 10
    };

    var newSettings = {};
    for (var property in defaultSettings) {
      if (property in settings) {
        newSettings[property] = settings[property];
      } else if (this.element.hasAttribute("data-tilt-" + property)) {
        var attribute = this.element.getAttribute("data-tilt-" + property);
        try {
          newSettings[property] = JSON.parse(attribute);
        } catch (e) {
          newSettings[property] = attribute;
        }
      } else {
        newSettings[property] = defaultSettings[property];
      }
    }

    return newSettings;
  };

  VanillaTilt.init = function init(elements, settings) {
    if (elements instanceof Node) {
      elements = [elements];
    }

    if (elements instanceof NodeList) {
      elements = [].slice.call(elements);
    }

    if (!(elements instanceof Array)) {
      return;
    }

    elements.forEach(function (element) {
      if (!("vanillaTilt" in element)) {
        element.vanillaTilt = new VanillaTilt(element, settings);
      }
    });
  };

  return VanillaTilt;
}();

if (typeof document !== "undefined") {
  /* expose the class to window */
  window.VanillaTilt = VanillaTilt;

  /**
   * Auto load
   */
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
}

module.exports = VanillaTilt;


/***/ }),

/***/ "./src/Assets/explosion.png":
/*!**********************************!*\
  !*** ./src/Assets/explosion.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "44a7d22bfe6fbe92ef37.png";

/***/ }),

/***/ "./src/Assets/sinking.png":
/*!********************************!*\
  !*** ./src/Assets/sinking.png ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "4427aac0b835ba2aef3e.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cssReset_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cssReset.css */ "./src/cssReset.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _Assets_explosion_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Assets/explosion.png */ "./src/Assets/explosion.png");
/* harmony import */ var _Assets_sinking_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Assets/sinking.png */ "./src/Assets/sinking.png");
/* harmony import */ var vanilla_tilt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vanilla-tilt */ "./node_modules/vanilla-tilt/lib/vanilla-tilt.js");
/* harmony import */ var vanilla_tilt__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vanilla_tilt__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Assets_modules_playerFactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Assets/modules/playerFactory */ "./src/Assets/modules/playerFactory.js");
/* harmony import */ var _Assets_modules_shipfactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Assets/modules/shipfactory */ "./src/Assets/modules/shipfactory.js");
/* harmony import */ var _Assets_modules_scoreBoard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Assets/modules/scoreBoard */ "./src/Assets/modules/scoreBoard.js");
/* harmony import */ var _Assets_modules_playerTurns__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Assets/modules/playerTurns */ "./src/Assets/modules/playerTurns.js");
/* harmony import */ var _Assets_modules_tileBackgroundColor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Assets/modules/tileBackgroundColor */ "./src/Assets/modules/tileBackgroundColor.js");











const getAllInputs = (() => {
  const pagetilt = backElement => {
    vanilla_tilt__WEBPACK_IMPORTED_MODULE_4___default().init(backElement), {
      max: 30,
      speed: 100
    };
  };

  const playerfield = document.querySelector("#text");
  const formContainer = document.querySelector(".formContainer");
  const form = document.querySelector("#form");
  const shipformContainer = document.querySelector(".shipFormContainer");
  const formHeader = document.querySelector("#formHeader");
  const logo = document.querySelector(".logo");
  pagetilt(form);

  playerfield.onkeypress = function getplayer1name(e) {
    if (e.keyCode == 13) {
      e.preventDefault();

      if (playerfield.checkValidity()) {
        playerfield.setCustomValidity("");
        let player1 = new _Assets_modules_playerFactory__WEBPACK_IMPORTED_MODULE_5__.player("".concat(playerfield.value.toUpperCase()));
        getPlayer2Name(player1);
        playerfield.value = "";
      } else {
        e.preventDefault();
        playerfield.setCustomValidity("Please enter a valid name");
        playerfield.reportValidity();
      }
    }
  };

  const getPlayer2Name = player1 => {
    formHeader.textContent = "Welcome Player 2, Enter your name:";

    playerfield.onkeypress = function (a) {
      if (a.keyCode == 13) {
        a.preventDefault();
        playerfield.reportValidity();

        if (playerfield.checkValidity()) {
          let player2 = new _Assets_modules_playerFactory__WEBPACK_IMPORTED_MODULE_5__.player("".concat(playerfield.value.toUpperCase()));
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
    let form = document.querySelector("#shipForm");
    pagetilt(form);

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
  let allShips = [];
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
      const player1cruisers = (0,_Assets_modules_shipfactory__WEBPACK_IMPORTED_MODULE_6__.ship)(randomLength, "portrait", "playerOne", gameBoardSize);
      const player2cruisers = (0,_Assets_modules_shipfactory__WEBPACK_IMPORTED_MODULE_6__.ship)(randomLength, "portrait", "playerTwo", gameBoardSize);
      allShips.push(player1cruisers, player2cruisers);
    }
  };

  const generateDestroyers = (minLength, maxLength) => {
    for (let i = 0; i < destroyersNum; i++) {
      let randomLength = randomShipLength(minLength, maxLength);
      const player1Destroyers = (0,_Assets_modules_shipfactory__WEBPACK_IMPORTED_MODULE_6__.ship)(randomLength, "landscape", "playerOne", gameBoardSize);
      const player2Destroyers = (0,_Assets_modules_shipfactory__WEBPACK_IMPORTED_MODULE_6__.ship)(randomLength, "landscape", "playerTwo", gameBoardSize);
      allShips.push(player1Destroyers, player2Destroyers);
    }
  };

  generateCruisers(minLength, maxLength);
  generateDestroyers(minLength, maxLength);
  (0,_Assets_modules_scoreBoard__WEBPACK_IMPORTED_MODULE_7__.generateScoreBoard)(player1, player2, allShips);
  (0,_Assets_modules_playerTurns__WEBPACK_IMPORTED_MODULE_8__.generatePlayerTurns)(player1, player2, startingPlayer, gameBoardSize, allShips);
};
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsU0FBUztBQUN0QixhQUFhLGFBQWE7QUFDMUIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFNBQVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsZUFBZTtBQUM1QixhQUFhLFNBQVM7QUFDdEIs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QXpDLENBQTlCO01BQ0EsTUFBTThILGlCQUFpQixHQUFHL0ksaUVBQUksQ0FBQzBJLFlBQUQsRUFBZSxXQUFmLEVBQTRCLFdBQTVCLEVBQXlDekgsYUFBekMsQ0FBOUI7TUFDQW5DLFFBQVEsQ0FBQ3VFLElBQVQsQ0FBY3lGLGlCQUFkLEVBQWlDQyxpQkFBakM7SUFDSDtFQUNKLENBUEQ7O0VBUUFOLGdCQUFnQixDQUFDVCxTQUFELEVBQVlDLFNBQVosQ0FBaEI7RUFDQVksa0JBQWtCLENBQUNiLFNBQUQsRUFBWUMsU0FBWixDQUFsQjtFQUNBekosOEVBQWtCLENBQUNJLE9BQUQsRUFBVUMsT0FBVixFQUFtQkMsUUFBbkIsQ0FBbEI7RUFDQTZFLGdGQUFtQixDQUFDL0UsT0FBRCxFQUFVQyxPQUFWLEVBQW1CK0UsY0FBbkIsRUFBbUMzQyxhQUFuQyxFQUFrRG5DLFFBQWxELENBQW5CO0FBQ0gsQ0FwQ0QsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQXNzZXRzL21vZHVsZXMvY2hlY2tIaXRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQXNzZXRzL21vZHVsZXMvZ2FtZUJvYXJkRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0Fzc2V0cy9tb2R1bGVzL3BsYXllckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9Bc3NldHMvbW9kdWxlcy9wbGF5ZXJUdXJucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0Fzc2V0cy9tb2R1bGVzL3Njb3JlQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9Bc3NldHMvbW9kdWxlcy9zaGlwZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0Fzc2V0cy9tb2R1bGVzL3RpbGVCYWNrZ3JvdW5kQ29sb3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jc3NSZXNldC5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY3NzUmVzZXQuY3NzPzJjMzMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvdmFuaWxsYS10aWx0L2xpYi92YW5pbGxhLXRpbHQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZW5lcmF0ZVNjb3JlQm9hcmQgfSBmcm9tIFwiLi9zY29yZUJvYXJkXCI7XG5pbXBvcnQgZXhwbG9zaW9uSWNvbiBmcm9tIFwiLi4vLi4vQXNzZXRzL2V4cGxvc2lvbi5wbmdcIjtcbmltcG9ydCBzaW5rSWNvbiBmcm9tIFwiLi4vLi4vQXNzZXRzL3NpbmtpbmcucG5nXCI7XG5cbmNvbnN0IGNoZWNrSGl0cyA9IChwbGF5ZXIxLCBwbGF5ZXIyLCBhbGxTaGlwcywgdG90YWxIaXRzKSA9PiB7XG4gICAgY29uc3QgYWRkSEl0SWNvbiA9IChoaXQpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YWlkID0gaGl0LnN1YnN0cigwLCA5KTtcbiAgICAgICAgY29uc3QgZGF0YWtleSA9IGhpdC5zdWJzdHIoOSwgMTIpO1xuICAgICAgICBjb25zdCBoaXRUaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEta2V5PVwiJHtkYXRha2V5fVwiXVtkYXRhLWlkPVwiJHtkYXRhaWR9XCJdYCk7XG4gICAgICAgIGlmICghaGl0VGlsZS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGhpdEltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgIGhpdEltYWdlLmNsYXNzTGlzdC5hZGQoXCJoaXRJbWFnZVwiKTtcbiAgICAgICAgICAgIGhpdEltYWdlLnNyYyA9IGV4cGxvc2lvbkljb247XG4gICAgICAgICAgICBoaXRUaWxlLmFwcGVuZENoaWxkKGhpdEltYWdlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBhbGxTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGxldCBoaXQgPSBzaGlwLnBvc2l0aW9uLmZpbHRlcigocG9zaXRpb25OdW0pID0+IHRvdGFsSGl0cy5pbmNsdWRlcyhwb3NpdGlvbk51bSkpO1xuICAgICAgICBzaGlwLmhpdHMgPSBbLi4uaGl0XTtcbiAgICAgICAgaGl0LmZvckVhY2goKGhpdCkgPT4ge1xuICAgICAgICAgICAgYWRkSEl0SWNvbihoaXQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBnZW5lcmF0ZVNjb3JlQm9hcmQocGxheWVyMSwgcGxheWVyMiwgYWxsU2hpcHMpO1xufTtcblxuY29uc3QgY2hlY2tTaGlwRGVzdHJveWVkID0gKGFsbFNoaXBzKSA9PiB7XG4gICAgY29uc3QgZGVzdHJveVNoaXAgPSAoc2hpcCkgPT4ge1xuICAgICAgICBzaGlwLnBvc2l0aW9uLmZvckVhY2goKG51bWJlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF0YWlkID0gbnVtYmVyLnN1YnN0cigwLCA5KTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFrZXkgPSBudW1iZXIuc3Vic3RyKDksIDEyKTtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBQb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1rZXk9XCIke2RhdGFrZXl9XCJdW2RhdGEtaWQ9XCIke2RhdGFpZH1cIl1gKTtcbiAgICAgICAgICAgIHNoaXBQb3MuZmlyc3RDaGlsZC5zcmMgPSBzaW5rSWNvbjtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBhbGxTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGxldCBjaGVja0ZvckRlc3Ryb3llZCA9IHNoaXAucG9zaXRpb24uZXZlcnkoKHBvcykgPT4gc2hpcC5oaXRzLmluY2x1ZGVzKHBvcykpO1xuICAgICAgICBpZiAoY2hlY2tGb3JEZXN0cm95ZWQpIHtcbiAgICAgICAgICAgIGRlc3Ryb3lTaGlwKHNoaXApO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5leHBvcnQgeyBjaGVja0hpdHMsIGNoZWNrU2hpcERlc3Ryb3llZCB9O1xuIiwiaW1wb3J0IHsgY2hlY2tIaXRzLCBjaGVja1NoaXBEZXN0cm95ZWQgfSBmcm9tIFwiLi9jaGVja0hpdHNcIjtcbmltcG9ydCB7IHBsYXllciB9IGZyb20gXCIuL3BsYXllckZhY3RvcnlcIjtcbmltcG9ydCB7IGdlbmVyYXRlU2NvcmVCb2FyZCB9IGZyb20gXCIuL3Njb3JlQm9hcmRcIjtcbmltcG9ydCB7IHRpbGVCYWNrZ3JvdW5kQ29sb3IgfSBmcm9tIFwiLi90aWxlQmFja2dyb3VuZENvbG9yXCI7XG5cbmNvbnN0IGdlbmVyYXRlYm9hcmQgPSAoZ2FtZUJvYXJkU2l6ZSwgcGxheWVyMSwgcGxheWVyMiwgYWxsU2hpcHMpID0+IHtcbiAgICBsZXQgdG90YWxIaXRzID0gW107XG4gICAgY29uc3QgcGxheWVyMWdhbWVUaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXIxR2FtZVRpbGVcIik7XG4gICAgY29uc3QgcGxheWVyMmdhbWVUaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXIyR2FtZVRpbGVcIik7XG4gICAgY29uc3QgZ2FtZUNvbnRhaW5lcjEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVDb250YWluZXIxXCIpO1xuICAgIGNvbnN0IGdhbWVDb250YWluZXIyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lQ29udGFpbmVyMlwiKTtcbiAgICBjb25zdCBwbGF5ZXJ0dXJuSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXJUdXJuXCIpO1xuXG4gICAgaWYgKGdhbWVCb2FyZFNpemUgPT09IDQwMCkge1xuICAgICAgICBnYW1lQ29udGFpbmVyMS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gXCJyZXBlYXQoMjAsIDFmcilcIjtcbiAgICAgICAgZ2FtZUNvbnRhaW5lcjEuc3R5bGUuZ3JpZFRlbXBsYXRlUm93cyA9IFwicmVwZWF0KDIxLCAxZnIpXCI7XG4gICAgICAgIGdhbWVDb250YWluZXIyLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBcInJlcGVhdCgyMCwgMWZyKVwiO1xuICAgICAgICBnYW1lQ29udGFpbmVyMi5zdHlsZS5ncmlkVGVtcGxhdGVSb3dzID0gXCJyZXBlYXQoMjEsIDFmcilcIjtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wdXRlck1vdmUgPSAocGxheWVyMSxwbGF5ZXIyKSA9PntcbiAgICAgICAgaWYgKHBsYXllcjEudHVybiA9PSAxICYmIHBsYXllcjEubmFtZSA9PT0gXCJDT01QVVRFUlwiKXtcbiAgICAgICAgICAgIGxldCB0aWxlID0gc2VsZWN0UmFuZG9tVGlsZShwbGF5ZXIxLCdwbGF5ZXJPbmUnKVxuICAgICAgICAgICAgdGlsZS5jbGljaygpXG4gICAgICAgICAgICB9IGVsc2UgaWYocGxheWVyMi50dXJuID09IDEgJiYgcGxheWVyMi5uYW1lID09PSBcIkNPTVBVVEVSXCIpe1xuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gc2VsZWN0UmFuZG9tVGlsZShwbGF5ZXIyLCdwbGF5ZXJUd28nKVxuICAgICAgICAgICAgICAgIHRpbGUuY2xpY2soKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuXG4gICAgY29uc3Qgc2VsZWN0UmFuZG9tVGlsZSA9IChwbGF5ZXIsIHdoaWNoUGxheWVyKSA9PntcbiAgICAgICAgd2hpbGUgKHRydWUpe1xuICAgICAgICAgICAgbGV0IHRpbGVOdW0gPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ2FtZUJvYXJkU2l6ZSkgKyAxKS50b1N0cmluZygpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aWxlTnVtKVxuICAgICAgICAgICAgaWYoIXRvdGFsSGl0cy5maW5kKGVsZW1lbnQgPT4gdGlsZU51bSA9PSBlbGVtZW50KSl7XG4gICAgICAgICAgICAgICAgLy9jb25zdCB0aWxlID0gd2hpY2hQbGF5ZXIuY29uY2F0KCcnLHRpbGVOdW0pXG4gICAgICAgICAgICAgICAgY29uc3QgdGlsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD1cIiR7d2hpY2hQbGF5ZXJ9XCJdW2RhdGEta2V5PVwiJHt0aWxlTnVtfVwiXWApXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGlsZUVsZW1lbnQpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cod2hpY2hQbGF5ZXIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbGVFbGVtZW50XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwbGF5ZXJUaWxlcyA9IFtwbGF5ZXIxZ2FtZVRpbGUsIHBsYXllcjJnYW1lVGlsZV07XG4gICAgcGxheWVyVGlsZXMuZm9yRWFjaCgocGxheWVyVGlsZSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVCb2FyZFNpemU7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdGlsZSA9IHBsYXllclRpbGUuY2xvbmVOb2RlKCk7XG4gICAgICAgICAgICB0aWxlLnNldEF0dHJpYnV0ZShcImRhdGEta2V5XCIsIGkgKyAxKTtcblxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGNvbnN0IGF0dGFja1NoaXAgPSAoZSwgcGxheWVyMSwgcGxheWVyMikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbGUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRpbGUpO1xuICAgICAgICAgICAgICAgIGlmICh0aWxlID09IFwicGxheWVyT25lXCIgJiYgcGxheWVyMS50dXJuID09IDEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhpdE51bSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIikgKyBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWtleVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxIaXRzLnB1c2goaGl0TnVtKTtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tIaXRzKHBsYXllcjEsIHBsYXllcjIsIGFsbFNoaXBzLCB0b3RhbEhpdHMpO1xuICAgICAgICAgICAgICAgICAgICBjaGVja1NoaXBEZXN0cm95ZWQoYWxsU2hpcHMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2VuZXJhdGVTY29yZUJvYXJkKHBsYXllcjEsIHBsYXllcjIsIGFsbFNoaXBzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIxLnR1cm4gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyMi50dXJuID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGlsZSA9PSBcInBsYXllclR3b1wiICYmIHBsYXllcjIudHVybiA9PSAxICkge1xuICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoaXROdW0gPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpICsgZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1rZXlcIik7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsSGl0cy5wdXNoKGhpdE51bSk7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrSGl0cyhwbGF5ZXIxLCBwbGF5ZXIyLCBhbGxTaGlwcywgdG90YWxIaXRzKTtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tTaGlwRGVzdHJveWVkKGFsbFNoaXBzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdlbmVyYXRlU2NvcmVCb2FyZChwbGF5ZXIxLCBwbGF5ZXIyLCBhbGxTaGlwcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyMS50dXJuID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjIudHVybiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICB0aWxlLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllcjEudHVybiA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRhY2tTaGlwKGUsIHBsYXllcjEsIHBsYXllcjIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJ0dXJuSGVhZGVyLnRleHRDb250ZW50ID0gYCR7cGxheWVyMi5uYW1lfSdzIFR1cm5gO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyMS50dXJuLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIyLnR1cm4rKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVCYWNrZ3JvdW5kQ29sb3IocGxheWVyMSwgcGxheWVyMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wdXRlck1vdmUocGxheWVyMSxwbGF5ZXIyKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXIyLnR1cm4gPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0YWNrU2hpcChlLCBwbGF5ZXIxLCBwbGF5ZXIyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVydHVybkhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllcjEubmFtZX0ncyBUdXJuYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjIudHVybi0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyMS50dXJuKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlQmFja2dyb3VuZENvbG9yKHBsYXllcjEsIHBsYXllcjIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcHV0ZXJNb3ZlKHBsYXllcjEscGxheWVyMilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChwbGF5ZXJUaWxlLmlkID09IFwicGxheWVyMUdhbWVUaWxlXCIpIHtcbiAgICAgICAgICAgICAgICBnYW1lQ29udGFpbmVyMS5hcHBlbmRDaGlsZCh0aWxlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGxheWVyVGlsZS5pZCA9PSBcInBsYXllcjJHYW1lVGlsZVwiKSB7XG4gICAgICAgICAgICAgICAgZ2FtZUNvbnRhaW5lcjIuYXBwZW5kQ2hpbGQodGlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcGxheWVyMWdhbWVUaWxlLnJlbW92ZSgpO1xuICAgICAgICBwbGF5ZXIyZ2FtZVRpbGUucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICBjb21wdXRlck1vdmUocGxheWVyMSxwbGF5ZXIyKVxufTtcblxuZXhwb3J0IHsgZ2VuZXJhdGVib2FyZCB9O1xuIiwiZXhwb3J0IGNsYXNzIHBsYXllciB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cbiAgICB0dXJuID0gMDtcbn1cbiIsImltcG9ydCB7IHRpbGVCYWNrZ3JvdW5kQ29sb3IgfSBmcm9tIFwiLi90aWxlQmFja2dyb3VuZENvbG9yXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZUJvYXJkRmFjdG9yeVwiO1xuXG5jb25zdCBnZW5lcmF0ZVBsYXllclR1cm5zID0gKHBsYXllcjEsIHBsYXllcjIsIHN0YXJ0aW5nUGxheWVyLCBnYW1lQm9hcmRTaXplLCBhbGxTaGlwcykgPT4ge1xuICAgIGNvbnN0IHBsYXllcnR1cm5IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllclR1cm5cIik7XG4gICAgY29uc3QgcGxheWVyMUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWVyMUhlYWRlclwiKTtcbiAgICBjb25zdCBwbGF5ZXIySGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXIySGVhZGVyXCIpO1xuXG4gICAgcGxheWVyMUhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllcjEubmFtZX0ncyBib2FyZGA7XG4gICAgcGxheWVyMkhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllcjIubmFtZX0ncyBib2FyZGA7XG5cbiAgICBpZiAoc3RhcnRpbmdQbGF5ZXIgPT0gXCJwbGF5ZXIxXCIpIHtcbiAgICAgICAgcGxheWVyMS50dXJuKys7XG4gICAgICAgIHBsYXllcnR1cm5IZWFkZXIudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIxLm5hbWV9J3MgVHVybmA7XG4gICAgICAgIHRpbGVCYWNrZ3JvdW5kQ29sb3IocGxheWVyMSwgcGxheWVyMik7XG4gICAgfSBlbHNlIGlmIChzdGFydGluZ1BsYXllciA9PSBcInBsYXllcjJcIikge1xuICAgICAgICBwbGF5ZXIyLnR1cm4rKztcbiAgICAgICAgcGxheWVydHVybkhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllcjIubmFtZX0ncyBUdXJuYDtcbiAgICAgICAgdGlsZUJhY2tncm91bmRDb2xvcihwbGF5ZXIxLCBwbGF5ZXIyKTtcbiAgICB9XG4gICAgZ2VuZXJhdGVib2FyZChnYW1lQm9hcmRTaXplLCBwbGF5ZXIxLCBwbGF5ZXIyLCBhbGxTaGlwcyk7XG59O1xuXG5leHBvcnQgeyBnZW5lcmF0ZVBsYXllclR1cm5zIH07XG4iLCJjb25zdCBnZW5lcmF0ZVNjb3JlQm9hcmQgPSAocGxheWVyMSwgcGxheWVyMiwgYWxsU2hpcHMpID0+IHtcbiAgICBjb25zb2xlLmxvZyhhbGxTaGlwcyk7XG4gICAgY29uc3QgcGxheWVyMVNjb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXIxU2NvcmVcIik7XG4gICAgY29uc3QgcGxheWVyMlNjb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXIyU2NvcmVcIik7XG4gICAgY29uc3QgcGxheWVyVHVybkhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWVyVHVyblwiKTtcbiAgICBsZXQgcmVtYWluaW5nUGxheWVyMVNoaXBzID0gYWxsU2hpcHMuZmlsdGVyKChzaGlwKSA9PiBzaGlwLnBsYXllciA9PSBcInBsYXllck9uZVwiICYmIHNoaXAucG9zaXRpb24ubGVuZ3RoICE9PSBzaGlwLmhpdHMubGVuZ3RoKTtcbiAgICBsZXQgcmVtYWluaW5nUGxheWVyMlNoaXBzID0gYWxsU2hpcHMuZmlsdGVyKChzaGlwKSA9PiBzaGlwLnBsYXllciA9PSBcInBsYXllclR3b1wiICYmIHNoaXAucG9zaXRpb24ubGVuZ3RoICE9PSBzaGlwLmhpdHMubGVuZ3RoKTtcbiAgICBsZXQgZGVzdHJveWVkUGxheWVyMVNoaXBzID0gYWxsU2hpcHMuZmlsdGVyKChzaGlwKSA9PiBzaGlwLnBsYXllciA9PSBcInBsYXllck9uZVwiICYmIHNoaXAucG9zaXRpb24ubGVuZ3RoID09IHNoaXAuaGl0cy5sZW5ndGgpO1xuICAgIGxldCBkZXN0cm95ZWRQbGF5ZXIyU2hpcHMgPSBhbGxTaGlwcy5maWx0ZXIoKHNoaXApID0+IHNoaXAucGxheWVyID09IFwicGxheWVyVHdvXCIgJiYgc2hpcC5wb3NpdGlvbi5sZW5ndGggPT0gc2hpcC5oaXRzLmxlbmd0aCk7XG4gICAgaWYgKHJlbWFpbmluZ1BsYXllcjFTaGlwcy5sZW5ndGggPT0gMCkge1xuICAgICAgICBwbGF5ZXJUdXJuSGVhZGVyLnRleHRDb250ZW50ID0gYCR7cGxheWVyMS5uYW1lfSBXaW5zYDtcbiAgICAgICAgcGxheWVyMVNjb3JlLnRleHRDb250ZW50ID0gYCR7cGxheWVyMS5uYW1lfSBzY29yZTogJHtkZXN0cm95ZWRQbGF5ZXIxU2hpcHMubGVuZ3RofSAgcmVtYWluaW5nIHNoaXBzOiAke3JlbWFpbmluZ1BsYXllcjFTaGlwcy5sZW5ndGh9YDtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAocmVtYWluaW5nUGxheWVyMlNoaXBzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIHBsYXllclR1cm5IZWFkZXIudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIyLm5hbWV9IFdpbnNgO1xuICAgICAgICBwbGF5ZXIyU2NvcmUudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIyLm5hbWV9IHNjb3JlOiAke2Rlc3Ryb3llZFBsYXllcjJTaGlwcy5sZW5ndGh9IHJlbWFpbmluZyBzaGlwczogJHtyZW1haW5pbmdQbGF5ZXIyU2hpcHMubGVuZ3RofWA7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcGxheWVyMVNjb3JlLnRleHRDb250ZW50ID0gYCR7cGxheWVyMS5uYW1lfSBzY29yZTogJHtkZXN0cm95ZWRQbGF5ZXIxU2hpcHMubGVuZ3RofSBzaGlwcyBsZWZ0OiAke3JlbWFpbmluZ1BsYXllcjFTaGlwcy5sZW5ndGh9YDtcbiAgICBwbGF5ZXIyU2NvcmUudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIyLm5hbWV9IHNjb3JlOiAke2Rlc3Ryb3llZFBsYXllcjJTaGlwcy5sZW5ndGh9IHNoaXBzIGxlZnQ6ICR7cmVtYWluaW5nUGxheWVyMlNoaXBzLmxlbmd0aH1gO1xuICAgIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IHsgZ2VuZXJhdGVTY29yZUJvYXJkIH07XG4iLCJsZXQgYWxsUGxheWVyMVBvcyA9IFtdO1xubGV0IGFsbFBsYXllcjJQb3MgPSBbXTtcblxuY29uc3Qgc2hpcCA9IChsZW5ndGgsIG9yaWVudCwgcGxheWVyLCBnYW1lQm9hcmRTaXplKSA9PiB7XG4gICAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xuICAgIGxldCBwb3NpdGlvbiA9IFtdO1xuICAgIGxldCBoaXRzID0gW107XG5cbiAgICBjb25zdCBzaGlwUG9zID0gKHBsYXllcikgPT4ge1xuICAgICAgICBsZXQgaW5pdGlhbFBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdhbWVCb2FyZFNpemUgKyAxKTtcbiAgICAgICAgbGV0IGdhbWVCb2FyZExlbmd0aCA9IE1hdGguc3FydChnYW1lQm9hcmRTaXplKTtcblxuICAgICAgICBpZiAob3JpZW50ID09PSBcImxhbmRzY2FwZVwiKSB7XG4gICAgICAgICAgICAvLyB0byBtYWtlIHN1cmUgYWxsIHBvc2l0aW9ucyBhcmUgcGxhY2VkIGNvcnJlY3RseVxuXG4gICAgICAgICAgICBjb25zdCBjaGVja05vRHVwbGljYXRlTGFuZHNjYXBlUG9zID0gKFBvcykgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBQb3MgPSBQb3MgKyBpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyID09IFwicGxheWVyT25lXCIgJiYgYWxsUGxheWVyMVBvcy5pbmNsdWRlcyh0ZW1wUG9zKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGxheWVyID09IFwicGxheWVyVHdvXCIgJiYgYWxsUGxheWVyMlBvcy5pbmNsdWRlcyh0ZW1wUG9zKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCBwdXNoVG9BcnJheUxhbmRzY2FwZSA9IChpbml0aWFsUG9zKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFjaGVja05vRHVwbGljYXRlTGFuZHNjYXBlUG9zKGluaXRpYWxQb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5hbFBvcyA9IGluaXRpYWxQb3MgKyBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ucHVzaChwbGF5ZXIgKyBmaW5hbFBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyID09IFwicGxheWVyT25lXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxQbGF5ZXIxUG9zLnB1c2goZmluYWxQb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXIgPT0gXCJwbGF5ZXJUd29cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbFBsYXllcjJQb3MucHVzaChmaW5hbFBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxhbmRzY2FwZSBQb3MgYWxyZWFkeSB1c2VkXCIgKyBpbml0aWFsUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgc2hpcFBvcyhwbGF5ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGNoZWNrUG9zTGFuZHNjYXBlID0gKGluaXRpYWxQb3MpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0UG9zID0gaW5pdGlhbFBvcyArIGk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXN0UG9zICUgZ2FtZUJvYXJkTGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxQb3MgPSBpbml0aWFsUG9zICsgKGkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hUb0FycmF5TGFuZHNjYXBlKGluaXRpYWxQb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKCFjaGVja1Bvc0xhbmRzY2FwZShpbml0aWFsUG9zKSkge1xuICAgICAgICAgICAgICAgIHB1c2hUb0FycmF5TGFuZHNjYXBlKGluaXRpYWxQb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9yaWVudCA9PT0gXCJwb3J0cmFpdFwiKSB7XG4gICAgICAgICAgICBjb25zdCBjaGVja05vRHVwbGljYXRlUG90cmFpdFBvcyA9IChQb3MpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wUG9zID0gaW5pdGlhbFBvcyArIGkgKiBnYW1lQm9hcmRMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIgPT0gXCJwbGF5ZXJPbmVcIiAmJiBhbGxQbGF5ZXIxUG9zLmluY2x1ZGVzKHRlbXBQb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXIgPT0gXCJwbGF5ZXJUd29cIiAmJiBhbGxQbGF5ZXIyUG9zLmluY2x1ZGVzKHRlbXBQb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGNoZWNrUG9zUG9ydHJhaXQgPSAoaW5pdGlhbFBvcykgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBQb3MgPSBpbml0aWFsUG9zICsgaSAqIGdhbWVCb2FyZExlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBQb3MgPiBnYW1lQm9hcmRTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsUG9zID0gaW5pdGlhbFBvcyAtIChsZW5ndGggLSBpKSAqIGdhbWVCb2FyZExlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2h0b0FycmF5UG9ydHJhaXQoaW5pdGlhbFBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IHB1c2h0b0FycmF5UG9ydHJhaXQgPSAoaW5pdGlhbFBvcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghY2hlY2tOb0R1cGxpY2F0ZVBvdHJhaXRQb3MoaW5pdGlhbFBvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ucHVzaChwbGF5ZXIgKyAoaW5pdGlhbFBvcyArIGkgKiBnYW1lQm9hcmRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIgPT0gXCJwbGF5ZXJPbmVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbFBsYXllcjFQb3MucHVzaChpbml0aWFsUG9zICsgaSAqIGdhbWVCb2FyZExlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBsYXllciA9PSBcInBsYXllclR3b1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsUGxheWVyMlBvcy5wdXNoKGluaXRpYWxQb3MgKyBpICogZ2FtZUJvYXJkTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUG9ydHJhaXQgUG9zIGFscmVhZHkgdXNlZCBcIiArIGluaXRpYWxQb3MpO1xuICAgICAgICAgICAgICAgICAgICBzaGlwUG9zKHBsYXllcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKCFjaGVja1Bvc1BvcnRyYWl0KGluaXRpYWxQb3MpKSB7XG4gICAgICAgICAgICAgICAgcHVzaHRvQXJyYXlQb3J0cmFpdChpbml0aWFsUG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgc2hpcFBvcyhwbGF5ZXIpO1xuICAgIHJldHVybiB7IGdldExlbmd0aCwgcG9zaXRpb24sIGhpdHMsIHBsYXllciB9O1xufTtcblxuZXhwb3J0IHsgc2hpcCB9O1xuIiwiY29uc3QgdGlsZUJhY2tncm91bmRDb2xvciA9IChwbGF5ZXIxLCBwbGF5ZXIyKSA9PiB7XG4gICAgY29uc3QgcGxheWVyMUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZUNvbnRhaW5lcjFcIik7XG4gICAgY29uc3QgcGxheWVyMkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZUNvbnRhaW5lcjJcIik7XG4gICAgaWYgKHBsYXllcjEudHVybiA9PSAxKSB7XG4gICAgICAgIHBsYXllcjFDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjOEM0MjM2XCI7XG4gICAgfSBlbHNlIGlmIChwbGF5ZXIxLnR1cm4gPT0gMCkge1xuICAgICAgICBwbGF5ZXIxQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIjtcbiAgICB9XG4gICAgaWYgKHBsYXllcjIudHVybiA9PSAxKSB7XG4gICAgICAgIHBsYXllcjJDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjOEM0MjM2XCI7XG4gICAgfSBlbHNlIGlmIChwbGF5ZXIyLnR1cm4gPT0gMCkge1xuICAgICAgICBwbGF5ZXIyQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIjtcbiAgICB9XG59O1xuXG5leHBvcnQgeyB0aWxlQmFja2dyb3VuZENvbG9yIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2Nzc1Jlc2V0LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7O0NBR0M7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Q0FhQyxTQUFTO0NBQ1QsVUFBVTtDQUNWLFNBQVM7Q0FDVCxlQUFlO0NBQ2YsYUFBYTtDQUNiLHdCQUF3QjtBQUN6QjtBQUNBLGdEQUFnRDtBQUNoRDs7Q0FFQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsZ0JBQWdCO0FBQ2pCO0FBQ0E7Q0FDQyxZQUFZO0FBQ2I7QUFDQTs7Q0FFQyxXQUFXO0NBQ1gsYUFBYTtBQUNkO0FBQ0E7Q0FDQyx5QkFBeUI7Q0FDekIsaUJBQWlCO0FBQ2xCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3R7XFxuICAgIC0tbWFpbi1mb250OiAnU291cmNlIFNlcmlmIFBybycsIHNlcmlmO1xcbiAgICAtLXNlY29uZGFyeS1mb250OiAnRWFzdCBTZWEgRG9rZG8nO1xcbn1cXG5cXG4jcGxheWVyMUdhbWVUaWxlLCAjcGxheWVyMkdhbWVUaWxle1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOEM2NjM2O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuI3BsYXllcjFHYW1lVGlsZTpob3ZlciwgI3BsYXllcjJHYW1lVGlsZTpob3ZlcntcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzhDNDIzNjtcXG59XFxuXFxuXFxuI3BsYXllcjFHYW1lVGlsZS5oaXQsICNwbGF5ZXIyR2FtZVRpbGUuaGl0e1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNUIyODIwO1xcbn1cXG5cXG5cXG5cXG4uZ2FtZUNvbnRhaW5lcjEsIC5nYW1lQ29udGFpbmVyMntcXG4gICAgbWFyZ2luOiAxcmVtO1xcbiAgICB3aWR0aDogNDJyZW07XFxuICAgIGhlaWdodDogNDJyZW07XFxuICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMSwgMWZyKTtcXG5cXG59XFxuLmxvZ297XFxuICAgIGZvbnQtc2l6ZTogIDZyZW07XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1zZWNvbmRhcnktZm9udCk7XFxuICAgIG1hcmdpbi1ib3R0b206IDUwcHg7XFxuICAgIHBhZGRpbmc6IDIwcHg7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWig2MHB4KTtcXG4gICAgXFxufVxcblxcbiNwbGF5ZXIxSGVhZGVyLCAjcGxheWVyMkhlYWRlcntcXG4gICAgZ3JpZC1jb2x1bW46IDEvLTE7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tbWFpbi1mb250KTtcXG4gICAgXFxufVxcblxcbi5oaXRJbWFnZXtcXG4gICAgd2lkdGg6IDkwJTtcXG4gICAgaGVpZ2h0OiA5MCU7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogODAlO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxufVxcblxcbi5mb3JtQ29udGFpbmVye1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4QzQyMzY7XFxuICAgIHotaW5kZXg6IDM7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi5zaGlwRm9ybUNvbnRhaW5lcntcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOEM3OTM2O1xcbiAgICB6LWluZGV4OiAyO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKCAxMDB2aCkgcm90YXRlKDE4MGRlZyk7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLnNoaXBGb3JtQ29udGFpbmVyLm1vdmVke1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoIDB2aCkgcm90YXRlKDBkZWcpO1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG4uc2hpcEZvcm1Db250YWluZXIubW92ZWQuc2xpZGVEb3due1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMHZoKSByb3RhdGUoMTgwZGVnKTtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLmZvcm1Db250YWluZXIubW92ZWR7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSggMTAwdmgpIHJvdGF0ZSgxODBkZWcpO1xcbn1cXG5cXG4jZm9ybSwgI3NoaXBGb3Jte1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgcGFkZGluZzozMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xcbiAgICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMDBweCk7XFxufVxcblxcbiNwbGF5ZXJUdXJue1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tbWFpbi1mb250KTtcXG4gICAgZm9udC1zaXplOiAzLjVyZW07XFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjaztcXG4gICAgXFxuICAgIFxcbn1cXG5cXG4jcGxheWVyMVNjb3JlLCAjcGxheWVyMlNjb3Jle1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tbWFpbi1mb250KTtcXG4gICAgZm9udC1zaXplOiAxLjVyZW07XFxuICAgIG1hcmdpbjogMTVweDtcXG59XFxuXFxuLmhlYWRlcntcXG4gICAgZ3JpZC1jb2x1bW46IDEvIC0xO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyODY4M0I7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJyZW07XFxuICAgIGJveC1zaGFkb3c6IDFweCAxcHggMTBweCByZ2IoNTMsIDUzLCA1Myk7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIG1hcmdpbjogMzBweDtcXG4gICAgd2lkdGg6IDUwJTtcXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdLCBpbnB1dFt0eXBlPVxcXCJudW1iZXJcXFwiXXtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgaGVpZ2h0OiAzcmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAgdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpO1xcbiAgICBmb250LXNpemU6IDJyZW07XFxufVxcblxcbmlucHV0W3R5cGU9XFxcInRleHRcXFwiXTpmb2N1cywgIGlucHV0W3R5cGU9XFxcIm51bWJlclxcXCJdOmZvY3Vze1xcbiAgICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG5oMXtcXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLW1haW4tZm9udCk7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXFxuYnV0dG9ue1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI4NjgzQjtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCAycHggcmdiKDUzLCA1MywgNTMpO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJvcmRlcjogbm9uZTtcXG59XFxuXFxubGFiZWx7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpO1xcbiAgICBmb250LXNpemU6IDEuNHJlbTtcXG59XFxuXFxuaW1ne1xcbiAgICB3aWR0aDogMzBweDtcXG59XFxuXFxuYm9keXtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI2NDU1OTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgNWZyO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksc0NBQXNDO0lBQ3RDLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6QixXQUFXO0lBQ1gsWUFBWTtJQUNaLFNBQVM7SUFDVCx1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLGFBQWE7SUFDYixxQkFBcUI7SUFDckIsc0JBQXNCO0FBQzFCO0FBQ0E7SUFDSSx5QkFBeUI7QUFDN0I7OztBQUdBO0lBQ0kseUJBQXlCO0FBQzdCOzs7O0FBSUE7SUFDSSxZQUFZO0lBQ1osWUFBWTtJQUNaLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLHNDQUFzQztJQUN0QyxtQ0FBbUM7O0FBRXZDO0FBQ0E7SUFDSSxnQkFBZ0I7SUFDaEIsa0NBQWtDO0lBQ2xDLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2IsMkJBQTJCOztBQUUvQjs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YsWUFBWTtJQUNaLDZCQUE2Qjs7QUFFakM7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsV0FBVztJQUNYLG9CQUFvQjtJQUNwQiw0QkFBNEI7SUFDNUIsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksZUFBZTtJQUNmLHlCQUF5QjtJQUN6QixVQUFVO0lBQ1YsV0FBVztJQUNYLGFBQWE7SUFDYixNQUFNO0lBQ04sT0FBTztJQUNQLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLGVBQWU7SUFDZix5QkFBeUI7SUFDekIsVUFBVTtJQUNWLFdBQVc7SUFDWCxhQUFhO0lBQ2IsTUFBTTtJQUNOLE9BQU87SUFDUCxVQUFVO0lBQ1YsYUFBYTtJQUNiLHNCQUFzQjtJQUN0Qix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLDRDQUE0QztJQUM1QyxvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSx3Q0FBd0M7SUFDeEMsVUFBVTtBQUNkO0FBQ0E7SUFDSSw0Q0FBNEM7SUFDNUMsVUFBVTtBQUNkOztBQUVBO0lBQ0ksNENBQTRDO0FBQ2hEOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0Qix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsNEJBQTRCO0lBQzVCLDhCQUE4QjtBQUNsQzs7QUFFQTtJQUNJLDZCQUE2QjtJQUM3QixpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLDhCQUE4Qjs7O0FBR2xDOztBQUVBO0lBQ0ksNkJBQTZCO0lBQzdCLGlCQUFpQjtJQUNqQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsbUJBQW1CO0lBQ25CLHdDQUF3QztJQUN4QyxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2IsWUFBWTtJQUNaLFVBQVU7QUFDZDs7QUFFQTtJQUNJLFVBQVU7SUFDVixZQUFZO0lBQ1osOEJBQThCO0lBQzlCLFlBQVk7SUFDWiw4QkFBOEI7SUFDOUIsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQiw2QkFBNkI7SUFDN0IsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsNkJBQTZCO0lBQzdCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osWUFBWTtJQUNaLHlCQUF5QjtJQUN6Qix1Q0FBdUM7SUFDdkMsZUFBZTtJQUNmLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSw2QkFBNkI7SUFDN0IsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksV0FBVztBQUNmOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLGFBQWE7SUFDYiwyQkFBMkI7SUFDM0IsOEJBQThCO0lBQzlCLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2IsV0FBVztBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290e1xcbiAgICAtLW1haW4tZm9udDogJ1NvdXJjZSBTZXJpZiBQcm8nLCBzZXJpZjtcXG4gICAgLS1zZWNvbmRhcnktZm9udDogJ0Vhc3QgU2VhIERva2RvJztcXG59XFxuXFxuI3BsYXllcjFHYW1lVGlsZSwgI3BsYXllcjJHYW1lVGlsZXtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzhDNjYzNjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbiNwbGF5ZXIxR2FtZVRpbGU6aG92ZXIsICNwbGF5ZXIyR2FtZVRpbGU6aG92ZXJ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4QzQyMzY7XFxufVxcblxcblxcbiNwbGF5ZXIxR2FtZVRpbGUuaGl0LCAjcGxheWVyMkdhbWVUaWxlLmhpdHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzVCMjgyMDtcXG59XFxuXFxuXFxuXFxuLmdhbWVDb250YWluZXIxLCAuZ2FtZUNvbnRhaW5lcjJ7XFxuICAgIG1hcmdpbjogMXJlbTtcXG4gICAgd2lkdGg6IDQycmVtO1xcbiAgICBoZWlnaHQ6IDQycmVtO1xcbiAgICBwbGFjZS1pdGVtczogY2VudGVyO1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7XFxuXFxufVxcbi5sb2dve1xcbiAgICBmb250LXNpemU6ICA2cmVtO1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tc2Vjb25kYXJ5LWZvbnQpO1xcbiAgICBtYXJnaW4tYm90dG9tOiA1MHB4O1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooNjBweCk7XFxuICAgIFxcbn1cXG5cXG4jcGxheWVyMUhlYWRlciwgI3BsYXllcjJIZWFkZXJ7XFxuICAgIGdyaWQtY29sdW1uOiAxLy0xO1xcbiAgICBmb250LXNpemU6IDJyZW07XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLW1haW4tZm9udCk7XFxuICAgIFxcbn1cXG5cXG4uaGl0SW1hZ2V7XFxuICAgIHdpZHRoOiA5MCU7XFxuICAgIGhlaWdodDogOTAlO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDgwJTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbn1cXG5cXG4uZm9ybUNvbnRhaW5lcntcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOEM0MjM2O1xcbiAgICB6LWluZGV4OiAzO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4uc2hpcEZvcm1Db250YWluZXJ7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzhDNzkzNjtcXG4gICAgei1pbmRleDogMjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHRvcDogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSggMTAwdmgpIHJvdGF0ZSgxODBkZWcpO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi5zaGlwRm9ybUNvbnRhaW5lci5tb3ZlZHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKCAwdmgpIHJvdGF0ZSgwZGVnKTtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuLnNoaXBGb3JtQ29udGFpbmVyLm1vdmVkLnNsaWRlRG93bntcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDB2aCkgcm90YXRlKDE4MGRlZyk7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi5mb3JtQ29udGFpbmVyLm1vdmVke1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoIDEwMHZoKSByb3RhdGUoMTgwZGVnKTtcXG59XFxuXFxuI2Zvcm0sICNzaGlwRm9ybXtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6MzBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMzBweDtcXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMDAwcHgpO1xcbn1cXG5cXG4jcGxheWVyVHVybntcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLW1haW4tZm9udCk7XFxuICAgIGZvbnQtc2l6ZTogMy41cmVtO1xcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgYmxhY2s7XFxuICAgIFxcbiAgICBcXG59XFxuXFxuI3BsYXllcjFTY29yZSwgI3BsYXllcjJTY29yZXtcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLW1haW4tZm9udCk7XFxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgICBtYXJnaW46IDE1cHg7XFxufVxcblxcbi5oZWFkZXJ7XFxuICAgIGdyaWQtY29sdW1uOiAxLyAtMTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjg2ODNCO1xcbiAgICBib3JkZXItcmFkaXVzOiAycmVtO1xcbiAgICBib3gtc2hhZG93OiAxcHggMXB4IDEwcHggcmdiKDUzLCA1MywgNTMpO1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBtYXJnaW46IDMwcHg7XFxuICAgIHdpZHRoOiA1MCU7XFxufVxcblxcbmlucHV0W3R5cGU9XFxcInRleHRcXFwiXSwgaW5wdXRbdHlwZT1cXFwibnVtYmVyXFxcIl17XFxuICAgIHdpZHRoOiA3MCU7XFxuICAgIGhlaWdodDogM3JlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjaztcXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tbWFpbi1mb250KTtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5cXG5pbnB1dFt0eXBlPVxcXCJ0ZXh0XFxcIl06Zm9jdXMsICBpbnB1dFt0eXBlPVxcXCJudW1iZXJcXFwiXTpmb2N1c3tcXG4gICAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuaDF7XFxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpO1xcbiAgICBmb250LXNpemU6IDJyZW07XFxufVxcblxcbmJ1dHRvbntcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyODY4M0I7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggMnB4IHJnYig1MywgNTMsIDUzKTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3JkZXI6IG5vbmU7XFxufVxcblxcbmxhYmVse1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tbWFpbi1mb250KTtcXG4gICAgZm9udC1zaXplOiAxLjRyZW07XFxufVxcblxcbmltZ3tcXG4gICAgd2lkdGg6IDMwcHg7XFxufVxcblxcbmJvZHl7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyNjQ1NTk7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDVmcjtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgICBwbGFjZS1pdGVtczogY2VudGVyO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwJTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9jc3NSZXNldC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2Nzc1Jlc2V0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZWQgYnkgU2VyZ2l1IMiYYW5kb3IgKG1pY2t1N3p1KSBvbiAxLzI3LzIwMTcuXG4gKiBPcmlnaW5hbCBpZGVhOiBodHRwczovL2dpdGh1Yi5jb20vZ2lqc3JvZ2UvdGlsdC5qc1xuICogTUlUIExpY2Vuc2UuXG4gKiBWZXJzaW9uIDEuNy4yXG4gKi9cblxudmFyIFZhbmlsbGFUaWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBWYW5pbGxhVGlsdChlbGVtZW50KSB7XG4gICAgdmFyIHNldHRpbmdzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBWYW5pbGxhVGlsdCk7XG5cbiAgICBpZiAoIShlbGVtZW50IGluc3RhbmNlb2YgTm9kZSkpIHtcbiAgICAgIHRocm93IFwiQ2FuJ3QgaW5pdGlhbGl6ZSBWYW5pbGxhVGlsdCBiZWNhdXNlIFwiICsgZWxlbWVudCArIFwiIGlzIG5vdCBhIE5vZGUuXCI7XG4gICAgfVxuXG4gICAgdGhpcy53aWR0aCA9IG51bGw7XG4gICAgdGhpcy5oZWlnaHQgPSBudWxsO1xuICAgIHRoaXMuY2xpZW50V2lkdGggPSBudWxsO1xuICAgIHRoaXMuY2xpZW50SGVpZ2h0ID0gbnVsbDtcbiAgICB0aGlzLmxlZnQgPSBudWxsO1xuICAgIHRoaXMudG9wID0gbnVsbDtcblxuICAgIC8vIGZvciBHeXJvc2NvcGUgc2FtcGxpbmdcbiAgICB0aGlzLmdhbW1hemVybyA9IG51bGw7XG4gICAgdGhpcy5iZXRhemVybyA9IG51bGw7XG4gICAgdGhpcy5sYXN0Z2FtbWF6ZXJvID0gbnVsbDtcbiAgICB0aGlzLmxhc3RiZXRhemVybyA9IG51bGw7XG5cbiAgICB0aGlzLnRyYW5zaXRpb25UaW1lb3V0ID0gbnVsbDtcbiAgICB0aGlzLnVwZGF0ZUNhbGwgPSBudWxsO1xuICAgIHRoaXMuZXZlbnQgPSBudWxsO1xuXG4gICAgdGhpcy51cGRhdGVCaW5kID0gdGhpcy51cGRhdGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLnJlc2V0QmluZCA9IHRoaXMucmVzZXQuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuZXh0ZW5kU2V0dGluZ3Moc2V0dGluZ3MpO1xuXG4gICAgdGhpcy5yZXZlcnNlID0gdGhpcy5zZXR0aW5ncy5yZXZlcnNlID8gLTEgOiAxO1xuICAgIHRoaXMuZ2xhcmUgPSBWYW5pbGxhVGlsdC5pc1NldHRpbmdUcnVlKHRoaXMuc2V0dGluZ3MuZ2xhcmUpO1xuICAgIHRoaXMuZ2xhcmVQcmVyZW5kZXIgPSBWYW5pbGxhVGlsdC5pc1NldHRpbmdUcnVlKHRoaXMuc2V0dGluZ3NbXCJnbGFyZS1wcmVyZW5kZXJcIl0pO1xuICAgIHRoaXMuZnVsbFBhZ2VMaXN0ZW5pbmcgPSBWYW5pbGxhVGlsdC5pc1NldHRpbmdUcnVlKHRoaXMuc2V0dGluZ3NbXCJmdWxsLXBhZ2UtbGlzdGVuaW5nXCJdKTtcbiAgICB0aGlzLmd5cm9zY29wZSA9IFZhbmlsbGFUaWx0LmlzU2V0dGluZ1RydWUodGhpcy5zZXR0aW5ncy5neXJvc2NvcGUpO1xuICAgIHRoaXMuZ3lyb3Njb3BlU2FtcGxlcyA9IHRoaXMuc2V0dGluZ3MuZ3lyb3Njb3BlU2FtcGxlcztcblxuICAgIHRoaXMuZWxlbWVudExpc3RlbmVyID0gdGhpcy5nZXRFbGVtZW50TGlzdGVuZXIoKTtcblxuICAgIGlmICh0aGlzLmdsYXJlKSB7XG4gICAgICB0aGlzLnByZXBhcmVHbGFyZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZ1bGxQYWdlTGlzdGVuaW5nKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNsaWVudFNpemUoKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5yZXNldCgpO1xuICAgIHRoaXMudXBkYXRlSW5pdGlhbFBvc2l0aW9uKCk7XG4gIH1cblxuICBWYW5pbGxhVGlsdC5pc1NldHRpbmdUcnVlID0gZnVuY3Rpb24gaXNTZXR0aW5nVHJ1ZShzZXR0aW5nKSB7XG4gICAgcmV0dXJuIHNldHRpbmcgPT09IFwiXCIgfHwgc2V0dGluZyA9PT0gdHJ1ZSB8fCBzZXR0aW5nID09PSAxO1xuICB9O1xuXG4gIC8qKlxuICAgKiBNZXRob2QgcmV0dXJucyBlbGVtZW50IHdoYXQgd2lsbCBiZSBsaXN0ZW4gbW91c2UgZXZlbnRzXG4gICAqIEByZXR1cm4ge05vZGV9XG4gICAqL1xuXG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLmdldEVsZW1lbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIGdldEVsZW1lbnRMaXN0ZW5lcigpIHtcbiAgICBpZiAodGhpcy5mdWxsUGFnZUxpc3RlbmluZykge1xuICAgICAgcmV0dXJuIHdpbmRvdy5kb2N1bWVudDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3NbXCJtb3VzZS1ldmVudC1lbGVtZW50XCJdID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB2YXIgbW91c2VFdmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2V0dGluZ3NbXCJtb3VzZS1ldmVudC1lbGVtZW50XCJdKTtcblxuICAgICAgaWYgKG1vdXNlRXZlbnRFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBtb3VzZUV2ZW50RWxlbWVudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZXR0aW5nc1tcIm1vdXNlLWV2ZW50LWVsZW1lbnRcIl0gaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXR0aW5nc1tcIm1vdXNlLWV2ZW50LWVsZW1lbnRcIl07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgfTtcblxuICAvKipcbiAgICogTWV0aG9kIHNldCBsaXN0ZW4gbWV0aG9kcyBmb3IgdGhpcy5lbGVtZW50TGlzdGVuZXJcbiAgICogQHJldHVybiB7Tm9kZX1cbiAgICovXG5cblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLm9uTW91c2VFbnRlckJpbmQgPSB0aGlzLm9uTW91c2VFbnRlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25Nb3VzZU1vdmVCaW5kID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25Nb3VzZUxlYXZlQmluZCA9IHRoaXMub25Nb3VzZUxlYXZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbldpbmRvd1Jlc2l6ZUJpbmQgPSB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkRldmljZU9yaWVudGF0aW9uQmluZCA9IHRoaXMub25EZXZpY2VPcmllbnRhdGlvbi5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5lbGVtZW50TGlzdGVuZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgdGhpcy5vbk1vdXNlRW50ZXJCaW5kKTtcbiAgICB0aGlzLmVsZW1lbnRMaXN0ZW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCB0aGlzLm9uTW91c2VMZWF2ZUJpbmQpO1xuICAgIHRoaXMuZWxlbWVudExpc3RlbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5vbk1vdXNlTW92ZUJpbmQpO1xuXG4gICAgaWYgKHRoaXMuZ2xhcmUgfHwgdGhpcy5mdWxsUGFnZUxpc3RlbmluZykge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5vbldpbmRvd1Jlc2l6ZUJpbmQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmd5cm9zY29wZSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2VvcmllbnRhdGlvblwiLCB0aGlzLm9uRGV2aWNlT3JpZW50YXRpb25CaW5kKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIE1ldGhvZCByZW1vdmUgZXZlbnQgbGlzdGVuZXJzIGZyb20gY3VycmVudCB0aGlzLmVsZW1lbnRMaXN0ZW5lclxuICAgKi9cblxuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuZWxlbWVudExpc3RlbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIHRoaXMub25Nb3VzZUVudGVyQmluZCk7XG4gICAgdGhpcy5lbGVtZW50TGlzdGVuZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgdGhpcy5vbk1vdXNlTGVhdmVCaW5kKTtcbiAgICB0aGlzLmVsZW1lbnRMaXN0ZW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMub25Nb3VzZU1vdmVCaW5kKTtcblxuICAgIGlmICh0aGlzLmd5cm9zY29wZSkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJkZXZpY2VvcmllbnRhdGlvblwiLCB0aGlzLm9uRGV2aWNlT3JpZW50YXRpb25CaW5kKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5nbGFyZSB8fCB0aGlzLmZ1bGxQYWdlTGlzdGVuaW5nKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLm9uV2luZG93UmVzaXplQmluZCk7XG4gICAgfVxuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50cmFuc2l0aW9uVGltZW91dCk7XG4gICAgaWYgKHRoaXMudXBkYXRlQ2FsbCAhPT0gbnVsbCkge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVDYWxsKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5lbGVtZW50LnZhbmlsbGFUaWx0ID0gbnVsbDtcbiAgICBkZWxldGUgdGhpcy5lbGVtZW50LnZhbmlsbGFUaWx0O1xuXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUub25EZXZpY2VPcmllbnRhdGlvbiA9IGZ1bmN0aW9uIG9uRGV2aWNlT3JpZW50YXRpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuZ2FtbWEgPT09IG51bGwgfHwgZXZlbnQuYmV0YSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlRWxlbWVudFBvc2l0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5neXJvc2NvcGVTYW1wbGVzID4gMCkge1xuICAgICAgdGhpcy5sYXN0Z2FtbWF6ZXJvID0gdGhpcy5nYW1tYXplcm87XG4gICAgICB0aGlzLmxhc3RiZXRhemVybyA9IHRoaXMuYmV0YXplcm87XG5cbiAgICAgIGlmICh0aGlzLmdhbW1hemVybyA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzLmdhbW1hemVybyA9IGV2ZW50LmdhbW1hO1xuICAgICAgICB0aGlzLmJldGF6ZXJvID0gZXZlbnQuYmV0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZ2FtbWF6ZXJvID0gKGV2ZW50LmdhbW1hICsgdGhpcy5sYXN0Z2FtbWF6ZXJvKSAvIDI7XG4gICAgICAgIHRoaXMuYmV0YXplcm8gPSAoZXZlbnQuYmV0YSArIHRoaXMubGFzdGJldGF6ZXJvKSAvIDI7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZ3lyb3Njb3BlU2FtcGxlcyAtPSAxO1xuICAgIH1cblxuICAgIHZhciB0b3RhbEFuZ2xlWCA9IHRoaXMuc2V0dGluZ3MuZ3lyb3Njb3BlTWF4QW5nbGVYIC0gdGhpcy5zZXR0aW5ncy5neXJvc2NvcGVNaW5BbmdsZVg7XG4gICAgdmFyIHRvdGFsQW5nbGVZID0gdGhpcy5zZXR0aW5ncy5neXJvc2NvcGVNYXhBbmdsZVkgLSB0aGlzLnNldHRpbmdzLmd5cm9zY29wZU1pbkFuZ2xlWTtcblxuICAgIHZhciBkZWdyZWVzUGVyUGl4ZWxYID0gdG90YWxBbmdsZVggLyB0aGlzLndpZHRoO1xuICAgIHZhciBkZWdyZWVzUGVyUGl4ZWxZID0gdG90YWxBbmdsZVkgLyB0aGlzLmhlaWdodDtcblxuICAgIHZhciBhbmdsZVggPSBldmVudC5nYW1tYSAtICh0aGlzLnNldHRpbmdzLmd5cm9zY29wZU1pbkFuZ2xlWCArIHRoaXMuZ2FtbWF6ZXJvKTtcbiAgICB2YXIgYW5nbGVZID0gZXZlbnQuYmV0YSAtICh0aGlzLnNldHRpbmdzLmd5cm9zY29wZU1pbkFuZ2xlWSArIHRoaXMuYmV0YXplcm8pO1xuXG4gICAgdmFyIHBvc1ggPSBhbmdsZVggLyBkZWdyZWVzUGVyUGl4ZWxYO1xuICAgIHZhciBwb3NZID0gYW5nbGVZIC8gZGVncmVlc1BlclBpeGVsWTtcblxuICAgIGlmICh0aGlzLnVwZGF0ZUNhbGwgIT09IG51bGwpIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlQ2FsbCk7XG4gICAgfVxuXG4gICAgdGhpcy5ldmVudCA9IHtcbiAgICAgIGNsaWVudFg6IHBvc1ggKyB0aGlzLmxlZnQsXG4gICAgICBjbGllbnRZOiBwb3NZICsgdGhpcy50b3BcbiAgICB9O1xuXG4gICAgdGhpcy51cGRhdGVDYWxsID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlQmluZCk7XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLm9uTW91c2VFbnRlciA9IGZ1bmN0aW9uIG9uTW91c2VFbnRlcigpIHtcbiAgICB0aGlzLnVwZGF0ZUVsZW1lbnRQb3NpdGlvbigpO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWxsQ2hhbmdlID0gXCJ0cmFuc2Zvcm1cIjtcbiAgICB0aGlzLnNldFRyYW5zaXRpb24oKTtcbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUub25Nb3VzZU1vdmUgPSBmdW5jdGlvbiBvbk1vdXNlTW92ZShldmVudCkge1xuICAgIGlmICh0aGlzLnVwZGF0ZUNhbGwgIT09IG51bGwpIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlQ2FsbCk7XG4gICAgfVxuXG4gICAgdGhpcy5ldmVudCA9IGV2ZW50O1xuICAgIHRoaXMudXBkYXRlQ2FsbCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZUJpbmQpO1xuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5vbk1vdXNlTGVhdmUgPSBmdW5jdGlvbiBvbk1vdXNlTGVhdmUoKSB7XG4gICAgdGhpcy5zZXRUcmFuc2l0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5yZXNldCkge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVzZXRCaW5kKTtcbiAgICB9XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgdGhpcy5ldmVudCA9IHtcbiAgICAgIGNsaWVudFg6IHRoaXMubGVmdCArIHRoaXMud2lkdGggLyAyLFxuICAgICAgY2xpZW50WTogdGhpcy50b3AgKyB0aGlzLmhlaWdodCAvIDJcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuZWxlbWVudCAmJiB0aGlzLmVsZW1lbnQuc3R5bGUpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBcInBlcnNwZWN0aXZlKFwiICsgdGhpcy5zZXR0aW5ncy5wZXJzcGVjdGl2ZSArIFwicHgpIFwiICsgXCJyb3RhdGVYKDBkZWcpIFwiICsgXCJyb3RhdGVZKDBkZWcpIFwiICsgXCJzY2FsZTNkKDEsIDEsIDEpXCI7XG4gICAgfVxuXG4gICAgdGhpcy5yZXNldEdsYXJlKCk7XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLnJlc2V0R2xhcmUgPSBmdW5jdGlvbiByZXNldEdsYXJlKCkge1xuICAgIGlmICh0aGlzLmdsYXJlKSB7XG4gICAgICB0aGlzLmdsYXJlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBcInJvdGF0ZSgxODBkZWcpIHRyYW5zbGF0ZSgtNTAlLCAtNTAlKVwiO1xuICAgICAgdGhpcy5nbGFyZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuICAgIH1cbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUudXBkYXRlSW5pdGlhbFBvc2l0aW9uID0gZnVuY3Rpb24gdXBkYXRlSW5pdGlhbFBvc2l0aW9uKCkge1xuICAgIGlmICh0aGlzLnNldHRpbmdzLnN0YXJ0WCA9PT0gMCAmJiB0aGlzLnNldHRpbmdzLnN0YXJ0WSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub25Nb3VzZUVudGVyKCk7XG5cbiAgICBpZiAodGhpcy5mdWxsUGFnZUxpc3RlbmluZykge1xuICAgICAgdGhpcy5ldmVudCA9IHtcbiAgICAgICAgY2xpZW50WDogKHRoaXMuc2V0dGluZ3Muc3RhcnRYICsgdGhpcy5zZXR0aW5ncy5tYXgpIC8gKDIgKiB0aGlzLnNldHRpbmdzLm1heCkgKiB0aGlzLmNsaWVudFdpZHRoLFxuICAgICAgICBjbGllbnRZOiAodGhpcy5zZXR0aW5ncy5zdGFydFkgKyB0aGlzLnNldHRpbmdzLm1heCkgLyAoMiAqIHRoaXMuc2V0dGluZ3MubWF4KSAqIHRoaXMuY2xpZW50SGVpZ2h0XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV2ZW50ID0ge1xuICAgICAgICBjbGllbnRYOiB0aGlzLmxlZnQgKyAodGhpcy5zZXR0aW5ncy5zdGFydFggKyB0aGlzLnNldHRpbmdzLm1heCkgLyAoMiAqIHRoaXMuc2V0dGluZ3MubWF4KSAqIHRoaXMud2lkdGgsXG4gICAgICAgIGNsaWVudFk6IHRoaXMudG9wICsgKHRoaXMuc2V0dGluZ3Muc3RhcnRZICsgdGhpcy5zZXR0aW5ncy5tYXgpIC8gKDIgKiB0aGlzLnNldHRpbmdzLm1heCkgKiB0aGlzLmhlaWdodFxuICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgYmFja3VwU2NhbGUgPSB0aGlzLnNldHRpbmdzLnNjYWxlO1xuICAgIHRoaXMuc2V0dGluZ3Muc2NhbGUgPSAxO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gICAgdGhpcy5zZXR0aW5ncy5zY2FsZSA9IGJhY2t1cFNjYWxlO1xuICAgIHRoaXMucmVzZXRHbGFyZSgpO1xuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5nZXRWYWx1ZXMgPSBmdW5jdGlvbiBnZXRWYWx1ZXMoKSB7XG4gICAgdmFyIHggPSB2b2lkIDAsXG4gICAgICAgIHkgPSB2b2lkIDA7XG5cbiAgICBpZiAodGhpcy5mdWxsUGFnZUxpc3RlbmluZykge1xuICAgICAgeCA9IHRoaXMuZXZlbnQuY2xpZW50WCAvIHRoaXMuY2xpZW50V2lkdGg7XG4gICAgICB5ID0gdGhpcy5ldmVudC5jbGllbnRZIC8gdGhpcy5jbGllbnRIZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSAodGhpcy5ldmVudC5jbGllbnRYIC0gdGhpcy5sZWZ0KSAvIHRoaXMud2lkdGg7XG4gICAgICB5ID0gKHRoaXMuZXZlbnQuY2xpZW50WSAtIHRoaXMudG9wKSAvIHRoaXMuaGVpZ2h0O1xuICAgIH1cblxuICAgIHggPSBNYXRoLm1pbihNYXRoLm1heCh4LCAwKSwgMSk7XG4gICAgeSA9IE1hdGgubWluKE1hdGgubWF4KHksIDApLCAxKTtcblxuICAgIHZhciB0aWx0WCA9ICh0aGlzLnJldmVyc2UgKiAodGhpcy5zZXR0aW5ncy5tYXggLSB4ICogdGhpcy5zZXR0aW5ncy5tYXggKiAyKSkudG9GaXhlZCgyKTtcbiAgICB2YXIgdGlsdFkgPSAodGhpcy5yZXZlcnNlICogKHkgKiB0aGlzLnNldHRpbmdzLm1heCAqIDIgLSB0aGlzLnNldHRpbmdzLm1heCkpLnRvRml4ZWQoMik7XG4gICAgdmFyIGFuZ2xlID0gTWF0aC5hdGFuMih0aGlzLmV2ZW50LmNsaWVudFggLSAodGhpcy5sZWZ0ICsgdGhpcy53aWR0aCAvIDIpLCAtKHRoaXMuZXZlbnQuY2xpZW50WSAtICh0aGlzLnRvcCArIHRoaXMuaGVpZ2h0IC8gMikpKSAqICgxODAgLyBNYXRoLlBJKTtcblxuICAgIHJldHVybiB7XG4gICAgICB0aWx0WDogdGlsdFgsXG4gICAgICB0aWx0WTogdGlsdFksXG4gICAgICBwZXJjZW50YWdlWDogeCAqIDEwMCxcbiAgICAgIHBlcmNlbnRhZ2VZOiB5ICogMTAwLFxuICAgICAgYW5nbGU6IGFuZ2xlXG4gICAgfTtcbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUudXBkYXRlRWxlbWVudFBvc2l0aW9uID0gZnVuY3Rpb24gdXBkYXRlRWxlbWVudFBvc2l0aW9uKCkge1xuICAgIHZhciByZWN0ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgdGhpcy53aWR0aCA9IHRoaXMuZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgdGhpcy5sZWZ0ID0gcmVjdC5sZWZ0O1xuICAgIHRoaXMudG9wID0gcmVjdC50b3A7XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICB2YXIgdmFsdWVzID0gdGhpcy5nZXRWYWx1ZXMoKTtcblxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBcInBlcnNwZWN0aXZlKFwiICsgdGhpcy5zZXR0aW5ncy5wZXJzcGVjdGl2ZSArIFwicHgpIFwiICsgXCJyb3RhdGVYKFwiICsgKHRoaXMuc2V0dGluZ3MuYXhpcyA9PT0gXCJ4XCIgPyAwIDogdmFsdWVzLnRpbHRZKSArIFwiZGVnKSBcIiArIFwicm90YXRlWShcIiArICh0aGlzLnNldHRpbmdzLmF4aXMgPT09IFwieVwiID8gMCA6IHZhbHVlcy50aWx0WCkgKyBcImRlZykgXCIgKyBcInNjYWxlM2QoXCIgKyB0aGlzLnNldHRpbmdzLnNjYWxlICsgXCIsIFwiICsgdGhpcy5zZXR0aW5ncy5zY2FsZSArIFwiLCBcIiArIHRoaXMuc2V0dGluZ3Muc2NhbGUgKyBcIilcIjtcblxuICAgIGlmICh0aGlzLmdsYXJlKSB7XG4gICAgICB0aGlzLmdsYXJlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBcInJvdGF0ZShcIiArIHZhbHVlcy5hbmdsZSArIFwiZGVnKSB0cmFuc2xhdGUoLTUwJSwgLTUwJSlcIjtcbiAgICAgIHRoaXMuZ2xhcmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBcIlwiICsgdmFsdWVzLnBlcmNlbnRhZ2VZICogdGhpcy5zZXR0aW5nc1tcIm1heC1nbGFyZVwiXSAvIDEwMDtcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJ0aWx0Q2hhbmdlXCIsIHtcbiAgICAgIFwiZGV0YWlsXCI6IHZhbHVlc1xuICAgIH0pKTtcblxuICAgIHRoaXMudXBkYXRlQ2FsbCA9IG51bGw7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgdGhlIGdsYXJlIGVsZW1lbnQgKGlmIGdsYXJlUHJlcmVuZGVyIGVxdWFscyBmYWxzZSlcbiAgICogYW5kIHNldHMgdGhlIGRlZmF1bHQgc3R5bGVcbiAgICovXG5cblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUucHJlcGFyZUdsYXJlID0gZnVuY3Rpb24gcHJlcGFyZUdsYXJlKCkge1xuICAgIC8vIElmIG9wdGlvbiBwcmUtcmVuZGVyIGlzIGVuYWJsZWQgd2UgYXNzdW1lIGFsbCBodG1sL2NzcyBpcyBwcmVzZW50IGZvciBhbiBvcHRpbWFsIGdsYXJlIGVmZmVjdC5cbiAgICBpZiAoIXRoaXMuZ2xhcmVQcmVyZW5kZXIpIHtcbiAgICAgIC8vIENyZWF0ZSBnbGFyZSBlbGVtZW50XG4gICAgICB2YXIganNUaWx0R2xhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAganNUaWx0R2xhcmUuY2xhc3NMaXN0LmFkZChcImpzLXRpbHQtZ2xhcmVcIik7XG5cbiAgICAgIHZhciBqc1RpbHRHbGFyZUlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGpzVGlsdEdsYXJlSW5uZXIuY2xhc3NMaXN0LmFkZChcImpzLXRpbHQtZ2xhcmUtaW5uZXJcIik7XG5cbiAgICAgIGpzVGlsdEdsYXJlLmFwcGVuZENoaWxkKGpzVGlsdEdsYXJlSW5uZXIpO1xuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGpzVGlsdEdsYXJlKTtcbiAgICB9XG5cbiAgICB0aGlzLmdsYXJlRWxlbWVudFdyYXBwZXIgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy10aWx0LWdsYXJlXCIpO1xuICAgIHRoaXMuZ2xhcmVFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtdGlsdC1nbGFyZS1pbm5lclwiKTtcblxuICAgIGlmICh0aGlzLmdsYXJlUHJlcmVuZGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmdsYXJlRWxlbWVudFdyYXBwZXIuc3R5bGUsIHtcbiAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgXCJ0b3BcIjogXCIwXCIsXG4gICAgICBcImxlZnRcIjogXCIwXCIsXG4gICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgICBcIm92ZXJmbG93XCI6IFwiaGlkZGVuXCIsXG4gICAgICBcInBvaW50ZXItZXZlbnRzXCI6IFwibm9uZVwiXG4gICAgfSk7XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMuZ2xhcmVFbGVtZW50LnN0eWxlLCB7XG4gICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgIFwidG9wXCI6IFwiNTAlXCIsXG4gICAgICBcImxlZnRcIjogXCI1MCVcIixcbiAgICAgIFwicG9pbnRlci1ldmVudHNcIjogXCJub25lXCIsXG4gICAgICBcImJhY2tncm91bmQtaW1hZ2VcIjogXCJsaW5lYXItZ3JhZGllbnQoMGRlZywgcmdiYSgyNTUsMjU1LDI1NSwwKSAwJSwgcmdiYSgyNTUsMjU1LDI1NSwxKSAxMDAlKVwiLFxuICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJyb3RhdGUoMTgwZGVnKSB0cmFuc2xhdGUoLTUwJSwgLTUwJSlcIixcbiAgICAgIFwidHJhbnNmb3JtLW9yaWdpblwiOiBcIjAlIDAlXCIsXG4gICAgICBcIm9wYWNpdHlcIjogXCIwXCJcbiAgICB9KTtcblxuICAgIHRoaXMudXBkYXRlR2xhcmVTaXplKCk7XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLnVwZGF0ZUdsYXJlU2l6ZSA9IGZ1bmN0aW9uIHVwZGF0ZUdsYXJlU2l6ZSgpIHtcbiAgICBpZiAodGhpcy5nbGFyZSkge1xuICAgICAgdmFyIGdsYXJlU2l6ZSA9ICh0aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGggPiB0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0ID8gdGhpcy5lbGVtZW50Lm9mZnNldFdpZHRoIDogdGhpcy5lbGVtZW50Lm9mZnNldEhlaWdodCkgKiAyO1xuXG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMuZ2xhcmVFbGVtZW50LnN0eWxlLCB7XG4gICAgICAgIFwid2lkdGhcIjogZ2xhcmVTaXplICsgXCJweFwiLFxuICAgICAgICBcImhlaWdodFwiOiBnbGFyZVNpemUgKyBcInB4XCJcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUudXBkYXRlQ2xpZW50U2l6ZSA9IGZ1bmN0aW9uIHVwZGF0ZUNsaWVudFNpemUoKSB7XG4gICAgdGhpcy5jbGllbnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuXG4gICAgdGhpcy5jbGllbnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodDtcbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUub25XaW5kb3dSZXNpemUgPSBmdW5jdGlvbiBvbldpbmRvd1Jlc2l6ZSgpIHtcbiAgICB0aGlzLnVwZGF0ZUdsYXJlU2l6ZSgpO1xuICAgIHRoaXMudXBkYXRlQ2xpZW50U2l6ZSgpO1xuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5zZXRUcmFuc2l0aW9uID0gZnVuY3Rpb24gc2V0VHJhbnNpdGlvbigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudHJhbnNpdGlvblRpbWVvdXQpO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gdGhpcy5zZXR0aW5ncy5zcGVlZCArIFwibXMgXCIgKyB0aGlzLnNldHRpbmdzLmVhc2luZztcbiAgICBpZiAodGhpcy5nbGFyZSkgdGhpcy5nbGFyZUVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IFwib3BhY2l0eSBcIiArIHRoaXMuc2V0dGluZ3Muc3BlZWQgKyBcIm1zIFwiICsgdGhpcy5zZXR0aW5ncy5lYXNpbmc7XG5cbiAgICB0aGlzLnRyYW5zaXRpb25UaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSBcIlwiO1xuICAgICAgaWYgKF90aGlzLmdsYXJlKSB7XG4gICAgICAgIF90aGlzLmdsYXJlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gXCJcIjtcbiAgICAgIH1cbiAgICB9LCB0aGlzLnNldHRpbmdzLnNwZWVkKTtcbiAgfTtcblxuICAvKipcbiAgICogTWV0aG9kIHJldHVybiBwYXRjaGVkIHNldHRpbmdzIG9mIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2V0dGluZ3MucmV2ZXJzZSAtIHJldmVyc2UgdGhlIHRpbHQgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzZXR0aW5ncy5tYXggLSBtYXggdGlsdCByb3RhdGlvbiAoZGVncmVlcylcbiAgICogQHBhcmFtIHtzdGFydFh9IHNldHRpbmdzLnN0YXJ0WCAtIHRoZSBzdGFydGluZyB0aWx0IG9uIHRoZSBYIGF4aXMsIGluIGRlZ3JlZXMuIERlZmF1bHQ6IDBcbiAgICogQHBhcmFtIHtzdGFydFl9IHNldHRpbmdzLnN0YXJ0WSAtIHRoZSBzdGFydGluZyB0aWx0IG9uIHRoZSBZIGF4aXMsIGluIGRlZ3JlZXMuIERlZmF1bHQ6IDBcbiAgICogQHBhcmFtIHtudW1iZXJ9IHNldHRpbmdzLnBlcnNwZWN0aXZlIC0gVHJhbnNmb3JtIHBlcnNwZWN0aXZlLCB0aGUgbG93ZXIgdGhlIG1vcmUgZXh0cmVtZSB0aGUgdGlsdCBnZXRzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZXR0aW5ncy5lYXNpbmcgLSBFYXNpbmcgb24gZW50ZXIvZXhpdFxuICAgKiBAcGFyYW0ge251bWJlcn0gc2V0dGluZ3Muc2NhbGUgLSAyID0gMjAwJSwgMS41ID0gMTUwJSwgZXRjLi5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHNldHRpbmdzLnNwZWVkIC0gU3BlZWQgb2YgdGhlIGVudGVyL2V4aXQgdHJhbnNpdGlvblxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNldHRpbmdzLnRyYW5zaXRpb24gLSBTZXQgYSB0cmFuc2l0aW9uIG9uIGVudGVyL2V4aXRcbiAgICogQHBhcmFtIHtzdHJpbmd8bnVsbH0gc2V0dGluZ3MuYXhpcyAtIFdoYXQgYXhpcyBzaG91bGQgYmUgZGlzYWJsZWQuIENhbiBiZSBYIG9yIFlcbiAgICogQHBhcmFtIHtib29sZWFufSBzZXR0aW5ncy5nbGFyZSAtIFdoYXQgYXhpcyBzaG91bGQgYmUgZGlzYWJsZWQuIENhbiBiZSBYIG9yIFlcbiAgICogQHBhcmFtIHtudW1iZXJ9IHNldHRpbmdzLm1heC1nbGFyZSAtIHRoZSBtYXhpbXVtIFwiZ2xhcmVcIiBvcGFjaXR5ICgxID0gMTAwJSwgMC41ID0gNTAlKVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNldHRpbmdzLmdsYXJlLXByZXJlbmRlciAtIGZhbHNlID0gVmFuaWxsYVRpbHQgY3JlYXRlcyB0aGUgZ2xhcmUgZWxlbWVudHMgZm9yIHlvdSwgb3RoZXJ3aXNlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2V0dGluZ3MuZnVsbC1wYWdlLWxpc3RlbmluZyAtIElmIHRydWUsIHBhcmFsbGF4IGVmZmVjdCB3aWxsIGxpc3RlbiB0byBtb3VzZSBtb3ZlIGV2ZW50cyBvbiB0aGUgd2hvbGUgZG9jdW1lbnQsIG5vdCBvbmx5IHRoZSBzZWxlY3RlZCBlbGVtZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gc2V0dGluZ3MubW91c2UtZXZlbnQtZWxlbWVudCAtIFN0cmluZyBzZWxlY3RvciBvciBsaW5rIHRvIEhUTUwtZWxlbWVudCB3aGF0IHdpbGwgYmUgbGlzdGVuIG1vdXNlIGV2ZW50c1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNldHRpbmdzLnJlc2V0IC0gZmFsc2UgPSBJZiB0aGUgdGlsdCBlZmZlY3QgaGFzIHRvIGJlIHJlc2V0IG9uIGV4aXRcbiAgICogQHBhcmFtIHtneXJvc2NvcGV9IHNldHRpbmdzLmd5cm9zY29wZSAtIEVuYWJsZSB0aWx0aW5nIGJ5IGRldmljZW9yaWVudGF0aW9uIGV2ZW50c1xuICAgKiBAcGFyYW0ge2d5cm9zY29wZVNlbnNpdGl2aXR5fSBzZXR0aW5ncy5neXJvc2NvcGVTZW5zaXRpdml0eSAtIEJldHdlZW4gMCBhbmQgMSAtIFRoZSBhbmdsZSBhdCB3aGljaCBtYXggdGlsdCBwb3NpdGlvbiBpcyByZWFjaGVkLiAxID0gOTBkZWcsIDAuNSA9IDQ1ZGVnLCBldGMuLlxuICAgKiBAcGFyYW0ge2d5cm9zY29wZVNhbXBsZXN9IHNldHRpbmdzLmd5cm9zY29wZVNhbXBsZXMgLSBIb3cgbWFueSBneXJvc2NvcGUgbW92ZXMgdG8gZGVjaWRlIHRoZSBzdGFydGluZyBwb3NpdGlvbi5cbiAgICovXG5cblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUuZXh0ZW5kU2V0dGluZ3MgPSBmdW5jdGlvbiBleHRlbmRTZXR0aW5ncyhzZXR0aW5ncykge1xuICAgIHZhciBkZWZhdWx0U2V0dGluZ3MgPSB7XG4gICAgICByZXZlcnNlOiBmYWxzZSxcbiAgICAgIG1heDogMTUsXG4gICAgICBzdGFydFg6IDAsXG4gICAgICBzdGFydFk6IDAsXG4gICAgICBwZXJzcGVjdGl2ZTogMTAwMCxcbiAgICAgIGVhc2luZzogXCJjdWJpYy1iZXppZXIoLjAzLC45OCwuNTIsLjk5KVwiLFxuICAgICAgc2NhbGU6IDEsXG4gICAgICBzcGVlZDogMzAwLFxuICAgICAgdHJhbnNpdGlvbjogdHJ1ZSxcbiAgICAgIGF4aXM6IG51bGwsXG4gICAgICBnbGFyZTogZmFsc2UsXG4gICAgICBcIm1heC1nbGFyZVwiOiAxLFxuICAgICAgXCJnbGFyZS1wcmVyZW5kZXJcIjogZmFsc2UsXG4gICAgICBcImZ1bGwtcGFnZS1saXN0ZW5pbmdcIjogZmFsc2UsXG4gICAgICBcIm1vdXNlLWV2ZW50LWVsZW1lbnRcIjogbnVsbCxcbiAgICAgIHJlc2V0OiB0cnVlLFxuICAgICAgZ3lyb3Njb3BlOiB0cnVlLFxuICAgICAgZ3lyb3Njb3BlTWluQW5nbGVYOiAtNDUsXG4gICAgICBneXJvc2NvcGVNYXhBbmdsZVg6IDQ1LFxuICAgICAgZ3lyb3Njb3BlTWluQW5nbGVZOiAtNDUsXG4gICAgICBneXJvc2NvcGVNYXhBbmdsZVk6IDQ1LFxuICAgICAgZ3lyb3Njb3BlU2FtcGxlczogMTBcbiAgICB9O1xuXG4gICAgdmFyIG5ld1NldHRpbmdzID0ge307XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gZGVmYXVsdFNldHRpbmdzKSB7XG4gICAgICBpZiAocHJvcGVydHkgaW4gc2V0dGluZ3MpIHtcbiAgICAgICAgbmV3U2V0dGluZ3NbcHJvcGVydHldID0gc2V0dGluZ3NbcHJvcGVydHldO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmVsZW1lbnQuaGFzQXR0cmlidXRlKFwiZGF0YS10aWx0LVwiICsgcHJvcGVydHkpKSB7XG4gICAgICAgIHZhciBhdHRyaWJ1dGUgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10aWx0LVwiICsgcHJvcGVydHkpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIG5ld1NldHRpbmdzW3Byb3BlcnR5XSA9IEpTT04ucGFyc2UoYXR0cmlidXRlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIG5ld1NldHRpbmdzW3Byb3BlcnR5XSA9IGF0dHJpYnV0ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3U2V0dGluZ3NbcHJvcGVydHldID0gZGVmYXVsdFNldHRpbmdzW3Byb3BlcnR5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3U2V0dGluZ3M7XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQuaW5pdCA9IGZ1bmN0aW9uIGluaXQoZWxlbWVudHMsIHNldHRpbmdzKSB7XG4gICAgaWYgKGVsZW1lbnRzIGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgZWxlbWVudHMgPSBbZWxlbWVudHNdO1xuICAgIH1cblxuICAgIGlmIChlbGVtZW50cyBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7XG4gICAgICBlbGVtZW50cyA9IFtdLnNsaWNlLmNhbGwoZWxlbWVudHMpO1xuICAgIH1cblxuICAgIGlmICghKGVsZW1lbnRzIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgaWYgKCEoXCJ2YW5pbGxhVGlsdFwiIGluIGVsZW1lbnQpKSB7XG4gICAgICAgIGVsZW1lbnQudmFuaWxsYVRpbHQgPSBuZXcgVmFuaWxsYVRpbHQoZWxlbWVudCwgc2V0dGluZ3MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBWYW5pbGxhVGlsdDtcbn0oKTtcblxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAvKiBleHBvc2UgdGhlIGNsYXNzIHRvIHdpbmRvdyAqL1xuICB3aW5kb3cuVmFuaWxsYVRpbHQgPSBWYW5pbGxhVGlsdDtcblxuICAvKipcbiAgICogQXV0byBsb2FkXG4gICAqL1xuICBWYW5pbGxhVGlsdC5pbml0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS10aWx0XVwiKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVmFuaWxsYVRpbHQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9jc3NSZXNldC5jc3NcIjtcbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgZXhwbG9zaW9uSWNvbiBmcm9tIFwiLi9Bc3NldHMvZXhwbG9zaW9uLnBuZ1wiO1xuaW1wb3J0IFNpbmtJY29uIGZyb20gXCIuL0Fzc2V0cy9zaW5raW5nLnBuZ1wiO1xuaW1wb3J0IFZhbmlsbGFUaWx0IGZyb20gXCJ2YW5pbGxhLXRpbHRcIjtcbmltcG9ydCB7IHBsYXllciB9IGZyb20gXCIuL0Fzc2V0cy9tb2R1bGVzL3BsYXllckZhY3RvcnlcIjtcbmltcG9ydCB7IHNoaXAgfSBmcm9tIFwiLi9Bc3NldHMvbW9kdWxlcy9zaGlwZmFjdG9yeVwiO1xuaW1wb3J0IHsgZ2VuZXJhdGVTY29yZUJvYXJkIH0gZnJvbSBcIi4vQXNzZXRzL21vZHVsZXMvc2NvcmVCb2FyZFwiO1xuaW1wb3J0IHsgZ2VuZXJhdGVQbGF5ZXJUdXJucyB9IGZyb20gXCIuL0Fzc2V0cy9tb2R1bGVzL3BsYXllclR1cm5zXCI7XG5pbXBvcnQgeyB0aWxlQmFja2dyb3VuZENvbG9yIH0gZnJvbSBcIi4vQXNzZXRzL21vZHVsZXMvdGlsZUJhY2tncm91bmRDb2xvclwiO1xuXG5jb25zdCBnZXRBbGxJbnB1dHMgPSAoKCkgPT4ge1xuICAgIGNvbnN0IHBhZ2V0aWx0ID0gKGJhY2tFbGVtZW50KSA9PiB7XG4gICAgICAgIFZhbmlsbGFUaWx0LmluaXQoYmFja0VsZW1lbnQpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1heDogMzAsXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDEwMCxcbiAgICAgICAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IHBsYXllcmZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZXh0XCIpO1xuICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1Db250YWluZXJcIik7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybVwiKTtcbiAgICBjb25zdCBzaGlwZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcEZvcm1Db250YWluZXJcIik7XG4gICAgY29uc3QgZm9ybUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybUhlYWRlclwiKTtcbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2dvXCIpO1xuICAgIHBhZ2V0aWx0KGZvcm0pO1xuICAgIHBsYXllcmZpZWxkLm9ua2V5cHJlc3MgPSBmdW5jdGlvbiBnZXRwbGF5ZXIxbmFtZShlKSB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT0gMTMpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChwbGF5ZXJmaWVsZC5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXJmaWVsZC5zZXRDdXN0b21WYWxpZGl0eShcIlwiKTtcbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyMSA9IG5ldyBwbGF5ZXIoYCR7cGxheWVyZmllbGQudmFsdWUudG9VcHBlckNhc2UoKX1gKTtcbiAgICAgICAgICAgICAgICBnZXRQbGF5ZXIyTmFtZShwbGF5ZXIxKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJmaWVsZC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJmaWVsZC5zZXRDdXN0b21WYWxpZGl0eShcIlBsZWFzZSBlbnRlciBhIHZhbGlkIG5hbWVcIik7XG4gICAgICAgICAgICAgICAgcGxheWVyZmllbGQucmVwb3J0VmFsaWRpdHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZ2V0UGxheWVyMk5hbWUgPSAocGxheWVyMSkgPT4ge1xuICAgICAgICBmb3JtSGVhZGVyLnRleHRDb250ZW50ID0gXCJXZWxjb21lIFBsYXllciAyLCBFbnRlciB5b3VyIG5hbWU6XCI7XG4gICAgICAgIHBsYXllcmZpZWxkLm9ua2V5cHJlc3MgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgaWYgKGEua2V5Q29kZSA9PSAxMykge1xuICAgICAgICAgICAgICAgIGEucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJmaWVsZC5yZXBvcnRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJmaWVsZC5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBsYXllcjIgPSBuZXcgcGxheWVyKGAke3BsYXllcmZpZWxkLnZhbHVlLnRvVXBwZXJDYXNlKCl9YCk7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllcmZpZWxkLnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgZ2V0U3RhcnRpbmdQbGF5ZXIocGxheWVyMSwgcGxheWVyMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG4gICAgY29uc3QgZ2V0U3RhcnRpbmdQbGF5ZXIgPSAocGxheWVyMSwgcGxheWVyMikgPT4ge1xuICAgICAgICBmb3JtSGVhZGVyLnRleHRDb250ZW50ID0gXCJFbnRlciBTdGFydGluZyBQbGF5ZXJcIjtcbiAgICAgICAgcGxheWVyZmllbGQucGxhY2Vob2xkZXIgPSBcInBsYXllcjEgb3IgcGxheWVyMlwiO1xuICAgICAgICBwbGF5ZXJmaWVsZC52YWx1ZSA9IFwicGxheWVyMVwiO1xuICAgICAgICBwbGF5ZXJmaWVsZC5vbmtleXByZXNzID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgIGlmIChpLmtleUNvZGUgPT0gMTMgJiYgKHBsYXllcmZpZWxkLnZhbHVlLnRvTG93ZXJDYXNlKCkgPT0gXCJwbGF5ZXIxXCIgfHwgcGxheWVyZmllbGQudmFsdWUudG9Mb3dlckNhc2UoKSA9PSBcInBsYXllcjJcIikpIHtcbiAgICAgICAgICAgICAgICBpLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0aW5nUGxheWVyID0gcGxheWVyZmllbGQudmFsdWU7XG4gICAgICAgICAgICAgICAgcGxheWVyZmllbGQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGdldEJvYXJkU2l6ZVZhbHVlcyhwbGF5ZXIxLCBwbGF5ZXIyLCBzdGFydGluZ1BsYXllcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkua2V5Q29kZSA9PSAxMykge1xuICAgICAgICAgICAgICAgIGkucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJmaWVsZC5zZXRDdXN0b21WYWxpZGl0eShcIkVudGVyIHBsYXllcjEgb3IgcGxheWVyMlwiKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJmaWVsZC5yZXBvcnRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRCb2FyZFNpemVWYWx1ZXMgPSAocGxheWVyMSwgcGxheWVyMiwgc3RhcnRpbmdQbGF5ZXIpID0+IHtcbiAgICAgICAgZm9ybUhlYWRlci50ZXh0Q29udGVudCA9IFwiRW50ZXIgdGhlIHNpemUgb2YgdGhlIEdhbWUgQm9hcmQ6XCI7XG4gICAgICAgIHBsYXllcmZpZWxkLnZhbHVlID0gXCJzbWFsbFwiO1xuICAgICAgICBwbGF5ZXJmaWVsZC5wbGFjZWhvbGRlciA9IFwibWVkaXVtIG9yIHNtYWxsXCI7XG4gICAgICAgIHBsYXllcmZpZWxkLm9ua2V5cHJlc3MgPSBmdW5jdGlvbiAoYikge1xuICAgICAgICAgICAgaWYgKGIua2V5Q29kZSA9PSAxMyAmJiAocGxheWVyZmllbGQudmFsdWUudG9Mb3dlckNhc2UoKSA9PSBcIm1lZGl1bVwiIHx8IHBsYXllcmZpZWxkLnZhbHVlLnRvTG93ZXJDYXNlKCkgPT0gXCJzbWFsbFwiKSkge1xuICAgICAgICAgICAgICAgIGIucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdldHRpbmcgc2hpcCB2YWx1ZXNcIik7XG4gICAgICAgICAgICAgICAgcGxheWVyZmllbGQuc2V0Q3VzdG9tVmFsaWRpdHkoXCJcIik7XG4gICAgICAgICAgICAgICAgbGV0IGdhbWVCb2FyZFNpemUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RleHRcIikudmFsdWU7XG4gICAgICAgICAgICAgICAgZ2V0U2hpcFZhbHVlcyhwbGF5ZXIxLCBwbGF5ZXIyLCBzdGFydGluZ1BsYXllciwgZ2FtZUJvYXJkU2l6ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGIua2V5Q29kZSA9PSAxMykge1xuICAgICAgICAgICAgICAgIHBsYXllcmZpZWxkLnNldEN1c3RvbVZhbGlkaXR5KFwiRW50ZXIgbWVkaXVtIG9yIHNtYWxsIGZvciBib2FyZCBzaXplXCIpO1xuICAgICAgICAgICAgICAgIHBsYXllcmZpZWxkLnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IGdldFNoaXBWYWx1ZXMgPSAocGxheWVyMSwgcGxheWVyMiwgc3RhcnRpbmdQbGF5ZXIsIGdhbWVCb2FyZFNpemUpID0+IHtcbiAgICAgICAgbGV0IHBvcnRyYWl0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BvcnRyYWl0TnVtXCIpO1xuICAgICAgICBjb25zdCBwb3J0cmFpdE51bVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BvcnRyYWl0TGFiZWxOdW1cIik7XG4gICAgICAgIGNvbnN0IGxhbmRzY2FwZU51bVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhbmRzY2FwZUxhYmVsTnVtXCIpO1xuICAgICAgICBjb25zdCBtaW5MYWJlbE51bSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWluTGFiZWxOdW1cIik7XG4gICAgICAgIGNvbnN0IG1heExhYmVsTnVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYXhMYWJlbE51bVwiKTtcbiAgICAgICAgbGV0IGxhbmRzY2FwZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYW5kc2NhcGVOdW1cIik7XG4gICAgICAgIGxldCBtaW5MZW5ndGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21pbkxlbmd0aFwiKTtcbiAgICAgICAgbGV0IG1heExlbmd0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWF4TGVuZ3RoXCIpO1xuICAgICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2hpcEZvcm1cIik7XG5cbiAgICAgICAgcGFnZXRpbHQoZm9ybSk7XG5cbiAgICAgICAgaWYgKGdhbWVCb2FyZFNpemUgPT09IFwic21hbGxcIikge1xuICAgICAgICAgICAgZ2FtZUJvYXJkU2l6ZSA9IDEwMDtcbiAgICAgICAgfSBlbHNlIGlmIChnYW1lQm9hcmRTaXplID09PSBcIm1lZGl1bVwiKSB7XG4gICAgICAgICAgICBnYW1lQm9hcmRTaXplID0gNDAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibW92ZWRcIik7XG4gICAgICAgIHNoaXBmb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJtb3ZlZFwiKTtcbiAgICAgICAgaWYgKGdhbWVCb2FyZFNpemUgPT09IDEwMCkge1xuICAgICAgICAgICAgcG9ydHJhaXRJbnB1dC5tYXggPSBcIjVcIjtcbiAgICAgICAgICAgIGxhbmRzY2FwZUlucHV0Lm1heCA9IFwiNVwiO1xuICAgICAgICAgICAgbWluTGVuZ3RoLm1heCA9IFwiNVwiO1xuICAgICAgICAgICAgbWF4TGVuZ3RoLm1heCA9IFwiNVwiO1xuICAgICAgICAgICAgcG9ydHJhaXROdW1UZXh0LnRleHRDb250ZW50ID0gXCIoMS01KVwiO1xuICAgICAgICAgICAgbGFuZHNjYXBlTnVtVGV4dC50ZXh0Q29udGVudCA9IFwiKDEtNSlcIjtcbiAgICAgICAgICAgIG1pbkxhYmVsTnVtLnRleHRDb250ZW50ID0gXCIoMS01KVwiO1xuICAgICAgICAgICAgbWF4TGFiZWxOdW0udGV4dENvbnRlbnQgPSBcIigxLTUpXCI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGxheWJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheUJ1dHRvblwiKTtcbiAgICAgICAgcGxheWJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cocGFyc2VJbnQobWluTGVuZ3RoLnZhbHVlKSxtYXhMZW5ndGhWYWx1ZSk7XG4gICAgICAgICAgICBtYXhMZW5ndGguc2V0Q3VzdG9tVmFsaWRpdHkoXCJcIik7XG4gICAgICAgICAgICBmb3JtLnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgICAgICAgICBpZiAocGFyc2VJbnQobWF4TGVuZ3RoLnZhbHVlKSA8PSBwYXJzZUludChtaW5MZW5ndGgudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgbWF4TGVuZ3RoLnNldEN1c3RvbVZhbGlkaXR5KFwiTWF4aW11bSBsZW5ndGggbXVzdCBiZSBtb3JlIHRoYW4gbWluaW11bSBsZW5ndGhcIik7XG4gICAgICAgICAgICAgICAgbWF4TGVuZ3RoLnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KG1heExlbmd0aC52YWx1ZSkgPiBwYXJzZUludChtaW5MZW5ndGgudmFsdWUpICYmIGZvcm0uY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgICAgICAgICAgbWF4TGVuZ3RoLnNldEN1c3RvbVZhbGlkaXR5KFwiXCIpO1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlU2hpcHMocGxheWVyMSwgcGxheWVyMiwgc3RhcnRpbmdQbGF5ZXIsIGdhbWVCb2FyZFNpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG59KSgpO1xuXG5jb25zdCBnZW5lcmF0ZVNoaXBzID0gKHBsYXllcjEsIHBsYXllcjIsIHN0YXJ0aW5nUGxheWVyLCBnYW1lQm9hcmRTaXplKSA9PiB7XG4gICAgbGV0IGFsbFNoaXBzID0gW107XG4gICAgY29uc3QgY3J1aXNlcnNOdW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BvcnRyYWl0TnVtXCIpLnZhbHVlO1xuICAgIGNvbnN0IGRlc3Ryb3llcnNOdW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhbmRzY2FwZU51bVwiKS52YWx1ZTtcbiAgICBsZXQgbWF4TGVuZ3RoID0gcGFyc2VJbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYXhMZW5ndGhcIikudmFsdWUpO1xuICAgIGxldCBtaW5MZW5ndGggPSBwYXJzZUludChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21pbkxlbmd0aFwiKS52YWx1ZSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lQ29udGFpbmVyMVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lQ29udGFpbmVyMlwiKS5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwRm9ybUNvbnRhaW5lclwiKS5jbGFzc0xpc3QuYWRkKFwic2xpZGVEb3duXCIpO1xuXG4gICAgY29uc3QgcmFuZG9tU2hpcExlbmd0aCA9IChtaW5MZW5ndGgsIG1heExlbmd0aCkgPT4ge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heExlbmd0aCAtIG1pbkxlbmd0aCArIDEpICsgbWluTGVuZ3RoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2VuZXJhdGVDcnVpc2VycyA9IChtaW5MZW5ndGgsIG1heExlbmd0aCkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNydWlzZXJzTnVtOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByYW5kb21MZW5ndGggPSByYW5kb21TaGlwTGVuZ3RoKG1pbkxlbmd0aCwgbWF4TGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcjFjcnVpc2VycyA9IHNoaXAocmFuZG9tTGVuZ3RoLCBcInBvcnRyYWl0XCIsIFwicGxheWVyT25lXCIsIGdhbWVCb2FyZFNpemUpO1xuICAgICAgICAgICAgY29uc3QgcGxheWVyMmNydWlzZXJzID0gc2hpcChyYW5kb21MZW5ndGgsIFwicG9ydHJhaXRcIiwgXCJwbGF5ZXJUd29cIiwgZ2FtZUJvYXJkU2l6ZSk7XG4gICAgICAgICAgICBhbGxTaGlwcy5wdXNoKHBsYXllcjFjcnVpc2VycywgcGxheWVyMmNydWlzZXJzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZ2VuZXJhdGVEZXN0cm95ZXJzID0gKG1pbkxlbmd0aCwgbWF4TGVuZ3RoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVzdHJveWVyc051bTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcmFuZG9tTGVuZ3RoID0gcmFuZG9tU2hpcExlbmd0aChtaW5MZW5ndGgsIG1heExlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXIxRGVzdHJveWVycyA9IHNoaXAocmFuZG9tTGVuZ3RoLCBcImxhbmRzY2FwZVwiLCBcInBsYXllck9uZVwiLCBnYW1lQm9hcmRTaXplKTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcjJEZXN0cm95ZXJzID0gc2hpcChyYW5kb21MZW5ndGgsIFwibGFuZHNjYXBlXCIsIFwicGxheWVyVHdvXCIsIGdhbWVCb2FyZFNpemUpO1xuICAgICAgICAgICAgYWxsU2hpcHMucHVzaChwbGF5ZXIxRGVzdHJveWVycywgcGxheWVyMkRlc3Ryb3llcnMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBnZW5lcmF0ZUNydWlzZXJzKG1pbkxlbmd0aCwgbWF4TGVuZ3RoKTtcbiAgICBnZW5lcmF0ZURlc3Ryb3llcnMobWluTGVuZ3RoLCBtYXhMZW5ndGgpO1xuICAgIGdlbmVyYXRlU2NvcmVCb2FyZChwbGF5ZXIxLCBwbGF5ZXIyLCBhbGxTaGlwcyk7XG4gICAgZ2VuZXJhdGVQbGF5ZXJUdXJucyhwbGF5ZXIxLCBwbGF5ZXIyLCBzdGFydGluZ1BsYXllciwgZ2FtZUJvYXJkU2l6ZSwgYWxsU2hpcHMpO1xufTtcbiJdLCJuYW1lcyI6WyJnZW5lcmF0ZVNjb3JlQm9hcmQiLCJleHBsb3Npb25JY29uIiwic2lua0ljb24iLCJjaGVja0hpdHMiLCJwbGF5ZXIxIiwicGxheWVyMiIsImFsbFNoaXBzIiwidG90YWxIaXRzIiwiYWRkSEl0SWNvbiIsImhpdCIsImRhdGFpZCIsInN1YnN0ciIsImRhdGFrZXkiLCJoaXRUaWxlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaGFzQ2hpbGROb2RlcyIsImhpdEltYWdlIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInNyYyIsImFwcGVuZENoaWxkIiwiZm9yRWFjaCIsInNoaXAiLCJwb3NpdGlvbiIsImZpbHRlciIsInBvc2l0aW9uTnVtIiwiaW5jbHVkZXMiLCJoaXRzIiwiY2hlY2tTaGlwRGVzdHJveWVkIiwiZGVzdHJveVNoaXAiLCJudW1iZXIiLCJzaGlwUG9zIiwiZmlyc3RDaGlsZCIsImNoZWNrRm9yRGVzdHJveWVkIiwiZXZlcnkiLCJwb3MiLCJwbGF5ZXIiLCJ0aWxlQmFja2dyb3VuZENvbG9yIiwiZ2VuZXJhdGVib2FyZCIsImdhbWVCb2FyZFNpemUiLCJwbGF5ZXIxZ2FtZVRpbGUiLCJwbGF5ZXIyZ2FtZVRpbGUiLCJnYW1lQ29udGFpbmVyMSIsImdhbWVDb250YWluZXIyIiwicGxheWVydHVybkhlYWRlciIsInN0eWxlIiwiZ3JpZFRlbXBsYXRlQ29sdW1ucyIsImdyaWRUZW1wbGF0ZVJvd3MiLCJjb21wdXRlck1vdmUiLCJ0dXJuIiwibmFtZSIsInRpbGUiLCJzZWxlY3RSYW5kb21UaWxlIiwiY2xpY2siLCJ3aGljaFBsYXllciIsInRpbGVOdW0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsImNvbnNvbGUiLCJsb2ciLCJmaW5kIiwiZWxlbWVudCIsInRpbGVFbGVtZW50IiwicGxheWVyVGlsZXMiLCJwbGF5ZXJUaWxlIiwiaSIsImNsb25lTm9kZSIsInNldEF0dHJpYnV0ZSIsImF0dGFja1NoaXAiLCJlIiwidGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwiaGl0TnVtIiwicHVzaCIsIm9uY2xpY2siLCJ0ZXh0Q29udGVudCIsImlkIiwicmVtb3ZlIiwiY29uc3RydWN0b3IiLCJnZW5lcmF0ZVBsYXllclR1cm5zIiwic3RhcnRpbmdQbGF5ZXIiLCJwbGF5ZXIxSGVhZGVyIiwicGxheWVyMkhlYWRlciIsInBsYXllcjFTY29yZSIsInBsYXllcjJTY29yZSIsInBsYXllclR1cm5IZWFkZXIiLCJyZW1haW5pbmdQbGF5ZXIxU2hpcHMiLCJsZW5ndGgiLCJyZW1haW5pbmdQbGF5ZXIyU2hpcHMiLCJkZXN0cm95ZWRQbGF5ZXIxU2hpcHMiLCJkZXN0cm95ZWRQbGF5ZXIyU2hpcHMiLCJhbGxQbGF5ZXIxUG9zIiwiYWxsUGxheWVyMlBvcyIsIm9yaWVudCIsImdldExlbmd0aCIsImluaXRpYWxQb3MiLCJnYW1lQm9hcmRMZW5ndGgiLCJzcXJ0IiwiY2hlY2tOb0R1cGxpY2F0ZUxhbmRzY2FwZVBvcyIsIlBvcyIsInRlbXBQb3MiLCJwdXNoVG9BcnJheUxhbmRzY2FwZSIsImZpbmFsUG9zIiwiY2hlY2tQb3NMYW5kc2NhcGUiLCJ0ZXN0UG9zIiwiY2hlY2tOb0R1cGxpY2F0ZVBvdHJhaXRQb3MiLCJjaGVja1Bvc1BvcnRyYWl0IiwicHVzaHRvQXJyYXlQb3J0cmFpdCIsInBsYXllcjFDb250YWluZXIiLCJwbGF5ZXIyQ29udGFpbmVyIiwiYmFja2dyb3VuZENvbG9yIiwiU2lua0ljb24iLCJWYW5pbGxhVGlsdCIsImdldEFsbElucHV0cyIsInBhZ2V0aWx0IiwiYmFja0VsZW1lbnQiLCJpbml0IiwibWF4Iiwic3BlZWQiLCJwbGF5ZXJmaWVsZCIsImZvcm1Db250YWluZXIiLCJmb3JtIiwic2hpcGZvcm1Db250YWluZXIiLCJmb3JtSGVhZGVyIiwibG9nbyIsIm9ua2V5cHJlc3MiLCJnZXRwbGF5ZXIxbmFtZSIsImtleUNvZGUiLCJwcmV2ZW50RGVmYXVsdCIsImNoZWNrVmFsaWRpdHkiLCJzZXRDdXN0b21WYWxpZGl0eSIsInZhbHVlIiwidG9VcHBlckNhc2UiLCJnZXRQbGF5ZXIyTmFtZSIsInJlcG9ydFZhbGlkaXR5IiwiYSIsImdldFN0YXJ0aW5nUGxheWVyIiwicGxhY2Vob2xkZXIiLCJ0b0xvd2VyQ2FzZSIsImdldEJvYXJkU2l6ZVZhbHVlcyIsImIiLCJnZXRTaGlwVmFsdWVzIiwicG9ydHJhaXRJbnB1dCIsInBvcnRyYWl0TnVtVGV4dCIsImxhbmRzY2FwZU51bVRleHQiLCJtaW5MYWJlbE51bSIsIm1heExhYmVsTnVtIiwibGFuZHNjYXBlSW5wdXQiLCJtaW5MZW5ndGgiLCJtYXhMZW5ndGgiLCJwbGF5YnV0dG9uIiwicGFyc2VJbnQiLCJnZW5lcmF0ZVNoaXBzIiwiY3J1aXNlcnNOdW0iLCJkZXN0cm95ZXJzTnVtIiwiZGlzcGxheSIsInJhbmRvbVNoaXBMZW5ndGgiLCJnZW5lcmF0ZUNydWlzZXJzIiwicmFuZG9tTGVuZ3RoIiwicGxheWVyMWNydWlzZXJzIiwicGxheWVyMmNydWlzZXJzIiwiZ2VuZXJhdGVEZXN0cm95ZXJzIiwicGxheWVyMURlc3Ryb3llcnMiLCJwbGF5ZXIyRGVzdHJveWVycyJdLCJzb3VyY2VSb290IjoiIn0=