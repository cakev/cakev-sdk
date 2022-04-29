const pkg = require('./package.json')
const isProduction = process.env.NODE_ENV === 'production'
const proxyUrl = 'http://127.0.0.1:7001'

module.exports = {
	transpileDependencies: ['@simonwep', 'swiper', 'dom7'],
	assetsDir: './',
	publicPath: isProduction ? `/${pkg.version}` : '/',
	outputDir: `dist/${pkg.version}`,
	indexPath: '../index.html',
	filenameHashing: false,
	productionSourceMap: false,
	lintOnSave: false,
	devServer: {
		port: 3000,
		hot: true,
		open: true,
		historyApiFallback: true,
		disableHostCheck: true,
		proxy: {
			'^/node': {
				target: proxyUrl,
				changeOrigin: true,
				// pathRewrite: {
				// 	'^/node': '/',
				// },
			},
			'^/server': {
				target: proxyUrl,
				changeOrigin: true,
				// pathRewrite: {
				// 	'^/server': '/',
				// },
			},
			'^/cdn': {
				target: proxyUrl,
				changeOrigin: true,
				// pathRewrite: {
				// 	'^/cdn': '/',
				// },
			},
		},
	},
	css: {
		extract: process.env.VUE_APP_BUILD_MODE === 'NPM',
		sourceMap: false,
	},
	configureWebpack: config => {
		config.resolve.extensions = ['.js', '.vue', '.json', '.ts', '.tsx']
		if (process.env.VUE_APP_BUILD_MODE === 'NPM') {
			config.externals = [
				{
					vue: {
						root: 'Vue',
						commonjs: 'vue',
						commonjs2: 'vue',
						amd: 'vue',
					},
					'vue-router': 'VueRouter',
					echarts: 'echarts',
				},
			]
		} else {
			config.externals = [
				{
					vue: 'Vue',
					'vue-router': 'VueRouter',
					echarts: 'echarts',
				},
			]
		}
	},
	chainWebpack: config => {
		config.module.rule('vue').use('iview').loader('iview-loader').options({ prefix: false })
		config.module
			.rule('view-design')
			.test(/view-design.src.*?js$/)
			.use('babel')
			.loader('babel-loader')
			.end()
		if (isProduction) {
			config.plugins.delete('prefetch')
		} else {
			config.resolve.symlinks(true)
		}
	},
}
