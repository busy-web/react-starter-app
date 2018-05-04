/**
 * @module App
 */
import { hot } from 'react-hot-loader'
import ApplicationContainer from '@app/containers/application';
import '@app/styles/index.scss';

const App = () => (
	<div className="main">
		<ApplicationContainer />
	</div>
);

export default hot(module)(App);
