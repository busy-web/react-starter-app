
require('dotenv').config();

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//const MinifyPlugin = require('babel-minify-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

// const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const envConfig = require('./config/environment');

module.exports = function(buildType) {
	let { env, mode } = getMode(buildType);
	const { config, application, features } = envConfig(env);

	// boolean flag for production optimizations
	const isProd = env === 'production';

	function getRule(name) {
		const fp = './config/rules/' + name;
		return require(fp).call(null, { env, dir: __dirname });
	}

	return {
		target: "web",
		mode: mode,
		context: __dirname,

		entry: { bundle: './app/main' },
		output: {
			filename: (!isProd ? "app.bundle.js" : "app-[hash].min.js"),
			chunkFilename: (!isProd ? "[name].js" : "[name]-[hash].min.js"),
			path: path.resolve(__dirname, "dist"),
			publicPath: '',
			library: "application",
		},

		optimization: {
			splitChunks: {
				automaticNameDelimiter: '.',
				cacheGroups: {
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						priority: -10,
						chunks: "all"
					},
					busyweb: {
						test: /[\\/]busyweb[\\/]/,
						priority: -20,
						chunks: "all"
					},
					/* style: {
						test: /[\\/]styles[\\/]/,
						priority: -30,
						chunks: "all",
						enforce: true
					} */
				}
			},

			minimizer: [
				//new MinifyPlugin({}),
				new UglifyJsPlugin({
					cache: true,
					parallel: true,
					sourceMap: true // set to true if you want JS source maps
				}),
				new OptimizeCSSAssetsPlugin({})
			]
		},

		resolve: {
			modules: ['node_modules'],

			// Add '.ts' and '.tsx' as resolvable extensions.
			extensions: [".jsx", ".js", ".json", ".css", '.scss'],

			alias: {
				"@app": path.resolve(__dirname, "app"),
				"@busyweb": path.resolve(__dirname, "busyweb"),
				//"@public": path.resolve(__dirname, "public")
			}
		},

		module: {
			rules: [
				getRule('scripts'),
				getRule('styles'),
				getRule('files')
			]
		},

		plugins: [
			new HtmlWebpackPlugin({
				favicon: config.favicon,
				title: config.name,
				template: './app/index.html',
			}),

			new MiniCssExtractPlugin({
				filename: !isProd ? 'app.bundle.css' : 'app.bundle.css',
				//chunkFilename: !isProd ? '[name].css' : '[name].[hash].css',
			}),

			new webpack.DefinePlugin({
				__APP__: JSON.stringify(application),
				__FEATURES__: JSON.stringify(features)
			}),

			new webpack.ProvidePlugin({ React: "react", cryptojs: "crypto-js" }),

			new CleanWebpackPlugin(['dist']),
			new webpack.HotModuleReplacementPlugin(),

			// new CopyWebpackPlugin([
			//   { from: 'public/', to: path.resolve(__dirname, 'dist/assets') }
			// ])
		],

		// set devtool to sourcemaps
		devtool: (isProd ? 'none' : "source-map"),

		// setup dev server
		devServer: {
			hot: true,
			contentBase: './dist',
			compress: true,

			//quiet: config.quiet,
			//noInfo: config.noInfo,
			//stats: config.stats,
			clientLogLevel: config.client_log_level,

			host:	config.host,
			port: config.port,
		}
	};
};

function getMode(env) {
	let mode = 'none';
	if (env === 'dev' || env === 'development') {
		env = 'development';
		mode = env;
	} else if (env === 'prod' || env === 'production') {
		env = 'production';
		mode = env;
	}
	return { mode, env };
}

// export the base dir
module.exports.__dirname = __dirname;
