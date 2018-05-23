/**
 * @module Containers
 *
 */
import { connect } from 'react-redux';
import { definedT, objectT } from '@busyweb/types';
import Time from '@busyweb/time';
import Button from '@app/components/button';
import Clock from '@app/components/clock';
import {
	fetchOpenTimeEntry,
	/* createTimeEntry */
} from '@app/models/time-entry/actions';
import '@app/styles/containers/time-entry-clock';

const mapStateToProps = (state) => {
	let { timeEntry } = state.api;
	let { id } = state.app.auth;
	return { state: timeEntry || {}, authId: id };
};

/**
const mapDispatchToProps = (dispatch) => {
	return {
		fetch: () => dispatch(fetchTimeEntries()),
		create: (props) => dispatch(createTimeEntry(props))
	}
};
*/

const TimeEntryClock = ({ memberId, authId, state, dispatch }) => {
	if (!memberId) {
		memberId = authId;
	}

	if (state.type === null) {
		dispatch(fetchOpenTimeEntry(memberId));
		return <div className="loading"></div>
	} else if (state.type === 'REQUEST_PENDING') {
		return <div className="loading"></div>
	} else {
		let entry = state.records && state.records.model && state.records.model.find(i => i.endTime === null);
		let clockString;
		if (objectT(entry)) {
			clockString = calcTime(entry);
			setTimeout(() => {
				clockString = calcTime(entry);
			}, 1000);
		} else {
			clockString = "00:00:00 time";
		}
		/* if (state.error) {
			return <div className="error">{state.error.message}</div>
		} else if (state.pending) {
			return <div className="c-time-entry-clock-container">Loading...</div>;
		} else if (state.loadRecords) {
			//findOpen(memberId, dispatch);
			return <div className="c-time-entry-clock-container">Loading...</div>;
		} else { */
		//let records = state.records;
			return (
				<div className="c-time-entry-clock-container">
					<div className="clock">
						<Clock clockString={clockString} />
					</div>
					<div className="clock-buttons">
						<div className="form-view">
							{(() => {
								if (!definedT(entry)) {
									return (<Button type="blue">Clock In</Button>);
								} else {
									return (<Button type="red">Clock Out</Button>);
								}
							})()}
						</div>
					</div>
				</div>
			);
		//}
	}
};

function calcTime(openEntry) {
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

	let str = `${hours}:${minutes}:${seconds}`;
	console.log('calcTime', str);
	return str;
}

export default connect(mapStateToProps)(TimeEntryClock);

