/**
 * @module Utils
 *
 */
import { assert } from './debug';
import { stringT } from './types';

export function underscore(value) {
	assert("underscore() requires a string as the first param", stringT(value));
	return value.replace(/([-_ A-Z])/g, '_').toLowerCase().replace(/^_/, '');
}

export function dasherize(value) {
	assert("dasherize() requires a string as the first param", stringT(value));
	return value.replace(/([-_ A-Z])/g, '-').toLowerCase().replace(/^-/, '');
}

export function camelize(value) {
	assert("camelize() requires a string as the first param", stringT(value));
	return value.replace(/([-_ ].)/g, (letter) => letter.slice(1).toUpperCase());
}
