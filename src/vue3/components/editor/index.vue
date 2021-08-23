<template lang="pug">
el-container.editor.fn-flex.flex-column(@contextmenu.prevent)
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
			@wheel.stop.prevent="wheel",
			@mousedown="mousedown",
			@mouseup="mouseup",
			@mousemove.stop="mousemove",
			@drop="drop",
			@dragover.prevent,
			@click="click")
			editor-content(v-if="manager.screen.currentScreen")
			editor-tip(v-if="manager.screen.currentScreen")
			contextmenu-widget(v-if="manager.temporary.widgetRightMenu")
			contextmenu-widgets(v-if="manager.temporary.widgetsRightMenu")
		el-divider.divider(direction="vertical")
		el-aside(width="300px", v-if="manager.screen.currentScreen")
			setting-widget(v-if="manager.screen.currentWidgets.length === 1")
			setting-editor(v-if="manager.screen.currentWidgets.length === 0")
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, defineComponent, onBeforeUnmount } from 'vue'
import Manager from '@/core/Manager'
import settingEditor from '@/vue3/components/setting-editor/index.vue'
import editorHeader from '@/vue3/components/editor-header/index.vue'
import editorWidgetsList from '@/vue3/components/editor-widgets-list/index.vue'
import editorContent from '@/vue3/components/editor-content/index.vue'
import settingWidget from '@/vue3/components/setting-widget/index.vue'
import editorScene from '@/vue3/components/editor-scene/index.vue'
import editorTip from '@/vue3/components/editor-tip/index.vue'
import contextmenuWidget from '@/vue3/components/contextmenu-widget/index.vue'
import contextmenuWidgets from '@/vue3/components/contextmenu-widgets/index.vue'
import { on, off } from '@/vue3/utils/dom'
import drop from './drop'
import click from './click'
import wheel from './wheel'
import keyup from './keyup'
import keydown from './keydown'
import style from './style'
import mousedown from './mousedown'
import mouseup from './mouseup'
import mousemove from './mousemove'

export default defineComponent({
	name: 'editor',
	components: {
		settingEditor,
		editorHeader,
		editorWidgetsList,
		editorContent,
		settingWidget,
		editorScene,
		editorTip,
		contextmenuWidget,
		contextmenuWidgets,
	},
	setup() {
		const manager: Manager = Manager.Instance()
		const state = reactive({ manager })
		onMounted(() => {
			on(document, 'keyup', keyup)
			on(document, 'keydown', keydown)
		})
		onBeforeUnmount(() => {
			off(document, 'keyup', keyup)
			off(document, 'keyup', keydown)
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
})
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
