/**
 * @module Models
 *
 */
import { FILTERS } from '@app/model-actions/member';

const initialState = {
	filter: FILTERS.all,
	models: []
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case FILTERS.auth:
			return Object.assign({}, state, { filter: FILTERS.auth });

		default:
			return state;
	}
}

export default reducer;
