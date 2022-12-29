import Problem from '../_lib/problem.mjs'

class Day04 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    return this.findContainsOneAnother().filter(Boolean).length
  }

  findContainsOneAnother() {
    return this.lines.map(line => {
      const [left, right] = line.split(',')
      const [leftLower, leftUpper] = this.getRange(left)
      const [rightLower, rightUpper] = this.getRange(right)

      const leftContainedInRight = leftLower <= rightLower && leftUpper >= rightUpper
      const rightContainedInLeft = rightLower <= leftLower && rightUpper >= leftUpper

      return leftContainedInRight || rightContainedInLeft
    })
  }

  getRange(stringRange) {
    const [lower, upper] = stringRange.split('-')
    return [parseInt(lower), parseInt(upper)]
  }

  solvePart2() {
    return this.findOverlaps().filter(Boolean).length
  }

  findOverlaps() {
    return this.lines.map(line => {
      const [left, right] = line.split(',')
      const [leftLower, leftUpper] = this.getRange(left)
      const [rightLower, rightUpper] = this.getRange(right)

      const leftLowerOverlapsRight = leftLower <= rightUpper && leftLower >= rightLower
      const leftUpperOverlapsRight = leftUpper >= rightLower && leftUpper <= rightUpper
      const rightLowerOverlapsLeft = rightLower <= leftUpper && rightLower >= leftLower
      const rightUpperOverlapsLeft = rightUpper >= leftLower && rightUpper <= leftUpper

      return leftLowerOverlapsRight || leftUpperOverlapsRight || rightLowerOverlapsLeft || rightUpperOverlapsLeft
    })
  }
}

export default Day04
