/**
 * @module Models
 *
 */
const filters = {
	all: 'filter_all',
	open: 'filter_open',
	date: 'filter_date',
	archived: 'filter_archived',
};

const actions = {

};

const initialState = {
	filter: filters.all,
	timeEntry: []
};

function reducer(state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}

export { filters, actions };

export default reducer;
