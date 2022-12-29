import Problem from './day-05.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Day 05', () => {
  describe('example.txt', () => {
    const problem = new Problem(__dirname + '/example.txt')

    it('solves part 1', () => {
      expect(problem.solvePart1()).toBe('CMZ')
    })

    it('solves part 2', () => {
      expect(problem.solvePart2()).toBe('MCD')
    })

    it('parses the boxes state', () => {
      expect(problem.parsed_boxes()).toEqual([
        ['Z', 'N'],
        ['M', 'C', 'D'],
        ['P'],
      ])
    })

    it('applies the moves', () => {
      expect(problem.apply_moves()).toEqual([
        ['C'],
        ['M'],
        ['P', 'D', 'N', 'Z'],
      ])
    })
  })

  describe('input.txt', () => {
    const problem = new Problem(__dirname + '/input.txt')

    it('solves part 1', () => {
      expect(problem.solvePart1()).toBe('TPGVQPFDH')
    })

    it('solves part 2', () => {
      expect(problem.solvePart2()).toBe('DMRDFRHHH')
    })
  })
})
