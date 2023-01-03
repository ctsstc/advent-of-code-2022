import Problem from './day-09.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Day 09', () => {
  describe('example.txt', () => {
    const problem = new Problem(__dirname + '/example.txt')
    // remember to take out xit and change it to it
    it('solves part 1', () => {
      expect(problem.solvePart1()).toBe(13)
    })

    describe('#getNewPosition', () => {
      it('moves up', () => {
        expect(problem.getNewPosition([0, 2], [0, 0])).toEqual([0, 1])
      })

      /**
       * .H
       * .x
       * T.
       */
      it('moves up right', () => {
        expect(problem.getNewPosition([1, 2], [0, 0])).toEqual([1, 1])
      })

      it('moves right', () => {
        expect(problem.getNewPosition([2, 0], [0, 0])).toEqual([1, 0])
      })

      /**
       * T..
       * .xH
       */
      it('moves down right', () => {
        expect(problem.getNewPosition([2, 0], [1, 0])).toEqual([1, 0])
      })

      /**
       * T
       * .
       * H
       */
      it('moves down', () => {
        expect(problem.getNewPosition([0, -2], [0, 0])).toEqual([0, -1])
      })

      /**
       * .T
       * .x
       * H.
       */
      it('moves down left', () => {
        expect(problem.getNewPosition([0, 0], [1, 2])).toEqual([1, 1])
      });

      it('moves left', () => {
        expect(problem.getNewPosition([-2, 0], [0, 0])).toEqual([-1, 0])
      })

      /**
       * H.
       * x.
       * .T
       */
      it('moves up left', () => {
        expect(problem.getNewPosition([0, 2], [1, 0])).toEqual([0, 1])
      })

      /** 
       * ..B
       * .x.
       * T..
       */
      it('moves BIGLY up right', () => {
        expect(problem.getNewPosition([2, 2], [0, 0])).toEqual([1, 1])
      })
    })

    it('solves part 2', () => {
      expect(problem.solvePart2()).toBe(1)
    })
  })

  describe('input.txt', () => {
    const problem = new Problem(__dirname + '/input.txt')

    it('solves part 1', () => {
      expect(problem.solvePart1()).toBe(5878)
    })

    it.only('solves part 2', () => {
      expect(problem.solvePart2()).toBe(36)
    })
  })
})
