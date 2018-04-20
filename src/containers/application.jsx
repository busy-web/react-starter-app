/**
 * @flow
 * @module Container
 *
 */
import { Container } from 'flux/utils';
import MemberStore from '@app/data/member/store';
import MemberActions from '@app/data/member/actions';
import AppView from '@app/views/app-view';

function getStores() {
	return [
		// stores go here
		MemberStore
	];
}

function getState() {
	return {
		members: MemberStore.getState(),
		onAddMember: MemberActions.addMember,
	};
}

export default Container.createFunctional(AppView, getStores, getState);
