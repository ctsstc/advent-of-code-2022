import Problem from '../_lib/problem.mjs'

class Day06 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }
  
  solvePart1() {
    const firstLine = this.lines[0]
    const stringLength = 4

    for (let i = 0; i < firstLine.length - stringLength ; i++ ){
      const characters = firstLine.substring(i, i + stringLength)
      // console.log({characters})
      const set_of_characters = new Set(characters)
      if (set_of_characters.size == stringLength) {
        return i + stringLength
      }
    }
    return "UwU; you shouldn't be here"
  }

  solvePart2() {
    const first_line = this.lines[0]
    const string_length = 14

    for (let i = 0; i < first_line.length - string_length; i++) {
      const characters = first_line.substring(i, i + string_length)
      // console.log({characters})
      const set_of_characters = new Set(characters)
      if (set_of_characters.size == string_length) {
        return i + string_length
      }
    }
    return "UwU; you shouldn't be here"
  }
}

export default Day06
