/**
 * @module Actions
 *
 */
import { findRecord } from '@app/utils/actions';


export const FILTER_ALL = "FILTER_ALL";
export const FILTER_MEMBER = "FILTER_MEMBER";
export const FILTER_MEMBER_OPEN = "FILTER_MEMBER_OPEN";

/**
 * TimeEntry Actions
 *
 */
export function findAll(dispatch) {
	return findRecord('time-entry', {}, dispatch, FILTER_ALL);
}

export function findMember(member_id, dispatch) {
	return findRecord('time-entry', { member_id }, dispatch, FILTER_MEMBER);
}

export function findOpen(member_id, dispatch) {
	return findRecord('time-entry', { member_id, end_time: null }, dispatch, FILTER_MEMBER_OPEN);
}
