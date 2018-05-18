/**
 * @module Config.Rules
 *
 */
const path = require('path');

/**
 * `Scripts`
 *
 */
module.exports = ({ dir }) => {
	return {
		test: /\.jsx?$/,
		use: ['babel-loader'],
		include: [
			path.resolve(dir, 'app'),
			path.resolve(dir, 'busyweb')
		],
	};
};
