/**
 * @flow
 *
 */
import * as React from 'react'
import { hot } from 'react-hot-loader'

import Header from '@app/components/header';
import BodyContainer from '@app/components/body';
import Button from '@app/components/button';

const App = () => (
	<div className="main">
		<Header />
		<BodyContainer>
			<Button>Standard</Button>
			<Button type="blue">Blue</Button>
			<Button type="green">Green</Button>
			<Button type="red">Red</Button>
		</BodyContainer>
	</div>
);

export default hot(module)(App);
