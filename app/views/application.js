/**
 * @module Component
 *
 */
import { Component } from 'react';
import { Link } from 'react-router-dom';
import '@app/styles/views/application.scss';

/**
 * @class AppBody
 *
 */
export default class AppBody extends Component {
	render() {
		return (
			<div className="c-app-body">
				<div className="auth">
					<div className="side-nav">
						<span className="nav-link"><Link to="/">Dashboard</Link></span>
						<span className="nav-link"><Link to="/employees">Employees</Link></span>
					</div>
					<div className="app-content">
						<div className="c-app-header">
							<span className="c-app-header-logo"><p>busy</p><p>busy</p></span>
						</div>
						<div className="app-container">
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
