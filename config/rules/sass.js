/**
 * @module Config.Rules
 *
 */
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({ dir, env }) => {

	let dynamicLoader = MiniCssExtractPlugin.loader;
	// if (env === 'development') {
	//   dynamicLoader = {
	//     loader: "style-loader",
	//     options: {
	//       hmr: false
	//     }
	//   }
	// }

	return {
		test: /\.scss$/,

		use: [

			// style-loader || MiniCssExtractPlugin.loader
			dynamicLoader,

			// css-loader
			{
				loader: "css-loader",
				options: {
					importLoaders: 2,
					sourceMap: true,
					root: path.resolve(dir, "public")
				}
			},

			// postcss-loader
			{
				loader: "postcss-loader",
				options: {
					/* config: { path: './config/postcss.config.js' }, */
					sourceMap: true,
					ident: 'postcss',
					plugins: (/*loader*/) => {
						return [
							require('autoprefixer')()
						];
					}
				}
			},

			// sass-loader
			{
				loader: "sass-loader",
				options: { sourceMap: true }
			}
		],

		include: [ path.resolve(dir, 'app/styles') ]
	};
};
