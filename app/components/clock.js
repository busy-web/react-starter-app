/**
 * @module Component
 *
 */
//import { Component } from 'react';
import '@app/styles/components/clock.scss';

//let intval = null;

const Clock = ({ clockString }) => {
	return (
		<div className="c-clock">
			<div className="time-container">{clockString}</div>
		</div>
	);
};

export default Clock;
