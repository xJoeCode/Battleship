// @vitest-environment happy-dom

import {it, expect, describe} from 'vitest'
import {player} from './src/Assets/modules/playerFactory'


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







