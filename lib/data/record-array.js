/**
 * @module utils
 *
 */
import Record from './record';
//import { deserialize } from './../object';
import { assert } from './../debug';
import { arrayT } from './../types';

/**
 * @class RecordArray
 * @extends Map
 */
export default class RecordArray {
	constructor(records, meta={}) {
		assert("new RecordArray() must include a records array as the second param", arrayT(records));

		let type;
		records = records.map(rec => {
			if (!type) {
				type = rec.type
			}
			assert("Mixed record types passed to new RecordArray", rec.type && rec.type === type);
			let record = new Record(rec, false);
			return [ rec.id, record ];
		});

		this.__records__ = new Map(records);

		this.__type__ = type;
		this.meta = meta;
	}

	get meta() {
		return this.__meta__;
	}

	set meta(props) {
		props = Object.assign({}, props);
		this.__meta__ = props;
	}

	get firstRecord() {
		if (this.size === 0) {
			return null;
		}
		const ittr = this.__records__.values();
		return ittr.next().value;
	}

	get length() {
		return this.__records__.size;
	}

	get forEach() {
		return this.__records__.forEach;
	}
}
