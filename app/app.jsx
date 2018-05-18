/**
 * @module App
 */
import { hot } from 'react-hot-loader';

// import main styles before any other styles are imported
import '@app/styles/app.scss';

// import routes
import AppRouter from '@app/router';

// create app container
const App = () => (
	<div className="container">
		<AppRouter />
	</div>
);

export default hot(module)(App);
