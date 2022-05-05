<template lang="pug">
widget-echarts(:value="value", :customConfig="customConfig")
	.chart(:id="id")
</template>
<script lang="ts">
import { widgetNormalMixin } from '@/vue2/index.js'
import widgetEcharts from '@/vue2/components-open/Widget/echarts.vue'
import { value, customConfig } from './index.component'

export default {
	components: {
		widgetEcharts,
	},
	mixins: [widgetNormalMixin],
	data() {
		return {
			value: value,
			customConfig: customConfig,
		}
	},
	methods: {
		setOption(data): void {
			const grid = this.config.echartsGrid
			const yAxis = this.config.echartsYAxis
			const xAxis = this.config.echartsXAxis
			xAxis[0].data = data.map(item => item[this.config.echartsXKey])
			this.instance.setOption({
				grid,
				series: this.config.echartsSeries.map((v: any) => {
					return {
						...v,
						data: data.map(item => item[v.seriesYKey]),
					}
				}),
				xAxis,
				yAxis,
				tooltip: this.config.echartsTooltip,
			})
		},
	},
	watch: {
		data: {
			handler(val) {
				if (this.id && val) {
					this.$nextTick(() => {
						this.instance = window.echarts.init(document.getElementById(this.id))
						this.setOption(val)
					})
				}
			},
			deep: true,
			immediate: true,
		},
	},
}
</script>
<style lang="scss" scoped>
.chart {
	width: 100%;
	height: 100%;
}
</style>
