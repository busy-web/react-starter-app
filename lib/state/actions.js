/**
 * @module Utils
 *
 */
import injectService from './../inject-service';
import { underscore } from './../string';

/**
 * genneric action types
 *
 */
export const EMPTY = 'EMPTY';

export const FETCH = 'FETCH';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const ARCHIVE = 'ARCHIVE';
export const DELETE = 'DELETE';
export const PENDING = 'PENDING';

export const FETCH_ALL = 'FETCH_ALL';
export const FETCH_ACTIVE = 'FETCH_ACTIVE';
export const FETCH_ARCHIVED = 'FETCH_ARCHIVED';


export const REQUEST_PENDING = 'REQUEST_PENDING';
// function requestPending() {
//   return {
//     type: REQUEST_PENDING
//   };
// }
function requestFetch(type, records) {
	return {
		type: `${FETCH}_${type}`,
		records
	};
}

export const FAILED = 'FAILED';
function requestFailed(type, error) {
	return {
		type: `${FAILED}_${type}`,
		error: { message: error }
	};
}

export function fetchRequest(recordType, params) {
	// get store
	const store = injectService('store');
	const normalizedName = underscore(recordType).toUpperCase();

	return function(dispatch) {
		// find records
		return store.find(recordType, params)
			.then(res => dispatch(requestFetch(normalizedName, res)))
			.catch(err => dispatch(requestFailed(normalizedName, err)));
	}
}
