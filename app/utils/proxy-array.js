/**
 * @module Utils
 *
 */
import { assert, funcNumArgs } from '@busyweb/debug';
import { arrayT, funcT, stringT } from '@busyweb/types';

/**
 * @class ProxyArray
 *
 */
export default class ProxyArray {
	constructor(list=[]) {
		assert("new ProxyArray() must include an array as the first param", arrayT(list));

		// history tracker
		this.__hist__ = [];

		// save the list
		this.content = list;

		this[Symbol.isConcatSpreadable] = true;
	}

	get content() {
		return this.__list__.slice(0);
	}

	set content(list) {
		// keep track of history for up to 100 changes
		updateHistory(list, this.__hist__);

		// define getter for arr keys
		//list.forEach((val, key) => this.__defineGetter__(key, () => this.__list__[key]));

		// save list
		this.__list__ = list;
	}

	get length() {
		return this.content.length;
	}

	[Symbol.iterator]() { return this.content.values() }

	static get [Symbol.species] () { return Array }

	objectAt(idx) {
		return this.content[idx];
	}

	forEach(callback, target=null) {
		assert("callback must be a function", funcT(callback));
		return this.content.forEach(callback, target);
	}

	map(callback, target=null) {
		assert("callback must be a function", funcT(callback));
		return this.content.map(callback, target);
	}

	find(callback, target=null) {
		assert("callback must be a function", funcT(callback));
		return this.content.find(callback, target);
	}

	filter(callback, target=null) {
		assert("callback must be a function", funcT(callback));
		return this.content.find(callback, target);
	}

	push(value) {
		// enforce 1 argument is passed in
		funcNumArgs(1, arguments);

		// get list
		let list = this.content;
		list.push(value);
		this.content = list;
		return this;
	}

	pop() {
		let list = this.content;
		let value = list.pop();
		this.content = list;
		return value;
	}

	mapBy(key) {
		funcNumArgs(1, arguments);
		assert("mapBy(key) takes a string as the only argument", stringT(key));
		return this.map(v => v[key]);
	}

	findBy(key, value) {
		funcNumArgs(2, arguments);
		assert("findBy(key, value) takes a string as the only argument", stringT(key));
		return this.find(v => v[key] === value);
	}

	filterBy(key, value) {
		funcNumArgs(2, arguments);
		assert("filterBy(key, value) takes a string as the only argument", stringT(key));
		return this.find(v => v[key] === value);
	}

	valueOf() {
		return this.content;
	}

	toArray() {
		return this.valueOf();
	}

	toString() {
		return JSON.stringify(this.content);
	}
}

function updateHistory(list, history) {
	history = history.slice(0);
	let len = history.length;
	history[len] = list;
	if (len > 100) {
		history = history.slice(1);
	}
	return history;
}
