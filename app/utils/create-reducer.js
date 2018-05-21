/**
 * @module Utils
 *
 */
import { objectT, definedT } from '@busyweb/types';
import { assert } from '@busyweb/debug';
import { REQUEST_PENDING } from '@app/utils/actions';

const initialState = {
	type: null,
	records: []
};

/**
 * Creates a reducer method allowing states to be defined in an object
 *
 * @public
 * @method createReducer
 * @param stateManager {object} a defined set of states key by action types
 * @return {object} new state
 */
export default function createReducer(stateManager) {
	assert("state manager object is required for createReducer", objectT(stateManager));

	return function(state = initialState, action) {
		if (definedT(stateManager[action.type])) {
			const nextState = stateManager[action.type](state, action);
			return { ...state, type: action.type, ...nextState };
		} else {
			if (action.type === REQUEST_PENDING) {
				return { ...state, type: REQUEST_PENDING };
			}
			return state;
		}
	}
}
