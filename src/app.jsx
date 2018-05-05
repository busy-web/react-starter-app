/**
 * @module App
 */
import { hot } from 'react-hot-loader';
import AppRouter from '@app/router';
import '@app/styles/index.scss';

const App = () => (
	<div className="container">
		<AppRouter />
	</div>
);

export default hot(module)(App);
