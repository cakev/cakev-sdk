import { WidgetTask } from '@/index'

export default new WidgetTask({
	widgetApi: {
		data: 'hello world',
	},
	widgetLayout: {
		width: 250,
		height: 32,
	},
	widgetTypeId: '示例一',
	widgetIs: 'hello-world',
	widgetAvatar: require('./snapshot.png'),
})
