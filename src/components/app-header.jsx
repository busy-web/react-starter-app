/**
 * @module Component
 *
 */
import { Component } from 'react';
import '@app/styles/components/app-header.scss';

/**
 * @class Header
 */
export default class Header extends Component {
	render() {
		return (
			<div className="c-app-header">
				<span className="c-app-header-logo"><p>busy</p><p>busy</p></span>
			</div>
		);
	}
}
