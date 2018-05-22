/**
 * @module State
 *
 */
import injectService from '@busyweb/inject-service';
import Time from '@busyweb/time';

/**
 * genneric action types
 *
 */
export const FETCH = 'FETCH';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';
export const ARCHIVE = 'ARCHIVE';

export const PENDING = 'PENDING';
export const FAILED = 'FAILED';
export const SUCCESS = 'SUCCESS';

// export const FETCH_ALL = 'FETCH_ALL';
// export const FETCH_ACTIVE = 'FETCH_ACTIVE';
// export const FETCH_ARCHIVED = 'FETCH_ARCHIVED';

function pending() {
	return {
		type: PENDING
	};
}

function failed(error) {
	return {
		type: FAILED,
		record: { error }
	};
}

export function findRequest(dispatch, recordType, params, success) {
	// dispatch request pending
	dispatch(pending());

	// get store
	const store = injectService('store');

	// find records
	return store.find(recordType, params)
		.then(res => dispatch(success(res))) // dispatch success
		.catch(err => dispatch(failed(err))); // dispatch error
}

export function createRequest(dispatch, recordType, props) {
	// dispatch request pending
	dispatch(pending());

	// set new args
	props.type = recordType;
	props.isNew = true;

	// get store
	const store = injectService('store');

	// find records
	return store.save(props)
		.then(res => dispatch(() => ({ type: CREATE, createdRecord: res[0] }))) // dispatch success
		.catch(err => dispatch(failed(err))); // dispatch error
}


export function updateRequest(dispatch, record) {
	// dispatch request pending
	dispatch(pending());

	// get store
	const store = injectService('store');

	// find records
	return store.save(record)
		.then(res => dispatch(() => ({ type: UPDATE, updatedRecord: res[0] }))) // dispatch success
		.catch(err => dispatch(failed(err))); // dispatch error
}

export function deleteRequest(dispatch, record) {
	// dispatch request pending
	dispatch(pending());

	record.archivedOn = Time.timestamp();

	// get store
	const store = injectService('store');

	// find records
	return store.save(record)
		.then(() => dispatch(() => ({ type: DELETE, deletedRecord: record }))) // dispatch success
		.catch(err => dispatch(failed(err))); // dispatch error
}

export function archiveRequest(dispatch, record) {
	// dispatch request pending
	dispatch(pending());

	record.archivedOn = Time.timestamp();

	// get store
	const store = injectService('store');

	// find records
	return store.save(record)
		.then(() => dispatch(() => ({ type: ARCHIVE, deletedRecord: record }))) // dispatch success
		.catch(err => dispatch(failed(err))); // dispatch error
}

