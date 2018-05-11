/**
 * @module Main
 */
import { render } from 'react-dom';
import App from '@app/app';
//<Provider store={store}>
//</Provider>,

render(
	<App />,
	document.getElementById('application')
);
