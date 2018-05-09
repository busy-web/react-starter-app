/**
 * @module Utils
 *
 */
import config from '@config/environment';
import { getreq, postreq, patchreq } from './api';
import { getAuth } from './auth';
import { dasherize } from './string';
import RecordArray from './record-array';

/***/
const TYPES = {
	FIND: 'find',
	UPDATE: 'update',
	COMMIT: 'commit',
};

/**
 * Global Store for adding and retrieving models
 *
 */
export default class Adapter {
	recordRegistry = [];

	getHeaders() {
		let auth = getAuth();
		let headers = {};
		if (auth.isAuthenticated) {
			headers['Key-Authorization'] = auth.token;
		}
		return headers;
	}

	getDefaultParams() {
		return { _debug: true, _version: '3.2' };
	}

	buildUrl(recordType) {
		return `${config.api.url}/${dasherize(recordType)}`;
	}

	find(recordType, query={}) {
		//get url
		const url = this.buildUrl(recordType);

		// add optional xhr settings
		const options = {
			headers: this.getHeaders(),
			context: this
		};

		// merge default props to the query obj.
		// This will also prevent the original query obj from being mangled
		query = Object.assign({}, this.getDefaultParams(), query);

		return getreq(url, query, options)
			.then(data => handleSuccess(recordType, data, TYPES.FIND))
			.catch(err => Promise.reject({ error: handleError(recordType, err, TYPES.FIND) }));
	}

	save(record) {
		const recordType = record.recordType;

		//get url
		const url = this.buildUrl(recordType);

		// add optional xhr settings
		const options = {
			headers: this.getHeaders(),
			context: this
		};

		let params = this.getDefaultParams();
		let type, promise;
		if (record.isNew) {
			type = TYPES.COMMIT;

			// get all params from record
			params = Object.assign({}, params, record.toJSON());

			// post record
			promise = postreq(url, params, options);
		} else {
			type = TYPES.UPDATE;

			// get changed params from model
			params = Object.assign({}, params, record.changedAttributes());

			// post model
			promise = patchreq(url, params, options);
		}

		return promise
			.then(data => handleSuccess(recordType, data, type))
			.catch(err => Promise.reject({ error: handleError(recordType, err, type) }));
	}
}

/**
 * generates a standardized model state result
 * for actions
 *
 * @public
 * @method modelState
 */
function normalizeRecords(recordType, payload) {
	let {
		data,
		next, prev,
		returned_rows, total_rows,
		public_key
	} = payload;

	return new RecordArray(recordType, data, { next, prev, returned_rows, total_rows, token: public_key });
}

function handleSuccess(recordType, payload, reqType) {
	if (payload.payload) {
		payload = payload.payload;
	}

	if (!payload.success) {
		return Promise.reject(handleError(recordType, payload, reqType));
	}

	return normalizeRecords(recordType, payload);
}

function handleError(recordType, payload, reqType) {
	if (payload.payload) {
		payload = payload.payload;
	}

	let { code, debug } = payload;
	let err = 'unknown error';

	if (debug && debug.errors) {
		err = `error [ ${debug.errors.join(' - ')} ]`;
	} else if (debug && debug.warnings) {
		err = `warning [ ${debug.warnings.join(' - ')} ]`;
	} else if (!debug && code) {
		err = `code [ ${code.join(' - ')} ]`;
	} else if (payload.error) {
		err = `error [ ${payload.error} ]`;
	}

	let message = `${reqType} ${recordType}: failed with ${err}`;
	//window.console.warn(message);

	return message;
}
