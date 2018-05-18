/**
 * @module Config.Rules
 *
 */

/**
 * `FileLoader`
 *
 */
module.exports = () => {
	return {
		test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
		use: [
			{
				loader: 'url-loader',
				options: {
					limit: 8192,
					regExp: /public\/(.*)$/,
					name: '[1][name].[hash].[ext]',
					publicPath: '/assets/',
					outputPath: 'assets/',
				}
			}
		]
	};
};
