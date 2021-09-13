import type { App } from 'vue'

// core components
import dorringWidget from './vue3/components/widget/index.vue'
import dorringWidgetNormal from './vue3/components/widget/normal.vue'
import dorringWidgetGroup from './vue3/components/widget/group.vue'
import dorringWidgetLayerGroup from './vue3/components/widget-layer/group.vue'
import dorringWidgetLayerNormal from './vue3/components/widget-layer/normal.vue'
import dorringWidgetLayer from './vue3/components/widget-layer/index.vue'

// widgets components
import decorate1 from './vue3-widgets/decorate/decorate-1/index.vue'
import line1 from './vue3-widgets/line/line-1/index.vue'

export default (app: App) => {
	app.component(decorate1.name, decorate1)
	app.component(line1.name, line1)
	app.component(dorringWidget.name, dorringWidget)
	app.component(dorringWidgetNormal.name, dorringWidgetNormal)
	app.component(dorringWidgetGroup.name, dorringWidgetGroup)
	app.component(dorringWidgetLayerGroup.name, dorringWidgetLayerGroup)
	app.component(dorringWidgetLayerNormal.name, dorringWidgetLayerNormal)
	app.component(dorringWidgetLayer.name, dorringWidgetLayer)
}
