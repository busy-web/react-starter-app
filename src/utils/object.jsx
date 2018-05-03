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
