/**
 * @module Containers
 *
 */
import { connect } from 'react-redux';
import Button from '@app/components/button';
import Clock from '@app/components/clock';
//import { getAuth } from '@app/utils/auth';
//import { findOpen } from '@app/actions/time-entry';
import { fetchOpenTimeEntry, createTimeEntry } from './time-entry/actions';

const mapStateToProps = (state) => {
	let { timeEntry } = state;
	return { state: timeEntry };
};

/**
const mapDispatchToProps = (dispatch) => {
	return {
		fetch: () => dispatch(fetchTimeEntries()),
		create: (props) => dispatch(createTimeEntry(props))
	}
};
*/

const TimeEntryClock = ({ memberId, state, dispatch }) => {
	if (state.type === 'EMPTY') {
		fetchOpenTimeEntry(dispatch, memberId);
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
		let entry = state.openRecord;
		console.log('entry', entry);
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
	//}
};

export default connect(mapStateToProps)(TimeEntryClock);

