/**
 * @module Utils
 *
 */
import { definedT } from '@busyweb/types';
//import features from '@config/features';
//import config from '@config/environment';
import Adapter from '@busyweb/data/adapter';
import { assert } from '@busyweb/debug';
import { getAuth } from '@app/services/auth';

/**
 * Global application support for
 * services and configuration
 *
 * @class Application
 */
class Application {

	constructor() {
		this.features = __FEATURES__;
		this.config = __APP__;

		// get auth info
		this.auth = getAuth();

		this.adapter = new Adapter(this);
	}

	get isAuthenticated() {
		return this.auth && this.auth.isAuthenticated;
	}

	injectService(name) {
		assert(`The service was not found [${name}]`, definedT(this[name]));
		return this[name];
	}
}

const APPS = "__apps__";
window.__isAppInit = false;

function setupState() {
	assert("APP State was initialized more than once", !window.__isAppInit);
	const app = new Application();
	window[APPS] = app;
	window.__isAppInit = true;
}

function stateManager() {
	if (!window[APPS]) {
		setupState();
	}
	return window[APPS];
}

export default stateManager();
