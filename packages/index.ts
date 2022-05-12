import type { VueConstructor } from 'vue'

import '@/vue2/scss/conf.scss'
import '@/vue2/scss/index.scss'
import '@/vue2/scss/animate.scss'

import dDetail from './vue2/components-open/d-detail/index.vue'
import dView from './vue2/components-open/d-view/index.vue'
import dScreen from './vue2/components-open/d-screen/index.vue'
import Editor from './core/Editor'
import WidgetTask from './core/Widget/task'

const components = [dDetail, dView, dScreen]
const editor: Editor = Editor.Instance()
const install = (Vue: VueConstructor, option?): void => {
	if (option) editor.config.setConfig(option)
	components.forEach(component => {
		Vue.component(component.name, component)
	})
}
const version = process.env.version
const sdk = {
	version,
	install,
	...components,
	Editor,
	WidgetTask,
}

if (window !== undefined) {
	if (!window['cakeV-sdk']) {
		window['cakeV-sdk'] = sdk
	}
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

export { version, dDetail, dView, dScreen, Editor, WidgetTask }
export default sdk
