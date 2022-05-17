const pkg = require('./package.json')
const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
const proxyUrl = 'http://127.0.0.1:7001'

const resolve = dir => {
	return path.join(__dirname, dir)
}

module.exports = {
	pages: {
		index: {
			entry: './play/main.ts',
		},
	},
	productionSourceMap: false,
	assetsDir: './',
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
			// config.externals = [{}]
		}
	},
	chainWebpack: config => {
		config.resolve.alias.set('@', resolve('packages'))
		config.plugin('define').tap(args => {
			args[0]['process.env'].version = JSON.stringify(pkg.version)
			return args
		})
		if (isProduction) {
			config.plugins.delete('prefetch')
			config.plugins.delete('prefetch')
		} else {
			config.resolve.symlinks(true)
		}
	},
}
