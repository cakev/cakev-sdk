const gulp = require('gulp')
const tsc = require('gulp-typescript')
const through2 = require('through2')

const rewriterCore = () => {
	return through2.obj(function (file, _, cb) {
		const identifier = new RegExp('@dorring/sdk', 'g')
		const replacer = '..'
		file.contents = Buffer.from(file.contents.toString().replace(identifier, replacer))
		cb(null, file)
	})
}

const tsDtsProject = tsc.createProject('tsconfig.json', {
	declaration: true,
	target: 'ESNEXT',
	skipLibCheck: true,
	module: 'commonjs',
	paths: {
		'@dorring/sdk/*': ['packages/*'],
		tslib: ['node_modules/tslib/tslib.d.ts'],
	},
	baseUrl: '.',
})

gulp.task('build-dts', function () {
	return gulp.src('packages/**/*.ts').pipe(tsDtsProject()).dts.pipe(rewriterCore()).pipe(gulp.dest('dist/types'))
})

gulp.task('build', gulp.series('build-dts'))

gulp.task('default', gulp.series('build'))
