import { readFileSync } from 'fs'

export default function Day03Part1(filePath) {

  const file = readFileSync(filePath, "utf8")

  const lines = file.split("\n")
  // for each line, get the length and divide by 2, and then create a set of strings, one for [0] and one for [1]
  // first step is just turning the string into another list of 2 strings
  // 
  const compartments = lines.map((line) => {
    const length = line.length
    const half = length / 2
    const left = line.substring(0, (half))
    const right = line.substring(half, (length))
    return [left, right]
  })
  // console.log({compartments})
  // Do a for loop of each character in the left compartment and see if it's in the right compartment
  // if it is, figure out the ascii number fixed to it, and if it's capitalized, then subtract something, if it's lowercase, subtract another thing
  // add that number to a sum variable

  // for each compartment
  //  take the left compartment and split the string into a collection of characters
  //  then we do the same with the right side
  // Next we will go through each character in the right side and 
  //  check if it is contained in the left side collection
  // If we find the character that exists in both we can return it
  // I want to end up with a collection of characters (the character we found that is in both compartments (left & right side))

  // difference of two arrays according to stackoverflow: let intersection = arr1.filter(x => arr2.includes(x));

  const similarities = compartments.map(([left, right]) => {
    const lCharacters = left.split("")
    const rCharacters = right.split("")
    // console.log({lCharacters, rCharacters})
    for (const character of lCharacters) {
      // console.log({character})
      if (rCharacters.includes(character)) {
        return character
      }
    }
  })
  let sum1 = 0
  // do a for loop of the list (similarities) and for each character where we first do an anonymous function to
  // get the ascii value to replace the letter, 
  // add it to some variable called "sum"
  // inside the for loop, if the character is uppercase then subtract 38, 
  //if the character is lower then subtract 96
  for (let i = 0; i < similarities.length; i++) {
    const char = similarities[i]
    const charCode = char.charCodeAt(0)
    const charIsLower = char == char.toLowerCase()
    const valueDifference = charIsLower ? 96 : 38
    const value = charCode - valueDifference

    sum1 += value
  }

  return sum1
  console.log({ sum1 })


  // this is my minecraft house 🛖
  // For each character convert the character to an ascii value
  // check if the value/character is lower case
  // if lower case subtract the difference to get a => 1  (96) (a => 97)
  // else subtract the difference to get A => 27 (38 (I think)) (A => 65)

  // Option 1

  const characterValues = characterCodes.map((charCode) => charCode > 95 ? charCode - 96 : charCode - 38)
  const sum = characterValues.reduce((sum, cur) => sum + cur, 0)

  return sum

  // Option 2
  function toCharacterCodes(char) {
    return char.charCodeAt(0)
  }

  function toCharacterValues(charCode) {
    return charCode > 95 ? charCode - 96 : charCode - 38
  }

  function sumUp(sum, cur) {
    return sum + cur
  }

  const characterCodes2 = similarities.map(toCharacterCodes)
  const characterValues2 = characterCodes2.map(toCharacterValues)
  const sum2 = characterValues2.reduce(sumUp, 0)

  return sum2
}

export function Day03Part2(filePath) {
  const file = readFileSync(filePath, "utf8")
  const lines = file.split("\n")

  /** We want to create a collection of groups 3 wide
   * [
   *  [bag1, bag2, bag3],
   *  [bag1, bag2, bag3],
   *  [bag1, bag2, bag3],
   * ]
   */

  const groups = []
  for (let i = 0; i < lines.length; i++) {
    const isFirst = i % 3 === 0

    if (isFirst) {
      groups.push([])
    }

    const groupIndex = Math.floor(i / 3) // ie: 0/3 = 0, 1/3 = 0, 2/3 = 0,  4: 3/3 = 1
    const currentGroup = groups[groupIndex]
    const bag = lines[i]
    const bagCharacters = bag.split('')
    currentGroup.push(bagCharacters)
  }

  // console.log({ groups })

  // Find the common item between the 3 bags for each group

  const groupCommonalities = groups.map((group) => {
    const [bag1, bag2, bag3] = group
    // console.log({ bag1, bag2, bag3 })

    const commonalities1 = bag1.filter((bag1Item) => bag2.includes(bag1Item))
    const commonalities2 = commonalities1.filter((commonItem) => bag3.includes(commonItem))

    return commonalities2.at(0)
  })

  // console.log({ groupCommonalities })

  // Convert the characters to character codes
  //  Then subtract the difference if it is upper or lower case so that we get the correct value

  const characterCodes = groupCommonalities.map((char) => char.charCodeAt(0))
  const characterValues = characterCodes.map((charCode) => charCode > 95 ? charCode - 96 : charCode - 38)
  const sum = characterValues.reduce((sum, cur) => sum + cur, 0)

  return sum
}