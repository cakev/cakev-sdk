export const value = {
	layout: {
		size: {
			width: 992,
			height: 214,
		},
		position: {
			value: 'relative',
		},
	},
	widgetType: 'echarts',
	api: {
		data: JSON.stringify([
			{
				name: '1月',
				value: 10,
			},
			{
				name: '2月',
				value: 40,
			},
			{
				name: '3月',
				value: 30,
			},
			{
				name: '4月',
				value: 20,
			},
			{
				name: '5月',
				value: 10,
			},
			{
				name: '6月',
				value: 50,
			},
		]),
	},
	config: {
		title: '%',
	},
}

export const customConfig = []
