export default function getOption(config) {
	return {
		textStyle: {
			fontSize: 16,
			color: '#FFF',
		},
		grid: {
			top: 40,
			left: 40,
			bottom: 30,
			right: 0,
		},
		tooltip: {
			trigger: 'axis',
			triggerOn: 'mousemove|click',
			axisPointer: {
				lineStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: 'rgba(0, 221, 255, .5)',
							},
							{
								offset: 1,
								color: 'rgba(0, 221, 255, 0)',
							},
						],
						global: false,
					},
				},
			},
		},
		color: 'rgba(0, 221, 255, 1)',
		xAxis: [
			{
				type: 'category',
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
		yAxis: [
			{
				name: config.title,
				type: 'value',
				splitLine: {
					show: true,
					lineStyle: {
						type: 'solid',
						color: 'rgba(199, 209, 219, 0.2)',
					},
				},
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
		series: [
			{
				type: 'line',
				symbolSize: 16,
				symbol: 'image://' + config.icon,
				itemStyle: {
					color: '#fff',
					borderColor: 'rgba(0, 221, 255, 1)',
				},
				lineStyle: {
					color: 'rgba(0, 221, 255, 1)',
				},
				areaStyle: {
					color: new echarts.graphic.LinearGradient(
						0,
						0,
						0,
						1,
						[
							{
								offset: 0,
								color: 'rgba(0, 221, 255, 0.5)',
							},
							{
								offset: 1,
								color: 'rgba(0, 221, 255, 0)',
							},
						],
						false,
					),
				},
				markPoint: {
					symbol: 'circle',
					symbolSize: 8,
					itemStyle: {
						color: '#fff',
						borderWidth: 4,
					},
					label: {
						show: true,
						distance: 20,
						offset: [-38, -24],
						textBorderWidth: 0,
						textShadowBlur: 0,
						textShadowColor: 'transparent',
						formatter: param => {
							return '{card|' + param.value + config.title + '}'
						},
						rich: {
							card: {
								width: 84,
								height: 30,
								fontSize: 18,
								lineHeight: 18,
								backgroundColor: '#0057A9',
								borderRadius: 0,
								borderColor: '#00DDFF',
								borderWidth: 1,
								align: 'center',
								color: '#ffffff',
							},
						},
					},
					data: [
						{
							type: 'max',
							label: {
								show: config.isShowMaxMarker,
							},
						},
						{
							type: 'min',
							label: {
								show: false,
							},
						},
					],
				},
			},
		],
	}
}
