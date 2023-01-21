import Problem from '../_lib/problem.mjs'
import Monkey from './monkey.mjs'
import Monkey2 from './monkey2.mjs'

const lines_in_monkey = 7

class Day11 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  // solvePart1() {
  //   // create a parser
  //   const lines_in_monkey = 7
  //   const number_of_monkeys = (this.lines.length + 1) / lines_in_monkey
  //   // console.log({ number_of_monkeys })
  //   const monkey_collection = []

  //   for (let i = 0; i < number_of_monkeys; i++) {
  //     const starting_index = i * lines_in_monkey

  //     // Get all the lines for a monkey
  //     const start_item_string = this.lines[starting_index + 1]
  //     const operation_string = this.lines[starting_index + 2]
  //     const test_string = this.lines[starting_index + 3]
  //     const true_monkey_string = this.lines[starting_index + 4]
  //     const false_monkey_string = this.lines[starting_index + 5]

  //     // Split lines into key value pairs; we will not be using the key though, it's throw-away
  //     // use _ before a variable we plan to not reference later
  //     const [_starting_item_key, starting_item_value] =
  //       start_item_string.split(': ')
  //     const [_operation_key, operation_value] = operation_string.split('old ')
  //     const [_test_key, test_value] = test_string.split('by ')
  //     const [_true_monkey_key, true_monkey_value] =
  //       true_monkey_string.split('monkey ')
  //     const [_false_monkey_key, false_monkey_value] =
  //       false_monkey_string.split('monkey ')

  //     // Break down starting item values to add to array
  //     const starting_items = starting_item_value.split(', ').map(Number)
  //     const [operator, operand] = operation_value.split(' ')
  //     const operand_number = parseInt(operand)
  //     const operation = (worry_level) => {
  //       const actual_operand = operand === 'old' ? worry_level : operand_number

  //       if (operator === '+') {
  //         return worry_level + actual_operand
  //       }

  //       if (operator === '*') {
  //         // console.log({ worry_level, actual_operand, result: worry_level*actual_operand})
  //         return worry_level * actual_operand
  //       }

  //       if (operator === '-') {
  //         return worry_level - actual_operand
  //       }

  //       if (operator === '/') {
  //         return worry_level / actual_operand
  //       }

  //       throw new Error(
  //         "You shouldn't have gotten to this point, what's wrong with you?!",
  //       )
  //     }

  //     // console.log({operator, operand})
  //     const test_divisional_number = parseInt(test_value)
  //     const test = (worry_level) => {
  //       return worry_level % test_divisional_number === 0
  //     }
  //     // console.log({divisional_number: test_divisional_number})
  //     const true_monkey = parseInt(true_monkey_value)
  //     const false_monkey = parseInt(false_monkey_value)
  //     // console.log({true_monkey, false_monkey})

  //     const monkey = new Monkey(
  //       starting_items,
  //       operation,
  //       test,
  //       true_monkey,
  //       false_monkey,
  //       monkey_collection,
  //     )
  //     monkey_collection.push(monkey)
  //   }
  //   // return the number of inspected items per monkey over 20 rounds
  //   // each monkey will have items list, operation, test => actions (a,b)
  //   // per round, count how many items at beginning of round as an acc for each round number per monkey?

  //   for (let i = 0; i < 20; i++) {
  //     monkey_collection.forEach((monkey) => {
  //       monkey.inspect_items()
  //     })
  //   }
  //   // console.dir({ monkey_collection }, { depth: null })

  //   const sorted_monkeys = [...monkey_collection]
  //   sorted_monkeys.sort((monkey1, monkey2) => {
  //     return monkey2.items_inspected - monkey1.items_inspected
  //   })

  //   // console.dir({ sorted_monkeys }, { depth: null })

  //   return sorted_monkeys[0].items_inspected * sorted_monkeys[1].items_inspected
  // }

  parseMonkeyInfo(monkeyNumber) {
    const starting_index = monkeyNumber * lines_in_monkey

    // Get all the lines for a monkey
    const start_item_string = this.lines[starting_index + 1]
    const operation_string = this.lines[starting_index + 2]
    const test_string = this.lines[starting_index + 3]
    const true_monkey_string = this.lines[starting_index + 4]
    const false_monkey_string = this.lines[starting_index + 5]

    // Split lines into key value pairs; we will not be using the key though, it's throw-away
    // use _ before a variable we plan to not reference later
    const [_starting_item_key, starting_item_value] =
      start_item_string.split(': ')
    const [_operation_key, operation_value] = operation_string.split('old ')
    const [_test_key, test_value] = test_string.split('by ')
    const [_true_monkey_key, true_monkey_value] =
      true_monkey_string.split('monkey ')
    const [_false_monkey_key, false_monkey_value] =
      false_monkey_string.split('monkey ')

    // Break down starting item values to add to array
    const items = starting_item_value.split(', ').map(Number)
    const [operator, operand] = operation_value.split(' ')
    const operand_number = parseInt(operand)
    const operation = (worry_level) => {
      const actual_operand = operand === 'old' ? worry_level : operand_number

      if (operator === '+') {
        return worry_level + actual_operand
      }

      if (operator === '*') {
        // console.log({
        //   worry_level,
        //   actual_operand,
        //   result: worry_level * actual_operand,
        // })
        return worry_level * actual_operand
      }

      throw new Error(
        "You shouldn't have gotten to this point, what's wrong with you?!",
      )
    }

    // console.log({operator, operand})
    const test_divisional_number = parseInt(test_value)
    const test = (worry_level) => {
      return worry_level % test_divisional_number === 0
    }
    // console.log({divisional_number: test_divisional_number})
    const test_true_monkey = parseInt(true_monkey_value)
    const test_false_monkey = parseInt(false_monkey_value)

    return {
      items,
      operation,
      test,
      test_divisional_number,
      test_true_monkey,
      test_false_monkey,
    }
  }

  /**
   * @return {Monkey2[]}
   */
  getMonkeyCollection() {
    // create a parser
    const number_of_monkeys = (this.lines.length + 1) / lines_in_monkey
    // console.log({ number_of_monkeys })
    const monkey_collection = []

    for (let i = 0; i < number_of_monkeys; i++) {
      // console.log({true_monkey, false_monkey})
      const monkeyInfo = this.parseMonkeyInfo(i)
      const monkey = new Monkey2({ ...monkeyInfo, monkey_collection })

      monkey_collection.push(monkey)
    }

    return monkey_collection
  }

  /**
   *
   *
   * @param {Monkey2[]} monkeyCollection
   */
  throwingMonkeyBusiness(monkeyCollection) {
    // return the number of inspected items per monkey over 20 rounds
    // each monkey will have items list, operation, test => actions (a,b)
    // per round, count how many items at beginning of round as an acc for each round number per monkey?

    const magicNumber = monkeyCollection.reduce((multiple, monkey) => {
      return multiple * monkey.test_divisional_number
    }, 1)

    for (let i = 0; i < 10000; i++) {
      monkeyCollection.forEach((monkey) => {
        monkey.inspect_items(magicNumber)
      })
    }
  }

  sortMonkeyCollection(monkeyCollection) {
    const sortedMonkeys = [...monkeyCollection]

    sortedMonkeys.sort((monkey1, monkey2) => {
      return monkey2.items_inspected - monkey1.items_inspected
    })

    return sortedMonkeys
  }

  solvePart2() {
    const monkeyCollection = this.getMonkeyCollection()

    this.throwingMonkeyBusiness(monkeyCollection)
    // console.dir({ monkeyCollection }, { depth: null })

    const sortedMonkeys = this.sortMonkeyCollection(monkeyCollection)

    // console.dir({ sortedMonkeys }, { depth: null })

    return sortedMonkeys[0].items_inspected * sortedMonkeys[1].items_inspected
  }
}

export default Day11
