/**
 * @module Component
 *
 */
import * as React from 'react';
import 'smartbot/components/header.css';

/**
 * @class Header
 */
export default class Header extends React.Component {
	render() {
		return (
			<div className="c-header">
				<span className="c-header-logo">Smart Bot</span>
			</div>
		);
	}
}
