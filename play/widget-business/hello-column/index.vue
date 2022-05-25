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
		this.chart.scale('月均降雨量', {
			nice: true,
		})
		this.chart.tooltip({
			showMarkers: false,
			shared: true,
		})
		this.chart
			.interval()
			.position('月份*月均降雨量')
			.color('name')
			.adjust([
				{
					type: 'dodge',
					marginRatio: 0,
				},
			])
		this.chart.interaction('element-highlight-by-x')
		this.chart.render()
	},
}
</script>
