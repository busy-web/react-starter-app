/**
 * @module State
 *
 */
import { FETCH, CREATE, UPDATE, DELETE, ARCHIVE, PENDING } from './actions';
import { underscore } from './../string';

const initState = {
	type: null,
	records: []
};

export default function createDBReducer(name) {
	const normalizedName = underscore(name).toUpperCase();
	return function(state=initState, action) {
		const { type } = action;
		//console.log(normalizedName, action);
		switch (type) {
			case `${FETCH}_${normalizedName}`:
				return { ...state, type: `${FETCH}_${normalizedName}`, records: action.records };

			case `${CREATE}_${normalizedName}`:
				return { ...state, type: `${CREATE}_${normalizedName}`, records: updateRecord(state.records, action.createdRecord) };

			case `${UPDATE}_${normalizedName}`:
				return { ...state, type: `${UPDATE}_${normalizedName}`, records: updateRecord(state.records, action.updateRecord) };

			case `${DELETE}_${normalizedName}`:
				return { ...state, type: `${DELETE}_${normalizedName}`, records: removeRecord(state.records, action.deletedRecord) };

			case `${ARCHIVE}_${normalizedName}`:
				return { ...state, type: `${ARCHIVE}_${normalizedName}`, records: removeRecord(state.records, action.archivedRecord) };

			case `${PENDING}_${normalizedName}`:
				return { ...state, type: `${PENDING}_${normalizedName}` };

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
