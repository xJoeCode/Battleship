let allPlayer1Pos = [];
let allPlayer2Pos = [];

const ship = (length, orient, player, gameBoardSize) => {
    const getLength = () => length;
    let position = [];
    let hits = [];

    const shipPos = (player) => {
        let initialPos = Math.floor(Math.random() * gameBoardSize + 1);
        let gameBoardLength = Math.sqrt(gameBoardSize);
        console.log(initialPos, length, player);

        if (orient === "landscape") {
            // to make sure all positions are placed correctly

            const checkNoDuplicateLandscapePos = (Pos) => {
                for (let i = 0; i < length; i++) {
                    let tempPos = Pos + i;
                    if (player == "playerOne" && allPlayer1Pos.includes(tempPos)) {
                        return true;
                    } else if (player == "playerTwo" && allPlayer2Pos.includes(tempPos)) {
                        return true;
                    }
                    //if (allLandscapePos.includes(tempPos)) {
                    //    return true;
                    //}
                }
            };

            const pushToArrayLandscape = (initialPos) => {
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

            const checkPosLandscape = (initialPos) => {
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
            const checkNoDuplicatePotraitPos = (Pos) => {
                for (let i = 0; i < length; i++) {
                    let tempPos = initialPos + i * gameBoardLength;
                    if (player == "playerOne" && allPlayer1Pos.includes(tempPos)) {
                        return true;
                    } else if (player == "playerTwo" && allPlayer2Pos.includes(tempPos)) {
                        return true;
                    }
                    //if (allPortraitPos.includes(tempPos)) {
                    //    return true;
                    //}
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
                        if (player == "playerOne") {
                            allPlayer1Pos.push(initialPos + i * gameBoardLength);
                        } else if (player == "playerTwo") {
                            allPlayer2Pos.push(initialPos + i * gameBoardLength);
                        }
                        //allPortraitPos.push(initialPos + i * gameBoardLength);
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

export {ship}