/**
 * @module Utils
 *
 */
import { cast, arrayT, objectT, stringT } from '@busyweb/types';
import { assert } from '@busyweb/debug';

export default {

	/**
	 * Takes an object and converts it to query string url params
	 *
	 * @public
	 * @method stringify
	 * @param query {object}
	 * @return {string}
	 */
	stringify(query) {
		assert("stringify() requires a query object as the only param", objectT(query));

		let queryStr = '';
		Object.keys(query).forEach(key => {
			let value = query[key];
			if (value !== undefined) {
				if (arrayT(value)) {
					value.forEach(val => queryStr += `&${key}[]=${val}`);
				} else if (objectT(value)) {
					let subStr = this.stringify(value);
					queryStr += '&' + subStr.replace(/^([^=]*)/, key + '[$1]').replace(/&([^=]*)/g, '&' + key + '[$1]');
				} else {
					if (value === null) {
						value = '';
					}
					queryStr += `&${key}=${value}`;
				}
			}
		});
		return queryStr.replace(/^&/, '');
	},

	/**
	 * Takes an query string and converts it to an object
	 *
	 * @public
	 * @method parse
	 * @param query {string}
	 * @return {object}
	 */
	parse(query) {
		assert("parse() requires a query string as the only param", stringT(query));

		let data = {};
		if (query.length) {
			const params = query.split('&');
			params.forEach(item => {
				const [ key, value ] = item.split('=');
				addQueryStringPair(data, key, value);
			});
		}
		return data;
	}
}


/**
 * add properties to an object
 *
 * @private
 * @method addQueryStringPair
 * @param params {object}
 * @param key {string}
 * @param value {mixed}
 * @return {void}
 */
function addQueryStringPair(params, key, value) {
	if (/\[.+\]/.test(key)) { // parse type: `key[subkey]=value`
		let [ normalizeKey, subKey ] = key.split('[');
		subKey = subKey.split(']').join('');
		let obj = params[normalizeKey] || {};

		// NOTE:
		// for keys formatted like `key[subkey][]=value`
		// the key will be parsed correctly in that
		// at this part of the code we will have `subkey[]=value`
		// therefore recursively calling addQueryStringPair will parse
		// this in the following `else if` statment
		addQueryStringPair(obj, subKey, value);

		// after recursively calling addQueryStringPair
		// then the new obj can be added to the original params
		set(params, normalizeKey, obj);
	} else if (/\[\]$/.test(key)) { // parse type: `key[]=value`
		let normalizeKey = key.substring(key.length - 2, 0);
		let arr = params[normalizeKey] || [];
		arr.push(value);
		addQueryStringPair(params, normalizeKey, arr);
	} else {
		// normal key pair just add to params
		params[key] = typeCast(value);
	}
}
