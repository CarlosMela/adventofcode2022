import '../util/lib.js'
import {readFile} from '../util/fileHelper.js'

const rock = 1
const paper = 2
const scissors = 3

const opponentBets = {'A': rock, 'B': paper, 'C': scissors}
const myBets = {'X': rock, 'Y': paper, 'Z': scissors}

var data = await readFile(new URL('./input.txt', import.meta.url))

var score1 = data.split('\n')
    .map((round) => {
        return round.split(' ')
    })
    .map(value => [opponentBets[value[0]], myBets[value[1]]])
    .map((himMe) => {
        return himMe[1] + outcomeScore(himMe[0], himMe[1])
    })
    .sum()
var score2 = data.split('\n')
    .map((round) => {
        return round.split(' ')
    })
    .map((himMe) => {
        return [himMe[0], selectOutcome(himMe[0], himMe[1])]
    })
    .map(value => [opponentBets[value[0]], myBets[value[1]]])
    .map((himMe) => {
        return himMe[1] + outcomeScore(himMe[0], himMe[1])
    })
    .sum()

function outcomeScore(him, me) {
    if (getWinner(him) === me) {
        return 6
    }
    if (getWinner(me) === him) {
        return 0
    }

    return 3
}

function selectOutcome(him, choice) {
    if (choice === 'X') {
        return myBets.keys()
            .filter(k => opponentBets[him] === getWinner(myBets[k]))[0]
    }
    if (choice === 'Y') {
        return myBets.keys()
            .filter(k => myBets[k] === opponentBets[him])[0]
    }
    if (choice === 'Z') {
        return myBets.keys()
            .filter(k => myBets[k] === getWinner(opponentBets[him]))[0]
    }
}

function getWinner(bet) {
    if (bet === rock) {
        return paper
    } else if (bet === paper) {
        return scissors
    } else if (bet === scissors) {
        return rock
    }
}

console.log(score1, 'PART1')
// 8933 PART1
console.log(score2, 'PART2')
// 11998 PART2
