
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const FlowWebpackPlugin = require('flow-webpack-plugin');
const pkg = require('./package.json');

module.exports = {
	target: "web",

	entry: {
		app: "./src/index"
	},

	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".jsx", ".js", ".json", ".css"],
		alias: { "@app": path.resolve(__dirname, "src") }
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: pkg.name,
			template: './src/index.html'
		}),

		new CleanWebpackPlugin(['dist']),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),

		new FlowWebpackPlugin({
			failOnError: false,
			failOnErrorWatch: false,
			reportingSeverity: 'error',
			printFlowOutput: true,
			flowPath: require.main.require('flow-bin'),
			flowArgs: ['--color=always'],
			verbose: false,
			callback: (result) => {}
		})
	],

	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: "style-loader",
						options: {
							hmr: false
						}
					},
					{
						loader: "css-loader",
						options: {
							alias: { "@app": path.resolve(__dirname, "src") }
						}
					},
					{
						loader: "sass-loader",
						//options: {
						//	includePaths: []
						//}
					}
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
		contentBase: './dist',
		hot: true
	}
};
