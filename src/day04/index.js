import '../util/lib.js'
import {readFile} from '../util/fileHelper.js'
import {map, split} from 'ramda'

var data = await readFile(new URL('./input.txt', import.meta.url))

var part1 = data
    .split('\n')
    .map(split(','))
    .map(map(split('-')))
    .map(map(map(parseInt)))
    .filter(x => overlaps(x[0], x[1]) || overlaps(x[1], x[0]))
    .length

var part2 = data
    .split('\n')
    .map(split(','))
    .map(map(split('-')))
    .map(map(map(parseInt)))
    .filter(x => overlapsSomething(x[0], x[1]) || overlapsSomething(x[1], x[0]))
    .length

function overlaps(a, b) {
    return a[0] <= b[0] && a[1] >= b[1]
}

function overlapsSomething(a, b) {
    return (b[0] <= a[0] && a[0] <= b[1]) || (b[0] <= a[1] && a[1] <= b[1])
}

console.log(part1, 'PART1')

console.log(part2, 'PART2')
