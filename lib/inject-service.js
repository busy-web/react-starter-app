/**
 * @module injectService
 *
 */
import * as Services from '@app/services';
import { objectT } from './types';
import { dasherize } from './string';

// define services
if (!window.__ASIC__) {
	// application services instance container
	window.__ASIC__ = {};

	// initialize services
	Object.keys(Services).forEach(key => {
		window.__ASIC__[normalizeKey(key)] = new Services[key]();
	});
}

export default function injectService(name, target=null) {
	// get service from global instance cache
	let service = window.__ASIC__[normalizeKey(name)];

	if (objectT(target)) {
		target[name] = objectT(service) ? service : null;
	}

	return service;
}

function normalizeKey(key) {
	return dasherize(key);
}
