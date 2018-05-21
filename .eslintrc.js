module.exports = {
  root: true,
	parser: "babel-eslint",
  plugins: [
    'react'
  ],
  extends: [
		'eslint:recommended',
		"plugin:react/recommended"
  ],
  env: {
    browser: true
	},
	settings: {
		ecmascript: "es2015",
		jsx: true
	},
	rules: {
		"react/react-in-jsx-scope": 0,
		"react/jsx-uses-react": 2,
		"react/prop-types": 0,
		"no-global-assign": 2,
		//"strict": 0,
		//"quotes": 0,
		//"no-unused-vars": 0,
		//"no-underscore-dangle": 0
	},
	globals: {
		Promise: true, Map: true, module: true, Symbol: true,
		__APP__: true, __FEATURES__: true,
		__webpack_require__: true, require: true
	},
	overrides: [
    {
      files: [
        'webpack.config.js',
				'config/**/*.js',
				'tools/**/*.js',
				'./.storybook/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    }
	]
};
