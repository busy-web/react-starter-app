/**
 * @module State
 *
 */
import { FETCH, CREATE, UPDATE, DELETE, ARCHIVE, PENDING } from './actions';


export default function createDBReducer() {
	return function(state, action) {
		const { type } = action;
		switch (type) {
			case FETCH:
				return { ...state, type: FETCH, records: action.records };

			case CREATE:
				return { ...state, type: CREATE, records: updateRecord(state.records, action.createdRecord) };

			case UPDATE:
				return { ...state, type: UPDATE, records: updateRecord(state.records, action.updateRecord) };

			case DELETE:
				return { ...state, type: DELETE, records: removeRecord(state.records, action.deletedRecord) };

			case ARCHIVE:
				return { ...state, type: ARCHIVE, records: removeRecord(state.records, action.archivedRecord) };

			case PENDING:
				return { ...state, type: PENDING };

			default:
				return state;
		}
	}
}

function removeRecord(recordArray, record) {
	return recordArray.filter(r => r.id !== record.id);
}

function updateRecord(recordArray, record) {
	return recordArray.map(r => {
		if (r.id === record.id) {
			return record
		}
		return r;
	});
}
