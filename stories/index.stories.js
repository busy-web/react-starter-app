import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';

import Button from '@app/components/button';
import AppHeader from '@app/components/app-header';
import AppBody from '@app/components/app-body';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Header')} />);

storiesOf('App Header', module).add('App Header', () => <AppHeader />);

storiesOf('Button Styles', module)
	.add('Default', () => <AppBody><Button onClick={action('clicked')}>default</Button></AppBody>)
	.add('grey', () => <AppBody><Button type="grey" onClick={action('clicked')}>Grey</Button></AppBody>)
	.add('Blue', () => <AppBody><Button type="blue" onClick={action('clicked')}>Blue</Button></AppBody>)
	.add('Green', () => <AppBody><Button type="green" onClick={action('clicked')}>Green</Button></AppBody>)
	.add('Red', () => <AppBody><Button type="red" onClick={action('clicked')}>Red</Button></AppBody>)
	.add('Text', () => <AppBody><Button type="text" onClick={action('clicked')}>Text</Button></AppBody>)
