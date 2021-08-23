module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-recess-order', // 检查属性顺序
		'stylelint-config-prettier',
	],
	plugins: ['stylelint-scss'],
	rules: {
		indentation: 'tab',
		// 禁止使用可以缩写却不缩写的属性
		'declaration-block-no-redundant-longhand-properties': true,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'extend',
					'at-root',
					'debug',
					'warn',
					'error',
					'if',
					'else',
					'for',
					'each',
					'while',
					'mixin',
					'include',
					'content',
					'return',
					'function',
				],
			},
		],
		'selector-pseudo-element-no-unknown': [
			true,
			{
				ignorePseudoElements: ['v-deep'],
			},
		],
		'no-descending-specificity': null,
	},
}
