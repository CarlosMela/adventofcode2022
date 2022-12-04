import '../util/lib.js'
import {readFile} from '../util/fileHelper.js'
import {A_Z, a_z} from '../util/constants.js'
import {splitArrayByLines} from '../util/arrayHelper.js'
import {intersection} from '../util/setHelper.js'

var data = await readFile(new URL('./input.txt', import.meta.url))

var part1 = data.split('\n')
    .map(rucksack => {
        return [rucksack.substring(0, rucksack.length / 2), rucksack.substring(rucksack.length / 2)]
    })
    .map(compartments => [new Set(compartments[0]), new Set(compartments[1])])
    .map(compartmentSets => intersection(compartmentSets[0], compartmentSets[1]))
    .map(commonTypesSet => [...commonTypesSet][0])
    .map(itemType => getPoints(itemType))
    .sum()

var part2 = splitArrayByLines(data.split('\n'), 3)
    .map(group => intersection(intersection(new Set(group[0]), new Set(group[1])), new Set(group[2])))
    .flatMap(badgeSet => [...badgeSet][0])
    .map(badge => getPoints(badge))
    .sum()

function getPoints(l) {
    var a = a_z.indexOf(l) >= 0 ? a_z.indexOf(l) + 1 : 0
    var b = A_Z.indexOf(l) >= 0 ? A_Z.indexOf(l) + 27 : 0
    return a + b
}

console.log(part1, 'PART1')

console.log(part2, 'PART2')
