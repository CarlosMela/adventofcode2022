import '../util/lib.js'
import {readFile} from '../util/fileHelper.js'
import {take} from 'ramda'

const data = await readFile(new URL('./input.txt', import.meta.url))

const elvesFoods = data.split('\n').splitByItem('')

const sortedCaloriesSum = elvesFoods.map((x) => x.sum()).sortTyped().reverse()

console.log(sortedCaloriesSum[0], 'PART1')

console.log(take(3, sortedCaloriesSum).sum(), 'PART2')
