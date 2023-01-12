import Problem from '../_lib/problem.mjs'

const NOOP_COMMAND = 'noop'
const ADDX_COMMAND = 'addx'
const NOOP_CYCLE_COUNT = 1
const ADDX_CYCLE_COUNT = 2

class Day10 extends Problem {
  #currentCycle = 0
  #currentValue = 1
  #sum = 0

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
}







// solvePart2() {
//   return parseInt(this.solvePart1())
// }
export default Day10
