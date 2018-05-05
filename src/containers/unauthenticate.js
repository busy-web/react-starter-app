/**
 * @module Containers
 *
 */
import { connect } from 'react-redux';
import { removeAuthHash } from '@app/model-actions/auth';

const AuthView = ({ dispatch }) => {
	return <span className="nav-link"><a onClick={() => dispatch(removeAuthHash())}>Log out</a></span>;
};

const Unauthenticate = connect()(AuthView);

export default Unauthenticate;

