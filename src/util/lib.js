import {sum} from "ramda";
import {splitArrayByItem, parseIntArray, sortArray} from "./arrayHelper.js";

Array.prototype.max = function () {
    return Math.max.apply(this, this);
};

Array.prototype.sum = function () {
    return sum(this);
};

Array.prototype.splitByItem = function (item) {
    return splitArrayByItem(this, item);
};

Array.prototype.parseInt = function (item) {
    return parseIntArray(this, item);
};

Array.prototype.sortTyped = function () {
    return sortArray(this);
};

Object.prototype.keys = function () {
    return Object.keys(this);
};
