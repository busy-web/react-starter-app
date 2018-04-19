/**
 * @module Component
 *
 */
import { Component } from 'react';
import '@app/styles/components/app-body.scss';

/**
 * @class AppBody
 *
 */
export default class AppBody extends Component {
	render() {
		return (
			<div className="c-app-body">
				{this.props.children}
			</div>
		);
	}
}
