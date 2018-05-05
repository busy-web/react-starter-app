/**
 * @module Component
 *
 */
import { Component } from 'react';
import { Link } from 'react-router-dom';
import Authenticated from '@app/containers/authenticated';
import Unauthenticate from '@app/containers/unauthenticate';
import AppHeader from '@app/components/app-header';
import '@app/styles/components/app-body.scss';

/**
 * @class AppBody
 *
 */
export default class AppBody extends Component {
	render() {
		return (
			<div className="c-app-body">
				<Authenticated>
					<div className="side-nav">
						<span className="nav-link"><Link to="/">Dashboard</Link></span>
						<span className="nav-link"><Link to="/employees">Employees</Link></span>
						<Unauthenticate />
					</div>
					<div className="app-content">
						<AppHeader />
						<div className="app-container">
							{this.props.children}
						</div>
					</div>
				</Authenticated>
			</div>
		);
	}
}
