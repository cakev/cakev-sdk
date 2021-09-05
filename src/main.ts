import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3Widgets from '@dorring/sdk/vue3-widgets'
import 'element-plus/lib/theme-chalk/index.css'
import '@dorring/sdk/vue3/scss/index.scss'
import '@dorring/sdk/vue3/scss/element-theme.scss'
import '@dorring/sdk/vue3/scss/dorring.scss'
import '@dorring/sdk/vue3/icon'

const app = createApp(App)
const components = require.context(
	'@dorring/sdk/vue3',
	true,
	/((components\/widget)|(components\/widget\-layer)).*\.vue$/,
)
components.keys().forEach(name => {
	const item = components(name).default
	if (item.name) {
		app.component(item.name, item)
	}
})

import ElementPlus from 'element-plus'

app.use(ElementPlus, { size: 'mini', zIndex: 3000, labelPosition: 'left' })
app.use(vue3Widgets)

app.use(router)
app.mount('#app')
