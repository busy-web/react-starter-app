/**
 * @module busyweb.Service
 *
 */
import { getGlobal } from './app-global';

/**
 * @class Service
 *
 */
export default class Service {

}

export function inject(name) {
	let loader = getGlobal('loader');
	return loader.injectInstance("services:" + name);
}
