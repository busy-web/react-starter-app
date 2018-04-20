/**
 * @module View
 *
 */
import AppHeader from '@app/components/app-header';
import AppBody from '@app/components/app-body';
import Button from '@app/components/button';
import '@app/styles/views/app-view.scss';

function random(max) {
	max = max+1;
	return (parseInt(Math.random() * (max - 1) + 1, 10) - 1);
}

const FIRST = [
	'Annie', 'Bob', 'Bobby', 'Bill', 'Becky', 'Bo', 'Bonnie',
	'Carol', 'Chris', 'Chuck', 'Clyde', 'Don', 'Dianne', 'Davey', 'Dale',
	'John', 'Jacob', 'James', 'Julia', 'Janet', 'Joeseph', 'Janey',
	'Joe', 'Mark', 'Megan', 'Sue', 'Sally', 'Sam', 'Sarah', 'Tia',
	'Tommy', 'Ted', 'Tina', 'Will', 'Willy', 'Walley', 'Zach'
];

const LAST = [
	'Adams', 'Benson', 'Caldwell', 'Crocket', 'Cranson', 'Creighton',
	'Dover', 'Decker', 'Dean', 'Francis', 'Franks', 'Gilbert', 'Gains',
	'Kraft', 'Kroft', 'James', 'Johnson', 'Jones', 'Jensen', 'Mickelson',
	'Mayford', 'Norris', 'Smith', 'Samson', 'Swanson', 'Thompson', 'Terry',
	'Williams', 'Wilkens', 'Walker'
];

function generateMember(cb) {
	// get a random length for the name
	// with a max of 12 chars
	let fid = random(Object.keys(FIRST).length);
	let lid = random(Object.keys(LAST).length);
	console.log(fid, lid);

	let firstName = FIRST[fid];
	let lastName = LAST[lid];
	let email = (firstName + '.' + lastName + random(99) + '@gmail.com').toLowerCase();

	cb(firstName, lastName, email);
}

/**
 * @public
 * @method AppView
 */
export default function AppView(props) {
	return (
		<div className="application-view">
			<AppHeader />
			<AppBody>
				<div className="member-header">
					<span className="page-title">Members ({props.members && props.members.size ? props.members.size : 0})</span>
					<span className="add-member"><Button type="blue" onClick={() => generateMember(props.onAddMember)}>Create Member</Button></span>
				</div>

				<div className="member-list">
					{(() => {
						if (props.members.size === 0) {
							return <div>No Results</div>
						} else {
							return [
								...props.members.values(),
								{
									id: 'Id',
									firstName: 'Name',
									lastName: '',
									email: 'Email',
									createdOn: 'Created On'
								}
							].reverse().map(member => {
								return (<div className="member-row" key={member.id}>
									<span className="member-id">{member.id}</span>
									<span className="member-name">{member.firstName + " " + member.lastName}</span>
									<span className="member-email">{member.email}</span>
									<span className="member-created">{(typeof member.createdOn === 'number') ? new Date(member.createdOn).toString() : member.createdOn}</span>
								</div>)
							})
						}
					})()}
				</div>
			</AppBody>
		</div>
	);
}
