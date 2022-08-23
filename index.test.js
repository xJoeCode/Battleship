// @vitest-environment happy-dom

import {it, expect, describe} from 'vitest'
import {player} from './src/Assets/modules/playerFactory'
import {ship} from './src/Assets/modules/shipfactory'


describe('player',()=>{
    it("should store parameter as player name",()=>{
        let playername = "john"

        let player1 = new player(playername)

        expect(player1.name).toBe(playername)
    })

    it("Should have 0 turns",()=>{
        let playername = "john"

        let player1 = new player(playername)

        expect(player1.turn).toBe(0)
    })
})

describe('ship',()=>{
    it("Should return correct length",()=>{
        let length = "5"

        let testShip  = ship("5","landscape", "playerOne", 400)

        expect(testShip.getLength()).toBe(length)
    })

    it("Should have a position property array of given length",()=>{
        let length = 5

        let testShip  = ship("5","landscape", "playerOne", 400)

        expect(testShip.position.length).toBe(length)
    })
    it("should contain landscape positions on increasing order",()=>{
        let testShip  = ship("8","landscape", "playerOne", 100)
        let arrayPositions = testShip.position.map(pos => parseInt(pos.slice(9)))
        console.log(arrayPositions)

        for (let i = 0; i < (arrayPositions.length-1); i++){
            console.log(arrayPositions[i+1],arrayPositions[i])
            expect((arrayPositions[i+1]-arrayPositions[i])).toBe(1)
        }

        console.log(arrayPositions)
    })
})







