/**
 * @module Main
 */
import { setGlobal } from '@busyweb/app-global';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import features from '@config/features';
import config from '@config/environment';
import loader from './loader';
import reducer from './reducer';
import App from './app';

setGlobal('features', features);
setGlobal('config', config);
setGlobal('loader', loader());

const store = createStore(reducer);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('application')
);
