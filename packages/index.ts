import '@/vue2/scss/conf.scss'
import '@/vue2/scss/index.scss'

import Editor from './core/Editor'
import dDetail from './vue2/components-open/d-detail/index.vue'
import dView from './vue2/components-open/d-view/index.vue'
import dScreen from './vue2/components-open/d-screen/index.vue'
import widgetNormal from './vue2/components-open/Widget/normal.vue'
import widgetMixin from './vue2/components-open/Widget/mixins'

const version = process.env.version
const sdk = {
	version,
	Editor,
	dDetail,
	dView,
	dScreen,
	widgetNormal,
	widgetMixin,
}

if (window !== undefined) {
	if (!window['cakeV-sdk']) {
		window['cakeV-sdk'] = sdk
	}
}

export { version, Editor, dDetail, dView, dScreen, widgetNormal, widgetMixin }
export default sdk
