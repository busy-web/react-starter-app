/**
 * @module Models
 *
 */
import createReducer from '@busyweb/state/create-reducer';
import { FILTER_ALL, FILTER_AUTH } from '@app/actions/member';

// const initialState = {
//   filter: null,
//   records: []
// };

export default createReducer({
	[FILTER_ALL]: (state, { id, members }) => {
		return { ...state, records: members, authMember: members.filter(i => i.id === id) };
	}
});
