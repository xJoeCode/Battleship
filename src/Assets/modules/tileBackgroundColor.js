const tileBackgroundColor = (player1, player2) =>{
    const player1Container = document.querySelector(".gameContainer1")
    const player2Container = document.querySelector(".gameContainer2")
    if (player1.turn == 1){
        player1Container.style.backgroundColor = "#8C4236"
    } else if (player1.turn  == 0) {
        player1Container.style.backgroundColor = "transparent"
    }
    if (player2.turn == 1){
        player2Container.style.backgroundColor = "#8C4236"
    } else if (player2.turn == 0) {
        player2Container.style.backgroundColor = "transparent"
    }   
}

export{tileBackgroundColor}