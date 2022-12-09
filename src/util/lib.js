import {sum} from 'ramda'
import {parseIntArray, sortArray, splitArrayByItem} from './arrayHelper.js'
import {getNumbers} from './stringHelper.js'

Array.prototype.max = function () {
    return Math.max.apply(this, this)
}

Array.prototype.min = function () {
    return Math.min.apply(this, this)
}

Array.prototype.sum = function () {
    return sum(this)
}

Array.prototype.splitByItem = function (item) {
    return splitArrayByItem(this, item)
}

Array.prototype.parseInt = function (item) {
    return parseIntArray(this, item)
}

Array.prototype.sortTyped = function () {
    return sortArray(this)
}

Array.prototype.pushUnique = function (item) {
    if (this.indexOf(item) === -1) {
        this.push(item)
    }
}

Object.prototype.keys = function () {
    return Object.keys(this)
}

Object.prototype.string = function () {
    return JSON.stringify(this)
}

String.prototype.numbers = function () {
    return getNumbers(this)
}
