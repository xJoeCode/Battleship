import {it, expect} from 'vitest'
import {addition} from './src/index'

it('should add the numbers',()=>{
    //arrange
    const a = 1
    const b = 2
    //act
    const result = addition(a,b)
    //assert
    const expectedResult = a + b
    expect(result).toBe(expectedResult)
})

