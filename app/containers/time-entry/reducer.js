/**
 * @module Containers.TimeEntry
 *
 */
import { EMPTY, CREATE, DELETE } from '@app/utils/actions';
import { FETCH_OPEN } from './actions';

const initialState = {
	type: EMPTY,
	records: [],
	openRecord: null,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_OPEN:
			return Object.assign({}, state, {
				type: action.type,
				openRecord: action.record
			});

		case CREATE:
			return Object.assign({}, state, {
				type: action.type,
				openRecord: action.record
			});

		case DELETE:
			return removeItem(state, action.id);

		default:
			return state;
	}
}

function removeItem(state, id) {
	let records = state.records.slice(0);
	records.deleted(id);
	return records;
}
