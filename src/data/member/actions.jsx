/**
 * @flow
 * @module Data.Member
 *
 */
import actionTypes from '@app/data/member/action-types';
import dispatcher from '@app/data/member/dispatcher';

const actions = {
	addMember(firstName: string, lastName: string, email: string) {
		dispatcher.dispatch({
			type: actionTypes.ADD_MEMBER,
			firstName,
			lastName,
			email
		});
	}
};


export default actions;
