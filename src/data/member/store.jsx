/**
 * @module Data.Member
 *
 */
import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import uuid from 'uuid';
import actionTypes from '@app/data/member/action-types';
import dispatcher from '@app/data/member/dispatcher';
import Member from '@app/data/member';

class Store extends ReduceStore {
	constructor() {
		super(dispatcher);
	}

	getInitialState() {
		return Immutable.OrderedMap();
	}

	reduce(state, action) {
		switch (action.type) {
			case actionTypes.ADD_MEMBER:
				let id = uuid.v4();
				console.log('id', id);
				return state.set(id, new Member({id, firstName: action.firstName, lastName: action.lastName, email: action.email, createdOn: Date.now() }));

			default:
				return state;
		}
	}
}

export default new Store();
