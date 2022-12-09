import {prop} from 'ramda'

export const getNumbers = str => Array.from(str.matchAll(/\d+/g)).map(prop(0))

export const isDiffCharacters = str => str.split('').reduce((acc, e, i, arr) => acc && (arr.indexOf(e, i + 1) < 0), true)
