<template lang="pug">
el-form(label-width="100px")
	el-form-item(label="位置")
		el-input(v-model="manager.screen.currentWidgets[0].x", style="width: 120px")
			template(slot="append") X
		el-input(v-model="manager.screen.currentWidgets[0].y", style="width: 120px; margin-left: 10px")
			template(slot="append") Y
	el-form-item(label="宽高")
		el-input(v-model="manager.screen.currentWidgets[0].width", style="width: 120px")
			template(slot="append") W
		el-input(v-model="manager.screen.currentWidgets[0].height", style="width: 120px; margin-left: 10px")
			template(slot="append") H
	el-form-item(label="背景色")
		el-color-picker(v-model="manager.screen.currentWidgets[0].backgroundColor")
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api'
import Manager from '@/core/Manager'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		return {
			...toRefs(state),
		}
	},
}
</script>
