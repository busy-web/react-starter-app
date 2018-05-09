
const PKG = require('../package.json');

// load dev settings if they are defined
let DEV;
try { DEV = require('./dev.js'); }
catch (e) { DEV = {}; }

/**
 * defines the config environment for
 * the application
 *
 */
function createEnv(environment) {
	// main ENV config
	const ENV = {
		environment,
		version: PKG.version,
		debug: DEV.debug || false,
		api: generateApiPath(DEV.api_name || 'alpha')
	};


	if (environment === 'development') {
		// dev api override if not
		// using api_name
		if (DEV.api) {
			ENV.api = DEV.api;
		}
	}

	if (environment === 'canary') {
		ENV.api = generateApiPath('alpha');
	}

	if (environment === 'alpha') {
		ENV.api = generateApiPath('alpha');
	}

	if (environment === 'beta') {
		ENV.api = generateApiPath('beta');
	}

	if (environment === 'staging') {
		ENV.api = generateApiPath('staging');
	}

	if (environment === 'production') {
		ENV.api = {
			url: `https://api.busybusy.io`,
			qb: `https://qb.busybusy.io`,
			reports: `https://reports-api.busybusy.io`,
			platform: `https://reports-platform-api.busybusy.io`,
		};
	}

	return ENV
}

function generateApiPath(name) {
	return {
		url: `https://api-${name}.busybusy.io`,
		qb: `https://qb-${name}.busybusy.io`,
		reports: `https://reports-api-${name}.busybusy.io`,
		platform: `https://reports-platform-api-${name}.busybusy.io`,
	};
}

const environment = process.env.NODE_ENV;

module.exports = createEnv(environment);
