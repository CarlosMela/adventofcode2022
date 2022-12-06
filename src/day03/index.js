import '../util/lib.js'
import {readFile} from '../util/fileHelper.js'
import {A_Z, a_z} from '../util/constants.js'
import {splitArrayByLines} from '../util/arrayHelper.js'
import {intersection} from '../util/setHelper.js'

const data = await readFile(new URL('./input.txt', import.meta.url))

const priorityScoreCommonItemTypes = data.split('\n')
    .map(rucksack => [rucksack.substring(0, rucksack.length / 2), rucksack.substring(rucksack.length / 2)])
    .map(compartments => [new Set(compartments[0]), new Set(compartments[1])])
    .map(compartmentSets => intersection(compartmentSets[0], compartmentSets[1]))
    .map(commonTypesSet => [...commonTypesSet][0])
    .map(itemType => getPriorityPoints(itemType))
    .sum()

const priorityScoreCommonItemTypesInGroups = splitArrayByLines(data.split('\n'), 3)
    .map(group => intersection(intersection(new Set(group[0]), new Set(group[1])), new Set(group[2])))
    .flatMap(badgeSet => [...badgeSet][0])
    .map(badge => getPriorityPoints(badge))
    .sum()

function getPriorityPoints(itemType) {
    const a = a_z.indexOf(itemType) >= 0 ? a_z.indexOf(itemType) + 1 : 0
    const b = A_Z.indexOf(itemType) >= 0 ? (A_Z.indexOf(itemType) + 1) + 26 : 0
    return a + b
}

console.log(priorityScoreCommonItemTypes, 'PART1')

console.log(priorityScoreCommonItemTypesInGroups, 'PART2')
