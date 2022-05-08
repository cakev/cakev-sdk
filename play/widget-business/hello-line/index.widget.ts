import widgetConf from '@/core/Widget/conf'

export default new widgetConf({
	widgetLayout: {
		width: 500,
		height: 500,
	},
	widgetApi: {
		data: JSON.stringify([
			{ type: '汽车', value: 34 },
			{ type: '建材家居', value: 85 },
			{ type: '住宿旅游', value: 103 },
			{ type: '交通运输与仓储邮政', value: 142 },
			{ type: '建筑房地产', value: 251 },
			{ type: '教育', value: 367 },
			{ type: 'IT 通讯电子', value: 491 },
			{ type: '社会公共管理', value: 672 },
			{ type: '医疗卫生', value: 868 },
			{ type: '金融保险', value: 1234 },
		]),
	},
	widgetTypeId: '示例一',
	widgetIs: 'hello-line',
	widgetAvatar: require('./snapshot.png'),
})
