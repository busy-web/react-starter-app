/**
 * @module Models
 *
 */
import Model from '@app/utils/model';

export default class Member extends Model {
	static definition = {
		id: 'string',
		firstName: 'string',
		lastName: 'string',
		email: 'string',
		createdOn: 'number',
	}

	static actionTypes = {
		GET_MEMBER: 'get-member',
		ADD_MEMBER: 'add-member'
	}

	static dispatcher = new Model.Dispatcher();

	static actions = {
		addMember(props) {
			props.type = Member.actionTypes.ADD_MEMBER;
			Member.dispatcher.dispatch(props);
		}
		//addMember: ['firstName', 'lastName', 'email'],
	}
}
