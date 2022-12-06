import {prop} from 'ramda'

export const getNumbers = (str) => {
    return Array.from(str.matchAll(/\d+/g)).map(prop(0))
}

export const isDiffCharacters = (str) => {
    return str.split('')
        .reduce((acc, e, i, arr) => acc && (arr.indexOf(e, i + 1) < 0), true)
}

