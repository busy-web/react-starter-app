
const packageJSON = require('../package.json');
const featuresConfig = requireConfig('./features');
const devConfig = requireConfig('./dev');

devConfig.server = ifndef(devConfig.server, {});

/**
 * defines the config environment for
 * the application
 *
 */
module.exports = function(env) {
	// config settings for webpack
	const webpack = {
		name: packageJSON.name,

		// index html settings
		favicon: '', //./public/images/favicon.png',

		// dev server settings
		host: ifndef(devConfig.server.host, 'localhost'),
		port: ifndef(devConfig.server.port, '4200'),
		quiet: ifndef(devConfig.server.quiet, false),
		stats: ifndef(devConfig.server.stats, 'errors-only'),
		client_log_level: ifndef(devConfig.server.client_log_level, 'error'),
	};

	// config settings available in browser
	const application = {
		build: env,
		version: packageJSON.version,
		api: generateApiPath('alpha'),
		debug_mode: false,
		test_mode: false,
	};

	// imported config from ./features.js
	let features = featuresConfig;

	// setting overrides
	if (env === 'development') {
		webpack.favicon = './public/images/favicon_development.png';

		// override settings in app config
		application.build = ifndef(devConfig.build, env);
		application.debugMode = ifndef(devConfig.debug_mode, true);
		application.testMode	= ifndef(devConfig.test_mode, false);

		// allow features to be set in dev config
		features = merge(features, ifndef(devConfig.features, {}));

		// dev api override if not using api_name
		if (devConfig.api_name) {
			application.api = generateApiPath(devConfig.api_name);
		} else if (devConfig.api) {
			application.api = merge(application.api, devConfig.api);
		}
	}

	if (env === 'test') {
		webpack.favicon = './public/images/favicon_alpha.png';
		application.api = generateApiPath('alpha');
		application.test_mode = true;
	}

	if (env === 'canary') {
		webpack.favicon = './public/images/favicon_alpha.png';
		application.api = generateApiPath('alpha');
	}

	if (env === 'alpha') {
		webpack.favicon = './public/images/favicon_alpha.png';
		application.api = generateApiPath('alpha');
	}

	if (env === 'beta') {
		webpack.favicon = './public/images/favicon_beta.png';
		application.api = generateApiPath('beta');
	}

	if (env === 'staging') {
		webpack.favicon = './public/images/favicon_staging.png';
		application.api = generateApiPath('staging');
	}

	if (env === 'production') {
		application.api = {
			url: `https://api.busybusy.io`,
			qb: `https://qb.busybusy.io`,
			reports: `https://reports-api.busybusy.io`,
			platform: `https://reports-platform-api.busybusy.io`,
		};
	}

	return { config: webpack, application, features };
};

/**
 * HELPER METHODS
 *
 */

function generateApiPath(name) {
	return {
		url: `https://api-${name}.busybusy.io`,
		qb: `https://qb-${name}.busybusy.io`,
		reports: `https://reports-api-${name}.busybusy.io`,
		platform: `https://reports-platform-api-${name}.busybusy.io`,
	};
}

function merge(a, b) {
	// create new object c
	let c = {};

	// copy a to c
	if (a !== null && a !== undefined && typeof a === 'object') {
		Object.keys(a).forEach(k => {
			c[k] = a[k];
		});
	}

	//copy b to c
	if (b !== null && b !== undefined && typeof b === 'object') {
		Object.keys(b).forEach(k => {
			c[k] = b[k];
		});
	}

	// return new object c
	return c;
}

function requireConfig(path) {
	let conf;
	try { conf = require(path); }
	catch (e) { conf = {}; }
	return conf;
}

function ifndef(value, def) {
	if (ifdef(value)) {
		return value;
	}
	return def;
}

function ifdef(value) {
	return !!value;
}

