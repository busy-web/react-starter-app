/**
 * @module Utils
 *
 */
import Immutable from 'immutable';
import { Dispatcher } from 'flux';
import { assert } from './debug';
import { definedT, objectT } from './types';
import { eachProperty } from './object';
import { camelize, underscore } from './string';

export default class Model {
	static Dispatcher = Dispatcher;
	static definition = null;
	static actionTypes = null;
	static actions = null;

	_internalModel = null;

	constructor(properties) {
		setupModel(this, properties);
	}

	modelName() {
		return this.__proto__.constructor.toString();
	}
}

function setupModel(model, properties={}) {
	const classDef = model.__proto__.constructor;
	assert("Model: definition not found on model", objectT(classDef.definition));
	assert("Model.create(): takes an object properties as the only param", objectT(properties));

	let props = {};
	eachProperty(classDef.definition, (val, key) => {
		const propKey = underscore(key);
		if (definedT(properties[propKey])) {
			props[key] = properties[propKey];

			Object.defineProperty(model, key, {
				get: function() {
					return this._internalModel[key];
				}
			});
		}
	});

	const InternalModel = Immutable.Record(classDef.definition);
	model._internalModel = new InternalModel(props);

	//model.actions = buildActions(model.actions, model.actionTypes);

	return model;
}

function buildActions(actions, actionTypes) {
	let actionList = {};
	let dispatcher = new Dispatcher();

	eachProperty(actions, (val, key) => {
		actionList[camelize(key)] = (...props) => {
			let disp = { type: actionTypes[underscore(key).toUpperCase()] };
			props.forEach((value, index) => disp[val[index]] = value);

			console.log('dispatcher', disp);
			dispatcher.dispatch(disp);
		};
	});

	return actionList;
}

