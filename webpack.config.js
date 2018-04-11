
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');



module.exports = {
	entry: {
		app: "./app/index"
	},

	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".d.ts", ".js", ".json", ".css"],
		alias: { "smartbot": path.resolve(__dirname, "app") }
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Smart Bot',
			template: './app/index.html'
		}),
		new CleanWebpackPlugin(['dist']),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
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
				test: /\.tsx?$/,
				use: ['babel-loader', 'ts-loader']
			},
			//{
			//	test: /\.(png|svg|jpg|gif)$/,
			//	use: ['file-loader']
			//},
			//{
			//	test: /\.(woff|woff2|eot|ttf|otf)$/,
			//	use: ['file-loader']
			//}
		]
	},

	devServer: {
		contentBase: './dist',
		hot: true
	}
};
