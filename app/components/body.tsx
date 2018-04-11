import * as React from 'react';

export default class BodyContainer extends React.Component<{ children?: React.ReactNode }> {
	render() {
		return (
			<div className="c-body">
				{this.props.children}
			</div>
		);
	}
}
