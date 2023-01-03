import Problem from './day-10.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Day 10', () => {
  describe('example.txt', () => {
    const problem = new Problem(__dirname + '/example.txt')
    // remember to take out xit and change it to it
    xit('solves part 1', () => {
      expect(problem.solvePart1()).toBe('1')
    })

    // it('solves part 2', () => {
    //   expect(problem.solvePart2()).toBe(123)
    // })
  })

  describe('input.txt', () => {
    const problem = new Problem(__dirname + '/input.txt')

    // it('solves part 1', () => {
    //   expect(problem.solvePart1()).toBe('456789')
    // })

    // it('solves part 2', () => {
    //   expect(problem.solvePart2()).toBe(456789)
    // })
  })
})
