module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true,
		jest: true,
	},
	plugins: ['react'],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	rules: {
		'semi': ['error', 'always'],
		'quotes': ['error', 'single'],
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		'global-require': 0,
		'operator-linebreak': [2, 'before'],
		'requireConfigFile': 0,
		'react/prop-types': 0
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
};
