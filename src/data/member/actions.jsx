/**
 * @module Data.Member
 *
 */
import actionTypes from '@app/data/member/action-types';
import dispatcher from '@app/data/member/dispatcher';

const actions = {
	addMember(firstName, lastName, email) {
		console.log('addMember', firstName, lastName, email);
		dispatcher.dispatch({
			type: actionTypes.ADD_MEMBER,
			firstName,
			lastName,
			email
		});
	}
};


export default actions;
