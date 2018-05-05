/**
 * @module Models
 *
 */
import {
	REQUEST_AUTH,
	RECEIVE_AUTH,
	REMOVE_AUTH,
	getAuthHash
} from '@app/model-actions/auth';


const initialState = getAuthHash();

function reducer(state = initialState, action) {
	switch (action.type) {
		case REMOVE_AUTH:
			return action.state;

		case REQUEST_AUTH:
			return state;

		case RECEIVE_AUTH:
			return action.state;

		default:
			return state;
	}
}

export default reducer;
