import colorTheme from '@/core/colorTheme'

const commonConfigValue = (type = 'normal') => {
	const normal = {
		widget: {
			name: '',
			id: Date.now(),
			componentVersion: '',
			locked: false,
		},
		layout: {
			size: {
				width: 300,
				height: 200,
			},
			position: {
				left: 0,
				top: 0,
			},
			scale: 1,
		},
		config: { colorTheme },
		api: {
			url: '',
			method: 'GET',
			params: '',
			path: 'data',
			data: '',
			autoFetch: {
				enable: false,
				duration: 5000,
			},
			process: {
				enable: false,
				methodBody: '',
			},
		},
		widgetType: 'normal',
	}
	const echarts = {
		echartsGrid: {
			top: 60,
			left: '10%',
			right: '10%',
			bottom: 60,
			width: 'auto',
			height: 'auto',
			backgroundColor: 'transparent',
			borderColor: '#ccc',
			borderWidth: 1,
			show: false,
		},
		echartsSeries: [
			{
				type: 'line',
				name: 'test',
				seriesYKey: 'value',
				itemStyle: {
					color: '#2e33a7',
				},
				lineStyle: {
					type: 'solid',
				},
				yAxisIndex: 0,
			},
		],
		echartsTooltip: {
			show: true,
			triggerOn: 'mousemove|click',
			trigger: 'item',
		},
		echartsYAxis: [
			{
				show: true,
				name: '万',
				splitLine: {
					show: true,
					lineStyle: {
						type: 'solid',
						color: 'rgba(199, 209, 219, 0.2)',
					},
				},
				type: 'value',
				axisLabel: {
					color: '#fff',
					fontSize: 16,
					lineHeight: 16,
				},
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				nameTextStyle: {
					color: '#fff',
				},
				offset: 5,
			},
			{
				show: false,
				name: '万',
				splitLine: {
					show: true,
					lineStyle: {
						type: 'solid',
						color: 'rgba(199, 209, 219, 0.2)',
					},
				},
				type: 'value',
				axisLabel: {
					color: '#fff',
					fontSize: 16,
					lineHeight: 16,
				},
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				nameTextStyle: {
					color: '#fff',
				},
				offset: 5,
			},
		],
		echartsXAxis: [
			{
				type: 'category',
				data: [],
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				axisLabel: {
					color: '#fff',
					fontSize: 16,
					lineHeight: 16,
					interval: 0,
				},
				offset: 5,
			},
		],
		echartsXKey: 'name',
	}
	let obj = {}
	switch (type) {
		case 'normal':
			obj = normal
			break
		case 'echarts':
			obj = { ...normal, ...echarts }
			break
		default:
			obj = normal
	}
	return obj
}

export default commonConfigValue
