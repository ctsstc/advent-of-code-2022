import Problem from '../_lib/problem.mjs'

class Day03 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    return this.lines.reduce((sb, line) => sb + line, '')
  }

  solvePart2() {
    return parseInt(this.solvePart1())
  }
}

export default Day03
