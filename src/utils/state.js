/**
 * @module Utils
 *
 */
import features from '@config/features';
import Adapter from '@app/utils/adapter';
import { getAuth } from '@app/utils/auth';
import { assert } from '@app/utils/debug';

function Application() {
	this.features = features;
	this.adapter = new Adapter();
	this.auth = getAuth();

	this.isAuthenticated = this.auth.isAuthenticated;
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
