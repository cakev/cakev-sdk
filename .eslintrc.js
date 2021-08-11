module.exports = {
	root: true,
	env: {
		node: true,
	},
	globals: {
		echarts: true,
	},
	extends: [
		'plugin:vue/essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'@vue/prettier',
		'@vue/prettier/@typescript-eslint',
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'@typescript-eslint/ban-ts-comment': 0,
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/ban-types': 'off',
	},
}
