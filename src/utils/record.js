/**
 * @module Utils
 *
 */
import { serialize, deserialize } from './object';

/**
 * @class Record
 * @extends Object
 */
export default class Record extends Object {

	/**
	 * class constructor
	 */
	constructor(recordType, props, meta={}, prevState={}) {
		// call super
		super({});

		// deserialize the properties
		const properties = deserialize(Object.keys(props), props);

		// save recordType string
		this.recordType = recordType;

		// save property keys
		this.__propkeys__ = Object.keys(properties);

		// deserialize meta properties
		meta = deserialize(Object.keys(meta), meta);

		// save meta data
		this.__meta__ = meta;

		this.__state__ = {};
		this.__prevState__ = Object.assign({}, prevState);

		// set props
		this.setProperties(properties);
	}

	setProperties(props) {
		// set new state
		this.__propkeys__.forEach(key => {
			Object.defineProperty(this, key, {
				get() {
					return this.__state__[key];
				},
				set(value) {
					this.__prevState__ = Object.assign({}, this.__prevState__, { [key]: this.__state__[key] });
					this.__state__[key] = value;
					return this;
				}
			});

			this[key] = props[key];
		});
	}

	/**
	 * meta property getter
	 */
	get meta() {
		return this.__meta__;
	}

	set meta(value={}) {
		value = deserialize(Object.keys(value), value);
		this.__meta__ = Object.assign({}, this.__meta__, value);
		return this;
	}

	valueOf() {
		let obj = {};
		this.__propkeys__.forEach(k => {
			obj[k] = this[k];
		});
		return obj;
	}

	toJSON() {
		return serialize(this.__propkeys__, this);
	}

	toString() {
		return JSON.stringify(this.valueOf());
	}

	toJSONString() {
		return JSON.stringify(this.toJSON());
	}
}

