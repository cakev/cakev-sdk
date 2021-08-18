<template lang="pug">
el-container.editor.fn-flex.flex-column
	editor-header
	el-container
		el-aside
			editor-widgets-list
		el-divider.divider(direction="vertical")
		el-aside(width="240px")
			editor-scene(v-if="manager.screen.currentScreen")
		el-divider.divider(direction="vertical")
		el-main.pos-r.editor-container(
			:style="style",
			@wheel.native.stop="wheel",
			@mousedown.native.stop="mousedown",
			@mouseup.native.stop="mouseup",
			@mousemove.native.stop="mousemove",
			@drop.native="drop",
			@dragover.native.prevent,
			@click.native="click")
			editor-content(v-if="manager.screen.currentScreen")
			editor-tip(v-if="manager.screen.currentScreen")
			widget-contextmenu(v-if="manager.temporary.widgetRightMenu")
		el-divider.divider(direction="vertical")
		el-aside(width="300px", v-if="manager.screen.currentScreen")
			widget-setting(v-if="manager.screen.currentWidgets.length === 1")
			editor-setting(v-if="manager.screen.currentWidgets.length === 0")
</template>
<script lang="ts">
import { reactive, toRefs, onMounted } from '@vue/composition-api'
import Manager from '@/core/Manager'
import editorSetting from '@/vue2/components/editor-setting/index.vue'
import editorHeader from '@/vue2/components/editor-header/index.vue'
import editorWidgetsList from '@/vue2/components/editor-widgets-list/index.vue'
import editorContent from '@/vue2/components/editor-content/index.vue'
import widgetSetting from '@/vue2/components/widget-setting/index.vue'
import editorScene from '@/vue2/components/editor-scene/index.vue'
import editorTip from '@/vue2/components/editor-tip/index.vue'
import widgetContextmenu from '@/vue2/components/widget-contextmenu/index.vue'
import drop from './drop'
import click from './click'
import wheel from './wheel'
import keyup from './keyup'
import keydown from './keydown'
import style from './style'
import mousedown from './mousedown'
import mouseup from './mouseup'
import mousemove from './mousemove'

export default {
	components: {
		editorSetting,
		editorHeader,
		editorWidgetsList,
		editorContent,
		widgetSetting,
		editorScene,
		editorTip,
		widgetContextmenu,
	},
	beforeDestroy() {
		document.removeEventListener('keyup', keyup)
		document.removeEventListener('keyup', keydown)
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })
		onMounted(() => {
			document.addEventListener('keyup', keyup)
			document.addEventListener('keydown', keydown)
		})
		return {
			...toRefs(state),
			drop,
			click,
			wheel,
			style,
			mousedown,
			mouseup,
			mousemove,
		}
	},
}
</script>
<style lang="scss" scoped>
.editor-container {
	overflow: hidden;
	background-color: #ddd;
}

.editor {
	height: 100%;
}

.divider {
	height: 100%;
	margin: 0;
}
</style>
