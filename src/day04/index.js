import '../util/lib.js'
import {readFile} from '../util/fileHelper.js'
import {map, split} from 'ramda'

const data = await readFile(new URL('./input.txt', import.meta.url))

let intervals = data
    .split('\n')
    .map(split(','))
    .map(map(split('-')))
    .map(map(map(parseInt)))

const fullyOverlappedSections = intervals
    .filter(([interval1, interval2]) => overlaps(interval1, interval2) || overlaps(interval2, interval1))
    .length

const partiallyOverlappedSections = intervals
    .filter(([interval1, interval2]) => overlapsSomething(interval1, interval2) || overlapsSomething(interval2, interval1))
    .length

function overlaps([a, b], [x, y]) {
    return a <= x && b >= y
}

function overlapsSomething([a, b], [x, y]) {
    return (x <= a && a <= y) || (x <= b && b <= y)
}

console.log(fullyOverlappedSections, 'PART1')

console.log(partiallyOverlappedSections, 'PART2')
