<template lang="pug">
div
	d-right-control(label="类型")
		i-select(
			:style="{ marginBottom: '10px' }",
			v-model="echartsConfig.type",
			placeholder="类型")
			i-option(value="bar") 柱形
			i-option(value="line") 折线
	d-right-control(label="显示名")
		d-input(
			v-model="echartsConfig.name",
			:style="{ width: '100px' }")
	d-right-control(label="系列值")
		d-input(
			v-model="echartsConfig.seriesYKey",
			:style="{ width: '100px' }")
	d-right-control(label="对应Y轴")
		i-select(
			:style="{ marginBottom: '10px' }",
			v-model="echartsConfig.yAxisIndex")
			i-option(:value="0") 左侧
			i-option(:value="1") 右侧
	d-right-control(label="颜色")
		i-color-picker(:alpha="true", v-model="echartsConfig.itemStyle.color")
	d-right-control(label="线条样式" v-if="echartsConfig.type === 'line'")
		i-select(
			:style="{ marginBottom: '10px' }",
			v-model="echartsConfig.lineStyle.type",
			placeholder="类型")
			i-option(value="solid") solid
			i-option(value="dashed") dashed
			i-option(value="dotted") dotted
</template>
<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import func from '@/vue2/components-func/func.mx'
import dCode from '@/vue2/components-right/d-code/index.vue'

@Component({ components: { dCode } })
export default class FuncData extends func {
	@Prop() echartsConfig
}
</script>
