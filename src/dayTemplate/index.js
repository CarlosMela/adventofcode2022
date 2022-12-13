import '../util/lib.js'
import {readFile} from '../util/fileHelper.js'

// const data = await fetchInput(5)
const data = await readFile(new URL('./input.txt', import.meta.url))

const part1 = data
    .split('\n')

const part2 = null


console.log(part1, 'PART1')

console.log(part2, 'PART2')
