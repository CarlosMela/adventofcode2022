import {prop} from 'ramda'

export const getNumbers = (str) => {
    return Array.from(str.matchAll(/\d+/g)).map(prop(0))
}
