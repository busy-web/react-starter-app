
const merge = require('webpack-merge');
const common = require('../webpack.config.js');

module.exports = function(env, argv) {
	return merge(common(env, argv), {
		mode: 'development',

		// Enable sourcemaps for debugging webpack's output.
		devtool: "source-map",
	});
};
