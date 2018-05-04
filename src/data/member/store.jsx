/**
 * @module Data.Member
 *
 */
import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import uuid from 'uuid';
//import actionTypes from '@app/data/member/action-types';
//import dispatcher from '@app/data/member/dispatcher';
import Member from '@app/data/member';
import ApplicationStore from '@app/utils/store';

class Store extends ReduceStore {
	constructor() {
		super(Member.dispatcher);

		this.__store = new ApplicationStore();
		this.__store.find('member', { deleted_on: null })
			.then(d => d.forEach(m => Member.actions.addMember(m)));
	}

	getInitialState() {
		return Immutable.OrderedMap();
	}

	reduce(state, action) {
		switch (action.type) {
			case Member.actionTypes.ADD_MEMBER:
				let id = action.id || uuid.v4();
				action.id = id;
				return state.set(id, new Member(action));

			default:
				return state;
		}
	}
}

export default new Store();
