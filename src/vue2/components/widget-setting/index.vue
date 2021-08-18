<template lang="pug">
.widget-setting
	.widget-setting-header.fn-flex.flex-row
		span 基础
	el-form.widget-setting-form(label-width="80px", label-position="left")
		el-form-item(label="位置")
			d-input(v-model="currentWidget.x", style="width: 90px", format="number")
				template(slot="append") X
			d-input(v-model="currentWidget.y", style="width: 90px; margin-left: 8px", format="number")
				template(slot="append") Y
		el-form-item(label="宽高")
			d-input(v-model="currentWidget.width", style="width: 90px", format="number")
				template(slot="append") W
			d-input(v-model="currentWidget.height", style="width: 90px; margin-left: 8px", format="number")
				template(slot="append") H
		el-form-item(label="背景色")
			el-color-picker(v-model="currentWidget.backgroundColor")
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api'
import Manager from '@/core/Manager'
import currentWidget from './currentWidget'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		return {
			...toRefs(state),
			currentWidget,
		}
	},
}
</script>
<style lang="scss" scoped>
.widget-setting {
	font-size: 12px;
}
.widget-setting-header {
	padding: 4px 16px;
	align-items: center;
	height: 40px;
	span {
		font-weight: bold;
	}
}
.widget-setting-form {
	padding: 0 16px;
}
</style>
