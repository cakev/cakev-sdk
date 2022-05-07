import widgetConf from '@/core/Widget/conf'

export default new widgetConf({
	widgetApi: {
		data: 'hello world',
	},
	widgetLayout: {
		width: 250,
		height: 32,
	},
	widgetTypeId: '柱形图',
	widgetIs: 'hello-world',
	widgetAvatar: require('./snapshot.png'),
})
