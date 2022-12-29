import Problem from './day-04.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// UwU


describe('Day 04', () => {
  describe('example.txt', () => {
    const problem = new Problem(__dirname + '/example.txt')

    it('solves part 1', () => {
      expect(problem.solvePart1()).toBe(2)
    })

    it('solves part 2', () => {
      expect(problem.solvePart2()).toBe(4)
    })
  })

  describe('input.txt', () => {
    const problem = new Problem(__dirname + '/input.txt')

    it('solves part 1', () => {
      expect(problem.solvePart1()).toBe(588)
    })

    it('solves part 2', () => {
      expect(problem.solvePart2()).toBe(911)
    })
  })
})
