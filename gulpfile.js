const gulp = require('gulp')
const tsc = require('gulp-typescript')
const through2 = require('through2')

const rewriterCore = () => {
	return through2.obj(function (file, _, cb) {
		const identifier = new RegExp('@/core', 'g')
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
})

gulp.task('build-main', function () {
	return gulp
		.src('build/**/*.ts')
		.pipe(tsDtsProject())
		.on('error', function (err) {
			process.exit(1)
		})
		.dts.pipe(gulp.dest('lib'))
})

gulp.task('build-core', function () {
	return gulp
		.src('src/core/**/*.ts')
		.pipe(tsDtsProject())
		.on('error', function (err) {
			process.exit(1)
		})
		.dts.pipe(rewriterCore())
		.pipe(gulp.dest('lib'))
})

gulp.task('build', gulp.series('build-core', 'build-main'))

gulp.task('default', gulp.series('build'))
