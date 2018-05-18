
const merge = require('webpack-merge');
const common = require('../webpack.config.js');
const webpack = require('webpack');

module.exports = function(environment, argv) {
	environment = environment || 'development';
	return merge(common(environment, argv), {
		// Enable sourcemaps for debugging webpack's output.
		devtool: "source-map",

		plugins: [
			new webpack.NamedModulesPlugin(),
		]
	});
};
