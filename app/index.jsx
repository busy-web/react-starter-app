/**
 * @flow
 *
 */
import * as React from 'react';
import { render } from 'react-dom';
import 'smartbot/style.css';

import App from './app';

let body = document.body;
if (body !== null) {
	const root = document.createElement('div');
	root.classList.add('application');
	const scripts = body.getElementsByTagName('script');

	if (scripts.length) {
		body.insertBefore(root, scripts[0]);
	} else {
		body.appendChild(root);
	}

	render(<App />, root);
} else {
	throw new Error("Document.body not found in DOM");
}

