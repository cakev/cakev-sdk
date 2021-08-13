<template lang="pug">
el-form(label-width="100px")
	el-form-item(label="位置")
		d-input(v-model="currentWidget.x", style="width: 100px", format="number")
			template(slot="append") X
		d-input(v-model="currentWidget.y", style="width: 100px; margin-left: 10px", format="number")
			template(slot="append") Y
	el-form-item(label="宽高")
		d-input(v-model="currentWidget.width", style="width: 100px")
			template(slot="append") W
		d-input(v-model="currentWidget.height", style="width: 100px; margin-left: 10px")
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
