<template lang="pug">
widget-normal
	div(:id='id')
</template>
<script lang="ts">
import { widgetMixin, widgetNormal } from '@'

export default {
	mixins: [widgetMixin],
	components: { widgetNormal },
	data() {
		return {
			id: `chart${Date.now()}`,
			chart: null,
		}
	},
	watch: {
		cake_data(val):void {
			this.chart.changeData(val)
		},
	},
	mounted(): void {
		this.chart = new window.G2.Chart({
			container: this.id,
			autoFit: true,
			height: 500,
		})
		this.chart.data(this.cake_data)
		this.chart.scale({
			value: {
				max: 1400,
				min: 0,
				alias: '销量（百万）',
			},
		})
		this.chart.axis('type', {
			title: null,
			tickLine: null,
			line: null,
		})

		this.chart.axis('value', {
			label: null,
			title: {
				offset: 30,
				style: {
					fontSize: 12,
					fontWeight: 300,
				},
			},
		})
		this.chart.legend(false)
		this.chart.coordinate().transpose()
		this.chart
			.interval()
			.position('type*value')
			.size(26)
			.label('value', {
				style: {
					fill: '#8d8d8d',
				},
				offset: 10,
			})
		this.chart.interaction('element-active')
		this.chart.render()
	},
}
</script>
<style lang="scss" scoped>
#chart {
	width: 100%;
	height: 100%;
}
</style>
