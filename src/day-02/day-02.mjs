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
    const round_outcomes = this.lines.map((line) => {
      const [player1, player2] = line.split(" ")
      return this.calculate_round_score2(player1,player2)
    })
    return round_outcomes.reduce((sum, outcome) => sum + outcome, 0)
  }

  calculate_round_score(player1, player2){
    const outcome = this.calculate_outcome(player1,player2)
    const choice = this.calculate_choice(player2)
    return outcome + choice
  }

  calculate_round_score2(player1, player2){
    const outcome = this.calculate_outcome2(player1,player2)
    const player2choice = this.player2_choice(player1, player2)
    const choice = this.calculate_choice(player2choice)
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

  player2_choice(player1choice, player2choice){
    const choice_score = {X: 1, Y: 2, Z: 3}
    const rock = "X"
    const paper = "Y"
    const scissors = "Z"

    const lookup = {
      A:{ //Rock
        X: scissors,
        Y: rock,
        Z: paper
      },

      B:{ //Paper
        X: rock,
        Y: paper,
        Z: scissors
      },

      C:{ //Scissors
        X: paper,
        Y: scissors,
        Z: rock
      }
    }

    return lookup[player1choice][player2choice]
  }

  calculate_outcome2(player1,player2){
    const loss = 0
    const draw = 3
    const win = 6

    const static_outcomes = {
      X: loss,
      Y: draw,
      Z: win
    }


    const outcomes = {
      A: static_outcomes,

      B: static_outcomes,

      C: static_outcomes
    }
    const outcome_value = outcomes[player1][player2]
    return outcome_value
  }
}
//beep boop







export default Day02
