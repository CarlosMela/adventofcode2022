import '../util/lib.js'
import {readFile} from '../util/fileHelper.js'
import {compose, curry, isEmpty, not, prop, takeLast, trim} from 'ramda'

const data = await readFile(new URL('./input.txt', import.meta.url))

let reduceWorry = true

const operation = curry((op, param) => {
    const opFn = `(${op[0]} => ${op[0]} ${op[1]} ${op[2]})(${param})`
    return eval(opFn)
})

const monkeys = () => data
    .split('\n')
    .splitByItem('')
    .map(monkeyThings => monkeyThings.map(s => [s.strings(), s.numbers()]))
    .map(a => ({
        items: a[1][1].parseInt(),
        operation: takeLast(3, a[2][0].filter(compose(not, isEmpty, trim))),
        divisibleBy: a[3][1].parseInt()[0],
        ifTrue: a[4][1].parseInt()[0],
        ifFalse: a[5][1].parseInt()[0],
        inspections: 0
    }))

function round(monkeys) {
    for (let i = 0; i < monkeys.length; i++) {
        processItem(i, monkeys)
    }
}

function processItem(i, monkeys) {
    const divisorsNumber = monkeys.map(m => m.divisibleBy).multiply()
    const m = monkeys[i]
    let n = m.items.shift()
    while (n) {
        m.inspections++
        let r = operation(m.operation, n)
        if (reduceWorry) {
            r = Math.floor(operation(m.operation, n) / 3)
        }
        r = r % divisorsNumber // without this part2 numbers are too big (break without BigInt and too slow with it)
        if (r % m.divisibleBy === 0) {
            monkeys[m.ifTrue].items.push(r)
        } else {
            monkeys[m.ifFalse].items.push(r)
        }
        n = m.items.shift()
    }
}

const monkeys1 = monkeys()
reduceWorry = true
for (let i = 0; i < 20; i++) {
    round(monkeys1)
}
const part1 = monkeys1
    .map(prop('inspections'))
    .sort((a, b) => b - a)
    .slice(0, 2)
    .multiply()

const monkeys2 = monkeys()
reduceWorry = false
for (let i = 0; i < 10000; i++) {
    round(monkeys2)
}
const part2 = monkeys2
    .map(prop('inspections'))
    .sort((a, b) => b - a)
    .slice(0, 2)
    .multiply()

console.log(part1, 'PART1')
console.log(part2, 'PART2')
