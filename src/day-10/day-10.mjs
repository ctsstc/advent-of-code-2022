import Problem from '../_lib/problem.mjs'

const NOOP_COMMAND = 'noop'
const ADDX_COMMAND = 'addx'
const NOOP_CYCLE_COUNT = 1
const ADDX_CYCLE_COUNT = 2

class Day10 extends Problem {
  #currentCycle = 0
  #currentValue = 1
  #sum = 0
  #screen = []

  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    this.lines.forEach((line) => {
      // console.log({line})
      const [operation, strVal] = line.split(' ')

      if (operation == NOOP_COMMAND) {
        this.#currentCycle += NOOP_CYCLE_COUNT

        this.#addSumIfSummableCycle()
      }
      else if (operation == ADDX_COMMAND) {
        const value = parseInt(strVal)

        for (let i = 0; i < ADDX_CYCLE_COUNT; i++) {
          this.#currentCycle++

          this.#addSumIfSummableCycle()

          // Increase the current value on the second cycle
          if (i == 1) {
            this.#currentValue += value
          }
        }
      }
      else {
        throw new Error("IMPOSSIBRUUUU!!!")
      }

    })

    return this.#sum
  }

  solvePart2() {
    this.lines.forEach((line) => {
      // console.log({line})
      const [operation, strVal] = line.split(' ')

      if (operation == NOOP_COMMAND) {
        this.#incrementCycleAndDraw()

        this.#addSumIfSummableCycle()
      }
      else if (operation == ADDX_COMMAND) {
        const value = parseInt(strVal)

        for (let i = 0; i < ADDX_CYCLE_COUNT; i++) {
          this.#incrementCycleAndDraw()

          // Increase the current value on the second cycle
          if (i == 1) {
            this.#currentValue += value
          }
        }
      }
      else {
        throw new Error("IMPOSSIBRUUUU!!!")
      }
    })

    return this.#drawScreen()
  }

  #drawScreen() {
    const lines = 6

    let drawScreen = '\n'
    for (let i = 0; i < lines; i++) {
      const startIndex = i * 40
      const endIndex = startIndex + 40
      const currentLine = this.#screen.slice(startIndex, endIndex)
      const drawLine = currentLine.map((line) => line == true ? '#' : '.').join('')
      // console.log({currentLine, drawLine})
      drawScreen += drawLine + "\n"
    }

    console.log("SCREENIE BOY 9000™")
    console.log(drawScreen)

    return drawScreen
  }

  #incrementCycleAndDraw() {
    this.#screen.push(this.#isValueInCycleRange())
    this.#currentCycle++
  }

  #isValueInCycleRange() {
    const diff = Math.abs(this.#currentValue - (this.#currentCycle % 40))

    // console.log({diff, value: this.#currentValue, cycle: this.#currentCycle })

    // Can be in a range of 1 above or 1 below
    return diff <= 1
  }

  #addSumIfSummableCycle() {
    if (this.#isSummableCycle()) {
      // console.log({
      //   cycle: this.#currentCycle,
      //   sum: this.#sum,
      //   value: this.#currentValue,
      //   signalStrength: this.#getSignalStrength()
      // })
      this.#sum += this.#getSignalStrength()
    }
  }

  #isSummableCycle() {
    return this.#currentCycle == 20 || (this.#currentCycle - 20) % 40 == 0
  }

  #getSignalStrength() {
    // console.log({
    //   currentCycle: this.#currentCycle,
    //   value: this.#currentValue,
    //   signalStrength: this.#currentCycle * this.#currentValue
    // })
    return this.#currentCycle * this.#currentValue
  }

  /**
   * === PROBLEM 1 ===
   * 
   * Need to have an idea of a "cycle" counter, and current value / register
   * 
   * We have 2 operations: `addx` and `noop`
   * 
   * Any cycle increases the current cycle counter by 1
   * 
   * addx: consists of 2 cycles
   *    1. the first cycle does nothing, the current value stays the same
   *    2. the second cycle handles the addition to the current value
   * 
   * noop: consists of 1 cycle
   *    1. does nothing
   * 
   * Signal Strength:
   *  Is computed by taking the current cycle * the current value
   * 
   * Sum/Answer:
   *  Every 20 + 40x cycles we need to add the current signal strength to a sum which will the final answer
   * 
   */

  /**
   * === PROBLEM 2 ===
   * Store the screen in a single dimensional array of true/false values
   * 
   * Drawing:
   *  take slices of the array by 40
   *  map the slices from true/false to #/.
   *  add a new line at the end of each 40
   * 
   * Determine if the pixel lights up for the current cycle:
   *  Look at the current value and determine if the current cycle is within a range of 
   *  -1 through +1 of the current value since the sprite is 3 pixels wide with the center
   *  in the middle at pixel 2.
   * 
   */
}







// solvePart2() {
//   return parseInt(this.solvePart1())
// }
export default Day10
