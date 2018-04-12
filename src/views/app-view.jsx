/**
 * @flow
 * @module View
 *
 */
import * as React from 'react';

import Header from '@app/components/header';
import BodyContainer from '@app/components/body';

/**
 * @public
 * @method AppView
 */
export default function AppView(): React.Node {
	return (
		<div className="application-view">
			<Header />
			<BodyContainer>
				Application rendered
			</BodyContainer>
		</div>
	);
}
