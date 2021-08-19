const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
const needReport = false
const resolve = dir => {
	return path.join(__dirname, dir)
}

module.exports = {
	assetsDir: './',
	filenameHashing: false,
	productionSourceMap: false,
	lintOnSave: false,
	devServer: {
		port: 3000,
		hot: true,
		open: true,
		historyApiFallback: true,
		disableHostCheck: true,
	},
	css: {
		extract: true,
		sourceMap: false,
	},
	configureWebpack: config => {
		config.resolve.extensions = ['.js', '.vue', '.json', '.ts', '.tsx']
	},
	chainWebpack: config => {
		config.module.rule('svg').exclude.add(resolve('src/icon')).end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/icon'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'dorring-[name]',
			})
			.end()
		if (isProduction) {
			if (needReport) {
				config
					.plugin('webpack-bundle-analyzer')
					.use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
					.end()
			}
			config.plugins.delete('prefetch')
		} else {
			config.resolve.symlinks(true)
		}
	},
}
