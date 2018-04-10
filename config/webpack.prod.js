
const merge = require('webpack-merge');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const common = require('../webpack.config.js');

module.exports = merge(common, {
	mode: 'production',

	plugins: [
		new MinifyPlugin()
	]
});
