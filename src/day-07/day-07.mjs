import Problem from '../_lib/problem.mjs'

class Day07 extends Problem {
  // present working directory
  #pwd = ''
  #files = new Map([['/', null]])

  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    // build out our state of files and directories
    this.lines.forEach((line) => {
      if (this.isCommand(line)) {
        const fullCommand = this.parseCommand(line)

        switch (fullCommand.command) {
          case 'cd':
            switch (fullCommand.args) {
              case '/':
                this.#pwd = '/'
                break
              case '..':
                this.moveUpADirectory()
                break
              default:
                this.moveIntoDirectory(fullCommand.args)
                break
            }
            break
          case 'ls':
            break
          default:
            throw new Error('Unknown command')
        }
      }
      // is not a command, assume we're now in an ls
      // and we need to determine if it's a directory or not
      // we will only store files since we only care about directories if we cd into them
      else if (this.isFile(line)) {
        const file = this.parseFile(line)
        this.storeFile(file)
      }
    })

    console.log({ FILES: this.#files })
    // get the directories and their sizes
    const directories = this.getDirectories()
    const directoriesAndSizes = this.getDirectoriesSize(directories)
    const directorySizes = Array.from(directoriesAndSizes.values())
    const directorySizesUnder100K = directorySizes.filter(
      (size) => size < 100000,
    )
    return directorySizesUnder100K.reduce((acc, size) => acc + size, 0)
  }

  solvePart2() {
    return parseInt(this.solvePart1())
  }

  /**
   * Checks if the current line is a command
   *
   * @param {string} line the line to check
   * @return {boolean} returns true if it is a command
   */
  isCommand(line) {
    return line.charAt(0) === '$'
  }

  /**
   * @param {string} line
   * @return {{command: string, args: string}}
   */
  parseCommand(line) {
    const [_prefix, command, args] = line.split(' ')
    return {
      command,
      args,
    }
  }

  moveUpADirectory() {
    // something/whatever/yep
    const directories = this.#pwd.split('/')

    // call twice because we need to remove the trailing forward slash
    directories.pop()
    directories.pop()

    // build and set the pwd
    const newDirectory = directories.join('/') + '/'
    this.#pwd = newDirectory
  }

  /**
   *
   * @param {string} directory
   */
  moveIntoDirectory(directory) {
    // update the pwd to the new directory
    this.#pwd = `${this.#pwd}${directory}/`

    // check if the directory has been stored yet
    // if not add it to the #files
    const directoryExists = this.#files.has(this.#pwd)
    if (!directoryExists) {
      this.#files.set(this.#pwd, null)
    }
  }

  isFile(line) {
    const [part1] = line.split(' ')
    const isFile = part1 !== 'dir'

    return isFile
  }

  /**
   *
   * @param {string} line
   * @returns {{name: string, size: number}}
   */
  parseFile(line) {
    const [fileSize, name] = line.split(' ')

    return {
      name,
      size: parseInt(fileSize),
    }
  }

  /**
   *
   * @param {{name: string, size: number}} file
   */
  storeFile(file) {
    const directoryAndFileName = `${this.#pwd}${file.name}`

    this.#files.set(directoryAndFileName, file.size)
  }

  /**
   * @returns {string[]}
   */
  getDirectories() {
    const keys = Array.from(this.#files.keys())
    console.log('KEEEYYYYYSSS', keys)
    return keys.filter((key) => this.#files.get(key) === null)
  }

  /**
   * @param {string[]} directories
   * @returns {Map<string, number>}
   */
  getDirectoriesSize(directories) {
    const directorySizes = new Map()

    directories.forEach((directory) => {
      const size = this.getDirectorySize(directory)
      directorySizes.set(directory, size)
    })

    return directorySizes
  }

  /**
   * @param {string} directory
   * @returns {number}
   */
  getDirectorySize(directory) {
    const fileNames = Array.from(this.#files.keys())
    const matchingFiles = fileNames.filter((fileName) =>
      fileName.startsWith(directory),
    )

    return matchingFiles.reduce((sum, fileName) => {
      return sum + this.#files.get(fileName)
    }, 0)
  }
}

export default Day07

// const problem = new Day07('input.txt')
// problem.something('world')
// problem.another
// problem.lines.length

// const bob = {
//   name: 'bob',
// }

// bob.name
// bob.name = 'susan'

// class Person {
//   #name

//   constructor(name) {
//     this.#name = name
//   }

//   get name() {
//     return this.#name
//   }
// }

// const susan = new Person('susan')
// susan.name

//
//{
//for optimization, we shouldn't have to worry about ls with directories unless we cd into them,
// so we can ignore creating them in our list
//after ls, if line starts with dir, then we create a key with a blank list
// if number, then create a key with the name of the file and a value of the storage
//"/": [{a:12313131},{b:1231321},{},{}]
//}
