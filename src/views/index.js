/**
 * @module Views
 *
 */
import TimeEntryClockContainer from '@app/containers/time-entry-clock';

/**
 * @class IndexView
 *
 */
const Index = () => (
	<div className="v-index">
		<div>
			<TimeEntryClockContainer />
		</div>
	</div>
)

export default Index;
