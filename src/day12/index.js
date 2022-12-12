import '../util/lib.js'
import {readFile} from '../util/fileHelper.js'
import {a_z} from '../util/constants.js'
import {max, min} from 'ramda'

const data = await readFile(new URL('./input.txt', import.meta.url))

const originalMap = data
    .split('\n')

const findS = () => {
    for (let i = 0; i < originalMap.length; i++) {
        for (let j = 0; j < originalMap[i].length; j++) {
            if (originalMap[i][j] === 'S') {
                return [i, j]
            }
        }
    }
}

const map = originalMap.map(l => l.split('')
    .map(x => {
        if (x === 'S') {
            return 'a'
        } else if (x === 'E') {
            return 'z'
        } else {
            return x
        }
    }).join(''))

const resolve = (toReview) => {
    const all = new Set()
    while (toReview.length > 0) {
        const p = toReview.shift()
        if (point(p[0], originalMap) === 'E') {
            return p
        }
        if (all.has(p.string())) {
            continue
        }
        all.add(p.string())
        neighbors(p[0], map)
            .filter(e => noDiagonal(p[0], e))
            .forEach(e => {
                if (canMove(point(p[0], map), point(e, map))) {
                    toReview.push([e, p[1] + 1])
                }
            })
    }
}

function canMove(fromA, toB) {
    return a_z.indexOf(toB) - a_z.indexOf(fromA) <= 1
}

function noDiagonal([x, y], [i, j]) {
    return x === i || y === j
}

function neighbors([i, j], array) {
    const neigh = []
    const row_limit = array.length - 1
    if (row_limit > 0) {
        const column_limit = array[0].length - 1
        for (let x = max(0, i - 1); x <= min(i + 1, row_limit); x++) {
            for (let y = max(0, j - 1); y <= min(j + 1, column_limit); y++) {
                if (x !== i || y !== j) {
                    neigh.push([x, y])
                }
            }
        }
    }
    return neigh
}

function point(p, m) {
    return m[p[0]][p[1]]
}

console.log(resolve([[findS(), 0]]), 'PART1')

const allAs = []
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === 'a') {
            allAs.push([i, j])
        }
    }
}

const part2 = resolve(allAs.map(p => [p, 0]))

console.log(part2, 'PART2')
