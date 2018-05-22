/**
 * @module Containers.TimeEntry
 *
 */
import Record from '@busyweb/data/record';
import { FETCH_ACTIVE, CREATE, DELETE, fetchRequest } from '@busyweb/state/actions';

export const RECORD_TYPE = 'time-entry';

/**
 * `TimeEntry Actions`
 *
 */
export function fetchActiveTimeEntries(dispatch, start, end) {
	const query = {
		_lte: { start_time: end },
		_gte: { end_time: start },
		deleted_on: null
	};

	return fetchRequest(dispatch, RECORD_TYPE, query, (record) => {
		return {
			type: FETCH_ACTIVE,
			recordArray: record,
		};
	});
}

export const FILTER_OPEN = 'FILTER_OPEN';
export const FETCH_OPEN = 'FETCH_OPEN';
export function fetchOpenTimeEntry(dispatch, member_id) {
	const query = { member_id, end_time: null };

	return fetchRequest(dispatch, RECORD_TYPE, query, (record) => {
		return {
			type: FETCH_OPEN,
			record: record.firstRecord,
		};
	});
}


export function createTimeEntry(attrs) {
	const record = new Record({ type: RECORD_TYPE, attrs });

	return {
		type: CREATE,
		record
	};
}

export function deleteTimeEntry(id) {
	return {
		type: DELETE,
		id
	}
}


