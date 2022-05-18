import { Project } from 'ts-morph'
import path from 'path'
import klawSync from 'klaw-sync'

const __dirname = path.resolve()
const TSCONFIG_PATH = path.resolve(__dirname, './tsconfig.json')
const dirs = klawSync('./packages', { nodir: true })
const project = new Project({
	compilerOptions: {
		allowJs: true,
		declaration: true,
		emitDeclarationOnly: true,
		noEmitOnError: true,
		outDir: path.resolve(__dirname, './types'),
		skipLibCheck: true,
	},
	tsConfigFilePath: TSCONFIG_PATH,
	skipAddingFilesFromTsConfig: true,
})
project.addSourceFilesAtPaths('./packages/**/*.ts')
dirs.map(item => {
	if (/\.ts$/.test(item.path)) {
		const arr = item.path.split('packages')[1]
		const sourceFiles = project.getSourceFileOrThrow(`packages${arr}`)
		sourceFiles.emitSync()
	}
})
