/**
 * @module Models
 *
 */
import createReducer from '@busyweb/state/create-reducer';
import { CREATE, DELETE, FETCH_ACTIVE } from '@busyweb/state/actions';
import { FILTER_OPEN, FETCH_OPEN } from './time-entry/actions';

export default createReducer({
	[FETCH_ACTIVE]: (state, { recordArray }) => {
		return { type: FETCH_ACTIVE, records: recordArray };
	},

	[FETCH_OPEN]: (state, { record }) => {
		return { type: FETCH_OPEN, records: [ record ] };
	},

	[FILTER_OPEN]: (state) => {
		return { type: FILTER_OPEN, records: state.filter(i => i.endTime === null) };
	},

	[CREATE]: (state, { record }) => {
		return { type: CREATE, records: record };
	},

	[DELETE]: (state, { id }) => {
		let records = state.records.slice(0);
		records.deleted(id);
		return { type: DELETE, records };
	}
});
