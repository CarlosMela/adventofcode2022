import {curry} from 'ramda'

export const splitArrayByItem = (array, item) => {
    return array.reduce((acc, element) => {
        if (element === item) {
            acc.push([])
            return acc
        }
        acc[acc.length - 1].push(element)
        return acc
    }, [[]])
}

export const splitArrayByLines = (array, lines) => {
    return array.reduce((acc, element, currentIndex) => {
        if (currentIndex % lines === 0) {
            acc.push([element])
            return acc
        }
        acc[acc.length - 1].push(element)
        return acc
    }, [])
}

export const parseIntArray = (array) => {
    return array.map(n => parseInt(n))
}

export const sortArray = (array) => {
    if (!array.length) {
        return array
    }
    if (typeof array[0] === 'number') {
        return array.sort((a, b) => a - b)
    }
    return array.sort()
}

export const splitEveryWithSkip = curry((every, skip, array) => {
    const result = []
    let start = 0
    let end = every
    while (start < array.length) {
        result.push(array.slice(start, end))
        start = end + skip
        end = start + every
    }
    return result
})
