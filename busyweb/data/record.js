/**
 * @module Utils
 *
 */
import { serialize, deserialize } from './../object';

/**
 * @class Record
 * @extends Object
 */
export default class Record extends Object {

	/**
	 * class constructor
	 */
	constructor(props, isNew=true) {
		// call super
		super({});

		this.__isNew__ = isNew;

		// save recordType string
		this.__type__ = props.type;
		this.__id__ = props.id || Math.floor(Math.random() * 20);

		this.__state__ = {};
		this.__prevState__ = {};

		// set props
		this.setProperties(props.attrs);
	}

	setProperties(props={}) {
		props = Object.assign({}, props);

		// save property keys
		this.__propkeys__ = Object.keys(props);

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
		const type = this.__type__;
		const id = this.__id__;

		let attrs = {};
		this.__propkeys__.forEach(k => {
			attrs[k] = this[k];
		});

		return { type, id, attrs };
	}

	toJSON() {
		let json = serialize(this.__propkeys__, this);
		json.id = this.__id__;
		return json;
	}

	toString() {
		return JSON.stringify(this.valueOf());
	}

	toJSONString() {
		return JSON.stringify(this.toJSON());
	}
}

