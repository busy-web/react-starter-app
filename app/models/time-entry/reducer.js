/**
 * @module Containers.TimeEntry
 *
 */
import { EMPTY, CREATE, DELETE, FETCH_ACTIVE, REQUEST_PENDING } from '@app/utils/actions';
import { FILTER_OPEN, FETCH_OPEN } from './actions';

const initialState = {
	type: EMPTY,
	records: [],
	//openRecord: null,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_ACTIVE:
			return Object.assign({}, state, {
				type: action.type,
				records: action.recordArray
			});

		case FILTER_OPEN:
			return Object.assign({}, state, {
				type: FILTER_OPEN,
				records: state.records.filter(i => i.endTime === null)
			});

		case FETCH_OPEN:
			return Object.assign({}, state, {
				type: action.type,
				records: [ action.record ],
				openRecord: action.record
			});

		case CREATE:
			return Object.assign({}, state, {
				type: action.type,
				records: state.records.concat([ action.records ]),
			});

		case DELETE:
			return removeItem(state, action.id);

		case REQUEST_PENDING:
			return Object.assign({}, state, {
				type: action.type
			});

		default:
			return state;
	}
}

function removeItem(state, id) {
	let records = state.records.slice(0);
	records.deleted(id);
	return records;
}
