import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';

import Button from '@app/components/button';
import Header from '@app/components/header';
import BodyContainer from '@app/components/body';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Header')} />);

storiesOf('App Header', module).add('Header', () => <Header />);

storiesOf('Button Styles', module)
	.add('Default', () => <BodyContainer><Button onClick={action('clicked')}>default</Button></BodyContainer>)
	.add('grey', () => <BodyContainer><Button type="grey" onClick={action('clicked')}>Grey</Button></BodyContainer>)
	.add('Blue', () => <BodyContainer><Button type="blue" onClick={action('clicked')}>Blue</Button></BodyContainer>)
	.add('Green', () => <BodyContainer><Button type="green" onClick={action('clicked')}>Green</Button></BodyContainer>)
	.add('Red', () => <BodyContainer><Button type="red" onClick={action('clicked')}>Red</Button></BodyContainer>)
	.add('Text', () => <BodyContainer><Button type="text" onClick={action('clicked')}>Text</Button></BodyContainer>)
