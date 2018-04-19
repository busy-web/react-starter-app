module.exports = {
  root: true,
	parser: "babel-eslint",
  plugins: [
    'react'
  ],
  extends: [
    'eslint:recommended',
  ],
  env: {
    browser: true
	},
	settings: {
		ecmascript: 6,
		jsx: true
	},
	rules: {
		//"strict": 0,
		//"quotes": 0,
		//"no-unused-vars": 0,
		//"no-underscore-dangle": 0
	},
	overrides: [
    {
      files: [
        'webpack.config.js',
        'config/**/*.js',
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
