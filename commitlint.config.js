const types = ['test', 'feat', 'fix', 'chore', 'docs', 'refactor', 'style', 'ci', 'perf']

module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [2, 'always', types],
	},
}
