import Problem from '../_lib/problem.mjs'

class Day02 extends Problem {
  constructor(inputFileName) {
    super(inputFileName)
  }

  solvePart1() {
    const round_outcomes = this.lines.map((line) => {
      const [player1, player2] = line.split(" ")
      return this.calculate_round_score(player1,player2)
    })
    return round_outcomes.reduce((sum, outcome) => sum + outcome, 0)
  }





  solvePart2() {
    return parseInt(this.solvePart1())
  }

  calculate_round_score(player1, player2){
    const outcome = this.calculate_outcome(player1,player2)
    const choice = this.calculate_choice(player2)
    return outcome + choice
  }

  calculate_outcome(player1,player2){
    const loss = 0
    const draw = 3
    const win = 6
    const outcomes = {
      A: { //Rock for win/draw/loss
        X: draw, //Rock
        Y: win, //Paper
        Z: loss // Scissors
      },

      B: { //Paper for win/draw/loss
        X: loss, //Rock
        Y: draw, //Paper
        Z: win // Scissors
      },

      C: { //Scissors for win/draw/loss
        X: win, //Rock
        Y: loss, //Paper
        Z: draw // Scissors
      }
    }
    const outcome_value = outcomes[player1][player2]
    return outcome_value
  }

  calculate_choice(player2choice){
    const choice_score = {X: 1, Y: 2, Z: 3}
    return choice_score[player2choice]
  }
}





export default Day02
