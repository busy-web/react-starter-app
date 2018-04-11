/**
 * @flow
 * @module Component
 *
 */
import * as React from 'react';
import 'smartbot/components/body.css';

/**
 * @class BodyContainer
 *
 */
export default class BodyContainer extends React.Component<{ children?: React.Node }> {
	render() {
		return (
			<div className="c-body">
				{this.props.children}
			</div>
		);
	}
}
