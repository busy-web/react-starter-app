/**
 * @module Core
 *
 */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import dbReducer from './reducer';

const initState = {};

export default function createStoreWrapper(appReducer, uiReducer, state=initState) {

	let reducer = combineReducers({
		api: dbReducer,
		app: appReducer,
		ui: uiReducer
	});

	return createStore(reducer, state, applyMiddleware(thunk));
}
