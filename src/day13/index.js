import '../util/lib.js'
import {readFile} from '../util/fileHelper.js'

const data = await readFile(new URL('./input.txt', import.meta.url))

const part1 = data
    .split('\n')
    .splitByItem('')
    .map(l => l.map(eval))
    .map(([a1, a2], index) => sort(a1, a2) < 0 ? index + 1 : 0)
    .sum()

console.log(part1, 'PART1')

const divider1 = [[2]]
const divider2 = [[6]]
const arrayPart2 = data
    .split('\n')
    .filter(item => !!item)
    .map(eval)
arrayPart2.push(divider1)
arrayPart2.push(divider2)

const part2 = arrayPart2.sort(sort)
    .map(a => a.string())
    .reduce((acc, v, i) => {
        if (v === divider1.string() || v === divider2.string()) {
            acc *= i + 1
        }
        return acc
    }, 1)

console.log(part2, 'PART2')

function sort(a1, a2) {
    if (typeof a1 === 'number') {
        a1 = [a1]
    }
    if (typeof a2 === 'number') {
        a2 = [a2]
    }
    if (a1.length === 0 || a2.length === 0) {
        return a1.length - a2.length
    }

    if (typeof a1[0] === 'number' && typeof a2[0] === 'number') {
        if (a1[0] === a2[0]) {
            return sort(a1.slice(1), a2.slice(1))
        } else {
            return a1[0] - a2[0]
        }
    }

    const first = sort(a1[0], a2[0])
    return first === 0 ? sort(a1.slice(1), a2.slice(1)) : first
}
