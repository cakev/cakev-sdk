module.exports = {
	types: [
		{
			value: 'feat',
			name: '✨  feat:        增加新特性/新功能 (A new feature)',
		},
		{
			value: 'fix',
			name: '🐞 fix:         修复bug (A bug fix)',
		},
		{
			value: 'refactor',
			name: '🛠 refactor:    重构 (A code change that neither fixes a bug nor adds a feature)',
		},
		{
			value: 'docs',
			name: '📚 docs:        仅包含文档的修改 (Documentation only changes)',
		},
		{
			value: 'test',
			name: '🏁 test:        添加或修改测试代码 (Add missing tests or correcting existing tests)',
		},
		{
			value: 'chore',
			name: "🗯 chore:       杂项修改 (Changes that don't modify src or test files. Such as updating build tasks, package manager)",
		},
		{
			value: 'style',
			name: '💅 style:       格式化修改 (Code Style, Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc))',
		},
		{
			value: 'revert',
			name: '⏪  revert:      撤销某次提交 (Revert to a commit)',
		},
		{
			value: 'perf',
			name: '📈 perf:        提高性能的修改 (A code change that improves performance)',
		},
	],
	messages: {
		type: "Select the type of change that you're committing:",
		scope: '\nDenote the SCOPE of this change (optional):',
		// used if allowCustomScopes is true
		customScope: 'Denote the SCOPE of this change:',
		subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
		body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
		breaking: 'List any BREAKING CHANGES (optional):\n',
		footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
		confirmCommit: 'Are you sure you want to proceed with the commit above?',
	},

	// allowCustomScopes: true,
	allowBreakingChanges: ['feat', 'fix'],
	// skip any questions you want
	skipQuestions: ['scope', 'customScope', 'breaking', 'footer', 'body'],

	// limit subject length
	// subjectLimit: 100,
	scopes: [],
	// allowCustomScopes: true,
	// allowBreakingChanges: ['feat', 'fix'],
}
