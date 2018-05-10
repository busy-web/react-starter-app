/**
 * @module Containers
 *
 */
import { connect } from 'react-redux';
import Button from '@app/components/button';
import Clock from '@app/components/clock';
import { getAuth } from '@app/utils/auth';
import { findOpen } from '@app/actions/time-entry';

const mapStateToProps = (state) => {
	let { auth, timeEntry } = state;
	return { state: timeEntry, memberId: auth.id };
}

const TimeEntryClock = ({ memberId, state, dispatch }) => {
	if (!memberId) {
		let { id } = getAuth();
		memberId = id;
	}

	if (state.error) {
		return <div className="error">{state.error.message}</div>
	} else if (state.pending) {
		return <div className="c-time-entry-clock-container">Loading...</div>;
	} else if (state.loadRecords) {
		findOpen(memberId, dispatch);
		return <div className="c-time-entry-clock-container">Loading...</div>;
	} else {
		let records = state.records || { objectAt: function() { return {} } };
		let entry = records.objectAt(0);
		return (
			<div className="c-time-entry-clock-container">
				<div className="clock">
					<Clock openEntry={entry} />
				</div>
				<div className="clock-buttons">
					<div className="form-view">
						<Button type="blue">Clock In</Button>
					</div>
				</div>
			</div>
		);
	}
};

const TimeEntryClockContainer = connect(mapStateToProps)(TimeEntryClock);
export default TimeEntryClockContainer;

