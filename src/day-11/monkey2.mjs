export default class Monkey2 {
  // # makes it a private property so nothing else outside of this can access it
  items = []
  #operation
  #test
  test_divisional_number
  #test_true_monkey
  #test_false_monkey
  items_inspected = 0
  #monkey_collection = []

  // what does @param do? (JS Documentation)
  // why do we need it ?
  //  https://jsdoc.app/tags-param.html
  //  - It sets the param typing, so that the IDE can infer the data types
  //  which will give better autocompletion. For example when you do this.#operation
  //  it will know that it is a function that takes a number and returns a number
  //  While the test param takes a function that takes a number and returns a boolean
  //  That way when you type later on something like: this.#test(123) we'll know it takes a number
  //  and returns a boolean, so if we did:
  // `const result = this.#test(123);` the IDE would know result is a boolean
  // Since we were not able to define the types above when defining the property fields,
  //  The language server is smart enough to interpret that since we set them in the constructor, they
  //  will continue to be that type, but the only way it would know the type is through the documentation.
  // when operation and test are functions we need to create,
  // why do we set them to be typed as numbers ?
  // or is that in reference to just only their output
  /**
   * @param {number[]} items
   * @param {(worry_level: number) => number} operation
   * @param {(worry_level: number) => boolean} test
   * @param {number} test_true_monkey
   * @param {number} test_false_monkey
   * @param {Monkey[]} monkey_collection array of Monkey
   */
  constructor({
    items,
    operation,
    test,
    test_divisional_number,
    test_true_monkey,
    test_false_monkey,
    monkey_collection,
  }) {
    this.items = items
    this.#operation = operation
    this.#test = test
    this.test_divisional_number = test_divisional_number
    this.#test_true_monkey = test_true_monkey
    this.#test_false_monkey = test_false_monkey
    this.#monkey_collection = monkey_collection
  }

  inspect_items(magicNumber) {
    this.items.forEach((item) => {
      this.inspect_item(item, magicNumber)
    })
    this.items = []
  }

  /*
   function inspectItems(monkey, monkeys, applyRelief = true) {
    let allDivisorsModulo = monkeys
      .map(monkey => monkey.test.isDivisibleBy)
      .reduce((modulo, divisor) => modulo * divisor, 1);
  
    monkey.itemsInspected += monkey.itemWorryLevelList.length;
    monkey.itemWorryLevelList = monkey.itemWorryLevelList
      .map(itemWorryLevel => {
        let newItemWorryLevel = evaluateMonkeyOperation(monkey.operation, itemWorryLevel);
        return applyRelief ? reliefItem(newItemWorryLevel) : newItemWorryLevel % allDivisorsModulo
      });
  
    return monkey;
  }
  */

  inspect_item(item, magicNumber) {
    const new_worry_value = this.#operation(item) % magicNumber
    const test_outcome = this.#test(new_worry_value)
    const monkey_to_pass_to = test_outcome
      ? this.#test_true_monkey
      : this.#test_false_monkey

    this.pass_to_monkey(new_worry_value, monkey_to_pass_to)
    this.items_inspected++
  }

  /**
   * @param {number} item_to_be_passed
   * @param {number} monkey_to_pass_to index of the monkey to pass to
   */
  pass_to_monkey(item_to_be_passed, monkey_to_pass_to) {
    // get a monkey from the monkey collection, give the monkey to pass to ass the index key
    // once we have a monkey, we need to push the item to be passed into its collection of items
    const monkey = this.#monkey_collection[monkey_to_pass_to]
    monkey.catch_item(item_to_be_passed)
  }

  catch_item(item) {
    this.items.push(item)
  }
}
