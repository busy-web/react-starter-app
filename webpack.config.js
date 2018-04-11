
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const FlowWebpackPlugin = require('flow-webpack-plugin');

module.exports = {
	target: "web",

	entry: {
		app: "./app/index"
	},

	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".jsx", ".js", ".json", ".css"],
		alias: { "smartbot": path.resolve(__dirname, "app") }
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Smart Bot',
			template: './app/index.html'
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
				test: /\.css$/,
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
							alias: { "smartbot": path.resolve(__dirname, "app") }
						}
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
