/**
 * @module Views
 *
 */
import TimeEntryClockContainer from '@app/containers/time-entry-clock';
//import state from '@app/services/state';

//const state = { auth: { id: '' }};

/**
 * @class IndexView
 *
 */
const Index = () => {
	return (<div className="v-index">
		<div>
			<TimeEntryClockContainer />
		</div>
	</div>);
}

export default Index;
