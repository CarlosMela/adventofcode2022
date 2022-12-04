import '../util/lib.js'
import {readFile} from '../util/fileHelper.js'

var data = await readFile(new URL('./input.txt', import.meta.url))

var elfsFoods = data.split('\n').splitByItem('')

var sortedCaloriesSum = elfsFoods.map((x) => x.sum()).sortTyped().reverse()

console.log(sortedCaloriesSum[0], 'MAXCAL')

console.log(sortedCaloriesSum[0] +
    sortedCaloriesSum[1] + sortedCaloriesSum[2], 'SUM_3_MAXCAL')
