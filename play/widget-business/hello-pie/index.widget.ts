import { WidgetTask } from '@/index'

export default new WidgetTask({
	widgetLayout: {
		width: 500,
		height: 500,
	},
	widgetApi: {
		data: JSON.stringify([
			{ type: '一线城市', value: 0.19 },
			{ type: '二线城市', value: 0.21 },
			{ type: '三线城市', value: 0.27 },
			{ type: '四线及以下', value: 0.33 },
		]),
	},
	widgetBase: {
		name: '饼图',
	},
	widgetTypeId: '示例二',
	widgetIs: 'hello-pie',
	widgetAvatar: require('./snapshot.gif'),
})
