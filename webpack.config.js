
require('dotenv').config();

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const pkg = require('./package.json');

module.exports = function(environment /*, argv*/) {
	environment = environment || 'development';

	const ENV = {
		target: "web",

		entry: {
			bundle: './app/main',
		},

		output: {
			chunkFilename: "[name].js",
			path: path.resolve(__dirname, "dist"),
			publicPath: '/',
			library: "application",
		},

		optimization: {
			splitChunks: {
				automaticNameDelimiter: '-',
				cacheGroups: {
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						priority: -10,
						chunks: "all"
					},
					config: {
						test: /[\\/]config[\\/]/,
						priority: -20,
						chunks: "all"
					},
					busyweb: {
						test: /[\\/]busyweb[\\/]/,
						priority: -30,
						chunks: "all"
					}
				}
			}
		},

		resolve: {
			modules: ['node_modules'],

			// Add '.ts' and '.tsx' as resolvable extensions.
			extensions: [".jsx", ".js", ".json", ".css", '.scss'],
			alias: {
				"@app": path.resolve(__dirname, "app"),
				"@busyweb": path.resolve(__dirname, "busyweb"),
				"@config": path.resolve(__dirname, "config")
			}
		},

		plugins: [
			new HtmlWebpackPlugin({
				title: pkg.name,
				template: './app/index.html'
			}),

			new CleanWebpackPlugin(['dist']),
			new webpack.NamedModulesPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			//new webpack.DefinePlugin({ env: JSON.stringify(process.env) }),

			new webpack.ProvidePlugin({
				React: "react",
				cryptojs: "crypto-js"
			})
		],

		module: {
			rules: [
				// {
				//   test: /\.jsx?$/,
				//   use: ['babel-loader'],
				//   include: [ path.resolve(__dirname, 'app'), path.resolve(__dirname, 'busyweb'), path.resolve(__dirname, 'config') ]
				// },
				{
					//test: /loader\.js$/,
					test: /\.jsx?$/,
					use: [
						{ loader: './config/deps-loader', options: { include: /loader/, alias: { '@app': path.resolve(__dirname, 'app') }, deps: ['services'] }},
						{ loader: 'babel-loader' }
					],
					include: [ path.resolve(__dirname, 'app'), path.resolve(__dirname, 'busyweb'), path.resolve(__dirname, 'config') ]
				},
				{
					test: /\.scss$/,
					use: [
						{ loader: "style-loader", options: { hmr: false }},
						{ loader: "css-loader", options: { alias: { "@app": path.resolve(__dirname, "app") }}},
						{ loader: "sass-loader" }
					],
					include: [ path.resolve(__dirname, 'app/styles') ]
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					use: ['file-loader']
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: ['file-loader']
				}
			]
		},

		devServer: {
			//hot: true,
			//quiet: false,
			//noInfo: false,
			//stats: "errors-only",
			clientLogLevel: 'error',
			contentBase: './dist',

			host: process.env.HOST || 'localhost',
			port: process.env.PORT || '4200'
		}
	};

	if (environment === 'development') {
		// additional config
	}

	if (environment === 'production') {
		// additional config
	}

	return ENV;
};
