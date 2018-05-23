/**
 * @module Main
 */
//import { setGlobal } from '@busyweb/app-global';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createStore from '@busyweb/state/create-store';
import { fetchRequest } from '@busyweb/state/actions';
import reducer from './reducer';
import App from './app';

const store = createStore(reducer, {});

store.dispatch(fetchRequest('member', { archived_on: null }));
store.dispatch(fetchRequest('organization'));
store.dispatch(fetchRequest('time-entry', { _desc: ['start_time'], deleted_on: null }));

console.log('initial state', store.getState());

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('application')
);
