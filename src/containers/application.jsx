/**
 * @flow
 * @module Container
 *
 */
import { Container } from 'flux/utils';
import MemberStore from '@app/data/member/store';
import AppView from '@app/views/app-view';

function getStores() {
	return [
		// stores go here
		MemberStore
	];
}

function getState() {
	return {
		// states go here
	};
}

export default Container.createFunctional(AppView, getStores, getState);
