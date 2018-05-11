/**
 * @module Views
 *
 */
import TimeEntryClockContainer from '@app/containers/time-entry-clock';
import state from '@app/utils/state';

/**
 * @class IndexView
 *
 */
const Index = () => (
	<div className="v-index">
		<div>
			<TimeEntryClockContainer memberId={state.auth.id} />
		</div>
	</div>
)

export default Index;
