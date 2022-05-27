import type { VueConstructor } from 'vue'

import '@/vue2/scss/index.scss'
import '@/vue2/scss/animate.scss'

import detail from './vue2/components/d-detail/index.vue'
import view from './vue2/components/d-view/index.vue'
import screen from './vue2/components/d-screen/index.vue'
import cWidget from './vue2/components/c-widget/normal.vue'
import Editor from './core/Editor'
import WidgetTask from './core/Widget/task'

const components = [detail, view, screen, cWidget]
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
	Editor: Editor.Instance(),
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

export { version, detail, view, screen, cWidget, Editor, WidgetTask }
export default sdk
