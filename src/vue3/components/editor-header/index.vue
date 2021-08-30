<template lang="pug">
.editor-header.fn-flex
	.editor-header-left
	.editor-header-center.fn-flex.pos-r(v-clickoutside="hideNameMenu")
		el-input.editor-header.name.fn-flex(
			:ref="el => (dom['input'] = el)",
			v-model="manager.screen.currentScreen.name",
			v-if="editName",
			:autofocus="true",
			@blur="blur")
		span(v-show="!editName", @dblclick="dblclick") {{ manager.screen.currentScreen.name }}
		d-svg.editor-header-icon(type="el-icon-arrow-down", @click="showNameMenu", v-show="!editName")
		contextmenu-screen(v-if="nameMenuState", :list="nameList")
	.editor-header-right.fn-flex.pos-r(v-clickoutside="hideZoomMenu")
		span(@click="showZoomMenu") {{Math.round(manager.temporary.zoom *100)}}%
		d-svg.editor-header-icon(type="el-icon-arrow-down", @click="showZoomMenu")
		contextmenu-zoom(v-if="zoomMenuState" :list="zoomList")
</template>
<script lang="ts">
import Manager from '@/core/Manager'
import { reactive, toRefs, onBeforeMount, defineComponent } from 'vue'
import { ClickOutside } from '@/vue3/directives'
import createScreen from './createScreen'
import dblclick from './dblclick'
import showNameMenu from './showNameMenu'
import showZoomMenu from './showZoomMenu'
import contextmenuZoom from '@/vue3/components/contextmenu-zoom/index.vue'
import contextmenuScreen from '@/vue3/components/contextmenu-screen/index.vue'
import blur from './blur'

export default defineComponent({
	name: 'editor-header',
	components: {
		contextmenuZoom,
		contextmenuScreen,
	},
	directives: {
		clickoutside: ClickOutside,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({
			dom: {},
			manager,
			zoomMenuState: false,
			nameMenuState: false,
			nameList: [],
			zoomList: [],
			editName: false,
		})
		const hideNameMenu = () => {
			state.nameMenuState = false
		}
		const hideZoomMenu = () => {
			state.zoomMenuState = false
		}
		onBeforeMount(() => {
			if (!manager.screen.currentScreen) {
				createScreen()
			}
		})
		return {
			...toRefs(state),
			showNameMenu: () => showNameMenu(state),
			showZoomMenu: () => showZoomMenu(state),
			hideNameMenu,
			hideZoomMenu,
			blur: () => blur(state),
			dblclick: () => dblclick(state),
		}
	},
})
</script>
<style lang="scss" scoped>
.editor-header-icon {
	height: 100%;
	align-items: center;
	position: relative;
	display: flex;
	transition: all 0.3s;
	top: 0;
	padding: 0 4px;
	&:hover {
		top: 4px;
	}
}
.editor-header.name {
	align-items: center;

	&::v-deep(input) {
		height: 20px;
		font-size: 14px;
		line-height: 20px;
		color: #fff;
		text-align: center;
		background-color: transparent;
		border: none;
	}
}

.editor-header-right {
	align-items: center;
	padding-right: 18px;
	color: #fff;
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
	span {
		font-size: 14px;
	}
}
</style>
