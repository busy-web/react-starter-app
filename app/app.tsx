import * as React from 'react'
import { hot } from 'react-hot-loader'
//import { resolve } from 'rsvp';

import Header from 'smartbot/components/header';
import BodyContainer from 'smartbot/components/body';
import Button from 'smartbot/components/button';

const App = () => (
	<div className="main">
		<Header />
		<BodyContainer>
			<Button>Standard</Button>
			<Button type="blue">Blue</Button>
		</BodyContainer>
	</div>
);

export default hot(module)(App);
