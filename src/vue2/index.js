import widgetMixin from '@/vue2/mixins'
import dScreen from '@/vue2/components-open/d-screen/index.vue'
import dDetail from '@/vue2/components-open/d-detail/index.vue'
import dShareDialog from '@/vue2/components-open/d-share-dialog/index.vue'
import dView from '@/vue2/components-open/d-view/index.vue'
import loadMask from '@/vue2/components-open/load-mask/index.vue'
import dImage from '@/vue2/components-open/d-image/index.vue'
import '@/vue2/plugin.js'
import colorTheme from '@/core/colorTheme'
import widgetEcharts from '@/vue2/components-open/Widget/echarts.vue'
import widgetNormal from '@/vue2/components-open/Widget/normal.vue'
import { mixins } from 'vue-class-component'

const widgetNormalMixin = mixins(widgetMixin)

const eslinkV = {
	widgetNormalMixin,
	widgetMixin,
	widgetEcharts,
	widgetNormal,
	colorTheme,
	dScreen,
	dShareDialog,
	dDetail,
	dView,
	loadMask,
	dImage,
}
if (window !== undefined) {
	if (!window.eslinkV) {
		window.eslinkV = {}
	}
	window.eslinkV = { ...window.eslinkV, ...eslinkV }
}

export {
	widgetNormalMixin,
	widgetMixin,
	widgetEcharts,
	widgetNormal,
	colorTheme,
	dScreen,
	dDetail,
	dShareDialog,
	dView,
	loadMask,
	dImage,
}
export default eslinkV
