<template lang="pug">
.editor-header.fn-flex
	.editor-header-left
	.editor-header-center.fn-flex.pos-r(v-clickoutside="hideMenu")
		el-input.editor-header.name.fn-flex(
			:ref="el => (dom['input'] = el)",
			v-model="manager.screen.currentScreen.name",
			v-if="editName",
			:autofocus="true",
			@blur="blur")
		span(v-show="!editName", @dblclick="dblclick") {{ manager.screen.currentScreen.name }}
		d-svg(type="el-icon-arrow-down", @click="showNameMenu", v-show="!editName")
		d-contextmenu.editor-header-contextmenu(v-if="nameMenuState", :list="list")
	.editor-header-right
</template>
<script lang="ts">
import Manager from '@/core/Manager'
import { reactive, toRefs, onBeforeMount, defineComponent } from 'vue'
import { ClickOutside } from '@/vue3/directives'
import createScreen from './createScreen'
import dblclick from './dblclick'
import showNameMenu from './showNameMenu'
import blur from './blur'

export default defineComponent({
	name: 'editor-header',
	directives: {
		clickoutside: ClickOutside,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ dom: {}, manager, nameMenuState: false, list: [], editName: false })
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
			showNameMenu: () => showNameMenu(state),
			hideMenu,
			blur: () => blur(state),
			dblclick: () => dblclick(state),
		}
	},
})
</script>
<style lang="scss" scoped>
.editor-header.name {
	align-items: center;

	/deep/ {
		input {
			height: 20px;
			font-size: 14px;
			line-height: 20px;
			color: #fff;
			text-align: center;
			background-color: transparent;
			border: none;
		}
	}
}

.editor-header-contextmenu {
	top: 48px;
}

.editor-header {
	height: 48px;
	background-color: #2c2c2c;
}

.editor-header-center {
	flex: 1;
	align-items: center;
	justify-content: center;
	color: #fff;
	span{
		font-size: 14px;
	}
	i {
		padding: 0 4px;
	}
}
</style>
