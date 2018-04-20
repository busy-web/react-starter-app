import Immutable from 'immutable';

const Member = Immutable.Record({
  id: '',
	firstName: '',
	lastName: '',
	email: '',
	createdOn: null,
});

export default Member;
