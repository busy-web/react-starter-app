/**
 * @module busyweb.AppGlobal
 *
 */

const APP_GLOBAL = '__wai__';
/**
 * Global App instance
 *
 */
window[APP_GLOBAL] = {};

export function setGlobal(name, instance) {
	window[APP_GLOBAL][name] = instance;
}

export function getGlobal(name) {
	return window[APP_GLOBAL][name];
}

