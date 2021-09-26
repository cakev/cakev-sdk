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
		d-svg.editor-header-play.cursor-pointer(@click="preview" type="el-icon-caret-right" :size="20")
		span.text-right(@click="showZoomMenu") {{Math.round(manager.temporary.zoom *100)}}%
		d-svg.editor-header-icon(type="el-icon-arrow-down", @click="showZoomMenu")
		contextmenu-zoom(v-if="zoomMenuState" :list="zoomList")
</template>
<script lang="ts">
import Manager from '@dorring/sdk/core/Manager'
import { reactive, toRefs, onBeforeMount, defineComponent } from 'vue'
import { ClickOutside } from '@dorring/sdk/vue3/directives'
import createScreen from './createScreen'
import dblclick from './dblclick'
import showNameMenu from './showNameMenu'
import showZoomMenu from './showZoomMenu'
import contextmenuZoom from '@dorring/sdk/vue3/components/contextmenu-zoom/index.vue'
import contextmenuScreen from '@dorring/sdk/vue3/components/contextmenu-screen/index.vue'
import dSvg from '@dorring/sdk/vue3/components-style/d-svg/index.vue'
import blur from './blur'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'editor-header',
	components: {
		contextmenuZoom,
		contextmenuScreen,
		dSvg,
	},
	directives: {
		clickoutside: ClickOutside,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const router = useRouter()
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
		const preview = () => {
			state.manager.screenCache.add(
				'screen-preview',
				JSON.stringify({
					widgets: state.manager.screen.currentScreen.widgets,
					scenes: state.manager.screen.currentScreen.scenes,
					widgetsLayers: state.manager.screen.currentScreen.widgetsLayers,
					layoutMode: state.manager.screen.currentScreen.layoutMode,
					width: state.manager.screen.currentScreen.width,
					height: state.manager.screen.currentScreen.height,
					backgroundColor: state.manager.screen.currentScreen.backgroundColor,
				}),
			)
			router.push('/preview')
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
			preview,
			blur: () => blur(state),
			dblclick: () => dblclick(state),
		}
	},
})
</script>
<style lang="scss" scoped>
.editor-header-play {
	&:hover {
		opacity: 0.8;
	}
}
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
	span {
		width: 30px;
	}
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
