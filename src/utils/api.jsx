/**
 * @module Utils
 *
 */
import { Promise } from 'rsvp';
import Query from './query';
import { eachProperty } from './object';
import { assert } from './debug';
import {
	definedT,
	objectT,
	arrayT,
	stringT,
	funcT,
	boolT
} from './types';

/***/
const TYPES = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE'
};

const DEFAULTS = {
	contentType: 'application/json; charset=utf-8',
	upload: false,
	headers: {},
};


const STATUS_CODES = {
	200: "OK",
	202: "Accepted",
	204: "No Content",

	300: "OK",
	301: "Moved Permanently",
	304: "OK",

	400: "Bad Request",
	401: "Unauthorized",
	403: "Forbidden",
	404: "Not Found",
	405: "Method Not Allowed",
	408: "Request Timeout",
	409: "Conflict",
	412: "Precondition Failed",
	413: "Payload Too Large",
	414: "URI Too Long",
	415: "Unsupported Media Type",

	500: "Internal Server Error",
	501: "Not Implemented",
	502: "Bad Gateway",
	503: "Service Unavailable",
	504: "Gateway Timeout",
	505: "HTTP Version Not Supported",
	507: "Insufficient Storage",
	508: "Loop Detected"
};

/**
 * API request util
 *
 * Provides simple interface to use JS native XMLHttpRequest
 */
export default {
	get(url, data={}, options={}) {
		assert("get() requires a url {string} as the first param", stringT(url));
		options.data = data;
		console.log('options', options);
		return request(url, TYPES.GET, options);
	},

	post(url, data={}, options={}) {
		assert("post() requires a url {string} as the first param", stringT(url));
		options.data = data;
		return request(url, TYPES.POST, options);
	},

	put(url, data={}, options={}) {
		assert("put() requires a url {string} as the first param", stringT(url));
		options.data = data;
		return request(url, TYPES.PUT, options);
	},

	patch(url, data={}, options={}) {
		assert("patch() requires a url {string} as the first param", stringT(url));
		options.data = data;
		return request(url, TYPES.PATCH, options);
	},

	delete(url, options={}) {
		assert("delete() requires a url {string} as the first param", stringT(url));
		return request(url, TYPES.DELETE, options);
	},

	send(opts={}) {
		assert("send() requires an object with a property `url` in it", stringT(opts.url));
		assert("opts `type` must be a string", !definedT(opts.type)	|| boolT(opts.type));
		return request(opts.url, opts.type, opts);
	}
};

function request(url, type=TYPES.GET, opts={}) {
	assert("request url must be a string", stringT(url));
	assert("request type must be a string", stringT(type));
	assert("request opts must be an object", objectT(opts));

	// set defaults for all opts not passed in
	opts = mergeDefaults(opts);

	console.log(opts);

	// throw an error on all opts that fail validation
	validateOpts(opts);

	// create new xhr request
	const xhr = new XMLHttpRequest();

	// open request
	xhr.open(type, url);

	// set contentType from opts or use default contentType
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //opts.contentType);
	//xhr.setRequestHeader('accept', 'application/vnd.api+json');
	//xhr.setRequestHeader('accept-encoding', 'gzip, deflate, br');
	//xhr.setRequestHeader('accept-language', 'en-US,en;q=0.9,es-ES;q=0.8,es;q=0.7,en-AU;q=0.6,es-MX;q=0.5,de-DE;q=0.4,de;q=0.3,da;q=0.2');
	//xhr.withCredentials = true;

	if (objectT(opts.headers)) {
		eachProperty(opts.headers, (val, key) => {
			if (stringT(val)) {
				xhr.setRequestHeader(key, val);
			}
		});
	}

	if (stringT(opts.mimeType)) {
		xhr.overrideMimeType(opts.mimeType);
	}

	// set the context for this call
	opts.context = objectT(opts.context) ? opts.context : null;

	// create getter params for GET requests
	const body = setupBody(opts);
	console.log('send data', body);

	// return a promise object
	return new Promise((resolve, reject) => {
		let eventTarget = xhr;
		if (opts.upload) {
			eventTarget = xhr.upload;
		}

		// special event listeners
		eventTarget.addEventListener("progress", (...args) => funcT(opts.progress) && opts.progress.apply(opts.context, args));
		eventTarget.addEventListener("abort", (...args) => funcT(opts.abort) && opts.abort.apply(opts.context, args));
		eventTarget.addEventListener("timeout", () => xhrError({ status: 408, statusText: STATUS_CODES[408] }, opts, reject));

		// standard event listeners
		eventTarget.addEventListener("load", () => xhrSuccess(xhr, opts, resolve, reject));
		eventTarget.addEventListener("error", () => xhrError(xhr, opts, reject));

		//xhr.onreadystatechange = () => onSuccess(xhr, opts, resolve, reject);

		xhr.send(body);
	});
}

function xhrSuccess(xhr, opts, resolve, reject) {
	console.log(xhr.readyState, xhr.status);
	if (xhr.readyState === XMLHttpRequest.DONE) {
		if (xhr.status === 200 || xhr.status === 300 || xhr.status === 304) {
			let payload = xhr.responseText;
			if (xhr.responseType === 'json' && stringT(payload)) {
				payload = JSON.parse(payload);
			}

			// call success callback if it was provided
			if (funcT(opts.success)) {
				opts.success.call(opts.context, payload, xhr.statusText, xhr);
			}

			// resolve promise
			resolve({ payload, xhr });
		} else {
			xhrError(xhr, opts, reject);
		}

		if (funcT(opts.complete)) {
			opts.complete.apply(opts.context, args);
		}
	}
}

function xhrError(xhr, opts, reject) {
	if (funcT(opts.error)) {
		opts.error.call(opts.context, xhr.statusText, xhr);
	}
	reject({ error: xhr.statusText, xhr });
}

function setupBody(opts) {
	let params = null;
	if (objectT(opts.data)) {
		if (window.FormData && opts.data instanceof FormData) {
			params = opts.data;
		} else if(window.Blob && opts.data instanceof Blob) {
			params = opts.data;
		} else if (window.URLSearchParams && opts.data instanceof URLSearchParams) {
			params = opts.data;
		} else if (window.ReadableStream && opts.data instanceof ReadableStream) {
			params = opts.data;
		} else if (window.USVString && opts.data instanceof USVString) {
			params = opts.data;
		}  else if (window.BufferSource && opts.data instanceof BufferSource) {
			params = opts.data;
		} else {
			params = opts.data; //new URLSearchParams(opts.data);
		}
	}
	return params;
}

function mergeDefaults(opts) {
	let newOpts = {};
	eachProperty(opts, (val, key) => {
		newOpts[key] = val;
	});

	eachProperty(DEFAULTS, (val, key) => {
		if (!definedT(newOpts[key])) {
			newOpts[key] = val;
		}
	});
	return newOpts;
}

function validateOpts(opts) {
	//defined booleans
	assert("option `upload` must be a boolean",	!definedT(opts.upload) || boolT(opts.upload));

	// defined strings
	assert("option `contentType` must be a string",	!definedT(opts.contentType)	|| stringT(opts.contentType));
	assert("option `mimeType` must be a string",		!definedT(opts.mimeType)		|| stringT(opts.mimeType));

	// defined objects
	assert("option `headers` must be an object", !definedT(opts.headers)	|| objectT(opts.headers));
	assert("option `context` must be an object", !definedT(opts.context)	|| objectT(opts.context));
	assert("option `data` must be an object",		 !definedT(opts.data)			|| objectT(opts.data));

	// defined functions
	assert("option `progress` must be an function", !definedT(opts.progress)	|| funcT(opts.progress));
	assert("option `complete` must be an function", !definedT(opts.complete)	|| funcT(opts.complete));
	assert("option `success` must be an function",	!definedT(opts.success)		|| funcT(opts.success));
	assert("option `abort` must be an function",		!definedT(opts.abort)			|| funcT(opts.abort));
	assert("option `error` must be an function",		!definedT(opts.error)			|| funcT(opts.error));
}
