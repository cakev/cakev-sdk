<template lang="pug">
el-tabs(
	:editable="!editName",
	type="card",
	@tab-remove="removeScreenById",
	:value="manager.screen.currentScreen && manager.screen.currentScreen.id",
	@tab-add="createScreen",
	@tab-click="selectScreenByIndex")
	el-tab-pane(v-for="(item, index) in manager.screen.screenList", :key="item.id", :name="item.id")
		template(slot="label")
			el-input(
				ref="input",
				v-model="item.name",
				v-show="editName &&manager.screen.currentScreen &&  manager.screen.currentScreen.id===item.id",
				:autofocus="true",
				@blur="blur(index)")
			span(
				@dblclick="dblclick(index)",
				v-show="!(editName&&manager.screen.currentScreen &&  manager.screen.currentScreen.id===item.id)") {{ item.name }}
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api'
import Manager from '@/core/Manager'
import removeScreenById from './removeScreenById'
import createScreen from './createScreen'
import selectScreenByIndex from './selectScreenByIndex'

export default {
	// @ts-ignore
	setup(props, context) {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager, editName: false })

		const dblclick = index => {
			state.editName = true
			context.refs['input'][index].focus()
			setTimeout(() => {
				context.refs['input'][index].select()
			})
		}
		const blur = index => {
			if (manager.screen.currentScreen.name.replace(/[\r\n]/g, '') === '') {
				manager.screen.currentScreen.name = '未命名'
				context.refs['input'][index].focus()
				setTimeout(() => {
					context.refs['input'][index].select()
				})
			} else {
				state.editName = false
			}
		}

		return {
			...toRefs(state),
			createScreen,
			removeScreenById,
			selectScreenByIndex,
			blur,
			dblclick,
		}
	},
}
</script>
<style lang="scss" scoped>
/deep/ {
	.el-tabs__item {
		user-select: none;
	}
}
</style>
