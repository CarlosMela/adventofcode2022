import '../util/lib.js'
import {fetchInput} from '../util/onlineInput.js'

// var data = await readFile(new URL('./input.txt', import.meta.url))
var data = await fetchInput(5)

var part1 = data
    .split('\n')

var part2 = null


console.log(part1, 'PART1')

console.log(part2, 'PART2')
