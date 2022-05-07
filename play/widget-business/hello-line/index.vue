<template lang="pug">
widget-normal
	#chart
</template>
<script lang="ts">
import getOption from './options'
import { widgetMixin, widgetNormal } from '@'

export default {
	mixins: [widgetMixin],
	components: { widgetNormal },
	mounted() {
		const instance = window.echarts.init(document.getElementById('#chart'))
		instance.setOption(this.cake_data)
	},
}
</script>
<style lang="scss" scoped>
#chart {
	width: 100%;
	height: 100%;
}
</style>
