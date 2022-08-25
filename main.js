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
  }; //console.log(totalHits);


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
    } //console.log(checkForDestroyed)
    //console.log(ship.position)
    //console.log(ship.hits)

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
/* harmony import */ var _scoreBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scoreBoard */ "./src/Assets/modules/scoreBoard.js");
/* harmony import */ var _tileBackgroundColor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tileBackgroundColor */ "./src/Assets/modules/tileBackgroundColor.js");




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
  playerTiles.forEach(playerTile => {
    for (let i = 0; i < gameBoardSize; i++) {
      const tile = playerTile.cloneNode();
      tile.setAttribute("data-key", i + 1); //tile.setAttribute("data-id", player1)

      const attackShip = (e, player1, player2) => {
        const tile = e.target.getAttribute("data-id");
        console.log(tile);

        if (tile == "playerOne" && player1.turn == 1) {
          e.target.classList.add("hit");
          const hitNum = e.target.getAttribute("data-id") + e.target.getAttribute("data-key"); //console.log(hitNum);

          totalHits.push(hitNum);
          (0,_checkHits__WEBPACK_IMPORTED_MODULE_0__.checkHits)(player1, player2, allShips, totalHits); //generateScoreBoard(player1,player2);

          (0,_checkHits__WEBPACK_IMPORTED_MODULE_0__.checkShipDestroyed)(allShips);

          if ((0,_scoreBoard__WEBPACK_IMPORTED_MODULE_1__.generateScoreBoard)(player1, player2, allShips)) {
            return true;
          } else {
            player1.turn = 0;
            player2.turn = 0;
            return false;
          }
        } else if (tile == "playerTwo" && player2.turn == 1) {
          e.target.classList.add("hit");
          const hitNum = e.target.getAttribute("data-id") + e.target.getAttribute("data-key");
          console.log(hitNum);
          totalHits.push(hitNum);
          (0,_checkHits__WEBPACK_IMPORTED_MODULE_0__.checkHits)(player1, player2, allShips, totalHits);
          (0,_checkHits__WEBPACK_IMPORTED_MODULE_0__.checkShipDestroyed)(allShips);

          if ((0,_scoreBoard__WEBPACK_IMPORTED_MODULE_1__.generateScoreBoard)(player1, player2, allShips)) {
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
            playerturnHeader.textContent = "".concat(player2.name, "'s Turn");
            player1.turn--;
            player2.turn++;
            (0,_tileBackgroundColor__WEBPACK_IMPORTED_MODULE_2__.tileBackgroundColor)(player1, player2);
          }
        } else if (player2.turn == 1) {
          //playerturnHeader.textContent = `${player2.name}'s Turn`
          if (attackShip(e, player1, player2)) {
            playerturnHeader.textContent = "".concat(player1.name, "'s Turn");
            player2.turn--;
            player1.turn++;
            (0,_tileBackgroundColor__WEBPACK_IMPORTED_MODULE_2__.tileBackgroundColor)(player1, player2);
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
    console.log(initialPos, length, player);

    if (orient === "landscape") {
      // to make sure all positions are placed correctly
      const checkNoDuplicateLandscapePos = Pos => {
        for (let i = 0; i < length; i++) {
          let tempPos = Pos + i;

          if (player == "playerOne" && allPlayer1Pos.includes(tempPos)) {
            return true;
          } else if (player == "playerTwo" && allPlayer2Pos.includes(tempPos)) {
            return true;
          } //if (allLandscapePos.includes(tempPos)) {
          //    return true;
          //}

        }
      };

      const pushToArrayLandscape = initialPos => {
        if (!checkNoDuplicateLandscapePos(initialPos)) {
          console.log("pushing to array");

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
            console.log(testPos);
            initialPos = initialPos + (i + 1);
            console.log("checking pos One" + initialPos);
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
      const checkNoDuplicatePotraitPos = Pos => {
        for (let i = 0; i < length; i++) {
          let tempPos = initialPos + i * gameBoardLength;

          if (player == "playerOne" && allPlayer1Pos.includes(tempPos)) {
            return true;
          } else if (player == "playerTwo" && allPlayer2Pos.includes(tempPos)) {
            return true;
          } //if (allPortraitPos.includes(tempPos)) {
          //    return true;
          //}

        }
      };

      const checkPosPortrait = initialPos => {
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

      const pushtoArrayPortrait = initialPos => {
        if (!checkNoDuplicatePotraitPos(initialPos)) {
          for (let i = 0; i < length; i++) {
            position.push(player + (initialPos + i * gameBoardLength));

            if (player == "playerOne") {
              allPlayer1Pos.push(initialPos + i * gameBoardLength);
            } else if (player == "playerTwo") {
              allPlayer2Pos.push(initialPos + i * gameBoardLength);
            } //allPortraitPos.push(initialPos + i * gameBoardLength);

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
___CSS_LOADER_EXPORT___.push([module.id, ":root{\n    --main-font: 'Source Serif Pro', serif;\n    --secondary-font: 'East Sea Dokdo';\n}\n\n#player1GameTile, #player2GameTile{\n    background-color: #8C6636;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    border: 1px solid black;\n    cursor: pointer;\n    display: grid;\n    place-content: center;\n}\n#player1GameTile:hover, #player2GameTile:hover{\n    background-color: #8C4236;\n}\n\n\n#player1GameTile.hit, #player2GameTile.hit{\n    background-color: #5B2820;\n}\n\n\n\n.gameContainer1, .gameContainer2{\n    margin: 1rem;\n    width: 60rem;\n    height: 60rem;\n    place-items: center;\n    overflow: hidden;\n    display: none;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(11, 1fr);\n\n}\n.logo{\n    font-size:  6rem;\n    font-family: var(--secondary-font);\n    margin-bottom: 50px;\n    padding: 20px;\n    transform: translateZ(60px);\n    \n}\n\n#player1Header, #player2Header{\n    grid-column: 1/-1;\n    font-size: 3rem;\n    margin: 1rem;\n    padding: 1.5rem;\n    font-family: var(--main-font);\n    \n}\n\n.hitImage{\n    width: 40px;\n    background-repeat: no-repeat;\n    background-position: center;\n}\n\n.formContainer{\n    position: fixed;\n    background-color: #8C4236;\n    z-index: 3;\n    width: 100%;\n    height: 100vh;\n    top: 0;\n    left: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transition: transform 1s ease-in-out;\n}\n\n.shipFormContainer{\n    position: fixed;\n    background-color: #8C7936;\n    z-index: 2;\n    width: 100%;\n    height: 100vh;\n    top: 0;\n    left: 0;\n    opacity: 0;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    transform: translateY( 100vh) rotate(180deg);\n    transition: transform 1s ease-in-out;\n}\n\n.shipFormContainer.moved{\n    transform: translateY( 0vh) rotate(0deg);\n    opacity: 1;\n}\n.shipFormContainer.moved.slideDown{\n    transform: translateY(-100vh) rotate(180deg);\n    opacity: 1;\n}\n\n.formContainer.moved{\n    transform: translateY( 100vh) rotate(180deg);\n}\n\n#form, #shipForm{\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    padding:30px;\n    border-radius: 30px;\n    transform-style: preserve-3d;\n    transform: perspective(1000px);\n}\n\n#playerTurn{\n    font-family: var(--main-font);\n    font-size: 4rem;\n    margin-top: 20px;\n    border-bottom: 1px solid black;\n    \n    \n}\n\n#player1Score, #player2Score{\n    font-family: var(--main-font);\n    font-size: 1.8rem;\n    margin: 15px;\n}\n\n.header{\n    grid-column: 1/ -1;\n    text-align: center;\n    background-color: #28683B;\n    border-radius: 2rem;\n    box-shadow: 1px 1px 10px rgb(53, 53, 53);\n    display: none;\n    flex-direction: column;\n    align-items: center;\n    padding: 10px;\n    margin: 30px;\n    width: 50%;\n}\n\ninput[type=\"text\"], input[type=\"number\"]{\n    width: 70%;\n    height: 3rem;\n    background-color:  transparent;\n    border: none;\n    border-bottom: 1px solid black;\n    margin-bottom: 20px;\n    text-align: center;\n    font-family: var(--main-font);\n    font-size: 2rem;\n}\n\ninput[type=\"text\"]:focus,  input[type=\"number\"]:focus{\n    outline: none;\n}\n\nh1{\n    margin-bottom: 20px;\n    font-family: var(--main-font);\n    font-size: 2rem;\n}\n\nbutton{\n    width: 200px;\n    height: 50px;\n    background-color: #28683B;\n    box-shadow: 2px 2px 2px rgb(53, 53, 53);\n    cursor: pointer;\n    border: none;\n}\n\nlabel{\n    font-family: var(--main-font);\n    font-size: 1.4rem;\n}\n\nimg{\n    width: 30px;\n}\n\nbody{\n    background-color: #264559;\n    display: grid;\n    grid-template-rows: 1fr 5fr;\n    grid-template-columns: 1fr 1fr;\n    place-items: center;\n    height: 100vh;\n    width: 100%;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,sCAAsC;IACtC,kCAAkC;AACtC;;AAEA;IACI,yBAAyB;IACzB,WAAW;IACX,YAAY;IACZ,SAAS;IACT,uBAAuB;IACvB,eAAe;IACf,aAAa;IACb,qBAAqB;AACzB;AACA;IACI,yBAAyB;AAC7B;;;AAGA;IACI,yBAAyB;AAC7B;;;;AAIA;IACI,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,gBAAgB;IAChB,aAAa;IACb,sCAAsC;IACtC,mCAAmC;;AAEvC;AACA;IACI,gBAAgB;IAChB,kCAAkC;IAClC,mBAAmB;IACnB,aAAa;IACb,2BAA2B;;AAE/B;;AAEA;IACI,iBAAiB;IACjB,eAAe;IACf,YAAY;IACZ,eAAe;IACf,6BAA6B;;AAEjC;;AAEA;IACI,WAAW;IACX,4BAA4B;IAC5B,2BAA2B;AAC/B;;AAEA;IACI,eAAe;IACf,yBAAyB;IACzB,UAAU;IACV,WAAW;IACX,aAAa;IACb,MAAM;IACN,OAAO;IACP,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,oCAAoC;AACxC;;AAEA;IACI,eAAe;IACf,yBAAyB;IACzB,UAAU;IACV,WAAW;IACX,aAAa;IACb,MAAM;IACN,OAAO;IACP,UAAU;IACV,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,4CAA4C;IAC5C,oCAAoC;AACxC;;AAEA;IACI,wCAAwC;IACxC,UAAU;AACd;AACA;IACI,4CAA4C;IAC5C,UAAU;AACd;;AAEA;IACI,4CAA4C;AAChD;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,YAAY;IACZ,mBAAmB;IACnB,4BAA4B;IAC5B,8BAA8B;AAClC;;AAEA;IACI,6BAA6B;IAC7B,eAAe;IACf,gBAAgB;IAChB,8BAA8B;;;AAGlC;;AAEA;IACI,6BAA6B;IAC7B,iBAAiB;IACjB,YAAY;AAChB;;AAEA;IACI,kBAAkB;IAClB,kBAAkB;IAClB,yBAAyB;IACzB,mBAAmB;IACnB,wCAAwC;IACxC,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,aAAa;IACb,YAAY;IACZ,UAAU;AACd;;AAEA;IACI,UAAU;IACV,YAAY;IACZ,8BAA8B;IAC9B,YAAY;IACZ,8BAA8B;IAC9B,mBAAmB;IACnB,kBAAkB;IAClB,6BAA6B;IAC7B,eAAe;AACnB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,mBAAmB;IACnB,6BAA6B;IAC7B,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,yBAAyB;IACzB,uCAAuC;IACvC,eAAe;IACf,YAAY;AAChB;;AAEA;IACI,6BAA6B;IAC7B,iBAAiB;AACrB;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,yBAAyB;IACzB,aAAa;IACb,2BAA2B;IAC3B,8BAA8B;IAC9B,mBAAmB;IACnB,aAAa;IACb,WAAW;AACf","sourcesContent":[":root{\n    --main-font: 'Source Serif Pro', serif;\n    --secondary-font: 'East Sea Dokdo';\n}\n\n#player1GameTile, #player2GameTile{\n    background-color: #8C6636;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    border: 1px solid black;\n    cursor: pointer;\n    display: grid;\n    place-content: center;\n}\n#player1GameTile:hover, #player2GameTile:hover{\n    background-color: #8C4236;\n}\n\n\n#player1GameTile.hit, #player2GameTile.hit{\n    background-color: #5B2820;\n}\n\n\n\n.gameContainer1, .gameContainer2{\n    margin: 1rem;\n    width: 60rem;\n    height: 60rem;\n    place-items: center;\n    overflow: hidden;\n    display: none;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(11, 1fr);\n\n}\n.logo{\n    font-size:  6rem;\n    font-family: var(--secondary-font);\n    margin-bottom: 50px;\n    padding: 20px;\n    transform: translateZ(60px);\n    \n}\n\n#player1Header, #player2Header{\n    grid-column: 1/-1;\n    font-size: 3rem;\n    margin: 1rem;\n    padding: 1.5rem;\n    font-family: var(--main-font);\n    \n}\n\n.hitImage{\n    width: 40px;\n    background-repeat: no-repeat;\n    background-position: center;\n}\n\n.formContainer{\n    position: fixed;\n    background-color: #8C4236;\n    z-index: 3;\n    width: 100%;\n    height: 100vh;\n    top: 0;\n    left: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transition: transform 1s ease-in-out;\n}\n\n.shipFormContainer{\n    position: fixed;\n    background-color: #8C7936;\n    z-index: 2;\n    width: 100%;\n    height: 100vh;\n    top: 0;\n    left: 0;\n    opacity: 0;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    transform: translateY( 100vh) rotate(180deg);\n    transition: transform 1s ease-in-out;\n}\n\n.shipFormContainer.moved{\n    transform: translateY( 0vh) rotate(0deg);\n    opacity: 1;\n}\n.shipFormContainer.moved.slideDown{\n    transform: translateY(-100vh) rotate(180deg);\n    opacity: 1;\n}\n\n.formContainer.moved{\n    transform: translateY( 100vh) rotate(180deg);\n}\n\n#form, #shipForm{\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    padding:30px;\n    border-radius: 30px;\n    transform-style: preserve-3d;\n    transform: perspective(1000px);\n}\n\n#playerTurn{\n    font-family: var(--main-font);\n    font-size: 4rem;\n    margin-top: 20px;\n    border-bottom: 1px solid black;\n    \n    \n}\n\n#player1Score, #player2Score{\n    font-family: var(--main-font);\n    font-size: 1.8rem;\n    margin: 15px;\n}\n\n.header{\n    grid-column: 1/ -1;\n    text-align: center;\n    background-color: #28683B;\n    border-radius: 2rem;\n    box-shadow: 1px 1px 10px rgb(53, 53, 53);\n    display: none;\n    flex-direction: column;\n    align-items: center;\n    padding: 10px;\n    margin: 30px;\n    width: 50%;\n}\n\ninput[type=\"text\"], input[type=\"number\"]{\n    width: 70%;\n    height: 3rem;\n    background-color:  transparent;\n    border: none;\n    border-bottom: 1px solid black;\n    margin-bottom: 20px;\n    text-align: center;\n    font-family: var(--main-font);\n    font-size: 2rem;\n}\n\ninput[type=\"text\"]:focus,  input[type=\"number\"]:focus{\n    outline: none;\n}\n\nh1{\n    margin-bottom: 20px;\n    font-family: var(--main-font);\n    font-size: 2rem;\n}\n\nbutton{\n    width: 200px;\n    height: 50px;\n    background-color: #28683B;\n    box-shadow: 2px 2px 2px rgb(53, 53, 53);\n    cursor: pointer;\n    border: none;\n}\n\nlabel{\n    font-family: var(--main-font);\n    font-size: 1.4rem;\n}\n\nimg{\n    width: 30px;\n}\n\nbody{\n    background-color: #264559;\n    display: grid;\n    grid-template-rows: 1fr 5fr;\n    grid-template-columns: 1fr 1fr;\n    place-items: center;\n    height: 100vh;\n    width: 100%;\n}"],"sourceRoot":""}]);
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SinkIcon": () => (/* reexport default export from named module */ _Assets_sinking_png__WEBPACK_IMPORTED_MODULE_3__),
/* harmony export */   "explosionIcon": () => (/* reexport default export from named module */ _Assets_explosion_png__WEBPACK_IMPORTED_MODULE_2__)
/* harmony export */ });
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









 //let allPlayer1Pos = [];
//let allPlayer2Pos = [];
//let allShips = [];
//let totalHits = [];

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
        let player1 = new _Assets_modules_playerFactory__WEBPACK_IMPORTED_MODULE_5__.player("".concat(playerfield.value));
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
          let player2 = new _Assets_modules_playerFactory__WEBPACK_IMPORTED_MODULE_5__.player("".concat(playerfield.value));
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
    let maxLength = document.querySelector("#maxLength"); //let minLengthValue = parseInt(document.querySelector("#minLength").value)
    //let maxLengthValue = parseInt(document.querySelector("#maxLength").value)

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
  let allShips = []; //const shipformContainer = document.querySelector(".shipFormContainer");

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
  (0,_Assets_modules_playerTurns__WEBPACK_IMPORTED_MODULE_8__.generatePlayerTurns)(player1, player2, startingPlayer, gameBoardSize, allShips); //console.log("all player 1 postions" + allPlayer1Pos);
  //console.log("all player 2 postions" + allPlayer2Pos);
};


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTUcsU0FBUyxHQUFHLENBQUNDLE9BQUQsRUFBVUMsT0FBVixFQUFtQkMsUUFBbkIsRUFBNkJDLFNBQTdCLEtBQTJDO0VBRXpELE1BQU1DLFVBQVUsR0FBSUMsR0FBRCxJQUFTO0lBQ3hCLE1BQU1DLE1BQU0sR0FBR0QsR0FBRyxDQUFDRSxNQUFKLENBQVcsQ0FBWCxFQUFjLENBQWQsQ0FBZjtJQUNBLE1BQU1DLE9BQU8sR0FBR0gsR0FBRyxDQUFDRSxNQUFKLENBQVcsQ0FBWCxFQUFjLEVBQWQsQ0FBaEI7SUFDQSxNQUFNRSxPQUFPLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCx1QkFBcUNILE9BQXJDLDJCQUEyREYsTUFBM0QsU0FBaEI7O0lBQ0EsSUFBSSxDQUFDRyxPQUFPLENBQUNHLGFBQVIsRUFBTCxFQUE4QjtNQUMxQixNQUFNQyxRQUFRLEdBQUdILFFBQVEsQ0FBQ0ksYUFBVCxDQUF1QixLQUF2QixDQUFqQjtNQUNBRCxRQUFRLENBQUNFLFNBQVQsQ0FBbUJDLEdBQW5CLENBQXVCLFVBQXZCO01BQ0FILFFBQVEsQ0FBQ0ksR0FBVCxHQUFlcEIsa0RBQWY7TUFDQVksT0FBTyxDQUFDUyxXQUFSLENBQW9CTCxRQUFwQjtJQUNIO0VBQ0osQ0FWRCxDQUZ5RCxDQWF6RDs7O0VBRUFYLFFBQVEsQ0FBQ2lCLE9BQVQsQ0FBa0JDLElBQUQsSUFBVTtJQUN2QixJQUFJZixHQUFHLEdBQUdlLElBQUksQ0FBQ0MsUUFBTCxDQUFjQyxNQUFkLENBQXNCQyxXQUFELElBQWlCcEIsU0FBUyxDQUFDcUIsUUFBVixDQUFtQkQsV0FBbkIsQ0FBdEMsQ0FBVjtJQUNBSCxJQUFJLENBQUNLLElBQUwsR0FBWSxDQUFDLEdBQUdwQixHQUFKLENBQVo7SUFDQUEsR0FBRyxDQUFDYyxPQUFKLENBQWFkLEdBQUQsSUFBUztNQUNqQkQsVUFBVSxDQUFDQyxHQUFELENBQVY7SUFDSCxDQUZEO0VBR0gsQ0FORDtFQU9BVCwrREFBa0IsQ0FBQ0ksT0FBRCxFQUFVQyxPQUFWLEVBQW1CQyxRQUFuQixDQUFsQjtBQUdILENBekJEOztBQTJCQSxNQUFNd0Isa0JBQWtCLEdBQUl4QixRQUFELElBQWM7RUFFckMsTUFBTXlCLFdBQVcsR0FBSVAsSUFBRCxJQUFVO0lBQzFCQSxJQUFJLENBQUNDLFFBQUwsQ0FBY0YsT0FBZCxDQUF1QlMsTUFBRCxJQUFZO01BQzlCLE1BQU10QixNQUFNLEdBQUdzQixNQUFNLENBQUNyQixNQUFQLENBQWMsQ0FBZCxFQUFpQixDQUFqQixDQUFmO01BQ0EsTUFBTUMsT0FBTyxHQUFHb0IsTUFBTSxDQUFDckIsTUFBUCxDQUFjLENBQWQsRUFBaUIsRUFBakIsQ0FBaEI7TUFDQSxNQUFNc0IsT0FBTyxHQUFHbkIsUUFBUSxDQUFDQyxhQUFULHVCQUFxQ0gsT0FBckMsMkJBQTJERixNQUEzRCxTQUFoQjtNQUNBdUIsT0FBTyxDQUFDQyxVQUFSLENBQW1CYixHQUFuQixHQUF5Qm5CLGdEQUF6QjtJQUVILENBTkQ7RUFRSCxDQVREOztFQVVBSSxRQUFRLENBQUNpQixPQUFULENBQWtCQyxJQUFELElBQVU7SUFDdkIsSUFBSVcsaUJBQWlCLEdBQUdYLElBQUksQ0FBQ0MsUUFBTCxDQUFjVyxLQUFkLENBQXFCQyxHQUFELElBQVNiLElBQUksQ0FBQ0ssSUFBTCxDQUFVRCxRQUFWLENBQW1CUyxHQUFuQixDQUE3QixDQUF4Qjs7SUFDQSxJQUFJRixpQkFBSixFQUF1QjtNQUNuQkosV0FBVyxDQUFDUCxJQUFELENBQVg7SUFDSCxDQUpzQixDQUt2QjtJQUNBO0lBQ0E7O0VBQ0gsQ0FSRDtBQVlILENBeEJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0JBO0FBQ0E7QUFDQTs7QUFHQSxNQUFNZSxhQUFhLEdBQUcsQ0FBQ0MsYUFBRCxFQUFnQnBDLE9BQWhCLEVBQXlCQyxPQUF6QixFQUFrQ0MsUUFBbEMsS0FBK0M7RUFDakUsSUFBSUMsU0FBUyxHQUFHLEVBQWhCO0VBQ0EsTUFBTWtDLGVBQWUsR0FBRzNCLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixrQkFBdkIsQ0FBeEI7RUFDQSxNQUFNMkIsZUFBZSxHQUFHNUIsUUFBUSxDQUFDQyxhQUFULENBQXVCLGtCQUF2QixDQUF4QjtFQUNBLE1BQU00QixjQUFjLEdBQUc3QixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsaUJBQXZCLENBQXZCO0VBQ0EsTUFBTTZCLGNBQWMsR0FBRzlCLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixpQkFBdkIsQ0FBdkI7RUFDQSxNQUFNOEIsZ0JBQWdCLEdBQUcvQixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBekI7O0VBRUEsSUFBSXlCLGFBQWEsS0FBSyxHQUF0QixFQUEyQjtJQUN2QkcsY0FBYyxDQUFDRyxLQUFmLENBQXFCQyxtQkFBckIsR0FBMkMsaUJBQTNDO0lBQ0FKLGNBQWMsQ0FBQ0csS0FBZixDQUFxQkUsZ0JBQXJCLEdBQXdDLGlCQUF4QztJQUNBSixjQUFjLENBQUNFLEtBQWYsQ0FBcUJDLG1CQUFyQixHQUEyQyxpQkFBM0M7SUFDQUgsY0FBYyxDQUFDRSxLQUFmLENBQXFCRSxnQkFBckIsR0FBd0MsaUJBQXhDO0VBQ0g7O0VBRUQsTUFBTUMsV0FBVyxHQUFHLENBQUNSLGVBQUQsRUFBa0JDLGVBQWxCLENBQXBCO0VBQ0FPLFdBQVcsQ0FBQzFCLE9BQVosQ0FBcUIyQixVQUFELElBQWdCO0lBQ2hDLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR1gsYUFBcEIsRUFBbUNXLENBQUMsRUFBcEMsRUFBd0M7TUFDcEMsTUFBTUMsSUFBSSxHQUFHRixVQUFVLENBQUNHLFNBQVgsRUFBYjtNQUNBRCxJQUFJLENBQUNFLFlBQUwsQ0FBa0IsVUFBbEIsRUFBOEJILENBQUMsR0FBRyxDQUFsQyxFQUZvQyxDQUdwQzs7TUFFQSxNQUFNSSxVQUFVLEdBQUcsQ0FBQ0MsQ0FBRCxFQUFJcEQsT0FBSixFQUFhQyxPQUFiLEtBQXlCO1FBQ3hDLE1BQU0rQyxJQUFJLEdBQUdJLENBQUMsQ0FBQ0MsTUFBRixDQUFTQyxZQUFULENBQXNCLFNBQXRCLENBQWI7UUFDQUMsT0FBTyxDQUFDQyxHQUFSLENBQVlSLElBQVo7O1FBQ0EsSUFBSUEsSUFBSSxJQUFJLFdBQVIsSUFBdUJoRCxPQUFPLENBQUN5RCxJQUFSLElBQWdCLENBQTNDLEVBQThDO1VBQzFDTCxDQUFDLENBQUNDLE1BQUYsQ0FBU3RDLFNBQVQsQ0FBbUJDLEdBQW5CLENBQXVCLEtBQXZCO1VBQ0EsTUFBTTBDLE1BQU0sR0FBR04sQ0FBQyxDQUFDQyxNQUFGLENBQVNDLFlBQVQsQ0FBc0IsU0FBdEIsSUFBbUNGLENBQUMsQ0FBQ0MsTUFBRixDQUFTQyxZQUFULENBQXNCLFVBQXRCLENBQWxELENBRjBDLENBRzFDOztVQUNBbkQsU0FBUyxDQUFDd0QsSUFBVixDQUFlRCxNQUFmO1VBQ0EzRCxxREFBUyxDQUFDQyxPQUFELEVBQVNDLE9BQVQsRUFBaUJDLFFBQWpCLEVBQTBCQyxTQUExQixDQUFULENBTDBDLENBTTFDOztVQUNBdUIsOERBQWtCLENBQUN4QixRQUFELENBQWxCOztVQUNBLElBQUlOLCtEQUFrQixDQUFDSSxPQUFELEVBQVVDLE9BQVYsRUFBa0JDLFFBQWxCLENBQXRCLEVBQW1EO1lBQy9DLE9BQU8sSUFBUDtVQUNILENBRkQsTUFFTztZQUNIRixPQUFPLENBQUN5RCxJQUFSLEdBQWUsQ0FBZjtZQUNBeEQsT0FBTyxDQUFDd0QsSUFBUixHQUFlLENBQWY7WUFDQSxPQUFPLEtBQVA7VUFDSDtRQUNKLENBZkQsTUFlTyxJQUFJVCxJQUFJLElBQUksV0FBUixJQUF1Qi9DLE9BQU8sQ0FBQ3dELElBQVIsSUFBZ0IsQ0FBM0MsRUFBOEM7VUFDakRMLENBQUMsQ0FBQ0MsTUFBRixDQUFTdEMsU0FBVCxDQUFtQkMsR0FBbkIsQ0FBdUIsS0FBdkI7VUFDQSxNQUFNMEMsTUFBTSxHQUFHTixDQUFDLENBQUNDLE1BQUYsQ0FBU0MsWUFBVCxDQUFzQixTQUF0QixJQUFtQ0YsQ0FBQyxDQUFDQyxNQUFGLENBQVNDLFlBQVQsQ0FBc0IsVUFBdEIsQ0FBbEQ7VUFDQUMsT0FBTyxDQUFDQyxHQUFSLENBQVlFLE1BQVo7VUFDQXZELFNBQVMsQ0FBQ3dELElBQVYsQ0FBZUQsTUFBZjtVQUNBM0QscURBQVMsQ0FBQ0MsT0FBRCxFQUFVQyxPQUFWLEVBQWtCQyxRQUFsQixFQUEyQkMsU0FBM0IsQ0FBVDtVQUNBdUIsOERBQWtCLENBQUN4QixRQUFELENBQWxCOztVQUNBLElBQUlOLCtEQUFrQixDQUFDSSxPQUFELEVBQVVDLE9BQVYsRUFBa0JDLFFBQWxCLENBQXRCLEVBQW1EO1lBQy9DLE9BQU8sSUFBUDtVQUNILENBRkQsTUFFTztZQUNIRixPQUFPLENBQUN5RCxJQUFSLEdBQWUsQ0FBZjtZQUNBeEQsT0FBTyxDQUFDd0QsSUFBUixHQUFlLENBQWY7WUFDQSxPQUFPLEtBQVA7VUFDSDtRQUNKO01BQ0osQ0FqQ0Q7O01BbUNBVCxJQUFJLENBQUNZLE9BQUwsR0FBZSxVQUFVUixDQUFWLEVBQWE7UUFDeEIsSUFBSXBELE9BQU8sQ0FBQ3lELElBQVIsSUFBZ0IsQ0FBcEIsRUFBdUI7VUFDbkI7VUFDQSxJQUFJTixVQUFVLENBQUNDLENBQUQsRUFBSXBELE9BQUosRUFBYUMsT0FBYixDQUFkLEVBQXFDO1lBQ2pDd0MsZ0JBQWdCLENBQUNvQixXQUFqQixhQUFrQzVELE9BQU8sQ0FBQzZELElBQTFDO1lBQ0E5RCxPQUFPLENBQUN5RCxJQUFSO1lBQ0F4RCxPQUFPLENBQUN3RCxJQUFSO1lBQ0F2Qix5RUFBbUIsQ0FBQ2xDLE9BQUQsRUFBU0MsT0FBVCxDQUFuQjtVQUNIO1FBQ0osQ0FSRCxNQVFPLElBQUlBLE9BQU8sQ0FBQ3dELElBQVIsSUFBZ0IsQ0FBcEIsRUFBdUI7VUFDMUI7VUFDQSxJQUFJTixVQUFVLENBQUNDLENBQUQsRUFBSXBELE9BQUosRUFBYUMsT0FBYixDQUFkLEVBQXFDO1lBQ2pDd0MsZ0JBQWdCLENBQUNvQixXQUFqQixhQUFrQzdELE9BQU8sQ0FBQzhELElBQTFDO1lBQ0E3RCxPQUFPLENBQUN3RCxJQUFSO1lBQ0F6RCxPQUFPLENBQUN5RCxJQUFSO1lBQ0F2Qix5RUFBbUIsQ0FBQ2xDLE9BQUQsRUFBU0MsT0FBVCxDQUFuQjtVQUNIO1FBQ0o7TUFDSixDQWxCRDs7TUFvQkEsSUFBSTZDLFVBQVUsQ0FBQ2lCLEVBQVgsSUFBaUIsaUJBQXJCLEVBQXdDO1FBQ3BDeEIsY0FBYyxDQUFDckIsV0FBZixDQUEyQjhCLElBQTNCO01BQ0gsQ0FGRCxNQUVPLElBQUlGLFVBQVUsQ0FBQ2lCLEVBQVgsSUFBaUIsaUJBQXJCLEVBQXdDO1FBQzNDdkIsY0FBYyxDQUFDdEIsV0FBZixDQUEyQjhCLElBQTNCO01BQ0g7SUFDSjs7SUFDRFgsZUFBZSxDQUFDMkIsTUFBaEI7SUFDQTFCLGVBQWUsQ0FBQzBCLE1BQWhCO0VBQ0gsQ0FyRUQ7QUFzRUgsQ0F0RkQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xPLE1BQU1DLE1BQU4sQ0FBYTtFQUNoQkMsV0FBVyxDQUFDSixJQUFELEVBQU87SUFBQSw4QkFHWCxDQUhXOztJQUNkLEtBQUtBLElBQUwsR0FBWUEsSUFBWjtFQUNIOztBQUhlOzs7Ozs7Ozs7Ozs7Ozs7O0FDQXBCO0FBQ0E7O0FBRUEsTUFBTUssbUJBQW1CLEdBQUcsQ0FBQ25FLE9BQUQsRUFBVUMsT0FBVixFQUFtQm1FLGNBQW5CLEVBQW1DaEMsYUFBbkMsRUFBa0RsQyxRQUFsRCxLQUErRDtFQUN2RixNQUFNdUMsZ0JBQWdCLEdBQUcvQixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBekI7RUFDQSxNQUFNMEQsYUFBYSxHQUFHM0QsUUFBUSxDQUFDQyxhQUFULENBQXVCLGdCQUF2QixDQUF0QjtFQUNBLE1BQU0yRCxhQUFhLEdBQUc1RCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQXRCO0VBRUEwRCxhQUFhLENBQUNSLFdBQWQsYUFBK0I3RCxPQUFPLENBQUM4RCxJQUF2QztFQUNBUSxhQUFhLENBQUNULFdBQWQsYUFBK0I1RCxPQUFPLENBQUM2RCxJQUF2Qzs7RUFFQSxJQUFJTSxjQUFjLElBQUksU0FBdEIsRUFBaUM7SUFDN0JwRSxPQUFPLENBQUN5RCxJQUFSO0lBQ0FoQixnQkFBZ0IsQ0FBQ29CLFdBQWpCLGFBQWtDN0QsT0FBTyxDQUFDOEQsSUFBMUM7SUFDQTVCLHlFQUFtQixDQUFDbEMsT0FBRCxFQUFTQyxPQUFULENBQW5CO0VBQ0gsQ0FKRCxNQUlPLElBQUltRSxjQUFjLElBQUksU0FBdEIsRUFBaUM7SUFDcENuRSxPQUFPLENBQUN3RCxJQUFSO0lBQ0FoQixnQkFBZ0IsQ0FBQ29CLFdBQWpCLGFBQWtDNUQsT0FBTyxDQUFDNkQsSUFBMUM7SUFDQTVCLHlFQUFtQixDQUFDbEMsT0FBRCxFQUFTQyxPQUFULENBQW5CO0VBQ0g7O0VBQ0RrQyxnRUFBYSxDQUFDQyxhQUFELEVBQWdCcEMsT0FBaEIsRUFBeUJDLE9BQXpCLEVBQWtDQyxRQUFsQyxDQUFiO0FBQ0gsQ0FsQkQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQSxNQUFNTixrQkFBa0IsR0FBRyxDQUFDSSxPQUFELEVBQVVDLE9BQVYsRUFBbUJDLFFBQW5CLEtBQWdDO0VBQ3ZEcUQsT0FBTyxDQUFDQyxHQUFSLENBQVl0RCxRQUFaO0VBQ0EsTUFBTXFFLFlBQVksR0FBRzdELFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixlQUF2QixDQUFyQjtFQUNBLE1BQU02RCxZQUFZLEdBQUc5RCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBckI7RUFDQSxNQUFNOEQsZ0JBQWdCLEdBQUcvRCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBekI7RUFDQSxJQUFJK0QscUJBQXFCLEdBQUd4RSxRQUFRLENBQUNvQixNQUFULENBQWlCRixJQUFELElBQVVBLElBQUksQ0FBQzZDLE1BQUwsSUFBZSxXQUFmLElBQThCN0MsSUFBSSxDQUFDQyxRQUFMLENBQWNzRCxNQUFkLEtBQXlCdkQsSUFBSSxDQUFDSyxJQUFMLENBQVVrRCxNQUEzRixDQUE1QjtFQUNBLElBQUlDLHFCQUFxQixHQUFHMUUsUUFBUSxDQUFDb0IsTUFBVCxDQUFpQkYsSUFBRCxJQUFVQSxJQUFJLENBQUM2QyxNQUFMLElBQWUsV0FBZixJQUE4QjdDLElBQUksQ0FBQ0MsUUFBTCxDQUFjc0QsTUFBZCxLQUF5QnZELElBQUksQ0FBQ0ssSUFBTCxDQUFVa0QsTUFBM0YsQ0FBNUI7RUFDQSxJQUFJRSxxQkFBcUIsR0FBRzNFLFFBQVEsQ0FBQ29CLE1BQVQsQ0FBaUJGLElBQUQsSUFBVUEsSUFBSSxDQUFDNkMsTUFBTCxJQUFlLFdBQWYsSUFBOEI3QyxJQUFJLENBQUNDLFFBQUwsQ0FBY3NELE1BQWQsSUFBd0J2RCxJQUFJLENBQUNLLElBQUwsQ0FBVWtELE1BQTFGLENBQTVCO0VBQ0EsSUFBSUcscUJBQXFCLEdBQUc1RSxRQUFRLENBQUNvQixNQUFULENBQWlCRixJQUFELElBQVVBLElBQUksQ0FBQzZDLE1BQUwsSUFBZSxXQUFmLElBQThCN0MsSUFBSSxDQUFDQyxRQUFMLENBQWNzRCxNQUFkLElBQXdCdkQsSUFBSSxDQUFDSyxJQUFMLENBQVVrRCxNQUExRixDQUE1Qjs7RUFDQSxJQUFJRCxxQkFBcUIsQ0FBQ0MsTUFBdEIsSUFBZ0MsQ0FBcEMsRUFBdUM7SUFDbkNGLGdCQUFnQixDQUFDWixXQUFqQixhQUFrQzdELE9BQU8sQ0FBQzhELElBQTFDO0lBQ0FTLFlBQVksQ0FBQ1YsV0FBYixhQUE4QjdELE9BQU8sQ0FBQzhELElBQXRDLHFCQUFxRGUscUJBQXFCLENBQUNGLE1BQTNFLGdDQUF1R0QscUJBQXFCLENBQUNDLE1BQTdIO0lBQ0EsT0FBTyxLQUFQO0VBQ0gsQ0FKRCxNQUlPLElBQUlDLHFCQUFxQixDQUFDRCxNQUF0QixJQUFnQyxDQUFwQyxFQUF1QztJQUMxQ0YsZ0JBQWdCLENBQUNaLFdBQWpCLGFBQWtDNUQsT0FBTyxDQUFDNkQsSUFBMUM7SUFDQVUsWUFBWSxDQUFDWCxXQUFiLGFBQThCNUQsT0FBTyxDQUFDNkQsSUFBdEMscUJBQXFEZ0IscUJBQXFCLENBQUNILE1BQTNFLCtCQUFzR0MscUJBQXFCLENBQUNELE1BQTVIO0lBQ0EsT0FBTyxLQUFQO0VBQ0g7O0VBQ0RKLFlBQVksQ0FBQ1YsV0FBYixhQUE4QjdELE9BQU8sQ0FBQzhELElBQXRDLHFCQUFxRGUscUJBQXFCLENBQUNGLE1BQTNFLDBCQUFpR0QscUJBQXFCLENBQUNDLE1BQXZIO0VBQ0FILFlBQVksQ0FBQ1gsV0FBYixhQUE4QjVELE9BQU8sQ0FBQzZELElBQXRDLHFCQUFxRGdCLHFCQUFxQixDQUFDSCxNQUEzRSwwQkFBaUdDLHFCQUFxQixDQUFDRCxNQUF2SDtFQUNBLE9BQU8sSUFBUDtBQUNILENBckJEOzs7Ozs7Ozs7Ozs7Ozs7O0FDSEEsSUFBSUksYUFBYSxHQUFHLEVBQXBCO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLEVBQXBCOztBQUVBLE1BQU01RCxJQUFJLEdBQUcsQ0FBQ3VELE1BQUQsRUFBU00sTUFBVCxFQUFpQmhCLE1BQWpCLEVBQXlCN0IsYUFBekIsS0FBMkM7RUFDcEQsTUFBTThDLFNBQVMsR0FBRyxNQUFNUCxNQUF4Qjs7RUFDQSxJQUFJdEQsUUFBUSxHQUFHLEVBQWY7RUFDQSxJQUFJSSxJQUFJLEdBQUcsRUFBWDs7RUFFQSxNQUFNSSxPQUFPLEdBQUlvQyxNQUFELElBQVk7SUFDeEIsSUFBSWtCLFVBQVUsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQmxELGFBQWhCLEdBQWdDLENBQTNDLENBQWpCO0lBQ0EsSUFBSW1ELGVBQWUsR0FBR0gsSUFBSSxDQUFDSSxJQUFMLENBQVVwRCxhQUFWLENBQXRCO0lBQ0FtQixPQUFPLENBQUNDLEdBQVIsQ0FBWTJCLFVBQVosRUFBd0JSLE1BQXhCLEVBQWdDVixNQUFoQzs7SUFFQSxJQUFJZ0IsTUFBTSxLQUFLLFdBQWYsRUFBNEI7TUFDeEI7TUFFQSxNQUFNUSw0QkFBNEIsR0FBSUMsR0FBRCxJQUFTO1FBQzFDLEtBQUssSUFBSTNDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUc0QixNQUFwQixFQUE0QjVCLENBQUMsRUFBN0IsRUFBaUM7VUFDN0IsSUFBSTRDLE9BQU8sR0FBR0QsR0FBRyxHQUFHM0MsQ0FBcEI7O1VBQ0EsSUFBSWtCLE1BQU0sSUFBSSxXQUFWLElBQXlCYyxhQUFhLENBQUN2RCxRQUFkLENBQXVCbUUsT0FBdkIsQ0FBN0IsRUFBOEQ7WUFDMUQsT0FBTyxJQUFQO1VBQ0gsQ0FGRCxNQUVPLElBQUkxQixNQUFNLElBQUksV0FBVixJQUF5QmUsYUFBYSxDQUFDeEQsUUFBZCxDQUF1Qm1FLE9BQXZCLENBQTdCLEVBQThEO1lBQ2pFLE9BQU8sSUFBUDtVQUNILENBTjRCLENBTzdCO1VBQ0E7VUFDQTs7UUFDSDtNQUNKLENBWkQ7O01BY0EsTUFBTUMsb0JBQW9CLEdBQUlULFVBQUQsSUFBZ0I7UUFDekMsSUFBSSxDQUFDTSw0QkFBNEIsQ0FBQ04sVUFBRCxDQUFqQyxFQUErQztVQUMzQzVCLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFaOztVQUNBLEtBQUssSUFBSVQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRzRCLE1BQXBCLEVBQTRCNUIsQ0FBQyxFQUE3QixFQUFpQztZQUM3QixJQUFJOEMsUUFBUSxHQUFHVixVQUFVLEdBQUdwQyxDQUE1QjtZQUNBMUIsUUFBUSxDQUFDc0MsSUFBVCxDQUFjTSxNQUFNLEdBQUc0QixRQUF2Qjs7WUFDQSxJQUFJNUIsTUFBTSxJQUFJLFdBQWQsRUFBMkI7Y0FDdkJjLGFBQWEsQ0FBQ3BCLElBQWQsQ0FBbUJrQyxRQUFuQjtZQUNILENBRkQsTUFFTyxJQUFJNUIsTUFBTSxJQUFJLFdBQWQsRUFBMkI7Y0FDOUJlLGFBQWEsQ0FBQ3JCLElBQWQsQ0FBbUJrQyxRQUFuQjtZQUNIO1VBQ0o7UUFDSixDQVhELE1BV087VUFDSHRDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLCtCQUErQjJCLFVBQTNDO1VBQ0F0RCxPQUFPLENBQUNvQyxNQUFELENBQVA7UUFDSDtNQUNKLENBaEJEOztNQWtCQSxNQUFNNkIsaUJBQWlCLEdBQUlYLFVBQUQsSUFBZ0I7UUFDdEMsS0FBSyxJQUFJcEMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRzRCLE1BQXBCLEVBQTRCNUIsQ0FBQyxFQUE3QixFQUFpQztVQUM3QixJQUFJZ0QsT0FBTyxHQUFHWixVQUFVLEdBQUdwQyxDQUEzQjs7VUFDQSxJQUFJZ0QsT0FBTyxHQUFHUixlQUFWLElBQTZCLENBQWpDLEVBQW9DO1lBQ2hDaEMsT0FBTyxDQUFDQyxHQUFSLENBQVl1QyxPQUFaO1lBQ0FaLFVBQVUsR0FBR0EsVUFBVSxJQUFJcEMsQ0FBQyxHQUFHLENBQVIsQ0FBdkI7WUFDQVEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQXFCMkIsVUFBakM7WUFDQVMsb0JBQW9CLENBQUNULFVBQUQsQ0FBcEI7WUFDQSxPQUFPLElBQVA7VUFDSDtRQUNKO01BQ0osQ0FYRDs7TUFZQSxJQUFJLENBQUNXLGlCQUFpQixDQUFDWCxVQUFELENBQXRCLEVBQW9DO1FBQ2hDNUIsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQVo7UUFDQW9DLG9CQUFvQixDQUFDVCxVQUFELENBQXBCO01BQ0g7SUFDSixDQW5ERCxNQW1ETyxJQUFJRixNQUFNLEtBQUssVUFBZixFQUEyQjtNQUM5QixNQUFNZSwwQkFBMEIsR0FBSU4sR0FBRCxJQUFTO1FBQ3hDLEtBQUssSUFBSTNDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUc0QixNQUFwQixFQUE0QjVCLENBQUMsRUFBN0IsRUFBaUM7VUFDN0IsSUFBSTRDLE9BQU8sR0FBR1IsVUFBVSxHQUFHcEMsQ0FBQyxHQUFHd0MsZUFBL0I7O1VBQ0EsSUFBSXRCLE1BQU0sSUFBSSxXQUFWLElBQXlCYyxhQUFhLENBQUN2RCxRQUFkLENBQXVCbUUsT0FBdkIsQ0FBN0IsRUFBOEQ7WUFDMUQsT0FBTyxJQUFQO1VBQ0gsQ0FGRCxNQUVPLElBQUkxQixNQUFNLElBQUksV0FBVixJQUF5QmUsYUFBYSxDQUFDeEQsUUFBZCxDQUF1Qm1FLE9BQXZCLENBQTdCLEVBQThEO1lBQ2pFLE9BQU8sSUFBUDtVQUNILENBTjRCLENBTzdCO1VBQ0E7VUFDQTs7UUFDSDtNQUNKLENBWkQ7O01BY0EsTUFBTU0sZ0JBQWdCLEdBQUlkLFVBQUQsSUFBZ0I7UUFDckMsS0FBSyxJQUFJcEMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRzRCLE1BQXBCLEVBQTRCNUIsQ0FBQyxFQUE3QixFQUFpQztVQUM3QixJQUFJNEMsT0FBTyxHQUFHUixVQUFVLEdBQUdwQyxDQUFDLEdBQUd3QyxlQUEvQjs7VUFDQSxJQUFJSSxPQUFPLEdBQUd2RCxhQUFkLEVBQTZCO1lBQ3pCK0MsVUFBVSxHQUFHQSxVQUFVLEdBQUcsQ0FBQ1IsTUFBTSxHQUFHNUIsQ0FBVixJQUFld0MsZUFBekM7WUFDQVcsbUJBQW1CLENBQUNmLFVBQUQsQ0FBbkI7WUFDQTVCLE9BQU8sQ0FBQ0MsR0FBUixDQUFZMkIsVUFBVSxHQUFHLGdCQUF6QjtZQUNBLE9BQU8sSUFBUDtVQUNIO1FBQ0o7TUFDSixDQVZEOztNQVlBLE1BQU1lLG1CQUFtQixHQUFJZixVQUFELElBQWdCO1FBQ3hDLElBQUksQ0FBQ2EsMEJBQTBCLENBQUNiLFVBQUQsQ0FBL0IsRUFBNkM7VUFDekMsS0FBSyxJQUFJcEMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRzRCLE1BQXBCLEVBQTRCNUIsQ0FBQyxFQUE3QixFQUFpQztZQUM3QjFCLFFBQVEsQ0FBQ3NDLElBQVQsQ0FBY00sTUFBTSxJQUFJa0IsVUFBVSxHQUFHcEMsQ0FBQyxHQUFHd0MsZUFBckIsQ0FBcEI7O1lBQ0EsSUFBSXRCLE1BQU0sSUFBSSxXQUFkLEVBQTJCO2NBQ3ZCYyxhQUFhLENBQUNwQixJQUFkLENBQW1Cd0IsVUFBVSxHQUFHcEMsQ0FBQyxHQUFHd0MsZUFBcEM7WUFDSCxDQUZELE1BRU8sSUFBSXRCLE1BQU0sSUFBSSxXQUFkLEVBQTJCO2NBQzlCZSxhQUFhLENBQUNyQixJQUFkLENBQW1Cd0IsVUFBVSxHQUFHcEMsQ0FBQyxHQUFHd0MsZUFBcEM7WUFDSCxDQU40QixDQU83Qjs7VUFDSDtRQUNKLENBVkQsTUFVTztVQUNIaEMsT0FBTyxDQUFDQyxHQUFSLENBQVksK0JBQStCMkIsVUFBM0M7VUFDQXRELE9BQU8sQ0FBQ29DLE1BQUQsQ0FBUDtRQUNIO01BQ0osQ0FmRDs7TUFpQkEsSUFBSSxDQUFDZ0MsZ0JBQWdCLENBQUNkLFVBQUQsQ0FBckIsRUFBbUM7UUFDL0I1QixPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBWjtRQUNBMEMsbUJBQW1CLENBQUNmLFVBQUQsQ0FBbkI7TUFDSDtJQUNKO0VBQ0osQ0F6R0Q7O0VBMEdBdEQsT0FBTyxDQUFDb0MsTUFBRCxDQUFQO0VBQ0EsT0FBTztJQUFFaUIsU0FBRjtJQUFhN0QsUUFBYjtJQUF1QkksSUFBdkI7SUFBNkJ3QztFQUE3QixDQUFQO0FBQ0gsQ0FqSEQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQSxNQUFNL0IsbUJBQW1CLEdBQUcsQ0FBQ2xDLE9BQUQsRUFBVUMsT0FBVixLQUFxQjtFQUM3QyxNQUFNa0csZ0JBQWdCLEdBQUd6RixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsaUJBQXZCLENBQXpCO0VBQ0EsTUFBTXlGLGdCQUFnQixHQUFHMUYsUUFBUSxDQUFDQyxhQUFULENBQXVCLGlCQUF2QixDQUF6Qjs7RUFDQSxJQUFJWCxPQUFPLENBQUN5RCxJQUFSLElBQWdCLENBQXBCLEVBQXNCO0lBQ2xCMEMsZ0JBQWdCLENBQUN6RCxLQUFqQixDQUF1QjJELGVBQXZCLEdBQXlDLFNBQXpDO0VBQ0gsQ0FGRCxNQUVPLElBQUlyRyxPQUFPLENBQUN5RCxJQUFSLElBQWlCLENBQXJCLEVBQXdCO0lBQzNCMEMsZ0JBQWdCLENBQUN6RCxLQUFqQixDQUF1QjJELGVBQXZCLEdBQXlDLGFBQXpDO0VBQ0g7O0VBQ0QsSUFBSXBHLE9BQU8sQ0FBQ3dELElBQVIsSUFBZ0IsQ0FBcEIsRUFBc0I7SUFDbEIyQyxnQkFBZ0IsQ0FBQzFELEtBQWpCLENBQXVCMkQsZUFBdkIsR0FBeUMsU0FBekM7RUFDSCxDQUZELE1BRU8sSUFBSXBHLE9BQU8sQ0FBQ3dELElBQVIsSUFBZ0IsQ0FBcEIsRUFBdUI7SUFDMUIyQyxnQkFBZ0IsQ0FBQzFELEtBQWpCLENBQXVCMkQsZUFBdkIsR0FBeUMsYUFBekM7RUFDSDtBQUNKLENBYkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDMEc7QUFDakI7QUFDekYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBLCtvQkFBK29CLGNBQWMsZUFBZSxjQUFjLG9CQUFvQixrQkFBa0IsNkJBQTZCLEdBQUcsZ0pBQWdKLG1CQUFtQixHQUFHLFFBQVEsbUJBQW1CLEdBQUcsVUFBVSxxQkFBcUIsR0FBRyxpQkFBaUIsaUJBQWlCLEdBQUcsMkRBQTJELGdCQUFnQixrQkFBa0IsR0FBRyxTQUFTLDhCQUE4QixzQkFBc0IsR0FBRyxPQUFPLHFGQUFxRixNQUFNLGlCQUFpQixVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxNQUFNLFlBQVksT0FBTyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLEtBQUssTUFBTSxVQUFVLFVBQVUsS0FBSyxLQUFLLFlBQVksYUFBYSwrbkJBQStuQixjQUFjLGVBQWUsY0FBYyxvQkFBb0Isa0JBQWtCLDZCQUE2QixHQUFHLGdKQUFnSixtQkFBbUIsR0FBRyxRQUFRLG1CQUFtQixHQUFHLFVBQVUscUJBQXFCLEdBQUcsaUJBQWlCLGlCQUFpQixHQUFHLDJEQUEyRCxnQkFBZ0Isa0JBQWtCLEdBQUcsU0FBUyw4QkFBOEIsc0JBQXNCLEdBQUcsbUJBQW1CO0FBQzlxRjtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUHZDO0FBQzBHO0FBQ2pCO0FBQ3pGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQSxnREFBZ0QsNkNBQTZDLHlDQUF5QyxHQUFHLHVDQUF1QyxnQ0FBZ0Msa0JBQWtCLG1CQUFtQixnQkFBZ0IsOEJBQThCLHNCQUFzQixvQkFBb0IsNEJBQTRCLEdBQUcsaURBQWlELGdDQUFnQyxHQUFHLGlEQUFpRCxnQ0FBZ0MsR0FBRyx5Q0FBeUMsbUJBQW1CLG1CQUFtQixvQkFBb0IsMEJBQTBCLHVCQUF1QixvQkFBb0IsNkNBQTZDLDBDQUEwQyxLQUFLLFFBQVEsdUJBQXVCLHlDQUF5QywwQkFBMEIsb0JBQW9CLGtDQUFrQyxTQUFTLG1DQUFtQyx3QkFBd0Isc0JBQXNCLG1CQUFtQixzQkFBc0Isb0NBQW9DLFNBQVMsY0FBYyxrQkFBa0IsbUNBQW1DLGtDQUFrQyxHQUFHLG1CQUFtQixzQkFBc0IsZ0NBQWdDLGlCQUFpQixrQkFBa0Isb0JBQW9CLGFBQWEsY0FBYyxvQkFBb0IsOEJBQThCLDBCQUEwQiwyQ0FBMkMsR0FBRyx1QkFBdUIsc0JBQXNCLGdDQUFnQyxpQkFBaUIsa0JBQWtCLG9CQUFvQixhQUFhLGNBQWMsaUJBQWlCLG9CQUFvQiw2QkFBNkIsOEJBQThCLDBCQUEwQixtREFBbUQsMkNBQTJDLEdBQUcsNkJBQTZCLCtDQUErQyxpQkFBaUIsR0FBRyxxQ0FBcUMsbURBQW1ELGlCQUFpQixHQUFHLHlCQUF5QixtREFBbUQsR0FBRyxxQkFBcUIsb0JBQW9CLDZCQUE2Qiw4QkFBOEIsMEJBQTBCLG1CQUFtQiwwQkFBMEIsbUNBQW1DLHFDQUFxQyxHQUFHLGdCQUFnQixvQ0FBb0Msc0JBQXNCLHVCQUF1QixxQ0FBcUMsZUFBZSxpQ0FBaUMsb0NBQW9DLHdCQUF3QixtQkFBbUIsR0FBRyxZQUFZLHlCQUF5Qix5QkFBeUIsZ0NBQWdDLDBCQUEwQiwrQ0FBK0Msb0JBQW9CLDZCQUE2QiwwQkFBMEIsb0JBQW9CLG1CQUFtQixpQkFBaUIsR0FBRyxpREFBaUQsaUJBQWlCLG1CQUFtQixxQ0FBcUMsbUJBQW1CLHFDQUFxQywwQkFBMEIseUJBQXlCLG9DQUFvQyxzQkFBc0IsR0FBRyw4REFBOEQsb0JBQW9CLEdBQUcsT0FBTywwQkFBMEIsb0NBQW9DLHNCQUFzQixHQUFHLFdBQVcsbUJBQW1CLG1CQUFtQixnQ0FBZ0MsOENBQThDLHNCQUFzQixtQkFBbUIsR0FBRyxVQUFVLG9DQUFvQyx3QkFBd0IsR0FBRyxRQUFRLGtCQUFrQixHQUFHLFNBQVMsZ0NBQWdDLG9CQUFvQixrQ0FBa0MscUNBQXFDLDBCQUEwQixvQkFBb0Isa0JBQWtCLEdBQUcsT0FBTyxnRkFBZ0YsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksTUFBTSxLQUFLLFlBQVksUUFBUSxLQUFLLFlBQVksU0FBUyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksY0FBYyxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLEtBQUssS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksZUFBZSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLCtCQUErQiw2Q0FBNkMseUNBQXlDLEdBQUcsdUNBQXVDLGdDQUFnQyxrQkFBa0IsbUJBQW1CLGdCQUFnQiw4QkFBOEIsc0JBQXNCLG9CQUFvQiw0QkFBNEIsR0FBRyxpREFBaUQsZ0NBQWdDLEdBQUcsaURBQWlELGdDQUFnQyxHQUFHLHlDQUF5QyxtQkFBbUIsbUJBQW1CLG9CQUFvQiwwQkFBMEIsdUJBQXVCLG9CQUFvQiw2Q0FBNkMsMENBQTBDLEtBQUssUUFBUSx1QkFBdUIseUNBQXlDLDBCQUEwQixvQkFBb0Isa0NBQWtDLFNBQVMsbUNBQW1DLHdCQUF3QixzQkFBc0IsbUJBQW1CLHNCQUFzQixvQ0FBb0MsU0FBUyxjQUFjLGtCQUFrQixtQ0FBbUMsa0NBQWtDLEdBQUcsbUJBQW1CLHNCQUFzQixnQ0FBZ0MsaUJBQWlCLGtCQUFrQixvQkFBb0IsYUFBYSxjQUFjLG9CQUFvQiw4QkFBOEIsMEJBQTBCLDJDQUEyQyxHQUFHLHVCQUF1QixzQkFBc0IsZ0NBQWdDLGlCQUFpQixrQkFBa0Isb0JBQW9CLGFBQWEsY0FBYyxpQkFBaUIsb0JBQW9CLDZCQUE2Qiw4QkFBOEIsMEJBQTBCLG1EQUFtRCwyQ0FBMkMsR0FBRyw2QkFBNkIsK0NBQStDLGlCQUFpQixHQUFHLHFDQUFxQyxtREFBbUQsaUJBQWlCLEdBQUcseUJBQXlCLG1EQUFtRCxHQUFHLHFCQUFxQixvQkFBb0IsNkJBQTZCLDhCQUE4QiwwQkFBMEIsbUJBQW1CLDBCQUEwQixtQ0FBbUMscUNBQXFDLEdBQUcsZ0JBQWdCLG9DQUFvQyxzQkFBc0IsdUJBQXVCLHFDQUFxQyxlQUFlLGlDQUFpQyxvQ0FBb0Msd0JBQXdCLG1CQUFtQixHQUFHLFlBQVkseUJBQXlCLHlCQUF5QixnQ0FBZ0MsMEJBQTBCLCtDQUErQyxvQkFBb0IsNkJBQTZCLDBCQUEwQixvQkFBb0IsbUJBQW1CLGlCQUFpQixHQUFHLGlEQUFpRCxpQkFBaUIsbUJBQW1CLHFDQUFxQyxtQkFBbUIscUNBQXFDLDBCQUEwQix5QkFBeUIsb0NBQW9DLHNCQUFzQixHQUFHLDhEQUE4RCxvQkFBb0IsR0FBRyxPQUFPLDBCQUEwQixvQ0FBb0Msc0JBQXNCLEdBQUcsV0FBVyxtQkFBbUIsbUJBQW1CLGdDQUFnQyw4Q0FBOEMsc0JBQXNCLG1CQUFtQixHQUFHLFVBQVUsb0NBQW9DLHdCQUF3QixHQUFHLFFBQVEsa0JBQWtCLEdBQUcsU0FBUyxnQ0FBZ0Msb0JBQW9CLGtDQUFrQyxxQ0FBcUMsMEJBQTBCLG9CQUFvQixrQkFBa0IsR0FBRyxtQkFBbUI7QUFDbjFTO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7O0FDUDFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscURBQXFEO0FBQ3JEOztBQUVBO0FBQ0EsZ0RBQWdEO0FBQ2hEOztBQUVBO0FBQ0EscUZBQXFGO0FBQ3JGOztBQUVBOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0EsS0FBSztBQUNMLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixxQkFBcUI7QUFDMUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsaURBQWlELHFCQUFxQjtBQUN0RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNEQUFzRCxxQkFBcUI7QUFDM0U7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDckdhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQkEsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBc0c7QUFDdEc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyx5RkFBTzs7OztBQUlnRDtBQUN4RSxPQUFPLGlFQUFlLHlGQUFPLElBQUksZ0dBQWMsR0FBRyxnR0FBYyxZQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekI3RSxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFtRztBQUNuRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHNGQUFPOzs7O0FBSTZDO0FBQ3JFLE9BQU8saUVBQWUsc0ZBQU8sSUFBSSw2RkFBYyxHQUFHLDZGQUFjLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUJBQXFCLDZCQUE2QjtBQUNsRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN2R2E7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDdENhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDVmE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJOztBQUVqRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1hhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDtBQUNsRDs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQzs7QUFFQTs7QUFFQTtBQUNBLGlGQUFpRjtBQUNqRjs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ2ZhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FB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QUF4QyxDQUE1QjtNQUNBbEMsUUFBUSxDQUFDeUQsSUFBVCxDQUFjMEYsZUFBZCxFQUErQkMsZUFBL0I7SUFDSDtFQUNKLENBUEQ7O0VBUUEsTUFBTUMsa0JBQWtCLEdBQUcsQ0FBQ2IsU0FBRCxFQUFZQyxTQUFaLEtBQTBCO0lBQ2pELEtBQUssSUFBSTVGLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdpRyxhQUFwQixFQUFtQ2pHLENBQUMsRUFBcEMsRUFBd0M7TUFDcEMsSUFBSXFHLFlBQVksR0FBR0YsZ0JBQWdCLENBQUNSLFNBQUQsRUFBWUMsU0FBWixDQUFuQztNQUNBLE1BQU1hLGlCQUFpQixHQUFHcEksaUVBQUksQ0FBQ2dJLFlBQUQsRUFBZSxXQUFmLEVBQTRCLFdBQTVCLEVBQXlDaEgsYUFBekMsQ0FBOUI7TUFDQSxNQUFNcUgsaUJBQWlCLEdBQUdySSxpRUFBSSxDQUFDZ0ksWUFBRCxFQUFlLFdBQWYsRUFBNEIsV0FBNUIsRUFBeUNoSCxhQUF6QyxDQUE5QjtNQUNBbEMsUUFBUSxDQUFDeUQsSUFBVCxDQUFjNkYsaUJBQWQsRUFBaUNDLGlCQUFqQztJQUNIO0VBQ0osQ0FQRDs7RUFXQU4sZ0JBQWdCLENBQUNULFNBQUQsRUFBWUMsU0FBWixDQUFoQjtFQUNBWSxrQkFBa0IsQ0FBQ2IsU0FBRCxFQUFZQyxTQUFaLENBQWxCO0VBQ0EvSSw4RUFBa0IsQ0FBQ0ksT0FBRCxFQUFVQyxPQUFWLEVBQW1CQyxRQUFuQixDQUFsQjtFQUNBaUUsZ0ZBQW1CLENBQUNuRSxPQUFELEVBQVVDLE9BQVYsRUFBbUJtRSxjQUFuQixFQUFtQ2hDLGFBQW5DLEVBQWtEbEMsUUFBbEQsQ0FBbkIsQ0F2Q3VFLENBd0N2RTtFQUNBO0FBQ0gsQ0ExQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0Fzc2V0cy9tb2R1bGVzL2NoZWNrSGl0cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0Fzc2V0cy9tb2R1bGVzL2dhbWVCb2FyZEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9Bc3NldHMvbW9kdWxlcy9wbGF5ZXJGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQXNzZXRzL21vZHVsZXMvcGxheWVyVHVybnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9Bc3NldHMvbW9kdWxlcy9zY29yZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQXNzZXRzL21vZHVsZXMvc2hpcGZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9Bc3NldHMvbW9kdWxlcy90aWxlQmFja2dyb3VuZENvbG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY3NzUmVzZXQuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2Nzc1Jlc2V0LmNzcz8yYzMzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3ZhbmlsbGEtdGlsdC9saWIvdmFuaWxsYS10aWx0LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2VuZXJhdGVTY29yZUJvYXJkIH0gZnJvbSBcIi4vc2NvcmVCb2FyZFwiO1xuaW1wb3J0IGV4cGxvc2lvbkljb24gZnJvbSBcIi4uLy4uL0Fzc2V0cy9leHBsb3Npb24ucG5nXCI7XG5pbXBvcnQgc2lua0ljb24gZnJvbSBcIi4uLy4uL0Fzc2V0cy9zaW5raW5nLnBuZ1wiO1xuXG5jb25zdCBjaGVja0hpdHMgPSAocGxheWVyMSwgcGxheWVyMiwgYWxsU2hpcHMsIHRvdGFsSGl0cykgPT4ge1xuXG4gICAgY29uc3QgYWRkSEl0SWNvbiA9IChoaXQpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YWlkID0gaGl0LnN1YnN0cigwLCA5KTtcbiAgICAgICAgY29uc3QgZGF0YWtleSA9IGhpdC5zdWJzdHIoOSwgMTIpO1xuICAgICAgICBjb25zdCBoaXRUaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEta2V5PVwiJHtkYXRha2V5fVwiXVtkYXRhLWlkPVwiJHtkYXRhaWR9XCJdYCk7XG4gICAgICAgIGlmICghaGl0VGlsZS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGhpdEltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgIGhpdEltYWdlLmNsYXNzTGlzdC5hZGQoXCJoaXRJbWFnZVwiKTtcbiAgICAgICAgICAgIGhpdEltYWdlLnNyYyA9IGV4cGxvc2lvbkljb247XG4gICAgICAgICAgICBoaXRUaWxlLmFwcGVuZENoaWxkKGhpdEltYWdlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy9jb25zb2xlLmxvZyh0b3RhbEhpdHMpO1xuXG4gICAgYWxsU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBsZXQgaGl0ID0gc2hpcC5wb3NpdGlvbi5maWx0ZXIoKHBvc2l0aW9uTnVtKSA9PiB0b3RhbEhpdHMuaW5jbHVkZXMocG9zaXRpb25OdW0pKTtcbiAgICAgICAgc2hpcC5oaXRzID0gWy4uLmhpdF07XG4gICAgICAgIGhpdC5mb3JFYWNoKChoaXQpID0+IHtcbiAgICAgICAgICAgIGFkZEhJdEljb24oaGl0KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZ2VuZXJhdGVTY29yZUJvYXJkKHBsYXllcjEsIHBsYXllcjIsIGFsbFNoaXBzKTtcblxuXG59O1xuXG5jb25zdCBjaGVja1NoaXBEZXN0cm95ZWQgPSAoYWxsU2hpcHMpID0+IHtcblxuICAgIGNvbnN0IGRlc3Ryb3lTaGlwID0gKHNoaXApID0+IHtcbiAgICAgICAgc2hpcC5wb3NpdGlvbi5mb3JFYWNoKChudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFpZCA9IG51bWJlci5zdWJzdHIoMCwgOSk7XG4gICAgICAgICAgICBjb25zdCBkYXRha2V5ID0gbnVtYmVyLnN1YnN0cig5LCAxMik7XG4gICAgICAgICAgICBjb25zdCBzaGlwUG9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEta2V5PVwiJHtkYXRha2V5fVwiXVtkYXRhLWlkPVwiJHtkYXRhaWR9XCJdYCk7XG4gICAgICAgICAgICBzaGlwUG9zLmZpcnN0Q2hpbGQuc3JjID0gc2lua0ljb247XG5cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuICAgIGFsbFNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgbGV0IGNoZWNrRm9yRGVzdHJveWVkID0gc2hpcC5wb3NpdGlvbi5ldmVyeSgocG9zKSA9PiBzaGlwLmhpdHMuaW5jbHVkZXMocG9zKSk7XG4gICAgICAgIGlmIChjaGVja0ZvckRlc3Ryb3llZCkge1xuICAgICAgICAgICAgZGVzdHJveVNoaXAoc2hpcCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9jb25zb2xlLmxvZyhjaGVja0ZvckRlc3Ryb3llZClcbiAgICAgICAgLy9jb25zb2xlLmxvZyhzaGlwLnBvc2l0aW9uKVxuICAgICAgICAvL2NvbnNvbGUubG9nKHNoaXAuaGl0cylcbiAgICB9KTtcblxuICAgIFxuXG59O1xuXG5leHBvcnR7Y2hlY2tIaXRzLCBjaGVja1NoaXBEZXN0cm95ZWR9IiwiaW1wb3J0IHsgY2hlY2tIaXRzLCBjaGVja1NoaXBEZXN0cm95ZWQgfSBmcm9tIFwiLi9jaGVja0hpdHNcIjtcbmltcG9ydCB7IGdlbmVyYXRlU2NvcmVCb2FyZCB9IGZyb20gXCIuL3Njb3JlQm9hcmRcIjtcbmltcG9ydCB7IHRpbGVCYWNrZ3JvdW5kQ29sb3IgfSBmcm9tIFwiLi90aWxlQmFja2dyb3VuZENvbG9yXCI7XG5cblxuY29uc3QgZ2VuZXJhdGVib2FyZCA9IChnYW1lQm9hcmRTaXplLCBwbGF5ZXIxLCBwbGF5ZXIyLCBhbGxTaGlwcykgPT4ge1xuICAgIGxldCB0b3RhbEhpdHMgPSBbXVxuICAgIGNvbnN0IHBsYXllcjFnYW1lVGlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWVyMUdhbWVUaWxlXCIpO1xuICAgIGNvbnN0IHBsYXllcjJnYW1lVGlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWVyMkdhbWVUaWxlXCIpO1xuICAgIGNvbnN0IGdhbWVDb250YWluZXIxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lQ29udGFpbmVyMVwiKTtcbiAgICBjb25zdCBnYW1lQ29udGFpbmVyMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZUNvbnRhaW5lcjJcIik7XG4gICAgY29uc3QgcGxheWVydHVybkhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWVyVHVyblwiKTtcblxuICAgIGlmIChnYW1lQm9hcmRTaXplID09PSA0MDApIHtcbiAgICAgICAgZ2FtZUNvbnRhaW5lcjEuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IFwicmVwZWF0KDIwLCAxZnIpXCI7XG4gICAgICAgIGdhbWVDb250YWluZXIxLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPSBcInJlcGVhdCgyMSwgMWZyKVwiO1xuICAgICAgICBnYW1lQ29udGFpbmVyMi5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gXCJyZXBlYXQoMjAsIDFmcilcIjtcbiAgICAgICAgZ2FtZUNvbnRhaW5lcjIuc3R5bGUuZ3JpZFRlbXBsYXRlUm93cyA9IFwicmVwZWF0KDIxLCAxZnIpXCI7XG4gICAgfVxuXG4gICAgY29uc3QgcGxheWVyVGlsZXMgPSBbcGxheWVyMWdhbWVUaWxlLCBwbGF5ZXIyZ2FtZVRpbGVdO1xuICAgIHBsYXllclRpbGVzLmZvckVhY2goKHBsYXllclRpbGUpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lQm9hcmRTaXplOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbGUgPSBwbGF5ZXJUaWxlLmNsb25lTm9kZSgpO1xuICAgICAgICAgICAgdGlsZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWtleVwiLCBpICsgMSk7XG4gICAgICAgICAgICAvL3RpbGUuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBwbGF5ZXIxKVxuXG4gICAgICAgICAgICBjb25zdCBhdHRhY2tTaGlwID0gKGUsIHBsYXllcjEsIHBsYXllcjIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aWxlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aWxlKTtcbiAgICAgICAgICAgICAgICBpZiAodGlsZSA9PSBcInBsYXllck9uZVwiICYmIHBsYXllcjEudHVybiA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhpdE51bSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIikgKyBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWtleVwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhoaXROdW0pO1xuICAgICAgICAgICAgICAgICAgICB0b3RhbEhpdHMucHVzaChoaXROdW0pO1xuICAgICAgICAgICAgICAgICAgICBjaGVja0hpdHMocGxheWVyMSxwbGF5ZXIyLGFsbFNoaXBzLHRvdGFsSGl0cyk7XG4gICAgICAgICAgICAgICAgICAgIC8vZ2VuZXJhdGVTY29yZUJvYXJkKHBsYXllcjEscGxheWVyMik7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrU2hpcERlc3Ryb3llZChhbGxTaGlwcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnZW5lcmF0ZVNjb3JlQm9hcmQocGxheWVyMSwgcGxheWVyMixhbGxTaGlwcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyMS50dXJuID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjIudHVybiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRpbGUgPT0gXCJwbGF5ZXJUd29cIiAmJiBwbGF5ZXIyLnR1cm4gPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoaXROdW0gPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpICsgZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1rZXlcIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGhpdE51bSk7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsSGl0cy5wdXNoKGhpdE51bSk7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrSGl0cyhwbGF5ZXIxLCBwbGF5ZXIyLGFsbFNoaXBzLHRvdGFsSGl0cyk7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrU2hpcERlc3Ryb3llZChhbGxTaGlwcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnZW5lcmF0ZVNjb3JlQm9hcmQocGxheWVyMSwgcGxheWVyMixhbGxTaGlwcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyMS50dXJuID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjIudHVybiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aWxlLm9uY2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIxLnR1cm4gPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvL3BsYXllcnR1cm5IZWFkZXIudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIxLm5hbWV9J3MgVHVybmBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dGFja1NoaXAoZSwgcGxheWVyMSwgcGxheWVyMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcnR1cm5IZWFkZXIudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIyLm5hbWV9J3MgVHVybmA7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIxLnR1cm4tLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjIudHVybisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZUJhY2tncm91bmRDb2xvcihwbGF5ZXIxLHBsYXllcjIpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBsYXllcjIudHVybiA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcGxheWVydHVybkhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllcjIubmFtZX0ncyBUdXJuYFxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0YWNrU2hpcChlLCBwbGF5ZXIxLCBwbGF5ZXIyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVydHVybkhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllcjEubmFtZX0ncyBUdXJuYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjIudHVybi0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyMS50dXJuKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlQmFja2dyb3VuZENvbG9yKHBsYXllcjEscGxheWVyMilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChwbGF5ZXJUaWxlLmlkID09IFwicGxheWVyMUdhbWVUaWxlXCIpIHtcbiAgICAgICAgICAgICAgICBnYW1lQ29udGFpbmVyMS5hcHBlbmRDaGlsZCh0aWxlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGxheWVyVGlsZS5pZCA9PSBcInBsYXllcjJHYW1lVGlsZVwiKSB7XG4gICAgICAgICAgICAgICAgZ2FtZUNvbnRhaW5lcjIuYXBwZW5kQ2hpbGQodGlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcGxheWVyMWdhbWVUaWxlLnJlbW92ZSgpO1xuICAgICAgICBwbGF5ZXIyZ2FtZVRpbGUucmVtb3ZlKCk7XG4gICAgfSk7XG59O1xuXG5leHBvcnR7Z2VuZXJhdGVib2FyZH0iLCJleHBvcnQgY2xhc3MgcGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuICAgIHR1cm4gPSAwO1xufVxuXG5cbiIsImltcG9ydCB7IHRpbGVCYWNrZ3JvdW5kQ29sb3IgfSBmcm9tIFwiLi90aWxlQmFja2dyb3VuZENvbG9yXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZUJvYXJkRmFjdG9yeVwiO1xuXG5jb25zdCBnZW5lcmF0ZVBsYXllclR1cm5zID0gKHBsYXllcjEsIHBsYXllcjIsIHN0YXJ0aW5nUGxheWVyLCBnYW1lQm9hcmRTaXplLCBhbGxTaGlwcykgPT4ge1xuICAgIGNvbnN0IHBsYXllcnR1cm5IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllclR1cm5cIik7XG4gICAgY29uc3QgcGxheWVyMUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWVyMUhlYWRlclwiKTtcbiAgICBjb25zdCBwbGF5ZXIySGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXIySGVhZGVyXCIpO1xuXG4gICAgcGxheWVyMUhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllcjEubmFtZX0ncyBib2FyZGA7XG4gICAgcGxheWVyMkhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllcjIubmFtZX0ncyBib2FyZGA7XG5cbiAgICBpZiAoc3RhcnRpbmdQbGF5ZXIgPT0gXCJwbGF5ZXIxXCIpIHtcbiAgICAgICAgcGxheWVyMS50dXJuKys7XG4gICAgICAgIHBsYXllcnR1cm5IZWFkZXIudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIxLm5hbWV9J3MgVHVybmA7XG4gICAgICAgIHRpbGVCYWNrZ3JvdW5kQ29sb3IocGxheWVyMSxwbGF5ZXIyKVxuICAgIH0gZWxzZSBpZiAoc3RhcnRpbmdQbGF5ZXIgPT0gXCJwbGF5ZXIyXCIpIHtcbiAgICAgICAgcGxheWVyMi50dXJuKys7XG4gICAgICAgIHBsYXllcnR1cm5IZWFkZXIudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIyLm5hbWV9J3MgVHVybmA7XG4gICAgICAgIHRpbGVCYWNrZ3JvdW5kQ29sb3IocGxheWVyMSxwbGF5ZXIyKVxuICAgIH1cbiAgICBnZW5lcmF0ZWJvYXJkKGdhbWVCb2FyZFNpemUsIHBsYXllcjEsIHBsYXllcjIsIGFsbFNoaXBzKTtcbn07XG5cbmV4cG9ydCB7Z2VuZXJhdGVQbGF5ZXJUdXJuc30iLCJcblxuXG5jb25zdCBnZW5lcmF0ZVNjb3JlQm9hcmQgPSAocGxheWVyMSwgcGxheWVyMiwgYWxsU2hpcHMpID0+IHtcbiAgICBjb25zb2xlLmxvZyhhbGxTaGlwcylcbiAgICBjb25zdCBwbGF5ZXIxU2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllcjFTY29yZVwiKTtcbiAgICBjb25zdCBwbGF5ZXIyU2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllcjJTY29yZVwiKTtcbiAgICBjb25zdCBwbGF5ZXJUdXJuSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXJUdXJuXCIpO1xuICAgIGxldCByZW1haW5pbmdQbGF5ZXIxU2hpcHMgPSBhbGxTaGlwcy5maWx0ZXIoKHNoaXApID0+IHNoaXAucGxheWVyID09IFwicGxheWVyT25lXCIgJiYgc2hpcC5wb3NpdGlvbi5sZW5ndGggIT09IHNoaXAuaGl0cy5sZW5ndGgpO1xuICAgIGxldCByZW1haW5pbmdQbGF5ZXIyU2hpcHMgPSBhbGxTaGlwcy5maWx0ZXIoKHNoaXApID0+IHNoaXAucGxheWVyID09IFwicGxheWVyVHdvXCIgJiYgc2hpcC5wb3NpdGlvbi5sZW5ndGggIT09IHNoaXAuaGl0cy5sZW5ndGgpO1xuICAgIGxldCBkZXN0cm95ZWRQbGF5ZXIxU2hpcHMgPSBhbGxTaGlwcy5maWx0ZXIoKHNoaXApID0+IHNoaXAucGxheWVyID09IFwicGxheWVyT25lXCIgJiYgc2hpcC5wb3NpdGlvbi5sZW5ndGggPT0gc2hpcC5oaXRzLmxlbmd0aCk7XG4gICAgbGV0IGRlc3Ryb3llZFBsYXllcjJTaGlwcyA9IGFsbFNoaXBzLmZpbHRlcigoc2hpcCkgPT4gc2hpcC5wbGF5ZXIgPT0gXCJwbGF5ZXJUd29cIiAmJiBzaGlwLnBvc2l0aW9uLmxlbmd0aCA9PSBzaGlwLmhpdHMubGVuZ3RoKTtcbiAgICBpZiAocmVtYWluaW5nUGxheWVyMVNoaXBzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIHBsYXllclR1cm5IZWFkZXIudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIxLm5hbWV9IFdpbnNgO1xuICAgICAgICBwbGF5ZXIxU2NvcmUudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIxLm5hbWV9IHNjb3JlOiAke2Rlc3Ryb3llZFBsYXllcjFTaGlwcy5sZW5ndGh9ICByZW1haW5pbmcgc2hpcHM6ICR7cmVtYWluaW5nUGxheWVyMVNoaXBzLmxlbmd0aH1gO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChyZW1haW5pbmdQbGF5ZXIyU2hpcHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgcGxheWVyVHVybkhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllcjIubmFtZX0gV2luc2A7XG4gICAgICAgIHBsYXllcjJTY29yZS50ZXh0Q29udGVudCA9IGAke3BsYXllcjIubmFtZX0gc2NvcmU6ICR7ZGVzdHJveWVkUGxheWVyMlNoaXBzLmxlbmd0aH0gcmVtYWluaW5nIHNoaXBzOiAke3JlbWFpbmluZ1BsYXllcjJTaGlwcy5sZW5ndGh9YDtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBwbGF5ZXIxU2NvcmUudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIxLm5hbWV9IHNjb3JlOiAke2Rlc3Ryb3llZFBsYXllcjFTaGlwcy5sZW5ndGh9IHNoaXBzIGxlZnQ6ICR7cmVtYWluaW5nUGxheWVyMVNoaXBzLmxlbmd0aH1gO1xuICAgIHBsYXllcjJTY29yZS50ZXh0Q29udGVudCA9IGAke3BsYXllcjIubmFtZX0gc2NvcmU6ICR7ZGVzdHJveWVkUGxheWVyMlNoaXBzLmxlbmd0aH0gc2hpcHMgbGVmdDogJHtyZW1haW5pbmdQbGF5ZXIyU2hpcHMubGVuZ3RofWA7XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnR7Z2VuZXJhdGVTY29yZUJvYXJkfSIsImxldCBhbGxQbGF5ZXIxUG9zID0gW107XG5sZXQgYWxsUGxheWVyMlBvcyA9IFtdO1xuXG5jb25zdCBzaGlwID0gKGxlbmd0aCwgb3JpZW50LCBwbGF5ZXIsIGdhbWVCb2FyZFNpemUpID0+IHtcbiAgICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG4gICAgbGV0IHBvc2l0aW9uID0gW107XG4gICAgbGV0IGhpdHMgPSBbXTtcblxuICAgIGNvbnN0IHNoaXBQb3MgPSAocGxheWVyKSA9PiB7XG4gICAgICAgIGxldCBpbml0aWFsUG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ2FtZUJvYXJkU2l6ZSArIDEpO1xuICAgICAgICBsZXQgZ2FtZUJvYXJkTGVuZ3RoID0gTWF0aC5zcXJ0KGdhbWVCb2FyZFNpemUpO1xuICAgICAgICBjb25zb2xlLmxvZyhpbml0aWFsUG9zLCBsZW5ndGgsIHBsYXllcik7XG5cbiAgICAgICAgaWYgKG9yaWVudCA9PT0gXCJsYW5kc2NhcGVcIikge1xuICAgICAgICAgICAgLy8gdG8gbWFrZSBzdXJlIGFsbCBwb3NpdGlvbnMgYXJlIHBsYWNlZCBjb3JyZWN0bHlcblxuICAgICAgICAgICAgY29uc3QgY2hlY2tOb0R1cGxpY2F0ZUxhbmRzY2FwZVBvcyA9IChQb3MpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wUG9zID0gUG9zICsgaTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllciA9PSBcInBsYXllck9uZVwiICYmIGFsbFBsYXllcjFQb3MuaW5jbHVkZXModGVtcFBvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBsYXllciA9PSBcInBsYXllclR3b1wiICYmIGFsbFBsYXllcjJQb3MuaW5jbHVkZXModGVtcFBvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKGFsbExhbmRzY2FwZVBvcy5pbmNsdWRlcyh0ZW1wUG9zKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgcHVzaFRvQXJyYXlMYW5kc2NhcGUgPSAoaW5pdGlhbFBvcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghY2hlY2tOb0R1cGxpY2F0ZUxhbmRzY2FwZVBvcyhpbml0aWFsUG9zKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInB1c2hpbmcgdG8gYXJyYXlcIik7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5hbFBvcyA9IGluaXRpYWxQb3MgKyBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ucHVzaChwbGF5ZXIgKyBmaW5hbFBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyID09IFwicGxheWVyT25lXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxQbGF5ZXIxUG9zLnB1c2goZmluYWxQb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXIgPT0gXCJwbGF5ZXJUd29cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbFBsYXllcjJQb3MucHVzaChmaW5hbFBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxhbmRzY2FwZSBQb3MgYWxyZWFkeSB1c2VkXCIgKyBpbml0aWFsUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgc2hpcFBvcyhwbGF5ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGNoZWNrUG9zTGFuZHNjYXBlID0gKGluaXRpYWxQb3MpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0UG9zID0gaW5pdGlhbFBvcyArIGk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXN0UG9zICUgZ2FtZUJvYXJkTGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRlc3RQb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFBvcyA9IGluaXRpYWxQb3MgKyAoaSArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaGVja2luZyBwb3MgT25lXCIgKyBpbml0aWFsUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hUb0FycmF5TGFuZHNjYXBlKGluaXRpYWxQb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKCFjaGVja1Bvc0xhbmRzY2FwZShpbml0aWFsUG9zKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hlY2tpbmcgcG9zIDJcIik7XG4gICAgICAgICAgICAgICAgcHVzaFRvQXJyYXlMYW5kc2NhcGUoaW5pdGlhbFBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAob3JpZW50ID09PSBcInBvcnRyYWl0XCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrTm9EdXBsaWNhdGVQb3RyYWl0UG9zID0gKFBvcykgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBQb3MgPSBpbml0aWFsUG9zICsgaSAqIGdhbWVCb2FyZExlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllciA9PSBcInBsYXllck9uZVwiICYmIGFsbFBsYXllcjFQb3MuaW5jbHVkZXModGVtcFBvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBsYXllciA9PSBcInBsYXllclR3b1wiICYmIGFsbFBsYXllcjJQb3MuaW5jbHVkZXModGVtcFBvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKGFsbFBvcnRyYWl0UG9zLmluY2x1ZGVzKHRlbXBQb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCBjaGVja1Bvc1BvcnRyYWl0ID0gKGluaXRpYWxQb3MpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wUG9zID0gaW5pdGlhbFBvcyArIGkgKiBnYW1lQm9hcmRMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wUG9zID4gZ2FtZUJvYXJkU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFBvcyA9IGluaXRpYWxQb3MgLSAobGVuZ3RoIC0gaSkgKiBnYW1lQm9hcmRMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNodG9BcnJheVBvcnRyYWl0KGluaXRpYWxQb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5pdGlhbFBvcyArIFwiY2hlY2tpbmcgcG9zIDNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IHB1c2h0b0FycmF5UG9ydHJhaXQgPSAoaW5pdGlhbFBvcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghY2hlY2tOb0R1cGxpY2F0ZVBvdHJhaXRQb3MoaW5pdGlhbFBvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ucHVzaChwbGF5ZXIgKyAoaW5pdGlhbFBvcyArIGkgKiBnYW1lQm9hcmRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIgPT0gXCJwbGF5ZXJPbmVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbFBsYXllcjFQb3MucHVzaChpbml0aWFsUG9zICsgaSAqIGdhbWVCb2FyZExlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBsYXllciA9PSBcInBsYXllclR3b1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsUGxheWVyMlBvcy5wdXNoKGluaXRpYWxQb3MgKyBpICogZ2FtZUJvYXJkTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYWxsUG9ydHJhaXRQb3MucHVzaChpbml0aWFsUG9zICsgaSAqIGdhbWVCb2FyZExlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBvcnRyYWl0IFBvcyBhbHJlYWR5IHVzZWQgXCIgKyBpbml0aWFsUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgc2hpcFBvcyhwbGF5ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICghY2hlY2tQb3NQb3J0cmFpdChpbml0aWFsUG9zKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hlY2tpbmcgcG9zIDRcIik7XG4gICAgICAgICAgICAgICAgcHVzaHRvQXJyYXlQb3J0cmFpdChpbml0aWFsUG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgc2hpcFBvcyhwbGF5ZXIpO1xuICAgIHJldHVybiB7IGdldExlbmd0aCwgcG9zaXRpb24sIGhpdHMsIHBsYXllciB9O1xufTtcblxuZXhwb3J0IHtzaGlwfSIsImNvbnN0IHRpbGVCYWNrZ3JvdW5kQ29sb3IgPSAocGxheWVyMSwgcGxheWVyMikgPT57XG4gICAgY29uc3QgcGxheWVyMUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZUNvbnRhaW5lcjFcIilcbiAgICBjb25zdCBwbGF5ZXIyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lQ29udGFpbmVyMlwiKVxuICAgIGlmIChwbGF5ZXIxLnR1cm4gPT0gMSl7XG4gICAgICAgIHBsYXllcjFDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjOEM0MjM2XCJcbiAgICB9IGVsc2UgaWYgKHBsYXllcjEudHVybiAgPT0gMCkge1xuICAgICAgICBwbGF5ZXIxQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIlxuICAgIH1cbiAgICBpZiAocGxheWVyMi50dXJuID09IDEpe1xuICAgICAgICBwbGF5ZXIyQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzhDNDIzNlwiXG4gICAgfSBlbHNlIGlmIChwbGF5ZXIyLnR1cm4gPT0gMCkge1xuICAgICAgICBwbGF5ZXIyQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIlxuICAgIH0gICBcbn1cblxuZXhwb3J0e3RpbGVCYWNrZ3JvdW5kQ29sb3J9IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLCB1bCB7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSwgcSB7XFxuXFx0cXVvdGVzOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0Y29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9jc3NSZXNldC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7OztDQUdDOztBQUVEOzs7Ozs7Ozs7Ozs7O0NBYUMsU0FBUztDQUNULFVBQVU7Q0FDVixTQUFTO0NBQ1QsZUFBZTtDQUNmLGFBQWE7Q0FDYix3QkFBd0I7QUFDekI7QUFDQSxnREFBZ0Q7QUFDaEQ7O0NBRUMsY0FBYztBQUNmO0FBQ0E7Q0FDQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGdCQUFnQjtBQUNqQjtBQUNBO0NBQ0MsWUFBWTtBQUNiO0FBQ0E7O0NBRUMsV0FBVztDQUNYLGFBQWE7QUFDZDtBQUNBO0NBQ0MseUJBQXlCO0NBQ3pCLGlCQUFpQjtBQUNsQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLCB1bCB7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSwgcSB7XFxuXFx0cXVvdGVzOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0Y29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290e1xcbiAgICAtLW1haW4tZm9udDogJ1NvdXJjZSBTZXJpZiBQcm8nLCBzZXJpZjtcXG4gICAgLS1zZWNvbmRhcnktZm9udDogJ0Vhc3QgU2VhIERva2RvJztcXG59XFxuXFxuI3BsYXllcjFHYW1lVGlsZSwgI3BsYXllcjJHYW1lVGlsZXtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzhDNjYzNjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxufVxcbiNwbGF5ZXIxR2FtZVRpbGU6aG92ZXIsICNwbGF5ZXIyR2FtZVRpbGU6aG92ZXJ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4QzQyMzY7XFxufVxcblxcblxcbiNwbGF5ZXIxR2FtZVRpbGUuaGl0LCAjcGxheWVyMkdhbWVUaWxlLmhpdHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzVCMjgyMDtcXG59XFxuXFxuXFxuXFxuLmdhbWVDb250YWluZXIxLCAuZ2FtZUNvbnRhaW5lcjJ7XFxuICAgIG1hcmdpbjogMXJlbTtcXG4gICAgd2lkdGg6IDYwcmVtO1xcbiAgICBoZWlnaHQ6IDYwcmVtO1xcbiAgICBwbGFjZS1pdGVtczogY2VudGVyO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7XFxuXFxufVxcbi5sb2dve1xcbiAgICBmb250LXNpemU6ICA2cmVtO1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tc2Vjb25kYXJ5LWZvbnQpO1xcbiAgICBtYXJnaW4tYm90dG9tOiA1MHB4O1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooNjBweCk7XFxuICAgIFxcbn1cXG5cXG4jcGxheWVyMUhlYWRlciwgI3BsYXllcjJIZWFkZXJ7XFxuICAgIGdyaWQtY29sdW1uOiAxLy0xO1xcbiAgICBmb250LXNpemU6IDNyZW07XFxuICAgIG1hcmdpbjogMXJlbTtcXG4gICAgcGFkZGluZzogMS41cmVtO1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tbWFpbi1mb250KTtcXG4gICAgXFxufVxcblxcbi5oaXRJbWFnZXtcXG4gICAgd2lkdGg6IDQwcHg7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG59XFxuXFxuLmZvcm1Db250YWluZXJ7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzhDNDIzNjtcXG4gICAgei1pbmRleDogMztcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHRvcDogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLnNoaXBGb3JtQ29udGFpbmVye1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4Qzc5MzY7XFxuICAgIHotaW5kZXg6IDI7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoIDEwMHZoKSByb3RhdGUoMTgwZGVnKTtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4uc2hpcEZvcm1Db250YWluZXIubW92ZWR7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSggMHZoKSByb3RhdGUoMGRlZyk7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcbi5zaGlwRm9ybUNvbnRhaW5lci5tb3ZlZC5zbGlkZURvd257XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwdmgpIHJvdGF0ZSgxODBkZWcpO1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4uZm9ybUNvbnRhaW5lci5tb3ZlZHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKCAxMDB2aCkgcm90YXRlKDE4MGRlZyk7XFxufVxcblxcbiNmb3JtLCAjc2hpcEZvcm17XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nOjMwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XFxuICAgIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwMHB4KTtcXG59XFxuXFxuI3BsYXllclR1cm57XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpO1xcbiAgICBmb250LXNpemU6IDRyZW07XFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjaztcXG4gICAgXFxuICAgIFxcbn1cXG5cXG4jcGxheWVyMVNjb3JlLCAjcGxheWVyMlNjb3Jle1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tbWFpbi1mb250KTtcXG4gICAgZm9udC1zaXplOiAxLjhyZW07XFxuICAgIG1hcmdpbjogMTVweDtcXG59XFxuXFxuLmhlYWRlcntcXG4gICAgZ3JpZC1jb2x1bW46IDEvIC0xO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyODY4M0I7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJyZW07XFxuICAgIGJveC1zaGFkb3c6IDFweCAxcHggMTBweCByZ2IoNTMsIDUzLCA1Myk7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIG1hcmdpbjogMzBweDtcXG4gICAgd2lkdGg6IDUwJTtcXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdLCBpbnB1dFt0eXBlPVxcXCJudW1iZXJcXFwiXXtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgaGVpZ2h0OiAzcmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAgdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpO1xcbiAgICBmb250LXNpemU6IDJyZW07XFxufVxcblxcbmlucHV0W3R5cGU9XFxcInRleHRcXFwiXTpmb2N1cywgIGlucHV0W3R5cGU9XFxcIm51bWJlclxcXCJdOmZvY3Vze1xcbiAgICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG5oMXtcXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLW1haW4tZm9udCk7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXFxuYnV0dG9ue1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI4NjgzQjtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCAycHggcmdiKDUzLCA1MywgNTMpO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJvcmRlcjogbm9uZTtcXG59XFxuXFxubGFiZWx7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpO1xcbiAgICBmb250LXNpemU6IDEuNHJlbTtcXG59XFxuXFxuaW1ne1xcbiAgICB3aWR0aDogMzBweDtcXG59XFxuXFxuYm9keXtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI2NDU1OTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgNWZyO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksc0NBQXNDO0lBQ3RDLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6QixXQUFXO0lBQ1gsWUFBWTtJQUNaLFNBQVM7SUFDVCx1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLGFBQWE7SUFDYixxQkFBcUI7QUFDekI7QUFDQTtJQUNJLHlCQUF5QjtBQUM3Qjs7O0FBR0E7SUFDSSx5QkFBeUI7QUFDN0I7Ozs7QUFJQTtJQUNJLFlBQVk7SUFDWixZQUFZO0lBQ1osYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLHNDQUFzQztJQUN0QyxtQ0FBbUM7O0FBRXZDO0FBQ0E7SUFDSSxnQkFBZ0I7SUFDaEIsa0NBQWtDO0lBQ2xDLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2IsMkJBQTJCOztBQUUvQjs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YsWUFBWTtJQUNaLGVBQWU7SUFDZiw2QkFBNkI7O0FBRWpDOztBQUVBO0lBQ0ksV0FBVztJQUNYLDRCQUE0QjtJQUM1QiwyQkFBMkI7QUFDL0I7O0FBRUE7SUFDSSxlQUFlO0lBQ2YseUJBQXlCO0lBQ3pCLFVBQVU7SUFDVixXQUFXO0lBQ1gsYUFBYTtJQUNiLE1BQU07SUFDTixPQUFPO0lBQ1AsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksZUFBZTtJQUNmLHlCQUF5QjtJQUN6QixVQUFVO0lBQ1YsV0FBVztJQUNYLGFBQWE7SUFDYixNQUFNO0lBQ04sT0FBTztJQUNQLFVBQVU7SUFDVixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsNENBQTRDO0lBQzVDLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLHdDQUF3QztJQUN4QyxVQUFVO0FBQ2Q7QUFDQTtJQUNJLDRDQUE0QztJQUM1QyxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSw0Q0FBNEM7QUFDaEQ7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQiw0QkFBNEI7SUFDNUIsOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksNkJBQTZCO0lBQzdCLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsOEJBQThCOzs7QUFHbEM7O0FBRUE7SUFDSSw2QkFBNkI7SUFDN0IsaUJBQWlCO0lBQ2pCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QixtQkFBbUI7SUFDbkIsd0NBQXdDO0lBQ3hDLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixZQUFZO0lBQ1osVUFBVTtBQUNkOztBQUVBO0lBQ0ksVUFBVTtJQUNWLFlBQVk7SUFDWiw4QkFBOEI7SUFDOUIsWUFBWTtJQUNaLDhCQUE4QjtJQUM5QixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLDZCQUE2QjtJQUM3QixlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQiw2QkFBNkI7SUFDN0IsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixZQUFZO0lBQ1oseUJBQXlCO0lBQ3pCLHVDQUF1QztJQUN2QyxlQUFlO0lBQ2YsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLDZCQUE2QjtJQUM3QixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsYUFBYTtJQUNiLDJCQUEyQjtJQUMzQiw4QkFBOEI7SUFDOUIsbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixXQUFXO0FBQ2ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiOnJvb3R7XFxuICAgIC0tbWFpbi1mb250OiAnU291cmNlIFNlcmlmIFBybycsIHNlcmlmO1xcbiAgICAtLXNlY29uZGFyeS1mb250OiAnRWFzdCBTZWEgRG9rZG8nO1xcbn1cXG5cXG4jcGxheWVyMUdhbWVUaWxlLCAjcGxheWVyMkdhbWVUaWxle1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOEM2NjM2O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuI3BsYXllcjFHYW1lVGlsZTpob3ZlciwgI3BsYXllcjJHYW1lVGlsZTpob3ZlcntcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzhDNDIzNjtcXG59XFxuXFxuXFxuI3BsYXllcjFHYW1lVGlsZS5oaXQsICNwbGF5ZXIyR2FtZVRpbGUuaGl0e1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNUIyODIwO1xcbn1cXG5cXG5cXG5cXG4uZ2FtZUNvbnRhaW5lcjEsIC5nYW1lQ29udGFpbmVyMntcXG4gICAgbWFyZ2luOiAxcmVtO1xcbiAgICB3aWR0aDogNjByZW07XFxuICAgIGhlaWdodDogNjByZW07XFxuICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMSwgMWZyKTtcXG5cXG59XFxuLmxvZ297XFxuICAgIGZvbnQtc2l6ZTogIDZyZW07XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1zZWNvbmRhcnktZm9udCk7XFxuICAgIG1hcmdpbi1ib3R0b206IDUwcHg7XFxuICAgIHBhZGRpbmc6IDIwcHg7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWig2MHB4KTtcXG4gICAgXFxufVxcblxcbiNwbGF5ZXIxSGVhZGVyLCAjcGxheWVyMkhlYWRlcntcXG4gICAgZ3JpZC1jb2x1bW46IDEvLTE7XFxuICAgIGZvbnQtc2l6ZTogM3JlbTtcXG4gICAgbWFyZ2luOiAxcmVtO1xcbiAgICBwYWRkaW5nOiAxLjVyZW07XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpO1xcbiAgICBcXG59XFxuXFxuLmhpdEltYWdle1xcbiAgICB3aWR0aDogNDBweDtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbn1cXG5cXG4uZm9ybUNvbnRhaW5lcntcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOEM0MjM2O1xcbiAgICB6LWluZGV4OiAzO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4uc2hpcEZvcm1Db250YWluZXJ7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzhDNzkzNjtcXG4gICAgei1pbmRleDogMjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHRvcDogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSggMTAwdmgpIHJvdGF0ZSgxODBkZWcpO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi5zaGlwRm9ybUNvbnRhaW5lci5tb3ZlZHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKCAwdmgpIHJvdGF0ZSgwZGVnKTtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuLnNoaXBGb3JtQ29udGFpbmVyLm1vdmVkLnNsaWRlRG93bntcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDB2aCkgcm90YXRlKDE4MGRlZyk7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi5mb3JtQ29udGFpbmVyLm1vdmVke1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoIDEwMHZoKSByb3RhdGUoMTgwZGVnKTtcXG59XFxuXFxuI2Zvcm0sICNzaGlwRm9ybXtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6MzBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMzBweDtcXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMDAwcHgpO1xcbn1cXG5cXG4jcGxheWVyVHVybntcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLW1haW4tZm9udCk7XFxuICAgIGZvbnQtc2l6ZTogNHJlbTtcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBcXG4gICAgXFxufVxcblxcbiNwbGF5ZXIxU2NvcmUsICNwbGF5ZXIyU2NvcmV7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpO1xcbiAgICBmb250LXNpemU6IDEuOHJlbTtcXG4gICAgbWFyZ2luOiAxNXB4O1xcbn1cXG5cXG4uaGVhZGVye1xcbiAgICBncmlkLWNvbHVtbjogMS8gLTE7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI4NjgzQjtcXG4gICAgYm9yZGVyLXJhZGl1czogMnJlbTtcXG4gICAgYm94LXNoYWRvdzogMXB4IDFweCAxMHB4IHJnYig1MywgNTMsIDUzKTtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgbWFyZ2luOiAzMHB4O1xcbiAgICB3aWR0aDogNTAlO1xcbn1cXG5cXG5pbnB1dFt0eXBlPVxcXCJ0ZXh0XFxcIl0sIGlucHV0W3R5cGU9XFxcIm51bWJlclxcXCJde1xcbiAgICB3aWR0aDogNzAlO1xcbiAgICBoZWlnaHQ6IDNyZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgYmxhY2s7XFxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLW1haW4tZm9udCk7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdOmZvY3VzLCAgaW5wdXRbdHlwZT1cXFwibnVtYmVyXFxcIl06Zm9jdXN7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxufVxcblxcbmgxe1xcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tbWFpbi1mb250KTtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5cXG5idXR0b257XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjg2ODNCO1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDJweCByZ2IoNTMsIDUzLCA1Myk7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG5sYWJlbHtcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLW1haW4tZm9udCk7XFxuICAgIGZvbnQtc2l6ZTogMS40cmVtO1xcbn1cXG5cXG5pbWd7XFxuICAgIHdpZHRoOiAzMHB4O1xcbn1cXG5cXG5ib2R5e1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjY0NTU5O1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciA1ZnI7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gICAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgd2lkdGg6IDEwMCU7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vY3NzUmVzZXQuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9jc3NSZXNldC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDcmVhdGVkIGJ5IFNlcmdpdSDImGFuZG9yIChtaWNrdTd6dSkgb24gMS8yNy8yMDE3LlxuICogT3JpZ2luYWwgaWRlYTogaHR0cHM6Ly9naXRodWIuY29tL2dpanNyb2dlL3RpbHQuanNcbiAqIE1JVCBMaWNlbnNlLlxuICogVmVyc2lvbiAxLjcuMlxuICovXG5cbnZhciBWYW5pbGxhVGlsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gVmFuaWxsYVRpbHQoZWxlbWVudCkge1xuICAgIHZhciBzZXR0aW5ncyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgVmFuaWxsYVRpbHQpO1xuXG4gICAgaWYgKCEoZWxlbWVudCBpbnN0YW5jZW9mIE5vZGUpKSB7XG4gICAgICB0aHJvdyBcIkNhbid0IGluaXRpYWxpemUgVmFuaWxsYVRpbHQgYmVjYXVzZSBcIiArIGVsZW1lbnQgKyBcIiBpcyBub3QgYSBOb2RlLlwiO1xuICAgIH1cblxuICAgIHRoaXMud2lkdGggPSBudWxsO1xuICAgIHRoaXMuaGVpZ2h0ID0gbnVsbDtcbiAgICB0aGlzLmNsaWVudFdpZHRoID0gbnVsbDtcbiAgICB0aGlzLmNsaWVudEhlaWdodCA9IG51bGw7XG4gICAgdGhpcy5sZWZ0ID0gbnVsbDtcbiAgICB0aGlzLnRvcCA9IG51bGw7XG5cbiAgICAvLyBmb3IgR3lyb3Njb3BlIHNhbXBsaW5nXG4gICAgdGhpcy5nYW1tYXplcm8gPSBudWxsO1xuICAgIHRoaXMuYmV0YXplcm8gPSBudWxsO1xuICAgIHRoaXMubGFzdGdhbW1hemVybyA9IG51bGw7XG4gICAgdGhpcy5sYXN0YmV0YXplcm8gPSBudWxsO1xuXG4gICAgdGhpcy50cmFuc2l0aW9uVGltZW91dCA9IG51bGw7XG4gICAgdGhpcy51cGRhdGVDYWxsID0gbnVsbDtcbiAgICB0aGlzLmV2ZW50ID0gbnVsbDtcblxuICAgIHRoaXMudXBkYXRlQmluZCA9IHRoaXMudXBkYXRlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5yZXNldEJpbmQgPSB0aGlzLnJlc2V0LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLmV4dGVuZFNldHRpbmdzKHNldHRpbmdzKTtcblxuICAgIHRoaXMucmV2ZXJzZSA9IHRoaXMuc2V0dGluZ3MucmV2ZXJzZSA/IC0xIDogMTtcbiAgICB0aGlzLmdsYXJlID0gVmFuaWxsYVRpbHQuaXNTZXR0aW5nVHJ1ZSh0aGlzLnNldHRpbmdzLmdsYXJlKTtcbiAgICB0aGlzLmdsYXJlUHJlcmVuZGVyID0gVmFuaWxsYVRpbHQuaXNTZXR0aW5nVHJ1ZSh0aGlzLnNldHRpbmdzW1wiZ2xhcmUtcHJlcmVuZGVyXCJdKTtcbiAgICB0aGlzLmZ1bGxQYWdlTGlzdGVuaW5nID0gVmFuaWxsYVRpbHQuaXNTZXR0aW5nVHJ1ZSh0aGlzLnNldHRpbmdzW1wiZnVsbC1wYWdlLWxpc3RlbmluZ1wiXSk7XG4gICAgdGhpcy5neXJvc2NvcGUgPSBWYW5pbGxhVGlsdC5pc1NldHRpbmdUcnVlKHRoaXMuc2V0dGluZ3MuZ3lyb3Njb3BlKTtcbiAgICB0aGlzLmd5cm9zY29wZVNhbXBsZXMgPSB0aGlzLnNldHRpbmdzLmd5cm9zY29wZVNhbXBsZXM7XG5cbiAgICB0aGlzLmVsZW1lbnRMaXN0ZW5lciA9IHRoaXMuZ2V0RWxlbWVudExpc3RlbmVyKCk7XG5cbiAgICBpZiAodGhpcy5nbGFyZSkge1xuICAgICAgdGhpcy5wcmVwYXJlR2xhcmUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mdWxsUGFnZUxpc3RlbmluZykge1xuICAgICAgdGhpcy51cGRhdGVDbGllbnRTaXplKCk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICB0aGlzLnVwZGF0ZUluaXRpYWxQb3NpdGlvbigpO1xuICB9XG5cbiAgVmFuaWxsYVRpbHQuaXNTZXR0aW5nVHJ1ZSA9IGZ1bmN0aW9uIGlzU2V0dGluZ1RydWUoc2V0dGluZykge1xuICAgIHJldHVybiBzZXR0aW5nID09PSBcIlwiIHx8IHNldHRpbmcgPT09IHRydWUgfHwgc2V0dGluZyA9PT0gMTtcbiAgfTtcblxuICAvKipcbiAgICogTWV0aG9kIHJldHVybnMgZWxlbWVudCB3aGF0IHdpbGwgYmUgbGlzdGVuIG1vdXNlIGV2ZW50c1xuICAgKiBAcmV0dXJuIHtOb2RlfVxuICAgKi9cblxuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5nZXRFbGVtZW50TGlzdGVuZXIgPSBmdW5jdGlvbiBnZXRFbGVtZW50TGlzdGVuZXIoKSB7XG4gICAgaWYgKHRoaXMuZnVsbFBhZ2VMaXN0ZW5pbmcpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZG9jdW1lbnQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzW1wibW91c2UtZXZlbnQtZWxlbWVudFwiXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdmFyIG1vdXNlRXZlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNldHRpbmdzW1wibW91c2UtZXZlbnQtZWxlbWVudFwiXSk7XG5cbiAgICAgIGlmIChtb3VzZUV2ZW50RWxlbWVudCkge1xuICAgICAgICByZXR1cm4gbW91c2VFdmVudEVsZW1lbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3NbXCJtb3VzZS1ldmVudC1lbGVtZW50XCJdIGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3NbXCJtb3VzZS1ldmVudC1lbGVtZW50XCJdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBzZXQgbGlzdGVuIG1ldGhvZHMgZm9yIHRoaXMuZWxlbWVudExpc3RlbmVyXG4gICAqIEByZXR1cm4ge05vZGV9XG4gICAqL1xuXG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5vbk1vdXNlRW50ZXJCaW5kID0gdGhpcy5vbk1vdXNlRW50ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uTW91c2VNb3ZlQmluZCA9IHRoaXMub25Nb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uTW91c2VMZWF2ZUJpbmQgPSB0aGlzLm9uTW91c2VMZWF2ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25XaW5kb3dSZXNpemVCaW5kID0gdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25EZXZpY2VPcmllbnRhdGlvbkJpbmQgPSB0aGlzLm9uRGV2aWNlT3JpZW50YXRpb24uYmluZCh0aGlzKTtcblxuICAgIHRoaXMuZWxlbWVudExpc3RlbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIHRoaXMub25Nb3VzZUVudGVyQmluZCk7XG4gICAgdGhpcy5lbGVtZW50TGlzdGVuZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgdGhpcy5vbk1vdXNlTGVhdmVCaW5kKTtcbiAgICB0aGlzLmVsZW1lbnRMaXN0ZW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMub25Nb3VzZU1vdmVCaW5kKTtcblxuICAgIGlmICh0aGlzLmdsYXJlIHx8IHRoaXMuZnVsbFBhZ2VMaXN0ZW5pbmcpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMub25XaW5kb3dSZXNpemVCaW5kKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5neXJvc2NvcGUpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlb3JpZW50YXRpb25cIiwgdGhpcy5vbkRldmljZU9yaWVudGF0aW9uQmluZCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBNZXRob2QgcmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBmcm9tIGN1cnJlbnQgdGhpcy5lbGVtZW50TGlzdGVuZXJcbiAgICovXG5cblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLmVsZW1lbnRMaXN0ZW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCB0aGlzLm9uTW91c2VFbnRlckJpbmQpO1xuICAgIHRoaXMuZWxlbWVudExpc3RlbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRoaXMub25Nb3VzZUxlYXZlQmluZCk7XG4gICAgdGhpcy5lbGVtZW50TGlzdGVuZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm9uTW91c2VNb3ZlQmluZCk7XG5cbiAgICBpZiAodGhpcy5neXJvc2NvcGUpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZGV2aWNlb3JpZW50YXRpb25cIiwgdGhpcy5vbkRldmljZU9yaWVudGF0aW9uQmluZCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZ2xhcmUgfHwgdGhpcy5mdWxsUGFnZUxpc3RlbmluZykge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5vbldpbmRvd1Jlc2l6ZUJpbmQpO1xuICAgIH1cbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudHJhbnNpdGlvblRpbWVvdXQpO1xuICAgIGlmICh0aGlzLnVwZGF0ZUNhbGwgIT09IG51bGwpIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlQ2FsbCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZXNldCgpO1xuXG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuZWxlbWVudC52YW5pbGxhVGlsdCA9IG51bGw7XG4gICAgZGVsZXRlIHRoaXMuZWxlbWVudC52YW5pbGxhVGlsdDtcblxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLm9uRGV2aWNlT3JpZW50YXRpb24gPSBmdW5jdGlvbiBvbkRldmljZU9yaWVudGF0aW9uKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmdhbW1hID09PSBudWxsIHx8IGV2ZW50LmJldGEgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUVsZW1lbnRQb3NpdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuZ3lyb3Njb3BlU2FtcGxlcyA+IDApIHtcbiAgICAgIHRoaXMubGFzdGdhbW1hemVybyA9IHRoaXMuZ2FtbWF6ZXJvO1xuICAgICAgdGhpcy5sYXN0YmV0YXplcm8gPSB0aGlzLmJldGF6ZXJvO1xuXG4gICAgICBpZiAodGhpcy5nYW1tYXplcm8gPT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5nYW1tYXplcm8gPSBldmVudC5nYW1tYTtcbiAgICAgICAgdGhpcy5iZXRhemVybyA9IGV2ZW50LmJldGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmdhbW1hemVybyA9IChldmVudC5nYW1tYSArIHRoaXMubGFzdGdhbW1hemVybykgLyAyO1xuICAgICAgICB0aGlzLmJldGF6ZXJvID0gKGV2ZW50LmJldGEgKyB0aGlzLmxhc3RiZXRhemVybykgLyAyO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmd5cm9zY29wZVNhbXBsZXMgLT0gMTtcbiAgICB9XG5cbiAgICB2YXIgdG90YWxBbmdsZVggPSB0aGlzLnNldHRpbmdzLmd5cm9zY29wZU1heEFuZ2xlWCAtIHRoaXMuc2V0dGluZ3MuZ3lyb3Njb3BlTWluQW5nbGVYO1xuICAgIHZhciB0b3RhbEFuZ2xlWSA9IHRoaXMuc2V0dGluZ3MuZ3lyb3Njb3BlTWF4QW5nbGVZIC0gdGhpcy5zZXR0aW5ncy5neXJvc2NvcGVNaW5BbmdsZVk7XG5cbiAgICB2YXIgZGVncmVlc1BlclBpeGVsWCA9IHRvdGFsQW5nbGVYIC8gdGhpcy53aWR0aDtcbiAgICB2YXIgZGVncmVlc1BlclBpeGVsWSA9IHRvdGFsQW5nbGVZIC8gdGhpcy5oZWlnaHQ7XG5cbiAgICB2YXIgYW5nbGVYID0gZXZlbnQuZ2FtbWEgLSAodGhpcy5zZXR0aW5ncy5neXJvc2NvcGVNaW5BbmdsZVggKyB0aGlzLmdhbW1hemVybyk7XG4gICAgdmFyIGFuZ2xlWSA9IGV2ZW50LmJldGEgLSAodGhpcy5zZXR0aW5ncy5neXJvc2NvcGVNaW5BbmdsZVkgKyB0aGlzLmJldGF6ZXJvKTtcblxuICAgIHZhciBwb3NYID0gYW5nbGVYIC8gZGVncmVlc1BlclBpeGVsWDtcbiAgICB2YXIgcG9zWSA9IGFuZ2xlWSAvIGRlZ3JlZXNQZXJQaXhlbFk7XG5cbiAgICBpZiAodGhpcy51cGRhdGVDYWxsICE9PSBudWxsKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZUNhbGwpO1xuICAgIH1cblxuICAgIHRoaXMuZXZlbnQgPSB7XG4gICAgICBjbGllbnRYOiBwb3NYICsgdGhpcy5sZWZ0LFxuICAgICAgY2xpZW50WTogcG9zWSArIHRoaXMudG9wXG4gICAgfTtcblxuICAgIHRoaXMudXBkYXRlQ2FsbCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZUJpbmQpO1xuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5vbk1vdXNlRW50ZXIgPSBmdW5jdGlvbiBvbk1vdXNlRW50ZXIoKSB7XG4gICAgdGhpcy51cGRhdGVFbGVtZW50UG9zaXRpb24oKTtcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUud2lsbENoYW5nZSA9IFwidHJhbnNmb3JtXCI7XG4gICAgdGhpcy5zZXRUcmFuc2l0aW9uKCk7XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLm9uTW91c2VNb3ZlID0gZnVuY3Rpb24gb25Nb3VzZU1vdmUoZXZlbnQpIHtcbiAgICBpZiAodGhpcy51cGRhdGVDYWxsICE9PSBudWxsKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZUNhbGwpO1xuICAgIH1cblxuICAgIHRoaXMuZXZlbnQgPSBldmVudDtcbiAgICB0aGlzLnVwZGF0ZUNhbGwgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVCaW5kKTtcbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUub25Nb3VzZUxlYXZlID0gZnVuY3Rpb24gb25Nb3VzZUxlYXZlKCkge1xuICAgIHRoaXMuc2V0VHJhbnNpdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MucmVzZXQpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlc2V0QmluZCk7XG4gICAgfVxuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIHRoaXMuZXZlbnQgPSB7XG4gICAgICBjbGllbnRYOiB0aGlzLmxlZnQgKyB0aGlzLndpZHRoIC8gMixcbiAgICAgIGNsaWVudFk6IHRoaXMudG9wICsgdGhpcy5oZWlnaHQgLyAyXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmVsZW1lbnQgJiYgdGhpcy5lbGVtZW50LnN0eWxlKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJwZXJzcGVjdGl2ZShcIiArIHRoaXMuc2V0dGluZ3MucGVyc3BlY3RpdmUgKyBcInB4KSBcIiArIFwicm90YXRlWCgwZGVnKSBcIiArIFwicm90YXRlWSgwZGVnKSBcIiArIFwic2NhbGUzZCgxLCAxLCAxKVwiO1xuICAgIH1cblxuICAgIHRoaXMucmVzZXRHbGFyZSgpO1xuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5yZXNldEdsYXJlID0gZnVuY3Rpb24gcmVzZXRHbGFyZSgpIHtcbiAgICBpZiAodGhpcy5nbGFyZSkge1xuICAgICAgdGhpcy5nbGFyZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJyb3RhdGUoMTgwZGVnKSB0cmFuc2xhdGUoLTUwJSwgLTUwJSlcIjtcbiAgICAgIHRoaXMuZ2xhcmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbiAgICB9XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLnVwZGF0ZUluaXRpYWxQb3NpdGlvbiA9IGZ1bmN0aW9uIHVwZGF0ZUluaXRpYWxQb3NpdGlvbigpIHtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5zdGFydFggPT09IDAgJiYgdGhpcy5zZXR0aW5ncy5zdGFydFkgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9uTW91c2VFbnRlcigpO1xuXG4gICAgaWYgKHRoaXMuZnVsbFBhZ2VMaXN0ZW5pbmcpIHtcbiAgICAgIHRoaXMuZXZlbnQgPSB7XG4gICAgICAgIGNsaWVudFg6ICh0aGlzLnNldHRpbmdzLnN0YXJ0WCArIHRoaXMuc2V0dGluZ3MubWF4KSAvICgyICogdGhpcy5zZXR0aW5ncy5tYXgpICogdGhpcy5jbGllbnRXaWR0aCxcbiAgICAgICAgY2xpZW50WTogKHRoaXMuc2V0dGluZ3Muc3RhcnRZICsgdGhpcy5zZXR0aW5ncy5tYXgpIC8gKDIgKiB0aGlzLnNldHRpbmdzLm1heCkgKiB0aGlzLmNsaWVudEhlaWdodFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ldmVudCA9IHtcbiAgICAgICAgY2xpZW50WDogdGhpcy5sZWZ0ICsgKHRoaXMuc2V0dGluZ3Muc3RhcnRYICsgdGhpcy5zZXR0aW5ncy5tYXgpIC8gKDIgKiB0aGlzLnNldHRpbmdzLm1heCkgKiB0aGlzLndpZHRoLFxuICAgICAgICBjbGllbnRZOiB0aGlzLnRvcCArICh0aGlzLnNldHRpbmdzLnN0YXJ0WSArIHRoaXMuc2V0dGluZ3MubWF4KSAvICgyICogdGhpcy5zZXR0aW5ncy5tYXgpICogdGhpcy5oZWlnaHRcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGJhY2t1cFNjYWxlID0gdGhpcy5zZXR0aW5ncy5zY2FsZTtcbiAgICB0aGlzLnNldHRpbmdzLnNjYWxlID0gMTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIHRoaXMuc2V0dGluZ3Muc2NhbGUgPSBiYWNrdXBTY2FsZTtcbiAgICB0aGlzLnJlc2V0R2xhcmUoKTtcbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUuZ2V0VmFsdWVzID0gZnVuY3Rpb24gZ2V0VmFsdWVzKCkge1xuICAgIHZhciB4ID0gdm9pZCAwLFxuICAgICAgICB5ID0gdm9pZCAwO1xuXG4gICAgaWYgKHRoaXMuZnVsbFBhZ2VMaXN0ZW5pbmcpIHtcbiAgICAgIHggPSB0aGlzLmV2ZW50LmNsaWVudFggLyB0aGlzLmNsaWVudFdpZHRoO1xuICAgICAgeSA9IHRoaXMuZXZlbnQuY2xpZW50WSAvIHRoaXMuY2xpZW50SGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gKHRoaXMuZXZlbnQuY2xpZW50WCAtIHRoaXMubGVmdCkgLyB0aGlzLndpZHRoO1xuICAgICAgeSA9ICh0aGlzLmV2ZW50LmNsaWVudFkgLSB0aGlzLnRvcCkgLyB0aGlzLmhlaWdodDtcbiAgICB9XG5cbiAgICB4ID0gTWF0aC5taW4oTWF0aC5tYXgoeCwgMCksIDEpO1xuICAgIHkgPSBNYXRoLm1pbihNYXRoLm1heCh5LCAwKSwgMSk7XG5cbiAgICB2YXIgdGlsdFggPSAodGhpcy5yZXZlcnNlICogKHRoaXMuc2V0dGluZ3MubWF4IC0geCAqIHRoaXMuc2V0dGluZ3MubWF4ICogMikpLnRvRml4ZWQoMik7XG4gICAgdmFyIHRpbHRZID0gKHRoaXMucmV2ZXJzZSAqICh5ICogdGhpcy5zZXR0aW5ncy5tYXggKiAyIC0gdGhpcy5zZXR0aW5ncy5tYXgpKS50b0ZpeGVkKDIpO1xuICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIodGhpcy5ldmVudC5jbGllbnRYIC0gKHRoaXMubGVmdCArIHRoaXMud2lkdGggLyAyKSwgLSh0aGlzLmV2ZW50LmNsaWVudFkgLSAodGhpcy50b3AgKyB0aGlzLmhlaWdodCAvIDIpKSkgKiAoMTgwIC8gTWF0aC5QSSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdGlsdFg6IHRpbHRYLFxuICAgICAgdGlsdFk6IHRpbHRZLFxuICAgICAgcGVyY2VudGFnZVg6IHggKiAxMDAsXG4gICAgICBwZXJjZW50YWdlWTogeSAqIDEwMCxcbiAgICAgIGFuZ2xlOiBhbmdsZVxuICAgIH07XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLnVwZGF0ZUVsZW1lbnRQb3NpdGlvbiA9IGZ1bmN0aW9uIHVwZGF0ZUVsZW1lbnRQb3NpdGlvbigpIHtcbiAgICB2YXIgcmVjdCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHRoaXMud2lkdGggPSB0aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIHRoaXMubGVmdCA9IHJlY3QubGVmdDtcbiAgICB0aGlzLnRvcCA9IHJlY3QudG9wO1xuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIHZhbHVlcyA9IHRoaXMuZ2V0VmFsdWVzKCk7XG5cbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJwZXJzcGVjdGl2ZShcIiArIHRoaXMuc2V0dGluZ3MucGVyc3BlY3RpdmUgKyBcInB4KSBcIiArIFwicm90YXRlWChcIiArICh0aGlzLnNldHRpbmdzLmF4aXMgPT09IFwieFwiID8gMCA6IHZhbHVlcy50aWx0WSkgKyBcImRlZykgXCIgKyBcInJvdGF0ZVkoXCIgKyAodGhpcy5zZXR0aW5ncy5heGlzID09PSBcInlcIiA/IDAgOiB2YWx1ZXMudGlsdFgpICsgXCJkZWcpIFwiICsgXCJzY2FsZTNkKFwiICsgdGhpcy5zZXR0aW5ncy5zY2FsZSArIFwiLCBcIiArIHRoaXMuc2V0dGluZ3Muc2NhbGUgKyBcIiwgXCIgKyB0aGlzLnNldHRpbmdzLnNjYWxlICsgXCIpXCI7XG5cbiAgICBpZiAodGhpcy5nbGFyZSkge1xuICAgICAgdGhpcy5nbGFyZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJyb3RhdGUoXCIgKyB2YWx1ZXMuYW5nbGUgKyBcImRlZykgdHJhbnNsYXRlKC01MCUsIC01MCUpXCI7XG4gICAgICB0aGlzLmdsYXJlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCJcIiArIHZhbHVlcy5wZXJjZW50YWdlWSAqIHRoaXMuc2V0dGluZ3NbXCJtYXgtZ2xhcmVcIl0gLyAxMDA7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwidGlsdENoYW5nZVwiLCB7XG4gICAgICBcImRldGFpbFwiOiB2YWx1ZXNcbiAgICB9KSk7XG5cbiAgICB0aGlzLnVwZGF0ZUNhbGwgPSBudWxsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBcHBlbmRzIHRoZSBnbGFyZSBlbGVtZW50IChpZiBnbGFyZVByZXJlbmRlciBlcXVhbHMgZmFsc2UpXG4gICAqIGFuZCBzZXRzIHRoZSBkZWZhdWx0IHN0eWxlXG4gICAqL1xuXG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLnByZXBhcmVHbGFyZSA9IGZ1bmN0aW9uIHByZXBhcmVHbGFyZSgpIHtcbiAgICAvLyBJZiBvcHRpb24gcHJlLXJlbmRlciBpcyBlbmFibGVkIHdlIGFzc3VtZSBhbGwgaHRtbC9jc3MgaXMgcHJlc2VudCBmb3IgYW4gb3B0aW1hbCBnbGFyZSBlZmZlY3QuXG4gICAgaWYgKCF0aGlzLmdsYXJlUHJlcmVuZGVyKSB7XG4gICAgICAvLyBDcmVhdGUgZ2xhcmUgZWxlbWVudFxuICAgICAgdmFyIGpzVGlsdEdsYXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGpzVGlsdEdsYXJlLmNsYXNzTGlzdC5hZGQoXCJqcy10aWx0LWdsYXJlXCIpO1xuXG4gICAgICB2YXIganNUaWx0R2xhcmVJbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBqc1RpbHRHbGFyZUlubmVyLmNsYXNzTGlzdC5hZGQoXCJqcy10aWx0LWdsYXJlLWlubmVyXCIpO1xuXG4gICAgICBqc1RpbHRHbGFyZS5hcHBlbmRDaGlsZChqc1RpbHRHbGFyZUlubmVyKTtcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChqc1RpbHRHbGFyZSk7XG4gICAgfVxuXG4gICAgdGhpcy5nbGFyZUVsZW1lbnRXcmFwcGVyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtdGlsdC1nbGFyZVwiKTtcbiAgICB0aGlzLmdsYXJlRWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXRpbHQtZ2xhcmUtaW5uZXJcIik7XG5cbiAgICBpZiAodGhpcy5nbGFyZVByZXJlbmRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5hc3NpZ24odGhpcy5nbGFyZUVsZW1lbnRXcmFwcGVyLnN0eWxlLCB7XG4gICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgIFwidG9wXCI6IFwiMFwiLFxuICAgICAgXCJsZWZ0XCI6IFwiMFwiLFxuICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgICAgXCJvdmVyZmxvd1wiOiBcImhpZGRlblwiLFxuICAgICAgXCJwb2ludGVyLWV2ZW50c1wiOiBcIm5vbmVcIlxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmdsYXJlRWxlbWVudC5zdHlsZSwge1xuICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICBcInRvcFwiOiBcIjUwJVwiLFxuICAgICAgXCJsZWZ0XCI6IFwiNTAlXCIsXG4gICAgICBcInBvaW50ZXItZXZlbnRzXCI6IFwibm9uZVwiLFxuICAgICAgXCJiYWNrZ3JvdW5kLWltYWdlXCI6IFwibGluZWFyLWdyYWRpZW50KDBkZWcsIHJnYmEoMjU1LDI1NSwyNTUsMCkgMCUsIHJnYmEoMjU1LDI1NSwyNTUsMSkgMTAwJSlcIixcbiAgICAgIFwidHJhbnNmb3JtXCI6IFwicm90YXRlKDE4MGRlZykgdHJhbnNsYXRlKC01MCUsIC01MCUpXCIsXG4gICAgICBcInRyYW5zZm9ybS1vcmlnaW5cIjogXCIwJSAwJVwiLFxuICAgICAgXCJvcGFjaXR5XCI6IFwiMFwiXG4gICAgfSk7XG5cbiAgICB0aGlzLnVwZGF0ZUdsYXJlU2l6ZSgpO1xuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS51cGRhdGVHbGFyZVNpemUgPSBmdW5jdGlvbiB1cGRhdGVHbGFyZVNpemUoKSB7XG4gICAgaWYgKHRoaXMuZ2xhcmUpIHtcbiAgICAgIHZhciBnbGFyZVNpemUgPSAodGhpcy5lbGVtZW50Lm9mZnNldFdpZHRoID4gdGhpcy5lbGVtZW50Lm9mZnNldEhlaWdodCA/IHRoaXMuZWxlbWVudC5vZmZzZXRXaWR0aCA6IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQpICogMjtcblxuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmdsYXJlRWxlbWVudC5zdHlsZSwge1xuICAgICAgICBcIndpZHRoXCI6IGdsYXJlU2l6ZSArIFwicHhcIixcbiAgICAgICAgXCJoZWlnaHRcIjogZ2xhcmVTaXplICsgXCJweFwiXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLnVwZGF0ZUNsaWVudFNpemUgPSBmdW5jdGlvbiB1cGRhdGVDbGllbnRTaXplKCkge1xuICAgIHRoaXMuY2xpZW50V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcblxuICAgIHRoaXMuY2xpZW50SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQ7XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLm9uV2luZG93UmVzaXplID0gZnVuY3Rpb24gb25XaW5kb3dSZXNpemUoKSB7XG4gICAgdGhpcy51cGRhdGVHbGFyZVNpemUoKTtcbiAgICB0aGlzLnVwZGF0ZUNsaWVudFNpemUoKTtcbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUuc2V0VHJhbnNpdGlvbiA9IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRyYW5zaXRpb25UaW1lb3V0KTtcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IHRoaXMuc2V0dGluZ3Muc3BlZWQgKyBcIm1zIFwiICsgdGhpcy5zZXR0aW5ncy5lYXNpbmc7XG4gICAgaWYgKHRoaXMuZ2xhcmUpIHRoaXMuZ2xhcmVFbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSBcIm9wYWNpdHkgXCIgKyB0aGlzLnNldHRpbmdzLnNwZWVkICsgXCJtcyBcIiArIHRoaXMuc2V0dGluZ3MuZWFzaW5nO1xuXG4gICAgdGhpcy50cmFuc2l0aW9uVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gXCJcIjtcbiAgICAgIGlmIChfdGhpcy5nbGFyZSkge1xuICAgICAgICBfdGhpcy5nbGFyZUVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IFwiXCI7XG4gICAgICB9XG4gICAgfSwgdGhpcy5zZXR0aW5ncy5zcGVlZCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1ldGhvZCByZXR1cm4gcGF0Y2hlZCBzZXR0aW5ncyBvZiBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNldHRpbmdzLnJldmVyc2UgLSByZXZlcnNlIHRoZSB0aWx0IGRpcmVjdGlvblxuICAgKiBAcGFyYW0ge251bWJlcn0gc2V0dGluZ3MubWF4IC0gbWF4IHRpbHQgcm90YXRpb24gKGRlZ3JlZXMpXG4gICAqIEBwYXJhbSB7c3RhcnRYfSBzZXR0aW5ncy5zdGFydFggLSB0aGUgc3RhcnRpbmcgdGlsdCBvbiB0aGUgWCBheGlzLCBpbiBkZWdyZWVzLiBEZWZhdWx0OiAwXG4gICAqIEBwYXJhbSB7c3RhcnRZfSBzZXR0aW5ncy5zdGFydFkgLSB0aGUgc3RhcnRpbmcgdGlsdCBvbiB0aGUgWSBheGlzLCBpbiBkZWdyZWVzLiBEZWZhdWx0OiAwXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzZXR0aW5ncy5wZXJzcGVjdGl2ZSAtIFRyYW5zZm9ybSBwZXJzcGVjdGl2ZSwgdGhlIGxvd2VyIHRoZSBtb3JlIGV4dHJlbWUgdGhlIHRpbHQgZ2V0c1xuICAgKiBAcGFyYW0ge3N0cmluZ30gc2V0dGluZ3MuZWFzaW5nIC0gRWFzaW5nIG9uIGVudGVyL2V4aXRcbiAgICogQHBhcmFtIHtudW1iZXJ9IHNldHRpbmdzLnNjYWxlIC0gMiA9IDIwMCUsIDEuNSA9IDE1MCUsIGV0Yy4uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzZXR0aW5ncy5zcGVlZCAtIFNwZWVkIG9mIHRoZSBlbnRlci9leGl0IHRyYW5zaXRpb25cbiAgICogQHBhcmFtIHtib29sZWFufSBzZXR0aW5ncy50cmFuc2l0aW9uIC0gU2V0IGEgdHJhbnNpdGlvbiBvbiBlbnRlci9leGl0XG4gICAqIEBwYXJhbSB7c3RyaW5nfG51bGx9IHNldHRpbmdzLmF4aXMgLSBXaGF0IGF4aXMgc2hvdWxkIGJlIGRpc2FibGVkLiBDYW4gYmUgWCBvciBZXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2V0dGluZ3MuZ2xhcmUgLSBXaGF0IGF4aXMgc2hvdWxkIGJlIGRpc2FibGVkLiBDYW4gYmUgWCBvciBZXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzZXR0aW5ncy5tYXgtZ2xhcmUgLSB0aGUgbWF4aW11bSBcImdsYXJlXCIgb3BhY2l0eSAoMSA9IDEwMCUsIDAuNSA9IDUwJSlcbiAgICogQHBhcmFtIHtib29sZWFufSBzZXR0aW5ncy5nbGFyZS1wcmVyZW5kZXIgLSBmYWxzZSA9IFZhbmlsbGFUaWx0IGNyZWF0ZXMgdGhlIGdsYXJlIGVsZW1lbnRzIGZvciB5b3UsIG90aGVyd2lzZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNldHRpbmdzLmZ1bGwtcGFnZS1saXN0ZW5pbmcgLSBJZiB0cnVlLCBwYXJhbGxheCBlZmZlY3Qgd2lsbCBsaXN0ZW4gdG8gbW91c2UgbW92ZSBldmVudHMgb24gdGhlIHdob2xlIGRvY3VtZW50LCBub3Qgb25seSB0aGUgc2VsZWN0ZWQgZWxlbWVudFxuICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHNldHRpbmdzLm1vdXNlLWV2ZW50LWVsZW1lbnQgLSBTdHJpbmcgc2VsZWN0b3Igb3IgbGluayB0byBIVE1MLWVsZW1lbnQgd2hhdCB3aWxsIGJlIGxpc3RlbiBtb3VzZSBldmVudHNcbiAgICogQHBhcmFtIHtib29sZWFufSBzZXR0aW5ncy5yZXNldCAtIGZhbHNlID0gSWYgdGhlIHRpbHQgZWZmZWN0IGhhcyB0byBiZSByZXNldCBvbiBleGl0XG4gICAqIEBwYXJhbSB7Z3lyb3Njb3BlfSBzZXR0aW5ncy5neXJvc2NvcGUgLSBFbmFibGUgdGlsdGluZyBieSBkZXZpY2VvcmllbnRhdGlvbiBldmVudHNcbiAgICogQHBhcmFtIHtneXJvc2NvcGVTZW5zaXRpdml0eX0gc2V0dGluZ3MuZ3lyb3Njb3BlU2Vuc2l0aXZpdHkgLSBCZXR3ZWVuIDAgYW5kIDEgLSBUaGUgYW5nbGUgYXQgd2hpY2ggbWF4IHRpbHQgcG9zaXRpb24gaXMgcmVhY2hlZC4gMSA9IDkwZGVnLCAwLjUgPSA0NWRlZywgZXRjLi5cbiAgICogQHBhcmFtIHtneXJvc2NvcGVTYW1wbGVzfSBzZXR0aW5ncy5neXJvc2NvcGVTYW1wbGVzIC0gSG93IG1hbnkgZ3lyb3Njb3BlIG1vdmVzIHRvIGRlY2lkZSB0aGUgc3RhcnRpbmcgcG9zaXRpb24uXG4gICAqL1xuXG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLmV4dGVuZFNldHRpbmdzID0gZnVuY3Rpb24gZXh0ZW5kU2V0dGluZ3Moc2V0dGluZ3MpIHtcbiAgICB2YXIgZGVmYXVsdFNldHRpbmdzID0ge1xuICAgICAgcmV2ZXJzZTogZmFsc2UsXG4gICAgICBtYXg6IDE1LFxuICAgICAgc3RhcnRYOiAwLFxuICAgICAgc3RhcnRZOiAwLFxuICAgICAgcGVyc3BlY3RpdmU6IDEwMDAsXG4gICAgICBlYXNpbmc6IFwiY3ViaWMtYmV6aWVyKC4wMywuOTgsLjUyLC45OSlcIixcbiAgICAgIHNjYWxlOiAxLFxuICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgIHRyYW5zaXRpb246IHRydWUsXG4gICAgICBheGlzOiBudWxsLFxuICAgICAgZ2xhcmU6IGZhbHNlLFxuICAgICAgXCJtYXgtZ2xhcmVcIjogMSxcbiAgICAgIFwiZ2xhcmUtcHJlcmVuZGVyXCI6IGZhbHNlLFxuICAgICAgXCJmdWxsLXBhZ2UtbGlzdGVuaW5nXCI6IGZhbHNlLFxuICAgICAgXCJtb3VzZS1ldmVudC1lbGVtZW50XCI6IG51bGwsXG4gICAgICByZXNldDogdHJ1ZSxcbiAgICAgIGd5cm9zY29wZTogdHJ1ZSxcbiAgICAgIGd5cm9zY29wZU1pbkFuZ2xlWDogLTQ1LFxuICAgICAgZ3lyb3Njb3BlTWF4QW5nbGVYOiA0NSxcbiAgICAgIGd5cm9zY29wZU1pbkFuZ2xlWTogLTQ1LFxuICAgICAgZ3lyb3Njb3BlTWF4QW5nbGVZOiA0NSxcbiAgICAgIGd5cm9zY29wZVNhbXBsZXM6IDEwXG4gICAgfTtcblxuICAgIHZhciBuZXdTZXR0aW5ncyA9IHt9O1xuICAgIGZvciAodmFyIHByb3BlcnR5IGluIGRlZmF1bHRTZXR0aW5ncykge1xuICAgICAgaWYgKHByb3BlcnR5IGluIHNldHRpbmdzKSB7XG4gICAgICAgIG5ld1NldHRpbmdzW3Byb3BlcnR5XSA9IHNldHRpbmdzW3Byb3BlcnR5XTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5lbGVtZW50Lmhhc0F0dHJpYnV0ZShcImRhdGEtdGlsdC1cIiArIHByb3BlcnR5KSkge1xuICAgICAgICB2YXIgYXR0cmlidXRlID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGlsdC1cIiArIHByb3BlcnR5KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBuZXdTZXR0aW5nc1twcm9wZXJ0eV0gPSBKU09OLnBhcnNlKGF0dHJpYnV0ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBuZXdTZXR0aW5nc1twcm9wZXJ0eV0gPSBhdHRyaWJ1dGU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld1NldHRpbmdzW3Byb3BlcnR5XSA9IGRlZmF1bHRTZXR0aW5nc1twcm9wZXJ0eV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1NldHRpbmdzO1xuICB9O1xuXG4gIFZhbmlsbGFUaWx0LmluaXQgPSBmdW5jdGlvbiBpbml0KGVsZW1lbnRzLCBzZXR0aW5ncykge1xuICAgIGlmIChlbGVtZW50cyBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgIGVsZW1lbnRzID0gW2VsZW1lbnRzXTtcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudHMgaW5zdGFuY2VvZiBOb2RlTGlzdCkge1xuICAgICAgZWxlbWVudHMgPSBbXS5zbGljZS5jYWxsKGVsZW1lbnRzKTtcbiAgICB9XG5cbiAgICBpZiAoIShlbGVtZW50cyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIGlmICghKFwidmFuaWxsYVRpbHRcIiBpbiBlbGVtZW50KSkge1xuICAgICAgICBlbGVtZW50LnZhbmlsbGFUaWx0ID0gbmV3IFZhbmlsbGFUaWx0KGVsZW1lbnQsIHNldHRpbmdzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gVmFuaWxsYVRpbHQ7XG59KCk7XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgLyogZXhwb3NlIHRoZSBjbGFzcyB0byB3aW5kb3cgKi9cbiAgd2luZG93LlZhbmlsbGFUaWx0ID0gVmFuaWxsYVRpbHQ7XG5cbiAgLyoqXG4gICAqIEF1dG8gbG9hZFxuICAgKi9cbiAgVmFuaWxsYVRpbHQuaW5pdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtdGlsdF1cIikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZhbmlsbGFUaWx0O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcIi4vY3NzUmVzZXQuY3NzXCI7XG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IGV4cGxvc2lvbkljb24gZnJvbSBcIi4vQXNzZXRzL2V4cGxvc2lvbi5wbmdcIjtcbmltcG9ydCBTaW5rSWNvbiBmcm9tIFwiLi9Bc3NldHMvc2lua2luZy5wbmdcIjtcbmltcG9ydCBWYW5pbGxhVGlsdCBmcm9tIFwidmFuaWxsYS10aWx0XCI7XG5pbXBvcnQge3BsYXllcn0gZnJvbSAnLi9Bc3NldHMvbW9kdWxlcy9wbGF5ZXJGYWN0b3J5J1xuaW1wb3J0IHtzaGlwfSBmcm9tICcuL0Fzc2V0cy9tb2R1bGVzL3NoaXBmYWN0b3J5J1xuaW1wb3J0IHsgZ2VuZXJhdGVTY29yZUJvYXJkIH0gZnJvbSBcIi4vQXNzZXRzL21vZHVsZXMvc2NvcmVCb2FyZFwiO1xuaW1wb3J0IHsgZ2VuZXJhdGVQbGF5ZXJUdXJucyB9IGZyb20gXCIuL0Fzc2V0cy9tb2R1bGVzL3BsYXllclR1cm5zXCI7XG5pbXBvcnQgeyB0aWxlQmFja2dyb3VuZENvbG9yIH0gZnJvbSBcIi4vQXNzZXRzL21vZHVsZXMvdGlsZUJhY2tncm91bmRDb2xvclwiO1xuXG5cblxuXG4vL2xldCBhbGxQbGF5ZXIxUG9zID0gW107XG4vL2xldCBhbGxQbGF5ZXIyUG9zID0gW107XG4vL2xldCBhbGxTaGlwcyA9IFtdO1xuLy9sZXQgdG90YWxIaXRzID0gW107XG5cbmNvbnN0IGdldEFsbElucHV0cyA9ICgoKSA9PiB7XG4gICAgY29uc3QgcGFnZXRpbHQgPSAoYmFja0VsZW1lbnQpID0+e1xuICAgICAgICBWYW5pbGxhVGlsdC5pbml0KGJhY2tFbGVtZW50KSx7XG4gICAgICAgICAgICBtYXg6MzAsXG4gICAgICAgICAgICBzcGVlZDoxMDAsXG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHBsYXllcmZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZXh0XCIpO1xuICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1Db250YWluZXJcIik7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybVwiKVxuICAgIGNvbnN0IHNoaXBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwRm9ybUNvbnRhaW5lclwiKTtcbiAgICBjb25zdCBmb3JtSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtSGVhZGVyXCIpO1xuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvZ29cIilcbiAgICBwYWdldGlsdChmb3JtKVxuICAgIHBsYXllcmZpZWxkLm9ua2V5cHJlc3MgPSBmdW5jdGlvbiBnZXRwbGF5ZXIxbmFtZShlKSB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT0gMTMpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChwbGF5ZXJmaWVsZC5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXJmaWVsZC5zZXRDdXN0b21WYWxpZGl0eShcIlwiKTtcbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyMSA9IG5ldyBwbGF5ZXIoYCR7cGxheWVyZmllbGQudmFsdWV9YCk7XG4gICAgICAgICAgICAgICAgZ2V0UGxheWVyMk5hbWUocGxheWVyMSk7XG4gICAgICAgICAgICAgICAgcGxheWVyZmllbGQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcGxheWVyZmllbGQuc2V0Q3VzdG9tVmFsaWRpdHkoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBuYW1lXCIpO1xuICAgICAgICAgICAgICAgIHBsYXllcmZpZWxkLnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGdldFBsYXllcjJOYW1lID0gKHBsYXllcjEpID0+IHtcbiAgICAgICAgZm9ybUhlYWRlci50ZXh0Q29udGVudCA9IFwiV2VsY29tZSBQbGF5ZXIgMiwgRW50ZXIgeW91ciBuYW1lOlwiO1xuICAgICAgICBwbGF5ZXJmaWVsZC5vbmtleXByZXNzID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICAgIGlmIChhLmtleUNvZGUgPT0gMTMpIHtcbiAgICAgICAgICAgICAgICBhLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcGxheWVyZmllbGQucmVwb3J0VmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyZmllbGQuY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwbGF5ZXIyID0gbmV3IHBsYXllcihgJHtwbGF5ZXJmaWVsZC52YWx1ZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyZmllbGQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBnZXRTdGFydGluZ1BsYXllcihwbGF5ZXIxLCBwbGF5ZXIyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBjb25zdCBnZXRTdGFydGluZ1BsYXllciA9IChwbGF5ZXIxLCBwbGF5ZXIyKSA9PiB7XG4gICAgICAgIGZvcm1IZWFkZXIudGV4dENvbnRlbnQgPSBcIkVudGVyIFN0YXJ0aW5nIFBsYXllclwiO1xuICAgICAgICBwbGF5ZXJmaWVsZC5wbGFjZWhvbGRlciA9IFwicGxheWVyMSBvciBwbGF5ZXIyXCI7XG4gICAgICAgIHBsYXllcmZpZWxkLnZhbHVlID0gXCJwbGF5ZXIxXCI7XG4gICAgICAgIHBsYXllcmZpZWxkLm9ua2V5cHJlc3MgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgaWYgKGkua2V5Q29kZSA9PSAxMyAmJiAocGxheWVyZmllbGQudmFsdWUudG9Mb3dlckNhc2UoKSA9PSBcInBsYXllcjFcIiB8fCBwbGF5ZXJmaWVsZC52YWx1ZS50b0xvd2VyQ2FzZSgpID09IFwicGxheWVyMlwiKSkge1xuICAgICAgICAgICAgICAgIGkucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRpbmdQbGF5ZXIgPSBwbGF5ZXJmaWVsZC52YWx1ZTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJmaWVsZC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgZ2V0Qm9hcmRTaXplVmFsdWVzKHBsYXllcjEsIHBsYXllcjIsIHN0YXJ0aW5nUGxheWVyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaS5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgICAgICAgICAgaS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHBsYXllcmZpZWxkLnNldEN1c3RvbVZhbGlkaXR5KFwiRW50ZXIgcGxheWVyMSBvciBwbGF5ZXIyXCIpO1xuICAgICAgICAgICAgICAgIHBsYXllcmZpZWxkLnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IGdldEJvYXJkU2l6ZVZhbHVlcyA9IChwbGF5ZXIxLCBwbGF5ZXIyLCBzdGFydGluZ1BsYXllcikgPT4ge1xuICAgICAgICBmb3JtSGVhZGVyLnRleHRDb250ZW50ID0gXCJFbnRlciB0aGUgc2l6ZSBvZiB0aGUgR2FtZSBCb2FyZDpcIjtcbiAgICAgICAgcGxheWVyZmllbGQudmFsdWUgPSBcInNtYWxsXCI7XG4gICAgICAgIHBsYXllcmZpZWxkLnBsYWNlaG9sZGVyID0gXCJtZWRpdW0gb3Igc21hbGxcIjtcbiAgICAgICAgcGxheWVyZmllbGQub25rZXlwcmVzcyA9IGZ1bmN0aW9uIChiKSB7XG4gICAgICAgICAgICBpZiAoYi5rZXlDb2RlID09IDEzICYmIChwbGF5ZXJmaWVsZC52YWx1ZS50b0xvd2VyQ2FzZSgpID09IFwibWVkaXVtXCIgfHwgcGxheWVyZmllbGQudmFsdWUudG9Mb3dlckNhc2UoKSA9PSBcInNtYWxsXCIpKSB7XG4gICAgICAgICAgICAgICAgYi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0dGluZyBzaGlwIHZhbHVlc1wiKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJmaWVsZC5zZXRDdXN0b21WYWxpZGl0eShcIlwiKTtcbiAgICAgICAgICAgICAgICBsZXQgZ2FtZUJvYXJkU2l6ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGV4dFwiKS52YWx1ZTtcbiAgICAgICAgICAgICAgICBnZXRTaGlwVmFsdWVzKHBsYXllcjEsIHBsYXllcjIsIHN0YXJ0aW5nUGxheWVyLCBnYW1lQm9hcmRTaXplKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYi5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyZmllbGQuc2V0Q3VzdG9tVmFsaWRpdHkoXCJFbnRlciBtZWRpdW0gb3Igc21hbGwgZm9yIGJvYXJkIHNpemVcIik7XG4gICAgICAgICAgICAgICAgcGxheWVyZmllbGQucmVwb3J0VmFsaWRpdHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0U2hpcFZhbHVlcyA9IChwbGF5ZXIxLCBwbGF5ZXIyLCBzdGFydGluZ1BsYXllciwgZ2FtZUJvYXJkU2l6ZSkgPT4ge1xuICAgICAgICBsZXQgcG9ydHJhaXRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcG9ydHJhaXROdW1cIik7XG4gICAgICAgIGNvbnN0IHBvcnRyYWl0TnVtVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcG9ydHJhaXRMYWJlbE51bVwiKTtcbiAgICAgICAgY29uc3QgbGFuZHNjYXBlTnVtVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFuZHNjYXBlTGFiZWxOdW1cIik7XG4gICAgICAgIGNvbnN0IG1pbkxhYmVsTnVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtaW5MYWJlbE51bVwiKTtcbiAgICAgICAgY29uc3QgbWF4TGFiZWxOdW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21heExhYmVsTnVtXCIpO1xuICAgICAgICBsZXQgbGFuZHNjYXBlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhbmRzY2FwZU51bVwiKTtcbiAgICAgICAgbGV0IG1pbkxlbmd0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWluTGVuZ3RoXCIpO1xuICAgICAgICBsZXQgbWF4TGVuZ3RoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYXhMZW5ndGhcIik7XG4gICAgICAgIC8vbGV0IG1pbkxlbmd0aFZhbHVlID0gcGFyc2VJbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtaW5MZW5ndGhcIikudmFsdWUpXG4gICAgICAgIC8vbGV0IG1heExlbmd0aFZhbHVlID0gcGFyc2VJbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYXhMZW5ndGhcIikudmFsdWUpXG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwRm9ybVwiKTtcblxuICAgICAgICBwYWdldGlsdChmb3JtKVxuXG4gICAgICAgIGlmIChnYW1lQm9hcmRTaXplID09PSBcInNtYWxsXCIpIHtcbiAgICAgICAgICAgIGdhbWVCb2FyZFNpemUgPSAxMDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZ2FtZUJvYXJkU2l6ZSA9PT0gXCJtZWRpdW1cIikge1xuICAgICAgICAgICAgZ2FtZUJvYXJkU2l6ZSA9IDQwMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1Db250YWluZXIuY2xhc3NMaXN0LmFkZChcIm1vdmVkXCIpO1xuICAgICAgICBzaGlwZm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibW92ZWRcIik7XG4gICAgICAgIGlmIChnYW1lQm9hcmRTaXplID09PSAxMDApIHtcbiAgICAgICAgICAgIHBvcnRyYWl0SW5wdXQubWF4ID0gXCI1XCI7XG4gICAgICAgICAgICBsYW5kc2NhcGVJbnB1dC5tYXggPSBcIjVcIjtcbiAgICAgICAgICAgIG1pbkxlbmd0aC5tYXggPSBcIjVcIjtcbiAgICAgICAgICAgIG1heExlbmd0aC5tYXggPSBcIjVcIjtcbiAgICAgICAgICAgIHBvcnRyYWl0TnVtVGV4dC50ZXh0Q29udGVudCA9IFwiKDEtNSlcIjtcbiAgICAgICAgICAgIGxhbmRzY2FwZU51bVRleHQudGV4dENvbnRlbnQgPSBcIigxLTUpXCI7XG4gICAgICAgICAgICBtaW5MYWJlbE51bS50ZXh0Q29udGVudCA9IFwiKDEtNSlcIjtcbiAgICAgICAgICAgIG1heExhYmVsTnVtLnRleHRDb250ZW50ID0gXCIoMS01KVwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBsYXlidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXlCdXR0b25cIik7XG4gICAgICAgIHBsYXlidXR0b24ub25jbGljayA9IGZ1bmN0aW9uIChiKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHBhcnNlSW50KG1pbkxlbmd0aC52YWx1ZSksbWF4TGVuZ3RoVmFsdWUpO1xuICAgICAgICAgICAgbWF4TGVuZ3RoLnNldEN1c3RvbVZhbGlkaXR5KFwiXCIpO1xuICAgICAgICAgICAgZm9ybS5yZXBvcnRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgaWYgKHBhcnNlSW50KG1heExlbmd0aC52YWx1ZSkgPD0gcGFyc2VJbnQobWluTGVuZ3RoLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIG1heExlbmd0aC5zZXRDdXN0b21WYWxpZGl0eShcIk1heGltdW0gbGVuZ3RoIG11c3QgYmUgbW9yZSB0aGFuIG1pbmltdW0gbGVuZ3RoXCIpO1xuICAgICAgICAgICAgICAgIG1heExlbmd0aC5yZXBvcnRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJzZUludChtYXhMZW5ndGgudmFsdWUpID4gcGFyc2VJbnQobWluTGVuZ3RoLnZhbHVlKSAmJiBmb3JtLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICAgICAgICAgIG1heExlbmd0aC5zZXRDdXN0b21WYWxpZGl0eShcIlwiKTtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVNoaXBzKHBsYXllcjEsIHBsYXllcjIsIHN0YXJ0aW5nUGxheWVyLCBnYW1lQm9hcmRTaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xufSkoKTtcblxuY29uc3QgZ2VuZXJhdGVTaGlwcyA9IChwbGF5ZXIxLCBwbGF5ZXIyLCBzdGFydGluZ1BsYXllciwgZ2FtZUJvYXJkU2l6ZSkgPT4ge1xuICAgIGxldCBhbGxTaGlwcyA9IFtdXG4gICAgLy9jb25zdCBzaGlwZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcEZvcm1Db250YWluZXJcIik7XG4gICAgY29uc3QgY3J1aXNlcnNOdW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BvcnRyYWl0TnVtXCIpLnZhbHVlO1xuICAgIGNvbnN0IGRlc3Ryb3llcnNOdW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhbmRzY2FwZU51bVwiKS52YWx1ZTtcbiAgICBsZXQgbWF4TGVuZ3RoID0gcGFyc2VJbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYXhMZW5ndGhcIikudmFsdWUpO1xuICAgIGxldCBtaW5MZW5ndGggPSBwYXJzZUludChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21pbkxlbmd0aFwiKS52YWx1ZSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lQ29udGFpbmVyMVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lQ29udGFpbmVyMlwiKS5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwRm9ybUNvbnRhaW5lclwiKS5jbGFzc0xpc3QuYWRkKFwic2xpZGVEb3duXCIpO1xuXG4gICAgY29uc3QgcmFuZG9tU2hpcExlbmd0aCA9IChtaW5MZW5ndGgsIG1heExlbmd0aCkgPT4ge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heExlbmd0aCAtIG1pbkxlbmd0aCArIDEpICsgbWluTGVuZ3RoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2VuZXJhdGVDcnVpc2VycyA9IChtaW5MZW5ndGgsIG1heExlbmd0aCkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNydWlzZXJzTnVtOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByYW5kb21MZW5ndGggPSByYW5kb21TaGlwTGVuZ3RoKG1pbkxlbmd0aCwgbWF4TGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcjFjcnVpc2VycyA9IHNoaXAocmFuZG9tTGVuZ3RoLCBcInBvcnRyYWl0XCIsIFwicGxheWVyT25lXCIsIGdhbWVCb2FyZFNpemUpO1xuICAgICAgICAgICAgY29uc3QgcGxheWVyMmNydWlzZXJzID0gc2hpcChyYW5kb21MZW5ndGgsIFwicG9ydHJhaXRcIiwgXCJwbGF5ZXJUd29cIiwgZ2FtZUJvYXJkU2l6ZSk7XG4gICAgICAgICAgICBhbGxTaGlwcy5wdXNoKHBsYXllcjFjcnVpc2VycywgcGxheWVyMmNydWlzZXJzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZ2VuZXJhdGVEZXN0cm95ZXJzID0gKG1pbkxlbmd0aCwgbWF4TGVuZ3RoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVzdHJveWVyc051bTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcmFuZG9tTGVuZ3RoID0gcmFuZG9tU2hpcExlbmd0aChtaW5MZW5ndGgsIG1heExlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXIxRGVzdHJveWVycyA9IHNoaXAocmFuZG9tTGVuZ3RoLCBcImxhbmRzY2FwZVwiLCBcInBsYXllck9uZVwiLCBnYW1lQm9hcmRTaXplKTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcjJEZXN0cm95ZXJzID0gc2hpcChyYW5kb21MZW5ndGgsIFwibGFuZHNjYXBlXCIsIFwicGxheWVyVHdvXCIsIGdhbWVCb2FyZFNpemUpO1xuICAgICAgICAgICAgYWxsU2hpcHMucHVzaChwbGF5ZXIxRGVzdHJveWVycywgcGxheWVyMkRlc3Ryb3llcnMpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFxuXG4gICAgZ2VuZXJhdGVDcnVpc2VycyhtaW5MZW5ndGgsIG1heExlbmd0aCk7XG4gICAgZ2VuZXJhdGVEZXN0cm95ZXJzKG1pbkxlbmd0aCwgbWF4TGVuZ3RoKTtcbiAgICBnZW5lcmF0ZVNjb3JlQm9hcmQocGxheWVyMSwgcGxheWVyMiwgYWxsU2hpcHMpO1xuICAgIGdlbmVyYXRlUGxheWVyVHVybnMocGxheWVyMSwgcGxheWVyMiwgc3RhcnRpbmdQbGF5ZXIsIGdhbWVCb2FyZFNpemUsIGFsbFNoaXBzKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiYWxsIHBsYXllciAxIHBvc3Rpb25zXCIgKyBhbGxQbGF5ZXIxUG9zKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiYWxsIHBsYXllciAyIHBvc3Rpb25zXCIgKyBhbGxQbGF5ZXIyUG9zKTtcbn07XG5cblxuZXhwb3J0IHtleHBsb3Npb25JY29uLCBTaW5rSWNvbn1cblxuXG5cblxuXG5cblxuIl0sIm5hbWVzIjpbImdlbmVyYXRlU2NvcmVCb2FyZCIsImV4cGxvc2lvbkljb24iLCJzaW5rSWNvbiIsImNoZWNrSGl0cyIsInBsYXllcjEiLCJwbGF5ZXIyIiwiYWxsU2hpcHMiLCJ0b3RhbEhpdHMiLCJhZGRISXRJY29uIiwiaGl0IiwiZGF0YWlkIiwic3Vic3RyIiwiZGF0YWtleSIsImhpdFRpbGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJoYXNDaGlsZE5vZGVzIiwiaGl0SW1hZ2UiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic3JjIiwiYXBwZW5kQ2hpbGQiLCJmb3JFYWNoIiwic2hpcCIsInBvc2l0aW9uIiwiZmlsdGVyIiwicG9zaXRpb25OdW0iLCJpbmNsdWRlcyIsImhpdHMiLCJjaGVja1NoaXBEZXN0cm95ZWQiLCJkZXN0cm95U2hpcCIsIm51bWJlciIsInNoaXBQb3MiLCJmaXJzdENoaWxkIiwiY2hlY2tGb3JEZXN0cm95ZWQiLCJldmVyeSIsInBvcyIsInRpbGVCYWNrZ3JvdW5kQ29sb3IiLCJnZW5lcmF0ZWJvYXJkIiwiZ2FtZUJvYXJkU2l6ZSIsInBsYXllcjFnYW1lVGlsZSIsInBsYXllcjJnYW1lVGlsZSIsImdhbWVDb250YWluZXIxIiwiZ2FtZUNvbnRhaW5lcjIiLCJwbGF5ZXJ0dXJuSGVhZGVyIiwic3R5bGUiLCJncmlkVGVtcGxhdGVDb2x1bW5zIiwiZ3JpZFRlbXBsYXRlUm93cyIsInBsYXllclRpbGVzIiwicGxheWVyVGlsZSIsImkiLCJ0aWxlIiwiY2xvbmVOb2RlIiwic2V0QXR0cmlidXRlIiwiYXR0YWNrU2hpcCIsImUiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJjb25zb2xlIiwibG9nIiwidHVybiIsImhpdE51bSIsInB1c2giLCJvbmNsaWNrIiwidGV4dENvbnRlbnQiLCJuYW1lIiwiaWQiLCJyZW1vdmUiLCJwbGF5ZXIiLCJjb25zdHJ1Y3RvciIsImdlbmVyYXRlUGxheWVyVHVybnMiLCJzdGFydGluZ1BsYXllciIsInBsYXllcjFIZWFkZXIiLCJwbGF5ZXIySGVhZGVyIiwicGxheWVyMVNjb3JlIiwicGxheWVyMlNjb3JlIiwicGxheWVyVHVybkhlYWRlciIsInJlbWFpbmluZ1BsYXllcjFTaGlwcyIsImxlbmd0aCIsInJlbWFpbmluZ1BsYXllcjJTaGlwcyIsImRlc3Ryb3llZFBsYXllcjFTaGlwcyIsImRlc3Ryb3llZFBsYXllcjJTaGlwcyIsImFsbFBsYXllcjFQb3MiLCJhbGxQbGF5ZXIyUG9zIiwib3JpZW50IiwiZ2V0TGVuZ3RoIiwiaW5pdGlhbFBvcyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdhbWVCb2FyZExlbmd0aCIsInNxcnQiLCJjaGVja05vRHVwbGljYXRlTGFuZHNjYXBlUG9zIiwiUG9zIiwidGVtcFBvcyIsInB1c2hUb0FycmF5TGFuZHNjYXBlIiwiZmluYWxQb3MiLCJjaGVja1Bvc0xhbmRzY2FwZSIsInRlc3RQb3MiLCJjaGVja05vRHVwbGljYXRlUG90cmFpdFBvcyIsImNoZWNrUG9zUG9ydHJhaXQiLCJwdXNodG9BcnJheVBvcnRyYWl0IiwicGxheWVyMUNvbnRhaW5lciIsInBsYXllcjJDb250YWluZXIiLCJiYWNrZ3JvdW5kQ29sb3IiLCJTaW5rSWNvbiIsIlZhbmlsbGFUaWx0IiwiZ2V0QWxsSW5wdXRzIiwicGFnZXRpbHQiLCJiYWNrRWxlbWVudCIsImluaXQiLCJtYXgiLCJzcGVlZCIsInBsYXllcmZpZWxkIiwiZm9ybUNvbnRhaW5lciIsImZvcm0iLCJzaGlwZm9ybUNvbnRhaW5lciIsImZvcm1IZWFkZXIiLCJsb2dvIiwib25rZXlwcmVzcyIsImdldHBsYXllcjFuYW1lIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0IiwiY2hlY2tWYWxpZGl0eSIsInNldEN1c3RvbVZhbGlkaXR5IiwidmFsdWUiLCJnZXRQbGF5ZXIyTmFtZSIsInJlcG9ydFZhbGlkaXR5IiwiYSIsImdldFN0YXJ0aW5nUGxheWVyIiwicGxhY2Vob2xkZXIiLCJ0b0xvd2VyQ2FzZSIsImdldEJvYXJkU2l6ZVZhbHVlcyIsImIiLCJnZXRTaGlwVmFsdWVzIiwicG9ydHJhaXRJbnB1dCIsInBvcnRyYWl0TnVtVGV4dCIsImxhbmRzY2FwZU51bVRleHQiLCJtaW5MYWJlbE51bSIsIm1heExhYmVsTnVtIiwibGFuZHNjYXBlSW5wdXQiLCJtaW5MZW5ndGgiLCJtYXhMZW5ndGgiLCJwbGF5YnV0dG9uIiwicGFyc2VJbnQiLCJnZW5lcmF0ZVNoaXBzIiwiY3J1aXNlcnNOdW0iLCJkZXN0cm95ZXJzTnVtIiwiZGlzcGxheSIsInJhbmRvbVNoaXBMZW5ndGgiLCJnZW5lcmF0ZUNydWlzZXJzIiwicmFuZG9tTGVuZ3RoIiwicGxheWVyMWNydWlzZXJzIiwicGxheWVyMmNydWlzZXJzIiwiZ2VuZXJhdGVEZXN0cm95ZXJzIiwicGxheWVyMURlc3Ryb3llcnMiLCJwbGF5ZXIyRGVzdHJveWVycyJdLCJzb3VyY2VSb290IjoiIn0=