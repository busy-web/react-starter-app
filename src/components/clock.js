/**
 * @module Component
 *
 */
//import { Component } from 'react';
import Time from '@app/utils/time';
import { objectT } from '@app/utils/types';
import '@app/styles/components/clock.scss';

const Clock = ({ openEntry }) => {
	return (
		<div className="c-clock">
			<div className="time-container">
				{
					(() => {
						if (objectT(openEntry)) {
							let start = openEntry.startTime;
							let now = Time.unix();
							let diff = now - start;

							let hours = parseInt(diff/3600, 10) * 3600;
							let minutes = parseInt((diff - hours)/60, 10) * 60;
							let seconds = parseInt((diff - hours - minutes), 10);
							hours = hours/3600;
							minutes = minutes/60;

							hours = hours < 10 ? `0${hours}` : hours;
							minutes = minutes < 10 ? `0${minutes}` : minutes;
							seconds = seconds < 10 ? `0${seconds}` : seconds;

							return `${hours}:${minutes}:${seconds}`;
						} else {
							return "00:00:00";
						}
					})()
				}
			</div>
		</div>
	);
};

export default Clock;
