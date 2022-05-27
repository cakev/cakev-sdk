<template lang="pug">
div(:id="cake_widget.widgetId")
</template>
<script lang="ts">
export default {
	data() {
		return {
			chart: null,
		}
	},
	watch: {
		cake_data(val): void {
			this.chart.changeData(val)
		},
	},
	props: ['cake_data', 'cake_widget'],
	mounted(): void {
		this.chart = new window.G2.Chart({
			container: this.cake_widget.widgetId,
			autoFit: true,
			height: 500,
			supportCSSTransform: true,
		})
		this.chart.data(this.cake_data)
		this.chart.scale({
			month: {
				range: [0, 1],
			},
			temperature: {
				nice: true,
			},
		})
		this.chart.tooltip({
			showCrosshairs: true,
			shared: true,
		})
		this.chart.axis('temperature', {
			grid: null,
			label: {
				formatter: val => {
					return val + ' °C'
				},
			},
		})
		this.chart.line().position('month*temperature').color('city').shape('smooth')
		this.chart.point().position('month*temperature').color('city').shape('circle').style({
			stroke: '#fff',
			lineWidth: 1,
		})
		this.chart.render()
	},
}
</script>
