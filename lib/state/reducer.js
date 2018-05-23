/**
 * @module State
 *
 */
import { combineReducers } from 'redux';

/** start model imports **/
import member from './reducers/member';
import organization from './reducers/organization';
import timeEntry from './reducers/time-entry';
/** end model imports **/

/**
 * All application reducers must be imported through here
 *
 */
export default combineReducers({
	member,
	organization,
	timeEntry,
});
