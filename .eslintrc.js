module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  extends: [
    'eslint:recommended'
  ],
  env: {
    browser: true
  },
  rules: {
	},
	overrides: [
    {
      files: [
        'webpack.config.js',
        'config/**/*.js',
				'./.storybook/**/*.js'
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
