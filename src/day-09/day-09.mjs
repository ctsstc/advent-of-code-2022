import Problem from '../_lib/problem.mjs'

class Day09 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    let headX = 0
    let headY = 0
    let tailX = 0
    let tailY = 0
    const tail_locations = new Set()

    function tail_too_far_from_head() {
      const xDifference = Math.abs(headX - tailX)
      const yDifference = Math.abs(headY - tailY)
      // console.log({ xDifference, yDifference })
      return xDifference > 1 || yDifference > 1
    }

    for (let i = 0; i < this.lines.length; i++) {
      const [direction, moves] = this.lines[i].split(' ')
      // console.log({ i, direction, moves })

      if (direction == 'U') {
        for (let move = 0; move < moves; move++) {
          headY--
          if (tail_too_far_from_head()) {
            tailX = headX
            tailY = headY + 1
          }
          tail_locations.add(`${tailX}, ${tailY}`)
        }
      } 
      else if (direction == 'D') {
        for (let move = 0; move < moves; move++) {
          headY++
          if (tail_too_far_from_head()) {
            tailX = headX
            tailY = headY - 1
          }
          tail_locations.add(`${tailX}, ${tailY}`)
        }
      } 
      else if (direction == 'L') {
        for (let move = 0; move < moves; move++) {
          headX--
          if (tail_too_far_from_head()) {
            tailX = headX + 1
            tailY = headY
          }
          tail_locations.add(`${tailX}, ${tailY}`)
        }
      } 
      else if (direction == 'R') {
        for (let move = 0; move < moves; move++) {
          headX++
          if (tail_too_far_from_head()) {
            tailX = headX - 1
            tailY = headY
          }
          tail_locations.add(`${tailX}, ${tailY}`)
        }
      } 
      else {
        throw new Error(
          "This shouldn't happen, what's wrong with you... b-b-baka",
        )
      }
    }
    return tail_locations.size

    // R means move right
    // L means move left
    // U means move up
    // D means move down
  }

  solvePart2() {
    return parseInt(this.solvePart1())
  }
}

export default Day09
