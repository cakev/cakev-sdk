<template lang="pug">
widget-normal(
	:customEventsConfig="customEventsConfig",)
	.chart(:id="id")
</template>
<script lang="ts">
import getOption from './options'
import widgetNormal from '@/vue2/components-open/Widget/normal.vue'
import widgetMixin from '@/vue2/mixins'

export default {
	mixins: [widgetMixin],
	components: { widgetNormal },
	data() {
		return {
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
