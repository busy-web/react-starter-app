
require('dotenv').config();

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const pkg = require('./package.json');

module.exports = {
	target: "web",

	entry: ['babel-polyfill', './app/loader'],

	output: {
		filename: "application.js",
		path: path.resolve(__dirname, "dist")
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

		new webpack.ProvidePlugin({
			React: "react",
			cryptojs: "crypto-js"
		})
	],

	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{ loader: "style-loader", options: { hmr: false }},
					{ loader: "css-loader", options: { alias: { "@app": path.resolve(__dirname, "app") }}},
					{ loader: "sass-loader" }
				]
			},
			{
				test: /\.jsx?$/,
				use: ['babel-loader']
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader']
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			},
			{
				test: /^@config/,
				use: ['node-loader']
			}
		]
	},

	devServer: {
		hot: true,
		quiet: false,
		noInfo: false,
		stats: "errors-only",
		clientLogLevel: 'error',
		contentBase: './dist',

		host: process.env.HOST || 'localhost',
		port: process.env.PORT || '4200'
	}
};
