import Problem from '../_lib/problem.mjs'

class Day05 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    return this.get_answer()
  }

  solvePart2() {
    
  }

  // Init/Helpers

  get_empty_line_index() {
    return this.lines.findIndex((line) => line === '')
  }

  // Boxes
  // an empty box is represented with an empty string of 3 spaces "   "
  get_raw_state_of_boxes() {
    const boxes_placement = this.lines.slice(0, this.get_empty_line_index() - 1)
    // console.log({ boxes_placement })
    return boxes_placement
  }

  // each column is 3 spaces wide with 1 space between them,
  // so each column except the last is 4 spaces wide
  // we add 1 to the length to add a space for the last column
  // this allows us to divide by 4 to get the column count
  // given their size of(3 characters wide with spacing)
  get_amount_of_columns() {
    const column_range = this.get_raw_state_of_boxes().at(0).length + 1
    // console.log({column_range})
    const column_count = column_range / 4
    // console.log({ column_count })
    return column_count
  }

  parsed_boxes() {
    const column_count = this.get_amount_of_columns()
    const raw_boxes = this.get_raw_state_of_boxes()
    // create an array of empty arrays
    // So for a column count of 3 we will have [[], [], []]
    // creates an empty array of length 3 and fills it will empty arrays
    const parsed_boxes = Array.from(Array(column_count), () => [])

    // containers are 3 characters wide, and we move 4 characters each time
    // to account for the space between each container
    // once we get to the last column since we're only slicing 3 characters
    // we will not need to worry about the space that would otherwise be
    // missing for a 4 character wide slice

    // traverse the lines backwards so that collections are in the correct order
    // we could have collected the lines and then reversed them
    // but instead we are adding to the columns in reverse order
    raw_boxes
      .slice() // clone to dereference
      .reverse() // reverse
      .forEach((line) => {
        for (
          let current_column = 0;
          current_column < column_count;
          current_column++
        ) {
          //[Z] [M] [P]
          const start_index = current_column * 4 + 1 // add 1 to skip the starting [
          const end_index = start_index + 3 - 2 // subtract 1 to skip the ending ]
          const character = line.substring(start_index, end_index)
          if (character != ' ') {
            parsed_boxes[current_column].push(character)
          }
        }
      })
    // console.log({ parsed_boxes })
    return parsed_boxes
  }

  // Moves

  // slice the lines after the empty line
  get_raw_state_of_moves() {
    const moves  = this.lines.slice(this.get_empty_line_index() + 1, this.lines.length)
    // console.log({ moves })
    return moves

      // number of iterations we gotta go through when moving crates, only so far works with single digits, maybe we can turn move into a list
      // from the list of characters, we take out the empty spaces, we find the index of "e" from (move)
      // then we do a slice starting at indexOf("e")+1, to indexOf("f") = set this up as a const crate_movement
      // then do another slice starting at indexOf("m")+1, to indexOf("t") = set this up as a const from_index
      // then do another slice starting at indexOf("o")+1, to move.length = set this up as a const to_index

    // for (let move of moves) {
    //   console.log(move)
      // const crates_to_move = move.slice(4,6) 
      // console.log(crates_to_move)
    // }
  }


  // get three values: iterations, from_index, to_index
  parse_moves() {
    // move 1 from 2 to 1
    // move (#) from (#) to (#)
    // reference regex101.com
    const regex_matcher = /move (\d+) from (\d+) to (\d+)/

    return this.get_raw_state_of_moves().map((line) => {
      const [_match, iterations, from_index, to_index] = line.match(regex_matcher)
      
      return {
        iterations,
        from_index: from_index - 1,
        to_index: to_index - 1,
      }
    })
  }

  // Moves & Boxes

  apply_moves() {
    /** 
     * VISUAL:
     *     [D]
     * [N] [C]
     * [Z] [M] [P]
     */
    // parsed_boxes: [ [ 'Z' ], [ 'M', 'N', 'D' ], [ 'P', 'C' ] ]
    // move: { iterations: '1', from_index: '2', to_index: '1' }
    const moves = this.parse_moves()
    // console.log({moves})
    const boxes = this.parsed_boxes()
    // console.log({boxes})
    /**
     * For each move:
     * slice off the boxes[from_index] by a length of iterations
     * push the sliced off crates to the boxes[to_index]
     */

    for (let move of moves) {
      // console.log({ move })
      const iterations = move['iterations']
      const from_index = move['from_index']
      const to_index = move['to_index']
      
      // console.log({ iterations, from_index, to_index })
      const column = boxes[from_index]
      // console.log({column})
      const slice_start_index = column.length - iterations
      const moving_boxes = column.splice(slice_start_index, iterations)
      // console.log({boxes, moving_boxes})
      // ... is the spread operator
      // like if we had: [1,2,3]
      // this is the same as push(1,2,3) instead of push([1,2,3])
      boxes[to_index].push(...moving_boxes.reverse())

    }

    return boxes
  }

  // Answer

  get_answer() {
    const answer = this.apply_moves().map((column) => {
      return column.at(-1)
    }).join("")
    return answer
  }
}

export default Day05


/**
 * Find and parse top half
 * Find and parse bottom half
 * Apply moves to the data set
 * Grab the answer
 * PROFIT™
 */



// Lee's Pseudo
// first we look for a line thats first index is a number,
// we turn that line into a list so we can later create a collection??? 
// we grab that line index and then we create (enumerate?) a new list between numbers 1-(whatever number is at the end of the line)
// then we try to actually make it into a bunch of lists that would end up looking like
// we would probably have to try and have  each of the lists go in reverse so that numbers at the top would be numbers at the end of the list
//// {1: ["[Z]", "[N]"]}
//// {2: ["[M]", "[C]", "[D]"]}
//// {3: ["[P]"]}

// instead we will go with an array of arrays
// [ ["[Z]", "[N]"], ["[M]", "[C]", "[D]"], ["[P]"]]
// it'll then automatically have each list with its own index [0,1,2]
// We also don't need the square brackets so we can transform whatever the lines are turned into later
//
// look through the arrays and see which one has the longest length, and return the last index?