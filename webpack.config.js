/**
 * @module webpack.config
 *
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const MinifyPlugin = require('babel-minify-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const envConfig = require('./config/environment');


/**
 * output names map for dev and prod settings.
 * this uses the `mode` variable to map the different
 * states
 */
const OUTPUT_MAP = {
	production: {
		"js.f_name": "app.[hash].min.js",
		"js.cf_name": "[name].[hash].min.js",
		"css.f_name": "app.[hash].min.css",
		"css.cf_name": "[name].[hash].min.css"
	},
	development: {
		"js.f_name": "app.bundle.js",
		"js.cf_name": "[name].js",
		"css.f_name": "app.bundle.css",
		"css.cf_name": "[name].css"
	},
	none: {
		"js.f_name": "app.bundle.js",
		"js.cf_name": "[name].js",
		"css.f_name": "app.bundle.css",
		"css.cf_name": "[name].css"
	}
};


/**
 * export function for webpack.config
 */
module.exports = function(buildType) {
	let { env, mode } = getMode(buildType);
	const { config, application, features } = envConfig(env);

	// project root directory for package.json and node_modules
	const context = __dirname;

	// boolean flag for production optimizations
	const isProd = env === 'production';

	// should webpack minimize the code
	const minimize = isProd;

	// directory for application builds
	const buildDir = path.resolve(context, "dist");

	// assets build directory
	// const assetsDir = path.resolve(context, 'dist/assets');


	// webpack config options
	return {
		target: "web", // ------------------------------------------ platform to build code for. [ web | node ]
		mode, // --------------------------------------------------- production, development, or none
		context, // ------------------------------------------------ project root dir

		// application entry settings
		entry: {
			bundle: './app/main' // ---------------------------------- relative path to entry file
		},

		// application output settings
		output: {
			filename: OUTPUT_MAP[mode]['js.f_name'],	// ------------- bundle output filename
			chunkFilename: OUTPUT_MAP[mode]['js.cf_name'], // -------- bundle output chunked filename
			path: buildDir, // --------------------------------------- absolute path to output build files
			publicPath: '', // --------------------------------------- public file path for browser links
			library: "application", // ------------------------------- bundle file namespace
		},

		// webpack optimization settings
		optimization: {
			minimize, // --------------------------------------------- should webpack minimize code. type {boolean} true in prod
			//nodeEnv: false,

			// Define how the application will break up code into
			// smaller optimized chunks for better performance
			splitChunks: {
				automaticNameDelimiter: '.', // ------------------------ chunk file naming delimiter char

				// splitchunks cache groups to split up bundles by
				cacheGroups: {
					// create a vendor bundle
					vendors: {
						test: /[\\/]node_modules[\\/]/, // ----------------- file type regex test
						priority: -10, // ---------------------------------- where in the list script imprts should this be included
						//chunks: "all" // -----------------------------------
					},

					// create a busyweb lib bundle
					busyweb: {
						test: /[\\/]busyweb[\\/]/,
						priority: -20,
						//chunks: "all"
					},

					// create a style css bundle
					styles: {
						test: /[\\/]styles[\\/]/,
						priority: -30,
						//chunks: "all",
						//enforce: true,
						reuseExistingChunk: false
					},

					default: {
						priority: -40,
						reuseExistingChunk: false
					}
				}
			},

			// minimizer config settings for production builds only
			// this can be defined and webpack will ignore it in
			// non prod builds
			minimizer: [
				// babel minifier plugin
				// new MinifyPlugin({}),

				// uglify js plugin
				new UglifyJsPlugin({
					cache: true, // -------------------------------------- cache minified file builds
					parallel: true, // ----------------------------------- process chunk files in parallel
					sourceMap: true, // ---------------------------------- create JS source maps
					exclude: /styles/, // -------------------------------- exclude files regular expression
				}),

				// css minifier plugin
				new OptimizeCSSAssetsPlugin({})
			]
		},

		// webpack module settings
		module: {
			// module build rules for different file types
			rules: [
				getRule('files', env, context), // --------------------- IMG && FONTS rules module
				getRule('styles', env, context), // -------------------- CSS && SCSS rules module
				getRule('scripts', env, context),	// ------------------- JS && JSX rules module
			]
		},

		// webpack reseolver settings
		resolve: {
			// directories the resolver should recurse for imports
			modules: ['node_modules'],

			// file extensions allowed to import with module resolver
			extensions: [".jsx", ".js", ".json", ".css", '.scss'],

			// alias resolve paths for imports
			alias: {
				"@app": path.resolve(context, "app"), // --------------- alias for app directory
				"@busyweb": path.resolve(context, "lib"), // ----------- alias for busyweb directory. This is a temp alias
				// "@public": path.resolve(context, "public") // ------- alias for public directory.
			}
		},

		// webpack plugins helpers
		plugins: [
			// html template loader plugin
			new HtmlWebpackPlugin({
				template: path.resolve(context, 'app/index.html'), // -- path to index.html template file
				title: config.title, // -------------------------------- title for index.html
				favicon: config.favicon // ----------------------------- favicon file path
			}),

			// CSS bundler plugin. extracts css from
			// js bundle to create css bundles
			new MiniCssExtractPlugin({
				filename: OUTPUT_MAP[mode]['css.f_name'], // ----------- file naming template string
				chunkFilename: OUTPUT_MAP[mode]['css.cf_name'] // ------ chunked file naming template string
			}),

			// define application global properties
			new webpack.DefinePlugin({
				__APP__: JSON.stringify(application),	// --------------- `__APP__` Application config global
				__FEATURES__: JSON.stringify(features), // -------------- `__FEATURES__` Feature flag global
				//'process.env.NODE_ENV': env
			}),

			// provides imports for node_models
			new webpack.ProvidePlugin({
				React: "react",	// ------------------------------------- import for react
				cryptojs: "crypto-js"	// ------------------------------- import for cryptojs
			}),

			// removes last build before creating new builds
			new CleanWebpackPlugin(['dist']), // --------------------- directories to clean before build

			// hot module loader plugin
			new webpack.HotModuleReplacementPlugin(),

			// new CopyWebpackPlugin([
			//	{
			//		from: 'public/', // -------------------------------- relative path to copy files from
			//		to: assetsDir // ----------------------------------- absolute path to copy files to
			//	}
			// ])
		],

		//externals: ['react'],

		// set devtool to sourcemaps
		devtool: "source-map",  // --------------------------------- build sourmap files with bundled code

		stats: (config.stats || 'errors-only'), // ----------------- log info in terminal. `errors-only` `minimal` `none` `normal` `verbose`

		// dev server options
		devServer: {
			hot: true, // -------------------------------------------- hot load resources
			contentBase: './dist', // -------------------------------- path to serve app from
			compress: true,	// --------------------------------------- gzip files
			host:	(config.host || 'localhost'), // ------------------- host domain for viewing in browser. Default: localhost
			port: (config.port || 4200), // -------------------------- port for viewing in browser. Default: 4200
			quiet: (config.quiet || false), // ----------------------- supress log info in terminal including errors and warnings
			stats: (config.stats || 'errors-only'), // --------------- log info in terminal. `errors-only` `minimal` `none` `normal` `verbose`
			clientLogLevel: (config.client_log_level || 'info'), // -- log info to browser. `none` `error` `warning` `info`
		}
	};
};


/**
 * Require wrapper for rules modules.
 * Rules modules are defined in `config/rules`.
 *
 * @private
 * @method getRule
 * @param name {string} rules module name in config/rules
 * @return {module}
 */
function getRule(name, env, dir) {
	const fp = './config/rules/' + name;
	return require(fp).call(null, { env, dir });
}

/**
 * The `mode` value is a webpack setting that provides default webpack plugins
 *
 * options are `development`, `production`, and `none`:
 *
 * development: Provides process.env.NODE_ENV with value `development`. Enables
 *							NamedChunkPlugin and NamedModulesPlugin
 *
 * production:	Provides process.env.NODE_ENV with value `production`. Enables
 *							FlagDependencyUsagePlugin, FlagIncludedChunksPlugin,
 *							ModuleConcatenationPlugin, NoEmitOnErrorsPlugin,
 *							OccuranceOrderPlugin, SideEffectsFlagPlugin, and
 *							UglifyJsPlugin
 *
 * This method uses `development` flag for dev and `production` flag for prod
 * and it will set `none` flag for all other options. (alpha, beta, ...)
 *
 * `env` param allows for shorthand versions of `production` as `prod` and `development` as `dev`
 *
 * @private
 * @method getMode
 * @param env {string} environment build string [dev, alpha, beta, ...prod]
 * @return { env: string, mode: string }
 */
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
