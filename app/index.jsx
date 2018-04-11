import * as React from 'react';
import { render } from 'react-dom';
import 'smartbot/style.css';

import App from './app';

//console.log(style);

const root = document.createElement('div');
root.classList.add('application');
const scripts = document.body.getElementsByTagName('script');

if (scripts.length) {
	document.body.insertBefore(root, scripts[0]);
} else {
	document.body.appendChild(root);
}

render(<App />, root);
