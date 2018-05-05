/**
 * @module ModelActions
 *
 */
import CryptoJS from 'crypto-js';
import { sendreq } from '@app/utils/api';
import { stringT } from '@app/utils/types';


const API_URL = 'https://api-beta.busybusy.io/member';

export const IS_AUTHENTICATED = "IS_AUTHENTICATED";
export function isAuthenticated() {
	let hash = getAuthHash();
	return {
		type: IS_AUTHENTICATED,
		state: hash
	};
}

export const REQUEST_AUTH = "REQUEST_AUTH";
export function requestAuth(username) {
	return { type: REQUEST_AUTH, username };
}

export const RECEIVE_AUTH = "RECEIVE_AUTH";
export function receiveAuth(username, auth) {
	return {
		type: RECEIVE_AUTH,
		username,
		state: auth,
		receivedAt: Date.now()
	};
}

export function fetchAuth(username, password, dispatch) {
	let pword = CryptoJS.SHA256(password).toString();

	// call dispatch
	dispatch(requestAuth(username));

	// send request
	const url = API_URL;
	const type = "GET";
	const headers = { Authorization: 'Basic ' + btoa(`${username}:${pword}`) };
	const data = { username, _version: '3.2', _debug: true };

	// send request to get auth member
	return sendreq({ url, type, headers, data })
		.then(data => {
			let { payload } = data;
			if (payload.success) {
				let member = payload.data[0];
				if (member) {
					saveAuthHash(member.id, payload.public_key);
					dispatch(receiveAuth(username, getAuthHash()));
				}
			}
			//{ error: "Member not found" };
		})
		.catch(err => {
			throw new Error(err);
		});
}

export function getAuthHash() {
	let auth = localStorage.getItem('auth-member');
	if (stringT(auth)) {
		let { id, token } = JSON.parse(auth);
		return { id, token, isAuthenticated: true };
	}
	return { isAuthenticated: false };
}

export const REMOVE_AUTH = "REMOVE_AUTH";
export function removeAuthHash() {
	localStorage.removeItem('auth-member');
	return { type: REMOVE_AUTH, state: { isAuthenticated: false } };
}

function saveAuthHash(id, token) {
	if (stringT(id) && stringT(token)) {
		localStorage.setItem('auth-member', JSON.stringify({ id, token }));
		return true;
	}
	return false;
}
