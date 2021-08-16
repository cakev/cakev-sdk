<template lang="pug">
el-tabs(
	:editable="!editName",
	type="card",
	@tab-remove="removeScreenById",
	:value="manager.screen.currentScreen && manager.screen.currentScreen.id",
	@tab-add="createScreen",
	@tab-click="selectScreenByIndex")
	el-tab-pane(v-for="item in manager.screen.screenList", :key="item.id", :name="item.id")
		template(slot="label")
			el-input(ref="input", v-model="item.name", v-show="editName", :autofocus="true", @blur="blur")
			span(@dblclick="dblclick", v-show="!editName") {{ item.name }}
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

		const dblclick = () => {
			state.editName = true
			console.log(context.refs['input'])
			context.refs['input'][0].focus()
			setTimeout(() => {
				context.refs['input'][0].select()
			})
		}
		const blur = () => {
			if (manager.screen.currentScreen.name.replace(/[\r\n]/g, '') === '') {
				manager.screen.currentScreen.name = '未命名'
				context.refs['input'][0].focus()
				setTimeout(() => {
					context.refs['input'][0].select()
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
