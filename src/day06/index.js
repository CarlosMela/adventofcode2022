import '../util/lib.js'
import {isDiffCharacters} from '../util/stringHelper.js'
import {readFile} from '../util/fileHelper.js'

const data = await readFile(new URL('./input.txt', import.meta.url))

const stringInput = data
    .split('\n')[0]

function findMarkerIndex(markerLength) {
    let markerIndex = -1
    for (let i = 0; i < stringInput.length; i++) {
        if (isDiffCharacters(stringInput.substring(i, i + markerLength))) {
            if (markerIndex < 0) {
                markerIndex = i + markerLength
            }
        }
    }
    return markerIndex
}

console.log(findMarkerIndex(4), 'PART1')

console.log(findMarkerIndex(14), 'PART2')
