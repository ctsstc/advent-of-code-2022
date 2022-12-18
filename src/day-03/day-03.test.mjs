import Problem from './day-03.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Day 03', () => {
  describe('example.txt', () => {
    const answer = Problem(__dirname + '/example.txt')

    it('solves part 1', () => {
      expect(answer).toBe(157)
    })

    // it('solves part 2', () => {
    //   expect(problem.solvePart2()).toBe(123)
    // })
  })

  describe('input.txt', () => {
    const answer = Problem(__dirname + '/input.txt')

    it('solves part 1', () => {
      expect(answer).toBe(8123)
    })

    // it('solves part 2', () => {
    //   expect(problem.solvePart2()).toBe(456789)
    // })
  })
})
