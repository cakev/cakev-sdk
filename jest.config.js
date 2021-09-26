const path = require('path')

module.exports = {
	rootDir: path.resolve(__dirname),
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
	moduleNameMapper: {
		'@dorring/sdk/(.*)$': '<rootDir>/packages/$1',
	},
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
	setupFiles: ['<rootDir>/tests/globals-test.ts'],
	transform: {
		'^.+\\.vue$': 'vue-jest',
		'^.+\\js$': 'babel-jest',
		'^.+\\.(t|j)sx?$': 'ts-jest',
	},
}
