import Problem from '../_lib/problem.mjs'

class Day06 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }
  
  solvePart1() {
    for (let i = 0; i < this.lines[0].length - 4 ; i++ ){
      const characters = this.lines[0].substring(i, i + 4)
      // console.log({characters})
      const set_of_characters = new Set(characters)
      if (set_of_characters.size == 4) {

        return i + 4
      }
    }
    return "UwU; you shouldn't be here"
  }

  solvePart2() {
    for (let i = 0; i < this.lines[0].length - 14 ; i++ ){
      const characters = this.lines[0].substring(i, i + 14)
      // console.log({characters})
      const set_of_characters = new Set(characters)
      if (set_of_characters.size == 14) {

        return i + 14
      }
    }
    return "UwU; you shouldn't be here"
  }
}

export default Day06
