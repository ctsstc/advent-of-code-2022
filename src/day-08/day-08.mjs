import Problem from '../_lib/problem.mjs'

class Day08 extends Problem {
  #grid
  #gridWidth
  #gridHeight
  visibleTrees = new Set() // Set<String> "x,y"

  constructor(inputFileName) {
    super(inputFileName)
    this.#grid = this.parseGridToTrees()
    this.#gridWidth = this.#grid[0].length
    this.#gridHeight = this.#grid.length
  }

  solvePart1() {
    this.checkFromTheTop()
    this.checkFromTheRight()
    this.checkFromTheBottom()
    this.checkFromTheLeft()

    return this.visibleTrees.size
  }

  solvePart2() {
    return this.getHighestTreeScore()
  }

  /**
   * @returns {Array<Array<number>>}
   */
  parseGridToTrees() {
    const grid = Array.from(Array(this.lines.length), () => [])

    this.lines.forEach((line, y) => {
      line.split('').forEach((char, x) => {
        const value = parseInt(char)
        grid[y][x] = value
      })
    })

    return grid
  }

  // Part 1
  checkFromTheTop() {
    for (let x = 0; x < this.#gridWidth; x++) {
      for (let y = 0; y < this.#gridHeight; y++) {
        const currentTree = this.#grid[y][x]

        // Everything on the top row is visible
        if (y === 0) {
          this.visibleTrees.add(`${x},${y}`)
          continue
        }

        // Check upwards from the current tree to see if it's visible
        let visible = true
        for (let up = y - 1; up >= 0; up--) {
          const upValue = this.#grid[up][x]
          if (upValue >= currentTree) {
            visible = false
            break
          }
        }

        if (visible) {
          this.visibleTrees.add(`${x},${y}`)
        }
      }
    }
  }

  checkFromTheRight() {
    for (let y = 0; y < this.#gridHeight; y++) {
      for (let x = this.#gridWidth - 1; x >= 0; x--) {
        const currentTree = this.#grid[y][x]

        // Everything on the right column is visible
        if (x === this.#gridWidth - 1) {
          this.visibleTrees.add(`${x},${y}`)
          continue
        }

        // Tree is already visible, don't do any work on it        const alreadyVisible = this.visibleTrees.has(`${x},${y}`)
        const alreadyVisible = this.visibleTrees.has(`${x},${y}`)
        if (alreadyVisible) {
          continue
        }

        // Check rightward from the current tree to see if it's visible
        let visible = true
        for (let right = x + 1; right <= this.#gridWidth; right++) {
          const rightValue = this.#grid[y][right]
          if (rightValue >= currentTree) {
            visible = false
            break
          }
        }

        if (visible) {
          this.visibleTrees.add(`${x},${y}`)
        }
      }
    }
  }

  checkFromTheBottom() {
    for (let y = this.#gridHeight - 1; y >= 0; y--) {
      for (let x = 0; x < this.#gridWidth; x++) {
        const currentTree = this.#grid[y][x]

        // Everything on the bottom row is visible
        if (y === this.#gridHeight - 1) {
          this.visibleTrees.add(`${x},${y}`)
          continue
        }

        // Tree is already visible, don't do any work on it
        const alreadyVisible = this.visibleTrees.has(`${x},${y}`)
        if (alreadyVisible) {
          continue
        }

        // Check downward from the current tree to see if it's visible
        let visible = true
        for (let down = y + 1; down < this.#gridHeight; down++) {
          const downValue = this.#grid[down][x]
          if (downValue >= currentTree) {
            visible = false
            break
          }
        }

        if (visible) {
          this.visibleTrees.add(`${x},${y}`)
        }
      }
    }
  }

  checkFromTheLeft() {
    for (let x = 0; x < this.#gridWidth; x++) {
      for (let y = 0; y < this.#gridHeight; y++) {
        const currentTree = this.#grid[y][x]

        // Everything on the left column is visible
        if (x === 0) {
          this.visibleTrees.add(`${x},${y}`)
          continue
        }

        // Tree is already visible, don't do any work on it
        const alreadyVisible = this.visibleTrees.has(`${x},${y}`)
        if (alreadyVisible) {
          continue
        }

        // Check downward from the current tree to see if it's visible
        let visible = true
        for (let left = x - 1; left >= 0; left--) {
          const leftValue = this.#grid[y][left]
          if (leftValue >= currentTree) {
            visible = false
            break
          }
        }

        if (visible) {
          this.visibleTrees.add(`${x},${y}`)
        }
      }
    }
  }

  // Part 2

  getTreeScore(x, y) {
    const currentTree = this.#grid[y][x]

    const treeLineUp = this.#grid
      .slice(0, y)
      .reverse()
      .map((row) => row[x])
    const treeLineRight = this.#grid[y].slice(x + 1)
    const treeLineDown = this.#grid.slice(y + 1).map((row) => row[x])
    const treeLineLeft = this.#grid[y].slice(0, x).reverse()

    // console.log({ treeLineUp, treeLineRight, treeLineDown, treeLineLeft })

    const upScore = this.getLineScore(currentTree, treeLineUp)
    const rightScore = this.getLineScore(currentTree, treeLineRight)
    const downScore = this.getLineScore(currentTree, treeLineDown)
    const leftScore = this.getLineScore(currentTree, treeLineLeft)

    // console.log({ upScore, rightScore, downScore, leftScore })

    return upScore * rightScore * downScore * leftScore
  }

  /**
   *
   * @param {number} houseHeight
   * @param {number[]} treesToCheck
   */
  getLineScore(houseHeight, treesToCheck) {
    if (treesToCheck.length === 0) return 0

    let visibleTreeScore = 0
    // console.log({ treesToCheck })
    for (let i = 0; i < treesToCheck.length; i++) {
      const currentTree = treesToCheck[i]

      if (currentTree >= houseHeight) {
        visibleTreeScore++
        break
      }

      visibleTreeScore++
    }

    return visibleTreeScore
  }

  getHighestTreeScore() {
    let highScore = 0

    this.#grid.forEach((row, y) => {
      row.forEach((_treeValue, x) => {
        const score = this.getTreeScore(x, y)
        if (score > highScore) {
          highScore = score
        }
      })
    })

    return highScore
  }
}

// solvePart2() {
//   return parseInt(this.solvePart1())
// }
export default Day08
