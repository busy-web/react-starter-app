/**
 * @module Utils
 *
 */
import { assert } from './debug';
import { objectT, funcT } from './types';

/**
 * @public
 * @method eachProperty
 * @param value {object} the object to loop over
 * @param cb {function} the callback method to call each loop
 * @return {array} mapped data array
 */
export function eachProperty(value, cb, target=null) {
	assert("eachProperty() requires an object as the first param", objectT(value));
	assert("eachProperty() requires a function as the second param", funcT(cb));

	let map = [];
	Object.keys(value).forEach(key => {
		map.push(cb.call(target, value[key], key));
	});
	return map;
}

/**
 * merge props fromObj => toObj and fromObj will
 * override toObj props if they already exist.
 *
 * @public
 * @method merge
 * @param outObj {object}
 * @param inObj {object}
 * @return {object} outObj
 */
export function merge(toObj, fromObj) {
	eachProperty(fromObj, (val, key) => {
		toObj[key] = val;
	});
	return toObj;
}
