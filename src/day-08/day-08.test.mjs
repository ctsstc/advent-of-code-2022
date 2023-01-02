import Problem from './day-08.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Day 08', () => {
  describe('example.txt', () => {
    const problem = new Problem(__dirname + '/example.txt')
    // remember to take out xit and change it to it
    it('solves part 1', () => {
      expect(problem.solvePart1()).toBe(21)
    })

    it('has the correct set', () => {
      problem.solvePart1()

      expect(problem.visibleTrees).toEqual(
        new Set([
          '0,0',
          '1,0',
          '2,0',
          '3,0',
          '4,0', // top row
          '4,1',
          '4,2',
          '4,3', // right w/o corners
          '4,4',
          '3,4',
          '2,4',
          '1,4',
          '0,4', // bottom row
          '0,1',
          '0,2',
          '0,3', // left w/o corners
          // inner trees
          '1,1',
          '2,1',
          '1,2',
          '3,2',
          '2,3',
        ]),
      )
    })

    // it('solves part 2', () => {
    //   expect(problem.solvePart2()).toBe(123)
    // })
  })

  describe('input.txt', () => {
    const problem = new Problem(__dirname + '/input.txt')

    it('solves part 1', () => {
      expect(problem.solvePart1()).toBe('456789')
    })

    // it('solves part 2', () => {
    //   expect(problem.solvePart2()).toBe(456789)
    // })
  })
})
