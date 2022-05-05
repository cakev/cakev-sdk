<template lang="pug">
widget-normal(
	:value="value",
	:customConfig="customConfig",
	:customEventsConfig="customEventsConfig",
	:setting="setting",
	:settingData="settingD")
	.chart(:id="id")
</template>
<script lang="ts">
import getOption from './options'
import widgetNormal from '@/vue2/components-open/Widget/normal.vue'
import { value, customConfig, setting, settingData } from './index.component'
import widgetMixin from '@/vue2/mixins'

export default {
	mixins: [widgetMixin],
	components: { widgetNormal },
	data() {
		return {
			value: value,
			customConfig: customConfig,
			setting: setting,
			settingD: settingData,
			customEventsConfig: [
				{
					type: 'test1',
					name: '自定义事件1',
					handler: this.test1,
				},
				{
					type: 'test2',
					name: '自定义事件2',
					handler: this.test2,
				},
			],
		}
	},
	methods: {
		setOption(): void {
			const option = getOption(this.config.config)
			this.__settingData__('y').forEach((child, index) => {
				option.series[index].data = child
			})
			this.__settingData__('x').forEach((child, index) => {
				option.xAxis[index].data = child
			})
			this.instance.setOption(option)
		},
		test1(a) {
			console.log('test1')
			console.log(a)
		},
		test2(a) {
			console.log('test2')
			console.log(a)
		},
	},
	watch: {
		settingData: {
			handler() {
				if (this.id) {
					this.$nextTick(() => {
						this.instance = window.echarts.init(document.getElementById(this.id))
						this.setOption(this.data)
					})
				}
			},
			deep: true,
		},
		data(val) {
			if (this.id) {
				this.$nextTick(() => {
					this.instance = window.echarts.init(document.getElementById(this.id))
					this.setOption(val)
				})
			}
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
