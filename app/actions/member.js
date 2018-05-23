/**
 * @module ModelActions
 *
 */

export const FILTER_ALL = 'FILTER_ALL';
//export const FILTER_AUTH = 'FILTER_AUTH';

export function filterAll(id, members) {
	return {
		type: FILTER_ALL,
		id,
		members
	};
}

