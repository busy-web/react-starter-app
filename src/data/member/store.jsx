/**
 * @flow
 * @module Data.Member
 *
 */
import { ReduceStore } from 'flux/utils';
import actionTypes from '@app/data/member/action-types';
import dispatcher from '@app/data/member/dispatcher';

class Store extends ReduceStore {
	constructor() {
		super(dispatcher);
	}

	getInitialState() {
		return {};
	}

	reduce(state: ReduceStore.TState, action: Object) {
		switch (action.type) {
			case actionTypes.ADD_MEMBER:
				return state;

			default:
				return state;
		}
	}
}

export default new Store();
