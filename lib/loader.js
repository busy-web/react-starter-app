/**
 * @module Loader
 *
 */
function pluralize(name) {
	if (/y$/.test(name)) {
		name = name.replace(/y$/, 'ies');
	} else {
		name = name.replace(/s$/, '') + 's';
	}
	return name;
}

export default function loader() {
	function injectFactory(name) {
		let [ dir, file ] = name.split(':');
		window.console.log('loader.injectFactory', name, dir, file);
		if (/service/.test(dir)) {
			throw new Error("injectInstance must be used to inject services");
		}
		dir = pluralize(dir);
		let mod = require(`${dir}/${file}`);
		return mod;
	}

	function injectInstance(name) {
		let [ dir, file ] = name.split(':');
		window.console.log('loader.injectInstance', name, dir, file);
		if (/service/.test(dir)) {
			return loadService(file);
		}
		let factory = injectFactory(name);
		return new factory();
	}

	const SERVICE = "__gsib__";
	window[SERVICE] = {};

	function loadService(name) {
		if (!window[SERVICE][name]) {
			let service = require(`services/${name}`);
			window[SERVICE][name] = new service();
		}
		return window[SERVICE][name];
	}

	return { injectFactory, injectInstance };
}
