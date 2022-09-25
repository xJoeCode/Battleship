export class player {
    turn = 0;

    constructor(name) {
        this.name = name;
    }

    swapTurn(){
        if (this.turn === 0){
            this.turn++
        } else if ( this.turn === 1){
            this.turn--
        }
    }

    getTurn(){
        this.turn++
    }

    checkTurn(){
        return this.turn === 1 ? true : false
    }
    
}
