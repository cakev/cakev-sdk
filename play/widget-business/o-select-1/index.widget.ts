import widgetConf from '@/core/Widget/conf'

// 自定义配置
export const customConfig = [
	{
		prop: 'defaultValue',
		label: '默认选项',
		type: 'func-input',
	},
]
// 配置
export default new widgetConf({
	widgetApi: {
		data: JSON.stringify([
			{ label: 'Tab01', value: '1' },
			{ label: 'Tab02', value: '2' },
			{ label: 'Tab03', value: '3' },
		]),
	},
	widgetLayout: {
		width: 250,
		height: 32,
	},
	widgetTypeId: '柱形图',
	widgetIs: 'o-select-1',
	widgetAvatar: require('./snapshot.png'),
	widgetConfig: {
		defaultValue: '1',
	},
})
