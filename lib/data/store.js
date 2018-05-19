/**
 * @module busyweb.Data
 *
 *
 * Basic Date Storage and Retrieval
 */
//import { getGlobal } from './../app-global';
import Service from './../service';
import injectService from './../inject-service';
import Adapter from './adapter';
//import BasicDB from './basic-db';

// const DB = new BasicDB('bw-time-app');

// export function findAll(type) {
//   return DB.getRecords(type);
// }

// export function saveRecords(type, records) {
//   DB.setRecords(type, records);
// }


export default class Store extends Service {

	constructor() {
		super();

		injectService('auth', this);

		this.config = __APP__;
		if (this.config && this.config.api && this.config.api.url) {
			this.adapter = new Adapter(this.config.api.url, this.auth);
		} else {
			throw new Error("config.api.url is not defined");
		}
	}

	find(...args) {
		return this.adapter.find.apply(this.adapter, args);
	}

	save(...args) {
		return this.adapter.save.apply(this.adapter, args);
	}
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
