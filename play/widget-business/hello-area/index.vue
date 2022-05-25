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
		this.chart.scale('year', {
			type: 'linear',
			tickInterval: 50,
		})
		this.chart.scale('value', {
			nice: true,
		})

		this.chart.tooltip({
			showCrosshairs: true,
			shared: true,
		})
		this.chart.area().adjust('stack').position('year*value').color('country')
		this.chart.line().adjust('stack').position('year*value').color('country')
		this.chart.interaction('element-highlight')
		// 复写 图例筛选 交互。1、点击图例名称 进行 unchecked 状态的切换 2、点击图例 marker，进行 checked 状态的切换（进行聚焦）3、双击 重置状态
		this.chart.interaction('legend-filter', {
			start: [
				{ trigger: 'legend-item-name:click', action: ['list-unchecked:toggle', 'data-filter:filter'] },
				{ trigger: 'legend-item-marker:click', action: ['list-checked:checked', 'data-filter:filter'] },
			],
			end: [{ trigger: 'legend-item-marker:dblclick', action: ['list-checked:reset', 'data-filter:filter'] }],
		})
		this.chart.render()
	},
}
</script>
