import widgetMixin from '@/vue2/mixins'
import dScreen from '@/vue2/components-open/d-screen/index.vue'
import dDetail from '@/vue2/components-open/d-detail/index.vue'
import dShareDialog from '@/vue2/components-open/d-share-dialog/index.vue'
import dView from '@/vue2/components-open/d-view/index.vue'
import loadMask from '@/vue2/components-open/load-mask/index.vue'
import '@/vue2/plugin.js'
import widgetEcharts from '@/vue2/components-open/Widget/echarts.vue'
import widgetNormal from '@/vue2/components-open/Widget/normal.vue'

const widgetNormalMixin = widgetMixin

const cakeV = {
	widgetNormalMixin,
	widgetMixin,
	widgetEcharts,
	widgetNormal,
	dScreen,
	dShareDialog,
	dDetail,
	dView,
	loadMask,
}
if (window !== undefined) {
	if (!window.cakeV) {
		window.cakeV = {}
	}
	window.cakeV = { ...window.cakeV, ...cakeV }
}

export {
	widgetNormalMixin,
	widgetMixin,
	widgetEcharts,
	widgetNormal,
	dScreen,
	dDetail,
	dShareDialog,
	dView,
	loadMask,
}
export default cakeV
