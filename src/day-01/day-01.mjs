import Problem from '../_lib/problem.mjs'

class Day01 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    const maxValue = Math.max(...this.#elfCalories)

    return maxValue

    // this.linesAsInts.reduce((collection, currentValue) => {
    //   const currentElfValue = collection[currentElfIndex]



    //   if (currentElfValue === undefined) {
    //     collection.push(currentValue)
    //   }
    //   else {
    //     collection[currentElfIndex] = currentElfValue + currentValue
    //   }

    //   return collection
    // }, [])
  }

  solvePart2() {
    return parseInt(this.solvePart1())
  }

  get #elfCalories() {
    let currentElfIndex = 0

    this.linesAsInts

    const elves = [0]
    for (let i = 0; i < this.linesAsInts.length; i++) {
      const currentValue = this.linesAsInts[i]

      if (currentValue === 0) {
        currentElfIndex++
        elves.push(0)
      }
      else {
        elves[currentElfIndex] += currentValue
      }
    }

    return elves
  }
}

export default Day01
