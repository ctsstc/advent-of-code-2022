import Problem from './day-07.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Day 07', () => {
  describe('example.txt', () => {
    const problem = new Problem(__dirname + '/example.txt')
    // remember to take out xit and change it to it
    it('solves part 1', () => {
      expect(problem.solvePart1()).toBe(95437)
    })

    it('solves part 2', () => {
      expect(problem.solvePart2()).toBe(24933642)
    })
  })

  describe('input.txt', () => {
    const problem = new Problem(__dirname + '/input.txt')

    it('solves part 1', () => {
      expect(problem.solvePart1()).toBe(1307902)
    })

    it('solves part 2', () => {
      expect(problem.solvePart2()).toBe(7068748)
    })
  })
})
