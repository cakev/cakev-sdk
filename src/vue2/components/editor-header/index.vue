<template lang="pug">
.editor-header.fn-flex
	.editor-header-left
	.editor-header-center.fn-flex.pos-r(v-click-outside="hideMenu")
		el-input.editor-header.name.fn-flex(
			ref="input",
			v-model="manager.screen.currentScreen.name",
			v-show="editName",
			:autofocus="true",
			@blur="blur")
		span(v-show="!editName", @dblclick="dblclick") {{ manager.screen.currentScreen.name }}
		i.el-icon-arrow-down(@click="showMenu", v-show="!editName")
		d-contextmenu.editor-header-contextmenu(v-if="show", :list="list")
	.editor-header-right
</template>
<script lang="ts">
import Manager from '@/core/Manager'
import { reactive, toRefs, onBeforeMount } from '@vue/composition-api'
import createScreen from './createScreen'
import selectScreenByIndex from './selectScreenByIndex'
import { Notification } from 'element-ui'

export default {
	// @ts-ignore
	setup(props, context) {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager, show: false, list: [], editName: false })

		const dblclick = () => {
			state.editName = true
			context.refs['input'].focus()
			setTimeout(() => {
				context.refs['input'].select()
			})
		}
		const blur = () => {
			if (manager.screen.currentScreen.name.replace(/[\r\n]/g, '') === '') {
				manager.screen.currentScreen.name = '未命名'
				context.refs['input'].focus()
				setTimeout(() => {
					context.refs['input'].select()
				})
			} else {
				state.editName = false
			}
		}

		const showMenu = () => {
			state.show = true
			const children = manager.screen.screenList.map((item, index) => {
				const now: contextmenu = item
				now.label = item.name
				now.disabled = item.id === manager.screen.currentScreen.id
				now.handler = () => {
					selectScreenByIndex(index)
					state.show = false
					Notification({
						title: '切换大屏成功',
						type: 'success',
						message: `大屏名：${item.name}`,
					})
				}
				return now
			})
			state.list = [
				{
					label: '重命名大屏',
					handler: () => {
						state.show = false
						dblclick()
					},
				},
				{
					label: '切换大屏',
					children,
				},
				{
					label: '创建大屏',
					handler: () => {
						createScreen()
						state.show = false
						Notification({
							title: '创建大屏成功',
							type: 'success',
							message: `大屏名：${manager.screen.currentScreen.name}`,
						})
					},
				},
			]
		}
		const hideMenu = () => {
			state.show = false
		}
		onBeforeMount(() => {
			if (!manager.screen.currentScreen) {
				createScreen()
			}
		})
		return {
			...toRefs(state),
			showMenu,
			hideMenu,
			blur,
			dblclick,
		}
	},
}
</script>
<style lang="scss" scoped>
.editor-header.name {
	align-items: center;
	/deep/ {
		input {
			background-color: transparent;
			border: none;
			color: #fff;
			font-size: 14px;
			text-align: center;
			line-height: 20px;
			height: 20px;
		}
	}
}
.editor-header-contextmenu {
	top: 48px;
}
.editor-header {
	background-color: #2c2c2c;
	height: 48px;
	user-select: none;
}
.editor-header-center {
	flex: 1;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-size: 14px;
	i {
		padding: 0 4px;
	}
}
</style>
