/**
 * @module busyweb.Data
 *
 *
 * Basic Date Storage and Retrieval
 */
//import { definedT, objectT, stringT } from './../types';
import BasicDB from './basic-db';

const DB = new BasicDB('bw-time-app');

export function findAll(type) {
	return DB.getRecords(type);
}

export function saveRecords(type, records) {
	DB.setRecords(type, records);
}

/**
export function addRecord(type, record) {
	assert("record be an object with type and id properties", objectT(record) && stringT(record.type) && stringT(record.id));

	let { type, id } = record;
	let rs = Object.assign({}, DB_STORE[type]);
	let curRecord = Object.assign({}, rs[id]);

	const { query } = meta;
	if (objectT(query)) {
		let qs = getQueryString();
	}
}
function getQueryString(params) {
	return new URLSearchParams(params).toString();
}
 */
