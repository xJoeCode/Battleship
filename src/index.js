import "./style.css";

const ship = (length) =>{
    const getLength = () => length
    let position = []
    return {getLength, position}
}


const albama = ship(10)
console.log(albama.getLength())

const generateboard = () => {
    const gameTile = document.querySelector("#gameTile")
    const gameContainer = document.querySelector(".gameContainer")
    for(let i =0; i <100; i++){
       const tile = gameTile.cloneNode()
       tile.setAttribute('data-key', i+1)
       gameContainer.appendChild(tile)
    }
    gameTile.remove()
}


generateboard()
