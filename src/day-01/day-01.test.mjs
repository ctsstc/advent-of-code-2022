import Problem from './day-01.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Day 01', () => {
  describe('example.txt', () => {
    const problem = new Problem(__dirname + '/example.txt')

    it('solves part 1', () => {
      expect(problem.solvePart1()).toBe(24000)
    })

    it('solves part 2', () => {
      expect(problem.solvePart2()).toBe(45000)
    })
  })

  describe('input.txt', () => {
    const problem = new Problem(__dirname + '/input.txt')

    it('solves part 1', () => {
      expect(problem.solvePart1()).toBe(70374)
    })

    it('solves part 2', () => {
      expect(problem.solvePart2()).toBe(204610)
    })
  })
})
