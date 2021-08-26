module.exports = {
	disableEmoji: false,
	list: ['test', 'feat', 'fix', 'chore', 'docs', 'refactor', 'style', 'ci', 'perf'],
	maxMessageLength: 64,
	minMessageLength: 3,
	questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'],
	scopes: [],
	types: {
		chore: {
			description: '修改工具相关',
			emoji: '🤖',
			value: 'chore',
		},
		ci: {
			description: '持续集成',
			emoji: '🎡',
			value: 'ci',
		},
		docs: {
			description: '仅包含文档的修改',
			emoji: '✏️',
			value: 'docs',
		},
		feat: {
			description: '增加新特性/新功能',
			emoji: '🎸',
			value: 'feat',
		},
		fix: {
			description: '修复bug',
			emoji: '🐞',
			value: 'fix',
		},
		perf: {
			description: '提高性能的修改',
			emoji: '⚡️',
			value: 'perf',
		},
		refactor: {
			description: '重构',
			emoji: '🛠',
			value: 'refactor',
		},
		release: {
			description: '发布',
			emoji: '🏹',
			value: 'publish',
		},
		style: {
			description: '格式化修改',
			emoji: '💄',
			value: 'style',
		},
		test: {
			description: '添加或修改测试代码',
			emoji: '🏁',
			value: 'test',
		},
	},
}
