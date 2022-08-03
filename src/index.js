import "./style.css";

const ship = (length, orient) =>{
    const getLength = () => length
    let position = []
    let hit = []

    const shipPos = (() => {
       const initialPos = Math.floor(Math.random()*100)
       if(orient === "landscape"){
            for (let i = 0; i < length; i++){
                position.push(initialPos + i)
            }
       } else if (orient === "portrait"){
        for (let i = 0; i < length; i++){
            position.push(initialPos + (i*10))
        }
       }

    })()
    
    return {getLength, position}
}


const albama = ship(3, "landscape")
const chicken = ship(4, "portrait")
console.log(chicken.position)

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

const placeShips = () =>{
    const marker = math.random() *100
}


generateboard()
