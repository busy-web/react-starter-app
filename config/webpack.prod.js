
const merge = require('webpack-merge');
//const MinifyPlugin = require('babel-minify-webpack-plugin');
//const common = require('../webpack.config.js');

//console.log(common.__dirname);

module.exports = function(environment, argv) {
	environment = environment || 'production';
	return merge(common(environment, argv), {
		//mode: environment,

		// output: {
		//   filename: "app-[hash].min.js",
		//   chunkFilename: "[name]-[hash].min.js",
		//   publicPath: '',
		// },

		// optimization: {
		//   splitChunks: {
		//     automaticNameDelimiter: '.',
		//     cacheGroups: {
		//       vendors: {
		//         test: /[\\/]node_modules[\\/]/,
		//         priority: -10,
		//         chunks: "all"
		//       },
		//       busyweb: {
		//         test: /[\\/]busyweb[\\/]/,
		//         priority: -30,
		//         chunks: "all"
		//       }
		//     }
		//   }
		// },

		plugins: [
			//new MinifyPlugin()
		]
	});
}
