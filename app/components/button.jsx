/**
 * @flow
 * @module Component
 *
 */
import * as React from 'react';
import 'smartbot/components/button.css';

type Prop = {
	type?: string;
	onClick?: () => void;
	children?: React.Node;
}

/**
 * @class Button
 * @extends React.Component
 */
export default class Button extends React.Component<Prop> {
	render() {
		// generate className
		const className: string = `c-button ${this.props.type || 'grey'}`;

		// return component
		return (<button className={className} onClick={this.props.onClick}>{this.props.children}</button>);
	}
}
