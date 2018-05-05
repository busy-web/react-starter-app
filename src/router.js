/**
 * @module Router
 *
 */
import { BrowserRouter, Route } from 'react-router-dom';
import AppBody from '@app/components/app-body';
import IndexView from '@app/views/index';
import EmployeesView from '@app/views/employees';

const Router = () => (
	<BrowserRouter>
		<AppBody>
			<Route exact path="/" component={IndexView} />
			<Route path="/employees" component={EmployeesView} />
		</AppBody>
	</BrowserRouter>
);

export default Router;
