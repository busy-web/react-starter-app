/**
 * @module Containers
 *
 */
import { connect } from 'react-redux';
import Button from '@app/components/button';
import { fetchAuth } from '@app/actions/auth';

const mapStateToProps = (state) => {
	let { auth } = state;
	return auth;
}

const AuthView = ({ children, isAuthenticated, dispatch }) => {
	if (isAuthenticated) {
		return <div className="auth">{children}</div>;
	} else {
		let uname = '';
		let pword = '';
		return (
			<div className="auth none">
				<div className="login-view">
					<div className="form-view">
						<input type="text" placeholder="Username" onChange={(evt) => uname = evt.target.value} />
						<input type="password" placeholder="Password" onChange={(evt) => pword = evt.target.value} />
						<Button type="blue" onClick={() => fetchAuth(uname, pword, dispatch)}>Log in</Button>
					</div>
				</div>
			</div>
		);
	}
};

const Authenticated = connect(mapStateToProps)(AuthView);

export default Authenticated;

