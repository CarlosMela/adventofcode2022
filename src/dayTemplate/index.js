import '../util/lib.js'
import {fetchInput} from '../util/onlineInput.js'

// var data = await readFile(new URL('./input.txt', import.meta.url))
const data = await fetchInput(5)

const part1 = data
    .split('\n')

const part2 = null


console.log(part1, 'PART1')

console.log(part2, 'PART2')
