export const customConfig = [
	{
		prop: 'title',
		label: '标题',
		type: 'func-select',
		options: ['aaaaa', 'hhhhhhh'],
	},
	{
		prop: 'backgrounds',
		label: '组',
		type: 'func-group',
		children: [
			{
				prop: 'background',
				label: '图片',
				type: 'func-image',
			},
			{
				prop: 'title',
				label: '标题',
				type: 'func-input',
			},
		],
	},
]
import widgetConf from '@/core/Widget/conf'

export default new widgetConf({
	widgetApi: {
		data: JSON.stringify({ title: '标题' }),
	},
	widgetLayout: {
		width: 480,
		height: 43,
	},
	widgetTypeId: '装饰图',
	widgetIs: 'test-normal2',
	widgetAvatar: require('./snapshot.png'),
	widgetConfig: {
		title: 'aaaaa',
		backgrounds: [
			{
				background: '/static/icons/s-progress1-1.svg',
				title: '开户(户)',
			},
		],
	},
})
