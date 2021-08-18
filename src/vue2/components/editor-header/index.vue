<template lang="pug">
.editor-header.fn-flex(@contextmenu.prevent)
	.editor-header-left
	.editor-header-center.fn-flex.pos-r(v-click-outside="hideMenu")
		el-input.editor-header.name.fn-flex(
			ref="input",
			v-model="manager.screen.currentScreen.name",
			v-show="editName",
			:autofocus="true",
			@blur="blur")
		span(v-show="!editName", @dblclick="dblclick") {{ manager.screen.currentScreen.name }}
		i.el-icon-arrow-down(@click="showNameMenu", v-show="!editName")
		d-contextmenu.editor-header-contextmenu(v-if="nameMenuState", :list="list")
	.editor-header-right
</template>
<script lang="ts">
import Manager from '@/core/Manager'
import { reactive, toRefs, onBeforeMount } from '@vue/composition-api'
import createScreen from './createScreen'
import dblclick from './dblclick'
import showNameMenu from './showNameMenu'
import blur from './blur'

export default {
	// @ts-ignore
	setup(props, context) {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager, nameMenuState: false, list: [], editName: false })
		const hideMenu = () => {
			state.nameMenuState = false
		}
		onBeforeMount(() => {
			if (!manager.screen.currentScreen) {
				createScreen()
			}
		})
		return {
			...toRefs(state),
			showNameMenu: () => showNameMenu({ state, context }),
			hideMenu,
			blur: () => blur({ state, context }),
			dblclick: () => dblclick({ state, context }),
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
