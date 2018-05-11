/**
 * @module busyweb.Data
 *
 */
export class BasicDB {
	constructor(name) {
		this.name = name;
	}

	getRecords(type) {
		return deserialize(
			localStorage.getItem(
				getPath(this, type)
			)
		);
	}

	setRecords(type, records) {
		let cr = this.getRecords(type);
		records.forEach(rec => pushRecord(rec, cr));
		localStorage.setItem(getPath(this, type), serialize(cr));
		return this;
	}
}

function pushRecord(record, db) {
	let index = -1;
	let rc = db.find((r, idx) => {
		if (r.id === record.id) {
			index = idx;
			return r;
		}
	});
	db[index] = Object.assign({}, rc, record);
}

function serialize(records) {
	let ra = records.map(val => {
		return btoa(JSON.stringify(val));
	});
	return btoa(JSON.stringify(ra));
}

function deserialize(recordString) {
	if (recordString.length === 0) {
		return [];
	}

	let records = JSON.parse(atob(recordString));
	return records.map(rec => {
		return JSON.parse(atob(rec));
	});
}

function getPath(db, type) {
	return btoa(db.name + '.' + type);
}
