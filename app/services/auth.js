/**
 * @module Utils
 *
 */
import { stringT, objectT } from '@busyweb/types';
import Service from '@busyweb/service';

const AUTH_KEY = 'auth-member';

export default class Auth extends Service {
	get id() {
		return this.auth && this.auth.id;
	}

	get token() {
		return this.auth && this.auth.token;
	}

	get isAuthenticated() {
		return this.auth && this.auth.isAuthenticated;
	}

	get auth() {
		return getAuth();
	}

	set auth(hash) {
		setAuth(hash);
		return this;
	}

	deleteAuth() {
		deleteAuth();
		return this;
	}
}

function getAuth() {
	let auth = localStorage.getItem(AUTH_KEY);
	if (stringT(auth)) {
		let { id, token } = JSON.parse(auth);
		return { id, token, isAuthenticated: true };
	}
	return { isAuthenticated: false };
}

function setAuth(hash) {
	if (objectT(hash) && stringT(hash.id) && stringT(hash.token)) {
		localStorage.setItem(AUTH_KEY, JSON.stringify(hash));
		return true;
	}
	return false;
}

function deleteAuth() {
	localStorage.removeItem(AUTH_KEY);
}
