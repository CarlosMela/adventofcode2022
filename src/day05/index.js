import '../util/lib.js'
import {parseIntArray, splitEveryWithSkip} from '../util/arrayHelper.js'
import {readFile} from '../util/fileHelper.js'
import {compose, filter, isEmpty, last, not, replace, transpose, trim} from 'ramda'
import {getNumbers} from '../util/stringHelper.js'

const data = await readFile(new URL('./input.txt', import.meta.url))
const inputNumbersRowIndex = 8
const stacksRows = data
    .split('\n')
    .splice(0, inputNumbersRowIndex)
    .reverse()
    .map(splitEveryWithSkip(3, 1))

const stack = transpose(stacksRows)
    .map(filter(compose(not, isEmpty, trim)))

const moves = data
    .split('\n')
    .splice(inputNumbersRowIndex + 2)

const part1 = moves
    .reduce((acc, instruction) => {
        const [some, from, to] = parseIntArray(getNumbers(instruction))
        const moved = acc[from - 1].splice(-1 * some)
        acc[to - 1] = [...acc[to - 1], ...moved.reverse()]
        return acc
    }, stack)
    .map(last)
    .map(replace(/\[|\]/g, ''))
    .join('')

const part2 = moves
    .reduce((acc, instruction) => {
        const [some, from, to] = parseIntArray(getNumbers(instruction))
        const moved = acc[from - 1].splice(-1 * some)
        acc[to - 1] = [...acc[to - 1], ...moved]
        return acc
    }, stack)
    .map(last)
    .map(replace(/\[|\]/g, ''))
    .join('')

console.log(part1, 'PART1')

console.log(part2, 'PART2')
