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
/* harmony export */   "checkShipDestroyed": () => (/* binding */ checkShipDestroyed),
/* harmony export */   "computerHit": () => (/* binding */ computerHit)
/* harmony export */ });
/* harmony import */ var _scoreBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scoreBoard */ "./src/Assets/modules/scoreBoard.js");
/* harmony import */ var _Assets_explosion_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Assets/explosion.png */ "./src/Assets/explosion.png");
/* harmony import */ var _Assets_sinking_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Assets/sinking.png */ "./src/Assets/sinking.png");




const clickRandomTile = (_player, gameBoardSize, hit) => {
  while (true) {
    let tileNum = (Math.floor(Math.random() * gameBoardSize) + 1).toString();
    let tile = _player + tileNum;
    console.log(tile);

    if (!hit.find(element => tile == element)) {
      console.log(hit);
      const tileElement = document.querySelector("[data-id=\"".concat(_player, "\"][data-key=\"").concat(tileNum, "\"]"));
      console.log(tileElement);
      tileElement.click();
      break;
    }
  }
};

const computerHit = (_player, hit, gameBoardSize) => {
  const gameBoardLength = Math.sqrt(gameBoardSize);

  if (hit.length > 0) {
    let surroundingHits = [];
    hit.forEach(hit => {
      const dataid = hit.substr(0, 9);
      const datakey = hit.substr(9, 12);
      const tile = document.querySelector("[data-key=\"".concat(datakey, "\"][data-id=\"").concat(dataid, "\"]"));

      if (tile.className == "hit" && tile.hasChildNodes()) {
        if (tile.firstElementChild.src == _Assets_explosion_png__WEBPACK_IMPORTED_MODULE_1__) {
          const rightTile = document.querySelector("[data-key=\"".concat(parseInt(datakey) + 1, "\"][data-id=\"").concat(dataid, "\"]"));
          const leftTile = document.querySelector("[data-key=\"".concat(parseInt(datakey) - 1, "\"][data-id=\"").concat(dataid, "\"]"));
          const topTile = document.querySelector("[data-key=\"".concat(parseInt(datakey) - gameBoardLength, "\"][data-id=\"").concat(dataid, "\"]"));
          const bottomTile = document.querySelector("[data-key=\"".concat(parseInt(datakey) + gameBoardLength, "\"][data-id=\"").concat(dataid, "\"]"));

          if (rightTile !== null) {
            if (!rightTile.classList.contains("hit")) {
              console.log(rightTile);
              rightTile.click();
              surroundingHits.push("hit");
            } else if (leftTile !== null) {
              if (!leftTile.classList.contains("hit")) {
                console.log(leftTile);
                leftTile.click();
                surroundingHits.push("hit");
              } else if (topTile !== null) {
                if (!topTile.classList.contains("hit")) {
                  console.log(topTile);
                  topTile.click();
                  surroundingHits.push("hit");
                } else if (bottomTile !== null) {
                  if (!bottomTile.classList.contains("hit")) {
                    console.log(bottomTile);
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
  console.log(gameBoardSize);
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

  const computerMove = (player1, player2, gameBoardSize) => {
    if (player1.turn == 1 && player1.name === "COMPUTER") {
      let computerHitsArray = totalHits.filter(hits => hits.includes("playerOne"));
      (0,_checkHits__WEBPACK_IMPORTED_MODULE_0__.computerHit)("playerOne", computerHitsArray, gameBoardSize);
    } else if (player2.turn == 1 && player2.name === "COMPUTER") {
      let computerHitsArray = totalHits.filter(hits => hits.includes("playerTwo"));
      (0,_checkHits__WEBPACK_IMPORTED_MODULE_0__.computerHit)("playerTwo", computerHitsArray, gameBoardSize);
    }
  };

  const playerTiles = [player1gameTile, player2gameTile];
  playerTiles.forEach(playerTile => {
    for (let i = 0; i < gameBoardSize; i++) {
      const tile = playerTile.cloneNode();
      tile.setAttribute("data-key", i + 1);

      const attackShip = (e, player1, player2) => {
        const tile = e.target.getAttribute("data-id");

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
        if (player1.turn == 1 && !e.target.classList.contains("hit")) {
          if (attackShip(e, player1, player2)) {
            playerturnHeader.textContent = "".concat(player2.name, "'s Turn");
            player1.turn--;
            player2.turn++;
            (0,_tileBackgroundColor__WEBPACK_IMPORTED_MODULE_3__.tileBackgroundColor)(player1, player2);
            computerMove(player1, player2, gameBoardSize);
          }
        } else if (player2.turn == 1 && !e.target.classList.contains("hit")) {
          if (attackShip(e, player1, player2)) {
            playerturnHeader.textContent = "".concat(player1.name, "'s Turn");
            player2.turn--;
            player1.turn++;
            (0,_tileBackgroundColor__WEBPACK_IMPORTED_MODULE_3__.tileBackgroundColor)(player1, player2);
            computerMove(player1, player2, gameBoardSize);
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
  computerMove(player1, player2, gameBoardSize);
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
        for (let i = 0; i < length; ++i) {
          let tempPos = Pos + i;

          if (player == "playerOne" && allPlayer1Pos.includes(tempPos)) {
            return true;
          } else if (player == "playerTwo" && allPlayer2Pos.includes(tempPos)) {
            return true;
          } else if (tempPos > gameBoardSize) {
            return true;
          }
        }
      };

      const pushToArrayLandscape = initialPos => {
        if (!checkNoDuplicateLandscapePos(initialPos)) {
          for (let i = 0; i < length; ++i) {
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
        for (let i = 0; i < length; ++i) {
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
        for (let i = 0; i < length; ++i) {
          let tempPos = initialPos + i * gameBoardLength;

          if (player == "playerOne" && allPlayer1Pos.includes(tempPos)) {
            return true;
          } else if (player == "playerTwo" && allPlayer2Pos.includes(tempPos)) {
            return true;
          } else if (tempPos > gameBoardSize) {
            return true;
          }
        }
      };

      const checkPosPortrait = initialPos => {
        for (let i = 0; i < length; ++i) {
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
          for (let i = 0; i < length; ++i) {
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
___CSS_LOADER_EXPORT___.push([module.id, ":root{\n    --main-font: 'Source Serif Pro', serif;\n    --secondary-font: 'East Sea Dokdo';\n}\n\n@keyframes disappear {\n    from {\n        visibility: visible;\n        opacity: 1;\n    }\n\n\n    90%{\n        visibility: visible;\n        opacity: 1;\n    }\n\n    to {\n        visibility: hidden;\n        opacity: 0;\n    }\n}\n\n#player1GameTile, #player2GameTile{\n    background-color: #8C6636;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    border: 1px solid black;\n    cursor: pointer;\n    display: grid;\n    place-content: center;\n    box-sizing: border-box;\n}\n#player1GameTile:hover, #player2GameTile:hover{\n    background-color: #8C4236;\n}\n\n\n#player1GameTile.hit, #player2GameTile.hit{\n    background-color: #5B2820;\n}\n\n\n\n.gameContainer1, .gameContainer2{\n    margin: 1rem;\n    width: 42rem;\n    height: 42rem;\n    place-items: center;\n    display: none;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(11, 1fr);\n\n}\n.logo{\n    font-size:  6rem;\n    font-family: var(--secondary-font);\n    margin-bottom: 50px;\n    padding: 20px;\n    transform: translateZ(60px);\n    \n}\n\n#player1Header, #player2Header{\n    grid-column: 1/-1;\n    font-size: 2rem;\n    height: auto;\n    font-family: var(--main-font);\n    \n}\n\n.hitImage{\n    width: 90%;\n    height: 90%;\n    background-size: 80%;\n    background-repeat: no-repeat;\n    background-position: center;\n}\n\n.formContainer{\n    position: fixed;\n    background-color: #8C4236;\n    z-index: 3;\n    width: 100%;\n    height: 100vh;\n    top: 0;\n    left: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transition: transform 1s ease-in-out;\n\n}\n\n.shipFormContainer{\n    position: fixed;\n    background-color: #8C7936;\n    z-index: 2;\n    width: 100%;\n    height: 100vh;\n    top: 0;\n    left: 0;\n    opacity: 0;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    transform: translateY( 100vh) rotate(180deg);\n    transition: transform 1s ease-in-out;\n}\n\n.shipFormContainer.moved{\n    transform: translateY( 0vh) rotate(0deg);\n    opacity: 1;\n}\n.shipFormContainer.moved.slideDown{\n    transform: translateY(-100vh) rotate(180deg);\n    animation: disappear 1s ease-in-out;\n    visibility: hidden;\n    opacity: 0;\n}\n\n.formContainer.moved{\n    transform: translateY( 100vh) rotate(180deg);\n    animation: disappear 1s ease-in-out;\n    visibility: hidden;\n    opacity: 0;\n}\n\n#form, #shipForm{\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    padding:30px;\n    border-radius: 30px;\n    transform-style: preserve-3d;\n    transform: perspective(1000px);\n}\n\n#playerTurn{\n    font-family: var(--main-font);\n    font-size: 3.5rem;\n    margin-top: 20px;\n    border-bottom: 1px solid black;\n    \n    \n}\n\n#player1Score, #player2Score{\n    font-family: var(--main-font);\n    font-size: 1.5rem;\n    margin: 15px;\n}\n\n.header{\n    grid-column: 1/ -1;\n    text-align: center;\n    background-color: #28683B;\n    border-radius: 2rem;\n    box-shadow: 1px 1px 10px rgb(53, 53, 53);\n    display: none;\n    flex-direction: column;\n    align-items: center;\n    padding: 10px;\n    margin: 30px;\n    width: 50%;\n}\n\ninput[type=\"text\"], input[type=\"number\"]{\n    width: 70%;\n    height: 3rem;\n    background-color:  transparent;\n    border: none;\n    border-bottom: 1px solid black;\n    margin-bottom: 20px;\n    text-align: center;\n    font-family: var(--main-font);\n    font-size: 2rem;\n}\n\ninput[type=\"text\"]:focus,  input[type=\"number\"]:focus{\n    outline: none;\n}\n\nh1{\n    margin-bottom: 20px;\n    font-family: var(--main-font);\n    font-size: 2rem;\n}\n\nbutton{\n    width: 200px;\n    height: 50px;\n    background-color: #8C4236;\n    box-shadow: 2px 2px 2px rgb(53, 53, 53);\n    cursor: pointer;\n    border: none;\n}\n\nlabel{\n    font-family: var(--main-font);\n    font-size: 1.4rem;\n}\n\nimg{\n    width: 30px;\n}\n\nbody{\n    background-color: #264559;\n    display: grid;\n    grid-template-rows: 1fr 5fr;\n    grid-template-columns: 1fr 1fr;\n    place-items: center;\n    height: 100vh;\n    width: 100%;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,sCAAsC;IACtC,kCAAkC;AACtC;;AAEA;IACI;QACI,mBAAmB;QACnB,UAAU;IACd;;;IAGA;QACI,mBAAmB;QACnB,UAAU;IACd;;IAEA;QACI,kBAAkB;QAClB,UAAU;IACd;AACJ;;AAEA;IACI,yBAAyB;IACzB,WAAW;IACX,YAAY;IACZ,SAAS;IACT,uBAAuB;IACvB,eAAe;IACf,aAAa;IACb,qBAAqB;IACrB,sBAAsB;AAC1B;AACA;IACI,yBAAyB;AAC7B;;;AAGA;IACI,yBAAyB;AAC7B;;;;AAIA;IACI,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,aAAa;IACb,sCAAsC;IACtC,mCAAmC;;AAEvC;AACA;IACI,gBAAgB;IAChB,kCAAkC;IAClC,mBAAmB;IACnB,aAAa;IACb,2BAA2B;;AAE/B;;AAEA;IACI,iBAAiB;IACjB,eAAe;IACf,YAAY;IACZ,6BAA6B;;AAEjC;;AAEA;IACI,UAAU;IACV,WAAW;IACX,oBAAoB;IACpB,4BAA4B;IAC5B,2BAA2B;AAC/B;;AAEA;IACI,eAAe;IACf,yBAAyB;IACzB,UAAU;IACV,WAAW;IACX,aAAa;IACb,MAAM;IACN,OAAO;IACP,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,oCAAoC;;AAExC;;AAEA;IACI,eAAe;IACf,yBAAyB;IACzB,UAAU;IACV,WAAW;IACX,aAAa;IACb,MAAM;IACN,OAAO;IACP,UAAU;IACV,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,4CAA4C;IAC5C,oCAAoC;AACxC;;AAEA;IACI,wCAAwC;IACxC,UAAU;AACd;AACA;IACI,4CAA4C;IAC5C,mCAAmC;IACnC,kBAAkB;IAClB,UAAU;AACd;;AAEA;IACI,4CAA4C;IAC5C,mCAAmC;IACnC,kBAAkB;IAClB,UAAU;AACd;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,YAAY;IACZ,mBAAmB;IACnB,4BAA4B;IAC5B,8BAA8B;AAClC;;AAEA;IACI,6BAA6B;IAC7B,iBAAiB;IACjB,gBAAgB;IAChB,8BAA8B;;;AAGlC;;AAEA;IACI,6BAA6B;IAC7B,iBAAiB;IACjB,YAAY;AAChB;;AAEA;IACI,kBAAkB;IAClB,kBAAkB;IAClB,yBAAyB;IACzB,mBAAmB;IACnB,wCAAwC;IACxC,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,aAAa;IACb,YAAY;IACZ,UAAU;AACd;;AAEA;IACI,UAAU;IACV,YAAY;IACZ,8BAA8B;IAC9B,YAAY;IACZ,8BAA8B;IAC9B,mBAAmB;IACnB,kBAAkB;IAClB,6BAA6B;IAC7B,eAAe;AACnB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,mBAAmB;IACnB,6BAA6B;IAC7B,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,yBAAyB;IACzB,uCAAuC;IACvC,eAAe;IACf,YAAY;AAChB;;AAEA;IACI,6BAA6B;IAC7B,iBAAiB;AACrB;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,yBAAyB;IACzB,aAAa;IACb,2BAA2B;IAC3B,8BAA8B;IAC9B,mBAAmB;IACnB,aAAa;IACb,WAAW;AACf","sourcesContent":[":root{\n    --main-font: 'Source Serif Pro', serif;\n    --secondary-font: 'East Sea Dokdo';\n}\n\n@keyframes disappear {\n    from {\n        visibility: visible;\n        opacity: 1;\n    }\n\n\n    90%{\n        visibility: visible;\n        opacity: 1;\n    }\n\n    to {\n        visibility: hidden;\n        opacity: 0;\n    }\n}\n\n#player1GameTile, #player2GameTile{\n    background-color: #8C6636;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    border: 1px solid black;\n    cursor: pointer;\n    display: grid;\n    place-content: center;\n    box-sizing: border-box;\n}\n#player1GameTile:hover, #player2GameTile:hover{\n    background-color: #8C4236;\n}\n\n\n#player1GameTile.hit, #player2GameTile.hit{\n    background-color: #5B2820;\n}\n\n\n\n.gameContainer1, .gameContainer2{\n    margin: 1rem;\n    width: 42rem;\n    height: 42rem;\n    place-items: center;\n    display: none;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(11, 1fr);\n\n}\n.logo{\n    font-size:  6rem;\n    font-family: var(--secondary-font);\n    margin-bottom: 50px;\n    padding: 20px;\n    transform: translateZ(60px);\n    \n}\n\n#player1Header, #player2Header{\n    grid-column: 1/-1;\n    font-size: 2rem;\n    height: auto;\n    font-family: var(--main-font);\n    \n}\n\n.hitImage{\n    width: 90%;\n    height: 90%;\n    background-size: 80%;\n    background-repeat: no-repeat;\n    background-position: center;\n}\n\n.formContainer{\n    position: fixed;\n    background-color: #8C4236;\n    z-index: 3;\n    width: 100%;\n    height: 100vh;\n    top: 0;\n    left: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transition: transform 1s ease-in-out;\n\n}\n\n.shipFormContainer{\n    position: fixed;\n    background-color: #8C7936;\n    z-index: 2;\n    width: 100%;\n    height: 100vh;\n    top: 0;\n    left: 0;\n    opacity: 0;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    transform: translateY( 100vh) rotate(180deg);\n    transition: transform 1s ease-in-out;\n}\n\n.shipFormContainer.moved{\n    transform: translateY( 0vh) rotate(0deg);\n    opacity: 1;\n}\n.shipFormContainer.moved.slideDown{\n    transform: translateY(-100vh) rotate(180deg);\n    animation: disappear 1s ease-in-out;\n    visibility: hidden;\n    opacity: 0;\n}\n\n.formContainer.moved{\n    transform: translateY( 100vh) rotate(180deg);\n    animation: disappear 1s ease-in-out;\n    visibility: hidden;\n    opacity: 0;\n}\n\n#form, #shipForm{\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    padding:30px;\n    border-radius: 30px;\n    transform-style: preserve-3d;\n    transform: perspective(1000px);\n}\n\n#playerTurn{\n    font-family: var(--main-font);\n    font-size: 3.5rem;\n    margin-top: 20px;\n    border-bottom: 1px solid black;\n    \n    \n}\n\n#player1Score, #player2Score{\n    font-family: var(--main-font);\n    font-size: 1.5rem;\n    margin: 15px;\n}\n\n.header{\n    grid-column: 1/ -1;\n    text-align: center;\n    background-color: #28683B;\n    border-radius: 2rem;\n    box-shadow: 1px 1px 10px rgb(53, 53, 53);\n    display: none;\n    flex-direction: column;\n    align-items: center;\n    padding: 10px;\n    margin: 30px;\n    width: 50%;\n}\n\ninput[type=\"text\"], input[type=\"number\"]{\n    width: 70%;\n    height: 3rem;\n    background-color:  transparent;\n    border: none;\n    border-bottom: 1px solid black;\n    margin-bottom: 20px;\n    text-align: center;\n    font-family: var(--main-font);\n    font-size: 2rem;\n}\n\ninput[type=\"text\"]:focus,  input[type=\"number\"]:focus{\n    outline: none;\n}\n\nh1{\n    margin-bottom: 20px;\n    font-family: var(--main-font);\n    font-size: 2rem;\n}\n\nbutton{\n    width: 200px;\n    height: 50px;\n    background-color: #8C4236;\n    box-shadow: 2px 2px 2px rgb(53, 53, 53);\n    cursor: pointer;\n    border: none;\n}\n\nlabel{\n    font-family: var(--main-font);\n    font-size: 1.4rem;\n}\n\nimg{\n    width: 30px;\n}\n\nbody{\n    background-color: #264559;\n    display: grid;\n    grid-template-rows: 1fr 5fr;\n    grid-template-columns: 1fr 1fr;\n    place-items: center;\n    height: 100vh;\n    width: 100%;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ2ZhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FB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SUFDSDtFQUNKLENBUEQ7O0VBUUEsTUFBTUMsa0JBQWtCLEdBQUcsQ0FBQ1osU0FBRCxFQUFZQyxTQUFaLEtBQTBCO0lBQ2pELEtBQUssSUFBSWhGLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdvRixhQUFwQixFQUFtQ3BGLENBQUMsRUFBcEMsRUFBd0M7TUFDcEMsSUFBSXdGLFlBQVksR0FBR0YsZ0JBQWdCLENBQUNQLFNBQUQsRUFBWUMsU0FBWixDQUFuQztNQUNBLE1BQU1ZLGlCQUFpQixHQUFHMUgsaUVBQUksQ0FBQ3NILFlBQUQsRUFBZSxXQUFmLEVBQTRCLFdBQTVCLEVBQXlDdkssYUFBekMsQ0FBOUI7TUFDQSxNQUFNNEssaUJBQWlCLEdBQUczSCxpRUFBSSxDQUFDc0gsWUFBRCxFQUFlLFdBQWYsRUFBNEIsV0FBNUIsRUFBeUN2SyxhQUF6QyxDQUE5QjtNQUNBeUMsUUFBUSxDQUFDTCxJQUFULENBQWN1SSxpQkFBZCxFQUFpQ0MsaUJBQWpDO0lBQ0g7RUFDSixDQVBEOztFQVFBTixnQkFBZ0IsQ0FBQ1IsU0FBRCxFQUFZQyxTQUFaLENBQWhCO0VBQ0FXLGtCQUFrQixDQUFDWixTQUFELEVBQVlDLFNBQVosQ0FBbEI7RUFDQXBLLDhFQUFrQixDQUFDNEMsT0FBRCxFQUFVQyxPQUFWLEVBQW1CQyxRQUFuQixDQUFsQjtFQUNBbUQsZ0ZBQW1CLENBQUNyRCxPQUFELEVBQVVDLE9BQVYsRUFBbUJxRCxjQUFuQixFQUFtQzdGLGFBQW5DLEVBQWtEeUMsUUFBbEQsQ0FBbkI7QUFDSCxDQXBDRCxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9Bc3NldHMvbW9kdWxlcy9jaGVja0hpdHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9Bc3NldHMvbW9kdWxlcy9nYW1lQm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQXNzZXRzL21vZHVsZXMvcGxheWVyRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0Fzc2V0cy9tb2R1bGVzL3BsYXllclR1cm5zLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQXNzZXRzL21vZHVsZXMvc2NvcmVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0Fzc2V0cy9tb2R1bGVzL3NoaXBmYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQXNzZXRzL21vZHVsZXMvdGlsZUJhY2tncm91bmRDb2xvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2Nzc1Jlc2V0LmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jc3NSZXNldC5jc3M/MmMzMyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy92YW5pbGxhLXRpbHQvbGliL3ZhbmlsbGEtdGlsdC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdlbmVyYXRlU2NvcmVCb2FyZCB9IGZyb20gXCIuL3Njb3JlQm9hcmRcIjtcbmltcG9ydCBleHBsb3Npb25JY29uIGZyb20gXCIuLi8uLi9Bc3NldHMvZXhwbG9zaW9uLnBuZ1wiO1xuaW1wb3J0IHNpbmtJY29uIGZyb20gXCIuLi8uLi9Bc3NldHMvc2lua2luZy5wbmdcIjtcblxuY29uc3QgY2xpY2tSYW5kb21UaWxlID0gKF9wbGF5ZXIsIGdhbWVCb2FyZFNpemUsIGhpdCkgPT4ge1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGxldCB0aWxlTnVtID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdhbWVCb2FyZFNpemUpICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IHRpbGUgPSBfcGxheWVyK3RpbGVOdW1cbiAgICAgICAgY29uc29sZS5sb2codGlsZSlcbiAgICAgICAgaWYgKCFoaXQuZmluZCgoZWxlbWVudCkgPT4gdGlsZSA9PSBlbGVtZW50KSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coaGl0KVxuICAgICAgICAgICAgY29uc3QgdGlsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD1cIiR7X3BsYXllcn1cIl1bZGF0YS1rZXk9XCIke3RpbGVOdW19XCJdYCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aWxlRWxlbWVudClcbiAgICAgICAgICAgIHRpbGVFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmNvbnN0IGNvbXB1dGVySGl0ID0gKF9wbGF5ZXIsIGhpdCwgZ2FtZUJvYXJkU2l6ZSkgPT4ge1xuICAgIGNvbnN0IGdhbWVCb2FyZExlbmd0aCA9IE1hdGguc3FydChnYW1lQm9hcmRTaXplKVxuICAgIGlmIChoaXQubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgc3Vycm91bmRpbmdIaXRzID0gW107XG4gICAgICAgIGhpdC5mb3JFYWNoKChoaXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFpZCA9IGhpdC5zdWJzdHIoMCwgOSk7XG4gICAgICAgICAgICBjb25zdCBkYXRha2V5ID0gaGl0LnN1YnN0cig5LCAxMik7XG4gICAgICAgICAgICBjb25zdCB0aWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEta2V5PVwiJHtkYXRha2V5fVwiXVtkYXRhLWlkPVwiJHtkYXRhaWR9XCJdYCk7XG4gICAgICAgICAgICBpZiAodGlsZS5jbGFzc05hbWUgPT0gXCJoaXRcIiAmJiB0aWxlLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aWxlLmZpcnN0RWxlbWVudENoaWxkLnNyYyA9PSBleHBsb3Npb25JY29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJpZ2h0VGlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWtleT1cIiR7cGFyc2VJbnQoZGF0YWtleSkgKyAxfVwiXVtkYXRhLWlkPVwiJHtkYXRhaWR9XCJdYCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlZnRUaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEta2V5PVwiJHtwYXJzZUludChkYXRha2V5KSAtIDF9XCJdW2RhdGEtaWQ9XCIke2RhdGFpZH1cIl1gKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9wVGlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWtleT1cIiR7cGFyc2VJbnQoZGF0YWtleSkgLSBnYW1lQm9hcmRMZW5ndGh9XCJdW2RhdGEtaWQ9XCIke2RhdGFpZH1cIl1gKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm90dG9tVGlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWtleT1cIiR7cGFyc2VJbnQoZGF0YWtleSkgKyBnYW1lQm9hcmRMZW5ndGh9XCJdW2RhdGEtaWQ9XCIke2RhdGFpZH1cIl1gKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJpZ2h0VGlsZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyaWdodFRpbGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmlnaHRUaWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0VGlsZS5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cnJvdW5kaW5nSGl0cy5wdXNoKFwiaGl0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsZWZ0VGlsZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGVmdFRpbGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxlZnRUaWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0VGlsZS5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXJyb3VuZGluZ0hpdHMucHVzaChcImhpdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRvcFRpbGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0b3BUaWxlLmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codG9wVGlsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcFRpbGUuY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cnJvdW5kaW5nSGl0cy5wdXNoKFwiaGl0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJvdHRvbVRpbGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYm90dG9tVGlsZS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaXRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib3R0b21UaWxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVRpbGUuY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXJyb3VuZGluZ0hpdHMucHVzaChcImhpdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghc3Vycm91bmRpbmdIaXRzLmluY2x1ZGVzKFwiaGl0XCIpKSB7XG4gICAgICAgICAgICBjbGlja1JhbmRvbVRpbGUoX3BsYXllciwgZ2FtZUJvYXJkU2l6ZSwgaGl0KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNsaWNrUmFuZG9tVGlsZShfcGxheWVyLCBnYW1lQm9hcmRTaXplLCBoaXQpO1xuICAgIH1cbn07XG5cbmNvbnN0IGNoZWNrSGl0cyA9IChwbGF5ZXIxLCBwbGF5ZXIyLCBhbGxTaGlwcywgdG90YWxIaXRzKSA9PiB7XG4gICAgY29uc3QgYWRkSEl0SWNvbiA9IChoaXQpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YWlkID0gaGl0LnN1YnN0cigwLCA5KTtcbiAgICAgICAgY29uc3QgZGF0YWtleSA9IGhpdC5zdWJzdHIoOSwgMTIpO1xuICAgICAgICBjb25zdCBoaXRUaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEta2V5PVwiJHtkYXRha2V5fVwiXVtkYXRhLWlkPVwiJHtkYXRhaWR9XCJdYCk7XG4gICAgICAgIGlmICghaGl0VGlsZS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGhpdEltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgIGhpdEltYWdlLmNsYXNzTGlzdC5hZGQoXCJoaXRJbWFnZVwiKTtcbiAgICAgICAgICAgIGhpdEltYWdlLnNyYyA9IGV4cGxvc2lvbkljb247XG4gICAgICAgICAgICBoaXRUaWxlLmFwcGVuZENoaWxkKGhpdEltYWdlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBhbGxTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGxldCBoaXQgPSBzaGlwLnBvc2l0aW9uLmZpbHRlcigocG9zaXRpb25OdW0pID0+IHRvdGFsSGl0cy5pbmNsdWRlcyhwb3NpdGlvbk51bSkpO1xuICAgICAgICBzaGlwLmhpdHMgPSBbLi4uaGl0XTtcbiAgICAgICAgaGl0LmZvckVhY2goKGhpdCkgPT4ge1xuICAgICAgICAgICAgYWRkSEl0SWNvbihoaXQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBnZW5lcmF0ZVNjb3JlQm9hcmQocGxheWVyMSwgcGxheWVyMiwgYWxsU2hpcHMpO1xufTtcblxuY29uc3QgY2hlY2tTaGlwRGVzdHJveWVkID0gKGFsbFNoaXBzKSA9PiB7XG4gICAgY29uc3QgZGVzdHJveVNoaXAgPSAoc2hpcCkgPT4ge1xuICAgICAgICBzaGlwLnBvc2l0aW9uLmZvckVhY2goKG51bWJlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF0YWlkID0gbnVtYmVyLnN1YnN0cigwLCA5KTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFrZXkgPSBudW1iZXIuc3Vic3RyKDksIDEyKTtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBQb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1rZXk9XCIke2RhdGFrZXl9XCJdW2RhdGEtaWQ9XCIke2RhdGFpZH1cIl1gKTtcbiAgICAgICAgICAgIHNoaXBQb3MuZmlyc3RDaGlsZC5zcmMgPSBzaW5rSWNvbjtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBhbGxTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGxldCBjaGVja0ZvckRlc3Ryb3llZCA9IHNoaXAucG9zaXRpb24uZXZlcnkoKHBvcykgPT4gc2hpcC5oaXRzLmluY2x1ZGVzKHBvcykpO1xuICAgICAgICBpZiAoY2hlY2tGb3JEZXN0cm95ZWQpIHtcbiAgICAgICAgICAgIGRlc3Ryb3lTaGlwKHNoaXApO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5leHBvcnQgeyBjaGVja0hpdHMsIGNvbXB1dGVySGl0LCBjaGVja1NoaXBEZXN0cm95ZWQgfTtcbiIsImltcG9ydCB7IGNvbXB1dGVySGl0LCBjaGVja0hpdHMsIGNoZWNrU2hpcERlc3Ryb3llZCB9IGZyb20gXCIuL2NoZWNrSGl0c1wiO1xuaW1wb3J0IHsgcGxheWVyIH0gZnJvbSBcIi4vcGxheWVyRmFjdG9yeVwiO1xuaW1wb3J0IHsgZ2VuZXJhdGVTY29yZUJvYXJkIH0gZnJvbSBcIi4vc2NvcmVCb2FyZFwiO1xuaW1wb3J0IHsgdGlsZUJhY2tncm91bmRDb2xvciB9IGZyb20gXCIuL3RpbGVCYWNrZ3JvdW5kQ29sb3JcIjtcblxuY29uc3QgZ2VuZXJhdGVib2FyZCA9IChnYW1lQm9hcmRTaXplLCBwbGF5ZXIxLCBwbGF5ZXIyLCBhbGxTaGlwcykgPT4ge1xuICAgIGNvbnNvbGUubG9nKGdhbWVCb2FyZFNpemUpXG4gICAgbGV0IHRvdGFsSGl0cyA9IFtdO1xuICAgIGNvbnN0IHBsYXllcjFnYW1lVGlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWVyMUdhbWVUaWxlXCIpO1xuICAgIGNvbnN0IHBsYXllcjJnYW1lVGlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWVyMkdhbWVUaWxlXCIpO1xuICAgIGNvbnN0IGdhbWVDb250YWluZXIxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lQ29udGFpbmVyMVwiKTtcbiAgICBjb25zdCBnYW1lQ29udGFpbmVyMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZUNvbnRhaW5lcjJcIik7XG4gICAgY29uc3QgcGxheWVydHVybkhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWVyVHVyblwiKTtcblxuICAgIGlmIChnYW1lQm9hcmRTaXplID09PSA0MDApIHtcbiAgICAgICAgZ2FtZUNvbnRhaW5lcjEuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IFwicmVwZWF0KDIwLCAxZnIpXCI7XG4gICAgICAgIGdhbWVDb250YWluZXIxLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPSBcInJlcGVhdCgyMSwgMWZyKVwiO1xuICAgICAgICBnYW1lQ29udGFpbmVyMi5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gXCJyZXBlYXQoMjAsIDFmcilcIjtcbiAgICAgICAgZ2FtZUNvbnRhaW5lcjIuc3R5bGUuZ3JpZFRlbXBsYXRlUm93cyA9IFwicmVwZWF0KDIxLCAxZnIpXCI7XG4gICAgfVxuXG4gICAgY29uc3QgY29tcHV0ZXJNb3ZlID0gKHBsYXllcjEscGxheWVyMiwgZ2FtZUJvYXJkU2l6ZSkgPT57XG4gICAgICAgIGlmIChwbGF5ZXIxLnR1cm4gPT0gMSAmJiBwbGF5ZXIxLm5hbWUgPT09IFwiQ09NUFVURVJcIil7XG4gICAgICAgICAgICBsZXQgY29tcHV0ZXJIaXRzQXJyYXkgPSB0b3RhbEhpdHMuZmlsdGVyKGhpdHM9PiBoaXRzLmluY2x1ZGVzKFwicGxheWVyT25lXCIpKVxuICAgICAgICAgICAgY29tcHV0ZXJIaXQoXCJwbGF5ZXJPbmVcIixjb21wdXRlckhpdHNBcnJheSxnYW1lQm9hcmRTaXplKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXIyLnR1cm4gPT0gMSAmJiBwbGF5ZXIyLm5hbWUgPT09IFwiQ09NUFVURVJcIil7XG4gICAgICAgICAgICAgICAgbGV0IGNvbXB1dGVySGl0c0FycmF5ID0gdG90YWxIaXRzLmZpbHRlcihoaXRzPT4gaGl0cy5pbmNsdWRlcyhcInBsYXllclR3b1wiKSlcbiAgICAgICAgICAgICAgICBjb21wdXRlckhpdChcInBsYXllclR3b1wiLGNvbXB1dGVySGl0c0FycmF5LGdhbWVCb2FyZFNpemUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBcblxuICAgIGNvbnN0IHBsYXllclRpbGVzID0gW3BsYXllcjFnYW1lVGlsZSwgcGxheWVyMmdhbWVUaWxlXTtcbiAgICBwbGF5ZXJUaWxlcy5mb3JFYWNoKChwbGF5ZXJUaWxlKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZUJvYXJkU2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB0aWxlID0gcGxheWVyVGlsZS5jbG9uZU5vZGUoKTtcbiAgICAgICAgICAgIHRpbGUuc2V0QXR0cmlidXRlKFwiZGF0YS1rZXlcIiwgaSArIDEpO1xuXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgY29uc3QgYXR0YWNrU2hpcCA9IChlLCBwbGF5ZXIxLCBwbGF5ZXIyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGlsZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgPT0gXCJwbGF5ZXJPbmVcIiAmJiBwbGF5ZXIxLnR1cm4gPT0gMSApIHtcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGl0TnVtID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKSArIGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEta2V5XCIpO1xuICAgICAgICAgICAgICAgICAgICB0b3RhbEhpdHMucHVzaChoaXROdW0pO1xuICAgICAgICAgICAgICAgICAgICBjaGVja0hpdHMocGxheWVyMSwgcGxheWVyMiwgYWxsU2hpcHMsIHRvdGFsSGl0cyk7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrU2hpcERlc3Ryb3llZChhbGxTaGlwcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnZW5lcmF0ZVNjb3JlQm9hcmQocGxheWVyMSwgcGxheWVyMiwgYWxsU2hpcHMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjEudHVybiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIyLnR1cm4gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aWxlID09IFwicGxheWVyVHdvXCIgJiYgcGxheWVyMi50dXJuID09IDEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhpdE51bSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIikgKyBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWtleVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxIaXRzLnB1c2goaGl0TnVtKTtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tIaXRzKHBsYXllcjEsIHBsYXllcjIsIGFsbFNoaXBzLCB0b3RhbEhpdHMpO1xuICAgICAgICAgICAgICAgICAgICBjaGVja1NoaXBEZXN0cm95ZWQoYWxsU2hpcHMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2VuZXJhdGVTY29yZUJvYXJkKHBsYXllcjEsIHBsYXllcjIsIGFsbFNoaXBzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIxLnR1cm4gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyMi50dXJuID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgIHRpbGUub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyMS50dXJuID09IDEgJiYgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0YWNrU2hpcChlLCBwbGF5ZXIxLCBwbGF5ZXIyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVydHVybkhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllcjIubmFtZX0ncyBUdXJuYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjEudHVybi0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyMi50dXJuKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlQmFja2dyb3VuZENvbG9yKHBsYXllcjEsIHBsYXllcjIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcHV0ZXJNb3ZlKHBsYXllcjEscGxheWVyMiwgZ2FtZUJvYXJkU2l6ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGxheWVyMi50dXJuID09IDEgJiYgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0YWNrU2hpcChlLCBwbGF5ZXIxLCBwbGF5ZXIyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVydHVybkhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllcjEubmFtZX0ncyBUdXJuYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjIudHVybi0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyMS50dXJuKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlQmFja2dyb3VuZENvbG9yKHBsYXllcjEsIHBsYXllcjIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcHV0ZXJNb3ZlKHBsYXllcjEscGxheWVyMiwgZ2FtZUJvYXJkU2l6ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChwbGF5ZXJUaWxlLmlkID09IFwicGxheWVyMUdhbWVUaWxlXCIpIHtcbiAgICAgICAgICAgICAgICBnYW1lQ29udGFpbmVyMS5hcHBlbmRDaGlsZCh0aWxlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGxheWVyVGlsZS5pZCA9PSBcInBsYXllcjJHYW1lVGlsZVwiKSB7XG4gICAgICAgICAgICAgICAgZ2FtZUNvbnRhaW5lcjIuYXBwZW5kQ2hpbGQodGlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcGxheWVyMWdhbWVUaWxlLnJlbW92ZSgpO1xuICAgICAgICBwbGF5ZXIyZ2FtZVRpbGUucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICBjb21wdXRlck1vdmUocGxheWVyMSxwbGF5ZXIyLCBnYW1lQm9hcmRTaXplKVxufTtcblxuZXhwb3J0IHsgZ2VuZXJhdGVib2FyZCB9O1xuIiwiZXhwb3J0IGNsYXNzIHBsYXllciB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cbiAgICB0dXJuID0gMDtcbn1cbiIsImltcG9ydCB7IHRpbGVCYWNrZ3JvdW5kQ29sb3IgfSBmcm9tIFwiLi90aWxlQmFja2dyb3VuZENvbG9yXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZUJvYXJkRmFjdG9yeVwiO1xuXG5jb25zdCBnZW5lcmF0ZVBsYXllclR1cm5zID0gKHBsYXllcjEsIHBsYXllcjIsIHN0YXJ0aW5nUGxheWVyLCBnYW1lQm9hcmRTaXplLCBhbGxTaGlwcykgPT4ge1xuICAgIGNvbnN0IHBsYXllcnR1cm5IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllclR1cm5cIik7XG4gICAgY29uc3QgcGxheWVyMUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWVyMUhlYWRlclwiKTtcbiAgICBjb25zdCBwbGF5ZXIySGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXIySGVhZGVyXCIpO1xuXG4gICAgcGxheWVyMUhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllcjEubmFtZX0ncyBib2FyZGA7XG4gICAgcGxheWVyMkhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllcjIubmFtZX0ncyBib2FyZGA7XG5cbiAgICBpZiAoc3RhcnRpbmdQbGF5ZXIgPT0gXCJwbGF5ZXIxXCIpIHtcbiAgICAgICAgcGxheWVyMS50dXJuKys7XG4gICAgICAgIHBsYXllcnR1cm5IZWFkZXIudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIxLm5hbWV9J3MgVHVybmA7XG4gICAgICAgIHRpbGVCYWNrZ3JvdW5kQ29sb3IocGxheWVyMSwgcGxheWVyMik7XG4gICAgfSBlbHNlIGlmIChzdGFydGluZ1BsYXllciA9PSBcInBsYXllcjJcIikge1xuICAgICAgICBwbGF5ZXIyLnR1cm4rKztcbiAgICAgICAgcGxheWVydHVybkhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllcjIubmFtZX0ncyBUdXJuYDtcbiAgICAgICAgdGlsZUJhY2tncm91bmRDb2xvcihwbGF5ZXIxLCBwbGF5ZXIyKTtcbiAgICB9XG4gICAgZ2VuZXJhdGVib2FyZChnYW1lQm9hcmRTaXplLCBwbGF5ZXIxLCBwbGF5ZXIyLCBhbGxTaGlwcyk7XG59O1xuXG5leHBvcnQgeyBnZW5lcmF0ZVBsYXllclR1cm5zIH07XG4iLCJjb25zdCBnZW5lcmF0ZVNjb3JlQm9hcmQgPSAocGxheWVyMSwgcGxheWVyMiwgYWxsU2hpcHMpID0+IHtcbiAgICBjb25zb2xlLmxvZyhhbGxTaGlwcyk7XG4gICAgY29uc3QgcGxheWVyMVNjb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXIxU2NvcmVcIik7XG4gICAgY29uc3QgcGxheWVyMlNjb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXIyU2NvcmVcIik7XG4gICAgY29uc3QgcGxheWVyVHVybkhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWVyVHVyblwiKTtcbiAgICBsZXQgcmVtYWluaW5nUGxheWVyMVNoaXBzID0gYWxsU2hpcHMuZmlsdGVyKChzaGlwKSA9PiBzaGlwLnBsYXllciA9PSBcInBsYXllck9uZVwiICYmIHNoaXAucG9zaXRpb24ubGVuZ3RoICE9PSBzaGlwLmhpdHMubGVuZ3RoKTtcbiAgICBsZXQgcmVtYWluaW5nUGxheWVyMlNoaXBzID0gYWxsU2hpcHMuZmlsdGVyKChzaGlwKSA9PiBzaGlwLnBsYXllciA9PSBcInBsYXllclR3b1wiICYmIHNoaXAucG9zaXRpb24ubGVuZ3RoICE9PSBzaGlwLmhpdHMubGVuZ3RoKTtcbiAgICBsZXQgZGVzdHJveWVkUGxheWVyMVNoaXBzID0gYWxsU2hpcHMuZmlsdGVyKChzaGlwKSA9PiBzaGlwLnBsYXllciA9PSBcInBsYXllck9uZVwiICYmIHNoaXAucG9zaXRpb24ubGVuZ3RoID09IHNoaXAuaGl0cy5sZW5ndGgpO1xuICAgIGxldCBkZXN0cm95ZWRQbGF5ZXIyU2hpcHMgPSBhbGxTaGlwcy5maWx0ZXIoKHNoaXApID0+IHNoaXAucGxheWVyID09IFwicGxheWVyVHdvXCIgJiYgc2hpcC5wb3NpdGlvbi5sZW5ndGggPT0gc2hpcC5oaXRzLmxlbmd0aCk7XG4gICAgaWYgKHJlbWFpbmluZ1BsYXllcjFTaGlwcy5sZW5ndGggPT0gMCkge1xuICAgICAgICBwbGF5ZXJUdXJuSGVhZGVyLnRleHRDb250ZW50ID0gYCR7cGxheWVyMS5uYW1lfSBXaW5zYDtcbiAgICAgICAgcGxheWVyMVNjb3JlLnRleHRDb250ZW50ID0gYCR7cGxheWVyMS5uYW1lfSBzY29yZTogJHtkZXN0cm95ZWRQbGF5ZXIxU2hpcHMubGVuZ3RofSAgcmVtYWluaW5nIHNoaXBzOiAke3JlbWFpbmluZ1BsYXllcjFTaGlwcy5sZW5ndGh9YDtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAocmVtYWluaW5nUGxheWVyMlNoaXBzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIHBsYXllclR1cm5IZWFkZXIudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIyLm5hbWV9IFdpbnNgO1xuICAgICAgICBwbGF5ZXIyU2NvcmUudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIyLm5hbWV9IHNjb3JlOiAke2Rlc3Ryb3llZFBsYXllcjJTaGlwcy5sZW5ndGh9IHJlbWFpbmluZyBzaGlwczogJHtyZW1haW5pbmdQbGF5ZXIyU2hpcHMubGVuZ3RofWA7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcGxheWVyMVNjb3JlLnRleHRDb250ZW50ID0gYCR7cGxheWVyMS5uYW1lfSBzY29yZTogJHtkZXN0cm95ZWRQbGF5ZXIxU2hpcHMubGVuZ3RofSBzaGlwcyBsZWZ0OiAke3JlbWFpbmluZ1BsYXllcjFTaGlwcy5sZW5ndGh9YDtcbiAgICBwbGF5ZXIyU2NvcmUudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIyLm5hbWV9IHNjb3JlOiAke2Rlc3Ryb3llZFBsYXllcjJTaGlwcy5sZW5ndGh9IHNoaXBzIGxlZnQ6ICR7cmVtYWluaW5nUGxheWVyMlNoaXBzLmxlbmd0aH1gO1xuICAgIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IHsgZ2VuZXJhdGVTY29yZUJvYXJkIH07XG4iLCJsZXQgYWxsUGxheWVyMVBvcyA9IFtdO1xubGV0IGFsbFBsYXllcjJQb3MgPSBbXTtcblxuY29uc3Qgc2hpcCA9IChsZW5ndGgsIG9yaWVudCwgcGxheWVyLCBnYW1lQm9hcmRTaXplKSA9PiB7XG4gICAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xuICAgIGxldCBwb3NpdGlvbiA9IFtdO1xuICAgIGxldCBoaXRzID0gW107XG5cbiAgICBjb25zdCBzaGlwUG9zID0gKHBsYXllcikgPT4ge1xuICAgICAgICBsZXQgaW5pdGlhbFBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdhbWVCb2FyZFNpemUgKyAxKTtcbiAgICAgICAgbGV0IGdhbWVCb2FyZExlbmd0aCA9IE1hdGguc3FydChnYW1lQm9hcmRTaXplKTtcblxuICAgICAgICBpZiAob3JpZW50ID09PSBcImxhbmRzY2FwZVwiKSB7XG4gICAgICAgICAgICAvLyB0byBtYWtlIHN1cmUgYWxsIHBvc2l0aW9ucyBhcmUgcGxhY2VkIGNvcnJlY3RseVxuXG4gICAgICAgICAgICBjb25zdCBjaGVja05vRHVwbGljYXRlTGFuZHNjYXBlUG9zID0gKFBvcykgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBQb3MgPSBQb3MgKyBpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyID09IFwicGxheWVyT25lXCIgJiYgYWxsUGxheWVyMVBvcy5pbmNsdWRlcyh0ZW1wUG9zKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGxheWVyID09IFwicGxheWVyVHdvXCIgJiYgYWxsUGxheWVyMlBvcy5pbmNsdWRlcyh0ZW1wUG9zKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGVtcFBvcyA+IGdhbWVCb2FyZFNpemUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCBwdXNoVG9BcnJheUxhbmRzY2FwZSA9IChpbml0aWFsUG9zKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFjaGVja05vRHVwbGljYXRlTGFuZHNjYXBlUG9zKGluaXRpYWxQb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5hbFBvcyA9IGluaXRpYWxQb3MgKyBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ucHVzaChwbGF5ZXIgKyBmaW5hbFBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyID09IFwicGxheWVyT25lXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxQbGF5ZXIxUG9zLnB1c2goZmluYWxQb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXIgPT0gXCJwbGF5ZXJUd29cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbFBsYXllcjJQb3MucHVzaChmaW5hbFBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxhbmRzY2FwZSBQb3MgYWxyZWFkeSB1c2VkXCIgKyBpbml0aWFsUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgc2hpcFBvcyhwbGF5ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGNoZWNrUG9zTGFuZHNjYXBlID0gKGluaXRpYWxQb3MpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0UG9zID0gaW5pdGlhbFBvcyArIGk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXN0UG9zICUgZ2FtZUJvYXJkTGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxQb3MgPSBpbml0aWFsUG9zICsgKGkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hUb0FycmF5TGFuZHNjYXBlKGluaXRpYWxQb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKCFjaGVja1Bvc0xhbmRzY2FwZShpbml0aWFsUG9zKSkge1xuICAgICAgICAgICAgICAgIHB1c2hUb0FycmF5TGFuZHNjYXBlKGluaXRpYWxQb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9yaWVudCA9PT0gXCJwb3J0cmFpdFwiKSB7XG4gICAgICAgICAgICBjb25zdCBjaGVja05vRHVwbGljYXRlUG90cmFpdFBvcyA9IChQb3MpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wUG9zID0gaW5pdGlhbFBvcyArIGkgKiBnYW1lQm9hcmRMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIgPT0gXCJwbGF5ZXJPbmVcIiAmJiBhbGxQbGF5ZXIxUG9zLmluY2x1ZGVzKHRlbXBQb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXIgPT0gXCJwbGF5ZXJUd29cIiAmJiBhbGxQbGF5ZXIyUG9zLmluY2x1ZGVzKHRlbXBQb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0ZW1wUG9zID4gZ2FtZUJvYXJkU2l6ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGNoZWNrUG9zUG9ydHJhaXQgPSAoaW5pdGlhbFBvcykgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBQb3MgPSBpbml0aWFsUG9zICsgaSAqIGdhbWVCb2FyZExlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBQb3MgPiBnYW1lQm9hcmRTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsUG9zID0gaW5pdGlhbFBvcyAtIChsZW5ndGggLSBpKSAqIGdhbWVCb2FyZExlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2h0b0FycmF5UG9ydHJhaXQoaW5pdGlhbFBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IHB1c2h0b0FycmF5UG9ydHJhaXQgPSAoaW5pdGlhbFBvcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghY2hlY2tOb0R1cGxpY2F0ZVBvdHJhaXRQb3MoaW5pdGlhbFBvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ucHVzaChwbGF5ZXIgKyAoaW5pdGlhbFBvcyArIGkgKiBnYW1lQm9hcmRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIgPT0gXCJwbGF5ZXJPbmVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbFBsYXllcjFQb3MucHVzaChpbml0aWFsUG9zICsgaSAqIGdhbWVCb2FyZExlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBsYXllciA9PSBcInBsYXllclR3b1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsUGxheWVyMlBvcy5wdXNoKGluaXRpYWxQb3MgKyBpICogZ2FtZUJvYXJkTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUG9ydHJhaXQgUG9zIGFscmVhZHkgdXNlZCBcIiArIGluaXRpYWxQb3MpO1xuICAgICAgICAgICAgICAgICAgICBzaGlwUG9zKHBsYXllcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKCFjaGVja1Bvc1BvcnRyYWl0KGluaXRpYWxQb3MpKSB7XG4gICAgICAgICAgICAgICAgcHVzaHRvQXJyYXlQb3J0cmFpdChpbml0aWFsUG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgc2hpcFBvcyhwbGF5ZXIpO1xuICAgIHJldHVybiB7IGdldExlbmd0aCwgcG9zaXRpb24sIGhpdHMsIHBsYXllciB9O1xufTtcblxuZXhwb3J0IHsgc2hpcCB9O1xuIiwiY29uc3QgdGlsZUJhY2tncm91bmRDb2xvciA9IChwbGF5ZXIxLCBwbGF5ZXIyKSA9PiB7XG4gICAgY29uc3QgcGxheWVyMUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZUNvbnRhaW5lcjFcIik7XG4gICAgY29uc3QgcGxheWVyMkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZUNvbnRhaW5lcjJcIik7XG4gICAgaWYgKHBsYXllcjEudHVybiA9PSAxKSB7XG4gICAgICAgIHBsYXllcjFDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjOEM0MjM2XCI7XG4gICAgfSBlbHNlIGlmIChwbGF5ZXIxLnR1cm4gPT0gMCkge1xuICAgICAgICBwbGF5ZXIxQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIjtcbiAgICB9XG4gICAgaWYgKHBsYXllcjIudHVybiA9PSAxKSB7XG4gICAgICAgIHBsYXllcjJDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjOEM0MjM2XCI7XG4gICAgfSBlbHNlIGlmIChwbGF5ZXIyLnR1cm4gPT0gMCkge1xuICAgICAgICBwbGF5ZXIyQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIjtcbiAgICB9XG59O1xuXG5leHBvcnQgeyB0aWxlQmFja2dyb3VuZENvbG9yIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2Nzc1Jlc2V0LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7O0NBR0M7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Q0FhQyxTQUFTO0NBQ1QsVUFBVTtDQUNWLFNBQVM7Q0FDVCxlQUFlO0NBQ2YsYUFBYTtDQUNiLHdCQUF3QjtBQUN6QjtBQUNBLGdEQUFnRDtBQUNoRDs7Q0FFQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsZ0JBQWdCO0FBQ2pCO0FBQ0E7Q0FDQyxZQUFZO0FBQ2I7QUFDQTs7Q0FFQyxXQUFXO0NBQ1gsYUFBYTtBQUNkO0FBQ0E7Q0FDQyx5QkFBeUI7Q0FDekIsaUJBQWlCO0FBQ2xCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3R7XFxuICAgIC0tbWFpbi1mb250OiAnU291cmNlIFNlcmlmIFBybycsIHNlcmlmO1xcbiAgICAtLXNlY29uZGFyeS1mb250OiAnRWFzdCBTZWEgRG9rZG8nO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGRpc2FwcGVhciB7XFxuICAgIGZyb20ge1xcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgIH1cXG5cXG5cXG4gICAgOTAle1xcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgIH1cXG5cXG4gICAgdG8ge1xcbiAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcbn1cXG5cXG4jcGxheWVyMUdhbWVUaWxlLCAjcGxheWVyMkdhbWVUaWxle1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOEM2NjM2O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuI3BsYXllcjFHYW1lVGlsZTpob3ZlciwgI3BsYXllcjJHYW1lVGlsZTpob3ZlcntcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzhDNDIzNjtcXG59XFxuXFxuXFxuI3BsYXllcjFHYW1lVGlsZS5oaXQsICNwbGF5ZXIyR2FtZVRpbGUuaGl0e1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNUIyODIwO1xcbn1cXG5cXG5cXG5cXG4uZ2FtZUNvbnRhaW5lcjEsIC5nYW1lQ29udGFpbmVyMntcXG4gICAgbWFyZ2luOiAxcmVtO1xcbiAgICB3aWR0aDogNDJyZW07XFxuICAgIGhlaWdodDogNDJyZW07XFxuICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMSwgMWZyKTtcXG5cXG59XFxuLmxvZ297XFxuICAgIGZvbnQtc2l6ZTogIDZyZW07XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1zZWNvbmRhcnktZm9udCk7XFxuICAgIG1hcmdpbi1ib3R0b206IDUwcHg7XFxuICAgIHBhZGRpbmc6IDIwcHg7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWig2MHB4KTtcXG4gICAgXFxufVxcblxcbiNwbGF5ZXIxSGVhZGVyLCAjcGxheWVyMkhlYWRlcntcXG4gICAgZ3JpZC1jb2x1bW46IDEvLTE7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tbWFpbi1mb250KTtcXG4gICAgXFxufVxcblxcbi5oaXRJbWFnZXtcXG4gICAgd2lkdGg6IDkwJTtcXG4gICAgaGVpZ2h0OiA5MCU7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogODAlO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxufVxcblxcbi5mb3JtQ29udGFpbmVye1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4QzQyMzY7XFxuICAgIHotaW5kZXg6IDM7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXMgZWFzZS1pbi1vdXQ7XFxuXFxufVxcblxcbi5zaGlwRm9ybUNvbnRhaW5lcntcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOEM3OTM2O1xcbiAgICB6LWluZGV4OiAyO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKCAxMDB2aCkgcm90YXRlKDE4MGRlZyk7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLnNoaXBGb3JtQ29udGFpbmVyLm1vdmVke1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoIDB2aCkgcm90YXRlKDBkZWcpO1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG4uc2hpcEZvcm1Db250YWluZXIubW92ZWQuc2xpZGVEb3due1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMHZoKSByb3RhdGUoMTgwZGVnKTtcXG4gICAgYW5pbWF0aW9uOiBkaXNhcHBlYXIgMXMgZWFzZS1pbi1vdXQ7XFxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gICAgb3BhY2l0eTogMDtcXG59XFxuXFxuLmZvcm1Db250YWluZXIubW92ZWR7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSggMTAwdmgpIHJvdGF0ZSgxODBkZWcpO1xcbiAgICBhbmltYXRpb246IGRpc2FwcGVhciAxcyBlYXNlLWluLW91dDtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICBvcGFjaXR5OiAwO1xcbn1cXG5cXG4jZm9ybSwgI3NoaXBGb3Jte1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgcGFkZGluZzozMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xcbiAgICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMDBweCk7XFxufVxcblxcbiNwbGF5ZXJUdXJue1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tbWFpbi1mb250KTtcXG4gICAgZm9udC1zaXplOiAzLjVyZW07XFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjaztcXG4gICAgXFxuICAgIFxcbn1cXG5cXG4jcGxheWVyMVNjb3JlLCAjcGxheWVyMlNjb3Jle1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tbWFpbi1mb250KTtcXG4gICAgZm9udC1zaXplOiAxLjVyZW07XFxuICAgIG1hcmdpbjogMTVweDtcXG59XFxuXFxuLmhlYWRlcntcXG4gICAgZ3JpZC1jb2x1bW46IDEvIC0xO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyODY4M0I7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJyZW07XFxuICAgIGJveC1zaGFkb3c6IDFweCAxcHggMTBweCByZ2IoNTMsIDUzLCA1Myk7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIG1hcmdpbjogMzBweDtcXG4gICAgd2lkdGg6IDUwJTtcXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdLCBpbnB1dFt0eXBlPVxcXCJudW1iZXJcXFwiXXtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgaGVpZ2h0OiAzcmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAgdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpO1xcbiAgICBmb250LXNpemU6IDJyZW07XFxufVxcblxcbmlucHV0W3R5cGU9XFxcInRleHRcXFwiXTpmb2N1cywgIGlucHV0W3R5cGU9XFxcIm51bWJlclxcXCJdOmZvY3Vze1xcbiAgICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG5oMXtcXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLW1haW4tZm9udCk7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXFxuYnV0dG9ue1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzhDNDIzNjtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCAycHggcmdiKDUzLCA1MywgNTMpO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJvcmRlcjogbm9uZTtcXG59XFxuXFxubGFiZWx7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpO1xcbiAgICBmb250LXNpemU6IDEuNHJlbTtcXG59XFxuXFxuaW1ne1xcbiAgICB3aWR0aDogMzBweDtcXG59XFxuXFxuYm9keXtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI2NDU1OTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgNWZyO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksc0NBQXNDO0lBQ3RDLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJO1FBQ0ksbUJBQW1CO1FBQ25CLFVBQVU7SUFDZDs7O0lBR0E7UUFDSSxtQkFBbUI7UUFDbkIsVUFBVTtJQUNkOztJQUVBO1FBQ0ksa0JBQWtCO1FBQ2xCLFVBQVU7SUFDZDtBQUNKOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLFdBQVc7SUFDWCxZQUFZO0lBQ1osU0FBUztJQUNULHVCQUF1QjtJQUN2QixlQUFlO0lBQ2YsYUFBYTtJQUNiLHFCQUFxQjtJQUNyQixzQkFBc0I7QUFDMUI7QUFDQTtJQUNJLHlCQUF5QjtBQUM3Qjs7O0FBR0E7SUFDSSx5QkFBeUI7QUFDN0I7Ozs7QUFJQTtJQUNJLFlBQVk7SUFDWixZQUFZO0lBQ1osYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2Isc0NBQXNDO0lBQ3RDLG1DQUFtQzs7QUFFdkM7QUFDQTtJQUNJLGdCQUFnQjtJQUNoQixrQ0FBa0M7SUFDbEMsbUJBQW1CO0lBQ25CLGFBQWE7SUFDYiwyQkFBMkI7O0FBRS9COztBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixZQUFZO0lBQ1osNkJBQTZCOztBQUVqQzs7QUFFQTtJQUNJLFVBQVU7SUFDVixXQUFXO0lBQ1gsb0JBQW9CO0lBQ3BCLDRCQUE0QjtJQUM1QiwyQkFBMkI7QUFDL0I7O0FBRUE7SUFDSSxlQUFlO0lBQ2YseUJBQXlCO0lBQ3pCLFVBQVU7SUFDVixXQUFXO0lBQ1gsYUFBYTtJQUNiLE1BQU07SUFDTixPQUFPO0lBQ1AsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsb0NBQW9DOztBQUV4Qzs7QUFFQTtJQUNJLGVBQWU7SUFDZix5QkFBeUI7SUFDekIsVUFBVTtJQUNWLFdBQVc7SUFDWCxhQUFhO0lBQ2IsTUFBTTtJQUNOLE9BQU87SUFDUCxVQUFVO0lBQ1YsYUFBYTtJQUNiLHNCQUFzQjtJQUN0Qix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLDRDQUE0QztJQUM1QyxvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSx3Q0FBd0M7SUFDeEMsVUFBVTtBQUNkO0FBQ0E7SUFDSSw0Q0FBNEM7SUFDNUMsbUNBQW1DO0lBQ25DLGtCQUFrQjtJQUNsQixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSw0Q0FBNEM7SUFDNUMsbUNBQW1DO0lBQ25DLGtCQUFrQjtJQUNsQixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQiw0QkFBNEI7SUFDNUIsOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksNkJBQTZCO0lBQzdCLGlCQUFpQjtJQUNqQixnQkFBZ0I7SUFDaEIsOEJBQThCOzs7QUFHbEM7O0FBRUE7SUFDSSw2QkFBNkI7SUFDN0IsaUJBQWlCO0lBQ2pCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QixtQkFBbUI7SUFDbkIsd0NBQXdDO0lBQ3hDLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixZQUFZO0lBQ1osVUFBVTtBQUNkOztBQUVBO0lBQ0ksVUFBVTtJQUNWLFlBQVk7SUFDWiw4QkFBOEI7SUFDOUIsWUFBWTtJQUNaLDhCQUE4QjtJQUM5QixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLDZCQUE2QjtJQUM3QixlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQiw2QkFBNkI7SUFDN0IsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixZQUFZO0lBQ1oseUJBQXlCO0lBQ3pCLHVDQUF1QztJQUN2QyxlQUFlO0lBQ2YsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLDZCQUE2QjtJQUM3QixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsYUFBYTtJQUNiLDJCQUEyQjtJQUMzQiw4QkFBOEI7SUFDOUIsbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixXQUFXO0FBQ2ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiOnJvb3R7XFxuICAgIC0tbWFpbi1mb250OiAnU291cmNlIFNlcmlmIFBybycsIHNlcmlmO1xcbiAgICAtLXNlY29uZGFyeS1mb250OiAnRWFzdCBTZWEgRG9rZG8nO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGRpc2FwcGVhciB7XFxuICAgIGZyb20ge1xcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgIH1cXG5cXG5cXG4gICAgOTAle1xcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgIH1cXG5cXG4gICAgdG8ge1xcbiAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcbn1cXG5cXG4jcGxheWVyMUdhbWVUaWxlLCAjcGxheWVyMkdhbWVUaWxle1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOEM2NjM2O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuI3BsYXllcjFHYW1lVGlsZTpob3ZlciwgI3BsYXllcjJHYW1lVGlsZTpob3ZlcntcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzhDNDIzNjtcXG59XFxuXFxuXFxuI3BsYXllcjFHYW1lVGlsZS5oaXQsICNwbGF5ZXIyR2FtZVRpbGUuaGl0e1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNUIyODIwO1xcbn1cXG5cXG5cXG5cXG4uZ2FtZUNvbnRhaW5lcjEsIC5nYW1lQ29udGFpbmVyMntcXG4gICAgbWFyZ2luOiAxcmVtO1xcbiAgICB3aWR0aDogNDJyZW07XFxuICAgIGhlaWdodDogNDJyZW07XFxuICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMSwgMWZyKTtcXG5cXG59XFxuLmxvZ297XFxuICAgIGZvbnQtc2l6ZTogIDZyZW07XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1zZWNvbmRhcnktZm9udCk7XFxuICAgIG1hcmdpbi1ib3R0b206IDUwcHg7XFxuICAgIHBhZGRpbmc6IDIwcHg7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWig2MHB4KTtcXG4gICAgXFxufVxcblxcbiNwbGF5ZXIxSGVhZGVyLCAjcGxheWVyMkhlYWRlcntcXG4gICAgZ3JpZC1jb2x1bW46IDEvLTE7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tbWFpbi1mb250KTtcXG4gICAgXFxufVxcblxcbi5oaXRJbWFnZXtcXG4gICAgd2lkdGg6IDkwJTtcXG4gICAgaGVpZ2h0OiA5MCU7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogODAlO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxufVxcblxcbi5mb3JtQ29udGFpbmVye1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4QzQyMzY7XFxuICAgIHotaW5kZXg6IDM7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXMgZWFzZS1pbi1vdXQ7XFxuXFxufVxcblxcbi5zaGlwRm9ybUNvbnRhaW5lcntcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOEM3OTM2O1xcbiAgICB6LWluZGV4OiAyO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKCAxMDB2aCkgcm90YXRlKDE4MGRlZyk7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcyBlYXNlLWluLW91dDtcXG59XFxuXFxuLnNoaXBGb3JtQ29udGFpbmVyLm1vdmVke1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoIDB2aCkgcm90YXRlKDBkZWcpO1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG4uc2hpcEZvcm1Db250YWluZXIubW92ZWQuc2xpZGVEb3due1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMHZoKSByb3RhdGUoMTgwZGVnKTtcXG4gICAgYW5pbWF0aW9uOiBkaXNhcHBlYXIgMXMgZWFzZS1pbi1vdXQ7XFxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gICAgb3BhY2l0eTogMDtcXG59XFxuXFxuLmZvcm1Db250YWluZXIubW92ZWR7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSggMTAwdmgpIHJvdGF0ZSgxODBkZWcpO1xcbiAgICBhbmltYXRpb246IGRpc2FwcGVhciAxcyBlYXNlLWluLW91dDtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICBvcGFjaXR5OiAwO1xcbn1cXG5cXG4jZm9ybSwgI3NoaXBGb3Jte1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgcGFkZGluZzozMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xcbiAgICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMDBweCk7XFxufVxcblxcbiNwbGF5ZXJUdXJue1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tbWFpbi1mb250KTtcXG4gICAgZm9udC1zaXplOiAzLjVyZW07XFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjaztcXG4gICAgXFxuICAgIFxcbn1cXG5cXG4jcGxheWVyMVNjb3JlLCAjcGxheWVyMlNjb3Jle1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tbWFpbi1mb250KTtcXG4gICAgZm9udC1zaXplOiAxLjVyZW07XFxuICAgIG1hcmdpbjogMTVweDtcXG59XFxuXFxuLmhlYWRlcntcXG4gICAgZ3JpZC1jb2x1bW46IDEvIC0xO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyODY4M0I7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJyZW07XFxuICAgIGJveC1zaGFkb3c6IDFweCAxcHggMTBweCByZ2IoNTMsIDUzLCA1Myk7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIG1hcmdpbjogMzBweDtcXG4gICAgd2lkdGg6IDUwJTtcXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdLCBpbnB1dFt0eXBlPVxcXCJudW1iZXJcXFwiXXtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgaGVpZ2h0OiAzcmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAgdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpO1xcbiAgICBmb250LXNpemU6IDJyZW07XFxufVxcblxcbmlucHV0W3R5cGU9XFxcInRleHRcXFwiXTpmb2N1cywgIGlucHV0W3R5cGU9XFxcIm51bWJlclxcXCJdOmZvY3Vze1xcbiAgICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG5oMXtcXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLW1haW4tZm9udCk7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXFxuYnV0dG9ue1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzhDNDIzNjtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCAycHggcmdiKDUzLCA1MywgNTMpO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJvcmRlcjogbm9uZTtcXG59XFxuXFxubGFiZWx7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpO1xcbiAgICBmb250LXNpemU6IDEuNHJlbTtcXG59XFxuXFxuaW1ne1xcbiAgICB3aWR0aDogMzBweDtcXG59XFxuXFxuYm9keXtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI2NDU1OTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgNWZyO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2Nzc1Jlc2V0LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vY3NzUmVzZXQuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cbi8qKlxuICogQ3JlYXRlZCBieSBTZXJnaXUgyJhhbmRvciAobWlja3U3enUpIG9uIDEvMjcvMjAxNy5cbiAqIE9yaWdpbmFsIGlkZWE6IGh0dHBzOi8vZ2l0aHViLmNvbS9naWpzcm9nZS90aWx0LmpzXG4gKiBNSVQgTGljZW5zZS5cbiAqIFZlcnNpb24gMS43LjJcbiAqL1xuXG52YXIgVmFuaWxsYVRpbHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFZhbmlsbGFUaWx0KGVsZW1lbnQpIHtcbiAgICB2YXIgc2V0dGluZ3MgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFZhbmlsbGFUaWx0KTtcblxuICAgIGlmICghKGVsZW1lbnQgaW5zdGFuY2VvZiBOb2RlKSkge1xuICAgICAgdGhyb3cgXCJDYW4ndCBpbml0aWFsaXplIFZhbmlsbGFUaWx0IGJlY2F1c2UgXCIgKyBlbGVtZW50ICsgXCIgaXMgbm90IGEgTm9kZS5cIjtcbiAgICB9XG5cbiAgICB0aGlzLndpZHRoID0gbnVsbDtcbiAgICB0aGlzLmhlaWdodCA9IG51bGw7XG4gICAgdGhpcy5jbGllbnRXaWR0aCA9IG51bGw7XG4gICAgdGhpcy5jbGllbnRIZWlnaHQgPSBudWxsO1xuICAgIHRoaXMubGVmdCA9IG51bGw7XG4gICAgdGhpcy50b3AgPSBudWxsO1xuXG4gICAgLy8gZm9yIEd5cm9zY29wZSBzYW1wbGluZ1xuICAgIHRoaXMuZ2FtbWF6ZXJvID0gbnVsbDtcbiAgICB0aGlzLmJldGF6ZXJvID0gbnVsbDtcbiAgICB0aGlzLmxhc3RnYW1tYXplcm8gPSBudWxsO1xuICAgIHRoaXMubGFzdGJldGF6ZXJvID0gbnVsbDtcblxuICAgIHRoaXMudHJhbnNpdGlvblRpbWVvdXQgPSBudWxsO1xuICAgIHRoaXMudXBkYXRlQ2FsbCA9IG51bGw7XG4gICAgdGhpcy5ldmVudCA9IG51bGw7XG5cbiAgICB0aGlzLnVwZGF0ZUJpbmQgPSB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMucmVzZXRCaW5kID0gdGhpcy5yZXNldC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5leHRlbmRTZXR0aW5ncyhzZXR0aW5ncyk7XG5cbiAgICB0aGlzLnJldmVyc2UgPSB0aGlzLnNldHRpbmdzLnJldmVyc2UgPyAtMSA6IDE7XG4gICAgdGhpcy5nbGFyZSA9IFZhbmlsbGFUaWx0LmlzU2V0dGluZ1RydWUodGhpcy5zZXR0aW5ncy5nbGFyZSk7XG4gICAgdGhpcy5nbGFyZVByZXJlbmRlciA9IFZhbmlsbGFUaWx0LmlzU2V0dGluZ1RydWUodGhpcy5zZXR0aW5nc1tcImdsYXJlLXByZXJlbmRlclwiXSk7XG4gICAgdGhpcy5mdWxsUGFnZUxpc3RlbmluZyA9IFZhbmlsbGFUaWx0LmlzU2V0dGluZ1RydWUodGhpcy5zZXR0aW5nc1tcImZ1bGwtcGFnZS1saXN0ZW5pbmdcIl0pO1xuICAgIHRoaXMuZ3lyb3Njb3BlID0gVmFuaWxsYVRpbHQuaXNTZXR0aW5nVHJ1ZSh0aGlzLnNldHRpbmdzLmd5cm9zY29wZSk7XG4gICAgdGhpcy5neXJvc2NvcGVTYW1wbGVzID0gdGhpcy5zZXR0aW5ncy5neXJvc2NvcGVTYW1wbGVzO1xuXG4gICAgdGhpcy5lbGVtZW50TGlzdGVuZXIgPSB0aGlzLmdldEVsZW1lbnRMaXN0ZW5lcigpO1xuXG4gICAgaWYgKHRoaXMuZ2xhcmUpIHtcbiAgICAgIHRoaXMucHJlcGFyZUdsYXJlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZnVsbFBhZ2VMaXN0ZW5pbmcpIHtcbiAgICAgIHRoaXMudXBkYXRlQ2xpZW50U2l6ZSgpO1xuICAgIH1cblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgdGhpcy51cGRhdGVJbml0aWFsUG9zaXRpb24oKTtcbiAgfVxuXG4gIFZhbmlsbGFUaWx0LmlzU2V0dGluZ1RydWUgPSBmdW5jdGlvbiBpc1NldHRpbmdUcnVlKHNldHRpbmcpIHtcbiAgICByZXR1cm4gc2V0dGluZyA9PT0gXCJcIiB8fCBzZXR0aW5nID09PSB0cnVlIHx8IHNldHRpbmcgPT09IDE7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1ldGhvZCByZXR1cm5zIGVsZW1lbnQgd2hhdCB3aWxsIGJlIGxpc3RlbiBtb3VzZSBldmVudHNcbiAgICogQHJldHVybiB7Tm9kZX1cbiAgICovXG5cblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUuZ2V0RWxlbWVudExpc3RlbmVyID0gZnVuY3Rpb24gZ2V0RWxlbWVudExpc3RlbmVyKCkge1xuICAgIGlmICh0aGlzLmZ1bGxQYWdlTGlzdGVuaW5nKSB7XG4gICAgICByZXR1cm4gd2luZG93LmRvY3VtZW50O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5nc1tcIm1vdXNlLWV2ZW50LWVsZW1lbnRcIl0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHZhciBtb3VzZUV2ZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZXR0aW5nc1tcIm1vdXNlLWV2ZW50LWVsZW1lbnRcIl0pO1xuXG4gICAgICBpZiAobW91c2VFdmVudEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIG1vdXNlRXZlbnRFbGVtZW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnNldHRpbmdzW1wibW91c2UtZXZlbnQtZWxlbWVudFwiXSBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzW1wibW91c2UtZXZlbnQtZWxlbWVudFwiXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICB9O1xuXG4gIC8qKlxuICAgKiBNZXRob2Qgc2V0IGxpc3RlbiBtZXRob2RzIGZvciB0aGlzLmVsZW1lbnRMaXN0ZW5lclxuICAgKiBAcmV0dXJuIHtOb2RlfVxuICAgKi9cblxuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMub25Nb3VzZUVudGVyQmluZCA9IHRoaXMub25Nb3VzZUVudGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbk1vdXNlTW92ZUJpbmQgPSB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbk1vdXNlTGVhdmVCaW5kID0gdGhpcy5vbk1vdXNlTGVhdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uV2luZG93UmVzaXplQmluZCA9IHRoaXMub25XaW5kb3dSZXNpemUuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uRGV2aWNlT3JpZW50YXRpb25CaW5kID0gdGhpcy5vbkRldmljZU9yaWVudGF0aW9uLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmVsZW1lbnRMaXN0ZW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCB0aGlzLm9uTW91c2VFbnRlckJpbmQpO1xuICAgIHRoaXMuZWxlbWVudExpc3RlbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRoaXMub25Nb3VzZUxlYXZlQmluZCk7XG4gICAgdGhpcy5lbGVtZW50TGlzdGVuZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm9uTW91c2VNb3ZlQmluZCk7XG5cbiAgICBpZiAodGhpcy5nbGFyZSB8fCB0aGlzLmZ1bGxQYWdlTGlzdGVuaW5nKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLm9uV2luZG93UmVzaXplQmluZCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZ3lyb3Njb3BlKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZW9yaWVudGF0aW9uXCIsIHRoaXMub25EZXZpY2VPcmllbnRhdGlvbkJpbmQpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogTWV0aG9kIHJlbW92ZSBldmVudCBsaXN0ZW5lcnMgZnJvbSBjdXJyZW50IHRoaXMuZWxlbWVudExpc3RlbmVyXG4gICAqL1xuXG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5lbGVtZW50TGlzdGVuZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgdGhpcy5vbk1vdXNlRW50ZXJCaW5kKTtcbiAgICB0aGlzLmVsZW1lbnRMaXN0ZW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCB0aGlzLm9uTW91c2VMZWF2ZUJpbmQpO1xuICAgIHRoaXMuZWxlbWVudExpc3RlbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5vbk1vdXNlTW92ZUJpbmQpO1xuXG4gICAgaWYgKHRoaXMuZ3lyb3Njb3BlKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImRldmljZW9yaWVudGF0aW9uXCIsIHRoaXMub25EZXZpY2VPcmllbnRhdGlvbkJpbmQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmdsYXJlIHx8IHRoaXMuZnVsbFBhZ2VMaXN0ZW5pbmcpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMub25XaW5kb3dSZXNpemVCaW5kKTtcbiAgICB9XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRyYW5zaXRpb25UaW1lb3V0KTtcbiAgICBpZiAodGhpcy51cGRhdGVDYWxsICE9PSBudWxsKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZUNhbGwpO1xuICAgIH1cblxuICAgIHRoaXMucmVzZXQoKTtcblxuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLmVsZW1lbnQudmFuaWxsYVRpbHQgPSBudWxsO1xuICAgIGRlbGV0ZSB0aGlzLmVsZW1lbnQudmFuaWxsYVRpbHQ7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5vbkRldmljZU9yaWVudGF0aW9uID0gZnVuY3Rpb24gb25EZXZpY2VPcmllbnRhdGlvbihldmVudCkge1xuICAgIGlmIChldmVudC5nYW1tYSA9PT0gbnVsbCB8fCBldmVudC5iZXRhID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVFbGVtZW50UG9zaXRpb24oKTtcblxuICAgIGlmICh0aGlzLmd5cm9zY29wZVNhbXBsZXMgPiAwKSB7XG4gICAgICB0aGlzLmxhc3RnYW1tYXplcm8gPSB0aGlzLmdhbW1hemVybztcbiAgICAgIHRoaXMubGFzdGJldGF6ZXJvID0gdGhpcy5iZXRhemVybztcblxuICAgICAgaWYgKHRoaXMuZ2FtbWF6ZXJvID09PSBudWxsKSB7XG4gICAgICAgIHRoaXMuZ2FtbWF6ZXJvID0gZXZlbnQuZ2FtbWE7XG4gICAgICAgIHRoaXMuYmV0YXplcm8gPSBldmVudC5iZXRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5nYW1tYXplcm8gPSAoZXZlbnQuZ2FtbWEgKyB0aGlzLmxhc3RnYW1tYXplcm8pIC8gMjtcbiAgICAgICAgdGhpcy5iZXRhemVybyA9IChldmVudC5iZXRhICsgdGhpcy5sYXN0YmV0YXplcm8pIC8gMjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5neXJvc2NvcGVTYW1wbGVzIC09IDE7XG4gICAgfVxuXG4gICAgdmFyIHRvdGFsQW5nbGVYID0gdGhpcy5zZXR0aW5ncy5neXJvc2NvcGVNYXhBbmdsZVggLSB0aGlzLnNldHRpbmdzLmd5cm9zY29wZU1pbkFuZ2xlWDtcbiAgICB2YXIgdG90YWxBbmdsZVkgPSB0aGlzLnNldHRpbmdzLmd5cm9zY29wZU1heEFuZ2xlWSAtIHRoaXMuc2V0dGluZ3MuZ3lyb3Njb3BlTWluQW5nbGVZO1xuXG4gICAgdmFyIGRlZ3JlZXNQZXJQaXhlbFggPSB0b3RhbEFuZ2xlWCAvIHRoaXMud2lkdGg7XG4gICAgdmFyIGRlZ3JlZXNQZXJQaXhlbFkgPSB0b3RhbEFuZ2xlWSAvIHRoaXMuaGVpZ2h0O1xuXG4gICAgdmFyIGFuZ2xlWCA9IGV2ZW50LmdhbW1hIC0gKHRoaXMuc2V0dGluZ3MuZ3lyb3Njb3BlTWluQW5nbGVYICsgdGhpcy5nYW1tYXplcm8pO1xuICAgIHZhciBhbmdsZVkgPSBldmVudC5iZXRhIC0gKHRoaXMuc2V0dGluZ3MuZ3lyb3Njb3BlTWluQW5nbGVZICsgdGhpcy5iZXRhemVybyk7XG5cbiAgICB2YXIgcG9zWCA9IGFuZ2xlWCAvIGRlZ3JlZXNQZXJQaXhlbFg7XG4gICAgdmFyIHBvc1kgPSBhbmdsZVkgLyBkZWdyZWVzUGVyUGl4ZWxZO1xuXG4gICAgaWYgKHRoaXMudXBkYXRlQ2FsbCAhPT0gbnVsbCkge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVDYWxsKTtcbiAgICB9XG5cbiAgICB0aGlzLmV2ZW50ID0ge1xuICAgICAgY2xpZW50WDogcG9zWCArIHRoaXMubGVmdCxcbiAgICAgIGNsaWVudFk6IHBvc1kgKyB0aGlzLnRvcFxuICAgIH07XG5cbiAgICB0aGlzLnVwZGF0ZUNhbGwgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVCaW5kKTtcbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUub25Nb3VzZUVudGVyID0gZnVuY3Rpb24gb25Nb3VzZUVudGVyKCkge1xuICAgIHRoaXMudXBkYXRlRWxlbWVudFBvc2l0aW9uKCk7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLndpbGxDaGFuZ2UgPSBcInRyYW5zZm9ybVwiO1xuICAgIHRoaXMuc2V0VHJhbnNpdGlvbigpO1xuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5vbk1vdXNlTW92ZSA9IGZ1bmN0aW9uIG9uTW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMudXBkYXRlQ2FsbCAhPT0gbnVsbCkge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVDYWxsKTtcbiAgICB9XG5cbiAgICB0aGlzLmV2ZW50ID0gZXZlbnQ7XG4gICAgdGhpcy51cGRhdGVDYWxsID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlQmluZCk7XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLm9uTW91c2VMZWF2ZSA9IGZ1bmN0aW9uIG9uTW91c2VMZWF2ZSgpIHtcbiAgICB0aGlzLnNldFRyYW5zaXRpb24oKTtcblxuICAgIGlmICh0aGlzLnNldHRpbmdzLnJlc2V0KSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZXNldEJpbmQpO1xuICAgIH1cbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldCgpIHtcbiAgICB0aGlzLmV2ZW50ID0ge1xuICAgICAgY2xpZW50WDogdGhpcy5sZWZ0ICsgdGhpcy53aWR0aCAvIDIsXG4gICAgICBjbGllbnRZOiB0aGlzLnRvcCArIHRoaXMuaGVpZ2h0IC8gMlxuICAgIH07XG5cbiAgICBpZiAodGhpcy5lbGVtZW50ICYmIHRoaXMuZWxlbWVudC5zdHlsZSkge1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IFwicGVyc3BlY3RpdmUoXCIgKyB0aGlzLnNldHRpbmdzLnBlcnNwZWN0aXZlICsgXCJweCkgXCIgKyBcInJvdGF0ZVgoMGRlZykgXCIgKyBcInJvdGF0ZVkoMGRlZykgXCIgKyBcInNjYWxlM2QoMSwgMSwgMSlcIjtcbiAgICB9XG5cbiAgICB0aGlzLnJlc2V0R2xhcmUoKTtcbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUucmVzZXRHbGFyZSA9IGZ1bmN0aW9uIHJlc2V0R2xhcmUoKSB7XG4gICAgaWYgKHRoaXMuZ2xhcmUpIHtcbiAgICAgIHRoaXMuZ2xhcmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IFwicm90YXRlKDE4MGRlZykgdHJhbnNsYXRlKC01MCUsIC01MCUpXCI7XG4gICAgICB0aGlzLmdsYXJlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XG4gICAgfVxuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS51cGRhdGVJbml0aWFsUG9zaXRpb24gPSBmdW5jdGlvbiB1cGRhdGVJbml0aWFsUG9zaXRpb24oKSB7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3Muc3RhcnRYID09PSAwICYmIHRoaXMuc2V0dGluZ3Muc3RhcnRZID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vbk1vdXNlRW50ZXIoKTtcblxuICAgIGlmICh0aGlzLmZ1bGxQYWdlTGlzdGVuaW5nKSB7XG4gICAgICB0aGlzLmV2ZW50ID0ge1xuICAgICAgICBjbGllbnRYOiAodGhpcy5zZXR0aW5ncy5zdGFydFggKyB0aGlzLnNldHRpbmdzLm1heCkgLyAoMiAqIHRoaXMuc2V0dGluZ3MubWF4KSAqIHRoaXMuY2xpZW50V2lkdGgsXG4gICAgICAgIGNsaWVudFk6ICh0aGlzLnNldHRpbmdzLnN0YXJ0WSArIHRoaXMuc2V0dGluZ3MubWF4KSAvICgyICogdGhpcy5zZXR0aW5ncy5tYXgpICogdGhpcy5jbGllbnRIZWlnaHRcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZXZlbnQgPSB7XG4gICAgICAgIGNsaWVudFg6IHRoaXMubGVmdCArICh0aGlzLnNldHRpbmdzLnN0YXJ0WCArIHRoaXMuc2V0dGluZ3MubWF4KSAvICgyICogdGhpcy5zZXR0aW5ncy5tYXgpICogdGhpcy53aWR0aCxcbiAgICAgICAgY2xpZW50WTogdGhpcy50b3AgKyAodGhpcy5zZXR0aW5ncy5zdGFydFkgKyB0aGlzLnNldHRpbmdzLm1heCkgLyAoMiAqIHRoaXMuc2V0dGluZ3MubWF4KSAqIHRoaXMuaGVpZ2h0XG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciBiYWNrdXBTY2FsZSA9IHRoaXMuc2V0dGluZ3Muc2NhbGU7XG4gICAgdGhpcy5zZXR0aW5ncy5zY2FsZSA9IDE7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgICB0aGlzLnNldHRpbmdzLnNjYWxlID0gYmFja3VwU2NhbGU7XG4gICAgdGhpcy5yZXNldEdsYXJlKCk7XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLmdldFZhbHVlcyA9IGZ1bmN0aW9uIGdldFZhbHVlcygpIHtcbiAgICB2YXIgeCA9IHZvaWQgMCxcbiAgICAgICAgeSA9IHZvaWQgMDtcblxuICAgIGlmICh0aGlzLmZ1bGxQYWdlTGlzdGVuaW5nKSB7XG4gICAgICB4ID0gdGhpcy5ldmVudC5jbGllbnRYIC8gdGhpcy5jbGllbnRXaWR0aDtcbiAgICAgIHkgPSB0aGlzLmV2ZW50LmNsaWVudFkgLyB0aGlzLmNsaWVudEhlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9ICh0aGlzLmV2ZW50LmNsaWVudFggLSB0aGlzLmxlZnQpIC8gdGhpcy53aWR0aDtcbiAgICAgIHkgPSAodGhpcy5ldmVudC5jbGllbnRZIC0gdGhpcy50b3ApIC8gdGhpcy5oZWlnaHQ7XG4gICAgfVxuXG4gICAgeCA9IE1hdGgubWluKE1hdGgubWF4KHgsIDApLCAxKTtcbiAgICB5ID0gTWF0aC5taW4oTWF0aC5tYXgoeSwgMCksIDEpO1xuXG4gICAgdmFyIHRpbHRYID0gKHRoaXMucmV2ZXJzZSAqICh0aGlzLnNldHRpbmdzLm1heCAtIHggKiB0aGlzLnNldHRpbmdzLm1heCAqIDIpKS50b0ZpeGVkKDIpO1xuICAgIHZhciB0aWx0WSA9ICh0aGlzLnJldmVyc2UgKiAoeSAqIHRoaXMuc2V0dGluZ3MubWF4ICogMiAtIHRoaXMuc2V0dGluZ3MubWF4KSkudG9GaXhlZCgyKTtcbiAgICB2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKHRoaXMuZXZlbnQuY2xpZW50WCAtICh0aGlzLmxlZnQgKyB0aGlzLndpZHRoIC8gMiksIC0odGhpcy5ldmVudC5jbGllbnRZIC0gKHRoaXMudG9wICsgdGhpcy5oZWlnaHQgLyAyKSkpICogKDE4MCAvIE1hdGguUEkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRpbHRYOiB0aWx0WCxcbiAgICAgIHRpbHRZOiB0aWx0WSxcbiAgICAgIHBlcmNlbnRhZ2VYOiB4ICogMTAwLFxuICAgICAgcGVyY2VudGFnZVk6IHkgKiAxMDAsXG4gICAgICBhbmdsZTogYW5nbGVcbiAgICB9O1xuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS51cGRhdGVFbGVtZW50UG9zaXRpb24gPSBmdW5jdGlvbiB1cGRhdGVFbGVtZW50UG9zaXRpb24oKSB7XG4gICAgdmFyIHJlY3QgPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICB0aGlzLndpZHRoID0gdGhpcy5lbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5lbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICB0aGlzLmxlZnQgPSByZWN0LmxlZnQ7XG4gICAgdGhpcy50b3AgPSByZWN0LnRvcDtcbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIHZhciB2YWx1ZXMgPSB0aGlzLmdldFZhbHVlcygpO1xuXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IFwicGVyc3BlY3RpdmUoXCIgKyB0aGlzLnNldHRpbmdzLnBlcnNwZWN0aXZlICsgXCJweCkgXCIgKyBcInJvdGF0ZVgoXCIgKyAodGhpcy5zZXR0aW5ncy5heGlzID09PSBcInhcIiA/IDAgOiB2YWx1ZXMudGlsdFkpICsgXCJkZWcpIFwiICsgXCJyb3RhdGVZKFwiICsgKHRoaXMuc2V0dGluZ3MuYXhpcyA9PT0gXCJ5XCIgPyAwIDogdmFsdWVzLnRpbHRYKSArIFwiZGVnKSBcIiArIFwic2NhbGUzZChcIiArIHRoaXMuc2V0dGluZ3Muc2NhbGUgKyBcIiwgXCIgKyB0aGlzLnNldHRpbmdzLnNjYWxlICsgXCIsIFwiICsgdGhpcy5zZXR0aW5ncy5zY2FsZSArIFwiKVwiO1xuXG4gICAgaWYgKHRoaXMuZ2xhcmUpIHtcbiAgICAgIHRoaXMuZ2xhcmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IFwicm90YXRlKFwiICsgdmFsdWVzLmFuZ2xlICsgXCJkZWcpIHRyYW5zbGF0ZSgtNTAlLCAtNTAlKVwiO1xuICAgICAgdGhpcy5nbGFyZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IFwiXCIgKyB2YWx1ZXMucGVyY2VudGFnZVkgKiB0aGlzLnNldHRpbmdzW1wibWF4LWdsYXJlXCJdIC8gMTAwO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcInRpbHRDaGFuZ2VcIiwge1xuICAgICAgXCJkZXRhaWxcIjogdmFsdWVzXG4gICAgfSkpO1xuXG4gICAgdGhpcy51cGRhdGVDYWxsID0gbnVsbDtcbiAgfTtcblxuICAvKipcbiAgICogQXBwZW5kcyB0aGUgZ2xhcmUgZWxlbWVudCAoaWYgZ2xhcmVQcmVyZW5kZXIgZXF1YWxzIGZhbHNlKVxuICAgKiBhbmQgc2V0cyB0aGUgZGVmYXVsdCBzdHlsZVxuICAgKi9cblxuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5wcmVwYXJlR2xhcmUgPSBmdW5jdGlvbiBwcmVwYXJlR2xhcmUoKSB7XG4gICAgLy8gSWYgb3B0aW9uIHByZS1yZW5kZXIgaXMgZW5hYmxlZCB3ZSBhc3N1bWUgYWxsIGh0bWwvY3NzIGlzIHByZXNlbnQgZm9yIGFuIG9wdGltYWwgZ2xhcmUgZWZmZWN0LlxuICAgIGlmICghdGhpcy5nbGFyZVByZXJlbmRlcikge1xuICAgICAgLy8gQ3JlYXRlIGdsYXJlIGVsZW1lbnRcbiAgICAgIHZhciBqc1RpbHRHbGFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBqc1RpbHRHbGFyZS5jbGFzc0xpc3QuYWRkKFwianMtdGlsdC1nbGFyZVwiKTtcblxuICAgICAgdmFyIGpzVGlsdEdsYXJlSW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAganNUaWx0R2xhcmVJbm5lci5jbGFzc0xpc3QuYWRkKFwianMtdGlsdC1nbGFyZS1pbm5lclwiKTtcblxuICAgICAganNUaWx0R2xhcmUuYXBwZW5kQ2hpbGQoanNUaWx0R2xhcmVJbm5lcik7XG4gICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoanNUaWx0R2xhcmUpO1xuICAgIH1cblxuICAgIHRoaXMuZ2xhcmVFbGVtZW50V3JhcHBlciA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXRpbHQtZ2xhcmVcIik7XG4gICAgdGhpcy5nbGFyZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy10aWx0LWdsYXJlLWlubmVyXCIpO1xuXG4gICAgaWYgKHRoaXMuZ2xhcmVQcmVyZW5kZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMuZ2xhcmVFbGVtZW50V3JhcHBlci5zdHlsZSwge1xuICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICBcInRvcFwiOiBcIjBcIixcbiAgICAgIFwibGVmdFwiOiBcIjBcIixcbiAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICAgIFwib3ZlcmZsb3dcIjogXCJoaWRkZW5cIixcbiAgICAgIFwicG9pbnRlci1ldmVudHNcIjogXCJub25lXCJcbiAgICB9KTtcblxuICAgIE9iamVjdC5hc3NpZ24odGhpcy5nbGFyZUVsZW1lbnQuc3R5bGUsIHtcbiAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgXCJ0b3BcIjogXCI1MCVcIixcbiAgICAgIFwibGVmdFwiOiBcIjUwJVwiLFxuICAgICAgXCJwb2ludGVyLWV2ZW50c1wiOiBcIm5vbmVcIixcbiAgICAgIFwiYmFja2dyb3VuZC1pbWFnZVwiOiBcImxpbmVhci1ncmFkaWVudCgwZGVnLCByZ2JhKDI1NSwyNTUsMjU1LDApIDAlLCByZ2JhKDI1NSwyNTUsMjU1LDEpIDEwMCUpXCIsXG4gICAgICBcInRyYW5zZm9ybVwiOiBcInJvdGF0ZSgxODBkZWcpIHRyYW5zbGF0ZSgtNTAlLCAtNTAlKVwiLFxuICAgICAgXCJ0cmFuc2Zvcm0tb3JpZ2luXCI6IFwiMCUgMCVcIixcbiAgICAgIFwib3BhY2l0eVwiOiBcIjBcIlxuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVHbGFyZVNpemUoKTtcbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUudXBkYXRlR2xhcmVTaXplID0gZnVuY3Rpb24gdXBkYXRlR2xhcmVTaXplKCkge1xuICAgIGlmICh0aGlzLmdsYXJlKSB7XG4gICAgICB2YXIgZ2xhcmVTaXplID0gKHRoaXMuZWxlbWVudC5vZmZzZXRXaWR0aCA+IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQgPyB0aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGggOiB0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0KSAqIDI7XG5cbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5nbGFyZUVsZW1lbnQuc3R5bGUsIHtcbiAgICAgICAgXCJ3aWR0aFwiOiBnbGFyZVNpemUgKyBcInB4XCIsXG4gICAgICAgIFwiaGVpZ2h0XCI6IGdsYXJlU2l6ZSArIFwicHhcIlxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS51cGRhdGVDbGllbnRTaXplID0gZnVuY3Rpb24gdXBkYXRlQ2xpZW50U2l6ZSgpIHtcbiAgICB0aGlzLmNsaWVudFdpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XG5cbiAgICB0aGlzLmNsaWVudEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0O1xuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5vbldpbmRvd1Jlc2l6ZSA9IGZ1bmN0aW9uIG9uV2luZG93UmVzaXplKCkge1xuICAgIHRoaXMudXBkYXRlR2xhcmVTaXplKCk7XG4gICAgdGhpcy51cGRhdGVDbGllbnRTaXplKCk7XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLnNldFRyYW5zaXRpb24gPSBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBjbGVhclRpbWVvdXQodGhpcy50cmFuc2l0aW9uVGltZW91dCk7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSB0aGlzLnNldHRpbmdzLnNwZWVkICsgXCJtcyBcIiArIHRoaXMuc2V0dGluZ3MuZWFzaW5nO1xuICAgIGlmICh0aGlzLmdsYXJlKSB0aGlzLmdsYXJlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gXCJvcGFjaXR5IFwiICsgdGhpcy5zZXR0aW5ncy5zcGVlZCArIFwibXMgXCIgKyB0aGlzLnNldHRpbmdzLmVhc2luZztcblxuICAgIHRoaXMudHJhbnNpdGlvblRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IFwiXCI7XG4gICAgICBpZiAoX3RoaXMuZ2xhcmUpIHtcbiAgICAgICAgX3RoaXMuZ2xhcmVFbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSBcIlwiO1xuICAgICAgfVxuICAgIH0sIHRoaXMuc2V0dGluZ3Muc3BlZWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBNZXRob2QgcmV0dXJuIHBhdGNoZWQgc2V0dGluZ3Mgb2YgaW5zdGFuY2VcbiAgICogQHBhcmFtIHtib29sZWFufSBzZXR0aW5ncy5yZXZlcnNlIC0gcmV2ZXJzZSB0aGUgdGlsdCBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IHNldHRpbmdzLm1heCAtIG1heCB0aWx0IHJvdGF0aW9uIChkZWdyZWVzKVxuICAgKiBAcGFyYW0ge3N0YXJ0WH0gc2V0dGluZ3Muc3RhcnRYIC0gdGhlIHN0YXJ0aW5nIHRpbHQgb24gdGhlIFggYXhpcywgaW4gZGVncmVlcy4gRGVmYXVsdDogMFxuICAgKiBAcGFyYW0ge3N0YXJ0WX0gc2V0dGluZ3Muc3RhcnRZIC0gdGhlIHN0YXJ0aW5nIHRpbHQgb24gdGhlIFkgYXhpcywgaW4gZGVncmVlcy4gRGVmYXVsdDogMFxuICAgKiBAcGFyYW0ge251bWJlcn0gc2V0dGluZ3MucGVyc3BlY3RpdmUgLSBUcmFuc2Zvcm0gcGVyc3BlY3RpdmUsIHRoZSBsb3dlciB0aGUgbW9yZSBleHRyZW1lIHRoZSB0aWx0IGdldHNcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNldHRpbmdzLmVhc2luZyAtIEVhc2luZyBvbiBlbnRlci9leGl0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzZXR0aW5ncy5zY2FsZSAtIDIgPSAyMDAlLCAxLjUgPSAxNTAlLCBldGMuLlxuICAgKiBAcGFyYW0ge251bWJlcn0gc2V0dGluZ3Muc3BlZWQgLSBTcGVlZCBvZiB0aGUgZW50ZXIvZXhpdCB0cmFuc2l0aW9uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2V0dGluZ3MudHJhbnNpdGlvbiAtIFNldCBhIHRyYW5zaXRpb24gb24gZW50ZXIvZXhpdFxuICAgKiBAcGFyYW0ge3N0cmluZ3xudWxsfSBzZXR0aW5ncy5heGlzIC0gV2hhdCBheGlzIHNob3VsZCBiZSBkaXNhYmxlZC4gQ2FuIGJlIFggb3IgWVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNldHRpbmdzLmdsYXJlIC0gV2hhdCBheGlzIHNob3VsZCBiZSBkaXNhYmxlZC4gQ2FuIGJlIFggb3IgWVxuICAgKiBAcGFyYW0ge251bWJlcn0gc2V0dGluZ3MubWF4LWdsYXJlIC0gdGhlIG1heGltdW0gXCJnbGFyZVwiIG9wYWNpdHkgKDEgPSAxMDAlLCAwLjUgPSA1MCUpXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2V0dGluZ3MuZ2xhcmUtcHJlcmVuZGVyIC0gZmFsc2UgPSBWYW5pbGxhVGlsdCBjcmVhdGVzIHRoZSBnbGFyZSBlbGVtZW50cyBmb3IgeW91LCBvdGhlcndpc2VcbiAgICogQHBhcmFtIHtib29sZWFufSBzZXR0aW5ncy5mdWxsLXBhZ2UtbGlzdGVuaW5nIC0gSWYgdHJ1ZSwgcGFyYWxsYXggZWZmZWN0IHdpbGwgbGlzdGVuIHRvIG1vdXNlIG1vdmUgZXZlbnRzIG9uIHRoZSB3aG9sZSBkb2N1bWVudCwgbm90IG9ubHkgdGhlIHNlbGVjdGVkIGVsZW1lbnRcbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSBzZXR0aW5ncy5tb3VzZS1ldmVudC1lbGVtZW50IC0gU3RyaW5nIHNlbGVjdG9yIG9yIGxpbmsgdG8gSFRNTC1lbGVtZW50IHdoYXQgd2lsbCBiZSBsaXN0ZW4gbW91c2UgZXZlbnRzXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2V0dGluZ3MucmVzZXQgLSBmYWxzZSA9IElmIHRoZSB0aWx0IGVmZmVjdCBoYXMgdG8gYmUgcmVzZXQgb24gZXhpdFxuICAgKiBAcGFyYW0ge2d5cm9zY29wZX0gc2V0dGluZ3MuZ3lyb3Njb3BlIC0gRW5hYmxlIHRpbHRpbmcgYnkgZGV2aWNlb3JpZW50YXRpb24gZXZlbnRzXG4gICAqIEBwYXJhbSB7Z3lyb3Njb3BlU2Vuc2l0aXZpdHl9IHNldHRpbmdzLmd5cm9zY29wZVNlbnNpdGl2aXR5IC0gQmV0d2VlbiAwIGFuZCAxIC0gVGhlIGFuZ2xlIGF0IHdoaWNoIG1heCB0aWx0IHBvc2l0aW9uIGlzIHJlYWNoZWQuIDEgPSA5MGRlZywgMC41ID0gNDVkZWcsIGV0Yy4uXG4gICAqIEBwYXJhbSB7Z3lyb3Njb3BlU2FtcGxlc30gc2V0dGluZ3MuZ3lyb3Njb3BlU2FtcGxlcyAtIEhvdyBtYW55IGd5cm9zY29wZSBtb3ZlcyB0byBkZWNpZGUgdGhlIHN0YXJ0aW5nIHBvc2l0aW9uLlxuICAgKi9cblxuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5leHRlbmRTZXR0aW5ncyA9IGZ1bmN0aW9uIGV4dGVuZFNldHRpbmdzKHNldHRpbmdzKSB7XG4gICAgdmFyIGRlZmF1bHRTZXR0aW5ncyA9IHtcbiAgICAgIHJldmVyc2U6IGZhbHNlLFxuICAgICAgbWF4OiAxNSxcbiAgICAgIHN0YXJ0WDogMCxcbiAgICAgIHN0YXJ0WTogMCxcbiAgICAgIHBlcnNwZWN0aXZlOiAxMDAwLFxuICAgICAgZWFzaW5nOiBcImN1YmljLWJlemllciguMDMsLjk4LC41MiwuOTkpXCIsXG4gICAgICBzY2FsZTogMSxcbiAgICAgIHNwZWVkOiAzMDAsXG4gICAgICB0cmFuc2l0aW9uOiB0cnVlLFxuICAgICAgYXhpczogbnVsbCxcbiAgICAgIGdsYXJlOiBmYWxzZSxcbiAgICAgIFwibWF4LWdsYXJlXCI6IDEsXG4gICAgICBcImdsYXJlLXByZXJlbmRlclwiOiBmYWxzZSxcbiAgICAgIFwiZnVsbC1wYWdlLWxpc3RlbmluZ1wiOiBmYWxzZSxcbiAgICAgIFwibW91c2UtZXZlbnQtZWxlbWVudFwiOiBudWxsLFxuICAgICAgcmVzZXQ6IHRydWUsXG4gICAgICBneXJvc2NvcGU6IHRydWUsXG4gICAgICBneXJvc2NvcGVNaW5BbmdsZVg6IC00NSxcbiAgICAgIGd5cm9zY29wZU1heEFuZ2xlWDogNDUsXG4gICAgICBneXJvc2NvcGVNaW5BbmdsZVk6IC00NSxcbiAgICAgIGd5cm9zY29wZU1heEFuZ2xlWTogNDUsXG4gICAgICBneXJvc2NvcGVTYW1wbGVzOiAxMFxuICAgIH07XG5cbiAgICB2YXIgbmV3U2V0dGluZ3MgPSB7fTtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBkZWZhdWx0U2V0dGluZ3MpIHtcbiAgICAgIGlmIChwcm9wZXJ0eSBpbiBzZXR0aW5ncykge1xuICAgICAgICBuZXdTZXR0aW5nc1twcm9wZXJ0eV0gPSBzZXR0aW5nc1twcm9wZXJ0eV07XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZWxlbWVudC5oYXNBdHRyaWJ1dGUoXCJkYXRhLXRpbHQtXCIgKyBwcm9wZXJ0eSkpIHtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZSA9IHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRpbHQtXCIgKyBwcm9wZXJ0eSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbmV3U2V0dGluZ3NbcHJvcGVydHldID0gSlNPTi5wYXJzZShhdHRyaWJ1dGUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgbmV3U2V0dGluZ3NbcHJvcGVydHldID0gYXR0cmlidXRlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdTZXR0aW5nc1twcm9wZXJ0eV0gPSBkZWZhdWx0U2V0dGluZ3NbcHJvcGVydHldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXdTZXR0aW5ncztcbiAgfTtcblxuICBWYW5pbGxhVGlsdC5pbml0ID0gZnVuY3Rpb24gaW5pdChlbGVtZW50cywgc2V0dGluZ3MpIHtcbiAgICBpZiAoZWxlbWVudHMgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICBlbGVtZW50cyA9IFtlbGVtZW50c107XG4gICAgfVxuXG4gICAgaWYgKGVsZW1lbnRzIGluc3RhbmNlb2YgTm9kZUxpc3QpIHtcbiAgICAgIGVsZW1lbnRzID0gW10uc2xpY2UuY2FsbChlbGVtZW50cyk7XG4gICAgfVxuXG4gICAgaWYgKCEoZWxlbWVudHMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICBpZiAoIShcInZhbmlsbGFUaWx0XCIgaW4gZWxlbWVudCkpIHtcbiAgICAgICAgZWxlbWVudC52YW5pbGxhVGlsdCA9IG5ldyBWYW5pbGxhVGlsdChlbGVtZW50LCBzZXR0aW5ncyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFZhbmlsbGFUaWx0O1xufSgpO1xuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIC8qIGV4cG9zZSB0aGUgY2xhc3MgdG8gd2luZG93ICovXG4gIHdpbmRvdy5WYW5pbGxhVGlsdCA9IFZhbmlsbGFUaWx0O1xuXG4gIC8qKlxuICAgKiBBdXRvIGxvYWRcbiAgICovXG4gIFZhbmlsbGFUaWx0LmluaXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLXRpbHRdXCIpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBWYW5pbGxhVGlsdDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCIuL2Nzc1Jlc2V0LmNzc1wiO1xuaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCBleHBsb3Npb25JY29uIGZyb20gXCIuL0Fzc2V0cy9leHBsb3Npb24ucG5nXCI7XG5pbXBvcnQgU2lua0ljb24gZnJvbSBcIi4vQXNzZXRzL3NpbmtpbmcucG5nXCI7XG5pbXBvcnQgVmFuaWxsYVRpbHQgZnJvbSBcInZhbmlsbGEtdGlsdFwiO1xuaW1wb3J0IHsgcGxheWVyIH0gZnJvbSBcIi4vQXNzZXRzL21vZHVsZXMvcGxheWVyRmFjdG9yeVwiO1xuaW1wb3J0IHsgc2hpcCB9IGZyb20gXCIuL0Fzc2V0cy9tb2R1bGVzL3NoaXBmYWN0b3J5XCI7XG5pbXBvcnQgeyBnZW5lcmF0ZVNjb3JlQm9hcmQgfSBmcm9tIFwiLi9Bc3NldHMvbW9kdWxlcy9zY29yZUJvYXJkXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZVBsYXllclR1cm5zIH0gZnJvbSBcIi4vQXNzZXRzL21vZHVsZXMvcGxheWVyVHVybnNcIjtcbmltcG9ydCB7IHRpbGVCYWNrZ3JvdW5kQ29sb3IgfSBmcm9tIFwiLi9Bc3NldHMvbW9kdWxlcy90aWxlQmFja2dyb3VuZENvbG9yXCI7XG5cbmNvbnN0IGdldEFsbElucHV0cyA9ICgoKSA9PiB7XG4gICAgY29uc3QgcGFnZXRpbHQgPSAoYmFja0VsZW1lbnQpID0+IHtcbiAgICAgICAgVmFuaWxsYVRpbHQuaW5pdChiYWNrRWxlbWVudCksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbWF4OiAzMCxcbiAgICAgICAgICAgICAgICBzcGVlZDogMTAwLFxuICAgICAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgcGxheWVyZmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RleHRcIik7XG4gICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybUNvbnRhaW5lclwiKTtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtXCIpO1xuICAgIGNvbnN0IHNoaXBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwRm9ybUNvbnRhaW5lclwiKTtcbiAgICBjb25zdCBmb3JtSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtSGVhZGVyXCIpO1xuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvZ29cIik7XG4gICAgcGFnZXRpbHQoZm9ybSk7XG4gICAgcGxheWVyZmllbGQub25rZXlwcmVzcyA9IGZ1bmN0aW9uIGdldHBsYXllcjFuYW1lKGUpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAxMykge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKHBsYXllcmZpZWxkLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICAgICAgICAgIHBsYXllcmZpZWxkLnNldEN1c3RvbVZhbGlkaXR5KFwiXCIpO1xuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXIxID0gbmV3IHBsYXllcihgJHtwbGF5ZXJmaWVsZC52YWx1ZS50b1VwcGVyQ2FzZSgpfWApO1xuICAgICAgICAgICAgICAgIGdldFBsYXllcjJOYW1lKHBsYXllcjEpO1xuICAgICAgICAgICAgICAgIHBsYXllcmZpZWxkLnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHBsYXllcmZpZWxkLnNldEN1c3RvbVZhbGlkaXR5KFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgbmFtZVwiKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJmaWVsZC5yZXBvcnRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBnZXRQbGF5ZXIyTmFtZSA9IChwbGF5ZXIxKSA9PiB7XG4gICAgICAgIGZvcm1IZWFkZXIudGV4dENvbnRlbnQgPSBcIldlbGNvbWUgUGxheWVyIDIsIEVudGVyIHlvdXIgbmFtZTpcIjtcbiAgICAgICAgcGxheWVyZmllbGQub25rZXlwcmVzcyA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICBpZiAoYS5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgICAgICAgICAgYS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHBsYXllcmZpZWxkLnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllcmZpZWxkLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGxheWVyMiA9IG5ldyBwbGF5ZXIoYCR7cGxheWVyZmllbGQudmFsdWUudG9VcHBlckNhc2UoKX1gKTtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyZmllbGQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBnZXRTdGFydGluZ1BsYXllcihwbGF5ZXIxLCBwbGF5ZXIyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBjb25zdCBnZXRTdGFydGluZ1BsYXllciA9IChwbGF5ZXIxLCBwbGF5ZXIyKSA9PiB7XG4gICAgICAgIGZvcm1IZWFkZXIudGV4dENvbnRlbnQgPSBcIkVudGVyIFN0YXJ0aW5nIFBsYXllclwiO1xuICAgICAgICBwbGF5ZXJmaWVsZC5wbGFjZWhvbGRlciA9IFwicGxheWVyMSBvciBwbGF5ZXIyXCI7XG4gICAgICAgIHBsYXllcmZpZWxkLnZhbHVlID0gXCJwbGF5ZXIxXCI7XG4gICAgICAgIHBsYXllcmZpZWxkLm9ua2V5cHJlc3MgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgaWYgKGkua2V5Q29kZSA9PSAxMyAmJiAocGxheWVyZmllbGQudmFsdWUudG9Mb3dlckNhc2UoKSA9PSBcInBsYXllcjFcIiB8fCBwbGF5ZXJmaWVsZC52YWx1ZS50b0xvd2VyQ2FzZSgpID09IFwicGxheWVyMlwiKSkge1xuICAgICAgICAgICAgICAgIGkucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRpbmdQbGF5ZXIgPSBwbGF5ZXJmaWVsZC52YWx1ZTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJmaWVsZC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgZ2V0Qm9hcmRTaXplVmFsdWVzKHBsYXllcjEsIHBsYXllcjIsIHN0YXJ0aW5nUGxheWVyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaS5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgICAgICAgICAgaS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHBsYXllcmZpZWxkLnNldEN1c3RvbVZhbGlkaXR5KFwiRW50ZXIgcGxheWVyMSBvciBwbGF5ZXIyXCIpO1xuICAgICAgICAgICAgICAgIHBsYXllcmZpZWxkLnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IGdldEJvYXJkU2l6ZVZhbHVlcyA9IChwbGF5ZXIxLCBwbGF5ZXIyLCBzdGFydGluZ1BsYXllcikgPT4ge1xuICAgICAgICBmb3JtSGVhZGVyLnRleHRDb250ZW50ID0gXCJFbnRlciB0aGUgc2l6ZSBvZiB0aGUgR2FtZSBCb2FyZDpcIjtcbiAgICAgICAgcGxheWVyZmllbGQudmFsdWUgPSBcInNtYWxsXCI7XG4gICAgICAgIHBsYXllcmZpZWxkLnBsYWNlaG9sZGVyID0gXCJtZWRpdW0gb3Igc21hbGxcIjtcbiAgICAgICAgcGxheWVyZmllbGQub25rZXlwcmVzcyA9IGZ1bmN0aW9uIChiKSB7XG4gICAgICAgICAgICBpZiAoYi5rZXlDb2RlID09IDEzICYmIChwbGF5ZXJmaWVsZC52YWx1ZS50b0xvd2VyQ2FzZSgpID09IFwibWVkaXVtXCIgfHwgcGxheWVyZmllbGQudmFsdWUudG9Mb3dlckNhc2UoKSA9PSBcInNtYWxsXCIpKSB7XG4gICAgICAgICAgICAgICAgYi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0dGluZyBzaGlwIHZhbHVlc1wiKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJmaWVsZC5zZXRDdXN0b21WYWxpZGl0eShcIlwiKTtcbiAgICAgICAgICAgICAgICBsZXQgZ2FtZUJvYXJkU2l6ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGV4dFwiKS52YWx1ZTtcbiAgICAgICAgICAgICAgICBnZXRTaGlwVmFsdWVzKHBsYXllcjEsIHBsYXllcjIsIHN0YXJ0aW5nUGxheWVyLCBnYW1lQm9hcmRTaXplKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYi5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyZmllbGQuc2V0Q3VzdG9tVmFsaWRpdHkoXCJFbnRlciBtZWRpdW0gb3Igc21hbGwgZm9yIGJvYXJkIHNpemVcIik7XG4gICAgICAgICAgICAgICAgcGxheWVyZmllbGQucmVwb3J0VmFsaWRpdHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0U2hpcFZhbHVlcyA9IChwbGF5ZXIxLCBwbGF5ZXIyLCBzdGFydGluZ1BsYXllciwgZ2FtZUJvYXJkU2l6ZSkgPT4ge1xuICAgICAgICBsZXQgcG9ydHJhaXRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcG9ydHJhaXROdW1cIik7XG4gICAgICAgIGNvbnN0IHBvcnRyYWl0TnVtVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcG9ydHJhaXRMYWJlbE51bVwiKTtcbiAgICAgICAgY29uc3QgbGFuZHNjYXBlTnVtVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFuZHNjYXBlTGFiZWxOdW1cIik7XG4gICAgICAgIGNvbnN0IG1pbkxhYmVsTnVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtaW5MYWJlbE51bVwiKTtcbiAgICAgICAgY29uc3QgbWF4TGFiZWxOdW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21heExhYmVsTnVtXCIpO1xuICAgICAgICBsZXQgbGFuZHNjYXBlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhbmRzY2FwZU51bVwiKTtcbiAgICAgICAgbGV0IG1pbkxlbmd0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWluTGVuZ3RoXCIpO1xuICAgICAgICBsZXQgbWF4TGVuZ3RoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYXhMZW5ndGhcIik7XG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGlwRm9ybVwiKTtcblxuICAgICAgICBwYWdldGlsdChmb3JtKTtcblxuICAgICAgICBpZiAoZ2FtZUJvYXJkU2l6ZSA9PT0gXCJzbWFsbFwiKSB7XG4gICAgICAgICAgICBnYW1lQm9hcmRTaXplID0gMTAwO1xuICAgICAgICB9IGVsc2UgaWYgKGdhbWVCb2FyZFNpemUgPT09IFwibWVkaXVtXCIpIHtcbiAgICAgICAgICAgIGdhbWVCb2FyZFNpemUgPSA0MDA7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJtb3ZlZFwiKTtcbiAgICAgICAgc2hpcGZvcm1Db250YWluZXIuY2xhc3NMaXN0LmFkZChcIm1vdmVkXCIpO1xuICAgICAgICBpZiAoZ2FtZUJvYXJkU2l6ZSA9PT0gMTAwKSB7XG4gICAgICAgICAgICBwb3J0cmFpdElucHV0Lm1heCA9IFwiNVwiO1xuICAgICAgICAgICAgbGFuZHNjYXBlSW5wdXQubWF4ID0gXCI1XCI7XG4gICAgICAgICAgICBtaW5MZW5ndGgubWF4ID0gXCI1XCI7XG4gICAgICAgICAgICBtYXhMZW5ndGgubWF4ID0gXCI1XCI7XG4gICAgICAgICAgICBwb3J0cmFpdE51bVRleHQudGV4dENvbnRlbnQgPSBcIigxLTUpXCI7XG4gICAgICAgICAgICBsYW5kc2NhcGVOdW1UZXh0LnRleHRDb250ZW50ID0gXCIoMS01KVwiO1xuICAgICAgICAgICAgbWluTGFiZWxOdW0udGV4dENvbnRlbnQgPSBcIigxLTUpXCI7XG4gICAgICAgICAgICBtYXhMYWJlbE51bS50ZXh0Q29udGVudCA9IFwiKDEtNSlcIjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwbGF5YnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5QnV0dG9uXCIpO1xuICAgICAgICBwbGF5YnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAoYikge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhwYXJzZUludChtaW5MZW5ndGgudmFsdWUpLG1heExlbmd0aFZhbHVlKTtcbiAgICAgICAgICAgIG1heExlbmd0aC5zZXRDdXN0b21WYWxpZGl0eShcIlwiKTtcbiAgICAgICAgICAgIGZvcm0ucmVwb3J0VmFsaWRpdHkoKTtcbiAgICAgICAgICAgIGlmIChwYXJzZUludChtYXhMZW5ndGgudmFsdWUpIDw9IHBhcnNlSW50KG1pbkxlbmd0aC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBtYXhMZW5ndGguc2V0Q3VzdG9tVmFsaWRpdHkoXCJNYXhpbXVtIGxlbmd0aCBtdXN0IGJlIG1vcmUgdGhhbiBtaW5pbXVtIGxlbmd0aFwiKTtcbiAgICAgICAgICAgICAgICBtYXhMZW5ndGgucmVwb3J0VmFsaWRpdHkoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQobWF4TGVuZ3RoLnZhbHVlKSA+IHBhcnNlSW50KG1pbkxlbmd0aC52YWx1ZSkgJiYgZm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgICAgICAgICBtYXhMZW5ndGguc2V0Q3VzdG9tVmFsaWRpdHkoXCJcIik7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVTaGlwcyhwbGF5ZXIxLCBwbGF5ZXIyLCBzdGFydGluZ1BsYXllciwgZ2FtZUJvYXJkU2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbn0pKCk7XG5cbmNvbnN0IGdlbmVyYXRlU2hpcHMgPSAocGxheWVyMSwgcGxheWVyMiwgc3RhcnRpbmdQbGF5ZXIsIGdhbWVCb2FyZFNpemUpID0+IHtcbiAgICBsZXQgYWxsU2hpcHMgPSBbXTtcbiAgICBjb25zdCBjcnVpc2Vyc051bSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcG9ydHJhaXROdW1cIikudmFsdWU7XG4gICAgY29uc3QgZGVzdHJveWVyc051bSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFuZHNjYXBlTnVtXCIpLnZhbHVlO1xuICAgIGxldCBtYXhMZW5ndGggPSBwYXJzZUludChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21heExlbmd0aFwiKS52YWx1ZSk7XG4gICAgbGV0IG1pbkxlbmd0aCA9IHBhcnNlSW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWluTGVuZ3RoXCIpLnZhbHVlKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyXCIpLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVDb250YWluZXIxXCIpLnN0eWxlLmRpc3BsYXkgPSBcImdyaWRcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVDb250YWluZXIyXCIpLnN0eWxlLmRpc3BsYXkgPSBcImdyaWRcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXBGb3JtQ29udGFpbmVyXCIpLmNsYXNzTGlzdC5hZGQoXCJzbGlkZURvd25cIik7XG5cbiAgICBjb25zdCByYW5kb21TaGlwTGVuZ3RoID0gKG1pbkxlbmd0aCwgbWF4TGVuZ3RoKSA9PiB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4TGVuZ3RoIC0gbWluTGVuZ3RoICsgMSkgKyBtaW5MZW5ndGgpO1xuICAgIH07XG5cbiAgICBjb25zdCBnZW5lcmF0ZUNydWlzZXJzID0gKG1pbkxlbmd0aCwgbWF4TGVuZ3RoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3J1aXNlcnNOdW07IGkrKykge1xuICAgICAgICAgICAgbGV0IHJhbmRvbUxlbmd0aCA9IHJhbmRvbVNoaXBMZW5ndGgobWluTGVuZ3RoLCBtYXhMZW5ndGgpO1xuICAgICAgICAgICAgY29uc3QgcGxheWVyMWNydWlzZXJzID0gc2hpcChyYW5kb21MZW5ndGgsIFwicG9ydHJhaXRcIiwgXCJwbGF5ZXJPbmVcIiwgZ2FtZUJvYXJkU2l6ZSk7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXIyY3J1aXNlcnMgPSBzaGlwKHJhbmRvbUxlbmd0aCwgXCJwb3J0cmFpdFwiLCBcInBsYXllclR3b1wiLCBnYW1lQm9hcmRTaXplKTtcbiAgICAgICAgICAgIGFsbFNoaXBzLnB1c2gocGxheWVyMWNydWlzZXJzLCBwbGF5ZXIyY3J1aXNlcnMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBnZW5lcmF0ZURlc3Ryb3llcnMgPSAobWluTGVuZ3RoLCBtYXhMZW5ndGgpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXN0cm95ZXJzTnVtOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByYW5kb21MZW5ndGggPSByYW5kb21TaGlwTGVuZ3RoKG1pbkxlbmd0aCwgbWF4TGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcjFEZXN0cm95ZXJzID0gc2hpcChyYW5kb21MZW5ndGgsIFwibGFuZHNjYXBlXCIsIFwicGxheWVyT25lXCIsIGdhbWVCb2FyZFNpemUpO1xuICAgICAgICAgICAgY29uc3QgcGxheWVyMkRlc3Ryb3llcnMgPSBzaGlwKHJhbmRvbUxlbmd0aCwgXCJsYW5kc2NhcGVcIiwgXCJwbGF5ZXJUd29cIiwgZ2FtZUJvYXJkU2l6ZSk7XG4gICAgICAgICAgICBhbGxTaGlwcy5wdXNoKHBsYXllcjFEZXN0cm95ZXJzLCBwbGF5ZXIyRGVzdHJveWVycyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGdlbmVyYXRlQ3J1aXNlcnMobWluTGVuZ3RoLCBtYXhMZW5ndGgpO1xuICAgIGdlbmVyYXRlRGVzdHJveWVycyhtaW5MZW5ndGgsIG1heExlbmd0aCk7XG4gICAgZ2VuZXJhdGVTY29yZUJvYXJkKHBsYXllcjEsIHBsYXllcjIsIGFsbFNoaXBzKTtcbiAgICBnZW5lcmF0ZVBsYXllclR1cm5zKHBsYXllcjEsIHBsYXllcjIsIHN0YXJ0aW5nUGxheWVyLCBnYW1lQm9hcmRTaXplLCBhbGxTaGlwcyk7XG59O1xuIl0sIm5hbWVzIjpbImdlbmVyYXRlU2NvcmVCb2FyZCIsImV4cGxvc2lvbkljb24iLCJzaW5rSWNvbiIsImNsaWNrUmFuZG9tVGlsZSIsIl9wbGF5ZXIiLCJnYW1lQm9hcmRTaXplIiwiaGl0IiwidGlsZU51bSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwidGlsZSIsImNvbnNvbGUiLCJsb2ciLCJmaW5kIiwiZWxlbWVudCIsInRpbGVFbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xpY2siLCJjb21wdXRlckhpdCIsImdhbWVCb2FyZExlbmd0aCIsInNxcnQiLCJsZW5ndGgiLCJzdXJyb3VuZGluZ0hpdHMiLCJmb3JFYWNoIiwiZGF0YWlkIiwic3Vic3RyIiwiZGF0YWtleSIsImNsYXNzTmFtZSIsImhhc0NoaWxkTm9kZXMiLCJmaXJzdEVsZW1lbnRDaGlsZCIsInNyYyIsInJpZ2h0VGlsZSIsInBhcnNlSW50IiwibGVmdFRpbGUiLCJ0b3BUaWxlIiwiYm90dG9tVGlsZSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicHVzaCIsImluY2x1ZGVzIiwiY2hlY2tIaXRzIiwicGxheWVyMSIsInBsYXllcjIiLCJhbGxTaGlwcyIsInRvdGFsSGl0cyIsImFkZEhJdEljb24iLCJoaXRUaWxlIiwiaGl0SW1hZ2UiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJzaGlwIiwicG9zaXRpb24iLCJmaWx0ZXIiLCJwb3NpdGlvbk51bSIsImhpdHMiLCJjaGVja1NoaXBEZXN0cm95ZWQiLCJkZXN0cm95U2hpcCIsIm51bWJlciIsInNoaXBQb3MiLCJmaXJzdENoaWxkIiwiY2hlY2tGb3JEZXN0cm95ZWQiLCJldmVyeSIsInBvcyIsInBsYXllciIsInRpbGVCYWNrZ3JvdW5kQ29sb3IiLCJnZW5lcmF0ZWJvYXJkIiwicGxheWVyMWdhbWVUaWxlIiwicGxheWVyMmdhbWVUaWxlIiwiZ2FtZUNvbnRhaW5lcjEiLCJnYW1lQ29udGFpbmVyMiIsInBsYXllcnR1cm5IZWFkZXIiLCJzdHlsZSIsImdyaWRUZW1wbGF0ZUNvbHVtbnMiLCJncmlkVGVtcGxhdGVSb3dzIiwiY29tcHV0ZXJNb3ZlIiwidHVybiIsIm5hbWUiLCJjb21wdXRlckhpdHNBcnJheSIsInBsYXllclRpbGVzIiwicGxheWVyVGlsZSIsImkiLCJjbG9uZU5vZGUiLCJzZXRBdHRyaWJ1dGUiLCJhdHRhY2tTaGlwIiwiZSIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsImhpdE51bSIsIm9uY2xpY2siLCJ0ZXh0Q29udGVudCIsImlkIiwicmVtb3ZlIiwiY29uc3RydWN0b3IiLCJnZW5lcmF0ZVBsYXllclR1cm5zIiwic3RhcnRpbmdQbGF5ZXIiLCJwbGF5ZXIxSGVhZGVyIiwicGxheWVyMkhlYWRlciIsInBsYXllcjFTY29yZSIsInBsYXllcjJTY29yZSIsInBsYXllclR1cm5IZWFkZXIiLCJyZW1haW5pbmdQbGF5ZXIxU2hpcHMiLCJyZW1haW5pbmdQbGF5ZXIyU2hpcHMiLCJkZXN0cm95ZWRQbGF5ZXIxU2hpcHMiLCJkZXN0cm95ZWRQbGF5ZXIyU2hpcHMiLCJhbGxQbGF5ZXIxUG9zIiwiYWxsUGxheWVyMlBvcyIsIm9yaWVudCIsImdldExlbmd0aCIsImluaXRpYWxQb3MiLCJjaGVja05vRHVwbGljYXRlTGFuZHNjYXBlUG9zIiwiUG9zIiwidGVtcFBvcyIsInB1c2hUb0FycmF5TGFuZHNjYXBlIiwiZmluYWxQb3MiLCJjaGVja1Bvc0xhbmRzY2FwZSIsInRlc3RQb3MiLCJjaGVja05vRHVwbGljYXRlUG90cmFpdFBvcyIsImNoZWNrUG9zUG9ydHJhaXQiLCJwdXNodG9BcnJheVBvcnRyYWl0IiwicGxheWVyMUNvbnRhaW5lciIsInBsYXllcjJDb250YWluZXIiLCJiYWNrZ3JvdW5kQ29sb3IiLCJTaW5rSWNvbiIsIlZhbmlsbGFUaWx0IiwiZ2V0QWxsSW5wdXRzIiwicGFnZXRpbHQiLCJiYWNrRWxlbWVudCIsImluaXQiLCJtYXgiLCJzcGVlZCIsInBsYXllcmZpZWxkIiwiZm9ybUNvbnRhaW5lciIsImZvcm0iLCJzaGlwZm9ybUNvbnRhaW5lciIsImZvcm1IZWFkZXIiLCJsb2dvIiwib25rZXlwcmVzcyIsImdldHBsYXllcjFuYW1lIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0IiwiY2hlY2tWYWxpZGl0eSIsInNldEN1c3RvbVZhbGlkaXR5IiwidmFsdWUiLCJ0b1VwcGVyQ2FzZSIsImdldFBsYXllcjJOYW1lIiwicmVwb3J0VmFsaWRpdHkiLCJhIiwiZ2V0U3RhcnRpbmdQbGF5ZXIiLCJwbGFjZWhvbGRlciIsInRvTG93ZXJDYXNlIiwiZ2V0Qm9hcmRTaXplVmFsdWVzIiwiYiIsImdldFNoaXBWYWx1ZXMiLCJwb3J0cmFpdElucHV0IiwicG9ydHJhaXROdW1UZXh0IiwibGFuZHNjYXBlTnVtVGV4dCIsIm1pbkxhYmVsTnVtIiwibWF4TGFiZWxOdW0iLCJsYW5kc2NhcGVJbnB1dCIsIm1pbkxlbmd0aCIsIm1heExlbmd0aCIsInBsYXlidXR0b24iLCJnZW5lcmF0ZVNoaXBzIiwiY3J1aXNlcnNOdW0iLCJkZXN0cm95ZXJzTnVtIiwiZGlzcGxheSIsInJhbmRvbVNoaXBMZW5ndGgiLCJnZW5lcmF0ZUNydWlzZXJzIiwicmFuZG9tTGVuZ3RoIiwicGxheWVyMWNydWlzZXJzIiwicGxheWVyMmNydWlzZXJzIiwiZ2VuZXJhdGVEZXN0cm95ZXJzIiwicGxheWVyMURlc3Ryb3llcnMiLCJwbGF5ZXIyRGVzdHJveWVycyJdLCJzb3VyY2VSb290IjoiIn0=