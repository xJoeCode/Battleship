// @vitest-environment happy-dom

import {it, expect, describe} from 'vitest'
import {player} from './playerFactory'
import {ship} from './shipfactory'


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

    it("Should have a position property with an array of length that matches given length",()=>{
        let length = 5

        let testShip  = ship(length.toString(),"landscape", "playerOne", 400)

        expect(testShip.position.length).toBe(length)
    })
    it("should contain landscape positions in ascending order with landscape orientation ships",()=>{
        let testShip  = ship("8","landscape", "playerOne", 100)
        let arrayPositions = testShip.position.map(pos => parseInt(pos.slice(9)))

        for (let i = 0; i < (arrayPositions.length-1); i++){
            expect((arrayPositions[i+1]-arrayPositions[i])).toBe(1)
        }
    })
    it("Should contain portrait positions in ascending order in multiples of 10 with portrait orientation ships",()=>{
        let testShip  = ship("8","portrait", "playerOne", 100)
        let arrayPositions = testShip.position.map(pos => parseInt(pos.slice(9)))
        console.log(arrayPositions)

        for (let i = 0; i<(arrayPositions.length-1); i++){
            expect(arrayPositions[i+1]-arrayPositions[i]).toBe(10)
        }
    })
    it("Should not contain landscape position values that are divisible by the length of gameboard so that ships do not saparate to next line",()=>{
        let gameBoardSize = 100
        let lengthOfEachSide = Math.sqrt(gameBoardSize)

        let testShip  = ship("8","landscape", "playerOne", gameBoardSize)
        let arrayPositions = testShip.position.map(pos => parseInt(pos.slice(9)))

        arrayPositions.forEach(pos=>{
            expect(pos % lengthOfEachSide).not.toBe(0)
        })
    })
    it("Should not contain portrait position values that are greater than the size of the gameboard",()=>{
        let gameBoardSize = 100

        let testShip  = ship("8","portrait", "playerOne", gameBoardSize)
        let arrayPositions = testShip.position.map(pos => parseInt(pos.slice(9)))

        console.log(arrayPositions)
        arrayPositions.forEach(pos=>{
            expect(pos).not.toBeGreaterThan(gameBoardSize)
        })
    })
})







