import "./style.css";
import explosionIcon from './Assets/explosion.png'

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
let allShipPos = []
allShipPos.push(...chicken.position)
allShipPos.push(...albama.position)
console.log(allShipPos)

let hits = []

const generateboard = () => {
    const gameTile = document.querySelector("#gameTile")
    const gameContainer = document.querySelector(".gameContainer")
    for(let i =0; i <100; i++){
       const tile = gameTile.cloneNode()
       tile.setAttribute('data-key', i+1)
       tile.onclick = function(e){
           tile.classList.add("hit")
           const hitNum = parseInt(e.target.getAttribute('data-key'))
           console.log(hitNum)
           hits.push(hitNum)
           checkHits()
       }
       gameContainer.appendChild(tile)
    }
    gameTile.remove()
}

const checkHits = () => {
    
    const addHItIcon = (hit) => {
        const hitTile = document.querySelector(`[data-key="${hit}"]`)
        const hitImage = document.createElement('img')
        hitImage.classList.add("hitImage")
        hitImage.src = explosionIcon
        hitTile.appendChild(hitImage)
    }
    console.log(hits)
    let hit = allShipPos.filter(position =>  hits.includes(position))
    hit.forEach(hit => {
            addHItIcon(hit)
        })
    
}




generateboard()
