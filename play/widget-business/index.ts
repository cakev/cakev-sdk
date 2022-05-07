import Vue from 'vue'
import Editor from '@/core/Editor'
import WidgetConf from '@/core/Widget/conf'

const editor: Editor = Editor.Instance()
const widgetsContext = require.context('../widget-business', true, /\.(widget.ts)$/)
const widgets: WidgetConf[] = []

widgetsContext.keys().forEach(name => {
	const widget = widgetsContext(name).default
	widgets.push(widget)
})
const componentContext = require.context('../widget-business', true, /index\.(vue)$/)
componentContext.keys().forEach((name, index) => {
	const component = componentContext(name).default
	Vue.component(widgets[index].widgetIs as string, component)
})

editor.local.setWidgetTypes([
	{
		widgetTypeName: '基础',
		widgetTypeId: '基础',
		children: [
			{
				widgetTypeName: '示例一',
				widgetTypeId: '示例一',
			},
			{
				widgetTypeName: '装饰图',
				widgetTypeId: '装饰图',
			},
		],
	},
])
editor.local.setWidgets(widgets)
