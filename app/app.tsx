import * as React from 'react'
import { hot } from 'react-hot-loader'
import { resolve } from 'rsvp';

import Header from 'smartbot/components/header';
import BodyContainer from 'smartbot/components/body';

const App = () => (
	<div className="main">
		<Header />
		<BodyContainer />
	</div>
);

export default hot(module)(App);
