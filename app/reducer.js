/**
 * @module Reducers
 *
 */
import { combineReducers } from 'redux';

/** start model imports **/
import auth from '@app/models/auth';
import member from '@app/models/member';
import timeEntry from '@app/models/time-entry';
//import timeEntry from '@app/models/time-entry/reducer';
/** end model imports **/

/**
 * All application reducers must be imported through here
 *
 */
export default combineReducers({
	auth,
	models: combineReducers({
		member,
		timeEntry
	})
});
