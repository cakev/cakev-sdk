import type { App } from 'vue'

// core components
import dorringWidget from '@dorring-sdk/vue3/components/widget/index.vue'
import dorringWidgetNormal from '@dorring-sdk/vue3/components/widget/normal.vue'
import dorringWidgetGroup from '@dorring-sdk/vue3/components/widget/group.vue'
import dorringWidgetLayerGroup from '@dorring-sdk/vue3/components/widget-layer/group.vue'
import dorringWidgetLayerNormal from '@dorring-sdk/vue3/components/widget-layer/normal.vue'
import dorringWidgetLayer from '@dorring-sdk/vue3/components/widget-layer/index.vue'

// widgets components
import decorate1 from '@dorring-sdk-widgets/decorate/index.vue'
import line1 from '@dorring-sdk-widgets/line/index.vue'

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
