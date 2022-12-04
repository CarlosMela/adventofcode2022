import '../util/lib.js'
import {readFile} from '../util/fileHelper.js'
import {take} from 'ramda'

var data = await readFile(new URL('./input.txt', import.meta.url))

var elfsFoods = data.split('\n').splitByItem('')

var sortedCaloriesSum = elfsFoods.map((x) => x.sum()).sortTyped().reverse()

console.log(sortedCaloriesSum[0], 'MAXCAL')

console.log(take(3, sortedCaloriesSum).sum(), 'SUM_3_MAXCAL')
