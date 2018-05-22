/**
 * @module State
 *
 */
import { combineReducers } from 'redux';

/** start model imports **/
import member from './reducers/member';
/** end model imports **/

/**
 * All application reducers must be imported through here
 *
 */
export default combineReducers({
	member,
});
