import '../util/lib.js'
import {readFile} from '../util/fileHelper.js'

const data = await readFile(new URL('./input.txt', import.meta.url))

const cycles = data
    .split('\n')
    .map((s) => [s.strings()[0], s.numbers(0)])
    .map(a => (a[0] === 'noop') ? 0 : parseInt(a[1][0]))
    .reduce((acc, x, n) => {
        const prevCycle = n > 0 ? acc.last().c : 0
        const prevRegister = n > 0 ? acc.last().v : 1
        const X = prevRegister + x
        if (x === 0) {
            acc.push({c: prevCycle + 1, cv: prevRegister, v: X})
        } else {
            acc.push({c: prevCycle + 1, cv: prevRegister, v: prevRegister})
            acc.push({c: prevCycle + 2, cv: prevRegister, v: X})
        }
        return acc
    }, [])

const strengths = cycles.map(x => x.cv * x.c)

const image = cycles.reduce((acc, cycleItem, n, array) => {
    let line = acc.last()
    const spiritPosition = cycleItem.cv
    if (cycleItem.c % 40 >= spiritPosition && cycleItem.c % 40 <= spiritPosition + 2) {
        line += '#'
    } else {
        line += '.'
    }

    acc[acc.length - 1] = line
    if (line.length === 40 && (n !== array.length - 1)) {
        acc.push('')
    }
    return acc
}, [''])

console.log(strengths[19] + strengths[59] + strengths[99] + strengths[139] + strengths[179] + strengths[219], 'PART1')

console.log(image.join('\n'), 'PART2')
