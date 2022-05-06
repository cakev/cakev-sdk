import Editor from '@/core/Editor'
import WidgetConf from '@/core/Widget/conf'

const editor: Editor = Editor.Instance()
const widgetsContext = require.context('../widget-business', true, /\.(widget.ts)$/)
const widgets: WidgetConf[] = []

widgetsContext.keys().forEach(name => {
	widgets.push({
		...widgetsContext(name).default,
	})
})
// const conf = require.context('../widget-business', true, /index\.(vue)$/)

editor.local.setWidgetTypes([
	{
		widgetTypeName: '基础',
		widgetTypeId: '基础',
		children: [
			{
				widgetTypeName: '柱形图',
				widgetTypeId: '柱形图',
			},
			{
				widgetTypeName: '装饰图',
				widgetTypeId: '装饰图',
			},
		],
	},
])
editor.local.setWidgets(widgets)
