export default {
	install(app) {
		const conf = require.context('./', true, /conf\.ts$/)
		const vue = require.context('./', true, /index\.vue$/)
		const components = []
		vue.keys().forEach(name => {
			components.push(vue(name).default)
		})
		conf.keys().forEach((name, index) => {
			app.component(conf(name).default.type, components[index])
		})
	},
}
