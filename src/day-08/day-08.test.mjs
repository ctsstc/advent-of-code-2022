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

    it('calculates a proper tree score for 2, 1', () => {
      expect(problem.getTreeScore(2, 1)).toEqual(4)
    })

    it('calculates a proper tree score for 2, 3', () => {
      expect(problem.getTreeScore(2, 3)).toEqual(8)
    })

    it('calculates a proper tree score from the edge of 0,1', () => {
      expect(problem.getTreeScore(0, 1)).toEqual(0)
    })

    it('solves part 2', () => {
      expect(problem.solvePart2()).toBe(8)
    })

    it('gets the proper line score', () => {
      const result = problem.getLineScore(5, [5, 9, 9, 9, 9])
      expect(result).toEqual(1)
    })

    it('gets the proper line score', () => {
      const result = problem.getLineScore(5, [4, 4, 4, 4, 4])
      expect(result).toEqual(5)
    })

    it('gets the proper line score', () => {
      const result = problem.getLineScore(5, [4, 5, 5, 5, 5])
      expect(result).toEqual(2)
    })

    it('gets the proper line score', () => {
      const result = problem.getLineScore(5, [4, 5, 5, 5, 5, 6])
      expect(result).toEqual(2)
    })

    it('gets the proper line score', () => {
      const result = problem.getLineScore(5, [4, 2, 5, 5, 5, 6])
      expect(result).toEqual(3)
    })
  })

  describe('input.txt', () => {
    const problem = new Problem(__dirname + '/input.txt')

    it('solves part 1', () => {
      expect(problem.solvePart1()).toBe(1789)
    })

    it('solves part 2', () => {
      expect(problem.solvePart2()).toBe(314820)
    })
  })
})
