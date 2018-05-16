
const merge = require('webpack-merge');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const common = require('../webpack.config.js');

module.exports = function(env, argv) {
	return merge(common(env, argv), {
		mode: 'production',

		plugins: [
			new MinifyPlugin()
		]
	});
}
