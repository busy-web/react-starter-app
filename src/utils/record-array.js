/**
 * @module utils
 *
 */
import ProxyArray from './proxy-array';
import Record from './record';
import { deserialize } from './object';
import { assert } from './debug';
import { arrayT, stringT } from './types';

/**
 * @class RecordArray
 * @extends ProxyArray
 */
export default class RecordArray extends ProxyArray {
	constructor(recordType, records, props={}) {
		assert("new RecordArray() must include a recordType string as the first param", stringT(recordType));
		assert("new RecordArray() must include a records array as the second param", arrayT(records));

		props = Object.assign({}, props);

		records = records.map(v => {
			if (v instanceof Record) {
				v.meta = props;
				return v;
			}
			return new Record(recordType, v, props);
		});

		super(records);

		this.recordType = recordType;
		this.meta = props;
	}

	get meta() {
		return this.__meta__;
	}

	set meta(props) {
		this.__meta__ = deserialize(Object.keys(props), props);
	}
}
