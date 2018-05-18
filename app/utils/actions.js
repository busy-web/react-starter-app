/**
 * @module Utils
 *
 */
import injectService from '@busyweb/inject-service';

/**
 * genneric action types
 *
 */
export const EMPTY = 'EMPTY';

export const FETCH_ALL = 'FETCH_ALL';
export const FETCH_ACTIVE = 'FETCH_ACTIVE';
export const FETCH_ARCHIVED = 'FETCH_ARCHIVED';

export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const ARCHIVE = 'ARCHIVE';
export const DELETE = 'DELETE';


export const REQUEST_PENDING = 'REQUEST_PENDING';
function requestPending() {
	return {
		type: REQUEST_PENDING
	};
}

export const REQUEST_FAILED = 'REQUEST_FAILED';
function requestFailed(error) {
	return {
		type: REQUEST_FAILED,
		record: { error }
	};
}

export function fetchRequest(dispatch, recordType, params, success) {
	// dispatch request pending
	dispatch(requestPending());

	// get store
	const store = injectService('store');

	// find records
	return store.find(recordType, params)
		.then(res => dispatch(success(res))) // dispatch success
		.catch(err => dispatch(requestFailed(err))); // dispatch error
}
