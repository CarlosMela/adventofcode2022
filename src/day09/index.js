import '../util/lib.js'
import {curry, mapObjIndexed, range} from 'ramda'
import {readFile} from '../util/fileHelper.js'

const data = await readFile(new URL('./input.txt', import.meta.url))

const INIT = {x: 0, y: 0}
const INITIAL_ROPE = range(0, 10).map(() => (INIT))

const movements = {
    'U': curry((steps) => mapObjIndexed((v, k) => k === 'y' ? v + steps : v)),
    'D': curry((steps) => mapObjIndexed((v, k) => k === 'y' ? v - steps : v)),
    'R': curry((steps) => mapObjIndexed((v, k) => k === 'x' ? v + steps : v)),
    'L': curry((steps) => mapObjIndexed((v, k) => k === 'x' ? v - steps : v))
}

const tailsHistory = data
    .split('\n')
    .map(line => [line.substring(0, 1), line.numbers()[0]])
    .reduce((acc, move) => {
        let rope = acc[2]
        for (let i = 0; i < move[1]; i++) {
            const newH = movements[move[0]](1)(rope[0])
            rope = rope
                .map((value, index, array) => {
                    if (index === 0) {
                        array[index] = newH
                        return newH
                    } else {
                        const newVal = processTail(array[index - 1], value)
                        array[index] = newVal
                        return newVal
                    }
                })
            acc[0].pushUnique(rope[1].string())
            acc[1].pushUnique(rope[rope.length - 1].string())
        }
        return [acc[0], acc[1], rope]
    }, [[INIT.string()], [INIT.string()], INITIAL_ROPE])

function distance({x: x1, y: y1}, {x: x2, y: y2}) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

function processTail(h, t) {
    if (distance(h, t) < 2) {
        return t
    }
    if (distance(h, t) === 2) {
        if (h.x !== t.x && h.y !== t.y) {
            return t
        } else {
            const xDiff = (t.x === h.x) ? 0 : (h.x > t.x ? 1 : -1)
            const yDiff = (t.y === h.y) ? 0 : (h.y > t.y ? 1 : -1)
            return ({x: t.x + xDiff, y: t.y + yDiff})
        }
    }
    return ({x: t.x + (h.x > t.x ? 1 : -1), y: t.y + (h.y > t.y ? 1 : -1)})
}

console.log(tailsHistory[0].length, 'PART1')
console.log(tailsHistory[1].length, 'PART2')
