
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const pkg = require('./package.json');

module.exports = {
	target: "web",

	entry: ['babel-polyfill', './src/loader'],

	output: {
		filename: "application.js",
		path: path.resolve(__dirname, "dist")
	},

	resolve: {
		modules: ['node_modules'],

		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".jsx", ".js", ".json", ".css", '.scss'],
		alias: {
			"@app": path.resolve(__dirname, "src")
		}
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: pkg.name,
			template: './src/index.html'
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
					{ loader: "css-loader", options: { alias: { "@app": path.resolve(__dirname, "src") }}},
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
			}
		]
	},

	devServer: {
		hot: true,
		stats: "errors-only",
		contentBase: './dist',

		host: process.env.HOST || 'localhost',
		port: process.env.PORT || '4200'
	}
};
