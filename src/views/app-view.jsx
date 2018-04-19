/**
 * @module View
 *
 */
import AppHeader from '@app/components/app-header';
import AppBody from '@app/components/app-body';

/**
 * @public
 * @method AppView
 */
export default function AppView() {
	return (
		<div className="application-view">
			<AppHeader />
			<AppBody>
				Application rendered
			</AppBody>
		</div>
	);
}
