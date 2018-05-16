/**
 * @module Utils
 *
 */
import { stringT, objectT } from '@busyweb/types';

export function getAuth() {
	let auth = localStorage.getItem('auth-member');
	if (stringT(auth)) {
		let { id, token } = JSON.parse(auth);
		return { id, token, isAuthenticated: true };
	}
	return { isAuthenticated: false };
}

export function setAuth(hash) {
	if (objectT(hash) && stringT(hash.id) && stringT(hash.token)) {
		localStorage.setItem('auth-member', JSON.stringify(hash));
		return true;
	}
	return false;
}

export function deleteAuth() {
	localStorage.removeItem('auth-member');
}
