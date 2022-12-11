import {prop} from 'ramda'

export const getNumbers = str => Array.from(str.matchAll(/[-]{0,1}[\d]*[.]{0,1}[\d]+/g)).map(prop(0))

export const isDiffCharacters = str => str.split('').reduce((acc, e, i, arr) => acc && (arr.indexOf(e, i + 1) < 0), true)

export const getStrings = str => Array.from(str.matchAll(/(\w+)|\W/g)).map(prop(0))
