/**
 * @module Utils
 *
 */
import { underscore } from './string';
import Time from './time';
import state from './state';
import RecordArray from './record-array';

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
 */
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

