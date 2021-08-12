<template lang="pug">
el-tabs(
	editable,
	type="card",
	@tab-remove="removeScreenById",
	:value="manager.screen.currentScreen && manager.screen.currentScreen.id",
	@tab-add="createScreen",
	@tab-click="selectScreenByIndex")
	el-tab-pane(v-for="item in manager.screen.screenList", :key="item.id", :label="item.name", :name="item.id")
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api'
import Manager from '@/core/Manager'
import removeScreenById from './removeScreenById'
import createScreen from './createScreen'
import selectScreenByIndex from './selectScreenByIndex'

export default {
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })

		return {
			...toRefs(state),
			createScreen,
			removeScreenById,
			selectScreenByIndex,
		}
	},
}
</script>
