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
      tile.setAttribute("data-key", i + 1); //const attackTimeOut = setTimeout((e,player1,player2) => attackShip(e,player1,player2),3000,e,player1,player2)

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

      tile.onclick = function (e, timedComputerMove) {
        if (player1.turn == 1 && !e.target.classList.contains("hit")) {
          if (attackShip(e, player1, player2)) {
            playerturnHeader.textContent = "".concat(player2.name, "'s Turn");
            player1.turn--;
            player2.turn++;
            (0,_tileBackgroundColor__WEBPACK_IMPORTED_MODULE_3__.tileBackgroundColor)(player1, player2);
            setTimeout((player1, player2, gameBoardSize) => {
              computerMove(player1, player2, gameBoardSize);
            }, 1000, player1, player2, gameBoardSize);
          }
        } else if (player2.turn == 1 && !e.target.classList.contains("hit")) {
          if (attackShip(e, player1, player2)) {
            playerturnHeader.textContent = "".concat(player1.name, "'s Turn");
            player2.turn--;
            player1.turn++;
            (0,_tileBackgroundColor__WEBPACK_IMPORTED_MODULE_3__.tileBackgroundColor)(player1, player2);
            setTimeout((player1, player2, gameBoardSize) => {
              computerMove(player1, player2, gameBoardSize);
            }, 1000, player1, player2, gameBoardSize);
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
  setTimeout((player1, player2, gameBoardSize) => {
    computerMove(player1, player2, gameBoardSize);
  }, 1000, player1, player2, gameBoardSize);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QjtFQUNBVyxrQkFBa0IsQ0FBQ1osU0FBRCxFQUFZQyxTQUFaLENBQWxCO0VBQ0F0Syw4RUFBa0IsQ0FBQzRDLE9BQUQsRUFBVUMsT0FBVixFQUFtQkMsUUFBbkIsQ0FBbEI7RUFDQXFELGdGQUFtQixDQUFDdkQsT0FBRCxFQUFVQyxPQUFWLEVBQW1CdUQsY0FBbkIsRUFBbUMvRixhQUFuQyxFQUFrRHlDLFFBQWxELENBQW5CO0FBQ0gsQ0FwQ0QsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQXNzZXRzL21vZHVsZXMvY2hlY2tIaXRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQXNzZXRzL21vZHVsZXMvZ2FtZUJvYXJkRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0Fzc2V0cy9tb2R1bGVzL3BsYXllckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9Bc3NldHMvbW9kdWxlcy9wbGF5ZXJUdXJucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0Fzc2V0cy9tb2R1bGVzL3Njb3JlQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9Bc3NldHMvbW9kdWxlcy9zaGlwZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0Fzc2V0cy9tb2R1bGVzL3RpbGVCYWNrZ3JvdW5kQ29sb3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jc3NSZXNldC5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY3NzUmVzZXQuY3NzPzJjMzMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvdmFuaWxsYS10aWx0L2xpYi92YW5pbGxhLXRpbHQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZW5lcmF0ZVNjb3JlQm9hcmQgfSBmcm9tIFwiLi9zY29yZUJvYXJkXCI7XG5pbXBvcnQgZXhwbG9zaW9uSWNvbiBmcm9tIFwiLi4vLi4vQXNzZXRzL2V4cGxvc2lvbi5wbmdcIjtcbmltcG9ydCBzaW5rSWNvbiBmcm9tIFwiLi4vLi4vQXNzZXRzL3NpbmtpbmcucG5nXCI7XG5cbmNvbnN0IGNsaWNrUmFuZG9tVGlsZSA9IChfcGxheWVyLCBnYW1lQm9hcmRTaXplLCBoaXQpID0+IHtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBsZXQgdGlsZU51bSA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBnYW1lQm9hcmRTaXplKSArIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCB0aWxlID0gX3BsYXllcit0aWxlTnVtXG4gICAgICAgIGNvbnNvbGUubG9nKHRpbGUpXG4gICAgICAgIGlmICghaGl0LmZpbmQoKGVsZW1lbnQpID0+IHRpbGUgPT0gZWxlbWVudCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGhpdClcbiAgICAgICAgICAgIGNvbnN0IHRpbGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9XCIke19wbGF5ZXJ9XCJdW2RhdGEta2V5PVwiJHt0aWxlTnVtfVwiXWApO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGlsZUVsZW1lbnQpXG4gICAgICAgICAgICB0aWxlRWxlbWVudC5jbGljaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5jb25zdCBjb21wdXRlckhpdCA9IChfcGxheWVyLCBoaXQsIGdhbWVCb2FyZFNpemUpID0+IHtcbiAgICBjb25zdCBnYW1lQm9hcmRMZW5ndGggPSBNYXRoLnNxcnQoZ2FtZUJvYXJkU2l6ZSlcbiAgICBpZiAoaGl0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IHN1cnJvdW5kaW5nSGl0cyA9IFtdO1xuICAgICAgICBoaXQuZm9yRWFjaCgoaGl0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhaWQgPSBoaXQuc3Vic3RyKDAsIDkpO1xuICAgICAgICAgICAgY29uc3QgZGF0YWtleSA9IGhpdC5zdWJzdHIoOSwgMTIpO1xuICAgICAgICAgICAgY29uc3QgdGlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWtleT1cIiR7ZGF0YWtleX1cIl1bZGF0YS1pZD1cIiR7ZGF0YWlkfVwiXWApO1xuICAgICAgICAgICAgaWYgKHRpbGUuY2xhc3NOYW1lID09IFwiaGl0XCIgJiYgdGlsZS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGlsZS5maXJzdEVsZW1lbnRDaGlsZC5zcmMgPT0gZXhwbG9zaW9uSWNvbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByaWdodFRpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1rZXk9XCIke3BhcnNlSW50KGRhdGFrZXkpICsgMX1cIl1bZGF0YS1pZD1cIiR7ZGF0YWlkfVwiXWApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsZWZ0VGlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWtleT1cIiR7cGFyc2VJbnQoZGF0YWtleSkgLSAxfVwiXVtkYXRhLWlkPVwiJHtkYXRhaWR9XCJdYCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvcFRpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1rZXk9XCIke3BhcnNlSW50KGRhdGFrZXkpIC0gZ2FtZUJvYXJkTGVuZ3RofVwiXVtkYXRhLWlkPVwiJHtkYXRhaWR9XCJdYCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdHRvbVRpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1rZXk9XCIke3BhcnNlSW50KGRhdGFrZXkpICsgZ2FtZUJvYXJkTGVuZ3RofVwiXVtkYXRhLWlkPVwiJHtkYXRhaWR9XCJdYCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyaWdodFRpbGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmlnaHRUaWxlLmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJpZ2h0VGlsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodFRpbGUuY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXJyb3VuZGluZ0hpdHMucHVzaChcImhpdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGVmdFRpbGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxlZnRUaWxlLmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhsZWZ0VGlsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdFRpbGUuY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vycm91bmRpbmdIaXRzLnB1c2goXCJoaXRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0b3BUaWxlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdG9wVGlsZS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaXRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRvcFRpbGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3BUaWxlLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXJyb3VuZGluZ0hpdHMucHVzaChcImhpdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChib3R0b21UaWxlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWJvdHRvbVRpbGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYm90dG9tVGlsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21UaWxlLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vycm91bmRpbmdIaXRzLnB1c2goXCJoaXRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXN1cnJvdW5kaW5nSGl0cy5pbmNsdWRlcyhcImhpdFwiKSkge1xuICAgICAgICAgICAgY2xpY2tSYW5kb21UaWxlKF9wbGF5ZXIsIGdhbWVCb2FyZFNpemUsIGhpdCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjbGlja1JhbmRvbVRpbGUoX3BsYXllciwgZ2FtZUJvYXJkU2l6ZSwgaGl0KTtcbiAgICB9XG59O1xuXG5jb25zdCBjaGVja0hpdHMgPSAocGxheWVyMSwgcGxheWVyMiwgYWxsU2hpcHMsIHRvdGFsSGl0cykgPT4ge1xuICAgIGNvbnN0IGFkZEhJdEljb24gPSAoaGl0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGFpZCA9IGhpdC5zdWJzdHIoMCwgOSk7XG4gICAgICAgIGNvbnN0IGRhdGFrZXkgPSBoaXQuc3Vic3RyKDksIDEyKTtcbiAgICAgICAgY29uc3QgaGl0VGlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWtleT1cIiR7ZGF0YWtleX1cIl1bZGF0YS1pZD1cIiR7ZGF0YWlkfVwiXWApO1xuICAgICAgICBpZiAoIWhpdFRpbGUuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAgICAgICBjb25zdCBoaXRJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICBoaXRJbWFnZS5jbGFzc0xpc3QuYWRkKFwiaGl0SW1hZ2VcIik7XG4gICAgICAgICAgICBoaXRJbWFnZS5zcmMgPSBleHBsb3Npb25JY29uO1xuICAgICAgICAgICAgaGl0VGlsZS5hcHBlbmRDaGlsZChoaXRJbWFnZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgYWxsU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBsZXQgaGl0ID0gc2hpcC5wb3NpdGlvbi5maWx0ZXIoKHBvc2l0aW9uTnVtKSA9PiB0b3RhbEhpdHMuaW5jbHVkZXMocG9zaXRpb25OdW0pKTtcbiAgICAgICAgc2hpcC5oaXRzID0gWy4uLmhpdF07XG4gICAgICAgIGhpdC5mb3JFYWNoKChoaXQpID0+IHtcbiAgICAgICAgICAgIGFkZEhJdEljb24oaGl0KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZ2VuZXJhdGVTY29yZUJvYXJkKHBsYXllcjEsIHBsYXllcjIsIGFsbFNoaXBzKTtcbn07XG5cbmNvbnN0IGNoZWNrU2hpcERlc3Ryb3llZCA9IChhbGxTaGlwcykgPT4ge1xuICAgIGNvbnN0IGRlc3Ryb3lTaGlwID0gKHNoaXApID0+IHtcbiAgICAgICAgc2hpcC5wb3NpdGlvbi5mb3JFYWNoKChudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFpZCA9IG51bWJlci5zdWJzdHIoMCwgOSk7XG4gICAgICAgICAgICBjb25zdCBkYXRha2V5ID0gbnVtYmVyLnN1YnN0cig5LCAxMik7XG4gICAgICAgICAgICBjb25zdCBzaGlwUG9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEta2V5PVwiJHtkYXRha2V5fVwiXVtkYXRhLWlkPVwiJHtkYXRhaWR9XCJdYCk7XG4gICAgICAgICAgICBzaGlwUG9zLmZpcnN0Q2hpbGQuc3JjID0gc2lua0ljb247XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgYWxsU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBsZXQgY2hlY2tGb3JEZXN0cm95ZWQgPSBzaGlwLnBvc2l0aW9uLmV2ZXJ5KChwb3MpID0+IHNoaXAuaGl0cy5pbmNsdWRlcyhwb3MpKTtcbiAgICAgICAgaWYgKGNoZWNrRm9yRGVzdHJveWVkKSB7XG4gICAgICAgICAgICBkZXN0cm95U2hpcChzaGlwKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuZXhwb3J0IHsgY2hlY2tIaXRzLCBjb21wdXRlckhpdCwgY2hlY2tTaGlwRGVzdHJveWVkIH07XG4iLCJpbXBvcnQgeyBjb21wdXRlckhpdCwgY2hlY2tIaXRzLCBjaGVja1NoaXBEZXN0cm95ZWQgfSBmcm9tIFwiLi9jaGVja0hpdHNcIjtcbmltcG9ydCB7IHBsYXllciB9IGZyb20gXCIuL3BsYXllckZhY3RvcnlcIjtcbmltcG9ydCB7IGdlbmVyYXRlU2NvcmVCb2FyZCB9IGZyb20gXCIuL3Njb3JlQm9hcmRcIjtcbmltcG9ydCB7IHRpbGVCYWNrZ3JvdW5kQ29sb3IgfSBmcm9tIFwiLi90aWxlQmFja2dyb3VuZENvbG9yXCI7XG5cbmNvbnN0IGdlbmVyYXRlYm9hcmQgPSAoZ2FtZUJvYXJkU2l6ZSwgcGxheWVyMSwgcGxheWVyMiwgYWxsU2hpcHMpID0+IHtcbiAgICBjb25zb2xlLmxvZyhnYW1lQm9hcmRTaXplKVxuICAgIGxldCB0b3RhbEhpdHMgPSBbXTtcbiAgICBjb25zdCBwbGF5ZXIxZ2FtZVRpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllcjFHYW1lVGlsZVwiKTtcbiAgICBjb25zdCBwbGF5ZXIyZ2FtZVRpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllcjJHYW1lVGlsZVwiKTtcbiAgICBjb25zdCBnYW1lQ29udGFpbmVyMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZUNvbnRhaW5lcjFcIik7XG4gICAgY29uc3QgZ2FtZUNvbnRhaW5lcjIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVDb250YWluZXIyXCIpO1xuICAgIGNvbnN0IHBsYXllcnR1cm5IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllclR1cm5cIik7XG5cbiAgICBpZiAoZ2FtZUJvYXJkU2l6ZSA9PT0gNDAwKSB7XG4gICAgICAgIGdhbWVDb250YWluZXIxLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBcInJlcGVhdCgyMCwgMWZyKVwiO1xuICAgICAgICBnYW1lQ29udGFpbmVyMS5zdHlsZS5ncmlkVGVtcGxhdGVSb3dzID0gXCJyZXBlYXQoMjEsIDFmcilcIjtcbiAgICAgICAgZ2FtZUNvbnRhaW5lcjIuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IFwicmVwZWF0KDIwLCAxZnIpXCI7XG4gICAgICAgIGdhbWVDb250YWluZXIyLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPSBcInJlcGVhdCgyMSwgMWZyKVwiO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXB1dGVyTW92ZSA9IChwbGF5ZXIxLHBsYXllcjIsIGdhbWVCb2FyZFNpemUpID0+e1xuICAgICAgICBpZiAocGxheWVyMS50dXJuID09IDEgJiYgcGxheWVyMS5uYW1lID09PSBcIkNPTVBVVEVSXCIpe1xuICAgICAgICAgICAgbGV0IGNvbXB1dGVySGl0c0FycmF5ID0gdG90YWxIaXRzLmZpbHRlcihoaXRzPT4gaGl0cy5pbmNsdWRlcyhcInBsYXllck9uZVwiKSlcbiAgICAgICAgICAgIGNvbXB1dGVySGl0KFwicGxheWVyT25lXCIsY29tcHV0ZXJIaXRzQXJyYXksZ2FtZUJvYXJkU2l6ZSlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGxheWVyMi50dXJuID09IDEgJiYgcGxheWVyMi5uYW1lID09PSBcIkNPTVBVVEVSXCIpe1xuICAgICAgICAgICAgICAgIGxldCBjb21wdXRlckhpdHNBcnJheSA9IHRvdGFsSGl0cy5maWx0ZXIoaGl0cz0+IGhpdHMuaW5jbHVkZXMoXCJwbGF5ZXJUd29cIikpXG4gICAgICAgICAgICAgICAgY29tcHV0ZXJIaXQoXCJwbGF5ZXJUd29cIixjb21wdXRlckhpdHNBcnJheSxnYW1lQm9hcmRTaXplKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgIFxuXG4gICAgY29uc3QgcGxheWVyVGlsZXMgPSBbcGxheWVyMWdhbWVUaWxlLCBwbGF5ZXIyZ2FtZVRpbGVdO1xuICAgIHBsYXllclRpbGVzLmZvckVhY2goKHBsYXllclRpbGUpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lQm9hcmRTaXplOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbGUgPSBwbGF5ZXJUaWxlLmNsb25lTm9kZSgpO1xuICAgICAgICAgICAgdGlsZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWtleVwiLCBpICsgMSk7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9jb25zdCBhdHRhY2tUaW1lT3V0ID0gc2V0VGltZW91dCgoZSxwbGF5ZXIxLHBsYXllcjIpID0+IGF0dGFja1NoaXAoZSxwbGF5ZXIxLHBsYXllcjIpLDMwMDAsZSxwbGF5ZXIxLHBsYXllcjIpXG5cbiAgICAgICAgICAgIGNvbnN0IGF0dGFja1NoaXAgPSAoZSwgcGxheWVyMSwgcGxheWVyMikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbGUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICAgICAgICAgICAgICAgIGlmICh0aWxlID09IFwicGxheWVyT25lXCIgJiYgcGxheWVyMS50dXJuID09IDEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhpdE51bSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIikgKyBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWtleVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxIaXRzLnB1c2goaGl0TnVtKTtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tIaXRzKHBsYXllcjEsIHBsYXllcjIsIGFsbFNoaXBzLCB0b3RhbEhpdHMpO1xuICAgICAgICAgICAgICAgICAgICBjaGVja1NoaXBEZXN0cm95ZWQoYWxsU2hpcHMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2VuZXJhdGVTY29yZUJvYXJkKHBsYXllcjEsIHBsYXllcjIsIGFsbFNoaXBzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIxLnR1cm4gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyMi50dXJuID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGlsZSA9PSBcInBsYXllclR3b1wiICYmIHBsYXllcjIudHVybiA9PSAxICkge1xuICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoaXROdW0gPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpICsgZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1rZXlcIik7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsSGl0cy5wdXNoKGhpdE51bSk7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrSGl0cyhwbGF5ZXIxLCBwbGF5ZXIyLCBhbGxTaGlwcywgdG90YWxIaXRzKTtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tTaGlwRGVzdHJveWVkKGFsbFNoaXBzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdlbmVyYXRlU2NvcmVCb2FyZChwbGF5ZXIxLCBwbGF5ZXIyLCBhbGxTaGlwcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyMS50dXJuID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjIudHVybiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICB0aWxlLm9uY2xpY2sgPSBmdW5jdGlvbihlLCB0aW1lZENvbXB1dGVyTW92ZSkge1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIxLnR1cm4gPT0gMSAmJiAhZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRhY2tTaGlwKGUsIHBsYXllcjEsIHBsYXllcjIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJ0dXJuSGVhZGVyLnRleHRDb250ZW50ID0gYCR7cGxheWVyMi5uYW1lfSdzIFR1cm5gO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyMS50dXJuLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIyLnR1cm4rKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVCYWNrZ3JvdW5kQ29sb3IocGxheWVyMSwgcGxheWVyMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KChwbGF5ZXIxLHBsYXllcjIsIGdhbWVCb2FyZFNpemUpID0+IHtjb21wdXRlck1vdmUocGxheWVyMSxwbGF5ZXIyLCBnYW1lQm9hcmRTaXplKX0sMTAwMCwgcGxheWVyMSxwbGF5ZXIyLCBnYW1lQm9hcmRTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGxheWVyMi50dXJuID09IDEgJiYgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0YWNrU2hpcChlLCBwbGF5ZXIxLCBwbGF5ZXIyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVydHVybkhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllcjEubmFtZX0ncyBUdXJuYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjIudHVybi0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyMS50dXJuKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlQmFja2dyb3VuZENvbG9yKHBsYXllcjEsIHBsYXllcjIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgocGxheWVyMSxwbGF5ZXIyLCBnYW1lQm9hcmRTaXplKSA9PiB7Y29tcHV0ZXJNb3ZlKHBsYXllcjEscGxheWVyMiwgZ2FtZUJvYXJkU2l6ZSl9LDEwMDAsIHBsYXllcjEscGxheWVyMiwgZ2FtZUJvYXJkU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAocGxheWVyVGlsZS5pZCA9PSBcInBsYXllcjFHYW1lVGlsZVwiKSB7XG4gICAgICAgICAgICAgICAgZ2FtZUNvbnRhaW5lcjEuYXBwZW5kQ2hpbGQodGlsZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBsYXllclRpbGUuaWQgPT0gXCJwbGF5ZXIyR2FtZVRpbGVcIikge1xuICAgICAgICAgICAgICAgIGdhbWVDb250YWluZXIyLmFwcGVuZENoaWxkKHRpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBsYXllcjFnYW1lVGlsZS5yZW1vdmUoKTtcbiAgICAgICAgcGxheWVyMmdhbWVUaWxlLnJlbW92ZSgpO1xuICAgIH0pO1xuXG4gICAgc2V0VGltZW91dCgocGxheWVyMSxwbGF5ZXIyLCBnYW1lQm9hcmRTaXplKSA9PiB7Y29tcHV0ZXJNb3ZlKHBsYXllcjEscGxheWVyMiwgZ2FtZUJvYXJkU2l6ZSl9LDEwMDAsIHBsYXllcjEscGxheWVyMiwgZ2FtZUJvYXJkU2l6ZSk7XG59O1xuXG5leHBvcnQgeyBnZW5lcmF0ZWJvYXJkIH07XG4iLCJleHBvcnQgY2xhc3MgcGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuICAgIHR1cm4gPSAwO1xufVxuIiwiaW1wb3J0IHsgdGlsZUJhY2tncm91bmRDb2xvciB9IGZyb20gXCIuL3RpbGVCYWNrZ3JvdW5kQ29sb3JcIjtcbmltcG9ydCB7IGdlbmVyYXRlYm9hcmQgfSBmcm9tIFwiLi9nYW1lQm9hcmRGYWN0b3J5XCI7XG5cbmNvbnN0IGdlbmVyYXRlUGxheWVyVHVybnMgPSAocGxheWVyMSwgcGxheWVyMiwgc3RhcnRpbmdQbGF5ZXIsIGdhbWVCb2FyZFNpemUsIGFsbFNoaXBzKSA9PiB7XG4gICAgY29uc3QgcGxheWVydHVybkhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWVyVHVyblwiKTtcbiAgICBjb25zdCBwbGF5ZXIxSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXIxSGVhZGVyXCIpO1xuICAgIGNvbnN0IHBsYXllcjJIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllcjJIZWFkZXJcIik7XG5cbiAgICBwbGF5ZXIxSGVhZGVyLnRleHRDb250ZW50ID0gYCR7cGxheWVyMS5uYW1lfSdzIGJvYXJkYDtcbiAgICBwbGF5ZXIySGVhZGVyLnRleHRDb250ZW50ID0gYCR7cGxheWVyMi5uYW1lfSdzIGJvYXJkYDtcblxuICAgIGlmIChzdGFydGluZ1BsYXllciA9PSBcInBsYXllcjFcIikge1xuICAgICAgICBwbGF5ZXIxLnR1cm4rKztcbiAgICAgICAgcGxheWVydHVybkhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllcjEubmFtZX0ncyBUdXJuYDtcbiAgICAgICAgdGlsZUJhY2tncm91bmRDb2xvcihwbGF5ZXIxLCBwbGF5ZXIyKTtcbiAgICB9IGVsc2UgaWYgKHN0YXJ0aW5nUGxheWVyID09IFwicGxheWVyMlwiKSB7XG4gICAgICAgIHBsYXllcjIudHVybisrO1xuICAgICAgICBwbGF5ZXJ0dXJuSGVhZGVyLnRleHRDb250ZW50ID0gYCR7cGxheWVyMi5uYW1lfSdzIFR1cm5gO1xuICAgICAgICB0aWxlQmFja2dyb3VuZENvbG9yKHBsYXllcjEsIHBsYXllcjIpO1xuICAgIH1cbiAgICBnZW5lcmF0ZWJvYXJkKGdhbWVCb2FyZFNpemUsIHBsYXllcjEsIHBsYXllcjIsIGFsbFNoaXBzKTtcbn07XG5cbmV4cG9ydCB7IGdlbmVyYXRlUGxheWVyVHVybnMgfTtcbiIsImNvbnN0IGdlbmVyYXRlU2NvcmVCb2FyZCA9IChwbGF5ZXIxLCBwbGF5ZXIyLCBhbGxTaGlwcykgPT4ge1xuICAgIGNvbnNvbGUubG9nKGFsbFNoaXBzKTtcbiAgICBjb25zdCBwbGF5ZXIxU2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllcjFTY29yZVwiKTtcbiAgICBjb25zdCBwbGF5ZXIyU2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllcjJTY29yZVwiKTtcbiAgICBjb25zdCBwbGF5ZXJUdXJuSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXJUdXJuXCIpO1xuICAgIGxldCByZW1haW5pbmdQbGF5ZXIxU2hpcHMgPSBhbGxTaGlwcy5maWx0ZXIoKHNoaXApID0+IHNoaXAucGxheWVyID09IFwicGxheWVyT25lXCIgJiYgc2hpcC5wb3NpdGlvbi5sZW5ndGggIT09IHNoaXAuaGl0cy5sZW5ndGgpO1xuICAgIGxldCByZW1haW5pbmdQbGF5ZXIyU2hpcHMgPSBhbGxTaGlwcy5maWx0ZXIoKHNoaXApID0+IHNoaXAucGxheWVyID09IFwicGxheWVyVHdvXCIgJiYgc2hpcC5wb3NpdGlvbi5sZW5ndGggIT09IHNoaXAuaGl0cy5sZW5ndGgpO1xuICAgIGxldCBkZXN0cm95ZWRQbGF5ZXIxU2hpcHMgPSBhbGxTaGlwcy5maWx0ZXIoKHNoaXApID0+IHNoaXAucGxheWVyID09IFwicGxheWVyT25lXCIgJiYgc2hpcC5wb3NpdGlvbi5sZW5ndGggPT0gc2hpcC5oaXRzLmxlbmd0aCk7XG4gICAgbGV0IGRlc3Ryb3llZFBsYXllcjJTaGlwcyA9IGFsbFNoaXBzLmZpbHRlcigoc2hpcCkgPT4gc2hpcC5wbGF5ZXIgPT0gXCJwbGF5ZXJUd29cIiAmJiBzaGlwLnBvc2l0aW9uLmxlbmd0aCA9PSBzaGlwLmhpdHMubGVuZ3RoKTtcbiAgICBpZiAocmVtYWluaW5nUGxheWVyMVNoaXBzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIHBsYXllclR1cm5IZWFkZXIudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIxLm5hbWV9IFdpbnNgO1xuICAgICAgICBwbGF5ZXIxU2NvcmUudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIxLm5hbWV9IHNjb3JlOiAke2Rlc3Ryb3llZFBsYXllcjFTaGlwcy5sZW5ndGh9ICByZW1haW5pbmcgc2hpcHM6ICR7cmVtYWluaW5nUGxheWVyMVNoaXBzLmxlbmd0aH1gO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChyZW1haW5pbmdQbGF5ZXIyU2hpcHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgcGxheWVyVHVybkhlYWRlci50ZXh0Q29udGVudCA9IGAke3BsYXllcjIubmFtZX0gV2luc2A7XG4gICAgICAgIHBsYXllcjJTY29yZS50ZXh0Q29udGVudCA9IGAke3BsYXllcjIubmFtZX0gc2NvcmU6ICR7ZGVzdHJveWVkUGxheWVyMlNoaXBzLmxlbmd0aH0gcmVtYWluaW5nIHNoaXBzOiAke3JlbWFpbmluZ1BsYXllcjJTaGlwcy5sZW5ndGh9YDtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBwbGF5ZXIxU2NvcmUudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIxLm5hbWV9IHNjb3JlOiAke2Rlc3Ryb3llZFBsYXllcjFTaGlwcy5sZW5ndGh9IHNoaXBzIGxlZnQ6ICR7cmVtYWluaW5nUGxheWVyMVNoaXBzLmxlbmd0aH1gO1xuICAgIHBsYXllcjJTY29yZS50ZXh0Q29udGVudCA9IGAke3BsYXllcjIubmFtZX0gc2NvcmU6ICR7ZGVzdHJveWVkUGxheWVyMlNoaXBzLmxlbmd0aH0gc2hpcHMgbGVmdDogJHtyZW1haW5pbmdQbGF5ZXIyU2hpcHMubGVuZ3RofWA7XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgeyBnZW5lcmF0ZVNjb3JlQm9hcmQgfTtcbiIsImxldCBhbGxQbGF5ZXIxUG9zID0gW107XG5sZXQgYWxsUGxheWVyMlBvcyA9IFtdO1xuXG5jb25zdCBzaGlwID0gKGxlbmd0aCwgb3JpZW50LCBwbGF5ZXIsIGdhbWVCb2FyZFNpemUpID0+IHtcbiAgICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG4gICAgbGV0IHBvc2l0aW9uID0gW107XG4gICAgbGV0IGhpdHMgPSBbXTtcblxuICAgIGNvbnN0IHNoaXBQb3MgPSAocGxheWVyKSA9PiB7XG4gICAgICAgIGxldCBpbml0aWFsUG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ2FtZUJvYXJkU2l6ZSArIDEpO1xuICAgICAgICBsZXQgZ2FtZUJvYXJkTGVuZ3RoID0gTWF0aC5zcXJ0KGdhbWVCb2FyZFNpemUpO1xuXG4gICAgICAgIGlmIChvcmllbnQgPT09IFwibGFuZHNjYXBlXCIpIHtcbiAgICAgICAgICAgIC8vIHRvIG1ha2Ugc3VyZSBhbGwgcG9zaXRpb25zIGFyZSBwbGFjZWQgY29ycmVjdGx5XG5cbiAgICAgICAgICAgIGNvbnN0IGNoZWNrTm9EdXBsaWNhdGVMYW5kc2NhcGVQb3MgPSAoUG9zKSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcFBvcyA9IFBvcyArIGk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIgPT0gXCJwbGF5ZXJPbmVcIiAmJiBhbGxQbGF5ZXIxUG9zLmluY2x1ZGVzKHRlbXBQb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXIgPT0gXCJwbGF5ZXJUd29cIiAmJiBhbGxQbGF5ZXIyUG9zLmluY2x1ZGVzKHRlbXBQb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0ZW1wUG9zID4gZ2FtZUJvYXJkU2l6ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IHB1c2hUb0FycmF5TGFuZHNjYXBlID0gKGluaXRpYWxQb3MpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrTm9EdXBsaWNhdGVMYW5kc2NhcGVQb3MoaW5pdGlhbFBvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmFsUG9zID0gaW5pdGlhbFBvcyArIGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi5wdXNoKHBsYXllciArIGZpbmFsUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIgPT0gXCJwbGF5ZXJPbmVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbFBsYXllcjFQb3MucHVzaChmaW5hbFBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBsYXllciA9PSBcInBsYXllclR3b1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsUGxheWVyMlBvcy5wdXNoKGZpbmFsUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGFuZHNjYXBlIFBvcyBhbHJlYWR5IHVzZWRcIiArIGluaXRpYWxQb3MpO1xuICAgICAgICAgICAgICAgICAgICBzaGlwUG9zKHBsYXllcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgY2hlY2tQb3NMYW5kc2NhcGUgPSAoaW5pdGlhbFBvcykgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3RQb3MgPSBpbml0aWFsUG9zICsgaTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlc3RQb3MgJSBnYW1lQm9hcmRMZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFBvcyA9IGluaXRpYWxQb3MgKyAoaSArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFRvQXJyYXlMYW5kc2NhcGUoaW5pdGlhbFBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoIWNoZWNrUG9zTGFuZHNjYXBlKGluaXRpYWxQb3MpKSB7XG4gICAgICAgICAgICAgICAgcHVzaFRvQXJyYXlMYW5kc2NhcGUoaW5pdGlhbFBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAob3JpZW50ID09PSBcInBvcnRyYWl0XCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrTm9EdXBsaWNhdGVQb3RyYWl0UG9zID0gKFBvcykgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBQb3MgPSBpbml0aWFsUG9zICsgaSAqIGdhbWVCb2FyZExlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllciA9PSBcInBsYXllck9uZVwiICYmIGFsbFBsYXllcjFQb3MuaW5jbHVkZXModGVtcFBvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBsYXllciA9PSBcInBsYXllclR3b1wiICYmIGFsbFBsYXllcjJQb3MuaW5jbHVkZXModGVtcFBvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRlbXBQb3MgPiBnYW1lQm9hcmRTaXplKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgY2hlY2tQb3NQb3J0cmFpdCA9IChpbml0aWFsUG9zKSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcFBvcyA9IGluaXRpYWxQb3MgKyBpICogZ2FtZUJvYXJkTGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVtcFBvcyA+IGdhbWVCb2FyZFNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxQb3MgPSBpbml0aWFsUG9zIC0gKGxlbmd0aCAtIGkpICogZ2FtZUJvYXJkTGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaHRvQXJyYXlQb3J0cmFpdChpbml0aWFsUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgcHVzaHRvQXJyYXlQb3J0cmFpdCA9IChpbml0aWFsUG9zKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFjaGVja05vRHVwbGljYXRlUG90cmFpdFBvcyhpbml0aWFsUG9zKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi5wdXNoKHBsYXllciArIChpbml0aWFsUG9zICsgaSAqIGdhbWVCb2FyZExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllciA9PSBcInBsYXllck9uZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsUGxheWVyMVBvcy5wdXNoKGluaXRpYWxQb3MgKyBpICogZ2FtZUJvYXJkTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGxheWVyID09IFwicGxheWVyVHdvXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxQbGF5ZXIyUG9zLnB1c2goaW5pdGlhbFBvcyArIGkgKiBnYW1lQm9hcmRMZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQb3J0cmFpdCBQb3MgYWxyZWFkeSB1c2VkIFwiICsgaW5pdGlhbFBvcyk7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBQb3MocGxheWVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoIWNoZWNrUG9zUG9ydHJhaXQoaW5pdGlhbFBvcykpIHtcbiAgICAgICAgICAgICAgICBwdXNodG9BcnJheVBvcnRyYWl0KGluaXRpYWxQb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBzaGlwUG9zKHBsYXllcik7XG4gICAgcmV0dXJuIHsgZ2V0TGVuZ3RoLCBwb3NpdGlvbiwgaGl0cywgcGxheWVyIH07XG59O1xuXG5leHBvcnQgeyBzaGlwIH07XG4iLCJjb25zdCB0aWxlQmFja2dyb3VuZENvbG9yID0gKHBsYXllcjEsIHBsYXllcjIpID0+IHtcbiAgICBjb25zdCBwbGF5ZXIxQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lQ29udGFpbmVyMVwiKTtcbiAgICBjb25zdCBwbGF5ZXIyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lQ29udGFpbmVyMlwiKTtcbiAgICBpZiAocGxheWVyMS50dXJuID09IDEpIHtcbiAgICAgICAgcGxheWVyMUNvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM4QzQyMzZcIjtcbiAgICB9IGVsc2UgaWYgKHBsYXllcjEudHVybiA9PSAwKSB7XG4gICAgICAgIHBsYXllcjFDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiO1xuICAgIH1cbiAgICBpZiAocGxheWVyMi50dXJuID09IDEpIHtcbiAgICAgICAgcGxheWVyMkNvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM4QzQyMzZcIjtcbiAgICB9IGVsc2UgaWYgKHBsYXllcjIudHVybiA9PSAwKSB7XG4gICAgICAgIHBsYXllcjJDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiO1xuICAgIH1cbn07XG5cbmV4cG9ydCB7IHRpbGVCYWNrZ3JvdW5kQ29sb3IgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvY3NzUmVzZXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQzs7QUFFRDs7Ozs7Ozs7Ozs7OztDQWFDLFNBQVM7Q0FDVCxVQUFVO0NBQ1YsU0FBUztDQUNULGVBQWU7Q0FDZixhQUFhO0NBQ2Isd0JBQXdCO0FBQ3pCO0FBQ0EsZ0RBQWdEO0FBQ2hEOztDQUVDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsY0FBYztBQUNmO0FBQ0E7Q0FDQyxnQkFBZ0I7QUFDakI7QUFDQTtDQUNDLFlBQVk7QUFDYjtBQUNBOztDQUVDLFdBQVc7Q0FDWCxhQUFhO0FBQ2Q7QUFDQTtDQUNDLHlCQUF5QjtDQUN6QixpQkFBaUI7QUFDbEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCI6cm9vdHtcXG4gICAgLS1tYWluLWZvbnQ6ICdTb3VyY2UgU2VyaWYgUHJvJywgc2VyaWY7XFxuICAgIC0tc2Vjb25kYXJ5LWZvbnQ6ICdFYXN0IFNlYSBEb2tkbyc7XFxufVxcblxcbkBrZXlmcmFtZXMgZGlzYXBwZWFyIHtcXG4gICAgZnJvbSB7XFxuICAgICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgfVxcblxcblxcbiAgICA5MCV7XFxuICAgICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgfVxcblxcbiAgICB0byB7XFxuICAgICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICB9XFxufVxcblxcbiNwbGF5ZXIxR2FtZVRpbGUsICNwbGF5ZXIyR2FtZVRpbGV7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4QzY2MzY7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4jcGxheWVyMUdhbWVUaWxlOmhvdmVyLCAjcGxheWVyMkdhbWVUaWxlOmhvdmVye1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOEM0MjM2O1xcbn1cXG5cXG5cXG4jcGxheWVyMUdhbWVUaWxlLmhpdCwgI3BsYXllcjJHYW1lVGlsZS5oaXR7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM1QjI4MjA7XFxufVxcblxcblxcblxcbi5nYW1lQ29udGFpbmVyMSwgLmdhbWVDb250YWluZXIye1xcbiAgICBtYXJnaW46IDFyZW07XFxuICAgIHdpZHRoOiA0MnJlbTtcXG4gICAgaGVpZ2h0OiA0MnJlbTtcXG4gICAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpO1xcblxcbn1cXG4ubG9nb3tcXG4gICAgZm9udC1zaXplOiAgNnJlbTtcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLXNlY29uZGFyeS1mb250KTtcXG4gICAgbWFyZ2luLWJvdHRvbTogNTBweDtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDYwcHgpO1xcbiAgICBcXG59XFxuXFxuI3BsYXllcjFIZWFkZXIsICNwbGF5ZXIySGVhZGVye1xcbiAgICBncmlkLWNvbHVtbjogMS8tMTtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpO1xcbiAgICBcXG59XFxuXFxuLmhpdEltYWdle1xcbiAgICB3aWR0aDogOTAlO1xcbiAgICBoZWlnaHQ6IDkwJTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiA4MCU7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG59XFxuXFxuLmZvcm1Db250YWluZXJ7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzhDNDIzNjtcXG4gICAgei1pbmRleDogMztcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHRvcDogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcyBlYXNlLWluLW91dDtcXG5cXG59XFxuXFxuLnNoaXBGb3JtQ29udGFpbmVye1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4Qzc5MzY7XFxuICAgIHotaW5kZXg6IDI7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoIDEwMHZoKSByb3RhdGUoMTgwZGVnKTtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4uc2hpcEZvcm1Db250YWluZXIubW92ZWR7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSggMHZoKSByb3RhdGUoMGRlZyk7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcbi5zaGlwRm9ybUNvbnRhaW5lci5tb3ZlZC5zbGlkZURvd257XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwdmgpIHJvdGF0ZSgxODBkZWcpO1xcbiAgICBhbmltYXRpb246IGRpc2FwcGVhciAxcyBlYXNlLWluLW91dDtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICBvcGFjaXR5OiAwO1xcbn1cXG5cXG4uZm9ybUNvbnRhaW5lci5tb3ZlZHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKCAxMDB2aCkgcm90YXRlKDE4MGRlZyk7XFxuICAgIGFuaW1hdGlvbjogZGlzYXBwZWFyIDFzIGVhc2UtaW4tb3V0O1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIG9wYWNpdHk6IDA7XFxufVxcblxcbiNmb3JtLCAjc2hpcEZvcm17XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nOjMwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XFxuICAgIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwMHB4KTtcXG59XFxuXFxuI3BsYXllclR1cm57XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpO1xcbiAgICBmb250LXNpemU6IDMuNXJlbTtcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBcXG4gICAgXFxufVxcblxcbiNwbGF5ZXIxU2NvcmUsICNwbGF5ZXIyU2NvcmV7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpO1xcbiAgICBmb250LXNpemU6IDEuNXJlbTtcXG4gICAgbWFyZ2luOiAxNXB4O1xcbn1cXG5cXG4uaGVhZGVye1xcbiAgICBncmlkLWNvbHVtbjogMS8gLTE7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI4NjgzQjtcXG4gICAgYm9yZGVyLXJhZGl1czogMnJlbTtcXG4gICAgYm94LXNoYWRvdzogMXB4IDFweCAxMHB4IHJnYig1MywgNTMsIDUzKTtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgbWFyZ2luOiAzMHB4O1xcbiAgICB3aWR0aDogNTAlO1xcbn1cXG5cXG5pbnB1dFt0eXBlPVxcXCJ0ZXh0XFxcIl0sIGlucHV0W3R5cGU9XFxcIm51bWJlclxcXCJde1xcbiAgICB3aWR0aDogNzAlO1xcbiAgICBoZWlnaHQ6IDNyZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgYmxhY2s7XFxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLW1haW4tZm9udCk7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdOmZvY3VzLCAgaW5wdXRbdHlwZT1cXFwibnVtYmVyXFxcIl06Zm9jdXN7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxufVxcblxcbmgxe1xcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tbWFpbi1mb250KTtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5cXG5idXR0b257XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOEM0MjM2O1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDJweCByZ2IoNTMsIDUzLCA1Myk7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG5sYWJlbHtcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLW1haW4tZm9udCk7XFxuICAgIGZvbnQtc2l6ZTogMS40cmVtO1xcbn1cXG5cXG5pbWd7XFxuICAgIHdpZHRoOiAzMHB4O1xcbn1cXG5cXG5ib2R5e1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjY0NTU5O1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciA1ZnI7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gICAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgd2lkdGg6IDEwMCU7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxzQ0FBc0M7SUFDdEMsa0NBQWtDO0FBQ3RDOztBQUVBO0lBQ0k7UUFDSSxtQkFBbUI7UUFDbkIsVUFBVTtJQUNkOzs7SUFHQTtRQUNJLG1CQUFtQjtRQUNuQixVQUFVO0lBQ2Q7O0lBRUE7UUFDSSxrQkFBa0I7UUFDbEIsVUFBVTtJQUNkO0FBQ0o7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsV0FBVztJQUNYLFlBQVk7SUFDWixTQUFTO0lBQ1QsdUJBQXVCO0lBQ3ZCLGVBQWU7SUFDZixhQUFhO0lBQ2IscUJBQXFCO0lBQ3JCLHNCQUFzQjtBQUMxQjtBQUNBO0lBQ0kseUJBQXlCO0FBQzdCOzs7QUFHQTtJQUNJLHlCQUF5QjtBQUM3Qjs7OztBQUlBO0lBQ0ksWUFBWTtJQUNaLFlBQVk7SUFDWixhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixzQ0FBc0M7SUFDdEMsbUNBQW1DOztBQUV2QztBQUNBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGtDQUFrQztJQUNsQyxtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLDJCQUEyQjs7QUFFL0I7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsZUFBZTtJQUNmLFlBQVk7SUFDWiw2QkFBNkI7O0FBRWpDOztBQUVBO0lBQ0ksVUFBVTtJQUNWLFdBQVc7SUFDWCxvQkFBb0I7SUFDcEIsNEJBQTRCO0lBQzVCLDJCQUEyQjtBQUMvQjs7QUFFQTtJQUNJLGVBQWU7SUFDZix5QkFBeUI7SUFDekIsVUFBVTtJQUNWLFdBQVc7SUFDWCxhQUFhO0lBQ2IsTUFBTTtJQUNOLE9BQU87SUFDUCxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixvQ0FBb0M7O0FBRXhDOztBQUVBO0lBQ0ksZUFBZTtJQUNmLHlCQUF5QjtJQUN6QixVQUFVO0lBQ1YsV0FBVztJQUNYLGFBQWE7SUFDYixNQUFNO0lBQ04sT0FBTztJQUNQLFVBQVU7SUFDVixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsNENBQTRDO0lBQzVDLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLHdDQUF3QztJQUN4QyxVQUFVO0FBQ2Q7QUFDQTtJQUNJLDRDQUE0QztJQUM1QyxtQ0FBbUM7SUFDbkMsa0JBQWtCO0lBQ2xCLFVBQVU7QUFDZDs7QUFFQTtJQUNJLDRDQUE0QztJQUM1QyxtQ0FBbUM7SUFDbkMsa0JBQWtCO0lBQ2xCLFVBQVU7QUFDZDs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLDRCQUE0QjtJQUM1Qiw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSw2QkFBNkI7SUFDN0IsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQiw4QkFBOEI7OztBQUdsQzs7QUFFQTtJQUNJLDZCQUE2QjtJQUM3QixpQkFBaUI7SUFDakIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLG1CQUFtQjtJQUNuQix3Q0FBd0M7SUFDeEMsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLFlBQVk7SUFDWixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsWUFBWTtJQUNaLDhCQUE4QjtJQUM5QixZQUFZO0lBQ1osOEJBQThCO0lBQzlCLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsNkJBQTZCO0lBQzdCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLDZCQUE2QjtJQUM3QixlQUFlO0FBQ25COztBQUVBO0lBQ0ksWUFBWTtJQUNaLFlBQVk7SUFDWix5QkFBeUI7SUFDekIsdUNBQXVDO0lBQ3ZDLGVBQWU7SUFDZixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksNkJBQTZCO0lBQzdCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6QixhQUFhO0lBQ2IsMkJBQTJCO0lBQzNCLDhCQUE4QjtJQUM5QixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLFdBQVc7QUFDZlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI6cm9vdHtcXG4gICAgLS1tYWluLWZvbnQ6ICdTb3VyY2UgU2VyaWYgUHJvJywgc2VyaWY7XFxuICAgIC0tc2Vjb25kYXJ5LWZvbnQ6ICdFYXN0IFNlYSBEb2tkbyc7XFxufVxcblxcbkBrZXlmcmFtZXMgZGlzYXBwZWFyIHtcXG4gICAgZnJvbSB7XFxuICAgICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgfVxcblxcblxcbiAgICA5MCV7XFxuICAgICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgfVxcblxcbiAgICB0byB7XFxuICAgICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICB9XFxufVxcblxcbiNwbGF5ZXIxR2FtZVRpbGUsICNwbGF5ZXIyR2FtZVRpbGV7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4QzY2MzY7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4jcGxheWVyMUdhbWVUaWxlOmhvdmVyLCAjcGxheWVyMkdhbWVUaWxlOmhvdmVye1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOEM0MjM2O1xcbn1cXG5cXG5cXG4jcGxheWVyMUdhbWVUaWxlLmhpdCwgI3BsYXllcjJHYW1lVGlsZS5oaXR7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM1QjI4MjA7XFxufVxcblxcblxcblxcbi5nYW1lQ29udGFpbmVyMSwgLmdhbWVDb250YWluZXIye1xcbiAgICBtYXJnaW46IDFyZW07XFxuICAgIHdpZHRoOiA0MnJlbTtcXG4gICAgaGVpZ2h0OiA0MnJlbTtcXG4gICAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpO1xcblxcbn1cXG4ubG9nb3tcXG4gICAgZm9udC1zaXplOiAgNnJlbTtcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLXNlY29uZGFyeS1mb250KTtcXG4gICAgbWFyZ2luLWJvdHRvbTogNTBweDtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDYwcHgpO1xcbiAgICBcXG59XFxuXFxuI3BsYXllcjFIZWFkZXIsICNwbGF5ZXIySGVhZGVye1xcbiAgICBncmlkLWNvbHVtbjogMS8tMTtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpO1xcbiAgICBcXG59XFxuXFxuLmhpdEltYWdle1xcbiAgICB3aWR0aDogOTAlO1xcbiAgICBoZWlnaHQ6IDkwJTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiA4MCU7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG59XFxuXFxuLmZvcm1Db250YWluZXJ7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzhDNDIzNjtcXG4gICAgei1pbmRleDogMztcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHRvcDogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxcyBlYXNlLWluLW91dDtcXG5cXG59XFxuXFxuLnNoaXBGb3JtQ29udGFpbmVye1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM4Qzc5MzY7XFxuICAgIHotaW5kZXg6IDI7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoIDEwMHZoKSByb3RhdGUoMTgwZGVnKTtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4uc2hpcEZvcm1Db250YWluZXIubW92ZWR7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSggMHZoKSByb3RhdGUoMGRlZyk7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcbi5zaGlwRm9ybUNvbnRhaW5lci5tb3ZlZC5zbGlkZURvd257XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwdmgpIHJvdGF0ZSgxODBkZWcpO1xcbiAgICBhbmltYXRpb246IGRpc2FwcGVhciAxcyBlYXNlLWluLW91dDtcXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICBvcGFjaXR5OiAwO1xcbn1cXG5cXG4uZm9ybUNvbnRhaW5lci5tb3ZlZHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKCAxMDB2aCkgcm90YXRlKDE4MGRlZyk7XFxuICAgIGFuaW1hdGlvbjogZGlzYXBwZWFyIDFzIGVhc2UtaW4tb3V0O1xcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIG9wYWNpdHk6IDA7XFxufVxcblxcbiNmb3JtLCAjc2hpcEZvcm17XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nOjMwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XFxuICAgIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwMHB4KTtcXG59XFxuXFxuI3BsYXllclR1cm57XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpO1xcbiAgICBmb250LXNpemU6IDMuNXJlbTtcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBcXG4gICAgXFxufVxcblxcbiNwbGF5ZXIxU2NvcmUsICNwbGF5ZXIyU2NvcmV7XFxuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1tYWluLWZvbnQpO1xcbiAgICBmb250LXNpemU6IDEuNXJlbTtcXG4gICAgbWFyZ2luOiAxNXB4O1xcbn1cXG5cXG4uaGVhZGVye1xcbiAgICBncmlkLWNvbHVtbjogMS8gLTE7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI4NjgzQjtcXG4gICAgYm9yZGVyLXJhZGl1czogMnJlbTtcXG4gICAgYm94LXNoYWRvdzogMXB4IDFweCAxMHB4IHJnYig1MywgNTMsIDUzKTtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgbWFyZ2luOiAzMHB4O1xcbiAgICB3aWR0aDogNTAlO1xcbn1cXG5cXG5pbnB1dFt0eXBlPVxcXCJ0ZXh0XFxcIl0sIGlucHV0W3R5cGU9XFxcIm51bWJlclxcXCJde1xcbiAgICB3aWR0aDogNzAlO1xcbiAgICBoZWlnaHQ6IDNyZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgYmxhY2s7XFxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLW1haW4tZm9udCk7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdOmZvY3VzLCAgaW5wdXRbdHlwZT1cXFwibnVtYmVyXFxcIl06Zm9jdXN7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxufVxcblxcbmgxe1xcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgICBmb250LWZhbWlseTogdmFyKC0tbWFpbi1mb250KTtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5cXG5idXR0b257XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOEM0MjM2O1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDJweCByZ2IoNTMsIDUzLCA1Myk7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG5sYWJlbHtcXG4gICAgZm9udC1mYW1pbHk6IHZhcigtLW1haW4tZm9udCk7XFxuICAgIGZvbnQtc2l6ZTogMS40cmVtO1xcbn1cXG5cXG5pbWd7XFxuICAgIHdpZHRoOiAzMHB4O1xcbn1cXG5cXG5ib2R5e1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjY0NTU5O1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciA1ZnI7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gICAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgd2lkdGg6IDEwMCU7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vY3NzUmVzZXQuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9jc3NSZXNldC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDcmVhdGVkIGJ5IFNlcmdpdSDImGFuZG9yIChtaWNrdTd6dSkgb24gMS8yNy8yMDE3LlxuICogT3JpZ2luYWwgaWRlYTogaHR0cHM6Ly9naXRodWIuY29tL2dpanNyb2dlL3RpbHQuanNcbiAqIE1JVCBMaWNlbnNlLlxuICogVmVyc2lvbiAxLjcuMlxuICovXG5cbnZhciBWYW5pbGxhVGlsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gVmFuaWxsYVRpbHQoZWxlbWVudCkge1xuICAgIHZhciBzZXR0aW5ncyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgVmFuaWxsYVRpbHQpO1xuXG4gICAgaWYgKCEoZWxlbWVudCBpbnN0YW5jZW9mIE5vZGUpKSB7XG4gICAgICB0aHJvdyBcIkNhbid0IGluaXRpYWxpemUgVmFuaWxsYVRpbHQgYmVjYXVzZSBcIiArIGVsZW1lbnQgKyBcIiBpcyBub3QgYSBOb2RlLlwiO1xuICAgIH1cblxuICAgIHRoaXMud2lkdGggPSBudWxsO1xuICAgIHRoaXMuaGVpZ2h0ID0gbnVsbDtcbiAgICB0aGlzLmNsaWVudFdpZHRoID0gbnVsbDtcbiAgICB0aGlzLmNsaWVudEhlaWdodCA9IG51bGw7XG4gICAgdGhpcy5sZWZ0ID0gbnVsbDtcbiAgICB0aGlzLnRvcCA9IG51bGw7XG5cbiAgICAvLyBmb3IgR3lyb3Njb3BlIHNhbXBsaW5nXG4gICAgdGhpcy5nYW1tYXplcm8gPSBudWxsO1xuICAgIHRoaXMuYmV0YXplcm8gPSBudWxsO1xuICAgIHRoaXMubGFzdGdhbW1hemVybyA9IG51bGw7XG4gICAgdGhpcy5sYXN0YmV0YXplcm8gPSBudWxsO1xuXG4gICAgdGhpcy50cmFuc2l0aW9uVGltZW91dCA9IG51bGw7XG4gICAgdGhpcy51cGRhdGVDYWxsID0gbnVsbDtcbiAgICB0aGlzLmV2ZW50ID0gbnVsbDtcblxuICAgIHRoaXMudXBkYXRlQmluZCA9IHRoaXMudXBkYXRlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5yZXNldEJpbmQgPSB0aGlzLnJlc2V0LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLmV4dGVuZFNldHRpbmdzKHNldHRpbmdzKTtcblxuICAgIHRoaXMucmV2ZXJzZSA9IHRoaXMuc2V0dGluZ3MucmV2ZXJzZSA/IC0xIDogMTtcbiAgICB0aGlzLmdsYXJlID0gVmFuaWxsYVRpbHQuaXNTZXR0aW5nVHJ1ZSh0aGlzLnNldHRpbmdzLmdsYXJlKTtcbiAgICB0aGlzLmdsYXJlUHJlcmVuZGVyID0gVmFuaWxsYVRpbHQuaXNTZXR0aW5nVHJ1ZSh0aGlzLnNldHRpbmdzW1wiZ2xhcmUtcHJlcmVuZGVyXCJdKTtcbiAgICB0aGlzLmZ1bGxQYWdlTGlzdGVuaW5nID0gVmFuaWxsYVRpbHQuaXNTZXR0aW5nVHJ1ZSh0aGlzLnNldHRpbmdzW1wiZnVsbC1wYWdlLWxpc3RlbmluZ1wiXSk7XG4gICAgdGhpcy5neXJvc2NvcGUgPSBWYW5pbGxhVGlsdC5pc1NldHRpbmdUcnVlKHRoaXMuc2V0dGluZ3MuZ3lyb3Njb3BlKTtcbiAgICB0aGlzLmd5cm9zY29wZVNhbXBsZXMgPSB0aGlzLnNldHRpbmdzLmd5cm9zY29wZVNhbXBsZXM7XG5cbiAgICB0aGlzLmVsZW1lbnRMaXN0ZW5lciA9IHRoaXMuZ2V0RWxlbWVudExpc3RlbmVyKCk7XG5cbiAgICBpZiAodGhpcy5nbGFyZSkge1xuICAgICAgdGhpcy5wcmVwYXJlR2xhcmUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mdWxsUGFnZUxpc3RlbmluZykge1xuICAgICAgdGhpcy51cGRhdGVDbGllbnRTaXplKCk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICB0aGlzLnVwZGF0ZUluaXRpYWxQb3NpdGlvbigpO1xuICB9XG5cbiAgVmFuaWxsYVRpbHQuaXNTZXR0aW5nVHJ1ZSA9IGZ1bmN0aW9uIGlzU2V0dGluZ1RydWUoc2V0dGluZykge1xuICAgIHJldHVybiBzZXR0aW5nID09PSBcIlwiIHx8IHNldHRpbmcgPT09IHRydWUgfHwgc2V0dGluZyA9PT0gMTtcbiAgfTtcblxuICAvKipcbiAgICogTWV0aG9kIHJldHVybnMgZWxlbWVudCB3aGF0IHdpbGwgYmUgbGlzdGVuIG1vdXNlIGV2ZW50c1xuICAgKiBAcmV0dXJuIHtOb2RlfVxuICAgKi9cblxuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5nZXRFbGVtZW50TGlzdGVuZXIgPSBmdW5jdGlvbiBnZXRFbGVtZW50TGlzdGVuZXIoKSB7XG4gICAgaWYgKHRoaXMuZnVsbFBhZ2VMaXN0ZW5pbmcpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZG9jdW1lbnQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzW1wibW91c2UtZXZlbnQtZWxlbWVudFwiXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdmFyIG1vdXNlRXZlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNldHRpbmdzW1wibW91c2UtZXZlbnQtZWxlbWVudFwiXSk7XG5cbiAgICAgIGlmIChtb3VzZUV2ZW50RWxlbWVudCkge1xuICAgICAgICByZXR1cm4gbW91c2VFdmVudEVsZW1lbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3NbXCJtb3VzZS1ldmVudC1lbGVtZW50XCJdIGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3NbXCJtb3VzZS1ldmVudC1lbGVtZW50XCJdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBzZXQgbGlzdGVuIG1ldGhvZHMgZm9yIHRoaXMuZWxlbWVudExpc3RlbmVyXG4gICAqIEByZXR1cm4ge05vZGV9XG4gICAqL1xuXG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5vbk1vdXNlRW50ZXJCaW5kID0gdGhpcy5vbk1vdXNlRW50ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uTW91c2VNb3ZlQmluZCA9IHRoaXMub25Nb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uTW91c2VMZWF2ZUJpbmQgPSB0aGlzLm9uTW91c2VMZWF2ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25XaW5kb3dSZXNpemVCaW5kID0gdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25EZXZpY2VPcmllbnRhdGlvbkJpbmQgPSB0aGlzLm9uRGV2aWNlT3JpZW50YXRpb24uYmluZCh0aGlzKTtcblxuICAgIHRoaXMuZWxlbWVudExpc3RlbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIHRoaXMub25Nb3VzZUVudGVyQmluZCk7XG4gICAgdGhpcy5lbGVtZW50TGlzdGVuZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgdGhpcy5vbk1vdXNlTGVhdmVCaW5kKTtcbiAgICB0aGlzLmVsZW1lbnRMaXN0ZW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMub25Nb3VzZU1vdmVCaW5kKTtcblxuICAgIGlmICh0aGlzLmdsYXJlIHx8IHRoaXMuZnVsbFBhZ2VMaXN0ZW5pbmcpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMub25XaW5kb3dSZXNpemVCaW5kKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5neXJvc2NvcGUpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlb3JpZW50YXRpb25cIiwgdGhpcy5vbkRldmljZU9yaWVudGF0aW9uQmluZCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBNZXRob2QgcmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBmcm9tIGN1cnJlbnQgdGhpcy5lbGVtZW50TGlzdGVuZXJcbiAgICovXG5cblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLmVsZW1lbnRMaXN0ZW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCB0aGlzLm9uTW91c2VFbnRlckJpbmQpO1xuICAgIHRoaXMuZWxlbWVudExpc3RlbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRoaXMub25Nb3VzZUxlYXZlQmluZCk7XG4gICAgdGhpcy5lbGVtZW50TGlzdGVuZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm9uTW91c2VNb3ZlQmluZCk7XG5cbiAgICBpZiAodGhpcy5neXJvc2NvcGUpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZGV2aWNlb3JpZW50YXRpb25cIiwgdGhpcy5vbkRldmljZU9yaWVudGF0aW9uQmluZCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZ2xhcmUgfHwgdGhpcy5mdWxsUGFnZUxpc3RlbmluZykge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5vbldpbmRvd1Jlc2l6ZUJpbmQpO1xuICAgIH1cbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudHJhbnNpdGlvblRpbWVvdXQpO1xuICAgIGlmICh0aGlzLnVwZGF0ZUNhbGwgIT09IG51bGwpIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlQ2FsbCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZXNldCgpO1xuXG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuZWxlbWVudC52YW5pbGxhVGlsdCA9IG51bGw7XG4gICAgZGVsZXRlIHRoaXMuZWxlbWVudC52YW5pbGxhVGlsdDtcblxuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLm9uRGV2aWNlT3JpZW50YXRpb24gPSBmdW5jdGlvbiBvbkRldmljZU9yaWVudGF0aW9uKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmdhbW1hID09PSBudWxsIHx8IGV2ZW50LmJldGEgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUVsZW1lbnRQb3NpdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuZ3lyb3Njb3BlU2FtcGxlcyA+IDApIHtcbiAgICAgIHRoaXMubGFzdGdhbW1hemVybyA9IHRoaXMuZ2FtbWF6ZXJvO1xuICAgICAgdGhpcy5sYXN0YmV0YXplcm8gPSB0aGlzLmJldGF6ZXJvO1xuXG4gICAgICBpZiAodGhpcy5nYW1tYXplcm8gPT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5nYW1tYXplcm8gPSBldmVudC5nYW1tYTtcbiAgICAgICAgdGhpcy5iZXRhemVybyA9IGV2ZW50LmJldGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmdhbW1hemVybyA9IChldmVudC5nYW1tYSArIHRoaXMubGFzdGdhbW1hemVybykgLyAyO1xuICAgICAgICB0aGlzLmJldGF6ZXJvID0gKGV2ZW50LmJldGEgKyB0aGlzLmxhc3RiZXRhemVybykgLyAyO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmd5cm9zY29wZVNhbXBsZXMgLT0gMTtcbiAgICB9XG5cbiAgICB2YXIgdG90YWxBbmdsZVggPSB0aGlzLnNldHRpbmdzLmd5cm9zY29wZU1heEFuZ2xlWCAtIHRoaXMuc2V0dGluZ3MuZ3lyb3Njb3BlTWluQW5nbGVYO1xuICAgIHZhciB0b3RhbEFuZ2xlWSA9IHRoaXMuc2V0dGluZ3MuZ3lyb3Njb3BlTWF4QW5nbGVZIC0gdGhpcy5zZXR0aW5ncy5neXJvc2NvcGVNaW5BbmdsZVk7XG5cbiAgICB2YXIgZGVncmVlc1BlclBpeGVsWCA9IHRvdGFsQW5nbGVYIC8gdGhpcy53aWR0aDtcbiAgICB2YXIgZGVncmVlc1BlclBpeGVsWSA9IHRvdGFsQW5nbGVZIC8gdGhpcy5oZWlnaHQ7XG5cbiAgICB2YXIgYW5nbGVYID0gZXZlbnQuZ2FtbWEgLSAodGhpcy5zZXR0aW5ncy5neXJvc2NvcGVNaW5BbmdsZVggKyB0aGlzLmdhbW1hemVybyk7XG4gICAgdmFyIGFuZ2xlWSA9IGV2ZW50LmJldGEgLSAodGhpcy5zZXR0aW5ncy5neXJvc2NvcGVNaW5BbmdsZVkgKyB0aGlzLmJldGF6ZXJvKTtcblxuICAgIHZhciBwb3NYID0gYW5nbGVYIC8gZGVncmVlc1BlclBpeGVsWDtcbiAgICB2YXIgcG9zWSA9IGFuZ2xlWSAvIGRlZ3JlZXNQZXJQaXhlbFk7XG5cbiAgICBpZiAodGhpcy51cGRhdGVDYWxsICE9PSBudWxsKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZUNhbGwpO1xuICAgIH1cblxuICAgIHRoaXMuZXZlbnQgPSB7XG4gICAgICBjbGllbnRYOiBwb3NYICsgdGhpcy5sZWZ0LFxuICAgICAgY2xpZW50WTogcG9zWSArIHRoaXMudG9wXG4gICAgfTtcblxuICAgIHRoaXMudXBkYXRlQ2FsbCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZUJpbmQpO1xuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5vbk1vdXNlRW50ZXIgPSBmdW5jdGlvbiBvbk1vdXNlRW50ZXIoKSB7XG4gICAgdGhpcy51cGRhdGVFbGVtZW50UG9zaXRpb24oKTtcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUud2lsbENoYW5nZSA9IFwidHJhbnNmb3JtXCI7XG4gICAgdGhpcy5zZXRUcmFuc2l0aW9uKCk7XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLm9uTW91c2VNb3ZlID0gZnVuY3Rpb24gb25Nb3VzZU1vdmUoZXZlbnQpIHtcbiAgICBpZiAodGhpcy51cGRhdGVDYWxsICE9PSBudWxsKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZUNhbGwpO1xuICAgIH1cblxuICAgIHRoaXMuZXZlbnQgPSBldmVudDtcbiAgICB0aGlzLnVwZGF0ZUNhbGwgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVCaW5kKTtcbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUub25Nb3VzZUxlYXZlID0gZnVuY3Rpb24gb25Nb3VzZUxlYXZlKCkge1xuICAgIHRoaXMuc2V0VHJhbnNpdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MucmVzZXQpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlc2V0QmluZCk7XG4gICAgfVxuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIHRoaXMuZXZlbnQgPSB7XG4gICAgICBjbGllbnRYOiB0aGlzLmxlZnQgKyB0aGlzLndpZHRoIC8gMixcbiAgICAgIGNsaWVudFk6IHRoaXMudG9wICsgdGhpcy5oZWlnaHQgLyAyXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmVsZW1lbnQgJiYgdGhpcy5lbGVtZW50LnN0eWxlKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJwZXJzcGVjdGl2ZShcIiArIHRoaXMuc2V0dGluZ3MucGVyc3BlY3RpdmUgKyBcInB4KSBcIiArIFwicm90YXRlWCgwZGVnKSBcIiArIFwicm90YXRlWSgwZGVnKSBcIiArIFwic2NhbGUzZCgxLCAxLCAxKVwiO1xuICAgIH1cblxuICAgIHRoaXMucmVzZXRHbGFyZSgpO1xuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS5yZXNldEdsYXJlID0gZnVuY3Rpb24gcmVzZXRHbGFyZSgpIHtcbiAgICBpZiAodGhpcy5nbGFyZSkge1xuICAgICAgdGhpcy5nbGFyZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJyb3RhdGUoMTgwZGVnKSB0cmFuc2xhdGUoLTUwJSwgLTUwJSlcIjtcbiAgICAgIHRoaXMuZ2xhcmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbiAgICB9XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLnVwZGF0ZUluaXRpYWxQb3NpdGlvbiA9IGZ1bmN0aW9uIHVwZGF0ZUluaXRpYWxQb3NpdGlvbigpIHtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5zdGFydFggPT09IDAgJiYgdGhpcy5zZXR0aW5ncy5zdGFydFkgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9uTW91c2VFbnRlcigpO1xuXG4gICAgaWYgKHRoaXMuZnVsbFBhZ2VMaXN0ZW5pbmcpIHtcbiAgICAgIHRoaXMuZXZlbnQgPSB7XG4gICAgICAgIGNsaWVudFg6ICh0aGlzLnNldHRpbmdzLnN0YXJ0WCArIHRoaXMuc2V0dGluZ3MubWF4KSAvICgyICogdGhpcy5zZXR0aW5ncy5tYXgpICogdGhpcy5jbGllbnRXaWR0aCxcbiAgICAgICAgY2xpZW50WTogKHRoaXMuc2V0dGluZ3Muc3RhcnRZICsgdGhpcy5zZXR0aW5ncy5tYXgpIC8gKDIgKiB0aGlzLnNldHRpbmdzLm1heCkgKiB0aGlzLmNsaWVudEhlaWdodFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ldmVudCA9IHtcbiAgICAgICAgY2xpZW50WDogdGhpcy5sZWZ0ICsgKHRoaXMuc2V0dGluZ3Muc3RhcnRYICsgdGhpcy5zZXR0aW5ncy5tYXgpIC8gKDIgKiB0aGlzLnNldHRpbmdzLm1heCkgKiB0aGlzLndpZHRoLFxuICAgICAgICBjbGllbnRZOiB0aGlzLnRvcCArICh0aGlzLnNldHRpbmdzLnN0YXJ0WSArIHRoaXMuc2V0dGluZ3MubWF4KSAvICgyICogdGhpcy5zZXR0aW5ncy5tYXgpICogdGhpcy5oZWlnaHRcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGJhY2t1cFNjYWxlID0gdGhpcy5zZXR0aW5ncy5zY2FsZTtcbiAgICB0aGlzLnNldHRpbmdzLnNjYWxlID0gMTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIHRoaXMuc2V0dGluZ3Muc2NhbGUgPSBiYWNrdXBTY2FsZTtcbiAgICB0aGlzLnJlc2V0R2xhcmUoKTtcbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUuZ2V0VmFsdWVzID0gZnVuY3Rpb24gZ2V0VmFsdWVzKCkge1xuICAgIHZhciB4ID0gdm9pZCAwLFxuICAgICAgICB5ID0gdm9pZCAwO1xuXG4gICAgaWYgKHRoaXMuZnVsbFBhZ2VMaXN0ZW5pbmcpIHtcbiAgICAgIHggPSB0aGlzLmV2ZW50LmNsaWVudFggLyB0aGlzLmNsaWVudFdpZHRoO1xuICAgICAgeSA9IHRoaXMuZXZlbnQuY2xpZW50WSAvIHRoaXMuY2xpZW50SGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gKHRoaXMuZXZlbnQuY2xpZW50WCAtIHRoaXMubGVmdCkgLyB0aGlzLndpZHRoO1xuICAgICAgeSA9ICh0aGlzLmV2ZW50LmNsaWVudFkgLSB0aGlzLnRvcCkgLyB0aGlzLmhlaWdodDtcbiAgICB9XG5cbiAgICB4ID0gTWF0aC5taW4oTWF0aC5tYXgoeCwgMCksIDEpO1xuICAgIHkgPSBNYXRoLm1pbihNYXRoLm1heCh5LCAwKSwgMSk7XG5cbiAgICB2YXIgdGlsdFggPSAodGhpcy5yZXZlcnNlICogKHRoaXMuc2V0dGluZ3MubWF4IC0geCAqIHRoaXMuc2V0dGluZ3MubWF4ICogMikpLnRvRml4ZWQoMik7XG4gICAgdmFyIHRpbHRZID0gKHRoaXMucmV2ZXJzZSAqICh5ICogdGhpcy5zZXR0aW5ncy5tYXggKiAyIC0gdGhpcy5zZXR0aW5ncy5tYXgpKS50b0ZpeGVkKDIpO1xuICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIodGhpcy5ldmVudC5jbGllbnRYIC0gKHRoaXMubGVmdCArIHRoaXMud2lkdGggLyAyKSwgLSh0aGlzLmV2ZW50LmNsaWVudFkgLSAodGhpcy50b3AgKyB0aGlzLmhlaWdodCAvIDIpKSkgKiAoMTgwIC8gTWF0aC5QSSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdGlsdFg6IHRpbHRYLFxuICAgICAgdGlsdFk6IHRpbHRZLFxuICAgICAgcGVyY2VudGFnZVg6IHggKiAxMDAsXG4gICAgICBwZXJjZW50YWdlWTogeSAqIDEwMCxcbiAgICAgIGFuZ2xlOiBhbmdsZVxuICAgIH07XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLnVwZGF0ZUVsZW1lbnRQb3NpdGlvbiA9IGZ1bmN0aW9uIHVwZGF0ZUVsZW1lbnRQb3NpdGlvbigpIHtcbiAgICB2YXIgcmVjdCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHRoaXMud2lkdGggPSB0aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIHRoaXMubGVmdCA9IHJlY3QubGVmdDtcbiAgICB0aGlzLnRvcCA9IHJlY3QudG9wO1xuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIHZhbHVlcyA9IHRoaXMuZ2V0VmFsdWVzKCk7XG5cbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJwZXJzcGVjdGl2ZShcIiArIHRoaXMuc2V0dGluZ3MucGVyc3BlY3RpdmUgKyBcInB4KSBcIiArIFwicm90YXRlWChcIiArICh0aGlzLnNldHRpbmdzLmF4aXMgPT09IFwieFwiID8gMCA6IHZhbHVlcy50aWx0WSkgKyBcImRlZykgXCIgKyBcInJvdGF0ZVkoXCIgKyAodGhpcy5zZXR0aW5ncy5heGlzID09PSBcInlcIiA/IDAgOiB2YWx1ZXMudGlsdFgpICsgXCJkZWcpIFwiICsgXCJzY2FsZTNkKFwiICsgdGhpcy5zZXR0aW5ncy5zY2FsZSArIFwiLCBcIiArIHRoaXMuc2V0dGluZ3Muc2NhbGUgKyBcIiwgXCIgKyB0aGlzLnNldHRpbmdzLnNjYWxlICsgXCIpXCI7XG5cbiAgICBpZiAodGhpcy5nbGFyZSkge1xuICAgICAgdGhpcy5nbGFyZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJyb3RhdGUoXCIgKyB2YWx1ZXMuYW5nbGUgKyBcImRlZykgdHJhbnNsYXRlKC01MCUsIC01MCUpXCI7XG4gICAgICB0aGlzLmdsYXJlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCJcIiArIHZhbHVlcy5wZXJjZW50YWdlWSAqIHRoaXMuc2V0dGluZ3NbXCJtYXgtZ2xhcmVcIl0gLyAxMDA7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwidGlsdENoYW5nZVwiLCB7XG4gICAgICBcImRldGFpbFwiOiB2YWx1ZXNcbiAgICB9KSk7XG5cbiAgICB0aGlzLnVwZGF0ZUNhbGwgPSBudWxsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBcHBlbmRzIHRoZSBnbGFyZSBlbGVtZW50IChpZiBnbGFyZVByZXJlbmRlciBlcXVhbHMgZmFsc2UpXG4gICAqIGFuZCBzZXRzIHRoZSBkZWZhdWx0IHN0eWxlXG4gICAqL1xuXG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLnByZXBhcmVHbGFyZSA9IGZ1bmN0aW9uIHByZXBhcmVHbGFyZSgpIHtcbiAgICAvLyBJZiBvcHRpb24gcHJlLXJlbmRlciBpcyBlbmFibGVkIHdlIGFzc3VtZSBhbGwgaHRtbC9jc3MgaXMgcHJlc2VudCBmb3IgYW4gb3B0aW1hbCBnbGFyZSBlZmZlY3QuXG4gICAgaWYgKCF0aGlzLmdsYXJlUHJlcmVuZGVyKSB7XG4gICAgICAvLyBDcmVhdGUgZ2xhcmUgZWxlbWVudFxuICAgICAgdmFyIGpzVGlsdEdsYXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGpzVGlsdEdsYXJlLmNsYXNzTGlzdC5hZGQoXCJqcy10aWx0LWdsYXJlXCIpO1xuXG4gICAgICB2YXIganNUaWx0R2xhcmVJbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBqc1RpbHRHbGFyZUlubmVyLmNsYXNzTGlzdC5hZGQoXCJqcy10aWx0LWdsYXJlLWlubmVyXCIpO1xuXG4gICAgICBqc1RpbHRHbGFyZS5hcHBlbmRDaGlsZChqc1RpbHRHbGFyZUlubmVyKTtcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChqc1RpbHRHbGFyZSk7XG4gICAgfVxuXG4gICAgdGhpcy5nbGFyZUVsZW1lbnRXcmFwcGVyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtdGlsdC1nbGFyZVwiKTtcbiAgICB0aGlzLmdsYXJlRWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXRpbHQtZ2xhcmUtaW5uZXJcIik7XG5cbiAgICBpZiAodGhpcy5nbGFyZVByZXJlbmRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5hc3NpZ24odGhpcy5nbGFyZUVsZW1lbnRXcmFwcGVyLnN0eWxlLCB7XG4gICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgIFwidG9wXCI6IFwiMFwiLFxuICAgICAgXCJsZWZ0XCI6IFwiMFwiLFxuICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgIFwiaGVpZ2h0XCI6IFwiMTAwJVwiLFxuICAgICAgXCJvdmVyZmxvd1wiOiBcImhpZGRlblwiLFxuICAgICAgXCJwb2ludGVyLWV2ZW50c1wiOiBcIm5vbmVcIlxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmdsYXJlRWxlbWVudC5zdHlsZSwge1xuICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICBcInRvcFwiOiBcIjUwJVwiLFxuICAgICAgXCJsZWZ0XCI6IFwiNTAlXCIsXG4gICAgICBcInBvaW50ZXItZXZlbnRzXCI6IFwibm9uZVwiLFxuICAgICAgXCJiYWNrZ3JvdW5kLWltYWdlXCI6IFwibGluZWFyLWdyYWRpZW50KDBkZWcsIHJnYmEoMjU1LDI1NSwyNTUsMCkgMCUsIHJnYmEoMjU1LDI1NSwyNTUsMSkgMTAwJSlcIixcbiAgICAgIFwidHJhbnNmb3JtXCI6IFwicm90YXRlKDE4MGRlZykgdHJhbnNsYXRlKC01MCUsIC01MCUpXCIsXG4gICAgICBcInRyYW5zZm9ybS1vcmlnaW5cIjogXCIwJSAwJVwiLFxuICAgICAgXCJvcGFjaXR5XCI6IFwiMFwiXG4gICAgfSk7XG5cbiAgICB0aGlzLnVwZGF0ZUdsYXJlU2l6ZSgpO1xuICB9O1xuXG4gIFZhbmlsbGFUaWx0LnByb3RvdHlwZS51cGRhdGVHbGFyZVNpemUgPSBmdW5jdGlvbiB1cGRhdGVHbGFyZVNpemUoKSB7XG4gICAgaWYgKHRoaXMuZ2xhcmUpIHtcbiAgICAgIHZhciBnbGFyZVNpemUgPSAodGhpcy5lbGVtZW50Lm9mZnNldFdpZHRoID4gdGhpcy5lbGVtZW50Lm9mZnNldEhlaWdodCA/IHRoaXMuZWxlbWVudC5vZmZzZXRXaWR0aCA6IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQpICogMjtcblxuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmdsYXJlRWxlbWVudC5zdHlsZSwge1xuICAgICAgICBcIndpZHRoXCI6IGdsYXJlU2l6ZSArIFwicHhcIixcbiAgICAgICAgXCJoZWlnaHRcIjogZ2xhcmVTaXplICsgXCJweFwiXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLnVwZGF0ZUNsaWVudFNpemUgPSBmdW5jdGlvbiB1cGRhdGVDbGllbnRTaXplKCkge1xuICAgIHRoaXMuY2xpZW50V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcblxuICAgIHRoaXMuY2xpZW50SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQ7XG4gIH07XG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLm9uV2luZG93UmVzaXplID0gZnVuY3Rpb24gb25XaW5kb3dSZXNpemUoKSB7XG4gICAgdGhpcy51cGRhdGVHbGFyZVNpemUoKTtcbiAgICB0aGlzLnVwZGF0ZUNsaWVudFNpemUoKTtcbiAgfTtcblxuICBWYW5pbGxhVGlsdC5wcm90b3R5cGUuc2V0VHJhbnNpdGlvbiA9IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRyYW5zaXRpb25UaW1lb3V0KTtcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IHRoaXMuc2V0dGluZ3Muc3BlZWQgKyBcIm1zIFwiICsgdGhpcy5zZXR0aW5ncy5lYXNpbmc7XG4gICAgaWYgKHRoaXMuZ2xhcmUpIHRoaXMuZ2xhcmVFbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSBcIm9wYWNpdHkgXCIgKyB0aGlzLnNldHRpbmdzLnNwZWVkICsgXCJtcyBcIiArIHRoaXMuc2V0dGluZ3MuZWFzaW5nO1xuXG4gICAgdGhpcy50cmFuc2l0aW9uVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gXCJcIjtcbiAgICAgIGlmIChfdGhpcy5nbGFyZSkge1xuICAgICAgICBfdGhpcy5nbGFyZUVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IFwiXCI7XG4gICAgICB9XG4gICAgfSwgdGhpcy5zZXR0aW5ncy5zcGVlZCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1ldGhvZCByZXR1cm4gcGF0Y2hlZCBzZXR0aW5ncyBvZiBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNldHRpbmdzLnJldmVyc2UgLSByZXZlcnNlIHRoZSB0aWx0IGRpcmVjdGlvblxuICAgKiBAcGFyYW0ge251bWJlcn0gc2V0dGluZ3MubWF4IC0gbWF4IHRpbHQgcm90YXRpb24gKGRlZ3JlZXMpXG4gICAqIEBwYXJhbSB7c3RhcnRYfSBzZXR0aW5ncy5zdGFydFggLSB0aGUgc3RhcnRpbmcgdGlsdCBvbiB0aGUgWCBheGlzLCBpbiBkZWdyZWVzLiBEZWZhdWx0OiAwXG4gICAqIEBwYXJhbSB7c3RhcnRZfSBzZXR0aW5ncy5zdGFydFkgLSB0aGUgc3RhcnRpbmcgdGlsdCBvbiB0aGUgWSBheGlzLCBpbiBkZWdyZWVzLiBEZWZhdWx0OiAwXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzZXR0aW5ncy5wZXJzcGVjdGl2ZSAtIFRyYW5zZm9ybSBwZXJzcGVjdGl2ZSwgdGhlIGxvd2VyIHRoZSBtb3JlIGV4dHJlbWUgdGhlIHRpbHQgZ2V0c1xuICAgKiBAcGFyYW0ge3N0cmluZ30gc2V0dGluZ3MuZWFzaW5nIC0gRWFzaW5nIG9uIGVudGVyL2V4aXRcbiAgICogQHBhcmFtIHtudW1iZXJ9IHNldHRpbmdzLnNjYWxlIC0gMiA9IDIwMCUsIDEuNSA9IDE1MCUsIGV0Yy4uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzZXR0aW5ncy5zcGVlZCAtIFNwZWVkIG9mIHRoZSBlbnRlci9leGl0IHRyYW5zaXRpb25cbiAgICogQHBhcmFtIHtib29sZWFufSBzZXR0aW5ncy50cmFuc2l0aW9uIC0gU2V0IGEgdHJhbnNpdGlvbiBvbiBlbnRlci9leGl0XG4gICAqIEBwYXJhbSB7c3RyaW5nfG51bGx9IHNldHRpbmdzLmF4aXMgLSBXaGF0IGF4aXMgc2hvdWxkIGJlIGRpc2FibGVkLiBDYW4gYmUgWCBvciBZXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2V0dGluZ3MuZ2xhcmUgLSBXaGF0IGF4aXMgc2hvdWxkIGJlIGRpc2FibGVkLiBDYW4gYmUgWCBvciBZXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzZXR0aW5ncy5tYXgtZ2xhcmUgLSB0aGUgbWF4aW11bSBcImdsYXJlXCIgb3BhY2l0eSAoMSA9IDEwMCUsIDAuNSA9IDUwJSlcbiAgICogQHBhcmFtIHtib29sZWFufSBzZXR0aW5ncy5nbGFyZS1wcmVyZW5kZXIgLSBmYWxzZSA9IFZhbmlsbGFUaWx0IGNyZWF0ZXMgdGhlIGdsYXJlIGVsZW1lbnRzIGZvciB5b3UsIG90aGVyd2lzZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNldHRpbmdzLmZ1bGwtcGFnZS1saXN0ZW5pbmcgLSBJZiB0cnVlLCBwYXJhbGxheCBlZmZlY3Qgd2lsbCBsaXN0ZW4gdG8gbW91c2UgbW92ZSBldmVudHMgb24gdGhlIHdob2xlIGRvY3VtZW50LCBub3Qgb25seSB0aGUgc2VsZWN0ZWQgZWxlbWVudFxuICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHNldHRpbmdzLm1vdXNlLWV2ZW50LWVsZW1lbnQgLSBTdHJpbmcgc2VsZWN0b3Igb3IgbGluayB0byBIVE1MLWVsZW1lbnQgd2hhdCB3aWxsIGJlIGxpc3RlbiBtb3VzZSBldmVudHNcbiAgICogQHBhcmFtIHtib29sZWFufSBzZXR0aW5ncy5yZXNldCAtIGZhbHNlID0gSWYgdGhlIHRpbHQgZWZmZWN0IGhhcyB0byBiZSByZXNldCBvbiBleGl0XG4gICAqIEBwYXJhbSB7Z3lyb3Njb3BlfSBzZXR0aW5ncy5neXJvc2NvcGUgLSBFbmFibGUgdGlsdGluZyBieSBkZXZpY2VvcmllbnRhdGlvbiBldmVudHNcbiAgICogQHBhcmFtIHtneXJvc2NvcGVTZW5zaXRpdml0eX0gc2V0dGluZ3MuZ3lyb3Njb3BlU2Vuc2l0aXZpdHkgLSBCZXR3ZWVuIDAgYW5kIDEgLSBUaGUgYW5nbGUgYXQgd2hpY2ggbWF4IHRpbHQgcG9zaXRpb24gaXMgcmVhY2hlZC4gMSA9IDkwZGVnLCAwLjUgPSA0NWRlZywgZXRjLi5cbiAgICogQHBhcmFtIHtneXJvc2NvcGVTYW1wbGVzfSBzZXR0aW5ncy5neXJvc2NvcGVTYW1wbGVzIC0gSG93IG1hbnkgZ3lyb3Njb3BlIG1vdmVzIHRvIGRlY2lkZSB0aGUgc3RhcnRpbmcgcG9zaXRpb24uXG4gICAqL1xuXG5cbiAgVmFuaWxsYVRpbHQucHJvdG90eXBlLmV4dGVuZFNldHRpbmdzID0gZnVuY3Rpb24gZXh0ZW5kU2V0dGluZ3Moc2V0dGluZ3MpIHtcbiAgICB2YXIgZGVmYXVsdFNldHRpbmdzID0ge1xuICAgICAgcmV2ZXJzZTogZmFsc2UsXG4gICAgICBtYXg6IDE1LFxuICAgICAgc3RhcnRYOiAwLFxuICAgICAgc3RhcnRZOiAwLFxuICAgICAgcGVyc3BlY3RpdmU6IDEwMDAsXG4gICAgICBlYXNpbmc6IFwiY3ViaWMtYmV6aWVyKC4wMywuOTgsLjUyLC45OSlcIixcbiAgICAgIHNjYWxlOiAxLFxuICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgIHRyYW5zaXRpb246IHRydWUsXG4gICAgICBheGlzOiBudWxsLFxuICAgICAgZ2xhcmU6IGZhbHNlLFxuICAgICAgXCJtYXgtZ2xhcmVcIjogMSxcbiAgICAgIFwiZ2xhcmUtcHJlcmVuZGVyXCI6IGZhbHNlLFxuICAgICAgXCJmdWxsLXBhZ2UtbGlzdGVuaW5nXCI6IGZhbHNlLFxuICAgICAgXCJtb3VzZS1ldmVudC1lbGVtZW50XCI6IG51bGwsXG4gICAgICByZXNldDogdHJ1ZSxcbiAgICAgIGd5cm9zY29wZTogdHJ1ZSxcbiAgICAgIGd5cm9zY29wZU1pbkFuZ2xlWDogLTQ1LFxuICAgICAgZ3lyb3Njb3BlTWF4QW5nbGVYOiA0NSxcbiAgICAgIGd5cm9zY29wZU1pbkFuZ2xlWTogLTQ1LFxuICAgICAgZ3lyb3Njb3BlTWF4QW5nbGVZOiA0NSxcbiAgICAgIGd5cm9zY29wZVNhbXBsZXM6IDEwXG4gICAgfTtcblxuICAgIHZhciBuZXdTZXR0aW5ncyA9IHt9O1xuICAgIGZvciAodmFyIHByb3BlcnR5IGluIGRlZmF1bHRTZXR0aW5ncykge1xuICAgICAgaWYgKHByb3BlcnR5IGluIHNldHRpbmdzKSB7XG4gICAgICAgIG5ld1NldHRpbmdzW3Byb3BlcnR5XSA9IHNldHRpbmdzW3Byb3BlcnR5XTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5lbGVtZW50Lmhhc0F0dHJpYnV0ZShcImRhdGEtdGlsdC1cIiArIHByb3BlcnR5KSkge1xuICAgICAgICB2YXIgYXR0cmlidXRlID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGlsdC1cIiArIHByb3BlcnR5KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBuZXdTZXR0aW5nc1twcm9wZXJ0eV0gPSBKU09OLnBhcnNlKGF0dHJpYnV0ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBuZXdTZXR0aW5nc1twcm9wZXJ0eV0gPSBhdHRyaWJ1dGU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld1NldHRpbmdzW3Byb3BlcnR5XSA9IGRlZmF1bHRTZXR0aW5nc1twcm9wZXJ0eV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1NldHRpbmdzO1xuICB9O1xuXG4gIFZhbmlsbGFUaWx0LmluaXQgPSBmdW5jdGlvbiBpbml0KGVsZW1lbnRzLCBzZXR0aW5ncykge1xuICAgIGlmIChlbGVtZW50cyBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgIGVsZW1lbnRzID0gW2VsZW1lbnRzXTtcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudHMgaW5zdGFuY2VvZiBOb2RlTGlzdCkge1xuICAgICAgZWxlbWVudHMgPSBbXS5zbGljZS5jYWxsKGVsZW1lbnRzKTtcbiAgICB9XG5cbiAgICBpZiAoIShlbGVtZW50cyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIGlmICghKFwidmFuaWxsYVRpbHRcIiBpbiBlbGVtZW50KSkge1xuICAgICAgICBlbGVtZW50LnZhbmlsbGFUaWx0ID0gbmV3IFZhbmlsbGFUaWx0KGVsZW1lbnQsIHNldHRpbmdzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gVmFuaWxsYVRpbHQ7XG59KCk7XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgLyogZXhwb3NlIHRoZSBjbGFzcyB0byB3aW5kb3cgKi9cbiAgd2luZG93LlZhbmlsbGFUaWx0ID0gVmFuaWxsYVRpbHQ7XG5cbiAgLyoqXG4gICAqIEF1dG8gbG9hZFxuICAgKi9cbiAgVmFuaWxsYVRpbHQuaW5pdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtdGlsdF1cIikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZhbmlsbGFUaWx0O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcIi4vY3NzUmVzZXQuY3NzXCI7XG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IGV4cGxvc2lvbkljb24gZnJvbSBcIi4vQXNzZXRzL2V4cGxvc2lvbi5wbmdcIjtcbmltcG9ydCBTaW5rSWNvbiBmcm9tIFwiLi9Bc3NldHMvc2lua2luZy5wbmdcIjtcbmltcG9ydCBWYW5pbGxhVGlsdCBmcm9tIFwidmFuaWxsYS10aWx0XCI7XG5pbXBvcnQgeyBwbGF5ZXIgfSBmcm9tIFwiLi9Bc3NldHMvbW9kdWxlcy9wbGF5ZXJGYWN0b3J5XCI7XG5pbXBvcnQgeyBzaGlwIH0gZnJvbSBcIi4vQXNzZXRzL21vZHVsZXMvc2hpcGZhY3RvcnlcIjtcbmltcG9ydCB7IGdlbmVyYXRlU2NvcmVCb2FyZCB9IGZyb20gXCIuL0Fzc2V0cy9tb2R1bGVzL3Njb3JlQm9hcmRcIjtcbmltcG9ydCB7IGdlbmVyYXRlUGxheWVyVHVybnMgfSBmcm9tIFwiLi9Bc3NldHMvbW9kdWxlcy9wbGF5ZXJUdXJuc1wiO1xuaW1wb3J0IHsgdGlsZUJhY2tncm91bmRDb2xvciB9IGZyb20gXCIuL0Fzc2V0cy9tb2R1bGVzL3RpbGVCYWNrZ3JvdW5kQ29sb3JcIjtcblxuY29uc3QgZ2V0QWxsSW5wdXRzID0gKCgpID0+IHtcbiAgICBjb25zdCBwYWdldGlsdCA9IChiYWNrRWxlbWVudCkgPT4ge1xuICAgICAgICBWYW5pbGxhVGlsdC5pbml0KGJhY2tFbGVtZW50KSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtYXg6IDMwLFxuICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAsXG4gICAgICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCBwbGF5ZXJmaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGV4dFwiKTtcbiAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtQ29udGFpbmVyXCIpO1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm1cIik7XG4gICAgY29uc3Qgc2hpcGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXBGb3JtQ29udGFpbmVyXCIpO1xuICAgIGNvbnN0IGZvcm1IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm1IZWFkZXJcIik7XG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9nb1wiKTtcbiAgICBwYWdldGlsdChmb3JtKTtcbiAgICBwbGF5ZXJmaWVsZC5vbmtleXByZXNzID0gZnVuY3Rpb24gZ2V0cGxheWVyMW5hbWUoZSkge1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAocGxheWVyZmllbGQuY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyZmllbGQuc2V0Q3VzdG9tVmFsaWRpdHkoXCJcIik7XG4gICAgICAgICAgICAgICAgbGV0IHBsYXllcjEgPSBuZXcgcGxheWVyKGAke3BsYXllcmZpZWxkLnZhbHVlLnRvVXBwZXJDYXNlKCl9YCk7XG4gICAgICAgICAgICAgICAgZ2V0UGxheWVyMk5hbWUocGxheWVyMSk7XG4gICAgICAgICAgICAgICAgcGxheWVyZmllbGQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcGxheWVyZmllbGQuc2V0Q3VzdG9tVmFsaWRpdHkoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBuYW1lXCIpO1xuICAgICAgICAgICAgICAgIHBsYXllcmZpZWxkLnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGdldFBsYXllcjJOYW1lID0gKHBsYXllcjEpID0+IHtcbiAgICAgICAgZm9ybUhlYWRlci50ZXh0Q29udGVudCA9IFwiV2VsY29tZSBQbGF5ZXIgMiwgRW50ZXIgeW91ciBuYW1lOlwiO1xuICAgICAgICBwbGF5ZXJmaWVsZC5vbmtleXByZXNzID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICAgIGlmIChhLmtleUNvZGUgPT0gMTMpIHtcbiAgICAgICAgICAgICAgICBhLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcGxheWVyZmllbGQucmVwb3J0VmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyZmllbGQuY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwbGF5ZXIyID0gbmV3IHBsYXllcihgJHtwbGF5ZXJmaWVsZC52YWx1ZS50b1VwcGVyQ2FzZSgpfWApO1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJmaWVsZC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIGdldFN0YXJ0aW5nUGxheWVyKHBsYXllcjEsIHBsYXllcjIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIGNvbnN0IGdldFN0YXJ0aW5nUGxheWVyID0gKHBsYXllcjEsIHBsYXllcjIpID0+IHtcbiAgICAgICAgZm9ybUhlYWRlci50ZXh0Q29udGVudCA9IFwiRW50ZXIgU3RhcnRpbmcgUGxheWVyXCI7XG4gICAgICAgIHBsYXllcmZpZWxkLnBsYWNlaG9sZGVyID0gXCJwbGF5ZXIxIG9yIHBsYXllcjJcIjtcbiAgICAgICAgcGxheWVyZmllbGQudmFsdWUgPSBcInBsYXllcjFcIjtcbiAgICAgICAgcGxheWVyZmllbGQub25rZXlwcmVzcyA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICBpZiAoaS5rZXlDb2RlID09IDEzICYmIChwbGF5ZXJmaWVsZC52YWx1ZS50b0xvd2VyQ2FzZSgpID09IFwicGxheWVyMVwiIHx8IHBsYXllcmZpZWxkLnZhbHVlLnRvTG93ZXJDYXNlKCkgPT0gXCJwbGF5ZXIyXCIpKSB7XG4gICAgICAgICAgICAgICAgaS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGxldCBzdGFydGluZ1BsYXllciA9IHBsYXllcmZpZWxkLnZhbHVlO1xuICAgICAgICAgICAgICAgIHBsYXllcmZpZWxkLnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgICAgICBnZXRCb2FyZFNpemVWYWx1ZXMocGxheWVyMSwgcGxheWVyMiwgc3RhcnRpbmdQbGF5ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpLmtleUNvZGUgPT0gMTMpIHtcbiAgICAgICAgICAgICAgICBpLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcGxheWVyZmllbGQuc2V0Q3VzdG9tVmFsaWRpdHkoXCJFbnRlciBwbGF5ZXIxIG9yIHBsYXllcjJcIik7XG4gICAgICAgICAgICAgICAgcGxheWVyZmllbGQucmVwb3J0VmFsaWRpdHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0Qm9hcmRTaXplVmFsdWVzID0gKHBsYXllcjEsIHBsYXllcjIsIHN0YXJ0aW5nUGxheWVyKSA9PiB7XG4gICAgICAgIGZvcm1IZWFkZXIudGV4dENvbnRlbnQgPSBcIkVudGVyIHRoZSBzaXplIG9mIHRoZSBHYW1lIEJvYXJkOlwiO1xuICAgICAgICBwbGF5ZXJmaWVsZC52YWx1ZSA9IFwic21hbGxcIjtcbiAgICAgICAgcGxheWVyZmllbGQucGxhY2Vob2xkZXIgPSBcIm1lZGl1bSBvciBzbWFsbFwiO1xuICAgICAgICBwbGF5ZXJmaWVsZC5vbmtleXByZXNzID0gZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgICAgIGlmIChiLmtleUNvZGUgPT0gMTMgJiYgKHBsYXllcmZpZWxkLnZhbHVlLnRvTG93ZXJDYXNlKCkgPT0gXCJtZWRpdW1cIiB8fCBwbGF5ZXJmaWVsZC52YWx1ZS50b0xvd2VyQ2FzZSgpID09IFwic21hbGxcIikpIHtcbiAgICAgICAgICAgICAgICBiLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXR0aW5nIHNoaXAgdmFsdWVzXCIpO1xuICAgICAgICAgICAgICAgIHBsYXllcmZpZWxkLnNldEN1c3RvbVZhbGlkaXR5KFwiXCIpO1xuICAgICAgICAgICAgICAgIGxldCBnYW1lQm9hcmRTaXplID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZXh0XCIpLnZhbHVlO1xuICAgICAgICAgICAgICAgIGdldFNoaXBWYWx1ZXMocGxheWVyMSwgcGxheWVyMiwgc3RhcnRpbmdQbGF5ZXIsIGdhbWVCb2FyZFNpemUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChiLmtleUNvZGUgPT0gMTMpIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXJmaWVsZC5zZXRDdXN0b21WYWxpZGl0eShcIkVudGVyIG1lZGl1bSBvciBzbWFsbCBmb3IgYm9hcmQgc2l6ZVwiKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJmaWVsZC5yZXBvcnRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRTaGlwVmFsdWVzID0gKHBsYXllcjEsIHBsYXllcjIsIHN0YXJ0aW5nUGxheWVyLCBnYW1lQm9hcmRTaXplKSA9PiB7XG4gICAgICAgIGxldCBwb3J0cmFpdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwb3J0cmFpdE51bVwiKTtcbiAgICAgICAgY29uc3QgcG9ydHJhaXROdW1UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwb3J0cmFpdExhYmVsTnVtXCIpO1xuICAgICAgICBjb25zdCBsYW5kc2NhcGVOdW1UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYW5kc2NhcGVMYWJlbE51bVwiKTtcbiAgICAgICAgY29uc3QgbWluTGFiZWxOdW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21pbkxhYmVsTnVtXCIpO1xuICAgICAgICBjb25zdCBtYXhMYWJlbE51bSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWF4TGFiZWxOdW1cIik7XG4gICAgICAgIGxldCBsYW5kc2NhcGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFuZHNjYXBlTnVtXCIpO1xuICAgICAgICBsZXQgbWluTGVuZ3RoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtaW5MZW5ndGhcIik7XG4gICAgICAgIGxldCBtYXhMZW5ndGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21heExlbmd0aFwiKTtcbiAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NoaXBGb3JtXCIpO1xuXG4gICAgICAgIHBhZ2V0aWx0KGZvcm0pO1xuXG4gICAgICAgIGlmIChnYW1lQm9hcmRTaXplID09PSBcInNtYWxsXCIpIHtcbiAgICAgICAgICAgIGdhbWVCb2FyZFNpemUgPSAxMDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZ2FtZUJvYXJkU2l6ZSA9PT0gXCJtZWRpdW1cIikge1xuICAgICAgICAgICAgZ2FtZUJvYXJkU2l6ZSA9IDQwMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1Db250YWluZXIuY2xhc3NMaXN0LmFkZChcIm1vdmVkXCIpO1xuICAgICAgICBzaGlwZm9ybUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibW92ZWRcIik7XG4gICAgICAgIGlmIChnYW1lQm9hcmRTaXplID09PSAxMDApIHtcbiAgICAgICAgICAgIHBvcnRyYWl0SW5wdXQubWF4ID0gXCI1XCI7XG4gICAgICAgICAgICBsYW5kc2NhcGVJbnB1dC5tYXggPSBcIjVcIjtcbiAgICAgICAgICAgIG1pbkxlbmd0aC5tYXggPSBcIjVcIjtcbiAgICAgICAgICAgIG1heExlbmd0aC5tYXggPSBcIjVcIjtcbiAgICAgICAgICAgIHBvcnRyYWl0TnVtVGV4dC50ZXh0Q29udGVudCA9IFwiKDEtNSlcIjtcbiAgICAgICAgICAgIGxhbmRzY2FwZU51bVRleHQudGV4dENvbnRlbnQgPSBcIigxLTUpXCI7XG4gICAgICAgICAgICBtaW5MYWJlbE51bS50ZXh0Q29udGVudCA9IFwiKDEtNSlcIjtcbiAgICAgICAgICAgIG1heExhYmVsTnVtLnRleHRDb250ZW50ID0gXCIoMS01KVwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBsYXlidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXlCdXR0b25cIik7XG4gICAgICAgIHBsYXlidXR0b24ub25jbGljayA9IGZ1bmN0aW9uIChiKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHBhcnNlSW50KG1pbkxlbmd0aC52YWx1ZSksbWF4TGVuZ3RoVmFsdWUpO1xuICAgICAgICAgICAgbWF4TGVuZ3RoLnNldEN1c3RvbVZhbGlkaXR5KFwiXCIpO1xuICAgICAgICAgICAgZm9ybS5yZXBvcnRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgaWYgKHBhcnNlSW50KG1heExlbmd0aC52YWx1ZSkgPD0gcGFyc2VJbnQobWluTGVuZ3RoLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIG1heExlbmd0aC5zZXRDdXN0b21WYWxpZGl0eShcIk1heGltdW0gbGVuZ3RoIG11c3QgYmUgbW9yZSB0aGFuIG1pbmltdW0gbGVuZ3RoXCIpO1xuICAgICAgICAgICAgICAgIG1heExlbmd0aC5yZXBvcnRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJzZUludChtYXhMZW5ndGgudmFsdWUpID4gcGFyc2VJbnQobWluTGVuZ3RoLnZhbHVlKSAmJiBmb3JtLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICAgICAgICAgIG1heExlbmd0aC5zZXRDdXN0b21WYWxpZGl0eShcIlwiKTtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVNoaXBzKHBsYXllcjEsIHBsYXllcjIsIHN0YXJ0aW5nUGxheWVyLCBnYW1lQm9hcmRTaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xufSkoKTtcblxuY29uc3QgZ2VuZXJhdGVTaGlwcyA9IChwbGF5ZXIxLCBwbGF5ZXIyLCBzdGFydGluZ1BsYXllciwgZ2FtZUJvYXJkU2l6ZSkgPT4ge1xuICAgIGxldCBhbGxTaGlwcyA9IFtdO1xuICAgIGNvbnN0IGNydWlzZXJzTnVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwb3J0cmFpdE51bVwiKS52YWx1ZTtcbiAgICBjb25zdCBkZXN0cm95ZXJzTnVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYW5kc2NhcGVOdW1cIikudmFsdWU7XG4gICAgbGV0IG1heExlbmd0aCA9IHBhcnNlSW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWF4TGVuZ3RoXCIpLnZhbHVlKTtcbiAgICBsZXQgbWluTGVuZ3RoID0gcGFyc2VJbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtaW5MZW5ndGhcIikudmFsdWUpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJcIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZUNvbnRhaW5lcjFcIikuc3R5bGUuZGlzcGxheSA9IFwiZ3JpZFwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZUNvbnRhaW5lcjJcIikuc3R5bGUuZGlzcGxheSA9IFwiZ3JpZFwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcEZvcm1Db250YWluZXJcIikuY2xhc3NMaXN0LmFkZChcInNsaWRlRG93blwiKTtcblxuICAgIGNvbnN0IHJhbmRvbVNoaXBMZW5ndGggPSAobWluTGVuZ3RoLCBtYXhMZW5ndGgpID0+IHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhMZW5ndGggLSBtaW5MZW5ndGggKyAxKSArIG1pbkxlbmd0aCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGdlbmVyYXRlQ3J1aXNlcnMgPSAobWluTGVuZ3RoLCBtYXhMZW5ndGgpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjcnVpc2Vyc051bTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcmFuZG9tTGVuZ3RoID0gcmFuZG9tU2hpcExlbmd0aChtaW5MZW5ndGgsIG1heExlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXIxY3J1aXNlcnMgPSBzaGlwKHJhbmRvbUxlbmd0aCwgXCJwb3J0cmFpdFwiLCBcInBsYXllck9uZVwiLCBnYW1lQm9hcmRTaXplKTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcjJjcnVpc2VycyA9IHNoaXAocmFuZG9tTGVuZ3RoLCBcInBvcnRyYWl0XCIsIFwicGxheWVyVHdvXCIsIGdhbWVCb2FyZFNpemUpO1xuICAgICAgICAgICAgYWxsU2hpcHMucHVzaChwbGF5ZXIxY3J1aXNlcnMsIHBsYXllcjJjcnVpc2Vycyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGdlbmVyYXRlRGVzdHJveWVycyA9IChtaW5MZW5ndGgsIG1heExlbmd0aCkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlc3Ryb3llcnNOdW07IGkrKykge1xuICAgICAgICAgICAgbGV0IHJhbmRvbUxlbmd0aCA9IHJhbmRvbVNoaXBMZW5ndGgobWluTGVuZ3RoLCBtYXhMZW5ndGgpO1xuICAgICAgICAgICAgY29uc3QgcGxheWVyMURlc3Ryb3llcnMgPSBzaGlwKHJhbmRvbUxlbmd0aCwgXCJsYW5kc2NhcGVcIiwgXCJwbGF5ZXJPbmVcIiwgZ2FtZUJvYXJkU2l6ZSk7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXIyRGVzdHJveWVycyA9IHNoaXAocmFuZG9tTGVuZ3RoLCBcImxhbmRzY2FwZVwiLCBcInBsYXllclR3b1wiLCBnYW1lQm9hcmRTaXplKTtcbiAgICAgICAgICAgIGFsbFNoaXBzLnB1c2gocGxheWVyMURlc3Ryb3llcnMsIHBsYXllcjJEZXN0cm95ZXJzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZ2VuZXJhdGVDcnVpc2VycyhtaW5MZW5ndGgsIG1heExlbmd0aCk7XG4gICAgZ2VuZXJhdGVEZXN0cm95ZXJzKG1pbkxlbmd0aCwgbWF4TGVuZ3RoKTtcbiAgICBnZW5lcmF0ZVNjb3JlQm9hcmQocGxheWVyMSwgcGxheWVyMiwgYWxsU2hpcHMpO1xuICAgIGdlbmVyYXRlUGxheWVyVHVybnMocGxheWVyMSwgcGxheWVyMiwgc3RhcnRpbmdQbGF5ZXIsIGdhbWVCb2FyZFNpemUsIGFsbFNoaXBzKTtcbn07XG4iXSwibmFtZXMiOlsiZ2VuZXJhdGVTY29yZUJvYXJkIiwiZXhwbG9zaW9uSWNvbiIsInNpbmtJY29uIiwiY2xpY2tSYW5kb21UaWxlIiwiX3BsYXllciIsImdhbWVCb2FyZFNpemUiLCJoaXQiLCJ0aWxlTnVtIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9TdHJpbmciLCJ0aWxlIiwiY29uc29sZSIsImxvZyIsImZpbmQiLCJlbGVtZW50IiwidGlsZUVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjbGljayIsImNvbXB1dGVySGl0IiwiZ2FtZUJvYXJkTGVuZ3RoIiwic3FydCIsImxlbmd0aCIsInN1cnJvdW5kaW5nSGl0cyIsImZvckVhY2giLCJkYXRhaWQiLCJzdWJzdHIiLCJkYXRha2V5IiwiY2xhc3NOYW1lIiwiaGFzQ2hpbGROb2RlcyIsImZpcnN0RWxlbWVudENoaWxkIiwic3JjIiwicmlnaHRUaWxlIiwicGFyc2VJbnQiLCJsZWZ0VGlsZSIsInRvcFRpbGUiLCJib3R0b21UaWxlIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJwdXNoIiwiaW5jbHVkZXMiLCJjaGVja0hpdHMiLCJwbGF5ZXIxIiwicGxheWVyMiIsImFsbFNoaXBzIiwidG90YWxIaXRzIiwiYWRkSEl0SWNvbiIsImhpdFRpbGUiLCJoaXRJbWFnZSIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJhcHBlbmRDaGlsZCIsInNoaXAiLCJwb3NpdGlvbiIsImZpbHRlciIsInBvc2l0aW9uTnVtIiwiaGl0cyIsImNoZWNrU2hpcERlc3Ryb3llZCIsImRlc3Ryb3lTaGlwIiwibnVtYmVyIiwic2hpcFBvcyIsImZpcnN0Q2hpbGQiLCJjaGVja0ZvckRlc3Ryb3llZCIsImV2ZXJ5IiwicG9zIiwicGxheWVyIiwidGlsZUJhY2tncm91bmRDb2xvciIsImdlbmVyYXRlYm9hcmQiLCJwbGF5ZXIxZ2FtZVRpbGUiLCJwbGF5ZXIyZ2FtZVRpbGUiLCJnYW1lQ29udGFpbmVyMSIsImdhbWVDb250YWluZXIyIiwicGxheWVydHVybkhlYWRlciIsInN0eWxlIiwiZ3JpZFRlbXBsYXRlQ29sdW1ucyIsImdyaWRUZW1wbGF0ZVJvd3MiLCJjb21wdXRlck1vdmUiLCJ0dXJuIiwibmFtZSIsImNvbXB1dGVySGl0c0FycmF5IiwicGxheWVyVGlsZXMiLCJwbGF5ZXJUaWxlIiwiaSIsImNsb25lTm9kZSIsInNldEF0dHJpYnV0ZSIsImF0dGFja1NoaXAiLCJlIiwidGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwiaGl0TnVtIiwib25jbGljayIsInRpbWVkQ29tcHV0ZXJNb3ZlIiwidGV4dENvbnRlbnQiLCJzZXRUaW1lb3V0IiwiaWQiLCJyZW1vdmUiLCJjb25zdHJ1Y3RvciIsImdlbmVyYXRlUGxheWVyVHVybnMiLCJzdGFydGluZ1BsYXllciIsInBsYXllcjFIZWFkZXIiLCJwbGF5ZXIySGVhZGVyIiwicGxheWVyMVNjb3JlIiwicGxheWVyMlNjb3JlIiwicGxheWVyVHVybkhlYWRlciIsInJlbWFpbmluZ1BsYXllcjFTaGlwcyIsInJlbWFpbmluZ1BsYXllcjJTaGlwcyIsImRlc3Ryb3llZFBsYXllcjFTaGlwcyIsImRlc3Ryb3llZFBsYXllcjJTaGlwcyIsImFsbFBsYXllcjFQb3MiLCJhbGxQbGF5ZXIyUG9zIiwib3JpZW50IiwiZ2V0TGVuZ3RoIiwiaW5pdGlhbFBvcyIsImNoZWNrTm9EdXBsaWNhdGVMYW5kc2NhcGVQb3MiLCJQb3MiLCJ0ZW1wUG9zIiwicHVzaFRvQXJyYXlMYW5kc2NhcGUiLCJmaW5hbFBvcyIsImNoZWNrUG9zTGFuZHNjYXBlIiwidGVzdFBvcyIsImNoZWNrTm9EdXBsaWNhdGVQb3RyYWl0UG9zIiwiY2hlY2tQb3NQb3J0cmFpdCIsInB1c2h0b0FycmF5UG9ydHJhaXQiLCJwbGF5ZXIxQ29udGFpbmVyIiwicGxheWVyMkNvbnRhaW5lciIsImJhY2tncm91bmRDb2xvciIsIlNpbmtJY29uIiwiVmFuaWxsYVRpbHQiLCJnZXRBbGxJbnB1dHMiLCJwYWdldGlsdCIsImJhY2tFbGVtZW50IiwiaW5pdCIsIm1heCIsInNwZWVkIiwicGxheWVyZmllbGQiLCJmb3JtQ29udGFpbmVyIiwiZm9ybSIsInNoaXBmb3JtQ29udGFpbmVyIiwiZm9ybUhlYWRlciIsImxvZ28iLCJvbmtleXByZXNzIiwiZ2V0cGxheWVyMW5hbWUiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJjaGVja1ZhbGlkaXR5Iiwic2V0Q3VzdG9tVmFsaWRpdHkiLCJ2YWx1ZSIsInRvVXBwZXJDYXNlIiwiZ2V0UGxheWVyMk5hbWUiLCJyZXBvcnRWYWxpZGl0eSIsImEiLCJnZXRTdGFydGluZ1BsYXllciIsInBsYWNlaG9sZGVyIiwidG9Mb3dlckNhc2UiLCJnZXRCb2FyZFNpemVWYWx1ZXMiLCJiIiwiZ2V0U2hpcFZhbHVlcyIsInBvcnRyYWl0SW5wdXQiLCJwb3J0cmFpdE51bVRleHQiLCJsYW5kc2NhcGVOdW1UZXh0IiwibWluTGFiZWxOdW0iLCJtYXhMYWJlbE51bSIsImxhbmRzY2FwZUlucHV0IiwibWluTGVuZ3RoIiwibWF4TGVuZ3RoIiwicGxheWJ1dHRvbiIsImdlbmVyYXRlU2hpcHMiLCJjcnVpc2Vyc051bSIsImRlc3Ryb3llcnNOdW0iLCJkaXNwbGF5IiwicmFuZG9tU2hpcExlbmd0aCIsImdlbmVyYXRlQ3J1aXNlcnMiLCJyYW5kb21MZW5ndGgiLCJwbGF5ZXIxY3J1aXNlcnMiLCJwbGF5ZXIyY3J1aXNlcnMiLCJnZW5lcmF0ZURlc3Ryb3llcnMiLCJwbGF5ZXIxRGVzdHJveWVycyIsInBsYXllcjJEZXN0cm95ZXJzIl0sInNvdXJjZVJvb3QiOiIifQ==