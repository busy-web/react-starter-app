/**
 * @flow
 * @module Component
 *
 */
import * as React from 'react';
import './style.scss';

/**
 * @class Header
 */
export default class Header extends React.Component<{}> {
	render() {
		return (
			<div className="c-header">
				<span className="c-header-logo"><p>busy</p><p>busy</p></span>
			</div>
		);
	}
}