/**
 * @module Utils
 *
 */
//import { Promise } from 'rsvp';
import { eachProperty } from './../object';
import { assert } from './../debug';
import {
	definedT,
	objectT,
	stringT,
	funcT,
	boolT
} from './../types';

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
	responseType: 'json',
	withCredentials: false
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
	508: "Loop Detected",

	450: "Unknown Error"
};

/**
 * API request util
 *
 * Provides simple interface to use JS native XMLHttpRequest
 */
export function getreq(url, data={}, options={}) {
	assert("get() requires a url {string} as the first param", stringT(url));
	options.data = data;
	return request(url, TYPES.GET, options);
}

export function postreq(url, data={}, options={}) {
	assert("post() requires a url {string} as the first param", stringT(url));
	options.data = data;
	return request(url, TYPES.POST, options);
}

export function putreq(url, data={}, options={}) {
	assert("put() requires a url {string} as the first param", stringT(url));
	options.data = data;
	return request(url, TYPES.PUT, options);
}

export function patchreq(url, data={}, options={}) {
	assert("patch() requires a url {string} as the first param", stringT(url));
	options.data = data;
	return request(url, TYPES.PATCH, options);
}

export function deletereq(url, options={}) {
	assert("delete() requires a url {string} as the first param", stringT(url));
	return request(url, TYPES.DELETE, options);
}

export function sendreq(opts={}) {
	assert("send() requires an object with a property `url` in it", stringT(opts.url));
	assert("opts `type` must be a string", !definedT(opts.type)	|| stringT(opts.type));
	return request(opts.url, opts.type, opts);
}

export default { getreq, postreq, putreq, patchreq, deletereq };

function request(url, type=TYPES.GET, opts={}) {
	assert("request url must be a string", stringT(url));
	assert("request type must be a string", stringT(type));
	assert("request opts must be an object", objectT(opts));

	// set defaults for all opts not passed in
	opts = mergeDefaults(opts);

	// throw an error on all opts that fail validation
	validateOpts(opts);

	// create new xhr request
	const xhr = new XMLHttpRequest();

	// set the context for this call
	opts.context = objectT(opts.context) ? opts.context : null;

	// create getter params for GET requests
	let body = setupBody(opts);

	if (stringT(body) && body.length) {
		if (/=null/.test(body)) {
			body = body.replace(/=null/g, '=');
		}
		url = url + '?' + body;
		body = null;
	}

	// open request
	xhr.open(type, url, true);

	// cross origin send cookies
	xhr.withCredentials = opts.withCredentials;

	// set the requested response type
	xhr.responseType = opts.responseType;

	// override mime type
	if (stringT(opts.mimeType)) {
		xhr.overrideMimeType(opts.mimeType);
	}

	// set contentType from opts or use default contentType
	xhr.setRequestHeader('Content-Type', opts.contentType);

	// set optional headers
	if (objectT(opts.headers)) {
		eachProperty(opts.headers, (val, key) => {
			if (stringT(val)) {
				xhr.setRequestHeader(key, val);
			}
		});
	}

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

		//console.log('send', body);
		xhr.send(body);
	});
}

function xhrSuccess(xhr, opts, resolve, reject) {
	if (xhr.readyState === XMLHttpRequest.DONE) {
		if (xhr.status === 200 || xhr.status === 300 || xhr.status === 304) {
			// call success callback if it was provided
			if (funcT(opts.success)) {
				opts.success.call(opts.context, xhr.resolve, xhr.status, xhr);
			}

			// resolve promise
			resolve({ payload: xhr.response, xhr });
		} else {
			// handle error
			xhrError(xhr, opts, reject);
		}

		// always call on complete
		if (funcT(opts.complete)) {
			opts.complete.apply(opts.context);
		}
	}
}

function xhrError(xhr, opts, reject) {
	if (funcT(opts.error)) {
		opts.error.call(opts.context, xhr.statusText, xhr);
	}
	reject({ error: generateErrorCode(xhr.status), xhr });
}

function generateErrorCode(status=450) {
	let msg = STATUS_CODES[status];
	if (!msg || msg.length === 0) {
		status = 450;
		msg = STATUS_CODES[status];
	}
	return `${status} ${msg}`;
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
		} else if (window.USVString && opts.data instanceof window.USVString) {
			params = opts.data;
		}  else if (window.BufferSource && opts.data instanceof window.BufferSource) {
			params = opts.data;
		} else {
			params = new URLSearchParams(opts.data).toString();
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
	assert("option `withCredentials` must be a boolean",	!definedT(opts.withCredentials) || boolT(opts.withCredentials));
	assert("option `upload` must be a boolean",						!definedT(opts.upload)					|| boolT(opts.upload));

	// defined strings
	assert("option `contentType` must be a string",		!definedT(opts.contentType)		|| stringT(opts.contentType));
	assert("option `responseType` must be a string",	!definedT(opts.responseType)	|| stringT(opts.responseType));
	assert("option `mimeType` must be a string",			!definedT(opts.mimeType)			|| stringT(opts.mimeType));

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
