/**
 * @module Component
 *
 */
import { Component } from 'react';
import '@app/styles/components/button.scss';

/**
 * @class Button
 * @extends Component
 */
export default class Button extends Component {
	render() {
		// generate className
		const className: string = `c-button ${this.props.type || ''}`;

		// return component
		return (<button className={className} onClick={this.props.onClick}>{this.props.children}</button>);
	}
}
