/**
 * @module Models
 *
 */
import { normalizeState } from '@app/utils/actions';

const initialState = normalizeState(null, { recordType: 'time-entry', loadRecords: true });

function reducer(state = initialState, action) {
	if (action.type) {
		return Object.assign({}, state, action);
	} else {
		return state;
	}
}

export default reducer;
