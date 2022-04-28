<template lang="pug">
widget-echarts(:value="value", :customConfig="customConfig")
	.chart(:id="id")
</template>
<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import { widgetNormalMixin } from '@/vue2/index.js'
import widgetEcharts from '@/vue2/components-open/Widget/echarts.vue'
import { value, customConfig } from './index.component'
import {mixins} from "vue-class-component";

@Component({ components: { widgetEcharts } })
export default class extends mixins(widgetNormalMixin) {
	value = value
	customConfig = customConfig

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
					data: data.map(item => item[v.seriesYKey])
				}
			}),
			xAxis,
			yAxis,
			tooltip: this.config.echartsTooltip
		})
	}

	@Watch('data', { deep: true, immediate: true })
	dataHandle(val): void {
		if (this.id && val) {
			this.$nextTick(() => {
				this.instance = echarts.init(document.getElementById(this.id))
				this.setOption(val)
			})
		}
	}
}
</script>
<style lang="scss" scoped>
.chart {
	width: 100%;
	height: 100%;
}
</style>
