/**
 * @module Utils
 *
 */
//import { underscore } from './string';
//import Time from './time';
import state from './state';
//import RecordArray from './record-array';

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
	dispatch(requestPending());

	return state.adapter.find(recordType, params)
		.then(res => dispatch(success(res)))
		.catch(err => dispatch(requestFailed(err)));
}

/**
export function findRecord(recordType, params, dispatch, filter) {
	normalizeState(dispatch, { type: 'find-pending', recordType, pending: true, filter });

	return state.adapter.find(recordType, params)
		.then(records => normalizeState(dispatch, { type: 'find-success', recordType, records, filter }))
		.catch(err => normalizeState(dispatch, { type: 'find-error', recordType, error: err, filter }));
}


function normalize(str) {
	return underscore(str).toUpperCase();
}

/**
 * Helper actions that are generric to all record actions
<]
export function generateType(type, recordType) {
	return `${normalize(type)}_${normalize(recordType)}`;
}

export function normalizeState(dispatch, { type=null, recordType, records=null, pending=false, error=null, loadRecords=false, filter="FILTER_ALL", syncstamp=Time.unix }) {
	if (!records) {
		records = new RecordArray(recordType, []);
	}

	let state = { records, error, pending, loadRecords, filter, syncstamp };
	if (type && dispatch) {
		state.type = generateType(type, recordType);
		return dispatch(state);
	} else {
		return state;
	}
}
 */
