/**
 * @module Loader
 *
 */
//import loader from '@busyweb/loader';
//export default loader();

/***/

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
	const baseDir = module.id.replace(/\/loader\.js/, '');

	function injectFactory(name) {
		let [ dir, file ] = name.split(':');
		if (/service/.test(dir)) {
			return loadService(file);
		}
		dir = pluralize(dir);
		let mod = __webpack_require__(`${baseDir}/${dir}/${file}`);
		return mod;
	}

	function injectInstance(name) {
		let [ dir, file ] = name.split(':');
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
			let service = __webpack_require__(`${baseDir}/services/${name}.js`);
			if (service.default) {
				service = service.default;
			}
			window[SERVICE][name] = new service();
		}
		return window[SERVICE][name];
	}

	return { injectFactory, injectInstance };
}
