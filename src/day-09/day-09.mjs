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
      return xDifference > 1 || yDifference > 1
    }

    for (let i = 0; i < this.lines.length; i++) {
      const [direction, moves] = this.lines[i].split(' ')

      if (direction == 'U') {
        for (let move = 0; move < moves; move++) {
          headY--
          if (tail_too_far_from_head()) {
            tailX = headX
            tailY = headY + 1
          }
          tail_locations.add(`${tailX}, ${tailY}`)
        }
      } else if (direction == 'D') {
        for (let move = 0; move < moves; move++) {
          headY++
          if (tail_too_far_from_head()) {
            tailX = headX
            tailY = headY - 1
          }
          tail_locations.add(`${tailX}, ${tailY}`)
        }
      } else if (direction == 'L') {
        for (let move = 0; move < moves; move++) {
          headX--
          if (tail_too_far_from_head()) {
            tailX = headX + 1
            tailY = headY
          }
          tail_locations.add(`${tailX}, ${tailY}`)
        }
      } else if (direction == 'R') {
        for (let move = 0; move < moves; move++) {
          headX++
          if (tail_too_far_from_head()) {
            tailX = headX - 1
            tailY = headY
          }
          tail_locations.add(`${tailX}, ${tailY}`)
        }
      } else {
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
    const partLength = 10
    const parts = Array.from(Array(partLength), () => [0, 0])
    const head = parts[0]
    const tail = () => parts[parts.length - 1]
    const tailLocations = new Set()

    const updateParts = () => {
      for (let i = 1; i < partLength; i++) {
        const previousPart = parts[i - 1]
        const currentPart = parts[i]
        const newPosition = this.getNewPosition(previousPart, currentPart)

        if (i == partLength - 1) {
          console.log("TAIL UPDATE TIME!!!  ", { previousPart, currentPart, newPosition } )
        }

        parts[i] = newPosition
      }

      tailLocations.add(`${tail()[0]}, ${tail()[1]}`)
    }

    for (let i = 0; i < this.lines.length; i++) {
      const [direction, moves] = this.lines[i].split(' ')

      console.log("MOVES", moves)

      for (let move = 0; move < moves; move++) {
        if (direction == 'U') {
          head[1]++
          updateParts()
        } else if (direction == 'R') {
          head[0]++
          updateParts()
        } else if (direction == 'D') {
          head[1]--
          updateParts()
        } else if (direction == 'L') {
          head[0]--
          updateParts()
        } else {
          throw new Error('HOW DID YOU GET HERE?! Leave at once!    ')
        }
      }

      console.log('UPDATTEEEDDDD!!! ')
      console.log({ tailLocations })
    }

    return tailLocations.size
  }

  distanceTooFar([x1, y1], [x2, y2]) {
    const xDifference = Math.abs(x1 - x2)
    const yDifference = Math.abs(y1 - y2)

    return xDifference > 1 || yDifference > 1
  }

  getNewPosition([x1, y1], [x2, y2]) {
    let newX = x2
    let newY = y2

    if (this.distanceTooFar([x1, y1], [x2, y2])) {
      const xDifference = x1 - x2
      const yDifference = y1 - y2

      /** When a diagonal occurs vertically
       * .H
       * ..
       * T.
       */
      if (yDifference == 2) {
        newY++
      } else if (yDifference == -2) {
        newY--
      }

      if (Math.abs(yDifference == 2)) {
        if (xDifference > 0) {
          newX++
        } else if (xDifference < 0) {
          newX--
        }
      }

      // When a diagonal occurs horizontally
      if (xDifference == 2) {
        newX++
      } else if (xDifference == -2) {
        newX--
      }

      if (Math.abs(xDifference == 2)) {
        if (yDifference > 0) {
          newY++
        } else if (yDifference < 0) {
          newY--
        }
      }
    }

    return [newX, newY]
  }
}

export default Day09
