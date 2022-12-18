import Problem, { Day03Part2 } from './day-03.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Day 03', () => {
  describe('example.txt', () => {
    const filePath = __dirname + '/example.txt'

    it('solves part 1', () => {
      const answer = Problem(filePath)
      expect(answer).toBe(157)
    })

    it('solves part 2', () => {
      const answer = Day03Part2(filePath)
      expect(answer).toBe(70)
    })
  })

  describe('input.txt', () => {
    const filePath = __dirname + '/input.txt'

    it('solves part 1', () => {
      const answer = Problem(filePath)
      expect(answer).toBe(8123)
    })

    it('solves part 2', () => {
      const answer = Day03Part2(filePath)
      expect(answer).toBe(2620)
    })
  })
})
