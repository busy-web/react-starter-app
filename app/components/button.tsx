/**
 * @module Component
 *
 */
import * as React from 'react';
import 'smartbot/components/button.css';

/**
 * @class Button
 * @extends React.Component
 */
export default class Button extends React.Component<{ type?: string, onClick?: ()=>void, children?: React.ReactNode }> {
	constructor(props) {
		super(props);
	}

	render() {
		// generate className
		const className: string = `d-button ${this.props.type || 'grey'}`;

		// return component
		return (<button className={className} onClick={() => this.props.onClick}>{this.props.children}</button>);
	}
}
