import { readFileSync } from 'fs'

export default class Day03 {
  answer

  constructor(filePath) {
    const file = readFileSync(filePath, "utf8")

    const lines = file.split("\n")
    // for each line, get the length and divide by 2, and then create a set of strings, one for [0] and one for [1]
    // first step is just turning the string into another list of 2 strings
    // 
    const compartments = lines.map((line)=>{
      const length = line.length
      const half= length/2
      const left = line.substring(0,(half))
      const right = line.substring(half,(length))
      return [left,right]
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
    
    const similarities = compartments.map(([left, right])=> {
      const lCharacters = left.split("")
      const rCharacters = right.split("")
      // console.log({lCharacters, rCharacters})
      for (const character of lCharacters){
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
      if (char == char.toLowerCase()) {
        let codeL = char.charCodeAt(0)
        sum1 = sum1 + codeL - 96
      }
      else {
        let codeU = char.charCodeAt(0)
        sum1 = sum1 + codeU - 38
      }
    }
    console.log({sum1})
    this.answer = sum1
    // this is my minecraft house 🛖
    // For each character convert the character to an ascii value
    // check if the value/character is lower case
    // if lower case subtract the difference to get a => 1  (96) (a => 97)
    // else subtract the difference to get A => 27 (38 (I think)) (A => 65)
  }
}
