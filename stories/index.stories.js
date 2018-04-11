import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';
import Button from '@app/components/button';
//import Header from '@app/components/header';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Header')} />);

//storiesOf('Header', module).add('base', () => <Header />);

storiesOf('Button', module)
  .add('Standard', () => <Button onClick={action('clicked')}>Standard</Button>)
  .add('Blue', () => <Button type="blue" onClick={action('clicked')}>Blue</Button>)
