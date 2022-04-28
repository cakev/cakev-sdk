module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			[
				'feat', // 新功能
				'fix', // 修复问题
				'docs', // 修改文档
				'style', // 修改代码格式，不影响代码逻辑
				'refactor', // 重构代码，理论上不影响现有功能
				'perf', // 提升性能
				'test', // 增加修改测试用例
				'chore', // 修改工具相关（包括但不限于文档、代码生成等）
				'deps', // 升级依赖

				'publish', // 发布
				'build', // 构建
				'ci', // 持续集成
				'bug', // 此项特别针对bug号，用于向测试反馈bug列表的bug修改情况
				'revert', // feat(pencil): add ‘graphiteWidth’ option (撤销之前的commit)
				'merge', // 合并分支， 例如： merge（前端页面）： feature-xxxx修改线程地址
			],
		],
	},
}
