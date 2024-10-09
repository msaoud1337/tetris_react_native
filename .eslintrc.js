module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react'],
	env: {
		browser: true,
		node: true,
	},
	rules: {
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/no-require-imports': 'off',
		'no-unused-vars': 'warn',
		'react/no-unescaped-entities': 'off',
		'react/prop-types': 'off',
		'@typescript-eslint/no-explicit-any': 'error', // Disallow usage of any
	},
};
