import Problem from './day-10.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Day 10', () => {
  describe('example.txt', () => {
    it('solves part 1', () => {
      const problem = new Problem(__dirname + '/example.txt')
      expect(problem.solvePart1()).toBe(13140)
    })

    it('solves part 2', () => {
      const problem = new Problem(__dirname + '/example.txt')
      expect(problem.solvePart2()).toMatchInlineSnapshot(`
        "
        ##..##..##..##..##..##..##..##..##..##..
        ###...###...###...###...###...###...###.
        ####....####....####....####....####....
        #####.....#####.....#####.....#####.....
        ######......######......######......####
        #######.......#######.......#######.....
        "
      `)
    })
  })

  describe('input.txt', () => {
    it('solves part 1', () => {
      const problem = new Problem(__dirname + '/input.txt')
      expect(problem.solvePart1()).toBe(14040)
    })

    it('solves part 2', () => {
      const problem = new Problem(__dirname + '/input.txt')
      expect(problem.solvePart2()).toMatchInlineSnapshot(`
        "
        ####..##...##....##.####...##.####.#....
        ...#.#..#.#..#....#....#....#.#....#....
        ..#..#....#.......#...#.....#.###..#....
        .#...#.##.#.......#..#......#.#....#....
        #....#..#.#..#.#..#.#....#..#.#....#....
        ####..###..##...##..####..##..#....####.
        "
      `)
    })
  })
})
