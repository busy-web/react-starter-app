/**
 * @module Router
 *
 */
import { BrowserRouter, Route } from 'react-router-dom';
import Application from '@app/views/application';
import IndexView from '@app/views/index';
import EmployeesView from '@app/views/employees';

const Router = () => (
	<BrowserRouter>
		<Application>
			<Route exact path="/" component={IndexView} />
			<Route path="/employees" component={EmployeesView} />
		</Application>
	</BrowserRouter>
);

export default Router;
