/**
 * @module Utils
 *
 */
import { getreq, postreq, patchreq } from '@busyweb/data/api';
import { merge } from '@busyweb/object';

/***/
const API_URL = 'https://api-beta.busybusy.io';
const TYPES = {
	FIND: 'find',
	UPDATE: 'update',
	COMMIT: 'commit',
};

/**
 * Global Store for adding and retrieving models
 *
 */
export default class Store {
	modelRegistry = [];

	getHeaders() {
		return { 'Key-Authorization': '4fcabea881860e5db959df7b342c55f1e636e286558b2a7fd5e36312c1ca39a2' };
	}

	getDefaultParams() {
		return { _debug: true, _version: '3.2' };
	}

	buildUrl(modelType) {
		return `${API_URL}/${modelType}`;
	}

	find(modelType, query={}) {
		//get url
		const url = this.buildUrl(modelType);

		// add optional xhr settings
		const options = {
			headers: this.getHeaders(),
			context: this
		};

		// merge default props to the query obj.
		// This will also prevent the original query obj from being mangled
		query = merge(this.getDefaultParams(), query);

		return getreq(url, query, options)
			.then(data => handleSuccess(data, TYPES.FIND))
			.catch(err => handleError(err, TYPES.FIND));
	}

	save(model) {
		//get url
		const url = this.buildUrl(model.modelType);

		// add optional xhr settings
		const options = {
			headers: this.getHeaders(),
			context: this
		};

		let params = this.getDefaultParams();
		let type, promise;
		if (model.isNew) {
			type = TYPES.COMMIT;

			// get all params from model
			params = merge(params, model.serialize());

			// post model
			promise = postreq(url, params, options);
		} else {
			type = TYPES.UPDATE;

			// get changed params from model
			params = merge(params, model.serializeChanged());

			// post model
			promise = patchreq(url, params, options);
		}
		return promise
			.then(data => handleSuccess(data, type))
			.catch(err => handleError(err, type));
	}
}

function handleSuccess(payload, reqType) {
	if (payload.payload) {
		payload = payload.payload;
	}

	if (!payload.success) {
		handleError(payload, reqType);
	}

	return payload.data || [];
}

function handleError(payload, reqType) {
	if (payload.payload) {
		payload = payload.payload;
	}

	let { code, debug } = payload;
	let err = 'unknown error';

	if (debug && debug.errors) {
		err = `error [ ${debug.errors.join(' - ')} ]`;
	}

	if (debug && debug.warnings) {
		err = `warning [ ${debug.warnings.join(' - ')} ]`;
	}

	if (!debug && code) {
		err = `code [ ${code.join(' - ')} ]`;
	}

	throw new Error(`${reqType}: failed with ${err}`);
}
